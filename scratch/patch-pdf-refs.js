/**
 * Replaces all [Source: ICAI AS 1 PDF Page N] and [Source: ICAI AS 1 PDF Page N, Page M] 
 * literal text patterns in LearningPortalClient.tsx with JSX <PdfRef page={N} /> components.
 *
 * These patterns currently render as ugly literal text in the browser.
 * After this patch, they become clickable red-bordered page-reference buttons.
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/standards/learning/LearningPortalClient.tsx');
let content = fs.readFileSync(filePath, 'utf8');

let count = 0;

// Handle "Page X, Page Y" FIRST (two pages), then single-page patterns
// Pattern: [Source: ICAI AS 1 PDF Page 9, Page 10]
content = content.replace(
  /\[Source: ICAI AS 1 PDF Page (\d+), Page (\d+)\]/g,
  (match, p1, p2) => {
    count++;
    return `<PdfRef page={${p1}} /><PdfRef page={${p2}} />`;
  }
);

// Pattern: [Source: ICAI AS 1 PDF Page 2]
content = content.replace(
  /\[Source: ICAI AS 1 PDF Page (\d+)\]/g,
  (match, p1) => {
    count++;
    return `<PdfRef page={${p1}} />`;
  }
);

fs.writeFileSync(filePath, content, 'utf8');
console.log(`✅ Done! Replaced ${count} source reference(s) with <PdfRef> components.`);
