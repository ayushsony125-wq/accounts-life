'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, ChevronDown } from 'lucide-react'

export const as15Sections = [
  { id: 'as-15-intro-sec', title: '1. Introduction & Objectives' },
  { id: 'as-15-introduction', title: '1.1 INTRODUCTION' },
  { id: 'as-15-applicability', title: '1.2 APPLICABILITY' },
  { id: 'as-15-meaning-of-the-term-employee', title: '1.3 MEANING OF THE TERM “EMPLOYEE' },
  { id: 'as-15-short-term-employee-benefits', title: '1.4 SHORT - TERM EMPLOYEE BENEFITS' },
  { id: 'as-15-po-st-employment-benefits-defined', title: '1.5 PO ST EMPLOYMENT BENEFITS: DEFINED' },
  { id: 'as-15-is-the-gratuity-scheme-a-defined', title: '1.6 IS THE GRATUITY SCHEME A DEFINED' },
  { id: 'as-15-accounting-treatment', title: '1.7 ACCOUNTING TREATMENT' },
  { id: 'as-15-disclosures', title: '1.8 DISCLOSURES' },
  { id: 'as-15-actuarial-assumptions', title: '1.9 ACTUARIAL ASSUMPTIONS' },
  { id: 'as-15-actuarial-gains-and-losses', title: '1.10 ACTUARIAL GAINS AND LOSSES' },
  { id: 'as-15-other-long-term-employee-benefits', title: '1.11 OTHER LONG TERM EMPLOYEE BENEFITS' },
  { id: 'as-15-termination-benefits', title: '1.12 TERMINATION BENEFITS' }
];

