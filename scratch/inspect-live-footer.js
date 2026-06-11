const { chromium } = require('playwright');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Navigating to https://accounts-life.vercel.app ...');
  await page.goto('https://accounts-life.vercel.app');
  await page.waitForTimeout(3000);
  
  console.log('Extracting footer HTML...');
  const footerHTML = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    return footer ? footer.innerHTML : 'Footer not found';
  });
  
  console.log('--- LIVE FOOTER HTML ---');
  console.log(footerHTML);
  console.log('------------------------');
  
  await browser.close();
}

run().catch(console.error);
