'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, ChevronDown } from 'lucide-react'

export const as21Sections = [
  { id: 'as-21-intro-sec', title: '1. Introduction & Objectives' },
  { id: 'as-21-concept-of-group-holding-company', title: '1.1 CONCEPT OF GROUP, HOLDING COMPANY' },
  { id: 'as-21-accounting-standard-for-consolidated', title: '10.3 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-1', title: '10.5 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-objectives-of-as-21', title: '1.2 OBJECTIVES OF AS 21' },
  { id: 'as-21-accounting-standard-for-consolidated-2', title: '10.7 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-wholly-owned-and-partly-owned', title: '1.3 WHOLLY OWNED AND PARTLY OWNED' },
  { id: 'as-21-purpose-of-preparing-the', title: '1.4 PURPOSE OF PREPARING THE' },
  { id: 'as-21-accounting-standard-for-consolidated-3', title: '10.9 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-scope-of-as-21', title: '1.5 SCOPE OF AS 21' },
  { id: 'as-21-accounting-standard-for-consolidated-4', title: '10.11 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-control', title: '1.6 CONTROL' },
  { id: 'as-21-exclusion-from-preparation-of', title: '1.7 EXCLUSION FROM PREPARATION OF' },
  { id: 'as-21-accounting-standard-for-consolidated-5', title: '10.13 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-6', title: '10.15 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-advantages-of-consolidated', title: '1.8 ADVANTAGES OF CONSOLIDATED' },
  { id: 'as-21-components-of-consolidated', title: '1.9 COMPONENTS OF CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-7', title: '10.17 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-consolidation-procedures', title: '1.10 CONSOLIDATION PROCEDURES' },
  { id: 'as-21-accounting-standard-for-consolidated-8', title: '10.19 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-9', title: '10.21 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-10', title: '10.23 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-minority-interests', title: '1.12 MINORITY INTERESTS' },
  { id: 'as-21-accounting-standard-for-consolidated-11', title: '10.25 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-12', title: '10.27 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-consolidation-adjustments', title: '1.14 CONSOLIDATION ADJUSTMENTS' },
  { id: 'as-21-accounting-standard-for-consolidated-13', title: '10.29 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-14', title: '10.31 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-15', title: '10.33 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-16', title: '10.35 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-17', title: '10.37 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-18', title: '10.39 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-19', title: '10.41 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-20', title: '10.43 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-21', title: '10.45 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-22', title: '10.47 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-23', title: '10.49 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-24', title: '10.51 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-25', title: '10.53 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-26', title: '10.55 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-27', title: '10.57 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-28', title: '10.59 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-29', title: '10.61 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-30', title: '10.63 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-31', title: '10.65 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-32', title: '10.67 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-33', title: '10.69 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-34', title: '10.71 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-35', title: '10.73 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-preparation-of-consolidated', title: '1.15 PREPARATION OF CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-36', title: '10.75 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-preparation-of-consolidated-cash', title: '1.16 PREPARATION OF CONSOLIDATED CASH' },
  { id: 'as-21-accounting-standard-for-consolidated-37', title: '10.77 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-uniform-accounting-policies', title: '1.17 UNIFORM ACCOUNTING POLICIES' },
  { id: 'as-21-accounting-standard-for-consolidated-38', title: '10.79 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-39', title: '10.81 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-40', title: '10.83 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-treatment-of-subsidiary-company', title: '1.18 TREATMENT OF SUBSIDIARY COMPANY' },
  { id: 'as-21-accounting-standard-for-consolidated-41', title: '10.85 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-42', title: '10.87 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-43', title: '10.89 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-44', title: '10.91 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-45', title: '10.93 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-46', title: '10.95 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-47', title: '10.97 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-48', title: '10.99 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-49', title: '10.101 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-50', title: '10.103 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-51', title: '10.105 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-52', title: '10.107 ACCOUNTING STANDARD FOR CONSOLIDATED' },
  { id: 'as-21-accounting-standard-for-consolidated-53', title: '10.109 ACCOUNTING STANDARD FOR CONSOLIDATED' }
];

