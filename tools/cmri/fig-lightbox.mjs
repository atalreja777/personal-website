// Four-panel film light box: the same short-axis slice hung four times, as a
// native T1 map, an ECV map, a T2 map and an LGE image. A planted lesion lights
// up differently in each panel. Hover a panel to read it; the buttons swap the lesion.
import * as k from "../anatomy/kit/iso-kit.mjs";
import * as G from "../anatomy/kit/lathe.mjs";

const WIDTH = 620, HEIGHT = 400;

// ---- the model: what each channel shows, on a 0..1 display scale ------------
export const CHANNELS = [
  { key: "t1", name: "Native T1", map: true, measures: "how long tissue takes to relax magnetically" },
  { key: "ecv", name: "ECV", map: true, measures: "the share of the wall that is space between cells" },
  { key: "t2", name: "T2", map: true, measures: "how much free water the tissue holds" },
  { key: "lge", name: "LGE", map: false, measures: "where contrast is still lingering ten or more minutes after injection" },
];
const NORMAL = { t1: 0.4, ecv: 0.3, t2: 0.38, lge: 0.04 };
const BLOOD = { t1: 0.86, ecv: 0.74, t2: 0.62, lge: 0.52 };
export const LESIONS = {
  scar: {
    name: "Scar",
    where: (a, d) => a > 290 && a < 340 && d < 0.6, // inferolateral, inner wall
    value: { t1: 0.7, ecv: 0.92, t2: 0.4, lge: 1 },
    verdict: { t1: "raised", ecv: "raised", t2: "normal", lge: "bright" },
    call: "Scar: bright on LGE, high ECV, normal T2",
  },
  edema: {
    name: "Swelling",
    where: (a, d) => (a > 330 || a < 30) && d > 0.45, // lateral, outer wall
    value: { t1: 0.68, ecv: 0.5, t2: 0.88, lge: 0.07 },
    verdict: { t1: "raised", ecv: "slightly up", t2: "raised", lge: "dark" },
    call: "Swelling: high T2 and T1, nothing on LGE",
  },
  diffuse: {
    name: "Diffuse fibrosis",
    where: () => true, // the whole wall
    value: { t1: 0.55, ecv: 0.64, t2: 0.38, lge: 0.05 },
    verdict: { t1: "slightly up", ecv: "raised", t2: "normal", lge: "dark" },
    call: "Diffuse fibrosis: high ECV across the whole wall, nothing on LGE",
  },
};

// colour ramps: parametric maps in a dark-to-warm ramp, LGE in greys
const RAMP = [[18, 24, 58], [74, 46, 120], [168, 60, 110], [232, 112, 64], [247, 205, 98]];
const ramp = (v) => {
  const x = Math.max(0, Math.min(0.999, v)) * (RAMP.length - 1), i = Math.floor(x), f = x - i;
  const c = RAMP[i].map((c0, j) => Math.round(c0 + (RAMP[i + 1][j] - c0) * f));
  return `rgb(${c.join(",")})`;
};
const grey = (v) => { const g = Math.round(14 + 236 * Math.max(0, Math.min(1, v))); return `rgb(${g},${g},${g})`; };
const paint = (ch, v) => (ch === "lge" ? grey(v) : ramp(v));
const noise = (i, j, c) => { let h = (i * 92821) ^ (j * 68917) ^ (c * 1259); h = Math.imul(h ^ (h >>> 13), 1274126177); return (((h ^ (h >>> 16)) >>> 0) / 4294967296 - 0.5) * 0.06; };

