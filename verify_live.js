const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1440, height: 900 });
  const url = 'https://accounts-one-ak-s-projectsakk.vercel.app/standards/as?selected=as-1';
  
  console.log('Navigating to', url);
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  } catch (err) {
    console.log('Navigation timed out, continuing anyway...', err.message);
  }
  
  console.log('Waiting for Examples & Case Law button...');
  try {
    const btn = page.locator('button:has-text("Examples & Case Law")');
    await btn.waitFor({ state: 'visible', timeout: 15000 });
    await btn.click();
    console.log('Clicked.');
  } catch (err) {
    console.log('Failed to find or click button, trying alternate approaches...', err.message);
    // Find any button with text
    const buttons = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('button')).map(b => b.innerText);
    });
    console.log('Available buttons:', buttons);
    throw err;
  }
  
  console.log('Waiting for sticky TOC selector...');
  await page.waitForSelector('#as1-examples-sticky-toc', { timeout: 15000 });
  console.log('Sticky TOC found.');

  // Scroll to Audit Case Studies
  await page.evaluate(() => {
    const target = document.getElementById('sec-audit-cases');
    if (target) target.scrollIntoView();
  });
  await page.waitForTimeout(2000);

  const measurements = await page.evaluate(() => {
    const scrollEl = document.querySelector('#as1-examples-sticky-toc div div');
    const activeBtn = scrollEl.querySelector('[data-toc-id="audit-cases"]');
    if (!scrollEl || !activeBtn) return null;
    
    return {
      offsetLeft: activeBtn.offsetLeft,
      offsetParentTag: activeBtn.offsetParent ? activeBtn.offsetParent.tagName : 'null',
      offsetParentId: activeBtn.offsetParent ? activeBtn.offsetParent.id : 'none',
      offsetParentClass: activeBtn.offsetParent ? activeBtn.offsetParent.className : 'none',
      scrollElScrollLeft: scrollEl.scrollLeft,
      scrollElOffsetWidth: scrollEl.offsetWidth,
      btnOffsetWidth: activeBtn.offsetWidth,
      computedOffsetLeft: activeBtn.getBoundingClientRect().left - scrollEl.getBoundingClientRect().left + scrollEl.scrollLeft
    };
  });
  
  console.log('Measurements:', measurements);
  await browser.close();
})();
