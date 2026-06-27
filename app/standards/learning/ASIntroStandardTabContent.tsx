'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, ChevronDown } from 'lucide-react'

export const asintroSections = [
  { id: 'intro', title: '1. Introduction & Objectives' },
  { id: 'compliance', title: '2. Mandatory Status & Compliance' },
  { id: 'tax-icds', title: '3. AS vs. Income Tax & ICDS' },
  { id: 'non-company', title: '4. Classification of Non-Companies' },
  { id: 'msme-rules', title: '5. AS Applicability to MSMEs' },
  { id: 'corporate', title: '6. Corporate Classification (SMCs)' },
  { id: 'smc-rules', title: '7. AS Applicability & Exemptions for SMCs' },
  { id: 'compendium', title: '8. Compendium of Standards' }
];

interface ASIntroStandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function ASIntroStandardTabContent({ navigateToPdfPage }: ASIntroStandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('intro');
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    'icds': true,
    'msme-relax': true,
    'smc-relax': true
  });

  const toggleAccordion = (id: string) => {
    setOpenAccordions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const sectionToChapterMap: Record<string, string> = {
    'intro': 'intro',
    'compliance': 'compliance',
    'tax-icds': 'tax-icds',
    'non-company': 'non-company',
    'msme-rules': 'msme-rules',
    'corporate': 'corporate',
    'smc-rules': 'smc-rules',
    'compendium': 'compendium'
  };

  const tocScrollRef = useRef<HTMLDivElement>(null);

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
              const secId = entry.target.id.replace('intro-', '');
              const chapterId = sectionToChapterMap[secId] || secId;
              setActiveSection(chapterId);
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
        const el = document.getElementById(`intro-${sec.id}`);
        if (el && observer) observer.observe(el);
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

  const ChapterHeader = ({ num, title, description }: { num: string; title: string; description: string }) => {
    return (
      <div className="w-full mb-6 mt-12 first:mt-2">
        <div className="flex items-baseline gap-2 mb-2">
          <h2 className="text-[20px] sm:text-[22px] font-sans font-bold text-slate-900 dark:text-white tracking-tight leading-tight flex items-baseline gap-2">
            <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold mr-1 select-none">{num}.</span>
            <span>{title}</span>
          </h2>
        </div>
        <div className="h-[1.5px] w-full bg-slate-200/80 dark:bg-slate-800/80 mb-3" />
        {description && (
          <p className="text-[13.5px] font-sans font-medium text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    );
  };

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(`intro-${id}`);
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
      {/* Sticky Sub-Navbar (TOC) */}
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
          
          {/* Chapter 1: Introduction & Objectives */}
          <section id="intro-intro" className="scroll-mt-36 space-y-6 w-full">
            <ChapterHeader num="1" title="Introduction &amp; Objectives" description="Evolution, nature, and the core purpose of formulating standardized accounting frameworks." />
            <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
              <PdfRef page={2} /> Accounting Standards (AS) are developed by the **Accounting Standards Board (ASB)** of the **Institute of Chartered Accountants of India (ICAI)**. They are formulated to reduce diversity in accounting treatments, establish standardized disclosure frameworks, and improve comparability of financial statements across enterprises.
            </p>
            <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
              Accounting Standards are issued under the authority of the Council of the ICAI, and are subsequently reviewed, vetted, and approved for corporate entities by the **Ministry of Corporate Affairs (MCA)**. These standards do **not** override local regulatory laws and statutes. In case of any conflict between a provisions of a standard and a legislative act, the act prevails.
            </p>
            <NB type="info" title="Three Fundamental Applicability Questions">
              When determining whether a particular Accounting Standard applies to a specific scenario, the preparer must resolve three distinct questions:
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li><strong>Enterprise Applicability:</strong> Does the standard apply to the target enterprise concerned?</li>
                <li><strong>Financial Statement Applicability:</strong> Does the standard apply to the financial statements being prepared?</li>
                <li><strong>Financial Item Applicability:</strong> Does the standard apply to the specific financial transaction or item?</li>
              </ol>
            </NB>
            <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
              <PdfRef page={3} /> Accounting Standards apply to all enterprises engaged in commercial, industrial, or business activities, regardless of whether they are profit-oriented or established for charitable or religious purposes. If any part of the activity of an enterprise is commercial in nature, the standards apply to all of its activities.
            </p>
          </section>

          {/* Chapter 2: Mandatory Status & Compliance */}
          <section id="intro-compliance" className="scroll-mt-36 space-y-6 w-full">
            <ChapterHeader num="2" title="Mandatory Status &amp; Compliance" description="Statutory mandates under the Companies Act, 2013 and attest obligations of ICAI members." />
            <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
              <PdfRef page={3} /> Compliance with Accounting Standards is mandatory for corporate entities under **Section 129(1)** of the Companies Act, 2013. The company must prepare its financial statements in compliance with the standards notified under **Section 133**.
            </p>
            <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
              Furthermore, under **Section 143(3)(e)**, the statutory auditor has a mandatory duty to state in their audit report whether, in their opinion, the financial statements of the company comply with the standards referred to in Section 133.
            </p>
            <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
              <PdfRef page={4} /> If there is a deviation from the standards, the company must disclose under **Section 129(5)**: (a) the reasons for the deviation, (b) the financial impact of the deviation, and (c) a description of the deviation itself.
            </p>
            <NB type="warning" title="Attest Function Duty for Non-Corporate Entities">
              For non-corporate entities (e.g. partnership firms, LLPs, proprietorships) where the governing statute does not explicitly mandate compliance, the **mandatory status of Accounting Standards** applies through the auditor\'s professional obligations:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Members of the ICAI, while performing their attest functions (audits), must examine whether the financial statements comply with the standards.</li>
                <li>In case of deviation, the auditor must disclose the deviation in their audit report to inform the users.</li>
              </ul>
            </NB>
            <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
              <strong>Materiality:</strong> Accounting Standards are intended to apply only to **material items**. An item is material if its omission or misstatement is likely to influence the economic decisions of a user. Materiality is a matter of professional judgment and is judged on a case-by-case basis.
            </p>
            <NB type="success" title="Example of Materiality (Para 4)">
              A penalty of ₹50,000 paid for breach of environmental laws by a large manufacturing company might be financially insignificant compared to its multi-crore turnover. Yet, it is **material** because of the information it conveys regarding regulatory compliance and potential reputational risks. It must be disclosed separately.
            </NB>
          </section>

          {/* Chapter 3: AS vs. Income Tax & ICDS */}
          <section id="intro-tax-icds" className="scroll-mt-36 space-y-6 w-full">
            <ChapterHeader num="3" title="Accounting Standards vs. Income Tax &amp; ICDS" description="The separation between financial presentation standards and tax computation regulations." />
            <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
              <PdfRef page={4} /> Accounting Standards are formulated to establish a true and fair presentation of the financial position. Taxation laws, on the other hand, represent fiscal policy to collect revenue. Consequently, a treatment mandated by a standard does not automatically qualify for tax deductions or exemptions.
            </p>
            <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
              <PdfRef page={5} /> For instance, under **AS 19 (Leases)**, the lessee capitalizes a finance lease and charges depreciation. However, for income tax purposes, depreciation is allowed to the lessor as the legal owner.
            </p>
            <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
              Under **Section 145(2)** of the Income Tax Act, 1961, the Central Government has notified **ten Income Computation and Disclosure Standards (ICDSs)** to calculate business income. These apply to all assesses (excluding individuals/HUFs not subject to audit under Section 44AB) who follow the mercantile system of accounting.
            </p>
            
            <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
              <button 
                onClick={() => toggleAccordion('icds')} 
                className="w-full bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer select-none"
              >
                <span className="font-bold text-slate-900 dark:text-white text-sm">The Ten Notified ICDSs (Level &amp; Names)</span>
                <ChevronDown size={16} className={`transform transition-transform ${openAccordions.icds ? 'rotate-180' : ''}`} />
              </button>
              {openAccordions.icds && (
                <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2 leading-relaxed font-sans">
                  <ol className="list-decimal pl-5 space-y-1">
                    <li><strong>ICDS I:</strong> Accounting Policies (corresponds to AS 1)</li>
                    <li><strong>ICDS II:</strong> Valuation of Inventories (corresponds to AS 2)</li>
                    <li><strong>ICDS III:</strong> Construction Contracts (corresponds to AS 7)</li>
                    <li><strong>ICDS IV:</strong> Revenue Recognition (corresponds to AS 9)</li>
                    <li><strong>ICDS V:</strong> Tangible Fixed Assets (corresponds to AS 10)</li>
                    <li><strong>ICDS VI:</strong> Effects of Changes in Foreign Exchange Rates (corresponds to AS 11)</li>
                    <li><strong>ICDS VII:</strong> Government Grants (corresponds to AS 12)</li>
                    <li><strong>ICDS VIII:</strong> Securities (corresponds to AS 13)</li>
                    <li><strong>ICDS IX:</strong> Borrowing Costs (corresponds to AS 16)</li>
                    <li><strong>ICDS X:</strong> Provisions, Contingent Liabilities and Contingent Assets (corresponds to AS 29)</li>
                  </ol>
                </div>
              )}
            </div>
          </section>

          {/* Chapter 4: Classification of Non-Company Entities */}
          <section id="intro-non-company" className="scroll-mt-36 space-y-6 w-full">
            <ChapterHeader num="4" title="Classification of Non-Company Entities" description="ICAI revised August 2024 classification criteria separating MSMEs from Large Entities." />
            <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
              <PdfRef page={6} /> The Council of the ICAI revised the criteria for classification of Non-Company entities (effective for accounting periods starting on or after **April 1, 2024**). Entities are classified into two broad categories:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[15px] font-sans text-slate-800 dark:text-slate-200 mb-4">
              <li><strong>Micro, Small and Medium Sized Entities (MSMEs):</strong> Unlisted, non-regulated entities falling within specified financial limits.</li>
              <li><strong>Large Entities:</strong> Any non-company entity that is not an MSME. Large entities must comply in full with all Accounting Standards.</li>
            </ul>
            
            <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-xl">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 font-sans text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900/40">
                  <tr>
                    <th className="px-6 py-3 text-left font-bold text-slate-900 dark:text-white">Condition / Test</th>
                    <th className="px-6 py-3 text-left font-bold text-slate-900 dark:text-white">MSME Limit Criteria</th>
                    <th className="px-6 py-3 text-left font-bold text-slate-900 dark:text-white">Large Entity Criteria</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr>
                    <td className="px-6 py-4 font-semibold">1. Listing Status</td>
                    <td className="px-6 py-4">Neither listed nor in process of listing (equity or debt)</td>
                    <td className="px-6 py-4">Listed or in process of listing (India or abroad)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold">2. Regulation Status</td>
                    <td className="px-6 py-4">Not a bank, financial institution, or insurance company</td>
                    <td className="px-6 py-4">Is a bank, FI, or insurance company</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold">3. Turnover Limit</td>
                    <td className="px-6 py-4">Does not exceed <strong>₹250 crores</strong> in preceding year</td>
                    <td className="px-6 py-4">Exceeds <strong>₹250 crores</strong> in preceding year</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold">4. Borrowings Limit</td>
                    <td className="px-6 py-4">Does not exceed <strong>₹50 crores</strong> at any time in preceding year</td>
                    <td className="px-6 py-4">Exceeds <strong>₹50 crores</strong> at any time in preceding year</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold">5. Holding/Subsidiary</td>
                    <td className="px-6 py-4">Not holding/subsidiary of a non-MSME entity</td>
                    <td className="px-6 py-4">Is a holding/subsidiary of a non-MSME entity</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <NB type="exam" title="Important Transition Rules (Para &amp; 8.3)">
              The transition rules contain specific guidelines for entities whose classification status changes:
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li><strong>Large to MSME (Two-Year Waiting Period):</strong> If a Large entity becomes an MSME, it **cannot** claim exemptions until it remains an MSME for **two consecutive years**.</li>
                <li><strong>MSME to Large (Prospective compliance):</strong> If an MSME ceases to qualify, all standards become applicable from the **current period** immediately. Figures for the preceding year do not need revision.</li>
              </ol>
            </NB>
          </section>

          {/* Chapter 5: AS Applicability to MSMEs */}
          <section id="intro-msme-rules" className="scroll-mt-36 space-y-6 w-full">
            <ChapterHeader num="5" title="Accounting Standard Applicability &amp; Exemptions to MSMEs" description="Exhaustive breakdown of Standards that are exempt or relaxed for MSMEs." />
            <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
              <PdfRef page={10} /> For non-company MSMEs, the Council of the ICAI has provided several key exemptions and relaxations:
            </p>
            <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
              <strong>1. Standards Not Applicable in their Entirety:</strong>
              <br />
              MSMEs are completely exempt from preparing or complying with:
              <br />
              • **AS 3** (Cash Flow Statements)
              <br />
              • **AS 17** (Segment Reporting)
              <br />
              • **AS 20** (Earnings Per Share)
              <br />
              • **AS 24** (Discontinuing Operations)
            </p>
            <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
              <strong>2. Specific Size-Based Exemptions (AS 18 and AS 28):</strong>
              <br />
              **AS 18** (Related Party Disclosures) and **AS 28** (Impairment of Assets) do not apply in their entirety to MSMEs whose turnover is ₹50 crores or less, and borrowings are ₹10 crores or less, in the preceding year.
            </p>

            <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
              <button 
                onClick={() => toggleAccordion('msme-relax')} 
                className="w-full bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer select-none"
              >
                <span className="font-bold text-slate-900 dark:text-white text-sm">Key Relaxations for MSMEs (AS 15, 19, 22, 28)</span>
                <ChevronDown size={16} className={`transform transition-transform ${openAccordions['msme-relax'] ? 'rotate-180' : ''}`} />
              </button>
              {openAccordions['msme-relax'] && (
                <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed font-sans">
                  <p><strong>AS 15 (Employee Benefits):</strong> MSMEs are exempt from actuarial valuation rules for defined benefits and short-term compensated absences. They can use simpler accrual estimates based on year-end valuations.</p>
                  <p><strong>AS 19 (Leases):</strong> Exempted from several detailed disclosure requirements relating to future lease commitments and reconciliations.</p>
                  <p><strong>AS 22 (Taxes on Income):</strong> MSMEs only need to compute and account for current taxes. Deferred taxes (DTA/DTL) calculation is not required. On first transition, accumulated DTA/DTL is adjusted against opening reserves.</p>
                  <p><strong>AS 28 (Impairment of Assets):</strong> Value in use can be calculated using reasonable estimates without applying present value discounting techniques.</p>
                </div>
              )}
            </div>
          </section>

          {/* Chapter 6: Corporate Classification (SMCs vs. Non-SMCs) */}
          <section id="intro-corporate" className="scroll-mt-36 space-y-6 w-full">
            <ChapterHeader num="6" title="Corporate Classification (SMCs vs. Non-SMCs)" description="Regulatory boundaries for companies defined under the Companies (AS) Rules, 2021." />
            <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
              <PdfRef page={14} /> For corporate entities, the Central Government (Ministry of Corporate Affairs) has notified the Companies (Accounting Standards) Rules, 2021. Under these rules, companies are classified into two levels:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[15px] font-sans text-slate-800 dark:text-slate-200 mb-4">
              <li><strong>Small and Medium-sized Companies (SMCs):</strong> Companies that meet specific criteria and are eligible for exemptions.</li>
              <li><strong>Non-SMCs (Large Companies):</strong> Companies that do not qualify as SMCs. They must comply with all Accounting Standards in their entirety.</li>
            </ul>

            <NB type="info" title="SMC Definition Criteria (Notification June 2021)">
              A company qualifies as a **Small and Medium-sized Company (SMC)** if it satisfies all of the following conditions:
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li><strong>Listing:</strong> Neither its equity nor debt securities are listed or in process of listing (India or abroad).</li>
                <li><strong>Sector:</strong> Not a bank, financial institution, or insurance company.</li>
                <li><strong>Turnover:</strong> Turnover (excluding other income) does not exceed <strong>₹250 crores</strong> in the immediately preceding year.</li>
                <li><strong>Borrowings:</strong> Borrowings (including public deposits) do not exceed <strong>₹50 crores</strong> at any time during the preceding year.</li>
                <li><strong>Group Status:</strong> Is not a holding or subsidiary of a non-SMC company.</li>
              </ol>
            </NB>
          </section>

          {/* Chapter 7: AS Applicability & Exemptions for SMCs */}
          <section id="intro-smc-rules" className="scroll-mt-36 space-y-6 w-full">
            <ChapterHeader num="7" title="AS Applicability &amp; Exemptions for SMCs" description="Relaxations and exemptions allowed to corporate SMCs under Companies Rules." />
            <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
              <PdfRef page={15} /> Small and Medium-sized Companies (SMCs) enjoy specific relaxations to ease the reporting burden:
            </p>
            <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
              <strong>1. Full Exemption:</strong>
              <br />
              SMCs are completely exempt from complying with **AS 17 (Segment Reporting)**.
            </p>
            
            <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
              <button 
                onClick={() => toggleAccordion('smc-relax')} 
                className="w-full bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer select-none"
              >
                <span className="font-bold text-slate-900 dark:text-white text-sm">Key SMC Relaxations (AS 15, 19, 20, 28)</span>
                <ChevronDown size={16} className={`transform transition-transform ${openAccordions['smc-relax'] ? 'rotate-180' : ''}`} />
              </button>
              {openAccordions['smc-relax'] && (
                <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed font-sans">
                  <p><strong>AS 15 (Employee Benefits):</strong> Relaxed from actuarial obligations for short-term accumulating compensated absences. Under defined benefits, they must calculate using the Projected Unit Credit (PUC) method, but have relaxations on detailed disclosures.</p>
                  <p><strong>AS 19 (Leases):</strong> Exempted from disclosing reconciliations between gross investments and present value of minimum lease payments.</p>
                  <p><strong>AS 20 (Earnings Per Share):</strong> SMCs are exempt from calculating and disclosing **Diluted EPS**. They only need to present Basic EPS.</p>
                  <p><strong>AS 28 (Impairment of Assets):</strong> Value in use can be measured using reasonable estimates without applying present value discounting techniques.</p>
                  <p><strong>AS 29 (Provisions &amp; Contingencies):</strong> Exempted from certain disclosures under paragraphs 66 and 67.</p>
                </div>
              )}
            </div>
          </section>

          {/* Chapter 8: Compendium of Standards */}
          <section id="intro-compendium" className="scroll-mt-36 space-y-6 w-full">
            <ChapterHeader num="8" title="Compendium of Standards" description="The complete list of Accounting Standards (AS 1 to AS 29) applicable under Indian GAAP." />
            <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
              <PdfRef page={9} /> The complete compendium of Accounting Standards includes 27 active standards (AS 6 and AS 8 having been withdrawn and merged into AS 10 and AS 26, respectively):
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-sans my-4">
              <div className="p-4 border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/20 rounded-xl space-y-1">
                <p><strong>AS 1:</strong> Disclosure of Accounting Policies</p>
                <p><strong>AS 2:</strong> Valuation of Inventories</p>
                <p><strong>AS 3:</strong> Cash Flow Statements</p>
                <p><strong>AS 4:</strong> Contingencies and Events Occurring After Balance Sheet Date</p>
                <p><strong>AS 5:</strong> Net Profit/Loss, Prior Period Items and Policy Changes</p>
                <p><strong>AS 7:</strong> Construction Contracts</p>
                <p><strong>AS 9:</strong> Revenue Recognition</p>
                <p><strong>AS 10:</strong> Property, Plant and Equipment</p>
                <p><strong>AS 11:</strong> Effects of Changes in Foreign Exchange Rates</p>
                <p><strong>AS 12:</strong> Accounting for Government Grants</p>
                <p><strong>AS 13:</strong> Accounting for Investments</p>
                <p><strong>AS 14:</strong> Accounting for Amalgamations</p>
                <p><strong>AS 15:</strong> Employee Benefits</p>
              </div>
              <div className="p-4 border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/20 rounded-xl space-y-1">
                <p><strong>AS 16:</strong> Borrowing Costs</p>
                <p><strong>AS 17:</strong> Segment Reporting</p>
                <p><strong>AS 18:</strong> Related Party Disclosures</p>
                <p><strong>AS 19:</strong> Leases</p>
                <p><strong>AS 20:</strong> Earnings Per Share</p>
                <p><strong>AS 21:</strong> Consolidated Financial Statements</p>
                <p><strong>AS 22:</strong> Accounting for Taxes on Income</p>
                <p><strong>AS 23:</strong> Investments in Associates in CFS</p>
                <p><strong>AS 24:</strong> Discontinuing Operations</p>
                <p><strong>AS 25:</strong> Interim Financial Reporting</p>
                <p><strong>AS 26:</strong> Intangible Assets</p>
                <p><strong>AS 27:</strong> Financial Reporting of Interests in Joint Ventures</p>
                <p><strong>AS 28:</strong> Impairment of Assets</p>
                <p><strong>AS 29:</strong> Provisions, Contingent Liabilities and Contingent Assets</p>
              </div>
            </div>

            <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
              Exemptions and applicability thresholds are highly tested in initial case scenario questions. Memorize the ₹250 cr Turnover and ₹50 cr Borrowings limits for both companies (SMCs) and non-companies (MSMEs). Remember that SMC rules are governed by MCA, while MSME levels are governed by ICAI.
            </NB>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
              <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                  Professional Accountant Guide
                </h4>
                <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                  When dealing with non-company entities, ensure you append the required notes describing the entity\'s level (MSME status) and disclosing any standards from which exemptions are being availed.
                </p>
              </div>
              <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  Statutory Auditor Note
                </h4>
                <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                  Confirm that the company meets all five SMC criteria in the preceding financial year before accepting financial statements prepared with SMC exemptions. Any breach requires full compliance immediately.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
