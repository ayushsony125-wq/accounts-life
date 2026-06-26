'use client'

import React, { useState, useEffect, useRef } from 'react'
import { BookOpen, FileText, ChevronDown, ChevronRight, Info, AlertTriangle, Check } from 'lucide-react'

interface AS28StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => React.ReactNode;
}

const as28Sections = [
  { id: 'as28-overview',          title: '1. Overview & Purpose' },
  { id: 'as28-scope',             title: '2. Scope & Exemptions (Para 1)' },
  { id: 'as28-indicators',        title: '3. Impairment Indicators (Para 6–14)' },
  { id: 'as28-recoverable',       title: '4. Recoverable Amount & Net Selling Price' },
  { id: 'as28-viu',               title: '5. Value in Use & Discounting (Para 23–43)' },
  { id: 'as28-recognition',       title: '6. Impairment Loss Recognition (Para 44–54)' },
  { id: 'as28-cgu',               title: '7. Cash Generating Units (CGUs) & Goodwill' },
  { id: 'as28-reversal',          title: '8. Reversal of Impairment Loss (Para 88–107)' },
]

export function AS28StandardTabContent({ navigateToPdfPage, renderTextWithReferences }: AS28StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as28-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    impairmentIndicators: true,
    valueInUseComposition: true,
    cguGoodwillAllocation: true,
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as28-standard-sticky-toc')
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
    if (as28Sections[0]?.id === activeSection) {
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
      as28Sections.forEach(s => {
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
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-655 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={`Open ICAI AS 28 PDF — ${para}`}
    >
      <FileText size={9} className="shrink-0" />
      {para} (p. {page})
    </button>
  )

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      {/* Sticky Section Sub-Navbar */}
      <div id="as28-standard-sticky-toc" className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <BookOpen size={9.5} />
          AS 28 Sections:
        </span>
        {as28Sections.map((sec) => (
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
        <SecHeader id="as28-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Introduction" /> Accounting Standard 28 prescribes procedures to ensure that assets are carried at **no more than their recoverable amount**.
        </p>
        <p className="leading-relaxed">
          If carrying amount (book value) exceeds the amount to be recovered through use or sale of the asset, the asset is impaired. The standard outlines how to identify such assets, measure their recoverable amount (Value in Use or Net Selling Price), recognize impairment losses, allocate them to corporate assets or Cash Generating Units (CGUs), and subsequently reverse these losses under changed circumstances.
        </p>

        {/* 2. Scope & Exemptions */}
        <SecHeader id="as28-scope" num="2" title="Scope &amp; Exemptions (Para 1)" />
        <p className="leading-relaxed mb-4">
          AS 28 applies in accounting for the impairment of all assets, <strong>except</strong>: <ParaRef page={2} para="Scope" />
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Inventories:</strong> Covered by <ParaRef page={2} para="AS 2" /> (Valuation of Inventories).</li>
          <li><strong>Construction Contracts Assets:</strong> Covered by <ParaRef page={2} para="AS 7" /> (Construction Contracts).</li>
          <li><strong>Financial Assets:</strong> Including investments covered under <ParaRef page={2} para="AS 13" /> (Accounting for Investments).</li>
          <li><strong>Deferred Tax Assets:</strong> Covered by <ParaRef page={2} para="AS 22" /> (Accounting for Taxes on Income).</li>
        </ul>

        {/* 3. Impairment Indicators */}
        <SecHeader id="as28-indicators" num="3" title="Impairment Indicators (Para 6–14)" />
        <p className="leading-relaxed mb-4">
          An enterprise must assess at each balance sheet date whether there is any indication that an asset may be impaired. If an indication exists, the enterprise must estimate its recoverable amount. <ParaRef page={2} para="Para 6" />
        </p>

        <button
          onClick={() => toggleAccordion('impairmentIndicators')}
          className="w-full flex items-center justify-between p-3 font-bold bg-slate-50 dark:bg-[#1E2640] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-gray-800 rounded-lg cursor-pointer"
        >
          <span className="text-[13px] sm:text-[14px]">External vs. Internal Sources of Information</span>
          {openAccordions.impairmentIndicators ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {openAccordions.impairmentIndicators && (
          <div className="p-4 border-x border-b border-slate-200 dark:border-gray-800 rounded-b-lg space-y-4 text-[13px] sm:text-[13.5px] bg-white dark:bg-[#111726] leading-relaxed">
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">External Sources:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Asset market value has declined significantly more than expected due to time/use. <ParaRef page={3} para="External (a)" /></li>
                <li>Significant adverse changes in technology, market, economic, or legal environment. <ParaRef page={3} para="External (b)" /></li>
                <li>Market interest rates have increased, decreasing Value in Use. <ParaRef page={3} para="External (c)" /></li>
                <li>Carrying amount of net assets exceeds the company\'s market capitalization. <ParaRef page={3} para="External (d)" /></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">Internal Sources:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Evidence of physical obsolescence or damage. <ParaRef page={3} para="Internal (a)" /></li>
                <li>Changes in asset use (discontinuation/restructuring plans, premature disposal). <ParaRef page={3} para="Internal (b)" /></li>
                <li>Evidence indicating economic performance of the asset is or will be worse than budgeted. <ParaRef page={3} para="Internal (c)" /></li>
              </ul>
            </div>
          </div>
        )}

        {/* 4. Recoverable Amount & Net Selling Price */}
        <SecHeader id="as28-recoverable" num="4" title="Recoverable Amount &amp; Net Selling Price" />
        <p className="leading-relaxed mb-4 font-serif text-[16px] text-slate-700 dark:text-slate-250">
          **Recoverable Amount** is the **HIGHER** of an asset\'s **Net Selling Price** and its **Value in Use (VIU)**. <ParaRef page={4} para="Para 15" />
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Net Selling Price:</strong> The amount obtainable from sale in an arm\'s length transaction between knowledgeable, willing parties, <strong>less the costs of disposal</strong>. <ParaRef page={4} para="Net Selling Price" /></li>
          <li><strong>Costs of Disposal:</strong> Incremental costs directly attributable to disposal, excluding finance costs and income tax expenses.</li>
          <li><strong>Scrap Value Assumption:</strong> If there\'s no reason to believe Value in Use exceeds Net Selling Price (e.g., assets held for disposal), Net Selling Price can be taken as the recoverable amount. <ParaRef page={5} para="Note 1" /></li>
        </ul>

        {/* 5. Value in Use & Discounting */}
        <SecHeader id="as28-viu" num="5" title="Value in Use &amp; Discounting (Para 23–43)" />
        <p className="leading-relaxed mb-4">
          **Value in Use** is the present value of estimated future cash flows expected to arise from the continuing use of an asset and from its disposal at the end of its useful life. <ParaRef page={5} para="Value in Use" />
        </p>

        <button
          onClick={() => toggleAccordion('valueInUseComposition')}
          className="w-full flex items-center justify-between p-3 font-bold bg-slate-50 dark:bg-[#1E2640] hover:bg-[#1E2640] border border-slate-200 dark:border-gray-800 rounded-lg cursor-pointer"
        >
          <span className="text-[13px] sm:text-[14px]">Composition of Future Cash Flows & Discount Rate Rules</span>
          {openAccordions.valueInUseComposition ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {openAccordions.valueInUseComposition && (
          <div className="p-4 border-x border-b border-slate-200 dark:border-gray-800 rounded-b-lg space-y-4 text-[13px] sm:text-[13.5px] bg-white dark:bg-[#111726] leading-relaxed">
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">Included in Cash Flows:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Projections of cash inflows from continuing use. <ParaRef page={7} para="Composition (i)" /></li>
                <li>Directly attributable outflows necessary to generate inflows. <ParaRef page={7} para="Composition (ii)" /></li>
                <li>Net cash flows to be received/paid for disposal at end of useful life. <ParaRef page={7} para="Composition (iii)" /></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">EXCLUDED from Cash Flows:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Cash flows from financing activities. <ParaRef page={8} para="Exclusions (g)" /></li>
                <li>Income tax receipts or payments.</li>
                <li>Future cash flows from uncommitted restructurings or capital expenditures that enhance asset capacity. <ParaRef page={7} para="Exclusions (d, e)" /></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">Pre-Tax Discount Rate:</p>
              <p>Must be a <strong>pre-tax rate</strong> reflecting current market assessments of the time value of money and the risks specific to the asset. It should not reflect risks already adjusted in the cash flows. <ParaRef page={8} para="Discount Rate" /></p>
            </div>
          </div>
        )}

        {/* 6. Impairment Loss Recognition */}
        <SecHeader id="as28-recognition" num="6" title="Impairment Loss Recognition (Para 44–54)" />
        <p className="leading-relaxed mb-4">
          An **Impairment Loss** is recognized when the carrying amount of an asset exceeds its recoverable amount. <ParaRef page={9} para="Case II" />
        </p>

        <p className="font-bold text-slate-900 dark:text-white mb-2">Accounting Implications:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Write-Off:</strong> Charged immediately as an expense in the Profit &amp; Loss Statement. <ParaRef page={9} para="Accounting Implications" /></li>
          <li><strong>Revalued Assets:</strong> Adjusted against the Revaluation Reserve to the extent of previous surplus; any balance is charged to P&amp;L.</li>
          <li><strong>Prospective Depreciation:</strong> Recalculate depreciation for future periods on the basis of the revised carrying amount, residual value, and remaining useful life.</li>
        </ul>

        {/* 7. Cash Generating Units (CGUs) & Goodwill */}
        <SecHeader id="as28-cgu" num="7" title="Cash Generating Units (CGUs) &amp; Goodwill" />
        <p className="leading-relaxed mb-4">
          A **Cash-Generating Unit (CGU)** is the smallest identifiable group of assets that generates cash inflows from continuing use that are largely independent of cash inflows from other assets. <ParaRef page={10} para="Para 55" />
        </p>

        <button
          onClick={() => toggleAccordion('cguGoodwillAllocation')}
          className="w-full flex items-center justify-between p-3 font-bold bg-slate-50 dark:bg-[#1E2640] hover:bg-[#1E2640] border border-slate-200 dark:border-gray-800 rounded-lg cursor-pointer"
        >
          <span className="text-[13px] sm:text-[14px]">Goodwill Allocation (Bottom-Up vs. Top-Down)</span>
          {openAccordions.cguGoodwillAllocation ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {openAccordions.cguGoodwillAllocation && (
          <div className="p-4 border-x border-b border-slate-200 dark:border-gray-800 rounded-b-lg space-y-4 text-[13px] sm:text-[13.5px] bg-white dark:bg-[#111726] leading-relaxed">
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">Bottom-Up Test:</p>
              <p>Used when goodwill can be allocated on a reasonable and consistent basis to the CGU under review. Compare the carrying amount of the CGU (including allocated goodwill) to its recoverable amount. <ParaRef page={13} para="Bottom-up" /></p>
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">Top-Down Test:</p>
              <p>Used if goodwill cannot be allocated on a reasonable basis. First perform the bottom-up test excluding goodwill, then compare the carrying amount of the larger group of CGUs (including goodwill) to its recoverable amount. <ParaRef page={15} para="Top-down" /></p>
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">Order of Impairment Loss Allocation:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>First, to reduce the carrying amount of any <strong>goodwill</strong> allocated to the CGU. <ParaRef page={16} para="Order (a)" /></li>
                <li>Then, to the other assets of the CGU on a <strong>pro-rata basis</strong> based on the carrying amount of each asset. <ParaRef page={17} para="Order (b)" /></li>
              </ol>
            </div>
            <NoteBox type="exam" title="Individual Asset Floor">
              <strong>Floor Cap:</strong> Do not reduce the carrying amount of any asset below the highest of its Net Selling Price (if determinable), Value in Use (if determinable), or Zero. Any excess is re-allocated to other assets in the CGU. <ParaRef page={17} para="Floor Cap" />
            </NoteBox>
          </div>
        )}

        {/* 8. Reversal of Impairment Loss */}
        <SecHeader id="as28-reversal" num="8" title="Reversal of Impairment Loss (Para 88–107)" />
        <p className="leading-relaxed mb-4">
          An enterprise must assess at each balance sheet date whether prior impairment losses have decreased. Reversal is recognized if there is a change in the cash flow estimates or discount rates used. <ParaRef page={18} para="Para 88" />
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Individual Assets:</strong> Reversal is recognized as income in P&amp;L immediately (or in revaluation surplus for revalued assets). <ParaRef page={19} para="Reversal" /></li>
          <li><strong>Capped limit:</strong> The increased carrying amount due to reversal <strong>cannot exceed the hypothetical carrying amount</strong> (net of depreciation) that would have been determined had no impairment loss been recognized in prior periods. <ParaRef page={19} para="Reversal Cap" /></li>
          <li><strong>Goodwill Impairment:</strong> Reversal of goodwill impairment is <strong>strictly prohibited</strong>. <ParaRef page={20} para="Goodwill Prohibition" /></li>
          <li><strong>CGU Reversal Order:</strong> Allocated to increase carrying amounts of assets (other than goodwill) pro-rata, capped by their individual recoverable amounts or hypothetical depreciated cost had no impairment occurred.</li>
        </ul>
      </div>
    </div>
  )
}
