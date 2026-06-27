'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, ChevronDown } from 'lucide-react'

export const as25Sections = [
  { id: 'as-25-intro-sec', title: '1. Introduction & Objectives' },
  { id: 'as-25-introduction', title: '7.1 INTRODUCTION' },
  { id: 'as-25-definitions-of-the-terms-used-under', title: '7.2 DEFINITIONS OF THE TERMS USED UNDER' },
  { id: 'as-25-content-of-an-interim-financial', title: '7.3 CONTENT OF AN INTERIM FINANCIAL' },
  { id: 'as-25-form-and-content-of-interim', title: '7.4 FORM AND CONTENT OF INTERIM' },
  { id: 'as-25-selected-explanatory-notes', title: '7.5 SELECTED EXPLANATORY NOTES' },
  { id: 'as-25-periods-for-which-interim-financial', title: '7.6 PERIODS FOR WHICH INTERIM FINANCIAL' },
  { id: 'as-25-materiality', title: '7.7 MATERIALITY' },
  { id: 'as-25-disclosure-in-annual-financial', title: '7.8 DISCLOSURE IN ANNUAL FINANCIAL' },
  { id: 'as-25-accounting-policies', title: '7.9 ACCOUNTING POLICIES' },
  { id: 'as-25-revenue-received-seasonally-or', title: '7.10 REVENUE RECEIVED SEASONALLY OR' },
  { id: 'as-25-cost-incurred-unevenly-during-the', title: '7.11 COST INCURRED UNEVENLY DURING THE' },
  { id: 'as-25-use-of-estimates', title: '7.12 USE OF ESTIMATES' },
  { id: 'as-25-restatement-of-previously-reported', title: '7.13 RESTATEMENT OF PREVIOUSLY REPORTED' },
  { id: 'as-25-transitional-provision', title: '7.14 TRANSITIONAL PROVISION' },
  { id: 'as-25-applicability-of-as-25-to-interim', title: '7.15 APPLICABILITY OF AS 25 TO INTERIM' }
];

