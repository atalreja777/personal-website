// Labelled 2D schematics. These carry text, so they are plain SVG rather than
// kit figures (the kit keeps words out of its drawings).
import { cellAt, COLOR, NAME, SECTORS } from "./data.mjs";

const INK = "#141414", GREY = "#7a7a7a", HAIR = "#d9d9d6";
const TISSUE = "#efe6e0", TISSUE_LINE = "#b9a9a2", LV = "#e3c3bc", BLOOD = "#ffffff";
const f = (n) => n.toFixed(1);
const pol = (cx, cy, r, deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy - r * Math.sin((deg * Math.PI) / 180)];
const P2 = ([x, y]) => `${f(x)} ${f(y)}`;
// an annular wedge between angles a0..a1 (degrees, counter-clockwise, 0 = right)
export function wedge(cx, cy, r0, r1, a0, a1) {
  const large = a1 - a0 > 180 ? 1 : 0;
  if (r0 <= 0) return `M ${f(cx)} ${f(cy)} L ${P2(pol(cx, cy, r1, a0))} A ${r1} ${r1} 0 ${large} 0 ${P2(pol(cx, cy, r1, a1))} Z`;
  return `M ${P2(pol(cx, cy, r1, a0))} A ${r1} ${r1} 0 ${large} 0 ${P2(pol(cx, cy, r1, a1))} L ${P2(pol(cx, cy, r0, a1))} A ${r0} ${r0} 0 ${large} 1 ${P2(pol(cx, cy, r0, a0))} Z`;
}
const text = (x, y, s, { anchor = "start", size = 11.5, fill = INK, weight = 400, cls = "" } = {}) =>
  `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-size="${size}" fill="${fill}" font-weight="${weight}"${cls ? ` class="${cls}"` : ""}>${s}</text>`;
const lead = (x1, y1, x2, y2) => `<path d="M ${f(x1)} ${f(y1)} L ${f(x2)} ${f(y2)}" stroke="${GREY}" stroke-width=".8" fill="none"/><circle cx="${f(x1)}" cy="${f(y1)}" r="1.8" fill="${INK}"/>`;
const svg = (w, h, label, body) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}" font-family="Work Sans, Helvetica Neue, Arial, sans-serif">${body}</svg>`;
const hatch = (id) => `<pattern id="${id}" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="4" height="4" fill="#fff"/><line x1="0" y1="0" x2="0" y2="4" stroke="#a9a9ad" stroke-width="1.2"/></pattern>`;

// ---- heart, four-chamber cut ----------------------------------------------------
export function heart() {
  const outline = "M 178 34 C 118 30 66 58 58 108 C 50 160 86 210 146 258 C 162 272 178 284 194 286 C 236 276 292 214 302 150 C 310 98 272 44 220 38 Z";
  const ra = "M 82 110 C 82 78 104 64 126 64 C 150 64 164 84 164 110 C 164 124 156 132 150 134 L 92 134 C 86 128 82 120 82 110 Z";
  const la = "M 196 104 C 196 78 216 66 240 66 C 266 66 284 82 284 104 C 284 118 278 128 270 134 L 204 134 C 198 126 196 116 196 104 Z";
  const rv = "M 90 146 C 118 141 146 142 164 148 C 166 192 160 226 148 248 C 118 218 94 184 90 146 Z";
  const lvWall = "M 176 140 C 214 128 264 130 292 144 C 294 202 254 258 194 282 C 176 234 172 184 176 140 Z";
  const lv = "M 190 150 C 216 143 250 144 274 150 C 272 198 242 240 199 262 C 189 222 187 184 190 150 Z";
  const cut = [[146, 190], [290, 232]];
  return svg(360, 310, "Schematic four-chamber view of the heart with the left ventricle highlighted",
    `<path d="${outline}" fill="${TISSUE}" stroke="${TISSUE_LINE}" stroke-width="1"/>
    <path d="${lvWall}" fill="${LV}" stroke="${INK}" stroke-width="1.4"/>
    <path d="${ra}" fill="${BLOOD}" stroke="${TISSUE_LINE}"/><path d="${la}" fill="${BLOOD}" stroke="${TISSUE_LINE}"/>
    <path d="${rv}" fill="${BLOOD}" stroke="${TISSUE_LINE}"/><path d="${lv}" fill="${BLOOD}" stroke="${INK}" stroke-width="1"/>
    <path d="M 90 140 L 166 140 M 194 140 L 286 140" stroke="${GREY}" stroke-width="1.2" stroke-dasharray="3 3"/>
    <path d="M ${cut[0]} L ${cut[1]}" stroke="${INK}" stroke-width="1.3" stroke-dasharray="6 4"/>
    ${text(123, 103, "Right atrium", { anchor: "middle", size: 10.5, fill: GREY })}${text(240, 103, "Left atrium", { anchor: "middle", size: 10.5, fill: GREY })}
    ${text(128, 192, "Right", { anchor: "middle", size: 10.5, fill: GREY })}${text(128, 205, "ventricle", { anchor: "middle", size: 10.5, fill: GREY })}
    ${text(232, 188, "Left", { anchor: "middle", size: 12, weight: 600 })}${text(232, 202, "ventricle", { anchor: "middle", size: 12, weight: 600 })}
    ${lead(171, 236, 74, 262)}${text(70, 266, "Septum", { anchor: "end", size: 10.5 })}
    ${lead(194, 282, 250, 300)}${text(254, 304, "Apex", { size: 10.5 })}
    ${lead(286, 140, 330, 128)}${text(330, 122, "Base (valve plane)", { anchor: "end", size: 10.5 })}
    ${text(352, 252, "Short-axis cut", { anchor: "end", size: 10.5 })}
    ${text(8, 300, "Patient’s right", { size: 9.5, fill: GREY })}${text(352, 20, "Patient’s left", { anchor: "end", size: 9.5, fill: GREY })}`);
}

