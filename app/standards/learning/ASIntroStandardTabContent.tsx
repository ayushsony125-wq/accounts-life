'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, ChevronDown } from 'lucide-react'

export const asintroSections = [
  { id: 'as-intro-intro-sec', title: '1. Introduction & Objectives' },
  { id: 'as-intro-applicability-of-accounting-standards-to-companies', title: '2.3 Applicability of Accounting Standards to Companies' }
];

interface ASIntroStandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function ASIntroStandardTabContent({ navigateToPdfPage }: ASIntroStandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as-intro-intro-sec');
  const tocScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(id);
    const stickyToc = document.getElementById('as-intro-standard-sticky-toc');
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

      asintroSections.forEach((sec) => {
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
      <div id="as-intro-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {asintroSections.map(sec => (
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
        <section id="as-intro-intro-sec" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-intro-intro-sec" num="1" title="1. Introduction &amp; Objectives" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            APPLICABILITY OF ACCOUNTING STANDARDS After studying this chapter, you will be able to: ♦ Comprehend the status of Accounting Standards; ♦ Understand the applicability of Accounting Standards. CHAPTER 3 <PdfRef page={1} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCE D ACCOUNTING 3 . 2 It has already been mentioned in Chapter 1 that the accounting standards are developed by the Accounting Standards Board (ASB) of the Institute of Chartered Accountants of India, (“Institute” or “ICAI”), and are issued under the authority of its Council which are approved by the MCA (Ministry of Corporate Affairs) for Corporate entities. These standards cannot override laws and local regulations. The Accounting Standards are nevertheless made mandatory from the dates notified by the MCA and are generally applicable to all enterprises, subject to certain exceptions as stated below. The implication of mandatory status of an <strong>Accounting Standard</strong> depends on whether the statute governing the enterprise concerned requires compliance with the <strong>Accounting Standard</strong>, e.g., the Ministry of Corporate Affairs have notified Accounting Standards for companies incorporated under the Companies Act, 1956 (or the Companies Act, 2013). In assessing whether an accounting standard is applicable, one must find correct answer to the following three questions. (a) Does it apply to the enterprise concerned? If yes, the next question is: (b) Does it apply to the financial statement concerned? If yes, the next question is: (c) Does it apply to the financial item concerned? The preface to the statements of accounting standards answers the above questions. Applicability of AS for Non-Corporate Entities Applicability of AS for Corporate Entities Status of AS CHAPTER OVERVIEW <PdfRef page={2} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            3 . 3 Enterprises to which the accounting standards apply? Accounting Standards apply in respect of any enterprise (whether organised in corporate, co-operative or other forms) engaged in commercial, industrial or business activities, whether or not profit oriented and even if established for charitable or religious purposes. Accounting Standards, however, do not apply to enterprises solely carrying on the activities, which are not of commercial, industrial or business nature, (e.g., an activity of collecting donations and giving them to flood affected people). Exclusion of an enterprise from the applicability of the Accounting Standards would be permissible only if no part of the activity of such enterprise is commercial, industrial or business in nature. Even if a very small proportion of the activities of an enterprise were considered to be commercial, industrial or business in nature, the Accounting Standards would apply to all its activities including those, which are not commercial, industrial or business in nature. Implication of mandatory status Where the statute governing the enterprise does not require compliance with the accounting standards, e.g. a partnership firm, the mandatory status of an accounting standard implies that, in discharging their attest functions, the members of the Institute are required to examine whether the financial statements are prepared in compliance with the applicable accounting standards. In the event of any deviation from the accounting standards, they have the duty to make adequate disclosures in their reports so that the users of financial statements may be aware of such deviations. It should nevertheless be noted that responsibility for the preparation of financial statements and for making adequate disclosure is that of the management of the enterprise. The auditor’s responsibility is to form his opinion and report on such financial statements. Section 129 (1) of the Companies Act, 2013 requires companies to present their financial statements in accordance with the accounting standards notified under Section 133 of the Companies Act, 2013 (refer Note below). Also, the auditor is required by Section 143(3)(e) to report whether, in his opinion, the financial statements of the company audited, comply with the accounting standards referred to in Section 133 of the Companies Act, 2013. Where the financial statements of a company do not comply with the accounting standards, the company should disclose in its financial statements, the deviation from the accounting standards, <PdfRef page={3} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCE D ACCOUNTING 3 . 4 the reasons for such deviation and the financial effects, if any, arising out of such deviations as per Section 129(5) of the Companies Act, 2013. Provided also that the financial statements should not be treated as not disclosing a true and fair view of the state of affairs of the company, merely by reason of the fact that they do not disclose — (a) in the case of an insurance company, any matters which are not required to be disclosed by the Insurance Act, 1938, or the Insurance Regulatory and Development Authority Act, 1999; (b) in the case of a banking company, any matters which are not required to be disclosed by the Banking Regulation Act, 1949; (c) in the case of a company engaged in the generation or supply of electricity, any matters which are not required to be disclosed by the Electricity Act, 2003; (d) in the case of a company governed by any other law for the time being in force, any matters which are not required to be disclosed by that law. Note : As per the Companies Act, 2013, the Central Government may prescribe standards of accounting or addendum thereto, as recommended by the Institute of Chartered Accountants of India, in consultation with the National Financial Reporting Authority (NFRA). Financial items to which the accounting standards apply The Accounting Standards are intended to apply only to items, which are material. An item is considered material, if its omission or misstatement is likely to affect economic decision of the user. <strong>Materiality</strong> is not necessarily a function of size; it is the information content i.e. the financial item which is important. A penalty of ` 50,000 paid for breach of law by a company may seem to be a relatively small amount for a company incurring crores of rupees in an year, yet is a material item because of the information it conveys. The materiality should, therefore, be judged on a case-to-case basis. If an item is material, it should be shown separately instead of clubbing it with other items. For example, it is not appropriate to club the penalties paid with legal charges. Accounting Standards and Income Tax Act, 1961 Accounting standards intend to reduce diversity in application of accounting principles. They improve comparability of financial statements and promote <PdfRef page={4} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            3 . 5 transparency and fairness in their presentation. Deductions and exemptions allowed in computation of taxable income on the other hand, is a matter of fiscal policy of the government. Thus, an expense required to be taken to the Statement of profit and loss by an accounting standard does not imply that the same is always deductible for income tax purposes. For example, depreciation on assets taken on finance lease is charged in the books of lessee as per <strong>AS 19</strong> but depreciation for tax purposes is allowed to the lessor, being legal owner of the asset, rather than to the lessee. Likewise, recognition of revenue in the financial statements cannot be avoided simply because it is exempted under Section 10 of the Income Tax Act, 1961. Income Computation and Disclosure Standards Section 145(2) of the Income Tax Act, 1961, empowers the Central Government to notify in the Official Gazette from time to time, Income Computation and Disclosure Standards to be followed by any class of assesses or in respect of any class of income. Accordingly, the Central Government has, in exercise of the powers conferred under Section 145(2) of the Income Tax Act, 1961, notified ten Income Computation and Disclosure Standards (ICDSs) to be followed by all assesses (other than an individual or a Hindu undivided family who is not required to get his accounts of the previous year audited in accordance with the provisions of Section 44AB of the Income Tax Act, 1961) following the mercantile system of accounting, for the purposes of computation of income chargeable to income-tax under the head “Profit and gains of business or profession” or “ Income from other sources”, from the Assessment Year (A.Y.) 2017-18. The ten notified ICDSs are: ICDS I : Accounting Policies ICDS II : Valuation of Inventories ICDS III : Construction Contracts ICDS IV : Revenue <strong>Recognition</strong> ICDS V : Tangible Fixed Assets ICDS VI : The Effects of Changes in Foreign Exchange Rates <PdfRef page={5} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCE D ACCOUNTING 3 . 6 ICDS VII : Government Grants ICDS VIII : Securities ICDS IX : <strong>Borrowing Costs</strong> ICDS X : Provisions, Contingent Liabilities and Contingent Assets 2. APPLICABILITY OF ACCOUNTING STANDARDS For the purpose of compliance of the accounting Standards, the ICAI had issued an announcement earlier on ‘Criteria for Classification of Entities and Applicability of Accounting Standards’. As per the announcement, entities were classified into four levels. This got revised subsequently as discussed below. However, when the accounting standards were notified by the Central Government for the companies, the Central Government also issued the ‘Criteria for Classification of Entities and Applicability of Accounting Standards’ for the companies. According to the ‘Criteria for Classification of Entities and Applicability of Accounting Standards’ as issued by the Government, there are two levels, namely, Small and Medium-sized Companies (SMCs) as defined in the Companies (Accounting Standards) Rules, 2021 and companies other than SMCs (Non-SMCs). Non-SMCs are required to comply with all the Accounting Standards in their entirety, while certain exemptions/ relaxations have been given to SMCs. “Criteria for Classification of Entities and Applicability of Accounting Standards” for corporate entities and non-corporate entities have been explained in the coming paragraphs. 2.1. Revised Criteria for classification of Non-company entities for applicability of Accounting Standards The Council of the ICAI, at its 433rd meeting, held on August 13-15, 2024, considered the revised criteria for classification of Non-company entities for applicability of Accounting Standards issued by the ICAI to Non-company entities (Enterprises) and recommended to revise the same. The revised scheme for applicability of Accounting Standards to Non-company entities came into effect in <PdfRef page={6} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            3 . 7 respect of accounting periods commencing on or after April 1, 2024, which is as under: 1. For the purpose of applicability of Accounting Standards, Non-company entities were classified into two categories, viz., Micro, Small and Medium Sized Entities (MSMEs) and Large entities. 2. MSME means, a non-company entity: (i) whose equity or debt securities are not listed or are not in the process of listing on any stock exchange, whether in India or outside India; (ii) which is not a bank, financial institution or an insurance company; (iii) whose turnover (excluding other income) does not exceed two hundred and fifty crore rupees in the immediately preceding accounting year; (iv) which does not have borrowings in excess of fifty crore rupees at any time during the immediately preceding accounting year; and (v) which is not a holding or subsidiary of an entity which is not a micro, small and medium-sized entity. Explanation .- For the purposes of this clause, a non-company entity shall qualify as a MSME, if the conditions mentioned therein are satisfied as at the end of the relevant accounting period. 3. Large entity is a non-company entity that is not an MSME. 4. Large entities are required to comply in full with all the Accounting Standards. 5. Certain exemptions/relaxations have been provided to MSMEs. Applicability of Accounting Standards and exemptions/relaxations to such entities are given in Annexure 1. 6. This Announcement supersedes the earlier Announcement of the ICAI on ‘Criteria for classification of Non-company entities for applicability of Accounting Standards issued in March 2021. 7. This Announcement is not relevant for Non-company entities which may be required to follow Indian Accounting Standards (Ind AS) or Accounting Standards (AS) as per relevant regulatory requirements applicable to such entities. <PdfRef page={7} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCE D ACCOUNTING 3 . 8 8. The changes arising from this Announcement will be incorporated in the Accounting Standards while publishing the updated Compendium of Accounting Standards. Additional requirements (1) An MSME which avails the exemptions or relaxations given to it shall disclose (by way of a note to its financial statements) the fact that it is an MSME and has complied with the Accounting Standards insofar as they are applicable to an MSME. (2) Where an MSME had qualified for any exemption or relaxation previously but no longer qualifies for the relevant exemption or relaxation in the current accounting period, the relevant standards or requirements become applicable from the current period and the figures for the corresponding period of the previous accounting period need not be revised merely by reason of its having ceased to be an MSME. The fact that it was an MSME in the previous period and it had availed of the exemptions or relaxations available to it shall be disclosed in the notes to the financial statements. The fact that previous period figures have not been revised shall also be disclosed in the notes to the financial statements. (3) An entity which was previously not an MSME and subsequently becomes an MSME, shall not be qualified for exemption/relaxation in respect of Accounting Standards available to an MSME until the entity remains an MSME for two consecutive years. (4) If an MSME opts not to avail of the exemptions or relaxations available to an MSME in respect of any but not all of the Accounting Standards, it shall disclose the Standard(s) in respect of which it has availed the exemption or relaxation. (5) If an MSME opts not to avail any one or more of the exemptions or relaxations available to it, it shall comply with the relevant requirements of the <strong>Accounting Standard</strong>. (6) An MSME may opt for availing certain exemptions or relaxations from compliance with the requirements prescribed in an <strong>Accounting Standard</strong>: Provided that such a partial exemption or relaxation and disclosure shall not be permitted to mislead users of financial statements. <PdfRef page={8} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            3 . 9 Annexure 1 Applicability of Accounting Standards to Non-company Entities The Accounting Standards issued by the ICAI, as on April 1, 2024, and such standards as issued from time-to-time are applicable to Non-company entities subject to the relaxations and exemptions in the announcement. The Accounting Standards issued by ICAI as on April 1, 2024, are: <strong>AS 1</strong> Disclosure of Accounting Policies <strong>AS 2</strong> Valuation of Inventories <strong>AS 3</strong> Cash Flow Statements <strong>AS 4</strong> Contingencies and Events Occurring After the Balance Sheet Date <strong>AS 5</strong> Net Profit or Loss for the Period, Prior Period Items and Changes in Accounting Policies <strong>AS 7</strong> Construction Contracts <strong>AS 9</strong> Revenue <strong>Recognition</strong> <strong>AS 10</strong> Property, Plant and Equipment <strong>AS 11</strong> The Effects of Changes in Foreign Exchange Rates <strong>AS 12</strong> Accounting for Government Grants <strong>AS 13</strong> Accounting for <strong>Investments</strong> <strong>AS 14</strong> Accounting for Amalgamations <strong>AS 15</strong> Employee Benefits <strong>AS 16</strong> <strong>Borrowing Costs</strong> <strong>AS 17</strong> Segment Reporting <strong>AS 18</strong> Related Party <strong>Disclosures</strong> <strong>AS 19</strong> <strong>Leases</strong> <strong>AS 20</strong> Earnings Per Share <strong>AS 21</strong> Consolidated Financial Statements <strong>AS 22</strong> Accounting for Taxes on Income <PdfRef page={9} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCE D ACCOUNTING 3 . 10 <strong>AS 23</strong> Accounting for <strong>Investments</strong> in Associates in Consolidated Financial Statements <strong>AS 24</strong> Discontinuing Operations <strong>AS 25</strong> Interim Financial Reporting <strong>AS 26</strong> Intangible Assets <strong>AS 27</strong> Financial Reporting of Interests in Joint Ventures <strong>AS 28</strong> Impairment of Assets <strong>AS 29</strong> Provisions, Contingent Liabilities and Contingent Assets (1) Applicability of the Accounting Standards to Large Non-company entities Large entities are required to comply in full with all the Accounting Standards. (2) Applicability of the Accounting Standards and exemptions/relaxations for MSMEs (A) Accounting Standards not applicable to MSMEs in their entirety: (i) Accounting Standards not applicable to all MSMEs in their entirety: o <strong>AS 3</strong>, Cash Flow Statements o <strong>AS 17</strong>, Segment Reporting o <strong>AS 20</strong>, Earnings per Share o <strong>AS 24</strong>, Discontinuing Operations (ii) <strong>AS 18</strong>, Related Party <strong>Disclosures</strong> and <strong>AS 28</strong>, Impairment of Assets not applicable in their entirety to MSMEs: (a) whose turnover (excluding other income) does not exceed rupees fifty crore in the immediately preceding accounting year; (b) which does not have borrowings in excess of rupees ten crore at any time during the immediately preceding accounting year; and <PdfRef page={10} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            3 . 11 (c) which is not a Holding and subsidiary of an MSME not covered above. (B) Relaxations/exemptions from certain requirements of Accounting Standards to MSMEs (i) <strong>AS 10</strong>, Property, Plant and Equipment - MSMEs may not comply with paragraph 87 relating to encouraged disclosures. (ii) <strong>AS 11</strong>, The Effects of Changes in Foreign Exchange Rates - MSMEs may not comply with paragraph 44 relating to encouraged disclosures. (iii) <strong>AS 15</strong>, Employee Benefits (1) MSMEs may not comply with the following paragraphs: (a) paragraphs 11 to 16 of the standard to the extent they deal with recognition and measurement of short-term accumulating compensated absences which are nonvesting (i.e., short-term accumulating compensated absences in respect of which employees are not entitled to cash payment for unused entitlement on leaving); (b) paragraphs 46 and 139 of the Standard which deal with discounting of amounts that fall due more than 12 months after the balance sheet date; (c) recognition and measurement principles laid down in paragraphs 50 to 116 and presentation and disclosure requirements laid down in paragraphs 117 to 123 of the Standard in respect of accounting for defined benefit plans. However, such entities may calculate and account for the accrued liability under the defined benefit plans by reference to some other rational method, e.g., a method based on the assumption that such benefits are payable to all employees at the end of the accounting year; and <PdfRef page={11} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCE D ACCOUNTING 3 . 12 (d) recognition and measurement principles laid down in paragraphs 129 to 131 of the Standard in respect of accounting for other long-term employee benefits. Such entities may calculate and account for the accrued liability under the other long-term employee benefits by reference to some other rational method, e.g., a method based on the assumption that such benefits are payable to all employees at the end of the accounting year. (iv) <strong>AS 19</strong>, <strong>Leases</strong> MSMEs may not comply with paragraphs 22 (c), (e) and (f); 25 (a), (b) and (e); 37 (a), (f) and (g); 38; and 46 (b), (d) and (e) relating to disclosures. (v) <strong>AS 22</strong>, Accounting for Taxes on Income (a) MSMEs shall comply with the requirements of <strong>AS 22</strong> for Current tax defined in paragraph 4.4 of <strong>AS 22</strong>, with recognition as per paragraph 9, measurement as per paragraph 20 of <strong>AS 22</strong>, and presentation and disclosure as per paragraphs 27-28 of <strong>AS 22</strong>. (b) Transitional requirements - On the first occasion when an MSME avails this exemption, the accumulated deferred tax asset/liability appearing in the financial statements of immediate previous accounting period, shall be adjusted against the opening revenue reserves/owner’s funds. (vi) <strong>AS 26</strong>, Intangible Assets - MSMEs may not comply with paragraphs 90(d)(iii); 90(d)(iv) and 98 relating to disclosures. (vii) <strong>AS 28</strong>, Impairment of Assets (a) MSMEs that are otherwise not exempted from applying this standard [refer note 2(A)(ii)] are allowed to measure the ‘value in use’ on the basis of reasonable estimate thereof instead of computing the value in use by present value technique. Consequently, if such MSME chooses to measure <PdfRef page={12} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            3 . 13 the ‘value in use’ by not using the present value technique, the relevant provisions of <strong>AS 28</strong>, such as discount rate etc., would not be applicable to such an entity. Further, such an entity need not disclose the information required by paragraph 121(g) of the Standard. (b) MSMEs that are otherwise not exempted from applying this standard [refer note 2(A)(ii)] may not comply with paragraphs 121(c)(ii), 121(d)(i), 121(d)(ii) and 123 relating to disclosures. (viii) <strong>AS 29</strong>, Provisions, Contingent Liabilities and Contingent Assets - MSMEs may not comply with paragraphs 66 and 67 relating to disclosures. (C) In case of MSMEs, generally there are no such transactions that are covered under <strong>AS 14</strong>, Accounting for Amalgamations, or jointly controlled operations or jointly controlled assets covered under <strong>AS 27</strong>, Financial Reporting of Interests in Joint Ventures. Therefore, these standards are not applicable to MSMEs. However, if there are any such transactions, these entities shall apply the requirements of the relevant standard. (D) <strong>AS 21</strong>, Consolidated Financial Statements, <strong>AS 23</strong>, Accounting for <strong>Investments</strong> in Associates in Consolidated Financial Statements, <strong>AS 27</strong>, Financial Reporting of Interests in Joint Ventures (to the extent of requirements relating to Consolidated Financial Statements), and <strong>AS 25</strong>, Interim Financial Reporting, do not require a Non-company entity to present consolidated financial statements and interim financial report, respectively. Relevant AS is applicable only if a Non-company entity is required or elects to prepare and present consolidated financial statements or interim financial report. Example 1 As per the revised scheme effective from accounting periods commencing on or after April 1, 2024, classify non-company entities for the purpose of applicability of Accounting Standards. Briefly explain the criteria for each category. <PdfRef page={13} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCE D ACCOUNTING 3 . 14 Solution The revised scheme for applicability of Accounting Standards to Non-company entities shall come into effect in respect of accounting periods commencing on or after April 1, 2024, which is as under: 1. For the purpose of applicability of Accounting Standards, Non-company entities are classified into two categories, viz., Micro, Small and Medium Sized Entities (MSMEs) and Large entities. 2. MSME means, a non-company entity: (i) whose equity or debt securities are not listed or are not in the process of listing on any stock exchange, whether in India or outside India; (ii) which is not a bank, financial institution or an insurance company; (iii) whose turnover (excluding other income) does not exceed two hundred and fifty crore rupees in the immediately preceding accounting year; (iv) which does not have borrowings in excess of fifty crore rupees at any time during the immediately preceding accounting year; and (v) which is not a holding or subsidiary of an entity which is not a micro, small and medium-sized entity. Explanation - A non-company entity here shall qualify as a MSME, if the conditions mentioned above are satisfied as at the end of the relevant accounting period. Large entity is a non-company entity that is not an MSME. <PdfRef page={14} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS intro**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS intro, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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

        {/* Section: 2.3 Applicability of Accounting Standards to Companies */}
        <section id="as-intro-applicability-of-accounting-standards-to-companies" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-intro-applicability-of-accounting-standards-to-companies" num="2.3" title="Applicability of Accounting Standards to Companies" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            other than those following Indian Accounting Standards (Ind AS) 1 2.3.1 Accounting Standards applicable in their entirety to companies <strong>AS 1</strong> <strong>Disclosures</strong> of Accounting Policies <strong>AS 2</strong> Valuation of Inventories 1 For applicability of Ind AS to companies, refer Notification dated 16th February, 2015, issued by the Ministry of Corporate Affairs, Government of India. <PdfRef page={14} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            3 . 15 <strong>AS 3</strong> Cash Flow Statements <strong>AS 4</strong> Contingencies and Events Occurring After the Balance Sheet Date (revised 2016) <strong>AS 5</strong> Net Profit or Loss for the Period, Prior Period Items and Changes in Accounting Policies <strong>AS 7</strong> Construction Contracts <strong>AS 9</strong> Revenue <strong>Recognition</strong> <strong>AS 10</strong> Property, Plant and Equipment <strong>AS 11</strong> The Effects of Changes in Foreign Exchange Rates <strong>AS 12</strong> Accounting for Government Grants <strong>AS 13</strong> Accounting for <strong>Investments</strong> <strong>AS 14</strong> Accounting for Amalgamations <strong>AS 16</strong> <strong>Borrowing Costs</strong> <strong>AS 18</strong> Related Party <strong>Disclosures</strong> <strong>AS 21</strong> Consolidated Financial Statements <strong>AS 22</strong> Accounting for Taxes on Income <strong>AS 23</strong> Accounting for <strong>Investments</strong> in Associates in Consolidated Financial Statements <strong>AS 24</strong> Discontinuing Operations <strong>AS 26</strong> Intangible Assets <strong>AS 27</strong> Financial Reporting of Interest in Joint Ventures 2.3.2 Exemptions or Relaxations for Small and Medium Sized Companies (SMCs) as defined in the Notification dated June 23, 2021, issued by the Ministry of Corporate Affairs (MCA), Government of India (1) <strong>Accounting Standard</strong> not applicable to SMCs in their entirety: <strong>AS 17</strong> Segment Reporting <PdfRef page={15} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCE D ACCOUNTING 3 . 16 (2) Accounting Standards in respect of which relaxations from certain requirements have been given to SMCs: (i) <strong>Accounting Standard</strong> (AS) 15, Employee Benefits (revised 2005) (a) paragraphs 11 to 16 of the standard to the extent they deal with recognition and measurement of short-term accumulating compensated absences which are non-vesting (i.e., short-term accumulating compensated absences in respect of which employees are not entitled to cash payment for unused entitlement on leaving); (b) paragraphs 46 and 139 of the Standard which deal with discounting of amounts that fall due more than 12 months after the balance sheet date; (c) recognition and measurement principles laid down in paragraphs 50 to 116 and presentation and disclosure requirements laid down in paragraphs 117 to 123 of the Standard in respect of accounting for defined benefit plans. However, such companies should actuarially determine and provide for the accrued liability in respect of defined benefit plans by using the Projected Unit Credit Method and the discount rate used should be determined by reference to market yields at the balance sheet date on government bonds as per paragraph 78 of the Standard. Such companies should disclose actuarial assumptions as per paragraph 120(l) of the Standard; and (d) recognition and measurement principles laid down in paragraphs 129 to 131 of the Standard in respect of accounting for other long-term employee benefits. However, such companies should actuarially determine and provide for the accrued liability in respect of other long-term employee benefits by using the Projected Unit Credit Method and the discount rate used should be determined by reference to market yields at the balance sheet date on government bonds as per paragraph 78 of the Standard. <PdfRef page={16} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            3 . 17 (ii) <strong>AS 19</strong>, <strong>Leases</strong> Paragraphs 22 (c), (e) and (f); 25 (a), (b) and (e); 37 (a) and (f); and 46 (b) and (d) relating to disclosures are not applicable to SMCs. (iii) <strong>AS 20</strong>, Earnings Per Share Disclosure of diluted earnings per share (both including and excluding extraordinary items) is exempted for SMCs. (iv) <strong>AS 28</strong>, Impairment of Assets SMCs are allowed to measure the ‘value in use’ on the basis of reasonable estimate thereof instead of computing the value in use by present value technique. Consequently, if an SMC chooses to measure the ‘value in use’ by not using the present value technique, the relevant provisions of <strong>AS 28</strong>, such as discount rate etc., would not be applicable to such an SMC. Further, such an SMC need not disclose the information required by paragraph 121(g) of the Standard. (v) <strong>AS 29</strong>, Provisions, Contingent Liabilities and Contingent Assets (revised) Paragraphs 66 and 67 relating to disclosures are not applicable to SMCs. (3) <strong>AS 25</strong>, Interim Financial Reporting, does not require a company to present interim financial report. It is applicable only if a company is required or elects to prepare and present an interim financial report. Only certain Non-SMCs are required by the concerned regulators to present interim financial results, e.g., quarterly financial results required by the SEBI. Therefore, the recognition and measurement requirements contained in this Standard are applicable to those Non-SMCs for preparation of interim financial results. SUMMARY According to the Criteria for Classification of Entities and Applicability of Accounting Standards for companies as issued by the Government, there are two levels, namely, Small and Medium-sized Companies (SMCs) as defined in the Companies (Accounting Standards) Rules and companies other than SMCs. Non- SMCs are required to comply with all the Accounting Standards in their entirety, while certain exemptions/ relaxations have been given to SMCs. <PdfRef page={17} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCE D ACCOUNTING 3 . 18 Criteria for classification of non-company entities and applicability of Accounting Standards to non-company entities got revised. As per this criteria, there are two levels, namely, Micro, Small and Medium Sized Entities (MSMEs) and Large entities. Large entities are required to comply with all the Accounting Standards in their entirety, while certain exemptions/ relaxations have been given to MSMEs. TEST YOUR KNOWLEDGE MCQs 1. From which accounting period is the revised scheme for applicability of Accounting Standards to non-company entities effective? (a) April 1, 2023 (b) April 1, 2024 (c) August 13, 2024 (d) April 1, 2025 2. Which of the following is not a condition for classification of a non-company entity as an MSME under the revised ICAI criteria? (a) Turnover should not exceed ₹250 crore (b) Entity should not be a bank or insurance company (c) Entity should not have borrowings exceeding ₹100 crore (d) Entity should not be a subsidiary of a non-MSME 3. Which of the following Accounting Standards is not applicable in its entirety to all MSMEs? (a) <strong>AS 1</strong> – Disclosure of Accounting Policies (b) <strong>AS 3</strong> – Cash Flow Statements (c) <strong>AS 9</strong> – Revenue <strong>Recognition</strong> (d) <strong>AS 22</strong> – Accounting for Taxes on Income <PdfRef page={18} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            3 . 19 4. If a non-company entity newly qualifies as an MSME, when can it start availing exemptions available to MSMEs? (a) Immediately from the first year of qualification (b) From the second year after qualification (c) Only when it remains as an MSME for two consecutive years (d) Never; exemptions are only for companies 5. Zeta Traders, a partnership firm, had a turnover of ₹240 crore and borrowings of ₹40 crore in FY 2023 –24. It is not a bank, not into insurance business or listed entity and also not a holding or subsidiary of any other entity. For FY 2024–25, it wants to avail exemptions available to MSMEs under Accounting Standards. Is it eligible? (a) Yes, because both turnover and borrowing are within limits (b) No, because it had high turnover (c) No, because it must remain MSME for two years to claim exemptions (d) Yes, because it qualifies as an MSME this year 6. ABC &amp; Co., a non-company entity, was an MSME in FY 2022–23 and availed certain exemptions. In FY 2023– 24, its turnover exceeded ₹300 crore. What should ABC &amp; Co. do in FY 2024–25? (a) Continue to use all MSME exemptions (b) Revise prior year financials to remove MSME exemptions (c) Apply full AS requirements in FY 2024–25 and disclose change (d) Continue partial compliance with disclosure only 7. X Ltd., a listed non- company entity, has turnover of ₹40 crore and borrowings of ₹5 crore. It is not a bank or a financial institution. Can it be classified as an MSME? (a) Yes, because turnover and borrowings are within MSME limits (b) No, because it is a listed entity (c) Yes, because it is not a subsidiary or holding company <PdfRef page={19} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCE D ACCOUNTING 3 . 20 (d) No, because listed entities are classified as large entities 8. MNO Enterprises, an unlisted LLP, qualifies as an MSME in FY 2023–24 and chooses to not claim exemption from <strong>AS 15</strong> (Employee Benefits), but avails relaxation from <strong>AS 3</strong>. What disclosure is required in its financial statements? (a) It must disclose full compliance with all AS (b) It need not disclose anything since partial exemption is allowed (c) It must disclose that it is an MSME and mention Standards from which exemptions are availed (d) It must revise previous year’s financials due to partial compliance Theory Questions 9. What are the issues, with which Accounting Standards deal? 10. Explain the revised classification of Non-company entities for the applicability of Accounting Standards as per ICAI’s August 2024 announcement. 11. What are the key disclosure requirements for MSMEs availing exemptions under Accounting Standards? Case Scenario 12. Ravi Traders, an unlisted partnership firm, had a turnover of ₹230 crore and borrowings of ₹45 crore during the financial year 2023 –24. It is not a bank, financial institution, or insurance company, and also not a subsidiary of any other entity. The firm wishes to avail MSME exemptions for FY 2024–25. Is it eligible? 13. Om Finserv LLP had a turnover of ₹180 crore and borrowings of ₹55 crore in FY 2023 –24. It is not a listed entity or a financial institution or a subsidiary of any entity. Can it classify as an MSME and avail related exemptions in FY 2024– 25? <PdfRef page={20} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            3 . 21 ANSWERS/HINTS MCQs 1 (b) 2 (c) 3 (b) 4 (c) 5 (d) 6 (c) 7 (b) 8 (c) Theoretical Questions 9. Accounting Standards deal with the issues of (i) <strong>Recognition</strong> of events and transactions in the financial statements; (ii) <strong>Measurement</strong> of these transactions and events; (iii) Presentation of these transactions and events in the financial statements in a manner that is meaningful and understandable to the reader; and (iv) Disclosure requirements. 10. As per the ICAI’s revised announcement (August 2024), non-company entities are classified into two categories for the purpose of applicability of Accounting Standards: 1. Micro, Small and Medium Sized Entities (MSMEs) 2. Large Entities A non-company entity is classified as an MSME if it satisfies all the following conditions: • Its equity or debt securities are not listed, nor in the process of listing, on any stock exchange (India or abroad). • It is not a bank, financial institution, or insurance company. • Its turnover (excluding other income) does not exceed ₹250 crore in the immediately preceding accounting year. • Its borrowings do not exceed ₹50 crore at any time during the immediately preceding accounting year. • It is not a holding or subsidiary of an entity that is not an MSME. A non-company entity that does not satisfy any one or more of the above conditions is classified as a Large Entity. <PdfRef page={21} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADVANCE D ACCOUNTING 3 . 22 11. As per the revised ICAI announcement, the following key disclosures are required when MSMEs avail exemptions or relaxations under the Accounting Standards: 1. General Disclosure: An MSME that avails any exemption or relaxation must disclose in its financial statements: o That it is an MSME as per the ICAI definition. o That it has complied with Accounting Standards applicable to MSMEs. 2. Partial Exemption Disclosure: If an MSME opts not to avail exemptions in respect of certain Standards but avails them for others, it must specify: o The Standards for which it has availed exemption/relaxation. o The Standards for which full compliance has been made. 3. Loss of MSME Status: If an MSME no longer qualifies in the current accounting period, it must: o Apply full AS requirements from the current year. o Disclose that it had availed exemptions in the prior year. o Clarify that previous year figures are not revised solely due to change in classification. 4. Newly Qualifying MSME: A non-company entity that newly qualifies as an MSME can avail exemptions only after it remains as MSME for two consecutive years. Until then, full AS compliance is required. These disclosures ensure transparency and help financial statement users understand the basis of preparation and compliance with applicable standards. <PdfRef page={22} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            3 . 23 Case Scenario 12. Yes, Ravi Traders qualifies as an MSME since it meets all five criteria: it is unlisted, not a bank/FI/insurance company, turnover &lt; ₹250 crore, borrowings &lt; ₹50 crore, and not a subsidiary/holding. Hence it can avail MSME exemptions in FY 2024–25. Further, it has been assumed that Ravi Traders is not newly qualifying as an MSME in FY 2024-25 because a non-company entity that newly qualifies as an MSME can avail exemptions only after it remains as MSME for two consecutive years. Until then, full AS compliance is required. 13. No, Om Finserv LLP cannot be classified as an MSME because its borrowings exceeded ₹ 50 crore, which violates one of the key conditions for qualifying as an MSME. It will be treated as a Large entity and would have to comply fully with all the applicable Accounting Standards. <PdfRef page={23} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS intro**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS intro, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
