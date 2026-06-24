const { chromium } = require('playwright');

async function run() {
  console.log('=== Capturing Page Console Logs on Click ===');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`[BROWSER LOG]: ${msg.text()}`);
  });

  await page.goto('https://accounts-one-ak-s-projectsakk.vercel.app/standards/as?selected=as-1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  console.log('Clicking on Scope button...');
  await page.click('button[data-toc-id="scope"]');
  await page.waitForTimeout(2000);

  const containerState = await page.evaluate(() => {
    const container = document.getElementById('as1-scroll-container');
    return container ? { scrollTop: container.scrollTop, scrollHeight: container.scrollHeight } : null;
  });
  console.log('Container State after click:', containerState);

  await browser.close();
}

run().catch(console.error);
