const { chromium } = require('playwright');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Listen for console and network
  page.on('console', msg => console.log(`[Console] ${msg.type()}: ${msg.text()}`));
  page.on('pageerror', err => console.log(`[PageError] ${err.message}`));
  page.on('response', res => {
    if (res.url().includes('.css') || res.status() >= 400) {
      console.log(`[HTTP ${res.status()}] ${res.url()} (${res.headers()['content-type']})`);
    }
  });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(4000); // give next dev compilation time

  // Check head styles and link tags
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('link')).map(l => ({
      rel: l.rel,
      href: l.href
    }));
  });
  console.log('Linked assets in head:', JSON.stringify(links, null, 2));

  // Check if body is visible and has classes
  const bodyInfo = await page.evaluate(() => {
    const el = document.body;
    return {
      classes: el.className,
      styleSheets: document.styleSheets.length,
      bg: window.getComputedStyle(el).backgroundColor,
      textColor: window.getComputedStyle(el).color,
      fontFamily: window.getComputedStyle(el).fontFamily
    };
  });
  console.log('Body Info:', bodyInfo);

  // Print home page HTML to see if content is loaded
  const headingInfo = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    return h1 ? { text: h1.innerText, classes: h1.className } : null;
  });
  console.log('H1 Info:', headingInfo);

  await browser.close();
}

run().catch(console.error);
