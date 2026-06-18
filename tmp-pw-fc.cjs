const { chromium } = require("C:/Users/User/AppData/Local/Temp/pw-driver/node_modules/playwright-core");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 2000 } });
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));

  await page.goto("http://localhost:8085/flashcards", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);

  const startButtons = page.locator('button:has-text("Start Learning")');
  await startButtons.nth(5).click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: "tmp-shot-fc-2b.png", fullPage: true });

  // Click via JS dispatch to bypass actionability/visibility heuristics (CSS animation artifact)
  const clicked = await page.evaluate(() => {
    const heading = Array.from(document.querySelectorAll("h3")).find((h) => h.textContent?.includes("Peribahasa Wajib Hafal"));
    if (!heading) return false;
    let el = heading;
    while (el && el.tagName !== "BUTTON") el = el.parentElement;
    if (!el) return false;
    el.scrollIntoView();
    el.click();
    return true;
  });
  console.log("clicked via JS:", clicked);
  await page.waitForTimeout(1200);
  console.log("=== Peribahasa deck / study view ===");
  console.log((await page.evaluate(() => document.body.innerText.slice(0, 1800))));
  await page.screenshot({ path: "tmp-shot-fc-3-peribahasa.png", fullPage: true });

  console.log("=== ERRORS ===", errors);
  await browser.close();
})();
