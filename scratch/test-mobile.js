const { chromium } = require('playwright');
const path = require('path');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app';
const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/3e7ef49d-8c4e-42f2-b4da-2f480a7bed61';

async function run() {
  console.log('Starting mobile view screenshots check...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set to mobile viewport size
  await page.setViewportSize({ width: 375, height: 667 });

  console.log('Navigating to AS portal (mobile)...');
  await page.goto(`${SITE_URL}/standards/as`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Take screenshot of default mobile state
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_as_portal.png') });
  console.log('Saved mobile_as_portal.png');

  // Click the "Menu" button to toggle the sidebar
  console.log('Toggling standards Menu...');
  await page.click('button:has-text("Menu")');
  await page.waitForTimeout(1000);
  
  // Take screenshot with sidebar drawer open
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_menu_drawer.png') });
  console.log('Saved mobile_menu_drawer.png');

  await browser.close();
  console.log('Mobile checks complete.');
}

run().catch(console.error);
