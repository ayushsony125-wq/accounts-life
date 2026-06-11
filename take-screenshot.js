const { chromium } = require('playwright');
const path = require('path');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(4000); // wait for dev server compile/load

  const screenshotPath = path.join(__dirname, 'homepage_full.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`Full screenshot saved to ${screenshotPath}`);

  await browser.close();
}

run().catch(console.error);
