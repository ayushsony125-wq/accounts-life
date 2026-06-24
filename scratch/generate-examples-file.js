const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'as1_new_content.txt');
const targetPath = path.join(__dirname, '../app/standards/learning/AS1ExamplesCustomContent.tsx');

try {
  const content = fs.readFileSync(sourcePath, 'utf8');
  fs.writeFileSync(targetPath, content, 'utf8');
  console.log('Successfully wrote AS1ExamplesCustomContent.tsx from text source.');
} catch (err) {
  console.error('Error writing file:', err);
  process.exit(1);
}
