const { spawn } = require('child_process');
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/3e7ef49d-8c4e-42f2-b4da-2f480a7bed61';

function startServer() {
  return new Promise((resolve, reject) => {
    console.log('Starting local production server (npm run start)...');
    const child = spawn('npm', ['run', 'start'], {
      cwd: 'd:/My Accounts/accounts-life',
      shell: true,
      env: { ...process.env, PORT: '3001' } // run on port 3001 to avoid conflicts
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

    // Timeout after 15 seconds
    setTimeout(() => {
      reject(new Error('Server start timed out:\n' + output));
    }, 15000);
  });
}

async function runTests() {
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

  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 800 }
  ];

  const urls = [
    { name: 'home', path: '/' },
    { name: 'foundations', path: '/foundations' },
    { name: 'search', path: '/search' },
    { name: 'admin_login', path: '/admin/login' }
  ];

  try {
    for (const urlInfo of urls) {
      console.log(`\nTesting URL: ${urlInfo.path}`);
      for (const vp of viewports) {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(`http://localhost:3001${urlInfo.path}`, { waitUntil: 'networkidle', timeout: 15000 });
        
        // Wait 1s
        await page.waitForTimeout(1000);

        // Take screenshot
        const filename = `local_test_${urlInfo.name}_${vp.name}.png`;
        const filepath = path.join(ARTIFACT_DIR, filename);
        await page.screenshot({ path: filepath, fullPage: true });
        console.log(`Captured screenshot for ${vp.name} (${vp.width}x${vp.height}) at ${filepath}`);
      }
    }
    console.log('\nAll local verification pages captured successfully.');
  } catch (err) {
    console.error('Error during testing:', err);
  } finally {
    await browser.close();
    if (serverProcess) {
      console.log('Stopping local production server...');
      serverProcess.kill();
    }
  }
}

runTests().catch(console.error);
