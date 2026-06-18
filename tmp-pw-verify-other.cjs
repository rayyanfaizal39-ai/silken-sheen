const { chromium } = require("C:/Users/User/AppData/Local/Temp/pw-driver/node_modules/playwright-core");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 1400 } });
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));

  // 1. BM Notes still shows the K1/K2 BMWorldPage hub (untouched)
  await page.goto("http://localhost:8085/notes", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);
  const subjBtns1 = page.locator('button:has-text("Bahasa Melayu")');
  await subjBtns1.first().click();
  await page.waitForTimeout(1000);
  const notesText = await page.evaluate(() => document.body.innerText);
  console.log("BM Notes shows Kertas 1/Kertas 2 (K1/K2 hub)?", notesText.includes("Kertas 1") && notesText.includes("Kertas 2"));

  // 2. BM Quizzes still shows the K1 quiz view (untouched)
  await page.goto("http://localhost:8085/quizzes", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);
  const subjBtns2 = page.locator('button:has-text("Bahasa Melayu")');
  await subjBtns2.first().click();
  await page.waitForTimeout(1000);
  const quizText = await page.evaluate(() => document.body.innerText);
  console.log("BM Quizzes shows Objektif sets (K1 quiz view)?", quizText.includes("Objektif"));

  // 3. Another subject's flashcards still work (Sejarah)
  await page.goto("http://localhost:8085/flashcards", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);
  const startButtons = page.locator('button:has-text("Start Learning")');
  await startButtons.nth(4).click(); // Sejarah
  await page.waitForTimeout(1000);
  const sejarahText = await page.evaluate(() => document.body.innerText);
  console.log("Sejarah flashcards chapter list loads?", sejarahText.includes("Chapter") || sejarahText.includes("Bab"));

  console.log("=== ERRORS ===", errors);
  await browser.close();
})();
