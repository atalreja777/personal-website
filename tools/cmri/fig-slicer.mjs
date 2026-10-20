// Specimen slicer: a left ventricle on a slicing bench, cut base to apex into
// 8 mm short-axis rings like a loaf. Hovering moves the blade gantry along the
// long axis; the ring it would cut lifts off the tray.
import * as k from "../anatomy/kit/iso-kit.mjs";
import * as G from "../anatomy/kit/lathe.mjs";
import { cellAt, COLOR, levelOf, SECTORS } from "./data.mjs";

const WIDTH = 620, HEIGHT = 420;

// ---- the model: an adult LV at end-diastole, in millimetres -----------------
export const LV = { length: 85, A: 62, R: 30 }; // apex at s = 0, base at s = 85
const r = (s) => LV.R * Math.sqrt(Math.max(0, 1 - ((s - LV.A) / LV.A) ** 2));
const dr = (s) => { const v = r(s); return v < 1e-6 ? 0 : (-(LV.R ** 2) * (s - LV.A)) / (LV.A ** 2 * v); };
const wall = (s) => 7 + 3 * (s / LV.length); // ~10 mm at the base, ~7 mm near the apex
export const SLICE = { thick: 8, pitch: 10 }; // 8 mm slices, 2 mm gaps
export const SLICES = Array.from({ length: 8 }, (_, i) => LV.length - 4 - SLICE.pitch * i); // slice centres, s from apex

