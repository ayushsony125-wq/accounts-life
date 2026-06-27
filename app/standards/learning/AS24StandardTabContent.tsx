'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, ChevronDown } from 'lucide-react'

export const as24Sections = [
  { id: 'as-24-intro-sec', title: '1. Introduction & Objectives' },
  { id: 'as-24-introduction', title: '6.1 INTRODUCTION' },
  { id: 'as-24-discontinuing-operation', title: '6.2 DISCONTINUING OPERATION' },
  { id: 'as-24-initial-disclosure-event', title: '6.3 INITIAL DISCLOSURE EVENT' },
  { id: 'as-24-recognition-and-measurement', title: '6.4 RECOGNITION AND MEASUREMENT' },
  { id: 'as-24-presentation-and-disclosure', title: '6.5 PRESENTATION AND DISCLOSURE' },
  { id: 'as-24-updating-the-disclosures', title: '6.6 UPDATING THE DISCLOSURES' },
  { id: 'as-24-separate-disclosure-for-each', title: '6.7 SEPARATE DISCLOSURE FOR EACH' },
  { id: 'as-24-presentation-of-the-required', title: '6.8 PRESENTATION OF THE REQUIRED' },
  { id: 'as-24-restatement-of-prior-periods', title: '6.9 RESTATEMENT OF PRIOR PERIODS' },
  { id: 'as-24-disclosure-in-interim-financial', title: '6.10 DISCLOSURE IN INTERIM FINANCIAL' }
];

