const fs = require('fs');
const path = require('path');

const filePath = path.resolve('d:/My Accounts/accounts-life/app/standards/learning/LearningPortalClient.tsx');
const content = fs.readFileSync(filePath, 'utf8');

const startIdx = content.indexOf('function AS1StandardTabContent');
if (startIdx === -1) {
  console.error('Could not locate AS1StandardTabContent');
  process.exit(1);
}

// Find the opening brace of the function body, which is after the parameter block.
// The parameter block ends with the closing parenthesis of the function declaration.
const bodyStartIdx = content.indexOf('{', content.indexOf(')', startIdx));
if (bodyStartIdx === -1) {
  console.error('Could not locate body start');
  process.exit(1);
}

let openBraces = 0;
let endIdx = -1;
let foundStart = false;

for (let i = bodyStartIdx; i < content.length; i++) {
  if (content[i] === '{') {
    openBraces++;
    foundStart = true;
  } else if (content[i] === '}') {
    openBraces--;
  }
  if (foundStart && openBraces === 0) {
    endIdx = i;
    break;
  }
}

if (endIdx === -1) {
  console.error('Could not locate body end');
  process.exit(1);
}

const funcCode = content.substring(startIdx, endIdx + 1);

// Clean up code: remove JSX tags, comments, variables, etc.
// Keep only text content inside quotes or inside return block tags
const textSegments = [];
// A simple regex to find JSX text segments (anything between > and <)
const matches = funcCode.match(/>([^<>{]+)</g);
if (matches) {
  for (const m of matches) {
    const text = m.substring(1, m.length - 1).trim();
    if (text) {
      textSegments.push(text);
    }
  }
}

const rawText = textSegments.join(' ');
const wordCount = rawText.split(/\s+/).filter(w => w.length > 0).length;
const charCount = rawText.length;

console.log('--- STATS ---');
console.log('Raw text word count:', wordCount);
console.log('Raw text character count:', charCount);
console.log('Sample text:', rawText.substring(0, 300) + '...');
