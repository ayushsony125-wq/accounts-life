const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'standards', 'learning', 'LearningPortalClient.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = 'const AccordionItem =';
const idx = content.indexOf(targetStr);
if (idx !== -1) {
  console.log('--- START ---');
  console.log(content.substring(idx + 600, idx + 1400));
  console.log('--- END ---');
} else {
  console.log('Could not find targetStr');
}
