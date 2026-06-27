'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, ChevronDown } from 'lucide-react'

export const as13Sections = [
  { id: 'as-13-intro-sec', title: '1. Introduction & Objectives' },
  { id: 'as-13-introduction', title: '3.1 INTRODUCTION' },
  { id: 'as-13-definition-of-the-terms-used-in-the', title: '3.2 DEFINITION OF THE TERMS USED IN THE' },
  { id: 'as-13-forms-of-investments', title: '3.3 FORMS OF INVESTMENTS' },
  { id: 'as-13-classification-of-investments', title: '3.4 CLASSIFICATION OF INVESTMENTS' },
  { id: 'as-13-cost-of-investments', title: '3.5 COST OF INVESTMENTS' },
  { id: 'as-13-carrying-amount-of-investments', title: '3.6 CARRYING AMOUNT OF INVESTMENTS' },
  { id: 'as-13-investment-properties', title: '3.7 INVESTMENT PROPERTIES' },
  { id: 'as-13-disposal-of-investments', title: '3.8 DISPOSAL OF INVESTMENTS' },
  { id: 'as-13-reclassification-of-investments', title: '3.9 RECLASSIFICATION OF INVESTMENTS' },
  { id: 'as-13-disclosure', title: '3.10 DISCLOSURE' }
];

