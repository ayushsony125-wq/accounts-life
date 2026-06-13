const fs = require('fs');
const path = require('path');

const targetWords = [/interactive/i, /portal/i, /authority/i, /icai/i, /mca/i, /mcs/i];

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        searchDir(fullPath);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.json')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        for (const regex of targetWords) {
          if (regex.test(line)) {
            console.log(`${fullPath}:${index + 1}: ${line.trim()}`);
            break;
          }
        }
      });
    }
  }
}

console.log('--- DETAILED SEARCH ---');
searchDir('app');
searchDir('components');
console.log('--- DONE ---');
