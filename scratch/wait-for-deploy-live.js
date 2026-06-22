const { chromium } = require('playwright');
const { exec } = require('child_process');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log(`Polling ${SITE_URL} for removal of the deployment banner...`);
  
  const maxAttempts = 30; // 5 minutes max
  let deployed = false;

  for (let i = 0; i < maxAttempts; i++) {
    try {
      await page.goto(`${SITE_URL}/standards/as?selected=as-1`, { waitUntil: 'load', timeout: 15000 });
      // Click Examples & Case Law tab to check for banner
      await page.click('button:has-text("Examples"), button:has-text("Case Law")');
      await page.waitForTimeout(2000);

      const content = await page.textContent('body');
      const hasBanner = content.includes('DEPLOYMENT TEST') && content.includes('BUILD-XYZ');
      
      console.log(`[Attempt ${i + 1}/${maxAttempts}] Deployment banner present: ${hasBanner}`);
      
      if (!hasBanner) {
        console.log('🎉 THE NEW DEPLOYMENT IS LIVE! The banner has been removed.');
        deployed = true;
        break;
      }
    } catch (err) {
      console.log(`[Attempt ${i + 1}/${maxAttempts}] Error checking: ${err.message}`);
    }
    await new Promise(r => setTimeout(r, 10000));
  }

  await browser.close();

  if (deployed) {
    console.log('Running final verification script...');
    exec('node scratch/verify_final_production.js', (err, stdout, stderr) => {
      if (err) {
        console.error('Error running verification script:', err);
        process.exit(1);
      }
      console.log(stdout);
      console.error(stderr);
      process.exit(0);
    });
  } else {
    console.error('Timed out waiting for deployment to go live.');
    process.exit(1);
  }
})().catch(err => {
  console.error(err);
  process.exit(1);
});
