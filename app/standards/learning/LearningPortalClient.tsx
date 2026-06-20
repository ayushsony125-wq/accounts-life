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
  { id: 'intro', title: '1. Introduction' },
  { id: 'objective', title: '2. Objective' },
  { id: 'scope', title: '3. Scope' },
  { id: 'nature', title: '4. Nature of Accounting Policies' },
  { id: 'areas', title: '5. Areas of Policy Diversity' },
  { id: 'selection', title: '6. Selection Considerations' },
  { id: 'prudence', title: '7. Prudence Principle' },
  { id: 'substance', title: '8. Substance over Form' },
  { id: 'materiality', title: '9. Materiality Threshold' },
  { id: 'assumptions', title: '10. Fundamental Assumptions' },
  { id: 'disclosure', title: '11. Disclosure Requirements' },
  { id: 'change', title: '12. Change in Accounting Policies' },
  { id: 'impact', title: '13. Financial Statement Impact' },
  { id: 'audit', title: '14. Audit Relevance' },
  { id: 'exam', title: '15. Examination Relevance' },
  { id: 'business', title: '16. Practical Business Relevance' },
  { id: 'observations', title: '17. Important Observations' },
  { id: 'journal', title: '18. Journal Entry Guidance' }
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
    <div className="w-full animate-fade-in font-sans">
      {/* Main Content — Full Width */}
      <div className="w-full space-y-10 bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-2xl p-6 sm:p-10 shadow-xs">
        {/* Section 1: Introduction */}
        <section id="as1-intro" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            1. Introduction
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            Irrespective of the extent of standardization, diversity in accounting policies is unavoidable. This diversity arises from two main factors:
          </p>
          <ul className="list-disc pl-6 text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed space-y-2 font-medium">
            <li><strong>First:</strong> Accounting standards cannot and do not cover all possible areas of accounting. Enterprises have the freedom of adopting any reasonable accounting policy in areas not covered by a standard.</li>
            <li><strong>Second:</strong> Since enterprises operate in diverse and complex situations, it is impossible to develop a single set of policies applicable to all enterprises for all time.</li>
          </ul>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            The accounting standards, therefore, permit more than one policy option even in areas covered by them. However, differences in accounting policies lead to differences in reported information even if the underlying transactions are identical. The qualitative characteristic of **comparability** of financial statements, therefore, suffers due to diversity of accounting policies.
          </p>
          <div className="bg-[#EEF2FD] dark:bg-[#1A2542] border-l-4 border-[#2D5BE3] p-4 rounded-r-xl">
            <p className="text-xs font-bold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-wider mb-1">Key Takeaway</p>
            <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
              Since uniformity is impossible, it is not enough to say that all standards have been complied with. For these reasons, **AS 1** requires enterprises to disclose significant accounting policies actually adopted by them in preparation of their financial statements to allow users to make necessary adjustments in their analysis. <PdfRef page={2} />
            </p>
          </div>
        </section>

        {/* Section 2: Objective */}
        <section id="as1-objective" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            2. Objective
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            The purpose of Accounting Standard 1, Disclosure of Accounting Policies, is to promote a better understanding of financial statements by requiring disclosure of significant accounting policies in an orderly manner.
          </p>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            Such disclosures facilitate:
          </p>
          <ul className="list-disc pl-6 text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed space-y-2 font-medium">
            <li>A more meaningful comparison between the financial statements of different enterprises for the same accounting period.</li>
            <li>A comparison of financial statements of the same enterprise for different accounting periods when changes in accounting policies are made and disclosed. <PdfRef page={2} /></li>
          </ul>
        </section>

        {/* Section 3: Scope */}
        <section id="as1-scope" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            3. Scope
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            This Accounting Standard applies to all enterprises in the preparation and presentation of general-purpose financial statements.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 sm:p-6 rounded-xl bg-[#E8F7EE] dark:bg-[#1A2C22] border border-[#C5E9D4] dark:border-green-900/50">
              <p className="text-xs font-bold text-[#1A7A4A] dark:text-emerald-400 uppercase tracking-widest mb-2.5">
                Mandatory Applicability
              </p>
              <ul className="space-y-3 text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                <li className="flex items-start gap-2"><span>✓</span> All corporate entities under Indian GAAP.</li>
                <li className="flex items-start gap-2"><span>✓</span> All non-corporate entities (sole proprietorships, partnerships, LLPs, trusts, societies).</li>
                <li className="flex items-start gap-2"><span>✓</span> Applies to all general-purpose financial statements. <PdfRef page={2} /></li>
              </ul>
            </div>
            <div className="p-5 sm:p-6 rounded-xl bg-[#FDEEEE] dark:bg-[#2C1D1D] border border-[#F5C6C0] dark:border-red-900/50">
              <p className="text-xs font-bold text-[#C0392B] dark:text-red-400 uppercase tracking-widest mb-2.5">
                Exemptions / Exclusions
              </p>
              <ul className="space-y-3 text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                <li className="flex items-start gap-2"><span>✗</span> Entities adopting Indian Accounting Standards (Ind AS) under the IFRS-converged framework.</li>
                <li className="flex items-start gap-2"><span>✗</span> Immaterial items that do not influence user decisions. <PdfRef page={2} /></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Nature of Accounting Policies */}
        <section id="as1-nature" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            4. Nature of Accounting Policies
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            Accounting policies refer to the specific accounting principles and the methods of applying those principles adopted by the enterprise in the preparation and presentation of financial statements.
          </p>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            Accounting is both science and art: a science because we have some tested accounting principles, which are applicable universally, but simultaneously the application of these principles depends on the professional capability and judgement of the accountant. Since business circumstances vary, alternative accounting policies are acceptable. <PdfRef page={4} />
          </p>
        </section>

        {/* Section 5: Areas requiring accounting policies */}
        <section id="as1-areas" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            5. Areas in Which Different Accounting Policies are Encountered
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            The standard lists key areas of financial reporting where diversity is common and explicit policy disclosures are mandatory:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px] text-slate-700 dark:text-gray-300 font-semibold">
            <div className="p-4 bg-slate-50 dark:bg-[#1E2640] rounded-xl border border-slate-100 dark:border-gray-800">
              • Methods of depreciation, depletion, and amortization
            </div>
            <div className="p-4 bg-slate-50 dark:bg-[#1E2640] rounded-xl border border-slate-100 dark:border-gray-800">
              • Valuation of inventories (FIFO, Weighted Average, etc.)
            </div>
            <div className="p-4 bg-slate-50 dark:bg-[#1E2640] rounded-xl border border-slate-100 dark:border-gray-800">
              • Treatment of expenditure during construction
            </div>
            <div className="p-4 bg-slate-50 dark:bg-[#1E2640] rounded-xl border border-slate-100 dark:border-gray-800">
              • Conversion or translation of foreign currency items
            </div>
            <div className="p-4 bg-slate-50 dark:bg-[#1E2640] rounded-xl border border-slate-100 dark:border-gray-800">
              • Treatment of goodwill and intangibles
            </div>
            <div className="p-4 bg-slate-50 dark:bg-[#1E2640] rounded-xl border border-slate-100 dark:border-gray-800">
              • Valuation of investments (cost, market value, etc.)
            </div>
            <div className="p-4 bg-slate-50 dark:bg-[#1E2640] rounded-xl border border-slate-100 dark:border-gray-800">
              • Treatment of retirement benefits (gratuity, pension, etc.)
            </div>
            <div className="p-4 bg-slate-50 dark:bg-[#1E2640] rounded-xl border border-slate-100 dark:border-gray-800">
              • Recognition of profit on long-term contracts <PdfRef page={4} />
            </div>
          </div>
        </section>

        {/* Section 6: Selection of accounting policies */}
        <section id="as1-selection" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            6. Considerations in the Selection of Accounting Policies
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            The primary consideration in selecting accounting policies is that the financial statements should represent a **true and fair view** of the state of affairs as at the balance sheet date and of the profit or loss for the period.
          </p>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            For this purpose, the selection and application of accounting policies are governed by three major considerations: **Prudence**, **Substance over Form**, and **Materiality**. <PdfRef page={5} />
          </p>
        </section>

        {/* Section 7: Prudence */}
        <section id="as1-prudence" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            7. Prudence (Conservatism)
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            In view of the uncertainty associated with future events, profits are not anticipated, but recognized only when realized. However, provision is made for all known liabilities and losses even though the amount cannot be determined with certainty and represents only a best estimate based on available information.
          </p>
          <div className="bg-[#FFF8E6] dark:bg-[#2C241B]/40 p-4 rounded-xl border-l-4 border-[#B7791F]">
            <p className="text-xs font-bold text-[#B7791F] dark:text-amber-400 uppercase tracking-wider mb-1">Important Rule</p>
            <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
              Exercise of prudence does not permit the creation of hidden reserves by deliberately understating profits and assets, or overstating liabilities and losses. <PdfRef page={5} /><PdfRef page={6} />
            </p>
          </div>
        </section>

        {/* Section 8: Substance over Form */}
        <section id="as1-substance" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            8. Substance over Form
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            Transactions and other events should be accounted for and presented in accordance with their economic substance and financial reality, and not merely by their legal form.
          </p>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            **Example:** In a Hire Purchase transaction, the legal title remains with the financing company until the last instalment is paid. However, the buyer enjoys the economic benefits and bears the risks of the asset. Therefore, under the Substance over Form principle, the buyer records the asset and provides depreciation in their books from the date of possession. <PdfRef page={6} />
          </p>
        </section>

        {/* Section 9: Materiality */}
        <section id="as1-materiality" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            9. Materiality
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            Financial statements should disclose all material items, i.e., items whose knowledge might influence the economic decisions of users. Materiality depends on the size and nature of the item.
          </p>
          <div className="bg-slate-50 dark:bg-[#1E2640] p-4 rounded-xl border border-slate-200 dark:border-gray-800 text-xs text-slate-700 dark:text-gray-300 leading-relaxed space-y-2 font-semibold">
            <p className="font-bold">Quantitative limits under Schedule III of the Companies Act, 2013:</p>
            <p>1. **Income/Expenditure:** Disclose any item exceeding 1% of revenue from operations or ₹1,00,005, whichever is higher.</p>
            <p>2. **Shareholdings:** Disclose details of shareholders holding more than 5% shares in the company. <PdfRef page={6} /></p>
          </div>
        </section>

        {/* Section 10: Fundamental Accounting Assumptions */}
        <section id="as1-assumptions" className="scroll-mt-28 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            10. Fundamental Accounting Assumptions
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            Certain fundamental accounting assumptions underlie the preparation and presentation of financial statements. They are usually not specifically stated because their acceptance and use are assumed. If followed, no explicit disclosure is required. If NOT followed, the fact must be specifically disclosed along with the reasons. <PdfRef page={3} />
          </p>
          
          <div className="space-y-4">
            <div className="p-5 border border-slate-200 dark:border-gray-800 rounded-xl bg-slate-50/50 dark:bg-[#1E2640]/50">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">A. Going Concern</h3>
              <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                The enterprise is normally viewed as a going concern, meaning it will continue in operation for the foreseeable future. It is assumed that the enterprise has neither the intention nor the necessity of liquidation or of materially curtailing the scale of its operations. If not followed, assets must be valued on a liquidation basis (Net Realisable Value) and this fact must be disclosed. <PdfRef page={3} />
              </p>
            </div>

            <div className="p-5 border border-slate-200 dark:border-gray-800 rounded-xl bg-slate-50/50 dark:bg-[#1E2640]/50">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">B. Consistency</h3>
              <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                It is assumed that accounting policies are consistent from one period to another to ensure comparability of financial statements. A change is permitted only if required (i) by a statute, (ii) by an accounting standard, or (iii) if it results in a more appropriate presentation of financial statements. <PdfRef page={3} />
              </p>
            </div>

            <div className="p-5 border border-slate-200 dark:border-gray-800 rounded-xl bg-slate-50/50 dark:bg-[#1E2640]/50">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">C. Accrual Basis of Accounting</h3>
              <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                Transactions and other events are recognized as they occur (and not as cash or its equivalent is received or paid) and recorded in the financial statements of the periods to which they relate. Section 128(1) of the Companies Act, 2013 makes accrual accounting mandatory for all companies in India. <PdfRef page={3} /><PdfRef page={4} />
              </p>
            </div>
          </div>
        </section>

        {/* Section 11: Disclosure requirements */}
        <section id="as1-disclosure" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            11. Disclosure Requirements
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            To ensure proper understanding of financial statements, all significant accounting policies adopted in the preparation and presentation of financial statements should be disclosed.
          </p>
          <ul className="list-disc pl-6 text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed space-y-2 font-medium">
            <li>The disclosures must form part of the financial statements.</li>
            <li>All disclosures should normally be made in one place (such as Note 1) rather than scattered over several statements, schedules, and notes. <PdfRef page={7} /><PdfRef page={14} /></li>
          </ul>
        </section>

        {/* Section 12: Change in accounting policies */}
        <section id="as1-change" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            12. Disclosure of Changes in Accounting Policies
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            Any change in the accounting policies which has a material effect in the current period, or which is reasonably expected to have a material effect in a later period, must be disclosed.
          </p>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            If a change is made in accounting policies which has no material effect in the current period but is expected to be material in future periods, the fact of the change must be disclosed in the period in which the change is adopted. <PdfRef page={7} />
          </p>
        </section>

        {/* Section 13: Financial statement impact */}
        <section id="as1-impact" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            13. Financial Statement Impact of Policy Changes
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            When a change in accounting policy has a material effect in the current period:
          </p>
          <ul className="list-disc pl-6 text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed space-y-2 font-medium">
            <li>The company must disclose the fact of the change and the reason for the change.</li>
            <li>The amount by which any item in the financial statements is affected by such change should be disclosed to the extent ascertainable.</li>
            <li>Where the amount is not ascertainable, wholly or in part, the fact that the impact is not ascertainable should be explicitly indicated. <PdfRef page={7} /></li>
          </ul>
        </section>

        {/* Section 14: Audit relevance */}
        <section id="as1-audit" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            14. Audit Relevance &amp; Para 23 Key Rule
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            For audit purposes, if fundamental assumptions are followed, the auditor does not need to mention them. If they are violated and not disclosed, the auditor must qualify the audit report.
          </p>
          <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-505 p-5 rounded-r-xl space-y-2">
            <p className="text-xs font-bold text-red-650 dark:text-red-400 uppercase tracking-wider">CRITICAL RULE — PARA 23</p>
            <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
              **Disclosure of accounting policies or of changes therein cannot remedy a wrong or inappropriate treatment of an item in the accounts.**
            </p>
            <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
              If an item is accounted for incorrectly (e.g., capitalizing revenue expenses), merely disclosing this inappropriate treatment in the notes does not make it correct under GAAP. The auditor is still required to qualify the report and demand correction. <PdfRef page={5} /><PdfRef page={11} />
            </p>
          </div>
        </section>

        {/* Section 15: Examination relevance */}
        <section id="as1-exam" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            15. Examination Relevance (CA Intermediate)
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            In CA Intermediate examinations, AS 1 is a frequent source of practical and theoretical questions. Key topics tested include:
          </p>
          <ul className="list-disc pl-6 text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed space-y-2 font-medium">
            <li><strong>Policy Change vs. Estimate Change:</strong> Recognizing that changes in estimation methods (e.g. provisioning methods) are estimate changes under AS 5, not policy changes under AS 1.</li>
            <li><strong>Quantification of Effects:</strong> Calculating the difference between old and new methods (e.g., FIFO to Weighted Average cost) and drafting the disclosure note.</li>
            <li><strong>Deviations from assumptions:</strong> Drafting disclosures when an entity adopts cash basis instead of accrual. <PdfRef page={9} /><PdfRef page={16} /></li>
          </ul>
        </section>

        {/* Section 16: Practical business relevance */}
        <section id="as1-business" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            16. Practical Business Relevance
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            In corporate reporting, analysts and investors rely heavily on Note 1 disclosures to normalize financial statements.
          </p>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            For example, if two steel companies operate in India and one uses the WDV method for plant depreciation while the other uses SLM, their net profits will differ even with identical operations. A credit analyst uses the accounting policy disclosure to recalculate and normalize the earnings before comparison. <PdfRef page={2} />
          </p>
        </section>

        {/* Section 17: Important observations */}
        <section id="as1-observations" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            17. Important Observations
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            In conclusion, Accounting Standard 1 (AS 1) serves as the cornerstone of financial reporting transparency.
          </p>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            Without AS 1 disclosures, the comparability of financial statements would be completely compromised, making cross-corporate analysis impossible.
          </p>
          <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl">
            <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
              Remember: Disclosure of policies can never cure a wrong accounting treatment (Para 23). This is the single most tested concept in professional CA exams! <PdfRef page={2} /><PdfRef page={11} />
            </p>
          </div>
        </section>

        {/* Section 18: Journal Entry Guidance */}
        <section id="as1-journal" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            18. Journal Entry Guidance &amp; Adjustments
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            Under AS 1, practical application of accounting policies and assumptions requires specific journal entry adjustments. Here are two critical scenarios:
          </p>
          <div className="space-y-4 pt-2">
            <div className="p-5 border border-slate-200 dark:border-gray-800 rounded-xl bg-slate-50/50 dark:bg-[#1E2640]/50 space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">A. Change in Depreciation Method (SLM → WDV)</h3>
              <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                If changing from SLM to WDV, the cumulative excess/shortfall in depreciation charged compared to WDV from inception is adjusted against Retained Earnings / General Reserve. The difference is debited to Retained Earnings and credited to Asset / Accumulated Depreciation.
              </p>
              <div className="bg-slate-950 p-4 rounded-lg font-mono text-[11px] text-slate-200">
                <span className="text-emerald-400">Debit</span> Retained Earnings A/c <br />
                <span className="text-red-400">Credit</span> Accumulated Depreciation A/c <br />
                <span className="text-slate-400">(Being cumulative depreciation adjustment on policy change)</span>
              </div>
            </div>
            <div className="p-5 border border-slate-200 dark:border-gray-800 rounded-xl bg-slate-50/50 dark:bg-[#1E2640]/50 space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">B. Accrual of Expenses at Year End</h3>
              <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                Outstanding wages: Debit Wages A/c, Credit Outstanding Wages A/c. The outstanding wages appear as a current liability in the Balance Sheet under &quot;Other Current Liabilities&quot;.
              </p>
              <div className="bg-slate-950 p-4 rounded-lg font-mono text-[11px] text-slate-200">
                <span className="text-emerald-400">Debit</span> Wages Expense A/c <br />
                <span className="text-red-400">Credit</span> Outstanding Wages Liability A/c <br />
                <span className="text-slate-400">(Being wages accrued but not paid at year-end under Accrual assumption)</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

