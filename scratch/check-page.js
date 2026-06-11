const { chromium } = require('playwright');
async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://accounts-life.vercel.app/standards/as/as-1');
  await page.waitForTimeout(3000);
  const text = await page.evaluate(() => document.querySelector('#main-content')?.innerText || '');
  console.log('MAIN CONTENT TEXT:');
  console.log(text.slice(0, 1000));
  await browser.close();
}
main().catch(console.error);
