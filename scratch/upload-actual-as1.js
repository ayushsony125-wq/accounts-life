const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app';
const pdfPath = path.join(__dirname, '../public/pdfs/as-1.pdf');

if (!fs.existsSync(pdfPath)) {
  console.error(`Error: File not found at ${pdfPath}`);
  process.exit(1);
}

async function upload() {
  console.log(`Starting E2E upload of actual AS 1 PDF (${pdfPath})...`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 950 });

  try {
    console.log('Navigating to admin login...');
    await page.goto(`${SITE_URL}/admin/login`, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(1000);
    
    console.log('Switching to Admin Login tab...');
    await page.click('button:has-text("Admin Login")');
    await page.waitForTimeout(500);

    console.log('Entering password...');
    await page.fill('#password-input', 'Ak@993102');
    await page.click('button[type="submit"]');
    
    await page.waitForURL('**/admin', { timeout: 30000 });
    console.log('Login successful.');
    await page.waitForTimeout(1000);

    console.log('Selecting standard AS 1...');
    await page.selectOption('select', 'as-1');
    await page.waitForTimeout(500);

    console.log('Setting file payload...');
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click('label[for="direct-pdf-file-picker"]');
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(pdfPath);
    await page.waitForTimeout(1000);

    console.log('Clicking upload...');
    await page.click('button:has-text("Upload & Map PDF")');
    
    console.log('Waiting for success...');
    await page.waitForSelector('text=Upload Successful', { timeout: 40000 });
    const successText = await page.innerText('div:has-text("Upload Successful")');
    console.log(`Upload Result: ${successText.replace(/\n/g, ' ')}`);

    console.log('PDF upload and mapping successful!');
  } catch (err) {
    console.error('Upload failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

upload().catch(console.error);