// ---- world layout -----------------------------------------------------------
const PLATE = { x: -150, y: -126, w: 300, d: 252, r: 9 };
const PLATE_H = 12, FOOT_H = 5;
const AXIS = { x: -46, y: -72, z: 46 }; // apex end of the long axis
const F = G.frameOf([AXIS.x, AXIS.y, AXIS.z], [1, 0, 0], [0, 1, 0], [0, 0, 1]);
const RAILS = [-116, -28];
const RAIL_X = [-62, 52];
const BLADE_Z = AXIS.z + LV.R + 3;
const BAR_Z = BLADE_Z + 12;
const TRAY = { x: -140, y: -8, w: 280, d: 126, r: 6 };
const TRAY_H = 3;
const SPOTS = SLICES.map((_, i) => [-102 + 68 * (i % 4), 22 + 66 * Math.floor(i / 4)]);

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0), [RAIL_X[0], RAILS[0], BAR_Z + 6], [RAIL_X[1], RAILS[1], BAR_Z + 6]],
  WIDTH, HEIGHT, { pad: 22, azimuth: 62 },
);
const at = (p) => k.iso(p, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (pts, style) => k.dotsSvg(pts, style);
const byDepth = (pts) => [...pts].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
const V = G.viewOf(P);

// ---- base -------------------------------------------------------------------
function base() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(PLATE, 24))) {
    out.push(S(k.cylinder(x, y, 7, -PLATE_H - FOOT_H, 1.6, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 5.4, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: "mid" }));
  }
  out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.6), { tone: "mid", inner: L(k.sideSeam(PLATE, -PLATE_H + 4, P, 8), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 5), 0, P), { tone: "lo" }));
  const screws = k.corners(PLATE, 10);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));
  // millimetre ruler along the long axis, under the specimen
  const strip = { x: AXIS.x - 4, y: AXIS.y + 34, w: LV.length + 8, d: 7, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(AXIS.x, AXIS.x + LV.length, 2, 5, strip.y + 0.6, 0.6, [1.6, 3.4], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(D([at([strip.x + 1.6, strip.y + 4.6, 0.6]), at([strip.x + strip.w - 1.6, strip.y + 4.6, 0.6])], { size: 0.4 }));
  // label plate with three rule lines
  const label = { x: -140, y: -112, w: 58, d: 24, r: 2 };
  out.push(S(k.slabOf(label, 0, 0.8, P, 4), { tone: "lo" }));
  out.push(L(k.planOutline(k.insetPlan(label, 1.6), 0.8, P, 4), { tone: "faint" }));
  [[44], [34], [40]].forEach(([w], i) => out.push(L(k.lineOnTop([label.x + 6, label.y + 7 + i * 5], [label.x + 6 + w, label.y + 7 + i * 5], 0.8, P), { tone: "lo", free: true })));
  out.push(D([at([label.x + 3.4, label.y + 3.4, 0.8]), at([label.x + label.w - 3.4, label.y + label.d - 3.4, 0.8])], { size: 0.4 }));
  return out.join("");
}

// ---- rails the gantry runs on -----------------------------------------------
function rail(y) {
  const out = [];
  out.push(S(k.slabOf({ x: RAIL_X[0], y: y - 3, w: RAIL_X[1] - RAIL_X[0], d: 6, r: 1 }, 0, 4, P, 3, 0.4), { tone: "mid" }));
  out.push(D([RAIL_X[0] + 8, (RAIL_X[0] + RAIL_X[1]) / 2, RAIL_X[1] - 8].map((x) => at([x, y, 4])), { size: 0.4 }));
  for (const x of [RAIL_X[0] - 6, RAIL_X[1]]) {
    out.push(S(k.slabOf({ x, y: y - 6, w: 6, d: 12, r: 1.2 }, 0, 9, P, 3, 0.5), { tone: "mid" }));
    out.push(D([at([x + 3, y - 3, 9]), at([x + 3, y + 3, 9])], { size: 0.45 }));
  }
  return out.join("");
}

// ---- gantry halves (built at x = 0, moved with translateAlong) ---------------
const POST = (y) => ({ x: -4, y: y - 4, w: 8, d: 8, r: 1.5 });
function carriage(y) {
  const out = [`<path class="iso-halo" d="${k.haloOf({ x: -8, y: y - 7, w: 16, d: 14, r: 2 }, 4, 0.1, P)}" style="filter:blur(3px)"/>`];
  const block = { x: -9, y: y - 7, w: 18, d: 14, r: 2 };
  out.push(S(k.slabOf(block, 4, 8, P, 4, 0.6), { tone: "mid", inner: L(k.sideSeam(block, 8, P, 4), { tone: "faint" }) }));
  out.push(D(k.corners(block, 3).map(([x, yy]) => at([x, yy, 12])), { size: 0.4 }));
  out.push(S(k.slabOf(POST(y), 12, BAR_Z - 12, P, 3, 0.4), { tone: "mid" }));
  out.push(L(k.sideSeam(POST(y), 30, P, 3) + k.sideSeam(POST(y), 56, P, 3), { tone: "faint" }));
  return out.join("");
}
function knob(y) {
  // thumb knob on the outside face of the near carriage
  const out = [];
  out.push(S(k.slabOf({ x: -1.6, y: y + 7, w: 3.2, d: 3, r: 0.8 }, 6, 3.4, P, 2), { tone: "mid", crease: "none" }));
  out.push(S(k.cylinder(0, y + 12.6, 3.2, 3.6, 6.8, P, 22), { tone: "mid" }));
  out.push(L(k.knurl(0, y + 12.6, 3.2, 3.6, 10.4, 20, P), { tone: "lo" }));
  return out.join("");
}
function blade() {
  const out = [];
  const holder = { x: -3, y: RAILS[0] + 12, w: 6, d: RAILS[1] - RAILS[0] - 24, r: 1 };
  out.push(S(k.slabOf(holder, BLADE_Z + 3, BAR_Z - BLADE_Z - 3, P, 3, 0.4), { tone: "mid" }));
  out.push(D([holder.y + 6, holder.y + holder.d / 2, holder.y + holder.d - 6].map((yy) => at([3, yy, BLADE_Z + 7])), { size: 0.4 }));
  const edge = { x: -0.6, y: holder.y + 2, w: 1.2, d: holder.d - 4, r: 0.3 };
  out.push(S(k.slabOf(edge, BLADE_Z, 3, P, 2), { tone: "hi", lit: true }));
  return out.join("");
}
function crossbar() {
  const bar = { x: -6, y: RAILS[0] - 6, w: 12, d: RAILS[1] - RAILS[0] + 12, r: 2 };
  return S(k.slabOf(bar, BAR_Z, 6, P, 4, 0.6), { tone: "mid", inner: L(k.sideSeam(bar, BAR_Z + 3, P, 4), { tone: "faint" }) })
    + D([RAILS[0], RAILS[1]].map((yy) => at([0, yy, BAR_Z + 6])), { size: 0.5 })
    + L(k.ring(0, RAILS[0], 2, BAR_Z + 6, P, 14) + k.ring(0, RAILS[1], 2, BAR_Z + 6, P, 14), { tone: "lo" });
}

// ---- the specimen -----------------------------------------------------------
// angle on the shell: 0 = lateral (+y, toward the viewer), 90 = anterior (up)
function shellPatches() {
  const out = [];
  const rows = 18, cols = SECTORS * 2;
  for (let i = 0; i < rows; i++) {
    const s0 = LV.length - (i / rows) * LV.length, s1 = LV.length - ((i + 1) / rows) * LV.length;
    const t = (i + 0.5) / rows;
    for (let j = 0; j < cols; j++) {
      const a0 = (j / cols) * 2 * Math.PI, a1 = ((j + 1) / cols) * 2 * Math.PI, am = (a0 + a1) / 2;
      const sm = (s0 + s1) / 2;
      if (G.facingOf(F, am, P, dr(sm)) < 0.03) continue;
      const cell = cellAt(t, (am * 180) / Math.PI, 1);
      if (cell.cls === "normal") continue;
      const pts = [];
      for (let q = 0; q <= 3; q++) pts.push(at(G.pointOf(F, s0, r(s0), a0 + ((a1 - a0) * q) / 3)));
      for (let q = 0; q <= 3; q++) pts.push(at(G.pointOf(F, s1, Math.max(r(s1), 0.4), a1 - ((a1 - a0) * q) / 3)));
      const fill = cell.cls === "nm" ? "url(#cm-hatch)" : COLOR[cell.cls];
      out.push(`<path class="cm-tint" d="${k.pathOf(pts, true)}" fill="${fill}" stroke="${fill}"/>`);
    }
  }
  return `<g class="cm-tints">${out.join("")}</g>`;
}
function specimen() {
  const knots = [];
  for (let q = 0; q <= 30; q++) { const s = 0.5 + ((LV.length - 0.5) * q) / 30; knots.push([s, r(s), 1]); }
  const body = G.solidOf(knots, F, P, { smooth: { slope: dr, radius: r } });
  const rows = [];
  // faint grid arcs at the level boundaries (base | mid | apex)
  for (const tt of [1 / 3, 2 / 3]) { const s = LV.length * (1 - tt); rows.push(G.arcOf(F, s, r(s), P, { slope: dr(s) })); }
  const inner = shellPatches() + L(rows.join(""), { tone: "lo" });
  const out = [S(body, { tone: "hi", inner })];
  // the open base: the cavity, its inner wall, the rim
  const sb = LV.length, rIn = r(sb) - wall(sb);
  out.push(`<path class="cm-cavity" d="${G.circleOf(F, sb, rIn, P)}"/>`);
  out.push(L(G.circleOf(F, sb, rIn, P), { tone: "mid" }));
  return out.join("");
}
function pads() {
  const out = [];
  for (const s of [22, 64]) {
    const x = AXIS.x + s, top = AXIS.z - r(s);
    out.push(S(k.slabOf({ x: x - 9, y: AXIS.y - 15, w: 18, d: 30, r: 2 }, 0, 6, P, 4, 0.6), { tone: "mid" }));
    out.push(D([at([x - 6, AXIS.y - 12, 6]), at([x + 6, AXIS.y + 12, 6])], { size: 0.45 }));
    out.push(S(k.cylinder(x, AXIS.y, 6, 6, top - 6, P, 28, 0.5), { tone: "mid" }));
    out.push(L(k.sideArc(x, AXIS.y, 6, 10, P, 18), { tone: "faint" }));
  }
  return out.join("");
}

// ---- the tray of cut rings ----------------------------------------------------
function ringCells(cx, cy, z, rIn, rOut, t) {
  const out = [];
  const rMid = (rIn + rOut) / 2;
  for (let j = 0; j < SECTORS; j++) {
    for (let layer = 0; layer < 2; layer++) {
      const a0 = (j / SECTORS) * 360, a1 = ((j + 1) / SECTORS) * 360;
      const cell = cellAt(t, (a0 + a1) / 2, layer);
      const ri = layer === 0 ? rIn : rMid, ro = layer === 0 ? rMid : rOut;
      const pts = [];
      // short-axis display: anterior to the back (-y), septum to the left (-x)
      for (let q = 0; q <= 3; q++) { const a = ((a0 + ((a1 - a0) * q) / 3) * Math.PI) / 180; pts.push([cx + ro * Math.cos(a), cy - ro * Math.sin(a)]); }
      for (let q = 0; q <= 3; q++) { const a = ((a1 - ((a1 - a0) * q) / 3) * Math.PI) / 180; pts.push([cx + ri * Math.cos(a), cy - ri * Math.sin(a)]); }
      const fill = cell.cls === "nm" ? "url(#cm-hatch)" : COLOR[cell.cls];
      out.push(`<path class="cm-cell" d="${k.onTop(pts, z, P, true)}" fill="${fill}" stroke="${fill}"/>`);
    }
  }
  return out.join("") + L(k.ring(cx, cy, rMid, z, P, 64), { tone: "faint" });
}
function slice(i) {
  const s = SLICES[i], t = 1 - s / LV.length;
  const [cx, cy] = SPOTS[i];
  const rOut = r(s), rIn = rOut - wall(s);
  const z0 = TRAY_H, z1 = TRAY_H + SLICE.thick;
  const FZ = G.frameOf([cx, cy, 0], [0, 0, 1], [1, 0, 0], [0, 1, 0]);
  const body = G.lathe([[z0, rIn], [z0, rOut], [z1, rOut], [z1, rIn]], FZ, P, { hole: [z1, rIn] });
  const wallIn = G.lathe([[z1, rIn], [z0, rIn]], FZ, P, { fill: "facets" });
  const id = `cm-hole-${i}`;
  const hole = `<clipPath id="${id}"><path d="${G.circleOf(FZ, z1, rIn, P)}"/></clipPath><g clip-path="url(#${id})"><path class="cm-floor" d="${G.circleOf(FZ, z0, rIn, P)}"/>${S(wallIn, { tone: "lo", crease: "none" })}</g>`;
  return `<g class="cm-slice" data-slice="${i}"><path class="iso-halo" d="${G.circleOf(FZ, z0, rOut, P)}" style="filter:blur(4px)"/>${S(body, { tone: "hi", inner: ringCells(cx, cy, z1, rIn, rOut, t) })}${hole}</g>`;
}
function tray() {
  const out = [S(k.slabOf(TRAY, 0, TRAY_H, P, 6, 0.8), { tone: "mid", inner: L(k.sideSeam(TRAY, 1.5, P, 6), { tone: "faint" }) })];
  out.push(L(k.planOutline(k.insetPlan(TRAY, 4), TRAY_H, P, 6), { tone: "faint" }));
  out.push(D(k.corners(TRAY, 6).map(([x, y]) => at([x, y, TRAY_H])), { size: 0.45 }));
  // seat rings engraved where each slice sits
  out.push(L(SPOTS.map(([x, y], i) => k.ring(x, y, r(SLICES[i]) + 2.4, TRAY_H, P, 56)).join(""), { tone: "faint" }));
  return out.join("");
}

// ---- assemble ---------------------------------------------------------------
const restX = SLICES[3];
const move = (s) => k.translateAlong(P, [AXIS.x + s, 0, 0]);
const sliceOrder = SLICES.map((_, i) => i).sort((a, b) => k.depthOf([...SPOTS[a], 0], P) - k.depthOf([...SPOTS[b], 0], P));
const cutArcs = Array.from({ length: LV.length - 7 }, (_, q) => { const s = 4 + q; return G.arcOf(F, s, r(s), P, { slope: dr(s) }); });

const defs = `<defs><pattern id="cm-hatch" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3" height="3" fill="#fbfbfa"/><line x1="0" y1="0" x2="0" y2="3" stroke="#a9a9ad" stroke-width="1"/></pattern></defs>`;
const svg = k.figureSvg({
  width: WIDTH, height: HEIGHT,
  label: "Illustrative drawing. A left ventricle lies on a slicing bench, apex to the left and the open base to the right. A blade gantry rides two rails along its long axis. In front, a tray holds eight 8 mm short-axis rings cut from base to apex; each ring top is divided into 24 sectors and two layers, coloured by tissue class.",
  body: [
    defs, base(), rail(RAILS[0]),
    `<g data-part="back" transform="${move(restX)}">${carriage(RAILS[0])}</g>`,
    pads(), specimen(),
    `<path data-part="cut" class="iso-line" data-tone="lit" d="${cutArcs[restX - 4]}" style="stroke-width:1.2"/>`,
    `<g data-part="blade" transform="${move(restX)}">${blade()}</g>`,
    rail(RAILS[1]),
    `<g data-part="front" transform="${move(restX)}">${carriage(RAILS[1])}${knob(RAILS[1])}${crossbar()}</g>`,
    tray(), ...sliceOrder.map(slice),
  ],
});

const readoutOf = (i) => `${levelOf(1 - SLICES[i] / LV.length)} slice · ${LV.length - SLICES[i] - 4}–${LV.length - SLICES[i] + 4} mm from the base`;

const live = `
(() => {
const P = ${JSON.stringify(P)};
const AX = ${AXIS.x}, SL = ${JSON.stringify(SLICES)}, ARCS = ${JSON.stringify(cutArcs)};
const LABELS = ${JSON.stringify(SLICES.map((_, i) => readoutOf(i)))};
const stage = document.querySelector('[data-fig="slicer"]');
const svg = stage.querySelector("svg");
const parts = ["back", "blade", "front"].map((n) => svg.querySelector('[data-part="' + n + '"]'));
const cut = svg.querySelector('[data-part="cut"]');
const slices = [...svg.querySelectorAll(".cm-slice")].sort((a, b) => a.dataset.slice - b.dataset.slice);
const readout = stage.closest(".iso-figure").querySelector("[data-readout]");
const still = matchMedia("(prefers-reduced-motion: reduce)");
let s = SL[3], target = s, pick = 3, frame = 0, last = 0, clock = 0, touring = !still.matches, visible = false, idle = 0;
const lift = SL.map(() => 0);
function draw() {
  const tr = translateAlong(P, [AX + s, 0, 0]);
  parts.forEach((p) => p.setAttribute("transform", tr));
  cut.setAttribute("d", ARCS[Math.max(0, Math.min(ARCS.length - 1, Math.round(s) - 4))]);
  slices.forEach((g, i) => {
    g.setAttribute("transform", "translate(0 " + (-lift[i] * 7).toFixed(2) + ")");
    const solid = g.querySelector(".iso-solid");
    if (i === pick) solid.setAttribute("data-lit", ""); else solid.removeAttribute("data-lit");
  });
  if (readout.textContent !== LABELS[pick]) readout.textContent = LABELS[pick];
  stage.setAttribute("aria-valuenow", String(pick + 1));
  stage.setAttribute("aria-valuetext", LABELS[pick]);
}
function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
  last = now;
  if (touring) { clock += dt; pick = Math.floor(clock / 1.8) % SL.length; target = SL[pick]; }
  s = still.matches ? target : s + (target - s) * (1 - Math.exp(-dt / 0.32));
  if (Math.abs(target - s) < 0.02) s = target;
  let moving = s !== target;
  lift.forEach((v, i) => { const want = i === pick && Math.abs(target - s) < 3 ? 1 : 0; const nv = still.matches ? want : v + (want - v) * (1 - Math.exp(-dt / 0.22)); lift[i] = Math.abs(nv - want) < 0.002 ? want : nv; if (lift[i] !== want) moving = true; });
  draw();
  frame = visible && (touring || moving) ? requestAnimationFrame(tick) : 0;
}
const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
const steer = (i) => { touring = false; pick = i; target = SL[i]; clearTimeout(idle); idle = setTimeout(() => { touring = !still.matches; clock = pick * 1.8; run(); }, 4000); run(); };
new IntersectionObserver((e) => { visible = e[e.length - 1].isIntersecting; if (visible) run(); }, { rootMargin: "120px 0px" }).observe(stage);
stage.addEventListener("pointermove", (ev) => {
  const b = svg.getBoundingClientRect();
  const share = Math.min(1, Math.max(0, ((ev.clientX - b.left) / b.width - 0.08) / 0.84));
  steer(Math.min(SL.length - 1, Math.floor(share * SL.length)));
});
stage.addEventListener("keydown", (ev) => {
  let to = null;
  if (ev.key === "ArrowRight" || ev.key === "ArrowDown") to = Math.min(SL.length - 1, pick + 1);
  if (ev.key === "ArrowLeft" || ev.key === "ArrowUp") to = Math.max(0, pick - 1);
  if (ev.key === "Home") to = 0;
  if (ev.key === "End") to = SL.length - 1;
  if (to === null) return;
  ev.preventDefault(); steer(to);
});
draw();
})();
`;

export const slicer = {
  html: k.plateHtml({
    fig: "Specimen",
    title: "Base to apex",
    hint: "Hover or use arrow keys to move the blade",
    readout: readoutOf(3),
    keys: [
      { mark: "lit", label: "The ring the blade cuts at this position" },
      { mark: "raised", label: "Left ventricle, 85 mm long, cut into eight 8 mm rings with 2 mm gaps" },
    ],
    body: `<div class="iso-stage" data-fig="slicer" tabindex="0" role="slider" aria-label="Specimen slicer: arrow keys move the blade from slice to slice" aria-valuemin="1" aria-valuemax="8" aria-valuenow="4">${svg}</div>`,
  }),
  script: live,
};
