const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app/standards/as';
const OUT_DIR = 'D:\\My Accounts';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log('Navigating to live URL: ' + BASE_URL);
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await sleep(5000);

  const title = await page.title();
  console.log('Page Title:', title);

  const ids = await page.evaluate(() =>
    Array.from(document.querySelectorAll('[id^="as1-"]')).map(e => e.id)
  );
  console.log('Sections found:', ids.length);
  if (!ids.length) { 
    console.log('FAIL: No AS 1 sections found. The page might not have loaded correctly or is still deploying.'); 
    await browser.close(); 
    return; 
  }

  // Expand any collapsed accordions by clicking them all
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
    console.log(`\n[${sec.file}]...`);
    const locator = page.locator(`#${sec.id}`);
    try {
      await locator.scrollIntoViewIfNeeded({ timeout: 5000 });
      await sleep(1000);
      
      const box = await locator.boundingBox();
      console.log(`  BoundingBox: x=${box?.x} y=${box?.y} w=${box?.width} h=${box?.height}`);
      
      await page.screenshot({ path: path.join(OUT_DIR, sec.file + '.png') });
      
      const topY = 200;
      const check = await page.evaluate((y) => {
        const el = document.elementFromPoint(825, y);
        return el ? (el.innerText || el.textContent || '').substring(0, 100).replace(/\n/g, ' ') : 'none';
      }, topY);
      console.log(`  Content at top: "${check}"`);
      console.log('  SAVED');
    } catch (e) {
      console.log(`  ERROR: ${e.message}`);
    }
  }

  // TOC bar screenshot (at scroll 0)
  console.log('\n[02_Contents] TOC strip...');
  const tocLoc = page.locator('#as1-sticky-toc');
  try {
    await tocLoc.scrollIntoViewIfNeeded({ timeout: 5000 });
    await sleep(1000);
    await tocLoc.screenshot({ path: path.join(OUT_DIR, '02_Contents.png') });
    console.log('  Saved TOC element screenshot');
  } catch (e) {
    console.log(`  ERROR taking TOC screenshot: ${e.message}`);
  }

  // Final summary
  console.log('\n══════════════════════════════════');
  const allFiles = ['01_Cover_Page','02_Contents','03_Scope_Applicability','04_Definitions',
    '05_Diversity_Areas','06_Selection_Considerations','07_Prudence_Substance_Materiality',
    '08_Fundamental_Assumptions','09_Manner_of_Disclosure','10_Changes_in_Accounting_Policies',
    '11_Para23','12_Statutory_Footnotes'];
  for (const f of allFiles) {
    const p = path.join(OUT_DIR, f + '.png');
    const ok = fs.existsSync(p);
    const kb = ok ? Math.round(fs.statSync(p).size / 1024) + 'KB' : 'MISSING';
    console.log(`  [${ok?'OK':'FAIL'}] ${f}.png — ${kb}`);
  }
  console.log('══════════════════════════════════');
  await browser.close();
  console.log('DONE');
})();
