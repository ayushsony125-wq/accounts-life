const fs = require('fs');
const path = require('path');

// Let's find the main file of pdf-parse
const resolveMain = require.resolve('pdf-parse');
console.log('Main file path:', resolveMain);

// Let's read it to see how it exports
const mainContent = fs.readFileSync(resolveMain, 'utf-8');
console.log('Main file exports (first 500 chars):');
console.log(mainContent.substring(0, 500));

// Let's try importing via path
const pdfParsePath = path.dirname(resolveMain);
console.log('pdf-parse dir:', pdfParsePath);
