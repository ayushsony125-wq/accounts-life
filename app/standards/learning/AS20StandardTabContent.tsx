'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, ChevronDown } from 'lucide-react'

export const as20Sections = [
  { id: 'as-20-intro-sec', title: '1. Introduction & Objectives' },
  { id: 'as-20-introduction', title: '5.1 INTRODUCTION' },
  { id: 'as-20-definition-of-the-terms-used-in-as-20', title: '5.2 DEFINITION OF THE TERMS USED IN AS 20' },
  { id: 'as-20-earnings-basic', title: '5.3 EARNINGS-BASIC' },
  { id: 'as-20-per-share-basic', title: '5.4 PER SHARE- BASIC' },
  { id: 'as-20-shares-issued-in-a-scheme-of', title: '5.5 SHARES ISSUED IN A SCHEME OF' },
  { id: 'as-20-diluted-earnings-per-share', title: '5.6 DILUTED EARNINGS PER SHARE' },
  { id: 'as-20-earnings-diluted', title: '5.7 EARNINGS-DILUTED' },
  { id: 'as-20-per-share-diluted', title: '5.8 PER SHARE- DILUTED' },
  { id: 'as-20-dilutive-potential-equity-shares', title: '5.9 DILUTIVE POTENTIAL EQUITY SHARES' },
  { id: 'as-20-restatement', title: '5.10 RESTATEMENT' },
  { id: 'as-20-presentation', title: '5.11 PRESENTATION' },
  { id: 'as-20-disclosure', title: '5.12 DISCLOSURE' }
];

