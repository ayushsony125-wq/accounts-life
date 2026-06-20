const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app';
const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/d66d11ee-abbd-4673-b8af-1ccd6f3745b9';

async function main() {
  console.log('=== LIVE PRODUCTION VERIFICATION SCRIPT ===');
  if (!fs.existsSync(ARTIFACT_DIR)) {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  // 1. Homepage Verification
  console.log(`\n1. Navigating to homepage: ${SITE_URL}`);
  await page.goto(SITE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  const homepagePath = path.join(ARTIFACT_DIR, 'live_homepage.png');
  await page.screenshot({ path: homepagePath, fullPage: true });
  console.log(`✓ Homepage screenshot saved: ${homepagePath}`);

  // Check order of Explore by Domain and Latest Updates
  const headingOrder = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2, h3'));
    return headings.map(h => h.innerText?.trim()).filter(Boolean);
  });
  console.log('Homepage headings in order:', headingOrder);

  // 2. AS Page Verification
  const asUrl = `${SITE_URL}/standards/as/as-3`;
  console.log(`\n2. Navigating to AS 3 standard page: ${asUrl}`);
  await page.goto(asUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  const asPath = path.join(ARTIFACT_DIR, 'live_as3_page.png');
  await page.screenshot({ path: asPath, fullPage: true });
  console.log(`✓ AS 3 page screenshot saved: ${asPath}`);

  // Check if sidebar contains FAQ
  const sidebarText = await page.evaluate(() => {
    const sidebar = document.querySelector('aside');
    return sidebar ? sidebar.innerText : '';
  });
  const hasFaqInSidebar = sidebarText.toLowerCase().includes('faq');
  console.log('Has FAQ in sidebar text:', hasFaqInSidebar);

  // 3. Schedule III Page Verification
  const schUrl = `${SITE_URL}/standards/schedule-iii`;
  console.log(`\n3. Navigating to Schedule III page: ${schUrl}`);
  await page.goto(schUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  const schPath = path.join(ARTIFACT_DIR, 'live_schedule_iii.png');
  await page.screenshot({ path: schPath, fullPage: true });
  console.log(`✓ Schedule III screenshot saved: ${schPath}`);

  // Check if Schedule III contains Part I / Part II badges
  const schBodyText = await page.evaluate(() => {
    return document.body.innerText;
  });
  const hasPart1Badge = schBodyText.includes('Part I') || schBodyText.includes('Part II');
  console.log('Has Part I/Part II text in body:', hasPart1Badge);

  // 4. Admin Login/CMS Sticky top bar check
  const adminUrl = `${SITE_URL}/admin/login`;
  console.log(`\n4. Navigating to Admin Login page: ${adminUrl}`);
  await page.goto(adminUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const adminPath = path.join(ARTIFACT_DIR, 'live_admin_login.png');
  await page.screenshot({ path: adminPath, fullPage: true });
  console.log(`✓ Admin Login screenshot saved: ${adminPath}`);

  await browser.close();
  console.log('\n=== VERIFICATION SUCCESSFULLY COMPLETED ===');
}

main().catch(console.error);
