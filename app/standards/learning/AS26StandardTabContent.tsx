'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, ChevronDown } from 'lucide-react'

export const as26Sections = [
  { id: 'as-26-intro-sec', title: '1. Introduction & Objectives' },
  { id: 'as-26-introduction', title: '6.1 INTRODUCTION' },
  { id: 'as-26-scope', title: '6.2 SCOPE' },
  { id: 'as-26-definitions', title: '6.3 DEFINITIONS' },
  { id: 'as-26-identifiability', title: '6.4 IDENTIFIABILITY' },
  { id: 'as-26-control', title: '6.5 CONTROL' },
  { id: 'as-26-future-economic-benefits', title: '6.6 FUTURE ECONOMIC BENEFITS' },
  { id: 'as-26-recognition-and-initial-measurement', title: '6.7 RECOGNITION AND INITIAL MEASUREMENT' },
  { id: 'as-26-separate-acquisition', title: '6.8 SEPARATE ACQUISITION' },
  { id: 'as-26-acquisition-as-part-of-an', title: '6.9 ACQUISITION AS PART OF AN' },
  { id: 'as-26-acquisition-by-way-of-a-government', title: '6.10 ACQUISITION BY WAY OF A GOVERNMENT' },
  { id: 'as-26-exchange-of-assets', title: '6.11 EXCHANGE OF ASSETS' },
  { id: 'as-26-internally-generated-goodwill', title: '6.12 INTERNALLY GENERATED GOODWILL' },
  { id: 'as-26-internally-generated-intangible', title: '6.13 INTERNALLY GENERATED INTANGIBLE' },
  { id: 'as-26-research-phase', title: '6.14 RESEARCH PHASE' },
  { id: 'as-26-development-phase', title: '6.15 DEVELOPMENT PHASE' },
  { id: 'as-26-cost-of-an-internally-generated', title: '6.16 COST OF AN INTERNALLY GENERATED' },
  { id: 'as-26-recognition-of-an-expense', title: '6.17 RECOGNITION OF AN EXPENSE' },
  { id: 'as-26-subsequent-expenditure', title: '6.18 SUBSEQUENT EXPENDITURE' },
  { id: 'as-26-measurement-subsequent-to-initial', title: '6.19 MEASUREMENT SUBSEQUENT TO INITIAL' },
  { id: 'as-26-amortisation-period', title: '6.20 AMORTISATION PERIOD' },
  { id: 'as-26-amortisation-method', title: '6.21 AMORTISATION METHOD' },
  { id: 'as-26-residual-value', title: '6.22 RESIDUAL VALUE' },
  { id: 'as-26-review-of-amortisation-period-and', title: '6.23 REVIEW OF AMORTISATION PERIOD AND' },
  { id: 'as-26-recoverability-of-the-carrying', title: '6.24 RECOVERABILITY OF THE CARRYING' },
  { id: 'as-26-retirements-and-disposals', title: '6.25 RETIREMENTS AND DISPOSALS' },
  { id: 'as-26-disclosure', title: '6.26 DISCLOSURE' },
  { id: 'as-26-other-disclosures', title: '6.27 OTHER DISCLOSURES' }
];

