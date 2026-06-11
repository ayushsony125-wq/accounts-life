const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else {
      files.push(name);
    }
  }
  return files;
}

const cssDir = path.join(__dirname, '.next/static/css');
if (!fs.existsSync(cssDir)) {
  console.log('No CSS directory found in .next/static/css. Build the project first.');
  process.exit(1);
}

const files = getFiles(cssDir);
console.log('CSS files found:', files);

for (const filePath of files) {
  if (filePath.endsWith('.css')) {
    const file = path.basename(filePath);
    const content = fs.readFileSync(filePath, 'utf-8');
    console.log(`\nFile: ${file} (Size: ${content.length} bytes)`);
    console.log('First 300 chars:', content.substring(0, 300));
    console.log('Contains .mx-auto?', content.includes('.mx-auto'));
    console.log('Contains .text-center?', content.includes('.text-center'));
    console.log('Contains @tailwind?', content.includes('@tailwind'));
  }
}
