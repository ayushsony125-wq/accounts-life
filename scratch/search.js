const fs = require('fs');
const path = require('path');

const query = process.argv[2] || 'uploadPdfAction';
console.log(`Searching for "${query}" in files...`);

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        searchDir(fullPath);
      }
    } else if (stat.isFile() && /\.(js|ts|tsx|json)$/.test(file)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes(query)) {
        console.log(`Found in: ${fullPath}`);
        // print matching lines
        const lines = content.split('\n');
        lines.forEach((line, index) => {
          if (line.includes(query)) {
            console.log(`  Line ${index + 1}: ${line.trim()}`);
          }
        });
      }
    }
  }
}

searchDir(path.join(__dirname, '..'));
