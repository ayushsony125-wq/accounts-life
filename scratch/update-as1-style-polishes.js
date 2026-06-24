const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/standards/learning/LearningPortalClient.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Get AS1StandardTabContent range
const startMarker = 'function AS1StandardTabContent';
const endMarker = 'interface LearningPortalClientProps';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find AS1StandardTabContent bounds");
  process.exit(1);
}

let tabContent = content.substring(startIndex, endIndex);

// 1. Replace the timeline step circles to use the Indigo theme
tabContent = tabContent.replace(
  /border-2 border-amber-605 dark:border-amber-500 flex items-center justify-center text-xs font-bold text-amber-850 dark:text-amber-300 bg-amber-50 dark:bg-amber-955\/20/g,
  'border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center text-xs font-bold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/20'
);
tabContent = tabContent.replace(
  /border-2 border-amber-600 dark:border-amber-500 flex items-center justify-center text-xs font-bold text-amber-850 dark:text-amber-300 bg-amber-50 dark:bg-amber-955\/20/g,
  'border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center text-xs font-bold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/20'
);

// 2. Fix the non-existent bg-slate-150 class to bg-slate-100 for clean tr headers
tabContent = tabContent.replace(/bg-slate-150\/70/g, 'bg-slate-100');

// 3. Make all occurrences of text-slate-605 inside AS1StandardTabContent darker (to text-slate-800)
tabContent = tabContent.replace(/text-slate-650/g, 'text-slate-900');
tabContent = tabContent.replace(/text-slate-605/g, 'text-slate-800');

// 4. Make all remaining text-slate-500 (light grey) and text-slate-600 in tabContent darker (to slate-800 / slate-700)
// This targets the secondary details to make them near-black for high readability
tabContent = tabContent.replace(/text-slate-500/g, 'text-slate-800 dark:text-slate-200');
tabContent = tabContent.replace(/text-slate-600/g, 'text-slate-900 dark:text-slate-100');

// Re-assemble content
content = content.substring(0, startIndex) + tabContent + content.substring(endIndex);

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Successfully polished styles in LearningPortalClient.tsx!");
