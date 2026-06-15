const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app';
const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/3e7ef49d-8c4e-42f2-b4da-2f480a7bed61';

const pages = [
  { name: 'home', path: '/' },
  { name: 'foundations', path: '/foundations' },
  { name: 'search', path: '/search' },
  { name: 'glossary', path: '/glossary' },
  { name: 'standards_as', path: '/standards/as' },
  { name: 'standards_ind_as', path: '/standards/ind-as' },
  { name: 'standards_learning', path: '/standards/learning' },
  { name: 'admin_login', path: '/admin/login' }
];

async function run() {
  console.log(`Starting production verification against: ${SITE_URL}`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  const results = {};

  for (const p of pages) {
    const url = `${SITE_URL}${p.path}`;
    console.log(`\nChecking route: ${p.path} (${url})...`);
    
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    try {
      const response = await page.goto(url, { waitUntil: 'load', timeout: 30000 });
      const status = response ? response.status() : 'No response';
      
      // Wait a moment for hydration/rendering to settle
      await page.waitForTimeout(3000);

      const filename = `prod_${p.name}.png`;
      const filepath = path.join(ARTIFACT_DIR, filename);
      await page.screenshot({ path: filepath, fullPage: true });

      results[p.name] = {
        path: p.path,
        url: url,
        status: status,
        screenshot: filepath,
        consoleErrors: consoleErrors
      };
      
      console.log(`Status: ${status}`);
      if (consoleErrors.length > 0) {
        console.log(`Console errors:`, consoleErrors);
      } else {
        console.log(`Console errors: None`);
      }
      console.log(`Saved screenshot to: ${filepath}`);
    } catch (err) {
      console.error(`Error loading page ${p.path}: ${err.message}`);
      results[p.name] = {
        path: p.path,
        url: url,
        status: 'FAILED',
        error: err.message,
        consoleErrors: consoleErrors
      };
    }
    
    // Clear console listeners for the next page
    page.removeAllListeners('console');
  }

  // Now, try logging in
  console.log('\n--- Attempting Admin Login on Production ---');
  try {
    await page.goto(`${SITE_URL}/admin/login`, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(2000);
    
    // Click on Admin Login tab button first
    console.log('Clicking Admin Login tab...');
    await page.click('button:has-text("Admin Login")');
    await page.waitForTimeout(1000);

    // Check if the form is there
    const hasPasswordInput = await page.$('#password-input');
    if (hasPasswordInput) {
      console.log('Form inputs found. Entering credentials...');
      await page.fill('#admin-email-input', 'admin@accounts.one');
      await page.fill('#password-input', 'Ak@993102');
      
      const submitPromise = page.waitForNavigation({ waitUntil: 'networkidle', timeout: 30000 }).catch(e => {
        console.log('Timeout waiting for navigation: ' + e.message);
      });
      await page.click('button[type="submit"]');
      await submitPromise;
      
      await page.waitForTimeout(3000);
      const currentUrl = page.url();
      console.log(`Current URL after login: ${currentUrl}`);
      
      const dashboardFilename = 'prod_admin_dashboard.png';
      const dashboardFilepath = path.join(ARTIFACT_DIR, dashboardFilename);
      await page.screenshot({ path: dashboardFilepath, fullPage: true });
      console.log(`Saved admin dashboard screenshot to: ${dashboardFilepath}`);
      
      results['admin_dashboard'] = {
        path: '/admin',
        url: currentUrl,
        status: currentUrl.includes('/admin') && !currentUrl.includes('/login') ? 'SUCCESS' : 'FAILED_AUTH',
        screenshot: dashboardFilepath,
        consoleErrors: []
      };
    } else {
      console.log('No password input found. Maybe already logged in?');
      const currentUrl = page.url();
      console.log(`Current URL: ${currentUrl}`);
    }
  } catch (err) {
    console.error(`Error during admin login: ${err.message}`);
    results['admin_dashboard'] = {
      path: '/admin',
      status: 'FAILED_ERROR',
      error: err.message,
      consoleErrors: []
    };
  }

  await browser.close();

  // Save the structured report as a JSON file
  fs.writeFileSync(
    path.join(ARTIFACT_DIR, 'prod_verification_results.json'),
    JSON.stringify(results, null, 2)
  );
  console.log('\nVerification complete. JSON results saved.');
}

run().catch(console.error);
