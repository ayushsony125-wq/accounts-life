const { chromium } = require('playwright');
const path = require('path');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Desktop viewport
  await page.setViewportSize({ width: 1280, height: 1000 });
  console.log('Navigating to Desktop Section 194Q topic page u/s 194Q...');
  await page.goto('http://localhost:3000/income-tax/tds/section-194q');
  await page.waitForTimeout(5000); // wait for dynamic page loading/compilation

  const desktopPath = 'C:\\Users\\ayush\\.gemini\\antigravity\\brain\\3e7ef49d-8c4e-42f2-b4da-2f480a7bed61\\topic_page_desktop.png';
  await page.screenshot({ path: desktopPath, fullPage: true });
  console.log(`✅ Desktop full-page screenshot saved to ${desktopPath}`);

  // Mobile viewport
  console.log('Switching to Mobile Viewport...');
  await page.setViewportSize({ width: 375, height: 812 });
  // Reload/wait
  await page.reload();
  await page.waitForTimeout(4000);

  const mobilePath = 'C:\\Users\\ayush\\.gemini\\antigravity\\brain\\3e7ef49d-8c4e-42f2-b4da-2f480a7bed61\\topic_page_mobile.png';
  await page.screenshot({ path: mobilePath, fullPage: true });
  console.log(`✅ Mobile full-page screenshot saved to ${mobilePath}`);

  await browser.close();
  console.log('✅ Screenshot capture complete.');
}

run().catch(console.error);