interface AS1ExamplesCustomContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences: (text: string) => React.ReactNode;
}

function AS1ExamplesCustomContent({ navigateToPdfPage, renderTextWithReferences }: AS1ExamplesCustomContentProps) {
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

  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0)

  const cases = [
    {
      title: "Case 1: Changing Inventory Valuation Method from FIFO to Weighted Average",
      difficulty: "INTERMEDIATE",
      paraRef: "Para 26",
      facts: "ValuTex India Ltd has historically valued its raw material inventories using the FIFO method. Due to persistent high inflation in commodity prices, the company decides to change to the Weighted Average Cost (WAC) method at the end of FY 2025-26. The inventory value at year-end under FIFO is ₹450 Lakhs, whereas under WAC it is valued at ₹380 Lakhs. The profit before tax for the year before this adjustment is ₹1,200 Lakhs.",
      issue: "Whether the shift from FIFO to WAC constitutes a change in accounting policy under AS 1, and how the valuation difference of ₹70 Lakhs affects the profit and loss statement and disclosures.",
      principle: "Valuation of inventories is a significant accounting policy. Under AS 1, a change in accounting policy is permissible only if required by statute, by an accounting standard, or if it results in a more appropriate presentation of financial statements. Any such change having a material effect must be disclosed along with its quantified financial impact.",
      analysis: "A change in inventory valuation method (FIFO to WAC) directly changes the cost flow assumption, which is an accounting policy decision. The persistent inflation makes the Weighted Average method more appropriate as it smooths out price volatility and matches current revenues with averaged costs. Since the difference is ₹70 Lakhs (approx. 5.8% of PBT), the effect is highly material and must be accounted for and disclosed.",
      treatment: "Value the inventory at ₹380 Lakhs. Debit the cost of raw materials consumed (increase expense) and credit inventory by ₹70 Lakhs, thereby reducing the net profit before tax for the year by ₹70 Lakhs.",
      disclosure: "State the change in inventory valuation method from FIFO to WAC, explain the reason (fluctuating raw material prices where WAC provides a more appropriate presentation), and quantify the impact (ending inventory and profit before tax reduced by ₹70 Lakhs).",
      auditorView: "Verify the mathematical accuracy of the dual valuations (FIFO and WAC), ensure the management's justification of 'more appropriate presentation' is commercially sound, and confirm that the disclosure accurately states the ₹70 Lakhs reduction in profit.",
      importance: "This directly impacts key financial ratios, including the current ratio and gross margin, which bank lenders review for loan covenants.",
      trap: "Management shifting back to FIFO in a subsequent deflationary year without proper justification, solely to inflate earnings.",
      ref: "ICAI AS 1 PDF Page 7, Para 26; ICAI AS 2 (Valuation of Inventories) Para 24.",
      refPage: 7
    },
    {
      title: "Case 2: Useful Life Revision vs. Depreciation Method Change",
      difficulty: "INTERMEDIATE",
      paraRef: "Para 14",
      facts: "InfraCorp Ltd is an infrastructure development firm. In FY 2025-26, it switches its depreciation method for plant and machinery from WDV (20%) to SLM (7.5%) to match the pattern of consumption of economic benefits. In the same period, a technical review of its delivery fleet reveals that due to rough site conditions, the useful life of the trucks has reduced from 8 years to 5 years.",
      issue: "How should the change in depreciation method and the change in useful life be categorized (policy vs. estimate) and disclosed under AS 1?",
      principle: "A change in depreciation method is a change in accounting policy under AS 1 and AS 5. A change in the useful life or residual value of an asset is a change in an accounting estimate under AS 5. Policies require retrospective disclosure of the change and its cumulative impact, while estimate changes are applied prospectively.",
      analysis: "The depreciation method represents the systemic allocation of the asset's depreciable amount, which is a policy choice. Useful life is an estimation based on physical wear and tear and usage, which is an estimate. Both must be treated differently in the notes to ensure users understand the nature of the changes.",
      treatment: "Apply the SLM depreciation method. For the policy change, compute the cumulative depreciation difference from the date of acquisition and adjust it in the current P&L. For the truck fleet (estimate change), recalculate depreciation prospectively over the remaining 5 years without adjusting past figures.",
      disclosure: "Disclose the depreciation method change as an accounting policy change, stating the reason (better representation of asset consumption) and the financial impact on current profits. Disclose the useful life change as an estimate change, indicating the effect on the current period's depreciation expense.",
      auditorView: "Verify that the technical estimate for the trucks is documented by an engineer's certificate. Check that the cumulative depreciation adjustment for the machinery is correctly computed and separately disclosed.",
      importance: "Prevents the mixing of policy and estimate changes, which can lead to misleading asset values on the balance sheet.",
      trap: "Treating a depreciation method change as a change in estimate to avoid reporting the cumulative past impact in the current P&L.",
      ref: "ICAI AS 1 PDF Page 4, Para 14; ICAI AS 5 Para 21 & 23.",
      refPage: 4
    },
    {
      title: "Case 3: Going Concern in Severe Financial Distress",
      difficulty: "ADVANCED",
      paraRef: "Para 10(a)",
      facts: "Retail giant UrbanStores Ltd has lost 40% of its market share over three years, resulting in accumulated losses of ₹850 Lakhs against a paid-up capital of ₹500 Lakhs. Its current liabilities are ₹1,200 Lakhs, while current assets are only ₹400 Lakhs. Banks have classified their debt as Non-Performing Assets (NPAs), and creditors have initiated insolvency proceedings. The board prepares the accounts on a going concern basis, citing ongoing negotiation for a strategic buyout.",
      issue: "Is the going concern assumption validly applied, and what are the disclosure consequences under AS 1 if the assumption is doubtful or breached?",
      principle: "Going concern is a fundamental accounting assumption. It assumes the enterprise will continue in operation for the foreseeable future. If this assumption is followed, no disclosure is required. If the assumption is violated or subject to significant material uncertainty, that fact must be disclosed.",
      analysis: "UrbanStores Ltd exhibits severe indicators of going concern distress: negative net worth, working capital deficit, defaulted bank debt, and creditor litigation. A vague negotiation for a buyout does not provide sufficient evidence to support the going concern basis. If liquidation is likely, valuing assets at historical cost violates AS 1.",
      treatment: "If going concern is no longer valid, assets must be written down to their net realizable value (NRV) and liabilities recorded at their expected settlement values. If the basis is used under extreme uncertainty, the uncertainty must be fully disclosed.",
      disclosure: "If preparing on a liquidation basis, disclose that going concern is breached, assets are valued at NRV, and list the reasons. If preparing on a going concern basis, include a detailed note disclosing the defaults, legal cases, negative working capital, and concrete recovery steps.",
      auditorView: "Evaluate management's cash flow projections and mitigation plans. If the plans are unrealistic, insist on a liquidation basis. If management insists on going concern without proper disclosure, issue an adverse or qualified opinion under SA 570.",
      importance: "Ensures that lenders and suppliers do not extend credit based on overstated historical cost valuations of illiquid assets.",
      trap: "Management claiming that 'being in negotiation' is sufficient to assume going concern, ignoring legal bankruptcy actions.",
      ref: "ICAI AS 1 PDF Page 3, Para 10(a); ICAI AS 1 PDF Page 5, Para 21; SA 570 (Revised) — Going Concern.",
      refPage: 3
    },
    {
      title: "Case 4: Non-Provision of Overdue Bank Interest under Dispute",
      difficulty: "INTERMEDIATE",
      paraRef: "Para 10(c)",
      facts: "Zenith Exports Ltd defaulted on its bank interest payments of ₹15 Lakhs for the financial year. The company claims the bank charged a higher rate than agreed and has filed a civil suit for interest revision. Consequently, the company has not recorded the ₹15 Lakhs interest expense, stating they will account for it on a 'cash basis' once the court decides the dispute.",
      issue: "Does the non-provision of disputed interest comply with the accrual assumption of AS 1?",
      principle: "Accrual is a fundamental accounting assumption. Revenues and costs are accrued—meaning they are recognized as they are earned or incurred and recorded in the financial statements of the periods to which they relate, irrespective of cash flow. A dispute does not allow a company to shift to cash-basis accounting.",
      analysis: "The liability for interest has accrued during the year under the loan agreement. The presence of a dispute or legal case only affects the measurement of the liability, not the obligation to record it. Accounting for it only upon cash payment or court settlement violates the accrual assumption.",
      treatment: "Accrue the interest expense based on the rate stipulated in the bank's demand notice (or the undisputed rate, with the remaining disputed portion shown as a provision or contingent liability under AS 29).",
      disclosure: "Disclose the finance cost policy, the interest accrued during the year, and the details of the pending litigation and disputed amount in the notes.",
      auditorView: "Verify the loan agreement and bank statement of account. If the company fails to accrue the interest, the auditor should qualify the audit report, detailing the understatement of finance costs and current liabilities.",
      importance: "Maintains the matching principle and prevents window dressing of interest coverage ratios.",
      trap: "Management omitting interest provisions under the guise that 'the matter is sub-judice' and therefore not liability.",
      ref: "ICAI AS 1 PDF Page 4, Para 10(c); Companies Act, 2013 Section 128(1) (mandatory accrual accounting).",
      refPage: 4
    },
    {
      title: "Case 5: Creation of Hidden Reserves under the Guise of Prudence",
      difficulty: "ADVANCED",
      paraRef: "Para 17(a)",
      facts: "BioCure Ltd, a highly profitable pharmaceutical company, decides to create a 'General Provision for R&D Risk' of ₹200 Lakhs by debiting the Profit & Loss statement. The CEO states that since pharmaceutical research is highly risky, creating this provision is a 'prudent' and conservative approach to protect shareholders from future research failures.",
      issue: "Does the creation of a general provision for unspecified risks align with the principle of Prudence under AS 1?",
      principle: "Prudence requires that provisions be made for all known liabilities and losses. However, it does not permit the creation of hidden or secret reserves, nor does it allow the deliberate understatement of assets/income or the overstatement of liabilities/expenses.",
      analysis: "Prudence is meant to handle uncertainty, not to manipulate earnings. Creating a provision for unspecified, future research risks is not based on a present obligation or a known loss. This is an attempt to create a hidden reserve to smooth earnings in future years (by reversing the provision when profits are low).",
      treatment: "Reverse the provision of ₹200 Lakhs from the P&L. If the board wants to set aside funds for research risks, they must transfer it from Retained Earnings to a 'Research Reserve' as an appropriation of profit, not as a charge against profit.",
      disclosure: "Disclose the transfer to the Research Reserve in the notes on reserves and surplus. No expense should appear in the P&L.",
      auditorView: "Insist on the reversal of the P&L provision. If the management refuses, qualify the audit report for understatement of profit and overstatement of liabilities.",
      importance: "Ensures that financial statements present a true and fair view, preventing companies from artificially depressing profits to evade taxes or smooth earnings.",
      trap: "Allowing provisions for vague 'contingencies' or 'market risks' without any underlying obligation or statistical basis.",
      ref: "ICAI AS 1 PDF Page 5, Para 17(a); ICAI AS 29 (Provisions, Contingent Liabilities and Contingent Assets) Para 14.",
      refPage: 5
    },
    {
      title: "Case 6: Substance Over Form in Hire Purchase / Finance Lease Asset",
      difficulty: "INTERMEDIATE",
      paraRef: "Para 17(b)",
      facts: "Logistics Express LLP acquired 5 heavy-duty cargo trucks under a hire purchase agreement. The agreement requires monthly installments over 5 years. LLP has full operational control over the trucks, maintains them, and bears all risks of damage. However, the legal title will remain with the finance company until the final installment is paid. LLP records the installments as rent expenses in the P&L, claiming they do not legally own the assets.",
      issue: "Does this accounting treatment comply with the 'Substance over Form' principle of AS 1?",
      principle: "Transactions and events should be accounted for and presented in accordance with their economic substance and commercial reality, and not merely their legal form. Under AS 1, the economic control and transfer of risks and rewards take precedence over the legal title.",
      analysis: "The commercial reality is that LLP is acquiring the trucks and financing them via a loan. They bear the risks (maintenance, accidents) and enjoy the rewards (revenue generation). Treating this as a simple rental ignores the fact that they have acquired an asset and incurred a long-term liability. This is a classic violation of substance over form.",
      treatment: "Capitalise the trucks at their cash purchase price as Property, Plant & Equipment. Record a corresponding liability for the hire purchase loan. Charge depreciation on the trucks and accrue interest expense on the outstanding loan liability.",
      disclosure: "Disclose the accounting policy for assets acquired under hire purchase/finance lease, detailing the carrying amount of the assets and the outstanding loan installments.",
      auditorView: "Verify the lease/hire purchase agreement terms. Require capitalization. If management refuses, qualify the report for off-balance sheet financing.",
      importance: "Corrects key financial indicators like debt-to-equity ratio and return on assets, which are distorted by off-balance sheet lease treatments.",
      trap: "Allowing companies to keep major capital assets off the balance sheet by structuring agreements as lease or hire purchase contracts.",
      ref: "ICAI AS 1 PDF Page 5, Para 17(b); ICAI AS 19 (Leases) Para 26.",
      refPage: 5
    },
    {
      title: "Case 7: Materiality in Small Assets Capitalization",
      difficulty: "BEGINNER",
      paraRef: "Para 17(c)",
      facts: "Global IT Solutions Ltd has 3,000 employees. Every year, it purchases office stationery, mice, and keyboards. The average cost per item is ₹600, totalling ₹18 Lakhs. The accounts team capitalises each mouse and keyboard as Property, Plant & Equipment and depreciates them over 3 years.",
      issue: "Is the capitalization of small office tools appropriate under the Materiality principle of AS 1?",
      principle: "Financial statements should disclose all 'material' items—meaning items the knowledge of which might influence the economic decisions of users. Materiality depends on the size and nature of the item. Immaterial items can be expensed immediately to avoid unnecessary administrative costs.",
      analysis: "While keyboards and mice are capital assets (useful life > 1 year), their individual value is extremely small. The cost of tracking, tagging, and computing depreciation for 3,000 individual keyboards outweighs any benefit to financial statement users. Capitalising them creates administrative clutter without affecting a user's economic decision.",
      treatment: "Expense the ₹18 Lakhs immediately to the P&L as office expenses in the year of purchase.",
      disclosure: "No specific disclosure is required as the item is immaterial to the financial statements as a whole.",
      auditorView: "Support the immediate expensing of such small items. Check if the company has a standard capitalization threshold policy (e.g., expensing all assets costing less than ₹5,000) and ensure it is applied consistently.",
      importance: "Streamlines the fixed asset register and reduces accounting overhead.",
      trap: "A company changing its capitalization threshold downwards mid-year to capitalize expenses and artificially boost profits.",
      ref: "ICAI AS 1 PDF Page 5, Para 17(c); ICAI AS 10 (Property, Plant and Equipment) Para 9.",
      refPage: 5
    },
    {
      title: "Case 8: Disclosure Cures No Wrong (Head Office Salaries Wrong Capitalization)",
      difficulty: "ADVANCED",
      paraRef: "Para 23",
      facts: "Realcon Developers Ltd capitalized ₹40 Lakhs of corporate head office administrative salaries under 'Work-in-Progress (Inventory)' to increase current assets. In Note 1, they disclosed: 'The company capitalises corporate head office administrative salaries as part of inventory cost.'",
      issue: "Can this disclosure remedy the wrong treatment under AS 1?",
      principle: "A fundamental rule of AS 1 is that disclosure of accounting policies or of changes therein cannot remedy a wrong or inappropriate treatment of an item in the accounts. For example, if a revenue expenditure is wrongly capitalized, merely disclosing this treatment in the notes does not make it correct under GAAP; the auditor must qualify the report.",
      analysis: "The capitalization of head office corporate salaries under WIP inventory directly violates AS 2 (Valuation of Inventories) and AS 10 (Property, Plant and Equipment), as it is an indirect administrative expense unrelated to production. Note 1 disclosure of an incorrect accounting treatment cannot make it correct or prevent an audit qualification.",
      treatment: "Reverse the capitalized ₹40 Lakhs from Work-in-Progress inventory and expense it directly in the P&L statement as employee benefit expenses.",
      disclosure: "Disclose the head office administrative salaries under Employee Benefit Expenses in the P&L notes, and ensure no administrative overhead is included in the valuation of inventory.",
      auditorView: "Issue a qualified or adverse audit opinion if the company refuses to reverse the capitalization, as the disclosure does not cure the deviation from GAAP.",
      importance: "Prevents the inflation of profits and inventory values by dumping administrative costs into asset values.",
      trap: "Believing that 'full transparent disclosure' of a wrong treatment absolves the entity from GAAP compliance.",
      ref: "ICAI AS 1 PDF Page 5, Para 23; ICAI AS 2 Para 12-13.",
      refPage: 5
    },
    {
      title: "Case 9: Non-Disclosure of Revenue Recognition Policy in SaaS Business",
      difficulty: "INTERMEDIATE",
      paraRef: "Para 24",
      facts: "CloudFlow India Pvt Ltd is a SaaS provider offering annual cloud subscription plans. The company receives 100% of the subscription fees upfront but recognizes the entire receipt as revenue on day 1. Note 1 to their financial statements lists standard accounting policies (depreciation, taxes) but is completely silent on how SaaS revenue is recognized.",
      issue: "Does the omission of the revenue recognition policy violate AS 1, and what is the impact on financial statement comparability?",
      principle: "Under AS 1, all significant accounting policies adopted in the preparation of financial statements must be disclosed, particularly in areas where different policies are encountered (such as revenue recognition). The disclosure must form part of the financial statements.",
      analysis: "Revenue recognition is the single most critical policy for a software subscription business. By omitting the policy and recognizing upfront annual cash receipts as immediate revenue (violating AS 9 and the accrual assumption), the company is presenting a misleading revenue growth figure. The complete lack of policy disclosure prevents users from identifying this aggressive accounting treatment.",
      treatment: "Recognize revenue pro-rata over the 12-month subscription period. Record the unearned portion as Deferred Revenue under Current Liabilities. Disclose the revenue recognition policy clearly in Note 1.",
      disclosure: "Note 1 must explicitly state: 'Subscription revenue is recognized on a straight-line basis over the term of the respective contract. Fees received in advance are deferred and recognized as unearned revenue under current liabilities.'",
      auditorView: "Insist on the inclusion of the revenue recognition policy. If management refuses or continues recognizing cash upfront, qualify the audit report for GAAP non-compliance.",
      importance: "Ensures revenue matches the period of service delivery, protecting investors from inflated top-line figures.",
      trap: "Assuming that a generic statement like 'Revenue is recognized when invoiced' constitutes a sufficient policy disclosure.",
      ref: "ICAI AS 1 PDF Page 5, Para 24; ICAI AS 9 (Revenue Recognition) Para 11-12.",
      refPage: 5
    },
    {
      title: "Case 10: Change in Accounting Policy Solely for Tax / Profit Window Dressing",
      difficulty: "ADVANCED",
      paraRef: "Para 22",
      facts: "BuildWell Ltd, a construction contractor, is bidding for a major NHAI highway project. The pre-qualification criteria require a net profit margin of at least 8% in the preceding fiscal year. The company's projected margin is 6% using the Percentage of Completion Method (POCM) as per AS 7. The board decides to change its revenue recognition policy to a hybrid method that accelerates profit recognition on near-complete projects, solely to meet the 8% target.",
      issue: "Is the change in accounting policy valid under AS 1, and how should it be evaluated?",
      principle: "A change in accounting policy is permitted under AS 1 only if: (a) required by statute, (b) required for compliance with an accounting standard, or (c) results in a more appropriate presentation of financial statements. A change made solely to meet a regulatory or tender target is not a valid justification.",
      analysis: "The proposed change is not driven by any new law or standard. It also does not result in a 'more appropriate presentation'—it is a selective modification designed to window-dress the profits for a tender bid. Changing policy for window dressing violates the fundamental qualitative characteristics of reliability and comparability.",
      treatment: "Reject the change. Continue recognizing construction revenue using the standard Percentage of Completion Method (POCM) in compliance with AS 7.",
      disclosure: "If the policy is changed without justification, the company faces material deviation. If a valid policy change were to occur, it must disclose the nature of the change, the reason, and the quantified profit impact.",
      auditorView: "Object to the change. If management implements it anyway, qualify the audit report and state that the change lacks justification and violates AS 1 and AS 7.",
      importance: "Maintains consistency in financial reporting and prevents opportunistic manipulation of profits.",
      trap: "Management justifying window-dressing changes under the vague excuse of 'aligning with industry best practices'.",
      ref: "ICAI AS 1 PDF Page 5, Para 22; ICAI AS 7 (Construction Contracts) Para 29-32.",
      refPage: 5
    }
  ]

  const activeCase = cases[selectedCaseIdx]

  return (
    <div className="w-full space-y-6 font-sans">
      <div className="bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-2xl p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Master Sidebar Pane */}
          <div className="w-full lg:w-1/3 space-y-2 border-r-0 lg:border-r border-[#E2E1DD] dark:border-gray-800 pr-0 lg:pr-6">
            <h4 className="text-xs font-bold text-slate-450 dark:text-gray-450 uppercase tracking-widest mb-3.5 pl-2.5">
              Select Case Study
            </h4>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:block space-y-1.5 max-h-[620px] overflow-y-auto pr-1">
              {cases.map((c, idx) => {
                const isSelected = selectedCaseIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedCaseIdx(idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col gap-1.5 ${
                      isSelected
                        ? "bg-[#EEF2FD] border-[#2D5BE3] dark:bg-[#1A2542] dark:border-blue-500 text-slate-900 dark:text-white"
                        : "bg-white hover:bg-slate-50 dark:bg-transparent border-[#E2E1DD] dark:border-gray-800 text-slate-705 dark:text-gray-400"
                    }`}
                  >
                    <span className="text-[12.5px] font-extrabold leading-snug">
                      {c.title}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        c.difficulty === "BEGINNER"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-450 border border-emerald-250/40"
                          : c.difficulty === "INTERMEDIATE"
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-450 border border-blue-250/40"
                          : "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-450 border border-rose-250/40"
                      }`}>
                        {c.difficulty}
                      </span>
                      <span className="text-[10px] text-slate-450 dark:text-gray-500 font-bold">
                        {c.paraRef}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Mobile / Tablet Dropdown Selector */}
            <div className="block lg:hidden w-full">
              <select
                value={selectedCaseIdx}
                onChange={(e) => setSelectedCaseIdx(Number(e.target.value))}
                className="w-full bg-[#FAFAF8] dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 rounded-lg p-3 text-xs font-bold text-slate-800 dark:text-white outline-none"
              >
                {cases.map((c, idx) => (
                  <option key={idx} value={idx}>
                    {c.title} ({c.difficulty})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Details Pane */}
          <div className="flex-1 space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E1DD]/60 dark:border-gray-800/60 pb-4">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
                  {activeCase.title}
                </h3>
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 dark:text-gray-450">
                  <span>Difficulty:</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                    activeCase.difficulty === "BEGINNER"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-450"
                      : activeCase.difficulty === "INTERMEDIATE"
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-450"
                      : "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-450"
                  }`}>
                    {activeCase.difficulty}
                  </span>
                  <span className="mx-1">•</span>
                  <span>Section:</span>
                  <span className="bg-slate-100 dark:bg-slate-850 px-2 py-0.5 rounded text-slate-700 dark:text-gray-300">
                    {activeCase.paraRef}
                  </span>
                </div>
              </div>
            </div>

            {/* Structured Breakdown: 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left Column: Context */}
              <div className="space-y-4">
                {/* 2. Facts */}
                <div className="bg-[#FAFAF8] dark:bg-[#171C2B] p-4 sm:p-5 rounded-xl border border-[#E2E1DD] dark:border-gray-800">
                  <h5 className="text-[11px] font-bold text-slate-450 dark:text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <span>📋</span> 1. Facts
                  </h5>
                  <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                    {activeCase.facts}
                  </p>
                </div>

                {/* 3. Issue */}
                <div className="bg-[#FFFDF5] dark:bg-[#25201A] p-4 sm:p-5 rounded-xl border border-[#F6EED5] dark:border-amber-900/30">
                  <h5 className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <span>🔍</span> 2. The Issue
                  </h5>
                  <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                    {activeCase.issue}
                  </p>
                </div>

                {/* 4. Relevant AS 1 Principle */}
                <div className="bg-[#F5F8FF] dark:bg-[#1A2035] p-4 sm:p-5 rounded-xl border border-[#DCE4FF] dark:border-blue-900/30">
                  <h5 className="text-[11px] font-bold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <span>⚖️</span> 3. Relevant AS 1 Principle
                  </h5>
                  <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                    {activeCase.principle}
                  </p>
                </div>
              </div>

              {/* Right Column: Implementation */}
              <div className="space-y-4">
                {/* 5. Analysis */}
                <div className="bg-[#F5F5FF] dark:bg-[#1F1A35] p-4 sm:p-5 rounded-xl border border-[#E1E1FF] dark:border-indigo-900/30">
                  <h5 className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <span>⚙️</span> 4. Analysis &amp; Legal Application
                  </h5>
                  <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                    {activeCase.analysis}
                  </p>
                </div>

                {/* 6. Correct Accounting Treatment */}
                <div className="bg-[#F6FCF8] dark:bg-[#17271F] p-4 sm:p-5 rounded-xl border border-[#D2ECD9] dark:border-green-900/30">
                  <h5 className="text-[11px] font-bold text-emerald-600 dark:text-emerald-450 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <span>✏️</span> 5. Correct Accounting Treatment
                  </h5>
                  <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                    {activeCase.treatment}
                  </p>
                </div>

                {/* 7. Disclosure Requirement */}
                <div className="bg-[#FCF5FF] dark:bg-[#251A35] p-4 sm:p-5 rounded-xl border border-[#F2DCFF] dark:border-purple-900/30">
                  <h5 className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <span>📝</span> 6. Disclosure Requirement
                  </h5>
                  <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                    {activeCase.disclosure}
                  </p>
                </div>
              </div>
            </div>

            {/* Full Width Panels */}
            <div className="space-y-4 pt-1">
              {/* 8. Auditor's View */}
              <div className="bg-[#FFF5F5] dark:bg-[#2A1E1E] p-5 rounded-xl border border-[#FFE1E1] dark:border-red-950/60">
                <h5 className="text-[11px] font-bold text-red-650 dark:text-red-400 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                  <span>🚨</span> 7. Auditor&apos;s View &amp; Reporting Impact
                </h5>
                <p className="text-xs text-slate-700 dark:text-gray-350 leading-relaxed font-semibold">
                  {activeCase.auditorView}
                </p>
              </div>

              {/* 9. Real-life Importance */}
              <div className="bg-slate-50 dark:bg-[#1E2640]/40 p-5 rounded-xl border border-slate-200 dark:border-gray-800">
                <h5 className="text-[11px] font-bold text-slate-650 dark:text-gray-300 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                  <span>💡</span> 8. Commercial Real-Life Importance
                </h5>
                <p className="text-xs text-slate-700 dark:text-gray-350 leading-relaxed font-semibold">
                  {activeCase.importance}
                </p>
              </div>

              {/* 10. Common Trap / Red Flag */}
              <div className="bg-[#FFF9F5] dark:bg-[#2B2117] p-5 rounded-xl border-l-4 border-orange-500 border-t border-b border-r border-[#FFE9DC] dark:border-orange-950/40">
                <h5 className="text-[11px] font-bold text-orange-650 dark:text-orange-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <span>⚠️</span> 9. Common Trap / Red Flag
                </h5>
                <p className="text-xs text-orange-900 dark:text-orange-355 leading-relaxed font-bold">
                  {activeCase.trap}
                </p>
              </div>

              {/* 11. Reference Footnote */}
              <div className="pt-2 text-[10.5px] text-slate-450 dark:text-gray-500 font-bold flex items-center gap-1.5">
                <span>🔗</span>
                <span>Reference Sources:</span>
                <span className="text-slate-600 dark:text-gray-300">
                  {activeCase.ref}
                </span>
                {activeCase.refPage && (
                  <span className="flex items-center gap-0.5 shrink-0 ml-1">
                    [PDF page: <PdfRef page={activeCase.refPage} />]
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
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
                  {currentStandard.blocks && Array.isArray(currentStandard.blocks) && currentStandard.blocks.length > 0 ? (
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                        {/* Facts & Issue */}
                        <div className="space-y-4">
                          <div className="bg-[#FAFAF8] dark:bg-[#1C2335]/30 p-4 sm:p-5 rounded-xl border border-[#E2E1DD]/80 dark:border-gray-800/80">
                            <p className="text-[10.5px] text-[#A0A0A8] dark:text-gray-400 font-extrabold uppercase tracking-wider mb-2.5">
                              Facts
                            </p>
                            <p className="text-xs text-[#33333A] dark:text-gray-250 leading-relaxed font-semibold">
                              {renderTextWithReferences(item.scenario)}
                            </p>
                          </div>
                          
                          {item.working && (
                            <div className="bg-[#FAFAF8] dark:bg-[#1C2335]/30 p-4 sm:p-5 rounded-xl border border-[#E2E1DD]/80 dark:border-gray-800/80">
                              <p className="text-[10.5px] text-[#A0A0A8] dark:text-gray-400 font-extrabold uppercase tracking-wider mb-2.5">
                                Issue
                              </p>
                              <p className="text-xs text-[#33333A] dark:text-gray-250 leading-relaxed font-semibold">
                                {renderTextWithReferences(item.working)}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Analysis & Conclusion */}
                        <div className="space-y-4">
                          <div className="bg-[#E8F7EE] dark:bg-[#182B22]/40 p-4 sm:p-5 rounded-xl border border-[#C5E9D4]/60 dark:border-green-950/60">
                            <p className="text-[10.5px] text-[#1A7A4A] dark:text-emerald-400 font-extrabold uppercase tracking-wider mb-2.5">
                              Analysis &amp; Conclusion
                            </p>
                            <p className="text-xs text-[#2A2A35] dark:text-gray-250 leading-relaxed font-semibold">
                              {renderTextWithReferences(item.answer || item.guidance)}
                            </p>
                          </div>

                          {item.note && (
                            <div className="bg-[#FFF8E6] dark:bg-[#2C241B]/40 p-4 sm:p-5 rounded-xl border border-[#F5E1B8]/60 dark:border-amber-950/60">
                              <p className="text-[10.5px] text-[#B7791F] dark:text-amber-400 font-extrabold uppercase tracking-wider mb-1">
                                Key Takeaway / Note
                              </p>
                              <p className="text-xs text-[#33333A] dark:text-gray-205 leading-relaxed font-semibold">
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
                src={`/api/pdfs/${currentStandard.id}`}
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

