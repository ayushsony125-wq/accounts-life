const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app/standards/as?selected=as-1';
const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/990b0c71-333d-4e0a-8054-4eed28bae673';

async function main() {
  console.log('=== TAKING FINAL SCREENSHOTS V2 ===');
  if (!fs.existsSync(ARTIFACT_DIR)) {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log(`Navigating to: ${SITE_URL}`);
  await page.goto(SITE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  // Take fresh screenshots
  console.log('Capturing top section with solid TOC bar...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '01_final_v2_top.png') });

  // Let's click on "Areas of Diversity" TOC button and check if it scrolls exactly
  console.log('Clicking on Areas of Diversity TOC button...');
  await page.click('button[data-toc-id="areas"]');
  await page.waitForTimeout(2000); // wait for smooth scroll to finish
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '02_final_v2_scrolled_areas.png') });

  // Let's click on "Fundamental Assumptions" TOC button and check if it scrolls exactly
  console.log('Clicking on Fundamental Assumptions TOC button...');
  await page.click('button[data-toc-id="assumptions"]');
  await page.waitForTimeout(2000); // wait for smooth scroll to finish
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '03_final_v2_scrolled_assumptions.png') });

  await browser.close();
  console.log('=== SCREENSHOTS TAKEN ===');
}

main().catch(console.error);
