'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, Info, AlertTriangle, Check, Scale } from 'lucide-react'

export const as2Sections = [
  { id: 'as2-overview',        title: 'I. Introduction & Purpose' },
  { id: 'as2-scope',           title: 'II. Scope & Applicability' },
  { id: 'as2-definition',      title: 'III. Key Definitions' },
  { id: 'as2-measurement',     title: 'IV. Measurement & Recognition' },
  { id: 'as2-cost-components',  title: 'V. Components of Cost' },
  { id: 'as2-excluded',        title: 'VI. Excluded Costs' },
  { id: 'as2-techniques',      title: 'VII. Formulas & Techniques' },
  { id: 'as2-raw-materials',   title: 'VIII. Raw Materials NRV' },
  { id: 'as2-disclosure',      title: 'IX. Disclosures' },
  { id: 'as2-footnotes',       title: 'X. Statutory Footnotes' }
];

interface AS2StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function AS2StandardTabContent({ navigateToPdfPage }: AS2StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as2-overview');
  const tocScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(id);
    const stickyToc = document.getElementById('as-2-standard-sticky-toc');
    if (container && target) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      let offset = 98;
      if (stickyToc) {
        const tocRect = stickyToc.getBoundingClientRect();
        offset = tocRect.bottom - containerRect.top;
      }
      const targetScrollTop = targetRect.top - containerRect.top + container.scrollTop - offset + 2;
      container.scrollTo({
        top: targetScrollTop,
        behavior: 'auto'
      });
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const initObserver = () => {
      const scrollContainer = document.getElementById('as1-scroll-container');
      if (!scrollContainer) {
        setTimeout(initObserver, 50);
        return;
      }

      const options = {
        root: scrollContainer,
        rootMargin: '-110px 0px -60% 0px',
        threshold: 0
      };

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            const activeBtn = document.querySelector(`[data-toc-id="${entry.target.id}"]`);
            if (activeBtn && tocScrollRef.current) {
              const btnRect = activeBtn.getBoundingClientRect();
              const containerRect = tocScrollRef.current.getBoundingClientRect();
              if (btnRect.left < containerRect.left || btnRect.right > containerRect.right) {
                activeBtn.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });
              }
            }
          }
        });
      }, options);

      as2Sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) observer?.observe(el);
      });
    };

    initObserver();
    return () => observer?.disconnect();
  }, []);

  const PdfRef = ({ page }: { page: number }) => (
    <button
      onClick={() => navigateToPdfPage(page)}
      className="inline-flex items-center justify-center w-4 h-4 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded transition-all cursor-pointer select-none align-middle"
      title={"Open ICAI PDF — Page " + page}
    >
      <FileText size={10} className="shrink-0" />
    </button>
  );

  const ChapterHeader = ({ num, title, description }: { num: string; title: string; description: string }) => (
    <div className="border-b border-slate-200 dark:border-slate-800 pb-5 w-full">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[12px] font-sans font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-1 rounded">
          Chapter {num}
        </span>
      </div>
      <h2 className="text-[22px] sm:text-[24px] font-sans font-extrabold text-slate-900 dark:text-white tracking-tight">
        {title}
      </h2>
      <p className="text-[14px] text-slate-500 dark:text-slate-400 mt-1.5 font-medium leading-relaxed max-w-3xl">
        {description}
      </p>
    </div>
  );

  const NB = ({ type, title, children }: { type: 'info' | 'warning' | 'success' | 'exam'; title?: string; children: React.ReactNode }) => {
    const styles = {
      info:    'bg-blue-50/80 dark:bg-blue-955/20 border-blue-200 dark:border-blue-800/50 text-blue-900 dark:text-blue-200 border-l-4 border-l-blue-500',
      warning: 'bg-amber-50/80 dark:bg-amber-955/20 border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 border-l-4 border-l-amber-500',
      success: 'bg-emerald-50/80 dark:bg-emerald-955/20 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200 border-l-4 border-l-emerald-500',
      exam:    'bg-rose-50/80 dark:bg-rose-955/20 border-rose-200 dark:border-rose-800/50 text-rose-900 dark:text-rose-200 border-l-4 border-l-rose-500',
    };
    return (
      <div className={'rounded-xl border p-5 my-5 ' + styles[type]}>
        {title && <p className="font-extrabold uppercase tracking-wider text-[10.5px] mb-2 opacity-75">{title}</p>}
        <div className="text-[14.5px] leading-relaxed">{children}</div>
      </div>
    );
  };

  return (
    <div className="w-full animate-fade-in font-sans bg-[#F5F5F3] dark:bg-[#0B0F19] pb-8">
      {/* Sticky Contents Bar */}
      <div id="as-2-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div
            ref={tocScrollRef}
            style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }}
            className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5"
          >
            {as2Sections.map((sec) => (
              <button
                key={sec.id}
                data-toc-id={sec.id}
                onClick={() => handleSectionClick(sec.id)}
                className={`transition-all cursor-pointer px-3.5 py-1.5 rounded-full text-[11.5px] font-sans font-semibold tracking-wide shrink-0 whitespace-nowrap ${
                  activeSection === sec.id
                    ? 'text-white bg-indigo-600 dark:bg-indigo-500 shadow-sm font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Publication Sheet Canvas */}
      <div className="mx-auto w-[98%] max-w-[1720px] bg-white dark:bg-[#111726] shadow-sm border border-slate-200/70 dark:border-slate-800 rounded-xl px-4 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-8 relative my-4">

        {/* Chapter I: Introduction & Purpose */}
        <section id="as2-overview" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="I" 
            title="Introduction &amp; Purpose of the Standard" 
            description="Overview of the valuation rules for inventories to ensure that they are carried at values not exceeding their realisable cash levels."
          />
          
          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              The valuation of inventory is a crucial determinant of an enterprise's financial performance. Under <span className="font-semibold text-slate-900 dark:text-white">AS 2 (Revised) 'Valuation of Inventories'</span>, the primary objective is to lay down guidelines for determining the carrying amount of inventories in the balance sheet. <PdfRef page={2} />
            </p>
            <p>
              Because inventories are assets, the cost assigned to them represents a cost carried forward as a resource to generate future revenues. If the expected economic benefit from sale or use is lower than the cost, the carrying amount must be written down.
            </p>
          </div>

          {/* Premium Blue Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-blue-100 dark:border-blue-900/40 bg-blue-50/20 dark:bg-blue-900/5 rounded-xl space-y-2.5">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-blue-800 dark:text-blue-400 flex items-center gap-2">
                <Info size={14} />
                <span>1. Matching Principle Impact</span>
              </h4>
              <p className="text-[15px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                The cost of closing inventory is carried over to the next period. Higher inventory values reduce the current period's Cost of Goods Sold (COGS), thereby directly increasing reported gross profits. <PdfRef page={4} />
              </p>
            </div>
            <div className="p-5 border border-blue-100 dark:border-blue-900/40 bg-blue-50/20 dark:bg-blue-900/5 rounded-xl space-y-2.5">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-blue-800 dark:text-blue-400 flex items-center gap-2">
                <Info size={14} />
                <span>2. Prudence Basis (Conservatism)</span>
              </h4>
              <p className="text-[15px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Prudence dictates that no anticipated profits should be recognized, whereas all foreseeable losses must be provided for. When the Net Realisable Value (NRV) drops below cost, the difference is written down immediately. <PdfRef page={4} />
              </p>
            </div>
          </div>
        </section>

        {/* Chapter II: Scope & Applicability */}
        <section id="as2-scope" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="II" 
            title="Scope &amp; Applicability Limits" 
            description="Delineation of inventories covered under AS 2, and exclusions governed by other specialized accounting standards."
          />
          
          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              AS 2 applies to all enterprises engaged in commercial, industrial, or trading activities. <PdfRef page={2} /> However, specific types of work-in-progress and specialized assets are excluded from its scope.
            </p>

            <div className="my-6 space-y-2 w-full">
              <div className="text-[13px] font-bold text-slate-700 dark:text-slate-300 font-sans uppercase tracking-wider flex items-center gap-2">
                <span className="inline-block w-1 h-4 bg-slate-500 dark:bg-slate-400 rounded-full"></span>
                Inclusions and Exclusions Framework
              </div>
              <div className="overflow-x-auto w-full rounded-xl border border-slate-300 dark:border-slate-700 font-serif">
                <table className="w-full text-left border-collapse text-[13px]">
                  <thead>
                    <tr className="font-sans text-[11.5px] font-bold uppercase tracking-wider text-white bg-slate-700 dark:bg-slate-800">
                      <th className="py-3 px-5 w-1/4">Inventory Category</th>
                      <th className="py-3 px-5 w-1/4">Applicable Rule / Standard</th>
                      <th className="py-3 px-5 w-2/4">Detailed Notes &amp; Scope Boundaries</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-900 dark:text-slate-100 font-serif">
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors bg-white dark:bg-[#111726]">
                      <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Trading &amp; Manufacturing Assets</td>
                      <td className="py-4 px-5 leading-relaxed text-indigo-600 dark:text-indigo-400 font-bold font-mono">AS 2 (Valuation of Inventories)</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">
                        Includes goods held for resale (merchandise), finished goods, work-in-progress, raw materials, maintenance supplies, loose tools, and site inventories (like cement lying at construction sites). <PdfRef page={2} />
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors bg-slate-50/50 dark:bg-slate-800/10">
                      <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Construction Contracts WIP</td>
                      <td className="py-4 px-5 leading-relaxed text-indigo-600 dark:text-indigo-400 font-bold font-mono">AS 7 (Construction Contracts)</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">
                        Costs of partly completed construction activities (including directly related service contracts) are excluded from AS 2. <PdfRef page={2} />
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors bg-white dark:bg-[#111726]">
                      <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Service WIP (Consulting, Shipping)</td>
                      <td className="py-4 px-5 leading-relaxed text-indigo-600 dark:text-indigo-400 font-bold font-mono">Excluded (Direct P&amp;L Expensing)</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">
                        Costs of providing a part of a service (e.g. voyage-in-progress for shipping, software development codes in progress) are excluded from AS 2. <PdfRef page={3} />
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors bg-slate-50/50 dark:bg-slate-800/10">
                      <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Financial Instruments (Stock-in-trade)</td>
                      <td className="py-4 px-5 leading-relaxed text-indigo-600 dark:text-indigo-400 font-bold font-mono">AS 13 (Investments) Excluded</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">
                        Shares, debentures, and securities held as stock-in-trade are excluded from AS 2. Valued at lower of cost and fair value. <PdfRef page={3} />
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors bg-white dark:bg-[#111726]">
                      <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Livestock, Ag &amp; Forest Products</td>
                      <td className="py-4 px-5 leading-relaxed text-indigo-600 dark:text-indigo-400 font-bold font-mono">Excluded (NRV Industry Practices)</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">
                        Producers' inventories of agricultural goods, mineral oils, ores, and gases are excluded if measured at NRV under industry-established practices (e.g., forward contracts or government guarantees). <PdfRef page={3} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter III: Key Definitions */}
        <section id="as2-definition" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="III" 
            title="Core Standard Definitions" 
            description="Precise technical definitions under AS 2 covering inventories, realisable values, and acquisition costs."
          />
          
          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              To apply the standard consistently, the following core definitions must be interpreted strictly in accordance with professional guidelines:
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/10 rounded-xl space-y-2 font-serif">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                1. Inventories
              </h4>
              <p className="text-[15px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Assets held: (a) for sale in the ordinary course of business, (b) in the process of production for such sale, or (c) for consumption in the production of goods or services for sale, including maintenance supplies and consumables other than machinery spares, servicing equipment, and standby equipment which meet the definition of PPE. <PdfRef page={2} />
              </p>
            </div>
            
            <div className="p-5 border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/10 rounded-xl space-y-2 font-serif">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                2. Net Realisable Value (NRV)
              </h4>
              <p className="text-[15px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                The estimated selling price in the ordinary course of business less the estimated costs of completion and the estimated costs necessary to make the sale. <PdfRef page={4} />
              </p>
            </div>
            
            <div className="p-5 border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/10 rounded-xl space-y-2 font-serif">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                3. Replacement Cost
              </h4>
              <p className="text-[15px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                The cost at which an identical asset can be purchased or replaced at the reporting date. Used as the fairest measure of realisable value for raw materials when finished goods are written down. <PdfRef page={5} />
              </p>
            </div>
          </div>
        </section>

        {/* Chapter IV: Measurement & Recognition */}
        <section id="as2-measurement" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="IV" 
            title="Measurement &amp; Recognition Principles" 
            description="The rule of Lower of Cost and Net Realisable Value (NRV) and its item-by-item application."
          />
          
          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              Inventories must be valued at the <span className="bg-amber-50 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border border-amber-200/50 dark:border-amber-900/40 px-1.5 py-0.5 rounded font-semibold">lower of cost and net realisable value</span>. <PdfRef page={4} /> This comparison ensures that the asset is not carried at a value exceeding the cash flow it is expected to generate.
            </p>
            <p>
              The comparison should be made on an **item-by-item** basis. Grouping similar or related items is permitted only when they belong to the same product line, have similar purposes, and cannot be practically evaluated separately. <PdfRef page={11} />
            </p>
            
            {/* Practical Example 1 Walkthrough Box */}
            <div className="p-5 border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/10 rounded-xl space-y-2.5 my-5 shadow-3xs font-serif">
              <h4 className="font-sans font-bold text-[11px] uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                <Info size={13} className="text-amber-500" />
                <span>Example 1: Work-in-Progress Valuation</span>
              </h4>
              <p className="text-[15px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                A partly finished unit has an accumulated cost of ₹150. It requires ₹100 of further processing to complete. The finished unit can be sold for ₹250, incurring a 4% brokerage fee (₹10). <PdfRef page={5} />
              </p>
              <div className="bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 rounded-lg p-3 space-y-1 font-mono text-[13.5px]">
                <div>Estimated Selling Price: ₹250</div>
                <div>Less: Estimated Cost of Completion: (₹100)</div>
                <div>Less: Brokerage/Selling Expenses (4% of 250): (₹10)</div>
                <div className="font-bold text-indigo-600 dark:text-indigo-400 border-t border-slate-100 dark:border-slate-800 pt-1 mt-1">Net Realisable Value (NRV): ₹140</div>
                <div className="font-bold">Historical Cost: ₹150</div>
                <div className="font-bold text-emerald-600 dark:text-emerald-400 border-t border-slate-100 dark:border-slate-800 pt-1 mt-1">Inventory Valuation (Lower of Cost/NRV): ₹140</div>
              </div>
            </div>

            {/* Item-by-Item Example Table */}
            <div className="my-6 space-y-2 w-full">
              <div className="text-[13px] font-bold text-indigo-800 dark:text-indigo-400 font-sans uppercase tracking-wider flex items-center gap-2">
                <span className="inline-block w-1 h-4 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>
                Item-by-Item Valuation Comparison (Example 4) <PdfRef page={11} />
              </div>
              <div className="overflow-x-auto w-full rounded-xl border border-indigo-100 dark:border-indigo-900/40">
                <table className="w-full text-left border-collapse text-[13px]">
                  <thead>
                    <tr className="font-sans text-[11.5px] font-bold uppercase tracking-wider text-white bg-indigo-700 dark:bg-indigo-800">
                      <th className="py-3 px-5 w-1/4">Inventory Item</th>
                      <th className="py-3 px-5 w-1/4">Historical Cost</th>
                      <th className="py-3 px-5 w-1/4">Net Realisable Value</th>
                      <th className="py-3 px-5 w-1/4">Inventory Carrying Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-indigo-50 dark:divide-indigo-900/30 text-slate-900 dark:text-slate-100 font-serif">
                    <tr className="hover:bg-indigo-50/20 dark:hover:bg-indigo-900/10 transition-colors bg-white dark:bg-[#111726]">
                      <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Item 1 (WIP)</td>
                      <td className="py-4 px-5 leading-relaxed font-mono">₹50,000</td>
                      <td className="py-4 px-5 leading-relaxed font-mono text-rose-600">₹45,000</td>
                      <td className="py-4 px-5 leading-relaxed font-mono font-bold text-emerald-600">₹45,000</td>
                    </tr>
                    <tr className="hover:bg-indigo-50/20 dark:hover:bg-indigo-900/10 transition-colors bg-indigo-50/10 dark:bg-[#0f121e]/30">
                      <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Item 2 (Finished)</td>
                      <td className="py-4 px-5 leading-relaxed font-mono text-rose-600">₹20,000</td>
                      <td className="py-4 px-5 leading-relaxed font-mono">₹24,000</td>
                      <td className="py-4 px-5 leading-relaxed font-mono font-bold text-emerald-600">₹20,000</td>
                    </tr>
                    <tr className="hover:bg-indigo-50/20 dark:hover:bg-indigo-900/10 transition-colors bg-white dark:bg-[#111726] border-t-2 border-indigo-200 dark:border-indigo-800">
                      <td className="py-4 px-5 font-bold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Total Inventory</td>
                      <td className="py-4 px-5 leading-relaxed font-mono font-bold">₹70,000</td>
                      <td className="py-4 px-5 leading-relaxed font-mono font-bold">₹69,000</td>
                      <td className="py-4 px-5 leading-relaxed font-mono font-bold text-emerald-600">₹65,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter V: Components of Cost */}
        <section id="as2-cost-components" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="V" 
            title="Components of Inventory Cost" 
            description="Analysis of cost of purchase, cost of conversion, and fixed overhead allocation policies."
          />
          
          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              The cost of inventories must comprise all costs of purchase, costs of conversion, and other costs incurred in bringing the inventories to their present location and condition. <PdfRef page={6} />
            </p>
            
            <h3 className="font-sans font-bold text-[16px] text-indigo-900 dark:text-indigo-300 flex items-center gap-2.5 mt-8 mb-2 border-l-[3px] border-indigo-500 pl-3">
              1. Costs of Purchase
            </h3>
            <p>
              Consists of the purchase price including import duties and other non-refundable taxes, transport, handling, and other expenditures directly attributable to acquisition. <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 px-1.5 py-0.5 rounded font-mono text-[13.5px]">Trade discounts, rebates, duty drawbacks,</span> and similar items are deducted. <PdfRef page={6} />
            </p>

            <h3 className="font-sans font-bold text-[16px] text-indigo-900 dark:text-indigo-300 flex items-center gap-2.5 mt-8 mb-2 border-l-[3px] border-indigo-500 pl-3">
              2. Costs of Conversion
            </h3>
            <p>
              Includes costs directly related to the units of production (e.g. direct labour) and a systematic allocation of fixed and variable production overheads. <PdfRef page={6} />
            </p>
            <p>
              Fixed production overheads must be absorbed over the **normal capacity** of the production facilities. Normal capacity is the average production expected to be achieved over a number of periods under normal circumstances (after capacity loss from planned maintenance). <PdfRef page={6} />
            </p>
            
            {/* Fixed Overheads Decision Card */}
            <div className="p-5 border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/10 rounded-xl space-y-3 font-serif">
              <h4 className="font-sans font-bold text-[12px] uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Fixed Overhead Absorption Cases (Example 2) <PdfRef page={7} />
              </h4>
              <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">
                ABC Ltd has expected fixed overheads of ₹18 lakhs and normal capacity of 1,00,000 units (Standard absorption rate = ₹18/unit).
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-[14.5px]">
                <li><strong>Case 1: Actual Production is 1,00,000 units (Normal)</strong><br />
                  Allocated at normal rate: 1,00,000 units × ₹18 = ₹18 lakhs.
                </li>
                <li><strong>Case 2: Actual Production is 90,000 units (Low Capacity)</strong><br />
                  Allocated at normal rate: 90,000 units × ₹18 = ₹16.2 lakhs. The unallocated overhead of ₹1.8 lakhs must be charged directly to the P&amp;L as an expense of the period. Valuing inventory at actual rate (₹20/unit) would improperly capitalize idle capacity losses.
                </li>
                <li><strong>Case 3: Actual Production is 1,20,000 units (High Capacity)</strong><br />
                  Allocated at actual rate: 1,20,000 units × ₹15 = ₹18 lakhs. Using the normal rate (₹18/unit) would allocate ₹21.6 lakhs, creating an artificial asset valuation above actual cost.
                </li>
              </ul>
            </div>

            <h3 className="font-sans font-bold text-[16px] text-indigo-900 dark:text-indigo-300 flex items-center gap-2.5 mt-8 mb-2 border-l-[3px] border-indigo-500 pl-3">
              3. Joint and By-Products Cost Allocation
            </h3>
            <p>
              When a production process results in more than one product (joint products) or a main product and a by-product, split-off costs must be allocated on a rational and consistent basis (e.g. relative sales value at split-off or completion stage). <PdfRef page={7} />
            </p>
            <p>
              By-products, scraps, and wastes are usually valued at Net Realisable Value (NRV). This NRV is deducted from the cost of the main product, ensuring that the main product cost is not overvalued. <PdfRef page={7} />
            </p>
          </div>
        </section>

        {/* Chapter VI: Exclusions from Inventory Costs */}
        <section id="as2-excluded" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="VI" 
            title="Exclusions from the Cost of Inventories" 
            description="Costs that are not permitted to be capitalized in inventory and must be recognized as periodic expenses."
          />
          
          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              To maintain the integrity of matching and prudence, certain expenditures do not add value or bring the inventory to its present location and condition. These must be recognized as expenses in the period in which they are incurred. <PdfRef page={9} />
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
              <div className="p-5 border border-red-100 dark:border-red-900/40 bg-red-50/20 dark:bg-red-900/5 rounded-xl space-y-2">
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-red-800 dark:text-red-400">
                  1. Abnormal Waste
                </h4>
                <p className="text-[15px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                  Abnormal amounts of wasted materials, labour, or other production costs cannot be capitalized as they represent operational inefficiencies. <PdfRef page={9} />
                </p>
              </div>
              <div className="p-5 border border-red-100 dark:border-red-900/40 bg-red-50/20 dark:bg-red-900/5 rounded-xl space-y-2">
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-red-800 dark:text-red-400">
                  2. Storage Costs
                </h4>
                <p className="text-[15px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                  Storage costs are excluded unless they are necessary in the production process prior to a further stage of production. <PdfRef page={9} />
                </p>
              </div>
              <div className="p-5 border border-red-100 dark:border-red-900/40 bg-red-50/20 dark:bg-red-900/5 rounded-xl space-y-2">
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-red-800 dark:text-red-400">
                  3. Administrative Overheads
                </h4>
                <p className="text-[15px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                  General administrative overheads that do not contribute to bringing inventories to their present location and condition must be expensed. <PdfRef page={9} />
                </p>
              </div>
              <div className="p-5 border border-red-100 dark:border-red-900/40 bg-red-50/20 dark:bg-red-900/5 rounded-xl space-y-2">
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-red-800 dark:text-red-400">
                  4. Selling &amp; Distribution
                </h4>
                <p className="text-[15px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                  Costs incurred in marketing, selling, and distributing goods to customers can never be included in inventory valuation. <PdfRef page={9} />
                </p>
              </div>
            </div>

            {/* Interest Borrowing Note */}
            <div className="p-5 border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/10 rounded-xl space-y-2.5 my-5 shadow-3xs font-serif">
              <h4 className="font-sans font-bold text-[11px] uppercase tracking-wider text-teal-800 dark:text-teal-400 flex items-center gap-1.5">
                <Info size={13} className="text-teal-500" />
                <span>Treatment of Borrowing Costs (AS 16) &amp; Intangibles Amortization</span>
              </h4>
              <p className="text-[15px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Interest and borrowing costs are generally excluded from inventory costs unless the inventory meets the definition of a qualifying asset under AS 16 (i.e. takes a substantial period of time to get ready for its intended sale, such as maturing wine). Amortization of intangibles (like patent rights of production or copyright) directly related to production is included in inventory costs. <PdfRef page={8} />
              </p>
            </div>
          </div>
        </section>

        {/* Chapter VII: Cost Formulas & Techniques */}
        <section id="as2-techniques" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="VII" 
            title="Cost Formulas &amp; Valuation Techniques" 
            description="The First-In First-Out (FIFO) and Weighted Average formulas, and cost techniques like Standard Cost and Retail Method."
          />
          
          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              For items that are not ordinarily interchangeable or are segregated for specific projects, cost must be assigned using the **specific identification** method. In all other cases, standard formulas must be applied: <PdfRef page={9} />
            </p>
            
            {/* FIFO vs Weighted Average Table */}
            <div className="my-6 space-y-2 w-full">
              <div className="text-[13px] font-bold text-teal-800 dark:text-teal-400 font-sans uppercase tracking-wider flex items-center gap-2">
                <span className="inline-block w-1 h-4 bg-teal-600 dark:bg-teal-400 rounded-full"></span>
                Comparison: FIFO vs. Weighted Average Cost Formula
              </div>
              <div className="overflow-x-auto w-full rounded-xl border border-teal-200 dark:border-teal-900/40">
                <table className="w-full text-left border-collapse text-[13px]">
                  <thead>
                    <tr className="font-sans text-[11.5px] font-bold uppercase tracking-wider text-white bg-teal-700 dark:bg-teal-800">
                      <th className="py-3 px-5 w-1/3">Feature</th>
                      <th className="py-3 px-5 w-1/3">First-In First-Out (FIFO)</th>
                      <th className="py-3 px-5 w-1/3">Weighted Average Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-teal-100 dark:divide-teal-900/30 text-slate-900 dark:text-slate-100 font-serif">
                    <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-900/20 transition-colors bg-white dark:bg-[#111726]">
                      <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Assumption</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">The items of inventory which were purchased first are sold or consumed first.</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">The cost of items is determined from the weighted average of the cost of similar items.</td>
                    </tr>
                    <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-900/20 transition-colors bg-teal-50/20 dark:bg-[#0f1c22]/30">
                      <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Closing Inventory Value</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Reflects the latest market prices since the stock comprises the most recent purchases.</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Smoothes out fluctuations in prices by averaging costs over the period.</td>
                    </tr>
                    <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-900/20 transition-colors bg-white dark:bg-[#111726]">
                      <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Inflationary Impact</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Leads to higher closing stock value and higher profits (since older, cheaper stock is matched to current revenue).</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Moderates profit reporting by blending older and newer costs.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h3 className="font-sans font-bold text-[16px] text-indigo-900 dark:text-indigo-300 flex items-center gap-2.5 mt-8 mb-2 border-l-[3px] border-indigo-500 pl-3">
              Cost Measurement Techniques
            </h3>
            <p>
              Two main shortcut techniques are permitted if they approximate actual cost:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[15px]">
              <li><strong>Standard Costing:</strong> Takes standard levels of material, labour, and capacity utilization. Must be regularly reviewed and adjusted. <PdfRef page={9} /></li>
              <li><strong>Retail Method:</strong> Used in retail for large volumes of rapidly changing items. Inventory value is determined by taking the selling price of unsold stock and reducing it by the appropriate gross margin percentage. <PdfRef page={10} /></li>
            </ul>

            {/* Example 3 markup calculation */}
            <div className="p-5 border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/10 rounded-xl space-y-2 font-serif">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Example 3: Retail Method Calculation
              </h4>
              <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">
                Opening stock (at cost) was ₹15,000. Purchases were ₹85,000. Total cost = ₹1,00,000. Average markup is 25% on cost. Sales were ₹1,05,000. <PdfRef page={10} />
              </p>
              <div className="bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 rounded-lg p-3 space-y-1 font-mono text-[13.5px]">
                <div>Sale Value of Opening Stock &amp; Purchases: ₹1,00,000 × 1.25 = ₹1,25,000</div>
                <div>Less: Actual Sales during the period: (₹1,05,000)</div>
                <div className="font-bold">Sale Value of Unsold Stock (Closing Stock at Retail): ₹20,000</div>
                <div>Less: Gross Markup Adjustment (₹20,000 / 1.25 × 0.25): (₹4,000)</div>
                <div className="font-bold text-emerald-600 dark:text-emerald-400 border-t border-slate-100 dark:border-slate-800 pt-1 mt-1">Cost of Closing Inventory: ₹16,000</div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter VIII: Valuation of Raw Materials & Supplies */}
        <section id="as2-raw-materials" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="VIII" 
            title="Valuation of Raw Materials &amp; Supplies" 
            description="The exception rules governing the write-down of materials held for use in manufacturing."
          />
          
          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              Materials and other supplies held for use in the production of inventories are **not** written down below cost if the finished products in which they will be incorporated are expected to be sold at or above cost. <PdfRef page={11} />
            </p>
            <p>
              This is a vital exception: as long as the finished product recovers its total cost (including conversion and materials), the raw material is expected to realize its full cost, rendering a write-down unnecessary.
            </p>
            <p>
              However, when a decline in the price of materials indicates that the cost of the finished products will exceed net realisable value, the materials are written down to **replacement cost**. The replacement cost is considered the most reliable measure of net realisable value for materials. <PdfRef page={11} />
            </p>

            {/* Audit warning box for raw materials valuation */}
            <div className="rounded-xl overflow-hidden border border-rose-300 dark:border-rose-900/50 font-serif my-5">
              <div className="bg-rose-700 dark:bg-rose-800 px-5 py-3 flex items-center gap-2">
                <AlertTriangle size={15} className="text-white" />
                <span className="text-[11.5px] font-sans font-bold uppercase tracking-wider text-white">Audit Warning — Raw Materials Valuation Exception</span>
              </div>
              <div className="bg-white dark:bg-[#111726] px-6 py-5">
                <p className="text-[14.5px] text-slate-800 dark:text-slate-200 leading-relaxed">
                  Auditors must verify that raw materials are not automatically written down just because their market replacement price has fallen. The write-down is contingent upon the finished product's profitability. If the finished product remains profitable, the raw materials must be valued at cost. Failure to verify this condition leads to incorrect creation of hidden reserves. <PdfRef page={11} />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter IX: Presentation & Disclosures */}
        <section id="as2-disclosure" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="IX" 
            title="Presentation &amp; Disclosure Requirements" 
            description="Required disclosures in the notes to accounts including carrying amounts, classifications, and cost formulas."
          />
          
          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              To ensure transparency and comparability, the financial statements must disclose: <PdfRef page={12} />
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-[15px] font-sans">
              <li>The accounting policies adopted in measuring inventories, including the cost formula used (e.g. FIFO or Weighted Average).</li>
              <li>The total carrying amount of inventories, together with a classification appropriate to the enterprise.</li>
            </ol>
            
            {/* Carrying amount classification grid */}
            <div className="my-6 space-y-2 w-full">
              <div className="text-[13px] font-bold text-slate-700 dark:text-slate-300 font-sans uppercase tracking-wider flex items-center gap-2">
                <span className="inline-block w-1 h-4 bg-slate-500 dark:bg-slate-400 rounded-full"></span>
                Statutory Classifications of Inventory (Schedule III) <PdfRef page={12} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[13px]">
                <div className="p-3 border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-[#111726] rounded-lg text-center font-bold">1. Raw Materials &amp; Components</div>
                <div className="p-3 border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-[#111726] rounded-lg text-center font-bold">2. Work-in-Progress</div>
                <div className="p-3 border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-[#111726] rounded-lg text-center font-bold">3. Finished Goods</div>
                <div className="p-3 border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-[#111726] rounded-lg text-center font-bold">4. Stock-in-Trade (resale goods)</div>
                <div className="p-3 border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-[#111726] rounded-lg text-center font-bold">5. Stores &amp; Spares</div>
                <div className="p-3 border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-[#111726] rounded-lg text-center font-bold">6. Loose Tools</div>
                <div className="p-3 border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-[#111726] rounded-lg text-center font-bold">7. Others (specify nature)</div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter X: Statutory Footnotes */}
        <section id="as2-footnotes" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="X" 
            title="Statutory Footnotes &amp; Scope Limits" 
            description="Regulatory footnotes, statutory compliance under Schedule III of the Companies Act 2013, and audit procedures."
          />
          
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
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-900 dark:text-slate-100 font-serif">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors bg-white dark:bg-[#111726]">
                    <td className="py-4 px-4 font-mono font-bold text-slate-500 dark:text-slate-400 text-center text-[15px]">[1]</td>
                    <td className="py-4 px-4 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Schedule III to the Companies Act 2013</td>
                    <td className="py-4 px-4 leading-relaxed text-slate-800 dark:text-slate-200">
                      <strong>Disclosure of Valuation Method:</strong> Requires companies to disclose the exact valuation method (e.g. FIFO, Weighted Average) for each sub-class of inventory held. Carrying amounts must be classified into Raw Materials, WIP, Finished Goods, Stock-in-trade, Stores/Spares, Loose Tools, and Others. <PdfRef page={4} />
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors bg-slate-50/50 dark:bg-slate-800/10">
                    <td className="py-4 px-4 font-mono font-bold text-slate-500 dark:text-slate-400 text-center text-[15px]">[2]</td>
                    <td className="py-4 px-4 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">CARO 2020 Physical Verification</td>
                    <td className="py-4 px-4 leading-relaxed text-slate-800 dark:text-slate-200">
                      Under the Companies (Auditor's Report) Order (CARO) 2020, auditors must comment on whether physical verification of inventory has been conducted by management at reasonable intervals, and whether any discrepancies of 10% or more in aggregate for each class of inventory were noticed and properly dealt with in the books.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors bg-white dark:bg-[#111726]">
                    <td className="py-4 px-4 font-mono font-bold text-slate-500 dark:text-slate-400 text-center text-[15px]">[3]</td>
                    <td className="py-4 px-4 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">SA 501 Audit Evidence</td>
                    <td className="py-4 px-4 leading-relaxed text-slate-800 dark:text-slate-200">
                      <strong>Auditor's Physical Attendance:</strong> Under Standard on Auditing (SA) 501, the auditor must obtain sufficient appropriate audit evidence regarding the existence and condition of inventory by attending the physical inventory counting, unless impracticable, to evaluate management count instructions and perform test counts.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 2**, focus heavily on the allocation of fixed production overheads under low capacity (Example 2) and the raw materials exception when finished goods are sold below cost (Chapter VIII). Remember that abnormal losses must always be expensed, and trade discounts must be deducted from cost of purchase.
          </NB>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Ensure that fixed overheads are never allocated on actual capacity when it is lower than normal capacity, to prevent the capitalization of idle-plant losses. Always maintain robust costing sheets linking product bills-of-materials to standard prices.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify SA 501 count observations and CARO 10% discrepancy thresholds. Double check NRV estimations made close to the balance sheet date, particularly looking at post-balance sheet selling price realizations.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