interface AS26StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function AS26StandardTabContent({ navigateToPdfPage }: AS26StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as-26-intro-sec');
  const tocScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(id);
    const stickyToc = document.getElementById('as-26-standard-sticky-toc');
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

      as26Sections.forEach((sec) => {
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
      <div id="as-26-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as26Sections.map(sec => (
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
        <section id="as-26-intro-sec" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-intro-sec" num="1" title="1. Introduction &amp; Objectives" />
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 1 ---  UNIT 6: ACCOUNTING STANDARD 26 INTANGIBLE ASSETS After studying this unit, you will be able to comprehend– • Definition of Intangible Assets • Parameters for Recognition and Initial Measurement of an Intangible Asset • Separate Acquisition • Acquisition as part of an Amalgamation • Acquisition by way of a Government Grant • Exchanges of Assets • Internally Generated Goodwill and other Intangible Assets • Measurement Subsequent to Initial Recognition • Principles for • Amortisation Period • Amortisation Method • Residual Value • Review of Amortisation Period and Amortisation Method • Retirements and Disposals • Disclosures as per the standard.</li>
          </ul>
          
        </section>

        {/* Section: 6.1 INTRODUCTION */}
        <section id="as-26-introduction" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-introduction" num="6.1" title="INTRODUCTION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The objective of <strong>AS 26</strong> is to prescribe the accounting treatment for intangible assets that are not dealt with specifically in another <strong>Accounting Standard</strong>. <strong>AS 26</strong> requires an enterprise to recognise an intangible asset if, and only if, certain <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 2 ---  criteria are met. AS 26 also specifies how to measure the carrying amount of intangible assets and requires certain disclosures about intangible assets.</li>
          </ul>
          
        </section>

        {/* Section: 6.2 SCOPE */}
        <section id="as-26-scope" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-scope" num="6.2" title="SCOPE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            <strong>AS 26</strong> should be applied by all enterprises in accounting for intangible assets, except: a. Intangible assets that are covered by another <strong>Accounting Standard</strong>, such as: (a) intangible assets held by an enterprise for sale in the ordinary course of business (<strong>AS 2</strong>, Valuation of Inventories and <strong>AS 7</strong>, Construction Contracts) (b) deferred tax assets (<strong>AS 22</strong>, Accounting for Taxes on Income) (c) leases that fall within the scope of <strong>AS 19</strong>, <strong>Leases</strong>; and (d) goodwill arising on an amalgamation (<strong>AS 14</strong> (Revised), Accounting for Amalgamations) and goodwill arising on consolidation (<strong>AS 21</strong> (Revised), Consolidated Financial Statements) b. Financial assets. c. Mineral rights and expenditure on the exploration for, or development and extraction of, minerals, oil, natural gas and similar non-regenerative resources and d. Intangible assets arising in insurance enterprises from contracts with policyholders. e. expenditure in respect of termination benefits. However, <strong>AS 26</strong> applies to other intangible assets used (such as computer software), and other expenditure (such as start-up costs), in extractive industries or by insurance enterprises. <strong>AS 26</strong> also applies to: (i) expenditure on advertising, training, start - up cost (ii) Research and development activities (iii) Right under licensing agreements for items such as motion picture films, video recordings, plays, manuscripts, patents and copyrights. These items are excluded from the scope of <strong>AS 19</strong>. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 3 ---  (iv) the underlying intangible asset in finance lease after its initial recognition.</li>
          </ul>
          
        </section>

        {/* Section: 6.3 DEFINITIONS */}
        <section id="as-26-definitions" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-definitions" num="6.3" title="DEFINITIONS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            An asset is a resource: a. Controlled by an enterprise as a result of past events and b. From which future economic benefits are expected to flow to the enterprise. Monetary assets are money held and assets to be received in fixed or determinable amounts of money. Non-monetary assets are assets other than monetary assets. Amortisation is the systematic allocation of the depreciable amount of an intangible asset over its useful life. Depreciable amount is the cost of an asset less its residual value. Useful life is either: (a) the period of time over which an asset is expected to be used by the enterprise; or (b) the number of production or similar units expected to be obtained from the asset by the enterprise. Fair value of an asset is the amount for which that asset could be exchanged between knowledgeable, willing parties in an arm&apos;s length transaction. An active market is a market where all the following conditions exist: a. The items traded within the market are homogeneous. b. Willing buyers and sellers can normally be found at any time and c. Prices are available to the public. An impairment loss is the amount by which the carrying amount of an asset exceeds its recoverable amount. Carrying amount is the amount at which an asset is recognised in the balance sheet, net of any accumulated amortisation and accumulated impairment losses thereon. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 4 ---  A financial asset is any asset that is: a. Cash; b. A contractual right to receive cash or another financial asset from another enterprise; c. A contractual right to exchange financial instruments with another enterprise under conditions that are potentially favourable; or d. An ownership interest in another enterprise. Termination benefits are employee benefits payable as a result of either: a. an enterprise’s decision to terminate an employee’s employment before the normal retirement date; or b. an employee’s decision to accept voluntary redundancy in exchange for those benefits (voluntary retirement). Intangible Asset is • an identifiable • non-monetary asset • without physical substance • held for use in the production or supply of goods or services, for rental to others, or for administrative purposes. Enterprises frequently expend resources, or incur liabilities, on the acquisition, development, maintenance or enhancement of intangible resources such as scientific or technical knowledge, design and implementation of new processes or systems, licences, intellectual property, market knowledge and trademarks (including brand names and publishing titles). Common examples are computer software, patents, copyrights, motion picture films, customer lists, mortgage servicing rights, fishing licences, import quotas, franchises, customer or supplier relationships, customer loyalty, market share and marketing rights. Goodwill is another example of an item of intangible nature which either arises on acquisition or is internally generated. Not all the items described above will meet the definition of an intangible asset, that is, identifiability, control over a resource and expectation of future economic</li>
            <li>-- PAGE 5 ---  benefits flowing to the enterprise. If an item covered by AS 26 does not meet the definition of an intangible asset, expenditure to acquire it or generate it internally is recognised as an expense when it is incurred. Some intangible assets may be contained in or on a physical substance such as a compact disk (in the case of computer software), legal documentation (in the case of a licence or patent) or film (in the case of motion pictures). The cost of the physical substance containing the intangible assets is usually not significant. Accordingly, the physical substance containing an intangible asset, though tangible in nature, is commonly treated as a part of the intangible asset contained in or on it. In some cases, an asset may incorporate both intangible and tangible elements that are, in practice, inseparable. Judgement is required to assess as to which element is predominant. For example, computer software for a computer- controlled machine tool that cannot operate without that specific software is an integral part of the related hardware and it is treated as a fixed asset. The same applies to the operating system of a computer. Where the software is not an integral part of the related hardware, computer software is treated as an intangible asset.</li>
          </ul>
          
        </section>

        {/* Section: 6.4 IDENTIFIABILITY */}
        <section id="as-26-identifiability" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-identifiability" num="6.4" title="IDENTIFIABILITY" />
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>The definition of an intangible asset requires that an intangible asset be identifiable. To be identifiable, it is necessary that the intangible asset is clearly distinguished from goodwill. • An intangible asset can be clearly distinguished from goodwill if the asset is separable which means that enterprise could rent, sell, exchange or distribute the specific future economic benefits attributable to the asset without also disposing of future economic benefits that flow from other assets used in the same revenue earning activity. • Separability is not a necessary condition for identifiability since an enterprise may be able to identify an asset in some other way. For example, if an intangible asset is acquired with a group of assets, the transaction may involve the transfer of legal rights that enable an enterprise to identify the intangible asset. Also, even If an asset generates future economic benefits</li>
            <li>-- PAGE 6 ---  only in combination with other assets, the asset is identifiable if the enterprise can identify the future economic benefits that will flow from the asset.</li>
          </ul>
          
        </section>

        {/* Section: 6.5 CONTROL */}
        <section id="as-26-control" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-control" num="6.5" title="CONTROL" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            An enterprise controls an asset if the enterprise has the power to obtain the future economic benefits flowing from the underlying resource and also can restrict the access of others to those benefits. The capacity of an enterprise to control the future economic benefits from an intangible asset would normally stem from legal rights that are enforceable in a court of law. However, legal enforceability of a right is not a necessary condition for control since an enterprise may be able to control the future economic benefits in some other way. Market and technical knowledge may give rise to future economic benefits. An enterprise controls those benefits if, for example, the knowledge is protected by legal rights such as copyrights, a restraint of trade agreement or by a legal duty on employees to maintain confidentiality. Future economic benefit is also flown from the skill of labour and customer loyalty but usually this flow of benefits cannot be controlled by the enterprise as employees may leave the enterprise anytime or even loyal customers may decide to purchase goods and services from other suppliers. Hence, these items don’t even qualify as intangible asset as per the definition given in <strong>AS 26</strong>. Example 1: Moon Limited has provided training to its staff on various new topics like GST, AS, Ind AS etc. to ensure the compliance as per the required law. Can the company recognise such cost of staff training as intangible asset? In this case, it is clear that the company will obtain the economic benefits from the work performed by the staff as it increases their efficiency. But it does not have control over them because staff could choose to resign the company at any time. Hence the company lacks the ability to restrict the access of others to those benefits. Therefore, the staff training cost does not meet the definition of an intangible asset. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 7 --- </li>
          </ul>
          
        </section>

        {/* Section: 6.6 FUTURE ECONOMIC BENEFITS */}
        <section id="as-26-future-economic-benefits" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-future-economic-benefits" num="6.6" title="FUTURE ECONOMIC BENEFITS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The future economic benefits flowing from an intangible asset may include revenue from the sale of products or services, cost savings, or other benefits resulting from the use of the asset by the enterprise. For example, the use of intellectual property in a production process may reduce future production costs rather than increase future revenues. <PdfRef page={1} />
          </p>
          
        </section>

        {/* Section: 6.7 RECOGNITION AND INITIAL MEASUREMENT */}
        <section id="as-26-recognition-and-initial-measurement" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-recognition-and-initial-measurement" num="6.7" title="RECOGNITION AND INITIAL MEASUREMENT" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            OF AN INTANGIBLE ASSET The recognition of an item as an intangible asset requires an enterprise to demonstrate that the item meets the definition of an intangible asset and recognition criteria set out as below: An intangible asset should be recognised if, and only if: a. It is probable that the future economic benefits that are attributable to the asset will flow to the enterprise; and b. The cost of the asset can be measured reliably. An enterprise should assess the probability of future economic benefits using reasonable and supportable assumptions that represent best estimate of the set of economic conditions that will exist over the useful life of the asset. An intangible asset should be measured initially at cost. <PdfRef page={1} />
          </p>
          
        </section>

        {/* Section: 6.8 SEPARATE ACQUISITION */}
        <section id="as-26-separate-acquisition" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-separate-acquisition" num="6.8" title="SEPARATE ACQUISITION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            If an intangible asset is acquired separately, the cost of the intangible asset can usually be measured reliably. This is particularly so when the purchase consideration is in the form of cash or other monetary assets. The cost of an intangible asset comprises: • its purchase price, <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 8 ---  • any import duties and other taxes (other than those subsequently recoverable by the enterprise from the taxing authorities), and • any directly attributable expenditure on making the asset ready for its intended use. Directly attributable expenditure includes, for example, professional fees for legal services. • Any trade discounts and rebates are deducted in arriving at the cost. If an intangible asset is acquired in exchange for shares or other securities of the reporting enterprise, the asset is recorded at its fair value, or the fair value of the securities issued, whichever is more clearly evident.</li>
          </ul>
          
        </section>

        {/* Section: 6.9 ACQUISITION AS PART OF AN */}
        <section id="as-26-acquisition-as-part-of-an" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-acquisition-as-part-of-an" num="6.9" title="ACQUISITION AS PART OF AN" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            AMALGAMATION An intangible asset acquired in an amalgamation in the nature of purchase is accounted for in accordance with <strong>AS 14</strong> (Revised). In accordance with <strong>AS 26</strong>: a. A transferee recognises an intangible asset that meets the recognition criteria, even if that intangible asset had not been recognised in the financial statements of the transferor and b. If the cost (i.e. fair value) of an intangible asset acquired as part of an amalgamation in the nature of purchase cannot be measured reliably, that asset is not recognised as a separate intangible asset but is included in goodwill. Where in preparing the financial statements of the transferee company, the consideration is allocated to individual identifiable assets and liabilities on the basis of their fair values at the date of amalgamation. Hence, judgement is required to determine whether the cost (i.e. fair value) of an intangible asset acquired in an amalgamation can be measured with sufficient reliability for the purpose of separate recognition. Quoted market prices in an active market provide the most reliable measurement of fair value. The appropriate market price is usually the current bid price. If current bid prices are unavailable, the price of the most recent similar transaction may provide a basis from which to estimate fair value, provided that there has not been a significant <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 9 ---  change in economic circumstances between the transaction date and the date at which the asset&apos;s fair value is estimated. If no active market exists for an asset, its cost reflects the amount that the enterprise would have paid, at the date of the acquisition, for the asset in an arm&apos;s length transaction between knowledgeable and willing parties, based on the best information available. The cost initially recognised for the intangible asset in this case is restricted to an amount that does not create or increase any capital reserve arising at the date of the amalgamation.</li>
          </ul>
          
        </section>

        {/* Section: 6.10 ACQUISITION BY WAY OF A GOVERNMENT */}
        <section id="as-26-acquisition-by-way-of-a-government" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-acquisition-by-way-of-a-government" num="6.10" title="ACQUISITION BY WAY OF A GOVERNMENT" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            GRANT In some cases, an intangible asset may be acquired free of charge, or for nominal consideration, by way of a government grant. This may occur when a government transfers or allocates to an enterprise intangible assets such as airport landing rights, licences to operate radio or television stations, import licences or quotas or rights to access other restricted resources. <strong>AS 12</strong>, requires that government grants in the form of non-monetary assets, given at a concessional rate should be accounted for on the basis of their acquisition cost. Determination of Fair value If active market exists Quoted market price Current bid price Price of the most recently similar transaction If active market does not exist Amount that the enterprise would have paid <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 10 ---  Accordingly, intangible asset acquired free of charge, or for nominal consideration, by way of government grant is recognised at a nominal value or at the acquisition cost, as appropriate; any expenditure that is directly attributable to making the asset ready for its intended use is also included in the cost of the asset.</li>
          </ul>
          
        </section>

        {/* Section: 6.11 EXCHANGE OF ASSETS */}
        <section id="as-26-exchange-of-assets" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-exchange-of-assets" num="6.11" title="EXCHANGE OF ASSETS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            An intangible asset may be acquired in exchange or part exchange for another asset. In such a case, the cost of the asset acquired is determined in accordance with the principles laid down in this regard in <strong>AS 10</strong>. The cost of such an item is measured at fair value unless: (a) the exchange transaction lacks commercial substance or (b) the fair value of neither the asset(s) received nor the asset(s) given up is reliably measurable. The acquired item is measured in this manner even if an enterprise cannot immediately derecognize the asset given up. If the acquired item is not measured at fair value, its/their cost is measured at the carrying amount of the asset(s) given up. <PdfRef page={1} />
          </p>
          
        </section>

        {/* Section: 6.12 INTERNALLY GENERATED GOODWILL */}
        <section id="as-26-internally-generated-goodwill" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-internally-generated-goodwill" num="6.12" title="INTERNALLY GENERATED GOODWILL" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Internally generated goodwill is not recognised as an asset because it is not an identifiable resource controlled by the enterprise that can be measured reliably at cost. Differences between the market value of an enterprise and the carrying amount of its identifiable net assets at any point in time may be due to a range of factors that affect the value of the enterprise. However, such differences cannot be considered to represent the cost of intangible assets controlled by the enterprise. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 11 --- </li>
          </ul>
          
        </section>

        {/* Section: 6.13 INTERNALLY GENERATED INTANGIBLE */}
        <section id="as-26-internally-generated-intangible" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-internally-generated-intangible" num="6.13" title="INTERNALLY GENERATED INTANGIBLE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ASSETS It is sometimes difficult to assess whether an internally generated intangible asset qualifies for recognition. It is often difficult to: (a) identify whether, and the point of time when, there is an identifiable asset that will generate probable future economic benefits; and (b) determine the cost of the asset reliably. In some cases, the cost of generating an intangible asset internally cannot be distinguished from the cost of maintaining or enhancing the enterprise’s internally generated goodwill or of running day-to- day operations. To assess whether an internally generated intangible asset meets the criteria for recognition, an enterprise classifies the generation of the asset into ➢ Research Phase &amp; ➢ Development Phase If an enterprise cannot distinguish the research phase from the development phase of an internal project to create an intangible asset, the enterprise treats the expenditure on that project as if it were incurred in the research phase only. <PdfRef page={1} />
          </p>
          
        </section>

        {/* Section: 6.14 RESEARCH PHASE */}
        <section id="as-26-research-phase" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-research-phase" num="6.14" title="RESEARCH PHASE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Research is original and planned investigation undertaken with the prospect of gaining new scientific or technical knowledge and understanding. No intangible asset arising from research or from the research phase should be recognised. Expenditure on research or on the research phase should be recognised as an expense when it is incurred. Examples of research activities are: a. Activities aimed at obtaining new knowledge. b. The search for, evaluation and final selection of, applications of research findings or other knowledge. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 12 ---  c. The search for alternatives for materials, devices, products, processes, systems or services; d. The formulation, design, evaluation and final selection of possible alternatives for new or improved materials, devices, products, processes, systems or services.</li>
          </ul>
          
        </section>

        {/* Section: 6.15 DEVELOPMENT PHASE */}
        <section id="as-26-development-phase" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-development-phase" num="6.15" title="DEVELOPMENT PHASE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Development is the application of research findings or other knowledge to a plan or design for the production of new or substantially improved materials, devices, products, processes, systems or services prior to the commencement of commercial production or use. An intangible asset arising from development (or from the development phase of an internal project) should be recognised if, and only if, an enterprise can demonstrate all of the following: a. The technical feasibility of completing the intangible asset so that it will be available for use or sale. b. Its intention to complete the intangible asset and use or sell it. c. Its ability to use or sell the intangible asset. d. How the intangible asset will generate probable future economic benefits. Among other things, the enterprise should demonstrate the existence of a market for the output of the intangible asset or the intangible asset itself or, if it is to be used internally, the usefulness of the intangible asset. e. The availability of adequate technical, financial and other resources to complete the development and to use or sell the intangible asset and f. Its ability to measure the expenditure attributable to the intangible asset during its development reliably. Examples of development activities are: a. The design, construction and testing of pre-production or pre-use prototypes and models. b. The design of tools, jigs, moulds and dies involving new technology. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 13 ---  c. The design, construction and operation of a pilot plant that is not of a scale economically feasible for commercial production and d. The design, construction and testing of a chosen alternative for new or improved materials, devices, products, processes, systems or services. AS 26 takes the view that expenditure on internally generated brands, mastheads, publishing titles, customer lists and items similar in substance cannot be distinguished from the cost of developing the business as a whole. Therefore, such items are not recognised as intangible assets. To demonstrate how an intangible asset will generate probable future economic benefits, an enterprise assesses the future economic benefits to be received from the asset using the principles in Accounting Standard on Impairment of Assets. If the asset will generate economic benefits only in combination with other assets, the enterprise applies the concept of cash generating units as set out in Accounting Standard on Impairment of Assets.</li>
          </ul>
          
        </section>

        {/* Section: 6.16 COST OF AN INTERNALLY GENERATED */}
        <section id="as-26-cost-of-an-internally-generated" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-cost-of-an-internally-generated" num="6.16" title="COST OF AN INTERNALLY GENERATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            INTANGIBLE ASSET The cost of an internally generated intangible asset is the sum of expenditure incurred from the time when the intangible asset first meets the recognition criteria. Reinstatement of expenditure recognised as an expense in previous annual financial statements or interim financial reports is prohibited. The cost of an internally generated intangible asset comprises all expenditure that can be directly attributed, or allocated on a reasonable and consistent basis, to creating, producing and making the asset ready for its intended use from the time when the intangible asset first meets the recognition criteria. The cost includes, if applicable: a Expenditure on materials and services used or consumed in generating the intangible asset. b. The salaries, wages and other employment related costs of personnel directly engaged in generating the asset. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 14 ---  c. Any expenditure that is directly attributable to generating the asset, such as fees to register a legal right and the amortisation of patents and licenses that are used to generate the asset (E.g., borrowing cost as per para 4(e) of AS 16, etc.) and d. Overheads that are necessary to generate the asset and that can be allocated on a reasonable and consistent basis to the asset. Allocations of overheads are made on bases similar to those discussed in AS 2 &amp; AS 16. The following are not components of the cost of an internally generated intangible asset, these should be expensed off in profit and loss account: a. Selling, administrative and other general overhead expenditure unless this expenditure can be directly attributed to making the asset ready for use. b. Clearly identified inefficiencies and initial operating losses incurred before an asset achieves planned performance and c. Expenditure on training the staff to operate the asset. Example An enterprise is developing a new production process. During the year 20X1, expenditure incurred was ` 10 lacs, of which ` 9 lacs was incurred before 1 December 20X1 and 1 lac was incurred between 1 December 20X1 and 31 December 20X1. The enterprise is able to demonstrate that, at 1 December 20X1, the production process met the criteria for recognition as an intangible asset. The recoverable amount of the know-how embodied in the process (including future cash outflows to complete the process before it is available for use) is estimated to be ` 5 lacs. At the end of 20X1, the production process is recognised as an intangible asset at a cost of ` 1 lac (expenditure incurred since the date when the recognition criteria were met, that is, 1 December 20X1). The ` 9 lacs expenditure incurred before 1 December 20X1 is recognised as an expense because the recognition criteria were not met until 1 December 20X1. This expenditure will never form part of the cost of the production process recognised in the balance sheet. During the year 20X2, expenditure incurred is ` 20 lacs. At the end of 20X2, the recoverable amount of the know-how embodied in the process (including future</li>
            <li>-- PAGE 15 ---  cash outflows to complete the process before it is available for use) is estimated to be ` 19 lacs. At the end of the year 20X2, the cost of the production process is ` 21 lacs ( ` 1 lac expenditure recognised at the end of 20X1 plus ` 20 lacs expenditure recognised in 20X2). The enterprise recognises an impairment loss of ` 2 lacs to adjust the carrying amount of the process before impairment loss ( ` 21 lacs) to its recoverable amount ( ` 19 lacs). This impairment loss will be reversed in a subsequent period if the requirements for the reversal of an impairment loss in AS 28, are met.</li>
          </ul>
          
        </section>

        {/* Section: 6.17 RECOGNITION OF AN EXPENSE */}
        <section id="as-26-recognition-of-an-expense" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-recognition-of-an-expense" num="6.17" title="RECOGNITION OF AN EXPENSE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Expenditure on an intangible item should be recognised as an expense when it is incurred unless: a. It forms part of the cost of an intangible asset that meets the recognition criteria or b. The item is acquired in an amalgamation in the nature of purchase and cannot be recognised as an intangible asset. It forms part of the amount attributed to goodwill (capital reserve) at the date of acquisition. In some cases, expenditure is incurred to provide future economic benefits to an enterprise, but no intangible asset or other asset is acquired or created that can be recognised. In these cases, the expenditure is recognised as an expense when it is incurred. For example, expenditure on research is always recognised as an expense when it is incurred. Examples of other expenditure that is recognised as an expense when it is incurred include: (a) expenditure on start-up activities (start-up costs), unless this expenditure is included in the cost of an item of fixed asset under <strong>AS 10</strong>. Start-up costs may consist of preliminary expenses incurred in establishing a legal entity such as legal and secretarial costs, expenditure to open a new facility or business (pre-opening costs) or expenditures for commencing new operations or launching new products or processes (pre-operating costs); (b) expenditure on training activities; <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 16 ---  (c) expenditure on advertising and promotional activities; and (d) expenditure on relocating or re-organising part or all of an enterprise. The above guidance does not apply to payments for the delivery of goods or services made in advance of the delivery of goods or the rendering of services. Such prepayments are recognised as assets. Past Expenses not to be recognised as an Asset Expenditure on an intangible item that was initially recognised as an expense in previous annual financial statements or interim financial reports should not be recognised as part of the cost of an intangible asset at a later date.</li>
          </ul>
          
        </section>

        {/* Section: 6.18 SUBSEQUENT EXPENDITURE */}
        <section id="as-26-subsequent-expenditure" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-subsequent-expenditure" num="6.18" title="SUBSEQUENT EXPENDITURE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Subsequent expenditure on an intangible asset after its purchase or its completion should be recognised as an expense when it is incurred unless: a. It is probable that the expenditure will enable the asset to generate future economic benefits in excess of its originally assessed standard of performance and b. The expenditure can be measured and attributed to the asset reliably. If these conditions are met, the subsequent expenditure should be added to the cost of the intangible asset. Subsequent expenditure on brands, mastheads, publishing titles, customer lists and items similar in substance is always recognised as an expense to avoid the recognition of internally generated goodwill. The nature of intangible assets is such that, in many cases, it is not possible to determine whether subsequent expenditure is likely to enhance or maintain the economic benefits that will flow to the enterprise from those assets. Therefore, only rarely will expenditure incurred after the initial recognition of a purchased intangible asset or after completion of an internally generated intangible asset result in additions to the cost of the intangible asset. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 17 --- </li>
          </ul>
          
        </section>

        {/* Section: 6.19 MEASUREMENT SUBSEQUENT TO INITIAL */}
        <section id="as-26-measurement-subsequent-to-initial" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-measurement-subsequent-to-initial" num="6.19" title="MEASUREMENT SUBSEQUENT TO INITIAL" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            RECOGNITION After initial recognition, an intangible asset should be carried at its cost less any accumulated amortisation and any accumulated impairment losses. <PdfRef page={1} />
          </p>
          
        </section>

        {/* Section: 6.20 AMORTISATION PERIOD */}
        <section id="as-26-amortisation-period" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-amortisation-period" num="6.20" title="AMORTISATION PERIOD" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The depreciable amount of an intangible asset should be allocated on a systematic basis over the best estimate of its useful life. Amortisation should commence when the asset is available for use. Estimates of the useful life of an intangible asset generally become less reliable as the length of the useful life increases. <strong>AS 26</strong> adopts a rebuttable presumption that the useful life of an intangible asset will not exceed ten years from the date when the asset is available for use. Amortisation is recognised whether or not there has been an increase in, for example, the asset&apos;s fair value or recoverable amount. Many factors need to be considered in determining the useful life of an intangible asset including: (a) the expected usage of the asset by the enterprise and whether the asset could be efficiently managed by another management team; (b) typical product life cycles for the asset and public information on estimates of useful lives of similar types of assets that are used in a similar way; (c) technical, technological or other types of obsolescence; (d) the stability of the industry in which the asset operates and changes in the market demand for the products or services output from the asset; (e) expected actions by competitors or potential competitors; (f) the level of maintenance expenditure required to obtain the expected future economic benefits from the asset and the company&apos;s ability and intent to reach such a level; (g) the period of control over the asset and legal or similar limits on the use of the asset, such as the expiry dates of related leases; and <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 18 ---  (h) whether the useful life of the asset is dependent on the useful life of other assets of the enterprise. Given the history of rapid changes in technology, computer software and many other intangible assets are susceptible to technological obsolescence. Therefore, it is likely that their useful life will be short. In some cases, there may be persuasive evidence that the useful life of an intangible asset will be a specific period longer than ten years. In these cases, the presumption that the useful life generally does not exceed ten years is rebutted and the enterprise: a. Amortises the intangible asset over the best estimate of its useful life. b. Estimates the recoverable amount of the intangible asset at least annually in order to identify any impairment loss and c. Discloses the reasons why the presumption is rebutted and the factors that played a significant role in determining the useful life of the asset. Example: A. An enterprise has purchased an exclusive right to generate hydroelectric power for 60 years. The costs of generating hydro-electric power are much lower than the costs of obtaining power from alternative sources. It is expected that the geographical area surrounding the power station will demand a significant amount of power from the power station for at least 60 years. The enterprise amortises the right to generate power over 60 years, unless there is evidence that its useful life is shorter. B. An enterprise has purchased an exclusive right to operate a toll motorway for 30 years. There is no plan to construct alternative routes in the area served by the motorway. It is expected that this motorway will be in use for at least 30 years. The enterprise amortises the right to operate the motorway over 30 years, unless there is evidence that its useful life is shorter. If control over the future economic benefits from an intangible asset is achieved through legal rights that have been granted for a finite period, the useful life of the intangible asset should not exceed the period of the legal rights unless the legal rights are renewable and renewal is virtually certain.</li>
            <li>-- PAGE 19 ---  The useful life of an intangible asset may be very long but it is always finite. There may be both economic and legal factors influencing the useful life of an intangible asset: economic factors determine the period over which future economic benefits will be generated; legal factors may restrict the period over which the enterprise controls access to these benefits. The useful life is the shorter of the periods determined by these factors. Example: Company X has purchased a copyright to produce a safety equipment for sale in the market. The rights have been obtained for 10 years. Hence, company is amortizing the intangible asset in 10 years. After 7 years, due to change in the environmental law, safety equipments produced out of new technology are only considered valid. In above scenario, the company need to write off the balance amount in the year of implementation of the law.</li>
          </ul>
          
        </section>

        {/* Section: 6.21 AMORTISATION METHOD */}
        <section id="as-26-amortisation-method" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-amortisation-method" num="6.21" title="AMORTISATION METHOD" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The amortisation method used should reflect the pattern in which the asset&apos;s economic benefits are consumed by the enterprise. If that pattern cannot be determined reliably, the straight-line method should be used. A variety of amortisation methods can be used to allocate the depreciable amount of an asset on a systematic basis over its useful life. These methods include • the straight-line method, • the diminishing balance method and • the unit of production method. The method used for an asset is selected based on the expected pattern of consumption of economic benefits and is consistently applied from period to period, unless there is a change in the expected pattern of consumption of economic benefits to be derived from that asset. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 20 ---  The amortisation charge for each period should be recognised as an expense unless another Accounting Standard permits or requires it to be included in the carrying amount of another asset. For example, the amortisation of intangible assets used in a production process is included in the carrying amount of inventories.</li>
          </ul>
          
        </section>

        {/* Section: 6.22 RESIDUAL VALUE */}
        <section id="as-26-residual-value" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-residual-value" num="6.22" title="RESIDUAL VALUE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Residual value is the amount, which an enterprise expects to obtain for an asset at the end of its useful life after deducting the expected costs of disposal. The residual value of an intangible asset should be assumed to be zero unless: a. There is a commitment by a third party to purchase the asset at the end of its useful life or b. There is an active market for the asset and: i. Residual value can be determined by reference to that market and ii. It is probable that such a market will exist at the end of the asset&apos;s useful life. A residual value other than zero implies that an enterprise expects to dispose of the intangible asset before the end of its economic life. <PdfRef page={1} />
          </p>
          
        </section>

        {/* Section: 6.23 REVIEW OF AMORTISATION PERIOD AND */}
        <section id="as-26-review-of-amortisation-period-and" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-review-of-amortisation-period-and" num="6.23" title="REVIEW OF AMORTISATION PERIOD AND" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            AMORTISATION METHOD The amortisation period and the amortisation method should be reviewed at least at each financial year end. If the expected useful life of the asset is significantly different from previous estimates, the amortisation period should be changed accordingly. If there has been a significant change in the expected pattern of economic benefits from the asset, the amortisation method should be changed to reflect the changed pattern. Such changes should be accounted for in accordance with <strong>AS 5</strong>. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 21 --- </li>
          </ul>
          
        </section>

        {/* Section: 6.24 RECOVERABILITY OF THE CARRYING */}
        <section id="as-26-recoverability-of-the-carrying" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-recoverability-of-the-carrying" num="6.24" title="RECOVERABILITY OF THE CARRYING" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            AMOUNT-IMPAIRMENT LOSSES Impairment losses of intangible assets are calculated on the basis of <strong>AS 28</strong> . <strong>AS 28</strong> “Impairment of Assets” is covered in next unit of this chapter. In addition to the requirements of <strong>Accounting Standard</strong> on Impairment of Assets, an enterprise should estimate the recoverable amount of the following intangible assets at least at each financial year end even if there is no indication that the asset is impaired: (a) an intangible asset that is not yet available for use; and (b) an intangible asset that is amortised over a period exceeding ten years from the date when the asset is available for use. <strong>AS 26</strong> requires an enterprise to test for impairment, at least annually, the carrying amount of an intangible asset that is not yet available for use. Example: X limited is developing a customized software for ` 10 Cr. It will take 3 years to complete development. Present value of future economic benefit is considered to be ` 15 Cr. After 2 years, 70% work is completed. However, due to change in market conditions, present value of future economic benefits are estimated to be ` 6 Cr only. Company should recognize ` 1 Cr as impairment loss on &quot;Intangible asset under development” as per <strong>AS 28</strong>. Only ` 6 Cr can be shown as &quot;Intangible asset under development”. Company cannot capitalize any further amount till the time recoverable amount increases even if work of ` 10 Cr is completed. <PdfRef page={1} />
          </p>
          
        </section>

        {/* Section: 6.25 RETIREMENTS AND DISPOSALS */}
        <section id="as-26-retirements-and-disposals" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-retirements-and-disposals" num="6.25" title="RETIREMENTS AND DISPOSALS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            An intangible asset should be derecognised (eliminated from the balance sheet) if ➢ disposed or ➢ when no future economic benefits are expected from its use and subsequent disposal. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 22 ---  Gains or losses arising from the retirement or disposal of an intangible asset should be determined as the difference between the net disposal proceeds and the carrying amount of the asset and should be recognised as income or expense in the statement of profit and loss. An intangible asset that is retired from active use and held for disposal is carried at its carrying amount at the date when the asset is retired from active use.</li>
          </ul>
          
        </section>

        {/* Section: 6.26 DISCLOSURE */}
        <section id="as-26-disclosure" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-disclosure" num="6.26" title="DISCLOSURE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The financial statements should disclose the following for each class of intangible assets, distinguishing between internally generated intangible assets and other intangible assets: 1. The useful lives or the amortisation rates used. 2. The amortisation methods used. 3. The gross carrying amount and the accumulated amortisation (aggregated with accumulated impairment losses) at the beginning and end of the period. 4. A reconciliation of the carrying amount at the beginning and end of the period showing: I. Additions, indicating separately those from internal development and through amalgamation. II. Retirements and disposals. III. Impairment losses recognised in the statement of profit and loss during the period. IV Impairment losses reversed in the statement of profit and loss during the period. V Amortisation recognised during the period and VI Other changes in the carrying amount during the period. A class of intangible assets is a grouping of assets of a similar nature and use in an enterprise&apos;s operations. Examples of separate classes may include: <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 23 ---  (a) brand names; (b) mastheads and publishing titles; (c) computer software; (d) licences and franchises; (e) copyrights, and patents and other industrial property rights, service and operating rights; (f) recipes, formulae, models, designs and prototypes; and (g) intangible assets under development.</li>
          </ul>
          
        </section>

        {/* Section: 6.27 OTHER DISCLOSURES */}
        <section id="as-26-other-disclosures" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-26-other-disclosures" num="6.27" title="OTHER DISCLOSURES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The financial statements should also disclose: a. If an intangible asset is amortised over more than ten years, the reasons why it is presumed that the useful life of an intangible asset will exceed ten years from the date when the asset is available for use. In giving these reasons, the enterprise should describe the factor(s) that played a significant role in determining the useful life of the asset. b. A description, the carrying amount and remaining amortisation period of any individual intangible asset that is material to the financial statements of the enterprise as a whole. c. The existence and carrying amounts of intangible assets whose title is restricted and the carrying amounts of intangible assets pledged as security for liabilities and d. The amount of commitments for the acquisition of intangible assets. The financial statements should disclose the aggregate amount of research and development expenditure recognised as an expense during the period. An enterprise is encouraged, but not required, to give a description of any fully amortised intangible asset that is still in use. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 24 ---  Illustration 1 ABC Ltd. developed know-how by incurring expenditure of ` 20 lakhs, The know-how was used by the company from.20X1. The useful life of the asset is 10 years from the year of commencement of its use. The company has not amortised the asset till.20X8. Pass Journal entry to give effect to the value of know-how as per Accounting Standard-26 for the year ended.20X8. Solution Journal Entry ` ` Profit and Loss A/c (Prior period item) Dr. 12,00,000 Amortization A/c Dr. 2,00,000 To Know-how A/c 14,00,000 [Being amortization of 7 years (out of which amortization of 6 years charged as prior period item)] Illustration 2 The company had spent ` 45 lakhs for publicity and research expenses on one of its new consumer product, which was marketed in the accounting year 20X1-20X2, but proved to be a failure. State, how you will deal with the following matters in the accounts of U Ltd. for the year ended 31st March, 20X2. Solution In the given case, the company spent ` 45 lakhs for publicity and research of a new product which was marketed but proved to be a failure. It is clear that in future there will be no related further revenue/benefit because of the failure of the product. Thus, according to AS 26 ‘Intangible Assets’, the company should charge the total amount of ` 45 lakhs as an expense in the profit and loss account.  As per para 63 of AS 26 “Intangible Assets”, there is a rebuttable presumption that the useful life of an intangible asset will not exceed ten years from the date when the asset is available for use. Amortisation should commence when the asset is available for use.</li>
            <li>-- PAGE 25 ---  Illustration 3 A company with a turnover of ` 250 crores and an annual advertising budget of ` 2 crores had taken up the marketing of a new product. It was estimated that the company would have a turnover of ` 25 crores from the new product. The company had debited to its Profit and Loss account the total expenditure of ` 2 crore incurred on extensive special initial advertisement campaign for the new product. Is the procedure adopted by the company correct? Solution According to AS 26 ‘Intangible Assets’, “expenditure on an intangible item should be recognised as an expense when it is incurred unless it forms part of the cost of an intangible asset”. AS 26 mentions that expenditure on advertising and promotional activities should be recognised as an expense when incurred. In the given case, advertisement expenditure of ` 2 crores had been taken up for the marketing of a new product which may provide future economic benefits to an enterprise by having a turnover of ` 25 crores. Here, no intangible asset or other asset is acquired or created that can be recognised. Therefore, the accounting treatment by the company of debiting the entire advertising expenditure of ` 2 crores to the Profit and Loss account of the year is correct. Reference: The students are advised to refer the full text of AS 28 “Intangible Assets” (issued 2002).</li>
            <li>-- PAGE 26 ---  TEST YOUR KNOWLEDGE Multiple Choice Questions 1. Which of the following is not covered within the scope of AS 26? (a) Intangible assets held-for-sale in the ordinary course of business (b) Assets arising from employee benefits (c) (a) &amp; (b) both (d) Research and development activities 2. Intangible asset is recognised if it: (a) meets the definition of an intangible asset (b) is probable that future economic benefits will flow (c) the cost can be measured reliably (d) meets all of the above parameters 3. Sun Limited has purchased a computer with various additional software. These are integral part of the computer. Which of the following are true in the context of AS 26: (a) Recognise Computer and software as tangible asset (b) Recognise tangible and intangible separately (c) Recognise computer and software as intangible asset (d) Does not recognize the software as an asset. 4. Hexa Ltd developed a technology to enhance the battery life of mobile devices. Hexa has capitalised development expenditure of ` 5,00,000. Hexa estimates the life of the technology developed to be 3 years but the company has forecasted that 50% of sales will be in year 1, 35% in year 2 and 15% in year 3. What should be the amortisation charge in the second year of the product’s life? (a) ` 2,50,000 (b) ` 1,75,000</li>
            <li>-- PAGE 27 ---  (c) ` 1,66,667 (d) ` 1,85,000 Theoretical Questions 5. What is meant by Intangible Assets and what are the important factors to consider the recognition of item as an Intangible asset? What is the recognition criteria in accordance with the provisions of AS 26? 6. What is the measurement criteria at the time of initial recognition of Intangible assets acquired through separate acquisition? 7. What is the criteria for recognition and measurement of Internally generated intangible assets. Describe which kind of cost is considered for capitalisation with respect to provisions of AS 26. Whether the same applies for internally generated goodwill also? 8. Advise the complete accounting treatment for Research and development phase as per AS 26. 9. What is meant by Amortisation of an Intangible asset. What are the different methods for amortisation as per AS 26? Scenario based Questions 10. Swift Ltd. acquired a patent at a cost of ` 80,00,000 for a period of 5 years and the product life-cycle is also 5 years. The company capitalized the cost and started amortizing the asset at ` 10,00,000 per annum. The company had amortized the patent at 10,00,000 per annum in first two years on the basis of economic benefits derived from the product manufactured under the patent. After two years it was found that the product life-cycle may continue for another 5 years from then. The patent was renewable and Swift Ltd. got it renewed after expiry of five years. The net cash flows from the product during these 5 years were expected to be ` 36,00,000, ` 46,00,000, ` 44,00,000, ` 40,00,000 and ` 34,00,000. Find out the amortization cost of the patent for each of the years.</li>
            <li>-- PAGE 28 ---  11. AB Ltd. launched a project for producing product X in October, 20X1. The Company incurred ` 20 lakhs towards Research. Due to prevailing market conditions, the Management came to conclusion that the product cannot be manufactured and sold in the market for the next 10 years. The Management hence wants to defer the expenditure write off to future years. Advise the Company as per the applicable Accounting Standard. 12. During 20X1-X2, an enterprise incurred costs to develop and produce a routine low risk computer software product, as follows: Particular ` Completion of detailed program and design (Phase 1) 50,000 Coding and Testing (Phase 2) 40,000 Other coding costs (Phase 3 &amp; 4) 63,000 Testing costs (Phase 3 &amp; 4) 18,000 Product masters for training materials (Phase 5) 19,500 Packing the products (1,500 units) (Phase 6) 16,500 After completion of phase 2, it was established that the product is technically feasible for the market. You are required to state how the above referred cost to be recognized in the books of accounts. 13. As per provisions of AS-26, how would you deal to the following situations: (1) ` 23,00,000 paid by a manufacturing company to the legal advisor for defending the patent of a product is treated as a capital expenditure. (2) During the year 20X1-X2, a company spent ` 7,00,000 for publicity and research expenses on one of its new consumer product which was marketed in the same accounting year but proved to be a failure. (3) A company spent ` 25,00,000 in the past three years to develop a product, these expenses were charged to profit and loss account since they did not meet AS-26 criteria for capitalization. In the current year</li>
            <li>-- PAGE 29 ---  approval of the concerned authority has been received. The company wishes to capitalize ` 25,00,000 by disclosing it as a prior period item. (4) A company with a turnover of ` 200 crores and an annual advertising budget of ` 50,00,000 had taken up for the marketing of a new product by a company. It was estimated that the company would have a turnover of ` 20 crore from the new product. The company had debited to its Profit &amp; Loss Account the total expenditure of ` 50,00,000 incurred on extensive special initial advertisement campaign for the new product. ANSWERS/SOLUTIONS Answer to the Multiple Choice Questions 1. (c) 2. (d) 3. (a) 4. (b) Answer to the Theoretical Questions 5. An intangible asset is an identifiable non-monetary asset, without physical substance, held for use in the production or supply of goods or services, for rental to others, or for administrative purposes. Below are the 3 key ingredients to be satisfied to cover an item as an intangible asset under this standard: • identifiability, • control over a resource and • expectation (i.e. probable – 50% plus) of future economic benefits flowing to the enterprise. The recognition of an item as an intangible asset requires an enterprise to demonstrate that the item meets the definition of an intangible asset and recognition criteria set out as below: a. It is probable that the future economic benefits that are attributable to the asset will flow to the enterprise; and b. The cost of the asset can be measured reliably.</li>
            <li>-- PAGE 30 ---  6. If an intangible asset is acquired separately, the cost of the intangible asset can usually be measured reliably. This is particularly so when the purchase consideration is in the form of cash or other monetary assets. The cost of an intangible asset comprises: • its purchase price, • any import duties and other taxes (other than those subsequently recoverable by the enterprise from the taxing authorities), and • any directly attributable expenditure on making the asset ready for its intended use. Directly attributable expenditure includes, for example, professional fees for legal services. • Any trade discounts and rebates are deducted in arriving at the cost. 7. To assess whether an internally generated intangible asset meets the criteria for recognition, an enterprise classifies the generation of the asset into 2 phases: ➢ Research Phase &amp; ➢ Development Phase Research Phase - The expenses related to Research phase is expensed off in statement of Profit and loss. Development Phase - Development is the application of research findings or other knowledge to a plan or design for the production of new or substantially improved materials, devices, products, processes, systems or services prior to the commencement of commercial production or use. An intangible asset arising from development (or from the development phase of an internal project) should be recognised if, and only if, an enterprise can demonstrate all of the conditions given in para. Cost of an Internally Generated Intangible Asset The cost of an internally generated intangible asset is the sum of expenditure incurred from the time when the intangible asset first meets the recognition criteria. Reinstatement of expenditure recognised as an expense in previous annual financial statements or interim financial reports is prohibited. The cost of an internally generated intangible asset comprises all</li>
            <li>-- PAGE 31 ---  expenditure that can be directly attributed, or allocated on a reasonable and consistent basis, to creating, producing and making the asset ready for its intended use from the time when the intangible asset first meets the recognition criteria. For details, refer para. Internally generated goodwill is not recognised as an asset because it is not an identifiable resource controlled by the enterprise that can be measured reliably at cost. 8. Research phase means acquisition of knowledge and Development phase means application of knowledge. The expenditure related to Research phase is expensed off in statement of Profit and loss. However, the expenditure incurred in Development phase is capitalised as a cost of the internally generated intangible asset. If an enterprise cannot distinguish the research phase from the development phase of an internal project to create an intangible asset, the enterprise treats the expenditure on that project as if it were incurred in the research phase only. 9. Amortisation is the systematic allocation of the depreciable amount of an intangible asset over its useful life. The amortisation method used should reflect the pattern in which the asset&apos;s economic benefits are consumed by the enterprise. If that pattern cannot be determined reliably, the straight-line method should be used. A variety of amortisation methods can be used to allocate the depreciable amount of an asset on a systematic basis over its useful life. These methods include • the straight-line method, • the diminishing balance method and • the unit of production method. The method used for an asset is selected based on the expected pattern of consumption of economic benefits and is consistently applied from period to period, unless there is a change in the expected pattern of consumption of economic benefits to be derived from that asset.</li>
            <li>-- PAGE 32 ---  Answer to the Scenario based Questions 10. Swift Limited amortised ` 10,00,000 per annum for the first two years i.e. ` 20,00,000. The remaining carrying cost can be amortised during next 5 years on the basis of net cash flows arising from the sale of the product. The amortisation may be found as follows: S Net cash flows ` Amortisation Ratio Amortisation Amount ` I - 0.125 10,00,000 II - 0.125 10,00,000 III 36,00,000 10,80,000 IV 46,00,000 13,80,000 V 44,00,000 13,20,000 VI 40,00,000 12,00,000 VII 34,00,000 10,20,000 Total 2,00,00,000 80,00,000 It may be seen from above that from third year onwards, the balance of carrying amount i.e., ` 60,00,000 has been amortised in the ratio of net cash flows arising from the product of Swift Ltd. 11. As per para 41 of AS 26 “Intangible Assets”, expenditure on research should be recognised as an expense when it is incurred. Hence, the expenses amounting ` 20 lakhs incurred on the research has to be charged to the statement of profit and loss in the current year ending 31st March, 20X2. 12. As per AS 26, costs incurred in creating a computer software product should be charged to research and development expense when incurred until technological feasibility/asset recognition criteria has been established for the product. Technological feasibility/asset recognition criteria have been established upon completion of detailed program design, coding and testing. In this case, ` 90,000 would be recorded as an expense (` 50,000 for completion of detailed program design and ` 40,000 for coding and testing to establish technological feasibility/asset recognition criteria). Cost incurred from the point of technological feasibility/asset recognition criteria</li>
            <li>-- PAGE 33 ---  until the time when products costs are incurred are capitalized as software cost (63,000+ 18,000+ 19,500) = ` 1,00,500. Packing cost ` 16,500 should be recognized as expenses and charged to P &amp; L A/c. 13. As per AS 26 “Intangible Assets”, subsequent expenditure on an intangible asset after its purchase or its completion should be recognized as an expense when it is incurred unless (a) it is probable that the expenditure will enable the asset to generate future economic benefits in excess of its originally assessed standard of performance; and (b) expenditure can be measured and attributed to the asset reliably. If these conditions are met, the subsequent expenditure should be added to the cost of the intangible asset. (i) In the given case, the legal expenses to defend the patent of a product amounting ` 23,00,000 should not be capitalized and be charged to Profit and Loss Statement. (ii) The company is required to expense the entire amount of ` 7,00,000 in the Profit and Loss account for the year ended 31st March, 20X2 because no benefit will arise in the future. (iii) As per AS 26, expenditure on an intangible item that was initially recognized as an expense by a reporting enterprise in previous annual financial statements should not be recognized as part of the cost of an intangible asset at a later date. Thus the company cannot capitalize the amount of ` 25,00,000 and it should be recognized as expense (iv) Expenditure of ` 50,00,000 on advertising and promotional activities should always be charged to Profit and Loss Statement. Hence, the company has done the correct treatment by debiting the sum of 50 lakhs to Profit and Loss Account.</li>
          </ul>
          
        
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 26**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 26, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
