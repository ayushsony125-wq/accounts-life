const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/standards/learning/LearningPortalClient.tsx');
const content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
const lines = content.split('\n');

for (let i = 1500; i < lines.length; i++) {
  if (lines[i].includes('activeTab === \'standard\'') && lines[i].includes('?')) {
    console.log(`Found rendering tab check at line ${i + 1}:`);
    for (let j = Math.max(0, i - 15); j <= Math.min(lines.length - 1, i + 15); j++) {
      console.log(`${j + 1}: ${lines[j]}`);
    }
    break;
  }
}
