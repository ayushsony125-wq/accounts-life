const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../app/standards/learning/AS1ExamplesData.tsx');
let content = fs.readFileSync(targetPath, 'utf8');

// Fix the syntax error in Case 3.1 using single quotes
content = content.replace(
  '            Qualified Opinion: Except for the effects of the matter described in the Basis for Qualified Opinion paragraph, the financial statements give a true and fair view..."`.}',
  '            Qualified Opinion: Except for the effects of the matter described in the Basis for Qualified Opinion paragraph, the financial statements give a true and fair view..."`}'
);

// Fix all slate-205 typos
content = content.split('dark:text-slate-205').join('dark:text-slate-200');

fs.writeFileSync(targetPath, content, 'utf8');
console.log('Fixed AS1ExamplesData.tsx syntax and class name typos successfully.');
