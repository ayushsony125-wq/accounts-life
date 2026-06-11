const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Logging in to Admin on Localhost...');
  try {
    await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle', timeout: 15000 });
    await page.click('button:has-text("Admin Login")');
    await page.fill('#password-input', 'Ak@993102');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.click('button[type="submit"]')
    ]);
    
    console.log('Navigated to: ' + page.url());
    
    // Get admin header bounding box
    const header = page.locator('header').first();
    const initialBox = await header.boundingBox();
    console.log('Initial Header Box:', initialBox);
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);
    
    const scrolledBox = await header.boundingBox();
    console.log('Scrolled Header Box:', scrolledBox);
    
    const isSticky = scrolledBox && Math.abs(scrolledBox.y) < 5;
    console.log('Is AdminHeader Sticky?', isSticky);
  } catch (err) {
    console.error('Error testing admin stickiness:', err);
  } finally {
    await browser.close();
  }
})();
