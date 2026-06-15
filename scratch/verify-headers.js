const { spawn } = require('child_process');
const { chromium } = require('playwright');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/3e7ef49d-8c4e-42f2-b4da-2f480a7bed61';

function startServer() {
  return new Promise((resolve, reject) => {
    console.log('Starting local production server (npm run start)...');
    const child = spawn('npm', ['run', 'start'], {
      cwd: 'd:/My Accounts/accounts-life',
      shell: true,
      env: { ...process.env, PORT: '3001' }
    });

    let output = '';
    child.stdout.on('data', (data) => {
      output += data.toString();
      if (output.includes('ready') || output.includes('started') || output.includes('localhost:3001')) {
        console.log('Production server is ready on port 3001.');
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
    }, 15000);
  });
}

async function verify() {
  let serverProcess;
  try {
    serverProcess = await startServer();
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  try {
    // 1. Check AS portal
    console.log('\nChecking AS Portal...');
    await page.goto('http://localhost:3001/standards/as', { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(3000);

    const asHeadingCheck = await page.evaluate(() => {
      // Find the span containing the text "ACCOUNTING STANDARDS" or similar
      const spans = Array.from(document.querySelectorAll('span'));
      const headerSpan = spans.find(s => s.innerText.toUpperCase().includes('STANDARDS'));
      if (!headerSpan) return { found: false };
      
      return {
        found: true,
        text: headerSpan.innerText,
        scrollWidth: headerSpan.scrollWidth,
        clientWidth: headerSpan.clientWidth,
        isOk: headerSpan.scrollWidth <= headerSpan.clientWidth
      };
    });

    console.log('AS Heading Check Result:', asHeadingCheck);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'local_as_sidebar.png') });

    // 2. Check Ind AS portal
    console.log('\nChecking Ind AS Portal...');
    await page.goto('http://localhost:3001/standards/ind-as', { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(3000);

    const indAsHeadingCheck = await page.evaluate(() => {
      const spans = Array.from(document.querySelectorAll('span'));
      const headerSpan = spans.find(s => s.innerText.toUpperCase().includes('STANDARDS'));
      if (!headerSpan) return { found: false };

      return {
        found: true,
        text: headerSpan.innerText,
        scrollWidth: headerSpan.scrollWidth,
        clientWidth: headerSpan.clientWidth,
        isOk: headerSpan.scrollWidth <= headerSpan.clientWidth
      };
    });

    console.log('Ind AS Heading Check Result:', indAsHeadingCheck);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'local_ind_as_sidebar.png') });

    if (asHeadingCheck.isOk && indAsHeadingCheck.isOk) {
      console.log('\nSUCCESS: Heading scrollWidth <= clientWidth for both AS and Ind AS!');
    } else {
      console.error('\nFAILURE: Heading width is clipping/overflowing!');
    }

  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    await browser.close();
    if (serverProcess) {
      console.log('Stopping local production server...');
      serverProcess.kill();
    }
  }
}

verify().catch(console.error);
