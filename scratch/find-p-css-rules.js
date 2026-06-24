const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const url = 'https://accounts-one-ak-s-projectsakk.vercel.app/standards/as?selected=as-1';
  console.log('Navigating to:', url);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  const details = await page.evaluate(() => {
    const p = document.querySelector('#as1-overview p');
    if (!p) return { error: 'Paragraph not found' };

    const getCssRules = (el) => {
      const sheets = document.styleSheets;
      const matched = [];
      for (const sheet of sheets) {
        try {
          const rules = sheet.cssRules || sheet.rules;
          for (const rule of rules) {
            if (el.matches(rule.selectorText)) {
              matched.push({
                selector: rule.selectorText,
                cssText: rule.cssText
              });
            }
          }
        } catch (e) {
          // ignore cross-origin stylesheet errors
        }
      }
      return matched;
    };

    const parentChain = [];
    let curr = p;
    while (curr) {
      parentChain.push({
        tag: curr.tagName,
        id: curr.id,
        className: curr.className,
        computedColor: window.getComputedStyle(curr).color,
        matchedRules: getCssRules(curr)
      });
      curr = curr.parentElement;
    }

    return {
      parentChain
    };
  });

  console.log('DOM Trace:', JSON.stringify(details, null, 2));
  await browser.close();
})();
