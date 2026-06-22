const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'http://localhost:3000';
const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/d66d11ee-abbd-4673-b8af-1ccd6f3745b9';

async function main() {
  console.log('=== LOCAL VALIDATION SCREENSHOT CAPTURE ===');
  if (!fs.existsSync(ARTIFACT_DIR)) {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  page.on('console', msg => console.log(`[Browser] ${msg.text()}`));
  page.on('pageerror', err => console.error(`[Browser Error] ${err.message}`));

  try {
    console.log('Logging in to local admin...');
    await page.goto(`${SITE_URL}/admin/login`, { waitUntil: 'networkidle' });
    await page.click('button:has-text("Admin Login")');
    await page.waitForTimeout(1000);
    await page.fill('input[id="admin-email-input"]', 'admin@accounts.one');
    await page.fill('input[id="password-input"]', 'Ak@993102');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    console.log('Logged in successfully!');

    // Let's go to standard edit page
    console.log('Navigating to entry edit page...');
    await page.goto(`${SITE_URL}/admin/entries`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Let's click edit on the first standard entry
    const editButton = page.locator('a[href*="/edit"]').first();
    if (await editButton.count() > 0) {
      await editButton.click();
      await page.waitForTimeout(3000);
      
      // Take standard admin edit page loaded screenshot
      await page.screenshot({ path: path.join(ARTIFACT_DIR, 'local_admin_editor_load.png') });
      console.log('✓ Saved local_admin_editor_load.png');

      // Click Content tab
      console.log('Clicking Content tab...');
      await page.click('button:has-text("content")');
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(ARTIFACT_DIR, 'local_admin_editor_content.png') });
      console.log('✓ Saved local_admin_editor_content.png');
    } else {
      console.log('No entries found to edit');
    }

    // Go to public standards page
    console.log('Navigating to AS-1 public standard page...');
    await page.goto(`${SITE_URL}/standards/as/as-1`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'local_public_as1_standard.png'), fullPage: true });
    console.log('✓ Saved local_public_as1_standard.png');

    // Click Examples & Case Law tab
    console.log('Clicking Examples & Case Law tab...');
    await page.click('button:has-text("Examples & Case Law")');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'local_public_as1_examples.png') });
    console.log('✓ Saved local_public_as1_examples.png');

  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    await browser.close();
    console.log('=== CAPTURE COMPLETE ===');
  }
}

main().catch(console.error);
