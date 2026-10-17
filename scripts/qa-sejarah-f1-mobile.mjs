import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const base = process.env.SEJARAH_QA_URL || "https://audit-sejarah-f1-quiz-neutra.academymy.pages.dev";
const artifacts = "sejarah-mobile-qa";
await mkdir(artifacts, { recursive: true });
const browser = await chromium.launch({ headless: true });
const findings = [];
let errors = 0;
for (const width of [320, 360, 390]) {
  const context = await browser.newContext({ viewport: { width, height: 740 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  const item = { width, navigation: null, settings: null, enteredQuiz: false, imagePaths: [], missingImages: [], horizontalOverflow: null, errors: [] };
  findings.push(item);
  page.on("pageerror", (error) => { item.errors.push(error.message.slice(0, 240)); });
  try {
    const url = base + "/quizzes?subject=sejarah&form=1&chapter=Chapter%205";
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(5500);
    item.navigation = { status: response?.status(), url: page.url(), title: await page.title() };
    item.screenText = (await page.locator("body").innerText()).slice(0, 1400);
    await page.screenshot({ path: path.join(artifacts, `sejarah-${width}-entry.jpg`), type: "jpeg", quality: 72, fullPage: true });
    const mode = page.getByRole("button", { name: /^No Timer/i }).first();
    item.settings = { visible: await mode.isVisible().catch(() => false), startCount: await page.getByRole("button", { name: /Start Quiz/i }).count() };
    if (item.settings.visible) {
      await mode.click();
      await page.getByRole("button", { name: /Start Quiz/i }).first().click();
      await page.waitForTimeout(1800);
      item.enteredQuiz = await page.locator(".quiz-hud").count() > 0;
      item.quizText = (await page.locator("body").innerText()).slice(0, 800);
      await page.screenshot({ path: path.join(artifacts, `sejarah-${width}-quiz.jpg`), type: "jpeg", quality: 72, fullPage: true });
      const answerButtons = await page.locator("button.group.relative.flex.min-h-12.touch-manipulation").count();
      item.answerButtons = answerButtons;
      if (answerButtons === 4) {
        for (let n = 0; n < 30; n++) {
          const imgs = await page.locator('img[src*="/quiz-visuals/sejarah-f1/"]').evaluateAll(nodes =>
            nodes.map(n => ({ src: n.getAttribute("src"), loaded: n.complete && n.naturalWidth > 0, width: n.getBoundingClientRect().width, right: n.getBoundingClientRect().right }))
          );
          for (const image of imgs) {
            item.imagePaths.push(image.src);
            if (!image.loaded || image.width < 80 || image.right > width + 1) item.missingImages.push({ question: n + 1, ...image });
          }
          if (n === 29) break; // do not submit the final attempt or affect progress/XP.
          await page.locator("button.group.relative.flex.min-h-12.touch-manipulation").first().click({ timeout: 8000 });
          await page.waitForTimeout(220);
          let next = page.locator("button.quiz-subject-action").filter({ hasText: /seterusnya|next|continue|teruskan|soalan/i }).last();
          if (!(await next.isVisible().catch(() => false))) {
            next = page.locator("button.quiz-subject-action").last();
          }
          if (!(await next.isVisible().catch(() => false))) {
            item.errors.push("Unable to locate next-question button at step " + n);
            break;
          }
          await next.click({ timeout: 10000 });
          await page.waitForTimeout(290);
        }
      }
      item.questionsVisited = await page.locator(".quiz-hud").count() > 0 ? 30 : 0;
    }
    item.horizontalOverflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      overflowPx: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }));
    const svgPaths = [
      "historical-sources.svg","glacial-landscape.svg","archaeology-finds.svg","irrigation.svg",
      "indus-drainage.svg","roman-amphitheatre.svg","mosque-interior.svg",
    ];
    for (const asset of svgPaths) {
      const reply = await page.request.get(base + "/quiz-visuals/sejarah-f1/" + asset, { timeout: 20000 });
      const type = reply.headers()["content-type"] ?? "";
      if (!reply.ok() || !(await reply.text()).includes("<svg")) {
        item.missingImages.push({ asset, status: reply.status(), contentType: type });
      }
    }
    if (item.horizontalOverflow?.overflowPx > 2 || item.missingImages.length > 0) errors++;
  } catch (error) {
    item.errors.push(String(error).slice(0, 600));
    errors++;
  } finally { await context.close(); }
  console.log("MOBILE_QA_RESULT " + JSON.stringify(item));
}
await browser.close();
await writeFile(path.join(artifacts, "results.json"), JSON.stringify(findings, null, 2));
console.log("QA_SUMMARY " + JSON.stringify({ widths: findings.length, errors, enteredQuiz: findings.filter(x => x.enteredQuiz).length }));
if (errors > 0) process.exitCode = 1;
