const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app';
const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/3e7ef49d-8c4e-42f2-b4da-2f480a7bed61';

async function run() {
  console.log(`Verifying live website at: ${SITE_URL}`);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  // 1. Load homepage and check header navigation for 'Accounts'
  console.log('Navigating to homepage...');
  await page.goto(SITE_URL, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Check the Accounts link href
  console.log('Checking Accounts header navigation href...');
  const headerAccountsLink = await page.evaluate(() => {
    // Look for link with text 'Accounts' in header
    const links = Array.from(document.querySelectorAll('header a, nav a'));
    const accLink = links.find(el => el.textContent.trim().startsWith('Accounts'));
    if (accLink) {
      return {
        text: accLink.textContent.trim(),
        href: accLink.getAttribute('href')
      };
    }
    return null;
  });
  console.log('Header Accounts Link Result:', headerAccountsLink);

  // Take homepage screenshot
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'live_homepage.png'), fullPage: false });
  console.log('Saved live_homepage.png');

  // 2. Load /accounts page directly and take screenshot
  console.log('Navigating to /accounts directly...');
  try {
    const response = await page.goto(`${SITE_URL}/accounts`, { waitUntil: 'load', timeout: 30000 });
    const status = response ? response.status() : 'No response';
    console.log(`Live /accounts status code: ${status}`);
    await page.waitForTimeout(3000);
    
    // Check if some specific texts exist on this page
    const pageContent = await page.evaluate(() => {
      return {
        title: document.title,
        h1: document.querySelector('h1')?.textContent?.trim() || 'None',
        hasScheduleIII: document.body.textContent.includes('Schedule III'),
        hasCoreLearning: document.body.textContent.includes('Core Learning Areas'),
        hasAdvancedSpecialized: document.body.textContent.includes('Advanced & Specialized') || document.body.textContent.includes('Advanced &amp; Specialized'),
        firstCardText: document.querySelector('h3, h2, a')?.textContent?.trim() || 'None'
      };
    });
    console.log('Live /accounts page content analysis:', pageContent);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'live_accounts_page.png'), fullPage: true });
    console.log('Saved live_accounts_page.png');
  } catch (e) {
    console.error('Failed to load /accounts:', e.message);
  }

  // 3. Load /foundations directly
  console.log('Navigating to /foundations directly...');
  try {
    const response = await page.goto(`${SITE_URL}/foundations`, { waitUntil: 'load', timeout: 30000 });
    const status = response ? response.status() : 'No response';
    console.log(`Live /foundations status: ${status}`);
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'live_foundations_page.png'), fullPage: true });
    console.log('Saved live_foundations_page.png');
  } catch (e) {
    console.error('Failed to load /foundations:', e.message);
  }

  await browser.close();
}

run().catch(console.error);
