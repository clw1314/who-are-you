// What the raw readings say about the visitor: the system and browser behind the user agent, the graphics card behind
// the WebGL string, the keyboard layout, whether the network is a data center's, a guess at nationality, and the
// disguise checks. Pure functions (no DOM), so they run in tests too.
import { TZ_CC } from "./tz.mjs";

// the country a language tag points at: its own region (zh-CN, pt-BR), else the one country most speakers of a
// language without a region live in. English, Spanish, Arabic and the like are spoken too widely to say.
const LANG_CC = { ja: "JP", ko: "KR", de: "DE", fr: "FR", it: "IT", ru: "RU", uk: "UA", pl: "PL", nl: "NL", tr: "TR", vi: "VN",
  th: "TH", id: "ID", ms: "MY", he: "IL", fa: "IR", el: "GR", cs: "CZ", sk: "SK", hu: "HU", ro: "RO", bg: "BG", sv: "SE", da: "DK",
  nb: "NO", no: "NO", fi: "FI", et: "EE", lv: "LV", lt: "LT", sl: "SI", hr: "HR", sr: "RS", ka: "GE", hy: "AM", kk: "KZ", uz: "UZ",
  bn: "BD", hi: "IN", ta: "IN", te: "IN", mr: "IN", ur: "PK", km: "KH", lo: "LA", my: "MM", mn: "MN", ne: "NP", si: "LK", fil: "PH", tl: "PH" };
export function langCC(tag) {
  if (!tag) return null;
  const p = String(tag).split(/[-_]/), base = p[0].toLowerCase();
  const region = p.slice(1).find(x => /^[A-Za-z]{2}$/.test(x));
  if (region) return region.toUpperCase();
  if (base === "zh") return /hant/i.test(tag) ? "TW" : "CN";
  return LANG_CC[base] || null;
}
export const tzCC = tz => TZ_CC[tz] || null;

// nationality: the browser language says most about it, unless it is plain (US) English, which is every device's
// default; then the system time zone (where the device was set up), then the address.
export function nationality({ langs = [], tz, ipcc }) {
  const first = langs[0] || "", lcc = langCC(first), tcc = tzCC(tz);
  const plainEn = /^en(-US)?$/i.test(first);
  if (lcc && !plainEn) return { cc: lcc, from: tcc === lcc ? ["langs", "tz"] : ["langs"] };
  if (tcc) return { cc: tcc, from: ["tz"] };
  if (lcc) return { cc: lcc, from: ["langs"] };
  return ipcc ? { cc: ipcc, from: ["geo"] } : null;
}

// Operating system, browser and kind of device. Client hints (Chromium) are precise; the user agent string is the
// fallback (Safari and Firefox), where macOS is frozen at 10.15 and Windows at 10.
export function device(ua = "", hi = {}, touch = 0) {
  let os = null, osv = "", kind = "pc", model = hi.model || "";
  const plat = hi.platform || "", pv = hi.platformVersion || "";
  if (plat === "Windows" || /Windows NT/.test(ua)) {
    os = "Windows";
    if (pv) osv = parseInt(pv, 10) >= 13 ? "11" : parseInt(pv, 10) > 0 ? "10" : "";
    else { const m = ua.match(/Windows NT ([\d.]+)/); osv = m ? ({ "10.0": "10/11", "6.3": "8.1", "6.2": "8", "6.1": "7" })[m[1]] || m[1] : ""; }
  } else if (/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && touch > 1)) {
    const ipad = /iPad/.test(ua) || /Macintosh/.test(ua);
    os = ipad ? "iPadOS" : "iOS"; kind = ipad ? "tablet" : "phone";
    const m = ua.match(/OS (\d+)[_.](\d+)/) || ua.match(/Version\/(\d+)\.(\d+)/);
    osv = m ? m[1] + "." + m[2] : "";
    model = ipad ? "iPad" : "iPhone";
  } else if (plat === "macOS" || /Macintosh|Mac OS X/.test(ua)) {
    os = "macOS"; kind = "mac";
    if (pv) osv = pv.split(".").slice(0, 2).join(".").replace(/\.0$/, "");
    else { const m = ua.match(/Mac OS X (\d+)[_.](\d+)/); osv = m ? m[1] + "." + m[2] : ""; }
  } else if (plat === "Android" || /Android/.test(ua)) {
    os = "Android"; kind = /Mobile/.test(ua) || hi.mobile ? "phone" : "tablet";
    osv = pv ? pv.split(".")[0] : ((ua.match(/Android (\d+)/) || [])[1] || "");
    if (!model) { const m = ua.match(/Android [\d.]+; ([^;)]+?)(?: Build|\))/); if (m && m[1] !== "K") model = m[1].trim(); }
  } else if (plat === "Chrome OS" || /CrOS/.test(ua)) os = "ChromeOS";
  else if (plat === "Linux" || /Linux/.test(ua)) os = "Linux";
  return { os, osv, kind, model };
}

