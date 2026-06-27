'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, ChevronDown } from 'lucide-react'

export const as9Sections = [
  { id: 'as-9-intro-sec', title: '1. Introduction & Objectives' },
  { id: 'as-9-introduction', title: '2.1 INTRODUCTION' },
  { id: 'as-9-definition-of-revenue', title: '2.2 DEFINITION OF REVENUE' },
  { id: 'as-9-agency-relationship', title: '2.3 AGENCY RELATIONSHIP' },
  { id: 'as-9-sale-of-goods', title: '2.4 SALE OF GOODS' },
  { id: 'as-9-timing-of-recognition-of-revenue', title: '2.5 TIMING OF RECOGNITION OF REVENUE' },
  { id: 'as-9-rendering-of-services', title: '2.6 RENDERING OF SERVICES' },
  { id: 'as-9-income-from-other-sources-interest-', title: '2.7 INCOME FROM OTHER SOURCES - INTEREST,' },
  { id: 'as-9-conditions-for-sale-of-goods', title: '2.8 CONDITIONS FOR SALE OF GOODS' },
  { id: 'as-9-effect-of-uncertainties-on-revenue', title: '2.9 EFFECT OF UNCERTAINTIES ON REVENUE' },
  { id: 'as-9-disclosure', title: '2.10 DISCLOSURE' }
];