// ---- short-axis donut ------------------------------------------------------------
export function donut() {
  const cx = 196, cy = 152, rO = 80, rI = 52;
  const ant = pol(cx, cy, rO, 120), inf = pol(cx, cy, rO, 240);
  const rv = `M ${P2(ant)} C 132 58 52 92 54 150 C 56 206 128 246 ${P2(inf)} A ${rO} ${rO} 0 0 1 ${P2(ant)} Z`;
  const pm = (deg) => { const [x, y] = pol(cx, cy, rI - 9, deg); return `<ellipse cx="${f(x)}" cy="${f(y)}" rx="7" ry="5.5" transform="rotate(${-deg} ${f(x)} ${f(y)})" fill="${LV}" stroke="${TISSUE_LINE}"/>`; };
  return svg(380, 310, "Schematic short-axis slice of the left ventricle: a ring of muscle around the blood pool, with the right ventricle on the septal side",
    `<path d="${rv}" fill="${BLOOD}" stroke="${TISSUE_LINE}" stroke-width="1"/>
    <path d="M ${P2(ant)} C 132 58 52 92 54 150 C 56 206 128 246 ${P2(inf)}" fill="none" stroke="${TISSUE_LINE}" stroke-width="6" opacity=".55"/>
    <circle cx="${cx}" cy="${cy}" r="${(rO + rI) / 2}" fill="none" stroke="${LV}" stroke-width="${rO - rI}"/>
    <circle cx="${cx}" cy="${cy}" r="${rO}" fill="none" stroke="${INK}" stroke-width="1.4"/>
    <circle cx="${cx}" cy="${cy}" r="${rI}" fill="${BLOOD}" stroke="${INK}" stroke-width="1.4"/>
    <circle cx="${cx}" cy="${cy}" r="${(rO + rI) / 2}" fill="none" stroke="${INK}" stroke-width=".8" stroke-dasharray="3 3"/>
    ${pm(28)}${pm(262)}
    <circle cx="${f(ant[0])}" cy="${f(ant[1])}" r="4" fill="${INK}"/><circle cx="${f(inf[0])}" cy="${f(inf[1])}" r="4" fill="${INK}"/>
    ${text(cx, cy + 4, "Blood pool", { anchor: "middle", size: 11, fill: GREY })}
    ${text(86, 146, "Right", { anchor: "middle", size: 10.5, fill: GREY })}${text(86, 159, "ventricle", { anchor: "middle", size: 10.5, fill: GREY })}
    ${lead(...pol(cx, cy, rI, 62), 300, 30)}${text(304, 26, "Endocardium (inner surface)", { size: 10.5, anchor: "end" })}
    ${lead(...pol(cx, cy, (rO + rI) / 2, 18), 362, 92)}${text(370, 86, "Mid-wall", { size: 10.5, anchor: "end" })}
    ${lead(...pol(cx, cy, rO, -28), 330, 248)}${text(372, 262, "Epicardium (outer surface)", { size: 10.5, anchor: "end" })}
    ${lead(ant[0], ant[1], 112, 30)}${text(20, 24, "RV insertion points", { size: 10.5 })}
    <path d="M ${f(inf[0])} ${f(inf[1])} L 112 286" stroke="${GREY}" stroke-width=".8"/>${text(20, 298, "(where the right ventricle joins)", { size: 9.5, fill: GREY })}
    ${lead(...pol(cx, cy, rI - 9, 262), 262, 296)}${text(268, 300, "Papillary muscles", { size: 10, fill: GREY })}
    ${text(cx, 12, "Anterior", { anchor: "middle", size: 9.5, fill: GREY })}${text(cx, cy + rO + 22, "Inferior", { anchor: "middle", size: 9.5, fill: GREY })}
    ${text(cx + rO + 10, cy + 4, "Lateral", { size: 9.5, fill: GREY })}${text(86, 174, "(septal side)", { anchor: "middle", size: 9.5, fill: GREY })}`);
}