// one short-axis image in panel coordinates (0..W, 0..H), as SVG
const IMG = { w: 58, h: 66, cx: 31, cy: 34, rOut: 21, rIn: 13.5 };
function image(ch, lesion) {
  const out = [];
  const bg = ch === "lge" ? grey(0.1) : ramp(0.12);
  out.push(`<rect width="${IMG.w}" height="${IMG.h}" fill="${bg}"/>`);
  // the right ventricle, a crescent on the septal (left) side
  const rv = ch === "lge" ? grey(0.42) : paint(ch, BLOOD[ch] * 0.92);
  out.push(`<path d="M ${IMG.cx - 12} ${IMG.cy - 18} A 26 26 0 0 0 ${IMG.cx - 12} ${IMG.cy + 18} A 21 21 0 0 1 ${IMG.cx - 12} ${IMG.cy - 18} Z" fill="${rv}"/>`);
  out.push(`<circle cx="${IMG.cx}" cy="${IMG.cy}" r="${IMG.rIn}" fill="${paint(ch, BLOOD[ch])}"/>`);
  const N = 40, M = 4;
  for (let i = 0; i < N; i++) for (let j = 0; j < M; j++) {
    const a0 = (i / N) * 360, a1 = ((i + 1) / N) * 360, d0 = j / M, d1 = (j + 1) / M;
    const a = (a0 + a1) / 2, d = (d0 + d1) / 2;
    const v = (lesion && LESIONS[lesion].where(a, d) ? LESIONS[lesion].value[ch] : NORMAL[ch]) + noise(i, j, ch.length);
    const pt = (aa, dd) => { const rr = IMG.rIn + (IMG.rOut - IMG.rIn) * dd, t = (aa * Math.PI) / 180; return `${(IMG.cx + rr * Math.cos(t)).toFixed(2)} ${(IMG.cy - rr * Math.sin(t)).toFixed(2)}`; };
    const c = paint(ch, v);
    out.push(`<path d="M ${pt(a0, d0)} L ${pt(a1, d0)} L ${pt(a1, d1)} L ${pt(a0, d1)} Z" fill="${c}" stroke="${c}" stroke-width=".25"/>`);
  }
  return out.join("");
}

// ---- world layout -------------------------------------------------------------
const BASE = { x: -160, y: -40, w: 320, d: 74, r: 7 };
const BASE_H = 8, FOOT_H = 4;
const CASE = { x: -148, y: -22, w: 296, d: 18, r: 3 };
const CASE_Z0 = 10, CASE_Z1 = 108;
const FACE_Y = CASE.y + CASE.d; // the front face, normal +y
const WIN = { w: 58, h: 66, gap: 12, z1: 98 }; // window top at z1
const WIN_X = [0, 1, 2, 3].map((i) => -((WIN.w * 4 + WIN.gap * 3) / 2) + i * (WIN.w + WIN.gap));
const RECESS = 2.2;

