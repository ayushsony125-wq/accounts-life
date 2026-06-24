const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/standards/learning/LearningPortalClient.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Expand canvas max-width from [1100px] to [1280px]
content = content.replace(/max-w-\[1100px\]/g, 'max-w-[1280px]');

// 2. Increase text contrast: replace text-slate-900 dark:text-slate-100 with text-slate-950 dark:text-slate-50
// within AS1StandardTabContent function body (we target the range containing it)
const startMarker = 'function AS1StandardTabContent';
const endMarker = 'interface LearningPortalClientProps';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find boundaries for AS1StandardTabContent");
  process.exit(1);
}

let tabContent = content.substring(startIndex, endIndex);

// Replace paragraph text colors for stronger contrast
tabContent = tabContent.replace(/text-slate-900 dark:text-slate-100/g, 'text-slate-950 dark:text-slate-50');

// Also update text-slate-900 in headers or table headers within this tab
tabContent = tabContent.replace(/text-slate-900 dark:text-white/g, 'text-slate-950 dark:text-white');

// 3. Improve heading styles: make subheadings and table headers larger and bolder
// Subheadings 5A, 5B, 5C, 6A, 6B, 6C: Change font-bold text-base text-slate-900 to font-extrabold text-[17px] text-slate-950
tabContent = tabContent.replace(
  /h3 className="font-sans font-bold text-base text-slate-950 dark:text-white flex items-center gap-3/g,
  'h3 className="font-sans font-extrabold text-[17px] text-slate-950 dark:text-white flex items-center gap-3'
);
tabContent = tabContent.replace(
  /h3 className="font-sans font-bold text-base text-slate-900 dark:text-white flex items-center gap-3/g,
  'h3 className="font-sans font-extrabold text-[17px] text-slate-950 dark:text-white flex items-center gap-3'
);

// Checklist headers
tabContent = tabContent.replace(
  /h4 className="font-sans font-bold text-sm tracking-wide text-slate-950 dark:text-white">/g,
  'h4 className="font-sans font-extrabold text-[15px] tracking-wide text-slate-950 dark:text-white">'
);
tabContent = tabContent.replace(
  /h4 className="font-sans font-bold text-sm tracking-wide text-slate-900 dark:text-white">/g,
  'h4 className="font-sans font-extrabold text-[15px] tracking-wide text-slate-950 dark:text-white">'
);

// Table captions / labels
tabContent = tabContent.replace(
  /text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider font-mono/g,
  'text-slate-800 dark:text-slate-200 text-[13px] font-extrabold uppercase tracking-wide font-sans'
);

// Column headers font sizes
tabContent = tabContent.replace(
  /py-4 px-4 font-bold text-slate-950 dark:text-white uppercase tracking-wider text-\[10px\]/g,
  'py-4 px-4 font-extrabold text-slate-950 dark:text-white uppercase tracking-wider text-[12px]'
);
tabContent = tabContent.replace(
  /py-4 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-\[10px\]/g,
  'py-4 px-4 font-extrabold text-slate-950 dark:text-white uppercase tracking-wider text-[12px]'
);

// Table column headers text size and weight
tabContent = tabContent.replace(
  /py-3.5 px-5 font-bold/g,
  'py-3.5 px-5 font-extrabold text-[14px] text-slate-950 dark:text-white'
);
tabContent = tabContent.replace(
  /py-3 px-4 font-bold/g,
  'py-3 px-4 font-extrabold text-[14px] text-slate-950 dark:text-white'
);

// 4. Mix professional colors across Chapter 5 selection consideration cards
// Let's replace the whole grid block of Chapter 5 cards to be beautiful and distinct
const oldGridBlock = `          {/* 3-Column Amber Highlight Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6 font-serif w-full">
            <div className="p-5 border border-amber-150 dark:border-amber-900/30 bg-amber-50/20 dark:bg-amber-955/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-450 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-500"></span>
                <span>1. Prudence</span>
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-950 dark:text-slate-50 font-medium">
                Caution in prepared judgments: profits are recognized only when realized, and provisions are made for all known liabilities and losses.
              </p>
            </div>
            <div className="p-5 border border-amber-150 dark:border-amber-900/30 bg-amber-50/20 dark:bg-amber-955/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-450 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-500"></span>
                <span>2. Substance over Form</span>
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-950 dark:text-slate-50 font-medium">
                Accounting for economic reality and financial substance rather than legal technicalities.
              </p>
            </div>
            <div className="p-5 border border-amber-150 dark:border-amber-900/30 bg-amber-50/20 dark:bg-amber-955/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-450 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-500"></span>
                <span>3. Materiality</span>
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-950 dark:text-slate-50 font-medium">
                Disclosing all significant facts that could influence the economic choices of users based on size or nature.
              </p>
            </div>
          </div>`;

const newGridBlock = `          {/* 3-Column Mixed Professional Highlight Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6 font-serif w-full">
            {/* Card 1: Prudence (Amber) */}
            <div className="p-5 border border-amber-200 dark:border-amber-900/40 bg-amber-50/25 dark:bg-amber-955/5 rounded-xl space-y-2 shadow-3xs">
              <h4 className="font-sans font-extrabold text-xs uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-500"></span>
                <span>1. Prudence</span>
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-950 dark:text-slate-50 font-medium">
                Caution in prepared judgments: profits are recognized only when realized, and provisions are made for all known liabilities and losses. <PdfRef page={6} />
              </p>
            </div>
            {/* Card 2: Substance over Form (Blue) */}
            <div className="p-5 border border-blue-200 dark:border-blue-900/40 bg-blue-50/25 dark:bg-blue-955/5 rounded-xl space-y-2 shadow-3xs">
              <h4 className="font-sans font-extrabold text-xs uppercase tracking-wider text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-500"></span>
                <span>2. Substance over Form</span>
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-950 dark:text-slate-50 font-medium">
                Accounting for economic reality and financial substance rather than legal technicalities. <PdfRef page={6} />
              </p>
            </div>
            {/* Card 3: Materiality (Teal) */}
            <div className="p-5 border border-teal-200 dark:border-teal-900/40 bg-teal-50/25 dark:bg-teal-955/5 rounded-xl space-y-2 shadow-3xs">
              <h4 className="font-sans font-extrabold text-xs uppercase tracking-wider text-teal-900 dark:text-teal-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 dark:bg-teal-500"></span>
                <span>3. Materiality</span>
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-950 dark:text-slate-50 font-medium">
                Disclosing all significant facts that could influence the economic choices of users based on size or nature. <PdfRef page={6} />
              </p>
            </div>
          </div>`;

tabContent = tabContent.replace(oldGridBlock, newGridBlock);

// Assemble back the file content
content = content.substring(0, startIndex) + tabContent + content.substring(endIndex);

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Successfully updated LearningPortalClient.tsx visuals!");