// ---- slice stack: long axis with the cuts, beside the rings it makes ----------------
export function stack() {
  const outer = "M 56 34 L 56 140 C 56 210 92 262 126 270 C 160 262 196 210 196 140 L 196 34";
  const inner = "M 76 34 L 76 140 C 76 196 100 236 126 244 C 152 236 176 196 176 140 L 176 34";
  const cuts = Array.from({ length: 8 }, (_, i) => 46 + i * 26);
  const ring = (x, y, ro, ri, on) => `<circle cx="${x}" cy="${y}" r="${(ro + ri) / 2}" fill="none" stroke="${on ? LV : TISSUE}" stroke-width="${ro - ri}"/><circle cx="${x}" cy="${y}" r="${ro}" fill="none" stroke="${INK}" stroke-width="1"/><circle cx="${x}" cy="${y}" r="${ri}" fill="#fff" stroke="${INK}" stroke-width="1"/>`;
  const third = (y0, y1, label) => `<path d="M 212 ${y0} L 218 ${y0} L 218 ${y1} L 212 ${y1}" fill="none" stroke="${GREY}" stroke-width=".9"/>${text(224, (y0 + y1) / 2 + 4, label, { size: 10.5 })}`;
  return svg(380, 300, "Schematic long-axis view of the left ventricle with eight short-axis cuts from base to apex, and the rings they produce at the base, middle and apex",
    `<path d="${outer} L 76 34 ${inner.replace("M 76 34", "").trim()} Z" fill="${LV}" stroke="none"/>
    <path d="${outer}" fill="none" stroke="${INK}" stroke-width="1.4"/><path d="${inner}" fill="#fff" stroke="${INK}" stroke-width="1.2"/>
    ${cuts.map((y) => `<path d="M 40 ${y} L 212 ${y}" stroke="${INK}" stroke-width=".8" stroke-dasharray="4 3"/>`).join("")}
    ${third(40, 104, "Base")}${third(110, 176, "Mid")}${third(182, 246, "Apex")}
    ${text(126, 288, "Apex cap", { anchor: "middle", size: 10, fill: GREY })}${text(126, 22, "Base (open toward the valves)", { anchor: "middle", size: 10, fill: GREY })}
    ${ring(326, 70, 34, 22, true)}${ring(326, 150, 31, 20, false)}${ring(326, 228, 20, 11, false)}`);
}

// ---- the AHA 17-segment bullseye ----------------------------------------------------
export const RINGS = { cap: [0, 30], apical: [30, 64], mid: [64, 102], basal: [102, 142] };
// six 60° segments for base and mid (anterolateral starts at 0°), four 90° for the apex
const SIX = [["Anterolateral", 0], ["Anterior", 60], ["Anteroseptal", 120], ["Inferoseptal", 180], ["Inferior", 240], ["Inferolateral", 300]];
const FOUR = [["Lateral", -45], ["Anterior", 45], ["Septal", 135], ["Inferior", 225]];
export const TERRITORY = {
  basal: ["LCx", "LAD", "LAD", "RCA", "RCA", "LCx"],
  mid: ["LCx", "LAD", "LAD", "RCA", "RCA", "LCx"],
  apical: ["LCx", "LAD", "LAD", "RCA"],
  cap: "LAD",
};
const ART = { LAD: "#c9d4ee", LCx: "#d5e5cc", RCA: "#f0dcc2" };

