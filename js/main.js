/* ==========================================================================
   Arnav Talreja — site behaviour
   Content lives in js/content.js. This file only renders and animates it.
   ========================================================================== */
(() => {
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const hasGsap = typeof window.gsap !== "undefined";
  const pad = (n, l = 2) => String(n).padStart(l, "0");

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const isPh = (s) => typeof s === "string" && /^\[.*\]$/.test(s.trim());
  const clean = (s) => (isPh(s) ? s.trim().slice(1, -1) : s);
  // text → HTML; [placeholders] are shown dotted-underlined so they're easy to spot
  const t = (s) => (s == null ? "" : isPh(s) ? `<span class="ph" title="Placeholder: edit js/content.js">${esc(clean(s))}</span>` : esc(s));
  // YouTube: a thumbnail with a play button that opens the video in the lightbox
  const ytCard = (id, label, cls = "", img = null, pos = null) =>
    `<button class="yt ${cls}${img ? " yt--own" : ""}" type="button" data-yt="${esc(id)}" data-cap="${esc(label)}" aria-label="Play video: ${esc(label)}">
      <img src="${img ? esc(img) : `https://i.ytimg.com/vi/${esc(id)}/sddefault.jpg`}" alt="" loading="lazy"${pos ? ` style="object-position:${esc(pos)}"` : ""}>
      <span class="yt__play" aria-hidden="true"></span><span class="yt__label">${esc(label)}</span></button>`;
  // label / value rows, the way pascalvangemert.nl lists a project's details
  // one line per accomplishment, resume style
  const pointList = (pts, cls) => (pts && pts.length ? `<ul class="points ${cls}">${pts.map((x) => `<li>${t(x)}</li>`).join("")}</ul>` : "");
  const featureList = (r, cls) =>
    r.features ? `<dl class="kv ${cls}"><div><dt>Features</dt><dd>${r.features.map(t).join("<br>")}</dd></div>${r.builtWith ? `<div><dt>Techniques</dt><dd>${t(r.builtWith)}</dd></div>` : ""}</dl>` : "";
  const thumb = (m) => (m.type === "video" ? m.poster : m.src);
  const slotPath = (a, i) => `${a.folder || "assets/"}${pad(i + 1)}.jpg`;

  const TYPE_LABEL = { robotics: "Robotics", gur: "GUR", tennis: "Tennis", project: "Project", service: "Service", club: "Clubs", work: "Work", research: "Research", school: "School", award: "Award" };
  const MONTHS = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const parseDate = (d) => {
    const [y, m] = clean(String(d)).split("-").map(Number);
    return { y: y || 0, m: m || 0, sort: (y || 0) * 100 + (m || 0) };
  };
  const fmtDate = (d) => {
    if (!d) return "";
    if (/present/i.test(d)) return "Present";
    const p = parseDate(d);
    return `${p.m ? MONTHS[p.m] + " " : ""}${p.y}`;
  };

  /* ------------------------------------------------------------------ */
  /* Intro, numbers, about, recognition, contact                        */
  /* ------------------------------------------------------------------ */
  // Hero: photos crossfade on a timer; click the photo or use the arrows to move
  function renderHero(slides) {
    const hero = $(".js-hero");
    if (!slides.length) { hero.innerHTML = `<div class="media"></div>`; return; }
    hero.innerHTML = `<div class="media hero">${slides
      .map((s, i) => `<img class="hero__slide${i ? "" : " is-on"}" src="${esc(s.src)}" alt="${esc(s.cap || "")}" style="object-position:${esc(s.pos || "50% 50%")}${s.fit ? `;object-fit:${esc(s.fit)};background:#fff` : ""}"${i ? ` loading="lazy"` : ""}>`)
      .join("")}<span class="hero__bar" aria-hidden="true"></span></div>
      <figcaption class="hero__foot">
        <span class="hero__cap" aria-live="polite">${t(slides[0].cap)}</span>
        ${slides.length > 1 ? `<span class="hero__nav"><button type="button" data-d="-1" aria-label="Previous photo">&larr;</button><button type="button" data-d="1" aria-label="Next photo">&rarr;</button></span>` : ""}
      </figcaption>`;
    if (slides.length < 2) return;

    const imgs = $$(".hero__slide", hero), cap = $(".hero__cap", hero), bar = $(".hero__bar", hero);
    const HOLD = 3500;
    let cur = 0, timer = null, paused = false;
    const go = (n) => {
      imgs[cur].classList.remove("is-on");
      cur = (n + imgs.length) % imgs.length;
      imgs[cur].classList.add("is-on");
      cap.innerHTML = t(slides[cur].cap);
      restart();
    };
    const restart = () => {
      clearTimeout(timer);
      bar.classList.remove("is-run"); void bar.offsetWidth;
      if (paused || reduce) return;
      bar.style.animationDuration = HOLD + "ms";
      bar.classList.add("is-run");
      timer = setTimeout(() => go(cur + 1), HOLD);
    };
    const pause = (v) => { paused = v; restart(); };
    $(".media", hero).addEventListener("click", () => go(cur + 1));
    $(".hero__nav", hero).addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) go(cur + +b.dataset.d); });
    hero.addEventListener("mouseenter", () => pause(true));
    hero.addEventListener("mouseleave", () => pause(false));
    document.addEventListener("visibilitychange", () => pause(document.hidden));
    restart();
  }

  function renderTop() {
    const p = S.person;
    renderHero(p.heroSlides || []);
    $(".js-intro-links").innerHTML =
      `<a class="lnk" href="#work" data-scroll>See my work</a><a class="lnk" href="#timeline" data-scroll>Timeline</a><a class="lnk" href="#contact" data-scroll>Get in touch</a>` +
      (p.resume ? `<a class="lnk" href="${esc(p.resume)}" target="_blank" rel="noopener">Résumé</a>` : `<span class="ph" title="Add person.resume in js/content.js">Résumé</span>`);


    const por = $(".js-portrait");
    por.innerHTML = `<div class="media">${p.portrait ? `<img src="${esc(p.portrait)}" alt="Portrait of ${esc(p.first)} ${esc(p.last)}">` : `<span>Your portrait<br>assets/me/portrait.jpg</span>`}</div>
      <figcaption>${esc(p.first)} ${esc(p.last)}, ${t(p.location)}</figcaption>`;
    $(".js-about").innerHTML = (p.about || []).map((x) => `<p>${t(x)}</p>`).join("");
    $(".js-edu").innerHTML = (p.education || [])
      .map((e) => `<div><dt>School</dt><dd>${t(e.school)}<small>${t(e.detail)}${e.note ? " · " + t(e.note) : ""}</small></dd></div>`)
      .join("") + `<div><dt>Based in</dt><dd>${t(p.location)}</dd></div>`;

    const cw = p.coursework;
    if (cw) $(".js-courses").innerHTML = `<h3 class="tag">Coursework</h3>
      <div class="courses__now"><p class="courses__head">Senior year, 2026–27</p>
        <ul>${cw.current.map((c) => `<li>${t(c)}</li>`).join("")}</ul></div>
      <div class="courses__done"><p class="courses__head">Completed</p>
        <dl>${cw.completed.map(([k, list]) => `<div><dt>${t(k)}</dt><dd>${list.map(t).join("<br>")}</dd></div>`).join("")}</dl></div>`;

    $(".js-rec").innerHTML = (S.recognition || []).map((r) => `<li>${t(r)}</li>`).join("");

    // contact
    const mailOk = !isPh(p.email);
    const mail = $(".js-mail");
    mail.href = mailOk ? `mailto:${p.email}` : "#contact";
    mail.innerHTML = t(p.email);
    $(".js-mail-small").innerHTML = mailOk ? `<a href="mailto:${esc(p.email)}">${esc(p.email)}</a>` : t(p.email);
    $(".js-contact-lead").innerHTML = "If you’re working on robotics, running a STEM program, or looking for a student researcher, I’d love to hear from you.";
    $(".js-place").innerHTML = t(p.location);
    const links = [...p.links];
    if (p.resume) links.push({ label: "Résumé", href: p.resume });
    $(".js-links").innerHTML = links
      .map((l) => (isPh(l.href) ? `<li><span class="ph" title="Placeholder: edit js/content.js">${esc(l.label)}</span></li>` : `<li><a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)}</a></li>`))
      .join("");
    $(".js-year").textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------ */
  /* Work: staggered two-column grid                                     */
  /* ------------------------------------------------------------------ */
  function renderWork() {
    $(".js-work").innerHTML = S.activities
      .map((a) => {
        const cover = a.media[0];
        return `<a class="card" href="#view/${a.id}">
          <div class="card__media${cover ? "" : " is-empty"}">${cover ? `<img src="${esc(thumb(cover))}" alt="" loading="lazy" decoding="async">` : `<span>Cover photo<br>${esc(slotPath(a, 0))}</span>`}</div>
          <div class="card__cap"><span class="card__title">${t(a.title)}</span><span class="card__role">${t(a.kicker)}</span></div>
          ${a.summary ? `<p class="card__sum">${t(a.summary)}</p>` : ""}
          <span class="card__more lnk">${a.media.length ? `View ${a.media.length} photos & story` : "Open"}</span>
        </a>`;
      })
      .join("");
  }

  /* ------------------------------------------------------------------ */
  /* Tennis: horizontal strip, oldest to newest                          */
  /* ------------------------------------------------------------------ */
  function renderJourney() {
    const J = S.tennis;
    if (!J) return;
    const list = J.chapters.map((c) => (c.video ? { type: "video", src: c.video, poster: c.src, cap: clean(c.title) } : { src: c.src, cap: clean(c.title) }));
    $(".js-jr-lead").innerHTML = t(J.lead);
    const track = $(".js-jr");
    track.innerHTML = J.chapters
      .map((c, i) => `<li class="jr">
          <button class="jr__media" type="button" data-i="${i}" aria-label="Enlarge: ${esc(clean(c.title))}">
            ${c.video
              ? `<video src="${esc(c.video)}" poster="${esc(c.src)}" muted loop playsinline preload="metadata"></video>`
              : `<img src="${esc(c.src)}" alt="${esc(clean(c.text))}" loading="lazy" decoding="async"${c.pos ? ` style="object-position:${esc(c.pos)}"` : ""}>`}
          </button>
          <p class="jr__when"><span class="jr__label">${t(c.when)}</span></p>
          <h3 class="jr__title">${t(c.title)}</h3>
          <p class="jr__text">${t(c.text)}</p>
        </li>`)
      .join("");
    track.addEventListener("click", (e) => {
      const b = e.target.closest(".jr__media");
      if (b) openLightbox(list, +b.dataset.i, b);
    });
    // videos play only while visible
    const vio = new IntersectionObserver((ents) => ents.forEach((en) => (en.isIntersecting && !reduce ? en.target.play().catch(() => {}) : en.target.pause())), { threshold: 0.5 });
    $$("video", track).forEach((v) => vio.observe(v));

    const prev = $(".js-jr-prev"), next = $(".js-jr-next");
    const stepBy = () => ($(".jr", track)?.offsetWidth || 300) + 28;
    prev.addEventListener("click", () => track.scrollBy({ left: -stepBy(), behavior: "smooth" }));
    next.addEventListener("click", () => track.scrollBy({ left: stepBy(), behavior: "smooth" }));
    const ends = () => {
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 4;
    };
    track.addEventListener("scroll", ends, { passive: true });
    addEventListener("resize", ends);
    ends();
  }

  /* ------------------------------------------------------------------ */
  /* Gallery: every photo, black & white until hovered                   */
  /* ------------------------------------------------------------------ */
  let galleryList = [];
  function renderGallery() {
    const all = [];
    S.activities.forEach((a) => a.media.forEach((m) => all.push({ ...m, act: a })));
    // tennis lives in its own section, but its photos still belong on the wall
    const tennis = S.tennis ? { id: "tennis", title: "Tennis", media: S.tennis.chapters.map((c) => (c.video ? { type: "video", src: c.video, poster: c.src, cap: clean(c.title) } : { src: c.src, cap: clean(c.title) })) } : null;
    if (tennis) tennis.media.forEach((m) => all.push({ ...m, act: tennis }));
    // interleave activities so the wall mixes FTC and GUR
    for (let i = all.length - 1, s = 14607; i > 0; i--) {
      s = (s * 1664525 + 1013904223) % 4294967296;
      const j = s % (i + 1);
      [all[i], all[j]] = [all[j], all[i]];
    }
    const withPhotos = [...S.activities, ...(tennis ? [tennis] : [])].filter((a) => a.media.length);
    $(".js-gal-filters").innerHTML =
      `<button type="button" data-f="all" aria-pressed="true">All<sup>${all.length}</sup></button>` +
      withPhotos.map((a) => `<button type="button" data-f="${a.id}" aria-pressed="false">${esc(clean(a.title))}<sup>${a.media.length}</sup></button>`).join("");

    const LIMIT = 15;
    let filter = "all", expanded = false;
    const grid = $(".js-gallery");
    grid.innerHTML = all
      .map((m, i) => `<button class="shot" type="button" data-i="${i}" data-act="${m.act.id}" aria-label="Enlarge: ${esc(m.cap || "photo")}">
        <img src="${esc(thumb(m))}" alt="" loading="lazy" decoding="async">
        
        <span class="shot__cap">${esc(m.cap || "")}</span></button>`)
      .join("");
    const more = document.createElement("button");
    more.type = "button";
    more.className = "gallery__more lnk";
    grid.after(more);

    const apply = () => {
      const match = all.map((m, i) => ({ m, i })).filter(({ m }) => filter === "all" || m.act.id === filter);
      const shown = expanded ? match : match.slice(0, LIMIT);
      const keep = new Set(shown.map((x) => x.i));
      $$(".shot", grid).forEach((el) => el.classList.toggle("is-hidden", !keep.has(+el.dataset.i)));
      galleryList = shown.map((x) => x.m);
      more.hidden = match.length <= LIMIT;
      more.textContent = expanded ? "Show fewer" : `Show all ${match.length} photos`;
      window.ScrollTrigger && ScrollTrigger.refresh();
    };
    apply();
    more.addEventListener("click", () => { expanded = !expanded; apply(); });
    $(".js-gal-filters").addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      filter = b.dataset.f;
      $$(".js-gal-filters button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      apply();
    });
    grid.addEventListener("click", (e) => {
      const b = e.target.closest(".shot");
      if (!b) return;
      const m = all[+b.dataset.i];
      openLightbox(galleryList, galleryList.indexOf(m), b);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Timeline: vertical line with hollow markers                         */
  /* ------------------------------------------------------------------ */
  function renderTimeline() {
    const items = S.timeline.map((e) => ({ ...e, d: parseDate(e.date) })).sort((a, b) => b.d.sort - a.d.sort);
    const types = [...new Set(items.map((e) => e.type))];
    $(".js-tl-filters").innerHTML =
      `<button type="button" data-type="all" aria-pressed="true">All</button>` +
      types.map((ty) => `<button type="button" data-type="${ty}" aria-pressed="false">${TYPE_LABEL[ty] || ty}</button>`).join("");

    $(".js-tl").innerHTML = items
      .map((e) => {
        const range = e.end ? `${fmtDate(e.date)} – ${fmtDate(e.end)}` : fmtDate(e.date);
        const date = isPh(e.date) ? `<span class="ph" title="Placeholder date">${range}</span>` : esc(range);
        const meta = [e.place ? t(e.place) : "", `<b>${TYPE_LABEL[e.type] || e.type}</b>`].filter(Boolean).join(" &nbsp;|&nbsp; ");
        return `<li class="tl-item" data-type="${e.type}">
          <p class="tl-item__date">${date}</p>
          <h3 class="tl-item__title">${t(e.title)}${e.org ? ` <span>@ ${t(e.org)}</span>` : ""}</h3>
          <p class="tl-item__meta">${meta}</p>
          ${e.text ? `<p class="tl-item__text">${t(e.text)}</p>` : ""}
          ${pointList(e.points, "tl-item__points")}
          ${e.highlight ? `<blockquote class="tl-item__story">${t(e.highlight)}</blockquote>` : ""}
          ${featureList(e, "feat--tl")}
          ${e.link ? (e.link.href.startsWith("#") ? `<a class="tl-item__link lnk" href="${esc(e.link.href)}">${esc(e.link.label)} →</a>` : `<a class="tl-item__link lnk" href="${esc(e.link.href)}" target="_blank" rel="noopener">${esc(e.link.label)} ↗</a>`) : ""}
          ${e.doc ? `<a class="tl-doc${e.doc.wide ? " tl-doc--wide" : ""}${e.doc.page ? " tl-doc--page" : ""}" href="${esc(e.doc.pdf || e.doc.img)}" target="_blank" rel="noopener"><img src="${esc(e.doc.img)}" alt="${esc(e.doc.alt || clean(e.title))}" loading="lazy"><span class="tl-doc__cap"><span>${esc(e.doc.label)}</span><span>${esc(e.doc.cta || "View full poster")} ↗</span></span></a>` : ""}
          ${e.media ? `<div class="tl-item__grid">${e.media.map((x, k) => `<button class="tl-item__tile${x.tall ? " tl-item__tile--tall" : ""}${x.contain ? " tl-item__tile--contain" : ""}" type="button" data-k="${k}" aria-label="${x.type === "youtube" ? "Play video" : "Enlarge"}: ${esc(x.cap || "photo")}">${x.type === "video" ? `<video src="${esc(x.src)}" poster="${esc(x.poster)}" muted loop playsinline preload="metadata"></video>` : `<img src="${esc(x.src)}" alt="${esc(x.cap || "")}" loading="lazy">`}${x.type === "youtube" ? '<span class="yt__play" aria-hidden="true"></span>' : ""}${x.cap ? `<span class="tl-item__tcap">${esc(x.cap)}</span>` : ""}</button>`).join("")}</div>` : ""}
          ${e.yt ? `<div class="tl-item__media">${ytCard(e.yt, "Watch the demo", "tl-item__img tl-item__yt", e.img, e.imgPos)}</div>` : e.img ? `<div class="tl-item__media"><img class="tl-item__img" src="${esc(e.img)}" alt="" loading="lazy"${e.imgPos ? ` style="object-position:${esc(e.imgPos)}"` : ""}></div>` : ""}
        </li>`;
      })
      .join("");

    $(".js-tl-filters").addEventListener("click", (ev) => {
      const b = ev.target.closest("button");
      if (!b) return;
      const ty = b.dataset.type;
      $$(".js-tl-filters button").forEach((c) => c.setAttribute("aria-pressed", String(c === b)));
      $$(".tl-item").forEach((it) => it.classList.toggle("is-dim", ty !== "all" && it.dataset.type !== ty));
    });

    // small photo grids open in the lightbox; clips play while visible
    $$(".tl-item__grid").forEach((g) => {
      const e = items[[...$$(".tl-item")].indexOf(g.closest(".tl-item"))];
      g.addEventListener("click", (ev) => { const b = ev.target.closest(".tl-item__tile"); if (b) openLightbox(e.media, +b.dataset.k, b); });
    });
    const tio = new IntersectionObserver((ents) => ents.forEach((en) => (en.isIntersecting && !reduce ? en.target.play().catch(() => {}) : en.target.pause())), { threshold: 0.4 });
    $$(".tl-item__grid video").forEach((v) => tio.observe(v));

    // markers darken as each entry scrolls into view
    const io = new IntersectionObserver((ents) => ents.forEach((en) => en.isIntersecting && en.target.classList.add("is-seen")), { rootMargin: "0px 0px -35% 0px" });
    $$(".tl-item").forEach((it) => io.observe(it));
  }

  /* ------------------------------------------------------------------ */
  /* Projects                                                            */
  /* ------------------------------------------------------------------ */
  const projectPage = (p, i) => ({
    id: `p${i + 1}`,
    isProject: true,
    external: p.external,
    title: p.title,
    kicker: p.kicker || p.category,
    role: p.role === undefined ? "[Your role]" : p.role,
    yt: p.yt,
    points: p.points,
    explainer: p.explainer,
    features: p.features,
    builtWith: p.builtWith,
    years: p.year,
    place: p.place || null,
    summary: p.text,
    body: p.body || ["[Describe the problem, what you built or found, and what happened next.]"],
    details: [["Category", p.category], ["Year", p.year], ...(p.details || [])],
    link: p.href && !isPh(p.href) ? { label: p.linkLabel || p.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""), href: p.href } : null,
    slots: p.img ? 1 : 3,
    folder: "assets/research/",
    media: p.media || (p.img ? [{ src: p.img, cap: clean(p.title) }] : []),
  });

  function renderProjects() {
    const cats = [...new Set(S.projects.map((p) => p.category))];
    $(".js-proj-filters").innerHTML =
      `<button type="button" data-cat="all" aria-pressed="true">All<sup>${S.projects.length}</sup></button>` +
      cats.map((c) => `<button type="button" data-cat="${esc(c)}" aria-pressed="false">${esc(c)}<sup>${S.projects.filter((p) => p.category === c).length}</sup></button>`).join("");
    $(".js-proj-list").innerHTML = S.projects
      .map((p, i) => `<li class="prow" data-cat="${esc(p.category)}">
          <a href="${p.external ? esc(p.href) : `#view/p${i + 1}`}"${p.external ? ' target="_blank" rel="noopener"' : ""} ${p.img ? `data-img="${esc(p.img)}"` : ""}>
            <span class="prow__title">${t(p.title)}<span class="prow__text">${t(p.text)}</span></span>
            <span class="prow__cat">${esc(p.category)}</span>
            <span class="prow__year">${t(p.year)}</span>
            <span class="prow__arrow" aria-hidden="true">${p.external ? "↗" : "→"}</span>
          </a></li>`)
      .join("");
    $(".js-proj-filters").addEventListener("click", (ev) => {
      const b = ev.target.closest("button");
      if (!b) return;
      $$(".js-proj-filters button").forEach((c) => c.setAttribute("aria-pressed", String(c === b)));
      $$(".prow").forEach((r) => r.classList.toggle("is-hidden", b.dataset.cat !== "all" && r.dataset.cat !== b.dataset.cat));
    });
  }

  function hoverPreview() {
    const prev = $(".preview");
    const img = $("img", prev);
    if (!fine || !hasGsap) return;
    const qx = gsap.quickTo(prev, "x", { duration: 0.6, ease: "power3" });
    const qy = gsap.quickTo(prev, "y", { duration: 0.6, ease: "power3" });
    let px = -1, py = -1, active = null;
    const show = (el) => {
      if (el === active) return;
      active = el;
      img.src = el.dataset.img;
      gsap.to(prev, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out", overwrite: true });
    };
    const hide = () => {
      if (!active) return;
      active = null;
      gsap.to(prev, { opacity: 0, scale: 0.92, duration: 0.25, overwrite: true });
    };
    // check what is actually under the pointer: the row can scroll away
    // from a still cursor, and clicks open pages, without any mouseleave
    const check = () => {
      if (px < 0 || !page.hidden || !lb.hidden) return hide();
      const under = document.elementFromPoint(px, py);
      const el = under && under.closest("[data-img]");
      el ? show(el) : hide();
    };
    window.addEventListener("mousemove", (e) => { px = e.clientX; py = e.clientY; qx(px + 170); qy(py); check(); });
    window.addEventListener("scroll", check, { passive: true });
    document.addEventListener("mouseleave", () => { px = -1; hide(); });
    document.addEventListener("click", hide);
    window.addEventListener("hashchange", hide);
    window.addEventListener("blur", () => { px = -1; hide(); });
    document.addEventListener("visibilitychange", hide);
    // safety net while visible: layout can shift (filters, "show all") with no event at all
    gsap.ticker.add(() => active && check());
  }

  /* ------------------------------------------------------------------ */
  /* Detail pages  (#view/<id>)                                          */
  /* ------------------------------------------------------------------ */
  const page = $(".detail");
  const pageScroll = $(".detail__scroll");
  const pageInner = $(".js-detail-inner");
  let current = null, returnFocus = null, lenis = null;

  const projectPages = () => S.projects.map(projectPage).filter((r) => !r.external);
  const pages = () => [...S.activities, ...projectPages()];
  const siblings = (r) => (r.isProject ? projectPages() : S.activities);
  const mediaEl = (m, autoplay) =>
    m.type === "video"
      ? `<video src="${esc(m.src)}" poster="${esc(m.poster || "")}" muted loop playsinline ${autoplay ? "autoplay" : 'preload="none"'}></video>`
      : `<img src="${esc(m.src)}" alt="${esc(m.cap || "")}" decoding="async">`;

  // "How it works": short sections, each with an optional figure (js/figures.js) and display math
  const explainerHTML = (xp) => `<section class="xp" aria-label="How it works">
      <header class="xp__head"><h3>How it works</h3><p>${t(xp.lead)}</p></header>
      ${xp.sections.map((s) => `<article class="xp__sec">
        <h4 class="xp__h">${t(s.h)}</h4>
        ${(s.p || []).map((p) => `<p class="xp__p">${p}</p>`).join("")}
        ${(s.math || []).map((m) => `<p class="xp__math">${m}</p>`).join("")}
        ${s.fig && window.FIGS && window.FIGS[s.fig] ? `<figure class="xp__fig">${window.FIGS[s.fig]}${s.cap ? `<figcaption>${t(s.cap)}</figcaption>` : ""}</figure>` : ""}
        ${(s.after || []).map((p) => `<p class="xp__p">${p}</p>`).join("")}
      </article>`).join("")}
    </section>`;

  function detailHTML(r) {
    const sib = siblings(r);
    const idx = sib.findIndex((x) => x.id === r.id);
    const next = sib[(idx + 1) % sib.length];
    const hero = r.media[0];
    const n = Math.max(r.slots || 0, r.media.length);
    const shots = [];
    for (let i = 0; i < n; i++) {
      const m = r.media[i];
      shots.push(m
        ? `<button class="shot" type="button" data-i="${i}" aria-label="Enlarge: ${esc(m.cap || "photo")}"><img src="${esc(thumb(m))}" alt="" loading="lazy" decoding="async"><span class="shot__cap">${esc(m.cap || "")}</span></button>`
        : `<div class="shot is-empty"><span>Add photo<br>${esc(slotPath(r, i))}</span></div>`);
    }
    const meta = [["Role", r.role], ["Years", r.years], ["Where", r.place]].filter(([, v]) => v);
    return `
      <div class="dt-top">
        <button class="dt-back" type="button" data-close>← Back</button>
        <a class="dt-next-top" href="#view/${next.id}">Next →</a>
      </div>
      <header class="dt-head">
        <p class="dt-kicker">${t(r.kicker)}</p>
        <h2 class="dt-title" id="detail-title">${t(r.title)}</h2>
        <p class="dt-meta">${meta.map(([k, v]) => `<span>${k}<b>${t(v)}</b></span>`).join("")}</p>
      </header>
      <figure class="dt-hero"><div class="media">${hero ? mediaEl(hero, true) : `<span>Lead photo · ${esc(slotPath(r, 0))}</span>`}</div></figure>
      <section class="dt-body">
        ${r.summary ? `<p class="dt-summary">${t(r.summary)}</p>` : ""}
        <div class="dt-text">${(r.body || []).map((p) => `<p>${t(p)}</p>`).join("")}</div>
        ${pointList(r.points, "dt-points")}
        ${r.yt ? ytCard(r.yt, `Watch the ${clean(r.title)} demo`, "dt-yt", r.media[0] && thumb(r.media[0])) : ""}
        ${r.link ? `<a class="dt-link lnk" href="${esc(r.link.href)}" target="_blank" rel="noopener">${esc(r.link.label)} ↗</a>` : ""}
        <dl class="dt-facts">${[...(r.features ? [["Features", r.features]] : []), ...(r.builtWith ? [["Techniques", r.builtWith]] : []), ...(r.details || [])].map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${Array.isArray(v) ? v.map(t).join("<br>") : t(v)}</dd></div>`).join("")}</dl>
      </section>
      ${r.explainer ? explainerHTML(r.explainer) : ""}
      <header class="dt-gal-head"><h3>Photos</h3><p>${r.media.length} photos &amp; videos</p></header>
      <div class="dt-gal">${shots.join("")}</div>
      <a class="dt-next" href="#view/${next.id}"><span>Next</span><strong>${t(next.title)}</strong></a>`;
  }

  function openPage(id) {
    const r = pages().find((x) => x.id === id);
    if (!r) return;
    const swapping = !page.hidden;
    current = r;
    if (!swapping) returnFocus = document.activeElement;
    pageInner.innerHTML = detailHTML(r);
    page.hidden = false;
    pageScroll.scrollTop = 0;
    document.documentElement.style.overflow = "hidden";
    lenis && lenis.stop();
    $(".dt-gal", pageInner).addEventListener("click", (e) => {
      const b = e.target.closest(".shot[data-i]");
      if (b) openLightbox(current.media, +b.dataset.i, b);
    });
    if (hasGsap && !reduce) {
      if (!swapping) gsap.fromTo(page, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power4.inOut" });
      else page.style.clipPath = "inset(0% 0% 0% 0%)";
      gsap.from($$(".dt-kicker, .dt-title, .dt-meta", pageInner), { y: 24, opacity: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", delay: swapping ? 0 : 0.5 });
      gsap.fromTo($(".dt-hero .media", pageInner), { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.inOut", delay: swapping ? 0.1 : 0.6 });
    } else page.style.clipPath = "none";
    $(".dt-back", pageInner).focus({ preventScroll: true, focusVisible: false });
  }

  function closePage() {
    if (page.hidden) return;
    const done = () => {
      page.hidden = true;
      pageInner.innerHTML = "";
      current = null;
      document.documentElement.style.overflow = "";
      lenis && lenis.start();
      if (returnFocus && document.contains(returnFocus)) returnFocus.focus({ preventScroll: true });
    };
    if (hasGsap && !reduce) gsap.to(page, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.7, ease: "power4.inOut", onComplete: done });
    else done();
  }

  const clearHash = () => history.pushState(null, "", location.pathname + location.search);
  const route = () => {
    const m = location.hash.match(/^#view\/([\w-]+)/);
    m ? openPage(m[1]) : closePage();
  };
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#view/"]');
    if (a && location.hash === a.getAttribute("href")) { e.preventDefault(); route(); return; }
    if (e.target.closest("[data-close]")) { clearHash(); closePage(); }
  });
  window.addEventListener("hashchange", route);

  /* ------------------------------------------------------------------ */
  /* Lightbox                                                            */
  /* ------------------------------------------------------------------ */
  const lb = $(".lb");
  let lbList = [], lbIndex = 0, lbReturn = null;
  function showLb() {
    const m = lbList[lbIndex];
    lb.classList.toggle("is-single", lbList.length < 2);
    $(".lb__media", lb).innerHTML = m.type === "youtube"
      ? `<div class="lb__yt${m.vertical ? " lb__yt--v" : ""}"><iframe src="https://www.youtube-nocookie.com/embed/${esc(m.id)}?autoplay=1&rel=0&modestbranding=1" title="${esc(m.cap || "Video")}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`
      : m.type === "video"
      ? `<video src="${esc(m.src)}" poster="${esc(m.poster || "")}" autoplay muted loop playsinline controls></video>`
      : `<img src="${esc(m.src)}" alt="${esc(m.cap || "")}">`;
    $(".lb__cap", lb).textContent = m.cap || "";
    if (hasGsap && !reduce) gsap.fromTo($(".lb__media", lb), { opacity: 0 }, { opacity: 1, duration: 0.4 });
  }
  function openLightbox(list, i, from) {
    if (!list[i]) return;
    lbList = list; lbIndex = i; lbReturn = from;
    lb.hidden = false;
    lenis && lenis.stop();
    showLb();
    $(".lb__close", lb).focus();
  }
  function closeLb() {
    lb.hidden = true;
    $(".lb__media", lb).innerHTML = "";
    if (page.hidden) lenis && lenis.start();
    lbReturn && lbReturn.focus();
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-yt]");
    if (b) openLightbox([{ type: "youtube", id: b.dataset.yt, cap: b.dataset.cap }], 0, b);
  });
  const step = (d) => { lbIndex = (lbIndex + d + lbList.length) % lbList.length; showLb(); };
  $(".lb__close").addEventListener("click", closeLb);
  $(".lb__nav--prev").addEventListener("click", () => step(-1));
  $(".lb__nav--next").addEventListener("click", () => step(1));
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lb__fig")) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.hidden) {
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      return;
    }
    if (!page.hidden && e.key === "Escape") { clearHash(); closePage(); }
  });

  /* ------------------------------------------------------------------ */
  /* Scrolling + gentle reveals                                          */
  /* ------------------------------------------------------------------ */
  function motion() {
    $$("[data-scroll]").forEach((a) =>
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        const target = id === "#top" ? 0 : $(id);
        if (target == null) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(target, { duration: 1.4, offset: id === "#top" ? 0 : -60 });
        else target === 0 ? scrollTo({ top: 0, behavior: "smooth" }) : target.scrollIntoView({ behavior: "smooth" });
      })
    );
    if (!hasGsap) return;
    gsap.registerPlugin(ScrollTrigger);
    if (!reduce && window.Lenis) {
      lenis = new Lenis({ lerp: 0.11 });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    ["about", "work", "tennis", "gallery", "timeline", "projects", "contact"].forEach((id) =>
      ScrollTrigger.create({ trigger: "#" + id, start: "top 40%", end: "bottom 40%", onToggle: (st) => $(`.nav__links a[href="#${id}"]`).classList.toggle("is-active", st.isActive) })
    );
    if (reduce) return;

    // page load
    gsap.from(".mast__name", { opacity: 0, letterSpacing: "0.6em", duration: 1.6, ease: "power3.out" });
    gsap.from(".nav", { opacity: 0, duration: 1, delay: 0.3 });
    gsap.fromTo(".intro__photo .media", { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power4.inOut", delay: 0.2 });

    // everything else fades up as it arrives
    const fade = (sel) => $$(sel).forEach((el) => gsap.from(el, { y: 36, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }));
    fade(".intro__text, .intro__links, .about__portrait, .about__body > *, .with__list, .head, .card, .journey__lead, .tl-item, .prow, .words, .contact > *");

  }

  /* ------------------------------------------------------------------ */
  renderTop();
  renderWork();
  renderJourney();
  renderGallery();
  renderTimeline();
  renderProjects();
  motion();
  hoverPreview();
  window.addEventListener("load", () => window.ScrollTrigger && ScrollTrigger.refresh());
  if (location.hash.startsWith("#view/")) route();
})();
