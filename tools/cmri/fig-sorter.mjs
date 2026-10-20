// The rule engine as a coin sorter. A wall cell, as a token, is pushed along a
// rail past eight gates in a fixed order. Each gate's sensor checks one stated
// rule; the first gate that matches opens and the token drops into that bin.
// Later gates never see it. That is "first match wins".
import * as k from "../anatomy/kit/iso-kit.mjs";
import * as G from "../anatomy/kit/lathe.mjs";
import { CLASSES } from "./data.mjs";

const WIDTH = 620, HEIGHT = 380;

// ---- the model -------------------------------------------------------------------
// rules in the engine's order; each reads the cell's measured flags
export const RULES = [
  { cls: "nm", test: (c) => c.qcFail, ask: "Did segmentation or quality control fail?" },
  { cls: "void", test: (c) => c.lge && c.voidCore, ask: "Is there a dark core inside an LGE region?" },
  { cls: "active", test: (c) => c.lge && c.t2, ask: "LGE and raised T2 together?" },
  { cls: "scar", test: (c) => c.lge, ask: "LGE present?" },
  { cls: "edema", test: (c) => c.t2 && c.t1, ask: "Raised T2 with raised T1, in an edema pattern?" },
  { cls: "interstitial", test: (c) => c.ecv, ask: "ECV high, without LGE?" },
  { cls: "single", test: (c) => c.t1 || c.ecv || c.t2, ask: "Is exactly one of T1, ECV or T2 off?" },
  { cls: "normal", test: () => true, ask: "Otherwise" },
];
export const EXAMPLES = [
  { flags: { lge: true, t2: false, t1: true, ecv: true }, say: "LGE yes · ECV high · T2 normal" },
  { flags: { lge: false, t2: true, t1: true, ecv: false }, say: "no LGE · T2 high · T1 high" },
  { flags: { lge: true, t2: true, t1: true, ecv: true }, say: "LGE yes · T2 high" },
  { flags: { lge: false, t2: false, t1: true, ecv: true }, say: "no LGE · ECV high" },
  { flags: { qcFail: true }, say: "contour failed QC" },
  { flags: { lge: false, t2: false, t1: true, ecv: false }, say: "only T1 high" },
  { flags: { lge: true, voidCore: true, t1: true, ecv: true }, say: "LGE with a dark core" },
  { flags: {}, say: "every channel in range" },
];
export const sortOf = (flags) => RULES.findIndex((r) => r.test(flags));

// ---- world layout -----------------------------------------------------------------
const PLATE = { x: -196, y: -62, w: 392, d: 124, r: 9 };
const PLATE_H = 10, FOOT_H = 4;
const PITCH = 40;
const GATES = RULES.map((_, i) => -126 + i * PITCH);
const RAIL = { y0: -7, y1: 7, z0: 62, z1: 68 };
const HOLE = 9; // half-width of a gate opening along x
const COIN = { r: 6.4, h: 2.4 };
const BIN = { d: 36, w: 32, h: 20 };
const TOWER_X = [-176, 168];
const BEAM = { y: -30, z: 98 };
const START = -160;

const P = k.fitProjection([...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0), [TOWER_X[0], 0, 118], [TOWER_X[1], BEAM.y, BEAM.z + 8]], WIDTH, HEIGHT, { pad: 20, azimuth: 66 });
const at = (p) => k.iso(p, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (pts, style) => k.dotsSvg(pts, style);
const byDepth = (pts) => [...pts].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
const quad = (pts) => k.pathOf(pts.map(at), true);
const COLOR = Object.fromEntries(CLASSES.map((c) => [c.key, c.color]));

function base() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(PLATE, 18))) {
    out.push(S(k.cylinder(x, y, 6, -PLATE_H - FOOT_H, 1.4, P, 24), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 4.6, -PLATE_H - FOOT_H + 1.4, FOOT_H - 1.4, P, 24), { tone: "mid" }));
  }
  out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.4), { tone: "mid", inner: L(k.sideSeam(PLATE, -PLATE_H + 3, P, 8), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 4.5), 0, P), { tone: "lo" }));
  const screws = k.corners(PLATE, 9);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2, 0, P, 14)).join(""), { tone: "lo" }), D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.45 }));
  const strip = { x: GATES[0] - 20, y: PLATE.y + PLATE.d - 14, w: GATES[7] - GATES[0] + 40, d: 7, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const t = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.6, 0.6, [1.8, 3.4], P);
  out.push(L(t.minor, { tone: "lo" }), L(t.major, { tone: "mid" }));
  const label = { x: -186, y: -54, w: 46, d: 20, r: 2 };
  out.push(S(k.slabOf(label, 0, 0.8, P, 4), { tone: "lo" }), L(k.planOutline(k.insetPlan(label, 1.5), 0.8, P, 4), { tone: "faint" }));
  [30, 22, 26].forEach((w, i) => out.push(L(k.lineOnTop([label.x + 5, label.y + 6 + i * 4.4], [label.x + 5 + w, label.y + 6 + i * 4.4], 0.8, P), { tone: "lo", free: true })));
  return out.join("");
}

