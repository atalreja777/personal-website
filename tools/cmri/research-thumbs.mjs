// Illustrations for three research rows in Projects & Research.   node tools/cmri/research-thumbs.mjs
// Schematic drawings only: no patient images.
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "assets", "projects");
const INK = "#141414", GREY = "#7a7a7a", BG = "#f4f4f2", RED = "#b5223c", TISSUE = "#e9d6cf", WALL = "#c98f86";
const svg = (body, defs = "") => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 480" width="720" height="480"><defs>${defs}</defs><rect width="720" height="480" fill="${BG}"/>${body}</svg>`;

// ---- carotid ultrasound with a segmentation outline -----------------------------------
function ultrasound() {
  const defs = `
    <filter id="speckle" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
    </filter>
    <linearGradient id="depth" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a5a58"/><stop offset=".55" stop-color="#3a3a39"/><stop offset="1" stop-color="#1c1c1c"/></linearGradient>
    <clipPath id="screen"><rect x="120" y="96" width="480" height="312" rx="4"/></clipPath>
    <radialGradient id="attn" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#e0662c" stop-opacity=".75"/><stop offset="1" stop-color="#e0662c" stop-opacity="0"/></radialGradient>`;
  // artery walls: near wall above, far wall below, with a plaque on the far wall
  const near = "M 120 196 C 260 190 420 192 600 198";
  const far = "M 120 300 C 230 304 300 300 330 296 C 360 262 430 258 460 290 C 500 300 560 304 600 302";
  const plaque = "M 330 296 C 360 262 430 258 460 290 C 430 296 360 298 330 296 Z";
  return svg(`<g transform="translate(0 22)">
    <g clip-path="url(#screen)">
      <rect x="120" y="96" width="480" height="312" fill="url(#depth)"/>
      <rect x="120" y="96" width="480" height="312" fill="#fff" filter="url(#speckle)" opacity=".42"/>
      <path d="${near} L 600 228 C 420 222 260 220 120 226 Z" fill="#cfcfcb" opacity=".5"/>
      <path d="M 120 226 C 260 220 420 222 600 228 L 600 284 C 500 282 430 284 330 284 C 260 286 200 284 120 284 Z" fill="#0d0d0d" opacity=".9"/>
      <path d="${far} L 600 330 C 400 336 260 334 120 332 Z" fill="#d9d9d4" opacity=".55"/>
      <path d="${plaque}" fill="#e6e3dc" opacity=".8"/>
      <ellipse cx="395" cy="282" rx="120" ry="70" fill="url(#attn)"/>
      <path d="${plaque}" fill="none" stroke="#2fd0a6" stroke-width="3" stroke-dasharray="0" />
      <path d="M 120 226 C 260 220 420 222 600 228" fill="none" stroke="#2fd0a6" stroke-width="2" opacity=".85"/>
    </g>
    <rect x="120" y="96" width="480" height="312" rx="4" fill="none" stroke="${INK}" stroke-width="2"/>
    <!-- linear probe on top of the image -->
    <rect x="270" y="52" width="180" height="30" rx="6" fill="#fff" stroke="${INK}" stroke-width="2"/>
    <rect x="290" y="82" width="140" height="10" fill="${INK}"/>
    <path d="M 330 52 L 336 24 L 384 24 L 390 52" fill="#fff" stroke="${INK}" stroke-width="2"/>

  `, defs);
}

