const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/standards/learning/LearningPortalClient.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Expand layout max-width from 1280px to 1400px for a fuller study-book layout
content = content.replace(/max-w-\[1280px\]/g, 'max-w-[1400px]');

// 2. Refine ChapterHeader component to integrate numbering and headings cleanly
// We also darken and enlarge the descriptions
const oldChapterHeader = `  const ChapterHeader = ({ num, title, description }: { num: string; title: string; description: string }) => {
    const numMap: Record<string, string> = {
      'I': '1',
      'II': '2',
      'III': '3',
      'IV': '4',
      'V': '5',
      'VI': '6',
      'VII': '7',
      'VIII': '8',
      'IX': '9'
    };
    const arabicNum = numMap[num] || num;
    return (
      <div className="w-full mb-6 pb-3 border-b border-slate-200 dark:border-slate-800 mt-10 first:mt-2">
        <div className="flex items-baseline gap-2">
          <h2 className="text-[19px] sm:text-[21px] font-sans font-semibold text-slate-950 dark:text-white tracking-tight leading-tight">
            <span className="text-amber-700 dark:text-amber-400 font-mono font-bold mr-2 select-none">{arabicNum}.</span>
            {title}
          </h2>
        </div>
        {description && (
          <p className="text-[13px] font-sans font-medium text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed pl-0">
            {description}
          </p>
        )}
      </div>
    );
  };`;

const newChapterHeader = `  const ChapterHeader = ({ num, title, description }: { num: string; title: string; description: string }) => {
    const numMap: Record<string, string> = {
      'I': '1',
      'II': '2',
      'III': '3',
      'IV': '4',
      'V': '5',
      'VI': '6',
      'VII': '7',
      'VIII': '8',
      'IX': '9'
    };
    const arabicNum = numMap[num] || num;
    return (
      <div className="w-full mb-6 pb-4 border-b border-slate-200 dark:border-slate-800 mt-12 first:mt-2">
        <div className="flex items-baseline gap-2">
          <h2 className="text-[20px] sm:text-[22px] font-sans font-bold text-slate-950 dark:text-white tracking-tight leading-tight">
            {arabicNum}. {title}
          </h2>
        </div>
        {description && (
          <p className="text-[14.5px] font-sans font-semibold text-slate-600 dark:text-slate-350 mt-2 leading-relaxed pl-0">
            {description}
          </p>
        )}
      </div>
    );
  };`;

content = content.replace(oldChapterHeader, newChapterHeader);

// 3. Update TOC Row active / hover states to Indigo and Slate to improve premium design
const oldTocButton = `                className={\`transition-all cursor-pointer px-3 py-1.5 rounded-full text-[11px] font-sans font-semibold tracking-wide shrink-0 border \${
                  activeSection === sec.id
                    ? 'text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-955/40 border-amber-250 dark:border-amber-850 shadow-3xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 border-transparent hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                }\`}`;

const newTocButton = `                className={\`transition-all cursor-pointer px-3 py-1.5 rounded-full text-[11px] font-sans font-semibold tracking-wide shrink-0 border \${
                  activeSection === sec.id
                    ? 'text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800 shadow-3xs font-bold'
                    : 'text-slate-700 hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-100 border-transparent hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
                }\`}`;

content = content.replace(oldTocButton, newTocButton);

// 4. Update Accordion styling inside Key Areas of Diversity
const oldAccordionHeading = `            <span className="text-amber-850 dark:text-amber-300 font-mono text-xs font-bold bg-amber-100/60 dark:bg-amber-955/20 px-2.5 py-0.5 rounded border border-amber-250/50 dark:border-amber-900/30 select-none">
              {num}
            </span>
            <span className="text-sm sm:text-[15px] tracking-tight font-sans font-bold text-slate-950 dark:text-white">{title}</span>`;

const newAccordionHeading = `            <span className="text-slate-800 dark:text-slate-200 font-mono text-[11px] font-bold bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded border border-slate-300 dark:border-slate-750 select-none">
              {num}
            </span>
            <span className="text-[15.5px] tracking-tight font-sans font-extrabold text-slate-950 dark:text-white">{title}</span>`;

content = content.replace(oldAccordionHeading, newAccordionHeading);

// 5. Update Chapter 1 Note to use premium Indigo styling instead of amber
const oldChapter1Note = `            <div className="p-6 my-6 border border-amber-200 dark:border-amber-900/40 bg-amber-50/20 dark:bg-amber-955/5 rounded-xl font-serif">
              <p className="text-[15.5px] font-semibold text-slate-950 dark:text-slate-50 dark:text-slate-100 leading-relaxed">
                For these reasons, Accounting Standard 1 requires enterprises to disclose significant accounting policies actually adopted by them in the preparation of their financial statements. Such disclosures allow the users of financial statements to take the differences in accounting policies into consideration and to make necessary adjustments in their analysis of such financial statements. <PdfRef page={2} />
              </p>
            </div>`;

