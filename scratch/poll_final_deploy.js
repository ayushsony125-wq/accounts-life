const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const targetUrl = 'https://accounts-life.vercel.app';
  const maxRetries = 40; // 40 * 10s = 6.6 minutes
  let success = false;

  console.log(`Polling ${targetUrl} for final deployment...`);

  for (let i = 0; i < maxRetries; i++) {
    try {
      await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 15000 });
      
      // Look for the input with our specific placeholder
      const placeholder = await page.getAttribute('input[placeholder="Search topics, calculators..."]', 'placeholder');
      
      console.log(`[Attempt ${i + 1}] New search placeholder found: ${placeholder === 'Search topics, calculators...'}`);

      if (placeholder === 'Search topics, calculators...') {
        console.log('🎉 LIVE SITE HAS SUCCESSFULLY DEPLOYED AND IS ACTIVE!');
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
    console.error('Timeout waiting for final deployment to go live.');
    process.exit(1);
  }
})().catch(e => {
  console.error(e.message);
  process.exit(1);
});