interface AS25StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function AS25StandardTabContent({ navigateToPdfPage }: AS25StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as-25-intro-sec');
  const tocScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(id);
    const stickyToc = document.getElementById('as-25-standard-sticky-toc');
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

      as25Sections.forEach((sec) => {
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
    const cleanTitle = title.replace(/^\s*\d+(?:\.\d+)*\.?\s*/, '');
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
      <div id="as-25-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as25Sections.map(sec => (
              <button key={sec.id} data-toc-id={sec.id} onClick={() => handleSectionClick(sec.id)}
                className={'text-[9.5px] font-bold px-2 py-0.5 rounded border transition-all whitespace-nowrap cursor-pointer ' + (activeSection === sec.id ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#1E2640] dark:hover:bg-slate-800 border-slate-200 dark:border-gray-700 text-slate-600 dark:text-gray-300')}>
                {sec.title.split('. ').slice(1).join('. ') || sec.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto w-[98%] max-w-[1720px] bg-white dark:bg-[#111726] shadow-sm border border-slate-200/70 dark:border-slate-800 rounded-xl px-4 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-8 relative my-4">
        {/* Section: 1. Introduction & Objectives */}
        <section id="as-25-intro-sec" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-25-intro-sec" num="1" title="1. Introduction &amp; Objectives" />
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 1 --- PRESENTATION &amp; DISCLOSURES BASED UNIT 7: ACCOUNTING STANDARD 25 INTERIM FINANCIAL REPORTING After studying this unit, you will be able to comprehend the following: • Objective and scope of AS 25 • Content of an Interim Financial Report • Minimum Components of an Interim Financial Report • Form and Content of Interim Financial Statements • Selected Explanatory Notes • Periods for which Interim Financial Statements are required to be presented • Disclosure in Annual Financial Statements • Recognition and Measurement principles as per the Standard.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 25**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 25, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 7.1 INTRODUCTION */}
        <section id="as-25-introduction" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-25-introduction" num="7.1" title="INTRODUCTION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            <strong>AS 25</strong> does not mandate which enterprises should be required to present interim financial reports, how frequently, or how soon after the end of an interim period. If an enterprise is required or elects to prepare and present an interim financial report, it should comply with this Standard. The standard prescribes the minimum contents of an interim financial report and requires that an enterprise which elects to prepare and present an interim financial report, should comply with this standard. It also lays down the principles for recognition and measurement in a complete or condensed financial statements for an interim period. Timely and reliable interim financial reporting improves the ability of investors, creditors, lenders and others to understand an enterprise’s capacity to generate earnings and cash flows, its financial condition and liquidity. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 2 --- A statute governing an enterprise or a regulator may also require an enterprise to prepare and present certain information at an interim date which may be different in form and/or content as required by this Standard. In such a case, the recognition and measurement principles as laid down in this Standard are applied in respect of such information, unless otherwise specified in the statute or by the regulator.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 25**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 25, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 7.2 DEFINITIONS OF THE TERMS USED UNDER */}
        <section id="as-25-definitions-of-the-terms-used-under" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-25-definitions-of-the-terms-used-under" num="7.2" title="DEFINITIONS OF THE TERMS USED UNDER" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            THE ACCOUNTING STANDARD Interim period is a financial reporting period shorter than a full financial year. Interim financial report means a financial report containing either a complete set of financial statements or a set of condensed financial statements for an interim period. During the first year of operations of an enterprise, its annual financial reporting period may be shorter than a financial year. In such a case, that shorter period is not considered as an interim period. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 25**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 25, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 7.3 CONTENT OF AN INTERIM FINANCIAL */}
        <section id="as-25-content-of-an-interim-financial" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-25-content-of-an-interim-financial" num="7.3" title="CONTENT OF AN INTERIM FINANCIAL" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            REPORT A complete set of financial statements normally includes Balance sheet, Statement of Profit &amp; Loss, Cash flow statement and Notes including those relating to accounting policies and other statements and explanatory material that are an integral part of the financial statements. The benefit of timeliness of presentation may be partially offset by a reduction in detail in the information provided. Therefore, this Standard requires preparation and presentation of an interim financial report containing, as a minimum, a set of condensed financial statements. Accordingly, it focuses on new activities, events, and circumstances and does not duplicate information previously reported. <strong>AS 25</strong> does not prohibit or discourage an enterprise from presenting a complete set of financial statements in its interim financial report, rather than a set of condensed financial statements. The recognition and measurement principles set out in this Standard apply also to complete financial statements for an interim period, and <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 3 --- PRESENTATION &amp; DISCLOSURES BASED such statements would include all disclosures required by this Standard as well as those required by other Accounting Standards. Minimum components of an Interim Financial Report includes condensed Financial Statement. Note: Interim financial report may contain a complete set of financial statements or condensed financial statements. If the entity opted for a complete set of financial statements, it will be like annual set of financial statements. The condensed financial statements would include the limited information as required by this standard.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 25**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 25, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 7.4 FORM AND CONTENT OF INTERIM */}
        <section id="as-25-form-and-content-of-interim" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-25-form-and-content-of-interim" num="7.4" title="FORM AND CONTENT OF INTERIM" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS If an enterprise prepares and presents a complete set of financial statements in its interim financial report, the form and content of those statements should conform to the requirements as applicable to annual complete set of financial statements. If an enterprise prepares and presents a set of condensed financial statements in its interim financial report, those condensed statements should include, at a minimum, each of the headings and sub-headings that were included in its most recent annual financial statements and the selected explanatory notes as required by this Statement. Additional line items or notes should be included if their omission would make the condensed interim financial statements misleading. If an enterprise presents basic and diluted earnings per share in its annual financial statements in accordance with <strong>AS 20</strong> then it has to present basic and diluted earnings per share as per <strong>AS 20</strong> on the face of Statement of Profit and Loss complete or condenses for an interim period also. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 25**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 25, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 7.5 SELECTED EXPLANATORY NOTES */}
        <section id="as-25-selected-explanatory-notes" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-25-selected-explanatory-notes" num="7.5" title="SELECTED EXPLANATORY NOTES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            An enterprise should include the following information, as a minimum, in the notes to its interim financial statements, if material and if not disclosed elsewhere in the interim financial report: <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 4 --- (a) A statement that the same accounting policies are followed in the interim financial statements as those followed in the most recent annual financial statements or, if those policies have been changed, a description of the nature and effect of the change. (b) Explanatory comments about the seasonality of interim operations. (c) The nature and amount of items affecting assets, liabilities, equity, net income, or cash flows that is unusual because of their nature, size, or incidence as per AS 5. (d) The nature and amount of changes in estimates of amounts reported in prior interim periods of the current financial year or changes in estimates of amounts reported in prior financial years, if those changes have a material effect in the current interim period. (e) Issuances, buy-backs, repayments and restructuring of debt, equity and potential equity shares. (f) Dividends, aggregate or per share (in absolute or percentage terms), separately for equity shares and other shares. (g) Segment revenue, segment capital employed (segment assets minus segment liabilities) and segment result for business segments or geographical segments, whichever is the enterprise&apos;s primary basis of segment reporting (disclosure of segment information is required in an enterprise&apos;s interim financial report only if the enterprise is required, in terms of AS 17, Segment Reporting, to disclose segment information in its annual financial statements). (h) The effect of changes in the composition of the enterprise during the interim period, such as amalgamations, acquisition or disposal of subsidiaries and long-term investments, restructurings, and discontinuing operations and (i) Material changes in contingent liabilities since the last annual balance sheet date. The above information should normally be reported on a financial year-to-date basis. However, the enterprise should also disclose any events or transactions that are material to an understanding of the current interim period.</li>
            <li>-- PAGE 5 --- PRESENTATION &amp; DISCLOSURES BASED</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 25**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 25, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 7.6 PERIODS FOR WHICH INTERIM FINANCIAL */}
        <section id="as-25-periods-for-which-interim-financial" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-25-periods-for-which-interim-financial" num="7.6" title="PERIODS FOR WHICH INTERIM FINANCIAL" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            STATEMENTS ARE REQUIRED TO BE PRESENTED Interim reports should include interim financial statements (whether condensed or complete) for the periods listed in the following table: Statement Current period Comparative period Balance sheet End of current interim period End of immediately preceding financial year Statement of profit and loss Current interim period and cumulatively for the year-to-date Comparable interim period and year-to-date of immediately preceding financial year Cash flow statement Cumulatively for the current financial year-to-date Comparable year-to-date of immediately preceding financial year <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 25**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 25, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 7.7 MATERIALITY */}
        <section id="as-25-materiality" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-25-materiality" num="7.7" title="MATERIALITY" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            In deciding how to recognise, measure, classify, or disclose an item for interim financial reporting purposes, materiality should be assessed in relation to the interim period financial data. In making assessments of materiality, it should be recognised that interim measurements may rely on estimates to a greater extent than measurements of annual financial data. For reasons of understandability of the interim figures, materiality for making recognition and disclosure decision is assessed in relation to the interim period financial data. Thus, for example, unusual or extraordinary items, changes in accounting policies or estimates, and prior period items are recognised and disclosed based on materiality in relation to interim period data. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 6 --- The Preface to the Statements of Accounting Standards states that “The Accounting Standards are intended to apply only to items which are material”. The Framework for the Preparation and Presentation of Financial Statements, issued by the Institute of Chartered Accountants of India, states that “information is material if its misstatement (i.e., omission or erroneous statement) could influence the economic decisions of users taken on the basis of the financial information”. Illustration 1 Sincere Corporation is dealing in seasonal product. Sales pattern of the product quarter-wise is as follows: 1st quarter 30th June 10% 2nd quarter 30th September 10% 3rd quarter 31st December 60% 4th quarter 31st March 20% Information regarding the 1st quarter ended on 30th June, 20X1 is as follows: Sales 80 crores Salary and other expenses 60 crores Advertisement expenses (routine) 4 crores Administrative and selling expenses 8 crores While preparing interim financial report for first quarter Sincere Corporation wants to defer ` 10 crores expenditure to third quarter on the argument that third quarter is having more sales, therefore, the third quarter should be debited by more expenditure. Considering the seasonal nature of business and the expenditures are uniform throughout all quarters, calculate the result of the first quarter as per AS 25. Also give a comment on the company’s view. Solution Particulars (` In crores) Result of first quarter ended 30th June, 20X1 Turnover 80 Other Income Nil Total (a) 80</li>
            <li>-- PAGE 7 --- PRESENTATION &amp; DISCLOSURES BASED Less: Changes in inventories Nil Salaries and other cost 60 Administrative and selling Expenses (4+8) 12 Total (b) 72 Profit (a)-(b) 8 According to AS 25, the Income and Expense should be recognized when they are earned and incurred respectively. Therefore, seasonal incomes will be recognized when they occur. Thus, the company’s view is not as per AS 25. Illustration 2 The accounting year of X Ltd. ends on 30th September, 20X1 and it makes its reports quarterly. However for the purpose of tax, year ends on 31st March every year. For the Accounting year from 1-10-20X0 to 30-9-20X1, the quarterly income is as under: 1st quarter ending on 31st December, 20X0 ` 200 crores 2nd quarter ending on 31st March, 20X1 ` 200 crores 3rd quarter ending on 30th June, 20X1 ` 200 crores 4th quarter ending on 30th September, 20X1 ` 200 crores Total ` 800 crores Average actual tax rate for the financial year ending on 31st March, 20X1 is 20% and for financial year ending 31st March, 20X2 is 30%. Calculate tax expense for each quarter. Solution Calculation of tax expense 1st quarter ending on 31st December, 20X0 200 20% ` 40 lakhs 2nd quarter ending on 31st March, 20X1 200 20% ` 40 lakhs 3rd quarter ending on 30th June, 20X1 200 30% ` 60 lakhs 4th quarter ending on 30th September, 20X1 200 30% ` 60 lakhs</li>
            <li>-- PAGE 8 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 25**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 25, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 7.8 DISCLOSURE IN ANNUAL FINANCIAL */}
        <section id="as-25-disclosure-in-annual-financial" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-25-disclosure-in-annual-financial" num="7.8" title="DISCLOSURE IN ANNUAL FINANCIAL" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            STATEMENTS <strong>AS 5</strong>, requires disclosure, in financial statements, of the nature and (if practicable) the amount of a change in an accounting estimate which has a material effect in the current period, or which is expected to have a material effect in subsequent periods. Similarly, if an estimate of an amount reported in an interim period is changed significantly during the final interim period of the financial year but a separate financial report is not prepared and presented for that final interim period, the nature and amount of that change in estimate should be disclosed in a note to the annual financial statements for that financial year. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 25**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 25, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 7.9 ACCOUNTING POLICIES */}
        <section id="as-25-accounting-policies" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-25-accounting-policies" num="7.9" title="ACCOUNTING POLICIES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Same Accounting Policies as annual financial statements An enterprise should apply the same accounting policies in its interim financial statements as are applied in its annual financial statements, except for accounting policy changes made after the date of the most recent annual financial statements that are to be reflected in the next annual financial statements. However, the frequency of an enterprise&apos;s reporting (annual, half-yearly, or quarterly) should not affect the measurement of its annual results. To achieve that objective, measurements for interim reporting purposes should be made on a year-to-date basis. To illustrate: (a) The principles for recognising and measuring losses from inventory write- downs, restructurings, or impairments in an interim period are the same as those that an enterprise would follow if it prepared only annual financial statements. However, if such items are recognised and measured in one interim period and the estimate changes in a subsequent interim period of that financial year, the original estimate is changed in the subsequent interim period either by accrual of an additional amount of loss or by reversal of the previously recognised amount; <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 9 --- PRESENTATION &amp; DISCLOSURES BASED (b) A cost that does not meet the definition of an asset at the end of an interim period is not deferred on the balance sheet date either to await future information as to whether it has met the definition of an asset or to smooth earnings over interim periods within a financial year; and (c) Income tax expense is recognised in each interim period based on the best estimate of the weighted average annual effective income tax rate expected for the full financial year. Amounts accrued for income tax expense in one interim period may have to be adjusted in a subsequent interim period of that financial year if the estimate of the annual effective income tax rate changes. Income is recognised in the statement of profit and loss when an increase in future economic benefits related to an increase in an asset or a decrease of a liability has arisen that can be measured reliably. Expenses are recognised in the statement of profit and loss when a decrease in future economic benefits related to a decrease in an asset or an increase of a liability has arisen that can be measured reliably. The recognition of items in the balance sheet which do not meet the definition of assets or liabilities is not allowed. An enterprise that reports more frequently than half-yearly, measures income and expenses on a year-to-date basis for each interim period using information available when each set of financial statements is being prepared. Amounts of income and expenses reported in the current interim period will reflect any changes in estimates of amounts reported in prior interim periods of the financial year. The amounts reported in prior interim periods are not retrospectively adjusted. However, the nature and amount of any significant changes in estimates be disclosed. Changes in Accounting Policies Preparers of interim reports in compliance with AS 25 are required to consider any changes in accounting policies that will be applied for the next annual financial statements, and to implement the changes for interim reporting purposes. If there has been any change in accounting policy since the most recent annual financial statements, the interim report is required to include a description of the nature and effect of the change.</li>
            <li>-- PAGE 10 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 25**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 25, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 7.10 REVENUE RECEIVED SEASONALLY OR */}
        <section id="as-25-revenue-received-seasonally-or" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-25-revenue-received-seasonally-or" num="7.10" title="REVENUE RECEIVED SEASONALLY OR" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            OCCASIONALLY Revenues that are received seasonally or occasionally within a financial year should not be anticipated or deferred as of an interim date if anticipation or deferral would not be appropriate at the end of the enterprise&apos;s financial year. For example: Dividend revenue, royalties, and government grants. Additionally, some enterprises consistently earn more revenues in certain interim periods of a financial year than in other interim periods, for example, seasonal revenues of retailers. Such revenues are recognised when they occur. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 25**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 25, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 7.11 COST INCURRED UNEVENLY DURING THE */}
        <section id="as-25-cost-incurred-unevenly-during-the" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-25-cost-incurred-unevenly-during-the" num="7.11" title="COST INCURRED UNEVENLY DURING THE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL YEAR Costs that are incurred unevenly during an enterprise&apos;s financial year should be anticipated or deferred for interim reporting purposes if, and only if, it is also appropriate to anticipate or defer that type of cost at the end of the financial year. A cost that does not meet the definition of an asset at the end of an interim period is not deferred in the interim balance sheet either to await future information as to whether it has met the definition of an asset, or to smooth earnings over interim periods within a financial year. Thus, when preparing interim financial statements, the enterprise’s usual recognition and measurement practices are followed. The only costs that are capitalized are those incurred after the specific point in time at which the criteria for recognition of the particular class of asset are met. Deferral of costs as assets in an interim balance sheet in the hope that the criteria will be met before the year-end is prohibited. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 25**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 25, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 7.12 USE OF ESTIMATES */}
        <section id="as-25-use-of-estimates" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-25-use-of-estimates" num="7.12" title="USE OF ESTIMATES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The measurement procedures to be followed in an interim financial report should be designed to ensure that the resulting information is reliable and that all material financial information that is relevant to an understanding of the financial position or performance of the enterprise is appropriately disclosed. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 11 --- PRESENTATION &amp; DISCLOSURES BASED</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 25**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 25, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 7.13 RESTATEMENT OF PREVIOUSLY REPORTED */}
        <section id="as-25-restatement-of-previously-reported" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-25-restatement-of-previously-reported" num="7.13" title="RESTATEMENT OF PREVIOUSLY REPORTED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            INTERIM PERIODS One objective of the preceding principle is to ensure that a single accounting policy is applied to a particular class of transactions throughout an entire financial year. The effect of the principle requires that within the current financial year any change in accounting policy be applied retrospectively to the beginning of the financial year. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 25**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 25, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 7.14 TRANSITIONAL PROVISION */}
        <section id="as-25-transitional-provision" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-25-transitional-provision" num="7.14" title="TRANSITIONAL PROVISION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            On the first occasion that an interim financial report is presented in accordance with this Statement, the following need not be presented in respect of all the interim periods of the current financial year: (a) Comparative statements of profit and loss for the comparable interim periods (current and year-to-date) of the immediately preceding financial year; and (b) Comparative cash flow statement for the comparable year-to-date period of the immediately preceding financial year. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 25**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 25, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 7.15 APPLICABILITY OF AS 25 TO INTERIM */}
        <section id="as-25-applicability-of-as-25-to-interim" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-25-applicability-of-as-25-to-interim" num="7.15" title="APPLICABILITY OF AS 25 TO INTERIM" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL RESULTS The presentation and disclosure requirements contained in <strong>AS 25</strong> should be applied only if an enterprise prepares and presents an &apos;interim financial report&apos; as defined in <strong>AS 25</strong>. Accordingly, presentation and disclosure requirements contained in <strong>AS 25</strong> are not required to be applied in respect of interim financial results (which do not meet the definition of &apos;interim financial report&apos; as per <strong>AS 25</strong>) presented by an enterprise. For example, quarterly financial results presented under Clause 41 of the Listing Agreement entered into between Stock Exchanges and the listed enterprises do not meet the definition of &apos;interim financial report&apos; as per <strong>AS 25</strong>. However, the recognition and measurement principles laid down in <strong>AS 25</strong> should be applied for recognition and measurement of items contained in such interim financial results. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 12 --- Illustration 3 Accountants of Poornima Ltd. showed a net profit of ` 7,20,000 for the third quarter of 20X1 after incorporating the following: (i) Bad debts of ` 40,000 incurred during the quarter. 50% of the bad debts have been deferred to the next quarter. (ii) Extra ordinary loss of ` 35,000 incurred during the quarter has been fully recognized in this quarter. (iii) Additional depreciation of ` 45,000 resulting from the change in the method of charge of depreciation assuming that ` 45,000 is the charge for the 3rd quarter only. Ascertain the correct quarterly income. Solution In the above case, the quarterly income has not been correctly stated. As per AS 25 “Interim Financial Reporting”, the quarterly income should be adjusted and restated as follows: Bad debts of ` 40,000 have been incurred during current quarter. Out of this, the company has deferred 50% (i.e.) ` 20,000 to the next quarter. Therefore, ` 20,000 should be deducted from ` 7,20,000. The treatment of extra-ordinary loss of ` 35,000 being recognized in the same quarter is correct. Recognising additional depreciation of ` 45,000 in the same quarter is in tune with AS 25. Hence no adjustments are required for these two items. Poornima Ltd should report quarterly income as ` 7,00,000 (` 7,20,000 – ` 20,000). Illustration 4 Intelligent Corporation (I −Corp.) is dealing in seasonal products. The quarterly sales pattern of the product is given below: Quarter I II III IV Ending 30th June 30th September 31st December 31st March 15% 15% 50% 25% For the First quarter ending 30th June, 20X1, I −Corp. gives you the following information:</li>
            <li>-- PAGE 13 --- PRESENTATION &amp; DISCLOSURES BASED ` crores Sales 50 Salary and other expenses 30 Advertisement expenses (routine) 02 Administrative and selling expenses 08 While preparing interim financial report for the first quarter, ‘I −Corp.’ wants to defer ` 21 crores expenditure to third quarter on the argument that third quarter is having more sales, therefore, third quarter should be debited by higher expenditure, considering the seasonal nature of business and that the expenditures are uniform throughout all quarters. Calculate the result of first quarter as per AS 25 and comment on the company’s view. Solution Result of the first quarter ended 30th June, 20X1 (` in crores) Turnover 50 Add: Other Income Nil Total 50 Less: Change in inventories Nil Salaries and other cost 30 Administrative and selling expenses (8 + 2) 10 40 Profit 10 As per AS 25 on Interim Financial Reporting, the income and expense should be recognized when they are earned and incurred respectively. As per AS 25, the costs should be anticipated or deferred only when (i) it is appropriate to anticipate that type of cost at the end of the financial year, and (ii) costs are incurred unevenly during the financial year of an enterprise. Therefore, the argument given by I-Corp relating to deferment of ` 21 crores is not tenable as expenditures are uniform throughout all quarters.</li>
            <li>-- PAGE 14 --- TEST YOUR KNOWLEDGE Multiple Choice Questions 1. AS 25 mandates the following in relation to interim financial reports. (a) which entities should publish interim financial reports. (b) how frequently it should publish interim financial reports. (c) how soon it should publish after the end of interim period. (d) none of the above. 2. The standard defines Interim financial Report as a financial report for an interim period that contains a set of ………. financial statements. (a) Complete (b) Condensed (c) Financial statement similar to annual (d) Either complete or condensed 3. ABC Limited has reported ` 85,000 as per tax profit in first quarter and expects a loss of ` 25,000 each in subsequent quarters. It has corporate tax rate slab of 20% on the first ` 20,000 earnings and 40% on all additional earnings. Calculate tax expenses that should report in first quarter interim financial report. (a) ` 17,000 (b) ` 30,000 (c) ` 2,000 (d) AS 25 does not mandate to report tax expenses 4. An entity prepares quarterly interim financial reports in accordance with AS 25. The entity is engaged in sale of mobile phones and normally 5% of customers claim on their warranty. The provision in the first quarter was calculated as 5% of sales to date, which was `10 million. However, in the second quarter, a fault was found and warranty claims were expected to be 10% for the whole of the year. Sales in</li>
            <li>-- PAGE 15 --- PRESENTATION &amp; DISCLOSURES BASED the second quarter were ` 15 million. What would be the provision charged in the second quarter’s interim financial statements? (a) ` 1 million (b) ` 2 million (c) ` 1.25 million (d) ` 1.5 million Theoretical Questions 5. What are the periods for which Interim financial Statements are required to be presented? You are required to answer your question in light of preparation of financial statements for the period ended and as at 31st December, 20X1. The Financial Year is FY 20X1-X2. 6. Whether quarterly financial results presented under Clause 41 of the Listing Agreement entered into between Stock Exchanges and the listed enterprises meet the definition of &apos;interim financial report&apos; as per AS 25 and the provisions of AS 25 should be applied on the same? 7. Whether the impairment loss recognized on property, plant and equipment in first quarter of the financial year can be reversed in the second quarter in that financial year? Scenario based Question 8. In view of the provisions of Accounting Standard 25 on Interim Financial Reporting, on what basis will you calculate, for an interim period, the provision in respect of defined benefit schemes like pension, gratuity etc. for the employees? 9. On 30th June, 20X1, Asmitha Ltd. incurred ` 2,00,000, net loss from disposal of a business segment. Also, on 31st July, 20X1, the company paid ` 60,000 for property taxes assessed for the calendar year 20X1. How the above transactions should be included in determination of net income of Asmitha Ltd. for the six months interim period ended on 30th September, 20X1. 10. An enterprise reports quarterly, estimates an annual income of ` 10 lakhs. Assume tax rates on 1st ` 5,00,000 at 30% and on the balance income at 40%.</li>
            <li>-- PAGE 16 --- The estimated quarterly income are ` 75,000, ` 2,50,000, ` 3,75,000 and ` 3,00,000. Calculate the tax expense to be recognized in each quarter. 11. Antarbarti Limited reported a Profit Before Tax (PBT) of ` 4 lakhs for the third quarter ending 30-09-20X1. On enquiry you observe the following. Give the treatment required under AS 25: (i) Dividend income of ` 4 lakhs received during the quarter has been recognized to the extent of ` 1 lakh only. (ii) 80% of sales promotion expenses ` 15 lakhs incurred in the third quarter has been deferred to the fourth quarter as the sales in the last quarter is high. (iii) In the third quarter, the company changed depreciation method from WDV to SLM, which resulted in excess depreciation of ` 12 lakhs. The entire amount has been debited in the third quarter, though the share of the third quarter is only ` 3 lakhs. (iv) ` 2 lakhs extra-ordinary gain received in third quarter was allocated equally to the third and fourth quarter. (v) Cumulative loss resulting from change in method of inventory valuation was recognized in the third quarter of ` 3 lakhs. Out of this loss ` 1 lakh relates to previous quarters. (vi) Sale of investment in the first quarter resulted in a gain of ` 20 lakhs. The company had apportioned this equally to the four quarters. Prepare the adjusted profit before tax for the third quarter. ANSWERS/HINTS Answers to the Multiple Choice Questions 1. (d) 2. (d) 3. (a) 4. (b)</li>
            <li>-- PAGE 17 --- PRESENTATION &amp; DISCLOSURES BASED Answers to the Theoretical Questions 5. As per Accounting Standard 25, Interim reports should include interim financial statements (condensed or complete) for periods as given below. Statement Current period Comparative period Balance sheet End of current interim period End of immediately preceding financial year Statement of profit and loss Current interim period and cumulatively for the year-to-date Comparable interim period and year-to-date of immediately preceding financial year Cash flow statement Cumulatively for the current financial year- to-date Comparable year-to-date of immediately preceding financial year In light of the above, following periods needs to be covered in interim financial statements for the period ended and as at 31st December, 20X1: Balance Sheet as of the end of the current interim period and a comparative balance sheet as of the end of the immediately preceding financial year (As at 31 December 20X1 and 31 March 20X1). Statements of Profit and Loss for the current interim period and cumulatively for the current financial year to date, with comparative statements of profit and loss for the comparable interim periods (current and year-to-date) of the immediately preceding financial year. (for 3 months and 9 months i.e., year to date ended 31 December 20X1 and same for 31 December 20X0 being comparative period). Cash Flow Statement cumulatively for the current financial year to date, with a comparative statement for the comparable year-to-date period of the immediately preceding financial year. (year to date i.e., 1 April 20X1 to 31 December 20X1 and 1 April 20X0 to 31 December 20X0).</li>
            <li>-- PAGE 18 --- 6. The presentation and disclosure requirements contained in AS 25 should be applied only if an enterprise prepares and presents an &apos;interim financial report&apos; as defined in AS 25. Accordingly, presentation and disclosure requirements contained in AS 25 are not required to be applied in respect of interim financial results (which do not meet the definition of &apos;interim financial report&apos; as per AS 25) presented by an enterprise. The quarterly financial results presented under Clause 41 of the Listing Agreement do not meet the definition of &apos;interim financial report&apos; as per AS 25. However, the recognition and measurement principles laid down in AS 25 should be applied for recognition and measurement of items contained in such interim financial results. 7. As per AS 25, the principles for recognising and measuring losses from inventory write-downs, restructurings, or impairments in an interim period are the same as those that an enterprise would follow if it prepared only annual financial statements. However, if such items are recognised and measured in one interim period and the estimate changes in a subsequent interim period of that financial year, the original estimate is changed in the subsequent interim period either by accrual of an additional amount of loss or by reversal of the previously recognised amount. In light of the same, the impairment loss recognized in one quarter can be reversed in the another quarter of the financial year, if favourable indicator exists as per AS 28 and the recoverable amount increased in comparison to earlier period. Answers to the Scenario based Question 8. Accounting Standard 25 suggests that provision in respect of defined benefit schemes like pension and gratuity for an interim period should be calculated based on the year-to-date basis by using the actuarially determined rates at the end of the prior financial year, adjusted for significant market fluctuations since that time and for significant curtailments, settlements or other significant one-time events. 9. According to Para 10 of AS 25 “Interim Financial Reporting”, if an enterprise prepares and presents a complete set of financial statements in its interim financial report, the form and content of those statements should conform to the requirements as applicable to annual complete set of financial</li>
            <li>-- PAGE 19 --- PRESENTATION &amp; DISCLOSURES BASED statements. As at 30th September, 20X1, Asmitha Ltd would report the entire amount of ` 2,00,000 as loss on the disposal of its business segment since the loss was incurred during interim period. A cost charged as an expense in an annual period should be allocated to interim periods on accrual basis. Since ` 60,000 Property tax payment relates to entire calendar year 20X1, ` 30,000 would be reported as an expense for six months ended on 30th September, 20X1 while out of the remaining ` 30,000, ` 15,000 for January, 20X1 to March, 20X1 should be shown as payment of the outstanding amount of previous year and another ` 15,000 related to quarter October, 20X1 to December, 20X1 would be reported as prepaid expenses. 10. As per para 29 of AS 25 ‘Interim Financial Reporting’, income tax expense is recognised in each interim period based on the best estimate of the weighted average annual income tax rate expected for the full financial year. ` Estimated Annual Income (A) 10,00,000 Tax expense: 30% on ` 5,00,000 1,50,000 40% on remaining ` 5,00,000 2,00,000 (B) 3,50,000 Weighted average annual income tax rate =A B =3,50,000 10,00,000 = 35% Tax expense to be recognized in each of the quarterly reports ` Quarter I - ` 75,000 x 35% 26,250 Quarter II - ` 2,50,000 x 35% 87,500 Quarter III - ` 3,75,000 x 35% 1,31,250 Quarter IV - ` 3,00,000 x 35% 1,05,000 ` 10,00,000 3,50,000 11. As per para 36 of AS 25 “Interim Financial Reporting”, seasonal or occasional revenue and cost within a financial year should not be deferred as of interim date until it is appropriate to defer at the end of the enterprise’s financial year. Therefore, dividend income, extra-ordinary gain, and gain on sale of</li>
            <li>-- PAGE 20 --- investment received during 3rd quarter should be recognised in the 3rd quarter only. Similarly, sales promotion expenses incurred in the 3rd quarter should also be charged in the 3rd quarter only. Further, as per AS 10, Property, Plant and Equipment, if there is change in the depreciation method, such a change should be accounted for as a change in accounting estimate in accordance with AS 5, Net Profit or Loss for the Period, Prior Period Items and Changes in Accounting Policies, and applied prospectively. Therefore, no adjustment would be required due to change in the method of depreciation. Accordingly, the adjusted profit before tax for the 3rd quarter will be as follows: Statement showing Adjusted Profit Before Tax for the third quarter (` in lakhs) Profit before tax (as reported) 4 Add: Dividend income ` (4-1) lakhs 3 Excess depreciation charged in the 3rd quarter, due to change in the method - Extra ordinary gain ` (2-1) lakhs 1 Cumulative loss due to change in the method of inventory valuation should be applied retrospectively ` (3-2) lakhs 1 9 Less: Sales promotion expenses (80% of ` 15 lakhs) (12) Gain on sale of investment (occasional gain should not be deferred) (5) Adjusted Profit before tax for the third quarter (8)</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 25**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 25, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
  );
}
