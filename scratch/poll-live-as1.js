const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const TARGET_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app/standards/as?selected=as-1';
const OUT_DIR = 'D:\\My Accounts';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const maxRetries = 20; // 20 * 15s = 5 minutes
  let success = false;

  console.log(`Polling ${TARGET_URL} for new deployment containing #as1-overview...`);

  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`[Attempt ${i + 1}] Navigating to ${TARGET_URL}...`);
      await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 30000 });
      await sleep(5000);

      // Check if #as1-overview exists in the DOM
      const hasOverview = await page.evaluate(() => {
        return !!document.getElementById('as1-overview');
      });

      console.log(`[Attempt ${i + 1}] #as1-overview found: ${hasOverview}`);

      if (hasOverview) {
        console.log('🎉 NEW DEPLOYMENT IS LIVE ON VERCEL!');
        success = true;
        break;
      }
    } catch (err) {
      console.log(`[Attempt ${i + 1}] failed:`, err.message);
    }
    await sleep(15000);
  }

  if (!success) {
    console.error('Timeout waiting for deployment to go live.');
    await browser.close();
    process.exit(1);
  }

  // Expand accordions
  await page.evaluate(() => {
    const accordions = document.querySelectorAll('details');
    accordions.forEach(d => { d.open = true; });
  });
  await sleep(1000);

  const SECTION_DEFS = [
    { file: '01_Cover_Page',                     id: 'as1-overview' },
    { file: '03_Scope_Applicability',            id: 'as1-scope' },
    { file: '04_Definitions',                    id: 'as1-definition' },
    { file: '05_Diversity_Areas',                id: 'as1-areas' },
    { file: '06_Selection_Considerations',       id: 'as1-selection' },
    { file: '07_Prudence_Substance_Materiality', id: 'as1-prudence' },
    { file: '08_Fundamental_Assumptions',        id: 'as1-assumptions' },
    { file: '09_Manner_of_Disclosure',           id: 'as1-disclosure' },
    { file: '10_Changes_in_Accounting_Policies', id: 'as1-change-policy' },
    { file: '11_Para23',                         id: 'as1-para23' },
    { file: '12_Statutory_Footnotes',            id: 'as1-footnotes' },
  ];

  for (const sec of SECTION_DEFS) {
    console.log(`Taking screenshot for section: ${sec.file}...`);
    const locator = page.locator(`#${sec.id}`);
    try {
      await locator.scrollIntoViewIfNeeded({ timeout: 5000 });
      await sleep(1000);
      await page.screenshot({ path: path.join(OUT_DIR, sec.file + '.png') });
      console.log(`  Saved ${sec.file}.png`);
    } catch (e) {
      console.log(`  Error scrolling/taking screenshot for ${sec.file}: ${e.message}`);
    }
  }

  // TOC Element screenshot
  console.log('Taking screenshot for TOC strip...');
  const tocLoc = page.locator('#as1-sticky-toc');
  try {
    await tocLoc.scrollIntoViewIfNeeded({ timeout: 5000 });
    await sleep(1000);
    await tocLoc.screenshot({ path: path.join(OUT_DIR, '02_Contents.png') });
    console.log('  Saved 02_Contents.png');
  } catch (e) {
    console.log(`  Error taking TOC screenshot: ${e.message}`);
  }

  console.log('All live verification screenshots generated.');
  await browser.close();
  process.exit(0);
})().catch(e => {
  console.error(e.message);
  process.exit(1);
});
