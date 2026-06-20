const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app';
const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/d66d11ee-abbd-4673-b8af-1ccd6f3745b9';

async function main() {
  console.log('=== ADMIN STANDARDS MANAGER PRODUCTION SCREENSHOT ===');
  
  if (!fs.existsSync(ARTIFACT_DIR)) {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log(`\n1. Navigating to login page: ${SITE_URL}/admin/login`);
  await page.goto(`${SITE_URL}/admin/login`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  console.log('2. Clicking Admin Login tab...');
  // Click on the second button in the tab list (Admin Login)
  await page.click('button:has-text("Admin Login")');
  await page.waitForTimeout(1000);

  console.log('3. Filling Admin credentials...');
  await page.fill('input#admin-email-input', 'admin@accounts.one');
  await page.fill('input#password-input', 'Ak@993102');
  await page.waitForTimeout(500);

  console.log('4. Clicking submit to login...');
  await page.click('button:has-text("Access Portal")');
  
  console.log('5. Waiting for redirect to admin dashboard...');
  await page.waitForURL(`${SITE_URL}/admin`, { timeout: 15000 });
  console.log('✓ Successfully logged in to Admin CMS dashboard!');

  console.log('\n6. Navigating to Standards Manager page...');
  await page.goto(`${SITE_URL}/admin/standards`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  const screenshotPath = path.join(ARTIFACT_DIR, 'live_admin_standards.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`✓ Production Standards Manager screenshot saved to: ${screenshotPath}`);

  await browser.close();
  console.log('\n=== SCREENSHOT COMPLETED ===');
}

main().catch(e => {
  console.error('Fatal script error:', e);
  process.exit(1);
});
