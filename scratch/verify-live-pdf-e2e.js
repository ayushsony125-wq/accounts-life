const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app';
const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/3e7ef49d-8c4e-42f2-b4da-2f480a7bed61';

// Create a valid dummy PDF file for testing
function createDummyPdf() {
  const dummyPdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << >> /MediaBox [0 0 595 842] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 72 >>
stream
BT
/F1 12 Tf
72 712 Td
(Live Production E2E PDF Verification - ICAI/MCA Accounting Standard AS-1) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000222 00000 n 
trailer
<< /Size 5 /Root 1 0 R >>
startxref
343
%%EOF`;
  
  const pdfPath = path.join(__dirname, 'test-e2e-standard.pdf');
  fs.writeFileSync(pdfPath, dummyPdfContent);
  console.log(`Created dummy PDF at: ${pdfPath}`);
  return pdfPath;
}

async function runE2E() {
  console.log(`Starting E2E Live Verification against: ${SITE_URL}`);
  const dummyPdf = createDummyPdf();

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 950 });

  try {
    // 1. Log in to live admin panel
    console.log('Navigating to admin login...');
    await page.goto(`${SITE_URL}/admin/login`, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(1000);
    
    console.log('Switching to Admin Login tab...');
    await page.click('button:has-text("Admin Login")');
    await page.waitForTimeout(1000);

    console.log('Entering login credentials...');
    await page.fill('#password-input', 'Ak@993102');
    await page.click('button[type="submit"]');
    
    // Wait for redirect to /admin
    await page.waitForURL('**/admin', { timeout: 30000 });
    console.log('Successfully logged in. Navigating to CMS Dashboard...');
    await page.waitForTimeout(2000);

    // 2. Perform direct PDF upload to AS-1
    console.log('Selecting standard AS 1 for direct upload...');
    await page.selectOption('select', 'as-1');
    await page.waitForTimeout(500);

    console.log('Capturing empty upload section...');
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'prod_admin_upload_empty.png') });
    
    console.log('Selecting PDF file...');
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click('label[for="direct-pdf-file-picker"]');
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(dummyPdf);
    await page.waitForTimeout(1000);

    console.log('Capturing selected upload section...');
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'prod_admin_upload_selected.png') });

    console.log('Clicking upload button...');
    await page.click('button:has-text("Upload & Map PDF")');
    
    // Wait for success alert/message
    console.log('Waiting for successful upload status...');
    await page.waitForSelector('text=Upload Successful', { timeout: 30000 });
    const successText = await page.innerText('div:has-text("Upload Successful")');
    console.log(`Upload result: ${successText.replace(/\n/g, ' ')}`);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'prod_admin_upload_success.png') });

    // 3. Go to the Edit page of AS-1
    console.log('Navigating to AS-1 edit page...');
    await page.goto(`${SITE_URL}/admin/entries/10/edit`, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Switch to Publish tab first
    console.log('Switching to Publish tab...');
    await page.locator('button', { hasText: /^Publish$/ }).click();
    await page.waitForTimeout(1000);

    // Take screenshot of the edit form in Publish tab
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'e2e_edit_page_publish_tab.png') });
    console.log('Publish tab loaded. Checking submit buttons...');

    // Click "Confirm & Publish" or fallback to "Save as Draft" if disabled
    const publishBtn = page.locator('button:has-text("Confirm & Publish")');
    const isPublishEnabled = await publishBtn.isEnabled();
    if (isPublishEnabled) {
      console.log('Clicking Confirm & Publish button...');
      await publishBtn.click();
    } else {
      console.log('Confirm & Publish is disabled. Clicking Save as Draft...');
      await page.click('button:has-text("Save as Draft")');
    }
    
    // We expect a redirect to /admin/entries list
    console.log('Waiting for navigation back to entries list...');
    await page.waitForURL('**/admin/entries', { timeout: 30000 });
    console.log('Redirected back to entries list page successfully!');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'e2e_after_edit_save.png') });

    // 4. Verify the PDF endpoint is active
    console.log('Verifying /api/pdfs/as-1 URL endpoint...');
    const response = await page.request.get(`${SITE_URL}/api/pdfs/as-1`);
    const status = response.status();
    const contentType = response.headers()['content-type'];
    console.log(`URL served. Status: ${status}, Content-Type: ${contentType}`);
    if (status !== 200 || !contentType.includes('application/pdf')) {
      throw new Error(`Invalid PDF endpoint response: status ${status}, type ${contentType}`);
    }
    
    // 5. Navigate to the Portal and open PDF View tab
    console.log('Navigating to Learning Portal for AS 1...');
    await page.goto(`${SITE_URL}/standards/learning?framework=as&selected=as-1`, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Switch to PDF View tab
    console.log('Switching to PDF View tab...');
    await page.click('text=PDF View');
    await page.waitForTimeout(4000);

    // Capture final PDF view
    console.log('Capturing rendered PDF view page...');
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'prod_standards_as1_pdf_view.png') });
    console.log('E2E validation complete!');

  } catch (err) {
    console.error('E2E Flow Failure:', err);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'e2e_failed_state.png') });
  } finally {
    await browser.close();
    try {
      fs.unlinkSync(dummyPdf);
    } catch {}
  }
}

runE2E().catch(console.error);
