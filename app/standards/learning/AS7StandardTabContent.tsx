'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, ChevronDown } from 'lucide-react'

export const as7Sections = [
  { id: 'as-7-intro-sec', title: '1. Introduction & Objectives' },
  { id: 'as-7-significance-of-the-standard', title: '1.1 SIGNIFICANCE OF THE STANDARD' },
  { id: 'as-7-introduction', title: '1.2 INTRODUCTION' },
  { id: 'as-7-combining-and-segmenting', title: '1.3 COMBINING AND SEGMENTING' },
  { id: 'as-7-types-of-construction-contracts', title: '1.4 TYPES OF CONSTRUCTION CONTRACTS' },
  { id: 'as-7-contract-revenue-and-costs', title: '1.5 CONTRACT REVENUE AND COSTS' },
  { id: 'as-7-percentage-completion-method', title: '1.6 PERCENTAGE COMPLETION METHOD' },
  { id: 'as-7-treatment-of-costs-relating-to', title: '1.7 TREATMENT OF COSTS RELATING TO' },
  { id: 'as-7-uncollectable-contract-revenue', title: '1.8 UNCOLLECTABLE CONTRACT REVENUE' },
  { id: 'as-7-stage-of-completion', title: '1.9 STAGE OF COMPLETION' },
  { id: 'as-7-changes-in-estimates', title: '1.10 CHANGES IN ESTIMATES' },
  { id: 'as-7-disclosure', title: '1.11 DISCLOSURE' }
];

