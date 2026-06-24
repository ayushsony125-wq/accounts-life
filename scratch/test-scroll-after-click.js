const { chromium } = require('playwright');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`[BROWSER LOG]: ${msg.text()}`);
  });

  await page.goto('https://accounts-one-ak-s-projectsakk.vercel.app/standards/as?selected=as-1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  const beforeClick = await page.evaluate(() => {
    const container = document.getElementById('as1-scroll-container');
    return container ? { scrollTop: container.scrollTop, scrollHeight: container.scrollHeight } : null;
  });
  console.log('Before click:', beforeClick);

  console.log('Clicking on Scope...');
  await page.click('button[data-toc-id="scope"]');
  await page.waitForTimeout(1000);

  const afterClick = await page.evaluate(() => {
    const container = document.getElementById('as1-scroll-container');
    return container ? { scrollTop: container.scrollTop } : null;
  });
  console.log('After click:', afterClick);

  console.log('Manually scrolling to 1100 from evaluate...');
  const afterManual = await page.evaluate(() => {
    const container = document.getElementById('as1-scroll-container');
    if (container) {
      container.scrollTo({ top: 1100, behavior: 'instant' });
      return { scrollTop: container.scrollTop };
    }
    return null;
  });
  console.log('After manual scroll:', afterManual);

  await browser.close();
}

run().catch(console.error);
