const { chromium } = require('playwright');
const path = require('path');

const OUT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/990b0c71-333d-4e0a-8054-4eed28bae673/';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const url = 'http://localhost:3000/standards/as?selected=as-1';
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  console.log('Scrolling to Para 23...');
  const paraEl = page.locator('#as1-para23');
  await paraEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  const path1 = path.join(OUT_DIR, '08b_para23_precedent_box.png');
  await page.screenshot({ path: path1 });
  console.log(`Saved: ${path1}`);

  await browser.close();
}

run().catch(console.error);
