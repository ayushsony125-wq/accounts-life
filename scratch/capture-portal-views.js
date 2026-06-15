const { chromium } = require('playwright');
const path = require('path');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app';
const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/3e7ef49d-8c4e-42f2-b4da-2f480a7bed61';

async function capture() {
  const browser = await chromium.launch({ headless: true });
  
  const viewports = [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 }
  ];

  for (const vp of viewports) {
    console.log(`\nCapturing views for viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    
    // Create isolated context for each viewport to ensure proper layout initialization
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      userAgent: vp.name === 'mobile' 
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
        : undefined
    });
    const page = await context.newPage();

    // 1. Capture Main Lecture/Standard View
    await page.goto(`${SITE_URL}/standards/learning?framework=as&selected=as-1`, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(3000);
    
    const lecturePath = path.join(ARTIFACT_DIR, `audit_portal_${vp.name}_lecture.png`);
    await page.screenshot({ path: lecturePath, fullPage: vp.name !== 'desktop' });
    console.log(`Saved: audit_portal_${vp.name}_lecture.png`);

    // 2. Click "PDF View" tab
    console.log(`Clicking PDF View tab on ${vp.name}...`);
    // Wait for text PDF View or select button
    const pdfViewTab = page.locator('text=PDF View');
    if (await pdfViewTab.count() > 0) {
      await pdfViewTab.click();
      await page.waitForTimeout(4000);
      
      const pdfPath = path.join(ARTIFACT_DIR, `audit_portal_${vp.name}_pdf_view.png`);
      await page.screenshot({ path: pdfPath, fullPage: vp.name !== 'desktop' });
      console.log(`Saved: audit_portal_${vp.name}_pdf_view.png`);
    } else {
      console.warn(`PDF View tab button not found on ${vp.name}`);
    }

    await context.close();
  }

  await browser.close();
  console.log('\nPortal screenshot capture complete!');
}

capture().catch(console.error);
