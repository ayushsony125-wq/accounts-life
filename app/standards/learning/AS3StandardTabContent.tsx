'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, ChevronDown } from 'lucide-react'

export const as3Sections = [
  { id: 'as-3-intro-sec', title: '1. Introduction & Objectives' },
  { id: 'as-3-introduction', title: '2.1 INTRODUCTION' },
  { id: 'as-3-objective', title: '2.2 OBJECTIVE' },
  { id: 'as-3-meaning-of-the-term-cash-and-cash', title: '2.3 MEANING OF THE TERM CASH AND CASH' },
  { id: 'as-3-meaning-of-the-term-cash-flow', title: '2.4 MEANING OF THE TERM CASH FLOW' },
  { id: 'as-3-types-of-cash-flow', title: '2.5 TYPES OF CASH FLOW' },
  { id: 'as-3-identifying-type-of-cash-flows', title: '2.6 IDENTIFYING TYPE OF CASH FLOWS' },
  { id: 'as-3-reporting-cash-flows-from-operating', title: '2.7 REPORTING CASH FLOWS FROM OPERATING' },
  { id: 'as-3-reporting-cash-flows-on-net-basis', title: '2.8 REPORTING CASH FLOWS ON NET BASIS' },
  { id: 'as-3-business-purchase', title: '2.9 BUSINESS PURCHASE' },
  { id: 'as-3-exchange-gains-and-losses', title: '2.10 EXCHANGE GAINS AND LOSSES' },
  { id: 'as-3-disclosures', title: '2.11 DISCLOSURES' }
];

