// Builds cardiac-mri.html at the site root.   node tools/cmri/build.mjs
import { writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CLASSES, NAME } from "./data.mjs";
import * as X from "./schematics.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "..", "..", "cardiac-mri.html");

const rows = (list) => `<dl class="cm-rows">${list.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>`;

const SECTIONS = [["overview", "Overview"], ["segmentation", "Why segmentation is hard"], ["channels", "Four ways to see tissue"], ["output", "The output"]];
const IMG = "assets/research/cmri/";
const shot = (file, cap, alt) => `<figure class="cm-shot"><img src="${IMG}${file}" alt="${alt || cap}" loading="lazy" decoding="async"><figcaption>${cap}</figcaption></figure>`;
const credit = (t) => `<p class="cm-credit">${t}</p>`;
const KRAMER = "Images: Kramer et al., <i>J Cardiovasc Magn Reson</i> 2020, CC BY 4.0";

const STAGES = [
  { name: "Intake", does: "Raw DICOM images and scanner maps, quality-checked", carry: "Fit error" },
  { name: "Segmentation", does: "Five nnU-Net models outline the LV wall", carry: "Where they disagree" },
  { name: "Placement", does: "Slices placed into a 3D mesh of the patient’s heart", carry: "Placement error (mm)" },
  { name: "Measurement", does: "A robust median for every ~6 mm cell", carry: "Spread (SD)" },
  { name: "Comparison", does: "Against matched norms and the patient’s own healthy muscle", carry: "z-score range" },
  { name: "Rules", does: "Stated if-then rules, first match wins", carry: "Class" },
  { name: "Confidence", does: "Re-run under 18 alternative thresholds", carry: "Grade A / B / C" },
];
const pipeline = `<div class="cm-flow" role="list">
  ${STAGES.map((s, i) => `<div class="cm-flow__stage" role="listitem" style="--col:${2 * i + 1}"><div class="cm-flow__card"><h3>${s.name}</h3><p>${s.does}</p></div><div class="cm-flow__carry"><span>Passes on</span>${s.carry}</div></div>${i < STAGES.length - 1 ? `<span class="cm-flow__arrow" aria-hidden="true" style="--col:${2 * i + 2}"></span>` : ""}`).join("")}
</div>
<p class="cm-note">Each box is what a step does. Under it is the <b>uncertainty track</b>: the error bars that step hands to the next instead of throwing away.</p>`;

const legend = `<ul class="cm-chips">${CLASSES.map((c) => `<li><span class="cm-sw${c.key === "nm" ? " cm-sw--nm" : ""}" style="--c:${c.color}"></span>${c.name}</li>`).join("")}<li><span class="cm-sw cm-sw--dash"></span>Poor movement</li></ul>`;
const output = `<figure class="cm-output">
  <div class="cm-output__map">${X.outputBullseyes()}</div>
  ${legend}
  <figcaption><label class="cm-toggle"><input type="checkbox" data-conf checked> Show confidence</label><span class="cm-output__read" data-read aria-live="polite">Hover a patch to read it.</span></figcaption>
</figure>`;

