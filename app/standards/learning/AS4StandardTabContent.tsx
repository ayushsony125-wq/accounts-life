'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, ChevronDown } from 'lucide-react'

export const as4Sections = [
  { id: 'as-4-intro-sec', title: '1. Introduction & Objectives' },
  { id: 'as-4-introduction', title: '1.1 INTRODUCTION' },
  { id: 'as-4-contingencies', title: '1.2 CONTINGENCIES' },
  { id: 'as-4-events-occurring-after-the-balance', title: '1.3 EVENTS OCCURRING AFTER THE BALANCE' },
  { id: 'as-4-adjusting-events', title: '1.4 ADJUSTING EVENTS' },
  { id: 'as-4-non-adjusting-events', title: '1.5 NON-ADJUSTING EVENTS' },
  { id: 'as-4-disclosure', title: '1.6 DISCLOSURE' }
];

interface AS4StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function AS4StandardTabContent({ navigateToPdfPage }: AS4StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as-4-intro-sec');
  const tocScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(id);
    const stickyToc = document.getElementById('as-4-standard-sticky-toc');
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

      as4Sections.forEach((sec) => {
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
    return (
      <div id={id} className="scroll-mt-36 mb-6 mt-12 first:mt-2 w-full">
        <div className="flex items-baseline gap-2 mb-2">
          <h2 className="text-[20px] sm:text-[22px] font-sans font-bold text-slate-900 dark:text-white tracking-tight leading-tight flex items-baseline gap-2">
            <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold mr-1 select-none">{num}.</span>
            <span>{title}</span>
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
      <div id="as-4-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as4Sections.map(sec => (
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
        <section id="as-4-intro-sec" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-4-intro-sec" num="1" title="1. Introduction &amp; Objectives" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a CHAPTER 7 BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS UNIT 1: ACCOUNTING STANDARD 4 CONTINGENCIES AND EVENTS OCCURRING AFTER THE BALANCE SHEET DATE After studying this unit, you will be able to elucidate the –  Meaning of Contingencies and accounting treatment of contingent gains and contingent losses.  Events Occurring after the Balance Sheet Date: Adjusting and Non-adjusting events  Necessary <strong>Disclosures</strong> required as per the standard. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 4**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 4, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
        <section id="as-4-introduction" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-4-introduction" num="1.1" title="INTRODUCTION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            All paragraphs of <strong>AS 4</strong> (Revised) that deal with contingencies are applicable only to the extent not covered by other Accounting Standards prescribed by the Central Government. For example, the impairment of financial assets such as impairment of receivables (commonly known as provision for bad and doubtful debts) is governed by this Standard. Thus, the present standard (<strong>AS 4</strong> (Revised)) CHAPTER <PdfRef page={1} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            deals with the treatment and disclosure requirements in the financial statements of events occurring after the balance sheet. <PdfRef page={2} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 4**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 4, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.2 CONTINGENCIES */}
        <section id="as-4-contingencies" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-4-contingencies" num="1.2" title="CONTINGENCIES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Contingency is a condition or situation, the ultimate outcome of which, gain or loss, will be known or determined only on the occurrence, or non-occurrence, of one or more uncertain future events. Accounting Treatment of Contingent Losses The accounting treatment of a contingent loss is determined by the expected outcome of the contingency. If it is likely that a contingency will result in a loss to the enterprise, then it is prudent to provide for that loss in the financial statements. Example: ABC has filed case against a debtor for a recovery of ` 25 Lakhs. According to the legal team, the chances of recovery is nil. Therefore, ABC should make provision for doubtful debt. The estimation of the amount of a contingent loss to be provided for in the financial statements, may be based on judgement made, by the management. If there is conflicting or insufficient evidence for estimating the amount of a contingent loss, then disclosure is made of the existence and nature of the contingency. The estimates of the outcome and of the financial effect of contingencies are determined by the judgment of the management of the enterprise. This judgment is based on consideration of the information available up to the date on which the financial statements are approved and will include a review of events occurring after the balance sheet date, supplemented by experience of similar transactions and, in some cases, reports from independent experts. The existence and amount of guarantees, obligations arising from discounted bills of exchange and similar obligations undertaken by an enterprise are generally disclosed in financial statements by way of note, even though the possibility that a loss to the enterprise will occur, is remote. <PdfRef page={2} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS a7.3 Accounting Treatment of Contingent Gains Contingent gains are not recognised in financial statements since their recognition may result in the recognition of revenue which may never be realised. However, when the realisation of a gain is virtually certain, then such gain is not a contingency and accounting for the gain is appropriate. The amount at which a contingency is stated in the financial statements is based on the information which is available at the date on which the financial statements are approved. <PdfRef page={3} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 4**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 4, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.3 EVENTS OCCURRING AFTER THE BALANCE */}
        <section id="as-4-events-occurring-after-the-balance" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-4-events-occurring-after-the-balance" num="1.3" title="EVENTS OCCURRING AFTER THE BALANCE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            SHEET DATE Events occurring after the balance sheet date are those significant events, both favourable and unfavourable, that occur between the balance sheet date and the date on which the financial statements are approved by the Board of Directors in the case of a company, and, by the corresponding approving authority in the case of any other entity. For example, for the year ending on 31st March 20X1, financial statement is finalized and approved by the Board of the directors of the company in its meeting held on 04th September 20X1. In this case the events taking place between 01st April 20X1 to 04th September 20X1 are termed as events occurring after the balance sheet date. Two types of events can be identified: a. Adjusting events- those which provide further evidence of conditions that existed at the balance sheet date. For example, a trade receivable declared insolvent after reporting date and unable to pay full amount against whom provision for doubtful debt was created. b. Non-adjusting events- those which are indicative of conditions that arose subsequent to the balance sheet date. For example, plant got damaged due to occurrence of fire. <PdfRef page={3} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 4**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 4, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.4 ADJUSTING EVENTS */}
        <section id="as-4-adjusting-events" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-4-adjusting-events" num="1.4" title="ADJUSTING EVENTS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Adjustments to assets and liabilities are required for events occurring after the balance sheet date that provide additional information materially affecting the determination of the amounts relating to conditions existing at the balance sheet date. For example, an adjustment may be made for a loss on a trade receivable account which is confirmed by the insolvency of a customer which occurs after the balance sheet date. <PdfRef page={4} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 4**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 4, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.5 NON-ADJUSTING EVENTS */}
        <section id="as-4-non-adjusting-events" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-4-non-adjusting-events" num="1.5" title="NON-ADJUSTING EVENTS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Adjustments to assets and liabilities are not appropriate for events occurring after the balance sheet date, if such events do not relate to conditions existing at the balance sheet date. An example is the decline in market value of investments between the balance sheet date and the date on which the financial statements are approved. Ordinary fluctuations in market values do not normally relate to the condition of the investments at the balance sheet date but reflect circumstances which have occurred in the following period. Events occurring after the balance sheet date which do not affect the figures stated in the financial statements would not normally require disclosure in the financial statements although they may be of such significance that they may require a disclosure in the report of the approving authority to enable users of financial statements to make proper evaluations and decisions. Dividend declared after balance sheet date There are events which, although take place after the balance sheet date, are sometimes reflected in the financial statements because of statutory requirements or because of their special nature. For example, if dividends are declared after the balance sheet date but before the financial statements are approved, the dividends are not recognised as a liability at the balance sheet date because no obligation exists at that time unless a statute requires otherwise. Such dividends are disclosed in the notes. Thus, no liability for proposed dividends needs to be recognised in the financial statements for financial year ended 31st March, 2017 <PdfRef page={4} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS a7.5 and subsequent years. Such proposed dividends are to be disclosed in the notes as per Companies (Accounting Standards) Amendment Rules, 2016 issued on 30 March 2016. Events indicating going concern assumption inappropriate Events occurring after the balance sheet date may indicate that the enterprise ceases to be a going concern. A deterioration in operating results and financial position, or unusual changes affecting the existence or substratum of the enterprise after the balance sheet date (e.g., destruction of a major production plant by a fire after the balance sheet date) may indicate a need to consider whether it is proper to use the fundamental accounting assumption of going concern in the preparation of the financial statements. In case the going concern assumption is not valid (based on events occurring after the balance sheet date), the financial statements are prepared on a liquidation basis. Event occuring after the Balance Sheet date Evidence of such condition been existed at the Balance Sheet date Adjusting event Adjustment to assets and liabilities is required Disclosure in the financial statements is required No evidence of such condition been existed at the Balance Sheet date Non-adjusting event Adjustment to assets and liabilities is not required Disclosure in the report of the approving authority is required <PdfRef page={5} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 4**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 4, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.6 DISCLOSURE */}
        <section id="as-4-disclosure" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-4-disclosure" num="1.6" title="DISCLOSURE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Disclosure of events occurring after the balance sheet date requires the following information be provided in the financial statements: (a) The nature of the event; (b) An estimate of the financial effect, or a statement that such an estimate cannot be made. Example A company follows April-March as its financial year. The company recognises cheques dated 31st March or before, received from customers after the balance sheet date but before approval of financial statement by debiting Cheques in hand A/c and crediting the Debtors A/c. The Cheques in hand are shown in the balance sheet as an item of cash and cash equivalents. All Cheques in hand are presented to bank in the month of April and are also realised in the same month in the normal course after deposit in the bank. Even if the cheques bear the date 31st March or before, the cheques received after 31st March do not represent any condition existing on 31st March. Thus the collection of cheques after balance sheet date is not an adjusting event. <strong>Recognition</strong> of cheques in hand is therefore not consistent with the requirements of <strong>AS 4</strong> (Revised). Moreover, the collection of cheques after balance sheet date does not represent any material change or commitments affecting financial position of the enterprise, and so no disclosure of such collections in the Directors’ Report is necessary. It should also be noted that, the Framework for Preparation and Presentation of Financial Statement defines assets as resources controlled by an enterprise as a result of past events from which economic benefits are expected to flow to the enterprise. Since the company acquires custody of the cheques after 31st March, it does not have any control over the cheques on 31st March and hence cheques in hand do not qualify to be recognised as asset on 31st March. Illustration 1 In X Co. Ltd., theft of cash of ` 5 lakhs by the cashier in January, 20X1 was detected only in May, 20X1. The accounts of the company were not yet approved by the Board of Directors of the company. <PdfRef page={6} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS a7.7 Decide whether the theft of cash has to be adjusted in the accounts of the company for the year ended 31.3.20X1. Solution As per <strong>AS 4</strong> (Revised) ‘Contingencies and Events occurring after the Balance Sheet Date’, an event occurring after the balance sheet date may require adjustment to the reported amounts of assets, liabilities, expenses or incomes. If a fraud of the accounting period is detected after the balance sheet date but before approval of the financial statements, it is necessary to recognise the loss amounting ` 5,00,000 and adjust the accounts of the company for the year ended 31st March, 20X1. Illustration 2 An earthquake destroyed a major warehouse of ACO Ltd. on 20.5.20X2. The accounting year of the company ended on 31.3.20X2. The accounts were approved on 30.6.20X2. The loss from earthquake is estimated at ` 30 lakhs. State with reasons, whether the loss due to earthquake is an adjusting or non-adjusting event and how the fact of loss is to be disclosed by the company. Solution <strong>AS 4</strong> (Revised) “Contingencies and Events Occurring after the Balance Sheet Date”, states that adjustments to assets and liabilities are not appropriate for events occurring after the balance sheet date, if such events do not relate to conditions existing at the balance sheet date. The destruction of warehouse due to earthquake did not exist on the balance sheet date i.e. 31.3.20X2. Therefore, loss occurred due to earthquake is not to be recognised in the financial year 20X1- 20X2. However, according to the standard, unusual changes affecting the existence or substratum of the enterprise after the balance sheet date may indicate a need to consider the use of fundamental accounting assumption of going concern in the preparation of the financial statements. As per the information given in the question, the earthquake has caused major destruction; therefore, fundamental accounting assumption of going concern would have to be evaluated. Considering that the going concern assumption is still valid, the fact of earthquake together with an estimated loss of ` 30 lakhs should be disclosed in <PdfRef page={7} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            the report of the approving authority for financial year 20X1-X2 to enable users of financial statements to make proper evaluations and decisions. Illustration 3 A company has filed a legal suit against the debtor from whom ` 15 lakh is recoverable as on 31.3.20X1. The chances of recovery by way of legal suit are not good as per legal opinion given by the counsel in April, 20X1. Can the company provide for full amount of ` 15 lakhs as provision for doubtful debts? Discuss. Solution As per <strong>AS 4</strong> (Revised) “Contingencies and Events Occurring After the Balance Sheet Date”, assets and liabilities should be adjusted for events occurring after the balance sheet date that provide additional evidence to assist the estimation of amounts relating to conditions existing at the balance sheet date. In the given case, company should make the provision for doubtful debts, as legal suit has been filed on 31st March, 20X1 and the chances of recovery from the suit are not good. Though, the actual result of legal suit will be known in future yet situation of non-recovery from the debtors exists before finalisation of financial statements. Therefore, provision for doubtful debts should be made for the year ended on 31st March, 20X1. Illustration 4 In preparing the financial statements of R Ltd. for the year ended 31st March, 20X1, you come across the following information. State with reasons, how you would deal with this in the financial statements: The company invested 100 lakhs in April, 20X1 before approval of Financial Statements by the Board of directors in the acquisition of another company doing similar business, the negotiations for which had started during the year. Solution <strong>AS 4</strong> (Revised) defines &quot;Events Occurring after the Balance Sheet Date&quot; as those significant events, both favourable and unfavourable, that occur between the balance sheet date and the date on which the financial statements are approved by the Approving Authority in the case of a company. Accordingly, the acquisition of another company is an event occurring after the balance sheet date. However, <PdfRef page={8} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS a7.9 no adjustment to assets and liabilities is required as the event does not affect the determination and the condition of the amounts stated in the financial statements for the year ended 31st March, 20X1. The disclosure should be made in the report of the approving authority of those events occurring after the balance sheet date that represent material changes and commitments affecting the financial position of the enterprise, the investment of ` 100 lakhs in April, 20X1 for the acquisition of another company should be disclosed in the report of the Approving Authority to enable users of financial statements to make proper evaluations and decisions. Illustration 5 A Limited Company closed its accounting year on 30.6.20X1 and the accounts for that period were considered and approved by the board of directors on 20th August, 20X1. The company was engaged in laying pipeline for an oil company deep beneath the earth. While doing the boring work on 1.9.20X1 it had met a rocky surface for which it was estimated that there would be an extra cost to the tune of ` 80 lakhs. You are required to state with reasons, how the event would be dealt with in the financial statements for the year ended 30.6.20X1. Solution <strong>AS 4</strong> (Revised) on Contingencies and Events Occurring after the Balance Sheet Date defines &apos;events occurring after the balance sheet date&apos; as &apos;significant events, both favourable and unfavourable, that occur between the balance sheet date and the date on which financial statements are approved by the Board of Directors in the case of a company&apos;. The given case is discussed in the light of the above-mentioned definition and requirements given in <strong>AS 4</strong> (Revised). In this case the incidence, which was expected to push up cost, became evident after the date of approval of the accounts. So it is not an &apos;event occurring after the balance sheet date&apos;. Illustration 6 While preparing its final accounts for the year ended 31st March, 20X1 a company made a provision for bad debts @ 5% of its total trade receivables. In the last week of February, 20X1 a trade receivable for ` 2 lakhs had suffered heavy loss due to an earthquake; the loss was not covered by any insurance policy. In April, 20X1 the trade receivable became a bankrupt. Can the company provide for the full loss arising out of insolvency of the trade receivable in the final accounts for the year ended 31st March, 20X1? <PdfRef page={9} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Solution As per <strong>Accounting Standard</strong> 4, Assets and Liabilities should be adjusted for events occurring after the balance sheet date that provide additional evidence to assist estimation of amounts relating to conditions existing at the balance sheet date. So full provision for bad debt amounting to ` 2 lakhs should be made to cover the loss arising due to the insolvency in the Final Accounts for the year ended 31 st March, 20X1. It is because earthquake took place before the balance sheet date. Had the earthquake taken place after 31st March, 20X1, then this would have been treated as non-adjusting event and only disclosure required as per <strong>AS 4</strong> (Revised), would have been sufficient. Illustration 7 Y Ltd. has book debts and has a doubt over recoverability of some of the book debts. The amount that cannot be recovered is not quantifiable. Thus, Y Ltd. is of the opinion that provision for doubtful debts should not be created. Y Ltd. creates provision for certain other expenses on estimated basis. Whether contention of Y Ltd. is correct? Solution As per <strong>AS 4</strong>, &quot;Contingencies and Events Occurring After the Balance Sheet Date&quot; if it is likely that a contingency will result in a loss to an entity then it should create provision for that contingency on the estimated basis. Based on the above, the contention that provision for doubtful debt is not be created merely because the amount is not quantifiable is not correct. Hence Y Ltd. should make provision in the books on the basis of estimation. Reference: The students are advised to refer the full text of <strong>AS 4</strong> (Revised) “Contingencies and Events occurring after the Balance Sheet Date”.  Pursuant to <strong>AS 29</strong> ‘Provisions, Contingent Liabilities and Contingent Assets’, becoming mandatory in respect of accounting periods commencing on or after 1st April, 2004, all paragraphs of <strong>AS 4</strong> (Revised) dealing with contingencies stand withdrawn except to the extent they deal with impairment of assets not covered by any other AS. However, as per the Companies (Accounting Standards) Amendment Rules, 2016–30 March 2016, all paragraphs of this Standard that deal with contingencies are applicable only to the extent not covered by other Accounting Standards prescribed by the Central Government. For example, the impairment of financial assets such as impairment of receivables (commonly known as provision for bad and doubtful debts) is governed by this Standard . <PdfRef page={10} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS a7.11 TEST YOUR KNOWLEDGE Multiple Choice Questions 1. Cash amounting to ` 4 lakhs, stolen by the cashier in the month of March 20X1, was detected in April, 20X1. The financial statements for the year ended 31st March, 20X1 were approved by the Board of Directors on 15th May, 20X1. As per Accounting Standards, this is _____ for the financial statements year ended on 31st March, 20X1. (a) An Adjusting event. (b) Non-adjusting event. (c) Contingency. (d) Provision 2. As per Accounting Standards, events occurring after the balance sheet date are (a) Only favourable events that occur between the balance sheet date and the date when the financial statements are approved by the Board of directors. (b) Only unfavourable events that occur between the balance sheet date and the date when the financial statements are approved by the Board of directors. (c) Those significant events, both favourable and unfavourable, that occur between the balance sheet date and the date on which the financial statements are approved by the Board of directors. (d) Those significant events, both favourable and unfavourable, that occur between the balance sheet date and the date on which the financial statements are not approved by the Board of directors. <PdfRef page={11} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            3. <strong>AS 4</strong> does not apply to (a) Obligation under retirement benefit plans. (b) Commitments arising from long term lease contracts. (c) liabilities of life assurance and general insurance enterprises arising from policies issued (d) All of the above. 4. A Ltd. sold its building for ` 50 lakhs to B Ltd. and has also given the possession to B Ltd. The book value of the building is ` 30 lakhs. As on 31st March, 20X1, the documentation and legal formalities are pending. For the financial year ended 31st March, 20X1 (a) The company should record the sale. (b) The company should recognise the profit of ` 20 lakhs in its profit and loss account. (c) Both (a) and (b). (d) The company should disclose the profit of ` 20 lakhs in notes to accounts. Scenario based Questions 5. A Ltd. has sold its building for ` 50 lakhs to B Ltd. and has also given the possession to B Ltd. The book value of the building is ` 30 lakhs. As on 31st March, 20X1, the documentation and legal formalities are pending. The company has not recorded the sale and has shown the amount received as advance. Do you agree with this treatment? 6. During the year 20X1-20X2, Raj Ltd. was sued by a competitor for ` 15 lakhs for infringement of a trademark. Based on the advice of the company&apos;s legal counsel, Raj Ltd. provided for a sum of ` 10 lakhs in its financial statements for the year ended 31st March, 20X2. On 18th May, 20X2, the Court decided in favour of the party alleging infringement of the trademark and ordered Raj Ltd. to pay the aggrieved party a sum of ` 14 lakhs. The financial statements were prepared by the company&apos;s management on 30th April, 20X2, and approved by the board on 30th May, 20X2. <PdfRef page={12} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS a7.13 ANSWERS/SOLUTION Answer to the Multiple Choice Questions 1. (a) 2. (c) 3. (d) 4. (c) Answer to the Scenario based Questions 5. The economic reality and substance of the transaction is that the rights and beneficial interest in the property has been transferred although legal title has not been transferred. A Ltd. should record the sale and recognise the gain of ` 20 lakhs in its profit and loss account. The building should be derecognized in the financial statements. 6. As per <strong>AS 4</strong> (Revised), adjustments to assets and liabilities are required for events occurring after the balance sheet date that provide additional information materially affecting the determination of the amounts relating to conditions existing at the balance sheet date. In the given case, since Raj Ltd. was sued by a competitor for infringement of a trademark during the year 20X1-X2 for which the provision was also made by it, the decision of the Court on 18th May, 20X2, for payment of the penalty will constitute as an adjusting event because it is an event occurred before approval of the financial statements. Therefore, Raj Ltd. should adjust the provision upward by ` 4 lakhs to reflect the award decreed by the Court to be paid by them to its competitor. Had the judgment of the Court been delivered on 1st June, 20X2, it would be considered as an event occurring after the approval of the financial statements which is not covered by <strong>AS 4</strong> (Revised). In that case, no adjustment in the financial statements of 20X1-X2 would have been required. <PdfRef page={13} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 4**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 4, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