// bins are drawn in two passes: back + sides + stacked tokens, then the low front lip
const binPlan = (i) => ({ x: GATES[i] - BIN.w / 2, y: -BIN.d / 2, w: BIN.w, d: BIN.d, r: 2 });
function binBack(i) {
  const b = binPlan(i), T = 1.6;
  const out = [S(k.slabOf(b, 0, 2, P, 3, 0.4), { tone: "mid" })];
  out.push(S(k.slabOf({ x: b.x, y: b.y, w: b.w, d: T, r: 0.6 }, 2, BIN.h, P, 2), { tone: "mid" }));
  out.push(S(k.slabOf({ x: b.x, y: b.y, w: T, d: b.d, r: 0.6 }, 2, BIN.h, P, 2), { tone: "mid" }));
  out.push(S(k.slabOf({ x: b.x + b.w - T, y: b.y, w: T, d: b.d, r: 0.6 }, 2, BIN.h, P, 2), { tone: "mid" }));
  // a short stack of earlier tokens of this class
  const n = [2, 1, 3, 4, 2, 3, 2, 5][i];
  for (let q = 0; q < n; q++) out.push(token(GATES[i] + (q % 2) * 1.2 - 0.6, 2, 2 + q * COIN.h, RULES[i].cls, false));
  return out.join("");
}
function binFront(i) {
  const b = binPlan(i), lip = 9;
  const front = { x: b.x, y: b.y + b.d - 1.6, w: b.w, d: 1.6, r: 0.6 };
  const out = [S(k.slabOf(front, 2, lip, P, 2, 0.3), { tone: "mid" })];
  // class colour strip on the front face
  const y = b.y + b.d, x0 = b.x + 4, x1 = b.x + b.w - 4;
  out.push(`<path d="${quad([[x0, y, 7.5], [x1, y, 7.5], [x1, y, 4], [x0, y, 4]])}" fill="${RULES[i].cls === "nm" ? "url(#cs-hatch)" : COLOR[RULES[i].cls]}" class="cs-strip"/>`);
  out.push(L(quad([[x0, y, 7.5], [x1, y, 7.5], [x1, y, 4], [x0, y, 4]]), { tone: "mid" }));
  return out.join("");
}
function token(x, y, z, cls, live) {
  const solid = S(k.cylinder(x, y, COIN.r, z, COIN.h, P, 32, 0.3), { tone: "hi", lit: live });
  const face = cls ? `<path class="cs-face" d="${k.ring(x, y, COIN.r - 1.1, z + COIN.h, P, 32)}" fill="${cls === "nm" ? "url(#cs-hatch)" : COLOR[cls]}"/>` : `<path class="cs-face" d="${k.ring(x, y, COIN.r - 1.1, z + COIN.h, P, 32)}" fill="none"/>`;
  return `<g class="cs-token">${solid}${face}</g>`;
}

