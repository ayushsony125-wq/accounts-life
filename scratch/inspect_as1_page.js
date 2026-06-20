const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app';
const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/d66d11ee-abbd-4673-b8af-1ccd6f3745b9';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const url = `${SITE_URL}/standards/as?selected=as-1`;
  console.log(`Navigating to: ${url}`);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  // Capture page title and header
  const title = await page.title();
  const heading = await page.textContent('h1');
  console.log(`Page Title: ${title}`);
  console.log(`Heading: ${heading}`);

  // Print all visible tab buttons
  const buttons = await page.$$eval('button, a', els => els.map(el => ({
    tag: el.tagName.toLowerCase(),
    text: el.textContent.trim(),
    href: el.getAttribute('href'),
    title: el.getAttribute('title')
  })));
  console.log('\nAll buttons/links on page:');
  console.log(buttons.filter(b => b.text.includes('PDF') || b.text.includes('Lecture') || b.text.includes('View')));

  const screenshotPath = path.join(ARTIFACT_DIR, 'public_as1_page.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`\nScreenshot saved: ${screenshotPath}`);

  await browser.close();
}

main().catch(console.error);
