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
  X,
  Users,
  CreditCard,
  Briefcase,
  Globe,
  Award,
  AlertTriangle,
  TrendingUp,
  Check
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
  { id: 'overview',         title: '1. Introduction & Purpose' },
  { id: 'scope',            title: '2. Scope' },
  { id: 'definition',       title: '3. Definition of Policies' },
  { id: 'areas',            title: '4. Key Areas of Diversity' },
  { id: 'selection',        title: '5. Selection Considerations' },
  { id: 'prudence',         title: '5A. Prudence' },
  { id: 'substance',        title: '5B. Substance over Form' },
  { id: 'materiality',      title: '5C. Materiality' },
  { id: 'assumptions',      title: '6. Fundamental Assumptions' },
  { id: 'going-concern',    title: '6A. Going Concern' },
  { id: 'consistency',      title: '6B. Consistency' },
  { id: 'accrual',          title: '6C. Accrual' },
  { id: 'disclosure',       title: '7. Manner of Disclosure' },
  { id: 'change-policy',    title: '8. Disclosure of Changes' },
  { id: 'para23',           title: '8A. Para 23 Rule' },
  { id: 'footnotes',        title: '9. Statutory Footnotes' },
]

function AS1StandardTabContent({ navigateToPdfPage, renderTextWithReferences }: AS1StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    'depr': true,
  })
  const [diversitySearch, setDiversitySearch] = useState('')

  const toggleAccordion = (id: string) => {
    setOpenAccordions(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const sectionToChapterMap: Record<string, string> = {
    'overview': 'overview',
    'scope': 'scope',
    'definition': 'definition',
    'areas': 'areas',
    'selection': 'selection',
    'prudence': 'selection',
    'substance': 'selection',
    'materiality': 'selection',
    'assumptions': 'assumptions',
    'going-concern': 'assumptions',
    'consistency': 'assumptions',
    'accrual': 'assumptions',
    'disclosure': 'disclosure',
    'change-policy': 'change-policy',
    'para23': 'change-policy',
    'footnotes': 'footnotes'
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const secId = entry.target.id.replace('as1-', '');
            const chapterId = sectionToChapterMap[secId] || secId;
            setActiveSection(chapterId);
          }
        })
      },
      {
        rootMargin: '-110px 0px -55% 0px',
        threshold: 0
      }
    )

    as1Sections.forEach((sec) => {
      const el = document.getElementById(`as1-${sec.id}`)
      if (el) {
        observer.observe(el)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const PdfRef = ({ page }: { page: number }) => (
    <button
      onClick={() => navigateToPdfPage(page)}
      className="inline-flex items-center justify-center w-4 h-4 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-955/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-650 dark:text-red-400 rounded transition-all cursor-pointer select-none align-middle"
      title={`Open ICAI AS 1 PDF — Page ${page}`}
    >
      <FileText size={10} className="shrink-0" />
    </button>
  )

  const as1Chapters = [
    { id: 'overview',     title: 'Introduction' },
    { id: 'scope',        title: 'Scope' },
    { id: 'definition',   title: 'Definition of Policies' },
    { id: 'areas',        title: 'Areas of Diversity' },
    { id: 'selection',    title: 'Selection Considerations' },
    { id: 'assumptions',  title: 'Fundamental Assumptions' },
    { id: 'disclosure',   title: 'Disclosure Requirements' },
    { id: 'change-policy',title: 'Changes in Policies' },
    { id: 'footnotes',    title: 'Statutory Footnotes' }
  ]

  const ChapterHeader = ({ num, title, description }: { num: string; title: string; description: string }) => (
    <div className="w-full mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
      <h2 className="text-[17px] sm:text-[18px] font-serif font-semibold text-slate-800 dark:text-white tracking-tight leading-snug">
        {title}
      </h2>
      {description && (
        <p className="text-[13px] font-serif text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )

  const AccordionItem = ({ 
    id, 
    num, 
    title, 
    refStd, 
    choice, 
    impact, 
    detail 
  }: { 
    id: string; 
    num: string; 
    title: string; 
    refStd: string; 
    choice: string; 
    impact: string; 
    detail: string;
  }) => {
    const isOpen = openAccordions[id];
    return (
      <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-[#0b0f19] transition-all hover:shadow-xs w-full">
        <button
          onClick={() => toggleAccordion(id)}
          className="w-full text-left font-serif font-bold text-slate-900 dark:text-white hover:text-amber-705 dark:hover:text-amber-400 flex items-center justify-between p-4 select-none cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <span className="text-amber-700 dark:text-amber-500 font-mono text-xs font-bold bg-amber-50/30 dark:bg-amber-955/20 px-2.5 py-0.5 rounded border border-amber-200/30 dark:border-amber-900/30">
              {num}
            </span>
            <span className="text-sm sm:text-[15px] tracking-tight">{title}</span>
          </span>
          <ChevronDown 
            size={15} 
            className={`transform transition-transform text-slate-400 ${isOpen ? 'rotate-180 text-amber-700' : ''}`} 
          />
        </button>
        {isOpen && (
          <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/10 dark:bg-slate-900/10 p-6 space-y-4 font-serif text-[14.5px] w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-100 dark:border-slate-800/60 pb-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1 font-sans">
                  Standard Reference
                </span>
                <span className="text-slate-800 dark:text-slate-250 font-sans font-semibold text-xs bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-800 inline-block font-mono">
                  {refStd}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1 font-sans">
                  Key Policy Choice
                </span>
                <span className="text-slate-800 dark:text-slate-200 font-medium text-xs font-sans">
                  {choice}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1 font-sans">
                  Financial Impact
                </span>
                <span className="text-slate-700 dark:text-slate-350 leading-normal font-sans text-xs">
                  {impact}
                </span>
              </div>
            </div>
            <div className="text-slate-700 dark:text-slate-305 leading-relaxed font-serif text-[14px] pt-1">
              {detail}
            </div>
          </div>
        )}
      </div>
    );
  }

  const diversityAreas = [
    {
      id: 'depr',
      num: '4.1',
      title: 'Depreciation, Depletion, and Amortisation',
      refStd: 'AS 10 / AS 26',
      choice: 'SLM vs. WDV vs. Units of Production',
      impact: 'Affects asset carrying values, annual depreciation expense, net profits, and tax liability over useful lives.',
      detail: 'Enterprises have choices regarding how they write down the depreciable amount of tangible fixed assets, intangible assets, and natural resources over their useful lives. The primary methods include the Straight-Line Method (SLM), the Written Down Value (WDV) method, and the Units of Production method. Choosing SLM spreads the cost evenly, presenting stable profit figures, whereas WDV charges higher depreciation in the initial years, reducing initial profits and asset carrying values. Differences also arise in estimating the useful lives and residual values of similar assets.'
    },
    {
      id: 'inv',
      num: '4.2',
      title: 'Valuation of Inventories',
      refStd: 'AS 2',
      choice: 'FIFO vs. Weighted Average Cost formula',
      impact: 'Directly swings Cost of Goods Sold (COGS), closing inventory on the balance sheet, tax outflows, and reported net margins.',
      detail: 'For determining the cost of inventories under AS 2, enterprises may choose between cost formulas such as First-In, First-Out (FIFO) or Weighted Average. The FIFO method assumes older inventory is sold first, which in times of rising prices results in lower cost of goods sold, higher ending inventory valuation, and higher reported profits. The Weighted Average method smooths out price fluctuations. Additionally, differences exist in how enterprises allocate manufacturing overheads to inventory cost.'
    },
    {
      id: 'gdw',
      num: '4.3',
      title: 'Goodwill & Intangible Assets',
      refStd: 'AS 26',
      choice: 'Amortization Period & Impairment Rules',
      impact: 'Determines the duration and intensity of the amortization drag on annual operating profitability.',
      detail: 'Amortisation over estimated useful life vs. immediate write-off against reserves. Policies differ regarding whether goodwill generated through acquisitions is amortized over an estimated useful life or written off against reserves, as well as the methods used to estimate the useful lives of other intangible assets like patents, copyrights, and software.'
    },
    {
      id: 'invs',
      num: '4.4',
      title: 'Valuation of Investments',
      refStd: 'AS 13',
      choice: 'Current vs. Long-Term Classification & Cost vs. Fair Value',
      impact: 'Triggers P&L charges for temporary write-downs of current investments and long-term diminution impairments.',
      detail: 'Under AS 13, investments are classified as current or long-term. Current investments are valued at the lower of cost and fair value, which requires policy choices on how fair value is determined. Long-term investments are carried at cost, but policies differ on how enterprises determine and recognize provisions for a "diminution other than temporary" in the value of these investments.'
    },
    {
      id: 'ret',
      num: '4.5',
      title: 'Retirement & Employee Benefits',
      refStd: 'AS 15',
      choice: 'Actuarial Methods (PUC) & Turnover/Salary assumptions',
      impact: 'Directly alters liability provisions for gratuity/pension and defined benefit costs on the P&L.',
      detail: 'Accounting for employee benefits under AS 15 involves significant policy variations. Enterprises may account for gratuity, pension, and leave encashment using actuarial valuation methods (such as the Projected Unit Credit method) or, in the case of small enterprises, on an accrual basis using simpler estimates. The choice of discount rates, salary escalation rates, and mortality tables varies based on actuarial assumptions.'
    },
    {
      id: 'cnt',
      num: '4.6',
      title: 'Long-Term Contracts',
      refStd: 'AS 7',
      choice: 'Percentage of Completion (POCM) stage estimation methods',
      impact: 'Determines the timing of revenue and profit recognition across multi-year contract durations.',
      detail: 'Under AS 7, enterprises engaged in construction or long-term service contracts must determine the stage of completion. Policies differ in measuring the stage of completion, such as comparing contract costs incurred to date with total estimated contract costs (cost-to-cost method), physical surveys of work performed, or physical completion of a physical proportion of the contract work.'
    },
    {
      id: 'fxd',
      num: '4.7',
      title: 'Valuation of Fixed Assets',
      refStd: 'AS 10',
      choice: 'Cost Model vs. Revaluation Model & Capitalization limits',
      impact: 'Alters asset base (net worth) on the balance sheet and depreciation levels in the P&L.',
      detail: 'Policies vary regarding whether property, plant, and equipment are carried at historical cost less accumulated depreciation or periodically revalued. Furthermore, enterprises adopt different policies regarding the capitalization of borrowing costs under AS 16 and the treatment of direct and indirect overheads during construction of self-constructed fixed assets.'
    },
    {
      id: 'ctg',
      num: '4.8',
      title: 'Contingent Liabilities & Provisions',
      refStd: 'AS 29',
      choice: 'Outflow probability classification thresholds',
      impact: 'Determines whether a transaction is charged as a liability provision or merely disclosed as a footnote.',
      detail: 'Under AS 29, management must assess the probability of outflows of resources embodying economic benefits to decide whether to recognize a provision in the balance sheet or disclose a contingent liability in the notes. The threshold of probability ("probable", "possible", or "remote") and the method of estimating the provision require significant management judgment, leading to diversity.'
    },
    {
      id: 'fcy',
      num: '4.9',
      title: 'Foreign Currency Translation',
      refStd: 'AS 11',
      choice: 'Integral vs. Non-Integral Classification & Exchange difference booking',
      impact: 'Directly controls exchange rate gain/loss volatility in the P&L vs. deferral in foreign currency reserves.',
      detail: 'Under AS 11, translation of foreign currency transactions and foreign operations depends on whether the operation is classified as integral or non-integral. Policies differ in translating foreign branch accounts and recognizing exchange gains or losses (charging directly to the profit and loss account or deferring in a foreign currency translation reserve).'
    },
    {
      id: 'gov',
      num: '4.10',
      title: 'Government Grants',
      refStd: 'AS 12',
      choice: 'Capital approach (Reserves) vs. Income approach (P&L/Asset deduction)',
      impact: 'Alters the capital buffer vs. annual reported income and subsequent depreciation levels.',
      detail: 'Under AS 12, government grants may be treated as capital receipts (credited to capital reserve) or revenue receipts (credited to the profit and loss account or deducted from the cost of the related asset), depending on the nature of the grant and the conditions attached to it.'
    },
    {
      id: 'rnd',
      num: '4.11',
      title: 'Research & Development',
      refStd: 'AS 26',
      choice: 'Timing of phase transition & Capitalization checks',
      impact: 'Dictates current year expensing (depressing earnings) vs. capitalization (asset building and deferred amortization).',
      detail: 'Under AS 26, research costs are always expensed as incurred, but development costs must be capitalized if specific criteria are met. The timing of when an asset enters the development phase and meets capitalization criteria involves substantial judgment, leading to differences.'
    },
    {
      id: 'pat',
      num: '4.12',
      title: 'Patents, Trademarks, and Franchise Rights',
      refStd: 'AS 26',
      choice: 'Internal vs. Acquired cost assignments & Amortization useful lives',
      impact: 'Determines the carrying values of intellectual properties and amortization levels.',
      detail: 'Policies differ in how cost is assigned to internally generated intangible assets versus acquired intangible assets, and the methods used to amortize these assets over their estimated useful economic lives.'
    },
    {
      id: 'rev',
      num: '4.13',
      title: 'Revenue Recognition',
      refStd: 'AS 9',
      choice: 'Risks & rewards transfer criteria (Dispatch vs. Delivery vs. Acceptance)',
      impact: 'Alters sales revenues and profit realization timings between accounting cycles.',
      detail: 'Under AS 9, revenue recognition depends on the transfer of significant risks and rewards of ownership to the buyer. Policy differences arise in determining the point of transfer (e.g., dispatch, delivery, or acceptance) and in recognizing revenue from services (percentage of completion vs. completed service method).'
    },
    {
      id: 'lse',
      num: '4.14',
      title: 'Leases & Hire-Purchase',
      refStd: 'AS 19',
      choice: 'Finance vs. Operating lease classification boundaries',
      impact: 'Dictates off-balance sheet operating rents vs. on-balance sheet lease asset capitalization.',
      detail: 'Under AS 19, leases are classified as finance or operating leases. Policy variations arise in the classification criteria, such as determining whether the lease term covers the major part of the economic life of the asset, or whether the present value of minimum lease payments amounts to at least substantially all of the fair value of the leased asset.'
    },
    {
      id: 'cst',
      num: '4.15',
      title: 'Expenditure during Construction',
      refStd: 'AS 10',
      choice: 'Indirect overhead allocation & Trial-run capitalization rules',
      impact: 'Determines capitalized asset costs (reducing operational costs) vs. immediate operational expense hits.',
      detail: 'Enterprises adopt different policies regarding the allocation of indirect administration and overhead expenses to fixed assets under construction, and the capitalization of start-up and trial-run expenses prior to commencement of commercial production.'
    }
  ];

  const filteredDiversityAreas = diversityAreas.filter(area =>
    area.title.toLowerCase().includes(diversitySearch.toLowerCase()) ||
    area.detail.toLowerCase().includes(diversitySearch.toLowerCase()) ||
    area.choice.toLowerCase().includes(diversitySearch.toLowerCase())
  );

  return (
    <div className="w-full animate-fade-in font-sans bg-white dark:bg-[#0b0f19] -m-4 md:-m-6">
      {/* Sticky Contents Bar */}
      <div id="as1-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#0b0f19] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
            {as1Chapters.map((sec) => (
              <button
                key={sec.id}
                onClick={() => {
                  const el = document.getElementById(`as1-${sec.id}`);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`transition-all cursor-pointer px-3 py-1.5 rounded-full text-[11px] font-sans font-semibold tracking-wide shrink-0 border ${
                  activeSection === sec.id
                    ? 'text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-250 dark:border-amber-800/80 shadow-3xs font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 border-transparent hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Publication Sheet Canvas - White document feel */}
      <div className="w-full bg-white dark:bg-[#0b0f19] px-4 sm:px-8 lg:px-10 py-10 sm:py-14 space-y-20 relative">

        {/* Chapter 1: Introduction & Purpose */}
        <section id="as1-overview" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="I" 
            title="Introduction &amp; Purpose of the Standard" 
            description="Overview of the primary causes of diversity in financial reporting, the inherent limits of accounting standardization, and the qualitative necessity of systematic policy disclosure to ensure comparability."
          />
          
          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
            <p>
              Irrespective of the extent of standardization, diversity in accounting policies is unavoidable for two primary reasons:
            </p>
          </div>

          {/* Premium Side-by-Side non-card layouts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 w-full font-serif border-y border-slate-100 dark:border-slate-800/50 py-8">
            <div className="pl-6 border-l-2 border-amber-600 dark:border-amber-500 space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">Standardization Limits</h4>
              <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
                Accounting standards cannot and do not cover all possible areas of accounting, leaving enterprises with the freedom to adopt any reasonable accounting policy in areas not covered by a standard. <PdfRef page={2} />
              </p>
            </div>
            <div className="pl-6 border-l-2 border-amber-600 dark:border-amber-500 space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">Operating Diversity</h4>
              <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
                Since enterprises operate in diverse situations, it is impossible to develop a single set of policies applicable to all enterprises for all time. <PdfRef page={2} />
              </p>
            </div>
          </div>

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
            <p>
              Differences in accounting policies lead to differences in reported financial information even if the underlying transactions are identical.
            </p>
            <p>
              The qualitative characteristic of comparability of financial statements, therefore, suffers due to this diversity of accounting policies. Since uniformity is impossible, and accounting standards permit alternatives, it is not enough to say that all standards have been complied with. <PdfRef page={2} />
            </p>
            
            <div className="p-6 my-8 border-l-4 border-amber-600 dark:border-amber-500 bg-amber-50/10 dark:bg-amber-955/5 rounded-r-lg font-serif">
              <p className="text-[15.5px] font-medium text-slate-850 dark:text-slate-200 leading-relaxed">
                For these reasons, Accounting Standard 1 requires enterprises to disclose significant accounting policies actually adopted by them in the preparation of their financial statements. Such disclosures allow the users of financial statements to take the differences in accounting policies into consideration and to make necessary adjustments in their analysis of such financial statements. <PdfRef page={2} />
              </p>
            </div>

            <p>
              The purpose of Accounting Standard 1, Disclosure of Accounting Policies, is to promote a better understanding of financial statements by requiring disclosure of significant accounting policies in an orderly manner. Such disclosures facilitate more meaningful comparison between financial statements of different enterprises for the same accounting period, and the disclosure of changes in accounting policies allows users to compare financial statements of the same enterprise for different periods. <PdfRef page={2} />
            </p>
          </div>
        </section>

        {/* Chapter 2: Scope & Applicability */}
        <section id="as1-scope" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="II" 
            title="Scope &amp; Applicability of the Standard" 
            description="Universal mandate under the Companies Act 2013 and ICAI guidelines, mapping diverse stakeholder groups to their explicit financial statement interpretation needs."
          />
          
          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
            <p>
              This standard should be applied in the disclosure of all significant accounting policies adopted in the preparation and presentation of financial statements. Financial statements are prepared for the use of various stakeholders:
            </p>
          </div>

          {/* Clean table for stakeholders */}
          <div className="my-8 overflow-x-auto border-t border-b border-slate-200 dark:border-slate-800 w-full">
            <table className="w-full text-left border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 font-sans text-xs uppercase tracking-wider text-slate-900 dark:text-white bg-slate-50/50 dark:bg-[#161f33]/30">
                  <th className="py-3.5 px-5 font-bold w-1/3">Stakeholder Group</th>
                  <th className="py-3.5 px-5 font-bold w-2/3">Analytical Needs &amp; Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-serif">
                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-5 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider flex items-center gap-2">
                    <Users size={14} className="text-amber-700 dark:text-amber-505 shrink-0" />
                    <span>Shareholders &amp; Investors</span>
                  </td>
                  <td className="py-4 px-5 leading-relaxed">Require accounting policy clarity to evaluate profit quality, calculate return on investment, and compare business earnings.</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-5 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider flex items-center gap-2">
                    <CreditCard size={14} className="text-amber-700 dark:text-amber-505 shrink-0" />
                    <span>Creditors &amp; Suppliers</span>
                  </td>
                  <td className="py-4 px-5 leading-relaxed">Analyze inventory valuation and accrual policies to gauge working capital sufficiency and liquidity cycles.</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-5 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider flex items-center gap-2">
                    <Briefcase size={14} className="text-amber-700 dark:text-amber-505 shrink-0" />
                    <span>Banks &amp; Lenders</span>
                  </td>
                  <td className="py-4 px-5 leading-relaxed">Require consistent policy application to evaluate debt service coverage ratios and compliance with loan covenants.</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-5 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider flex items-center gap-2">
                    <Scale size={14} className="text-amber-700 dark:text-amber-505 shrink-0" />
                    <span>Regulators &amp; Tax Authorities</span>
                  </td>
                  <td className="py-4 px-5 leading-relaxed">Monitor statutory compliance and taxation based on standard-compliant financial statements.</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-5 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider flex items-center gap-2">
                    <Globe size={14} className="text-amber-700 dark:text-amber-505 shrink-0" />
                    <span>Employees &amp; Public</span>
                  </td>
                  <td className="py-4 px-5 leading-relaxed">Assess the stability, employment prospects, and growth path of the enterprise.</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
            <p>
              Consequently, disclosures regarding the accounting policies adopted by an enterprise are critical for ensuring that these statements are interpreted correctly. Under the framework established by the Institute of Chartered Accountants of India (ICAI) and the Companies Act, 2013, the applicability of AS 1 is universal across all classes of enterprises, including corporate and non-corporate entities. Compliance is mandated by Section 129(1) of the Companies Act, 2013, while for non-corporate entities compliance is required under the announcements and guidelines issued by the ICAI.
            </p>
          </div>
        </section>

        {/* Chapter 3: Definition of Accounting Policies */}
        <section id="as1-definition" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="III" 
            title="Definition of Accounting Policies" 
            description="Formal definitions of Accounting Policies, contrasting accounting principles with their practical methods of application, and distinguishing policies from management estimates under statutory guidelines."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
            <p>
              Accounting policies refer to the specific accounting principles and the methods of applying those principles adopted by the enterprise in the preparation and presentation of financial statements. <PdfRef page={4} />
            </p>
          </div>
          
          {/* Table 1: Principles vs Methods */}
          <div className="my-8 space-y-3 w-full">
            <div className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider font-mono">Table 1: accounting principles vs. methods of application</div>
            <div className="overflow-x-auto border-t border-b border-slate-200 dark:border-slate-800 w-full">
              <table className="w-full text-left border-collapse text-[13.5px]">
                <thead>
                  <tr className="border-b border-slate-205 dark:border-slate-800 font-sans text-xs uppercase tracking-wider text-slate-900 dark:text-white bg-slate-50/50 dark:bg-[#161f33]/30">
                    <th className="py-3 px-4 font-bold w-1/2">Accounting Principles</th>
                    <th className="py-3 px-4 font-bold w-1/2">Methods of Applying Principles</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 dark:text-slate-300 font-serif divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="py-4 px-4 leading-relaxed align-top">
                      The core conceptual bases and measurement models chosen for recording economic events and transactions in the financial books (for example, historical cost, revaluation model, or net realizable value).
                    </td>
                    <td className="py-4 px-4 leading-relaxed align-top">
                      The specific procedures, formulas, or methods used to implement those principles (for example, FIFO or Weighted Average formulas for inventory, or Straight-Line or WDV methods for depreciation).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
            <p>
              Accounting involves both science and art. It is a science because it is based on structured, tested, and universally applicable accounting principles and frameworks. Simultaneously, it is an art because the practical application of these principles relies heavily on the personal ability, professional judgment, and estimates of the accountant. Since different accountants and management teams may exercise judgment differently under similar circumstances, enterprises within the same industry often adopt different accounting policies. <PdfRef page={5} />
            </p>
          </div>
          
          {/* Table 2: Policies vs Estimates */}
          <div className="my-8 space-y-3 w-full">
            <div className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider font-mono">Table 2: accounting policies vs. accounting estimates</div>
            <div className="overflow-x-auto border-t border-b border-slate-200 dark:border-slate-800 w-full">
              <table className="w-full text-left border-collapse text-[13.5px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 font-sans text-xs uppercase tracking-wider text-slate-900 dark:text-white bg-slate-50/50 dark:bg-[#161f33]/30">
                    <th className="py-3.5 px-4 font-bold w-1/4">Attribute</th>
                    <th className="py-3.5 px-4 font-bold w-3/8">Accounting Policy</th>
                    <th className="py-3.5 px-4 font-bold w-3/8">Accounting Estimate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-serif">
                  <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Definition</td>
                    <td className="py-3.5 px-4 leading-relaxed">Specific accounting principles and the methods of applying those principles.</td>
                    <td className="py-3.5 px-4 leading-relaxed">Judgments made to estimate the carrying value of assets or liabilities under the selected policy.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Responsibility</td>
                    <td className="py-3.5 px-4 leading-relaxed">Board of Directors (statutory Directors' Responsibility Statement under Section 134(5)).</td>
                    <td className="py-3.5 px-4 leading-relaxed">Management and operational accountants based on the latest available information.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Examples</td>
                    <td className="py-3.5 px-4 leading-relaxed">Switching from FIFO to Weighted Average cost formula.</td>
                    <td className="py-3.5 px-4 leading-relaxed">Estimating provision for non-moving inventory based on a technical evaluation.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Change Basis</td>
                    <td className="py-3.5 px-4 leading-relaxed">Only if required by statute, standard, or for a more appropriate presentation.</td>
                    <td className="py-3.5 px-4 leading-relaxed">Revised if circumstances change, new information becomes available, or experience develops.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Chapter 4: Key Areas of Diversity in Accounting Policies */}
        <section id="as1-areas" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="IV" 
            title="Key Areas of Diversity in Accounting Policies" 
            description="The 15 critical operational domains where Indian Accounting Standards permit alternative treatments, causing potential divergence in financial reports."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
            <p>
              The standard identifies major areas where different accounting policies can be adopted by different enterprises. These alternative treatments are permitted because of differences in the operating environments and business models of entities. <PdfRef page={5} />
            </p>
          </div>

          {/* Interactive Search Tool */}
          <div className="w-full my-6 font-sans">
            <div className="relative">
              <Search className="absolute left-3 top-3.5 text-slate-400" size={15} />
              <input
                type="text"
                placeholder="Search diversity areas by keyword (e.g., depreciation, inventory)..."
                value={diversitySearch}
                onChange={(e) => setDiversitySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-3 text-xs bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-650 transition-all font-semibold"
              />
              {diversitySearch && (
                <button 
                  onClick={() => setDiversitySearch('')}
                  className="absolute right-3 top-3 text-[10px] uppercase font-bold text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="space-y-4 w-full">
            {filteredDiversityAreas.length > 0 ? (
              filteredDiversityAreas.map((area) => (
                <AccordionItem
                  key={area.id}
                  id={area.id}
                  num={area.num}
                  title={area.title}
                  refStd={area.refStd}
                  choice={area.choice}
                  impact={area.impact}
                  detail={area.detail}
                />
              ))
            ) : (
              <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl font-serif text-slate-500">
                No matching diversity areas found for "{diversitySearch}".
              </div>
            )}
          </div>
        </section>

        {/* Chapter 5: Selection Considerations */}
        <section id="as1-selection" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="V" 
            title="Considerations in Selection of Accounting Policies" 
            description="The primary qualitative parameters governing management's choice of accounting policies to ensure a true and fair view."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
            <p>
              The primary consideration in selecting accounting policies is that the financial statements should represent a true and fair view of the financial position and performance of the enterprise. The standard specifies three secondary considerations to achieve this primary objective: <PdfRef page={6} />
            </p>
          </div>

          {/* 3-Column Comparison Matrix (No cards) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-8 font-serif border-t border-b border-slate-200 dark:border-slate-800 py-8 w-full">
            <div className="space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">1. Prudence</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-700 dark:text-slate-300">
                Caution in prepared judgments: profits are recognized only when realized, and provisions are made for all known liabilities and losses.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">2. Substance over Form</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-700 dark:text-slate-300">
                Accounting for economic reality and financial substance rather than legal technicalities.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">3. Materiality</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-700 dark:text-slate-300">
                Disclosing all significant facts that could influence the economic choices of users based on size or nature.
              </p>
            </div>
          </div>

          {/* Sub-sections details */}
          <div id="as1-prudence" className="scroll-mt-36 space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
            <h3 className="font-sans font-bold text-sm tracking-wide text-slate-900 dark:text-white uppercase">5A. Prudence (Valuation Caution)</h3>
            <p>
              In view of the uncertainty inherent in many business transactions, assets and income should not be overstated, and liabilities and losses should not be understated. Profits are recognized only when realized, while provisions are made for all known liabilities and losses, even if the amount is an estimate. <PdfRef page={6} />
            </p>
            <p>
              However, prudence does not permit the creation of secret or hidden reserves, nor does it allow the arbitrary write-down of assets. The selection of policies must balance caution with neutrality to avoid bias in financial reporting.
            </p>
          </div>

          <div id="as1-substance" className="scroll-mt-36 space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif pt-4">
            <h3 className="font-sans font-bold text-sm tracking-wide text-slate-900 dark:text-white uppercase">5B. Substance over Form (Economic Reality)</h3>
            <p>
              Transactions and other events should be accounted for and presented in accordance with their financial substance and economic reality, and not merely their legal form. <PdfRef page={6} />
            </p>
            <p>
              <strong>Precedent Case Example:</strong> In a Hire-Purchase or Lease Agreement under AS 19, legal ownership remains with the lessor/seller until the final installment is paid. However, since the lessee/buyer gains immediate economic benefits and bears the operating risks of the asset, substance dictates that the asset is capitalized and depreciated in the buyer's balance sheet, while recording a liability for future payments. Accounting strictly by legal form (which would treat it as rent) would misrepresent the economic reality of the enterprise's capital structure.
            </p>
          </div>

          <div id="as1-materiality" className="scroll-mt-36 space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif pt-4">
            <h3 className="font-sans font-bold text-sm tracking-wide text-slate-900 dark:text-white uppercase">5C. Materiality (Disclosure Thresholds)</h3>
            <p>
              Financial statements should disclose all items which are material enough to influence the decisions of users. An item is material if its omission or misstatement could influence the economic decisions of users taken on the basis of the financial statements. Materiality depends on the size and nature of the item, judged in the particular circumstances of its omission. <PdfRef page={6} />
            </p>
            <p>
              <strong>Statutory Disclosures:</strong> Schedule III to the Companies Act, 2013 mandates explicit disclosure thresholds for items of expense. For example, any item of income or expenditure which exceeds 1% of the revenue from operations or ₹1,00,000 (whichever is higher) must be disclosed separately in the notes to accounts.
            </p>
            
            {/* Limit Lookup Table */}
            <div className="my-6 space-y-2 w-full">
              <div className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider font-mono">Schedule III Statutory Materiality Limits</div>
              <div className="overflow-x-auto border-t border-b border-slate-200 dark:border-slate-800 w-full">
                <table className="w-full text-left border-collapse text-[13px]">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 font-sans text-xs uppercase tracking-wider text-slate-900 dark:text-white bg-slate-50/50 dark:bg-[#161f33]/30">
                      <th className="py-3 px-4 font-bold w-1/3">Statutory Criteria</th>
                      <th className="py-3 px-4 font-bold w-1/3">Separate Disclosure Rule</th>
                      <th className="py-3 px-4 font-bold w-1/3">Practical Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-serif">
                    <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                      <td className="py-4 px-4 font-semibold text-slate-905 dark:text-white font-sans text-xs uppercase tracking-wider">1% of revenue or ₹1,00,000</td>
                      <td className="py-4 px-4 leading-relaxed">Whichever is higher must be disclosed separately as a line item in notes.</td>
                      <td className="py-4 px-4 leading-relaxed">In a company with ₹10 crore revenue, items above ₹10,000,000 (since 1% of 10cr is 10L, ₹10L is higher than 1L) require details.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                      <td className="py-4 px-4 font-semibold text-slate-905 dark:text-white font-sans text-xs uppercase tracking-wider">Non-Corporate Entities</td>
                      <td className="py-4 px-4 leading-relaxed">Follow guidelines issued by the ICAI based on Level I, II, III classification.</td>
                      <td className="py-4 px-4 leading-relaxed">Level I entities must comply fully, whereas Level II &amp; III enjoy selective disclosure exemptions.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 6: Fundamental Accounting Assumptions */}
        <section id="as1-assumptions" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="VI" 
            title="Fundamental Accounting Assumptions" 
            description="The three implicit conceptual postulates that undergird all standardized financial reporting frameworks under Indian law."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
            <p>
              Certain fundamental accounting assumptions underlie the preparation and presentation of financial statements. They are usually not specifically stated because their acceptance and use are assumed. Disclosure is required only if they are not followed. <PdfRef page={6} />
            </p>
          </div>

          {/* Matrix table for assumptions */}
          <div className="my-8 overflow-x-auto border-t border-b border-slate-200 dark:border-slate-800 w-full">
            <table className="w-full text-left border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 font-sans text-xs uppercase tracking-wider text-slate-900 dark:text-white bg-slate-50/50 dark:bg-[#161f33]/30">
                  <th className="py-3 px-4 font-bold w-1/6">Assumption</th>
                  <th className="py-3 px-4 font-bold w-2/6">Meaning</th>
                  <th className="py-3 px-4 font-bold w-1/6">Objective</th>
                  <th className="py-3 px-4 font-bold w-2/6">Impact if Violated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-serif">
                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-4 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Going Concern</td>
                  <td className="py-4 px-4 leading-relaxed">The enterprise will continue in operation for the foreseeable future, with neither the intention nor the necessity of liquidation.</td>
                  <td className="py-4 px-4 leading-relaxed">Valuing assets at cost/carrying value rather than net realizable value.</td>
                  <td className="py-4 px-4 leading-relaxed">Assets must be immediately written down to net realizable value (liquidation values), and all liabilities reclassified as current.</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-4 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Consistency</td>
                  <td className="py-4 px-4 leading-relaxed">Accounting policies are consistent from one period to another, allowing comparison.</td>
                  <td className="py-4 px-4 leading-relaxed">Facilitate meaningful inter-period comparison.</td>
                  <td className="py-4 px-4 leading-relaxed">Disclosures must highlight the deviation, the reason for the change, and its financial impact.</td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-4 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Accrual</td>
                  <td className="py-4 px-4 leading-relaxed">Revenues and costs are recognized as they are earned or incurred, not as cash is received or paid.</td>
                  <td className="py-4 px-4 leading-relaxed">Reflect true economic activity of the period.</td>
                  <td className="py-4 px-4 leading-relaxed">Accounts revert to cash basis, distorting actual financial performance and current position.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div id="as1-going-concern" className="scroll-mt-36 space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif pt-4">
            <h3 className="font-sans font-bold text-sm tracking-wide text-slate-900 dark:text-white uppercase">6A. Going Concern Assumption</h3>
            <p>
              The enterprise is normally viewed as a going concern, that is, as continuing in operation for the foreseeable future. It is assumed that the enterprise has neither the intention nor the necessity of liquidation or of curtailing materially the scale of its operations. <PdfRef page={6} />
            </p>
            <p>
              This assumption is the base for recording long-term assets at cost less depreciation rather than market values. If going concern is no longer valid, assets must be valued at net realizable value (liquidation values) and provisions must be made for unavoidable costs.
            </p>
          </div>

          <div id="as1-consistency" className="scroll-mt-36 space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif pt-4">
            <h3 className="font-sans font-bold text-sm tracking-wide text-slate-900 dark:text-white uppercase">6B. Consistency Assumption</h3>
            <p>
              It is assumed that accounting policies are consistent from one period to another. <PdfRef page={6} />
            </p>
            <p>
              Consistency facilitates inter-period comparison of financial performance. While changes are permitted in specific circumstances, consistency remains the rule. A change in policy must be disclosed along with its financial impact, showing how it deviates from the consistency assumption.
            </p>
          </div>

          <div id="as1-accrual" className="scroll-mt-36 space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif pt-4">
            <h3 className="font-sans font-bold text-sm tracking-wide text-slate-900 dark:text-white uppercase">6C. Accrual Assumption</h3>
            <p>
              Revenues and costs are accrued, that is, recognized as they are earned or incurred (and recorded in the financial statements of the periods to which they relate) and not as cash or its equivalent is received or paid. <PdfRef page={6} />
            </p>
            <p>
              Accrual accounting is a mandatory statutory requirement under Section 128(1) of the Companies Act, 2013, which requires companies to maintain books of account on an accrual basis. Cash-basis accounting is not acceptable for corporate entities.
            </p>
          </div>
        </section>

        {/* Chapter 7: Manner of Disclosure */}
        <section id="as1-disclosure" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="VII" 
            title="Manner of Disclosure" 
            description="The strict presentation format and location of accounting policy disclosures required under Indian Accounting Standards."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
            <p>
              Accounting Standard 1 mandates how and where policies must be disclosed to ensure users can easily access and comprehend them: <PdfRef page={6} />
            </p>
          </div>

          {/* Audit Checklist Layout */}
          <div className="my-8 space-y-6 w-full font-serif">
            <div className="flex gap-4 items-start">
              <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-800/85 flex items-center justify-center text-emerald-700 dark:text-emerald-450 shrink-0 mt-1">
                <Check size={12} />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-[13px] uppercase tracking-wide text-slate-905 dark:text-white">Orderly Manner</h4>
                <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
                  All significant accounting policies adopted in the preparation and presentation of financial statements should be disclosed in an orderly manner. <PdfRef page={6} />
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-800/85 flex items-center justify-center text-emerald-700 dark:text-emerald-450 shrink-0 mt-1">
                <Check size={12} />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-[13px] uppercase tracking-wide text-slate-905 dark:text-white">Part of Financial Statements</h4>
                <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
                  The disclosure of significant accounting policies should form part of the financial statements. They are normally presented in a single place. <PdfRef page={6} />
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-800/85 flex items-center justify-center text-emerald-700 dark:text-emerald-450 shrink-0 mt-1">
                <Check size={12} />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-[13px] uppercase tracking-wide text-slate-905 dark:text-white">Single Place Disclosure</h4>
                <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
                  All significant accounting policies should be disclosed in one place, usually under Note 1 to the financial statements, rather than scattered across different notes, to ensure ease of navigation. <PdfRef page={6} />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 8: Disclosure of Changes in Accounting Policies */}
        <section id="as1-change-policy" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="VIII" 
            title="Disclosure of Changes in Accounting Policies" 
            description="The step-by-step disclosure workflow required when an enterprise departs from its consistent accounting policies."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
            <p>
              When a change in an accounting policy has a material effect, it must be disclosed. The standard mandates a structured workflow for accounting and disclosing changes in policies: <PdfRef page={6} />
            </p>
          </div>

          {/* Clean Vertical Timeline Step Layout */}
          <div className="my-8 space-y-8 w-full font-serif relative pl-8 border-l border-slate-200 dark:border-slate-800">
            <div className="relative">
              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#0b0f19] border-2 border-amber-600 dark:border-amber-500 flex items-center justify-center text-xs font-bold text-slate-900 dark:text-white font-mono select-none">
                1
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-[13px] uppercase tracking-wide text-slate-900 dark:text-white">Identify the Change</h4>
                <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
                  Determine if a change has occurred in the accounting policies. A change is only permitted if it is required by statute, for compliance with an accounting standard, or if it results in a more appropriate presentation of the financial statements. <PdfRef page={6} />
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#0b0f19] border-2 border-amber-600 dark:border-amber-500 flex items-center justify-center text-xs font-bold text-slate-900 dark:text-white font-mono select-none">
                2
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-[13px] uppercase tracking-wide text-slate-900 dark:text-white">Justify the Change</h4>
                <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
                  Clearly state the reasons why the new policy is adopted and how it complies with standard criteria. The change must be justified as leading to a better presentation of accounts. <PdfRef page={6} />
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#0b0f19] border-2 border-amber-600 dark:border-amber-500 flex items-center justify-center text-xs font-bold text-slate-900 dark:text-white font-mono select-none">
                3
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-[13px] uppercase tracking-wide text-slate-900 dark:text-white">Quantify the Impact</h4>
                <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
                  Quantify the financial impact of the change on the financial statements for the current period. Show how net profits, asset carrying values, or liabilities are affected by the switch. <PdfRef page={6} />
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#0b0f19] border-2 border-amber-600 dark:border-amber-500 flex items-center justify-center text-xs font-bold text-slate-900 dark:text-white font-mono select-none">
                4
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-[13px] uppercase tracking-wide text-slate-900 dark:text-white">Handle Non-Ascertainability</h4>
                <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
                  If the financial impact of the change is not ascertainable (either wholly or in part), the fact that the impact is not ascertainable must be explicitly disclosed in the notes. <PdfRef page={6} />
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#0b0f19] border-2 border-amber-600 dark:border-amber-500 flex items-center justify-center text-xs font-bold text-slate-900 dark:text-white font-mono select-none">
                5
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-[13px] uppercase tracking-wide text-slate-900 dark:text-white">Future Impact Disclosure</h4>
                <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
                  If a change has no material effect in the current period but is reasonably expected to have a material effect in later periods, the fact of such change should be appropriately disclosed in the period in which the change is adopted. <PdfRef page={6} />
                </p>
              </div>
            </div>
          </div>

          {/* Section 8A: Para 23 Rule Warning Box */}
          <div id="as1-para23" className="scroll-mt-36 pt-6">
            <div className="p-6 border-l-4 border-rose-600 dark:border-rose-500 bg-rose-50/10 dark:bg-rose-955/5 rounded-r-lg font-serif">
              <div className="flex items-center gap-2 mb-3 text-rose-700 dark:text-rose-455 font-sans font-bold text-[13px] uppercase tracking-wider">
                <AlertTriangle size={15} />
                <span>Audit Warning: Disclosure is not a Cure</span>
              </div>
              <blockquote className="text-[15.5px] italic font-semibold text-slate-905 dark:text-white leading-relaxed mb-3">
                "Disclosure of accounting policies or changes therein cannot remedy a wrong or inappropriate accounting treatment." <PdfRef page={6} />
              </blockquote>
              <p className="text-[14.5px] text-slate-700 dark:text-slate-350 leading-relaxed pt-1">
                Disclosure of a wrong treatment is not a substitute for correct accounting. If an incorrect policy has been followed (for example, expensing a capital asset or recognizing revenue prematurely), the auditor remains obligated to qualify the audit report for such non-compliance under Section 143(3) of the Companies Act, 2013, regardless of how clearly the wrong policy is described in the notes.
              </p>
            </div>
          </div>
        </section>

        {/* Chapter 9: Statutory Footnotes */}
        <section id="as1-footnotes" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="IX" 
            title="Statutory Footnotes &amp; Scope Limits" 
            description="Regulatory footnotes, statutory compliance under the Companies Act 2013, ICAI guidelines, and limits on the materiality of standard application."
          />
          
          {/* Reference lookup table */}
          <div className="overflow-x-auto my-8 border-t border-b border-slate-200 dark:border-slate-800 w-full font-serif bg-slate-50/10 dark:bg-slate-900/5">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-855 font-mono bg-slate-100/50 dark:bg-[#161f33]/30">
                  <th className="py-4 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] w-1/12 text-center">Ref</th>
                  <th className="py-4 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] w-3/12">Statutory / Professional Source</th>
                  <th className="py-4 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] w-8/12">Detailed Notes &amp; Scope Limits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-850 text-slate-700 dark:text-slate-305 font-serif">
                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-slate-400 dark:text-gray-500 text-center">[1]</td>
                  <td className="py-4 px-4 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Preface to Accounting Standards</td>
                  <td className="py-4 px-4 leading-relaxed">
                    <strong>Materiality Scope:</strong> Accounting Standards apply only to items which are material. Immaterial items do not require explicit compliance or policy disclosure. The determination of materiality is a matter of professional judgment based on the size and nature of the item. <PdfRef page={2} />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-slate-400 dark:text-gray-500 text-center">[2]</td>
                  <td className="py-4 px-4 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Companies Act, 2013 Statutory Compliance</td>
                  <td className="py-4 px-4 leading-relaxed">
                    Section 129(1) of the Act mandates that financial statements must comply with accounting standards. Section 134(5) requires directors to certify that policies are consistent, reasonable, and prudent. Section 143(3)(e) requires auditors to report on compliance. Non-compliance must be reported in the Auditor's Report, including the financial impact of deviations. <PdfRef page={2} />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-slate-400 dark:text-gray-500 text-center">[3]</td>
                  <td className="py-4 px-4 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">AS 11 &amp; Schedule III Requirement</td>
                  <td className="py-4 px-4 leading-relaxed">
                    <strong>Foreign Currency Translation Policies:</strong> Under AS 11 and Schedule III requirements, companies must disclose translation policies in respect of foreign currency transactions and branches, detailing how exchange gains or losses are recognized. <PdfRef page={2} />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60 dark:hover:bg-[#131a2c]/30 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-slate-400 dark:text-gray-500 text-center">[4]</td>
                  <td className="py-4 px-4 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">ICAI &amp; NFRA Regulatory Drive</td>
                  <td className="py-4 px-4 leading-relaxed">
                    <strong>Standards and Regulatory Drive to Reduce Diversity:</strong> Regulators and standard-setting bodies (such as the ICAI and NFRA) strive to reduce acceptable alternative accounting treatments to improve comparability. However, some diversity remains due to differences in business models and operating conditions. <PdfRef page={5} />
                  </td>
                </tr>
              </tbody>
            </table>
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
          className="inline-flex items-center justify-center w-4 h-4 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/45 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-650 dark:text-red-400 rounded transition-all cursor-pointer select-none align-middle"
          title={`Click to jump to PDF Page ${pageNum}`}
        >
          <FileText size={10} className="shrink-0 text-red-500 dark:text-red-450" />
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
        <div className="px-3.5 py-4 border-b border-[#E2E1DD] dark:border-gray-800">
          <div className="flex items-center gap-2.5 pl-0.5 w-full overflow-visible">
            <BookOpen size={21} className="text-[#2D5BE3] dark:text-blue-400 shrink-0" />
            <span className="font-sans font-extrabold text-[16px] text-[#1C1C1E] dark:text-white uppercase tracking-widest whitespace-nowrap overflow-visible leading-tight">
              {framework === 'AS' ? 'Accounting Standards' : 'Indian Acc. Standards'}
            </span>
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
            <h1 className="text-[16px] sm:text-[22px] md:text-[24px] font-semibold text-[#1C1C1E] dark:text-white tracking-tight border-l-2 border-[#2D5BE3] dark:border-blue-500 pl-2.5 sm:pl-3 truncate leading-tight flex-1 min-w-0">
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

