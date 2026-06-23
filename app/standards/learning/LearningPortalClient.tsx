'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Scale,
  FileText,
  Search,
  Play,
  Pause,
  RotateCw,
  RotateCcw,
  Volume2,
  VolumeX,
  SkipForward,
  Settings,
  Maximize,
  ExternalLink,
  Download,
  Video,
  Highlighter,
  PenTool,
  Eraser,
  MessageSquare,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  ChevronDown,
  X
} from 'lucide-react'
import { Standard } from '@/lib/learning-loader'
import { getStandardDetailAction } from './actions'
import { AS1ExamplesCustomContent } from './AS1ExamplesCustomContent'

const SIDEBAR_DISPLAY_NAMES: Record<string, string> = {
  // AS
  'intro-as': 'Introduction to AS',
  'as-1': 'Disclosure of Policies',
  'as-2': 'Valuation of Inventories',
  'as-3': 'Cash Flow Statements',
  'as-4': 'Contingencies & Events',
  'as-5': 'Net Profit or Loss',
  'as-7': 'Construction Contracts',
  'as-9': 'Revenue Recognition',
  'as-10': 'Property, Plant & Equip',
  'as-11': 'Foreign Exchange Rates',
  'as-12': 'Government Grants',
  'as-13': 'Accounting for Investments',
  'as-14': 'Amalgamations',
  'as-15': 'Employee Benefits',
  'as-16': 'Borrowing Costs',
  'as-17': 'Segment Reporting',
  'as-18': 'Related Party Disclosures',
  'as-19': 'Leases',
  'as-20': 'Earnings Per Share',
  'as-21': 'Consolidated Fin. Stmts',
  'as-22': 'Taxes on Income',
  'as-23': 'Investments in Associates',
  'as-24': 'Discontinuing Operations',
  'as-25': 'Interim Fin. Reporting',
  'as-26': 'Intangible Assets',
  'as-27': 'Interests in Joint Ventures',
  'as-28': 'Impairment of Assets',
  'as-29': 'Provisions & Contingencies',

  // Ind AS
  'intro-ind-as': 'Introduction to Ind AS',
  'ind-as-1': 'Presentation of Fin. Stmts',
  'ind-as-2': 'Inventories',
  'ind-as-7': 'Statement of Cash Flows',
  'ind-as-8': 'Policies, Estimates & Errors',
  'ind-as-10': 'Events after Rep. Period',
  'ind-as-12': 'Income Taxes',
  'ind-as-16': 'Property, Plant & Equip',
  'ind-as-19': 'Employee Benefits',
  'ind-as-20': 'Govt Grants & Assistance',
  'ind-as-21': 'Foreign Exchange Rates',
  'ind-as-23': 'Borrowing Costs',
  'ind-as-24': 'Related Party Disclosures',
  'ind-as-27': 'Separate Fin. Statements',
  'ind-as-28': 'Investments in Assoc. & JVs',
  'ind-as-29': 'Hyperinflationary Econ.',
  'ind-as-32': 'Fin. Instruments: Pres.',
  'ind-as-33': 'Earnings Per Share',
  'ind-as-34': 'Interim Fin. Reporting',
  'ind-as-36': 'Impairment of Assets',
  'ind-as-37': 'Provisions & Contingencies',
  'ind-as-38': 'Intangible Assets',
  'ind-as-40': 'Investment Property',
  'ind-as-41': 'Agriculture',
  'ind-as-101': 'First-time Adoption',
  'ind-as-102': 'Share-based Payment',
  'ind-as-103': 'Business Combinations',
  'ind-as-105': 'Non-current Assets & Ops',
  'ind-as-106': 'Mineral Exploration',
  'ind-as-107': 'Fin. Instruments: Discl.',
  'ind-as-108': 'Operating Segments',
  'ind-as-109': 'Financial Instruments',
  'ind-as-110': 'Consolidated Fin. Stmts',
  'ind-as-111': 'Joint Arrangements',
  'ind-as-112': 'Disclosure of Interests',
  'ind-as-113': 'Fair Value Measurement',
  'ind-as-114': 'Regulatory Deferral',
  'ind-as-115': 'Revenue from Contracts',
  'ind-as-116': 'Leases',
  'ind-as-117': 'Insurance Contracts'
}
// YouTube video ID extractor
const getYouTubeId = (url: string) => {
  if (!url) return ''
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : ''
}

const getVimeoId = (url: string) => {
  if (!url) return ''
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return match ? match[1] : ''
}

interface AS1StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences: (text: string) => React.ReactNode;
}

const as1Sections = [
  { id: 'overview',         title: '1. Executive Overview' },
  { id: 'objective',        title: '2. Purpose & Objective' },
  { id: 'scope',            title: '3. Scope & Applicability' },
  { id: 'definition',       title: '4. Definition of Accounting Policies' },
  { id: 'areas',            title: '5. Key Areas of Diversity' },
  { id: 'selection',        title: '6. Considerations in Selection' },
  { id: 'prudence',         title: '7. Prudence' },
  { id: 'substance',        title: '8. Substance over Form' },
  { id: 'materiality',      title: '9. Materiality' },
  { id: 'assumptions',      title: '10. Fundamental Assumptions' },
  { id: 'going-concern',    title: '10A. Going Concern' },
  { id: 'consistency',      title: '10B. Consistency' },
  { id: 'accrual',          title: '10C. Accrual' },
  { id: 'disclosure',       title: '11. Disclosure Requirements' },
  { id: 'change-policy',    title: '12. Disclosure of Changes' },
  { id: 'para23',           title: '13. Critical Rule — Para 23' },
  { id: 'financial-impact', title: '14. Financial Statement Impact' },
  { id: 'practical',        title: '15. Practical Application' },
  { id: 'comparison',       title: '16. AS 1 vs Ind AS 1' },
  { id: 'journal',          title: '17. Journal Entry Guidance' },
  { id: 'exam-focus',       title: '18. Examination Focus' },
  { id: 'footnotes',        title: '19. Statutory Footnotes' },
]

