'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, ChevronDown } from 'lucide-react'

export const as2Sections = [
  { id: 'as-2-intro-sec', title: '1. Introduction & Objectives' },
  { id: 'as-2-introduction', title: '1.1 INTRODUCTION' },
  { id: 'as-2-inventories', title: '1.2 INVENTORIES' },
  { id: 'as-2-measurement-of-inventories', title: '1.3 MEASUREMENT OF INVENTORIES' },
  { id: 'as-2-costs-of-inventory', title: '1.4 COSTS OF INVENTORY' },
  { id: 'as-2-costs-of-purchase', title: '1.5 COSTS OF PURCHASE' },
  { id: 'as-2-costs-of-conversion', title: '1.6 COSTS OF CONVERSION' },
  { id: 'as-2-joint-or-by-products', title: '1.7 JOINT OR BY-PRODUCTS' },
  { id: 'as-2-other-costs', title: '1.8 OTHER COSTS' },
  { id: 'as-2-exclusions-from-the-cost-of', title: '1.9 EXCLUSIONS FROM THE COST OF' },
  { id: 'as-2-cost-formula', title: '1.10 COST FORMULA' },
  { id: 'as-2-other-techniques-of-cost', title: '1.11 OTHER TECHNIQUES OF COST' },
  { id: 'as-2-estimates-of-net-realisable-value', title: '1.12 ESTIMATES OF NET REALISABLE VALUE' },
  { id: 'as-2-comparison-of-cost-and-net', title: '1.13 COMPARISON OF COST AND NET' },
  { id: 'as-2-nrv-of-materials-held-for-use-or', title: '1.14 NRV OF MATERIALS HELD FOR USE OR' },
  { id: 'as-2-disclosures', title: '1.15 DISCLOSURES' }
];

