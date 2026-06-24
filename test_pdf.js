const fs = require('fs');
const pdfModule = require('pdf-parse');

console.log('pdfModule keys:', Object.keys(pdfModule));
console.log('pdfModule.default:', pdfModule.default);

const dataBuffer = fs.readFileSync('public/pdfs/as-1.pdf');

// Let's try to find how to parse
if (typeof pdfModule === 'function') {
  pdfModule(dataBuffer).then(d => console.log('Parsed using pdfModule')).catch(e => console.log('pdfModule err', e.message));
} else if (pdfModule.default && typeof pdfModule.default === 'function') {
  pdfModule.default(dataBuffer).then(d => console.log('Parsed using default')).catch(e => console.log('default err', e.message));
} else if (pdfModule.PDFParse) {
  // Let's check how to use PDFParse
  console.log('PDFParse is present. Checking structure:', pdfModule.PDFParse.toString());
  try {
    const parser = new pdfModule.PDFParse();
    console.log('Parser instance created. Methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(parser)));
  } catch (err) {
    console.log('Error creating PDFParse instance:', err.message);
  }
}
