const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1440, height: 900 });
  const url = 'https://accounts-one-ak-s-projectsakk.vercel.app/standards/as?selected=as-1';
  
  console.log('Navigating to live URL:', url);
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  } catch (err) {
    console.log('Navigation timed out, trying to proceed anyway:', err.message);
  }
  
  await page.waitForTimeout(3000);
  
  console.log('Clicking Examples & Case Law tab...');
  try {
    const tabBtn = page.locator('button:has-text("Examples & Case Law")');
    await tabBtn.waitFor({ state: 'visible', timeout: 15000 });
    await tabBtn.click();
    console.log('Clicked Examples & Case Law tab.');
  } catch (err) {
    console.log('Error finding Examples & Case Law tab button:', err.message);
  }
  
  await page.waitForTimeout(4000);
  
  const artifactDir = 'C:\\Users\\ayush\\.gemini\\antigravity\\brain\\990b0c71-333d-4e0a-8054-4eed28bae673';
  if (!fs.existsSync(artifactDir)) {
    fs.mkdirSync(artifactDir, { recursive: true });
  }

  // Take screenshot of top nav row
  const stickyToc = await page.$('#as1-examples-sticky-toc');
  if (stickyToc) {
    console.log('Taking screenshot of sticky TOC...');
    await stickyToc.screenshot({ path: path.join(artifactDir, 'audit_sticky_toc.png') });
  } else {
    console.log('Sticky TOC not found!');
  }
  
  // Take screenshot of first card
  const firstCard = await page.$('#item-1-1, #sec-icai-illustrations div div');
  if (firstCard) {
    console.log('Taking screenshot of first card...');
    await firstCard.screenshot({ path: path.join(artifactDir, 'audit_first_card.png') });
  } else {
    console.log('First card not found!');
  }
  
  // Take screenshot of overall page
  await page.screenshot({ path: path.join(artifactDir, 'audit_overall_page.png') });
  console.log('Overall page screenshot taken.');

  // Perform DOM Audit
  const auditData = await page.evaluate(() => {
    // 1. Navigation row audit
    const tocContainer = document.querySelector('#as1-examples-sticky-toc div div');
    const navButtons = Array.from(document.querySelectorAll('#as1-examples-sticky-toc button'));
    const navButtonsInfo = navButtons.map(btn => {
      const rect = btn.getBoundingClientRect();
      const parentRect = tocContainer ? tocContainer.getBoundingClientRect() : { left: 0, right: 0 };
      return {
        text: btn.innerText,
        dataId: btn.getAttribute('data-toc-id'),
        left: rect.left,
        right: rect.right,
        width: rect.width,
        isClipped: rect.left < parentRect.left || rect.right > parentRect.right
      };
    });
    
    // 2. Illustration numbering audit
    const h3Elements = Array.from(document.querySelectorAll('#sec-icai-illustrations h3, h3'));
    const allTitles = h3Elements.map(h => h.innerText);
    
    // 3. Content review: verify panels in each card
    // Let's grab all cards in the container
    const cards = Array.from(document.querySelectorAll('[id^="item-"]'));
    const cardsInfo = cards.map(c => {
      const titleEl = c.querySelector('h3');
      const titleText = titleEl ? titleEl.innerText : 'Unknown Title';
      
      const badgeEl = c.querySelector('span[class*="badge"], span[class*="uppercase"]');
      const category = badgeEl ? badgeEl.innerText : 'Unknown';
      
      const panelTitleEls = Array.from(c.querySelectorAll('span[class*="panelTitle"], span[class*="uppercase"]'));
      const panels = panelTitleEls.map(p => p.innerText.trim()).filter(text => text !== category && text !== '');
      
      // Look for PDF reference button/links
      const pdfRefs = Array.from(c.querySelectorAll('button[title*="PDF"], a[title*="PDF"]'));
      const pdfPageRefs = pdfRefs.map(r => r.getAttribute('data-pdf-page') || r.innerText || 'Ref');
      
      // Inline pdf refs in text
      const inlinePdfRefs = Array.from(c.querySelectorAll('[data-pdf-page]')).map(el => el.getAttribute('data-pdf-page'));

      return {
        id: c.id,
        title: titleText,
        category: category,
        panels: panels,
        pdfPageRefs: pdfPageRefs,
        inlinePdfRefs: inlinePdfRefs
      };
    });

    return {
      navButtons: navButtonsInfo,
      allTitles: allTitles,
      cards: cardsInfo,
      scrollContainer: tocContainer ? {
        scrollLeft: tocContainer.scrollLeft,
        scrollWidth: tocContainer.scrollWidth,
        clientWidth: tocContainer.clientWidth
      } : null
    };
  });

  console.log('AUDIT RESULT JSON START');
  console.log(JSON.stringify(auditData, null, 2));
  console.log('AUDIT RESULT JSON END');

  await browser.close();
})();
