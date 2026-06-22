const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app';
const BRAIN_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/d66d11ee-abbd-4673-b8af-1ccd6f3745b9';

async function run() {
  console.log(`Starting final production verification against: ${SITE_URL}`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  // 1. Verify Public Examples page
  console.log('\n--- 1. Verification of Public AS Page ---');
  console.log('Navigating to AS 1 Standard page...');
  await page.goto(`${SITE_URL}/standards/as?selected=as-1`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Click on Examples & Case Law tab
  console.log('Clicking "Examples & Case Law" tab...');
  await page.click('button:has-text("Examples"), button:has-text("Case Law")');
  await page.waitForTimeout(2000);

  // Verify that the red banner is gone
  const bodyText = await page.textContent('body');
  const hasBanner = bodyText.includes('DEPLOYMENT TEST') && bodyText.includes('BUILD-XYZ');
  console.log(`Is the temporary red deployment banner present? ${hasBanner ? 'YES (FAIL)' : 'NO (PASS)'}`);

  // Take screenshot of the public examples page
  const publicExPath = path.join(BRAIN_DIR, 'public_examples_view.png');
  await page.screenshot({ path: publicExPath, fullPage: true });
  console.log(`Saved public examples screenshot to: ${publicExPath}`);

  // Click on an inline page reference to test PDF jump
  console.log('Searching for inline page citations...');
  const pageBtn = await page.$('button[data-pdf-page], button:has-text("Page ")');
  if (pageBtn) {
    const pageNum = await pageBtn.getAttribute('data-pdf-page') || '2';
    console.log(`Clicking page citation button targeting page: ${pageNum}...`);
    await pageBtn.click();
    await page.waitForTimeout(3000);

    // Verify tab changed to pdf
    const url = page.url();
    console.log(`Current URL: ${url}`);
    
    // Check if iframe has src with page hash
    const iframe = await page.$('iframe[src*="pdfs"]');
    if (iframe) {
      const src = await iframe.getAttribute('src');
      console.log(`PDF IFrame Source: ${src}`);
      const hasHash = src.includes(`#page=${pageNum}`) || src.includes(`#page=`);
      console.log(`Did the PDF iframe load the correct page hash? ${hasHash ? 'YES (PASS)' : 'NO (FAIL)'}`);
    } else {
      console.log('PDF iframe not found on page.');
    }

    // Take screenshot of the PDF tab
    const pdfPath = path.join(BRAIN_DIR, 'public_pdf_tab_navigated.png');
    await page.screenshot({ path: pdfPath, fullPage: true });
    console.log(`Saved public PDF tab screenshot to: ${pdfPath}`);
  } else {
    console.log('No page citation button found.');
  }

  // 2. Verify Admin Panel
  console.log('\n--- 2. Verification of Admin CMS Panel ---');
  console.log('Navigating to Admin Login...');
  await page.goto(`${SITE_URL}/admin/login`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(2000);

  console.log('Clicking Admin Login tab button...');
  await page.click('button:has-text("Admin Login")');
  await page.waitForTimeout(1000);

  console.log('Entering admin credentials...');
  await page.fill('#admin-email-input', 'admin@accounts.one');
  await page.fill('#password-input', 'Ak@993102');
  
  const submitPromise = page.waitForNavigation({ waitUntil: 'networkidle', timeout: 30000 });
  await page.click('button[type="submit"]');
  await submitPromise;
  await page.waitForTimeout(3000);

  console.log(`Successfully logged in. Admin URL: ${page.url()}`);

  console.log('Navigating to entries list...');
  await page.goto(`${SITE_URL}/admin/entries`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(3000);

  console.log('Navigating directly to AS 1 edit URL...');
  await page.goto(`${SITE_URL}/admin/entries/10/edit`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(4000);

    // Verify Standard tab
    console.log('Clicking "Standard" editor tab...');
    await page.click('button:has-text("Standard")');
    await page.waitForTimeout(2000);

    // Verify that the red banner is gone
    const adminBodyText = await page.textContent('body');
    const hasAdminBanner = adminBodyText.includes('DEPLOYMENT TEST') && adminBodyText.includes('BUILD-XYZ');
    console.log(`Is the temporary red deployment banner present in Admin Standard tab? ${hasAdminBanner ? 'YES (FAIL)' : 'NO (PASS)'}`);

    // Take screenshot of admin Standard editor
    const adminStdPath = path.join(BRAIN_DIR, 'admin_standard_editor.png');
    await page.screenshot({ path: adminStdPath, fullPage: true });
    console.log(`Saved admin Standard editor screenshot to: ${adminStdPath}`);

    // Verify Examples tab
    console.log('Clicking "Examples / Case Law" editor tab...');
    await page.click('button:has-text("Examples / Case Law")');
    await page.waitForTimeout(2000);

    // Take screenshot of admin Examples editor
    const adminExPath = path.join(BRAIN_DIR, 'admin_examples_editor.png');
    await page.screenshot({ path: adminExPath, fullPage: true });
    console.log(`Saved admin Examples editor screenshot to: ${adminExPath}`);

    // Verify new toolbar items are present
    console.log('Checking for new toolbar buttons...');
    const selectBox = await page.$('select:has-text("Add Block")');
    const strikethroughBtn = await page.$('button[title="Strikethrough"]');
    const tableBtn = await page.$('button[title="Insert Table"]');
    const linkBtn = await page.$('button[title="Insert Link"]');
    
    console.log(`Select "+ Add Block..." Dropdown Found: ${selectBox ? 'YES' : 'NO'}`);
    console.log(`Strikethrough Button Found: ${strikethroughBtn ? 'YES' : 'NO'}`);
    console.log(`Table Insertion Button Found: ${tableBtn ? 'YES' : 'NO'}`);
    console.log(`Link Insertion Button Found: ${linkBtn ? 'YES' : 'NO'}`);
    
    const isToolbarCorrect = selectBox && strikethroughBtn && tableBtn && linkBtn;
    console.log(`Refined Toolbar Verification: ${isToolbarCorrect ? 'PASS' : 'FAIL'}`);


  await browser.close();
  console.log('\nVerification complete.');
}

run().catch(console.error);
