const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'http://localhost:3000';
const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/990b0c71-333d-4e0a-8054-4eed28bae673';

async function main() {
  console.log('=== TAKING LOCAL EXAMPLES SCREENSHOTS ===');
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
    console.log(`Navigating to: ${SITE_URL}/standards/as?selected=as-1`);
    await page.goto(`${SITE_URL}/standards/as?selected=as-1`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    // Click Examples & Case Law tab
    console.log('Clicking Examples & Case Law tab...');
    const tabs = await page.$$('button');
    let clicked = false;
    for (const tab of tabs) {
      const text = await tab.innerText();
      if (text.includes('Examples & Case Law')) {
        await tab.click();
        clicked = true;
        break;
      }
    }
    if (!clicked) {
      console.log('Could not find Examples & Case Law tab by button text, trying select element or selector...');
      await page.click('text="Examples & Case Law"');
    }
    await page.waitForTimeout(2000);

    // Capture top section
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'local_examples_top.png') });
    console.log('✓ Saved local_examples_top.png');

    // Click on Audit Case Studies TOC button
    console.log('Clicking on Audit Case Studies TOC button...');
    await page.click('button:has-text("3. Audit Case Studies")');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'local_examples_audit_cases.png') });
    console.log('✓ Saved local_examples_audit_cases.png');

    // Click on Landmark Judicial Cases TOC button
    console.log('Clicking on Landmark Judicial Cases TOC button...');
    await page.click('button:has-text("5. Landmark Judicial Cases")');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'local_examples_legal_cases.png') });
    console.log('✓ Saved local_examples_legal_cases.png');

  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    await browser.close();
    console.log('=== CAPTURE COMPLETE ===');
  }
}

main().catch(console.error);
