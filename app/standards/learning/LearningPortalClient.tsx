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
      className="inline-flex items-center justify-center w-4 h-4 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-955/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-650 dark:text-red-400 rounded transition-all cursor-pointer select-none align-middle"
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
const as2Sections = [
  { id: 'as2-overview',        title: '1. Introduction & Purpose' },
  { id: 'as2-scope',           title: '2. Scope (Para 1)' },
  { id: 'as2-definitions',     title: '3. Definitions (Para 2)' },
  { id: 'as2-measurement',     title: '4. Measurement (Para 3)' },
  { id: 'as2-cost-purchase',   title: '5. Cost of Purchase (Para 5)' },
  { id: 'as2-cost-conversion', title: '6. Cost of Conversion (Para 6)' },
  { id: 'as2-other-costs',     title: '7. Other Costs (Para 7)' },
  { id: 'as2-excluded',        title: '8. Excluded Costs (Para 8)' },
  { id: 'as2-service',         title: '9. Service Providers (Para 9)' },
  { id: 'as2-formulas',        title: '10. Cost Formulas (Para 10ΓÇô13)' },
  { id: 'as2-nrv',             title: '11. NRV (Para 14ΓÇô17)' },
  { id: 'as2-recognition',     title: '12. Recognition (Para 18)' },
  { id: 'as2-disclosure',      title: '13. Disclosure (Para 19)' },
  { id: 'as2-comparison',      title: '14. AS 2 vs Ind AS 2' },
]

interface AS2StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences: (text: string) => React.ReactNode;
}

