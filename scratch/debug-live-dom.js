const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const url = 'https://accounts-one-ak-s-projectsakk.vercel.app/standards/as?selected=as-1';
  console.log('Navigating to:', url);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  const pageInfo = await page.evaluate(() => {
    const mainTitle = document.querySelector('h1')?.innerText || 'No h1';
    const stickyToc = document.getElementById('as1-sticky-toc') ? 'Found' : 'Not Found';
    const overview = document.getElementById('as1-overview') ? 'Found' : 'Not Found';
    const canvas = document.querySelector('.mx-auto.w-full')?.className || 'No canvas element found';
    
    // Check for standard tabs
    const activeTab = document.querySelector('button.bg-\\[\\#EEF2FD\\]')?.innerText || 'No active tab';
    
    // Let's get the standard client-side state
    const stdId = window.location.search;

    return {
      mainTitle,
      stickyToc,
      overview,
      canvas,
      activeTab,
      stdId,
      bodyHtmlSnippet: document.body.innerHTML.substring(0, 1000)
    };
  });

  console.log('Page Info:', pageInfo);
  await browser.close();
})();