const body = `
<a class="skip" href="#main">Skip to content</a>
<header class="mast" id="top"><a class="mast__name" href="index.html">Arnav Talreja</a></header>
<nav class="cm-nav" aria-label="On this page"><a class="cm-nav__back" href="index.html#projects">← Projects &amp; Research</a><div class="cm-nav__links">${SECTIONS.map(([id, n]) => `<a href="#${id}">${n}</a>`).join("")}</div></nav>
<main id="main" class="cm">

<section id="overview" class="cm-sec cm-hero">
  <p class="cm-kicker">Research · VCU Health Pauley Heart Center · 2025 – Present</p>
  <h1 class="cm-title">Cardiac MRI Tissue Map for Heart Failure (HFpEF)</h1>
  <p class="cm-lead">Building a pipeline that fuses four cardiac MRI sequences into a per-segment tissue map for heart failure (HFpEF), and benchmarking quantum preprocessing (QUBO scan selection, quantum Fourier transform) against classical methods.</p>
  ${rows([
    ["Collaborators", "Dr. Mohammad A. Al-Ani, MD, cardiologist at VCU Health Pauley Heart Center (mentor)<br>Dr. Ellen Keeley, University of Florida, who leads the Hearts on Fire study"],
    ["Data", "Heart MRI scans of 26 patients with HFpEF from the University of Florida’s Hearts on Fire study"],
    ["Built with", "Python, DICOM scan files, nnU-Net (AI that traces the heart wall), biv-me and Cobiveco (3D heart models)"],
  ])}
  <div class="cm-idea">
    <h2 class="cm-sub">What I built</h2>
    <ul class="points cm-points">
      <li>Built a pipeline that combines four kinds of heart MRI scans (cine, T1, T2 and LGE) and lines them up on a 3D model of each patient’s heart</li>
      <li>Used five nnU-Net AI models to trace the heart wall automatically, and flagged spots where they disagree</li>
      <li>Wrote a rule engine that labels every ~6 mm patch of the heart wall as scar, swelling, diffuse fibrosis or normal</li>
      <li>Gave every label an A, B or C confidence grade, so a doctor can see which spots to trust</li>
      <li>Benchmarking quantum preprocessing (QUBO scan selection, quantum Fourier transform) against the classical pipeline</li>
    </ul>
    <p class="cm-why1"><b>Why it matters:</b> HFpEF is about half of all heart failure. The heart still pumps normally, but the muscle is stiff, scarred or swollen, and no single scan shows all of it.</p>
  </div>
</section>

<section id="segmentation" class="cm-sec">
  <header class="cm-head"><h2 class="cm-h">Why segmentation is hard</h2><p>Before anything can be labeled, every scan has to be traced: the computer has to find exactly where the heart muscle starts and stops. Two things make that hard.</p></header>
  <h3 class="cm-h3">The muscle is never the same size</h3>
  <p class="cm-p">Left-ventricular myocardium varies substantially along the long axis: the cross-sectional area of both the wall and the blood pool decreases from base to apex, and the apical wall is normally thinner than the basal and mid-ventricular wall. Variability between patients is larger still. Hypertrophy, dilation and focal thinning change both wall thickness and cavity shape, so a segmentation model cannot rely on a fixed anatomical template and must generalize across a wide range of geometries.</p>
  <div class="cm-shots cm-shots--4">
    ${shot("cine-base.jpg", "Near the base")}${shot("cine-mid.jpg", "Middle")}${shot("cine-apex.jpg", "Near the apex")}${shot("thick-wall.jpg", "A thickened wall, another patient")}
  </div>
  ${credit(KRAMER + "; thickened wall: Germain, <i>Orphanet J Rare Dis</i> 2010, CC BY 2.0")}
  <h3 class="cm-h3">Every scan is taken differently</h3>
  <p class="cm-p">Each scan type is its own breath-hold with its own slices. Cine movies cover the whole ventricle in a stack of about 9 to 12 slices, planned at an angle off the long-axis views. T1 and T2 maps usually take just three slices (base, middle and apex), and LGE has a stack of its own. The slices land at slightly different positions and angles, so my pipeline places every one back into a single 3D model of the patient’s heart before comparing them.</p>
  <div class="cm-shots cm-shots--plan">
    ${shot("plan-4ch.jpg", "Cine slices planned across a four-chamber view")}${shot("plan-2ch.jpg", "…and across a two-chamber view")}
  </div>
  <div class="cm-shots cm-shots--1">${shot("t1-three-slices.jpg", "A T1 map covers only three slices")}</div>
  ${credit(KRAMER + "; T1 maps: BiomedNMR, Wikimedia Commons, CC BY-SA 4.0")}
</section>

<section id="channels" class="cm-sec">
  <header class="cm-head"><h2 class="cm-h">Four ways to see heart tissue</h2><p>Each MRI scan type measures a different property of the muscle. Doctors don’t trust any one alone; they read them side by side to tell swelling from scar from diffuse fibrosis.</p></header>
  ${rows([
    ["Native T1", "How long the tissue takes to recover magnetically. Rises with fibrosis and with swelling, so on its own it can’t say which."],
    ["ECV", "The share of the wall that is space between cells, calculated from T1 before and after contrast. Rises with diffuse fibrosis."],
    ["T2", "How much free water the tissue holds. Rises with swelling and inflammation."],
    ["LGE", "Contrast that lingers in scar about ten minutes after injection, so scar shows up bright against dark healthy muscle."],
  ])}
  <h3 class="cm-h3">Case: scar hiding in the middle of the wall</h3>
  <div class="cm-shots cm-shots--3">
    ${shot("native-t1.jpg", "Native T1")}${shot("post-t1.jpg", "T1 after contrast")}${shot("lge-midwall.jpg", "LGE")}
  </div>
  <p class="cm-p">From a patient with dilated cardiomyopathy. The two T1 maps together give the ECV, which shows that the tissue has changed. Only the LGE image shows what and where: a thin stripe of scar inside the septum (arrows).</p>
  ${credit("Images: Cadour et al., <i>J Cardiovasc Magn Reson</i> 2023, CC BY 4.0")}
  <h3 class="cm-h3">Case: swelling and scar together</h3>
  <div class="cm-shots cm-shots--2">
    ${shot("t2-myocarditis.jpg", "T2 map")}${shot("lge-myocarditis.jpg", "LGE")}
  </div>
  <p class="cm-p">From a patient with acute myocarditis. The T2 map lights up where the muscle is swollen (arrows), and LGE shows scar along the outer wall. Swelling plus scar points to active inflammation, which neither image proves on its own.</p>
  ${credit("Images: O’Brien et al., <i>J Cardiovasc Magn Reson</i> 2022, CC BY 4.0")}
  <p class="cm-key">That side-by-side reading is what my pipeline does automatically, for every small patch of the heart wall.</p>
</section>

<section id="output" class="cm-sec">
  <header class="cm-head"><h2 class="cm-h">The output</h2><p>For each patient, my pipeline makes a map of the heart wall, patch by patch, shown three ways.</p></header>
  ${rows([
    ["Bullseye maps", "Two target-shaped maps, one for the inner half of the wall and one for the outer half. The top of the heart is the outer ring and the tip is the center, the same layout cardiologists already use."],
    ["3D heart shell", "The same colors wrapped onto a 3D model of the patient’s heart, like the one at the top of this page."],
    ["MRI overlay", "The colors laid over the original MRI, so a doctor can check each label against the scan."],
  ])}
  ${output}
  <h3 class="cm-sub cm-sub--gap">What each patch tells you</h3>
  ${rows([
    ["Tissue label", "One plain-language label, such as scar, swelling, diffuse fibrosis or normal. Patches that couldn’t be measured are shown striped."],
    ["Confidence grade", "A, B or C. The pipeline re-runs each decision with 18 slightly different cutoffs; if the label almost never changes, it gets an A. Solid patches are sure, faded and striped ones less so."],
    ["Motion", "A dashed outline where that part of the wall doesn’t squeeze well as the heart beats. Seeing movement next to the tissue label shows whether a scar or swelling is actually hurting how the heart pumps, not just sitting there."],
  ])}
</section>

<footer class="cm-end">
  <p class="foot"><span>© ${new Date().getFullYear()} Arnav Talreja</span><a href="index.html#projects">Back to Projects &amp; Research</a></p>
</footer>
</main>`;

