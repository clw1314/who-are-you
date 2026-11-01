// who-are-you Worker. Pages and assets are static files (public/, served without running this script); this script
// answers
//   GET /api/me   what the server learns from the request alone: the address, Cloudflare's geolocation and network
//                 data for it, the TLS and HTTP details, the headers the browser sent, the address's reverse DNS and
//                 the server's clock.
// Nothing is stored or logged. Every other path is a bare 404 (the 1ms.dog shell shows its own page for those).

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

export default {
  async fetch(request) {
    const url = new URL(request.url);
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
