const fs = require('fs');
const { PDFParse } = require('pdf-parse');

const pdfPath = 'public/pdfs/as-1.pdf';
const outPath = 'C:\\Users\\ayush\\.gemini\\antigravity\\brain\\990b0c71-333d-4e0a-8054-4eed28bae673\\as-1-pdf-text.txt';

async function run() {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    console.log('Reading PDF file...');
    const parser = new PDFParse({ data: dataBuffer });
    console.log('Parsing PDF...');
    const result = await parser.getText();
    fs.writeFileSync(outPath, result.text);
    await parser.destroy();
    console.log('PDF text extracted successfully to:', outPath);
  } catch (err) {
    console.error('Error parsing PDF:', err);
  }
}

run();
