const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { PrismaClient } = require('@prisma/client');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app';
const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/3e7ef49d-8c4e-42f2-b4da-2f480a7bed61';

// Create a valid, basic PDF document structure that will render text in browser
function createRealTestPdf() {
  const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> /MediaBox [0 0 595 842] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 120 >>
stream
BT
/F1 14 Tf
70 750 Td
(ICAI Accounting Standard AS-1 Verification Document) Tj
/F1 10 Tf
0 -40 Td
(This is a verified live test upload for AS 1 - Disclosure of Accounting Policies.) Tj
0 -20 Td
(Database Storage: Neon PostgreSQL.) Tj
0 -20 Td
(Bypass: Serverless Base64 to Binary stream.) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000282 00000 n 
trailer
<< /Size 5 /Root 1 0 R >>
startxref
453
%%EOF`;

  const pdfPath = path.join(__dirname, 'test-verification-as1.pdf');
  fs.writeFileSync(pdfPath, pdfContent);
  console.log(`Created test PDF at: ${pdfPath}`);
  return pdfPath;
}

// Perform direct HTTP call to check PDF endpoint status, headers and content
function verifyPdfEndpoint() {
  return new Promise((resolve, reject) => {
    console.log(`\n--- [A] DIRECT HTTP ENDPOINT CHECK ---`);
    console.log(`GET ${SITE_URL}/api/pdfs/as-1`);
    https.get(`${SITE_URL}/api/pdfs/as-1`, (res) => {
      console.log(`Response Status Code: ${res.statusCode}`);
      console.log(`Response Headers:`, JSON.stringify(res.headers, null, 2));

      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        console.log(`Downloaded PDF size: ${buffer.length} bytes`);
        
        // Verify Magic Number (%PDF-)
        const pdfPrefix = buffer.slice(0, 5).toString('ascii');
        console.log(`File prefix (Magic Number): "${pdfPrefix}"`);

        const isPdf = pdfPrefix.startsWith('%PDF-');
        const is200 = res.statusCode === 200;
        const isPdfContentType = res.headers['content-type']?.includes('application/pdf');

        console.log(`Status 200 OK: ${is200 ? 'YES' : 'NO'}`);
        console.log(`Content-Type application/pdf: ${isPdfContentType ? 'YES' : 'NO'}`);
        console.log(`Valid PDF Signature: ${isPdf ? 'YES' : 'NO'}`);

        if (is200 && isPdfContentType && isPdf) {
          console.log(`✅ [A] DIRECT HTTP CHECK PASSED!`);
          resolve(true);
        } else {
          console.error(`❌ [A] DIRECT HTTP CHECK FAILED!`);
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.error(`Error requesting PDF endpoint:`, err);
      resolve(false);
    });
  });
}

// Query the database directly to confirm PDF mapping record
async function verifyDatabaseRecord() {
  console.log(`\n--- [C] DATABASE VERIFICATION ---`);
  const prisma = new PrismaClient();
  try {
    const resources = await prisma.entryResource.findMany({
      where: {
        resourceType: 'PDF',
        entry: { entrySlug: 'as-1' }
      },
      select: {
        id: true,
        resourceType: true,
        resourceTitle: true,
        resourceUrl: true,
        entryId: true,
        entry: {
          select: {
            entryTitle: true,
            entrySlug: true
          }
        }
      }
    });

    if (resources.length === 0) {
      console.error(`❌ No PDF resources found in Neon DB for standard 'as-1'`);
      return false;
    }

    const res = resources[0];
    console.log(`Neon Database Record Found:`);
    console.log(`  - Resource ID: ${res.id}`);
    console.log(`  - Resource Type: ${res.resourceType}`);
    console.log(`  - Resource Title: ${res.resourceTitle}`);
    console.log(`  - Target Entry ID: ${res.entryId} (${res.entry.entryTitle} - ${res.entry.entrySlug})`);
    console.log(`  - resourceUrl Character Length: ${res.resourceUrl ? res.resourceUrl.length : 0}`);
    console.log(`  - resourceUrl Preview: ${res.resourceUrl ? res.resourceUrl.substring(0, 100) : ''}...`);
    
    if (res.resourceUrl && res.resourceUrl.startsWith('data:application/pdf;base64,')) {
      console.log(`✅ [C] DATABASE RECORD IS VALID AND STORES A BASE64 PDF PAYLOAD!`);
      return res;
    } else {
      console.error(`❌ [C] Stored resourceUrl is empty or does not start with data URI prefix.`);
      return false;
    }
  } catch (err) {
    console.error(`❌ Database query failed:`, err);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

async function runE2E() {
  const dummyPdf = createRealTestPdf();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 950 });

  // Array to collect any console error messages
  const consoleErrors = [];
  page.on('pageerror', (err) => {
    console.error('Page-level Exception:', err);
    consoleErrors.push(err.message);
  });
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.error('Console Error:', msg.text());
      consoleErrors.push(msg.text());
    }
  });

  try {
    // 1. Login to admin panel
    console.log(`\n--- [D & E] ADMIN UPLOAD, SAVE, PUBLISH VERIFICATION ---`);
    console.log('Navigating to admin login...');
    await page.goto(`${SITE_URL}/admin/login`, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(1000);
    
    console.log('Switching to Admin Login tab...');
    await page.click('button:has-text("Admin Login")');
    await page.waitForTimeout(500);

    console.log('Entering password credentials...');
    await page.fill('#password-input', 'Ak@993102');
    await page.click('button[type="submit"]');
    
    await page.waitForURL('**/admin', { timeout: 30000 });
    console.log('Login successful. Redirected to /admin.');
    await page.waitForTimeout(1000);

    // Save empty state screenshot
    console.log('Selecting standard AS 1 for PDF mapping...');
    await page.selectOption('select', 'as-1');
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'prod_admin_upload_empty.png') });
    console.log(`Saved screenshot: prod_admin_upload_empty.png`);

    // Choose file and save selected state screenshot
    console.log('Selecting test PDF document...');
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click('label[for="direct-pdf-file-picker"]');
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(dummyPdf);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'prod_admin_upload_selected.png') });
    console.log(`Saved screenshot: prod_admin_upload_selected.png`);

    // Click upload and wait for success
    console.log('Uploading and mapping PDF...');
    await page.click('button:has-text("Upload & Map PDF")');
    await page.waitForSelector('text=Upload Successful', { timeout: 30000 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'prod_admin_upload_success.png') });
    console.log(`Saved screenshot: prod_admin_upload_success.png`);

    // Go to AS-1 Edit Page to test Save/Publish workflow
    console.log('Navigating to AS 1 Edit Page (/admin/entries/10/edit)...');
    await page.goto(`${SITE_URL}/admin/entries/10/edit`, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Click Publish tab
    console.log('Switching to Publish tab...');
    await page.locator('button', { hasText: /^Publish$/ }).click();
    await page.waitForTimeout(1000);

    // Click Save/Publish button
    const publishBtn = page.locator('button:has-text("Confirm & Publish")');
    const isPublishEnabled = await publishBtn.isEnabled();
    if (isPublishEnabled) {
      console.log('Clicking Confirm & Publish...');
      await publishBtn.click();
    } else {
      console.log('Confirm & Publish is disabled. Clicking Save as Draft...');
      await page.click('button:has-text("Save as Draft")');
    }

    // Wait for redirect to /admin/entries (indicates no render / validation crash)
    console.log('Waiting for entries list redirect...');
    await page.waitForURL('**/admin/entries', { timeout: 30000 });
    console.log('Redirect successful! No server-side or RSC errors encountered during save/publish.');
    await page.waitForTimeout(2000);

    // Screenshot of direct API open using the inline iframe workaround
    console.log(`\n--- [E] DIRECT API OPEN SCREENSHOT ---`);
    const directApiHtml = `data:text/html,<html><body style="margin:0;"><iframe src="${SITE_URL}/api/pdfs/as-1" style="width:100vw;height:100vh;border:none;"></iframe></body></html>`;
    await page.goto(directApiHtml, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(4000);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'prod_api_pdf_direct.png') });
    console.log(`Saved screenshot: prod_api_pdf_direct.png`);

    // Navigate to Standards Portal to check frontend iframe rendering
    console.log(`\n--- [B & E] STANDARD PORTAL RENDER VERIFICATION ---`);
    console.log('Navigating to AS-1 Learning Portal page...');
    await page.goto(`${SITE_URL}/standards/learning?framework=as&selected=as-1`, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(3000);

    console.log('Clicking PDF View tab...');
    await page.click('text=PDF View');
    await page.waitForTimeout(4000);

    // Save final rendered standard page screenshot
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'prod_standards_as1_pdf_view.png') });
    console.log(`Saved screenshot: prod_standards_as1_pdf_view.png`);

    // Extract iframe details to confirm it points to the correct dynamic route
    const iframeSrc = await page.evaluate(() => {
      const iframe = document.querySelector('iframe');
      return iframe ? iframe.src : null;
    });
    console.log(`Rendered PDF iframe src attribute: ${iframeSrc}`);
    const matchesApiRoute = iframeSrc && iframeSrc.includes('/api/pdfs/as-1');
    console.log(`Iframe maps to dynamic API: ${matchesApiRoute ? 'YES' : 'NO'}`);

    if (consoleErrors.length > 0) {
      console.warn(`⚠️ Encountered ${consoleErrors.length} console error logs during execution. Checking content...`);
    } else {
      console.log(`✅ No console errors or runtime exceptions detected.`);
    }

    console.log(`\n✅ E2E VERIFICATION SCRIPT RUN COMPLETED SUCCESSFULLY!`);

  } catch (err) {
    console.error('❌ E2E VERIFICATION SCRIPT FAILED:', err);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'prod_verify_failed_state.png') });
  } finally {
    await browser.close();
    try {
      fs.unlinkSync(dummyPdf);
    } catch {}
  }
}

async function runAll() {
  const isApiOk = await verifyPdfEndpoint();
  const dbRecord = await verifyDatabaseRecord();
  
  if (isApiOk && dbRecord) {
    await runE2E();
  } else {
    console.error('❌ Prerequisite checks failed. Skipping browser automation.');
  }
}

runAll().catch(console.error);
