/**
 * Visual audit script — captures screenshots of every key area on the live AS 1 portal.
 * Saves each screenshot to the artifacts directory for inspection.
 */
const { chromium } = require('playwright');
const path = require('path');

const BASE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app';
const ARTS = 'C:\\Users\\ayush\\.gemini\\antigravity\\brain\\3e7ef49d-8c4e-42f2-b4da-2f480a7bed61';

async function shot(page, name) {
  const p = path.join(ARTS, `audit_${name}.png`);
  await page.screenshot({ path: p, fullPage: false });
  console.log(`📸 ${name} -> ${p}`);
  return p;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page = await ctx.newPage();

  try {
    // === AS 1 ===
    console.log('\n=== AS 1 VISUAL AUDIT ===');
    await page.goto(`${BASE_URL}/standards/as?selected=as-1`, { waitUntil: 'networkidle', timeout: 40000 });
    await page.waitForTimeout(2500);

    // 1. Full page — Standard tab
    await page.screenshot({ path: path.join(ARTS, 'audit_01_as1_standard_full.png'), fullPage: true });
    console.log('📸 01 - AS1 Standard tab (full page)');

    // 2. Sidebar close-up
    await page.locator('aside').screenshot({ path: path.join(ARTS, 'audit_02_as1_sidebar.png') });
    console.log('📸 02 - AS1 Sidebar');

    // 3. Main content area top
    await page.setViewportSize({ width: 1400, height: 900 });
    await shot(page, '03_as1_standard_content_top');

    // 4. Scroll down to see PdfRef buttons
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(400);
    await shot(page, '04_as1_pdfref_buttons');

    // 5. Scroll further — more content
    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.waitForTimeout(400);
    await shot(page, '05_as1_content_mid');

    // 6. Examples & Case Law tab
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.click('button:has-text("Examples & Case Law")');
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(ARTS, 'audit_06_as1_examples_full.png'), fullPage: true });
    console.log('📸 06 - AS1 Examples & Case Law (full page)');

    // 7. Check if "Important Questions" button exists in sidebar
    const impQ = await page.locator('aside button:has-text("Important Questions")').count();
    console.log(`\n🔍 Important Questions button in sidebar: ${impQ > 0 ? '❌ FOUND (should be gone)' : '✅ NOT found (correct)'}`);

    // 8. Check if ToC exists
    const toc = await page.locator('text="Table of Contents"').count();
    console.log(`🔍 Right-side ToC: ${toc > 0 ? '❌ STILL PRESENT' : '✅ Removed'}`);

    // 9. Count PdfRef buttons
    await page.click('button:has-text("Standard")');
    await page.waitForTimeout(800);
    const refs = await page.locator('button[title^="Open ICAI AS 1 PDF"]').count();
    console.log(`🔍 PdfRef buttons on Standard tab: ${refs}`);

    // 10. PDF View tab
    await page.click('button:has-text("PDF View")');
    await page.waitForTimeout(2500);
    await shot(page, '07_as1_pdf_view');
    const iframeSrc = await page.getAttribute('iframe', 'src').catch(() => null);
    console.log(`🔍 PDF iframe src: ${iframeSrc}`);

    // 11. Click a PdfRef — go back to Standard first
    await page.click('button:has-text("Standard")');
    await page.waitForTimeout(800);
    // Click the very first PdfRef button
    const firstRef = page.locator('button[title^="Open ICAI AS 1 PDF"]').first();
    const refTitle = await firstRef.getAttribute('title');
    console.log(`🔍 First PdfRef title: "${refTitle}"`);
    await firstRef.click();
    await page.waitForTimeout(1500);
    await shot(page, '08_as1_pdf_after_pdfref_click');
    const iframeSrcAfter = await page.getAttribute('iframe', 'src').catch(() => null);
    console.log(`🔍 PDF iframe src after PdfRef click: ${iframeSrcAfter}`);

    // 12. Lecture tab
    await page.click('button:has-text("Standard")');
    await page.waitForTimeout(500);
    await page.click('button:has-text("Lecture")');
    await page.waitForTimeout(3500);
    await shot(page, '09_as1_lecture_tab');
    const ytIframe = await page.locator('iframe[src*="youtube.com"]').count();
    console.log(`🔍 YouTube iframe present: ${ytIframe > 0 ? '✅ YES' : '❌ NO'}`);

    // === Ind AS 1 ===
    console.log('\n=== Ind AS 1 VISUAL AUDIT ===');
    await page.goto(`${BASE_URL}/standards/ind-as?selected=ind-as-1`, { waitUntil: 'networkidle', timeout: 40000 });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: path.join(ARTS, 'audit_10_indas1_standard_full.png'), fullPage: true });
    console.log('📸 10 - IndAS1 Standard tab (full page)');
    await page.locator('aside').screenshot({ path: path.join(ARTS, 'audit_11_indas1_sidebar.png') });
    console.log('📸 11 - IndAS1 Sidebar');

    const impQIndAS = await page.locator('aside button:has-text("Important Questions")').count();
    console.log(`🔍 Ind AS - Important Questions in sidebar: ${impQIndAS > 0 ? '❌ FOUND' : '✅ NOT found'}`);

    console.log('\n✅ Visual audit complete. All screenshots saved.');
  } catch (e) {
    console.error('Audit error:', e.message);
    await page.screenshot({ path: path.join(ARTS, 'audit_ERROR.png'), fullPage: true });
  } finally {
    await browser.close();
  }
})();
