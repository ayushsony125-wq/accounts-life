const fs = require('fs');
const path = require('path');

const v5Path = path.join(__dirname, 'update-tab-content-v5.js');
const v5Content = fs.readFileSync(v5Path, 'utf8').replace(/\r\n/g, '\n');

const markerStart = 'const newComponentCode = `';
const startIdx = v5Content.indexOf(markerStart);
const markerEnd = '`;\n\nconst prefix =';
const endIdx = v5Content.indexOf(markerEnd);
const code = v5Content.substring(startIdx + markerStart.length, endIdx);

let braces = 0;
let brackets = 0;
let parens = 0;

for (let i = 0; i < code.length; i++) {
  const char = code[i];
  if (char === '{') braces++;
  else if (char === '}') braces--;
  else if (char === '[') brackets++;
  else if (char === ']') brackets--;
  else if (char === '(') parens++;
  else if (char === ')') parens--;
}

console.log(`Braces count (should be 0 if balanced): ${braces}`);
console.log(`Brackets count (should be 0 if balanced): ${brackets}`);
console.log(`Parens count (should be 0 if balanced): ${parens}`);
