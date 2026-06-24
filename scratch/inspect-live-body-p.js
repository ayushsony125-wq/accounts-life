const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const url = 'https://accounts-one-ak-s-projectsakk.vercel.app/standards/as?selected=as-1';
  console.log('Navigating to:', url);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  const styles = await page.evaluate(() => {
    const bodyP = document.querySelector('#as1-overview .space-y-6 p');
    if (!bodyP) return { error: 'Body paragraph not found' };

    return {
      classes: bodyP.className,
      color: window.getComputedStyle(bodyP).color,
      parentClasses: bodyP.parentElement.className,
      parentColor: window.getComputedStyle(bodyP.parentElement).color,
      fontWeight: window.getComputedStyle(bodyP).fontWeight,
      fontSize: window.getComputedStyle(bodyP).fontSize
    };
  });

  console.log('Body Paragraph Styles:', JSON.stringify(styles, null, 2));
  await browser.close();
})();
