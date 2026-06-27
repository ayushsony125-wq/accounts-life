'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, ChevronDown } from 'lucide-react'

export const as11Sections = [
  { id: 'as-11-intro-sec', title: '1. Introduction & Objectives' },
  { id: 'as-11-introduction', title: '3.1 INTRODUCTION' },
  { id: 'as-11-definitions-of-the-terms-used-in-the', title: '3.2 DEFINITIONS OF THE TERMS USED IN THE' },
  { id: 'as-11-initial-recognition', title: '3.3 INITIAL RECOGNITION' },
  { id: 'as-11-reporting-at-each-balance-sheet', title: '3.4 REPORTING AT EACH BALANCE SHEET' },
  { id: 'as-11-recognition-of-exchange-differences', title: '3.5 RECOGNITION OF EXCHANGE DIFFERENCES' },
  { id: 'as-11-classification-of-foreign-operations', title: '3.6 CLASSIFICATION OF FOREIGN OPERATIONS' },
  { id: 'as-11-translation-of-foreign-integral', title: '3.7 TRANSLATION OF FOREIGN INTEGRAL' },
  { id: 'as-11-translation-of-non-integral', title: '3.8 TRANSLATION OF NON-INTEGRAL' },
  { id: 'as-11-change-in-the-classification-of-a', title: '3.9 CHANGE IN THE CLASSIFICATION OF A' },
  { id: 'as-11-tax-effects-of-exchange-differences', title: '3.10 TAX EFFECTS OF EXCHANGE DIFFERENCES' },
  { id: 'as-11-forward-exchange-contract', title: '3.11 FORWARD EXCHANGE CONTRACT' },
  { id: 'as-11-disclosure', title: '3.12 DISCLOSURE' },
  { id: 'as-11-presentation-of-foreign-currency', title: '3.13 PRESENTATION OF FOREIGN CURRENCY' }
];

