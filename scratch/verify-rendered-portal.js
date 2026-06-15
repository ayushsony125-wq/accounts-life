const { chromium } = require('playwright');

const LIVE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app/standards/as?selected=as-1';

(async () => {
  console.log('Launching browser to verify live UI...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 950 });

  try {
    console.log('Navigating to AS 1 portal URL:', LIVE_URL);
    await page.goto(LIVE_URL, { waitUntil: 'networkidle', timeout: 35000 });
    await page.waitForTimeout(2000);

    // 1. Verify Page Title
    const titleText = await page.innerText('h1');
    console.log(`UI Header Text: "${titleText}"`);
    if (!titleText.includes('AS 1')) {
      throw new Error('Title does not match AS 1!');
    }
    console.log('✅ Title verification passed.');

    // 2. Verify Standard Tab Content
    console.log('Checking Standard tab content...');
    const bodyContent = await page.textContent('body');
    const hasObjective = bodyContent.includes('promote better understanding');
    const hasPrudence = bodyContent.includes('Prudence');
    const hasSubstance = bodyContent.includes('Substance over Form');
    console.log(`Has Objective: ${hasObjective}, Has Prudence: ${hasPrudence}, Has Substance: ${hasSubstance}`);
    if (!hasObjective || !hasPrudence || !hasSubstance) {
      throw new Error('Standard tab content is missing the new rebuilt AS 1 sections!');
    }
    console.log('✅ Standard tab content verification passed.');

    // 3. Verify that right-side Table of Contents is GONE
    console.log('Checking that right-side ToC has been removed...');
    const tocContent = await page.locator('text="Table of Contents"').count();
    if (tocContent > 0) {
      throw new Error('Right-side Table of Contents still exists but should have been removed!');
    }
    console.log('✅ Right-side ToC removal verified.');

    // 4. Verify Important Questions is NOT in sidebar
    console.log('Checking sidebar does NOT have "Important Questions" button...');
    const impQuestionsBtn = await page.locator('aside button:has-text("Important Questions")').count();
    if (impQuestionsBtn > 0) {
      throw new Error('"Important Questions" button still visible in sidebar but should be removed!');
    }
    console.log('✅ Sidebar cleanup verified (no Important Questions button).');

    // 5. Verify PdfRef buttons (red-bordered page references) exist in Standard content
    console.log('Checking for PDF reference (PdfRef) buttons in Standard content...');
    // PdfRef buttons have title="Open ICAI AS 1 PDF — Page N"
    const pdfRefCount = await page.locator('button[title^="Open ICAI AS 1 PDF"]').count();
    console.log(`PdfRef buttons found: ${pdfRefCount}`);
    if (pdfRefCount < 5) {
      throw new Error(`Expected at least 5 PdfRef buttons in Standard content, found ${pdfRefCount}!`);
    }
    console.log('✅ PDF reference icons verified (' + pdfRefCount + ' found).');

    // 6. Verify Examples & Case Law Tab
    console.log('Clicking "Examples & Case Law" sub-menu...');
    await page.click('button:has-text("Examples & Case Law")');
    await page.waitForTimeout(1000);
    const examplesContent = await page.textContent('body');
    const hasA1 = examplesContent.includes('A1: Inventory Valuation Policy Change');
    const hasF17 = examplesContent.includes('F17: Q1 - FIFO to Weighted Average Method');
    console.log(`Has A1 Example: ${hasA1}, Has F17 Example: ${hasF17}`);
    if (!hasA1 || !hasF17) {
      throw new Error('Examples & Case Law tab is missing our new illustrations!');
    }
    console.log('✅ Examples & Case Law tab content verified.');

    // 7. Verify PDF View tab
    console.log('Navigating back to Standard tab first...');
    await page.click('button:has-text("Standard")');
    await page.waitForTimeout(500);
    console.log('Clicking "PDF View" tab...');
    await page.click('button:has-text("PDF View")');
    await page.waitForTimeout(2000);
    const iframeSrc = await page.getAttribute('iframe', 'src');
    console.log('Iframe PDF Src:', iframeSrc);
    if (!iframeSrc || (!iframeSrc.includes('/api/pdfs/as-1') && !iframeSrc.includes('/pdfs/as-1'))) {
      throw new Error('PDF View is not rendering the correct PDF route! Got: ' + iframeSrc);
    }
    console.log('✅ PDF View verified (src:', iframeSrc, ').');

    // 8. Verify Lecture Video Player
    console.log('Navigating back to Standard tab to reveal Lecture button...');
    await page.click('button:has-text("Standard")');
    await page.waitForTimeout(800);
    console.log('Clicking "Lecture" tab...');
    await page.click('button:has-text("Lecture")');
    await page.waitForTimeout(3000);
    const hasYouTubeIframe = await page.locator('iframe[src*="youtube.com/embed"]').count() > 0;
    const hasNativeVideo = await page.locator('video').count() > 0;
    console.log('YouTube iframe present:', hasYouTubeIframe, '| Native Video present:', hasNativeVideo);
    if (!hasYouTubeIframe && !hasNativeVideo) {
      throw new Error('Lecture tab: Neither YouTube iframe nor native video found!');
    }
    console.log('✅ Lecture Video Player verified. YouTube iframe:', hasYouTubeIframe);

    console.log('\n🎉 ALL UI TESTS PASSED! AS 1 portal is clean, professional & verified live.');

    // Take screenshot
    const screenshotPath = 'C:\\Users\\ayush\\.gemini\\antigravity\\brain\\3e7ef49d-8c4e-42f2-b4da-2f480a7bed61\\as1_clean_portal.png';
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved to ${screenshotPath}`);

  } catch (err) {
    console.error('Verification failed:', err.message);
    // Take failure screenshot
    const failPath = 'C:\\Users\\ayush\\.gemini\\antigravity\\brain\\3e7ef49d-8c4e-42f2-b4da-2f480a7bed61\\as1_fail.png';
    await page.screenshot({ path: failPath, fullPage: true });
    console.log(`Failure screenshot saved to ${failPath}`);
    process.exit(1);
  } finally {
    await browser.close();
  }
})().catch(console.error);
