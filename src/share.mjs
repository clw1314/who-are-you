// The shared-portrait link, https://<site>/<language folder>/r/<code> (no folder for English): the code is its format
// version, a dot, and the portrait as JSON in base64url. Version 1 had no prefix and kept the version in the JSON's
// `v`. A newer page still opens older versions; a version it doesn't know yet is refused. Used by the page (to write
// and read links) and by the Worker (to give /r/ pages their own title, description and preview image).
// The portrait carries no address, no fingerprint, and the city and network only when the sharer chose to show them.
export const VERSION = 2;
// language → its folder, as the site lays them out
export const SLUG = { en: "", "zh-CN": "zh-cn", "zh-TW": "zh-tw", ja: "ja", ko: "ko", es: "es", fr: "fr", de: "de", pt: "pt", ru: "ru" };
// a language's link to a shared portrait
export const linkPath = (lang, code) => (SLUG[lang] ? "/" + SLUG[lang] : "") + "/r/" + code;
// the code and the language folder's language in a path, or null
export function parsePath(path) {
  const m = String(path).match(/^(?:\/([a-z-]+))?\/r\/((?:\d+\.)?[A-Za-z0-9_-]{8,8000})\/?$/);
  if (!m) return null;
  const lang = m[1] ? Object.keys(SLUG).find(l => SLUG[l] === m[1]) : null;
  return m[1] && !lang ? null : { code: m[2], lang };
}

export function encode(P) {
  let bin = "";
  for (const b of new TextEncoder().encode(JSON.stringify({ ...P, v: VERSION }))) bin += String.fromCharCode(b);
  return VERSION + "." + btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
export function decode(code) {
  try {
    const m = String(code).match(/^(?:(\d+)\.)?([A-Za-z0-9_-]+)$/), v = m && (m[1] ? +m[1] : 1);
    if (!m || v < 1 || v > VERSION) return null;
    const bin = atob(m[2].replace(/-/g, "+").replace(/_/g, "/"));
    const P = JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0))));
    return P && typeof P === "object" && P.v === v ? P : null;
  } catch (e) { return null; }
}
// how many checks give the sharer away, and the preview image's tier for it: none, a few, many
export const findings = P => Object.values(P.ck || {}).filter(v => v && (v[0] === "bad" || v[0] === "warn")).length;
export const tier = n => n === 0 ? 0 : n <= 3 ? 1 : 2;
