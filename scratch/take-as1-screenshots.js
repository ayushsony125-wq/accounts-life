const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/990b0c71-333d-4e0a-8054-4eed28bae673/';

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const url = 'http://localhost:3000/standards/as?selected=as-1';
  console.log(`Navigating to ${url}...`);
  
  // Try up to 3 times in case the server is compiling pages
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

  // Take first screenshot: Top of the page (Overview and Navigation)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  const path1 = path.join(OUT_DIR, 'as1_top_overview.png');
  await page.screenshot({ path: path1 });
  console.log(`Saved screenshot 1: ${path1}`);

  // Take second screenshot: Scroll to Selection considerations (Prudence table)
  const prudenceEl = await page.$('#as1-prudence');
  if (prudenceEl) {
    const box = await prudenceEl.boundingBox();
    await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 100)), box.y);
    await page.waitForTimeout(1000);
    const path2 = path.join(OUT_DIR, 'as1_prudence_table.png');
    await page.screenshot({ path: path2 });
    console.log(`Saved screenshot 2: ${path2}`);
  } else {
    console.log('Could not find #as1-prudence element');
  }

  // Take third screenshot: Scroll to Assumptions and flowchart
  const assumptionsEl = await page.$('#as1-assumptions');
  if (assumptionsEl) {
    const box = await assumptionsEl.boundingBox();
    await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 100)), box.y);
    await page.waitForTimeout(1000);
    const path3 = path.join(OUT_DIR, 'as1_assumptions_flowchart.png');
    await page.screenshot({ path: path3 });
    console.log(`Saved screenshot 3: ${path3}`);
  } else {
    console.log('Could not find #as1-assumptions element');
  }

  // Take fourth screenshot: Scroll to Para 23 and Wrong treatment correction warning
  const para23El = await page.$('#as1-para23');
  if (para23El) {
    const box = await para23El.boundingBox();
    await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 100)), box.y);
    await page.waitForTimeout(1000);
    const path4 = path.join(OUT_DIR, 'as1_para23_warning.png');
    await page.screenshot({ path: path4 });
    console.log(`Saved screenshot 4: ${path4}`);
  } else {
    console.log('Could not find #as1-para23 element');
  }

  // Take fifth screenshot: Scroll to Comparison table AS 1 vs Ind AS 1
  const comparisonEl = await page.$('#as1-comparison');
  if (comparisonEl) {
    const box = await comparisonEl.boundingBox();
    await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 100)), box.y);
    await page.waitForTimeout(1000);
    const path5 = path.join(OUT_DIR, 'as1_comparison_table.png');
    await page.screenshot({ path: path5 });
    console.log(`Saved screenshot 5: ${path5}`);
  } else {
    console.log('Could not find #as1-comparison element');
  }

  // Take sixth screenshot: Scroll to Case Studies
  const examFocusEl = await page.$('#as1-exam-focus');
  if (examFocusEl) {
    const box = await examFocusEl.boundingBox();
    await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 100)), box.y);
    await page.waitForTimeout(1000);
    const path6 = path.join(OUT_DIR, 'as1_case_studies.png');
    await page.screenshot({ path: path6 });
    console.log(`Saved screenshot 6: ${path6}`);
  } else {
    console.log('Could not find #as1-exam-focus element');
  }

  await browser.close();
  console.log('All screenshots completed successfully!');
}

run().catch(err => {
  console.error('Screenshot task failed:', err);
  process.exit(1);
});
