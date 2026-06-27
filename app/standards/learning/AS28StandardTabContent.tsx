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
  const numMap: Record<string, string> = {
    'I': '1', 'II': '2', 'III': '3', 'IV': '4', 'V': '5', 'VI': '6', 'VII': '7', 'VIII': '8', 'IX': '9',
    'X': '10', 'XI': '11', 'XII': '12', 'XIII': '13', 'XIV': '14', 'XV': '15', 'XVI': '16', 'XVII': '17', 'XVIII': '18', 'XIX': '19'
  };
  const arabicNum = numMap[num] || num;
  return (
    <div id={id} className="scroll-mt-36 mb-6 mt-12 first:mt-2 w-full">
      <div className="flex items-baseline gap-2 mb-2">
        <h2 className="text-[20px] sm:text-[22px] font-sans font-bold text-slate-900 dark:text-white tracking-tight leading-tight flex items-baseline gap-2">
          <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold mr-1 select-none">{arabicNum}.</span>
          <span>{title}</span>
        </h2>
      </div>
      <div className="h-[1.5px] w-full bg-slate-200/80 dark:bg-slate-800/80 mb-3" />
    </div>
  );
};

const NoteBox = ({ type, title, children }: { type: 'info' | 'warning' | 'success' | 'exam'; title?: string; children: React.ReactNode }) => {
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

const PdfRef = ({ page }: { page: number }) => (
  <button
    onClick={() => navigateToPdfPage(page)}
    className="inline-flex items-center justify-center w-4 h-4 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded transition-all cursor-pointer select-none align-middle"
    title={'Open ICAI PDF — Page ' + page}
  >
    <FileText size={10} className="shrink-0" />
  </button>
);

  return (
    <div className="w-full animate-fade-in font-sans bg-[#F5F5F3] dark:bg-[#0B0F19] pb-8">
      <div id="as28-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as28Sections.map(sec => (
              <button key={sec.id} data-sec-id={sec.id} onClick={() => handleSectionClick(sec.id)}
                className={'text-[9.5px] font-bold px-2 py-0.5 rounded border transition-all whitespace-nowrap cursor-pointer ' + (activeSection === sec.id ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#1E2640] dark:hover:bg-slate-800 border-slate-200 dark:border-gray-700 text-slate-600 dark:text-gray-300')}>
                {sec.title.split('. ').slice(1).join('. ') || sec.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 mt-6">
              <div className="w-full bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 rounded-xl px-6 sm:px-10 lg:px-14 py-10 sm:py-14 shadow-xs space-y-0">
        
        {/* 1. Overview & Purpose */}
        <SecHeader id="as28-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <PdfRef page={1} /> Accounting Standard 28 prescribes procedures to ensure that assets are carried at **no more than their recoverable amount**.
        </p>
        <p className="leading-relaxed">
          If carrying amount (book value) exceeds the amount to be recovered through use or sale of the asset, the asset is impaired. The standard outlines how to identify such assets, measure their recoverable amount (Value in Use or Net Selling Price), recognize impairment losses, allocate them to corporate assets or Cash Generating Units (CGUs), and subsequently reverse these losses under changed circumstances.
        </p>

        {/* 2. Scope & Exemptions */}
        <SecHeader id="as28-scope" num="2" title="Scope &amp; Exemptions (Para 1)" />
        <p className="leading-relaxed mb-4">
          AS 28 applies in accounting for the impairment of all assets, <strong>except</strong>: <PdfRef page={2} />
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Inventories:</strong> Covered by <PdfRef page={2} /> (Valuation of Inventories).</li>
          <li><strong>Construction Contracts Assets:</strong> Covered by <PdfRef page={2} /> (Construction Contracts).</li>
          <li><strong>Financial Assets:</strong> Including investments covered under <PdfRef page={2} /> (Accounting for Investments).</li>
          <li><strong>Deferred Tax Assets:</strong> Covered by <PdfRef page={2} /> (Accounting for Taxes on Income).</li>
        </ul>

        {/* 3. Impairment Indicators */}
        <SecHeader id="as28-indicators" num="3" title="Impairment Indicators (Para 6–14)" />
        <p className="leading-relaxed mb-4">
          An enterprise must assess at each balance sheet date whether there is any indication that an asset may be impaired. If an indication exists, the enterprise must estimate its recoverable amount. <PdfRef page={2} />
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
                <li>Asset market value has declined significantly more than expected due to time/use. <PdfRef page={3} /></li>
                <li>Significant adverse changes in technology, market, economic, or legal environment. <PdfRef page={3} /></li>
                <li>Market interest rates have increased, decreasing Value in Use. <PdfRef page={3} /></li>
                <li>Carrying amount of net assets exceeds the company\'s market capitalization. <PdfRef page={3} /></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">Internal Sources:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Evidence of physical obsolescence or damage. <PdfRef page={3} /></li>
                <li>Changes in asset use (discontinuation/restructuring plans, premature disposal). <PdfRef page={3} /></li>
                <li>Evidence indicating economic performance of the asset is or will be worse than budgeted. <PdfRef page={3} /></li>
              </ul>
            </div>
          </div>
        )}

        {/* 4. Recoverable Amount & Net Selling Price */}
        <SecHeader id="as28-recoverable" num="4" title="Recoverable Amount &amp; Net Selling Price" />
        <p className="leading-relaxed mb-4 font-serif text-[16px] text-slate-700 dark:text-slate-200">
          **Recoverable Amount** is the **HIGHER** of an asset\'s **Net Selling Price** and its **Value in Use (VIU)**. <PdfRef page={4} />
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Net Selling Price:</strong> The amount obtainable from sale in an arm\'s length transaction between knowledgeable, willing parties, <strong>less the costs of disposal</strong>. <PdfRef page={4} /></li>
          <li><strong>Costs of Disposal:</strong> Incremental costs directly attributable to disposal, excluding finance costs and income tax expenses.</li>
          <li><strong>Scrap Value Assumption:</strong> If there\'s no reason to believe Value in Use exceeds Net Selling Price (e.g., assets held for disposal), Net Selling Price can be taken as the recoverable amount. <PdfRef page={5} /></li>
        </ul>

        {/* 5. Value in Use & Discounting */}
        <SecHeader id="as28-viu" num="5" title="Value in Use &amp; Discounting (Para 23–43)" />
        <p className="leading-relaxed mb-4">
          **Value in Use** is the present value of estimated future cash flows expected to arise from the continuing use of an asset and from its disposal at the end of its useful life. <PdfRef page={5} />
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
                <li>Projections of cash inflows from continuing use. <PdfRef page={7} /></li>
                <li>Directly attributable outflows necessary to generate inflows. <PdfRef page={7} /></li>
                <li>Net cash flows to be received/paid for disposal at end of useful life. <PdfRef page={7} /></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">EXCLUDED from Cash Flows:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Cash flows from financing activities. <PdfRef page={8} /></li>
                <li>Income tax receipts or payments.</li>
                <li>Future cash flows from uncommitted restructurings or capital expenditures that enhance asset capacity. <PdfRef page={7} /></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">Pre-Tax Discount Rate:</p>
              <p>Must be a <strong>pre-tax rate</strong> reflecting current market assessments of the time value of money and the risks specific to the asset. It should not reflect risks already adjusted in the cash flows. <PdfRef page={8} /></p>
            </div>
          </div>
        )}

        {/* 6. Impairment Loss Recognition */}
        <SecHeader id="as28-recognition" num="6" title="Impairment Loss Recognition (Para 44–54)" />
        <p className="leading-relaxed mb-4">
          An **Impairment Loss** is recognized when the carrying amount of an asset exceeds its recoverable amount. <PdfRef page={9} />
        </p>

        <p className="font-bold text-slate-900 dark:text-white mb-2">Accounting Implications:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Write-Off:</strong> Charged immediately as an expense in the Profit &amp; Loss Statement. <PdfRef page={9} /></li>
          <li><strong>Revalued Assets:</strong> Adjusted against the Revaluation Reserve to the extent of previous surplus; any balance is charged to P&amp;L.</li>
          <li><strong>Prospective Depreciation:</strong> Recalculate depreciation for future periods on the basis of the revised carrying amount, residual value, and remaining useful life.</li>
        </ul>

        {/* 7. Cash Generating Units (CGUs) & Goodwill */}
        <SecHeader id="as28-cgu" num="7" title="Cash Generating Units (CGUs) &amp; Goodwill" />
        <p className="leading-relaxed mb-4">
          A **Cash-Generating Unit (CGU)** is the smallest identifiable group of assets that generates cash inflows from continuing use that are largely independent of cash inflows from other assets. <PdfRef page={10} />
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
              <p>Used when goodwill can be allocated on a reasonable and consistent basis to the CGU under review. Compare the carrying amount of the CGU (including allocated goodwill) to its recoverable amount. <PdfRef page={13} /></p>
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">Top-Down Test:</p>
              <p>Used if goodwill cannot be allocated on a reasonable basis. First perform the bottom-up test excluding goodwill, then compare the carrying amount of the larger group of CGUs (including goodwill) to its recoverable amount. <PdfRef page={15} /></p>
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">Order of Impairment Loss Allocation:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>First, to reduce the carrying amount of any <strong>goodwill</strong> allocated to the CGU. <PdfRef page={16} /></li>
                <li>Then, to the other assets of the CGU on a <strong>pro-rata basis</strong> based on the carrying amount of each asset. <PdfRef page={17} /></li>
              </ol>
            </div>
            <NoteBox type="exam" title="Individual Asset Floor">
              <strong>Floor Cap:</strong> Do not reduce the carrying amount of any asset below the highest of its Net Selling Price (if determinable), Value in Use (if determinable), or Zero. Any excess is re-allocated to other assets in the CGU. <PdfRef page={17} />
            </NoteBox>
          </div>
        )}

        {/* 8. Reversal of Impairment Loss */}
        <SecHeader id="as28-reversal" num="8" title="Reversal of Impairment Loss (Para 88–107)" />
        <p className="leading-relaxed mb-4">
          An enterprise must assess at each balance sheet date whether prior impairment losses have decreased. Reversal is recognized if there is a change in the cash flow estimates or discount rates used. <PdfRef page={18} />
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Individual Assets:</strong> Reversal is recognized as income in P&amp;L immediately (or in revaluation surplus for revalued assets). <PdfRef page={19} /></li>
          <li><strong>Capped limit:</strong> The increased carrying amount due to reversal <strong>cannot exceed the hypothetical carrying amount</strong> (net of depreciation) that would have been determined had no impairment loss been recognized in prior periods. <PdfRef page={19} /></li>
          <li><strong>Goodwill Impairment:</strong> Reversal of goodwill impairment is <strong>strictly prohibited</strong>. <PdfRef page={20} /></li>
          <li><strong>CGU Reversal Order:</strong> Allocated to increase carrying amounts of assets (other than goodwill) pro-rata, capped by their individual recoverable amounts or hypothetical depreciated cost had no impairment occurred.</li>
        </ul>
      </div>
      </div>
    </div>
  );
}