interface AS7StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function AS7StandardTabContent({ navigateToPdfPage }: AS7StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as-7-intro-sec');
  const tocScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(id);
    const stickyToc = document.getElementById('as-7-standard-sticky-toc');
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

      as7Sections.forEach((sec) => {
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
      <div id="as-7-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as7Sections.map(sec => (
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
        <section id="as-7-intro-sec" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-7-intro-sec" num="1" title="1. Introduction &amp; Objectives" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ❑ a CHAPTER 8* REVENUE BASED ACCOUNTING STANDARDS UNIT 1 : ACCOUNTING STANDARD 7 CONSTRUCTION CONTRACTS After studying this unit, you will be able to comprehend the provisions of <strong>AS 7</strong> related with: • Introduction and Scope of Construction Contract • Combining and Segmenting Construction Contracts • What is included in Contract Revenue • What is included and excluded in Contract Costs • <strong>Recognition</strong> of Contract Revenue and Expenses • <strong>Recognition</strong> of Expected Losses • Changes in Estimates • <strong>Disclosures</strong>. CHAPTER <PdfRef page={1} />
          </p>
          
        </section>

        {/* Section: 1.1 SIGNIFICANCE OF THE STANDARD */}
        <section id="as-7-significance-of-the-standard" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-7-significance-of-the-standard" num="1.1" title="SIGNIFICANCE OF THE STANDARD" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The need to have a standard for construction contracts and their accounting arises since the construction contracts generally cover more than one accounting period. Common examples of construction include construction of flyovers, dams, metro line, buildings etc. For example, if entity XY submits a tender to construct a flyover for a state government, the construction of that flyover might take 2 to 3 years of time, depending on the scope of the contract. This standard addresses the requirements for recognition &amp; measurement (i.e., the timing and amount) of construction revenue and construction costs. The entity that is required to complete the construction is referred to as Contractor and the customer who requires the construction to be completed is referred to as Contractee/Customer. Peculiar Features of Construction contracts Takes more than one accounting year to complete Final outcome determined after no. of years from year of commencement of construction Allocation of contract revenue and contract cost tothe accounting period in which construction work is performed Long term projects Start of construction (Year 1) End of construction (Year 3) Work in Progress <PdfRef page={2} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.3 The above discussion clearly indicates that there are two parties to the construction contract. Thus, if there is an entity which requires its engineering division to construct a machine for the production division, this would not meet the scope of <strong>AS 7</strong>. It will be addressed by <strong>AS 10</strong> (Property, plant and equipment) and will be accounted as a case of self-constructed asset. <PdfRef page={3} />
          </p>
          
        </section>

        {/* Section: 1.2 INTRODUCTION */}
        <section id="as-7-introduction" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-7-introduction" num="1.2" title="INTRODUCTION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            <strong>Accounting Standard</strong> 7 prescribes the principles of accounting for construction contracts in the financial statements of contractors. The focus of the standard is to determine when the contractor should recognise contract revenue and contract costs in the statement of profit and loss. A construction contract is a contract specifically negotiated for the construction of an asset or a combination of assets that are closely interrelated or interdependent in terms of their design, technology and function or their ultimate purpose or use. A construction contract may be negotiated for the construction of a single asset such as a bridge, building, dam, pipeline, road, ship or tunnel. A construction contract may also deal with the construction of a number of assets which are closely interrelated or interdependent in terms of their design, technology and function or their ultimate purpose or use; examples of such contracts include those for the construction of refineries and other complex pieces of plant or equipment. For the purposes of this Standard, construction contracts also include: (a) contracts for the rendering of services which are directly related to the construction of the asset, for example, those for the services of project managers and architects; and (b) contracts for destruction or restoration of assets, and the restoration of the environment following the demolition of assets. <PdfRef page={3} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Example 1 Entity XY contracts with AB to construct 2 residential buildings in the same premises. The construction of both buildings will begin simultaneously. Building material, construction work, and other related activities will go on in parallel to provide cost savings to entity XY. This also helps AB achieve a timely completion of the two buildings and negotiate a consolidated price for the two buildings. The above example suggests that there is a single contract negotiated to construct two buildings that are closely interrelated and interdependent in terms of their ultimate purpose and use. Therefore, this represents a Construction Contract. Example 2 H, a sole-proprietor, contracts with M/s DM Construction, to dismantle his office premises and construct it from scratch. In the given case, the construction contract includes both demolition as well as construction of a new building. <PdfRef page={4} />
          </p>
          
        </section>

        {/* Section: 1.3 COMBINING AND SEGMENTING */}
        <section id="as-7-combining-and-segmenting" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-7-combining-and-segmenting" num="1.3" title="COMBINING AND SEGMENTING" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            CONSTRUCTION CONTRACTS A contractor may undertake a number of contracts. The standard identifies certain cases where for the purposes of accounting, it is necessary to apply the Standard to the separately identifiable components of a single contract or to a group of contracts together in order to reflect the substance of a contract or a group of contracts. What are construction Contracts? Contracts specifically negotiated for the construction of an asset or combination of assets that are closely interrelated Contracts for rendering of services related to construction of assets Contracts for destruction or restoration of assets. <PdfRef page={4} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.5 (a) When a contract covers a number of assets, the construction of each asset should be treated as a separate construction contract when: (i) separate proposals have been submitted for each asset; (ii) each asset has been subject to separate negotiation and the contractor and customer have been able to accept or reject that part of the contract relating to each asset; and (iii) the costs and revenues of each asset can be identified. (b) A group of contracts, whether with a single customer or with several customers, should be treated as a single construction contract when: (i) the group of contracts is negotiated as a single package; (ii) the contracts are so closely interrelated that they are, in effect, part of a single project with an overall profit margin; and (iii) the contracts are performed concurrently or in a continuous sequence. (c) A contract may provide for the construction of an additional asset at the option of the customer or may be amended to include the construction of an additional asset. The construction of the additional asset should be treated as a separate construction contract when: (i) the asset differs significantly in design, technology or function from the asset or assets covered by the original contract; or (ii) the price of the asset is negotiated without regard to the original contract price. Illustration 1 XYZ construction Ltd, a construction company undertakes the construction of an industrial complex. It has separate proposals raised for each unit to be constructed in the industrial complex. Since each unit is subject to separate negotiation, he is able to identify the costs and revenues attributable to each unit. Should XYZ Ltd, treat construction of each unit as a separate construction contract according to <strong>AS 7</strong>? <PdfRef page={5} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Solution As per <strong>AS 7</strong> ‘Construction Contracts’, when a contract covers a number of assets, the construction of each asset should be treated as a separate construction contract when: (a) separate proposals have been submitted for each asset; (b) each asset has been subject to separate negotiation and the contractor and customer have been able to accept or reject that part of the contract relating to each asset; and (c) the costs and revenues of each asset can be identified. Therefore, XYZ Ltd. is required to treat construction of each unit as a separate construction contract. <PdfRef page={6} />
          </p>
          
        </section>

        {/* Section: 1.4 TYPES OF CONSTRUCTION CONTRACTS */}
        <section id="as-7-types-of-construction-contracts" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-7-types-of-construction-contracts" num="1.4" title="TYPES OF CONSTRUCTION CONTRACTS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            In a fixed price contract, the price is agreed as fixed sum or a fixed rate per unit of output. In some cases, the contract may require the customer to pay additional sums to compensate the contractor against cost escalations. Fixed price contracts are common in case of public tenders (construction of roads, flyovers, office buildings). Such constructions usually have a budgeted costs and the public entity does not intend to spend more than the tender amount. At the same time, there can be various reasons where the cost of construction may increase. For example, a sudden increase in wage rates, construction material Types of construction contracts Fixed price contract Contractor agrees to a fixed contract price or fixed rate per unit of output, which in some cases is subject to cost escalation. Cost plus contract Contractor is reimbursed for allowable or otherwise defined costs, plus percentage of these costs or a fixed fee. <PdfRef page={6} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.7 costs, may require the contractor to add cost-escalation clauses and recover from the contractee. These cost escalations still meet the category of fixed price contracts. A cost-plus contract is a construction contract in which the contractor is reimbursed for allowable or otherwise defined costs, plus percentage of these costs or a fixed fee. Cost-plus contracts are common in case there is uncertainty of measurement of costs or time of completion. In such cases, a contractor does not expect to bear the loss due to those uncertainties. For example, if the scope of the contract cannot be fully assessed in the contract, both parties may agree to cost-plus contracts. Under such contracts, the contractor is compensated for the costs incurred by him plus agreed profit-margin. <PdfRef page={7} />
          </p>
          
        </section>

        {/* Section: 1.5 CONTRACT REVENUE AND COSTS */}
        <section id="as-7-contract-revenue-and-costs" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-7-contract-revenue-and-costs" num="1.5" title="CONTRACT REVENUE AND COSTS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            (A) Contract revenue should comprise: (i) the initial amount of revenue agreed in the contract; and (ii) variations in contract work, claims and incentive payments to the extent that it is probable that they will result in revenue and they are capable of being reliably measured. Contract revenue includes: Agreed price (fixed / Cost-plus price) Plus: Agreed Cost escalation Plus: Claims (reimbursement for costs not included in the contract price) Plus: Incentive payments (usually for early completion) Less: Penalties (usually for late completion) Adjusted for Variations  Claims are only included in contract revenue when it is probable that the customer will accept the claim and such claim amount can be measured reliably  Incentives are only included in the contract revenue when it is probable that the specified performance standards will be met or exceeded, and such incentive payment can be measured reliably) <PdfRef page={7} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Illustration 2 AB contactors enters into a contract on 1st January 20X1 with XY to construct a 5- storied building. Under the contract, AB is required to complete the construction in 3 years (i.e., by 31st December 20X3). The following information is relevant: Fixed price (agreed) ₹5 crore Material cost escalation (to the extent of 20% of increase in material cost) Labour cost escalation (up to 30% of increase in minimum wages) In case AB is able to complete the construction in less than 2 years and 10 months, it will be entitled for an additional incentive of ₹50 lakh. However, in case the construction is delayed beyond 3 years and 2 months, XY will charge a penalty of ₹20 lakh. At the start of the contract, AB has a reason to believe that construction will be completed in 2 years and 8 months. Assume that the construction was actually completed in 2 years 9 months. Labour cost was originally estimated to be ₹1.20 crore (based on initial minimum wages). However, the costs have increased by 25% during the construction period. Material costs have increased by 40% due to short-supply. The total increase in material cost due to the 40% escalation is ₹80 lakh. You are required to suggest what should be the contract revenue in above case? Assume that in year 20X2, XY has requested AB to increase the scope of the contract. An additional floor is required to be constructed and there is an increase in contract fee by ₹1 crore. AB has incurred a cost of ₹20 lakh for getting the local authority approvals which it will be entitled to claim from XY in addition to the increase in the fixed fee. Also measure the total contract revenue in this case. Contract Revenue Initially agreed amount variations in contract work, claims and incentive payments (if capable of being recognized as revenue) <PdfRef page={8} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.9 Solution Total Revenue after considering the escalation costs, claims and incentives: ` Fixed Price: 5.00 crore Incentive for early completion crore Material costs recovery (to the extent of 20%) 0.40 crore Labour costs recovery (Actual increase is less than 30%) 0.30 crore [1.20 crore x 25%] Total Contract Revenue crore Add: Variation to the contract crore Add: Claims recoverable from XY crore Total Contract Revenue crore (B) Contract costs should comprise: (i) costs that relate directly to the specific contract; (ii) costs that are attributable to contract activity in general and can be allocated to the contract; and (iii) such other costs as are specifically chargeable to the customer under the terms of the contract. NOTE: 1. Examples of costs that relate directly to a specific contract include: (a) site labour costs, including site supervision (b) costs of materials used in construction Contract Costs costs that relate directly to the specific contract; costs that are attributable to contract activity in general and can be allocated to the contract; other costs as are specifically chargeable to the customer under the terms of the contract. <PdfRef page={9} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            (c) depreciation of plant and equipment used on the contract (d) costs of moving plant, equipment and materials to and from the contract site (e) costs of hiring plant and equipment (f) costs of design and technical assistance that is directly related to the contract (g) the estimated costs of rectification and guarantee work, including expected warranty costs (h) claims from third parties Note: Direct costs can be reduced by incidental income that is not included in contract revenue, e.g., sale of surplus material and disposal of plant and equipment. 2. Example of costs that may be attributable to contract activity in general and can be allocated to specific contracts include: (a) insurance (b) costs of design and technical assistance that is not directly related to a specific contract (c) construction overheads The allocation of indirect costs should be based on normal levels of construction activity. The allocable costs may include borrowing costs as per <strong>AS 16</strong>. 3. Examples of costs that cannot be attributed to contract activity or cannot be allocated to a contract are excluded from the costs of a construction contract. Such costs include: (a) general administration costs for which reimbursement is not specified in the contract (b) selling costs (c) research and development costs for which reimbursement is not specified in the contract (d) depreciation of idle plant and equipment that is not used on a particular contract <PdfRef page={10} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.11 Example 3: Cost-Plus contract The language can be changed as under (Entire Question): ABC Constructions has a contract to build an office building. The terms and conditions are as under: 1. ABC’s profit is agreed at: • 25% on expected contract’s cost; For this purpose, the expected cost cannot exceed ₹ 22 crores. 2. The agreed price will be revised depending upon the actual cost incurred. • The cost for fixation will be taken actual cost or ₹ 22 crores whichever is less. Price fixation based on expected cost: Assume that the costs expected to be incurred by ABC are ₹16 crore. Thus, ABC can charge a profit of ₹ 4 crores (25% on actual cost). The contract price will be ₹ 20 crores. (₹16 crores plus ₹ 4 crores) Price fixation based on actual cost incurred – Scenario 1: However, if cost incurred by ABC is ₹15 crore, in that case, it would be able to charge a profit of: = 25% on ₹15 crore = 15 x 25% = ₹ 3.75 crore Thus, Total Value of the contract will stand revised as follows: = Actual Costs + Profit (25% of costs) = ₹ 15 crore + ₹ 3.75 crore = ₹ 18.75 crores. Price fixation based on actual cost incurred – Scenario 2: For any unavoidable reasons, if total cost incurred by ABC is ₹ 25 crore, it can only charge a profit on the expected costs of ₹22 crore as under: Thus, Total Value of the contract will stand revised as follows: = Expected Costs + Profit (20% of costs) = ₹ 22 crore + ₹ 5.50 crore = ₹ 27.50 crores. Analysis of the above scenario: Cost actually incurred by ABC = ₹ 25 crores. Actual profit earned by ABC = Total Value of the contract – Actual costs incurred = ₹ 27.50 Crores – ₹ 25 Crores = ₹ 2.50 Crores. <PdfRef page={11} />
          </p>
          
        </section>

        {/* Section: 1.6 PERCENTAGE COMPLETION METHOD */}
        <section id="as-7-percentage-completion-method" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-7-percentage-completion-method" num="1.6" title="PERCENTAGE COMPLETION METHOD" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            As discussed in the beginning, Construction contracts are mostly long term, i.e., they take more than one accounting year to complete. This means, the final outcome (profit/ loss) of a construction contract can be determined only after a number of years from the year of commencement of construction are over. It is nevertheless possible to recognise revenue annually in proportion of progress of work to be matched with corresponding construction costs incurred in that year. This method of accounting, called the stage of completion method (percentage completion method), provides useful information on the extent of contract activity and performance during an accounting period. The method is consistent with <strong>Accrual</strong> and Matching concepts of accounting. <strong>AS 7</strong> prescribes that the percentage completion method should not be used unless it is possible to make a reasonable estimate of the final outcome of the contract. In reality, the actual profit or loss that is expected to be earned in such contracts is not possible. Therefore, companies make use of different estimates to arrive at the possible costs they are likely to incur for the construction. Large infra- structure companies, builders expect to carry the required industry-experience. On that basis, the pricing quoted by these companies for tenders take care of all possible costs and expected profit. Therefore, in substance, a reasonable estimate of the final outcome is possible in many such cases. As per <strong>AS 7</strong>, the outcome of fixed price contracts can be estimated reliably when all the following conditions are satisfied: (i) total contract revenue can be measured reliably; (ii) it is probable that the economic benefits associated with the contract will flow to the enterprise; (iii) both the contract costs to complete the contract and the stage of contract completion at the reporting date can be measured reliably; and (iv) the contract costs attributable to the contract can be clearly identified and measured reliably so that actual contract costs incurred can be compared with prior estimates. <PdfRef page={12} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.13 The outcome of a cost-plus contract can be estimated reliably when all the following conditions are satisfied: (i) it is probable that the economic benefits associated with the contract will flow to the enterprise; and (ii) the contract costs attributable to the contract, whether or not specifically reimbursable, can be clearly identified and measured reliably. Flowchart depicting the conditions under which the outcome of a construction contract can be reliably estimated: Outcome of contracts can be estimated reliably In fixed price contract Total contract revenue can be measured reliably. It is probable that the economic benefits associated with the contract will flow to the enterprise. Both contract costs to complete the contract and the stage of contract completion at the reporting date can be measured reliably. Contract costs attributable to contract can be clearly identified and measured reliably so that actual contract costs incurred can be compared with prior estimates. In cost plus contract It is probable that the economic benefits associated with the contract will flow to the enterprise. Contract costs attributable to the contract, whether or not specifically reimbursable, can be clearly identified and measured reliably. <PdfRef page={13} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Also, <strong>AS 7</strong> provides that whenever total contract cost is expected to exceed the total contract revenue, the loss should be recognised as an expense immediately. We may argue that why would an entity enter into a loss-making contract. It can happen that after having entered into the construction contract, there is a sudden rise in the costs which was not expected, nor are these covered under the cost- escalation clause. Another reason, is that, an entity may enter into a loss-making contract is to penetrate the market. Therefore, it is not uncommon for companies to sometimes enter into loss-making contracts. Under the prudence concept, we must always make a provision for all expected losses. Illustration 3 (Percentage completion method) X Ltd. commenced a construction contract on 01-04-20X1. The fixed contract price agreed was ₹2,00,000. The company incurred ₹81,000 in 20X1-X2 for 45% work and received ₹79,000 as progress payment from the customer. The cost incurred in 20X2-X3 was ₹89,000 to complete the rest of work. Show the extract of the Profit and Loss Account and Customer’s Account for the related years. If the final oucome of the contract Can be estimated reliably Revenue and costs recognised as per percantage of completion method considering the stage of completion of contract at reporting date. Cannot be estimated reliably Revenue should be recognised only to the extent of contrct costs incurred, of which recovery is probable Contract costs should be recognised as an expense in the period in which they are incurred and An expected loss on the construction contract should be recognised asan expense immediately in accordance with paragraph 35. <PdfRef page={14} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.15 Solution Profit &amp; Loss Account Year ` 000 Year ` 000 20X1-X2 To Construction Costs (for 45% work) 81 20X1-X2 By Contract Price (45% of Contract Price) 90 To Net profit (for 45% work) 9 90 90 20X2-X3 To Construction costs (for 55% work) 89 20X2-X3 By Contract Price (55% of Contract Price) 110 To Net Profit (for 55% work) 21 110 110 Customer’s Account Year ` 000 Year ` 000 20X1-X2 To Contract Price 90 20X1-X2 By Bank 79 By Balance c/d 11 90 90 20X2-X3 To Balance b/d 11 20X2-X3 To Contract Price 110 By Bank 121 121 121 <strong>AS 7</strong> provides that the percentage completion method should not be applied if the outcome of a construction contract cannot be estimated reliably. In such cases: <PdfRef page={15} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            (a) revenue should be recognised only to the extent of contract costs incurred of which recovery is probable; and (b) contract costs should be recognised as an expense in the period in which they are incurred. An expected loss on the construction contract should be recognised as an expense immediately in accordance with paragraph 35. Illustration 4 PQ &amp; Associates undertakes a construction contract the details of which are provided below: Total Contract Value ₹40 lakh Costs incurred to date ₹3 lakh Estimated future costs of completion ₹30 lakh Work completed 10% The work has started some time ago and there is an uncertainty with respect to the outcome of the contract due to expected changes in regulations. PQ is certain that it would be able to recover the costs incurred to date. Solution In the given case, revenue and costs can only be recognised to the extent of the costs incurred and those which are expected to be recovered. Therefore, the profit &amp; loss statement would appear as under: Contract Revenue ₹3 lakh Contract Costs ₹3 lakh Contract Profit Nil When the uncertainties that prevented the outcome of the contract being estimated reliably cease to exist, revenue and expenses associated with the construction contract should be recognised by the percentage completion method. <PdfRef page={16} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.17 Example 4 X Ltd. commenced a construction contract on 01/04/X1. The contract price agreed was reimbursable cost plus 10%. The company incurred ₹1,00,000 in 20X1-X2, of which cost of ₹90,000 is reimbursable. The further non-reimbursable costs to be incurred to complete the contract are estimated at ₹5,000. The other costs to complete the contract could not be estimated reliably. The Profit &amp; Loss A/c extract of X Ltd. for 20X1-X2 is shown below: Solution Profit &amp; Loss Account ` 000 ` 000 To Construction Costs 100 By Contract Price (90+9) 99 To Provision for loss 5 Net loss 6 105 105 <PdfRef page={17} />
          </p>
          
        </section>

        {/* Section: 1.7 TREATMENT OF COSTS RELATING TO */}
        <section id="as-7-treatment-of-costs-relating-to" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-7-treatment-of-costs-relating-to" num="1.7" title="TREATMENT OF COSTS RELATING TO" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            FUTURE ACTIVITY Under the percentage of completion method, contract revenue is recognised as revenue in the statement of profit and loss in the accounting periods in which the work is performed. Contract costs are usually recognised as an expense in the statement of profit and loss in the accounting periods in which the work to which they relate is performed. The contract costs that relate to future activity on the contract are however recognised as an asset provided it is probable that they will be recovered. Such costs represent an amount due from the customer and are often classified as contract work in progress. <PdfRef page={17} />
          </p>
          
        </section>

        {/* Section: 1.8 UNCOLLECTABLE CONTRACT REVENUE */}
        <section id="as-7-uncollectable-contract-revenue" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-7-uncollectable-contract-revenue" num="1.8" title="UNCOLLECTABLE CONTRACT REVENUE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            When an uncertainty arises about the collectability of an amount already included in contract revenue, and already recognised in the statement of profit and loss, the uncollectable amount or the amount in respect of which recovery has ceased <PdfRef page={17} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            to be probable is recognised as an expense rather than as an adjustment of the amount of contract revenue. <PdfRef page={18} />
          </p>
          
        </section>

        {/* Section: 1.9 STAGE OF COMPLETION */}
        <section id="as-7-stage-of-completion" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-7-stage-of-completion" num="1.9" title="STAGE OF COMPLETION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The stage of completion of a contract may be determined in a variety of ways. The enterprise uses the method that measures reliably the work performed. Depending on the nature of the contract, the methods may include: (a) the proportion that contract costs incurred for work performed up to the reporting date bear to the estimated total contract costs; or (b) surveys of work performed; or (c) completion of a physical proportion of the contract work. Progress payments and advances received from customers may not necessarily reflect the work performed. Calculation of Stage of completion under proportion of costs incurred method. This method may be useful in case of contracts where cost is closely monitored by the contractor. This method could be more commonly used in case of private contracts to construct office buildings, machinery or equipment. Actual cost incurred = ×100 Estimated total cost Actual cost incurred = ×100 Actual cost incurred + Estimated future costs Calculation of Stage of completion under Surveyor of work performed method Generally, in case of government projects, a surveyor is appointed to oversee various parameters like quality of work, material used, etc. Based on these parameters, the surveyor would assess the percentage of work completed. The certification done by the appointed surveyor is used as the percentage of work completed. <PdfRef page={18} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.19 Calculation of Stage of completion of a physical proportion of the contract work method This method is commonly used in case of construction work which is not very complicated. For example, a contract to place tiles can be regarded as complete on the basis of area covered as a proportion of total area expected to be covered. Thus, for example If the area to be covered is 1,000 sq. ft., and the total area already covered is 300 sq.ft., this implies that 30% of the work is completed. Illustration 5 (Stage of completion for a loss-making contract) Show Profit &amp; Loss A/c (Extract) in books of a contractor in respect of the following data for Year 1. Information for Year 1 ` 000 Contract price (Fixed) 600 Cost incurred to date 390 Estimated cost to complete 260 Assume that the contract period is 2 years. The contract is 100% completed by Year 2. Actual costs incurred is the same as total estimated costs to complete (Cost incurred to date plus estimated cost to complete). Solution Amount INR ` 000 Year (1) Total up to Year2 (2) Year 2 (2) – (1) A. Cost incurred to date (390) (650) (260) B. Estimate of cost to completion (260) - - C. Estimated total cost (650) 650 650 D. Degree of completion (A/C) 60% 100% 40% E. Revenue Recognised (60% of 600) (100% of 600) 360 600 240 <PdfRef page={19} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Total foreseeable loss (650 – 600) 50 Less: Loss for current year (E – A) (30) Expected loss to be recognised immediately Reversal of Loss provision in Year 2 (20) 20 Profit &amp; Loss A/c (Year 1) ` ` To Construction costs 390 By Contract Price 360 To Provision for loss 20 By Net Loss 50 410 410 Profit &amp; Loss A/c (Year 2) ` ` To Construction costs 260 By Contract Price 240 By Reversal of Provision for loss 20 260 260 <PdfRef page={20} />
          </p>
          
        </section>

        {/* Section: 1.10 CHANGES IN ESTIMATES */}
        <section id="as-7-changes-in-estimates" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-7-changes-in-estimates" num="1.10" title="CHANGES IN ESTIMATES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The percentage of completion method is applied on a cumulative basis in each accounting period to the current estimates of contract revenue and contract costs. Therefore, the effect of a change in the estimate of contract revenue or contract costs, or the effect of a change in the estimate of the outcome of a contract, is accounted for as a change in accounting estimate in accordance with <strong>AS 5</strong>. The changed estimates are used in determination of the amount of revenue and expenses recognised in the statement of profit and loss in the period in which the change is made and in subsequent periods. <PdfRef page={20} />
          </p>
          
        </section>

        {/* Section: 1.11 DISCLOSURE */}
        <section id="as-7-disclosure" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-7-disclosure" num="1.11" title="DISCLOSURE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            (a) An enterprise should disclose: (i) the amount of contract revenue recognised as revenue in the period; <PdfRef page={20} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.21 (ii) the methods used to determine the contract revenue recognised in the period; and (iii) the methods used to determine the stage of completion of contracts in progress. (b) An enterprise should disclose following in respect of contracts in progress at the reporting date: (i) the aggregate amount of costs incurred and recognised profits (less recognised losses) upto the reporting date; (ii) the amount of advances received; and (iii) the amount of retentions. • Retentions are amounts of progress billings which are not paid until the satisfaction of conditions specified in the contract for the payment of such amounts or until defects have been rectified. • Progress billings are amounts billed for work performed on a contract whether or not they have been paid by the customer. • Advances are amounts received by the contractor before the related work is performed. (c) An enterprise should present: (i) the gross amount due from customers for contract work as an asset; and (ii) the gross amount due to customers for contract work as a liability. Particulars ` Costs incurred xxx Plus: Recognised profits xxx Less: Recognised losses xxx Less: Progress billings xxx Amount xxx If above amount is positive- Gross amount due from customers If above amount is negative- Gross amount due to <PdfRef page={21} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            customers Illustration 6 A firm of contractors obtained a contract for construction of bridges across river Revathi. The following details are available in the records kept for the year ended 31st March, 20X1. ( ` in lakhs) Total Contract Price 1,000 Work Certified for the cost incurred 500 Work yet not Certified for the cost incurred 105 Estimated further Cost to Completion 495 Progress Payment Received 400 To be Received 140 The firm seeks your advice and assistance in the presentation of accounts keeping in view the requirements of <strong>AS 7</strong> issued by your institute. <strong>Disclosures</strong> in Financial Statements General Amount of contract revenue recognised as revenue in the period Methods used to determine the contract revenue recognised in the period Methods used to determine the stage of completion of contracts in progress Specific for contracts in progress Aggregate amount of costs incurred and recognised profits (less recognised losses) upto the reporting date Amount of advances received Amount of retentions. <PdfRef page={22} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.23 Solution (a) (` in lakhs) Amount of foreseeable loss: Total cost of construction (500 + 105 + 495) 1,100 Less: Total contract price (1,000) Total foreseeable loss to be recognized as expense 100 According <strong>AS 7</strong>, when it is probable that total contract costs will exceed total contract revenue, the expected loss should be recognized as an expense immediately. (b) (` in lakhs) Contract work-in-progress i.e. cost incurred to date are ₹ 605 lakhs Work certified 500 Work not certified 105 605 This is 55% (605/1,100  100) of total costs of construction. (c) Proportion of total contract value recognized as revenue: 55% of ` 1,000 lakhs = ` 550 lakhs (d) Gross Amount due from/to customers = (Contract costs + Recognized profits – Recognized Losses) – (Progress payments received + Progress payments to be received) = (605 + Nil – 100) – (400 + 140) ` in lakhs = [505 – 540] ` in lakhs Amount due to customers = ` 35 lakhs The amount of ` 35 lakhs will be shown in the balance sheet as liability. <PdfRef page={23} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            (e) The relevant disclosures under <strong>AS 7</strong> are given below: ` in lakhs Contract revenue 550 Contract expenses 605 Recognised profits less recognised losses (100) Progress billings ` (400 + 140) 540 Retentions (billed but not received from contractee) 140 Gross amount due to customers 35 Method of revenue recognition (use of percentage completion method) Method of determining state of completion (based on proportionate cost Illustration 7 On 1st December, 20X1, Vishwakarma Construction Co. Ltd. undertook a contract to construct a building for ` 85 lakhs. On 31st March, 20X2, the company found that it had already spent ` 64,99,000 on the construction. Prudent estimate of additional cost for completion was ` 32,01,000. What amount should be recognized in the statement of profit and loss for the year ended 31st March, 20X2 as per provisions of <strong>Accounting Standard</strong> 7 (Revised)? Solution ` Cost incurred till 31st March, 20X2 64,99,000 Prudent estimate of additional cost for completion 32,01,000 Total cost of construction 97,00,000 Less: Contract price (85,00,000) Total foreseeable loss 12,00,000 According to <strong>AS 7</strong>, the amount of ` 12,00,000 is required to be recognised as an expense. Contract work in progress =` 64,99,000 ×100 97,00,000 = 67% <PdfRef page={24} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.25 Proportion of total contract value recognised as turnover: = 67% of ` 85,00,000 = ` 56,95,000. The amount of expected loss will be split as under: Particulars Workings Amount Expected Loss 97,00,000– 85,00,000 12,00,000 Contract revenue 67% of 85,00,000 56,95,000 Contract cost Given 64,99,000 Actual loss 56,95,000– 64,99,000 8,04,000 Amount of provision required [As per Para 35] 12,00,000– 8,04,000 3,96,000 <PdfRef page={25} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            TEST YOUR KNOWLEDGE Multiple Choice Questions The below information relates to Questions 1 – 3: XY Ltd. agrees to construct a building on behalf of its client GH Ltd. on 1st April 20X1. The expected completion time is 3 years. XY Ltd. incurred a cost of ` 30 lakh up to 31st March 20X2. It is expected that additional costs of ` 90 lakh. Total contract value is ` 112 lakh. As at 31st March 20X2, XY Ltd. has billed GH Ltd. for ` 42 lakh as per the agreement. Assume that the work is completed to the extent of 75% by the end of Year 2. 1. Revenue to be recognized by XY Ltd. for the year ended 31st March 20X2 is (a) ` 28 lakh (b) ` 42 lakh (c) ` 30 lakh (d) ` 32 lakh 2. Total expense to be recognised in Year 1 is (a) ` 30 lakh (b) ` 120 lakh (c) ` 38 lakh (d) ` 36 lakh 3. Revenue to be recognised for year 2 is (a) ` 84 lakh (b) ` 42 lakh (c) ` 56 lakh (d) ` 28 lakh Below information relates to Questions 4 – 5 M/s AV has presented the information for Contract No. XY123: Total contract value ` 370 lakh <PdfRef page={26} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.27 Certified work completed ` 320 lakh Costs incurred to date ` 360 lakh Progress Payments received ` 300 lakh Expected future costs to be incurred ` 50 lakh. The revenue to be recognised based on the certified work completed. 4. Revenue to be recognised by M/s AV is (a) ` 320 lakh (b) ` 370 lakh (c) ` 360 lakh (d) ` 400 lakh 5. Total expense to be recognised by M/s AV is (a) ` 380 lakh (b) ` 400 lakh (c) ` 320 lakh (d) ` 360 lakh 6. LP Contractors undertakes a fixed price contract of ` 200 lakh. Transactions related to the contract include: Material purchased: ` 80 lakh Unused material: ` 30 lakh Labour charges: ` 60 lakh Machine used for 3 years for the contract. Original cost of the machine is ` 100 lakh. Expected useful life is 15 years. Estimated future costs to be incurred to complete the contract: ` 80 lakh. Loss on contract to be recognised is: (a) ` 40 lakh (b) ` 10 lakh (c) ` 90 lakh (d) ` 50 lakh <PdfRef page={27} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Theoretical Questions 7. It is argued that profit on construction contracts should not be recognised until the contract is completed. Please explain whether you believe that this suggestion would improve the quality of financial reporting for long-term construction contracts. 8. A contractor has entered into a contract with a municipal body for construction of a flyover. As per the contract terms, the contractor will receive an additional ` 2 Crore as incentive if the construction of the flyover were to be finished within a period of two years from the start of the contract. The contractor wants to recognize this revenue since in the past he has been able to meet similar targets very easily. Explain whether the contractor’s view-point is correct? Scenario based Questions 9. A construction contractor has a fixed price contract for ` 9,000 lakhs to build a bridge in 3 years time frame. A summary of some of the financial data is as under: (Amount ` in lakhs) Year 1 Year 2 Year 3 Initial Amount for revenue agreed in contract 9,000 9,000 9,000 Variation in Revenue (+) - 200 200 Contracts costs incurred up to the reporting date 2,093 6,168* 8,100** Estimated profit for whole contract 950 1,000 1,000 *Includes ` 100 lakhs for standard materials stored at the site to be used in year 3 to complete the work. **Excludes ` 100 lakhs for standard material brought forward from year 2. The variation in cost and revenue in year 2 has been approved by customer. <PdfRef page={28} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.29 Compute year wise amount of revenue, expenses, contract cost to complete and profit or loss to be recognized in the Statement of Profit and Loss as per AS-7 (revised). 10. Akar Ltd. Signed on 01/04/X1, a construction contract for ` 1,50,00,000. Following particulars are extracted in respect of contract, for the year ended 31/03/X2. - Materials used ` 71,00,000 - Labour charges paid ` 36,00,000 - Hire charges of plant ` 10,00,000 - Other contract cost incurred ` 15,00,000 - Labour charges of ` 2,00,000 are still outstanding on.X2. - It is estimated that by spending further ` 33,50,000 the work can be completed in all respect. You are required to compute profit/loss for the year to be taken to Profit &amp; Loss Account and any provision for foreseeable loss to be recognized as per <strong>AS 7</strong>. 11. RT Enterprises has entered into a fixed price contract for construction of a tower with its customer. Initial tender price agreed is ` 220 crore. At the start of the contract, it is estimated that total costs to be incurred will be ` 200 crore. At the end of year 1, this estimate stands revised to ` 202 crore. Assume that the construction is expected to be completed in 3 years. During year 2, the customer has requested for a variation in the contract. As a result of that, the total contract value will increase by ` 5 crore and the costs will increase by ` 3 crore. RT has decided to measure the stage of completion on the basis of the proportion of contract costs incurred to the total estimated contract costs. Contract costs incurred at the end of each year is: Year 1: ` 52.52 crore Year 2: ` 154.20 crore (including unused material of crore) Year 3: ` 205 crore. <PdfRef page={29} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            You are required to calculate: (a) Stage of completion for each year. (b) Profit to be recognised for each year. 12. On 1st December, 20X1, GR Construction Co. Ltd. undertook a contract to construct a building for ` 45 lakhs. On 31st March, 20X2, the company found that it had already spent ` 32.50 lakhs on the construction. Additional cost of completion is estimated at ` 15.10 lakhs. What amount should be charged to revenue in the final accounts for the year ended 31st March, 20X2 as per provisions of AS-7? ANSWERS/SOLUTIONS Answer to the Multiple Choice Questions 1. (a) 2. (c) 3. (c) 4. (a) 5. (d) 6. (b) Answer to the Theoretical Questions 7. Usually, construction contracts are long term nature i.e., the contracts are entered in one accounting period, however, the work performed will flow into more than one accounting year. If the profit on construction contracts is not recognised over the construction period, then the costs incurred during the earlier years of the contract would be recognised without any corresponding revenue. This will result in losses for initial years followed high profits in future years. The current treatment under <strong>AS 7</strong> results in matching of revenue and associated costs as they are recognised during the same period. Also, the current accounting incorporates the prudence concept as any foreseeable losses are accounted for immediately. Therefore, <strong>AS 7</strong> results in a fair representation of the underlying financial substance of the transaction. 8. The contractor’s view is not entirely correct in considering the variation as a part of contract revenue. There is an argument that he has been able to complete similar contracts within stipulated time. However, each contract needs to be assessed in isolation with respect to the specific challenges associated with the timing and uncertainty in completion. <PdfRef page={30} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.31 Accordingly, the contractor needs to validate the assumptions with respect to the specific contract. Only after that assessment is done, the incentive of ` 2 crore may be included within the contract revenue. Answer to the Scenario based Questions 9. The amounts of revenue, expenses and profit recognized in the statement of profit and loss in three years are computed below: (Amount in ` lakhs) Up to the reporting date Recognized in previous years Recognized in current year Year 1 Revenue (9,000 x 26%) Expenses (8,050 x 26%) 2,340 2,093 - - 2,340 2,093 Profit 247 - 247 Year 2 Revenue (9,200 x 74%) Expenses (8,200 x 74%) 6,808 6,068 2,340 2,093 4,468 3,975 Profit 740 247 493 Year 3 Revenue (9,200 x 100%) Expenses (8,200 x 100%) 9,200 8,200 6,808 6,068 2,392 2,132 Profit 1,000 740 260 Working Note: Year 1 Year 2 Year 3 Revenue after considering variations Less: Estimated profit for whole contract 9,000 950 9,200 1,000 9,200 1,000 Estimated total cost of the contract (A) 8,050 8,200 8,200 <PdfRef page={31} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Actual cost incurred upto the reporting date (B) 2,093 6,068 (6,168-100) 8,200 (8,100+100) Degree of completion (B/A) 26% 74% 100% 10. Statement showing the amount of profit/loss to be taken to Profit and Loss Account and additional provision for the foreseeable loss as per <strong>AS 7</strong> Cost of Construction ` ` Material used 71,00,000 Labour Charges paid 36,00,000 Add: Outstanding on.20X2 2,00,000 38,00,000 Hire Charges of Plant 10,00,000 Other Contract cost incurred 15,00,000 Cost incurred upto.20X2 1,34,00,000 Add: Estimated future cost 33,50,000 Total Estimated cost of construction 1,67,50,000 Degree of completion (1,34,00,000/1,67,50,000 x 100) 80% Revenue recognized (80% of 1,50,00,000) 1,20,00,000 Total foreseeable loss (1,67,50,000 - 1,50,00,000) 17,50,000 Less: Loss for the current year (1,34,00,000 - 1,20,00,000) 14,00,000 Loss to be provided for 3,50,000 11. (a) Stage of completion = Costs incurred to date / Total estimated costs Year 1: 52.52 crore / 202 crore = 26% Year 2: (154.20 crore – 2.50 crore) / 205 crore = 74% Year 3: 205 crore / 205 crore = 100% (b) Profit for the year Year 1 Year 2 Year 3 Contract Revenue (1) 57.20 crore crore crore <PdfRef page={32} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a8.33 (220 crore x 26%) (225 crore x 74% - 57.20 crore) (225 crore x 100% - 109.30 crore – 57.20 crore) Contract Cost (2) 52.52 crore crore crore (202 crore x 26%) (205 crore x 74% - 52.52 crore) (205 crore x 100% - 99.18 crore – 52.52 crore) Contract Profit (1) – (2) 4.68 crore crore crore 12. ` in lakhs Add: Estimated future cost Percentage of completion till date to total estimated cost of construction = (32.50/47.60)  100 = 68.28% Proportion of total contract value recognised as revenue for the year ended 31st March, 20X2 per <strong>AS 7</strong> (Revised) = Contract price x percentage of completion = ` 45 lakh x% = ` 30.73 lakhs. (` in lakhs) Less: Total contract price (45.00) According to of <strong>AS 7</strong>, when it is probable that total contract costs will exceed total contract revenue, the expected loss should be recognized as an expense immediately. <PdfRef page={33} />
          </p>
          
        
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 7**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 7, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
