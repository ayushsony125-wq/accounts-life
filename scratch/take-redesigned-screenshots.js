const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/990b0c71-333d-4e0a-8054-4eed28bae673/';

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 950 });

  const url = 'http://localhost:3000/standards/as?selected=as-1';
  console.log(`Navigating to ${url}...`);
  
  let loaded = false;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      loaded = true;
      break;
    } catch (err) {
      console.log(`Attempt ${attempt} failed: ${err.message}. Retrying in 5 seconds...`);
      await new Promise(r => setTimeout(r, 5000));
    }
  }

  if (!loaded) {
    throw new Error('Failed to load page after 3 attempts');
  }

  console.log('Page loaded. Waiting for compilation and hydration...');
  await page.waitForTimeout(6000); // Wait for hydration and compilation

  // Screenshot 1: Cover Header and Chapter 1
  console.log('Scrolling to top (Overview)...');
  const overviewEl = page.locator('#as1-overview');
  await overviewEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const path1 = path.join(OUT_DIR, 'redesigned_01_cover.png');
  await page.screenshot({ path: path1 });
  console.log(`Saved: ${path1}`);

  // Screenshot 2: Chapter 2 (Scope & Stakeholders Table)
  console.log('Scrolling to Scope...');
  const scopeEl = page.locator('#as1-scope');
  await scopeEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const path2 = path.join(OUT_DIR, 'redesigned_02_scope.png');
  await page.screenshot({ path: path2 });
  console.log(`Saved: ${path2}`);

  // Screenshot 3: Chapter 3 (Definitions & Estimates Table)
  console.log('Scrolling to Definitions...');
  const defEl = page.locator('#as1-definition');
  await defEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const path3 = path.join(OUT_DIR, 'redesigned_03_definitions.png');
  await page.screenshot({ path: path3 });
  console.log(`Saved: ${path3}`);

  // Screenshot 4: Chapter 4 (Key Areas of Diversity)
  console.log('Scrolling to Diversity Areas...');
  const areasEl = page.locator('#as1-areas');
  await areasEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const path4 = path.join(OUT_DIR, 'redesigned_04_diversity.png');
  await page.screenshot({ path: path4 });
  console.log(`Saved: ${path4}`);

  // Screenshot 5: Chapter 5 (Considerations & Prudence)
  console.log('Scrolling to Selection (Considerations)...');
  const selectionEl = page.locator('#as1-selection');
  await selectionEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const path5 = path.join(OUT_DIR, 'redesigned_05_considerations.png');
  await page.screenshot({ path: path5 });
  console.log(`Saved: ${path5}`);

  // Screenshot 6: Chapter 6 (Fundamental Assumptions Matrix)
  console.log('Scrolling to Assumptions...');
  const assumptionsEl = page.locator('#as1-assumptions');
  await assumptionsEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const path6 = path.join(OUT_DIR, 'redesigned_06_assumptions.png');
  await page.screenshot({ path: path6 });
  console.log(`Saved: ${path6}`);

  // Screenshot 7: Chapter 7 (Manner of Disclosure)
  console.log('Scrolling to Manner of Disclosure...');
  const disclosureEl = page.locator('#as1-disclosure');
  await disclosureEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const path7 = path.join(OUT_DIR, 'redesigned_07_manner.png');
  await page.screenshot({ path: path7 });
  console.log(`Saved: ${path7}`);

  // Screenshot 8: Chapter 8 (Changes Timeline & Para 23 Rule Box)
  console.log('Scrolling to Changes & Para 23...');
  const changeEl = page.locator('#as1-change-policy');
  await changeEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const path8 = path.join(OUT_DIR, 'redesigned_08_changes_para23.png');
  await page.screenshot({ path: path8 });
  console.log(`Saved: ${path8}`);

  // Screenshot 8b: Scroll specifically to Para 23 Precedent Box
  console.log('Scrolling specifically to Para 23 Precedent Box...');
  const paraEl = page.locator('#as1-para23');
  await paraEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const path8b = path.join(OUT_DIR, 'redesigned_08b_para23_box.png');
  await page.screenshot({ path: path8b });
  console.log(`Saved: ${path8b}`);

  // Screenshot 9: Chapter 9 (Statutory Footnotes)
  console.log('Scrolling to Footnotes...');
  const footnotesEl = page.locator('#as1-footnotes');
  await footnotesEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const path9 = path.join(OUT_DIR, 'redesigned_09_footnotes.png');
  await page.screenshot({ path: path9 });
  console.log(`Saved: ${path9}`);

  await browser.close();
  console.log('All redesigned screenshots completed successfully!');
}

run().catch(err => {
  console.error('Screenshot task failed:', err);
  process.exit(1);
});
