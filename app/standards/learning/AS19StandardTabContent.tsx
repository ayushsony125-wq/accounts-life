'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, ChevronDown } from 'lucide-react'

export const as19Sections = [
  { id: 'as-19-intro-sec', title: '1. Introduction & Objectives' },
  { id: 'as-19-introduction', title: '5.1 INTRODUCTION' },
  { id: 'as-19-applicability-of-as-19-scope-', title: '5.2 APPLICABILITY OF AS 19 [SCOPE]' },
  { id: 'as-19-definitions', title: '5.3 DEFINITIONS' },
  { id: 'as-19-types-of-leases', title: '5.4 TYPES OF LEASES' },
  { id: 'as-19-indicators-of-finance-lease', title: '5.5 INDICATORS OF FINANCE LEASE' },
  { id: 'as-19-deterministic-conditions', title: '5.6 DETERMINISTIC CONDITIONS' },
  { id: 'as-19-suggestive-conditions', title: '5.7 SUGGESTIVE CONDITIONS' },
  { id: 'as-19-accounting-for-finance-leases', title: '5.8 ACCOUNTING FOR FINANCE LEASES' },
  { id: 'as-19-accounting-for-operating-leases', title: '5.9 ACCOUNTING FOR OPERATING LEASES' },
  { id: 'as-19-sale-and-leaseback', title: '5.10 SALE AND LEASEBACK' }
];

