'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, ChevronDown } from 'lucide-react'

export const as22Sections = [
  { id: 'as-22-intro-sec', title: '1. Introduction & Objectives' },
  { id: 'as-22-introduction', title: '4.1 INTRODUCTION' },
  { id: 'as-22-objective', title: '4.2 OBJECTIVE' },
  { id: 'as-22-definitions', title: '4.3 DEFINITIONS' },
  { id: 'as-22-recognition', title: '4.4 RECOGNITION' },
  { id: 'as-22-measurement', title: '4.5 MEASUREMENT' },
  { id: 'as-22-re-assessment-of-unrecognised', title: '4.6 RE-ASSESSMENT OF UNRECOGNISED' },
  { id: 'as-22-review-of-previously-recognised', title: '4.7 REVIEW OF PREVIOUSLY RECOGNISED' },
  { id: 'as-22-virtual-certainty-supported-by', title: '4.8 Virtual certainty supported by' },
  { id: 'as-22-disclosure', title: '4.9 DISCLOSURE' },
  { id: 'as-22-relevant-explanations-to-as-22', title: '4.10 RELEVANT EXPLANATIONS TO AS 22' }
];

interface AS22StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function AS22StandardTabContent({ navigateToPdfPage }: AS22StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as-22-intro-sec');
  const tocScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(id);
    const stickyToc = document.getElementById('as-22-standard-sticky-toc');
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

      as22Sections.forEach((sec) => {
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
      <div id="as-22-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as22Sections.map(sec => (
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
        <section id="as-22-intro-sec" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-22-intro-sec" num="1" title="1. Introduction &amp; Objectives" />
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 1 --- UNIT 4: ACCOUNTING STANDARD 22 ACCOUNTING FOR TAXES ON INCOME After studying this chapter, you will be able to comprehend the: ♦ What is the Objective of AS 22 ♦ What is the Recognition criteria for Deferred Tax ♦ Re-assessment of Unrecognised Deferred Tax Assets ♦ Measurement of Deferred Tax ♦ Review of Deferred Tax Assets ♦ Presentation and Disclosure ♦ Solve the practical problems based on application of Accounting Standards.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 22**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 22, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 4.1 INTRODUCTION */}
        <section id="as-22-introduction" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-22-introduction" num="4.1" title="INTRODUCTION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            This standard prescribes the accounting treatment of taxes on income and follows the concept of matching expenses against revenue for the period. The concept of matching is more peculiar in cases of income taxes since in a number of cases, the taxable income may be significantly different from the income reported in the financial statements due to the difference in treatment of certain items under taxation laws and the way it is reflected in accounts. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 22**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 22, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 4.2 OBJECTIVE */}
        <section id="as-22-objective" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-22-objective" num="4.2" title="OBJECTIVE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Matching of such taxes against revenue for a period poses special problems arising from the fact that in a number of cases, taxable income may be significantly different from the accounting income. This divergence between taxable income and accounting income arises due to two main reasons. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 2 --- AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS Firstly, there are differences between items of revenue and expenses as appearing in the statement of profit and loss and the items which are considered as revenue, expenses or deductions for tax purposes. Secondly, there are differences between the amount in respect of a particular item of revenue or expense as recognised in the statement of profit and loss and the corresponding amount which is recognised for the computation of taxable income.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 22**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 22, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 4.3 DEFINITIONS */}
        <section id="as-22-definitions" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-22-definitions" num="4.3" title="DEFINITIONS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Accounting income (loss) is the net profit or loss for a period, as reported in the statement of profit and loss, before deducting income-tax expense or adding income tax saving. Taxable income (tax loss) is the amount of the income (loss) for a period, determined in accordance with the tax laws, based upon which income-tax payable (recoverable) is determined. Tax expense (tax saving) is the aggregate of current tax and deferred tax charged or credited to the statement of profit and loss for the period. Current Tax + Deferred Tax = Tax expense (Tax saving) Current tax is the amount of income tax determined to be payable (recoverable) in respect of the taxable income (tax loss) for a period. Deferred tax is the tax effect of timing differences. The differences between taxable income and accounting income can be classified into permanent differences and timing differences. Timing differences are the differences between taxable income and accounting income for a period that originate in one period and are capable of reversal in one or more subsequent periods. For example, machinery purchased for scientific research related to business is fully allowed as deduction in the first year for tax purposes whereas the same would be charged to the statement of profit and loss as depreciation over its useful life. The total depreciation charged on the machinery for accounting purposes and the amount allowed as deduction for tax purposes will ultimately be <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 3 --- the same, but periods over which the depreciation is charged and the deduction is allowed will differ. This may lead to recognition of deferred tax in the books. Permanent differences are the differences between taxable income and accounting income for a period that originate in one period and do not reverse subsequently. Generally permanent differences leads to increase in current tax &amp; have no impact on Deferred Tax. For Example, XYZ has been charged with the fine on the late payment of the tax amount due to authorities. This would be considered as an expense in the profit and loss account, however this is specifically a disallowed expense for computation of taxable income. This will be treated as permanent difference as this difference will never reverse.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 22**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 22, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 4.4 RECOGNITION */}
        <section id="as-22-recognition" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-22-recognition" num="4.4" title="RECOGNITION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Tax expense for the period, comprising current tax and deferred tax, should be included in the determination of the net profit or loss for the period. Taxes on income are considered to be an expense incurred by the enterprise in earning income and are accrued in the same period as the revenue and expenses to which they relate. Such matching may result into timing differences. The tax effects of timing differences are included in the tax expense in the statement of profit and loss and as deferred tax assets or as deferred tax liabilities, in the balance sheet. While recognising the tax effect of timing differences, consideration of prudence cannot be ignored. Therefore, deferred tax assets are recognised and carried forward only to the extent that there is a reasonable certainty of their realisation. This reasonable level of certainty would normally be achieved by examining the past record of the enterprise and by making realistic estimates of profits for the future. Where an enterprise has unabsorbed depreciation or carry forward of losses under tax laws, deferred tax assets should be recognised only to the extent that there is virtual certainty supported by convincing evidence that sufficient future taxable income will be available against which such deferred tax assets can be realised. Permanent differences do not result in deferred tax assets or deferred tax liabilities. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 4 --- AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 22**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 22, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 4.5 MEASUREMENT */}
        <section id="as-22-measurement" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-22-measurement" num="4.5" title="MEASUREMENT" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Current tax should be measured at the amount expected to be paid to (recovered from) the taxation authorities, using the applicable tax rates and tax laws. Deferred tax assets and liabilities are usually measured using the tax rates and tax laws that have been enacted by the balance sheet date. However, certain announcements of tax rates and tax laws by the government may have the substantive effect of actual enactment. In these circumstances, deferred tax assets and liabilities are measured using such announced tax rate and tax laws. Deferred tax assets and liabilities should not be discounted to their present value. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 22**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 22, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 4.6 RE-ASSESSMENT OF UNRECOGNISED */}
        <section id="as-22-re-assessment-of-unrecognised" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-22-re-assessment-of-unrecognised" num="4.6" title="RE-ASSESSMENT OF UNRECOGNISED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            DEFERRED TAX ASSETS At each balance sheet date, an enterprise re-assesses unrecognised deferred tax assets. The enterprise recognises previously unrecognised deferred tax assets to the extent that it has become reasonably certain or virtually certain, as the case may be, that sufficient future taxable income will be available against which such deferred tax assets can be realised. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 22**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 22, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 4.7 REVIEW OF PREVIOUSLY RECOGNISED */}
        <section id="as-22-review-of-previously-recognised" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-22-review-of-previously-recognised" num="4.7" title="REVIEW OF PREVIOUSLY RECOGNISED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            DEFERRED TAX ASSETS The carrying amount of deferred tax assets should be reviewed at each balance sheet date. An enterprise should write-down the carrying amount of a deferred tax asset to the extent that it is no longer reasonably certain or virtually certain, as the case may be, that sufficient future taxable income will not be available against which deferred tax asset can be realised. Any such write-down may be reversed to the extent that it becomes reasonably certain or virtually certain, as the case may be, that sufficient future taxable income will be available. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 5 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 22**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 22, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 4.8 Virtual certainty supported by */}
        <section id="as-22-virtual-certainty-supported-by" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-22-virtual-certainty-supported-by" num="4.8" title="Virtual certainty supported by" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            CONVINCING EVIDENCE Determination of virtual certainty that sufficient future taxable income will be available is a matter of judgement and will have to be evaluated on a case-to- case basis. Virtual certainty refers to the extent of certainty, which, for all practical purposes, can be considered certain. Virtual certainty cannot be based merely on forecasts of performance such as business plans. Virtual certainty is not a matter of perception and it should be supported by convincing evidence. Evidence is a matter of fact. To be convincing, the evidence should be available at the reporting date in a concrete form, for example, a profitable binding export order, cancellation of which will result in payment of heavy damages by the defaulting party. On the other hand, a projection of the future profits made by an enterprise based on the future capital expenditures or future restructuring etc., submitted even to an outside agency, e.g., to a credit agency for obtaining loans and accepted by that agency cannot, in isolation, be considered as convincing evidence. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 22**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 22, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 4.9 DISCLOSURE */}
        <section id="as-22-disclosure" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-22-disclosure" num="4.9" title="DISCLOSURE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Statement of profit and loss Under <strong>AS 22</strong>, there is no specific requirement to disclose current tax and deferred tax in the statement of profit and loss. However, considering the requirements under the Companies Act, 2013, the amount of income tax and other taxes on profits should be disclosed. <strong>AS 22</strong> does not require any reconciliation between accounting profit and the tax expense. Balance sheet The break-up of deferred tax assets and deferred tax liabilities into major components of the respective balance should be disclosed in the notes to accounts. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 6 --- AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS Deferred tax assets and liabilities should be distinguished from assets and liabilities representing current tax for the period. Deferred tax assets and liabilities should be disclosed under a separate heading in the balance sheet of the enterprise, separately from current assets and current liabilities. The nature of the evidence supporting the recognition of deferred tax assets should be disclosed, if an enterprise has unabsorbed depreciation or carry forward of losses under tax laws. An enterprise should offset assets and liabilities representing current tax if the enterprise: a. Has a legally enforceable right to set off the recognised amounts and b. Intends to settle the asset and the liability on a net basis. An enterprise should offset deferred tax assets and deferred tax liabilities if: a. The enterprise has a legally enforceable right to set off assets against liabilities representing current tax; and b. The deferred tax assets and the deferred tax liabilities relate to taxes on income levied by the same governing taxation laws.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 22**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 22, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 4.10 RELEVANT EXPLANATIONS TO AS 22 */}
        <section id="as-22-relevant-explanations-to-as-22" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-22-relevant-explanations-to-as-22" num="4.10" title="RELEVANT EXPLANATIONS TO AS 22" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Accounting for Taxes on Income in the situations of Tax Holiday under sections 80-IA and 80-IB of the Income Tax Act, 1961 The deferred tax in respect of timing differences which reverse during the tax holiday period should not be recognised to the extent the enterprise’s gross total income is subject to the deduction during the tax holiday period as per the requirements of the Act. Deferred tax in respect of timing differences which reverse after the tax holiday period should be recognised in the year in which the timing differences originate. However, recognition of deferred tax assets should be subject to the consideration of prudence as laid down in <strong>AS 22</strong>. For the above purposes, the timing differences which originate first should be considered to reverse first. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 7 --- Accounting for Taxes on Income in the situations of Tax Holiday under sections 10A and 10B of the Income Tax Act, 1961 The deferred tax in respect of timing differences which originate during the tax holiday period and reverse during the tax holiday period, should not be recognised to the extent deduction from the total income of an enterprise is allowed during the tax holiday period as per the provisions of sections 10A and 10B of the Act. Deferred tax in respect of timing differences which originate during the tax holiday period but reverse after the tax holiday period should be recognised in the year in which the timing differences originate. However, recognition of deferred tax assets should be subject to the consideration of prudence as laid down in AS 22. For the above purposes, the timing differences which originate first should be considered to reverse first. Accounting for Taxes on Income in the context of section 115JB of the Income Tax Act, 1961 The payment of tax under section 115JB of the Act is a current tax for the period. In a period in which a company pays tax under section 115JB of the Act, the deferred tax assets and liabilities in respect of timing differences arising during the period, tax effect of which is required to be recognised under AS 22, should be measured using the regular tax rates and not the tax rate under section 115JB of the Act. In case an enterprise expects that the timing differences arising in the current period would reverse in a period in which it may pay tax under section 115JB of the Act, the deferred tax assets and liabilities in respect of timing differences arising during the current period, tax effect of which is required to be recognised under AS 22, should be measured using the regular tax rates and not the tax rate under section 115JB of the Act.</li>
            <li>-- PAGE 8 --- AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS Illustration 1 Rama Ltd., has provided the following information: ` Depreciation as per accounting records = 2,00,000 Depreciation as per income tax records = 5,00,000 Unamortised preliminary expenses as per tax record = 30,000 There is adequate evidence of future profit sufficiency. How much net deferred tax asset/liability should be recognised as transition adjustment? Tax rate 50%. Solution Table showing calculation of deferred tax asset / liability Particulars Amount Timing differences Deferred tax Amount @ 50% ` ` Excess depreciation as per tax records (` 5,00,000 – ` 2,00,000) 3,00,000 Timing Deferred tax liability 1,50,000 Unamortised preliminary expenses as per tax records 30,000 Timing Deferred tax asset (15,000) Net deferred tax liability 1,35,000 Illustration 2 From the following details of A Ltd. for the year ended 31-03-20X1, calculate the deferred tax asset/ liability as per AS 22 and amount of tax to be debited to the Profit and Loss Account for the year. Particulars ` Accounting Profit 6,00,000 Book Profit as per MAT 3,50,000 Profit as per Income Tax Act 60,000 Tax rate 20% MAT rate%</li>
            <li>-- PAGE 9 --- Solution Tax as per accounting profit 6,00,000×20% = ` 1,20,000 Tax as per Income-tax Profit 60,000×20% = ` 12,000 Tax as per MAT 3,50,000×7.50% = ` 26,250 Tax expense= Current Tax +Deferred Tax ` 1,20,000 = ` 12,000+ Deferred tax Therefore, Deferred Tax liability as on 31-03-20X1 = ` 1,20,000 – ` 12,000 = ` 1,08,000 Amount of tax to be debited in Profit and Loss account for the year 31-03-20X1 Current Tax + Deferred Tax liability + Excess of MAT over current tax = ` 12,000 + ` 1,08,000 + ` 14,250 (26,250 – 12,000) = ` 1,34,250 Illustration 3 PQR Ltd.&apos;s accounting year ends on 31st March. The company made a loss of ` 2,00,000 for the year ending.20X1. For the years ending.20X2 and.20X3, it made profits of ` 1,00,000 and ` 1,20,000 respectively. It is assumed that the loss of a year can be carried forward for eight years and tax rate is 40%. By the end of.20X1, the company feels that there will be sufficient taxable income in the future years against which carry forward loss can be set off. There is no difference between taxable income and accounting income except that the carry forward loss is allowed in the years ending 20X2 and 20X3 for tax purposes. Prepare a statement of Profit and Loss for the years ending 20X1, 20X2 and 20X3. Solution Statement of Profit and Loss.20X1.20X2.20X3 ` ` ` Profit (Loss) (2,00,000) 1,00,000 1,20,000 Less: Current tax (20,000 x 40%) (8,000) Deferred tax: Tax effect of timing differences originating during the year (2,00,000 x 40%) 80,000</li>
            <li>-- PAGE 10 --- AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS Tax effect of timing differences reversed/adjusted during the year (1,00,000 x 40%) (40,000) (40,000) Profit (Loss) After Tax Effect (1,20,000) 60,000 72,000 Illustration 4 Omega Limited is working on different projects which are likely to be completed within 3 years period. It recognises revenue from these contracts on percentage of completion method for financial statements during 20X0-20X1, 20X1-20X2 and 20X2-20X3 for ` 11,00,000, ` 16,00,000 and ` 21,00,000 respectively. However, for Income-tax purpose, it has adopted the completed contract method under which it has recognised revenue of ` 7,00,000, ` 18,00,000 and ` 23,00,000 for the years 20X0-20X1, 20X1-20X2 and 20X2-20X3 respectively. Income-tax rate is 35%. Compute the amount of deferred tax asset/liability for the years 20X0-20X1, 20X1- 20X2 and 20X2-20X3. Solution Calculation of Deferred Tax Asset/Liability in Omega Limited Year Accounting Income Taxable Income Timing Difference Timing Difference (balance) Deferred Tax Deferred Tax Liability (balance) 20X0- 20X1 11,00,000 7,00,000 4,00,000 4,00,000 1,40,000 1,40,000 20X1- 20X2 16,00,000 18,00,000 (2,00,000) 2,00,000 (70,000) 70,000 20X2- 20X3 21,00,000 23,00,000 (2,00,000) NIL (70,000) NIL 48,00,000 48,00,000 Reference: The students are advised to refer the full text of AS 22 “Accounting for Taxes on Income”</li>
            <li>-- PAGE 11 --- TEST YOUR KNOWLEDGE Multiple Choice Questions 1. As per AS 22 on ‘Accounting for Taxes on Income’, tax expense is: (a) Current tax + deferred tax charged to profit and loss account (b) Current tax-deferred tax credited to profit and loss account (c) Either (a) or (b) (d) Deferred tax charged to profit and loss account 2. G Ltd. has provided the following information: Depreciation as per accounting records = ` 2,00,000 Depreciation as per tax records = ` 5,00,000 There is adequate evidence of future profit sufficiency. How much deferred tax asset/liability should be recognized as transition adjustment when the tax rate is 45%? (a) Deferred Tax asset = ` 2,70,000. (b) Deferred Tax asset = ` 1,35,000. (c) Deferred Tax Liability = ` 2,70,000 (d) Deferred Tax Liability = ` 1,35,000. 3. State which of the followings statements are correct: (1) There are no pre-conditions required to recognize deferred tax liability, (2) Deferred tax asset under all circumstances can only be created if and only if there is reasonable certainty that future taxable income will arise. (a) Both are correct. (b) Only (1) is correct. (c) Only (2) is correct. (d) None of the statements are correct.</li>
            <li>-- PAGE 12 --- AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS 4. Which of the following statement are incorrect: (a) Only timing differences result in creation of deferred tax. (b) Permanent differences do not result in recognition of deferred tax. (c) The tax rate used for measurement of deferred tax is substantively enacted tax rate. (d) The entity has to recognize deferred tax liability/asset arising out of timing difference. There are no conditions which are required to evaluated for their recognition. Theoretical Questions 5. Write short note on Timing differences and Permanent differences as per AS 22. Scenario based Questions 6. Y Ltd. is a full tax free enterprise for the first ten years of its existence and is in the second year of its operation. Depreciation timing difference is INR 200 lakhs and INR 400 lakhs respectively which will result in a tax liability in year 1 and 2. From the third year it is expected that the timing difference would reverse each year by INR 10 lakhs. Assuming tax rate of 40%, find out the deferred tax liability at the end of the second year and any charge to the Profit and Loss account. 7. Ultra Ltd. has provided the following information: Depreciation as per accounting records =INR 4,00,000 Depreciation as per tax records =INR 10,00,000 Unamortized preliminary expenses as per tax record = INR 30,000 There is adequate evidence of future profit sufficiency. How much deferred tax asset/liability should be recognized as transition adjustment when the tax rate is 50%? 8. Saras Ltd. closes its books as on 31 st March 20X2. They have accrued ` 5,00,000 towards GST Liability for the month of March 20X2 by debiting their Profit and loss statement which is expected to be paid off by 21 st April</li>
            <li>-- PAGE 13 --- 20X2 . As per the provisions of Section 43B of the Income Tax Act, 1961 – Any expenditure of the nature mentioned in section 43B (e.g. taxes, duty, cess, fees, etc.) accrued in the statement of profit and loss on mercantile basis will be allowed for tax purposes in subsequent years on payment basis only. Assuming a Tax rate of 30% determine the Deferred Tax Asset/Liability as at 31 st March 20X2. 9. ABC Company limited had an investment in Venture Capital amounting ` 10 Crores. Venture capital in turn had invested in the below portfolio companies (New Start- ups) on behalf of ABC Limited: Portfolio Companies Amount of investment ( ` in Crores) Oscar Limited 2 Zee Limited 3 Star Limited 4 Sony Limited 1 Total 10 During the FY 2019-2020, Venture Capital had sold their investment in Star Limited and realised an amount of ` 8 Crores on sale of shares of star Limited and entire proceeds of ` 8 Crores have been transferred by Venture Capital to ABC Company Limited. The accounts manager has received the following additional information from venture capital on.2020: (1) 8 Crores has been deducted from the cost of investment and carrying amount of investment as at year end is 2 Crores. (2) Company had to pay a capital gain tax @ 20% on the net sale consideration of ` 4 Crores. (3) Due to COVID-19, the remaining start- ups (i.e. Oscar Limited, Zee Limited, and Sony Limited) are not performing well and will soon wind up their operations. Venture capital is monitoring the situation and if required they will provide an impairment loss in June 2020 Quarter. You need to suggest the accounts manager what should be the correct accounting treatment as per AS 22 “Accounting for Taxes on Income”.</li>
            <li>-- PAGE 14 --- AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS ANSWERS/SOLUTIONS Answer to the Multiple Choice Questions 1. (c) 2. (d) 3. (a) 4. (d) Answer to the Theoretical Questions 5. In current practices, companies, in general, prepare books of accounts as per Companies Act, 2013 generating Accounting Profit/Loss and Income-tax Act, 1961 generating Taxable Profit/Loss. Accounting income and taxable income for a period are seldom the same. Permanent differences are those which arise in one period and do not reverse subsequently. For e.g., an income exempt from tax or an expense that is not allowable as a deduction for tax purposes. Timing differences are those which arise in one period and are capable of reversal in one or more subsequent periods. For e.g., Depreciation etc. Answer to the Scenario based Questions 6. As per AS 22, ‘Accounting for Taxes on Income’, deferred tax in respect of timing differences which originate during the tax holiday period and reverse during the tax holiday period, should not be recognised to the extent deduction from the total income of an enterprise is allowed during the tax holiday period as per the provisions of sections 10A and 10B of the Income- tax Act. Deferred tax in respect of timing differences which originate during the tax holiday period but reverse after the tax holiday period should be recognised in the year in which the timing differences originate. However, recognition of deferred tax assets should be subject to the consideration of prudence. For this purpose, the timing differences which originate first should be considered to reverse first. Out of 200 lakhs timing difference due to depreciation, difference amounting 80 lakhs (10 lakhs x 8 years) will reverse in the tax holiday period and therefore, should not be recognised. However, for 120 lakhs (200 lakhs – ` 80 lakhs), deferred tax liability will be recognised for 48 lakhs (40% of 120 lakhs) in first year. In the second year, the entire amount of timing difference of ` 400 lakhs will reverse only after tax holiday period and</li>
            <li>-- PAGE 15 --- hence, will be recognised in full. Deferred tax liability amounting 160 lakhs (40% of 400 lakhs) will be created by charging it to profit and loss account and the total balance of deferred tax liability account at the end of second year will be 208 lakhs (48 lakhs + 160 lakhs). 7. Calculation of difference between taxable income and accounting income Particulars Amount (` ) Excess depreciation as per tax ` (10,00,000 – 4,00,000) 6,00,000 Less: Expenses unamortized in tax records (30,000) Timing difference 5,70,000 Tax expense is more than the current tax due to timing difference. Therefore deferred tax liability = 50% x 5,70,000 = 2,85,000 8. Calculation of difference between taxable income and accounting income Particulars Amount (`) GST Liability debited in books 5,00,000 Less: GST Liability allowed under Income Tax Act (Section 43B) Nil Timing difference 5,00,000 Tax expense is less than the current tax due to timing difference. Therefore, deferred tax Asset = 30% x 5,00,000 = 1,50,000 9. As company had to pay capital gain tax @ 20% on the net sale consideration as per income tax laws, the company has to recognise a current tax liability of Crores computed as under: Particulars Amount (` in Crores) Sales Consideration 8 Cost of Investment 4 Net gain on Sale 4 Tax @ 20% 0.8</li>
            <li>-- PAGE 16 --- AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS As per AS 22, Timing differences are those differences between taxable income and accounting income for a period that originate in one period and are capable of reversal in one or more subsequent periods. Particulars Amount (` in Crores) Rationale Taxable Income 4 As per income tax laws Accounting Income Nil As the same is deducted from the cost of investment Timing Difference 4 As per AS 22, deferred tax assets should be recognised and carried forward only to the extent that there is a reasonable certainty that sufficient future taxable income will be available against which such deferred tax assets can be realised. Since in current scenario, due to Covid 19 the portfolio companies are not performing well, thus the company may not have sufficient future taxable income which will reverse deferred tax assets. Therefore, the company should not recognise DTA of ` 0.8 Crores and company should recognise only current tax liability of ` 0.8 Crores.</li>
            <li>-- PAGE 17 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 22**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 22, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
