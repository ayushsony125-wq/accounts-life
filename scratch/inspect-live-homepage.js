const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app';
const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/d66d11ee-abbd-4673-b8af-1ccd6f3745b9';

async function main() {
  console.log('=== INSPECT LIVE HOMEPAGE ===');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  console.log(`Navigating to ${SITE_URL}...`);
  await page.goto(SITE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Take screenshot of homepage
  const screenshotPath = path.join(ARTIFACT_DIR, 'homepage_prod_inspected.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`Saved screenshot to: ${screenshotPath}`);

  // Query section headings and elements to find their order
  const sections = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2, h3, section'));
    return headings.map(h => {
      return {
        tagName: h.tagName,
        text: h.innerText?.trim() || '',
        id: h.id || '',
        className: h.className || ''
      };
    }).filter(h => h.text.length > 0);
  });

  console.log('\n--- Visible Headings / Sections on Homepage:');
  console.log(sections.slice(0, 15));

  // Check if "Curated Video Library" is visible
  const hasVideoLibrary = sections.some(s => s.text.includes('Curated Video Library') || s.text.includes('Watch expert lectures'));
  console.log('\nHas video library section:', hasVideoLibrary);

  await browser.close();
}

main().catch(console.error);
