const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app/standards/as?selected=as-1';
const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/990b0c71-333d-4e0a-8054-4eed28bae673';

async function main() {
  console.log('=== VERIFYING LIVE EXAMPLES & CASE LAW MODULE ===');
  if (!fs.existsSync(ARTIFACT_DIR)) {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  }

  // Launch browser
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log(`Navigating to: ${SITE_URL}`);
  await page.goto(SITE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(6000); // Wait for the page/assets to fully load

  // Click on "Examples & Case Law" tab
  console.log('Clicking on Examples & Case Law tab...');
  const tabButton = page.locator('button:has-text("Examples & Case Law")');
  await tabButton.click();
  await page.waitForTimeout(3000); // Wait for transition animation

  // 1. Verify "SECTION INDEX — QUICK NAVIGATION" is removed
  const pageText = await page.innerText('body');
  const hasQuickNavText = pageText.includes('SECTION INDEX — QUICK NAVIGATION') || pageText.includes('Section Index — Quick Navigation');
  console.log(`\nVerification: "SECTION INDEX — QUICK NAVIGATION" absent? ${!hasQuickNavText ? 'PASS' : 'FAIL'}`);

  // 2. Verify Examples Sub-Navbar buttons exist
  const exampleChapters = [
    { id: 'icai-illustrations', title: 'ICAI Illustrations' },
    { id: 'business-examples',  title: 'Practical Business Examples' },
    { id: 'audit-cases',       title: 'Audit Case Studies' },
    { id: 'regulatory-obs',    title: 'Regulatory Observations' },
    { id: 'legal-cases',       title: 'Landmark Judicial Cases' },
    { id: 'exam-oriented',     title: 'Exam-Oriented Corner' },
    { id: 'audit-notes',       title: 'Audit Notes & Reporting' }
  ];

  console.log('\nChecking Examples sub-navbar options:');
  for (const ch of exampleChapters) {
    const btn = page.locator(`#as1-examples-sticky-toc button:has-text("${ch.title}")`);
    const count = await btn.count();
    console.log(`- Button "${ch.title}" exists: ${count > 0 ? 'YES (PASS)' : 'NO (FAIL)'}`);
  }

  // 3. Take screenshots of different sections
  console.log('\nCapturing screenshots of the updated Examples & Case Law tab...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'examples_top.png') });
  console.log('Saved examples_top.png');

  // Let's perform a manual scroll coordinate test for each button
  console.log('\n=== T.O.C. BUTTON SCROLL COORDINATES AUDIT ===');
  const auditResults = [];

  for (const ch of exampleChapters) {
    // Get scroll position before
    const beforeScroll = await page.evaluate(() => {
      const container = document.getElementById('as1-scroll-container');
      return container ? container.scrollTop : 0;
    });

    // Click the button
    console.log(`Clicking TOC button: ${ch.title}`);
    const btn = page.locator(`#as1-examples-sticky-toc button:has-text("${ch.title}")`);
    await btn.click();
    await page.waitForTimeout(1500); // Wait for scroll animation

    // Get scroll position after and actual landing coordinates
    const auditInfo = await page.evaluate((chId) => {
      const container = document.getElementById('as1-scroll-container');
      const target = document.getElementById(`sec-${chId}`);
      if (!container || !target) return { err: 'Elements missing' };

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      
      const stickyToc = document.getElementById('as1-examples-sticky-toc');
      const stickyBottom = stickyToc ? stickyToc.getBoundingClientRect().bottom : 172.25;

      return {
        scrollTopAfter: container.scrollTop,
        targetTopInViewport: targetRect.top,
        stickyBottomInViewport: stickyBottom,
        delta: Math.abs(targetRect.top - stickyBottom)
      };
    }, ch.id);

    // Capture a screenshot of the scrolled state
    const screenshotName = `examples_${ch.id}_scrolled.png`;
    await page.screenshot({ path: path.join(ARTIFACT_DIR, screenshotName) });
    console.log(`Captured scrolled screenshot: ${screenshotName}`);

    if (auditInfo.err) {
      auditResults.push({
        title: ch.title,
        before: beforeScroll,
        after: 'N/A',
        targetTop: 'N/A',
        landing: 'N/A',
        status: 'FAIL (Elements missing)'
      });
    } else {
      const isPass = auditInfo.delta < 5;
      auditResults.push({
        title: ch.title,
        before: beforeScroll,
        after: auditInfo.scrollTopAfter,
        targetTop: auditInfo.targetTopInViewport.toFixed(2),
        landing: auditInfo.stickyBottomInViewport.toFixed(2),
        status: isPass ? 'PASS' : 'FAIL'
      });
    }
  }

  // Print results table
  console.log('\n========================================================================');
  console.log('TOC Navigation Audit Results Table:');
  console.log('========================================================================');
  console.log('Option Name | Scroll Before | Scroll After | Target Top | Landing Coord | Status');
  console.log('------------------------------------------------------------------------');
  for (const res of auditResults) {
    console.log(`${res.title.padEnd(25)} | ${String(res.before).padEnd(13)} | ${String(res.after).padEnd(12)} | ${String(res.targetTop).padEnd(10)} | ${String(res.landing).padEnd(13)} | ${res.status}`);
  }
  console.log('========================================================================');

  // Verify that illustrations contain all 10 parts
  console.log('\nChecking structural completeness of ICAI Illustration 3.1:');
  // Selector for span.rounded-full:not(.uppercase) inside #item-3-1
  const item31RowsCount = await page.locator('#item-3-1 span.rounded-full:not(.uppercase)').count();
  console.log(`Illustration 3.1 has ${item31RowsCount} serial-numbered structural elements (expected: 10)`);
  if (item31RowsCount === 10) {
    console.log('Illustration 3.1 structure: PASS');
  } else {
    console.log('Illustration 3.1 structure: FAIL');
  }

  await browser.close();
  console.log('=== VERIFICATION COMPLETED ===');
}

main().catch(console.error);
