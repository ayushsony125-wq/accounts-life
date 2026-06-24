const { chromium } = require('playwright');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app/standards/as?selected=as-1';

async function main() {
  console.log('=== RUNNING BRUTALLY HONEST TOC & SCROLL AUDIT ===');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log(`Navigating to: ${SITE_URL}`);
  await page.goto(SITE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  const chapters = [
    { id: 'overview',     title: 'Introduction' },
    { id: 'scope',        title: 'Scope' },
    { id: 'definition',   title: 'Definition of Policies' },
    { id: 'areas',        title: 'Areas of Diversity' },
    { id: 'selection',    title: 'Selection Considerations' },
    { id: 'assumptions',  title: 'Fundamental Assumptions' },
    { id: 'disclosure',   title: 'Disclosure Requirements' },
    { id: 'change-policy',title: 'Changes in Policies' },
    { id: 'footnotes',    title: 'Statutory Footnotes' }
  ];

  const results = [];

  for (const chap of chapters) {
    console.log(`\nTesting click on: ${chap.title} (${chap.id})`);
    
    // Click the button in the TOC
    await page.click(`button[data-toc-id="${chap.id}"]`);
    await page.waitForTimeout(2500); // Wait for smooth scroll animation to settle

    const audit = await page.evaluate((id) => {
      const container = document.getElementById('as1-scroll-container');
      const target = document.getElementById(`as1-${id}`);
      const stickyToc = document.getElementById('as1-sticky-toc');
      const btn = document.querySelector(`button[data-toc-id="${id}"]`);

      if (!container || !target || !stickyToc || !btn) {
        return {
          error: `Missing element(s): container=${!!container}, target=${!!target}, stickyToc=${!!stickyToc}, btn=${!!btn}`
        };
      }

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const tocRect = stickyToc.getBoundingClientRect();

      // The top of the target should ideally line up exactly with the bottom of the sticky TOC.
      const bottomOfToc = tocRect.bottom;
      const topOfTarget = targetRect.top;
      const offset = topOfTarget - bottomOfToc;

      // Active state verification
      const isActiveClass = btn.className.includes('bg-indigo-650') || btn.className.includes('bg-indigo-600') || btn.className.includes('bg-indigo-500');

      return {
        offset: parseFloat(offset.toFixed(2)),
        isActive: isActiveClass,
        targetTopScreenY: targetRect.top,
        tocBottomScreenY: tocRect.bottom
      };
    }, chap.id);

    console.log(`Audit result:`, audit);
    results.push({ chapter: chap.title, id: chap.id, ...audit });
  }

  // Scroll Spy Observer Test: Scroll down to a middle section and check active heading
  console.log('\n--- Testing Scroll Spy Observer ---');
  await page.evaluate(() => {
    const container = document.getElementById('as1-scroll-container');
    if (container) container.scrollTop = 2200; // Scroll container directly
  });
  await page.waitForTimeout(2500);

  const activeAfterScroll = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button[data-toc-id]'));
    const active = btns.find(b => b.className.includes('bg-indigo-600') || b.className.includes('bg-indigo-500') || b.className.includes('bg-indigo-650'));
    return active ? { id: active.getAttribute('data-toc-id'), text: active.innerText } : null;
  });
  console.log('Active heading after scrolling container:', activeAfterScroll);

  await browser.close();
  console.log('\n=== AUDIT COMPLETED ===');
  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
