'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, ChevronDown } from 'lucide-react'

export const as17Sections = [
  { id: 'as-17-intro-sec', title: '1. Introduction & Objectives' },
  { id: 'as-17-introduction', title: '3.1 INTRODUCTION' },
  { id: 'as-17-objective', title: '3.2 OBJECTIVE' },
  { id: 'as-17-scope', title: '3.3 SCOPE' },
  { id: 'as-17-definition-of-the-terms-used-in-the', title: '3.4 DEFINITION OF THE TERMS USED IN THE' },
  { id: 'as-17-treatment-of-interest-for', title: '3.5 TREATMENT OF INTEREST FOR' },
  { id: 'as-17-allocation', title: '3.6 ALLOCATION' },
  { id: 'as-17-primary-and-secondary-segment', title: '3.7 PRIMARY AND SECONDARY SEGMENT' },
  { id: 'as-17-business-and-geographical-segments', title: '3.8 BUSINESS AND GEOGRAPHICAL SEGMENTS' },
  { id: 'as-17-identifying-reportable-segments', title: '3.9 IDENTIFYING REPORTABLE SEGMENTS' },
  { id: 'as-17-segment-accounting-policies', title: '3.10 SEGMENT ACCOUNTING POLICIES' },
  { id: 'as-17-primary-reporting-format', title: '3.11 PRIMARY REPORTING FORMAT' },
  { id: 'as-17-secondary-segment-information', title: '3.12 SECONDARY SEGMENT INFORMATION' },
  { id: 'as-17-other-disclosures', title: '3.13 OTHER DISCLOSURES' }
];

