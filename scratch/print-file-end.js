const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/standards/learning/LearningPortalClient.tsx');
const content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
const lines = content.split('\n');

for (let i = 2850; i < lines.length; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