interface AS3StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function AS3StandardTabContent({ navigateToPdfPage }: AS3StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as-3-intro-sec');
  const tocScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(id);
    const stickyToc = document.getElementById('as-3-standard-sticky-toc');
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

      as3Sections.forEach((sec) => {
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
      <div id="as-3-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as3Sections.map(sec => (
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
        <section id="as-3-intro-sec" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-3-intro-sec" num="1" title="1. Introduction &amp; Objectives" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED v v v v 4.17 UNIT 2: ACCOUNTING STANDARD 3CASH FLOW STATEMENT After studying this unit, you will be able to comprehend –  What are Cash and Cash Equivalents  Presentation of a Cash Flow Statement  Reporting Cash Flows from Operating Activities  Reporting Cash Flows from Investing and Financing Activities  Reporting Cash Flows on a Net Basis  Foreign Currency Cash Flows  Extraordinary Items  Interest and Dividends  Taxes on Income  Non-Cash Transactions. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 3**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 3, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
        <section id="as-3-introduction" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-3-introduction" num="2.1" title="INTRODUCTION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            This Standard is mandatory for Non-SMCs (Non Small &amp; Medium Companies) and the enterprises which fall in the category of Level I (for non-corporate entities), at the end of the relevant accounting period. For all other enterprises though it is not compulsory but it is encouraged to prepare such statements. However, the Companies Act, 2013, mandates preparation of Cash flow statement by all companies except one person company, small company and dormant company (refer note below). Where an enterprise was not covered by this statement during the previous year but qualifies in the current accounting year, they are not supposed to disclose the figures for the corresponding previous years. Whereas, if an enterprises qualifies <PdfRef page={1} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            under this statement to prepare the cash flow statements during the previous year but now disqualified, will continue to prepare cash flow statements for another two consecutive years. Note : Under Section 129 of the Companies Act, 2013, the financial statement, with respect to One Person Company, small company and dormant company, may not include the cash flow statement. As per the Amendment, under Chapter I, clause (40) of section 2, an exemption has been provided vide Notification dated 13th June, 2017 under Section 462 of the Companies Act 2013 to a startup private company besides one person company, small company and dormant company. As per the amendment, a startup private company is not required to include the cash flow statement in the financial statements. Thus the financial statements, with respect to one person company, small company, dormant company and private company (if such a private company is a start-up), may not include the cash flow statement. <PdfRef page={2} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 3**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 3, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.2 OBJECTIVE */}
        <section id="as-3-objective" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-3-objective" num="2.2" title="OBJECTIVE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Cash flow Statement (CFS) is an additional information provided to the users of accounts in the form of an statement, which reflects the various sources from where cash was generated (inflow of cash) by an enterprise during the relevant accounting year and how these inflows were utilised (outflow of cash) by the enterprise. This helps the users of accounts:  To identify the historical changes in the flow of cash &amp; cash equivalents.  To determine the future requirement of cash &amp; cash equivalents.  To assess the ability to generate cash &amp; cash equivalents.  To estimate the further requirement of generating cash &amp; cash equivalents.  To compare the operational efficiency of different enterprises.  To study the insolvency and liquidity position of an enterprise.  As an indicator of amount, timing and certainty of future cash flows.  To check the accuracy of past assessments of future cash flows  In examining the relationship between profitability and net cash flow and the impact of changing prices. <PdfRef page={2} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED v v v v 4.19 <PdfRef page={3} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 3**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 3, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.3 MEANING OF THE TERM CASH AND CASH */}
        <section id="as-3-meaning-of-the-term-cash-and-cash" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-3-meaning-of-the-term-cash-and-cash" num="2.3" title="MEANING OF THE TERM CASH AND CASH" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            EQUIVALENTS FOR CASH FLOW STATEMENTS Cash and cash equivalents for the purpose of cash flow statement consists of the following: (a) Cash in hand and deposits repayable on demand with any bank or other financial institutions and (b) Cash equivalents, which are short term, highly liquid investments that are readily convertible into known amounts of cash and are subject to insignificant risk of change in value. A short-term investment is one, which is due for maturity within three months from the date of acquisition. <strong>Investments</strong> in shares are not normally taken as cash equivalent, because of uncertainties associated with them as to realisable value. Note: For the purpose of cash flow statement, ‘cash and cash equivalent’ consists of at least three balance sheet items, viz. cash in hand; demand deposits with banks and investments regarded as cash equivalents. For this reason, the <strong>AS 3</strong> requires enterprises to give a break-up of opening and closing cash shown in their cash flow statements. This is presented as a note to cash flow statement. <PdfRef page={3} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 3**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 3, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.4 MEANING OF THE TERM CASH FLOW */}
        <section id="as-3-meaning-of-the-term-cash-flow" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-3-meaning-of-the-term-cash-flow" num="2.4" title="MEANING OF THE TERM CASH FLOW" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Cash flows are inflows (i.e. receipts) and outflows (i.e. payments) of cash and cash equivalents. Any transaction, which does not result in cash flow, should not be reported in the cash flow statement. Movements within cash or cash equivalents are not cash flows because they do not change cash as defined by <strong>AS 3</strong>, which is sum of cash, bank and cash equivalents. For example, acquisitions of cash equivalent investments or cash deposited into bank are not cash flows. It is important to note that a change in cash does not necessarily imply cash flow. For example: Suppose an enterprise has a bank balance of USD 10,000, stated in books at `4,90,000 using the rate of exchange `49/USD prevailing on date of receipt of dollars. If the closing rate of exchange is `50/USD, the bank balance will be restated at `5,00,000 on the balance sheet date. The increase is, however, not a cash flow because neither there is any cash inflow nor there is any cash outflow. <PdfRef page={3} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 3**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 3, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.5 TYPES OF CASH FLOW */}
        <section id="as-3-types-of-cash-flow" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-3-types-of-cash-flow" num="2.5" title="TYPES OF CASH FLOW" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Cash flows for an enterprise occur in various ways, e.g. through operating income or expenses, by borrowing or repayment of borrowing or by acquisition or disposal of fixed assets. The implication of each type of cash flow is clearly different. Cash received on disposal of a useful fixed asset is likely to have adverse effect on future performance of the enterprise and it is completely different from cash received through operating income or cash received through borrowing. It may also be noted that implications of each cash flow types are interrelated. For example, borrowed cash used for meeting operating expenses is not same as borrowed cash used for acquisition of useful fixed assets. For the aforesaid reasons, the standard identifies three types of cash flows, i.e. i. operating cash flows; ii. investing cash flows; and iii. financing cash flows. Separate presentation of each type of cash flow in the cash flow statement improves usefulness of cash flow information. The operating cash flows are cash flows generated by operating activities or by other activities that are not investing or financing activities. Operating activities are the principal revenue-producing activities of the enterprise. Examples include, cash purchase and sale of goods, collections from customers for goods, payment to suppliers of goods, payment of salaries, wages etc. The investing cash flows are cash flows generated by investing activities. The investing activities are the acquisition and disposal of long-term assets and other investments not included in cash equivalents. The examples of investing cash flows include cash flow arising from investing activities include: (a) receipts from disposals of fixed assets; (b) loan given to / recovered from other entities (other than loans by financial enterprises) (c) payments to acquire fixed assets (d) Interests and dividends earned (other than interests and dividends earned by financial institutions). The financing cash flows are cash flows generated by financing activities. Financing activities are activities that result in changes in the size and composition of the owners’ capital (including preferences share capital in the case of company) <PdfRef page={4} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED v v v v 4.21 and borrowings of the enterprise. Examples include issue of shares / debentures, redemption of debentures / preference shares, payment of dividends and payment of interests (other than interests paid by financial institutions). <PdfRef page={5} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 3**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 3, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.6 IDENTIFYING TYPE OF CASH FLOWS */}
        <section id="as-3-identifying-type-of-cash-flows" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-3-identifying-type-of-cash-flows" num="2.6" title="IDENTIFYING TYPE OF CASH FLOWS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Classification of Cash Flows Cash flow type depends on the business of the enterprise and other factors. For example, since principal business of financial enterprises consists of borrowing, lending and investing, loans given and interests earned are operating cash flows for financial enterprises and investing cash flows for other enterprises. A few typical cases are discussed below. 2.6.1 Loans/Advances given and Interests earned (a) Loans and advances given and interests earned on them in the ordinary course of business are operating cash flows for financial enterprises. (b) Loans and advances given and interests earned on them are investing cash flows for non-financial enterprises. (c) Loans and advances given to subsidiaries and interests earned on them are investing cash flows for all enterprises. (d) Loans and advances given to employees and interests earned on them are operating cash flows for all enterprises. (e) Advance payments to suppliers and interests earned on them are operating cash flows for all enterprises. Net Cash Flows Operating Activities Direct Method Indirect Method Investing Activities Direct Method Financing Activities Direct Method <PdfRef page={5} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            (f) Interests earned from customers for late payments are operating cash flows for non-financial enterprises. 2.6.2 Loans/Advances taken and interests paid (a) Loans and advances taken and interests paid on them in the ordinary course of business are operating cash flows for financial enterprises. (b) Loans and advances taken and interests paid on them are financing cash flows for non-financial enterprises. (c) Loans and advances taken from subsidiaries and interests paid on them are financing cash flows for all enterprises. (d) Advance taken from customers and interests paid on them are operating cash flows for non-financial enterprises. (e) Interests paid to suppliers for late payments are operating cash flows for all enterprises. (f) Interests taken as part of inventory costs in accordance with <strong>AS 16</strong> are operating cash flows. 2.6.3 <strong>Investments</strong> made and dividends earned (a) <strong>Investments</strong> made and dividends earned on them in the ordinary course of business are operating cash flows for financial enterprises. (b) <strong>Investments</strong> made and dividends earned on them are investing cash flows for non-financial enterprises. (c) <strong>Investments</strong> in subsidiaries and dividends earned on them are investing cash flows for all enterprises. 2.6.4 Dividends Paid Dividends paid are financing cash outflows for all enterprises. 2.6.5 Income Tax (a) Tax paid on operating income is operating cash outflows for all enterprises (b) Tax deducted at source against income are operating cash outflows if <PdfRef page={6} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED v v v v 4.23 concerned incomes are operating incomes and investing cash outflows if the concerned incomes are investment incomes, e.g. interest earned. (c) Tax deducted at source against expenses are operating cash inflows if concerned expenses are operating expenses and financing cash inflows if the concerned expenses are financing expenses, e.g. interests paid. 2.6.6 Insurance claims received (a) Insurance claims received against loss of stock or loss of profits are extraordinary operating cash inflows for all enterprises. (b) Insurance claims received against loss of fixed assets are extraordinary investing cash inflows for all enterprises. <strong>AS 3</strong> requires separate disclosure of extraordinary cash flows, classifying them as cash flows from operating, investing or financing activities, as may be appropriate. <PdfRef page={7} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 3**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 3, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.7 REPORTING CASH FLOWS FROM OPERATING */}
        <section id="as-3-reporting-cash-flows-from-operating" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-3-reporting-cash-flows-from-operating" num="2.7" title="REPORTING CASH FLOWS FROM OPERATING" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ACTIVITIES Net cash flow from operating activities can be reported either as direct method or as indirect method. In ‘Direct method’ we take the gross receipts from sales, trade receivables and other operating inflows subtracted by gross payments for purchases, creditors and other expenses ignoring all non-cash items like depreciation, provisions. In ‘Indirect method’ we start from the net profit or loss figure, eliminate the effect of any non-cash items, investing items and financing items from such profit figure i.e. all such expenses like depreciation, provisions, interest paid, loss on sale of assets etc. are added and interest received etc. are deducted. Adjustment for changes in working capital items are also made ignoring cash and cash equivalent to reach to the figure of net cash flow. Direct method is preferred over indirect because, direct method gives us the clear picture of various sources of cash inflows and outflows which helps in estimating the future cash inflows and outflows. <PdfRef page={7} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Below is the format for Cash Flow Statement (Illustrative): Cash Flow Statement of X Ltd. for the year ended March 31, 20X1 (Direct Method) Particulars ` ` Operating Activities: Cash received from sale of goods xxx Cash received from Trade receivables xxx Cash received from sale of services xxx xxx Less: Payment for Cash Purchases xxx Payment to Trade payables xxx Payment for Operating Expenses xxx (e.g. power, rent, electricity) Payment for wages &amp; salaries xxx Payment for Income Tax xxx xxx xxx Adjustment for Extraordinary Items xxx Net Cash Flow from Operating Activities xxx Cash Flow Statement of X Ltd. for the year ended March 31, 20X1 (Indirect Method) Particulars ` ` Operating Activities: Closing balance of Profit &amp; Loss Account xxx Less: Opening balance of Profit &amp; Loss Account xxx xxx <PdfRef page={8} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED v v v v 4.25 Reversal of the effects of Profit &amp; Loss Appropriation Account xxx Add: Provision for Income Tax xxx Effects of Extraordinary Items xxx Net Profit Before Tax and Extraordinary Items xxx Reversal of the effects of non-cash and non-operating items xxx Effects for changes in Working Capital except cash &amp; cash equivalent xxx xxx Less : Payment of Income Tax xxx xxx Adjustment for Extraordinary Items xxx Net Cash Flow from Operating Activities xxx Profit or loss on disposal of fixed assets Profit or loss on sale of fixed asset is not operating cash flow. The entire proceeds of such transactions should be taken as cash inflow from investing activity. Fundamental techniques of cash flow preparation A cash flow statement is a summary of cash receipts and payments of an enterprise during an accounting period. Any attempt to compile such a summary from cashbooks is impractical due to the large volume of transactions. Fortunately, it is possible to compile such a summary by comparing financial statements at the beginning and end of accounting period. <PdfRef page={9} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 3**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 3, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.8 REPORTING CASH FLOWS ON NET BASIS */}
        <section id="as-3-reporting-cash-flows-on-net-basis" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-3-reporting-cash-flows-on-net-basis" num="2.8" title="REPORTING CASH FLOWS ON NET BASIS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            <strong>AS 3</strong> forbids netting of receipts and payments from investing and financing activities. Thus, cash paid on purchase of fixed assets should not be shown net of cash realised from sale of fixed assets. For example, if an enterprise pays `50,000 in acquisition of machinery and realises `10,000 on disposal of furniture, it is not right to show net cash outflow of `40,000. The exceptions to this rule are stated below. <PdfRef page={9} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Cash flows from the following operating, investing or financing activities may be reported on a net basis. (a) Cash receipts and payments on behalf of customers, e.g. cash received and paid by a bank against acceptances and repayment of demand deposits. (b) Cash receipts and payments for items in which the turnover is quick, the amounts are large and the maturities are short, e.g. purchase and sale of investments by an investment company. <strong>AS 3</strong> permits financial enterprises to report cash flows on a net basis in the following three circumstances. (a) Cash flows on acceptance and repayment of fixed deposits with a fixed maturity date (b) Cash flows on placement and withdrawal deposits from other financial enterprises (c) Cash flows on advances/loans given to customers and repayments received therefrom. Interest and Dividends Cash flows from interest and dividends received and paid should each be disclosed separately. Cash flows arising from interest paid and interest and dividends received in the case of a financial enterprise should be classified as cash flows arising from operating activities. In the case of other enterprises, cash flows arising from interest paid should be classified as cash flows from financing activities while interest and dividends received should be classified as cash flows from investing activities. Dividends paid should be classified as cash flows from financing activities. Non-Cash transactions Investing and financing transactions that do not require the use of cash or cash equivalents, e.g. issue of bonus shares, should be excluded from a cash flow statement. Such transactions should be disclosed elsewhere in the financial statements in a way that provides all the relevant information about these investing and financing activities. <PdfRef page={10} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED v v v v 4.27 <PdfRef page={11} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 3**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 3, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.9 BUSINESS PURCHASE */}
        <section id="as-3-business-purchase" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-3-business-purchase" num="2.9" title="BUSINESS PURCHASE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The aggregate cash flows arising from acquisitions and disposals of subsidiaries or other business units should be presented separately and classified as cash flow from investing activities. (a) The cash flows from disposal and acquisition should not be netted off. (b) An enterprise should disclose, in aggregate, in respect of both acquisition and disposal of subsidiaries or other business units during the period each of the following: (i) The total purchase or disposal consideration; and (ii) The portion of the purchase or disposal consideration discharged by means of cash and cash equivalents. Treatment of current assets and liabilities taken over on business purchase Business purchase is not operating activity. Thus, while taking the differences between closing and opening current assets and liabilities for computation of operating cash flows, the closing balances should be reduced by the values of current assets and liabilities taken over. This ensures that the differences reflect the increases/decreases in current assets and liabilities due to operating activities only. <PdfRef page={11} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 3**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 3, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.10 EXCHANGE GAINS AND LOSSES */}
        <section id="as-3-exchange-gains-and-losses" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-3-exchange-gains-and-losses" num="2.10" title="EXCHANGE GAINS AND LOSSES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The foreign currency monetary assets (e.g. balance with bank, debtors etc.) and liabilities (e.g. creditors) are initially recognised by translating them into reporting currency by the rate of exchange transaction date. On the balance sheet date, these are restated using the rate of exchange on the balance sheet date. The difference in values is exchange gain/loss. The exchange gains and losses are recognised in the statement of profit and loss. The exchange gains/losses in respect of cash and cash equivalents in foreign currency (e.g. balance in foreign currency bank account) are recognised by the principle aforesaid, and these balances are restated in the balance sheet in reporting currency at rate of exchange on balance sheet date. The change in cash <PdfRef page={11} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            or cash equivalents due to exchange gains and losses are, however, not cash flows. This being so, the net increases/decreases in cash or cash equivalents in the cash flow statements are stated exclusive of exchange gains and losses. The resultant difference between cash and cash equivalents as per the cash flow statement and that recognised in the balance sheet is reconciled in the note on cash flow statement. <PdfRef page={12} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 3**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 3, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.11 DISCLOSURES */}
        <section id="as-3-disclosures" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-3-disclosures" num="2.11" title="DISCLOSURES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            <strong>AS 3</strong> requires an enterprise to disclose the amount of significant cash and cash equivalent balances held by it but not available for its use, together with a commentary by management. This may happen for example, in case of bank balances held in other countries subject to such exchange control or other regulations that the fund is practically of no use. <strong>AS 3</strong> encourages disclosure of additional information, relevant for understanding the financial position and liquidity of the enterprise together with a commentary by management. Such information may include: (a) The amount of undrawn borrowing facilities that may be available for future operating activities and to settle capital commitments, indicating any restrictions on the use of these facilities; and (b) The aggregate amount of cash flows required for maintaining operating capacity, e.g. purchase of machinery to replace the old, separately from cash flows that represent increase in operating capacity, e.g. additional machinery purchased to increase production. Illustration 1 Classify the following activities as (a) Operating Activities, (b) Investing Activities, (c) Financing Activities (d) Cash Equivalents. (a) Purchase of Machinery. (b) Proceeds from issuance of equity share capital (c) Cash Sales. (d) Proceeds from long-term borrowings. (e) Cheques collected from Trade receivables. <PdfRef page={12} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED v v v v 4.29 (f) Cash receipts from Trade receivables. (g) Trading Commission received. (h) Purchase of investment. (i) Redemption of Preference Shares. (j) Cash Purchases. (k) Proceeds from sale of investment (l) Purchase of goodwill. (m) Cash paid to suppliers. (n) Interim Dividend paid on equity shares. (o) Wages and salaries paid. (p) Proceed from sale of patents. (q) Interest received on debentures held as investment. (r) Interest paid on Long-term borrowings. (s) Office and Administration Expenses paid (t) Manufacturing Overheads paid. (u) Dividend received on shares held as investments. (v) Rent Received on property held as investment. (w) Selling and distribution expense paid. (x) Income tax paid (y) Dividend paid on Preference shares. (z) Underwritings Commission paid. (aa) Rent paid. (bb) Brokerage paid on purchase of investments. (cc) Bank Overdraft (dd) Cash Credit (ee) Short-term Deposits <PdfRef page={13} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            (ff) Highly liquid Marketable Securities (without risk of change in value) (gg) Refund of Income Tax received. Solution (a) Operating Activities: c, e, f, g, j, m, o, s, t, w, x, aa &amp; gg. (b) Investing Activities: a, h, k, l, p, q, u, v, bb &amp; ee. (c) Financing Activities: b, d, i, n, r, y, z, cc &amp; dd. (d) Cash Equivalent: ff. Illustration 2 X Ltd. purchased debentures of `10 lacs of Y Ltd., which are redeemable within three months. How will you show this item as per <strong>AS 3</strong> while preparing cash flow statement for the year ended on 31st March, 20X1? Solution As per <strong>AS 3</strong> on ‘Cash flow Statement’, cash and cash equivalents consists of cash in hand, balance with banks and short-term, highly liquid investments. If investment, of `10 lacs, made in debentures is for short-term period then it is an item of ‘cash equivalents’. However, if investment of `10 lacs made in debentures is for long-term period then as per <strong>AS 3</strong>, it should be shown as cash flow from investing activities. Illustration 3 Classify the following activities as per <strong>AS 3</strong> Cash Flow Statement: (i) Interest paid by financial enterprise (ii) Tax deducted at source on interest received from subsidiary company (iii) Deposit with Bank for a term of two years (iv) Insurance claim received towards loss of machinery by fire (v) Bad debts written off As per <strong>AS 3</strong>, an investment normally qualifies as a cash equivalent only when it has a short maturity of, say three months or less from the date of acquisition and is subject to insignificant risk of change in value. <PdfRef page={14} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED v v v v 4.31 Solution (i) Interest paid by financial enterprise Cash flows from operating activities (ii) TDS on interest received from subsidiary company Cash flows from investing activities (iii) Deposit with bank for a term of two years Cash flows from investing activities (iv) Insurance claim received against loss of fixed asset by fire Extraordinary item to be shown as a separate heading under ‘Cash flow from investing activities’ (v) Bad debts written off It is a non-cash item which is adjusted from net profit/loss under indirect method, to arrive at net cash flow from operating activity. Illustration 4 Following is the cash flow abstract of Alpha Ltd. for the year ended 31st March, 20X1: Cash Flow (Abstract) Inflows ` Outflows ` Opening balance: Cash 10,000 Payment for Account Payables 90,000 Bank 70,000 Salaries and wages 25,000 Share capital – shares issued 5,00,000 Payment of overheads 15,000 Collection on account of Trade Receivables 3,50,000 Property, plant and equipment acquired Debentures redeemed 4,00,000 50,000 Sale of Property, plant and equipment 70,000 Bank loan repaid 2,50,000 Taxation 55,000 Dividends 1,00,000 Closing balance: <PdfRef page={15} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Cash 5,000 bank 10,000 10,00,000 10,00,000 Prepare Cash Flow Statement for the year ended 31st March, 20X1in accordance with <strong>Accounting Standard</strong> 3. Solution Cash Flow Statement for the year ended 31.3.20X1 ` ` Cash flow from operating activities Cash received on account of trade receivables 3,50,000 Cash paid on account of trade payables (90,000) Cash paid to employees (salaries and wages) (25,000) Other cash payments (overheads) (15,000) Cash generated from operations 2,20,000 Income tax paid (55,000) Net cash generated from operating activities 1,65,000 Cash flow from investing activities Payment for purchase of Property, plant and equipment (4,00,000) Proceeds from sale of Property, plant and equipment 70,000 Net cash used in investment activities (3,30,000) Cash flow from financing activities Proceeds from issue of share capital 5,00,000 Bank loan repaid (2,50,000) Debentures redeemed (50,000) Dividends paid (1,00,000) Net cash used in financing activities 1,00,000 Net decrease in cash and cash equivalents (65,000) Cash and cash equivalents at the beginning of the year 80,000 Cash and cash equivalents at the end of the year 15,000 <PdfRef page={16} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED v v v v 4.33 Illustration 5 Prepare Cash Flow from Investing Activities of M/s. Creative Furnishings Limited for the year ended 31-3-20X1. Particulars ` Plant acquired by the issue of 8% Debentures 1,56,000 Claim received for loss of plant in fire 49,600 Unsecured loans given to subsidiaries 4,85,000 Interest on loan received from subsidiary companies 82,500 Pre-acquisition dividend received on investment made 62,400 Debenture interest paid 1,16,000 Term loan repaid 4,25,000 Interest received on investment 68,000 (TDS of ` 8,200 was deducted on the above interest) Book value of plant sold (loss incurred ` 9,600) 84,000 Solution Cash Flow Statement from Investing Activities of M/s Creative Furnishings Limited for the year ended 31-03-20X1 Cash generated from investing activities ` ` Interest on loan received Pre-acquisition dividend received on investment made Unsecured loans given to subsidiaries 82,500 62,400 (4,85,000) Interest received on investments (gross value) TDS deducted on interest 76,200 (8,200) Sale of plant Cash used in investing activities (before extra ordinary item) Extraordinary claim received for loss of plant 74,400 (1,97,700) 49,600 Net cash used in investing activities (after extra ordinary item) (1,48,100) <PdfRef page={17} />
          </p>
          <NB type="info" title="Practical Note">
            1. Debenture interest paid and Term Loan repaid are financing activities and, therefore, not considered for preparing cash flow from investing activities. 2. Plant acquired by issue of 8% debentures does not amount to cash outflow, hence also not considered in the above cash flow statement. Note: For details regarding preparation of Cash Flow Statement and Problems based on practical application of AS 3, students are advised to refer unit 2 of Chapter 11. Reference: The students are advised to refer the full text of AS 3 “Cash Flow Statement. TEST YOUR KNOWLEDGE Multiple Choice Questions 1. Crown Ltd. wants to prepare its cash flow statement. It sold equipment of book value of ` 60,000 at a gain of ` 8,000. The amount to be reported in its cash flow statement under operating activities is (a) Nil (b) ` 8,000 (c) ` 68,000 (d) ` 60,000 2. While preparing cash flows statement, an entity (other than a financial institution) should disclose the dividends received from its investment in shares as (a) operating cash inflow (b) investing cash inflow (c) financing cash inflow (d) cash &amp; cash equivalent <PdfRef page={18} />
          </NB>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED v v v v 4.35 3. XYZ Co. is a financial enterprise. In its cash flow statement, interest paid and dividends received should be (a) classified as operating cash flows. (b) classified as financing cash flows. (c) Not shown in cash flow statement. (d) classified as investing cash flows. 4. In the cash flow statement, ‘cash and cash equivalents’ donot include (a) Bank balances . (b) Short-term investments readily convertible into Cash are subject to an insignificant risk of changes in value. (c) Cash balances. (d) Loan from bank. 5. While preparing a Cash Flow Statement using the Indirect method as required under <strong>AS 3</strong>, which of the following will not be deducted from/added to the Net Profit to arrive at the “Cash flow from Operating activities”? (a) Interest income (b) Gain on sale of a fixed asset. (c) Depreciation. (d) Gain on sale of inventory Theoretical Questions 6. What are the main features of the Cash Flow Statement? 7. Mayuri Ltd. acquired Plant and Machinery for ` 25 lakhs. During the same year, it also sold Furniture and Fixtures for ` 4 lakhs. Can the company disclose, Net Cash Outflow towards purchase of Fixed Assets ` 21 lakhs (i.e., 25 lakhs – 4 lakhs) in the Cash Flow Statement? <PdfRef page={19} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Scenario based Question 8. How would the following cash flows be classified in accordance with <strong>AS 3</strong>?  Corporate Income Tax paid amounting to ` 70 lakhs during the reporting period.  Payment of advance tax ` 8,75,000 out of which ` 75,000 was towards capital gains arising on account of sale of assets during the reporting period.  Fixed Deposits withdrawn by customers of State Bank of India ` 3 crores. 9. Money Ltd., a non-financial company has the following entries in its Bank Account. It has sought your advice on the treatment of the same for preparing Cash Flow Statement. (i) Loans and Advances given to the following and interest earned on them: (1) to suppliers (2) to employees (3) to its subsidiaries companies (ii) Investment made in subsidiary Smart Ltd. and dividend received (iii) Dividend paid for the year Discuss in the context of <strong>AS 3</strong> Cash Flow Statement. 10. From the following information of XYZ Limited, calculate cash and cash equivalent as on 31-03-20X2 as per <strong>AS 3</strong>. Particulars Amount ( `) Balance as per the Bank Statement 25,000 Cheque issued but not presented in the Bank 15,000 Short Term Investment in liquid equity shares of ABC Limited 50,000 Fixed Deposit created on 01-11-20X1 and maturing on 15- 04-20X2 75,000 Short Term Investment in highly liquid Sovereign Debt Mutual fund on 01-03-20X2 (having maturity period of less than 3 months) 1,00,000 <PdfRef page={20} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED v v v v 4.37 Bank Balance in a Foreign Currency Account in India $ 1,000 (Conversion Rate: On the day of deposit ` 69/USD as on 31-03-20X2 ` 70/USD) 11. Z Ltd. has no Foreign Currency Cash Flow during the reporting period. It held a deposit in a bank in France. The balances as at the beginning of the year and at the end of the year were € 100,000 and € 105,000 respectively. The exchange rate at the beginning of the year was € 1 = ` 82, and at the end of the year was € 1 = ` 85. The increase in the deposit balance of € 5,000 was on account of interest credited on the last day of the reporting period. The deposit was reported at ` 82,00,000 in the opening balance sheet and at ` 89,25,000 in the closing balance sheet. You are required to show how these transactions would be presented in the Cash Flow Statement as per <strong>AS 3</strong>. 12. Following is the Balance Sheet of Fox Ltd. You are required to prepare cash flow statement using Indirect Method. Particulars Note No. 31st March,20X2 ( `) 31st March,20X1 ( `) (I) Equity and Liabilities 1. Shareholders’ Funds (a) Share capital 1 5,60,000 3,00,000 (b) Reserve and Surplus 2 35,000 25,000 2. Current Liabilities (a) Trade payables 1,50,000 60,000 (b) Short-term provisions (Provision for taxation) 8,000 5,000 Total 7,53,000 3,90,000 (II) Assets 1. Non-current assets <PdfRef page={21} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            (a) Property, Plant and Equipment 3,50,000 1,80,000 2. Current assets (a) Inventories 1,20,000 50,000 (b) Trade receivables 1,00,000 25,000 (c) Cash and cash equivalents 1,05,000 90,000 (d) Other current assets 78,000 45,000 Total 7,53,000 3,90,000 Notes to Accounts Particulars 31st March,20X2 ( `) 31st March,20X1 ( `) 1. Share capital (a) Equity share capital 4,10,000 2,00,000 (b) Preference share capital 1,50,000 1,00,000 5,60,000 3,00,000 2. Reserve and surplus Surplus in statement of profit and loss at the beginning of the year 25,000 Add: Profit of the year 20,000 Less: Dividend (10,000) Surplus in statement of profit and loss at the end of the year 35,000 25,000 Additional Information: 1. Dividend paid during the year ` 10,000 2. Depreciation charges during the year ` 40,000. <PdfRef page={22} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED v v v v 4.39 ANSWERS/HINTS Answers to the Multiple Choice Questions 1. (a) 2. (b) 3. (a) 4. (d) 5. (d) Answers to the Theoretical Questions 6. According to <strong>AS 3</strong> on “Cash Flow Statement”, cash flow statement deals with the provision of information about the historical changes in cash and cash equivalents of an enterprise during the given period from operating, investing and financing activities. Cash flows from operating activities can be reported using either (a) the direct method, or (b) the indirect method. A cash flow statement when used in conjunction with the other financial statements, provides information that enables users to evaluate the changes in net assets of an enterprise, its financial structure (including its liquidity and solvency), and its ability to affect the amount and timing of cash flows in order to adapt to changing circumstances and opportunities. 7. As per <strong>AS 3</strong>, Cash Flow Statements, an enterprise should report separately major classes of gross cash receipts and gross cash payments arising from investing and financing activities, except in the case of: • cash receipts and payments on behalf of customers when the cash flows reflect the activities of the customer rather than those of the enterprise; and • cash receipts and payments for items in which the turnover is quick, the amounts are large, and the maturities are short. In the given case, since the purchase of Plant and Machinery and disposal of Furniture and Fixtures do not fall in the criteria of exception mentioned above, the same should be presented on a gross basis as an outflow of ` 25 lakhs and an inflow of ` 4 lakhs. Presentation of net cash outflow of ` 21 lakhs is not permitted as per <strong>AS 3</strong>. <PdfRef page={23} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Answers to Scenario based Question 8. As per <strong>AS 3</strong>, the given cash flows shall be recorded as under: Corporate Income Tax paid amounting to ` 70 lakhs during the reporting period. ` 70 lakhs: Operating Cash Flows Payment of advance tax ` 8,75,000 out of which ` 75,000 was towards capital gains arising on account of sale of assets during the reporting period. ` 8,00,000: Operating Cash Flows ` 75,000: Investing Cash Flows Fixed Deposits withdrawn by customers of State Bank of India ` 3 crores. ` 3 crores: Operating Cash Flows for State Bank of India. 9. Treatment as per <strong>AS 3</strong> ‘Cash Flow Statement’ (i) Loans and advances given and interest earned (1) to suppliers - Cash flows from operating activities (2) to employees - Cash flows from operating activities (3) to its subsidiary companies - Cash flows from investing activities (ii) Investment made in subsidiary company and dividend received Cash flows from investing activities (iii) Dividend paid for the year Cash flows from financing activities 10. Computation of Cash and Cash Equivalents as on 31st March, 20X2 ` Cash balance with bank (` 25,000 less ` 15,000) 10,000 Short term investment in highly liquid sovereign debt mutual fund on 1.3.20X2 1,00,000 Bank balance in foreign currency account ($1,000 x ` 70) 70,000 1,80,000 <PdfRef page={24} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED v v v v 4.41 Note: Short term investment in liquid equity shares and fixed deposit will not be considered as cash and cash equivalents. 11. The Statement of Profit and Loss was credited on account of: Interest Income: € 5,000 x ` 85 = ` 4,25,000 Exchange difference = € 100,000 x (` 85 – ` 82) = ` 3,00,000 In preparing the Cash Flow Statement, the exchange difference of ` 3,00,000 should be deducted from the Net Profit before taxes, since it is a non-cash item. However, in order to reconcile the opening balance of the Cash and Cash Equivalents with its closing balance, the <strong>Exchange Difference</strong> of ` 3,00,000 should be added to the opening balance in a Note to the Cash Flow Statement., Cash Flows arising from transactions in a Foreign Currency shall be recorded in Z Ltd.’s reporting currency by applying to the foreign currency amount the exchange rate between the reporting currency and the foreign currency at the date of the cash flow. 12. Fox Ltd. Cash Flow Statement for the year ended 31st March, 20X2 ` ` Cash flows from operating activities Net Profit (35,000 less 25,000) 10,000 Add: Dividend 10,000 Provision for tax 8,000 Net profit before taxation and extraordinary items 28,000 Adjustments for: Depreciation 40,000 Operating profit before working capital changes 68,000 Increase in trade receivables (75,000) Increase in inventories (70,000) Increase in other current assets (33,000) Increase in trade payables 90,000 (88,000) <PdfRef page={25} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Cash used in operating activities (20,000) Less: Tax paid* (5,000) Net cash used in operating activities (25,000) Cash flows from investing activities Purchase of PPE (2,10,000) Net cash used in investing activities (2,10,000) Cash flows from financing activities Issue of equity shares for cash 2,10,000 Issue of preference shares 50,000 Dividends paid (10,000) Net cash generated from financing activities 2,50,000 Net increase in cash and cash equivalents 15,000 Cash and cash equivalents at beginning of period 90,000 Cash and cash equivalents at end of period 1,05,000 *Provision for tax of last year considered to be paid in the current year. Working Note: ` Property, plant and equipment acquisitions W.D.V. at 31.3.20X2 3,50,000 Add back: Depreciation for the year 40,000 3,90,000 Less: W.D.V. at 31.12.20X1 1,80,000 Acquisitions during 20X1-20X2 2,10,000 <PdfRef page={26} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 3**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 3, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
