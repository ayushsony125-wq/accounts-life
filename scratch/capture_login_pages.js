const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/d66d11ee-abbd-4673-b8af-1ccd6f3745b9';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  try {
    console.log('Navigating to accounts-life login page...');
    const response = await page.goto('https://accounts-life.vercel.app/admin/login', { waitUntil: 'networkidle', timeout: 20000 });
    console.log('Response status:', response.status());
    console.log('Current URL:', page.url());
    console.log('Page Title:', await page.title());

    const screenshotPath = path.join(ARTIFACT_DIR, 'accounts_life_login_raw.png');
    await page.screenshot({ path: screenshotPath });
    console.log('Screenshot saved to:', screenshotPath);
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await browser.close();
  }
}

main().catch(console.error);