function AS1StandardTabContent({ navigateToPdfPage, renderTextWithReferences }: AS1StandardTabContentProps) {
  // Inline PDF page reference button — clicking opens the uploaded ICAI PDF at the given page
  const PdfRef = ({ page }: { page: number }) => (
    <button
      onClick={() => navigateToPdfPage(page)}
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={`Open ICAI AS 1 PDF — Page ${page}`}
    >
      <FileText size={9} className="shrink-0" />
      p.{page}
    </button>
  )

  return (
    <div className="w-full animate-fade-in font-sans space-y-6">
      {/* Sticky Section Sub-Navbar */}
      <div className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2.5 px-4 border border-[#E2E1DD] dark:border-gray-800 rounded-xl z-20 flex flex-row items-center gap-2 overflow-x-auto scrollbar-none shrink-0 select-none shadow-xs">
        <span className="text-[10px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-2 flex items-center gap-1">
          <BookOpen size={10} />
          AS 1 Sections:
        </span>
        {as1Sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => {
              const el = document.getElementById(`as1-${sec.id}`);
              if (el) {
                const yOffset = -120;
                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            className="text-[10px] font-bold px-2.5 py-1 bg-[#FAFAF8] hover:bg-slate-100 dark:bg-[#1E2640] dark:hover:bg-slate-800 border border-slate-200 dark:border-gray-700 rounded-md text-slate-600 dark:text-gray-300 transition-all whitespace-nowrap cursor-pointer hover:text-slate-900 dark:hover:text-white"
          >
            {sec.title.split('. ')[1] || sec.title}
          </button>
        ))}
      </div>

      {/* Main Content Card */}
      <div className="w-full space-y-12 bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-2xl p-6 sm:p-10 shadow-xs">

        {/* Section 1: Executive Overview */}
        <section id="as1-overview" className="scroll-mt-28 space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#2D5BE3] dark:bg-blue-500 rounded-full" />
            1. Executive Overview &amp; The Comparability Mandate
          </h2>
          <div className="bg-gradient-to-br from-[#EEF2FD] to-[#F5F0FF] dark:from-[#1A2542] dark:to-[#1E1A35] border border-[#C5D5F8] dark:border-[#2D3F7A] rounded-xl p-5 space-y-3">
            <p className="text-xs font-bold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-wider">Official Standard Identity</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[12px]">
              {[{label:'Standard Code',value:'AS 1'},{label:'Issued By',value:'ICAI'},{label:'Year of Issue',value:'1979'},{label:'Mandatory Date',value:'01 Apr 1991'}].map(item => (
                <div key={item.label} className="bg-white/70 dark:bg-white/5 rounded-lg p-2.5 text-center border border-slate-200/50 dark:border-gray-800/30">
                  <p className="text-slate-500 dark:text-gray-400 font-semibold uppercase tracking-wider text-[10px] mb-1">{item.label}</p>
                  <p className="text-slate-900 dark:text-white font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            Accounting Standard 1 (AS 1), <strong>Disclosure of Accounting Policies</strong>, is the foundational standard of the Indian GAAP framework. It governs how significant accounting choices are communicated to the public. The ultimate goal is to enforce disclosure transparency so that users can understand the financial records and compare them across different enterprises or periods. <PdfRef page={2} />
          </p>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">1.1 Why Diversity in Accounting Policies is Unavoidable (ICAI Paras 1-2)</h3>
            <p className="text-[14px] text-slate-650 dark:text-gray-350 leading-relaxed">
              Accounting policies are the specific principles and the methods of applying them. In preparing financial statements, management must choose policies that fit their operations. However, diversity in policies is inevitable because:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-[#1E2640] rounded-xl border border-slate-200 dark:border-gray-800">
                <p className="text-xs font-bold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-wider mb-2">① Codification Limits (Para 1)</p>
                <p className="text-[13px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                  Accounting standards cannot cover all possible areas of business transactions. In areas where no standard exists, enterprises have the freedom to adopt any reasonable accounting policy. <PdfRef page={2} />
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-[#1E2640] rounded-xl border border-slate-200 dark:border-gray-800">
                <p className="text-xs font-bold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-wider mb-2">② Diverse Operating Conditions (Para 2)</p>
                <p className="text-[13px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                  Enterprises operate in different industries, economic climates, and legal frameworks. A single set of accounting policies applicable to all enterprises for all time is not practicable. <PdfRef page={2} />
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 border border-slate-200 dark:border-gray-800 rounded-xl bg-slate-50/50 dark:bg-[#1E2640]/25 space-y-3 text-[13px] text-slate-700 dark:text-gray-350 font-semibold leading-relaxed">
            <p className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">Historical Context &amp; Dissemination Variance (Para 5-7)</p>
            <p>
              • <strong>Historical Disclosures:</strong> Historically, a few enterprises voluntarily included a separate Statement of Accounting Policies in their annual reports, but the practice was not uniform, and disclosures were often incomplete or scattered. <PdfRef page={2} />
            </p>
            <p>
              • <strong>Present Uniformity Requirement:</strong> To establish uniformity, AS 1 requires that all significant accounting policies form an integral part of the financial statements and be presented in one place. <PdfRef page={7} />
            </p>
          </div>

          <div className="bg-[#EEF2FD] dark:bg-[#1A2542] border-l-4 border-[#2D5BE3] p-4 rounded-r-xl">
            <p className="text-xs font-bold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-wider mb-2">The Comparability Barrier</p>
            <p className="text-[13px] text-slate-700 dark:text-gray-305 leading-relaxed font-semibold">
              When two different companies adopt different but acceptable accounting policies for similar transactions, their final profits and balances are not directly comparable. This standard addresses this limitation by requiring explicit disclosure of the policies adopted so that users can make necessary adjustments. <PdfRef page={2} />
            </p>
          </div>
        </section>

        {/* Section 2: Purpose & Objective */}
        <section id="as1-objective" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#2D5BE3] dark:bg-blue-500 rounded-full" />
            2. Purpose &amp; Objective
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            The core objective of AS 1 is to ensure that financial statements are <strong>understandable</strong> and <strong>comparable</strong> by requiring systematic, orderly disclosures of all significant accounting policies. <PdfRef page={2} />
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-3 p-4 bg-[#E8F7EE] dark:bg-[#1A2C22] border border-[#C5E9D4] dark:border-green-950/50 rounded-xl">
              <span className="text-2xl mt-1">📊</span>
              <div>
                <p className="text-xs font-bold text-[#1A7A4A] dark:text-emerald-400 uppercase tracking-wider mb-1">Cross-Enterprise Comparability (Para 8)</p>
                <p className="text-[13px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                  Allows stakeholders to compare the financial reports of different entities in the same industry by identifying policy differences (e.g., FIFO vs. Weighted Average for inventories). <PdfRef page={2} />
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-4 bg-[#EEF2FD] dark:bg-[#1A2542] border border-[#C5D5F8] dark:border-blue-950/50 rounded-xl">
              <span className="text-2xl mt-1">📅</span>
              <div>
                <p className="text-xs font-bold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-wider mb-1">Intra-Enterprise Consistency (Para 8)</p>
                <p className="text-[13px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                  Allows comparison of the same enterprise's records over different periods. If a policy changes, the nature, justification, and quantified impact must be disclosed. <PdfRef page={2} />
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-4 rounded-r-xl">
            <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">Crucial Concept Alert</p>
            <p className="text-[13px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
              AS 1 is strictly a <strong>disclosure standard</strong>. It does not dictate what accounting policy a company must select. It only states that whichever policy is selected and adopted must be clearly disclosed.
            </p>
          </div>
        </section>

        {/* Section 3: Scope */}
        <section id="as1-scope" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#2D5BE3] dark:bg-blue-500 rounded-full" />
            3. Scope &amp; Applicability
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            AS 1 applies to <strong>all enterprises</strong> in the preparation and presentation of general-purpose financial statements. <PdfRef page={2} />
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-xl bg-[#E8F7EE] dark:bg-[#1A2C22] border border-[#C5E9D4] dark:border-green-950/50">
              <p className="text-xs font-bold text-[#1A7A4A] dark:text-emerald-400 uppercase tracking-widest mb-2.5">Mandatory For</p>
              <ul className="space-y-2 text-[13px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5 shrink-0">✓</span> 
                  <span>All corporate entities preparing financial statements under Indian GAAP (AS framework).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5 shrink-0">✓</span> 
                  <span>Non-corporate entities: sole proprietorships, partnerships, LLPs, trusts, and societies that prepare formal financial statements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5 shrink-0">✓</span> 
                  <span>All general-purpose financial statements intended for public or stakeholder use. <PdfRef page={2} /></span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-[#FDEEEE] dark:bg-[#2C1D1D] border border-[#F5C6C0] dark:border-red-950/50">
              <p className="text-xs font-bold text-[#C0392B] dark:text-red-400 uppercase tracking-widest mb-2.5">Exempted / Not Applicable To</p>
              <ul className="space-y-2 text-[13px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5 shrink-0">✗</span> 
                  <span>Entities adopting **Indian Accounting Standards (Ind AS)** — they must comply with Ind AS 1 instead.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5 shrink-0">✗</span> 
                  <span>Internal management accounting records, cash budgets, or temporary financial models.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5 shrink-0">✗</span> 
                  <span>Immaterial items (per Footnote 1, standards apply only to material items). <PdfRef page={2} /></span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Definition */}
        <section id="as1-definition" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#2D5BE3] dark:bg-blue-500 rounded-full" />
            4. Definition of Accounting Policies
          </h2>
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-[#1E2640] dark:to-[#1A2542] border border-slate-200 dark:border-gray-700 rounded-xl p-5">
            <p className="text-xs font-bold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-wider mb-2">Official Definition — Para 11</p>
            <p className="text-[15px] text-slate-800 dark:text-gray-100 leading-relaxed font-semibold italic">
              &ldquo;Accounting policies refer to the <strong>specific accounting principles</strong> and the <strong>methods of applying those principles</strong> adopted by an enterprise in the preparation and presentation of financial statements.&rdquo; <PdfRef page={4} />
            </p>
          </div>
          <p className="text-[15px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            To satisfy the standard, disclosures must cover both aspects of this definition:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-[#1E2640]/40 rounded-xl border border-slate-200 dark:border-gray-800 space-y-1">
              <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase">Part A: Specific Accounting Principles</span>
              <p className="text-[13px] text-slate-750 dark:text-gray-350 font-medium">
                The conceptual rule followed by the enterprise. For example, recognizing revenue only when the risk and reward of ownership transfers to the buyer.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-[#1E2640]/40 rounded-xl border border-slate-200 dark:border-gray-800 space-y-1">
              <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase">Part B: Methods of Applying Principles</span>
              <p className="text-[13px] text-slate-750 dark:text-gray-350 font-medium">
                The formula or computation method chosen to implement the principle. For example, applying FIFO vs. Weighted Average to value inventories.
              </p>
            </div>
          </div>

          <div className="p-4 border border-slate-200 dark:border-gray-800 rounded-xl bg-slate-50/40 dark:bg-slate-900/30 text-[13px] text-slate-700 dark:text-gray-300 font-semibold leading-relaxed">
            <p className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-1.5">Regulatory Reduction of Alternatives (Para 13)</p>
            <p>
              Through standardisation efforts of the ICAI and government notifications, the number of acceptable alternative accounting policies has been reduced over time. However, choice is still necessary due to diverse business models. This choice highlights the ongoing importance of disclosure. <PdfRef page={5} />
            </p>
          </div>
        </section>

        {/* Section 5: Areas */}
        <section id="as1-areas" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#2D5BE3] dark:bg-blue-500 rounded-full" />
            5. Key Areas of Policy Diversity (Para 14)
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            ICAI identifies specific areas where different enterprises commonly adopt varying accounting policies. For these areas, explicit policy disclosure is critical: <PdfRef page={4} />
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-gray-700">
            <table className="w-full text-[13px] text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#1E2640] border-b border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-200">
                  <th className="p-3 font-bold w-1/3">Area of Diversity</th>
                  <th className="p-3 font-bold w-[120px]">Governing Standard</th>
                  <th className="p-3 font-bold">Common Alternative Options Permitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-gray-800 text-slate-700 dark:text-gray-300">
                {[
                  { area: 'Depreciation & Amortisation methods', std: 'AS 10 / AS 26', opts: 'Straight-Line Method (SLM), Written Down Value (WDV), or Units of Production.' },
                  { area: 'Valuation of inventories', std: 'AS 2', opts: 'FIFO (First-In, First-Out) or Weighted Average Cost (WAC).' },
                  { area: 'Treatment of goodwill', std: 'AS 14 / AS 26', opts: 'Amortisation over estimated useful life vs. immediate write-off to reserves (for amalgamations).' },
                  { area: 'Valuation of investments', std: 'AS 13', opts: 'Current investments valued at lower of cost and fair value; long-term investments at cost unless permanent diminution.' },
                  { area: 'Retirement and employee benefits', std: 'AS 15', opts: 'Defined benefit obligations actuarial valuation vs. defined contribution expensing.' },
                  { area: 'Profit recognition on long-term contracts', std: 'AS 7', opts: 'Percentage of Completion Method (POCM) based on costs incurred vs. other inputs.' },
                  { area: 'Conversion/translation of forex items', std: 'AS 11', opts: 'Average rate, transaction-date rate, or closing-date rate translation.' },
                  { area: 'Expenditure during construction', std: 'AS 10 / AS 16', opts: 'Capitalisation as fixed asset cost vs. immediate expensing as revenue expenditure.' },
                  { area: 'Valuation of fixed assets', std: 'AS 10', opts: 'Historical cost model vs. revaluation model.' },
                  { area: 'Treatment of contingent liabilities', std: 'AS 29', opts: 'Disclosure as a note in the accounts vs. recognition of provision if liability is probable.' }
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-slate-50/40 dark:bg-[#1E2640]/20'}>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{row.area}</td>
                    <td className="p-3"><span className="text-[10px] bg-[#EEF2FD] dark:bg-[#1A2542] text-[#2D5BE3] dark:text-blue-400 font-extrabold px-2 py-0.5 rounded">{row.std}</span></td>
                    <td className="p-3 font-medium text-slate-600 dark:text-gray-400">{row.opts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-[#FAFAF8] dark:bg-[#1E2640]/30 border border-slate-200 dark:border-gray-800 rounded-xl p-4 flex items-center gap-3">
            <span className="text-xl">💼</span>
            <div>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Audit Relevance</p>
              <p className="text-[12.5px] text-slate-600 dark:text-gray-450 font-medium">
                Auditors must verify that policies chosen in these areas match industry norms, are applied consistently, and comply with standard rules. If a client changes an inventory valuation method, the auditor must verify that it results in a more appropriate presentation.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Considerations in Selection */}
        <section id="as1-selection" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#2D5BE3] dark:bg-blue-500 rounded-full" />
            6. Considerations in the Selection of Accounting Policies (Para 16)
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            The primary criterion governing the selection of accounting policies is that the financial statements must present a <strong>true and fair view</strong> of the financial position and performance. Three considerations guide this selection: <PdfRef page={5} />
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-amber-700 dark:text-amber-400 uppercase tracking-widest">01. Prudence</span>
                <span className="text-lg">⚖️</span>
              </div>
              <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold leading-relaxed">
                Anticipate no profits, but provide for all known losses and liabilities. Do not overstate assets/revenue or understate liabilities/expenses.
              </p>
            </div>
            <div className="p-5 rounded-xl border bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-purple-700 dark:text-purple-400 uppercase tracking-widest">02. Substance over Form</span>
                <span className="text-lg">🔍</span>
              </div>
              <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold leading-relaxed">
                Account for transactions according to their economic substance and financial reality, not merely their legal form.
              </p>
            </div>
            <div className="p-5 rounded-xl border bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-blue-700 dark:text-blue-400 uppercase tracking-widest">03. Materiality</span>
                <span className="text-lg">📢</span>
              </div>
              <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold leading-relaxed">
                Disclose all items whose omission or misstatement could influence the economic decisions of financial statement users.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Prudence */}
        <section id="as1-prudence" className="scroll-mt-28 space-y-5">
          <h2 className="text-lg sm:text-xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span className="w-1 h-5 bg-amber-500 rounded-full" />
            7. Prudence (Conservatism) (Para 17(a))
          </h2>
          <p className="text-[14px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
            Prudence requires that under conditions of uncertainty, transactions be recorded conservatively. Profits are recognized only when realized, but provisions must be made for all known losses, even if the amount is an estimate. <PdfRef page={5} />
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#E8F7EE] dark:bg-[#1A2C22] border border-[#C5E9D4] dark:border-green-900/50 rounded-xl">
              <p className="text-xs font-bold text-[#1A7A4A] dark:text-emerald-400 uppercase tracking-wider mb-2">Prudence Mandates</p>
              <ul className="space-y-1.5 text-[13px] text-slate-700 dark:text-gray-300 font-semibold">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span> 
                  <span>Valuing inventories at the lower of cost and net realisable value (NRV).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span> 
                  <span>Making provisions for bad debts, warranty claims, and expected legal losses.</span>
                </li>
              </ul>
            </div>
            <div className="p-4 bg-[#FDEEEE] dark:bg-[#2C1D1D] border border-[#F5C6C0] dark:border-red-900/50 rounded-xl">
              <p className="text-xs font-bold text-[#C0392B] dark:text-red-400 uppercase tracking-wider mb-2">Prudence Prohibits</p>
              <ul className="space-y-1.5 text-[13px] text-slate-700 dark:text-gray-300 font-semibold">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span> 
                  <span>Creating <strong>hidden reserves</strong> by deliberately understating assets or overstating liabilities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span> 
                  <span>Providing for speculative, hypothetical losses without a reasonable basis.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-5 border border-slate-200 dark:border-gray-800 bg-[#FAFAF8] dark:bg-slate-900/30 rounded-xl space-y-3">
            <p className="text-xs font-bold text-slate-650 dark:text-slate-200 uppercase tracking-wider">Example: Inventory Lower of Cost and NRV</p>
            <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold">
              Suppose a trader bought 500 units of an item at ₹10/unit. 400 units were sold. 100 units remain.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-slate-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-700">
                    <th className="p-2.5 font-bold">Scenario</th>
                    <th className="p-2.5 font-bold">Cost per unit</th>
                    <th className="p-2.5 font-bold">NRV per unit</th>
                    <th className="p-2.5 font-bold">Valuation rate</th>
                    <th className="p-2.5 font-bold">Closing Inventory Value</th>
                    <th className="p-2.5 font-bold">Reasoning under Prudence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-gray-800 text-slate-700 dark:text-gray-300 font-medium">
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900 dark:text-white">A: NRV = ₹15</td>
                    <td className="p-2.5">₹10</td>
                    <td className="p-2.5">₹15</td>
                    <td className="p-2.5 font-bold text-emerald-600">₹10 (Cost)</td>
                    <td className="p-2.5">₹1,000</td>
                    <td className="p-2.5">We ignore the potential ₹5/unit profit until it is realized in next period.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900 dark:text-white">B: NRV = ₹8</td>
                    <td className="p-2.5">₹10</td>
                    <td className="p-2.5">₹8</td>
                    <td className="p-2.5 font-bold text-red-600">₹8 (NRV)</td>
                    <td className="p-2.5">₹800</td>
                    <td className="p-2.5">We immediately recognize the ₹200 loss in the current year.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 8: Substance over Form */}
        <section id="as1-substance" className="scroll-mt-28 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span className="w-1 h-5 bg-purple-500 rounded-full" />
            8. Substance over Form (Para 17(b))
          </h2>
          <p className="text-[14px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
            This principle dictates that transactions must be accounted for based on their economic substance and financial reality, not merely their legal form. <PdfRef page={6} />
          </p>

          <div className="bg-slate-50 dark:bg-[#1E2640] border border-slate-200 dark:border-gray-700 rounded-xl p-5 space-y-3">
            <p className="text-xs font-bold text-slate-650 dark:text-gray-200 uppercase tracking-wider">Example: Hire Purchase Agreements</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-[12px] font-bold text-red-650 dark:text-red-400 uppercase mb-1">Legal Form</p>
                <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold leading-relaxed">
                  Legal ownership of the asset remains with the financier until the final installment is paid. The buyer does not own the asset.
                </p>
              </div>
              <div>
                <p className="text-[12px] font-bold text-emerald-650 dark:text-emerald-400 uppercase mb-1">Economic Substance</p>
                <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold leading-relaxed">
                  The buyer uses the asset for their operations, takes on all operational risks, and receives the economic benefits from day one.
                </p>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-gray-700 text-[13px] font-semibold text-slate-700 dark:text-gray-300">
              <span className="font-bold text-[#2D5BE3] dark:text-blue-400">GAAP Accounting Treatment:</span> The buyer capitalizes the asset in their books and charges depreciation from the date of possession, representing the economic substance. <PdfRef page={6} />
            </div>
          </div>
        </section>

        {/* Section 9: Materiality */}
        <section id="as1-materiality" className="scroll-mt-28 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span className="w-1 h-5 bg-blue-500 rounded-full" />
            9. Materiality (Para 17(c))
          </h2>
          <p className="text-[14px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
            An item is material if its omission or misstatement could influence the economic decisions of users. Materiality depends on the size, nature, and context of the item. <PdfRef page={6} />
          </p>

          <div className="bg-[#EEF2FD] dark:bg-[#1A2542] border border-[#C5D5F8] dark:border-blue-900/50 p-5 rounded-xl space-y-3">
            <p className="text-xs font-bold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-wider">Statutory Materiality Limits (Schedule III of Companies Act 2013)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px] text-slate-700 dark:text-gray-300 font-semibold">
              <div className="p-3 bg-white dark:bg-[#111726] rounded-lg border border-slate-200 dark:border-gray-750">
                <span className="text-blue-600 dark:text-blue-400 font-extrabold mr-1">①</span>
                <strong>P&amp;L Disclosures:</strong> Disclose any expense or income item that exceeds 1% of revenue from operations or ₹1,00,000, whichever is higher.
              </div>
              <div className="p-3 bg-white dark:bg-[#111726] rounded-lg border border-slate-200 dark:border-gray-750">
                <span className="text-blue-600 dark:text-blue-400 font-extrabold mr-1">②</span>
                <strong>Balance Sheet Disclosures:</strong> Disclose the details of any shareholder who holds more than 5% of the company's shares.
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: Fundamental Assumptions */}
        <section id="as1-assumptions" className="scroll-mt-28 space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#2D5BE3] dark:bg-blue-500 rounded-full" />
            10. Fundamental Accounting Assumptions (Para 9-10)
          </h2>
          <div className="bg-[#EEF2FD] dark:bg-[#1A2542] border border-[#C5D5F8] dark:border-[#2D3F7A] rounded-xl p-5">
            <p className="text-xs font-bold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-wider mb-2">Para 9 — The Core Assumption Rule</p>
            <p className="text-[14px] text-slate-800 dark:text-gray-100 leading-relaxed font-semibold italic">
              &ldquo;Certain fundamental accounting assumptions underlie the preparation and presentation of financial statements. They are usually not specifically stated because their acceptance and use are assumed. Disclosure is necessary if they are not followed.&rdquo; <PdfRef page={3} />
            </p>
          </div>
          <p className="text-[15px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            There are three fundamental assumptions. If followed, no disclosure is required. If any assumption is breached, the fact must be disclosed:
          </p>

          {/* Visual Assumptions Flowchart */}
          <div className="p-6 border border-[#E2E1DD] dark:border-gray-800 rounded-xl bg-slate-50/50 dark:bg-[#1E2640]/10 flex flex-col items-center gap-4">
            <p className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest text-center">Fundamental Assumptions Decision Path</p>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-3xl text-center text-xs font-bold mt-2">
              <div className="bg-blue-600 text-white rounded-lg p-3.5 flex-1 border border-blue-700 shadow-2xs">
                <p className="uppercase text-[10px] text-blue-200 mb-1">Assumptions Check</p>
                <p className="text-[12px]">Are Going Concern, Consistency, and Accrual followed?</p>
              </div>
              <div className="text-slate-400 text-lg md:rotate-0 rotate-90">➔</div>
              <div className="bg-emerald-600 text-white rounded-lg p-3.5 flex-1 border border-emerald-700 shadow-2xs">
                <p className="uppercase text-[10px] text-emerald-200 mb-1">Yes</p>
                <p className="text-[12px]">No explicit disclosure required. The user assumes they are followed.</p>
              </div>
              <div className="text-slate-400 text-lg md:rotate-0 rotate-90">➔</div>
              <div className="bg-rose-600 text-white rounded-lg p-3.5 flex-1 border border-rose-700 shadow-2xs">
                <p className="uppercase text-[10px] text-rose-200 mb-1">No (Breached)</p>
                <p className="text-[12px]">Explicit disclosure of the fact and the reasons is mandatory.</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-[#1A2542]/20 border border-slate-200 dark:border-gray-800 rounded-xl text-xs text-slate-600 dark:text-gray-400 font-semibold">
            <strong>Auditor Note:</strong> If a company prepares accounts on a cash basis instead of accrual, this constitutes a breach of a fundamental assumption. The auditor must qualify the report for non-compliance.
          </div>
        </section>

        {/* Section 10A: Going Concern */}
        <section id="as1-going-concern" className="scroll-mt-28 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span className="w-1 h-5 bg-blue-500 rounded-full" />
            10A. Going Concern (Para 10(a))
          </h2>
          <div className="p-5 border border-slate-200 dark:border-gray-800 rounded-xl bg-slate-50/30 dark:bg-[#1E2640]/40 space-y-3">
            <p className="text-[14px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
              The enterprise is assumed to continue in operation for the foreseeable future, with neither the intention nor the necessity of liquidation or material curtailment of operations. <PdfRef page={3} />
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-white dark:bg-[#111726] rounded-lg border border-slate-200 dark:border-gray-700">
                <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Assumption Followed</p>
                <p className="text-[13px] text-slate-650 dark:text-gray-350 font-medium">
                  Assets are valued at historical cost minus depreciation. No disclosure of this assumption is required.
                </p>
              </div>
              <div className="p-3 bg-white dark:bg-[#111726] rounded-lg border border-slate-200 dark:border-gray-700">
                <p className="text-[11px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">Assumption Breached</p>
                <p className="text-[13px] text-slate-650 dark:text-gray-350 font-medium">
                  Assets must be valued on a <strong>liquidation basis (net realisable value)</strong>. The breach must be disclosed with justification.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10B: Consistency */}
        <section id="as1-consistency" className="scroll-mt-28 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span className="w-1 h-5 bg-blue-500 rounded-full" />
            10B. Consistency (Para 10(b))
          </h2>
          <div className="p-5 border border-slate-200 dark:border-gray-800 rounded-xl bg-slate-50/30 dark:bg-[#1E2640]/40 space-y-3">
            <p className="text-[14px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
              Accounting policies are assumed to be consistent from one period to another to ensure period-to-period comparability. <PdfRef page={3} />
            </p>
            <p className="text-[13px] font-bold text-slate-700 dark:text-gray-200">A change in accounting policy is permitted only under three conditions:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { num: 'i', title: 'Required by Statute', desc: 'Compliance with a law or act (e.g., Companies Act changes).' },
                { num: 'ii', title: 'Required by Standard', desc: 'Compliance with a new or revised Accounting Standard issued by ICAI.' },
                { num: 'iii', title: 'Better Presentation', desc: 'The change results in a more appropriate presentation of financial records.' },
              ].map(item => (
                <div key={item.num} className="p-3.5 bg-white dark:bg-[#111726] rounded-lg border border-slate-200 dark:border-gray-700 text-[13px] text-slate-750 dark:text-gray-350 space-y-1">
                  <span className="font-extrabold text-[#2D5BE3] dark:text-blue-400">({item.num}) {item.title}</span>
                  <p className="font-medium text-[12px]">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-[12.5px] text-amber-700 dark:text-amber-400 font-semibold italic">
              Note: Management convenience is not a valid reason for changing an accounting policy. <PdfRef page={3} />
            </p>
          </div>
        </section>

        {/* Section 10C: Accrual */}
        <section id="as1-accrual" className="scroll-mt-28 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span className="w-1 h-5 bg-blue-500 rounded-full" />
            10C. Accrual (Para 10(c))
          </h2>
          <div className="p-5 border border-slate-200 dark:border-gray-800 rounded-xl bg-slate-50/30 dark:bg-[#1E2640]/40 space-y-3">
            <p className="text-[14px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
              Transactions and events are recognized when they occur (and not when cash or cash equivalent is received or paid) and are recorded in the periods to which they relate. <PdfRef page={3} />
            </p>
            <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-4 rounded-r-xl">
              <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">Matching Concept Limit (Para 10(c) Footnote)</p>
              <p className="text-[13px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                The accrual assumption is basic to the matching concept. However, the specific considerations affecting the process of matching costs with revenues under the accrual assumption are not dealt with in this Standard. <PdfRef page={3} />
              </p>
            </div>
            <div className="bg-[#EEF2FD] dark:bg-[#1A2542] border border-[#C5D5F8] dark:border-[#2D3F7A] rounded-lg p-3 text-[13px] font-semibold text-slate-700 dark:text-gray-300">
              <span className="font-bold text-[#2D5BE3] dark:text-blue-400">Statutory Requirement:</span> Section 128(1) of the Companies Act, 2013 makes accrual-basis accounting mandatory for all companies in India. <PdfRef page={4} />
            </div>
          </div>
        </section>

        {/* Section 11: Disclosure Requirements */}
        <section id="as1-disclosure" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#2D5BE3] dark:bg-blue-500 rounded-full" />
            11. Disclosure Requirements
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            To comply with AS 1, enterprises must adhere to these disclosure principles: <PdfRef page={7} />
          </p>
          <div className="space-y-3">
            {[
              { title: 'Part of Financial Statements (Para 22)', text: 'All disclosures of accounting policies must form an integral part of the financial statements, not presented separately.' },
              { title: 'Preferred Single Location (Para 23)', text: 'Significant accounting policies should be disclosed in one place (typically as Note 1: Summary of Significant Accounting Policies), not scattered.' },
              { title: 'Comprehensive Disclosure (Para 24)', text: 'Any significant policy that affects the understanding of the financial statements must be disclosed. The list of examples in the standard is illustrative, not exhaustive.' }
            ].map((item, i) => (
              <div key={i} className="p-4 bg-white dark:bg-[#111726] border border-slate-200 dark:border-gray-700 rounded-xl">
                <p className="font-bold text-[14px] text-slate-800 dark:text-gray-100 mb-1">{item.title}</p>
                <p className="text-[13px] text-slate-650 dark:text-gray-450 font-medium leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 12: Disclosure of Changes */}
        <section id="as1-change-policy" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#2D5BE3] dark:bg-blue-500 rounded-full" />
            12. Disclosure of Changes in Accounting Policies (Paras 25-27)
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            When an enterprise changes a significant accounting policy, it must disclose the change according to its material impact: <PdfRef page={7} />
          </p>

          <div className="space-y-3">
            <div className="p-4 bg-[#EEF2FD] dark:bg-[#1A2542] border border-[#C5D5F8] dark:border-[#2D3F7A] rounded-xl">
              <p className="text-[13px] font-bold text-[#2D5BE3] dark:text-blue-400 mb-1">Rule 1: Material Effect in the Current Period</p>
              <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold leading-relaxed">
                The enterprise must disclose: (a) the nature of the change, (b) the reason for the change, and (c) the amount by which items are affected (quantified impact). If the amount is not ascertainable, that fact must be explicitly stated. <PdfRef page={7} />
              </p>
            </div>
            <div className="p-4 bg-[#EEF2FD] dark:bg-[#1A2542] border border-[#C5D5F8] dark:border-[#2D3F7A] rounded-xl">
              <p className="text-[13px] font-bold text-[#2D5BE3] dark:text-blue-400 mb-1">Rule 2: Expected Future Material Effect (No Current Impact)</p>
              <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold leading-relaxed">
                If the change does not have a material effect in the current period but is expected to have one in later periods, the fact of the change must be disclosed in the period of adoption. <PdfRef page={7} />
              </p>
            </div>
          </div>
        </section>

        {/* Section 13: Critical Rule - Para 23 */}
        <section id="as1-para23" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#2D5BE3] dark:bg-blue-500 rounded-full" />
            13. The Critical Rule — Para 23
          </h2>
          <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-350 dark:border-red-800 p-6 rounded-xl space-y-3">
            <p className="text-sm font-black text-red-700 dark:text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>⚠️</span> CRITICAL RULE — PARA 23 OF AS 1
            </p>
            <p className="text-[16px] sm:text-[18px] font-bold text-slate-900 dark:text-white leading-snug italic">
              &ldquo;Disclosure of accounting policies or of changes therein cannot remedy a wrong or inappropriate treatment of an item in the accounts.&rdquo; <PdfRef page={5} />
            </p>
            <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold leading-relaxed">
              If an item is accounted for incorrectly (violating accounting standards), merely disclosing this incorrect treatment in the notes does not make it acceptable. The auditor is still required to qualify the audit report and note the deviation.
            </p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-[#1E2640] border border-slate-200 dark:border-gray-700 rounded-xl text-[13px] text-slate-700 dark:text-gray-300 font-semibold leading-relaxed">
            <strong>Example:</strong> A company capitalises regular advertising expenses (₹50 Lakhs) as an asset and notes: <em>"The company capitalises advertising expenditures and amortises them over 3 years."</em> Since this violates AS 26, the note does not correct the treatment. The auditor must qualify the report. <PdfRef page={11} />
          </div>
        </section>

        {/* Section 14: Financial Statement Impact */}
        <section id="as1-financial-impact" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#2D5BE3] dark:bg-blue-500 rounded-full" />
            14. Financial Statement Impact of Policy Changes
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-gray-700">
            <table className="w-full text-[13px] text-left border-collapse">
              <thead>
                <tr className="bg-slate-150 dark:bg-[#1E2640] border-b border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-200">
                  <th className="p-3 font-bold w-1/3">Disclosure Requirement</th>
                  <th className="p-3 font-bold">Standard to Apply</th>
                  <th className="p-3 font-bold w-[120px]">Mandatory?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-gray-800 text-slate-700 dark:text-gray-300 font-medium">
                {[
                  { req: 'Nature & Reason of Change', std: 'State the old policy, new policy, and justification for the change (e.g., standard revised).', mand: 'Yes' },
                  { req: 'Quantified Current Period Impact', std: 'State the monetary effect on profit/loss and balance sheet items in the current period.', mand: 'Yes' },
                  { req: 'Non-Ascertainability Fact', std: 'If the monetary impact cannot be calculated, explicitly state that fact in the notes.', mand: 'Yes' },
                  { req: 'Expected Future Effect', std: 'Disclose the change in the period of adoption even if there is no material impact in the current period.', mand: 'Yes' }
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-slate-50/40 dark:bg-[#1E2640]/20'}>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{row.req}</td>
                    <td className="p-3 text-slate-650 dark:text-gray-400">{row.std}</td>
                    <td className="p-3">
                      <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-extrabold px-2 py-0.5 rounded">
                        {row.mand}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 15: Practical Application */}
        <section id="as1-practical" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#2D5BE3] dark:bg-blue-500 rounded-full" />
            15. Practical Application in Corporate Reporting
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            In corporate reporting, AS 1 is implemented by presenting <strong>Note 1 — Summary of Significant Accounting Policies</strong> at the beginning of the notes to financial statements. Common policies disclosed include: <PdfRef page={2} />
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px] font-semibold text-slate-700 dark:text-gray-300">
            {[
              'Basis of preparation of financial statements (historical cost model)',
              'Revenue recognition criteria for goods, services, interest, and dividends',
              'Valuation rules for raw materials, work-in-progress, and finished goods',
              'Depreciation rates and methods (Straight-Line or WDV)',
              'Treatment of foreign currency transactions and translation differences',
              'Employee retirement benefits valuation (gratuity, provident fund)',
              'Current and deferred taxation provisions',
              'Provisions, contingent liabilities, and contingent assets definitions'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 bg-slate-50 dark:bg-[#1E2640]/40 border border-slate-200 dark:border-gray-850 rounded-lg">
                <span className="w-5 h-5 bg-[#2D5BE3]/10 text-[#2D5BE3] dark:text-blue-400 rounded text-[11px] flex items-center justify-center shrink-0 font-extrabold">{i+1}</span>
                <span className="font-medium text-slate-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 16: AS 1 vs Ind AS 1 */}
        <section id="as1-comparison" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#2D5BE3] dark:bg-blue-500 rounded-full" />
            16. Comparison: AS 1 vs Ind AS 1
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-gray-700">
            <table className="w-full text-[13px] text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-[#1E2640] border-b border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-200">
                  <th className="p-3 font-bold w-1/4">Criterion</th>
                  <th className="p-3 font-bold text-blue-600 dark:text-blue-400">AS 1 (Indian GAAP)</th>
                  <th className="p-3 font-bold text-purple-600 dark:text-purple-400">Ind AS 1 (IFRS-converged)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-gray-800 text-slate-700 dark:text-gray-300 font-medium">
                {[
                  { crit: 'Primary Purpose', as: 'Focuses primarily on the disclosure of accounting policies.', ind: 'Complete framework for the presentation of financial statements, including classification, structures, and disclosures.' },
                  { crit: 'Fundamental Assumptions', as: 'Identifies 3 fundamental assumptions: Going Concern, Consistency, and Accrual.', ind: 'Recognizes only Going Concern in the standard; Accrual and Consistency are moved to the conceptual framework.' },
                  { crit: 'Statement of Changes in Equity', as: 'Not required under AS 1 (disclosed in schedule reserve notes).', ind: 'Mandatory component of a complete set of financial statements.' },
                  { crit: 'Other Comprehensive Income (OCI)', as: 'No concept of OCI exists under the AS framework.', ind: 'Mandatory division: Profit/Loss and Other Comprehensive Income.' },
                  { crit: 'Accounting Policy Changes', as: 'Quantifies current impact. Retrospective recalculation depends on the specific standard changed.', ind: 'Requires retrospective restatement of opening balances of the earliest comparative period (unless impracticable).' },
                  { crit: 'Prior Period Corrections', as: 'Adjusted in the current period P&L as prior period items.', ind: 'Requires retrospective restatement of comparative periods (opening balance correction).' }
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-slate-50/40 dark:bg-[#1E2640]/20'}>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{row.crit}</td>
                    <td className="p-3 text-slate-650 dark:text-gray-400">{row.as}</td>
                    <td className="p-3 text-slate-650 dark:text-gray-400">{row.ind}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 17: Journal Entry Guidance */}
        <section id="as1-journal" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#2D5BE3] dark:bg-blue-500 rounded-full" />
            17. Journal Entry Guidance for Policy Adjustments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border border-slate-200 dark:border-gray-800 rounded-xl bg-slate-50/40 dark:bg-slate-900/30 space-y-2">
              <h3 className="text-[14px] font-bold text-slate-900 dark:text-white">A. Depreciation Method Change (SLM → WDV)</h3>
              <p className="text-[12.5px] text-slate-600 dark:text-gray-400 font-semibold leading-relaxed">
                If the company changes its method from SLM to WDV retrospectively, charge the excess depreciation to the P&L:
              </p>
              <div className="bg-slate-950 p-4 rounded-lg font-mono text-[11px] text-slate-200 overflow-x-auto">
                <span className="text-emerald-400">Debit</span> Depreciation Adjustment A/c &nbsp;&nbsp;₹X<br />
                <span className="text-red-400">Credit</span> Accumulated Depreciation A/c &nbsp;&nbsp;₹X<br />
                <span className="text-slate-400">(Being the cumulative depreciation difference charged to P&L on change of policy)</span>
              </div>
            </div>
            <div className="p-5 border border-slate-200 dark:border-gray-800 rounded-xl bg-slate-50/40 dark:bg-slate-900/30 space-y-2">
              <h3 className="text-[14px] font-bold text-slate-900 dark:text-white">B. Provision for Inventory Write-down (Prudence)</h3>
              <p className="text-[12.5px] text-slate-600 dark:text-gray-400 font-semibold leading-relaxed">
                When inventory net realisable value drops below cost, create a provision to apply prudence:
              </p>
              <div className="bg-slate-950 p-4 rounded-lg font-mono text-[11px] text-slate-200 overflow-x-auto">
                <span className="text-emerald-400">Debit</span> Cost of Goods Sold / Loss A/c &nbsp;&nbsp;₹X<br />
                <span className="text-red-400">Credit</span> Provision for Inventory Write-down A/c &nbsp;&nbsp;₹X<br />
                <span className="text-slate-400">(Being the inventory written down to NRV in accordance with AS 2 and AS 1)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 18: Examination Focus */}
        <section id="as1-exam-focus" className="scroll-mt-28 space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#2D5BE3] dark:bg-blue-500 rounded-full" />
            18. Examination Focus &amp; Case Studies (CA Intermediate / Final)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                topic: 'Three Fundamental Assumptions',
                points: ['Name the assumptions: Going Concern, Consistency, Accrual.', 'No disclosure if followed; mandatory disclosure of fact and justification if breached.', 'Review audit notes for departures.'],
                color: 'blue'
              },
              {
                topic: 'Policy vs. Estimate Changes',
                points: ['Policy Change (AS 1) involves principles or application methods (e.g., inventory method change).', 'Estimate Change (AS 5) involves judgements (e.g., asset useful life).', 'Policy changes require retrospective adjustment.'],
                color: 'purple'
              },
              {
                topic: 'Para 23 Wrong Treatment Correction',
                points: ['Disclosure cannot cure an incorrect accounting entry.', 'If an item is recorded incorrectly, the auditor must qualify the report despite disclosure in notes.', 'Most tested theory question in AS 1 exams.'],
                color: 'red'
              },
              {
                topic: 'Quantification Rules',
                points: ['Quantify the financial impact in the current period.', 'If the amount is not ascertainable, disclose that fact explicitly.', 'Disclose changes with future effects in the period of adoption.']
              }
            ].map((item, i) => (
              <div key={i} className={`p-5 rounded-xl border ${
                item.color === 'blue' ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40' :
                item.color === 'purple' ? 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900/40' :
                item.color === 'red' ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/40' :
                'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40'
              }`}>
                <p className="text-xs font-extrabold uppercase tracking-wider mb-2.5 text-slate-800 dark:text-slate-200">{item.topic}</p>
                <ul className="space-y-1.5 text-[12.5px] text-slate-650 dark:text-gray-305 font-medium">
                  {item.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#2D5BE3] dark:text-blue-400 mt-0.5">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="space-y-6 pt-4">
            <h3 className="text-base font-bold text-slate-850 dark:text-slate-100">Detailed ICAI Compendium Case Studies</h3>

            {/* Case Study 1 */}
            <div className="p-5 border border-slate-200 dark:border-gray-800 rounded-xl bg-white dark:bg-[#111726] space-y-3">
              <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-400 font-extrabold px-2 py-0.5 rounded">CASE 1: INVENTORY METHOD SWITCH (Para 26)</span>
              <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold">
                <strong>Scenario:</strong> Prashant Ltd. values closing inventory using FIFO. On March 31, 2026, the value is ₹1,63,000. The company decides to switch to the Weighted Average Method to better reflect consumption patterns. Under WAC, the inventory value is ₹1,47,000. The net realisable value is ₹1,95,000. How should this be disclosed? <PdfRef page={9} />
              </p>
              <div className="text-[13px] text-slate-600 dark:text-gray-400 pl-4 border-l-2 border-slate-200 dark:border-gray-700 space-y-1">
                <p><strong>Accounting Treatment:</strong> Inventory must be valued at the lower of cost and NRV. WAC cost is ₹1,47,000 and NRV is ₹1,95,000, so inventory is valued at ₹1,47,000. The switch reduces current assets and profits by ₹16,000 (₹1,63,000 - ₹1,47,000).</p>
                <p><strong>Disclosure Note to draft:</strong> <em>"The company has changed its inventory valuation cost formula from FIFO to the Weighted Average Method during the year to better reflect inventory consumption. This change has reduced the year-end inventory valuation and profit for the year by ₹16,000."</em></p>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="p-5 border border-slate-200 dark:border-gray-800 rounded-xl bg-white dark:bg-[#111726] space-y-3">
              <span className="text-[10px] bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-400 font-extrabold px-2 py-0.5 rounded">CASE 2: DEPRECIATION METHOD SWITCH VS. USEFUL LIFE REVISION (AS 1 vs. AS 5)</span>
              <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold">
                <strong>Scenario:</strong> A company changes its depreciation method for machinery from SLM to WDV, increasing the current depreciation charge by ₹120 Lakhs. It also revises the estimated remaining useful life of its delivery trucks from 8 to 5 years. Management wants to classify both changes as "Accounting Policy Changes" in Note 1.
              </p>
              <div className="text-[13px] text-slate-600 dark:text-gray-400 pl-4 border-l-2 border-slate-200 dark:border-gray-700 space-y-1">
                <p><strong>Accounting Treatment:</strong> Changing the depreciation method is a change in accounting policy (AS 1) and requires retrospective recalculation. Revising the estimated useful life of trucks is a change in accounting estimate (AS 5) and is applied prospectively. These are distinct adjustments and must be disclosed separately.</p>
                <p><strong>Disclosure Note to draft:</strong> Disclose the depreciation method policy change showing the nature, reason, and ₹120 Lakhs impact in Note 1(a). Disclose the truck useful life estimate change prospectively in Note 1(b).</p>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="p-5 border border-slate-200 dark:border-gray-800 rounded-xl bg-white dark:bg-[#111726] space-y-3">
              <span className="text-[10px] bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-400 font-extrabold px-2 py-0.5 rounded">CASE 3: GOING CONCERN UNDER SEVERE FINANCIAL DISTRESS (Para 10(a))</span>
              <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold">
                <strong>Scenario:</strong> UrbanStores Ltd has suffered losses over three years, leading to a negative net worth of ₹350 Lakhs. Current liabilities exceed current assets by ₹800 Lakhs, and creditors have filed insolvency petitions. The board prepares financial statements on a Going Concern basis, noting debt restructuring talks. Is this correct?
              </p>
              <div className="text-[13px] text-slate-600 dark:text-gray-400 pl-4 border-l-2 border-slate-200 dark:border-gray-700 space-y-1">
                <p><strong>Accounting Treatment:</strong> If there is no realistic alternative but to liquidate or cease trading, the going concern assumption is invalid. Preparing accounts on a going concern basis is incorrect. The company must prepare statements on a liquidation basis (valuing assets at NRV and providing for expected liabilities).</p>
                <p><strong>Disclosure Note:</strong> The breach of the going concern assumption and the valuation on a liquidation basis must be explicitly disclosed.</p>
              </div>
            </div>

            {/* Case Study 4 */}
            <div className="p-5 border border-slate-200 dark:border-gray-800 rounded-xl bg-white dark:bg-[#111726] space-y-3">
              <span className="text-[10px] bg-orange-100 dark:bg-orange-950 text-orange-850 dark:text-orange-400 font-extrabold px-2 py-0.5 rounded">CASE 4: INCORRECT DISCLOSURE CURE ATTEMPT (Para 23)</span>
              <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold">
                <strong>Scenario:</strong> XYZ Ltd has capitalized research costs of ₹40 Lakhs as fixed assets, which violates AS 26. The company discloses this capitalization in Note 1: <em>"The company capitalises all research costs as fixed assets and amortises them over 5 years."</em> The director argues that the note makes the treatment acceptable under GAAP. Is this correct?
              </p>
              <div className="text-[13px] text-slate-600 dark:text-gray-400 pl-4 border-l-2 border-slate-200 dark:border-gray-700 space-y-1">
                <p><strong>Governing Principle:</strong> Per Para 23, disclosure of accounting policies or changes does not remedy incorrect treatment in the books. The capitalization of research costs remains incorrect, and the auditor must qualify the audit report despite the disclosure.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 19: Statutory Footnotes */}
        <section id="as1-footnotes" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#2D5BE3] dark:bg-blue-500 rounded-full" />
            19. Statutory Footnotes &amp; Compendium Context
          </h2>
          <div className="p-5 border border-dashed border-[#E2E1DD] dark:border-gray-800 rounded-xl bg-[#FAFAF8] dark:bg-[#1E2640]/30 space-y-4 text-xs text-slate-600 dark:text-gray-400 leading-relaxed font-semibold">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">Footnote 1: Materiality Scope Limit</p>
              <p className="mt-1 font-medium">
                Attention is drawn to paragraph 4.3 of the Preface to the Statements of Accounting Standards, which states that Accounting Standards are intended to apply only to items that are material. Immaterial items do not require explicit compliance or policy disclosure.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-200 dark:border-gray-800">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">Footnote 2: Foreign Currency Translation Disclosure</p>
              <p className="mt-1 font-medium">
                Under paragraph 4 of the Companies (Accounting Standards) Rules, 2021, accounting standards require the disclosure of translation policies in respect of foreign currency items.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-200 dark:border-gray-800">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">Footnote 3: Alternative reduction</p>
              <p className="mt-1 font-medium">
                Under the Companies (Accounting Standards) Rules, 2021, standard-setting and government bodies have reduced acceptable alternative policies, particularly for corporate enterprises. However, alternatives cannot be eliminated completely due to diverse business models.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


interface LearningPortalClientProps {
  initialStandards: Standard[]
  initialSelectedStandardDetails: Standard
  defaultFramework: 'AS' | 'Ind AS'
  initialSelectedStandardId?: string
}

export default function LearningPortalClient({
  initialStandards,
  initialSelectedStandardDetails,
  defaultFramework,
  initialSelectedStandardId
}: LearningPortalClientProps) {
  const [framework] = useState<'AS' | 'Ind AS'>(defaultFramework)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStandardId, setSelectedStandardId] = useState<string>(
    initialSelectedStandardId || (defaultFramework === 'AS' ? 'intro-as' : 'intro-ind-as')
  )
  const [activeTab, setActiveTab] = useState<'standard' | 'examples' | 'lecture' | 'pdf' | 'faqs'>('standard')
  const [lastActiveBaseTab, setLastActiveBaseTab] = useState<'standard' | 'examples' | 'faqs'>('standard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [selectedStandardDetails, setSelectedStandardDetails] = useState<Standard>(initialSelectedStandardDetails)
  const [loadedStandards, setLoadedStandards] = useState<Record<string, Standard>>({
    [initialSelectedStandardDetails.id]: initialSelectedStandardDetails
  })
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)

  useEffect(() => {
    if (activeTab === 'standard' || activeTab === 'examples' || activeTab === 'faqs') {
      setLastActiveBaseTab(activeTab)
    }
  }, [activeTab])

  useEffect(() => {
    async function loadDetails() {
      const activeId = selectedStandardId || initialStandards[0]?.id
      if (!activeId) return
      
      if (loadedStandards[activeId]) {
        setSelectedStandardDetails(loadedStandards[activeId])
        return
      }

      setIsLoadingDetails(true)
      try {
        const details = await getStandardDetailAction(activeId, defaultFramework)
        if (details) {
          setLoadedStandards(prev => ({ ...prev, [activeId]: details }))
          setSelectedStandardDetails(details)
        } else {
          const fallback = initialStandards.find(s => s.id === activeId)
          if (fallback) {
            setSelectedStandardDetails(fallback)
          }
        }
      } catch (err) {
        console.error('Failed to load standard details:', err)
      } finally {
        setIsLoadingDetails(false)
      }
    }
    loadDetails()
  }, [selectedStandardId, defaultFramework, initialStandards])

  const currentStandard = selectedStandardDetails || initialSelectedStandardDetails
  const uploadedPdf = currentStandard.resources?.find((r) => r.type === 'PDF' && r.url)
  const getLectureUrl = (url: string) => {
    if (!url || url.includes('mock_lecture')) {
      return 'https://www.youtube.com/watch?v=yYyP4RRO6t0'
    }
    return url
  }
  const lectureUrl = getLectureUrl(currentStandard.lectureUrl)
  const ytId = getYouTubeId(lectureUrl)
  const vimeoId = getVimeoId(lectureUrl)

  // PDF Viewer states
  const [pdfPage, setPdfPage] = useState<number>(1)
  const [annotationMode, setAnnotationMode] = useState<'none' | 'highlight' | 'write' | 'erase' | 'note'>('none')
  const [highlightColor, setHighlightColor] = useState<string>('yellow')
  const [pdfNotes, setPdfNotes] = useState<{ id: number; page: number; x: number; y: number; text: string }[]>([])
  const [pdfHighlights, setPdfHighlights] = useState<{ id: number; page: number; elementId: string; color: string }[]>([])
  const [zoomLevel, setZoomLevel] = useState<number>(100)
  const [searchInPdf, setSearchInPdf] = useState(false)
  const [pdfSearchQuery, setPdfSearchQuery] = useState('')
  const [isAnnotationPanelOpen, setIsAnnotationPanelOpen] = useState(false)
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(null)

  // Drawing states
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  // Video states
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoTime, setVideoTime] = useState(0)
  const [videoVolume, setVideoVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [showCC, setShowCC] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1)
  const [videoDuration, setVideoDuration] = useState(1125)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const videoContainerRef = useRef<HTMLDivElement | null>(null)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  // Print handler removed to restore old behavior

  const [showControls, setShowControls] = useState(true)
  const [videoQuality, setVideoQuality] = useState<string>('Auto')
  const controlsTimeoutRef = useRef<any>(null)


  const resetControlsTimeout = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 2500)
    }
  }

  const navigateToPdfPage = (page: number) => {
    setPdfPage(page)
    setActiveTab('pdf')
  }

  const renderTextWithReferences = (text: string) => {
    if (!text) return ''
    const regex = /\[(?:Source:\s*ICAI\s*AS\s*1\s*PDF\s*Page\s*|Page\s*|ICAI\s*Ref:\s*Page\s*4\.|PDF\s*|Official\s*|Ref\s*|Citation\s*:\s*|Official\s*Ref\s*:\s*Page\s*|MCA\s*Ref\s*:\s*Page\s*|ICAI\s*Ref\s*:\s*Page\s*)(\d+)(?:\s*[^\]]*)?\]/gi
    const parts = []
    let lastIndex = 0
    let match
    
    const formatInlineTags = (str: string) => {
      let html = str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
      html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
      html = html.replace(/_(.*?)_/g, '<em>$1</em>')
      html = html.replace(/\[u\](.*?)\[\/u\]/g, '<u>$1</u>')
      html = html.replace(/<u>(.*?)<\/u>/g, '<u>$1</u>')
      html = html.replace(/\[highlight\](.*?)\[\/highlight\]/g, '<mark class="bg-amber-100 dark:bg-amber-900/40 text-inherit px-1.5 py-0.5 rounded font-bold">$1</mark>')
      return html
    }

    while ((match = regex.exec(text)) !== null) {
      const matchIndex = match.index
      const pageNum = parseInt(match[1], 10)
      
      if (matchIndex > lastIndex) {
        const txt = text.substring(lastIndex, matchIndex)
        parts.push(
          <span key={`txt-${matchIndex}`} dangerouslySetInnerHTML={{ __html: formatInlineTags(txt) }} />
        )
      }
      
      parts.push(
        <button
          key={matchIndex}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            navigateToPdfPage(pageNum)
          }}
          className="inline-flex items-center gap-1.5 px-2 py-0.5 mx-1 bg-red-50 hover:bg-red-100 dark:bg-red-950/45 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded text-[11px] font-extrabold transition-all cursor-pointer select-none align-middle"
          title={`Click to jump to PDF Page ${pageNum}`}
        >
          <FileText size={10} className="shrink-0 text-red-500 dark:text-red-400" />
          Page {pageNum}
        </button>
      )
      
      lastIndex = regex.lastIndex
    }
    
    if (lastIndex < text.length) {
      const txt = text.substring(lastIndex)
      parts.push(
        <span key={`txt-end`} dangerouslySetInnerHTML={{ __html: formatInlineTags(txt) }} />
      )
    }
    
    return parts.length > 0 ? parts : text
  }

  useEffect(() => {
    resetControlsTimeout()
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
    }
  }, [isPlaying])

  const handleMouseMovePlayer = () => {
    resetControlsTimeout()
  }

  const handleMouseLeavePlayer = () => {
    if (isPlaying) {
      setShowControls(false)
    }
  }

  const handleFullscreenToggle = () => {
    const container = videoContainerRef.current
    if (!container) return
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.error('Failed to enter fullscreen:', err)
      })
    } else {
      document.exitFullscreen()
    }
  }


  // Handle sidebar wrapping and alignment cleanly
  const getSidebarItemDisplay = (std: Standard) => {
    if (std.id.includes('intro')) {
      return (
        <span className="text-[13px] font-bold leading-normal text-left block text-[#1C1C1E] dark:text-white truncate whitespace-nowrap">
          {std.title}
        </span>
      )
    }
    
    const code = std.code
    let title = SIDEBAR_DISPLAY_NAMES[std.id] || std.shortTitle || std.title
    if (title.startsWith(code)) {
      title = title.substring(code.length).replace(/^\s*[\u2013-—–\s-]+\s*/, '')
    }

    const codeWidth = framework === 'AS' ? 'w-[44px]' : 'w-[72px]'

    return (
      <div className="flex items-center gap-3 text-[13px] leading-normal w-full overflow-hidden whitespace-nowrap">
        <span className={`shrink-0 font-extrabold ${codeWidth} text-slate-800 dark:text-slate-200 uppercase tracking-tight text-left`}>
          {code}
        </span>
        <span className="text-left font-semibold leading-normal flex-1 text-[#33333A] dark:text-gray-200 truncate whitespace-nowrap">
          {title}
        </span>
      </div>
    )
  }

  // Sync state changes with native HTML5 video player
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isPlaying) {
      video.play().catch(() => setIsPlaying(false))
    } else {
      video.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.volume = videoVolume / 100
    video.muted = isMuted
  }, [videoVolume, isMuted])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.playbackRate = playbackSpeed
  }, [playbackSpeed])

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setVideoTime(Math.floor(videoRef.current.currentTime))
    }
  }

  const handleDurationChange = () => {
    if (videoRef.current) {
      setVideoDuration(Math.floor(videoRef.current.duration) || 1125)
    }
  }

  const handleVideoEnded = () => {
    setIsPlaying(false)
    setVideoTime(0)
  }

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value)
    setVideoTime(time)
    if (videoRef.current) {
      videoRef.current.currentTime = time
    }
  }

  const handlePlayPauseToggle = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSkipBackward = () => {
    if (videoRef.current) {
      const newTime = Math.max(0, videoRef.current.currentTime - 10)
      videoRef.current.currentTime = newTime
      setVideoTime(Math.floor(newTime))
    }
  }

  const handleSkipForward = () => {
    if (videoRef.current) {
      const newTime = Math.min(videoDuration, videoRef.current.currentTime + 10)
      videoRef.current.currentTime = newTime
      setVideoTime(Math.floor(newTime))
    }
  }

  const handleBackClick = (e: React.MouseEvent) => {
    if (activeTab === 'lecture' || activeTab === 'pdf') {
      e.preventDefault()
      setActiveTab(lastActiveBaseTab)
    }
  }

  const getVideoSrc = (url: string) => {
    if (url && (url.startsWith('/') || url.startsWith('http') && !url.includes('youtube.com') && !url.includes('youtu.be') && !url.includes('vimeo.com'))) {
      return url
    }
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  }

  // Filter list by search query and exclude outdated standards
  const excludedIds = ['as-6', 'as-30', 'as-31', 'as-32', 'ind-as-104']
  const filteredStandards = initialStandards
    .filter((s) => !excludedIds.includes(s.id))
    .filter((s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const formatVideoTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0')
    const s = (secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  // Draw simple mark on Canvas for PDF Write tool
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (annotationMode !== 'write') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    setIsDrawing(true)
    const rect = canvas.getBoundingClientRect()
    ctx.beginPath()
    ctx.strokeStyle = '#EF4444' // Red pencil
    ctx.lineWidth = 2
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || annotationMode !== 'write') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  // Handle PDF highlight simulation click
  const handleHighlightWord = (elementId: string) => {
    if (annotationMode !== 'highlight') return
    const exists = pdfHighlights.find((h) => h.elementId === elementId && h.page === pdfPage)
    if (exists) {
      setPdfHighlights((prev) => prev.filter((h) => h.elementId !== elementId || h.page !== pdfPage))
    } else {
      setPdfHighlights((prev) => [
        ...prev,
        { id: Date.now(), page: pdfPage, elementId, color: highlightColor }
      ])
    }
  }

  // Clear all annotations
  const clearAnnotations = () => {
    setPdfHighlights([])
    setPdfNotes([])
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  const handleAddNoteClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (annotationMode !== 'note') return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const text = prompt('Enter annotation note text:')
    if (text) {
      setPdfNotes((prev) => [
        ...prev,
        { id: Date.now(), page: pdfPage, x, y, text }
      ])
    }
    setAnnotationMode('none')
  }

  return (
    <div className="w-full bg-[#FAFAF8] dark:bg-[#0B0F19] flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden relative">
      {/* Mobile Sidebar Backdrop Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/45 backdrop-blur-xs z-35 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ─── Sidebar ────────────────────────────────────────────────────────── */}
      <aside className={`
        ${isSidebarOpen ? 'fixed inset-y-0 left-0 top-16 z-40 w-[320px] shadow-2xl flex border-r' : 'hidden'}
        lg:flex lg:static lg:w-[320px] lg:shadow-none lg:z-auto lg:h-full
        bg-white dark:bg-[#111726] border-[#E2E1DD] dark:border-gray-800 flex flex-col shrink-0 lg:sticky lg:top-16 overflow-hidden
      `}>
        
        {/* Sidebar Header */}
        <div className="px-3.5 py-4 border-b border-[#E2E1DD] dark:border-gray-800 flex flex-col gap-3">
          <div className="flex items-center gap-2.5 pl-0.5 w-full overflow-visible">
            <BookOpen size={21} className="text-[#2D5BE3] dark:text-blue-400 shrink-0" />
            <span className="font-sans font-extrabold text-[16px] text-[#1C1C1E] dark:text-white uppercase tracking-widest whitespace-nowrap overflow-visible leading-tight">
              {framework === 'AS' ? 'Accounting Standards' : 'Indian Acc. Standards'}
            </span>
          </div>

          {/* Search box */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#76767E] dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search standards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAFAF8] focus:bg-white dark:bg-[#0B0F19] dark:focus:bg-[#111726] border border-[#C5C3BC] dark:border-gray-750 focus:border-[#2D5BE3] rounded-lg pl-9 pr-3 py-2 text-[12.5px] font-semibold outline-none transition-all focus:ring-2 focus:ring-[#2D5BE3]/15 shadow-2xs text-[#1C1C1E] dark:text-white"
            />
          </div>
        </div>

        {/* Standards List */}
        <div className="flex-1 p-3 space-y-1.5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {filteredStandards.map((std) => {
            const isSelected = selectedStandardId === std.id
            if (std.id.includes('intro')) {
              // Special display for introduction
              const displayLabel = framework === 'AS' ? 'AS Introduction & Applicability' : 'Ind AS Intro & Applicability'
              return (
                <div key={std.id} className="flex flex-col mb-1.5 animate-fade-in">
                  {isSelected ? (
                    <div className="bg-[#EEF2FD] dark:bg-[#1A2542] border border-[#DCE6FF] dark:border-[#23355E] rounded-xl p-2.5">
                      <button
                        onClick={() => {
                          setSelectedStandardId(std.id)
                          setActiveTab('standard')
                          setIsSidebarOpen(false)
                        }}
                        title={std.title}
                        className="w-full text-left text-[13.5px] font-bold text-[#2D5BE3] dark:text-blue-400 flex items-center justify-between"
                      >
                        <span className="truncate pr-2">{displayLabel}</span>
                        <ChevronDown size={14} className="shrink-0 text-[#2D5BE3] dark:text-blue-400" />
                      </button>
                      
                      {/* Sub-menu inside the container */}
                      <div className="mt-2 space-y-1">
                        <button
                          onClick={() => {
                            setActiveTab('standard')
                            setIsSidebarOpen(false)
                          }}
                          className={`w-full text-left py-1.5 px-2.5 rounded-lg text-[13px] font-bold flex items-center gap-2 transition-all ${
                            activeTab === 'standard'
                              ? 'bg-white dark:bg-gray-800 text-[#2D5BE3] dark:text-blue-400 shadow-3xs font-extrabold'
                              : 'text-gray-600 dark:text-gray-400 hover:text-[#2D5BE3] dark:hover:text-blue-400'
                          }`}
                        >
                          <FileText size={14} className="shrink-0" />
                          Standard
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab('examples')
                            setIsSidebarOpen(false)
                          }}
                          className={`w-full text-left py-1.5 px-2.5 rounded-lg text-[13px] font-bold flex items-center gap-2 transition-all ${
                            activeTab === 'examples'
                              ? 'bg-white dark:bg-gray-800 text-[#2D5BE3] dark:text-blue-400 shadow-3xs font-extrabold'
                              : 'text-gray-600 dark:text-gray-400 hover:text-[#2D5BE3] dark:hover:text-blue-400'
                          }`}
                        >
                          <Scale size={14} className="shrink-0" />
                          Examples &amp; Case Law
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedStandardId(std.id)
                        setActiveTab('standard')
                        setIsSidebarOpen(false)
                      }}
                      title={std.title}
                      className="w-full text-left py-2 px-3 rounded-lg flex items-center justify-between text-[#4A4A52] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1E2640] transition-all border border-transparent"
                    >
                      <span className="text-[13.5px] font-bold text-left truncate pr-2">
                        {displayLabel}
                      </span>
                      <ChevronRight size={14} className="shrink-0 text-[#A0A0A8]" />
                    </button>
                  )}
                </div>
              )
            }

            // Normal standard items
            return (
              <div key={std.id} className="flex flex-col border-b border-gray-100 dark:border-gray-800/30 last:border-b-0 py-1 animate-fade-in">
                <button
                  onClick={() => {
                    setSelectedStandardId(std.id)
                    setActiveTab('standard')
                    setIsSidebarOpen(false)
                  }}
                  title={std.title}
                  className={`w-full text-left h-[32px] min-h-[32px] px-3 rounded-lg flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-[#EEF2FD] dark:bg-[#1A2542] text-[#2D5BE3] dark:text-[#60A5FA] font-bold shadow-3xs'
                      : 'hover:bg-gray-50 dark:hover:bg-[#1E2640] text-[#4A4A52] dark:text-gray-300'
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-2 overflow-hidden whitespace-nowrap">
                    {getSidebarItemDisplay(std)}
                  </div>
                  <ChevronRight
                    size={14}
                    className={`shrink-0 transition-transform ${isSelected ? 'rotate-90 text-[#2D5BE3] dark:text-[#60A5FA]' : 'text-[#A0A0A8]'}`}
                  />
                </button>

                {/* Sub-menu options for selected standard */}
                {isSelected && (
                  <div className="ml-4 pl-3.5 border-l-2 border-[#D5E1FB] dark:border-[#263765] mt-1 mb-1.5 space-y-1">
                    <button
                      onClick={() => {
                        setActiveTab('standard')
                        setIsSidebarOpen(false)
                      }}
                      className={`w-full text-left py-1.5 px-3 rounded-lg text-[13px] font-bold flex items-center gap-2 transition-all ${
                        activeTab === 'standard'
                          ? 'bg-[#EEF2FD] text-[#2D5BE3] dark:bg-[#1A2542] dark:text-[#60A5FA] font-extrabold'
                          : 'text-[#76767E] hover:text-[#1C1C1E] dark:hover:text-white'
                      }`}
                    >
                      <FileText size={13} className="shrink-0" />
                      Standard
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('examples')
                        setIsSidebarOpen(false)
                      }}
                      className={`w-full text-left py-1.5 px-3 rounded-lg text-[13px] font-bold flex items-center gap-2 transition-all ${
                        activeTab === 'examples'
                          ? 'bg-[#EEF2FD] text-[#2D5BE3] dark:bg-[#1A2542] dark:text-[#60A5FA] font-extrabold'
                          : 'text-[#76767E] hover:text-[#1C1C1E] dark:hover:text-white'
                      }`}
                    >
                      <Scale size={13} className="shrink-0" />
                      Examples &amp; Case Law
                    </button>
                  </div>
                )}
              </div>
            )
          })}
          {filteredStandards.length === 0 && (
            <div className="text-center py-8 text-xs text-[#76767E]">
              No accounting standards found.
            </div>
          )}
        </div>
      </aside>

      {/* ─── Main Content Wrapper ────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col bg-[#FAFAF8] dark:bg-[#0B0F19] overflow-y-auto h-full">
        
        {/* Top Control Bar */}
        <div className="bg-white dark:bg-[#111726] border-b border-[#E2E1DD] dark:border-gray-800 p-2.5 sm:p-3 flex flex-row flex-nowrap items-center justify-between gap-3 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <>
              <Link
                href="/accounts"
                onClick={handleBackClick}
                className="flex items-center gap-1.5 px-3 py-2 bg-[#FAFAF8] dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 rounded-md text-[12.5px] font-bold text-[#1C1C1E] dark:text-white hover:bg-[#F4F3F0] transition-colors shrink-0"
              >
                <ArrowLeft size={15} />
                Back
              </Link>

              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-[#FAFAF8] dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 rounded-md text-[12.5px] font-bold text-[#1C1C1E] dark:text-white hover:bg-[#F4F3F0] transition-colors shrink-0"
                aria-label="Toggle standards menu"
              >
                <BookOpen size={15} />
                Menu
              </button>
            </>
            
            {/* Prominent Standard Title */}
            <h1 className="text-[16px] sm:text-[22px] md:text-[24px] font-semibold text-[#1C1C1E] dark:text-white tracking-tight border-l-2 border-[#2D5BE3] dark:border-blue-500 pl-2.5 sm:pl-3 truncate select-none leading-tight flex-1 min-w-0">
              {currentStandard.id.includes('intro') ? 'Introduction to Accounting Standards and Their Applicability' : currentStandard.title}
            </h1>
          </div>

          {/* View Tab Buttons on Top Right */}
          <div className="flex items-center gap-1.5 shrink-0 select-none">
            {activeTab === 'lecture' && (
              <div className="flex items-center gap-1.5 flex-nowrap">
                {lectureUrl && (
                  <a
                    href={lectureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-2 bg-[#EEF2FD] hover:bg-[#DCE6FF] dark:bg-[#1A2542] dark:hover:bg-[#23355E] border border-[#DCE6FF] dark:border-[#23355E] rounded-md text-[12.5px] font-bold text-[#2D5BE3] dark:text-blue-400 transition-colors shrink-0"
                  >
                    Open Lecture Source
                    <ExternalLink size={14} className="shrink-0" />
                  </a>
                )}
                <button
                  onClick={() => {
                    if (lectureUrl) {
                      window.open(lectureUrl, '_blank');
                    } else {
                      alert('Lecture video download is simulated.');
                    }
                  }}
                  className="flex items-center gap-1 px-3 py-2 rounded-md text-[12.5px] font-bold text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-colors shadow-xs shrink-0"
                >
                  <Download size={14} className="shrink-0" />
                  Download Lecture
                </button>
              </div>
            )}

            {activeTab === 'pdf' && (
              <div className="flex items-center gap-1.5 flex-nowrap">
                <a
                  href={`/api/pdfs/${currentStandard.id}`}
                  download
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-md text-[12.5px] font-extrabold bg-[#FFF0F0] text-[#E15252] hover:bg-[#FFE2E2] dark:bg-[#2C1D1D] dark:text-red-400 shrink-0 transition-all shadow-xs cursor-pointer"
                  title="Download PDF"
                >
                  <Download size={14} className="shrink-0" />
                  Download PDF
                </a>
              </div>
            )}

            {(activeTab === 'standard' || activeTab === 'examples' || activeTab === 'faqs') && (
              <>
                {lectureUrl && (
                  <button
                    onClick={() => setActiveTab('lecture')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-md text-[12.5px] font-semibold bg-[#EEF2FD] text-[#2D5BE3] hover:bg-[#DCE6FF] dark:bg-[#1A2542] dark:text-blue-400 shrink-0 transition-all shadow-xs"
                    title="Watch video lectures"
                  >
                    <Video size={14} className="shrink-0 text-[#2D5BE3] dark:text-blue-400" />
                    Lecture
                  </button>
                )}
                {uploadedPdf && (
                  <button
                    onClick={() => setActiveTab('pdf')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-md text-[12.5px] font-semibold bg-[#FFF0F0] text-[#E15252] hover:bg-[#FFE2E2] dark:bg-[#2C1D1D] dark:text-red-400 shrink-0 transition-all shadow-xs"
                    title="View PDF"
                  >
                    <FileText size={14} className="shrink-0 text-[#E15252] dark:text-red-400" />
                    PDF View
                  </button>
                )}
              </>
            )}

          </div>
        </div>

        {/* ─── Tab Content Views ──────────────────────────────────────────────── */}
        <div className={`flex-1 w-full max-w-none flex flex-col ${activeTab === 'pdf' || activeTab === 'lecture' ? 'p-2 sm:p-4 pt-1 sm:pt-2' : 'p-4 md:p-6'}`}>

          {isLoadingDetails ? (
            <div className="w-full space-y-8 animate-pulse p-4 flex-1 flex flex-col justify-start">
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-1/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-11/12"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-5/6"></div>
              </div>
              <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl w-full mt-6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-2/3 mt-6"></div>
              <div className="space-y-3 mt-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-5/6"></div>
              </div>
            </div>
          ) : (
            <>
              {/* 1. STANDARD VIEW */}
              {activeTab === 'standard' && (
                <div className="w-full space-y-8 animate-fade-in font-sans">
                  {/* Temporary Test Banner */}
                  <div className="w-full bg-red-600 text-white font-bold text-center py-3 rounded-lg shadow-md tracking-wider text-sm">
                    AS1 TEST BUILD 2026
                  </div>
                  {currentStandard.blocks && Array.isArray(currentStandard.blocks) && currentStandard.blocks.length > 0 && currentStandard.id !== 'as-1' ? (
                    <div className={`bg-white dark:bg-[#111726] border dark:border-gray-800 rounded-2xl shadow-xs ${
                      framework === 'AS' ? 'border-[#C5C3BC] p-8 sm:p-12 space-y-12' : 'border-[#E2E1DD] p-6 sm:p-10 space-y-10'
                    }`}>
                      {currentStandard.blocks.map((block: any, blockIdx: number) => {
                        if (block.hidden) return null;
                        switch (block.type) {
                          case 'HEADING':
                            return (
                              <h2 key={blockIdx} className={`font-extrabold text-[#1C1C1E] dark:text-white uppercase tracking-wide border-b border-gray-250 dark:border-gray-800 pb-3.5 ${
                                framework === 'AS' ? 'text-2xl sm:text-3xl mb-8 mt-12 first:mt-0' : 'text-xl sm:text-2xl mb-6 mt-10 first:mt-0'
                              }`}>
                                {renderTextWithReferences(block.content)}
                              </h2>
                            )
                          case 'SUB_HEADING':
                            return (
                              <h3 key={blockIdx} className={`font-extrabold text-[#1C1C1E] dark:text-white mb-4 ${
                                framework === 'AS' ? 'text-[19px] sm:text-[21px] mt-9' : 'text-[17px] sm:text-[19px] mt-7'
                              }`}>
                                {renderTextWithReferences(block.content)}
                              </h3>
                            )
                          case 'PARAGRAPH':
                            return (
                              <div key={blockIdx} className={`text-slate-755 dark:text-gray-200 leading-relaxed ${
                                framework === 'AS' ? 'text-[17.5px] sm:text-[18.5px] mb-7 font-reading font-normal' : 'text-[15.5px] sm:text-[16.5px] mb-5 font-medium'
                              }`}>
                                {renderTextWithReferences(block.content)}
                              </div>
                            )
                          case 'NOTE':
                            return (
                              <div key={blockIdx} className={`p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-gray-800 bg-[#FAFAF8]/60 dark:bg-[#1E2640]/55 shadow-xs ${
                                framework === 'AS' ? 'mb-8 border-[#C5C3BC]/50' : 'mb-6'
                              }`}>
                                {block.title && <h3 className={`font-extrabold text-[#1C1C1E] dark:text-white ${framework === 'AS' ? 'text-[17.5px] mb-3' : 'text-[15.5px] mb-2.5'}`}>{block.title}</h3>}
                                <div className={`text-slate-700 dark:text-gray-300 leading-relaxed font-medium ${framework === 'AS' ? 'text-[16px] sm:text-[17px]' : 'text-[14.5px] sm:text-[15.5px]'}`}>{renderTextWithReferences(block.body)}</div>
                              </div>
                            )
                          case 'EXAM_TRAP':
                            return (
                              <div key={blockIdx} className="p-5 sm:p-6 rounded-xl bg-[#FDEEEE] dark:bg-[#2C1D1D] border border-[#F5C6C0] dark:border-red-900/50 mb-4">
                                <p className="text-xs font-bold text-[#C0392B] dark:text-red-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                  <span>⚠️</span> EXAM TRAP
                                </p>
                                {block.title && <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1.5">{block.title}</h3>}
                                <div className="text-xs text-[#4A4A52] dark:text-gray-300 leading-relaxed font-semibold">{renderTextWithReferences(block.body)}</div>
                              </div>
                            )
                          case 'PRACTICAL_USE':
                            return (
                              <div key={blockIdx} className="p-5 sm:p-6 rounded-xl bg-[#E8F7EE] dark:bg-[#1A2C22] border border-[#C5E9D4] dark:border-green-900/50 mb-4">
                                <p className="text-xs font-bold text-[#1A7A4A] dark:text-emerald-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                  <span>💡</span> PRACTICAL USE / REAL WORLD
                                </p>
                                {block.title && <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1.5">{block.title}</h3>}
                                <div className="text-xs text-[#4A4A52] dark:text-gray-300 leading-relaxed font-semibold">{renderTextWithReferences(block.body)}</div>
                              </div>
                            )
                          case 'CASE_LAW':
                            return (
                              <div key={blockIdx} className="p-5 sm:p-6 rounded-xl bg-[#EEF2FD] dark:bg-[#1A2542] border border-[#DCE6FF] dark:border-blue-900/50 mb-4">
                                <p className="text-xs font-bold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                  <span>⚖️</span> CASE LAW
                                </p>
                                <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1">{block.title}</h3>
                                {block.citation && <p className="text-[10px] text-slate-500 mb-2 font-semibold">Citation: {block.citation}</p>}
                                <div className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">{renderTextWithReferences(block.body)}</div>
                              </div>
                            )
                          case 'EXAMPLE':
                          case 'ILLUSTRATION':
                            return (
                              <div key={blockIdx} className={`border dark:border-gray-800 rounded-2xl bg-[#FAFAF8]/55 dark:bg-[#1E2640]/30 shadow-xs space-y-4 ${
                                framework === 'AS' ? 'p-8 mb-8 border-[#C5C3BC]' : 'p-5 mb-4 border-[#E2E1DD]'
                              }`}>
                                <h3 className={`font-bold text-[#2D5BE3] dark:text-[#60A5FA] ${framework === 'AS' ? 'text-[17.5px] mb-3' : 'text-xs mb-2'}`}>📋 Example: {block.title}</h3>
                                <div className={`text-slate-700 dark:text-gray-300 leading-relaxed ${framework === 'AS' ? 'text-[15.5px] sm:text-[16.5px]' : 'text-xs'}`}>
                                  <strong>Scenario: </strong>{renderTextWithReferences(block.scenario)}
                                </div>
                                {block.working && (
                                  <div className={`text-slate-650 dark:text-gray-400 leading-relaxed ${framework === 'AS' ? 'text-[15.5px] sm:text-[16.5px]' : 'text-xs'}`}>
                                    <strong>Working: </strong>{renderTextWithReferences(block.working)}
                                  </div>
                                )}
                                {block.answer && (
                                  <div className={`leading-relaxed font-medium bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 ${
                                    framework === 'AS' ? 'text-[16px] sm:text-[17px]' : 'text-xs'
                                  }`}>
                                    <strong>Solution / Treatment: </strong>{renderTextWithReferences(block.answer)}
                                  </div>
                                )}
                              </div>
                            )
                          case 'TABLE':
                            return (
                              <div key={blockIdx} className="border border-[#E2E1DD] dark:border-gray-800 rounded-xl overflow-hidden mb-4">
                                <table className="w-full text-left text-xs border-collapse">
                                  <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800 text-slate-650 dark:text-gray-400 border-b border-[#E2E1DD] dark:border-gray-800">
                                      {(block.headers || []).map((header: string, hIdx: number) => (
                                        <th key={hIdx} className="p-3 font-bold">{header}</th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-[#E2E1DD] dark:divide-gray-800">
                                    {(block.rows || []).map((row: string[], rIdx: number) => (
                                      <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/40">
                                        {row.map((cell: string, cIdx: number) => (
                                          <td key={cIdx} className="p-3 text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                                            {renderTextWithReferences(cell)}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )
                          case 'FAQ':
                            if (framework === 'AS') return null;
                            return (
                              <div key={blockIdx} className="p-5 border border-[#E2E1DD] dark:border-gray-800 rounded-xl bg-[#FAFAF8] dark:bg-[#1E2640]/50 mb-4">
                                <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-2">❓ Question: {block.question}</h3>
                                <div className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                                  <strong>Answer: </strong> {renderTextWithReferences(block.answer)}
                                </div>
                              </div>
                            )
                          case 'PDF_REFERENCE':
                            return (
                              <div key={blockIdx} className="p-4 rounded-xl border border-[#E2E1DD] dark:border-gray-800 bg-[#FAFAF8] dark:bg-[#1E2640] mb-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <FileText size={16} className="text-red-500" />
                                  <span className="text-xs font-bold text-slate-900 dark:text-white">{block.title}</span>
                                </div>
                                <button
                                  onClick={() => setActiveTab('pdf')}
                                  className="text-xs font-bold text-[#2D5BE3] hover:underline animate-pulse"
                                >
                                  View PDF
                                </button>
                              </div>
                            )
                          case 'VIDEO':
                            return (
                              <div key={blockIdx} className="p-4 rounded-xl border border-[#E2E1DD] dark:border-gray-800 bg-[#FAFAF8] dark:bg-[#1E2640] mb-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <Video size={16} className="text-blue-500" />
                                  <span className="text-xs font-bold text-slate-900 dark:text-white">{block.title}</span>
                                </div>
                                <button
                                  onClick={() => setActiveTab('lecture')}
                                  className="text-xs font-bold text-[#2D5BE3] hover:underline"
                                >
                                  Watch Video
                                </button>
                              </div>
                            )
                          case 'DOWNLOAD_SECTION':
                            return (
                              <div key={blockIdx} className="p-4 rounded-xl border border-[#E2E1DD] dark:border-gray-800 bg-red-50 dark:bg-red-950/20 mb-4 flex items-center justify-between border-dashed">
                                <div className="flex items-center gap-3">
                                  <Download size={16} className="text-red-550" />
                                  <span className="text-xs font-bold text-red-700 dark:text-red-400">{block.title}</span>
                                </div>
                                <button
                                  onClick={() => window.print()}
                                  className="text-xs font-bold text-red-700 dark:text-red-400 hover:underline"
                                >
                                  Download content PDF
                                </button>
                              </div>
                            )
                          case 'IMAGE':
                            return (
                              <div key={blockIdx} className="my-6 flex flex-col items-center justify-center gap-2">
                                {block.url && (
                                  <img
                                    src={block.url}
                                    alt={block.caption || 'Image block'}
                                    className="max-w-full rounded-xl border border-[#E2E1DD] dark:border-gray-800 shadow-xs max-h-[450px] object-contain"
                                  />
                                )}
                                {block.caption && (
                                  <p className="text-[11px] text-slate-500 italic text-center font-medium">
                                    {block.caption}
                                  </p>
                                )}
                              </div>
                            )
                          default:
                            return null;
                        }
                      })}
                    </div>
                  ) : currentStandard.id === 'as-1' ? (
                    <AS1StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                      renderTextWithReferences={renderTextWithReferences}
                    />
                  ) : (
                    <div className="bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-2xl p-6 sm:p-10 space-y-10 shadow-xs">
                  
                    {/* Objective */}
                    <div>
                      <h2 className="text-sm font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wider mb-4">
                        1. Objective
                      </h2>
                      <div className="text-xs text-[#4A4A52] dark:text-gray-300 leading-relaxed font-semibold">
                        {currentStandard.content.objective ? renderTextWithReferences(currentStandard.content.objective) : 'Objective clauses are currently being prepared for this standard.'}
                      </div>
                    </div>

                    {/* Scope */}
                    <div>
                      <h2 className="text-sm font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wider mb-4">
                        2. Scope
                      </h2>
                      <div className="text-xs text-[#4A4A52] dark:text-gray-300 leading-relaxed mb-5 font-semibold">
                        {currentStandard.content.scope.statement ? renderTextWithReferences(currentStandard.content.scope.statement) : 'Scope rules are currently being prepared for this standard.'}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-5 sm:p-6 rounded-xl bg-[#E8F7EE] dark:bg-[#1A2C22] border border-[#C5E9D4] dark:border-green-900/50">
                          <p className="text-xs font-bold text-[#1A7A4A] dark:text-emerald-400 uppercase tracking-widest mb-2.5">
                            Applies To
                          </p>
                          <ul className="space-y-3">
                            {currentStandard.content.scope.included.map((item, idx) => (
                              <li key={idx} className="text-xs text-[#4A4A52] dark:text-gray-300 flex items-start gap-2 leading-relaxed font-semibold">
                                <span className="text-[#1A7A4A] dark:text-emerald-400">✓</span>
                                {renderTextWithReferences(item)}
                              </li>
                            ))}
                            {currentStandard.content.scope.included.length === 0 && (
                              <li className="text-xs text-gray-500 italic">No specific inclusions defined.</li>
                            )}
                          </ul>
                        </div>

                        <div className="p-5 sm:p-6 rounded-xl bg-[#FDEEEE] dark:bg-[#2C1D1D] border border-[#F5C6C0] dark:border-red-900/50">
                          <p className="text-xs font-bold text-[#C0392B] dark:text-red-400 uppercase tracking-widest mb-2.5">
                            Exempted / Excluded
                          </p>
                          <ul className="space-y-3">
                            {currentStandard.content.scope.excluded.map((item, idx) => (
                              <li key={idx} className="text-xs text-[#4A4A52] dark:text-gray-300 flex items-start gap-2 leading-relaxed font-semibold">
                                <span className="text-[#C0392B] dark:text-red-400">✗</span>
                                {renderTextWithReferences(item)}
                              </li>
                            ))}
                            {currentStandard.content.scope.excluded.length === 0 && (
                              <li className="text-xs text-gray-500 italic">No specific exclusions defined.</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Key Principles */}
                    {currentStandard.content.keyPrinciples && currentStandard.content.keyPrinciples.length > 0 && (
                      <div>
                        <h2 className="text-sm font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wider mb-5">
                          3. Key Principles &amp; Guidance
                        </h2>
                        <div className="space-y-5">
                          {currentStandard.content.keyPrinciples.map((item, idx) => (
                            <div key={idx} className="p-5 sm:p-6 rounded-xl border border-[#E2E1DD] dark:border-gray-800 bg-[#FAFAF8] dark:bg-[#1E2640]">
                              <h3 className="text-xs font-bold text-[#1C1C1E] dark:text-white mb-1.5">{item.title}</h3>
                              <div className="text-xs text-[#76767E] dark:text-gray-400 leading-relaxed font-semibold">{renderTextWithReferences(item.body)}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Definitions */}
                    {currentStandard.definitions && currentStandard.definitions.length > 0 && (
                      <div className="mt-8 pt-8 border-t border-[#E2E1DD] dark:border-gray-800">
                        <h2 className="text-sm font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wider mb-5">
                          Definitions
                        </h2>
                        <div className="space-y-4">
                          {currentStandard.definitions.map((def, idx) => (
                            <div key={idx} className="p-5 border border-[#E2E1DD] dark:border-gray-800 rounded-xl bg-[#FAFAF8] dark:bg-[#1E2640]/50">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xs font-bold text-slate-900 dark:text-white">{def.term}</h3>
                                {def.paraRef && <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-gray-400 px-2 py-0.5 rounded font-bold">Ref: {def.paraRef}</span>}
                              </div>
                              <div className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed italic mb-2">
                                {renderTextWithReferences(def.officialText)}
                              </div>
                              {def.plainExplanation && (
                                <div className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed font-semibold">
                                  <strong>Explanation: </strong> {renderTextWithReferences(def.plainExplanation)}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Disclosure Checklist */}
                    {currentStandard.disclosureGroups && currentStandard.disclosureGroups.length > 0 && (
                      <div className="mt-8 pt-8 border-t border-[#E2E1DD] dark:border-gray-800">
                        <h2 className="text-sm font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wider mb-5">
                          Disclosure Checklist
                        </h2>
                        <div className="space-y-6">
                          {currentStandard.disclosureGroups.map((g, idx) => (
                            <div key={idx} className="space-y-3">
                              <div className="flex items-center gap-2">
                                <h3 className="text-xs font-bold text-slate-900 dark:text-white">{g.heading}</h3>
                                {g.paraRange && <span className="text-[10px] text-slate-500 font-medium">({g.paraRange})</span>}
                              </div>
                              <ul className="space-y-2.5">
                                {g.items.map((item, itemIdx) => (
                                  <li key={itemIdx} className="text-xs text-slate-700 dark:text-gray-300 flex items-start gap-2.5 leading-relaxed font-semibold">
                                    <span className="text-blue-500 font-bold">☐</span>
                                    <div className="flex-1">
                                      {renderTextWithReferences(item.text)}
                                      {item.isConditional && <span className="ml-1.5 text-[9px] bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/50 px-1.5 py-0.5 rounded font-bold uppercase">Conditional</span>}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Comparison Table */}
                    {currentStandard.comparison && currentStandard.comparison.rows && currentStandard.comparison.rows.length > 0 && (
                      <div className="mt-8 pt-8 border-t border-[#E2E1DD] dark:border-gray-800">
                        <h2 className="text-sm font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wider mb-5">
                          Comparison: {currentStandard.code} vs {currentStandard.comparison.std2Title}
                        </h2>
                        <div className="border border-[#E2E1DD] dark:border-gray-800 rounded-xl overflow-hidden">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-650 dark:text-gray-400 border-b border-[#E2E1DD] dark:border-gray-800">
                                <th className="p-3 font-bold w-1/4">Criterion</th>
                                <th className="p-3 font-bold w-3/8">{currentStandard.code}</th>
                                <th className="p-3 font-bold w-3/8">{currentStandard.comparison.std2Title}</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E2E1DD] dark:divide-gray-800">
                              {currentStandard.comparison.rows.map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/40">
                                  <td className="p-3 font-bold text-slate-900 dark:text-white">{row.criterion}</td>
                                  <td className="p-3 text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">{renderTextWithReferences(row.as)}</td>
                                  <td className="p-3 text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">{renderTextWithReferences(row.indAs)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Large Blank Content Placeholder for future material */}
                    {(!currentStandard.content.objective && currentStandard.examples.length === 0) && (
                      <div className="border border-dashed border-[#E2E1DD] dark:border-gray-800 rounded-xl p-8 text-center flex flex-col items-center justify-center bg-[#FAFAF8] dark:bg-[#111726]/30">
                        <div className="w-12 h-12 bg-white dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 rounded-full flex items-center justify-center shadow-2xs mb-3">
                          <FileText size={20} className="text-[#A0A0A8]" />
                        </div>
                        <h3 className="text-xs font-bold text-[#1C1C1E] dark:text-white mb-1">Content will be available here</h3>
                        <p className="text-[11px] text-[#76767E] dark:text-gray-400 max-w-sm leading-relaxed">
                          We are preparing high quality learning material and official references for you.
                        </p>
                      </div>
                    )}

                    {/* 4. Official References & Resource Links */}
                    {currentStandard.resources && currentStandard.resources.length > 0 && (
                      <div className="mt-10 pt-10 border-t border-[#E2E1DD] dark:border-gray-800">
                        <h2 className="text-sm font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wider mb-5">
                          4. Official References &amp; Resource Links
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {currentStandard.resources.map((res, idx) => {
                            const isPdf = res.type === 'PDF';
                            return (
                              <a
                                key={idx}
                                href={isPdf ? undefined : res.url}
                                onClick={isPdf ? (e) => {
                                  e.preventDefault();
                                  setActiveTab('pdf');
                                } : undefined}
                                target={isPdf ? undefined : "_blank"}
                                rel="noopener noreferrer"
                                className={`p-4 rounded-xl border border-[#E2E1DD] dark:border-gray-800 bg-[#FAFAF8] dark:bg-[#1E2640] hover:border-[#2D5BE3] transition-colors flex items-center justify-between group ${isPdf ? 'cursor-pointer' : ''}`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 border border-[#E2E1DD] dark:border-gray-700 flex items-center justify-center text-[#2D5BE3] dark:text-blue-400 group-hover:scale-105 transition-transform">
                                    {res.type === 'PDF' ? (
                                      <FileText size={16} className="text-red-500" />
                                    ) : res.type === 'VIDEO' ? (
                                      <Video size={16} className="text-blue-500" />
                                    ) : (
                                      <ExternalLink size={16} className="text-emerald-500" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-[#1C1C1E] dark:text-white group-hover:text-[#2D5BE3] transition-colors">
                                      {res.title}
                                    </p>
                                    <p className="text-[10px] text-[#76767E] dark:text-gray-400 mt-0.5">
                                      {res.type === 'PDF' ? 'Official PDF Document' : res.type === 'VIDEO' ? 'Video Lecture Class' : 'External Reference Link'}
                                    </p>
                                  </div>
                                </div>
                                <ChevronRight size={14} className="text-[#A0A0A8] group-hover:translate-x-0.5 transition-transform" />
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

          {/* 2. EXAMPLES & CASE LAW VIEW */}
          {activeTab === 'examples' && (
            <div className="w-full space-y-8 animate-fade-in">
              {currentStandard.id === 'as-1' ? (
                <AS1ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.examplesHtml ? (
                <div 
                  className="w-full bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-2xl p-6 sm:p-10 shadow-xs font-sans prose dark:prose-invert max-w-none
                    [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-bold [&_h2]:text-[#1C1C1E] [&_h2]:dark:text-white [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-gray-100 [&_h2]:dark:border-gray-800 [&_h2]:mt-8 [&_h2]:mb-4
                    [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:dark:text-slate-100 [&_h3]:mt-6 [&_h3]:mb-3
                    [&_p]:text-[15px] [&_p]:sm:text-[16px] [&_p]:text-slate-700 [&_p]:dark:text-gray-300 [&_p]:leading-relaxed [&_p]:mb-4
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
                    [&_li]:text-[15px] [&_li]:text-slate-700 [&_li]:dark:text-gray-300 [&_li]:leading-relaxed [&_li]:mb-1.5
                    [&_blockquote]:border-l-4 [&_blockquote]:border-[#2D5BE3] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-slate-600 [&_blockquote]:dark:text-gray-400
                    [&_table]:w-full [&_table]:text-left [&_table]:text-xs [&_table]:border-collapse [&_table]:border [&_table]:border-[#E2E1DD] [&_table]:dark:border-gray-800 [&_table]:rounded-xl [&_table]:overflow-hidden [&_table]:mb-6
                    [&_th]:bg-slate-50 [&_th]:dark:bg-slate-850 [&_th]:p-3 [&_th]:font-bold [&_th]:border-b [&_th]:border-[#E2E1DD] [&_th]:dark:border-gray-850
                    [&_td]:p-3 [&_td]:text-slate-700 [&_td]:dark:text-gray-300 [&_td]:border-b [&_td]:border-[#E2E1DD] [&_td]:dark:border-gray-850
                    [&_.editor-note-block]:p-6 [&_.editor-note-block]:rounded-2xl [&_.editor-note-block]:border [&_.editor-note-block]:border-[#C5C3BC]/50 [&_.editor-note-block]:bg-[#FAFAF8]/60 [&_.editor-note-block]:dark:bg-[#1E2640]/55 [&_.editor-note-block]:mb-8
                    [&_.editor-exam-trap]:p-5 [&_.editor-exam-trap]:rounded-xl [&_.editor-exam-trap]:bg-[#FDEEEE] [&_.editor-exam-trap]:dark:bg-[#2C1D1D] [&_.editor-exam-trap]:border [&_.editor-exam-trap]:border-[#F5C6C0] [&_.editor-exam-trap]:dark:border-red-900/50 [&_.editor-exam-trap]:mb-4
                    [&_.editor-practical-use]:p-5 [&_.editor-practical-use]:rounded-xl [&_.editor-practical-use]:bg-[#E8F7EE] [&_.editor-practical-use]:dark:bg-[#1A2C22] [&_.editor-practical-use]:border [&_.editor-practical-use]:border-[#C5E9D4] [&_.editor-practical-use]:dark:border-green-900/50 [&_.editor-practical-use]:mb-4
                    [&_.editor-case-law]:p-5 [&_.editor-case-law]:rounded-xl [&_.editor-case-law]:bg-[#EEF2FD] [&_.editor-case-law]:dark:bg-[#1A2542] [&_.editor-case-law]:border [&_.editor-case-law]:border-[#C5D5F8] [&_.editor-case-law]:dark:border-blue-900/50 [&_.editor-case-law]:mb-4
                  "
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    const pdfBtn = target.closest('[data-pdf-page]');
                    if (pdfBtn) {
                      const page = parseInt(pdfBtn.getAttribute('data-pdf-page') || '', 10);
                      if (page) {
                        e.preventDefault();
                        e.stopPropagation();
                        navigateToPdfPage(page);
                      }
                    }
                  }}
                  dangerouslySetInnerHTML={{
                    __html: currentStandard.examplesHtml.replace(
                      /\[(?:Source:\s*ICAI\s*AS\s*1\s*PDF\s*Page\s*|Page\s*|ICAI\s*Ref:\s*Page\s*4\.|PDF\s*|Official\s*|Ref\s*|Citation\s*:\s*|Official\s*Ref\s*:\s*Page\s*|MCA\s*Ref\s*:\s*Page\s*|ICAI\s*Ref\s*:\s*Page\s*)(\d+)(?:\s*[^\]]*)?\]/gi,
                      (match, pageNum) => `<button type="button" data-pdf-page="${pageNum}" class="inline-flex items-center gap-1.5 px-2 py-0.5 mx-1 bg-red-50 hover:bg-red-100 dark:bg-red-950/45 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded text-[11px] font-extrabold cursor-pointer transition-all" title="Click to jump to PDF Page ${pageNum}">📄 Page ${pageNum}</button>`
                    )
                  }}
                />
              ) : (
                <div className="space-y-8">
                  {currentStandard.examples.map((item, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-2xl p-6 sm:p-10 space-y-6 shadow-xs">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E1DD]/60 dark:border-gray-800/60 pb-4">
                        <div className="flex items-center gap-2">
                          <Scale size={18} className="text-[#2D5BE3] dark:text-blue-400" />
                          <h3 className="text-[15px] font-bold text-[#1C1C1E] dark:text-white">
                            {item.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.difficulty && (
                            <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                              item.difficulty === 'BEGINNER'
                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/45 dark:text-emerald-450 border border-emerald-250/40'
                                : item.difficulty === 'INTERMEDIATE'
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/45 dark:text-blue-450 border border-blue-250/40'
                                : 'bg-rose-50 text-rose-700 dark:bg-rose-950/45 dark:text-rose-450 border border-rose-250/40'
                            }`}>
                              {item.difficulty}
                            </span>
                          )}
                          {item.paraRef && (
                            <span className="text-[10px] font-bold bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-gray-300 border border-slate-200 dark:border-gray-700 px-2 py-0.5 rounded">
                              Ref: {item.paraRef}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                        {/* Facts & Issue */}
                        <div className="space-y-6">
                          <div className="bg-[#FAFAF8] dark:bg-[#1C2335]/30 p-5 sm:p-6 rounded-xl border border-[#E2E1DD]/80 dark:border-gray-800/80">
                            <p className="text-[11px] text-[#A0A0A8] dark:text-gray-400 font-extrabold uppercase tracking-wider mb-2.5">
                              Facts
                            </p>
                            <p className="text-[16px] text-[#33333A] dark:text-gray-250 leading-relaxed font-medium">
                              {renderTextWithReferences(item.scenario)}
                            </p>
                          </div>
                          
                          {item.working && (
                            <div className="bg-[#FAFAF8] dark:bg-[#1C2335]/30 p-5 sm:p-6 rounded-xl border border-[#E2E1DD]/80 dark:border-gray-800/80">
                              <p className="text-[11px] text-[#A0A0A8] dark:text-gray-400 font-extrabold uppercase tracking-wider mb-2.5">
                                Issue
                              </p>
                              <p className="text-[16px] text-[#33333A] dark:text-gray-250 leading-relaxed font-medium">
                                {renderTextWithReferences(item.working)}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Analysis & Conclusion */}
                        <div className="space-y-6">
                          <div className="bg-[#E8F7EE] dark:bg-[#182B22]/40 p-5 sm:p-6 rounded-xl border border-[#C5E9D4]/60 dark:border-green-950/60">
                            <p className="text-[11px] text-[#1A7A4A] dark:text-emerald-400 font-extrabold uppercase tracking-wider mb-2.5">
                              Analysis &amp; Conclusion
                            </p>
                            <p className="text-[16px] text-[#2A2A35] dark:text-gray-250 leading-relaxed font-medium">
                              {renderTextWithReferences(item.answer || item.guidance)}
                            </p>
                          </div>

                          {item.note && (
                            <div className="bg-[#FFF8E6] dark:bg-[#2C241B]/40 p-5 sm:p-6 rounded-xl border border-[#F5E1B8]/60 dark:border-amber-950/60">
                              <p className="text-[11px] text-[#B7791F] dark:text-amber-400 font-extrabold uppercase tracking-wider mb-1">
                                Key Takeaway / Note
                              </p>
                              <p className="text-[16px] text-[#33333A] dark:text-gray-200 leading-relaxed font-medium">
                                {renderTextWithReferences(item.note)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {currentStandard.examples.length === 0 && (
                    <div className="border border-dashed border-[#E2E1DD] dark:border-gray-800 rounded-xl p-8 text-center flex flex-col items-center justify-center bg-white dark:bg-[#111726]/30">
                      <div className="w-12 h-12 bg-white dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 rounded-full flex items-center justify-center shadow-2xs mb-3">
                        <Scale size={20} className="text-[#A0A0A8]" />
                      </div>
                      <h3 className="text-xs font-bold text-[#1C1C1E] dark:text-white mb-1">No examples available</h3>
                      <p className="text-[11px] text-[#76767E] dark:text-gray-400 max-w-sm leading-relaxed">
                        Illustrations and specific case study files are currently being processed.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 2.5. IMPORTANT QUESTIONS VIEW */}
          {activeTab === 'faqs' && (
            <div className="w-full space-y-8 animate-fade-in">
              <div className="space-y-8">
                {currentStandard.faqs && currentStandard.faqs.length > 0 ? (
                  (() => {
                    const categories: Record<string, string> = {
                      'GENERAL': 'Conceptual Questions',
                      'APPLICABILITY': 'Applicability Questions',
                      'RECOGNITION': 'Recognition Questions',
                      'MEASUREMENT': 'Measurement Questions',
                      'DISCLOSURE': 'Disclosure Questions',
                      'EXAM': 'ICAI-style Exam Questions',
                      'PRACTICAL': 'Practical Questions'
                    };
                    
                    const grouped: Record<string, typeof currentStandard.faqs> = {};
                    currentStandard.faqs.forEach(f => {
                      const cat = f.category || 'GENERAL';
                      if (!grouped[cat]) grouped[cat] = [];
                      grouped[cat].push(f);
                    });

                    return Object.keys(grouped).map(catKey => (
                      <div key={catKey} className="space-y-4">
                        <h3 className="text-sm font-bold text-[#2D5BE3] dark:text-[#60A5FA] uppercase tracking-wider pl-2.5 border-l-2 border-[#2D5BE3] dark:border-blue-500">
                          {categories[catKey] || 'General Questions'}
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                          {grouped[catKey].map((item, idx) => {
                            const uniqueId = item.id || idx;
                            const isExpanded = expandedFaqId === uniqueId;
                            const toggleExpand = () => {
                              setExpandedFaqId(isExpanded ? null : uniqueId);
                            };
                            return (
                              <div
                                key={uniqueId}
                                className="bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-xl overflow-hidden shadow-2xs hover:shadow-xs transition-shadow"
                              >
                                <button
                                  onClick={toggleExpand}
                                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none"
                                >
                                  <span className="text-xs font-bold text-[#1C1C1E] dark:text-white leading-snug">
                                    Q: {item.question}
                                  </span>
                                  <ChevronDown
                                    size={16}
                                    className={`shrink-0 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                  />
                                </button>
                                
                                {isExpanded && (
                                  <div className="p-4 sm:p-5 pt-0 border-t border-gray-50 dark:border-gray-800/50 bg-[#FAFAF8] dark:bg-[#1C2336]/40">
                                    <div className="text-xs text-[#4A4A52] dark:text-gray-300 leading-relaxed font-semibold whitespace-pre-line font-medium">
                                      {item.answer}
                                    </div>
                                    {item.sourceRef && (
                                      <p className="text-[10px] text-[#76767E] dark:text-gray-400 mt-3 font-bold uppercase tracking-wider">
                                        Source Reference: {item.sourceRef}
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ));
                  })()
                ) : (
                  <div className="border border-dashed border-[#E2E1DD] dark:border-gray-800 rounded-xl p-8 text-center flex flex-col items-center justify-center bg-white dark:bg-[#111726]/30">
                    <div className="w-12 h-12 bg-white dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 rounded-full flex items-center justify-center shadow-2xs mb-3">
                      <MessageSquare size={20} className="text-[#A0A0A8]" />
                    </div>
                    <h3 className="text-xs font-bold text-[#1C1C1E] dark:text-white mb-1">No questions available</h3>
                    <p className="text-[11px] text-[#76767E] dark:text-gray-400 max-w-sm leading-relaxed">
                      Important questions and interview FAQs are currently under development.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 3. LECTURE VIDEO PLAYBACK VIEW */}
          {activeTab === 'lecture' && (
            <div className="w-full space-y-3 animate-fade-in pt-0">
              {/* Premium native HTML5 video player integration */}
              <div
                ref={videoContainerRef}
                onMouseMove={handleMouseMovePlayer}
                onMouseLeave={handleMouseLeavePlayer}
                className="relative aspect-video w-full max-w-4xl mx-auto rounded-2xl bg-[#090C15] overflow-hidden shadow-lg border border-gray-900 flex flex-col group/video"
              >
                {/* Native HTML5 video tag, YouTube Iframe or Vimeo Iframe */}
                {ytId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}?autoplay=0&controls=1&rel=0&enablejsapi=1`}
                    className="w-full h-full border-0 absolute inset-0 z-10"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : vimeoId ? (
                  <iframe
                    src={`https://player.vimeo.com/video/${vimeoId}?autoplay=0&controls=1`}
                    className="w-full h-full border-0 absolute inset-0 z-10"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    ref={videoRef}
                    src={getVideoSrc(lectureUrl)}
                    className="w-full h-full object-cover z-0 pointer-events-auto"
                    onTimeUpdate={handleTimeUpdate}
                    onDurationChange={handleDurationChange}
                    onEnded={handleVideoEnded}
                    playsInline
                  />
                )}

                {/* Play screen backdrop */}
                {!ytId && !vimeoId && !isPlaying && videoTime === 0 ? (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/65 backdrop-blur-xs transition-opacity p-6 text-center select-none">
                    
                    {/* Mock Poster Artwork inside Player */}
                    <div className="mb-6 max-w-sm w-full bg-slate-950/90 border border-slate-800 p-6 rounded-xl text-left shadow-md">
                      <span className="text-[10px] font-bold text-[#60A5FA] bg-[#2D5BE3]/10 px-2 py-0.5 rounded uppercase tracking-wider">
                        LECTURE
                      </span>
                      <h2 className="text-lg font-bold text-white mt-2 leading-tight">
                        {currentStandard.code}
                      </h2>
                      <p className="text-xs font-semibold text-gray-300 mt-1">
                        {currentStandard.title}
                      </p>
                    </div>

                    <button
                      onClick={handlePlayPauseToggle}
                      className="w-16 h-16 rounded-full flex items-center justify-center bg-[#2D5BE3] hover:bg-[#2450CC] text-white hover:scale-105 transition-all shadow-md focus:outline-none"
                    >
                      <Play size={24} className="ml-1" />
                    </button>
                    <span className="text-xs font-bold text-white mt-3 uppercase tracking-wider">
                      Start Video Lecture
                    </span>
                  </div>
                ) : null}

                {/* Subtitles Overlay */}
                {!ytId && !vimeoId && showCC && isPlaying && (
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-black/80 rounded-md text-xs text-white max-w-lg text-center leading-normal border border-gray-800">
                    {videoTime < 5
                      ? `Welcome to our session on ${currentStandard.title}.`
                      : videoTime < 12
                      ? "In this chapter, we will discuss the primary objectives and legislative scope."
                      : videoTime < 25
                      ? "Note that complying with these disclosure criteria is essential for examination purposes."
                      : "Let's review the practical illustrations and adjustments in our work papers."}
                  </div>
                )}

                {/* Controls Bar at bottom */}
                {!ytId && !vimeoId && (
                  <div className={`mt-auto w-full bg-gradient-to-t from-black/95 to-transparent p-4 flex flex-col gap-2 z-10 transition-opacity duration-305 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    
                    {/* Progress timeline slider */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400 font-semibold select-none">
                        {formatVideoTime(videoTime)}
                      </span>
                      <input
                        type="range"
                        min="0"
                        max={videoDuration}
                        value={videoTime}
                        onChange={handleSeekChange}
                        className="flex-1 accent-[#2D5BE3] h-1 rounded-full bg-gray-700 cursor-pointer outline-none"
                      />
                      <span className="text-[10px] text-gray-400 font-semibold select-none">
                        {formatVideoTime(videoDuration)}
                      </span>
                    </div>

                    {/* Icon controllers row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={handlePlayPauseToggle}
                          className="text-white hover:text-[#2D5BE3] transition-colors"
                        >
                          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        </button>
                        <button
                          onClick={handleSkipBackward}
                          className="text-white hover:text-[#2D5BE3] transition-colors"
                          title="Skip backward 10 seconds"
                        >
                          <RotateCcw size={16} />
                        </button>
                        <button
                          onClick={handleSkipForward}
                          className="text-white hover:text-[#2D5BE3] transition-colors"
                          title="Skip forward 10 seconds"
                        >
                          <RotateCw size={16} />
                        </button>
                        <div className="flex items-center gap-1.5 group/volume">
                          <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="text-white hover:text-[#2D5BE3] transition-colors"
                          >
                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                          </button>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={isMuted ? 0 : videoVolume}
                            onChange={(e) => {
                              setVideoVolume(Number(e.target.value))
                              setIsMuted(false)
                            }}
                            className="w-16 accent-[#2D5BE3] h-1 rounded-full bg-gray-700 cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Playback speed selector */}
                        <div className="relative">
                          <select
                            value={playbackSpeed}
                            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                            className="bg-[#1C1C1E] text-white text-[11px] font-bold rounded px-1.5 py-0.5 border border-gray-700 outline-none cursor-pointer"
                          >
                            <option value="0.9">0.9x</option>
                            <option value="1">1.0x</option>
                            <option value="1.25">1.25x</option>
                            <option value="1.5">1.5x</option>
                            <option value="1.75">1.75x</option>
                            <option value="2">2.0x</option>
                          </select>
                        </div>

                        {/* Quality menu */}
                        <div className="relative">
                          <select
                            value={videoQuality}
                            onChange={(e) => {
                              setVideoQuality(e.target.value)
                              alert(`Quality changed to ${e.target.value}`)
                            }}
                            className="bg-[#1C1C1E] text-white text-[11px] font-bold rounded px-1.5 py-0.5 border border-gray-700 outline-none cursor-pointer"
                          >
                            <option value="Auto">Auto</option>
                            <option value="1080p">1080p</option>
                            <option value="720p">720p</option>
                            <option value="480p">480p</option>
                          </select>
                        </div>

                        <button
                          onClick={handleFullscreenToggle}
                          className="text-white hover:text-[#2D5BE3] transition-colors"
                        >
                          <Maximize size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Fallback if no lecture source provided */}
              {!currentStandard.lectureUrl && (
                <div className="p-8 rounded-xl border border-dashed border-[#E2E1DD] dark:border-gray-800 bg-white dark:bg-[#111726]/30 text-center flex flex-col items-center justify-center">
                  <h3 className="text-xs font-bold text-[#1C1C1E] dark:text-white mb-1">No video lecture available</h3>
                  <p className="text-[11px] text-[#76767E] dark:text-gray-400 max-w-sm leading-relaxed">
                    The video class for this standard is currently being prepared.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 4. PREMIUM DOCUMENT PDF VIEWER VIEW */}
          {activeTab === 'pdf' && (
            <div className="w-full h-[calc(100vh-130px)] min-h-[600px] bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-xl overflow-hidden shadow-xs flex flex-col">
              <iframe
                ref={iframeRef}
                key={`${currentStandard.id}-${pdfPage}`}
                src={`/api/pdfs/${currentStandard.id}#page=${pdfPage}`}
                className="w-full flex-1 border-0"
                title={`PDF View for ${currentStandard.title}`}
              />
            </div>
          )}

            </>
          )}

        </div>
      </main>
    </div>
  )
}

