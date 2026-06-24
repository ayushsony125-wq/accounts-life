const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/standards/learning/AS1ExamplesCustomContent.tsx');
const code = fs.readFileSync(filePath, 'utf8');

// Find CaseStudyCard instantiations
// We can use a simple regex or parser to match <CaseStudyCard ... />
const cardRegex = /<CaseStudyCard\s+id="([^"]+)"\s+title="([^"]+)"([\s\S]*?)\/>/g;
let match;
const cards = [];

while ((match = cardRegex.exec(code)) !== null) {
  const id = match[1];
  const title = match[2];
  const body = match[3];
  
  // Count words in the body of the Card definition (ignoring syntax characters where possible)
  // Clean tags and JSX characters
  const cleanBody = body
    .replace(/<\/?[a-zA-Z]+[^>]*>/g, ' ') // remove HTML tags
    .replace(/panels=\[\s*/g, '')
    .replace(/content:\s*\(/g, '')
    .replace(/title:\s*"[^"]*"/g, '') // remove panel titles
    .replace(/[^a-zA-Z0-9\s]/g, ' ') // remove punctuation
    .trim();
  
  const words = cleanBody.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  
  cards.push({ id, title, wordCount });
}

console.log('--- CARD WORD COUNT ANALYSIS ---');
console.log(`Total CaseStudyCards found: ${cards.length}`);
console.log('--------------------------------------------------');
let underLimitCount = 0;
cards.forEach(c => {
  console.log(`ID: ${c.id.padEnd(6)} | Words: ${String(c.wordCount).padStart(5)} | Title: ${c.title.substring(0, 60)}...`);
  if (c.wordCount < 400) {
    underLimitCount++;
  }
});
console.log('--------------------------------------------------');
console.log(`Cards with < 400 words: ${underLimitCount}`);
