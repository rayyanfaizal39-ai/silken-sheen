import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

// Pass a locally installed playwright-core entry point when it is not a project dependency.
const { chromium } = await import(process.argv[2] ? pathToFileURL(process.argv[2]).href : "playwright-core");
const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const lang of ["bm", "en"]) for (const width of [320, 390, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    await page.goto(`http://127.0.0.1:4188/outputs/science-f3-chapter8-validation/index.html?lang=${lang}`);
    await page.getByRole("heading", { name: lang === "bm" ? "Lihat yang tidak kelihatan" : "See the invisible", exact: true }).waitFor();
    await page.evaluate(() => document.fonts.ready);
    const body = await page.locator("body").innerText();
    assert(!/undefined|NaN/.test(body));
    assert(body.includes("1 Ci = 3.7 × 10¹⁰ Bq"));
    assert(body.includes(lang === "bm" ? "1 Bq = 1 pereputan sesaat" : "1 Bq = 1 decay per second"));
    assert(body.toLowerCase().includes(lang === "bm" ? "pengayaan" : "enrichment"));
    assert(body.includes("Fermi"));
    for (const text of ["Becquerel (Bq)", "Curie (Ci)", "2 m", "Th-232", "U-235", "11 = 11"]) assert(body.includes(text), text);
    const nonIonising = await page.locator('[data-radiation-class="non-ionising"]').innerText();
    const ionising = await page.locator('[data-radiation-class="ionising"]').innerText();
    assert(!/ultraviolet|ultraungu/i.test(nonIonising));
    assert(/ultraviolet|ultraungu/i.test(ionising));
    assert(nonIonising.includes(lang === "bm" ? "gelombang frekuensi sangat rendah" : "very low frequency waves"));
    if (lang === "bm") {
      assert(body.includes("Sinaran Mengion dan Sinaran Tidak Mengion"));
      assert(body.includes("sinar gama"));
      assert(!/sinar gamma|lencana radiasi|dos radiasi|gumpalan darah|sinaran tak mengion/i.test(body));
      for (const term of ["Karbon-14 (C-14)", "Radon-222 (Rn-222)", "Torium-234 (Th-234)", "Uranium-238 (U-238)", "anti-ultraungu", "pusat penyelidikan atom", "ketumpatannya tinggi"]) assert(body.includes(term), term);
    }
    assert.equal(await page.locator('[data-electron="true"]').count(), 11);
    await page.getByRole("button", { name: lang === "bm" ? "Kation · ion positif" : "Cation · positive ion", exact: true }).click();
    assert.equal(await page.locator('[data-electron="true"]').count(), 10);
    await page.getByRole("button", { name: lang === "bm" ? "Anion · ion negatif" : "Anion · negative ion", exact: true }).click();
    assert.equal(await page.locator('[data-electron="true"]').count(), 18);
    await page.locator("[data-atom]").screenshot({ path: `outputs/science-f3-chapter8-validation/${lang}-${width}-atom.png` });
    await page.getByRole("button", { name: lang === "bm" ? "Atom neutral" : "Neutral atom", exact: true }).click();
    assert.equal(await page.locator('[data-electron="true"]').count(), 11);
    const range = page.locator("#half-life-range");
    for (let step = 0; step <= 4; step++) {
      await page.getByRole("button", { name: `${step} ${lang === "bm" ? "Bilangan separuh hayat" : "Number of half-lives"}`, exact: true }).click();
      assert.equal(await range.inputValue(), String(step));
      const halfPanel = range.locator("../../../..");
      assert((await halfPanel.innerText()).includes(`${80 / 2 ** step} g`));
    }
    await range.focus();
    await page.keyboard.press("ArrowLeft");
    assert.equal(await range.inputValue(), "3");
    const calcHeading = page.getByRole("heading", { name: lang === "bm" ? "Kalkulator separuh hayat" : "Half-life calculator", exact: true });
    const calc = calcHeading.locator("..");
    const numbers = calc.locator('input[type="number"]');
    assert((await calc.innerText()).includes("5.000 g"));
    await numbers.nth(0).fill("160");
    assert((await calc.innerText()).includes("10.000 g"));
    await numbers.nth(1).fill("10");
    await numbers.nth(2).fill("20");
    assert((await calc.innerText()).includes("40.000 g"));
    await numbers.nth(0).fill("80"); await numbers.nth(1).fill("5.2"); await numbers.nth(2).fill("20.8");
    for (const [name, word] of lang === "bm" ? [["Alfa (α)", "saiz terbesar"], ["Beta (β)", "jauh lebih kecil"], ["Gama (γ)", "tiada saiz zarah"]] : [["Alpha (α)", "largest size"], ["Beta (β)", "much smaller"], ["Gamma (γ)", "no particle size"]]) {
      const button = page.getByRole("button", { name, exact: true });
      await button.click();
      assert.equal(await button.getAttribute("aria-pressed"), "true");
      assert((await page.locator("body").innerText()).includes(word));
    }
    const magnetic = page.locator("[data-magnetic-orientation]");
    const initialPaths = await magnetic.locator("path").evaluateAll(paths => paths.map(p => p.getAttribute("d")));
    const reverse = page.getByRole("button", { name: lang === "bm" ? "Songsangkan medan magnet" : "Reverse magnetic field" });
    await reverse.click();
    assert.equal(await magnetic.getAttribute("data-magnetic-orientation"), "out");
    const reversePaths = await magnetic.locator("path").evaluateAll(paths => paths.map(p => p.getAttribute("d")));
    assert.notEqual(initialPaths[0], reversePaths[0]); assert.notEqual(initialPaths[1], reversePaths[1]); assert.equal(initialPaths[2], reversePaths[2]);
    await reverse.click();
    assert.equal(await magnetic.getAttribute("data-magnetic-orientation"), "in");
    const fieldBlock = magnetic.locator("../../..");
    await fieldBlock.screenshot({ path: `outputs/science-f3-chapter8-validation/${lang}-${width}-fields.png` });
    for (const name of lang === "bm" ? ["Arkeologi / Geokronologi", "Industri", "Pertanian", "Makanan", "Perubatan", "Pertahanan"] : ["Archaeology / Geochronology", "Industry", "Agriculture", "Food", "Medicine", "Defence"]) {
      const button = page.getByRole("button", { name, exact: true }); await button.click();
      assert.equal(await button.getAttribute("aria-pressed"), "true");
      const text = await page.locator("body").innerText();
      if (["Makanan", "Food"].includes(name)) assert(text.includes("Radura"));
      if (["Perubatan", "Medicine"].includes(name)) {
        for (const isotope of ["Co-60", "Cs-137", "Na-24", "Tc-99", "I-131"]) assert(text.includes(isotope));
        for (const phrase of lang === "bm" ? ["Sesium-137", "Kobalt-60", "Natrium-24", "Teknetium-99", "Iodin-131", "tumor di dalam otak", "membasmi kuman", "kelenjar tiroid", "bekuan darah"] : ["Caesium-137", "Cobalt-60", "Sodium-24", "Technetium-99", "Iodine-131", "tumours in the brain", "destroys germs", "thyroid gland", "blood clots"]) assert(text.includes(phrase), phrase);
        await page.getByRole("heading", { name, exact: true }).locator("..").screenshot({ path: `outputs/science-f3-chapter8-validation/${lang}-${width}-medical.png` });
      }
      if (["Pertanian", "Agriculture"].includes(name)) {
        for (const phrase of lang === "bm" ? ["Fosforus-32", "baja fosfat terbaik", "kumbang", "pemandulan", "ciri tumbuhan"] : ["Phosphorus-32", "best phosphate fertiliser", "beetles", "sterilisation", "plant characteristics"]) assert(text.includes(phrase), phrase);
      }
    }
    await page.getByRole("button", { name: lang === "bm" ? "Betul" : "True", exact: true }).click();
    assert((await page.getByRole("status").innerText()).includes(lang === "bm" ? "pendedahan berpanjangan" : "prolonged gamma-ray exposure"));
    const finish = page.getByRole("button", { name: lang === "bm" ? "Tandakan Bab 8 Selesai" : "Mark Chapter 8 Complete" });
    await finish.click();
    assert(await page.getByRole("button", { name: lang === "bm" ? "Bab 8 selesai" : "Chapter 8 complete", exact: true }).isDisabled());
    const overflow = await page.evaluate(() => ({ viewport: innerWidth, page: document.documentElement.scrollWidth, elements: [...document.querySelectorAll("main p, main h1, main h2, main h3, main button, main svg")].filter(e => { const r = e.getBoundingClientRect(); return r.right > innerWidth + 1 || r.left < -1 || e.scrollWidth > e.clientWidth + 2; }).map(e => ({ tag: e.tagName, text: e.textContent?.slice(0,100) })) }));
    assert(overflow.page <= overflow.viewport, JSON.stringify(overflow));
    assert.deepEqual(overflow.elements, [], JSON.stringify(overflow));
    assert.deepEqual(errors, []);
    await page.screenshot({ path: `outputs/science-f3-chapter8-validation/${lang}-${width}-full.png`, fullPage: true });
    results.push({ lang, width, interactions: "PASS", horizontalOverflow: false, consoleErrors: errors });
    await page.close();
  }
  await writeFile("outputs/science-f3-chapter8-validation/browser-results.json", JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally { await browser.close(); }
