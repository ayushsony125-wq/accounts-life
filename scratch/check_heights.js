const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  const layout = await page.evaluate(() => {
    const navbar = document.querySelector('nav');
    const hero = document.querySelector('section[aria-labelledby="hero-heading"]');
    const domains = document.querySelector('section[aria-labelledby="domains-heading"]');
    const updates = document.querySelector('section[aria-labelledby="updates-heading"]');
    
    return {
      windowHeight: window.innerHeight,
      navbar: navbar ? navbar.getBoundingClientRect().height : null,
      hero: hero ? {
        top: hero.getBoundingClientRect().top,
        height: hero.getBoundingClientRect().height,
        bottom: hero.getBoundingClientRect().bottom
      } : null,
      domains: domains ? {
        top: domains.getBoundingClientRect().top,
        height: domains.getBoundingClientRect().height,
        bottom: domains.getBoundingClientRect().bottom
      } : null,
      updates: updates ? {
        top: updates.getBoundingClientRect().top,
        height: updates.getBoundingClientRect().height,
        bottom: updates.getBoundingClientRect().bottom
      } : null
    };
  });
  
  console.log('Layout Analysis at 1366x768:', JSON.stringify(layout, null, 2));
  await browser.close();
}

main().catch(console.error);
