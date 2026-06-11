const { chromium } = require('playwright');
const OUT = 'C:/Users/ayush/.gemini/antigravity/brain/3e7ef49d-8c4e-42f2-b4da-2f480a7bed61/';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  console.log('Connecting to https://accounts-life.vercel.app...');
  try {
    const res = await page.goto('https://accounts-life.vercel.app', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('Production load status:', res.status());
    
    const ph = await page.evaluate(() => document.body.scrollHeight);
    console.log('Production page height:', ph);

    // Full page
    await page.screenshot({ path: OUT + 'vercel_production.png', fullPage: true });
    console.log('production full page done');

    // Header
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: OUT + 'production_header.png' });
    console.log('production header done');

    // Footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: OUT + 'production_footer.png' });
    console.log('production footer done');
    
  } catch (err) {
    console.error('Failed to capture production:', err.message);
  }

  await browser.close();
  console.log('ALL DONE');
})().catch(e => { console.error(e.message); process.exit(1); });
