const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app';
const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/d66d11ee-abbd-4673-b8af-1ccd6f3745b9';

async function run() {
  console.log(`Verifying production deployment: ${SITE_URL}`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  // Handle dialogs
  page.on('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    await dialog.dismiss();
  });

  try {
    // 1. Check public learning page
    const publicUrl = `${SITE_URL}/standards/learning?framework=AS&selected=as-1`;
    console.log(`Opening public examples view at: ${publicUrl}`);
    try {
      await page.goto(publicUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(5000);
      
      // Try clicking Examples tab
      console.log('Searching for Examples & Case Law tab...');
      const examplesTab = await page.$('button:has-text("Examples & Case Law")');
      if (examplesTab) {
        console.log('Clicking Examples tab...');
        await examplesTab.click();
        await page.waitForTimeout(3000);
      } else {
        console.log('Examples tab button not found by has-text, attempting selectors...');
        // Try finding a button that has a scale icon or text
        const buttons = await page.$$('button');
        for (const btn of buttons) {
          const text = await btn.innerText();
          if (text.includes('Examples')) {
            console.log(`Found button with text "${text}", clicking...`);
            await btn.click();
            await page.waitForTimeout(3000);
            break;
          }
        }
      }
      
      await page.screenshot({ path: path.join(ARTIFACT_DIR, 'public_examples_view.png'), fullPage: true });
      console.log('Saved public examples screenshot.');
    } catch (e) {
      console.error('Error on public page:', e.message);
    }

    // 2. Check admin page
    console.log('Navigating to admin login...');
    try {
      await page.goto(`${SITE_URL}/admin/login`, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(3000);
      
      // Click on Admin Login tab if necessary
      const loginTab = await page.$('button:has-text("Admin Login")');
      if (loginTab) {
        await loginTab.click();
        await page.waitForTimeout(1000);
      }

      const emailInput = await page.$('#admin-email-input');
      if (emailInput) {
        console.log('Entering admin credentials...');
        await page.fill('#admin-email-input', 'admin@accounts.one');
        await page.fill('#password-input', 'Ak@993102');
        
        await page.click('button[type="submit"]');
        console.log('Submit clicked. Waiting for redirection...');
        await page.waitForTimeout(6000); // Wait for transition
        
        console.log(`Admin page URL after login: ${page.url()}`);
        
        // Go to standard edit page
        console.log('Navigating to AS 1 edit page in admin...');
        await page.goto(`${SITE_URL}/admin/entries/10/edit`, { waitUntil: 'domcontentloaded', timeout: 45000 });
        await page.waitForTimeout(4000);
        
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'admin_standard_editor.png'), fullPage: true });
        console.log('Saved admin standard editor screenshot.');
        
        // Switch to Examples tab in editor
        const adminExamplesTab = await page.$('button:has-text("Examples / Case Law")');
        if (adminExamplesTab) {
          console.log('Switching to Examples / Case Law tab in admin editor...');
          await adminExamplesTab.click();
          await page.waitForTimeout(3000);
          await page.screenshot({ path: path.join(ARTIFACT_DIR, 'admin_examples_editor.png'), fullPage: true });
          console.log('Saved admin examples editor screenshot.');
        } else {
          console.log('Examples / Case Law tab not found in admin editor.');
        }
      } else {
        console.log('Could not find login fields.');
      }
    } catch (e) {
      console.error('Error on admin flow:', e.message);
    }
  } catch (err) {
    console.error('General error:', err);
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
}

run().catch(console.error);
