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
  Check,
  Info
} from 'lucide-react'
import { Standard } from '@/lib/learning-loader'
import { getStandardDetailAction } from './actions'
import { AS1ExamplesCustomContent } from './AS1ExamplesCustomContent'
import { AS2ExamplesCustomContent } from './AS2ExamplesCustomContent'
import { AS3ExamplesCustomContent } from './AS3ExamplesCustomContent'
import { AS4ExamplesCustomContent } from './AS4ExamplesCustomContent'
import { AS5ExamplesCustomContent } from './AS5ExamplesCustomContent'
import { AS9ExamplesCustomContent } from './AS9ExamplesCustomContent'
import { AS10ExamplesCustomContent } from './AS10ExamplesCustomContent'
import { AS7ExamplesCustomContent } from './AS7ExamplesCustomContent'
import { AS11ExamplesCustomContent } from './AS11ExamplesCustomContent'
import { AS12ExamplesCustomContent } from './AS12ExamplesCustomContent'
import { AS13ExamplesCustomContent } from './AS13ExamplesCustomContent'
import { AS14ExamplesCustomContent } from './AS14ExamplesCustomContent'
import { AS15ExamplesCustomContent } from './AS15ExamplesCustomContent'
import { AS16ExamplesCustomContent } from './AS16ExamplesCustomContent'
import { AS17ExamplesCustomContent } from './AS17ExamplesCustomContent'
import { AS18ExamplesCustomContent } from './AS18ExamplesCustomContent'
import { AS19ExamplesCustomContent } from './AS19ExamplesCustomContent'

import { AS20ExamplesCustomContent } from './AS20ExamplesCustomContent'
import { AS20StandardTabContent } from './AS20StandardTabContent'
import { AS21ExamplesCustomContent } from './AS21ExamplesCustomContent'
import { AS21StandardTabContent } from './AS21StandardTabContent'
import { AS22ExamplesCustomContent } from './AS22ExamplesCustomContent'
import { AS22StandardTabContent } from './AS22StandardTabContent'
import { AS23ExamplesCustomContent } from './AS23ExamplesCustomContent'
import { AS23StandardTabContent } from './AS23StandardTabContent'
import { AS24ExamplesCustomContent } from './AS24ExamplesCustomContent'
import { AS24StandardTabContent } from './AS24StandardTabContent'
import { AS25ExamplesCustomContent } from './AS25ExamplesCustomContent'
import { AS25StandardTabContent } from './AS25StandardTabContent'
import { AS26ExamplesCustomContent } from './AS26ExamplesCustomContent'
import { AS26StandardTabContent } from './AS26StandardTabContent'
import { AS27ExamplesCustomContent } from './AS27ExamplesCustomContent'
import { AS27StandardTabContent } from './AS27StandardTabContent'
import { AS28ExamplesCustomContent } from './AS28ExamplesCustomContent'
import { AS28StandardTabContent } from './AS28StandardTabContent'
import { AS29ExamplesCustomContent } from './AS29ExamplesCustomContent'
import { AS29StandardTabContent } from './AS29StandardTabContent'

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
];

function AS1StandardTabContent({ navigateToPdfPage, renderTextWithReferences }: AS1StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    'depr': true,
  })

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

  const tocScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const initObserver = () => {
      const scrollContainer = document.getElementById('as1-scroll-container');
      if (!scrollContainer) {
        setTimeout(initObserver, 50);
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const secId = entry.target.id.replace('as1-', '');
              const chapterId = sectionToChapterMap[secId] || secId;
              setActiveSection(chapterId);
            }
          });
        },
        {
          root: scrollContainer,
          rootMargin: '-90px 0px -60% 0px',
          threshold: 0
        }
      );

      as1Sections.forEach((sec) => {
        const el = document.getElementById(`as1-${sec.id}`);
        if (el) {
          observer?.observe(el);
        }
      });
    };

    initObserver();

    return () => {
      if (observer) {
        observer.disconnect();
      }
    }
  }, [])

  useEffect(() => {
    const el = tocScrollRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    if (!activeSection || !tocScrollRef.current) return;
    const activeBtn = tocScrollRef.current.querySelector(`[data-toc-id="${activeSection}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeSection]);

  const PdfRef = ({ page }: { page: number }) => (
    <button
      onClick={() => navigateToPdfPage(page)}
      className="inline-flex items-center justify-center w-4 h-4 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-955/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded transition-all cursor-pointer select-none align-middle"
      title={`Open ICAI AS 1 PDF ΓÇö Page ${page}`}
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

  const ChapterHeader = ({ num, title, description }: { num: string; title: string; description: string }) => {
    const numMap: Record<string, string> = {
      'I': '1',
      'II': '2',
      'III': '3',
      'IV': '4',
      'V': '5',
      'VI': '6',
      'VII': '7',
      'VIII': '8',
      'IX': '9'
    };
    const arabicNum = numMap[num] || num;
    return (
      <div className="w-full mb-6 mt-12 first:mt-2">
        <div className="flex items-baseline gap-2 mb-2">
          <h2 className="text-[20px] sm:text-[22px] font-sans font-bold text-slate-900 dark:text-white tracking-tight leading-tight flex items-baseline gap-2">
            <span className="text-indigo-650 dark:text-indigo-400 font-mono font-bold mr-1 select-none">{arabicNum}.</span>
            <span>{title}</span>
          </h2>
        </div>
        <div className="h-[1.5px] w-full bg-slate-200/80 dark:bg-slate-800/80 mb-3" />
        {description && (
          <p className="text-[13.5px] font-sans font-medium text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    );
  };

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
          className="w-full text-left font-serif font-bold text-slate-950 dark:text-white hover:text-amber-800 dark:hover:text-amber-400 flex items-center justify-between p-4 select-none cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <span className="text-slate-800 dark:text-slate-200 font-mono text-[11px] font-bold bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 select-none">
              {num}
            </span>
            <span className="text-[15.5px] tracking-tight font-sans font-extrabold text-slate-950 dark:text-white">{title}</span>
            <PdfRef page={4} />
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
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 dark:text-slate-400 uppercase tracking-wider block mb-1 font-sans">
                  Standard Reference
                </span>
                <span className="text-slate-950 dark:text-slate-55 font-sans font-semibold text-xs bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-800 inline-block font-mono">
                  {refStd}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 dark:text-slate-400 uppercase tracking-wider block mb-1 font-sans">
                  Key Policy Choice
                </span>
                <span className="text-slate-800 dark:text-slate-200 font-medium text-xs font-sans">
                  {choice}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 dark:text-slate-400 uppercase tracking-wider block mb-1 font-sans">
                  Financial Impact
                </span>
                <span className="text-slate-950 dark:text-slate-50 leading-normal font-sans text-xs">
                  {impact}
                </span>
              </div>
            </div>
            <div className="text-slate-950 dark:text-slate-50 leading-relaxed font-serif text-[14px] pt-1">
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

  return (
    <div className="w-full animate-fade-in font-sans bg-[#F5F5F3] dark:bg-[#0B0F19] pb-8">
      {/* Sticky Contents Bar */}
      <div id="as1-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div
            ref={tocScrollRef}
            style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }}
            className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5"
          >
            {as1Chapters.map((sec) => (
              <button
                key={sec.id}
                data-toc-id={sec.id}
                onClick={() => {
                  const container = document.getElementById('as1-scroll-container');
                  const target = document.getElementById(`as1-${sec.id}`);
                  const stickyToc = document.getElementById('as1-sticky-toc');
                  setActiveSection(sec.id);
                  if (container && target) {
                    const containerRect = container.getBoundingClientRect();
                    const targetRect = target.getBoundingClientRect();
                    let stickyOffset = 98;
                    if (stickyToc) {
                      const tocRect = stickyToc.getBoundingClientRect();
                      stickyOffset = tocRect.bottom - containerRect.top;
                    }
                    const targetScrollTop = targetRect.top - containerRect.top + container.scrollTop - stickyOffset + 2;
                    console.log('[React TOC Click]', sec.id, 'targetScrollTop:', targetScrollTop, 'containerScrollTop:', container.scrollTop, 'targetRectTop:', targetRect.top, 'containerRectTop:', containerRect.top, 'stickyOffset:', stickyOffset);
                    container.scrollTo({ top: targetScrollTop, behavior: 'auto' });
                  } else {
                    console.log('[React TOC Click] Elements missing: container=', !!container, 'target=', !!target);
                  }
                }}
                className={`transition-all cursor-pointer px-3.5 py-1.5 rounded-full text-[11.5px] font-sans font-semibold tracking-wide shrink-0 whitespace-nowrap ${
                  activeSection === sec.id
                    ? 'text-white bg-indigo-600 dark:bg-indigo-500 shadow-sm font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Publication Sheet Canvas */}
      <div className="mx-auto w-[98%] max-w-[1720px] bg-white dark:bg-[#111726] shadow-sm border border-slate-200/70 dark:border-slate-850 rounded-xl px-4 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-8 relative my-4">

        {/* Chapter 1: Introduction & Purpose */}
        <section id="as1-overview" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="I" 
            title="Introduction &amp; Purpose of the Standard" 
            description="Overview of the primary causes of diversity in financial reporting, the qualitative necessity of systematic policy disclosure to ensure comparability."
          />
          
          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              Irrespective of the extent of standardization in accounting, diversity in <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-350 dark:border-slate-700 px-1.5 py-0.5 rounded font-mono text-[13.5px]">Accounting Policies</span> is unavoidable in business practice. <PdfRef page={2} /> This standard addresses this challenge by requiring comprehensive disclosures of the policies adopted by an enterprise.
            </p>
            <p>
              Under <span className="font-semibold text-slate-900 dark:text-white">AS 1 (Disclosure of Accounting Policies)</span>, diversity in policies is recognized as arising from two primary sources:
            </p>
          </div>

          {/* Premium Blue Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-blue-150 dark:border-blue-900/40 bg-blue-50/20 dark:bg-blue-955/5 rounded-xl space-y-2.5">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-blue-800 dark:text-blue-400 flex items-center gap-2">
                <Info size={14} />
                <span>1. Freedom in Uncovered Areas</span>
              </h4>
              <p className="text-[15px] leading-relaxed text-slate-950 dark:text-slate-50 font-medium">
                Accounting standards cannot and do not cover all possible areas of accounting. Consequently, enterprises retain the freedom to adopt any reasonable accounting policy in areas not governed by an active standard. <PdfRef page={2} />
              </p>
            </div>
            <div className="p-5 border border-blue-150 dark:border-blue-900/40 bg-blue-50/20 dark:bg-blue-955/5 rounded-xl space-y-2.5">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-blue-800 dark:text-blue-400 flex items-center gap-2">
                <Info size={14} />
                <span>2. Diverse Operating Situations</span>
              </h4>
              <p className="text-[15px] leading-relaxed text-slate-950 dark:text-slate-50 font-medium">
                Because enterprises operate in highly diverse economic, industrial, and geographic situations, it is impossible to construct a single set of rigid accounting policies applicable to all enterprises for all time. Standard-setting bodies therefore permit alternative options. <PdfRef page={2} />
              </p>
            </div>
          </div>

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              These differences in accounting policies lead directly to differences in reported financial information, even if the underlying business transactions are identical. Consequently, the qualitative characteristic of <strong>comparability</strong> of financial statements suffers significantly when accounting policies are diverse and undisclosed. <PdfRef page={2} />
            </p>
            <p>
              Since complete uniformity in accounting treatments is impossible, and standards permit multiple alternative methods in many areas, it is not enough for an enterprise to state that all accounting standards have been complied with. <PdfRef page={2} />
            </p>
            
            <div className="p-6 my-6 border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/25 dark:bg-indigo-955/5 rounded-xl font-serif shadow-3xs">
              <span className="text-[11.5px] font-bold text-indigo-850 dark:text-indigo-400 uppercase tracking-wider block mb-2 font-sans">
                Core Analytical Observation ΓÇö Why Disclosure is Crucial
              </span>
              <p className="text-[15.5px] font-semibold text-slate-950 dark:text-slate-50 leading-relaxed">
                For these reasons, AS 1 mandates that enterprises disclose the significant accounting policies actually adopted by them in the preparation of their financial statements. This allows the users of financial statements to take these policy differences into consideration and make the necessary analytical adjustments when evaluating and comparing the financial results of different entities. <PdfRef page={2} />
              </p>
            </div>

            <p>
              The primary purpose of AS 1 is to promote a better understanding of financial statements by requiring the disclosure of significant accounting policies in an orderly manner. These disclosures facilitate a more meaningful comparison between the financial statements of different enterprises for the same accounting period, as well as a comparison of the financial statements of the same enterprise across different periods when policies change. <PdfRef page={2} />
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
          
          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              This standard should be applied in the disclosure of all significant accounting policies adopted in the preparation and presentation of financial statements. It has universal applicability and applies to all enterprises preparing general-purpose financial statements. <PdfRef page={2} />
            </p>
            <p>
              The disclosures required by this standard are critical for ensuring that financial statements are interpreted correctly by different stakeholders. Stakeholders depend on these statements to make economic decisions: <PdfRef page={2} />
            </p>
          </div>

          {/* Stakeholder table ΓÇö Teal theme */}
          <div className="my-8 w-full rounded-xl overflow-hidden border border-teal-200 dark:border-teal-900/50">
            <table className="w-full text-left border-collapse text-[13.5px]">
              <thead>
                <tr className="font-sans text-[11.5px] font-bold uppercase tracking-wider text-white bg-teal-700 dark:bg-teal-800">
                  <th className="py-3 px-5 w-1/3">Stakeholder Group</th>
                  <th className="py-3 px-5 w-2/3">Analytical Needs &amp; Rationale <PdfRef page={2} /></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-100 dark:divide-teal-900/30 text-slate-900 dark:text-slate-100 font-serif">
                <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-950/20 transition-colors bg-white dark:bg-[#111726]">
                  <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2"><Users size={13} className="text-teal-600 shrink-0" /><span>Shareholders &amp; Investors</span></div>
                  </td>
                  <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Need accounting policy clarity to evaluate profit quality, calculate return on investment, and compare earnings across alternative investment opportunities.</td>
                </tr>
                <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-950/20 transition-colors bg-teal-50/20 dark:bg-[#0f1c22]/30">
                  <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2"><CreditCard size={13} className="text-teal-600 shrink-0" /><span>Creditors &amp; Suppliers</span></div>
                  </td>
                  <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Analyze inventory valuation and accrual policies to gauge the enterprise's short-term liquidity cycles, payment capabilities, and working capital ratios.</td>
                </tr>
                <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-950/20 transition-colors bg-white dark:bg-[#111726]">
                  <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2"><Briefcase size={13} className="text-teal-600 shrink-0" /><span>Banks &amp; Lenders</span></div>
                  </td>
                  <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Evaluate policy consistency to monitor debt service coverage ratios, assess collateral values (e.g. inventories or fixed assets), and ensure compliance with covenant terms.</td>
                </tr>
                <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-950/20 transition-colors bg-teal-50/20 dark:bg-[#0f1c22]/30">
                  <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2"><Scale size={13} className="text-teal-600 shrink-0" /><span>Regulators &amp; Tax Authorities</span></div>
                  </td>
                  <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Monitor compliance with corporate laws and calculate fair taxes. In India, Section 129(1) of the Companies Act, 2013 mandates that financial statements must portray a true and fair view and comply with accounting standards.</td>
                </tr>
                <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-950/20 transition-colors bg-white dark:bg-[#111726]">
                  <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2"><Globe size={13} className="text-teal-600 shrink-0" /><span>Employees &amp; Public</span></div>
                  </td>
                  <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Assess job security, bonus eligibility, long-term stability, and the overall economic contribution of the enterprise.</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              Compliance with AS 1 is legally and professionally binding in India. For corporate entities, Section 129(1) of the Companies Act, 2013 mandates strict compliance with accounting standards, and any deviation must be disclosed with reasons and financial effects. For non-corporate entities (such as partnerships, proprietorships, and trusts), compliance is mandated by the directives and guidelines issued by the ICAI based on categorization rules (Level I, II, III, and IV entities). <PdfRef page={2} />
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

          {/* Official Definition Card ΓÇö Blue theme */}
          <div className="p-6 border-l-4 border-blue-600 dark:border-blue-400 border border-blue-200 dark:border-blue-900/40 bg-blue-50/30 dark:bg-blue-955/10 rounded-xl my-6">
            <div className="text-[10.5px] font-sans font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-3 flex items-center gap-2">
              <BookOpen size={13} className="text-blue-600 dark:text-blue-400" />
              <span>Official Definition ΓÇö AS 1, Para 11</span>
            </div>
            <p className="text-[16px] font-serif font-semibold text-slate-950 dark:text-slate-100 leading-[1.8] italic">
              "Accounting policies refer to the specific accounting principles and the methods of applying those principles adopted by the enterprise in the preparation and presentation of financial statements." <PdfRef page={4} />
            </p>
          </div>
          
          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              To understand this definition, we must distinguish between accounting <strong>principles</strong> and the <strong>methods of applying them</strong>. An accountant must choose a policy from various available options for recording or disclosing transactions. For example, the principle of valuation may dictate historical cost, but the method of application may require FIFO or Weighted Average formulas. <PdfRef page={4} />
            </p>
          </div>

          {/* Table 1: Principles vs Methods ΓÇö Blue theme */}
          <div className="my-8 space-y-2 w-full">
            <div className="text-[13px] font-bold text-blue-800 dark:text-blue-400 font-sans uppercase tracking-wider flex items-center gap-2">
              <span className="inline-block w-1 h-4 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
              Table 1 ΓÇö Accounting Principles vs. Methods of Application <PdfRef page={4} />
            </div>
            <div className="overflow-x-auto w-full rounded-xl border border-blue-200 dark:border-blue-900/40">
              <table className="w-full text-left border-collapse text-[13.5px]">
                <thead>
                  <tr className="font-sans text-[11.5px] font-bold uppercase tracking-wider text-white bg-blue-700 dark:bg-blue-800">
                    <th className="py-3 px-5 w-1/2">Accounting Principles</th>
                    <th className="py-3 px-5 w-1/2">Methods of Applying Principles</th>
                  </tr>
                </thead>
                <tbody className="text-slate-900 dark:text-slate-100 font-serif divide-y divide-blue-100 dark:divide-blue-900/30">
                  <tr className="bg-white dark:bg-[#111726]">
                    <td className="py-4 px-5 leading-relaxed align-top">
                      The core conceptual bases and measurement models chosen for recording economic events and transactions in the financial books (for example, historical cost, revaluation model, or net realizable value).
                    </td>
                    <td className="py-4 px-5 leading-relaxed align-top">
                      The specific procedures, formulas, or methods used to implement those principles (for example, FIFO or Weighted Average formulas for inventory, or Straight-Line or WDV methods for depreciation).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              Accounting is both a science and an art. It is a science because it is based on structured, tested, and universally applicable accounting principles. Simultaneously, it is an art because the practical application of these principles relies heavily on the personal ability, professional judgment, and estimates of the accountant. Since different accountants and management teams may exercise judgment differently under similar circumstances, enterprises within the same industry often adopt different accounting policies. <PdfRef page={5} />
            </p>
            <p>
              The list of policies an enterprise must adopt is vast. For every item ΓÇö right from the valuation of assets and liabilities to the recognition of revenue, provisioning for expected losses, and handling contingencies ΓÇö the accountant must establish principles and evolve a method of application. This choice has a considerable effect on the financial results disclosed in the financial statements, making comparison almost impossible without proper disclosures. <PdfRef page={5} />
            </p>
          </div>
          
          {/* Table 2: Policies vs Estimates ΓÇö Indigo theme */}
          <div className="my-8 space-y-2 w-full">
            <div className="text-[13px] font-bold text-indigo-800 dark:text-indigo-400 font-sans uppercase tracking-wider flex items-center gap-2">
              <span className="inline-block w-1 h-4 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>
              Table 2 ΓÇö Accounting Policies vs. Accounting Estimates <PdfRef page={5} />
            </div>
            <div className="overflow-x-auto w-full rounded-xl border border-indigo-200 dark:border-indigo-900/40">
              <table className="w-full text-left border-collapse text-[13.5px]">
                <thead>
                  <tr className="font-sans text-[11.5px] font-bold uppercase tracking-wider text-white bg-indigo-700 dark:bg-indigo-800">
                    <th className="py-3 px-5 w-1/4">Attribute</th>
                    <th className="py-3 px-5 w-3/8">Accounting Policy</th>
                    <th className="py-3 px-5 w-3/8">Accounting Estimate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-100 dark:divide-indigo-900/30 text-slate-900 dark:text-slate-100 font-serif">
                  <tr className="hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-colors bg-white dark:bg-[#111726]">
                    <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Definition</td>
                    <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Specific accounting principles and the methods of applying those principles.</td>
                    <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Judgments made to estimate the carrying value of assets or liabilities under the selected policy.</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-colors bg-indigo-50/20 dark:bg-indigo-950/5">
                    <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Responsibility</td>
                    <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Board of Directors (statutory Directors' Responsibility Statement under Section 134(5)).</td>
                    <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Management and operational accountants based on the latest available information.</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-colors bg-white dark:bg-[#111726]">
                    <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Examples</td>
                    <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Switching from FIFO to Weighted Average cost formula.</td>
                    <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Estimating provision for non-moving inventory based on a technical evaluation.</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-colors bg-indigo-50/20 dark:bg-indigo-950/5">
                    <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Change Basis</td>
                    <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Only if required by statute, standard, or for a more appropriate presentation.</td>
                    <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Revised if circumstances change, new information becomes available, or experience develops.</td>
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

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              The standard identifies major areas where different accounting policies can be adopted by different enterprises. These alternative treatments are permitted because of differences in the operating environments and business models of entities. <PdfRef page={5} />
            </p>
          </div>

          <div className="space-y-4 w-full">
            {diversityAreas.map((area) => (
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
            ))}
          </div>
        </section>

        {/* Chapter 5: Selection Considerations */}
        <section id="as1-selection" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="V" 
            title="Considerations in Selection of Accounting Policies" 
            description="The primary qualitative parameters governing management's choice of accounting policies to ensure a true and fair view."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              The primary consideration in selecting accounting policies is that the financial statements should portray a <strong>true and fair view</strong> of the financial position and performance of the enterprise. In selecting a policy, alternative policies should be evaluated in this light. The standard specifies three secondary considerations to achieve this primary objective: <PdfRef page={5} />
            </p>
          </div>

          {/* 3-Column Selection Cards ΓÇö differentiated colors */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 my-6 font-serif w-full">
            <div className="p-5 border-t-2 border-amber-500 border border-amber-200 dark:border-amber-900/40 bg-amber-50/30 dark:bg-amber-950/10 rounded-xl space-y-2.5">
              <h4 className="font-sans font-bold text-[12px] uppercase tracking-wider text-amber-800 dark:text-amber-400">1. Prudence</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">
                Caution in prepared judgments: profits are recognized only when realized, and provisions are made for all known liabilities and losses.
              </p>
            </div>
            <div className="p-5 border-t-2 border-blue-500 border border-blue-200 dark:border-blue-900/40 bg-blue-50/30 dark:bg-blue-955/10 rounded-xl space-y-2.5">
              <h4 className="font-sans font-bold text-[12px] uppercase tracking-wider text-blue-800 dark:text-blue-400">2. Substance over Form</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">
                Accounting for economic reality and financial substance rather than legal technicalities.
              </p>
            </div>
            <div className="p-5 border-t-2 border-teal-500 border border-teal-200 dark:border-teal-900/40 bg-teal-50/30 dark:bg-teal-950/10 rounded-xl space-y-2.5">
              <h4 className="font-sans font-bold text-[12px] uppercase tracking-wider text-teal-800 dark:text-teal-400">3. Materiality</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">
                Disclosing all significant facts that could influence the economic choices of users based on size or nature.
              </p>
            </div>
          </div>

          {/* Sub-sections details */}
          <div id="as1-prudence" className="scroll-mt-36 space-y-6 text-[16px] md:text-[17px] text-slate-950 dark:text-slate-50 leading-[1.8] font-serif font-medium">
            <h3 className="font-sans font-bold text-[16.5px] text-amber-900 dark:text-amber-300 flex items-center gap-3 mt-10 mb-3 border-l-[3px] border-amber-500 pl-3">
              5A. Prudence
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 font-mono uppercase tracking-widest">Valuation Caution</span>
            </h3>
            <p>
              In view of the uncertainty associated with future events, profits are not anticipated, but losses are provided for as a matter of conservatism. Provisions must be created for all known liabilities and losses, even if the amount cannot be determined with certainty and represents only a best estimate based on available information. <PdfRef page={5} />
            </p>
            <p>
              The exercise of prudence in the selection of accounting policies ensures that:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-[15.5px]">
              <li>Profits are not overstated</li>
              <li>Losses are not understated</li>
              <li>Assets are not overstated</li>
              <li>Liabilities are not understated</li>
            </ul>
            <p>
              However, <span className="bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/50 dark:border-amber-900/40 px-1.5 py-0.5 rounded font-semibold">Prudence</span> does not permit the creation of secret or hidden reserves by deliberately understating profits and assets or overstating liabilities and losses. The selection of policies must balance caution with neutrality to avoid bias in financial reporting. <PdfRef page={6} />
            </p>
            <div className="p-5 border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/10 rounded-xl space-y-2.5 my-5 shadow-3xs font-serif">
              <h4 className="font-sans font-bold text-[11px] uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                <Info size={13} className="text-amber-500" />
                <span>Prudence Application: Damage Suits</span>
              </h4>
              <p className="text-[15px] leading-relaxed text-slate-950 dark:text-slate-50 font-medium">
                Suppose a company is facing a damage suit from a customer or competitor. Under the prudence principle, the company should not recognize a liability (or charge profit) unless the probability of losing the suit is more than the probability of not losing it (i.e. more likely than not). Recognizing provisions arbitrarily without high probability would violate the true and fair view by creating a hidden reserve. <PdfRef page={6} />
              </p>
            </div>
          </div>

          <div id="as1-substance" className="scroll-mt-36 space-y-6 text-[16px] md:text-[17px] text-slate-950 dark:text-slate-50 leading-[1.8] font-serif font-medium pt-4">
            <h3 className="font-sans font-bold text-[16.5px] text-blue-900 dark:text-blue-300 flex items-center gap-3 mt-10 mb-3 border-l-[3px] border-blue-500 pl-3">
              5B. Substance over Form
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 font-mono uppercase tracking-widest">Economic Reality</span>
            </h3>
            <p>
              Transactions and other events must be accounted for and presented in accordance with their financial substance and economic reality, and not merely by their legal form. <PdfRef page={6} />
            </p>
            <div className="p-5 border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/10 rounded-xl space-y-2.5 my-5 shadow-3xs font-serif">
              <h4 className="font-sans font-bold text-[11px] uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                <Info size={13} className="text-indigo-500" />
                <span>Precedent Case Example: Hire-Purchase / Lease (AS 19)</span>
              </h4>
              <p className="text-[15px] leading-relaxed text-slate-950 dark:text-slate-50 font-medium">
                In a Hire-Purchase or Lease Agreement under AS 19, legal ownership remains with the lessor/seller until the final installment is paid. However, since the lessee/buyer gains immediate economic benefits and bears the operating risks of the asset, <span className="bg-blue-50 dark:bg-blue-955/40 text-blue-900 dark:text-blue-355 border border-blue-250/50 dark:border-blue-900/40 px-1.5 py-0.5 rounded font-semibold font-mono text-[13.5px]">Substance over Form</span> dictates that the asset is capitalized and depreciated in the buyer's balance sheet, while recording a liability for future payments. Accounting strictly by legal form (which would treat it as rent) would misrepresent the economic reality of the enterprise's capital structure. <PdfRef page={6} />
              </p>
            </div>
          </div>

          <div id="as1-materiality" className="scroll-mt-36 space-y-6 text-[16px] md:text-[17px] text-slate-950 dark:text-slate-50 leading-[1.8] font-serif font-medium pt-4">
            <h3 className="font-sans font-bold text-[16.5px] text-teal-900 dark:text-teal-300 flex items-center gap-3 mt-10 mb-3 border-l-[3px] border-teal-500 pl-3">
              5C. Materiality
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 font-mono uppercase tracking-widest">Disclosure Thresholds</span>
            </h3>
            <p>
              Financial statements should disclose all items which are material enough to influence the decisions of users. An item is material if its omission or misstatement could influence the economic decisions of users taken on the basis of the financial statements. <span className="bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 border border-teal-200/50 dark:border-teal-900/40 px-1.5 py-0.5 rounded font-semibold">Materiality</span> depends on the size and nature of the item, judged in the particular circumstances of its omission. <PdfRef page={6} />
            </p>
            <p>
              Materiality is not always a matter of relative size. For example, a small amount lost by fraudulent practices of certain employees can indicate a serious flaw in the enterprise's internal control system, requiring immediate attention to avoid greater losses in the future. <PdfRef page={6} />
            </p>
            
            {/* Materiality Limits Table ΓÇö Teal theme */}
            <div className="my-6 space-y-2 w-full">
              <div className="text-[13px] font-bold text-teal-800 dark:text-teal-400 font-sans uppercase tracking-wider flex items-center gap-2">
                <span className="inline-block w-1 h-4 bg-teal-600 dark:bg-teal-400 rounded-full"></span>
                Schedule III ΓÇö Statutory Materiality Limits <PdfRef page={6} />
              </div>
              <div className="overflow-x-auto w-full rounded-xl border border-teal-200 dark:border-teal-900/40">
                <table className="w-full text-left border-collapse text-[13px]">
                  <thead>
                    <tr className="font-sans text-[11.5px] font-bold uppercase tracking-wider text-white bg-teal-700 dark:bg-teal-800">
                      <th className="py-3 px-5 w-1/3">Statutory Criteria</th>
                      <th className="py-3 px-5 w-1/3">Separate Disclosure Rule</th>
                      <th className="py-3 px-5 w-1/3">Practical Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-teal-100 dark:divide-teal-900/30 text-slate-900 dark:text-slate-100 font-serif">
                    <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-950/20 transition-colors bg-white dark:bg-[#111726]">
                      <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">1% of revenue or Γé╣1,00,000</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Whichever is higher must be disclosed separately as a line item in notes.</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">In a company with Γé╣10 crore revenue, items above Γé╣10,00,000 require details (since 1% of 10cr is 10L, and 10L is higher than 1L).</td>
                    </tr>
                    <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-950/20 transition-colors bg-teal-50/20 dark:bg-[#0f1c22]/30">
                      <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">5% Shareholding Threshold</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Shares held by each shareholder holding more than 5% must be disclosed in notes.</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">The notes must specify the names of shareholders holding 5%+ shares and the exact number of shares held.</td>
                    </tr>
                    <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-950/20 transition-colors bg-white dark:bg-[#111726]">
                      <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Non-Corporate Entities</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Follow guidelines issued by the ICAI based on Level I, II, III classification.</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Level I entities must comply fully, whereas Level II &amp; III enjoy selective disclosure exemptions.</td>
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

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              Certain fundamental accounting assumptions underlie the preparation and presentation of financial statements. They are usually not specifically stated because their acceptance and use are assumed. Disclosure is required only if they are not followed. <PdfRef page={3} />
            </p>
          </div>

          {/* Assumptions Matrix Table ΓÇö Emerald theme */}
          <div className="my-8 space-y-2 w-full">
            <div className="text-[13px] font-bold text-emerald-800 dark:text-emerald-400 font-sans uppercase tracking-wider flex items-center gap-2">
              <span className="inline-block w-1 h-4 bg-emerald-600 dark:bg-emerald-400 rounded-full"></span>
              Fundamental Assumptions ΓÇö Comparison Matrix <PdfRef page={3} />
            </div>
            <div className="overflow-x-auto w-full rounded-xl border border-emerald-200 dark:border-emerald-900/40">
              <table className="w-full text-left border-collapse text-[13.5px]">
                <thead>
                  <tr className="font-sans text-[11.5px] font-bold uppercase tracking-wider text-white bg-emerald-700 dark:bg-emerald-800">
                    <th className="py-3 px-5 w-1/6">Assumption</th>
                    <th className="py-3 px-5 w-2/6">Meaning</th>
                    <th className="py-3 px-5 w-1/6">Objective</th>
                    <th className="py-3 px-5 w-2/6">Impact if Violated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-100 dark:divide-emerald-900/30 text-slate-900 dark:text-slate-100 font-serif">
                  <tr className="hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20 transition-colors bg-white dark:bg-[#111726]">
                    <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Going Concern</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">The enterprise will continue in operation for the foreseeable future, with neither the intention nor the necessity of liquidation.</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Valuing assets at cost/carrying value rather than net realizable value.</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Assets must be immediately written down to net realizable value (liquidation values), and all liabilities reclassified as current.</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20 transition-colors bg-emerald-50/20 dark:bg-emerald-950/5">
                    <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Consistency</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Accounting policies are consistent from one period to another, allowing comparison.</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Facilitate meaningful inter-period comparison.</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Disclosures must highlight the deviation, the reason for the change, and its financial impact.</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20 transition-colors bg-white dark:bg-[#111726]">
                    <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Accrual</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Revenues and costs are recognized as they are earned or incurred, not as cash is received or paid.</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Reflect true economic activity of the period.</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Accounts revert to cash basis, distorting actual financial performance and current position.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div id="as1-going-concern" className="scroll-mt-36 space-y-6 text-[16px] md:text-[17px] text-slate-950 dark:text-slate-50 leading-[1.8] font-serif font-medium pt-4">
            <h3 className="font-sans font-bold text-[16.5px] text-indigo-900 dark:text-indigo-300 flex items-center gap-3 mt-10 mb-3 border-l-[3px] border-indigo-500 pl-3">
              6A. Going Concern Assumption
            </h3>
            <p>
              The financial statements are normally prepared on the assumption that an enterprise is a <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-900/40 px-1.5 py-0.5 rounded font-semibold">Going Concern</span>, that is, it will continue in operation for the foreseeable future. It is assumed that the enterprise has neither the intention nor the necessity of liquidation or of curtailing materially the scale of its operations. <PdfRef page={3} />
            </p>
            <p>
              Financial statements prepared on a going concern basis recognize the need for sufficient retention of profit to replace assets consumed in operation and for making adequate provision for the settlement of its liabilities. If the going concern assumption is defeated (for example, if a regulatory license is permanently revoked or a liquidation order is issued), assets must be written down to their Net Realizable Value (NRV) and long-term liabilities must be reclassified as current liabilities. <PdfRef page={3} />
            </p>
          </div>

          <div id="as1-consistency" className="scroll-mt-36 space-y-6 text-[16px] md:text-[17px] text-slate-950 dark:text-slate-50 leading-[1.8] font-serif font-medium pt-4">
            <h3 className="font-sans font-bold text-[16.5px] text-indigo-900 dark:text-indigo-300 flex items-center gap-3 mt-10 mb-3 border-l-[3px] border-indigo-500 pl-3">
              6B. Consistency Assumption
            </h3>
            <p>
              The principle of consistency refers to the practice of using the same accounting policies for similar transactions in all accounting periods. <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-900/40 px-1.5 py-0.5 rounded font-semibold">Consistency</span> improves the comparability of financial statements through time. <PdfRef page={3} />
            </p>
            <p>
              An accounting policy can be changed only in three specific circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-[15.5px]">
              <li>If the change is <strong>required by a statute</strong> (for example, an amendment in corporate law). <PdfRef page={3} /></li>
              <li>If the change is <strong>required by an accounting standard</strong> (for example, a revised or new standard takes effect). <PdfRef page={3} /></li>
              <li>If the change results in a <strong>more appropriate presentation</strong> of the financial statements (for example, switching overhead allocation from labor hours to machine hours to reflect automated operations). <PdfRef page={3} /></li>
            </ul>
            <p>
              Arbitrary changes in accounting policies are prohibited to prevent the manipulation of reported profits. When a policy is changed, full disclosure of the change and its quantified financial effect is required. <PdfRef page={3} />
            </p>
          </div>

          <div id="as1-accrual" className="scroll-mt-36 space-y-6 text-[16px] md:text-[17px] text-slate-950 dark:text-slate-50 leading-[1.8] font-serif font-medium pt-4">
            <h3 className="font-sans font-bold text-[16.5px] text-indigo-900 dark:text-indigo-300 flex items-center gap-3 mt-10 mb-3 border-l-[3px] border-indigo-500 pl-3">
              6C. Accrual Assumption
            </h3>
            <p>
              Under the accrual basis of accounting, transactions and events are recognized as soon as they occur, whether or not cash or its equivalent is actually received or paid. Revenues and costs are accrued, that is, recognized as they are earned or incurred and recorded in the financial statements of the periods to which they relate. <PdfRef page={3} />
            </p>
            <p>
              Accrual basis ensures a better matching between revenue and cost, and the profit or loss obtained on this basis reflects the actual economic activities of the enterprise during a period, rather than merely the cash flows generated by it. <PdfRef page={3} />
            </p>
            <div className="p-5 border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/10 rounded-xl space-y-2.5 my-5 shadow-3xs font-serif">
              <h4 className="font-sans font-bold text-[11px] uppercase tracking-wider text-rose-800 dark:text-rose-400 flex items-center gap-1.5">
                <AlertTriangle size={13} className="text-rose-500" />
                <span>Statutory Mandate &amp; Risk of Capital Erosion</span>
              </h4>
              <p className="text-[15px] leading-relaxed text-slate-950 dark:text-slate-50 font-medium">
                While accrual accounting is logically superior, it exposes the enterprise to the risk of recognizing income before actual receipt. If dividends are paid out based on accrued profits that are never realized, it leads to the <strong>erosion of capital</strong>. For this reason, revenue recognition policies must ensure realization is reasonably certain. Despite this, Section 128(1) of the Companies Act, 2013 makes it mandatory for companies to maintain accounts on an accrual basis only. Cash-basis accounting is not acceptable for corporate entities. In case any income/expense is recognized on a cash basis, the fact must be explicitly stated. <PdfRef page={4} />
              </p>
            </div>
          </div>
        </section>

        {/* Chapter 7: Manner of Disclosure */}
        <section id="as1-disclosure" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="VII" 
            title="Manner of Disclosure" 
            description="The strict presentation format and location of accounting policy disclosures required under Indian Accounting Standards."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              To ensure a proper understanding of the financial statements, all significant accounting policies adopted in the preparation and presentation of financial statements should be disclosed: <PdfRef page={7} />
            </p>
          </div>

          {/* Disclosure Checklist ΓÇö Emerald theme */}
          <div className="my-6 rounded-xl border border-emerald-200 dark:border-emerald-900/40 overflow-hidden font-serif">
            <div className="bg-emerald-700 dark:bg-emerald-800 px-5 py-3 flex items-center gap-2">
              <Check size={14} className="text-white stroke-[3]" />
              <span className="text-[11.5px] font-sans font-bold uppercase tracking-wider text-white">Manner of Disclosure Checklist <PdfRef page={7} /></span>
            </div>
            <div className="divide-y divide-emerald-100 dark:divide-emerald-900/30">
              <div className="flex gap-4 items-start bg-white dark:bg-[#111726] px-5 py-4">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5">
                  <Check size={13} className="stroke-[3]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-[14.5px] text-slate-950 dark:text-white">Orderly Manner</h4>
                  <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">
                    Disclose significant accounting policies actually adopted by the enterprise in an orderly and systematic manner. <PdfRef page={7} />
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start bg-emerald-50/30 dark:bg-emerald-955/10 px-5 py-4">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5">
                  <Check size={13} className="stroke-[3]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-[14.5px] text-slate-950 dark:text-white">Part of Financial Statements</h4>
                  <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">
                    The disclosure of significant accounting policies must form an integral part of the financial statements. <PdfRef page={7} />
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start bg-white dark:bg-[#111726] px-5 py-4">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5">
                  <Check size={13} className="stroke-[3]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-[14.5px] text-slate-950 dark:text-white">Single Place Disclosure</h4>
                  <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">
                    Policies should normally be disclosed in one place (typically under Note 1 to the accounts), rather than scattered over several statements, schedules, or notes. <PdfRef page={7} />
                  </p>
                </div>
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

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              Any change in an accounting policy which has a material effect in the current period or which is reasonably expected to have a material effect in later periods must be disclosed. <PdfRef page={7} />
            </p>
            <p>
              A simple disclosure that a policy has been changed is of little use to the reader. The standard mandates a structured workflow for accounting and disclosing policy changes:
            </p>
          </div>

          {/* Clean Vertical Timeline Step Layout */}
          <div className="my-8 space-y-8 w-full font-serif relative pl-8 border-l border-slate-200 dark:border-slate-800">
            <div className="relative">
              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#111726] border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center text-xs font-bold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-955/20 font-mono select-none">
                1
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-extrabold text-[15px] tracking-wide text-slate-950 dark:text-white">Identify the Change</h4>
                <p className="text-[15px] leading-relaxed text-slate-950 dark:text-slate-50 font-medium">
                  Confirm if a change has occurred in the accounting policies actually followed. Accounting policies can only be changed if mandated by statute, for compliance with a standard, or if the change yields a more appropriate presentation of financial statements. <PdfRef page={7} />
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#111726] border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center text-xs font-bold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-955/20 font-mono select-none">
                2
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-extrabold text-[15px] tracking-wide text-slate-950 dark:text-white">Justify the Change</h4>
                <p className="text-[15px] leading-relaxed text-slate-950 dark:text-slate-50 font-medium">
                  State the reasons why the new policy is adopted and how it complies with standard criteria. The change must be justified as leading to a better presentation of accounts. <PdfRef page={7} />
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#111726] border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center text-xs font-bold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-955/20 font-mono select-none">
                3
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-extrabold text-[15px] tracking-wide text-slate-950 dark:text-white">Quantify the Impact</h4>
                <p className="text-[15px] leading-relaxed text-slate-950 dark:text-slate-50 font-medium">
                  In the case of a change which has a material effect in the current period, the amount by which any item in the financial statements is affected by such change should be disclosed to the extent ascertainable. <PdfRef page={7} />
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#111726] border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center text-xs font-bold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-955/20 font-mono select-none">
                4
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-extrabold text-[15px] tracking-wide text-slate-950 dark:text-white">Disclose Non-Ascertainability</h4>
                <p className="text-[15px] leading-relaxed text-slate-950 dark:text-slate-50 font-medium">
                  Where the financial impact is not ascertainable, either wholly or in part, the fact should be explicitly indicated. <PdfRef page={7} />
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#111726] border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center text-xs font-bold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-955/20 font-mono select-none">
                5
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-extrabold text-[15px] tracking-wide text-slate-950 dark:text-white">Disclose Future Material Impact</h4>
                <p className="text-[15px] leading-relaxed text-slate-950 dark:text-slate-50 font-medium">
                  If a change has no material effect in the current period but is reasonably expected to have a material effect in later periods, the fact of such change should be appropriately disclosed in the period in which the change is adopted. This ensures that stakeholders are warned of changes that will skew comparison in future years. <PdfRef page={8} />
                </p>
              </div>
            </div>
          </div>

          {/* Section 8A: Para 23 Rule Warning Box */}
          <div id="as1-para23" className="scroll-mt-36 pt-6">
            <div className="rounded-xl overflow-hidden border border-rose-300 dark:border-rose-900/50 font-serif">
              <div className="bg-rose-700 dark:bg-rose-800 px-5 py-3 flex items-center gap-2">
                <AlertTriangle size={15} className="text-white" />
                <span className="text-[11.5px] font-sans font-bold uppercase tracking-wider text-white">Audit Warning ΓÇö Para 23: Disclosure is not a Cure</span>
              </div>
              <div className="bg-white dark:bg-[#111726] px-6 py-5">
                <blockquote className="text-[16px] italic font-semibold text-slate-900 dark:text-white leading-relaxed mb-4 border-l-2 border-rose-400 pl-4">
                  "Disclosure of accounting policies or changes therein cannot remedy a wrong or inappropriate accounting treatment." <PdfRef page={7} />
                </blockquote>
                <p className="text-[14.5px] text-slate-800 dark:text-slate-200 leading-relaxed">
                  Disclosure of a wrong treatment is not a substitute for correct accounting. If an incorrect policy has been followed (for example, expensing a capital asset or recognizing revenue prematurely), the auditor remains obligated to qualify the audit report for such non-compliance under Section 143(3) of the Companies Act, 2013, regardless of how clearly the wrong policy is described in the notes. <PdfRef page={7} />
                </p>
              </div>
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
          {/* Statutory Footnotes table ΓÇö Slate themed */}
          <div className="my-8 space-y-2 w-full">
            <div className="text-[13px] font-bold text-slate-700 dark:text-slate-300 font-sans uppercase tracking-wider flex items-center gap-2">
              <span className="inline-block w-1 h-4 bg-slate-500 dark:bg-slate-400 rounded-full"></span>
              Statutory &amp; Regulatory Source References
            </div>
            <div className="overflow-x-auto w-full rounded-xl border border-slate-300 dark:border-slate-700 font-serif">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="font-sans text-[11.5px] font-bold uppercase tracking-wider text-white bg-slate-700 dark:bg-slate-800">
                  <th className="py-3 px-4 w-1/12 text-center">Ref</th>
                  <th className="py-3 px-4 w-3/12">Statutory / Professional Source</th>
                  <th className="py-3 px-4 w-8/12">Detailed Notes &amp; Scope Limits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-900 dark:text-slate-100 font-serif">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors bg-white dark:bg-[#111726]">
                  <td className="py-4 px-4 font-mono font-bold text-slate-500 dark:text-slate-400 text-center text-[15px]">[1]</td>
                  <td className="py-4 px-4 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Preface to Accounting Standards</td>
                  <td className="py-4 px-4 leading-relaxed text-slate-800 dark:text-slate-200">
                    <strong>Materiality Scope:</strong> Accounting Standards apply only to items which are material. Immaterial items do not require explicit compliance or policy disclosure. The determination of materiality is a matter of professional judgment based on the size and nature of the item. <PdfRef page={2} />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors bg-slate-50/50 dark:bg-slate-800/10">
                  <td className="py-4 px-4 font-mono font-bold text-slate-500 dark:text-slate-400 text-center text-[15px]">[2]</td>
                  <td className="py-4 px-4 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Companies Act, 2013 Statutory Compliance</td>
                  <td className="py-4 px-4 leading-relaxed text-slate-800 dark:text-slate-200">
                    Section 129(1) of the Act mandates that financial statements must comply with accounting standards. Section 134(5) requires directors to certify that policies are consistent, reasonable, and prudent. Section 143(3)(e) requires auditors to report on compliance. Non-compliance must be reported in the Auditor's Report, including the financial impact of deviations. <PdfRef page={2} />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors bg-white dark:bg-[#111726]">
                  <td className="py-4 px-4 font-mono font-bold text-slate-500 dark:text-slate-400 text-center text-[15px]">[3]</td>
                  <td className="py-4 px-4 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">AS 11 &amp; Schedule III Requirement</td>
                  <td className="py-4 px-4 leading-relaxed text-slate-800 dark:text-slate-200">
                    <strong>Foreign Currency Translation Policies:</strong> Under AS 11 and Schedule III requirements, companies must disclose translation policies in respect of foreign currency transactions and branches, detailing how exchange gains or losses are recognized. <PdfRef page={2} />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors bg-slate-50/50 dark:bg-slate-800/10">
                  <td className="py-4 px-4 font-mono font-bold text-slate-500 dark:text-slate-400 text-center text-[15px]">[4]</td>
                  <td className="py-4 px-4 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">ICAI &amp; NFRA Regulatory Drive</td>
                  <td className="py-4 px-4 leading-relaxed text-slate-800 dark:text-slate-200">
                    <strong>Standards and Regulatory Drive to Reduce Diversity:</strong> Regulators and standard-setting bodies (such as the ICAI and NFRA) strive to reduce acceptable alternative accounting treatments to improve comparability. However, some diversity remains due to differences in business models and operating conditions. <PdfRef page={5} />
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
const as2Chapters = [
  { id: 'overview',        title: 'Introduction' },
  { id: 'scope',           title: 'Scope' },
  { id: 'definition',      title: 'Definitions' },
  { id: 'measurement',     title: 'Measurement' },
  { id: 'cost-purchase',   title: 'Cost of Purchase' },
  { id: 'cost-conversion', title: 'Cost of Conversion' },
  { id: 'joint-products',  title: 'Joint & By-Products' },
  { id: 'other-costs',     title: 'Other Costs' },
  { id: 'excluded',        title: 'Excluded Costs' },
  { id: 'techniques',      title: 'Cost Techniques' },
  { id: 'formulas',        title: 'Cost Formulas' },
  { id: 'nrv',             title: 'NRV & RM Exception' },
  { id: 'recognition',     title: 'Expense Recognition' },
  { id: 'disclosure',      title: 'Disclosure' }
]

const as2Sections = [
  { id: 'overview',        title: '1. Introduction' },
  { id: 'scope',           title: '2. Scope & Exclusions' },
  { id: 'definition',      title: '3. Definitions' },
  { id: 'measurement',     title: '4. Measurement Principle' },
  { id: 'cost-purchase',   title: '5. Cost of Purchase' },
  { id: 'cost-conversion', title: '6. Cost of Conversion' },
  { id: 'joint-products',  title: '7. Joint & By-Products' },
  { id: 'other-costs',     title: '8. Other Costs' },
  { id: 'excluded',        title: '9. Excluded Costs' },
  { id: 'techniques',      title: '10. Cost Techniques' },
  { id: 'formulas',        title: '11. Cost Formulas' },
  { id: 'nrv',             title: '12. NRV & RM Exception' },
  { id: 'recognition',     title: '13. Expense Recognition' },
  { id: 'disclosure',      title: '14. Disclosure Requirements' }
]

interface AS2StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences: (text: string) => React.ReactNode;
}

function AS2StandardTabContent({ navigateToPdfPage, renderTextWithReferences }: AS2StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    'fifo': true,
    'wa': true,
    'joint': true,
    'rmWriteDown': true
  })

  const toggleAccordion = (id: string) => {
    setOpenAccordions(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const tocScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const initObserver = () => {
      const scrollContainer = document.getElementById('as1-scroll-container');
      if (!scrollContainer) {
        setTimeout(initObserver, 50);
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const secId = entry.target.id.replace('as2-', '');
              setActiveSection(secId);
            }
          });
        },
        {
          root: scrollContainer,
          rootMargin: '-90px 0px -60% 0px',
          threshold: 0
        }
      );

      as2Chapters.forEach((sec) => {
        const el = document.getElementById("as2-" + sec.id);
        if (el) {
          observer?.observe(el);
        }
      });
    };

    initObserver();

    return () => {
      if (observer) {
        observer.disconnect();
      }
    }
  }, [])

  useEffect(() => {
    const el = tocScrollRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    if (!activeSection || !tocScrollRef.current) return;
    const activeBtn = tocScrollRef.current.querySelector('[data-toc-id="' + activeSection + '"]');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeSection]);

  const PdfRef = ({ page }: { page: number }) => (
    <button
      onClick={() => navigateToPdfPage(page)}
      className="inline-flex items-center justify-center w-4 h-4 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-955/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded transition-all cursor-pointer select-none align-middle"
      title={"Open ICAI AS 2 PDF — Page " + page}
    >
      <FileText size={10} className="shrink-0" />
    </button>
  )

  const ChapterHeader = ({ num, title, description }: { num: string; title: string; description: string }) => {
    const numMap: Record<string, string> = {
      'I': '1', 'II': '2', 'III': '3', 'IV': '4', 'V': '5', 'VI': '6', 'VII': '7', 'VIII': '8', 'IX': '9',
      'X': '10', 'XI': '11', 'XII': '12', 'XIII': '13', 'XIV': '14', 'XV': '15'
    };
    const arabicNum = numMap[num] || num;
    return (
      <div className="w-full mb-6 mt-12 first:mt-2">
        <div className="flex items-baseline gap-2 mb-2">
          <h2 className="text-[20px] sm:text-[22px] font-sans font-bold text-slate-900 dark:text-white tracking-tight leading-tight flex items-baseline gap-2">
            <span className="text-indigo-650 dark:text-indigo-400 font-mono font-bold mr-1 select-none">{arabicNum}.</span>
            <span>{title}</span>
          </h2>
        </div>
        <div className="h-[1.5px] w-full bg-slate-200/80 dark:bg-slate-800/80 mb-3" />
        {description && (
          <p className="text-[13.5px] font-sans font-medium text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full animate-fade-in font-sans bg-[#F5F5F3] dark:bg-[#0B0F19] pb-8">
      {/* Sticky Contents Bar */}
      <div id="as2-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div
            ref={tocScrollRef}
            style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }}
            className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5"
          >
            {as2Chapters.map((sec) => (
              <button
                key={sec.id}
                data-toc-id={sec.id}
                onClick={() => {
                  const container = document.getElementById('as1-scroll-container');
                  const target = document.getElementById("as2-" + sec.id);
                  const stickyToc = document.getElementById('as2-sticky-toc');
                  setActiveSection(sec.id);
                  if (container && target) {
                    const containerRect = container.getBoundingClientRect();
                    const targetRect = target.getBoundingClientRect();
                    let stickyOffset = 98;
                    if (stickyToc) {
                      const tocRect = stickyToc.getBoundingClientRect();
                      stickyOffset = tocRect.bottom - containerRect.top;
                    }
                    const targetScrollTop = targetRect.top - containerRect.top + container.scrollTop - stickyOffset + 2;
                    container.scrollTo({ top: targetScrollTop, behavior: 'auto' });
                  }
                }}
                className={"transition-all cursor-pointer px-3.5 py-1.5 rounded-full text-[11.5px] font-sans font-semibold tracking-wide shrink-0 whitespace-nowrap " + (
                  activeSection === sec.id
                    ? 'text-white bg-indigo-600 dark:bg-indigo-500 shadow-sm font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-955 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                )}
              >
                {sec.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Publication Sheet Canvas */}
      <div className="mx-auto w-[98%] max-w-[1720px] bg-white dark:bg-[#111726] shadow-sm border border-slate-200/70 dark:border-slate-850 rounded-xl px-4 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-8 relative my-4">
        
        {/* Chapter 1: Introduction & Purpose */}
        <section id="as2-overview" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="I" 
            title="Introduction &amp; Purpose" 
            description="Prescribing the accounting treatment for inventories under the historical cost system, specifying the cost determination and subsequent write-down parameters."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              The valuation of inventories is of critical significance in accounting because it directly affects both the <strong>Balance Sheet</strong> (value of assets) and the <strong>Statement of Profit &amp; Loss</strong> (cost of goods sold and net profit matching). Under AS 2, the accounting treatment for inventories is defined from the moment costs are incurred until the related revenues are recognized. <PdfRef page={2} />
            </p>
            <p>
              The standard establishes the principles for determining the value of closing inventory that is carried over to the next accounting period, and opening inventory brought forward. In short, the main purpose is to write down inventories when their cost is no longer recoverable (due to obsolescence, price declines, or damage) to ensure that the assets are not stated in excess of their realisable values. <PdfRef page={2} />
            </p>
            <p>
              Part I of Schedule III to the Companies Act, 2013 also mandates that the valuation method adopted by the company must be disclosed explicitly for inventory held by companies. <PdfRef page={4} />
            </p>
          </div>
        </section>

        {/* Chapter 2: Scope & Applicability */}
        <section id="as2-scope" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="II" 
            title="Scope &amp; Exclusions" 
            description="Delineating which asset classes fall under the valuation mandate of AS 2 and detailing statutory exemptions and exclusions."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              This standard applies in valuing inventories for financial statements of all enterprises except in the following specific cases: <PdfRef page={2} />
            </p>
          </div>

          {/* Table: Scope Exclusions */}
          <div className="my-8 space-y-2 w-full">
            <div className="text-[13px] font-bold text-teal-800 dark:text-teal-405 font-sans uppercase tracking-wider flex items-center gap-2">
              <span className="inline-block w-1 h-4 bg-teal-600 dark:bg-teal-450 rounded-full"></span>
              Table 1 — Statutory Exclusions from AS 2 Scope <PdfRef page={2} />
            </div>
            <div className="overflow-x-auto w-full rounded-xl border border-teal-200 dark:border-teal-900/40">
              <table className="w-full text-left border-collapse text-[13.5px]">
                <thead>
                  <tr className="font-sans text-[11.5px] font-bold uppercase tracking-wider text-white bg-teal-700 dark:bg-teal-850">
                    <th className="py-3 px-5 w-1/2">Exclusion Category</th>
                    <th className="py-3 px-5 w-1/2">Applicable Treatment / Standard Reference</th>
                  </tr>
                </thead>
                <tbody className="text-slate-900 dark:text-slate-100 font-serif divide-y divide-teal-100 dark:divide-teal-900/30">
                  <tr className="bg-white dark:bg-[#111726] hover:bg-teal-50/30 dark:hover:bg-teal-955/5">
                    <td className="py-4 px-5 leading-relaxed align-top font-semibold">
                      Work-in-process arising under construction contracts (including directly related service contracts)
                    </td>
                    <td className="py-4 px-5 leading-relaxed align-top text-slate-700 dark:text-slate-350">
                      Excluded — Valued in accordance with <strong>AS 7 (Accounting for Construction Contracts)</strong>. However, unconsumed materials lying at construction site (e.g. cement, sand) are covered under AS 2. <PdfRef page={2} />
                    </td>
                  </tr>
                  <tr className="bg-teal-50/10 dark:bg-[#0f1c22]/10 hover:bg-teal-50/30 dark:hover:bg-teal-955/5">
                    <td className="py-4 px-5 leading-relaxed align-top font-semibold">
                      Work-in-process arising in the ordinary course of business of service providers
                    </td>
                    <td className="py-4 px-5 leading-relaxed align-top text-slate-700 dark:text-slate-355">
                      Excluded (Partially) — Measured at production cost. Note that unconsumed stores (e.g. shipping fuel not consumed) are covered, but voyage-in-progress service costs are excluded. <PdfRef page={3} />
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-[#111726] hover:bg-teal-50/30 dark:hover:bg-teal-955/5">
                    <td className="py-4 px-5 leading-relaxed align-top font-semibold">
                      Shares, debentures and other financial instruments held as stock-in-trade
                    </td>
                    <td className="py-4 px-5 leading-relaxed align-top text-slate-700 dark:text-slate-300">
                      Excluded — Valued in accordance with <strong>AS 13 (Accounting for Investments)</strong>. Under current Indian GAAP, these are valued at lower of cost and fair value. <PdfRef page={3} />
                    </td>
                  </tr>
                  <tr className="bg-teal-50/10 dark:bg-[#0f1c22]/10 hover:bg-teal-50/30 dark:hover:bg-teal-955/5">
                    <td className="py-4 px-5 leading-relaxed align-top font-semibold text-teal-800 dark:text-teal-400">
                      Producers' inventories of livestock, agricultural/forest products, mineral oils, ores, and gases
                    </td>
                    <td className="py-4 px-5 leading-relaxed align-top text-slate-700 dark:text-slate-300">
                      Excluded — Measured at Net Realisable Value (NRV) in accordance with well established practices in those industries (e.g. forward contract or government guarantee). <PdfRef page={3} />
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-[#111726] hover:bg-teal-50/30 dark:hover:bg-teal-955/5">
                    <td className="py-4 px-5 leading-relaxed align-top font-semibold text-indigo-700 dark:text-indigo-400">
                      Land and properties held for resale by real estate developers
                    </td>
                    <td className="py-4 px-5 leading-relaxed align-top text-slate-705 dark:text-slate-300 font-semibold">
                      INCLUDED — Real estate inventory is treated as inventory under AS 2 and must be valued at lower of cost and Net Realisable Value. <PdfRef page={2} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Chapter 3: Definitions */}
        <section id="as2-definition" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="III" 
            title="Definition of Inventories" 
            description="Formal definition of inventories under statutory definitions, categorizing raw materials, work-in-progress, finished goods, and spares."
          />

          {/* Official Definition Card */}
          <div className="p-6 border-l-4 border-blue-600 dark:border-blue-500 border border-blue-200 dark:border-blue-900/40 bg-blue-50/30 dark:bg-blue-955/10 rounded-xl my-6">
            <div className="text-[10.5px] font-sans font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-3 flex items-center gap-2">
              <BookOpen size={13} className="text-blue-600 dark:text-blue-450" />
              <span>Official Definition — AS 2, Para 1.2</span>
            </div>
            <p className="text-[16px] font-serif font-semibold text-slate-950 dark:text-slate-100 leading-[1.8] italic">
              "Inventories are assets: (a) held for sale in the ordinary course of business; (b) in the process of production for such sale; or (c) in the form of materials or supplies to be consumed in the production process or in the rendering of services." <PdfRef page={2} />
            </p>
          </div>

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              Under this definition, inventories encompass merchandise (goods) purchased by a retailer and held for resale (e.g. trading stock), finished goods produced, work-in-progress being produced, and materials, maintenance supplies, consumables, and loose tools awaiting use in the production process. <PdfRef page={2} />
            </p>
            <p>
              The types of inventories are related to the nature of business. The inventories of a <strong>trading concern</strong> consist primarily of products purchased for resale in their existing form, plus supplies like wrapping paper and stationery. The inventories of a <strong>manufacturing concern</strong> consist of: raw material (which will become part of the goods to be produced), parts and factory supplies, work-in-process (partially completed products), and finished products. <PdfRef page={3} />
            </p>
          </div>

          {/* Info Card: Spare Parts Exception */}
          <div className="p-5 border border-blue-150 dark:border-blue-900/40 bg-blue-50/20 dark:bg-blue-955/5 rounded-xl space-y-2.5">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-blue-800 dark:text-blue-400 flex items-center gap-2">
              <Info size={14} />
              <span>PPE Spares vs. Inventory Spares Exception</span>
            </h4>
            <p className="text-[15px] leading-relaxed text-slate-955 dark:text-slate-50 font-medium">
              Inventories do NOT include spare parts, servicing equipment, and standby equipment that meet the definition of Property, Plant, and Equipment (PPE) under <strong>AS 10 (Revised)</strong>. Such items must be capitalised as PPE and depreciated over their useful life. Only general stores, spares, and loose tools awaiting use in production are classified as inventory under AS 2. <PdfRef page={2} />
            </p>
          </div>
        </section>

        {/* Chapter 4: Measurement Principle */}
        <section id="as2-measurement" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="IV" 
            title="Measurement Principle" 
            description="The foundational rule of valuation: comparing historical costs against net realisable recovery values under the prudence rule."
          />

          <div className="p-6 border-l-4 border-indigo-650 dark:border-indigo-400 border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/30 dark:bg-indigo-955/10 rounded-xl my-6">
            <p className="text-[16px] font-serif font-semibold text-slate-950 dark:text-slate-100 leading-[1.8] text-center">
              "Inventories should be valued at the lower of Cost and Net Realisable Value." <PdfRef page={4} />
            </p>
          </div>

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              This is a direct application of the fundamental accounting consideration of <strong>Prudence</strong>. Anticipating profits before they are realised is prohibited, whereas all foreseeable losses must be recognized immediately. If the Net Realisable Value (NRV) of an item is less than its cost, the difference is written down and charged to the Profit &amp; Loss statement in the current year. <PdfRef page={4} />
            </p>
            <p>
              <strong>Net Realisable Value</strong> is the estimated selling price in the ordinary course of business less the estimated costs of completion and the estimated costs necessary to make the sale. This is an <em>entity-specific value</em>, unlike <strong>Fair Value</strong>, which is market-based and does not deduct transaction costs. <PdfRef page={4} />
            </p>
            <p>
              The valuation of inventory at the lower of cost and net realisable value is based on the view that no asset should be carried at a value which is in excess of the value realisable by its sale or use. <PdfRef page={5} />
            </p>
          </div>
        </section>

        {/* Chapter 5: Cost of Purchase */}
        <section id="as2-cost-purchase" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="V" 
            title="Cost of Purchase" 
            description="Analyzing components of purchase costs, detailing non-refundable duties, freight, insurance, and the treatment of discounts."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              The cost of purchase of inventories comprises the purchase price, import duties, other non-refundable taxes, transport, handling, and other costs directly attributable to the acquisition of finished goods, materials, and services. <PdfRef page={6} />
            </p>
          </div>

          {/* Table: Cost of Purchase Inclusions and Exclusions */}
          <div className="my-8 space-y-2 w-full">
            <div className="text-[13px] font-bold text-indigo-800 dark:text-indigo-400 font-sans uppercase tracking-wider flex items-center gap-2">
              <span className="inline-block w-1 h-4 bg-indigo-650 dark:bg-indigo-450 rounded-full"></span>
              Table 2 — Cost of Purchase Components <PdfRef page={6} />
            </div>
            <div className="overflow-x-auto w-full rounded-xl border border-indigo-200 dark:border-indigo-900/40">
              <table className="w-full text-left border-collapse text-[13.5px]">
                <thead>
                  <tr className="font-sans text-[11.5px] font-bold uppercase tracking-wider text-white bg-indigo-700 dark:bg-indigo-850">
                    <th className="py-3 px-5 w-1/2">Inward Inclusions (Added to Cost)</th>
                    <th className="py-3 px-5 w-1/2">Deductions &amp; Exclusions (Deducted / Expensed)</th>
                  </tr>
                </thead>
                <tbody className="text-slate-900 dark:text-slate-100 font-serif divide-y divide-indigo-100 dark:divide-indigo-900/30">
                  <tr className="bg-white dark:bg-[#111726]">
                    <td className="py-3.5 px-5 leading-relaxed align-top">Purchase Price (invoice price from supplier)</td>
                    <td className="py-3.5 px-5 leading-relaxed align-top text-red-600 dark:text-red-400">Trade Discounts, rebates, and duty drawbacks (must be deducted from cost)</td>
                  </tr>
                  <tr className="bg-indigo-50/10 dark:bg-[#0f1c22]/10">
                    <td className="py-3.5 px-5 leading-relaxed align-top">Import Duties and non-refundable purchase taxes</td>
                    <td className="py-3.5 px-5 leading-relaxed align-top text-red-600 dark:text-red-400">Refundable taxes (e.g. GST where Input Tax Credit is claimed)</td>
                  </tr>
                  <tr className="bg-white dark:bg-[#111726]">
                    <td className="py-3.5 px-5 leading-relaxed align-top">Inward Freight, insurance during transit, and handling costs</td>
                    <td className="py-3.5 px-5 leading-relaxed align-top text-red-600 dark:text-red-400">Outward freight to customers (treated as selling and distribution cost in P&amp;L)</td>
                  </tr>
                  <tr className="bg-indigo-50/10 dark:bg-[#0f1c22]/10">
                    <td className="py-3.5 px-5 leading-relaxed align-top">Direct acquisition costs (clearing charges, octroi)</td>
                    <td className="py-3.5 px-5 leading-relaxed align-top text-red-600 dark:text-red-400">Cash Discounts for early payment (treated as interest/finance income in P&amp;L — NOT deducted from cost)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Chapter 6: Cost of Conversion */}
        <section id="as2-cost-conversion" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="VI" 
            title="Cost of Conversion &amp; Overheads" 
            description="Allocation rules for direct labor and systematic absorption of fixed and variable production overheads."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              The costs of conversion of inventories include costs directly related to the units of production (such as direct labour and direct expenses) and a systematic allocation of fixed and variable production overheads that are incurred in converting materials into finished goods. <PdfRef page={6} />
            </p>
            <p>
              <strong>Variable production overheads</strong> are assigned to each unit of production on the basis of the <em>actual use</em> of the production facilities (e.g., indirect materials and indirect labor). <PdfRef page={6} />
            </p>
            <p>
              <strong>Fixed production overheads</strong> are those indirect costs of production that remain relatively constant regardless of the volume of production (e.g., depreciation and maintenance of factory buildings and equipment, and factory administration costs). They should be absorbed systematically over <em>normal capacity</em>. <PdfRef page={6} />
            </p>
            <p>
              Normal capacity is the production the enterprise expects to achieve on an average over a number of periods or seasons under normal circumstances, taking into account the loss of capacity resulting from planned maintenance. The actual level of production may be used if it approximates normal capacity. <PdfRef page={6} />
            </p>
          </div>

          {/* Indigo Box: The Normal Capacity Rule */}
          <div className="p-6 my-6 border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/25 dark:bg-indigo-955/5 rounded-xl font-serif shadow-3xs">
            <span className="text-[11.5px] font-bold text-indigo-850 dark:text-indigo-400 uppercase tracking-wider block mb-2 font-sans">
              Core Accounting Rule — Fixed Overheads Allocation (Normal Capacity)
            </span>
            <p className="text-[15px] text-slate-950 dark:text-slate-50 leading-relaxed mb-3 font-semibold">
              Fixed production overhead rate is determined as: Total Expected Fixed Overheads ÷ Normal Capacity.
            </p>
            <ul className="list-disc pl-5 text-[14px] text-slate-800 dark:text-slate-300 space-y-2">
              <li><strong>Low Production or Idle Plant (Actual &lt; Normal):</strong> The rate of allocation per unit is NOT increased. Overheads are absorbed into inventory using the Normal Capacity rate, and the unallocated under-absorbed fixed overhead is expensed immediately in P&amp;L as a period cost. <PdfRef page={6} /></li>
              <li><strong>Abnormally High Production (Actual &ge; Normal):</strong> The amount of fixed overhead allocated to each unit is decreased so that inventories are not measured above actual cost. Fixed overheads are absorbed based on actual production units. <PdfRef page={6} /></li>
            </ul>
          </div>
        </section>

        {/* Chapter 7: Joint & By-Products */}
        <section id="as2-joint-products" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="VII" 
            title="Allocation of Joint &amp; By-Products" 
            description="Procedures for joint cost allocation at split-off point and the accounting write-off of by-product NRV."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              When a production process results in more than one product being produced simultaneously (joint products or a main product and a by-product) and the costs of conversion of each product are not separately identifiable, they are allocated between the products on a rational and consistent basis. <PdfRef page={7} />
            </p>
            <p>
              The allocation methods include the relative sales value method at the split-off point (when products become separately identifiable), sales value at completion less further processing costs, or physical output measurements. <PdfRef page={7} />
            </p>
          </div>

          {/* Accordion: Joint Cost Methods */}
          <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-[#111726]">
            <div className="bg-slate-50 dark:bg-slate-800/40 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer select-none font-sans" onClick={() => toggleAccordion('joint')}>
              <span className="font-bold text-slate-900 dark:text-white text-sm">Methods for Allocating Joint costs &amp; By-products</span>
              <ChevronDown size={16} className={"transform transition-transform duration-200 " + (openAccordions.joint ? "rotate-180" : "")} />
            </div>
            {openAccordions.joint && (
              <div className="p-5 bg-slate-50/10 dark:bg-slate-900/10 text-[14px] space-y-3 font-sans leading-relaxed">
                <p><strong>1. Relative Sales Value at Split-off:</strong> Joint costs are allocated based on the relative market value of each product at the split-off stage. <PdfRef page={7} /></p>
                <p><strong>2. Sales Value at Completion:</strong> Useful when further processing is required. Costs are allocated based on final sales value less further processing costs. <PdfRef page={7} /></p>
                <p><strong>3. By-Products Treatment:</strong> Value of by-products, scraps, and wastes are usually not material. They are measured at Net Realisable Value (NRV). This NRV is deducted from the joint cost of the main product: <br />
                <span className="font-mono text-xs block p-2 bg-slate-100 dark:bg-slate-900 rounded border mt-1 text-center font-bold text-slate-800 dark:text-slate-200">
                  Net Cost of Main Product = Total Joint Cost − NRV of By-Product
                </span>
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Chapter 8: Other Costs */}
        <section id="as2-other-costs" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="VIII" 
            title="Other Costs (Inclusions &amp; Exclusions)" 
            description="Analyzing borrowing cost exceptions for maturing inventory, customized design costs, and amortization of intangibles."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              Other costs are included in the cost of inventories only to the extent that they are incurred in bringing the inventories to their present location and condition. <PdfRef page={8} />
            </p>
            <p>
              For example, custom design costs and drawings for specific customer orders are capitalized. Amortisation of production-related intangible assets (e.g. production patent rights or publisher's copyrights) is also capitalized. <PdfRef page={8} />
            </p>
            <p>
              <strong>Borrowing Costs (Maturing Exception):</strong> Interest and borrowing costs (AS 16) are generally excluded. However, they are capitalized where the inventory necessarily takes a substantial period of time to get ready for its intended sale (e.g. aging of cheese, whiskey, or maturing wine). <PdfRef page={8} />
            </p>
            <p>
              <strong>Exchange Differences:</strong> Exchange differences arising on foreign currency transactions are not taken in inventory costs. <PdfRef page={8} />
            </p>
          </div>
        </section>

        {/* Chapter 9: Excluded Costs */}
        <section id="as2-excluded" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="IX" 
            title="Excluded Costs (Expensed to P&amp;L)" 
            description="Exclusion of abnormal wastage, non-production storage, selling, and general administration expenses."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              Certain costs do not contribute to bringing inventories to their present location and condition and must be recognised as expenses in the period in which they are incurred: <PdfRef page={9} />
            </p>
          </div>

          {/* Grid of Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 font-sans">
            <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50/10 dark:bg-red-955/5">
              <h4 className="font-bold text-red-700 dark:text-red-400 text-xs uppercase tracking-wider mb-1.5">Abnormal Waste</h4>
              <p className="text-[13px] text-slate-600 dark:text-gray-400">Abnormal amounts of wasted materials, labour, or other production costs (e.g. machine breakdowns, strikes, or material spills). <PdfRef page={9} /></p>
            </div>
            <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50/10 dark:bg-red-955/5">
              <h4 className="font-bold text-red-700 dark:text-red-400 text-xs uppercase tracking-wider mb-1.5">Storage Costs</h4>
              <p className="text-[13px] text-slate-600 dark:text-gray-400">Storage costs, unless those costs are necessary in the production process prior to a further production stage (e.g., storing finished goods is expensed; maturing cheese storage is capitalized). <PdfRef page={9} /></p>
            </div>
            <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50/10 dark:bg-red-955/5">
              <h4 className="font-bold text-red-700 dark:text-red-400 text-xs uppercase tracking-wider mb-1.5">Administrative Overheads</h4>
              <p className="text-[13px] text-slate-600 dark:text-gray-400">General office administrative overheads that do not contribute to bringing inventories to their present location and condition. <PdfRef page={9} /></p>
            </div>
            <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50/10 dark:bg-red-955/5">
              <h4 className="font-bold text-red-700 dark:text-red-400 text-xs uppercase tracking-wider mb-1.5">Selling &amp; Distribution</h4>
              <p className="text-[13px] text-slate-600 dark:text-gray-400">Costs of marketing, advertising, showroom rent, delivery vehicle expenses, and outward freight. <PdfRef page={9} /></p>
            </div>
          </div>
        </section>

        {/* Chapter 10: Cost Measurement Techniques */}
        <section id="as2-techniques" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="X" 
            title="Cost Measurement Techniques" 
            description="Approximating historical costs using Standard Costing or the Gross Margin Retail Method."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              Techniques for the measurement of the cost of inventories, such as the standard cost method or the retail method, may be used for convenience if the results approximate cost. <PdfRef page={9} />
            </p>
            <p>
              <strong>Standard Costs</strong> are set based on normal levels of materials, labour, efficiency, and capacity utilisation. They are regularly reviewed and revised in the light of current conditions. <PdfRef page={9} />
            </p>
            <p>
              <strong>Retail Method (Gross Margin Reduction)</strong> is used in retail business where there is a large number of rapidly changing items with similar margins. The cost of inventory is calculated by reducing the sales value of the unsold stock by the appropriate percentage of gross margin. <PdfRef page={10} />
            </p>
          </div>
        </section>

        {/* Chapter 11: Cost Formulas */}
        <section id="as2-formulas" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="XI" 
            title="Cost Formulas &amp; LIFO Prohibition" 
            description="Valuing interchangeable lots with FIFO or Weighted Average formulas and the reasons for LIFO prohibition."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              Items that are not ordinarily interchangeable and goods or services produced and segregated for specific projects should have their costs assigned by using <strong>Specific Identification of their individual costs</strong>. <PdfRef page={9} />
            </p>
            <p>
              For interchangeable lots, costs are assigned using either the <strong>First-In, First-Out (FIFO)</strong> or <strong>Weighted Average Cost (WAC)</strong> formulas. The formula used should reflect the fairest possible approximation to the cost incurred. <PdfRef page={9} />
            </p>
          </div>

          {/* Accordion: FIFO & WA */}
          <div className="space-y-4 font-sans">
            <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-[#111726]">
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer select-none font-sans" onClick={() => toggleAccordion('fifo')}>
                <span className="font-bold text-slate-905 dark:text-white text-sm">First-In, First-Out (FIFO) Formula</span>
                <ChevronDown size={16} className={"transform transition-transform duration-200 " + (openAccordions.fifo ? "rotate-180" : "")} />
              </div>
              {openAccordions.fifo && (
                <div className="p-5 bg-slate-50/10 dark:bg-slate-900/10 text-[14px] leading-relaxed font-sans text-slate-700 dark:text-slate-300">
                  Assumes items purchased first are sold/consumed first. In periods of rising prices (inflation):
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Closing inventory is valued at recent higher prices (higher asset values on balance sheet).</li>
                    <li>Cost of sales uses older lower costs, leading to higher reported profits.</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-[#111726]">
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer select-none font-sans" onClick={() => toggleAccordion('wa')}>
                <span className="font-bold text-slate-905 dark:text-white text-sm font-sans">Weighted Average Cost (WAC) Formula</span>
                <ChevronDown size={16} className={"transform transition-transform duration-200 " + (openAccordions.wa ? "rotate-180" : "")} />
              </div>
              {openAccordions.wa && (
                <div className="p-5 bg-slate-50/10 dark:bg-slate-900/10 text-[14px] leading-relaxed font-sans text-slate-700 dark:text-slate-300">
                  Calculates cost as the weighted average of similar items at the beginning of the period and items purchased during the period. Smooths out price fluctuations, showing moderate inventory values and profits. <PdfRef page={9} />
                </div>
              )}
            </div>
          </div>

          {/* Warning Box: LIFO prohibition */}
          <div className="p-5 border border-red-200 dark:border-red-900/40 bg-red-50/20 dark:bg-red-955/5 rounded-xl space-y-2.5">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-red-800 dark:text-red-400 flex items-center gap-2">
              <AlertTriangle size={14} />
              <span>LIFO Method is Strictly Prohibited</span>
            </h4>
            <p className="text-[14.5px] leading-relaxed text-slate-955 dark:text-slate-305 font-medium font-serif">
              The <strong>LIFO (Last-In, First-Out)</strong> method is strictly prohibited under AS 2. Carrying historical, outdated inventory values on the balance sheet fails to reflect a true and fair view of current asset valuations and distorts the net income during inflationary periods. <PdfRef page={9} />
            </p>
          </div>
        </section>

        {/* Chapter 12: NRV & Raw Material Exception */}
        <section id="as2-nrv" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="XII" 
            title="Net Realisable Value (NRV) &amp; Raw Material Exception" 
            description="Comparing cost vs NRV on an item-by-item basis and applying the raw material write-down exception."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              The comparison between cost and Net Realisable Value (NRV) must be made on an <strong>item-by-item basis</strong>. Grouping similar or related items is permitted only under restricted conditions (e.g. items of the same product line having similar end uses). Grouping entire classes (e.g. all finished goods) is prohibited. <PdfRef page={11} />
            </p>
            <p>
              Estimates of net realisable value are based on the most reliable evidence available at the time the estimates are made. These estimates take into consideration fluctuations of price or cost directly relating to events occurring after the balance sheet date to the extent that such events confirm the conditions existing at the balance sheet date. <PdfRef page={10} />
            </p>
          </div>

          {/* Accordion: Raw Materials Exception */}
          <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-[#111726]">
            <div className="bg-slate-50 dark:bg-slate-800/40 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer select-none font-sans" onClick={() => toggleAccordion('rmWriteDown')}>
              <span className="font-bold text-slate-900 dark:text-white text-sm">Critical Rule: Raw Materials Valuation &amp; Replacement Cost</span>
              <ChevronDown size={16} className={"transform transition-transform duration-200 " + (openAccordions.rmWriteDown ? "rotate-180" : "")} />
            </div>
            {openAccordions.rmWriteDown && (
              <div className="p-5 bg-slate-50/10 dark:bg-slate-900/10 text-[14.5px] space-y-3 font-sans leading-relaxed text-slate-700 dark:text-slate-305">
                <p className="font-semibold text-slate-900 dark:text-white font-serif">
                  Materials and other supplies held for use in the production of inventories are NOT written down below cost if the finished products in which they are to be incorporated are expected to be sold at or above cost. <PdfRef page={11} />
                </p>
                <p className="font-serif">
                  <strong>Why?</strong> Since the finished product recovers its cost, the raw materials are expected to be fully recovered. Writing down raw materials in such cases would create an artificial loss in the current year.
                </p>
                <p className="text-red-600 dark:text-red-400 font-bold font-sans">The Exception (When to write down Raw Materials):</p>
                <p className="font-serif">
                  If the finished goods' selling price is estimated to be below cost, raw materials are written down to replacement cost. Under AS 2, the <strong>replacement cost</strong> of the materials is the best available measure of their net realisable value. <PdfRef page={11} />
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Chapter 13: Expense Recognition */}
        <section id="as2-recognition" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="XIII" 
            title="Recognition as Expense" 
            description="Accounting entries for inventory sales, write-downs, reversals, and wastage."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              When inventories are sold, their carrying amount is recognized as Cost of Goods Sold (expense) in the period when the related revenue is recognized. Write-downs of inventories to NRV are recognized as expenses in the period the write-down occurs. <PdfRef page={12} />
            </p>
            <p>
              If the NRV subsequently increases in a future period, the write-down is reversed. The reversal amount is recognized as a reduction in inventory expense (credited to COGS) in the period of reversal, but it is capped at the original write-down amount (cannot exceed historical cost). <PdfRef page={12} />
            </p>
          </div>

          {/* Journal Entries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40">
              <span className="font-bold text-[11px] text-slate-550 dark:text-slate-400 uppercase tracking-wider block mb-2 font-sans">On Sale of Inventory</span>
              <pre className="p-3 bg-white dark:bg-slate-955 border rounded text-xs font-mono leading-relaxed text-slate-800 dark:text-slate-300">
                {"Dr. Cost of Goods Sold\n  Cr. Inventory\n[Recognized in P&L matching revenue]"}
              </pre>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40">
              <span className="font-bold text-[11px] text-slate-550 dark:text-slate-400 uppercase tracking-wider block mb-2 font-sans">NRV Write-down</span>
              <pre className="p-3 bg-white dark:bg-slate-955 border rounded text-xs font-mono leading-relaxed text-slate-800 dark:text-slate-300">
                {"Dr. Loss on NRV Write-down (P&L)\n  Cr. Inventory\n[Recognized immediately as period cost]"}
              </pre>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40">
              <span className="font-bold text-[11px] text-slate-550 dark:text-slate-400 uppercase tracking-wider block mb-2 font-sans">Reversal of Write-down</span>
              <pre className="p-3 bg-white dark:bg-slate-955 border rounded text-xs font-mono leading-relaxed text-slate-800 dark:text-slate-300">
                {"Dr. Inventory\n  Cr. Cost of Goods Sold (Reduction)\n[Capped at the original write-down amount]"}
              </pre>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40">
              <span className="font-bold text-[11px] text-slate-550 dark:text-slate-400 uppercase tracking-wider block mb-2 font-sans">Abnormal Wastage</span>
              <pre className="p-3 bg-white dark:bg-slate-955 border rounded text-xs font-mono leading-relaxed text-slate-800 dark:text-slate-300">
                {"Dr. Abnormal Loss A/c (P&L)\n  Cr. WIP / Raw Materials\n[Charged directly to Profit & Loss]"}
              </pre>
            </div>
          </div>
        </section>

        {/* Chapter 14: Disclosure Requirements */}
        <section id="as2-disclosure" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="XIV" 
            title="Disclosure Requirements" 
            description="Mandatory reporting parameters including cost formulas and categorizations under Para 22."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              To maintain comparability and transparency, the financial statements shall disclose: <PdfRef page={12} />
            </p>
          </div>

          {/* Checklist Boxes */}
          <div className="space-y-3 font-sans">
            <div className="flex items-start gap-3 p-4 rounded-xl border border-blue-200 dark:border-blue-900/30 bg-blue-50/20 dark:bg-blue-955/5">
              <span className="text-blue-500 font-bold">☑</span>
              <div>
                <p className="text-[14.5px] text-slate-800 dark:text-slate-200 font-semibold font-sans">Accounting Policies and Cost Formula</p>
                <p className="text-xs text-slate-500 dark:text-slate-405 mt-1 font-sans">Disclose the accounting policies adopted in measuring inventories, including the cost formula used (FIFO or Weighted Average). <PdfRef page={12} /></p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl border border-blue-200 dark:border-blue-900/30 bg-blue-50/20 dark:bg-blue-955/5">
              <span className="text-blue-500 font-bold">☑</span>
              <div>
                <p className="text-[14.5px] text-slate-800 dark:text-slate-200 font-semibold font-sans">Classification break-up of Carrying Amounts</p>
                <p className="text-xs text-slate-500 dark:text-slate-405 mt-1 font-sans">Disclose total carrying amount classified appropriate to the enterprise: (1) Raw Materials, (2) WIP, (3) Finished Goods, (4) Stock-in-trade (for retail resale), (5) Stores and spares, (6) Loose tools, (7) Others. <PdfRef page={12} /></p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-200 dark:border-amber-900/30 bg-amber-50/20 dark:bg-amber-955/5">
              <span className="text-amber-600 dark:text-amber-400 font-bold">☐</span>
              <div>
                <p className="text-[14.5px] text-slate-800 dark:text-slate-200 font-semibold font-sans">NRV Write-down and reversals (if any)</p>
                <p className="text-xs text-slate-500 dark:text-slate-405 mt-1 font-sans">Disclose the write-down amount and the circumstances that led to the reversal. <PdfRef page={12} /></p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-200 dark:border-amber-900/30 bg-amber-50/20 dark:bg-amber-955/5">
              <span className="text-amber-600 dark:text-amber-400 font-bold">☐</span>
              <div>
                <p className="text-[14.5px] text-slate-805 dark:text-slate-200 font-semibold font-sans">Inventories pledged as security</p>
                <p className="text-xs text-slate-500 dark:text-slate-405 mt-1 font-sans">Disclose the carrying amount of inventories pledged as security for liabilities. <PdfRef page={12} /></p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}


const as3Chapters = [
  { id: 'overview',        title: 'Introduction' },
  { id: 'applicability',   title: 'Applicability' },
  { id: 'definitions',     title: 'Cash Equivalents' },
  { id: 'classification',  title: 'Classification' },
  { id: 'operating',       title: 'Operating Activities' },
  { id: 'investing',       title: 'Investing Activities' },
  { id: 'financing',       title: 'Financing Activities' },
  { id: 'special',         title: 'Interest & Dividends' },
  { id: 'extraordinary',   title: 'Tax & Extraordinary' },
  { id: 'non-cash',        title: 'Non-Cash Rules' },
  { id: 'netting',         title: 'Netting Rules' },
  { id: 'acquisitions',    title: 'Business Purchase' },
  { id: 'disclosure',      title: 'Disclosures' }
]

const as3Sections = [
  { id: 'overview',        title: '1. Introduction' },
  { id: 'applicability',   title: '2. Scope & Exemptions' },
  { id: 'definitions',     title: '3. Cash & Cash Equivalents' },
  { id: 'classification',  title: '4. Classification' },
  { id: 'operating',       title: '5. Operating Activities' },
  { id: 'investing',       title: '6. Investing Activities' },
  { id: 'financing',       title: '7. Financing Activities' },
  { id: 'special',         title: '8. Interest & Dividends' },
  { id: 'extraordinary',   title: '9. Tax & Extraordinary' },
  { id: 'non-cash',        title: '10. Non-Cash Rules' },
  { id: 'netting',         title: '11. Netting Rules' },
  { id: 'acquisitions',    title: '12. Business Purchase' },
  { id: 'disclosure',      title: '13. Disclosures' }
]

interface AS3StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
}

function AS3StandardTabContent({ navigateToPdfPage }: AS3StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    'direct': true,
    'indirect': true,
    'netting-exceptions': false
  })

  const toggleAccordion = (id: string) => {
    setOpenAccordions(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const tocScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const initObserver = () => {
      const scrollContainer = document.getElementById('as1-scroll-container');
      if (!scrollContainer) {
        setTimeout(initObserver, 50);
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const secId = entry.target.id.replace('as3-', '');
              setActiveSection(secId);
            }
          });
        },
        {
          root: scrollContainer,
          rootMargin: '-90px 0px -60% 0px',
          threshold: 0
        }
      );

      as3Chapters.forEach((sec) => {
        const el = document.getElementById("as3-" + sec.id);
        if (el) {
          observer?.observe(el);
        }
      });
    };

    initObserver();

    return () => {
      if (observer) {
        observer.disconnect();
      }
    }
  }, [])

  useEffect(() => {
    const el = tocScrollRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    if (!activeSection || !tocScrollRef.current) return;
    const activeBtn = tocScrollRef.current.querySelector('[data-toc-id="' + activeSection + '"]');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeSection]);

  const PdfRef = ({ page }: { page: number }) => (
    <button
      onClick={() => navigateToPdfPage(page)}
      className="inline-flex items-center justify-center w-4 h-4 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-955/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded transition-all cursor-pointer select-none align-middle"
      title={"Open ICAI AS 3 PDF — Page " + page}
    >
      <FileText size={10} className="shrink-0" />
    </button>
  )

  const ChapterHeader = ({ num, title, description }: { num: string; title: string; description: string }) => {
    const numMap: Record<string, string> = {
      'I': '1', 'II': '2', 'III': '3', 'IV': '4', 'V': '5', 'VI': '6', 'VII': '7', 'VIII': '8', 'IX': '9',
      'X': '10', 'XI': '11', 'XII': '12', 'XIII': '13', 'XIV': '14', 'XV': '15'
    };
    const arabicNum = numMap[num] || num;
    return (
      <div className="w-full mb-6 mt-12 first:mt-2">
        <div className="flex items-baseline gap-2 mb-2">
          <h2 className="text-[20px] sm:text-[22px] font-sans font-bold text-slate-900 dark:text-white tracking-tight leading-tight flex items-baseline gap-2">
            <span className="text-indigo-650 dark:text-indigo-400 font-mono font-bold mr-1 select-none">{arabicNum}.</span>
            <span>{title}</span>
          </h2>
        </div>
        <div className="h-[1.5px] w-full bg-slate-200/80 dark:bg-slate-800/80 mb-3" />
        {description && (
          <p className="text-[13.5px] font-sans font-medium text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full animate-fade-in font-sans bg-[#F5F5F3] dark:bg-[#0B0F19] pb-8">
      {/* Sticky Contents Bar */}
      <div id="as3-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div
            ref={tocScrollRef}
            style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }}
            className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5"
          >
            {as3Chapters.map((sec) => (
              <button
                key={sec.id}
                data-toc-id={sec.id}
                onClick={() => {
                  const container = document.getElementById('as1-scroll-container');
                  const target = document.getElementById("as3-" + sec.id);
                  const stickyToc = document.getElementById('as3-sticky-toc');
                  setActiveSection(sec.id);
                  if (container && target) {
                    const containerRect = container.getBoundingClientRect();
                    const targetRect = target.getBoundingClientRect();
                    let stickyOffset = 98;
                    if (stickyToc) {
                      const tocRect = stickyToc.getBoundingClientRect();
                      stickyOffset = tocRect.bottom - containerRect.top;
                    }
                    const targetScrollTop = targetRect.top - containerRect.top + container.scrollTop - stickyOffset + 2;
                    container.scrollTo({ top: targetScrollTop, behavior: 'auto' });
                  }
                }}
                className={"transition-all cursor-pointer px-3.5 py-1.5 rounded-full text-[11.5px] font-sans font-semibold tracking-wide shrink-0 whitespace-nowrap " + (
                  activeSection === sec.id
                    ? 'text-white bg-indigo-600 dark:bg-indigo-500 shadow-sm font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-955 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                )}
              >
                {sec.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Publication Sheet Canvas */}
      <div className="mx-auto w-[98%] max-w-[1720px] bg-white dark:bg-[#111726] shadow-sm border border-slate-200/70 dark:border-slate-850 rounded-xl px-4 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-8 relative my-4">
        
        {/* Chapter 1: Introduction & Objective */}
        <section id="as3-overview" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="I" 
            title="Introduction &amp; Objective" 
            description="Historical analysis of cash flows and assessing the enterprise's ability to generate cash and cash equivalents."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              A <strong>Cash Flow Statement (CFS)</strong> provides additional information to the users of accounts by reflecting the various sources from where cash was generated (inflow of cash) and how these inflows were utilised (outflow of cash) by the enterprise during the year. <PdfRef page={2} />
            </p>
            <p>
              This statement serves as an indicator of the amount, timing, and certainty of future cash flows. It enables users to study the liquidity and solvency position of the enterprise, compare operational efficiency across entities, examine the relationship between profitability and cash flow, and analyze the impact of changing price levels. <PdfRef page={2} />
            </p>
          </div>
        </section>

        {/* Chapter 2: Scope & Applicability */}
        <section id="as3-applicability" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="II" 
            title="Scope &amp; Exemptions" 
            description="Detailing which corporate entities are legally required to present cash flow statements under Section 2(40) of the Companies Act."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              This standard is mandatory for Non-SMCs (Non Small &amp; Medium Companies) and Level I non-corporate entities. For other enterprises, preparation is not compulsory but encouraged. <PdfRef page={1} />
            </p>
            <p>
              Under Section 2(40) of the Companies Act, 2013, an exemption has been provided to <strong>One Person Companies (OPC)</strong>, <strong>small companies</strong>, <strong>dormant companies</strong>, and <strong>private startup companies</strong> (notified via Section 462 in June 2017). These entities are not required to include a Cash Flow Statement in their financial reports. <PdfRef page={1} />
            </p>
          </div>

          {/* Premium Blue Information Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-blue-150 dark:border-blue-900/40 bg-blue-50/20 dark:bg-blue-955/5 rounded-xl space-y-2.5">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-blue-800 dark:text-blue-400 flex items-center gap-2">
                <Info size={14} />
                <span>1. Transition Rule: Newly Qualified</span>
              </h4>
              <p className="text-[14.5px] leading-relaxed text-slate-950 dark:text-slate-50 font-medium">
                Where an enterprise was not covered by the statement in the previous year but qualifies in the current year, it is not required to disclose comparative figures for the preceding period. <PdfRef page={1} />
              </p>
            </div>
            <div className="p-5 border border-blue-150 dark:border-blue-900/40 bg-blue-50/20 dark:bg-blue-955/5 rounded-xl space-y-2.5">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-blue-800 dark:text-blue-400 flex items-center gap-2">
                <Info size={14} />
                <span>2. Transition Rule: Newly Disqualified</span>
              </h4>
              <p className="text-[14.5px] leading-relaxed text-slate-950 dark:text-slate-50 font-medium">
                An enterprise that qualified under the statement in the previous year but subsequently becomes disqualified must continue to prepare a Cash Flow Statement for another two consecutive years. <PdfRef page={2} />
              </p>
            </div>
          </div>
        </section>

        {/* Chapter 3: Cash & Cash Equivalents */}
        <section id="as3-definitions" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="III" 
            title="Definition of Cash &amp; Cash Equivalents" 
            description="Detailing cash on hand, demand deposits, short-term investments, and maturity definitions."
          />

          <div className="p-6 border-l-4 border-blue-600 dark:border-blue-500 border border-blue-200 dark:border-blue-900/40 bg-blue-50/30 dark:bg-blue-955/10 rounded-xl my-6">
            <div className="text-[10.5px] font-sans font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-3 flex items-center gap-2">
              <BookOpen size={13} className="text-blue-600 dark:text-blue-450" />
              <span>Core Definitions — AS 3, Para 5</span>
            </div>
            <p className="text-[15.5px] font-serif font-semibold text-slate-950 dark:text-slate-100 leading-[1.8] italic mb-3">
              "Cash comprises cash on hand and demand deposits with banks."
            </p>
            <p className="text-[15.5px] font-serif font-semibold text-slate-950 dark:text-slate-100 leading-[1.8] italic">
              "Cash equivalents are short-term, highly liquid investments that are readily convertible into known amounts of cash and which are subject to an insignificant risk of changes in value." <PdfRef page={3} />
            </p>
          </div>

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              To qualify as a cash equivalent, an investment must have a short maturity of **three months or less** from the date of acquisition. Share investments are excluded because they carry significant risks regarding realisable value. <PdfRef page={3} />
            </p>
            <p>
              Movement between items of cash and cash equivalents (e.g. depositing cash in a bank) is not a cash flow because it is part of cash management. Any transaction that does not result in an actual cash flow (e.g. issue of bonus shares or conversion of debt to equity) is excluded. <PdfRef page={3} />
            </p>
          </div>
        </section>

        {/* Chapter 4: Classification of Cash Flows */}
        <section id="as3-classification" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="IV" 
            title="Classification of Cash Flows" 
            description="Analyzing the three distinct components: Operating, Investing, and Financing activities."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              Separate presentation of operating, investing, and financing cash flows provides users with clear information about the source of cash and how it is used. For example, borrowing cash to pay operating expenses is treated differently than borrowing cash to buy productive fixed assets. <PdfRef page={4} />
            </p>
          </div>

          {/* 3-Column Classification Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 my-6 font-serif w-full">
            <div className="p-5 border-t-2 border-indigo-500 border border-indigo-250 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-950/10 rounded-xl space-y-2.5">
              <h4 className="font-sans font-bold text-[12px] uppercase tracking-wider text-indigo-805 dark:text-indigo-400">1. Operating Activities</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">
                Principal revenue-producing activities of the enterprise and other activities that are not investing or financing activities. <PdfRef page={4} />
              </p>
            </div>
            <div className="p-5 border-t-2 border-emerald-500 border border-emerald-250 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/10 rounded-xl space-y-2.5">
              <h4 className="font-sans font-bold text-[12px] uppercase tracking-wider text-emerald-800 dark:text-emerald-400">2. Investing Activities</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">
                Acquisition and disposal of long-term assets and other investments not included in cash equivalents. <PdfRef page={4} />
              </p>
            </div>
            <div className="p-5 border-t-2 border-violet-500 border border-violet-250 dark:border-violet-900/40 bg-violet-50/20 dark:bg-violet-950/10 rounded-xl space-y-2.5">
              <h4 className="font-sans font-bold text-[12px] uppercase tracking-wider text-violet-800 dark:text-violet-400">3. Financing Activities</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">
                Activities that result in changes in the size and composition of the owners' capital and borrowings of the enterprise. <PdfRef page={4} />
              </p>
            </div>
          </div>
        </section>

        {/* Chapter 5: Operating Activities */}
        <section id="as3-operating" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="V" 
            title="Operating Activities" 
            description="Analyzing direct and indirect methods for presenting gross operating inflows and outflows."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              Operating cash flow shows the extent to which the operations of the enterprise have generated sufficient cash to maintain operating capacity, pay dividends, repay loans, and make new investments without relying on external financing. <PdfRef page={4} />
            </p>
            <p>
              AS 3 allows the use of two methods to present this section: the **Direct Method** and the **Indirect Method**. The Direct method is preferred because it lists the major classes of gross receipts and payments, providing a clearer picture of historical cash receipts and payments. <PdfRef page={7} />
            </p>
          </div>

          {/* Accordion: Operating Presentation Formats */}
          <div className="space-y-4 font-sans">
            <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-[#111726]">
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer select-none" onClick={() => toggleAccordion('direct')}>
                <span className="font-bold text-slate-900 dark:text-white text-sm">Direct Method Format</span>
                <ChevronDown size={16} className={"transform transition-transform duration-200 " + (openAccordions.direct ? "rotate-180" : "")} />
              </div>
              {openAccordions.direct && (
                <div className="p-5 bg-slate-50/10 dark:bg-slate-900/10 text-[14px] leading-relaxed font-sans text-slate-800 dark:text-slate-200">
                  <p className="mb-2"><strong>Gross Receipts (Cash Inflows):</strong> Cash sales, trade receivables collections, royalty/commission income. <PdfRef page={8} /></p>
                  <p className="mb-2"><strong>Gross Payments (Cash Outflows):</strong> Cash purchases, payments to trade payables, salaries/wages, rent/electricity. <PdfRef page={8} /></p>
                  <pre className="p-3 bg-white dark:bg-slate-950 border rounded text-xs font-mono leading-relaxed mt-2 text-slate-800 dark:text-slate-300">
                    {"Cash Received from Customers\nLess: Cash Paid to Suppliers & Employees\n= Cash Generated from Operations\nLess: Income Tax Paid\n+/- Extraordinary Items\n= Net Cash Flow from Operating Activities"}
                  </pre>
                </div>
              )}
            </div>

            <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-[#111726]">
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer select-none" onClick={() => toggleAccordion('indirect')}>
                <span className="font-bold text-slate-900 dark:text-white text-sm">Indirect Method Format</span>
                <ChevronDown size={16} className={"transform transition-transform duration-200 " + (openAccordions.indirect ? "rotate-180" : "")} />
              </div>
              {openAccordions.indirect && (
                <div className="p-5 bg-slate-50/10 dark:bg-slate-900/10 text-[14px] leading-relaxed font-sans text-slate-800 dark:text-slate-200">
                  <p className="mb-2">Starts from the net profit/loss figure and adjusts it for non-cash and non-operating items. <PdfRef page={8} /></p>
                  <pre className="p-3 bg-white dark:bg-slate-955 border rounded text-xs font-mono leading-relaxed mt-2 text-slate-800 dark:text-slate-300">
                    {"Net Profit Before Tax & Extraordinary Items\n+ Depreciation & Non-cash expenses\n+ Interest & Finance Expenses\n- Interest & Dividend Income\n+ Loss (or - Gain) on Sale of Assets\n= Operating Profit Before Working Capital Changes\n+/- Adjustments for Trade Receivables, Inventories, Trade Payables\n- Income Tax Paid\n+/- Extraordinary Items\n= Net Cash Flow from Operating Activities"}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Chapter 6: Investing Activities */}
        <section id="as3-investing" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="VI" 
            title="Investing Activities" 
            description="Disclosing transactions relating to acquisition and disposal of long-term assets and investments."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              Investing activities reflect expenditures made for resources intended to generate future income and cash flows. Examples of investing cash flows include: <PdfRef page={4} />
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[15.5px]">
              <li>Payments to acquire fixed assets, including property, plant, and equipment, and intangibles. <PdfRef page={4} /></li>
              <li>Receipts from disposal of fixed assets (e.g. sale of old machinery/furniture). <PdfRef page={4} /></li>
              <li>Loans and advances given to other entities (excluding finance companies) and their repayments. <PdfRef page={4} /></li>
              <li>Interest and dividends received (other than by financial enterprises). <PdfRef page={4} /></li>
              <li>Purchase and sale of investments in shares, debentures, or bonds of other companies. <PdfRef page={4} /></li>
            </ul>
          </div>
        </section>

        {/* Chapter 7: Financing Activities */}
        <section id="as3-financing" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="VII" 
            title="Financing Activities" 
            description="Detailing changes in owners' equity, preference capital, borrowings, and debentures."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              Financing activities show the cash flows required to satisfy the capital requirements of the enterprise from lenders and shareholders. Examples include: <PdfRef page={4} />
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[15.5px]">
              <li>Proceeds from issuing shares or other equity instruments. <PdfRef page={4} /></li>
              <li>Proceeds from issuing debentures, loans, notes, bonds, and other short-term or long-term borrowings. <PdfRef page={4} /></li>
              <li>Repayments of bank loans, term loans, and redemption of debentures or preference shares. <PdfRef page={4} /></li>
              <li>Dividends paid to preference and equity shareholders. <PdfRef page={4} /></li>
              <li>Interest paid on long-term or short-term borrowings (except by financial enterprises). <PdfRef page={4} /></li>
            </ul>
          </div>
        </section>

        {/* Chapter 8: Interest & Dividends */}
        <section id="as3-special" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="VIII" 
            title="Special Classification Rules (Financial vs. Non-Financial)" 
            description="Reconciling interest and dividend flows based on the primary operating nature of the enterprise."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              The classification of interest and dividend cash flows depends on the nature of the business operations of the enterprise: <PdfRef page={5} />
            </p>
          </div>

          {/* Table: Special Classifications */}
          <div className="my-8 space-y-2 w-full">
            <div className="text-[13px] font-bold text-indigo-805 dark:text-indigo-400 font-sans uppercase tracking-wider flex items-center gap-2">
              <span className="inline-block w-1 h-4 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>
              Table 1 — Classification of Interest, Dividends and Loans <PdfRef page={5} />
            </div>
            <div className="overflow-x-auto w-full rounded-xl border border-indigo-200 dark:border-indigo-900/40">
              <table className="w-full text-left border-collapse text-[13.5px]">
                <thead>
                  <tr className="font-sans text-[11.5px] font-bold uppercase tracking-wider text-white bg-indigo-750 dark:bg-indigo-850">
                    <th className="py-3 px-5 w-1/3">Transaction Category</th>
                    <th className="py-3 px-5 w-1/3">Financial Enterprise</th>
                    <th className="py-3 px-5 w-1/3">Non-Financial Enterprise</th>
                  </tr>
                </thead>
                <tbody className="text-slate-900 dark:text-slate-100 font-serif divide-y divide-indigo-100 dark:divide-indigo-900/30">
                  <tr className="bg-white dark:bg-[#111726]">
                    <td className="py-3.5 px-5 font-semibold leading-relaxed align-top">Interest Paid</td>
                    <td className="py-3.5 px-5 text-emerald-650 dark:text-emerald-400 font-semibold leading-relaxed align-top">Operating Cash Outflow</td>
                    <td className="py-3.5 px-5 text-indigo-650 dark:text-indigo-400 font-semibold leading-relaxed align-top">Financing Cash Outflow <PdfRef page={10} /></td>
                  </tr>
                  <tr className="bg-indigo-50/10 dark:bg-[#0f1c22]/10">
                    <td className="py-3.5 px-5 font-semibold leading-relaxed align-top">Interest &amp; Dividends Received</td>
                    <td className="py-3.5 px-5 text-emerald-650 dark:text-emerald-400 font-semibold leading-relaxed align-top">Operating Cash Inflow</td>
                    <td className="py-3.5 px-5 text-blue-650 dark:text-blue-400 font-semibold leading-relaxed align-top">Investing Cash Inflow <PdfRef page={10} /></td>
                  </tr>
                  <tr className="bg-white dark:bg-[#111726]">
                    <td className="py-3.5 px-5 font-semibold leading-relaxed align-top">Loans &amp; Advances Given</td>
                    <td className="py-3.5 px-5 text-emerald-650 dark:text-emerald-400 font-semibold leading-relaxed align-top">Operating Cash Outflow</td>
                    <td className="py-3.5 px-5 text-blue-650 dark:text-blue-400 font-semibold leading-relaxed align-top">Investing Cash Outflow <PdfRef page={5} /></td>
                  </tr>
                  <tr className="bg-indigo-50/10 dark:bg-[#0f1c22]/10">
                    <td className="py-3.5 px-5 font-semibold leading-relaxed align-top">Loans/Advances to Employees / Suppliers</td>
                    <td className="py-3.5 px-5 text-emerald-650 dark:text-emerald-400 font-semibold leading-relaxed align-top">Operating Cash Flow</td>
                    <td className="py-3.5 px-5 text-emerald-650 dark:text-emerald-400 font-semibold leading-relaxed align-top">Operating Cash Flow <PdfRef page={5} /></td>
                  </tr>
                  <tr className="bg-white dark:bg-[#111726]">
                    <td className="py-3.5 px-5 font-semibold leading-relaxed align-top">Dividends Paid</td>
                    <td className="py-3.5 px-5 text-indigo-650 dark:text-indigo-400 font-semibold leading-relaxed align-top">Financing Cash Outflow</td>
                    <td className="py-3.5 px-5 text-indigo-650 dark:text-indigo-400 font-semibold leading-relaxed align-top">Financing Cash Outflow <PdfRef page={6} /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Chapter 9: Tax & Extraordinary */}
        <section id="as3-extraordinary" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="IX" 
            title="Taxes on Income &amp; Extraordinary Items" 
            description="Detailing reporting requirements for tax payments, TDS, and insurance recoveries."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              <strong>Taxes on Income:</strong> Income tax cash flows must be classified as cash flows from operating activities unless they can be specifically identified with investing or financing activities. For example, tax paid on capital gains on the sale of property is classified under investing activities. <PdfRef page={6} />
            </p>
            <p>
              TDS (Tax Deducted at Source) deducted from receipts is an operating outflow if the related income is operating, and an investing outflow if the related income is investment-related (e.g. interest). TDS deducted on expense payments follows a similar rule. <PdfRef page={6} />
            </p>
            <p>
              <strong>Extraordinary Items:</strong> Cash flows associated with extraordinary items (e.g. insurance claim received or refund of tax) must be disclosed separately as arising from operating, investing, or financing activities to allow users to understand their impact. <PdfRef page={7} />
            </p>
          </div>

          {/* Warning Box: Insurance Claim Inclusions */}
          <div className="p-5 border border-amber-250 dark:border-amber-900/40 bg-amber-50/20 dark:bg-amber-955/5 rounded-xl space-y-2.5">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-2">
              <AlertTriangle size={14} />
              <span>Insurance Claim Classification Warning</span>
            </h4>
            <p className="text-[14.5px] leading-relaxed text-slate-955 dark:text-slate-300 font-medium font-serif">
              An insurance claim received against loss of inventories or loss of profits is classified as an **extraordinary operating cash inflow**. An insurance claim received against loss of property, plant, and equipment is classified as an **extraordinary investing cash inflow**. <PdfRef page={7} />
            </p>
          </div>
        </section>

        {/* Chapter 10: Non-Cash Rules */}
        <section id="as3-non-cash" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="X" 
            title="Non-Cash Transactions Exclusion" 
            description="Excluding non-cash transactions from the cash flow statement, such as asset acquisition via debentures."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              Investing and financing transactions that do not require the use of cash or cash equivalents must be excluded from the Cash Flow Statement. Examples include: <PdfRef page={10} />
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-[15.5px]">
              <li>Acquisition of assets by assuming directly related liabilities or by issuing shares or debentures. <PdfRef page={10} /></li>
              <li>The conversion of debt or debentures into equity shares. <PdfRef page={10} /></li>
              <li>The capitalization of reserves via the issue of bonus shares. <PdfRef page={10} /></li>
            </ul>
            <p>
              Such transactions must be disclosed elsewhere in the financial statements to provide all relevant information about these activities. <PdfRef page={10} />
            </p>
          </div>
        </section>

        {/* Chapter 11: Netting Rules */}
        <section id="as3-netting" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="XI" 
            title="Reporting Cash Flows on a Net Basis" 
            description="Prohibition of netting receipts and payments from investing and financing activities, with statutory exceptions."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              AS 3 forbids netting receipts and payments from investing and financing activities. Cash paid to acquire fixed assets cannot be shown net of cash realised from the sale of fixed assets. For example, if an enterprise pays ₹25 lakhs to purchase a plant and receives ₹4 lakhs on the disposal of old furniture, it must report ₹25 lakhs as an outflow and ₹4 lakhs as an inflow. It is not permitted to show a net outflow of ₹21 lakhs. <PdfRef page={9} />
            </p>
          </div>

          {/* Accordion: Netting Exceptions */}
          <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-[#111726]">
            <div className="bg-slate-50 dark:bg-slate-800/40 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer select-none font-sans" onClick={() => toggleAccordion('netting-exceptions')}>
              <span className="font-bold text-slate-900 dark:text-white text-sm">Permitted Exceptions to Netting Rule</span>
              <ChevronDown size={16} className={"transform transition-transform duration-200 " + (openAccordions['netting-exceptions'] ? "rotate-180" : "")} />
            </div>
            {openAccordions['netting-exceptions'] && (
              <div className="p-5 bg-slate-50/10 dark:bg-slate-900/10 text-[14.5px] space-y-3 font-sans leading-relaxed text-slate-700 dark:text-slate-300">
                <p><strong>1. On behalf of customers:</strong> Cash receipts and payments on behalf of customers when the cash flows reflect the activities of the customer rather than those of the enterprise (e.g. cash received/paid by banks against acceptances and demand deposits). <PdfRef page={9} /></p>
                <p><strong>2. High turnover items:</strong> Cash receipts and payments for items in which the turnover is quick, the amounts are large, and the maturities are short (e.g. purchase/sale of investments by an investment company). <PdfRef page={10} /></p>
                <p><strong>3. Financial Enterprises:</strong> Financial enterprises are permitted to report on a net basis for: (a) acceptance and repayment of fixed deposits, (b) placement and withdrawal of deposits with other financial entities, and (c) advances/loans given to customers and repayments received. <PdfRef page={10} /></p>
              </div>
            )}
          </div>
        </section>

        {/* Chapter 12: Business Purchase */}
        <section id="as3-acquisitions" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="XII" 
            title="Acquisitions &amp; Disposals of Subsidiaries" 
            description="Aggregating considerations, cash component disclosure, and working capital adjustments."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              The aggregate cash flows arising from acquisitions and disposals of subsidiaries or other business units should be presented separately and classified as cash flows from investing activities. These transactions cannot be netted off. <PdfRef page={11} />
            </p>
            <p>
              An enterprise must disclose: (i) the total purchase or disposal consideration, and (ii) the portion of the consideration discharged by means of cash and cash equivalents. <PdfRef page={11} />
            </p>
          </div>

          {/* Indigo Box: Working Capital Taken Over Rule */}
          <div className="p-6 my-6 border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/25 dark:bg-indigo-955/5 rounded-xl font-serif shadow-3xs">
            <span className="text-[11.5px] font-bold text-indigo-850 dark:text-indigo-400 uppercase tracking-wider block mb-2 font-sans">
              Adjustment Rule — Current Assets &amp; Liabilities Taken Over
            </span>
            <p className="text-[14.5px] text-slate-900 dark:text-slate-50 leading-relaxed font-semibold">
              Business purchase is not an operating activity. When calculating operating cash flows under the indirect method, closing current assets and liabilities balances must be **reduced** by the values taken over during the business purchase. This ensures that the change in working capital represents operating activities only. <PdfRef page={11} />
            </p>
          </div>
        </section>

        {/* Chapter 13: Disclosures & Foreign Currency Reconciliations */}
        <section id="as3-disclosure" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="XIII" 
            title="Disclosure &amp; Foreign Currency Reconciliations" 
            description="Accounting for foreign currency balances, exchange differences, and undrawn credit disclosures."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              <strong>Foreign Currency Balances:</strong> Foreign currency transactions are translated into the reporting currency at the exchange rate on the transaction date. Bank balances held in foreign currencies are restated at the closing rate on the balance sheet date. <PdfRef page={11} />
            </p>
            <p>
              The resulting exchange difference is recognized in the P&amp;L statement but is a non-cash item. Therefore, it is excluded from the cash flow statement. The difference between the cash flow statement balance and the balance sheet carrying amount is reconciled in the notes. <PdfRef page={12} />
            </p>
            <p>
              <strong>Mandatory Disclosures:</strong> The financial statements must disclose the amount of significant cash and cash equivalents held by the enterprise that is **not available for its use**, along with a management commentary (e.g. bank balances held in countries with foreign exchange controls). <PdfRef page={12} />
            </p>
          </div>

          {/* Checklist Boxes */}
          <div className="space-y-3 font-sans">
            <div className="flex items-start gap-3 p-4 rounded-xl border border-blue-200 dark:border-blue-900/30 bg-blue-50/20 dark:bg-blue-955/5">
              <span className="text-blue-500 font-bold">☑</span>
              <div>
                <p className="text-[14.5px] text-slate-800 dark:text-slate-200 font-semibold font-sans">Opening &amp; Closing Cash Reconciliation Note</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-sans">Disclose a reconciliation of the opening and closing cash balances in the Cash Flow Statement with the corresponding balance sheet items. <PdfRef page={3} /></p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl border border-blue-200 dark:border-blue-900/30 bg-blue-50/20 dark:bg-blue-955/5">
              <span className="text-blue-500 font-bold">☑</span>
              <div>
                <p className="text-[14.5px] text-slate-800 dark:text-slate-200 font-semibold font-sans">Restricted Funds Disclosure</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-sans">Disclose cash and cash equivalent balances held by the enterprise but not available for its use. <PdfRef page={12} /></p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-200 dark:border-amber-900/30 bg-amber-50/20 dark:bg-amber-955/5">
              <span className="text-amber-600 dark:text-amber-400 font-bold">☐</span>
              <div>
                <p className="text-[14.5px] text-slate-800 dark:text-slate-200 font-semibold font-sans">Undrawn Borrowing Facilities Note (Encouraged)</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-sans">Disclose the amount of undrawn borrowing facilities that may be available for future operating activities and to settle capital commitments, indicating any restrictions on the use of these facilities. <PdfRef page={12} /></p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-200 dark:border-amber-900/30 bg-amber-50/20 dark:bg-amber-955/5">
              <span className="text-amber-600 dark:text-amber-400 font-bold">☐</span>
              <div>
                <p className="text-[14.5px] text-slate-805 dark:text-slate-200 font-semibold font-sans">Operating Capacity Maintenance Disclosure (Encouraged)</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-sans">Disclose cash flows required for maintaining operating capacity separately from cash flows that represent an increase in operating capacity. <PdfRef page={12} /></p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}


const as4Chapters = [
  { id: 'overview',        title: 'Introduction' },
  { id: 'scope',           title: 'Scope' },
  { id: 'definitions',     title: 'Definitions' },
  { id: 'contingencies',   title: 'Contingencies' },
  { id: 'adjusting',       title: 'Adjusting Events' },
  { id: 'non-adjusting',   title: 'Non-Adjusting Events' },
  { id: 'dividends',       title: 'Proposed Dividends' },
  { id: 'going-concern',   title: 'Going Concern' },
  { id: 'disclosure',      title: 'Disclosures' }
]

const as4Sections = [
  { id: 'as4-overview',        title: '1. Introduction & Objective' },
  { id: 'as4-scope',           title: '2. Scope & Applicability' },
  { id: 'as4-definitions',     title: '3. Key Definitions' },
  { id: 'as4-contingencies',   title: '4. Accounting for Contingencies' },
  { id: 'as4-adjusting',       title: '5. Adjusting Events' },
  { id: 'as4-non-adjusting',   title: '6. Non-Adjusting Events' },
  { id: 'as4-proposed-div',    title: '7. Proposed Dividend' },
  { id: 'as4-going-concern',   title: '8. Going Concern' },
  { id: 'as4-disclosures',     title: '9. Disclosure Requirements' },
]

interface AS4StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
}

function AS4StandardTabContent({ navigateToPdfPage }: AS4StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    'loss': true,
    'gain': false,
    'matrix': false
  })

  const toggleAccordion = (id: string) => {
    setOpenAccordions(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const tocScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const initObserver = () => {
      const scrollContainer = document.getElementById('as1-scroll-container');
      if (!scrollContainer) {
        setTimeout(initObserver, 50);
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const secId = entry.target.id.replace('as4-', '');
              setActiveSection(secId);
            }
          });
        },
        {
          root: scrollContainer,
          rootMargin: '-90px 0px -60% 0px',
          threshold: 0
        }
      );

      as4Chapters.forEach((sec) => {
        const el = document.getElementById("as4-" + sec.id);
        if (el) {
          observer?.observe(el);
        }
      });
    };

    initObserver();

    return () => {
      if (observer) {
        observer.disconnect();
      }
    }
  }, [])

  useEffect(() => {
    const el = tocScrollRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    if (!activeSection || !tocScrollRef.current) return;
    const activeBtn = tocScrollRef.current.querySelector('[data-toc-id="' + activeSection + '"]');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeSection]);

  const PdfRef = ({ page }: { page: number }) => (
    <button
      onClick={() => navigateToPdfPage(page)}
      className="inline-flex items-center justify-center w-4 h-4 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-955/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded transition-all cursor-pointer select-none align-middle"
      title={"Open ICAI AS 4 PDF — Page " + page}
    >
      <FileText size={10} className="shrink-0" />
    </button>
  )

  const ChapterHeader = ({ num, title, description }: { num: string; title: string; description: string }) => {
    const numMap: Record<string, string> = {
      'I': '1', 'II': '2', 'III': '3', 'IV': '4', 'V': '5', 'VI': '6', 'VII': '7', 'VIII': '8', 'IX': '9',
      'X': '10', 'XI': '11', 'XII': '12', 'XIII': '13', 'XIV': '14', 'XV': '15'
    };
    const arabicNum = numMap[num] || num;
    return (
      <div className="w-full mb-6 mt-12 first:mt-2">
        <div className="flex items-baseline gap-2 mb-2">
          <h2 className="text-[20px] sm:text-[22px] font-sans font-bold text-slate-900 dark:text-white tracking-tight leading-tight flex items-baseline gap-2">
            <span className="text-indigo-650 dark:text-indigo-400 font-mono font-bold mr-1 select-none">{arabicNum}.</span>
            <span>{title}</span>
          </h2>
        </div>
        <div className="h-[1.5px] w-full bg-slate-200/80 dark:bg-slate-800/80 mb-3" />
        {description && (
          <p className="text-[13.5px] font-sans font-medium text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full animate-fade-in font-sans bg-[#F5F5F3] dark:bg-[#0B0F19] pb-8">
      {/* Sticky Contents Bar */}
      <div id="as4-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div
            ref={tocScrollRef}
            style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }}
            className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5"
          >
            {as4Chapters.map((sec) => (
              <button
                key={sec.id}
                data-toc-id={sec.id}
                onClick={() => {
                  const container = document.getElementById('as1-scroll-container');
                  const target = document.getElementById("as4-" + sec.id);
                  const stickyToc = document.getElementById('as4-sticky-toc');
                  setActiveSection(sec.id);
                  if (container && target) {
                    const containerRect = container.getBoundingClientRect();
                    const targetRect = target.getBoundingClientRect();
                    let stickyOffset = 98;
                    if (stickyToc) {
                      const tocRect = stickyToc.getBoundingClientRect();
                      stickyOffset = tocRect.bottom - containerRect.top;
                    }
                    const targetScrollTop = targetRect.top - containerRect.top + container.scrollTop - stickyOffset + 2;
                    container.scrollTo({ top: targetScrollTop, behavior: 'auto' });
                  }
                }}
                className={"transition-all cursor-pointer px-3.5 py-1.5 rounded-full text-[11.5px] font-sans font-semibold tracking-wide shrink-0 whitespace-nowrap " + (
                  activeSection === sec.id
                    ? 'text-white bg-indigo-600 dark:bg-indigo-500 shadow-sm font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-955 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                )}
              >
                {sec.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Publication Sheet Canvas */}
      <div className="mx-auto w-[98%] max-w-[1720px] bg-white dark:bg-[#111726] shadow-sm border border-slate-200/70 dark:border-slate-850 rounded-xl px-4 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-8 relative my-4">
        
        {/* Chapter 1: Introduction & Objective */}
        <section id="as4-overview" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="I" 
            title="Introduction &amp; Objective" 
            description="Detailing guidelines for contingencies and post-balance sheet events, outlining Board approval timelines."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              <strong>Accounting Standard 4</strong> deals with two distinct matters: <strong>Contingencies</strong> (Part A) and <strong>Events Occurring After the Balance Sheet Date</strong> (Part B). Both require management to exercise judgement about whether to adjust the financial statements or disclose the details. <PdfRef page={1} />
            </p>
            <p>
              Following the revision of the standard by the ICAI, the contingency guidelines under AS 4 apply only to the extent they are not covered by other Accounting Standards (for example, the impairment of financial assets like receivables/provision for bad and doubtful debts is governed by this standard, while other provisions are governed by <strong>AS 29</strong>). The guidelines for events occurring after the balance sheet date remain fully operative under AS 4. <PdfRef page={1} />
            </p>
          </div>
        </section>

        {/* Chapter 2: Scope & Exclusions */}
        <section id="as4-scope" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="II" 
            title="Scope &amp; Exclusions" 
            description="Detailing the scope of AS 4 and listing areas governed by other standards."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              This standard applies in preparing and presenting financial statements of all enterprises, except in the following cases which are covered by other specific standards: <PdfRef page={1} />
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[15.5px]">
              <li>Liabilities of life insurance and general insurance enterprises arising from policies issued. <PdfRef page={12} /></li>
              <li>Obligations under retirement benefit plans. <PdfRef page={12} /></li>
              <li>Commitments arising from long-term lease contracts. <PdfRef page={12} /></li>
            </ul>
          </div>
        </section>

        {/* Chapter 3: Key Definitions */}
        <section id="as4-definitions" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="III" 
            title="Key Definitions" 
            description="Defining Contingency, Post-Balance Sheet Events, and the Balance Sheet Date."
          />

          {/* Official Definition Card */}
          <div className="p-6 border-l-4 border-blue-600 dark:border-blue-500 border border-blue-200 dark:border-blue-900/40 bg-blue-50/30 dark:bg-blue-955/10 rounded-xl my-6">
            <div className="text-[10.5px] font-sans font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-3 flex items-center gap-2">
              <BookOpen size={13} className="text-blue-600 dark:text-blue-450" />
              <span>Official Definitions — AS 4, Para 3</span>
            </div>
            <p className="text-[15.5px] font-serif font-semibold text-slate-950 dark:text-slate-100 leading-[1.8] italic mb-3">
              "A contingency is a condition or situation, the ultimate outcome of which, gain or loss, will be confirmed only on the occurrence, or non-occurrence, of one or more uncertain future events." <PdfRef page={2} />
            </p>
            <p className="text-[15.5px] font-serif font-semibold text-slate-950 dark:text-slate-100 leading-[1.8] italic">
              "Events occurring after the balance sheet date are those significant events, both favourable and unfavourable, that occur between the balance sheet date and the date on which the financial statements are approved by the Board of Directors in the case of a company, and, by the corresponding approving authority in the case of any other entity." <PdfRef page={3} />
            </p>
          </div>

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              The **Balance Sheet Date** is the date on which the accounting period ends (typically 31st March). The **date of approval** is the date when the Board of Directors signs off on the financial statements. Any significant event occurring between these two dates falls under the scope of this standard. <PdfRef page={3} />
            </p>
          </div>
        </section>

        {/* Chapter 4: Accounting for Contingencies */}
        <section id="as4-contingencies" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="IV" 
            title="Accounting for Contingencies" 
            description="Detailing contingent losses, contingent gains, estimation methods, and accounting treatments."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              The treatment of contingencies is governed by the prudence concept: <PdfRef page={2} />
            </p>
          </div>

          {/* Accordion: Contingent Losses & Gains */}
          <div className="space-y-4 font-sans">
            <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-[#111726]">
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer select-none font-sans" onClick={() => toggleAccordion('loss')}>
                <span className="font-bold text-slate-900 dark:text-white text-sm">Contingent Losses (Para 4)</span>
                <ChevronDown size={16} className={"transform transition-transform duration-200 " + (openAccordions.loss ? "rotate-180" : "")} />
              </div>
              {openAccordions.loss && (
                <div className="p-5 bg-slate-50/10 dark:bg-slate-900/10 text-[14px] leading-relaxed font-sans text-slate-700 dark:text-slate-300">
                  <p className="mb-2">A contingent loss is provided for in the books by debiting the Profit &amp; Loss account if: <PdfRef page={2} /></p>
                  <ul className="list-disc pl-5 mb-2 space-y-1">
                    <li>It is **probable** that future events will confirm a loss (i.e. an asset is impaired or a liability is incurred at the balance sheet date), AND</li>
                    <li>A **reasonable estimate** of the amount of the loss can be made.</li>
                  </ul>
                  <p>If there is insufficient evidence to make an estimate, or if a loss is not probable but only possible, it is **disclosed in the notes** to the accounts. Remote contingencies (e.g. standard bank guarantees) do not require provision but are disclosed in notes. <PdfRef page={2} /></p>
                </div>
              )}
            </div>

            <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-[#111726]">
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer select-none font-sans" onClick={() => toggleAccordion('gain')}>
                <span className="font-bold text-slate-900 dark:text-white text-sm">Contingent Gains (Para 10)</span>
                <ChevronDown size={16} className={"transform transition-transform duration-200 " + (openAccordions.gain ? "rotate-180" : "")} />
              </div>
              {openAccordions.gain && (
                <div className="p-5 bg-slate-50/10 dark:bg-slate-900/10 text-[14px] leading-relaxed font-sans text-slate-700 dark:text-slate-300">
                  <p className="mb-2">Contingent gains are **never recognized** in the financial statements to avoid recognizing revenue that may never be realised. <PdfRef page={3} /></p>
                  <p>However, when the realisation of a gain is **virtually certain**, the gain is no longer considered a contingency and is recognized in the financial statements. <PdfRef page={3} /></p>
                </div>
              )}
            </div>

            <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-[#111726]">
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer select-none font-sans" onClick={() => toggleAccordion('matrix')}>
                <span className="font-bold text-slate-900 dark:text-white text-sm">Contingency Treatment Decision Matrix</span>
                <ChevronDown size={16} className={"transform transition-transform duration-200 " + (openAccordions.matrix ? "rotate-180" : "")} />
              </div>
              {openAccordions.matrix && (
                <div className="p-5 bg-slate-50/10 dark:bg-slate-900/10 text-[14px] leading-relaxed font-sans text-slate-700 dark:text-slate-300">
                  <table className="w-full text-left border-collapse text-[13.5px] border border-slate-200 dark:border-slate-800 rounded-lg">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-805 text-slate-800 dark:text-white font-sans text-[11px] font-bold uppercase tracking-wider">
                        <th className="py-2.5 px-4">Probability of Loss</th>
                        <th className="py-2.5 px-4">Reliable Estimate Possible?</th>
                        <th className="py-2.5 px-4">Accounting Treatment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                      <tr>
                        <td className="py-2.5 px-4">Probable (High chance)</td>
                        <td className="py-2.5 px-4">Yes</td>
                        <td className="py-2.5 px-4 font-semibold text-rose-650 dark:text-rose-400">Make a Provision (debit P&amp;L) <PdfRef page={2} /></td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4">Probable (High chance)</td>
                        <td className="py-2.5 px-4">No</td>
                        <td className="py-2.5 px-4">Disclose in Notes to accounts <PdfRef page={2} /></td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4">Possible (Reasonable chance)</td>
                        <td className="py-2.5 px-4">Yes / No</td>
                        <td className="py-2.5 px-4">Disclose in Notes to accounts <PdfRef page={2} /></td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4">Remote (Very low chance)</td>
                        <td className="py-2.5 px-4">Yes / No</td>
                        <td className="py-2.5 px-4">No Provision, No Disclosure <PdfRef page={2} /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Chapter 5: Adjusting Events */}
        <section id="as4-adjusting" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="V" 
            title="Adjusting Events After the Balance Sheet Date" 
            description="Detailing adjusting events, criteria for adjustment, and practical cases like debtor bankruptcy."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              <strong>Adjusting events</strong> are events that occur after the balance sheet date but provide additional information materially affecting the determination of amounts relating to **conditions existing at the balance sheet date**. <PdfRef page={3} />
            </p>
            <p>
              For these events, the assets and liabilities in the financial statements must be **adjusted** to reflect the new evidence. <PdfRef page={4} />
            </p>
          </div>

          {/* Premium Blue Information Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-150 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-955/5 rounded-xl space-y-2.5">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400 flex items-center gap-2">
                <Info size={14} />
                <span>1. Insolvency of a Debtor</span>
              </h4>
              <p className="text-[14.5px] leading-relaxed text-slate-955 dark:text-slate-50 font-medium">
                The insolvency of a customer after the balance sheet date confirms that the debtor's balance was impaired at the balance sheet date. The company must write off the debt or make a full provision. <PdfRef page={4} />
              </p>
            </div>
            <div className="p-5 border border-indigo-150 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-955/5 rounded-xl space-y-2.5">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400 flex items-center gap-2">
                <Info size={14} />
                <span>2. Detection of Fraud / Cash Theft</span>
              </h4>
              <p className="text-[14.5px] leading-relaxed text-slate-955 dark:text-slate-50 font-medium">
                If a fraud or theft committed during the financial year is detected after the balance sheet date but before approval of the accounts, it is an adjusting event. The loss must be recognized in the current year. <PdfRef page={6} />
              </p>
            </div>
          </div>
        </section>

        {/* Chapter 6: Non-Adjusting Events */}
        <section id="as4-non-adjusting" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="VI" 
            title="Non-Adjusting Events After the Balance Sheet Date" 
            description="Detailing non-adjusting events, criteria, and disclosure requirements in approving authority reports."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              <strong>Non-adjusting events</strong> are events occurring after the balance sheet date that are indicative of conditions that arose **subsequent to the balance sheet date**. <PdfRef page={3} />
            </p>
            <p>
              These events **do not require adjustment** to the assets and liabilities in the financial statements. However, if they are significant, they must be disclosed in the report of the approving authority (e.g. Directors' Report) to enable users to make proper evaluations. <PdfRef page={4} />
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[15.5px]">
              <li>Decline in market value of investments between the balance sheet date and the date of approval (ordinary market fluctuations are subsequent events). <PdfRef page={4} /></li>
              <li>Destruction of a warehouse or major factory plant by fire or earthquake after the year-end. <PdfRef page={3} /></li>
              <li>Acquisitions, mergers, or disposals of businesses announced or initiated after the year-end. <PdfRef page={8} /></li>
            </ul>
          </div>

          {/* Warning Box: Cheques in hand received after B/S date */}
          <div className="p-5 border border-red-200 dark:border-red-900/40 bg-red-50/20 dark:bg-red-955/5 rounded-xl space-y-2.5">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-red-800 dark:text-red-400 flex items-center gap-2">
              <AlertTriangle size={14} />
              <span>Cheques Received After Year-End Warning</span>
            </h4>
            <p className="text-[14.5px] leading-relaxed text-slate-955 dark:text-slate-300 font-medium font-serif">
              Cheques received from customers after the balance sheet date (even if dated 31st March or before) do not represent a condition existing on 31st March. They cannot be recognized as asset "cheques in hand" on the balance sheet date, as the company lacked control over those funds at that date. <PdfRef page={6} />
            </p>
          </div>
        </section>

        {/* Chapter 7: Proposed Dividends */}
        <section id="as4-dividends" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="VII" 
            title="Proposed Dividends" 
            description="Detailing changes in accounting treatment of proposed dividends under the Companies Act 2016 amendments."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              Dividends proposed or declared after the balance sheet date but before approval of the accounts are **not recognized as a liability** in the balance sheet, as no present obligation exists on the balance sheet date. <PdfRef page={4} />
            </p>
            <p>
              As per the **Companies (Accounting Standards) Amendment Rules, 2016** (effective for financial year 31st March 2017 onwards), proposed dividends must only be **disclosed in the notes to accounts**. They cannot be accrued or recognized as liabilities. <PdfRef page={4} />
            </p>
          </div>
        </section>

        {/* Chapter 8: Going Concern Inappropriateness */}
        <section id="as4-going-concern" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="VIII" 
            title="Going Concern Inappropriateness" 
            description="Determining whether post-balance sheet events affect the validity of the going concern assumption."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              Events occurring after the balance sheet date may indicate that the enterprise ceases to be a going concern. A major deterioration in operating results or unusual events affecting the existence of the enterprise (e.g. destruction of the only production plant by fire) requires management to evaluate whether the going concern assumption remains appropriate. <PdfRef page={5} />
            </p>
            <p>
              If the going concern assumption is **no longer valid**, the financial statements must be prepared on a **liquidation basis** (writing down all assets to net realisable values and providing for liabilities). <PdfRef page={5} />
            </p>
          </div>
        </section>

        {/* Chapter 9: Disclosure Requirements */}
        <section id="as4-disclosure" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="IX" 
            title="Disclosure Requirements" 
            description="Mandatory reporting parameters including event nature and financial effect estimation."
          />

          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              For significant events occurring after the balance sheet date that require disclosure in the financial statements or in the report of the approving authority, the following information must be provided: <PdfRef page={6} />
            </p>
          </div>

          {/* Checklist Boxes */}
          <div className="space-y-3 font-sans">
            <div className="flex items-start gap-3 p-4 rounded-xl border border-blue-200 dark:border-blue-900/30 bg-blue-50/20 dark:bg-blue-955/5">
              <span className="text-blue-500 font-bold">☑</span>
              <div>
                <p className="text-[14.5px] text-slate-800 dark:text-slate-200 font-semibold font-sans">Nature of the Event</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-sans">Disclose a description of the nature of the post-balance sheet event. <PdfRef page={6} /></p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl border border-blue-200 dark:border-blue-900/30 bg-blue-50/20 dark:bg-blue-955/5">
              <span className="text-blue-500 font-bold">☑</span>
              <div>
                <p className="text-[14.5px] text-slate-800 dark:text-slate-200 font-semibold font-sans">Financial Effect Estimate</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-sans">Provide an estimate of the financial effect, or state that such an estimate cannot be made. <PdfRef page={6} /></p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}


const as5Sections = [
  { id: 'as5-overview',       title: '1. Introduction & Objective' },
  { id: 'as5-scope',          title: '2. Scope & Applicability' },
  { id: 'as5-net-profit',     title: '3. Net Profit or Loss Components' },
  { id: 'as5-ordinary',       title: '4. Ordinary & Exceptional Items' },
  { id: 'as5-extraordinary',  title: '5. Extraordinary Items' },
  { id: 'as5-prior-period',   title: '6. Prior Period Items' },
  { id: 'as5-estimates',      title: '7. Changes in Accounting Estimates' },
  { id: 'as5-policies',       title: '8. Changes in Accounting Policies' },
  { id: 'as5-non-changes',    title: '9. Non-Changes in Policies' },
]

interface AS5StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
}

function AS5StandardTabContent({ navigateToPdfPage }: AS5StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as5-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    ordinary: true,
    priorPeriod: true,
    estimates: false,
    policies: true
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as5-standard-sticky-toc')
    if (container && target) {
      const containerRect = container.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      let offset = 58
      if (stickyToc) { const tocRect = stickyToc.getBoundingClientRect(); offset = tocRect.bottom - containerRect.top }
      container.scrollTo({ top: targetRect.top - containerRect.top + container.scrollTop - offset - 12, behavior: 'auto' })
    }
  }

  useEffect(() => {
    if (!activeSection || !tocScrollRef.current) return
    const el = tocScrollRef.current
    const btn = el.querySelector('[data-sec-id="' + activeSection + '"]') as HTMLElement | null
    if (!btn) return
    if (as5Sections[0]?.id === activeSection) { el.scrollTo({ left: 0, behavior: 'smooth' }); return }
    const elRect = el.getBoundingClientRect(); const btnRect = btn.getBoundingClientRect()
    el.scrollTo({ left: btnRect.left - elRect.left + el.scrollLeft - elRect.width / 2 + btnRect.width / 2, behavior: 'smooth' })
  }, [activeSection])

  useEffect(() => {
    let obs: IntersectionObserver | undefined
    const init = () => {
      const sc = document.getElementById('as1-scroll-container')
      if (!sc) { setTimeout(init, 50); return }
      obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }), { root: sc, rootMargin: '-90px 0px -65% 0px', threshold: 0 })
      as5Sections.forEach(s => { const el = document.getElementById(s.id); if (el) obs?.observe(el) })
    }
    init(); return () => obs?.disconnect()
  }, [])

  useEffect(() => {
    const el = tocScrollRef.current; if (!el) return
    const onWheel = (e: WheelEvent) => { if (e.deltaY === 0) return; e.preventDefault(); el.scrollLeft += e.deltaY }
    el.addEventListener('wheel', onWheel, { passive: false }); return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const P = ({ n }: { n: number }) => (
    <button onClick={() => navigateToPdfPage(n)}
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-955/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={'Open AS 5 PDF page ' + n}><FileText size={9} className="shrink-0" /> p.{n}</button>
  )

  const SH = ({ id, num, title }: { id: string; num: string; title: string }) => (
    <div id={id} className="scroll-mt-36 mb-6 mt-14 first:mt-0 pb-4 border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <span className="font-mono font-extrabold text-[13px] text-emerald-600 dark:text-emerald-400 select-none">{num}.</span>
        <h2 className="text-[20px] sm:text-[22px] font-bold text-slate-900 dark:text-white tracking-tight">{title}</h2>
      </div>
      <div className="h-[2px] w-16 rounded-full bg-emerald-500 mt-2 ml-8" />
    </div>
  )

  const NB = ({ type, title, children }: { type: string; title?: string; children: React.ReactNode }) => {
    const s: Record<string, string> = {
      info:    'bg-blue-50/80 dark:bg-blue-955/20 border-blue-300 dark:border-blue-800/50 text-blue-900 dark:text-blue-200 border-l-blue-500',
      warning: 'bg-amber-50/80 dark:bg-amber-955/20 border-amber-300 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 border-l-amber-500',
      success: 'bg-emerald-50/80 dark:bg-emerald-955/20 border-emerald-300 dark:border-emerald-805 text-emerald-900 dark:text-emerald-202 border-l-emerald-500',
      exam:    'bg-rose-50/80 dark:bg-rose-955/20 border-rose-300 dark:border-rose-800/50 text-rose-900 dark:text-rose-200 border-l-rose-500',
    }
    return (
      <div className={'rounded-xl border border-l-4 p-5 my-5 ' + (s[type] || s['info'])}>
        {title && <p className="font-extrabold uppercase tracking-wider text-[10.5px] mb-2 opacity-75">{title}</p>}
        <div className="text-[14.5px] leading-relaxed">{children}</div>
      </div>
    )
  }

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      <div id="as5-standard-sticky-toc" ref={tocScrollRef} className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1"><BookOpen size={9.5} />AS 5:</span>
        {as5Sections.map(sec => (
          <button key={sec.id} data-sec-id={sec.id} onClick={() => handleSectionClick(sec.id)}
            className={'text-[9.5px] font-bold px-2 py-0.5 rounded border transition-all whitespace-nowrap cursor-pointer ' + (activeSection === sec.id ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#1E2640] dark:hover:bg-slate-800 border-slate-200 dark:border-gray-700 text-slate-600 dark:text-gray-300')}>
            {sec.title.split('. ').slice(1).join('. ') || sec.title}
          </button>
        ))}
      </div>

      <div className="w-full bg-white dark:bg-[#111726] border border-slate-200 dark:border-gray-800 rounded-xl px-6 sm:px-10 lg:px-14 py-10 sm:py-14 shadow-xs space-y-0">

        {/* I. Overview */}
        <SH id="as5-overview" num="I" title="Introduction & Objective of AS 5" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p><strong>Accounting Standard 5 (AS 5)</strong> deals with the classification and disclosure of specific items in the <strong>Statement of Profit and Loss</strong>. <P n={1} /> It aims to establish a uniform basis for presenting earnings so that the financial statements of an enterprise are comparable over time and with those of other enterprises.</p>
          <p>By segregating normal operating results from prior period errors, change in estimates, and extraordinary shocks, AS 5 helps users perceive the true earning power of the business and assess the sustainability of its future earnings.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8 font-serif">
          {[
            { color: 'emerald', title: 'Uniform Presentation', body: 'Prescribes strict presentation rules for the Profit & Loss statement to ensure all corporate entities disclose earnings on a uniform, standardised basis.', p: 1 },
            { color: 'teal', title: 'Enhancing Comparability', body: 'Enables investors and creditors to compare an enterprise\'s financial results over different reporting periods and across different entities in the same industry.', p: 1 },
            { color: 'blue', title: 'Earnings Transparency', body: 'Forces clear separation of normal operating items from prior period corrections, estimate revisions, and non-recurring extraordinary items.', p: 1 }
          ].map((c, i) => (
            <div key={i} className={'p-5 border-t-2 border-' + c.color + '-500 border border-' + c.color + '-200 dark:border-' + c.color + '-900/40 bg-' + c.color + '-50/20 dark:bg-' + c.color + '-950/5 rounded-xl'}>
              <h4 className={'font-sans font-bold text-[12px] uppercase tracking-wider text-' + c.color + '-800 dark:text-' + c.color + '-400 mb-2'}>{c.title}</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">{c.body} <P n={c.p} /></p>
            </div>
          ))}
        </div>

        {/* II. Scope */}
        <SH id="as5-scope" num="II" title="Scope & Applicability of the Standard" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>AS 5 should be applied by an enterprise in presenting profit or loss from ordinary activities, extraordinary items, prior period items, changes in accounting estimates, and changes in accounting policies in its financial statements. <P n={1} /></p>
        </div>
        <NB type="warning" title="Exclusion of Tax Implications">
          AS 5 does **not** deal with the tax implications of extraordinary items, prior period items, changes in accounting estimates, and changes in accounting policies. Appropriate tax adjustments and provisions are instead governed by <strong>AS 22 (Accounting for Taxes on Income)</strong>. <P n={1} />
        </NB>

        {/* III. Net Profit or Loss Components */}
        <SH id="as5-net-profit" num="III" title="Components of Net Profit or Loss for the Period" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>All items of income and expense recognized in a period must be included in the determination of net profit or loss for the period, unless an Accounting Standard requires or permits otherwise. <P n={2} /></p>
          <p>The net profit or loss for the period comprises the following components, each of which should be disclosed on the face of the statement of profit and loss:</p>
        </div>
        <div className="mb-8 overflow-x-auto rounded-xl border border-emerald-250 dark:border-emerald-900/40 font-serif">
          <table className="w-full text-left border-collapse text-[13.5px]">
            <thead><tr className="font-sans text-[11.5px] font-bold uppercase tracking-wider text-white bg-emerald-700 dark:bg-emerald-800"><th className="py-3 px-5 w-1/3">Component</th><th className="py-3 px-5 w-2/3">Mandated Disclosure & Treatment (Para 3)</th></tr></thead>
            <tbody className="divide-y divide-emerald-100 dark:divide-emerald-900/30 text-slate-900 dark:text-slate-100">
              <tr className="bg-white dark:bg-[#111726]"><td className="py-4 px-5 font-semibold font-sans text-xs uppercase tracking-wider">Profit/Loss from Ordinary Activities</td><td className="py-4 px-5 leading-relaxed">Activities undertaken by an enterprise as part of its business, and related activities in which it engages in furtherance of, incidental to, or arising from these activities. <P n={2} /></td></tr>
              <tr className="bg-emerald-50/15 dark:bg-emerald-955/5"><td className="py-4 px-5 font-semibold font-sans text-xs uppercase tracking-wider">Extraordinary Items</td><td className="py-4 px-5 leading-relaxed">Income or expenses arising from events or transactions that are clearly distinct from ordinary activities, and not expected to recur frequently or regularly. Must be disclosed on the face of the P&amp;L. <P n={2} /></td></tr>
              <tr className="bg-white dark:bg-[#111726]"><td className="py-4 px-5 font-semibold font-sans text-xs uppercase tracking-wider">Prior Period Items</td><td className="py-4 px-5 leading-relaxed">Income or expenses arising in the current period as a result of errors or omissions in the preparation of financial statements of one or more prior periods. Separate disclosure is required. <P n={4} /></td></tr>
            </tbody>
          </table>
        </div>

        {/* IV. Ordinary & Exceptional Items */}
        <SH id="as5-ordinary" num="IV" title="Profit or Loss from Ordinary & Exceptional Items" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>Ordinary activities include core operational business transactions as well as incidental transactions like profit or loss on sale of raw materials, merchandise, or fixed assets. <P n={2} /></p>
          <p><strong>Exceptional Items (Para 12):</strong> When items of income and expense within profit or loss from ordinary activities are of such <strong>size, nature or incidence</strong> that their disclosure is relevant to explain the performance of the enterprise for the period, the nature and amount of such items should be <strong>disclosed separately</strong>. <P n={3} /></p>
        </div>
        <div className="border border-emerald-200 dark:border-emerald-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('ordinary')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Circumstances Giving Rise to Separate Disclosure (Exceptional Items List) <P n={3} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.ordinary ? 'rotate-180' : '')} />
          </div>
          {openAccordions.ordinary && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed">
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Inventory Write-Downs:</strong> The write-down of inventories to net realisable value, as well as the reversal of such write-downs.</li>
                <li><strong>Restructuring Provisions:</strong> Restructuring the activities of an enterprise and the reversal of any provisions for the costs of restructuring.</li>
                <li><strong>Disposal of Fixed Assets:</strong> Profit or loss on the disposal of items of Property, Plant and Equipment (PPE).</li>
                <li><strong>Disposal of Investments:</strong> Profit or loss on the disposal of long-term or current investments.</li>
                <li><strong>Legislative Changes:</strong> Legislative changes having retrospective application.</li>
                <li><strong>Litigation Settlements:</strong> Settlements of litigation demands that arise from ordinary business activities.</li>
                <li><strong>Reversals of Provisions:</strong> Other reversals of provisions (e.g. provision for warranty or bad debts).</li>
              </ul>
            </div>
          )}
        </div>
        <NB type="info" title="Exceptional Item Nomenclature Note">
          Although the term "Exceptional Item" is not explicitly defined in the text of AS 5, it is used in Schedule III to the Companies Act, 2013 and is widely used in CA exams to refer to disclosures under Paragraph 12. <P n={3} />
        </NB>

        {/* V. Extraordinary Items */}
        <SH id="as5-extraordinary" num="V" title="Extraordinary Items — Definition & Classification" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p><strong>Extraordinary Items</strong> are income or expenses that arise from events or transactions that are clearly distinct from the ordinary activities of the enterprise and, therefore, are not expected to recur frequently or regularly. <P n={2} /></p>
          <p>The key test is the <strong>nature</strong> of the transaction in relation to the ordinary business of the enterprise. An event may be extraordinary for one enterprise but ordinary for another because of differences in their business models:</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 font-serif text-[14px]">
          <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50/10">
            <h4 className="font-bold text-red-700 dark:text-red-400 text-xs uppercase tracking-wider mb-2">Extraordinary for Most Entities</h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
              <li>Assets destroyed by a major earthquake.</li>
              <li>Attachment/expropriation of property of the enterprise by a government authorities. <P n={3} /></li>
              <li>Government confiscation of factory land.</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/30 bg-emerald-50/10">
            <h4 className="font-bold text-emerald-700 dark:text-emerald-400 text-xs uppercase tracking-wider mb-2">Ordinary / Not Extraordinary</h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
              <li>Claims from policyholders arising from an earthquake for an <strong>insurance enterprise</strong> that insures against such risks. <P n={2} /></li>
              <li>Loss on sale of investments by an <strong>investment NBFC</strong>.</li>
            </ul>
          </div>
        </div>
        <NB type="warning" title="Mandated Disclosure Format (Para 8)">
          The nature and the amount of each extraordinary item should be <strong>separately disclosed</strong> in the statement of profit and loss in a manner that its impact on current profit or loss can be perceived. <P n={2} />
        </NB>

        {/* VI. Prior Period Items */}
        <SH id="as5-prior-period" num="VI" title="Prior Period Items — Correction of Errors & Omissions" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p><strong>Prior Period Items</strong> arise in the current period as a result of errors or omissions in the preparation of financial statements of one or more prior periods. <P n={4} /> These errors may occur as a result of:</p>
          <ul className="list-disc pl-6 space-y-1 text-[15px] font-sans text-slate-700 dark:text-gray-300">
            <li>Mathematical mistakes.</li>
            <li>Mistakes in applying accounting policies.</li>
            <li>Misinterpretation of facts.</li>
            <li>Oversight or omission.</li>
          </ul>
        </div>
        <div className="border border-emerald-250 dark:border-emerald-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('priorPeriod')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Prior Period Items vs. Change in Estimate & Contingency <P n={4} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.priorPeriod ? 'rotate-180' : '')} />
          </div>
          {openAccordions.priorPeriod && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed">
              <p><strong>Correction of Error (Prior Period Item):</strong> Represents correction of mistakes where information was available in the past but was overlooked or miscalculated (e.g. forgot to record sales return in the previous year).</p>
              <p><strong>Change in Estimate:</strong> Revisions based on new information or developments that were NOT available in the past. These are approximations and are NOT prior period items (e.g. revision in the useful life of a machine based on technical usage observations).</p>
              <p><strong>Contingency Outcome:</strong> Income or expense recognized on the outcome of a contingency which previously could not be estimated reliably does not constitute a prior period item. <P n={4} /></p>
            </div>
          )}
        </div>
        <NB type="exam" title="Presentation of Prior Period Items">
          The nature and amount of prior period items should be <strong>separately disclosed</strong> in the statement of profit and loss in a manner that their impact on the current profit or loss can be perceived. <P n={4} /> They are shown after net profit/loss from ordinary activities but before tax.
        </NB>

        {/* VII. Changes in Accounting Estimates */}
        <SH id="as5-estimates" num="VII" title="Changes in Accounting Estimates" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>Because of uncertainties in business, many financial statement items cannot be measured precisely but can only be estimated (e.g. provision for doubtful debts, inventory obsolescence, useful lives or residual values of assets). <P n={6} /> Revisions become necessary as additional information is acquired, experience develops, or subsequent events occur.</p>
          <p><strong>Accounting Treatment (Para 21):</strong> The effect of a change in an accounting estimate should be included in the determination of net profit or loss <strong>prospectively</strong> (retroactive adjustment is prohibited) in:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-[15px] font-sans text-slate-700 dark:text-gray-300">
            <li>The period of the change, if the change affects that period only. (e.g. change in estimate of provision for bad debts).</li>
            <li>The period of the change and future periods, if the change affects both. (e.g. change in estimated useful life of a machine).</li>
          </ul>
        </div>
        <div className="mb-8 overflow-x-auto rounded-xl border border-emerald-250 dark:border-emerald-900/40 font-serif">
          <div className="bg-emerald-600 dark:bg-emerald-700 px-5 py-2.5"><span className="text-[11.5px] font-sans font-bold uppercase tracking-wider text-white">Prospective Classification Rule <P n={6} /></span></div>
          <table className="w-full text-left border-collapse text-[13.5px]">
            <thead><tr className="bg-emerald-50 dark:bg-emerald-950/20 font-sans text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300"><th className="py-3 px-5 w-1/2">Requirement</th><th className="py-3 px-5 w-1/2">Application Rule (Para 24–25)</th></tr></thead>
            <tbody className="divide-y divide-emerald-100 dark:divide-emerald-900/20 text-slate-900 dark:text-slate-100">
              <tr className="bg-white dark:bg-[#111726]"><td className="py-4 px-5 font-semibold">Classification</td><td className="py-4 px-5">The effect of a change in an accounting estimate should be classified using the <strong>same classification</strong> as was used previously for the estimate. If the estimate was operating expense, its change is operating. <P n={6} /></td></tr>
              <tr className="bg-emerald-50/15 dark:bg-emerald-955/5"><td className="py-4 px-5 font-semibold">Materiality Disclosure</td><td className="py-4 px-5">The nature and amount of a change in an accounting estimate which has a material effect in the current period, or is expected to have a material effect in subsequent periods, should be disclosed. <P n={6} /></td></tr>
              <tr className="bg-white dark:bg-[#111726]"><td className="py-4 px-5 font-semibold">Unquantifiable Impact</td><td className="py-4 px-5">If it is impracticable to quantify the amount of change, this fact should be explicitly disclosed in the notes. <P n={6} /></td></tr>
            </tbody>
          </table>
        </div>

        {/* VIII. Changes in Accounting Policies */}
        <SH id="as5-policies" num="VIII" title="Changes in Accounting Policies — Valuation & Criteria" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>Accounting policies represent specific accounting principles and methods of applying them. A change in an accounting policy should be made <strong>only</strong> if the change is: <P n={6} /></p>
          <ol className="list-decimal pl-6 space-y-1.5 text-[15px] font-sans text-slate-700 dark:text-gray-300">
            <li>Required by <strong>statute</strong> (e.g. Companies Act amendments).</li>
            <li>Required for compliance with an <strong>Accounting Standard</strong>.</li>
            <li>Considered that the change will result in a <strong>more appropriate presentation</strong> of the financial statements.</li>
          </ol>
        </div>
        <div className="mb-8 rounded-xl border border-emerald-200 dark:border-emerald-900/40 overflow-hidden font-serif">
          <div className="bg-emerald-700 px-5 py-3 flex items-center gap-2"><Check size={14} className="text-white stroke-[3]" /><span className="text-[11.5px] font-sans font-bold uppercase tracking-wider text-white">Disclosure of Policy Changes — Para 32 <P n={6} /></span></div>
          <div className="divide-y divide-emerald-100 dark:divide-emerald-900/30">
            {[
              { rule: 'Nature of Change', desc: 'The exact nature of the change in policy must be disclosed (e.g. changing inventory formula from FIFO to Weighted Average).' },
              { rule: 'Financial Effect Quantified', desc: 'The financial effect of the change must be disclosed and quantified in the financial statements of the period of change, where material.' },
              { rule: 'Unquantifiable Disclosures', desc: 'If the financial effect is not wholly or partially quantifiable, the fact that the effect is not quantifiable must be disclosed.' },
              { rule: 'Future Impact Statement', desc: 'If the change has no material effect in the current period but is expected to have a material effect in subsequent periods, the fact of such change should be disclosed.' },
            ].map((item, i) => (
              <div key={i} className={'flex gap-4 items-start px-5 py-4 ' + (i % 2 === 0 ? 'bg-white dark:bg-[#111726]' : 'bg-emerald-50/15 dark:bg-emerald-955/10')}>
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5"><Check size={13} className="stroke-[3]" /></div>
                <div><h4 className="font-sans font-bold text-[14px] text-slate-950 dark:text-white mb-1">{item.rule}</h4><p className="text-[13.5px] leading-relaxed text-slate-800 dark:text-slate-200">{item.desc}</p></div>
              </div>
            ))}
          </div>
        </div>

        {/* IX. Non-Changes in Policies */}
        <SH id="as5-non-changes" num="IX" title="Transactions That Do Not Constitute Policy Changes" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>Under <strong>Paragraph 30</strong>, the following transactions or adoptions are NOT considered changes in accounting policies:</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 font-serif text-[14.5px]">
          <div className="p-5 border border-emerald-200 dark:border-emerald-900/30 bg-emerald-50/10 rounded-xl space-y-2">
            <h4 className="font-sans font-bold text-[12px] uppercase tracking-wider text-emerald-800 dark:text-emerald-400">1. Substantially Different Events</h4>
            <p className="leading-relaxed text-slate-800 dark:text-slate-200">
              The adoption of an accounting policy for events or transactions that differ in substance from those previously occurring (e.g. adopting a lease accounting policy when leases are entered into for the first time, or introducing a pension scheme). <P n={6} />
            </p>
          </div>
          <div className="p-5 border border-teal-200 dark:border-teal-900/30 bg-teal-50/10 rounded-xl space-y-2">
            <h4 className="font-sans font-bold text-[12px] uppercase tracking-wider text-teal-800 dark:text-teal-400">2. Immaterial Transactions</h4>
            <p className="leading-relaxed text-slate-800 dark:text-slate-200">
              The adoption of a new accounting policy for events or transactions which did not occur previously or that were immaterial (e.g. writing off small tools as expense when tools were previously capitalised but now the usage volume is insignificant). <P n={6} />
            </p>
          </div>
        </div>

        {/* Quick Reference Table */}
        <div className="mt-10 mb-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 font-serif">
          <div className="bg-slate-700 px-5 py-3"><span className="text-[11.5px] font-sans font-bold uppercase tracking-wider text-white">Quick Reference — AS 5 Decision Framework</span></div>
          <table className="w-full text-left border-collapse text-[13px]">
            <thead><tr className="bg-slate-100 dark:bg-slate-900 font-sans text-[11px] uppercase tracking-wider font-bold text-slate-700 dark:text-slate-300"><th className="py-3 px-5 w-2/5">Event / Transaction</th><th className="py-3 px-5 text-center">Classification</th><th className="py-3 px-5 text-center">Accounting Treatment</th></tr></thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-900 dark:text-slate-100">
              {[
                ['Loss due to factory fire / natural calamity','Extraordinary Item','Disclose separately on the face of P&L'],
                ['Writing down inventory to NRV','Exceptional Item (Ordinary)','Disclose separately in notes / P&L'],
                ['VRS compensation paid to employees','Exceptional Item (Ordinary)','Disclose separately in notes / P&L'],
                ['Unrecorded sales return from prior year discovered','Prior Period Item','Restate opening reserves / adjust in current P&L'],
                ['Revision of bad debt provision percentage','Change in Estimate','Prospective adjustment in current year P&L'],
                ['Change in asset useful life estimate','Change in Estimate','Prospective depreciation rate change'],
                ['Switching from SLM to WDV method','Change in Policy','Retrospective cumulative effect calculation & disclose'],
                ['Adopting lease policy for the first time','No Policy Change','None required — apply policy prospectively'],
              ].map(([event, cls, treatment], i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-[#111726]' : 'bg-slate-50/30 dark:bg-slate-800/10'}>
                  <td className="py-2.5 px-5 text-slate-700 dark:text-slate-300">{event}</td>
                  <td className="py-2.5 px-5 text-center font-bold text-emerald-600 dark:text-emerald-400">{cls}</td>
                  <td className="py-2.5 px-5 text-slate-600 dark:text-slate-400">{treatment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

const as7Sections = [
  { id: 'as7-overview',       title: '1. Introduction & Objective' },
  { id: 'as7-definitions',    title: '2. Key Definitions' },
  { id: 'as7-contract-types', title: '3. Fixed Price vs Cost Plus' },
  { id: 'as7-segmenting',     title: '4. Combining & Segmenting' },
  { id: 'as7-revenue',        title: '5. Contract Revenue Inclusions' },
  { id: 'as7-costs',          title: '6. Contract Costs & Exclusions' },
  { id: 'as7-recognition',    title: '7. Revenue Recognition (POCM)' },
  { id: 'as7-losses',         title: '8. Recognition of Expected Losses' },
  { id: 'as7-disclosures',    title: '9. Disclosure Requirements' },
]

interface AS7StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
}

function AS7StandardTabContent({ navigateToPdfPage }: AS7StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as7-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    segmenting: true,
    revenue: true,
    costs: true,
    pocm: true
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as7-standard-sticky-toc')
    if (container && target) {
      const containerRect = container.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      let offset = 58
      if (stickyToc) { const tocRect = stickyToc.getBoundingClientRect(); offset = tocRect.bottom - containerRect.top }
      container.scrollTo({ top: targetRect.top - containerRect.top + container.scrollTop - offset - 12, behavior: 'auto' })
    }
  }

  useEffect(() => {
    if (!activeSection || !tocScrollRef.current) return
    const el = tocScrollRef.current
    const btn = el.querySelector('[data-sec-id="' + activeSection + '"]') as HTMLElement | null
    if (!btn) return
    if (as7Sections[0]?.id === activeSection) { el.scrollTo({ left: 0, behavior: 'smooth' }); return }
    const elRect = el.getBoundingClientRect(); const btnRect = btn.getBoundingClientRect()
    el.scrollTo({ left: btnRect.left - elRect.left + el.scrollLeft - elRect.width / 2 + btnRect.width / 2, behavior: 'smooth' })
  }, [activeSection])

  useEffect(() => {
    let obs: IntersectionObserver | undefined
    const init = () => {
      const sc = document.getElementById('as1-scroll-container')
      if (!sc) { setTimeout(init, 50); return }
      obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }), { root: sc, rootMargin: '-90px 0px -65% 0px', threshold: 0 })
      as7Sections.forEach(s => { const el = document.getElementById(s.id); if (el) obs?.observe(el) })
    }
    init(); return () => obs?.disconnect()
  }, [])

  useEffect(() => {
    const el = tocScrollRef.current; if (!el) return
    const onWheel = (e: WheelEvent) => { if (e.deltaY === 0) return; e.preventDefault(); el.scrollLeft += e.deltaY }
    el.addEventListener('wheel', onWheel, { passive: false }); return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const P = ({ n }: { n: number }) => (
    <button onClick={() => navigateToPdfPage(n)}
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-955/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={'Open AS 7 PDF page ' + n}><FileText size={9} className="shrink-0" /> p.{n}</button>
  )

  const SH = ({ id, num, title }: { id: string; num: string; title: string }) => (
    <div id={id} className="scroll-mt-36 mb-6 mt-14 first:mt-0 pb-4 border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <span className="font-mono font-extrabold text-[13px] text-blue-600 dark:text-blue-400 select-none">{num}.</span>
        <h2 className="text-[20px] sm:text-[22px] font-bold text-slate-900 dark:text-white tracking-tight">{title}</h2>
      </div>
      <div className="h-[2px] w-16 rounded-full bg-blue-500 mt-2 ml-8" />
    </div>
  )

  const NB = ({ type, title, children }: { type: string; title?: string; children: React.ReactNode }) => {
    const s: Record<string, string> = {
      info:    'bg-blue-50/80 dark:bg-blue-955/20 border-blue-300 dark:border-blue-800/50 text-blue-900 dark:text-blue-200 border-l-blue-500',
      warning: 'bg-amber-50/80 dark:bg-amber-955/20 border-amber-300 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 border-l-amber-500',
      success: 'bg-emerald-50/80 dark:bg-emerald-955/20 border-emerald-300 dark:border-emerald-805 text-emerald-900 dark:text-emerald-202 border-l-emerald-500',
      exam:    'bg-rose-50/80 dark:bg-rose-955/20 border-rose-300 dark:border-rose-800/50 text-rose-900 dark:text-rose-200 border-l-rose-500',
    }
    return (
      <div className={'rounded-xl border border-l-4 p-5 my-5 ' + (s[type] || s['info'])}>
        {title && <p className="font-extrabold uppercase tracking-wider text-[10.5px] mb-2 opacity-75">{title}</p>}
        <div className="text-[14.5px] leading-relaxed">{children}</div>
      </div>
    )
  }

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      <div id="as7-standard-sticky-toc" ref={tocScrollRef} className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1"><BookOpen size={9.5} />AS 7:</span>
        {as7Sections.map(sec => (
          <button key={sec.id} data-sec-id={sec.id} onClick={() => handleSectionClick(sec.id)}
            className={'text-[9.5px] font-bold px-2 py-0.5 rounded border transition-all whitespace-nowrap cursor-pointer ' + (activeSection === sec.id ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#1E2640] dark:hover:bg-slate-800 border-slate-200 dark:border-gray-700 text-slate-600 dark:text-gray-300')}>
            {sec.title.split('. ').slice(1).join('. ') || sec.title}
          </button>
        ))}
      </div>

      <div className="w-full bg-white dark:bg-[#111726] border border-slate-200 dark:border-gray-800 rounded-xl px-6 sm:px-10 lg:px-14 py-10 sm:py-14 shadow-xs space-y-0">

        {/* 1. Overview */}
        <SH id="as7-overview" num="I" title="Introduction & Objective of AS 7" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p><strong>Accounting Standard 7 (AS 7) — Construction Contracts</strong> prescribes the principles of accounting for construction contracts in the financial statements of contractors. <P n={3} /> The primary issue is the allocation of contract revenue and contract costs to the accounting periods in which construction work is performed.</p>
          <p>Since construction activities typically cover more than one accounting period (multi-year projects), the standard provides criteria to determine when contract revenue and contract costs should be recognized as revenue and expenses in the Statement of Profit and Loss. <P n={2} /></p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8 font-serif">
          {[
            { color: 'blue', title: 'Timing of Recognition', body: 'Establishes clear rules for the timing and allocation of contract revenue and contract costs across the periods of construction.', p: 2 },
            { color: 'indigo', title: 'Scope Specifics', body: 'Applies specifically in the financial statements of contractors (not contractees/customers) to negotiated asset construction contracts.', p: 3 },
            { color: 'violet', title: 'Expected Losses Rule', body: 'Enforces the immediate recognition of any expected losses as an expense, reflecting the prudence consideration in accounting.', p: 10 }
          ].map((c, i) => (
            <div key={i} className={'p-5 border-t-2 border-' + c.color + '-500 border border-' + c.color + '-200 dark:border-' + c.color + '-900/40 bg-' + c.color + '-50/20 dark:bg-' + c.color + '-950/5 rounded-xl'}>
              <h4 className={'font-sans font-bold text-[12px] uppercase tracking-wider text-' + c.color + '-800 dark:text-' + c.color + '-400 mb-2'}>{c.title}</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">{c.body} <P n={c.p} /></p>
            </div>
          ))}
        </div>

        {/* 2. Definitions */}
        <SH id="as7-definitions" num="II" title="Key Definitions" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>The standard defines the following key terms for its application: <P n={3} /></p>
        </div>
        <div className="mb-8 space-y-4 font-serif">
          {[
            { term: 'Construction Contract', color: 'blue', def: 'A contract specifically negotiated for the construction of an asset or a combination of assets that are closely interrelated or interdependent in terms of their design, technology and function or their ultimate purpose or use.', ex: 'Contracts for the construction of bridges, buildings, dams, pipelines, roads, ships, tunnels, refineries, or complex pieces of plant.' },
            { term: 'Directly Related Services', color: 'indigo', def: 'For the purposes of this Standard, construction contracts also include contracts for the rendering of services which are directly related to the construction of the asset.', ex: 'Services of project managers and architects.' },
            { term: 'Demolition & Restoration', color: 'violet', def: 'Contracts for the destruction or restoration of assets, and the restoration of the environment following the demolition of assets.', ex: 'Land cleaning, environmental remediation post-demolition.' }
          ].map((item, i) => (
            <div key={i} className={'p-5 border-l-4 border-' + item.color + '-500 border border-' + item.color + '-200 dark:border-' + item.color + '-900/40 bg-' + item.color + '-50/20 dark:bg-' + item.color + '-950/5 rounded-xl'}>
              <h4 className={'font-sans font-bold text-[13px] text-' + item.color + '-800 dark:text-' + item.color + '-400 mb-2'}>{item.term}</h4>
              <p className="text-[15px] leading-relaxed text-slate-800 dark:text-slate-200 mb-2">{item.def} <P n={3} /></p>
              <p className="text-[13px] text-slate-500 dark:text-slate-400 italic">Included: {item.ex}</p>
            </div>
          ))}
        </div>

        {/* 3. Contract Types */}
        <SH id="as7-contract-types" num="III" title="Contract Types — Fixed Price vs. Cost Plus" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>AS 7 classifies construction contracts into two main categories: <P n={3} /></p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 font-serif">
          <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/40 dark:bg-slate-900/10 space-y-2">
            <h3 className="font-sans font-bold text-[15px] text-slate-900 dark:text-white">Fixed Price Contract</h3>
            <p className="text-[14.5px] leading-relaxed">The contractor agrees to a fixed contract price, or a fixed rate per unit of output, which in some cases may be subject to cost escalation clauses. <P n={3} /></p>
            <div className="p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              <strong>Risk Profile:</strong> Higher risk for the contractor since any cost overrun reduces the profit margin.
            </div>
          </div>
          <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/40 dark:bg-slate-900/10 space-y-2">
            <h3 className="font-sans font-bold text-[15px] text-slate-900 dark:text-white">Cost Plus Contract</h3>
            <p className="text-[14.5px] leading-relaxed">The contractor is reimbursed for allowable or otherwise defined costs, plus a percentage of these costs or a fixed fee. <P n={3} /></p>
            <div className="p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              <strong>Risk Profile:</strong> Lower risk for the contractor as cost overruns are reimbursed by the contractee.
            </div>
          </div>
        </div>

        {/* 4. Combining & Segmenting */}
        <SH id="as7-segmenting" num="IV" title="Combining and Segmenting Construction Contracts" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>The requirements of this Standard are usually applied separately to each construction contract. However, in certain circumstances, it is necessary to apply the Standard to the separately identifiable components of a single contract or to a group of contracts together in order to reflect the substance of a contract or a group of contracts. <P n={4} /></p>
        </div>
        <div className="border border-blue-200 dark:border-blue-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('segmenting')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Rules for Segmenting &amp; Combining Contracts <P n={4} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.segmenting ? 'rotate-180' : '')} />
          </div>
          {openAccordions.segmenting && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed">
              <p><strong>1. Segmenting (Single Contract for Multiple Assets):</strong> When a contract covers a number of assets, the construction of each asset should be treated as a separate construction contract when:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Separate proposals have been submitted for each asset;</li>
                <li>Each asset has been subject to separate negotiation and the contractor and customer have been able to accept or reject that part of the contract relating to each asset; and</li>
                <li>The costs and revenues of each asset can be identified. <P n={5} /></li>
              </ul>
              <p><strong>2. Combining (Group of Contracts):</strong> A group of contracts, whether with a single customer or with several customers, should be treated as a single construction contract when:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The group of contracts is negotiated as a single package;</li>
                <li>The contracts are so closely interrelated that they are, in effect, part of a single project with an overall profit margin; and</li>
                <li>The contracts are performed concurrently or in a continuous sequence. <P n={5} /></li>
              </ul>
              <p><strong>3. Additional Asset Option:</strong> A contract may provide for the construction of an additional asset at the option of the customer or may be amended to include the construction of an additional asset. The construction of the additional asset should be treated as a separate construction contract when:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The asset differs significantly in design, technology or function from the asset or assets covered by the original contract; or</li>
                <li>The price of the asset is negotiated without regard to the original contract price. <P n={5} /></li>
              </ul>
            </div>
          )}
        </div>

        {/* 5. Contract Revenue */}
        <SH id="as7-revenue" num="V" title="Contract Revenue Inclusions & Variations" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>Contract revenue should comprise: <P n={5} /></p>
          <ol className="list-decimal pl-6 space-y-1.5 text-[15px] font-sans text-slate-700 dark:text-gray-300">
            <li>The initial amount of revenue agreed in the contract; and</li>
            <li>Variations in contract work, claims and incentive payments: (a) to the extent that it is probable that they will result in revenue; and (b) they are capable of being reliably measured.</li>
          </ol>
        </div>
        <div className="border border-indigo-200 dark:border-indigo-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('revenue')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Key Components Explained <P n={5} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.revenue ? 'rotate-180' : '')} />
          </div>
          {openAccordions.revenue && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed">
              <p><strong>Variations:</strong> An instruction by the customer for a change in the scope of the work to be performed under the contract. Included in revenue when it is probable that the customer will approve the variation and the amount of revenue can be reliably measured. <P n={5} /></p>
              <p><strong>Claims:</strong> An amount that the contractor seeks to collect from the customer or another party as reimbursement for costs not included in the contract price (e.g. customer-caused delays, errors in specifications). Included when negotiations have reached an advanced stage and the amount can be measured reliably. <P n={6} /></p>
              <p><strong>Incentive Payments:</strong> Additional amounts paid to the contractor if specified performance standards are met or exceeded (e.g. early completion). Included when the contract is sufficiently advanced that it is probable that the specified performance standards will be met. <P n={6} /></p>
            </div>
          )}
        </div>

        {/* 6. Contract Costs */}
        <SH id="as7-costs" num="VI" title="Contract Costs & Exclusions" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>Contract costs should comprise: <P n={6} /></p>
        </div>
        <div className="border border-violet-200 dark:border-violet-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('costs')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Detailed Breakdown of Contract Costs <P n={6} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.costs ? 'rotate-180' : '')} />
          </div>
          {openAccordions.costs && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed">
              <p><strong>1. Costs directly related to the specific contract:</strong> Site labour costs, including site supervision; costs of materials used in construction; depreciation of plant and equipment used on the contract; costs of moving plant, equipment and materials to and from the contract site; hire costs of plant and equipment; costs of design and technical assistance. <P n={6} /></p>
              <p><strong>2. Costs attributable to contract activity in general (allocated overheads):</strong> Insurance; design and technical assistance that is not directly related to a specific contract; construction overheads. These are allocated using systematic, rational methods applied consistently. <P n={7} /></p>
              <p><strong>3. Costs specifically chargeable to the customer:</strong> Costs specifically chargeable under the terms of the contract (e.g. general administration costs and development costs for which reimbursement is specified). <P n={7} /></p>
              <p className="font-bold text-rose-600 dark:text-rose-400">Costs strictly excluded (must be expensed in period):</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>General administration costs for which reimbursement is not specified in the contract.</li>
                <li>Selling costs (e.g., advertisement, commissions).</li>
                <li>Research and development costs for which reimbursement is not specified.</li>
                <li>Depreciation of idle plant and equipment that is not used on any contract. <P n={7} /></li>
              </ul>
            </div>
          )}
        </div>

        {/* 7. Revenue Recognition */}
        <SH id="as7-recognition" num="VII" title="Revenue & Expense Recognition — Percentage of Completion Method" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>When the outcome of a construction contract can be estimated reliably, contract revenue and contract costs associated with the construction contract should be recognized as revenue and expenses respectively by reference to the <strong>stage of completion</strong> of the contract activity at the reporting date. <P n={8} /></p>
        </div>
        <div className="border border-emerald-200 dark:border-emerald-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('pocm')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Determining Stage of Completion (Para 29) <P n={9} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.pocm ? 'rotate-180' : '')} />
          </div>
          {openAccordions.pocm && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed font-sans">
              <p>The stage of completion of a contract may be determined in a variety of ways. The enterprise uses the method that measures reliably the work performed. Depending on the nature of the contract, the methods may include:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li><strong>Cost-to-Cost Method:</strong> The proportion that contract costs incurred for work performed to date bear to the estimated total contract costs. <P n={9} /></li>
                <li><strong>Physical Survey Method:</strong> Surveys of work performed on the construction site.</li>
                <li><strong>Physical Completion Method:</strong> Completion of a physical proportion of the contract work (e.g. number of floors constructed).</li>
              </ul>
              <div className="p-3 bg-white dark:bg-slate-900 border rounded-lg font-mono text-[11.5px] text-slate-800 dark:text-slate-200 text-center">
                Stage of Completion (%) = (Contract Costs Incurred to Date ÷ Estimated Total Contract Costs) × 100
              </div>
              <p className="font-bold text-amber-600 dark:text-amber-450 mt-2">Exclude from Costs Incurred to Date:</p>
              <p>Costs incurred that relate to future activity on the contract (e.g., site materials delivered but not yet installed/used during construction, unless manufactured specifically for the contract) and payments made to subcontractors in advance of work performed. <P n={9} /></p>
            </div>
          )}
        </div>

        {/* 8. Expected Losses */}
        <SH id="as7-losses" num="VIII" title="Recognition of Expected Losses" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>Under <strong>Paragraph 35</strong>, when it is probable that total contract costs will exceed total contract revenue, the expected loss should be <strong>recognized as an expense immediately</strong>. <P n={10} /></p>
          <p>This rule is an application of the prudence principle and must be followed regardless of:</p>
          <ul className="list-disc pl-6 space-y-1 text-[15px] font-sans text-slate-700 dark:text-gray-300">
            <li>Whether or not work has commenced on the contract;</li>
            <li>The stage of completion of contract activity; or</li>
            <li>The amount of profits expected to arise on other contracts which are not treated as a single construction contract. <P n={10} /></li>
          </ul>
        </div>
        <NB type="exam" title="Exam Computation: Expected Loss Allocation">
          If estimated total contract costs are ₹1,20,00,000 and total contract revenue is ₹1,00,00,000 — the expected loss is ₹20,00,000. If the stage of completion is 40% (meaning ₹8,00,000 loss was already recognized under POCM), the remaining ₹12,00,000 must be recognized immediately as a provision for expected loss in the current year. <P n={10} />
        </NB>

        {/* 9. Disclosures */}
        <SH id="as7-disclosures" num="IX" title="Disclosure Requirements under AS 7" />
        <div className="mb-6 rounded-xl border border-indigo-200 dark:border-indigo-900/40 overflow-hidden font-serif">
          <div className="bg-indigo-700 px-5 py-3 flex items-center gap-2"><Check size={14} className="text-white stroke-[3]" /><span className="text-[11.5px] font-sans font-bold uppercase tracking-wider text-white">AS 7 Mandatory Disclosures <P n={12} /></span></div>
          <div className="divide-y divide-indigo-100 dark:divide-indigo-900/30">
            {[
              { title: 'General Contract Policy', detail: 'The amount of contract revenue recognized as revenue in the period, and the methods used to determine the contract revenue recognized in the period (e.g. stage of completion method).' },
              { title: 'Contracts in Progress (Accrued Details)', detail: 'For contracts in progress at the reporting date: (a) the aggregate amount of costs incurred and recognized profits (less recognized losses) to date; (b) the amount of advances received; and (c) the amount of retentions.' },
              { title: 'Due from / to Customers', detail: 'The gross amount due from customers for contract work (asset) and the gross amount due to customers for contract work (liability).' }
            ].map((item, i) => (
              <div key={i} className={'flex gap-4 items-start px-5 py-4 ' + (i % 2 === 0 ? 'bg-white dark:bg-[#111726]' : 'bg-indigo-50/15 dark:bg-indigo-950/5')}>
                <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-700 dark:text-indigo-300 shrink-0 mt-0.5"><Check size={13} className="stroke-[3]" /></div>
                <div><h4 className="font-sans font-bold text-[14px] text-slate-950 dark:text-white mb-1">{item.title}</h4><p className="text-[13.5px] leading-relaxed text-slate-800 dark:text-slate-200">{item.detail}</p></div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Reference Table */}
        <div className="mt-10 mb-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 font-serif">
          <div className="bg-slate-700 px-5 py-3"><span className="text-[11.5px] font-sans font-bold uppercase tracking-wider text-white">Quick Reference — AS 7 Cost Classification Summary</span></div>
          <table className="w-full text-left border-collapse text-[13px]">
            <thead><tr className="bg-slate-100 dark:bg-slate-900 font-sans text-[11px] uppercase tracking-wider font-bold text-slate-700 dark:text-slate-300"><th className="py-3 px-5 w-2/5">Cost Item</th><th className="py-3 px-5 text-center">Included in Contract Cost?</th><th className="py-3 px-5 text-center">Standard Treatment / Reasoning</th></tr></thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-900 dark:text-slate-100">
              {[
                ['Site labor costs & site supervision','✓ Yes','Directly related cost (allocated to contract)'],
                ['Site materials consumed','✓ Yes','Directly related cost (allocated to contract)'],
                ['Site materials delivered but not yet used','✗ No','Exclude from POCM cost-to-cost fraction (inventory)'],
                ['Depreciation of plant used on site','✓ Yes','Directly related cost'],
                ['Depreciation of idle plant & machinery','✗ No','General idle capacity cost — write off to P&L'],
                ['Underwriting commissions & general S&D','✗ No','Selling & distribution expenses — expensed to P&L'],
                ['Attributable insurance premiums','✓ Yes','Allocated general contract overhead'],
                ['Reimbursable administrative costs','✓ Yes','Specifically chargeable under contract terms'],
              ].map(([item, op, desc], i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-[#111726]' : 'bg-slate-50/30 dark:bg-slate-800/10'}>
                  <td className="py-2.5 px-5 text-slate-700 dark:text-slate-300">{item}</td>
                  <td className={'py-2.5 px-5 text-center font-bold ' + (op === '✓ Yes' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')}>{op}</td>
                  <td className="py-2.5 px-5 text-slate-600 dark:text-slate-400">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

const as9Sections = [
  { id: 'as9-overview',       title: '1. Introduction & Objective' },
  { id: 'as9-scope-ex',       title: '2. Scope & Exclusions' },
  { id: 'as9-definitions',    title: '3. Definition of Revenue' },
  { id: 'as9-agency',         title: '4. Principal vs Agent (Agency)' },
  { id: 'as9-goods',          title: '5. Revenue from Sale of Goods' },
  { id: 'as9-services',       title: '6. Revenue from Services' },
  { id: 'as9-resources',      title: '7. Interest, Royalties & Dividends' },
  { id: 'as9-uncertainties',  title: '8. Effect of Uncertainties' },
  { id: 'as9-disclosures',    title: '9. Disclosure Requirements' },
]

interface AS9StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences: (text: string) => React.ReactNode;
}

function AS9StandardTabContent({ navigateToPdfPage, renderTextWithReferences }: AS9StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as9-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    exclusions: true,
    goodsExceptions: true,
    servicesMethods: true,
    uncertaintyRules: true
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as9-standard-sticky-toc')
    if (container && target) {
      const containerRect = container.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      let offset = 58
      if (stickyToc) { const tocRect = stickyToc.getBoundingClientRect(); offset = tocRect.bottom - containerRect.top }
      container.scrollTo({ top: targetRect.top - containerRect.top + container.scrollTop - offset - 12, behavior: 'auto' })
    }
  }

  useEffect(() => {
    if (!activeSection || !tocScrollRef.current) return
    const el = tocScrollRef.current
    const btn = el.querySelector('[data-sec-id="' + activeSection + '"]') as HTMLElement | null
    if (!btn) return
    if (as9Sections[0]?.id === activeSection) { el.scrollTo({ left: 0, behavior: 'smooth' }); return }
    const elRect = el.getBoundingClientRect(); const btnRect = btn.getBoundingClientRect()
    el.scrollTo({ left: btnRect.left - elRect.left + el.scrollLeft - elRect.width / 2 + btnRect.width / 2, behavior: 'smooth' })
  }, [activeSection])

  useEffect(() => {
    let obs: IntersectionObserver | undefined
    const init = () => {
      const sc = document.getElementById('as1-scroll-container')
      if (!sc) { setTimeout(init, 50); return }
      obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }), { root: sc, rootMargin: '-90px 0px -65% 0px', threshold: 0 })
      as9Sections.forEach(s => { const el = document.getElementById(s.id); if (el) obs?.observe(el) })
    }
    init(); return () => obs?.disconnect()
  }, [])

  useEffect(() => {
    const el = tocScrollRef.current; if (!el) return
    const onWheel = (e: WheelEvent) => { if (e.deltaY === 0) return; e.preventDefault(); el.scrollLeft += e.deltaY }
    el.addEventListener('wheel', onWheel, { passive: false }); return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const P = ({ n }: { n: number }) => (
    <button onClick={() => navigateToPdfPage(n)}
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-955/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={'Open AS 9 PDF page ' + n}><FileText size={9} className="shrink-0" /> p.{n}</button>
  )

  const SH = ({ id, num, title }: { id: string; num: string; title: string }) => (
    <div id={id} className="scroll-mt-36 mb-6 mt-14 first:mt-0 pb-4 border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <span className="font-mono font-extrabold text-[13px] text-indigo-600 dark:text-indigo-400 select-none">{num}.</span>
        <h2 className="text-[20px] sm:text-[22px] font-bold text-slate-900 dark:text-white tracking-tight">{title}</h2>
      </div>
      <div className="h-[2px] w-16 rounded-full bg-indigo-500 mt-2 ml-8" />
    </div>
  )

  const NB = ({ type, title, children }: { type: string; title?: string; children: React.ReactNode }) => {
    const s: Record<string, string> = {
      info:    'bg-blue-50/80 dark:bg-blue-955/20 border-blue-300 dark:border-blue-800/50 text-blue-900 dark:text-blue-200 border-l-blue-500',
      warning: 'bg-amber-50/80 dark:bg-amber-955/20 border-amber-300 dark:border-amber-805 text-amber-900 dark:text-amber-202 border-l-amber-500',
      success: 'bg-emerald-50/80 dark:bg-emerald-955/20 border-emerald-300 dark:border-emerald-805 text-emerald-900 dark:text-emerald-202 border-l-emerald-500',
      exam:    'bg-rose-50/80 dark:bg-rose-955/20 border-rose-300 dark:border-rose-800/50 text-rose-900 dark:text-rose-200 border-l-rose-500',
    }
    return (
      <div className={'rounded-xl border border-l-4 p-5 my-5 ' + (s[type] || s['info'])}>
        {title && <p className="font-extrabold uppercase tracking-wider text-[10.5px] mb-2 opacity-75">{title}</p>}
        <div className="text-[14.5px] leading-relaxed">{children}</div>
      </div>
    )
  }

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      <div id="as9-standard-sticky-toc" ref={tocScrollRef} className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1"><BookOpen size={9.5} />AS 9:</span>
        {as9Sections.map(sec => (
          <button key={sec.id} data-sec-id={sec.id} onClick={() => handleSectionClick(sec.id)}
            className={'text-[9.5px] font-bold px-2 py-0.5 rounded border transition-all whitespace-nowrap cursor-pointer ' + (activeSection === sec.id ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#1E2640] dark:hover:bg-slate-800 border-slate-200 dark:border-gray-700 text-slate-600 dark:text-gray-300')}>
            {sec.title.split('. ').slice(1).join('. ') || sec.title}
          </button>
        ))}
      </div>

      <div className="w-full bg-white dark:bg-[#111726] border border-slate-200 dark:border-gray-800 rounded-xl px-6 sm:px-10 lg:px-14 py-10 sm:py-14 shadow-xs space-y-0">

        {/* 1. Overview */}
        <SH id="as9-overview" num="I" title="Introduction & Objective of AS 9" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p><strong>Accounting Standard 9 (AS 9) — Revenue Recognition</strong> deals with the bases for recognition of revenue in the statement of profit and loss of an enterprise. <P n={1} /> It establishes guidelines regarding the timing and measurement of revenue arising from the course of ordinary activities.</p>
          <p>Revenue is the backbone of any business entity. Improper or premature recognition of sales can distort reported performance and misguide stakeholders. AS 9 ensures revenue is recognized only when the core earnings process is complete and collectability is reasonably certain. <P n={1} /></p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8 font-serif">
          {[
            { color: 'indigo', title: 'Sale of Goods', body: 'Deals with the recognition of revenue when the seller has transferred significant risks and rewards of ownership to the buyer.', p: 1 },
            { color: 'violet', title: 'Rendering of Services', body: 'Prescribes rules for recognizing revenue from service execution over time using performance methods.', p: 1 },
            { color: 'blue', title: 'Use of Resources', body: 'Addresses revenue arising from letting others use enterprise resources, yielding interest, royalties, and dividends.', p: 1 }
          ].map((c, i) => (
            <div key={i} className={'p-5 border-t-2 border-' + c.color + '-500 border border-' + c.color + '-200 dark:border-' + c.color + '-900/40 bg-' + c.color + '-50/20 dark:bg-' + c.color + '-950/5 rounded-xl'}>
              <h4 className={'font-sans font-bold text-[12px] uppercase tracking-wider text-' + c.color + '-800 dark:text-' + c.color + '-400 mb-2'}>{c.title}</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">{c.body} <P n={c.p} /></p>
            </div>
          ))}
        </div>

        {/* 2. Scope Exclusions */}
        <SH id="as9-scope-ex" num="II" title="Scope & Exclusions" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>AS 9 applies to the recognition of revenue arising in the course of the ordinary activities of an enterprise. <P n={1} /> However, it does not deal with aspects of revenue recognition to which special considerations apply:</p>
        </div>
        <div className="border border-indigo-200 dark:border-indigo-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('exclusions')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">List of Explicit Exclusions under AS 9 <P n={2} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.exclusions ? 'rotate-180' : '')} />
          </div>
          {openAccordions.exclusions && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed">
              <p><strong>1. Construction Contracts:</strong> Revenue arising from construction contracts is excluded and governed under <strong>AS 7</strong>. <P n={2} /></p>
              <p><strong>2. Hire-purchase &amp; Leases:</strong> Revenue arising from hire-purchase or lease agreements is excluded and governed under <strong>AS 19</strong>. <P n={2} /></p>
              <p><strong>3. Government Grants:</strong> Revenue arising from government grants and other similar subsidies is excluded and governed under <strong>AS 12</strong>. <P n={2} /></p>
              <p><strong>4. Insurance Contracts:</strong> Revenue of insurance companies arising from insurance contracts is excluded. <P n={2} /></p>
              <p className="font-bold text-rose-600 dark:text-rose-450">Other items excluded from the definition of "Revenue":</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Realized or unrealized gains resulting from the disposal/holding of non-current assets (e.g. appreciation in fixed assets). <P n={2} /></li>
                <li>Unrealized holding gains resulting from the change in value of current assets, and the natural increases in herds and agricultural/forest products. <P n={2} /></li>
                <li>Realized or unrealized gains resulting from changes in foreign exchange rates and adjustments arising on the translation of foreign currency financial statements (governed under AS 11). <P n={2} /></li>
                <li>Realized or unrealized gains resulting from the discharge of an obligation at less than its carrying amount. <P n={2} /></li>
              </ul>
            </div>
          )}
        </div>

        {/* 3. Definition of Revenue */}
        <SH id="as9-definitions" num="III" title="Definition of Revenue" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p><strong>Revenue</strong> is the gross inflow of cash, receivables or other consideration arising in the course of the ordinary activities of an enterprise from: <P n={3} /></p>
          <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-gray-300 font-sans text-[15px]">
            <li>The sale of goods,</li>
            <li>The rendering of services, and</li>
            <li>The use by others of enterprise resources yielding interest, royalties and dividends.</li>
          </ul>
          <p>Revenue is measured by the gross amount charged to the customers. Inflows like GST, excise duty, or other sales taxes collected on behalf of the government are NOT revenue as they do not flow to the enterprise. Trade discounts and volume rebates are deducted from the gross inflows to arrive at revenue. <P n={3} /></p>
        </div>

        {/* 4. Agency Relationship */}
        <SH id="as9-agency" num="IV" title="Agency Relationships — Principal vs. Agent" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>In an agency relationship, the revenue of the agent is the <strong>amount of commission</strong> and NOT the gross inflow of cash, receivables or other consideration. <P n={3} /></p>
          <p>The distinction depends on whether the entity acts as a <strong>Principal</strong> (assuming risks and rewards of ownership) or as an <strong>Agent</strong> (arranging the sale for another party):</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 font-serif text-[14.5px]">
          <div className="p-5 border border-indigo-200 dark:border-indigo-900/30 bg-indigo-50/10 rounded-xl space-y-2">
            <h4 className="font-sans font-bold text-[12px] uppercase tracking-wider text-indigo-800 dark:text-indigo-400">Principal (Gross Revenue)</h4>
            <p className="leading-relaxed text-slate-800 dark:text-slate-200">
              The entity has primary responsibility for providing goods/services, carries inventory risk, and has price discretion. Revenue is recognized at the <strong>gross amount</strong> billed to the customer. <P n={3} />
            </p>
          </div>
          <div className="p-5 border border-violet-200 dark:border-violet-900/30 bg-violet-50/10 rounded-xl space-y-2">
            <h4 className="font-sans font-bold text-[12px] uppercase tracking-wider text-violet-800 dark:text-violet-400">Agent (Net Revenue / Commission)</h4>
            <p className="leading-relaxed text-slate-800 dark:text-slate-200">
              The entity acts to facilitate sales for a third party and does not assume primary inventory or price risks. Revenue is restricted to the <strong>net commission/fee</strong> earned. <P n={3} />
            </p>
          </div>
        </div>

        {/* 5. Revenue from Sale of Goods */}
        <SH id="as9-goods" num="V" title="Revenue from Sale of Goods — Rules & Exceptions" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>A key criterion for recognizing revenue from the sale of goods is that the seller has <strong>transferred the significant risks and rewards of ownership</strong> to the buyer, and retains no effective ownership control. <P n={4} /></p>
        </div>
        <div className="border border-indigo-250 dark:border-indigo-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('goodsExceptions')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Special Delivery Cases &amp; Revenue Timing (Appendix A) <P n={8} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.goodsExceptions ? 'rotate-180' : '')} />
          </div>
          {openAccordions.goodsExceptions && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed">
              <p><strong>1. Delivery Delayed at Buyer's Request:</strong> If the buyer requests delay in delivery, and accepts billing and title, revenue is recognized immediately provided the item is complete, segregated, and ready for shipment. <P n={8} /></p>
              <p><strong>2. Delivered Subject to Installation/Inspection:</strong> Revenue is deferred until installation and inspection are complete, unless the process is simple plug-and-play. <P n={8} /></p>
              <p><strong>3. Sale on Approval Basis:</strong> Revenue is recognized when the buyer formally accepts, performs an adopting act (e.g. resells), or the time limit for rejection has expired. <P n={9} /></p>
              <p><strong>4. Consignment Sales:</strong> Revenue is recognized only when the consignment agent sells the goods to a third party. <P n={9} /></p>
              <p><strong>5. Installment Sales:</strong> Revenue (excluding interest) is recognized on the date of sale, while interest is recognized as it accrues over time. <P n={9} /></p>
            </div>
          )}
        </div>

        {/* 6. Revenue from Services */}
        <SH id="as9-services" num="VI" title="Revenue from Rendering of Services" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>Revenue from service contracts is recognized as the service is performed. The standard permits two methods for recognition: <P n={5} /></p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 font-serif">
          <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/40 dark:bg-slate-900/10 space-y-2">
            <h3 className="font-sans font-bold text-[15px] text-slate-900 dark:text-white">Proportionate Completion Method</h3>
            <p className="text-[14px] leading-relaxed">Revenue is recognized proportionately under the contract based on the stage of completion of each performance act. Used when services consist of execution of more than one act. <P n={5} /></p>
          </div>
          <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/40 dark:bg-slate-900/10 space-y-2">
            <h3 className="font-sans font-bold text-[15px] text-slate-900 dark:text-white">Completed Service Contract Method</h3>
            <p className="text-[14px] leading-relaxed">Revenue is recognized only when the single critical act is completed or the entire service contract is fulfilled. Used when the service consists of a single act or the last act is so critical that the contract is not complete until then. <P n={5} /></p>
          </div>
        </div>

        {/* 7. Interest, Royalties & Dividends */}
        <SH id="as9-resources" num="VII" title="Interest, Royalties & Dividends" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>Revenue arising from the use by others of enterprise resources yielding interest, royalties and dividends should be recognized when no significant uncertainty as to measurability or collectability exists: <P n={5} /></p>
        </div>
        <div className="mb-8 overflow-x-auto rounded-xl border border-indigo-250 dark:border-indigo-900/40 font-serif">
          <table className="w-full text-left border-collapse text-[13.5px]">
            <thead><tr className="font-sans text-[11.5px] font-bold uppercase tracking-wider text-white bg-indigo-700 dark:bg-indigo-800"><th className="py-3 px-5 w-1/4">Income Source</th><th className="py-3 px-5 w-3/4">Basis of Recognition under AS 9 (Para 13)</th></tr></thead>
            <tbody className="divide-y divide-indigo-100 dark:divide-indigo-900/30 text-slate-900 dark:text-slate-100">
              <tr className="bg-white dark:bg-[#111726]"><td className="py-4 px-5 font-semibold font-sans text-xs uppercase tracking-wider">Interest</td><td className="py-4 px-5 leading-relaxed">Recognized on a <strong>time proportion basis</strong> taking into account the amount outstanding and the rate applicable. <P n={5} /></td></tr>
              <tr className="bg-indigo-50/15 dark:bg-indigo-955/5"><td className="py-4 px-5 font-semibold font-sans text-xs uppercase tracking-wider">Royalties</td><td className="py-4 px-5 leading-relaxed">Recognized on an <strong>accrual basis</strong> in accordance with the terms of the relevant agreement (e.g., book sales, patent usage). <P n={5} /></td></tr>
              <tr className="bg-white dark:bg-[#111726]"><td className="py-4 px-5 font-semibold font-sans text-xs uppercase tracking-wider">Dividends</td><td className="py-4 px-5 leading-relaxed">Recognized when the owner's <strong>right to receive payment is established</strong> (typically when dividends are declared by the board / approved in AGM). <P n={5} /></td></tr>
            </tbody>
          </table>
        </div>

        {/* 8. Effect of Uncertainties */}
        <SH id="as9-uncertainties" num="VIII" title="Effect of Uncertainties on Revenue Recognition" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>AS 9 addresses two distinct types of collection uncertainties: <P n={5} /></p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 font-serif">
          <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/40 dark:bg-slate-900/10 space-y-2">
            <h3 className="font-sans font-bold text-[15px] text-slate-900 dark:text-white">1. Uncertainty at Time of Transaction</h3>
            <p className="text-[14px] leading-relaxed">If collection is not reasonably assured at the time of sale, revenue recognition must be <strong>postponed</strong>. Recognize only when the uncertainty is resolved. <P n={5} /></p>
            <div className="p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              <strong>Example:</strong> Export sales in currency subject to sudden government remittance blocks → Defer revenue.
            </div>
          </div>
          <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/40 dark:bg-slate-900/10 space-y-2">
            <h3 className="font-sans font-bold text-[15px] text-slate-900 dark:text-white">2. Subsequent Uncertainty</h3>
            <p className="text-[14px] leading-relaxed">If uncertainty arises <em>after</em> revenue has been recognized, do NOT reverse the recognized sale. Instead, create a <strong>provision for bad debts</strong> or write it off. <P n={5} /></p>
            <div className="p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              <strong>Example:</strong> Customer goes bankrupt 3 months after sale → Debit bad debts, do not reverse sales.
            </div>
          </div>
        </div>

        {/* 9. Disclosures */}
        <SH id="as9-disclosures" num="IX" title="Disclosure Requirements under AS 9" />
        <div className="mb-6 rounded-xl border border-indigo-200 dark:border-indigo-900/40 overflow-hidden font-serif">
          <div className="bg-indigo-700 px-5 py-3 flex items-center gap-2"><Check size={14} className="text-white stroke-[3]" /><span className="text-[11.5px] font-sans font-bold uppercase tracking-wider text-white">AS 9 Mandatory Disclosures <P n={6} /></span></div>
          <div className="divide-y divide-indigo-100 dark:divide-indigo-900/30">
            {[
              { title: 'Revenue Category Totals', detail: 'The circumstances in which revenue recognition has been postponed pending the resolution of significant uncertainties.' },
              { title: 'Postponed Revenue Disclosures', detail: 'If revenue recognition was postponed due to significant collection uncertainties, the company must disclose the nature of the uncertainty and the amount of revenue postponed.' }
            ].map((item, i) => (
              <div key={i} className={'flex gap-4 items-start px-5 py-4 ' + (i % 2 === 0 ? 'bg-white dark:bg-[#111726]' : 'bg-indigo-50/15 dark:bg-indigo-955/10')}>
                <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-700 dark:text-indigo-300 shrink-0 mt-0.5"><Check size={13} className="stroke-[3]" /></div>
                <div><h4 className="font-sans font-bold text-[14px] text-slate-950 dark:text-white mb-1">{item.title}</h4><p className="text-[13.5px] leading-relaxed text-slate-800 dark:text-slate-200">{item.detail}</p></div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Reference Table */}
        <div className="mt-10 mb-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 font-serif">
          <div className="bg-slate-700 px-5 py-3"><span className="text-[11.5px] font-sans font-bold uppercase tracking-wider text-white">Quick Reference — AS 9 Revenue Timing Summary</span></div>
          <table className="w-full text-left border-collapse text-[13px]">
            <thead><tr className="bg-slate-100 dark:bg-slate-900 font-sans text-[11px] uppercase tracking-wider font-bold text-slate-700 dark:text-slate-300"><th className="py-3 px-5 w-2/5">Transaction Type</th><th className="py-3 px-5 text-center">Revenue Timing</th><th className="py-3 px-5 text-center">Reference Criteria / Reason</th></tr></thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-900 dark:text-slate-100">
              {[
                ['Standard Sale of Goods','On shipment / delivery','Transfer of risks & rewards complete'],
                ['Complex Machine Installation','Upon successful installation','Substantial performance critical to contract'],
                ['Consignment Shipment to Agent','Only when agent resells to third party','Agent does not assume ownership risk'],
                ['Customized Asset Delay (Bill-and-Hold)','Upon completion & customer request','Title passes, customer requests storage hold'],
                ['Royalties on Book Sales','On accrual basis','In accordance with agreement terms'],
                ['Dividends on Shareholdings','When right to receive is established','Declaration date / AGM approval date'],
                ['Interest on Deposits','On time proportion basis','Accrued daily based on interest rate'],
                ['Uncertain collections at transaction date','Postponed/Deferred','Measurability & collection not assured'],
              ].map(([item, op, desc], i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-[#111726]' : 'bg-slate-50/30 dark:bg-slate-800/10'}>
                  <td className="py-2.5 px-5 text-slate-700 dark:text-slate-300">{item}</td>
                  <td className="py-2.5 px-5 text-center font-bold text-indigo-650 dark:text-indigo-400">{op}</td>
                  <td className="py-2.5 px-5 text-slate-600 dark:text-slate-400">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

const as10Sections = [
  { id: 'as10-overview',      title: '1. Overview & Purpose' },
  { id: 'as10-scope',         title: '2. Scope & Exclusions' },
  { id: 'as10-definitions',   title: '3. Definitions & Bearer Plants' },
  { id: 'as10-recognition',   title: '4. Recognition Criteria' },
  { id: 'as10-cost-comp',     title: '5. Components of Cost' },
  { id: 'as10-special-costs', title: '6. Self-Constructed & Asset Exchanges' },
  { id: 'as10-subsequent',    title: '7. Subsequent Costs & Inspections' },
  { id: 'as10-models',        title: '8. Cost vs Revaluation Models' },
  { id: 'as10-depreciation',  title: '9. Depreciation & Componentization' },
  { id: 'as10-derecognition', title: '10. Derecognition & Retirements' },
  { id: 'as10-disclosure',    title: '11. Disclosure Requirements' },
]

interface AS10StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences: (text: string) => React.ReactNode;
}

function AS10StandardTabContent({ navigateToPdfPage }: AS10StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as10-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    scope: true,
    definitions: true,
    costs: true,
    revaluation: false,
    depreciation: true
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as10-standard-sticky-toc')
    if (container && target) {
      const containerRect = container.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      let offset = 58
      if (stickyToc) { const tocRect = stickyToc.getBoundingClientRect(); offset = tocRect.bottom - containerRect.top }
      container.scrollTo({ top: targetRect.top - containerRect.top + container.scrollTop - offset - 12, behavior: 'auto' })
    }
  }

  useEffect(() => {
    if (!activeSection || !tocScrollRef.current) return
    const el = tocScrollRef.current
    const btn = el.querySelector('[data-sec-id="' + activeSection + '"]') as HTMLElement | null
    if (!btn) return
    if (as10Sections[0]?.id === activeSection) { el.scrollTo({ left: 0, behavior: 'smooth' }); return }
    const elRect = el.getBoundingClientRect(); const btnRect = btn.getBoundingClientRect()
    el.scrollTo({ left: btnRect.left - elRect.left + el.scrollLeft - elRect.width / 2 + btnRect.width / 2, behavior: 'smooth' })
  }, [activeSection])

  useEffect(() => {
    let obs: IntersectionObserver | undefined
    const init = () => {
      const sc = document.getElementById('as1-scroll-container')
      if (!sc) { setTimeout(init, 50); return }
      obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }), { root: sc, rootMargin: '-90px 0px -65% 0px', threshold: 0 })
      as10Sections.forEach(s => { const el = document.getElementById(s.id); if (el) obs?.observe(el) })
    }
    init(); return () => obs?.disconnect()
  }, [])

  useEffect(() => {
    const el = tocScrollRef.current; if (!el) return
    const onWheel = (e: WheelEvent) => { if (e.deltaY === 0) return; e.preventDefault(); el.scrollLeft += e.deltaY }
    el.addEventListener('wheel', onWheel, { passive: false }); return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const P = ({ n }: { n: number }) => (
    <button onClick={() => navigateToPdfPage(n)}
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-955/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={'Open AS 10 PDF page ' + n}><FileText size={9} className="shrink-0" /> p.{n}</button>
  )

  const SH = ({ id, num, title }: { id: string; num: string; title: string }) => (
    <div id={id} className="scroll-mt-36 mb-6 mt-14 first:mt-0 pb-4 border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <span className="font-mono font-extrabold text-[13px] text-blue-600 dark:text-blue-400 select-none">{num}.</span>
        <h2 className="text-[20px] sm:text-[22px] font-bold text-slate-900 dark:text-white tracking-tight">{title}</h2>
      </div>
      <div className="h-[2px] w-16 rounded-full bg-blue-500 mt-2 ml-8" />
    </div>
  )

  const NB = ({ type, title, children }: { type: string; title?: string; children: React.ReactNode }) => {
    const s: Record<string, string> = {
      info:    'bg-blue-50/80 dark:bg-blue-955/20 border-blue-300 dark:border-blue-805 text-blue-900 dark:text-blue-200 border-l-blue-500',
      warning: 'bg-amber-50/80 dark:bg-amber-955/20 border-amber-300 dark:border-amber-805 text-amber-900 dark:text-amber-202 border-l-amber-500',
      success: 'bg-emerald-50/80 dark:bg-emerald-955/20 border-emerald-300 dark:border-emerald-805 text-emerald-900 dark:text-emerald-202 border-l-emerald-500',
      exam:    'bg-rose-50/80 dark:bg-rose-955/20 border-rose-300 dark:border-rose-805 text-rose-900 dark:text-rose-200 border-l-rose-500',
    }
    return (
      <div className={'rounded-xl border border-l-4 p-5 my-5 ' + (s[type] || s['info'])}>
        {title && <p className="font-extrabold uppercase tracking-wider text-[10.5px] mb-2 opacity-75">{title}</p>}
        <div className="text-[14.5px] leading-relaxed">{children}</div>
      </div>
    )
  }

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      <div id="as10-standard-sticky-toc" ref={tocScrollRef} className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1"><BookOpen size={9.5} />AS 10:</span>
        {as10Sections.map(sec => (
          <button key={sec.id} data-sec-id={sec.id} onClick={() => handleSectionClick(sec.id)}
            className={'text-[9.5px] font-bold px-2 py-0.5 rounded border transition-all whitespace-nowrap cursor-pointer ' + (activeSection === sec.id ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#1E2640] dark:hover:bg-slate-800 border-slate-200 dark:border-gray-700 text-slate-600 dark:text-gray-300')}>
            {sec.title.split('. ').slice(1).join('. ') || sec.title}
          </button>
        ))}
      </div>

      <div className="w-full bg-white dark:bg-[#111726] border border-slate-200 dark:border-gray-800 rounded-xl px-6 sm:px-10 lg:px-14 py-10 sm:py-14 shadow-xs space-y-0">

        {/* 1. Overview */}
        <SH id="as10-overview" num="I" title="Overview & Purpose of AS 10 (Revised)" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p><strong>Accounting Standard 10 (Revised 2016) — Property, Plant and Equipment (PPE)</strong> prescribes the accounting treatment for property, plant, and equipment so that users of financial statements can discern information about an enterprise's investment in its PPE and the changes in such investment. <P n={7} /></p>
          <p>The principal issues in accounting for PPE are the timing of recognition of the assets, the determination of their carrying amounts, and the depreciation charges and impairment losses to be recognized in relation to them.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8 font-serif">
          {[
            { color: 'blue', title: 'Asset Recognition', body: 'Defines the exact criteria when an expenditure on tangible items can be capitalized as Property, Plant and Equipment.', p: 8 },
            { color: 'indigo', title: 'Cost Measurement', body: 'Establishes initial measurement rules, including direct purchase costs, employee benefits, site restoration, and exchange of assets.', p: 9 },
            { color: 'violet', title: 'Depreciation & Models', body: 'Prescribes the cost model vs revaluation model and mandates component-level depreciation based on useful life.', p: 17 }
          ].map((c, i) => (
            <div key={i} className={'p-5 border-t-2 border-' + c.color + '-500 border border-' + c.color + '-200 dark:border-' + c.color + '-900/40 bg-' + c.color + '-50/20 dark:bg-' + c.color + '-950/5 rounded-xl'}>
              <h4 className={'font-sans font-bold text-[12px] uppercase tracking-wider text-' + c.color + '-800 dark:text-' + c.color + '-400 mb-2'}>{c.title}</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">{c.body} <P n={c.p} /></p>
            </div>
          ))}
        </div>

        {/* 2. Scope & Exclusions */}
        <SH id="as10-scope" num="II" title="Scope & Exclusions from PPE" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>AS 10 (Revised) should be applied in accounting for property, plant and equipment, except when another Accounting Standard requires or permits a different accounting treatment. <P n={7} /></p>
        </div>
        <div className="border border-blue-200 dark:border-blue-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('scope')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Scope Inclusions and Exclusions <P n={7} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.scope ? 'rotate-180' : '')} />
          </div>
          {openAccordions.scope && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed">
              <p><strong>This Standard DOES NOT apply to:</strong></p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li><strong>Biological Assets:</strong> Biological assets related to agricultural activity (wasting timber, livestock) other than <strong>Bearer Plants</strong>. This Standard does apply to bearer plants. <P n={7} /></li>
                <li><strong>Wasting Assets:</strong> Mineral rights and exploration/extraction of minerals, oil, natural gas and similar non-regenerative resources. <P n={7} /></li>
              </ul>
              <p className="font-bold text-emerald-600 dark:text-emerald-450 mt-2">Special Inclusion: Investment Property</p>
              <p>An enterprise must apply AS 10 (Revised) to its investment properties. The Standard requires the cost model to be applied to all investment properties. <P n={7} /></p>
            </div>
          )}
        </div>

        {/* 3. Definitions */}
        <SH id="as10-definitions" num="III" title="Definitions & Bearer Plants" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p><strong>Property, Plant and Equipment (PPE):</strong> Tangible items that: <P n={8} /></p>
          <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-gray-300 font-sans text-[15px]">
            <li>Are held for use in the production or supply of goods or services, for rental to others, or for administrative purposes; and</li>
            <li>Are expected to be used during more than a period of twelve months.</li>
          </ul>
        </div>
        <div className="border border-indigo-200 dark:border-indigo-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('definitions')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Concept of Bearer Plant — Definition &amp; Criteria <P n={8} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.definitions ? 'rotate-180' : '')} />
          </div>
          {openAccordions.definitions && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed">
              <p>A <strong>Bearer Plant</strong> is a living plant that: <P n={8} /></p>
              <ol className="list-decimal pl-6 space-y-1.5">
                <li>Is used in the production or supply of agricultural produce;</li>
                <li>Is expected to bear produce for more than twelve months; and</li>
                <li>Has a remote likelihood of being sold as agricultural produce, except for incidental scrap sales.</li>
              </ol>
              <p className="font-bold text-rose-600 dark:text-rose-400 mt-2">What is NOT a Bearer Plant (wasting assets, excluded from AS 10):</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Plants cultivated to be harvested as agricultural produce (e.g. trees grown for use as lumber).</li>
                <li>Plants cultivated to produce agricultural produce when there is more than a remote likelihood that the enterprise will also harvest and sell the plant as agricultural produce (e.g. trees grown for both their fruit and their lumber).</li>
                <li>Annual crops (e.g. maize, wheat, paddy). <P n={8} /></li>
              </ul>
            </div>
          )}
        </div>

        {/* 4. Recognition Criteria */}
        <SH id="as10-recognition" num="IV" title="PPE Recognition Criteria" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>Under <strong>Paragraph 9</strong>, the cost of an item of property, plant and equipment should be recognized as an asset if, and only if: <P n={8} /></p>
          <ol className="list-decimal pl-6 space-y-1.5 text-[15px] font-sans text-slate-700 dark:text-gray-300">
            <li>It is <strong>probable</strong> that future economic benefits associated with the item will flow to the enterprise; and</li>
            <li>The cost of the item can be <strong>measured reliably</strong>.</li>
          </ol>
          <p>This recognition principle applies to all costs of PPE at the time they are incurred, including initial costs to acquire or construct, and subsequent costs to add to, replace part of, or service it. <P n={9} /></p>
        </div>
        <NB type="info" title="Safety & Environmental Equipment Recognition (Para 13)">
          Acquiring safety or environmental equipment, although not directly increasing future economic benefits of any particular existing asset, may be necessary for the enterprise to obtain future economic benefits from its other assets. Such items qualify for recognition as PPE. <P n={9} />
        </NB>

        {/* 5. Components of Cost */}
        <SH id="as10-cost-comp" num="V" title="Components of Cost" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>The cost of an item of property, plant and equipment comprises: <P n={9} /></p>
        </div>
        <div className="border border-violet-200 dark:border-violet-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('costs')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Detailed Inclusions and Exclusions in Cost <P n={9} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.costs ? 'rotate-180' : '')} />
          </div>
          {openAccordions.costs && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed">
              <p><strong>1. Purchase Price:</strong> Includes import duties and non-refundable purchase taxes, after deducting trade discounts and rebates. <P n={9} /></p>
              <p><strong>2. Directly Attributable Costs:</strong> Costs of bringing the asset to the location and condition necessary for it to be capable of operating in the manner intended by management: <P n={10} /></p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Costs of employee benefits arising directly from the construction or acquisition of the item.</li>
                <li>Costs of site preparation.</li>
                <li>Initial delivery and handling costs.</li>
                <li>Installation and assembly costs.</li>
                <li>Costs of testing whether the asset is functioning properly, <strong>net of proceeds</strong> from selling any items produced while bringing the asset to that location and condition (e.g. samples produced during testing).</li>
                <li>Professional fees (e.g. architects, engineers).</li>
              </ul>
              <p><strong>3. Decommissioning &amp; Restoration:</strong> The initial estimate of the costs of dismantling and removing the item and restoring the site on which it is located. <P n={10} /></p>
              <p className="font-bold text-rose-600 dark:text-rose-450 mt-2">Explicit Cost Exclusions (must be expensed immediately):</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Costs of opening a new facility.</li>
                <li>Costs of introducing a new product or service (including advertising and promotional activities).</li>
                <li>Costs of conducting business in a new location or with a new class of customer (including staff training costs).</li>
                <li>Administration and other general overheads.</li>
                <li>Costs incurred while an item capable of operating as intended is yet to be brought into use or is operated at less than full capacity. <P n={11} /></li>
              </ul>
            </div>
          )}
        </div>

        {/* 6. Self-Constructed & Asset Exchanges */}
        <SH id="as10-special-costs" num="VI" title="Self-Constructed Assets &amp; Asset Exchanges" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p><strong>Self-Constructed Assets (Para 23):</strong> The cost of a self-constructed asset is determined using the same principles as for an acquired asset. If an enterprise makes similar assets for sale in the normal course of business, the cost of the asset is usually the same as the cost of producing an asset for sale (see AS 2). Any internal profits must be eliminated. Abnormal costs of wasted material, labour, or other resources are excluded. <P n={11} /></p>
          <p><strong>Exchange of Assets (Para 24):</strong> When an item of PPE is acquired in exchange for a non-monetary asset or assets, or a combination of monetary and non-monetary assets, the cost of the acquired asset is measured at <strong>fair value</strong> unless:</p>
          <ol className="list-decimal pl-6 space-y-1 text-[15px] font-sans text-slate-700 dark:text-gray-300">
            <li>The exchange transaction lacks <strong>commercial substance</strong>; or</li>
            <li>The fair value of neither the asset received nor the asset given up is reliably measurable. <P n={12} /></li>
          </ol>
          <p>If the acquired item is not measured at fair value, its cost is measured at the carrying amount of the asset given up. <P n={12} /></p>
        </div>

        {/* 7. Subsequent Costs */}
        <SH id="as10-subsequent" num="VII" title="Subsequent Costs &amp; Major Inspections" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>Under the general recognition principle, an enterprise does not recognize in the carrying amount of an item of PPE the costs of the day-to-day servicing of the item (e.g. repairs and maintenance). These are expensed in the Statement of Profit and Loss as incurred. <P n={12} /></p>
          <p><strong>Subsequent Replacements (Para 29):</strong> Parts of some items of PPE may require replacement at regular intervals (e.g. replacing the lining of a furnace, or aircraft seats). The enterprise capitalizes the replacement cost if it meets the Paragraph 9 criteria, and derecognizes the carrying amount of the replaced parts. <P n={12} /></p>
          <p><strong>Major Inspections (Para 30):</strong> A condition of continuing to operate a major item of PPE (e.g. an aircraft) may be performing regular major inspections for faults. When each major inspection is performed, its cost is recognized in the carrying amount of the item of PPE as a replacement if the recognition criteria are satisfied. Any remaining carrying amount of the cost of the previous inspection is derecognized. <P n={13} /></p>
        </div>

        {/* 8. Cost vs Revaluation Models */}
        <SH id="as10-models" num="VIII" title="Accounting Models — Cost vs. Revaluation Model" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>An enterprise should choose either the <strong>Cost Model</strong> or the <strong>Revaluation Model</strong> as its accounting policy and should apply that policy to an entire class of property, plant and equipment. <P n={14} /></p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 font-serif">
          <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/40 dark:bg-slate-900/10 space-y-2">
            <h3 className="font-sans font-bold text-[15px] text-slate-900 dark:text-white">Cost Model</h3>
            <p className="text-[14px] leading-relaxed">After recognition as an asset, an item of PPE should be carried at its cost less any accumulated depreciation and any accumulated impairment losses. <P n={14} /></p>
          </div>
          <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/40 dark:bg-slate-900/10 space-y-2">
            <h3 className="font-sans font-bold text-[15px] text-slate-900 dark:text-white">Revaluation Model</h3>
            <p className="text-[14px] leading-relaxed">After recognition as an asset, an item of PPE whose fair value can be measured reliably should be carried at a revalued amount, being its fair value at the date of the revaluation less any subsequent accumulated depreciation and subsequent accumulated impairment losses. <P n={14} /></p>
          </div>
        </div>
        <NB type="warning" title="Revaluation Surplus/Deficit Treatment (Para 42–43)">
          * **Increase in value:** Credited directly to owners' interest under the heading of revaluation surplus (equity). However, the increase should be recognized in the P&amp;L to the extent that it reverses a revaluation decrease of the same asset previously recognized in the P&amp;L. <P n={15} />
          * **Decrease in value:** Recognized in the Statement of Profit and Loss. However, the decrease should be debited directly to the revaluation surplus of the same asset to the extent of any credit balance existing in the revaluation surplus in respect of that asset. <P n={15} />
        </NB>

        {/* 9. Depreciation & Componentization */}
        <SH id="as10-depreciation" num="IX" title="Depreciation &amp; Componentization" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p><strong>Component Depreciation (Para 47):</strong> Each part of an item of property, plant and equipment with a cost that is significant in relation to the total cost of the item should be depreciated separately. <P n={17} /></p>
          <p><strong>Depreciation Charge:</strong> The depreciation charge for each period should be recognized in the Statement of Profit and Loss unless it is included in the carrying amount of another asset. <P n={17} /></p>
          <p><strong>Review of Residual Value &amp; Useful Life (Para 56):</strong> The residual value and the useful life of an asset should be reviewed at least at each financial year-end and, if expectations differ from previous estimates, the change(s) should be accounted for as a <strong>change in an accounting estimate</strong> (prospectively as per AS 5). <P n={18} /></p>
          <p><strong>Depreciation Method Review (Para 67):</strong> The depreciation method applied to an asset should be reviewed at least at each financial year-end. If there has been a significant change in the expected pattern of consumption of the future economic benefits, the method should be changed to reflect the new pattern. The change should be accounted for as a <strong>change in an accounting estimate</strong> (prospective). <P n={20} /></p>
        </div>

        {/* 10. Derecognition & Retirements */}
        <SH id="as10-derecognition" num="X" title="Derecognition &amp; Retirements" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>The carrying amount of an item of property, plant and equipment should be derecognized: <P n={20} /></p>
          <ol className="list-decimal pl-6 space-y-1.5 text-[15px] font-sans text-slate-700 dark:text-gray-300">
            <li>On disposal; or</li>
            <li>When no future economic benefits are expected from its use or disposal.</li>
          </ol>
          <p>The gain or loss arising from the derecognition of an item of PPE (calculated as the difference between the net disposal proceeds, if any, and the carrying amount of the item) should be included in the Statement of Profit and Loss when the item is derecognized. Gains should not be classified as revenue. <P n={20} /></p>
        </div>

        {/* 11. Disclosure Requirements */}
        <SH id="as10-disclosure" num="XI" title="Disclosure Requirements under AS 10" />
        <div className="mb-6 rounded-xl border border-indigo-200 dark:border-indigo-900/40 overflow-hidden font-serif">
          <div className="bg-indigo-700 px-5 py-3 flex items-center gap-2"><Check size={14} className="text-white stroke-[3]" /><span className="text-[11.5px] font-sans font-bold uppercase tracking-wider text-white">AS 10 Mandatory Disclosures <P n={21} /></span></div>
          <div className="divide-y divide-indigo-100 dark:divide-indigo-900/30">
            {[
              { title: 'Measurement Bases & Depreciation Methods', detail: 'The measurement bases used for determining the gross carrying amount; the depreciation methods used; and the useful lives or the depreciation rates used.' },
              { title: 'Gross Carrying Amount & Accumulated Dep.', detail: 'The gross carrying amount and the accumulated depreciation (aggregated with accumulated impairment losses) at the beginning and end of the period.' },
              { title: 'Reconciliation Statement', detail: 'A reconciliation of the carrying amount at the beginning and end of the period showing additions, assets classified as held for sale, disposals, acquisitions through business combinations, increases or decreases resulting from revaluations, impairment losses, and depreciation.' },
              { title: 'Revaluation Details', detail: 'When items of PPE are stated at revalued amounts: the effective date of the revaluation; whether an independent valuer was involved; the methods and significant assumptions applied; and the revaluation surplus, indicating the movement for the period.' }
            ].map((item, i) => (
              <div key={i} className={'flex gap-4 items-start px-5 py-4 ' + (i % 2 === 0 ? 'bg-white dark:bg-[#111726]' : 'bg-indigo-50/15 dark:bg-indigo-950/5')}>
                <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-700 dark:text-indigo-300 shrink-0 mt-0.5"><Check size={13} className="stroke-[3]" /></div>
                <div><h4 className="font-sans font-bold text-[14px] text-slate-950 dark:text-white mb-1">{item.title}</h4><p className="text-[13.5px] leading-relaxed text-slate-800 dark:text-slate-200">{item.detail}</p></div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Reference Table */}
        <div className="mt-10 mb-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 font-serif">
          <div className="bg-slate-700 px-5 py-3"><span className="text-[11.5px] font-sans font-bold uppercase tracking-wider text-white">Quick Reference — AS 10 Capitalization Decisions</span></div>
          <table className="w-full text-left border-collapse text-[13px]">
            <thead><tr className="bg-slate-100 dark:bg-slate-900 font-sans text-[11px] uppercase tracking-wider font-bold text-slate-700 dark:text-slate-300"><th className="py-3 px-5 w-2/5">Cost / Asset Transaction</th><th className="py-3 px-5 text-center">Capitalize?</th><th className="py-3 px-5 text-center">Standard Treatment / Rationale</th></tr></thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-900 dark:text-slate-100">
              {[
                ['Import duties on purchase of factory machinery','✓ Yes','Directly attributable cost (Para 14(a))'],
                ['Staff training costs to operate new machine','✗ No','Explicitly excluded (Para 17(c)) — expense to P&L'],
                ['Pre-operative administration costs','✗ No','General overheads — expense to P&L'],
                ['Bearer plant (e.g. apple orchards)','✓ Yes','Bearer plants are included in the scope of AS 10'],
                ['Annual paddy crop','✗ No','Agricultural biological asset — excluded from AS 10'],
                ['Abnormal waste of materials during construction','✗ No','Abnormal losses cannot be capitalized (Para 23)'],
                ['Decommissioning & restoration cost estimate','✓ Yes','Include in initial cost with matching provision'],
                ['Initial testing costs (net of test-run sales)','✓ Yes','Directly attributable testing cost (Para 14(b))'],
              ].map(([item, op, desc], i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-[#111726]' : 'bg-slate-50/30 dark:bg-slate-800/10'}>
                  <td className="py-2.5 px-5 text-slate-700 dark:text-slate-300">{item}</td>
                  <td className={'py-2.5 px-5 text-center font-bold ' + (op === '✓ Yes' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')}>{op}</td>
                  <td className="py-2.5 px-5 text-slate-600 dark:text-slate-400">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}


const as11Sections = [
  { id: 'as11-overview',          title: '1. Overview & Purpose' },
  { id: 'as11-scope',             title: '2. Scope & Applicability' },
  { id: 'as11-definitions',       title: '3. Definitions' },
  { id: 'as11-monetary',          title: '4. Monetary vs Non-Monetary' },
  { id: 'as11-initial',           title: '5. Initial Recognition' },
  { id: 'as11-subsequent',        title: '6. Subsequent Translation & BS Date' },
  { id: 'as11-foreign-ops',       title: '7. Integral vs Non-Integral Ops' },
  { id: 'as11-forward',           title: '8. Forward Exchange Contracts' },
  { id: 'as11-disclosure',        title: '9. Disclosure Requirements' },
]

interface AS11StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
}

function AS11StandardTabContent({ navigateToPdfPage }: AS11StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as11-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    monetary: true,
    translation: true,
    foreignOps: true,
    forward: true
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as11-standard-sticky-toc')
    if (container && target) {
      const containerRect = container.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      let offset = 58
      if (stickyToc) { const tocRect = stickyToc.getBoundingClientRect(); offset = tocRect.bottom - containerRect.top }
      container.scrollTo({ top: targetRect.top - containerRect.top + container.scrollTop - offset - 12, behavior: 'auto' })
    }
  }

  useEffect(() => {
    if (!activeSection || !tocScrollRef.current) return
    const el = tocScrollRef.current
    const btn = el.querySelector('[data-sec-id="' + activeSection + '"]') as HTMLElement | null
    if (!btn) return
    if (as11Sections[0]?.id === activeSection) { el.scrollTo({ left: 0, behavior: 'smooth' }); return }
    const elRect = el.getBoundingClientRect(); const btnRect = btn.getBoundingClientRect()
    el.scrollTo({ left: btnRect.left - elRect.left + el.scrollLeft - elRect.width / 2 + btnRect.width / 2, behavior: 'smooth' })
  }, [activeSection])

  useEffect(() => {
    let obs: IntersectionObserver | undefined
    const init = () => {
      const sc = document.getElementById('as1-scroll-container')
      if (!sc) { setTimeout(init, 50); return }
      obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }), { root: sc, rootMargin: '-90px 0px -65% 0px', threshold: 0 })
      as11Sections.forEach(s => { const el = document.getElementById(s.id); if (el) obs?.observe(el) })
    }
    init(); return () => obs?.disconnect()
  }, [])

  useEffect(() => {
    const el = tocScrollRef.current; if (!el) return
    const onWheel = (e: WheelEvent) => { if (e.deltaY === 0) return; e.preventDefault(); el.scrollLeft += e.deltaY }
    el.addEventListener('wheel', onWheel, { passive: false }); return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const P = ({ n }: { n: number }) => (
    <button onClick={() => navigateToPdfPage(n)}
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-955/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={'Open AS 11 PDF page ' + n}><FileText size={9} className="shrink-0" /> p.{n}</button>
  )

  const SH = ({ id, num, title }: { id: string; num: string; title: string }) => (
    <div id={id} className="scroll-mt-36 mb-6 mt-14 first:mt-0 pb-4 border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <span className="font-mono font-extrabold text-[13px] text-teal-600 dark:text-teal-400 select-none">{num}.</span>
        <h2 className="text-[20px] sm:text-[22px] font-bold text-slate-900 dark:text-white tracking-tight">{title}</h2>
      </div>
      <div className="h-[2px] w-16 rounded-full bg-teal-500 mt-2 ml-8" />
    </div>
  )

  const NB = ({ type, title, children }: { type: string; title?: string; children: React.ReactNode }) => {
    const s: Record<string, string> = {
      info:    'bg-blue-50/80 dark:bg-blue-955/20 border-blue-300 dark:border-blue-805 text-blue-900 dark:text-blue-200 border-l-blue-500',
      warning: 'bg-amber-50/80 dark:bg-amber-955/20 border-amber-300 dark:border-amber-805 text-amber-900 dark:text-amber-202 border-l-amber-500',
      success: 'bg-emerald-50/80 dark:bg-emerald-955/20 border-emerald-300 dark:border-emerald-805 text-emerald-900 dark:text-emerald-202 border-l-emerald-500',
      exam:    'bg-rose-50/80 dark:bg-rose-955/20 border-rose-300 dark:border-rose-805 text-rose-900 dark:text-rose-200 border-l-rose-500',
    }
    return (
      <div className={'rounded-xl border border-l-4 p-5 my-5 ' + (s[type] || s['info'])}>
        {title && <p className="font-extrabold uppercase tracking-wider text-[10.5px] mb-2 opacity-75">{title}</p>}
        <div className="text-[14.5px] leading-relaxed">{children}</div>
      </div>
    )
  }

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      <div id="as11-standard-sticky-toc" ref={tocScrollRef} className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1"><BookOpen size={9.5} />AS 11:</span>
        {as11Sections.map(sec => (
          <button key={sec.id} data-sec-id={sec.id} onClick={() => handleSectionClick(sec.id)}
            className={'text-[9.5px] font-bold px-2 py-0.5 rounded border transition-all whitespace-nowrap cursor-pointer ' + (activeSection === sec.id ? 'bg-teal-600 border-teal-600 text-white' : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#1E2640] dark:hover:bg-slate-800 border-slate-200 dark:border-gray-700 text-slate-600 dark:text-gray-300')}>
            {sec.title.split('. ').slice(1).join('. ') || sec.title}
          </button>
        ))}
      </div>

      <div className="w-full bg-white dark:bg-[#111726] border border-slate-200 dark:border-gray-800 rounded-xl px-6 sm:px-10 lg:px-14 py-10 sm:py-14 shadow-xs space-y-0">

        {/* 1. Overview */}
        <SH id="as11-overview" num="I" title="Overview & Purpose of AS 11" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p><strong>Accounting Standard 11 (AS 11) — The Effects of Changes in Foreign Exchange Rates</strong> prescribes how to include foreign currency transactions and foreign operations in the financial statements of an enterprise and how to translate financial statements into a reporting currency. <P n={1} /></p>
          <p>The principal issues are which exchange rate(s) to use and how to recognize in the financial statements the financial effect of changes in exchange rates (exchange differences).</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8 font-serif">
          {[
            { color: 'teal', title: 'Foreign Currency Txns', body: 'Mandates rules for recording import, export, borrowing, and lending activities denominated in foreign currencies.', p: 1 },
            { color: 'blue', title: 'Foreign Operations', body: 'Lays down translation rules for branches or subsidiaries abroad, dividing them into integral and non-integral operations.', p: 4 },
            { color: 'indigo', title: 'Forward Contracts', body: 'Governs accounting for forward exchange contracts, separating hedging of active liabilities from speculative contracts.', p: 6 }
          ].map((c, i) => (
            <div key={i} className={'p-5 border-t-2 border-' + c.color + '-500 border border-' + c.color + '-200 dark:border-' + c.color + '-900/40 bg-' + c.color + '-50/20 dark:bg-' + c.color + '-950/5 rounded-xl'}>
              <h4 className={'font-sans font-bold text-[12px] uppercase tracking-wider text-' + c.color + '-800 dark:text-' + c.color + '-400 mb-2'}>{c.title}</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">{c.body} <P n={c.p} /></p>
            </div>
          ))}
        </div>

        {/* 2. Scope */}
        <SH id="as11-scope" num="II" title="Scope & Applicability of AS 11" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>This Standard should be applied: <P n={1} /></p>
          <ol className="list-decimal pl-6 space-y-1.5 text-[15px] font-sans text-slate-700 dark:text-gray-300">
            <li>In accounting for transactions in foreign currencies; and</li>
            <li>In translating the financial statements of foreign operations.</li>
          </ol>
        </div>
        <NB type="warning" title="Exclusion of Restatement/Presentation Currencies">
          AS 11 does **not** specify the currency in which an enterprise presents its financial statements. It also does not deal with the presentation in a financial statement of cash flows arising from transactions in a foreign currency (governed by **AS 3**). <P n={1} />
        </NB>

        {/* 3. Definitions */}
        <SH id="as11-definitions" num="III" title="Definitions & Exchange Rates" />
        <div className="mb-8 overflow-x-auto rounded-xl border border-teal-250 dark:border-teal-900/40 font-serif">
          <table className="w-full text-left border-collapse text-[13.5px]">
            <thead><tr className="font-sans text-[11.5px] font-bold uppercase tracking-wider text-white bg-teal-700 dark:bg-teal-800"><th className="py-3 px-5 w-1/4">Term</th><th className="py-3 px-5 w-3/4">Standard Definition (Para 7)</th></tr></thead>
            <tbody className="divide-y divide-teal-100 dark:divide-teal-900/30 text-slate-900 dark:text-slate-100">
              <tr className="bg-white dark:bg-[#111726]"><td className="py-4 px-5 font-semibold">Closing Rate</td><td className="py-4 px-5">The exchange rate at the balance sheet date. <P n={2} /></td></tr>
              <tr className="bg-teal-50/15 dark:bg-teal-955/5"><td className="py-4 px-5 font-semibold">Foreign Operation</td><td className="py-4 px-5">A subsidiary, associate, joint venture or branch of the reporting enterprise, the activities of which are based or conducted in a country other than the country of the reporting enterprise. <P n={2} /></td></tr>
              <tr className="bg-white dark:bg-[#111726]"><td className="py-4 px-5 font-semibold">Exchange Difference</td><td className="py-4 px-5">The difference resulting from reporting the same number of units of a foreign currency in the reporting currency at different exchange rates. <P n={2} /></td></tr>
              <tr className="bg-teal-50/15 dark:bg-teal-955/5"><td className="py-4 px-5 font-semibold">Forward Rate</td><td className="py-4 px-5">The specified exchange rate for exchange of two currencies at a specified future date. <P n={2} /></td></tr>
            </tbody>
          </table>
        </div>

        {/* 4. Monetary vs Non-Monetary */}
        <SH id="as11-monetary" num="IV" title="Monetary vs. Non-Monetary Classification" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>AS 11 divides all balance sheet assets and liabilities into two categories. This classification is vital for subsequent translation rules: <P n={2} /></p>
        </div>
        <div className="border border-teal-200 dark:border-teal-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('monetary')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Classification Criteria &amp; Examples <P n={2} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.monetary ? 'rotate-180' : '')} />
          </div>
          {openAccordions.monetary && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed">
              <p><strong>1. Monetary Items:</strong> Money held and assets/liabilities to be received or paid in fixed or determinable amounts of money. <P n={2} /></p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Examples:</strong> Cash, bank balances, trade receivables (debtors), trade payables (creditors), loans payable, bills receivable, employee benefit provisions.</li>
              </ul>
              <p><strong>2. Non-Monetary Items:</strong> Assets and liabilities that are not monetary items; they represent claims or items that do not guarantee a fixed money inflow/outflow. <P n={2} /></p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Examples:</strong> Property, Plant and Equipment (PPE), inventories, investments in equity shares, prepaid expenses, share capital.</li>
              </ul>
            </div>
          )}
        </div>

        {/* 5. Initial Recognition */}
        <SH id="as11-initial" num="V" title="Initial Recognition of Foreign Currency Transactions" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>A foreign currency transaction is a transaction which is denominated in or requires settlement in a foreign currency. <P n={2} /></p>
          <p><strong>Initial Measurement (Para 9):</strong> A foreign currency transaction should be recorded, on initial recognition in the reporting currency, by applying to the foreign currency amount the <strong>exchange rate at the date of the transaction</strong> between the reporting currency and the foreign currency. <P n={3} /></p>
        </div>
        <NB type="info" title="Use of Approximations / Average Rates (Para 10)">
          For practical reasons, a rate that approximates the actual rate at the date of the transaction is often used (e.g. an average rate for a week or a month for all transactions in each foreign currency occurring during that period). However, if exchange rates fluctuate significantly, the use of the average rate for a period is unreliable. <P n={3} />
        </NB>

        {/* 6. Subsequent Translation */}
        <SH id="as11-subsequent" num="VI" title="Subsequent Translation (at Balance Sheet Date)" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>At each balance sheet date: <P n={3} /></p>
        </div>
        <div className="border border-teal-250 dark:border-teal-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('translation')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Rules for BS Translation &amp; Gain/Loss Treatment <P n={3} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.translation ? 'rotate-180' : '')} />
          </div>
          {openAccordions.translation && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed">
              <p><strong>(a) Monetary Items:</strong> Foreign currency monetary items should be reported using the <strong>closing rate</strong>. Any exchange differences arising on settlement or reporting at closing rates should be recognized as <strong>income or expense in the Statement of P&amp;L</strong> of the period. <P n={3} /></p>
              <p><strong>(b) Non-Monetary Items (Historical Cost):</strong> Non-monetary items which are carried in terms of historical cost denominated in a foreign currency should be reported using the <strong>exchange rate at the date of the transaction</strong>. (No exchange difference arises). <P n={3} /></p>
              <p><strong>(c) Non-Monetary Items (Fair Value):</strong> Non-monetary items which are carried at fair value or other similar valuation denominated in a foreign currency should be reported using the <strong>exchange rate that existed when the values were determined</strong> (e.g. date of valuation). <P n={3} /></p>
            </div>
          )}
        </div>

        {/* 7. Foreign Operations */}
        <SH id="as11-foreign-ops" num="VII" title="Foreign Operations — Integral vs. Non-Integral" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>For translation purposes, the financial statements of a foreign operation are classified based on the way they are financed and operate in relation to the reporting enterprise: <P n={4} /></p>
        </div>
        <div className="border border-teal-200 dark:border-teal-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('foreignOps')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Integral vs. Non-Integral Operation Comparison <P n={4} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.foreignOps ? 'rotate-180' : '')} />
          </div>
          {openAccordions.foreignOps && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed">
              <p><strong>1. Integral Foreign Operation:</strong> Carries on its business as if it were an extension of the reporting enterprise's operations (e.g. foreign sales branch that sells goods imported from head office and remits money back). <P n={4} /></p>
              <ul className="list-disc pl-6 mb-2">
                <li><strong>Translation:</strong> Individual items translated as if they were transactions of the reporting enterprise itself (monetary at closing rate, non-monetary at historical rate).</li>
                <li><strong>Exchange Difference:</strong> Debited or credited directly to the **Statement of Profit and Loss** of the period. <P n={4} /></li>
              </ul>
              <p><strong>2. Non-Integral Foreign Operation:</strong> Accumulates cash and other monetary items, incurs expenses, generates income and arranges borrowings, all substantially in its local currency (e.g. standalone foreign subsidiary with local manufacturing and sales). <P n={4} /></p>
              <ul className="list-disc pl-6">
                <li><strong>Translation:</strong> Assets and liabilities (both monetary and non-monetary) translated at the <strong>closing rate</strong>; income and expense items translated at exchange rates on the dates of transactions (or average rates).</li>
                <li><strong>Exchange Difference:</strong> Accumulated in a **Foreign Currency Translation Reserve (FCTR)** in the balance sheet until the disposal of the net investment. <P n={5} /></li>
              </ul>
            </div>
          )}
        </div>

        {/* 8. Forward Exchange Contracts */}
        <SH id="as11-forward" num="VIII" title="Forward Exchange Contracts" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>AS 11 classifies forward exchange contracts into two categories depending on the purpose of the contract: <P n={6} /></p>
        </div>
        <div className="border border-teal-250 dark:border-teal-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('forward')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Hedge Contracts vs. Speculative Contracts <P n={6} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.forward ? 'rotate-180' : '')} />
          </div>
          {openAccordions.forward && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed font-sans">
              <p><strong>1. Hedges (Not Speculative):</strong> Entered into to establish the amount of reporting currency required/available for a foreign currency transaction. <P n={6} /></p>
              <ul className="list-disc pl-6 mb-2">
                <li><strong>Premium or Discount:</strong> (Difference between the spot rate and the forward rate at the inception of the contract) should be amortized as expense or income over the **life of the contract**.</li>
                <li><strong>Exchange Difference:</strong> (Difference between closing rate / settlement rate and the rate at which it was last reported) recognized in the **Statement of Profit and Loss**.</li>
              </ul>
              <p><strong>2. Speculative Contracts (Trading/Arbitrage):</strong> Entered into to profit from exchange rate movements. <P n={6} /></p>
              <ul className="list-disc pl-6">
                <li><strong>No Premium Amortization:</strong> Premium or discount on the contract is ignored.</li>
                <li><strong>Mark-to-Market:</strong> The contract is revalued at the closing/forward rate at each balance sheet date, and the net gain or loss is recognized in the **Statement of P&amp;L** immediately. <P n={6} /></li>
              </ul>
            </div>
          )}
        </div>

        {/* 9. Disclosures */}
        <SH id="as11-disclosure" num="IX" title="Disclosure Requirements under AS 11" />
        <div className="mb-6 rounded-xl border border-teal-200 dark:border-teal-900/40 overflow-hidden font-serif">
          <div className="bg-teal-700 px-5 py-3 flex items-center gap-2"><Check size={14} className="text-white stroke-[3]" /><span className="text-[11.5px] font-sans font-bold uppercase tracking-wider text-white">AS 11 Mandatory Disclosures <P n={7} /></span></div>
          <div className="divide-y divide-teal-100 dark:divide-teal-900/30 font-sans">
            {[
              { title: 'Recognized Exchange Differences', detail: 'The amount of exchange differences included in the net profit or loss for the period.' },
              { title: 'Translation Reserves (FCTR)', detail: "Accumulated exchange differences classified as a separate component of shareholders' funds (FCTR), and a reconciliation of the movements in such differences." },
              { title: 'Classification Changes', detail: 'If there is a change in the classification of a significant foreign operation (e.g. from integral to non-integral), the enterprise must disclose the nature of the change, the reason, and the financial impact.' }
            ].map((item, i) => (
              <div key={i} className={'flex gap-4 items-start px-5 py-4 ' + (i % 2 === 0 ? 'bg-white dark:bg-[#111726]' : 'bg-teal-50/15 dark:bg-teal-955/10')}>
                <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center text-teal-700 dark:text-teal-300 shrink-0 mt-0.5"><Check size={13} className="stroke-[3]" /></div>
                <div><h4 className="font-sans font-bold text-[14px] text-slate-950 dark:text-white mb-1">{item.title}</h4><p className="text-[13.5px] leading-relaxed text-slate-800 dark:text-slate-200">{item.detail}</p></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}


const as12Sections = [
  { id: 'as12-overview',          title: '1. Introduction & Objective' },
  { id: 'as12-scope',             title: '2. Scope & Exclusions' },
  { id: 'as12-definitions',       title: '3. Definitions & Recognition' },
  { id: 'as12-asset-grants',      title: '4. Asset-Related Grants (Non-Depreciable & Depreciable)' },
  { id: 'as12-revenue-grants',    title: '5. Revenue-Related Grants' },
  { id: 'as12-promoter',          title: "6. Promoter's Contribution" },
  { id: 'as12-refund',            title: '7. Refund of Government Grants' },
  { id: 'as12-disclosure',        title: '8. Disclosure Requirements' },
]

interface AS12StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
}

function AS12StandardTabContent({ navigateToPdfPage }: AS12StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as12-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    assetGrants: true,
    revenueGrants: true,
    refunds: true
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as12-standard-sticky-toc')
    if (container && target) {
      const containerRect = container.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      let offset = 58
      if (stickyToc) { const tocRect = stickyToc.getBoundingClientRect(); offset = tocRect.bottom - containerRect.top }
      container.scrollTo({ top: targetRect.top - containerRect.top + container.scrollTop - offset - 12, behavior: 'auto' })
    }
  }

  useEffect(() => {
    if (!activeSection || !tocScrollRef.current) return
    const el = tocScrollRef.current
    const btn = el.querySelector('[data-sec-id="' + activeSection + '"]') as HTMLElement | null
    if (!btn) return
    if (as12Sections[0]?.id === activeSection) { el.scrollTo({ left: 0, behavior: 'smooth' }); return }
    const elRect = el.getBoundingClientRect(); const btnRect = btn.getBoundingClientRect()
    el.scrollTo({ left: btnRect.left - elRect.left + el.scrollLeft - elRect.width / 2 + btnRect.width / 2, behavior: 'smooth' })
  }, [activeSection])

  useEffect(() => {
    let obs: IntersectionObserver | undefined
    const init = () => {
      const sc = document.getElementById('as1-scroll-container')
      if (!sc) { setTimeout(init, 50); return }
      obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }), { root: sc, rootMargin: '-90px 0px -65% 0px', threshold: 0 })
      as12Sections.forEach(s => { const el = document.getElementById(s.id); if (el) obs?.observe(el) })
    }
    init(); return () => obs?.disconnect()
  }, [])

  useEffect(() => {
    const el = tocScrollRef.current; if (!el) return
    const onWheel = (e: WheelEvent) => { if (e.deltaY === 0) return; e.preventDefault(); el.scrollLeft += e.deltaY }
    el.addEventListener('wheel', onWheel, { passive: false }); return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const P = ({ n }: { n: number }) => (
    <button onClick={() => navigateToPdfPage(n)}
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-955/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={'Open AS 12 PDF page ' + n}><FileText size={9} className="shrink-0" /> p.{n}</button>
  )

  const SH = ({ id, num, title }: { id: string; num: string; title: string }) => (
    <div id={id} className="scroll-mt-36 mb-6 mt-14 first:mt-0 pb-4 border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <span className="font-mono font-extrabold text-[13px] text-emerald-600 dark:text-emerald-400 select-none">{num}.</span>
        <h2 className="text-[20px] sm:text-[22px] font-bold text-slate-900 dark:text-white tracking-tight">{title}</h2>
      </div>
      <div className="h-[2px] w-16 rounded-full bg-emerald-500 mt-2 ml-8" />
    </div>
  )

  const NB = ({ type, title, children }: { type: string; title?: string; children: React.ReactNode }) => {
    const s: Record<string, string> = {
      info:    'bg-blue-50/80 dark:bg-blue-955/20 border-blue-300 dark:border-blue-805 text-blue-900 dark:text-blue-200 border-l-blue-500',
      warning: 'bg-amber-50/80 dark:bg-amber-955/20 border-amber-300 dark:border-amber-805 text-amber-900 dark:text-amber-202 border-l-amber-500',
      success: 'bg-emerald-50/80 dark:bg-emerald-955/20 border-emerald-300 dark:border-emerald-805 text-emerald-900 dark:text-emerald-202 border-l-emerald-500',
      exam:    'bg-rose-50/80 dark:bg-rose-955/20 border-rose-300 dark:border-rose-805 text-rose-900 dark:text-rose-200 border-l-rose-500',
    }
    return (
      <div className={'rounded-xl border border-l-4 p-5 my-5 ' + (s[type] || s['info'])}>
        {title && <p className="font-extrabold uppercase tracking-wider text-[10.5px] mb-2 opacity-75">{title}</p>}
        <div className="text-[14.5px] leading-relaxed">{children}</div>
      </div>
    )
  }

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      <div id="as12-standard-sticky-toc" ref={tocScrollRef} className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1"><BookOpen size={9.5} />AS 12:</span>
        {as12Sections.map(sec => (
          <button key={sec.id} data-sec-id={sec.id} onClick={() => handleSectionClick(sec.id)}
            className={'text-[9.5px] font-bold px-2 py-0.5 rounded border transition-all whitespace-nowrap cursor-pointer ' + (activeSection === sec.id ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#1E2640] dark:hover:bg-slate-800 border-slate-200 dark:border-gray-700 text-slate-600 dark:text-gray-300')}>
            {sec.title.split('. ').slice(1).join('. ') || sec.title}
          </button>
        ))}
      </div>

      <div className="w-full bg-white dark:bg-[#111726] border border-slate-200 dark:border-gray-800 rounded-xl px-6 sm:px-10 lg:px-14 py-10 sm:py-14 shadow-xs space-y-0">

        {/* 1. Overview */}
        <SH id="as12-overview" num="I" title="Overview & Purpose of AS 12" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p><strong>Accounting Standard 12 (AS 12) — Accounting for Government Grants</strong> deals with accounting for government grants, which are sometimes called by other names such as subsidies, cash incentives, duty drawbacks, etc. <P n={1} /></p>
          <p>Government grants are assistance by government in cash or kind to an enterprise for past or future compliance with certain conditions. The standard ensures these grants are recognized and presented appropriately based on their underlying nature.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8 font-serif">
          {[
            { color: 'emerald', title: 'Asset-Related', body: 'Regulates grants received for acquiring or constructing depreciable/non-depreciable fixed assets.', p: 3 },
            { color: 'teal', title: 'Revenue-Related', body: 'Governs subsidies received to compensate operating costs or support operational revenues.', p: 4 },
            { color: 'blue', title: 'Refund Rules', body: 'Prescribes accounting adjustments when conditions are breached and grants must be refunded to the state.', p: 4 }
          ].map((c, i) => (
            <div key={i} className={'p-5 border-t-2 border-' + c.color + '-500 border border-' + c.color + '-200 dark:border-' + c.color + '-900/40 bg-' + c.color + '-50/20 dark:bg-' + c.color + '-950/5 rounded-xl'}>
              <h4 className={'font-sans font-bold text-[12px] uppercase tracking-wider text-' + c.color + '-800 dark:text-' + c.color + '-400 mb-2'}>{c.title}</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">{c.body} <P n={c.p} /></p>
            </div>
          ))}
        </div>

        {/* 2. Scope */}
        <SH id="as12-scope" num="II" title="Scope & Exclusions of the Standard" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>This Standard does **not** deal with: <P n={1} /></p>
          <ul className="list-disc pl-6 space-y-1.5 text-[15px] font-sans text-slate-700 dark:text-gray-300">
            <li>The special problems arising in accounting for government grants in financial statements reflecting the effects of changing prices (inflation accounting).</li>
            <li>Government assistance other than in the form of government grants (e.g., tax holidays, custom duty exemptions, infrastructure improvements in region).</li>
            <li>Government participation in the ownership of the enterprise (equity participation).</li>
          </ul>
        </div>

        {/* 3. Definitions & Recognition */}
        <SH id="as12-definitions" num="III" title="Definitions & Recognition Criteria" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p><strong>Government:</strong> Includes government, government agencies and similar bodies whether local, national or international. <P n={1} /></p>
          <p><strong>Government Grants:</strong> Assistance by government in the form of transfers of resources to an enterprise in return for past or future compliance with certain conditions relating to the operating activities of the enterprise. <P n={1} /></p>
        </div>
        <NB type="warning" title="Mandatory Recognition Test (Para 4)">
          Government grants, including non-monetary grants at fair value, should **not** be recognized until there is **reasonable assurance** that: <P n={2} />
          1. The enterprise will comply with the conditions attached to them; and
          2. The grants will be received.
          
          *Note: Mere receipt of a grant is not of itself conclusive evidence that the conditions attaching to the grant have been or will be fulfilled.*
        </NB>

        {/* 4. Asset-Related Grants */}
        <SH id="as12-asset-grants" num="IV" title="Asset-Related Grants (Depreciable & Non-Depreciable)" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>Government grants related to specific fixed assets should be presented in the balance sheet in one of two ways: <P n={3} /></p>
        </div>
        <div className="border border-emerald-250 dark:border-emerald-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('assetGrants')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Two Permitted Methods of Accounting (Para 8–10) <P n={3} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.assetGrants ? 'rotate-180' : '')} />
          </div>
          {openAccordions.assetGrants && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed font-sans">
              <p><strong>Method A: Reduction from Asset Cost:</strong> The grant is shown as a deduction from the gross value of the asset in arriving at its book value. Where the grant equals the whole, or almost the whole, of the cost of the asset, the asset is shown in the balance sheet at a nominal value.</p>
              <ul className="list-disc pl-6 mb-2">
                <li><strong>Impact:</strong> Future depreciation is charged on the net reduced book value of the asset.</li>
              </ul>
              <p><strong>Method B: Deferred Income Method:</strong> Grants related to depreciable assets are treated as deferred income which is recognized in the Statement of Profit and Loss on a systematic and rational basis over the useful life of the asset.</p>
              <ul className="list-disc pl-6">
                <li><strong>Impact:</strong> The asset remains at gross cost. The deferred grant is allocated to P&amp;L in proportion to the depreciation charged.</li>
              </ul>
              <p className="font-bold text-rose-600 dark:text-rose-455 mt-2">Non-Depreciable Assets (e.g. Freehold Land):</p>
              <p>If a grant is received for a non-depreciable asset requiring compliance with certain obligations, it should be credited to **Capital Reserve** if no related costs are expected, or recognized in P&amp;L over the periods which bear the cost of meeting the obligations. <P n={3} /></p>
            </div>
          )}
        </div>

        {/* 5. Revenue-Related Grants */}
        <SH id="as12-revenue-grants" num="V" title="Revenue-Related Grants" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>Grants related to revenue should be recognized in the Statement of Profit and Loss on a systematic basis over the periods necessary to match them with the related costs which they are intended to compensate. <P n={4} /></p>
          <p><strong>Presentation (Para 13):</strong> Such grants are either: <P n={4} /></p>
          <ol className="list-decimal pl-6 space-y-1.5 text-[15px] font-sans text-slate-700 dark:text-gray-300">
            <li>Presented as an item under **"Other Income"** (separately disclosed); or</li>
            <li>Deducted from the related expense when reporting the net expenditure in P&amp;L (e.g. power subsidy deducted from power expense).</li>
          </ol>
        </div>

        {/* 6. Promoter's Contribution */}
        <SH id="as12-promoter" num="VI" title="Promoter's Contribution Subsidies" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>Government grants of the nature of <strong>promoter's contribution</strong> are received by an enterprise as a financial participation by the government towards its capital outlay (e.g. state capital subsidies for backward area setting). <P n={3} /></p>
          <p><strong>Accounting Treatment (Para 11.1):</strong> These grants should be credited directly to the **Capital Reserve** and treated as part of shareholders' funds. They cannot be distributed as dividend or recognized in the P&amp;L statement. <P n={3} /></p>
        </div>

        {/* 7. Refund of Government Grants */}
        <SH id="as12-refund" num="VII" title="Refund of Government Grants" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>Government grants that become refundable because of non-fulfillment of conditions are treated as an **extraordinary item** or an exceptional item in the period of refund. <P n={4} /></p>
        </div>
        <div className="border border-emerald-200 dark:border-emerald-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('refunds')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Accounting Adjustments on Refund <P n={4} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.refunds ? 'rotate-180' : '')} />
          </div>
          {openAccordions.refunds && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed">
              <p><strong>1. Refund of Revenue-Related Grant:</strong> Applied first against any unamortized deferred credit remaining in respect of the grant. To the extent that the refund exceeds any such deferred credit, it should be charged immediately to the **Statement of Profit and Loss**. <P n={4} /></p>
              <p><strong>2. Refund of Asset-Related Grant (Reduction Method):</strong> The refund increases the book value of the asset. The cumulative extra depreciation that would have been charged to date in the absence of the grant is charged immediately as an expense in P&amp;L. Future depreciation is charged prospectively. <P n={4} /></p>
              <p><strong>3. Refund of Asset-Related Grant (Deferred Income Method):</strong> The refund reduces the deferred income balance. Any excess of refund over the deferred income balance is charged immediately to P&amp;L. <P n={4} /></p>
              <p><strong>4. Refund of Promoter's Contribution Grant:</strong> The refund is debited directly to the **Capital Reserve**, reducing the balance. <P n={4} /></p>
            </div>
          )}
        </div>

        {/* 8. Disclosures */}
        <SH id="as12-disclosure" num="VIII" title="Disclosure Requirements under AS 12" />
        <div className="mb-6 rounded-xl border border-emerald-250 dark:border-emerald-900/40 overflow-hidden font-serif">
          <div className="bg-emerald-700 px-5 py-3 flex items-center gap-2"><Check size={14} className="text-white stroke-[3]" /><span className="text-[11.5px] font-sans font-bold uppercase tracking-wider text-white">AS 12 Mandatory Disclosures <P n={5} /></span></div>
          <div className="divide-y divide-emerald-100 dark:divide-emerald-900/30 font-sans">
            {[
              { title: 'Accounting Policies adopted', detail: 'The accounting policy adopted for government grants, including the methods of presentation adopted in the financial statements.' },
              { title: 'Nature and Extent of Grants', detail: 'The nature and extent of government grants recognized in the financial statements, including grants of non-monetary assets given at a concessional rate or free of cost.' }
            ].map((item, i) => (
              <div key={i} className={'flex gap-4 items-start px-5 py-4 ' + (i % 2 === 0 ? 'bg-white dark:bg-[#111726]' : 'bg-emerald-50/15 dark:bg-emerald-955/10')}>
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5"><Check size={13} className="stroke-[3]" /></div>
                <div><h4 className="font-sans font-bold text-[14px] text-slate-950 dark:text-white mb-1">{item.title}</h4><p className="text-[13.5px] leading-relaxed text-slate-800 dark:text-slate-200">{item.detail}</p></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}


const as13Sections = [
  { id: 'as13-overview',          title: '1. Introduction & Objective' },
  { id: 'as13-scope',             title: '2. Scope & Exclusions' },
  { id: 'as13-classification',    title: '3. Current vs Long-Term Classification' },
  { id: 'as13-cost',              title: '4. Cost of Investments & Pre-Acquisition Dividends' },
  { id: 'as13-valuation',         title: '5. Subsequent Valuation & MTM Rules' },
  { id: 'as13-transfer',          title: '6. Inter-class Transfers' },
  { id: 'as13-disposal',          title: '7. Disposal of Investments' },
  { id: 'as13-disclosure',        title: '8. Disclosure Requirements' },
]

interface AS13StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
}

function AS13StandardTabContent({ navigateToPdfPage }: AS13StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as13-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    classification: true,
    costs: true,
    valuation: true,
    transfers: true
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as13-standard-sticky-toc')
    if (container && target) {
      const containerRect = container.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      let offset = 58
      if (stickyToc) { const tocRect = stickyToc.getBoundingClientRect(); offset = tocRect.bottom - containerRect.top }
      container.scrollTo({ top: targetRect.top - containerRect.top + container.scrollTop - offset - 12, behavior: 'auto' })
    }
  }

  useEffect(() => {
    if (!activeSection || !tocScrollRef.current) return
    const el = tocScrollRef.current
    const btn = el.querySelector('[data-sec-id="' + activeSection + '"]') as HTMLElement | null
    if (!btn) return
    if (as13Sections[0]?.id === activeSection) { el.scrollTo({ left: 0, behavior: 'smooth' }); return }
    const elRect = el.getBoundingClientRect(); const btnRect = btn.getBoundingClientRect()
    el.scrollTo({ left: btnRect.left - elRect.left + el.scrollLeft - elRect.width / 2 + btnRect.width / 2, behavior: 'smooth' })
  }, [activeSection])

  useEffect(() => {
    let obs: IntersectionObserver | undefined
    const init = () => {
      const sc = document.getElementById('as1-scroll-container')
      if (!sc) { setTimeout(init, 50); return }
      obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }), { root: sc, rootMargin: '-90px 0px -65% 0px', threshold: 0 })
      as13Sections.forEach(s => { const el = document.getElementById(s.id); if (el) obs?.observe(el) })
    }
    init(); return () => obs?.disconnect()
  }, [])

  useEffect(() => {
    const el = tocScrollRef.current; if (!el) return
    const onWheel = (e: WheelEvent) => { if (e.deltaY === 0) return; e.preventDefault(); el.scrollLeft += e.deltaY }
    el.addEventListener('wheel', onWheel, { passive: false }); return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const P = ({ n }: { n: number }) => (
    <button onClick={() => navigateToPdfPage(n)}
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-955/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={'Open AS 13 PDF page ' + n}><FileText size={9} className="shrink-0" /> p.{n}</button>
  )

  const SH = ({ id, num, title }: { id: string; num: string; title: string }) => (
    <div id={id} className="scroll-mt-36 mb-6 mt-14 first:mt-0 pb-4 border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <span className="font-mono font-extrabold text-[13px] text-indigo-600 dark:text-indigo-400 select-none">{num}.</span>
        <h2 className="text-[20px] sm:text-[22px] font-bold text-slate-900 dark:text-white tracking-tight">{title}</h2>
      </div>
      <div className="h-[2px] w-16 rounded-full bg-indigo-500 mt-2 ml-8" />
    </div>
  )

  const NB = ({ type, title, children }: { type: string; title?: string; children: React.ReactNode }) => {
    const s: Record<string, string> = {
      info:    'bg-blue-50/80 dark:bg-blue-955/20 border-blue-300 dark:border-blue-805 text-blue-900 dark:text-blue-200 border-l-blue-500',
      warning: 'bg-amber-50/80 dark:bg-amber-955/20 border-amber-300 dark:border-amber-805 text-amber-900 dark:text-amber-202 border-l-amber-500',
      success: 'bg-emerald-50/80 dark:bg-emerald-955/20 border-emerald-300 dark:border-emerald-805 text-emerald-900 dark:text-emerald-202 border-l-emerald-500',
      exam:    'bg-rose-50/80 dark:bg-rose-955/20 border-rose-300 dark:border-rose-805 text-rose-900 dark:text-rose-200 border-l-rose-500',
    }
    return (
      <div className={'rounded-xl border border-l-4 p-5 my-5 ' + (s[type] || s['info'])}>
        {title && <p className="font-extrabold uppercase tracking-wider text-[10.5px] mb-2 opacity-75">{title}</p>}
        <div className="text-[14.5px] leading-relaxed">{children}</div>
      </div>
    )
  }

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      <div id="as13-standard-sticky-toc" ref={tocScrollRef} className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1"><BookOpen size={9.5} />AS 13:</span>
        {as13Sections.map(sec => (
          <button key={sec.id} data-sec-id={sec.id} onClick={() => handleSectionClick(sec.id)}
            className={'text-[9.5px] font-bold px-2 py-0.5 rounded border transition-all whitespace-nowrap cursor-pointer ' + (activeSection === sec.id ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#1E2640] dark:hover:bg-slate-800 border-slate-200 dark:border-gray-700 text-slate-600 dark:text-gray-300')}>
            {sec.title.split('. ').slice(1).join('. ') || sec.title}
          </button>
        ))}
      </div>

      <div className="w-full bg-white dark:bg-[#111726] border border-slate-200 dark:border-gray-800 rounded-xl px-6 sm:px-10 lg:px-14 py-10 sm:py-14 shadow-xs space-y-0">

        {/* 1. Overview */}
        <SH id="as13-overview" num="I" title="Overview & Purpose of AS 13" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p><strong>Accounting Standard 13 (AS 13) — Accounting for Investments</strong> deals with accounting for investments in the financial statements of enterprises and related disclosure requirements. <P n={1} /></p>
          <p>The standard ensures that investments are classified correctly as current or long-term, and are measured appropriately to reflect their real values in the financial statement reports.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8 font-serif">
          {[
            { color: 'indigo', title: 'Current Investments', body: 'Readily realizable investments intended to be held for not more than one year. Valued at lower of cost and fair value.', p: 2 },
            { color: 'violet', title: 'Long-Term Investments', body: 'Investments intended to be held for more than one year. Carried at cost unless there is a permanent decline.', p: 2 },
            { color: 'blue', title: 'Cost Accounting', body: 'Prescribes principles for brokerage inclusion, asset exchange values, and pre-acquisition dividend deductions.', p: 3 }
          ].map((c, i) => (
            <div key={i} className={'p-5 border-t-2 border-' + c.color + '-500 border border-' + c.color + '-200 dark:border-' + c.color + '-900/40 bg-' + c.color + '-50/20 dark:bg-' + c.color + '-950/5 rounded-xl'}>
              <h4 className={'font-sans font-bold text-[12px] uppercase tracking-wider text-' + c.color + '-800 dark:text-' + c.color + '-400 mb-2'}>{c.title}</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">{c.body} <P n={c.p} /></p>
            </div>
          ))}
        </div>

        {/* 2. Scope */}
        <SH id="as13-scope" num="II" title="Scope & Exclusions of AS 13" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>This Standard does **not** deal with: <P n={1} /></p>
          <ul className="list-disc pl-6 space-y-1.5 text-[15px] font-sans text-slate-700 dark:text-gray-300">
            <li>The bases for recognition of interest, royalties and dividends (governed by **AS 9**).</li>
            <li>Operating or finance leases (governed by **AS 19**).</li>
            <li>Investments of retirement benefit plans (governed by **AS 15**).</li>
            <li>Investments of life insurance enterprises and mutual funds.</li>
          </ul>
        </div>

        {/* 3. Classification */}
        <SH id="as13-classification" num="III" title="Classification — Current vs. Long-Term" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>An enterprise classification of investments is based on **realizability** and **management intent**: <P n={2} /></p>
        </div>
        <div className="border border-indigo-200 dark:border-indigo-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('classification')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Classification Rules and Criteria <P n={2} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.classification ? 'rotate-180' : '')} />
          </div>
          {openAccordions.classification && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed">
              <p><strong>1. Current Investments:</strong> An investment that is by its nature readily realizable and is intended to be held for **not more than one year** from the date on which such investment is made. <P n={2} /></p>
              <p><strong>2. Long-Term Investments:</strong> An investment other than a current investment (even if it is readily realizable, if management intends to hold it for more than 12 months, it is classified as Long-Term). <P n={2} /></p>
              <p className="font-bold text-amber-600 dark:text-amber-455 mt-2">Significance of Intent:</p>
              <p>Classification is decided at the time of purchase. An investment is current only if both conditions (readily realizable AND intention to hold for &lt; 1 year) are met. If either is missing, it is long-term. <P n={2} /></p>
            </div>
          )}
        </div>

        {/* 4. Cost of Investments */}
        <SH id="as13-cost" num="IV" title="Cost of Investments &amp; Pre-Acquisition Dividends" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p><strong>Initial Cost (Para 5):</strong> The cost of an investment should include acquisition charges such as brokerage, fees and duties. <P n={3} /></p>
          <p><strong>Exchange Transactions (Para 6):</strong> If an investment is acquired, or partly acquired, by the issue of shares or other securities, the acquisition cost should be the **fair value of the securities issued**. If acquired in exchange for another asset, the cost is determined by reference to the fair value of the asset given up or asset acquired, whichever is more clearly evident. <P n={3} /></p>
        </div>
        <div className="border border-indigo-255 dark:border-indigo-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('costs')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Pre-Acquisition Dividends &amp; Right Shares Rules <P n={3} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.costs ? 'rotate-180' : '')} />
          </div>
          {openAccordions.costs && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed font-sans">
              <p><strong>1. Pre-Acquisition Dividends/Interest (Para 9):</strong> If interest or dividend has accrued before the acquisition of an investment and is subsequently received, the receipt is **deducted from the cost of the investment** (representing pre-acquisition profit recovery), not recognized as income in P&amp;L. <P n={3} /></p>
              <div className="p-3 bg-white dark:bg-slate-900 border rounded-lg text-xs leading-relaxed font-mono">
                Interest/Dividend received = pre-acquisition portion (Reduce Cost of Investment) + post-acquisition portion (Credit to P&amp;L)
              </div>
              <p><strong>2. Right Shares (Para 13):</strong> When right shares offered are subscribed for, the cost of the right shares is added to the carrying amount of the original holding. If the rights are renounced and sold, the sale proceeds are recognized directly in the **Statement of Profit and Loss**. <P n={3} /></p>
              <p><em>Exception:</em> If original shares were purchased on a cum-right basis, and the market value of the shares falls below the cost immediately after they become ex-right, the renunciation proceeds are applied to reduce the cost of the investment. <P n={3} /></p>
            </div>
          )}
        </div>

        {/* 5. Subsequent Valuation */}
        <SH id="as13-valuation" num="V" title="Subsequent Valuation &amp; MTM Rules" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>Subsequent carrying values depend on the investment class: <P n={4} /></p>
        </div>
        <div className="border border-indigo-200 dark:border-indigo-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('valuation')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Measurement of Current vs. Long-Term Investments <P n={4} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.valuation ? 'rotate-180' : '')} />
          </div>
          {openAccordions.valuation && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed">
              <p><strong>(a) Current Investments (Para 14):</strong> Carried at the **lower of cost and fair value** (or market value). <P n={4} /></p>
              <ul className="list-disc pl-6 mb-2">
                <li><strong>Method of valuation:</strong> Can be applied either on an individual investment basis or by category of investment, but not on an overall aggregate portfolio cost basis.</li>
                <li><strong>MTM Losses:</strong> Any reduction to fair value is charged immediately to the **Statement of Profit and Loss**. Subsequent recoveries are credited to P&amp;L up to the original cost.</li>
              </ul>
              <p><strong>(b) Long-Term Investments (Para 17):</strong> Carried at **cost**. <P n={4} /></p>
              <ul className="list-disc pl-6">
                <li><strong>Temporary decline:</strong> Ignored (remains at cost).</li>
                <li><strong>Decline other than temporary:</strong> A reduction in carrying amount should be recognized and charged to the **Statement of Profit and Loss**. The reduction should be determined and made for each investment individually. Subsequent reversals are permitted if the value recovers. <P n={4} /></li>
              </ul>
            </div>
          )}
        </div>

        {/* 6. Inter-class Transfers */}
        <SH id="as13-transfer" num="VI" title="Inter-class Transfers" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>When investments are reclassified from current to long-term or vice-versa, the transfer is made at the **lower of cost and carrying value/fair value** on the date of transfer: <P n={4} /></p>
        </div>
        <div className="border border-indigo-255 dark:border-indigo-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('transfers')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Transfer Valuation Summary <P n={4} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.transfers ? 'rotate-180' : '')} />
          </div>
          {openAccordions.transfers && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed">
              <p><strong>1. Long-Term to Current:</strong> Transferred at the **lower of cost and carrying amount** (book value) on the date of transfer. <P n={4} /></p>
              <p><strong>2. Current to Long-Term:</strong> Transferred at the **lower of cost and fair value** on the date of transfer. If fair value is lower, the difference is written off to the Statement of Profit and Loss immediately. <P n={4} /></p>
            </div>
          )}
        </div>

        {/* 7. Disposal of Investments */}
        <SH id="as13-disposal" num="VII" title="Disposal of Investments" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>On disposal of an investment, the difference between the carrying amount and the net disposal proceeds (net of expenses like brokerage) should be recognized in the **Statement of Profit and Loss**. <P n={5} /></p>
          <p><strong>Partial Disposals (Para 22):</strong> When only a part of an enterprise's holding of a particular investment is disposed of, the carrying amount to be allocated to the part sold should be determined on the basis of the **average carrying amount** of the total holding of the investment (weighted average cost method). <P n={5} /></p>
        </div>

        {/* 8. Disclosures */}
        <SH id="as13-disclosure" num="VIII" title="Disclosure Requirements under AS 13" />
        <div className="mb-6 rounded-xl border border-indigo-200 dark:border-indigo-900/40 overflow-hidden font-serif">
          <div className="bg-indigo-700 px-5 py-3 flex items-center gap-2"><Check size={14} className="text-white stroke-[3]" /><span className="text-[11.5px] font-sans font-bold uppercase tracking-wider text-white">AS 13 Mandatory Disclosures <P n={6} /></span></div>
          <div className="divide-y divide-indigo-100 dark:divide-indigo-900/30 font-sans">
            {[
              { title: 'Accounting Policies adopted', detail: 'The accounting policies adopted for the determination of carrying amount of investments.' },
              { title: 'Revenue classification', detail: 'The amounts included in P&L for: (a) interest, dividends, and rentals (showing pre-acquisition vs post-acquisition splits); (b) profits and losses on disposal of current and long-term investments; and (c) write-downs to fair value/recoveries.' },
              { title: 'Investment details in Balance Sheet', detail: 'The market value of quoted investments; the carrying amount of unquoted investments; and significant restrictions on the realizability of investments or remittance of income.' }
            ].map((item, i) => (
              <div key={i} className={'flex gap-4 items-start px-5 py-4 ' + (i % 2 === 0 ? 'bg-white dark:bg-[#111726]' : 'bg-indigo-50/15 dark:bg-indigo-955/10')}>
                <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-700 dark:text-indigo-300 shrink-0 mt-0.5"><Check size={13} className="stroke-[3]" /></div>
                <div><h4 className="font-sans font-bold text-[14px] text-slate-950 dark:text-white mb-1">{item.title}</h4><p className="text-[13.5px] leading-relaxed text-slate-800 dark:text-slate-200">{item.detail}</p></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}


const as14Sections = [
  { id: 'as14-overview',          title: '1. Overview & Purpose' },
  { id: 'as14-scope',             title: '2. Scope & Exclusions' },
  { id: 'as14-definitions',       title: '3. Definitions' },
  { id: 'as14-types',             title: '4. Merger vs Purchase (The 5 Conditions)' },
  { id: 'as14-methods',           title: '5. Accounting Methods (Pooling vs Purchase)' },
  { id: 'as14-consideration',     title: '6. Purchase Consideration Rules' },
  { id: 'as14-statutory-reserves',title: '7. Statutory Reserves Treatment' },
  { id: 'as14-reserves-goodwill', title: '8. Treatment of Goodwill & Reserves' },
  { id: 'as14-disclosure',        title: '9. Disclosure Requirements' },
]

interface AS14StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
}

function AS14StandardTabContent({ navigateToPdfPage }: AS14StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as14-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    conditions: true,
    methods: true,
    consideration: true,
    statutory: true
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as14-standard-sticky-toc')
    if (container && target) {
      const containerRect = container.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      let offset = 58
      if (stickyToc) { const tocRect = stickyToc.getBoundingClientRect(); offset = tocRect.bottom - containerRect.top }
      container.scrollTo({ top: targetRect.top - containerRect.top + container.scrollTop - offset - 12, behavior: 'auto' })
    }
  }

  useEffect(() => {
    if (!activeSection || !tocScrollRef.current) return
    const el = tocScrollRef.current
    const btn = el.querySelector('[data-sec-id="' + activeSection + '"]') as HTMLElement | null
    if (!btn) return
    if (as14Sections[0]?.id === activeSection) { el.scrollTo({ left: 0, behavior: 'smooth' }); return }
    const elRect = el.getBoundingClientRect(); const btnRect = btn.getBoundingClientRect()
    el.scrollTo({ left: btnRect.left - elRect.left + el.scrollLeft - elRect.width / 2 + btnRect.width / 2, behavior: 'smooth' })
  }, [activeSection])

  useEffect(() => {
    let obs: IntersectionObserver | undefined
    const init = () => {
      const sc = document.getElementById('as1-scroll-container')
      if (!sc) { setTimeout(init, 50); return }
      obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }), { root: sc, rootMargin: '-90px 0px -65% 0px', threshold: 0 })
      as14Sections.forEach(s => { const el = document.getElementById(s.id); if (el) obs?.observe(el) })
    }
    init(); return () => obs?.disconnect()
  }, [])

  useEffect(() => {
    const el = tocScrollRef.current; if (!el) return
    const onWheel = (e: WheelEvent) => { if (e.deltaY === 0) return; e.preventDefault(); el.scrollLeft += e.deltaY }
    el.addEventListener('wheel', onWheel, { passive: false }); return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const P = ({ n }: { n: number }) => (
    <button onClick={() => navigateToPdfPage(n)}
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-955/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={'Open AS 14 PDF page ' + n}><FileText size={9} className="shrink-0" /> p.{n}</button>
  )

  const SH = ({ id, num, title }: { id: string; num: string; title: string }) => (
    <div id={id} className="scroll-mt-36 mb-6 mt-14 first:mt-0 pb-4 border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <span className="font-mono font-extrabold text-[13px] text-violet-600 dark:text-violet-400 select-none">{num}.</span>
        <h2 className="text-[20px] sm:text-[22px] font-bold text-slate-900 dark:text-white tracking-tight">{title}</h2>
      </div>
      <div className="h-[2px] w-16 rounded-full bg-violet-500 mt-2 ml-8" />
    </div>
  )

  const NB = ({ type, title, children }: { type: string; title?: string; children: React.ReactNode }) => {
    const s: Record<string, string> = {
      info:    'bg-blue-50/80 dark:bg-blue-955/20 border-blue-300 dark:border-blue-805 text-blue-900 dark:text-blue-200 border-l-blue-500',
      warning: 'bg-amber-50/80 dark:bg-amber-955/20 border-amber-300 dark:border-amber-805 text-amber-900 dark:text-amber-202 border-l-amber-500',
      success: 'bg-emerald-50/80 dark:bg-emerald-955/20 border-emerald-300 dark:border-emerald-805 text-emerald-900 dark:text-emerald-202 border-l-emerald-500',
      exam:    'bg-rose-50/80 dark:bg-rose-955/20 border-rose-300 dark:border-rose-805 text-rose-900 dark:text-rose-200 border-l-rose-500',
    }
    return (
      <div className={'rounded-xl border border-l-4 p-5 my-5 ' + (s[type] || s['info'])}>
        {title && <p className="font-extrabold uppercase tracking-wider text-[10.5px] mb-2 opacity-75">{title}</p>}
        <div className="text-[14.5px] leading-relaxed">{children}</div>
      </div>
    )
  }

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      <div id="as14-standard-sticky-toc" ref={tocScrollRef} className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1"><BookOpen size={9.5} />AS 14:</span>
        {as14Sections.map(sec => (
          <button key={sec.id} data-sec-id={sec.id} onClick={() => handleSectionClick(sec.id)}
            className={'text-[9.5px] font-bold px-2 py-0.5 rounded border transition-all whitespace-nowrap cursor-pointer ' + (activeSection === sec.id ? 'bg-violet-600 border-violet-600 text-white' : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#1E2640] dark:hover:bg-slate-800 border-slate-200 dark:border-gray-700 text-slate-600 dark:text-gray-300')}>
            {sec.title.split('. ').slice(1).join('. ') || sec.title}
          </button>
        ))}
      </div>

      <div className="w-full bg-white dark:bg-[#111726] border border-slate-200 dark:border-gray-800 rounded-xl px-6 sm:px-10 lg:px-14 py-10 sm:py-14 shadow-xs space-y-0">

        {/* 1. Overview */}
        <SH id="as14-overview" num="I" title="Overview & Purpose of AS 14" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p><strong>Accounting Standard 14 (AS 14) — Accounting for Amalgamations</strong> prescribes the accounting treatment for amalgamations in the books of the transferee company and the treatment of any resultant goodwill or reserves. <P n={1} /></p>
          <p>This standard provides rules to distinguish between an amalgamation in the nature of merger and an amalgamation in the nature of purchase, ensuring that the accounting reflects the commercial substance of the transaction.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8 font-serif">
          {[
            { color: 'violet', title: 'Merger vs Purchase', body: 'Establishes the strict 5-condition test to classify an amalgamation as either a merger or a purchase.', p: 1 },
            { color: 'indigo', title: 'Accounting Methods', body: 'Governs the Pooling of Interest Method for mergers, and the Purchase Method for purchases.', p: 2 },
            { color: 'blue', title: 'Purchase Consideration', body: 'Defines the scope of payments made exclusively to equity and preference shareholders of the transferor company.', p: 1 }
          ].map((c, i) => (
            <div key={i} className={'p-5 border-t-2 border-' + c.color + '-500 border border-' + c.color + '-200 dark:border-' + c.color + '-900/40 bg-' + c.color + '-50/20 dark:bg-' + c.color + '-950/5 rounded-xl'}>
              <h4 className={'font-sans font-bold text-[12px] uppercase tracking-wider text-' + c.color + '-800 dark:text-' + c.color + '-400 mb-2'}>{c.title}</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">{c.body} <P n={c.p} /></p>
            </div>
          ))}
        </div>

        {/* 2. Scope */}
        <SH id="as14-scope" num="II" title="Scope & Exclusions of AS 14" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>This Standard should be applied in accounting for amalgamations. <P n={1} /></p>
        </div>
        <NB type="warning" title="Exclusion of Holdings / Share Acquisitions">
          This Standard does **not** deal with cases of acquisitions which arise when one company purchases the shares of another company, and the transferor company continues to exist as a separate legal entity. It applies only when the transferor company is dissolved and its assets/liabilities are fully integrated into the transferee. <P n={1} />
        </NB>

        {/* 3. Definitions */}
        <SH id="as14-definitions" num="III" title="Definitions under AS 14" />
        <div className="mb-8 overflow-x-auto rounded-xl border border-violet-250 dark:border-violet-900/40 font-serif">
          <table className="w-full text-left border-collapse text-[13.5px]">
            <thead><tr className="font-sans text-[11.5px] font-bold uppercase tracking-wider text-white bg-violet-700 dark:bg-violet-805"><th className="py-3 px-5 w-1/4">Term</th><th className="py-3 px-5 w-3/4">Standard Definition (Para 3)</th></tr></thead>
            <tbody className="divide-y divide-violet-100 dark:divide-violet-900/30 text-slate-900 dark:text-slate-100">
              <tr className="bg-white dark:bg-[#111726]"><td className="py-4 px-5 font-semibold">Amalgamation</td><td className="py-4 px-5">An amalgamation pursuant to the provisions of the Companies Act or any other statute, integrating two or more companies. <P n={1} /></td></tr>
              <tr className="bg-violet-50/15 dark:bg-violet-955/5"><td className="py-4 px-5 font-semibold">Transferor Company</td><td className="py-4 px-5">The company which is amalgamated into another company. (The selling/liquidating company). <P n={1} /></td></tr>
              <tr className="bg-white dark:bg-[#111726]"><td className="py-4 px-5 font-semibold">Transferee Company</td><td className="py-4 px-5">The company into which a transferor company is amalgamated. (The buying/surviving company). <P n={1} /></td></tr>
              <tr className="bg-violet-50/15 dark:bg-violet-955/5"><td className="py-4 px-5 font-semibold">Reserves</td><td className="py-4 px-5">The portion of earnings, capital surplus or other surpluses of an enterprise, whether created by allocation out of P&amp;L or otherwise. <P n={1} /></td></tr>
            </tbody>
          </table>
        </div>

        {/* 4. Merger vs Purchase */}
        <SH id="as14-types" num="IV" title="Merger vs. Purchase (The 5 Conditions)" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>AS 14 distinguishes between two types of amalgamations: <P n={1} /></p>
        </div>
        <div className="border border-violet-200 dark:border-violet-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('conditions')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Amalgamation in the Nature of Merger — The 5 Conditions <P n={1} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.conditions ? 'rotate-180' : '')} />
          </div>
          {openAccordions.conditions && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed font-sans">
              <p>For an amalgamation to be classified in the nature of **merger**, **ALL** of the following 5 conditions must be satisfied: <P n={1} /></p>
              <ol className="list-decimal pl-6 space-y-2.5">
                <li><strong>All Assets &amp; Liabilities:</strong> All the assets and liabilities of the transferor company become, after amalgamation, the assets and liabilities of the transferee company.</li>
                <li><strong>90% Shareholder Consent:</strong> Equity shareholders holding not less than 90% of the face value of the equity shares of the transferor company (other than those already held by transferee) agree to become equity shareholders of the transferee.</li>
                <li><strong>Equity Payment Mode:</strong> The consideration is discharged by the transferee wholly by the issue of equity shares (except that cash may be paid for fractional shares).</li>
                <li><strong>Business Continuity:</strong> The business of the transferor company is intended to be carried on, after the amalgamation, by the transferee company.</li>
                <li><strong>No Book Value Adjustments:</strong> No adjustment is intended to be made to the book values of the assets and liabilities of the transferor company when they are incorporated in the books of the transferee (except to ensure uniformity of accounting policies).</li>
              </ol>
              <p className="font-bold text-rose-650 dark:text-rose-405 mt-2">Amalgamation in the Nature of Purchase:</p>
              <p>If **any one or more** of the above 5 conditions are **NOT** satisfied, it is classified as an **Amalgamation in the Nature of Purchase**. <P n={1} /></p>
            </div>
          )}
        </div>

        {/* 5. Accounting Methods */}
        <SH id="as14-methods" num="V" title="Accounting Methods — Pooling of Interest vs. Purchase Method" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>The standard prescribes a specific accounting method for each type of amalgamation: <P n={2} /></p>
        </div>
        <div className="border border-violet-250 dark:border-violet-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('methods')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Pooling of Interest Method vs. Purchase Method <P n={2} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.methods ? 'rotate-180' : '')} />
          </div>
          {openAccordions.methods && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed">
              <p><strong>1. Pooling of Interest Method (For Mergers):</strong> Assets, liabilities and reserves of the transferor company are recorded by the transferee at their **existing carrying amounts** (book values). <P n={2} /></p>
              <ul className="list-disc pl-6 mb-2">
                <li><strong>Reserves:</strong> All reserves of the transferor (revenue reserve, capital reserve, revaluation reserve) are preserved and carried forward in the transferee's balance sheet.</li>
                <li><strong>Capital Difference:</strong> Any difference between the purchase consideration and the share capital of the transferor is adjusted directly in the **Reserves** (usually General Reserve).</li>
              </ul>
              <p><strong>2. Purchase Method (For Purchases):</strong> Assets and liabilities are recorded by the transferee at their existing carrying amounts or at their **fair values** (allocated purchase price). <P n={2} /></p>
              <ul className="list-disc pl-6">
                <li><strong>Reserves:</strong> No reserves of the transferor company (except statutory reserves) are recorded in the transferee's books.</li>
                <li><strong>Goodwill/Capital Reserve:</strong> The difference between purchase consideration and net assets acquired is recognized as **Goodwill** (if purchase consideration is higher) or **Capital Reserve** (if net assets acquired are higher). <P n={3} /></li>
              </ul>
            </div>
          )}
        </div>

        {/* 6. Purchase Consideration Rules */}
        <SH id="as14-consideration" num="VI" title="Purchase Consideration Rules" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p><strong>Purchase Consideration (Para 34):</strong> The aggregate of the shares and other securities issued and the payment made in the form of cash or other assets by the transferee company to the **shareholders** of the transferor company. <P n={1} /></p>
        </div>
        <div className="border border-violet-200 dark:border-violet-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('consideration')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Key Consideration Inclusion/Exclusion Rules <P n={1} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.consideration ? 'rotate-180' : '')} />
          </div>
          {openAccordions.consideration && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed">
              <p className="font-bold text-emerald-600 dark:text-emerald-450">Included in Purchase Consideration:</p>
              <ul className="list-disc pl-6 mb-2">
                <li>Equity shares and preference shares issued by the transferee to the equity and preference shareholders of the transferor.</li>
                <li>Cash or other assets paid by the transferee to the shareholders of the transferor.</li>
              </ul>
              <p className="font-bold text-rose-600 dark:text-rose-455">Strictly Excluded (not part of Purchase Consideration):</p>
              <ul className="list-disc pl-6">
                <li>Shares or cash paid to the debenture holders or creditors of the transferor company. (These are settlements of transferor liabilities, not payments to owners). <P n={1} /></li>
              </ul>
            </div>
          )}
        </div>

        {/* 7. Statutory Reserves Treatment */}
        <SH id="as14-statutory-reserves" num="VII" title="Statutory Reserves in Purchase Method" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>In a purchase-type amalgamation, the reserves of the transferor company (other than statutory reserves) are not recorded. However, law may require that certain statutory reserves (e.g. Export Profit Reserve, Development Allowance Reserve) be maintained in the transferee's books for a specified period to retain tax benefits. <P n={3} /></p>
        </div>
        <div className="border border-violet-250 dark:border-violet-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('statutory')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Statutory Reserve Accounting Mechanism (Para 35) <P n={3} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.statutory ? 'rotate-180' : '')} />
          </div>
          {openAccordions.statutory && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed font-sans">
              <p>To record statutory reserves in the purchase method, the transferee records the following entry: <P n={3} /></p>
              <div className="p-3 bg-white dark:bg-slate-900 border rounded-lg font-mono text-[12px] text-slate-800 dark:text-slate-200">
                Debit: Amalgamation Adjustment Reserve A/c <br />
                &nbsp;&nbsp;Credit: Statutory Reserve A/c (of Transferor)
              </div>
              <p><strong>Balance Sheet Presentation:</strong> The Amalgamation Adjustment Reserve is shown as a **deduction** under the heading "Reserves and Surplus" (i.e. as a negative balance). Once the legal holding period is over, the reserve is reversed by crediting Amalgamation Adjustment Reserve and debiting the Statutory Reserve. <P n={3} /></p>
            </div>
          )}
        </div>

        {/* 8. Treatment of Goodwill & Reserves */}
        <SH id="as14-reserves-goodwill" num="VIII" title="Goodwill &amp; Capital Reserve Amortization" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p><strong>Goodwill on Amalgamation (Para 37):</strong> Goodwill represents a payment made in anticipation of future income. It is recognized in the purchase method when the consideration paid exceeds the value of net assets acquired. <P n={3} /></p>
          <p><strong>Amortization Rule (Para 37):</strong> Goodwill should be amortized on a systematic basis over its useful life. The amortization period should **not exceed five years** unless a longer period can be justified by the transferee enterprise. <P n={3} /></p>
          <p><strong>Capital Reserve (Para 38):</strong> If the purchase consideration paid is lower than the value of net assets acquired, the difference is credited directly to the **Capital Reserve** under shareholders' equity. <P n={3} /></p>
        </div>

        {/* 9. Disclosures */}
        <SH id="as14-disclosure" num="IX" title="Disclosure Requirements under AS 14" />
        <div className="mb-6 rounded-xl border border-violet-200 dark:border-violet-900/40 overflow-hidden font-serif">
          <div className="bg-violet-700 px-5 py-3 flex items-center gap-2"><Check size={14} className="text-white stroke-[3]" /><span className="text-[11.5px] font-sans font-bold uppercase tracking-wider text-white">AS 14 Mandatory Disclosures <P n={4} /></span></div>
          <div className="divide-y divide-violet-100 dark:divide-violet-900/30 font-sans">
            {[
              { title: 'General Disclosures (All Amalgamations)', detail: 'Names and general nature of business of the amalgamating companies; effective date of amalgamation; and method of accounting used (pooling vs purchase).' },
              { title: 'Merger Method Disclosures', detail: 'Description of share capital issued and percentage of equity shares exchanged; and details of reserves adjusted due to capital differences.' },
              { title: 'Purchase Method Disclosures', detail: 'Details of purchase consideration paid/payable; fair value adjustments made to assets/liabilities; and goodwill or capital reserve amount, including amortization useful lives.' }
            ].map((item, i) => (
              <div key={i} className={'flex gap-4 items-start px-5 py-4 ' + (i % 2 === 0 ? 'bg-white dark:bg-[#111726]' : 'bg-violet-50/15 dark:bg-violet-955/10')}>
                <div className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center text-violet-700 dark:text-violet-300 shrink-0 mt-0.5"><Check size={13} className="stroke-[3]" /></div>
                <div><h4 className="font-sans font-bold text-[14px] text-slate-950 dark:text-white mb-1">{item.title}</h4><p className="text-[13.5px] leading-relaxed text-slate-800 dark:text-slate-200">{item.detail}</p></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}


const as15Sections = [
  { id: 'as15-overview',          title: '1. Introduction & Objective' },
  { id: 'as15-scope',             title: '2. Scope & Benefit Types' },
  { id: 'as15-definitions',       title: '3. Definitions & Classifications' },
  { id: 'as15-short-term',        title: '4. Short-Term Employee Benefits' },
  { id: 'as15-post-employment',   title: '5. Post-Employment Benefits (DCP vs DBP)' },
  { id: 'as15-defined-benefit',   title: '6. Defined Benefit Obligation (Actuarial Valuation)' },
  { id: 'as15-long-term',         title: '7. Other Long-Term Employee Benefits' },
  { id: 'as15-termination',       title: '8. Termination Benefits' },
  { id: 'as15-disclosure',        title: '9. Disclosure Requirements' },
]

interface AS15StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
}

function AS15StandardTabContent({ navigateToPdfPage }: AS15StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as15-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    types: true,
    postEmployment: true,
    dbObligation: true,
    termination: false
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as15-standard-sticky-toc')
    if (container && target) {
      const containerRect = container.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      let offset = 58
      if (stickyToc) { const tocRect = stickyToc.getBoundingClientRect(); offset = tocRect.bottom - containerRect.top }
      container.scrollTo({ top: targetRect.top - containerRect.top + container.scrollTop - offset - 12, behavior: 'auto' })
    }
  }

  useEffect(() => {
    if (!activeSection || !tocScrollRef.current) return
    const el = tocScrollRef.current
    const btn = el.querySelector('[data-sec-id="' + activeSection + '"]') as HTMLElement | null
    if (!btn) return
    if (as15Sections[0]?.id === activeSection) { el.scrollTo({ left: 0, behavior: 'smooth' }); return }
    const elRect = el.getBoundingClientRect(); const btnRect = btn.getBoundingClientRect()
    el.scrollTo({ left: btnRect.left - elRect.left + el.scrollLeft - elRect.width / 2 + btnRect.width / 2, behavior: 'smooth' })
  }, [activeSection])

  useEffect(() => {
    let obs: IntersectionObserver | undefined
    const init = () => {
      const sc = document.getElementById('as1-scroll-container')
      if (!sc) { setTimeout(init, 50); return }
      obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }), { root: sc, rootMargin: '-90px 0px -65% 0px', threshold: 0 })
      as15Sections.forEach(s => { const el = document.getElementById(s.id); if (el) obs?.observe(el) })
    }
    init(); return () => obs?.disconnect()
  }, [])

  useEffect(() => {
    const el = tocScrollRef.current; if (!el) return
    const onWheel = (e: WheelEvent) => { if (e.deltaY === 0) return; e.preventDefault(); el.scrollLeft += e.deltaY }
    el.addEventListener('wheel', onWheel, { passive: false }); return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const P = ({ n }: { n: number }) => (
    <button onClick={() => navigateToPdfPage(n)}
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-955/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={'Open AS 15 PDF page ' + n}><FileText size={9} className="shrink-0" /> p.{n}</button>
  )

  const SH = ({ id, num, title }: { id: string; num: string; title: string }) => (
    <div id={id} className="scroll-mt-36 mb-6 mt-14 first:mt-0 pb-4 border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <span className="font-mono font-extrabold text-[13px] text-rose-600 dark:text-rose-455 select-none">{num}.</span>
        <h2 className="text-[20px] sm:text-[22px] font-bold text-slate-900 dark:text-white tracking-tight">{title}</h2>
      </div>
      <div className="h-[2px] w-16 rounded-full bg-rose-500 mt-2 ml-8" />
    </div>
  )

  const NB = ({ type, title, children }: { type: string; title?: string; children: React.ReactNode }) => {
    const s: Record<string, string> = {
      info:    'bg-blue-50/80 dark:bg-blue-955/20 border-blue-300 dark:border-blue-805 text-blue-900 dark:text-blue-200 border-l-blue-500',
      warning: 'bg-amber-50/80 dark:bg-amber-955/20 border-amber-300 dark:border-amber-805 text-amber-900 dark:text-amber-202 border-l-amber-500',
      success: 'bg-emerald-50/80 dark:bg-emerald-955/20 border-emerald-300 dark:border-emerald-805 text-emerald-900 dark:text-emerald-202 border-l-emerald-500',
      exam:    'bg-rose-50/80 dark:bg-rose-955/20 border-rose-300 dark:border-rose-805 text-rose-900 dark:text-rose-200 border-l-rose-500',
    }
    return (
      <div className={'rounded-xl border border-l-4 p-5 my-5 ' + (s[type] || s['info'])}>
        {title && <p className="font-extrabold uppercase tracking-wider text-[10.5px] mb-2 opacity-75">{title}</p>}
        <div className="text-[14.5px] leading-relaxed">{children}</div>
      </div>
    )
  }

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      <div id="as15-standard-sticky-toc" ref={tocScrollRef} className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1"><BookOpen size={9.5} />AS 15:</span>
        {as15Sections.map(sec => (
          <button key={sec.id} data-sec-id={sec.id} onClick={() => handleSectionClick(sec.id)}
            className={'text-[9.5px] font-bold px-2 py-0.5 rounded border transition-all whitespace-nowrap cursor-pointer ' + (activeSection === sec.id ? 'bg-rose-600 border-rose-600 text-white' : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#1E2640] dark:hover:bg-slate-800 border-slate-200 dark:border-gray-700 text-slate-600 dark:text-gray-300')}>
            {sec.title.split('. ').slice(1).join('. ') || sec.title}
          </button>
        ))}
      </div>

      <div className="w-full bg-white dark:bg-[#111726] border border-slate-200 dark:border-gray-800 rounded-xl px-6 sm:px-10 lg:px-14 py-10 sm:py-14 shadow-xs space-y-0">

        {/* 1. Overview */}
        <SH id="as15-overview" num="I" title="Overview & Purpose of AS 15" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p><strong>Accounting Standard 15 (AS 15) — Employee Benefits</strong> prescribes the accounting and disclosure for employee benefits by employers. <P n={1} /></p>
          <p>The standard requires an enterprise to recognize: (a) a liability when an employee has rendered service in exchange for employee benefits to be paid in the future; and (b) an expense when the enterprise consumes the economic benefit arising from service provided by an employee in exchange for employee benefits.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8 font-serif">
          {[
            { color: 'rose', title: 'Short-Term Benefits', body: 'Salaries, paid leaves, and bonuses expected to be settled within 12 months after the reporting date.', p: 2 },
            { color: 'orange', title: 'Post-Employment', body: 'Pensions, gratuity, and insurance payable after completion of active employment services.', p: 4 },
            { color: 'red', title: 'Actuarial Valuations', body: 'Mandates the Projected Unit Credit (PUC) method for defined benefit plan obligations.', p: 9 }
          ].map((c, i) => (
            <div key={i} className={'p-5 border-t-2 border-' + c.color + '-500 border border-' + c.color + '-200 dark:border-' + c.color + '-900/40 bg-' + c.color + '-50/20 dark:bg-' + c.color + '-950/5 rounded-xl'}>
              <h4 className={'font-sans font-bold text-[12px] uppercase tracking-wider text-' + c.color + '-805 dark:text-' + c.color + '-400 mb-2'}>{c.title}</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">{c.body} <P n={c.p} /></p>
            </div>
          ))}
        </div>

        {/* 2. Scope */}
        <SH id="as15-scope" num="II" title="Scope & Benefit Types Covered" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>This Standard should be applied by an employer in accounting for all employee benefits, except employee share-based payments (which are governed by separate ICAI guidance notes). <P n={1} /></p>
        </div>
        <div className="border border-rose-200 dark:border-rose-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('types')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Four Key Categories of Employee Benefits <P n={1} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.types ? 'rotate-180' : '')} />
          </div>
          {openAccordions.types && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed">
              <p><strong>1. Short-Term Employee Benefits:</strong> Benefits expected to be settled wholly within 12 months after the end of the period (wages, paid leaves, annual bonuses). <P n={2} /></p>
              <p><strong>2. Post-Employment Benefits:</strong> Payable after completion of employment (pension, gratuity, post-employment life insurance). <P n={4} /></p>
              <p><strong>3. Other Long-Term Employee Benefits:</strong> Not expected to be settled wholly within 12 months (long-service leave, sabbatical leave, long-service awards). <P n={20} /></p>
              <p><strong>4. Termination Benefits:</strong> Payable as a result of an enterprise's decision to terminate employment before normal retirement or employee's decision to accept voluntary redundancy. <P n={21} /></p>
            </div>
          )}
        </div>

        {/* 3. Definitions */}
        <SH id="as15-definitions" num="III" title="Definitions & Classifications" />
        <div className="mb-8 overflow-x-auto rounded-xl border border-rose-250 dark:border-rose-900/40 font-serif">
          <table className="w-full text-left border-collapse text-[13.5px]">
            <thead><tr className="font-sans text-[11.5px] font-bold uppercase tracking-wider text-white bg-rose-700 dark:bg-rose-800"><th className="py-3 px-5 w-1/4">Term</th><th className="py-3 px-5 w-3/4">Standard Definition (Para 7)</th></tr></thead>
            <tbody className="divide-y divide-rose-100 dark:divide-rose-900/30 text-slate-900 dark:text-slate-100">
              <tr className="bg-white dark:bg-[#111726]"><td className="py-4 px-5 font-semibold">Employee Benefits</td><td className="py-4 px-5">All forms of consideration given by an enterprise in exchange for service rendered by employees. <P n={2} /></td></tr>
              <tr className="bg-rose-50/15 dark:bg-rose-955/5"><td className="py-4 px-5 font-semibold">Vested Benefits</td><td className="py-4 px-5">Employee benefits that are not conditional on future employment. (Employee is legally entitled even if they quit today). <P n={2} /></td></tr>
              <tr className="bg-white dark:bg-[#111726]"><td className="py-4 px-5 font-semibold">Plan Assets</td><td className="py-4 px-5">Assets held by a long-term employee benefit fund, and qualifying insurance policies, excluding non-transferable financial instruments. <P n={2} /></td></tr>
            </tbody>
          </table>
        </div>

        {/* 4. Short-Term Employee Benefits */}
        <SH id="as15-short-term" num="IV" title="Short-Term Employee Benefits" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>Accounting for short-term employee benefits is straightforward because no actuarial assumptions are required and there is no possibility of any actuarial gain or loss. <P n={2} /></p>
          <p><strong>Accounting Treatment (Para 8–10):</strong> The undiscounted amount of short-term employee benefits expected to be paid in exchange for employee service is recognized as: <P n={2} /></p>
          <ul className="list-disc pl-6 space-y-1 text-[15px] font-sans text-slate-700 dark:text-gray-300">
            <li>A liability (accrued expense), after deducting any amount already paid.</li>
            <li>An expense in the Statement of P&amp;L of the period (unless another standard permits/requires capitalization under PPE or inventory).</li>
          </ul>
        </div>

        {/* 5. Post-Employment Benefits */}
        <SH id="as15-post-employment" num="V" title="Post-Employment Benefits — DCP vs. DBP" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>Post-employment benefits are classified into two categories: <P n={4} /></p>
        </div>
        <div className="border border-rose-200 dark:border-rose-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('postEmployment')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Defined Contribution Plans vs. Defined Benefit Plans <P n={4} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.postEmployment ? 'rotate-180' : '')} />
          </div>
          {openAccordions.postEmployment && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed">
              <p><strong>1. Defined Contribution Plans (DCP):</strong> The enterprise's obligation is limited to the amount it agrees to contribute to a separate fund (e.g. Provident Fund). Actuarial risk and investment risk fall on the employee. <P n={4} /></p>
              <ul className="list-disc pl-6 mb-2">
                <li><strong>Accounting:</strong> The contribution payable for the period is recognized as an expense immediately. <P n={4} /></li>
              </ul>
              <p><strong>2. Defined Benefit Plans (DBP):</strong> The enterprise's obligation is to provide the agreed benefits to current and former employees (e.g. Gratuity schemes, defined pension plans). Actuarial risk and investment risk fall on the enterprise. <P n={5} /></p>
              <ul className="list-disc pl-6">
                <li><strong>Accounting:</strong> Requires actuarial assumptions to measure the obligation and the expense, introducing the possibility of actuarial gains and losses. <P n={5} /></li>
              </ul>
            </div>
          )}
        </div>

        {/* 6. Defined Benefit Obligation */}
        <SH id="as15-defined-benefit" num="VI" title="Defined Benefit Obligation &amp; Actuarial Valuation" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>Accounting for defined benefit plans is complex because the obligation is settled in the future. <P n={9} /> Under **Paragraph 65**, the calculation of the present value of defined benefit obligations and the related service costs must be performed using the **Projected Unit Credit (PUC) Method** (accrued benefit method pro-rated on service). <P n={11} /></p>
        </div>
        <div className="border border-rose-250 dark:border-rose-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('dbObligation')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Actuarial Measurement &amp; Balance Sheet Recognition <P n={9} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.dbObligation ? 'rotate-180' : '')} />
          </div>
          {openAccordions.dbObligation && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed font-sans">
              <p><strong>1. Balance Sheet Recognition:</strong> The amount recognized as a defined benefit liability (or asset) should be: <P n={10} /></p>
              <div className="p-3 bg-white dark:bg-slate-900 border rounded-lg font-mono text-[12px] text-slate-800 dark:text-slate-200 text-center">
                Net Liability = Present Value of Defined Benefit Obligation (PVDBO) at balance sheet date <br />
                &nbsp;&nbsp;− Fair Value of Plan Assets (FVPA) at balance sheet date
              </div>
              <p><strong>2. P&amp;L Expense Components:</strong> The net total of the following amounts should be recognized in the Statement of Profit and Loss: <P n={10} /></p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Current service cost (additional obligation arising from service in current period).</li>
                <li>Interest cost (increase in present value of obligation due to passage of time).</li>
                <li>Expected return on plan assets.</li>
                <li>Actuarial gains and losses (must be recognized **immediately** in P&amp;L; no deferral). <P n={10} /></li>
                <li>Past service cost (to the extent it has vested).</li>
              </ul>
            </div>
          )}
        </div>

        {/* 7. Other Long-Term Benefits */}
        <SH id="as15-long-term" num="VII" title="Other Long-Term Employee Benefits" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>Other long-term employee benefits include items such as long-service leave, sabbatical leave, or long-term disability benefits. <P n={20} /></p>
          <p><strong>Accounting Treatment (Para 127):</strong> The amount recognized as a liability should be the present value of the obligation minus the fair value of any plan assets. Unlike defined benefit plans, **all actuarial gains and losses and past service costs are recognized immediately in the Statement of Profit and Loss** (no reserves option). <P n={20} /></p>
        </div>

        {/* 8. Termination Benefits */}
        <SH id="as15-termination" num="VIII" title="Termination Benefits" />
        <div className="space-y-5 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif mb-6">
          <p>Termination benefits arise when an enterprise terminates employment before the normal retirement date or when an employee accepts voluntary redundancy (e.g. Voluntary Retirement Scheme - VRS). <P n={21} /></p>
        </div>
        <div className="border border-rose-200 dark:border-rose-900/40 rounded-xl overflow-hidden bg-white dark:bg-[#0b0f19] mb-8 font-sans">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('termination')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Recognition and Treatment of VRS/Termination Benefits <P n={21} /></span>
            <ChevronDown size={16} className={'transform transition-transform ' + (openAccordions.termination ? 'rotate-180' : '')} />
          </div>
          {openAccordions.termination && (
            <div className="p-4 bg-slate-50/10 dark:bg-slate-900/10 text-xs sm:text-[13.5px] space-y-3 leading-relaxed">
              <p><strong>Accounting Treatment (Para 134):</strong> An enterprise should recognize termination benefits as a liability and an **expense immediately** in the period they occur. <P n={21} /></p>
              <p><strong>VRS Amortization Prohibition:</strong> Previously, companies were allowed to amortize VRS expenditure over 3-5 years. Under AS 15, **amortization of VRS is strictly prohibited**. The entire VRS payout must be charged to the Statement of Profit and Loss in the year the employee accepts the offer. <P n={21} /></p>
            </div>
          )}
        </div>

        {/* 9. Disclosures */}
        <SH id="as15-disclosure" num="IX" title="Disclosure Requirements under AS 15" />
        <div className="mb-6 rounded-xl border border-rose-200 dark:border-rose-900/40 overflow-hidden font-serif">
          <div className="bg-rose-700 px-5 py-3 flex items-center gap-2"><Check size={14} className="text-white stroke-[3]" /><span className="text-[11.5px] font-sans font-bold uppercase tracking-wider text-white">AS 15 Mandatory Disclosures <P n={22} /></span></div>
          <div className="divide-y divide-rose-100 dark:divide-rose-900/30 font-sans">
            {[
              { title: 'Defined Contribution Plans Disclosures', detail: 'The enterprise must disclose the amount recognized as an expense for defined contribution plans in the Statement of Profit and Loss.' },
              { title: 'Defined Benefit Plans Disclosures (Reconciliations)', detail: 'Detailed reconciliations of opening and closing balances of the present value of the defined benefit obligation (PVDBO) and the fair value of plan assets (FVPA); and the principal actuarial assumptions used (discount rate, rate of increase in salaries, medical inflation).' },
              { title: 'Other Long-Term Benefits Disclosures', detail: 'The amount recognized as an expense and a liability for other long-term employee benefits.' }
            ].map((item, i) => (
              <div key={i} className={'flex gap-4 items-start px-5 py-4 ' + (i % 2 === 0 ? 'bg-white dark:bg-[#111726]' : 'bg-rose-50/15 dark:bg-rose-955/10')}>
                <div className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center text-rose-700 dark:text-rose-300 shrink-0 mt-0.5"><Check size={13} className="stroke-[3]" /></div>
                <div><h4 className="font-sans font-bold text-[14px] text-slate-950 dark:text-white mb-1">{item.title}</h4><p className="text-[13.5px] leading-relaxed text-slate-800 dark:text-slate-200">{item.detail}</p></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

const as16Sections = [
  { id: 'as16-overview',          title: '1. Overview & Purpose' },
  { id: 'as16-scope',             title: '2. Scope & Applicability (Para 1–2)' },
  { id: 'as16-definitions',       title: '3. Definitions (Para 3)' },
  { id: 'as16-specific',          title: '4. Specific Borrowings (Para 10)' },
  { id: 'as16-general',           title: '5. General Borrowings (Para 12)' },
  { id: 'as16-commencement',      title: '6. Commencement & Suspension (Para 14–18)' },
  { id: 'as16-cessation',         title: '7. Cessation of Capitalization (Para 19–22)' },
  { id: 'as16-disclosure',        title: '8. Disclosures (Para 23)' },
]

interface AS16StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
}

function AS16StandardTabContent({ navigateToPdfPage }: AS16StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as16-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    borrowingCostsList: true,
    commencementRules: true,
    cessationRules: true,
    exchangeDifference: true,
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as16-standard-sticky-toc')
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
    if (as16Sections[0]?.id === activeSection) {
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
      as16Sections.forEach(s => {
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
    '1':  { num: 'text-blue-600 dark:text-blue-400',    border: 'border-blue-400',    badge: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800' },
    '2':  { num: 'text-teal-600 dark:text-teal-400',    border: 'border-teal-400',    badge: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-800' },
    '3':  { num: 'text-indigo-600 dark:text-indigo-400',border: 'border-indigo-400',  badge: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800' },
    '4':  { num: 'text-emerald-600 dark:text-emerald-400',border:'border-emerald-400',badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800' },
    '5':  { num: 'text-cyan-600 dark:text-cyan-400',    border: 'border-cyan-400',    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-450 dark:border-cyan-800' },
    '6':  { num: 'text-violet-600 dark:text-violet-400',border: 'border-violet-400',  badge: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800' },
    '7':  { num: 'text-amber-600 dark:text-amber-400',  border: 'border-amber-400',   badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800' },
    '8':  { num: 'text-rose-600 dark:text-rose-400',    border: 'border-rose-400',    badge: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800' },
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
      info:    'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/50 text-blue-900 dark:text-blue-200 border-l-blue-500',
      warning: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 border-l-amber-500',
      success: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-850/50 text-emerald-900 dark:text-emerald-200 border-l-emerald-500',
      exam:    'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/50 text-rose-900 dark:text-rose-200 border-l-rose-500',
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
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={`Open ICAI AS 16 PDF — ${para}`}
    >
      <FileText size={9} className="shrink-0" />
      {para} (p. {page})
    </button>
  )

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      {/* Sticky Section Sub-Navbar */}
      <div id="as16-standard-sticky-toc" className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <BookOpen size={9.5} />
          AS 16 Sections:
        </span>
        {as16Sections.map((sec) => (
          <button
            key={sec.id}
            data-sec-id={sec.id}
            onClick={() => handleSectionClick(sec.id)}
            className={`text-[9.5px] font-bold px-2 py-0.5 rounded border transition-all whitespace-nowrap cursor-pointer ${
              activeSection === sec.id
                ? 'bg-blue-600 border-blue-600 text-white dark:bg-blue-500 dark:border-blue-500'
                : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#1E2640] dark:hover:bg-slate-800 border-slate-200 dark:border-gray-700 text-slate-650 dark:text-gray-300'
            }`}
          >
            {sec.title.split('. ')[1] || sec.title}
          </button>
        ))}
      </div>

      {/* Main Content Card */}
      <div className="w-full space-y-7 bg-white dark:bg-[#111726] border border-slate-200 dark:border-gray-800 rounded-xl p-6 sm:p-8 shadow-xs text-[14px] sm:text-[14.5px] text-slate-700 dark:text-gray-300 leading-relaxed">
        
        {/* 1. Overview & Purpose */}
        <SecHeader id="as16-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Overview" /> Accounting Standard 16 governs the accounting treatment of **borrowing costs**.
        </p>
        <p className="leading-relaxed">
          The core principle of the standard is that borrowing costs that are directly attributable to the acquisition, construction, or production of a qualifying asset should be capitalized as part of the cost of that asset. Other borrowing costs are recognized as an expense in the period in which they are incurred.
        </p>

        {/* 2. Scope & Applicability */}
        <SecHeader id="as16-scope" num="2" title="Scope &amp; Applicability (Para 1–2)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={4} para="Para 1" /> This standard should be applied in accounting for borrowing costs by **all enterprises**.
        </p>
        <p className="leading-relaxed">
          It applies to actual borrowing costs incurred on loans, debentures, bank overdrafts, and other short-term and long-term borrowings. It does not deal with the actual or imputed cost of equity, including preferred capital not classified as a liability.
        </p>

        {/* 3. Definitions */}
        <SecHeader id="as16-definitions" num="3" title="Definitions (Para 3)" />
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13.5px] border-collapse rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Term</th>
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">AS 16 Definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Borrowing Costs</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Interest and other costs incurred by an enterprise in connection with the borrowing of funds.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-950/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Qualifying Asset</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">An asset that necessarily takes a substantial period of time to get ready for its intended use or sale.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('borrowingCostsList')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Components of Borrowing Costs (Para 4)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.borrowingCostsList ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.borrowingCostsList && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2 leading-relaxed">
              <p>Borrowing costs include:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Interest and commitment charges on bank borrowings and other short-term and long-term loans.</li>
                <li>Amortization of discounts or premiums relating to borrowings (e.g. on debentures).</li>
                <li>Amortization of ancillary costs incurred in connection with the arrangement of borrowings.</li>
                <li>Finance charges in respect of assets acquired under finance leases.</li>
                <li>Exchange differences arising from foreign currency borrowings to the extent that they are regarded as an adjustment to interest costs.</li>
              </ul>
            </div>
          )}
        </div>

        {/* 4. Specific Borrowings */}
        <SecHeader id="as16-specific" num="4" title="Specific Borrowings (Para 10)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={6} para="Para 10" /> To the extent that funds are borrowed specifically for the purpose of obtaining a qualifying asset, the amount of borrowing costs eligible for capitalization on that asset should be determined as the **actual borrowing costs incurred** on that borrowing during the period, **less any investment income** on the temporary investment of those borrowings.
        </p>
        <p className="leading-relaxed">
          The investment of surplus funds temporarily in short-term bank deposits offsets the gross interest cost eligible for capitalization.
        </p>

        {/* 5. General Borrowings */}
        <SecHeader id="as16-general" num="5" title="General Borrowings (Para 12)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={7} para="Para 12" /> To the extent that funds are borrowed generally and used for the purpose of obtaining a qualifying asset, the amount of borrowing costs eligible for capitalization should be determined by applying a **capitalization rate** to the expenditures on that asset.
        </p>
        <p className="leading-relaxed">
          The capitalization rate should be the **weighted average of the borrowing costs** outstanding during the period, other than borrowings made specifically for the purpose of obtaining a qualifying asset.
        </p>

        {/* 6. Commencement & Suspension */}
        <SecHeader id="as16-commencement" num="6" title="Commencement &amp; Suspension of Capitalization" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={8} para="Para 14" /> Capitalization of borrowing costs should commence when **all** the following three conditions are met:
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('commencementRules')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Commencement and Suspension Criteria (Para 14–18)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.commencementRules ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.commencementRules && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed">
              <p><strong>Commencement Conditions (Para 14):</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Expenditures for the acquisition, construction or production of a qualifying asset are being incurred.</li>
                <li>Borrowing costs are being incurred.</li>
                <li>Activities that are necessary to prepare the asset for its intended use or sale are in progress.</li>
              </ul>
              <p><strong>Suspension (Para 17):</strong> Capitalization of borrowing costs should be suspended during extended periods in which active development is interrupted. However, capitalization is not normally suspended during a period when substantial technical and administrative work is being carried out or when a temporary delay is a necessary part of the process.</p>
            </div>
          )}
        </div>

        {/* 7. Cessation of Capitalization */}
        <SecHeader id="as16-cessation" num="7" title="Cessation of Capitalization (Para 19–22)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={9} para="Para 19" /> Capitalization of borrowing costs should **cease** when substantially all the activities necessary to prepare the qualifying asset for its intended use or sale are complete.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('cessationRules')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Cessation rules (Parts &amp; Physical completion)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.cessationRules ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.cessationRules && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2.5 leading-relaxed">
              <p><strong>Physical Completion:</strong> An asset is normally ready for its intended use or sale when its physical construction is complete, even though routine administrative work may still continue.</p>
              <p><strong>Parts Completion (Para 22):</strong> When the construction of a qualifying asset is completed in parts and each part is capable of being used while construction continues on other parts, capitalization of borrowing costs should cease on that part when substantially all activities necessary to prepare it are complete.</p>
            </div>
          )}
        </div>

        {/* 8. Disclosures */}
        <SecHeader id="as16-disclosure" num="8" title="Disclosure Requirements (Para 23)" />
        <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40 text-[13.5px] space-y-2">
          <h4 className="font-bold text-slate-950 dark:text-white text-xs mb-1.5 uppercase tracking-wide">Required Disclosures under AS 16:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>The **accounting policy** adopted for borrowing costs.</li>
            <li>The **amount of borrowing costs capitalized** during the period.</li>
          </ul>
        </div>

      </div>
    </div>
  )
}


const as17Sections = [
  { id: 'as17-overview',          title: '1. Overview & Purpose' },
  { id: 'as17-scope',             title: '2. Scope & Applicability (Para 1–4)' },
  { id: 'as17-definitions',       title: '3. Definitions (Para 5)' },
  { id: 'as17-business-geo',      title: '4. Business & Geographical (Para 5)' },
  { id: 'as17-reportable',        title: '5. Reportable Segments (Para 27–34)' },
  { id: 'as17-policies',          title: '6. Segment Accounting Policies (Para 35–42)' },
  { id: 'as17-primary',           title: '7. Primary Reporting Disclosures' },
  { id: 'as17-secondary',         title: '8. Secondary Reporting Disclosures' },
]

interface AS17StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
}

function AS17StandardTabContent({ navigateToPdfPage }: AS17StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as17-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    segmentTypes: true,
    tenPercentTests: true,
    seventyFivePercentRule: true,
    primaryDisclosures: true,
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as17-standard-sticky-toc')
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
    if (as17Sections[0]?.id === activeSection) {
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
      as17Sections.forEach(s => {
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
    '1':  { num: 'text-blue-600 dark:text-blue-400',    border: 'border-blue-400',    badge: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800' },
    '2':  { num: 'text-teal-600 dark:text-teal-400',    border: 'border-teal-400',    badge: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-800' },
    '3':  { num: 'text-indigo-600 dark:text-indigo-400',border: 'border-indigo-400',  badge: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800' },
    '4':  { num: 'text-emerald-600 dark:text-emerald-400',border:'border-emerald-400',badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800' },
    '5':  { num: 'text-cyan-600 dark:text-cyan-400',    border: 'border-cyan-400',    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-455 dark:border-cyan-800' },
    '6':  { num: 'text-violet-600 dark:text-violet-400',border: 'border-violet-400',  badge: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800' },
    '7':  { num: 'text-amber-600 dark:text-amber-400',  border: 'border-amber-400',   badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800' },
    '8':  { num: 'text-rose-600 dark:text-rose-400',    border: 'border-rose-400',    badge: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800' },
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
      info:    'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/50 text-blue-900 dark:text-blue-200 border-l-blue-500',
      warning: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 border-l-amber-500',
      success: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-850/50 text-emerald-900 dark:text-emerald-200 border-l-emerald-500',
      exam:    'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/50 text-rose-900 dark:text-rose-200 border-l-rose-500',
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
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={`Open ICAI AS 17 PDF — ${para}`}
    >
      <FileText size={9} className="shrink-0" />
      {para} (p. {page})
    </button>
  )

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      {/* Sticky Section Sub-Navbar */}
      <div id="as17-standard-sticky-toc" className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <BookOpen size={9.5} />
          AS 17 Sections:
        </span>
        {as17Sections.map((sec) => (
          <button
            key={sec.id}
            data-sec-id={sec.id}
            onClick={() => handleSectionClick(sec.id)}
            className={`text-[9.5px] font-bold px-2 py-0.5 rounded border transition-all whitespace-nowrap cursor-pointer ${
              activeSection === sec.id
                ? 'bg-blue-600 border-blue-600 text-white dark:bg-blue-500 dark:border-blue-500'
                : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#1E2640] dark:hover:bg-slate-800 border-slate-200 dark:border-gray-700 text-slate-650 dark:text-gray-300'
            }`}
          >
            {sec.title.split('. ')[1] || sec.title}
          </button>
        ))}
      </div>

      {/* Main Content Card */}
      <div className="w-full space-y-7 bg-white dark:bg-[#111726] border border-slate-200 dark:border-gray-800 rounded-xl p-6 sm:p-8 shadow-xs text-[14px] sm:text-[14.5px] text-slate-700 dark:text-gray-300 leading-relaxed">
        
        {/* 1. Overview & Purpose */}
        <SecHeader id="as17-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Overview" /> Accounting Standard 17 establishes principles for reporting financial information by **segments**.
        </p>
        <p className="leading-relaxed">
          Segment Reporting provides details about the different types of products and services an enterprise produces and the different geographical areas in which it operates. This helps users of financial statements to better understand the enterprise's performance, evaluate its risks and returns, and make more informed judgments about the enterprise as a whole.
        </p>

        {/* 2. Scope & Applicability */}
        <SecHeader id="as17-scope" num="2" title="Scope &amp; Applicability (Para 1–4)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={4} para="Para 1" /> This standard is mandatory for enterprises whose equity or debt securities are **listed** or in the process of listing, and all other **Level I enterprises**.
        </p>
        <p className="leading-relaxed">
          If a single financial report contains both consolidated financial statements and separate financial statements of the parent, segment information needs to be presented only on the basis of the consolidated financial statements (Para 4).
        </p>

        {/* 3. Definitions */}
        <SecHeader id="as17-definitions" num="3" title="Definitions (Para 5)" />
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13.5px] border-collapse rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Term</th>
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">AS 17 Definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Segment Revenue</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Revenue reported in the enterprise's statement of profit and loss that is directly attributable to a segment, including inter-segment sales.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-950/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Segment Expense</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Expense resulting from the operating activities of a segment that is directly attributable to the segment, excluding interest expense and taxes.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Segment Assets</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Operating assets employed by a segment in its operating activities, excluding income tax assets.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. Business & Geographical Segments */}
        <SecHeader id="as17-business-geo" num="4" title="Business &amp; Geographical Segment Classification" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={5} para="Para 5" /> The standard divides segments into **Business Segments** and **Geographical Segments**.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('segmentTypes')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Business vs Geographical Segments</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.segmentTypes ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.segmentTypes && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed">
              <p><strong>Business Segment:</strong> A distinguishable component of an enterprise engaged in providing an individual product or service or a group of related products or services, and that is subject to risks and returns that are different from those of other business segments. Factors to consider:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>The nature of the products or services.</li>
                <li>The nature of the production processes.</li>
                <li>The type or class of customers.</li>
                <li>The methods used to distribute products.</li>
              </ul>
              <p><strong>Geographical Segment:</strong> A distinguishable component of an enterprise engaged in providing products or services within a particular economic environment and that is subject to risks and returns that are different from those of components operating in other economic environments.</p>
            </div>
          )}
        </div>

        {/* 5. Reportable Segments */}
        <SecHeader id="as17-reportable" num="5" title="Reportable Segments &amp; the 10% Thresholds" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={8} para="Para 27" /> A business segment or geographical segment should be identified as a **reportable segment** if it meets any of the three quantitative thresholds:
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('tenPercentTests')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">The 10% Quantitative Tests (Para 27)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.tenPercentTests ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.tenPercentTests && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2.5 leading-relaxed">
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Revenue Test:</strong> Its segment revenue (internal + external) is **10% or more** of the combined revenue of all segments.</li>
                <li><strong>Result Test:</strong> Its segment result (profit or loss) is **10% or more** of the greater (in absolute amount) of:
                  <ul className="list-disc pl-5 mt-1">
                    <li>The combined segment result of all segments in profit.</li>
                    <li>The combined segment result of all segments in loss.</li>
                  </ul>
                </li>
                <li><strong>Assets Test:</strong> Its segment assets are **10% or more** of the combined assets of all segments.</li>
              </ol>
            </div>
          )}
        </div>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('seventyFivePercentRule')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">The 75% External Revenue Rule (Para 33)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.seventyFivePercentRule ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.seventyFivePercentRule && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2 leading-relaxed">
              <p>If the total **external revenue** of reportable segments is **less than 75%** of the total enterprise revenue, additional segments must be identified as reportable segments (even if they fail the 10% tests) until at least 75% of the total enterprise revenue is included in reportable segments.</p>
            </div>
          )}
        </div>

        {/* 6. Segment Accounting Policies */}
        <SecHeader id="as17-policies" num="6" title="Segment Accounting Policies (Para 35–42)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={10} para="Para 35" /> Segment information should be prepared in conformity with the accounting policies adopted for preparing and presenting the financial statements of the **enterprise**.
        </p>
        <p className="leading-relaxed">
          It is assumed that the accounting policies that the directors and management have chosen for use in preparing the consolidated or enterprise-wide financial statements are those that they believe are most appropriate.
        </p>

        {/* 7. Primary Reporting Disclosures */}
        <SecHeader id="as17-primary" num="7" title="Primary Reporting Disclosures" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={11} para="Para 38" /> An enterprise must disclose the following for each reportable segment under its **primary reporting format**:
        </p>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40 text-[13.5px] space-y-2">
          <ul className="list-disc pl-5 space-y-1">
            <li>Segment Revenue (distinguishing external vs inter-segment revenue).</li>
            <li>Segment Result (profit or loss).</li>
            <li>Total carrying amount of Segment Assets.</li>
            <li>Total carrying amount of Segment Liabilities.</li>
            <li>Cost incurred during the period to acquire segment assets (tangible &amp; intangible).</li>
            <li>Depreciation and amortization expense.</li>
            <li>Non-cash expenses other than depreciation.</li>
            <li>Reconciliation of segment revenue, result, assets, and liabilities with enterprise-wide totals.</li>
          </ul>
        </div>

        {/* 8. Secondary Reporting Disclosures */}
        <SecHeader id="as17-secondary" num="8" title="Secondary Reporting Disclosures (Para 47–48)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={12} para="Para 47" /> If the primary format is Business Segments, the secondary format disclosures are required for Geographical Segments:
        </p>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40 text-[13.5px] space-y-2">
          <ul className="list-disc pl-5 space-y-1">
            <li>Segment revenue from external customers by geographical location of customers (if 10% or more).</li>
            <li>Total carrying amount of segment assets by geographical location of assets (if 10% or more).</li>
            <li>Cost incurred to acquire segment assets by geographical location of assets (if 10% or more).</li>
          </ul>
        </div>

      </div>
    </div>
  )
}


const as18Sections = [
  { id: 'as18-overview',          title: '1. Overview & Purpose' },
  { id: 'as18-scope',             title: '2. Scope & Applicability (Para 1–9)' },
  { id: 'as18-definitions',       title: '3. Definitions (Para 10)' },
  { id: 'as18-relationships',     title: '4. Related Party Relationships (Para 10)' },
  { id: 'as18-exceptions',        title: '5. Non-Related Party Exceptions (Para 4)' },
  { id: 'as18-transaction',       title: '6. Related Party Transactions (Para 11–13)' },
  { id: 'as18-control-disclosure',title: '7. Control Relationship Disclosures (Para 20)' },
  { id: 'as18-transaction-disclosure',title: '8. Transaction Disclosures (Para 23–26)' },
]

interface AS18StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
}

function AS18StandardTabContent({ navigateToPdfPage }: AS18StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as18-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    relationshipsList: true,
    exceptionsList: true,
    controlDisclosures: true,
    transactionDisclosures: true,
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as18-standard-sticky-toc')
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
    if (as18Sections[0]?.id === activeSection) {
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
      as18Sections.forEach(s => {
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
    '1':  { num: 'text-blue-600 dark:text-blue-400',    border: 'border-blue-400',    badge: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800' },
    '2':  { num: 'text-teal-600 dark:text-teal-400',    border: 'border-teal-400',    badge: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-800' },
    '3':  { num: 'text-indigo-600 dark:text-indigo-400',border: 'border-indigo-400',  badge: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800' },
    '4':  { num: 'text-emerald-600 dark:text-emerald-400',border:'border-emerald-400',badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800' },
    '5':  { num: 'text-cyan-600 dark:text-cyan-400',    border: 'border-cyan-400',    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-455 dark:border-cyan-800' },
    '6':  { num: 'text-violet-600 dark:text-violet-400',border: 'border-violet-400',  badge: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800' },
    '7':  { num: 'text-amber-600 dark:text-amber-400',  border: 'border-amber-400',   badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800' },
    '8':  { num: 'text-rose-600 dark:text-rose-400',    border: 'border-rose-400',    badge: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800' },
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
      info:    'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/50 text-blue-900 dark:text-blue-200 border-l-blue-500',
      warning: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 border-l-amber-500',
      success: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-850/50 text-emerald-900 dark:text-emerald-200 border-l-emerald-500',
      exam:    'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/50 text-rose-900 dark:text-rose-200 border-l-rose-500',
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
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={`Open ICAI AS 18 PDF — ${para}`}
    >
      <FileText size={9} className="shrink-0" />
      {para} (p. {page})
    </button>
  )

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      {/* Sticky Section Sub-Navbar */}
      <div id="as18-standard-sticky-toc" className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <BookOpen size={9.5} />
          AS 18 Sections:
        </span>
        {as18Sections.map((sec) => (
          <button
            key={sec.id}
            data-sec-id={sec.id}
            onClick={() => handleSectionClick(sec.id)}
            className={`text-[9.5px] font-bold px-2 py-0.5 rounded border transition-all whitespace-nowrap cursor-pointer ${
              activeSection === sec.id
                ? 'bg-blue-600 border-blue-600 text-white dark:bg-blue-500 dark:border-blue-500'
                : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#1E2640] dark:hover:bg-slate-800 border-slate-200 dark:border-gray-700 text-slate-650 dark:text-gray-300'
            }`}
          >
            {sec.title.split('. ')[1] || sec.title}
          </button>
        ))}
      </div>

      {/* Main Content Card */}
      <div className="w-full space-y-7 bg-white dark:bg-[#111726] border border-slate-200 dark:border-gray-800 rounded-xl p-6 sm:p-8 shadow-xs text-[14px] sm:text-[14.5px] text-slate-700 dark:text-gray-300 leading-relaxed">
        
        {/* 1. Overview & Purpose */}
        <SecHeader id="as18-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Overview" /> Accounting Standard 18 governs the disclosure of **related party relationships and transactions**.
        </p>
        <p className="leading-relaxed">
          The purpose of related party disclosures is to ensure that the financial statements contain the disclosures necessary to draw attention to the possibility that the enterprise's financial position and profit or loss may have been affected by the existence of related parties and by transactions and outstanding balances with such parties.
        </p>

        {/* 2. Scope & Applicability */}
        <SecHeader id="as18-scope" num="2" title="Scope &amp; Applicability (Para 1–9)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={4} para="Para 1" /> This standard should be applied in reporting related party relationships and transactions between a **reporting enterprise** and its related parties.
        </p>
        <p className="leading-relaxed">
          It applies to both consolidated financial statements and separate financial statements. It is mandatory for all Level I and listed enterprises, and Level II/III enterprises have some disclosure relaxations.
        </p>

        {/* 3. Definitions */}
        <SecHeader id="as18-definitions" num="3" title="Definitions (Para 10)" />
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13.5px] border-collapse rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Term</th>
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">AS 18 Definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Related Party</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Parties are considered to be related if at any time during the reporting period one party has the ability to control the other party or exercise significant influence over the other party in making financial and/or operating decisions.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-950/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Control</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Ownership, directly or indirectly, of more than one-half of the voting power of an enterprise, or control of the composition of the board of directors.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Significant Influence</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Participation in the financial and/or operating policy decisions of an enterprise, but not control of those policies. Usually presumed if voting power is 20% or more.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-950/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Relative</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Spouse, father, mother, brother, sister, son, or daughter of an individual.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. Related Party Relationships */}
        <SecHeader id="as18-relationships" num="4" title="The 5 Related Party Categories (Para 10)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={5} para="Para 10" /> AS 18 strictly covers only the following 5 categories of related party relationships:
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('relationshipsList')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">The 5 Related Party Categories (Para 10(a)–(e))</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.relationshipsList ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.relationshipsList && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed">
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Parent &amp; Subsidiaries:</strong> Holding companies, subsidiaries, and fellow subsidiaries (under common control).</li>
                <li><strong>Associates &amp; Joint Ventures:</strong> Investment where investor has significant influence (20%+ voting interest) or joint control.</li>
                <li><strong>Controlling/Influential Individuals:</strong> Individuals owning an interest in voting power that gives them control or significant influence, and their **relatives**.</li>
                <li><strong>Key Management Personnel (KMP):</strong> Directors and executive officers who manage the enterprise (e.g. CEO/MD), and their **relatives**.</li>
                <li><strong>KMP-Owned Enterprises:</strong> Enterprises over which any individual described in (3) or (4) is able to exercise significant influence.</li>
              </ol>
            </div>
          )}
        </div>

        {/* 5. Exceptions */}
        <SecHeader id="as18-exceptions" num="5" title="Non-Related Party Exceptions (Para 4)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={4} para="Para 4" /> The standard lists certain relationships which are **not** related parties simply by definition:
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('exceptionsList')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Excluded Relationships</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.exceptionsList ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.exceptionsList && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2 leading-relaxed">
              <ul className="list-disc pl-5 space-y-1">
                <li>Two providers of finance, trade unions, public utilities, government departments simply by virtue of their normal dealings.</li>
                <li>A single customer, supplier, franchisor, distributor, or general agent with whom an enterprise transacts a significant volume of business.</li>
                <li>Two companies simply because they have a **director in common** (unless the director is a KMP who controls both companies).</li>
              </ul>
            </div>
          )}
        </div>

        {/* 6. Related Party Transactions */}
        <SecHeader id="as18-transaction" num="6" title="Related Party Transactions (Para 11–13)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={6} para="Para 11" /> A **related party transaction** is a transfer of resources or obligations between related parties, regardless of whether a price is charged.
        </p>
        <p className="leading-relaxed">
          Examples include purchases/sales of goods, rendering of services, leasing arrangements, agency agreements, transfer of research and development, license agreements, finance/loans, guarantees, and management contracts.
        </p>

        {/* 7. Control Relationship Disclosures */}
        <SecHeader id="as18-control-disclosure" num="7" title="Control Relationship Disclosures (Para 20)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={7} para="Para 20" /> Related party relationships where **control** exists should be disclosed in the financial statements **irrespective of whether there have been transactions** between the related parties.
        </p>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40 text-[13.5px] space-y-2">
          <h4 className="font-bold text-slate-950 dark:text-white text-xs mb-1.5 uppercase tracking-wide">Required Disclosures for Control:</h4>
          <p>The **name** of the related party and the **nature** of the related party relationship must be disclosed even if transactions are nil.</p>
        </div>

        {/* 8. Transaction Disclosures */}
        <SecHeader id="as18-transaction-disclosure" num="8" title="Transaction Disclosure Requirements (Para 23–26)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={8} para="Para 23" /> If there have been transactions between related parties, the reporting enterprise should disclose:
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('transactionDisclosures')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Disclosures for Related Party Transactions</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.transactionDisclosures ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.transactionDisclosures && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2.5 leading-relaxed">
              <ul className="list-disc pl-5 space-y-1">
                <li>The name of the transacting related party.</li>
                <li>A description of the relationship.</li>
                <li>A description of the nature of transactions.</li>
                <li>The **volume of the transactions** (either as an amount or as an appropriate proportion).</li>
                <li>Any other elements of the transactions necessary for an understanding (e.g. pricing policies).</li>
                <li>The **outstanding balances** at the balance sheet date, and provisions for doubtful debts.</li>
                <li>Amounts written off or written back during the period in respect of debts due from related parties.</li>
              </ul>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}


const as19Sections = [
  { id: 'as19-overview',          title: '1. Overview & Purpose' },
  { id: 'as19-scope',             title: '2. Scope & Exclusions (Para 1)' },
  { id: 'as19-definitions',       title: '3. Definitions (Para 3)' },
  { id: 'as19-classification',    title: '4. Lease Classification (Para 5–9)' },
  { id: 'as19-lessee-finance',    title: '5. Lessee Finance Leases (Para 11–20)' },
  { id: 'as19-lessee-operating',  title: '6. Lessee Operating Leases (Para 23–25)' },
  { id: 'as19-lessor-accounting', title: '7. Lessor Accounting (Para 26–46)' },
  { id: 'as19-sale-leaseback',    title: '8. Sale & Leaseback (Para 47–52)' },
]

interface AS19StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
}

function AS19StandardTabContent({ navigateToPdfPage }: AS19StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as19-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    indicatorsList: true,
    lesseeFinanceRules: true,
    lessorFinanceRules: true,
    saleLeasebackRules: true,
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as19-standard-sticky-toc')
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
    if (as19Sections[0]?.id === activeSection) {
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
      as19Sections.forEach(s => {
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
    '1':  { num: 'text-blue-600 dark:text-blue-400',    border: 'border-blue-400',    badge: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800' },
    '2':  { num: 'text-teal-600 dark:text-teal-400',    border: 'border-teal-400',    badge: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-800' },
    '3':  { num: 'text-indigo-600 dark:text-indigo-400',border: 'border-indigo-400',  badge: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800' },
    '4':  { num: 'text-emerald-600 dark:text-emerald-400',border:'border-emerald-400',badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800' },
    '5':  { num: 'text-cyan-600 dark:text-cyan-400',    border: 'border-cyan-400',    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-455 dark:border-cyan-800' },
    '6':  { num: 'text-violet-600 dark:text-violet-400',border: 'border-violet-400',  badge: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800' },
    '7':  { num: 'text-amber-600 dark:text-amber-400',  border: 'border-amber-400',   badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800' },
    '8':  { num: 'text-rose-600 dark:text-rose-400',    border: 'border-rose-400',    badge: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800' },
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
      info:    'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/50 text-blue-900 dark:text-blue-200 border-l-blue-500',
      warning: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 border-l-amber-500',
      success: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-850/50 text-emerald-900 dark:text-emerald-200 border-l-emerald-500',
      exam:    'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/50 text-rose-900 dark:text-rose-200 border-l-rose-500',
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
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={`Open ICAI AS 19 PDF — ${para}`}
    >
      <FileText size={9} className="shrink-0" />
      {para} (p. {page})
    </button>
  )

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      {/* Sticky Section Sub-Navbar */}
      <div id="as19-standard-sticky-toc" className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <BookOpen size={9.5} />
          AS 19 Sections:
        </span>
        {as19Sections.map((sec) => (
          <button
            key={sec.id}
            data-sec-id={sec.id}
            onClick={() => handleSectionClick(sec.id)}
            className={`text-[9.5px] font-bold px-2 py-0.5 rounded border transition-all whitespace-nowrap cursor-pointer ${
              activeSection === sec.id
                ? 'bg-blue-600 border-blue-600 text-white dark:bg-blue-500 dark:border-blue-500'
                : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#1E2640] dark:hover:bg-slate-800 border-slate-200 dark:border-gray-700 text-slate-650 dark:text-gray-300'
            }`}
          >
            {sec.title.split('. ')[1] || sec.title}
          </button>
        ))}
      </div>

      {/* Main Content Card */}
      <div className="w-full space-y-7 bg-white dark:bg-[#111726] border border-slate-200 dark:border-gray-800 rounded-xl p-6 sm:p-8 shadow-xs text-[14px] sm:text-[14.5px] text-slate-700 dark:text-gray-300 leading-relaxed">
        
        {/* 1. Overview & Purpose */}
        <SecHeader id="as19-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Overview" /> Accounting Standard 19 sets out the accounting policies and disclosures applicable to **leases**.
        </p>
        <p className="leading-relaxed">
          Leasing is a popular mechanism to acquire the use of land, buildings, machinery, and equipment. The standard requires leases to be classified into Finance Leases (resembling an asset purchase financed by a loan) and Operating Leases (resembling a simple rental contract), prescribing distinct treatments for lessees and lessors.
        </p>

        {/* 2. Scope & Exclusions */}
        <SecHeader id="as19-scope" num="2" title="Scope &amp; Exclusions (Para 1)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={4} para="Para 1" /> This standard should be applied in accounting for all leases, **except**:
        </p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>Lease agreements to explore for or use natural resources (oil, gas, timber, metal).</li>
          <li>Licensing agreements for motion pictures, patents, copyrights, and video recordings.</li>
          <li>Lease agreements to use **land** (which are treated under general principles or distinct standards).</li>
        </ul>

        {/* 3. Definitions */}
        <SecHeader id="as19-definitions" num="3" title="Definitions (Para 3)" />
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13.5px] border-collapse rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Term</th>
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">AS 19 Definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Lease</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">An agreement whereby the lessor conveys to the lessee in return for a payment or series of payments the right to use an asset for an agreed period of time.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-950/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Finance Lease</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">A lease that transfers substantially all the risks and rewards incidental to ownership of an asset. Title may or may not eventually be transferred.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Minimum Lease Payments</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Payments over the lease term that the lessee is, or can be, required to make, excluding contingent rent, costs for services, and taxes, plus any residual value guaranteed by or on behalf of the lessee.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. Lease Classification */}
        <SecHeader id="as19-classification" num="4" title="Lease Classification Criteria (Para 5–9)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={5} para="Para 6" /> Whether a lease is a finance lease or an operating lease depends on the **substance of the transaction** rather than the form of the contract.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('indicatorsList')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">The 5 Finance Lease Indicators (Para 8)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.indicatorsList ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.indicatorsList && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed">
              <p>Under AS 19, a lease is classified as a **Finance Lease** if it meets one or more of the following conditions:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Transfer of Ownership:</strong> The lease transfers ownership of the asset to the lessee by the end of the lease term.</li>
                <li><strong>Bargain Purchase Option:</strong> The lessee has the option to purchase the asset at a price which is expected to be sufficiently lower than the fair value.</li>
                <li><strong>Major Life Test:</strong> The lease term is for the **major part of the economic life** of the asset (commonly 75% or more) even if title is not transferred.</li>
                <li><strong>Substantial Value Test:</strong> At the inception of the lease, the present value of the minimum lease payments amounts to at least **substantially all of the fair value** of the leased asset (commonly 90% or more).</li>
                <li><strong>Specialized Assets:</strong> The leased assets are of such a specialized nature that only the lessee can use them without major modifications.</li>
              </ol>
            </div>
          )}
        </div>

        {/* 5. Lessee Finance Leases */}
        <SecHeader id="as19-lessee-finance" num="5" title="Accounting in Lessee Books: Finance Leases (Para 11–20)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={6} para="Para 11" /> At the inception of a finance lease, the lessee should recognize the lease as an asset and a liability at an amount equal to the **fair value** of the leased asset or, if lower, the **present value of the minimum lease payments**.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('lesseeFinanceRules')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Lessee Accounting Rules</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.lesseeFinanceRules ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.lesseeFinanceRules && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2.5 leading-relaxed">
              <p><strong>Discount Factor:</strong> The discount rate to be used in calculating the present value of the minimum lease payments is the **interest rate implicit in the lease** (if determinable); otherwise, the lessee's incremental borrowing rate is used.</p>
              <p><strong>Depreciation (Para 16):</strong> A finance lease gives rise to depreciation expense for the asset as well as finance expense for each accounting period. The depreciation policy should be consistent with that for owned assets (depreciate over useful life if ownership transfers; otherwise, over the shorter of lease term and useful life).</p>
            </div>
          )}
        </div>

        {/* 6. Lessee Operating Leases */}
        <SecHeader id="as19-lessee-operating" num="6" title="Accounting in Lessee Books: Operating Leases (Para 23–25)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={7} para="Para 23" /> Lease payments under an operating lease should be recognized as an expense in the statement of profit and loss on a **straight-line basis** over the lease term.
        </p>
        <NoteBox type="warning" title="Inflation Escalation Exception">
          If the lease rentals are structured to increase in line with expected general inflation to compensate the lessor for expected inflationary cost increases, straight-lining is **not** required.
        </NoteBox>

        {/* 7. Lessor Accounting */}
        <SecHeader id="as19-lessor-accounting" num="7" title="Accounting in Lessor Books (Para 26–46)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={8} para="Para 26" /> The lessor should recognize assets held under a finance lease in their balance sheet and present them as a **receivable** at an amount equal to the net investment in the lease.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('lessorFinanceRules')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Lessor Accounting Rules (Finance Lease)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.lessorFinanceRules ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.lessorFinanceRules && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2 leading-relaxed">
              <p><strong>Receivable Recognition:</strong> The lease receivable represents the Net Investment in the lease, which is equal to the present value of Gross Investment (MLP + URV) discounted at the implicit interest rate.</p>
              <p><strong>Finance Income (Para 30):</strong> The recognition of finance income should be based on a pattern reflecting a constant periodic rate of return on the lessor's net investment outstanding in respect of the finance lease.</p>
            </div>
          )}
        </div>

        {/* 8. Sale & Leaseback */}
        <SecHeader id="as19-sale-leaseback" num="8" title="Sale &amp; Leaseback Transactions (Para 47–52)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={11} para="Para 47" /> A sale and leaseback transaction involves the sale of an asset and the immediate leasing back of the same asset. The accounting treatment depends on the type of leaseback:
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('saleLeasebackRules')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Rules for Sale &amp; Leaseback</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.saleLeasebackRules ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.saleLeasebackRules && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed">
              <p><strong>1. Resulting in a Finance Lease (Para 48):</strong> Any excess of sale proceeds over the carrying amount should **not** be immediately recognized as income in the financial statements of a seller-lessee. Instead, it should be **deferred and amortized** over the lease term in proportion to the depreciation of the leased asset.</p>
              <p><strong>2. Resulting in an Operating Lease (Para 50):</strong> If the transaction is established at fair value, any profit or loss should be recognized **immediately**. If sale price is below fair value, profit/loss is recognized immediately except that a loss compensated by future lease payments is deferred and amortized.</p>
            </div>
          )}
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
  const [activeTab, setActiveTab] = useState<'standard' | 'examples' | 'lecture' | 'pdf'>('standard')
  const [lastActiveBaseTab, setLastActiveBaseTab] = useState<'standard' | 'examples'>('standard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [selectedStandardDetails, setSelectedStandardDetails] = useState<Standard>(initialSelectedStandardDetails)
  const [loadedStandards, setLoadedStandards] = useState<Record<string, Standard>>({
    [initialSelectedStandardDetails.id]: initialSelectedStandardDetails
  })
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)

  useEffect(() => {
    if (activeTab === 'standard' || activeTab === 'examples') {
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
          className="inline-flex items-center justify-center w-4 h-4 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/45 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded transition-all cursor-pointer select-none align-middle"
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
      <main id="as1-scroll-container" className="flex-1 flex flex-col bg-[#FAFAF8] dark:bg-[#0B0F19] overflow-y-auto h-full">
        
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

            {(activeTab === 'standard' || activeTab === 'examples') && (
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
        <div className={`flex-1 w-full max-w-none flex flex-col ${activeTab === 'pdf' || activeTab === 'lecture' || ((activeTab === 'standard' || activeTab === 'examples') && ['as-1', 'as-2', 'as-3', 'as-4', 'as-5', 'as-7', 'as-9', 'as-10', 'as-11', 'as-12', 'as-13', 'as-14', 'as-15', 'as-16', 'as-17', 'as-18', 'as-19', 'as-20', 'as-21', 'as-22', 'as-23', 'as-24', 'as-25', 'as-26', 'as-27', 'as-28', 'as-29'].includes(currentStandard.id)) ? 'p-0' : 'p-4 md:p-6'}`}>

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
                  {currentStandard.blocks && Array.isArray(currentStandard.blocks) && currentStandard.blocks.length > 0 && !['as-1', 'as-2', 'as-3', 'as-4', 'as-5', 'as-7', 'as-9', 'as-10', 'as-11', 'as-12', 'as-13', 'as-14', 'as-15', 'as-16', 'as-17', 'as-18', 'as-19', 'as-20', 'as-21', 'as-22', 'as-23', 'as-24', 'as-25', 'as-26', 'as-27', 'as-28', 'as-29'].includes(currentStandard.id) ? (
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
                              <div key={blockIdx} className={`text-slate-900 dark:text-gray-200 leading-relaxed ${
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
                                <div className={`text-slate-900 dark:text-gray-300 leading-relaxed font-medium ${framework === 'AS' ? 'text-[16px] sm:text-[17px]' : 'text-[14.5px] sm:text-[15.5px]'}`}>{renderTextWithReferences(block.body)}</div>
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
                                <div className="text-xs text-slate-900 dark:text-gray-300 leading-relaxed font-semibold">{renderTextWithReferences(block.body)}</div>
                              </div>
                            )
                          case 'EXAMPLE':
                          case 'ILLUSTRATION':
                            return (
                              <div key={blockIdx} className={`border dark:border-gray-800 rounded-2xl bg-[#FAFAF8]/55 dark:bg-[#1E2640]/30 shadow-xs space-y-4 ${
                                framework === 'AS' ? 'p-8 mb-8 border-[#C5C3BC]' : 'p-5 mb-4 border-[#E2E1DD]'
                              }`}>
                                <h3 className={`font-bold text-[#2D5BE3] dark:text-[#60A5FA] ${framework === 'AS' ? 'text-[17.5px] mb-3' : 'text-xs mb-2'}`}>📋 Example: {block.title}</h3>
                                <div className={`text-slate-900 dark:text-gray-300 leading-relaxed ${framework === 'AS' ? 'text-[15.5px] sm:text-[16.5px]' : 'text-xs'}`}>
                                  <strong>Scenario: </strong>{renderTextWithReferences(block.scenario)}
                                </div>
                                {block.working && (
                                  <div className={`text-slate-900 dark:text-gray-400 leading-relaxed ${framework === 'AS' ? 'text-[15.5px] sm:text-[16.5px]' : 'text-xs'}`}>
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
                                    <tr className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-gray-400 border-b border-[#E2E1DD] dark:border-gray-800">
                                      {(block.headers || []).map((header: string, hIdx: number) => (
                                        <th key={hIdx} className="p-3 font-bold">{header}</th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-[#E2E1DD] dark:divide-gray-800">
                                    {(block.rows || []).map((row: string[], rIdx: number) => (
                                      <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/40">
                                        {row.map((cell: string, cIdx: number) => (
                                          <td key={cIdx} className="p-3 text-slate-900 dark:text-gray-300 leading-relaxed font-semibold">
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
                                <div className="text-xs text-slate-900 dark:text-gray-300 leading-relaxed font-semibold">
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
                  ) : currentStandard.id === 'as-2' ? (
                    <AS2StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                      renderTextWithReferences={renderTextWithReferences}
                    />
                  ) : currentStandard.id === 'as-3' ? (
                    <AS3StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                    />
                  ) : currentStandard.id === 'as-4' ? (
                    <AS4StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                    />
                  ) : currentStandard.id === 'as-5' ? (
                    <AS5StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                    />
                  ) : currentStandard.id === 'as-7' ? (
                    <AS7StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                    />
                  ) : currentStandard.id === 'as-9' ? (
                    <AS9StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                      renderTextWithReferences={renderTextWithReferences}
                    />
                  ) : currentStandard.id === 'as-10' ? (
                    <AS10StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                      renderTextWithReferences={renderTextWithReferences}
                    />
                  ) : currentStandard.id === 'as-11' ? (
                    <AS11StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                    />
                  ) : currentStandard.id === 'as-12' ? (
                    <AS12StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                    />
                  ) : currentStandard.id === 'as-13' ? (
                    <AS13StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                    />
                  ) : currentStandard.id === 'as-14' ? (
                    <AS14StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                    />
                  ) : currentStandard.id === 'as-15' ? (
                    <AS15StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                    />
                  ) : currentStandard.id === 'as-16' ? (
                    <AS16StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                    />
                  ) : currentStandard.id === 'as-17' ? (
                    <AS17StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                    />
                  ) : currentStandard.id === 'as-18' ? (
                    <AS18StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                    />
                  ) : currentStandard.id === 'as-19' ? (
                    <AS19StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                    />
                  ) : currentStandard.id === 'as-20' ? (
                    <AS20StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                    />
                  ) : currentStandard.id === 'as-21' ? (
                    <AS21StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                    />
                  ) : currentStandard.id === 'as-22' ? (
                    <AS22StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                    />
                  ) : currentStandard.id === 'as-23' ? (
                    <AS23StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                    />
                  ) : currentStandard.id === 'as-24' ? (
                    <AS24StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                    />
                  ) : currentStandard.id === 'as-25' ? (
                    <AS25StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                    />
                  ) : currentStandard.id === 'as-26' ? (
                    <AS26StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                    />
                  ) : currentStandard.id === 'as-27' ? (
                    <AS27StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                    />
                  ) : currentStandard.id === 'as-28' ? (
                    <AS28StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                    />
                  ) : currentStandard.id === 'as-29' ? (
                    <AS29StandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
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
                              <div className="text-xs text-slate-900 dark:text-gray-300 leading-relaxed italic mb-2">
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
                                  <li key={itemIdx} className="text-xs text-slate-900 dark:text-gray-300 flex items-start gap-2.5 leading-relaxed font-semibold">
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

                    {/* Comparison Table Removed */}

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
              ) : currentStandard.id === 'as-2' ? (
                <AS2ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-3' ? (
                <AS3ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-4' ? (
                <AS4ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-5' ? (
                <AS5ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-9' ? (
                <AS9ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-10' ? (
                <AS10ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-7' ? (
                <AS7ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-11' ? (
                <AS11ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-12' ? (
                <AS12ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-13' ? (
                <AS13ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-14' ? (
                <AS14ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-15' ? (
                <AS15ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-16' ? (
                <AS16ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-17' ? (
                <AS17ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-18' ? (
                <AS18ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-19' ? (
                <AS19ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-20' ? (
                <AS20ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-21' ? (
                <AS21ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-22' ? (
                <AS22ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-23' ? (
                <AS23ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-24' ? (
                <AS24ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-25' ? (
                <AS25ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-26' ? (
                <AS26ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-27' ? (
                <AS27ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-28' ? (
                <AS28ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.id === 'as-29' ? (
                <AS29ExamplesCustomContent
                  navigateToPdfPage={navigateToPdfPage}
                  renderTextWithReferences={renderTextWithReferences}
                />
              ) : currentStandard.examplesHtml ? (
                <div 
                  className="w-full bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-2xl p-6 sm:p-10 shadow-xs font-sans prose dark:prose-invert max-w-none
                    [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-bold [&_h2]:text-[#1C1C1E] [&_h2]:dark:text-white [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-gray-100 [&_h2]:dark:border-gray-800 [&_h2]:mt-8 [&_h2]:mb-4
                    [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:dark:text-slate-100 [&_h3]:mt-6 [&_h3]:mb-3
                    [&_p]:text-[15px] [&_p]:sm:text-[16px] [&_p]:text-slate-900 [&_p]:dark:text-gray-300 [&_p]:leading-relaxed [&_p]:mb-4
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
                    [&_li]:text-[15px] [&_li]:text-slate-900 [&_li]:dark:text-gray-300 [&_li]:leading-relaxed [&_li]:mb-1.5
                    [&_blockquote]:border-l-4 [&_blockquote]:border-[#2D5BE3] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-slate-600 [&_blockquote]:dark:text-gray-400
                    [&_table]:w-full [&_table]:text-left [&_table]:text-xs [&_table]:border-collapse [&_table]:border [&_table]:border-[#E2E1DD] [&_table]:dark:border-gray-800 [&_table]:rounded-xl [&_table]:overflow-hidden [&_table]:mb-6
                    [&_th]:bg-slate-50 [&_th]:dark:bg-slate-850 [&_th]:p-3 [&_th]:font-bold [&_th]:border-b [&_th]:border-[#E2E1DD] [&_th]:dark:border-gray-850
                    [&_td]:p-3 [&_td]:text-slate-900 [&_td]:dark:text-gray-300 [&_td]:border-b [&_td]:border-[#E2E1DD] [&_td]:dark:border-gray-850
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


