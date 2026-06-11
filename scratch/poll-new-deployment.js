const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const targetUrl = 'https://accounts-life.vercel.app';
  const maxRetries = 30; // 30 * 10s = 5 minutes
  let success = false;

  console.log(`Polling ${targetUrl} for new deployment...`);

  for (let i = 0; i < maxRetries; i++) {
    try {
      await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 15000 });
      
      // Check if "Sign Up / Login" exists in the text
      const content = await page.textContent('body');
      
      const hasSignUpLogin = content.includes('Sign Up / Login');
      const hasOldBadge = content.includes('Built for Professionals. Backed by Authority.');

      console.log(`[Attempt ${i + 1}] Sign Up / Login button live: ${hasSignUpLogin}, Old hero badge present: ${hasOldBadge}`);

      if (hasSignUpLogin && !hasOldBadge) {
        console.log('🎉 NEW DEPLOYMENT IS LIVE ON VERCEL!');
        
        // Take a production screenshot to verify visually
        const prodScreenshotPath = 'C:\\Users\\ayush\\.gemini\\antigravity\\brain\\3e7ef49d-8c4e-42f2-b4da-2f480a7bed61\\production_homepage_after_polish.png';
        await page.screenshot({ path: prodScreenshotPath, fullPage: true });
        console.log(`✅ Production homepage screenshot saved to ${prodScreenshotPath}`);
        
        success = true;
        break;
      }
    } catch (err) {
      console.log(`[Attempt ${i + 1}] failed:`, err.message);
    }
    await new Promise(r => setTimeout(r, 10000));
  }

  await browser.close();
  if (success) {
    process.exit(0);
  } else {
    console.error('Timeout waiting for deployment to go live.');
    process.exit(1);
  }
})().catch(e => {
  console.error(e.message);
  process.exit(1);
});
