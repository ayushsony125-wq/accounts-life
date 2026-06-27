'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, ChevronDown } from 'lucide-react'

export const as12Sections = [
  { id: 'as-12-intro-sec', title: '1. Introduction & Objectives' },
  { id: 'as-12-government-grants', title: '1.2 GOVERNMENT GRANTS' },
  { id: 'as-12-accounting-treatment-of-govern-', title: '1.3 ACCOUNTING TREATMENT OF GOVERN -' },
  { id: 'as-12-recognition-of-government-grants', title: '1.4 RECOGNITION OF GOVERNMENT GRANTS' },
  { id: 'as-12-non-monetary-government-grants', title: '1.5 NON - MONETARY GOVERNMENT GRANTS' },
  { id: 'as-12-presentation-of-grants-related-to', title: '1.6 PRESENTATION OF GRANTS RELATED TO' },
  { id: 'as-12-presentation-of-grants-related-to-1', title: '1.7 PRESENTATION OF GRANTS RELATED TO' },
  { id: 'as-12-presentation-of-gra-nts-of-the', title: '1.8 PRESENTATION OF GRA NTS OF THE' },
  { id: 'as-12-refund-of-government-grants', title: '1.9 REFUND OF GOVERNMENT GRANTS' },
  { id: 'as-12-disclosure', title: '1.10 DISCLOSURE' }
];

