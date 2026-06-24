const fs = require('fs');
const path = require('path');

const clientPath = path.join(__dirname, '../app/standards/learning/LearningPortalClient.tsx');

// 1. Read file and normalize line endings to LF
let clientContent = fs.readFileSync(clientPath, 'utf8').replace(/\r\n/g, '\n');

// 2. Update imports block
const oldImports = `import {
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
} from 'lucide-react'`;

const newImports = `import {
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
} from 'lucide-react'`;

if (clientContent.includes(oldImports)) {
  clientContent = clientContent.replace(oldImports, newImports);
  console.log('Successfully updated imports in clientContent!');
} else {
  console.log('Imports already updated or mismatch.');
}

// 3. Define the component code string
const newComponentCode = `function AS1StandardTabContent({ navigateToPdfPage, renderTextWithReferences }: AS1StandardTabContentProps) {
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
      const el = document.getElementById(\`as1-\${sec.id}\`)
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
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-955/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-650 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none font-mono"
      title={\`Open ICAI AS 1 PDF — Page \${page}\`}
    >
      <FileText size={9} className="shrink-0" />
      p.\${page}
    </button>
  )

  const as1Chapters = [
    { id: 'overview',     title: 'I. INTRODUCTION' },
    { id: 'scope',        title: 'II. SCOPE' },
    { id: 'definition',   title: 'III. DEFINITIONS' },
    { id: 'areas',        title: 'IV. AREAS OF DIVERSITY' },
    { id: 'selection',    title: 'V. CONSIDERATIONS' },
    { id: 'assumptions',  title: 'VI. ASSUMPTIONS' },
    { id: 'disclosure',   title: 'VII. DISCLOSURE' },
    { id: 'change-policy',title: 'VIII. CHANGES' },
    { id: 'footnotes',    title: 'IX. STATUTORY' }
  ]

  const ChapterHeader = ({ num, title, description }: { num: string; title: string; description: string }) => (
    <div className="text-left w-full mb-8 pb-4 border-b border-slate-200 dark:border-slate-800 select-none">
      <div className="text-[10px] font-bold text-amber-700 dark:text-amber-500 uppercase tracking-widest font-mono mb-1">
        Chapter {num}
      </div>
      <h2 className="text-xl sm:text-2xl font-semibold font-serif text-slate-900 dark:text-white tracking-tight leading-tight uppercase">
        {title}
      </h2>
      {description && (
        <p className="text-[13.5px] italic font-serif text-slate-500 dark:text-slate-400 mt-2 max-w-4xl leading-relaxed">
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
            className={\`transform transition-transform text-slate-400 \${isOpen ? 'rotate-180 text-amber-700' : ''}\`} 
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
    <div className="w-full animate-fade-in font-sans bg-white dark:bg-[#0b0f19] -m-4 md:-m-6 p-4 sm:p-6 lg:p-8">
      {/* Sticky Contents Bar */}
      <div className="sticky top-[58px] bg-white dark:bg-[#0b0f19] py-3.5 px-6 border-b border-slate-200 dark:border-slate-800 z-20 max-w-full w-full select-none shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <span className="font-sans text-slate-800 dark:text-slate-200 font-extrabold text-[12px] uppercase tracking-wider shrink-0">
            Contents
          </span>
          <div className="flex-1 overflow-x-auto scroll-smooth whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex items-center gap-x-6 text-[10px] font-sans font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {as1Chapters.map((sec, idx) => (
              <button
                key={sec.id}
                onClick={() => {
                  const el = document.getElementById(\`as1-\${sec.id}\`);
                  if (el) {
                    const yOffset = -120;
                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                className={\`transition-colors hover:text-amber-700 dark:hover:text-amber-450 cursor-pointer py-1 flex items-center gap-1.5 shrink-0 \${
                  activeSection === sec.id
                    ? 'text-amber-700 dark:text-amber-450 font-extrabold border-b-2 border-amber-600 dark:border-amber-455'
                    : 'text-slate-400 dark:text-gray-500 font-medium'
                }\`}
              >
                {activeSection === sec.id && <span className="text-[8px] text-amber-600 font-normal select-none">◆</span>}
                {sec.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Publication Sheet Canvas - White document feel */}
      <div className="max-w-7xl mx-auto w-full bg-white dark:bg-[#0b0f19] px-4 sm:px-10 lg:px-14 py-12 sm:py-16 space-y-24 relative">
        
        {/* Cover Document Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-10 mb-16 text-center select-none w-full relative">
          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 font-mono">
            Accounting Standards Board • The Institute of Chartered Accountants of India
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full border border-slate-205 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 font-serif font-black text-xs">
              AS
            </div>
            <span className="text-slate-200 dark:text-slate-800">|</span>
            <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-slate-450 dark:text-slate-400">Official Standard</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-slate-900 dark:text-white tracking-tight mb-2 uppercase">
            Accounting Standard (AS) 1
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 font-serif italic">
            Disclosure of Accounting Policies
          </p>
          <div className="flex items-center justify-center gap-3 mt-6 text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            <span>Universal Application</span>
            <span>•</span>
            <span>Mandatory under Companies Act 2013</span>
          </div>
        </div>

        {/* Chapter 1: Introduction & Purpose */}
        <section id="as1-overview" className="scroll-mt-36 space-y-8 w-full">
          <ChapterHeader 
            num="I" 
            title="Introduction &amp; Purpose of the Standard" 
            description="Overview of the primary causes of diversity in financial reporting, the inherent limits of accounting standardization, and the qualitative necessity of systematic policy disclosure to ensure comparability."
          />
          
          <div className="max-w-4xl mx-auto space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
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

          <div className="max-w-4xl mx-auto space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
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
          
          <div className="max-w-4xl mx-auto space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
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
          
          <div className="max-w-4xl mx-auto space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
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

          <div className="max-w-4xl mx-auto space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
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

          <div className="max-w-4xl mx-auto space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
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
                    <td className="py-3.5 px-4 leading-relaxed">Board of Directors (statutory Directors\' Responsibility Statement under Section 134(5)).</td>
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

          <div className="max-w-4xl mx-auto space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
            <p>
              The standard identifies major areas where different accounting policies can be adopted by different enterprises. These alternative treatments are permitted because of differences in the operating environments and business models of entities. <PdfRef page={5} />
            </p>
          </div>

          {/* Interactive Search Tool */}
          <div className="max-w-4xl mx-auto my-6 font-sans">
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

          <div className="space-y-4 max-w-4xl mx-auto w-full">
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

          <div className="max-w-4xl mx-auto space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
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
          <div id="as1-prudence" className="scroll-mt-36 max-w-4xl mx-auto space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
            <h3 className="font-sans font-bold text-sm tracking-wide text-slate-900 dark:text-white uppercase">5A. Prudence (Valuation Caution)</h3>
            <p>
              In view of the uncertainty inherent in many business transactions, assets and income should not be overstated, and liabilities and losses should not be understated. Profits are recognized only when realized, while provisions are made for all known liabilities and losses, even if the amount is an estimate. <PdfRef page={6} />
            </p>
            <p>
              However, prudence does not permit the creation of secret or hidden reserves, nor does it allow the arbitrary write-down of assets. The selection of policies must balance caution with neutrality to avoid bias in financial reporting.
            </p>
          </div>

          <div id="as1-substance" className="scroll-mt-36 max-w-4xl mx-auto space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif pt-4">
            <h3 className="font-sans font-bold text-sm tracking-wide text-slate-900 dark:text-white uppercase">5B. Substance over Form (Economic Reality)</h3>
            <p>
              Transactions and other events should be accounted for and presented in accordance with their financial substance and economic reality, and not merely their legal form. <PdfRef page={6} />
            </p>
            <p>
              <strong>Precedent Case Example:</strong> In a Hire-Purchase or Lease Agreement under AS 19, legal ownership remains with the lessor/seller until the final installment is paid. However, since the lessee/buyer gains immediate economic benefits and bears the operating risks of the asset, substance dictates that the asset is capitalized and depreciated in the buyer's balance sheet, while recording a liability for future payments. Accounting strictly by legal form (which would treat it as rent) would misrepresent the economic reality of the enterprise's capital structure.
            </p>
          </div>

          <div id="as1-materiality" className="scroll-mt-36 max-w-4xl mx-auto space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif pt-4">
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

          <div className="max-w-4xl mx-auto space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
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

          <div id="as1-going-concern" className="scroll-mt-36 max-w-4xl mx-auto space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif pt-4">
            <h3 className="font-sans font-bold text-sm tracking-wide text-slate-900 dark:text-white uppercase">6A. Going Concern Assumption</h3>
            <p>
              The enterprise is normally viewed as a going concern, that is, as continuing in operation for the foreseeable future. It is assumed that the enterprise has neither the intention nor the necessity of liquidation or of curtailing materially the scale of its operations. <PdfRef page={6} />
            </p>
            <p>
              This assumption is the base for recording long-term assets at cost less depreciation rather than market values. If going concern is no longer valid, assets must be valued at net realizable value (liquidation values) and provisions must be made for unavoidable costs.
            </p>
          </div>

          <div id="as1-consistency" className="scroll-mt-36 max-w-4xl mx-auto space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif pt-4">
            <h3 className="font-sans font-bold text-sm tracking-wide text-slate-900 dark:text-white uppercase">6B. Consistency Assumption</h3>
            <p>
              It is assumed that accounting policies are consistent from one period to another. <PdfRef page={6} />
            </p>
            <p>
              Consistency facilitates inter-period comparison of financial performance. While changes are permitted in specific circumstances, consistency remains the rule. A change in policy must be disclosed along with its financial impact, showing how it deviates from the consistency assumption.
            </p>
          </div>

          <div id="as1-accrual" className="scroll-mt-36 max-w-4xl mx-auto space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif pt-4">
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

          <div className="max-w-4xl mx-auto space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
            <p>
              Accounting Standard 1 mandates how and where policies must be disclosed to ensure users can easily access and comprehend them: <PdfRef page={6} />
            </p>
          </div>

          {/* Audit Checklist Layout */}
          <div className="my-8 space-y-6 max-w-4xl mx-auto font-serif">
            <div className="flex gap-4 items-start">
              <div className="w-5 h-5 rounded-full bg-amber-50 dark:bg-amber-955/20 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-505 shrink-0 mt-1">
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
              <div className="w-5 h-5 rounded-full bg-amber-50 dark:bg-amber-955/20 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-505 shrink-0 mt-1">
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
              <div className="w-5 h-5 rounded-full bg-amber-50 dark:bg-amber-955/20 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-505 shrink-0 mt-1">
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

          <div className="max-w-4xl mx-auto space-y-6 text-[16px] md:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.8] font-serif">
            <p>
              When a change in an accounting policy has a material effect, it must be disclosed. The standard mandates a structured workflow for accounting and disclosing changes in policies: <PdfRef page={6} />
            </p>
          </div>

          {/* Clean Vertical Timeline Step Layout */}
          <div className="my-8 space-y-8 max-w-4xl mx-auto font-serif relative pl-8 border-l border-slate-200 dark:border-slate-800">
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
          <div id="as1-para23" className="scroll-mt-36 max-w-4xl mx-auto pt-6">
            <div className="p-6 border-l-4 border-amber-600 dark:border-amber-500 bg-amber-50/10 dark:bg-amber-955/5 rounded-r-lg font-serif">
              <div className="flex items-center gap-2 mb-3 text-amber-700 dark:text-amber-505 font-sans font-bold text-[13px] uppercase tracking-wider">
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
}`;

// 4. Find boundaries of AS1StandardTabContent in clientContent
const lines = clientContent.split('\n');
let startIndex = -1;
let endIndex = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('function AS1StandardTabContent({ navigateToPdfPage, renderTextWithReferences }')) {
    startIndex = i;
    break;
  }
}

for (let i = startIndex; i < lines.length; i++) {
  if (lines[i].trim() === 'interface LearningPortalClientProps {') {
    // Trace back to find the closing brace of the component
    for (let j = i - 1; j > startIndex; j--) {
      if (lines[j].trim() === '}') {
        endIndex = j;
        break;
      }
    }
    break;
  }
}

console.log(`Found component boundaries - startIndex: ${startIndex}, endIndex: ${endIndex}`);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find component boundaries in LearningPortalClient.tsx');
  process.exit(1);
}

// 5. Replace component body
const prefix = lines.slice(0, startIndex).join('\n');
const suffix = lines.slice(endIndex + 1).join('\n');

const newClientContent = prefix + '\n' + newComponentCode + '\n' + suffix;

// 6. Write back with CRLF line endings
fs.writeFileSync(clientPath, newClientContent.replace(/\n/g, '\r\n'), 'utf8');
console.log('Successfully updated LearningPortalClient.tsx to redesign version 7!');
