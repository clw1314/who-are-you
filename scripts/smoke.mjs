#!/usr/bin/env node
// Smoke test in a real browser: serves public/ (with a stand-in for /api/me and Cloudflare's trace), opens every
// language page in headless Chrome and checks that the page script ran through: no script errors, every sniffer row
// filled, every blank of the portrait filled with no placeholder or "undefined" left, every check judged. Then it
// shares the English portrait and opens the link: the shared view must show the portrait with the city masked.
// The exit and DNS probes go to the real services, so a row may read "couldn't read" offline; it must not stay "…".
// Usage: node scripts/smoke.mjs            (finds Chrome or Edge; CHROME_PATH=… to pick one)
import { createServer } from "node:http";
import { readFile, access } from "node:fs/promises";
import { extname } from "node:path";
import puppeteer from "puppeteer-core";
import { LANGS } from "./build.mjs";
import { SNIFFERS, BLANKS, CHECKS } from "../src/sniffers.mjs";

const pub = new URL("../public/", import.meta.url);
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".ico": "image/x-icon" };
const ME = { ip: "203.0.113.7", v: 4, ptr: null, h: { "user-agent": "smoke", "accept-language": "en-US" },
  cf: { country: "JP", city: "Tokyo", region: "Tokyo", latitude: "35.69", longitude: "139.69", timezone: "Asia/Tokyo", asn: 2516, asOrganization: "KDDI Corporation",
    colo: "NRT", httpProtocol: "HTTP/2", tlsVersion: "TLSv1.3", tlsCipher: "AEAD-AES128-GCM-SHA256", clientTcpRtt: 12 } };

const server = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (path === "/api/me") { res.writeHead(200, { "content-type": "application/json" }); return res.end(JSON.stringify({ ...ME, at: Date.now() })); }
  if (path === "/cdn-cgi/trace") { res.writeHead(200, { "content-type": "text/plain" }); return res.end("ip=203.0.113.7\nkex=X25519MLKEM768\nsni=plaintext\nwarp=off\ngateway=off\n"); }
  try {
    const body = await readFile(new URL("." + (path.endsWith("/") ? path + "index.html" : path), pub));
    res.writeHead(200, { "content-type": TYPES[extname(path)] || (path.endsWith("/") ? TYPES[".html"] : "application/octet-stream") }); res.end(body);
  } catch (e) { res.writeHead(404); res.end(); }
});
await new Promise(r => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const CANDIDATES = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome", "/usr/bin/chromium-browser", "/usr/bin/chromium", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].filter(Boolean);
let exe = null;
for (const c of CANDIDATES) { try { await access(c); exe = c; break; } catch (e) {} }
if (!exe) { console.error("No Chrome or Edge found; set CHROME_PATH."); process.exit(1); }
const browser = await puppeteer.launch({ executablePath: exe, headless: true, args: ["--no-sandbox", "--use-fake-ui-for-media-stream"] });

const failures = [];
const fail = (where, what) => { failures.push(where + ": " + what); console.log("  ✖ " + what); };
async function open(url) {
  const page = await browser.newPage(), errors = [];
  page.on("pageerror", e => errors.push(String(e.message || e)));
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(url, { waitUntil: "load" });
  return { page, errors };
}

for (const [lang, slug] of LANGS) {
  console.log(lang);
  const { page, errors } = await open(`${base}/${slug ? slug + "/" : ""}`);
  // done when the rerun button is enabled again (the run, WebRTC included, is over)
  await page.waitForFunction(() => !document.querySelector("#rerun").disabled, { timeout: 30000 }).catch(() => fail(lang, "the run never finished"));
  const r = await page.evaluate(() => ({
    rows: [...document.querySelectorAll(".pr[data-s]")].map(x => [x.dataset.s, x.querySelector(".pa").textContent]),
    waiting: document.querySelectorAll(".bl.wait").length, blanks: document.querySelectorAll(".bl[data-b]").length,
    story: document.querySelector("#story").textContent, checks: [...document.querySelectorAll(".ckr")].map(x => [x.dataset.c, x.className]),
    num: document.querySelector("#mNum").textContent, fp: document.querySelector("#fpId").textContent, ret: document.querySelector("#fpRet").textContent,
  }));
  for (const e of errors) fail(lang, "script error: " + e);
  if (r.rows.length !== SNIFFERS.length) fail(lang, `${r.rows.length} rows, expected ${SNIFFERS.length}`);
  for (const [id, v] of r.rows) if (!v.trim() || v === "…") fail(lang, `row ${id} not filled ("${v}")`);
  if (r.blanks !== Object.keys(BLANKS).length) fail(lang, `${r.blanks} blanks, expected ${Object.keys(BLANKS).length}`);
  if (r.waiting) fail(lang, `${r.waiting} blanks still waiting`);
  if (/\{\w+\}|undefined|null|NaN/.test(r.story)) fail(lang, "portrait has a leftover: " + r.story.match(/.{0,20}(\{\w+\}|undefined|null|NaN).{0,20}/)[0]);
  for (const [id, cls] of r.checks) if (!/st-/.test(cls)) fail(lang, `check ${id} not judged`);
  if (r.checks.length !== CHECKS.length) fail(lang, `${r.checks.length} checks, expected ${CHECKS.length}`);
  if (!/^\d+$/.test(r.num)) fail(lang, `count "${r.num}"`);
  if (!r.fp.trim() || !r.ret.trim()) fail(lang, "ID card not filled");

  if (lang === "en") {
    // share, then open the link as someone else would
    await page.click("#share");
    await page.waitForFunction(() => /#p=/.test(document.querySelector("#shareUrl").value), { timeout: 5000 }).catch(() => fail("share", "no link"));
    const link = await page.$eval("#shareUrl", x => x.value);
    if (/203\.0\.113\.7|Tokyo/.test(decodeURIComponent(link)) || /203\.0\.113\.7|Tokyo/.test(Buffer.from(link.split("#p=")[1].replace(/-/g, "+").replace(/_/g, "/"), "base64").toString()))
      fail("share", "the link carries the address or the city");
    const s = await open(link);
    await s.page.waitForSelector("html.shared", { timeout: 5000 }).catch(() => fail("share", "shared view not shown"));
    const v = await s.page.evaluate(() => ({ waiting: document.querySelectorAll(".bl.wait").length, city: document.querySelector('.bl[data-b="city"]').textContent,
      story: document.querySelector("#story").textContent, mine: !document.querySelector("#mine").hidden }));
    for (const e of s.errors) fail("share", "script error: " + e);
    if (v.waiting) fail("share", `${v.waiting} blanks still waiting`);
    if (v.city !== "•••") fail("share", `city shows "${v.city}"`);
    if (/\{\w+\}|undefined|null|NaN/.test(v.story)) fail("share", "portrait has a leftover");
    if (!v.mine) fail("share", "no \"check mine\" button");
    await s.page.close();
  }
  await page.close();
}
await browser.close();
server.close();
console.log(failures.length ? `\n${failures.length} failures` : "\nall ok");
process.exit(failures.length ? 1 : 0);
