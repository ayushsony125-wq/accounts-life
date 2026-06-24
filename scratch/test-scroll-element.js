const { chromium } = require('playwright');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://accounts-one-ak-s-projectsakk.vercel.app/standards/as?selected=as-1', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  
  const scrollToResult = await page.evaluate(() => {
    const container = document.getElementById('as1-scroll-container');
    if (!container) return 'container not found';
    
    const initial = container.scrollTop;
    container.scrollTo({ top: 1000, behavior: 'instant' });
    const afterInstant = container.scrollTop;
    
    container.scrollTo({ top: 1500, behavior: 'smooth' });
    const afterSmoothImmediate = container.scrollTop;
    
    return {
      initial,
      afterInstant,
      afterSmoothImmediate,
      scrollHeight: container.scrollHeight,
      clientHeight: container.clientHeight
    };
  });
  
  console.log('ScrollTo Result:', scrollToResult);
  await browser.close();
}

run().catch(console.error);
