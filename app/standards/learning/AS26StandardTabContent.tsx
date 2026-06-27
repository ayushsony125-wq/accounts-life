'use client'

import React, { useState, useEffect, useRef } from 'react'
import { BookOpen, FileText, ChevronDown, ChevronRight, Info, AlertTriangle, Check } from 'lucide-react'

interface AS26StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => React.ReactNode;
}

const as26Sections = [
  { id: 'as26-overview',             title: '1. Overview & Purpose' },
  { id: 'as26-scope',                title: '2. Scope & Exemptions (Para 1)' },
  { id: 'as26-definitions',          title: '3. Definitions & Identifiability (Para 6)' },
  { id: 'as26-recognition',          title: '4. Recognition & Initial Cost (Para 19–39)' },
  { id: 'as26-internally-generated', title: '5. Internally Generated Assets (Para 40–53)' },
  { id: 'as26-subsequent-exp',       title: '6. Subsequent Expenditure (Para 59–61)' },
  { id: 'as26-amortisation',         title: '7. Amortisation & Residual Value (Para 63–84)' },
  { id: 'as26-disclosures',          title: '8. Retirements, Disposals & Disclosures (Para 87–96)' },
]

export function AS26StandardTabContent({ navigateToPdfPage, renderTextWithReferences }: AS26StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as26-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    recognitionCriteria: true,
    internallyGeneratedGoodwill: true,
    amortisationPresumption: true,
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as26-standard-sticky-toc')
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
    if (as26Sections[0]?.id === activeSection) {
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
      as26Sections.forEach(s => {
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
      title={`Open ICAI AS 26 PDF — ${para}`}
    >
      <FileText size={9} className="shrink-0" />
      {para} (p. {page})
    </button>
  )

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      {/* Sticky Section Sub-Navbar */}
      <div id="as26-standard-sticky-toc" className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <BookOpen size={9.5} />
          AS 26 Sections:
        </span>
        {as26Sections.map((sec) => (
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
        <SecHeader id="as26-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Introduction" /> Accounting Standard 26 establishes the criteria for the **recognition, measurement, amortisation, and disclosure of Intangible Assets**.
        </p>
        <p className="leading-relaxed">
          The core objective of AS 26 is to ensure that intangible assets are recognized only if they meet the strict definition of being identifiable, controlled by the enterprise, and expected to yield future economic benefits. It also specifies how to amortize their carrying amounts systematically over their useful lives and requires transparent disclosures to enable users of financial statements to understand their impact.
        </p>

        {/* 2. Scope & Exemptions */}
        <SecHeader id="as26-scope" num="2" title="Scope &amp; Exemptions (Para 1)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          AS 26 applies to all enterprises in accounting for intangible assets, except:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Assets Covered by Other Standards:</strong> Intangible assets held for sale in the ordinary course of business (<ParaRef page={2} para="AS 2" />, <ParaRef page={2} para="AS 7" />), Deferred Tax Assets (<ParaRef page={2} para="AS 22" />), Leases (<ParaRef page={2} para="AS 19" />), and Goodwill arising on amalgamation or consolidation (<ParaRef page={2} para="AS 14" />, <ParaRef page={2} para="AS 21" />).</li>
          <li><strong>Financial Assets:</strong> Cash, contractual rights to receive cash or other financial assets, or equity instruments (<ParaRef page={4} para="Financial Asset Definition" />).</li>
          <li><strong>Extractive Industries:</strong> Mineral rights and expenditure on exploration, development, and extraction of oil, gas, and minerals (<ParaRef page={2} para="Scope Exemption" />). However, the standard does apply to computer software and other startup costs used in these industries.</li>
          <li><strong>Insurance Contracts:</strong> Intangible assets arising in insurance enterprises from contracts with policyholders.</li>
          <li><strong>Termination Benefits:</strong> Expenditure in respect of employee termination benefits (<ParaRef page={2} para="Termination Benefits" />).</li>
        </ul>

        {/* 3. Definitions & Identifiability */}
        <SecHeader id="as26-definitions" num="3" title="Definitions &amp; Identifiability (Para 6)" />
        <p className="leading-relaxed mb-4">
          An **Intangible Asset** is defined as an **identifiable, non-monetary asset without physical substance**, held for use in the production/supply of goods or services, for rental to others, or for administrative purposes. <ParaRef page={4} para="Intangible Asset Definition" />
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-50 dark:bg-[#1E2640] p-4 rounded-lg border border-slate-200 dark:border-gray-800">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">1. Identifiability</h4>
            <p className="text-xs">Must be clearly distinguishable from goodwill. An asset is identifiable if it is separable (capable of being sold, rented, or transferred separately) or arises from contractual or legal rights. <ParaRef page={5} para="Para 6" /></p>
          </div>
          <div className="bg-slate-50 dark:bg-[#1E2640] p-4 rounded-lg border border-slate-200 dark:border-gray-800">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">2. Control</h4>
            <p className="text-xs">The power to obtain future economic benefits and restrict others' access to them (e.g., through legal rights, trade secrets, patents, or legal duties of confidentiality). <ParaRef page={6} para="Para 10" /></p>
          </div>
          <div className="bg-slate-50 dark:bg-[#1E2640] p-4 rounded-lg border border-slate-200 dark:border-gray-800">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">3. Future Benefits</h4>
            <p className="text-xs">Must generate probable future economic benefits (e.g., revenues from product sales, cost savings, or operational efficiencies). <ParaRef page={7} para="Para 17" /></p>
          </div>
        </div>

        <NoteBox type="warning" title="Staff Training & Customer Relationships">
          <strong>Lacks Control:</strong> Costs of staff training or developing customer loyalty do <strong>not</strong> qualify as intangible assets because employees can resign and customers can switch suppliers. The enterprise lacks sufficient control to restrict others from those benefits. Hence, training and loyalty program costs must be expensed as incurred. <ParaRef page={6} para="Example 1" />
        </NoteBox>

        {/* 4. Recognition & Initial Measurement */}
        <SecHeader id="as26-recognition" num="4" title="Recognition &amp; Initial Cost (Para 19–39)" />
        <p className="leading-relaxed mb-4">
          An intangible asset should be recognized if and only if it is probable that future economic benefits will flow, and the cost of the asset can be measured reliably. It must be initially measured **at cost**. <ParaRef page={7} para="Para 19" />
        </p>

        <button
          onClick={() => toggleAccordion('recognitionCriteria')}
          className="w-full flex items-center justify-between p-3 font-bold bg-slate-50 dark:bg-[#1E2640] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-gray-800 rounded-lg cursor-pointer"
        >
          <span className="text-[13px] sm:text-[14px]">Modes of Acquisition & Cost Components</span>
          {openAccordions.recognitionCriteria ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {openAccordions.recognitionCriteria && (
          <div className="p-4 border-x border-b border-slate-200 dark:border-gray-800 rounded-b-lg space-y-4 text-[13px] sm:text-[13.5px] bg-white dark:bg-[#111726] leading-relaxed">
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">Separate Acquisition:</p>
              <p>Cost comprises its purchase price (including import duties and non-refundable purchase taxes, less trade discounts and rebates) and any directly attributable expenditure of making the asset ready for its intended use (e.g., professional fees). <ParaRef page={7} para="Para 21" /></p>
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">Acquisition by Amalgamation:</p>
              <p>Acquired in an amalgamation in the nature of purchase. The cost is allocated based on its fair value at the acquisition date. If the fair value cannot be measured reliably, it is not recognized separately but is included in goodwill. <ParaRef page={8} para="Para 29" /></p>
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">Acquisition by Government Grant:</p>
              <p>If acquired free of charge or for nominal consideration (e.g., airport landing rights, licensing to operate stations), it is recognized at a nominal value or at the acquisition cost plus directly attributable expenditures. <ParaRef page={9} para="Para 33" /></p>
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">Exchange of Assets:</p>
              <p>Determined per the principles of AS 10. Cost is measured at fair value unless the exchange lacks commercial substance or fair value is not measurable. If fair value cannot be measured, it is measured at the carrying amount of the asset given up. <ParaRef page={10} para="Para 34" /></p>
            </div>
          </div>
        )}

        {/* 5. Internally Generated Assets */}
        <SecHeader id="as26-internally-generated" num="5" title="Internally Generated Assets (Para 40–53)" />
        <p className="leading-relaxed mb-4">
          Internally generated goodwill, brands, mastheads, publishing titles, and customer lists **must never be recognized as assets** because the expenditures cannot be distinguished from the cost of developing the business as a whole. <ParaRef page={10} para="Para 40" />, <ParaRef page={13} para="Para 45" />
        </p>

        <button
          onClick={() => toggleAccordion('internallyGeneratedGoodwill')}
          className="w-full flex items-center justify-between p-3 font-bold bg-slate-50 dark:bg-[#1E2640] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-gray-800 rounded-lg cursor-pointer"
        >
          <span className="text-[13px] sm:text-[14px]">Internal Projects: Research vs. Development Phase</span>
          {openAccordions.internallyGeneratedGoodwill ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {openAccordions.internallyGeneratedGoodwill && (
          <div className="p-4 border-x border-b border-slate-200 dark:border-gray-800 rounded-b-lg space-y-4 text-[13px] sm:text-[13.5px] bg-white dark:bg-[#111726] leading-relaxed">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-blue-100 dark:border-blue-900/40 p-4 rounded-lg bg-blue-50/20 dark:bg-blue-900/10">
                <p className="font-bold text-blue-700 dark:text-blue-400 mb-1">1. Research Phase (Always Expensed)</p>
                <p className="text-xs mb-2">Original and planned investigation to gain new knowledge. <ParaRef page={11} para="Para 41" /></p>
                <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600 dark:text-gray-400">
                  <li>Searching for alternatives.</li>
                  <li>Selecting or evaluating applications.</li>
                  <li>Always expense R&D costs during this phase.</li>
                </ul>
              </div>
              <div className="border border-emerald-100 dark:border-emerald-900/40 p-4 rounded-lg bg-emerald-50/20 dark:bg-emerald-900/10">
                <p className="font-bold text-emerald-700 dark:text-emerald-400 mb-1">2. Development Phase (Capitalized if Criteria Met)</p>
                <p className="text-xs mb-2">Application of research findings to a design/plan. <ParaRef page={12} para="Para 43" /></p>
                <p className="text-xs mb-1">Capitalize ONLY if you can demonstrate:</p>
                <ul className="list-disc pl-4 space-y-0.5 text-xs text-slate-600 dark:text-gray-400">
                  <li>Technical feasibility to complete.</li>
                  <li>Intention & ability to complete and use/sell.</li>
                  <li>Existence of market or internal usefulness.</li>
                  <li>Availability of resources to complete.</li>
                  <li>Reliable cost measurement.</li>
                </ul>
              </div>
            </div>
            <NoteBox type="exam" title="Reinstatement Prohibited">
              <strong>Crucial Rule:</strong> Expenditure on an intangible item that was initially recognized as an expense in previous annual financial statements or interim reports <strong>cannot</strong> be recognized as part of the cost of an intangible asset at a later date. <ParaRef page={13} para="Para 49" />
            </NoteBox>
          </div>
        )}

        {/* 6. Subsequent Expenditure */}
        <SecHeader id="as26-subsequent-exp" num="6" title="Subsequent Expenditure (Para 59–61)" />
        <p className="leading-relaxed mb-4">
          Subsequent expenditure on an intangible asset after its purchase or completion must be expensed as incurred, **unless**:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>It is probable that the expenditure will enable the asset to generate future economic benefits **in excess of its originally assessed standard of performance**. <ParaRef page={16} para="Para 59(a)" /></li>
          <li>The expenditure can be measured and attributed to the asset reliably. <ParaRef page={16} para="Para 59(b)" /></li>
        </ul>
        <p className="leading-relaxed">
          If both conditions are met, subsequent expenditure can be capitalized. However, subsequent expenditure on brands, customer lists, and mastheads is **always expensed** to prevent the recognition of internally generated goodwill. <ParaRef page={16} para="Para 60" />
        </p>

        {/* 7. Amortisation & Residual Value */}
        <SecHeader id="as26-amortisation" num="7" title="Amortisation &amp; Residual Value (Para 63–84)" />
        <p className="leading-relaxed mb-4">
          The depreciable amount must be allocated on a systematic basis over the best estimate of its useful life. Amortisation should commence **when the asset is available for use**. <ParaRef page={17} para="Para 63" />
        </p>

        <button
          onClick={() => toggleAccordion('amortisationPresumption')}
          className="w-full flex items-center justify-between p-3 font-bold bg-slate-50 dark:bg-[#1E2640] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-gray-800 rounded-lg cursor-pointer"
        >
          <span className="text-[13px] sm:text-[14px]">Useful Life, Amortisation Method, and Residual Value Rules</span>
          {openAccordions.amortisationPresumption ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {openAccordions.amortisationPresumption && (
          <div className="p-4 border-x border-b border-slate-200 dark:border-gray-800 rounded-b-lg space-y-4 text-[13px] sm:text-[13.5px] bg-white dark:bg-[#111726] leading-relaxed">
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">Rebuttable 10-Year Presumption:</p>
              <p>There is a rebuttable presumption that the useful life of an intangible asset will not exceed <strong>ten years</strong>. If the useful life is longer, the enterprise must amortize it over the best estimate of its life, test for impairment at least annually, and disclose the reasons for rebutting the presumption. <ParaRef page={17} para="Para 63" />, <ParaRef page={18} para="Para 66" /></p>
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">Amortisation Method:</p>
              <p>Must reflect the pattern in which economic benefits are consumed. If that pattern cannot be determined reliably, the <strong>Straight-Line Method (SLM)</strong> must be used. Diminishing balance and units of production methods are also permitted. <ParaRef page={19} para="Para 71" /></p>
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">Residual Value assumed to be ZERO:</p>
              <p>The residual value must be assumed to be <strong>zero</strong> unless: <ParaRef page={20} para="Para 75" /></p>
              <ul className="list-disc pl-5 mt-1 space-y-0.5">
                <li>There is a commitment by a third party to purchase the asset at the end of its useful life, or</li>
                <li>There is an active market for the asset (and its residual value can be determined by reference to that market, and the market is expected to exist).</li>
              </ul>
            </div>
          </div>
        )}

        {/* 8. Retirements, Disposals & Disclosures */}
        <SecHeader id="as26-disclosures" num="8" title="Retirements, Disposals &amp; Disclosures (Para 87–96)" />
        <p className="leading-relaxed mb-4">
          An intangible asset must be **derecognised** (eliminated from the balance sheet) when it is disposed of or when no future economic benefits are expected from its use or subsequent disposal. <ParaRef page={21} para="Para 87" />
        </p>
        <p className="leading-relaxed mb-4">
          Gains/losses are determined as the difference between net disposal proceeds and the carrying amount, recognized as income/expense in the statement of Profit &amp; Loss. Assets retired from active use and held for disposal are carried at their carrying amount at the date of retirement. <ParaRef page={22} para="Para 89" />
        </p>

        <p className="font-bold text-slate-900 dark:text-white mb-2">Key Disclosure Requirements:</p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>Useful lives or amortisation rates used, and amortisation methods. <ParaRef page={22} para="Para 90" /></li>
          <li>Gross carrying amount and accumulated amortisation (including accumulated impairment losses) at the beginning and end of the period.</li>
          <li>A detailed reconciliation of the carrying amount at the beginning and end of the period showing additions, retirements, disposals, impairment losses, and amortisation.</li>
          <li>If an asset is amortised over more than 10 years, the reasons for rebutting the presumption. <ParaRef page={23} para="Para 94" /></li>
          <li>Carrying amount and remaining amortisation period of any individual intangible asset that is material to the financial statements.</li>
          <li>The aggregate amount of Research &amp; Development expenditure recognized as an expense during the period. <ParaRef page={23} para="Para 96" /></li>
        </ul>
      </div>
    </div>
  )
}