interface AS11StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function AS11StandardTabContent({ navigateToPdfPage }: AS11StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as-11-intro-sec');
  const tocScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(id);
    const stickyToc = document.getElementById('as-11-standard-sticky-toc');
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

      as11Sections.forEach((sec) => {
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
      <div id="as-11-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as11Sections.map(sec => (
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
        <section id="as-11-intro-sec" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-11-intro-sec" num="1" title="1. Introduction &amp; Objectives" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            UNIT 3: ACCOUNTING STANDARD 11 THE EFFECTS OF CHANGES IN FOREIGN EXCHANGE RATES After studying this unit, you will be able to comprehend the – ♦ Foreign Currency Transactions • Initial <strong>Recognition</strong> • Reporting at Subsequent Balance Sheet Dates • <strong>Recognition</strong> of Exchange Differences ♦ Net Investment in a Non-integral Foreign Operation ♦ Classification of Foreign Operations • Integral Foreign Operations • Non-integral Foreign Operations • Disposal of a Non-integral Foreign Operation • Change in the Classification of a Foreign Operation • Accounting for Forward Exchange Contracts • <strong>Disclosures</strong> <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 11**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 11, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
        <section id="as-11-introduction" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-11-introduction" num="3.1" title="INTRODUCTION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            An enterprise may carry on activities involving foreign exchange in two ways. It may have transactions in foreign currencies (e.g., export sales in denominated in USD) or it may have foreign operations (e.g., foreign branch of reporting entity outside India). At the time of preparing the financial statements, these transactions and/or operations must be reported by the entity in the reporting currency i.e., INR. Hence, such foreign currency transactions and foreign operations should be translated into the reporting currency (i.e., INR) in order to be included in the financial statements of the entity. <PdfRef page={1} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            13. 29 7 . 29 AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS The standard deals with the issues involved in accounting for foreign currency transactions and foreign operations i.e., to decide which exchange rate to use and how to recognise the financial effects of changes in exchange rates in the financial statements. Scope This Standard should be applied: (a) In accounting for transactions in foreign currencies. (b) In translating the financial statements of foreign operations. (c) This Statement also deals with accounting for foreign currency transactions in the nature of forward exchange contracts. This Standard does not: (a) Specify the currency in which an enterprise presents its financial statements. However, an enterprise normally uses the currency of the country in which it is domiciled. If it uses a different currency, the Standard requires disclosure of the reasons for using that currency. The Standard also requires disclosure of the reason for any change in the reporting currency. For example, all Indian companies are required to present their financial statements in INR. Thus, for such entities, INR is the reporting currency. Alternatively, in case an Indian company is a subsidiary of a company located in the United States, the parent may require the company to present the financial statements in USD. In such cases, the company is required to disclose the reasons for presenting the financial statements in USD (a currency other than INR, the currency of the place where the company is domiciled i.e., India). In both the cases discussed above, it may be pertinent to note that <strong>Accounting Standard</strong> 11 does not prescribe the currency to be used to present the financial statements. However, for all practical purposes (Income Tax Act, Indirect Tax Requirements etc.), every company domiciled in India will present financial statements in INR. (b) Deal with the presentation in a cash flow statement of cash flows arising from transactions in a foreign currency and the translation of cash flows of a foreign operation, which are addressed in <strong>AS 3</strong> ‘Cash flow statement’. <PdfRef page={2} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            (c) Deal with exchange differences arising from foreign currency borrowings to the extent that they are regarded as an adjustment to interest costs. (d) Deal with the restatement of an enterprise’s financial statements from its reporting currency into another currency for the convenience of users accustomed to that currency or for similar purposes. Considering the example above, the Indian subsidiary of the US Parent will present its financial statements in INR for the Indian regulators. However, since the US parent needs to consolidate the Indian subsidiary, it will require the Indian company to also restate the INR Financial Statements to USD. Such restatement is not covered under <strong>Accounting Standard</strong> 11. <PdfRef page={3} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 11**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 11, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.2 DEFINITIONS OF THE TERMS USED IN THE */}
        <section id="as-11-definitions-of-the-terms-used-in-the" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-11-definitions-of-the-terms-used-in-the" num="3.2" title="DEFINITIONS OF THE TERMS USED IN THE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            STANDARD A foreign currency transaction is a transaction which is denominated in or requires settlement in a foreign currency, including transactions arising when an enterprise either: (a) Buys or sells goods or services whose price is denominated in a foreign currency. (b) Borrows or lends funds when the amounts payable or receivable are denominated in a foreign currency. (c) Becomes a party to an unperformed forward exchange contract or (d) Otherwise acquires or disposes of assets, or incurs or settles liabilities, denominated in a foreign currency. Monetary items are money held and assets and liabilities to be received or paid in fixed or determinable amounts of money. For example, cash, receivables and payables. Non-monetary items are assets and liabilities other than monetary items. For example, fixed assets, advances for purchase of goods / fixed assets, inventories and investments in equity shares. <PdfRef page={3} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            13. 31 7 . 31 AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS Foreign operation is a subsidiary, associate, joint venture or branch of the reporting enterprise, the activities of which are based or conducted in a country other than the country of the reporting enterprise. Integral foreign operation is a foreign operation, the activities of which are an integral part of those of the reporting enterprise. A foreign operation that is integral to the operations of the reporting enterprise carries on its business as if it were an extension of the reporting enterprise&apos;s operations. Non-integral foreign operation is a foreign operation that is not an integral foreign operation. When there is a change in the exchange rate between the reporting currency and the local currency, there is little or no direct effect on the present and future cash flows from operations of either the non-integral foreign operation or the reporting enterprise. The change in the exchange rate affects the reporting enterprise&apos;s net investment in the non-integral foreign operation rather than the individual monetary and non-monetary items held by the non-integral foreign operation. ‘Net investment in a non-integral foreign operation’ is the reporting enterprise’s share in the net assets of that operation. Forward exchange contract means an agreement to exchange different currencies at a forward rate. Forward rate is the specified exchange rate for exchange of two currencies at a specified future date. ‘Foreign currency’ is a currency other than the reporting currency of an enterprise. <PdfRef page={4} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 11**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 11, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.3 INITIAL RECOGNITION */}
        <section id="as-11-initial-recognition" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-11-initial-recognition" num="3.3" title="INITIAL RECOGNITION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            A foreign currency transaction should be recorded, on initial recognition in the reporting currency, by applying to the foreign currency amount the exchange rate between the reporting currency and the foreign currency at the date of the transaction. A rate that approximates the actual rate at the date of the transaction is often used, for example, an average rate for a week or a month might be used for all transactions in each foreign currency occurring during that period. However, if exchange rates fluctuate significantly, the use of the average rate for a period is unreliable. <PdfRef page={4} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 11**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 11, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.4 REPORTING AT EACH BALANCE SHEET */}
        <section id="as-11-reporting-at-each-balance-sheet" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-11-reporting-at-each-balance-sheet" num="3.4" title="REPORTING AT EACH BALANCE SHEET" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            DATE The treatment of foreign currency items at the balance sheet date depends on whether the item is: • monetary or non-monetary; and • carried at historical cost or fair value (for non-monetary items). (a) Foreign currency monetary items should be reported using the closing rate. However, in certain circumstances, the closing rate may not reflect with reasonable accuracy the amount in reporting currency that is likely to be realised from, or required to disburse, a foreign currency monetary item at the balance sheet date, e.g., where there are restrictions on remittances or where the closing rate is unrealistic and it is not possible to effect an exchange of currencies at that rate at the balance sheet date. In such circumstances, the relevant monetary item should be reported in the reporting currency at the amount which is likely to be realised from or required to disburse, such item at the balance sheet date. (b) Non-monetary items which are carried in terms of historical cost denominated in a foreign currency should be reported using the exchange rate at the date of the transaction. (c) Non-monetary items which are carried at fair value or other similar valuation denominated in a foreign currency should be reported using the exchange rates that existed when the values were determined. (d) The contingent liability denominated in foreign currency at the balance sheet date is disclosed by using the closing rate. <PdfRef page={5} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 11**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 11, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.5 RECOGNITION OF EXCHANGE DIFFERENCES */}
        <section id="as-11-recognition-of-exchange-differences" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-11-recognition-of-exchange-differences" num="3.5" title="RECOGNITION OF EXCHANGE DIFFERENCES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Exchange differences arising on the settlement of monetary items or on reporting an enterprise’s monetary items at rates different from those at which they were initially recorded during the period, or reported in previous financial statements, should be recognised as income or as expenses in the period in which they arise. An exchange difference results when there is a change in the exchange rate <PdfRef page={5} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            13. 33 7 . 33 AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS between the transaction date and the date of settlement of any monetary items arising from a foreign currency transaction. When the transaction is settled within the same accounting period as that in which it occurred, all the exchange difference is recognised in that period. However, when the transaction is settled in a subsequent accounting period, the exchange difference recognised in each intervening period up to the period of settlement is determined by the change in exchange rates during that period. Note: Central Government in consultation with National Advisory Committee on Accounting Standards made an amendment to <strong>AS 11</strong> “The Effects of Changes in Foreign Exchange Rates” in the form of Companies (Accounting Standards) Amendment Rules, 2009 and 2011. According to the Notification, exchange differences arising on reporting of long- term foreign currency monetary items at rates different from those at which they were initially recorded during the period, or reported in previous financial statements, insofar as they relate to the acquisition of a depreciable capital asset, can be added to or deducted from the cost of the asset and should be depreciated over the balance life of the asset, and in other cases, can be accumulated in the Foreign Currency Monetary Item Translation Difference (FCMITD) Account and should be written off over the useful life of the assets (amortised over the balance period of such long term assets or liability, by recognition as income or expense in each of such periods) but not beyond 31 st March, 2020. Any difference pertaining to accounting periods which commenced on or after 7th December, 2006, previously, recognised in the profit and loss account before the exercise of the option should be reversed insofar as it relates to the acquisition of a depreciable capital asset by addition or deduction from the cost of the asset and in other cases by transfer to Foreign Currency Monetary Item Translation Difference (FCMITD) Account, and by debit or credit, as the case may be, to the general reserve. If the above option is exercised, disclosure should be made of the fact of such exercise of such option and of the amount remaining to be amortised in the financial statements of the period in which such option is exercised and in every subsequent period so long as any exchange difference remains unamortised. <PdfRef page={6} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            For the purposes of exercise of this option, an asset or liability should be designated as a long-term foreign currency monetary item, if the asset or liability is expressed in a foreign currency and has a term of 12 months or more at the date of origination of the asset or liability. Further in December, 2011, the Ministry of Corporate Affairs inserted paragraph 46A in <strong>AS 11</strong> of the Companies (Accounting Standards) Rules, 2006. According to it, in respect of accounting periods commencing on or after the 1 st April, 2011, an enterprise which had earlier exercised the option under paragraph 46 and at the option of any other enterprise, the exchange differences arising on reporting of long-term foreign currency monetary items at rates different from those at which they were initially recorded during the period, or reported in previous financial statements, in so far as they relate to the acquisition of a depreciable capital assets, can be added to or deducted from the cost of the assets and should be depreciated over the balance life of the assets , and in other cases, can be accumulated in a “Foreign Currency Monetary Item Translation Difference Account” in the enterprise’s financial statements and amortised over the balance period of such long term assets or liability, by recognition as income or expense in each of such periods. Such option is irrevocable and should be applied to all such foreign currency monetary items. The enterprise exercising such option should disclose the fact of such option and of the amount remaining to be amortised in the financial statements of the period in which such option is exercised and in every subsequent period so long as any exchange difference remains unamortised. <PdfRef page={7} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 11**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 11, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.6 CLASSIFICATION OF FOREIGN OPERATIONS */}
        <section id="as-11-classification-of-foreign-operations" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-11-classification-of-foreign-operations" num="3.6" title="CLASSIFICATION OF FOREIGN OPERATIONS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            AS INTEGRAL OR NON-INTEGRAL The method used to translate the financial statements of a foreign operation depends on the way in which it is financed and operates in relation to the reporting enterprise. For this purpose, foreign operations are classified as either ‘integral foreign operations’ or ‘non-integral foreign operations’. An integral foreign operation carries on its business as if it were an extension of the reporting enterprise’s operations. For example, such an operation might only sell goods imported from the reporting enterprise and remits the proceeds to the <PdfRef page={7} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            13. 35 7 . 35 AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS reporting enterprise. In such cases, a change in the exchange rate between the reporting currency and the currency in the country of foreign operation has an almost immediate effect on the reporting enterprise’s cash flow from operations. Therefore, the change in the exchange rate affects the individual monetary items held by the foreign operation rather than the reporting enterprise’s net investment in that operation. In contrast, a non-integral foreign operation accumulates cash and other monetary items, incurs expenses, generates income and perhaps arranges borrowings, all substantially in its local currency. It may also enter into transactions in foreign currencies, including transactions in the reporting currency. When there is a change in the exchange rate between the reporting currency and the local currency, there is little or no direct effect on the present and future cash flows from operations of either the non-integral foreign operation or the reporting enterprise. The change in the exchange rate affects the reporting enterprise’s net investment in the non-integral foreign operation rather than the individual monetary and non- monetary items held by the non-integral foreign operation. <PdfRef page={8} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 11**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 11, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.7 TRANSLATION OF FOREIGN INTEGRAL */}
        <section id="as-11-translation-of-foreign-integral" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-11-translation-of-foreign-integral" num="3.7" title="TRANSLATION OF FOREIGN INTEGRAL" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            OPERATIONS The individual items in the financial statements of the foreign operation are translated as if all its transactions had been entered into by the reporting enterprise itself. The cost and depreciation of tangible fixed assets is translated using the exchange rate at the date of purchase of the asset or, if the asset is carried at fair value or other similar valuation, using the rate that existed on the date of the valuation. The cost of inventories is translated at the exchange rates that existed when those costs were incurred. The recoverable amount or realisable value of an asset is translated using the exchange rate that existed when the recoverable amount or net realisable value was determined. For example, when the net realisable value of an item of inventory is determined in a foreign currency, that value is translated using the exchange rate at the date as at which the net realisable value is determined. The rate used is therefore usually the closing rate. <PdfRef page={8} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 11**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 11, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.8 TRANSLATION OF NON-INTEGRAL */}
        <section id="as-11-translation-of-non-integral" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-11-translation-of-non-integral" num="3.8" title="TRANSLATION OF NON-INTEGRAL" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FOREIGN OPERATIONS The translation of the financial statements of a non-integral foreign operation is done using the following procedures: (a) The assets and liabilities, both monetary and non-monetary, of the non- integral foreign operation should be translated at the closing rate; (b) Income and expense items of the non-integral foreign operation should be translated at exchange rates at the dates of the transactions; and (c) All resulting exchange differences should be accumulated in a foreign currency translation reserve until the disposal of the net investment. (d) For practical reasons, a rate that approximates the actual exchange rates, for example an average rate for the period is often used to translate income and expense items of a foreign operation. (e) Any goodwill or capital reserve arising on the acquisition of a non-integral foreign operation is translated at the closing rate. (f) A contingent liability disclosed in the financial statements of a non-integral foreign operation is translated at the closing rate for its disclosure in the financial statements of the reporting enterprise. (g) The incorporation of the financial statements of a non-integral foreign operation in those of the reporting enterprise follows normal consolidation procedures, such as the elimination of intra-group balances and intra-group transactions of a subsidiary. However, an exchange difference arising on an intra-group monetary item, whether short-term or long-term, cannot be eliminated against a corresponding amount arising on other intra-group balances because the monetary item represents a commitment to convert one currency into another and exposes the reporting enterprise to a gain or loss through currency fluctuations. (h) When the financial statements of a non-integral foreign operation are drawn up to a different reporting date from that of the reporting enterprise, the non-integral foreign operation often prepares, for purposes of incorporation in the financial statements of the reporting enterprise, statements as at the same date as the reporting enterprise (<strong>AS 21</strong> (Revised). <PdfRef page={9} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            13. 37 7 . 37 AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS (i) The translation of the financial statements of a non-integral foreign operation results in the recognition of exchange differences arising from: 1. translating income and expense items at the exchange rates at the dates of transactions and assets and liabilities at the closing rate; 2. translating the opening net investment in the non-integral foreign operation at an exchange rate different from that at which it was previously reported; and 3. other changes to equity in the non-integral foreign operation. These exchange differences are not recognised as income or expenses for the period because the changes in the exchange rates have little or no direct effect on the present and future cash flows from operations of either the non-integral foreign operation or the reporting enterprise. When a non- integral foreign operation is consolidated but is not wholly owned, accumulated exchange differences arising from translation and attributable to minority interests are allocated to, and reported as part of, the minority interest in the consolidated balance sheet. (j) On the disposal of a non-integral foreign operation, the cumulative amount of the exchange differences which have been deferred and which relate to that operation should be recognised as income or as expenses. (k) An enterprise may dispose of its interest in a non-integral foreign operation through sale, liquidation, repayment of share capital, or abandonment of all, or part of, that operation. The payment of a dividend forms part of a disposal only when it constitutes a return of the investment. Remittance from a non-integral foreign operation by way of repatriation of accumulated profits does not form part of a disposal unless it constitutes return of the investment € . In the case of a partial disposal, only the proportionate share of the related accumulated exchange differences is included in the gain or loss. A write-down of the carrying amount of a non-integral foreign operation does not constitute a partial disposal. Accordingly, no part of the deferred foreign exchange gain or loss is recognized at the time of a write- down&quot;. € MCA amended this paragraph, by notification dated 18 th June, 2018, which is relevant for companies. <PdfRef page={10} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The following are indications that a foreign operation is a non-integral foreign operation rather than an integral foreign operation: (a) While the reporting enterprise may control the foreign operation, the activities of the foreign operation are carried out with a significant degree of autonomy from those of the reporting enterprise. (b) Transactions with the reporting enterprise are not a high proportion of the foreign operation&apos;s activities. (c) The activities of the foreign operation are financed mainly from its own operations or local borrowings rather than from the reporting enterprise. (d) Costs of labour, material and other components of the foreign operation&apos;s products or services are primarily paid or settled in the local currency rather than in the reporting currency. (e) The foreign operation&apos;s sales are mainly in currencies other than the reporting currency. (f) Cash flows of the reporting enterprise are insulated from the day-to-day activities of the foreign operation rather than being directly affected by the activities of the foreign operation. (g) Sales prices for the foreign operation’s products are not primarily responsive on a short-term basis to changes in exchange rates but are determined more by local competition or local government regulation. (h) There is an active local sales market for the foreign operation’s products, although there also might be significant amounts of exports. Illustration 1 Classify the following items as monetary or non-monetary item: Inventories Trade Receivables Investment in Equity shares Property, Plant and Equipment. <PdfRef page={11} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            13. 39 7 . 39 AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS Solution Inventories Non - monetary Trade receivables Monetary Investment in equity shares Non - monetary Property, Plant and Equipment Non - monetary Illustration 2 Exchange Rate per $ Goods purchased on 1.1.20X1 for US $ 15,000 ` 75 Exchange rate on 31.3.20X1 ` 74 Date of actual payment 7.7.20X1 ` 73 You are required to ascertain the loss/gain to be recognized for financial years ended 31 st March, 20X1 and 31 st March, 20X2 as per <strong>AS 11</strong>. Solution As per <strong>AS 11</strong> on ‘The Effects of Changes in Foreign Exchange Rates’, all foreign currency transactions should be recorded by applying the exchange rate on the date of transactions. Thus, goods purchased on 1.1.20X1 and corresponding creditors would be recorded at ` 11,25,000 (i.e. $15,000 × ` 75) According to the standard, at the balance sheet date all monetary transactions should be reported using the closing rate. Thus, creditors of US $15,000 on 31.3.20X1 will be reported at ` 11,10,000 (i.e. $15,000 × ` 74) and exchange profit of ` 15,000 (i.e. 11,25,000 – 11,10,000) should be credited to Profit and Loss account in the year ended 31 st March, 20X1. On 7.7.20X1, creditors of $15,000 is paid at the rate of ` 73. As per <strong>AS 11</strong>, exchange difference on settlement of the account should also be transferred to Profit and Loss account. Therefore, ` 15,000 (i.e. 11,10,000 – 10,95,000) will be credited to Profit and Loss account in the year ended 31 st March, 20X2. <PdfRef page={12} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Illustration 3 Kalim Ltd. borrowed US$ 4,50,000 on 01/01/20X1, which will be repaid as on 31/07/20X1. Kalim Ltd. prepares financial statement ending on 31/03/20X1. Rate of exchange between reporting currency (INR) and foreign currency (USD) on different dates are as under: 01/01/20X1 1 US$ = ` 48.00 31/03/20X1 1 US$ = ` 49.00 31/07/20X1 1 US$ = ` 49.50 Solution Journal Entries in the Books of Kalim Ltd. Date Particulars ` (Dr.) ` (Cr.) 20X1 Jan. 01 Bank Account (4,50,000 x 48) Dr. 216,00,000 To Foreign Loan Account 216,00,000 March 31 Foreign <strong>Exchange Difference</strong> Account Dr. 4,50,000 To Foreign Loan Account [4,50,000 x (49-48)] 4,50,000 July 01 Foreign <strong>Exchange Difference</strong> Account Dr. [4,50,000 x (49.5-49)] 2,25,000 Foreign Loan Account Dr. 220,50,000 To Bank Account 2,22,75,000 <PdfRef page={13} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 11**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 11, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.9 CHANGE IN THE CLASSIFICATION OF A */}
        <section id="as-11-change-in-the-classification-of-a" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-11-change-in-the-classification-of-a" num="3.9" title="CHANGE IN THE CLASSIFICATION OF A" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FOREIGN OPERATION When a foreign operation that is integral to the operations of the reporting enterprise is reclassified as a non-integral foreign operation, exchange differences arising on the translation of non-monetary assets at the date of the reclassification are accumulated in a foreign currency translation reserve. <PdfRef page={13} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            13. 41 7 . 41 AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS When a non-integral foreign operation is reclassified as an integral foreign operation, the translated amounts for non-monetary items at the date of the change are treated as the historical cost for those items in the period of change and subsequent periods. Exchange differences which have been deferred are not recognised as income or expenses until the disposal of the operation. <PdfRef page={14} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 11**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 11, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.10 TAX EFFECTS OF EXCHANGE DIFFERENCES */}
        <section id="as-11-tax-effects-of-exchange-differences" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-11-tax-effects-of-exchange-differences" num="3.10" title="TAX EFFECTS OF EXCHANGE DIFFERENCES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Gains and losses on foreign currency transactions and exchange differences arising on the translation of the financial statements of foreign operations may have associated tax effects which are accounted for in accordance with <strong>AS 22</strong>. <PdfRef page={14} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 11**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 11, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.11 FORWARD EXCHANGE CONTRACT */}
        <section id="as-11-forward-exchange-contract" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-11-forward-exchange-contract" num="3.11" title="FORWARD EXCHANGE CONTRACT" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            An enterprise may enter into a forward exchange contract or another financial instrument that is in substance a forward exchange contract, which is not intended for trading or speculation purposes, to establish the amount of the reporting currency required or available at the settlement date of a transaction. The premium or discount arising at the inception of such a forward exchange contract should be amortised as expense or income over the life of the contract. Exchange differences on such a contract should be recognised in the statement of profit and loss in the reporting period in which the exchange rates change. Any profit or loss arising on cancellation or renewal of such a forward exchange contract should be recognised as income or as expense for the period. Illustration 4 Rau Ltd. purchased a plant for US$ 1,00,000 on 01 st February 20X1, payable after three months. Company entered into a forward contract for three months @ ` 49.15 per dollar. Exchange rate per dollar on 01 st Feb. was ` 48.85. How will you recognise the profit or loss on forward contract in the books of Rau Ltd.? <PdfRef page={14} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Solution Forward Rate ` 49.15 Less : Spot Rate ( ` 48.85) Premium on Contract ` 0.30 Contract Amount US$ 1,00,000 Total Loss (1,00,000 x 0.30) ` 30,000 Contract period 3 months (2 months falling in the year ended 31 st March, 20X1) Loss to be recognised (30,000/3) x 2 = ` 20,000 in the year ended 31 st March, 20X1. Rest ` 10,000 will be recognised in the following year. In recording a forward exchange contract intended for trading or speculation purposes, the premium or discount on the contract is ignored and at each balance sheet date, the value of the contract is marked to its current market value and the gain or loss on the contract is recognised. Illustration 5 Mr. A bought a forward contract for three months of US$ 1,00,000 on 1 st December at 1 US$ = ` 47.10 when exchange rate was US$ 1 = ` 47.02. On 31 st December when he closed his books exchange rate was US$ 1 = ` 47.15. On 31 st January, he decided to sell the contract at ` 47.18 per dollar. Show how the profits from contract will be recognised in the books. Solution Since the forward contract was for speculation purpose the premium on contract i.e. the difference between the spot rate and contract rate will not be recorded in the books. Only when the contract is sold the difference between the contract rate and sale rate will be recorded in the Profit &amp; Loss Account. Sale Rate ` 47.18 Less: Contract Rate ( ` 47.10) Premium on Contract ` 0.08 Contract Amount US$ 1,00,000 Total Profit (1,00,000 x 0.08) ` 8,000 <PdfRef page={15} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            13. 43 7 . 43 AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS Illustration 6 Assets and liabilities and income and expenditure items in respect of foreign branches (integral foreign operations) are translated into Indian rupees at the prevailing rate of exchange at the end of the year. The resultant exchange differences in the case of profit, is carried to other Liabilities Account and the Loss, if any, is charged to the statement of profit and loss. Comment. Solution The financial statements of an integral foreign operation (for example, dependent foreign branches) should be translated using the principles and procedures described in <strong>AS 11</strong>. The individual items in the financial statements of a foreign operation are translated as if all its transactions had been entered into by the reporting enterprise itself. Individual items in the financial statements of the foreign operation are translated at the actual rate on the date of transaction. For practical reasons, a rate that approximates the actual rate at the date of transaction is often used, for example, an average rate for a week or a month may be used for all transactions in each foreign currency during the period. The foreign currency monetary items (for example cash, receivables, payables) should be reported using the closing rate at each balance sheet date. Non-monetary items (for example, fixed assets, inventories, investments in equity shares) which are carried in terms of historical cost denominated in a foreign currency should be reported using the exchange date at the date of transaction. Thus the cost and depreciation of the tangible fixed assets is translated using the exchange rate at the date of purchase of the asset if asset is carried at cost. If the fixed asset is carried at fair value, translation should be done using the rate existed on the date of the valuation. The cost of inventories is translated at the exchange rates that existed when the cost of inventory was incurred and realizable value is translated applying exchange rate when realizable value is determined which is generally closing rate. Exchange difference arising on the translation of the financial statements of integral foreign operation should be charged to profit and loss account. Exchange difference arising on the translation of the financial statement of foreign operation may have tax effect which should be dealt as per <strong>AS 22</strong> ‘Accounting for Taxes on Income’. <PdfRef page={16} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Thus, the treatment by the management of translating all assets and liabilities; income and expenditure items in respect of foreign branches at the prevailing rate at the year end and also the treatment of resultant exchange difference is not in consonance with <strong>AS 11</strong>. Illustration 7 A business having the Head Office in Kolkata has a branch in UK. The following is the trial balance of Branch as at 31.03.20X4: Account Name Amount in £ Dr. Cr. Machinery (purchased on 01.04.20X1) 5,000 Debtors 1,600 Opening Stock 400 Goods received from Head Office Account 6,100 (Recorded in HO books as ` 4,02,000) Sales 20,000 Purchases 10,000 Wages 1,000 Salaries 1,200 Cash 3,200 Remittances to Head Office (Recorded in HO books as ` 1,91,000) 2,900 Head Office Account (Recorded in HO books as ` 4,90,000) 7,400 Creditors 4,000 • Closing stock at branch is £ 700 on 31.03.20X4. • Depreciation @ 10% p.a. is to be charged on Machinery. • Prepare the trial balance after been converted in Indian Rupees. • Exchange rates of Pounds on different dates are as follow: 01.04.20X1– ` 61; 01.04.20X3– ` 63 &amp; 31.03.20X4 – ` 67 <PdfRef page={17} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            13. 45 7 . 45 AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS Solution Trial Balance of the Foreign Branch converted into Indian Rupees as on March 31, 20X4 Particulars £ (Dr.) £ (Cr.) Conversion Basis ` (Dr.) ` (Cr.) Machinery 5,000 Transaction date rate 3,05,000 Debtors 1,600 Closing Rate 1,07,200 Opening Stock 400 Opening Rate 25,200 Goods Received from HO 6,100 Actuals 4,02,000 Sales 20,000 Average Rate 13,00,000 Purchases 10,000 Average Rate 6,50,000 Wages 1,000 Average Rate 65,000 Salaries 1,200 Average Rate 78,000 Cash 3,200 Closing Rate 2,14,400 Remittance to HO 2,900 Actuals 1,91,000 HO Account 7,400 Actuals 4,90,000 Creditors 4,000 Closing Rate 2,68,000 Exchange Rate Difference Balancing Figure 20,200 31,400 31,400 20,58,000 20,58,000 Closing Stock 700 Closing Rate 46,900 Depreciation 500 Fixed Asset Rate 30,500 <PdfRef page={18} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 11**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 11, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.12 DISCLOSURE */}
        <section id="as-11-disclosure" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-11-disclosure" num="3.12" title="DISCLOSURE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            An enterprise should disclose: (a) The amount of exchange differences included in the net profit or loss for the period. (b) Net exchange differences accumulated in foreign currency translation reserve as a separate component of shareholders’ funds, and a reconciliation of the amount of such exchange differences at the beginning and end of the period. <PdfRef page={18} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            When the reporting currency is different from the currency of the country in which the enterprise is domiciled, the reason for using a different currency should be disclosed. The reason for any change in the reporting currency should also be disclosed. When there is a change in the classification of a significant foreign operation, an enterprise should disclose: (a) The nature of the change in classification; (b) The reason for the change; (c) The impact of the change in classification on shareholders&apos; funds; and (d) The impact on net profit or loss for each prior period presented had the change in classification occurred at the beginning of the earliest period presented. <PdfRef page={19} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 11**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 11, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 3.13 PRESENTATION OF FOREIGN CURRENCY */}
        <section id="as-11-presentation-of-foreign-currency" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-11-presentation-of-foreign-currency" num="3.13" title="PRESENTATION OF FOREIGN CURRENCY" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            MONETARY ITEM TRANSLATION DIFFERENCE ACCOUNT (FCMITDA) In the format of Schedule III to the Companies Act, 2013, no line item has been specified for the presentation of “Foreign Currency Monetary Item Translation Difference Account (FCMITDA)”. Since the balance in FCMITDA represents foreign currency translation loss, it does not meet the above definition of ‘asset’ as it is neither a resource nor any future economic benefit would flow to the entity therefrom. Therefore, such balance cannot be reflected as an asset. Therefore, debit or credit balance in FCMITDA should be shown on the “Equity and Liabilities” side of the balance sheet under the head ‘Reserves and Surplus’ as a separate line item. Illustration 8 A Ltd. purchased fixed assets costing ` 3,000 lakhs on 1.1.20X1 and the same was fully financed by foreign currency loan (U.S. Dollars) payable in three annual equal instalments. Exchange rates were 1 Dollar = ` 40.00 and ` 42.50 as on 1.1.20X1 and 31.12.20X1 respectively. First instalment was paid on 31.12.20X1. The entire difference in foreign exchange has been capitalised. You are required to state, how these transactions would be accounted for. <PdfRef page={19} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            13. 47 7 . 47 AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS Solution As per <strong>AS 11</strong> ‘The Effects of Changes in Foreign Exchange Rates’, exchange differences arising on the settlement of monetary items or on reporting an enterprise’s monetary items at rates different from those at which they were initially recorded during the period, or reported in previous financial statements, should be recognised as income or expenses in the period in which they arise. Thus exchange differences arising on repayment of liabilities incurred for the purpose of acquiring fixed assets are recognised as income or expense. Calculation of <strong>Exchange Difference</strong>: 3,000 lakhs Foreign currency loan = 75 lakhs US Dollars 40 = ` ` Exchange difference = 75 lakhs US Dollars × (42.50 – 40.00) = ` 187.50 lakhs (including exchange loss on payment of first instalment) Therefore, entire loss due to exchange differences amounting ` 187.50 lakhs should be charged to profit and loss account for the year. Note: The above answer has been given on the basis that the company has not exercised the option of capitalisation available under paragraph 46 of <strong>AS 11</strong>. However, if the company opts to avail the benefit given in paragraph 46A, then nothing is required to be done since the company has done the correct treatment. Illustration 9 A Ltd. has borrowed USD 10,000 in foreign currency on April 1, 20X1 at 5% p.a. annual interest and acquired a depreciable asset. The exchange rates are as under: 01/04/20X1 1 US$ = ` 48.00 31/03/20X2 1 US$ = ` 51.00 You are required to pass the journal entries in the following cases: (i) Option under Para 46A is not availed. (ii) Option under Para 46A is availed. (iii) The loan was taken to finance the operations of the entity (and not to procure a depreciable asset). In all cases, assume interest accrued on 31 March 20X2 is paid on the same date. <PdfRef page={20} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Solution Journal Entries in the Books of A Ltd. (i) Option under Para 46A is not availed Date Particulars ` (Dr.) ` (Cr.) 20X1 Apr. 01 Bank Account (10,000 x 48) Dr. 4,80,000 To Foreign Loan Account 4,80,000 Mar 31 Finance Cost (USD 10,000 x 5% x ` 51) 25,500 To Bank Account 25,500 Mar 31 Foreign <strong>Exchange Difference</strong> Account (P/L) Dr. 30,000 To Foreign Loan Account [10,000 x (51 - 48)] 30,000 In this case, since the option under Para 46A is NOT availed, the Exchange Loss of ` 30,000 is recognised as an expense in the Statement of Profit and Loss for the year ending 31 March 20X2. (ii) Option under Para 46A is availed Date Particulars ` (Dr.) ` (Cr.) 20X1 Apr. 01 Bank Account (10,000 x 48) Dr. 4,80,000 To Foreign Loan Account 4,80,000 Mar 31 Finance Cost (USD 10,000 x 5% x ` 51) 25,500 To Bank Account 25,500 Mar 31 Foreign <strong>Exchange Difference</strong> Account Dr. 30,000 To Foreign Loan Account [10,000 x (51 - 48)] 30,000 Mar 31 Property, Plant and Equipment Dr. 30,000 To Foreign <strong>Exchange Difference</strong> Account 30,000 <PdfRef page={21} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            13. 49 7 . 49 AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS In this case, since the option under Para 46A is availed, the Exchange Loss of ` 30,000 is capitalized in the cost of Property, Plant and Equipment, which will indirectly get recognized in the Profit &amp; Loss A/c by way of increased depreciation over the remaining useful life of the asset. (iii) Option under Para 46A is availed Date Particulars ` (Dr.) ` (Cr.) 20X1 Apr. 01 Bank Account (10,000 x 48) Dr. 4,80,000 To Foreign Loan Account 4,80,000 Mar 31 Finance Cost (USD 10,000 x 5% x ` 51) 25,500 To Bank Account 25,500 Mar 31 Foreign <strong>Exchange Difference</strong> Account Dr. 30,000 To Foreign Loan Account [10,000 x (51 - 48)] 30,000 Mar 31 Foreign Currency Monetary Item Translation Difference A/c (FCMITDA) Dr. 30,000 To Foreign <strong>Exchange Difference</strong> Account 30,000 In this case, since the option under Para 46A is availed, the Exchange Loss of ` 30,000 is accumulated in the FCMITD A/c, which will be subsequently spread over and debited to P&amp;L A/c over the tenure of the loan. Reference: The students are advised to refer the full text of <strong>AS 11</strong> “ The Effects of Changes in Foreign Exchange Rates ”. <PdfRef page={22} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            TEST YOUR KNOWLEDGE Multiple Choice Questions 1. As per <strong>AS 11</strong> assets and liabilities of non-integral foreign operations should be converted at __________ rate. (a) Opening (b) Average (c) Closing (d) Transaction 2. The debit or credit balance of “Foreign Currency Monetary Item Translation Difference Account” (a) Is shown as “Miscellaneous Expenditure” in the Balance Sheet (b) Is shown under “Reserves and Surplus” as a separate line item (c) Is shown as “Other Non-current” in the Balance Sheet (d) Is shown as “Current Assets” in the Balance Sheet 3. If asset of an integral foreign operation is carried at cost, cost and depreciation of tangible fixed asset is translated at (a) Average exchange rate (b) Closing exchange rate (c) Exchange rate at the date of purchase of asset (d) Opening exchange rate 4. Which of the following can be classified as an integral foreign operation? (a) Branch office serving as an extension of the head office in terms of operations (b) Independent subsidiary of the parent company <PdfRef page={23} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            13. 51 7 . 51 AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS (c) Branch office independent of the head office in terms of operational decisions (d) None of the above 5. Which of the following items should be converted to closing rate for the purposes of financial reporting? (a) Items of Property, Plant and Equipment (b) Inventory (c) Trade Payables, Trade Receivables and Foreign Currency Borrowings (d) All of the above Theoretical Questions 6. Explain “monetary item” as per <strong>Accounting Standard</strong> 11. How are foreign currency monetary items to be recognized at each Balance Sheet date? 7. Distinguish Non-Integral Foreign Operation (NFO) with Integral Foreign Operation (IFO) as per <strong>AS 11</strong>. Scenario based Questions 8. Explain briefly the accounting treatment needed in the following cases as per <strong>AS 11</strong> as on 31.3. 20X1. Trade receivables include amount receivable from Umesh ` 5,00,000 recorded at the prevailing exchange rate on the date of sales, transaction recorded at US $ 1= ` 58.50. Long term loan taken from a U.S. Company, amounting to ` 60,00,000. It was recorded at US $ 1 = ` 55.60, taking exchange rate prevailing at the date of transaction. US $ 1 = ` 61.20 was on 31.3. 20X1. ANSWERS/SOLUTION Answer to the Multiple Choice Questions 1. (c) 2. (b) 3. (c) 4. (a) 5. (c) <PdfRef page={24} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Answer to the Theoretical Questions 6. As per <strong>AS 11</strong> ‘The Effects of Changes in Foreign Exchange Rates’ , Monetary items are money held and assets and liabilities to be received or paid in fixed or determinable amounts of money. Foreign currency monetary items should be reported using the closing rate at each balance sheet date. However, in certain circumstances, the closing rate may not reflect with reasonable accuracy the amount in reporting currency that is likely to be realized from, or required to disburse, a foreign currency monetary item at the balance sheet date. In such circumstances, the relevant monetary item should be reported in the reporting currency at the amount which is likely to be realized from or required to disburse, such item at the balance sheet date. 7. As per <strong>AS 11</strong>, Integral foreign operation (IFO) is a foreign operation, the activities of which are an integral part of those of the reporting enterprise. A foreign operation that is integral to the operations of the reporting enterprise carries on its business as if it were an extension of the reporting enterprise&apos;s operations. In contrast, a non-integral foreign operation (NFO) is a foreign operation that is not an integral operation. For details, refer para 2.5 of chapter. Answer to the Scenario based Questions 8. As per <strong>AS 11</strong> “The Effects of Changes in Foreign Exchange Rates”, exchange differences arising on the settlement of monetary items or on reporting an enterprise’s monetary items at rates different from those at which they were initially recorded during the period, or reported in previous financial statements, should be recognised as income or as expenses in the period in which they arise. However, at the option of an entity, exchange differences arising on reporting of long-term foreign currency monetary items at rates different from those at which they were initially recorded during the period, or <PdfRef page={25} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            13. 53 7 . 53 AS BASED ON ITEMS IMPACTING FINANCIAL STATEMENTS reported in previous financial statements, in so far as they relate to the acquisition of a depreciable capital asset can be added to or deducted from the cost of the asset and should be depreciated over the balance life of the asset, and in other cases, can be accumulated in a “Foreign Currency Monetary Item Translation Difference Account” in the enterprise’s financial statements and amortised over the balance period of such long-term asset/ liability, by recognition as income or expense in each of such periods. Trade receivables Foreign Currency Rate ` Initial recognition US $8,547 (5,00,000/58.50) 1 US $ = ` 58.50 5,00,000 Rate on Balance sheet date 1 US $ = ` 61.20 <strong>Exchange Difference</strong> Gain US $ 8,547 X (61.20 - 58.50) 23,077 Treatment: Credit Profit and Loss A/c by ` 23,077 Long term Loan Initial recognition US $ 1,07,913.67 (60,00,000/55.60) 1 US $ = ` 55.60 60,00,000 Rate on Balance sheet date 1 US $ = ` 61.20 <strong>Exchange Difference</strong> Loss US $ 1,07,913.67 X (61.20 – 55.60) 6,04,317 Treatment: Credit Loan A/c And Debit FCMITD A/C or Profit and Loss A/c by ` 6,04,317 Thus <strong>Exchange Difference</strong> on Long term loan amounting ` 6,04,317 may either be charged to Profit and Loss A/c or to Foreign Currency Monetary Item Translation Difference Account but exchange difference on debtors amounting ` 23,077 is required to be transferred to Profit and Loss A/c. <PdfRef page={26} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 11**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 11, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
