'use client'

import React, { useState, useEffect, useRef } from 'react'
import { BookOpen, FileText, ChevronDown, ChevronRight, Info, AlertTriangle, Check } from 'lucide-react'

interface AS21StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => React.ReactNode;
}

const as21Sections = [
  { id: 'as21-overview',          title: '1. Overview & Purpose' },
  { id: 'as21-scope',             title: '2. Scope & Exclusions (Para 1-4)' },
  { id: 'as21-definitions',       title: '3. Definitions (Para 5-6)' },
  { id: 'as21-procedures',        title: '4. Consolidation Procedures (Para 13)' },
  { id: 'as21-goodwill',          title: '5. Goodwill vs Capital Reserve' },
  { id: 'as21-minority',          title: '6. Minority Interest' },
  { id: 'as21-eliminations',      title: '7. Elimination of Intra-Group Balances' },
  { id: 'as21-policies-disclosures',title: '8. Uniform Policies & Disclosures' },
]

export function AS21StandardTabContent({ navigateToPdfPage, renderTextWithReferences }: AS21StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as21-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    proceduresList: true,
    minorityLosses: true,
    policyAdjustments: true,
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as21-standard-sticky-toc')
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
    if (as21Sections[0]?.id === activeSection) {
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
      as21Sections.forEach(s => {
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
    '1':  { num: 'text-blue-600 dark:text-blue-400',    border: 'border-blue-400',    badge: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800' },
    '2':  { num: 'text-teal-600 dark:text-teal-400',    border: 'border-teal-400',    badge: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-800' },
    '3':  { num: 'text-indigo-600 dark:text-indigo-400',border: 'border-indigo-400',  badge: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800' },
    '4':  { num: 'text-emerald-600 dark:text-emerald-400',border:'border-emerald-400',badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800' },
    '5':  { num: 'text-cyan-600 dark:text-cyan-400',    border: 'border-cyan-400',    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-455 dark:border-cyan-800' },
    '6':  { num: 'text-violet-600 dark:text-violet-400',border: 'border-violet-400',  badge: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800' },
    '7':  { num: 'text-amber-600 dark:text-amber-400',  border: 'border-amber-400',   badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800' },
    '8':  { num: 'text-rose-600 dark:text-rose-400',    border: 'border-rose-400',    badge: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800' },
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
      info:    'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/50 text-blue-900 dark:text-blue-200 border-l-blue-500',
      warning: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 border-l-amber-500',
      success: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-850/50 text-emerald-900 dark:text-emerald-200 border-l-emerald-500',
      exam:    'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/50 text-rose-900 dark:text-rose-200 border-l-rose-500',
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
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-650 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={`Open ICAI AS 21 PDF — ${para}`}
    >
      <FileText size={9} className="shrink-0" />
      {para} (p. {page})
    </button>
  )

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      {/* Sticky Section Sub-Navbar */}
      <div id="as21-standard-sticky-toc" className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <BookOpen size={9.5} />
          AS 21 Sections:
        </span>
        {as21Sections.map((sec) => (
          <button
            key={sec.id}
            data-sec-id={sec.id}
            onClick={() => handleSectionClick(sec.id)}
            className={`text-[9.5px] font-bold px-2 py-0.5 rounded border transition-all whitespace-nowrap cursor-pointer ${
              activeSection === sec.id
                ? 'bg-blue-600 border-blue-600 text-white dark:bg-blue-500 dark:border-blue-500'
                : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#1E2640] dark:hover:bg-slate-800 border-slate-200 dark:border-gray-700 text-slate-650 dark:text-gray-300'
            }`}
          >
            {sec.title.split('. ')[1] || sec.title}
          </button>
        ))}
      </div>

      {/* Main Content Card */}
      <div className="w-full space-y-7 bg-white dark:bg-[#111726] border border-slate-200 dark:border-gray-800 rounded-xl p-6 sm:p-8 shadow-xs text-[14px] sm:text-[14.5px] text-slate-700 dark:text-gray-300 leading-relaxed">
        
        {/* 1. Overview & Purpose */}
        <SecHeader id="as21-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={3} para="Introduction" /> Accounting Standard 21 prescribes the guidelines for the preparation and presentation of **Consolidated Financial Statements (CFS)** for a group of enterprises under the control of a parent.
        </p>
        <p className="leading-relaxed">
          Consolidation is the process of combining the financial statements of a parent (holding) company and its subsidiaries line-by-line, to present financial information of the group as a single economic entity. This provides users of financial statements with a comprehensive view of the group\'s financial position and performance.
        </p>

        {/* 2. Scope & Exclusions */}
        <SecHeader id="as21-scope" num="2" title="Scope &amp; Exclusions (Para 1–4)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={10} para="Para 1" /> This standard should be applied in the preparation and presentation of consolidated financial statements for a group of enterprises under the control of a parent.
        </p>
        <p className="mb-4"><strong>Key Exclusions from Consolidation (Para 11):</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Temporary Control:</strong> A subsidiary is excluded from consolidation when control is intended to be temporary because the subsidiary is acquired and held exclusively with a view to its subsequent disposal in the near future. <ParaRef page={10} para="Para 11" /></li>
          <li><strong>Long-term Restrictions:</strong> A subsidiary is excluded when it operates under severe long-term restrictions which significantly impair its ability to transfer funds to the parent.</li>
        </ul>

        {/* 3. Definitions */}
        <SecHeader id="as21-definitions" num="3" title="Definitions (Para 5–6)" />
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13.5px] border-collapse rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Term</th>
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">AS 21 Definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Control</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">The ownership, directly or indirectly through subsidiary(ies), of more than one-half of the voting power of an enterprise; OR control of the composition of the board of directors. <ParaRef page={3} para="Para 5" /></td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-950/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Minority Interest</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">That part of the net results of operations and of net assets of a subsidiary attributable to interests which are not owned, directly or indirectly through subsidiary(ies), by the parent.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Group</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">A parent and all its subsidiaries.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. Consolidation Procedures */}
        <SecHeader id="as21-procedures" num="4" title="Consolidation Procedures (Para 13)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          In preparing consolidated financial statements, the parent combines the financial statements of the parent and its subsidiaries **line-by-line** by adding together like items of assets, liabilities, income, and expenses. <ParaRef page={13} para="Para 13" />
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('proceduresList')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Key Consolidation Steps</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.proceduresList ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.proceduresList && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed">
              <p>To present financial information of the group as a single economic entity, the following steps are performed:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Eliminate Investment vs Net Worth:</strong> The cost to the parent of its investment in each subsidiary and the parent’s portion of equity of each subsidiary are eliminated (leading to Goodwill or Capital Reserve).</li>
                <li><strong>Determine Minority Interest:</strong> Minority interests in the net income of consolidated subsidiaries for the reporting period are identified and adjusted against the income of the group.</li>
                <li><strong>Present Minority Interest in Balance Sheet:</strong> Minority interests in the net assets of consolidated subsidiaries are presented in the consolidated balance sheet separately from liabilities and the parent\'s equity.</li>
              </ol>
            </div>
          )}
        </div>

        {/* 5. Goodwill vs Capital Reserve */}
        <SecHeader id="as21-goodwill" num="5" title="Goodwill vs Capital Reserve (Cost of Control)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          The difference between the cost of investment and the parent\'s share of net worth of the subsidiary on the acquisition date is defined as:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Goodwill:</strong> If the cost of investment is **greater** than the parent\'s portion of equity in the subsidiary. This represents an asset that is amortized over its useful life or tested for impairment.</li>
          <li><strong>Capital Reserve:</strong> If the cost of investment is **less** than the parent\'s portion of equity in the subsidiary. This is credited directly to reserves as capital profit on consolidation.</li>
        </ul>

        {/* 6. Minority Interest */}
        <SecHeader id="as21-minority" num="6" title="Minority Interest Calculation" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          Minority Interest represents the share of outside shareholders in the net assets of the subsidiary.
        </p>
        <p className="mb-4">It consists of:</p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>The share of net assets at the date on which investment is made (pre-acquisition net assets).</li>
          <li>The minority\'s share of movements in equity since the date the parent-subsidiary relationship came into existence (post-acquisition profits/reserves).</li>
        </ul>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('minorityLosses')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Treatment of Accumulated Losses in Minority Interest (Para 15)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.minorityLosses ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.minorityLosses && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2.5 leading-relaxed">
              <p>When the minority\'s share of losses in a consolidated subsidiary exceeds the minority interest in the equity of the subsidiary:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>The excess, and any further losses applicable to the minority, are **absorbed by the parent** (holding company) except to the extent that the minority has a binding obligation and is able to make good the losses.</li>
                <li>If the subsidiary subsequently reports profits, all such profits are allocated to the parent until the minority’s share of losses previously absorbed by the parent has been recovered. <ParaRef page={15} para="Para 15" /></li>
              </ul>
            </div>
          )}
        </div>

        {/* 7. Elimination of Intra-Group Balances */}
        <SecHeader id="as21-eliminations" num="7" title="Elimination of Intra-Group Balances &amp; Transactions" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          To ensure the consolidated financial statements represent the group as a single entity, all intra-group balances and transactions must be eliminated.
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Debtors and Creditors:</strong> Intra-group debtors, creditors, loans, and advances must be eliminated in full.</li>
          <li><strong>Unrealized Profits:</strong> Unrealized profits resulting from intra-group transactions (e.g., goods sold by parent to subsidiary, or vice versa, which remain in closing inventory at the year-end) must be **eliminated in full**. <ParaRef page={16} para="Para 16" /></li>
        </ul>

        {/* 8. Uniform Policies & Disclosures */}
        <SecHeader id="as21-policies-disclosures" num="8" title="Uniform Policies &amp; Disclosures" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          Uniform accounting policies are essential for preparing meaningful consolidated financial statements.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('policyAdjustments')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">uniform policies and reporting dates (Para 20-22)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.policyAdjustments ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.policyAdjustments && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2.5 leading-relaxed">
              <p><strong>Accounting Policies (Para 20):</strong> CFS must be prepared using uniform accounting policies for like transactions in similar circumstances. If a subsidiary uses different policies, its accounts must be adjusted during consolidation. <ParaRef page={20} para="Para 20" /></p>
              <p><strong>Reporting Dates (Para 22):</strong> The financial statements of the parent and its subsidiaries used in consolidation should normally be prepared to the same reporting date. If different, the difference must not exceed **6 months**, and adjustments must be made for significant transactions in the intervening period.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
