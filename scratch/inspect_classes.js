const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  const elementStyles = await page.evaluate(() => {
    // Get the wrapper div (which is the first child of the main layout, containing hero and domains)
    const hero = document.querySelector('section[aria-labelledby="hero-heading"]');
    const wrapper = hero ? hero.parentElement : null;
    
    if (!wrapper) return { error: 'Wrapper parent of hero not found' };
    
    const computed = window.getComputedStyle(wrapper);
    return {
      classes: wrapper.className,
      computedPaddingBottom: computed.paddingBottom,
      computedHeight: computed.height,
      rect: {
        top: wrapper.getBoundingClientRect().top,
        bottom: wrapper.getBoundingClientRect().bottom,
        height: wrapper.getBoundingClientRect().height
      }
    };
  });
  
  console.log('Wrapper Styles:', JSON.stringify(elementStyles, null, 2));
  await browser.close();
}

main().catch(console.error);
