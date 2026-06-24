const { chromium } = require('playwright');

async function run() {
  console.log('=== Testing Local Dev Server scrolling ===');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`[BROWSER LOG]: ${msg.text()}`);
  });

  await page.goto('http://localhost:3009/standards/as?selected=as-1', { waitUntil: 'networkidle' });
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

  await browser.close();
}

run().catch(console.error);
