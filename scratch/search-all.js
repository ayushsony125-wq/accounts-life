const fs = require('fs');
const path = require('path');

const target = "This section provides an introduction";
const target2 = "Intro to AS & Applicability";

function search(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        search(fullPath);
      }
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.json') || file.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes(target) || content.includes(target2)) {
          console.log('Match found in:', fullPath);
        }
      }
    }
  }
}

search('.');
console.log('Search finished.');
