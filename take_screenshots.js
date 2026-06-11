const { chromium } = require('playwright');
const OUT = 'C:/Users/ayush/.gemini/antigravity/brain/3e7ef49d-8c4e-42f2-b4da-2f480a7bed61/';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle', timeout: 30000 });

  const ph = await page.evaluate(() => document.body.scrollHeight);
  console.log('Page height:', ph);

  // Full page
  await page.screenshot({ path: OUT + 'phase4_after_full.png', fullPage: true });
  console.log('full page done');

  // Header (top of page)
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: OUT + 'after_header_final.png' });
  console.log('header done');

  // Hero section
  const heroEl = await page.$('[aria-labelledby="hero-heading"]');
  if (heroEl) {
    const box = await heroEl.boundingBox();
    await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 80)), box.y);
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: OUT + 'after_hero.png' });
    console.log('hero done');
  }

  // Domain section
  const domainEl = await page.$('[aria-labelledby="domains-heading"]');
  if (domainEl) {
    const box = await domainEl.boundingBox();
    await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 80)), box.y);
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: OUT + 'after_domain.png' });
    console.log('domain done');
  }

  // Updates section
  const updatesEl = await page.$('[aria-labelledby="updates-heading"]');
  if (updatesEl) {
    const box = await updatesEl.boundingBox();
    await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 80)), box.y);
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: OUT + 'after_updates.png' });
    console.log('updates done');
  }

  // Quick Access section
  const qaEl = await page.$('[aria-labelledby="quickaccess-heading"]');
  if (qaEl) {
    const box = await qaEl.boundingBox();
    await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 80)), box.y);
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: OUT + 'after_quickaccess.png' });
    console.log('quickaccess done');
  }

  // Features section
  const featEl = await page.$('[aria-labelledby="features-heading"]');
  if (featEl) {
    const box = await featEl.boundingBox();
    await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 80)), box.y);
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: OUT + 'after_features.png' });
    console.log('features done');
  }

  // Footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: OUT + 'after_footer_final.png' });
  console.log('footer done');

  await browser.close();
  console.log('ALL DONE');
})().catch(e => { console.error(e.message); process.exit(1); });