const newChapter1Note = `            <div className="p-6 my-6 border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/25 dark:bg-indigo-955/5 rounded-xl font-serif shadow-3xs">
              <span className="text-[11px] font-bold text-indigo-850 dark:text-indigo-400 uppercase tracking-wider block mb-2 font-sans">
                Core Analytical Observation
              </span>
              <p className="text-[15.5px] font-semibold text-slate-950 dark:text-slate-50 leading-relaxed">
                For these reasons, Accounting Standard 1 requires enterprises to disclose significant accounting policies actually adopted by them in the preparation of their financial statements. Such disclosures allow the users of financial statements to take the differences in accounting policies into consideration and to make necessary adjustments in their analysis of such financial statements. <PdfRef page={2} />
              </p>
            </div>`;

content = content.replace(oldChapter1Note, newChapter1Note);

// 6. Style the Precedent Case Example in Chapter 5B inside a Slate callout box
const oldCaseExample = `            <p>
              <strong>Precedent Case Example:</strong> In a Hire-Purchase or Lease Agreement under AS 19, legal ownership remains with the lessor/seller until the final installment is paid. However, since the lessee/buyer gains immediate economic benefits and bears the operating risks of the asset, <span className="bg-blue-50 dark:bg-blue-955/40 text-blue-900 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/40 px-1.5 py-0.5 rounded font-semibold">Substance over Form</span> dictates that the asset is capitalized and depreciated in the buyer's balance sheet, while recording a liability for future payments. Accounting strictly by legal form (which would treat it as rent) would misrepresent the economic reality of the enterprise's capital structure. <PdfRef page={6} />
            </p>`;

const newCaseExample = `            <div className="p-5 border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/10 rounded-xl space-y-2.5 my-5 shadow-3xs font-serif">
              <h4 className="font-sans font-bold text-[11px] uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                <Info size={13} className="text-indigo-500" />
                <span>Precedent Case Example: Hire-Purchase / Lease (AS 19)</span>
              </h4>
              <p className="text-[15px] leading-relaxed text-slate-950 dark:text-slate-50 font-medium">
                In a Hire-Purchase or Lease Agreement under AS 19, legal ownership remains with the lessor/seller until the final installment is paid. However, since the lessee/buyer gains immediate economic benefits and bears the operating risks of the asset, <span className="bg-blue-50 dark:bg-blue-955/40 text-blue-900 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/40 px-1.5 py-0.5 rounded font-semibold font-mono text-[13.5px]">Substance over Form</span> dictates that the asset is capitalized and depreciated in the buyer's balance sheet, while recording a liability for future payments. Accounting strictly by legal form (which would treat it as rent) would misrepresent the economic reality of the enterprise's capital structure. <PdfRef page={6} />
              </p>
            </div>`;

content = content.replace(oldCaseExample, newCaseExample);

// 7. Update timeline steps number circles to Indigo theme
const oldTimelineStep1 = `              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#111726] border-2 border-amber-600 dark:border-amber-500 flex items-center justify-center text-xs font-bold text-amber-850 dark:text-amber-300 bg-amber-50 dark:bg-amber-955/20 font-mono select-none">
                1
              </div>`;
const newTimelineStep1 = `              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#111726] border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center text-xs font-bold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/20 font-mono select-none">
                1
              </div>`;

const oldTimelineStep2 = `              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#111726] border-2 border-amber-600 dark:border-amber-500 flex items-center justify-center text-xs font-bold text-amber-850 dark:text-amber-300 bg-amber-50 dark:bg-amber-955/20 font-mono select-none">
                2
              </div>`;
const newTimelineStep2 = `              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#111726] border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center text-xs font-bold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/20 font-mono select-none">
                2
              </div>`;

const oldTimelineStep3 = `              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#111726] border-2 border-amber-600 dark:border-amber-500 flex items-center justify-center text-xs font-bold text-amber-850 dark:text-amber-300 bg-amber-50 dark:bg-amber-955/20 font-mono select-none">
                3
              </div>`;
const newTimelineStep3 = `              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#111726] border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center text-xs font-bold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/20 font-mono select-none">
                3
              </div>`;

const oldTimelineStep4 = `              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#111726] border-2 border-amber-600 dark:border-amber-500 flex items-center justify-center text-xs font-bold text-amber-850 dark:text-amber-300 bg-amber-50 dark:bg-amber-955/20 font-mono select-none">
                4
              </div>`;
const newTimelineStep4 = `              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#111726] border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center text-xs font-bold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/20 font-mono select-none">
                4
              </div>`;

const oldTimelineStep5 = `              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#111726] border-2 border-amber-600 dark:border-amber-500 flex items-center justify-center text-xs font-bold text-amber-850 dark:text-amber-300 bg-amber-50 dark:bg-amber-955/20 font-mono select-none">
                5
              </div>`;
const newTimelineStep5 = `              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#111726] border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center text-xs font-bold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/20 font-mono select-none">
                5
              </div>`;

content = content.replace(oldTimelineStep1, newTimelineStep1);
content = content.replace(oldTimelineStep2, newTimelineStep2);
content = content.replace(oldTimelineStep3, newTimelineStep3);
content = content.replace(oldTimelineStep4, newTimelineStep4);
content = content.replace(oldTimelineStep5, newTimelineStep5);

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Successfully ran visuals-v3 update script!");
