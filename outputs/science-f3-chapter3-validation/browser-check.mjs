import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL(process.argv[2]).href);
const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const lang of ['bm', 'en']) for (const width of [320, 390, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto(`http://127.0.0.1:4186/outputs/science-f3-chapter3-validation/index.html?lang=${lang}`);
    await page.getByRole('heading', { level: 1, name: lang === 'bm' ? 'Pengangkutan' : 'Transport' }).waitFor();
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('[data-section]').count(), 5);
    assert.equal(await page.locator('[data-lesson]').count(), 18);
    for (const label of lang === 'bm' ? ['Ikan','Amfibia','Reptilia','Burung & mamalia','Peredaran sistemik','Peredaran pulmonari','Arteri','Kapilari','Vena','Berehat','Berjalan secara perlahan','Berlari'] : ['Fish','Amphibian','Reptile','Bird & mammal','Systemic circulation','Pulmonary circulation','Artery','Capillary','Vein','Resting','Slow walking','Running']) {
      await page.getByRole('button', { name: label, exact: true }).click();
    }
    const receives = { A:['A','O'], B:['B','O'], AB:['A','B','AB','O'], O:['O'] };
    for (const recipient of ['A','B','AB','O']) for (const donor of ['A','B','AB','O']) {
      await page.getByRole('button', { name: donor, exact: true }).nth(0).click();
      await page.getByRole('button', { name: recipient, exact: true }).nth(1).click();
      const message = await page.locator('[aria-live="polite"]').first().innerText();
      assert(message.includes(receives[recipient].includes(donor) ? (lang === 'bm' ? 'Serasi' : 'Compatible') : (lang === 'bm' ? 'Tidak serasi' : 'Incompatible')));
    }
    for (const button of await page.locator('[data-visual="water-path"] button').all()) await button.click();
    for (const label of lang === 'bm' ? ['Malam / panas · tertutup','Siang · terbuka','Keamatan cahaya ↑','Kelembapan udara ↑','Pergerakan udara ↑','Suhu ↑','Daun','Batang','Akar','Laluan makanan · floem','Laluan air · xilem'] : ['Night / hot · closed','Day · open','Light intensity ↑','Air humidity ↑','Air movement ↑','Temperature ↑','Leaf','Stem','Root','Food pathway · phloem','Water pathway · xylem']) await page.getByRole('button', { name: label, exact: true }).click();
    const reveal = lang === 'bm' ? 'Lihat jawapan' : 'Reveal answer';
    for (const section of await page.locator('[data-section]').all()) {
      const button = section.locator('button[aria-expanded]');
      await button.focus(); await page.keyboard.press('Enter');
      await page.waitForFunction(() => [...document.querySelectorAll('button[aria-expanded]')].filter(b => b === document.activeElement).every(b => b.getAttribute('aria-expanded') === 'true'));
      assert.equal(await button.getAttribute('aria-expanded'), 'true');
    }
    await page.locator('summary').click();
    for (const [selector,name] of [['[data-visual="heart"]','heart'],['[data-lesson="donation"]','donation'],['[data-visual="vascular"]','vascular'],['[data-lesson="ringing"]','ringing']]) await page.locator(selector).screenshot({ path: `outputs/science-f3-chapter3-validation/${lang}-${width}-${name}.png` });
    const finish = page.getByRole('button', { name: lang === 'bm' ? 'Tandakan Bab 3 Selesai' : 'Mark Chapter 3 as Read', exact: true });
    await finish.click(); assert(await page.getByRole('button', { name: lang === 'bm' ? 'Selesai ditanda' : 'Marked as read', exact: true }).isDisabled());
    const overflow = await page.evaluate(() => [...document.querySelectorAll('main p, main button, main h1, main h2, main h3, main svg, main a')].filter(e => { const r=e.getBoundingClientRect(); return r.width && (r.right > innerWidth+1 || r.left < -1 || e.scrollWidth > e.clientWidth+2); }).map(e => ({ tag:e.tagName,text:e.textContent?.slice(0,80) })));
    assert.deepEqual(overflow, []);
    assert.deepEqual(errors, []);
    results.push({lang,width,coverage:'PASS',interactions:'PASS',aboPairs:16,overflow,errors});
    await page.close();
  }
  await writeFile('outputs/science-f3-chapter3-validation/browser-results.json',JSON.stringify(results,null,2));
  console.log(JSON.stringify(results,null,2));
} finally { await browser.close(); }