// the browser and its version: client hints name the real brand (Edge, Opera, Brave report "Chromium" plus their own);
// otherwise read the user agent, most specific first
export function browser(ua = "", brands = []) {
  const real = brands.filter(b => !/Not.?A.?Brand|Chromium/i.test(b.brand));
  const b = real.find(b => !/Google Chrome/.test(b.brand)) || real[0];
  if (b) return { name: b.brand.replace(/^Microsoft /, "").replace(/^Google /, ""), v: String(b.version).split(".")[0] };
  const tests = [["Edge", /Edg(?:e|A|iOS)?\/(\d+)/], ["Opera", /OPR\/(\d+)/], ["Samsung Internet", /SamsungBrowser\/(\d+)/], ["Firefox", /(?:Firefox|FxiOS)\/(\d+)/],
    ["Chrome", /(?:Chrome|CriOS)\/(\d+)/], ["Safari", /Version\/(\d+).*Safari/]];
  for (const [name, re] of tests) { const m = ua.match(re); if (m) return { name, v: m[1] }; }
  return { name: null, v: "" };
}

// "ANGLE (NVIDIA, NVIDIA GeForce RTX 4070 (0x00002786) Direct3D11 vs_5_0 ps_5_0, D3D11)" → "NVIDIA GeForce RTX 4070"
export function gpuName(r) {
  if (!r) return null;
  let s = String(r);
  const m = s.match(/^ANGLE \((?:[^,]*), (.*?)(?:, [^,]*)?\)$/);
  if (m) s = m[1].replace(/^ANGLE Metal Renderer: /, "");
  // the driver's API after the name: "… Direct3D11 vs_5_0 ps_5_0", "… OpenGL 4.6"
  s = s.replace(/\s*\(0x[0-9a-f]+\)/i, "").replace(/\s+(Direct3D\d*|OpenGL|Vulkan|Metal)(\s.*)?$/i, "").replace(/\s*\(TM\)|\(R\)/gi, "").replace(/, or similar$/, "").trim();
  return s || null;
}

// the OS family a WebGL renderer string gives away, when it does
export function gpuOS(r) {
  if (!r) return null;
  if (/Direct3D|D3D1\d/.test(r)) return "Windows";
  if (/Apple (M\d|GPU)|Metal/.test(r)) return "Apple";
  if (/Adreno|Mali|PowerVR|Xclipse/.test(r)) return "Android";
  return null;
}

// keyboard layout from navigator.keyboard.getLayoutMap(): a Map of key codes to the characters they type
export function kbdLayout(map) {
  if (!map || !map.size) return null;
  const k = c => (map.get(c) || "").toLowerCase();
  const q = k("KeyQ"), w = k("KeyW"), y = k("KeyY"), z = k("KeyZ");
  if (/[Ѐ-ӿ]/.test(q)) return "ЙЦУКЕН";
  if (/[֐-׿]/.test(q + w)) return "Hebrew";
  if (/[Ͱ-Ͽ]/.test(w)) return "Greek";
  if (/[؀-ۿ]/.test(q)) return "Arabic";
  if (q === "a" && w === "z") return "AZERTY";
  if (y === "z" && z === "y") return "QWERTZ";
  if (q === "'" || q === ";" || k("KeyE") === ".") return "Dvorak";
  if (k("KeyD") === "s" && k("KeyF") === "t") return "Colemak";
  return q === "q" ? "QWERTY" : null;
}