const P = k.fitProjection([...k.boxCorners(BASE, -BASE_H - FOOT_H, 0), ...k.boxCorners(CASE, CASE_Z0, CASE_Z1 + 6)], WIDTH, HEIGHT, { pad: 24, azimuth: 70 });
const at = (p) => k.iso(p, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (pts, style) => k.dotsSvg(pts, style);
const byDepth = (pts) => [...pts].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
// a transform that maps panel (u right, w down) onto the vertical plane y = yy, origin at (x0, z0 top)
const faceMatrix = (x0, yy, z0) => {
  const o = at([x0, yy, z0]), ex = at([x0 + 1, yy, z0]), ez = at([x0, yy, z0 - 1]);
  return `matrix(${(ex[0] - o[0]).toFixed(4)} ${(ex[1] - o[1]).toFixed(4)} ${(ez[0] - o[0]).toFixed(4)} ${(ez[1] - o[1]).toFixed(4)} ${o[0].toFixed(2)} ${o[1].toFixed(2)})`;
};
const quad = (pts) => k.pathOf(pts.map(at), true);

function base() {
  const out = [`<path class="iso-halo" d="${k.haloOf(BASE, -BASE_H - FOOT_H, BASE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(BASE, 14))) {
    out.push(S(k.cylinder(x, y, 6, -BASE_H - FOOT_H, 1.4, P, 24), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 4.6, -BASE_H - FOOT_H + 1.4, FOOT_H - 1.4, P, 24), { tone: "mid" }));
  }
  out.push(S(k.slabOf(BASE, -BASE_H, BASE_H, P, 7, 1.4), { tone: "mid", inner: L(k.sideSeam(BASE, -BASE_H + 3, P, 7), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(BASE, 4), 0, P), { tone: "lo" }));
  const screws = k.corners(BASE, 8);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2, 0, P, 14)).join(""), { tone: "lo" }), D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.45 }));
  // the two stand feet the case sits in
  for (const x of [-120, 120]) {
    const shoe = { x: x - 14, y: CASE.y - 6, w: 28, d: CASE.d + 12, r: 2 };
    out.push(S(k.slabOf(shoe, 0, CASE_Z0, P, 4, 0.6), { tone: "mid", inner: L(k.sideSeam(shoe, 5, P, 4), { tone: "faint" }) }));
    out.push(D([at([x - 9, CASE.y - 3, CASE_Z0]), at([x + 9, FACE_Y + 3, CASE_Z0])], { size: 0.45 }));
  }
  // ruler strip along the front edge
  const strip = { x: -140, y: BASE.y + BASE.d - 13, w: 280, d: 7, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const t = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.6, 0.6, [1.8, 3.4], P);
  out.push(L(t.minor, { tone: "lo" }), L(t.major, { tone: "mid" }));
  return out.join("");
}

function caseBox() {
  const out = [];
  const seams = k.sideSeam(CASE, CASE_Z0 + 6, P, 3) + k.sideSeam(CASE, CASE_Z1 - 5, P, 3);
  out.push(S(k.slabOf(CASE, CASE_Z0, CASE_Z1 - CASE_Z0, P, 3, 1), { tone: "mid", inner: L(seams, { tone: "faint" }) }));
  // vent slots on the top face: closed outlines
  for (let i = 0; i < 14; i++) out.push(L(k.planOutline({ x: -126 + i * 18.6, y: CASE.y + 6, w: 10, d: 2.4, r: 1.1 }, CASE_Z1, P, 3), { tone: "lo" }));
  out.push(D([[-142, CASE.y + 4], [142, CASE.y + 4], [-142, FACE_Y - 4], [142, FACE_Y - 4]].map(([x, y]) => at([x, y, CASE_Z1])), { size: 0.45 }));
  // dimmer knob on the right side face (+x)
  const KF = G.frameAlong([CASE.x + CASE.w, CASE.y + 9, 40], [1, 0, 0]);
  out.push(S(G.disc(0, 2, 7, KF, P), { tone: "mid" }));
  out.push(S(G.disc(2, 7, 5.2, KF, P), { tone: "mid" }));
  out.push(k.fadedSvg(G.ribsOf(KF, 2, 7, 5.2, 28, P, { fade: [0.1, 0.55] }), { tone: "lo" }));
  return out.join("");
}

// the front face: bezel lines, windows with recess, film, clips, switches
function windows() {
  const out = [];
  WIN_X.forEach((x0, i) => {
    const z1 = WIN.z1, z0 = z1 - WIN.h, x1 = x0 + WIN.w, yb = FACE_Y - RECESS;
    const id = `lb-win-${i}`;
    const opening = quad([[x0, FACE_Y, z1], [x1, FACE_Y, z1], [x1, FACE_Y, z0], [x0, FACE_Y, z0]]);
    out.push(`<g class="lb-panel" data-panel="${i}">`);
    out.push(`<clipPath id="${id}"><path d="${opening}"/></clipPath><g clip-path="url(#${id})">`);
    // the glowing panel and the film on it, in the back plane
    out.push(`<g transform="${faceMatrix(x0, yb, z1)}"><rect class="lb-glow" width="${WIN.w}" height="${WIN.h}"/><g class="lb-film" data-ch="${CHANNELS[i].key}" transform="translate(0 0)"></g></g>`);
    // recess walls: the bottom wall faces up, the left wall faces +x (toward the viewer)
    out.push(`<path class="iso-top lb-wall" d="${quad([[x0, FACE_Y, z0], [x1, FACE_Y, z0], [x1, yb, z0], [x0, yb, z0]])}"/>`);
    out.push(`<path class="iso-shade lb-wall" data-shade="1" d="${quad([[x0, FACE_Y, z1], [x0, yb, z1], [x0, yb, z0], [x0, FACE_Y, z0]])}"/>`);
    out.push(L(k.pathOf([at([x0, yb, z1]), at([x0, yb, z0]), at([x1, yb, z0])]), { tone: "faint" }));
    out.push(`</g>`);
    out.push(`<path class="iso-line lb-rim" data-tone="lo" d="${opening}"/>`);
    // film clip at the top centre of the window
    const cx = x0 + WIN.w / 2;
    out.push(S(k.slabOf({ x: cx - 7, y: FACE_Y, w: 14, d: 2.4, r: 0.8 }, z1 - 3, 6, P, 2, 0.3), { tone: "mid" }));
    out.push(D([at([cx, FACE_Y + 2.4, z1 + 1])], { size: 0.4 }));
    // rocker switch under each window
    const sw = { x: cx - 4, y: FACE_Y, w: 8, d: 2, r: 0.8 };
    out.push(S(k.slabOf(sw, z0 - 13, 7, P, 2, 0.3), { tone: "mid" }));
    out.push(`</g>`);
  });
  return out.join("");
}

const svg = k.figureSvg({
  width: WIDTH, height: HEIGHT,
  label: "Illustrative drawing. A four-panel film light box on a stand. Each panel holds the same short-axis slice of the heart: a native T1 map, an ECV map, a T2 map and an LGE image. One planted lesion appears differently in each panel.",
  body: [base(), caseBox(), windows()],
});

const FILMS = {};
for (const ch of CHANNELS) for (const les of Object.keys(LESIONS)) FILMS[`${ch.key}:${les}`] = image(ch.key, les);

const live = `
(() => {
const FILMS = ${JSON.stringify(FILMS)};
const CH = ${JSON.stringify(CHANNELS.map((c) => ({ key: c.key, name: c.name })))};
const LES = ${JSON.stringify(Object.fromEntries(Object.entries(LESIONS).map(([key, l]) => [key, { name: l.name, verdict: l.verdict, call: l.call }])))};
const fig = document.querySelector('[data-fig="lightbox"]').closest(".iso-figure");
const stage = fig.querySelector(".iso-stage");
const panels = [...stage.querySelectorAll(".lb-panel")];
const readout = fig.querySelector("[data-readout]");
const buttons = [...fig.querySelectorAll("[data-lesion]")];
const call = fig.querySelector("[data-call]");
let lesion = "scar", focus = 3, touring = !matchMedia("(prefers-reduced-motion: reduce)").matches, timer = 0, idle = 0;
function show() {
  panels.forEach((p, i) => {
    const film = p.querySelector(".lb-film");
    const want = CH[i].key + ":" + lesion;
    if (film.dataset.on !== want) { film.innerHTML = FILMS[want]; film.dataset.on = want; }
    p.toggleAttribute("data-focus", i === focus);
  });
  buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lesion === lesion)));
  const text = CH[focus].name + " · lesion " + LES[lesion].verdict[CH[focus].key];
  if (readout.textContent !== text) readout.textContent = text;
  call.textContent = LES[lesion].call;
}
const tour = () => { clearInterval(timer); if (!touring) return; timer = setInterval(() => { focus = (focus + 1) % 4; show(); }, 1700); };
const hold = () => { touring = false; clearInterval(timer); clearTimeout(idle); idle = setTimeout(() => { touring = !matchMedia("(prefers-reduced-motion: reduce)").matches; tour(); }, 4000); };
stage.addEventListener("pointermove", (e) => {
  const b = stage.getBoundingClientRect();
  const i = Math.max(0, Math.min(3, Math.floor(((e.clientX - b.left) / b.width - 0.1) / 0.8 * 4)));
  hold(); if (i !== focus) { focus = i; show(); }
});
stage.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") focus = Math.min(3, focus + 1); else if (e.key === "ArrowLeft") focus = Math.max(0, focus - 1); else return;
  e.preventDefault(); hold(); show();
});
buttons.forEach((b) => b.addEventListener("click", () => { lesion = b.dataset.lesion; hold(); show(); }));
new IntersectionObserver((en) => { if (en[en.length - 1].isIntersecting) tour(); else clearInterval(timer); }).observe(stage);
show();
})();
`;

const buttons = `<div class="lb-pick" role="group" aria-label="Planted lesion">${Object.entries(LESIONS).map(([key, l]) => `<button type="button" data-lesion="${key}" aria-pressed="${key === "scar"}">${l.name}</button>`).join("")}<span class="lb-call" data-call aria-live="polite">${LESIONS.scar.call}</span></div>`;

export const lightbox = {
  html: k.plateHtml({
    fig: "Light box",
    title: "Four ways to see one slice",
    hint: "Hover a panel · pick a lesion below",
    readout: "LGE · lesion bright",
    keys: [
      { mark: "lit", label: "The panel being read" },
      { mark: "flat", label: "Panels, left to right: native T1, ECV, T2, LGE" },
    ],
    caption: "Illustrative images. The same slice of heart in four kinds of MRI scan. On T1, ECV and T2, dark is low and yellow is high; LGE is black and white, with healthy muscle black and scar bright. Pick a problem below to see how each scan shows it.",
    body: `<div class="iso-stage" data-fig="lightbox" tabindex="0" aria-label="Light box: left and right arrow keys move between the four panels">${svg}</div>`,
  }).replace("</figure>", `${buttons}</figure>`),
  script: live,
};
