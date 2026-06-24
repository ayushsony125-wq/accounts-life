const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/standards/learning/LearningPortalClient.tsx');
const content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
const lines = content.split('\n');

let mainReturn = -1;
for (let i = 1450; i < lines.length; i++) {
  if (lines[i].includes('export default function LearningPortalClient') || lines[i].includes('function LearningPortalClient')) {
    // Find the return statement inside it
    for (let j = i; j < lines.length; j++) {
      if (lines[j].trim() === 'return (') {
        mainReturn = j;
        console.log(`Found main return block at line ${j + 1}:`);
        for (let k = j; k <= j + 50; k++) {
          console.log(`${k + 1}: ${lines[k]}`);
        }
        break;
      }
    }
    break;
  }
}
