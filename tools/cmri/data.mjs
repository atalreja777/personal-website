// One synthetic, illustrative "patient" shared by every figure on the page.
// Nothing here comes from a real scan. It exists so the shell, the slices and
// the bullseye all agree with each other.
//
// Coordinates:
//   t      0 at the base, 1 at the apex (fraction of the long axis)
//   angle  degrees, standard short-axis display: anterior 90, septum 180,
//          inferior 270, lateral 0. Septum spans 120..240 (between the two
//          RV insertion points).
//   layer  0 inner (subendocardial) half, 1 outer (subepicardial) half

export const CLASSES = [
  { key: "nm", name: "Not measured", color: "#ffffff", note: "Segmentation or a quality check failed, so no label is given" },
  { key: "void", name: "Dark core inside scar", color: "#3b2453", note: "Possible microvascular obstruction or hemorrhage" },
  { key: "active", name: "Active scar", color: "#e0662c", note: "Possible active scar" },
  { key: "scar", name: "Scar", color: "#b5223c", note: "Replacement fibrosis, graded by depth and pattern" },
  { key: "edema", name: "Swelling", color: "#2f7fc1", note: "Raised T2 and T1, no LGE" },
  { key: "interstitial", name: "Diffuse fibrosis", color: "#d9a21b", note: "High ECV without LGE: diffuse fibrosis" },
  { key: "single", name: "One scan off", color: "#9b8cc4", note: "Only one of T1, ECV or T2 is off" },
  { key: "normal", name: "Normal", color: "#ebe8df", note: "Every channel inside its reference range" },
];
export const COLOR = Object.fromEntries(CLASSES.map((c) => [c.key, c.color]));
export const NAME = Object.fromEntries(CLASSES.map((c) => [c.key, c.name]));

export const SECTORS = 24; // around the wall
export const LAYERS = 2; // inner and outer half of the wall

const wrap = (a) => ((a % 360) + 360) % 360;
const angDist = (a, b) => { const d = Math.abs(wrap(a) - wrap(b)); return Math.min(d, 360 - d); };
// how far inside a region a point sits, 0 at its edge, 1 at its middle
const inside = (t, a, { t0, t1, a0, a1 }) => {
  const mid = wrap((a0 + a1) / 2 + (a1 < a0 ? 180 : 0));
  const half = (wrap(a1 - a0)) / 2;
  if (t < t0 || t > t1 || angDist(a, mid) > half) return -1;
  return Math.min((t - t0) / (t1 - t0), (t1 - t) / (t1 - t0), (half - angDist(a, mid)) / half) * 2;
};

// a small deterministic hash, so the scattered cells never change between builds
const hash = (i, j, k) => { let h = (i * 73856093) ^ (j * 19349663) ^ (k * 83492791); h = (h ^ (h >>> 13)) * 1274126177; return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };

const REGIONS = [
  // inferolateral subendocardial scar: an ischemic pattern in the LCx territory
  { cls: "scar", layers: [0], t0: 0.05, t1: 0.52, a0: 292, a1: 338, motion: true },
  { cls: "scar", layers: [1], t0: 0.14, t1: 0.42, a0: 302, a1: 330, motion: true },
  // inferior RV insertion point scar (mid-wall, both halves)
  { cls: "scar", layers: [0, 1], t0: 0.08, t1: 0.62, a0: 228, a1: 254 },
  // lateral subepicardial edema with an active core
  { cls: "active", layers: [1], t0: 0.36, t1: 0.6, a0: 352, a1: 16 },
  { cls: "edema", layers: [1], t0: 0.24, t1: 0.76, a0: 336, a1: 34 },
  { cls: "edema", layers: [0], t0: 0.34, t1: 0.62, a0: 346, a1: 22 },
  // septal interstitial expansion (diffuse fibrosis)
  { cls: "interstitial", layers: [0, 1], t0: 0.12, t1: 0.86, a0: 126, a1: 226 },
  // basal anteroseptal cells beside the outflow tract fail quality control
  { cls: "nm", layers: [0, 1], t0: 0, t1: 0.1, a0: 104, a1: 162 },
];

export function cellAt(t, angle, layer) {
  if (t > 0.94) return { cls: "nm", grade: null, motion: false, csi: null };
  for (const R of REGIONS) {
    if (!R.layers.includes(layer)) continue;
    const depth = inside(t, angle, R);
    if (depth < 0) continue;
    if (R.cls === "nm") return { cls: "nm", grade: null, motion: false, csi: null };
    const grade = depth > 0.45 ? "A" : depth > 0.18 ? "B" : "C";
    return { cls: R.cls, grade, motion: !!R.motion, csi: csiOf(grade, t, angle) };
  }
  const si = Math.floor(wrap(angle) / (360 / SECTORS));
  const ti = Math.floor(t * 12);
  if (hash(si, ti, layer) > 0.93) return { cls: "single", grade: hash(ti, si, 7) > 0.5 ? "B" : "C", motion: false, csi: csiOf("C", t, angle) };
  return { cls: "normal", grade: "A", motion: false, csi: csiOf("A", t, angle) };
}

// Class-Stability Index: how many of the 18 alternative threshold settings agree
function csiOf(grade, t, angle) {
  const jitter = Math.floor(hash(Math.round(t * 100), Math.round(angle), 3) * 2);
  return grade === "A" ? 17 + jitter : grade === "B" ? 13 + jitter : 9 + jitter;
}

// the three short-axis levels and the apex cap, by fraction of the long axis
export const LEVELS = [
  { key: "basal", name: "Base", t0: 0, t1: 1 / 3 },
  { key: "mid", name: "Mid", t0: 1 / 3, t1: 2 / 3 },
  { key: "apical", name: "Apex", t0: 2 / 3, t1: 0.94 },
];
export const levelOf = (t) => (t > 0.94 ? "Apex cap" : t < 1 / 3 ? "Base" : t < 2 / 3 ? "Mid" : "Apex");
