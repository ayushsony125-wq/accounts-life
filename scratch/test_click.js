const { chromium } = require('playwright');
const path = require('path');

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://accounts-one-ak-s-projectsakk.vercel.app/standards/as/as-1');
  console.log('Page loaded');
  await page.click('button[title="Watch video lectures"]');
  console.log('Video button clicked');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'as1_video_test.png' });
  console.log('Screenshot saved to as1_video_test.png');
  await browser.close();
}

main().catch(console.error);
