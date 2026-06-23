const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

const pdfPath = path.join(__dirname, '..', 'public', 'pdfs', 'as-1.pdf');
const buffer = fs.readFileSync(pdfPath);
const dataBuffer = new Uint8Array(buffer);

const parser = new PDFParse(dataBuffer);
parser.load().then(async (doc) => {
  console.log('PDF loaded, pages:', doc.numPages);
  let allText = '';
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const text = await parser.getPageText(page, {});
    allText += `--- PAGE ${i} ---\n` + text + '\n\n';
  }
  fs.writeFileSync(path.join(__dirname, 'as1_text.txt'), allText);
  console.log('Saved all text to as1_text.txt');
}).catch(console.error);