interface AS2StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function AS2StandardTabContent({ navigateToPdfPage }: AS2StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as-2-intro-sec');
  const tocScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(id);
    const stickyToc = document.getElementById('as-2-standard-sticky-toc');
    if (container && target) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      let offset = 58;
      if (stickyToc) {
        const tocRect = stickyToc.getBoundingClientRect();
        offset = tocRect.bottom - containerRect.top;
      }
      container.scrollTo({
        top: targetRect.top - containerRect.top + container.scrollTop - offset - 12,
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
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        {
          root: scrollContainer,
          rootMargin: '-90px 0px -60% 0px',
          threshold: 0
        }
      );

      as2Sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) observer?.observe(el);
      });
    };

    initObserver();
    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    const el = tocScrollRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    if (!activeSection || !tocScrollRef.current) return;
    const activeBtn = tocScrollRef.current.querySelector('[data-toc-id="' + activeSection + '"]');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeSection]);

  const PdfRef = ({ page }: { page: number }) => (
    <button
      onClick={() => navigateToPdfPage(page)}
      className="inline-flex items-center justify-center w-4 h-4 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded transition-all cursor-pointer select-none align-middle"
      title={"Open ICAI PDF — Page " + page}
    >
      <FileText size={10} className="shrink-0" />
    </button>
  );

  const SH = ({ id, num, title }: { id: string; num: string; title: string }) => {
    const cleanTitle = title.replace(/^\s*\d+(?:\.\d+)*\s*/, '');
    return (
      <div id={id} className="scroll-mt-36 mb-6 mt-12 first:mt-2 w-full">
        <div className="flex items-baseline gap-2 mb-2">
          <h2 className="text-[20px] sm:text-[22px] font-sans font-bold text-slate-900 dark:text-white tracking-tight leading-tight flex items-baseline gap-2">
            <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold mr-1 select-none">{num}.</span>
            <span>{cleanTitle}</span>
          </h2>
        </div>
        <div className="h-[1.5px] w-full bg-slate-200/80 dark:bg-slate-800/80 mb-3" />
      </div>
    );
  };

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
      <div id="as-2-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as2Sections.map(sec => (
              <button key={sec.id} data-toc-id={sec.id} onClick={() => handleSectionClick(sec.id)}
                className={'text-[9.5px] font-bold px-2 py-0.5 rounded border transition-all whitespace-nowrap cursor-pointer ' + (activeSection === sec.id ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#1E2640] dark:hover:bg-slate-800 border-slate-200 dark:border-gray-700 text-slate-600 dark:text-gray-300')}>
                {sec.title.split('. ').slice(1).join('. ') || sec.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 mt-6">
        <div className="w-full bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 rounded-xl px-4 sm:px-8 lg:px-12 py-10 sm:py-14 shadow-sm space-y-8">
        {/* Section: 1. Introduction & Objectives */}
        <section id="as-2-intro-sec" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-2-intro-sec" num="1" title="1. Introduction &amp; Objectives" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            STANDARDS UNIT 1: ACCOUNTING STANDARD 2 VALUATION OF INVENTORY After studying this unit, you will be able to comprehend the • Definition of Inventory; • <strong>Measurement</strong> of Inventories; • What is included in Cost of Inventories; • Exclusions from the Cost of Inventories; • Cost Formulas; • Techniques for the <strong>Measurement</strong> of Cost. CHAPTER v v a 5 <PdfRef page={1} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             <PdfRef page={2} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 2**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 2, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 1.1 INTRODUCTION */}
        <section id="as-2-introduction" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-2-introduction" num="1.1" title="INTRODUCTION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The accounting treatment for inventories is prescribed in <strong>AS 2</strong> (Revised) ‘Valuation of Inventories’, which provides guidance for determining the value at which inventories, are carried in the financial statements until related revenues are recognised. It also provides guidance on the cost formulas that are used to assign costs to inventories and any write-down thereof to net realisable value. <PdfRef page={2} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 2**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 2, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 1.2 INVENTORIES */}
        <section id="as-2-inventories" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-2-inventories" num="1.2" title="INVENTORIES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            <strong>AS 2</strong> (Revised) defines inventories as assets held • for sale in the ordinary course of business, or • in the process of production for such sale, or • for consumption in the production of goods or services for sale, including maintenance supplies and consumables other than machinery spares, servicing equipment and standby equipment meeting the definition of Property, plant and equipment. Inventories encompass goods purchased and held for resale, for example merchandise (goods) purchased by a retailer and held for resale, or land and other property held for resale. Inventories also include finished goods produced, or work in progress being produced, by the enterprise and include materials, maintenance supplies, consumables and loose tools awaiting use in the production process. Inventories do not include spare parts, servicing equipment and standby equipment which meet the definition of property, plant and equipment as per <strong>AS 10</strong> (Revised), Property, Plant and Equipment. Such items are accounted for in accordance with <strong>Accounting Standard</strong> (AS) (Revised) 10, Property, Plant and Equipment. Following are excluded from the scope of <strong>AS 2</strong> (Revised). (a) Work in progress arising under construction contracts, i.e. cost of part construction, including directly related service contracts, being covered under <strong>AS 7</strong>, Accounting for Construction Contracts; Inventory held for use in construction, e.g. cement lying at the site should however be covered by <strong>AS 2</strong> (Revised). <PdfRef page={2} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             (b) Work in progress arising in the ordinary course of business of service providers i.e. cost of providing a part of service. For example, for a shipping company, fuel and stores not consumed at the end of accounting period is inventory but not costs for voyage-in-progress. Work-in-progress may arise for different other services e.g. software development, consultancy, medical services, merchant banking and so on. (c) Shares, debentures and other financial instruments held as stock-in-trade. It should be noted that these are excluded from the scope of <strong>AS 13</strong> (Revised) as well. The current Indian practice is however to value them at lower of cost and fair value. (d) Producers’ inventories of livestock, agricultural and forest products, and mineral oils, ores and gases to the extent that they are measured at net realisable value in accordance with well established practices in those industries, e.g. where sale is assured under a forward contract or a government guarantee or where a homogenous market exists and there is negligible risk of failure to sell. The types of inventories are related to the nature of business. The inventories of a trading concern consist primarily of products purchased for resale in their existing form. It may also have an inventory of supplies such as wrapping paper, cartons, and stationery. The inventories of manufacturing concern consist of several types of inventories: raw material (which will become part of the goods to be produced), parts and factory supplies, work-in-process (partially completed products in the factory) and, of course, finished products. At the year end every business entity needs to ascertain the closing balance of Inventory which comprise of Inventory of raw material, work-in-progress, finished goods and miscellaneous items. The cost of closing inventory, e.g. cost of closing stock of raw materials, closing work-in-progress and closing finished stock, is a part of costs incurred in the current accounting period that is carried over to next accounting period. Likewise, the cost of opening inventory is a part of costs incurred in the previous accounting period that is brought forward to current accounting period. Since inventories are assets, and assets are resources expected to generate future economic benefits to the enterprise, the costs to be included in inventory costs, <PdfRef page={3} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             are costs that are expected to generate future economic benefits to the enterprise. Such costs must be costs of acquisition and costs incurred in bringing the assets to their present (i) location of the inventory, e.g. freight incurred to carry the materials to factory and (ii) conditions of the inventory, e.g. costs incurred to convert the materials into finished stock. The costs incurred to maintain the inventory, e.g. storage costs, do not generate any extra economic benefits for the enterprise and therefore should not be included in inventory costs unless those costs are necessary in production process prior to a further production stage. The valuation of inventory is crucial because of its direct impact in measuring profit/loss for an accounting period. Higher the value of closing inventory lower is the cost of goods sold and hence higher is the profit. The principle of prudence demands that no profit should be anticipated while all foreseeable losses should be recognised. Thus, if net realisable value of inventory is less than inventory cost, inventory is valued at net realisable value to reduce the reported profit in anticipation of loss. On the other hand, if net realisable value of inventory is more than inventory cost, the anticipated profit is ignored and the inventory is valued at cost. In short, inventory is valued at lower of cost and net realisable value. The standard specifies (i) what the cost of inventory should consist of and (ii) how the net realisable value is determined. Abnormal gains or losses are not expected to recur regularly. For a meaningful analysis of an enterprise’s performance, the users of financial statements need to know the amount of such gains/losses included in current profit/loss. For this reason, instead of taking abnormal gains and losses in inventory costs, these are shown in the Profit and Loss statement in such way that their impact on current profit/loss can be perceived. Part I of Schedule III to the Companies Act, 2013 prescribes that valuation method should be disclosed for inventory held by companies. <PdfRef page={4} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 2**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 2, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 1.3 MEASUREMENT OF INVENTORIES */}
        <section id="as-2-measurement-of-inventories" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-2-measurement-of-inventories" num="1.3" title="MEASUREMENT OF INVENTORIES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Inventories should be valued at lower of cost and net realisable value. Net realisable value is the estimated selling price in the ordinary course of business less the estimated costs of completion and the estimated costs necessary to make <PdfRef page={4} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             the sale. The valuation of inventory at lower of cost and net realisable value is based on the view that no asset should be carried at a value which is in excess of the value realisable by its sale or use. Example 1 Cost of a partly finished unit at the end of 20X1-X2 is ` 150. The unit can be finished next year by a further expenditure of ` 100. The finished unit can be sold at ` 250, subject to payment of 4% brokerage on selling price. Assume that the partly finished unit cannot be sold in semi-finished form and its NRV is zero without processing it further. The value of inventory will be determined as below: ` Net selling price 250 Less: Estimated cost of completion (100) 150 Less: Brokerage (4% of 250) (10) Net Realisable Value 140 Cost of inventory 150 Value of inventory (Lower of cost and net realisable value) 140 Inventories Raw Materials At cost (if finished goods are sold at or above cost), otherwise at replacement cost Finished Goods and Work in progress Lower of the following Cost Cost of Purchase Cost of Conversion Other Costs Net Realisable Value Realisable Value Less Selling Expenses less estimated cost of completion <PdfRef page={5} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             <PdfRef page={6} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 2**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 2, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 1.4 COSTS OF INVENTORY */}
        <section id="as-2-costs-of-inventory" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-2-costs-of-inventory" num="1.4" title="COSTS OF INVENTORY" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Costs of inventories comprise all costs of purchase, costs of conversion and other costs incurred in bringing the inventories to their present location and condition. <PdfRef page={6} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 2**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 2, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 1.5 COSTS OF PURCHASE */}
        <section id="as-2-costs-of-purchase" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-2-costs-of-purchase" num="1.5" title="COSTS OF PURCHASE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The costs of purchase consist of the purchase price including duties and taxes (other than those subsequently recoverable by the enterprise from the taxing authorities, and other expenditure directly attributable to the acquisition. Trade discounts, rebates, duty drawbacks and other similar items are deducted in determining the costs of purchase. <PdfRef page={6} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 2**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 2, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 1.6 COSTS OF CONVERSION */}
        <section id="as-2-costs-of-conversion" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-2-costs-of-conversion" num="1.6" title="COSTS OF CONVERSION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The costs of conversion include costs directly related to production, e.g. direct labour. They also include overheads, both fixed and variable that are incurred in converting raw material to finished goods. The fixed production overheads should be absorbed systematically to units of production over normal capacity. Normal capacity is the production the enterprise expects to achieve on an average over a number of periods or seasons under normal circumstances, taking into account the loss of capacity resulting from planned maintenance. The actual level of production may be used if it approximates the normal capacity. The amount of fixed production overheads allocated to each unit of production should not be increased as a consequence of low production or idle plant. Unallocated overheads (i.e. under recovery) are recognised as an expense in the period in which they are incurred. In periods of abnormally high production, the amount of fixed production overheads allocated to each unit of production is decreased so that inventories are not measured above cost. Variable production overheads are assigned to each unit of production on the basis of the actual use of the production facilities. <PdfRef page={6} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Example 2 ABC Ltd. has a plant with the capacity to produce 1 lac unit of a product per annum and the expected fixed overhead is ` 18 lacs. Fixed overhead on the basis of normal capacity is ` 18 (18 lacs/1 lac). Case 1: Actual production is 1 lac units. Fixed overhead on the basis of normal capacity and actual overhead will lead to same figure of ` 18 lacs. Therefore, it is advisable to include this on normal capacity. Case 2: Actual production is 90,000 units. Fixed overhead is not going to change with the change in output and will remain constant at ` 18 lacs, therefore, overheads on actual basis is ` 20 per unit (18 lacs/ 90 thousands). Hence by valuing inventory at ` 20 each for fixed overhead purpose, it will be overvalued and the losses of ` 1.8 lacs will also be included in closing inventory leading to a higher gross profit then actually earned. Therefore, it is advisable to include fixed overhead per unit on normal capacity to actual production (90,000 x 18) ` 16.2 lacs and rest ` 1.8 lacs should be transferred to Profit &amp; Loss Account. Case 3: Actual production is lacs units. Fixed overhead is not going to change with the change in output and will remain constant at ` 18 lacs, therefore, overheads on actual basis is ` 15 (18 lacs/ 1.2 lacs). Hence by valuing inventory at ` 18 each for fixed overhead purpose, we will be adding the element of cost to inventory which actually has not been incurred. At ` 18 per unit, total fixed overhead comes to ` 21.6 lacs whereas, actual fixed overhead expense is only ` 18 lacs. Therefore, it is advisable to include fixed overhead on actual basis (1.2 lacs x 15) ` 18 lacs. <PdfRef page={7} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 2**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 2, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 1.7 JOINT OR BY-PRODUCTS */}
        <section id="as-2-joint-or-by-products" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-2-joint-or-by-products" num="1.7" title="JOINT OR BY-PRODUCTS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            In case of joint or by products, the costs incurred up to the stage of split off should be allocated on a rational and consistent basis. The basis of allocation may be sale value at split off point, for example, value of by products, scraps and wastes are usually not material. These are therefore valued at net realisable value. The cost of main product is then valued as joint cost minus net realisable value of by-products, scraps or wastes. <PdfRef page={7} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             <PdfRef page={8} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 2**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 2, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 1.8 OTHER COSTS */}
        <section id="as-2-other-costs" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-2-other-costs" num="1.8" title="OTHER COSTS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            (a) These may be included in cost of inventory provided they are incurred to bring the inventory to their present location and condition. Cost of design, for example, for a custom made unit may be taken as part of inventory cost. (b) Interest and other borrowing costs are usually considered as not relating to bringing the inventories to their present location and condition. These costs are therefore not usually included in cost of inventory. Interests and other borrowing costs however are taken as part of inventory costs, where the inventory necessarily takes substantial period of time for getting ready for intended sale. Example of such inventory is wine. (c) The standard is silent on treatment of amortisation of intangibles for ascertaining inventory costs. It nevertheless appears that amortisation of intangibles related to production, e.g. patents right of production or copyright for a publisher should be taken as part of inventory costs. (d) Exchange differences are not taken in inventory costs. *When actual production is almost equal or lower than normal capacity. ** When actual production is higher than normal capacity. *** Allocation at reasonable and consistent basis. Conversion Cost Factory Overheads Fixed At Normal Capacity* At actual Production** Variable At actual Production Direct labour Joint Cost Main/Joint*** Sale Value at Separation Sale Value at completion By Products Measured at NRV. This NRV is deducted from cost of main / joint products <PdfRef page={8} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             <PdfRef page={9} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 2**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 2, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 1.9 EXCLUSIONS FROM THE COST OF */}
        <section id="as-2-exclusions-from-the-cost-of" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-2-exclusions-from-the-cost-of" num="1.9" title="EXCLUSIONS FROM THE COST OF" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            INVENTORIES In determining the cost of inventories, it is appropriate to exclude certain costs and recognise them as expenses in the period in which they are incurred. Examples of such costs are: (a) Abnormal amounts of wasted materials, labour, or other production costs; (b) Storage costs, unless the production process requires such storage; (c) Administrative overheads that do not contribute to bringing the inventories to their present location and condition; (d) Selling and distribution costs. <PdfRef page={9} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 2**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 2, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 1.10 COST FORMULA */}
        <section id="as-2-cost-formula" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-2-cost-formula" num="1.10" title="COST FORMULA" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Mostly inventories are purchased / made in different lots and unit cost of each lot frequently differs. In all such circumstances, determination of closing inventory cost requires identification of units in stock to have come from a particular lot. This specific identification is best wherever possible. In all other cases, the cost of inventory should be determined by the First-In First-Out (FIFO), or Weighted Average cost formula. The formula used should reflect the fairest possible approximation to the cost incurred in bringing the items of inventory to their present location and condition. <PdfRef page={9} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 2**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 2, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 1.11 OTHER TECHNIQUES OF COST */}
        <section id="as-2-other-techniques-of-cost" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-2-other-techniques-of-cost" num="1.11" title="OTHER TECHNIQUES OF COST" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            MEASUREMENT (a) Instead of actual, the standard costs may be taken as cost of inventory provided standards fairly approximate the actual. Such standards (for finished or partly finished units) should be set in the light of normal levels of material consumption, labour efficiency and capacity utilisation. The standards so set should be regularly reviewed and if necessary, be revised to reflect current conditions. <PdfRef page={9} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             (b) In retail business, where a large number of rapidly changing items are traded, the actual costs of items may be difficult to determine. The units dealt by a retailer however, are usually sold for similar gross margins and a retail method to determine cost in such retail trades makes use of the fact. By this method, cost of inventory is determined by reducing sale value of unsold stock by appropriate average percentage of gross margin. Example 3 A trader purchased certain articles for ` 85,000. He sold some of articles for ` 1,05,000. The average percentage of gross markup is 25% on cost. Opening stock of inventory at cost was ` 15,000. Cost of closing inventory is shown below: ` Sale value of opening stock and purchase ( ` 85,000 + ` 15,000) x 1,25,000 Sales (1,05,000) Sale value of unsold stock 20,000 Less: Gross Markup ( ` 20,000 / 1.25) x (4,000) Cost of inventory 16,000 Note: Margin is on sales and mark-up is on cost. <PdfRef page={10} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 2**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 2, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 1.12 ESTIMATES OF NET REALISABLE VALUE */}
        <section id="as-2-estimates-of-net-realisable-value" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-2-estimates-of-net-realisable-value" num="1.12" title="ESTIMATES OF NET REALISABLE VALUE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Estimates of net realisable value are based on the most reliable evidence available at the time the estimates are made as to the amount the inventories are expected to realise. These estimates take into consideration fluctuations of price or cost directly relating to events occurring after the balance sheet date to the extent that such events confirm the conditions existing at the balance sheet date. <PdfRef page={10} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             <PdfRef page={11} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 2**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 2, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 1.13 COMPARISON OF COST AND NET */}
        <section id="as-2-comparison-of-cost-and-net" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-2-comparison-of-cost-and-net" num="1.13" title="COMPARISON OF COST AND NET" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            REALISABLE VALUE The comparison between cost and net realisable value should be made on item- by-item basis. In some cases nevertheless, it may be appropriate to group similar or related items. Example 4 The cost, net realisable value and inventory value of two items that a company has in its inventory are given below: Cost Net Realisable Value Inventory Value ` ` ` Item 1 50,000 45,000 45,000 Item 2 20,000 24,000 20,000 Total 70,000 69,000 65,000 Estimates of NRV should be based on evidence available at the time of estimation. Net realisable value is the estimated selling price in the ordinary course of business less the estimated costs of completion and the estimated costs necessary to make the sale. <strong>AS 2</strong> (Revised) also provides that estimates of net realisable value are to be based on the most reliable evidence available at the time the estimates are made as to the amount the inventories are expected to realise. These estimates take into consideration fluctuations of price or cost directly relating to events occurring after the balance sheet date to the extent that such events confirm the conditions existing at the balance sheet date. <PdfRef page={11} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 2**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 2, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 1.14 NRV OF MATERIALS HELD FOR USE OR */}
        <section id="as-2-nrv-of-materials-held-for-use-or" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-2-nrv-of-materials-held-for-use-or" num="1.14" title="NRV OF MATERIALS HELD FOR USE OR" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            DISPOSAL Materials and other supplies held for use in the production of inventories are not written down below cost if the selling price of finished product containing the material exceeds the cost of the finished product. The reason is, as long as these conditions hold the material realises more than its cost as shown below. <PdfRef page={11} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Review of net realisable value at each balance sheet date An assessment is made of net realisable value as at each balance sheet date. <PdfRef page={12} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 2**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 2, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 1.15 DISCLOSURES */}
        <section id="as-2-disclosures" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-2-disclosures" num="1.15" title="DISCLOSURES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The financial statements should disclose: (a) The accounting policies adopted in measuring inventories, including the cost formula used; and (b) The total carrying amount of inventories together with a classification appropriate to the enterprise. Information about the carrying amounts held in different classifications of inventories and the extent of the changes in these assets is useful to financial statement users. Common classifications of inventories are (1) raw materials and components, (2) work in progress, (3) finished goods, (4) Stock-in-trade (in respect of goods acquired for trading), (5) stores and spares, (6) loose tools, and (7) Others (specify nature). Illustration 1 The company deals in three products, A, B and C, which are neither similar nor interchangeable. At the time of closing of its account for the year 20X1-X2, the Historical Cost and Net Realisable Value of the items of closing stock are determined as follows: Items Historical Cost ( ` in lakhs) Net Realisable Value ( ` in lakhs) A 40 28 B 32 32 C 16 24 What will be the value of closing stock? <PdfRef page={12} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Solution As per <strong>AS 2</strong> (Revised) on ‘Valuation of Inventories’, inventories should be valued at the lower of cost and net realisable value. Inventories should be written down to net realisable value on an item-by-item basis in the given case. Items Historical Cost (` in lakhs) Net Realisable Value (` in lakhs) Valuation of closing stock (` in lakhs) A 40 28 28 B 32 32 32 C 16 24 16 88 84 76 Hence, closing stock will be valued at ` 76 lakhs. Illustration 2 X Co. Limited purchased goods at the cost of ` 40 lakhs in October, 20X1. Till March, 20X2, 75% of the stocks were sold. The company wants to disclose closing stock at 10 lakhs. The expected sale value is ` 11 lakhs and a commission at 10% on sale is payable to the agent. Advise, what is the correct closing stock to be disclosed as at.20X2. Solution As per <strong>AS 2</strong> (Revised) “Valuation of Inventories”, the inventories are to be valued at lower of cost or net realisable value. In this case, the cost of inventory is ` 10 lakhs. The net realisable value is 11,00,000  90% = ` 9,90,000. So, the stock should be valued at ` 9,90,000. Illustration 3 In a production process, normal waste is 5% of input. 5,000 MT of input were put in process resulting in wastage of 300 MT. Cost per MT of input is ` 1,000. The entire quantity of waste is on stock at the year end. State with reference to <strong>Accounting Standard</strong>, how will you value the inventories in this case? <PdfRef page={13} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Solution As per <strong>AS 2</strong> (Revised), abnormal amounts of wasted materials, labour and other production costs are excluded from cost of inventories and such costs are recognised as expenses in the period in which they are incurred. In this case, normal waste is 250 MT and abnormal waste is 50 MT. The cost of 250 MT will be included in determining the cost of inventories (finished goods) at the year end. The cost of abnormal waste (50 MT x 1,052.6315 = ` 52,632) will be charged to the profit and loss statement. Cost per MT (Normal Quantity of 4,750 MT) = 50,00,000 / 4,750 = ` 1,052.6315 Total value of inventory = 4,700 MT x ` 1,052.6315 = ` 49,47,368. Illustration 4 You are required to value the inventory per kg of finished goods consisting of: ` per kg. Material cost 200 Direct labour 40 Direct variable overhead 20 Fixed production charges for the year on normal working capacity of 2 lakh kgs is ` 20 lakhs. 4,000 kgs of finished goods are in stock at the year end. Solution In accordance with <strong>AS 2</strong> (Revised), the cost of conversion include a systematic allocation of fixed and variable overheads that are incurred in converting materials into finished goods. The allocation of fixed overheads for the purpose of their inclusion in the cost of conversion is based on normal capacity of the production facilities. <PdfRef page={14} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Cost per kg. of finished goods: ` Material Cost 200 Direct Labour 40 Direct Variable Production Overhead 20 Fixed Production Overhead      2,00,000 20,00,000 <PdfRef page={15} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            10 70 270 Hence the value of 4,000 kgs. of finished goods = 4,000 kgs x ` 270 = ` 10,80,000 TEST YOUR KNOWLEDGE Multiple Choice Questions 1. Which item of inventory is under the scope of <strong>AS 2</strong> (Revised)? (a) WIP arising under construction contracts (b) Raw materials (c) Shares (d) Debentures held as stock in trade. 2. Materials and other supplies held for use in the production of inventories are not written down below cost if the finished products in which they will be incorporated are expected to be (a) sold at or above cost. (b) sold above cost. (c) sold less than cost. (d) sold at market value(where market value is more than cost). <PdfRef page={15} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             3. All of the following costs are excluded while computing value of inventories except? (a) Selling and Distribution costs (b) Allocated fixed production overheads based on normal capacity. (c) Abnormal wastage (d) Storage costs (which is not necessary part of the production process) 4. Identify the statement(s) which is/are incorrect. (a) Storage costs which is a necessary part of the production process is included in inventory valuation. (b) Administration overheads are never included in inventory valuation. (c) Full amount of variable production overheads incurred are included in inventory valuation. (d) Administration overheads are always included in inventory valuation. Theoretical Questions 5. “In determining the cost of inventories, it is appropriate to exclude certain costs and recognise them as expenses in the period in which they are incurred”. Provide examples of such costs as per <strong>AS 2</strong> (Revised) ‘Valuation of Inventories’. Scenario base Questions 6. Capital Cables Ltd., has a normal wastage of 4% in the production process. During the year 20X1-20X2 the Company used 12,000 MT of raw material costing ` 150 per MT. At the end of the year 630 MT of wastage was in stock. The accountant wants to know how this wastage is to be treated in the books. Explain in the context of <strong>AS 2</strong> (Revised) the treatment of normal loss and abnormal loss and also find out the amount of abnormal loss, if any. 7. Mr. Mehul gives the following information relating to items forming part of inventory as on 31-3-20X1. His factory produces Product X using Raw material A. <PdfRef page={16} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             (i) 600 units of Raw material A (purchased @ ` 120). Replacement cost of raw material A as on 31-3-20X1 is ` 90 per unit. (ii) 500 units of partly finished goods in the process of producing X and cost incurred till date ` 260 per unit. These units can be finished next year by incurring additional cost of ` 60 per unit. (iii) 1500 units of finished Product X and total cost incurred ` 320 per unit. Expected selling price of Product X is ` 300 per unit. Determine how each item of inventory will be valued as on 31-3-20X1. Also calculate the value of total inventory as on 31-3-20X1. 8. On 31st March 20X1, a business firm finds that cost of a partly finished unit on that date is ` 530. The unit can be finished in 20X1-X2 by an additional expenditure of ` 310. The finished unit can be sold for ` 750 subject to payment of 4% brokerage on selling price. The firm seeks your advice regarding the amount at which the unfinished unit should be valued as at 31st March, 20X1 for preparation of final accounts. Assume that the partly finished unit cannot be sold in semi-finished form and its NRV is zero without processing it further. 9. Alpha Ltd. sells flavored milk to customers; some of the customers consume the milk in the shop run by Alpha Limited. While leaving the shop, the consumers leave the empty bottles in the shop and the company takes possession of these empty bottles. The company has laid down a detailed internal record procedure for accounting for these empty bottles which are sold by the company by calling for tenders. Keeping this in view: Decide whether the inventory of empty bottles is an asset of the company; If so, whether the inventory of empty bottles existing as on the date of Balance Sheet is to be considered as inventories of the company and valued as per <strong>AS 2</strong> or to be treated as scrap and shown at realizable value with corresponding credit to ‘Other Income’? <PdfRef page={17} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ANSWERS/SOLUTION Answer to the Multiple Choice Questions 1. (b) 2. (a) 3. (b) 4. (d) Answer to the Theoretical Questions 5. As per <strong>AS 2</strong> (Revised) ‘Valuation of Inventories’, certain costs are excluded from the cost of the inventories and are recognised as expenses in the period in which incurred. Examples of such costs are: (a) abnormal amount of wasted materials, labour, or other production costs; (b) storage costs, unless those costs are necessary in the production process prior to a further production stage; (c) administrative overheads that do not contribute to bringing the inventories to their present location and condition; and (d) selling and distribution costs. Answer to the Scenario base Questions 6. As per <strong>AS 2</strong> (Revised) ‘Valuation of Inventories’, abnormal amounts of wasted materials, labour and other production costs are excluded from cost of inventories and such costs are recognised as expenses in the period in which they are incurred. The normal loss will be included in determining the cost of inventories (finished goods) at the year end. Amount of Abnormal Loss: Material used 12,000 MT @ `150 = `18,00,000 Normal Loss (4% of 12,000 MT) 480 MT Net quantity of material 11,520 MT Abnormal Loss in quantity 150 MT Abnormal Loss ` 23,437.50 [150 units @ ` 156.25 (` 18,00,000/11,520)] Amount ` 23,437.50 will be charged to the Statement of Profit and Loss. <PdfRef page={18} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             7. As per <strong>AS 2</strong> (Revised) “Valuation of Inventories”, materials and other supplies held for use in the production of inventories are not written down below cost if the finished products in which they will be incorporated are expected to be sold at cost or above cost. However, when there has been a decline in the price of materials and it is estimated that the cost of the finished products will exceed net realisable value, the materials are written down to net realisable value. In such circumstances, the replacement cost of the materials may be the best available measure of their net realisable value. In the given case, selling price of product X is ` 300 and total cost per unit for production is ` 320. Hence the valuation will be done as under: (i) 600 units of raw material will be written down to replacement cost as market value of finished product is less than its cost, hence valued at ` 90 per unit. (ii) 500 units of partly finished goods will be valued at 240 per unit i.e. lower of cost (` 260) or Net realisable value ` 240 (Estimated selling price ` 300 per unit less additional cost of ` 60). (iii) 1,500 units of finished product X will be valued at NRV of ` 300 per unit since it is lower than cost ` 320 of product X. Valuation of Total Inventory as on.20X1: Units Cost (`) NRV / Replacement cost Value = units x cost or NRV whichever is less (`) Raw material A Partly finished goods Finished goods X 600 500 1,500 120 260 320 90 240 300 54,000 1,20,000 4,50,000 Value of Inventory 6,24,000 <PdfRef page={19} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             8. Valuation of unfinished unit ` Net selling price 750 Less: Estimated cost of completion (310) 440 Less: Brokerage (4% of 750) (30) Net Realisable Value 410 Cost of inventory 530 Value of inventory (Lower of cost and net realisable value) 410 9. As per the ‘Framework on Presentation and Preparation of Financial Statements’: Tangible objects or intangible rights carrying probable future benefits, owned by an enterprise are called assets. Alpha Ltd. sells these empty bottles by calling tenders. It means further benefits are accrued on its sale. Therefore, empty bottles are assets for the company. As per <strong>AS 2</strong>, inventories are assets held for sale in the ordinary course of business. Inventory of empty bottles existing on the Balance Sheet date is the inventory and Alpha Ltd. has detailed controlled recording and accounting procedure which duly signify its materiality. Thus, inventory of empty bottles cannot be considered as scrap and should be valued as inventory in accordance with <strong>AS 2</strong>. <PdfRef page={20} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 2**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 2, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>
        </div>
      </div>
    </div>
  );
}
