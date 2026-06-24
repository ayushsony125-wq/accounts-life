const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/standards/learning/LearningPortalClient.tsx');
const content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
const lines = content.split('\n');

let count = 0;
for (let i = 1000; i < lines.length; i++) {
  if (lines[i].trim() === 'return (') {
    count++;
    console.log(`Return block #${count} at line ${i + 1}:`);
    for (let j = i; j <= i + 15; j++) {
      console.log(`${j + 1}: ${lines[j]}`);
    }
  }
}
