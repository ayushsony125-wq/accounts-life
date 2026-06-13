const fs = require('fs');
const path = require('path');

const regexes = [
  /introduction to the Accounting Standards/i,
  /applicability of AS to different/i,
  /This section provides an introduction/i
];

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
      for (const rx of regexes) {
        if (rx.test(content)) {
          console.log(`Found match in: ${fullPath}`);
          break;
        }
      }
    }
  }
}

searchDir('.');
