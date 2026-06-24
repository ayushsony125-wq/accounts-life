const { chromium } = require('playwright');
const path = require('path');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const url = 'https://accounts-one-ak-s-projectsakk.vercel.app/standards/as?selected=as-1';
  console.log(`Navigating to: ${url}`);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  // Click the Examples & Case Law tab
  const tabs = await page.$$('button');
  for (const tab of tabs) {
    const text = await tab.innerText();
    if (text.includes('Examples & Case Law')) {
      console.log('Clicking on Examples & Case Law tab...');
      await tab.click();
      break;
    }
  }
  await page.waitForTimeout(3000);

  const screenshotPath = path.join('C:/Users/ayush/.gemini/antigravity/brain/990b0c71-333d-4e0a-8054-4eed28bae673', 'examples_tab_live.png');
  console.log(`Saving screenshot to: ${screenshotPath}`);
  await page.screenshot({ path: screenshotPath, fullPage: true });

  await browser.close();
}

main().catch(console.error);
