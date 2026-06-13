const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../lib/data/static-entries.ts');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

let startIndex = -1;
let endIndex = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('export const AS_1_ENTRY')) {
    startIndex = i;
  }
  if (startIndex !== -1 && lines[i].includes('export const IND_AS_1_ENTRY')) {
    endIndex = i;
    break;
  }
}

console.log(`AS_1_ENTRY starts at line ${startIndex + 1} and ends before line ${endIndex + 1}`);
if (startIndex !== -1) {
  const range = lines.slice(startIndex, startIndex + 100).join('\n');
  console.log('--- FIRST 100 LINES OF AS_1_ENTRY ---');
  console.log(range);
}
