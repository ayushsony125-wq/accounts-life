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
    const mainCanvas = document.querySelector('#as1-overview')?.parentElement;
    if (!mainCanvas) return { error: 'Main canvas not found' };

    const toc = document.getElementById('as1-sticky-toc');
    const tocInner = toc ? toc.firstElementChild : null;
    const bodyP = document.querySelector('#as1-overview p');
    const h2 = document.querySelector('#as1-overview h2');

    return {
      canvasClasses: mainCanvas.className,
      canvasComputed: {
        width: window.getComputedStyle(mainCanvas).width,
        maxWidth: window.getComputedStyle(mainCanvas).maxWidth,
        marginLeft: window.getComputedStyle(mainCanvas).marginLeft,
        marginRight: window.getComputedStyle(mainCanvas).marginRight,
        paddingLeft: window.getComputedStyle(mainCanvas).paddingLeft,
        paddingRight: window.getComputedStyle(mainCanvas).paddingRight
      },
      tocClasses: toc ? toc.className : 'no toc',
      tocInnerComputed: tocInner ? {
        width: window.getComputedStyle(tocInner).width,
        maxWidth: window.getComputedStyle(tocInner).maxWidth
      } : null,
      pColor: bodyP ? window.getComputedStyle(bodyP).color : 'no p',
      pFontWeight: bodyP ? window.getComputedStyle(bodyP).fontWeight : 'no p',
      h2Color: h2 ? window.getComputedStyle(h2).color : 'no h2',
      h2FontWeight: h2 ? window.getComputedStyle(h2).fontWeight : 'no h2',
      h2FontSize: h2 ? window.getComputedStyle(h2).fontSize : 'no h2'
    };
  });

  console.log('Live Styles:', JSON.stringify(styles, null, 2));
  await browser.close();
})();