interface AS12StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function AS12StandardTabContent({ navigateToPdfPage }: AS12StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as-12-intro-sec');
  const tocScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(id);
    const stickyToc = document.getElementById('as-12-standard-sticky-toc');
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

      as12Sections.forEach((sec) => {
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
      <div id="as-12-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as12Sections.map(sec => (
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
        <section id="as-12-intro-sec" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-12-intro-sec" num="1" title="1. Introduction &amp; Objectives" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            1. 1 a CHAPTER 9 OTHER ACCOUNTING STANDARDS UNIT 1: ACCOUNTING STANDARD 12 ACCOUNTING FOR GOVERNMENT GRANTS After studying this unit, you will be able to comprehend the – • Accounting Treatment of Government Grants • Capital Approach versus Income Approach • <strong>Recognition</strong> of Government Grants • Non - monetary Government Grants • Presentation of Grants : ▪ Related to Specific Fixed Assets ▪ Related to Revenue ▪ In the nature of Promoters’ contribution • Refund of Government Grants • <strong>Disclosures</strong> . <PdfRef page={1} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a 1. 1. INTRODUCTION <strong>AS 12</strong> deals with accounting for government grants such as subsidies, cash incentives, duty drawbacks, etc. and specifies that the government grants should not be recognised until there is reasonable assurance that the enterprise will comply with the conditions attached to them, and the grant will be received. The standard also describes the treatment of non - monetary government grants; presentation of grants related to specific fixed assets and revenue and those in the nature of promoters’ contribution; treatment for refund of government grants etc. This Standard does not deal with: (i) The special problems arising in accounting for government grants in financial statements reflecting the effects of changing prices or in supplementary information of a similar nature. (ii) Government assistance other than in the form of government grants. (iii) Government participation in the ownership of the enterprise. The receipt of government grants by an enterprise is significant for preparation of the financial statements for two reasons. Firstly, if a government grant has been received, an appropriate method of accounting therefore is necessary. Secondly, it is desirable to give an indication of the extent to which the enterprise has benefited from such grant during the reporting period. This facilitates comparison of an enterprise’s financial statements with those of prior periods and with those of other enterprises. <PdfRef page={2} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 12**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 12, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.2 GOVERNMENT GRANTS */}
        <section id="as-12-government-grants" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-12-government-grants" num="1.2" title="GOVERNMENT GRANTS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Government grants are assistance by government in cash or kind to an enterprise for past or future compliance with certain conditions. They exclude those forms of government assistance which cannot reasonably have a value placed upon them and transactions with government which cannot be distinguished from the normal trading transactions of the enterprise. <PdfRef page={2} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a <PdfRef page={3} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 12**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 12, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.3 ACCOUNTING TREATMENT OF GOVERN - */}
        <section id="as-12-accounting-treatment-of-govern-" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-12-accounting-treatment-of-govern-" num="1.3" title="ACCOUNTING TREATMENT OF GOVERN -" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            MENT GRANTS Two broad approaches may be followed for the accounting treatment of government grants: • the ‘capital approach’, under which a grant is treated as part of shareholders’ funds, and • the ‘ income approach’, under which a grant is taken to income over one or more periods. It is generally considered appropriate that accounting for government grant should be based on the nature of the relevant grant. Grants which have the characteristics similar to those of promoters’ contribution should be treated as part of shareholders’ funds. Income approach may be more appropriate in the case of other grants. <PdfRef page={3} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 12**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 12, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.4 RECOGNITION OF GOVERNMENT GRANTS */}
        <section id="as-12-recognition-of-government-grants" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-12-recognition-of-government-grants" num="1.4" title="RECOGNITION OF GOVERNMENT GRANTS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            A government grant is not recognised until there is reasonable assurance that: • the enterprise will comply with the conditions attaching to it; and • the grant will be received. Receipt of a grant is not of itself conclusive evidence that the conditions attaching to the grant have been or will be fulfilled. Example: X Ltd applies for a grant from the local authority towards a social cause. X Ltd. is required to meet certain conditions to be eligible for the receipt of grant. There is a reasonable assurance that X Ltd will receive the grant in time. However, after having applied for the grant, there is a likelihood that X Ltd may not be able to meet all the conditions attached to the grant. In such case, X Ltd should not recognise the grant in its books until there is a reasonable assurance that it would be able to meet all conditions attached to the grant. <PdfRef page={3} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a <PdfRef page={4} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 12**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 12, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.5 NON - MONETARY GOVERNMENT GRANTS */}
        <section id="as-12-non-monetary-government-grants" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-12-non-monetary-government-grants" num="1.5" title="NON - MONETARY GOVERNMENT GRANTS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Government grants may take the form of non - monetary assets, such as land or other resources, given at concessional rates. In these circumstances, it is usual to account for such assets at their acquisition cost. Non - monetary assets given free of cost are recorded at a nominal value. Example X Convent wishes to open a school in locality A. It applies to the State authority for grant of land. The State authority grants the land for construction of the the purposes of the school construction. The market value of the land is ` 20 crore whereas However, the authority provides the land at a nominal cost of ` 50 lakhs including cost of registration. The State authority requires that free education must be provided to the poor children by way of reserving 20% of the seats in the school for such children. There is a reasonable assurance that X Convent has a reason to believe it can will meet that the above stated condition attached to the grant. Thus, X Convent needs to would recognise the cost of the land at its acquisition cost of ` 50 lakhs. <PdfRef page={4} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 12**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 12, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.6 PRESENTATION OF GRANTS RELATED TO */}
        <section id="as-12-presentation-of-grants-related-to" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-12-presentation-of-grants-related-to" num="1.6" title="PRESENTATION OF GRANTS RELATED TO" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            SPECIFIC FIXED ASSETS Grants related to specific fixed assets are government grants whose primary condition is that an enterprise qualifying for them should purchase, construct or otherwise acquire such assets. Other conditions may also be attached restricting the type or location of the assets or the periods during which they are to be acquired or held. Example The Central Government is planning to generate large employment in rural and backward regions. Thus, it is planning to give grants for the same to entities who will meet the required conditions. F Ltd applied for a grant to the Central Government. The Government will give the grant on the condition that, F Ltd will be required to construct a factory where it would need to employ at least 500 <PdfRef page={4} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a 9. 5 workers for 5 years. Total cost of the construction is expected to be ` 50 crore. The amount of the grant is ` 30 crore. F Ltd will be able to recognise the grant only if there is reasonable assurance that it will meet o the condition of employing 500 workers for next 5 years. Two methods of presentation in financial statements of grants related to specific fixed assets are regarded as acceptable alternatives. Method I : • The grant is shown as a deduction from the gross value of the asset concerned in arriving at its book value. • The grant is thus recognised in the profit and loss statement over the useful life of a depreciable asset by way of a reduced depreciation charge. • Where the grant equals the whole, or virtually the whole, of the cost of the asset, the asset is shown in the balance sheet at a nominal value. Illustration 1 Z Ltd. purchased a fixed asset for ` 50 lakhs, which has the estimated useful life of 5 years with the salvage value of ` 5,00,000. On purchase of the assets government granted it a grant for ` 10 lakhs. Pass the necessary journal entries in the books of the company for first two years if the grant amount is deducted from the value of fixed asset. Solution Journal in the books of Z Ltd. Year Particulars ` (Dr.) ` (Cr.) 1st Fixed Assets Account Dr. 50,00,000 To Bank Account 50,00,000 (Being Fixed Assets purchased) Bank Account Dr. 10,00,000 To Fixed Assets Account 10,00,000 (Being grant received from the government) <PdfRef page={5} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a Depreciation Account Dr. 7,00,000 To Fixed Assets Account 7,00,000 (Being Depreciation charged on SLM) Profit &amp; Loss Account Dr. 7,00,000 To Depreciation Account 7,00,000 (Being Depreciation transferred to P &amp; L Account) 2nd Depreciation Account Dr. 7,00,000 To Fixed Assets Account 7,00,000 (Being Depreciation charged on SLM) Profit &amp; Loss Account Dr. 7,00,000 To Depreciation Account 7,00,000 (Being Depreciation transferred to P &amp; L Account) Method II: • Grants related to depreciable assets are treated as deferred income which is recognised in the profit and loss statement on a systematic and rational basis over the useful life of the asset. • Grants related to non - depreciable assets are credited to capital reserve under this method, as there is usually no charge to income in respect of such assets. • If a grant related to a non - depreciable asset requires the fulfilment of certain obligations, the grant is credited to income over the same period over which the cost of meeting such obligations is charged to income. Illustration 2 Z Ltd. purchased a fixed asset for ` 50 lakhs, which has the estimated useful life of 5 years with the salvage value of ` 5,00,000. On purchase of the assets gov ernment granted it a grant for ` 10 lakhs. Pass the necessary journal entries in the books of the company for first two years if the grant is treated as deferred income. <PdfRef page={6} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a 9. 7 Solution Journal in the books of Z Ltd. Year Particulars ` (Dr.) ` (Cr.) 1st Fixed Assets Account Dr. 50,00,000 To Bank Account 50,00,000 (Being fixed assets purchased) Bank Account Dr. 10,00,000 To Deferred Government Grant Account 10,00,000 (Being grant received from the government) Depreciation Account Dr. 9,00,000 To Fixed Assets Account 9,00,000 (Being depreciation charged on SLM) Profit &amp; Loss Account Dr. 9,00,000 To Depreciation Account 9,00,000 (Being depreciation transferred to P/L Account) Deferred Government Grants Account Dr. 2,00,000 To Profit &amp; Loss Account 2,00,000 (Being proportionate government grant taken to P/L Account) 2nd Depreciation Account Dr. 9,00,000 To Fixed Assets Account 9,00,000 (Being depreciation charged on SLM) Profit &amp; Loss Account Dr. 9,00,000 To Depreciation Account 9,00,000 (Being depreciation transferred to P/L Account) Deferred Government Grant Account Dr. 2,00,000 To Profit &amp; Loss Account 2,00,000 (Being proportionate government grant taken to P/L Account) Illustration 3 Santosh Ltd. has received a grant of ` 8 crores from the Government for setting up a factory in a backward area. Out of this grant, the company distributed ` 2 crores as dividend. Also, Santosh Ltd. received land free of cost from the State Government but it has not recorded it at all in the books as no money has been spent. In the light of <strong>AS 12</strong> examine, whether the treatment of both the grants is correct. <PdfRef page={7} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a Solution As per <strong>AS 12</strong> ‘Accounting for Government Grants’, when government grant is received for a specific purpose, it should be utilised for the same. So the grant received for setting up a factory is not available for distribution of dividend. In the second case, even if the company has not spent money for the acquisition of land, land should be recorded in the books of accounts at a nominal value. The treatment of both the elements of the gr ant is incorrect as per <strong>AS 12</strong>. <PdfRef page={8} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 12**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 12, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.7 PRESENTATION OF GRANTS RELATED TO */}
        <section id="as-12-presentation-of-grants-related-to-1" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-12-presentation-of-grants-related-to-1" num="1.7" title="PRESENTATION OF GRANTS RELATED TO" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            REVENUE Grants related to revenue are sometimes presented as a credit in the profit and loss statement, either separately or under a general heading such as ‘Other Income’. Alternatively, they are deducted in reporting the related expense. Illustration 4 X Ltd. runs a charitable hospital. It incurs salary of doctors, staff etc to the extent of ` 30 lakhs per annum. As a support, the local Government grants a lumpsum payment of `90 lakhs to meet the salary expense for a period of next 5 years. You are required to p ass the necessary journal entries in the books of the company for first year o f the grant and present in the statement of profit &amp; loss when the grant is : (a) Shown separately as Other Income; and (b) Deducted against the Salary costs . Solution Journal Entries Particulars ` (Dr.) ` (Cr.) Bank Account Dr. 9 0,00,000 To Deferred Income Account 9 0,00,000 (Being receipt of grant from government ) Salary Expense Account Dr. 30 ,00,000 To Bank Account 3 0,00,000 <PdfRef page={8} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a 9. 9 (Being Salary expense paid for the year ) Deferred Income Account Dr. 18 ,00,000 To P rofit &amp; loss Account 18 ,00,000 (Being Year 1 Grant income recognised in Profit &amp; Loss ) Note: The grant has been spread on a straight - line basis over a period of 5 years [ ` 90,00,000/5 years = ` 18,00,000]. Statement of Profit &amp; Loss Account (Extract) (a) Shown separately as Other Income : Particulars Notes ( ` ) Other Income 18,00,000 ( b ) Deducted against the Salary costs : Particulars ( ` ) Salary cost 30,00,000 Less: Deferred Government Grant ( 18,00,000 ) 12,00,000 <PdfRef page={9} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 12**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 12, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.8 PRESENTATION OF GRA NTS OF THE */}
        <section id="as-12-presentation-of-gra-nts-of-the" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-12-presentation-of-gra-nts-of-the" num="1.8" title="PRESENTATION OF GRA NTS OF THE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            NATURE OF PROMOTERS’ CONTRIBUTION Where the government grants are of the nature of promoters’ contribution, i.e., they are given with reference to the total investment in an undertaking or by way of contribution towards its total capital outlay (for example, central investment subsidy scheme) and no repayment is ordinarily expected in respect thereof, the grants are treated as capital reserve which can be neither distributed as dividend nor considered as deferred income. Illustration 5 Top &amp; Top Limited has set up its business in a designated backward area which entitles the company to receive from the Government of India a subsidy of 20% of the cost of investment , for which no repayment was ordinarily expected. Moreover, <PdfRef page={9} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a t here was no condition that the company should purchase any specified assets for this subsidy. Having fulfilled all the conditions under the scheme, the company on its investment of ` 50 crore in capital assets received ` 10 crore from the Government in January, 20X 2 (accounting period being 20X 1 - 20X 2 ). The company wants to treat this receipt as an item of revenue and thereby reduce the losses on profit and loss account for the year ended 31st March, 20X 2 . Keeping in view the relevant <strong>Accounting Standard</strong>, discuss whether this action is justified or not. Solution As per para 10 of <strong>AS 12</strong> ‘Accounting for Government Grants’, where the government grants are of the nature of promoters’ contribution, i.e. they are given with reference to the total investment in an undertaking or by way of contribution towards its total capital outlay (for example, central investment subsidy scheme) and no repayment is ordinarily expected in respect thereof, the grants are treated as capital reserve which can be neither distributed as dividend nor considered as deferred income. In the given case, the subsidy received is neither in relation to specific fixed asset nor in relation to revenue. Thus , it is inappropriate to recognise government grants in the profit and loss statement, since they are not earned but represent an incentive provided by government without related costs. The correct treatment is to credit the subsidy to capital reserve. Therefore, the accounting treatment desired by the company is not proper. Illustration 6 How would you treat the following in the accounts in accordance with <strong>AS 12</strong> &apos;Government Grants&apos;? (i) ` 35 Lakhs received from the Local Authority for providing medical facilities to the employees. (ii) ` 100 Lakhs received as Subsidy from the Central Government for setting up a unit in notified backward area. This subsidy is in nature of nature of promoters’ contribution . <PdfRef page={10} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a 9. 11 Solution (i) ` 35 lakhs received from the local authority for providing medical facilities to the employees is a grant received in nature of revenue grant. Such grants are generally presented as a credit in the profit and loss statement, either separately or under a general heading such as ‘Other Income’. Alternatively, ` 35 lakhs may be deducted in reporting the related expense i.e. employee benefit expenses. (ii) As per <strong>AS 12</strong> ‘Accounting for Government Grants’, where the government grants are in the nature of promoters’ contribution, i.e. they are given with reference to the total investment in an undertaking or by way of contribution towards its total capital outlay and no repayment is ordinarily expected in respect thereof, the grants are treated as capital reserve which can be neither distributed as dividend nor considered as deferred income. In the given case, the subsidy received from the Central Government for setting up a unit in notified backward area is neither in relation to specific fixed asset nor in relation to revenue. Thus, amount of ` 100 lakhs should be credited to capital reserve. <PdfRef page={11} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 12**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 12, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.9 REFUND OF GOVERNMENT GRANTS */}
        <section id="as-12-refund-of-government-grants" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-12-refund-of-government-grants" num="1.9" title="REFUND OF GOVERNMENT GRANTS" />
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>Government grants sometimes become refundable because certain conditions are not fulfilled and are treated as an extraordinary item (AS 5). • The amount refundable in respect of a government grant related to revenue is applied first against any unamortised deferred credit remaining in respect of the grant. To the extent that the amount refundable exceeds any such deferred credit, or where no deferred credit exists, the amount is charged immediately to profit and loss statement. • The amount refundable in respect of a government grant related to a specific fixed asset is recorded by increasing the book value of the asset or by reducing the deferred income balance, as appropriate, by the amount refundable. In the first alternative, i.e., where the book value of the asset is increased, depreciation on the revised book value is provided prospectively over the residual useful life of the asset.</li>
          </ul>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a • Where a grant which is in the nature of promoters’ contribution becomes refundable, in part or in full, to the government on non - fulfillment of some specified conditions, the relevant amount recoverable by the government is reduced from the capital reserve. <PdfRef page={12} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 12**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 12, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 1.10 DISCLOSURE */}
        <section id="as-12-disclosure" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-12-disclosure" num="1.10" title="DISCLOSURE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ( i ) The accounting policy adopted for government grants, including the methods of presentation in the financial statements; ( ii ) The nature and extent of government grants recognised in the financial statements, including grants of non - monetary assets given at a concessional rate or free of cost. Illustration 7 Z Ltd. purchased a fixed asset for ` 50 lakhs, which has the estimated useful life of 5 years with the salvage value of ` 5,00,000. On purchase of the assets government granted it a grant for ` 10 lakhs (This amount was reduced from the cost of fixed asset). Grant was considered as refundable in the end of 2 nd year to the extent of ` 7,00,000. Pass the journal entry for refund of the grant as per the first method. Solution Fixed Assets Account Dr. ` 7,00,000 To Bank Account ` 7,00,000 (Being government grant on asset refunded) Illustration 8 A fixed asset is purchased for ` 20 lakhs. Governmen t grant received towards it is ` 8 lakhs. Residual Value is ` 4 lakhs and useful life is 4 years. Assume depreciation on the basis of Straight Line method. Asset is shown in the balance sheet net of grant. After 1 year, grant becomes refundable to the extent of ` 5 lakhs due to non - compliance with certain conditions. Pass journal entries for first two years. <PdfRef page={12} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a 9. 13 Solution Journal Entries Year Particulars ` in lakhs (Dr.) ` in lakhs (Cr.) 1 Fixed Asset Account Dr. 20 To Bank Account 20 (Being fixed asset purchased) Bank Account Dr. 8 To Fixed Asset Account 8 (Being grant received from the government reduced the cost of fixed asset) Depreciation Account (W.N.1) Dr. 2 To Fixed Asset Account 2 (Being depreciation charged on Straight Line method (SLM)) Profit &amp; Loss Account Dr. 2 To Depreciation Account 2 (Being depreciation transferred to Profit and Loss Account at the end of year 1) 2 Fixed Asset Account Dr. 5 To Bank Account 5 (Being government grant on asset partly refunded which increased the cost of fixed asset) <PdfRef page={13} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a Depreciation Account (W.N.2) Dr. 3.67 (Being depreciation charged on SLM on revised value of fixed asset prospectively) Profit &amp; Loss Account Dr. 3.67 (Being depreciation transferred to Profit and Loss Account at the end of year 2) Working Notes: 1. Depreciation for Year 1 ` in lakhs Cost of the Asset 20 Less: Government grant received (8) 12 Depreciation 12-4 4       <PdfRef page={14} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            2 2. Depreciation for Year 2 ` in lakhs Cost of the Asset 20 Less: Government grant received (8) 12 Less: Depreciation for the first year 12 4 4 −       <PdfRef page={14} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            2 10 Add: Government grant refundable 5 15 Depreciation for the second year 15 4 3 −       <PdfRef page={14} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            <PdfRef page={14} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a 9. 15 Illustration 9 On. 20 X 1 , ABC Ltd. received Government grant of ` 300 lakhs for acquisition of machinery costing ` 1,500 lakhs. The grant was credited to the cost of the asset. The life of the machinery is 5 years. The machinery is depreciated at 20% on WDV basis. The Company had to refund the grant in May 20 X 4 due to non - fulfillment of certain conditions. How you would deal with the refund of grant in the books of ABC Ltd. assuming that the company did not charge any depreciation for year 20X 4 ? Solution According to para 21 of <strong>AS 12</strong> on Accounting for Government Grants, the amount refundable in respect of a grant related to a specific fixed asset should be recorded by increasing the book value of the asset or by reducing deferred income balance, as appropriate, by the amount refundable. Where the book value is increased, depreciation on the revised book value should be provided prospectively over the residual useful life of the asset. ( ` in lakhs) 1st April, 20 X 1 Acquisition cost of machinery ( ` 1,500 – ` 300) 1,200.00 31st March, 20X 2 Less : Depreciation @ 20% (240.00) 31st March, 20 X 3 Less : Depreciation @ 20% (192.00) 31st March, 20 X 4 Less : Depreciation @ 20% (153.60) 1st April, 20 X 4 Book value May, 20 X 4 Add : Refund of grant Depreciation @ 20% on the revised book value amounting ` 914.40 lakhs is to be provided prospectively over the residual useful life of the asset. <PdfRef page={15} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a Illustration 10 A Ltd. purchased a machinery for ` 40 lakhs. (Useful life 4 years and residual value ` 8 lakhs) Government grant received is ` 16 lakhs. Show the Journal Entry to be passed at the time of refund of grant in the third year and the value of the fixed assets, if: (1) the grant is credited to Fixed Assets A/c. (2) the grant is credited to Deferred Grant A/c. Solution In the books of A Ltd. Journal Entries (at the time of refund of grant) (1) If the grant is credited to Fixed Assets Account: ` ` I . Fixed Assets A/c Dr. 16 lakhs To Bank A/c 16 lakhs (Being grant refunded) II . The balance of fixed assets after two years depreciation will be ` 16 lakhs (W.N.1) and after refund of grant it will become ( ` 16 lakhs + ` 16 lakhs) = ` 32 lakhs on which depreciation will be charged for remaining two years. Depreciation = (32 - 8)/2 = ` 12 lakhs p.a. will be charged for next two years. (2) If the grant is credited to Deferred Grant Account: As per para 14 of <strong>AS 12</strong> ‘Accounting for Government Grants,’ income from Deferred Grant Account is allocated to Profit and Loss account usually over the periods and in the proportions in which depreciation on related assets is charged. Accordingly, in the first two years ( ` 16 lakhs /4 years) = ` 4 lakhs p.a. x 2 years = ` 8 lakhs were credited to Profit and Loss Account and ` 8 lakhs was the balance of Deferred Grant Account after two years. <PdfRef page={16} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a 9. 17 Therefore, on refund in the 3 rd year, following entry will be passed: ` ` I Deferred Grant A/c Dr. 8 lakhs Profit &amp; Loss A/c Dr. 8 lakhs To Bank A/c 16 lakhs (Being Government grant refunded) II Deferred grant account will become Nil. The fixed assets will continue to be shown in the books at ` 24 lakhs (W.N.2) and depreciation will continue to be charged at ` 8 lakhs per annum for the remaining two years. Working Notes: 1. Balance of Fixed Assets after two years but before refund (under first alternative) Fixed assets initially recorded in the books = ` 40 lakhs – ` 16 lakhs = ` 24 lakhs Depreciation p.a. = ( ` 24 lakhs – ` 8 lakhs)/4 years = ` 4 lakhs per year Value of fixed assets after two years but before refund of grant = ` 24 lakhs – ( ` 4 lakhs x 2 years) = ` 16 lakhs 2. Balance of Fixed Assets after two years but before refund (under second alternative) Fixed assets initially recorded in the books = ` 40 lakhs Depreciation p.a. = ( ` 40 lakhs – ` 8 lakhs)/4 years = ` 8 lakhs per year Book value of fixed assets after two years = ` 40 lakhs – ( ` 8 lakhs x 2 years) = ` 24 lakhs Note : V alue of fixed assets given above is after refund of government grant. <PdfRef page={17} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a Illustration 1 1 Co X runs a charitable hospital. It incurs salary of doctors, staff etc to the extent of ` 30 lakhs per annum. As a support, the local govt grants a lumpsum payment of `90 lakhs to meet the salary expense for a period of next 5 years. At the start of Year 4, Co X is unable to meet the conditions attached to the grant and is required to refund the entire grant of 90 lakhs. You are required to pass the necessary journal entries in the books of the company for refund of the grant if the grant was shown separately as Other Income. Solution ` ` Deferred Grant A/c Dr. 36 lakhs Profit &amp; Loss A/c Dr. 54 lakhs To Bank A/c 90 lakhs (Being Government grant refunded) Workings: Total grant received: ` 90 Lakhs Grant recognised as income for first 3 years: ` 18 lakhs × 3 = ` 54 lakhs Remaining Deferred Income = ` 90 Lakhs – 54 lakhs = ` 36 lakhs Reference: The students are advised to refer the full text of <strong>AS 12</strong> “ Accounting for Government Grants ”. <PdfRef page={18} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a 9. 19 TEST YOUR KNOWLEDGE Multiple Choice Questions 1 . To encourage industrial promotion, IDCI offers subsidy worth ` 50 lakhs to all new industries set up in the specified industrial areas. This grant is in the nature of promoter’s contribution. How such subsidy should be accounted in the books? (a) Credit it to capital reserve (b) Credit it as ‘other income’ in the profit and loss account in the year of commencement of commercial operations (c) Both (a) and (b) are permitted ( d ) Credit it to general reserve 2 . Government grants that are receivable as compensation for expenses or losses incurred in a previous accounting period or for the purpose of giving immediate financial support to the enterprise with no further related costs, should be (a) recognised and disclosed in the Statement of Profit and Loss of the period in which they are receivable as an ordinary item. (b) recognised and disclosed in the Statement of Profit and Loss of the period in which the losses or expenses were incurred. (c) recognised and disclosed in the Statement of Profit and Loss of the period in which they are receivable, as an extraordinary item if appropriate as per <strong>AS 5</strong>. (d) disclosed in the Statement of Profit and Loss of the period in which they are receivable, as an extraordinary item 3 . Which of the following is an acceptable method of accounting presentation for a government grant relating to an asset? (a) Credit the grant immediately to Income statement (b) Show the grant as part of Capital Reserve (c) Reduce the grant from the cost of the asset or show it separately as a deferred income on the Liability side of the Balance Sheet. (d) Show the grant as part of general Reserve <PdfRef page={19} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a 4. X Ltd . has received a grant of ` 20 crore for purchase of a qualified machine costing ` 80 crore . X Ltd has a policy to recognise the grant as a deduction from the cost of the asset . The expected remaining useful life of the machine is 10 years. Assume that there is no salvage value and the depreciation method is straight - line. The amount of annual depreciation to be charged as an expense in Profit and Loss Statement will be: (a) ` 10 crore (b) ` 6 crore (c) ` 2 crore (d) ` 8 crore 5 . X Ltd has received a grant of ` 20 crore for purchase of a qualified machine costing ` 80 crore . X Ltd . has a policy to recognise the grant as deferred income. The expected remaining useful life of the machine is 10 years. Assume that there is no salvage value and the depreciation method is straight - line. The amount of other income to be to be recognised in Profit and Loss Statement will be: (a) ` 10 crore (b) ` 6 crore (c) ` 2 crore (d) ` 8 crore Theor etical Questions 6. <strong>AS 12</strong> deals with recognition and measurement of government grants. Please elaborate the parameters which are required to be met before an entity can recognise government grants in its books? Scenario based Questions 7. Supriya Ltd. received a grant of ` 2,500 lakhs during the accounting year 20X1 - 20X2 from government for welfare activities to be carried on by the company for its employees. The grant prescribed conditions for its utilisation. However, during the year 20X2 - 20X3, it was found that the conditions of grants were not complied with and the grant had to be refunded to the government in full. <PdfRef page={20} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a 9. 21 Elucidate the current accounting treatment, with reference to the provisions of AS - 12 8. Hygiene Ltd. had received a grant of ` 50 lakh in 2012 from a State Government towards installation of pollution control machinery on fulfilment of certain conditions. The company, however, failed to comply with the said conditions and consequently was required to refund the said amount in 202 4 . The company debited the said amount to its machinery account in 202 4 on payment of the same. It also reworked the depreciation for the said machinery from the date of its purchase and passed necessary adjusting entries in the year 202 4 to incorporate the retrospective impact of the same. State whether the treatment done by the company is correct or not. ANSWERS /SOLUTION S Answer to the Multiple Choice Questions 1. (a) 2. (c) 3. (c) 4. (b) 5. (c) Answer to the Theor et i cal Questions 6. A government grant is recognised when there is reasonable assurance that: • the enterprise will comply with the conditions attaching to it; and • the grant will be received. Receipt of a grant is not of itself conclusive evidence that the conditions attaching to the grant have been or will be fulfilled. Answer to the Scenario based Questions 7. As per <strong>AS 12</strong> ‘Accounting for Government Grants’, Government grants sometimes become refundable because certain conditions are not fulfilled. A government grant that becomes refundable is treated as an extraordinary item as per <strong>AS 5</strong>. The amount refundable in respect of a government grant related to revenue is applied first against any unamortised deferred credit remaining in respect of the grant. To the extent that the amount refundable exceeds any such <PdfRef page={21} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a deferred credit, or where no deferred credit exists, the amount is charged immediately to profit and loss statement. In the present case, the amount of refund of government grant should be first adjusted against the unamortised deferred income in the books and the excess if any will be debited to profit &amp; loss account of the company as an extraordinary item in the year 20X2 - 20X3. 8. As per the facts of the case, Hygiene Ltd. had received a grant of ` 50 lakh in 2012 from a State Government towards installation of pollution control machinery on fulfilment of certain conditions. However, the amount of grant has to be refunded since it failed to comply with the prescribed conditions. In such circumstances, <strong>AS 12</strong>, “Accounting for Government Grants”, requires that the amount refundable in respect of a government grant related to a specific fixed asset is recorded by increasing the book value of the asset or by reducing the capital reserve or the deferred income balance, as appropriate, by the amount refundable. The Standard further makes it clear that in the first alternative, i.e., where the book value of the asset is increased, depreciation on the revised book value should be provided prospectively over the residual useful life of the asset. Accordingly, the accounting treatment given by Hygiene Ltd. of increasing the value of the plant and machinery is quite proper. However, the accounting treatment in respect of depreciation given by the company of adjustment of depreciation with retrospective effect is improper and constitutes violation of <strong>AS 12</strong>. <PdfRef page={22} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 12**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 12, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
