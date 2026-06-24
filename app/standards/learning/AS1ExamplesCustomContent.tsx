'use client'

import React, { useState } from 'react'
import { FileText, AlertTriangle, Scale, BookOpen, CheckCircle, Info, HelpCircle, ShieldAlert, Award, ArrowRight } from 'lucide-react'

interface AS1ExamplesCustomContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences: (text: string) => React.ReactNode;
}

export function AS1ExamplesCustomContent({ navigateToPdfPage }: AS1ExamplesCustomContentProps) {
  const [activeSection, setActiveSection] = useState('icai-illustrations')
  
  const PdfRef = ({ page }: { page: number }) => (
    <button
      onClick={() => navigateToPdfPage(page)}
      className="inline-flex items-center justify-center w-4 h-4 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-955/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-650 dark:text-red-400 rounded transition-all cursor-pointer select-none align-middle"
      title={`Open ICAI AS 1 PDF — Page ${page}`}
    >
      <FileText size={10} className="shrink-0" />
    </button>
  )

  const sectionIndex = [
    { id: 'icai-illustrations', title: '1. ICAI Illustrations' },
    { id: 'business-examples',  title: '2. Practical Business Examples' },
    { id: 'audit-cases',       title: '3. Audit Case Studies' },
    { id: 'regulatory-obs',    title: '4. Regulatory Observations' },
    { id: 'legal-cases',       title: '5. Landmark Judicial Cases' },
    { id: 'exam-oriented',     title: '6. Exam-Oriented Corner' },
    { id: 'audit-notes',       title: '7. Audit Notes & Reporting' }
  ]

  const handleIndexClick = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(`sec-${id}`)
    const container = document.getElementById('as1-scroll-container')
    if (element && container) {
      const containerRect = container.getBoundingClientRect()
      const targetRect = element.getBoundingClientRect()
      // Adjust scroll to align nicely below the sticky TOC bar
      const targetScrollTop = targetRect.top - containerRect.top + container.scrollTop - 98 + 2
      container.scrollTo({ top: targetScrollTop, behavior: 'auto' })
    }
  }

  return (
    <div className="w-full space-y-12 animate-fade-in font-sans">
      {/* Chapter Index Quick Links */}
      <div className="bg-slate-50 dark:bg-[#111726]/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 w-full">
        <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3.5 flex items-center gap-2">
          <BookOpen size={14} />
          <span>Section Index — Quick Navigation</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {sectionIndex.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleIndexClick(sec.id)}
              className="flex items-center justify-between px-3 py-2 bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 rounded-lg hover:border-indigo-550 dark:hover:border-indigo-500 text-left cursor-pointer transition-all shadow-xs group"
            >
              <span className="text-[12.5px] font-semibold text-slate-700 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white truncate">
                {sec.title}
              </span>
              <ArrowRight size={12} className="text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1.5" />
            </button>
          ))}
        </div>
      </div>

      {/* ─── SECTION 1: ICAI ILLUSTRATIONS ────────────────────────────────────── */}
      <section id="sec-icai-illustrations" className="space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
        <div className="border-l-4 border-indigo-600 pl-4 space-y-2">
          <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
            1. ICAI Illustrations
          </h2>
          <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">
            Core concept illustrations mapping to the official ICAI Study Material, demonstrating standard selection and valuation principles.
          </p>
        </div>

        {/* Card 1.1: Accounting Policies vs. Estimates */}
        <div className="bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/60 pb-4">
            <div className="space-y-1">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-gray-500 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded">Illustration 1.1</span>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white font-serif">Accounting Policies vs. Accounting Estimates</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200/30">
              Para 11-13
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-[14.5px] leading-[1.7] text-slate-800 dark:text-slate-300">
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-[#171C2B] p-5 rounded-xl border border-slate-200 dark:border-slate-800/80">
                <h5 className="text-[11px] font-extrabold text-slate-450 dark:text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <span>📋</span> Facts
                </h5>
                <p className="font-serif">
                  A manufacturing company changes its method of measuring the cost of work-in-progress (WIP) from charging a flat rate of factory overheads (25% of direct labor) to a detailed activity-based absorption rate system based on machine-hour utilisation. Concurrently, the company increases the provision for warranty claims from 2% of sales to 4% based on technical reports of early failures in a new product line.
                </p>
              </div>
              <div className="bg-[#FFFDF5] dark:bg-[#25201A] p-5 rounded-xl border border-[#F6EED5] dark:border-amber-900/30">
                <h5 className="text-[11px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <span>🔍</span> The Issue
                </h5>
                <p className="font-serif">
                  How should the company classify these two changes? Which represents a change in accounting policy under AS 1, and which represents a change in accounting estimate?
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-[#F5F8FF] dark:bg-[#1A2035] p-5 rounded-xl border border-[#DCE4FF] dark:border-blue-900/30">
                <h5 className="text-[11px] font-extrabold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <span>⚖️</span> AS 1 Principles &amp; Analysis
                </h5>
                <p className="font-serif">
                  <strong>Accounting Policies</strong> refer to the specific accounting principles and methods of applying them <PdfRef page={4} />. Choosing to transition the WIP cost absorption formula from an arbitrary percentage to machine hours is a method of applying the cost principle; hence, it is a change in accounting policy.
                </p>
                <p className="font-serif mt-2">
                  <strong>Accounting Estimates</strong> (governed by AS 5) involve estimating variables like useful lives, provisions, or warranty liabilities. Adjusting the warranty percentage based on technical updates is a change in accounting estimate.
                </p>
              </div>
              <div className="bg-[#F6FCF8] dark:bg-[#17271F] p-5 rounded-xl border border-[#D2ECD9] dark:border-green-900/30">
                <h5 className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-450 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <span>✏️</span> Treatment &amp; Disclosure
                </h5>
                <p className="font-serif">
                  The machine-hour valuation shift must be treated retrospectively as a policy change and disclosed in the Notes to Accounts, with the current-year financial impact quantified <PdfRef page={7} />. The warranty provision change is adjusted prospectively in the P&L statement, with the estimate change details disclosed under AS 5.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 1.2: Materiality and Prudence */}
        <div className="bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/60 pb-4">
            <div className="space-y-1">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-gray-500 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded">Illustration 1.2</span>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white font-serif">Conflict of Prudence vs. Materiality</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200/30">
              Para 17
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-[14.5px] leading-[1.7] text-slate-800 dark:text-slate-300 font-serif">
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-[#171C2B] p-5 rounded-xl border border-slate-200 dark:border-slate-800/80">
                <h5 className="text-[11px] font-extrabold text-slate-450 dark:text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <span>📋</span> Facts
                </h5>
                <p>
                  A trading company purchases office stationery worth ₹5,00,000. These items are technically expected to be consumed over 3 years. The company capitalizes them as assets and proposes to write them down as depreciation over 3 years. The auditor suggests that since this amount is less than 0.5% of total assets, it should be expensed immediately under the concept of materiality, even though it violates the matching principle.
                </p>
              </div>
              <div className="bg-[#FFFDF5] dark:bg-[#25201A] p-5 rounded-xl border border-[#F6EED5] dark:border-amber-900/30">
                <h5 className="text-[11px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <span>🔍</span> The Issue
                </h5>
                <p>
                  Does writing off the stationery immediately conform to AS 1? Can materiality override other accounting considerations like prudence or the matching principle?
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-[#F5F8FF] dark:bg-[#1A2035] p-5 rounded-xl border border-[#DCE4FF] dark:border-blue-900/30">
                <h5 className="text-[11px] font-extrabold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <span>⚖️</span> AS 1 Principles &amp; Analysis
                </h5>
                <p>
                  Under AS 1, <strong>Materiality</strong> dictates that financial statements should disclose all items whose knowledge might influence the decision of users <PdfRef page={6} />. Expense items of trivial relative value can be written off immediately because the administrative effort to track and depreciate them does not yield any meaningful benefit to stakeholders.
                </p>
                <p className="mt-2">
                  Writing down the ₹5,00,000 stationery immediately as an operating expense complies with AS 1, as the information is immaterial to the users of financial statements.
                </p>
              </div>
              <div className="bg-[#F6FCF8] dark:bg-[#17271F] p-5 rounded-xl border border-[#D2ECD9] dark:border-green-900/30">
                <h5 className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-450 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <span>✏️</span> Treatment &amp; Disclosure
                </h5>
                <p>
                  Debit the entire cost of ₹5,00,000 to "Office Stationery &amp; Printing Expense" in the P&L statement in the year of purchase. No policy note or asset disclosure is necessary, as the value falls below the disclosure threshold.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: PRACTICAL BUSINESS EXAMPLES ────────────────────────────── */}
      <section id="sec-business-examples" className="space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
        <div className="border-l-4 border-indigo-600 pl-4 space-y-2">
          <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
            2. Practical Business Examples
          </h2>
          <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">
            Realistic corporate scenarios showing the calculations, accounting entries, and notes disclosures required for policy applications.
          </p>
        </div>

        {/* Business Example 2.1: Revenue Recognition */}
        <div className="bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/60 pb-4">
            <div className="space-y-1">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-gray-500 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded">Business Scenario 2.1</span>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white font-serif">Revenue Recognition: Uncertain Collection</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200/30">
              Revenue &amp; Accrual
            </span>
          </div>

          <div className="space-y-4">
            {/* Table of Alternatives */}
            <div className="overflow-x-auto border border-slate-250 dark:border-slate-800 rounded-xl">
              <table className="w-full text-left border-collapse text-xs font-serif">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-900 font-sans text-[10px] font-extrabold uppercase text-slate-500 dark:text-gray-400 tracking-wider">
                    <th className="p-3 border-b border-slate-250 dark:border-slate-800 w-1/4">Alternative Treatment</th>
                    <th className="p-3 border-b border-slate-250 dark:border-slate-800 w-1/2">Technical Analysis</th>
                    <th className="p-3 border-b border-slate-250 dark:border-slate-800 w-1/4">AS 1 Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 dark:divide-slate-800 text-slate-850 dark:text-slate-350">
                  <tr>
                    <td className="p-3 font-semibold font-sans text-xs">A. Recognize Revenue Immediately</td>
                    <td className="p-3">Recognize full revenue based on billing. Exposes the enterprise to bad debts and overstates net assets.</td>
                    <td className="p-3 font-semibold text-rose-650">REJECTED (Violates Prudence)</td>
                  </tr>
                  <tr className="bg-slate-50/40 dark:bg-slate-950/20">
                    <td className="p-3 font-semibold font-sans text-xs">B. Defer Recognition</td>
                    <td className="p-3">Defer revenue recognition until collection is reasonably certain. Aligns profit with realisable value.</td>
                    <td className="p-3 font-semibold text-emerald-650">APPROVED (Complies with AS 1 &amp; AS 9)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[14px] leading-relaxed">
              <div className="space-y-4 bg-slate-50/50 dark:bg-[#141A29] p-5 rounded-xl border border-slate-200 dark:border-slate-800/60">
                <h6 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Facts &amp; Issue</h6>
                <p className="font-serif">
                  <strong>Facts:</strong> Apex Buildcon Ltd sells residential properties. It registers a sale deed of ₹1.5 Crores with a buyer. However, the buyer is currently undergoing financial reorganization, and there is a major dispute regarding their capacity to clear the second installment of ₹60 Lakhs due in 3 months.
                </p>
                <p className="font-serif">
                  <strong>Issue:</strong> Should the entire transaction of ₹1.5 Crores be recognized as revenue in the current year, or should the disputed part be deferred under AS 1?
                </p>
              </div>
              <div className="space-y-4 bg-slate-50/50 dark:bg-[#141A29] p-5 rounded-xl border border-slate-200 dark:border-slate-800/60">
                <h6 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">AS 1 Reasoning &amp; Impact</h6>
                <p className="font-serif">
                  <strong>Reasoning:</strong> Under the <strong>Prudence</strong> consideration of AS 1, revenue should only be recognized when there is no significant uncertainty regarding its collection <PdfRef page={6} />. Recognizing income without collection certainty risks capital erosion and overstated profits.
                </p>
                <p className="font-serif font-semibold text-emerald-600 dark:text-emerald-450">
                  <strong>Correct Treatment:</strong> Recognize only the secure portion of ₹90 Lakhs as revenue. Defer the ₹60 Lakhs until collection becomes certain.
                </p>
              </div>
            </div>

            {/* Audit & Financial Impact callout */}
            <div className="bg-[#FCF5FF] dark:bg-[#251A35] p-5 rounded-xl border border-[#F2DCFF] dark:border-purple-900/30 text-[14px]">
              <h6 className="font-sans font-bold text-xs uppercase tracking-wider text-purple-700 dark:text-purple-400 mb-2">Audit Considerations &amp; Financial Impact</h6>
              <ul className="list-disc pl-5 font-serif space-y-1 text-slate-700 dark:text-slate-350">
                <li>Verify correspondence with the buyer to evaluate collection probability.</li>
                <li>Ensure the P&L does not capitalize the disputed ₹60 Lakhs. The balance sheet should carry a deferred revenue liability.</li>
                <li><strong>Red Flag:</strong> Recognizing sales at year-end to show growth, then reversing them as bad debts in the next quarter.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: AUDIT CASE STUDIES ────────────────────────────────────── */}
      <section id="sec-audit-cases" className="space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
        <div className="border-l-4 border-indigo-600 pl-4 space-y-2">
          <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
            3. Audit Case Studies
          </h2>
          <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">
            Detailed auditor-oriented case studies highlighting problems, management treatments, standard violations, risks, procedures, and conclusions.
          </p>
        </div>

        {/* Case Study 3.1 */}
        <div className="bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/60 pb-4">
            <div className="space-y-1">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-gray-500 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded">Case Study 3.1</span>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white font-serif">Useful Life Extension to Manipulate Earnings</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 border border-red-200/30">
              Audit Risk: High
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-[14px] leading-relaxed font-serif font-serif">
            <div className="space-y-4 bg-slate-50 dark:bg-[#151C2C] p-5 rounded-xl border border-slate-200 dark:border-slate-800/60 lg:col-span-1">
              <h6 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Background &amp; Issue</h6>
              <p>
                <strong>Background:</strong> Zenith Airways Ltd revised the estimated useful lives of its Boeing passenger fleet from 15 years to 22 years. This change reduced the annual depreciation charge by ₹18 Crores, turning a projected loss of ₹10 Crores into a net profit of ₹8 Crores.
              </p>
              <p className="mt-2">
                <strong>Management Treatment:</strong> Classified this change as a routine "revision in accounting estimate" under AS 5. The board minutes did not document any physical improvements or technical rationale for the change.
              </p>
            </div>

            <div className="space-y-4 bg-slate-50 dark:bg-[#151C2C] p-5 rounded-xl border border-slate-200 dark:border-slate-800/60 lg:col-span-1">
              <h6 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Auditor Evaluation</h6>
              <p className="text-rose-650 font-semibold">
                <strong>Problem Identified &amp; AS 1 Violation:</strong> Extending useful lives without technical backing violates the basic accounting principles of <strong>Prudence</strong> and <strong>True and Fair View</strong> <PdfRef page={6} />. The change lacks realistic substance and appears to be a deliberate earnings management tool.
              </p>
              <p className="mt-2">
                <strong>Audit Risk:</strong> High risk of asset overstatement and material misstatement of earnings. The audit report risks giving a clean opinion on manipulated statements.
              </p>
            </div>

            <div className="space-y-4 bg-slate-50 dark:bg-[#151C2C] p-5 rounded-xl border border-slate-200 dark:border-slate-800/60 lg:col-span-1">
              <h6 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Procedures &amp; Conclusion</h6>
              <p>
                <strong>Audit Procedure:</strong> Obtain the independent technical evaluation report. Compare the revised useful lives against industry standards and global airlines. Evaluate whether historical data supports the assumption that aircraft operate for 22 years under current maintenance budgets.
              </p>
              <p className="mt-2 font-semibold text-rose-650">
                <strong>Conclusion:</strong> In the absence of an independent technical certificate, reject the extension. Demand that depreciation be calculated on the original 15-year basis. If management refuses, qualify the audit report for deviation from AS 1 and AS 10.
              </p>
            </div>
          </div>
        </div>

        {/* Case Study 3.2 */}
        <div className="bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/60 pb-4">
            <div className="space-y-1">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-gray-500 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded">Case Study 3.2</span>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white font-serif">Capitalization of General Overheads to Fixed Assets</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 border border-red-200/30">
              Audit Risk: Medium
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-[14px] leading-relaxed font-serif">
            <div className="space-y-4 bg-slate-50 dark:bg-[#151C2C] p-5 rounded-xl border border-slate-200 dark:border-slate-800/60 lg:col-span-1">
              <h6 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Background &amp; Issue</h6>
              <p>
                <strong>Background:</strong> MegaChem India Ltd constructed a new warehousing facility. In the capitalizing cost schedule, management allocated ₹45 Lakhs of head office general administrative overheads, including the salaries of the HR director and the legal team, to the cost of the warehouse.
              </p>
              <p className="mt-2">
                <strong>Management Treatment:</strong> Argued that these costs were incurred during the construction timeframe and thus represented a valid capitalization item.
              </p>
            </div>

            <div className="space-y-4 bg-slate-50 dark:bg-[#151C2C] p-5 rounded-xl border border-slate-200 dark:border-slate-800/60 lg:col-span-1">
              <h6 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Auditor Evaluation</h6>
              <p className="text-rose-650 font-semibold">
                <strong>Problem Identified &amp; AS 1 Violation:</strong> General administrative overheads that cannot be directly attributed to the construction of a specific asset must be expensed in the year they are incurred. This violates the <strong>True and Fair View</strong> and <strong>Substance over Form</strong> considerations <PdfRef page={6} />.
              </p>
              <p className="mt-2">
                <strong>Audit Risk:</strong> Overstatement of fixed assets (Property, Plant, and Equipment) and understatement of operating expenses.
              </p>
            </div>

            <div className="space-y-4 bg-slate-50 dark:bg-[#151C2C] p-5 rounded-xl border border-slate-200 dark:border-slate-800/60 lg:col-span-1">
              <h6 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Procedures &amp; Conclusion</h6>
              <p>
                <strong>Audit Procedure:</strong> Inspect cost allocation sheets. Check individual payroll allocations to ensure they represent staff dedicated exclusively to site construction. Ensure compliance with AS 10 (Property, Plant, and Equipment) regarding capitalization boundaries.
              </p>
              <p className="mt-2 font-semibold text-rose-650">
                <strong>Conclusion:</strong> Require the company to reverse the ₹45 Lakhs from fixed assets and charge it directly to the current-year P&L. If the adjustment is not made, qualify the audit report.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: REGULATORY OBSERVATIONS ────────────────────────────────── */}
      <section id="sec-regulatory-obs" className="space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
        <div className="border-l-4 border-indigo-600 pl-4 space-y-2">
          <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
            4. Regulatory Observations (NFRA / SEBI / MCA)
          </h2>
          <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">
            Essential directives and warnings from the National Financial Reporting Authority (NFRA), MCA, and SEBI on accounting policies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[14.5px] leading-[1.7] font-serif">
          {/* NFRA Box */}
          <div className="bg-[#FFF5F5] dark:bg-[#2A1E1E] p-6 rounded-xl border border-[#FFE1E1] dark:border-red-950/60 space-y-4">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-red-650 dark:text-red-400 flex items-center gap-2">
              <ShieldAlert size={14} />
              <span>NFRA Audit Findings</span>
            </h4>
            <div className="space-y-3">
              <p>
                <strong>Estimate vs. Policy:</strong> NFRA has issued warnings to audit firms for failing to challenge management when they classify estimate changes (such as useful life revisions) as changes in accounting policies.
              </p>
              <p>
                <strong>Disclosure Compliance:</strong> General statements like "Policies comply with all applicable standards" are insufficient. Audit firms must check that specific methods actually adopted are clearly disclosed.
              </p>
            </div>
          </div>

          {/* SEBI Box */}
          <div className="bg-[#FFFDF5] dark:bg-[#25201A] p-6 rounded-xl border border-[#F6EED5] dark:border-amber-900/30 space-y-4">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <AlertTriangle size={14} />
              <span>SEBI Enforcement Actions</span>
            </h4>
            <div className="space-y-3">
              <p>
                <strong>Bundled Revenue:</strong> SEBI has taken action against tech companies for immediately capitalizing multi-year bundled service contracts instead of deferring revenue over time.
              </p>
              <p>
                <strong>Material Disclosures:</strong> Failure to disclose changes in significant accounting policies in quarterly results can lead to insider trading and disclosure investigations.
              </p>
            </div>
          </div>

          {/* MCA Box */}
          <div className="bg-slate-50 dark:bg-[#1E2640]/40 p-6 rounded-xl border border-slate-200 dark:border-gray-800 space-y-4">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-gray-350 flex items-center gap-2">
              <Info size={14} />
              <span>MCA Reporting Demands</span>
            </h4>
            <div className="space-y-3">
              <p>
                <strong>Section 129(1):</strong> Companies Act mandate ensures financial statements reflect a True and Fair View. Deviations lead to fines for directors.
              </p>
              <p>
                <strong>Schedule III:</strong> Compliance demands that accounting policies (e.g. depreciation, inventory) follow standard classification guidelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: LANDMARK JUDICIAL CASES ────────────────────────────────── */}
      <section id="sec-legal-cases" className="space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
        <div className="border-l-4 border-indigo-600 pl-4 space-y-2">
          <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
            5. Landmark Judicial Cases
          </h2>
          <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">
            Landmark rulings from the Supreme Court and High Courts governing accounting policy selection, consistency, and tax implications.
          </p>
        </div>

        {/* Case 5.1 */}
        <div className="bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/60 pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D5BE3] dark:text-blue-400">Supreme Court Precedent</span>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white font-serif">CIT vs. Woodward Governor India Pvt. Ltd.</h3>
            </div>
            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-bold text-slate-600 dark:text-gray-300">
              [2009] 312 ITR 254 (SC)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-[14.5px] leading-[1.7] text-slate-800 dark:text-slate-300 font-serif">
            <div className="space-y-3">
              <p>
                <strong>Facts:</strong> The assessee faced additional liabilities due to exchange rate changes on long-term loans. They wanted to charge these losses to the P&L immediately, claiming it was consistent with accrual accounting and AS 11.
              </p>
              <p>
                <strong>Issue:</strong> Does accrual accounting require recognizing exchange losses immediately, even if they are unrealized?
              </p>
            </div>
            <div className="space-y-3">
              <p>
                <strong>Decision:</strong> The Supreme Court held that profits should represent a <strong>True and Fair View</strong>. In line with the accrual concept and AS 11, exchange differences on the balance sheet date must be recognized immediately.
              </p>
              <p className="text-indigo-650 dark:text-indigo-400 font-semibold">
                <strong>AS 1 Relevance:</strong> The court confirmed that accounting standards (under Section 211(3C) of the older Act) are mandatory, and consistency in accounting policies is necessary for tax computations.
              </p>
            </div>
          </div>
        </div>

        {/* Case 5.2 */}
        <div className="bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/60 pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D5BE3] dark:text-blue-400">Supreme Court Precedent</span>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white font-serif">Challapalli Sugars Ltd. vs. CIT</h3>
            </div>
            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-bold text-slate-600 dark:text-gray-300">
              [1975] 98 ITR 167 (SC)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-[14.5px] leading-[1.7] text-slate-800 dark:text-slate-300 font-serif">
            <div className="space-y-3">
              <p>
                <strong>Facts:</strong> The company capitalized interest on loans taken to purchase machinery prior to the start of commercial production.
              </p>
              <p>
                <strong>Issue:</strong> Should pre-production interest be capitalized as part of the asset cost or expensed immediately?
              </p>
            </div>
            <div className="space-y-3">
              <p>
                <strong>Decision:</strong> The Supreme Court ruled that interest paid before production begins should be capitalized as part of the asset's cost, as it is necessary to bring the asset to its working condition.
              </p>
              <p className="text-indigo-650 dark:text-indigo-400 font-semibold">
                <strong>AS 1 Relevance:</strong> Confirmed that "cost" represents expenditures necessary to bring an asset to its location and condition, validating AS 10 cost capitalization rules.
              </p>
            </div>
          </div>
        </div>

        {/* Case 5.3 */}
        <div className="bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/60 pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D5BE3] dark:text-blue-400">Supreme Court Precedent</span>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white font-serif">CIT vs. British Paints India Ltd.</h3>
            </div>
            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-bold text-slate-600 dark:text-gray-300">
              [1991] 188 ITR 44 (SC)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-[14.5px] leading-[1.7] text-slate-800 dark:text-slate-300 font-serif">
            <div className="space-y-3">
              <p>
                <strong>Facts:</strong> The company valued its work-in-progress (WIP) inventories by excluding overheads, arguing it was a consistent practice.
              </p>
              <p>
                <strong>Issue:</strong> Can consistency justify an incorrect valuation policy that understates asset values?
              </p>
            </div>
            <div className="space-y-3">
              <p>
                <strong>Decision:</strong> The Supreme Court held that consistency cannot justify an incorrect valuation policy. Inventory must be valued at cost, including overheads, to present a true and fair view.
              </p>
              <p className="text-indigo-650 dark:text-indigo-400 font-semibold">
                <strong>AS 1 Relevance:</strong> Established that the portrayal of a **True and Fair View** is the primary consideration, and overrides consistency if the existing policy is incorrect <PdfRef page={6} />.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: EXAM-ORIENTED CORNER ───────────────────────────────────── */}
      <section id="sec-exam-oriented" className="space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
        <div className="border-l-4 border-indigo-600 pl-4 space-y-2">
          <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
            6. Exam-Oriented Corner
          </h2>
          <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">
            Revision sheets, exam traps, and essential concept summaries for CA students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[14px] leading-relaxed font-serif">
          {/* Card 1: Revision Notes */}
          <div className="bg-[#FAFAF8] dark:bg-[#151C2C] p-6 rounded-xl border border-slate-250 dark:border-slate-800/65 space-y-3 font-serif">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Award size={14} className="text-indigo-600" />
              <span>Revision Notes</span>
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-350">
              <li><strong>Three Fundamental Assumptions:</strong> Going Concern, Consistency, Accrual. No disclosure is needed if followed; disclosure is mandatory if not followed <PdfRef page={5} />.</li>
              <li><strong>Three Selection Considerations:</strong> Prudence, Substance over Form, Materiality. The primary objective is a **True and Fair View** <PdfRef page={6} />.</li>
              <li><strong>Disclosure Location:</strong> All significant policies must form part of the accounts and be disclosed in one place (normally as Note 1).</li>
            </ul>
          </div>

          {/* Card 2: Common Mistakes */}
          <div className="bg-[#FFF5F5] dark:bg-[#2A1E1E] p-6 rounded-xl border border-[#FFE1E1] dark:border-red-950/60 space-y-3 font-serif">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-red-650 dark:text-red-400 flex items-center gap-2">
              <AlertTriangle size={14} />
              <span>Common Exam Mistakes</span>
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-350">
              <li><strong className="text-red-650">Mistake:</strong> Stating that Going Concern must always be followed. <em>Fact:</em> If liquidation is imminent, Going Concern must be rejected, and accounts must be prepared on an NRV basis.</li>
              <li><strong className="text-red-650">Mistake:</strong> Mislabeled estimate changes as policy changes. <em>Fact:</em> Revision of useful lives or provisions are estimate changes (AS 5), not policy changes (AS 1).</li>
              <li><strong className="text-red-650">Mistake:</strong> Claiming that disclosure justifies incorrect accounting. <em>Fact:</em> Under the Para 23 rule, disclosure cannot remedy wrong treatments <PdfRef page={7} />.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: AUDIT NOTES & REPORTING ────────────────────────────────── */}
      <section id="sec-audit-notes" className="space-y-8 w-full border-t border-slate-200 dark:border-slate-800 pt-8">
        <div className="border-l-4 border-indigo-600 pl-4 space-y-2">
          <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
            7. Audit Notes &amp; Audit Report Drafting
          </h2>
          <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">
            Drafting templates for audit reports under Section 143(3) and reporting guidelines for practitioners.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-[#181E30] border border-slate-200 dark:border-slate-850 rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-bold text-slate-950 dark:text-white font-serif flex items-center gap-2">
            <HelpCircle className="text-indigo-600" size={18} />
            <span>Audit Report Drafting: Deviation from AS 1 (Section 143(3))</span>
          </h3>

          <div className="space-y-4 text-[14.5px] leading-[1.7] text-slate-850 dark:text-slate-350 font-serif">
            <p>
              When an enterprise fails to disclose significant accounting policies, or changes them without valid justification, the auditor must issue a qualified or adverse opinion. Below is a standard template for an audit qualification:
            </p>

            <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-250 dark:border-slate-800 font-mono text-xs text-slate-850 dark:text-slate-300 leading-relaxed space-y-3">
              <p className="font-extrabold text-slate-900 dark:text-white">BASIS FOR QUALIFIED OPINION</p>
              <p className="italic">
                "Note [X] to the financial statements describes a change in the Company's accounting policy for inventory valuation from FIFO to Weighted Average. However, the Company has failed to disclose the quantified impact of this change on the current year's financial performance. Based on our audit procedures, had the Company valued its inventory on WAC, the closing inventory would have been lower by ₹70 Lakhs, and the profit before tax would have been lower by ₹70 Lakhs.
              </p>
              <p className="italic">
                Consequently, the profit before tax and current assets are overstated by ₹70 Lakhs. The Company has also failed to comply with the disclosure requirements of Accounting Standard 1 (AS 1), 'Disclosure of Accounting Policies'."
              </p>
              <p className="font-extrabold text-slate-900 dark:text-white mt-4">QUALIFIED OPINION</p>
              <p className="italic">
                "In our opinion and to the best of our information and according to the explanations given to us, except for the effects of the matter described in the Basis for Qualified Opinion paragraph, the aforesaid financial statements give a true and fair view in conformity with the accounting principles generally accepted in India..."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-xs font-sans">
              <div className="p-4 bg-[#FAFAF8] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                <span className="font-extrabold text-indigo-650 dark:text-indigo-400 block mb-1">AUDIT RED FLAGS</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-650 dark:text-slate-400">
                  <li>Inconsistencies between Note 1 disclosures and actual balances.</li>
                  <li>Failure to quantify the impact of accounting policy changes.</li>
                  <li>Mislabeled write-downs as estimate revisions.</li>
                </ul>
              </div>
              <div className="p-4 bg-[#FAFAF8] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                <span className="font-extrabold text-indigo-650 dark:text-indigo-400 block mb-1">REPRESENTATION POINTS</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-650 dark:text-slate-400">
                  <li>Obtain management representation letters confirming policy selection.</li>
                  <li>Confirm that all significant policies have been disclosed.</li>
                  <li>Document board approvals for any policy changes.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
