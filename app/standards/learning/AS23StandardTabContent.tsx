'use client'

import React, { useState, useEffect, useRef } from 'react'
import { BookOpen, FileText, ChevronDown, ChevronRight, Info, AlertTriangle, Check } from 'lucide-react'

interface AS23StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => React.ReactNode;
}

const as23Sections = [
  { id: 'as23-overview',          title: '1. Overview & Purpose' },
  { id: 'as23-scope',             title: '2. Scope & Applicability (Para 1-4)' },
  { id: 'as23-definitions',       title: '3. Definitions (Para 5)' },
  { id: 'as23-influence',         title: '4. Significant Influence (Para 6-8)' },
  { id: 'as23-equity-method',     title: '5. The Equity Method (Para 9-12)' },
  { id: 'as23-carrying-adjust',   title: '6. Carrying Value Adjustments (Para 13-15)' },
  { id: 'as23-special-cases',     title: '7. Special Accounting Treatments' },
  { id: 'as23-exclusions-disc',   title: '8. Exclusions & Disclosures' },
]

export function AS23StandardTabContent({ navigateToPdfPage, renderTextWithReferences }: AS23StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as23-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    influenceIndicators: true,
    equityProcedures: true,
    disclosureItems: true,
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as23-standard-sticky-toc')
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
    if (as23Sections[0]?.id === activeSection) {
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
      as23Sections.forEach(s => {
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
      title={`Open ICAI AS 23 PDF — ${para}`}
    >
      <FileText size={9} className="shrink-0" />
      {para} (p. {page})
    </button>
  )

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      {/* Sticky Section Sub-Navbar */}
      <div id="as23-standard-sticky-toc" className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <BookOpen size={9.5} />
          AS 23 Sections:
        </span>
        {as23Sections.map((sec) => (
          <button
            key={sec.id}
            data-sec-id={sec.id}
            onClick={() => handleSectionClick(sec.id)}
            className={`text-[9.5px] font-bold px-2 py-0.5 rounded border transition-all whitespace-nowrap cursor-pointer ${
              activeSection === sec.id
                ? 'bg-blue-600 border-blue-600 text-white dark:bg-blue-500 dark:border-blue-500'
                : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#1E2640] dark:hover:bg-slate-800 border-slate-200 dark:border-gray-700 text-slate-655 dark:text-gray-300'
            }`}
          >
            {sec.title.split('. ')[1] || sec.title}
          </button>
        ))}
      </div>

      {/* Main Content Card */}
      <div className="w-full space-y-7 bg-white dark:bg-[#111726] border border-slate-200 dark:border-gray-800 rounded-xl p-6 sm:p-8 shadow-xs text-[14px] sm:text-[14.5px] text-slate-700 dark:text-gray-300 leading-relaxed">
        
        {/* 1. Overview & Purpose */}
        <SecHeader id="as23-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Introduction" /> Accounting Standard 23 prescribes the principles and procedures for recognizing **investments in associates** in Consolidated Financial Statements (CFS).
        </p>
        <p className="leading-relaxed">
          An associate is an entity where the investor holds significant influence, but which is neither a subsidiary nor a joint venture. Rather than fully consolidating the associate line-by-line, the investor accounts for it using the **Equity Method**, which reflects the investor\'s share of the associate\'s net assets and results on consolidation.
        </p>

        {/* 2. Scope & Applicability */}
        <SecHeader id="as23-scope" num="2" title="Scope &amp; Applicability (Para 1–4)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          This standard should be applied in accounting for investments in associates in the consolidated financial statements of the investor. <ParaRef page={1} para="Para 1" />
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Consolidated Accounts:</strong> Mandatory for all groups presenting CFS under AS 21. <ParaRef page={1} para="Para 2" /></li>
          <li><strong>Separate Accounts Excluded:</strong> For separate financial statements of the investor, the investment is accounted for at cost/fair value as per AS 13, not using the equity method.</li>
        </ul>

        {/* 3. Definitions */}
        <SecHeader id="as23-definitions" num="3" title="Definitions (Para 5)" />
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13.5px] border-collapse rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Term</th>
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">AS 23 Definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Associate</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">An enterprise in which the investor has significant influence and which is neither a subsidiary nor a joint venture of the investor. <ParaRef page={2} para="Para 3" /></td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-950/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Significant Influence</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">The power to participate in the financial and/or operating policy decisions of the investee but not control over those policies.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Equity Method</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">A method of accounting whereby the investment is initially recorded at cost, identifying any Goodwill/Capital Reserve. The carrying amount is adjusted thereafter for the post-acquisition changes in the investor\'s share of net assets of the investee. <ParaRef page={2} para="Para 3" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. Significant Influence */}
        <SecHeader id="as23-influence" num="4" title="Significant Influence (Para 6–8)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={2} para="Para 6" /> Significant influence is presumed to exist if the investor holds, directly or indirectly through subsidiaries, **20% or more of the voting power** of the investee.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('influenceIndicators')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Indicators of Significant Influence</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.influenceIndicators ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.influenceIndicators && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2.5 leading-relaxed">
              <p>Even if shareholding is less than 20%, significant influence can be demonstrated by:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Representation on the board of directors or equivalent governing body of the investee.</li>
                <li>Participation in policy-making processes, including decisions about dividends or other distributions.</li>
                <li>Material transactions between the investor and the investee (e.g. key sales/purchases).</li>
                <li>Interchange of managerial personnel.</li>
                <li>Provision of essential technical information.</li>
              </ul>
            </div>
          )}
        </div>

        {/* 5. Equity Method */}
        <SecHeader id="as23-equity-method" num="5" title="The Equity Method of Accounting (Para 9–12)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={6} para="Para 9" /> Under the equity method, the investment is initially recorded at cost in the investor\'s CFS.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('equityProcedures')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Key Equity Method Procedures</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.equityProcedures ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.equityProcedures && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2.5 leading-relaxed">
              <p>The investor follows these procedures to update the investment Carrying Value:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Goodwill / Capital Reserve:</strong> The difference between the cost of investment and the investor\'s share of net assets on the acquisition date is computed. Goodwill is included in the carrying amount (not shown separately). Capital Reserve reduces the carrying amount.</li>
                <li><strong>Share of Profit/Loss:</strong> The carrying amount is increased or decreased by the investor\'s share of the post-acquisition profits or losses of the associate. The investor\'s share of profits is recognized as income in the consolidated Profit &amp; Loss account.</li>
                <li><strong>Dividend Adjustment:</strong> Dividends received from the associate reduce the carrying amount of the investment. They are <strong>not</strong> credited to the consolidated Profit &amp; Loss statement.</li>
              </ul>
            </div>
          )}
        </div>

        {/* 6. Carrying Value Adjustments */}
        <SecHeader id="as23-carrying-adjust" num="6" title="Carrying Value Adjustments (Para 13–15)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          The carrying amount of the investment must also be adjusted for the investor\'s share of changes in the associate\'s equity.
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Revaluation/Reserve changes:</strong> Changes in the associate\'s reserves (e.g. revaluation reserves, capital reserves) are recognized directly in the consolidated reserves of the investor. <ParaRef page={7} para="Para 13" /></li>
          <li><strong>Impairment Losses:</strong> The carrying amount should be written down to recognize a decline, other than temporary, in the value of the investment, with the loss charged to the consolidated P&amp;L.</li>
        </ul>

        {/* 7. Special Accounting Treatments */}
        <SecHeader id="as23-special-cases" num="7" title="Special Accounting Treatments" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          Specific adjustments must be made to ensure consistency during consolidation:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Uniform Policies:</strong> The investor must ensure the associate uses uniform accounting policies for like transactions in similar circumstances. If not, adjustments must be made (unless impracticable). <ParaRef page={8} para="Para 14" /></li>
          <li><strong>Different Reporting Dates:</strong> The associate\'s accounts should be prepared to the same reporting date as the investor. If different, the gap must not exceed **6 months**, and significant intermediate transactions must be adjusted.</li>
          <li><strong>Elimination of Unrealized Profit:</strong> Unrealized profits resulting from transactions between the investor and the associate are eliminated only to the extent of the investor\'s interest in the associate.</li>
        </ul>

        {/* 8. Exclusions & Disclosures */}
        <SecHeader id="as23-exclusions-disc" num="8" title="Exclusions &amp; Disclosures" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          Exclusions from the equity method apply under strict conditions:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Temporary Investment:</strong> The investment is not accounted for under the equity method if it is held exclusively with a view to its subsequent disposal in the near future (temporary associate). In this case, AS 13 applies. <ParaRef page={5} para="Para 11" /></li>
          <li><strong>Severe Restrictions:</strong> Excluded if the associate operates under severe long-term restrictions that impair its ability to transfer funds to the investor.</li>
        </ul>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('disclosureItems')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Key Disclosures (Para 23)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.disclosureItems ? 'rotate-185' : ''}`} />
          </div>
          {openAccordions.disclosureItems && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2.5 leading-relaxed">
              <p>1. A list and description of significant associates, including the proportion of ownership interest.</p>
              <p>2. The investor\'s share of the profits/losses of such associates in the CFS. <ParaRef page={11} para="Para 23" /></p>
              <p>3. The carrying amount of the investment in associates in the Consolidated Balance Sheet, separating the goodwill/capital reserve arising on acquisition.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