interface AS17StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function AS17StandardTabContent({ navigateToPdfPage }: AS17StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as-17-intro-sec');
  const tocScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(id);
    const stickyToc = document.getElementById('as-17-standard-sticky-toc');
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

      as17Sections.forEach((sec) => {
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
      <div id="as-17-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as17Sections.map(sec => (
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
        <section id="as-17-intro-sec" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-17-intro-sec" num="1" title="1. Introduction &amp; Objectives" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED ❑ UNIT 3: ACCOUNTING STANDARD 17 SEGMENT REPORTING After studying this unit, you will be able to comprehend the- • Definition and Identification of Reportable Segments • Primary and Secondary Segment Reporting Formats • Business and Geographical Segments • How to identify the Reportable Segments • <strong>Disclosures</strong>. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 17**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 17, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
        <section id="as-17-introduction" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-17-introduction" num="3.1" title="INTRODUCTION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            <strong>AS 17</strong> is mandatory in respect of non-SMCs (and level I entities in case of non- corporates). Other entities are encouraged to comply with <strong>AS 17</strong>. This standard establishes principles for reporting financial information about different types of products and services an enterprise produces and different geographical areas in which it operates. The standard is more relevant for assessing risks and returns of a diversified or multi-locational enterprise which may not be determinable from the aggregated data. Before we start the standard, let us lay down the areas to be covered from the examination point of view. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 17**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 17, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.2 OBJECTIVE */}
        <section id="as-17-objective" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-17-objective" num="3.2" title="OBJECTIVE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Many enterprises provide groups of products and services or operate in geographical areas that are subject to differing rates of profitability, opportunities for growth, future prospects, and risks. The objective of this Standard is to establish principles for reporting financial information, about the different types of products and services an enterprise produces and the different geographical areas in which it operates. Such information helps users of financial statements: (a) Better understand the performance of the enterprise; (b) Better assess the risks and returns of the enterprise; and (c) Make more informed judgements about the enterprise as a whole. <PdfRef page={2} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 17**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 17, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.3 SCOPE */}
        <section id="as-17-scope" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-17-scope" num="3.3" title="SCOPE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            <strong>AS 17</strong> should be applied in presenting general purpose financial statements. An enterprise should comply with the requirements of this Standard fully and not selectively. If a single financial report contains both consolidated financial statements and separate financial statements of the parent, segment information need be presented only on the basis of the consolidated financial statements. Identify the Segments - Business or Geographical Identify the Reportable Segments Prepare a Segmental Report + Make appropriate <strong>Disclosures</strong> <PdfRef page={2} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED <PdfRef page={3} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 17**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 17, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.4 DEFINITION OF THE TERMS USED IN THE */}
        <section id="as-17-definition-of-the-terms-used-in-the" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-17-definition-of-the-terms-used-in-the" num="3.4" title="DEFINITION OF THE TERMS USED IN THE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ACCOUNTING STANDARD A business segment is a distinguishable component of an enterprise that is engaged in providing an individual product or service or a group of related products or services and that is subject to risks and returns that are different from those of other business segments. Factors that should be considered in determining whether products or services are related include: (a) The nature of the products or services (b) The nature of the production processes (c) The type or class of customers for the products or services (d) The methods used to distribute the products or provide the services (e) If applicable, the nature of the regulatory environment, for example, banking, insurance, or public utilities A single business segment does not include products and services with significantly differing risks and returns. While there may be dissimilarities with respect to one or several of the factors listed in the definition of business segment, the products and services included in a single business segment are expected to be similar with respect to a majority of the factors. A geographical segment is a distinguishable component of an enterprise that is engaged in providing products or services within a particular economic environment and that is subject to risks and returns that are different from those of components operating in other economic environments. Factors that should be considered in identifying geographical segments include: (a) Similarity of economic and political conditions. (b) Relationships between operations in different geographical areas. (c) Proximity of operations. (d) Special risks associated with operations in a particular area. (e) Exchange control regulations and (f) The underlying currency risks. <PdfRef page={3} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            A single geographical segment does not include operations in economic environments with significantly differing risks and returns. A geographical segment may be a single country, a group of two or more countries, or a region within a country. The risks and returns of an enterprise are influenced both by the geographical location of its operations (where its products are produced or where its service rendering activities are based) and also by the location of its customers (where its products are sold or services are rendered). The definition allows geographical segments to be based on either: (a) The location of production or service facilities and other assets of an enterprise; or (b) The location of its customers. The predominant sources of risks affect how most enterprises are organised and managed. Therefore, the organisational structure of an enterprise and its internal financial reporting system are normally the basis for identifying its segments. A reportable segment is a business segment or a geographical segment identified on the basis of foregoing definitions for which segment information is required to be disclosed by <strong>AS 17</strong>. Segment revenue is the aggregate of (i) The portion of enterprise revenue that is directly attributable to a segment; (ii) The relevant portion of enterprise revenue that can be allocated on a reasonable basis to a segment; and (iii) Revenue from transactions with other segments of the enterprise. Segment revenue does not include: (a) Extraordinary items as defined in <strong>AS 5</strong>; (b) Interest or dividend income, including interest earned on advances or loans to other segments unless the operations of the segment are primarily of a financial nature; and (c) Gains on sales of investments or on extinguishment of debt unless the operations of the segment are primarily of a financial nature. <PdfRef page={4} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED Segment expense is the aggregate of (i) The expense resulting from the operating activities of a segment that is directly attributable to the segment; (ii) The relevant portion of enterprise expense that can be allocated on a reasonable basis to the segment; and (iii) Including expense relating to transactions with other segments of the enterprise. Segment expense does not include: (a) Extraordinary items as defined in <strong>AS 5</strong>; (b) Interest expense, including interest incurred on advances or loans from other segments, unless the operations of the segment are primarily of a financial nature; (c) Losses on sales of investments or losses on extinguishment of debt unless the operations of the segment are primarily of a financial nature; (d) Income tax expense; and (e) General administrative expenses, head-office expenses, and other expenses that arise at the enterprise level and relate to the enterprise as a whole. However, costs are sometimes incurred at the enterprise level on behalf of a segment. Such costs are part of segment expense if they relate to the operating activities of the segment and if they can be directly attributed or allocated to the segment on a reasonable basis. Segment result is segment revenue less segment expense. Segment assets are those operating assets that are employed by a segment in its operating activities and that either are directly attributable to the segment or can be allocated to the segment on a reasonable basis. If the segment result of a segment includes interest or dividend income, its segment assets include the related receivables, loans, investments, or other interest or dividend generating assets. Segment assets do not include: • income tax assets; and • assets used for general enterprise or head-office purposes. <PdfRef page={5} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Segment assets are determined after deducting related allowances/provisions that are reported as direct offsets in the balance sheet of the enterprise. Segment liabilities are those operating liabilities that result from the operating activities of a segment and that either are directly attributable to the segment or can be allocated to the segment on a reasonable basis. If the segment result of a segment includes interest expense, its segment liabilities include the related interest-bearing liabilities. Examples of segment liabilities include trade and other payables, accrued liabilities, customer advances, product warranty provisions, and other claims relating to the provision of goods and services. Segment liabilities do not include: • income tax liabilities; and • borrowings and other liabilities that are incurred for financing rather than operating purposes. Assets and liabilities that relate jointly to two or more segment should be allocated to segments if, and only if, their related revenues and expenses also are allocated to those segments. <PdfRef page={6} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 17**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 17, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.5 TREATMENT OF INTEREST FOR */}
        <section id="as-17-treatment-of-interest-for" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-17-treatment-of-interest-for" num="3.5" title="TREATMENT OF INTEREST FOR" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            DETERMINING SEGMENT EXPENSE The interest expense relating to overdrafts and other operating liabilities identified to a particular segment should not be included as a part of the segment expense unless the operations of the segment are primarily of a financial nature or unless the interest is included as a part of the cost of inventories. In case interest is included as a part of the cost of inventories where it is so required as per <strong>AS 16</strong>, read with <strong>AS 2</strong> (Revised), and those inventories are part of segment assets of a particular segment, such interest should be considered as a segment expense. In this case, the amount of such interest and the fact that the segment result has been arrived at after considering such interest should be disclosed by way of a note to the segment result. <PdfRef page={6} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED <PdfRef page={7} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 17**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 17, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.6 ALLOCATION */}
        <section id="as-17-allocation" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-17-allocation" num="3.6" title="ALLOCATION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            An enterprise looks to its internal financial reporting system as the starting point for identifying those items that can be directly attributed, or reasonably allocated, to segments. There is thus a presumption that amounts that have been identified with segments for internal financial reporting purposes are directly attributable or reasonably allocable to segments for the purpose of measuring the segment revenue, segment expense, segment assets, and segment liabilities of reportable segments. In some cases, however, a revenue, expense, asset or liability may have been allocated to segments for internal financial reporting purposes on a basis that is understood by enterprise management but that could be deemed arbitrary in the perception of external users of financial statements. Conversely, an enterprise may choose not to allocate some item of revenue, expense, asset or liability for internal financial reporting purposes, even though a reasonable basis for doing so exists. Such an item is allocated pursuant to the definitions of segment revenue, segment expense, segment assets, and segment liabilities in <strong>AS 17</strong>. Segment revenue, segment expense, segment assets and segment liabilities are determined before intra-enterprise balances and intra-enterprise transactions are eliminated as part of the process of preparation of enterprise financial statements, except to the extent that such intra-enterprise balances and transactions are within a single segment. While the accounting policies used in preparing and presenting the financial statements of the enterprise as a whole are also the fundamental segment accounting policies, segment accounting policies include, in addition, policies that relate specifically to segment reporting, such as identification of segments, method of pricing inter-segment transfers, and basis for allocating revenues and expenses to segments. <PdfRef page={7} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 17**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 17, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.7 PRIMARY AND SECONDARY SEGMENT */}
        <section id="as-17-primary-and-secondary-segment" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-17-primary-and-secondary-segment" num="3.7" title="PRIMARY AND SECONDARY SEGMENT" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            REPORTING FORMATS The dominant source and nature of risks and returns of an enterprise should govern whether its primary segment reporting format will be business segments or geographical segments. <PdfRef page={7} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            If the risks and returns of an enterprise are affected predominantly by differences in the products and services it produces, its primary format for reporting segment information should be business segments, with secondary information reported geographically. Similarly, if the risks and returns of the enterprise are affected by the fact that it operates in different countries or other geographical areas, its primary format for reporting segment information should be geographical segments, with secondary information reported for groups of related products and services. <PdfRef page={8} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 17**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 17, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.8 BUSINESS AND GEOGRAPHICAL SEGMENTS */}
        <section id="as-17-business-and-geographical-segments" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-17-business-and-geographical-segments" num="3.8" title="BUSINESS AND GEOGRAPHICAL SEGMENTS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Generally, business and geographical segments are determined on the basis of internal financial reporting to the board of directors and the Chief Executive Officer. But if such segment does not satisfy the definitions given in AS, then following points should be considered: (a) If one or more of the segments reported internally to the directors and management is a business segment or a geographical segment based on the factors in the definitions but others are not, paragraph below should be applied only to those internal segments that do not meet the definitions (that is, an internally reported segment that meets the definition should not be further segmented). (b) For those segments reported internally to the directors and management that do not satisfy the definitions, management of the enterprise should look to the next lower level of internal segmentation that reports information along product and service lines or geographical lines, as appropriate under the definitions and (c) If such an internally reported lower-level segment meets the definition of business segment or geographical segment, the criteria for identifying reportable segments should be applied to that segment. <PdfRef page={8} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED <PdfRef page={9} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 17**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 17, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.9 IDENTIFYING REPORTABLE SEGMENTS */}
        <section id="as-17-identifying-reportable-segments" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-17-identifying-reportable-segments" num="3.9" title="IDENTIFYING REPORTABLE SEGMENTS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            (QUANTITATIVE THRESHOLDS) A business segment or geographical segment should be identified as a reportable segment if: (a) Its revenue from sales to external customers and from transactions with other segments is 10% or more of the total revenue, external and internal, of all segments; or (b) Its segment result, whether profit or loss, is 10% or more of – (i) The combined result of all segments in profit, or (ii) The combined result of all segments in loss, Whichever is greater in absolute amount; or (c) Its segment assets are 10% or more of the total assets of all segments. A business segment or a geographical segment which is not a reportable segment as per above paragraph, may be designated as a reportable segment despite its size at the discretion of the management of the enterprise. If that segment is not designated as a reportable segment, it should be included as an unallocated reconciling item. If total external revenue attributable to reportable segments constitutes less than 75% of the total enterprise revenue, additional segments should be identified as reportable segments, even if they do not meet the 10% thresholds, until at least 75% of total enterprise revenue is included in reportable segments. We can summarize the steps as under: Step I – Apply 10% Test (<strong>Materiality</strong> Test): Any 1 Test needs to be met – For Reportable Segment: Revenue Test Revenue (External + Internal) of the segment is 10% or more of the Total Revenue of all segments Profit/Loss Test Case I – All segments have profits: Profit of the segment is 10% or more of the total profit of all segments <PdfRef page={9} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Case II – Few segments have profit + Few segments have losses: 1. Add the profits of profitable segments only. 2. Add the losses of loss-making segments only. 3. Take the figure (from 1 and 2) whichever is greater (in absolute values). 4. The segment which has profit/loss equal to 10% or more of the absolute figure computed in Point 3 becomes reportable. Asset Test The segment assets are 10% or more of the total assets of all segments. Note: A business segment or a geographical segment which is not a reportable segment as per above steps, may be designated as a reportable segment despite its size at the discretion of the management of the enterprise. Step II – Apply 75% Test (Overall Test): Ensure that the total external revenue attributable to reportable segments constitutes at least 75% of the total enterprise revenue. If not, additional segments should be identified as reportable segments, even if they do not meet the 10% thresholds, until at least 75% of total enterprise revenue is included in reportable segments. Notes: 1. A segment identified as a reportable segment in the immediately preceding period because it satisfied the relevant 10% thresholds should continue to be a reportable segment for the current period notwithstanding that its revenue, result, and assets all no longer meet the 10% thresholds. 2. If a segment is identified as a reportable segment in the current period because it satisfies the relevant 10% thresholds, preceding-period segment data that is presented for comparative purposes should, unless it is impracticable to do so, be restated to reflect the newly reportable segment as a separate segment, even if that segment did not satisfy the 10% <PdfRef page={10} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED thresholds in the preceding period. <PdfRef page={11} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 17**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 17, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.10 SEGMENT ACCOUNTING POLICIES */}
        <section id="as-17-segment-accounting-policies" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-17-segment-accounting-policies" num="3.10" title="SEGMENT ACCOUNTING POLICIES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Segment information should be prepared in conformity with the accounting policies adopted for preparing and presenting the financial statements of the enterprise as a whole. <strong>AS 17</strong> does not prohibit the disclosure of additional segment information that is prepared on a basis other than the accounting policies adopted for the enterprise financial statements provided that- (a) the information is reported internally to the board of directors and the chief executive officer for purposes of making decisions about allocating resources to the segment and assessing its performance; and (b) the basis of measurement for this additional information is clearly described. <PdfRef page={11} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 17**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 17, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.11 PRIMARY REPORTING FORMAT */}
        <section id="as-17-primary-reporting-format" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-17-primary-reporting-format" num="3.11" title="PRIMARY REPORTING FORMAT" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            An enterprise should disclose the following for each reportable segment: (a) Segment revenue, classified into segment revenue from sales to external customers and segment revenue from transactions with other segments; (b) Segment result; (c) Total carrying amount of segment assets; (d) Total amount of segment liabilities; (e) Total cost incurred during the period to acquire segment assets that are expected to be used during more than one period (tangible and intangible fixed assets); (f) Total amount of expense included in the segment result for depreciation and amortisation in respect of segment assets for the period; and (g) Total amount of significant non-cash expenses, other than depreciation and amortisation in respect of segment assets that were included in segment expense and, therefore, deducted in measuring segment result. <PdfRef page={11} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            An enterprise that reports the amount of cash flows arising from operating, investing and financing activities of a segment need not disclose depreciation and amortisation expense and non-cash expenses. An enterprise should present a reconciliation between the information disclosed for reportable segments and the aggregated information in the enterprise financial statements. In presenting the reconciliation:, - segment revenue should be reconciled to enterprise revenue; - segment result should be reconciled to enterprise net profit or loss; - segment assets should be reconciled to enterprise assets; and - segment liabilities should be reconciled to enterprise liabilities. <PdfRef page={12} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 17**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 17, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.12 SECONDARY SEGMENT INFORMATION */}
        <section id="as-17-secondary-segment-information" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-17-secondary-segment-information" num="3.12" title="SECONDARY SEGMENT INFORMATION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            If primary format of an enterprise for reporting segment information is business segments, it should also report the following information: (a) Segment revenue from external customers by geographical area based on the geographical location of its customers, for each geographical segment whose revenue from sales to external customers is 10% or more of enterprise revenue; (b) The total carrying amount of segment assets by geographical location of assets, for each geographical segment whose segment assets are 10% or more of the total assets of all geographical segments; and (c) The total cost incurred during the period to acquire segment assets that are expected to be used during more than one period (tangible and intangible fixed assets) by geographical location of assets, for each geographical segment whose segment assets are 10% or more of the total assets of all geographical segments. If primary format of an enterprise for reporting segment information is geographical segments (whether based on location of assets or location of customers), it should also report the following segment information for each business segment whose revenue from sales to external customers is 10% or more <PdfRef page={12} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED of enterprise revenue or whose segment assets are 10% or more of the total assets of all business segments: a. Segment revenue from external customers; b. The total carrying amount of segment assets; and c. The total cost incurred during the period to acquire segment assets that are expected to be used during more than one period (tangible and intangible fixed assets). <PdfRef page={13} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 17**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 17, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.13 OTHER DISCLOSURES */}
        <section id="as-17-other-disclosures" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-17-other-disclosures" num="3.13" title="OTHER DISCLOSURES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            In measuring and reporting segment revenue from transactions with other segments, inter-segment transfers should be measured on the basis that the enterprise actually used to price those transfers. The basis of pricing inter-segment transfers and any change therein should be disclosed in the financial statements. Changes in accounting policies adopted for segment reporting that have a material effect on segment information should be disclosed. Such disclosure should include a description of the nature of the change, and the financial effect of the change if it is reasonably determinable. Some changes in accounting policies may relate specifically to segment reporting. Example could be: • changes in identification of segments; and • changes in the basis for allocating revenues and expenses to segments. Such changes can have a significant impact on the segment information reported but will not change aggregate financial information reported for the enterprise. To enable users to understand the impact of such changes, this Standard requires the disclosure of the nature of the change and the financial effects of the change, if reasonably determinable. An enterprise should indicate the types of products and services included in each reported business segment and indicate the composition of each reported geographical segment, both primary and secondary, if not otherwise disclosed in the financial statements. <PdfRef page={13} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Illustration 1 The Chief Accountant of Sports Ltd. gives the following data regarding its six segments: ` in lakhs Particulars M N O P Q R Total Segment Assets 40 80 30 20 20 10 200 Segment Results 50 (190) 10 10 (10) 30 (100) Segment Revenue 300 620 80 60 80 60 1,200 The Chief accountant is of the opinion that segments “M” and “N” alone should be reported. Is he justified in his view? Discuss. Solution As per <strong>AS 17</strong> ‘Segment Reporting’, a business segment or geographical segment should be identified as a reportable segment if: Its revenue from sales to external customers and from other transactions with other segments is 10% or more of the total revenue- external and internal of all segments; or Its segment result whether profit or loss is 10% or more of: • The combined result of all segments in profit; or • The combined result of all segments in loss, whichever is greater in absolute amount; or Its segment assets are 10% or more of the total assets of all segments. If the total external revenue attributable to reportable segments constitutes less than 75% of total enterprise revenue, additional segments should be identified as reportable segments even if they do not meet the 10% thresholds until atleast 75% of total enterprise revenue is included in reportable segments. On the basis of turnover criteria segments M and N are reportable segments. On the basis of the result criteria, segments M, N and R are reportable segments (since their results in absolute amount is 10% or more of` 200 lakhs). On the basis of asset criteria, all segments except R are reportable segments. <PdfRef page={14} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED Since all the segments are covered in at least one of the above criteria, all segments have to be reported in accordance with <strong>Accounting Standard</strong> (AS) 17. Hence the opinion of chief accountant is wrong. Illustration 2 A Company has an inter-segment transfer pricing policy of charging at cost less 10%. The market prices are generally 25% above cost. Is the policy adopted by the company correct? Solution <strong>AS 17</strong> ‘Segment Reporting’ requires that inter-segment transfers should be measured on the basis that the enterprise actually used to price these transfers. The basis of pricing inter-segment transfers and any change therein should be disclosed in the financial statements. Hence the enterprise can have its own policy for pricing inter-segment transfers and hence inter-segment transfers may be based on cost, below cost or market price. However, whichever policy is followed, the same should be disclosed and applied consistently. Therefore, in the given case inter-segment transfer pricing policy adopted by the company is correct if, followed consistently. Illustration 3 M/s XYZ Ltd. has three segments namely X, Y, Z. The total Assets of the Company are ` 10.00 crores. Segment X has ` 2.00 crores, segment Y has ` 3.00 crores and segment Z has ` 5.00 crores. Deferred tax assets included in the assets of each segments are X- ` 0.50 crores, Y— ` 0.40 crores and Z— ` 0.30 crores. The accountant contends that all the three segments are reportable segments. Comment. Solution According to <strong>AS 17</strong> “Segment Reporting”, segment assets do not include income tax assets. Therefore, the revised total assets are ` 8.8 crores [` 10 crores – (` 0.5 + ` 0.4 +` 0.3)]. Segment X holds total assets of ` 1.5 crores (` 2 crores –` 0.5 crores); Segment Y holds ` 2.6 crores (` 3 crores –` 0.4 crores); and Segment Z holds ` 4.7 crores (` 5 crores –` 0.3 crores). Thus all the three segments hold more than 10% of the total assets, all segments are reportable segments. <PdfRef page={15} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Illustration4 Prepare a segmental report for publication in Diversifiers Ltd. from the following details of the company’s three divisions and the head office: ` (‘000) Forging Shop Division Sales to Bright Bar Division 4,575 Other Domestic Sales 90 Export Sales 6,135 10,800 Bright Bar Division Sales to Fitting Division 45 Export Sales to Rwanda 300 345 Fitting Division Export Sales to Maldives 270 Particulars Head Office ` (‘000) Forging Shop Division ` (‘000) Bright Bar Division ` (‘000) Fitting Division ` (‘000) Pre-tax operating result 240 30 (12) Head office cost reallocated 72 36 36 Interest costs 6 8 2 Fixed assets 75 300 60 180 Net current assets 72 180 60 135 Long-term liabilities 57 30 15 180 <PdfRef page={16} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED Solution Diversifiers Ltd. Segmental Report ( ` ’000) Particulars Divisions Inter Segment Eliminations Consolidated Total Forging shop Bright Bar Fitting Segment Revenue Sales: Domestic 90 − − − 90 Export 6,135 300 270 − 6,705 External Sales 6,225 300 270 − 6,795 Inter-Segment Sales 4,575 45 − 4,620 − Total Revenue 10,800 345 270 4,620 6,795 Segment Result (Given) 240 30 (12) 258 Head Office Expenses (144) Operating Profit 114 Interest Expense (16) Profit Before Tax 98 Information in Relation to Assets and Liabilities: Fixed Assets 300 60 180 − 540 Net Current Assets 180 60 135 − 375 Segment assets 480 120 315 − 915 Unallocated Corporate Assets (75 + 72) − − − − 147 Total assets 1,062 Segment liabilities 30 15 180 − 225 Unallocated corporate liabilities 57 Total liabilities 282 <PdfRef page={17} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Sales Revenue by Geographical Market (` ’000) Home Sales Export Sales (by forging shop division) Export to Rwanda Export to Maldives Consolidated Total External sales 90 6,135 300 270 6,795 Illustration 5 Microtech Ltd. produces batteries for scooters, cars, trucks, and specialised batteries for invertors and UPS. How many segments should it have and why? Solution In case of Microtech Ltd., the basic product is the batteries, but the risks and returns of the batteries for automobiles (scooters, cars and trucks) and batteries for invertors and UPS are affected by different set of factors. In case of automobile batteries, the risks and returns are affected by the Government policy, road conditions, quality of automobiles, etc. whereas in case of batteries for invertors and UPS, the risks and returns are affected by power condition, standard of living, etc. Therefore, it can be said that Microtech Ltd. has two business segments viz- ‘Automobile batteries’ and ‘batteries for Invertors and UPS’. Reference: The students are advised to refer the full text of <strong>AS 17</strong> “Segment Reporting”. TEST YOUR KNOWLEDGE Multiple Choice Questions 1. As per <strong>AS 17</strong>, reportable segments are those whose total revenue from external sales and inter-segment sales is (a) 10% or more of the total revenue of all segments (b) 10% or more of the total revenue of all external segments (c) 12% or more of the total revenue of all segments (d) 12% or more of the total revenue of all external segments <PdfRef page={18} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED 2. Which of the following statements is correct? (a) Management has a discretion to include a segment as a reportable segment even if it passes the 10% materiality test. (b) Management has a discretion to include any segment as a reportable segment if it fails the 12% materiality test. (c) It is mandatory for the management to include the segment as a reportable segment if it passes the 10% materiality test. (d) It is not mandatory for the management to include the segment as a reportable segment if it passes the 10% materiality test. 3. Which of the following statements is correct? (a) The overall test of 75% considers only external revenue to compute the threshold limit. (b) The overall test of 75% considers only internal revenue to compute the threshold limit. (c) The overall test of 75% considers both internal and external revenue to compute the threshold limit. (d) It is management choice whether they want to include both external and internal revenue for computing threshold limit. 4. Which of the following statements is correct? (a) The 10% test computed on the basis of revenue, considers both internal and external revenue to compute the threshold limit. (b) The 10% test computed on the basis of revenue, considers only external revenue to compute the threshold limit. (c) The 10% test computed on the basis of revenue, considers only internal revenue to compute the threshold limit. (d) It is management choice whether they want to include both external and internal revenue for computing threshold limit. 5. Which of the following statements is correct? (a) In case of 10% test based on profit/loss, we need to consider that any segment whose profit or loss is 10% or more than the net profit or net <PdfRef page={19} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            loss respectively of all segments taken together becomes reportable segment. (b) In case of 10% test based on profit/loss, we need to consider that any segment whose profit or loss is 10% or more than the net profit (after netting the losses) of all segments taken together becomes reportable segment. (c) In case of 10% test based on profit/loss, we need to consider that any segment whose profit or loss is 10% or more than the net profit or loss (whichever is higher in absolute figures) of all segments taken together becomes reportable segment. (d) In case of 10% test based on profit/loss, we need to consider that any segment whose profit or loss is 10% or more than the net profit or loss (whichever is lower in absolute figures) of all segments taken together becomes reportable segment. Scenario based Question 6. Nathan Limited has three segments namely P, Q and R. The assets of the company are ` 15 crores. Segment P has 4 crores, Segment Q has 6 crores and Segment R has 5 crores. Deferred tax assets included in the assets of each segment are P - ` 1 crore, Q - ` 0.90 crores and R - ` 0.80 crores. The accountant contends all these three segments are reportable segments. Comment. 7. Company A is engaged in the manufacture and sale of products, which constitute two distinct business segments. The products of the Company are sold in the domestic market only. The management information system of the Company is organized to reflect operating information by two broad market segments, rural and urban. Besides the two business segments, how should Company A identify geographical segments? Do geographical segments exist within the same country? Explain in line with the provisions of <strong>AS 17</strong>. 8. PK Ltd. has identified business segment as its primary reporting format. It has identified India, USA and UK as three geographical segments. It sells its products in the Indian market, which constitutes 70 percent of the Company’s <PdfRef page={20} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED sales. 25 per cent is sold in USA and the balance is sold in UK. Is PK Ltd. as part of its geographical secondary segment information, required to disclose segment revenue from export sales, where such sales are not significant? 9. XYZ Ltd. has 5 business segments. Profit / Loss of each of the segments for the year ended 31st March, 20X2 have been provided below. You are required to identify from the following whether reportable segments or not reportable segments, on the basis of &quot;profitability test&quot; as per AS-17. Segment Profit (Loss) ` in lakhs A 225 B 25 C (175) D (20) E (105) 10. ABC Limited has 5 segments namely A, B, C, D and E. The profit/loss of each segment for the year ended March 31st, 20X2 is as follows: Segment Profit/(Loss) ( ` in crore) A 780 B 1,500 C (2,300) D (4,500) E 6,000 Total 1,480 Identify the Reportable segments. <PdfRef page={21} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            11. Heavy Goods Ltd. has 6 segments namely L-Q (below). The total revenues (internal and external), profits or losses and assets are set out below: (In `) Segment Inter Segment Sales External Sales Profit / loss Total assets L 4,200 12,300 3,000 37,500 M 3,500 7,750 1,500 23,250 N 1,000 3,500 (1,500) 15,750 0 0 5,250 (750) 10,500 P 500 5,500 900 10,500 Q 1,200 1,050 600 5,250 10,400 35,350 3,750 1,02,750 Heavy Goods Ltd. needs to determine how many reportable segments it has. You are required to advice Heavy Goods Ltd. as per the criteria defined in <strong>AS 17</strong>. 12. Calculate the segment results of a manufacturing organization from the following information: Segments A B C Total Directly attributed revenue 5,00,000 3,00,000 1,00,000 9,00,000 Enterprise revenue (allocated in 5 :4 : 2 basis) 1,10,000 Revenue from transactions with other segments Transaction from B 1,00,000 50,000 1,50,000 Transaction from C 10,000 50,000 60,000 Transaction from A 25,000 1,00,000 1,25,000 <PdfRef page={22} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED Operating expenses 3,00,000 1,50,000 75,000 5,25,000 Enterprise expenses (allocated in 5 :4 :2 basis) 77,000 Expenses on transactions with other segments Transaction from B 75,000 30,000 Transaction from C 6,000 40,000 Transaction from A 18,000 82,000 13. The Senior Accountant of AMF Ltd. gives the following data regarding its five segments: ( ` in lakhs) Particulars P Q R S T Total (`) (`) (`) (`) (`) (`) Segment Assets 80 30 20 20 10 160 Segment Results (190) 10 10 (10) 30 (150) Segment Revenue 620 80 60 80 60 900 The Senior Accountant is of the opinion that segment &quot;P&quot; alone should be reported. Is he justified in his view? Examine his opinion in the light of provision of AS-17 &apos;Segment Reporting&apos;. ANSWERS/ HINTS Answers to the Multiple Choice Questions 1. (a) 2. (c) 3. (a) 4. (a) 5. (c) Answers to the Scenario based Question 6. According to <strong>AS 17</strong> &quot;Segment Reporting&quot;, segment assets do not include income tax assets. Therefore, the revised total assets are crores [` 15 - (` 1 +0.9 + 0.8). <PdfRef page={23} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Details of Segment wise assets: Segment P holds total assets of ` 3 crores (` 4 crores - ` 1 crores); Segment Q holds ` 5.1 crores (` 6 crores - ` 0.9 crores); Segment R holds ` 4.2 crores (` 5 crores - ` 0.8 crores). Thus, all the three segments hold more than 10% of the total assets, all segments are reportable segments. Hence, the contention of the Accountant that all three segments are reportable segments is correct. 7. <strong>AS 17</strong> explains that, “a single geographical segment does not include operations in economic environments with significantly differing risks and returns. A geographical segment may be a single country, a group of two or more countries, or a region within a country”. Accordingly, to identity geographical segments, Company A needs to evaluate whether the segments reflected in the management information system function in environments that are subject to significantly differing risks and returns irrespective of the fact whether they are within the same country. The Standard recognizes that, “Determining the composition of a business or geographical segment involves a certain amount of judgement…”. Accordingly, while the management information system of the Company provides segment information for rural and urban geographical segments for the purpose of internal reporting, judgement is required to determine whether these segments are subject to significantly differing risks and returns based on the definition of geographical segment. In making such a judgement, aspect like different pricing and other policies, e.g., credit policies, deployment of resources between different regions etc., may be considered for the purpose identifying ‘urban and ‘rural’ as separate geographical segment. Company A, in making judgment for identifying geographical segments, should also consider the relevance, reliability and comparability over time of segment information that will be reported. The Standard, explains that, “In making that judgement, enterprise management takes into account the <PdfRef page={24} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED objective of reporting financial information by segment as set forth in the standard and the qualitative characteristics of financial statements. The qualitative characteristics include the relevance, reliability and comparability over time of financial information that is reported about the different groups of products and services of an enterprise and about its operations in particular geographical areas, and the usefulness of that information for assessing the risks and returns of the enterprise.” 8. As per <strong>AS 17</strong>, if primary format of an enterprise for reporting segment information is business segments, it should also report segment revenue from external customers by geographical area based on the geographical location of its customers, for each geographical segment whose revenue from sales to external customers is 10 per cent or more of enterprise revenue. Therefore, for the purposes of disclosing secondary segment information, PK Ltd. is not required to disclose segment revenue from export sales to UK, since that segment does not meet the 10 per cent or more of enterprise revenue threshold. However, other secondary segment information as per <strong>AS 17</strong> should be disclosed in respect of this segment if the thresholds prescribed in the <strong>AS 17</strong> are met. 9. As per <strong>AS 17</strong> ‘Segment Reporting’, a business segment or geographical segment should be identified as a reportable segment if: Its segment results whether profit or loss is 10% or more of: • The combined result of all segments in profit; i.e. ` 250 Lakhs or • The combined result of all segments in loss; i.e. ` 300 Lakhs Whichever is greater in absolute amount i.e. ` 300 Lakhs. Operating Segment Absolute amount of Profit or Loss (` In lakhs) Reportable Segment Yes or No A 225 Yes B 25 No C 175 Yes D 20 No E 105 Yes <PdfRef page={25} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            On the basis of the profitability test (result criteria), segments A, C and E are reportable segments (since their results in absolute amount is 10% or more of` 300 lakhs i.e. 30 lakhs). 10. In compliance with <strong>AS 17</strong>, the segment profit/loss of respective segment will be compared with the greater of the following: (i) All segments in profit, i.e., A, B and E - Total profit ` 8,280 crores. (ii) All segments in loss, i.e., C and D - Total loss ₹ 6,800 crores. Greater of the above - ` 8,280 crores. Based on the above, reportable segments will be determined as follows: Segment Profit/(Loss) Absolute Profit/Loss as a % of 8,280 Reportable Segment A 780 9% No B 1,500 18% Yes C (2,300) 28% Yes D (4,500) 54% Yes E 6,000 72% Yes Total 1,480 11. Quantitative Threshold Test: Revenue Test: Combined total sales of all the segment = ` 10,400 + ` 35,350 = ` 45,750. 10% thresholds = 45,750 x 10% = 4,575. Profitability Test: In the given situation, combined reported profit = ` 6,000 and combined reported loss (` 2,250). Hence, for 10% thresholds ` 6,000 will be considered. 10% thresholds = ` 6,000 x 10% = ` 600 <PdfRef page={26} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED Asset Test: Combined total assets of all the segment = ` 1,02,750 10% thresholds = ` 1,02,750 x 10% = 10,275 Accordingly, quantitative thresholds are calculated below: Segments L M N O P Q Reportable segments % segment sales to total sales% 24.59% 9.84% 11.48% 13.11% 4.92% L, M,O,P % segment profit to total profits 50% 25% 25% 12.5% 15% 10% L,M,N,O,P,Q % segment assets to total assets% 22.63% 15.33% 10.22% 10.22% 5.11% L,M,N,O,P Conclusion: Segments L, M, O and P clearly satisfy the revenue and assets tests and they are separate reportable segments. Segment N does not satisfy the revenue test, but it does satisfy the asset test and it is a reportable segment. Segment Q does not satisfy the revenue or the assets test but is does satisfy the profits test. Therefore, Segment Q is also a reportable segment. Hence all segments i.e. L, M, N, O, P and Q are reportable segments. 12. Computation of segment result: Segments A ` B ` C ` Total ` Directly attributed revenue 5,00,000 3,00,000 1,00,000 9,00,000 Enterprise revenue (allocated in 5 :4 :2 basis) 50,000 40,000 20,000 1,10,000 <PdfRef page={27} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Revenue from transactions with other segments Transaction from B 1,00,000 50,000 1,50,000 Transaction from C 10,000 50,000 60,000 Transaction from A 25,000 1,00,000 1,25,000 Total segment revenue (1) 6,60,000 4,15,000,000 13,45,000 Operating expenses 3,00,000 1,50,000 75,000 5,25,000 Enterprise expenses (allocated in 5 :4 :2 basis) 35,000 28,000 14,000 77,000 Expenses on transactions with other segments Transaction from B 75,000 30,000 1,05,000 Transaction from C 6,000 40,000 46,000 Transaction from A 18,000 82,000 1,00,000 Total segment expenses (2) 4,16,000 2,36,000 2,01,000 8,53,000 Segment result (1-2) 2,44,000 1,79,000 69,000 4,92,000 13. As per <strong>AS 17</strong> ‘Segment Reporting’, a business segment or geographical segment should be identified as a reportable segment if: (i) Its revenue from sales to external customers and from other transactions with other segments is 10% or more of the total revenue- external and internal of all segments; or (ii) Its segment result whether profit or loss is 10% or more of: (1) The combined result of all segments in profit; or (2) The combined result of all segments in loss, whichever is greater in absolute amount; or (iii) Its segment assets are 10% or more of the total assets of all segments. Accordingly, (a) On the basis of revenue from sales criteria, segment P is a reportable segment. <PdfRef page={28} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED (b) On the basis of the result criteria, segments P &amp; T are reportable segments (since their results in absolute amount is 10% or more of ` 200 Lakhs). (c) On the basis of asset criteria, all segments except T are reportable segments. Since all the segments are covered in at least one of the above criteria, all segments have to be reported upon in accordance with <strong>AS 17</strong>. Hence, the opinion of chief accountant that only segment ‘P’ is reportable is wrong. <PdfRef page={29} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 17**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 17, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
