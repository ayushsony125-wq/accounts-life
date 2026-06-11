const { chromium } = require('playwright');

const SITE_URL = 'http://localhost:3000';
const routes = [
  '/',
  '/admin/login',
  '/admin',
  '/admin/entries',
  '/search',
  '/glossary',
  '/sitemap.xml',
  '/robots.txt',
  '/foundations',
  '/standards/as',
  '/standards/as/as-1',
  '/standards/ind-as',
  '/standards/ind-as/ind-as-1',
  '/privacy',
  '/terms',
  '/foundations/concepts-conventions/accrual-concept',
  '/standards/equivalence-map'
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`[Console Error] [${page.url()}]: ${msg.text()}`);
    }
  });
  page.on('pageerror', err => {
    console.log(`[Page Error] [${page.url()}]: ${err.message}`);
  });
  page.on('requestfailed', request => {
    console.log(`[Req Failed] [${page.url()}]: ${request.url()} - ${request.failure() ? request.failure().errorText : 'Unknown'}`);
  });
  page.on('response', response => {
    if (response.status() >= 400) {
      console.log(`[HTTP ${response.status()}] [${page.url()}]: ${response.url()}`);
    }
  });

  // Login first to access admin pages
  console.log('--- Logging in ---');
  await page.goto(`${SITE_URL}/admin/login`);
  await page.waitForTimeout(1000);
  console.log('Clicking Admin Login tab...');
  await page.click('button:has-text("Admin Login")');
  await page.waitForTimeout(1000);
  await page.fill('#password-input', 'Ak@993102');
  await page.click('button[type="submit"]');
  await page.waitForURL(`${SITE_URL}/admin`);

  console.log('--- Starting route sweeps ---');
  for (const r of routes) {
    console.log(`Navigating to: ${r}`);
    try {
      await page.goto(`${SITE_URL}${r}`);
      await page.waitForTimeout(1000);
    } catch (e) {
      console.log(`Failed to navigate to ${r}: ${e.message}`);
    }
  }

  await browser.close();
}

run().catch(console.error);