function towers() {
  const out = [];
  for (const [i, x] of TOWER_X.entries()) {
    const t = { x: x - 7, y: -16, w: 14, d: 26, r: 2 };
    out.push(S(k.slabOf(t, 0, BEAM.z - 0, P, 3, 0.6), { tone: "mid", inner: L(k.sideSeam(t, 30, P, 3) + k.sideSeam(t, RAIL.z0 - 4, P, 3), { tone: "faint" }) }));
    out.push(D(k.corners(t, 3).map(([xx, yy]) => at([xx, yy, BEAM.z])), { size: 0.4 }));
    if (i === 0) {
      // hopper: a feed tube the tokens drop out of onto the rail
      out.push(S(k.cylinder(x + 15, 0, 8, RAIL.z1 + 6, 30, P, 32, 0.5), { tone: "mid", inner: L(k.sideArc(x + 15, 0, 8, RAIL.z1 + 22, P, 24), { tone: "faint" }) }));
      out.push(`<path class="cm-cavity" d="${k.ring(x + 15, 0, 6.4, RAIL.z1 + 36, P, 32)}"/>`, L(k.ring(x + 15, 0, 6.4, RAIL.z1 + 36, P, 32), { tone: "mid" }));
      out.push(S(k.slabOf({ x: x + 5, y: -4, w: 4, d: 8, r: 0.8 }, RAIL.z1 + 10, 6, P, 2), { tone: "mid" }));
    }
  }
  return out.join("");
}
function beam() {
  const out = [];
  const b = { x: TOWER_X[0] - 7, y: BEAM.y - 5, w: TOWER_X[1] - TOWER_X[0] + 14, d: 10, r: 2 };
  out.push(S(k.slabOf(b, BEAM.z, 7, P, 4, 0.6), { tone: "mid", inner: L(k.sideSeam(b, BEAM.z + 3.5, P, 4), { tone: "faint" }) }));
  for (const x of GATES) {
    // arm out over the rail and a sensor head above each gate
    out.push(S(k.slabOf({ x: x - 3, y: BEAM.y + 5, w: 6, d: -BEAM.y - 5, r: 1 }, BEAM.z + 1, 4, P, 2, 0.3), { tone: "mid" }));
    out.push(D([at([x, BEAM.y + 1, BEAM.z + 7])], { size: 0.45 }));
  }
  return out.join("");
}
// hangers between the gates carry the rail from the beam
function hangers() {
  const out = [];
  for (let i = 0; i < GATES.length - 1; i++) {
    const x = GATES[i] + PITCH / 2;
    out.push(S(k.slabOf({ x: x - 2, y: BEAM.y + 2, w: 4, d: RAIL.y0 - BEAM.y - 2, r: 0.6 }, RAIL.z0, 3, P, 2, 0.3), { tone: "mid" }));
    out.push(S(k.slabOf({ x: x - 2, y: BEAM.y + 2, w: 4, d: 3, r: 0.6 }, RAIL.z0 + 3, BEAM.z - RAIL.z0 - 3, P, 2, 0.3), { tone: "mid" }));
    out.push(D([at([x, RAIL.y0 - 3.5, RAIL.z0 + 3])], { size: 0.4 }));
  }
  return out.join("");
}
function sensors() {
  return GATES.map((x, i) => `<g class="cs-sensor" data-gate="${i}">${S(k.cylinder(x, 0, 4.2, RAIL.z1 + 10, BEAM.z + 1 - RAIL.z1 - 10, P, 24, 0.4), { tone: "mid", inner: L(k.sideArc(x, 0, 4.2, RAIL.z1 + 15, P, 16), { tone: "faint" }) })}${L(k.ring(x, 0, 2.2, RAIL.z1 + 10, P, 16), { tone: "lo" })}</g>`).join("");
}
function rail() {
  const out = [];
  const edges = [TOWER_X[0] + 7, ...GATES.flatMap((x) => [x - HOLE, x + HOLE]), TOWER_X[1] - 7];
  for (let q = 0; q < edges.length; q += 2) {
    const seg = { x: edges[q], y: RAIL.y0, w: edges[q + 1] - edges[q], d: RAIL.y1 - RAIL.y0, r: 0.8 };
    out.push(S(k.slabOf(seg, RAIL.z0, RAIL.z1 - RAIL.z0, P, 2, 0.4), { tone: "mid" }));
    out.push(L(k.lineOnTop([seg.x, 0], [seg.x + seg.w, 0], RAIL.z1, P), { tone: "faint" }));
  }
  return out.join("");
}
// a gate flap, closed (level in the opening) or open (hanging from its hinge)
function flap(i, open) {
  const x = GATES[i];
  return open
    ? S(k.slabOf({ x: x - HOLE, y: RAIL.y0 + 0.6, w: 1.4, d: RAIL.y1 - RAIL.y0 - 1.2, r: 0.4 }, RAIL.z1 - 2 * HOLE + 1, 2 * HOLE - 1, P, 2), { tone: "mid" })
    : S(k.slabOf({ x: x - HOLE + 0.4, y: RAIL.y0 + 0.6, w: 2 * HOLE - 0.8, d: RAIL.y1 - RAIL.y0 - 1.2, r: 0.4 }, RAIL.z1 - 1.6, 1.6, P, 2), { tone: "mid", crease: "none" });
}

