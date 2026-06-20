const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/d66d11ee-abbd-4673-b8af-1ccd6f3745b9';

async function captureSite(siteUrl, name) {
  console.log(`\n=== Capture ${name} (${siteUrl}) ===`);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  try {
    console.log(`1. Navigating to login page: ${siteUrl}/admin/login`);
    await page.goto(`${siteUrl}/admin/login`, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(2000);

    console.log('2. Clicking Admin Login tab...');
    await page.click('button:has-text("Admin Login")');
    await page.waitForTimeout(1000);

    console.log('3. Filling credentials...');
    await page.fill('input#admin-email-input', 'admin@accounts.one');
    await page.fill('input#password-input', 'Ak@993102');
    await page.waitForTimeout(500);

    console.log('4. Accessing Portal...');
    await page.click('button:has-text("Access Portal")');
    await page.waitForURL(`${siteUrl}/admin`, { timeout: 15000 });
    console.log('✓ Logged in!');

    console.log('5. Navigating to standards...');
    await page.goto(`${siteUrl}/admin/standards`, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(4000);

    const screenshotPath = path.join(ARTIFACT_DIR, `live_admin_standards_${name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`✓ Screenshot saved: ${screenshotPath}`);
  } catch (err) {
    console.error(`Failed to capture ${name}:`, err.message);
  } finally {
    await browser.close();
  }
}

async function main() {
  if (!fs.existsSync(ARTIFACT_DIR)) {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  }

  await captureSite('https://accounts-one-ak-s-projectsakk.vercel.app', 'accounts_one');
  await captureSite('https://accounts-life.vercel.app', 'accounts_life');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
