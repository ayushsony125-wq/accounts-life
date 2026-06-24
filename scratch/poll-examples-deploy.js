const { chromium } = require('playwright');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app/standards/as?selected=as-1';

async function poll() {
  console.log('Polling live site for Examples & Case Law tab updates...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  let attempts = 0;
  
  while (attempts < 30) {
    try {
      await page.goto(SITE_URL);
      await page.waitForTimeout(3000);

      // Click on "Examples & Case Law" tab
      // In LearningPortalClient, the tab button text is "Examples & Case Law"
      const tabButton = await page.locator('button:has-text("Examples & Case Law")');
      if (await tabButton.count() > 0) {
        await tabButton.click();
        await page.waitForTimeout(2000);
        
        const isUpdated = await page.evaluate(() => {
          return document.body.innerText.includes('Section 1') && document.body.innerText.includes('ICAI Illustrations');
        });
        
        if (isUpdated) {
          console.log('SUCCESS: Deployment is live!');
          break;
        }
      }
      console.log(`Attempt ${attempts + 1}: Waiting for deployment...`);
    } catch (e) {
      console.log(`Error during attempt ${attempts + 1}:`, e.message);
    }
    attempts++;
    await page.waitForTimeout(10000);
  }
  await browser.close();
}

poll().catch(console.error);