function AS2StandardTabContent({ navigateToPdfPage }: AS2StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as2-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    fifo: true,
    wa: true,
    specid: false,
    joint: false,
    rmWriteDown: true
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as2-standard-sticky-toc')
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
    if (as2Sections[0]?.id === activeSection) {
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
      as2Sections.forEach(s => {
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
    '5':  { num: 'text-cyan-600 dark:text-cyan-400',    border: 'border-cyan-400',    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-400 dark:border-cyan-800' },
    '6':  { num: 'text-violet-600 dark:text-violet-400',border: 'border-violet-400',  badge: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800' },
    '7':  { num: 'text-amber-600 dark:text-amber-400',  border: 'border-amber-400',   badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800' },
    '8':  { num: 'text-red-600 dark:text-red-400',      border: 'border-red-400',     badge: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800' },
    '9':  { num: 'text-fuchsia-600 dark:text-fuchsia-400',border:'border-fuchsia-400',badge: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-950/40 dark:text-fuchsia-400 dark:border-fuchsia-800' },
    '10': { num: 'text-sky-600 dark:text-sky-400',      border: 'border-sky-400',     badge: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800' },
    '11': { num: 'text-orange-600 dark:text-orange-400',border: 'border-orange-400',  badge: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-800' },
    '12': { num: 'text-lime-600 dark:text-lime-400',    border: 'border-lime-400',    badge: 'bg-lime-50 text-lime-700 border-lime-200 dark:bg-lime-950/40 dark:text-lime-400 dark:border-lime-805' },
    '13': { num: 'text-rose-600 dark:text-rose-400',    border: 'border-rose-400',    badge: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800' },
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
      success: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200 border-l-emerald-500',
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
      title={`Open ICAI AS 2 PDF — ${para}`}
    >
      <FileText size={9} className="shrink-0" />
      {para} (p. {page})
    </button>
  )

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      {/* Sticky Section Sub-Navbar */}
      <div id="as2-standard-sticky-toc" className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <BookOpen size={9.5} />
          AS 2 Sections:
        </span>
        {as2Sections.map((sec) => (
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
        
        {/* 1. Introduction */}
        <SecHeader id="as2-overview" num="1" title="Introduction &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Introduction" /> Valuation of inventories is of critical significance in accounting because the valuation method directly affects both the <strong>Balance Sheet</strong> (assets) and the <strong>Profit &amp; Loss Statement</strong> (cost of sales and net profit).
        </p>
        <p className="leading-relaxed">
          The primary objective of Accounting Standard 2 is to prescribe the treatment for inventories under the historical cost system. It provides detailed guidance for:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          <div className="p-4 rounded-xl border border-slate-100 dark:border-gray-800 bg-slate-50/50 dark:bg-slate-900/30">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-1.5 text-blue-600">Determining Inventory Cost</h4>
            <p className="text-[13px] text-slate-600 dark:text-gray-400">Rules for compiling cost of purchase, cost of conversion, and other costs incurred in bringing the inventories to their present location and condition.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-100 dark:border-gray-800 bg-slate-50/50 dark:bg-slate-900/30">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-1.5 text-teal-600">Writing down to NRV</h4>
            <p className="text-[13px] text-slate-600 dark:text-gray-400">Determining when the cost of inventory is not recoverable (due to obsolescence, damage, or falling prices) and must be written down to its Net Realisable Value.</p>
          </div>
        </div>

        {/* 2. Scope */}
        <SecHeader id="as2-scope" num="2" title="Scope &amp; Exclusions" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Para 1" /> This standard applies in valuing inventories for financial statements <strong>except</strong> in the following specific cases:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13.5px] border-collapse rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Exclusion Category</th>
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Applicable Standard / Treatment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Work-in-progress under construction contracts</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Excluded — Valued under <strong>AS 7 (Construction Contracts)</strong></td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Work-in-progress of service providers</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Included — Valued under AS 2 (measured in accordance with Para 9)</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Shares, debentures and other financial instruments held as stock-in-trade</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Excluded — Valued under <strong>AS 13 (Accounting for Investments)</strong></td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Producers' inventories of livestock, agricultural/forest products, mineral oils, ores</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Excluded — Valued at net realisable value in accordance with established industry practices</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-950/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Land held for sale by property developers</td>
                <td className="p-3 text-slate-700 dark:text-slate-300 font-semibold text-blue-600 dark:text-blue-400">INCLUDED — Land or building held by developers is treated as inventory under AS 2!</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 3. Definitions */}
        <SecHeader id="as2-definitions" num="3" title="Definitions" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Para 2" /> <strong>Inventories</strong> are assets:
        </p>
        <div className="space-y-3 mb-6 pl-4 border-l-2 border-slate-200 dark:border-gray-800">
          <p className="leading-relaxed">
            <strong className="text-slate-950 dark:text-white">① Held for sale</strong> in the ordinary course of business (Finished Goods).
          </p>
          <p className="leading-relaxed">
            <strong className="text-slate-950 dark:text-white">② In the process of production</strong> for such sale (Work-in-Progress).
          </p>
          <p className="leading-relaxed">
            <strong className="text-slate-950 dark:text-white">③ In the form of materials or supplies</strong> to be consumed in the production process or in the rendering of services (Raw Materials, Consumables, Stores &amp; Spares).
          </p>
        </div>

        <NoteBox type="info" title="Net Realisable Value (NRV) vs. Fair Value">
          <p><strong>Net Realisable Value</strong> is the estimated selling price in the ordinary course of business less the estimated costs of completion and the estimated costs necessary to make the sale. It is an <strong>entity-specific value</strong> based on actual sales contracts and internal completion costs. <ParaRef page={2} para="Para 2" /></p>
          <p className="mt-2"><strong>Fair Value</strong> is a market-based measurement defined as the price that would be received to sell an asset or paid to transfer a liability in an orderly transaction between market participants at the measurement date. It is <strong>not</strong> entity-specific and does not deduct transaction costs.</p>
        </NoteBox>

        {/* 4. Measurement */}
        <SecHeader id="as2-measurement" num="4" title="Measurement Principle" />
        <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl mb-6">
          <p className="text-[16px] leading-relaxed text-blue-900 dark:text-blue-200 font-semibold font-serif text-center">
            <ParaRef page={2} para="Para 3" /> &ldquo;Inventories should be valued at the LOWER of COST and NET REALISABLE VALUE.&rdquo;
          </p>
        </div>
        <p>
          This is an application of the fundamental accounting consideration of <strong>Prudence</strong>. Understating inventories or overstating them by carrying them at values higher than what they can realise violates the true and fair view requirement.
        </p>

        {/* 5. Cost of Purchase */}
        <SecHeader id="as2-cost-purchase" num="5" title="Cost of Purchase" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={2} para="Para 5" /> The cost of purchase of inventories comprises:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13.5px] border-collapse rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Inclusions (Added to Cost)</th>
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Exclusions (Deducted from Cost / Ignored)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3">Purchase Price (invoice price)</td>
                <td className="p-3 text-red-600 dark:text-red-400">Trade Discounts and Rebates (deducted from purchase price)</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3">Import Duties (e.g. Basic Customs Duty)</td>
                <td className="p-3 text-red-600 dark:text-red-400">Refundable Taxes (e.g. GST where Input Tax Credit is claimed)</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3">Non-Refundable taxes and surcharges</td>
                <td className="p-3 text-red-600 dark:text-red-400">Cash Discounts (treated as finance income in P&amp;L — NOT deducted from inventory)</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3">Inward Freight and Transit Insurance</td>
                <td className="p-3 text-red-600 dark:text-red-400">Outward Freight (treated as selling and distribution cost in P&amp;L)</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3">Handling and direct acquisition costs</td>
                <td className="p-3 text-red-600 dark:text-red-400">Demurrage charges (expensed as abnormal cost in P&amp;L)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 6. Cost of Conversion */}
        <SecHeader id="as2-cost-conversion" num="6" title="Cost of Conversion &amp; Overheads" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={2} para="Para 6" /> The costs of conversion of inventories include costs directly related to the units of production (e.g., direct labour, direct expenses) and a systematic allocation of fixed and variable production overheads.
        </p>
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">Variable Production Overheads</h4>
            <p>Allocated to each unit of production based on the <strong>actual use</strong> of the production facilities. Examples include indirect materials, utilities, and indirect labor.</p>
          </div>
          
          <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">Fixed Production Overheads (Normal Capacity Rule)</h4>
            <p className="mb-2">Fixed production overheads are those indirect costs of production that remain relatively constant regardless of volume (e.g., factory rent, depreciation, administrative factory salaries). They are allocated based on the <strong>normal capacity</strong> of the production facilities.</p>
            <div className="p-3 bg-white dark:bg-slate-900 border rounded-lg font-mono text-xs my-2 text-center text-slate-800 dark:text-slate-200">
              Fixed Overhead Allocation Rate = Total Budgeted Fixed Overheads ÷ Normal Capacity of Production
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Note: Normal capacity is the production expected to be achieved on average over a number of periods or seasons under normal circumstances, taking into account the loss of capacity resulting from planned maintenance.</p>
          </div>
        </div>

        <NoteBox type="exam" title="Exam Rule: High vs. Low Production Capacity">
          <p>The allocation of fixed overheads depends on the relationship between <strong>Actual Production</strong> and <strong>Normal Capacity</strong>:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-[13.5px]">
            <li><strong>Actual Production &lt; Normal Capacity (Low Production):</strong> Fixed overheads are allocated using the Normal Capacity. The under-absorbed fixed overhead (unallocated amount) must be recognised as an <strong>expense in the profit and loss statement</strong> as a period cost. It is NEVER capitalized into inventory. This prevents inventory from being carried at inflated values.</li>
            <li><strong>Actual Production &ge; Normal Capacity (High Production):</strong> The amount of fixed overhead allocated to each unit is decreased so that inventories are not valued above cost. That is, overheads are absorbed based on <strong>Actual Production</strong>. This ensures no &ldquo;double-capitalization&rdquo; or inflated asset valuations.</li>
          </ul>
        </NoteBox>

        {/* 7. Joint & By-Products */}
        <SecHeader id="as2-other-costs" num="7" title="Allocation of Joint &amp; By-Products" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={3} para="Para 7" /> A production process may result in more than one product being produced simultaneously. This occurs when joint products or a main product and a by-product are produced.
        </p>
        <p className="leading-relaxed mb-4">
          When the costs of conversion of each product are not separately identifiable, they are allocated between the products on a rational and consistent basis. The standard prescribes the following methods:
        </p>
        
        <div className="space-y-4">
          <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('joint')}>
              <span className="font-bold text-slate-900 dark:text-white text-sm">Methods for Allocating Joint Costs</span>
              <ChevronDown size={16} className={`transform transition-transform ${openAccordions.joint ? 'rotate-180' : ''}`} />
            </div>
            {openAccordions.joint && (
              <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3">
                <p><strong>1. Relative Sales Value Method:</strong> Allocate joint costs based on the relative sales value of each product at the split-off point (when products become separately identifiable).</p>
                <p><strong>2. Sales Value at Completion Method:</strong> If products require further processing after the split-off point, allocate costs based on the final sales value of each product less further processing costs.</p>
                <p><strong>3. Net Realisable Value (NRV) Method:</strong> Allocate joint costs based on the NRV of the finished joint products.</p>
                <p><strong>4. Physical Unit Method:</strong> Allocate costs based on physical output (e.g. tonnes, litres) — used only if products have equal economic value per unit.</p>
              </div>
            )}
          </div>

          <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-900/30 bg-teal-50/20 dark:bg-[#0f1c22]/20">
            <h4 className="font-bold text-teal-800 dark:text-teal-400 text-sm mb-1.5 uppercase tracking-wide">By-Products Accounting Treatment</h4>
            <p className="text-[13.5px] leading-relaxed text-slate-700 dark:text-slate-350">
              Most by-products by their nature are immaterial. Where this is the case, they are measured at <strong>Net Realisable Value (NRV)</strong> and this value is <strong>deducted from the cost of the main product</strong>. The net carrying amount of the main product is therefore:
            </p>
            <div className="p-3 bg-white dark:bg-slate-900/60 border border-teal-200/50 dark:border-teal-900/40 rounded-lg font-mono text-[11.5px] text-center my-2 text-slate-800 dark:text-slate-200">
              Net Cost of Main Product = Total Joint Cost − NRV of By-Product + Further Processing Cost of Main Product
            </div>
          </div>
        </div>

        {/* 8. Excluded Costs */}
        <SecHeader id="as2-excluded" num="8" title="Excluded Costs (Expensed to P&amp;L)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={3} para="Para 8" /> Certain costs are excluded from the cost of inventories and must be recognised as expenses in the period in which they are incurred. Examples of such excluded costs include:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[
            { t: 'Abnormal Waste', d: 'Abnormal amounts of wasted materials, labour, or other production costs (e.g., costs incurred due to machine breakdowns, strikes, or raw material spills).' },
            { t: 'Storage Costs', d: 'Storage costs, unless those costs are necessary in the production process prior to a further production stage (e.g. aging of cheese or maturing of wine is capitalized; storing finished goods in warehouse is expensed).' },
            { t: 'Administrative Overheads', d: 'Administrative overheads that do not contribute to bringing inventories to their present location and condition (e.g., head office corporate salaries, HR, and accounting dept costs).' },
            { t: 'Selling & Distribution Costs', d: 'Selling and distribution costs (e.g., advertisement, sales commissions, showroom rent, and delivery outward freight).' },
            { t: 'Borrowing Costs (Interest)', d: 'Under AS 2, interest and other borrowing costs are ALWAYS excluded from inventory cost. (Note: Borrowing costs cannot be capitalized as inventories are not considered qualifying assets under AS 16).' }
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl border border-red-100 dark:border-red-950/40 bg-red-50/10 dark:bg-red-950/5">
              <h4 className="font-bold text-red-700 dark:text-red-400 text-xs uppercase tracking-wider mb-1.5">{item.t}</h4>
              <p className="text-[13px] text-slate-650 dark:text-gray-400 leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>

        {/* 9. Service Providers */}
        <SecHeader id="as2-service" num="9" title="Service Providers WIP (Para 9)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={3} para="Para 9" /> The inventory of a service provider is basically its Work-in-Progress (WIP) on unbilled services (e.g. unbilled hours of audit staff in a CA firm, software development hours of developers in an IT firm).
        </p>
        <p className="leading-relaxed">
          These inventories are measured at the <strong>costs of their production</strong>. These costs consist primarily of:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-700 dark:text-gray-300 mb-4">
          <li>Labour and other costs of personnel directly engaged in providing the service, including supervisory personnel (e.g. project managers).</li>
          <li>Attributable overheads (e.g., software licenses used for the project, server costs, infrastructure depreciation).</li>
        </ul>
        <NoteBox type="warning" title="General Admin &amp; Selling Costs Exclusion">
          Labour and other costs relating to sales and general administration personnel are NOT included but are recognised as expenses in the period in which they are incurred. The cost of service provider inventory must also NOT include profit margins or non-attributable overheads.
        </NoteBox>

        {/* 10. Cost Formulas */}
        <SecHeader id="as2-formulas" num="10" title="Cost Formulas (Para 10–13)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={4} para="Para 10" /> The cost of inventories of items that are not ordinarily interchangeable and goods or services produced and segregated for specific projects should be assigned by using <strong>Specific Identification of their individual costs</strong>.
        </p>
        <p className="leading-relaxed mb-4">
          For interchangeable items that are not uniquely identifiable, the cost should be assigned by using the <strong>First-In, First-Out (FIFO)</strong> or <strong>Weighted Average Cost (WAC)</strong> formulas.
        </p>

        <div className="space-y-4">
          <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('fifo')}>
              <span className="font-bold text-slate-900 dark:text-white text-sm">First-In, First-Out (FIFO) Formula</span>
              <ChevronDown size={16} className={`transform transition-transform ${openAccordions.fifo ? 'rotate-180' : ''}`} />
            </div>
            {openAccordions.fifo && (
              <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2 leading-relaxed">
                <p>The FIFO formula assumes that the items of inventory which were purchased first are consumed or sold first, and consequently the items remaining in inventory at the end of the period are those most recently purchased or produced.</p>
                <p className="text-blue-600 dark:text-blue-400 font-semibold">Effect in a rising price environment (inflation):</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Closing inventory is valued at recent higher prices (higher asset value on balance sheet).</li>
                  <li>Cost of sales uses older lower costs, leading to higher reported profits.</li>
                </ul>
              </div>
            )}
          </div>

          <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('wa')}>
              <span className="font-bold text-slate-900 dark:text-white text-sm">Weighted Average Cost (WAC) Formula</span>
              <ChevronDown size={16} className={`transform transition-transform ${openAccordions.wa ? 'rotate-180' : ''}`} />
            </div>
            {openAccordions.wa && (
              <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2 leading-relaxed">
                <p>Under the Weighted Average Cost formula, the cost of each item is determined from the weighted average of the cost of similar items at the beginning of a period and the cost of similar items purchased or produced during the period. The average may be calculated on a periodic basis, or as each additional shipment is received (moving average).</p>
                <p className="text-blue-600 dark:text-blue-400 font-semibold">Effect in a rising price environment (inflation):</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Smooths out price fluctuations.</li>
                  <li>Closing inventory value and cost of sales are moderate, showing a balanced view of asset value and net profit.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <NoteBox type="exam" title="LIFO Method Prohibition">
          <p><strong>LIFO (Last-In, First-Out) method is strictly PROHIBITED</strong> under AS 2. LIFO assumes that the newest inventory is sold first, which often results in carrying very old, historically undervalued inventory on the balance sheet, creating tax distortion and hidden reserves. This violates the true and fair view of financial statements.</p>
        </NoteBox>

        {/* 11. NRV & Raw Material Exception */}
        <SecHeader id="as2-nrv" num="11" title="Net Realisable Value (NRV) &amp; Raw Material Exception" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={5} para="Para 14" /> Net Realisable Value is the estimated selling price in the ordinary course of business less the estimated costs of completion and estimated costs necessary to make the sale.
        </p>
        <p className="leading-relaxed mb-4">
          Inventories are usually written down to net realisable value item by item. In some circumstances, however, it may be appropriate to group similar or related items.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('rmWriteDown')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Critical Concept: Raw Materials Write-down Exception</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.rmWriteDown ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.rmWriteDown && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed">
              <p className="font-semibold text-slate-850 dark:text-white">
                <ParaRef page={6} para="Para 16" /> Under AS 2, materials and other supplies held for use in the production of inventories are NOT written down below cost if the finished products in which they are to be incorporated are expected to be sold at or above cost.
              </p>
              <p>
                <strong>Why?</strong> If the finished product will cover its cost, the raw materials will also generate recovery. Writing down raw materials in such cases would create an artificial loss in the current year and a corresponding artificial profit in the next.
              </p>
              <p className="text-rose-600 dark:text-rose-400 font-bold">The Exception (When to write down Raw Materials):</p>
              <p>
                When there has been a decline in the price of materials and it is estimated that the cost of the finished products will exceed net realisable value, the materials are written down to net realisable value. In such circumstances, the <strong>replacement cost of the materials</strong> is the best available measure of their net realisable value.
              </p>
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/20 dark:border-amber-900/30 dark:bg-amber-950/10">
                <p className="font-bold text-amber-800 dark:text-amber-400 text-xs mb-1.5">Decision Matrix for Raw Materials (RM) Valuation:</p>
                <ul className="list-decimal pl-5 space-y-1 text-[12.5px] text-slate-700 dark:text-slate-350">
                  <li>Check if Finished Goods (FG) Expected Selling Price &ge; Total Cost of FG. If YES &rarr; Value RM at **Cost**.</li>
                  <li>If Expected Selling Price of FG &lt; Total Cost of FG &rarr; Value RM at **lower of Cost and Replacement Cost** (NRV).</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* 12. Recognition */}
        <SecHeader id="as2-recognition" num="12" title="Recognition as Expense (Para 18)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-5 font-serif">
          <ParaRef page={8} para="Para 18" /> When inventories are sold, the carrying amount is recognised as an expense in the period in which the related revenue is recognised. Write-downs are also recognised as expenses in the period they occur.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            { l: 'On Sale of Inventory', e: 'Dr Cost of Goods Sold\n  Cr Inventory', n: 'Matched against revenue in the same period' },
            { l: 'NRV Write-down', e: 'Dr Loss on NRV Write-down (P&L)\n  Cr Inventory', n: 'Recognised immediately in the period of NRV decline' },
            { l: 'Reversal of Write-down', e: 'Dr Inventory\n  Cr Cost of Goods Sold (Reduction)', n: 'Capped at the original write-down amount — cannot exceed historical cost' },
            { l: 'Abnormal Wastage', e: 'Dr Abnormal Loss A/c (P&L)\n  Cr WIP / Raw Materials', n: 'Always a period cost — excluded from inventory cost' }
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40">
              <p className="font-bold text-[11.5px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">{item.l}</p>
              <pre className="font-mono text-[11.5px] text-slate-800 dark:text-slate-200 leading-relaxed bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700 whitespace-pre-wrap">{item.e}</pre>
              <p className="text-[11.5px] text-slate-400 dark:text-slate-500 italic mt-1.5">{item.n}</p>
            </div>
          ))}
        </div>

        {/* 13. Disclosure */}
        <SecHeader id="as2-disclosure" num="13" title="Disclosure Requirements (Para 19)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-5 font-serif">
          <ParaRef page={9} para="Para 19" /> Financial statements shall disclose:
        </p>
        <div className="space-y-3 mb-8">
          {[
            { r: true, t: 'Accounting policy — cost formula used (FIFO or Weighted Average)' },
            { r: true, t: 'Total carrying amount classified by category (Raw Materials, WIP, Finished Goods, Stores & Spares)' },
            { r: false, t: 'Amount of any NRV write-down recognised as expense (if occurred)' },
            { r: false, t: 'Amount of any write-down reversal recognised (if occurred)' },
            { r: false, t: 'Circumstances that led to the reversal' },
            { r: false, t: 'Carrying amount of inventories pledged as security for liabilities' }
          ].map((item, i) => (
            <div key={i} className={`flex items-start gap-3 p-3.5 rounded-xl border ${item.r ? 'border-blue-200 dark:border-blue-900/30 bg-blue-50/30' : 'border-amber-200 dark:border-amber-900/30 bg-amber-50/30'}`}>
              <span className={`shrink-0 font-bold text-[14px] ${item.r ? 'text-blue-500' : 'text-amber-500'}`}>{item.r ? '☑' : '☐'}</span>
              <div>
                <p className="text-[14px] text-slate-800 dark:text-slate-200 leading-relaxed">{item.t}</p>
                {!item.r && <span className="text-[10.5px] text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wide">Conditional — if event occurred</span>}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

const as3Sections = [
  { id: 'as3-overview',        title: '1. Overview & Purpose' },
  { id: 'as3-scope',           title: '2. Scope & Applicability (Para 1)' },
  { id: 'as3-definitions',     title: '3. Definitions (Para 5)' },
  { id: 'as3-classification',  title: '4. Classification of Activities (Para 8–17)' },
  { id: 'as3-operating',       title: '5. Operating Activities (Para 18–20)' },
  { id: 'as3-investing',       title: '6. Investing Activities (Para 16)' },
  { id: 'as3-financing',       title: '7. Financing Activities (Para 17)' },
  { id: 'as3-foreign-currency',title: '8. Foreign Currency Cash Flows (Para 25–27)' },
  { id: 'as3-taxes',           title: '9. Taxes & Extraordinary Items (Para 22–24)' },
  { id: 'as3-non-cash',        title: '10. Non-Cash Transactions (Para 40)' },
  { id: 'as3-disclosure',      title: '11. Disclosures (Para 42–46)' },
]

interface AS3StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
}

function AS3StandardTabContent({ navigateToPdfPage }: AS3StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as3-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    cashEquiv: true,
    operating: true,
    investing: false,
    financing: false,
    special: true
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as3-standard-sticky-toc')
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
    if (as3Sections[0]?.id === activeSection) {
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
      as3Sections.forEach(s => {
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
    '5':  { num: 'text-cyan-600 dark:text-cyan-400',    border: 'border-cyan-400',    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-400 dark:border-cyan-800' },
    '6':  { num: 'text-violet-600 dark:text-violet-400',border: 'border-violet-400',  badge: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800' },
    '7':  { num: 'text-amber-600 dark:text-amber-400',  border: 'border-amber-400',   badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800' },
    '8':  { num: 'text-red-600 dark:text-red-400',      border: 'border-red-400',     badge: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800' },
    '9':  { num: 'text-fuchsia-600 dark:text-fuchsia-400',border:'border-fuchsia-400',badge: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-950/40 dark:text-fuchsia-400 dark:border-fuchsia-800' },
    '10': { num: 'text-sky-600 dark:text-sky-400',      border: 'border-sky-400',     badge: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800' },
    '11': { num: 'text-orange-600 dark:text-orange-400',border: 'border-orange-400',  badge: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-800' },
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
      success: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200 border-l-emerald-500',
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
      title={`Open ICAI AS 3 PDF — ${para}`}
    >
      <FileText size={9} className="shrink-0" />
      {para} (p. {page})
    </button>
  )

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      {/* Sticky Section Sub-Navbar */}
      <div id="as3-standard-sticky-toc" className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <BookOpen size={9.5} />
          AS 3 Sections:
        </span>
        {as3Sections.map((sec) => (
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
        
        {/* 1. Overview */}
        <SecHeader id="as3-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Overview" /> A Cash Flow Statement provides information about the historical changes in <strong>cash and cash equivalents</strong> of an enterprise during an accounting period.
        </p>
        <p className="leading-relaxed">
          The purpose of AS 3 is to enable users to:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-700 dark:text-gray-300 mb-4">
          <li>Evaluate changes in the net assets of an enterprise and its financial structure (including liquidity and solvency).</li>
          <li>Assess the enterprise's ability to generate cash and cash equivalents, and the timing and certainty of generating them.</li>
          <li>Enhance comparability between the operating performance of different enterprises, as it eliminates the effects of using different accounting treatments for identical transactions.</li>
        </ul>

        {/* 2. Scope & Applicability */}
        <SecHeader id="as3-scope" num="2" title="Scope &amp; Applicability" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Para 1" /> This standard applies to the presentation of Cash Flow Statements as an integral part of the financial statements of an enterprise for each period for which financial statements are presented.
        </p>
        <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-900/30 bg-teal-50/20 dark:bg-[#0f1c22]/20 mb-6 text-[13.5px]">
          <h4 className="font-bold text-teal-800 dark:text-teal-400 text-xs mb-1.5 uppercase tracking-wide">Exemptions / SMC relaxations:</h4>
          <p className="leading-relaxed text-slate-700 dark:text-slate-350">
            Under the Companies Act, 2013 (Section 2(40)), a Cash Flow Statement is a mandatory component of financial statements. However, exemptions are provided for:
          </p>
          <ul className="list-disc pl-5 mt-1 text-slate-650 dark:text-gray-400 space-y-0.5">
            <li><strong>One Person Company (OPC)</strong></li>
            <li><strong>Small Company</strong> (defined based on capital &amp; turnover limits)</li>
            <li><strong>Dormant Company</strong></li>
          </ul>
          <p className="mt-2">Non-corporate entities classified as Level II and Level III by the ICAI are also exempt from preparing a cash flow statement.</p>
        </div>

        {/* 3. Definitions */}
        <SecHeader id="as3-definitions" num="3" title="Definitions (Para 5)" />
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13.5px] border-collapse rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Term</th>
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">AS 3 Definition &amp; Scope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Cash</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Comprises cash on hand and demand deposits with banks.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-950/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Cash Equivalents</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Short-term, highly liquid investments that are readily convertible to known amounts of cash and which are subject to an insignificant risk of changes in value.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Cash Flows</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Inflows and outflows of cash and cash equivalents.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('cashEquiv')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Key Criteria for Cash Equivalents</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.cashEquiv ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.cashEquiv && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2 leading-relaxed">
              <p>For an investment to qualify as a cash equivalent under AS 3: <ParaRef page={2} para="Para 5" /></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>It must be held for the purpose of meeting short-term cash commitments rather than for investment or other purposes.</li>
                <li>It must have a short maturity of, say, <strong>three months or less</strong> from the date of acquisition.</li>
                <li>Examples: Treasury bills, Government securities with 3 months or less maturity, Commercial paper, Mutual funds (liquid/cash funds with immediate redemption).</li>
                <li>Exclusion: Equity shares are generally excluded from cash equivalents unless they are, in substance, cash equivalents (e.g. preference shares acquired shortly before their redemption date).</li>
              </ul>
            </div>
          )}
        </div>

        {/* 4. Presentation & Classification */}
        <SecHeader id="as3-classification" num="4" title="Classification of Cash Flows (Para 8–17)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={3} para="Para 8" /> The cash flow statement should report cash flows during the period classified by:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-[13.5px]">
          <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/30 bg-blue-50/20 dark:bg-blue-950/10">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 text-sm mb-1 uppercase tracking-wide">Operating Activities</h4>
            <p className="text-[12.5px] text-slate-600 dark:text-gray-400">Principal revenue-producing activities of the enterprise and other activities that are not investing or financing activities.</p>
          </div>
          <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-900/30 bg-teal-50/20 dark:bg-teal-950/10">
            <h4 className="font-bold text-teal-700 dark:text-teal-400 text-sm mb-1 uppercase tracking-wide">Investing Activities</h4>
            <p className="text-[12.5px] text-slate-600 dark:text-gray-400">Acquisition and disposal of long-term assets and other investments not included in cash equivalents.</p>
          </div>
          <div className="p-4 rounded-xl border border-violet-200 dark:border-violet-900/30 bg-violet-50/20 dark:bg-violet-950/10">
            <h4 className="font-bold text-violet-700 dark:text-violet-400 text-sm mb-1 uppercase tracking-wide">Financing Activities</h4>
            <p className="text-[12.5px] text-slate-600 dark:text-gray-400">Activities that result in changes in the size and composition of the owner's capital and borrowings of the enterprise.</p>
          </div>
        </div>

        {/* 5. Operating Activities */}
        <SecHeader id="as3-operating" num="5" title="Operating Activities &amp; Presentation Methods" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={3} para="Para 13" /> Operating cash flows are primarily derived from the principal revenue-producing activities. Examples of operating inflows and outflows include:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-700 dark:text-gray-300 mb-4">
          <li>Cash receipts from sale of goods and rendering of services.</li>
          <li>Cash receipts from royalties, fees, commissions and other revenue.</li>
          <li>Cash payments to suppliers for goods and services.</li>
          <li>Cash payments to and on behalf of employees (salaries, wages, bonus).</li>
          <li>Cash payments or refunds of income taxes (unless they can be specifically identified with financing and investing activities).</li>
        </ul>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('operating')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Direct vs. Indirect Method (Para 18)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.operating ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.operating && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed">
              <p>AS 3 permits enterprises to report cash flows from operating activities using either of the following methods:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg bg-slate-50/50 dark:bg-slate-900/30">
                  <p className="font-bold text-blue-600 dark:text-blue-400">Direct Method</p>
                  <p className="text-[12px] mt-1">Major classes of gross cash receipts and gross cash payments are disclosed. Cash collections from customers and payments to suppliers/employees are computed directly from receivables/payables and credit sales/purchases.</p>
                </div>
                <div className="p-3 border rounded-lg bg-slate-50/50 dark:bg-slate-900/30">
                  <p className="font-bold text-teal-600 dark:text-teal-400">Indirect Method</p>
                  <p className="text-[12px] mt-1">Net Profit or Loss before tax is adjusted for the effects of non-cash transactions (e.g. depreciation, write-offs), deferrals or accruals of past/future cash operating flows (e.g. change in inventory, receivables, payables), and items of income/expense associated with investing or financing activities (e.g. interest paid, gain on asset sale).</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 6. Investing Activities */}
        <SecHeader id="as3-investing" num="6" title="Investing Activities" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={4} para="Para 16" /> The separate disclosure of cash flows arising from investing activities is important because the cash flows represent the extent to which expenditures have been made for resources intended to generate future income and cash flows.
        </p>
        <p className="leading-relaxed mb-4">
          Examples of investing cash flows:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13.5px]">
          <div className="p-4 rounded-xl border border-teal-100 dark:border-teal-950/40 bg-teal-50/10 dark:bg-teal-950/5">
            <h4 className="font-bold text-teal-700 dark:text-teal-400 text-xs uppercase tracking-wider mb-1">Investing Inflows (+)</h4>
            <ul className="list-disc pl-5 mt-1 space-y-1 text-[12.5px] text-slate-650 dark:text-gray-400">
              <li>Cash receipts from sales of Property, Plant and Equipment and Intangible assets.</li>
              <li>Cash receipts from disposal of shares, warrants, or debt instruments of other enterprises.</li>
              <li>Cash receipts from recovery of loans and advances made to third parties.</li>
              <li>Interest received and Dividends received (for non-financial enterprises).</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-red-100 dark:border-red-950/40 bg-red-50/10 dark:bg-red-950/5">
            <h4 className="font-bold text-red-700 dark:text-red-400 text-xs uppercase tracking-wider mb-1">Investing Outflows (−)</h4>
            <ul className="list-disc pl-5 mt-1 space-y-1 text-[12.5px] text-slate-650 dark:text-gray-400">
              <li>Cash payments to acquire Property, Plant and Equipment and Intangibles (including capitalized development costs).</li>
              <li>Cash payments to acquire shares or debt instruments of other enterprises.</li>
              <li>Loans and advances made to third parties (other than by financial enterprises).</li>
            </ul>
          </div>
        </div>

        {/* 7. Financing Activities */}
        <SecHeader id="as3-financing" num="7" title="Financing Activities" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={4} para="Para 17" /> Financing cash flows are useful in predicting claims on future cash flows by providers of capital (both equity and debt) to the enterprise.
        </p>
        <p className="leading-relaxed mb-4">
          Examples of financing cash flows:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13.5px]">
          <div className="p-4 rounded-xl border border-violet-100 dark:border-violet-950/40 bg-violet-50/10 dark:bg-violet-950/5">
            <h4 className="font-bold text-violet-700 dark:text-violet-400 text-xs uppercase tracking-wider mb-1">Financing Inflows (+)</h4>
            <ul className="list-disc pl-5 mt-1 space-y-1 text-[12.5px] text-slate-650 dark:text-gray-400">
              <li>Cash proceeds from issuing shares or other equity instruments.</li>
              <li>Cash proceeds from issuing debentures, loans, notes, bonds, and other short or long-term borrowings.</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-red-100 dark:border-red-950/40 bg-red-50/10 dark:bg-red-950/5">
            <h4 className="font-bold text-red-700 dark:text-red-400 text-xs uppercase tracking-wider mb-1">Financing Outflows (−)</h4>
            <ul className="list-disc pl-5 mt-1 space-y-1 text-[12.5px] text-slate-650 dark:text-gray-400">
              <li>Cash repayments of amounts borrowed.</li>
              <li>Dividends paid to shareholders (including Dividend Distribution Tax, if applicable).</li>
              <li>Interest paid on borrowings (for non-financial enterprises).</li>
            </ul>
          </div>
        </div>

        {/* 8. Foreign Currency Cash Flows */}
        <SecHeader id="as3-foreign-currency" num="8" title="Foreign Currency Cash Flows &amp; Exchange Rates" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={5} para="Para 25–27" /> Cash flows arising from transactions in foreign currencies must be recorded in the reporting currency by applying the exchange rate at the <strong>date of the cash flow</strong>.
        </p>
        <NoteBox type="warning" title="Effect of Exchange Rate Changes on Cash Held">
          <p>Unrealised exchange gains and losses are non-cash movements. Therefore, they are NOT cash flows. However, the effect of exchange rate changes on cash and cash equivalents held in foreign currencies is reported separately in the cash flow statement (usually at the bottom) to reconcile the cash at the beginning and the end of the period. <ParaRef page={5} para="Para 27" /></p>
        </NoteBox>

        {/* 9. Taxes & Extraordinary Items */}
        <SecHeader id="as3-taxes" num="9" title="Taxes &amp; Extraordinary Items" />
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40">
            <h4 className="font-bold text-slate-950 dark:text-white text-sm mb-1">Extraordinary Items (Para 22)</h4>
            <p className="text-[13.5px] leading-relaxed">
              The cash flows associated with extraordinary items (e.g. insurance claim proceeds for warehouse fire, disaster relief grants) should be classified as arising from operating, investing, or financing activities as appropriate, and must be <strong>disclosed separately</strong> to enable users to understand their nature and effect.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40">
            <h4 className="font-bold text-slate-950 dark:text-white text-sm mb-1">Taxes on Income (Para 24)</h4>
            <p className="text-[13.5px] leading-relaxed">
              Cash flows arising from taxes on income should be separately disclosed and classified as cash flows from <strong>operating activities</strong>. However, if they can be specifically identified with financing or investing activities, they should be classified accordingly (e.g. tax paid on capital gains from selling land classified under investing).
            </p>
          </div>
        </div>

        {/* 10. Non-Cash Transactions */}
        <SecHeader id="as3-non-cash" num="10" title="Non-Cash Transactions (Para 40)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={6} para="Para 40" /> Investing and financing transactions that do not require the use of cash or cash equivalents should be <strong>excluded</strong> from a cash flow statement.
        </p>
        <p className="leading-relaxed mb-4">
          Such transactions should be disclosed elsewhere in the financial statements in a way that provides all relevant information about these investing and financing activities. Examples of non-cash transactions:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-700 dark:text-gray-300 mb-4">
          <li>Acquisition of assets by assuming directly related liabilities or by means of a finance lease.</li>
          <li>Acquisition of an enterprise by means of an equity issue (issuing shares for business purchase).</li>
          <li>Conversion of debt/debentures to equity shares.</li>
        </ul>
        <NoteBox type="exam" title="Exam Trap: Share Issue for Assets">
          If a company acquires machinery worth ₹10,00,000 by paying ₹2,00,000 in cash and issuing equity shares for ₹8,00,000, only the <strong>₹2,00,000 cash payment</strong> is reported as an outflow under investing activities in the cash flow statement. The ₹8,00,000 share issue is a non-cash transaction and is omitted from the statement.
        </NoteBox>

        {/* 11. Disclosure */}
        <SecHeader id="as3-disclosure" num="11" title="Disclosure Requirements" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={6} para="Para 42–46" /> An enterprise should disclose:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-700 dark:text-gray-300">
          <li>The components of cash and cash equivalents and should present a <strong>reconciliation</strong> of the amounts in its cash flow statement with the equivalent items reported in the balance sheet.</li>
          <li>The amount of significant cash and cash equivalent balances held by the enterprise that are <strong>not available for use</strong> by it (e.g. cash balances held in foreign countries subject to exchange controls, bank accounts frozen by court orders, bank deposits marked as margin money).</li>
        </ul>

      </div>
    </div>
  )
}

const as4Sections = [
  { id: 'as4-overview',        title: '1. Overview & Historical Context' },
  { id: 'as4-scope',           title: '2. Scope & Applicability (Para 1–2)' },
  { id: 'as4-definitions',     title: '3. Definitions (Para 3)' },
  { id: 'as4-adjusting',       title: '4. Adjusting Events (Para 8.1 & 13)' },
  { id: 'as4-non-adjusting',   title: '5. Non-Adjusting Events (Para 8.2 & 14)' },
  { id: 'as4-proposed-dividend',title: '6. Proposed Dividend (Para 14 Amendment)' },
  { id: 'as4-going-concern',   title: '7. Going Concern Assumption (Para 13 Override)' },
  { id: 'as4-impairment',      title: '8. Impairment of Assets (AS 29 Exception)' },
  { id: 'as4-disclosures',     title: '9. Disclosure Requirements (Para 15)' },
]

interface AS4StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
}

function AS4StandardTabContent({ navigateToPdfPage }: AS4StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as4-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    adjusting: true,
    nonAdjusting: true,
    dividend: true,
  })
  const tocScrollRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (key: string) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const container = document.getElementById('as1-scroll-container')
    const target = document.getElementById(id)
    const stickyToc = document.getElementById('as4-standard-sticky-toc')
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
    if (as4Sections[0]?.id === activeSection) {
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
      as4Sections.forEach(s => {
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
    '5':  { num: 'text-cyan-600 dark:text-cyan-400',    border: 'border-cyan-400',    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-400 dark:border-cyan-800' },
    '6':  { num: 'text-violet-600 dark:text-violet-400',border: 'border-violet-400',  badge: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800' },
    '7':  { num: 'text-amber-600 dark:text-amber-400',  border: 'border-amber-400',   badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800' },
    '8':  { num: 'text-red-600 dark:text-red-400',      border: 'border-red-400',     badge: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800' },
    '9':  { num: 'text-fuchsia-600 dark:text-fuchsia-400',border:'border-fuchsia-400',badge: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-950/40 dark:text-fuchsia-400 dark:border-fuchsia-800' },
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
      success: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200 border-l-emerald-500',
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
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-655 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={`Open ICAI AS 4 PDF — ${para}`}
    >
      <FileText size={9} className="shrink-0" />
      {para} (p. {page})
    </button>
  )

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      {/* Sticky Section Sub-Navbar */}
      <div id="as4-standard-sticky-toc" className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <BookOpen size={9.5} />
          AS 4 Sections:
        </span>
        {as4Sections.map((sec) => (
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
        
        {/* 1. Overview */}
        <SecHeader id="as4-overview" num="1" title="Overview &amp; Historical Context" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Overview" /> Accounting Standard 4 originally covered both <strong>Contingencies</strong> and <strong>Events Occurring After the Balance Sheet Date</strong>.
        </p>
        <p className="leading-relaxed">
          However, with the introduction of <strong>AS 29 (Provisions, Contingent Liabilities and Contingent Assets)</strong>, the parts of AS 4 dealing with contingencies were entirely superseded, with only one limited exception (impairment of assets not covered by other standards, such as provisions for bad and doubtful debts).
        </p>
        <NoteBox type="info" title="The Focus of AS 4 Today">
          The primary purpose of AS 4 today is to prescribe the accounting treatment and disclosures for **Events Occurring After the Balance Sheet Date**.
        </NoteBox>

        {/* 2. Scope & Applicability */}
        <SecHeader id="as4-scope" num="2" title="Scope &amp; Applicability" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={4} para="Para 1" /> This standard applies in the accounting for contingencies and events occurring after the balance sheet date.
        </p>
        <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-900/30 bg-teal-50/20 dark:bg-[#0f1c22]/20 mb-6 text-[13.5px] space-y-2">
          <h4 className="font-bold text-teal-800 dark:text-teal-400 text-xs mb-1.5 uppercase tracking-wide">Exemptions from Scope (Para 2):</h4>
          <p className="leading-relaxed text-slate-700 dark:text-slate-350">
            This standard does **not** apply to:
          </p>
          <ul className="list-disc pl-5 text-slate-650 dark:text-gray-400 space-y-0.5">
            <li>Liabilities of life assurance and general insurance enterprises arising from policies issued.</li>
            <li>Obligations under retirement benefit plans (covered by AS 15).</li>
            <li>Commitments arising from long-term lease contracts (covered by AS 19).</li>
          </ul>
        </div>

        {/* 3. Definitions */}
        <SecHeader id="as4-definitions" num="3" title="Definitions (Para 3)" />
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13.5px] border-collapse rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Term</th>
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">AS 4 Definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Events Occurring After the Balance Sheet Date</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Significant events, both favorable and unfavorable, that occur between the balance sheet date and the date on which the financial statements are approved by the Board of Directors in the case of a company, and by the corresponding approving authority in the case of any other enterprise.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-950/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Date of Approval</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">The date on which the approving authority (e.g. Board of Directors for corporate entities, partner group for partnership firms, proprietor for proprietorships) signs and approves the accounts. Events occurring *after* this approval date are outside the scope of AS 4.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. Adjusting Events */}
        <SecHeader id="as4-adjusting" num="4" title="Adjusting Events (Para 8.1 &amp; 13)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={5} para="Para 8.1" /> **Adjusting Events** are events occurring after the balance sheet date that provide additional evidence of conditions that **existed at the balance sheet date**.
        </p>
        <p className="leading-relaxed mb-4">
          <strong>Accounting Treatment:</strong> Under **Paragraph 13**, assets and liabilities must be adjusted to reflect these events in the financial statements.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('adjusting')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Standard Examples of Adjusting Events</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.adjusting ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.adjusting && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2 leading-relaxed">
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Debtor Insolvency:</strong> A debtor becomes bankrupt shortly after the balance sheet date, indicating that the collectibility of the receivable was already impaired at year-end.</li>
                <li><strong>Court Case Settlement:</strong> A court case is settled after year-end, confirming that a present obligation existed as of the balance sheet date. The provision must be adjusted.</li>
                <li><strong>Discovery of Fraud or Errors:</strong> The discovery of fraud or errors that show that the financial statements were incorrect at year-end.</li>
                <li><strong>Asset Pricing Confirmation:</strong> The determination after the balance sheet date of the cost of assets purchased, or the proceeds from assets sold, before the balance sheet date.</li>
              </ul>
            </div>
          )}
        </div>

        {/* 5. Non-Adjusting Events */}
        <SecHeader id="as4-non-adjusting" num="5" title="Non-Adjusting Events (Para 8.2 &amp; 14)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={5} para="Para 8.2" /> **Non-Adjusting Events** are events occurring after the balance sheet date that are indicative of conditions that **arose after the balance sheet date**.
        </p>
        <p className="leading-relaxed mb-4">
          <strong>Accounting Treatment:</strong> Under **Paragraph 14**, no adjustment is made to assets and liabilities. However, if the event is **material**, it must be disclosed in the **Report of the Approving Authority (Board's Report)**.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('nonAdjusting')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Standard Examples of Non-Adjusting Events</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.nonAdjusting ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.nonAdjusting && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2 leading-relaxed">
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Destruction of Assets:</strong> Fire, flood, or natural disaster destroying a plant or inventory after the balance sheet date.</li>
                <li><strong>Investment Valuation Decline:</strong> A drop in market value of investments between the balance sheet date and approval date (this is a new market condition).</li>
                <li><strong>Business Combinations / Restructuring:</strong> Entering into a major merger, acquisition, or restructuring plan after year-end.</li>
                <li><strong>Share Capital Changes:</strong> Major issue of shares or debentures after the balance sheet date.</li>
              </ul>
            </div>
          )}
        </div>

        {/* 6. Proposed Dividend */}
        <SecHeader id="as4-proposed-dividend" num="6" title="Proposed Dividend (Para 14 Amendment)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={5} para="Para 14" /> A dividend proposed or declared by the Board after the balance sheet date but before approval of financial statements **should not be recognized as a liability** in the financial statements.
        </p>
        <NoteBox type="warning" title="Critically Important Change (MCA 2016 Amendment)">
          <p>Under the amended AS 4, proposed dividend is classified as a **non-adjusting event**. It cannot be shown as a provision or liability on the face of the balance sheet. Instead, it must be **disclosed in the notes to accounts**.</p>
          <p className="mt-1">This is because no obligation exists on the balance sheet date (approval is only granted by shareholders in the AGM, which occurs months later).</p>
        </NoteBox>

        {/* 7. Going Concern Assumption */}
        <SecHeader id="as4-going-concern" num="7" title="Going Concern Assumption (Para 13 Override)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={5} para="Para 13" /> If an event after the balance sheet date indicates that the **going concern assumption** in relation to the whole or a part of the enterprise is **not appropriate**, the financial statements must be adjusted.
        </p>
        <NoteBox type="exam" title="The Going Concern Exception Rule">
          This is an absolute override. If a post-balance sheet event (such as a factory fire or recall of all loans) happens which, although indicating a condition arising *after* year-end, destroys the company's ability to continue operations, the historical cost basis is rejected. The accounts must be redrawn on a **liquidation basis** (assets valued at net realizable value).
        </NoteBox>

        {/* 8. Impairment of Assets Exception */}
        <SecHeader id="as4-impairment" num="8" title="Impairment of Assets (AS 29 Exception)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={4} para="Para 1.1" /> Even though portion of AS 4 relating to contingencies is withdrawn by AS 29, AS 4 remains operational for the **impairment of assets** not covered by other standards.
        </p>
        <p className="leading-relaxed">
          The most common example is the **provision for bad and doubtful debts (receivables)**. The estimation of doubtful debts is verified using post-balance sheet debtor status (bankruptcy, defaults, recoveries), which serves as adjusting evidence for year-end impairment.
        </p>

        {/* 9. Disclosure Requirements */}
        <SecHeader id="as4-disclosures" num="9" title="Disclosure Requirements (Para 15)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={6} para="Para 15" /> The following disclosures are required:
        </p>
        <div className="space-y-4 text-[13.5px]">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40">
            <h4 className="font-bold text-slate-950 dark:text-white text-sm mb-1.5">For Adjusting Events:</h4>
            <p>The adjustments made to assets and liabilities, and the related disclosures in the notes to accounts explaining the nature and financial impact of the adjustment.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40">
            <h4 className="font-bold text-slate-950 dark:text-white text-sm mb-1.5">For Material Non-Adjusting Events (disclosed in Board's Report):</h4>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>The **nature** of the event.</li>
              <li>An **estimate of the financial effect**, or a statement that such an estimate cannot be made.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}

const as5Sections = [
  { id: 'as5-overview',        title: '1. Overview & Purpose' },
  { id: 'as5-scope',           title: '2. Scope & Applicability (Para 1–2)' },
  { id: 'as5-definitions',     title: '3. Definitions (Para 3)' },
  { id: 'as5-exceptional',     title: '4. Ordinary & Exceptional Items (Para 12)' },
  { id: 'as5-extraordinary',   title: '5. Extraordinary Items (Para 8–11)' },
  { id: 'as5-prior-period',    title: '6. Prior Period Items (Para 15–19)' },
  { id: 'as5-estimates',       title: '7. Changes in Estimates (Para 20–27)' },
  { id: 'as5-policies',        title: '8. Changes in Policies (Para 28–33)' },
]

interface AS5StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
}

function AS5StandardTabContent({ navigateToPdfPage }: AS5StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as5-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    exceptional: true,
    extraordinary: true,
    priorPeriod: true,
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
    if (as5Sections[0]?.id === activeSection) {
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
      as5Sections.forEach(s => {
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
    '5':  { num: 'text-cyan-600 dark:text-cyan-400',    border: 'border-cyan-400',    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-400 dark:border-cyan-800' },
    '6':  { num: 'text-violet-600 dark:text-violet-400',border: 'border-violet-400',  badge: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800' },
    '7':  { num: 'text-amber-600 dark:text-amber-400',  border: 'border-amber-400',   badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800' },
    '8':  { num: 'text-red-600 dark:text-red-400',      border: 'border-red-400',     badge: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800' },
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
      success: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200 border-l-emerald-500',
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
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-655 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={`Open ICAI AS 5 PDF — ${para}`}
    >
      <FileText size={9} className="shrink-0" />
      {para} (p. {page})
    </button>
  )

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      {/* Sticky Section Sub-Navbar */}
      <div id="as5-standard-sticky-toc" className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <BookOpen size={9.5} />
          AS 5 Sections:
        </span>
        {as5Sections.map((sec) => (
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
        
        {/* 1. Overview */}
        <SecHeader id="as5-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Overview" /> Accounting Standard 5 prescribes the classification and disclosure of specific items in the **Statement of Profit and Loss**.
        </p>
        <p className="leading-relaxed">
          Proper presentation of these items allows stakeholders to evaluate the core ongoing performance of the enterprise, differentiate recurring earnings from temporary shocks, identify adjustments of prior period errors, and understand changes in accounting policies.
        </p>

        {/* 2. Scope & Applicability */}
        <SecHeader id="as5-scope" num="2" title="Scope &amp; Applicability (Para 1–2)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={4} para="Para 1" /> This standard should be applied by an enterprise in presenting profit or loss from ordinary activities, extraordinary items, prior period items, changes in accounting estimates, and changes in accounting policies.
        </p>
        <NoteBox type="warning" title="Tax Exclusions">
          AS 5 does **not** deal with the tax implications arising from these items. Tax effects (such as deferred tax assets/liabilities and income tax provisions) are governed under **AS 22 (Accounting for Taxes on Income)**.
        </NoteBox>

        {/* 3. Definitions */}
        <SecHeader id="as5-definitions" num="3" title="Definitions (Para 3)" />
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13.5px] border-collapse rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Term</th>
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">AS 5 Definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Ordinary Activities</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Any activities which are undertaken by an enterprise as part of its business and such related activities in which the enterprise engages in furtherance of, incidental to, or arising from, these activities.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-950/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Extraordinary Items</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Income or expenses that arise from events or transactions that are clearly distinct from the ordinary activities of the enterprise and, therefore, are not expected to recur frequently or regularly.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Prior Period Items</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Income or expenses which arise in the current period as a result of errors or omissions in the preparation of the financial statements of one or more prior periods.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. Ordinary & Exceptional Items */}
        <SecHeader id="as5-exceptional" num="4" title="Ordinary &amp; Exceptional Items (Para 12)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={5} para="Para 12" /> When items of income or expense within ordinary activities are of such **size, nature or incidence** that their disclosure is relevant to explain the performance, their nature and amount should be **disclosed separately**.
        </p>
        <p className="leading-relaxed mb-4">
          These are commonly called **Exceptional Items**. They do not constitute extraordinary items because they arise from ordinary activities.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('exceptional')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Examples requiring separate disclosure (Para 12–14)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.exceptional ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.exceptional && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2 leading-relaxed">
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Inventory Write-Downs:</strong> Writing down inventories to Net Realizable Value, or the reversal of such write-downs.</li>
                <li><strong>Restructuring / VRS:</strong> Restructuring the activities of an enterprise and the reversal of provisions for restructuring costs, and Voluntary Retirement Scheme (VRS) compensations.</li>
                <li><strong>Disposal of Fixed Assets:</strong> Profit or loss on the disposal of items of Property, Plant and Equipment.</li>
                <li><strong>Disposal of Investments:</strong> Profits or losses arising from disposals of long-term or current investments.</li>
                <li><strong>Litigation Settlements:</strong> Settlements of litigation demands that arise from ordinary business activities.</li>
              </ul>
            </div>
          )}
        </div>

        {/* 5. Extraordinary Items */}
        <SecHeader id="as5-extraordinary" num="5" title="Extraordinary Items (Para 8–11)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={4} para="Para 8" /> **Extraordinary Items** must be disclosed **separately** in the Statement of Profit and Loss so that their impact on the net profit/loss is clearly perceived.
        </p>
        <p className="leading-relaxed mb-4">
          The main distinction is that they are **not part of ordinary operations** and are completely outside management control.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('extraordinary')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Examples of Extraordinary Items</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.extraordinary ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.extraordinary && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2 leading-relaxed">
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Natural Calamities:</strong> Assets destroyed by a major earthquake, volcanic eruption, or unprecedented flood.</li>
                <li><strong>Confiscation / Expropriation:</strong> Attachment or nationalization of an enterprise's property by a government.</li>
                <li><strong>Refund of Taxes:</strong> Refund of taxes received which are distinct from ordinary tax payments.</li>
              </ul>
            </div>
          )}
        </div>

        {/* 6. Prior Period Items */}
        <SecHeader id="as5-prior-period" num="6" title="Prior Period Items (Para 15–19)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={5} para="Para 15" /> **Prior Period Items** arise in the current period due to **errors or omissions** in the preparation of the financial statements of one or more prior periods.
        </p>
        <NoteBox type="warning" title="Presentation & Disclosure">
          <p>The nature and amount of prior period items should be **separately disclosed** in the Statement of Profit and Loss in the current year. They are shown after Net Profit/Loss from Ordinary Activities but before Tax.</p>
          <p className="mt-1">Prior period items must **not** be confused with changes in estimates. Changes in estimates represent adjustments based on new developments, whereas prior period items represent correction of past year's computational errors, oversight, or misinterpretation of facts.</p>
        </NoteBox>

        {/* 7. Changes in Accounting Estimates */}
        <SecHeader id="as5-estimates" num="7" title="Changes in Accounting Estimates (Para 20–27)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={6} para="Para 20" /> As a result of uncertainties in business, many financial statement items cannot be measured precisely but can only be estimated (e.g. provision for bad debts, inventory obsolescence, useful lives of assets).
        </p>
        <p className="leading-relaxed mb-4">
          <strong>Accounting Treatment:</strong> Under **Paragraph 21**, the effect of a change in an accounting estimate should be included in P&amp;L **prospectively** in:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-gray-300 mb-4">
          <li>The period of the change, if the change affects that period only.</li>
          <li>The period of the change and future periods, if the change affects both.</li>
        </ul>
        <NoteBox type="exam" title="Prospective Change Principle">
          No retrospective adjustment is made for changes in estimates. For example, when changing the useful life of an asset, compute depreciation based on the revised WDV divided by the remaining useful life.
        </NoteBox>

        {/* 8. Changes in Accounting Policies */}
        <SecHeader id="as5-policies" num="8" title="Changes in Accounting Policies (Para 28–33)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={6} para="Para 29" /> A change in an accounting policy should be made only if it is required by **statute** or for compliance with an **accounting standard**, or if it is considered that the change will result in a **more appropriate presentation** of financial statements.
        </p>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40 text-[13.5px] space-y-2">
          <h4 className="font-bold text-slate-950 dark:text-white text-xs mb-1.5 uppercase tracking-wide">Required Disclosures for Policy Changes:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>The **nature** of the change.</li>
            <li>The **financial effect** of the change, quantified where material.</li>
            <li>If the impact is not quantifiable, the fact must be disclosed.</li>
            <li>If the change has no material effect in the current period but is expected to have a material effect in future periods, the fact of such change should be disclosed.</li>
          </ul>
        </div>

      </div>
    </div>
  )
}


const as7Sections = [
  { id: 'as7-overview',        title: '1. Overview & Purpose' },
  { id: 'as7-scope',           title: '2. Scope & Applicability (Para 1–2)' },
  { id: 'as7-definitions',     title: '3. Definitions (Para 3)' },
  { id: 'as7-combining',       title: '4. Combining & Segmenting (Para 6–9)' },
  { id: 'as7-revenue',         title: '5. Contract Revenue (Para 10–14)' },
  { id: 'as7-costs',           title: '6. Contract Costs (Para 15–20)' },
  { id: 'as7-recognition',     title: '7. Recognition (Para 21–35)' },
  { id: 'as7-disclosure',      title: '8. Disclosures (Para 38–44)' },
]

interface AS7StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
}

function AS7StandardTabContent({ navigateToPdfPage }: AS7StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as7-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    combining: true,
    revenue: true,
    costs: true,
    recognition: true,
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
    if (as7Sections[0]?.id === activeSection) {
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
      as7Sections.forEach(s => {
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
    '5':  { num: 'text-cyan-600 dark:text-cyan-400',    border: 'border-cyan-400',    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-400 dark:border-cyan-800' },
    '6':  { num: 'text-violet-600 dark:text-violet-400',border: 'border-violet-400',  badge: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800' },
    '7':  { num: 'text-amber-600 dark:text-amber-400',  border: 'border-amber-400',   badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800' },
    '8':  { num: 'text-red-600 dark:text-red-400',      border: 'border-red-400',     badge: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800' },
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
      success: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200 border-l-emerald-500',
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
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-655 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={`Open ICAI AS 7 PDF — ${para}`}
    >
      <FileText size={9} className="shrink-0" />
      {para} (p. {page})
    </button>
  )

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      {/* Sticky Section Sub-Navbar */}
      <div id="as7-standard-sticky-toc" className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <BookOpen size={9.5} />
          AS 7 Sections:
        </span>
        {as7Sections.map((sec) => (
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
        
        {/* 1. Overview */}
        <SecHeader id="as7-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Overview" /> Accounting Standard 7 governs the accounting treatment of revenue and costs associated with **construction contracts**.
        </p>
        <p className="leading-relaxed">
          Due to the nature of construction contracts, the date of start and date of completion fall in different accounting periods. Therefore, the primary issue is the allocation of contract revenue and costs to the periods in which construction work is performed.
        </p>

        {/* 2. Scope & Applicability */}
        <SecHeader id="as7-scope" num="2" title="Scope &amp; Applicability (Para 1–2)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={4} para="Para 1" /> This standard should be applied in accounting for construction contracts in the financial statements of **contractors**.
        </p>
        <p className="leading-relaxed">
          It applies to both fixed price contracts and cost plus contracts. It does not apply to developers who build real estate on their own account (which is covered under revenue recognition principles and AS 9 / guidance notes).
        </p>

        {/* 3. Definitions */}
        <SecHeader id="as7-definitions" num="3" title="Definitions (Para 3)" />
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13.5px] border-collapse rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Term</th>
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">AS 7 Definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Construction Contract</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">A contract specifically negotiated for the construction of an asset or a combination of assets that are closely interrelated or interdependent in terms of design, technology, function, or ultimate purpose.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-950/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Fixed Price Contract</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">A contract in which the contractor agrees to a fixed contract price, or a fixed rate per unit of output, which may be subject to cost escalation clauses.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Cost Plus Contract</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">A contract in which the contractor is reimbursed for allowable or otherwise defined costs, plus a percentage of these costs or a fixed fee.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. Combining & Segmenting */}
        <SecHeader id="as7-combining" num="4" title="Combining &amp; Segmenting Construction Contracts" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={4} para="Para 6–9" /> The provisions of this standard are usually applied separately to each construction contract. However, in certain circumstances, it is necessary to apply the standard to the separately identifiable components of a single contract or to a group of contracts together.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('combining')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Rules for Segmenting &amp; Combining (Para 7–8)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.combining ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.combining && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed">
              <p><strong>Segmenting as Separate Contracts (Para 7):</strong> When a contract covers a number of assets, the construction of each asset should be treated as a separate construction contract when:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Separate proposals have been submitted for each asset.</li>
                <li>Each asset has been subject to separate negotiation, and the contractor and customer can accept or reject that part.</li>
                <li>Revenues and costs of each asset can be identified.</li>
              </ul>
              <p><strong>Combining Group of Contracts (Para 8):</strong> A group of contracts, whether with a single customer or several customers, should be treated as a single construction contract when:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>The group of contracts is negotiated as a single package.</li>
                <li>The contracts are so closely interrelated that they are, in effect, part of a single project with an overall profit margin.</li>
                <li>The contracts are performed concurrently or in a continuous sequence.</li>
              </ul>
            </div>
          )}
        </div>

        {/* 5. Contract Revenue */}
        <SecHeader id="as7-revenue" num="5" title="Contract Revenue (Para 10–14)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={5} para="Para 10" /> Contract revenue should comprise the **initial amount** agreed in the contract and **variations in contract work, claims and incentive payments** to the extent that it is probable they will result in revenue and can be reliably measured.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('revenue')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Components of Revenue (Para 11–14)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.revenue ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.revenue && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2 leading-relaxed">
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Initial Amount:</strong> The base price agreed upon.</li>
                <li><strong>Variations:</strong> An instruction by the customer for a change in the scope of work (included when customer approval is probable).</li>
                <li><strong>Claims:</strong> Amounts the contractor seeks to collect from customer as reimbursement for cost overruns (included when negotiations are advanced and customer approval is highly probable).</li>
                <li><strong>Incentives:</strong> Additional amounts paid to the contractor if specified performance standards are met or exceeded (included when performance is achieved).</li>
              </ul>
            </div>
          )}
        </div>

        {/* 6. Contract Costs */}
        <SecHeader id="as7-costs" num="6" title="Contract Costs (Para 15–20)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={5} para="Para 15" /> Contract costs should comprise costs that **relate directly** to the specific contract, costs **attributable to contract activity** in general, and other costs **specifically chargeable** to the customer.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('costs')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Classification of Costs (Para 16–20)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.costs ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.costs && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2 leading-relaxed">
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Direct Costs (Para 16):</strong> Site labor, materials, depreciation of plant, hiring costs of plant/machinery, design and technical assistance directly related.</li>
                <li><strong>Attributable Indirect Costs (Para 17):</strong> Insurance, design/assistance not directly related, construction overheads, and borrowing costs (per AS 16).</li>
                <li><strong>Excluded Costs (Para 20 - General Overheads):</strong> General administration costs, selling costs, research and development costs not specified in contract, and depreciation of idle plant/machinery.</li>
              </ul>
            </div>
          )}
        </div>

        {/* 7. Recognition of Revenue & Expenses */}
        <SecHeader id="as7-recognition" num="7" title="Recognition of Contract Revenue and Expenses" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={6} para="Para 21" /> Contract revenue and contract costs should be recognized as revenue and expenses respectively by reference to the **stage of completion** of the contract activity at the reporting date.
        </p>
        <NoteBox type="warning" title="Expected Losses Rule (Para 35)">
          When it is probable that total contract costs will exceed total contract revenue, the **expected loss should be recognized as an expense immediately** regardless of whether work has commenced or stage of completion.
        </NoteBox>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('recognition')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Determining Stage of Completion (Para 29–32)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.recognition ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.recognition && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2.5 leading-relaxed">
              <p>The stage of completion of a contract may be determined in a variety of ways. Setu Builders uses the **Cost-to-Cost method**:</p>
              <div className="p-3 border rounded-lg bg-slate-50/50 dark:bg-slate-900/30 font-mono text-center text-xs">
                Stage of Completion = (Contract Costs Incurred to Date / Total Estimated Contract Costs) × 100
              </div>
              <p>Progress payments and advances received from customers do **not** reflect the stage of completion.</p>
            </div>
          )}
        </div>

        {/* 8. Disclosures */}
        <SecHeader id="as7-disclosure" num="8" title="Disclosure Requirements (Para 38–44)" />
        <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40 text-[13.5px] space-y-2">
          <h4 className="font-bold text-slate-950 dark:text-white text-xs mb-1.5 uppercase tracking-wide">Required Disclosures for Contractors:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>The **amount of contract revenue recognized** in the period.</li>
            <li>The **methods used** to determine contract revenue and stage of completion.</li>
            <li>For contracts in progress at reporting date:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>Aggregate amount of costs incurred and recognized profits (less recognized losses).</li>
                <li>The amount of advances received.</li>
                <li>The amount of retentions.</li>
              </ul>
            </li>
            <li>The **gross amount due from customers** (Asset) and **gross amount due to customers** (Liability).</li>
          </ul>
        </div>

      </div>
    </div>
  )
}

const as9Sections = [
  { id: 'as9-overview',        title: '1. Overview & Purpose' },
  { id: 'as9-scope',           title: '2. Scope & Exclusions (Para 1–2)' },
  { id: 'as9-definitions',     title: '3. Definitions (Para 3)' },
  { id: 'as9-gross-inflows',   title: '4. Agent vs Principal (Para 4)' },
  { id: 'as9-measurement',     title: '5. Measurement & Discounts (Para 5)' },
  { id: 'as9-sale-goods',      title: '6. Sale of Goods (Para 6)' },
  { id: 'as9-services',        title: '7. Rendering of Services (Para 7)' },
  { id: 'as9-resources',       title: '8. Resources Usage (Para 8)' },
  { id: 'as9-uncertainties',   title: '9. Postponement & Uncertainties (Para 9–10)' },
  { id: 'as9-timing',          title: '10. Detailed Timing Rules (Para 11–13)' },
  { id: 'as9-disclosure',      title: '11. Disclosures (Para 14)' },
]

interface AS9StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences: (text: string) => React.ReactNode;
}

function AS9StandardTabContent({ navigateToPdfPage }: AS9StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as9-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    timing: true,
    services: true,
    resources: true,
    uncertainties: true
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
    if (as9Sections[0]?.id === activeSection) {
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
      as9Sections.forEach(s => {
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
    '5':  { num: 'text-cyan-600 dark:text-cyan-400',    border: 'border-cyan-400',    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-400 dark:border-cyan-800' },
    '6':  { num: 'text-violet-600 dark:text-violet-400',border: 'border-violet-400',  badge: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800' },
    '7':  { num: 'text-amber-600 dark:text-amber-400',  border: 'border-amber-400',   badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800' },
    '8':  { num: 'text-red-600 dark:text-red-400',      border: 'border-red-400',     badge: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800' },
    '9':  { num: 'text-fuchsia-600 dark:text-fuchsia-400',border:'border-fuchsia-400',badge: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-950/40 dark:text-fuchsia-400 dark:border-fuchsia-800' },
    '10': { num: 'text-sky-600 dark:text-sky-400',      border: 'border-sky-400',     badge: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800' },
    '11': { num: 'text-orange-600 dark:text-orange-400',border: 'border-orange-400',  badge: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-800' },
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
      success: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200 border-l-emerald-500',
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
      title={`Open ICAI AS 9 PDF — ${para}`}
    >
      <FileText size={9} className="shrink-0" />
      {para} (p. {page})
    </button>
  )

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      {/* Sticky Section Sub-Navbar */}
      <div id="as9-standard-sticky-toc" className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <BookOpen size={9.5} />
          AS 9 Sections:
        </span>
        {as9Sections.map((sec) => (
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
        
        {/* 1. Introduction */}
        <SecHeader id="as9-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Overview" /> Accounting Standard 9 is concerned with the timing of recognition of revenue in the Statement of Profit and Loss.
        </p>
        <p className="leading-relaxed">
          The standard provides clear criteria for recognizing revenue arising from:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-700 dark:text-gray-300 mb-4">
          <li><strong>Sale of goods:</strong> Transferring ownership risks and rewards.</li>
          <li><strong>Rendering of services:</strong> Execution of service contracts.</li>
          <li><strong>Use by others of enterprise resources:</strong> Yielding interest, royalties, and dividends.</li>
        </ul>

        {/* 2. Scope & Exclusions */}
        <SecHeader id="as9-scope" num="2" title="Scope &amp; Exclusions" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Para 1" /> This standard does not deal with the following specialized aspects of revenue recognition, which are covered by other Accounting Standards:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13.5px] border-collapse rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Revenue Category</th>
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Treatment / Exclusion Standard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Revenue from Construction Contracts</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Excluded — covered by <strong>AS 7 (Construction Contracts)</strong></td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Revenue arising from Hire-purchase &amp; Lease agreements</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Excluded — covered by <strong>AS 19 (Leases)</strong></td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Revenue from Government Grants</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Excluded — covered by <strong>AS 12 (Accounting for Government Grants)</strong></td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Realised &amp; unrealised gains on Foreign Exchange translation</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Excluded — covered by <strong>AS 11 (Effects of Changes in Forex Rates)</strong></td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Gains from disposal of Fixed Assets / Investments</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Excluded — covered by AS 10 (Revised) and AS 13 respectively</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 3. Definitions */}
        <SecHeader id="as9-definitions" num="3" title="Definitions" />
        <div className="p-3.5 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-gray-800 rounded font-semibold text-slate-800 dark:text-slate-200 leading-relaxed italic mb-4">
          &ldquo;Revenue is the gross inflow of cash, receivables or other consideration arising in the course of the ordinary activities of an enterprise from the sale of goods, from the rendering of services, and from the use by others of enterprise resources yielding interest, royalties and dividends.&rdquo; <ParaRef page={3} para="Para 3" />
        </div>
        <p className="leading-relaxed">
          Revenue is measured by the charges made to customers or clients for goods supplied and services rendered to them, and by the charges and interest/royalties/dividends received for the use of the enterprise's resources.
        </p>

        {/* 4. Agent vs Principal */}
        <SecHeader id="as9-gross-inflows" num="4" title="Agent vs. Principal (Para 4)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={3} para="Para 4.1" /> Revenue includes only the <strong>gross inflows</strong> of economic benefits received and receivable by the enterprise on its own account.
        </p>
        <p className="leading-relaxed mb-4">
          Amounts collected on behalf of third parties (such as GST, sales taxes, or service taxes) are NOT economic benefits flowing to the enterprise and are excluded from revenue.
        </p>

        <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-900/30 bg-teal-50/20 dark:bg-[#0f1c22]/20 mb-6">
          <h4 className="font-bold text-teal-800 dark:text-teal-400 text-sm mb-2 uppercase tracking-wide">Principal vs. Agent Identification</h4>
          <p className="text-[13.5px] leading-relaxed mb-2">
            In an agency relationship, the agent collects cash/receivables on behalf of the principal. The gross inflows of cash or receivables do not represent revenue for the agent. The agent's revenue is only the <strong>commission amount</strong> earned for facilitating the transaction.
          </p>
          <p className="text-[13.5px] font-bold text-slate-900 dark:text-white">Indicators of Principal status:</p>
          <ul className="list-disc pl-5 text-[13px] space-y-1 text-slate-700 dark:text-slate-350">
            <li>Primary responsibility for fulfilling the order or contract.</li>
            <li>Inventory risk (before the goods are ordered or upon return).</li>
            <li>Latitude in establishing prices.</li>
            <li>Bearing the customer's credit risk.</li>
          </ul>
        </div>

        {/* 5. Measurement & Discounts */}
        <SecHeader id="as9-measurement" num="5" title="Measurement &amp; Discounts" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={3} para="Para 5" /> Revenue is recognised at the nominal value of cash or receivables. However, trade discounts and volume rebates must be <strong>deducted</strong> from the gross revenue, as they do not represent inflows of economic benefits.
        </p>
        <NoteBox type="exam" title="Cash Discount vs. Trade Discount">
          <p><strong>Trade Discounts &amp; Volume Rebates:</strong> Always deducted from the invoice amount to arrive at Net Revenue. They are directly linked to the sale transaction.</p>
          <p className="mt-2"><strong>Cash Discounts:</strong> Allowed to encourage prompt payment. Cash discounts are <strong>finance costs</strong>. They are NOT deducted from sales revenue; they are charged separately as an expense to the Statement of Profit &amp; Loss.</p>
        </NoteBox>

        {/* 6. Sale of Goods */}
        <SecHeader id="as9-sale-goods" num="6" title="Sale of Goods (Para 6)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={4} para="Para 6" /> Revenue from sales transactions should be recognised when all the following conditions are met:
        </p>
        <div className="space-y-3.5 mb-6 pl-4 border-l-2 border-slate-200 dark:border-gray-800">
          <p>
            <strong>① Transfer of Risks &amp; Rewards:</strong> The seller has transferred to the buyer the significant risks and rewards of ownership of the goods.
          </p>
          <p>
            <strong>② No Retained Control:</strong> The seller retains no effective ownership control or managerial involvement over the goods to the degree usually associated with ownership.
          </p>
          <p>
            <strong>③ Assurance of Collection:</strong> At the time of transfer, there is no significant uncertainty regarding the amount of consideration or its ultimate collection.
          </p>
        </div>

        {/* 7. Rendering of Services */}
        <SecHeader id="as9-services" num="7" title="Rendering of Services (Para 7)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={4} para="Para 7" /> Revenue from service transactions is usually recognised as the service is performed. The standard permits two methods of recognition:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 text-blue-600">Proportionate Completion Method</h4>
            <p className="text-[13px] text-slate-600 dark:text-gray-400 mb-2">Revenue is recognised proportionately based on the degree of completion of each service activity. The degree of completion can be determined by:</p>
            <ul className="list-disc pl-5 text-[12px] text-slate-500 dark:text-gray-400 space-y-1">
              <li>Contract costs incurred to date relative to estimated total contract costs.</li>
              <li>Surveys of work performed.</li>
              <li>Ratio of hours worked to estimated total hours.</li>
            </ul>
          </div>
          
          <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 text-teal-600">Completed Service Contract Method</h4>
            <p className="text-[13px] text-slate-600 dark:text-gray-400 mb-2">Revenue is recognised only when the service is completed or substantially completed (e.g. only a minor act remains). Used when: </p>
            <ul className="list-disc pl-5 text-[12px] text-slate-500 dark:text-gray-400 space-y-1">
              <li>The service consists of execution of a single act.</li>
              <li>A series of acts where the final act is so significant that the service is not completed until the final act occurs.</li>
            </ul>
          </div>
        </div>

        {/* 8. Resource Usage */}
        <SecHeader id="as9-resources" num="8" title="Use of Enterprise Resources (Para 8)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={5} para="Para 8" /> Revenue arising from the use by others of enterprise resources yielding interest, royalties and dividends should be recognised when no significant uncertainty as to collectability exists:
        </p>
        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/30">
            <h4 className="font-bold text-slate-950 dark:text-white text-sm">Interest: Time Proportion Basis</h4>
            <p className="text-[13.5px] leading-relaxed mt-1">Recognised on a <strong>time proportion basis</strong> taking into account the amount outstanding and the rate applicable. E.g. interest on fixed deposits or inter-corporate deposits accrues daily.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/30">
            <h4 className="font-bold text-slate-950 dark:text-white text-sm">Royalties: Accrual Basis</h4>
            <p className="text-[13.5px] leading-relaxed mt-1">Recognised on an <strong>accrual basis</strong> in accordance with the terms of the relevant agreement. E.g. royalty based on number of book copies sold or tons of coal mined is recognized as the activity takes place.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/30">
            <h4 className="font-bold text-slate-950 dark:text-white text-sm">Dividends: Declaration Date</h4>
            <p className="text-[13.5px] leading-relaxed mt-1">Recognised when the owner's <strong>right to receive payment is established</strong>. In case of equity shares, this is the date when shareholders declare the dividend in the Annual General Meeting (AGM).</p>
          </div>
        </div>

        {/* 9. Uncertainties & Postponement */}
        <SecHeader id="as9-uncertainties" num="9" title="Postponement &amp; Uncertainties (Para 9–10)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={5} para="Para 9" /> Revenue recognition is postponed if there are significant uncertainties regarding the ultimate collection of the revenue at the time of transaction.
        </p>
        <NoteBox type="warning" title="Post-Recognition Doubt Treatment">
          <p>If a doubt arises about the collectability of an amount already recognised as revenue, it is more appropriate to <strong>make a provision for bad and doubtful debts</strong> rather than adjusting the revenue originally recognised. <ParaRef page={5} para="Para 9.2" /></p>
        </NoteBox>

        {/* 10. Detailed Timing Rules */}
        <SecHeader id="as9-timing" num="10" title="Timing of Revenue Recognition for Specific Transactions" />
        <p className="mb-4">
          The Appendix to AS 9 provides detailed instructions on the timing of revenue recognition under different trade arrangements:
        </p>
        
        <div className="space-y-4">
          <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('timing')}>
              <span className="font-bold text-slate-900 dark:text-white text-sm">Timing Rules for Sale of Goods</span>
              <ChevronDown size={16} className={`transform transition-transform ${openAccordions.timing ? 'rotate-180' : ''}`} />
            </div>
            {openAccordions.timing && (
              <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed">
                <p><strong>① Delivery Delayed at Buyer's Request (Bill-and-Hold):</strong> Recognise revenue if title passes, buyer accepts billing, and goods are on hand, identified, and ready for delivery. Storage fee is recognized separately.</p>
                <p><strong>② Delivery Subject to Installation &amp; Inspection:</strong> Recognise revenue only when installation and inspection are complete, unless installation is very simple (e.g. factory-tested television receiver).</p>
                <p><strong>③ Sale on Approval / Return Basis:</strong> Recognise when buyer formally accepts the goods, does an act adopting the transaction, or the time limit for rejection has expired.</p>
                <p><strong>④ Consignment Sales:</strong> Recognise revenue only when the goods are sold by the agent to a third party.</p>
                <p><strong>⑤ Cash on Delivery (COD) Sales:</strong> Recognise when cash is received by the seller or their agent.</p>
                <p><strong>⑥ Installment Sales:</strong> Revenue excluding interest is recognised on delivery. Interest is recognised on a time-proportion basis.</p>
                <p><strong>⑦ Subscriptions for Publications:</strong> Recognise revenue on a straight-line basis over the period in which the items are dispatched, if items have similar value.</p>
              </div>
            )}
          </div>
        </div>

        {/* 11. Disclosures */}
        <SecHeader id="as9-disclosure" num="11" title="Disclosures (Para 14)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={6} para="Para 14" /> Financial statements shall disclose:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-700 dark:text-gray-300">
          <li>The circumstances in which revenue recognition has been postponed pending the resolution of significant uncertainties.</li>
          <li>The accounting policies adopted for the recognition of revenue, including the methods used to determine the stage of completion of service transactions.</li>
        </ul>

      </div>
    </div>
  )
}


const as10Sections = [
  { id: 'as10-overview',      title: '1. Overview & Purpose' },
  { id: 'as10-scope',         title: '2. Scope & Exclusions (Para 1–6)' },
  { id: 'as10-definitions',   title: '3. Definitions (Para 7–8)' },
  { id: 'as10-recognition',   title: '4. Recognition Criteria (Para 9–13)' },
  { id: 'as10-cost-comp',     title: '5. Components of Cost (Para 14–22)' },
  { id: 'as10-special-costs', title: '6. Self-Constructed & Exchanges (Para 23–28)' },
  { id: 'as10-subsequent',    title: '7. Subsequent Costs (Para 29–33)' },
  { id: 'as10-models',        title: '8. Cost vs Revaluation Models (Para 34–45)' },
  { id: 'as10-depreciation',  title: '9. Depreciation & Components (Para 46–65)' },
  { id: 'as10-derecognition', title: '10. Derecognition & Retirements (Para 68–72)' },
  { id: 'as10-disclosure',    title: '11. Disclosure Requirements (Para 73–82)' },
]

interface AS10StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences: (text: string) => React.ReactNode;
}

function AS10StandardTabContent({ navigateToPdfPage }: AS10StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as10-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    bearer: true,
    components: true,
    exchange: false,
    reval: true
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
    if (as10Sections[0]?.id === activeSection) {
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
      as10Sections.forEach(s => {
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
    '5':  { num: 'text-cyan-600 dark:text-cyan-400',    border: 'border-cyan-400',    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-400 dark:border-cyan-800' },
    '6':  { num: 'text-violet-600 dark:text-violet-400',border: 'border-violet-400',  badge: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800' },
    '7':  { num: 'text-amber-600 dark:text-amber-400',  border: 'border-amber-400',   badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800' },
    '8':  { num: 'text-red-600 dark:text-red-400',      border: 'border-red-400',     badge: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800' },
    '9':  { num: 'text-fuchsia-600 dark:text-fuchsia-400',border:'border-fuchsia-400',badge: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-950/40 dark:text-fuchsia-400 dark:border-fuchsia-800' },
    '10': { num: 'text-sky-600 dark:text-sky-400',      border: 'border-sky-400',     badge: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800' },
    '11': { num: 'text-orange-600 dark:text-orange-400',border: 'border-orange-400',  badge: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-800' },
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
      success: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200 border-l-emerald-500',
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
      title={`Open ICAI AS 10 PDF — ${para}`}
    >
      <FileText size={9} className="shrink-0" />
      {para} (p. {page})
    </button>
  )

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      {/* Sticky Section Sub-Navbar */}
      <div id="as10-standard-sticky-toc" className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <BookOpen size={9.5} />
          AS 10 Sections:
        </span>
        {as10Sections.map((sec) => (
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
        
        {/* 1. Overview */}
        <SecHeader id="as10-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={7} para="Objective" /> The objective of AS 10 (Revised) is to prescribe the accounting treatment for Property, Plant and Equipment (PPE).
        </p>
        <p className="leading-relaxed">
          The principal issues in accounting for PPE are:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-700 dark:text-gray-300 mb-4">
          <li><strong>Timing of recognition:</strong> Determining when an item should be recognized as PPE.</li>
          <li><strong>Measurement of carrying amount:</strong> Compiling the cost or revalued amount.</li>
          <li><strong>Depreciation charges:</strong> Systematic allocation of the depreciable amount.</li>
          <li><strong>Impairment losses:</strong> Recognising declines in asset values.</li>
        </ul>

        {/* 2. Scope & Exclusions */}
        <SecHeader id="as10-scope" num="2" title="Scope &amp; Exclusions" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={7} para="Para 1–6" /> This standard should be applied in accounting for PPE, except when another standard requires or permits a different accounting treatment.
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13.5px] border-collapse rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Exclusion Category</th>
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Treatment / Applicable Standard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Biological assets other than Bearer Plants</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Excluded (e.g. livestock, crops, wasting forests). Bearer plants ARE included in AS 10!</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Wasting assets (mineral rights, oil/gas exploration reserves)</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Excluded from scope (except for PPE used to develop or maintain them)</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-950/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Investment Property</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Included — carried under the Cost Model as per AS 10 (Revised)!</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 3. Definitions */}
        <SecHeader id="as10-definitions" num="3" title="Definitions &amp; Key Concepts" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={8} para="Para 7" /> <strong>Property, Plant and Equipment</strong> are tangible items that:
        </p>
        <div className="space-y-3 mb-6 pl-4 border-l-2 border-slate-200 dark:border-gray-800">
          <p>
            <strong>① Held for use</strong> in the production or supply of goods or services, for rental to others, or for administrative purposes.
          </p>
          <p>
            <strong>② Expected to be used</strong> during more than a period of twelve months.
          </p>
        </div>

        <div className="space-y-4">
          <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('bearer')}>
              <span className="font-bold text-slate-900 dark:text-white text-sm">Bearer Plants (Capitalized as PPE)</span>
              <ChevronDown size={16} className={`transform transition-transform ${openAccordions.bearer ? 'rotate-180' : ''}`} />
            </div>
            {openAccordions.bearer && (
              <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2 leading-relaxed">
                <p>A <strong>Bearer Plant</strong> is a live plant that: <ParaRef page={8} para="Para 7" /></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Is used in the production or supply of agricultural produce.</li>
                  <li>Is expected to bear produce for more than 12 months.</li>
                  <li>Has a remote likelihood of being sold as agricultural produce, except for incidental scrap sales.</li>
                </ul>
                <p>Examples: tea bushes, grape vines, oil palms, and rubber trees. Note: plants grown to be harvested as agricultural produce (e.g. timber trees) are NOT bearer plants and are excluded from AS 10.</p>
              </div>
            )}
          </div>

          <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('components')}>
              <span className="font-bold text-slate-900 dark:text-white text-sm">Component Accounting (Mandatory)</span>
              <ChevronDown size={16} className={`transform transition-transform ${openAccordions.components ? 'rotate-180' : ''}`} />
            </div>
            {openAccordions.components && (
              <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2 leading-relaxed">
                <p>If different components of an item of PPE have significantly different useful lives or consumption patterns, they must be treated as <strong>separate items of PPE</strong> (components) and depreciated individually over their respective useful lives. <ParaRef page={14} para="Para 47" /></p>
                <p>Example: An aircraft airframe (useful life 25 years) and its jet engines (useful life 12 years) must be recognized and depreciated separately.</p>
              </div>
            )}
          </div>
        </div>

        {/* 4. Recognition Criteria */}
        <SecHeader id="as10-recognition" num="4" title="Recognition Criteria" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={9} para="Para 9" /> The cost of an item of PPE should be recognised as an asset if, and only if:
        </p>
        <div className="space-y-3.5 mb-6 pl-4 border-l-2 border-slate-200 dark:border-gray-800">
          <p>
            <strong>① Probable Future Benefits:</strong> It is probable that future economic benefits associated with the item will flow to the enterprise.
          </p>
          <p>
            <strong>② Reliable Measurement:</strong> The cost of the item can be measured reliably.
          </p>
        </div>
        <NoteBox type="info" title="Safety &amp; Environmental Equipment">
          Safety or environmental equipment (e.g. pollution control filters or chemical exhaust systems) does not directly increase future economic benefits of any particular asset. However, it is capitalized as PPE because it is necessary for the enterprise to obtain future economic benefits from its other assets. <ParaRef page={10} para="Para 13" />
        </NoteBox>

        {/* 5. Components of Cost */}
        <SecHeader id="as10-cost-comp" num="5" title="Initial Measurement &amp; Cost Components" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={10} para="Para 14" /> An item of PPE that qualifies for recognition as an asset should be measured at its <strong>cost</strong>.
        </p>
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">1. Purchase Price Components</h4>
            <p className="text-[13.5px]">Includes import duties and non-refundable purchase taxes, after deducting trade discounts and rebates. Refundable taxes are excluded.</p>
          </div>
          
          <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">2. Directly Attributable Costs</h4>
            <p className="text-[13.5px] mb-2">Any costs directly attributable to bringing the asset to the location and condition necessary for it to be capable of operating in the manner intended by management. Examples:</p>
            <ul className="list-disc pl-5 text-[12.5px] text-slate-650 dark:text-gray-400 space-y-1">
              <li>Costs of employee benefits arising directly from construction or acquisition.</li>
              <li>Costs of site preparation and installation.</li>
              <li>Initial delivery and handling costs.</li>
              <li>Professional fees (e.g. fees paid to architects or engineers).</li>
              <li>Costs of testing whether the asset is functioning properly, net of proceeds from selling items produced during testing.</li>
            </ul>
          </div>
          
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/30 bg-amber-50/20 dark:bg-amber-950/10">
            <h4 className="font-bold text-amber-800 dark:text-amber-400 text-sm mb-1 uppercase tracking-wide">3. Dismantling &amp; Decommissioning Provision</h4>
            <p className="text-[13.5px] leading-relaxed text-slate-700 dark:text-slate-350">
              The initial estimate of the costs of dismantling, removing the asset, and restoring the site on which it is located. The present value of these estimated costs is capitalized into the asset cost at inception, with a corresponding credit to <strong>Provision for Decommissioning</strong>. <ParaRef page={10} para="Para 14" />
            </p>
          </div>
        </div>

        {/* 6. Special Costs */}
        <SecHeader id="as10-special-costs" num="6" title="Self-Constructed Assets &amp; Exchanges of Assets" />
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40">
            <h4 className="font-bold text-slate-950 dark:text-white text-sm mb-1">Self-Constructed Assets</h4>
            <p className="text-[13.5px] leading-relaxed">
              Calculated using the same principles as an acquired asset. Any internal profits or abnormal costs (e.g. wasted material or labor due to construction inefficiency) must be <strong>excluded</strong>. Allocation of internal overheads must be systematic. <ParaRef page={12} para="Para 23" />
            </p>
          </div>

          <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('exchange')}>
              <span className="font-bold text-slate-900 dark:text-white text-sm">Exchange of Assets (Para 24)</span>
              <ChevronDown size={16} className={`transform transition-transform ${openAccordions.exchange ? 'rotate-180' : ''}`} />
            </div>
            {openAccordions.exchange && (
              <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2 leading-relaxed">
                <p>When an item of PPE is acquired in exchange for another asset, it should be measured at <strong>Fair Value</strong> unless:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>The exchange transaction lacks commercial substance, or</li>
                  <li>The fair value of neither the asset received nor the asset given up is reliably measurable.</li>
                </ul>
                <p>If the acquired asset cannot be measured at fair value, its cost is measured at the <strong>carrying amount of the asset given up</strong>. <ParaRef page={12} para="Para 24" /></p>
              </div>
            )}
          </div>
        </div>

        {/* 7. Subsequent Costs */}
        <SecHeader id="as10-subsequent" num="7" title="Subsequent Costs (Para 29–33)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={13} para="Para 29" /> Subsequent costs incurred on an item of PPE are capitalized in the carrying amount of the asset <strong>only if</strong> they meet the general recognition criteria (future benefits probable, cost measurable).
        </p>
        <NoteBox type="exam" title="Replacements vs. Day-to-Day Servicing">
          <p><strong>Day-to-day servicing (Repairs &amp; Maintenance):</strong> Costs of day-to-day servicing are charged to the Statement of Profit &amp; Loss as incurred. They do not extend useful life or add capacity.</p>
          <p className="mt-2"><strong>Replacement of Parts:</strong> E.g. replacing furnace linings or aircraft seats. If the recognition criteria are met, capitalize the cost of the replacement part. The carrying value of the replaced part <strong>must be derecognised</strong> (written off to P&amp;L). <ParaRef page={13} para="Para 30" /></p>
        </NoteBox>

        {/* 8. Cost vs Revaluation Models */}
        <SecHeader id="as10-models" num="8" title="Measurement models: Cost vs. Revaluation" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={14} para="Para 33" /> An enterprise can choose either the <strong>Cost Model</strong> or the <strong>Revaluation Model</strong> as its accounting policy and should apply that policy to an entire class of PPE.
        </p>
        
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40">
            <h4 className="font-bold text-slate-950 dark:text-white text-sm mb-1">Cost Model</h4>
            <p className="text-[13.5px]">PPE is carried at its cost less any accumulated depreciation and accumulated impairment losses.</p>
          </div>

          <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('reval')}>
              <span className="font-bold text-slate-900 dark:text-white text-sm">Revaluation Model (Rules &amp; Adjustments)</span>
              <ChevronDown size={16} className={`transform transition-transform ${openAccordions.reval ? 'rotate-180' : ''}`} />
            </div>
            {openAccordions.reval && (
              <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed">
                <p>Revaluations must be made with sufficient regularity to ensure that the carrying amount does not differ materially from that which would be determined using fair value at the balance sheet date. <ParaRef page={14} para="Para 35" /></p>
                <p className="font-bold text-teal-600">Accounting for Revaluation Adjustments:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Increase in Carrying Value:</strong> Credited to <strong>Revaluation Reserve</strong> (equity). However, if it reverses a previous decrease on the same asset that was charged to P&amp;L, the increase is credited to P&amp;L to that extent. <ParaRef page={15} para="Para 40" /></li>
                  <li><strong>Decrease in Carrying Value:</strong> Charged to the Statement of Profit &amp; Loss. However, it is debited directly to the Revaluation Reserve to the extent of any credit balance existing in the revaluation reserve in respect of that same asset. <ParaRef page={15} para="Para 41" /></li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 9. Depreciation */}
        <SecHeader id="as10-depreciation" num="9" title="Depreciation &amp; Useful Lives" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={15} para="Para 46" /> Each part of an item of PPE with a cost that is significant in relation to the total cost of the item should be depreciated separately (component depreciation).
        </p>
        <p className="leading-relaxed mb-4">
          The depreciable amount of an asset should be allocated on a systematic basis over its useful life. The depreciation method used should reflect the pattern in which the asset's future economic benefits are expected to be consumed.
        </p>
        <NoteBox type="exam" title="Review of Depreciation Method &amp; Useful Lives">
          <p>The depreciation method, useful life, and residual value of an asset must be reviewed at least at each financial year-end. If there is a significant change in the expected pattern or life, they must be changed. <ParaRef page={17} para="Para 61–63" /></p>
          <p className="mt-2 text-rose-605 font-bold">Critical Exam Point: Such a change is treated as a Change in Accounting ESTIMATE under AS 5. The change is accounted for PROSPECTIVELY by allocating the remaining carrying value over the revised useful life. It is NOT a change in accounting policy!</p>
        </NoteBox>

        {/* 10. Derecognition */}
        <SecHeader id="as10-derecognition" num="10" title="Derecognition &amp; Disposals" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={18} para="Para 68" /> The carrying amount of an item of PPE should be derecognised:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-700 dark:text-gray-300 mb-4">
          <li>On disposal (by sale, lease, or donation).</li>
          <li>When no future economic benefits are expected from its use or disposal.</li>
        </ul>
        <p>
          The gain or loss arising from the derecognition of an item of PPE (calculated as the difference between net disposal proceeds and the carrying amount of the asset) should be included in the Statement of Profit &amp; Loss when the item is derecognised. Gains should not be classified as revenue.
        </p>

        {/* 11. Disclosure */}
        <SecHeader id="as10-disclosure" num="11" title="Disclosure Requirements" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={19} para="Para 73" /> The financial statements should disclose, for each class of PPE:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-700 dark:text-gray-300">
          <li>Measurement bases used for determining the gross carrying amount.</li>
          <li>Depreciation methods used.</li>
          <li>Useful lives or the depreciation rates used.</li>
          <li>Gross carrying amount and accumulated depreciation at the beginning and end of the period.</li>
          <li>A reconciliation of the carrying amount at the beginning and end of the period showing additions, disposals, revaluations, impairment losses, and depreciation.</li>
        </ul>

      </div>
    </div>
  )
}



const as11Sections = [
  { id: 'as11-overview',          title: '1. Overview & Purpose' },
  { id: 'as11-scope',             title: '2. Scope & Applicability (Para 1–2)' },
  { id: 'as11-definitions',       title: '3. Definitions (Para 7)' },
  { id: 'as11-monetary',          title: '4. Monetary vs Non-Monetary (Para 7)' },
  { id: 'as11-initial',           title: '5. Initial Recognition (Para 8–10)' },
  { id: 'as11-subsequent',        title: '6. Subsequent Recognition (Para 11–12)' },
  { id: 'as11-foreign-ops',       title: '7. Integral & Non-Integral Ops (Para 21–26)' },
  { id: 'as11-forward',           title: '8. Forward Contracts (Para 36–37)' },
  { id: 'as11-disclosure',        title: '9. Disclosures (Para 38–41)' },
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
    forwardContracts: true,
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
    if (as11Sections[0]?.id === activeSection) {
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
      as11Sections.forEach(s => {
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
    '5':  { num: 'text-cyan-600 dark:text-cyan-400',    border: 'border-cyan-400',    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-400 dark:border-cyan-800' },
    '6':  { num: 'text-violet-600 dark:text-violet-400',border: 'border-violet-400',  badge: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800' },
    '7':  { num: 'text-amber-600 dark:text-amber-400',  border: 'border-amber-400',   badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800' },
    '8':  { num: 'text-rose-600 dark:text-rose-400',    border: 'border-rose-400',    badge: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800' },
    '9':  { num: 'text-red-655 dark:text-red-400',      border: 'border-red-400',     badge: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-805' },
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
      success: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200 border-l-emerald-500',
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
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-655 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={`Open ICAI AS 11 PDF — ${para}`}
    >
      <FileText size={9} className="shrink-0" />
      {para} (p. {page})
    </button>
  )

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      {/* Sticky Section Sub-Navbar */}
      <div id="as11-standard-sticky-toc" className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <BookOpen size={9.5} />
          AS 11 Sections:
        </span>
        {as11Sections.map((sec) => (
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
        
        {/* 1. Overview */}
        <SecHeader id="as11-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Overview" /> Accounting Standard 11 governs how to include **foreign currency transactions** and **foreign operations** in the financial statements of an enterprise, and how to translate financial statements into a reporting currency.
        </p>
        <p className="leading-relaxed">
          The principal issues are which exchange rate(s) to use and how to recognize the financial effect of changes in exchange rates in the financial statements.
        </p>

        {/* 2. Scope & Applicability */}
        <SecHeader id="as11-scope" num="2" title="Scope &amp; Applicability (Para 1–2)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={4} para="Para 1" /> This standard should be applied:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>In accounting for **transactions in foreign currencies**.</li>
          <li>In translating the **financial statements of foreign operations**.</li>
          <li>In accounting for forward exchange contracts.</li>
        </ul>
        <NoteBox type="info" title="Exclusions (Para 2)">
          AS 11 does not apply to:
          <ul className="list-circle pl-5 mt-1 space-y-0.5 text-xs">
            <li>Translation of cash flows of foreign operations (covered by AS 3).</li>
            <li>Exchange differences on borrowings regarded as borrowing cost adjustments (covered by AS 16).</li>
            <li>Restatement of financial statements for user convenience.</li>
          </ul>
        </NoteBox>

        {/* 3. Definitions */}
        <SecHeader id="as11-definitions" num="3" title="Definitions (Para 3)" />
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13.5px] border-collapse rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Term</th>
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">AS 11 Official Definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Reporting Currency</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">The currency used in presenting the financial statements.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-950/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Foreign Currency</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">A currency other than the reporting currency of an enterprise.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Closing Rate</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">The spot exchange rate at the balance sheet date.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-950/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Exchange Difference</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">The difference resulting from reporting the same number of units of a foreign currency in the reporting currency at different exchange rates.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. Monetary vs Non-Monetary */}
        <SecHeader id="as11-monetary" num="4" title="Monetary vs Non-Monetary Items" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={4} para="Para 7" /> The distinction between monetary and non-monetary items is the most critical concept for year-end reporting under AS 11.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('monetary')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Classification Guide &amp; Rules</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.monetary ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.monetary && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed">
              <p><strong>Monetary Items:</strong> Money held and assets/liabilities to be received or paid in fixed or determinable amounts of money.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Examples: Cash, bank balances, trade debtors, bills receivable, trade creditors, loans payable.</li>
                <li>Rule: Revalued at closing rate.</li>
              </ul>
              <p><strong>Non-Monetary Items:</strong> Assets and liabilities other than monetary items.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Examples: Fixed assets (property, plant, equipment), depreciation, inventory, investments in equity shares, prepaid expenses.</li>
                <li>Rule: Maintained at historical transaction rate.</li>
              </ul>
            </div>
          )}
        </div>

        {/* 5. Initial Recognition */}
        <SecHeader id="as11-initial" num="5" title="Initial Recognition &amp; Spot Rate (Para 8–10)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={5} para="Para 9" /> A foreign currency transaction should be recorded, on initial recognition in the reporting currency, by applying to the foreign currency amount the **exchange rate between the reporting currency and the foreign currency at the date of the transaction**.
        </p>
        <p className="leading-relaxed">
          For practical reasons, a rate that approximates the actual rate is often used (e.g. an average rate for the week or month). However, if exchange rates fluctuate significantly, the use of the average rate is not reliable.
        </p>

        {/* 6. Translation at Reporting Date */}
        <SecHeader id="as11-translation" num="6" title="Reporting at Subsequent Balance Sheet Dates (Para 11–12)" />
        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('translation')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Summary of Year-End Translation Rules</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.translation ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.translation && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2.5 leading-relaxed">
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Foreign Currency Monetary Items:</strong> Should be reported using the **closing rate** ($1 = ₹82).</li>
                <li><strong>Non-Monetary Items carried at Historical Cost:</strong> Should be reported using the exchange rate at the **date of the transaction** (no change).</li>
                <li><strong>Non-Monetary Items carried at Fair Value:</strong> Should be reported using the exchange rate prevailing when the fair value was determined (e.g. valuation date).</li>
              </ul>
            </div>
          )}
        </div>

        {/* 7. Foreign Operations */}
        <SecHeader id="as11-foreign-ops" num="7" title="Integral vs Non-Integral Foreign Operations (Para 24–32)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={7} para="Para 24" /> For consolidation, translation rules depend on whether the foreign operation is classified as **Integral** or **Non-Integral**.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('foreignOps')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Key Translation Differences (Para 26–32)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.foreignOps ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.foreignOps && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed">
              <p><strong>Integral Foreign Operation (IFO):</strong> Translated as if the transactions were those of the reporting enterprise itself. All assets/liabilities are translated based on their monetary/non-monetary status. The resulting exchange differences go to the **Statement of Profit &amp; Loss**.</p>
              <p><strong>Non-Integral Foreign Operation (NIFO):</strong> Translated by taking all assets and liabilities (both monetary and non-monetary) at the **closing rate**. Income and expenses are translated at the **average rate**. The resulting exchange differences are accumulated in a **Foreign Currency Translation Reserve (FCTR)** in equity.</p>
            </div>
          )}
        </div>

        {/* 8. Forward Contracts */}
        <SecHeader id="as11-forward" num="8" title="Forward Exchange Contracts (Para 36–37)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={9} para="Para 36" /> Accounting for forward exchange contracts depends on whether the contract is for hedging purposes or speculative purposes.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('forwardContracts')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Forward Contract Accounting Rules</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.forwardContracts ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.forwardContracts && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed">
              <p><strong>For Hedging Purposes (Para 36):</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Premium/Discount (difference between forward rate and spot rate at inception) is amortized over the life of the contract.</li>
                <li>Exchange difference (revaluation to spot rate at closing/settlement) is recognized in P&amp;L immediately.</li>
              </ul>
              <p><strong>For Speculative Purposes (Para 37):</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>No premium amortization.</li>
                <li>The contract is revalued to fair value at reporting date, and the entire gain or loss is recognized in the Statement of Profit and Loss.</li>
              </ul>
            </div>
          )}
        </div>

        {/* 9. Disclosures */}
        <SecHeader id="as11-disclosure" num="9" title="Disclosure Requirements (Para 38–41)" />
        <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40 text-[13.5px] space-y-2">
          <h4 className="font-bold text-slate-950 dark:text-white text-xs mb-1.5 uppercase tracking-wide">Required Disclosures under AS 11:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>The **amount of exchange differences** included in the net profit or loss for the period.</li>
            <li>Net exchange differences accumulated in **Foreign Currency Translation Reserve (FCTR)** shown as a separate component of shareholder's funds.</li>
            <li>A reconciliation of the amount of such exchange differences at the beginning and end of the period.</li>
          </ul>
        </div>

      </div>
    </div>
  )
}

const as12Sections = [
  { id: 'as12-overview',          title: '1. Overview & Purpose' },
  { id: 'as12-scope',             title: '2. Scope & Applicability (Para 1)' },
  { id: 'as12-definitions',       title: '3. Definitions (Para 2)' },
  { id: 'as12-recognition',       title: '4. Recognition Criteria (Para 4)' },
  { id: 'as12-asset-grants',      title: '5. Asset-Related Grants (Para 8–10)' },
  { id: 'as12-revenue-grants',    title: '6. Revenue-Related Grants (Para 11–13)' },
  { id: 'as12-refund',            title: '7. Refund of Grants (Para 11.3)' },
  { id: 'as12-disclosure',        title: '8. Disclosures (Para 23)' },
]

interface AS12StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
}

function AS12StandardTabContent({ navigateToPdfPage }: AS12StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as12-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    assetGrants: true,
    revenueGrants: true,
    promoterGrants: true,
    refunds: true,
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
    if (as12Sections[0]?.id === activeSection) {
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
      as12Sections.forEach(s => {
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
      warning: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-205 border-l-amber-500',
      success: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200 border-l-emerald-500',
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
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-655 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={`Open ICAI AS 12 PDF — ${para}`}
    >
      <FileText size={9} className="shrink-0" />
      {para} (p. {page})
    </button>
  )

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      {/* Sticky Section Sub-Navbar */}
      <div id="as12-standard-sticky-toc" className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <BookOpen size={9.5} />
          AS 12 Sections:
        </span>
        {as12Sections.map((sec) => (
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
        
        {/* 1. Overview */}
        <SecHeader id="as12-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Overview" /> Accounting Standard 12 sets out the principles of accounting for, and presentation of, **Government Grants** in financial statements.
        </p>
        <p className="leading-relaxed">
          Government grants are sometimes called by other names such as subsidies, cash incentives, duty drawbacks, etc. The main issue is deciding whether grants should be credited directly to capital (Capital Reserve) or matched with operational costs (Income/Revenue Approach).
        </p>

        {/* 2. Scope & Applicability */}
        <SecHeader id="as12-scope" num="2" title="Scope &amp; Applicability (Para 1–2)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={4} para="Para 1" /> This standard deals with accounting for government grants.
        </p>
        <NoteBox type="info" title="Exclusions (Para 2)">
          AS 12 does not deal with:
          <ul className="list-circle pl-5 mt-1 space-y-0.5 text-xs">
            <li>The special problems arising from the effects of changing prices (inflation accounting).</li>
            <li>Government assistance other than in the form of government grants (e.g., tax holidays, custom duty exemptions, infrastructural concessions).</li>
            <li>Government participation in the ownership of the enterprise (equity capital subscription).</li>
          </ul>
        </NoteBox>

        {/* 3. Definitions */}
        <SecHeader id="as12-definitions" num="3" title="Definitions (Para 3)" />
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13.5px] border-collapse rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Term</th>
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">AS 12 Definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Government</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Government, government agencies and similar bodies whether local, national or international.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-950/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Government Grants</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Assistance by government in cash or kind to an enterprise for past or future compliance with certain conditions. They exclude assistance which cannot reasonably have a value placed upon them and transactions which cannot be distinguished from the normal trading activities.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. Recognition Criteria */}
        <SecHeader id="as12-recognition" num="4" title="Recognition &amp; Assurance (Para 4)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={5} para="Para 4" /> Government grants, including non-monetary grants at fair value, should not be recognized until there is **reasonable assurance** that:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>The enterprise will comply with the conditions attaching to them; and</li>
          <li>The grants will actually be received.</li>
        </ul>
        <NoteBox type="warning" title="Crucial Rule on Receipt">
          Mere receipt of a grant is not of itself conclusive evidence that the conditions attaching to the grant have been or will be fulfilled. If you receive cash but cannot fulfill the conditions, you must set up a liability rather than recognizing income!
        </NoteBox>

        {/* 5. Depreciable Asset Grants */}
        <SecHeader id="as12-depreciable" num="5" title="Grants for Specific Fixed Assets (Para 8)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={5} para="Para 8" /> Grants related to specific fixed assets are those whose primary condition is that the enterprise should purchase, construct or otherwise acquire such assets.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('assetGrants')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Two Presentation Methods</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.assetGrants ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.assetGrants && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed">
              <p><strong>Method A (Reduction from Cost):</strong> The grant is shown as a deduction from the gross value of the asset in arriving at its book value. Depreciation is subsequently charged on the **net adjusted book value** over the remaining useful life.</p>
              <p><strong>Method B (Deferred Income Approach):</strong> The grant is treated as **deferred income** (Deferred Government Grant A/c) and recognized in the Profit &amp; Loss statement on a systematic basis over the useful life of the asset. The asset is maintained at its **gross purchase cost**.</p>
            </div>
          )}
        </div>

        {/* 6. Revenue & Promoters' Contribution */}
        <SecHeader id="as12-revenue-promoter" num="6" title="Revenue Grants &amp; Promoters' Contribution (Para 10–11)" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('revenueGrants')}>
              <span className="font-bold text-slate-900 dark:text-white text-sm">Revenue Grants (Para 11)</span>
              <ChevronDown size={16} className={`transform transition-transform ${openAccordions.revenueGrants ? 'rotate-180' : ''}`} />
            </div>
            {openAccordions.revenueGrants && (
              <div className="p-4 bg-white dark:bg-[#111726] text-xs leading-relaxed">
                <p>Grants related to revenue are those meant to offset operational expenses or support general profitability.</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Presented as credit under **"Other Income"** or deducted from the related expense.</li>
                  <li>Recognized in the P&amp;L over the periods necessary to match them with the related costs they are intended to compensate.</li>
                </ul>
              </div>
            )}
          </div>

          <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('promoterGrants')}>
              <span className="font-bold text-slate-900 dark:text-white text-sm">Promoters' Contribution (Para 10)</span>
              <ChevronDown size={16} className={`transform transition-transform ${openAccordions.promoterGrants ? 'rotate-180' : ''}`} />
            </div>
            {openAccordions.promoterGrants && (
              <div className="p-4 bg-white dark:bg-[#111726] text-xs leading-relaxed">
                <p>Grants given as capital incentives to set up industries in backward areas with no specific asset obligations.</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Credited directly to **Capital Reserve** under Shareholders' Funds.</li>
                  <li>No amortization or routing through P&amp;L is permitted.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 7. Refund of Grants */}
        <SecHeader id="as12-refund" num="7" title="Refund of Government Grants (Para 11.3)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={6} para="Para 11.3" /> When a government grant becomes refundable (due to non-fulfillment of conditions), the refund is treated as an **extraordinary item** under AS 5.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('refunds')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Accounting Adjustments on Refund</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.refunds ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.refunds && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2.5 leading-relaxed">
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Revenue Grants:</strong> First applied against any unamortized deferred credit balance. Any excess refund is charged immediately to the **Statement of Profit &amp; Loss**.</li>
                <li><strong>Fixed Asset Grants (Cost Reduction Method):</strong> The refund amount is **added to the cost** of the asset. Depreciation is adjusted prospectively over the remaining useful life of the asset.</li>
                <li><strong>Fixed Asset Grants (Deferred Income Method):</strong> The Deferred Government Grant account balance is reduced by the refund amount. Any excess refund is charged immediately to the **Statement of Profit &amp; Loss**.</li>
                <li><strong>Promoters' Contribution:</strong> Debited directly to **Capital Reserve** (reducing Shareholders' Funds).</li>
              </ul>
            </div>
          )}
        </div>

        {/* 8. Disclosures */}
        <SecHeader id="as12-disclosure" num="8" title="Disclosure Requirements (Para 23)" />
        <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40 text-[13.5px] space-y-2">
          <h4 className="font-bold text-slate-950 dark:text-white text-xs mb-1.5 uppercase tracking-wide">Required Disclosures under AS 12:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>The **accounting policy** adopted for government grants, including the methods of presentation in financial statements.</li>
            <li>The **nature and extent** of government grants recognized in the financial statements, including grants of non-monetary assets given at concessional rates or free of cost.</li>
          </ul>
        </div>

      </div>
    </div>
  )
}

const as13Sections = [
  { id: 'as13-overview',          title: '1. Overview & Purpose' },
  { id: 'as13-scope',             title: '2. Scope & Applicability (Para 1–2)' },
  { id: 'as13-definitions',       title: '3. Definitions (Para 3)' },
  { id: 'as13-cost',              title: '4. Cost of Investments (Para 5–13)' },
  { id: 'as13-valuation',         title: '5. Subsequent Valuation (Para 14–17)' },
  { id: 'as13-transfer',          title: '6. Inter-class Transfers (Para 18–19)' },
  { id: 'as13-disposal',          title: '7. Disposal of Investments (Para 21–22)' },
  { id: 'as13-disclosure',        title: '8. Disclosures (Para 35)' },
]

interface AS13StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
}

function AS13StandardTabContent({ navigateToPdfPage }: AS13StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as13-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    classifications: true,
    costs: true,
    valuations: true,
    transfers: true,
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
    if (as13Sections[0]?.id === activeSection) {
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
      as13Sections.forEach(s => {
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
      warning: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-205 border-l-amber-500',
      success: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200 border-l-emerald-500',
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
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-655 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={`Open ICAI AS 13 PDF — ${para}`}
    >
      <FileText size={9} className="shrink-0" />
      {para} (p. {page})
    </button>
  )

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      {/* Sticky Section Sub-Navbar */}
      <div id="as13-standard-sticky-toc" className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <BookOpen size={9.5} />
          AS 13 Sections:
        </span>
        {as13Sections.map((sec) => (
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
        
        {/* 1. Overview */}
        <SecHeader id="as13-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Overview" /> Accounting Standard 13 sets out the principles of accounting for **Investments** in financial statements.
        </p>
        <p className="leading-relaxed">
          The standard addresses the classification of investments into current and long-term, the determination of initial cost of investments, the subsequent measurement carrying values, and the treatment of disposals and reclassifications.
        </p>

        {/* 2. Scope & Applicability */}
        <SecHeader id="as13-scope" num="2" title="Scope &amp; Applicability (Para 1–2)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={4} para="Para 1" /> AS 13 applies to all investments in the financial statements of an enterprise.
        </p>
        <NoteBox type="info" title="Exclusions (Para 2)">
          AS 13 does not deal with:
          <ul className="list-circle pl-5 mt-1 space-y-0.5 text-xs">
            <li>Bases for recognition of interest, dividends and rentals earned on investments (covered by AS 9).</li>
            <li>Operating or finance leases (covered by AS 19).</li>
            <li>Investments of retirement benefit plans and life insurance enterprises.</li>
            <li>Mutual funds, venture capital funds and related asset management companies.</li>
          </ul>
        </NoteBox>

        {/* 3. Definitions */}
        <SecHeader id="as13-definitions" num="3" title="Definitions (Para 3)" />
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13.5px] border-collapse rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Term</th>
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">AS 13 Definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Investments</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Assets held by an enterprise for earning income by way of dividends, interest, and rentals, for capital appreciation, or for other benefits to the investing enterprise. Assets held as stock-in-trade are NOT investments.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Current Investment</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">An investment that is by its nature readily realizable and is intended to be held for not more than one year from the date on which such investment is made.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Long-term Investment</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">An investment other than a current investment.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-950/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Investment Property</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">An investment in land or buildings that are not intended to be occupied substantially for use by, or in the operations of, the investing enterprise.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. Cost of Investments */}
        <SecHeader id="as13-cost" num="4" title="Cost of Investments (Para 5–13)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={5} para="Para 5" /> The cost of an investment should include acquisition charges such as brokerage, fees and duties.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('costs')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Cost Components &amp; Adjustments</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.costs ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.costs && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed">
              <p><strong>Non-Cash Acquisition (Para 11):</strong> If an investment is acquired by the issue of shares or other securities, the cost is the **fair value of the securities issued**. If the securities do not have a reliable market price, use the **fair value of the asset acquired**.</p>
              <p><strong>Pre-Acquisition Interest/Dividends (Para 13):</strong> If interest/dividends have accrued before the date of purchase and are subsequently received, the portion relating to the pre-acquisition period is **deducted from cost** of the investment. Only post-acquisition earnings can go to the P&amp;L account.</p>
            </div>
          )}
        </div>

        {/* 5. Subsequent Valuation */}
        <SecHeader id="as13-valuation" num="5" title="Subsequent Valuation &amp; Carrying Amounts (Para 14–17)" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('valuations')}>
              <span className="font-bold text-slate-900 dark:text-white text-sm">Current Investments (Para 14)</span>
              <ChevronDown size={16} className={`transform transition-transform ${openAccordions.valuations ? 'rotate-180' : ''}`} />
            </div>
            {openAccordions.valuations && (
              <div className="p-4 bg-white dark:bg-[#111726] text-xs leading-relaxed space-y-2">
                <p>Carried at the **lower of cost and fair value (market value)**.</p>
                <p>Valuation can be determined on an **individual investment basis** (most prudent) or by **category of investment**, but NOT on an overall aggregate portfolio basis.</p>
                <p>Any reduction to fair value is charged to the Statement of Profit and Loss.</p>
              </div>
            )}
          </div>

          <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('ltValuations')}>
              <span className="font-bold text-slate-900 dark:text-white text-sm">Long-term Investments (Para 17)</span>
              <ChevronDown size={16} className={`transform transition-transform ${openAccordions.ltValuations ? 'rotate-180' : ''}`} />
            </div>
            {openAccordions.ltValuations && (
              <div className="p-4 bg-white dark:bg-[#111726] text-xs leading-relaxed space-y-2">
                <p>Carried at **cost**.</p>
                <p>The carrying amount is reduced to recognize a decline in value that is **other than temporary**.</p>
                <p>The reduction is determined for each investment individually. Indicators of other-than-temporary decline include erosion of net worth, prolonged operating losses, or insolvency proceedings.</p>
              </div>
            )}
          </div>
        </div>

        {/* 6. Inter-class Transfers */}
        <SecHeader id="as13-transfer" num="6" title="Reclassification &amp; Inter-class Transfers (Para 18–19)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={6} para="Para 18–19" /> When investments are reclassified between current and long-term portfolios:
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('transfers')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Reclassification Rules</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.transfers ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.transfers && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2.5 leading-relaxed">
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Long-term to Current Portfolio:</strong> Transfer is made at the **lower of cost and carrying amount** at the date of transfer.</li>
                <li><strong>Current to Long-term Portfolio:</strong> Transfer is made at the **lower of cost and fair value** at the date of transfer.</li>
              </ul>
              <p className="font-semibold text-rose-600 dark:text-rose-400">Prudence rationale: The loss in converting Current to LT is recognized immediately, preventing companies from hiding losses by simply changing classification.</p>
            </div>
          )}
        </div>

        {/* 7. Disposal of Investments */}
        <SecHeader id="as13-disposal" num="7" title="Disposal of Investments (Para 21–22)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={6} para="Para 21" /> On disposal of an investment, the difference between the net disposal proceeds and the carrying amount is recognized as **profit or loss** in the P&amp;L statement.
        </p>
        <p>
          If only a part of the holding is sold, the carrying value of the sold portion is determined using methods such as FIFO, Weighted Average, or specific identification. In practice, the **Weighted Average cost method** is most commonly applied.
        </p>

        {/* 8. Disclosures */}
        <SecHeader id="as13-disclosure" num="8" title="Disclosure Requirements (Para 35)" />
        <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40 text-[13.5px] space-y-2">
          <h4 className="font-bold text-slate-950 dark:text-white text-xs mb-1.5 uppercase tracking-wide">Required Disclosures under AS 13:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>The **accounting policies** adopted for valuation and classification of investments.</li>
            <li>The **amounts of income** included in P&amp;L from interest, dividends, and rentals (showing gross income and tax deducted at source).</li>
            <li>The **cost and market value** of quoted investments, and the cost of unquoted investments.</li>
            <li>Significant restrictions on the right of ownership, transferability, or realizability of investments.</li>
          </ul>
        </div>

      </div>
    </div>
  )
}


const as14Sections = [
  { id: 'as14-overview',          title: '1. Overview & Purpose' },
  { id: 'as14-scope',             title: '2. Scope & Applicability (Para 1–2)' },
  { id: 'as14-definitions',       title: '3. Definitions (Para 3)' },
  { id: 'as14-types',             title: '4. Types of Amalgamation (Para 3(e) & Para 29)' },
  { id: 'as14-methods',           title: '5. Methods of Accounting (Para 30–33)' },
  { id: 'as14-consideration',     title: '6. Purchase Consideration (Para 3(g) & Para 34)' },
  { id: 'as14-reserves-goodwill', title: '7. Reserves & Goodwill (Para 35–39)' },
  { id: 'as14-disclosure',        title: '8. Disclosures (Para 43–46)' },
]

interface AS14StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
}

function AS14StandardTabContent({ navigateToPdfPage }: AS14StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as14-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    mergerConditions: true,
    poolingRules: true,
    purchaseRules: true,
    statutoryReserves: true,
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
    if (as14Sections[0]?.id === activeSection) {
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
      as14Sections.forEach(s => {
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
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-655 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={`Open ICAI AS 14 PDF — ${para}`}
    >
      <FileText size={9} className="shrink-0" />
      {para} (p. {page})
    </button>
  )

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      {/* Sticky Section Sub-Navbar */}
      <div id="as14-standard-sticky-toc" className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <BookOpen size={9.5} />
          AS 14 Sections:
        </span>
        {as14Sections.map((sec) => (
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
        <SecHeader id="as14-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Overview" /> Accounting Standard 14 specifies the accounting treatment of **amalgamations** and the treatment of any goodwill or reserves arising therefrom.
        </p>
        <p className="leading-relaxed">
          Amalgamations are critical corporate restructuring events where the assets, liabilities, and business operations of one or more companies (transferor companies) are integrated into another company (transferee company). The core accounting issues relate to classification of the transaction, calculation of purchase consideration, and consolidation of reserves and assets.
        </p>

        {/* 2. Scope & Applicability */}
        <SecHeader id="as14-scope" num="2" title="Scope &amp; Applicability (Para 1–2)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={4} para="Para 1" /> This standard applies in accounting for amalgamations and schemes of compromise or arrangement in the books of the **transferee company**.
        </p>
        <p className="leading-relaxed">
          It applies to mergers, acquisitions, and reconstructions under the Companies Act, 2013. It does not apply to acquisitions of individual assets or business acquisitions that do not constitute an amalgamation under the law.
        </p>

        {/* 3. Definitions */}
        <SecHeader id="as14-definitions" num="3" title="Definitions (Para 3)" />
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13.5px] border-collapse rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Term</th>
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">AS 14 Definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Amalgamation</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">An amalgamation pursuant to the provisions of the Companies Act, 2013 or any other statute.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-950/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Transferor Company</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">The company which is amalgamated into another company (the target or selling entity).</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Transferee Company</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">The company into which the transferor company is amalgamated (the acquiring or surviving entity).</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-950/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Reserves</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">The portion of earnings, capital, or other surpluses not designated for any specific liability or dividend distribution.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. Types of Amalgamation */}
        <SecHeader id="as14-types" num="4" title="Types of Amalgamation (Para 3(e) &amp; Para 29)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={5} para="Para 3(e)" /> AS 14 classifies amalgamations into two distinct categories:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Amalgamation in the Nature of Merger:</strong> A transaction where there is a genuine pooling of assets, liabilities, and shareholder interests.</li>
          <li><strong>Amalgamation in the Nature of Purchase:</strong> A transaction where one enterprise acquires another and does not carry over reserves or interests.</li>
        </ul>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('mergerConditions')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">The 5 Mandatory Conditions for Merger (Para 3(e))</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.mergerConditions ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.mergerConditions && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3.5 leading-relaxed">
              <p>For an amalgamation to be classified as in the nature of **Merger**, all five conditions must be satisfied without exception:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>All Assets and Liabilities:</strong> All assets and liabilities of the transferor company become, after amalgamation, the assets and liabilities of the transferee company.</li>
                <li><strong>90% Equity Shareholder Continuity:</strong> Shareholders holding not less than **90% of the face value** of the equity shares of the transferor company (other than shares already held by transferee) agree to become equity shareholders of the transferee.</li>
                <li><strong>Solely Share Consideration:</strong> The consideration is discharged by the transferee company to the equity shareholders of the transferor company **solely by the issue of equity shares** in the transferee company, except that cash may be paid in respect of any fractional shares.</li>
                <li><strong>Business Continuity:</strong> The business of the transferor company is intended to be carried on, after the amalgamation, by the transferee company.</li>
                <li><strong>Book Value Continuity:</strong> No adjustment is intended to be made to the book values of the assets and liabilities of the transferor company when they are incorporated, except to ensure uniformity of accounting policies.</li>
              </ol>
              <NoteBox type="warning" title="Exception Rule">
                If even a single condition is violated, the transaction is classified as an **Amalgamation in the Nature of Purchase**.
              </NoteBox>
            </div>
          )}
        </div>

        {/* 5. Methods of Accounting */}
        <SecHeader id="as14-methods" num="5" title="Methods of Accounting (Para 30–33)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={6} para="Para 30" /> The standard prescribes two different accounting methods depending on the type of amalgamation:
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('poolingRules')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">1. Pooling of Interests Method (For Merger)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.poolingRules ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.poolingRules && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2.5 leading-relaxed">
              <ul className="list-disc pl-5 space-y-1">
                <li>Assets, liabilities, and reserves of the transferor company are recorded at their existing carrying amounts (Book Values).</li>
                <li>The identity of the **reserves** is preserved (General, Capital, Statutory reserves, etc. are carried over).</li>
                <li>Any difference between the purchase consideration and the amount of share capital of the transferor is adjusted in the **General Reserve** of the transferee.</li>
              </ul>
            </div>
          )}
        </div>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('purchaseRules')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">2. Purchase Method (For Purchase)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.purchaseRules ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.purchaseRules && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2.5 leading-relaxed">
              <ul className="list-disc pl-5 space-y-1">
                <li>Assets and liabilities are recorded either at their book values or at their **fair values** at the date of acquisition.</li>
                <li>Reserves (other than statutory reserves) are **not** carried over in the transferee's books.</li>
                <li>The difference between Net Assets acquired and Purchase Consideration is recognized as **Goodwill** (if negative difference, debited) or **Capital Reserve** (if positive difference, credited).</li>
                <li>Goodwill is amortized systematically over its useful life, not exceeding **5 years** (Para 18).</li>
              </ul>
            </div>
          )}
        </div>

        {/* 6. Purchase Consideration */}
        <SecHeader id="as14-consideration" num="6" title="Purchase Consideration (Para 3(g) &amp; Para 34)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={5} para="Para 3(g)" /> Purchase consideration is the price paid by the transferee company to the owners of the transferor company.
        </p>
        <NoteBox type="exam" title="Exam Trap Alert">
          Purchase Consideration comprises **only** payments made to **Equity and Preference Shareholders**. It must strictly exclude payments made to debenture holders, lenders, and trade creditors.
        </NoteBox>
        <p className="leading-relaxed">
          Discharge of debenture holders is treated as settlement of a liability taken over and does not increase or decrease the purchase consideration.
        </p>

        {/* 7. Treatment of Reserves & Goodwill */}
        <SecHeader id="as14-reserves-goodwill" num="7" title="Reserves &amp; Goodwill (Para 35–39)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={7} para="Para 39" /> Statutory reserves require unique treatment under the Purchase Method to ensure compliance with tax and other regulations.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('statutoryReserves')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Treatment of Statutory Reserves under Purchase Method</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.statutoryReserves ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.statutoryReserves && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed">
              <p>Since the reserves of the transferor are ignored in a purchase, statutory reserves (e.g., Investment Allowance Reserve, Export Profits Reserve) must be preserved in the transferee's balance sheet by posting the following entry:</p>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono">
                Amalgamation Adjustment Reserve A/c ..... Dr.<br />
                &nbsp;&nbsp;To Statutory Reserve A/c
              </div>
              <p>Amalgamation Adjustment Reserve is presented as a **negative balance** or debit under Reserves &amp; Surplus.</p>
            </div>
          )}
        </div>

        {/* 8. Disclosures */}
        <SecHeader id="as14-disclosure" num="8" title="Disclosure Requirements (Para 43–46)" />
        <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40 text-[13.5px] space-y-2">
          <h4 className="font-bold text-slate-950 dark:text-white text-xs mb-1.5 uppercase tracking-wide">Required Disclosures for all Amalgamations:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Names and general nature of business of the amalgamating companies.</li>
            <li>Effective date of amalgamation for accounting purposes.</li>
            <li>Method of accounting used (Pooling of Interests vs Purchase).</li>
            <li>Particulars of the scheme sanctioned under the Act.</li>
            <li>In case of Pooling of Interests: Description and amount of shares issued.</li>
            <li>In case of Purchase Method: Details of consideration paid, and treatment of Goodwill/Capital Reserve (including amortization details).</li>
          </ul>
        </div>

      </div>
    </div>
  )
}


const as15Sections = [
  { id: 'as15-overview',          title: '1. Overview & Purpose' },
  { id: 'as15-scope',             title: '2. Scope & Applicability (Para 1–5)' },
  { id: 'as15-definitions',       title: '3. Definitions (Para 7)' },
  { id: 'as15-short-term',        title: '4. Short-Term Employee Benefits (Para 8–23)' },
  { id: 'as15-post-employment',   title: '5. Post-Employment Benefits (Para 24–43)' },
  { id: 'as15-defined-benefit',   title: '6. Defined Benefit Obligation (Para 49–115)' },
  { id: 'as15-long-term',         title: '7. Other Long-Term Benefits (Para 126–131)' },
  { id: 'as15-termination',       title: '8. Termination & Disclosures (Para 133–142)' },
]

interface AS15StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
}

function AS15StandardTabContent({ navigateToPdfPage }: AS15StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as15-overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    shortTermRules: true,
    definedContribution: true,
    definedBenefitRules: true,
    actuarialAssumptions: true,
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
    if (as15Sections[0]?.id === activeSection) {
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
      as15Sections.forEach(s => {
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
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-655 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={`Open ICAI AS 15 PDF — ${para}`}
    >
      <FileText size={9} className="shrink-0" />
      {para} (p. {page})
    </button>
  )

  return (
    <div className="w-full animate-fade-in font-sans space-y-4">
      {/* Sticky Section Sub-Navbar */}
      <div id="as15-standard-sticky-toc" className="sticky top-[58px] bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xs py-2 px-3 border border-slate-200 dark:border-gray-800 rounded-lg z-20 flex flex-row items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 select-none shadow-xs">
        <span className="text-[9.5px] font-extrabold uppercase text-slate-400 dark:text-gray-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <BookOpen size={9.5} />
          AS 15 Sections:
        </span>
        {as15Sections.map((sec) => (
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
        <SecHeader id="as15-overview" num="1" title="Overview &amp; Purpose" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={1} para="Overview" /> Accounting Standard 15 governs the accounting and disclosure of **employee benefits**.
        </p>
        <p className="leading-relaxed">
          The objective of the standard is to prescribe the accounting treatment and disclosure requirements for all types of employee benefits. The standard requires an enterprise to recognize a liability when an employee has provided service in exchange for benefits to be paid in the future, and an expense when the enterprise consumes the economic benefit arising from service provided by an employee.
        </p>

        {/* 2. Scope & Applicability */}
        <SecHeader id="as15-scope" num="2" title="Scope &amp; Applicability (Para 1–5)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={4} para="Para 1" /> This standard should be applied by an employer in accounting for **all employee benefits**, except share-based payments (which are covered by Guidance Notes).
        </p>
        <p className="leading-relaxed">
          Employee benefits covered include those provided under formal plans, statutory agreements, or informal practices that give rise to constructive obligations. It covers short-term benefits, post-employment benefits, other long-term benefits, and termination benefits.
        </p>

        {/* 3. Definitions */}
        <SecHeader id="as15-definitions" num="3" title="Definitions (Para 7)" />
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13.5px] border-collapse rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">Term</th>
                <th className="p-3 font-bold border-b border-slate-200 dark:border-slate-700 text-left">AS 15 Definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Employee Benefits</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">All forms of consideration given by an enterprise in exchange for service rendered by employees.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-950/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Short-Term Benefits</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Employee benefits (other than termination benefits) which fall due wholly within twelve months after the end of the period in which the employees render the related service.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Post-Employment Benefits</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Employee benefits (other than termination benefits) which are payable after the completion of employment.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 bg-blue-50/10 dark:bg-blue-950/5">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Defined Benefit Plans</td>
                <td className="p-3 text-slate-700 dark:text-slate-300">Post-employment benefit plans under which an enterprise's obligation is to provide the agreed benefits to current and former employees, and the actuarial and investment risk fall on the enterprise.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. Short-Term Employee Benefits */}
        <SecHeader id="as15-short-term" num="4" title="Short-Term Employee Benefits (Para 8–23)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={6} para="Para 10" /> When an employee has rendered service to an enterprise during an accounting period, the enterprise should recognize the **undiscounted amount** of short-term employee benefits expected to be paid in exchange for that service.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('shortTermRules')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Rules for Short-Term Benefits (Compensated Absences)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.shortTermRules ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.shortTermRules && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-3 leading-relaxed">
              <p><strong>Accumulating Absences (Para 11-14):</strong> Absences that are carried forward and can be used in future periods if the current period's entitlement is not used in full. These can be either vesting (employees are entitled to cash settlement on leaving) or non-vesting. The enterprise must recognize an accrued liability based on expected usage.</p>
              <p><strong>Non-Accumulating Absences (Para 16):</strong> Absences that do not carry forward. They lapse if the current period's entitlement is not used in full and do not entitle employees to cash payments on leaving. The cost is recognized only when the absence occurs.</p>
            </div>
          )}
        </div>

        {/* 5. Post-Employment Benefits */}
        <SecHeader id="as15-post-employment" num="5" title="Post-Employment Benefits: DC vs DB Plans" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={8} para="Para 24" /> Post-employment benefit plans are classified as either **Defined Contribution plans** or **Defined Benefit plans**, depending on the economic substance of the plan.
        </p>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('definedContribution')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Defined Contribution Plans (Para 44–48)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.definedContribution ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.definedContribution && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2 leading-relaxed">
              <p>Under a defined contribution plan, the enterprise's obligation is limited to the amount it agrees to contribute to the fund. Actuarial risk and investment risk fall on the employee.</p>
              <p><strong>Accounting Treatment:</strong> Simple accrual basis. The contribution payable for the period is recognized as an expense. No actuarial valuation is required.</p>
            </div>
          )}
        </div>

        {/* 6. Defined Benefit Obligation */}
        <SecHeader id="as15-defined-benefit" num="6" title="Defined Benefit Obligation (Para 49–115)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={11} para="Para 49" /> Accounting for defined benefit plans is complex because actuarial assumptions are required to measure the obligation and the expense.
        </p>
        <NoteBox type="warning" title="Actuarial Gains &amp; Losses Rule">
          Under AS 15, **actuarial gains and losses should be recognized immediately** in the Statement of Profit and Loss in the period in which they occur. No deferrals are allowed.
        </NoteBox>

        <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('definedBenefitRules')}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">PUC Actuarial Valuation Steps (Para 64–66)</span>
            <ChevronDown size={16} className={`transform transition-transform ${openAccordions.definedBenefitRules ? 'rotate-180' : ''}`} />
          </div>
          {openAccordions.definedBenefitRules && (
            <div className="p-4 bg-white dark:bg-[#111726] text-xs sm:text-[13px] space-y-2 leading-relaxed">
              <p>To measure the DBO and CSC, the enterprise must follow these steps using the cost method:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Apply actuarial assumptions to estimate the future benefit that employees have earned for their service.</li>
                <li>Discount that benefit using the Projected Unit Credit (PUC) method to determine the present value of the obligation.</li>
                <li>Determine the fair value of any plan assets and subtract it from the obligation to report the net asset or liability.</li>
              </ul>
            </div>
          )}
        </div>

        {/* 7. Other Long-Term Benefits */}
        <SecHeader id="as15-long-term" num="7" title="Other Long-Term Employee Benefits (Para 126–131)" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={28} para="Para 126" /> Other long-term benefits include items like long-service leave, sabbatical leave, or jubilee benefits.
        </p>
        <p className="leading-relaxed">
          The accounting treatment is simplified compared to defined benefit plans: actuarial gains and losses, as well as past service cost, are recognized immediately in the Statement of Profit &amp; Loss, and no complex disclosures are required.
        </p>

        {/* 8. Termination & Disclosures */}
        <SecHeader id="as15-termination" num="8" title="Termination Benefits &amp; Disclosures" />
        <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
          <ParaRef page={30} para="Para 134" /> Termination benefits are recognized as a liability and an expense only when the enterprise has a detailed formal plan for termination and is demonstrably committed to it.
        </p>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/40 text-[13.5px] space-y-2">
          <h4 className="font-bold text-slate-950 dark:text-white text-xs mb-1.5 uppercase tracking-wide">Required Disclosures for Defined Benefit Plans (Para 119):</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>The **accounting policy** adopted for recognizing actuarial gains and losses.</li>
            <li>A general description of the **type of plan** (gratuity, pension, etc.).</li>
            <li>A **reconciliation of opening and closing balances** of the present value of the defined benefit obligation.</li>
            <li>A **reconciliation of opening and closing balances** of the fair value of plan assets.</li>
            <li>The principal **actuarial assumptions** used (discount rates, expected rates of return on plan assets, salary growth rate, employee turnover).</li>
          </ul>
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
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-655 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
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
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-655 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
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
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-655 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
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
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-655 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
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


