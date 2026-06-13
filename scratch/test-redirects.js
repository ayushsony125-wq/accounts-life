const { chromium } = require('playwright');

async function verifyRedirects() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Testing AS 1 deep link redirect...');
  await page.goto('https://accounts-one-ak-s-projectsakk.vercel.app/standards/as/as-1');
  await page.waitForTimeout(3000);
  console.log('Final URL for AS 1:', page.url());
  
  console.log('\nTesting Ind AS 1 deep link redirect...');
  await page.goto('https://accounts-one-ak-s-projectsakk.vercel.app/standards/ind-as/ind-as-1');
  await page.waitForTimeout(3000);
  console.log('Final URL for Ind AS 1:', page.url());
  
  await browser.close();
}

verifyRedirects().catch(console.error);
