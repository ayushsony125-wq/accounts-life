const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'http://localhost:3000';
const OUT_DIR = path.join(__dirname, 'screenshots');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'foundations', path: '/foundations' },
  { name: 'glossary', path: '/glossary' },
  { name: 'search', path: '/search' },
  { name: 'standards_as', path: '/standards/as' },
  { name: 'standards_ind_as', path: '/standards/ind-as' },
  { name: 'admin_login', path: '/admin/login' },
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(`[${page.url()}] Console Error: ${msg.text()}`);
  });
  page.on('pageerror', err => errors.push(`[${page.url()}] Page Error: ${err.message}`));

  for (const { name, path: pagePath } of PAGES) {
    console.log(`\n📸 Capturing: ${pagePath}`);
    try {
      const response = await page.goto(`${SITE_URL}${pagePath}`, { waitUntil: 'networkidle', timeout: 15000 });
      console.log(`   Status: ${response.status()}`);
      await page.waitForTimeout(1500);
      
      // Check computed body styles
      const bodyInfo = await page.evaluate(() => {
        const body = document.body;
        const cs = window.getComputedStyle(body);
        return {
          bg: cs.backgroundColor,
          font: cs.fontFamily,
          classes: body.className,
          sheets: document.styleSheets.length,
        };
      });
      console.log(`   Body BG: ${bodyInfo.bg} | Font: ${bodyInfo.font.substring(0, 30)} | Sheets: ${bodyInfo.sheets}`);

      await page.screenshot({ path: path.join(OUT_DIR, `${name}.png`), fullPage: true });
      console.log(`   ✅ Screenshot saved: ${name}.png`);
    } catch (e) {
      console.log(`   ❌ Error on ${pagePath}: ${e.message}`);
    }
  }

  // Test search functionality
  console.log('\n🔍 Testing search...');
  await page.goto(`${SITE_URL}/search`, { waitUntil: 'networkidle' });
  try {
    await page.fill('#search-input', 'Accrual');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(OUT_DIR, 'search_results.png'), fullPage: false });
    console.log('   ✅ Search screenshot saved');
  } catch (e) {
    console.log('   ⚠️ Search input not found:', e.message);
  }

  // Admin login
  console.log('\n🔑 Testing admin login...');
  await page.goto(`${SITE_URL}/admin/login`, { waitUntil: 'networkidle' });
  try {
    await page.fill('#password-input', '123456');
    await page.click('button[type="submit"]');
    await page.waitForURL(`${SITE_URL}/admin`, { timeout: 5000 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(OUT_DIR, 'admin_dashboard.png'), fullPage: true });
    console.log('   ✅ Admin dashboard screenshot saved');
  } catch (e) {
    console.log('   ⚠️ Admin login issue:', e.message);
  }

  await browser.close();

  console.log('\n===== SUMMARY =====');
  if (errors.length === 0) {
    console.log('✅ ZERO console errors or page errors detected.');
  } else {
    console.log(`❌ ${errors.length} error(s) found:`);
    errors.forEach(e => console.log('  -', e));
  }
  console.log('Screenshots saved to:', OUT_DIR);
}

run().catch(console.error);
