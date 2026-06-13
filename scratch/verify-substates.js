const { chromium } = require('playwright');
const path = require('path');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app';
const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/3e7ef49d-8c4e-42f2-b4da-2f480a7bed61';

async function run() {
  console.log('Starting custom substates check...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  // 1. Load AS portal and select AS 1
  console.log('Navigating to standards portal...');
  await page.goto(`${SITE_URL}/standards/as`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(3000);

  console.log('Clicking AS 1 standard in sidebar...');
  // Find button containing text "AS 1"
  await page.click('button:has-text("AS 1")');
  await page.waitForTimeout(2000);
  
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'sub_as1_standard.png'), fullPage: true });
  console.log('Saved sub_as1_standard.png');

  // 2. Click Lecture tab
  console.log('Clicking Lecture button...');
  await page.click('button:has-text("Lecture")');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'sub_as1_lecture.png'), fullPage: true });
  console.log('Saved sub_as1_lecture.png');

  // 3. Click PDF View tab
  console.log('Clicking PDF View button...');
  await page.click('button:has-text("PDF View")');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'sub_as1_pdf.png'), fullPage: true });
  console.log('Saved sub_as1_pdf.png');

  // 4. Click Page 2 in PDF
  console.log('Clicking next page button in PDF viewer...');
  // Select button next to "Page 1 / 3"
  await page.click('span:has-text("Page 1 / 3") ~ button');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'sub_as1_pdf_page2.png'), fullPage: true });
  console.log('Saved sub_as1_pdf_page2.png');

  // 5. Navigate to Ind AS portal and select Ind AS 1
  console.log('Navigating to Ind AS portal...');
  await page.goto(`${SITE_URL}/standards/ind-as`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(3000);

  console.log('Clicking Ind AS 1 standard in sidebar...');
  await page.click('button:has-text("Ind AS 1")');
  await page.waitForTimeout(2000);

  console.log('Clicking PDF View button in Ind AS 1...');
  await page.click('button:has-text("PDF View")');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'sub_indas1_pdf.png'), fullPage: true });
  console.log('Saved sub_indas1_pdf.png');

  await browser.close();
  console.log('Custom substates check complete.');
}

run().catch(console.error);
