'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, ChevronDown } from 'lucide-react'

export const as29Sections = [
  { id: 'as-29-intro-sec', title: '1. Introduction & Objectives' },
  { id: 'as-29-introduction', title: '2.1 INTRODUCTION' },
  { id: 'as-29-scope', title: '2.2 SCOPE' },
  { id: 'as-29-definitions', title: '2.3 DEFINITIONS' },
  { id: 'as-29-recognition-of-provision', title: '2.4 RECOGNITION OF PROVISION' },
  { id: 'as-29-present-obligation', title: '2.5 PRESENT OBLIGATION' },
  { id: 'as-29-past-event', title: '2.6 PAST EVENT' },
  { id: 'as-29-probable-outflow-of-resources', title: '2.7 PROBABLE OUTFLOW OF RESOURCES' },
  { id: 'as-29-reliable-estimate-of-the-obligation', title: '2.8 RELIABLE ESTIMATE OF THE OBLIGATION' },
  { id: 'as-29-contingent-liabilities', title: '2.9 CONTINGENT LIABILITIES' },
  { id: 'as-29-contingent-assets', title: '2.10 CONTINGENT ASSETS' },
  { id: 'as-29-measurement-best-estimate', title: '2.11 MEASUREMENT: BEST ESTIMATE' },
  { id: 'as-29-risks-and-uncertainties', title: '2.12 RISKS AND UNCERTAINTIES' },
  { id: 'as-29-future-events', title: '2.13 FUTURE EVENTS' },
  { id: 'as-29-expected-disposal-of-assets', title: '2.14 EXPECTED DISPOSAL OF ASSETS' },
  { id: 'as-29-reimbursements', title: '2.15 REIMBURSEMENTS' },
  { id: 'as-29-table-reimbursements', title: '2.16 TABLE- REIMBURSEMENTS' },
  { id: 'as-29-changes-in-provisions', title: '2.17 CHANGES IN PROVISIONS' },
  { id: 'as-29-use-of-provisions', title: '2.18 USE OF PROVISIONS' },
  { id: 'as-29-application-of-the-recognition-and', title: '2.19 APPLICATION OF THE RECOGNITION AND' },
  { id: 'as-29-disclosure', title: '2.20 DISCLOSURE' }
];