// ---- assemble ------------------------------------------------------------------
const defs = `<defs><pattern id="cs-hatch" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3" height="3" fill="#fbfbfa"/><line x1="0" y1="0" x2="0" y2="3" stroke="#a9a9ad" stroke-width="1"/></pattern></defs>`;
const flaps = GATES.map((_, i) => `<g class="cs-flap" data-gate="${i}"><g data-state="closed">${flap(i, false)}</g><g data-state="open" style="display:none">${flap(i, true)}</g></g>`);
// the live token is built at the start position and moved with translateAlong
const liveToken = (layer) => `<g data-token="${layer}">${token(START, 0, RAIL.z1, null, true)}</g>`;
const pusher = `<g data-part="pusher">${S(k.slabOf({ x: START - COIN.r - 6, y: RAIL.y0 + 1, w: 4, d: RAIL.y1 - RAIL.y0 - 2, r: 0.8 }, RAIL.z1, 7, P, 2, 0.3), { tone: "mid" })}${S(k.slabOf({ x: START - COIN.r - 12, y: -2, w: 6, d: 4, r: 0.8 }, RAIL.z1 + 3, 3, P, 2), { tone: "mid", crease: "none" })}</g>`;

const svg = k.figureSvg({
  width: WIDTH, height: HEIGHT,
  label: "Illustrative drawing. A token sorter: a rail with eight trap-door gates, a sensor above each gate and a bin under each. A pusher slides a token along the rail; the first gate whose rule matches opens and the token drops into that gate's bin.",
  body: [
    defs, base(), towers(), hangers(),
    ...GATES.map((_, i) => binBack(i)),
    liveToken("low"),
    ...GATES.map((_, i) => binFront(i)),
    ...flaps, rail(), liveToken("high"), pusher, beam(), sensors(),
  ],
});

