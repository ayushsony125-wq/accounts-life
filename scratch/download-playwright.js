const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function download() {
  console.log('Launching browser to download official AS 1 PDF...');
  const browser = await chromium.launch({ headless: true });
  
  // Set user agent and basic viewport
  const context = await browser.newContext({
    acceptDownloads: true,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  
  const page = await context.newPage();
  
  const destPath = path.join(__dirname, '../public/pdfs/as-1.pdf');
  const dir = path.dirname(destPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  try {
    console.log('Navigating to official MCA AS 1 PDF URL...');
    const downloadPromise = page.waitForEvent('download', { timeout: 30000 });
    
    // Go to URL and wait for download trigger
    await page.goto('https://www.mca.gov.in/Ministry/notification/pdf/AS_1.pdf', { waitUntil: 'commit' }).catch(() => {});
    
    const download = await downloadPromise;
    await download.saveAs(destPath);
    console.log(`Successfully downloaded and saved PDF to: ${destPath}`);
    
    const stats = fs.statSync(destPath);
    console.log(`File Size: ${stats.size} bytes`);
    
    if (stats.size < 1000) {
      console.error('Warning: Downloaded file size is too small. It might not be a valid PDF.');
    }
  } catch (err) {
    console.error('Error during Playwright download:', err);
  } finally {
    await browser.close();
  }
}

download().catch(console.error);
