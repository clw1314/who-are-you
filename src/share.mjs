// The shared-portrait link, https://<site>/r/<code>: the code is the portrait as JSON in base64url, with its format
// version in `v`. A newer page still opens older versions; a version it doesn't know yet is refused. Used by the page
// (to write and read links) and by the Worker (to give /r/ pages their own title, description and preview image).
// The portrait carries no address, no fingerprint, and the city and network only when the sharer chose to show them.
export const VERSION = 1;
// language → its folder, as the site lays them out
export const SLUG = { en: "", "zh-CN": "zh-cn", "zh-TW": "zh-tw", ja: "ja", ko: "ko", es: "es", fr: "fr", de: "de", pt: "pt", ru: "ru" };

export function encode(P) {
  let bin = "";
  for (const b of new TextEncoder().encode(JSON.stringify({ ...P, v: VERSION }))) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
export function decode(code) {
  try {
    const bin = atob(String(code).replace(/-/g, "+").replace(/_/g, "/"));
    const P = JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0))));
    return P && typeof P === "object" && P.v >= 1 && P.v <= VERSION ? P : null;
  } catch (e) { return null; }
}
// how many checks give the sharer away, and the preview image's tier for it: none, a few, many
export const findings = P => Object.values(P.ck || {}).filter(v => v && (v[0] === "bad" || v[0] === "warn")).length;
export const tier = n => n === 0 ? 0 : n <= 3 ? 1 : 2;
