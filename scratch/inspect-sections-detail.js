const { chromium } = require('playwright');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app';

async function main() {
  console.log('=== DETAILED SECTIONS INSPECTION ===');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto(SITE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const sections = await page.evaluate(() => {
    // Select all section tags and print their IDs and headings
    const elements = Array.from(document.querySelectorAll('section'));
    return elements.map((sec, idx) => {
      const heading = sec.querySelector('h2')?.innerText?.trim() || sec.querySelector('h1')?.innerText?.trim() || 'No Heading';
      return {
        index: idx,
        id: sec.id || 'no-id',
        heading: heading,
        ariaLabel: sec.getAttribute('aria-labelledby') || 'none'
      };
    });
  });

  console.log('Production homepage sections:');
  console.log(sections);

  await browser.close();
}

main().catch(console.error);
