const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:3000/standards/learning?standard=as1&tab=standard';
const OUT_DIR = 'D:\\My Accounts';

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log('Navigating...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(4000); // Give React time to fully hydrate

  // Debug: List all element IDs that start with "as1-"
  const allIds = await page.evaluate(() => {
    const els = document.querySelectorAll('[id^="as1-"]');
    return Array.from(els).map(el => el.id);
  });
  console.log('Found as1- elements in DOM:', allIds);

  // Also check what tab is currently active and what content is rendered
  const pageTitle = await page.evaluate(() => document.title);
  console.log('Page title:', pageTitle);
  
  const bodyText = await page.evaluate(() => {
    const main = document.querySelector('main') || document.body;
    return main.innerText.substring(0, 200);
  });
  console.log('Body text preview:', bodyText);

  await browser.close();
})();
