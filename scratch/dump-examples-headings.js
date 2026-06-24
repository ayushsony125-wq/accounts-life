const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const url = 'https://accounts-one-ak-s-projectsakk.vercel.app/standards/as?selected=as-1';
  console.log(`Navigating to: ${url}`);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  // Click the Examples & Case Law tab
  // Let's find the button for Examples & Case Law tab.
  // Standard tab is usually active by default. Let's see the tab buttons.
  const tabs = await page.$$('button');
  for (const tab of tabs) {
    const text = await tab.innerText();
    if (text.includes('Examples & Case Law')) {
      console.log('Clicking on Examples & Case Law tab...');
      await tab.click();
      break;
    }
  }
  await page.waitForTimeout(2000);

  // Now, let's print all section headings (h2) in the Examples tab container
  console.log('--- H2 Headings ---');
  const h2s = await page.$$('h2');
  for (const h2 of h2s) {
    console.log('H2:', await h2.innerText());
  }

  // Also print the text inside the sub-navbar buttons
  console.log('--- Sub-navbar buttons ---');
  const subNavs = await page.$$('#as1-examples-sticky-toc button');
  for (const btn of subNavs) {
    console.log('Btn:', await btn.innerText());
  }

  // Also print first few illustration titles (h3)
  console.log('--- First 5 H3 Titles ---');
  const h3s = await page.$$('h3');
  for (let i = 0; i < Math.min(h3s.length, 10); i++) {
    console.log('H3:', await h3s[i].innerText());
  }

  await browser.close();
}

main().catch(console.error);
