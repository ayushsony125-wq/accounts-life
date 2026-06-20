const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app';
const ARTIFACT_DIR = 'C:/Users/ayush/.gemini/antigravity/brain/d66d11ee-abbd-4673-b8af-1ccd6f3745b9';

async function captureViewport(width, height, filename) {
  console.log(`\nCapturing viewport: ${width}x${height}`);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width, height });
  
  await page.goto(SITE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // Viewport screenshot (exactly what is visible on first screen)
  const savePath = path.join(ARTIFACT_DIR, filename);
  await page.screenshot({ path: savePath, fullPage: false });
  console.log(`✓ Screenshot saved: ${savePath}`);
  
  // Let's verify card layout and section visibility
  const visibilityInfo = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('[id^="domain-card-"]'));
    const updatesSection = document.querySelector('section[aria-labelledby="updates-heading"]');
    
    // Check cards row layout
    let inSingleRow = true;
    if (cards.length > 0) {
      const firstCardY = cards[0].getBoundingClientRect().top;
      for (let i = 1; i < cards.length; i++) {
        if (Math.abs(cards[i].getBoundingClientRect().top - firstCardY) > 5) {
          inSingleRow = false;
          break;
        }
      }
    }
    
    // Check if Latest Updates is visible within the viewport (height)
    let updatesVisible = false;
    if (updatesSection) {
      const rect = updatesSection.getBoundingClientRect();
      updatesVisible = rect.top < window.innerHeight;
    }
    
    return {
      cardCount: cards.length,
      inSingleRow,
      updatesVisible,
      viewportHeight: window.innerHeight
    };
  });
  
  console.log(`- Card Count: ${visibilityInfo.cardCount}`);
  console.log(`- All cards in single row: ${visibilityInfo.inSingleRow}`);
  console.log(`- Latest Updates visible on screen: ${visibilityInfo.updatesVisible}`);
  
  await browser.close();
}

async function main() {
  if (!fs.existsSync(ARTIFACT_DIR)) {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  }
  
  // 1. Verify 1920x1080 viewport
  await captureViewport(1920, 1080, 'after_homepage_1920x1080.png');
  
  // 2. Verify 1366x768 viewport
  await captureViewport(1366, 768, 'after_homepage_1366x768.png');
}

main().catch(console.error);
