const fs = require('fs');
const path = require('path');

const rootDir = 'd:/My Accounts/accounts-life';
const excludeDirs = ['node_modules', '.next', '.git', 'deploy-screenshots', 'prod-screenshots', 'screenshots'];

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (!excludeDirs.includes(file)) {
        scanDir(fullPath);
      }
    } else {
      const ext = path.extname(file);
      if (['.ts', '.tsx', '.js', '.jsx', '.json', '.md'].includes(ext)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('accounts-life.vercel.app')) {
          console.log(`Match found in: ${fullPath}`);
        }
      }
    }
  }
}

console.log('Scanning project for accounts-life.vercel.app references...');
scanDir(rootDir);
console.log('Scan complete.');
