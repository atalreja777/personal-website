// Styles the cardiac MRI figures add on top of the kit's ISO_CSS.
export const FIG_CSS = `
.cm-tints{mix-blend-mode:multiply;opacity:.9}.cm-tint{stroke-width:.4}
.cm-cell{stroke-width:.35}
.cm-cavity{fill:#d2d1cb}
.cm-floor{fill:var(--anatomy-shade-1)}
.lb-glow{fill:#f6f3e8}
.lb-film{transition:opacity .5s var(--anatomy-ease)}
.lb-panel:not([data-focus]) .lb-film{filter:saturate(.6);opacity:.82}
.lb-panel[data-focus] .lb-rim{stroke:var(--anatomy-lit);stroke-width:1.1}
.lb-wall{stroke:none}
.lb-pick{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 20px;margin-top:14px;font:12px/1.4 var(--anatomy-mono);letter-spacing:.06em;text-transform:uppercase;color:var(--anatomy-muted)}
.lb-pick button{font:inherit;letter-spacing:inherit;text-transform:inherit;color:inherit;background:none;border:0;border-bottom:1px solid transparent;padding:0 0 3px;cursor:pointer}
.lb-pick button:hover{color:var(--anatomy-strong)}
.lb-pick button[aria-pressed="true"]{color:var(--anatomy-strong);border-bottom-color:var(--anatomy-strong)}
.lb-call{flex-basis:100%;text-transform:none;letter-spacing:.02em;color:var(--anatomy-text)}
.cs-face{stroke:none}
.cs-strip{stroke:none}
.cs-sensor[data-on] .iso-edge{stroke:var(--anatomy-hi)}
.cs-sensor[data-on] .iso-line[data-tone="lo"]{stroke:var(--anatomy-hi)}
.iso-stage{outline:none;touch-action:pan-y}
.iso-stage:focus-visible{box-shadow:0 0 0 1px var(--anatomy-hi)}
`;
