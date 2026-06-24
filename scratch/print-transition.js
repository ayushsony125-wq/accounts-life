const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/standards/learning/LearningPortalClient.tsx');
const content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
const lines = content.split('\n');

let propsIndex = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('interface LearningPortalClientProps {')) {
    propsIndex = i;
    break;
  }
}

console.log(`Found interface LearningPortalClientProps { at line ${propsIndex + 1}`);
for (let i = propsIndex - 15; i <= propsIndex + 5; i++) {
  if (i >= 0 && i < lines.length) {
    console.log(`${i + 1}: ${lines[i]}`);
  }
}