// ---- PAD: a leg artery with a blockage and the four treatments ---------------------------
function pad() {
  const artery = (x, y, w, inner) => `<rect x="${x}" y="${y}" width="${w}" height="44" rx="22" fill="${TISSUE}" stroke="${WALL}" stroke-width="3"/>${inner}`;
  const lumen = (x, y, w) => `<rect x="${x + 6}" y="${y + 10}" width="${w - 12}" height="24" rx="12" fill="#fff"/>`;
  const rows = [
    // balloon angioplasty: an inflated balloon opening the vessel
    (x, y, w) => `${lumen(x, y, w)}<line x1="${x}" y1="${y + 22}" x2="${x + w}" y2="${y + 22}" stroke="${INK}" stroke-width="2"/><ellipse cx="${x + w / 2}" cy="${y + 22}" rx="${w * 0.28}" ry="13" fill="#9fb6e6" stroke="${INK}" stroke-width="2"/>`,
    // drug-coated balloon: the same balloon with a dotted coating
    (x, y, w) => `${lumen(x, y, w)}<line x1="${x}" y1="${y + 22}" x2="${x + w}" y2="${y + 22}" stroke="${INK}" stroke-width="2"/><ellipse cx="${x + w / 2}" cy="${y + 22}" rx="${w * 0.28}" ry="13" fill="#9fb6e6" stroke="${INK}" stroke-width="2" stroke-dasharray="2 3"/>${Array.from({ length: 9 }, (_, i) => `<circle cx="${x + w * 0.26 + i * w * 0.06}" cy="${y + 22}" r="2.2" fill="${RED}"/>`).join("")}`,
    // stent: a mesh tube holding the vessel open
    (x, y, w) => `${lumen(x, y, w)}<rect x="${x + w * 0.2}" y="${y + 10}" width="${w * 0.6}" height="24" fill="none" stroke="${INK}" stroke-width="2"/>${Array.from({ length: 10 }, (_, i) => { const a = x + w * 0.2 + i * w * 0.06; return `<path d="M ${a} ${y + 10} L ${a + w * 0.03} ${y + 34} L ${a + w * 0.06} ${y + 10}" fill="none" stroke="${INK}" stroke-width="1.5"/>`; }).join("")}`,
    // atherectomy: a cutting burr shaving plaque away
    (x, y, w) => `${lumen(x, y, w)}<path d="M ${x + w * 0.52} ${y + 10} C ${x + w * 0.62} ${y + 18} ${x + w * 0.62} ${y + 26} ${x + w * 0.52} ${y + 34} L ${x + w - 6} ${y + 34} L ${x + w - 6} ${y + 10} Z" fill="#e9c9a8" stroke="${WALL}" stroke-width="2"/><line x1="${x}" y1="${y + 22}" x2="${x + w * 0.44}" y2="${y + 22}" stroke="${INK}" stroke-width="2"/><ellipse cx="${x + w * 0.47}" cy="${y + 22}" rx="12" ry="10" fill="#d9d9d4" stroke="${INK}" stroke-width="2"/>${[0, 1, 2, 3].map((k) => `<line x1="${x + w * 0.47 - 8 + k * 5}" y1="${y + 14}" x2="${x + w * 0.47 - 10 + k * 5}" y2="${y + 30}" stroke="${INK}" stroke-width="1"/>`).join("")}`,
  ];
  // the leg artery: femoral down to popliteal, splitting into the tibial arteries
  const tree = `
    <path d="M 150 40 C 150 120 158 200 162 280 C 164 320 150 360 128 450" fill="none" stroke="${WALL}" stroke-width="34" stroke-linecap="round"/>
    <path d="M 162 300 C 176 350 196 400 212 450" fill="none" stroke="${WALL}" stroke-width="24" stroke-linecap="round"/>
    <path d="M 160 316 C 166 370 170 410 170 450" fill="none" stroke="${WALL}" stroke-width="22" stroke-linecap="round"/>
    <path d="M 150 40 C 150 120 158 200 162 280 C 164 320 150 360 128 450" fill="none" stroke="#fff" stroke-width="22" stroke-linecap="round"/>
    <path d="M 162 300 C 176 350 196 400 212 450" fill="none" stroke="#fff" stroke-width="13" stroke-linecap="round"/>
    <path d="M 160 316 C 166 370 170 410 170 450" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round"/>
    <ellipse cx="157" cy="200" rx="12" ry="32" fill="#e9c9a8"/>
    <circle cx="157" cy="200" r="44" fill="none" stroke="${RED}" stroke-width="2.5" stroke-dasharray="5 4"/>
    <path d="M 201 200 L 262 200" stroke="${RED}" stroke-width="2"/>`;
  const W = 380, X = 290;
  return svg(`${tree}${rows.map((f, i) => { const y = 56 + i * 98; return artery(X, y, W, f(X, y, W)); }).join("")}
    <path d="M 262 200 L 276 78 M 262 200 L 276 176 M 262 200 L 276 274 M 262 200 L 276 372" stroke="${GREY}" stroke-width="1.5" fill="none"/>`);
}