interface AS13StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function AS13StandardTabContent({ navigateToPdfPage }: AS13StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as-13-intro-sec');
  const tocScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(id);
    const stickyToc = document.getElementById('as-13-standard-sticky-toc');
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

      as13Sections.forEach((sec) => {
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
      <div id="as-13-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as13Sections.map(sec => (
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
        <section id="as-13-intro-sec" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-13-intro-sec" num="1" title="1. Introduction &amp; Objectives" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 5 . 78 UNIT 3 : A CCOUNTING STANDARD 13 ACCOUNTING FOR INVESTMENTS After studying this unit, you will be able to comprehend – • What are the various Forms of <strong>Investments</strong> • Classification of <strong>Investments</strong> • How to compute the Cost of <strong>Investments</strong> • Current <strong>Investments</strong> • Long - term <strong>Investments</strong> • Investment Properties • Disposal of <strong>Investments</strong> • Reclassification of <strong>Investments</strong> • Disclosure Requirements as per the standard . <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 13**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 13, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.1 INTRODUCTION */}
        <section id="as-13-introduction" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-13-introduction" num="3.1" title="INTRODUCTION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The standard deals with accounting for investments in the financial statements of enterprises and related disclosure requirements. Shares, debentures and other securities held as stock - in - trade (i.e., for sale in the ordinary course of business) are not ‘investments’ as defined in this Standard. However, the manner in which they are accounted for and disclosed in the financial statements is quite similar to that applicable in respect of current investments. Accordingly, the provisions of this Standard, to the extent that they relate to current investments, are also applicable to shares, debentures and other securities held as stock - in - trade, with suitable modifications as specified in this Standard. <PdfRef page={1} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ASSETS BASED ACCOUNTING STANDARDS v v v v 5 . 79 5 . 79 This Standard does not deal with: a. The basis for recognition of interest, dividends and rentals earned on investments which are covered by <strong>AS 9</strong> b. Operating or finance leases c. <strong>Investments</strong> on retirement benefit plans and life insurance enterprises d. Mutual funds, venture capital funds and/ or the related asset management companies, banks and public financial institutions formed under a Central or State Government Act or so declared under the Companies Act, 2013 . <PdfRef page={2} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 13**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 13, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.2 DEFINITION OF THE TERMS USED IN THE */}
        <section id="as-13-definition-of-the-terms-used-in-the" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-13-definition-of-the-terms-used-in-the" num="3.2" title="DEFINITION OF THE TERMS USED IN THE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            STANDARD <strong>Investments</strong> are assets held by an enterprise for earning income by way of dividends, interest, and rentals, for capital appreciation, or for other benefits to the investing enterprise. Assets held as stock - in - trade (inventory) are not ‘investments’ Fair value is the amount for which an asset could be exchanged between a knowledgeable, willing buyer and a knowledgeable, willing seller in an arm’s length transaction. Under appropriate circumstances, market value or net realisable value provides an evidence of fa ir value. Market value is the amount obtainable from the sale of an investment in an open market, net of expenses necessarily to be incurred on or before disposal. <PdfRef page={2} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 13**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 13, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.3 FORMS OF INVESTMENTS */}
        <section id="as-13-forms-of-investments" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-13-forms-of-investments" num="3.3" title="FORMS OF INVESTMENTS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Enterprises hold investments for diverse reasons. For some enterprises, investment activity is a significant element of operations, and assessment of the performance of the enterprise may largely, or solely, depend on the reported results of this activity. Some investments have no physical existence and are represented merely by certificates or similar documents (e.g., shares) while others exist in a physical form (e.g., buildings). For some investments, an active market exists from which a market value (fai r value) can be established. For other investments, an active market does not exist and other means are used to determine fair value. <PdfRef page={2} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v <PdfRef page={3} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 13**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 13, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.4 CLASSIFICATION OF INVESTMENTS */}
        <section id="as-13-classification-of-investments" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-13-classification-of-investments" num="3.4" title="CLASSIFICATION OF INVESTMENTS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            A current investment is an investment that is by its nature readily realisable and is intended to be held for not more than one year from the date on which such investment is made. The intention to hold for not more than one year is to be judged at the time of purchase of inv estment. A long term investment is an investment other than a current investment. Further classification of current and long - term investments should be as specified in the statute governing the enterprise. In the absence of a statutory requirement, such further classification should disclose, where applicable, investments in: (a) Government or Trust securities (b) Shares, debentures or bonds (c) Investment properties (d) Others — specifying nature <PdfRef page={3} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 13**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 13, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.5 COST OF INVESTMENTS */}
        <section id="as-13-cost-of-investments" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-13-cost-of-investments" num="3.5" title="COST OF INVESTMENTS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The cost of an investment includes acquisition charges such as brokerage, fees and duties etc. Example X Ltd invests in long - term deposit worth ` 200 lakhs on 1st April 2022. It incurs brokerage cost of ` 1 lakh to be able to make the investment. The value of the investment on 1st April 2022 is ` 201 lakhs. If an investment is acquired, or partly acquired, by the issue of shares or other securities, the acquisition cost is the fair value of the securities issued. The fair value may not necessarily be equal to the nominal or par value of the securities issued. Classification of <strong>Investments</strong> Current <strong>Investments</strong> Long Term <strong>Investments</strong> <PdfRef page={3} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ASSETS BASED ACCOUNTING STANDARDS v v v v 5 . 81 5 . 81 If an investment is acquired in exchange, or part exchange, for another asset, the acquisition cost of the investment is determined by reference to the fair value of the asset given up or the fair value of the investment acquired, whichever is more clearly evident. Interest, dividends and rentals receivables in connection with an investment are generally regarded as income, being the return on the investment. However, in some circumstances, such inflows represent a recovery of cost and do not form part of income. For example, when unpaid interest has accrued before the acquisition of an interest - bearing investment and is therefore included in the price paid for the investment, the subsequent receipt of interest is allocated between pre - acquisition and post - acquisit ion periods; the pre - acquisition portion is deducted from cost. When dividends on equity are declared from pre - acquisition profits, a similar treatment may apply. If it is difficult to make such an allocation except on an arbitrary basis, the cost of inves tment is normally reduced by dividends receivable only if they clearly represent a recovery of a part of the cost. When right shares offered are subscribed for, the cost of the right shares is added to the carrying amount of the original holding. If rights are not subscribed for but are sold in the market, the sale proceeds are taken to the profit and loss statement. However, where the investments are acquired on cum - right basis and the market value of investments immediately after their becoming ex - right is lower than the cost for which they were acquired, it may be appropriate to apply the sale proceeds of rights to reduce the carrying amount of such investments to the market value. <PdfRef page={4} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v <PdfRef page={5} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 13**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 13, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.6 CARRYING AMOUNT OF INVESTMENTS */}
        <section id="as-13-carrying-amount-of-investments" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-13-carrying-amount-of-investments" num="3.6" title="CARRYING AMOUNT OF INVESTMENTS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The carrying amount for current investments is the lower of cost and fair value. Valuation of current investments on overall (or global) basis is not considered appropriate. Sometimes, the concern of an enterprise may be with the value of a category of related current investments and not with each individual investment, and accordingly the investments may be carried at the lower of cost and fair value computed category - wise (i.e. equity shares, preference shares, convertible debentures, etc.). However, the more prudent and appropriate method is to carry investments individually at the l ower of cost and fair value. Cost of Investment Added Acquisition Charges Fair value of the securities issued fair value of the asset given up or the fair value of the investment acquired, whichever is more clearly evident. Cost of Right shares subscribed Reduced Interest received for pre - acquisition period Dividend received for pre - acquisition period only if they clearly represent a recovery of cost. If investments acquired on cum - right basis and the market value of investments immediately after their becoming ex - right is lower than the cost for which they were acquired, then sale proceeds till carrying amount becomes equal to market value. <PdfRef page={5} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ASSETS BASED ACCOUNTING STANDARDS v v v v 5 . 83 5 . 83 Any reduction to fair value is debited to profit and loss account, however, if fair value of investment is increased subsequently, the increase in value of current investment up to the cost of investment is credited to the profit and loss account (and exce ss portion, if any, is ignored). Long term investments are usually carried at cost. The carrying amount of long - term investments is therefore determined on an individual investment basis. Where there is a decline, other than temporary, in the carrying amounts of long term valued investments, the resultant reduction in the carrying amount is charged to the profit and loss statement. The reduction in carrying amount is reversed when there is a rise in the value of the investment, or if the reasons for the reduction no longer exist. Example of Decline other than temporary: (A) Company in which investment is made is making cash operating losses which has resulted in reduction of its net worth, (B) New regulation which has negative impact in the working of the investee, (C) Significant reduction of quoted price of the investment, etc. Carrying Amount Current investments Lower of cost and fair value. Any reduction to fair value is debited to profit and loss account, however, if fair value of investment is increased subsequently, the increase in value of current investment up to the cost of investment is credited to the profit and loss account (and excess portion, if any, is ignored) . Valuation on overall (or global) basis is not considered appropriate ; prudent method is to carry investment individually . Long term investments Carried at cost. Where there is a decline, other than temporary,in the carrying amounts of long term valued investments, the resultant reduction in the carrying amount is charged to the profit and loss statement . The reduction in carrying amount is reversed when there is a rise in the value of the investment, or if the reasons for the reduction no longer exist . Valuation Determined on an individual investment basis. <PdfRef page={6} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 5 . 84 Illustration 1 An unquoted long term investment is carried in the books at a cost of ` 2 lakhs. The published accounts of the unlisted company received in May, 20 X1 showed that the company was incurring cash losses with declining market share and the long term investment may not fetch more than ` 20,000. How will you deal with this i n preparing the financial statements of R Ltd. for the year ended 31 st March, 20 X1 ? Solution As stated in the question that financial statements for the year ended 31st March, 20X1 are still under preparation – The answer has been given on the assumption that t he financial statements are yet to be completed and approved by the Board of Directors . Also, the fall in value of investments has been considered on account of conditions existing on the balance sheet date. <strong>Investments</strong> classified as long term investments should be carried in the financial statements at cost. However, provision for diminution should be made to recognise a decline, other than temporary, in the value of the investments, such reduction being dete rmined and made for each investment individually. <strong>AS 13</strong> (Revised) ‘ Accounting for <strong>Investments</strong> ’ states that indicators of the value of an investment are obtained by reference to its market value, the investee&apos;s assets and results and the expected cash flows from the investment. On the above basis , the facts of the given case clearly suggest that the provision for diminution should be made to reduce the carrying amount of long term investment to ` 20,000 in the financial statements for the year ended 31 st March, 20 X1 . Illustration 2 X Ltd. on 1 - 1 - 20 X1 had made an investment of ` 600 lakhs in the equity shares of Y Ltd. of which 50% is made in the long term category and the rest as temporary investment. The realisable value of all such investment on 31 - 3 - 20 X1 became ` 200 lakhs as Y Ltd. lost a case of copyright. From the given market conditions, it is apparent that the reduction in the value is not temporary in nature. How will you recognise the reduction in financial statements for the year ended on 31 - 3 - 20 X1 ? <PdfRef page={7} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ASSETS BASED ACCOUNTING STANDARDS v v v v 5 . 85 5 . 85 Solution X Ltd. invested ` 600 lakhs in the equity shares of Y Ltd. Out of the same, the company intends to hold 50% shares for long term period i.e. ` 300 lakhs and remaining as temporary (current) investment i.e. ` 300 lakhs. Irrespective of the fact that investment has been held by X Ltd. only for 3 months (from.20 X1 to.20 X1 ), <strong>AS 13</strong> (Revised) lays emphasis on intention of the investor to classify the investment as current or long term even though the long term investment may be readily marketable. In the given situation, the realisable value of all such investments on.20 X1 became ` 200 lakhs i.e. ` 100 lakhs in respect of current investment and ` 100 lakhs in respect of long term investment. As per <strong>AS 13</strong> (Revised), ‘ Accounting for Investment ’ , t he carrying amount for current investments is the lower of cost and fair value. In respect of current investments for which an active market exists, market value generally provides the best evidence of fair value. Accordingly, the carrying value of investment held as temporary investment should be shown at realisable value i.e. at ` 100 lakhs. The reduction of ` 200 lakhs in the carrying value of current investment will be charged to the profit and loss account. The S tandard further states that long - term investments are usually carried at cost. However, when there is a decline, other than temporary, in the value of long term investment, the carrying amount is reduced to recognise the decline. Here, Y Ltd. lost a case of copyright which drastically reduced the realisable value of its shares to one third which is quiet a substantial figure. Losing the case of copyright may affect the business and the performance of the company in the long run. Accordingly, it will be appropriate to reduce the carrying amount of long term investment by ` 200 lakhs and show the investments at ` 100 lakhs, since the downfall in the value of shares is other than temporary. The reduction of ` 200 lakhs in the carrying value of long term investment will also be charged to the Statement of profit and loss. <PdfRef page={8} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v <PdfRef page={9} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 13**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 13, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.7 INVESTMENT PROPERTIES */}
        <section id="as-13-investment-properties" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-13-investment-properties" num="3.7" title="INVESTMENT PROPERTIES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            An investment property is an investment in land or buildings that are not intended to be occupied substantially for use by, or in the operations of, the investing enterprise. An investment property is accounted for in accordance with cost model as prescribed in <strong>AS 10</strong> (Revised), ‘Property, Plant and Equipment’. The cost of any shares in a co - operative society or a company, the holding of which is directly related to the right to hold the investment property, is added to the carrying amount of the investment property. <PdfRef page={9} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 13**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 13, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.8 DISPOSAL OF INVESTMENTS */}
        <section id="as-13-disposal-of-investments" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-13-disposal-of-investments" num="3.8" title="DISPOSAL OF INVESTMENTS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            On disposal of an investment, the difference between the carrying amount and the disposal proceeds, net of expenses, is recognised in the profit and loss statement. When disposing of a part of the holding of an individual investment, the carrying amount to be allocated to that part is to be determined on the basis of the average carrying amount of the total holding of the investment 1 . <PdfRef page={9} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 13**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 13, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.9 RECLASSIFICATION OF INVESTMENTS */}
        <section id="as-13-reclassification-of-investments" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-13-reclassification-of-investments" num="3.9" title="RECLASSIFICATION OF INVESTMENTS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Where long - term investments are reclassified as current investments, transfers are made at the lower of cost and carrying amount at the date of transfer. Where investments are reclassified from current to long - term, transfers are made at the lower of cost and fair value at the date of transfer. Illustration 3 ABC Ltd. wants to re - classify its investments in accordance with <strong>AS 13</strong> (Revised). Decide and state on the amount of transfer, based on the following information: 1 In respect of shares, debentures and other securities held as stock - in - trade, the cost of stocks disposed of is determined by applying an appropriate cost formula (e.g. first - in, first - out, average cost, etc.). These cost formulae are the same as those sp ecified in <strong>AS 2</strong> (Revised), in respect of Valuation of Inventories. <PdfRef page={9} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ASSETS BASED ACCOUNTING STANDARDS v v v v 5 . 87 5 . 87 (1) A portion of current investments purchased for ` 20 lakhs, to be reclassified as long term investment, as the company has decided to retain them. The market value as on the date of Balance Sheet was ` 25 lakhs. (2) Another portion of current investments purchased for ` 15 lakhs, to be reclassified as long term investments. The market value of these investments as on the date of balance sheet was ` 6.5 lakhs. (3) Certain long term investments no longer considered for holding purposes, to be reclassified as current investments. The original cost of these was ` 18 lakhs but had been written down to ` 12 lakhs to recognise other than temporary decline as per <strong>AS 13</strong> (Revised). Solution As per <strong>AS 13</strong> (Revised), where investments are reclassified from current to long - term, transfers are made at the lower of cost and fair value at the date of transfer. (1) In the first case, the market value of the investment is ` 25 lakhs, which is higher than its cost i.e. ` 20 lakhs. Therefore, the transfer to long term investments should be carried at cost i.e. ` 20 lakhs. (2) In the second case, the market value of the investment is ` 6.5 lakhs, which is lower than its cost i.e. ` 15 lakhs. Therefore, the transfer to long term investments should be carried in the books at the market value i.e. ` 6.5 lakhs. The loss of ` 8.5 lakhs should be charged to profit and loss account. Reclassfication of investment Long term to Current lower of cost and carrying amount at the date of transfer Current to Long term lower of cost and fair value at the date of transfer <PdfRef page={10} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 5 . 88 As per <strong>AS 13</strong> (Revised), where long - term investments are re - classified as current investments, transfers are made at the lower of cost and carrying amount at the date of transfer. (3) In the third case, the book value of the investment is ` 12 lakhs, which is lower than its cost i.e. ` 18 lakhs. Here, the transfer should be at carrying amount and hence this re - classified current investment should be carried at ` 12 lakhs. <PdfRef page={11} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 13**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 13, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.10 DISCLOSURE */}
        <section id="as-13-disclosure" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-13-disclosure" num="3.10" title="DISCLOSURE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The following disclosures in financial statements in relation to investments are appropriate: - a. The accounting policies followed for the determination of carrying amount of investments. b. Th e amounts included in profit and loss statement for: i. Interest, dividends (showing separately dividends from sub sidiary companies), and rentals on investments showing separately such income from long term and current investments. Gross income should be stated, the amount of income tax deducted at source b eing included under Advance Taxes Paid. ii. Profits and losses on disposal of current investments and changes in carrying amount of such investments. iii. Profits and losses on disposal of long term investments and changes in the carrying amount of such investments. c. Significant restrictions on the right of ownership, realisability of investments or the remittance of income and proceeds of disposal. d. The aggregate amount of quoted and unquoted investments, giving the aggregate market value of quoted investments. e. Other disclosures as specifically required by the relevant statute governing the enterprise. f. Classification of investments. <PdfRef page={11} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ASSETS BASED ACCOUNTING STANDARDS v v v v 5 . 89 5 . 89 Illustration 4 M/s Innovative Garments Manufacturing Company Limited invested in the shares of another company on 1st October, 20 X3 at a cost of ` 2,50,000. It also earlier purchased Gold of ` 4,00,000 and Silver of ` 2,00,000 on 1 st March, 20 X1 . Market value as on 31 st March, 20 X4 of above investments are as follows: ` Shares 2,25,000 Gold 6,00,000 Silver 3,50,000 How above investments will be shown in the books of accounts of M/s Innovative Garments Manufacturing Company Limited for the year ending 31st March, 20 X4 as per the provisions of <strong>Accounting Standard</strong> 13 &quot;Accounting for <strong>Investments</strong>&quot;? Solution As per <strong>AS 13</strong> (Revised) ‘ Accounting for <strong>Investments</strong> ’ , for investment in shares if the investment is purchased with an intention to hold for short - term period (less than one year), then it will be classified as current investment and to be carried at lower of cost and fair value, i.e., in case of shares, at lower of cost ( ` 2,50,000) and market value ( ` 2,25,000) as on 31 March 20 X4 , i.e., ` 2,25,000. If equity shares are acquired with an intention to hold for long term period (more than one year), then should be considered as long - term investment to be shown at cost in the Balance Sheet of the company. However, provision for diminution should be made t o recognise a decline, if other than temporary, in the value of the investments. Gold and silver are generally purchased with an intention to hold it for long term period (more than one year) until and unless given otherwise. Hence, the investment in Gold and Silver (purchased on 1 st March, 20 X1 ) should continue to be shown at cost (since there is no ‘other than temporary’ diminution) as on 31 st March, 20 X4 , i.e., ` 4,00,000 and ` 2,00,000 respectively, though their market values have been increased. <PdfRef page={12} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 5 . 90 Illustration 5 In 20X1, M/s. Wye Ltd. issued 12% fully paid debentures of ` 100 each, interest being payable half yearly on 30th September and 31 st March of every accounting year. On 1st December, 20X2, M/s. Bull &amp; Bear purchased 10,000 of these debentures at ` 101 ex - interest price, also paying brokerage @ 1% of ex - interest amount of the purchase. On 1st March, 20X3 the firm sold all these debentures at ` 103 ex - interest price, again paying brokerage @ 1 % of ex - interest amount. Prepare Investment Account in the books of M/s. Bull &amp; Bear for the period 1 st December, 20X2 to 1 st March, 20X3. Solution In the books of M/s Bull &amp; Bear Investment Account for the period from 1 st December 20X2 to 1 st March, 20X3 (Scrip: 12% Debentures of M/s. Wye Ltd.) Date Particulars Nominal Value ( ` ) Interest Cost ( ` ) Date Particulars Nominal Value ( ` ) Interest Cost ( ` ) 1.12.20X2 To Bank A/c (W.N.1) 10,00,000 20,000 10, 2 0,100.20X3 By Bank A/c (W.N.2) 10,00,000 50,000 10,19,700.20X3 To Profit &amp; loss A/c* (b.f.) - 30,000.20X3 By Profit &amp; loss A/c (b.f.) 4 00 10,00,000 50,000 10, 2 0,100 10,00,000 50,000 10, 2 0,100 * This represents income for M/s. Bull &amp; Bear for the period 1 st December, 20X2 to 1 st March, 20X3, i.e., interest for three months - 1 st December, 20X2 to 28 February, 20X3). <PdfRef page={13} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ASSETS BASED ACCOUNTING STANDARDS v v v v 5 . 91 5 . 91 Working Notes: 1. Cost of 12% debentures purchased on.20X2 ` Cost Value (10,000  ` 101) = 10,10,000 Add : Brokerage (1% of ` 10,10,000) = 10,100 Total = 10, 2 0,100 2. Sale proceeds of 12% debentures sold ` Sales Price (10,000  ` 10 3 ) = 10, 3 0,000 Less : Brokerage (1% of ` 10, 3 0,000) = (10, 3 00) T otal = 10,19,700 Illustration 6 On.20X1, Mr. Krishna Murty purchased 1,000 equity shares of ` 100 each in TELCO Ltd. @ ` 120 each from a Broker, who charged 2% brokerage. He incurred 50 paise per ` 100 as cost of shares transfer stamps. On.20X2, Bonus was declared in the ratio of 1: 2. Before and after the record date of bonus shares, the shares were quoted at ` 175 per share and ` 90 per share respectively. On.20X2, Mr. Krishna Murty sold bonus shares to a Broker, who charged 2% brokerage. Show the Investment Account in the books of Mr. Krishna Murty, who held the shares as Current assets and closing value of investments shall be made at Cost or Market value whichever is lower. Solution In the books of Mr. Krishna Murty Investment Account for the year ended 31st March, 20X2 (Scrip: Equity Shares of TELCO Ltd.) Date Particulars Nominal Value ( ` ) Cost ( ` ) Date Particulars Nominal Value ( ` ) Cost ( ` ) 1.4.20X1 To Bank A/c (W.N.1) 1,00,000 1,23,000.20X2 By Bank A/c (W.N.2) 50,000 44,100 <PdfRef page={14} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 5 . 92.20X2 To Bonus shares (W.N.5) 50,000 − 31.3.20X2 By Balance c/d (W.N.4) 1,00,000 82,000.20X2 To Profit &amp; loss A/c (W.N.3) − 3,100 1,50,000 1,26,100 1,50,000 1,26,100 Working Notes: 1. Cost of equity shares purchased on.20X1 = (1,000  ` 120) + (2% of ` 1,20,000) + (½% of ` 1,20,000) = ` 1,23,000 2. Sale proceeds of equity shares (bonus) sold on 31st March, 20X2= (500  ` 90) – (2% of ` 45,000) = ` 44,100. 3. Profit on sale of bonus shares on 31st March, 20X2 = Sale proceeds – Average cost Sale proceeds = ` 44,100 Average cost = ` (1,23,000 /1,50,000) x 50,000 = ` 41,000 Profit = ` 44,100 – ` 41,000 = ` 3,100. 4. Valuation of equity shares on 31st March, 20X2 Cost = ( ` 1,23,000/1,50,000) x 1,00,000 = ` 82,000 Market Value = 1,000 shares × ` 90 = ` 90,000 Closing balance has been valued at ` 82,000 being lower than the market value. 5. Bonus shares do not have any cost. Illustration 7 Mr. X purchased 500 equity shares of ` 100 each in Omega Co. Ltd. for ` 62,500 inclusive of brokerage and stamp duty. Some years later the company resolved to capitalise its profits and to issue to the holders of equity shares, one equity bonus share for every share held by them. Prior to capitalisation, the shares of Omega C o. Ltd. were quoted at ` 175 per share. After the capitalisation, the shares were quoted at ` 92.50 per share. Mr. X. sold the bonus shares and received at ` 90 per share. Prepare the Investment Account in X’s books on average cost basis. <PdfRef page={15} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ASSETS BASED ACCOUNTING STANDARDS v v v v 5 . 93 5 . 93 Solution In the books of X Investment Account [Scrip: Equity shares in Omega Co. Ltd.] Particulars Nominal Value Cost Particulars Nominal Value Cost ` ` ` ` To Cash 50,000 62,500 By Cash - Sale (500 x 90) 50,000 45,000 To Bonus shares (W.N.1) 50,000 - By Balance c/d (W.N. 3) 50,000 31,250 To P &amp; L A/c ( W.N . 2) - 13,750 1,00,000 76,250 1,00,000 76,250 To Balance b/d 50,000 31,250 Working Notes: 1. Bonus shares do not have any cost. 2. Profit on sale of bonus shares = Sales proceeds – Average cost Sales proceeds = ` 45,000 Average cost = 1,000 500  62,500 = ` 31,250 Profit = ` 45,000 – ` 31,250 = ` 13,750. 3. Valuation of Closing Balance of Shares at the end of year The total cost of 1,000 share including bonus is ` 62,500 Therefore, cost of 500 shares (carried forward) is 1,000 500  62,500 = ` 31,250 Market price of 500 shares = 92.50 x 500 = ` 46,250 Cost being lower than the market price, therefore shares are carried forward at cost. <PdfRef page={16} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 5 . 94 Illustration 8 On 1 st April, 20X1, Rajat has 50,000 equity shares of P Ltd. at a book value of ` 15 per share (nominal value ` 10 each). He provides you the further information: (1) On 20 th June, 20X1 he purchased another 10,000 shares of P Ltd. at ` 16 per share. (2) On 1 st August, 20X1, P Ltd. issued one equity bonus share for every six shares held by the shareholders. (3) On 31 st October, 20X1, the directors of P Ltd. announced a right issue which entitles the holders to subscribe three shares for every seven shares at ` 15 per share. Shareholders can transfer their rights in full or in part. Rajat sold 1/3 rd of entitlement to Umang for a consideration of ` 2 per share and subscribed the rest on 5 th November, 20X1. You are required to prepare Investment A/c in the books of Rajat for the year ending 31 st March, 20X2. Solution In the books of Rajat Investment Account (Equity shares in P Ltd.) Date Particulars No. of shares Amount ( ` ) Date Particulars No. of shares Amount ( ` ) 1.4.X1.X1 To Balance b/d To Bank A/c 50,000 10,000 7,50,000 1,60,000.X2 By Balance c/d (Bal. fig.) 90,000 12,10,000.X1 To Bonus issue (W.N.1) 10,000 - 5.11.X1 To Bank A/c (right shares) (W.N.4) 20,000 3,00,000 90,000 12,10,000 90,000 12,10,000 <PdfRef page={17} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ASSETS BASED ACCOUNTING STANDARDS v v v v 5 . 95 5 . 95 Working Notes: (1) Bonus shares = 50,000 + 10,000 6 = 10,000 shares (2) Right shares = 50,000 + 10,000 + 10,000 7 3  = 30,000 shares (3) Sale of rights = 1 30,000 shares× × 3 ` 2= ` 20,000 to be credited to statement of profit and loss (4) Rights subscribed = ` 2 30,000 shares × × 15 3 = ` 3,00,000 Illustration 9 On.20X1, Sundar had 25,000 equity shares of ‘X’ Ltd. at a book value of ` 15 per share (Nominal value ` 10). On.20X1, he purchased another 5,000 shares of the company at ` 16 per share. The directors of ‘X’ Ltd. announced a bonus and rights issue. No dividend was payable on these issues. The terms of the issue are as follows: Bonus basis 1:6 (Date.20X1). Rights basis 3:7 (Date.20X1) Price ` 15 per share. Due date for payment.20X1. Shareholders were entitled to transfer their rights in full or in part. Accordingly, Sundar sold% of his entitlement to Sekhar for a consideration of ` 2 per share. Dividends: Dividends for the year ended.20X1 at the rate of 20% were declared by X Ltd. and received by Sundar on.20X1. Dividends for shares acquired by him on.20X1 are to be adjusted against the cost of purchase. On.20X1, Sundar sold 25,000 equity shares at a premium of ` 5 per share. You are required to prepare in the books of Sundar. (1) Investment Account (2) Profit &amp; Loss Account. For your exercise, assume that the books are closed on.20X1and shares are valued at average cost. <PdfRef page={18} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 5 . 96 Solution Books of Sundar Investment Account (Scrip: Equity Shares in X Ltd.) No. Amount No. Amount ` ` 1.4.20X1.20X1 To Bal b/d To Bank 25,000 5,000 3,75,000 80,000.20X1 By Bank (dividend — 10,000.20X1.20X1 To Bonus (W.N.1) To Bank (Rights Shares) (W.N.3) 5,000 10,000 — 1,50,000 on shares acquired on 20/6/20X1) (W.N.4) 15.11.20X1 To Profit (on sale of shares) 44,444.20X1 By Bank (Sale of shares) 25,000 3,75,000.20X1 By Bal. c/d (W.N.6) 20,000 2,64,444 45,000 6,49,444 45,000 6,49,444 Profit and Loss Account (An extract) To Balance c/d 1,04,444 By Profit transferred 44,444 By Sale of rights (W.N.3) 10,000 By Dividend (W.N.4) 50,000 1,04,444 1,04,444 Working Notes: (1) Bonus Shares = ( ) 25,000+5,000 6 = 5,000 shares (2) Right Shares = ( ) 25,000+5,000+5,000 ×3 7 = 15,000 shares <PdfRef page={19} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ASSETS BASED ACCOUNTING STANDARDS v v v v 5 . 97 5 . 97 (3) Right shares renounced = 15,000×1/3 = 5,000 shares Sale of right shares = 5,000 x 2 = ` 10,000 Right shares subscribed = 15,000 – 5,000 = 10,000 shares Amount paid for subscription of right shar es = 10,000 x 15 = ` 1,50,000 (4) Dividend received = 25,000 (shares as on 1 st April 20X1) × 10 × 20% = ` 50,000 Dividend on shares purchased on.20X1 = 5,000×10×20% = ` 10,000 is adjusted to Investment A/c (5) Profit on sale of 25,000 shares = Sales proceeds – Average cost Sales proceeds = ` 3,75,000 Average cost = ( ) 3,75,000+80,000+1,50,000 -10,000 ×25,000 45,000 = ` 3,30,556 Profit = ` 3,75,000 – ` 3,30,556= ` 44,444. (6) Cost of shares on.20X1 ( ) 3,75,000+80,000+1,50,000 -10,000 ×20,000 45,000 = ` 2,64,444 Reference: The students are also advised to refer the full bare text of <strong>AS 13</strong> (Revised) “ Accounting for <strong>Investments</strong> ”. <PdfRef page={20} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 5 . 98 TEST YOUR KNOWLEDGE Multiple Choice Questions 1. The cost of Right shares is ( a) added to the cost of investments. (b) subtracted from the cost of investments. (c) no treatment is required. (d) added to cost of investments at market value . 2. Long term investments are carried at (a) fair value. (b) cost less ‘other than temporary’ decline. (c) Cost and market value whichever is less. (d) Cost and market value whichever is higher . 3 Current investments are carried at (a) Fair value. (b) cost. (c) Cost and fair value, whichever is less. ( d ) Cost and fair value, whichever is higher . 4. A Ltd. acquired 2,000 equity shares of Omega Ltd. on cum - right basis at ` 75 per share. Subsequently, omega Ltd. made a right issue of 1:1 at ` 60 per share, which was subscribed for by A. Total cost of investments at the year - end will be ` (a) 2,70,000. (b) 1,50,000. (c) 1,20,000. ( d ) 1, 7 0,000. <PdfRef page={21} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ASSETS BASED ACCOUNTING STANDARDS v v v v 5 . 99 5 . 99 5. Cost of investment includes (a) Purchase costs. (b) Brokerage and Stamp duty paid. (c) Both (a) and (b). ( d ) none of the above . Theo r etical Questions 6 . Briefly explain disclosure requirements for <strong>Investments</strong> as per AS - 13. 7 . How will you classify the investments as per <strong>AS 13</strong>? Explain in Brief. 8 . Whether the accounting treatment &apos;at cost&apos; under the head ‘Long Term <strong>Investments</strong>’ without providing for any diminution in value is correct and in accordance with the provisions of <strong>AS 13</strong>. If not, what should have been the accounting treatment in such a sit uation? Explain in brief. Scenario based Questions 9 Mr. X acquires 200 shares of a company on cum - right basis for ` 70,000. He subsequently receives an offer of right to acquire fresh shares in the company in the proportion of 1:1 at ` 107 each. He does not subscribe but sells all the rights for ` 12,000. The market value of the shares after their becoming ex - rights has also gone down to ` 60,000. What should be the accounting treatment in this case? 1 0 . On 1 st April, 20X1, XY Ltd. has 15,000 equity shares of ABC Ltd. at a book value of ` 15 per share (nominal value ` 10 per share). On 1 st June, 20X1, XY Ltd. acquired 5,000 equity shares of ABC Ltd. for ` 1,00,000. ABC Ltd. announced a bonus and right issue. (1) Bonus was declared, at the rate of one equity share for every five shares held, on 1 st July 20X1. (2) Right shares are to be issued to the existing shareholders on 1 st September 20X1. The company will issue one right share for every 6 shares at 20% premium. No dividend was payable on these shares. <PdfRef page={22} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 5 . 100 (3) Dividend for the year ended.20X1 were declared by ABC Ltd. @ 20%, which was received by XY Ltd. on 31 st October 20X1. XY Ltd. (i) Took up half the right issue. (ii) Sold the remaining rights for ` 8 per share. (iii) Sold half of its shareholdings on 1 st January 20X2 at ` 16.50 per share. Brokerage being 1%. You are required to prepare Investment account of XY Ltd. for the year ended 31 st March 20X2 assuming the shares are being valued at average cost. 1 1 . The following information is presented by Mr. Z (a stock broker), relating to his holding in 9% Central Government Bonds. Opening balance (nominal value) ` 1,20,000, Cost ` 1,18,000 (Nominal value of each unit is ` 100). 1.3.20X1 Purchased 200 units, ex - interest at ` 98. 1.7.20X1 Sold 500 units, ex - interest out of original holding at ` 100. 1.10.20X1 Purchased 150 units at ` 98, cum interest. 1.11.20X1 Sold 300 units, ex - interest at ` 99 out of original holdings. Interest dates are 30 th September and 31 st March. Mr. Z closes his books every 31 st December. Show the investment account as it would appear in his books. Mr. Z follows FIFO method. 12 . Mr. Purohit furnishes the following details relating to his holding in 8% Debentures ( ` 100 each) of P Ltd., held as Current assets: 1.4.20X1 Opening balance – Nominal value ` 1,20,000, Cost ` 1,18,000.20X1 100 Debentures purchased ex - interest at ` 98.20X1 Sold 200 Debentures ex - interest at ` 100.20X2 Purchased 50 Debentures at ` 98 ex - interest.20X2 Sold 200 Debentures ex - interest at ` 99 Due dates of interest are 30 th September and 31 st March. <PdfRef page={23} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ASSETS BASED ACCOUNTING STANDARDS v v v v 5 . 101 5 . 101 Mr. Purohit closes his books on.20X2. Brokerage at 1% is to be paid for each transaction (at ex - interest price). Show Investment account as it would appear in his books. Assume FIFO method. Market value of 8% Debentures of P Limited on.20X2 i s ` 99. 13 . On 1 st April, 20X1, Mr. Vijay had 30,000 Equity shares in X Ltd. at a book value of ` 4,50,000 (Face Value ` 10 per share). On 22 nd June, 20X1, he purchased another 5000 shares of the same company for ` 80,000. The Directors of X Ltd. announced a bonus of equity shares in the ratio of one share for seven shares held on 10th August, 20X1. On 31st August, 20X1 the Company made a right issue in the ratio of three shares for every eight shares held, on payment of ` 15 per share. Due date for the payment was 30th September, 20X1, Mr. Vijay subscribed to 2/3rd of the right shares and sold the remaining of his entitlement to Viru for a consideration of ` 2 per share. On 31st October, 20X1, Vijay received dividends from X Ltd. @ 20% for the year ended 31st March, 20X1. Dividend for the shares acquired by him on 22nd June, 20X1 to be adjusted against the cost of purchase. On 15th November, 20X1 Vijay sold 20,000 Equity shares at a premium of ` 5 per share. You are required to prepare Investment Account in the books of Mr. Vijay for the year ended 31st March, 20X2 assuming the shares are being valued at average cost. 14 . Blue - chip Equity <strong>Investments</strong> Ltd., wants to re - classify its investments in accordance with <strong>AS 13</strong> (Revised). State the values, at which the investments have to be reclassified in the following cases: (i) Long term investments in Company A, costing ` 8.5 lakhs are to be re - classified as current. The company had reduced the value of these investments to ` 6.5 lakhs to recognise ‘other than temporary’ decline in value. The fair value on date of transfer is ` 6.8 lakhs. (ii) Long term investments in Company B, costing ` 7 lakhs are to be re - classified as current. The fair value on date of transfer is ` 8 lakhs and book value is ` 7 lakhs. <PdfRef page={24} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 5 . 102 (iii) Current investment in Company C, costing ` 10 lakhs are to be re - classified as long term as the company wants to retain them. The market value on date of transfer is ` 12 lakhs. 15. Gowtham Limited invested in shares of another company (with the intention to hold the shares for short - term period) on 30 th November, 2021 at a cost of ` 4,25,000. It also earlier purchased Gold of ` 8,00,000 and Silver of ` 3,50,000 on 31st March, 20X1. Market values as on 31st March, 20 X4 , of the above investments are as follows: Shares ` 3,50,000 Gold ` 10,25,000 Silver ` 5,10,000 You are required to explain how will the above investments be shown (individually and in total) in the books of account of Gowtham Limited for the year ending 31st March, 20 X4 as per the provisions of <strong>AS 13</strong>. ANSWERS/ SOLUTIONS Answer to the Multiple Choice Questions 1 . (a) 2 . ( b ) 3 . (c) 4 . (a) 5 . (c) Answer to the Theoretical Questions 6 . The disclosure requirements as per <strong>AS 13</strong> (Revised) are as follows: ( i) Accounting policies followed for the determination of carrying amount of investments. (ii) Classification of investment into current and long term. (iii) The amount included in profit and loss statements for (a) Interest, dividends and rentals for long term and current investments, disclosing therein gross income and tax deducted at source thereon; <PdfRef page={25} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ASSETS BASED ACCOUNTING STANDARDS v v v v 5 . 103 5 . 103 (b) Profits and losses on disposal of current investment and changes in carrying amount of such investments; (c) Profits and losses and disposal of long term investments and changes in carrying amount of investments. (iv) Aggregate amount of quoted and unquoted investments, giving the aggregate market value of quoted investments; (v) Any significant restrictions on investments like minimum holding period for sale/disposal, utilisation of sale proceeds or non - remittance of sale proceeds of investment held outside India. (vi) Other disclosures required by the relevant statute governing the enterprises 7 . The investments are classified into two categories as per <strong>AS 13</strong>, viz. , Current <strong>Investments</strong> and Long - term <strong>Investments</strong>. A current Investment is an investment that is by its nature readily realisable and is intended to be held for not more than one year from the date on which such investment is made. The carrying amount for current investments is the lower of cost and fair value. Any reduction to fair value and any reversals of such reductions are included in the statement of profit and loss. A long - term investment is an investment other than a current investment. Long term investments are usually carried at cost. However, when there is a decline, other than temporary, in the value of a long term investment, the carrying amount is reduced to recognise the decline. The reduction in carrying amount is charged to the statement of profit and loss. 8 . The accounting treatment &apos;at cost&apos; under the head &apos;Long Term Investment’ in the financial statements of the company without providing for any diminution in value is correct and is in accordance with the provisions of <strong>AS 13</strong> provided that there is no decline , other than temporary, in the value of investment. If the decline in the value of investment is , other than temporary , compared to the time when the shares were purchased, provision is required to be made. <PdfRef page={26} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 5 . 104 Answer to the Scenario based Questions 9 . As per <strong>AS 13</strong>, where the investments are acquired on cum - right basis and the market value of investments immediately after their becoming ex - right is lower than the cost for which they were acquired, it may be appropriate to apply the sale proceeds of rights to reduce the carrying amount of such investments to the market value. In this case, the amount of the ex - right market value of 200 shares bought by X immediately after the declaration of rights falls to ` 6 0,000. In this case, out of sale proceeds of ` 12,000, ` 10,000 may be applied to reduce the carrying amount to bring it to the market value and ` 2,000 would be credited to the profit and loss account. 1 0 . In the books of XY Ltd. Investment in equity shares of ABC Ltd. for the year ended 31 st March, 20X2 Date Particulars No. Dividend ` Amount ` Date Particulars No. Dividend ` Amount ` 20X1 April 1 To Balance b/d 15,000 - 2,25,000 20X1 Oct. 31 By Bank A/c (W.N. 5) - 30,000 10,000 June 1 To Bank A/c 5,000 -- 1,00,000 20X2 Jan. 1 By Bank A/c (W.N.4) 13,000 - 2,12,355 July 1 To Bonus Issue (W.N. 1) 4,000 - - March 31 By Balance c/d (W.N. 6) 13,000 - 1,69,500 Sept.1 To Bank A/c (W.N. 2) 2,000 - 24,000 20X2 Jan 1 To P &amp; L A/c (W.N. 4) - - 42,855 “20X2 March 31 To P &amp; L A/c - 30,000 - 26,000 30,000 3,91,855 26,000 30,000 3,91,855 <PdfRef page={27} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ASSETS BASED ACCOUNTING STANDARDS v v v v 5 . 105 5 . 105 Working Notes: 1. Calculation of no. of bonus shares issued Bonus Shares = 15,000 shares+5,000 shares 5 x 1= 4,000 shares 2. Calculation of right shares subscribed Right Shares = 15,000 shares+5,000 shares+4,000 shares 6 = 4,000 shares Shares subscribed by XY Ltd. = 4,000 2 = 2,000 shares Value of right shares subscribed = 2,000 shares @ ` 12 per share = ` 24,000 3. Calculation of sale of right entitlement 2,000 shares x ` 8 per share = ` 16,000 Amount received from sale of rights will be credited to statement of profit and loss. 4. Calculation of profit on sale of shares Total holding = 15,000 shares original 5,000 shares purchased 4,000 shares bonus 2,000 shares right shares 26,000 shares 50% of the holdings were sold i.e. 13,000 shares (26,000 x1/2) were sold. Cost of total holdings of 26,000 shares (on average basis) = ` 2,25,000 + ` 1,00,000 + ` 24,000 – ` 10,000 = ` 3,39,000 Average cost of 13,000 shares would be = 3,39,000 ×13,000 26,000 = ` 1,69,500 <PdfRef page={28} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 5 . 106 ` Sale proceeds of 13,000 shares (13,000 x ` 16.50) 2,14,500 Less : 1% Brokerage (2,145) 2,12,355 Less: Cost of 13,000 shares (1,69,500) Profit on sale 42,855 5. Dividend received on investment held as on 1 st April, 20X1 = 15,000 shares x ` 10 x 20% = ` 30,000 will be transferred to Profit and Loss A/c Dividend received on shares purchased on 1 st June, 20X1 = 5,000 shares x ` 10 x 20% = ` 10,000 will be adjusted to Investment A/c Note: It is presumed that no dividend is received o n bonus shares as bonus shares are declared on 1 st July, 20X1 and divid end pertains to the year ended.20X1. 6. Calculation of closing value of shares (on average basis) as on 31 st March, 20X2 3,39,000 13,000× 26,000 = ` 1,69,500 1 1 . In the Books of Mr. Z 9% Central Government Bonds (Investment) Account Particulars Nominal Value Interest Principal Particulars Nominal Value Interest Principal 20X1 ` ` ` 20X1 ` ` ` Jan.1 To Balance b/d (W.N.1) 1,20,000 2,700 1,18,000 Mar . 31 By Bank A/c (W.N.3) - 6,300 - Marc h 1 To Bank A/c (W.N.2) 20,000 750 19,600 July 1 By Bank A/c (W.N.4) 50,000 1,125 50,000 July 1 To P&amp;L A/c (W.N.5) - - 833 Sept. 30 By Bank A/c (W.N.6) - 4,050 - Oct. 1 To Bank A/c (150 x 98) 15,000 - 14,700 Nov. 1 By Bank A/c (W.N.7) 30,000 225 29,700 <PdfRef page={29} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ASSETS BASED ACCOUNTING STANDARDS v v v v 5 . 107 5 . 107 Nov. 1 To P&amp;L A/c (W.N.8) - - 200 Dec. 31 By Balance c/d (W.N. 9 &amp; W.N.10) 75,000 1,688 73,633 Dec. 31 To P&amp;L A/c (b.f.) (Transfer) 9,938 1,55,000 13,388 1,53,333 1,55,000 13,388 1,53,333 Working Note: 1. Interest element in opening balance of bonds = 1,20,000 x 9% x 3/12 = ` 2,700 2. Purchase of bonds on 1. 3.20X1 Interest element in purchase of bonds = 200 x 100 x 9% x 5/12 = ` 750 Investment element in purchase of bonds = 200 x 98 = ` 19,600 3. Interest for half - year ended 31 March = 1,400 x 100 x 9% x 6/12 = ` 6,300 4. Sale of bonds on.20X1 Interest element = 500 x 100 x 9% x 3/12 = ` 1,125 Investment element = 500 x 100 = ` 50,000 5. Profit on sale of bonds on.20X1 Cost of bonds = (1,18,000/ 1,200) x 500 = ` 49,167 Sale proceeds = ` 50,000 Profit element = ` 833 6. Interest for half - year ended 30 September = 900 x 100 x 9% x 6/12 = ` 4,050 7. Sale of bonds on.20X1 Interest element = 300 x 100 x 9% x 1/12 = ` 225 Investment element = 300 x 99 = ` 29,700 8. Profit on sale of bonds on.20X1 Cost of bonds = (1,18,000/ 1,200) x 300 = ` 29,500 Sale proceeds = ` 29,700 Profit element = ` 200 <PdfRef page={30} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 5 . 108 9. Closing value of investment Calculation of closing balance: Nominal value ` Bonds in hand remained in hand at 31 st December 20X1 From original holding (1,20,000 – 50,000 – 30,000) = 40,000 40,000 1,20,000 1,18,000  39,333 Purchased on 1st March 20,000 19,600 Purchased on 1 st October 15,000 14,700 75,000 73,633 10. Interest element in closing balance of bonds = 750 x 100 x 9% x 3/12 = ` 1,688 12 . Investment A/c of Mr. Purohit for the year ending on 31 - 3 - 20X2 (Scrip: 8% Debentures of P Limited) (Interest Payable on 30 th September and 31 st March) Date Particulars Nominal Value Interest Cost Date Particulars Nominal Value Interest Cost ` ` ` ` 1.4.20X1 To Balance b/d 1,20,000 - 1,18,000.20X1 By Bank (1,300 x 100 x 8% x 6/12) - 5,200 - 1.7.20X1 To Bank (ex - Interest) (W.N.1) 10,000 200 9,898.20X1 By Bank (W.N.4) 20,000 - 19,800.20X1 To Profit &amp; Loss A/c (W.N.4) 133.20X2 By Bank (ex - Interest) (W.N.5) 20,000 533 19,602 <PdfRef page={31} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ASSETS BASED ACCOUNTING STANDARDS v v v v 5 . 109 5 . 109.20X2 To Bank (ex - Interest) (W.N.2) 5,000 100 4,949.20X2 By Profit &amp; Loss A/c (W.N.5) 64.20X2 To Profit &amp; Loss A/c (Bal. fig.) - 9,233.20X2 By Bank (950 x 100 x 8% x 6/12) - 3,800 - 31.3.20X2 By Balance c/d (W.N.3) 95,000 - 93,514 1,35,000 9,533 1,32,980 1,35,000 9,533 1,32,980 Working Notes: 1. Purchase of debentures on.20X1 Interest element = 100 x 100 x 8% x 3/12 = ` 200 Investment element = (100 x 98) + [1% (100 x 98)] = ` 9,898 2. Purchase of debentures on.20X2 Interest element = 50 x 100 x 8% x 3/12 = ` 100 Investment element = {"{"}(50 x 98) + [1%(50 x 98)]{"}"} = ` 4,949 3. Valuation of closing balance as on.20X2: Market value of 950 Debentures at ` 99 = ` 94,050 Cost of 800 Debentures cost = 1,18,000 x80,000 1,20,000       = 78,667 100 Debentures cost = 9,898 50 Debentures cost = 4,949 93,514 Value at the end = ` 93,514, i.e., whichever is less 4. Profit on sale of debentures as on.20X1 ` Sales price of debentures (200 x ` 100) 20,000 <PdfRef page={32} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 5 . 110 Less : Brokerage @ 1% (200) 19,800 Less : Cost of Debentures =       x20,000 1,20,000 1,18,000 (19,667) Profit on sale 133 5. Loss on sale of debentures as on.20X2 ` Sales price of debentures (200 x ` 99) 19,800 Less : Brokerage @ 1% (198) 19,602 Less : Cost of Debentures =       x20,000 1,20,000 1,18,000 <PdfRef page={33} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            (19,666 ) Loss on sale 64 Interest element in sale of investment = 200 x 100 x 8% x 4/12 ` 533 13 . Investment Account in Books of Vijay (Scrip: Equity Shares in X Ltd.) No. Amount No. Amount ` ` 1.4.20X1.20X1 To Bal b/d To Bank 30,000 5,000 4,50,000 80,000.20X1 By Bank (dividend on shares acquired on.20X1) — 10,000.20X1 To Bonus 5,000 _.20X1 To Bank (Rights Shares) 10,000 1,50,000 <PdfRef page={33} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ASSETS BASED ACCOUNTING STANDARDS v v v v 5 . 111 5 . 111.20X1 To P&amp;L A/c (Profit 32,000.20X1 By Bank 20,000 3,00,000 on sale of shares) (Sale of shares) 31.3.20X2 By Bal. c/d 30,000 4,02,000 50,000 7,12,000 50,000 7,12,000 Working Notes: (1) Bonus Shares = (30,000 + 5,000) / 7 = 5,000 shares (2) Right Shares = ( ) 30,000 5,000 5,000 3 8 + +  = 15,000 shares (3) Rights shares sold = 15,000×1/3 = 5,000 shares (4) Dividend received = 30,000×10×20% = ` 60,000 will be taken to P&amp;L statement (5) Dividend on shares purchased on.20X1 = 5,000×10×20% = ` 10,000 is adjusted to Investment A/c (6) Profit on sale of 20,000 shares = Sales proceeds – Average cost Sales proceeds = ` 3,00,000 Average cost = ( ) 4,50,000 + 80,000 + 1,50,000 - 10,000 × 20,000 50,000 = ` 2,68,000 Profit = ` 3,00,000 – ` 2,68,000= ` 32,000. (7) Cost of shares on.20X2 ( ) 4,50,000 + 80,000 + 1,50,000 - 10,000 × 30,000 50,000 = ` 4,02,000 (8) Sale of rights amounting ` 10,000 ( ` 2 x 5,000 shares) will not be shown in investment A/c but will directly be taken to P &amp; L statement. 14 . As per <strong>AS 13</strong> (Revised) ‘Accounting for <strong>Investments</strong>’, where long - term investments are reclassified as current investments, transfers are made at the <PdfRef page={34} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 5 . 112 lower of cost and carrying amount at the date of transfer . And where investments are reclassified from current to long term, transfers are made at lower of cost and fair value on the date of transfer. Accordingly, the re - classification will be done on the following basis: (i) In this case, carrying amount of investment on the date of transfer is less than the cost; hence this re - classified current investment should be carried at ` 6.5 lakhs in the books. (ii) The carrying / book value of the long term investment is same as cost i.e. ` 7 lakhs. Hence this long term investment will be reclassified as current investment at book value of ` 7 lakhs only. (iii) In this case, reclassification of current investment into long - term investments will be made at ` 10 lakhs as cost is less than its market value of ` 12 lakhs. 1 5 . As per <strong>AS 13</strong> (Revised) ‘Accounting for <strong>Investments</strong>’, for investment in shares - if the investment is purchased with an intention to hold for short - term period (less than one year), then it will be classified as current investment and to be carried at lower of cost and fair value, i.e., in case of shares, at lower of cost ( ` 4,25,000) and market value ( ` 3,50,000) as on 31 March 20 X4 , i.e., ` 3,50,000. Gold and silver are generally purchased with an intention to hold it for long term period (more than one year) until and unless given otherwise. Hence, the investment in Gold and Silver (purchased on 31 st March, 20 X1 ) should continue to be shown at cost (since there is no ‘other than temporary’ diminution) as on 31 st March, 20 X4 , i.e., ` 8,00,000 and ` 3,50,000 respectively, though their market values have been increased. Thus the shares, gold and silver will be shown at ` 3,50,000, ` 8,00,000 and ` 3,50,000 respectively and hence, total investment will be valued at ` 15,00,000 for the year ending on 31st March, 20 X4 as per <strong>AS 13</strong>. <PdfRef page={35} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 13**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 13, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
