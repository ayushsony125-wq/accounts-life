const { spawn } = require('child_process');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

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
<< /Length 45 >>
stream
BT
/F1 12 Tf
72 712 Td
(Dummy ICAI/MCA Accounting Standard PDF) Tj
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
316
%%EOF`;
  
  const tempDir = path.join(__dirname);
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  const pdfPath = path.join(tempDir, 'test-standard.pdf');
  fs.writeFileSync(pdfPath, dummyPdfContent);
  console.log(`Created dummy PDF at: ${pdfPath}`);
  return pdfPath;
}

function startServer() {
  return new Promise((resolve, reject) => {
    console.log('Starting local production server (npm run start)...');
    const child = spawn('npm', ['run', 'start'], {
      cwd: 'd:/My Accounts/accounts-life',
      shell: true,
      env: { ...process.env, PORT: '3002' }
    });

    let output = '';
    child.stdout.on('data', (data) => {
      output += data.toString();
      if (output.includes('ready') || output.includes('started') || output.includes('localhost:3002')) {
        console.log('Production server is ready on port 3002.');
        resolve(child);
      }
    });

    child.stderr.on('data', (data) => {
      console.error('Server error output:', data.toString());
    });

    child.on('error', (err) => {
      reject(err);
    });

    setTimeout(() => {
      reject(new Error('Server start timed out:\n' + output));
    }, 20000);
  });
}

async function runFlow() {
  const dummyPdf = createDummyPdf();
  let serverProcess;

  try {
    serverProcess = await startServer();
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  try {
    // 1. Log in to admin panel
    console.log('Navigating to admin login...');
    await page.goto('http://localhost:3002/admin/login', { waitUntil: 'networkidle' });
    
    console.log('Switching to Admin Login tab...');
    await page.click('text=Admin Login');
    await page.waitForTimeout(1000);

    console.log('Entering login credentials...');
    await page.fill('#password-input', 'Ak@993102');
    await page.click('button:has-text("Access Portal")');
    
    // Wait for redirect to /admin
    await page.waitForURL('**/admin', { timeout: 15000 });
    console.log('Successfully logged in. Navigating to CMS Dashboard...');
    await page.waitForTimeout(3000);

    // 2. Capture Admin Dashboard with empty uploader card
    console.log('Capturing Admin Dashboard empty state...');
    const uploadFormSelector = 'form';
    await page.locator(uploadFormSelector).scrollIntoViewIfNeeded();
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'admin_upload_empty.png') });
    console.log('Screenshot saved: admin_upload_empty.png');

    // 3. Select standard and select file
    console.log('Selecting standard AS 2...');
    await page.selectOption('select', 'as-2');
    
    console.log('Selecting PDF file...');
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click('label[for="direct-pdf-file-picker"]');
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(dummyPdf);
    await page.waitForTimeout(1000);

    // Capture file selected state
    console.log('Capturing selected file state...');
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'admin_upload_selected.png') });
    console.log('Screenshot saved: admin_upload_selected.png');

    // 4. Click Upload & Map PDF
    console.log('Clicking upload button...');
    await page.click('button[type="submit"]');
    
    // Wait for successful upload message
    console.log('Waiting for successful upload status...');
    await page.waitForSelector('text=Upload Successful', { timeout: 15000 });
    await page.waitForTimeout(1000);

    // Capture upload success state
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'admin_upload_success.png') });
    console.log('Screenshot saved: admin_upload_success.png');

    // 5. Verify PDF maps correctly in user learning portal standard page
    console.log('Navigating to Learning Portal for AS 2...');
    await page.goto('http://localhost:3002/standards/learning?framework=as&selected=as-2', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    // Click PDF View tab
    console.log('Switching to PDF View tab...');
    await page.click('text=PDF View');
    await page.waitForTimeout(4000);

    // Capture the rendered PDF tab
    console.log('Capturing rendered PDF view page...');
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'standards_as2_pdf_view.png') });
    console.log('Screenshot saved: standards_as2_pdf_view.png');

    // Double check that the file actually exists in public/pdfs/
    const destinationPath = path.join('d:/My Accounts/accounts-life/public/pdfs', 'as-2.pdf');
    if (fs.existsSync(destinationPath)) {
      console.log(`CONFIRMED: Mapped PDF exists at physical path: ${destinationPath}`);
    } else {
      console.error(`ERROR: PDF file not found at: ${destinationPath}`);
    }

  } catch (err) {
    console.error('Error during automated browser flow:', err);
  } finally {
    await browser.close();
    if (serverProcess) {
      console.log('Stopping local production server...');
      serverProcess.kill();
    }
    // Cleanup dummy test file
    try {
      fs.unlinkSync(dummyPdf);
    } catch {}
  }
}

runFlow().catch(console.error);
