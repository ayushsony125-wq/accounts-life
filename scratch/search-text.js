const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (!['node_modules', '.next', '.git', '.vercel', 'deploy-screenshots', 'prod-screenshots', 'screenshots'].includes(file)) {
        results = results.concat(walk(filePath));
      }
    } else {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.js') || filePath.endsWith('.json') || filePath.endsWith('.md')) {
        results.push(filePath);
      }
    }
  });
  return results;
}

const files = walk('.');
console.log(`Scanning ${files.length} files...`);

const terms = ['SECTION INDEX', 'QUICK NAVIGATION', 'Quick Navigation', 'Section Index'];
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  terms.forEach(term => {
    if (content.includes(term)) {
      console.log(`Found "${term}" in ${file}`);
    }
  });
});
console.log('Search complete.');
