'use client'

import React, { useState, useEffect, useRef } from 'react'
import { BookOpen, FileText, ChevronDown, ChevronRight, Info, AlertTriangle, Check } from 'lucide-react'

interface AS27StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => React.ReactNode;
}

const as27Sections = [
  { id: 'as27-overview',          title: '1. Overview & Purpose' },
  { id: 'as27-scope',             title: '2. Scope & Applicability (Para 1–2)' },
  { id: 'as27-definitions',       title: '3. Definitions & Joint Control (Para 3)' },
  { id: 'as27-jco',               title: '4. Jointly Controlled Operations (JCO)' },
  { id: 'as27-jca',               title: '5. Jointly Controlled Assets (JCA)' },
  { id: 'as27-jce',               title: '6. Jointly Controlled Entities (JCE)' },
  { id: 'as27-consolidation',     title: '7. Proportionate Consolidation Method' },
  { id: 'as27-transactions',      title: '8. Venturer-JV Transactions & Disclosures' },
]

export function AS27StandardTabContent({ navigateToPdfPage, renderTextWithReferences }: AS27StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as27-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    essentialConditions: true,
    suspensionRules: true,
    transactionProfits: true,
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as27-standard-sticky-toc')
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
    if (as27Sections[0]?.id === activeSection) {
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
      as27Sections.forEach(s => {
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
      <div id="as27-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as27Sections.map(sec => (
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
        <SecHeader id="as27-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <PdfRef page={1} /> Accounting Standard 27 sets out the principles and procedures for **accounting for interests in joint ventures** and reporting joint venture assets, liabilities, income, and expenses in the financial statements of venturers and investors.
        </p>
        <p className="leading-relaxed">
          The standard applies to all joint ventures regardless of the structures or forms (jointly controlled operations, assets, or entities) under which the activities take place. It ensures proper accounting treatment in both separate financial statements (typically carried at cost under AS 13) and consolidated financial statements (using proportionate consolidation).
        </p>

        {/* 2. Scope & Applicability */}
        <SecHeader id="as27-scope" num="2" title="Scope &amp; Applicability (Para 1–2)" />
        <p className="leading-relaxed mb-4">
          AS 27 must be applied by all enterprises in accounting for interests in joint ventures. <PdfRef page={2} />
        </p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Consolidation Rule:</strong> The requirements relating to accounting for joint ventures in consolidated financial statements (using the proportionate consolidation method) apply <strong>only when consolidated financial statements are prepared</strong> by the venturer. <PdfRef page={2} /></li>
          <li><strong>Investors without Joint Control:</strong> An investor in a joint venture who does not have joint control should report its interest in consolidated financial statements in accordance with <PdfRef page={2} />, <PdfRef page={2} />, or <PdfRef page={2} /> as appropriate.</li>
        </ul>

        {/* 3. Definitions & Joint Control */}
        <SecHeader id="as27-definitions" num="3" title="Definitions &amp; Joint Control (Para 3)" />
        <p className="leading-relaxed mb-4">
          The standard defines the following terms: <PdfRef page={2} />
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Joint Venture:</strong> A contractual arrangement whereby two or more parties undertake an economic activity that is subject to joint control.</li>
          <li><strong>Joint Control:</strong> The contractually agreed sharing of control over an economic activity. Decisions require consensus.</li>
          <li><strong>Control:</strong> The power to govern the financial and operating policies of an economic activity so as to obtain benefits from it.</li>
          <li><strong>Venturer:</strong> A party to a joint venture who has joint control over that joint venture.</li>
          <li><strong>Investor:</strong> A party to a joint venture who does not have joint control over that joint venture.</li>
        </ul>

        <button
          onClick={() => toggleAccordion('essentialConditions')}
          className="w-full flex items-center justify-between p-3 font-bold bg-slate-50 dark:bg-[#1E2640] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-gray-800 rounded-lg cursor-pointer"
        >
          <span className="text-[13px] sm:text-[14px]">Essential Conditions of a Joint Venture</span>
          {openAccordions.essentialConditions ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {openAccordions.essentialConditions && (
          <div className="p-4 border-x border-b border-slate-200 dark:border-gray-800 rounded-b-lg space-y-3 text-[13px] sm:text-[13.5px] bg-white dark:bg-[#111726] leading-relaxed">
            <p>For any relationship to qualify as a joint venture under AS 27, it must satisfy all 4 criteria:</p>
            <ol className="list-decimal pl-5 space-y-1.5">
              <li><strong>Two or more parties:</strong> Coming together (individuals, firms, corporate bodies, etc.).</li>
              <li><strong>Economic activity:</strong> Activities carried out with a profit-making motive.</li>
              <li><strong>Joint control:</strong> Operating and financial decisions are mutually shared; no single party has unilateral control. <PdfRef page={4} /></li>
              <li><strong>Contractual arrangement:</strong> Established via a written agreement, minutes of meetings, or articles of association to govern the relationship. <PdfRef page={3} /></li>
            </ol>
            <NoteBox type="warning" title="IDBI Protection Agreement Exception">
              <strong>Protective Rights:</strong> Contractual agreements signed by lenders or investors solely to protect their financial interests (e.g. debt covenants) do <strong>not</strong> make them venturers because they do not share operational joint control. <PdfRef page={4} />
            </NoteBox>
          </div>
        )}

        {/* 4. Jointly Controlled Operations (JCO) */}
        <SecHeader id="as27-jco" num="4" title="Jointly Controlled Operations (JCO)" />
        <p className="leading-relaxed mb-4">
          Under JCO, venturers do not create a separate legal entity. Instead, they use their own resources (assets, employees, and funds) to carry out the joint venture business alongside their regular operations. <PdfRef page={5} />
        </p>
        <p className="font-bold text-slate-900 dark:text-white mb-2">Accounting Treatment in Venturer's Books:</p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>Recognize only the assets controlled and the liabilities incurred by the venturer. <PdfRef page={6} /></li>
          <li>Recognize the expenses incurred by the venturer and its contractual share of joint revenues. <PdfRef page={6} /></li>
          <li>No separate set of books is required for the joint venture itself; transactions are recorded directly in the venturer's personal books. <PdfRef page={7} /></li>
        </ul>

        {/* 5. Jointly Controlled Assets (JCA) */}
        <SecHeader id="as27-jca" num="5" title="Jointly Controlled Assets (JCA)" />
        <p className="leading-relaxed mb-4">
          Similar to JCO, no separate legal entity is created, but the venturers jointly own one or more assets (e.g., a shared pipeline, property, or plant) to derive economic benefits. <PdfRef page={10} />
        </p>
        <p className="font-bold text-slate-900 dark:text-white mb-2">Accounting Treatment in Venturer's Books:</p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>Recognize the venturer's fractional share of the jointly held assets (classified according to the nature of the assets, e.g., share of Pipeline, share of Building). <PdfRef page={10} /></li>
          <li>Recognize any liabilities incurred directly, and its share of any liabilities incurred jointly with other venturers.</li>
          <li>Recognize any income from the sale/use of its share of the output, along with its share of joint expenses (e.g., maintenance) and any expenses incurred directly.</li>
        </ul>

        {/* 6. Jointly Controlled Entities (JCE) */}
        <SecHeader id="as27-jce" num="6" title="Jointly Controlled Entities (JCE)" />
        <p className="leading-relaxed mb-4">
          A JCE involves the establishment of a **separate corporation, partnership, or other entity** in which each venturer has an interest. The entity operates in its own right, raises its own finance, purchases assets, incurs liabilities, and maintains its own accounting records. <PdfRef page={15} />
        </p>
        <p className="font-bold text-slate-900 dark:text-white mb-2">Accounting Treatment:</p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Separate Financial Statements:</strong> Account for the interest as an <strong>investment</strong> at cost under <PdfRef page={24} />.</li>
          <li><strong>Consolidated Financial Statements (CFS):</strong> Account for the interest using the <strong>proportionate consolidation method</strong>. <PdfRef page={21} /></li>
        </ul>

        {/* 7. Proportionate Consolidation Method */}
        <SecHeader id="as27-consolidation" num="7" title="Proportionate Consolidation Method" />
        <p className="leading-relaxed mb-4">
          Under proportionate consolidation, the venturer's share of each of the assets, liabilities, income, and expenses of a JCE is reported as **separate line items** in the Consolidated Financial Statements, combining them line-by-line with similar items. <PdfRef page={21} />
        </p>

        <button
          onClick={() => toggleAccordion('suspensionRules')}
          className="w-full flex items-center justify-between p-3 font-bold bg-slate-50 dark:bg-[#1E2640] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-gray-800 rounded-lg cursor-pointer"
        >
          <span className="text-[13px] sm:text-[14px]">Suspension & Discontinuance of Proportionate Consolidation</span>
          {openAccordions.suspensionRules ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {openAccordions.suspensionRules && (
          <div className="p-4 border-x border-b border-slate-200 dark:border-gray-800 rounded-b-lg space-y-3 text-[13px] sm:text-[13.5px] bg-white dark:bg-[#111726] leading-relaxed">
            <p><strong>Do NOT use proportionate consolidation if:</strong> <PdfRef page={21} /></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The investment is intended to be temporary (acquired and held exclusively for subsequent disposal in the near future).</li>
              <li>The joint venture operates under severe long-term restrictions that significantly impair its ability to transfer funds to the venturers.</li>
            </ul>
            <p className="mt-2"><strong>Discontinuation Treatment:</strong> From the date joint control is lost, account for the investment as follows: <PdfRef page={21} /></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>If interest &gt; 50% (Subsidiary): Account under <strong>AS 21</strong>.</li>
              <li>If interest is between 20% and 50% (Associate): Account under <strong>AS 23</strong>.</li>
              <li>For all other cases: Account as an investment under <strong>AS 13</strong>.</li>
            </ul>
          </div>
        )}

        {/* 8. Venturer-JV Transactions & Disclosures */}
        <SecHeader id="as27-transactions" num="8" title="Venturer-JV Transactions &amp; Disclosures" />
        
        <button
          onClick={() => toggleAccordion('transactionProfits')}
          className="w-full flex items-center justify-between p-3 font-bold bg-slate-50 dark:bg-[#1E2640] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-gray-800 rounded-lg cursor-pointer"
        >
          <span className="text-[13px] sm:text-[14px]">Unrealized Profit Elimination Rules</span>
          {openAccordions.transactionProfits ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {openAccordions.transactionProfits && (
          <div className="p-4 border-x border-b border-slate-200 dark:border-gray-800 rounded-b-lg space-y-3 text-[13px] sm:text-[13.5px] bg-white dark:bg-[#111726] leading-relaxed">
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Sales/Contribution of Assets by Venturer to JV:</strong> The venturer should recognize only that portion of the gain/loss which is attributable to the interests of the <strong>other venturers</strong>. Recognize a loss in full immediately if it represents a reduction in NRV or an impairment. <PdfRef page={28} /></li>
              <li><strong>Purchases of Assets by Venturer from JV:</strong> The venturer should not recognize its share of JV profits on the transaction until the asset is resold to an independent third party. <PdfRef page={28} /></li>
              <li><strong>JCE Book Treatment:</strong> In separate books, transactions are recognized in full. Profit/loss elimination adjustments apply <strong>only during consolidation (CFS)</strong>. <PdfRef page={28} /></li>
            </ul>
          </div>
        )}

        <p className="font-bold text-slate-900 dark:text-white mt-4 mb-2">Required Disclosures (Para 35–38):</p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>List of all joint ventures and a description of interests in significant joint ventures. <PdfRef page={29} /></li>
          <li>For JCEs: Proportion of ownership interest, name, and country of incorporation.</li>
          <li>Separate financial statement disclosure of aggregate assets, liabilities, income, and expenses related to JCEs. <PdfRef page={29} /></li>
          <li>Contingent liabilities and capital commitments related to joint ventures (disclosed separately from other contingencies). <PdfRef page={29} /></li>
        </ul>
      </div>
      </div>
    </div>
  );
}