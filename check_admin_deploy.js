const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const maxRetries = 24; // 24 * 10s = 4 minutes
  let success = false;

  console.log('Polling https://accounts-life.vercel.app/admin/login to check if the new login is live...');

  for (let i = 0; i < maxRetries; i++) {
    try {
      await page.goto('https://accounts-life.vercel.app/admin/login', { waitUntil: 'load', timeout: 20000 });
      await page.waitForTimeout(2000);
      
      // Click on Admin Login tab button first
      console.log('Clicking Admin Login tab...');
      await page.click('button:has-text("Admin Login")');
      await page.waitForTimeout(1000);

      const hasPasswordInput = await page.$('#password-input');
      if (hasPasswordInput) {
        await page.fill('#password-input', 'Ak@993102');
        
        const submitPromise = page.waitForNavigation({ waitUntil: 'load', timeout: 25000 }).catch(e => {
          // Ignore timeout if it loaded
        });
        await page.click('button[type="submit"]');
        await submitPromise;
        
        await page.waitForTimeout(3000);
        const currentUrl = page.url();
        console.log(`[Attempt ${i + 1}] Current URL after login attempt: ${currentUrl}`);
        
        if (currentUrl.includes('/admin') && !currentUrl.includes('/login')) {
          console.log('NEW DEPLOYMENT IS LIVE! Password authentication was successful.');
          success = true;
          break;
        }
      }
      console.log(`[Attempt ${i + 1}] New password not recognized yet (still on old deploy)...`);
    } catch (err) {
      console.log(`[Attempt ${i + 1}] failed:`, err.message);
    }
    await new Promise(r => setTimeout(r, 10000));
  }

  await browser.close();
  if (success) {
    process.exit(0);
  } else {
    console.error('Timeout waiting for password authentication to go live.');
    process.exit(1);
  }
})().catch(e => { console.error(e.message); process.exit(1); });
