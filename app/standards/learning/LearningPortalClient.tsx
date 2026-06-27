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

import { ASIntroStandardTabContent } from './ASIntroStandardTabContent'
import { ASIntroExamplesCustomContent } from './ASIntroExamplesCustomContent'
import { AS2StandardTabContent } from './AS2StandardTabContent'
import { AS3StandardTabContent } from './AS3StandardTabContent'
import { AS4StandardTabContent } from './AS4StandardTabContent'
import { AS5StandardTabContent } from './AS5StandardTabContent'
import { AS7StandardTabContent } from './AS7StandardTabContent'
import { AS9StandardTabContent } from './AS9StandardTabContent'
import { AS10StandardTabContent } from './AS10StandardTabContent'
import { AS11StandardTabContent } from './AS11StandardTabContent'
import { AS12StandardTabContent } from './AS12StandardTabContent'
import { AS13StandardTabContent } from './AS13StandardTabContent'
import { AS14StandardTabContent } from './AS14StandardTabContent'
import { AS15StandardTabContent } from './AS15StandardTabContent'
import { AS16StandardTabContent } from './AS16StandardTabContent'
import { AS17StandardTabContent } from './AS17StandardTabContent'
import { AS18StandardTabContent } from './AS18StandardTabContent'
import { AS19StandardTabContent } from './AS19StandardTabContent'
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
  'ind-as-100': 'Non-current Assets & Ops',
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
      className="inline-flex items-center justify-center w-4 h-4 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded transition-all cursor-pointer select-none align-middle"
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
            <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold mr-1 select-none">{arabicNum}.</span>
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
          className="w-full text-left font-serif font-bold text-slate-900 dark:text-white hover:text-amber-800 dark:hover:text-amber-400 flex items-center justify-between p-4 select-none cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <span className="text-slate-800 dark:text-slate-200 font-mono text-[11px] font-bold bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 select-none">
              {num}
            </span>
            <span className="text-[15.5px] tracking-tight font-sans font-extrabold text-slate-900 dark:text-white">{title}</span>
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
                <span className="text-slate-900 dark:text-slate-50 font-sans font-semibold text-xs bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-800 inline-block font-mono">
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
                <span className="text-slate-900 dark:text-slate-50 leading-normal font-sans text-xs">
                  {impact}
                </span>
              </div>
            </div>
            <div className="text-slate-900 dark:text-slate-50 leading-relaxed font-serif text-[14px] pt-1">
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
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Publication Sheet Canvas */}
      <div className="mx-auto w-[98%] max-w-[1720px] bg-white dark:bg-[#111726] shadow-sm border border-slate-200/70 dark:border-slate-800 rounded-xl px-4 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-8 relative my-4">

        {/* Chapter 1: Introduction & Purpose */}
        <section id="as1-overview" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="I" 
            title="Introduction &amp; Purpose of the Standard" 
            description="Overview of the primary causes of diversity in financial reporting, the qualitative necessity of systematic policy disclosure to ensure comparability."
          />
          
          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-100 leading-[1.85] font-serif">
            <p>
              Irrespective of the extent of standardization in accounting, diversity in <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 px-1.5 py-0.5 rounded font-mono text-[13.5px]">Accounting Policies</span> is unavoidable in business practice. <PdfRef page={2} /> This standard addresses this challenge by requiring comprehensive disclosures of the policies adopted by an enterprise.
            </p>
            <p>
              Under <span className="font-semibold text-slate-900 dark:text-white">AS 1 (Disclosure of Accounting Policies)</span>, diversity in policies is recognized as arising from two primary sources:
            </p>
          </div>

          {/* Premium Blue Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-blue-100 dark:border-blue-900/40 bg-blue-50/20 dark:bg-blue-900/5 rounded-xl space-y-2.5">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-blue-800 dark:text-blue-400 flex items-center gap-2">
                <Info size={14} />
                <span>1. Freedom in Uncovered Areas</span>
              </h4>
              <p className="text-[15px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Accounting standards cannot and do not cover all possible areas of accounting. Consequently, enterprises retain the freedom to adopt any reasonable accounting policy in areas not governed by an active standard. <PdfRef page={2} />
              </p>
            </div>
            <div className="p-5 border border-blue-100 dark:border-blue-900/40 bg-blue-50/20 dark:bg-blue-900/5 rounded-xl space-y-2.5">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-blue-800 dark:text-blue-400 flex items-center gap-2">
                <Info size={14} />
                <span>2. Diverse Operating Situations</span>
              </h4>
              <p className="text-[15px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
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
            
            <div className="p-6 my-6 border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/25 dark:bg-indigo-900/5 rounded-xl font-serif shadow-3xs">
              <span className="text-[11.5px] font-bold text-indigo-800 dark:text-indigo-400 uppercase tracking-wider block mb-2 font-sans">
                Core Analytical Observation ΓÇö Why Disclosure is Crucial
              </span>
              <p className="text-[15.5px] font-semibold text-slate-900 dark:text-slate-50 leading-relaxed">
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
                <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-900/20 transition-colors bg-white dark:bg-[#111726]">
                  <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2"><Users size={13} className="text-teal-600 shrink-0" /><span>Shareholders &amp; Investors</span></div>
                  </td>
                  <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Need accounting policy clarity to evaluate profit quality, calculate return on investment, and compare earnings across alternative investment opportunities.</td>
                </tr>
                <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-900/20 transition-colors bg-teal-50/20 dark:bg-[#0f1c22]/30">
                  <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2"><CreditCard size={13} className="text-teal-600 shrink-0" /><span>Creditors &amp; Suppliers</span></div>
                  </td>
                  <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Analyze inventory valuation and accrual policies to gauge the enterprise's short-term liquidity cycles, payment capabilities, and working capital ratios.</td>
                </tr>
                <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-900/20 transition-colors bg-white dark:bg-[#111726]">
                  <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2"><Briefcase size={13} className="text-teal-600 shrink-0" /><span>Banks &amp; Lenders</span></div>
                  </td>
                  <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Evaluate policy consistency to monitor debt service coverage ratios, assess collateral values (e.g. inventories or fixed assets), and ensure compliance with covenant terms.</td>
                </tr>
                <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-900/20 transition-colors bg-teal-50/20 dark:bg-[#0f1c22]/30">
                  <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2"><Scale size={13} className="text-teal-600 shrink-0" /><span>Regulators &amp; Tax Authorities</span></div>
                  </td>
                  <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Monitor compliance with corporate laws and calculate fair taxes. In India, Section 129(1) of the Companies Act, 2013 mandates that financial statements must portray a true and fair view and comply with accounting standards.</td>
                </tr>
                <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-900/20 transition-colors bg-white dark:bg-[#111726]">
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
          <div className="p-6 border-l-4 border-blue-600 dark:border-blue-400 border border-blue-200 dark:border-blue-900/40 bg-blue-50/30 dark:bg-blue-900/10 rounded-xl my-6">
            <div className="text-[10.5px] font-sans font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-3 flex items-center gap-2">
              <BookOpen size={13} className="text-blue-600 dark:text-blue-400" />
              <span>Official Definition ΓÇö AS 1, Para 11</span>
            </div>
            <p className="text-[16px] font-serif font-semibold text-slate-900 dark:text-slate-100 leading-[1.8] italic">
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
                  <tr className="hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-colors bg-white dark:bg-[#111726]">
                    <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Definition</td>
                    <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Specific accounting principles and the methods of applying those principles.</td>
                    <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Judgments made to estimate the carrying value of assets or liabilities under the selected policy.</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-colors bg-indigo-50/20 dark:bg-indigo-900/5">
                    <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Responsibility</td>
                    <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Board of Directors (statutory Directors' Responsibility Statement under Section 134(5)).</td>
                    <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Management and operational accountants based on the latest available information.</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-colors bg-white dark:bg-[#111726]">
                    <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Examples</td>
                    <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Switching from FIFO to Weighted Average cost formula.</td>
                    <td className="py-3.5 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Estimating provision for non-moving inventory based on a technical evaluation.</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-colors bg-indigo-50/20 dark:bg-indigo-900/5">
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
            <div className="p-5 border-t-2 border-amber-500 border border-amber-200 dark:border-amber-900/40 bg-amber-50/30 dark:bg-amber-900/10 rounded-xl space-y-2.5">
              <h4 className="font-sans font-bold text-[12px] uppercase tracking-wider text-amber-800 dark:text-amber-400">1. Prudence</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">
                Caution in prepared judgments: profits are recognized only when realized, and provisions are made for all known liabilities and losses.
              </p>
            </div>
            <div className="p-5 border-t-2 border-blue-500 border border-blue-200 dark:border-blue-900/40 bg-blue-50/30 dark:bg-blue-900/10 rounded-xl space-y-2.5">
              <h4 className="font-sans font-bold text-[12px] uppercase tracking-wider text-blue-800 dark:text-blue-400">2. Substance over Form</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">
                Accounting for economic reality and financial substance rather than legal technicalities.
              </p>
            </div>
            <div className="p-5 border-t-2 border-teal-500 border border-teal-200 dark:border-teal-900/40 bg-teal-50/30 dark:bg-teal-900/10 rounded-xl space-y-2.5">
              <h4 className="font-sans font-bold text-[12px] uppercase tracking-wider text-teal-800 dark:text-teal-400">3. Materiality</h4>
              <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">
                Disclosing all significant facts that could influence the economic choices of users based on size or nature.
              </p>
            </div>
          </div>

          {/* Sub-sections details */}
          <div id="as1-prudence" className="scroll-mt-36 space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-50 leading-[1.8] font-serif font-medium">
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
              However, <span className="bg-amber-50 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border border-amber-200/50 dark:border-amber-900/40 px-1.5 py-0.5 rounded font-semibold">Prudence</span> does not permit the creation of secret or hidden reserves by deliberately understating profits and assets or overstating liabilities and losses. The selection of policies must balance caution with neutrality to avoid bias in financial reporting. <PdfRef page={6} />
            </p>
            <div className="p-5 border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/10 rounded-xl space-y-2.5 my-5 shadow-3xs font-serif">
              <h4 className="font-sans font-bold text-[11px] uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                <Info size={13} className="text-amber-500" />
                <span>Prudence Application: Damage Suits</span>
              </h4>
              <p className="text-[15px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Suppose a company is facing a damage suit from a customer or competitor. Under the prudence principle, the company should not recognize a liability (or charge profit) unless the probability of losing the suit is more than the probability of not losing it (i.e. more likely than not). Recognizing provisions arbitrarily without high probability would violate the true and fair view by creating a hidden reserve. <PdfRef page={6} />
              </p>
            </div>
          </div>

          <div id="as1-substance" className="scroll-mt-36 space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-50 leading-[1.8] font-serif font-medium pt-4">
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
              <p className="text-[15px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                In a Hire-Purchase or Lease Agreement under AS 19, legal ownership remains with the lessor/seller until the final installment is paid. However, since the lessee/buyer gains immediate economic benefits and bears the operating risks of the asset, <span className="bg-blue-50 dark:bg-blue-900/40 text-blue-900 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/40 px-1.5 py-0.5 rounded font-semibold font-mono text-[13.5px]">Substance over Form</span> dictates that the asset is capitalized and depreciated in the buyer's balance sheet, while recording a liability for future payments. Accounting strictly by legal form (which would treat it as rent) would misrepresent the economic reality of the enterprise's capital structure. <PdfRef page={6} />
              </p>
            </div>
          </div>

          <div id="as1-materiality" className="scroll-mt-36 space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-50 leading-[1.8] font-serif font-medium pt-4">
            <h3 className="font-sans font-bold text-[16.5px] text-teal-900 dark:text-teal-300 flex items-center gap-3 mt-10 mb-3 border-l-[3px] border-teal-500 pl-3">
              5C. Materiality
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 font-mono uppercase tracking-widest">Disclosure Thresholds</span>
            </h3>
            <p>
              Financial statements should disclose all items which are material enough to influence the decisions of users. An item is material if its omission or misstatement could influence the economic decisions of users taken on the basis of the financial statements. <span className="bg-teal-50 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 border border-teal-200/50 dark:border-teal-900/40 px-1.5 py-0.5 rounded font-semibold">Materiality</span> depends on the size and nature of the item, judged in the particular circumstances of its omission. <PdfRef page={6} />
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
                    <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-900/20 transition-colors bg-white dark:bg-[#111726]">
                      <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">1% of revenue or Γé╣1,00,000</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Whichever is higher must be disclosed separately as a line item in notes.</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">In a company with Γé╣10 crore revenue, items above Γé╣10,00,000 require details (since 1% of 10cr is 10L, and 10L is higher than 1L).</td>
                    </tr>
                    <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-900/20 transition-colors bg-teal-50/20 dark:bg-[#0f1c22]/30">
                      <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">5% Shareholding Threshold</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Shares held by each shareholder holding more than 5% must be disclosed in notes.</td>
                      <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">The notes must specify the names of shareholders holding 5%+ shares and the exact number of shares held.</td>
                    </tr>
                    <tr className="hover:bg-teal-50/60 dark:hover:bg-teal-900/20 transition-colors bg-white dark:bg-[#111726]">
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
                  <tr className="hover:bg-emerald-50/60 dark:hover:bg-emerald-900/20 transition-colors bg-white dark:bg-[#111726]">
                    <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Going Concern</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">The enterprise will continue in operation for the foreseeable future, with neither the intention nor the necessity of liquidation.</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Valuing assets at cost/carrying value rather than net realizable value.</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Assets must be immediately written down to net realizable value (liquidation values), and all liabilities reclassified as current.</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/60 dark:hover:bg-emerald-900/20 transition-colors bg-emerald-50/20 dark:bg-emerald-900/5">
                    <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Consistency</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Accounting policies are consistent from one period to another, allowing comparison.</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Facilitate meaningful inter-period comparison.</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Disclosures must highlight the deviation, the reason for the change, and its financial impact.</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/60 dark:hover:bg-emerald-900/20 transition-colors bg-white dark:bg-[#111726]">
                    <td className="py-4 px-5 font-semibold text-slate-800 dark:text-white font-sans text-xs uppercase tracking-wider">Accrual</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Revenues and costs are recognized as they are earned or incurred, not as cash is received or paid.</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Reflect true economic activity of the period.</td>
                    <td className="py-4 px-5 leading-relaxed text-slate-800 dark:text-slate-200">Accounts revert to cash basis, distorting actual financial performance and current position.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div id="as1-going-concern" className="scroll-mt-36 space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-50 leading-[1.8] font-serif font-medium pt-4">
            <h3 className="font-sans font-bold text-[16.5px] text-indigo-900 dark:text-indigo-300 flex items-center gap-3 mt-10 mb-3 border-l-[3px] border-indigo-500 pl-3">
              6A. Going Concern Assumption
            </h3>
            <p>
              The financial statements are normally prepared on the assumption that an enterprise is a <span className="bg-indigo-50 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-900/40 px-1.5 py-0.5 rounded font-semibold">Going Concern</span>, that is, it will continue in operation for the foreseeable future. It is assumed that the enterprise has neither the intention nor the necessity of liquidation or of curtailing materially the scale of its operations. <PdfRef page={3} />
            </p>
            <p>
              Financial statements prepared on a going concern basis recognize the need for sufficient retention of profit to replace assets consumed in operation and for making adequate provision for the settlement of its liabilities. If the going concern assumption is defeated (for example, if a regulatory license is permanently revoked or a liquidation order is issued), assets must be written down to their Net Realizable Value (NRV) and long-term liabilities must be reclassified as current liabilities. <PdfRef page={3} />
            </p>
          </div>

          <div id="as1-consistency" className="scroll-mt-36 space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-50 leading-[1.8] font-serif font-medium pt-4">
            <h3 className="font-sans font-bold text-[16.5px] text-indigo-900 dark:text-indigo-300 flex items-center gap-3 mt-10 mb-3 border-l-[3px] border-indigo-500 pl-3">
              6B. Consistency Assumption
            </h3>
            <p>
              The principle of consistency refers to the practice of using the same accounting policies for similar transactions in all accounting periods. <span className="bg-indigo-50 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-900/40 px-1.5 py-0.5 rounded font-semibold">Consistency</span> improves the comparability of financial statements through time. <PdfRef page={3} />
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

          <div id="as1-accrual" className="scroll-mt-36 space-y-6 text-[16px] md:text-[17px] text-slate-900 dark:text-slate-50 leading-[1.8] font-serif font-medium pt-4">
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
              <p className="text-[15px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
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
                  <h4 className="font-sans font-bold text-[14.5px] text-slate-900 dark:text-white">Orderly Manner</h4>
                  <p className="text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200">
                    Disclose significant accounting policies actually adopted by the enterprise in an orderly and systematic manner. <PdfRef page={7} />
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start bg-emerald-50/30 dark:bg-emerald-900/10 px-5 py-4">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5">
                  <Check size={13} className="stroke-[3]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-[14.5px] text-slate-900 dark:text-white">Part of Financial Statements</h4>
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
                  <h4 className="font-sans font-bold text-[14.5px] text-slate-900 dark:text-white">Single Place Disclosure</h4>
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
              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#111726] border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center text-xs font-bold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 font-mono select-none">
                1
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-extrabold text-[15px] tracking-wide text-slate-900 dark:text-white">Identify the Change</h4>
                <p className="text-[15px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                  Confirm if a change has occurred in the accounting policies actually followed. Accounting policies can only be changed if mandated by statute, for compliance with a standard, or if the change yields a more appropriate presentation of financial statements. <PdfRef page={7} />
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#111726] border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center text-xs font-bold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 font-mono select-none">
                2
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-extrabold text-[15px] tracking-wide text-slate-900 dark:text-white">Justify the Change</h4>
                <p className="text-[15px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                  State the reasons why the new policy is adopted and how it complies with standard criteria. The change must be justified as leading to a better presentation of accounts. <PdfRef page={7} />
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#111726] border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center text-xs font-bold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 font-mono select-none">
                3
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-extrabold text-[15px] tracking-wide text-slate-900 dark:text-white">Quantify the Impact</h4>
                <p className="text-[15px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                  In the case of a change which has a material effect in the current period, the amount by which any item in the financial statements is affected by such change should be disclosed to the extent ascertainable. <PdfRef page={7} />
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#111726] border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center text-xs font-bold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 font-mono select-none">
                4
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-extrabold text-[15px] tracking-wide text-slate-900 dark:text-white">Disclose Non-Ascertainability</h4>
                <p className="text-[15px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                  Where the financial impact is not ascertainable, either wholly or in part, the fact should be explicitly indicated. <PdfRef page={7} />
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[44px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#111726] border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center text-xs font-bold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 font-mono select-none">
                5
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-extrabold text-[15px] tracking-wide text-slate-900 dark:text-white">Disclose Future Material Impact</h4>
                <p className="text-[15px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
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
          className="inline-flex items-center justify-center w-4 h-4 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/45 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded transition-all cursor-pointer select-none align-middle"
          title={`Click to jump to PDF Page ${pageNum}`}
        >
          <FileText size={10} className="shrink-0 text-red-500 dark:text-red-400" />
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
        <div className={`flex-1 w-full max-w-none flex flex-col ${activeTab === 'pdf' || activeTab === 'lecture' || ((activeTab === 'standard' || activeTab === 'examples') && ['intro-as', 'as-1', 'as-2', 'as-3', 'as-4', 'as-5', 'as-7', 'as-9', 'as-10', 'as-11', 'as-12', 'as-13', 'as-14', 'as-15', 'as-16', 'as-17', 'as-18', 'as-19', 'as-20', 'as-21', 'as-22', 'as-23', 'as-24', 'as-25', 'as-26', 'as-27', 'as-28', 'as-29'].includes(currentStandard.id)) ? 'p-0' : 'p-4 md:p-6'}`}>

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
                  {currentStandard.blocks && Array.isArray(currentStandard.blocks) && currentStandard.blocks.length > 0 && !['intro-as', 'as-1', 'as-2', 'as-3', 'as-4', 'as-5', 'as-7', 'as-9', 'as-10', 'as-11', 'as-12', 'as-13', 'as-14', 'as-15', 'as-16', 'as-17', 'as-18', 'as-19', 'as-20', 'as-21', 'as-22', 'as-23', 'as-24', 'as-25', 'as-26', 'as-27', 'as-28', 'as-29'].includes(currentStandard.id) ? (
                    <div className={`bg-white dark:bg-[#111726] border dark:border-gray-800 rounded-2xl shadow-xs ${
                      framework === 'AS' ? 'border-[#C5C3BC] p-8 sm:p-12 space-y-12' : 'border-[#E2E1DD] p-6 sm:p-10 space-y-10'
                    }`}>
                      {currentStandard.blocks.map((block: any, blockIdx: number) => {
                        if (block.hidden) return null;
                        switch (block.type) {
                          case 'HEADING':
                            return (
                              <h2 key={blockIdx} className={`font-extrabold text-[#1C1C1E] dark:text-white uppercase tracking-wide border-b border-gray-200 dark:border-gray-800 pb-3.5 ${
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
                                      <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
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
                              <div key={blockIdx} className="p-4 rounded-xl border border-[#E2E1DD] dark:border-gray-800 bg-red-50 dark:bg-red-900/20 mb-4 flex items-center justify-between border-dashed">
                                <div className="flex items-center gap-3">
                                  <Download size={16} className="text-red-500" />
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
                  ) : currentStandard.id === 'intro-as' ? (
                    <ASIntroStandardTabContent
                      navigateToPdfPage={navigateToPdfPage}
                    />
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
                                      {item.isConditional && <span className="ml-1.5 text-[9px] bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border border-amber-200/50 px-1.5 py-0.5 rounded font-bold uppercase">Conditional</span>}
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
                                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 border border-[#E2E1DD] dark:border-gray-700 flex items-center justify-center text-[#2D5BE3] dark:text-blue-400 group-hover:scale-100 transition-transform">
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
                    [&_th]:bg-slate-50 [&_th]:dark:bg-slate-800 [&_th]:p-3 [&_th]:font-bold [&_th]:border-b [&_th]:border-[#E2E1DD] [&_th]:dark:border-gray-800
                    [&_td]:p-3 [&_td]:text-slate-900 [&_td]:dark:text-gray-300 [&_td]:border-b [&_td]:border-[#E2E1DD] [&_td]:dark:border-gray-800
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
                      (match, pageNum) => `<button type="button" data-pdf-page="${pageNum}" class="inline-flex items-center gap-1.5 px-2 py-0.5 mx-1 bg-red-50 hover:bg-red-100 dark:bg-red-900/45 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded text-[11px] font-extrabold cursor-pointer transition-all" title="Click to jump to PDF Page ${pageNum}">📄 Page ${pageNum}</button>`
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
                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/45 dark:text-emerald-400 border border-emerald-200/40'
                                : item.difficulty === 'INTERMEDIATE'
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/45 dark:text-blue-400 border border-blue-200/40'
                                : 'bg-rose-50 text-rose-700 dark:bg-rose-900/45 dark:text-rose-400 border border-rose-200/40'
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
                            <p className="text-[16px] text-[#33333A] dark:text-gray-200 leading-relaxed font-medium">
                              {renderTextWithReferences(item.scenario)}
                            </p>
                          </div>
                          
                          {item.working && (
                            <div className="bg-[#FAFAF8] dark:bg-[#1C2335]/30 p-5 sm:p-6 rounded-xl border border-[#E2E1DD]/80 dark:border-gray-800/80">
                              <p className="text-[11px] text-[#A0A0A8] dark:text-gray-400 font-extrabold uppercase tracking-wider mb-2.5">
                                Issue
                              </p>
                              <p className="text-[16px] text-[#33333A] dark:text-gray-200 leading-relaxed font-medium">
                                {renderTextWithReferences(item.working)}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Analysis & Conclusion */}
                        <div className="space-y-6">
                          <div className="bg-[#E8F7EE] dark:bg-[#182B22]/40 p-5 sm:p-6 rounded-xl border border-[#C5E9D4]/60 dark:border-green-900/60">
                            <p className="text-[11px] text-[#1A7A4A] dark:text-emerald-400 font-extrabold uppercase tracking-wider mb-2.5">
                              Analysis &amp; Conclusion
                            </p>
                            <p className="text-[16px] text-[#2A2A35] dark:text-gray-200 leading-relaxed font-medium">
                              {renderTextWithReferences(item.answer || item.guidance)}
                            </p>
                          </div>

                          {item.note && (
                            <div className="bg-[#FFF8E6] dark:bg-[#2C241B]/40 p-5 sm:p-6 rounded-xl border border-[#F5E1B8]/60 dark:border-amber-900/60">
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
                    <div className="mb-6 max-w-sm w-full bg-slate-900/90 border border-slate-800 p-6 rounded-xl text-left shadow-md">
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
                      className="w-16 h-16 rounded-full flex items-center justify-center bg-[#2D5BE3] hover:bg-[#2450CC] text-white hover:scale-100 transition-all shadow-md focus:outline-none"
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
                  <div className={`mt-auto w-full bg-gradient-to-t from-black/95 to-transparent p-4 flex flex-col gap-2 z-10 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    
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