interface AS15StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function AS15StandardTabContent({ navigateToPdfPage }: AS15StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as-15-intro-sec');
  const tocScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(id);
    const stickyToc = document.getElementById('as-15-standard-sticky-toc');
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

      as15Sections.forEach((sec) => {
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
      <div id="as-15-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as15Sections.map(sec => (
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
        <section id="as-15-intro-sec" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-15-intro-sec" num="1" title="1. Introduction &amp; Objectives" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            a CHAPTER 6 L IABILITIES BASED ACCOUNTING STANDARDS UNIT 1: ACCOUNTING STANDARD 15 EMPLOYEE BENEFITS After studying this unit, you will be able to • Define ‘Employee benefits’, ‘Short - term employee benefits’, ‘Post - employment benefits’ and other related terms used in the Standard • Enumerate various types of employee benefits • Recognise and measure Short - term Employee Benefits, Short - term Compensated Absences and Profit - sharing and Bonus Plans along with the accounting thereof • Classify the post - employment benefits into defined contribution plans and defined benefit plans • Examine the various aspects inherent in these post - employment benefit plans and recognize and measure the obligations under these plans • Apply the actuarial valuation methods and assumptions while valuing the obligations under Defined benefit plans • Calculate the actuarial gains and losses on such plans • Recognise gains or losses on the curtailment or settlement of a defined benefit plan • Recognise and measure other long - term benefit and termination benefits • Understand the disclosure requirement of these employee benefits and comply with the same. <PdfRef page={1} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v <PdfRef page={2} />
          </p>
          
        </section>

        {/* Section: 1.1 INTRODUCTION */}
        <section id="as-15-introduction" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-15-introduction" num="1.1" title="INTRODUCTION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The <strong>Accounting Standard</strong> 15 - ‘Employee Benefits’ (<strong>AS 15</strong>), generally deals with all forms of employee benefits all forms of consideration given by an enterprise in exchange for services rendered by employees The objective of this Standard is to prescribe the accounting treatment and disclosure for employee benefits in the books of employer except employee share - based payments. It does not deal with accounting and reporting by employee benefit plans. The Standard addresses only the accounting of employee benefits by employers. The Standard makes four things very clear at the outset: (i) the Standard is applicable to benefits provided to all types of employees (whether full - time, part - time, or casual staff ) ; (ii) employee benefits can be paid in cash or in kind; (iii) employee benefits include benefits provided to employees and their dependents (spouses, children and others); and (iv) payment can be made directly to employees, their dependent or to any other party (e.g., legal heirs, nominees, insurance companies, trust etc.). The Standard is based on the premise that the costs associated with employees - benefits should be matched with the timing of their service. This requires assessment of the anticipated costs and their timing in future and aligning those costs over the period of their service. For example, a bonus payable to an employee for a long - term service, should ideally be spread over the period of his service and the expectations that the employee is expected to complete that service. Likewise, pension payable to an employee must be recognized as a cost during the service period itself, irrespective of the fact that the pension is payable after the service is completed. Employee Benefits Formal Plan/Agreement Legislative Requirement Informal Practices <PdfRef page={2} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            v v v v 6 . 3 6. 3 Illustration 1 What are the kinds of employees covered in the revised <strong>AS 15</strong> and whether a formal employer employee relationship is necessary or not, for benefits to be covered under the Standard? Solution The Standard does not define the term “employee”. Paragraph 6 of the Standard states that ‘an employee may provide services to an enterprise on a full time, part time, permanent, casual or temporary basis and the term would also include the whole - time directors and other management personnel. The Standard is applicable to all forms of employer employee relationships. There is no re quirement for a formal employer employee relationship. Several factors need to be considered to determine the nature of relationship. Generally, ‘outsourcing contracts’ may not meet the definition of employer - employee relationship. However, such contracts need to be carefully examined to distinguish between a “contract of service” and a “contract for services”. A ‘contract for services’ implies a contract for rendering services, e.g., professional or technical services which is subject to limited direction and control whereas a ‘contract of service’ implies a relationship of an employer and employee , and the person is obliged to obey orders in the work to be performed and as to its mode and manner of performance. Illustration 2 Whether an enterprise is required to provide for employee benefits arising from informal practices? Solution Paragraph 3(c) of the Standard defines employee benefits to include those informal practices that give rise to an obligation where the enterprise has no realistic alternative but to pay employee benefits. The historical pattern of granting such benefits, the expectation created and the impact on the relationship with employees in the event such benefit is withdrawn should be considered in determining whether the informal practice gives rise to a benefit covered by the Standard. For example, where an employer has a practice of <PdfRef page={3} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 6 . 4 making a lumpsum payment on occasion of a festival or regularly grants advances against informal benefits to employees it would be necessary to provide for such benefits. Careful judgement should be applied in assessing whether an obligation has arisen particularly in instances where an enterprise&apos;s practice is to provide improvements only during the collective bargaining process and not during any informal process. If the employer has not set a pattern of benefits that can be projected reliably to give rise to an obligation there is no requirement to provide for the benefits. However, if the practice established by an employer was that of a consistent benefit granted either as part of union negotiations or otherwise that clearly established a pattern (e.g., a cost of living adjustment or fixed rupee increase), it could be concluded that an obligation exists and that those additional benefits should be included in the measurement of the benefit obligation. Employee benefits include: (a) Short - term employee benefits (e.g. , wages, salaries, paid annual leave and sick leave, profit sharing bonuses etc. (payable within 12 months of the year - end) and non - monetary benefits for current employees . (b) Post - employment benefits (e.g., gratuity, pension, provident fund, post - employment medical care etc.) . (c) long - term employee benefits (e.g., long - service leave, long - term disability benefits, bonuses not wholly payable within 12 months of the year end etc.) , and (d) termination benefits (e.g. VRS payments) The Standard lays down recognition and measurement criteria and disclosure requirements for the above four types of employee benefits separately. <PdfRef page={4} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            v v v v 6 . 5 <PdfRef page={5} />
          </p>
          
        </section>

        {/* Section: 1.2 APPLICABILITY */}
        <section id="as-15-applicability" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-15-applicability" num="1.2" title="APPLICABILITY" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The Standard applies from April 1, 2006 in its entirety for all Level 1 enterprises. Certain exemptions are given to other than Level 1 enterprises, depending upon whether they employ 50 or more employees. This Standard is applicable predominantly for Level 1 enterprises and applied to other entities with certain relaxations. <PdfRef page={5} />
          </p>
          
        </section>

        {/* Section: 1.3 MEANING OF THE TERM “EMPLOYEE */}
        <section id="as-15-meaning-of-the-term-employee" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-15-meaning-of-the-term-employee" num="1.3" title="MEANING OF THE TERM “EMPLOYEE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            BENEFITS” The term employee is not defined under the standard <strong>AS 15</strong> does not define who is an ‘employee’, but states in that &quot;an employee may provide services to an entity on a full - time, part - time, permanent, casual or temporary basis. For the purpose of this Standard, employees include directors and other management personnel&quot;. This suggests that the intention was for the term ‘employee’ to apply more widely than simply to persons with a contract of employment as ‘casual’ and ‘temporary’ staff may frequently not have such contracts. Short Term Employee Benefits Salary, Wages Social Security Contributions Annual Paid leaves Medical, Housing, Car Long Term Benefits Sabbatical Leave Long Service Awards Long Term Disability Benefit Post Employment Benefits Gratuity Pension Medical Care Terminal Benefits Retrenchment Voluntary Retirement <PdfRef page={5} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 6 . 6 The following indicators may suggest an employee relationship may be more likely to exist, and may help in making individual judgements: • A contract of employment exists; • Individuals are considered employees for legal/tax/social security purposes; • There is a large amount of oversight and direction by the employer and necessary tools, equipment and materials are provided by the employer; • Services are performed at a location specified by the employer; Services provided through an entity are in substance services provided by a specific individual, indications of which could be that the entity: • Has no other clients; • Has served the employer for a long period; • Faces little or no financial risk; • Requires the explicit permissions of the employer to concurrently undertake additional employment elsewhere. <PdfRef page={6} />
          </p>
          
        </section>

        {/* Section: 1.4 SHORT - TERM EMPLOYEE BENEFITS */}
        <section id="as-15-short-term-employee-benefits" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-15-short-term-employee-benefits" num="1.4" title="SHORT - TERM EMPLOYEE BENEFITS" />
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>Short - term employee benefits (other than termination benefits) are payable within twelve months after the end of the period in which the service is rendered. • Accounting for these benefits is generally straightforward because no actuarial assumptions are required to measure the obligation or cost. • Short - term employee benefits are broadly classified into four categories: (i) regular period benefits (e.g., wages, salaries); (ii) short - term compensated absences (e.g., paid annual leave, maternity leave, sick leave etc.); (iii) profit sharing and bonuses payable within twelve months after the end of the period in which employee render the related services and (iv) non - monetary benefits (e.g., medical care, housing, cars etc.)</li>
          </ul>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            v v v v 6 . 7 6. 7.1 All Short - term Employee Benefits • The Standard lays down some general recognition criteria for all short - term employee benefits. There are further requirements in respect of short - term compensated absences and profit sharing and bonus plans. • The general criteria is that an enterprise should recognize as an expense (unless another accounting standard permits a different treatment) the undiscounted amount of all short - term employee benefits attributable to services that been already rendered in the period. • Any difference between the amount of expenses so recognized and cash payments made during the period should be treated as a liability or prepayment (asset) as appropriate. Illustration 3 Entity XY is required to pay salary of ` 2 crore for the year 20X1 - X2. It actually paid a salary of ` 1.90 crore up to 31 st March 20X2, and balance in April 20X2. Determine the actual costs to be recognized in the year 20X1 - X2 and any amounts to be shown through balance sheet. Solution Total ex pense for the year (20X1 - X2) ` 2 crore Amount to be shown under liability (unpaid) ` 2 crore – 1.90 ` crore = ` 10 lakhs Short term Employee Benefits All Short term Employee Benefits Short Term Paid Abscences Accumulating Vesting Non - vesting Non - accumulating Profit - sharing and Bonus Plans <PdfRef page={7} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 6 . 8.2 Short - term Compensated Absences Entitlement to compensated absences falls into two categories: (a) Accumulating • Accumulating compensated absences are those that are carried forward and can be used in future periods if the current period’s entitlement is not used in full. • Accumulating compensated absences may be (i) Vesting It implies that employees are entitled to a cash payment for unused entitlement on leaving the enterprise (ii) Non - vesting It implies that when employees are not entitled to a cash payment for unused entitlement on leaving. An obligation arises as employees render service that increases their entitlement to future compensated absences. • The expected cost of accumulating compensated absences should be recognized when employees render the service that increase their entitlement to future compensated absences. • ‘An enterprise should measure the expected cost of accumulating compensated absences as the additional amount that the enterprise expects to pay as a result of the unused entitlement that has accumulated at the balance sheet date’ . • No distinction should be made between vesting and non - vesting entitlements. However, in measuring non - vesting entitlements, the possibility of employees leaving the enterprise before receiving them should be taken into account. Example An enterprise has 100 employees, who are each entitled to five working days of leave for each year. Unused leave may be carried forward for one calendar year. The leave is taken first out of the current year’s entitlement and then out <PdfRef page={8} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            v v v v 6 . 9 6. 9 of any balance brought forward from the previous year (a LIFO basis). At 31 st December, 20X4, the average unused entitlement is two days per employee. The enterprise expects, based on past experience which is expected to continue, that 92 employees will take no more than five days of leave in 20X5 and that the remaining eight employees will take an average of six and a half days each. The enterprise expects that it will pay an additional 12 days of pay as a result of the unused entitlement that has accumulated at 31 st December, 20X4 (one and a half days each, for eight employees). Therefore, the enterprise recognises a liability, as at 31 st December, 20X4, equal to 12 days of pay. (b) Non - accumulating • Non - accumulating compensated absences (e.g., maternity leave) do not carry forward and are not directly linked to the services rendered by employees in the past. Therefore, an enterprise recognizes no liability or expense until the time of the absence. • In other words, the cost of non - accumulating absences should be recognized as and when they arise. Exception Small and Medium - sized Company and Micro, Small and Medium - sized Enterprise s (Levels I V, III and II non - corporate entities) may not comply with short term absences to the extent they deal with recognition and measurement of absences which are non - vesting (i.e., short - term accumulating compensated absences in respect of which employees are not entitled to cash payment of unused entitlement on leaving). 1.4.3 Profit - sharing and Bonus Plans <strong>Recognition</strong> of expenses for profit sharing and bonus plans would depend on fulfillment of conditions mentioned the Standard. The conditions are: (a) Enterprise has a present obligation to make such payments as a result of past events; and (b) Reliable estimate of the obligation can be made. <PdfRef page={9} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 6 . 10 The second condition can be satisfied only when the profit sharing and bonus plans contained a formula for determining the amount of benefit. The enterprise should recognize the expected cost of profit sharing and bonus payments in the financial statements. Example A profit - sharing plan requires an enterprise to pay a specified proportion of its net profit for the year to employees who serve throughout the year. If no employees leave during the year, the total profit - sharing payments for the year will be 3% of net profit. The enterprise estimates that staff turnover will reduce the payments to% of net profit. The enterprise recognises a liability and an expense of% of net profit. Illustration 4 Whether an entitlement to earned leave which can be carried forward to future periods is a short - term employee benefit or a long - term employee benefit. Solution Paragraph of the Standard defines ‘Short - term’ benefits as employee benefits (other than termination benefits) which fall due wholly within twelve months after the end of the period in which the employees render the related service. Paragraph 8(b) of the Standard illustrates the term ‘Short - term benefits’ to include “short term compensated absences (such as paid annual leave) where the absences are expected to occur within twelve months after the end of the period in which the employees render the related employee service”. Paragraph of the Standard uses “falls due” as the basis, paragraph 8(b) of the Standard uses “expected to occur” as the basis to illustrate classification of short term compensated absences. A reading of paragraph 8(b) together with paragraph would imply that the classification of short - term compensated absences should be only when absences have “fallen due” and are also “expected to occur”. In other words, where employees are entitled to earned leave which can be carried forward to future periods , the benefit would be a ‘short - term benefit’ provided the employee is entitled to either encash or utilise the benefit during the twelve months after the end of the period when t he employee became entitled to the leave and is also expected to utilise the leave . <PdfRef page={10} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            v v v v 6 . 11 6. 11 Where there are restrictions on encashment and/or availment , clearly the compensated absence has not fallen due and the benefit of compensated absences is more likely to be a long - term benefit. For example, where an employee has 100 days of earned leave which he is entitled to an unlimited carry forward , but the rules of the enterprise allow him to encash/utilise only 30 days during the next twelve months, the benefit would be considered as a ‘long - term’ benefit. In some situations, where there is no restriction but the absence is not expected to wholly occur in the next twelve months, the benefit should be considered as ‘long - term’. For example, where an employee has 400 days carry forward earned leave and the past pattern indicates that the employees are unlikely to avail / encash the entire carry forward during the next twelve months, the benefit would not be ‘short - term’. Whilst it is necessary to consider the earned leave which “falls due”, the pattern of actual utilisation/encashment by employees, although reflective of the behavioural pattern of employees, does determine the status of the benefit, i.e., whether ‘ short - term’ or ‘ long - term’. The value of short - term benefits should be determined without discounting and if the benefit is determined as long - term, it would be recognised and measured as “Other long - term benefits” in accordance with paragraph 129 of the Standard. The categorisation in ‘short - term’ or ‘long - term’ employee benefits should be done on the basis of the overall behavioural pattern of all the employees of the enterprise and not on individual basis. Illustration 5 In case an enterprise allows unutilised employee benefits, e.g., medical care, leave travel, etc., to be carried forward, whether it is required to recognise a provision in respect of carried forward benefits. Solution A provision should be recognised for all benefits (conditional or unconditional) which an employee becomes entitled to as a result of rendering of the service and should be recorded as part of the cost of service rendered during the period in which the service was rendered which resulted the entitlement. In estimating the cost of such benefit the probability of the employee availing such benefit should be considered. <PdfRef page={11} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v <PdfRef page={12} />
          </p>
          
        </section>

        {/* Section: 1.5 PO ST EMPLOYMENT BENEFITS: DEFINED */}
        <section id="as-15-po-st-employment-benefits-defined" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-15-po-st-employment-benefits-defined" num="1.5" title="PO ST EMPLOYMENT BENEFITS: DEFINED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            CONTRIBU TION VS DEFINED BENEFITS The accounting treatment and disclosures required for a post - employment benefit plan depend upon whether it is a defined contribution or a defined benefit plan. In addition to addressing defined contribution and defined benefit plans generally, the Standard also gives guidance as to how its requirements should be applied to insured benefits, multi - employment benefit plans. 1. Defined contribution plans (DCP) are post - employment benefit plans under which an enterprise pays fixed contributions into a separate fund and will have no obligation to pay further contributions. Under defined contribution plans, actuarial risk (that benefits will be less than expected) and investment risk (that assets invested will be insufficient to meet expected benefits) fall on the employee. A common example of Defined Contribution plans is Provident Fund. 2. Defined benefit plans are post - employment benefit plans other than defined contribution plans. In defined benefits plans, the actuarial and investment risk fall on the employer. DCP Funded (Mostly) Controlled Trust/legal Entity Non - Controlled Multi - employer State Plan Insured <PdfRef page={12} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            v v v v 6 . 13 6. 13 In defined contribution plans, the contribution is charged to income statement, whereas in defined benefit plans, detailed actuarial calculation is performed to determine the charge. <PdfRef page={13} />
          </p>
          
        </section>

        {/* Section: 1.6 IS THE GRATUITY SCHEME A DEFINED */}
        <section id="as-15-is-the-gratuity-scheme-a-defined" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-15-is-the-gratuity-scheme-a-defined" num="1.6" title="IS THE GRATUITY SCHEME A DEFINED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            CONTRIBUTION OR DEFINED BENEFIT SCHEME? An enterprise may pay insurance premiums to fund a post - employment benefit plan. The enterprise should treat such a plan as a defined contribution plan unless the enterprise will have an obligation to either: (a) pay the employee benefits directly when they fall due; or (b) pay further amounts if the insurer does not pay all future employee benefits relating to employee service in the current and prior periods. On the asset side, a question arises as to whether the funds under the scheme as certified by LIC would be treated as plan assets or reimbursement rights. The distinction is important (though both are measured on fair valuation basis) because plan assets are reduced from the defined benefit obligation and the net amount is disclosed in the balance sheet, whereas, in the case of reimbursement rights, the defined benefit obligation and the reimbursement rights are shown separately as liability and asset on the balance sheet. This would have the impact of making the balance sheet heavy both on the asset side as well as the liabilities side. <PdfRef page={13} />
          </p>
          
        </section>

        {/* Section: 1.7 ACCOUNTING TREATMENT */}
        <section id="as-15-accounting-treatment" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-15-accounting-treatment" num="1.7" title="ACCOUNTING TREATMENT" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            In the Balance Sheet of the enterprise, ‘the amount recognized as a defined benefit liability should be the net total of the following amounts: (a) the present value of the defined benefit obligation at the balance sheet date; (b) minus any past service cost not yet recognized; (c) minus the fair value at the balance sheet date of plan assets (if any) out of which the obligations are to be settled directly.’ <PdfRef page={13} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 6 . 14 In case where fair value of plan assets is high, it may so happen that the net amount under defined benefit liability turns negative (giving rise to net assets). <strong>AS 15</strong> states that the enterprise, in such a situation, should measure the resulting asset at the lower of: (i) the amount so determined; and (ii) the present value of any economic benefits available in the form of refunds from the plan or reductions in future contributions to the plan. The recognition of expenses relating to defined benefits in the Statement of Profit and Loss is stated in Para 61 of the Standard. The Standard identifies seven components of defined employee benefit costs: (a) current service cost; (b) interest cost; (c) the expected return on any plan assets (and on any reimbursement rights); (d) actuarial gains and losses (to the extent they are recognized); (e) past service cost (to the extent they are recognized); (f) the effect of any curtailments or settlements; and (g) the extent to which the negative net amount of defined benefit liability exceeds the amount mentioned in Para 59( b ) of the Standard. A settlement occurs when an employer enters into a transaction that eliminates all further legal or constructive obligations for part or whole of the benefits provided under a defined benefit plan. For example, the commuted portion of pension. A curtailment occurs when an employer either commits to reduce the number of employees covered by a plan or reduces the benefits under a plan. The gains or losses on the settlement or curtailment of a defined benefit plan should be recognized when the settlement or curtailment occurs. <PdfRef page={14} />
          </p>
          
        </section>

        {/* Section: 1.8 DISCLOSURES */}
        <section id="as-15-disclosures" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-15-disclosures" num="1.8" title="DISCLOSURES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Where there is uncertainty about the number of employees who will accept an offer of termination benefits, a contingent liability exists. <PdfRef page={14} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            v v v v 6 . 15 6. 15 As required by <strong>AS 29</strong>, &quot;Provisions, Contingent Liabilities and Contingent Assets&quot; an enterprise discloses information about the contingent liability unless the possibility of an outflow in settlement is remote. As required by <strong>AS 5</strong>, &quot;Net Profit or Loss for the Period, Prior Period items and Changes in Accounting Policies&quot; an enterprise discloses the nature and amount of an expense if it is of such size, nature or incidence that its disclosure is relevant to explain the performance of the enterprise for the period. Termination benefits may result in an expense needing disclosure in order to comply with this requirement. Where required by <strong>AS 18</strong>, &quot;Related Party <strong>Disclosures</strong>&quot; , an enterprise discloses information about termination benefits for key management personnel. When drafting <strong>AS 15</strong> (revised), the Standard setters felt that merely on the basis of a detailed formal plan, it would not be appropriate to recognise a provision since a liability cannot be considered to be crystallized at this stage. <strong>AS 15</strong> requires more certainty for recognition of termination cost, for example, if the employee has sign up for the termination scheme. <PdfRef page={15} />
          </p>
          
        </section>

        {/* Section: 1.9 ACTUARIAL ASSUMPTIONS */}
        <section id="as-15-actuarial-assumptions" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-15-actuarial-assumptions" num="1.9" title="ACTUARIAL ASSUMPTIONS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The actuarial assumptions should be unbiased and mutually compatible. They are an enterprise’s best estimates of the variables that will determine the ultimate cost of providing post - employment benefits. They should be neither imprudent nor excessively conservative, and should reflect the economic relationships between factors such as inflation, rates of salary increase, return on plan assets and discount rates. <strong>AS 15</strong> explains that actuarial assumptions comprise: (a) demographic assumptions about the future characteristics of current and former employees (and their dependents) who are eligible for benefits. Demographic assumptions deal with matters such as: (i) mortality, both during and after employment; (ii) rates of employee turnover, disability and early retirement; <PdfRef page={15} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 6 . 16 (iii) the proportion of plan members with dependents who will be eligible for benefits; (iv) claim rates under medical plans; and (b) financial assumptions, dealing with items such as: (i) the discount rate (ii) future salary and benefit levels (iii) in the case of medical benefits, future medical costs, including, where material, the cost of administering claims and benefit payments and (iv) the expected rate of return on plan assets. Financial assumptions: Financial assumptions should be based on market expectation at the balance sheet date for the period over which the post - employment benefit obligations will be settled. Discount rates and other financial assumptions should not be inflation - adjusted unless such measures are more reliable (e . g . where benefits are index - linked) <PdfRef page={16} />
          </p>
          
        </section>

        {/* Section: 1.10 ACTUARIAL GAINS AND LOSSES */}
        <section id="as-15-actuarial-gains-and-losses" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-15-actuarial-gains-and-losses" num="1.10" title="ACTUARIAL GAINS AND LOSSES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Actuarial gains and losses comprise: • experience adjustments (the effects of difference between the previous actuarial assumptions and what has actually occurred); and • the effects of changes in actuarial assumptions. Actuarial gains and losses should be recognized immediately in the statement of profit and loss as income or expense. Illustration 6 Omega Limited belongs to the engineering industry. The company received an actuarial valuation for the first time for its pension scheme which revealed a surplus of ` 6 lakhs. It wants to spread the same over the next 2 years by reducing the annual contribution to ` 2 lakhs instead of ` 5 lakhs. The average remaining life of the employees is estimated to be 6 years. You are required to advise the company on the following items from the viewpoint of finalization of accounts, taking note of the mandatory accounting standards. <PdfRef page={16} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            v v v v 6 . 17 6. 17 Solution According to <strong>AS 15</strong> (Revised 2005) ‘Employee Benefits’, actuarial gains and losses should be recognized immediately in the statement of profit and loss as income or expense. Therefore, surplus amount of ` 6 lakhs is required to be credited to the profit and loss statement of the current year. Illustration 7 As on 1 st April, 20X1 the fair value of plan assets was ` 1,00,000 in respect of a pension plan of Zeleous Ltd. On 30 th September, 20X1 the plan paid out benefits of ` 19,000 and received inward contributions of ` 49,000. On 31 st March, 20X2 the fair value of plan assets was ` 1,50,000 and present value of the defined benefit obligation was ` 1,47,920. Actuarial losses on the obligations for the year 20X1 - 20X2 were ` 600. On 1 st April, 20X1, the company made the following estimates, based on its market studies, understanding and prevailing prices. % Interest &amp; dividend income, after tax payable by the fund Realised and unrealised gains on plan assets (after tax) 2.00 Fund administrative costs (1.00) You are required to find the expected and actual returns on plan assets. Solution Computation of Expected and Actual Returns on Plan Assets ` Return on ` 1,00,000 held for 12 months at% 10,250 Return on ` 30,000 (49,000 - 19,000) held for six months at 5% (equivalent to% annually, compounded every six months) 1,500 Expected return on plan assets for 20X1 - 20X2 11,750 <PdfRef page={17} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 6 . 18 Fair value of plan assets as on 31 March, 20X2 1,50,000 Less: Fair value of plan assets as on 1 April,20X1 1,00,000 Contributions received 49,000 (1,49,000) 1,000 Add: Benefits paid 19,000 Actual return on plan assets 20,000 Alternatively, the above question may be solved without giving compound effect to rate of return. Illustration 8 Rock Star Ltd. discontinues a business segment. Under the agreement with employee’s union, the employees of the discontinued segment will earn no further benefit. This is a curtailment without settlement, because employees will continue to receive benefits for services rendered before discontinuance of the business segment. Curtailment reduces the gross obligation for various reasons including change in actuarial assumptions made before curtailment. If the benefits are determined based on the last pay drawn by employees, the gross obligation reduces after the curtailment because the last pay earlier assumed is no longer valid. Rock Star Ltd. estimates the share of unamortized service cost that relates to the part of the obligation at ` 18 (10% of ` 180). Calculate the gain from curtailment and liability after curtailment to be recognised in the balance sheet of Rock Star Ltd. on the basis of given information: (a) Immediately before the curtailment, gross obligation is estimated at ` 6,000 based on current actuarial assumption. (b) The fair value of plan assets on the date is estimated at ` 5,100. (c) The unamortized past service cost is ` 180. (d) Curtailment reduces the obligation by ` 600, which is 10% of the gross obligation. <PdfRef page={18} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            v v v v 6 . 19 6. 19 Solution Gain from curtailment is estimated as under: ` Reduction in gross obligation 600 Less : Proportion of unamortised past service cost (18) Gain from curtailment 582 The liability to be recognised after curtailment in the balance sheet is estimated as under: ` Reduced gross obligation (90% of ` 6,000) 5,400 Less : Fair value of plan assets (5,100) 300 Less : Unamortised past service cost (90% of ` 180) (162) Liability to be recognised in the balance sheet 138 Illustration 9 An employee Roshan has joined a comp any XYZ Ltd. in the year 20X1. The annual emoluments of Roshan as decided is ` 14,90,210. The company also has a policy of giving a lump sum payment of 25% of the last drawn annual salary of the employee for each completed year of service if the employee retires after completing minimum 5 years of service. The salary of the Roshan is expected to grow @ 10% per annum. The company has inducted Roshan in the beginning of the year and it is expected that he will complete the minimum five year term before retiring. Thus he will get 5 yearly increment. What is the amount the company should charge in its Profit and Loss account every year as cost for the Defined Benefit obligation? Also calculate the current service cost and the interest cost to be charged per year assuming a discount rate of 8%. (P.V factor for 8% - 0.735, 0.794, 0.857, 0.926, 1) <PdfRef page={19} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 6 . 20 Solution Calculation of Defined Benefit Obligation (DBO) Expected last drawn salary = ` 14,90,210 x 110% x 110% x 110% x 110% x 110% = ` 24,00,000 Defined Benefit Obligation (DBO) = ` 24,00,000 x 25% x 5 = ` 30,00,000 Amount of ` 6,00,000 will be charged to Profit and Loss Account of the company every year as cost for Defined Benefit Obligation. Calculation of Current Service Cost Year Equal apportioned amount of DBO [i.e. ` 30,00,000/5 years] Discounting @ 8% PV factor Current service cost (Present Value) a b c d = b x c 1 6,00,000 (4 Years) 4,41,000 2 6,00,000 (3 Years) 4,76,400 3 6,00,000 (2 Years) 5,14,200 4 6,00,000 (1 Year) 5,55,600 5 6,00,000 1 (0 Year) 6,00,000 Calculation of Interest Cost to be charged per year Year Opening balance Interest cost Current service cost Closing balance a b c = b x 8% d e = b + c + d 1 0 0 4,41,000 4,41,000 2 4,41,000 35,280 4,76,400 9,52,680 3 9,52,680 76,214 5,14,200 15,43,094 4 15,43,094 1,23,447 5,55,600 22,22,141 5 22,22,141 1,77,859* 6,00,000 30,00,000 *Due to approximations used in calculation, this figure is adjusted accordingly. <PdfRef page={20} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            v v v v 6 . 21 <PdfRef page={21} />
          </p>
          
        </section>

        {/* Section: 1.11 OTHER LONG TERM EMPLOYEE BENEFITS */}
        <section id="as-15-other-long-term-employee-benefits" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-15-other-long-term-employee-benefits" num="1.11" title="OTHER LONG TERM EMPLOYEE BENEFITS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Other long - term employee benefits include, for example: (a) long - term compensated absences such as long - service or sabbatical leave; (b) jubilee or other long - service benefits; (c) long - term disability benefits; (d) profit - sharing and bonuses payable twelve months or more after the end of the period in which the employees render the related services and (e) deferred compensation paid twelve months or more after the end of the period in which it is earned. <PdfRef page={21} />
          </p>
          
        </section>

        {/* Section: 1.12 TERMINATION BENEFITS */}
        <section id="as-15-termination-benefits" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-15-termination-benefits" num="1.12" title="TERMINATION BENEFITS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Termination Benefits are employee benefits payable as a result of either an enterprise’s decision to terminate an employee’s employment before the normal retirement date or an employee’s decision to accept voluntary redundancy in exchange for those benefits (e.g., payments under VRS). Termination benefits are recognized by an enterprise as a liability and an expense only when the enterprise has (i) a detailed formal plan for the termination which is duly approved, and (ii) a reliable estimate can be made of the amount of the obligation. Where the termination benefits fall due within twelve months after the balance sheet date, an undiscounted amount of such benefits should be recognized as liability in the balance sheet with a corresponding charge to Profit &amp; Loss Account. However, when the termination benefits fall due more than twelve months after the balance sheet date, such benefits should be discounted using an appropriate discount rate. Where an offer has been made to encourage voluntary redundancy, the termination benefits should be measured by reference to the number of employees expected to accept the offer. Where there is uncertainty with regard to the number of employees who will accept an offer of voluntary redundancy, a contingent liability exists and should be so disclosed as per <strong>AS 29</strong> ‘Provisions, Contingent Liabilities and Contingent Assets’. Reference : The students are advised to refer the full text of <strong>AS 15</strong> “Employee Benefits” (Revised 2005). <PdfRef page={21} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 6 . 22 TEST YOUR KNOWLEDGE M ultiple C hoice Q uestion s 1. Gratuity and Pension would be examples of: (a) Short - term employee benefits (b) Long - term employee benefits (c) Post - employment benefits. (d) None of the above. 2. Non - accumulating compensating absence is commonly referred to as: (a) Earned Leave (b) Sick Leave (c) Casual leave (d) All of the above 3. The plans that are established by legislation to cover all enterprises and are operated by Governments include: (a) Multi - Employer plans (b) State plans (c) Insured Benefits (d) Employee benefit plan 4. Best estimates of the variable to determine the eventual cost of post - employment benefits is referred to as: (a) Employer’s contribution (b) Actuarial assumptions (c) Cost to Company (d) Employe e ’s contribution 5. Actuarial gains / losses should be: (a) Recognised through reserves <PdfRef page={22} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            v v v v 6 . 23 6. 23 (b) Charged over the expected life of employees (c) Charged immediate ly to Profit and Loss Statement (d) Do not c harged to Profit and Loss Statement Theor etical Q uestions 6. What are the types of Employees benefits and what is the objective of Introduction of this Standard i.e. <strong>AS 15</strong>? Scenario based Questions 7 . A company has a scheme for payment of settlement allowance to retiring employees. Under the scheme, retiring employees are entitled to reimbursement of certain travel expenses for class they are entitled to as per company rule and to a lump - sum payment to cover expenses on food and stay during the travel. Alternatively, employees can claim a lump sum amount equal to one month pay last drawn. The company’s contentions in this matter are: (i) Settlement allowance does not depend upon the length of service of employee. It is restricted to employee’s eligibility under the Travel rule of the company or where option for lump - sum payment is exercised, equal to the last pay drawn. (ii) Since it is not related to the length of service of the employees, it is accounted for on claim basis. State whether the contentions of the company are correct as per relevant <strong>Accounting Standard</strong>. Give reasons in support of your answer. 8 . The following data apply to ‘X’ Ltd. defined benefit pension plan for the year ended.20X2 calculate the actual return on plan assets: - Benefits paid 2,00,000 - Employer contribution 2,80,000 - Fair market value of plan assets on.20X2 11,40,000 - Fair market value of plan assets as on.20X1 8,00,000 <PdfRef page={23} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 6 . 24 9 . The fair value of plan assets of Anupam Ltd. was ` 2,00,000 in respect of employee benefit pension plan as on 1 st April, 20X1. On 30 th September, 20X1 the plan paid out benefits of ` 25,000 and received inward contributions of ` 55,000. On 31 st March, 20X2 the fair value of plan assets was ` 3,00,000. On 1 st April, 20X1 the company made the following estimates, based on its market studies and prevailing prices. % Interest and dividend income (after tax) payable by fund Realized gains on plan assets (after tax) 3.00 Fund administrative costs (3.00) Calculate the expected and actual returns on plan assets as on 31 st March, 20X2, as per <strong>AS 15</strong>. ANSWERS/ SOLUTIONS Answer to the Multiple Choice Questions 1. (c) 2. (c) 3. (b) 4. (b) 5. (c) Answer to the Theoretical Questions 6 . There are four types of employee benefits according to <strong>AS 15</strong> (Revised 2005). They are: (a) short - term employee benefits, such as wages, salaries and social security contributions (e.g., contribution to an insurance company by an employer to pay for medical care of its employees), paid annual leave, profit - sharing and bonuses (if payable within twelve months of the end of the period) and non - monetary benefits (such as medical care, housing, cars and free or subsidised goods or services) for current employees; <PdfRef page={24} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            v v v v 6 . 25 6. 25 (b) post - employment benefits such as gratuity, pension, other retirement benefits, post - employment life insurance and post - employment medical care; (c) other long - term employee benefits, including long - service leave or sabbatical leave, jubilee or other long - service benefits, long - term disability benefits and, if they are not payable wholly within twelve months after the end of the period, profit - sharing, bonuses and deferred compensation; and (d) termination benefits. Because each category identified in (a) to (d) above has different characteristics, this Statement establishes separate requirements for each category. The objective of <strong>AS 15</strong> is to prescribe the accounting and disclosure for employee benefits. The statement requires an enterprise to recognise: (a) a liability when an employee has provided service in exchange for employee benefits to be paid in the future; and (b) an expense when the enterprise consumes the economic benefit arising from service provided by an employee in exchange for employee benefits. Answer to the Scenario based Questions 7 . The present case falls under the category of defined benefit scheme under Para 49 of <strong>AS 15</strong> (Revised) “Employee Benefits”. The said para encompasses cases where payment promised to be made to an employee at or near retirement presents significant difficulties in the determination of periodic charge to the statement of profit and loss. The contention of the Company that the settlement allowance will be accounted for on claim basis is not correct even if company’s obligation under the scheme is uncertain and requires estimation. In estimating the obligation, assumptions may need to be made regarding future conditions and events, which are largely outside the company’s control. Thus, <PdfRef page={25} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCED ACCOUNTING v v v v 6 . 26 (1) Settlement allowance payable by the company is a defined retirement benefit, covered by <strong>AS 15</strong> (Revised). (2) A provision should be made every year in the accounts for the accruing liability on account of settlement allowance. The amount of provision should be calculated according to actuarial valuation. (3) Where, however, the amount of provision so determined is not material, the company can follow some other method of accounting for settlement allowances. 8 . ` Fair value of plan assets on.20 X1 8,00,000 Add: Employer contribution 2,80,000 Less: Benefits paid (2,00,000) (A) 8,80,000 Fair market value of plan assets at. 20X2 (B) 11,40,000 Actual return on plan assets (B - A) 2,60,000 9 . Computation of Expected Returns on Plan Assets as on 31 st March, 20X2, as per <strong>AS 15</strong> ` Return on opening value of plan assets of ` 2,00,000 (held for the year) @ 10.25% 20,500 Add : Return on net gain of ` 30,000 (i.e. ` 55,000 – ` 25,000) during the year i.e. held for six months @ 5% (equivalent to% annually, compounded every six months) 1,500 Expected return on plan assets as on 31 st March, 20X2 22,000 <PdfRef page={26} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            v v v v 6 . 27 6. 27 Computation of Actual Returns on Plan Assets as on 31st March, 20X2, as per <strong>AS 15</strong> ` ` Fair value of Plan Assets as on 31 st March, 20X2 3,00,000 Less : Fair value of Plan Assets as on 1 st April, 20X1 (2,00,000) Add: Contribution received as on 30 th September, 20X1 55,000 (2,55,000) 45,000 Add : Benefits paid as on 30 th September, 20X1 25,000 Actual returns on Plan Assets as on 31 st March, 20X2 70,000 <PdfRef page={27} />
          </p>
          
        
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 15**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 15, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
