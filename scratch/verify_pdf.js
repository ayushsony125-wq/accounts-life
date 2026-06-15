const { chromium } = require('playwright');
const path = require('path');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app';
const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/3e7ef49d-8c4e-42f2-b4da-2f480a7bed61';

async function run() {
  console.log(`Starting live PDF verification for AS-2 against: ${SITE_URL}`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  try {
    const url = `${SITE_URL}/standards/learning?selected=as-2`;
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 35000 });
    await page.waitForTimeout(3000);

    // Click the PDF tab button or the resource link
    console.log('Finding PDF tab or resource link...');
    const pdfTabButton = await page.$('button:has-text("PDF"), a:has-text("Official PDF Document")');
    if (pdfTabButton) {
      console.log('Clicking PDF trigger...');
      await pdfTabButton.click();
      await page.waitForTimeout(5000); // Wait for iframe to load PDF
    } else {
      console.log('PDF tab trigger not found directly. Checking page buttons...');
    }

    // Scroll to the iframe area or view
    const iframe = await page.$('iframe');
    if (iframe) {
      const src = await iframe.getAttribute('src');
      console.log(`Success: Found PDF iframe rendering src: ${src}`);
    } else {
      console.warn('Warning: PDF iframe element not found on page.');
    }

    // Capture screenshot of the PDF view
    const filepath = path.join(ARTIFACT_DIR, 'prod_as2_pdf_view.png');
    await page.screenshot({ path: filepath });
    console.log(`Saved screenshot to: ${filepath}`);
  } catch (err) {
    console.error(`Error verifying PDF: ${err.message}`);
  } finally {
    await browser.close();
  }
}

run();
