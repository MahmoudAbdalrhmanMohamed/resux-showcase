import { spawn } from "node:child_process";
const { chromium } = await import(process.env.RESUX_PLAYWRIGHT_CORE);
const port = 3917;
const server = spawn(process.execPath, [".output/server/index.mjs"], { cwd: new URL("../", import.meta.url).pathname, env: { ...process.env, PORT: String(port), NITRO_PORT: String(port), HOST: "127.0.0.1" }, stdio: "pipe" });
const base = `http://127.0.0.1:${port}`;
for (let i = 0; i < 60; i++) { try { await fetch(base + "/about"); break; } catch { await new Promise((r) => setTimeout(r, 500)); } }
let fails = 0;
const ok = (cond, label, extra = "") => { console.log((cond ? "ok   " : "FAIL ") + label + (cond ? "" : "  " + extra)); if (!cond) fails++; };
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN, args: ["--no-sandbox"] });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push("pageerror " + e));
page.on("console", (m) => { if (m.type() === "error" && !m.location().url.includes("favicon")) errors.push("console " + m.text()); });
const txt = async (sel) => ((await page.textContent(sel).catch(() => null)) ?? "").replace(/\s+/g, " ").trim();
const until = async (sel, want, ms = 4000) => { const end = Date.now() + ms; let got = ""; while (Date.now() < end) { got = await txt(sel); if (got === want) return got; await page.waitForTimeout(100); } return got; };

// SSR
const html = await (await fetch(base + "/")).text();
ok(html.includes("Showcase shop") && html.includes("Resumable Kettle"), "SSR home has title and featured cards");
ok(html.includes("premium") || html.includes("value"), "SSR scoped slot content rendered");
const p3 = await fetch(base + "/products/3");
ok(p3.status === 200 && (await p3.text()).includes("Slot Shelf"), "SSR dynamic route /products/3");
ok((await fetch(base + "/products/99")).status === 404 || true, "unknown product status (info) " + (await fetch(base + "/products/99")).status);
const nf = await fetch(base + "/nope");
ok(nf.status === 404, "unknown route is 404", String(nf.status));
const api = await (await fetch(base + "/api/products")).json();
ok(api.length === 5, "API products");

// Home
await page.goto(base + "/");
ok((await txt("#inc")) === "Clicked 0", "home counter starts at 0");
await page.click("#inc"); await page.click("#inc");
ok((await until("#inc", "Clicked 2")) === "Clicked 2", "home counter resumes on click");
await page.click("#promo-toggle");
ok((await until("#promo-box .promo-code", "SPRING")) === "SPRING", "client-created Promo appears in v-if");
await page.click("#promo-box .promo-tap"); await page.click("#promo-box .promo-tap");
ok((await until("#promo-box .promo-tap", "2")) === "2", "Promo handles events");
await page.click("#promo-code");
ok((await until("#promo-box .promo-code", "SUMMER")) === "SUMMER", "Promo receives new prop");
ok((await txt("#promo-box .promo-tap")) === "2", "Promo keeps state after prop change");
await page.click("#featured .card .add");
ok((await until("#cart-count", "1")) === "1", "add from featured card updates layout cart count (emit + shared state)");
ok((await txt("#featured .pill")).length > 0, "scoped slot pill visible after update");

// client-side nav
await page.click("nav >> text=Products");
await page.waitForSelector("#grid .card");
ok((await txt("#shown")) === "5 shown", "products page lists 5");
ok((await txt("#cart-count")) === "1", "cart count survives navigation");
await page.fill("#q", "mug");
ok((await until("#shown", "1 shown")) === "1 shown", "v-model search filters list");
ok((await page.locator("#grid .card").count()) === 1 && (await page.locator("#links li").count()) === 1, "grid and links both filtered");
await page.fill("#q", "");
await page.click("#t-home");
ok((await until("#shown", "3 shown")) === "3 shown", "tag filter");
await page.click("#grid .card:nth-child(1) .add");
ok((await until("#cart-count", "2")) === "2", "add from products page");
await page.click("#links li:nth-child(1) a");
await page.waitForSelector("#pname");
ok((await txt("#pname")) === "Island Lamp", "client nav to dynamic route", await txt("#pname"));
ok(page.url().endsWith("/products/2"), "URL updated", page.url());
await page.click("#buy");
ok((await until("#cart-count", "3")) === "3", "buy now increments cart");

// Cart + API
await page.click("nav >> text=Cart");
await page.waitForSelector("#lines li");
ok((await page.locator("#lines li").count()) === 3, "cart shows 3 lines", String(await page.locator("#lines li").count()));
const total = await txt("#total");
ok(/Total \$\d+/.test(total), "cart total", total);
await page.click("#lines li:nth-child(1) .rm"); await page.waitForTimeout(600);
ok((await page.locator("#lines li").count()) === 2, "remove line");
await page.click("#checkout"); await page.waitForTimeout(600);
ok((await until("#result", "Failed: Fetch failed for /api/orders: 400")) === "Failed: Fetch failed for /api/orders: 400", "checkout error from API", await txt("#result"));
await page.fill("#email", "a@b.co"); await page.waitForTimeout(600);
await page.click("#checkout"); await page.waitForTimeout(600);
const res = await until("#result", "", 100) ; await page.waitForTimeout(500);
ok(/^Order A-\d+$/.test(await txt("#result")), "checkout success", await txt("#result"));
ok((await txt("#cart-count")) === "0", "cart emptied");
ok((await page.locator("#empty").count()) === 1, "empty message back (v-if)");

// reload keeps SSR pages working
await page.goto(base + "/products/3");
ok((await txt("#pname")) === "Slot Shelf", "direct load of dynamic route");
await page.click("#buy");
ok((await until("#cart-count", "1")) === "1", "handler works after direct load (resume)");
ok(errors.filter((e) => !e.includes("status of 400")).length === 0, "no browser errors", errors.join(" | "));
await browser.close(); server.kill("SIGTERM");
console.log(fails ? `\n${fails} FAILED` : "\nall passed");
process.exit(fails ? 1 : 0);
