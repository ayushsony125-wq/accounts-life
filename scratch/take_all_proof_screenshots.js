const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app';
const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/d66d11ee-abbd-4673-b8af-1ccd6f3745b9';

async function main() {
  console.log('=== END-TO-END COMPREHENSIVE PROOF VERIFICATION SCRIPT ===');
  if (!fs.existsSync(ARTIFACT_DIR)) {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  page.on('console', msg => console.log(`[Browser] ${msg.text()}`));
  page.on('pageerror', err => console.error(`[Browser Error] ${err.message}`));

  // ==========================================
  // 1. ADMIN CMS LOGIN & HISTORY FLOWS
  // ==========================================
  console.log('\n--- 1. Logging into Admin CMS ---');
  await page.goto(`${SITE_URL}/admin/login`, { waitUntil: 'networkidle' });
  await page.click('button:has-text("Admin Login")');
  await page.waitForTimeout(1000);
  await page.fill('input[id="admin-email-input"]', 'admin@accounts.one');
  await page.fill('input[id="password-input"]', 'Ak@993102');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(4000);
  console.log('Logged in successfully!');

  console.log('\n--- 2. Testing CMS Sticky Top Bar & Undo/Redo/History ---');
  await page.goto(`${SITE_URL}/admin/entries/10/edit`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'admin_editor_load.png') });
  console.log('✓ Screenshot saved: admin_editor_load.png');

  // Modify summary to push a state to the history stack
  console.log('Modifying summary field to trigger history stack...');
  await page.fill('textarea[placeholder*="Short meta description"]', 'Verified Undo/Redo CMS action bar. Live state updates pushed to history stack.');
  await page.waitForTimeout(2000); // Wait for debounce
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'admin_editor_modified.png') });
  console.log('✓ Screenshot saved: admin_editor_modified.png');

  // Trigger Undo
  console.log('Pressing Ctrl+Z (Undo)...');
  await page.keyboard.press('Control+z');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'admin_editor_undone.png') });
  console.log('✓ Screenshot saved: admin_editor_undone.png');

  // Trigger Redo
  console.log('Pressing Ctrl+Y (Redo)...');
  await page.keyboard.press('Control+y');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'admin_editor_redone.png') });
  console.log('✓ Screenshot saved: admin_editor_redone.png');

  // Save Draft to generate a new revision snapshot in DB
  console.log('Saving Draft to create DB version snapshot...');
  await page.click('button:has-text("Save Draft")');
  await page.waitForTimeout(4000);

  // Open Version History tab
  console.log('Opening Version History tab...');
  await page.click('button:has-text("Version History")');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'admin_version_history.png') });
  console.log('✓ Screenshot saved: admin_version_history.png');

  // ==========================================
  // 2. VERIFYING AS-1 PUBLIC PAGE & TABS
  // ==========================================
  console.log('\n--- 3. Verifying AS-1 Public Page ---');
  await page.goto(`${SITE_URL}/standards/as/as-1`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'as1_standard_tab.png'), fullPage: true });
  console.log('✓ Screenshot saved: as1_standard_tab.png');

  // Click Examples & Case Law tab
  console.log('Clicking Examples tab on AS-1...');
  await page.click('button:has-text("Examples & Case Law")');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'as1_examples_tab.png') });
  console.log('✓ Screenshot saved: as1_examples_tab.png');

  // Click Study PDF tab (fresh page load to avoid hidden tab button issue)
  console.log('Loading page fresh for AS-1 Study PDF...');
  await page.goto(`${SITE_URL}/standards/as/as-1`, { waitUntil: 'networkidle' });
  await page.click('button[title="View clean study content PDF print view"]');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'as1_pdf_tab.png') });
  console.log('✓ Screenshot saved: as1_pdf_tab.png');

  // Click Lecture Video tab (fresh page load)
  console.log('Loading page fresh for AS-1 Video Lecture...');
  await page.goto(`${SITE_URL}/standards/as/as-1`, { waitUntil: 'networkidle' });
  await page.click('button[title="Watch video lectures"]');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'as1_video_tab.png') });
  console.log('✓ Screenshot saved: as1_video_tab.png');

  // ==========================================
  // 3. VERIFYING AS-2 PUBLIC PAGE & TABS
  // ==========================================
  console.log('\n--- 4. Verifying AS-2 Public Page ---');
  await page.goto(`${SITE_URL}/standards/as/as-2`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'as2_standard_tab.png'), fullPage: true });
  console.log('✓ Screenshot saved: as2_standard_tab.png');

  // Click Examples & Case Law tab
  console.log('Clicking Examples tab on AS-2...');
  await page.click('button:has-text("Examples & Case Law")');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'as2_examples_tab.png') });
  console.log('✓ Screenshot saved: as2_examples_tab.png');

  // Click Study PDF tab (fresh load)
  console.log('Loading page fresh for AS-2 Study PDF...');
  await page.goto(`${SITE_URL}/standards/as/as-2`, { waitUntil: 'networkidle' });
  await page.click('button[title="View clean study content PDF print view"]');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'as2_pdf_tab.png') });
  console.log('✓ Screenshot saved: as2_pdf_tab.png');

  // Click Lecture Video tab (fresh load)
  console.log('Loading page fresh for AS-2 Video Lecture...');
  await page.goto(`${SITE_URL}/standards/as/as-2`, { waitUntil: 'networkidle' });
  await page.click('button[title="Watch video lectures"]');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'as2_video_tab.png') });
  console.log('✓ Screenshot saved: as2_video_tab.png');

  // ==========================================
  // 4. VERIFYING SCHEDULE III PUBLIC PAGE & TABS
  // ==========================================
  console.log('\n--- 5. Verifying Schedule III AS-style Layout & Sidebar ---');
  await page.goto(`${SITE_URL}/standards/schedule-iii`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'sch3_main.png'), fullPage: true });
  console.log('✓ Screenshot saved: sch3_main.png');

  // Click Examples & Case Law tab
  console.log('Clicking Examples & Case Law tab on Schedule III...');
  await page.click('button:has-text("Examples & Case Law")');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'sch3_examples_tab.png') });
  console.log('✓ Screenshot saved: sch3_examples_tab.png');

  // Click FAQs tab (now seeded and visible)
  console.log('Clicking FAQs tab on Schedule III...');
  await page.click('button:has-text("FAQ")');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'sch3_faq_tab.png') });
  console.log('✓ Screenshot saved: sch3_faq_tab.png');

  // Click Study PDF tab on Schedule III (fresh load)
  console.log('Loading page fresh for Schedule III Study PDF...');
  await page.goto(`${SITE_URL}/standards/schedule-iii`, { waitUntil: 'networkidle' });
  await page.click('button[title="View clean study content PDF print view"]');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'sch3_pdf_tab.png') });
  console.log('✓ Screenshot saved: sch3_pdf_tab.png');

  // Click Lecture Video tab on Schedule III (fresh load)
  console.log('Loading page fresh for Schedule III Video Lecture...');
  await page.goto(`${SITE_URL}/standards/schedule-iii`, { waitUntil: 'networkidle' });
  await page.click('button[title="Watch video lectures"]');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'sch3_video_tab.png') });
  console.log('✓ Screenshot saved: sch3_video_tab.png');

  // ==========================================
  // 5. VERIFYING LIVE HOMEPAGE CURRENT STATE
  // ==========================================
  console.log('\n--- 6. Verifying Current Live Homepage ---');
  await page.goto(`${SITE_URL}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'live_homepage_current.png'), fullPage: true });
  console.log('✓ Screenshot saved: live_homepage_current.png');

  await browser.close();
  console.log('\n=== COMPREHENSIVE VERIFICATION DONE ===');
}

main().catch(console.error);
