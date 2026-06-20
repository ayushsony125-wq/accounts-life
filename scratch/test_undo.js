const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // Listen to browser console
  page.on('console', msg => console.log(`[Browser] ${msg.text()}`));
  page.on('pageerror', err => console.error(`[Browser Error] ${err.message}`));

  // Go to login page and login
  console.log('Logging in...');
  await page.goto('https://accounts-one-ak-s-projectsakk.vercel.app/admin/login');
  await page.click('button:has-text("Admin Login")');
  await page.waitForTimeout(500);
  await page.fill('input[id="admin-email-input"]', 'admin@accounts.one');
  await page.fill('input[id="password-input"]', 'Ak@993102');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  // Navigate to edit page
  console.log('Navigating to edit page...');
  await page.goto('https://accounts-one-ak-s-projectsakk.vercel.app/admin/entries/10/edit');
  await page.waitForTimeout(4000);

  // Set up event listener in the page to trace custom event dispatching
  await page.evaluate(() => {
    window.addEventListener('cms-editor-state', (e) => {
      console.log('CMS_STATE_EVENT: ' + JSON.stringify(e.detail));
    });
  });

  console.log('Editing summary...');
  await page.fill('textarea[placeholder*="Short meta description"]', 'This is a brand new description to trigger history stack changes.');
  
  // Wait and print status every second for 5 seconds to observe state propagation
  for (let i = 1; i <= 5; i++) {
    await page.waitForTimeout(1000);
    const status = await page.evaluate(() => {
      const undoBtn = document.querySelector('button[title*="Undo"]');
      const redoBtn = document.querySelector('button[title*="Redo"]');
      return {
        undoDisabled: undoBtn ? undoBtn.disabled : null,
        redoDisabled: redoBtn ? redoBtn.disabled : null,
        undoTitle: undoBtn ? undoBtn.title : null
      };
    });
    console.log(`Second ${i} status:`, status);
  }

  await browser.close();
}

main().catch(console.error);