interface AS9StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function AS9StandardTabContent({ navigateToPdfPage }: AS9StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as-9-intro-sec');
  const tocScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(id);
    const stickyToc = document.getElementById('as-9-standard-sticky-toc');
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

      as9Sections.forEach((sec) => {
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
      <div id="as-9-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as9Sections.map(sec => (
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
        <section id="as-9-intro-sec" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-9-intro-sec" num="1" title="1. Introduction &amp; Objectives" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            UNIT 2: ACCOUNTING STANDARD 9 REVENUE RECOGNITION After studying this unit, you will be able to comprehend the provisions of <strong>AS 9</strong> related with– • <strong>Recognition</strong> of revenue in case of: ▪ Sale of Goods ▪ Rendering of Services ▪ The Use by Others of Enterprise Resources Yielding Interest, Royalties and Dividends • Effect of Uncertainties on Revenue <strong>Recognition</strong> • Required <strong>Disclosures</strong>. <PdfRef page={1} />
          </p>
          
        </section>

        {/* Section: 2.1 INTRODUCTION */}
        <section id="as-9-introduction" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-9-introduction" num="2.1" title="INTRODUCTION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Revenue (also called as Top Line), or Sales is the backbone for any business. A higher revenue would normally reflect an increase in market share, higher prospects, and eventually an increased value of the business. You would notice that many start-up entities are more focused to increase their market penetration and revenue without initially focusing on the profitability. As a result, it is critical to have a standard that addresses how entities must recognised the revenue, with respect to the amount and timing in a particular accounting period. <strong>AS 9</strong> deals with the bases for recognition of revenue in the statement of profit and loss of an enterprise. <strong>AS 9</strong> is mandatory for all enterprises. The Standard is <PdfRef page={1} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.35 concerned with the recognition of revenue arising in the course of the ordinary activities of the enterprise from • the sale of goods • the rendering of services • the use by others of enterprise resources yielding interest, royalties and dividends <strong>AS 9</strong> does not deal with the following aspects of revenue recognition to which special considerations apply: i. Revenue arising from construction contracts; ii. Revenue arising from hire-purchase, lease agreements; iii. Revenue arising from government grants and other similar subsidies; iv. Revenue of insurance companies arising from insurance contracts. Examples of items not included within the definition of “revenue” for the purpose of <strong>AS 9</strong> are: i. Realized gains resulting from the disposal of, and unrealized gains resulting from the holding of, non-current assets, e.g., appreciation in the value of fixed assets; ii. Unrealized holding gains resulting from the change in value of current assets, and the natural increases in herds and agricultural and forest products; iii. Realized or unrealized gains resulting from changes in foreign exchange rates and adjustments arising on the translation of foreign currency financial statements; iv. Realized gains resulting from the discharge of an obligation at less than its carrying amount; v Unrealized gains resulting from the restatement of the carrying amount of an obligation. <PdfRef page={2} />
          </p>
          
        </section>

        {/* Section: 2.2 DEFINITION OF REVENUE */}
        <section id="as-9-definition-of-revenue" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-9-definition-of-revenue" num="2.2" title="DEFINITION OF REVENUE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Revenue is the gross inflow of cash, receivables or other consideration arising in the course of the ordinary activities of an enterprise from the sale of goods, from the rendering of services, and from the use by others of enterprise resources yielding interest, royalties and dividends. Example 1 Entity XY sells a machine being used at its factory at a price of ` 2 lakh. The carrying value of the machine is ` 1.80 lakh. The sale of the machine does not increase the revenue of XY but is an example of a capital receipt since transaction does not take place in the normal course of business. Such gain on sale of ` 20,000 ( ` 2 lakhs – ` 1.80 lakhs) is recognised as a part of profit &amp; loss statement under Gain/(Loss) on disposal of asset. Example 2 ST Ltd is a real-estate developer and builder. It is into the business of buying and selling properties. In 20X1, ST Ltd purchased a unit of land for ₹ 150 crore. It sold off that land after few months at a price of ₹ 240 crore. In the above case, the sale of land is a transaction that happens in the ordinary course of business (as he is a real estate developer and builder – properties will be an item of inventory in the financial statements) for ST Ltd. Hence, it should recognise a revenue of ₹ 240 crore when the land is sold. Revenue is the gross inflow of cash, receivables or other consideration arising from Sale of goods Rendering of services Use by others of enterprise resources yielding Interest, royalties and dividends <PdfRef page={3} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.37 Example 3 DL Ltd, a pharma company, has been conducting research on new medicine since last 2 years to increase the immunity levels of the people consuming it without any side effects. During the current year, it decides to sell the outcome of the research undertaken so far to another competitor, GH Ltd for ` 50 crore. DL has already incurred ` 30 crore on the ongoing research. In the above example, the sale of the research findings does not represent an increase in revenue. This is because DL Ltd’s business is not to sell these research findings in the ordinary course of business. The amount of ₹ 50 crore will be a part of Other Income in the profit &amp; loss statement. <PdfRef page={4} />
          </p>
          
        </section>

        {/* Section: 2.3 AGENCY RELATIONSHIP */}
        <section id="as-9-agency-relationship" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-9-agency-relationship" num="2.3" title="AGENCY RELATIONSHIP" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            In an agency relationship, the revenue is the amount of commission and not the gross inflow of cash, receivables or other consideration. The criteria of principal-agency relationship is significant to understand how much revenue can be recognised by an entity for a sale transaction. The key principle is whether the sale transaction is made by an entity on its own, or on behalf of someone else. Whether the risks and rewards pertaining to the goods or services are with the entity or with someone else, would determine the seller’s capacity as principal or agency (agent). When another party is involved in providing goods or services to a customer, the entity shall determine whether it has an obligation to sell or provide the specified goods or services itself (i.e., the entity is a principal) or to arrange for those goods or services to be sold or provided by the other party (i.e., the entity is an agent). Illustration 1 Zigato runs a food-delivery business. As per the arrangement, Zigato allows customers to order food from local restaurants and is responsible the delivery of the food within stipulated time. During a particular year, it collects the money on orders made online as under: <PdfRef page={4} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Total price for the food item - ` 200 lakhs Delivery charges - ` 60 lakhs GST - ` 40 lakhs Total - ` 300 lakhs Zigato has received ` 300 lakhs for the above orders from customers and the orders were delivered to the customer in stipulated time. How much revenue should be recognised by restaurants and how much revenue should be recognised by Zigato for the year? Solution The risks and rewards associated with the food item are not with Zigato. When a customer has ordered a food item, whether the item will be prepared or not is the responsibility of the restaurant and not Zigato. Similarly, the responsibility to deliver the food item is with Zigato and the restaurant does not undertake responsibility for the same. Therefore, the restaurant undertakes the principal’s responsibility to prepare the food and ensure its quality. Zigato, on the other hand, is only responsible to deliver the food. Thus, Zigato is acting as an agent. Hence, it can only recognize revenue relating to that activity (which it does in the ordinary course of business). The revenue for Zigato, therefore, is ` 60 lakhs, whereas, the revenue for restaurants will be ` 200 lakhs. It may be noted that the GST of ` 40 lakhs is a liability payable to the Government (third party), hence it does not form part of revenue. Example 4 Trip Deal is a website that allows people to book airlines tickets. As a part of the business, it agrees to buys 100 tickets from an airline on a particular date and resells those tickets to customers. However, Trip Deal bears the loss for any unsold tickets. In the above example, the risks and rewards relating to tickets are borne by Trip Deal. Hence, sales made for the tickets will be fully recognized as part of its revenue. Any unsold tickets will be charged as loss by the entity. <PdfRef page={5} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.39 <PdfRef page={6} />
          </p>
          
        </section>

        {/* Section: 2.4 SALE OF GOODS */}
        <section id="as-9-sale-of-goods" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-9-sale-of-goods" num="2.4" title="SALE OF GOODS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Revenue from sales transactions should be recognised when the requirements as to performance set out in below in para ‘Timing of <strong>Recognition</strong> of Revenue from Sale of Goods’ are satisfied, provided that at the time of performance it is not unreasonable to expect ultimate collection. If at the time of raising of any claim it is unreasonable to expect ultimate collection, revenue recognition should be postponed. Illustration 2 AB sells goods to CD on 1st March 20X1. CD is having significant cash flows issues since last few months. However, it is trying to raise funding through bank loan to be able to run its operations in future. On 5th of May 20X1, CD is able to seek the funding and is expected to be able to pay for the goods in future. At the time of sale, it is difficult for AB to ascertain whether it will be able to collect the amount from CD due to poor financial conditions. Explain how the recognition of revenue be done by AB? Solution In the above case, AB should not recognise any revenue on 1st of March and until that uncertainty of recovery is clear. Hence, the revenue can only be recognised by AB on 5th of May 20X1. The inventory transferred to CD until that date is required to be shown as its own inventory [inventory lying with customers]. <PdfRef page={6} />
          </p>
          
        </section>

        {/* Section: 2.5 TIMING OF RECOGNITION OF REVENUE */}
        <section id="as-9-timing-of-recognition-of-revenue" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-9-timing-of-recognition-of-revenue" num="2.5" title="TIMING OF RECOGNITION OF REVENUE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FROM SALE OF GOODS In a transaction involving the sale of goods, performance should be regarded as being achieved when the following conditions have been fulfilled: (i) the seller of goods has transferred to the buyer the property in the goods for a price or (ii) all significant risks and rewards of ownership have been transferred to the buyer and the seller retains no effective control of the goods transferred to a degree usually associated with ownership; and <PdfRef page={6} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            (iii) no significant uncertainty exists regarding the amount of the consideration that will be derived from the sale of the goods. Note: The transfer of property in goods, in most cases, results in or coincides with the transfer of significant risks and rewards of ownership to the buyer. However, there may be situations where transfer of property in goods does not coincide with the transfer of significant risks and rewards of ownership. Revenue in such situations is recognised at the time of transfer of significant risks and rewards of ownership to the buyer. Such cases may arise where delivery has been delayed through the fault of either the buyer or the seller and the goods are at the risk of the party at fault as regards any loss which might not have occurred but for such fault. Further, sometimes the parties may agree that the risk will pass at a time different from the time when ownership passes Illustration 3 AB sells goods to CD on 1st January 20X1 for ` 2 lakhs. After the sale was made, CD is having significant cash flows issues. It is trying to raise funding through bank loan to be able to run its operations in future. However, it is unable to do so and has gone under liquidation on 15th of March 20 X1. At the time of sale, there was no reason for AB to believe that it will not be able to collect the amount from CD in future. Explain how the recognition of revenue be done by AB for the year ended 31st March 20X1? Solution In the above case, at the time of sale, it was not unreasonable for AB to expect ultimate collection from CD. Therefore, AB should recognise the revenue of ` 2 lakhs on 1st of January 20X1 and recognise a receivable for the same amount. Later, since CD went into liquidation, AB should write off the receivables and book a loss in his books. <PdfRef page={7} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.41 Accounting in the books of AB 1st January 20X1 CD A/c (Receivables) Dr. ` 2 lakhs To Revenue A/c (Being goods sold to CD Ltd) ` 2 lakhs 15th March 20X1 Bad Debts A/c Dr. ` 2 lakhs To CD A/c (Receivables)A/c (Being receivables from CD written off due to its liquidation) ` 2 lakhs <PdfRef page={8} />
          </p>
          
        </section>

        {/* Section: 2.6 RENDERING OF SERVICES */}
        <section id="as-9-rendering-of-services" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-9-rendering-of-services" num="2.6" title="RENDERING OF SERVICES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Revenue from service transactions is usually recognised as the service is performed. There are two methods of recognition of revenue from service transaction, viz, Proportionate Completion Method is a method of accounting which recognises revenue in the statement of profit and loss proportionately with the degree of completion of services under a contract. Here performance consists of the execution of more than one act. Revenue is recognised proportionately by reference to the performance of each act. Completed Service Contract Method is a method of accounting which recognises revenue in the statement of profit and loss only when the rendering of Methods of recognition of revenue Proportionate completion method Completed service contract method <PdfRef page={8} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            services under a contract is completed or substantially completed. In this method performance consists of the execution of a single act e.g., installation of a machine, or repair service, Alternatively, services are performed in more than a single act, and the services yet to be performed are so significant in relation to the transaction taken that performance cannot be deemed to have been completed until the execution of those acts. The completed service contract method is relevant to these patterns of performance and accordingly revenue is recognised when the sole or final act takes place and the service becomes chargeable. Revenue from sales or service transactions should be recognised when the service is performed provided that at the time of performance it is not unreasonable to expect ultimate collection. If at the time of raising of any claim it is unreasonable to expect ultimate collection, revenue recognition should be postponed. <PdfRef page={9} />
          </p>
          
        </section>

        {/* Section: 2.7 INCOME FROM OTHER SOURCES - INTEREST, */}
        <section id="as-9-income-from-other-sources-interest-" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-9-income-from-other-sources-interest-" num="2.7" title="INCOME FROM OTHER SOURCES - INTEREST," />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ROYALTIES AND DIVIDENDS Use by others of such enterprise resources gives rise to: i. Interest: charges for the use of cash resources or amounts due to the enterprise. Revenue is recognized on a time proportion basis taking into account the amount outstanding and the rate applicable. ii. Royalties: charges for the use of such assets as know-how, patents, trade marks and copyrights. Revenue is recognized on an accrual basis in accordance with the terms of the relevant agreement. iii. Dividends: rewards from the holding of investments in shares. Revenue is recognized when the owner’s right to receive payment is established. Revenue arising from the use by others of enterprise resources yielding interest, royalties and dividends should only be recognized when no significant uncertainty as to measurability or collectability exists. <PdfRef page={9} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.43 Illustration 4 During the year ended 31st March 20X1, ZX Enterprises has recognized ` 100 lakhs on accrual basis income from dividend on units of mutual funds held by it. The dividends on mutual funds were declared on 15th June, 20X1. The dividend was proposed on 10th April, 20X1. Whether the above treatment is as per the relevant <strong>Accounting Standard</strong>? Solution Dividends from investments in shares are not recognized in the statement of profit and loss until a right to receive payment is established. In the given situation, the dividend is proposed on 10th April, 20X1, while it is declared on 15th June, 20X1. Thus, the right to receive the payment of dividend gets established on 15th June, 20X1. The recognition of ` 100 lakhs on accrual basis in the financial year 20X0-20X1 is not correct as per <strong>AS 9</strong> &apos;Revenue <strong>Recognition</strong>&apos;. Illustration 5 Y Ltd., used certain resources of X Ltd. In return X Ltd. received ₹ 10 lakhs and ₹ 15 lakhs as interest and royalties respective from Y Ltd. during the year 20 X1-X2. You are required to state whether and on what basis these revenues can be recognized by X Ltd. Solution As per <strong>AS 9</strong> on Revenue <strong>Recognition</strong>, revenue arising from the use by others of enterprise resources yielding interest and royalties should only be recognized when no significant uncertainty as to measurability or collectability exists. These revenues are recognized on the following bases: (i) Interest: on a time proportion basis taking into account the amount outstanding and the rate applicable. Therefore X Ltd. should recognize interest revenue of ₹ 10 Lakhs (ii) Royalties: on an accrual basis in accordance with the terms of the relevant agreement. X Ltd. therefore should recognize royalty revenue of ₹ 15 Lakhs. <PdfRef page={10} />
          </p>
          
        </section>

        {/* Section: 2.8 CONDITIONS FOR SALE OF GOODS */}
        <section id="as-9-conditions-for-sale-of-goods" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-9-conditions-for-sale-of-goods" num="2.8" title="CONDITIONS FOR SALE OF GOODS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            1. Delivery is delayed at buyer’s request and buyer takes title and accepts billing Sometimes, the buyer may purchase goods and requests the seller to hold the goods on his behalf for some reason, for example, due to lack of storage or transportation delays. In such cases, the risks and rewards associated with the ownership seem to have been transferred to the buyer and the sale should be considered as complete. This is true even if the physical possession of the goods is with the seller. The conditions to be met to account for the sale are: - the goods must be specifically identified, and cannot be transferred to another customer; - the delivery is delayed at buyer’s request; and - the goods are ready to be delivered to the buyer Example 5 XY Ltd sells goods worth ` 50 lakh on 20 February 20X1 to AB Ltd. AB Ltd is facing storage capacity constraints at their warehouse. AB Ltd instructs XY Ltd to hold the goods at XY Ltd’s warehouse and arrange for delivery on 15 March 20X1. However, all the risks and rewards associated with the sold goods are deemed transferred to AB Ltd. In the current scenario, delivery of goods sold is delayed at the request of buyer. XY Ltd can recognize revenue for sale of goods to AB Ltd on 20 February 20X1 provided that the goods sold to AB Ltd are held in XY Ltd’s warehouse separately and are not clubbed with other inventory. 2. Sale on approval basis Revenue should not be recognized until the goods have been formally accepted by the buyer or the buyer has done an act adopting the transaction or the time period for rejection has elapsed or where no time has been fixed, a reasonable time has elapsed. <PdfRef page={11} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.45 Example 6 M/s XY sells goods worth ` 5 lakh on 30th of March 20X1 to M/s FT under Sale on approval basis. Under the arrangement, FT can return the goods back to XY within next 3 months. XY cannot reasonably determine whether FT will give the acceptance of goods before the expiry of 3 months. Under these circumstances, XY cannot recognize revenue until the goods are accepted by FT or on completion of 3 months, whichever is earlier. 3. Goods sold subject to inspection / installation In case the installation is complex and is significant to be able to use the goods in the intended manner, revenue should not be recognized until the installation is satisfactorily completed. However, in case the installation is simple (for example, a refrigerator needs to be plugged to a power connection after delivery to customer’s place), revenue is recognized when the customer has agreed to purchase the goods. 4. Sale and repurchase arrangement Such arrangements are considered to be financing arrangement, and no sale can be recognized. Instead, a borrowing should be recognized in the books of the seller. Example 7 On 1st January 20X1, M/s KJ sells goods at invoice value of ₹ 5 lakhs to M/s TH. At the time of sale, M/s KJ has agreed to repurchase these goods back from M/s TH on 31st March at a price of ` 6 Lac. You are required to do the accounting for above transactions in the books of M/s KJ. Solution 1st Jan 20X1: Bank A/c Dr. `5 lakhs To Loan from M/s TH A/c `5 lakhs (Being borrowing made under the Sale &amp; Repurchase arrangement) <PdfRef page={12} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            31st March 20X1 Interest expense A/c Dr. `1 lakhs To Loan from M/s TH A/c `1 lakhs (Being interest cost recognised on the borrowing) 31st March 20X1: Loan from M/s TH A/c Dr. `6 lakhs To Bank A/c `6 lakhs (Being repayment of loan taken from TH) 5. Trade discounts and volume rebates Trade discounts and volume rebates received are not encompassed within the definition of revenue, since they represent a reduction of cost. Trade discounts and volume rebates given should be deducted in determining revenue. 6. Cash discounts Definition of revenue under <strong>AS 9</strong> represents the gross inflow of cash from sale of goods or provision of services. Any cash discount given should not be deducted in determining the revenue. Revenue is therefore recognized at gross amount and cash discount is recorded as an expense as an when the seller receives the payment net of discount. 7. Consignment Sale Consignment sales is a sale where a delivery is made whereby the recipient undertakes to sell the goods on behalf of the consignor. In such case revenue should not be recognized until the goods are sold to a third party Example 8 In the year 20X1-X2, XYZ supplied goods on Consignment basis to ABC – a retail outlet worth ` 10,00,000. As per the terms, ABC will only pay XYZ for the goods which are sold by them to the third party. Rest of the goods can be returned back to XYZ and ABC will not have any further liability for these goods. <PdfRef page={13} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.47 During the year 20X1-X2, ABC has sold goods worth ` 5,50,000 only and rest of the goods are still lying in its store which may get sold by next year. Advise XYZ, how much revenue it can recognize in its books for period 20X1-X2. Solution As per <strong>AS 9</strong>, consignment risk and rewards are not transferred to the customer on just delivery of the goods and no revenue should be recognized until the goods are sold to a third party. Therefore, XYZ can recognize revenue of ` 5,50,000 only. <PdfRef page={14} />
          </p>
          
        </section>

        {/* Section: 2.9 EFFECT OF UNCERTAINTIES ON REVENUE */}
        <section id="as-9-effect-of-uncertainties-on-revenue" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-9-effect-of-uncertainties-on-revenue" num="2.9" title="EFFECT OF UNCERTAINTIES ON REVENUE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            RECOGNITION Where the ability to assess the ultimate collection with reasonable certainty is lacking at the time of raising any claim, revenue recognition is postponed to the extent of uncertainty involved. When the uncertainty relating to collectability arises subsequent to the time of sale or the rendering of the service, it is more appropriate to make a separate provision to reflect the uncertainty rather than to adjust the amount of revenue originally recorded. An essential criterion for the recognition of revenue is that the consideration receivable for the sale of goods, the rendering of services or from the use by others of enterprise resources is reasonably determinable. When such consideration is not determinable within reasonable limits, the recognition of revenue is postponed. <PdfRef page={14} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>Provided there exists no significant uncertainty regarding the ultimate collection of consideration (A key criterion for determining when to recognise revenue from a transaction involving the sale of goods is that the seller has transferred the property in the goods to the buyer for a consideration and there exists no significant uncertainty regarding the ultimate collection of consideration).</li>
          </ul>
          
        </section>

        {/* Section: 2.10 DISCLOSURE */}
        <section id="as-9-disclosure" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-9-disclosure" num="2.10" title="DISCLOSURE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            In addition to the disclosures required by <strong>AS 1</strong> on ‘Disclosure of Accounting Policies’, an enterprise should disclose the circumstances in which revenue recognition has been postponed pending the resolution of significant uncertainties. Illustration 6 The Board of Directors decided on.20X2 to increase the sale price of certain items retrospectively from 1st January, 20X2. In view of this price revision with effect from 1st January 20X2, the company has to receive ` 15 lakhs from its customers in respect of sales made from 1st January, 20X2 to 31st March, 20X2. Revenue <strong>Recognition</strong> *Sale of Goods when seller has transferred the property to the buyer for consideration transfer of significant risk &amp; rewards to the buyer *Rendering of Services proportionate completion method performance consists of execution of more than one act practically revenue is recognised on SLM basis Complete d service method generally performance consists of execution of a single act revenue is recognised when the final act is completed &amp; services are chargeable *Use by others of Enterprise Resources Interest Revenue is recognised the time basis Royalties Revenue is recognised on the basis of the terms of agreement Dividends Revenue is recognised when right to receive the payment is established <PdfRef page={15} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.49 Accountant cannot make up his mind whether to include ` 15 lakhs in the sales for 20X1-20X2.Advise. Solution Price revision was effected during the current accounting period 20X1-20X2. As a result, the company stands to receive ` 15 lakhs from its customers in respect of sales made from 1st January, 20X2 to 31st March, 20X2. If the company is able to assess the ultimate collection with reasonable certainty, only then additional revenue arising out of the said price revision may be recognized in 20X1-20X2. If the company is not reasonably certain on ultimate collection ` 15 lakhs from its customers in respect of sales made from 1st January, 20X2 to 31st March, 20X2, it shall postpone recognition of revenue and disclose it in financial statements for year 20X1-20X2 as per <strong>AS 1</strong> Illustration 7 A claim lodged with the Railways in March, 20X1 for loss of goods of ` 2,00,000 had been passed for payment in March, 20X3 for ` 1,50,000. No entry was passed in the books of the Company, when the claim was lodged. Advise P Co. Ltd. about the treatment of the following in the Final Statement of Accounts for the year ended 31st March, 20X3. Solution <strong>AS 9</strong> on ‘Revenue <strong>Recognition</strong>’ states that where the ability to assess the ultimate collection with reasonable certainty is lacking at the time of raising any claim, revenue recognition is postponed to the extent of uncertainty involved. When recognition of revenue is postponed due to the effect of uncertainties, it is considered as revenue of the period in which it is certain to be collected. In this case it may be assumed that collectability of claim was not certain in the earlier periods. This is supposed from the fact that only ` 1,50,000 were collected against a claim of ` 2,00,000. So this transaction can not be taken as a Prior Period Item. Hence receipt of ` 1,50,000 shall be recognized as revenue in year ended 31st March, 20X3 In the light of <strong>AS 5</strong>, it will not be treated as extraordinary item. However, <strong>AS 5</strong> states that when items of income and expense within profit or loss from ordinary activities are of such size, nature, or incidence that their disclosure is relevant to explain the performance of the enterprise for the period, the nature and amount of such items should be disclosed separately. Accordingly, the nature and amount of this item should be disclosed separately. <PdfRef page={16} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            TEST YOUR KNOWLEDGE Multiple Choice Questions 1. Which of the conditions mentioned below must be met to recognize revenue from the sale of goods? (i) the entity selling does not retain any continuing influence or control over the goods; (ii) when the goods are dispatched to the buyer; (iii) revenue can be measured reliably; (iv) the supplier is paid for the goods; (v) it is reasonably certain that the buyer will pay for the goods; (vi) the buyer has paid for the goods. (a) (i), (ii) and (v) (b) (ii), (iii) and (iv) (c) (i), (iii) and (v) (d) (i), (iv) and (v) 2. Consignment inventory is an arrangement whereby inventory is held by one party but owned by another party. Which of the following indicates that the inventory in question is a consignment inventory? (a) Manufacturer cannot require the dealer to return the inventory (b) Dealer has the right to return the inventory (c) Manufacture is responsible for the pricing of goods and any changes in the pricing can only be approved by the manufacturer . (d) Manufacture is responsible for the holding the goods and any changes in the pricing can only be approved by the dealer 3. Which of the following transactions qualify as revenue for M/s AB Enterprises? (a) Sales of ` 20 lakhs made under consignment sales. (b) Sale of an old machine amounting ` 5 lakhs <PdfRef page={17} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.51 (c) Services provided to the customer in the normal course of business. Sales recorded is ` 50,000. (d) Sales of ` 25 lakhs made under consignment sales 4. The Accounting Club has 100 members who are required to pay an annual membership fee of ` 5,000 each. During the current year, all members have paid the fee. However, 5 members have paid an amount of ` 10,000 each. Of these, 3 members paid the current year’s fee and also the previous year’s dues. Remaining 2 members have paid next years’ fee of ` 5,000 in advance. Revenue from membership fee for the current year to be recognised will be: (a) ` 5,25,000 (b) ` 5,10,000 (c) ` 5,00,000 (d) ` 5,15,000 5. FlixNet International offers a subscription fee model to allow the paid subscribers an annual viewing of movies, sports events and other content. It allows users to register for free and have access to limited content for one month without any charges. The customer has a right to cancel the subscription within a month’s time but is required to pay for 1 year subscription fee after the free period. XY has subscribed for free viewing on 1st March 20X1. After 1 month, he has agreed to pay the annual membership and has paid ` 1,200 on 31st March 20X1 for the subscription that is valid up to 31st of March 20X2. Revenue that can be recognized by FlixNet for the year ended 31st March 20X2 is (a) ` 100 (b) ` 1,200 (c) Nil (d) ` 1,100 <PdfRef page={18} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Scenario based Questions 6. GH manufactures and sells televisions. The televisions are shipped to the customer by sea. In order to transfer risk related to the shipment of the televisions, GH also gets an insurance coverage for the goods while they are in transit from the factory to customer’s location. The insurance policy will reimburse GH for the value of the goods in the event of loss or damage arising anytime up to these goods reaching customer’s location. The legal title passes when the goods arrive at the customer’s premises one month later. When should Entity GH recognize revenue in its books? 7. The following information of Meghna Ltd. is provided: (i) Goods of ` 60,000 were sold on 20-3-20X2 but at the request of the buyer these were delivered on 10-4-20X2. (ii) On 15-1-20X2 goods of ` 1,50,000 were sent on consignment basis of which 20% of the goods unsold are lying with the consignee as on 31-3-20X2. (iii) ` 1,20,000 worth of goods were sold on approval basis on 1-12-20X1. The period of approval was 3 months after which they were considered sold. Buyer sent approval for 75% goods up to 31-1-20X2 and no approval or disapproval received for the remaining goods till 31-3- 20X2. (iv) Apart from the above, the company has made cash sales of ` 7,80,000 (gross). Trade discount of 5% was allowed on the cash sales. You are required to advise the accountant of Meghna Ltd., with valid reasons, the amount to be recognized as revenue in above cases in the context of <strong>AS 9</strong>. 8. For the year ended 31st March 20X1, KY Enterprises has entered into the following transactions. On 31 March 20X1, KY supplied two machines to its customer ST. Both machines were accepted by ST on 31 March 20X1. Machine 1 was a machine that was routinely supplied by KY to many customers and the installation process was very simple. <PdfRef page={19} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.53 Machine 1 was installed on 2 April 20X1 by ST’s employees. Machine 2 being more specialised in nature requires an installation process which is more complicated, requiring significant assistance from KY. Machine 2 was installed between 2 and 5 April 20X1. Details of costs and sales prices are as follows: Machine 1 Machine 2 Sale Price 3,20,000 3,00,000 Cost of production 1,60,000 1,50,000 Installation fee nil 10,000 How should above transactions be recognized by KY Enterprises for the year ended 31st March 20X1? 9 PQR Ltd., sells agriculture products to dealers. One of the conditions of sale is that interest is at the rate of 2% p.m., for delayed payments. Percentage of interest recovery is only 10% on such overdue outstanding due to various reasons. During the year 20X1-X2 the company wants to recognize the entire interest receivable. Do you agree? ANSWERS/SOLUTIONS Answer to the Multiple Choice Questions 1. (a) 2. (c) 3. (c) 4. (c) 5. (b) Answer to the Scenario based Questions 6. GH should recognize revenue for the sale when the goods arrive at the customer’s premises. GH has not transferred the televisions’ significant risks and rewards of ownership to the customer when the goods depart from the factory. This is evidenced by the fact that any insurance proceeds received from the goods’ damage or destruction will be repaid to GH. Further, the legal title does not pass until the goods arrive at the customer’s premises. <PdfRef page={20} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            7. As per <strong>AS 9</strong> “Revenue <strong>Recognition</strong>”, in a transaction involving the sale of goods, performance should be regarded as being achieved when the following conditions are fulfilled: (i) the seller of goods has transferred to the buyer the property in the goods for a price or all significant risks and rewards of ownership have been transferred to the buyer and the seller retains no effective control of the goods transferred to a degree usually associated with ownership; and (ii) no significant uncertainty exists regarding the amount of the consideration that will be derived from the sale of the goods. Case (i) The sale is complete but delivery has been postponed at buyer’s request. The entity should recognize the entire sale of ` 60,000 for the year ended 31st March, 20X2. Case (ii) 20% goods lying unsold with consignee should be treated as closing inventory and sales should be recognized for ` 1,20,000 (80% of ` 1,50,000). In case of consignment sale revenue should not be recognized until the goods are sold to a third party. Case (iii) In case of goods sold on approval basis, revenue should not be recognized until the goods have been formally accepted by the buyer or the buyer has done an act adopting the transaction or the time period for rejection has elapsed or where no time has been fixed, a reasonable time has elapsed. Therefore, revenue should be recognized for the ` 90,000 upon receipt of approval on 31-02-20X1 and for the balance ` 30,000 on 01-03- 20X1 as the time period for rejecting the goods had expired. Case (iv) Trade discounts given should be deducted in determining revenue. Thus ` 39,000 should be deducted from the amount of turnover of ₹ 7,80,000 for the purpose of recognition of revenue. Thus, revenue should be ` 7,41,000. 8. Machine 1: As the installation process is simple, revenue from Machine 1 will be recognized on 31 March 20X1. Revenue (Machine 1) ` 3,20,000 Cost of Goods Sold ` 1,60,000 Profit during the period ` 1,60,000 <PdfRef page={21} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.55 Since the question specifies that the machine is already accepted by ST on 31 March 20X1, the revenue arising from sale of the machine needs to be recognized for the year ending 31 March 20X1. This is because acceptance of the machine indicates that the risks and rewards pursuant to the ownership are transferred to ST. Machine 2: Installation process for Machine 2 is more complicated, requiring significant assistance from KY Ltd. However, question specifies that the machine is already accepted by ST on 31 March 20X1. Assuming that there is no further approval/acceptance required from the buyer for the Machine sold, revenue from sale of Machine 2 can be recognized for the year ending 31 March 20X1. Revenue (Machine 2) ` 3,00,000 Cost of Goods Sold ` 1,50,000 Profit during the period ` 1,50,000 However, installation fee which is for rendering installation services cannot be recognized until the installation is complete. Since the machine is pending installation, the revenue in respect of installation charges `10,000 needs to be recognized on 5 April 20X1 once the installation process gets completed. 9. As per <strong>AS 9</strong> ‘Revenue <strong>Recognition</strong>’, where the ability to assess the ultimate collection with reasonable certainty is lacking at the time of raising any claim, e.g. for escalation of price, export incentives, interest etc., revenue recognition is postponed to the extent of uncertainty involved. In such cases, it may be appropriate to recognise revenue only when it is reasonably certain that the ultimate collection will be made. Where there is no uncertainty as to ultimate collection, revenue is recognised at the time of sale or rendering of service even though payments are made by instalments. Thus, PQR Ltd. cannot recognise the interest amount unless the company actually receives it. 10% rate of recovery on overdue outstanding is also an estimate based on previous record and is not certain. Hence, the company is advised to recognise interest receivable only on receipt basis. <PdfRef page={22} />
          </p>
          
        
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 9**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 9, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