interface AS24StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function AS24StandardTabContent({ navigateToPdfPage }: AS24StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as-24-intro-sec');
  const tocScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(id);
    const stickyToc = document.getElementById('as-24-standard-sticky-toc');
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

      as24Sections.forEach((sec) => {
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
      <div id="as-24-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as24Sections.map(sec => (
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
        <section id="as-24-intro-sec" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-24-intro-sec" num="1" title="1. Introduction &amp; Objectives" />
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 1 --- PRESENTATION &amp; DISCLOSURES BASED UNIT 6: ACCOUNTING STANDARD 24 DISCONTINUING OPERATIONS After studying this unit, you will be able to comprehend the following: • Meaning of Discontinuing Operation; • Definition of Initial Disclosure Event; • Recognition and Measurement principles; • Presentation and Disclosures as required under the standard.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 24**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 24, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 6.1 INTRODUCTION */}
        <section id="as-24-introduction" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-24-introduction" num="6.1" title="INTRODUCTION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Imagine that a large company selling several products in the market decides to discontinue the sale of one of its key product as it plans to sell that portion of its business to another entity. Ideally, this information should be disclosed to primary stakeholders as they would take economic decisions based on the performance of the remaining portion of the business that is expected to be continued by the company in future. Therefore, the presentation requirements of such discontinuing operations becomes relevant and the aspects of <strong>AS 24</strong> need to be understood. <strong>AS 24</strong> is applicable to all discontinuing operations. The objective of <strong>AS 24</strong> is to establish principles for reporting information about discontinuing operations, thereby enhancing the ability of users of financial statements to make projections of an enterprise&apos;s cash flows, earnings-generating capacity, and financial position by segregating information about discontinuing operations from information about continuing operations. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 2 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 24**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 24, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 6.2 DISCONTINUING OPERATION */}
        <section id="as-24-discontinuing-operation" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-24-discontinuing-operation" num="6.2" title="DISCONTINUING OPERATION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            A discontinuing operation is a component of an enterprise: (a) That the enterprise, pursuant to a single plan, is: (i) Disposing of substantially in its entirety, such as by selling the component in a single transaction or by demerger or spin-off of ownership of the component to the enterprise&apos;s shareholders; or (ii) Disposing of piecemeal, such as by selling off the component&apos;s assets and settling its liabilities individually; or (iii) Terminating through abandonment; and (b) That represents a separate major line of business or geographical area of operations. (c) That can be distinguished operationally and for financial reporting purposes. Example 1 Co XY runs a famous chain of restaurants. It decides to sell its stake in one of the restaurant. This restaurant contributes around 5% of total revenue to the entire business. XY does not intend to sell any other restaurant as part of its strategy. In the above case, the sale of one restaurant out of the chain does not constitute disposal of business under a single plan, or a portion that represents a major line of business or geographical area of operations. Thus, it cannot be regarded as a discontinuing operation. Example 2 Group MN operates in various industries including Hotels, Airlines and Software through its subsidiaries. It has decided to sell its Airline business to be able to concentrate on other verticals. As a result, it has started to sell its aircrafts and paying off the associated liabilities. During the year, it has sold off 5 aircrafts out of the fleet of 50 aircrafts so far as part of the sale. The Airline business constitutes 25% of total group revenue. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 3 --- PRESENTATION &amp; DISCLOSURES BASED In the above case, Airline business may be considered as discontinuing operation. This is due to the fact that the assets are sold off as part of a single plan, and that the business represents a separate major line of business, and can be distinguished both operationally and for financial reporting purposes. Separate major line of business or geographical area of operations: • A reportable business segment or geographical segment as defined in AS 17 ‘Segment Reporting’, would normally satisfy criteria and it would represent a separate major line of business or geographical area of operations. • A part of such a segment may also satisfy criteria and it would represent a separate major line of business or geographical area of operations • For an enterprise that operates in a single business or geographical segment which does not report segment information, a major product or service line may also satisfy the criteria (see example below) Example 3 Entity RT operates in a single state and is trading in 3 products – X, Y and Z. Details with respect to the performance of each of the products are as under: Particulars X Y Z Total Sales 1,00,000 14,00,000 20,00,000 35,00,000 Cost of Goods Sold (80,000) (10,80,000) (14,40,000) (26,00,000) Gross Margin 20,000 3,20,000 5,60,000 9,00,000 Operational Expenses (15,000) (1,70,000) (3,60,000) (5,45,000) Profit before Tax 5,000 1,50,000 2,00,000 3,55,000 RT has decided to sell the business relating to Product Y to another entity. Since Product Y constitutes a major product, it may be considered as a discontinuing operations. Instead of disposing of a component substantially in its entirety, an enterprise may discontinue and dispose of the component by selling its assets and settling its liabilities piecemeal (individually or in small groups). For piecemeal disposals, while the overall result may be a net gain or a net loss, the sale of an individual asset or settlement of an individual liability may have the opposite effect. Moreover, there</li>
            <li>-- PAGE 4 --- is no specific date at which an overall binding sale agreement is entered into. Rather, the sales of assets and settlements of liabilities may occur over a period of months or perhaps even longer. Thus, disposal of a component may be in progress at the end of a financial reporting period. To qualify as a discontinuing operation, the disposal must be pursuant to a single coordinated plan. An enterprise may terminate an operation by abandonment without substantial sales of assets. An abandoned operation would be a discontinuing operation if it satisfies the criteria in the definition. However, changing the scope of an operation or the manner in which it is conducted is not abandonment because that operation, although changed, is continuing. Example 4 GH, a large car manufacturing company, decides to discontinue its manufacturing operations relating to the diesel cars production. It plans to restructure the business by revamping its existing operations, and starting new manufacturing process for manufacture and sale of electric vehicles. In the above example, it needs to be evaluated whether the restructuring is a result of continuing operations, or termination of existing operations, and accordingly it can be concluded whether it is a case of discontinuing operations or not. Examples of activities that do not necessarily satisfy criterion (a) of the definition, but that might do so in combination with other circumstances, include: (a) Gradual or evolutionary phasing out of a product line or class of service; (b) Discontinuing, even if relatively abruptly, several products within an ongoing line of business; (c) Shifting of some production or marketing activities for a particular line of business from one location to another; and (d) Closing of a facility to achieve productivity improvements or other cost savings. An example in relation to consolidated financial statements is selling a subsidiary whose activities are similar to those of the parent or other subsidiaries. A component can be distinguished operationally and for financial reporting purposes - criterion (c) of the definition of a discontinuing operation - if all the</li>
            <li>-- PAGE 5 --- PRESENTATION &amp; DISCLOSURES BASED following conditions are met: (a) The operating assets and liabilities of the component can be directly attributed to it. (b) Its revenue can be directly attributed to it. (c) At least a majority of its operating expenses can be directly attributed to it. Assets, liabilities, revenue, and expenses are directly attributable to a component if they would be eliminated when the component is sold, abandoned or otherwise disposed of. If debt is attributable to a component, the related interest and other financing costs are similarly attributed to it. Discontinuing operations are infrequent events, but this does not mean that all infrequent events are discontinuing operations. The fact that a disposal of a component of an enterprise is classified as a discontinuing operation under AS 24 does not, in itself, bring into question the enterprise&apos;s ability to continue as a going concern.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 24**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 24, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 6.3 INITIAL DISCLOSURE EVENT */}
        <section id="as-24-initial-disclosure-event" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-24-initial-disclosure-event" num="6.3" title="INITIAL DISCLOSURE EVENT" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            With respect to a discontinuing operation, the initial disclosure event is the occurrence of one of the following, whichever occurs earlier: (a) The enterprise has entered into a binding sale agreement for substantially all of the assets attributable to the discontinuing operation; or (b) The enterprise&apos;s board of directors or similar governing body has both (i) approved a detailed, formal plan for the discontinuance and (ii) made an announcement of the plan. A detailed, formal plan for the discontinuance normally includes: • identification of the major assets to be disposed of; • the expected method of disposal; • the period expected to be required for completion of the disposal; • the principal locations affected; <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 6 --- • the location, function, and approximate number or employees who will be compensated for terminating their services; and • the estimated proceeds or salvage to be realised by disposal. An enterprise’s board of directors or similar governing body is considered to have made the announcement of a detailed, formal plan for discontinuance, if it has announced the main features of the plan to those affected by it, such as, lenders, stock exchanges, trade payables, trade unions, etc. in a sufficiently specific manner so as to make the enterprise demonstrably committed to the discontinuance.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 24**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 24, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 6.4 RECOGNITION AND MEASUREMENT */}
        <section id="as-24-recognition-and-measurement" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-24-recognition-and-measurement" num="6.4" title="RECOGNITION AND MEASUREMENT" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            For recognising and measuring the effect of discontinuing operations, this AS does not provide any guidelines, but for the purpose the relevant Accounting Standards should be referred. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 24**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 24, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 6.5 PRESENTATION AND DISCLOSURE */}
        <section id="as-24-presentation-and-disclosure" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-24-presentation-and-disclosure" num="6.5" title="PRESENTATION AND DISCLOSURE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            6.5.1 Initial Disclosure An enterprise should include the following information relating to a discontinuing operation in its financial statements beginning with the financial statements for the period in which the initial disclosure event occurs: (a) A description of the discontinuing operation(s); (b) The business or geographical segment(s) in which it is reported as per <strong>AS 17</strong>; (c) The date and nature of the initial disclosure event; (d) The date or period in which the discontinuance is expected to be completed if known or determinable; (e) The carrying amounts, as of the balance sheet date, of the total assets to be disposed of and the total liabilities to be settled; (f) The amounts of revenue and expenses in respect of the ordinary activities attributable to the discontinuing operation during the current financial reporting period; <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 7 --- PRESENTATION &amp; DISCLOSURES BASED (g) The amount of pre-tax profit or loss from ordinary activities attributable to the discontinuing operation during the current financial reporting period, and the income tax expense related thereto; (h) The amounts of net cash flows attributable to the operating, investing, and financing activities of the discontinuing operation during the current financial reporting period; 6.5.2 Disclosures Other Than Initial Disclosures Note All the disclosures above should be presented in the notes to the financial statements except for amounts pertaining to pre-tax profit/loss of the discontinuing operation and the income tax expense thereon (second last bullet above) which should be shown on the face of the statement of profit and loss. 6.5.3 Other disclosures When an enterprise disposes of assets or settles liabilities attributable to a discontinuing operation or enters into binding agreements for the sale of such assets or the settlement of such liabilities, it should include, in its financial statements, the following information when the events occur: (a) For any gain or loss that is recognised on the disposal of assets or settlement of liabilities attributable to the discontinuing operation, (i) the amount of the pre-tax gain or loss and (ii) income tax expense relating to the gain or loss and (b) The net selling price or range of prices (which is after deducting expected disposal costs) of those net assets for which the enterprise has entered into one or more binding sale agreements, the expected timing of receipt of those cash flows and the carrying amount of those net assets on the balance sheet date.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 24**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 24, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 6.6 UPDATING THE DISCLOSURES */}
        <section id="as-24-updating-the-disclosures" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-24-updating-the-disclosures" num="6.6" title="UPDATING THE DISCLOSURES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            In addition to these disclosures, an enterprise should include, in its financial statements, for periods subsequent to the one in which the initial disclosure event occurs, a description of any significant changes in the amount or timing of cash <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 8 --- flows relating to the assets to be disposed or liabilities to be settled and the events causing those changes. The disclosures should continue in financial statements for periods up to and including the period in which the discontinuance is completed. Discontinuance is completed when the plan is substantially completed or abandoned, though full payments from the buyer(s) may not yet have been received. If an enterprise abandons or withdraws from a plan that was previously reported as a discontinuing operation, that fact, reasons therefore and its effect should be disclosed.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 24**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 24, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 6.7 SEPARATE DISCLOSURE FOR EACH */}
        <section id="as-24-separate-disclosure-for-each" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-24-separate-disclosure-for-each" num="6.7" title="SEPARATE DISCLOSURE FOR EACH" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            DISCONTINUING OPERATION Any disclosures required by <strong>AS 24</strong> should be presented separately for each discontinuing operation. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 24**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 24, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 6.8 PRESENTATION OF THE REQUIRED */}
        <section id="as-24-presentation-of-the-required" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-24-presentation-of-the-required" num="6.8" title="PRESENTATION OF THE REQUIRED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            DISCLOSURES The above disclosures should be presented in the notes to the financial statements except the following which should be shown on the face of the statement of profit and loss: (a) The amount of pre-tax profit or loss from ordinary activities attributable to the discontinuing operation during the current financial reporting period, and the income tax expense related thereto; and (b) The amount of the pre-tax gain or loss recognised on the disposal of assets or settlement of liabilities attributable to the discontinuing operation. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 9 --- PRESENTATION &amp; DISCLOSURES BASED</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 24**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 24, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 6.9 RESTATEMENT OF PRIOR PERIODS */}
        <section id="as-24-restatement-of-prior-periods" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-24-restatement-of-prior-periods" num="6.9" title="RESTATEMENT OF PRIOR PERIODS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Comparative information for prior periods that is presented in financial statements prepared after the initial disclosure event should be restated to segregate assets, liabilities, revenue, expenses, and cash flows of continuing and discontinuing operations in a manner similar to that mentioned above. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 24**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 24, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 6.10 DISCLOSURE IN INTERIM FINANCIAL */}
        <section id="as-24-disclosure-in-interim-financial" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-24-disclosure-in-interim-financial" num="6.10" title="DISCLOSURE IN INTERIM FINANCIAL" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            REPORTS <strong>Disclosures</strong> in an interim financial report in respect of a discontinuing operation should be made in accordance with <strong>AS 25</strong>, ‘Interim Financial Reporting’, including: (a) Any significant activities or events since the end of the most recent annual reporting period relating to a discontinuing operation and (b) Any significant changes in the amount or timing of cash flows relating to the assets to be disposed or liabilities to be settled. TEST YOUR KNOWLEDGE Multiple Choice Questions 1. AB decided to dispose of its Clothing division as part of its long-term strategy. (a) Date of Board approval - 1st March 20X1; (b) Date of formal announcement made to affected parties - 15th March 20X1. (c) Date of Binding Sale agreement – 1st July 20X1; (d) Reporting date – 31st March 20X1 The date of initial disclosure event would be: (a) 1st March 20X1 (b) 15th March 20X1 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 10 --- (c) 31st March 20X1 (d) 31st July 20X1 2. To qualify as a component that can be distinguished operationally and for financial reporting purposes, the condition(s) to be met is (are): (a) The operating assets and liabilities of the component can be directly attributed to it. (b) Its revenue can be directly attributed to it. (c) At least a majority of its operating expenses can be directly attributed to it. (d) All of the above 3. Identify which of the following statements is incorrect? (a) A discontinuing operation is a component of an enterprise that represents a separate major line of business or geographical area of operations. (b) A discontinuing operation is a component of an enterprise that can be distinguished operationally and for financial reporting purposes. (c) A discontinuing operation is a component of an enterprise that may or may not be distinguished operationally and for financial reporting purposes. (d) A discontinuing operation may be disposed of in its entirety or piecemeal, but always pursuant to an overall plan to discontinue the entire component. 4. Identify the incorrect statement. (a) Discontinuing operations are infrequent events, but this does not mean that all infrequent events are discontinuing operations. (b) The fact that a disposal of a component of an enterprise is classified as a discontinuing operation under AS 24 would always raise a question regarding the enterprise&apos;s ability to continue as a going concern. (c) For recognising and measuring the effect of discontinuing operations, AS 24 does not provide any guidelines, but for the purpose the relevant Accounting Standards should be referred.</li>
            <li>-- PAGE 11 --- PRESENTATION &amp; DISCLOSURES BASED (d) An enterprise shall include a description of the discontinuing operation, in its financial statements beginning with the financial statements for the period in which the initial disclosure event occurs. Theoretical Questions 5. (i) What are the disclosure and presentation requirements of AS 24 for discontinuing operations? (ii) Give four examples of activities that do not necessarily satisfy criterion (a) of paragraph 3 of AS 24, but that might do so in combination with other circumstances. 6. What are the initial disclosure requirements of AS 24 for discontinuing operations? Scenario based Question 7. Rohini Limited is in the business of manufacture of passenger cars and commercial vehicles. The Company is working on a strategic plan to close the production of passenger cars and to produce only commercial vehicles over the coming 5 years. However, no specific plans have been drawn up for sale of neither the division nor its assets. As part of its prospective plan it will reduce the production of passenger cars by 20% annually. It also plans to establish another new factory for the manufacture of commercial vehicles and transfer surplus employees in a phased manner. You are required to comment: (i) If mere gradual phasing out in itself can be considered as a &apos;discontinuing operation&apos; within the meaning of AS-24. (ii) If the Company passes a resolution to sell some of the assets in the passenger car division and also to transfer few other assets of the passenger car division to the new factory, does this trigger the application of AS-24? (iii) Would your answer to (ii) above be different if the Company resolves to sell the assets of the passenger car division in a phased but time bound manner?</li>
            <li>-- PAGE 12 --- 8. A consumer goods producer has changed the product line as follows: Dish washing Bar Clothes washing Bar (Per month) (Per month) January 2021 - September 2021 2,00,000 2,00,000 October 2021 - December 2021 1,00,000 3,00,000 January 2022 - March 2022 Nil 4,00,000 The company has enforced a gradual enforcement of change in product line on the basis of an overall plan. The Board of Directors has passed a resolution in March 2021 to this effect. The company follows calendar year as its accounting year. You required to advise the company whether it should be treated as discontinuing operation or not as per AS 24? ANSWERS/HINTS Answers to the Multiple Choice Questions 1. (b) 2. (d) 3. (c) 4. (b) Answers to the Theoretical Questions 5. (i) An enterprise should include prescribed information relating to a discontinuing operation in its financial statements beginning with the financial statements for the period in which the initial disclosure event (as defined in paragraph 15 of AS 24) occurs. For details, please refer Section of this Chapter above. (ii) Examples of activities that do not necessarily satisfy criterion (a) of the definition, but that might do so in combination with other circum- stances, include: (a) Gradual or evolutionary phasing out of a product line or class of service;</li>
            <li>-- PAGE 13 --- PRESENTATION &amp; DISCLOSURES BASED (b) Discontinuing, even if relatively abruptly, several products within an ongoing line of business; (c) Shifting of some production or marketing activities for a particular line of business from one location to another; and (d) Closing of a facility to achieve productivity improvements or other cost savings. 6. An enterprise should include the following information relating to a discontinuing operation in its financial statements beginning with the financial statements for the period in which the initial disclosure event occurs: (a) A description of the discontinuing operation(s) (b) The business or geographical segment(s) in which it is reported as per AS 17. (c) The date and nature of the initial disclosure event. (d) The date or period in which the discontinuance is expected to be completed if known or determinable (e) The carrying amounts, as of the balance sheet date, of the total assets to be disposed of and the total liabilities to be settled. (f) The amounts of revenue and expenses in respect of the ordinary activities attributable to the discontinuing operation during the current financial reporting period. (g) The amount of pre-tax profit or loss from ordinary activities attributable to the discontinuing operation during the current financial reporting period, and the income tax expense related thereto. (h) The amounts of net cash flows attributable to the operating, investing, and financing activities of the discontinuing operation during the current financial reporting period.</li>
            <li>-- PAGE 14 --- Answer to the Scenario based Question 7. (i) A discontinuing operation is a component of an enterprise: (a) that the enterprise, pursuant to a single plan, is: (i) disposing of substantially in its entirety, such as by selling the component in a single transaction or by demerger or spin-off of ownership of the component to the enterprise&apos;s shareholders; or (ii) disposing of piecemeal, such as by selling off the component&apos;s assets and settling its liabilities individually; or (iii) terminating through abandonment; and (b) that represents a separate major line of business or geographical area of operations; and (c) that can be distinguished operationally and for financial reporting purposes. Mere gradual phasing out is not considered as discontinuing operation as defined under AS 24, ‘Discontinuing Operations’. Examples of activities that do not necessarily satisfy criterion of the definition, but that might do so in combination with other circumstances, include: (i) Gradual or evolutionary phasing out of a product line or class of service; (ii) Shifting of some production or marketing activities for a particular line of business from one location to another; and (iii) Closing of a facility to achieve productivity improvements or other cost savings. In this case, it cannot be considered as Discontinuing Operation as per AS-24 as the companies’ strategic plan has no final approval from the board through a resolution and there is no specific time bound activities like shifting of assets and employees. Moreover, the new segment i.e. commercial vehicle production line in a new factory has not started.</li>
            <li>-- PAGE 15 --- PRESENTATION &amp; DISCLOSURES BASED (ii) No, the resolution is silent about stoppage of the Car segment in definite time period. Though, sale of some assets and some transfer proposal were passed through a resolution to the new factory, but the closure road map and new segment starting roadmap are missing. Hence AS 24 will not be applicable and it cannot be considered as Discontinuing operations. (iii) Yes, phased and time bound program resolved in the board clearly indicates the closure of the passenger car segment in a definite time frame and will constitute a clear roadmap. Hence this action will attract compliance of AS 24 and it will be considered as Discontinuing Operations as per AS-24. 8. As per AS 24 ‘Discontinuing Operations’, a discontinuing operation is a component of an enterprise: (i) that the enterprise, pursuant to a single plan, is: (1) disposing of substantially in its entirety, (2) disposing of piecemeal, or (3) terminating through abandonment; and (ii) that represents a separate major line of business or geographical area of operations; and (iii) that can be distinguished operationally and for financial reporting purposes. As per provisions of the standard, business enterprises frequently close facilities, abandon products or even product lines, and change the size of their work force in response to market forces. While those kinds of terminations generally are not, in themselves, discontinuing operations, they can occur in connection with a discontinuing operation. Examples of activities that do not necessarily satisfy criterion of discontinuing operation are gradual or evolutionary phasing out of a product line or class of service, discontinuing, even if relatively abruptly, several products within an ongoing line of business;</li>
            <li>-- PAGE 16 --- In the given case, the company has enforced a gradual enforcement of change in product line and does not represent a separate major line of business and hence is not a discontinued operation. If it were a discontinuing operation, the initial disclosure event is the occurrence of one of the following, whichever occurs earlier: (i) the enterprise has entered into a binding sale agreement for substantially all of the assets attributable to the discontinuing operation; or (ii) the enterprises board of directors or similar governing body has both approved a detailed, formal plan for discontinuance and made an announcement of the plan.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 24**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 24, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
