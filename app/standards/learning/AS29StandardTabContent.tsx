'use client'

import React, { useState, useEffect, useRef } from 'react'
import { BookOpen, FileText, ChevronDown, ChevronRight, Info, AlertTriangle, Check } from 'lucide-react'

interface AS29StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => React.ReactNode;
}

const as29Sections = [
  { id: 'as29-overview',          title: '1. Overview & Purpose' },
  { id: 'as29-scope',             title: '2. Scope & Applicability (Para 1)' },
  { id: 'as29-definitions',       title: '3. Core Definitions (Para 3)' },
  { id: 'as29-recognition',       title: '4. Recognition of Provisions (Para 14)' },
  { id: 'as29-obligating',        title: '5. Present Obligation & Past Events' },
  { id: 'as29-contingencies',     title: '6. Contingent Liabilities & Assets' },
  { id: 'as29-measurement',       title: '7. Measurement & Reimbursements' },
  { id: 'as29-restructuring',      title: '8. Restructuring Rules & Disclosures' },
]

export function AS29StandardTabContent({ navigateToPdfPage, renderTextWithReferences }: AS29StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as29-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    recognitionRules: true,
    contingentTable: true,
    reimbursementRules: true,
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as29-standard-sticky-toc')
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
    if (as29Sections[0]?.id === activeSection) {
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
      as29Sections.forEach(s => {
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
      title={`Open ICAI AS 29 PDF — ${para}`}
    >
      <FileText size={9} className="shrink-0" />
      {para} (p. {page})
    </button>
  )

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      {/* Sticky Section Sub-Navbar */}
      <div id="as29-standard-sticky-toc" className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <BookOpen size={9.5} />
          AS 29 Sections:
        </span>
        {as29Sections.map((sec) => (
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
        <SecHeader id="as29-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Introduction" /> Accounting Standard 29 ensures that appropriate **recognition criteria and measurement bases** are applied to provisions, contingent liabilities, and contingent assets.
        </p>
        <p className="leading-relaxed">
          The main purpose of the standard is to provide transparent guidelines for recognition, eliminating the practice of "profit smoothing" (where companies created arbitrary provisions in highly profitable years and reversed them in low-profit years to manipulate performance metrics). <ParaRef page={1} para="Profit Smoothing" />
        </p>

        {/* 2. Scope & Applicability */}
        <SecHeader id="as29-scope" num="2" title="Scope &amp; Applicability (Para 1)" />
        <p className="leading-relaxed mb-4">
          AS 29 should be applied in accounting for provisions and contingent liabilities and in dealing with contingent assets, **except**: <ParaRef page={3} para="Scope" />
        </p>
        <ul className="list-disc pl-6 space-y-1.5 mb-4">
          <li>Financial instruments carried at fair value.</li>
          <li>Executory contracts (contracts where neither party has performed obligations, or both have partially performed equally), **unless the contract is onerous**. <ParaRef page={4} para="Executory Contracts" /></li>
          <li>Insurance contracts arising in insurance enterprises from contracts with policyholders.</li>
          <li>Specific provisions covered by other standards (e.g., Construction Contracts - <ParaRef page={3} para="AS 7" />, Revenue - <ParaRef page={3} para="AS 9" />, Employee Benefits - <ParaRef page={3} para="AS 15" />, Leases - <ParaRef page={3} para="AS 19" />, and Income Taxes - <ParaRef page={3} para="AS 22" />).</li>
        </ul>

        {/* 3. Core Definitions */}
        <SecHeader id="as29-definitions" num="3" title="Core Definitions (Para 3)" />
        <p className="leading-relaxed mb-4">
          The standard establishes the following key definitions: <ParaRef page={4} para="Definitions" />
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Provision:</strong> A liability which can be measured only by using a substantial degree of estimation.</li>
          <li><strong>Liability:</strong> A present obligation of the enterprise arising from past events, the settlement of which is expected to result in an outflow of resources embodying economic benefits.</li>
          <li><strong>Obligating Event:</strong> An event that creates a legal or constructive obligation that results in an enterprise having no realistic alternative to settling that obligation. <ParaRef page={4} para="Obligating Event" /></li>
          <li><strong>Contingent Liability:</strong> A possible obligation that arises from past events and whose existence will be confirmed only by the occurrence or non-occurrence of uncertain future events; or a present obligation that is not recognized because a resource outflow is not probable or the amount cannot be measured reliably.</li>
          <li><strong>Contingent Asset:</strong> A possible asset that arises from past events and whose existence will be confirmed only by the occurrence or non-occurrence of one or more uncertain future events not wholly within the control of the enterprise. <ParaRef page={4} para="Contingent Asset" /></li>
        </ul>

        {/* 4. Recognition of Provisions */}
        <SecHeader id="as29-recognition" num="4" title="Recognition of Provisions (Para 14)" />
        <p className="leading-relaxed mb-4 font-serif text-[16px] text-slate-700 dark:text-slate-200">
          A provision should be recognized **if and only if** all 3 criteria are met: <ParaRef page={5} para="Para 14" />
        </p>

        <button
          onClick={() => toggleAccordion('recognitionRules')}
          className="w-full flex items-center justify-between p-3 font-bold bg-slate-50 dark:bg-[#1E2640] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-gray-800 rounded-lg cursor-pointer"
        >
          <span className="text-[13px] sm:text-[14px]">The Triple Recognition Test</span>
          {openAccordions.recognitionRules ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {openAccordions.recognitionRules && (
          <div className="p-4 border-x border-b border-slate-200 dark:border-gray-800 rounded-b-lg space-y-3 text-[13px] sm:text-[13.5px] bg-white dark:bg-[#111726] leading-relaxed">
            <div className="flex gap-2.5 items-start">
              <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">1</span>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Present Obligation as a result of a Past Event:</p>
                <p className="text-xs">Based on evidence, the obligation\'s existence at the balance sheet date is probable (more likely than not, &gt;50% chance). <ParaRef page={5} para="Present Obligation" /></p>
              </div>
            </div>
            <div className="flex gap-2.5 items-start">
              <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">2</span>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Probable Outflow of Resources:</p>
                <p className="text-xs">The outflow of resources embodying economic benefits to settle the obligation is probable (&gt;50% probability). <ParaRef page={7} para="Probable Outflow" /></p>
              </div>
            </div>
            <div className="flex gap-2.5 items-start">
              <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">3</span>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Reliable Estimate:</p>
                <p className="text-xs">A sufficiently reliable estimate of the obligation amount can be made. (Circumstances where an estimate cannot be made are extremely rare). <ParaRef page={8} para="Reliable Estimate" /></p>
              </div>
            </div>
          </div>
        )}

        {/* 5. Present Obligation & Past Events */}
        <SecHeader id="as29-obligating" num="5" title="Present Obligation &amp; Past Events" />
        <p className="leading-relaxed mb-4">
          Financial statements deal with the financial position at the end of the reporting period, not its possible position in the future. Therefore, **no provision is recognized for future operating costs**. <ParaRef page={6} para="Para 18" />
        </p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Independent of Future Actions:</strong> Only obligations arising from past events existing independently of the company\'s future conduct of business are recognized (e.g., legal cleanup fines or product warranties). <ParaRef page={6} para="Para 19" /></li>
          <li><strong>Avoidable Expenditures:</strong> If a future expenditure can be avoided by changing the method of operation (e.g., fitting smoke filters in a factory), no present obligation exists, and no provision is recognized. <ParaRef page={6} para="Para 19" /></li>
          <li><strong>Proposed New Laws:</strong> An obligation arises under a proposed new law only when the legislation is <strong>virtually certain to be enacted</strong>. <ParaRef page={7} para="Proposed Laws" /></li>
        </ul>

        {/* 6. Contingent Liabilities & Assets */}
        <SecHeader id="as29-contingencies" num="6" title="Contingent Liabilities &amp; Assets" />
        <p className="leading-relaxed mb-4">
          **Contingent Liabilities** are possible obligations (where existence is unconfirmed) or present obligations where a resource outflow is not probable or cannot be measured reliably. **They must never be recognized in the Balance Sheet** but must be disclosed in notes. <ParaRef page={8} para="Para 26" />
        </p>
        <p className="leading-relaxed mb-4">
          **Contingent Assets** are possible assets whose existence will be confirmed by uncertain future events. **They must never be recognized or disclosed in financial statements** to avoid recognizing income that may never be realized. Disclosure is made only in the Board of Directors\' report if the inflow is probable. <ParaRef page={10} para="Para 30" />
        </p>

        <button
          onClick={() => toggleAccordion('contingentTable')}
          className="w-full flex items-center justify-between p-3 font-bold bg-slate-50 dark:bg-[#1E2640] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-gray-800 rounded-lg cursor-pointer"
        >
          <span className="text-[13px] sm:text-[14px]">Treatment Matrix: Probability vs. Disclosure</span>
          {openAccordions.contingentTable ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {openAccordions.contingentTable && (
          <div className="p-4 border-x border-b border-slate-200 dark:border-gray-800 rounded-b-lg overflow-x-auto bg-white dark:bg-[#111726]">
            <table className="w-full text-left border-collapse border border-slate-200 dark:border-gray-800 text-[12.5px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#1E2640] font-bold">
                  <th className="p-2 border">Probability of Outflow</th>
                  <th className="p-2 border">Obligation Type</th>
                  <th className="p-2 border">Accounting Treatment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border">Probable (&gt;50% chance)</td>
                  <td className="p-2 border">Present Obligation</td>
                  <td className="p-2 border text-emerald-600 dark:text-emerald-400 font-bold">RECOGNIZE PROVISION (with full disclosures)</td>
                </tr>
                <tr>
                  <td className="p-2 border">Possible (&lt;50% but not remote)</td>
                  <td className="p-2 border">Present or Possible Obligation</td>
                  <td className="p-2 border text-amber-600 dark:text-amber-400 font-bold">DISCLOSE CONTINGENT LIABILITY (in notes)</td>
                </tr>
                <tr>
                  <td className="p-2 border">Remote (Very low chance)</td>
                  <td className="p-2 border">Present or Possible Obligation</td>
                  <td className="p-2 border text-slate-500 font-bold">NO PROVISION, NO NOTE DISCLOSURE (Ignore)</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* 7. Measurement & Reimbursements */}
        <SecHeader id="as29-measurement" num="7" title="Measurement &amp; Reimbursements" />
        <p className="leading-relaxed mb-4">
          The amount recognized as a provision should be the **best estimate** of the expenditure required to settle the present obligation at the balance sheet date, using management judgment and expert reports. <ParaRef page={11} para="Para 35" />
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>No Discounting:</strong> Provision amounts must <strong>not</strong> be discounted to present value, <strong>except</strong> in the case of decommissioning, restoration, and similar liabilities capitalized in Property, Plant &amp; Equipment (PPE). <ParaRef page={11} para="Discounting Exception" /></li>
          <li><strong>Exclusion of Disposal Gains:</strong> Gains on the expected disposal of assets must <strong>not</strong> be taken into account in measuring a provision (even if closely linked). <ParaRef page={12} para="expected Disposal" /></li>
        </ul>

        <button
          onClick={() => toggleAccordion('reimbursementRules')}
          className="w-full flex items-center justify-between p-3 font-bold bg-slate-50 dark:bg-[#1E2640] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-gray-800 rounded-lg cursor-pointer"
        >
          <span className="text-[13px] sm:text-[14px]">Reimbursement & Supplier Warranties</span>
          {openAccordions.reimbursementRules ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {openAccordions.reimbursementRules && (
          <div className="p-4 border-x border-b border-slate-200 dark:border-gray-800 rounded-b-lg space-y-3 text-[13px] sm:text-[13.5px] bg-white dark:bg-[#111726] leading-relaxed">
            <p>If some or all of the expenditure is expected to be reimbursed by another party (e.g. through insurance or supplier warranties): <ParaRef page={13} para="Reimbursements" /></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Recognize the reimbursement as a <strong>separate asset</strong> only when it is <strong>virtually certain</strong> that the reimbursement will be received.</li>
              <li>The amount recognized for the expected reimbursement must <strong>not exceed</strong> the liability amount.</li>
              <li>In the balance sheet, the asset and provision cannot be net-off. In the Profit and Loss statement, the expense can be offset against the reimbursement. <ParaRef page={13} para="Separate Asset" /></li>
            </ul>
          </div>
        )}

        {/* 8. Restructuring Rules & Disclosures */}
        <SecHeader id="as29-restructuring" num="8" title="Restructuring Rules &amp; Disclosures" />
        <p className="leading-relaxed mb-4">
          A restructuring provision (closure of location, sale of line of business, change of structure) is recognized only when the general recognition criteria are met. <ParaRef page={15} para="Restructuring" />
        </p>
        
        <NoteBox type="exam" title="Constructive Obligation for Restructuring">
          An obligating event for restructuring is created ONLY when:
          <ol className="list-decimal pl-5 mt-1.5 space-y-1">
            <li>The enterprise has a <strong>detailed formal plan</strong> identifying the business concerned, locations, and redundancy details.</li>
            <li>It has <strong>raised a valid expectation</strong> in those affected by starting to implement the plan or announcing its main features before the balance sheet date. <ParaRef page={15} para="Para 51" /></li>
            <li>For sale of business, there must be a <strong>binding sale agreement</strong> in place. <ParaRef page={15} para="Binding Agreement" /></li>
          </ol>
        </NoteBox>

        <p className="font-bold text-slate-900 dark:text-white mb-2">Key Disclosure Requirements (SMCs Exempted):</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Movement of each class of provision: carrying amount at beginning/end, additions, utilization, and reversals. <ParaRef page={16} para="Disclosure (a-d)" /></li>
          <li>Brief description of the nature of the obligation and expected timing of resulting outflows. <ParaRef page={16} para="Disclosure (a)" /></li>
          <li>Brief description of the nature of contingent liabilities, along with financial effect and uncertainties. <ParaRef page={17} para="Contingent Disclosures" /></li>
        </ul>
      </div>
    </div>
  )
}
