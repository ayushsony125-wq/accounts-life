const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app/standards/as?selected=as-1';
const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/990b0c71-333d-4e0a-8054-4eed28bae673';

async function run() {
  console.log('=== RUNNING INTERACTIVE TOC & OPACITY AUDIT ===');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set window size
  await page.setViewportSize({ width: 1440, height: 900 });
  
  console.log(`Navigating to: ${SITE_URL}`);
  await page.goto(SITE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000); // Allow full hydration

  const chapters = [
    { id: 'overview',     title: 'Introduction' },
    { id: 'scope',        title: 'Scope' },
    { id: 'definition',   title: 'Definition of Policies' },
    { id: 'areas',        title: 'Areas of Diversity' },
    { id: 'selection',    title: 'Selection Considerations' },
    { id: 'assumptions',  title: 'Fundamental Assumptions' },
    { id: 'disclosure',   title: 'Disclosure Requirements' },
    { id: 'change-policy',title: 'Changes in Policies' },
    { id: 'footnotes',    title: 'Statutory Footnotes' }
  ];

  const results = [];

  // Check Opacity and Background of the TOC bar
  const tocStyle = await page.evaluate(() => {
    const el = document.getElementById('as1-sticky-toc');
    if (!el) return null;
    const computed = window.getComputedStyle(el);
    return {
      backgroundColor: computed.backgroundColor,
      opacity: computed.opacity,
      backdropFilter: computed.backdropFilter,
      zIndex: computed.zIndex,
      position: computed.position,
      top: computed.top
    };
  });
  console.log('TOC Bar Style:', tocStyle);

  // Scroll to different positions first to see if content gets hidden
  console.log('Testing scrolling opacity...');
  for (let i = 0; i < chapters.length; i++) {
    const chap = chapters[i];
    
    // Get stats before click
    const beforeStats = await page.evaluate(() => {
      const container = document.getElementById('as1-scroll-container');
      return container ? { scrollTop: container.scrollTop } : null;
    });

    console.log(`\nClicking button: ${chap.title} (id: ${chap.id})`);
    
    // Take "before click" screenshot
    const beforePicName = `s_v2_click_${i + 1}_before_${chap.id}.png`;
    await page.screenshot({ path: path.join(ARTIFACT_DIR, beforePicName) });

    // Click the button
    await page.click(`button[data-toc-id="${chap.id}"]`);
    await page.waitForTimeout(2000); // Wait for scroll and observer to settle

    // Get coordinates and active state
    const afterStats = await page.evaluate((id) => {
      const container = document.getElementById('as1-scroll-container');
      const target = document.getElementById(`as1-${id}`);
      const stickyToc = document.getElementById('as1-sticky-toc');
      const btn = document.querySelector(`button[data-toc-id="${id}"]`);

      if (!container || !target || !stickyToc || !btn) {
        return { error: 'Elements missing' };
      }

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const tocRect = stickyToc.getBoundingClientRect();
      const isActive = btn.className.includes('bg-indigo-600') || btn.className.includes('bg-indigo-500');

      return {
        scrollTopAfter: container.scrollTop,
        targetTopScreenY: targetRect.top,
        tocBottomScreenY: tocRect.bottom,
        isActive: isActive
      };
    }, chap.id);

    // Take "after click" screenshot
    const afterPicName = `s_v2_click_${i + 1}_after_${chap.id}.png`;
    await page.screenshot({ path: path.join(ARTIFACT_DIR, afterPicName) });

    const beforeScroll = beforeStats ? beforeStats.scrollTop : 0;
    const actualLandingOffset = afterStats.targetTopScreenY - afterStats.tocBottomScreenY;
    const isPass = Math.abs(actualLandingOffset) <= 5.0 || (chap.id === 'footnotes' && actualLandingOffset < 30);

    results.push({
      chapter: chap.title,
      id: chap.id,
      url: SITE_URL,
      beforeScroll: parseFloat(beforeScroll.toFixed(2)),
      afterScroll: parseFloat(afterStats.scrollTopAfter.toFixed(2)),
      targetHeadingTop: parseFloat(afterStats.targetTopScreenY.toFixed(2)),
      actualLandingCoord: parseFloat(afterStats.tocBottomScreenY.toFixed(2)),
      offset: parseFloat(actualLandingOffset.toFixed(2)),
      isActive: afterStats.isActive,
      status: isPass ? 'PASS' : 'FAIL',
      beforeScreenshot: beforePicName,
      afterScreenshot: afterPicName
    });

    console.log(`Result for ${chap.title}:`, results[results.length - 1]);
  }

  // Save the results JSON to artifacts as well for reference
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'toc_audit_results.json'), JSON.stringify({ tocStyle, results }, null, 2));

  await browser.close();
  console.log('=== DONE ===');
}

run().catch(console.error);
