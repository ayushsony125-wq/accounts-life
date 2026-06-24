const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'standards', 'learning', 'LearningPortalClient.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Normalize CRLF to LF for matching
content = content.replace(/\r\n/g, '\n');

let replacements = 0;

function replace(search, replacement) {
  if (content.includes(search)) {
    content = content.replace(search, replacement);
    replacements++;
    console.log(`✓ Applied replacement ${replacements}`);
  } else {
    console.warn(`✗ MISS - pattern not found in replacement ${replacements + 1}:`);
    // Print first 60 chars for debugging
    console.warn('  Looking for: ' + search.substring(0, 80).replace(/\n/g, '↵'));
  }
}

// ============================================================
// 1. ChapterHeader - cleaner design
// ============================================================
replace(
`    return (
      <div className="w-full mb-6 pb-4 border-b border-slate-200 dark:border-slate-800 mt-12 first:mt-2">
        <div className="flex items-baseline gap-2">
          <h2 className="text-[20px] sm:text-[22px] font-sans font-bold text-slate-950 dark:text-white tracking-tight leading-tight">
            {arabicNum}. {title}
          </h2>
        </div>
        {description && (
          <p className="text-[14.5px] font-sans font-semibold text-slate-900 dark:text-slate-100 dark:text-slate-350 mt-2 leading-relaxed pl-0">
            {description}
          </p>
        )}
      </div>
    );
  };`,
`    return (
      <div className="w-full mb-8 mt-14 first:mt-2">
        <div className="flex items-center gap-0 mb-3">
          <span className="text-[13px] font-mono font-bold text-slate-400 dark:text-slate-500 mr-3 select-none tabular-nums">{arabicNum}.</span>
          <h2 className="text-[21px] sm:text-[23px] font-sans font-bold text-slate-950 dark:text-white tracking-tight leading-tight">
            {title}
          </h2>
        </div>
        <div className="h-[2px] w-full bg-gradient-to-r from-slate-200 via-slate-100 to-transparent dark:from-slate-700 dark:via-slate-800 dark:to-transparent mb-3" />
        {description && (
          <p className="text-[14px] font-sans font-medium text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    );
  };`
);

// ============================================================
// 2. TOC Bar outer wrapper - fix the mangled one-liner
// ============================================================
// The old code has a mangled opening - text merged with comment 
replace(
`    <div className="w-full animate-fade-in font-sans bg-[#FAFAF8] dark:bg-[#0B0F19] -m-4 md:-m-6 pb-8">      {/* Sticky Contents Bar */}`,
`    <div className="w-full animate-fade-in font-sans bg-[#F5F5F3] dark:bg-[#0B0F19] -m-4 md:-m-6 pb-8">
      {/* Sticky Contents Bar */}`
);

// TOC sticky bar
replace(
`      <div id="as1-sticky-toc" className="sticky top-[58px] bg-[#FAFAF8]/95 dark:bg-[#0B0F19]/95 backdrop-blur-xs border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none">
        <div className="max-w-[1400px] mx-auto w-full px-6 sm:px-10 lg:px-12 py-2.5">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap' }} className="flex flex-row flex-nowrap items-center gap-x-2 overflow-x-auto whitespace-nowrap scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1">`,
`      <div id="as1-sticky-toc" className="sticky top-[58px] bg-[#F5F5F3]/97 dark:bg-[#0B0F19]/97 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1600px] mx-auto w-full px-3 sm:px-5 lg:px-8 py-2">
          <div
            ref={tocScrollRef}
            style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }}
            className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5"
          >`
);

// TOC button active state - amber to indigo
replace(
`                className={\`transition-all cursor-pointer px-3 py-1.5 rounded-full text-[11px] font-sans font-semibold tracking-wide shrink-0 border \${
                  activeSection === sec.id
                    ? 'text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-955/40 border-amber-250 dark:border-amber-850 shadow-3xs font-bold'
                    : 'text-slate-900 dark:text-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 border-transparent hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                }\`}`,
`                className={\`transition-all cursor-pointer px-3.5 py-1.5 rounded-full text-[11.5px] font-sans font-semibold tracking-wide shrink-0 whitespace-nowrap \${
                  activeSection === sec.id
                    ? 'text-white bg-indigo-600 dark:bg-indigo-500 shadow-sm font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                }\`}`
);

// Main canvas - wider, no rounded, no vertical my-6
replace(
`      {/* Main Publication Sheet Canvas - White document feel */}
      <div className="mx-auto w-full max-w-[1400px] bg-white dark:bg-[#111726] shadow-sm border border-slate-200 dark:border-slate-800 px-6 sm:px-10 lg:px-12 py-10 sm:py-14 space-y-8 relative my-6 rounded-2xl">`,
`      {/* Main Publication Sheet Canvas */}
      <div className="mx-auto w-full max-w-[1600px] bg-white dark:bg-[#111726] shadow-sm border-x border-slate-200/70 dark:border-slate-800 px-4 sm:px-8 lg:px-14 py-10 sm:py-14 space-y-8 relative">`
);

