const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/standards/learning/LearningPortalClient.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Normalize to LF
content = content.replace(/\r\n/g, '\n');
const lines = content.split('\n');

let startIndex = -1;
let endIndex = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('function AS1StandardTabContent({ navigateToPdfPage, renderTextWithReferences }')) {
    startIndex = i;
    break;
  }
}

for (let i = startIndex; i < lines.length; i++) {
  if (lines[i].trim() === 'interface LearningPortalClientProps {') {
    for (let j = i - 1; j > startIndex; j--) {
      if (lines[j].trim() === '}') {
        endIndex = j;
        break;
      }
    }
    break;
  }
}

console.log(`LF Normalized - startIndex: ${startIndex} ("${lines[startIndex]}"), endIndex: ${endIndex} ("${lines[endIndex]}")`);
