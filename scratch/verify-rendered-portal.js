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

    // 3. Verify Examples & Case Law Tab
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
    console.log('✅ Examples & Case Law tab content verification passed.');

    // 4. Verify Important Questions Tab
    console.log('Clicking "Important Questions" sub-menu...');
    await page.click('button:has-text("Important Questions")');
    await page.waitForTimeout(1000);
    const faqsContent = await page.textContent('body');
    const hasFaq1 = faqsContent.includes('What are the three fundamental accounting assumptions');
    const hasFaq3 = faqsContent.includes('What are the major considerations');
    console.log(`Has FAQ 1: ${hasFaq1}, Has FAQ 3: ${hasFaq3}`);
    if (!hasFaq1 || !hasFaq3) {
      throw new Error('Important Questions tab is missing our new FAQs!');
    }
    console.log('✅ Important Questions tab content verification passed.');

    // 5. Verify PDF View
    console.log('Clicking "PDF View" tab...');
    await page.click('button:has-text("PDF View")');
    await page.waitForTimeout(2000);
    const iframeSrc = await page.getAttribute('iframe', 'src');
    console.log('Iframe PDF Src:', iframeSrc);
    if (!iframeSrc || (!iframeSrc.includes('/api/pdfs/as-1') && !iframeSrc.includes('/pdfs/as-1'))) {
      throw new Error('PDF View is not rendering the correct PDF route! Got: ' + iframeSrc);
    }
    console.log('✅ PDF View verification passed (src:', iframeSrc, ').');

    // 6. Verify Lecture Video Player
    // The Lecture button only appears when standard/examples/faqs tab is active.
    // After clicking PDF View, we must return to Standard first.
    console.log('Navigating back to Standard tab to reveal Lecture button...');
    await page.click('button:has-text("Standard")');
    await page.waitForTimeout(800);
    console.log('Clicking "Lecture" tab...');
    await page.click('button:has-text("Lecture")');
    await page.waitForTimeout(3000);
    // AS 1 uses YouTube iframe embed
    const hasYouTubeIframe = await page.locator('iframe[src*="youtube.com/embed"]').count() > 0;
    const hasNativeVideo = await page.locator('video').count() > 0;
    console.log('YouTube iframe present:', hasYouTubeIframe, '| Native Video present:', hasNativeVideo);
    if (!hasYouTubeIframe && !hasNativeVideo) {
      throw new Error('Lecture tab: Neither YouTube iframe nor native video found!');
    }
    console.log('✅ Lecture Video Player verification passed. YouTube iframe:', hasYouTubeIframe);

    console.log('🎉 ALL UI TESTS COMPLETED SUCCESSFULLY! AS 1 IS FULLY REBUILT AND VERIFIED LIVE.');

    // Take screenshot of the portal
    const screenshotPath = 'C:\\Users\\ayush\\.gemini\\antigravity\\brain\\3e7ef49d-8c4e-42f2-b4da-2f480a7bed61\\as1_learning_portal.png';
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved to ${screenshotPath}`);

  } catch (err) {
    console.error('Verification failed:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})().catch(console.error);
