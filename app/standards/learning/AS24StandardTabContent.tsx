'use client'

import React, { useState, useEffect, useRef } from 'react'
import { BookOpen, FileText, ChevronDown, ChevronRight, Info, AlertTriangle, Check } from 'lucide-react'

interface AS24StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => React.ReactNode;
}

const as24Sections = [
  { id: 'as24-overview',          title: '1. Overview & Purpose' },
  { id: 'as24-scope',             title: '2. Scope & Applicability (Para 1-2)' },
  { id: 'as24-definitions',       title: '3. Definitions (Para 3-14)' },
  { id: 'as24-meaning',           title: '4. Meaning of Discontinuing Operation' },
  { id: 'as24-ide',               title: '5. Initial Disclosure Event (Para 15)' },
  { id: 'as24-presentation',      title: '6. Presentation & Disclosures (Para 17-26)' },
  { id: 'as24-measurement',       title: '7. Measurement & Recognition' },
  { id: 'as24-subsequent-disc',   title: '8. Subsequent Updates (Para 27-32)' },
]

export function AS24StandardTabContent({ navigateToPdfPage, renderTextWithReferences }: AS24StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as24-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    discontinuingCriteria: true,
    presentationRules: true,
    measurementRules: true,
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as24-standard-sticky-toc')
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
    if (as24Sections[0]?.id === activeSection) {
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
      as24Sections.forEach(s => {
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
      <div id="as24-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as24Sections.map(sec => (
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
        <SecHeader id="as24-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <PdfRef page={1} /> Accounting Standard 24 establishes principles for reporting information about **discontinuing operations**.
        </p>
        <p className="leading-relaxed">
          The purpose of this standard is to enhance the ability of users of financial statements to make projections of an enterprise\'s cash flows, earnings-generating capacity, and financial position. It does this by requiring the segregation of financial information related to discontinuing operations from that of continuing operations.
        </p>

        {/* 2. Scope & Applicability */}
        <SecHeader id="as24-scope" num="2" title="Scope &amp; Applicability (Para 1–2)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          This standard applies to all discontinuing operations of all enterprises. <PdfRef page={1} />
        </p>
        <p className="mb-4">It applies in preparing:</p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>Separate financial statements of an enterprise.</li>
          <li>Consolidated financial statements (CFS) under AS 21.</li>
          <li>Segment reports under AS 17 (discontinuing operations normally represent a reportable segment or a portion thereof).</li>
        </ul>

        {/* 3. Definitions */}
        <SecHeader id="as24-definitions" num="3" title="Definitions (Para 3–14)" />
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13.5px] border-collapse rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Term</th>
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">AS 24 definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Discontinuing Operation</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">A component of an enterprise that the enterprise, pursuant to a single plan, is disposing of substantially in its entirety, or piecemeal, or terminating through abandonment; representing a separate major line of business or geographical area; and distinguishable operationally and financially. <PdfRef page={2} /></td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-900/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Initial Disclosure Event</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">The occurrence of the earliest of: (a) entering into a binding sale agreement, or (b) board approval and public announcement of a detailed formal plan of discontinuance. <PdfRef page={5} /></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. Meaning of Discontinuing Operation */}
        <SecHeader id="as24-meaning" num="4" title="Meaning of Discontinuing Operation" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          To qualify as a discontinuing operation, a component must meet three criteria:
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('discontinuingCriteria')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">The Three Conditions (Para 3)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.discontinuingCriteria ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.discontinuingCriteria && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed">
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Single Plan:</strong> The disposal must be part of a coordinated single plan to sell the component in its entirety, sell assets piecemeal, or abandon it. <PdfRef page={2} /></li>
                <li><strong>Major Line or Geography:</strong> The component must represent a separate major line of business (e.g. retail division) or a geographical area of operations (e.g. South India operations).</li>
                <li><strong>Operationally Distinguishable:</strong> The assets, liabilities, revenues, and expenses of the component must be clearly identifiable for financial reporting purposes.</li>
              </ul>
            </div>
          )}
        </div>

        {/* 5. Initial Disclosure Event */}
        <SecHeader id="as24-ide" num="5" title="Initial Disclosure Event (Para 15)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          The Initial Disclosure Event triggers the requirement to begin AS 24 disclosures in the annual report.
        </p>
        <p className="mb-4">
          It is defined as the **earliest** of:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Binding Agreement:</strong> Entering into a binding sale agreement for substantially all of the assets of the discontinuing operation. <PdfRef page={5} /></li>
          <li><strong>Board Approval &amp; Announcement:</strong> The Board of Directors approving a detailed, formal plan for the discontinuance, and making a public announcement of that plan.</li>
        </ul>

        {/* 6. Presentation & Disclosures */}
        <SecHeader id="as24-presentation" num="6" title="Presentation &amp; Disclosures (Para 17–26)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          AS 24 mandates structured disclosures in both the face of financial statements and the notes.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('presentationRules')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Required Disclosures</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.presentationRules ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.presentationRules && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2.5 leading-relaxed">
              <p><strong>Notes to Accounts Disclosures:</strong></p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Description of the discontinuing operation, and the segment (AS 17) to which it belongs.</li>
                <li>The date of the initial disclosure event and the formal plan details.</li>
                <li>The carrying amounts of assets and liabilities to be disposed of.</li>
                <li>Revenues, expenses, profit/loss before tax, and tax expense of the component. <PdfRef page={6} /></li>
                <li>Net cash flows (operating, investing, financing) of the component.</li>
              </ul>
              <p><strong>Face of P&amp;L Disclosures (Para 24):</strong></p>
              <p>The revenue, expenses, pre-tax profit/loss, tax expense, and after-tax profit/loss of continuing vs discontinuing operations must be presented on the face of the P&amp;L statement or in a prominent note.</p>
            </div>
          )}
        </div>

        {/* 7. Measurement & Recognition */}
        <SecHeader id="as24-measurement" num="7" title="Measurement &amp; Recognition Principles" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          AS 24 is a **presentation and disclosure standard**. It does not establish new recognition or measurement principles.
        </p>
        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('measurementRules')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Measurement Standards Overlap</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.measurementRules ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.measurementRules && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2.5 leading-relaxed">
              <p>Instead of new rules, AS 24 requires the enterprise to apply other relevant standards:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Asset Impairment:</strong> Apply AS 28 "Impairment of Assets" to test and write down the assets of the discontinuing operation to their recoverable value.</li>
                <li><strong>Restructuring Provisions:</strong> Apply AS 29 "Provisions, Contingent Liabilities and Contingent Assets" to recognize provisions for employee termination benefits and contract termination costs.</li>
                <li><strong>Write-offs:</strong> Expenses or write-offs on disposal must be recognized when the criteria in other standards are met.</li>
              </ul>
            </div>
          )}
        </div>

        {/* 8. Subsequent Updates */}
        <SecHeader id="as24-subsequent-disc" num="8" title="Subsequent Updates &amp; Restatement (Para 27–32)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <PdfRef page={10} /> Disclosures must be updated in all subsequent annual reports until the discontinuance is completed.
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Progress Reporting:</strong> Subsequent reports must describe the progress of the disposal (assets sold, liabilities settled) and any significant changes to the plan.</li>
          <li><strong>Comparative Restatement:</strong> When an initial disclosure event occurs, all comparative prior period financial statements presented must be restated to segregate the continuing and discontinuing operations.</li>
          <li><strong>Abandonment:</strong> If the plan is abandoned, that fact and its financial effect must be disclosed immediately.</li>
        </ul>

      </div>
      </div>
    </div>
  );
}