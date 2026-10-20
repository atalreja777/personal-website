// node tools/cmri/preview.mjs <name>  → writes tools/cmri/out/<name>.html with one figure
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../anatomy/kit/iso-kit.mjs";
import { kitScript } from "../anatomy/scripts/inline-kit.mjs";
import { FIG_CSS } from "./fig-css.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const name = process.argv[2] || "slicer";
const mod = await import(`./fig-${name}.mjs`);
const fig = mod[name];
mkdirSync(join(HERE, "out"), { recursive: true });
const page = k.pageHtml({ title: name, theme: "light", body: fig.html, script: kitScript() + fig.script, width: 760 }).replace("</style>", FIG_CSS + "</style>");
writeFileSync(join(HERE, "out", `${name}.html`), page);
console.log("wrote", `out/${name}.html`, (page.length / 1024).toFixed(0) + " KB");
