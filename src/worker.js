// who-are-you Worker. Pages and assets are static files (public/, served without running this script); this script
// answers
//   GET /api/me   what the server learns from the request alone: the address, Cloudflare's geolocation and network
//                 data for it, the TLS and HTTP details, the headers the browser sent, the address's reverse DNS and
//                 the server's clock.
//   GET /r/<code>  a shared portrait: its language's page with the result in the title and preview (src/share.mjs)
// Nothing is stored or logged. Every other path is a bare 404 (the 1ms.dog shell shows its own page for those).
import { decode, findings, tier, SLUG } from "./share.mjs";
import en from "./i18n/en.mjs";
import zhCN from "./i18n/zh-CN.mjs";
import zhTW from "./i18n/zh-TW.mjs";
import ja from "./i18n/ja.mjs";
import ko from "./i18n/ko.mjs";
import es from "./i18n/es.mjs";
import fr from "./i18n/fr.mjs";
import de from "./i18n/de.mjs";
import pt from "./i18n/pt.mjs";
import ru from "./i18n/ru.mjs";

const json = body => new Response(JSON.stringify(body), {
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
});

// request.cf fields worth showing (all of them are on every Cloudflare plan)
const CF = ["country", "city", "region", "regionCode", "postalCode", "latitude", "longitude", "timezone", "continent", "isEUCountry",
  "asn", "asOrganization", "colo", "httpProtocol", "tlsVersion", "tlsCipher", "clientTcpRtt", "tlsClientHelloLength", "tlsClientExtensionsSha1"];
// headers the browser sent; Cloudflare's own (cf-*, x-forwarded-*, cdn-loop…) and cookies are left out
const SKIP = /^(cf-|x-forwarded-|x-real-ip$|cdn-loop$|cookie$|host$|connection$|true-client-ip$)/;

// the address's PTR record, over DNS over HTTPS; null when there is none or it takes too long
async function ptr(ip) {
  let name;
  if (ip.includes(":")) {
    const parts = ip.split("::"), head = parts[0] ? parts[0].split(":") : [], tail = parts[1] ? parts[1].split(":") : [];
    const groups = parts.length > 1 ? [...head, ...Array(8 - head.length - tail.length).fill("0"), ...tail] : head;
    name = groups.map(g => g.padStart(4, "0")).join("").split("").reverse().join(".") + ".ip6.arpa";
  } else name = ip.split(".").reverse().join(".") + ".in-addr.arpa";
  try {
    const r = await fetch(`https://cloudflare-dns.com/dns-query?name=${name}&type=PTR`, { headers: { Accept: "application/dns-json" }, signal: AbortSignal.timeout(1500) });
    const a = ((await r.json()).Answer || []).find(x => x.type === 12);
    return a ? a.data.replace(/\.$/, "") : null;
  } catch (e) { return null; }
}

// A shared portrait, /r/<code>[?lang=xx]: the language's page with its own title, description and preview image, so a
// link pasted into a chat previews the result. The page script reads the portrait from the path and draws it.
const I18N = { en, "zh-CN": zhCN, "zh-TW": zhTW, ja, ko, es, fr, de, pt, ru };
const fill = (s, v) => { for (const k in v) s = s.split("{" + k + "}").join(v[k]); return s; };
const attr = (name, value) => ({ element(el) { el.setAttribute(name, value); } });
async function result(request, env, code, url) {
  const P = decode(code);
  if (!P) return new Response(null, { status: 404 });
  const q = url.searchParams.get("lang");
  const lang = I18N[q] ? q : I18N[P.l] ? P.l : "en", d = I18N[lang], slug = SLUG[lang];
  const page = await env.ASSETS.fetch(new URL("/" + (slug ? slug + "/" : ""), url));
  if (!page.ok) return page;
  let nat = P.nat || "";
  try { if (nat) nat = new Intl.DisplayNames([lang], { type: "region" }).of(nat); } catch (e) {}
  const n = findings(P);
  const title = n ? fill(d.r_title, { n }) : d.r_title_clean;
  const desc = fill(d.r_desc, { nat: nat || "?", os: P.os || "?", browser: P.browser || "?" });
  const img = `${url.origin}/og/r${tier(n)}-${lang.toLowerCase()}.png`;
  const res = new HTMLRewriter()
    .on("html", { element(el) { el.removeAttribute("data-root"); } })   // no redirect to a saved language: it would drop the portrait
    .on("title", { element(el) { el.setInnerContent(title + " · " + d.app_name); } })
    .on('meta[name="description"]', attr("content", desc))
    .on('meta[name="robots"]', attr("content", "noindex, follow"))
    .on('meta[property="og:title"]', attr("content", title))
    .on('meta[name="twitter:title"]', attr("content", title))
    .on('meta[property="og:description"]', attr("content", desc))
    .on('meta[name="twitter:description"]', attr("content", desc))
    .on('meta[property="og:url"]', attr("content", url.origin + url.pathname))
    .on('meta[property="og:image"]', attr("content", img))
    .on('meta[name="twitter:image"]', attr("content", img))
    .transform(page);
  const h = new Headers(res.headers);
  h.set("Cache-Control", "public, max-age=300");
  h.delete("ETag");
  return new Response(res.body, { status: 200, headers: h });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const r = url.pathname.match(/^\/r\/([A-Za-z0-9_-]{8,8000})\/?$/);
    if (r && request.method === "GET") return result(request, env, r[1], url);
    if (url.pathname !== "/api/me") return new Response(null, { status: 404 });
    if (request.method !== "GET") return new Response(null, { status: 405, headers: { Allow: "GET" } });
    const at = Date.now();
    const ip = request.headers.get("CF-Connecting-IP") || "";
    const cf = {};
    for (const k of CF) if (request.cf && request.cf[k] != null && request.cf[k] !== "") cf[k] = request.cf[k];
    const h = {};
    for (const [k, v] of request.headers) if (!SKIP.test(k)) h[k] = v;
    return json({ ip, v: ip.includes(":") ? 6 : 4, cf, h, ptr: ip ? await ptr(ip) : null, at });
  },
};
