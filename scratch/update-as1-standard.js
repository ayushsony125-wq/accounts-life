const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'standards', 'learning', 'LearningPortalClient.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Normalize line endings to LF (\n) to make matching robust
content = content.replace(/\r\n/g, '\n');

// 1. Update AccordionItem badge classes
const oldBadge = 'className="text-amber-700 dark:text-amber-500 font-mono text-xs font-bold bg-amber-50/30 dark:bg-amber-955/20 px-2.5 py-0.5 rounded border border-amber-200/30 dark:border-amber-900/30"';
const newBadge = 'className="text-amber-805 dark:text-amber-300 font-mono text-xs font-bold bg-amber-100/60 dark:bg-amber-955/20 px-2.5 py-0.5 rounded border border-amber-250/50 dark:border-amber-900/30 select-none"';
if (content.includes(oldBadge)) {
  content = content.replace(oldBadge, newBadge);
  console.log('AccordionItem badge updated.');
} else {
  console.log('WARNING: AccordionItem badge not found!');
}

// 2. Update AccordionItem title to bold and add PdfRef
const oldTitle = '<span className="text-sm sm:text-[15px] tracking-tight">{title}</span>';
const newTitle = '<span className="text-sm sm:text-[15px] tracking-tight font-sans font-bold text-slate-900 dark:text-white">{title}</span>\n            <PdfRef page={5} />';
if (content.includes(oldTitle)) {
  content = content.replace(oldTitle, newTitle);
  console.log('AccordionItem title updated with PdfRef.');
} else {
  console.log('WARNING: AccordionItem title not found!');
}

// Restore Windows CR+LF style for output compatibility
content = content.replace(/\n/g, '\r\n');

fs.writeFileSync(filePath, content, 'utf8');
console.log('AccordionItem updates completed.');
