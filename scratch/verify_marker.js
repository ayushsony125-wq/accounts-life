const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app';
const BRAIN_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/d66d11ee-abbd-4673-b8af-1ccd6f3745b9';

async function run() {
  console.log(`Verifying live site: ${SITE_URL}`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  // 1. Check Public Examples page
  console.log('Navigating to Public AS Standards page...');
  await page.goto(`${SITE_URL}/standards/as?selected=as-1`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Click on Examples & Case Law tab
  console.log('Clicking "Examples & Case Law" tab...');
  // Look for tab buttons
  await page.click('button:has-text("Examples"), button:has-text("Case Law")');
  await page.waitForTimeout(2000);

  // Take public page screenshot
  const publicPath = path.join(BRAIN_DIR, 'live_public_examples_marker.png');
  await page.screenshot({ path: publicPath, fullPage: true });
  console.log(`Saved public screenshot to: ${publicPath}`);

  // Check if marker text is in DOM
  const bodyText = await page.textContent('body');
  const hasPublicMarker = bodyText.includes('DEPLOYMENT TEST') && bodyText.includes('BUILD-XYZ');
  console.log(`Public marker visible: ${hasPublicMarker ? 'YES' : 'NO'}`);

  // 2. Check Admin Editor
  console.log('Navigating to Admin Login page...');
  await page.goto(`${SITE_URL}/admin/login`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(2000);

  console.log('Logging in to Admin...');
  await page.click('button:has-text("Admin Login")');
  await page.waitForTimeout(1000);

  await page.fill('#admin-email-input', 'admin@accounts.one');
  await page.fill('#password-input', 'Ak@993102');
  
  const submitPromise = page.waitForNavigation({ waitUntil: 'networkidle', timeout: 30000 });
  await page.click('button[type="submit"]');
  await submitPromise;
  await page.waitForTimeout(3000);

  console.log(`Logged in. URL: ${page.url()}`);

  // Navigate directly to editing AS 1 (assuming ID is 100 or we navigate via Entries list)
  console.log('Navigating to entries list...');
  await page.goto(`${SITE_URL}/admin/entries`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Look for AS 1 row and click Edit
  console.log('Looking for AS 1 edit link...');
  // Let's find edit button
  const editLink = await page.$('a[href*="/edit"]');
  if (editLink) {
    const editHref = await editLink.getAttribute('href');
    console.log(`Navigating to edit URL: ${SITE_URL}${editHref}`);
    await page.goto(`${SITE_URL}${editHref}`, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(4000);

    // Take admin editor screenshot (Identity tab or Content tab)
    // Click "Standard" tab
    console.log('Clicking "Standard" editor tab...');
    await page.click('button:has-text("Standard")');
    await page.waitForTimeout(2000);

    const adminStdPath = path.join(BRAIN_DIR, 'live_admin_standard_marker.png');
    await page.screenshot({ path: adminStdPath, fullPage: true });
    console.log(`Saved admin Standard editor screenshot to: ${adminStdPath}`);

    // Click "Examples / Case Law" tab
    console.log('Clicking "Examples / Case Law" editor tab...');
    await page.click('button:has-text("Examples / Case Law")');
    await page.waitForTimeout(2000);

    const adminExPath = path.join(BRAIN_DIR, 'live_admin_examples_marker.png');
    await page.screenshot({ path: adminExPath, fullPage: true });
    console.log(`Saved admin Examples editor screenshot to: ${adminExPath}`);

    const editorBodyText = await page.textContent('body');
    const hasAdminMarker = editorBodyText.includes('DEPLOYMENT TEST') && editorBodyText.includes('BUILD-XYZ');
    console.log(`Admin marker visible: ${hasAdminMarker ? 'YES' : 'NO'}`);
  } else {
    console.log('Could not find edit link on entries page.');
  }

  await browser.close();
  console.log('Done.');
}

run().catch(console.error);