interface AS20StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function AS20StandardTabContent({ navigateToPdfPage }: AS20StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as-20-intro-sec');
  const tocScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(id);
    const stickyToc = document.getElementById('as-20-standard-sticky-toc');
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

      as20Sections.forEach((sec) => {
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
      <div id="as-20-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as20Sections.map(sec => (
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
        <section id="as-20-intro-sec" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-20-intro-sec" num="1" title="1. Introduction &amp; Objectives" />
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 1 --- PRESENTATION &amp; DISCLOSURES BASED v v v v 4.95 ❑ UNIT 5: ACCOUNTING STANDARD 20 EARNINGS PER SHARE After studying this unit, you will be able to comprehend the following:  Basic Earnings Per Share • Issues related to Numerator – Earnings • Issues related to Denominator – Weighted average number of shares  Diluted Earnings Per Share • Issues related to Numerator – Earnings • Issues related to Denominator – Weighted average number of shares  Dilutive Potential Equity Shares  Restatement of Earnings per share  Disclosures</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 20**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 20, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 5.1 INTRODUCTION */}
        <section id="as-20-introduction" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-20-introduction" num="5.1" title="INTRODUCTION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The objective of <strong>AS 20</strong> is to describe principles for determination (i.e. computation) and presentation (i.e. presentation in the Statement of Profit and Loss) of earnings per share which will improve comparison of performance among different enterprises for the same period and among different accounting periods for the same enterprise. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 2 --- Earnings per share (EPS) is a financial ratio indicating the amount of profit or loss for the period attributable to each equity share and AS 20 gives computational methodology for determination and presentation of basic and diluted earnings per share. This Accounting Standard is mandatory for all companies. However, disclosure of diluted earnings per share (both including and excluding extraordinary items) is not mandatory for SMCs. Such companies are however encouraged to make these disclosures. In consolidated financial statements, the information required by AS 20 should be presented on the basis of consolidated information.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 20**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 20, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 5.2 DEFINITION OF THE TERMS USED IN AS 20 */}
        <section id="as-20-definition-of-the-terms-used-in-as-20" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-20-definition-of-the-terms-used-in-as-20" num="5.2" title="DEFINITION OF THE TERMS USED IN AS 20" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            An equity share is a share other than a preference share. A preference share is a share carrying preferential rights to dividends and repayment of capital. A financial instrument is any contract that gives rise to both a financial asset of one enterprise and a financial liability or equity shares of another enterprise. A financial asset is any asset that is a. Cash; b. A contractual right to receive cash or another financial asset from another enterprise; Computation i.e. Determination Of - Basic &amp; Diluted EPS Presentation Where - In the Income Statement On the Face of the P&amp;L A/c Results in Inter firm comparision Intra Firm comparision <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 3 --- PRESENTATION &amp; DISCLOSURES BASED v v v v 4.97 c. A contractual right to exchange financial instruments with another enterprise under conditions that are potentially favourable; or d. An equity share of another enterprise. A financial liability is any liability that is a contractual obligation to deliver cash or another financial asset to another enterprise or to exchange financial instruments with another enterprise under conditions that are potentially unfavourable. A potential equity share is a financial instrument or other contract that entitles, or may entitle, its holder to equity shares. Examples of potential equity shares are: a. Debt instruments or preference shares, that are convertible into equity shares; b. Share warrants; c. Options including employee stock option plans under which employees of an enterprise are entitled to receive equity shares as part of their remuneration and other similar plans; and d. Shares which would be issued upon the satisfaction of certain conditions resulting from contractual arrangements (contingently issuable shares), such as the acquisition of a business or other assets, or shares issuable under a loan contract upon default of payment of principal or interest, if the contract so provides. Note: A partly paid-up share where the holder is not entitled to dividends is treated as a potential equity share for the purposes of computing Diluted EPS. Share warrants or options are financial instruments that give the holder the right to acquire equity shares. Fair value is the amount for which an asset could be exchanged, or a liability settled, between knowledgeable, willing parties in an arm’s length transaction.</li>
            <li>-- PAGE 4 --- Basic Earnings Per Share Basic earnings per share is calculated as Net profit (loss) attributable to equity shareholders Weighted average number of equity shares outstanding during the period</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 20**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 20, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 5.3 EARNINGS-BASIC */}
        <section id="as-20-earnings-basic" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-20-earnings-basic" num="5.3" title="EARNINGS-BASIC" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            All items of income and expense which are recognised in a period, including tax expense and extraordinary items, are included in the determination of the net profit or loss for the period unless <strong>AS 5</strong> requires or permits otherwise. The amount of preference dividends and any attributable tax thereto for the period is deducted from the net profit for the period (or added to the net loss for the period) in order to calculate the net profit or loss for the period attributable to equity shareholders. The amount of preference dividends for the period that is deducted from the net profit for the period is: a. The amount of any preference dividends on non-cumulative preference shares provided for in respect of the period; and b. The full amount of the required preference dividends for cumulative preference shares for the period, whether or not the dividends have been provided for. The amount of preference dividends for the period does not include the amount of any preference dividends for cumulative preference shares paid or declared during the current period in respect of previous periods. Note: If an enterprise has more than one class of equity shares, net profit or loss for the period is apportioned over the different classes of shares in accordance with their dividend rights. [In other words, there will be more than 1 Basic EPS for such a company; i.e. EPS for each class of equity shares] <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 5 --- PRESENTATION &amp; DISCLOSURES BASED v v v v 4.99 A quick recap of adjustments to be made to the numerator will be as under: Particulars Adjusted in the numerator of Basic EPS Tax expense (Current and Deferred Tax) Yes Exceptional items as per AS 5 Yes Extraordinary items as per AS 5 Yes Changes in Accounting estimates as per AS 5 Yes Changes in Accounting Policy as per AS 5 Yes Amount of preference dividends and any attributable tax thereto (a) Non-cumulative preference (b) Cumulative preference shares Yes – only if it has been provided in the books Yes – irrespective, whether or not the dividends have been provided for in the books</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 20**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 20, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 5.4 PER SHARE- BASIC */}
        <section id="as-20-per-share-basic" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-20-per-share-basic" num="5.4" title="PER SHARE- BASIC" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The number of shares used in the denominator for basic EPS should be the weighted average number of equity shares outstanding during the period. The weighted average number of equity shares outstanding during the period is the number of shares outstanding at the beginning of the period, adjusted by the number of equity shares bought back or issued during the period multiplied by a time-weighting factor. The time-weighting factor is: Numbers of days the shares are outstanding Number of days in the period Although the Standard defines the time-weighting factor as being determined on a daily basis, it acknowledges that a reasonable approximation of the weighted average is adequate in many circumstances. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 6 --- Illustration 1 Date Particulars Balance 1st January Balance at beginning of year 1,800 - 1,800 31st May Issue of shares for cash 600 - 2,400 1st November Buy Back of shares - 300 2,100 Calculate Weighted Number of Shares. Solution Computation of Weighted Average: (1,800 x 5/12) + (2,400 x 5/12) + (2,100 x 2/12) = 2,100 shares. The weighted average number of shares can alternatively be computed as follows: (1,800 x12/12) + (600 x 7/12) - (300 x 2/12) = 2,100 shares In most cases, shares are included in the weighted average number of shares from the date the consideration is receivable, for example: a. Equity shares issued in exchange for cash are included when cash is receivable; b. Equity shares issued as a result of the conversion of a debt instrument to equity shares are included as of the date of conversion; c. Equity shares issued in lieu of interest or principal on other financial instruments are included as of the date interest ceases to accrue; d. Equity shares issued in exchange for the settlement of a liability of the enterprise are included as of the date the settlement becomes effective; e. Equity shares issued as consideration for the acquisition of an asset other than cash are included as of the date on which the acquisition is recognised; and f. Equity shares issued for the rendering of services to the enterprise are included as the services are rendered. In these and other cases, the timing of the inclusion of equity shares is determined by the specific terms and conditions attaching to their issue. Due consideration should be given to the substance of any contract associated with the issue.</li>
            <li>-- PAGE 7 --- PRESENTATION &amp; DISCLOSURES BASED v v v v 4.101</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 20**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 20, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 5.5 SHARES ISSUED IN A SCHEME OF */}
        <section id="as-20-shares-issued-in-a-scheme-of" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-20-shares-issued-in-a-scheme-of" num="5.5" title="SHARES ISSUED IN A SCHEME OF" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            AMALGAMATION 1. Equity shares issued as part of the consideration in an amalgamation in the nature of purchase are included in the weighted average number of shares as of the date of the acquisition because the transferee incorporates the results of the operations of the transferor into its statement of profit and loss as from the date of acquisition. 2. Equity shares issued as part of the consideration in an amalgamation in the nature of merger are included in the calculation of the weighted average number of shares from the beginning of the reporting period because the financial statements of the combined enterprise for the reporting period are prepared as if the combined entity had existed from the beginning of the reporting period. Therefore, the number of equity shares used for the calculation of basic earnings per share in an amalgamation in the nature of merger is the aggregate of the weighted average number of shares of the combined enterprises, adjusted to equivalent shares of the enterprise whose shares are outstanding after the amalgamation. Partly paid equity shares are treated as a fraction of an equity share to the extent that they were entitled to participate in dividends relative to a fully paid equity share during the reporting period. Illustration 2 Date Particulars No. of Shares Face Value Paid up Value 1st January Balance at beginning of year 1,800 ` 10 ` 10 31st October Issue of Shares 600 ` 10 ` 5 Calculate Weighted Number of Shares. Solution Assuming that partly paid shares are entitled to participate in the dividend to the extent of amount paid, number of partly paid equity shares would be taken as 300 for the purpose of calculation of earnings per share. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 8 --- Computation of weighted average would be as follows: (1,800 x 12/12) + (300 x 2/12) = 1,850 shares. Where an enterprise has equity shares of different nominal values but with the same dividend rights, the number of equity shares is calculated by converting all such equity shares into equivalent number of shares of the same nominal value. Contingently Issuable Shares Equity shares which are issuable upon the satisfaction of certain conditions resulting from contractual arrangements (contingently issuable shares) are considered outstanding, and included in the computation of basic earnings per share from the date when all necessary conditions under the contract have been satisfied. Bonus Issue, Share split and Right issue Equity shares may be issued, or the number of shares outstanding may be reduced, without a corresponding change in resources. Examples include: a. A bonus issue; b. A bonus element in any other issue, for example a bonus element in a rights issue to existing shareholders; c. A share split; and d. A reverse share split (consolidation of shares). In case of a bonus issue or a share split, equity shares are issued to existing shareholders for no additional consideration. Therefore, the number of equity shares outstanding is increased without an increase in resources. The number of equity shares outstanding before the event is adjusted for the proportionate change in the number of equity shares outstanding as if the event had occurred at the beginning of the earliest period reported means along with the impact to current year adjustment, it will also impact the calculation of EPS of last year retrospectively. For example, upon a two-for-one bonus issue, the number of shares outstanding prior to the issue is multiplied by a factor of three to obtain the new total number of shares, or by a factor of two to obtain the number of additional shares.</li>
            <li>-- PAGE 9 --- PRESENTATION &amp; DISCLOSURES BASED v v v v 4.103 Illustration 3 Net profit for the year 20X1 ` 18,00,000 Net profit for the year 20X2 ` 60,00,000 No. of equity shares outstanding until 30th September 20X2 20,00,000 Bonus issue 1st October 20X2 was 2 equity shares for each equity share outstanding at 30th September, 20X2 Calculate Basic Earnings Per Share. Solution No. of Bonus Issue 20,00,000 x 2 = 40,00,000 shares Earnings per share for the year 20X2( ) ` 60,00,000 20,00,000+ 40,00,000 = ` 1.00 Adjusted earnings per share for the year 20X1( ) ` 18,00,000 20,00,000+ 40,00,000 = ` 0.30 Since the bonus issue is an issue without consideration, the issue is treated as if it had occurred prior to the beginning of the year 20X1, the earliest period reported. The issue of equity shares at the time of exercise or conversion of potential equity shares will not usually give rise to a bonus element, since the potential equity shares will usually have been issued for full value, resulting in a proportionate change in the resources available to the enterprise. In a rights issue, on the other hand, the exercise price is often less than the fair value of the shares. Therefore, a rights issue usually includes a bonus element. [Thus, it may be noted that if a company makes a right issue at fair value itself, then there will be no bonus element in the right issue]. The number of equity shares to be used in calculating basic earnings per share for all periods prior to the rights issue is the number of equity shares outstanding prior to the issue, multiplied by the following adjustment factor: Fair value per share immediately prior to the exercise of rights Theoretical ex-rights fair value per share</li>
            <li>-- PAGE 10 --- The theoretical ex-rights fair value per share is calculated by adding the aggregate fair value of the shares immediately prior to the exercise of the rights to the proceeds from the exercise of the rights, and dividing by the number of shares outstanding after the exercise of the rights. Illustration 4 Net profit for the year 20X1 ` 11,00,000 Net profit for the year 20X2 ` 15,00,000 No. of shares outstanding prior to rights issue 5,00,000 shares Rights issue price ` 15.00 Last date to exercise rights 1st March 20X2 Rights issue is one new share for each five outstanding (i.e. 1,00,000 new shares) Fair value of one equity share immediately prior to exercise of rights on 1st March 20X2 was ` 21.00. Compute Basic Earnings Per Share. Solution Fair value of shares immediately prior to exercise of rights + Total amount received from exercise Number of shares outstanding prior to exercise + Number of shares issued in the exercise ` ` ( 21.00×5,00,000 shares) + ( 15.00 ×1,00,000 Shares) 5,00,000 Shares + 1,00,000 Shares Theoretical ex-rights fair value per share = ` 20.00 Computation of adjustment factor: Fair value per share prior to exercise of rights Theoretical ex-rights value per share ` ` (21.00) (20.00) = 1.05 Computation of earnings per share: EPS for the year 20X1 as originally reported: ` 11,00,000/5,00,000 shares = 2.20 EPS for the year 20X1 restated for rights issue: ` 11,00,000/ (5,00,000 shares x 1.05) = ` 2.10</li>
            <li>-- PAGE 11 --- PRESENTATION &amp; DISCLOSURES BASED v v v v 4.105 EPS for the year 20X2 including effects of rights issue: (5,00,000 x 1.05 x 2/12) + (6,00,000 x 10/12) = 5,87,500 shares EPS = 15,00,000/5,87,500 = ` 2.55</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 20**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 20, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 5.6 DILUTED EARNINGS PER SHARE */}
        <section id="as-20-diluted-earnings-per-share" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-20-diluted-earnings-per-share" num="5.6" title="DILUTED EARNINGS PER SHARE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            In calculating diluted earnings per share, effect is given to all dilutive potential equity shares that were outstanding during the period., that is: a. The net profit for the period attributable to equity shares is: i. Increased by the amount of dividends recognised in the period in respect of the dilutive potential equity shares as adjusted for any attributable change in tax expense for the period; ii. Increased by the amount of interest recognised in the period in respect of the dilutive potential equity shares as adjusted for any attributable change in tax expense for the period; and iii. Adjusted for the after-tax amount of any other changes in expenses or income that would result from the conversion of the dilutive potential equity shares. b. The weighted average number of equity shares outstanding during the period is increased by the weighted average number of additional equity shares which would have been outstanding assuming the conversion of all dilutive potential equity shares. For the purpose of <strong>AS 20</strong>, share application money pending allotment or any advance share application money as at the balance sheet date, which is not statutorily required to be kept separately and is being utilised in the business of the enterprise, is treated in the same manner as dilutive potential equity shares for the purpose of calculation of diluted earnings per share. Note: As mentioned earlier, a partly paid-up share where the holder is not entitled to dividends is treated as a potential equity share for the purposes of computing Diluted EPS. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 12 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 20**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 20, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 5.7 EARNINGS-DILUTED */}
        <section id="as-20-earnings-diluted" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-20-earnings-diluted" num="5.7" title="EARNINGS-DILUTED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            For the purpose of calculating diluted earnings per share, the amount of net profit or loss for the period attributable to equity shareholders, should be adjusted by the following, after taking into account any attributable change in tax expense for the period: (a) any dividends on dilutive potential equity shares which have been deducted in arriving at the net profit attributable to equity shareholders; (b) interest recognised in the period for the dilutive potential equity shares; and (c) any other changes in expenses or income that would result from the conversion of the dilutive potential equity shares. After the potential equity shares are converted into equity shares, the dividends, interest and other expenses or income associated with those potential equity shares will no longer be incurred (or earned). Instead, the new equity shares will be entitled to participate in the net profit attributable to equity shareholders. Therefore, the net profit for the period attributable to equity shareholders calculated in Basic Earnings Per Share is increased by the amount of dividends, interest and other expenses that will be saved, and reduced by the amount of income that will cease to accrue, on the conversion of the dilutive potential equity shares into equity shares. The amounts of dividends, interest and other expenses or income are adjusted for any attributable taxes. Illustration 5 Net profit for the current year ` 1,00,00,000 No. of equity shares outstanding 50,00,000 Basic earnings per share ` 2.00 No. of 12% convertible debentures of ` 100 each 1,00,000 Each debenture is convertible into 10 equity shares Interest expense for the current year ` 12,00,000 Tax relating to interest expense (30%) ` 3,60,000 Compute Diluted Earnings Per Share. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 13 --- PRESENTATION &amp; DISCLOSURES BASED v v v v 4.107 Solution Adjusted net profit for the current year (1,00,00,000 + 12,00,000 – 3,60,000) = ` 1,08,40,000 No. of equity shares resulting from conversion of debentures: 10,00,000 Shares No. of equity shares used to compute diluted EPS: (50,00,000 + 10,00,000) = 60,00,000 Shares Diluted earnings per share: (1,08,40,000/60,00,000) = ` 1.81</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 20**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 20, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 5.8 PER SHARE- DILUTED */}
        <section id="as-20-per-share-diluted" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-20-per-share-diluted" num="5.8" title="PER SHARE- DILUTED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            For the purpose of calculating diluted earnings per share, the number of equity shares should be the aggregate of the weighted average number of equity shares, and the weighted average number of equity shares which would be issued on the conversion of all the dilutive potential equity shares into equity shares. Dilutive potential equity shares should be deemed to have been converted into equity shares at the beginning of the period or, if issued later, the date of the issue of the potential equity shares. The number of equity shares which would be issued on the conversion of dilutive potential equity shares is determined from the terms of the potential equity shares. The computation assumes the most advantageous conversion rate or exercise price from the standpoint of the holder of the potential equity shares. Equity shares which are issuable upon the satisfaction of certain conditions resulting from contractual arrangements (contingently issuable shares) are considered outstanding and included in the computation of both the basic earnings per share and diluted earnings per share from the date when the conditions under a contract are met. If the conditions have not been met, for computing the diluted earnings per share, contingently issuable shares are included as of the beginning of the period (or as of the date of the contingent share agreement, if later). The number of contingently issuable shares included in this case in computing the diluted earnings per share is based on the number of shares that would be issuable if the end of the reporting period was the end of the contingency period. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 14 --- Restatement is not permitted if the conditions are not met when the contingency period actually expires subsequent to the end of the reporting period. The provisions of this paragraph apply equally to potential equity shares that are issuable upon the satisfaction of certain conditions (contingently issuable potential equity shares). Potential equity shares are weighted for the period they were outstanding. Potential equity shares that were cancelled or allowed to lapse during the reporting period are included in the computation of diluted earnings per share only for the portion of the period during which they were outstanding. Potential equity shares that have been converted into equity shares during the reporting period are included in the calculation of diluted earnings per share from the beginning of the period to the date of conversion; from the date of conversion, the resulting equity shares are included in computing both basic and diluted earnings per share. A quick recap of the timing factor when these potential equity shares will be considered as a part of the denominator for weighted average computations. Particulars From which date Till which date Potential equity shares which were issued last year and not yet converted into equity shares in current year Beginning of the year End of the year Potential equity shares which were issued last year and have been converted into equity shares in current year Beginning of the year End of the year (Till date of conversion as a potential equity share and after conversion both as a part of Basic and Diluted EPS) Potential equity shares which were issued in the current year and not yet converted into equity shares in current year Date of issue End of the year Potential equity shares which were issued last year and have been cancelled or have lapsed in current year Beginning of the year Till the date of cancellation or when they lapse</li>
            <li>-- PAGE 15 --- PRESENTATION &amp; DISCLOSURES BASED v v v v 4.109 Diluted EPS in case of share options For the purpose of calculating diluted earnings per share, an enterprise should assume the exercise of dilutive options and other dilutive potential equity shares of the enterprise. The assumed proceeds from these issues should be considered to have been received from the issue of shares at fair value. The difference between the number of shares issuable and the number of shares that would have been issued at fair value should be treated as an issue of equity shares for no consideration. Options and other share purchase arrangements are dilutive when they would result in the issue of equity shares for less than fair value. The amount of the dilution is fair value less the issue price. Therefore, in order to calculate diluted earnings per share, each such arrangement is treated as consisting of: a. A contract to issue a certain number of equity shares at their average fair value during the period. The shares to be so issued are fairly priced and are assumed to be neither dilutive nor anti-dilutive. They are ignored in the computation of diluted earnings per share; and b. A contract to issue the remaining equity shares for no consideration. Such equity shares generate no proceeds and have no effect on the net profit attributable to equity shares outstanding. Therefore, such shares are dilutive and are added to the number of equity shares outstanding in the computation of diluted earnings per share. Illustration 6 Net profit for the year 20X1 ` 12,00,000 Weighted average number of equity shares outstanding during the year 20X1 5,00,000 shares Average fair value of one equity share during the year 20X1 ` 20.00 Weighted average number of shares under option during the year 20X1 1,00,000 shares Exercise price for shares under option during the year 20X1 ` 15.00 Compute Basic and Diluted Earnings Per Share.</li>
            <li>-- PAGE 16 --- Solution Computation of earnings per share Earnings Shares Earnings/Share ` ` Net profit for the year 20X1 12,00,000 Weighted average no. of shares during year 20X1 5,00,000 Number of shares under option 1,00,000 Number of shares that would have been issued at fair value (100,000 x 15.00)/20.00 (75,000) Diluted earnings per share 12,00,000 5,25,000 2.29 Note: The earnings have not been increased as the total number of shares has been increased only by the number of shares (25,000) deemed for the purpose of the computation to have been issued for no consideration.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 20**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 20, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 5.9 DILUTIVE POTENTIAL EQUITY SHARES */}
        <section id="as-20-dilutive-potential-equity-shares" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-20-dilutive-potential-equity-shares" num="5.9" title="DILUTIVE POTENTIAL EQUITY SHARES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Potential equity shares are anti-dilutive when their conversion to equity shares would increase earnings per share from continuing ordinary activities or decrease loss per share from continuing ordinary activities. The effects of anti-dilutive potential equity shares are ignored in calculating diluted earnings per share. Thus, it is important to note that the ‘control factor’ is the profit from continuing ordinary activities. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 17 --- PRESENTATION &amp; DISCLOSURES BASED v v v v 4.111 In simple words, we can conclude as under: Particulars Remarks Is it to be taken as a part of Diluted EPS or not? Conversion to equity shares would decrease earnings per share from continuing ordinary activities. Dilutive Yes Conversion to equity shares would increase earnings per share from continuing ordinary activities. Anti-dilutive No Conversion to equity shares would increase loss per share from continuing ordinary activities. Dilutive Yes Conversion to equity shares would decrease loss per share from continuing ordinary activities. Anti-dilutive No Illustration 7 X Limited, during the year ended March 31, 20X1, has income from continuing ordinary operations of ` 2,40,000, a loss from discontinuing operations of ` 3,60,000 and accordingly a net loss of ` 1,20,000. The Company has 1,000 equity shares and 200 potential equity shares outstanding as at March 31, 20X1. You are required to compute Basic and Diluted EPS? Solution As per AS 20 “Potential equity shares should be treated as dilutive when, and only when, their conversion to equity shares would decrease net profit per share from continuing ordinary operations”. As income from continuing ordinary operations, ` 2,40,000 would be considered and not ` (1,20,000), for ascertaining whether 200 potential equity shares are</li>
            <li>-- PAGE 18 --- dilutive or anti-dilutive. Accordingly, 200 potential equity shares would be dilutive potential equity shares since their inclusion would decrease the net profit per share from continuing ordinary operations from ` 240 to ` 200. Thus, the basic E.P.S would be ` (120) and diluted E.P.S. would be ` (100). In case there are more than 1 potential equity shares: In considering whether potential equity shares are dilutive or antidilutive, each issue or series of potential equity shares is considered separately rather than in aggregate. The sequence in which potential equity shares are considered may affect whether or not they are dilutive. Therefore, in order to maximise the dilution of basic earnings per share, each issue or series of potential equity shares is considered in sequence from the most dilutive to the least dilutive. For the purpose of determining the sequence from most dilutive to least dilutive potential equity shares, the earnings per incremental potential equity share is calculated. Where the earnings per incremental share is the least, the potential equity share is considered most dilutive and vice-versa.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 20**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 20, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 5.10 RESTATEMENT */}
        <section id="as-20-restatement" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-20-restatement" num="5.10" title="RESTATEMENT" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            If the number of equity or potential equity shares outstanding increases as a result of a bonus issue or share split or decreases as a result of a reverse share split (consolidation of shares), the calculation of basic and diluted earnings per share should be adjusted for all the periods presented. If these changes occur after the balance sheet date but before the date on which the financial statements are approved by the board of directors, the per share calculations for those financial statements and any prior period financial statements presented should be based on the new number of shares. When per share calculations reflect such changes in the number of shares, that fact should be disclosed. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 20**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 20, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 5.11 PRESENTATION */}
        <section id="as-20-presentation" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-20-presentation" num="5.11" title="PRESENTATION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            An enterprise should present basic and diluted earnings per share on the face of the statement of profit and loss for each class of equity shares that has a different right to share in the net profit for the period. An enterprise should present basic and diluted earnings per share with equal prominence for all periods presented. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 19 --- PRESENTATION &amp; DISCLOSURES BASED v v v v 4.113 AS 20 requires an enterprise to present basic and diluted earnings per share, even if the amounts disclosed are negative (a loss per share).</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 20**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 20, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 5.12 DISCLOSURE */}
        <section id="as-20-disclosure" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-20-disclosure" num="5.12" title="DISCLOSURE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            An enterprise should disclose the following: a. Where the statement of profit and loss includes extraordinary items (as defined is <strong>AS 5</strong>), basic and diluted EPS computed on the basis of earnings excluding extraordinary items (net of tax expense); b. The amounts used as the numerators in calculating basic and diluted earnings per share, and a reconciliation of those amounts to the net profit or loss for the period; c. The weighted average number of equity shares used as the denominator in calculating basic and diluted earnings per share, and a reconciliation of these denominators to each other; and d. The nominal value of shares along with the earnings per share figures. If an enterprise discloses, in addition to basic and diluted earnings per share, per share amounts using a reported component of net profit other than net profit or loss for the period attributable to equity shareholders, such amounts should be calculated using the weighted average number of equity shares determined in accordance with <strong>AS 20</strong>. If a component of net profit is used which is not reported as a line item in the statement of profit and loss, a reconciliation should be provided between the component used and a line item which is reported in the statement of profit and loss. Basic and diluted per share amounts should be disclosed with equal prominence. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 20 --- TEST YOUR KNOWLEDGE Multiple Choice Questions 1. AB Company Ltd. had 1,00,000 shares of common stock outstanding on January 1. Additional 50,000 shares were issued on July 1, and 25,000 shares were re- acquired on September 1. The weighted average number of shares outstanding during the year on Dec. 31 is (a) 1,40,000 shares (b) 1,25,000 shares (c) 1,16,667 shares (d) 1,20,000 shares 2. As per AS 20, potential equity shares should be treated as dilutive when, and only when, their conversion to equity shares would (a) Decrease net profit per share from continuing ordinary operations. (b) Increase net profit per share from continuing ordinary operations. (c) Make no change in net profit per share from continuing ordinary operations. (d) Decrease net loss per share from continuing ordinary operations. 3. As per AS 20, equity shares which are issuable upon the satisfaction of certain conditions resulting from contractual arrangements are (a) Dilutive potential equity shares (b) Contingently issuable shares (c) Contractual issued shares (d) Potential equity shares 4. In case potential equity shares have been cancelled during the year, they should be: (a) Ignored for computation of Diluted EPS. (b) Considered from the beginning of the year till the date they are cancelled.</li>
            <li>-- PAGE 21 --- PRESENTATION &amp; DISCLOSURES BASED v v v v 4.115 (c) The company needs to make an accounting policy and can follow the treatment in (a) or (b) as it decides. (d) Considered for computation of diluted EPS only if the impact of such potential equity shares would be material. 5. Partly paid up equity shares are: (a) Always considered as a part of Basic EPS. (b) Always considered as a part of Diluted EPS. (c) Depending upon the entitlement of dividend to the shareholder, it will be considered as a part of Basic or Diluted EPS as the case may be. (d) Considered as part of Basic/ Diluted EPS depending on the accounting policy of the company. Theoretical Questions 6. In the following list of shares issued, for the purpose of calculation of weighted average number of shares, from which date weight is to be considered: (i) Equity Shares issued in exchange of cash, (ii) Equity Shares issued as a result of conversion of a debt instrument, (iii) Equity Shares issued in exchange for the settlement of a liability of the enterprise, (iv) Equity Shares issued for rendering of services to the enterprise, (v) Equity Shares issued in lieu of interest and/or principal of an other financial instrument, (vi) Equity Shares issued as consideration for the acquisition of an asset other than in cash. Also define Potential Equity Share. 7. Stock options have been granted by AB Limited to its employees and they vest equally over 5 years, i.e., 20 per cent at the end of each year from the date of grant. The options will vest only if the employee is still employed with the company at the end of the year. If the employee leaves the company during the vesting period, the options that have vested can be exercised, while the others</li>
            <li>-- PAGE 22 --- would lapse. Currently, AB Limited includes only the vested options for calculating Diluted EPS. Should only completely vested options be included for computation of Diluted EPS? Is this in accordance with the provisions of AS 20? Explain. 8. Explain why the bonus issue of shares and the shares issue at full market price are treated differently in the calculation of the basic earnings per share? Scenario based Question 9 NAT, a listed entity, as on 1st April, 20X1 had the following capital structure: Particulars ` 10,00,000 Equity Shares having face value of ` 1 each 10,00,000 10,00,000 8% Preference Shares having face value of ` 10 each 1,00,00,000 During the year 20X1-20X2, the company had profit after tax of Rs. 90,00,000. On 1st January, 20X2, NAT made a bonus issue of one equity share for every 2 equity shares outstanding as at 31st December, 20X1. On 1st January, 20X2, NAT issued 2,00,000 equity shares of Rs. 1 each at their full market price of Rs. 7.60 per share. NAT&apos;s shares were trading at Rs. 8.05 per share on 31st March, 20X2. Further it has been provided that the basic earnings per share for the year ended 31st March, 20X1 was previously reported at Rs. 62.30. You are required to: (i) Calculate the basic earnings per share to be reported in the financial statements of NAT for the year ended 31st March, 20X2 including the comparative figure, in accordance with AS-20 Earnings Per Share. (ii) Explain why the bonus issue of shares and the shares issue at full market price are treated differently in the calculation of the basic earnings per share? 10. X Ltd. supplied the following information. You are required to compute the basic earnings per share:</li>
            <li>-- PAGE 23 --- PRESENTATION &amp; DISCLOSURES BASED v v v v 4.117 (Accounting year 1.1.20X1– 31.12.20X1) Net Profit : Year 20X1: ` 20,00,000 : Year 20X2: ` 30,00,000 No. of shares outstanding prior to Right Issue : 10,00,000 shares Right Issue : One new share for each four outstanding i.e., 2,50,000 shares. Right Issue price – ` 20 Last date of exercise rights– 31.3.20X2. Fair rate of one Equity share immediately prior to exercise of rights on 31.3.20X2 : ` 25 11. On 1st April, 20X1 a company had 6,00,000 equity shares of ` 10 each ( ` 5 paid up by all shareholders). On 1st September, 20X1 the remaining ` 5 was called up and paid by all shareholders except one shareholder having 60,000 equity shares. The net profit for the year ended 31st March, 20X2 was ` 21,96,000 after considering dividend on preference shares of ` 3,40,000. You are required to compute Basic EPS for the year ended 31st March, 20X2 as per Accounting Standard 20 &quot;Earnings Per Share&quot;. 12. No. of equity shares outstanding = 30,00,000 Basic earnings per share ` 5.00 No. of 12% convertible debentures of ` 100 each; 50,000 Each debenture is convertible into 10 equity shares Tax Rate 30% Compute Diluted Earnings per Share. Working notes should form part of the answer.</li>
            <li>-- PAGE 24 --- 13. Following information is supplied by K Ltd.: Number of shares outstanding prior to right issue - 2,50,000 shares. Right issue - two new share for each 5 outstanding shares (i.e. 1,00,000 new shares) Right issue price - ` 98 Last date of exercising rights - 30-06-20X2. Fair value of one equity share immediately prior to exercise of right on 30-06-20X2 is ` 102. Net Profit to equity shareholders: 20X1-20X2 - ` 50,00,000 20X2-20X3 -` 75,00,000 You are required to calculate the basic earnings per share as per AS-20 Earnings per Share. ANSWERS/HINTS Answers to the Multiple Choice Questions 1. (c) 2. (a) 3. (b) 4. (b) 5. (c) Answers to the Theoretical Questions 6. The following dates should be considered for consideration of weights for the purpose of calculation of weighted average number of shares in the given cases: (i) Date of Cash receivable (ii) Date of conversion (iii) Date on which settlement becomes effective (iv) When the services are rendered (v) Date when interest ceases to accrue</li>
            <li>-- PAGE 25 --- PRESENTATION &amp; DISCLOSURES BASED v v v v 4.119 (vi) Date on which the acquisition is recognised. A Potential Equity Share is a financial instrument or other contract that entitles or may entitle its holder to equity shares. 7. As per AS 20 “A potential equity share is a financial instrument or other contract that entitles, or may entitle, its holder to equity shares”. Options including employee stock option plans under which employees of an enterprise are entitled to receive equity shares as part of their remuneration and other similar plans are examples of potential equity shares. Further, for the purpose of calculating diluted earnings per share, the net profit or loss for the period attributable to equity shareholders and the weighted average number of shares outstanding during the period should be adjusted for the effects of all dilutive potential equity shares. The current method of calculating Diluted EPS adopted by AB limited is not in accordance with AS 20. The calculation of Diluted EPS should include all potential equity shares, i.e., all the stock options granted at the balance sheet date, which are dilutive in nature, irrespective of the vesting pattern. The options that have lapsed during the year should be included for the portion of the period the same were outstanding, pursuant to the requirement of the standard. 8. In case of a bonus issue, equity shares are issued to existing shareholders for no additional consideration. Therefore, the number of equity shares outstanding is increased without an increase in resources. Since the bonus issue is an issue without consideration, the issue is treated as if it had occurred prior to the beginning of the earliest period reported. However, the share issued at full market price does not carry any bonus element and usually results in a proportionate change in the resources available to the enterprise. Therefore, it is taken into consideration from the time it has been issued i.e. the time- weighting factor is considered based on the specific shares outstanding as a proportion of the total number of days in the period.</li>
            <li>-- PAGE 26 --- Answers to the Scenario based Question 9. (i) Computation of Basic Earnings per share for the year ended 31st March, 20X2: (including the comparative figure) Working Note – I: Earnings for the year ended 31st March, 20X1: = EPS x Number of shares outstanding during 20X0-20X1 = ` 62.30 x 10,00,000 equity shares = ` 6,23,00,000 Adjusted/Restated Earnings per share for the year ended 31st March 20X1: (after taking into consideration bonus issue) Adjusted/Restated Basic EPS: = Earnings for the year 20X0-20X1 / (Total outstanding shares +Bonus issue) = ` 6,23,00,000 / (10,00,000+ 5,00,000) = ` 6,23,00,000 / 15,00,000 = ` 41.53 per share Computation of Basic EPS for the year 20X1-20X2: Basic EPS = (Total Earnings – Preference Shares Dividend) / (Total shares outstanding at the beginning + Bonus issue + weighted average of the shares issued in January, 20X2) = (` 90,00,000 – ` (1,00,00,000 x 8%)) / (10,00,000 + 5,00,000 + (2,00,000 x 3/12)) = ` 82,00,000 / 15,50,000 shares = ` 5.29 per share (ii) In case of a bonus issue, equity shares are issued to existing shareholders for no additional consideration. Therefore, the number of equity shares outstanding is increased without an increase in resources.</li>
            <li>-- PAGE 27 --- PRESENTATION &amp; DISCLOSURES BASED v v v v 4.121 Since the bonus issue is an issue without consideration, the issue is treated as if it had occurred prior to the beginning of the year 20X1, the earliest period reported. However, the share issued at full market price does not carry any bonus element and usually results in a proportionate change in the resources available to the enterprise. Therefore, it is taken into consideration from the time it has been issued i.e. the time- weighting factor is considered based on the specific shares outstanding as a proportion of the total number of days in the period. 10. Computation of Basic Earnings Per Share (as per paragraphs 10 and 26 of AS 20 on Earnings Per Share) Year 20X1 Year 20X2 ` ` EPS for the year 20X1 as originally reported 𝑁𝑒𝑡 𝑝𝑟𝑜𝑓𝑖𝑡 𝑜𝑓 𝑡ℎ𝑒 𝑦𝑒𝑎𝑟 𝑎𝑡𝑡𝑟𝑖𝑏𝑢𝑡𝑎𝑏𝑙𝑒 𝑡𝑜 𝑒𝑞𝑢𝑖𝑡𝑦 𝑠ℎ𝑎𝑟𝑒ℎ𝑜𝑙𝑑𝑒𝑟𝑠 𝑊𝑒𝑖𝑔ℎ𝑡𝑒𝑑 𝑎𝑣𝑒𝑟𝑎𝑔𝑒 𝑛𝑢𝑚𝑏𝑒𝑟 𝑜𝑓 𝑒𝑞𝑢𝑖𝑡𝑦 𝑠ℎ𝑎𝑟𝑒𝑠 𝑜𝑢𝑡𝑠𝑡𝑎𝑛𝑑𝑖𝑛𝑔 𝑑𝑢𝑟𝑖𝑛𝑔 𝑡ℎ𝑒 𝑦𝑒𝑎𝑟 = (` 20,00,000 / 10,00,000 shares) 2.00 EPS for the year 20X1 restated for rights issue = [` 20,00,000 / (10,00,000 shares  1.04)] 1.91 (approx.) EPS for the year 20X2 including effects of rights issue 9/12) shares (12,50,000 3/12) 1.04 shares (10,00,000 30,00,000  +   ` ` 30,00,000 11,97,500 shares 2.51 (approx.)  Refer working note 2.</li>
            <li>-- PAGE 28 --- Working Notes: 1. Computation of theoretical ex-rights fair value per share Fair value of all outstanding shares immediately prior to exercise of rights + Total amount received from exercise Number of shares outstanding prior to exercise+ Number of shares issued in the excercise ( ) ( )= ` ` 25 ×10,00,000 shares + 20 × 2,50,000 shares 10,00,000 shares + 2,50,000 shares = 3,00,00,000 = 24 12,50,000 shares ` ` 2. Computation of adjustment factor Fair value per share prior to exercise of rights = Theoretical ex-rights value per share = 25 =1.04 (approx.) 24 (Refer Working Note 1) ` ` 11. Basic Earnings per share (EPS) = Net profit attributable to equity shareholders Weighted average number of equity shares outstanding during the year 21,96,000 = 4,57,500 Shares (as per working note) = ` 4.80 per share Working Note: Calculation of weighted average number of equity shares As per AS 20 ‘Earnings Per Share’, partly paid equity shares are treated as a fraction of equity share to the extent that they were entitled to participate in dividend relative to a fully paid equity share during the reporting period. Assuming that the partly paid shares are entitled to participate in the dividend to the extent of amount paid, weighted average number of shares will be calculated as follows:</li>
            <li>-- PAGE 29 --- PRESENTATION &amp; DISCLOSURES BASED v v v v 4.123 Date No. of equity shares Amount paid per share Weighted average no. of equity shares ` ` ` 1.4.20X1 6,00,000 5 6,00,000 х 5/10 х 5/12 = 1,25,000 1.9.20X1 5,40,000 10 5,40,000 х 7/12 = 3,15,000 1.9.20X1 60,000 5 60,000 х 5/10 х 7/12 = 17,500 Total weighted average equity shares 4,57,500 12. Earnings for the year: = No. of Shares x Basic EPS = 30,00,000 shares x ` 5 per share = ` 1,50,00,000 Computation of Adjusted Net Profit: = Earnings for the year + Interest on debentures net of tax = 1,50,00,000 + (6,00,000 - 1,80,000) = ` 1,54,20,000 Computation of Adjusted Denominator: No. of equity shares resulting from conversion of debentures: = 50,000 x 10 shares = 5,00,000 shares No. of equity shares for diluted EPS = 30,00,000 + 5,00,000 = 35,00,000 shares Computation of Diluted EPS: = ` 1,54,20,000/35,00,000 shares = ` 4.4 per share. 13.Fair value of shares immediately prior to exercise of rights + Total amount received from exercise Number of shares outstanding prior to exercise + Number of shares issued in the exercise 102 x 2,50,000 Shares + 98 x 1,00,000 shares 3,50,000 shares ` Theoretical ex-rights fair value per share = ` 100.86 Computation of adjustment factor: Fair value per share prior to exercise of rights Theoretical ex - rights value per share = 102/100.86 = 1.01</li>
            <li>-- PAGE 30 --- Computation of earnings per share: EPS for the year 20X1-X2 as originally reported: ` 50,00,000/2,50,000 shares = ` 20 EPS for the year 20X1-X2 restated for rights issue: =` 50,00,000/ (2,50,000 shares x 1.01) = ` 19.80 EPS for the year 20X2-X3 including effects of rights issue: EPS = 75,00,000/3,25,625* = ` 23.03 * [(2,50,000 x 1.01 x 3/12) + (3,50,000 x 9/12)] =63,125 + 2,62,500 = 3,25,625 shares Note: Financial year (ended 31st March) is considered as accounting year while giving the above answer.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 20**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 20, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