// Data centers, clouds and VPN hosts: the networks sites can tell apart from home and mobile connections.
const DC_ASN = new Set([13335, 209242, 16509, 14618, 15169, 396982, 19527, 8075, 8068, 14061, 63949, 20473, 16276, 24940, 31898, 45102, 37963,
  132203, 45090, 9009, 60068, 212238, 51167, 136907, 55990, 906, 25820, 35916, 54600, 40065, 36352, 53667, 46562, 8100, 62904, 21859, 199524,
  202422, 12876, 197540, 47583, 141995, 35913, 32613, 26496, 46606, 398101, 30633, 64267, 201814, 22612, 7979, 10439, 400328, 49981, 61317]);
const DC_NAME = /amazon|\baws\b|google cloud|google llc|microsoft|azure|digitalocean|linode|akamai|vultr|choopa|\bovh|hetzner|oracle|alibaba|aliyun|tencent|huawei cloud|contabo|leaseweb|m247|datacamp|cdn77|g-?core|hostinger|hosting|\bhost|server|cloud|data ?cent|colo|\bvps\b|dedicated|ionos|scaleway|kamatera|racknerd|frantech|psychz|quadranet|zenlayer|dmit|cloudflare|fastly|packet|equinix|terrahost|hostwinds|interserver|liquid web|ponynet|clouvider|tzulo|cogent|mullvad|proton|nordvpn|expressvpn|surfshark|private internet/i;
export const isDataCenter = (asn, org) => DC_ASN.has(+asn) || DC_NAME.test(org || "");

// hints about what the visitor does, from the fonts only certain software installs
export const FONT_HINTS = [
  ["dev", ["JetBrains Mono", "Fira Code", "Cascadia Code", "Source Code Pro", "Hack", "Inconsolata"]],
  ["design", ["Myriad Pro", "Minion Pro", "Adobe Garamond Pro", "Source Han Sans", "Adobe Clean"]],
  ["office", ["Aptos", "Calibri", "Cambria"]],
];
// fonts that come with Windows itself (Cascadia Code with Windows Terminal), so there they say nothing; Aptos
// (Microsoft 365 since 2023) still says Office
const WIN_FONTS = ["Calibri", "Cambria", "Cascadia Code"];
export function fontHints(fonts, os) {
  return FONT_HINTS.map(([k, l]) => [k, l.find(f => fonts.includes(f) && !(os === "Windows" && WIN_FONTS.includes(f)))]).filter(([, f]) => f);
}

// Addresses in one network count as one exit: CGNAT pools and temporary IPv6 addresses move around inside a /16 or /64
const v6g = a => {
  const [h, tl = ""] = a.toLowerCase().split("::"), H = h ? h.split(":") : [], T = tl ? tl.split(":") : [];
  return [...H, ...Array(Math.max(0, 8 - H.length - T.length)).fill("0"), ...T].map(g => g.padStart(4, "0"));
};
export const netOf = ip => ip.includes(":") ? v6g(ip).slice(0, 4).join(":") : ip.split(".").slice(0, 2).join(".");
// Split routing: two destinations that saw different networks over the same IP version. IPv4 next to IPv6 is just a
// dual-stack connection. exits: [[row id, address]] in the order the rows are drawn; the first pair that differs.
export function splitOf(exits) {
  const seen = [];
  for (const [id, ip] of exits) {
    if (!ip) continue;
    const other = seen.find(([, x]) => (x.includes(":") === ip.includes(":")) && netOf(x) !== netOf(ip));
    if (other) return { a: other[0], b: id, ipA: other[1], ipB: ip, n: new Set(exits.filter(([, x]) => x).map(([, x]) => netOf(x))).size };
    seen.push([id, ip]);
  }
  return null;
}

