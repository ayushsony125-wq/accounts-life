const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000 ...');
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) {
    console.log('Waiting for dev server compilation...');
    await page.waitForTimeout(5000);
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
  }

  // Desktop Screenshot
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(2000);
  const desktopPath = path.join(__dirname, 'homepage_after_polish.png');
  await page.screenshot({ path: desktopPath, fullPage: true });
  console.log(`Desktop screenshot saved to ${desktopPath}`);

  // Mobile Screenshot
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(2000);
  const mobilePath = path.join(__dirname, 'homepage_after_polish_mobile.png');
  await page.screenshot({ path: mobilePath, fullPage: true });
  console.log(`Mobile screenshot saved to ${mobilePath}`);

  await browser.close();
}

run().catch(console.error);