// ============================================================
// 3. Body text wrapper - fix font-medium / dark text
// ============================================================
const bodyOld = 'className="space-y-6 text-[16px] md:text-[17px] text-slate-950 dark:text-slate-50 leading-[1.8] font-serif font-medium"';
const bodyNew = 'className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif"';
const bodyCount = (content.match(new RegExp(bodyOld.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
if (bodyCount > 0) {
  content = content.split(bodyOld).join(bodyNew);
  console.log(`✓ Replaced ${bodyCount} body text wrappers`);
  replacements += bodyCount;
} else {
  console.warn('✗ MISS - body text wrappers not found');
}

// ============================================================
// 4. Definition card - Blue themed
// ============================================================
replace(
`          {/* Premium Gray Reference Card for Definition */}
          <div className="p-6 border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/35 rounded-xl my-6">
            <div className="text-[10px] font-sans font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 dark:text-slate-400 mb-2 flex items-center gap-2">
              <BookOpen size={13} className="text-slate-800 dark:text-slate-200" />
              <span>Official Definition (AS 1.11)</span>
            </div>
            <p className="text-[15.5px] font-serif font-semibold text-slate-950 dark:text-slate-50 leading-[1.8] italic">
              "<span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-350 dark:border-slate-700 px-1.5 py-0.5 rounded font-mono text-[13.5px]">Accounting Policies</span> refer to the specific accounting principles and the methods of applying those principles adopted by the enterprise in the preparation and presentation of financial statements." <PdfRef page={4} />
            </p>
          </div>`,
`          {/* Official Definition Card — Blue theme */}
          <div className="p-6 border-l-4 border-blue-600 dark:border-blue-400 border border-blue-200 dark:border-blue-900/40 bg-blue-50/30 dark:bg-blue-950/10 rounded-xl my-6">
            <div className="text-[10.5px] font-sans font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-3 flex items-center gap-2">
              <BookOpen size={13} className="text-blue-600 dark:text-blue-400" />
              <span>Official Definition — AS 1, Para 11</span>
            </div>
            <p className="text-[16px] font-serif font-semibold text-slate-950 dark:text-slate-100 leading-[1.8] italic">
              "<span className="not-italic bg-blue-100 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-800 px-1.5 py-0.5 rounded font-mono text-[13.5px]">Accounting Policies</span> refer to the specific accounting principles and the methods of applying those principles adopted by the enterprise in the preparation and presentation of financial statements." <PdfRef page={4} />
            </p>
          </div>`
);

// ============================================================
// 5. Table 1 - Blue themed
// ============================================================
replace(
`          {/* Table 1: Principles vs Methods */}
          <div className="my-8 space-y-3 w-full">
            <div className="text-slate-800 dark:text-slate-200 text-[13px] font-extrabold uppercase tracking-wide font-sans">Table 1: accounting principles vs. methods of application <PdfRef page={4} /></div>
            <div className="overflow-x-auto border-t border-b border-slate-200 dark:border-slate-800 w-full">
              <table className="w-full text-left border-collapse text-[13.5px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 font-sans text-[13px] font-bold uppercase tracking-wider text-slate-950 dark:text-white bg-slate-100/70 dark:bg-[#161f33]/60">
                    <th className="py-3 px-4 font-extrabold text-[14px] text-slate-950 dark:text-white w-1/2">Accounting Principles</th>
                    <th className="py-3 px-4 font-extrabold text-[14px] text-slate-950 dark:text-white w-1/2">Methods of Applying Principles</th>
                  </tr>
                </thead>
                <tbody className="text-slate-950 dark:text-slate-50 font-serif divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="py-4 px-4 leading-relaxed align-top">`,
`          {/* Table 1: Principles vs Methods — Blue theme */}
          <div className="my-8 space-y-2 w-full">
            <div className="text-[13px] font-bold text-blue-800 dark:text-blue-400 font-sans uppercase tracking-wider flex items-center gap-2">
              <span className="inline-block w-1 h-4 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
              Table 1 — Accounting Principles vs. Methods of Application <PdfRef page={4} />
            </div>
            <div className="overflow-x-auto w-full rounded-xl border border-blue-200 dark:border-blue-900/40">
              <table className="w-full text-left border-collapse text-[13.5px]">
                <thead>
                  <tr className="font-sans text-[11.5px] font-bold uppercase tracking-wider text-white bg-blue-700 dark:bg-blue-800">
                    <th className="py-3 px-5 w-1/2">Accounting Principles</th>
                    <th className="py-3 px-5 w-1/2">Methods of Applying Principles</th>
                  </tr>
                </thead>
                <tbody className="text-slate-900 dark:text-slate-100 font-serif divide-y divide-blue-100 dark:divide-blue-900/30">
                  <tr className="bg-white dark:bg-[#111726]">
                    <td className="py-4 px-5 leading-relaxed align-top">`
);

replace(
`                    <td className="py-4 px-4 leading-relaxed align-top">
                      The specific procedures, formulas, or methods used to implement those principles (for example, FIFO or Weighted Average formulas for inventory, or Straight-Line or WDV methods for depreciation).
                    </td>`,
`                    <td className="py-4 px-5 leading-relaxed align-top">
                      The specific procedures, formulas, or methods used to implement those principles (for example, FIFO or Weighted Average formulas for inventory, or Straight-Line or WDV methods for depreciation).
                    </td>`
);

// ============================================================
// 6. Table 2 heading - Indigo themed 
// ============================================================
replace(
`          {/* Table 2: Policies vs Estimates */}
          <div className="my-8 space-y-3 w-full">
            <div className="text-slate-800 dark:text-slate-200 text-[13px] font-extrabold uppercase tracking-wide font-sans">Table 2: accounting policies vs. accounting estimates <PdfRef page={5} /></div>
            <div className="overflow-x-auto border-t border-b border-slate-200 dark:border-slate-800 w-full">
              <table className="w-full text-left border-collapse text-[13.5px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 font-sans text-[13px] font-bold uppercase tracking-wider text-slate-950 dark:text-white bg-slate-100/70 dark:bg-[#161f33]/60">
                    <th className="py-3.5 px-4 font-bold w-1/4">Attribute</th>
                    <th className="py-3.5 px-4 font-bold w-3/8">Accounting Policy</th>
                    <th className="py-3.5 px-4 font-bold w-3/8">Accounting Estimate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-950 dark:text-slate-50 font-serif">
                  <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-950 dark:text-white font-sans text-xs uppercase tracking-wider">Definition</td>
                    <td className="py-3.5 px-4 leading-relaxed">Specific accounting principles and the methods of applying those principles.</td>
                    <td className="py-3.5 px-4 leading-relaxed">Judgments made to estimate the carrying value of assets or liabilities under the selected policy.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-950 dark:text-white font-sans text-xs uppercase tracking-wider">Responsibility</td>
                    <td className="py-3.5 px-4 leading-relaxed">Board of Directors (statutory Directors' Responsibility Statement under Section 134(5)).</td>
                    <td className="py-3.5 px-4 leading-relaxed">Management and operational accountants based on the latest available information.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-950 dark:text-white font-sans text-xs uppercase tracking-wider">Examples</td>
                    <td className="py-3.5 px-4 leading-relaxed">Switching from FIFO to Weighted Average cost formula.</td>
                    <td className="py-3.5 px-4 leading-relaxed">Estimating provision for non-moving inventory based on a technical evaluation.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-950 dark:text-white font-sans text-xs uppercase tracking-wider">Change Basis</td>
                    <td className="py-3.5 px-4 leading-relaxed">Only if required by statute, standard, or for a more appropriate presentation.</td>
                    <td className="py-3.5 px-4 leading-relaxed">Revised if circumstances change, new information becomes available, or experience develops.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>`,
`          {/* Table 2: Policies vs Estimates — Indigo theme */}
          <div className="my-8 space-y-2 w-full">
            <div className="text-[13px] font-bold text-indigo-800 dark:text-indigo-400 font-sans uppercase tracking-wider flex items-center gap-2">
              <span className="inline-block w-1 h-4 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>
              Table 2 — Accounting Policies vs. Accounting Estimates <PdfRef page={5} />
            </div>
            <div className="overflow-x-auto w-full rounded-xl border border-indigo-200 dark:border-indigo-900/40">
              <table className="w-full text-left border-collapse text-[13.5px]">
                <thead>
                  <tr className="font-sans text-[11.5px] font-bold uppercase tracking-wider text-white bg-indigo-700 dark:bg-indigo-800">
                    <th className="py-3 px-5 w-1/4">Attribute</th>
                    <th className="py-3 px-5 w-3/8">Accounting Policy</th>
                    <th className="py-3 px-5 w-3/8">Accounting Estimate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-100 dark:divide-indigo-900/30 text-slate-900 dark:text-slate-100 font-serif">
                  <tr className="hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-colors bg-white dark:bg-[#111726]">
                    <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Definition</td>
                    <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Specific accounting principles and the methods of applying those principles.</td>
                    <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Judgments made to estimate the carrying value of assets or liabilities under the selected policy.</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-colors bg-indigo-50/20 dark:bg-indigo-950/5">
                    <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Responsibility</td>
                    <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Board of Directors (statutory Directors' Responsibility Statement under Section 134(5)).</td>
                    <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Management and operational accountants based on the latest available information.</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-colors bg-white dark:bg-[#111726]">
                    <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Examples</td>
                    <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Switching from FIFO to Weighted Average cost formula.</td>
                    <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Estimating provision for non-moving inventory based on a technical evaluation.</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-colors bg-indigo-50/20 dark:bg-indigo-950/5">
                    <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Change Basis</td>
                    <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Only if required by statute, standard, or for a more appropriate presentation.</td>
                    <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Revised if circumstances change, new information becomes available, or experience develops.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>`
);

// ============================================================
// 7. Stakeholder table - Teal themed
// ============================================================
replace(
`          {/* Clean table for stakeholders */}
          <div className="my-8 overflow-x-auto border-t border-b border-slate-200 dark:border-slate-800 w-full">
            <table className="w-full text-left border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 font-sans text-[13px] font-bold uppercase tracking-wider text-slate-950 dark:text-white bg-slate-100/70 dark:bg-[#161f33]/60">
                  <th className="py-3.5 px-5 font-extrabold text-[14px] text-slate-950 dark:text-white w-1/3">Stakeholder Group</th>
                  <th className="py-3.5 px-5 font-extrabold text-[14px] text-slate-950 dark:text-white w-2/3">Analytical Needs &amp; Rationale <PdfRef page={2} /></th>
                </tr>
              </thead>`,
`          {/* Stakeholder table — Teal theme */}
          <div className="my-8 w-full rounded-xl overflow-hidden border border-teal-200 dark:border-teal-900/50">
            <table className="w-full text-left border-collapse text-[13.5px]">
              <thead>
                <tr className="font-sans text-[11.5px] font-bold uppercase tracking-wider text-white bg-teal-700 dark:bg-teal-800">
                  <th className="py-3 px-5 w-1/3">Stakeholder Group</th>
                  <th className="py-3 px-5 w-2/3">Analytical Needs &amp; Rationale <PdfRef page={2} /></th>
                </tr>
              </thead>`
);

replace(
`              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-950 dark:text-slate-50 font-serif">
                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-5 font-semibold text-slate-950 dark:text-white font-sans text-xs uppercase tracking-wider flex items-center gap-2">
                    <Users size={14} className="text-amber-700 dark:text-amber-505 shrink-0" />
                    <span>Shareholders &amp; Investors</span>
                  </td>
                  <td className="py-4 px-5 leading-relaxed">Require accounting policy clarity to evaluate profit quality, calculate return on investment, and compare business earnings.</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-5 font-semibold text-slate-950 dark:text-white font-sans text-xs uppercase tracking-wider flex items-center gap-2">
                    <CreditCard size={14} className="text-amber-700 dark:text-amber-505 shrink-0" />
                    <span>Creditors &amp; Suppliers</span>
                  </td>
                  <td className="py-4 px-5 leading-relaxed">Analyze inventory valuation and accrual policies to gauge working capital sufficiency and liquidity cycles.</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-5 font-semibold text-slate-950 dark:text-white font-sans text-xs uppercase tracking-wider flex items-center gap-2">
                    <Briefcase size={14} className="text-amber-700 dark:text-amber-505 shrink-0" />
                    <span>Banks &amp; Lenders</span>
                  </td>
                  <td className="py-4 px-5 leading-relaxed">Require consistent policy application to evaluate debt service coverage ratios and compliance with loan covenants.</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-5 font-semibold text-slate-950 dark:text-white font-sans text-xs uppercase tracking-wider flex items-center gap-2">
                    <Scale size={14} className="text-amber-700 dark:text-amber-505 shrink-0" />
                    <span>Regulators &amp; Tax Authorities</span>
                  </td>
                  <td className="py-4 px-5 leading-relaxed">Monitor statutory compliance and taxation based on standard-compliant financial statements.</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-5 font-semibold text-slate-950 dark:text-white font-sans text-xs uppercase tracking-wider flex items-center gap-2">
                    <Globe size={14} className="text-amber-700 dark:text-amber-505 shrink-0" />
                    <span>Employees &amp; Public</span>
                  </td>
                  <td className="py-4 px-5 leading-relaxed">Assess the stability, employment prospects, and growth path of the enterprise.</td>
                </tr>`,
`              <tbody className="divide-y divide-teal-100 dark:divide-teal-900/30 text-slate-900 dark:text-slate-100 font-serif">
                <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-950/20 transition-colors bg-white dark:bg-[#111726]">
                  <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2"><Users size={13} className="text-teal-600 shrink-0" /><span>Shareholders &amp; Investors</span></div>
                  </td>
                  <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Require accounting policy clarity to evaluate profit quality, calculate return on investment, and compare business earnings.</td>
                </tr>
                <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-950/20 transition-colors bg-teal-50/20 dark:bg-[#0f1c22]/30">
                  <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2"><CreditCard size={13} className="text-teal-600 shrink-0" /><span>Creditors &amp; Suppliers</span></div>
                  </td>
                  <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Analyze inventory valuation and accrual policies to gauge working capital sufficiency and liquidity cycles.</td>
                </tr>
                <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-950/20 transition-colors bg-white dark:bg-[#111726]">
                  <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2"><Briefcase size={13} className="text-teal-600 shrink-0" /><span>Banks &amp; Lenders</span></div>
                  </td>
                  <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Require consistent policy application to evaluate debt service coverage ratios and compliance with loan covenants.</td>
                </tr>
                <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-950/20 transition-colors bg-teal-50/20 dark:bg-[#0f1c22]/30">
                  <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2"><Scale size={13} className="text-teal-600 shrink-0" /><span>Regulators &amp; Tax Authorities</span></div>
                  </td>
                  <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Monitor statutory compliance and taxation based on standard-compliant financial statements.</td>
                </tr>
                <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-950/20 transition-colors bg-white dark:bg-[#111726]">
                  <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2"><Globe size={13} className="text-teal-600 shrink-0" /><span>Employees &amp; Public</span></div>
                  </td>
                  <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Assess the stability, employment prospects, and growth path of the enterprise.</td>
                </tr>`
);

// ============================================================
// 8. Selection cards - differentiated amber/blue/teal
// ============================================================
replace(
`          {/* 3-Column Amber Highlight Cards */}
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
          </div>`,
`          {/* 3-Column Selection Cards — differentiated colors */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 my-6 font-serif w-full">
            <div className="p-5 border-t-2 border-amber-500 border border-amber-200 dark:border-amber-900/40 bg-amber-50/30 dark:bg-amber-950/10 rounded-xl space-y-2.5">
              <h4 className="font-sans font-bold text-[12px] uppercase tracking-wider text-amber-800 dark:text-amber-400">1. Prudence</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">
                Caution in prepared judgments: profits are recognized only when realized, and provisions are made for all known liabilities and losses.
              </p>
            </div>
            <div className="p-5 border-t-2 border-blue-500 border border-blue-200 dark:border-blue-900/40 bg-blue-50/30 dark:bg-blue-950/10 rounded-xl space-y-2.5">
              <h4 className="font-sans font-bold text-[12px] uppercase tracking-wider text-blue-800 dark:text-blue-400">2. Substance over Form</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">
                Accounting for economic reality and financial substance rather than legal technicalities.
              </p>
            </div>
            <div className="p-5 border-t-2 border-teal-500 border border-teal-200 dark:border-teal-900/40 bg-teal-50/30 dark:bg-teal-950/10 rounded-xl space-y-2.5">
              <h4 className="font-sans font-bold text-[12px] uppercase tracking-wider text-teal-800 dark:text-teal-400">3. Materiality</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">
                Disclosing all significant facts that could influence the economic choices of users based on size or nature.
              </p>
            </div>
          </div>`
);

// ============================================================
// 9. Sub-headings - colored side borders
// ============================================================
replace(
`            <h3 className="font-sans font-extrabold text-[17px] text-slate-950 dark:text-white flex items-center gap-3 border-l-4 border-amber-500 pl-3 py-0.5 mt-8 mb-4">
              <span>5A. Prudence (Valuation Caution)</span>
            </h3>`,
`            <h3 className="font-sans font-bold text-[16.5px] text-amber-900 dark:text-amber-300 flex items-center gap-3 mt-10 mb-3 border-l-[3px] border-amber-500 pl-3">
              5A. Prudence
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 font-mono uppercase tracking-widest">Valuation Caution</span>
            </h3>`
);

replace(
`            <h3 className="font-sans font-extrabold text-[17px] text-slate-950 dark:text-white flex items-center gap-3 border-l-4 border-blue-500 pl-3 py-0.5 mt-8 mb-4">
              <span>5B. Substance over Form (Economic Reality)</span>
            </h3>`,
`            <h3 className="font-sans font-bold text-[16.5px] text-blue-900 dark:text-blue-300 flex items-center gap-3 mt-10 mb-3 border-l-[3px] border-blue-500 pl-3">
              5B. Substance over Form
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 font-mono uppercase tracking-widest">Economic Reality</span>
            </h3>`
);

replace(
`            <h3 className="font-sans font-extrabold text-[17px] text-slate-950 dark:text-white flex items-center gap-3 border-l-4 border-teal-500 pl-3 py-0.5 mt-8 mb-4">
              <span>5C. Materiality (Disclosure Thresholds)</span>
            </h3>`,
`            <h3 className="font-sans font-bold text-[16.5px] text-teal-900 dark:text-teal-300 flex items-center gap-3 mt-10 mb-3 border-l-[3px] border-teal-500 pl-3">
              5C. Materiality
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 font-mono uppercase tracking-widest">Disclosure Thresholds</span>
            </h3>`
);

replace(
`            <h3 className="font-sans font-extrabold text-[17px] text-slate-950 dark:text-white flex items-center gap-3 border-l-4 border-indigo-500 pl-3 py-0.5 mt-8 mb-4">
              <span>6A. Going Concern Assumption</span>
            </h3>`,
`            <h3 className="font-sans font-bold text-[16.5px] text-indigo-900 dark:text-indigo-300 flex items-center gap-3 mt-10 mb-3 border-l-[3px] border-indigo-500 pl-3">
              6A. Going Concern Assumption
            </h3>`
);

replace(
`            <h3 className="font-sans font-extrabold text-[17px] text-slate-950 dark:text-white flex items-center gap-3 border-l-4 border-indigo-500 pl-3 py-0.5 mt-8 mb-4">
              <span>6B. Consistency Assumption</span>
            </h3>`,
`            <h3 className="font-sans font-bold text-[16.5px] text-indigo-900 dark:text-indigo-300 flex items-center gap-3 mt-10 mb-3 border-l-[3px] border-indigo-500 pl-3">
              6B. Consistency Assumption
            </h3>`
);

replace(
`            <h3 className="font-sans font-extrabold text-[17px] text-slate-950 dark:text-white flex items-center gap-3 border-l-4 border-indigo-500 pl-3 py-0.5 mt-8 mb-4">
              <span>6C. Accrual Assumption</span>
            </h3>`,
`            <h3 className="font-sans font-bold text-[16.5px] text-indigo-900 dark:text-indigo-300 flex items-center gap-3 mt-10 mb-3 border-l-[3px] border-indigo-500 pl-3">
              6C. Accrual Assumption
            </h3>`
);

// ============================================================
// 10. Materiality limits table - Teal themed
// ============================================================
replace(
`            {/* Limit Lookup Table */}
            <div className="my-6 space-y-2 w-full">
              <div className="text-slate-800 dark:text-slate-200 text-[13px] font-extrabold uppercase tracking-wide font-sans">Schedule III Statutory Materiality Limits <PdfRef page={6} /></div>
              <div className="overflow-x-auto border-t border-b border-slate-200 dark:border-slate-800 w-full">`,
`            {/* Materiality Limits Table — Teal theme */}
            <div className="my-6 space-y-2 w-full">
              <div className="text-[13px] font-bold text-teal-800 dark:text-teal-400 font-sans uppercase tracking-wider flex items-center gap-2">
                <span className="inline-block w-1 h-4 bg-teal-600 dark:bg-teal-400 rounded-full"></span>
                Schedule III — Statutory Materiality Limits <PdfRef page={6} />
              </div>
              <div className="overflow-x-auto w-full rounded-xl border border-teal-200 dark:border-teal-900/40">`
);

replace(
`                <table className="w-full text-left border-collapse text-[13px]">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 font-sans text-[13px] font-bold uppercase tracking-wider text-slate-950 dark:text-white bg-slate-100/70 dark:bg-[#161f33]/60">
                      <th className="py-3 px-4 font-extrabold text-[14px] text-slate-950 dark:text-white w-1/3">Statutory Criteria</th>
                      <th className="py-3 px-4 font-extrabold text-[14px] text-slate-950 dark:text-white w-1/3">Separate Disclosure Rule</th>
                      <th className="py-3 px-4 font-extrabold text-[14px] text-slate-950 dark:text-white w-1/3">Practical Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-950 dark:text-slate-50 font-serif">
                    <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                      <td className="py-4 px-4 font-semibold text-slate-950 dark:text-white font-sans text-xs uppercase tracking-wider">1% of revenue or ₹1,00,000</td>
                      <td className="py-4 px-4 leading-relaxed">Whichever is higher must be disclosed separately as a line item in notes.</td>
                      <td className="py-4 px-4 leading-relaxed">In a company with ₹10 crore revenue, items above ₹1,000,000 (since 1% of 10cr is 10L, ₹10L is higher than 1L) require details.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                      <td className="py-4 px-4 font-semibold text-slate-950 dark:text-white font-sans text-xs uppercase tracking-wider">Non-Corporate Entities</td>
                      <td className="py-4 px-4 leading-relaxed">Follow guidelines issued by the ICAI based on Level I, II, III classification.</td>
                      <td className="py-4 px-4 leading-relaxed">Level I entities must comply fully, whereas Level II &amp; III enjoy selective disclosure exemptions.</td>
                    </tr>
                  </tbody>
                </table>`,
`                <table className="w-full text-left border-collapse text-[13px]">
                  <thead>
                    <tr className="font-sans text-[11.5px] font-bold uppercase tracking-wider text-white bg-teal-700 dark:bg-teal-800">
                      <th className="py-3 px-5 w-1/3">Statutory Criteria</th>
                      <th className="py-3 px-5 w-1/3">Separate Disclosure Rule</th>
                      <th className="py-3 px-5 w-1/3">Practical Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-teal-100 dark:divide-teal-900/30 text-slate-900 dark:text-slate-100 font-serif">
                    <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-950/20 transition-colors bg-white dark:bg-[#111726]">
                      <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">1% of revenue or ₹1,00,000</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Whichever is higher must be disclosed separately as a line item in notes.</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">In a company with ₹10 crore revenue, items above ₹1,000,000 (since 1% of 10cr is 10L, ₹10L is higher than 1L) require details.</td>
                    </tr>
                    <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-950/20 transition-colors bg-teal-50/20 dark:bg-[#0f1c22]/30">
                      <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Non-Corporate Entities</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Follow guidelines issued by the ICAI based on Level I, II, III classification.</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Level I entities must comply fully, whereas Level II &amp; III enjoy selective disclosure exemptions.</td>
                    </tr>
                  </tbody>
                </table>`
);

// ============================================================
// 11. Assumptions table - Emerald themed
// ============================================================
replace(
`          {/* Matrix table for assumptions */}
          <div className="my-8 overflow-x-auto border-t border-b border-slate-200 dark:border-slate-800 w-full">
            <table className="w-full text-left border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 font-sans text-[13px] font-bold uppercase tracking-wider text-slate-950 dark:text-white bg-slate-100/70 dark:bg-[#161f33]/60">
                  <th className="py-3 px-4 font-extrabold text-[14px] text-slate-950 dark:text-white w-1/6">Assumption <PdfRef page={6} /></th>
                  <th className="py-3 px-4 font-extrabold text-[14px] text-slate-950 dark:text-white w-2/6">Meaning</th>
                  <th className="py-3 px-4 font-extrabold text-[14px] text-slate-950 dark:text-white w-1/6">Objective</th>
                  <th className="py-3 px-4 font-extrabold text-[14px] text-slate-950 dark:text-white w-2/6">Impact if Violated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-950 dark:text-slate-50 font-serif">
                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-4 font-semibold text-slate-950 dark:text-white font-sans text-xs uppercase tracking-wider">Going Concern</td>
                  <td className="py-4 px-4 leading-relaxed">The enterprise will continue in operation for the foreseeable future, with neither the intention nor the necessity of liquidation.</td>
                  <td className="py-4 px-4 leading-relaxed">Valuing assets at cost/carrying value rather than net realizable value.</td>
                  <td className="py-4 px-4 leading-relaxed">Assets must be immediately written down to net realizable value (liquidation values), and all liabilities reclassified as current.</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-4 font-semibold text-slate-950 dark:text-white font-sans text-xs uppercase tracking-wider">Consistency</td>
                  <td className="py-4 px-4 leading-relaxed">Accounting policies are consistent from one period to another, allowing comparison.</td>
                  <td className="py-4 px-4 leading-relaxed">Facilitate meaningful inter-period comparison.</td>
                  <td className="py-4 px-4 leading-relaxed">Disclosures must highlight the deviation, the reason for the change, and its financial impact.</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-4 font-semibold text-slate-950 dark:text-white font-sans text-xs uppercase tracking-wider">Accrual</td>
                  <td className="py-4 px-4 leading-relaxed">Revenues and costs are recognized as they are earned or incurred, not as cash is received or paid.</td>
                  <td className="py-4 px-4 leading-relaxed">Reflect true economic activity of the period.</td>
                  <td className="py-4 px-4 leading-relaxed">Accounts revert to cash basis, distorting actual financial performance and current position.</td>
                </tr>
              </tbody>
            </table>
          </div>`,
`          {/* Assumptions Matrix Table — Emerald theme */}
          <div className="my-8 space-y-2 w-full">
            <div className="text-[13px] font-bold text-emerald-800 dark:text-emerald-400 font-sans uppercase tracking-wider flex items-center gap-2">
              <span className="inline-block w-1 h-4 bg-emerald-600 dark:bg-emerald-400 rounded-full"></span>
              Fundamental Assumptions — Comparison Matrix <PdfRef page={6} />
            </div>
            <div className="overflow-x-auto w-full rounded-xl border border-emerald-200 dark:border-emerald-900/40">
              <table className="w-full text-left border-collapse text-[13.5px]">
                <thead>
                  <tr className="font-sans text-[11.5px] font-bold uppercase tracking-wider text-white bg-emerald-700 dark:bg-emerald-800">
                    <th className="py-3 px-5 w-1/6">Assumption</th>
                    <th className="py-3 px-5 w-2/6">Meaning</th>
                    <th className="py-3 px-5 w-1/6">Objective</th>
                    <th className="py-3 px-5 w-2/6">Impact if Violated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-100 dark:divide-emerald-900/30 text-slate-900 dark:text-slate-100 font-serif">
                  <tr className="hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20 transition-colors bg-white dark:bg-[#111726]">
                    <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Going Concern</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">The enterprise will continue in operation for the foreseeable future, with neither the intention nor the necessity of liquidation.</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Valuing assets at cost/carrying value rather than net realizable value.</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Assets must be immediately written down to net realizable value (liquidation values), and all liabilities reclassified as current.</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20 transition-colors bg-emerald-50/20 dark:bg-emerald-950/5">
                    <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Consistency</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Accounting policies are consistent from one period to another, allowing comparison.</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Facilitate meaningful inter-period comparison.</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Disclosures must highlight the deviation, the reason for the change, and its financial impact.</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20 transition-colors bg-white dark:bg-[#111726]">
                    <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Accrual</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Revenues and costs are recognized as they are earned or incurred, not as cash is received or paid.</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Reflect true economic activity of the period.</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Accounts revert to cash basis, distorting actual financial performance and current position.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>`
);

// ============================================================
// 12. Disclosure checklist - Emerald header bar
// ============================================================
replace(
`          {/* Premium Green Success Box for Disclosure Checklist */}
          <div className="p-6 border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/20 dark:bg-emerald-955/5 rounded-xl my-6 space-y-5 font-serif">
            <div className="text-[10px] font-sans font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-450 mb-1 flex items-center gap-2">
              <Check size={14} className="text-emerald-600 stroke-[3]" />
              <span>Manner of Disclosure Checklist <PdfRef page={6} /></span>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5">
                <Check size={12} className="stroke-[3]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-extrabold text-[15px] tracking-wide text-slate-950 dark:text-white">Orderly Manner</h4>
                <p className="text-[15px] leading-relaxed text-slate-950 dark:text-slate-50 font-medium">
                  All significant accounting policies adopted in the preparation and presentation of financial statements should be disclosed in an orderly manner. <PdfRef page={6} />
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5">
                <Check size={12} className="stroke-[3]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-extrabold text-[15px] tracking-wide text-slate-950 dark:text-white">Part of Financial Statements</h4>
                <p className="text-[15px] leading-relaxed text-slate-950 dark:text-slate-50 font-medium">
                  The disclosure of significant accounting policies should form part of the financial statements. They are normally presented in a single place. <PdfRef page={6} />
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5">
                <Check size={12} className="stroke-[3]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-extrabold text-[15px] tracking-wide text-slate-950 dark:text-white">Single Place Disclosure</h4>
                <p className="text-[15px] leading-relaxed text-slate-950 dark:text-slate-50 font-medium">
                  All significant accounting policies should be disclosed in one place, usually under Note 1 to the financial statements, rather than scattered across different notes, to ensure ease of navigation. <PdfRef page={6} />
                </p>
              </div>
            </div>
          </div>`,
`          {/* Disclosure Checklist — Emerald theme */}
          <div className="my-6 rounded-xl border border-emerald-200 dark:border-emerald-900/40 overflow-hidden font-serif">
            <div className="bg-emerald-700 dark:bg-emerald-800 px-5 py-3 flex items-center gap-2">
              <Check size={14} className="text-white stroke-[3]" />
              <span className="text-[11.5px] font-sans font-bold uppercase tracking-wider text-white">Manner of Disclosure Checklist <PdfRef page={6} /></span>
            </div>
            <div className="divide-y divide-emerald-100 dark:divide-emerald-900/30">
              <div className="flex gap-4 items-start bg-white dark:bg-[#111726] px-5 py-4">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5">
                  <Check size={13} className="stroke-[3]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-[14.5px] text-slate-950 dark:text-white">Orderly Manner</h4>
                  <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">
                    All significant accounting policies adopted in the preparation and presentation of financial statements should be disclosed in an orderly manner. <PdfRef page={6} />
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start bg-emerald-50/30 dark:bg-emerald-950/10 px-5 py-4">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5">
                  <Check size={13} className="stroke-[3]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-[14.5px] text-slate-950 dark:text-white">Part of Financial Statements</h4>
                  <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">
                    The disclosure of significant accounting policies should form part of the financial statements. They are normally presented in a single place. <PdfRef page={6} />
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start bg-white dark:bg-[#111726] px-5 py-4">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5">
                  <Check size={13} className="stroke-[3]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-[14.5px] text-slate-950 dark:text-white">Single Place Disclosure</h4>
                  <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">
                    All significant accounting policies should be disclosed in one place, usually under Note 1 to the financial statements, rather than scattered across different notes, to ensure ease of navigation. <PdfRef page={6} />
                  </p>
                </div>
              </div>
            </div>
          </div>`
);

// ============================================================
// 13. Para 23 warning - Rose themed with header
// ============================================================
replace(
`            <div className="p-6 border border-rose-200 dark:border-rose-900/40 bg-rose-50/20 dark:bg-rose-955/5 rounded-xl font-serif">
              <div className="flex items-center gap-2 mb-3 text-rose-705 dark:text-rose-400 font-sans font-bold text-[13px] uppercase tracking-wider">
                <AlertTriangle size={15} />
                <span>Audit Warning: Disclosure is not a Cure</span>
              </div>
              <blockquote className="text-[15.5px] italic font-semibold text-slate-950 dark:text-white leading-relaxed mb-3">
                "Disclosure of accounting policies or changes therein cannot remedy a wrong or inappropriate accounting treatment." <PdfRef page={6} />
              </blockquote>
              <p className="text-[14.5px] text-slate-950 dark:text-slate-50 font-medium leading-relaxed pt-1">
                Disclosure of a wrong treatment is not a substitute for correct accounting. If an incorrect policy has been followed (for example, expensing a capital asset or recognizing revenue prematurely), the auditor remains obligated to qualify the audit report for such non-compliance under Section 143(3) of the Companies Act, 2013, regardless of how clearly the wrong policy is described in the notes. <PdfRef page={6} />
              </p>
            </div>`,
`            <div className="rounded-xl overflow-hidden border border-rose-300 dark:border-rose-900/50 font-serif">
              <div className="bg-rose-700 dark:bg-rose-800 px-5 py-3 flex items-center gap-2">
                <AlertTriangle size={15} className="text-white" />
                <span className="text-[11.5px] font-sans font-bold uppercase tracking-wider text-white">Audit Warning — Para 23: Disclosure is not a Cure</span>
              </div>
              <div className="bg-white dark:bg-[#111726] px-6 py-5">
                <blockquote className="text-[16px] italic font-semibold text-slate-900 dark:text-white leading-relaxed mb-4 border-l-2 border-rose-400 pl-4">
                  "Disclosure of accounting policies or changes therein cannot remedy a wrong or inappropriate accounting treatment." <PdfRef page={6} />
                </blockquote>
                <p className="text-[14.5px] text-slate-800 dark:text-slate-200 leading-relaxed">
                  Disclosure of a wrong treatment is not a substitute for correct accounting. If an incorrect policy has been followed (for example, expensing a capital asset or recognizing revenue prematurely), the auditor remains obligated to qualify the audit report for such non-compliance under Section 143(3) of the Companies Act, 2013, regardless of how clearly the wrong policy is described in the notes. <PdfRef page={6} />
                </p>
              </div>
            </div>`
);

// ============================================================
// 14. Statutory Footnotes - Slate themed
// ============================================================
replace(
`          {/* Reference lookup table */}
          <div className="overflow-x-auto my-8 border-t border-b border-slate-200 dark:border-slate-800 w-full font-serif bg-slate-50/10 dark:bg-slate-900/5">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-855 font-sans text-[13px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-[#161f33]/60">
                  <th className="py-4 px-4 font-extrabold text-slate-950 dark:text-white uppercase tracking-wider text-[12px] w-1/12 text-center">Ref</th>
                  <th className="py-4 px-4 font-extrabold text-slate-950 dark:text-white uppercase tracking-wider text-[12px] w-3/12">Statutory / Professional Source</th>
                  <th className="py-4 px-4 font-extrabold text-slate-950 dark:text-white uppercase tracking-wider text-[12px] w-8/12">Detailed Notes &amp; Scope Limits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-850 text-slate-950 dark:text-slate-50 font-serif">`,
`          {/* Statutory Footnotes table — Slate themed */}
          <div className="my-8 space-y-2 w-full">
            <div className="text-[13px] font-bold text-slate-700 dark:text-slate-300 font-sans uppercase tracking-wider flex items-center gap-2">
              <span className="inline-block w-1 h-4 bg-slate-500 dark:bg-slate-400 rounded-full"></span>
              Statutory &amp; Regulatory Source References
            </div>
            <div className="overflow-x-auto w-full rounded-xl border border-slate-300 dark:border-slate-700 font-serif">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="font-sans text-[11.5px] font-bold uppercase tracking-wider text-white bg-slate-700 dark:bg-slate-800">
                  <th className="py-3 px-4 w-1/12 text-center">Ref</th>
                  <th className="py-3 px-4 w-3/12">Statutory / Professional Source</th>
                  <th className="py-3 px-4 w-8/12">Detailed Notes &amp; Scope Limits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-900 dark:text-slate-100 font-serif">`
);

// Fix the references table rows
replace(
`                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-slate-800 dark:text-gray-400 text-center">[1]</td>
                  <td className="py-4 px-4 font-semibold text-slate-950 dark:text-white font-sans text-xs uppercase tracking-wider">Preface to Accounting Standards</td>
                  <td className="py-4 px-4 leading-relaxed">
                    <strong>Materiality Scope:</strong> Accounting Standards apply only to items which are material. Immaterial items do not require explicit compliance or policy disclosure. The determination of materiality is a matter of professional judgment based on the size and nature of the item. <PdfRef page={2} />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-slate-800 dark:text-gray-400 text-center">[2]</td>
                  <td className="py-4 px-4 font-semibold text-slate-950 dark:text-white font-sans text-xs uppercase tracking-wider">Companies Act, 2013 Statutory Compliance</td>
                  <td className="py-4 px-4 leading-relaxed">
                    Section 129(1) of the Act mandates that financial statements must comply with accounting standards. Section 134(5) requires directors to certify that policies are consistent, reasonable, and prudent. Section 143(3)(e) requires auditors to report on compliance. Non-compliance must be reported in the Auditor's Report, including the financial impact of deviations. <PdfRef page={2} />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-slate-800 dark:text-gray-400 text-center">[3]</td>
                  <td className="py-4 px-4 font-semibold text-slate-950 dark:text-white font-sans text-xs uppercase tracking-wider">AS 11 &amp; Schedule III Requirement</td>
                  <td className="py-4 px-4 leading-relaxed">
                    <strong>Foreign Currency Translation Policies:</strong> Under AS 11 and Schedule III requirements, companies must disclose translation policies in respect of foreign currency transactions and branches, detailing how exchange gains or losses are recognized. <PdfRef page={2} />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-slate-800 dark:text-gray-400 text-center">[4]</td>
                  <td className="py-4 px-4 font-semibold text-slate-950 dark:text-white font-sans text-xs uppercase tracking-wider">ICAI &amp; NFRA Regulatory Drive</td>
                  <td className="py-4 px-4 leading-relaxed">
                    <strong>Standards and Regulatory Drive to Reduce Diversity:</strong> Regulators and standard-setting bodies (such as the ICAI and NFRA) strive to reduce acceptable alternative accounting treatments to improve comparability. However, some diversity remains due to differences in business models and operating conditions. <PdfRef page={5} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>`,
`                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors bg-white dark:bg-[#111726]">
                  <td className="py-4 px-4 font-mono font-bold text-slate-500 dark:text-slate-400 text-center text-[15px]">[1]</td>
                  <td className="py-4 px-4 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Preface to Accounting Standards</td>
                  <td className="py-4 px-4 leading-relaxed text-slate-800 dark:text-slate-200">
                    <strong>Materiality Scope:</strong> Accounting Standards apply only to items which are material. Immaterial items do not require explicit compliance or policy disclosure. The determination of materiality is a matter of professional judgment based on the size and nature of the item. <PdfRef page={2} />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors bg-slate-50/50 dark:bg-slate-800/10">
                  <td className="py-4 px-4 font-mono font-bold text-slate-500 dark:text-slate-400 text-center text-[15px]">[2]</td>
                  <td className="py-4 px-4 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Companies Act, 2013 Statutory Compliance</td>
                  <td className="py-4 px-4 leading-relaxed text-slate-800 dark:text-slate-200">
                    Section 129(1) of the Act mandates that financial statements must comply with accounting standards. Section 134(5) requires directors to certify that policies are consistent, reasonable, and prudent. Section 143(3)(e) requires auditors to report on compliance. Non-compliance must be reported in the Auditor's Report, including the financial impact of deviations. <PdfRef page={2} />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors bg-white dark:bg-[#111726]">
                  <td className="py-4 px-4 font-mono font-bold text-slate-500 dark:text-slate-400 text-center text-[15px]">[3]</td>
                  <td className="py-4 px-4 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">AS 11 &amp; Schedule III Requirement</td>
                  <td className="py-4 px-4 leading-relaxed text-slate-800 dark:text-slate-200">
                    <strong>Foreign Currency Translation Policies:</strong> Under AS 11 and Schedule III requirements, companies must disclose translation policies in respect of foreign currency transactions and branches, detailing how exchange gains or losses are recognized. <PdfRef page={2} />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors bg-slate-50/50 dark:bg-slate-800/10">
                  <td className="py-4 px-4 font-mono font-bold text-slate-500 dark:text-slate-400 text-center text-[15px]">[4]</td>
                  <td className="py-4 px-4 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">ICAI &amp; NFRA Regulatory Drive</td>
                  <td className="py-4 px-4 leading-relaxed text-slate-800 dark:text-slate-200">
                    <strong>Standards and Regulatory Drive to Reduce Diversity:</strong> Regulators and standard-setting bodies (such as the ICAI and NFRA) strive to reduce acceptable alternative accounting treatments to improve comparability. However, some diversity remains due to differences in business models and operating conditions. <PdfRef page={5} />
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>`
);

// Write back with LF only (let git handle CRLF)
fs.writeFileSync(filePath, content, 'utf8');
console.log(`\nTotal successful replacements: ${replacements}`);
console.log('Total lines:', content.split('\n').length);