export function bullseye(mode = "segments") {
  const cx = 230, cy = 180;
  const out = [`<defs>${hatch("be-h")}</defs>`];
  const seg = (ring, list, span) => list.forEach(([name, a0], i) => {
    const [r0, r1] = RINGS[ring];
    const fill = mode === "arteries" ? ART[TERRITORY[ring][i]] : ring === "basal" && mode === "cells" && i === 5 ? LV : "#fff";
    out.push(`<path d="${wedge(cx, cy, r0, r1, a0, a0 + span)}" fill="${fill}" stroke="${INK}" stroke-width="1.2"><title>${ring === "basal" ? "Basal" : ring === "mid" ? "Mid" : "Apical"} ${name.toLowerCase()}</title></path>`);
  });
  seg("basal", SIX, 60); seg("mid", SIX, 60); seg("apical", FOUR, 90);
  out.push(`<circle cx="${cx}" cy="${cy}" r="${RINGS.cap[1]}" fill="${mode === "arteries" ? ART.LAD : "#fff"}" stroke="${INK}" stroke-width="1.2"><title>Apex cap</title></circle>`);
  if (mode === "cells") {
    for (const ring of ["apical", "mid", "basal"]) {
      const [r0, r1] = RINGS[ring];
      for (let j = 0; j < SECTORS; j++) { const a = (j * 360) / SECTORS; out.push(`<path d="M ${P2(pol(cx, cy, r0, a))} L ${P2(pol(cx, cy, r1, a))}" stroke="${GREY}" stroke-width=".6"/>`); }
    }
  }
  if (mode === "segments" || mode === "cells") {
    SIX.forEach(([name, a0]) => { const [x, y] = pol(cx, cy, 158, a0 + 30); out.push(text(x, y + 4, name, { anchor: x < cx - 20 ? "end" : x > cx + 20 ? "start" : "middle", size: 10.5, fill: GREY })); });
  }
  if (mode === "segments") {
    out.push(text(cx, cy - 122 + 4, "Base", { anchor: "middle", size: 10, weight: 600 }), text(cx, cy - 83 + 4, "Mid", { anchor: "middle", size: 10, weight: 600 }), text(cx, cy - 47 + 4, "Apex", { anchor: "middle", size: 10, weight: 600 }), text(cx, cy + 4, "Cap", { anchor: "middle", size: 10, weight: 600 }));
  }
  if (mode === "arteries") {
    out.push(text(cx, cy - 118, "LAD", { anchor: "middle", size: 13, weight: 600 }), text(cx - 96, cy + 70, "RCA", { anchor: "middle", size: 13, weight: 600 }), text(cx + 96, cy + 70, "LCx", { anchor: "middle", size: 13, weight: 600 }));
  }
  return svg(460, 360, mode === "arteries" ? "Bullseye coloured by the usual coronary artery territories" : "The AHA 17-segment bullseye: the base as the outer ring, the apex in the centre", out.join(""));
}

// a zoom of one basal segment of the ring, 4 sectors around by 2 layers through
export function cellZoom() {
  const cx = 40, cy = 290, rI = 150, rO = 230;
  const out = [];
  for (let j = 0; j < 4; j++) for (let l = 0; l < 2; l++) {
    const a0 = 20 + j * 12.5, a1 = a0 + 12.5, r0 = l ? (rI + rO) / 2 : rI, r1 = l ? rO : (rI + rO) / 2;
    const on = j === 1 && l === 0;
    out.push(`<path d="${wedge(cx, cy, r0, r1, a0, a1)}" fill="${on ? LV : "#fff"}" stroke="${INK}" stroke-width="${on ? 1.6 : 0.9}"/>`);
  }
  out.push(lead(...pol(cx, cy, (rI * 0.75 + rO * 0.25), 20 + 18.75), 250, 40), text(256, 36, "One cell ≈ 6 mm of wall", { size: 10.5 }));
  out.push(lead(...pol(cx, cy, (rI * 3 + rO) / 4, 66), 70, 92), text(66, 88, "Inner layer", { size: 10.5, anchor: "end" }));
  out.push(lead(...pol(cx, cy, (rI + rO * 3) / 4, 68), 110, 26), text(106, 22, "Outer layer", { size: 10.5, anchor: "end" }));
  out.push(text(30, 300, "Blood pool side", { size: 9.5, fill: GREY }));
  return svg(380, 310, "One basal segment of the wall split into four sectors around and two layers through", out.join(""));
}