interface AS21StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function AS21StandardTabContent({ navigateToPdfPage }: AS21StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as-21-intro-sec');
  const tocScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(id);
    const stickyToc = document.getElementById('as-21-standard-sticky-toc');
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

      as21Sections.forEach((sec) => {
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
      <div id="as-21-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as21Sections.map(sec => (
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
        <section id="as-21-intro-sec" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-intro-sec" num="1" title="1. Introduction &amp; Objectives" />
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 1 --- CHAPTER 10 FOR CONSOLIDATED FINANCIAL STATEMENTS UNIT 1 ACCOUNTING STATDARD 21 CONSOLIDATED FINANCIAL STATEMENTS After studying this chapter, you will be able to: ♦ Understand the concepts of Group, holding company and subsidiary company. ♦ Apply the consolidation procedures for consolidation of financial statements of subsidiaries with the holding companies. ♦ Prepare the consolidated financial statements and solve related problems</li>
            <li>-- PAGE 2 --- Note: As per the syllabus, the unit covers simple problems on consolidated financial statements with single subsidiary and excludes problems involving acquisition of Interest in Subsidiary at Different Dates, Cross holding, Disposal of a Subsidiary and Foreign Subsidiaries.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.1 CONCEPT OF GROUP, HOLDING COMPANY */}
        <section id="as-21-concept-of-group-holding-company" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-concept-of-group-holding-company" num="1.1" title="CONCEPT OF GROUP, HOLDING COMPANY" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            AND SUBSIDIARY COMPANY In an era of business growth, many organizations are growing into large corporations by the process of acquisition, mergers, gaining control by one company over the other company, restructuring etc. Acquisitions and mergers ultimately lead to either cost reduction or controlling the market or sharing the material supplies or product diversification or availing tax benefits or synergy. Whatever the motto behind these ventures is, the ultimate result is the large-scale corporation. Formation of holding company is the most popular device for achieving these objectives. Concept of Group, Holding Company and Subsidiary Company Purpose and method of preparing consolidated financial statements Components of Consolidated Financial Statements Calculation of Goodwill/ Capital Reserve Minority Interests; Profit or Loss of Subsidiary Company Elimination of Intra-Group Transactions and other Adjustments UNIT OVERVIEW <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 3 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.3 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated" num="10.3" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Group of Companies Many a time, a company expands by keeping intact its separate corporate identity. In this situation, a company (i.e. holding company) gains control over the other company (subsidiary company). This control is exercised by one company over the other by- 1. Purchasing specified number of shares i.e. ownership through voting power of that company or 2. Exercising control over the board of directors. The companies connected in these ways are collectively called as a Group of Companies. Holding Company and Subsidiary Company have also been defined in Section 2 of the Companies Act, 2013. Holding company As per Section 2(46) of the Companies Act, 2013, “Holding company”, in relation to one or more other companies, means a company of which such companies are subsidiary companies. It may be defined as one, which has one or more subsidiary companies and enjoys control over them. Legally a holding company and its subsidiaries are distinct and separate entities. However, in substance holding and subsidiary companies work as a group. Accordingly, users of holding company’s accounts need financial information of subsidiaries also to understand the performance and financial position of the group (i.e. holding company and subsidiaries on a consolidated basis). Subsidiary Company Section 2(87) of the Companies Act, 2013 defines “subsidiary company” as a company in which the holding company - (i) controls the composition of the Board of Directors; or (ii) exercises or controls more than one-half of the total share capital either at its own or together with one or more of its subsidiary companies: <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 4 --- A company shall be deemed to be a subsidiary company of the holding company even if there is indirect control through the subsidiary company (ies). The control over the composition of a subsidiary company’s Board of Directors means exercise of power to appoint or remove all or a majority of the directors of the subsidiary company. Section 19 of the Companies Act, 2013 prohibits a subsidiary company from holding shares in the holding company. According to this section, no company shall, either by itself or through its nominees, hold any shares in its holding company and no holding company shall allot or transfer its shares to any of its subsidiary companies and any such allotment or transfer of shares of a company to its subsidiary company shall be void. However, a subsidiary may continue to be a member of its holding company when (a) the subsidiary company holds such shares as the legal representative of a deceased member of the holding company; or (b) the subsidiary company holds such shares as a trustee; or (c) the subsidiary company is a shareholder even before it became a subsidiary company of the holding company. The subsidiary company shall have a right to vote at a meeting of the holding company only in respect of the shares held by it as a legal representative or as a trustee, as mentioned above in point (a) and (b). Applicable Accounting Standard Accounting Standard (AS) 21: Consolidated Financial Statements provides guidance on preparation of Consolidated Financial Statements, the purpose of which is discussed in Para 3 below. This Standard came into effect in respect of accounting periods commenced on or after 1-4-2001. AS 21 lays down principles and procedures for preparation and presentation of consolidated financial statements. Consolidated financial statements are presented by the parent (holding company) to provide financial information about the economic activities of the group as a single economic entity. The parent presenting consolidated financial statements should present such statements in accordance with this standard but in its separate financial statements, investments in subsidiaries would be accounted as per AS 13.</li>
            <li>-- PAGE 5 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.5 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-1" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-1" num="10.5" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.2 OBJECTIVES OF AS 21 */}
        <section id="as-21-objectives-of-as-21" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-objectives-of-as-21" num="1.2" title="OBJECTIVES OF AS 21" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The objective of this Standard is to lay down principles and procedures for preparation and presentation of consolidated financial statements. Consolidated Financial Statements are prepared by the holding/parent company to provide financial information regarding the economic resources controlled by its group and results achieved with these resources. These consolidated financial statements are prepared by the parent company in addition to the financial statement prepared by the parent company for only its own affairs. Hence parent company prepares two financial statements, one for only its own affairs and one for taking the whole group as one unit in the form of consolidated financial statements. Consolidated financial statements usually comprise the following:  Consolidated Balance Sheet  Consolidated Profit &amp; Loss Statement  Notes to Accounts, other statements and explanatory material  Consolidated Cash Flow Statement, if parent company presents its own cash flow statement. While preparing the consolidated financial statement, all other ASs and Accounting Policies will be applicable as they are applied in parent company’s own financial statements. A parent which presents consolidated financial statements should consolidate all subsidiaries, domestic as well as foreign. Where an enterprise does not have a subsidiary but has an associate and/or a joint venture such an enterprise should also prepare consolidated financial statements in accordance with <strong>Accounting Standard</strong> (AS) 23, Accounting for Associates in Consolidated Financial Statements, and <strong>Accounting Standard</strong> (AS) 27, Financial Reporting of Interests in Joint Ventures respectively. <strong>Definitions</strong> as per <strong>Accounting Standard</strong> (AS) 21 Parent: A parent is an enterprise that has one or more subsidiaries. Subsidiary is an enterprise that is controlled by another enterprise (known as the parent). <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 6 --- Control: (a) the ownership, directly or indirectly through subsidiary(ies), of more than one-half of the voting power of an enterprise; or (b) control of the composition of the board of directors in the case of a company or of the composition of the corresponding governing body in case of any other enterprise so as to obtain economic benefits from its activities. Group: A group is a parent and all its subsidiaries. Minority interest is that part of the net results of operations and of the net assets of a subsidiary attributable to interests which are not owned, directly or indirectly through subsidiary(ies), by the parent. Equity is the residual interest in the assets of an enterprise after deducting all its liabilities. Consolidated financial statements are the financial statements of a group presented as those of a single enterprise. Circumstances under which Consolidated Financial Statements are prepared AS 21 should be applied in the preparation and presentation of consolidated financial statements for a group of enterprises under the control of a parent. Consolidated financial statements are the financial statements of a group presented as those of a single enterprise. AS 21 does not mandate which enterprises are required to prepare consolidated financial statements – but specifies the rules to be followed where such financial statements are prepared. Consolidated Financial Statements will be prepared by the parent company for all the companies that are controlled by the parent company either directly or indirectly, situated in India or abroad except in certain cases.</li>
            <li>-- PAGE 7 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.7 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-2" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-2" num="10.7" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.3 WHOLLY OWNED AND PARTLY OWNED */}
        <section id="as-21-wholly-owned-and-partly-owned" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-wholly-owned-and-partly-owned" num="1.3" title="WHOLLY OWNED AND PARTLY OWNED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            SUBSIDIARIES S. No. Wholly owned subsidiary company Partly owned subsidiary company 1. A wholly owned subsidiary company is one in which all the shares are owned by the holding company. In a partly owned subsidiary, all the shares of subsidiary company are not acquired by the holding company i.e. only the majority of shares (i.e., more than 50%) are owned by the holding company. 2. 100% voting rights are vested by the holding company. Voting rights of more than 50% but less than 100% are vested by the holding company. 3. There is no minority interest because all the shares with voting rights are held by the holding company. There is a minority interest because less than 50% shares with voting rights are held by outsiders other than the holding company. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.4 PURPOSE OF PREPARING THE */}
        <section id="as-21-purpose-of-preparing-the" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-purpose-of-preparing-the" num="1.4" title="PURPOSE OF PREPARING THE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            CONSOLIDATED FINANCIAL STATEMENTS Consolidated financial statements (CFS) are the financial statements of a ‘group’ presented as those of a single enterprise, where a ‘group’ refers to a parent and all its subsidiaries. Parent company needs to inform the users about the financial position and results of operations of not only of their enterprise itself but also of the group as a whole. For this purpose, consolidated financial statements are prepared and presented by a parent/holding enterprise to provide financial information about a parent and its subsidiary(ies) as a single economic entity. CFS are intended to show the financial position of the group as a whole - by showing the economic resources controlled by them, by presenting the obligations of the group and the results the group achieves with its resources. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 8 --- CFS normally include consolidated balance sheet, consolidated statement of profit and loss, and notes, other statements and explanatory material that form an integral part thereof. Consolidated cash flow statement is presented in case a parent presents its own cash flow statement. The consolidated financial statements are presented, to the extent possible, in the same format as that adopted by the parent for its separate financial statements. The logic for presentation of Consolidated Financial Statements can be appreciated with the help of an example below: Assume that you are holding 10 shares of Reliance Industries Limited, one of the largest conglomerates in India. If you look at Reliance Industries Limited’s separate (standalone) balance sheet, you can see investments in subsidiaries like Jio Platforms Limited, Reliance Jio Infocomm Limited, Reliance Retail Limited etc. Now, if we see the standalone financials of Reliance Industries Limited, the revenue is generated from Oil &amp; Gas Business. However, we all know that equally significant for Reliance Industries Limited is the revenue generated from its subsidiary companies. Further, being a holding company, all operational decisions of the subsidiary companies are taken by Reliance Industries Limited. In other words, though the holding company and its subsidiaries are legally different entities, in substance, all the operations of the subsidiaries are merely an extension of the holding company, and the assets and liabilities of the subsidiaries are controlled by the holding company. Technically, Investments appearing in the balance sheet of Reliance Industries Limited represents proportionate share in the net worth of the respective subsidiary as well as is also a proportionate share in the profits earned by such subsidiaries. Accordingly, consolidating the incomes and expenses, as well as the assets and liabilities of the subsidiary companies with that of the parent company will result in a better presentation of the operations as well as the financial position of Reliance Industries Limited. Relevant provisions of the Companies Act 2013 Where a company has one or more subsidiaries or associate companies, it shall, in addition to the standalone financial statements, prepare a consolidated financial</li>
            <li>-- PAGE 9 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.9 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-3" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-3" num="10.9" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS statement of the company and of all the subsidiaries and associate companies in the same form and manner as that of its own and in accordance with applicable accounting standards, which shall also be laid before the annual general meeting (AGM) of the company along with the laying of its financial statement. The company shall also attach along with its financial statement, a separate statement containing the salient features of the financial statement of its subsidiary or subsidiaries in Form AOC-1 as per Rule 5 of the Companies (Accounts) Rules, 2014. For the purpose of section 129, ‘subsidiary’ includes ‘associate company’ and ‘joint venture’ which means that the company would be required to prepare consolidated financial statements including associate/ joint venture even if there is no subsidiary of a company. The consolidation of financial statements of the company shall be made in accordance with the provisions of Schedule III of the Companies Act 2013 and the applicable accounting standards. In case of a company covered under sub-section (3) of section 129 which is not required to prepare consolidated financial statements under the Accounting Standards, it shall be sufficient if the company complies with provisions of consolidated financial statements provided in Schedule III of the Act. Exemptions from preparation of CFS: As per Companies (Accounts) Amendment Rules, 2016, preparation of consolidated financial statements by a company is not required if it meets the following conditions: (i) it is a wholly-owned subsidiary, or is a partially-owned subsidiary of another company and all its other members, including those not otherwise entitled to vote, having been intimated in writing and for which the proof of delivery of such intimation is available with the company, do not object to the company not presenting consolidated financial statements; (ii) it is a company whose securities are not listed or are not in the process of listing on any stock exchange, whether in or outside India; and <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 10 --- (iii) its ultimate or any intermediate holding company files consolidated financial statements with the Registrar which are in compliance with the applicable Accounting Standards. AS21 also lays down the accounting principles and procedures for preparation and presentation of consolidated financial statements which have been covered in the later part of this chapter. It may be pertinent to note that in certain countries outside India, presentation of standalone financial statements is not mandatory. In fact, it is the preparation and presentation of consolidated financial statements that are mandatory, given the reasoning behind Consolidated Financial Statements already discussed in the example of Reliance Industries Limited above. In India, the statutory framework (such as the Companies Act, 2013 or the Income Tax Act, 1961) mandate presentation of standalone financial statements, thereby making standalone financial statements equally important as consolidated financial statements.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.5 SCOPE OF AS 21 */}
        <section id="as-21-scope-of-as-21" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-scope-of-as-21" num="1.5" title="SCOPE OF AS 21" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            1. This Standard should be applied in the preparation and presentation of consolidated financial statements for a group of enterprises under the control of a parent. 2. This Standard should also be applied in accounting for investments in subsidiaries in the separate financial statements of a parent. 3. In the preparation of consolidated financial statements, other Accounting Standards also apply in the same manner as they apply to the separate statements. 4. This Standard does not deal with: a. methods of accounting for amalgamations and their effects on consolidation, including goodwill arising on amalgamation (see <strong>AS 14</strong>, Accounting for Amalgamations); b. accounting for investments in associates (governed by <strong>AS 13</strong>, Accounting for <strong>Investments</strong>); and <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 11 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.11 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-4" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-4" num="10.11" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS c. accounting for investments in joint ventures (governed by <strong>AS 13</strong>, Accounting for <strong>Investments</strong>). Note: <strong>AS 21</strong> is mandatory if an enterprise presents consolidated financial statements. In other words, the accounting standard does not mandate an enterprise to present consolidated financial statements but, if the enterprise presents consolidated financial statements for complying with the requirements of any statute or otherwise, it should prepare and present consolidated financial statements in accordance with <strong>AS 21</strong>. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.6 CONTROL */}
        <section id="as-21-control" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-control" num="1.6" title="CONTROL" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The consolidated financial statements are prepared on the basis of financial statements of parent and all enterprises that are controlled by the parent, other than those subsidiaries excluded for the reasons set out in paragraph 11 of <strong>AS 21</strong>. Control exists when the parent owns, directly or indirectly through subsidiary(ies), more than one-half of the voting power of an enterprise. Control also exists when an enterprise controls the composition of the board of directors (in the case of a company) or of the corresponding governing body (in case of an enterprise not being a company) so as to obtain economic benefits from its activities. An enterprise may control the composition of the governing bodies of entities such as gratuity trust, provident fund trust etc. Since the objective of control over such entities is not to obtain economic benefits from their activities, these are not considered for the purpose of preparation of consolidated financial statements. For the purpose of this Standard, an enterprise is considered to control the composition of (i) the board of directors of a company, if it has the power, without the consent or concurrence of any other person, to appoint or remove all or a majority of directors of that company. An enterprise is deemed to have the power to appoint a director, if any of the following conditions is satisfied: a. a person cannot be appointed as director without the exercise in his favour by that enterprise of such a power as aforesaid; or <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 12 --- b. a person’s appointment as director follows necessarily from his appointment to a position held by him in that enterprise; or c. the director is nominated by that enterprise or a subsidiary thereof. (ii) the governing body of an enterprise that is not a company, if it has the power, without the consent or the concurrence of any other person, to appoint or remove all or a majority of members of the governing body of that other enterprise. An enterprise is deemed to have the power to appoint a member, if any of the following conditions is satisfied: a. a person cannot be appointed as member of the governing body without the exercise in his favour by that other enterprise of such a power as aforesaid; or b. a person’s appointment as member of the governing body follows necessarily from his appointment to a position held by him in that other enterprise; or c. the member of the governing body is nominated by that other enterprise. Note: It is possible that an enterprise is controlled by two enterprises – one controls by virtue of ownership of majority of the voting power of that enterprise and the other controls, by virtue of an agreement or otherwise, the composition of the board of directors so as to obtain economic benefits from its activities. In such a rare situation, when an enterprise is controlled by two enterprises as per the definition of ‘control’, the first mentioned enterprise will be considered as subsidiary of both the controlling enterprises within the meaning of AS 21 and, therefore, both the enterprises need to consolidate the financial statements of that enterprise.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.7 EXCLUSION FROM PREPARATION OF */}
        <section id="as-21-exclusion-from-preparation-of" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-exclusion-from-preparation-of" num="1.7" title="EXCLUSION FROM PREPARATION OF" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            CONSOLIDATED FINANCIAL STATEMENTS As per <strong>AS 21</strong>, a subsidiary should be excluded from consolidation when: (a) control is intended to be temporary because the subsidiary is acquired and held exclusively with a view to its subsequent disposal in the near future; or <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 13 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.13 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-5" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-5" num="10.13" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS (b) it operates under severe long-term restrictions which significantly impair its ability to transfer funds to the parent. In consolidated financial statements, investments in such subsidiaries should be accounted for in accordance with <strong>AS 13</strong> ‘Accounting for <strong>Investments</strong>’. The reasons for not consolidating a subsidiary should be disclosed in the consolidated financial statements. Where an enterprise owns majority of voting power by virtue of ownership of the shares of another enterprise and all the shares are held as ‘stock-in-trade’ and are acquired and held exclusively with a view to their subsequent disposal in the near future, the control by the first mentioned enterprise is considered to be temporary. It would be pertinent to note that merely holding all the shares as &apos;stock-in-trade&apos;, is not sufficient to be considered as temporary control. It is only when all the shares held as &apos;stock-in-trade&apos; are acquired and held exclusively with a view to their subsequent disposal in the near future, that control would be considered to be temporary within the meaning of point (a) above. The period of time, which is considered as “near future” as mentioned above, primarily depends on the facts and circumstances of each case. However, ordinarily, the meaning of the words ‘near future’ is considered as not more than twelve months from acquisition of relevant investments unless a longer period can be justified on the basis of facts and circumstances of the case. The intention with regard to disposal of the relevant investment is considered at the time of acquisition of the investment. Accordingly if the relevant investment is acquired without an intention to its subsequent disposal in near future, and subsequently, it is decided to dispose off the investments, such an investment is not excluded from consolidation, until the investment is actually disposed off. Conversely, if the relevant investment is acquired with an intention to its subsequent disposal in near future, but, due to some valid reasons, it could not be disposed off within that period, the same will continue to be excluded from consolidation, provided there is no change in the intention. Exclusion of a subsidiary from consolidation on the ground that its business activities are dissimilar from those of the other enterprises within the group is not justified because better information is provided by consolidating such subsidiaries and disclosing additional information in the consolidated financial statements <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 14 --- about the different business activities of subsidiaries. Extending the above Reliance Industries Limited example, though the parent company is in the Oil and Gas Business, and its subsidiaries operate in industries such as telecom, retail trade, fashion and lifestyle, media etc., all the entities have to be consolidated as such consolidated financial statements will then provide better picture of the business and financial position of Reliance Industries Limited. For example, the disclosures required by AS 17 ‘Segment Reporting’, help to explain the significance of different business activities within the group. Consolidation of a subsidiary which is a Limited Liability Partnership (LLP) or a Partnership Firm As per rule 6 of Companies (Accounts) Rules, 2014, under the heading ‘Manner of consolidation of accounts’ it is provided that consolidation of financial statements of a company shall be done in accordance with the provisions of Schedule III to the Companies Act, 2013 and the applicable Accounting Standards. It is noted that relevant Indian Accounting Standard i.e., Ind AS 110, Consolidated Financial Statements provides that where an entity has control on one or more other entities, the controlling entity is required to consolidate all the controlled entities. Since, the word ‘entity’ includes a company as well as any other form of entity, therefore, LLPs and partnership firms are required to be consolidated. Similarly, under Accounting Standard (AS) 21, as per the definition of subsidiary, an enterprise controlled by the parent is required to be consolidated. The term ‘enterprise’ includes a company and any enterprise other than a company. Therefore, under AS also, LLPs and partnership firms are required to be consolidated. Accordingly, in the given case, holding company is required to consolidate its subsidiary which is an LLP or a partnership firm. Consolidation of Limited Liability Partnership (LLP) which is an Associate or Joint Venture If LLP or a partnership firm is an associate or joint venture of holding company, even then the LLP and the partnership firm need to be consolidated in accordance with the requirements of applicable Accounting Standards.</li>
            <li>-- PAGE 15 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.15 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-6" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-6" num="10.15" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.8 ADVANTAGES OF CONSOLIDATED */}
        <section id="as-21-advantages-of-consolidated" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-advantages-of-consolidated" num="1.8" title="ADVANTAGES OF CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS The main advantages of consolidation are given below: (i) Single source document: From the consolidated financial statements, the users of accounts can get an overall picture of the Group (i.e. holding company and its subsidiaries). Consolidated profit and loss account gives the overall profitability of the group. (ii) Intrinsic value of share: Intrinsic share value of the holding company can be calculated directly from the Consolidated Balance Sheet. (iii) Acquisition of subsidiary: The minority interest data of the consolidated financial statement indicates that the amount payable to the outside shareholders of the subsidiary company at book value which is used as the starting point of bargaining at the time of acquisition of a subsidiary by the holding company. (iv) Evaluation of holding company in the market: The overall financial health of the holding company can be judged using consolidated financial statements. Those who want to invest in the shares of the holding company or acquire it, need such consolidated statement for evaluation. Acquisition of Subsidiary Evaluation of Holding Company in the market Intrinsic value of share Single Source Document Advantages of Consolidation <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 16 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.9 COMPONENTS OF CONSOLIDATED */}
        <section id="as-21-components-of-consolidated" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-components-of-consolidated" num="1.9" title="COMPONENTS OF CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS As per <strong>AS 21</strong>, consolidated financial statements normally include the following: ♦ The consolidated financial statements are presented to the extent possible in the same format as that adopted by the parent for its separate financial statements. All the notes appearing in the separate financial statements of the parent enterprise and its subsidiaries need not be included in the notes to the consolidated financial statement. For preparing consolidated financial statements, the following principles may be observed in respect of notes and other explanatory material that form an integral part thereof: (a) Notes which are necessary for presenting a true and fair view of the consolidated financial statements are included in the consolidated financial statements as an integral part thereof. (b) Only the notes involving items which are material need to be disclosed. <strong>Materiality</strong> for this purpose is assessed in relation to the information consolidated financial statements Consolidated Balance Sheet Consolidated Statement of Profit and Loss Account Consolidated Cash Flow Statement (in case parent presents cash flow statement) Notes and statements and explanatory schedules <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 17 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.17 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-7" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-7" num="10.17" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS contained in consolidated financial statements. In view of this, it is possible that certain notes which are disclosed in separate financial statements of a parent or a subsidiary would not be required to be disclosed in the consolidated financial statements when the test of materiality is applied in the context of consolidated financial statements. (c) Additional statutory information disclosed in separate financial statements of the subsidiary and/or a parent having no bearing on the true and fair view of the consolidated financial statements need not be disclosed in the consolidated financial statements. In addition, the consolidated financial statements shall disclose the information as per the requirements specified in the applicable Accounting Standards including the following as per the requirements of Schedule III to the Companies Act, 2013 which contains the ‘General Instructions for Preparation of Consolidated Financial Statements’: (i) Profit or loss attributable to “minority interest” and to owners of the parent in the statement of profit and loss shall be presented as allocation for the period. (ii) “Minority interests” in the balance sheet within equity shall be presented separately from the equity of the owners of the parent. Students are also advised to refer the Schedule III to the Companies Act, 2013. It may be noted that companies do not maintain any separate set of journal entries for ‘Consolidated Set of Accounts’. Continuing the example of Reliance Industries Limited, Consolidated Financial Statements of Reliance Industries Limited is not based on “double entry book-keeping in the ‘group books of accounts’”, as there is no concept of ‘group books of accounts’. Practically, Consolidated Financial Statements are prepared from the separate / standalone financial statements of each entity (parent / subsidiary) to which consolidation adjustments are made in accordance with <strong>AS 21</strong>. Accordingly, the financial statements of each entity are finalized in accordance with the applicable Accounting Standards, and based on such financial statements, consolidation procedures are performed in accordance with <strong>AS 21</strong>. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 18 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.10 CONSOLIDATION PROCEDURES */}
        <section id="as-21-consolidation-procedures" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-consolidation-procedures" num="1.10" title="CONSOLIDATION PROCEDURES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Rule 6 of the Companies (Accounts) Rules, 2014 states that the manner of consolidation of financial statements of the company shall be in accordance with the provisions of Schedule III of the Act and the applicable accounting standards. <strong>AS 21</strong>, lays down the procedure for consolidation of financial statements of the companies within the group. When preparing consolidated financial statements, the individual balances of the parent and its subsidiaries are combined or consolidated on a line-by-line basis, and then certain consolidation adjustments are made. For example, the cash, trade receivables and prepayments of the parent and each subsidiary are added together to arrive at the cash, trade receivables and prepayments of the group, before consolidation adjustments are made. The objective is that the consolidated financial statements should present the information contained in the consolidated financial statements of a parent and its subsidiaries as if they were the financial statements of a single economic entity. The various steps involved in the consolidation process are as follows: 1. the cost to the parent of its investment (cost of acquisition) in each subsidiary and the parent’s portion of equity of each subsidiary (acquirer’s interest), at the date on which investment in each subsidiary is made, should be eliminated. In case, cost of acquisition exceeds or is less than the acquirer’s interest, at the date on which investment in the subsidiary is made, goodwill or capital reserve should be recognized respectively in the CFS. 2. intragroup transactions, including sales, expenses and dividends, are eliminated, in full; 3. Adjustments in respect of unrealised profits/ losses should be made; 4. minority interest in the net income of consolidated subsidiaries for the reporting period are identified and adjusted against the income of the group in order to arrive at the net income attributable to the owners of the parent; and 5. minority interests in the net assets of consolidated subsidiaries should be identified and presented in the consolidated balance sheet separately from <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 19 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.19 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-8" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-8" num="10.19" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS liabilities and the equity of the parent’s shareholders. Minority interests in the net assets consist of: (i) the amount of equity attributable to minorities at the date on which investment in a subsidiary is made; and (ii) the minorities share of movements in equity since the date the parent- subsidiary relationship came in existence. Note: Where the carrying amount of the investment in the subsidiary is different from its cost, the carrying amount is considered for the purpose of above computations. 6. The results of operations of a subsidiary are included in the CFS as from the date on which parent-subsidiary relationship came in existence. The results of operations of a subsidiary with which parent-subsidiary relationship ceases to exist are included in the consolidated statement of profit and loss until the date of cessation of the relationship. The difference between the proceeds from the disposal of investment in a subsidiary and the carrying amount of its assets less liabilities as of the date of disposal is recognised in the consolidated statement of profit and loss as the profit or loss on the disposal of the investment in the subsidiary. In order to ensure the comparability of the financial statements from one accounting period to the next, supplementary information is often provided about the effect of the acquisition and disposal of subsidiaries on the financial position at the reporting date and the results for the reporting period and on the corresponding amounts for the preceding period. 7. An investment in an enterprise should be accounted for in accordance with <strong>AS 13</strong>, Accounting for <strong>Investments</strong>, from the date that the enterprise ceases to be a subsidiary and does not become an associate. 8. The carrying amount of the investment at the date that it ceases to be a subsidiary is regarded as cost thereafter. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 20 --- Thus, Consolidation Adjustments are broadly categorized as under: * Disposal of Subsidiary is not examined at the Intermediate Level. 1.11.CALCULATION OF GOODWILL/CAPITAL RESERVE (COST OF CONTROL) As on the date of investment, the cost of investment and the equity in the subsidiary needs to be calculated. Equity is defined as the ‘residual interest in the assets of an enterprise after deducting all its liabilities.’ In other words, it is equal to the net worth of the enterprise. Once the above is calculated, goodwill or capital reserve is calculated as under: Goodwill = Cost of Investment - Parent’s share in the equity of the subsidiary on date of investment Capital Reserve = Parent’s share in the equity of the subsidiary on date of investment – Cost of investment The parent’s portion of equity in a subsidiary, at the date on which investment is made, is determined on the basis of information contained in the financial statements of the subsidiary as on the date of investment. Consolidation Adjustments MAJOR ADJUSTMENTS Those which &apos;drive&apos; the double entry: 1. Goodwill / Capital Reserve (i.e., cost of Control) 2. Minority Interests 3. Consolidated Reserves 4. Disposal of Subsidiary* INTRA-GROUP ADJUSTMENTS 1. Intra-group balances 2. Unrealized profit 3. Inventory 4. Non-Current Asset transfers 5. Minority Interests</li>
            <li>-- PAGE 21 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.21 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-9" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-9" num="10.21" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS However, if the financial statements of a subsidiary as on the date of investment are not available and if it is impracticable to draw the financial statements of the subsidiary as on that date, financial statements of the subsidiary for the immediately preceding period are used as a basis for consolidation. Adjustments are made to these financial statements for the effects of significant transactions or other events that occur between the date of such financial statements and the date of investment in the subsidiary. It may be mentioned that positive or negative differential is separately recognised only in purchase method. This differential calculated as cost of control is shown in the consolidated balance sheet. A detailed illustration below will help in understanding the concept of goodwill / capital reserve. Example 1 The following information is given as at 31 March 20X1 P Ltd. S Ltd. Non-current Assets: PPE 2,000 500 Investment in Subsidiary 1,000 Net Current Assets 2,000 500 5,000 1,000 Issued Capital 500 1,000 Reserves and Surplus 4,500 5,000 1,000 P Ltd. acquired 100% of shares of S Ltd. on 31 March 20X1 for ` 1,000. Since P Ltd. has acquired S Ltd., we will have to determine goodwill / capital reserve. Let us understand why goodwill / capital reserve arises in case of consolidation, and what would be the interpretation of the same. In the given case, P Ltd. acquired all the shares of S Ltd. by paying ` 1,000. This payment (i.e., purchase consideration) would be made by P Ltd. to the shareholder(s) of S Ltd. (hence the transfer of this amount would not appear in the books of S Ltd.). <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 22 --- By paying ` 1,000, P Ltd. has acquired ‘control’ over S Ltd. This acquisition is quite different from the concept of amalgamation done in accordance with AS 14, though the concept of goodwill / capital reserve is similar. Under AS 14, the target company would generally liquidate, and all assets and liabilities would be transferred from the Selling Company to the Purchasing Company. In case of consolidation, P Ltd. is acquiring ‘control’ i.e., by way of acquiring equity shares in S Ltd.. Thus, S Ltd. continues to exist, and the assets and liabilities of S Ltd. are not transferred to P Ltd., but instead continue to remain with S Ltd. only. However, since in substance, acquisition has taken place (albeit through transfer of control), the purchase consideration of ` 1,000 will be compared with the net worth of S Ltd., which is ` 1,000. Since amount paid (i.e., purchase consideration) equals the net worth, no goodwill / capital reserve is recognized. In case the amount paid (i.e., purchase consideration) would be higher / lower than the net worth of S Ltd., such difference would be recognized in Goodwill / Capital Reserve respectively. The calculation of goodwill is presented below: Tangible Assets 500 Net Current Assets 500 1,000 Less: Liabilities NIL Net Worth of S Ltd. 1,000 Investment in S Ltd. (purchase consideration) 1,000 Goodwill / (Capital Reserve) NIL Example 2 Modifying example 1, the following information is given as at 31 March 20X1 P Ltd. S Ltd. Non-current Assets: PPE 2,000 500 Investment in Subsidiary 1,000 Net Current Assets 2,000 500 5,000 1,000</li>
            <li>-- PAGE 23 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.23 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-10" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-10" num="10.23" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Issued Capital 500 700# Reserves and Surplus 4,500 300# 5,000 1,000 # As compared to Example 1 – There is a difference in the break-up of net worth of S Ltd. (Example 1 – Issued capital was 1,000 and Reserves and Surplus was Nil; The Net worth is 1,000). P Ltd. acquired 100% of shares of S Ltd. on 31 March 20X1 for ` 1,000. Like Example 1 above P Ltd. has acquired ‘control’ over S Ltd. by paying ` 1,000. Accordingly, the purchase consideration of ` 1,000 will be compared with the net worth of S Ltd. which is ` 1,000. Since amount paid (i.e., purchase consideration) equals the net worth, no goodwill / capital reserve is recognized. In case the amount paid (i.e., purchase consideration) would be higher / lower than the net worth of S Ltd., such difference would be recognized in Goodwill / Capital Reserve respectively. The calculation of goodwill is presented below: Tangible Assets 500 Net Current Assets 500 1,000 Less: Liabilities NIL Net Worth of S Ltd. 1,000 Investment in S Ltd. (purchase consideration) 1,000 Goodwill / (Capital Reserve) NIL Example 3 Modifying example 2, the following information is given as at 31 March 20X1 P Ltd. S Ltd. Non-current Assets: PPE 2,000 500 Investment in Subsidiary 1,200 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 24 --- Net Current Assets 2,000 500 5,200 1,000 Issued Capital 700 700 Reserves and Surplus 4,500 300 5,200 1,000 P Ltd. acquired 100% of shares of S Ltd. on 31 March 20X1 for ₹ 1,200. Like Examples 1 and 2 above P Ltd. has acquired ‘control’ over S Ltd. by paying ` 1,200. Accordingly, the purchase consideration of ` 1,200 will be compared with the net worth of S Ltd. which is ` 1,000. Since amount paid (i.e., purchase consideration) exceeds the net worth, such excess of is recognized as goodwill. In case the amount paid (i.e., purchase consideration) would be lower than the net worth of S Ltd., such difference would be credited to Capital Reserve. The calculation of goodwill is presented below: Tangible Assets 500 Net Current Assets 500 1,000 Less: Liabilities NIL Net Worth of S Ltd. 1,000 Investment in S Ltd. (purchase consideration) 1,200 Goodwill / (Capital Reserve) 200</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.12 MINORITY INTERESTS */}
        <section id="as-21-minority-interests" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-minority-interests" num="1.12" title="MINORITY INTERESTS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Minority interest is that part of the net assets of a subsidiary attributable to interest which is held by outsiders. Minority interests in the net income of consolidated subsidiaries for the reporting period are identified and adjusted against the income of the group in order to arrive at the net income attributable to the shareholders of the holding company. Minority interests should be presented in the consolidated balance sheet separately from liabilities and the equity of the parent’s shareholders. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 25 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.25 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-11" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-11" num="10.25" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Minority interest in the income of the group should be separately presented in the consolidated income statement. Minority interests in the net assets consist of: (i) The amount of equity attributable to minorities at the date on which investment in a subsidiary is made and (ii) The minorities’ share of movements in equity since the date the parent- subsidiary relationship came in existence. The losses applicable to the minority in a consolidated subsidiary may exceed the minority interest in the equity of the subsidiary. The excess, and any further losses applicable to the minority, are adjusted against the majority interest except to the extent that the minority has a binding obligation to and is able to make good the losses. If the subsidiary subsequently reports profit, all such profits are allocated to the majority interest until the minority’s share of losses previously absorbed by the majority has been recovered. Example 4 Modifying Example 2, the following information is given as at 31 March 20X1: P Ltd. S Ltd. Non-current Assets: Tangible Assets 2,000 500 Investment in Subsidiary 1,000 Net Current Assets 2,000 500 5,000 1,000 Issued Capital 500 700 Reserves and Surplus 4,500 300 5,000 1,000 P Ltd. acquired 80% of shares of S Ltd. on 31 March 20X1 for ` 1,000. In the given case, P Ltd. acquired 80% of the shares of S Ltd. by paying ` 1,000. This payment (i.e., purchase consideration) would be made by P Ltd. to the shareholder(s) of S Ltd. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 26 --- By paying ` 1,000, P Ltd. has acquired ‘control’ over S Ltd. We cannot say that P Ltd. has acquired only ‘80% control’, since its shareholding in S Ltd. will enable it to take all the decisions regarding S Ltd.’s operations and usage of assets and repayment of liabilities. However, the fact remains that 20% stake does NOT belong to S Ltd. It belongs to outsiders, who are called ‘Minority Interest’ in accordance with AS 21. Accordingly, in this case, the purchase consideration of ` 1,000 will be compared with 80% of the net worth of S Ltd. Any excess or deficit would be recorded as goodwill / capital reserve respectively. 20% of the net worth on the date of acquisition would be recorded separately as Minority Interest. AS 21 defines Minority Interest as that part of the net results of operations and of the net assets of a subsidiary attributable to interests which are not owned, directly or indirectly through subsidiary(ies), by the parent. As per Schedule III to the Companies Act, 2013, “Minority Interests” in the balance sheet within equity shall be presented separately from the equity of the owners of the parent. In the given case, the calculation of goodwill is presented below: Tangible Assets: 80% being share of parent 400 Net Current Assets: 80% being share of parent 400 800 Less: Liabilities NIL Net Worth of S Ltd.: attributable to the parent&apos;s shareholding 800 Investment in S Ltd. (purchase consideration) 1,000 Goodwill / (Capital Reserve) 200.PROFIT OR LOSS OF SUBSIDIARY COMPANY For the purpose of consolidated balance sheet preparation, all reserves and profits (or losses) of subsidiary company should be classified into pre and post- acquisition reserves and profits (or losses).</li>
            <li>-- PAGE 27 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.27 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-12" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-12" num="10.27" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Profits (or losses) earned (or incurred) by subsidiary company up to the date of acquisition of the shares by the holding company are pre acquisition or capital profits (or loss). Similarly, all reserves of subsidiary company up to the date of acquisition are capital reserves from the view point of holding company. If the holding interest in subsidiary is acquired during the middle or some other period of the current year, pre-acquisition profit should be calculated accordingly. The minority interest in the reserves and profits (or losses) of subsidiary company should be transferred to minority interest account which will also include share capital of subsidiary company held by outsiders / minority shareholders. Minority Interest = Share Capital of subsidiary belonging to outsiders + Minority interest in reserves and profits of subsidiary company The holding company’s interest in the pre-acquisition reserves and profits (or losses) should be adjusted against cost of control to find out goodwill or capital reserve on consolidation. The reserves and profits (or loss) of subsidiary company, representing holding company’s interest in post-acquisition or revenue reserves and profits (or losses), should be added to the reserves and profits (or losses) of holding company. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.14 CONSOLIDATION ADJUSTMENTS */}
        <section id="as-21-consolidation-adjustments" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-consolidation-adjustments" num="1.14" title="CONSOLIDATION ADJUSTMENTS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            A. Revaluation of Assets of Subsidiary Company It may be possible that the fair value of the assets of the subsidiary may be different from the book value. Hence, the parent may choose to perform a revaluation of the assets of the subsidiary for the purposes of consolidation. It may be noted that such revaluation is not performed in the standalone / separate financial statements of the subsidiary. The profit or loss on revaluation of fixed assets of subsidiary should also be treated as capital profit or loss. But if the fall in the value of the asset occurs after the date of acquisition, the loss should be treated as revenue loss. Adjustment for depreciation would be made in the profit and loss account of the subsidiary. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 28 --- Depreciation on changed value of the assets shall be given effect to. Depreciation on revalued assets will be taken as capital or revenue depending on the period for which the depreciation belongs to. Hence the period for depreciation is important to be considered. Property, Plant and Equipment (PPE) Initial Recognition Fair Value (-) Carrying Amount (As on the date of acquisition) PPE A/c Dr. xxx Post P/L Dr. xxx To Pre- P/L xxx To PPE xxx (In case of upward revaluation) (Additional depreciation) Pre- P/L Dr. xxx PPE Dr. xxx To PPE xxx To Post P/L xxx (In case of downward revaluation) (Reversal of excess depreciation) 1. The above entries are not recorded in the standalone books of either the subsidiary or the parent. These entries are only for understanding the impact in the consolidated financial statements and as such, only the effect of such entries will appear in the consolidated financial statements (and not the standalone / separate financial statements). 2. It is presumed that the subsidiary does not follow the revaluation model for accounting of fixed assets. If it had to follow, then the standalone balance sheet of the subsidiary would already contain the impact of the revaluation. The debit /credit on account of revaluation could alternatively be taken to the Revaluation Reserve or the P/L depending on whether it is a first-time upward / downward revaluation. However, as ultimately the reserves have to be analyzed between pre- and post-acquisition for the purposes of consolidation, the nature of reserves is irrelevant. Additional Depreciation would arise in case of initial upward or Reversal of excess depreciation would arise in case of initial downward valuation. Subsequent Measurement</li>
            <li>-- PAGE 29 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.29 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-13" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-13" num="10.29" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Example 5 H Ltd. acquires 70% of the equity shares of S Ltd. on.20X1. On that date, paid up capital of S Ltd. was 10,000 equity shares of ` 10 each; accumulated reserve balance was ` 1,00,000. H Ltd. paid ` 1,60,000 to acquire 70% interest in the S Ltd. Assets of S Ltd. were revalued on.20X1 and a revaluation loss of ` 20,000 was ascertained. The book value of shares of S Ltd. is calculated as shown below: ` 70% of the Equity Share Capital ` 1,00,000 70,000 70% of Accumulated Reserve ` 1,00,000 70,000 70% of Revaluation Loss ` 20,000 (14,000) 1,26,000 So, H Ltd. paid a positive differential of ` 34,000 i.e. ` (1,60,000 – 1,26,000). This differential is called goodwill and is shown in the balance sheet under the head intangibles. Example 6 A Ltd. acquired 70% interest in B Ltd. on.20X1. On that date, B Ltd. had paid-up capital of ` 1,00,000 consisting of 10,000 equity shares of ` 10 each and accumulated balance in reserve and surplus of `1,00,000. On that date, assets and liabilities of B Ltd. were also revalued and revaluation profit of ` 20,000 was calculated. A Ltd. paid ` 1,30,000 to purchase the said interest. In this case, the book value of Shares of B Ltd. is calculated as shown below: ` 70% of the Equity Share Capital `1,00,000 70,000 70% of Reserves and Surplus ` 1,00,000 70,000 70% of Revaluation Profit ` 20,000 14,000 1,54,000 In this case, a negative differential of ` 24,000 arises i.e. (1,54,000 – 1,30,000) which is called and presented as capital reserve. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 30 --- Example 7 H Ltd. acquired 16,000 equity shares of ` 10 each, in S Ltd. on October 1, 20X1 for ` 3,06,800. The profit and loss account of S Ltd. showed a balance of `10,000 on April 1,20X1. The plant and machinery of S Ltd. which stood in the books at ` 1,50,000 on April 1,20X1 was considered worth ` 1,80,000 on the date of acquisition. The information of the two companies as at 31-3-20X2 was as follows: H Ltd.( `) S Ltd. ( `) Shares capital (fully paid equity shares of ` 10 each) 5,00,000 2,00,000 General reserve 2,40,000 1,00,000 Profit and loss account 57,200 82,000 Current Liabilities 1,69,800 33,000 Land and building 1,80,000 1,90,000 Plant and machinery 2,40,000 1,35,000 Investments 3,06,800 Current assets 2,40,200 90,000 In this case, Percentage of holding: No. of Shares Percentage Holding Co. : 16,000 (80%) Minority shareholders : 4,000 (20%) TOTAL SHARES : 20,000</li>
            <li>-- PAGE 31 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.31 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-14" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-14" num="10.31" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Impact of Revaluation of Plant and Machinery will be as - ` Book value of Plant and Machinery as on 01-04-20X1 1,50,000 Depreciation Rate (1,50,000-1,35,000) 1,50,000 = 15,000/1,50,000 X100 10% Book value of Plant and Machinery as on 01-10-20X1 after six months depreciation @10% (1,50,000-7,500) 1,42,500 Revalued at 1,80,000 Revaluation profit (1,80,000-1,42,500) 37,500 Share of H Limited in Revaluation Profit (80%) 30,000 Share of Minority in Revaluation profit (20%) 7,500 Additional Depreciation on appreciated value to be charged from post- acquisition profits (10% of ` 1,50,000 for 6 months) + (10% of ` 1,80,000 for 6 months) less ` 15,000 (as already charged) 1500 Share of H Limited in additional depreciation that will reduce its share (80%) in post-acquisition profit by 1,200 Share of Minority Interest in additional depreciation 300 B. Dividend Received From SubsidiarY(IES) As per <strong>AS 13</strong>, ‘Accounting for <strong>Investments</strong>’, Interest, dividends and rentals receivables in connection with an investment are generally regarded as income, being the return on the investment. However, in some circumstances, such inflows represent a recovery of cost and do not form part of income. Example: When unpaid interest has accrued before the acquisition of an interest- bearing investment and is therefore included in the price paid for the investment, the subsequent receipt of interest is allocated between pre-acquisition and post- acquisition periods; the pre-acquisition portion is deducted from cost. When dividends on equity are declared from pre-acquisition profits, a similar treatment (i.e. as mentioned above) may apply. If it is difficult to make such an <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 32 --- allocation except on an arbitrary basis, the cost of investment is normally reduced by dividends receivable only if they clearly represent a recovery of a part of the cost. When holding company receives dividend from a subsidiary company, it must distinguish between the part received out of capital profits (i.e. pre-acquisition profits) and revenue profits (i.e. post-acquisition profits); capital profits are credited to Investment account (being capital receipts) and revenue profits are credited to the Profit &amp; Loss Account. If the controlling interest was acquired during the course of a year, profit for that year must be apportioned into the pre-acquisition and post-acquisition portions, on the basis of time in the absence of information on the point. It must be understood that the term ‘capital profit’, in this context, apart from the generic meaning of the term, connotes profit earned by the subsidiary company till the date of acquisition. As a result, profits which may be of revenue nature for the subsidiary company may be capital profits so far as the holding company is concerned. Treatment in case of post-acquisition dividend Post acquisition dividend Accounted by the subsidiary No further adjustment required Not accounted by the subsidiary Adjusted at the time of consolidation In the books of the holding company Accounted by crediting P&amp;L A/c of the holding company</li>
            <li>-- PAGE 33 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.33 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-15" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-15" num="10.33" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Treatment in case of pre-acquisition dividend Dividends received out of profits earned before purchase of investments normally also are credited to the Investment Account. Example 8 If shares in X Ltd., are purchased in January 20X2 and in April 20X2, X Ltd., declares a dividend in respect of 20X1, the dividend received by the holder of the shares correctly should not be treated as income but as capital receipt and credited to Investment Account. Note: In case of issue of bonus shares by the subsidiary company, the holding company, like other holders, record no entry; only the number of shares held is increased. Illustration 1 From the following data, determine in each case: (1) Minority interest at the date of acquisition and at the date of consolidation. (2) Goodwill or Capital Reserve. Accounted by holding company If correctly accounted as reduction to the cost of investment No further adjustment required If wrongly accounted by crediting to P&amp;L A/c Reverse the entry passed and credit investment in subsidiary Not accounted by holding company Adjust the same at the time of consolidation Account for as reduction to cost of investment Not accounted by subsidiary company Adjust the same at the time of consolidation Reduce the pre- acquisition profit of subsidiary and then distribute it into holding and minority interest Also reduce the cost of investment <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 34 --- (3) Amount of holding company’s profit in the consolidated Balance Sheet assuming holding company’s own Profit &amp; Loss Account to be ` 2,00,000 in each case: Subsidiary Company % shares owned Cost Date of acquisition Consolidation Date.20X1.20X1 Case Share Capital Profit &amp; Loss Account Share Capital Profit &amp; Loss Account ` ` ` ` ` Case 1 A 90% 1,40,000 1,00,000 50,000 1,00,000 70,000 Case 2 B 85% 1,04,000 1,00,000 30,000 1,00,000 20,000 Case 3 C 80% 56,000 50,000 20,000 50,000 20,000 Case 4 D 100% 1,00,000 50,000 40,000 50,000 55,000 Solution (1) Minority Interest = Equity attributable to minorities Equity is the residual interest in the assets of an enterprise after deducting all its liabilities i.e. in this case it should be equal to Share Capital + Profit &amp; Loss A/c Minority % Shares Owned Minority interest as at the date of acquisition Minority interest as at the date of consolidation [E] [E] x [A + B] ` [E] X [C + D] ` Case 1 [100-90] 10 % 15,000 17,000 Case 2 [100-85] 15 % 19,500 18,000 Case 3 [100-80] 20 % 14,000 14,000 Case 4 [100-100] NIL Nil Nil</li>
            <li>-- PAGE 35 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.35 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-16" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-16" num="10.35" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS A = Share capital on.20X1 B = Profit &amp; loss account balance on.20X1 C = Share capital on.20X1 D = Profit &amp; loss account balance on.20X1 (2) Calculation of Goodwill or Capital Reserve Shareholding Cost Total Equity Parent’s Portion of equity Goodwill Capital Reserve % [F] [G] [A] + [B] = [C] [F] x [C] =H ` [G] – [H] ` [H] – [G] Case 1 90 % 1,40,000 1,50,000 1,35,000 5,000 — Case 2 85 % 1,04,000 1,30,000 1,10,500 — 6,500 Case 3 80 % 56,000 70,000 56,000 Nil Nil Case 4 100 % 1,00,000 90,000 90,000 10,000 — (3) The balance in the Profit &amp; Loss Account on the date of acquisition (1.1.20X1) is Capital profit, as such the balance of Consolidated Profit &amp; Loss Account shall be equal to Holding Co.’s profit. On.20X1 in each case the following amount shall be added or deducted from the balance of holding Co.’s Profit &amp; Loss account. % Share holding [K] P &amp; L as on.20X1 [L] P &amp; L as on consolidati on date [M] P &amp; L post acquisition [N] = [M]-[L] Amount to be added / (deducted) from holding’s P &amp; L [O] = [K] x [N] 1 90 % 50,000 70,000 20,000 18,000 2 85 % 30,000 20,000 (10,000) (8,500) 3 80 % 20,000 20,000 NIL NIL 4 100 % 40,000 55,000 15,000 15,000 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 36 --- Illustration 2 XYZ Ltd. purchased 80% shares of ABC Ltd. on 1st January, 20X1 for ` 1,40,000. The issued capital of ABC Ltd., on 1st January, 20X1 was ` 1,00,000 and the balance in the Profit &amp; Loss Account was ` 60,000. During the year ended 31st December, 20X1, ABC Ltd. earned a profit of ` 20,000 and at year end, declared and paid a dividend of ` 15,000. Show by an entry how the dividend should be recorded in the books of XYZ Ltd. What is the amount of minority interest as on 1st January, 20X1 and 31st December, 20X1? Also please check whether there should be any goodwill/ capital reserve at the date of acquisition. Solution Total dividend paid is ` 15,000 (assumed to be out of post-acquisition profits), hence dividend received by XYZ will be credited to P &amp; L. XYZ Ltd.’s share of dividend = ` 15,000 X 80% = ` 12,000 In the books of XYZ Ltd. ` ` Bank A/c Dr. 12,000 To Profit &amp; Loss A/c 12,000 (Dividend received from ABC Ltd credited to P&amp;L A/c being out of post-acquisition profits – as explained above) Goodwill on consolidation (at the date of acquisition): ` ` Cost of shares 1,40,000 Less: Face value of capital i.e. 80% of capital 80,000 Add: Share of capital profits [60,000X 80 %] 48,000 (1,28,000) Goodwill 12,000</li>
            <li>-- PAGE 37 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.37 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-17" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-17" num="10.37" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Minority interest on: - 1st January, 20X1: 20% of ` 1,60,000 [1,00,000 + 60,000] 32,000 - 31st December, 20X1: 20% of ` 1,65,000 [1,00,000 + 60,000 + 20,000 – 15,000] 33,000 Illustration 3 Exe Ltd. acquires 70% of equity shares of Zed Ltd. as on 31st March, 20X1 at a cost of ` 70 lakhs. The following information is available from the balance sheet of Zed Ltd. as on 31st March, 20X1: ` in lakhs Property, plant and equipment 120 <strong>Investments</strong> 55 Current Assets 70 Loans &amp; Advances 15 15% Debentures 90 Current Liabilities 50 The following revaluations have been agreed upon (not included in the above figures): Property, plant and equipment Up by 20% <strong>Investments</strong> Down by 10% Zed Ltd. declared and paid dividend @ 20% on its equity shares as on 31 st March, 20X1 (Face value - ` 10 per share). Exe Ltd. purchased the shares of Zed Ltd. @ ` 20 per share. Calculate the amount of goodwill/capital reserve on acquisition of shares of Zed Ltd. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 38 --- Solution Revalued net assets of Zed Ltd. as on 31st March, 20X1 ` in lakhs ` in lakhs Property, plant and equipment [120 X 120%] 144.0 Investments [55 X 90%] 49.5 Less: 15% Debentures Current Liabilities (140.0) Equity / Net Worth Exe Ltd.’s share of net assets (70% of) 96.95 Exe Ltd.’s cost of acquisition of shares of Zed Ltd. (` 70 lakhs – ` 7 lakhs*) 63.00 * Total Cost of 70 % Equity of Zed Ltd ` 70 lakhs Purchase Price of each share ` 20 Number of shares purchased [70 lakhs /` 20] 3.5 lakhs Dividend @ 20 % i.e. ` 2 per share ` 7 lakhs Since dividend received is for pre-acquisition period, it has been reduced from the cost of investment in the subsidiary company. Illustration 4 A Ltd. acquired 70% of equity shares of B Ltd. on.20X1 at cost of ` 10,00,000 when B Ltd. had an equity share capital of ` 10,00,000 and reserves and surplus of ` 80,000. In the four consecutive years, B Ltd. fared badly and suffered losses of ` 2,50,000, ` 4,00,000, ` 5,00,000 and ` 1,20,000 respectively. Thereafter in 20X5- X6, B Ltd. experienced turnaround and registered an annual profit of ` 50,000. In the</li>
            <li>-- PAGE 39 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.39 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-18" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-18" num="10.39" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS next two years i.e. 20X6-X7 and 20X7-X8, B Ltd. recorded annual profits of ` 1,00,000 and ` 1,50,000 respectively. Show the minority interests and cost of control at the end of each year for the purpose of consolidation. Solution The losses applicable to the minority in a consolidated subsidiary may exceed the minority interest in the equity of the subsidiary. In such cases, <strong>AS 21</strong> prescribes that the excess, and any further losses applicable to the minority, are adjusted against the majority interest except to the extent that the minority has a binding obligation to, and is able to, make good the losses. If the subsidiary subsequently reports profits, all such profits are allocated to the majority interest until the minority&apos;s share of losses previously absorbed by the majority has been recovered. Where the minority interest has a binding obligation (say by way of a shareholders’ agreement), then the share of losses will be attributed to the minority interest even if it exceeds the minority interest in the equity (i.e., debit balance in minority interest). Since information on the existence of a binding obligation is not given in the question, we solve as if such obligation does not exist, and hence the minority interests will be computed as follows: Year Profit/(Loss) Minority Interest (30%) Additional Consolidated P &amp; L (Dr.) Cr. (for the year ended balance) Minority&apos;s Share of losses borne by A Ltd. Cost of Control ` Balance At the time of acquisition in 20X1 3,24,000 - (W.N.) - <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 40 --- 20X1-X2 (2,50,000) (75,000) (1,75,000) 2,44,000 (W.N.) Balance 2,49,000 20X2-X3 (4,00,000) (1,20,000) (2,80,000) 2,44,000 Balance 1,29,000 20X3-X4 (5,00,000) (1,50,000) (3,50,000) 2,44,000 Loss of minority borne by Holding Co. (21,000) 21,000 (21,000) 21,000 21,000 Balance Nil (3,71,000) 20X4-X5 (1,20,000) Loss of minority borne by Holding Co. (36,000) 36,000 (84,000) (36,000) 36,000 57,000 2,44,000 Balance Nil (1,20,000) 20X5-X6 50,000 15,000 35,000 2,44,000 Balance Profit share of minority adjusted against losses of minority absorbed by Holding Co. (15,000) Nil 15,000 50,000 (15,000) 42,000</li>
            <li>-- PAGE 41 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.41 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-19" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-19" num="10.41" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS 20X6-X7 1,00,000 Profit share of minority adjusted against losses of minority absorbed by Holding Co. 30,000 (30,000) 70,000 30,000 (30,000) 12,000 2,44,000 Balance Nil 100,000 20X7-X8 1,50,000 45,000 1,05,000 (12,000) Nil 2,44,000 (12,000) 12,000 Balance 33,000 1,17,000 Working Note: Calculation of Minority interest and Cost of control on.20X1 Share of Holding Co. Minority Interest 100% 70% 30% (`) (`) (`) Share Capital 10,00,000 7,00,000 3,00,000 Reserve 80,000 56,000 24,000 7,56,000 3,24,000 Less: Cost of investment (10,00,000) Goodwill 2,44,000 Illustration 5 Variety Ltd. holds 46% of the paid-up share capital of VR Ltd. The shares were acquired at a market price of ` 17 per share. The balance of shares of VR Ltd. are <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 42 --- held by a foreign collaborating company. A memorandum of understanding has been entered into with the foreign company providing for the following: (a) The shares held by the foreign company will be sold to Variety Ltd. The price per share will be calculated by capitalising the yield at 15%. Yield, for this purpose, would mean 40% of the average of pre-tax profits for the last 3 years, which were ` 30 lakhs, ` 40 lakhs and ` 65 lakhs. (b) The actual cost of the shares to the foreign company was ` 5,40,000 only. The profit that would accrue to them would be taxable at an average rate of 30%. The tax payable will be deducted from the proceeds and Variety Ltd. will pay it to the Government. (c) Out of the net consideration, 50% would be remitted to the foreign company immediately and the balance will be an unsecured loan repayable after two years. The above agreement was approved by all concerned for being given effect to on.20X1. The total assets of VR Ltd. as on 31st March, 20X1 was ` 1,00,00,000. It was decided to write down Property, Plant and Equipment by ` 1,75,000. Current liabilities of VR Ltd. as on the same date were ` 20,00,000. The paid-up share capital of VR Ltd. was ` 20,00,000 divided into 2,00,000 equity shares of ` 10 each. Find out goodwill/capital reserve to Variety Ltd. on acquiring wholly the shares of VR Ltd. Solution 1. Computation of Purchase Consideration (a) Yield of VR Ltd.:       40 30 + 40 +65 × 100 3 ` 18 lakhs (b) Price per share of VR Ltd.: Capitalized Yield:       18 lakhs ` 120 lakhs No. of shares 2 lakhs Therefore, price per share ` 60 (c) Purchase Consideration for 54% shares in VR Ltd. 2 lakh shares x 54% x ` 60 per shares ` 64.80 lakhs</li>
            <li>-- PAGE 43 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.43 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-20" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-20" num="10.43" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS (d) Discharge of Purchase Consideration: Tax at source (` 64.80 lakhs – ` 5.40 lakhs) × 30 100 ` 17.82 lakhs 50% of purchase consideration (net of tax) in cash ` 23.49 lakhs [` (64.80 – 17.82) x 50%] Balance – Unsecured Loan ` 23.49 lakhs 2. Goodwill / Capital Reserve to Variety Ltd. ` in lakhs Less: Reduction in Value of Property, Plant and Equipment (1.75) 98.25 Less: Current Liabilities (20.00) Net Assets of VR Ltd. on Date of Acquisition Purchase Consideration: 54% purchased from Foreign Co. 64.80 Investment: 46% existing stake (80.44) Illustration 6 A Ltd. acquired 60% shares of B Ltd. @ ` 20 per share. Following is the extract of Balance Sheet of B Ltd.: ` 10,00,000 Equity Shares of ` 10 each 1,00,00,000 10% Debentures 10,00,000 Trade Payables 55,00,000 Property, Plant and Equipment 70,00,000 <strong>Investments</strong> 45,00,000 Current Assets 68,00,000 Loans and Advances 22,00,000 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 44 --- On the same day B Ltd. declared dividend at 20% and as agreed between both the companies Property, Plant and Equipment were to be depreciated @ 10% and investment to be taken at market value of ` 60,00,000. Calculate the Goodwill or Capital Reserve to be recorded in Consolidated Financial Statements. Solution Since dividend is declared by B Ltd. on the date of acquisition itself, it would be out of the divisible profits of B Ltd. existing on the date of acquisition i.e., pre- acquisition profits from the perspective of A Ltd. Accordingly, as per AS 13, such pre-acquisition dividend would be reduced from the cost of investment, as seen below in the determination of Goodwill on the date of acquisition. ` ` Assets Property, Plant and Equipment 70,00,000 Less: Value written off (` 70 lakhs x 10%) (7,00,000) 63,00,000 Investments at Market Value 60,00,000 Current Assets 68,00,000 Loans and Advances 22,00,000 2,13,00,000 Less: Liabilities Trade Payables 55,00,000 10% Debentures 10,00,000 (65,00,000) Net Assets of B Ltd. 1,48,00,000 Share of A Ltd. in Net Assets of B Ltd.: 60% 88,80,000 Less: Cost of Investment in B Ltd. (60% stake): 10,00,000 Equity Shares x 60% x ` 20 per share 1,20,00,000 Less: Pre-acquisition dividend: 6,00,000 shares x ` 2 (12,00,000) (1,08,00,000) Goodwill on Date of Acquisition 19,20,000</li>
            <li>-- PAGE 45 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.45 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-21" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-21" num="10.45" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Illustration 7 H Ltd. acquired 3,000 shares in S Ltd., at a cost of ` 4,80,000 on.20X1. The capital of S Ltd. consisted of 5,000 shares of ` 100 each fully paid. The Profit &amp; Loss Account of this company for 20X1 showed an opening balance of ` 1,25,000 and profit for the year was ` 3,00,000. At the end of the year, it declared a dividend of 40%. Record the entry in the books of H Ltd., in respect of the dividend. Assume the profit is accruing evenly and calendar year as financial year. Solution The profits of S Ltd., have to be divided between capital and revenue profits from the point of view of the holding company: Capital Profit (Pre- acquisition) Revenue Profit (Post- acquisition) ` ` Balance on.20X1 1,25,000 — Profit for 20X1 (3,00,000 × 7/12) 1,75,000 (3,00,000×5/12) 1,25,000 Total 3,00,000 1,25,000 Proportionate share of H Ltd. (3/5) 1,80,000 75,000 Total dividend declared = ` 5,00,000 X 40 % = ` 2,00,000 H Ltd.’s share in the dividend = ` 2,00,000 X 3/5 = ` 1,20,000 There can be two situations as regards the treatment of dividend of ` 1,20,000: (1) The profit for 20X1 has been utilised to pay the dividend. The share of H Ltd in profit for the first seven months of S Ltd = ` 1,05,000 (i.e. ` 1,75,000 × 3/5) Profit for the remaining five months = ` 75,000 (i.e.` 1,25,000 × 3/5). <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 46 --- The dividend of ` 1,20,000 will be adjusted in this ratio of 1,05,000: 75,000 = ` 70,000 out of profits up to.20X1 and ` 50,000 out of profits after that date. The dividend out of profits subsequent to.20X1 will be revenue income and that out of earlier profits will be capital receipt. Hence the entry will be: ` ` Bank Dr. 1,20,000 To Investment Account 70,000 To Profit and Loss Account 50,000 (2) Later profits have been utilised first and then pre- acquisition profits. In such a case, the whole of ` 75,000 (share of H Ltd. in profits of S Ltd., after.20X1) would be received and treated as revenue income; the remaining dividend, `45,000 (`1,20,000 less ` 75,000) would be capital receipt. The entry would be: ` ` Bank Dr. 1,20,000 To Investment Account 45,000 To Profit &amp; Loss Account 75,000 Note: Point (2) discussed above can arise only if there is definite information about the profits utilized. In practice, such treatment is rare. Illustration 8 A Ltd. and B Ltd. provide the following information: ` ‘000s A Ltd. B Ltd. Equity Shares 6,000 5,000 6% Preference Shares NIL 1,000 General Reserve 1,200 800</li>
            <li>-- PAGE 47 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.47 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-22" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-22" num="10.47" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Profit and Loss Account 1,020 1,790 Trade Payables 3,850 3,410 Dividend Payable 600 500 Goodwill 100 20 Property, Plant and Equipment 3,850 2,750 Investment 5,620 1,100 Inventory 1,900 4,150 Trade Receivables 600 4,080 Cash &amp; Bank 600 400 A Ltd. purchased 3/4th interest in B Ltd. at the beginning of the year at the premium of 25%. Following other information is available: a. Profit &amp; Loss Account of B Ltd. includes ₹ 1,000 thousands bought forward from the previous year. b. The General Reserve balance is brought forward from the previous year. c. The directors of both the companies have declared a dividend of 10% on equity share capital for the previous and current year. From the above information calculate Pre- and Post-acquisition Profits, Minority Interest and Cost of Control. Solution Calculation of Pre- and Post-Acquisition Profits: Pre-Acquisition Profits (₹) Post-Acquisition Profits (₹) Profit &amp; Loss Account 10,00,000 7,90,000 General Reserve 8,00,000 NIL 18,00,000 7,90,000 Less: Share of Minority Interest: (¼) (4,50,000) (1,97,500) Attributable to Parent 13,50,000 5,92,500 (Cost of Control) (Post-acquisition Profits) <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 48 --- Calculation of Minority Interest: Particulars ₹ Paid-up Equity Share Capital (₹ 50,00,000 x ¼) 12,50,000 Paid-up Preference Share Capital 10,00,000 Share in Reserves: Profit &amp; Loss Account: ₹ 17,90,000 x ¼ 4,47,500 General Reserve: ₹ 8,00,000 x ¼ 2,00,000 Minority Interest 28,97,500 Calculation of Goodwill/Capital Reserve ₹ ₹ Cost of Investment in Subsidiary: ₹ 50,00,000 x 75% x 125% (cost + 25% premium) 46,87,500 Less: Pre-acquisition dividend (3,75,000) 43,12,500 Less: Net Worth of B Ltd. on Date of Acquisition (attributable to A Ltd.): Paid-up Capital 37,50,000 Pre-acquisition Reserves 13,50,000 (51,00,000) Capital Reserve 7,87,500 Illustration 9 On 31 st March, 20X1, P Ltd. acquired 1,05,000 shares of Q Ltd. for ` 12,00,000. The position of Q Ltd. on that date was as under: ` Property, plant and equipment 10,50,000 Current Assets 6,45,000 1,50,000 equity shares of ` 10 each fully paid 15,00,000</li>
            <li>-- PAGE 49 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.49 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-23" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-23" num="10.49" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Pre-incorporation profits 30,000 Profit and Loss Account 60,000 Trade payables 1,05,000 P Ltd. and Q Ltd. give the following information on 31 st March, 20X3: P Ltd. Q Ltd. ` ` Equity shares of ` 10 each fully paid (before bonus issue) 45,00,000 15,00,000 Securities Premium 9,00,000 – Pre-incorporation profits – 30,000 General Reserve 60,00,000 19,05,000 Profit and Loss Account 15,75,000 4,20,000 Trade payables 5,55,000 2,10,000 Property, plant and equipment 79,20,000 23,10,000 Investment: 1,05,000 Equity shares in Q Ltd. at cost 12,00,000 – Current Assets 44,10,000 17,55,000 Directors of Q Ltd. made bonus issue on.20X3 in the ratio of one equity share of ` 10 each fully paid for every two equity shares held on that date. Bonus shares were issued out of post-acquisition profits by using General Reserve. Calculate as on 31st March, 20X3 (i) Cost of Control/Capital Reserve; (ii) Minority Interest; (iii) Consolidated Profit and Loss Account in each of the following cases: (a) Before issue of bonus shares; (b) Immediately After issue of bonus shares. Solution Shareholding pattern Particulars Number of Shares % of holding a. P Ltd. (i) Purchased on.20X1 1,05,000 (ii) Bonus Issue (1,05,000/2) 52,500 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 50 --- Total 1,57,500 70% b. Minority Interest 67,500 30% Calculations of (i) Cost of Control/Capital Reserve; (ii) Minority Interest; (iii) Consolidated Profit and Loss Account as on 31st March, 20X3: (a) Before issue of bonus shares (i) Cost of control/capital reserve ` ` Investment in Q Ltd. 12,00,000 Less: Face value of investments (Share Capital) 10,50,000 Capital profits (W.N.) 63,000 (11,13,000) Cost of control (i.e., Goodwill) 87,000 (ii) Minority Interest ` Share Capital 4,50,000 Capital profits (W.N.) 27,000 Revenue profits (W.N.) 6,79,500 11,56,500 (iii) Consolidated profit and loss account – P Ltd. ` Balance 15,75,000 Add: Share in revenue profits of Q Ltd. (W.N.) 15,85,500 31,60,500 (b) Immediately after issue of bonus shares (i) Cost of control/capital reserve ` ` Face value of investments (` 10,50,000 + ` 5,25,000) 15,75,000 Capital Profits (W.N.) 63,000 16,38,000 Less: Investment in Q Ltd. (12,00,000) Capital reserve 4,38,000</li>
            <li>-- PAGE 51 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.51 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-24" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-24" num="10.51" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS (ii) Minority Interest ` Share Capital (` 4,50,000 + ` 2,25,000) 6,75,000 Capital Profits (W.N.) 27,000 Revenue Profits (W.N.) 4,54,500 11,56,500 (iii) Consolidated Profit and Loss Account – P Ltd. ` Balance 15,75,000 Add: Share in revenue profits of Q Ltd. (W.N.) 10,60,500 26,35,500 Working Note: Analysis of Profits of Q Ltd. Capital Profits (Pre-acquisition) Revenue Profits (Post-acquisition) (Before and after issue of bonus shares) ` Before Bonus Issue ` After Bonus Issue ` Pre-incorporation profits 30,000 Profit and loss account on.20X1 60,000 90,000 General reserve* 19,05,000 19,05,000 Less: Bonus shares (7,50,000) 11,55,000 Profit for period of 1st April, 20X1 to 31 st March, 3,60,000 3,60,000 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 52 --- 20X3 (` 4,20,000 – ` 60,000) 22,65,000 15,15,000 P Ltd.’s share (70%) 63,000 15,85,500 10,60,500 Minority’s share (30%) 27,000 6,79,500 4,54,500 *Share of P Ltd. in General reserve has been adjusted in Consolidated Profit and Loss Account. Illustration 10 Prepare consolidated balance sheet of H Ltd. and its subsidiary as at 31 March, 20X1 from the following information: H Ltd. S Ltd. ` ` PPE 5,00,000 3,00,000 Investments (20,000 equity shares of S Ltd.) 2,20,000 Current Assets 1,55,000 1,00,000 Share capital (Fully paid equity shares of ` 10 each) 5,00,000 2,50,000 Profit and loss account 2,00,000 1,00,000 Trade Payables 1,75,000 50,000 H Ltd. acquired the shares of S Ltd. on 31 st March, 20X1. Solution Percentage of holding: No. of Shares Percentage Holding Co : 20,000 (80%) Minority shareholders : 5,000 (20%) TOTAL SHARES : 25,000</li>
            <li>-- PAGE 53 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.53 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-25" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-25" num="10.53" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Consolidated Balance Sheet of H Ltd. and its subsidiary S Ltd. as at 31 st March,20X1 Note No Amount (`) 1 I EQUITY AND LIABILITIES Shareholder’s Fund (a) Share Capital (b) Reserve and Surplus 1 2 5,00,000 2,60,000 2 3 Minority interest Current Liabilities (a) Trade payables 3 4 70,000 2,25,000 Total 10,55,000 II ASSETS 1. 2. Non-Current Assets PPE Current Assets 5 6 8,00,000 2,55,000 Total 10,55,000 Notes to Accounts Amounts (`) 1 Share capital 50,000 Equity Shares @ `10 each 5,00,000 2 Reserve and Surplus Capital Reserve (W.N. ) Profit and loss account 60,000 2,00,000 2,60,000 3 Minority Interest Paid up value of shares 50,000 Add: Share in Profit and loss account 20,000 70,000 4 Trade payables H Ltd. S Ltd. 1,75,000 50,000 2,25,000 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 54 --- 5 PPE H Ltd. S Ltd. 5,00,000 3,00,000 8,00,000 6 Current Assets H Ltd. S Ltd. 1,55,000 1,00,000 2,55,000 Working Note: Determination of Goodwill/(Capital Reserve) (`) Cost of investment Less: Paid up value of shares (80% of 2,50,000) 2,00,000 Share in pre-acquisition profits (80% of 1,00,000) 80,000 2,20,000 (2,80,000) Capital Reserve (60,000) Illustration 11 H Ltd. and S Ltd. provide the following information as at 31st March,20X2: H Ltd. S Ltd. ` ` PPE 1,00,000 1,30,000 Investments (8,000 equity shares of S Ltd.) 1,26,000 Current Assets 74,000 70,000 Share capital (Fully paid equity shares of `10 each) 1,50,000 1,00,000 Profit and loss account 50,000 40,000 Trade Payables 1,00,000 60,000 Additional information: H Ltd. acquired the shares of S Ltd. on 1-7-20X1 and Balance of profit and loss account of S Ltd. on 1-4-20X1 was 30,000.</li>
            <li>-- PAGE 55 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.55 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-26" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-26" num="10.55" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Prepare consolidated balance sheet of H Ltd. and its subsidiary as at 31st March, 20X2. Solution Percentage of holding: No. of Shares Percentage Holding Co. : 8,000 (80%) Minority shareholders : 2,000 (20%) TOTAL SHARES : 10,000 Consolidated Balance Sheet of H Ltd. and its subsidiary S Ltd. as at 31 st March, 20X2 Note No Amount (`) 1 2 3 I EQUITY AND LIABILITYES Shareholder’s Fund (a) Share Capital (b) Reserve and Surplus Minority interest Current Liabilities (a) Trade payables 1 2 3 4 1,50,000 56,000 28,000 1,60,000 Total 3,94,000 II ASSETS 1 2 Non-Current Assets: PPE Intangible Asset Current Assets 5 6 7 2,30,000 20,000 1,44,000 Total 3,94,000 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 56 --- Notes to Accounts Amount (`) 1 Share capital 15,000 Equity Shares @ `10 each 1,50,000 2 Reserve and Surplus Profit and loss account (` 50,000+ 80% of 9/12 x 10,000) 56,000 3 Minority Interest Share capital (20% of ` 1,00,000) 20,000 Share in Profit and loss account (` 40,000 X 20%) 8,000 28,000 4 Trade payables H Ltd. S Ltd. 1,00,000 60,000 1,60,000 5 PPE H Ltd. S Ltd. 1,00,000 1,30,000 2,30,000 6 Intangible Asset Cost of Investment Less: Paid up value of shares (80% of ` 1,00,000) Share in pre-acquisition profits 80% of [30,000+3/12(40,000-30,000)] 1,26,000 (80,000) (26,000) Goodwill 20,000 7 Current Assets H Ltd. S Ltd. 74,000 70,000 1,44,000</li>
            <li>-- PAGE 57 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.57 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-27" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-27" num="10.57" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Illustration 12 From the Balance Sheets and information given below, prepare Consolidated Balance Sheet of Virat Ltd. and Anushka Ltd. as at 31 st March. Virat Ltd. holds 80% of Equity Shares in Anushka Ltd. since its (Anushka Ltd.’s) incorporation. Balance Sheet of Virat Ltd. and Anushka Ltd. as at 31st March, 20X1 Particulars Note No. Virat Ltd. ( `) Anushka Ltd. ( `) I. Equity and Liabilities (1) Shareholder&apos;s Funds (a) Share Capital 1 6,00,000 4,00,000 (b) Reserves and Surplus 2 1,00,000 1,00,000 (2) Non-current Liabilities Long Term Borrowings 2,00,000 1,00,000 (3) Current Liabilities (a) Trade Payables 1,00,000 1,00,000 Total 10,00,000 7,00,000 II. Assets (1) Non-current assets (a) Property, Plant and Equipment 4,00,000 3,00,000 (b) Non-current investments (2) Current Assets (a) Inventories (b) Trade Receivables (c) Cash &amp; Cash Equivalents 3 3,20,000 1,60,000 80,000 40,000 - 2,00,000 1,40,000 60,000 Total 10,00,000 7,00,000 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 58 --- Notes to Accounts Particulars (`) Virat Ltd. ( `) Anushka Ltd. ( `) 1. Share capital 60,000 equity shares of ` 10 each fully paid up 6,00,000 -- 40,000 equity shares of ` 10 each fully paid up -- 4,00,000 Total 6,00,000 4,00,000 2. Reserves and Surplus General Reserve 1,00,000 1,00,000 3. Total Non-current investments 1,00,000 1,00,000 Shares in Anushka Ltd 3,20,000 -- Solution Consolidated balance Sheet of Virat Ltd. and its Subsidiary Anushka Ltd. as at 31 st March, 20X1 Particulars Note Amount (`) I (1) (2) (3) EQUITY AND LIABILITIES: Shareholders’ Funds: (a) Share Capital (b) Reserve and Surplus Minority Interest Non-Current Liabilities: Long Term Borrowings 1 2 3 4 6,00,000 1,80,000 1,00,000 3,00,000</li>
            <li>-- PAGE 59 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.59 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-28" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-28" num="10.59" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS (4) Current Liabilities: Trade Payables 5 2,00,000 Total 13,80,000 II (1) ASSETS: Non-Current Assets Property, Plant &amp; Equipment 6 7,00,000 (2) Current Assets: (a) Inventories (b) Trade receivables (c) Cash and Cash Equivalents 7 8 9 3,60,000 2,20,000 1,00,000 Total 13,80,000 Notes to Accounts Particulars ` ` 1. Share capital 60,000 equity shares of `10 each fully paid up 6,00,000 2. Reserves and Surplus General Reserve 1,00,000 Add: General reserve of Anushka Ltd (80%) 80,000 Total 1,80,000 3. Minority interest 20% share in Anushka Ltd (WN 3) 1,00,000 4 Long term borrowings Long term borrowings of Virat 2,00,000 Add: Long term borrowings of Anushka 1,00,000 Total 3,00,000 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 60 --- 5. Trade payables Trade payables of Virat 1,00,000 Add: Trade payables of Anushka 1,00,000 Total 2,00,000 6. Property, Plant and Equipment (PPE) PPE of Virat Ltd 4,00,000 Add: PPE of Anushka Ltd 3,00,000 Total 7,00,000 7. Inventories Inventories of Virat Ltd 1,60,000 Add: Inventories of Anushka Ltd 2,00,000 Total 3,60,000 8. Trade receivables Trade receivables of Virat Ltd 80,000 Add: Trade receivables of Anushka Ltd 1,40,000 Total 2,20,000 9 Cash and cash equivalents Cash and cash equivalents of Virat Ltd 40,000 Add: Cash and cash equivalents of Anushka Ltd 60,000 Total 1,00,000</li>
            <li>-- PAGE 61 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.61 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-29" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-29" num="10.61" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Working Notes: 1. Basic Information Company Status Dates Holding Status Holding Co. = Virat Ltd. Subsidiary = Anushka Ltd. Acquisition: Anushka’s Incorporation Consolidation: 31 st March, 20X1 Holding Company = 80% Minority Interest = 20% 2. Analysis of General Reserves of Anushka Ltd Since Virat holds shares in Anushka since its incorporation, the entire Reserve balance of `1,00,000 will be Revenue. 3. Consolidation of Balances Holding- 80%, Minority - 20% Total Minority Interest Holding Company Equity Capital General Reserves 4,00,000 1,00,000 80,000 20,000 3,20,000 Nil (pre-acq) - 80,000 (post-acq) Total Cost of Investment Goodwill/capit al reserve 1,00,000 3,20,000 (3,20,000) NIL 80,000 - Parent’s Balance 1,00,000 Amount for Consolidated Balance Sheet 1,80,000 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 62 --- Illustration 13 From the following balance sheets of H Ltd. And its subsidiary S Ltd. drawn up at 31st March, 20X1, prepare a consolidated balance sheet as at that date, having regard to the following: (i) Reserves and Profit and Loss Account of S Ltd. stood at ` 25,000 and ` 15,000 respectively on the date of acquisition of its 80% shares by H Ltd. on 1st April, 20X0. (ii) Machinery (Book-value ` 1,00,000) and Furniture (Book value ` 20,000) of S Ltd. were revalued at ` 1,50,000 and ` 15,000 respectively on 1 st April, 20X0 for the purpose of fixing the price of its shares. [Rates of depreciation computed on the basis of useful lives: Machinery 10%, Furniture 15%.] Balance Sheet of H Ltd. and S Ltd. as at 31 st March, 20X1 Particulars Note No. H Ltd. (`) S Ltd. (`) I. Equity and Liabilities (1) Shareholder’s Funds (a) Share Capital 1 6,00,000 1,00,000 (b) Reserves and Surplus 2 3,00,000 1,00,000 (2) Current Liabilities (a) Trade Payables 1,50,000 57,000 Total 10,50,000 2,57,000 II. Assets (1) Non-current assets (a) Property, Plant and Equipment 3 4,50,000 1,07,000 (b) Other non- current investments 4 6,00,000 1,50,000 Total 10,50,000 2,57,000</li>
            <li>-- PAGE 63 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.63 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-30" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-30" num="10.63" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Notes to Accounts ` H Ltd. ( `) S Ltd. ( `) 1. Share capital 6,000 equity shares of ` 100 each, fully paid up 6,00,000 -- 1,000 equity shares of ` 100 each, fully paid up Total - - 6,00,000 1,00,000 1,00,000 2. Reserves and Surplus General reserves 2,00,000 75,000 Profit and loss account 1,00,000 25,000 Total 3,00,000 1,00,000 3. Property, Plant and Equipment Machinery Furniture Total 3,00,000 1,50,000 4,50,000 90,000 17,000 1,07,000 4. Other Non-current investments Non-current <strong>Investments</strong> Shares in S Ltd. (800 shares at `200 each) Total 4,40,000 1,60,000 6,00,000 1,50,000 -- 1,50,000 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 64 --- Solution Consolidated Balance Sheet of H Ltd. and its Subsidiary S Ltd. as at 31st March, 20X1 Particulars Note No. (`) I. Equity and Liabilities (1) Shareholder&apos;s Funds (a) Share Capital 1 6,00,000 (b) Reserves and Surplus 2 3,44,600 (2) Minority Interest 3 48,150 (3) Current Liabilities (a) Trade Payables 2,07,000 Total 11,99,750 II. Assets (1) Non-current assets (a) Property, Plant and Equipment 4 5,97,750 (b) Intangible assets 5 12,000 (c) Other non-current investments 6 5,90,000 Total 11,99,750 Notes to Accounts ` 1. Share capital 6,000 equity shares of ` 100 each, fully paid up 6,00,000 Total 6,00,000</li>
            <li>-- PAGE 65 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.65 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-31" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-31" num="10.65" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS 2. Reserves and Surplus Reserves 2,00,000 Add: 4/5th share of S Ltd.’s post- acquisition reserves (W.N.3) 40,000 2,40,000 Profit and Loss Account 1,00,000 Add: 4/5th share of S Ltd.’s post- acquisition profits (W.N.4) 4,600 1,04,600 Total 3,44,600 3. Minority interest in S Ltd. (WN 5) 48,150 4. Property, plant and equipment Machinery H. Ltd. 3,00,000 S Ltd. 1,00,000 Add: Appreciation 50,000 1,50,000 Less: Depreciation (1,50,000 X 10%)* (15,000) 1,35,000 Furniture H. Ltd. 1,50,000 S Ltd. 20,000 Less: Decrease in value (5,000) 15,000 Less: Depreciation (15,000 X 15%)* (2,250) 12,750 5,97,750 5. Intangible assets Goodwill [WN 6] 12,000 6. Other non-current investments H Ltd. 4,40,000 S Ltd. 1,50,000 Total 5,90,000 * As an alternative manner of presentation, the solution contains only the ‘additional depreciation’. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 66 --- Working Notes: 1. Pre-acquisition profits and reserves of S Ltd. ` Reserves 25,000 Profit and Loss Account 15,000 40,000 H Ltd.’s = 4/5 (or 80%) × 40,000 32,000 Minority Interest= 1/5 (or 20%) × 40,000 8,000 2. Profit on revaluation of assets of S Ltd. Profit on Machinery ` (1,50,000 – 1,00,000) 50,000 Less: Loss on Furniture ` (20,000 – 15,000) 5,000 Net Profit on revaluation 45,000 H Ltd.’s share 4/5 × 45,000 36,000 Minority Interest 1/5 × 45,000 9,000 3. Post-acquisition reserves of S Ltd. Post-acquisition reserves (Total reserves less pre-acquisition reserves = ` 75,000 – 25,000) 50,000 H Ltd.’s share 4/5 × 50,000 40,000 Minority interest 1/5 × 50,000 10,000 4. Post -acquisition profits of S Ltd. Post-acquisition profits (Profit &amp; loss account balance less pre-acquisition profits = ` 25,000 – 15,000) 10,000 Add: Excess depreciation charged on furniture @ 15% on ` 5,000 i.e. (20,000 – 15,000) 750 10,750</li>
            <li>-- PAGE 67 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.67 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-32" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-32" num="10.67" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Less: Under depreciation on machinery @ 10% on ` 50,000 i.e. (1,50,000 – 1,00,000) (5,000) Adjusted post-acquisition profits 5,750 H Ltd.’s share 4/5 × 5,750 4,600 Minority Interest 1/5 × 5,750 1,150 5. Minority Interest Paid-up value of (1,000 – 800) = 200 shares held by outsiders i.e. 200 × ` 100 (or 1,00,000 X 20%) 20,000 Add: 1/5th share of pre-acquisition profits and reserves 8,000 1/5th share of profit on revaluation 9,000 1/5th share of post-acquisition reserves 10,000 1/5th share of post-acquisition profit 1,150 48,150 6. Cost of Control or Goodwill Price paid by H Ltd. for 800 shares (A) Intrinsic value of the shares- Paid-up value of 800 shares held by H Ltd. i.e. 800 × ` 100 (or 1,00,000 X 80%) 1,60,000 80,000 Add: 4/5th share of pre-acquisition profits and reserves 32,000 4/5th share of profit on the revaluation 36,000 Intrinsic value of shares on the date of acquisition (B) 1,48,000 Cost of control or Goodwill (A – B) 12,000 C. Elimination of Intra-Group Transactions Consolidated Financial Statements reflect the financial position and operations of the group as a single entity. Accordingly, the statements must contain only those transactions and balances with entities ‘external’ to the group, thereby requiring elimination of intra-group transactions. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 68 --- In order to present financial statements for the group in a consolidated format, the effect of transactions between group enterprises should be eliminated. Para 16 of AS 21 states that intragroup balances and intragroup transactions and resulting unrealized profits should be eliminated in full. Unrealized losses resulting from intragroup transactions should also be eliminated unless cost cannot be recovered. Liabilities due to one group enterprise by another will be set off against the corresponding asset in the other group enterprise’s financial statements; sales made by one group enterprise to another should be excluded both from turnover and from cost of sales or the appropriate expense heading in the consolidated statement of profit and loss. To the extent that the buying enterprise has further sold the goods in question to a third party, the eliminations to sales and cost of sales are all that is required, and no adjustments to consolidated profit or loss for the period, or to net assets, are needed. However, to the extent that the goods in question are still on hand at year end, they may be carried at an amount that is in excess of cost to the group and the amount of the intra-group profit must be eliminated, and assets are reduced to cost to the group. For transactions between group enterprises, unrealized profits resulting from intra- group transactions that are included in the carrying amount of assets, such as inventories and tangible fixed assets, are eliminated in full. The requirement to eliminate such profits in full applies to the transactions of all subsidiaries that are consolidated – even those in which the group’s interest is less than 100%. Unrealized profit in inventories: Where a group enterprise sells goods to another, the selling enterprise, as a separate legal enterprise, records profits made on those sales. If these goods are still held in inventory by the buying enterprise at the year end, the profit recorded by the selling enterprise, when viewed from the standpoint of the group as a whole, has not yet been earned, and will not be earned until the goods are eventually sold outside the group. On consolidation, the unrealized profit on closing inventories will be eliminated from the group’s profit, and the closing inventories of the group will be recorded at cost to the group.</li>
            <li>-- PAGE 69 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.69 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-33" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-33" num="10.69" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Here, the point to be noted is that one has to see whether the intragroup transaction is “upstream” or “down-stream”. Upstream transaction is a transaction in which the subsidiary company sells goods to holding company. While in the downstream transaction holding company is the seller and subsidiary company is the buyer. In the case of upstream transaction, since the goods are sold by the subsidiary to holding company; profit is made by the subsidiary company, which is ultimately shared by the holding company and the minority shareholders. In such a transaction, if some goods remain unsold at the balance sheet date, the unrealized profit on such goods should be eliminated from minority interest as well as from consolidated profit on the basis of their share-holding besides deducting the same from unsold inventory. But in the case of downstream transaction, the whole profit is earned by the holding company, therefore, whole unrealized profit should be adjusted from unsold inventory and consolidated profit and loss account only irrespective of the percentage of the shares held by the parent. Intra-group transaction Upstream Unrealised profit eliminated from holding and minority interest Corresponding decrease of inventories Downstream Unrealised profit eliminated from holding company’s P&amp;L in full Corresponding decrease of inventories Holding Co. Subsidiary Co. Sells goods Co. to Downstream Sales Subsidiary Co. Sells goods Co. to Holding Co. Upstream Sales <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 70 --- Unrealized profit on transfer of non-current asset: Similar to the treatment described above for unrealized profits in inventories, unrealized inter-company profits arising from intra-group transfers of fixed assets are also eliminated from the consolidated financial statements. Unrealized losses: Unrealized losses resulting from intra-group transactions that are deducted in arriving at the carrying amount of assets are also eliminated unless cost cannot be recovered. Example: If net realizable value (NRV) expected from sale of such goods is more than the actual cost of the goods, then unrealized loss should be reversed during consolidation process. However, if it is expected that NRV would not be sufficient to recover the loss incurred on transfer of goods from one entity to another, the unrealized loss should not be reversed. Illustration 14 a. A Ltd. holds 80% of the equity capital and voting power in B Ltd. A Ltd. sells inventories costing ` 180 lacs to B Ltd at a price of ` 200 lacs. The entire inventories remain unsold with B Ltd. at the financial year end i.e. 31 March 20X1. b. A Ltd. holds 75% of the equity capital and voting power in B Ltd. A Ltd. purchases inventories costing ` 150 lacs from B Ltd at a price of ` 200 lacs. The entire inventories remain unsold with A Ltd. at the financial year end i.e. 31 March 20X1. Suggest the accounting treatment for the above mentioned transactions in the consolidated financial statements of A Ltd. giving reference of the relevant guidance/standard. Solution As per para 16 and 17 of AS 21, intragroup balances and intragroup transactions and resulting unrealized profits should be eliminated in full. Unrealized losses resulting from intragroup transactions should also be eliminated unless cost cannot be recovered.</li>
            <li>-- PAGE 71 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.71 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-34" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-34" num="10.71" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Intragroup balances and intragroup transactions, including sales, expenses and dividends, are eliminated in full. Unrealized profits resulting from intragroup transactions that are included in the carrying amount of assets, such as inventory and fixed assets, are eliminated in full. Unrealized losses resulting from intragroup transactions that are deducted in arriving at the carrying amount of assets are also eliminated unless cost cannot be recovered. One also needs to see whether the intragroup transaction is “upstream” or “down- stream”. Upstream transaction is a transaction in which the subsidiary company sells goods to holding company. While in the downstream transaction, holding company is the seller and subsidiary company is the buyer. In the case of upstream transaction, since the goods are sold by the subsidiary to holding company; profit is made by the subsidiary company, which is ultimately shared by the holding company and the minority shareholders. In such a transaction, if some goods remain unsold at the balance sheet date, the unrealized profit on such goods should be eliminated from minority interest as well as from consolidated profit on the basis of their share-holding besides deducting the same from unsold inventory. But in the case of downstream transaction, the whole profit is earned by the holding company, therefore, whole unrealized profit should be adjusted from unsold inventory and consolidated profit and loss account only irrespective of the percentage of the shares held by the parent. Using above mentioned guidance, following adjustments would be required: a. This would be the case of downstream transaction. In the consolidated profit and loss account for the year ended 31 March 20X1, entire transaction of sale and purchase of ` 200 lacs each, would be eliminated by reducing both sales and purchases (cost of sales). Further, the unrealized profits of ` 20 lacs (i.e. ` 200 lacs – ` 180 lacs), would be eliminated from the consolidated financial statements for financial year ended 31 March 20X1, by reducing the consolidated profits/ increasing the consolidated losses, and reducing the value of closing inventories as of 31 March 20X1. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 72 --- b. This would be the case of upstream transaction. In the consolidated profit and loss account for the year ended 31 March 20X1, entire transaction of sale and purchase of ` 200 lacs each, would be eliminated by reducing both sales and purchases (cost of sales). Further, the unrealized profits of ` 50 lacs (i.e. ` 200 lacs – ` 150 lacs), would be eliminated in the consolidated financial statements for financial year ended 31 March 20X1, by reducing the value of closing inventories by ` 50 lacs as of 31 March 20X1. In the consolidated balance sheet as of 31 March 20X1, A Ltd.’s share of profit from B Ltd will be reduced by ` 37.50 lacs (being 75% of ` 50 lacs) and the minority’s share of the profits of B Ltd would be reduced by ` 12.50 lacs (being 25% of ` 50 lacs). D. ALIGNMENT OF REPORTING DATES The financial statements used in the consolidation should be drawn up to the same reporting date. If it is not practicable to draw up the financial statements of one or more subsidiaries to such date and, accordingly, those financial statements are drawn up to different reporting dates, adjustments should be made for the effects of significant transactions or other events that occur between those dates and the date of the parent’s financial statements. In any case, the difference between reporting dates should not be more than six months. The financial statements of the parent and its subsidiaries used in the preparation of the consolidated financial statements are usually drawn up to the same date. When the reporting dates are different, the subsidiary often prepares, for consolidation purposes, statements as at the same date as that of the parent. When it is impracticable to do this, financial statements drawn up to different reporting dates may be used provided the difference in reporting dates is not more than six months. The consistency principle requires that the length of the reporting periods and any difference in the reporting dates should be the same from period to period.</li>
            <li>-- PAGE 73 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.73 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-35" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-35" num="10.73" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.15 PREPARATION OF CONSOLIDATED */}
        <section id="as-21-preparation-of-consolidated" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-preparation-of-consolidated" num="1.15" title="PREPARATION OF CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            STATEMENT OF PROFIT AND LOSS All the items of profit and loss account are to be added on line by line basis and inter-company transactions should be eliminated from the consolidated figures. For example, a holding company may sell goods or services to its subsidiary, receive consultancy fees, commission, royalty etc. These items are included in sales and other income of the holding company and in the expense items of the subsidiary. Alternatively, the subsidiary may also sell goods or services to the holding company. These inter-company transactions are to be eliminated in full. If there remains any unrealized profit in the inventory, of any of the Group Company, such unrealized profit is to be eliminated from the value of inventory to arrive at the consolidated profit. Illustration 15 H Ltd and its subsidiary S Ltd provide the following information for the year ended 31st March, 20X3: H Ltd. S Ltd. (` in lacs) (` in lacs) Sales and other income 5,000 1,000 Increase in Inventory (closing less opening) 1,000 200 Raw material consumed 800 200 Wages and Salaries 800 150 Production expenses 200 100 Administrative Expenses 200 100 Selling and Distribution Expenses 200 50 Interest 100 50 Depreciation 100 50 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 74 --- Other Information: H Ltd. sold goods to S Ltd. of ` 120 lacs at cost plus 20%. Inventory of S Ltd. includes such goods valuing ` 24 lacs. Administrative expenses of S Ltd. include ` 5 lacs paid to H Ltd. as consultancy fees. Selling and distribution expenses of H Ltd. include ` 10 lacs paid to S Ltd. as commission. H Ltd. holds 80% of equity share capital of ` 1,000 lacs in S Ltd. prior to 20X1-20X2. H Ltd. took credit to its Profit and Loss Account, the proportionate amount of dividend declared and paid by S Ltd. for the year 20X1-20X2. Prepare a consolidated statement of profit and loss.. Solution Consolidated statement of profit and loss of H Ltd. and its subsidiary S Ltd. for the year ended on 31st March, 20X3 Particulars Note No. ` in Lacs I. Revenue from operations 1 5,865 II. Total Income 5,865 III. Expenses Cost of material purchased/consumed 2 1,180 Changes of inventories of finished goods 3 (1,196) Employee benefit expense 4 950 Finance cost 5 150 Depreciation and amortization expense 6 150 Other expenses 7 535 Total expenses 1,769 IV. Profit before tax (II-III) 4,096</li>
            <li>-- PAGE 75 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.75 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-36" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-36" num="10.75" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Notes to Accounts ` in Lacs ` in Lacs 1. Revenue from operations Sales and other income H Ltd. 5,000 S Ltd. 1,000 6,000 Less: Inter-company sales (120) Consultancy fees received by H Ltd. from S Ltd. (5) Commission received by S Ltd. from H Ltd. (10) 5,865 2. Cost of material purchased/consumed H Ltd. 800 S Ltd. 200 1,000 Less: Purchases by S Ltd. from H Ltd. (120) 880 Direct expenses (Production) H Ltd. 200 S Ltd. 100 300 1,180 3. Changes of inventories of finished goods H Ltd. 1,000 S Ltd. 200 Less: Unrealized profits ` 24 lacs × 20 120 (4) 1,196 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 76 --- 4. Employee benefits and expenses Wages and salaries: H Ltd. 800 S Ltd. 150 950 5. Finance cost Interest: H Ltd. 100 S Ltd. 50 150 6. Depreciation H Ltd. 100 S Ltd. 50 150 7. Other expenses Administrative expenses H Ltd. 200 S Ltd. 100 Less: Consultancy fees received by H Ltd. from S Ltd. (5) 295 Selling and distribution Expenses: H Ltd. 200 S Ltd. 50 Less: Commission received by S Ltd. from H Ltd. (10) 240 535</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.16 PREPARATION OF CONSOLIDATED CASH */}
        <section id="as-21-preparation-of-consolidated-cash" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-preparation-of-consolidated-cash" num="1.16" title="PREPARATION OF CONSOLIDATED CASH" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FLOW STATEMENT As per <strong>AS 21</strong>, Consolidated cash flow statement is presented in case a parent presents its own cash flow statement. For the purpose of preparation of consolidated cash flow statement, all the items of cash flow from operating activities, investing activities and financing activities are to be added on line by line basis and from the consolidated items, inter- company transactions should be eliminated. Below given is an illustrative consolidated cash flow statement with hypothetical figures: <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 77 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.77 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-37" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-37" num="10.77" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Consolidated Cash Flow Statement (Illustrative only) (` in million) A Company B Company Total Cash Flows from Operating Activities Change in Reserve 8 2 10 Change in P &amp; L A/c - 1 1 Dividend Paid 22 - 22 Tax Provision 20 1 21 Depreciation 10 5 15 Interest (10) 10 - 50 19 69 Less: Tax payment (20) (1) (21) 30 18 48 Working capital adjustment (13) 12 (1) (A) 17 30 47 Cash Flows from Investment Activities Sale of fixed assets 30 - 30 Purchase of fixed assets (30) (20) (50) (B) - (20) (20) Cash Flows from Financing Activities (5) (10) (15) (C) Net cash flows (A+B+C) 12 - 12 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 78 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.17 UNIFORM ACCOUNTING POLICIES */}
        <section id="as-21-uniform-accounting-policies" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-uniform-accounting-policies" num="1.17" title="UNIFORM ACCOUNTING POLICIES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Para 20 of <strong>AS 21</strong> states that consolidated financial statements shall be prepared using uniform accounting policies for like transactions and other events in similar circumstances. If any company in the same group uses accounting policies other than those adopted in consolidated financial statements for like transactions and events in similar circumstances, appropriate adjustments are made to its financial statements when they are used in preparing the consolidated financial statements. If it is not practicable to use uniform accounting policies in preparing the consolidated financial statements, the fact should be disclosed together with the proportions of items to which different accounting policies have been applied. For example, if the subsidiary company follows weighted average method for valuation of inventories and the holding company follows FIFO method, the financial statements of subsidiary company should be restated by adjusting the value of inventories to bring the same in line with the valuation procedure adopted by the holding company. After that consolidation should be done. Illustration 16 Subsidiary B Ltd. provides the following balance sheet: Particulars Note No. 20X0 ( `) 20X1 ( `) I. Equity and Liabilities (1) Shareholder&apos;s Funds (a) Share Capital 1 5,00,000 5,00,000 (b) Reserves and Surplus 2 2,86,000 7,14,000 (2) Current Liabilities (a) Short term borrowings 3 -- 1,70,000 (b) Trade Payables 4,90,000 4,94,000 (c) Short-term provisions 4 3,10,000 4,30,000 Total 15,86,000 23,08,000 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 79 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.79 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-38" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-38" num="10.79" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS II. Assets (1) Non-current assets (a) Property, Plant and Equipment 5 2,72,000 2,24,000 (b) Non-current Investment 4,00,000 (2) Current assets (a) Inventories 5,97,000 7,42,000 (b) Trade Receivables 5,94,000 8,91,000 (c) Cash &amp; Cash Equivalents 51,000 3,000 (d) Other current assets 6 72,000 48,000 Total 15,86,000 23,08,000 20X0 ( `) 20X1 ( `) 1. Share capital 5,000 equity shares of `10 each, fully paid up 5,00,000 5,00,000 2. Reserves and Surplus General Reserves 2,86,000 7,14,000 3. Short term borrowings Bank overdraft -- 1,70,000 4. Short term provisions Provision for taxation 3,10,000 4,30,000 5. Property, plant and equipment Cost Less: Depreciation Total 3,20,000 (48,000) 2,72,000 3,20,000 (96,000) 2,24,000 6. Other current Assets Prepaid expenses 72,000 48,000 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 80 --- Also consider the following information: (a) B Ltd. is a subsidiary of A Ltd. Both the companies follow calendar year as the accounting year. (b) A Ltd. values inventory on weighted average basis while B Ltd. used FIFO basis. To bring B Ltd.’s values in line with those of A Ltd, its value of inventory is required to be reduced by `12,000 at the end of 20X0 and ` 34,000 at the end of 20X1. (c) B Ltd. deducts 1% from Trade Receivables as a general provision against doubtful debts. (d) Prepaid expenses in B Ltd. include advertising expenditure carried forward of ` 60,000 in 20X0 and ` 30,000 in 20X1, being part of initial advertising expenditure of ` 90,000 in 20X0 which is being written off over three years. Similar amount of advertising expenditure of A Ltd. has been fully written off in 20X0. Restate the balance sheet of B Ltd. as at 31 st December, 20X1 after considering the above information, for the purpose of consolidation. Would restatement be necessary to make the accounting policies adopted by A Ltd. and B Ltd. uniform. Solution As per para 20 and 21 of AS 21, Consolidated financial statements: Consolidated financial statements should be prepared using uniform accounting policies for like transactions and other events in similar circumstances. If it is not practicable to use uniform accounting policies in preparing the consolidated financial statements, that fact should be disclosed together with the proportions of the items in the consolidated financial statements to which the different accounting policies have been applied. If a member of the group uses accounting policies other than those adopted in the consolidated financial statements for like transactions and events in similar circumstances, appropriate adjustments are made to its financial statements when they are used in preparing the consolidated financial statements. Accordingly in the given case, restatement would be required to make the accounting policies of A Ltd and B Ltd uniform.</li>
            <li>-- PAGE 81 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.81 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-39" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-39" num="10.81" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Adjusted reserves of B Ltd.: ` ` Reserves as given 7,14,000 Add: Provision for doubtful debts {"{"}[8,91,000 / 99 X 100]-8,91,000{"}"} 9,000 7,23,000 Less: Reduction in value of Inventory 34,000 Advertising expenditure to be written off 30,000 (64,000) Adjusted reserves 6,59,000 Note: No adjustment would be required in respect of opening inventory of B Ltd as that will not have any impact on P&amp;L. Restated Balance Sheet of B Ltd. as at 31st December, 20X1 Particulars Note No. (`) I. Equity and Liabilities (1) Shareholder&apos;s Funds (a) Share Capital 1 5,00,000 (b) Reserves and Surplus 2 6,59,000 (2) Current Liabilities (a) Short term borrowings 3 1,70,000 (b) Trade Payables 4,94,000 (c) Short-term provision 4 4,30,000 Total 22,53,000 II. Assets (1) Non-current assets (a) Property, Plant and Equipment 5 2,24,000 (b) Non-current Investment 4,00,000 (2) Current assets (a) Inventories 6 7,08,000 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 82 --- (b) Trade Receivables 7 9,00,000 (c) Cash &amp; Cash Equivalents 3,000 (d) Other current assets 8 18,000 Total 22,53,000 Notes to Accounts 20X1 (`) 1. Share capital 5,000 equity shares of Rs 10 each, fully paid up 5,00,000 2. Reserves and Surplus General Reserves (refer to WN) 6,59,000 3. Short term borrowings Bank overdraft 1,70,000 4. Short term provisions Provision for taxation 4,30,000 5. Property, plant and equipment Cost Less: Depreciation Total 3,20,000 (96,000) 2,24,000 6. Inventory Actual inventory 7,42,000 Less: Change in method of valuation (34,000) Total 7,08,000 7. Trade receivables Actual trade receivables 8,91,000 Add: Adjustment for provision 9,000 Total 9,00,000 8. Other current Assets Prepaid expenses 48,000</li>
            <li>-- PAGE 83 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.83 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-40" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-40" num="10.83" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.18 TREATMENT OF SUBSIDIARY COMPANY */}
        <section id="as-21-treatment-of-subsidiary-company" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-treatment-of-subsidiary-company" num="1.18" title="TREATMENT OF SUBSIDIARY COMPANY" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            HAVING PREFERENCE SHARE CAPITAL While preparing CFS, outstanding cumulative preference shares issued by a subsidiary are considered in the same manner as any other liability, such as debentures etc. Accordingly, the cost associated with such cumulative preference shares needs to be adjusted for. Therefore, while computing its share of profits or losses of the subsidiary, the parent should make adjustments in respect of preference dividends on outstanding cumulative preference shares issued by a subsidiary and held outside the group since, for the group, such preference shares represent external liabilities. It would be appropriate for the parent to compute its share of profits or losses after adjusting for subsidiary’s cumulative preference dividends, whether or not profits are available or dividends have been declared. However, in case of non-cumulative preference shares, no such adjustment is required unless the dividend is actually received. SUMMARY • “Holding company”, in relation to one or more other companies, means a company of which such companies are subsidiary companies; “subsidiary company” or “subsidiary”, in relation to any other company (that is to say the holding company), means a company in which the holding company— o controls the composition of the Board of Directors; or o exercises or controls more than one-half of the total share capital either at its own or together with one or more of its subsidiary companies: Provided that such class or classes of holding companies as may be prescribed shall not have layers of subsidiaries beyond such numbers as may be prescribed. • ‘Total share capital’, as defined in section 2(87) (ii) above, has been further clarified by the Rule 2(1)(r) of the Companies (Specification of <strong>Definitions</strong> Details) Rules, 2014. As per the Rule, total share capital includes o paid up equity share capital o convertible preference share capital. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 84 --- • Consolidated financial statements are prepared and presented by a parent/holding enterprise to provide financial information about a parent and its subsidiary (ies) as a single economic entity. • Distinction must be made from the point of view of the holding company, between revenue and capital profit of the subsidiary. In the absence of information, profits of a year may be treated as accruing from day to day. Preparation of Consolidated Statement of Profit and Loss • All the revenue items are to be added on line by line basis and from the consolidated revenue items, inter-company transactions should be eliminated. • If there remains any unrealized profit in the inventory of goods, of any of the Group Company, such unrealized profit should be eliminated from the value of inventory to arrive at the consolidated profit. Preparation of Consolidated Cash Flow Statement All the items of Cash flow from operating activities, investing activities and financing activities are to be added on line by line basis and from the consolidated items, inter-company transactions should be eliminated. The financial statements used in the consolidation should be drawn up to the same reporting date. If it is not practicable to draw up the financial statements of one or more subsidiaries to such date and, accordingly, those financial statements are drawn up to different reporting dates, adjustments should be made for the effects of significant transactions or other events that occur between those dates and the date of the parent’s financial statements. In any case, the difference between reporting dates should not be more than six months.</li>
            <li>-- PAGE 85 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.85 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-41" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-41" num="10.85" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS TEST YOUR KNOWLEDGE Multiple Choice Questions 1. Minority interest should be presented in the consolidated balance sheet (a) As a part of liabilities. (b) As a part of equity of the parent’s shareholders. (c) Separately from liabilities and the equity of the parent’s shareholders. (d) As a part of assets. 2. Minority of the subsidiary is entitled to (a) Capital profits of the subsidiary company. (b) Revenue profits of the subsidiary company. (c) Both capital and revenue profits of the subsidiary company. (d) Neither capital nor revenue profits of the subsidiary.. 3. In consolidation of accounts of holding and subsidiary company _________ is eliminated in full. (a) Current liabilities of subsidiary company. (b) Reserves and surplus of both holding and subsidiary company. (c) Mutual indebtedness. (d) Nothing. 4. In consolidated balance sheet, the share of the outsiders in the net assets of the subsidiary must be shown as (a) Minority interest. (b) Capital reserve. (c) Current liability. (d) Current assets. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 86 --- 5. Provision for Tax made by the subsidiary company will appear in the consolidated balance sheet as an item of (a) Current liability. (b) Revenue profit. (c) Capital profit. (d) Current assets. Scenario-based Questions 6. Hemant Ltd. purchased 80% shares of Power Ltd. on 1st January, 20X1 for ` 2,10,000. The issued capital of Power Ltd., on 1st January, 20X1 was ` 1,50,000 and the balance in the Profit &amp; Loss Account was ` 90,000. During the year ended 31st December, 20X1, Power Ltd. earned a profit of ` 30,000 and at year end, declared and paid a dividend of ` 22,500. What is the amount of minority interest as on 1st January, 20X1 and 31st December, 20X1? Also compute goodwill/ capital reserve at the date of acquisition. 7. King Ltd. acquires 70% of equity shares of Queen Ltd. as on 31st March, 20X1 at a cost of ` 140 lakhs. The following information is available from the balance sheet of Queen Ltd. as on 31st March, 20X1: ` in lakhs Property, plant and equipment 240 Investments 110 Current Assets 140 Loans &amp; Advances 30 15% Debentures 180 Current Liabilities 100 The following revaluations have been agreed upon (not included in the above figures): Property, plant and equipment- up by 20% and Investments- down by 10%. King Ltd. purchased the shares of Queen Ltd. @ `20 per share (Face value - `10).</li>
            <li>-- PAGE 87 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.87 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-42" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-42" num="10.87" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Calculate the amount of goodwill/capital reserve on acquisition of shares of Queen Ltd. 8. From the following information, determine Minority Interest on the date of acquisition and on the date of consolidation in each case: Case Subsidiary Company % of Share owned Cost Date of Acquisition Consolidation date 01-01-20X1 31-12-20X1 Share Capital Profit and Loss A/c Share Capital Profit and Loss A/c ` ` ` ` Case-A X 90% 2,00,000 1,50,000 75,000 1,50,000 85,000 Case-B Y 75% 1,75,000 1,40,000 60,000 1,40,000 20,000 Case-C Z 70% 98,000 40,000 20,000 40,000 20,000 Case-D M 95% 75,000 60,000 35,000 60,000 55,000 9. A Ltd acquired 1,600 ordinary shares of `100 each of B Ltd on 1st July, 20X1. On 31st December, 20X1, the balance sheets of the two companies were as given below: Balance Sheet of A Ltd. and its subsidiary, B Ltd. as at 31st December, 20X1 Particulars Note No. A Ltd. ( `) B Ltd. ( `) I. Equity and Liabilities (1) Shareholder&apos;s Funds (a) Share Capital 1 5,00,000 2,00,000 (b) Reserves and Surplus 2 2,97,200 1,82,000 (2) Current Liabilities (a) Trade Payables 47,100 17,400 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 88 --- (b) Short term borrowings 3 80,000 Total 9,24,300 3,99,400 II. Assets (1) Non-current assets (a) Property, Plant and Equipment 4 3,90,000 3,15,000 (b) Non-current Investments 5 3,40,000 -- (2) Current assets (a) Inventories 1,20,000 36,400 (b) Trade receivables 59,800 40,000 (c) Cash &amp; Cash equivalents 6 14,500 8,000 Total 9,24,300 3,99,400 Notes to Accounts A Ltd. ` B Ltd. ` 1. Share Capital 5,000 shares of ` 100 each, fully paid up 5,00,000 - 2,000 shares of ` 100 each, fully paid up - 2,00,000 Total 5,00,000 2,00,000 2. Reserves and Surplus General Reserves 2,40,000 1,00,000 Profit &amp; loss 57,200 82,000 Total 2,97,200 1,82,000 3. Short term borrowings Bank overdraft 80,000 --</li>
            <li>-- PAGE 89 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.89 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-43" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-43" num="10.89" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS 4. Property plant and equipment Land and building 1,50,000 1,80,000 Plant &amp; Machinery 2,40,000 1,35,000 Total 3,90,000 3,15,000 5. Non-current <strong>Investments</strong> Investment in B Ltd (at cost) 3,40,000 -- 6. Cash &amp; Cash equivalents Cash 14,500 8,000 The Profit &amp; Loss Account of B Ltd. showed a credit balance of `30,000 on 1st January, 20X1 out of which a dividend of 10% was paid on 1st August, 20X1; A Ltd. credited the dividend received to its Profit &amp; Loss Account. The Plant &amp; Machinery which stood at ` 1,50,000 on 1st January, 20X1 was considered as worth ` 1,80,000 on 1st July, 20X1; this figure is to be considered while consolidating the Balance Sheets. The rate of depreciation on plant &amp; machinery is 10% (computed on the basis of useful lives). Prepare consolidated Balance Sheet as at 31 st December, 20X1. 10. On 31st March, 20X1, the Balance Sheets of H Ltd. and its subsidiary S Ltd. stood as follows: Balance Sheet of H Ltd. and its subsidiary S Ltd. as at 31st March, 20X1 Particulars Note No. H Ltd. ( ` in Lacs) S Ltd. ( ` in Lacs) I. Equity and Liabilities (1) Shareholder&apos;s Funds (a) Share Capital 1 12,000 4,800 (b) Reserves and Surplus 2 5,499 3,000 (2) Current Liabilities (a) Trade payables 3 1,833 1,014 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 90 --- (b) Other current liabilities (Dividend payable) 1,200 (c) Short term provisions 4 855 394 Total 21,387 9,208 II. Assets (1) Non-current assets (a) Property, Plant and Equipment 5 9,468 5,486 (b) Non-current Investments (Shares in S Ltd.) 3,000 (2) Current assets (a) Inventories 3,949 1,956 (b) Trade receivables 6 2,960 1,562 (c) Cash and cash equivalents 1,490 204 (d) Short term loans and advances 7 520 Total 21,387 9,208 Notes to Accounts H Ltd. ( ` in lacs) S Ltd. ( ` in lacs) 1. Share Capital Authorized share capital 15,000 6,000 Equity shares of ` 10 each, fully paid up Issued and Subscribed: Equity shares of ` 10 each, fully paid up 12,000 4,800</li>
            <li>-- PAGE 91 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.91 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-44" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-44" num="10.91" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS 2. Reserves and surplus General Reserve 2,784 1,380 Profit and Loss Account: 2,715 1,620 Total 5,499 3,000 3. Trade Payables Creditors 1,461 854 Bills Payable 372 160 1,833 1,014 4. Short term provisions Provision for Taxation 855 394 5. Property, plant and equipment Land and Buildings 2,718 - Plant and Machinery 4,905 4,900 Furniture and Fittings Total 1,845 9,468 586 5,486 6. Trade receivables Debtors 2,600 1,363 Bills Receivable 360 199 Total 2,960 1,562 7. Short term loans and advances Sundry Advances 520 -- The following information is also provided to you: (a) H Ltd. purchased 180 lakh shares in S Ltd. on 31 st March, 20X0 when the balances of General Reserve and Profit and Loss Account of S Ltd. stood at ` 3,000 lakh and ` 1,200 lakh respectively. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 92 --- (b) On 1st April, 20X0, S Ltd. declared a dividend @ 20% for the year ended 31 st March, 20X0. H Ltd. credited the dividend received by it to its Profit and Loss Account. (c) On 1st January, 20X1, S Ltd. issued 3 fully paid-up bonus shares for every 5 shares held out of balances of its general reserve as on 31st March, 20X0. (d) On 31st March, 20X1, all the bills payable in S Ltd.’s balance sheet were acceptances in favour of H Ltd. But on that date, H Ltd. held only ` 45 lakh of these acceptances in hand, the rest having been endorsed in favour of its trade payables. (e) On 31st March, 20X1, S Ltd.’s inventory included goods which it had purchased for ` 100 lakh from H Ltd. which made a profit @ 25% on cost. Prepare a Consolidated Balance Sheet of H Ltd. and its subsidiary S Ltd. as at 31st March, 20X1. 11. Chand Ltd. and its subsidiary Sitara Ltd. provided the following information for the year ended 31 st March, 20X4: Particulars Chand Ltd ( `) Sitara Ltd. ( `) Equity Share Capital 20,00,000 6,00,000 Finished Goods Inventory as on.2022 4,20,000 3,01,000 Finished Goods Inventory as on.2023 8,57,500 3,76,250 Dividend Income 1,68,000 43,750 Other non-operating Income 35,000 10,500 Raw material consumed 13,93,000 4,72,500 Selling and Distribution Expenses 3,32,500 1,57,500 Production Expenses 3,15,000 1,40,000 Loss on sale of investments 26,250 Nil Sales and other operating income 33,25,000 19,07,500</li>
            <li>-- PAGE 93 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.93 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-45" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-45" num="10.93" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Wages and Salaries 13,30,000 2,45,000 General and Administrative Expenses 2,80,000 1,22,500 Royalty paid Nil 5,000 Depreciation 31,500 14,000 Interest expense 17,500 5,250 Other information ♦ On 1 st September 20X1 Chand Ltd., acquired 5,000 equity shares of ` 100 each fully paid up in Sitara Ltd. ♦ Sitara Ltd. paid a dividend of 10% for the year ended 31 st March 20X3. The dividend was correctly accounted for by Chand Ltd. ♦ Chand Ltd. sold goods of ` 1,75,000 to Sitara Ltd. at a profit of 20% on selling price. Inventory of Sitara Ltd. includes goods of ` 70,000 received from Chand Ltd. ♦ Selling and Distribution expenses of Sitara Ltd. include ` 21,250 paid to Chand Ltd. as brokerage fees. ♦ General and Administrative expenses of Chand Ltd. include ` 28,000 paid to Sitara Ltd. as consultancy fees. ♦ Sitara Ltd. used some resources of Chand Ltd., and Sitara Ltd. paid ` 5,000 to Chand Ltd. as royalty. Consultancy fees, Royalty and brokerage received is to be considered as operating revenues. Prepare Consolidated Statement of Profit and Loss of Chand Ltd. and its subsidiary Sitara Ltd. for the year ended 31 st March, 20X4 as per Schedule III to the Companies Act, 2013. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 94 --- ANSWERS/SOLUTION Answer to the Multiple Choice Questions 1. (c) 2. (c) 3. (c) 4. (a) 5. (a) Answer to the Scenario-based Questions 6. Total dividend paid is ` 22,500 (out of post-acquisition profits), hence dividend received by Hemant will be credited to P &amp; L account. Hemant Ltd.’s share of dividend = ` 22,500 X 80% = ` 18,000 Goodwill on consolidation (at the date of acquisition): ` ` Cost of shares 2,10,000 Less: Face value of capital i.e. 80% of capital 1,20,000 Add: Share of capital profits [90,000 X 80 %] 72,000 (1,92,000) Goodwill 18,000 Minority interest on: - 1st January, 20X1: 20% of ` 2,40,000 [1,50,000 + 90,000] 48,000 - 31st December, 20X1: 20% of ` 2,47,500 [1,50,000 + 90,000 + 30,000 – 22,500] 49,500 7. Revalued net assets of Queen Ltd. as on 31st March, 20X1 ` in lakhs ` in lakhs PPE [240 X 120%] 288 Investments [110 X 90%] 99 Current Assets 140 Loans and Advances 30</li>
            <li>-- PAGE 95 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.95 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-46" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-46" num="10.95" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Total Assets after revaluation 557 Less: 15% Debentures Current Liabilities (280) Equity / Net Worth 277 King Ltd.’s share of net assets (70% of 277) 193.9 King Ltd.’s cost of acquisition of shares of Queen Ltd. (`140 lakhs) (140) 8. Minority Interest = Equity attributable to minorities Equity is the residual interest in the assets of an enterprise after deducting all its liabilities i.e. in this case, it should be equal to Share Capital + Profit &amp; Loss A/c A = Share capital on.20X1 B = Profit &amp; loss account balance on.20X1 C = Share capital on.20X1 D = Profit &amp; loss account balance on.20X1 Minority % Shares Owned Minority interest as at the date of acquisition Minority interest as at the date of consolidation [E] [E] x [A + B] ` [E] X [C + D] ` Case A [100-90] 10 % 22,500 23,500 Case B [100-75] 25 % 50,000 40,000 Case C [100-70] 30 % 18,000 18,000 Case D [100-95] 5% 4,750 5,750 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 96 --- 9. Consolidated Balance Sheet of A Ltd. and its subsidiary, B Ltd. as at 31st December, 20X1 Particulars Note No. (`) I. Equity and Liabilities (1) Shareholder&apos;s Funds (a) Share Capital 1 5,00,000 (b) Reserves and Surplus 2 3,08,800 (2) Minority Interest 83,600 (3) Current Liabilities (a) Trade Payables 3 64,500 (b) Short term borrowings 4 80,000 Total 10,36,900 II. Assets (1) Non-current assets (a) Property, Plant and Equipment 5 7,41,000 (b) Intangible assets 6 17,200 (2) Current assets (a) Inventories 7 1,56,400 (b) Trade receivables 8 99,800 (c) Cash &amp; Cash equivalents 9 22,500 Total 10,36,900 Notes to Accounts ` 1. Share Capital 5,000 shares of ` 100 each 5,00,000</li>
            <li>-- PAGE 97 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.97 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-47" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-47" num="10.97" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS 2. Reserves and Surplus Reserves 2,40,000 Profit &amp; loss (Refer to W.N 8) 68,800 Total 3,08,800 3. Trade Payables A Ltd. 47,100 Add: B Ltd 17,400 Total 64,500 4. Short term borrowings Bank overdraft 80,000 5. Property, plant and equipment Land and building- A Ltd 1,50,000 Add: Land and building- B Ltd 1,80,000 3,30,000 Plant &amp; Machinery (Refer to W.N 7) 4,11,000 Total 7,41,000 6. Intangible assets Goodwill (refer to W.N 6) 17,200 7. Inventories A Ltd. 1,20,000 B Ltd. 36,400 Total 1,56,400 8 Trade Receivables A Ltd. 59,800 B Ltd. 40,000 Total 99,800 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 98 --- 9 Cash &amp; Cash equivalents Cash of A Ltd 14,500 Add: cash of B Ltd. 8,000 Total 22,500 Share holding Pattern Total Shares of B Ltd 2,000 shares Shares held by A Ltd 1,600 shares i.e. 80 % Minority Shareholding 400 shares i.e. 20 % Working Notes: 1. The dividend @ 10% on 1,600 shares - ` 16,000 received by A Ltd. should have been credited to the investment A/c, being out of pre-acquisition profits. A Ltd., must pass a rectification entry, viz. Profit &amp; Loss Account Dr. ` 16,000 To Investment ` 16,000 2. The Plant &amp; Machinery of B Ltd. would stand in the books at ` 1,42,500 on 1st July, 20X1, considering only six months’ depreciation on ` 1,50,000 total depreciation being ` 15,000. The value put on the assets being ` 1,80,000, there is an appreciation to the extent of ` 37,500 (1,80,000 – 1,42,500). 3. Capital profits of B Ltd. ` ` Reserve on 1st January, 20X1 (Assumed there is no movement in reserves during the year and hence balance as on 1 st January 20X1 is same as of 31 st December 20X1) 1,00,000 Profit &amp; Loss Account Balance on 1st January, 20X1 30,000</li>
            <li>-- PAGE 99 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.99 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-48" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-48" num="10.99" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Less: Dividend paid (20,000) 10,000 Profit for 20X1: Total ` 82,000 Less: `10,000 ` 72,000 Proportionate upto 1st July, 20X1 on time basis (` 72,000/2) 36,000 Appreciation in value of Plant &amp; Machinery 37,500 1,83,500 Less: 20% due to outsiders (36,700) Holding company’s share 1,46,800 4. Revenue profits of B Ltd.: Profit after 1st July, 20X1 [(82,000 – 10,000) x ½] 36,000 Less: Depreciation 10% depreciation on `1,80,000 for 6 months 9,000 Less: Depreciation already charged for 2 nd half year on 1,50,000 (7,500) (1,500) 34,500 Less: 1/5 due to outsiders (6,900) Share of A Ltd. 27,600 5. Minority interest: Par value of 400 shares (2,00,000 X 20%) 40,000 Add: 1/5Capital Profits [WN 3] 36,700 1/5 Revenue Profits [WN 4] 6,900 83,600 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 100 --- 6. Cost of Control: Amount paid for 1,600 shares 3,40,000 Less: Dividend out of pre-acquisition profits (16,000) 3,24,000 Par value of shares 1,60,000 Capital Profits –share of A Ltd. [WN 3] 1,46,800 (3,06,800) Cost of Control or Goodwill 17,200 7. Value of plant &amp; Machinery: 2,40,000 B Ltd. 1,35,000 Add: Appreciation on 1st July, 20X1 [1,80,000 – (1,50,000 – 7,500)] 37,500 1,72,500 Add: Deprecation for 2 nd half charged on pre- revalued value 7,500 Less: Depreciation on `1,80,000 for 6 months (9,000) 1,71,000 4,11,000 8. Profit &amp; Loss Account (Consolidated): A Ltd. as given 57,200 Less: Dividend transferred to Investment A/c (16,000) 41,200 Share of A Ltd. in revenue profits of B Ltd. (WN 4) 27,600 68,800 10. Consolidated Balance Sheet of H Ltd. and its subsidiary S Ltd. as at 31st March, 20X1 Particulars Note No. (` in Lacs) I. Equity and Liabilities (1) Shareholder&apos;s Funds</li>
            <li>-- PAGE 101 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.101 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-49" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-49" num="10.101" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS (a) Share Capital 1 12,000 (b) Reserves and Surplus 2 7,159 (2) Minority Interest [W.N.6] 3,120 (3) Current Liabilities (a) Trade payables (b) Short term provisions 3 4 2,802 1,249 (c) Other current liabilities 5 1,200 Total 27,530 II. Assets (1) Non-current assets Property, Plant and Equipment 6 14,954 (2) Current assets (a) Inventories 7 5,885 (b) Trade receivables 8 4,477 (c) Short term loans and advances 9 520 (d) Cash and cash equivalents 10 1,694 Total 27,530 Notes to Accounts ( ` in lacs) ( ` in lacs) 1. Share Capital Authorized share capital 15,000 Equity shares of `10 each, fully paid up Issued and Subscribed: Equity shares of ` 10 each, fully paid up 12,000 Total 12,000 2. Reserves and surplus Capital Reserve (Note 5) 1,320 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 102 --- General Reserve (2,784 + 108) 2,892 Profit and Loss Account: H Ltd. 2,715 Less: Dividend wrongly credited 360 Unrealized Profit 2 0 ( 3 8 0 ) 2,335 Add: Share in S Ltd.’s Revenue profits 612 2,947 Total 7,159 3. Trade payables Creditors H Ltd. 1,461 S Ltd. 854 2,315 Bills Payable H Ltd. ` 372 S Ltd. ` 160 ` 532 Less: Mutual owing ` (45) 487 2,802 4. Short term provisions Provision for Taxation H Ltd. 855 S Ltd. 394 Total 1,249 5. Other current liabilities Dividend payable H Ltd. 1,200</li>
            <li>-- PAGE 103 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.103 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-50" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-50" num="10.103" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS 6. Property, plant and equipment Land and Buildings H Ltd. 2,718 Plant and Machinery H Ltd. ` 4,905 S Ltd. ` 4,900 9,805 Furniture and Fittings H Ltd. ` 1,845 S Ltd. ` 586 2,431 Total 14,954 7. Inventories Stock H Ltd. 3,949 S Ltd. 1,956 5,905 Less: Unrealized profit (20) 5,885 8. Trade receivables Debtors H Ltd. ` 2,600 S Ltd. ` 1,363 3,963 Bills Receivable H Ltd. ` 360 S Ltd. ` 199 ` 559 Less: Mutual Owing ` (45) 514 4,477 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 104 --- 9. Short term loans and advances Sundry Advances 520 10. Cash and cash equivalents Cash and Bank Balances 1,694 Share holding pattern of S Ltd. Shares as on 31st March, 20X1 (Includes bonus shares issued on 1st January, 20X1) 480 lakh shares (4,800 lakhs/ ` 10) H Ltd.’s holding as on 1st April, 20X0 180 lakhs Add: Bonus received on 1st January, 20X1 108 lakhs (180 / 5 × 3) Total H Ltd.’s holding as on 31st March, 20X1 288 lakhs i.e. 60 % [288/480×100] Minority Shareholding 40% Working Notes: 1. S Ltd.’s General Reserve Account ` in lakhs ` in lakhs To Bonus to equity By Balance b/d 3,000 shareholders (WN-8) 1,800 By Profit and Loss A/c 180 To Balance c/d 1,380 (Balancing figure) _ 3,180 3,180 2. S Ltd.’s Profit and Loss Account ` in lakhs ` in lakhs To General Reserve By Balance b/d 1,200 [WN 1] 180 By Net Profit for the To Dividend paid year* 1,200 (20% on `3,000 lakhs) 600 (Balancing figure) To Balance c/d 1,620 2,400 2,400</li>
            <li>-- PAGE 105 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.105 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-51" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-51" num="10.105" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS *Out of ` 1,200 lakhs profit for the year, ` 180 lakhs has been transferred to reserves. 3. Distribution of Revenue profits ` in lakhs Revenue profits (W. N. 2) 1,200 Less: Share of H Ltd. 60% (General Reserve ` 108 + Profit and Loss Account ` 612) (720) Share of Minority Shareholders (40%) 480 Note: The question can also be solved by taking ` 1,020 lakhs as post acquisition Profit and Loss balance and ` 180 lakhs as post acquisition General Reserve balance. The final answer will be same. 4. Calculation of Capital Profits ` in lakhs General Reserve on the date of acquisition less bonus shares (` 3,000 – ` 1,800) 1,200 Profit and loss account on the date of acquisition less dividend paid (` 1,200 – ` 600) 600 1,800 H Ltd.’s share = 60% of ` 1,800 lakhs = ` 1,080 lakhs Minority interest = ` 1,800 – ` 1,080 = ` 720 lakhs 5. Calculation of capital reserve ` in lakhs Paid up value of shares held (60% of `4,800) 2,880 Add: Share in capital profits [WN 4] 1,080 3,960 Less: Cost of shares less dividend received (` 3,000 – ` 360) (2,640) Capital reserve 1,320 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 106 --- 6. Calculation of Minority Interest III III` in lakhs 40% of share capital (40% of ` 4,800) 1,920 Add: Share in revenue profits [WN 3] 480 Share in capital profits [WN 4] 720 3,120 7. Unrealized profit in respect of inventory ` 100 lakhs 125 25 × = ` 20 lakhs 8. Computation of bonus to equity shareholders ` In lakhs Shares as on 31 March 20X1 including bonus share issued on 1 January 20X1 4,800 Or we can say these are 1 + 5 3 or 5 8 i.e. Shares before bonus issue should have been 4,800 8 / 5 = 3,000 Accordingly, bonus issue would be (4,800-3,000) 1,800 11. Consolidated statement of profit and loss of Chand Ltd. and its subsidiary Sitara Ltd. for the year ended on 31 st March, 20X4 Particulars Note No. ` Revenue from operations 1 50,03,250 Other Income 2 1,81,000 Total revenue (I) 51,84,250 Expenses: Cost of material purchased/consumed 3 21,45,500</li>
            <li>-- PAGE 107 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.107 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-52" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-52" num="10.107" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS Changes (Increase) in inventories of finished goods 4 (4,98,750) Employee benefit expense 5 15,75,000 Finance cost 6 22,750 Depreciation and amortization expense 7 45,500 Other expenses 8 8,43,250 Total expenses (II) 41,33,250 Profit before tax (II-III) 10,51,000 Notes to Accounts: ` ` 1. Revenue from operations Sales and other operating revenues Chand Ltd. 33,25,000 Sitara Ltd. 19,07,500 52,32,500 Less: Inter-company sales (1,75,000) Consultancy fees received by Sitara Ltd. from Chand Ltd. (28,000) Royalty received by Chand Ltd. from Sitara Ltd. (5,000) Brokage received by Chand Ltd. from Sitara Ltd. (21,250) 50,03,250 2. Other Income Dividend income: Chand Ltd. 1,68,000 Sitara Ltd. 43,750 Less: Dividend realized from Sitara Ltd. (5,00,000 x 10%) (50,000) 1,61,750 Other Non-operating Income Chand Ltd. 35,000 <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 108 --- Sitara Ltd. 10,500 Loss on sale of investment Sitara Ltd. (26,250) 19,250 1,81,000 3. Cost of material purchased/ consumed Chand Ltd. 13,93,000 Sitara Ltd. 4,72,500 18,65,500 Less: Purchases by Sitara Ltd. From Chand Ltd. (1,75,000) 16,90,500 Direct expenses (Production) Chand Ltd. 3,15,000 Sitara Ltd. 1,40,000 4,55,000 21,45,500 4. Changes (Increase) in inventories of finished goods Chand Ltd. 4,37,500 Sitara Ltd. 75,250 5,12,750 Less: Unrealized profits ` 7,00,00 × 20/100 (14,000) 4,98,750 5. Employee benefits and expenses Wages and salaries: Chand Ltd. 13,30,000 Sitara Ltd. 2,45,000 15,75,000 6 Finance cost Interest: Chand Ltd. 17,500 Sitara Ltd. 5,250 22,750</li>
            <li>-- PAGE 109 ---</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 10.109 ACCOUNTING STANDARD FOR CONSOLIDATED */}
        <section id="as-21-accounting-standard-for-consolidated-53" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-21-accounting-standard-for-consolidated-53" num="10.109" title="ACCOUNTING STANDARD FOR CONSOLIDATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FINANCIAL STATEMENTS 7. Depreciation Chand Ltd. 31,500 Sitara Ltd. 14,000 45,500 8. Other expenses General &amp; Administrative expenses: Chand Ltd. 2,80,000 Sitara Ltd. 1,22,500 4,02,500 Less: Consultancy fees received by Sitara Ltd. from Chand Ltd. (28,000) 3,74,500 Royalty: Sitara Ltd. Less: Received by Chand Ltd. Selling and distribution Expenses: 5,000 (5,000) Nil Chand Ltd. 3,32,500 Sitara Ltd. 1,57,500 4,90,000 Less: Brokerage received by Chand Ltd. from Sitara Ltd. (21,250) 4,68,750 8,43,250 <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 21**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 21, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
