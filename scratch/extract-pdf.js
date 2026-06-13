const fs = require('fs');
const { chromium } = require('playwright');

async function extractText() {
  const pdfPath = 'C:\\Users\\ayush\\Downloads\\89095asb-aps2918-as1.pdf';
  if (!fs.existsSync(pdfPath)) {
    console.error('File not found');
    return;
  }
  const pdfBuffer = fs.readFileSync(pdfPath);
  const pdfBase64 = pdfBuffer.toString('base64');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Go to a blank page
  await page.goto('about:blank');
  
  // Inject PDF.js
  await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js' });
  
  // Extract text using PDF.js in the browser context
  const textContent = await page.evaluate(async (base64) => {
    // Decode base64 to TypedArray
    const bin = atob(base64);
    const len = bin.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = bin.charCodeAt(i);
    }
    
    // Set worker src
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
    
    const loadingTask = pdfjsLib.getDocument({ data: bytes });
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += `\n--- PAGE ${pageNum} ---\n` + pageText;
    }
    return fullText;
  }, pdfBase64);
  
  console.log(textContent);
  await browser.close();
}

extractText().catch(console.error);