// ---- CEA vs TCAR: the carotid fork twice ------------------------------------------------
function carotid() {
  // a carotid bifurcation in a 260 x 380 box, origin at (ox, oy)
  const fork = (ox, oy) => `
    <path d="M ${ox + 130} ${oy + 380} L ${ox + 130} ${oy + 210} C ${ox + 130} ${oy + 170} ${ox + 100} ${oy + 140} ${ox + 92} ${oy + 0}" fill="none" stroke="${WALL}" stroke-width="40" stroke-linecap="round"/>
    <path d="M ${ox + 130} ${oy + 210} C ${ox + 134} ${oy + 170} ${ox + 170} ${oy + 140} ${ox + 186} ${oy + 10}" fill="none" stroke="${WALL}" stroke-width="28" stroke-linecap="round"/>
    <path d="M ${ox + 130} ${oy + 380} L ${ox + 130} ${oy + 210} C ${ox + 130} ${oy + 170} ${ox + 100} ${oy + 140} ${ox + 92} ${oy + 0}" fill="none" stroke="#fff" stroke-width="28" stroke-linecap="round"/>
    <path d="M ${ox + 130} ${oy + 210} C ${ox + 134} ${oy + 170} ${ox + 170} ${oy + 140} ${ox + 186} ${oy + 10}" fill="none" stroke="#fff" stroke-width="17" stroke-linecap="round"/>`;
  const plaque = (ox, oy, removed) => removed
    ? `<path d="M ${ox + 104} ${oy + 214} C ${ox + 100} ${oy + 186} ${ox + 98} ${oy + 166} ${ox + 100} ${oy + 140}" fill="none" stroke="${RED}" stroke-width="3" stroke-dasharray="6 5"/>`
    : `<path d="M ${ox + 112} ${oy + 230} C ${ox + 104} ${oy + 200} ${ox + 102} ${oy + 170} ${ox + 104} ${oy + 140} C ${ox + 114} ${oy + 170} ${ox + 118} ${oy + 200} ${ox + 122} ${oy + 230} Z" fill="#e9c9a8" stroke="${WALL}" stroke-width="2"/>`;
  // left: endarterectomy, the artery opened and the plaque lifted out, with two clamps
  const L = 70, T = 60;
  const cea = `${fork(L, T)}${plaque(L, T, true)}
    <path d="M ${L + 76} ${T + 236} L ${L + 70} ${T + 120}" stroke="${INK}" stroke-width="2.5" stroke-dasharray="1 0"/>
    <path d="M ${L + 30} ${T + 150} C ${L + 10} ${T + 170} ${L + 6} ${T + 200} ${L + 26} ${T + 222}" fill="#e9c9a8" stroke="${WALL}" stroke-width="2"/>
    ${[[L + 130, T + 330], [L + 90, T + 40]].map(([x, y]) => `<rect x="${x - 34}" y="${y - 6}" width="68" height="12" rx="6" fill="#d9d9d4" stroke="${INK}" stroke-width="2"/>`).join("")}`;
  // right: TCAR, a sheath into the low common carotid, a stent across the plaque, flow reversed
  const R = 400;
  const tcar = `${fork(R, T)}${plaque(R, T, false)}
    <rect x="${R + 94}" y="${T + 140}" width="24" height="96" rx="4" fill="none" stroke="${INK}" stroke-width="2"/>
    ${Array.from({ length: 8 }, (_, i) => `<path d="M ${R + 94} ${T + 142 + i * 12} L ${R + 118} ${T + 148 + i * 12}" stroke="${INK}" stroke-width="1.3"/>`).join("")}
    <path d="M ${R + 130} ${T + 330} C ${R + 170} ${T + 330} ${R + 210} ${T + 350} ${R + 250} ${T + 380}" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
    <path d="M ${R + 130} ${T + 330} C ${R + 170} ${T + 330} ${R + 210} ${T + 350} ${R + 250} ${T + 380}" fill="none" stroke="#9fb6e6" stroke-width="3" stroke-linecap="round"/>
    <path d="M ${R + 130} ${T + 250} L ${R + 130} ${T + 300}" stroke="#3e63dd" stroke-width="3"/><path d="M ${R + 122} ${T + 290} L ${R + 130} ${T + 304} L ${R + 138} ${T + 290}" fill="none" stroke="#3e63dd" stroke-width="3"/>`;
  return svg(`${cea}<line x1="360" y1="60" x2="360" y2="440" stroke="#d9d9d6" stroke-width="2"/>${tcar}`);
}

writeFileSync(join(OUT, "research-ultrasound.svg"), ultrasound());
writeFileSync(join(OUT, "research-pad.svg"), pad());
writeFileSync(join(OUT, "research-carotid.svg"), carotid());
console.log("wrote 3 research illustrations");