const live = `
(() => {
const P = ${JSON.stringify(P)};
const GATES = ${JSON.stringify(GATES)}, START = ${START}, RZ = ${RAIL.z1}, CH = ${COIN.h};
const EX = ${JSON.stringify(EXAMPLES.map((e) => ({ say: e.say, gate: sortOf(e.flags) })))};
const NAMES = ${JSON.stringify(RULES.map((r) => CLASSES.find((c) => c.key === r.cls).name))};
const COLORS = ${JSON.stringify(RULES.map((r) => (r.cls === "nm" ? "url(#cs-hatch)" : COLOR[r.cls])))};
const fig = document.querySelector('[data-fig="sorter"]').closest(".iso-figure");
const stage = fig.querySelector(".iso-stage");
const svg = stage.querySelector("svg");
const hi = svg.querySelector('[data-token="high"]'), lo = svg.querySelector('[data-token="low"]');
const pusher = svg.querySelector('[data-part="pusher"]');
const faces = [hi, lo].map((g) => g.querySelector(".cs-face"));
const flaps = [...svg.querySelectorAll(".cs-flap")];
const sensors = [...svg.querySelectorAll(".cs-sensor")];
const readout = fig.querySelector("[data-readout]");
const pick = [...fig.querySelectorAll("[data-example]")];
const still = matchMedia("(prefers-reduced-motion: reduce)");
// phases: slide (x eases to gate), drop (z falls), rest (pause), then next
let ex = 0, x = START, z = RZ, vz = 0, phase = "slide", hold = 0, frame = 0, last = 0, visible = false, auto = true, binZ = 0;
const STACK = [2, 1, 3, 4, 2, 3, 2, 5];
const restZ = (g) => 2 + STACK[g] * CH;
function setFlaps(open) { flaps.forEach((f, i) => { const o = i === open; f.querySelector('[data-state="open"]').style.display = o ? "" : "none"; f.querySelector('[data-state="closed"]').style.display = o ? "none" : ""; }); }
function draw() {
  const g = EX[ex].gate;
  const t = translateAlong(P, [x - START, 0, z - RZ]);
  const low = z < RZ - 0.5;
  hi.style.display = low ? "none" : ""; lo.style.display = low ? "" : "none";
  (low ? lo : hi).setAttribute("transform", t);
  pusher.setAttribute("transform", translateAlong(P, [Math.min(x, GATES[g]) - START, 0, 0]));
  const near = GATES.findIndex((gx) => Math.abs(gx - x) < 6);
  sensors.forEach((s, i) => s.toggleAttribute("data-on", i === near && phase === "slide"));
  const done = phase !== "slide";
  faces.forEach((f) => f.setAttribute("fill", done ? COLORS[g] : "none"));
  const text = EX[ex].say + " → " + (done ? NAMES[g] : "…");
  if (readout.textContent !== text) readout.textContent = text;
  pick.forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.example === ex)));
}
function start(i) { ex = i; x = START; z = RZ; vz = 0; phase = "slide"; setFlaps(-1); run(); }
function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60; last = now;
  const g = EX[ex].gate;
  if (still.matches) { x = GATES[g]; z = restZ(g); phase = "rest"; setFlaps(g); draw(); frame = 0; return; }
  if (phase === "slide") {
    x = Math.min(GATES[g], x + 70 * dt);
    if (x >= GATES[g]) { phase = "drop"; setFlaps(g); }
  } else if (phase === "drop") {
    vz -= 900 * dt; z += vz * dt;
    if (z <= restZ(g)) { z = restZ(g); phase = "rest"; hold = 1.6; }
  } else if (phase === "rest") {
    hold -= dt;
    if (hold <= 0 && auto) { start((ex + 1) % EX.length); return; }
  }
  draw();
  frame = visible && (phase !== "rest" || auto) ? requestAnimationFrame(tick) : 0;
}
function run() { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } }
pick.forEach((b) => b.addEventListener("click", () => { auto = false; cancelAnimationFrame(frame); frame = 0; start(+b.dataset.example); }));
stage.addEventListener("keydown", (e) => {
  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
  e.preventDefault(); auto = false; cancelAnimationFrame(frame); frame = 0;
  start((ex + (e.key === "ArrowRight" ? 1 : EX.length - 1)) % EX.length);
});
new IntersectionObserver((en) => { visible = en[en.length - 1].isIntersecting; if (visible) run(); }, { rootMargin: "120px 0px" }).observe(stage);
draw();
})();
`;

const picker = `<div class="lb-pick" role="group" aria-label="Drop a cell">${EXAMPLES.map((e, i) => `<button type="button" data-example="${i}" aria-pressed="${i === 0}">${e.say}</button>`).join("")}</div>`;

export const sorter = {
  html: k.plateHtml({
    fig: "Rule engine",
    title: "First match wins",
    hint: "Pick a cell below, or arrow keys",
    readout: `${EXAMPLES[0].say} → …`,
    keys: [
      { mark: "lit", label: "The cell being sorted" },
      { mark: "raised", label: "Eight gates, checked left to right; each bin’s colour strip is its tissue class" },
    ],
    caption: "Illustrative. Each gate asks one stated question about the cell’s measured channels. The token stops at the first gate that says yes, so a cell with LGE and raised T2 is called “LGE with raised T2” before the plain scar gate can see it. There is no learned model here: the rules are written down and run in the same order every time.",
    body: `<div class="iso-stage" data-fig="sorter" tabindex="0" aria-label="Rule engine sorter: left and right arrow keys drop the previous or next example cell">${svg}</div>`,
  }).replace("</figure>", `${picker}</figure>`),
  script: live,
};