interface AS19StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function AS19StandardTabContent({ navigateToPdfPage }: AS19StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as-19-intro-sec');
  const tocScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(id);
    const stickyToc = document.getElementById('as-19-standard-sticky-toc');
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

      as19Sections.forEach((sec) => {
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
      <div id="as-19-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as19Sections.map(sec => (
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
        <section id="as-19-intro-sec" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-19-intro-sec" num="1" title="1. Introduction &amp; Objectives" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             UNIT 5: ACCOUNTING STANDARD 19 LEASES After studying this unit, you will be able to comprehend– • What is a lease • What are the parameters for Classification of <strong>Leases</strong> • Accounting for leases in the Financial Statements of Lessees • Finance <strong>Leases</strong> • Operating <strong>Leases</strong> • Accounting for <strong>Leases</strong> in the Financial Statements of Lessors • Finance <strong>Leases</strong> • Operating <strong>Leases</strong> • Sale And Leaseback Transactions • <strong>Disclosures</strong> required as per the standard. <PdfRef page={1} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             <PdfRef page={2} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 19**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 19, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
        <section id="as-19-introduction" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-19-introduction" num="5.1" title="INTRODUCTION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Before, we start with the standard, let us lay down the coverage of <strong>AS 19</strong> from the examination point of view as under: Areas covered by <strong>AS 19</strong>: The objective of <strong>AS 19</strong> is to prescribe, for lessees and lessors, the appropriate accounting policies and disclosures in relation to finance leases and operating leases. What is a Lease? A Lease is an agreement whereby the Lessor (legal owner of an asset) conveys to the Lessee (another party) in return for a payment or series of periodic payments (Lease rents), the right to use an asset for an agreed period of time. <PdfRef page={2} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 19**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 19, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 5.2 APPLICABILITY OF AS 19 [SCOPE] */}
        <section id="as-19-applicability-of-as-19-scope-" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-19-applicability-of-as-19-scope-" num="5.2" title="APPLICABILITY OF AS 19 [SCOPE]" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The standard applies to all leases other than: (a) lease agreements to explore for or use of natural resources, such as oil, gas, timber metals and other mineral rights; and (b) licensing agreements for items such as motion picture films, video recordings, plays, manuscripts, patents and copyrights; and (c) lease agreements to use lands Special Issue - Related to Lease Accounting Sale and Lease back Transaction Accounting of a Lease (Finance and Opearting) Books of Lessee Books of Lessor What is a lease and how do we classify a lease (Finance or Operating)? Lessee&apos;s point of view Lessor&apos;s point of view <PdfRef page={2} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             <PdfRef page={3} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 19**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 19, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 5.3 DEFINITIONS */}
        <section id="as-19-definitions" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-19-definitions" num="5.3" title="DEFINITIONS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            A non-cancellable lease is a lease that is cancellable only: (a) upon the occurrence of some remote contingency; or (b) with the permission of the lessor; or (c) if the lessee enters into a new lease for the same or an equivalent asset with the same lessor; or (d) upon payment by the lessee of an additional amount such that, at inception, continuation of the lease is reasonably certain. The lease term is the non-cancellable period for which the lessee has agreed to take on lease the asset together with any further periods for which the lessee has the option to continue the lease of the asset, with or without further payment, which option at the inception of the lease it is reasonably certain that the lessee will exercise. The inception of the lease is the earlier of the date of the lease agreement and the date of a commitment by the parties to the principal provisions of the leas e. Minimum lease payments are the payments over the lease term that the lessee is, or can be required, to make excluding contingent rent, costs for services and taxes to be paid by and reimbursed to the lessor, together with: (a) in the case of the lessee, any residual value guaranteed by or on behalf of the lessee; or (b) in the case of the lessor, any residual value guaranteed to the lessor: (i) by or on behalf of the lessee; or (ii) by an independent third party financially capable of meeting this guarantee. However, if the lessee has an option to purchase the asset at a price which is expected to be sufficiently lower than the fair value at the date the option becomes exercisable that, at the inception of the lease, is reasonably certain to be exercised, the minimum lease payments comprise minimum payments payable over the lease term and the payment required to exercise this purchase option. <PdfRef page={3} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             The above definition can be summarized as under: Note: The definition can be seen separately from the point of view of Lessee and Lessor. From the point of view of Lessee Case I – Lessee will return the asset at the end of the lease term Case II – Lessee will retain the asset at the end of the lease term (as he has option to buy the asset and it is reasonably certain that he will exercise the option) Payments over the lease term that the lessee is, or can be required, to make excluding: (a) contingent rent. (b) costs for services and taxes to be paid by and reimbursed to the lessor. + Any residual value guaranteed by or on behalf of the lessee. Payments over the lease term that the lessee is, or can be required, to make excluding: (a) contingent rent. (b) costs for services and taxes to be paid by and reimbursed to the lessor. + Payment required to exercise the purchase option. From the point of view of Lessor Case I – Lessee will return the asset at the end of the lease term Payments over the lease term that the lessee is, or can be required, to make excluding: (a) contingent rent. Case II – Lessee will retain the asset at the end of the lease term (as he has option to buy the asset and it is reasonably certain that he will exercise the option) Same as Lessee given above <PdfRef page={4} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             (b) costs for services and taxes to be paid by and reimbursed to the lessor. + Any residual value guaranteed: (a) by or on behalf of the lessee; or (b) by an independent third party financially capable of meeting this guarantee. Fair value is the amount for which an asset could be exchanged or a liability settled between knowledgeable, willing parties in an arm’s length transaction. Economic life is either: (a) the period over which an asset is expected to be economically usable by one or more users; or (b) the number of production or similar units expected to be obtained from the asset by one or more users. Useful life of a leased asset is either: (a) the period over which the leased asset is expected to be used by the lessee; or (b) the number of production or similar units expected to be obtained from the use of the asset by the lessee. Note: The economic life is always greater than the useful life of the asset. Useful life represents the depreciable life of an asset whereas, economic life represents the total life during which an asset is capable of generating economic benefits. Residual value of a leased asset is the estimated fair value of the asset at the end of the lease term. Guaranteed residual value is: (a) in the case of the lessee, that part of the residual value which is guaranteed by the lessee or by a party on behalf of the lessee (the amount of the guarantee being the maximum amount that could, in any event, become payable); and <PdfRef page={5} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             (b) in the case of the lessor, that part of the residual value which is guaranteed by or on behalf of the lessee, or by an independent third party who is financially capable of discharging the obligations under the guarantee. Unguaranteed residual value of a leased asset is the amount by which the residual value of the asset exceeds its guaranteed residual value. Note: Residual value = Guaranteed Residual value (GRV) + Unguaranteed Residual value (UGRV) Gross investment in the lease is the aggregate of the minimum lease payments under a finance lease from the standpoint of the lessor and any unguaranteed residual value accruing to the lessor. In simple words, Gross Investment (GI) Undiscounted total cash inflows from the point of view of the lessor Undiscounted total of: (a) Minimum Lease Payments (MLP); and (b) Unguaranteed Residual Value (UGRV). Undiscounted total of: (a) Lease Payments; (b) Guaranteed residual value (GRV); and (c) Unguaranteed Residual value (UGRV). Undiscounted total of: (a) Lease Payments; and (b) Residual value (GRV and UGRV); Unearned finance income is the difference between: (a) the gross investment in the lease; and (b) the present value of (i) the minimum lease payments under a finance lease from the standpoint of the lessor; and (ii) any unguaranteed residual value accruing to the lessor, at the interest rate implicit in the lease. <PdfRef page={6} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Unearned Finance Income (UFI) Gross Investment (GI) – Net Investment (NI) Gross Investment (GI) – Present value of Gross Investment Gross Investment – Fair Value Simply speaking = Total Interest Net investment in the lease is the gross investment in the lease less unearned finance income. In simple words, Net Investment (NI) Discounted total cash inflows from the point of view of the lessor Discounted total of: (a) Minimum Lease Payments (MLP); and (b) Unguaranteed Residual Value (UGRV). Discounted total of: (a) Lease Payments; (b) Guaranteed residual value (GRV); and (c) Unguaranteed Residual value (UGRV). Discounted total of: (a) Lease Payments; and (b) Residual value (GRV and UGRV); Discounted Gross Investment (GI) i.e. Present value of GI Simply speaking = Fair value The interest rate implicit in the lease is the discount rate that, at the inception of the lease, causes the aggregate present value of (a) the minimum lease payments under a finance lease from the standpoint of the lessor; and (b) any unguaranteed residual value accruing to the lessor, to be equal to the fair value of the leased asset. <PdfRef page={7} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Interest rate implicit in the lease Discount rate at which: Cash Outflows = Present value of Cash Inflows Where, Cash Outflow = Fair value of the asset; Cash Inflow = Lease Payments + Residual Value (GRV and UGRV) Simply speaking = Lessor’s IRR The lessee’s incremental borrowing rate of interest is the rate of interest the lessee would have to pay on a similar lease or, if that is not determinable, the rate that, at the inception of the lease, the lessee would incur to borrow over a similar term, and with a similar security, the funds necessary to purchase the asset. Contingent rent is that portion of the lease payments that is not fixed in amount but is based on a factor other than just the passage of time (e.g., percentage of sales, amount of usage, price indices, market rates of interest). The definition of a lease includes agreements for the hire of an asset which contain a provision giving the hirer an option to acquire title to the asset upon the fulfillment of agreed conditions. These agreements are commonly known as hire purchase agreements. Hire purchase agreements include agreements under which the property in the asset is to pass to the hirer on the payment of the last instalment and the hirer has a right to terminate the agreement at any time before the property so passes. <PdfRef page={8} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 19**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 19, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 5.4 TYPES OF LEASES */}
        <section id="as-19-types-of-leases" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-19-types-of-leases" num="5.4" title="TYPES OF LEASES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            For accounting purposes, leases are classified as: (i) Finance leases; and (ii) Operating leases. Finance lease - A lease classified as Finance Lease if it transfers substantially all the risks and rewards incident to ownership of an asset. Title may or may not be eventually transferred. Operating Lease -A lease is classified as an Operating Lease if it does not transfer substantially all the risk and rewards incident to ownership. <PdfRef page={8} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Whether a lease is a finance lease or an operating lease depends on the substance of the transaction rather than its form. Risks include the possibilities of losses from idle capacity or technological obsolescence and of variations in return due to changing economic conditions. Rewards may be represented by the expectation of profitable operation over the economic life of the asset and of gain from appreciation in value or realisation of residual value. We can summarize the types of lease conceptually as under: <PdfRef page={9} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 19**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 19, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 5.5 INDICATORS OF FINANCE LEASE */}
        <section id="as-19-indicators-of-finance-lease" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-19-indicators-of-finance-lease" num="5.5" title="INDICATORS OF FINANCE LEASE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            <strong>AS 19</strong> has given a total of 8 parameters to decide whether it is a finance lease or not. (These parameters have been discussed in para and. These 8 conditions can be divided into following categories: Let us take up these conditions one by one; Type of Lease Finance Transfers the risk and reward Typically, a loan arrangement Operating Does not transfer the risk and reward Typically, a rental arrangement 8 Parameters 5 Parameters - Deterministic in nature Any 1 condition is met – It will be classified as finance lease. 3 Parameters - Suggestive in nature Even if all the conditions are met – It does not necessarily imply that it is a finance lease. <PdfRef page={9} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             <PdfRef page={10} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 19**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 19, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 5.6 DETERMINISTIC CONDITIONS */}
        <section id="as-19-deterministic-conditions" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-19-deterministic-conditions" num="5.6" title="DETERMINISTIC CONDITIONS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Situations, which would normally lead to a lease being classified as a finance lease are: (a) The lease transfers ownership of the asset to the lessee by the end of the lease term; (b) The lessee has the option to purchase the asset at a price which is expected to be sufficiently lower than the fair value at the date the option becomes exercisable such that, at the inception of the lease, it is reasonably certain that the option will be exercised; Example Mr. A has taken a car on lease for 5 years from XYZ. After 5 years of lease term Mr. A has the option to purchase this car for ` 20,000, whereas it is assumed the car market value at the end of 5th year would be ` 2,00,000. Considering the option to buy it at bargain price, it is reasonably certain that Mr. A would exercise that option. (c) The lease term is for the major part of the economic life of the asset even if title is not transferred; Example XYZ has taken a property on lease for 32 years from ABC, expected economic life of the property is 40 years. Since XYZ is going to use the asset over major part of its economic life (80% in this case), it will meet the condition to be treated as finance lease. (d) At the inception of the lease, present value of the minimum lease payments amounts to at least substantially all of the fair value of the leased asset; and (e) The leased asset is of a specialized nature such that only the lessee can use it without major modifications being made. Example PQR, a hospital ordered 10 ambulances, specially designed as per the requirement of PQR. These ambulances are taken on lease and it cannot be used by anyone else without major modifications. This would meet the condition of finance lease. <PdfRef page={10} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             <PdfRef page={11} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 19**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 19, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 5.7 SUGGESTIVE CONDITIONS */}
        <section id="as-19-suggestive-conditions" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-19-suggestive-conditions" num="5.7" title="SUGGESTIVE CONDITIONS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Additional Indicators of situations which individually or in combination could also lead to a lease being classified as a finance lease are: (a) If the lessee can cancel the lease and the lessor’s losses associated with the cancellation are borne by the lessee; (b) If gains or losses from the fluctuations in the residual value accrue to the lessee (for example if the lessor agrees to allow rent rebate equaling most of the disposal value of leased asset at the end of the lease); and (c) If the lessee can continue the lease for a secondary period at a rent, which is substantially lower than market rent. Lease classification is made at the inception of the lease. If at any time the lessee and the lessor agree to change the provisions of the lease, other than by renewing the lease, in a manner that would have resulted in a different classification of the lease had the changed terms been in effect at the inception of the lease, the revised agreement is considered as a new agreement over its revised term. Changes in estimates (for example, changes in estimates of the economic life or of the residual value of the leased asset) or changes in circumstances (for example, default by the lessee), however, do not give rise to a new classification of a lease for accounting purposes. <PdfRef page={11} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 19**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 19, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 5.8 ACCOUNTING FOR FINANCE LEASES */}
        <section id="as-19-accounting-for-finance-leases" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-19-accounting-for-finance-leases" num="5.8" title="ACCOUNTING FOR FINANCE LEASES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            (BOOKS OF LESSEE) Following is the accounting treatment of Finance <strong>Leases</strong> in the books of Lessee: (i) On the date of inception of Lease, Lessee should show it as an asset and corresponding liability at lower of: • Fair value of leased asset at the inception of the lease • Present value of minimum lease payments from the standpoint of the lessee <PdfRef page={11} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             (Present value to be calculated with discount rate equal to interest rate implicit in the lease, if this is practicable to determine; if not, the lessee’s incremental borrowing rate should be used). Thus, the journal entry at inception will be as under: Particulars Debit Credit Asset Refer Note To Lessor (Lease Liability) Refer Note It is not appropriate to present the liability for a leased asset as a deduction from the leased asset in the financial statements. The liability for a leased asset should be presented separately in the balance sheet as a current liability or a long-term liability as the case may be. Note: The amount will be lower of the two: (a) Fair value. (b) Present value of MLP (Minimum Lease payments) from the point of view of lessee. (ii) Lease payments to be apportioned between the finance charge and the reduction of the outstanding liability. (iii) Finance charges to be allocated to periods during the lease term so as to produce a constant rate of interest on the remaining balance of liability for each period. (iv) A finance lease gives rise to a depreciation expense for the asset as well as a finance expense for each accounting period. The depreciation policy for a leased asset should be consistent with that for depreciable assets which are owned, and the depreciation recognised should be calculated on the basis set out in <strong>AS 10</strong> (Revised), Property, Plant and Equipment. (v) If there is no reasonable certainty that the lessee will obtain ownership by the end of the lease term, the asset should be fully depreciated over the lease term or its useful life, whichever is shorter. <PdfRef page={12} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Note: Cases Useful life for Depreciation Case I – Asset will be retained by the lessee Useful life Case II – Asset will be returned to the lessor Useful life or lease term whichever is shorter (vi) Initial direct costs are often incurred in connection with specific leasing activities, as in negotiating and securing leasing arrangements. The costs identified as directly attributable to activities performed by the lessee for a finance lease are included as part of the amount recognised as an asset under the lease. 5.8.1 Computation of interest rate implicit on lease The interest rate implicit in the lease is the discount rate that, at the inception of the lease, causes the aggregate present value of: (a) the minimum lease payments under a finance lease from the standpoint of the lessor; and (b) any unguaranteed residual value accruing to the lessor, to be equal to the fair value of the leased asset. Discounting rate = R% p.a; Lease Rents = L1, L2 ……… Ln (Payable annually, at the end of each year) Lease period = n years; Guaranteed residual value = GR; Unguaranteed residual value = UGR Fair Value at the inception (beginning) of lease = FV PV of MLP =( ) ( ) ( ) ( )n n n 2 2 1 1 R 1 GR R 1 L R 1 L R 1 L + + + + + + + <PdfRef page={13} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Present value of unguaranteed residual value =( )n R 1 UGR + If interest rate implicit on lease is used as discounting rate: Fair Value = PV of Minimum Lease Payments + PV of unguaranteed residual value ….. (1) The interest rate implicit on lease can be computed by trial and error, provided the information required, e.g. the unguaranteed residual value can be reasonably ascertained. Example 1 Annual lease rents = ` 50,000 at the end of each year. Lease period = 5 years; Guaranteed residual value = ` 25,000 Unguaranteed residual value (UGR) = ` 15,000 Fair Value at the inception (beginning) of lease = ` 2,00,000 Interest rate implicit on lease is computed below: Interest rate implicit on lease is a discounting rate at which present value of minimum lease payments and unguaranteed residual value is ` 2 lakhs. PV of minimum lease payments and unguaranteed residual value at guessed rate 10% Year MLP + UGR DF (10%) PV ` ` 1 50,000 45,450 2 50,000 41,300 3 50,000 37,550 4 50,000 34,150 5 50,000 31,050 5 25,000 15,525 5 15,000 9,315 2,14,340 <PdfRef page={14} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             PV of minimum lease payments and unguaranteed residual value at guessed rate 14% Year MLP + UGR DF (14%) PV ` ` 1 50,000 43,850 2 50,000 38,450 3 50,000 33,750 4 50,000 29,600 5 50,000 25,950 5 25,000 12,975 5 15,000 7,785 1,92,360 Interest rate implicit on lease is computed below by interpolation: Interest rate implicit on lease =10% + ( ) 12.6% 2,00,000 2,14,340 1,92,360 2,14,340 10% 14% = −  − − Example 2 Annual lease rents = ` 50,000 at the end of each year. Lease period = 5 years; Guaranteed residual value = ` 25,000 Unguaranteed residual value (UGR) = ` 15,000 Fair Value at the inception (beginning) of lease = ` 2,00,000 Interest rate implicit on lease is =12.6% Present value of minimum lease payment is computed below: Year MLP DF (12.6%) PV ` ` 1 50,000 44,500 2 50,000 39,500 3 50,000 35,000 <PdfRef page={15} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             4 50,000 31,100 5 50,000 27,600 5 25,000 13,800 1,91,500 Present value of minimum lease payment = ` 1,91,500 Fair value of leased asset = ` 2,00,000 The accounting entry at the inception of lease to record the asset taken on finance lease in books of lessee is suggested below: ` ` Asset A/c Dr. 1,91,500 To Lessor (Lease Liability) A/c 1,91,500 (Being recognition of finance lease as asset and liability) Example 3 Using data for example 2 and assuming zero residual value, allocation of finance charge over lease period is shown below: Year Minimum Lease Payments Finance Charge (12.6%) Principal Principal due ` ` ` ` 0 -- -- -- 1,91,500 1 50,000 24,129 25,871 1,65,629 2 50,000 20,869 29,131 1,36,498 3 50,000 17,199 32,801 1,03,697 4 50,000 13,066 36,934 66,763 5 75,000 8,237  66,763 2,75,000 83,500 1,91,500  The difference between this figure and finance charge [66,763×12.6%=8412] is due to approximation in computation. <PdfRef page={16} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Accounting entries in year 1 to recognise the finance charge in books of lessee are suggested below: ` ` Finance Charge A/c Dr. 24,129 To Lessor 24,129 (Being finance charge due for the year) Lessor Dr. 50,000 To Bank A/c 50,000 (Being payment of lease rent for the year) P &amp; L A/c Dr. 24,129 To Finance Charge A/c 24,129 (Being recognition of finance charge as expense for the year) Example 4 In example 2, suppose unguaranteed residual value is not determinable and lessee’s incremental borrowing rate is 10%. Since interest rate implicit on lease is discounting rate at which present value of minimum lease payment and present value of unguaranteed residual value equals the fair value, interest rate implicit on lease cannot be determined unless unguaranteed residual value is known. If interest rate implicit on lease is not determinable, the present value of minimum lease payments should be determined using lessee’s incremental borrowing rate. Present value of minimum lease payment using lessee’s incremental borrowing rate 10% is computed below: Year MLP ` DF (10%) PV ` 1 50,000 45,450 <PdfRef page={17} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             2 50,000 41,300 3 50,000 37,550 4 50,000 34,150 5 50,000 31,050 5 25,000 15,525 2,05,025 Present value of minimum lease payment = ` 2,05,025 Fair value of leased asset = ` 2,00,000 The accounting entry at the inception of lease to record the asset taken on finance lease in books of lessee is suggested below: ` ` Asset A/c Dr. 2,00,000 To Lessor (Lease Liability) 2,00,000 (Being recognition of finance lease as asset and liability) Since the liability is recognised at fair value ` 2 lakh (total principal), we need to ascertain a discounting rate at which present value minimum lease payments equals ` 2 lakh. The discounting rate can then be used for allocation of finance charge over lease period. PV of minimum lease payments at guessed rate 12%. Year Minimum Lease Payments DF (12%) PV ` ` 1 50,000 44,650 2 50,000 39,850 3 50,000 35,600 4 50,000 31,800 5 50,000 28,350 <PdfRef page={18} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             5 25,000 14,175 1,94,425 Required discounting rate = 10%+ ( ) 10.95% 2,00,000 2,05,025 1,94,425 2,05,025 10% 12% = −  − − Allocation of finance charge over lease period is shown below: Year Minimum Lease Payments Finance Charge (10.95%) Principal Principal due ` ` ` ` 0 -- -- -- 2,00,000 1 50,000 21,900 28,100 1,71,900 2 50,000 18,823 31,177 1,40,723 3 50,000 15,409 34,591 1,06,132 4 50,000 11,621 38,379 67,753 5 75,000 7,247  67,753 2,75,000 75,000 2,00,000 Accounting entries in year 1 to recognise the finance charge in books of lessee are suggested below: ` ` Finance Charge A/c Dr. 21,900 To Lessor 21,900 (Being finance charge due for the year) Lessor Dr. 50,000 To Bank A/c 50,000 (Being payment of lease rent for the year)  The difference between this figure &amp; finance charge [67,753×10.95% = 7418] is due to approximation in computation <PdfRef page={19} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             P &amp; L A/c Dr. 21,900 To Finance Charge 21,900 (Being recognition of finance charge as expense for the year) Illustration 1 S. Square Private Limited has taken machinery on finance lease from S.K. Ltd. The information is as under: Lease term = 4 years Fair value at inception of lease = ` 20,00,000 Lease rent = ` 6,25,000 p.a. at the end of year Guaranteed residual value = ` 1,25,000 Expected residual value = ` 3,75,000 Implicit interest rate = 15% Discounted rates for 1st year, 2nd year, 3rd year and 4th year are, 0.7561, 0.6575 and respectively. Calculate the value of the lease liability as per AS-19 and disclose impact of this on Balance sheet and Profit &amp; loss account at the end of year 1 Solution According to para 11 of <strong>AS 19</strong> “<strong>Leases</strong>”, the lessee should recognise the lease as an asset and a liability at an amount equal to the lower of the fair value of the leased asset at the inception of the finance lease and the present value of the minimum lease payments from the standpoint of the lessee. In calculating the present value of the minimum lease payments the discount rate is the interest rate implicit in the lease. Present value of minimum lease payments will be calculated as follows: <PdfRef page={20} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Year Minimum Lease Payment ` Implicit interest rate (Discount rate @15%) Present value ` 1 6,25,000 5,43,500 2 6,25,000 4,72,563 3 6,25,000 4,10,937 4 7,50,000 0.5718 4,28,850 Total 26,25,000 18,55,850 Present value of minimum lease payments ` 18,55,850 is less than fair value at the inception of lease i.e. ` 20,00,000, therefore, the asset and corresponding lease liability should be recognised at ` 18,55,850 as per <strong>AS 19</strong>. 5.8.2 <strong>Disclosures</strong> made by the Lessee The lessee should, in addition to the requirements of <strong>AS 10</strong> (Revised), Property, Plant and Equipment, and the governing statute, make the following disclosures for finance leases: (a) assets acquired under finance lease as segregated from the assets owned; (b) for each class of assets, the net carrying amount at the balance sheet date; (c) a reconciliation between the total of minimum lease payments at the balance sheet date and their present value. In addition, an enterprise should disclose the total of minimum lease payments at the balance sheet date, and their present value, for each of the following periods: (i) not later than one year; (ii) later than one year and not later than five years; (iii) later than five years; (d) contingent rents recognised as expense in the statement of profit and loss for the period;  Minimum Lease Payment of 4th year includes guaranteed residual value amounting ` 1,25,000. <PdfRef page={21} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             (e) the total of future minimum sublease payments expected to be received under non-cancelable subleases at the balance sheet date; and (f) a general description of the lessee&apos;s significant leasing arrangements including, but not limited to, the following: (i) the basis on which contingent rent payments are determined; (ii) the existence and terms of renewal or purchase options and escalation clauses; and (iii) restrictions imposed by lease arrangements, such as those concerning dividends, additional debt, and further leasing. 5.8.3 Accounting for finance leases (Books of lessor) The lessor should recognise assets given under a finance lease in its balance sheet as a receivable at an amount equal to the net investment in the lease. In a finance lease, the lessor recognises the net investment in lease (which is usually equal to fair value, i.e. usual market price of the asset, as shown below) as receivable by debiting the Lessee A/c. Journal entries at inception: Particulars Debit Credit Asset Fair value To Bank Fair value (Being purchase of asset by lessor at FV) Lease Receivable Fair value = NI To Asset Fair value = NI (Being asset by lessor given at lease) Where, Gross investment in Lease (GI) = Minimum Lease Payments (MLP) + Unguaranteed Residual value (UGRV) <PdfRef page={22} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Net investment in Lease (NI) = Gross investment in Lease (GI) – Unearned Finance Income (UFI). Unearned finance income (UFI) = GI – (PV of MLP + PV of UGRV) The discounting rate for the above purpose is the rate of interest implicit in the lease. From the definition of interest rate implicit on lease: (PV of MLP + PV of UGRV) = Fair Value. The above definitions imply that: (a) Unearned Finance Income (UFI) = GI – Fair Value (b) Net Investment in Lease = GI – UFI = GI – (GI – Fair Value) = Fair Value Since the sale and receivables are recognised at net investment in lease, which is equal to fair value: Profit recognised at the inception of lease = Fair Value – Cost Total earning of lessor = GI – Cost = (GI – Fair Value) + (Fair Value – Cost) = Unearned Finance Income + (Fair Value – Cost) The above analysis does not hold where the discounting rate is not equal to interest rate implicit on lease. Such is the case, where the interest rate implicit on lease is artificially low. The discounting rate in such situations should be the commercial rate of interest (refer discussion on ‘manufacturer or dealer lessor’ below). 5.8.4 <strong>Recognition</strong> of Finance Income The unearned finance income is recognised over the lease term on a systematic and rational basis. This income allocation is based on a pattern reflecting a constant periodic return on the net investment in lease outstanding. The constant periodic return is the rate used for discounting, i.e. either the interest rate implicit on lease or the commercial rate of interest. <PdfRef page={23} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            .5 Initial Direct Costs Initial direct costs, such as commissions and legal fees, are often incurred by lessors in negotiating and arranging a lease. For finance leases, these initial direct costs are incurred to produce finance income and are either recognised immediately in the statement of profit and loss or allocated against the finance income over the lease term. 5.8.6 Review of unguaranteed residual value by lessor <strong>AS 19</strong> requires a lessor to review unguaranteed residual value used in computing the gross investment in lease regularly. In case any reduction in the estimated unguaranteed residual value is identified, the income allocation over the remaining lease term is to be revised. Also, any reduction in respect of income already accrued is to be recognised immediately. An upward adjustment of the estimated residual value is not made. Illustration 2 Prakash Limited leased a machine to Badal Limited on the following terms: ( ` In lakhs) (i) Fair value of the machine (ii) Lease term 5 years (iii) Lease rental per annum (iv) Guaranteed residual value (v) Expected residual value (vi) Internal rate of return 15% Discounted rates for 1st year to 5th year are, 0.7561, 0.6575, 0.5718, and respectively. Ascertain Unearned Finance Income. <PdfRef page={24} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Solution As per <strong>AS 19</strong> on <strong>Leases</strong>, unearned finance income is the difference between (a) the gross investment in the lease and (b) the present value of minimum lease payments under a finance lease from the standpoint of the lessor; and any unguaranteed residual value accruing to the lessor, at the interest rate implicit in the lease. Where: (a) Gross investment in the lease is the aggregate of (i) minimum lease payments from the stand point of the lessor and (ii) any unguaranteed residual value accruing to the lessor. Gross investment = Minimum lease payments + Unguaranteed residual value = [Total lease rent + Guaranteed residual value (GRV)] + Unguaranteed residual value (URV) = [(` 8,00,000  5 years) + ` 1,60,000] + ` 1,40,000 = ` 43,00,000 (a) (b) Table showing present value of (i) Minimum lease payments (MLP) and (ii) Unguaranteed residual value (URV). Year MLP inclusive of URV (`) Internal rate of return (Discount factor @ 15%) Present Value (`) 1 8,00,000 6,95,680 2 8,00,000 6,04,880 3 8,00,000 5,26,000 4 8,00,000 4,57,440 5 8,00,000 3,97,760 1,60,000 (GRV) 0.4972 79,552 41,60,000 27,61,312 (i) 1,40,000 (URV) 0.4972 69,608 (ii) 43,00,000 (i)+ (ii) 28,30,920 (b) Unearned Finance Income (a) - (b) = ` 43,00,000 – ` 28,30,920= ` 14,69,080. <PdfRef page={25} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Manufacturer or dealer lessor The manufacturer or dealer lessor should recognise the transaction of sale in the statement of profit and loss for the period, in accordance with the policy followed by the enterprise for outright sales. If artificially low rates of interest are quoted, profit on sale should be restricted to that which would apply if a commercial rate of interest were charged. Initial direct costs should be recognised as an expense in the statement of profit and loss at the inception of the lease. <strong>Disclosures</strong> The lessor should make the following disclosures for finance leases: (a) a reconciliation between the total gross investment in the lease at the balance sheet date, and the present value of minimum lease payments receivable at the balance sheet date. In addition, an enterprise should disclose the total gross investment in the lease and the present value of minimum lease payments receivable at the balance sheet date, for each of the following periods: (i) not later than one year; (ii) later than one year and not later than five years; (iii) later than five years; (b) unearned finance income; (c) the unguaranteed residual values accruing to the benefit of the lessor; (d) the accumulated provision for uncollectible minimum lease payments receivable; (e) contingent rents recognised in the statement of profit and loss for the period; (f) a general description of the significant leasing arrangements of the lessor; and (g) accounting policy adopted in respect of initial direct costs. <PdfRef page={26} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             As an indicator of growth, it is often useful to also disclose the gross investment less unearned income in new business added during the accounting period, after deducting the relevant amounts for cancelled leases. <PdfRef page={27} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 19**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 19, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 5.9 ACCOUNTING FOR OPERATING LEASES */}
        <section id="as-19-accounting-for-operating-leases" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-19-accounting-for-operating-leases" num="5.9" title="ACCOUNTING FOR OPERATING LEASES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            5.9.1 Accounting treatment in the Books of lessee Lease payments under an operating lease should be recognised as an expense in the statement of profit and loss of a lessee on a straight line basis over the lease term unless another systematic basis is more representative of the time pattern of the user’s benefit. Lease payments may be tailor made to suit the payment capacity of the lessee. For example, a lease term may provide for low initial rents and high terminal rent. Such payment patterns do not reflect the pattern of benefit derived by the lessee from the use of leased asset. To have better matching between revenue and costs, <strong>AS 19</strong> requires lessees to recognise operating lease payments as expense in the statement of profit and loss on a straight line basis over the lease term unless another systematic basis is more representative of the time pattern of the user&apos;s benefit. Example Suppose outputs from a machine taken on a 3 year operating lease are estimated as 10,000 units in year 1; 20,000 units in year 2 and 50,000 units in year 3. The agreed annual lease payments are ` 25,000, ` 45,000 and ` 50,000 respectively. The total lease payment ` 1,20,000 in this example should be recognised in proportion of output as ` 15,000 in year 1, ` 30,000 in year 2 and ` 75,000 in year 3. The difference between lease rent due and lease rent recognised can be debited / credited to Lease Equalisation A/c. The accounting entries for year 1 in books of lessee are suggested below: ` ` Lease Rent A/c Dr. 15,000 <PdfRef page={27} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Lease Equalization A/c Dr. 10,000 To Lessor 25,000 (Being lease rent for the year due) Lessor Dr. 25,000 To Bank A/c 25,000 (Being payment of lease rent for the year) P &amp; L A/c Dr. 15,000 To Lease Rent A/c 15,000 (Being recognition of lease rent as expense for the year) Since total lease rent due and recognised must be same, the Lease Equalisation A/c will close in the terminal year. Till then, the balance of Lease Equalisation A/c can be shown in the balance sheet under &quot;Current Assets&quot; or Current Liabilities&quot; depending on the nature of balance. 5.9.2 <strong>Disclosures</strong> by lessees The paragraph 25 requires lessees to make following disclosures for operating leases: (a) the total of future minimum lease payments under non-cancelable operating leases for each of the following periods: (i) not later than one year; (ii) later than one year and not later than five years; (iii) later than five years; (b) the total of future minimum sublease payments expected to be received under non-cancelable subleases at the balance sheet date; (c) lease payments recognised in the statement of profit and loss for the period, with separate amounts for minimum lease payments and contingent rents; (d) sub-lease payments received (or receivable) recognised in the statement of profit and loss for the period; <PdfRef page={28} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             (e) a general description of the lessee&apos;s significant leasing arrangements including, but not limited to, the following: (i) the basis on which contingent rent payments are determined; (ii) the existence and terms of renewal or purchase options and escalation clauses; and (iii) restrictions imposed by lease arrangements, such as those concerning dividends, additional debt, and further leasing. 5.9.3 Accounting treatment in the books of lessor (i) The lessor should present an asset given under operating lease as PPE in its balance sheets. (ii) Lease income from operating leases should be recognised in the statement of profit and loss on a straight line basis over the lease term, unless another systematic basis is more representative of the time pattern in which benefit derived from the use of the leased asset is diminished. (iii) Depreciation should be recognised in the books of lessor. The depreciation of leased assets should be on a basis consistent with the normal depreciation policy of the lessor for similar assets, and the depreciation charge should be calculated on the basis set out in <strong>AS 10</strong>. (iv) The impairment losses on assets given on operating leases are determined and treated as per <strong>AS 28</strong> We can summarize the accounting treatment for the lessor and lessee for an operating lease as under: Particulars Books of lessor Books of Lessee Asset Continues to appear in his books Asset does not appear in his books Depreciation Yes - charged Not applicable Impairment Yes - applicable Not applicable Lease rent Income recognized on SLM Expense recognized on SLM <PdfRef page={29} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Initial direct costs incurred specifically to earn revenues from an operating lease are either deferred and allocated to income over the lease term in proportion to the recognition of rent income, or are recognised as an expense in the statement of profit and loss in the period in which they are incurred. A manufacturer or dealer lessor should recognise the asset given on operating lease as PPE in their books by debiting concerned PPE A/c and crediting Cost of Production / Purchase at cost. No selling profit should be recognised on entering into operating lease, because such leases are not equivalents of sales. Suppose outputs from a machine of economic life of 6 years are estimated as 10,000 units in year 1, 20,000 units in year 2 and 30,000 units in year 3, 40,000 units in year 4, 20,000 units in year 5 and 5,000 units in year 6. The machine was given on 3-year operating lease by a dealer of the machine for equal annual lease rentals to yield 20% profit margin on cost ` 5,00,000. Straight-line depreciation in proportion of output is considered appropriate. Total lease rent = 120% of ` 5 lakhs output Total period lease during Output = ` 6 lakhs 60,000 units 1,25,000 units = ` 2.88 lakhs Annual lease rent = ` 2,88,000 / 3 = ` 96,000 Total lease rent should be recognised as income in proportion of output during lease period, i.e. in the proportion of 10 : 20 : 30. Hence income recognised in years 1, 2 and 3 are ` 48,000, ` 96,000 and ` 1,44,000 respectively. Since depreciation in proportion of output is considered appropriate, the depreciable amount ` 5 lakh should be allocated over useful life 6 years in proportion of output, i.e. in proportion of 10 : 20 : 30 : 40 : 20 : 5. Depreciation for year 1 is ` 40,000. The accounting entries for year 1 in books of lessor are suggested below: ` ` Machine given on Operating Lease Dr. 5,00,000 To Purchase 5,00,000 <PdfRef page={30} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             (Being machine given on operating lease brought into books) Lessee Dr. 96,000 To Lease Equalization A/c To Lease Rent 48,000 48,000 (Being lease rent for the year due) Bank Dr. 96,000 To Lessee 96,000 (Being receipt of lease rent for the year) Lease Rent Dr. 48,000 To P &amp; L A/c 48,000 (Being recognition of lease rent as income for the year) Depreciation Dr. 40,000 To Machine given on Operating Lease 40,000 (Being depreciation for the year) P &amp; L A/c Dr. 40,000 To Depreciation 40,000 (Being depreciation for the year transferred to P &amp; L A/c) Since total lease rent due and recognised must be same, the Lease Equalisation A/c will close in the terminal year. Till then, the balance of Lease Equalisation A/c can be shown in the balance sheet under &quot;Current Assets&quot; or Current Liabilities&quot; depending on the nature of balance. 5.9.4 <strong>Disclosures</strong> by lessors As per <strong>AS 19</strong>, the lessor should, in addition to the requirements of <strong>AS 10</strong> (Revised) and the governing statute, make the following disclosures for operating leases: (a) for each class of assets, the gross carrying amount, the accumulated depreciation and accumulated impairment losses at the balance sheet date; and <PdfRef page={31} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             (i) the depreciation recognized in the statement of profit and loss for the period; (ii) impairment losses recognized in the statement of profit and loss for the period; (iii) impairment losses reversed in the statement of profit and loss for the period; (b) the future minimum lease payments under non-cancellable operating leases in the aggregate and for each of the following periods: (i) not later than one year; (ii) later than one year and not later than five years; (iii) later than five years; (c) total contingent ren recognized as income in the statement of profit and loss for the period; (d) a general description of the lessor ’s significant leasing arrangements; and (e) accounting policy adopted in respect of initial direct costs. <PdfRef page={32} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 19**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 19, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 5.10 SALE AND LEASEBACK */}
        <section id="as-19-sale-and-leaseback" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-19-sale-and-leaseback" num="5.10" title="SALE AND LEASEBACK" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The basis of a sale and leaseback agreement is simply that one sells an asset for cash and then leases it back from the buyer. The asset subject to such sale and leaseback agreement is generally property. Under such an agreement the property owner agrees to sell the property at an agreed valuation and lease it back from the buyer. The lessee or seller receives cash immediately and makes periodic payment in form of lease rents for right to use the property. The lease payments and the sale price are generally interdependent as they are negotiated as a package. The accounting treatment of a sale and lease back depends upon the type of lease involved. Accounting treatment of profits / losses on sale of asset, as required by the standard in respect of sale and lease-back transactions, are summarised below. <PdfRef page={32} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             The accounting treatment depends upon the classification of the lease in the books of the seller-lessee. Situation I • Where sale and leaseback results in finance lease The excess or deficiency of sales proceeds over the carrying amount should be deferred and amortised over the lease term in proportion to the depreciation of the leased asset. Situation II • Where sale and leaseback results in operating lease Case 1: Sale price = Fair Value Profit or loss should be recognised immediately. Case 2: Sale Price &lt; Fair Value Profit and loss should be recognised immediately. However if the loss is compensated by future lease payments at below market price, it should be deferred and amortised in proportion to the lease payments over the period for which the asset is expected to be used. Case 3: Sale Price &gt; Fair Value The excess over fair value should be deferred and amortised over the period for which the asset is expected to be used. For operating leases, if the fair value at the time of a sale and leaseback transaction is less than the carrying amount of the asset, a loss equal to the amount of the difference between the carrying amount and fair value should be recognised immediately. For finance leases, no such adjustment is necessary unless there has been an impairment in value, in which case the carrying amount is reduced to recoverable amount in accordance with <strong>AS 28</strong>. <PdfRef page={33} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Thus it can be summarised as: Sale price at fair value Carrying amount equal to fair value Carrying amount less than fair value Carrying amount above fair value Profit No Profit Recognise profit immediately Not Applicable Loss No Loss Not Applicable Recognise loss immediately Sale price below fair value Carrying amount equal to fair value Carrying amount less than fair value Carrying amount above fair value Profit No Profit Recognise profit immediately No Profit. (Carrying amount of an asset to be written down to fair value) Loss not compensated by future lease payments at below market price Recognise loss immediately Recognise loss immediately Carrying amount of an asset to be written down to fair value Loss compensated by future lease payments at below market price Defer and amortise loss. Defer and amortise loss. Carrying amount of an asset to be written down to fair value <PdfRef page={34} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Sale price Above fair value Carrying amount equal to fair value Carrying amount less than fair value Carrying amount above fair value Profit Defer and amortise profit. 1. Difference between carrying amount and fair value to be immediately recognised. 2. Excess over fair value to be Deferred and amortised. Defer and amortise profit. (The profit would be the difference between fair value and sale price as the carrying amount would have been written down to fair value) Loss No Loss No Loss 1. Carrying amount of an asset to be written down to fair value. 2. Defer and amortise the difference of sale price and fair value. Illustration 3 A Ltd. sold machinery having WDV of ` 40 lakhs to B Ltd. for ` 50 lakhs and the same machinery was leased back by B Ltd. to A Ltd. The lease back is operating lease. Comment if – (a) Sale price of ` 50 lakhs is equal to fair value. (b) Fair value is ` 60 lakhs. (c) Fair value is ` 45 lakhs and sale price is ` 38 lakhs. (d) Fair value is ` 40 lakhs and sale price is ` 50 lakhs. (e) Fair value is ` 46 lakhs and sale price is ` 50 lakhs (f) Fair value is ` 35 lakhs and sale price is ` 39 lakhs. <PdfRef page={35} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Solution Following will be the treatment in the given cases: (a) When sales price of ` 50 lakhs is equal to fair value, A Ltd. should immediately recognise the profit of ` 10 lakhs (i.e. 50 – 40) in its books. (b) When fair value is ` 60 lakhs then also profit of ` 10 lakhs should be immediately recognised by A Ltd. (c) When fair value of leased machinery is ` 45 lakhs &amp; sales price is ` 38 lakhs, then loss of ` 2 lakhs (40 – 38) to be immediately recognised by A Ltd. in its books provided loss is not compensated by future lease payment, otherwise defer and amortise the loss. (d) When fair value is ` 40 lakhs &amp; sales price is ` 50 lakhs then, profit of ` 10 lakhs is to be deferred and amortised over the lease period. (e) When fair value is ` 46 lakhs &amp; sales price is ` 50 lakhs, profit of ` 6 lakhs (46 - 40) to be immediately recognised in its books and balance profit of ` 4 lakhs (50-46) is to be amortised/deferred over lease period. (f) When fair value is ` 35 lakhs &amp; sales price is ` 39 lakhs, then the loss of ` 5 lakhs (40-35) to be immediately recognised by A Ltd. in its books and profit of ` 4 lakhs (39-35) should be amortised/deferred over lease period. TEST YOUR KNOWLEDGE Multiple Choice Questions 1. A Ltd. sold machinery having WDV of ` 40 lakhs to B Ltd. for ` 50 lakhs (Fair value ` 50 lakhs) and same machinery was leased back by B Ltd. to A Ltd. The lease back is in nature of operating lease. The treatment will be (a) A Ltd. should amortise the profit of ` 10 lakhs over lease term. (b) A Ltd. should recognise the profit of ` 10 lakhs immediately. (c) A Ltd. should defer the profit of ` 10 lakhs. (d) B Ltd. should recognise the profit of ` 10 lakhs immediately. <PdfRef page={36} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             2. In case of an operating lease – identify which statement is correct: (a) The lessor continues to show the leased asset in its books of accounts. (b) The lessor de-recognises the asset from its Balance Sheet. (c) The lessor discontinues to claim depreciation in its books. (d) The lessee recognises the asset in its Balance Sheet. 3. In case of finance lease, if the asset is returned back to the lessor at the end of the lease term - the lessee always claims depreciation based on which of the following: (a) Useful life. (b) Lease term. (c) Useful life or lease term whichever is less. (d) Useful life or lease term whichever is higher. 4. <strong>AS 19</strong> lays down 5 deterministic conditions to classify the lease as a finance lease. To classify the lease as an operating lease – which statement is correct? (a) Any 1 condition fails. (b) Majority of the 5 conditions fail. (c) All 5 conditions fail. (d) Any 2 conditions fails. 5. The basis of classification of a lease is: (a) Control Test. (b) Risk and reward Test. (c) Both control test and risk and reward test. (d) Only reward Test <PdfRef page={37} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Theoretical Questions 6. Explain the types of lease as per <strong>AS 19</strong>. 7. Explain the accounting treatment for a sale and leaseback transaction under Operating lease. 8. What do you understand by the term “Interest rate implicit on lease”? 9. What are the disclosures requirements for operating leases by the lessee as per AS-19? Scenario based Questions 10. Classify the following into either operating or finance lease: (i) Lessee has option to purchase the asset at lower than fair value, at the end of lease term; (ii) Economic life of the asset is 7 years, lease term is 6 years, but asset is not acquired at the end of the lease term; (iii) Economic life of the asset is 6 years, lease term is 2 years, but the asset is of special nature and has been procured only for use of the lessee; (iv) Present value (PV) of Minimum lease payment (MLP) = “X”. Fair value of the asset is “Y”. 11. A machine was given on 3 years operating lease by a dealer of the machine for equal annual lease rentals to yield 30% profit margin on cost ` 1,50,000. Economic life of the machine is 5 years and output from the machine are estimated as 40,000 units, 50,000 units, 60,000 units, 80,000 units and 70,000 units consecutively for 5 years. Straight line depreciation in proportion of output is considered appropriate. Compute the following: (i) Annual Lease Rent (ii) Lease Rent income to be recognized in each operating year and (iii) Depreciation for 3 years of lease. <PdfRef page={38} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             12. Lessee Ltd. took a machine on lease from Lessor Ltd., the fair value being ` 7,00,000. The economic life of machine as well as the lease term is 3 years. At the end of each year Lessee Ltd. pays ` 3,00,000. The Lessee has guaranteed a residual value of ` 22,000 on expiry of the lease to the Lessor. However, Lessor Ltd., estimates that the residual value of the machinery will be only ` 15,000. The implicit rate of return is 15% p.a. and present value factors at 15% are, 0.756 and at the end of first, second and third years respectively. Calculate the value of machinery to be considered by Lessee Ltd. and the finance charges in each year. 13. B&amp;P Ltd. availed a lease from N&amp;L Ltd. The conditions of the lease terms are as under: (i) Lease period is 3 years, in the beginning of the year 2009, for equipment costing ` 10,00,000 and has an expected useful life of 5 years. (ii) The Fair market value is also ` 10,00,000 (iii) The property reverts back to the lessor on termination of the lease. (iv) The unguaranteed residual value is estimated at ` 1,00,000 at the end of the year 2011. (v) 3 equal annual payments are made at the end of each year. (vi) Consider IRR = 10%. The present value off ` 1 due at the end of 3rd year at 10% rate of interest is ` 0.7513. The present value of annuity of ` 1 due at the end of 3rd year at 10% IRR is ` 2.4868. State whether the lease constitute finance lease and also calculate unearned finance income. 14. X Ltd. sold machinery having WDV of ` 300 lakhs to Y Ltd. for ` 400 lakhs and the same machinery was leased back by Y Ltd. to X Ltd. The lease back arrangement is operating lease. <PdfRef page={39} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Give your comments in the following situations: (i) Sale price of ` 400 lakhs is equal to fair value. (ii) Fair value is ` 450 lakhs. (iii) Fair value is ` 350 lakhs and the sale price is ` 250 lakhs. (iv) Fair value is ` 300 lakhs and sale price is ` 400 lakhs. (v) Fair value is ` 250 lakhs and sale price is ` 290 lakhs. ANSWERS/solutions Answer to the Multiple Choice Questions 1. (b) 2. (a) 3. (c) 4. (c) 5. (b) Answer to the Theoretical Questions 6. For the purpose of accounting <strong>AS 19</strong>, classifies leases into two categories as follows: 1. Finance Lease 2. Operating Lease Finance Lease: It is a lease, which transfers substantially all the risks and rewards incidental to ownership of an asset to the lessee by the lessor but not the legal ownership. As per para 8 of the standard, in following situations, the lease transactions are called Finance lease: 1. The lessee will get the ownership of leased asset at the end of the lease term. 2. The lessee has an option to buy the leased asset at the end of the lease term at price, which is lower than its expected fair value at the date on which option will be exercised. <PdfRef page={40} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             3. The lease term covers the major part of the life of asset even if title is not transferred. 4. At the beginning of lease term, present value of minimum lease rental covers the initial fair value. 5. The asset given on lease to lessee is of specialized nature and can only be used by the lessee without major modification. Operating Lease: It is lease, which does not transfer all the risks and rewards incidental to ownership. 7. As per <strong>AS 19</strong>, where sale and leaseback results in operating lease, then the accounting treatment in different situations is as follows: Situation 1: Sale price = Fair Value Profit or loss should be recognized immediately. Situation 2: Sale Price &lt; Fair Value Profit should be recognized immediately. The loss should also be recognized immediately except that, if the loss is compensated by future lease payments at below market price, it should be deferred and amortized in proportion to the lease payments over the period for which the asset is expected to be used. Situation 3: Sale Price &gt; Fair Value The excess over fair value should be deferred and amortized over the period for which the asset is expected to be used. 8. As per para 3 of <strong>AS 19</strong> &apos;<strong>Leases</strong>&apos; the interest rate implicit in the lease is the discount rate that, at the inception of the lease, causes the aggregate present value of: (a) the minimum lease payments under a finance lease from the standpoint of the lessor; and (b) any unguaranteed residual value accruing to the lessor, to be equal to the fair value of the leased asset. <PdfRef page={41} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             9. As per <strong>AS 19</strong>, lessees are required to make following disclosures for operating leases: (a) the total of future minimum lease payments under non-cancelable operating leases for each of the following periods: (i) not later than one year; (ii) later than one year and not later than five years; (iii) later than five years; (b) the total of future minimum sublease payments expected to be received under non- cancelable subleases at the balance sheet date; (c) lease payments recognized in the statement of profit and loss for the period, with separate amounts for minimum lease payments and contingent rents; (d) sub-lease payments received (or receivable) recognized in the statement of profit and loss for the period; (e) a general description of the lessee&apos;s significant leasing arrangements including, but not limited to, the following: (i) the basis on which contingent rent payments are determined; (ii) the existence and terms of renewal or purchase options and escalation clauses; and (iii) restrictions imposed by lease arrangements, such as those concerning dividends, additional debt, and further leasing. Answer to the Scenario based Questions 10. (i) If it becomes certain at the inception of lease itself that the option will be exercised by the lessee, it is a Finance Lease. (ii) The lease will be classified as a finance lease, since a substantial portion of the life of the asset is covered by the lease term. (iii) Since the asset is procured only for the use of lessee, it is a finance lease. (iv) The lease is a finance lease if X = Y, or where X substantially equals Y. <PdfRef page={42} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             11. (i) Annual lease rent Total lease rent = 130% of ` 1,50,000 output Total period lease during Output = 130% of ` 1,50,000 x (40,000 +50,000+ 60,000)/(40,000 + 50,000 + 60,000 + 80,000 + 70,000) = 1,95,000 x 1,50,000 units/3,00,000 units = ` 97,500 Annual lease rent = ` 97,500 / 3 = ` 32,500 (ii) Lease rent Income to be recognized in each operating year Total lease rent should be recognised as income in proportion of output during lease period, i.e. in the proportion of 40 : 50 : 60. Hence income recognised in years 1, 2 and 3 will be as: Year 1 ` 26,000, Year 2 ` 32,500 and Year 3 ` 39,000. (iii) Depreciation for three years of lease Since depreciation in proportion of output is considered appropriate, the depreciable amount ` 1,50,000 should be allocated over useful life 5 years in proportion of output, i.e. in proportion of 40 : 50 : 60 : 80 : 70 . Depreciation for year 1 is ` 20,000, year 2 = 25,000 and year 3 = 30,000. 12. As per para 11 of <strong>AS 19</strong> &quot;<strong>Leases</strong>&quot;, the lessee should recognize the lease as an asset and a liability at the inception of a finance lease. Such recognition should be at an amount equal to the fair value of the leased asset at the inception of lease. However, if the fair value of the leased asset exceeds the present value of minimum lease payment from the standpoint of the lessee, the amount recorded as an asset and liability should be the present value of minimum lease payments from the standpoint of the lessee. <PdfRef page={43} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Computation of Value of machinery: Present value of minimum lease payment = ` 6,99,054 (See working note below) Fair value of leased asset = ` 7,00,000 Therefore, the recognition will be at the lower of the two i.e. 6,99,054 Working Note - Present value of minimum lease payments: Annual lease rental × PVIF+ Present value of guaranteed residual value = ` 3,00,000 × (0.869 + 0.756 + 0.657) + ` 22,000 × 0.657 = ` 6,84,600 + ` 14,454 = 6,99,054 Computation of finance charges: Year Finance charge Payment Reduction in outstanding liability Outstanding liability 1st Year beginning – – – 6,99,054 End of 1st year 1,04,858 3,00,000 1,95,142 5,03,912 End of 2nd year 75,587 3,00,000 2,24,413 2,79,499 End of 3rd year 41,925 3,00,000 2,58,075 21,424 13. Computation of annual lease payment: Particulars ` Cost of equipment 10,00,000 Unguaranteed residual value 1,00,000 Present value of unguaranteed residual value (` 1,00,000 x) 75,130 Present value of lease payments (` 10,00,000 - ` 75,130) 9,24,870 Annual lease payment [9,24,870/2.4868] 3,71,<PdfRef page={44} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             Classification of lease: Parameter 1: The present value of lease payment i.e., ` 9,24,870 which equals% of the fair market value i.e., ` 10,00,000. The present value of minimum lease payments substantially covers the fair value of the leased asset Parameter 2: The lease term (i.e. 3 years) covers the major part of the life of asset (i.e. 5 years). Therefore, it constitutes a finance lease. Computation of Unearned Finance Income: Particulars ` Total lease payments (` 3,71,911.70 x 3) 11,15,735 Add: Unguaranteed residual value 1,00,000 Gross investment in the lease 1,215,735 Less: Present value of lease payments and residual value i.e. Net Investment (` 75,130 + ` 9,24,870) (10,00,000) Unearned finance income 2,15,735 14. Accounting Treatment: S. No. Particulars Accounting Treatment (i) When sale price of ` 400 lakhs is equal to fair value X Ltd. should immediately recognize the profit of ` 100 lakhs (i.e. 400 – 300) in its books. (ii) When fair value is ` 450 lakhs Profit of ` 100 lakhs should be immediately recognized by X Ltd. <PdfRef page={45} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
             (iii) When fair value of leased machinery is ` 350 lakhs &amp; sales price is ` 250 lakhs Then loss of ` 50 lakhs (300 – 250) to be immediately recognized by X Ltd. in its books provided loss is not compensated by future lease payment. (iv) When fair value is ` 300 lakhs &amp; sales price is ` 400 lakhs Then, profit of ` 100 lakhs is to be deferred and amortized over the lease period. (v) When fair value is ` 250 lakhs &amp; sales price is ` 290 lakhs Then the loss of ` 50 lakhs (300-250) to be immediately recognized by X Ltd. in its books and profit of ` 40 lakhs (290-250) should be amortized/ deferred over lease period. <PdfRef page={46} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 19**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 19, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
