const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    console.log('Navigating to root of accounts-life...');
    const response = await page.goto('https://accounts-life.vercel.app', { waitUntil: 'networkidle', timeout: 20000 });
    console.log('Response status:', response.status());
    console.log('Final URL after redirects:', page.url());
    console.log('Page Title:', await page.title());
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await browser.close();
  }
}

main().catch(console.error);