const PAGE_JS = `
(() => {
  const NAMES = ${JSON.stringify(NAME)};
  const fig = document.querySelector(".cm-output"), read = fig.querySelector("[data-read]");
  fig.querySelector("[data-conf]").addEventListener("change", (e) => fig.classList.toggle("is-plain", !e.target.checked));
  const say = (c) => {
    if (!c) { read.textContent = "Hover a patch to read it."; return; }
    const g = c.dataset.grade;
    read.textContent = c.dataset.where + " · " + NAMES[c.dataset.cls] + (g ? " · grade " + g : "") + (c.hasAttribute("data-motion") ? " · moves poorly" : "");
  };
  fig.addEventListener("pointerover", (e) => say(e.target.closest(".ob-cell")));
  fig.addEventListener("pointerleave", () => say(null));
  const links = new Map([...document.querySelectorAll(".cm-nav__links a")].map((a) => [a.getAttribute("href").slice(1), a]));
  const io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) links.forEach((a, id) => a.classList.toggle("is-active", id === x.target.id)); }), { rootMargin: "-45% 0px -50% 0px" });
  links.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
})();
`;

const PAGE_CSS = `
:root{--tissue:#efe6e0}
body{background:var(--bg)}
.cm-nav{position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:28px;max-width:var(--wide);margin:0 auto;padding:14px var(--pad);background:rgba(255,255,255,.94);backdrop-filter:blur(6px);border-top:1px solid var(--hair);border-bottom:1px solid var(--hair);font-family:var(--sans);font-size:11.5px;letter-spacing:.14em;text-transform:uppercase}
.cm-nav a{text-decoration:none;color:var(--grey);white-space:nowrap;padding-bottom:2px;border-bottom:1px solid transparent;transition:color .3s,border-color .3s}
.cm-nav a:hover,.cm-nav a.is-active{color:var(--ink);border-bottom-color:var(--ink)}
.cm-nav__back{color:var(--ink)!important}
.cm-nav__links{display:flex;gap:22px;overflow-x:auto;scrollbar-width:none;flex:1;padding:2px 0}
.cm-nav__links::-webkit-scrollbar{display:none}
.cm{max-width:var(--wide);margin:0 auto;padding:0 var(--pad) 40px}
.cm-sec{padding-top:110px;scroll-margin-top:40px}
.cm-hero{padding-top:64px}
.cm-kicker{font-family:var(--sans);font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--grey)}
.cm-title{font-family:var(--caps);font-weight:400;font-size:clamp(30px,5vw,64px);letter-spacing:.1em;text-transform:uppercase;line-height:1.1;margin-top:14px}
.cm-lead{max-width:820px;margin-top:26px;font-weight:300;font-size:clamp(20px,2vw,26px);line-height:1.5;color:var(--body)}
.cm-rows{margin-top:40px;border-top:1px solid var(--hair);max-width:900px}
.cm-rows div{display:grid;grid-template-columns:200px minmax(0,1fr);gap:24px;padding:16px 0;border-bottom:1px solid var(--hair)}
.cm-rows dt{font-family:var(--sans);font-weight:600;font-size:14px;padding-top:3px}
.cm-rows dd{color:var(--body);font-size:17px;line-height:1.6}
.cm-fig{margin-top:56px}
.cm-fig .iso{font-family:var(--sans)}
.cm-head{display:grid;gap:12px;padding-bottom:22px;border-bottom:1px solid var(--hair);margin-bottom:8px}
.cm-head p{max-width:760px;color:var(--body);font-size:18px}
.cm-h{font-family:var(--caps);font-weight:400;font-size:clamp(24px,3vw,42px);letter-spacing:.12em;text-transform:uppercase;line-height:1.15}
.cm-idea{margin-top:48px;max-width:820px}
.cm-idea__big{font-family:var(--caps);font-size:clamp(24px,3vw,38px);letter-spacing:.08em;text-transform:uppercase;margin:14px 0 12px;line-height:1.2}
.cm-idea p:last-child{color:var(--body)}
.cm-why{margin-top:64px;background:var(--ink);color:#fff;padding:clamp(28px,4vw,48px)}
.cm-why__h{font-family:var(--caps);font-weight:400;font-size:clamp(20px,2.4vw,30px);letter-spacing:.14em;text-transform:uppercase}
.cm-why__grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px 40px;margin-top:26px}
.cm-why b{font-family:var(--sans);font-weight:600;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.66)}
.cm-why p{margin-top:8px;font-size:17px;line-height:1.6;color:rgba(255,255,255,.92)}
/* stepper */
.cm-step[hidden]{display:none}
.cm-steps{margin-top:30px}
.cm-tabs{display:flex;flex-wrap:wrap;gap:8px 24px;font-family:var(--sans);font-size:12px;letter-spacing:.14em;text-transform:uppercase}
.cm-tabs button,.cm-step__nav button{color:var(--grey);padding-bottom:3px;border-bottom:1px solid transparent;transition:color .3s,border-color .3s;font:inherit;letter-spacing:inherit;text-transform:inherit;background:none;cursor:pointer}
.cm-tabs button:hover{color:var(--ink)}
.cm-tabs button[aria-selected="true"]{color:var(--ink);border-bottom-color:var(--ink)}
.cm-step{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:clamp(28px,5vw,72px);align-items:center;margin-top:34px}
.cm-step__fig{margin:0;background:var(--soft);padding:clamp(14px,3vw,34px)}
.cm-step__fig svg{display:block;width:100%;height:auto;max-height:520px}
.cm-step__fig figcaption{margin-top:10px;font-size:13px;font-style:italic;color:var(--grey)}
.cm-pair{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.cm-step__text h3{font-family:var(--sans);font-weight:500;font-size:22px;line-height:1.3}
.cm-step__text p{margin-top:14px;color:var(--body)}
.cm-step__text b{font-weight:500;color:var(--ink)}
.cm-step__nav{display:flex;gap:28px;font-family:var(--sans);font-size:12px;letter-spacing:.14em;text-transform:uppercase}
.cm-step__nav button:hover{color:var(--ink);border-bottom-color:var(--ink)}
/* channel cards */
.cm-cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;margin-top:48px;border-top:1px solid var(--ink)}
.cm-cards li{padding:22px 22px 26px 0;border-bottom:1px solid var(--hair)}
.cm-cards li+li{padding-left:22px;border-left:1px solid var(--hair)}
.cm-cards h3{font-family:var(--sans);font-weight:600;font-size:15px;line-height:1.35}
.cm-cards p{margin-top:10px;font-size:16px;line-height:1.6;color:var(--body)}
.cm-like{font-style:italic}
.cm-up span,.cm-flow__carry span,.cm-flow__track span{display:block;font-family:var(--sans);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--grey);margin-bottom:4px;font-style:normal}
.cm-note{max-width:820px;margin-top:28px;color:var(--body);font-size:17px}
.cm-note b{font-weight:500;color:var(--ink)}
.cm-key{max-width:820px;margin-top:30px;padding-left:18px;border-left:2px solid var(--ink);font-size:clamp(19px,1.8vw,23px);line-height:1.5}
/* pipeline */
.cm-flow{display:grid;grid-template-columns:repeat(6,minmax(0,1fr) 16px) minmax(0,1fr);align-items:stretch;margin-top:36px}
.cm-flow{grid-template-rows:auto auto}
.cm-flow__stage{display:grid;grid-column:var(--col);grid-row:1 / span 2;grid-template-rows:subgrid;min-width:0}
.cm-flow__card{border:1px solid var(--ink);padding:14px 12px 16px;background:#fff}
.cm-flow__card h3{font-family:var(--sans);font-weight:600;font-size:14px;line-height:1.3}
.cm-flow__card p{margin-top:8px;font-size:14.5px;line-height:1.5;color:var(--body)}
.cm-flow__stage--out .cm-flow__card{background:var(--ink);color:#fff}
.cm-flow__stage--out .cm-flow__card p{color:rgba(255,255,255,.88)}
.cm-flow__carry{margin-top:18px;padding:12px 12px 14px;background:var(--soft);border-top:2px solid var(--ink);font-size:14px;line-height:1.45;color:var(--ink);position:relative}
.cm-flow__arrow{position:relative;grid-column:var(--col);grid-row:1;align-self:start;margin-top:40px;height:1px;background:var(--ink)}
.cm-flow__arrow::after{content:"";position:absolute;right:-1px;top:-4px;border:4.5px solid transparent;border-left:7px solid var(--ink);border-right:0}
.cm-flow__track{margin-top:20px;max-width:820px;font-size:17px;color:var(--body)}
/* rules + legend */
.cm-two{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:clamp(28px,5vw,72px);margin-top:56px}
.cm-sub{font-family:var(--sans);font-weight:600;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--grey);padding-bottom:12px;border-bottom:1px solid var(--ink)}
.cm-rules li{position:relative;padding:14px 0 14px 26px;border-bottom:1px solid var(--hair)}
.cm-rules li::before{content:"";position:absolute;left:6px;top:0;bottom:0;width:1px;background:var(--hair)}
.cm-rules li::after{content:"";position:absolute;left:3px;top:21px;width:7px;height:7px;border-radius:50%;background:var(--ink)}
.cm-rules__q{font-family:var(--sans);font-weight:500;font-size:15.5px}
.cm-rules__a{margin-top:4px;font-size:16px;line-height:1.55;color:var(--body)}
.cm-rules__a b{font-weight:500;color:var(--ink);margin-right:8px}
.cm-sw{display:inline-block;width:12px;height:12px;margin-right:8px;vertical-align:-1px;background:var(--c);border:1px solid rgba(0,0,0,.25)}
.cm-sw--nm{background:repeating-linear-gradient(45deg,#fff 0 2px,#a9a9ad 2px 3px)}
.cm-sw--dash{background:none;border:1.5px dashed var(--ink)}
.cm-legend li{display:grid;grid-template-columns:22px minmax(0,1fr);padding:10px 0;border-bottom:1px solid var(--hair);font-size:15.5px;line-height:1.4}
.cm-legend li .cm-sw{grid-row:span 2;margin-top:4px}
.cm-legend b{font-family:var(--sans);font-weight:500;font-size:14.5px}
.cm-legend small{color:var(--grey);font-size:14px}
.cm-grades{margin-top:22px}
.cm-grades li{padding:8px 0;font-size:15px;color:var(--body);display:flex;gap:10px;align-items:baseline}
.cm-grades b{font-family:var(--sans);font-weight:600;font-size:13.5px;color:var(--ink);white-space:nowrap}
.cm-g{display:inline-block;width:22px;height:12px;flex:none;background:#b5223c}
.cm-g--b{opacity:.5}
.cm-g--c{opacity:.28;background-image:repeating-linear-gradient(-45deg,transparent 0 3px,#000 3px 4px)}
.cm-output{margin:56px 0 0;background:var(--soft);padding:clamp(16px,3vw,36px)}
.cm-output__map svg{display:block;width:100%;max-width:880px;height:auto;margin:0 auto}
.ob-cell{stroke:#fff;stroke-width:.4;transition:opacity .3s}
.ob-cell[data-grade="B"]{opacity:.55}
.ob-cell[data-grade="C"]{opacity:.32}
.is-plain .ob-cell{opacity:1}.is-plain .ob-c{display:none}
.ob-cell:hover{stroke:#141414;stroke-width:1.4}
.cm-output figcaption{display:flex;flex-wrap:wrap;gap:10px 28px;align-items:center;justify-content:center;margin-top:14px;font-family:var(--sans);font-size:13px;color:var(--body)}
.cm-toggle{display:inline-flex;gap:8px;align-items:center;letter-spacing:.12em;text-transform:uppercase;font-size:11.5px;cursor:pointer}
.cm-output__read{min-height:1.4em;font-variant-numeric:tabular-nums}
.cm-chips{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 22px;margin-top:18px;font-family:var(--sans);font-size:13px;color:var(--body)}
.cm-chips li{display:inline-flex;align-items:center}
.cm-idea p{margin-top:14px;font-size:19px;line-height:1.6;color:var(--body)}
.cm-idea b{font-family:var(--sans);font-weight:600;color:var(--ink)}
.cm-thanks--small{font-size:16px;color:var(--grey)}
.cm-end{margin-top:110px}
.cm-sub--gap{margin-top:56px}
.cm-head + .cm-rows,.cm-sub + .cm-rows{margin-top:0;border-top:0}
.cm-points{max-width:none}
.cm-points li{font-size:18px}
.cm-why1{margin-top:26px;font-size:18px;line-height:1.6;color:var(--body)}
.cm-why1 b{font-family:var(--sans);font-weight:600;color:var(--ink)}
.cm-idea .cm-sub{margin-bottom:6px}
.cm-h3{font-family:var(--sans);font-weight:500;font-size:20px;line-height:1.35;margin-top:56px}
.cm-p{max-width:760px;margin-top:12px;font-size:18px;line-height:1.65;color:var(--body)}
.cm-shots{display:grid;gap:14px;margin-top:22px}
.cm-shots--4{grid-template-columns:repeat(4,minmax(0,1fr))}
.cm-shots--3{grid-template-columns:repeat(3,minmax(0,1fr))}
.cm-shots--2{grid-template-columns:repeat(2,minmax(0,1fr));max-width:900px}
.cm-shots--plan{grid-template-columns:repeat(2,minmax(0,1fr));max-width:900px}
.cm-shots--1{max-width:900px}
.cm-shot{margin:0}
.cm-shots--4 img,.cm-shots--3 img,.cm-shots--2 img,.cm-shots--plan img{aspect-ratio:1;object-fit:cover}
.cm-shot img{display:block;width:100%;height:auto;background:#000}
.cm-shot figcaption{margin-top:8px;font-family:var(--sans);font-size:13px;color:var(--grey)}
.cm-credit{margin-top:6px;font-family:var(--sans);font-size:8.5px;color:#c4c4c4}
.cm-thanks{max-width:820px;margin-top:26px;font-size:19px;line-height:1.7;color:var(--body)}
.cm .foot{margin-top:90px}
/* kit card inside the site */
.cm .iso-plate-corners,.cm .iso-keys{display:none}
.cm .iso-plate{padding:22px 18px}
.cm .lb-pick{font-family:var(--sans);font-size:12px;letter-spacing:.14em;color:var(--grey)}
.cm .lb-call{font-family:var(--serif);font-size:16px;letter-spacing:0;color:var(--body)}
.cm .iso-figure{margin:0}
.cm .iso-plate{box-shadow:0 0 0 1px var(--hair)}
.cm .iso-legend{font-family:var(--serif);font-size:15px}
@media (max-width:1100px){
  .cm-flow{grid-template-columns:minmax(0,1fr);grid-template-rows:none;gap:0}
  .cm-flow__arrow,.cm-flow__stage{grid-column:auto!important}
  .cm-flow__arrow{grid-row:auto}
  .cm-flow__stage{grid-row:auto!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr);grid-template-rows:none;gap:14px}
  .cm-flow__carry{margin-top:0;border-top:0;border-left:2px solid var(--ink)}
  .cm-flow__arrow{height:22px;width:1px;margin:0 0 0 24px}
  .cm-flow__arrow::after{right:auto;left:-4px;top:auto;bottom:-1px;border:4.5px solid transparent;border-top:7px solid var(--ink);border-bottom:0}
  .cm-cards{grid-template-columns:repeat(2,minmax(0,1fr))}
  .cm-cards li:nth-child(3){padding-left:0;border-left:0}
}
@media (max-width:820px){
  .cm-step,.cm-two{grid-template-columns:minmax(0,1fr)}
  .cm-why__grid{grid-template-columns:minmax(0,1fr)}
  .cm-rows div{grid-template-columns:minmax(0,1fr);gap:4px}
}
@media (max-width:820px){.cm-shots--4{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:560px){
  .cm-shots--3,.cm-shots--2,.cm-shots--plan{grid-template-columns:minmax(0,1fr)}
  .cm-cards{grid-template-columns:minmax(0,1fr)}
  .cm-cards li+li{padding-left:0;border-left:0}
  .cm-flow__stage{grid-template-columns:minmax(0,1fr)}
  .cm-flow__carry{border-left:0;border-top:2px solid var(--ink)}
  .cm-pair{grid-template-columns:minmax(0,1fr)}
  .cm-nav{gap:18px}
  .cm-sec{padding-top:80px}
  .cm .iso-plate{overflow:hidden;padding:14px 10px}
  .cm .iso-plate .iso-svg{width:116%;max-width:none;margin-left:-8%}
}
`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Cardiac MRI Tissue Map for Heart Failure (HFpEF) · Arnav Talreja</title>
<meta name="description" content="A cardiac MRI research pipeline that labels every ~6 mm patch of the left ventricle wall with a tissue class and a confidence grade. All images are illustrative.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Aboreto&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300;1,6..72,400&family=Work+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css?v=1791290000">
<style>${PAGE_CSS}</style>
</head>
<body>
${body}
<script>${PAGE_JS}</script>
</body>
</html>`;
writeFileSync(OUT, html);
// thumbnail for the Projects & Research list: the inner-layer map alone, centred
{
  const full = X.outputBullseyes();
  const defs = full.match(/<defs>.*?<\/defs>/s)[0];
  const eye = full.match(/<g class="ob-eye" data-layer="0">.*?<\/g>/s)[0].replace(/<text[^>]*>[^<]*<\/text>/g, "");
  const style = `<style>.ob-cell{stroke:#fff;stroke-width:.4}.ob-cell[data-grade="B"]{opacity:.55}.ob-cell[data-grade="C"]{opacity:.32}</style>`;
  const t1 = readFileSync(join(HERE, "..", "..", "assets", "research", "cmri", "native-t1.jpg")).toString("base64");
  const thumb = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 720 480" width="720" height="480">${style}${defs}<rect width="720" height="480" fill="#f4f4f2"/><image x="18" y="40" width="400" height="400" href="data:image/jpeg;base64,${t1}" xlink:href="data:image/jpeg;base64,${t1}"/><path d="M 428 240 L 452 240" stroke="#141414" stroke-width="2"/><path d="M 446 233 L 454 240 L 446 247" fill="none" stroke="#141414" stroke-width="2"/><g transform="translate(469 117) scale(1.1)">${eye.replace(/<g class="ob-eye"[^>]*>/, '<g transform="translate(-16 -28)">')}</g></svg>`;
  writeFileSync(join(HERE, "..", "..", "assets", "projects", "cardiac-mri-thumb.svg"), thumb);
}
console.log("wrote cardiac-mri.html", (html.length / 1024).toFixed(0) + " KB");
