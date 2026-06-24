const { chromium } = require('playwright');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app/standards/as?selected=as-1';

async function poll() {
  console.log('Polling live site for TOC and observer updates...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  let attempts = 0;
  while (attempts < 25) {
    try {
      await page.goto(SITE_URL);
      await page.waitForTimeout(3000);
      const isUpdated = await page.evaluate(() => {
        const el = document.querySelector('#as1-sticky-toc');
        return el ? !el.className.includes('bg-[#F5F5F3]/97') : false;
      });
      if (isUpdated) {
        console.log('SUCCESS');
        break;
      }
      console.log('Waiting...');
    } catch (e) {
      console.log(e.message);
    }
    attempts++;
    await page.waitForTimeout(10000);
  }
  await browser.close();
}

poll().catch(console.error);