// The disguise checks. Each returns [level, key, vars]: "ok" (nothing gives you away), "warn" (a site could notice),
// "bad" (a clear contradiction), "info" (says nothing either way), or null while its inputs are still coming in.
const fam = ip => ip && ip.includes(":") ? 6 : 4;
export function checks(x) {
  const out = {};
  // the system time zone against the address's
  if (x.tz == null || !x.ipcc) out.tz = null;
  else if (x.tzOff !== x.ipTzOff) out.tz = ["bad", "c_tz_bad", { a: x.ipTzOff, b: x.tzOff }];
  else out.tz = ["ok", "c_tz_ok", { a: x.tzOff }];
  // the browser language against the address's country
  const lcc = langCC((x.langs || [])[0]);
  if (!x.ipcc || !x.langs) out.lang = null;
  else if (!lcc || /^en(-US)?$/i.test(x.langs[0])) out.lang = ["info", "c_lang_info", {}];
  else if (lcc === x.ipcc) out.lang = ["ok", "c_lang_ok", {}];
  else out.lang = ["warn", "c_lang_warn", { cc: lcc }];
  // the DNS resolver that looked the page's test name up, against the address's country: a VPN that leaves DNS
  // outside the tunnel shows the visitor's own provider here
  if (x.dnsCC === undefined || !x.ipcc) out.dns = null;
  else if (!x.dnsCC) out.dns = ["info", "c_dns_info", {}];
  else if (x.dnsCC === x.ipcc) out.dns = ["ok", "c_dns_ok", {}];
  else out.dns = ["bad", "c_dns_bad", { cc: x.dnsCC }];
  // split routing: the exits seen by different kinds of destination (x.exits, set once they are all in)
  if (!x.exits) out.split = null;
  else if (x.exits.filter(([, ip]) => ip).length < 2) out.split = ["info", "c_na", {}];
  else { const s = splitOf(x.exits); out.split = s ? ["warn", "c_split_warn", { a: s.a, b: s.b }] : ["ok", "c_split_ok", {}]; }
  // WebRTC: addresses the STUN servers saw that the page's request didn't come from
  if (x.rtc === undefined || !x.ip) out.webrtc = null;
  else if (x.rtc === false) out.webrtc = ["ok", "c_rtc_off", {}];
  else {
    const other = x.rtc.filter(ip => ip !== x.ip), same = other.filter(ip => fam(ip) === fam(x.ip));
    out.webrtc = same.length ? ["bad", "c_rtc_bad", { ip: same[0] }] : other.length ? ["warn", "c_rtc_warn", { ip: other[0] }] : ["ok", x.rtc.length ? "c_rtc_ok" : "c_rtc_none", {}];
  }
  // the network
  out.dc = x.asn == null ? null : isDataCenter(x.asn, x.org) ? ["warn", "c_dc_warn", { org: x.org || "AS" + x.asn }] : ["ok", "c_dc_ok", { org: x.org || "AS" + x.asn }];
  // the system the user agent claims against the one the browser's other parts give away
  if (!x.uaOS) out.ua = x.real ? ["info", "c_ua_info", {}] : null;
  else {
    const claim = x.uaOS === "macOS" || x.uaOS === "iOS" || x.uaOS === "iPadOS" ? "Apple" : x.uaOS;
    const tells = [x.hintOS && (x.hintOS === "macOS" ? "Apple" : x.hintOS), x.gpuOS].filter(Boolean);
    const off = tells.find(t => t !== claim && !(t === "Android" && claim === "Linux"));
    out.ua = off ? ["bad", "c_ua_bad", { a: x.uaOS, b: off }] : ["ok", "c_ua_ok", { a: x.uaOS }];
  }
  out.fp = x.rand == null ? null : x.rand ? ["ok", "c_fp_rand", {}] : ["warn", "c_fp_same", {}];
  out.bot = x.webdriver == null ? null : x.webdriver ? ["bad", "c_bot_bad", {}] : ["ok", "c_bot_ok", {}];
  return out;
}

// "+08:00" from a UTC offset in minutes
export const offTxt = m => (m < 0 ? "−" : "+") + String(Math.floor(Math.abs(m) / 60)).padStart(2, "0") + ":" + String(Math.abs(m) % 60).padStart(2, "0");
