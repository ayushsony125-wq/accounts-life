'use client'

import React, { useState, useEffect, useRef } from 'react'
import { BookOpen, FileText, ChevronDown, ChevronRight, Info, AlertTriangle, Check } from 'lucide-react'

interface AS25StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => React.ReactNode;
}

const as25Sections = [
  { id: 'as25-overview',          title: '1. Overview & Purpose' },
  { id: 'as25-scope',             title: '2. Scope & Applicability' },
  { id: 'as25-definitions',       title: '3. Definitions (Para 3)' },
  { id: 'as25-form-content',      title: '4. Form & Content of Statements (Para 7-15)' },
  { id: 'as25-explanatory-notes', title: '5. Selected Explanatory Notes (Para 16)' },
  { id: 'as25-periods',           title: '6. Required Comparative Periods' },
  { id: 'as25-measurement',       title: '7. Recognition & Measurement (Para 27-28)' },
  { id: 'as25-special-rules',     title: '8. Special Measurement Rules' },
]

export function AS25StandardTabContent({ navigateToPdfPage, renderTextWithReferences }: AS25StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as25-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    explanatoryNotesList: true,
    measurementPrinciples: true,
    specialMeasurementsList: true,
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as25-standard-sticky-toc')
    if (container && target) {
      const containerRect = container.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      let offset = 58
      if (stickyToc) {
        const tocRect = stickyToc.getBoundingClientRect()
        offset = tocRect.bottom - containerRect.top
      }
      container.scrollTo({
        top: targetRect.top - containerRect.top + container.scrollTop - offset - 12,
        behavior: 'auto'
      })
    }
  }

  useEffect(() => {
    if (!activeSection || !tocScrollRef.current) return
    const el = tocScrollRef.current
    const btn = el.querySelector(`[data-sec-id="${activeSection}"]`) as HTMLElement | null
    if (!btn) return
    if (as25Sections[0]?.id === activeSection) {
      el.scrollTo({ left: 0, behavior: 'smooth' })
      return
    }
    const elRect = el.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()
    el.scrollTo({
      left: btnRect.left - elRect.left + el.scrollLeft - elRect.width / 2 + btnRect.width / 2,
      behavior: 'smooth'
    })
  }, [activeSection])

  useEffect(() => {
    let obs: IntersectionObserver | undefined
    const init = () => {
      const sc = document.getElementById('as1-scroll-container')
      if (!sc) {
        setTimeout(init, 50)
        return
      }
      obs = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        }),
        { root: sc, rootMargin: '-90px 0px -65% 0px', threshold: 0 }
      )
      as25Sections.forEach(s => {
        const el = document.getElementById(s.id)
        if (el) obs?.observe(el)
      })
    }
    init()
    return () => obs?.disconnect()
  }, [])

  useEffect(() => {
    const el = tocScrollRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const secColors: Record<string, { num: string; border: string; badge: string }> = {
    '1':  { num: 'text-blue-600 dark:text-blue-400',    border: 'border-blue-400',    badge: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-800' },
    '2':  { num: 'text-teal-600 dark:text-teal-400',    border: 'border-teal-400',    badge: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/40 dark:text-teal-400 dark:border-teal-800' },
    '3':  { num: 'text-indigo-600 dark:text-indigo-400',border: 'border-indigo-400',  badge: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-400 dark:border-indigo-800' },
    '4':  { num: 'text-emerald-600 dark:text-emerald-400',border:'border-emerald-400',badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-800' },
    '5':  { num: 'text-cyan-600 dark:text-cyan-400',    border: 'border-cyan-400',    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/40 dark:text-cyan-400 dark:border-cyan-800' },
    '6':  { num: 'text-violet-600 dark:text-violet-400',border: 'border-violet-400',  badge: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/40 dark:text-violet-400 dark:border-violet-800' },
    '7':  { num: 'text-amber-600 dark:text-amber-400',  border: 'border-amber-400',   badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-800' },
    '8':  { num: 'text-rose-600 dark:text-rose-400',    border: 'border-rose-400',    badge: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/40 dark:text-rose-400 dark:border-rose-800' },
  }

  const SecHeader = ({ id, num, title }: { id: string; num: string; title: string }) => {
    const c = secColors[num] || secColors['1']
    return (
      <div id={id} className="scroll-mt-36 mb-6 mt-14 first:mt-0 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <span className={`font-mono font-extrabold text-[13px] ${c.num} select-none`}>{num}.</span>
          <h2 className="text-[20px] sm:text-[22px] font-bold text-slate-900 dark:text-white tracking-tight">{title}</h2>
        </div>
        <div className={`h-[2px] w-16 rounded-full border-b-2 ${c.border} mt-2`} />
      </div>
    )
  }

  const NoteBox = ({ type, title, children }: { type: 'info' | 'warning' | 'success' | 'exam'; title?: string; children: React.ReactNode }) => {
    const styles = {
      info:    'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50 text-blue-900 dark:text-blue-200 border-l-blue-500',
      warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 border-l-amber-500',
      success: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200 border-l-emerald-500',
      exam:    'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800/50 text-rose-900 dark:text-rose-200 border-l-rose-500',
    }
    return (
      <div className={`rounded-xl border border-l-4 p-5 mb-6 ${styles[type]}`}>
        {title && <p className="font-extrabold uppercase tracking-wider text-[10.5px] mb-2 opacity-75">{title}</p>}
        <div className="text-[14.5px] sm:text-[15px] leading-relaxed">{children}</div>
      </div>
    )
  }

  const ParaRef = ({ page, para }: { page: number; para: string }) => (
    <button
      onClick={() => navigateToPdfPage(page)}
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={`Open ICAI AS 25 PDF — ${para}`}
    >
      <FileText size={9} className="shrink-0" />
      {para} (p. {page})
    </button>
  )

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      {/* Sticky Section Sub-Navbar */}
      <div id="as25-standard-sticky-toc" className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <BookOpen size={9.5} />
          AS 25 Sections:
        </span>
        {as25Sections.map((sec) => (
          <button
            key={sec.id}
            data-sec-id={sec.id}
            onClick={() => handleSectionClick(sec.id)}
            className={`text-[9.5px] font-bold px-2 py-0.5 rounded border transition-all whitespace-nowrap cursor-pointer ${
              activeSection === sec.id
                ? 'bg-blue-600 border-blue-600 text-white dark:bg-blue-500 dark:border-blue-500'
                : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#1E2640] dark:hover:bg-slate-800 border-slate-200 dark:border-gray-700 text-slate-600 dark:text-gray-300'
            }`}
          >
            {sec.title.split('. ')[1] || sec.title}
          </button>
        ))}
      </div>

      {/* Main Content Card */}
      <div className="w-full space-y-7 bg-white dark:bg-[#111726] border border-slate-200 dark:border-gray-800 rounded-xl p-6 sm:p-8 shadow-xs text-[14px] sm:text-[14.5px] text-slate-700 dark:text-gray-300 leading-relaxed">
        
        {/* 1. Overview & Purpose */}
        <SecHeader id="as25-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Introduction" /> Accounting Standard 25 establishes minimum guidelines for the **content and presentation of an interim financial report**.
        </p>
        <p className="leading-relaxed">
          Timely interim financial reporting improves the ability of investors, lenders, and regulators to understand an enterprise\'s capacity to generate earnings and cash flows, its liquidity, and its financial position. AS 25 does not mandate which entities should publish interim reports, but states that if an entity elects or is required by law to publish an interim report, it must comply with this standard.
        </p>

        {/* 2. Scope & Applicability */}
        <SecHeader id="as25-scope" num="2" title="Scope &amp; Applicability" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          This standard applies if an enterprise is required or elects to prepare and present an interim financial report. <ParaRef page={1} para="Para 1" />
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Statutes and Regulators:</strong> Regulators (like SEBI or MCA) may require companies to publish interim reports. While the formats might differ, the recognition and measurement principles of AS 25 must still be followed.</li>
          <li><strong>SMC Exemption:</strong> Small and Medium-sized Companies (SMCs) preparing interim financial reports do not have exemptions from AS 25, but they are exempt from certain complex disclosures of other standards that overlap.</li>
        </ul>

        {/* 3. Definitions */}
        <SecHeader id="as25-definitions" num="3" title="Definitions (Para 3)" />
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13.5px] border-collapse rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Term</th>
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">AS 25 definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Interim Period</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">A financial reporting period shorter than a full financial year (e.g. a quarter or half-year). <ParaRef page={2} para="Para 3" /></td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-900/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Interim Financial Report</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">A financial report containing either a complete set of financial statements or a set of condensed financial statements for an interim period.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. Form & Content of Interim Financial Statements */}
        <SecHeader id="as25-form-content" num="4" title="Form &amp; Content of Statements (Para 7–15)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={2} para="Para 7" /> An interim financial report can contain either **complete financial statements** (identical to annual statements) or **condensed financial statements**.
        </p>

        <p className="mb-4"><strong>Minimum Headings in Condensed Statements (Para 8):</strong></p>
        <p className="mb-4">
          If condensed statements are presented, they should include, at a minimum, each of the headings and sub-headings that were included in its most recent annual financial statements, along with selected explanatory notes.
        </p>

        <NoteBox type="info" title="EPS Presentation (Para 11)">
          If the enterprise presents Basic and Diluted EPS in its annual reports as per AS 20, it must present both Basic and Diluted EPS on the face of the Profit and Loss statement (complete or condensed) for the interim period also. <ParaRef page={3} para="Para 11" />
        </NoteBox>

        {/* 5. Selected Explanatory Notes */}
        <SecHeader id="as25-explanatory-notes" num="5" title="Selected Explanatory Notes (Para 16)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          Interim notes focus on explaining significant changes in financial position and performance since the last annual report, rather than repeating previous information.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('explanatoryNotesList')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Minimum Required Disclosures (Para 16)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.explanatoryNotesList ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.explanatoryNotesList && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2.5 leading-relaxed">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Statement that the same accounting policies are followed in the interim statements as in the most recent annual statements (or details of any policy change).</li>
                <li>Explanatory comments about the seasonality or cyclicality of interim operations.</li>
                <li>The nature and amount of items affecting assets, liabilities, equity, net income, or cash flows that are unusual because of their size, nature, or incidence.</li>
                <li>Write-down of inventories and reversals of such write-downs.</li>
                <li>Any material changes in contingent liabilities or commitments.</li>
                <li>Dividends paid (aggregate or per share) during the period. <ParaRef page={4} para="Para 16" /></li>
              </ul>
            </div>
          )}
        </div>

        {/* 6. Required Comparative Periods */}
        <SecHeader id="as25-periods" num="6" title="Required Comparative Periods" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          AS 25 mandates specific comparative periods to ensure consistency:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Balance Sheet:</strong> Balance sheet as of the end of the current interim period and a comparative balance sheet as of the end of the **immediately preceding financial year**. <ParaRef page={5} para="Para 20" /></li>
          <li><strong>Profit &amp; Loss:</strong> Statement of P&amp;L for the current interim period and cumulatively for the current year-to-date, with comparative statements for the comparable periods of the immediately preceding financial year.</li>
          <li><strong>Cash Flow Statement:</strong> Cumulative year-to-date cash flow statement, with a comparative statement for the comparable year-to-date period of the preceding financial year.</li>
        </ul>

        {/* 7. Recognition & Measurement */}
        <SecHeader id="as25-measurement" num="7" title="Recognition &amp; Measurement Principles (Para 27–28)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={10} para="Para 27" /> An enterprise should apply the **same accounting policies** in its interim financial statements as are applied in its annual financial statements.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('measurementPrinciples')}>
            <span className="font-bold text-[#1C1C1E] dark:text-white text-sm">Discrete vs Integral View</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.measurementPrinciples ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.measurementPrinciples && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2.5 leading-relaxed">
              <p>Under AS 25, an interim period is treated as a **discrete period** for recognition and measurement purposes (subject to exceptions):</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Assets, liabilities, income, and expenses are recognized when they meet the criteria under normal standards.</li>
                <li><strong>Matching concept:</strong> Expenses that do not meet the definition of an asset at the year-end cannot be deferred in an interim period just to "smooth" quarterly earnings.</li>
              </ul>
            </div>
          )}
        </div>

        {/* 8. Special Measurement Rules */}
        <SecHeader id="as25-special-rules" num="8" title="Special Measurement Rules" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          The standard provides specific rules for items that occur unevenly or seasonally:
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('specialMeasurementsList')}>
            <span className="font-bold text-[#1C1C1E] dark:text-white text-sm">Seasonal and Uneven Items</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.specialMeasurementsList ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.specialMeasurementsList && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2.5 leading-relaxed">
              <p><strong>Seasonal Revenues (Para 29):</strong> Revenues received seasonally, cyclically, or occasionally must not be anticipated or deferred at an interim date if anticipation/deferral would be inappropriate at the end of the year. <ParaRef page={14} para="Para 29" /></p>
              <p><strong>Uneven Costs (Para 30):</strong> Costs that are incurred unevenly during an enterprise\'s financial year (e.g. annual advertising costs) should be recognized in the quarter they are incurred, unless they would be deferred at the year-end.</p>
              <p><strong>Income Tax Expense:</strong> Calculated by applying the estimated weighted average annual tax rate to the interim pre-tax accounting profit. <ParaRef page={12} para="Tax Estimation" /></p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
