'use client'

import React, { useState, useEffect, useRef } from 'react'
import { BookOpen, FileText, ChevronDown, ChevronRight, Info, AlertTriangle, Check } from 'lucide-react'

interface AS20StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => React.ReactNode;
}

const as20Sections = [
  { id: 'as20-overview',          title: '1. Overview & Purpose' },
  { id: 'as20-scope',             title: '2. Scope & Exemptions (Para 1)' },
  { id: 'as20-definitions',       title: '3. Definitions (Para 2)' },
  { id: 'as20-basic-eps',         title: '4. Basic EPS Computation (Para 10–22)' },
  { id: 'as20-share-changes',     title: '5. Treatment of Share Changes (Para 23–26)' },
  { id: 'as20-diluted-eps',       title: '6. Diluted EPS Computation (Para 29–37)' },
  { id: 'as20-potential-shares',  title: '7. Potential Equity Shares (Para 38–42)' },
  { id: 'as20-restatement-disc',  title: '8. Restatement & Disclosures (Para 43–48)' },
]

export function AS20StandardTabContent({ navigateToPdfPage, renderTextWithReferences }: AS20StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as20-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    numeratorAdjustments: true,
    shareInclusionTiming: true,
    potentialSharesList: true,
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as20-standard-sticky-toc')
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
    if (as20Sections[0]?.id === activeSection) {
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
      as20Sections.forEach(s => {
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
      <div id="as20-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as20Sections.map(sec => (
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
        <SecHeader id="as20-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <PdfRef page={1} /> Accounting Standard 20 prescribes the principles for the **determination and presentation of Earnings Per Share (EPS)**.
        </p>
        <p className="leading-relaxed">
          The main focus of the standard is to define rules for consistent EPS calculation and presentation. Standardizing the denominator (weighted number of shares) and numerator (adjusted profits) enables meaningful comparisons of performance across companies in the same period, and across periods for the same company.
        </p>

        {/* 2. Scope & Exemptions */}
        <SecHeader id="as20-scope" num="2" title="Scope &amp; Exemptions (Para 1)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          This standard is mandatory for all companies. However, specific exemptions apply to **Small and Medium-sized Companies (SMCs)**:
        </p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Mandatory:</strong> Every company must present <strong>Basic Earnings Per Share</strong> on the face of the Profit and Loss statement. <PdfRef page={2} /></li>
          <li><strong>Exemption:</strong> Small and Medium-sized Companies (SMCs) are exempt from disclosing <strong>Diluted Earnings Per Share</strong> (both including and excluding extraordinary items). Such companies are, however, encouraged to make these disclosures. <PdfRef page={2} /></li>
          <li><strong>Consolidation:</strong> In consolidated financial statements, EPS information should be presented on the basis of consolidated figures.</li>
        </ul>

        {/* 3. Definitions */}
        <SecHeader id="as20-definitions" num="3" title="Definitions (Para 2)" />
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13.5px] border-collapse rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Term</th>
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">AS 20 Official definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Equity Share</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">A share other than a preference share. <PdfRef page={2} /></td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Preference Share</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">A share carrying preferential rights to dividends and repayment of capital.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Financial Instrument</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Any contract that gives rise to both a financial asset of one enterprise and a financial liability or equity shares of another enterprise.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Potential Equity Share</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">A financial instrument or other contract that entitles, or may entitle, its holder to equity shares. <PdfRef page={3} /></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. Basic EPS Computation */}
        <SecHeader id="as20-basic-eps" num="4" title="Basic EPS Computation (Para 10–22)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          Basic Earnings Per Share is computed as:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border rounded-xl text-center font-mono font-bold text-slate-900 dark:text-white mb-6">
          Basic EPS = Net Profit (Loss) attributable to equity shareholders / Weighted average number of equity shares
        </div>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('numeratorAdjustments')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Numerator: Net Profit Attributable to Equity (Para 10-14)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.numeratorAdjustments ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.numeratorAdjustments && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed">
              <p>To determine the earnings (numerator) for basic EPS, we start with the net profit or loss for the period (after tax and extraordinary items) and adjust for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Non-cumulative preference dividends:</strong> Deducted from net profits only if they are declared or provided for in respect of the current period. <PdfRef page={4} /></li>
                <li><strong>Cumulative preference dividends:</strong> The full amount of the required preference dividends for the period must be deducted, <strong>irrespective</strong> of whether they have been declared or provided for in the books.</li>
                <li>Attributable tax (such as dividend distribution tax) related to preference dividends must also be deducted.</li>
              </ul>
            </div>
          )}
        </div>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('shareInclusionTiming')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Denominator: Share Inclusion Timing (Para 16-20)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.shareInclusionTiming ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.shareInclusionTiming && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed">
              <p>Shares are included in the weighted average number of shares from the date the consideration is receivable, for example:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>In exchange for cash:</strong> Included when cash is receivable. <PdfRef page={6} /></li>
                <li><strong>On conversion of a debt instrument:</strong> Included from the date of conversion.</li>
                <li><strong>In lieu of interest/principal:</strong> Included from the date interest ceases to accrue.</li>
                <li><strong>Amalgamation (Purchase):</strong> Included from the date of acquisition. <PdfRef page={7} /></li>
                <li><strong>Amalgamation (Merger):</strong> Included from the beginning of the reporting period (as if the combined entity existed from day 1).</li>
              </ul>
            </div>
          )}
        </div>

        {/* 5. Share Changes */}
        <SecHeader id="as20-share-changes" num="5" title="Treatment of Share Changes (Para 23–26)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <PdfRef page={8} /> When the number of outstanding shares changes **without a corresponding change in resources**, retrospective restatement is required.
        </p>
        <p className="mb-4">
          This applies to events like bonus issues, share splits, reverse share splits (consolidation), and the bonus element in a rights issue. For these events, the number of equity shares outstanding before the event is adjusted as if the event had occurred at the beginning of the earliest period reported.
        </p>

        <NoteBox type="exam" title="Rights Issue TERP Formula">
          To calculate the denominator changes during a Rights issue:
          <ol className="list-decimal pl-5 mt-2 space-y-1 font-mono text-xs">
            <li><strong>Theoretical Ex-Rights Price (TERP):</strong> (Fair Value pre-rights × Outstanding shares + Exercise Price × Rights shares) / Total shares post-rights. <PdfRef page={10} /></li>
            <li><strong>Rights Factor:</strong> Fair Value pre-rights / TERP</li>
            <li>Apply this Rights Factor as a multiplier to all shares outstanding prior to the rights exercise.</li>
          </ol>
        </NoteBox>

        {/* 6. Diluted EPS */}
        <SecHeader id="as20-diluted-eps" num="6" title="Diluted EPS Computation (Para 29–37)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          Diluted EPS measures the performance of the company assuming all potential equity shares are converted.
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border rounded-xl text-center font-mono font-bold text-slate-900 dark:text-white mb-6">
          Diluted EPS = Adjusted Profit (Loss) attributable to equity shareholders / Adjusted weighted average number of shares
        </div>

        <p className="mb-4"><strong>Diluted EPS Adjustments:</strong></p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Numerator Adjustment (Para 31):</strong> Add back preference dividends and savings on interest expenses related to potential shares (net of tax) that would cease to accrue upon conversion. <PdfRef page={12} /></li>
          <li><strong>Denominator Adjustment (Para 35):</strong> Add the weighted average number of additional equity shares that would be outstanding assuming the conversion of all potential equity shares.</li>
        </ul>

        {/* 7. Potential Shares */}
        <SecHeader id="as20-potential-shares" num="7" title="Potential Equity Shares (Para 38–42)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <PdfRef page={15} /> Potential equity shares are dilutive only when their conversion would **decrease net profit per share** from continuing operations.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('potentialSharesList')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Examples of Potential Equity Shares</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.potentialSharesList ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.potentialSharesList && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed">
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Convertible Debt &amp; Preference Shares:</strong> Convertible to equity shares under contractual terms.</li>
                <li><strong>Share Warrants &amp; Options:</strong> Contracts that give the holder the right to subscribe to equity shares.</li>
                <li><strong>Employee Stock Option Plans (ESOPs):</strong> Shares to be issued to employees as part of their remuneration package.</li>
                <li><strong>Contingently Issuable Shares:</strong> Shares issuable upon satisfaction of conditions like acquiring a business. <PdfRef page={3} /></li>
              </ul>
            </div>
          )}
        </div>

        <NoteBox type="warning" title="Anti-Dilution Rule">
          If the conversion of potential shares results in an increase in EPS (or a reduction in Loss Per Share), such potential shares are **anti-dilutive** and must be excluded from the Diluted EPS calculation. Diluted EPS should never be reported as higher than Basic EPS. <PdfRef page={19} />
        </NoteBox>

        {/* 8. Restatement & Disclosures */}
        <SecHeader id="as20-restatement-disc" num="8" title="Restatement &amp; Disclosures (Para 43–48)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <PdfRef page={22} /> Presentation of EPS is mandatory on the face of the Profit and Loss statement, even if negative.
        </p>
        <p className="mb-4"><strong>Key Disclosure Requirements:</strong></p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>The amounts used as the numerators in calculating basic and diluted EPS, and a reconciliation of those amounts to the net profit or loss for the period.</li>
          <li>The weighted average number of equity shares used as the denominator in calculating basic and diluted EPS, and a reconciliation of these denominators to each other. <PdfRef page={23} /></li>
          <li>The nominal value of shares along with the EPS figures.</li>
          <li>Explanations of transactions that occurred after the balance sheet date that would have significantly changed the number of equity shares.</li>
        </ul>

      </div>
      </div>
    </div>
  );
}