interface AS29StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function AS29StandardTabContent({ navigateToPdfPage }: AS29StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as-29-intro-sec');
  const tocScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(id);
    const stickyToc = document.getElementById('as-29-standard-sticky-toc');
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

      as29Sections.forEach((sec) => {
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
      <div id="as-29-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as29Sections.map(sec => (
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
        <section id="as-29-intro-sec" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-29-intro-sec" num="1" title="1. Introduction &amp; Objectives" />
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 1 ---  UNIT 2: AS 29 (REVISED) PROVISIONS, CONTINGENT LIABILITIES AND CONTINGENT ASSETS After studying this unit, you will be able to comprehend the – • Meaning of ‘Executory contracts’, ‘Provision’, ‘Liability, Obligating event’ and other related terms used in the standard; • Need for recognition of provision; • Definition of Present Obligation and Past Event; • Probable Outflow of Resources Embodying Economic Benefits; • Application of the Recognition and Measurement Rules; • Disclosure requirements as per the Standard.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 29**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 29, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
        <section id="as-29-introduction" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-29-introduction" num="2.1" title="INTRODUCTION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            <strong>AS 29</strong> (Revised) came into effect in respect of accounting periods commenced on or after 1-4-2004. The objective of <strong>AS 29</strong> (Revised) is to ensure that appropriate recognition criteria and measurement bases are applied to provisions and contingent liabilities and sufficient information is disclosed in the notes to the financial statements to enable users to understand their nature, timing and amount. The objective of <strong>AS 29</strong> (Revised) is also to lay down appropriate accounting for contingent assets. Companies would create provisions on arbitrary basis when profits in a particular year is more and then reverse those provisions when profits are lower in subsequent years. This would lead to manipulation of profits. This is popularly known as ‘profit smoothing”. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 2 ---  Thus, there is a need for certain parameters on the basis of which provisions are measured and recognised, as they impact both Profit and Loss Statement and Balance Sheet (creation of an expense and creation of a liability). AS-29 prescribes the guidance in respect of recognition, measurement and disclosures of provisions, contingent liabilities and contingent assets. The standard clearly defines the role of management while making an estimate for creating provisions and the auditors to vouch for the correctness or otherwise of the estimate made by the management. This ensures that manipulations do not take place at the time of creation of provisions. Earlier, the companies were not recognising the liability on the ground of uncertainty regarding its timing or amount. With the issuance of AS 29, transactions which qualify for creating a provision need to be accounted for in the Balance sheet as a liability. Example 1 During 20X1, XY Enterprise has made lower amount of profits. However, to ensure that the Earnings Per Share do not decline significantly, XY Enterprise does not provide for a warranty amount which should have been provided for. XY is confident of higher amount of profits during later years, and would like to take this provision to the later stage. This ensures consistent performance for the company throughout the period. With AS 29, this anomaly stands removed. Example 2 During 20X1, AB Shops has made huge profits during a particular year. This may have resulted in payment of taxes on these profits. Further, AB Shop’s management foresees challenges in operations in later years, and therefore, low profits. AB Shop did not create a provision during 20X2 which should have been otherwise made. However, to get the desired impact, AB Shop created the provision in 20X1. Since, the intention of management is not to reflect a true and fair view; AS-29 would ensure appropriate provisions are made in 20X2 only. AS 29 helps to ensure transparency of information in Financial Statements.</li>
            <li>-- PAGE 3 ---  Thus, an accounting standard on provisions is essential to rule out the potential scope for companies to manipulate profits and provisions are made on valid grounds (based on a recognition criterion being met).</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 29**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 29, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.2 SCOPE */}
        <section id="as-29-scope" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-29-scope" num="2.2" title="SCOPE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            <strong>AS 29</strong> should be applied in accounting for provisions and contingent liabilities and in dealing with contingent assets, other than: a. Those resulting from financial instruments that are carried at fair value; b. Those resulting from executory contracts except where the contract is onerous; c. Those arising in insurance enterprises from contracts with policy-holders; and d. Those covered by another <strong>Accounting Standard</strong>. Where another <strong>Accounting Standard</strong> such as <strong>AS 7</strong>; <strong>AS 9</strong>; <strong>AS 15</strong>; <strong>AS 19</strong> and <strong>AS 22</strong> deals with a specific type of provision, contingent liability or contingent asset, an enterprise applies that Standard instead of <strong>AS 29</strong>. Create provision while it is not required Show less profits and avoid taxes Higher profits Do not create provision while it is required Show high profits and higher EPS Lower profits <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 4 --- </li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 29**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 29, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.3 DEFINITIONS */}
        <section id="as-29-definitions" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-29-definitions" num="2.3" title="DEFINITIONS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Executory contracts are contracts under which neither party has performed any of its obligations or both parties have partially performed their obligations to an equal extent. A Provision is a liability which can be measured only by using a substantial degree of estimation. A Liability is a present obligation of the enterprise arising from past events, the settlement of which is expected to result in an outflow from the enterprise of resources embodying economic benefits. An Obligating event is an event that creates an obligation that results in an enterprise having no realistic alternative to settling that obligation. A Contingent liability is: (a) A possible obligation that arises from past events and the existence of which will be confirmed only by the occurrence or non-occurrence of one or more uncertain future events not wholly within the control of the enterprise; or (b) A present obligation that arises from past events but is not recognised because: (i) It is not probable that an outflow of resources embodying economic benefits will be required to settle the obligation; or (ii) A reliable estimate of the amount of the obligation cannot be made. A Contingent asset is a possible asset that arises from past events the existence of which will be confirmed only by the occurrence or non-occurrence of one or more uncertain future events not wholly within the control of the enterprise. Present obligation - an obligation is a present obligation if, based on the evidence available, its existence at the balance sheet date is considered probable, i.e., more likely than not. Possible obligation - an obligation is a possible obligation if, based on the evidence available, its existence at the balance sheet date is considered not probable. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 5 ---  A Restructuring is a programme that is planned and controlled by management, and materially changes either: (a) The scope of a business undertaken by an enterprise; or (b) The manner in which that business is conducted.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 29**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 29, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.4 RECOGNITION OF PROVISION */}
        <section id="as-29-recognition-of-provision" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-29-recognition-of-provision" num="2.4" title="RECOGNITION OF PROVISION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            A provision should be recognised when: (a) An enterprise has a present obligation as a result of a past event; (b) It is probable that an outflow of resources embodying economic benefits will be required to settle the obligation; and (c) A reliable estimate can be made of the amount of the obligation. If these conditions are not met, no provision should be recognised. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 29**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 29, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.5 PRESENT OBLIGATION */}
        <section id="as-29-present-obligation" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-29-present-obligation" num="2.5" title="PRESENT OBLIGATION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            An enterprise determines whether a present obligation exists at the balance sheet date by taking account of all available evidence, e.g., the opinion of experts. Based on such evidence: (a) Where it is more likely than not that a present obligation exists at the balance sheet date, the enterprise recognises a provision (if the recognition criteria are met); and (b) Where it is more likely that no present obligation exists at the balance sheet date, the enterprise discloses a contingent liability, unless the possibility of an outflow of resources embodying economic benefits is remote. Example 3 X Ltd sells refrigerators with a warranty of 6 months. The refrigerators would be repaired free of cost by X Ltd. if some problem arises during the next 6 months of sale. There is a present obligation for X Ltd because if some defect arises, X Ltd would need to incur expenses on repairs of the refrigerator. Thus, a provision is required to be made in the books of X Ltd. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 6 ---  Example 4 Z Ltd takes a building on lease for 10 years. The terms of the contract provide that Z Ltd must vacate the building in its original condition. Z Ltd expects that there is a likely cost of ` 10 lakhs to be spent at the end of 10 years for restoration. Since there is a present obligation on X Ltd at the time of entering into the lease contract, a provision to the extent of present value of this amount should be created.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 29**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 29, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.6 PAST EVENT */}
        <section id="as-29-past-event" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-29-past-event" num="2.6" title="PAST EVENT" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            A past event that leads to a present obligation is called an obligating event. For an event to be an obligating event, it is necessary that the enterprise has no realistic alternative to settling the obligation created by the event. Financial statements deal with the financial position of an enterprise at the end of its reporting period and not its possible position in the future. Therefore, no provision is recognised for costs that need to be incurred to operate in the future. The only liabilities recognised in an enterprise&apos;s balance sheet are those that exist at the balance sheet date. It is only those obligations arising from past events existing independently of an enterprise&apos;s future actions (i.e. the future conduct of its business) that are recognised as provisions. Examples of such obligations are penalties or clean-up costs for unlawful environmental damage, both of which would lead to an outflow of resources embodying economic benefits in settlement regardless of the future actions of the enterprise. Similarly, an enterprise recognises a provision for the decommissioning costs of an oil installation to the extent that the enterprise is obliged to rectify damage already caused. In contrast, because of commercial pressures or legal requirements, an enterprise may intend or need to carry out expenditure to operate in a particular way in the future (for example, by fitting smoke filters in a certain type of factory). Because the enterprise can avoid the future expenditure by its future actions, for example by changing its method of operation, it has no present obligation for that future expenditure and no provision is recognised. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 7 ---  An event that does not give rise to an obligation immediately may do so at a later date, because of changes in the law. For example, when environmental damage is caused there may be no obligation to remedy the consequences. However, the causing of the damage will become an obligating event when a new law requires the existing damage to be rectified. Where details of a proposed new law have yet to be finalized, an obligation arises only when the legislation is virtually certain to be enacted.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 29**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 29, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.7 PROBABLE OUTFLOW OF RESOURCES */}
        <section id="as-29-probable-outflow-of-resources" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-29-probable-outflow-of-resources" num="2.7" title="PROBABLE OUTFLOW OF RESOURCES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            EMBODYING ECONOMIC BENEFITS For a liability to qualify for recognition there must be not only a present obligation but also the probability of an outflow of resources embodying economic benefits to settle that obligation. For the purpose of <strong>AS 29</strong>, an outflow of resources or other event is regarded as probable if the probability that the event will occur is greater than the probability that it will not. Where it is not probable that a present obligation exists, an enterprise discloses a contingent liability, unless the possibility of an outflow of resources embodying economic benefits is remote. Where there are a number of similar obligations (e.g., product warranties or similar contracts) the probability that an outflow will be required in settlement is determined by considering the class of obligations as a whole. Although the likelihood of outflow for any one item may be small, it may well be probable that some outflow of resources will be needed to settle the class of obligations as a whole. If that is the case, a provision is recognized (if the other recognition criteria are met). Example 5 Kell Ltd sells laptops with a replacement warranty of 1 year. If something happens to the laptop within 1 year of purchase, the company would replace the complete laptop. A few laptops during past years have been replaced by Kell Ltd. In the above situation, Kell Ltd would incur some expenses to replace a laptop, if something goes wrong. There is an outflow of resources expected to settle the obligation that arises by virtue of sale of laptop (past event). <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 8 ---  Example 6 AB Ltd has received a notice from one of the customers about health issues from using the products of AB Ltd. The customer in the notice claims damages of ` 5,00,000. The conditions of past event (i.e. sale of goods resulting in damage) and reliable estimate ( ` 5,00,000) have been met. However, whether an outflow of resources will be probable or not, cannot be confirmed since the customer may or may not win the case. This would be clear only when the decision will be taken by the court. Hence, in the above situation, no provision for damages will be made. However, a disclosure of the case filed is required to be made.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 29**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 29, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.8 RELIABLE ESTIMATE OF THE OBLIGATION */}
        <section id="as-29-reliable-estimate-of-the-obligation" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-29-reliable-estimate-of-the-obligation" num="2.8" title="RELIABLE ESTIMATE OF THE OBLIGATION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The use of estimates is an inherent part of preparing financial statements and does not undermine their reliability. Provisions require a greater degree of estimation than most other items, but <strong>AS 29</strong> (Revised) emphasizes that it should not be impossible to determine a range of possible outcomes and, from this range, to reach an appropriate conclusion that is sufficiently reliable for the provision to be recognized. <strong>AS 29</strong> (Revised) concludes that the circumstances in which it will not be possible to reach a reliable estimate, will be extremely rare. In the extremely rare case where no reliable estimate can be made, a liability exists that cannot be recognized. That liability will, instead, be disclosed as a contingent liability. For example: XYZ is in mining business. It is operating in a country where XYZ is legally bound to clean and restore the environment on expiry of license after 10 years. XYZ can reliably estimate the amount required to restore the environment caused by the mining business. Since it if a present obligation which cannot be avoided resulted from past event, it is probable that resources will flow out of business to settle the same and estimate can be measured reliably. XYZ is required to recognize a provision for the same. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 29**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 29, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.9 CONTINGENT LIABILITIES */}
        <section id="as-29-contingent-liabilities" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-29-contingent-liabilities" num="2.9" title="CONTINGENT LIABILITIES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            An enterprise should not recognize a contingent liability but should be disclosed. A contingent liability is disclosed, unless the possibility of an outflow of resources embodying economic benefits is remote. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 9 ---  Where an enterprise is jointly and severally liable for an obligation, the part of the obligation that is expected to be met by other parties is treated as a contingent liability. The enterprise recognizes a provision for the part of the obligation for which an outflow of resources embodying economic benefits is probable, except in the extremely rare circumstances where no reliable estimate can be made. Contingent liabilities may develop in a way not initially expected. Therefore, they are assessed continually to determine whether an outflow of resources embodying economic benefits has become probable. If it becomes probable that an outflow of future economic benefits will be required for an item previously dealt with as a contingent liability, a provision is recognized in the financial statements of the period in which the change in probability occurs. Example: 7 A customer of XYZ has filed a case against them for providing them wrong product and not returning the same. XYZ has taken legal advice from their lawyer who believes it is not probable yet that resources may be required to settle the same. Since it is not meeting all the criteria of provision, it will be treated as contingent liability and will just be disclosed in the notes. Decision tree Start Present obligation as a result of an obligating event? Probable outflow Yes Reliable estimate Provide Yes Yes Possible Obligation Remote Disclose contingent liability Do nothing No No Yes No Yes No No (rare)</li>
            <li>-- PAGE 10 --- </li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 29**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 29, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.10 CONTINGENT ASSETS */}
        <section id="as-29-contingent-assets" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-29-contingent-assets" num="2.10" title="CONTINGENT ASSETS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Contingent assets usually arise from unplanned or other unexpected events that give rise to the possibility of an inflow of economic benefits to the enterprise. An example is a claim that an enterprise is pursuing through legal processes, where the outcome is uncertain. An enterprise should not recognize a contingent asset, since this may result in the recognition of income that may never be realized. However, when the realization of income is virtually certain, then the related asset is not a contingent asset and its recognition is appropriate. A contingent asset is not disclosed in the financial statements. It is usually disclosed in the report of the approving authority (Board of Directors in the case of a company, and, the corresponding approving authority in the case of any other enterprise), where an inflow of economic benefits is probable. Contingent assets are assessed continually and if it has become virtually certain that an inflow of economic benefits will arise, the asset and the related income are recognized in the financial statements of the period in which the change occurs. Table- Provisions and contingent liabilities Where, as a result of past events, there may be an outflow of resources embodying future economic benefits in settlement of: (a) a present obligation the one whose existence at the balance sheet date is considered probable; or (b) a possible obligation the existence of which at the balance sheet date is considered not probable. There is a present obligation that probably requires an outflow of resources and a reliable estimate can be made of the amount of obligation. There is a possible obligation or a present obligation that may, but probably will not, require an outflow of resources. There is a possible obligation or a present obligation where the likelihood of an outflow of resources is remote. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 11 ---  Provision is recognised. Disclosures are required for the provision. No provision is recognised. Disclosures are required for the contingent liability. No provision is recognised. No disclosure is required.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 29**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 29, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.11 MEASUREMENT: BEST ESTIMATE */}
        <section id="as-29-measurement-best-estimate" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-29-measurement-best-estimate" num="2.11" title="MEASUREMENT: BEST ESTIMATE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The amount recognised as a provision should be the best estimate of the expenditure required to settle the present obligation at the balance sheet date. The estimates of outcome and financial effect are determined by: • the judgment of the management of the enterprise, • supplemented by experience of similar transactions and, • in some cases, reports from independent experts. The amount of a provision should not be discounted to its present value except in case of decommissioning, restoration and similar liabilities that are recognised as cost of Property, Plant and Equipment. The discount rate (or rates) should be a pre-tax rate (or rates) that reflect(s) current market assessments of the time value of money and the risks specific to the liability. The discount rate(s) should not reflect risks for which future cash flow estimates have been adjusted. Periodic unwinding of discount should be recognised in the statement of profit and loss. The provision is measured before tax; the tax consequences of the provision, and changes in it, are dealt with under <strong>AS 22</strong>. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 29**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 29, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.12 RISKS AND UNCERTAINTIES */}
        <section id="as-29-risks-and-uncertainties" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-29-risks-and-uncertainties" num="2.12" title="RISKS AND UNCERTAINTIES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The risks and uncertainties that inevitably surround many events and circumstances should be taken into account in reaching the best estimate of a provision. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 12 --- </li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 29**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 29, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.13 FUTURE EVENTS */}
        <section id="as-29-future-events" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-29-future-events" num="2.13" title="FUTURE EVENTS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            It is only those obligations arising from past events that exist independently of the enterprise’s future actions (i.e. the future conduct of its business) that are recognized as provisions. Future events that may affect the amount required to settle an obligation should be reflected in the amount of a provision where there is sufficient objective evidence that they will occur. For example, an enterprise may believe that the cost of cleaning up a site at the end of its life will be reduced by future changes in technology. The amount recognized reflects a reasonable expectation of technically qualified, objective observers, taking account of all available evidence as to the technology that will be available at the time of the clean-up. Thus, it is appropriate to include, for example, expected cost reductions associated with increased experience in applying existing technology or the expected cost of applying existing technology to a larger or more complex clean-up operation than has previously been carried out. However, an enterprise does not anticipate the development of a completely new technology for cleaning up unless it is supported by sufficient objective evidence. The effect of possible new legislation is taken into consideration in measuring an existing obligation when sufficient objective evidence exists that the legislation is virtually certain to be enacted. The variety of circumstances that arise in practice usually makes it impossible to specify a single event that will provide sufficient, objective evidence in every case. Evidence is required both of what legislation will demand and of whether it is virtually certain to be enacted and implemented in due course. In many cases sufficient objective evidence will not exist until the new legislation is enacted. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 29**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 29, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.14 EXPECTED DISPOSAL OF ASSETS */}
        <section id="as-29-expected-disposal-of-assets" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-29-expected-disposal-of-assets" num="2.14" title="EXPECTED DISPOSAL OF ASSETS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Gains on the expected disposal of assets are not taken into account in measuring a provision, even if the expected disposal is closely linked to the event giving rise to the provision. Instead, an enterprise recognizes gains on expected disposals of assets at the time specified by the <strong>Accounting Standard</strong> dealing with the assets concerned. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 13 --- </li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 29**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 29, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.15 REIMBURSEMENTS */}
        <section id="as-29-reimbursements" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-29-reimbursements" num="2.15" title="REIMBURSEMENTS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            An enterprise with a present obligation may be able to seek reimbursement of part or all of the expenditure from another party, for example via: • An insurance contract arranged to cover a risk; • An indemnity clause in a contract; or • A warranty provided by a supplier. The basis underlying the recognition of a reimbursement is that any asset arising is separate from the related obligation. Consequently, such a reimbursement should be recognized only when it is virtually certain that it will be received consequent upon the settlement of the obligation. In most cases, the enterprise will remain liable for the whole of the amount in question so that the enterprise would have to settle the full amount if the third party failed to pay for any reason. In this situation, a provision is recognized for the full amount of the liability, and a separate asset for the expected reimbursement is recognized when it is virtually certain that reimbursement will be received if the enterprise settles the liability. In some cases, the enterprise will not be liable for the costs in question if the third party fails to pay. In such a case, the enterprise has no liability for those costs and they are not included in the provision. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 29**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 29, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.16 TABLE- REIMBURSEMENTS */}
        <section id="as-29-table-reimbursements" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-29-table-reimbursements" num="2.16" title="TABLE- REIMBURSEMENTS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Some or all of the expenditure required to settle a provision is expected to be reimbursed by another party. The enterprise has no obligation for the part of the expenditure to be reimbursed by the other party. The obligation for the amount expected to be reimbursed remains with the enterprise and it is virtually certain that reimbursement will be received if the enterprise settles the provision. The obligation for the amount expected to be reimbursed remains with the enterprise and the reimbursement is not virtually certain if the enterprise settles the provision. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 14 ---  The enterprise has no liability for the amount to be reimbursed. The reimbursement is recognized as a separate asset in the balance sheet and may be offset against the expense in the statement of profit and loss. The amount recognized for the expected reimbursement does not exceed the liability. The expected reimbursement is not recognized as an asset. No disclosure is required. The reimbursement is disclosed together with the amount recognized for the reimbursement. The expected reimbursement is disclosed.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 29**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 29, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.17 CHANGES IN PROVISIONS */}
        <section id="as-29-changes-in-provisions" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-29-changes-in-provisions" num="2.17" title="CHANGES IN PROVISIONS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Provisions should be reviewed at each balance sheet date and adjusted to reflect the current best estimate. If it is no longer probable that an outflow of resources embodying economic benefits will be required to settle the obligation, the provision should be reversed. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 29**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 29, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.18 USE OF PROVISIONS */}
        <section id="as-29-use-of-provisions" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-29-use-of-provisions" num="2.18" title="USE OF PROVISIONS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            A provision should be used only for expenditures for which the provision was originally recognized. Only expenditures that relate to the original provision are adjusted against it. Adjusting expenditures against a provision that was originally recognized for another purpose would conceal the impact of two different events. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 15 --- </li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 29**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 29, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.19 APPLICATION OF THE RECOGNITION AND */}
        <section id="as-29-application-of-the-recognition-and" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-29-application-of-the-recognition-and" num="2.19" title="APPLICATION OF THE RECOGNITION AND" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            MEASUREMENT RULES.1 Future Operating Losses Future operating losses do not meet the definition of a liability and the general recognition criteria; therefore, provisions should not be recognized for future operating losses. 2.19.2 Restructuring The following are examples of events that may fall under the definition of restructuring: (a) Sale or termination of a line of business (b) The closure of business locations in a country or region or the relocation of business activities from one country or region to another (c) Changes in management structure, for example, eliminating a layer of management (d) Fundamental re-organizations that have a material effect on the nature and focus of the enterprise&apos;s operations A provision for restructuring costs is recognized only when the recognition criteria for provisions are met. No obligation arises for the sale of an operation until the enterprise is committed to the sale, i.e., there is a binding sale agreement. Until there is a binding sale agreement, the enterprise will be able to change its mind and indeed will have to take another course of action if a purchaser cannot be found on acceptable terms. A restructuring provision should include only the direct expenditures arising from the restructuring, which are those that are both: (a) Necessarily entailed by the restructuring; and (b) Not associated with the ongoing activities of the enterprise. A restructuring provision does not include such costs as: (a) Retraining or relocating continuing staff; <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 16 ---  (b) Marketing; or (c) Investment in new systems and distribution networks. These expenditures relate to the future conduct of the business and are not liabilities for restructuring at the balance sheet date. Such expenditures are recognized on the same basis as if they arose independently of a restructuring. Identifiable future operating losses up to the date of a restructuring are not included in a provision. Gains on the expected disposal of assets are not taken into account in measuring a restructuring provision, even if the sale of assets is envisaged as part of the restructuring.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 29**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 29, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.20 DISCLOSURE */}
        <section id="as-29-disclosure" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-29-disclosure" num="2.20" title="DISCLOSURE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            For each class of provision, an enterprise should disclose: (a) The carrying amount at the beginning and end of the period; (b) Additional provisions made in the period, including increases to existing provisions; (c) Amounts used (i.e., incurred and charged against the provision) during the period; and (d) Unused amounts reversed during the period. Note: SMCs are exempt from the above disclosure requirements of <strong>AS 29</strong> (Revised) An enterprise should disclose the following for each class of provision: (a) A brief description of the nature of the obligation and the expected timing of any resulting outflows of economic benefits; (b) An indication of the uncertainties about those outflows. Where necessary to provide adequate information, an enterprise should disclose the major assumptions made concerning future events, and (c) The amount of any expected reimbursement, stating the amount of any asset that has been recognized for that expected reimbursement. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 17 ---  Note: SMCs are exempt from the above disclosure requirements of AS 29 (Revised) Unless the possibility of any outflow in settlement is remote, an enterprise should disclose for each class of contingent liability at the balance sheet date a brief description of the nature of the contingent liability and, where practicable: (a) An estimate of its financial effect, (b) An indication of the uncertainties relating to any outflow; and (c) The possibility of any reimbursement. Where any of the information required by above paragraph is not disclosed because it is not practicable to do so, that fact should be stated. In extremely rare cases, disclosure of some or all of the information required by AS 29 can be expected to prejudice seriously the position of the enterprise in a dispute with other parties on the subject matter of the provision or contingent liability. In such cases, an enterprise need not disclose the information, but should disclose the general nature of the dispute, together with the fact that, and reason why, the information has not been disclosed. Illustration 1 At the end of the financial year ending on 31st December, 20X1, a company finds that there are twenty law suits outstanding which have not been settled till the date of approval of accounts by the Board of Directors. The possible outcome as estimated by the Board is as follows: Probability Loss ( ` ) In respect of five cases (Win) 100% − Next ten cases (Win) 50% − Lose (Low damages) 40% 1,20,000 Lose (High damages) 10% 2,00,000 Remaining five cases Win 50% − Lose (Low damages) 30% 1,00,000 Lose (High damages) 20% 2,10,000</li>
            <li>-- PAGE 18 ---  Outcome of each case is to be taken as a separate entity. Ascertain the amount of contingent loss and the accounting treatment in respect thereof. Solution According to AS 29 (Revised) ‘Provisions, Contingent Liabilities and Contingent Assets’, contingent liability should be disclosed in the financial statements if following conditions are satisfied: (i) There is a present obligation arising out of past events but not recognized as provision. (ii) It is not probable that an outflow of resources embodying economic benefits will be required to settle the obligation. (iii) The possibility of an outflow of resources embodying economic benefits is not remote. (iv) The amount of the obligation cannot be measured with sufficient reliability to be recognized as provision. In this case, the probability of winning of first five cases is 100% and hence, question of providing for contingent loss does not arise. The probability of winning of next ten cases is 50% and for remaining five cases is 50%. As per AS 29 (Revised), we make a provision if the loss is probable. As the loss does not appear to be probable and the possibility of an outflow of resources embodying economic benefits is remote, therefore disclosure by way of note should be made. For the purpose of the disclosure of contingent liability by way of note, amount may be calculated as under: Expected loss in next ten cases = 40% of ` 1,20,000 + 10% of ` 2,00,000 = ` 48,000 + ` 20,000 = ` 68,000 Expected loss in remaining five cases = 30% of ` 1,00,000 + 20% of ` 2,10,000 = ` 30,000 + ` 42,000 = ` 72,000 To disclose contingent liability on the basis of maximum loss will be highly unrealistic. Therefore, the better approach will be to disclose the overall expected loss of ` 10,40,000 (` 68,000  10 + ` 72,000  5) as contingent liability.</li>
            <li>-- PAGE 19 ---  Illustration 2 EXOX Ltd. is in the process of finalising its accounts for the year ended 31 st March, 20X2. The company seeks your advice on the following: (i) The Company’s sales tax assessment for assessment year 20X1-X2 has been completed on 14th February, 20X4 with a demand of ` 2.76 crore. The company paid the entire due under protest without prejudice to its right of appeal. The Company files its appeal before the appellate authority wherein the grounds of appeal cover tax on additions made in the assessment order for a sum of crore. (ii) The Company has entered into a wage agreement in May, 20X2 whereby the labour union has accepted a revision in wage from June, 20X1. The agreement provided that the hike till May, 20X2 will not be paid to the employees but will be settled to them at the time of retirement. The company agrees to deposit the arrears in Government Bonds by September, 20X2. Solution (i) Since the company is not appealing against the addition of ` 0.66 crore the same should be provided for in its accounts for the year ended on 31st March, 20X4. The amount paid under protest can be kept under the heading ‘Loans &amp; Advances’ and disclosed as a contingent liability of ` 2.10 crore. (ii) The arrears for the period from June, 20X1 to March, 20X2 are required to be provided for in the accounts of the company for the year ended on 31st March, 20X2.</li>
            <li>-- PAGE 20 ---  TEST YOUR KNOWLEDGE Multiple Choice Questions 1. Which of the following best describes a provision? (a) A provision is a liability of uncertain timing or amount. (b) A provision is a possible obligation of uncertain timing. (c) A provision is a credit balance set up to offset a contingent asset so that the effect on the statement of financial position is nil. (d) A provision is a possible obligation of uncertain amount. 2. X Co is a business that sells second hand cars. If a car develops a fault within 30 days of the sale, X Co will repair it free of charge. At 1st March 20X1, X Co had made a provision for repairs of ` 25,000. At 31st March 20X1, X Co calculated that the provision should be ` 20,000. What entry should be made for the provision in X Co&apos;s income statement for the month 31st March 20X1? (a) A charge of ` 5,000 (b) A credit of ` 5,000 (c) A charge of ` 20,000 (d) A credit of ` 25,000 3. Which of the following item does the statement below describe? “A possible obligation that arises from past events and whose existence will be confirmed only by the occurrence or non-occurrence of one or more uncertain future events not wholly within the entity&apos;s control” (a) A provision (b) A current liability (c) A contingent liability (d) Deferred tax liability 4. Z Ltd has commenced a legal action against Y Ltd claiming substantial damages for supply of a faulty product. The lawyers of Y Ltd have advised that the company is likely to lose the case, although the chances of paying the claim is not remote. The estimated potential liability estimated by the lawyers are:</li>
            <li>-- PAGE 21 --- Legal cost (to be incurred irrespective of the outcome of the case) ` 50,000 Settlement if the claim is required to be paid ` 5,00,000 What is the appropriate accounting treatment in the books of Y Ltd.? (a) Create a Provision of ` 5,50,000 (b) Make a Disclosure of a contingent liability of ` 5,50,000 (c) Create a Provision of ` 50,000 and make a disclosure of contingent liability of ` 5,00,000 (d) Create a Provision of ` 5,00,000 Theoretical Questions 5. When should provision be recognized as per provisions of AS 29? Explain in brief. Scenario based Questions 6. Sun Ltd. has entered into a sale contract of ` 5 crores with X Ltd. during 20X1-20X2 financial year. The profit on this transaction is ` 1 crore. The delivery of goods to take place during the first month of 20X2-20X3 financial year. In case of failure of Sun Ltd. to deliver within the schedule, a compensation of ` 1.5 crores is to be paid to X Ltd. Sun Ltd. planned to manufacture the goods during the last month of 20X1-20X2 financial year. As on balance sheet date (31.3.20X2), the goods were not manufactured, and it was unlikely that Sun Ltd. will be able to meet the contractual obligation. (i) Should Sun Ltd. provide for contingency as per AS 29? (ii) Should provision be measured as the excess of compensation to be paid over the profit? 7. An oil company has been contaminating land for several years. It does not clean up because there is no legislation requiring cleaning up. At 31 st March 20X1, it is virtually certain that a law requiring a clean-up of land already contaminated will be enacted shortly after the year end. Is provisioning presently necessary? 8. A Ltd. provides after sales warranty for two years to its customers. Based on past experience, the company has the following policy for making provision for warranties on the invoice amount, on the remaining balance warranty period.</li>
            <li>-- PAGE 22 ---  Less than 1 year: 2% provision More than 1 year: 3% provision The company has raised invoices as under : Invoice Date Amount ( `) 11th Feb, 20X0 60,000 25th Dec, 20X0 40,000 04th Oct, 20X1 1,35,000 Calculate the provision to be made for warranty under AS-29 as at 31st March, 20X1 and 31st March, 20X2. Also compute amount to be debited to P &amp; L account for the year ended 31st March, 20X2. ANSWERS/SOLUTIONS Answer to the Multiple Choice Questions 1. (a) 2. (b) 3. (c) 4. (c) Answer to the Theoretical Questions 5. A provision should be recognised only when: (a) An enterprise has a present obligation as a result of a past event; (b) It is probable that an outflow of resources embodying economic benefits will be required to settle the obligation; and (c) A reliable estimate can be made of the amount of the obligation. Answer to the Scenario based Questions 6. (i) AS 29 “Provisions, Contingent Liabilities and Contingent Assets” provides that when an enterprise has a present obligation, as a result of past events, that probably requires an outflow of resources and a reliable estimate can be made of the amount of obligation, a provision should be recognized. Sun Ltd. has the obligation to deliver the goods within the scheduled time as per the contract. It is probable that Sun Ltd. will fail to deliver the goods within the schedule and it is also possible to estimate the amount of compensation. Therefore, Sun Ltd. should provide for the contingency amounting ` 1.5 crores as per AS 29.</li>
            <li>-- PAGE 23 ---  (ii) Provision should not be measured as the excess of compensation to be paid over the profit. The goods were not manufactured before 31st March, 20X2 and no profit had accrued for the financial year 20X1-20X2. Therefore, provision should be made for the full amount of compensation amounting ` 1.50 crores. 7. As per para 29 of AS 29 ‘Provisions, Contingent Liabilities and Contingent Assets’, a past event will lead to present obligation when the enterprise has no realistic alternative to settle the obligation created by the past event. However, when environmental damage is caused, there may be no obligation to remedy the consequences. The causing of the damage will become an obligating event when a new law requires the existing damage to be rectified. Where details of a proposed new law have yet to be finalised, an obligation arises only when the legislation is virtually certain to be enacted. In the given case it is virtually certain that law will be enacted requiring clean-up of a land already contaminated. Therefore, an oil company has to provide for such clean-up cost in the year in which the law is virtually certain to be enacted. 8. Provision to be made for warranty under AS 29 ‘Provisions, Contingent Liabilities and Contingent Assets’ As at 31st March, 20X1 = ` 60,000 x .02 + ` 40,000 x .03 = ` 1,200 + ` 1,200 = ` 2,400 As at 31st March, 20X2 = ` 40,000 x .02 + ` 1,35,000 x .03 = ` 800 + ` 4,050 = ` 4,850 Amount debited to Profit and Loss Account for year ended 31st March, 20X2 ` Balance of provision required as on.20X2 4,850 Less: Opening Balance as on.20X1 (2,400) Amount debited to profit and loss account 2,450 Note: No provision will be made on 31st March, 20X2 in respect of sales amounting ` 60,000 made on 11th February, 20X0 as the warranty period of 2 years has already expired.</li>
          </ul>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 29**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 29, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
