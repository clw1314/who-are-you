// who-are-you page. The hero tells the visitor who sites take them for, as a paragraph with blanks, and checks the
// readings against each other the way a site would to spot a disguise. The second card lists every sniffer and what it
// read; each row is in the HTML from the start and is filled the moment its sniffer answers. The paragraph is filled
// once, when every sniffer it needs is in, so its text doesn't reflow piece by piece. Strings: window.L1MS.
import { GROUPS, SNIFFERS, BLANKS, CHECKS } from "./sniffers.mjs";
import { nationality, device, browser, gpuName, gpuOS, kbdLayout, isDataCenter, fontHints, checks, offTxt } from "./infer.mjs";

(function () {
  "use strict";
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const D = JSON.parse($("#data").textContent);
  const L = window.L1MS || {}, LANG = D.lang;
  const t = (k, v) => { let s = L[k] ?? k; if (v) for (const x in v) s = s.split("{" + x + "}").join(v[x]); return s; };
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  const K = { theme: "who:theme", lang: "who:lang", mask: "who:mask" };
  const dn = type => { try { return new Intl.DisplayNames([LANG], { type }); } catch (e) { return null; } };
  const REG = dn("region"), LNG = dn("language");
  const country = cc => { try { return REG ? REG.of(cc) : cc; } catch (e) { return cc; } };
  const language = tag => { try { return LNG ? LNG.of(tag) : tag; } catch (e) { return tag; } };
  const flag = cc => /^[A-Z]{2}$/.test(cc || "") ? `<img class="flag" src="/flags/${cc.toLowerCase()}.svg" alt="" width="20" height="15">&#8288;` : "";   // the word joiner keeps the flag on its name's line
  const list = a => a.join(t("v_join"));
  const within = (p, ms, fb) => Promise.race([p, new Promise(r => setTimeout(() => r(fb), ms))]);
  const sha = async s => {
    try { const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join(""); }
    catch (e) { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return (h >>> 0).toString(16).padStart(8, "0"); }
  };
  const mq = q => matchMedia(q).matches;

  /* ---------- theme and language (synced across the 1ms.dog tools) ---------- */
  const thBtn = $("#theme"), TH = ["system", "light", "dark"];
  const applyTheme = th => {
    if (th === "light" || th === "dark") document.documentElement.setAttribute("data-theme", th); else document.documentElement.removeAttribute("data-theme");
    thBtn.dataset.th = th; thBtn.title = t("th_" + th); thBtn.setAttribute("aria-label", t("th_" + th));
  };
  applyTheme(TH.includes(store.get(K.theme)) ? store.get(K.theme) : "system");
  thBtn.onclick = () => { const n = TH[(TH.indexOf(thBtn.dataset.th) + 1) % 3]; store.set(K.theme, n); applyTheme(n); };
  $("#lang").onchange = e => { const l = e.target.value; store.set(K.lang, l); location.href = D.paths[l] + location.search; };

  /* ---------- dialogs ---------- */
  function openDlg(id) { $("#" + id).hidden = false; document.documentElement.style.overflow = "hidden"; $("#" + id + " [data-close]").focus(); }
  function closeDlg() { $$(".scrim").forEach(s => { s.hidden = true; }); document.documentElement.style.overflow = ""; }
  $$("[data-close]").forEach(b => { b.onclick = closeDlg; });
  $$(".scrim").forEach(s => s.addEventListener("click", e => { if (e.target === s) closeDlg(); }));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeDlg(); });
  // help: one answer at a time; a picker with previous / next on phones
  let helpIdx = 0;
  const helpN = $$("#helpNav [data-hq]").length;
  $("#helpSel").innerHTML = $$("#helpNav [data-hq]").map((b, i) => `<option value="${i}">${i + 1} / ${helpN} · ${esc(b.textContent)}</option>`).join("");
  function showHelp(i) {
    helpIdx = Math.max(0, Math.min(helpN - 1, i));
    $$("#helpNav [data-hq]").forEach(b => b.setAttribute("aria-selected", +b.dataset.hq === helpIdx));
    $$("#helpC [data-hqb]").forEach(a => { a.hidden = +a.dataset.hqb !== helpIdx; });
    $("#helpSel").value = helpIdx;
    $$("[data-hstep]").forEach(b => { b.disabled = helpIdx + +b.dataset.hstep < 0 || helpIdx + +b.dataset.hstep >= helpN; });
    $("#helpC").scrollTop = 0;
  }
  $("#helpBtn").onclick = () => { showHelp(helpIdx); openDlg("help"); };
  $$("#helpNav [data-hq]").forEach(b => { b.onclick = () => showHelp(+b.dataset.hq); });
  $("#helpSel").onchange = e => showHelp(+e.target.value);
  $$("[data-hstep]").forEach(b => { b.onclick = () => showHelp(helpIdx + +b.dataset.hstep); });

  /* ---------- blur the address and location (for screenshots) ---------- */
  const masked = () => store.get(K.mask) === "1";
  const applyMask = () => { $("#main").classList.toggle("masked", masked()); $("#eyeT").textContent = t(masked() ? "show" : "hide"); $("#eye").setAttribute("aria-pressed", masked()); };
  $("#eye").onclick = () => { store.set(K.mask, masked() ? "0" : "1"); applyMask(); };
  applyMask();

  // the tooltip: blanks, rows and checks that explain themselves on hover (data-why)
  let tipEl;
  function showTip(el) {
    if (!tipEl) { tipEl = document.body.appendChild(Object.assign(document.createElement("div"), { className: "tip" })); addEventListener("scroll", () => tipEl.classList.remove("on"), { passive: true }); }
    tipEl.textContent = el.dataset.why;
    const b = el.getBoundingClientRect(), w = tipEl.offsetWidth;
    tipEl.style.left = Math.max(8, Math.min(innerWidth - w - 8, b.left + b.width / 2 - w / 2)) + "px";
    tipEl.style.top = b.bottom + 6 + "px"; tipEl.classList.add("on");
  }
  document.addEventListener("mouseover", e => { const el = e.target.closest && e.target.closest("[data-why]"); if (el) showTip(el); else if (tipEl) tipEl.classList.remove("on"); });
  document.addEventListener("focusin", e => { const el = e.target.closest && e.target.closest("[data-why]"); if (el) showTip(el); });
  // a blank points at the rows it came from: hovering it lights them up
  document.addEventListener("mouseover", e => {
    const b = e.target.closest && e.target.closest(".bl[data-b]");
    $$(".pr.lit").forEach(r => r.classList.remove("lit"));
    if (b) for (const id of (b.dataset.from || "").split(" ")) { const r = PR[id]; if (r) r.classList.add("lit"); }
  });

  /* ---------- rows: each keeps its size from the first paint; only the text changes ---------- */
  const PR = Object.fromEntries($$(".pr[data-s]").map(r => [r.dataset.s, r]));
  const N = SNIFFERS.length;
  let gen = 0, done = new Set();
  // fill a row: html is trusted markup built here, everything read from the browser or the server goes through esc()
  function row(id, html, opt = {}) {
    const r = PR[id]; if (!r || done.has(id)) return;
    done.add(id);
    r.classList.remove("wait"); r.classList.toggle("na", !!opt.na);
    const a = r.querySelector(".pa"); a.innerHTML = html;
    const why = opt.why || (a.scrollWidth > a.clientWidth + 1 ? a.textContent : "");
    if (why) { r.dataset.why = why; r.tabIndex = 0; } else { delete r.dataset.why; r.removeAttribute("tabindex"); }
    progress();
  }
  const txt = (id, s, opt) => row(id, esc(s), opt);
  const na = (id, key = "v_unsup") => row(id, esc(t(key)), { na: true });
  function progress() {
    const n = done.size;
    $("#prog i").style.transform = `scaleX(${n / N})`;
    $("#prog").classList.toggle("end", n >= N);
    $("#progTxt").textContent = n >= N ? t("done_n", { n: N }) : t("progress", { n, of: N });
  }
  // run a sniffer; one that throws marks its rows as unreadable
  const guard = async (ids, f) => { try { await f(); } catch (e) { for (const id of [].concat(ids)) na(id, "v_fail"); } };

  /* ---------- the sniffers ---------- */
  let R;   // this run's readings

  // what the server saw: the address, Cloudflare's data for it, TLS, the headers, the clock
  async function server() {
    const ids = ["ip", "geo", "coords", "isp", "tzip", "ptr", "edge", "proto", "tlsfp", "clock", "h_ua", "h_lang", "h_chua", "h_plat", "h_enc", "h_dnt"];
    let j, t0, t1;
    try {
      t0 = Date.now();
      const r = await fetch("/api/me", { cache: "no-store", signal: AbortSignal.timeout(8000) });
      j = await r.json(); t1 = Date.now();
    } catch (e) { for (const id of ids) na(id, "v_fail"); R.srv = {}; return; }
    const c = j.cf || {}, h = j.h || {};
    R.srv = j;
    txt("ip", j.ip + " · IPv" + j.v);
    row("geo", c.country ? flag(c.country) + esc([c.city, c.region, country(c.country)].filter(Boolean).join(", ")) : esc(t("v_empty")), { na: !c.country });
    if (c.latitude != null) txt("coords", [(+c.latitude).toFixed(2) + ", " + (+c.longitude).toFixed(2), c.postalCode].filter(Boolean).join(" · ")); else na("coords", "v_empty");
    if (c.asn) txt("isp", "AS" + c.asn + " · " + (c.asOrganization || "")); else na("isp", "v_empty");
    if (c.timezone) txt("tzip", c.timezone + " · UTC" + offTxt(tzOffset(c.timezone))); else na("tzip", "v_empty");
    if (j.ptr) txt("ptr", j.ptr); else na("ptr", "v_empty");
    if (c.colo) txt("edge", c.colo + (c.clientTcpRtt ? " · RTT " + c.clientTcpRtt + " ms" : "")); else na("edge", "v_empty");
    txt("proto", [c.httpProtocol, c.tlsVersion, c.tlsCipher].filter(Boolean).join(" · ") || "–");
    if (c.tlsClientExtensionsSha1) txt("tlsfp", (await sha(c.tlsClientExtensionsSha1)).slice(0, 12) + (c.tlsClientHelloLength ? " · " + c.tlsClientHelloLength + " B" : "")); else na("tlsfp", "v_empty");
    // the server's clock at the request, against the middle of the round trip on this one
    const skew = (t0 + t1) / 2 - j.at, sec = Math.abs(skew) / 1000;
    txt("clock", sec < 1 ? t("clk_ok", { ms: Math.round(Math.abs(skew)) }) : t(skew > 0 ? "clk_fast" : "clk_slow", { s: sec < 10 ? sec.toFixed(1) : Math.round(sec) }));
    const hv = (id, v) => v ? txt(id, v) : na(id, "v_none");
    hv("h_ua", h["user-agent"]); hv("h_lang", h["accept-language"]); hv("h_chua", h["sec-ch-ua"]);
    hv("h_plat", [h["sec-ch-ua-platform"], h["sec-ch-ua-mobile"] === "?1" ? "mobile" : ""].filter(Boolean).join(" · "));
    hv("h_enc", h["accept-encoding"]);
    hv("h_dnt", [h.dnt != null ? "DNT: " + h.dnt : "", h["sec-gpc"] != null ? "Sec-GPC: " + h["sec-gpc"] : ""].filter(Boolean).join(" · "));
  }

  // a time zone's UTC offset now, in minutes
  function tzOffset(tz) {
    try {
      const p = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "longOffset" }).formatToParts(new Date()).find(x => x.type === "timeZoneName").value;
      const m = p.match(/GMT([+-−])(\d{2}):?(\d{2})?/);
      return m ? (m[1] === "+" ? 1 : -1) * (+m[2] * 60 + +(m[3] || 0)) : 0;
    } catch (e) { return null; }
  }

  function referrer() {
    txt("h_ref", document.referrer || t("v_none"), { na: !document.referrer });
    txt("history", t("hist_v", { n: history.length }));
  }

  // language, region and formats
  function locale() {
    const langs = navigator.languages && navigator.languages.length ? [...navigator.languages] : [navigator.language].filter(Boolean);
    R.langs = langs;
    txt("langs", langs.join(", ") || "–");
    const ro = Intl.DateTimeFormat().resolvedOptions();
    R.tz = ro.timeZone; R.tzOff = tzOffset(ro.timeZone);
    txt("locale", [ro.locale, ro.calendar, ro.numberingSystem].filter(Boolean).join(" · "));
    let tzName = "";
    try { tzName = new Intl.DateTimeFormat(LANG, { timeZone: R.tz, timeZoneName: "longGeneric" }).formatToParts(new Date()).find(x => x.type === "timeZoneName").value; } catch (e) {}
    R.tzName = tzName || R.tz;
    txt("tz", R.tz + " · UTC" + offTxt(R.tzOff), { why: tzName });
    const hc = new Intl.DateTimeFormat(undefined, { hour: "numeric" }).resolvedOptions().hourCycle;
    R.h12 = hc === "h11" || hc === "h12";
    txt("hour", t(R.h12 ? "ck_12" : "ck_24") + " · " + new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date()));
    try {
      const loc = new Intl.Locale(langs[0] || ro.locale), wi = loc.getWeekInfo ? loc.getWeekInfo() : loc.weekInfo;
      if (!wi) throw 0;
      // 2024-01-01 was a Monday: day d (1 = Monday … 7 = Sunday) is January d
      txt("week", t("week_v", { d: new Intl.DateTimeFormat(LANG, { weekday: "long" }).format(new Date(2024, 0, wi.firstDay)) }));
    } catch (e) { na("week"); }
    txt("fmt", new Intl.NumberFormat().format(1234567.89) + " · " + new Intl.DateTimeFormat().format(new Date()));
  }

  async function keyboard() {
    if (!navigator.keyboard || !navigator.keyboard.getLayoutMap) return na("kbd");
    const map = await within(navigator.keyboard.getLayoutMap(), 1500, null);
    const k = kbdLayout(map);
    if (k) txt("kbd", k); else na("kbd");
  }

  async function voices() {
    if (!window.speechSynthesis) return na("voices");
    let v = speechSynthesis.getVoices();
    if (!v.length) v = await within(new Promise(r => speechSynthesis.addEventListener("voiceschanged", () => r(speechSynthesis.getVoices()), { once: true })), 1500, []);
    if (!v.length) return na("voices", "v_none");
    const langs = [...new Set(v.map(x => (x.lang || "").split(/[-_]/)[0]).filter(Boolean))];
    txt("voices", t("voices_v", { n: v.length, list: list(langs.slice(0, 6).map(language)) + (langs.length > 6 ? "…" : "") }), { why: langs.map(language).join(", ") });
  }

  // the system, the browser, the hardware
  async function hardware() {
    const ua = navigator.userAgent, uad = navigator.userAgentData;
    let hi = {};
    if (uad) {
      hi = { platform: uad.platform, mobile: uad.mobile, brands: uad.brands };
      try { Object.assign(hi, await within(uad.getHighEntropyValues(["platformVersion", "architecture", "bitness", "model", "fullVersionList"]), 1500, {})); } catch (e) {}
    }
    R.hi = hi;
    const dv = device(ua, hi, navigator.maxTouchPoints || 0);
    R.dev = dv;
    R.osTxt = [dv.os, dv.osv].filter(Boolean).join(" ");
    txt("os", R.osTxt || navigator.platform || "–");
    const b = browser(ua, hi.fullVersionList || hi.brands || []);
    R.browser = [b.name, b.v].filter(Boolean).join(" ");
    txt("browser", R.browser || "–");
    if (hi.architecture) txt("arch", t("arch_v", { a: hi.architecture, b: hi.bitness || "?" }) + (dv.model ? " · " + dv.model : ""));
    else if (navigator.platform) txt("arch", navigator.platform);
    else na("arch");
    const s = screen, dpr = Math.round((devicePixelRatio || 1) * 100) / 100;
    R.screen = s.width ? s.width + "×" + s.height : t("v_unknown");
    if (!s.width) na("screen"); else txt("screen", t("scr_v", { w: s.width, h: s.height, dpr, d: s.colorDepth }), { why: t("scr_avail", { w: s.availWidth, h: s.availHeight, iw: innerWidth, ih: innerHeight }) });
    if (navigator.hardwareConcurrency) txt("cpu", t("cores", { n: navigator.hardwareConcurrency })); else na("cpu");
    if (navigator.deviceMemory) txt("mem", t("mem_v", { n: navigator.deviceMemory })); else na("mem");
    txt("touch", [t("touch_v", { n: navigator.maxTouchPoints || 0 }), t(mq("(pointer: coarse)") ? "ptr_coarse" : "ptr_fine")].join(" · "));
    const c = navigator.connection;
    if (c && (c.effectiveType || c.type)) txt("conn", [c.type, c.effectiveType, c.rtt != null ? c.rtt + " ms" : "", c.downlink ? c.downlink + " Mbps" : "", c.saveData ? "save-data" : ""].filter(Boolean).join(" · "));
    else na("conn");
  }

  function gpu() {
    const cv = document.createElement("canvas");
    const gl = cv.getContext("webgl") || cv.getContext("experimental-webgl");
    if (!gl) { R.gpuRaw = null; na("gpu"); na("webgl"); return null; }
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const ren = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
    const ven = ext ? gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR);
    R.gpuRaw = ren; R.gpu = gpuName(ren);
    txt("gpu", R.gpu || ren || "–", { why: [ven, ren].filter(Boolean).join(" · ") });
    // everything WebGL reports about the card and driver, for the WebGL fingerprint
    const P = ["MAX_TEXTURE_SIZE", "MAX_RENDERBUFFER_SIZE", "MAX_VIEWPORT_DIMS", "MAX_VERTEX_ATTRIBS", "MAX_VERTEX_UNIFORM_VECTORS", "MAX_FRAGMENT_UNIFORM_VECTORS",
      "MAX_VARYING_VECTORS", "MAX_COMBINED_TEXTURE_IMAGE_UNITS", "ALIASED_LINE_WIDTH_RANGE", "ALIASED_POINT_SIZE_RANGE", "SHADING_LANGUAGE_VERSION", "VERSION"];
    return [ven, ren, ...P.map(p => String(gl.getParameter(gl[p]))), (gl.getSupportedExtensions() || []).join(",")].join("|");
  }

  async function battery() {
    if (!navigator.getBattery) return na("battery");
    const b = await within(navigator.getBattery(), 1500, null);
    if (!b) return na("battery");
    R.battery = b;
    // a desktop reports a full battery that is always charging and never needs to
    if (b.level === 1 && b.charging && b.chargingTime === 0) txt("battery", t("bat_ac"));
    else txt("battery", t("bat_v", { p: Math.round(b.level * 100), s: t(b.charging ? "bat_chg" : "bat_dis") }));
  }

  async function media() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return na("media");
    const l = await within(navigator.mediaDevices.enumerateDevices(), 1500, null);
    if (!l) return na("media");
    const n = k => l.filter(d => d.kind === k).length;
    txt("media", t("med_v", { c: n("videoinput"), m: n("audioinput"), s: n("audiooutput") }));
  }

  async function storage() {
    if (!navigator.storage || !navigator.storage.estimate) return na("storage");
    const e = await within(navigator.storage.estimate(), 1500, null);
    if (!e || !e.quota) return na("storage");
    txt("storage", t("sto_v", { n: e.quota >= 1e9 ? Math.round(e.quota / 1e9) + " GB" : Math.round(e.quota / 1e6) + " MB" }));
  }

  // settings and preferences the browser shares
  function prefs() {
    R.dark = mq("(prefers-color-scheme: dark)");
    txt("scheme", t(R.dark ? "sch_dark" : "sch_light") + (mq("(prefers-contrast: more)") ? " · " + t("sch_contrast") : "") + (mq("(forced-colors: active)") ? " · forced-colors" : ""));
    txt("motion", t(mq("(prefers-reduced-motion: reduce)") ? "mo_reduce" : "mo_no"));
    const g = mq("(color-gamut: rec2020)") ? "Rec.2020" : mq("(color-gamut: p3)") ? "Display P3" : mq("(color-gamut: srgb)") ? "sRGB" : "–";
    txt("gamut", g + " · " + (mq("(dynamic-range: high)") ? "HDR" : "SDR"));
    const dnt = navigator.doNotTrack === "1" || window.doNotTrack === "1";
    txt("dnt", "DNT " + t(dnt ? "v_on" : "v_off") + " · GPC " + t(navigator.globalPrivacyControl ? "v_on" : "v_off"));
    txt("cookies", t(navigator.cookieEnabled ? "v_on" : "v_off"));
    if (navigator.pdfViewerEnabled != null) txt("pdf", t(navigator.pdfViewerEnabled ? "v_yes" : "v_no")); else na("pdf");
    R.webdriver = !!navigator.webdriver;
    txt("webdriver", t(R.webdriver ? "wd_yes" : "wd_no"));
  }

  // an element with the class names ad blockers hide: if it has no height, something hid it
  async function adblock() {
    await new Promise(r => setTimeout(r, 120));
    const el = $("#ad-slot"), cs = el && getComputedStyle(el);
    R.adblock = !el || el.offsetHeight === 0 || cs.display === "none" || cs.visibility === "hidden";
    txt("adblock", t(R.adblock ? "ab_on" : "ab_off"));
  }

  // Fonts: a word set in a font is measured against the generic fallbacks; a different width means the font is there.
  const FONTS = ["Segoe UI", "Calibri", "Cambria", "Consolas", "Microsoft YaHei", "SimSun", "Microsoft JhengHei", "Yu Gothic", "Meiryo", "MS Gothic",
    "Malgun Gothic", "Leelawadee UI", "Nirmala UI", "Helvetica Neue", "PingFang SC", "PingFang TC", "Hiragino Sans", "Apple SD Gothic Neo", "Menlo",
    "Avenir", "Songti SC", "Ubuntu", "DejaVu Sans", "Liberation Sans", "Noto Sans CJK SC", "WenQuanYi Micro Hei", "Cantarell", "Roboto", "Noto Color Emoji",
    "Aptos", "Myriad Pro", "Minion Pro", "Source Han Sans", "Adobe Clean", "JetBrains Mono", "Fira Code", "Cascadia Code", "Source Code Pro", "Hack", "Inconsolata",
    "Comic Sans MS", "Arial", "Times New Roman", "Courier New", "Verdana", "Georgia"];
  function fonts() {
    const c = document.createElement("canvas").getContext("2d");
    if (!c) { R.fonts = []; na("fonts"); return; }
    const W = "mmmmmmmmmlli你是谁あア한1WO@", base = ["monospace", "sans-serif", "serif"];
    const w = f => { c.font = "72px " + f; return c.measureText(W).width; };
    const b = base.map(w);
    R.fonts = FONTS.filter(f => base.some((g, i) => w(`"${f}", ${g}`) !== b[i]));
    txt("fonts", t("fonts_v", { n: R.fonts.length, of: FONTS.length }) + " " + R.fonts.join(", "), { why: R.fonts.join(", ") });
  }

  // fingerprints: the same drawing, sound or setup comes out slightly differently on every system
  function canvasPrint() {
    const cv = document.createElement("canvas"); cv.width = 280; cv.height = 60;
    const c = cv.getContext("2d"); if (!c) return null;
    const g = c.createLinearGradient(0, 0, 280, 0); g.addColorStop(0, "#f60"); g.addColorStop(1, "#06c");
    c.fillStyle = g; c.fillRect(0, 0, 280, 60);
    c.textBaseline = "top"; c.font = "18px Arial"; c.fillStyle = "#069"; c.fillText("Who are you? 你是谁 😃 1ms", 4, 8);
    c.font = "bold 15px serif"; c.fillStyle = "rgba(255,255,255,.7)"; c.fillText("Cwm fjordbank glyphs vext quiz", 6, 32);
    c.beginPath(); c.arc(250, 30, 18, 0, Math.PI * 2); c.strokeStyle = "#fc0"; c.lineWidth = 3; c.stroke();
    return cv.toDataURL();
  }
  async function audioPrint() {
    const AC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    if (!AC) return null;
    const ctx = new AC(1, 5000, 44100), o = ctx.createOscillator(), k = ctx.createDynamicsCompressor();
    o.type = "triangle"; o.frequency.value = 10000;
    k.threshold.value = -50; k.knee.value = 40; k.ratio.value = 12; k.attack.value = 0; k.release.value = 0.25;
    o.connect(k); k.connect(ctx.destination); o.start(0);
    const buf = await within(ctx.startRendering(), 2000, null);
    if (!buf) return null;
    const d = buf.getChannelData(0); let s = 0;
    for (let i = 4500; i < 5000; i++) s += Math.abs(d[i]);
    return s.toString();
  }
  async function prints(glInfo) {
    const short = h => h.slice(0, 8) + "·" + h.slice(8, 16);
    const c1 = canvasPrint(), c2 = canvasPrint();
    const ch = c1 ? await sha(c1) : null;
    if (ch) txt("canvas", short(ch)); else na("canvas");
    const gh = glInfo ? await sha(glInfo) : null;
    if (gh) txt("webgl", short(gh));
    const a = await audioPrint().catch(() => null), ah = a ? await sha(a) : null;
    if (ah) txt("audio", short(ah)); else na("audio");
    const fh = await sha(R.fonts.join(","));
    txt("fontfp", short(fh));
    // a browser that adds noise to protect the visitor draws the same picture differently each time
    R.rand = !!(c1 && c2 && c1 !== c2);
    txt("rand", t(R.rand ? "rand_yes" : "rand_no"));
    // everything that stays put on this device and browser; the address is left out, so it survives a VPN
    const all = [ch, gh, ah, fh, screen.width + "x" + screen.height + "x" + screen.colorDepth, devicePixelRatio, R.tz, (R.langs || []).join(), navigator.hardwareConcurrency,
      navigator.deviceMemory, navigator.platform, navigator.maxTouchPoints].join("|");
    R.fp = short(await sha(all));
    txt("fpid", R.fp);
  }

  // WebRTC: the public addresses STUN servers see, which can be another than the one the page's requests come from
  async function webrtc() {
    if (!window.RTCPeerConnection) { R.rtc = false; return txt("webrtc", t("rtc_off")); }
    const ips = new Set();
    const one = async url => {
      let pc;
      try {
        pc = new RTCPeerConnection({ iceServers: [{ urls: url }] });
        pc.createDataChannel("x");
        const fin = new Promise(res => {
          pc.onicecandidate = e => {
            if (!e.candidate) return res();
            const m = (e.candidate.candidate || "").match(/ ([0-9a-f.:]+) \d+ typ srflx/i);
            if (m) ips.add(m[1]);
          };
          setTimeout(res, 3500);
        });
        await pc.setLocalDescription(await pc.createOffer());
        await fin;
      } catch (e) {} finally { try { pc && pc.close(); } catch (e) {} }
    };
    await Promise.all(["stun:stun.cloudflare.com:3478", "stun:stun.l.google.com:19302"].map(one));
    R.rtc = [...ips];
    txt("webrtc", R.rtc.length ? R.rtc.join(", ") : t("rtc_none"), { na: !R.rtc.length });
  }

  /* ---------- the paragraph ---------- */
  const BL = Object.fromEntries($$("#story .bl[data-b]").map(b => [b.dataset.b, b]));
  const rowName = id => t("s_" + id);
  function blank(k, html, from = BLANKS[k], why) {
    const b = BL[k]; if (!b) return;
    b.innerHTML = html; b.classList.remove("wait");
    b.dataset.from = from.join(" ");
    b.dataset.why = why || (from.length ? t("from", { list: list(from.map(rowName)) }) : "");
    b.tabIndex = 0;
  }
  function story() {
    const c = (R.srv && R.srv.cf) || {};
    const nat = nationality({ langs: R.langs, tz: R.tz, ipcc: c.country });
    blank("nat", nat ? flag(nat.cc) + esc(country(nat.cc)) : esc(t("v_unknown")), nat ? nat.from : BLANKS.nat);
    blank("city", c.country ? flag(c.country) + esc([c.city, country(c.country)].filter(Boolean).join(", ")) : esc(t("v_unknown")));
    blank("lang", esc(list((R.langs || []).filter((l, i, a) => a.findIndex(x => x.split("-")[0] === l.split("-")[0]) === i).slice(0, 2).map(language))) || esc(t("v_unknown")));
    blank("tz", esc(R.tzName || t("v_unknown")));
    blank("clock", esc(t(R.h12 ? "ck_12" : "ck_24")));
    const d = R.dev || {}, os = R.osTxt;
    blank("device", esc(!os ? t("dv_unknown") : (d.kind === "phone" || d.kind === "tablet") && d.model ? t("dv_model", { model: d.model, os }) : t("dv_" + d.kind, { os })));
    blank("browser", esc(R.browser || t("v_unknown")));
    blank("screen", esc(R.screen));
    blank("gpu", esc(R.gpu || t("gpu_unknown")));
    blank("isp", esc(c.asOrganization || (c.asn ? "AS" + c.asn : t("v_unknown"))));
    blank("nettype", esc(t(c.asn == null ? "v_unknown" : isDataCenter(c.asn, c.asOrganization) ? "nt_dc" : "nt_home")));
    blank("age", esc(t("age_v")), [], t("age_why"));
    blank("theme", esc(t(R.dark ? "pt_dark" : "pt_light")));
    blank("adblock", esc(t(R.adblock ? "pt_ab" : "pt_noab")));
    const jobs = fontHints(R.fonts || [], d.os);
    blank("job", esc(jobs.length ? list(jobs.map(([k]) => t("jb_" + k))) : t("jb_none")), BLANKS.job, jobs.length ? t("from", { list: jobs.map(([, f]) => f).join(", ") }) : "");
    blank("fp", esc(R.rand ? t("fp_rand") : R.fp), BLANKS.fp, t(R.rand ? "fp_rand_why" : "fp_why"));
    $("#story").classList.remove("wait"); $("#storySk").hidden = true;
  }

  /* ---------- the disguise checks ---------- */
  const CK = Object.fromEntries($$(".ckr[data-c]").map(r => [r.dataset.c, r]));
  function judge(final) {
    const c = (R.srv && R.srv.cf) || {};
    const res = checks({
      tz: R.tz, tzOff: R.tzOff == null ? null : offTxt(R.tzOff), ipTzOff: c.timezone ? offTxt(tzOffset(c.timezone)) : null, ipcc: c.country,
      langs: R.langs, rtc: R.rtc, ip: R.srv && R.srv.ip, asn: c.asn, org: c.asOrganization,
      uaOS: R.dev && R.dev.os, real: !!R.dev, hintOS: R.hi && R.hi.platform, gpuOS: gpuOS(R.gpuRaw), rand: R.rand, webdriver: R.webdriver,
    });
    if (res.dc === null && R.srv && !c.asn) res.dc = ["info", "c_na", {}];
    let bad = 0, warn = 0;
    for (const id of CHECKS) {
      const r = CK[id], v = res[id];
      if (!v) continue;
      const [lv, key, vars] = v;
      if (lv === "bad") bad++; if (lv === "warn") warn++;
      r.className = "ckr st-" + lv;
      const vv = Object.fromEntries(Object.entries(vars).map(([k, x]) => [k, k === "cc" ? country(x) : x]));
      if (id === "tz" || id === "lang") vv.ipc = country(c.country);
      const cv = r.querySelector(".ck-v"); cv.textContent = t(key, vv); r.dataset.why = cv.textContent;
      r.querySelector(".st").textContent = lv === "ok" ? "✓" : lv === "info" ? "i" : "!";
    }
    if (!final) return;
    const n = bad + warn;
    $("#vHead").textContent = n ? t("v_found", { n }) : t("v_clean");
    $("#vText").textContent = t(n ? "v_found_d" : "v_clean_d");
    $("#vHead").className = "v-h" + (bad ? " bad" : warn ? " warn" : " ok");
  }

  /* ---------- a run ---------- */
  async function run() {
    const g = ++gen;
    R = {}; done = new Set();
    for (const r of Object.values(PR)) { r.classList.add("wait"); r.classList.remove("na"); r.querySelector(".pa").textContent = "…"; delete r.dataset.why; }
    // the paragraph stays invisible (its skeleton on top) until every blank is in, so its text never reflows on screen
    $("#story").classList.add("wait"); $("#storySk").hidden = false;
    for (const b of Object.values(BL)) { b.classList.add("wait"); b.innerHTML = '<i class="skl"></i>'; delete b.dataset.why; b.removeAttribute("tabindex"); }
    for (const r of Object.values(CK)) { r.className = "ckr"; delete r.dataset.why; r.querySelector(".ck-v").innerHTML = '<i class="skl"></i>'; r.querySelector(".st").textContent = ""; }
    $("#vHead").textContent = t("checking"); $("#vHead").className = "v-h"; $("#vText").innerHTML = "&nbsp;";
    $("#rerun").disabled = true; progress();

    referrer(); locale(); prefs();
    const glInfo = gpu();
    fonts();
    const rtc = webrtc().then(() => g === gen && judge(false));
    await Promise.all([
      server(), guard("kbd", keyboard), guard("voices", voices), guard(["os", "browser", "arch", "screen", "cpu", "mem", "touch", "conn"], hardware),
      guard("battery", battery), guard("media", media), guard("storage", storage), guard("adblock", adblock),
      guard(["canvas", "audio", "fontfp", "rand", "fpid"], () => prints(glInfo)),
    ]);
    if (g !== gen) return;
    story(); judge(false);
    await rtc;
    if (g !== gen) return;
    for (const id of Object.keys(PR)) if (!done.has(id)) na(id);   // anything a sniffer couldn't reach
    judge(true);
    $("#rerun").disabled = false;
  }
  $("#rerun").onclick = run;
  run();
})();