// ---- the example output: two bullseyes (inner, outer) with confidence ---------------
export function outputBullseyes() {
  const out = [`<defs>${hatch("ob-h")}<pattern id="ob-c" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><line x1="0" y1="0" x2="0" y2="5" stroke="#141414" stroke-width="1" opacity=".55"/></pattern></defs>`];
  const ring = { apical: [24, 52, 2 / 3, 0.94], mid: [52, 82, 1 / 3, 2 / 3], basal: [82, 112, 0, 1 / 3] };
  const rings = ["basal", "mid", "apical"];
  [0, 1].forEach((layer) => {
    const cx = 128 + layer * 252, cy = 140;
    out.push(`<g class="ob-eye" data-layer="${layer}">`);
    for (const key of rings) {
      const [r0, r1, t0, t1] = ring[key];
      for (let j = 0; j < SECTORS; j++) {
        const a0 = (j * 360) / SECTORS, a1 = ((j + 1) * 360) / SECTORS;
        const t = (t0 + t1) / 2, c = cellAt(t, (a0 + a1) / 2, layer);
        const fill = c.cls === "nm" ? "url(#ob-h)" : COLOR[c.cls];
        const d = wedge(cx, cy, r0, r1, a0, a1);
        const label = `${key === "basal" ? "Base" : key === "mid" ? "Mid" : "Apex"} · ${Math.round((a0 + a1) / 2)}° · ${layer ? "outer" : "inner"} layer`;
        out.push(`<path class="ob-cell" d="${d}" fill="${fill}" data-cls="${c.cls}" data-grade="${c.grade || ""}" data-csi="${c.csi ?? ""}" data-where="${label}"${c.motion ? ' data-motion=""' : ""}/>`);
        if (c.grade === "C") out.push(`<path class="ob-c" d="${d}" fill="url(#ob-c)" pointer-events="none"/>`);
      }
    }
    out.push(`<circle cx="${cx}" cy="${cy}" r="24" fill="url(#ob-h)" stroke="${INK}" stroke-width="1"/>`);
    // segment boundaries over the cells
    for (const key of rings) {
      const [r0, r1] = ring[key];
      const cuts = key === "apical" ? [45, 135, 225, 315] : [0, 60, 120, 180, 240, 300];
      cuts.forEach((a) => out.push(`<path d="M ${P2(pol(cx, cy, r0, a))} L ${P2(pol(cx, cy, r1, a))}" stroke="${INK}" stroke-width="1.2" pointer-events="none"/>`));
      out.push(`<circle cx="${cx}" cy="${cy}" r="${r1}" fill="none" stroke="${INK}" stroke-width="1.2" pointer-events="none"/>`);
    }
    // motion: a dashed outline around cells that move poorly
    for (const key of rings) {
      const [r0, r1, t0, t1] = ring[key];
      for (let j = 0; j < SECTORS; j++) {
        const a0 = (j * 360) / SECTORS, a1 = a0 + 15, c = cellAt((t0 + t1) / 2, a0 + 7.5, layer);
        if (c.motion) out.push(`<path d="${wedge(cx, cy, r0 + 1.6, r1 - 1.6, a0 + 1, a1 - 1)}" fill="none" stroke="${INK}" stroke-width="1.1" stroke-dasharray="2.4 2" pointer-events="none"/>`);
      }
    }
    out.push(text(cx, 282, layer ? "Outer layer (subepicardial)" : "Inner layer (subendocardial)", { anchor: "middle", size: 12, weight: 600 }));
    out.push(`</g>`);
  });
  out.push(text(254, 24, "Illustrative · synthetic patient", { anchor: "middle", size: 10.5, fill: GREY }));
  return svg(508, 296, "Illustrative output: two bullseye maps, inner and outer layer, each cell coloured by tissue class, with lower-confidence cells faded or hatched", out.join(""));
}
