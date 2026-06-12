const { chromium } = require('playwright');
const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(SITE_URL, { waitUntil: 'load' });
  await page.waitForTimeout(1000);

  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('header a, nav a, footer a')).map(el => ({
      text: el.textContent.trim().replace(/\s+/g, ' '),
      href: el.getAttribute('href'),
      tagName: el.tagName
    }));
  });

  console.log('--- HEADER & FOOTER LINKS IN LIVE WEBSITE ---');
  links.forEach(l => {
    console.log(`[${l.tagName}] "${l.text}" -> ${l.href}`);
  });

  await browser.close();
}

run().catch(console.error);
