const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:3000/standards/learning?standard=as1&tab=standard';
const OUT_DIR = path.join(__dirname, '..');

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log('Navigating to page...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(2000);

  // Screenshot 1: Top of page (Cover + TOC)
  await page.screenshot({ path: path.join(OUT_DIR, 'v2_01_cover_toc.png'), fullPage: false });
  console.log('Screenshot 1: Cover + TOC done');

  // Screenshot 2: Scope section - click II. SCOPE in TOC
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent.includes('SCOPE'));
    if (btn) btn.click();
  });
  await sleep(800);
  await page.screenshot({ path: path.join(OUT_DIR, 'v2_02_scope.png'), fullPage: false });
  console.log('Screenshot 2: Scope done');

  // Screenshot 3: Definitions
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent.includes('DEFINITIONS') || b.textContent.includes('Definitions'));
    if (btn) btn.click();
  });
  await sleep(800);
  await page.screenshot({ path: path.join(OUT_DIR, 'v2_03_definitions.png'), fullPage: false });
  console.log('Screenshot 3: Definitions done');

  // Screenshot 4: IV. Areas of Diversity
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent.includes('DIVERSITY') || b.textContent.includes('Diversity'));
    if (btn) btn.click();
  });
  await sleep(800);
  await page.screenshot({ path: path.join(OUT_DIR, 'v2_04_diversity.png'), fullPage: false });
  console.log('Screenshot 4: Diversity done');

  // Screenshot 5: V. Considerations
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent.includes('CONSIDERATIONS') || b.textContent.includes('Considerations'));
    if (btn) btn.click();
  });
  await sleep(800);
  await page.screenshot({ path: path.join(OUT_DIR, 'v2_05_considerations.png'), fullPage: false });
  console.log('Screenshot 5: Considerations done');

  // Screenshot 6: VI. Assumptions
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent.includes('ASSUMPTIONS') || b.textContent.includes('Assumptions'));
    if (btn) btn.click();
  });
  await sleep(800);
  await page.screenshot({ path: path.join(OUT_DIR, 'v2_06_assumptions.png'), fullPage: false });
  console.log('Screenshot 6: Assumptions done');

  // Screenshot 7: VII. Disclosure
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent.includes('DISCLOSURE') || b.textContent.includes('Disclosure'));
    if (btn) btn.click();
  });
  await sleep(800);
  await page.screenshot({ path: path.join(OUT_DIR, 'v2_07_disclosure.png'), fullPage: false });
  console.log('Screenshot 7: Disclosure done');

  // Screenshot 8: VIII. Changes
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent.includes('CHANGES') || b.textContent.includes('Changes'));
    if (btn) btn.click();
  });
  await sleep(800);
  await page.screenshot({ path: path.join(OUT_DIR, 'v2_08_changes.png'), fullPage: false });
  console.log('Screenshot 8: Changes done');

  // Screenshot 9: Scroll to footnotes
  await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2'));
    const h = headings.find(h => h.textContent.includes('STATUTORY') || h.textContent.includes('Statutory'));
    if (h) h.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  await sleep(1000);
  await page.screenshot({ path: path.join(OUT_DIR, 'v2_09_footnotes.png'), fullPage: false });
  console.log('Screenshot 9: Footnotes done');

  // Screenshot 10: Full page TOC only - scroll back to top
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await sleep(500);
  // Crop just the TOC bar area
  await page.screenshot({ path: path.join(OUT_DIR, 'v2_10_toc_closeup.png'), clip: { x: 0, y: 50, width: 1440, height: 60 } });
  console.log('Screenshot 10: TOC closeup done');

  await browser.close();
  console.log('\nAll screenshots saved to:', OUT_DIR);
})();
