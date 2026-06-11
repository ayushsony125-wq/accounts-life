const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'http://localhost:3000';
const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/3e7ef49d-8c4e-42f2-b4da-2f480a7bed61';

const pages = [
  { name: 'home', path: '/' },
  { name: 'foundations', path: '/foundations' },
  { name: 'standards_as', path: '/standards/as' },
  { name: 'standards_as_1', path: '/standards/as/as-1' },
  { name: 'standards_ind_as', path: '/standards/ind-as' },
  { name: 'glossary', path: '/glossary' },
  { name: 'search', path: '/search' },
  { name: 'privacy', path: '/privacy' }
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  console.log('--- Navigating and taking public page screenshots ---');
  for (const p of pages) {
    console.log(`Navigating to ${SITE_URL}${p.path}...`);
    try {
      await page.goto(`${SITE_URL}${p.path}`);
      await page.waitForTimeout(3000); // Give dev server time to compile/hydrate
      const filename = path.join(ARTIFACT_DIR, `${p.name}.png`);
      await page.screenshot({ path: filename, fullPage: true });
      console.log(`Saved screenshot: ${filename}`);
    } catch (err) {
      console.error(`Error taking screenshot for ${p.name}: ${err.message}`);
    }
  }

  console.log('--- Logging in for admin screenshots ---');
  try {
    await page.goto(`${SITE_URL}/admin/login`);
    await page.waitForTimeout(1000);
    const loginFilename = path.join(ARTIFACT_DIR, 'admin_login.png');
    await page.screenshot({ path: loginFilename, fullPage: true });
    console.log(`Saved screenshot: ${loginFilename}`);

    await page.fill('#password-input', '123456');
    await page.click('button[type="submit"]');
    await page.waitForURL(`${SITE_URL}/admin`);
    await page.waitForTimeout(2000);

    const adminFilename = path.join(ARTIFACT_DIR, 'admin_dashboard.png');
    await page.screenshot({ path: adminFilename, fullPage: true });
    console.log(`Saved screenshot: ${adminFilename}`);

    await page.goto(`${SITE_URL}/admin/entries`);
    await page.waitForTimeout(2000);
    const adminEntriesFilename = path.join(ARTIFACT_DIR, 'admin_entries.png');
    await page.screenshot({ path: adminEntriesFilename, fullPage: true });
    console.log(`Saved screenshot: ${adminEntriesFilename}`);

  } catch (err) {
    console.error(`Error taking admin screenshots: ${err.message}`);
  }

  await browser.close();
  console.log('--- Finished taking screenshots ---');
}

run().catch(console.error);
