import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const { chromium } = await import(process.argv[2] ? pathToFileURL(process.argv[2]).href : "playwright-core");
const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const lang of ["bm", "en"]) for (const width of [320, 390, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    await page.goto(`http://127.0.0.1:4187/outputs/science-f3-chapter4-validation/index.html?lang=${lang}`);
    await page.getByRole("heading", { name: lang === "bm" ? "Kereaktifan Logam" : "Reactivity of Metals", exact: true }).waitFor();
    await page.evaluate(() => document.fonts.ready);
    const body = await page.locator("body").innerText();
    assert(!/undefined|NaN/.test(body));
    for (const text of lang === "bm"
      ? ["4.1 Kepelbagaian Mineral", "4.2 Siri Kereaktifan Logam", "4.3 Pengekstrakan Logam daripada Bijihnya", "Al > C > Zn > H > Fe > Sn > Pb > Cu", "relau bagas"]
      : ["4.1 Variety of Minerals", "4.2 Reactivity Series of Metals", "4.3 Extraction of Metals from their Ores", "Al > C > Zn > H > Fe > Sn > Pb > Cu", "blast furnace"]
    ) assert(body.includes(text), text);

    for (const label of ["Mg", "Al", "Zn", "Fe", "Pb"]) {
      const candidates = page.getByRole("button", { name: label, exact: true });
      await candidates.first().click();
    }
    for (const label of ["Al₂O₃ + C", "ZnO + C", "PbO + C"]) await page.getByRole("button", { name: label, exact: true }).click();
    for (const label of ["Al₂O₃", "ZnO", "Fe₂O₃", "PbO", "CuO"]) await page.getByRole("button", { name: label, exact: true }).click();
    for (const label of lang === "bm" ? ["Di atas karbon", "Di bawah karbon", "Kurang reaktif", "Paling tidak reaktif"] : ["Above carbon", "Below carbon", "Less reactive", "Least reactive"]) {
      await page.getByRole("button", { name: label, exact: true }).click();
    }
    const reveal = lang === "bm" ? "Lihat jawapan" : "Reveal answer";
    const hide = lang === "bm" ? "Tutup jawapan" : "Hide answer";
    const revealButtons = page.getByRole("button", { name: reveal, exact: true });
    const revealCount = await revealButtons.count();
    for (let i = 0; i < revealCount; i++) await page.getByRole("button", { name: reveal, exact: true }).first().click();
    assert.equal(await page.getByRole("button", { name: hide, exact: true }).count(), revealCount);

    const quizHeading = page.getByRole("heading", { name: lang === "bm" ? "Kuiz ringkas" : "Mini quiz", exact: true });
    const quiz = quizHeading.locator("..");
    const quizButtons = quiz.locator("button");
    const before = await quizButtons.count();
    if (before) {
      await quizButtons.first().click();
      assert(await quiz.locator('[aria-live="polite"]').first().isVisible());
    }
    const finish = page.getByRole("button", { name: lang === "bm" ? "Tandakan Bab 4 Selesai" : "Mark Chapter 4 as Read", exact: true });
    await finish.click();
    assert(await page.getByRole("button", { name: lang === "bm" ? "Selesai ditanda" : "Marked as read", exact: true }).isDisabled());

    const overflow = await page.evaluate(() => ({ viewport: innerWidth, page: document.documentElement.scrollWidth, elements: [...document.querySelectorAll("main p, main h1, main h2, main h3, main button, main svg")].filter(e => { const r = e.getBoundingClientRect(); return !e.closest(".overflow-x-auto") && (r.right > innerWidth + 1 || r.left < -1); }).map(e => ({ tag: e.tagName, text: e.textContent?.slice(0, 100) })) }));
    assert(overflow.page <= overflow.viewport, JSON.stringify(overflow));
    assert.deepEqual(overflow.elements, [], JSON.stringify(overflow));
    assert.deepEqual(errors, []);
    await page.screenshot({ path: `outputs/science-f3-chapter4-validation/${lang}-${width}-full.png`, fullPage: true });
    results.push({ lang, width, interactions: "PASS", horizontalOverflow: false, consoleErrors: errors });
    await page.close();
  }
  await writeFile("outputs/science-f3-chapter4-validation/browser-results.json", JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally { await browser.close(); }
