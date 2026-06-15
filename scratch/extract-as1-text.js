const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const pdfPath = path.join(__dirname, '../public/pdfs/as-1.pdf');
const outputPath = path.join(__dirname, 'as1-text.txt');

if (!fs.existsSync(pdfPath)) {
  console.error(`PDF not found at: ${pdfPath}`);
  process.exit(1);
}

const dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then((data) => {
  // data.text contains all extracted text
  fs.writeFileSync(outputPath, data.text, 'utf-8');
  console.log('Text extraction complete!');
  console.log(`Saved to: ${outputPath}`);
  console.log(`Total Pages parsed: ${data.numpages}`);
  console.log(`Extracted text length: ${data.text.length} characters`);
  process.exit(0);
}).catch((err) => {
  console.error('Error parsing PDF:', err);
  process.exit(1);
});
