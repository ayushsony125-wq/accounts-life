'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, ChevronDown } from 'lucide-react'

export const as5Sections = [
  { id: 'as-5-intro-sec', title: '1. Introduction & Objectives' },
  { id: 'as-5-introduction', title: '2.1 INTRODUCTION' },
  { id: 'as-5-net-profit-or-loss-for-the-period', title: '2.2 NET PROFIT OR LOSS FOR THE PERIOD' },
  { id: 'as-5-prior-period-items', title: '2.3 PRIOR PERIOD ITEMS' },
  { id: 'as-5-changes-in-accounting-estimates', title: '2.4 CHANGES IN ACCOUNTING ESTIMATES' },
  { id: 'as-5-changes-in-accounting-policies', title: '2.5 CHANGES IN ACCOUNTING POLICIES' }
];

interface AS5StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function AS5StandardTabContent({ navigateToPdfPage }: AS5StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as-5-intro-sec');
  const tocScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(id);
    const stickyToc = document.getElementById('as-5-standard-sticky-toc');
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

      as5Sections.forEach((sec) => {
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
      <div id="as-5-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as5Sections.map(sec => (
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
        <section id="as-5-intro-sec" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-5-intro-sec" num="1" title="1. Introduction &amp; Objectives" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            UNIT 2: ACCOUNTING STANDARD 5 NET PROFIT OR LOSS FOR THE PERIOD, PRIOR PERIOD ITEMS AND CHANGES IN ACCOUNTING POLICIES After studying this unit, you will be able to comprehend the meaning and accounting treatment for ♦ Net Profit or Loss for the Period ♦ Extraordinary Items ♦ Profit or Loss from Ordinary Activities ♦ Prior Period Items ♦ Changes in Accounting Estimates ♦ Changes in Accounting Policies. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 5**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 5, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.1 INTRODUCTION */}
        <section id="as-5-introduction" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-5-introduction" num="2.1" title="INTRODUCTION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The objective of <strong>AS 5</strong> is to prescribe the classification and disclosure of certain items in the statement of profit and loss so that all enterprises prepare and present such a statement on a uniform basis. This enhances the comparability of the financial statements of an enterprise over time and with the financial statements of other enterprises. Accordingly, <strong>AS 5</strong> requires the classification and disclosure of extraordinary and prior period items, and the disclosure of certain items within profit or loss from ordinary activities. It also specifies the accounting treatment for changes in accounting estimates and the disclosures to be made in the financial statements regarding changes in accounting policies. This Statement does not deal with the tax implications of extraordinary items, prior period items, changes in accounting estimates, and changes in accounting policies for which appropriate adjustments will have to be made depending on the circumstances. <PdfRef page={1} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS <PdfRef page={2} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 5**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 5, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.2 NET PROFIT OR LOSS FOR THE PERIOD */}
        <section id="as-5-net-profit-or-loss-for-the-period" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-5-net-profit-or-loss-for-the-period" num="2.2" title="NET PROFIT OR LOSS FOR THE PERIOD" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            All items of income and expense which are recognized in a period should be included in the determination of net profit or loss for the period unless an <strong>Accounting Standard</strong> requires or permits otherwise. The net profit or loss for the period comprises the following components, each of which should be disclosed on the face of the statement of profit and loss: (a) Profit or loss from ordinary activities Any activities which are undertaken by an enterprise as part of its business and such related activities in which the enterprise engages in furtherance of, incidental to, or arising from, these activities. For example, profit on sale of merchandise, loss on sale of unsold inventory at the end of the season. (b) Extraordinary items Income or expenses that arise from events or transactions that are clearly distinct from the ordinary activities of the enterprise and, therefore, are not expected to recur frequently or regularly. Extraordinary items should be disclosed in the statement of profit and loss as a part of net profit or loss for the period. The nature and the amount of each extraordinary item should be separately disclosed in the statement of profit and loss or in notes to accounts in a manner that its impact on current profit or loss can be perceived. Whether an event or transaction is clearly distinct from the ordinary activities of the enterprise is determined by the nature of the event or transaction in relation to the business ordinarily carried on by the enterprise rather than by the frequency with which such events are expected to occur. Therefore, an event or transaction may be extraordinary for one enterprise but not so for another enterprise because of the differences between their respective ordinary activities. For example, losses sustained as a result of an earthquake may qualify as an extraordinary item for many enterprises. However, claims from policyholders arising from an earthquake do not qualify as an extraordinary item for an insurance enterprise that insures against such risks. <PdfRef page={2} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Examples of events or transactions that generally give rise to extraordinary items for most enterprises are: – attachment of property of the enterprise – an earthquake (c) Exceptional items1 When items of income and expense within profit or loss from ordinary activities are of such size, nature or incidence that their disclosure is relevant to explain the performance of the enterprise for the period, the nature and amount of such items should be disclosed separately. Circumstances which may give rise to the separate disclosure of items of income and expense include: (a) The write-down of inventories to net realisable value as well as the reversal of such write-downs (b) A restructuring of the activities of an enterprise and the reversal of any provisions for the costs of restructuring (c) Disposals of items of property, plant and equipment (d) Disposals of long-term investments (e) Legislative changes having retrospective application (f) Litigation settlements (g) Other reversals of provisions 1 There is no such term as ‘exceptional item’ under <strong>AS 5</strong> and Schedule III to the Companies Act, 2013, however, the same has been used for better understanding of the requirement. Students may provide a suitable note in this regard in the examination. <PdfRef page={3} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS <PdfRef page={4} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 5**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 5, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.3 PRIOR PERIOD ITEMS */}
        <section id="as-5-prior-period-items" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-5-prior-period-items" num="2.3" title="PRIOR PERIOD ITEMS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Prior period items are income or expenses which arise in the current period as a result of errors or omissions in the preparation of the financial statements of one or more prior periods. Errors may occur as a result of mathematical mistakes, mistakes in applying accounting policies, mis-interpretation of facts, or oversight. The nature and amount of prior period items should be separately disclosed in the statement of profit and loss in a manner that their impact on the current profit or loss can be perceived. Prior period items are generally infrequent in nature and can be distinguished from changes in accounting estimates. Accounting estimates by their nature are approximations that may need revision as additional information becomes known. For example, income or expense recognised on the outcome of a contingency which previously could not be estimated reliably does not constitute a prior period item. Prior period items are normally included in the determination of net profit or loss for the current period. An alternative approach is to show such items in the statement of profit and loss after determination of current net profit or loss. In either case, the objective is to indicate the effect of such items on the current profit or loss. Net Profit or Loss for the Period Ordinary Items Extra Ordinary Items Prior Period Items Changes in Accounting Estimates Changes in Accounting Polices <PdfRef page={4} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Illustration From the past 5 financial years, an old outstanding balance of `50,000 was still appearing as sundry creditor in the current year balance sheet of People Ltd. The company is certain that this amount is not payable due to one or more reasons. Therefore, it decided to write off the said amount in its current year’s books of accounts and recognize it as income. The company treated the amount of ` 50,000 written off as a prior period item and made the adjustments accordingly. The company is of the view that since sundry balances were recognized in the prior period(s), its related written-off amount should be treated as a prior period item. Solution No, the company is not correct in treating the amount written off as a prior period item. As per <strong>AS 5</strong>, prior period items are income or expenses which arise in a current year due to errors or omissions in the preparation of the financial statements of one or more prior period(s). Writing off an old outstanding balance in the current year which is appearing in its books of accounts from the past 5 financial years does not mean that there has been an error or omission in the preparation of financial statements of prior period(s). It is just a practice adopted by the company to write off the old outstanding balances of more than 5 years in its current year books of accounts. Therefore, the amount written off is not treated as a prior period item. Hence, adjusting the amount `50,000 written off as a prior period item on the basis that sundry balances were recognized in prior period(s) is not in line with <strong>AS 5</strong>. <PdfRef page={5} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 5**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 5, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.4 CHANGES IN ACCOUNTING ESTIMATES */}
        <section id="as-5-changes-in-accounting-estimates" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-5-changes-in-accounting-estimates" num="2.4" title="CHANGES IN ACCOUNTING ESTIMATES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            An estimate may have to be revised if changes occur in the circumstances based on which the estimate was made, or as a result of new information, more experience or subsequent developments. The revision of the estimate, by its nature, does not bring the adjustment within the definitions of an extraordinary item or a prior period item. <PdfRef page={5} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS Accounting estimates by their nature are approximations that may need revision as additional information becomes known. For example, income or expense recognised on the outcome of a contingency which previously could not be estimated reliably does not constitute a prior period item. For example, Sachin purchased a new machine costing ` 10 lacs. Useful life was taken to be for 10 years, therefore, depreciation was charged at 10% on original cost each year. After 5 years when carrying amount was ` 5 lacs for the machine, management realises that machine can work for another 2 years only. In this case machine will be depreciated by ` 2.5 lacs each year for next 2 years. This is not an example of prior period item but change in accounting estimate. In the same example, let us suppose there is no change in useful life of the machine after 5 years. The management by mistake calculated the depreciation in the fifth year as 10% of ` 6,00,000 i.e. ` 60,000 instead of ` 1,00,000 and in the next year i.e. sixth year decides to charge depreciation of ` 1,40,000. In such a case, ` 1,00,000 would be the depreciation of sixth year and ` 40,000 depreciation charged by the management in the sixth year will be considered as a prior period item. As per <strong>AS 10</strong> (Revised), Property, Plant and Equipment, residual value and the useful life of an asset should be reviewed at least at each financial year-end and, if expectations differ from previous estimates, the change should be accounted for as a change in an accounting estimate in accordance with <strong>AS 5</strong> ‘Net Profit or Loss for the Period, Prior Period Items and Changes in Accounting Policies’. The effect of a change in an accounting estimate should be included in the determination of net profit or loss in: (a) The period of the change, if the change affects the period only; or (b) The period of the change and future periods, if the change affects both. For example, a change in the estimate of the amount of bad debts is recognised immediately and therefore affects only the current period. However, a change in the estimated useful life of a depreciable asset affects the depreciation in the current period and in each period during the remaining useful life of the asset. <PdfRef page={6} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The effect of a change in an accounting estimate should be classified using the same classification in the statement of profit and loss as was used previously for the estimate. To ensure the comparability of financial statements of different periods, the effect of a change in an accounting estimate which was previously included in the profit or loss from ordinary activities is included in the same component of net profit or loss. The effect of a change in an accounting estimate that was previously included as an extraordinary item is reported as an extraordinary item. The nature and amount of a change in an accounting estimate which has a material effect in the current period, or which is expected to have a material effect in subsequent periods, should be disclosed. If it is impracticable to quantify the amount, this fact should be disclosed. Sometimes, it is difficult to distinguish between a change in an accounting policy and a change in an accounting estimate. In such cases, the change is treated as a change in an accounting estimate, with appropriate disclosure. <PdfRef page={7} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 5**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 5, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.5 CHANGES IN ACCOUNTING POLICIES */}
        <section id="as-5-changes-in-accounting-policies" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-5-changes-in-accounting-policies" num="2.5" title="CHANGES IN ACCOUNTING POLICIES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Accounting policies are the specific accounting principles and the methods of applying those principles adopted by an enterprise in the preparation and presentation of financial statements. Accounting Policies can be changed only: • when the adoption of a different accounting policy is required by statute; or • for compliance with an <strong>Accounting Standard</strong>; or • when it is considered that the change would result in a more appropriate presentation of the financial statements of the enterprise. The following are not changes in accounting policies: (a) The adoption of an accounting policy for events or transactions that differ in substance from previously occurring events or transactions, e.g., introduction of a formal retirement gratuity scheme by an employer in place of ad hoc ex-gratia payments to employees on retirement; <PdfRef page={7} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS (b) The adoption of a new accounting policy for events or transactions which did not occur previously or that were immaterial. Any change in an accounting policy which has a material effect should be disclosed. The impact of, and the adjustments resulting from, such change, if material, should be shown in the financial statements of the period in which such change is made, to reflect the effect of such change. Where the effect of such change is not ascertainable, wholly or in part, the fact should be indicated. If a change is made in the accounting policies which has no material effect on the financial statements for the current period but which is reasonably expected to have a material effect in later periods, the fact of such change should be appropriately disclosed in the period in which the change is adopted. A change in accounting policy consequent upon the adoption of an <strong>Accounting Standard</strong> should be accounted for in accordance with the specific transitional provisions, if any, contained in that <strong>Accounting Standard</strong>. However, disclosures required by paragraph 32 of this Standard should be made unless the transitional provisions of any other <strong>Accounting Standard</strong> require alternative disclosures in this regard. Illustration 1 Fuel surcharge is billed by the State Electricity Board at provisional rates. Final bill for fuel surcharge of ` 5.30 lakhs for the period October, 20X1 to September, 20X7 has been received and paid in February, 20X8. However, the same was accounted in the year 20X8-X9. Comment on the accounting treatment done in the said case. Solution The final bill having been paid in February, 20X8 should have been accounted for in the annual accounts of the company for the year ended 31st March, 20X8. However, it seems that as a result of error or omission in the preparation of the financial statements of prior period i.e., for the year ended 31st March 20X8, this material charge has arisen in the current period i.e., year ended 31st March, 20X9. Therefore, it should be treated as &apos;Prior period item&apos; as per <strong>AS 5</strong>. As per <strong>AS 5</strong>, prior period items are normally included in the determination of net profit or loss for the current period. An alternative approach is to show such items in the statement of profit and loss after determination of current net profit or loss. In either case, the objective is to indicate the effect of such items on the current profit or loss. <PdfRef page={8} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            It may be mentioned that it is an expense arising from the ordinary course of business. Although abnormal in amount or infrequent in occurrence, such an expense does not qualify an extraordinary item as per <strong>AS 5</strong>. For better understanding, the fact that power bill is accounted for at provisional rates billed by the state electricity board and final adjustment thereof is made as and when final bill is received may be mentioned as an accounting policy. Illustration 2 (i) During the year 20X1-20X2, a medium size manufacturing company wrote down its inventories to net realisable value by ` 5,00,000. Is a separate disclosure necessary? (ii) A company signed an agreement with the Employees Union on.20X2 for revision of wages with retrospective effect from.20X1. This would cost the company an additional liability of ` 5,00,000 per annum. Is a disclosure necessary for the amount paid in 20X2-X3? Solution (i) Although the case under consideration does not relate to extraordinary item, but the nature and amount of such item may be relevant to users of financial statements in understanding the financial position and performance of an enterprise and in making projections about financial position and performance. <strong>AS 5</strong> on ‘Net Profit or Loss for the Period, Prior Period Items and Changes in Accounting Policies’ states that: “When items of income and expense within profit or loss from ordinary activities are of such size, nature or incidence that their disclosure is relevant to explain the performance of the enterprise for the period, the nature and amount of such items should be disclosed separately.” Circumstances which may require separate disclosure of items of income and expense in accordance with <strong>AS 5</strong> include the write-down of inventories to net realisable value as well as the reversal of such write-downs. (ii) It is given that revision of wages took place on 1st September, 20X2 with retrospective effect from.20X1. Therefore wages payable for the half year from.20X2 to.20X3 cannot be taken as an error or omission in the preparation of financial statements and hence this expenditure cannot <PdfRef page={9} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS be taken as a prior period item. Additional wages liability of ` 7,50,000 (for 1½ years @ ` 5,00,000 per annum) should be included in current year’s wages. It may be mentioned that additional wages is an expense arising from the ordinary activities of the company. Such an expense does not qualify as an extraordinary item. However, as per <strong>AS 5</strong>, when items of income and expense within profit or loss from ordinary activities are of such size, nature or incidence that their disclosure is relevant to explain the performance of the enterprise for the period, the nature and amount of such items should be disclosed separately. Illustration 3 The company finds that the inventory sheets of.20X1 did not include two pages containing details of inventory worth ` 14.5 lakhs. State, how you will deal with the following matters in the accounts of Omega Ltd. for the year ended 31st March, 20X2. Solution <strong>AS 5</strong> on ‘Net Profit or Loss for the Period, Prior Period Items and Changes in Accounting Policies’, defines Prior Period items as &quot;income or expenses which arise in the current period as a result of errors or omissions in the preparation of the financial statements of one or more prior periods”. Rectification of error in inventory valuation is a prior period item vide <strong>AS 5</strong>. Separate disclosure of this item as a prior period item is required as per <strong>AS 5</strong>. Illustration 4 Explain whether the following will constitute a change in accounting policy or not as per <strong>AS 5</strong>. (i) Introduction of a formal retirement gratuity scheme by an employer in place of ad hoc ex-gratia payments to employees on retirement. (ii) Management decided to pay pension to those employees who have retired after completing 5 years of service in the organisation. Such employees will get pension of ` 20,000 per month. Earlier there was no such scheme of pension in the organisation. <PdfRef page={10} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Solution As per <strong>AS 5</strong> ‘Net Profit or Loss for the Period, Prior Period Items and Changes in Accounting Policies’, the adoption of an accounting policy for events or transactions that differ in substance from previously occurring events or transactions, will not be considered as a change in accounting policy. (i) Accordingly, introduction of a formal retirement gratuity scheme by an employer in place of ad hoc ex-gratia payments to employees on retirement is not a change in an accounting policy. (ii) Similarly, the adoption of a new accounting policy for events or transactions which did not occur previously or that were immaterial will not be treated as a change in an accounting policy. Illustration 5 In the current year, A Ltd. changed the depreciation method from the Straight Line Method (SLM) to Written Down Value (WDV) method. When A Ltd. recomputed depreciation retrospectively as per the new method, deficiency arose in depreciation in respect of past years. Therefore, it reduced the carrying amount of the asset by the amount of deficiency and such change in carrying amount (deficiency amount) has been debited to the statement of profit and loss as an extraordinary expense. Whether the change in the carrying amount of assets due to the change in depreciation method should be treated as an extraordinary item? Solution No. As per <strong>AS 5</strong>, &quot;Net Profit or Loss for the Period, Prior Period Items and Changes in Accounting Policies&quot; extraordinary items are income or expenses that arise from events or transactions that are clearly distinct from the ordinary activities of the enterprise and, therefore, are not expected to recur frequently or regularly. A change in the method of charging depreciation is not an event that is clearly distinct from the ordinary activities of the entity. In the instant case, A Ltd. has changed the depreciation method and treated the reduction in carrying amount <PdfRef page={11} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS (or amount of deficiency in depreciation) of the asset as an extraordinary expense. This is not correct. Such deficiency should be treated as a normal expense. A change in the estimated useful life of a depreciable asset (i.e. change in depreciation method) affects the depreciation in the current period and in each period during the remaining useful life of the asset. In both cases, the effect of the change relating to the current period is recognised as income or expense in the current period. The effect, if any, on future periods, is recognised in future periods. The change in depreciation method is considered as a change in accounting estimate as per the provisions of <strong>AS 5</strong>. Reference: The students are advised to refer the full text of <strong>AS 5</strong>” Net Profit or Loss for the Period, Prior Period Items and Changes in Accounting Policies”. TEST YOUR KNOWLEDGE Multiple Choice Questions 1. A change in the estimated life of the asset, which necessitates adjustment in the depreciation is an example of (a) Prior period item. (b) Ordinary item. (c) Extraordinary item. (d) Change in accounting estimate. 2. Which of the following is considered as an extraordinary item as per <strong>AS 5</strong>? (a) Write down or write-off of receivables, inventory and intangible assets. (b) Gains and losses from sale or abandonment of equipment used in a business. (c) Effects of a strike, including those against competitors and major suppliers. (d) Flood damage from unusually heavy rain or a normally dry environment. <PdfRef page={12} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            3. Which one of the following is an example of extraordinary item? (a) The write down of inventories to their net realisable value (b) Reversal of write down of inventories (c) Government grants become refundable (d) Reversal of provisions. 4. Extraordinary items are income or expenses (a) That arise from events clearly distinct from the ordinary activities of the enterprise. (b) That are not expected to recur frequently or regularly. (c) Both (a) and (b). (d) None of the three. 5. An audit stock verification during the year ended 31st March, 20X1 revealed that opening stock of the year was understated by ` 5 lakhs due to wrong counting. While finalizing accounts, your opinion will be (a) It is not a prior period item and no separate disclosure is required (b) It should be treated as a prior period adjustment and should be separately disclosed in the current year’s financial statement (c) The adjustment of ` 5 lakhs in both opening stock of current year and profit brought forward from previous year should be made (d) Both (b) and (c). Answer to Scenario based Questions 6. A company (Z Ltd.) is engaged in the business of providing consultancy services. A few days back, it received a notice from GST department raising a demand of GST on consultancy services provided by it for ` 500,000. Recently Z Ltd. paid the demand. In the books, the payment is recorded as an extraordinary expenditure. Whether payment of tax demand raised by the taxation authority can be recognised as an extraordinary item? <PdfRef page={13} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS ANSWERS/SOLUTION Answer to the Multiple Choice Questions 1. (d) 2. (d) 3. (c) 4. (c) 5. (d) Answer to the Scenario based Questions 6. No, payment of tax cannot be recognised as an extraordinary item. As per <strong>AS 5</strong>, &quot;Net Profit or Loss for the Period, Prior Period Items and Changes in Accounting Policies&quot; an extraordinary item is income or expenses that arise from events or transactions that are clearly distinct from ordinary activities of the enterprise and, therefore, are not expected to recur frequently or regularly. In the given case, providing consultancy service is an ordinary activity of Z Ltd. Thus, GST paid pursuant to the demand raised by GST department is also a part of an ordinary activity of Z Ltd. Recognising such payments as an extra-ordinary item is contrary to <strong>AS 5</strong>. <PdfRef page={14} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 5**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 5, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
