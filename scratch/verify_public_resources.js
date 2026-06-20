const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app';
const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/d66d11ee-abbd-4673-b8af-1ccd6f3745b9';

async function main() {
  console.log('=== PUBLIC WEBSITE END-TO-END RESOURCE VERIFICATION ===\n');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const testCases = [
    { slug: 'as-1', type: 'as', hasPdf: true, hasVideo: true },
    { slug: 'as-2', type: 'as', hasPdf: true, hasVideo: true },
    { slug: 'as-3', type: 'as', hasPdf: true, hasVideo: true },
    { slug: 'ind-as-1', type: 'ind-as', hasPdf: true, hasVideo: true }
  ];

  const results = [];

  for (const tc of testCases) {
    const url = `${SITE_URL}/standards/${tc.type}?selected=${tc.slug}`;
    console.log(`\nNavigating to: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    const recordResult = { slug: tc.slug, pdfWorks: 'No', videoWorks: 'No' };

    // 1. Verify PDF Tab & Source
    if (tc.hasPdf) {
      console.log(`Checking PDF Tab for ${tc.slug}...`);
      const pdfBtn = await page.$('button:has-text("PDF View")');
      if (pdfBtn) {
        console.log(`  Clicking "PDF View" tab...`);
        await pdfBtn.click();
        await page.waitForTimeout(2000);

        // Check if iframe was rendered
        const iframe = await page.$(`iframe[title*="PDF View"]`);
        if (iframe) {
          const src = await iframe.getAttribute('src');
          console.log(`  ✓ Found PDF iframe pointing to: ${src}`);

          // Now verify the PDF endpoint returns 200/300
          const pdfUrl = src.startsWith('http') ? src : `${SITE_URL}${src}`;
          const newPage = await browser.newPage();
          try {
            const res = await newPage.goto(pdfUrl, { timeout: 15000 });
            const status = res.status();
            console.log(`  ✓ PDF API returned status: ${status}`);
            if (status === 200 || (status >= 300 && status < 400)) {
              recordResult.pdfWorks = 'Yes';
            }
          } catch (e) {
            console.log(`  ❌ PDF API request failed: ${e.message}`);
          } finally {
            await newPage.close();
          }
        } else {
          console.log(`  ❌ PDF iframe NOT found after click!`);
        }

        // Switch back to Standard tab
        const stdBtn = await page.$('button:has-text("Standard")');
        if (stdBtn) await stdBtn.click();
        await page.waitForTimeout(1000);
      } else {
        console.log(`  ❌ "PDF View" button NOT found!`);
      }
    }

    // 2. Verify Video Tab & Source
    if (tc.hasVideo) {
      console.log(`Checking Video Tab for ${tc.slug}...`);
      const lectureBtn = await page.$('button:has-text("Lecture")');
      if (lectureBtn) {
        console.log(`  Clicking "Lecture" tab...`);
        await lectureBtn.click();
        await page.waitForTimeout(2000);

        // Check if video element or iframe is present
        const videoIframe = await page.$('iframe[src*="youtube.com"], iframe[src*="youtu.be"]');
        if (videoIframe) {
          const src = await videoIframe.getAttribute('src');
          console.log(`  ✓ Video player active: ${src}`);
          recordResult.videoWorks = 'Yes';
        } else {
          console.log(`  ❌ Video player iframe NOT found!`);
        }
      } else {
        console.log(`  ❌ "Lecture" button NOT found!`);
      }
    }

    results.push(recordResult);
  }

  console.log('\n=== FINAL VERIFICATION RESULTS ===');
  console.log(JSON.stringify(results, null, 2));

  fs.writeFileSync(
    path.join(ARTIFACT_DIR, 'public_resources_results.json'),
    JSON.stringify(results, null, 2)
  );

  await browser.close();
}

main().catch(console.error);
