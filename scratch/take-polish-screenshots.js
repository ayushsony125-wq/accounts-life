const { chromium } = require('playwright');
const path = require('path');

async function run() {
  console.log('Starting screenshot browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(5000); // wait for Next.js compilation or hydration

  // 1. Capture Desktop Screenshot
  await page.setViewportSize({ width: 1440, height: 900 });
  const desktopPath = 'C:\\Users\\ayush\\.gemini\\antigravity\\brain\\3e7ef49d-8c4e-42f2-b4da-2f480a7bed61\\homepage_desktop.png';
  await page.screenshot({ path: desktopPath, fullPage: true });
  console.log(`✅ Desktop homepage screenshot saved to ${desktopPath}`);

  // 2. Capture Mobile Screenshot
  await page.setViewportSize({ width: 375, height: 800 });
  const mobilePath = 'C:\\Users\\ayush\\.gemini\\antigravity\\brain\\3e7ef49d-8c4e-42f2-b4da-2f480a7bed61\\homepage_mobile.png';
  await page.screenshot({ path: mobilePath, fullPage: true });
  console.log(`✅ Mobile homepage screenshot saved to ${mobilePath}`);

  await browser.close();
  console.log('Browser closed.');
}

run().catch(console.error);
