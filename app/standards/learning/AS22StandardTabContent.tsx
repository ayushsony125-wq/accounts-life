'use client'

import React, { useState, useEffect, useRef } from 'react'
import { BookOpen, FileText, ChevronDown, ChevronRight, Info, AlertTriangle, Check } from 'lucide-react'

interface AS22StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => React.ReactNode;
}

const as22Sections = [
  { id: 'as22-overview',          title: '1. Overview & Purpose' },
  { id: 'as22-scope',             title: '2. Scope & Applicability (Para 1-2)' },
  { id: 'as22-definitions',       title: '3. Definitions (Para 3-8)' },
  { id: 'as22-timing-perm',       title: '4. Timing vs Permanent Differences' },
  { id: 'as22-recognition',       title: '5. Recognition of Deferred Tax (Para 9-18)' },
  { id: 'as22-losses',            title: '6. Unabsorbed Losses & Virtual Certainty' },
  { id: 'as22-measurement',       title: '7. Measurement of Deferred Tax (Para 19-25)' },
  { id: 'as22-presentation',      title: '8. Presentation & Disclosures (Para 26-32)' },
]

export function AS22StandardTabContent({ navigateToPdfPage, renderTextWithReferences }: AS22StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as22-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    timingDiffs: true,
    certaintyRules: true,
    disclosureItems: true,
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as22-standard-sticky-toc')
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
    if (as22Sections[0]?.id === activeSection) {
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
      as22Sections.forEach(s => {
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
      <div id="as22-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as22Sections.map(sec => (
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
        <SecHeader id="as22-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <PdfRef page={1} /> Accounting Standard 22 establishes the principles for accounting for **taxes on income** following the matching concept.
        </p>
        <p className="leading-relaxed">
          Because tax laws and accounting principles recognize income and expenses at different times, a company\'s accounting profit before tax is often significantly different from its taxable income. AS 22 resolves this mismatch by requiring the recognition of deferred taxes on timing differences, ensuring tax expense matches accounting revenues.
        </p>

        {/* 2. Scope & Applicability */}
        <SecHeader id="as22-scope" num="2" title="Scope &amp; Applicability (Para 1–2)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          This standard should be applied in accounting for taxes on income. <PdfRef page={4} />
        </p>
        <p className="mb-4">It applies to:</p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>Domestic taxes on income (Corporate Income Tax).</li>
          <li>Foreign taxes on income levied on taxable profits of foreign branches or operations of the enterprise.</li>
          <li>Current Tax and Deferred Tax items which together constitute the tax expense of the period.</li>
        </ul>

        {/* 3. Definitions */}
        <SecHeader id="as22-definitions" num="3" title="Definitions (Para 3)" />
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13.5px] border-collapse rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Term</th>
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">AS 22 Official Definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Accounting Income</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">The net profit or loss for a period, as reported in the statement of profit and loss, before deducting income-tax expense. <PdfRef page={2} /></td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-900/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Taxable Income</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">The amount of the income for a period, determined in accordance with the tax laws, based upon which income-tax payable is determined.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Current Tax</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">The amount of income tax determined to be payable in respect of the taxable income for a period.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-900/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Deferred Tax</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">The tax effect of timing differences. <PdfRef page={2} /></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. Timing vs Permanent Differences */}
        <SecHeader id="as22-timing-perm" num="4" title="Timing vs Permanent Differences" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          The divergence between taxable income and accounting income is classified into two types of differences:
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('timingDiffs')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Timing Differences vs Permanent Differences</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.timingDiffs ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.timingDiffs && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed">
              <p><strong>Timing Differences (Para 3):</strong> Differences between taxable income and accounting income for a period that originate in one period and are capable of reversal in one or more subsequent periods. <PdfRef page={2} /></p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Example: Depreciation differences due to different methods/rates in tax vs books.</li>
                <li>Example: Provisions disallowed under tax law but allowed on actual payment (Section 43B).</li>
                <li><strong>Deferred tax is recognized ONLY on timing differences.</strong></li>
              </ul>
              <p><strong>Permanent Differences (Para 3):</strong> Differences that originate in one period and do not reverse subsequently.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Example: Fines or penalties disallowed under tax law.</li>
                <li>Example: CSR expenditure disallowed for tax purposes.</li>
                <li><strong>Permanent differences do NOT result in deferred tax assets or liabilities.</strong></li>
              </ul>
            </div>
          )}
        </div>

        {/* 5. Recognition of Deferred Tax */}
        <SecHeader id="as22-recognition" num="5" title="Recognition of Deferred Tax (Para 9–18)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <PdfRef page={6} /> Tax expense (Current Tax + Deferred Tax) must be charged to the Profit &amp; Loss account.
        </p>
        <p className="mb-4">The level of certainty required for recognizing Deferred Tax Assets depends on the timing difference type:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Deferred Tax Liabilities (DTL):</strong> Must always be recognized in full for all taxable timing differences.</li>
          <li><strong>Deferred Tax Assets (DTA) (Reasonable Certainty):</strong> For ordinary timing differences, DTAs are recognized to the extent there is **reasonable certainty** of their realization. Reasonable certainty is established by past records and realistic future profit estimates. <PdfRef page={6} /></li>
          <li><strong>Deferred Tax Assets (Virtual Certainty):</strong> In case of unabsorbed depreciation or carry forward of losses, DTAs should be recognized only when there is **virtual certainty supported by convincing evidence**.</li>
        </ul>

        {/* 6. Unabsorbed Losses & Virtual Certainty */}
        <SecHeader id="as22-losses" num="6" title="Unabsorbed Losses &amp; Virtual Certainty (Para 17-18)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          The standard applies a much stricter prudence test when an enterprise has unabsorbed losses or depreciation under tax laws.
        </p>
        
        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('certaintyRules')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Rules for Carry-Forward losses</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.certaintyRules ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.certaintyRules && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2.5 leading-relaxed">
              <p>1. Carry-forward losses indicate a history of losses. Therefore, a DTA is recognized only if there is **virtual certainty** of future taxable profits. <PdfRef page={7} /></p>
              <p>2. Virtual certainty must be **supported by convincing evidence**, such as a legally binding profitable supply contract, a confirmed backlog of orders, or a restructured profitable model that guarantees future profits.</p>
              <p>3. <strong>Re-assessment (Para 18):</strong> Unrecognized DTAs are re-assessed at each balance sheet date. If virtual certainty is achieved in a later year, the asset is then recognized.</p>
            </div>
          )}
        </div>

        {/* 7. Measurement */}
        <SecHeader id="as22-measurement" num="7" title="Measurement of Deferred Tax (Para 19–25)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          Deferred tax assets and liabilities should be measured using the tax rates and tax laws that have been enacted or substantively enacted by the balance sheet date. <PdfRef page={9} />
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>No Discounting:</strong> DTA and DTL must not be discounted to present value. They are kept at nominal values.</li>
          <li><strong>Substantively Enacted:</strong> In India, the Finance Act is substantively enacted when passed by Parliament and assented to by the President. Proposed rates in the Budget cannot be used.</li>
        </ul>

        {/* 8. Presentation & Disclosures */}
        <SecHeader id="as22-presentation" num="8" title="Presentation &amp; Disclosures (Para 26–32)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          Deferred tax balances must be presented separately from other assets and liabilities in the Balance Sheet.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('disclosureItems')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Key Presentation &amp; Disclosure Rules</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.disclosureItems ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.disclosureItems && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2.5 leading-relaxed">
              <p><strong>1. Balance Sheet Classification:</strong> DTA and DTL must be classified as **non-current assets** and **non-current liabilities** respectively in the Balance Sheet. <PdfRef page={12} /></p>
              <p><strong>2. P&amp;L Presentation:</strong> Current tax and Deferred tax must be presented separately under the head "Tax Expense" in the Statement of Profit and Loss.</p>
              <p><strong>3. Disclosures:</strong> Reconciliations of major components of deferred taxes (e.g. depreciation difference, gratuity provisions) must be provided in the Notes to Accounts.</p>
            </div>
          )}
        </div>

      </div>
      </div>
    </div>
  );
}