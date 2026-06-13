'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  BookOpen,
  Scale,
  FileText,
  Search,
  Play,
  Pause,
  RotateCw,
  Volume2,
  VolumeX,
  SkipForward,
  Settings,
  Maximize,
  ExternalLink,
  Download,
  FileVideo,
  Highlighter,
  PenTool,
  Eraser,
  MessageSquare,
  ChevronRight,
  ArrowLeft,
  ChevronUp,
  FileDown
} from 'lucide-react'

// ─── Standard Types & Data ────────────────────────────────────────────────────

interface Standard {
  id: string
  code: string
  title: string
  shortTitle: string
  framework: 'AS' | 'Ind AS'
  description: string
  intro?: string
  content: {
    objective: string
    scope: {
      statement: string
      included: string[]
      excluded: string[]
    }
    keyPrinciples: { title: string; body: string }[]
  }
  examples: {
    title: string
    scenario: string
    guidance: string
  }[]
  lectureUrl: string
  pdfPagesCount: number
}

const AS_STANDARDS: Standard[] = [
  {
    id: 'intro-as',
    code: 'Intro to AS',
    title: 'Intro to AS & Applicability',
    shortTitle: 'Intro to AS & Applicability',
    framework: 'AS',
    description: 'Introduction to Accounting Standards, their purpose, authority, and applicability to different corporate and non-corporate entities in India.',
    intro: 'This section provides an introduction to the Accounting Standards (AS), their purpose, authority and the applicability of AS to different entities.',
    content: {
      objective: 'To provide a foundational understanding of the accounting standards framework issued by the ICAI and their legal mandate under the Companies Act, 2013.',
      scope: {
        statement: 'Applies to all companies and non-corporate entities preparing financial statements in India under the Companies (Accounting Standards) Rules, 2021.',
        included: [
          'Non-corporate entities falling under Level I, II, III, and IV guidelines.',
          'Companies not required to comply with Ind AS (under threshold limits).'
        ],
        excluded: [
          'Companies adopting Ind AS voluntarily or mandatorily.',
          'Entities not preparing general-purpose financial statements.'
        ]
      },
      keyPrinciples: [
        { title: 'Statutory Authority', body: 'Accounting Standards are formulated by the Accounting Standards Board (ASB) of ICAI and notified by the Ministry of Corporate Affairs (MCA).' },
        { title: 'Harmonization', body: 'Designed to harmonize diverse accounting policies and practices, ensuring comparability and transparency.' }
      ]
    },
    examples: [
      {
        title: 'Case Study 1: Level II Entity Classification',
        scenario: 'A partnership firm has a turnover of ₹45 Crores and borrowings of ₹8 Crores during the preceding financial year. They are unsure about their Level classification.',
        guidance: 'Under the ICAI classification guidelines, non-corporate entities with turnover between ₹10 Crores and ₹50 Crores, or borrowings between ₹2 Crores and ₹10 Crores are classified as Level II. The firm must comply with AS, with certain exemptions on disclosures (like AS 17 Segment Reporting and AS 3 Cash Flow Statement).'
      }
    ],
    lectureUrl: 'https://www.youtube.com/watch?v=intro_as_video',
    pdfPagesCount: 12
  },
  {
    id: 'as-1',
    code: 'AS 1',
    title: 'Disclosure of Accounting Policies',
    shortTitle: 'AS 1 – Disclosure of Accounting Policies',
    framework: 'AS',
    description: 'Deals with the disclosure of significant accounting policies followed in preparing and presenting financial statements.',
    content: {
      objective: 'The objective of this Standard is to require the disclosure of the significant accounting policies adopted in the preparation and presentation of financial statements, so that accounts can be understood properly.',
      scope: {
        statement: 'This Standard should be applied in the selection and application of accounting policies and in the disclosure of those policies.',
        included: [
          'All financial statements prepared for public reporting.',
          'Notes forming part of the financial statements detailing policies.'
        ],
        excluded: [
          'Internal reports or management statements.',
          'Ad-hoc or cash-basis financial reports.'
        ]
      },
      keyPrinciples: [
        { title: 'Fundamental Accounting Assumptions', body: 'Going Concern, Consistency, and Accrual are fundamental assumptions. If followed, no specific disclosure is required. If not followed, the fact must be disclosed.' },
        { title: 'Selection Criteria', body: 'Primary consideration is that financial statements present a true and fair view. Secondary considerations include Prudence, Substance over Form, and Materiality.' }
      ]
    },
    examples: [
      {
        title: 'Example 1: Change in Depreciation Method',
        scenario: 'A company changes its depreciation calculation method from Straight Line (SLM) to Written Down Value (WDV) to reflect actual usage pattern.',
        guidance: 'Under AS 1, a change in accounting policy is permissible only if required by statute, for compliance with an accounting standard, or if it results in a more appropriate presentation. The company must disclose the change, the reasons for it, and the quantitative impact on current year profits.'
      },
      {
        title: 'Example 2: Disclosure of Inventory Valuation',
        scenario: 'A trade retailer values raw stocks at Weighted Average Cost and finished goods at FIFO. They ask if a summary list of valuation methods is sufficient.',
        guidance: 'AS 1 requires that all significant accounting policies, especially where options exist (like inventory valuation methods), must be disclosed in a single place as part of the financial statements, typically in Note 1.'
      }
    ],
    lectureUrl: 'https://www.youtube.com/watch?v=as1_lecture',
    pdfPagesCount: 24
  },
  {
    id: 'as-2',
    code: 'AS 2',
    title: 'Valuation of Inventories',
    shortTitle: 'AS 2 – Valuation of Inventories',
    framework: 'AS',
    description: 'Prescribes the accounting treatment for inventories, primarily the determination of cost and its write-down to net realizable value.',
    content: {
      objective: 'To formulate the method of determining the cost of inventories, including what to include in cost, and to write down inventory value to net realizable value if lower than cost.',
      scope: {
        statement: 'This Standard should be applied in accounting for inventories, except certain specialized assets.',
        included: [
          'Finished goods held for sale in the ordinary course of business.',
          'Work-in-progress (materials in process of production).',
          'Materials or supplies to be consumed in the production process.'
        ],
        excluded: [
          'Work-in-progress arising under construction contracts (AS 7).',
          'Shares, debentures, and other financial instruments held as stock-in-trade.'
        ]
      },
      keyPrinciples: [
        { title: 'Measurement Rule', body: 'Inventories should be valued at the lower of Cost and Net Realizable Value (NRV).' },
        { title: 'Formulae Options', body: 'Costs of inventories should be assigned by using the FIFO or Weighted Average Cost formulae.' }
      ]
    },
    examples: [
      {
        title: 'Example 1: Inventory Damage Write-down',
        scenario: 'A stock of smartphones cost ₹10,00,000 to manufacture. Due to a newer model launch, their market price drops. Estimated selling price is ₹8,50,000, and brokerage commissions will cost ₹20,000 (total sale cost is ₹30,000).',
        guidance: 'Cost is ₹10,00,000. NRV = ₹8,50,000 - ₹30,000 = ₹8,20,000. Under AS 2, inventory must be written down to ₹8,20,000. A loss of ₹1,80,000 must be recognized in the P&L.'
      }
    ],
    lectureUrl: 'https://www.youtube.com/watch?v=as2_lecture',
    pdfPagesCount: 18
  },
  {
    id: 'as-3',
    code: 'AS 3',
    title: 'Cash Flow Statements',
    shortTitle: 'AS 3 – Cash Flow Statements',
    framework: 'AS',
    description: 'Requires the provision of information about the historical changes in cash and cash equivalents of an enterprise.',
    content: {
      objective: 'To require the presentation of information about historical changes in cash and cash equivalents by means of a cash flow statement which classifies cash flows into operating, investing, and financing activities.',
      scope: {
        statement: 'Applies to enterprises required to present cash flow statements under corporate law.',
        included: [
          'All commercial companies (except exempt Small & Medium Companies).',
          'Listed corporations and public financial institutions.'
        ],
        excluded: [
          'One Person Companies (OPC) and small startup companies (exempt under Companies Act).'
        ]
      },
      keyPrinciples: [
        { title: 'Classification', body: 'Cash flows must be categorized into: Operating Activities (principal revenue-producing activities), Investing Activities (acquisition/disposal of long-term assets), and Financing Activities (activities altering equity and borrowing structures).' },
        { title: 'Methodology', body: 'Operating cash flow can be presented using either the Direct Method or the Indirect Method.' }
      ]
    },
    examples: [
      {
        title: 'Example 1: Interest & Dividend Payments',
        scenario: 'A manufacturing firm pays interest of ₹50,000 on long-term debentures and receives dividends of ₹12,000 on shares held in another company.',
        guidance: 'Under AS 3, interest paid on borrowings is classified under Financing Activities. Dividends received on investments are classified under Investing Activities.'
      }
    ],
    lectureUrl: 'https://www.youtube.com/watch?v=as3_lecture',
    pdfPagesCount: 32
  },
  {
    id: 'as-11',
    code: 'AS 11',
    title: 'The Effects of Changes in Foreign Exchange Rates',
    shortTitle: 'AS 11 – The Effects of Changes in Acc Policies',
    framework: 'AS',
    description: 'Prescribes how to include foreign currency transactions and foreign operations in the financial statements.',
    content: {
      objective: 'To prescribe how to include foreign currency transactions and foreign operations in the financial statements of an enterprise and how to translate financial statements into a presentation currency.',
      scope: {
        statement: 'Applies to accounting for foreign currency transactions, translating foreign operations, and forward contracts.',
        included: [
          'Foreign currency sales, purchases, assets, and liabilities.',
          'Foreign branch operations (integral and non-integral).'
        ],
        excluded: [
          'Translation of financial statements for presentation purpose (in certain cases).',
          'Restatement of long term liability hedges (special rules).'
        ]
      },
      keyPrinciples: [
        { title: 'Initial Recognition', body: 'Transactions in foreign currency should be recorded at the exchange rate on the date of the transaction.' },
        { title: 'Balance Sheet Reporting', body: 'Monetary items (receivables, cash, payables) must be reported at the closing exchange rate. Non-monetary items (fixed assets, stock) must be reported at historical rate.' }
      ]
    },
    examples: [
      {
        title: 'Example 1: Valuation of Foreign Creditor',
        scenario: 'A company buys goods from USA for $10,000 when $1 = ₹82. On the Balance Sheet date, the goods are unpaid and exchange rate is $1 = ₹83.5.',
        guidance: 'Initial recording was at ₹8,20,000. On reporting date, the liability is monetary and must be restated at closing rate: 10,000 * 83.5 = ₹8,35,000. An exchange loss of ₹15,000 must be charged to current P&L.'
      }
    ],
    lectureUrl: 'https://www.youtube.com/watch?v=as11_lecture',
    pdfPagesCount: 22
  }
]

const IND_AS_STANDARDS: Standard[] = [
  {
    id: 'intro-ind-as',
    code: 'Intro to Ind AS',
    title: 'Intro to Ind AS & Applicability',
    shortTitle: 'Intro to Ind AS & Applicability',
    framework: 'Ind AS',
    description: 'Introduction to Indian Accounting Standards (Ind AS), the converged global standards aligned with IFRS, and their roadmap of implementation.',
    intro: 'This section provides an introduction to the Indian Accounting Standards (Ind AS), their purpose, authority and the applicability of Ind AS to different entities.',
    content: {
      objective: 'To provide a conceptual background of Ind AS and details on who must apply them based on net worth thresholds.',
      scope: {
        statement: 'Applies to listed and unlisted companies meeting the statutory net worth criteria under the Companies (Ind AS) Rules, 2015.',
        included: [
          'Listed companies (debt or equity) and unlisted companies with net worth ₹250 Crores or more.',
          'Holding, subsidiary, joint venture, and associate companies of the above.'
        ],
        excluded: [
          'Small and Medium Enterprises (SMEs) not meeting criteria (who use AS).'
        ]
      },
      keyPrinciples: [
        { title: 'IFRS Convergence', body: 'Ind AS are converged with IFRS, allowing global comparibility of corporate balance sheets.' },
        { title: 'Carve-outs', body: 'Contains minor departures (carve-outs) from IFRS to suit Indian economic conditions.' }
      ]
    },
    examples: [
      {
        title: 'Case 1: Net Worth Calculation',
        scenario: 'An unlisted company has a paid-up capital of ₹100 Crores, free reserves of ₹120 Crores, and a accumulated loss of ₹30 Crores. They want to know if they fall under Ind AS.',
        guidance: 'Net worth is calculated as Paid-up Capital + Free Reserves - Accumulated Losses = 100 + 120 - 30 = ₹190 Crores. Since this is below the ₹250 Crore threshold, they do not require mandatory Ind AS implementation, unless they choose to adopt it voluntarily.'
      }
    ],
    lectureUrl: 'https://www.youtube.com/watch?v=intro_indas_video',
    pdfPagesCount: 15
  },
  {
    id: 'ind-as-1',
    code: 'Ind AS 1',
    title: 'Presentation of Financial Statements',
    shortTitle: 'Ind AS 1 – Presentation of Financial Statements',
    framework: 'Ind AS',
    description: 'Prescribes the basis for presentation of general purpose financial statements to ensure comparability.',
    content: {
      objective: 'To prescribe the basis for presentation of general purpose financial statements to ensure comparability both with the entity’s financial statements of previous periods and with the financial statements of other entities.',
      scope: {
        statement: 'An entity shall apply this Standard in preparing and presenting general purpose financial statements in accordance with Indian Accounting Standards (Ind ASs).',
        included: [
          'All general-purpose financial statements under Ind AS framework.',
          'Consolidated and standalone statement sets.'
        ],
        excluded: [
          'Interim financial reporting (covered under Ind AS 34).'
        ]
      },
      keyPrinciples: [
        { title: 'Complete Set of Statements', body: 'Includes Balance Sheet, Statement of Profit & Loss (incorporating OCI), Statement of Changes in Equity (SOCE), Cash Flow Statement, and Notes.' },
        { title: 'Other Comprehensive Income (OCI)', body: 'Requires separation of profit or loss items and items in OCI (like actuarial gains, revaluation gains).' }
      ]
    },
    examples: [
      {
        title: 'Case Study 1: Breach of Loan Covenants',
        scenario: 'A company breaches a loan covenant before year-end, making the long-term loan repayable on demand. The lender agrees after year-end not to demand repayment.',
        guidance: 'Under Ind AS 1, the loan must be classified as a current liability at the reporting date, because the company did not have an unconditional right to defer settlement for at least 12 months at the balance sheet date. Lender agreements signed post-balance sheet date are non-adjusting events.'
      }
    ],
    lectureUrl: 'https://www.youtube.com/watch?v=indas1_lecture',
    pdfPagesCount: 35
  }
]

// ─── Component Code ───────────────────────────────────────────────────────────

export default function LearningPortal({ defaultFramework = 'AS' }: { defaultFramework?: 'AS' | 'Ind AS' } = {}) {
  const [framework, setFramework] = useState<'AS' | 'Ind AS'>(defaultFramework)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStandardId, setSelectedStandardId] = useState<string>(
    defaultFramework === 'AS' ? 'intro-as' : 'intro-ind-as'
  )
  const [activeTab, setActiveTab] = useState<'standard' | 'examples' | 'lecture' | 'pdf'>('standard')

  // PDF Viewer states
  const [pdfPage, setPdfPage] = useState<number>(1)
  const [annotationMode, setAnnotationMode] = useState<'none' | 'highlight' | 'write' | 'erase' | 'note'>('none')
  const [highlightColor, setHighlightColor] = useState<string>('yellow')
  const [pdfNotes, setPdfNotes] = useState<{ id: number; page: number; x: number; y: number; text: string }[]>([])
  const [pdfHighlights, setPdfHighlights] = useState<{ id: number; page: number; elementId: string; color: string }[]>([])
  const [zoomLevel, setZoomLevel] = useState<number>(100)
  const [searchInPdf, setSearchInPdf] = useState(false)
  const [pdfSearchQuery, setPdfSearchQuery] = useState('')
  
  // Drawing states
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  // Video states
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoTime, setVideoTime] = useState(0)
  const [videoVolume, setVideoVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [showCC, setShowCC] = useState(false)
  const videoInterval = useRef<NodeJS.Timeout | null>(null)

  // Sync selected ID when switching framework
  useEffect(() => {
    if (framework === 'AS') {
      setSelectedStandardId('intro-as')
    } else {
      setSelectedStandardId('intro-ind-as')
    }
    setActiveTab('standard')
  }, [framework])

  // Timer simulation for mock video player
  useEffect(() => {
    if (isPlaying) {
      videoInterval.current = setInterval(() => {
        setVideoTime((prev) => {
          if (prev >= 1125) { // 18:45 in seconds
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    } else {
      if (videoInterval.current) clearInterval(videoInterval.current)
    }
    return () => {
      if (videoInterval.current) clearInterval(videoInterval.current)
    }
  }, [isPlaying])

  const standardsList = framework === 'AS' ? AS_STANDARDS : IND_AS_STANDARDS
  const currentStandard = standardsList.find((s) => s.id === selectedStandardId) || standardsList[0]

  // Filter list by search query
  const filteredStandards = standardsList.filter((s) =>
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
    <div className="w-full bg-[#FAFAF8] dark:bg-[#0B0F19] flex flex-col lg:flex-row min-h-[calc(100vh-64px)] overflow-hidden">
      {/* ─── Sidebar ────────────────────────────────────────────────────────── */}
      <aside className="w-full lg:w-[320px] bg-white dark:bg-[#111726] border-r border-[#E2E1DD] dark:border-gray-800 flex flex-col shrink-0">
        
        {/* Sidebar Header */}
        <div className="p-4 border-b border-[#E2E1DD] dark:border-gray-800 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-[#2D5BE3] dark:text-[#60A5FA]" />
            <span className="font-sans font-bold text-sm text-[#1C1C1E] dark:text-white uppercase tracking-wider">
              Accounting Standards
            </span>
          </div>

          {/* AS vs Ind AS Toggle switches */}
          <div className="flex bg-[#F4F3F0] dark:bg-[#1E2640] p-1 rounded-lg">
            <button
              onClick={() => setFramework('AS')}
              className={`flex-1 text-center py-1.5 text-xs font-bold rounded-md transition-all ${
                framework === 'AS'
                  ? 'bg-white dark:bg-[#0B0F19] text-[#2D5BE3] dark:text-[#60A5FA] shadow-xs'
                  : 'text-[#76767E] hover:text-[#1C1C1E]'
              }`}
            >
              AS (ICAI)
            </button>
            <button
              onClick={() => setFramework('Ind AS')}
              className={`flex-1 text-center py-1.5 text-xs font-bold rounded-md transition-all ${
                framework === 'Ind AS'
                  ? 'bg-white dark:bg-[#0B0F19] text-[#2D5BE3] dark:text-[#60A5FA] shadow-xs'
                  : 'text-[#76767E] hover:text-[#1C1C1E]'
              }`}
            >
              Ind AS (MCA)
            </button>
          </div>

          {/* Search box */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#76767E]" />
            <input
              type="text"
              placeholder="Search standards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAFAF8] dark:bg-[#0B0F19] border border-[#E2E1DD] dark:border-gray-800 rounded-md pl-9 pr-3 py-2 text-xs font-medium outline-none focus:border-[#2D5BE3] focus:ring-1 focus:ring-[#2D5BE3]"
            />
          </div>
        </div>

        {/* Standards List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredStandards.map((std) => {
            const isSelected = selectedStandardId === std.id
            return (
              <div key={std.id} className="flex flex-col">
                <button
                  onClick={() => {
                    setSelectedStandardId(std.id)
                    setActiveTab('standard')
                  }}
                  className={`w-full text-left p-3 rounded-lg flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-[#EEF2FD] dark:bg-[#1A2542] text-[#2D5BE3] dark:text-[#60A5FA]'
                      : 'hover:bg-[#FAFAF8] dark:hover:bg-[#1E2640] text-[#4A4A52] dark:text-gray-300'
                  }`}
                >
                  <span className="text-xs font-bold leading-relaxed pr-2">
                    {std.shortTitle}
                  </span>
                  <ChevronRight
                    size={13}
                    className={`shrink-0 transition-transform ${isSelected ? 'rotate-90 text-[#2D5BE3]' : 'text-[#A0A0A8]'}`}
                  />
                </button>

                {/* Sub-menu options for selected standard */}
                {isSelected && (
                  <div className="ml-4 pl-3 border-l border-[#D5E1FB] dark:border-[#263765] mt-1 space-y-1">
                    <button
                      onClick={() => setActiveTab('standard')}
                      className={`w-full text-left py-2 px-3 rounded-md text-xs font-semibold flex items-center gap-2 ${
                        activeTab === 'standard'
                          ? 'bg-[#EEF2FD] text-[#2D5BE3] dark:text-[#60A5FA] font-bold'
                          : 'text-[#76767E] hover:text-[#1C1C1E] dark:hover:text-white'
                      }`}
                    >
                      <FileText size={12} />
                      Standard
                    </button>
                    <button
                      onClick={() => setActiveTab('examples')}
                      className={`w-full text-left py-2 px-3 rounded-md text-xs font-semibold flex items-center gap-2 ${
                        activeTab === 'examples'
                          ? 'bg-[#EEF2FD] text-[#2D5BE3] dark:text-[#60A5FA] font-bold'
                          : 'text-[#76767E] hover:text-[#1C1C1E] dark:hover:text-white'
                      }`}
                    >
                      <Scale size={12} />
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
      <main className="flex-1 flex flex-col bg-[#FAFAF8] dark:bg-[#0B0F19] overflow-hidden relative">
        
        {/* Top Control Bar */}
        <div className="bg-white dark:bg-[#111726] border-b border-[#E2E1DD] dark:border-gray-800 p-4 flex items-center justify-between shrink-0">
          <Link
            href="/standards/as"
            className="flex items-center gap-2 px-4 py-2 bg-[#FAFAF8] dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 rounded-md text-xs font-bold text-[#1C1C1E] dark:text-white hover:bg-[#F4F3F0] transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </Link>

          {/* View Tab Buttons on Top Right */}
          <div className="flex items-center gap-2">
            {activeTab !== 'lecture' && activeTab !== 'pdf' ? (
              <>
                <button
                  onClick={() => setActiveTab('lecture')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-bold text-white bg-[#2D5BE3] hover:bg-[#2450CC] transition-colors shadow-xs"
                >
                  <FileVideo size={13} />
                  Lecture
                </button>
                <button
                  onClick={() => setActiveTab('pdf')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-bold text-white bg-[#E15252] hover:bg-[#C84040] transition-colors shadow-xs"
                >
                  <FileText size={13} />
                  PDF View
                </button>
              </>
            ) : activeTab === 'pdf' ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={clearAnnotations}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-[#F4F3F0] dark:bg-gray-800 text-[#76767E] hover:text-[#1C1C1E] rounded-md text-xs font-bold border border-[#E2E1DD] dark:border-gray-700 transition-colors"
                >
                  Clear Notes
                </button>
                <button
                  onClick={() => alert('PDF downloaded successfully with annotations.')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-bold text-white bg-[#2D5BE3] hover:bg-[#2450CC] transition-colors shadow-xs"
                >
                  <Download size={13} />
                  Download PDF
                </button>
                <button
                  onClick={() => setActiveTab('standard')}
                  className="flex items-center gap-1.5 px-3.5 py-2 border border-[#E2E1DD] dark:border-gray-800 hover:bg-[#FAFAF8] text-[#1C1C1E] dark:text-white rounded-md text-xs font-bold transition-colors"
                >
                  Close Document
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('Lecture video has started downloading.')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-bold text-white bg-[#2D5BE3] hover:bg-[#2450CC] transition-colors shadow-xs"
                >
                  <Download size={13} />
                  Download Lecture
                </button>
                <button
                  onClick={() => setActiveTab('standard')}
                  className="flex items-center gap-1.5 px-3.5 py-2 border border-[#E2E1DD] dark:border-gray-800 hover:bg-[#FAFAF8] text-[#1C1C1E] dark:text-white rounded-md text-xs font-bold transition-colors"
                >
                  Close Player
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ─── Tab Content Views ──────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col">

          {/* 1. STANDARD VIEW */}
          {activeTab === 'standard' && (
            <div className="w-full max-w-4xl mx-auto space-y-6">
              <div className="border-b border-[#E2E1DD] dark:border-gray-800 pb-4">
                <h1 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white tracking-tight">
                  {currentStandard.id.includes('intro')
                    ? `${currentStandard.title} – Standard`
                    : `${currentStandard.code} – ${currentStandard.title} – Standard`}
                </h1>
                <div className="h-1 w-12 bg-[#2D5BE3] mt-3 rounded-full"></div>
              </div>

              {/* Alert Info Box */}
              <div className="p-4 rounded-xl bg-[#EEF2FD] dark:bg-[#1E2640] border border-[#D0DCFA] dark:border-gray-800 flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#2D5BE3] text-white font-serif font-bold text-xs shrink-0 mt-0.5">
                  i
                </div>
                <p className="text-xs text-[#4A4A52] dark:text-gray-300 leading-relaxed font-semibold">
                  {currentStandard.intro || `This section provides standard text, core statutory provisions, rules, and objective metrics for ${currentStandard.code}.`}
                </p>
              </div>

              {/* Standard text sections */}
              <div className="bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xs">
                
                {/* Objective */}
                <div>
                  <h2 className="text-sm font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wider mb-3">
                    1. Objective
                  </h2>
                  <p className="text-xs text-[#4A4A52] dark:text-gray-300 leading-relaxed font-medium">
                    {currentStandard.content.objective}
                  </p>
                </div>

                {/* Scope */}
                <div>
                  <h2 className="text-sm font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wider mb-3">
                    2. Scope
                  </h2>
                  <p className="text-xs text-[#4A4A52] dark:text-gray-300 leading-relaxed mb-4 font-medium">
                    {currentStandard.content.scope.statement}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#E8F7EE] dark:bg-[#1A2C22] border border-[#C5E9D4] dark:border-green-900/50">
                      <p className="text-xs font-bold text-[#1A7A4A] dark:text-emerald-400 uppercase tracking-widest mb-2.5">
                        Applies To
                      </p>
                      <ul className="space-y-2">
                        {currentStandard.content.scope.included.map((item, idx) => (
                          <li key={idx} className="text-xs text-[#4A4A52] dark:text-gray-300 flex items-start gap-2 leading-relaxed">
                            <span className="text-[#1A7A4A] dark:text-emerald-400">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FDEEEE] dark:bg-[#2C1D1D] border border-[#F5C6C0] dark:border-red-900/50">
                      <p className="text-xs font-bold text-[#C0392B] dark:text-red-400 uppercase tracking-widest mb-2.5">
                        Exempted / Excluded
                      </p>
                      <ul className="space-y-2">
                        {currentStandard.content.scope.excluded.map((item, idx) => (
                          <li key={idx} className="text-xs text-[#4A4A52] dark:text-gray-300 flex items-start gap-2 leading-relaxed">
                            <span className="text-[#C0392B] dark:text-red-400">✗</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Key Principles */}
                <div>
                  <h2 className="text-sm font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wider mb-4">
                    3. Key Principles &amp; Guidance
                  </h2>
                  <div className="space-y-4">
                    {currentStandard.content.keyPrinciples.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-[#E2E1DD] dark:border-gray-800 bg-[#FAFAF8] dark:bg-[#1E2640]">
                        <h3 className="text-xs font-bold text-[#1C1C1E] dark:text-white mb-1.5">{item.title}</h3>
                        <p className="text-xs text-[#76767E] dark:text-gray-400 leading-relaxed">{item.body}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Large Blank Content Placeholder for future material */}
                <div className="border border-dashed border-[#E2E1DD] dark:border-gray-800 rounded-xl p-8 text-center flex flex-col items-center justify-center bg-[#FAFAF8] dark:bg-[#111726]/30">
                  <div className="w-12 h-12 bg-white dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 rounded-full flex items-center justify-center shadow-2xs mb-3">
                    <FileText size={20} className="text-[#A0A0A8]" />
                  </div>
                  <h3 className="text-xs font-bold text-[#1C1C1E] dark:text-white mb-1">Content will be available here</h3>
                  <p className="text-[11px] text-[#76767E] dark:text-gray-400 max-w-sm leading-relaxed">
                    We are preparing high quality learning material and official references for you.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* 2. EXAMPLES & CASE LAW VIEW */}
          {activeTab === 'examples' && (
            <div className="w-full max-w-4xl mx-auto space-y-6">
              <div className="border-b border-[#E2E1DD] dark:border-gray-800 pb-4">
                <h1 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white tracking-tight">
                  {currentStandard.id.includes('intro')
                    ? `${currentStandard.title} – Examples & Case Law`
                    : `${currentStandard.code} – ${currentStandard.title} – Examples & Case Law`}
                </h1>
                <div className="h-1 w-12 bg-[#2D5BE3] mt-3 rounded-full"></div>
              </div>

              {/* Case list cards */}
              <div className="space-y-6">
                {currentStandard.examples.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                    <div className="flex items-center gap-2">
                      <Scale size={18} className="text-[#2D5BE3] dark:text-[#60A5FA]" />
                      <h3 className="text-xs font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wider">
                        {item.title}
                      </h3>
                    </div>
                    
                    <div className="bg-[#FAFAF8] dark:bg-[#1E2640] p-4 rounded-xl border border-[#E2E1DD] dark:border-gray-800">
                      <p className="text-[11px] text-[#A0A0A8] dark:text-gray-400 font-bold uppercase tracking-wider mb-1.5">
                        Practical Scenario
                      </p>
                      <p className="text-xs text-[#4A4A52] dark:text-gray-300 leading-relaxed font-semibold">
                        {item.scenario}
                      </p>
                    </div>

                    <div className="bg-[#E8F7EE] dark:bg-[#1A2C22] p-4 rounded-xl border border-[#C5E9D4] dark:border-green-900/50">
                      <p className="text-[11px] text-[#1A7A4A] dark:text-emerald-400 font-bold uppercase tracking-wider mb-1.5">
                        Statutory Accounting Guidance &amp; Treatment
                      </p>
                      <p className="text-xs text-[#4A4A52] dark:text-gray-300 leading-relaxed font-semibold">
                        {item.guidance}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. LECTURE VIDEO PLAYBACK VIEW */}
          {activeTab === 'lecture' && (
            <div className="w-full max-w-4xl mx-auto space-y-5">
              <div className="border-b border-[#E2E1DD] dark:border-gray-800 pb-3">
                <h1 className="text-xl font-bold text-[#1C1C1E] dark:text-white tracking-tight">
                  {currentStandard.code} – {currentStandard.title} (Lecture)
                </h1>
              </div>

              {/* Custom mock video player */}
              <div className="relative aspect-video w-full rounded-2xl bg-[#090C15] overflow-hidden shadow-lg border border-gray-900 flex flex-col group/video">
                
                {/* Play screen backdrop */}
                {!isPlaying && videoTime === 0 ? (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/45 backdrop-blur-xs transition-opacity p-6 text-center select-none">
                    
                    {/* Mock Poster Artwork inside Player */}
                    <div className="mb-6 max-w-sm w-full bg-slate-900/80 border border-slate-700/50 p-6 rounded-xl text-left shadow-md">
                      <span className="text-[10px] font-bold text-[#60A5FA] bg-[#2D5BE3]/10 px-2 py-0.5 rounded uppercase tracking-wider">
                        LECTURE
                      </span>
                      <h2 className="text-lg font-bold text-white mt-2 leading-tight">
                        {currentStandard.code}
                      </h2>
                      <p className="text-sm font-semibold text-gray-300 mt-1">
                        {currentStandard.title}
                      </p>
                    </div>

                    <button
                      onClick={() => setIsPlaying(true)}
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
                {showCC && isPlaying && (
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-black/80 rounded-md text-xs text-white max-w-lg text-center leading-normal border border-gray-800">
                    {videoTime < 5
                      ? `Welcome to our session on ${currentStandard.code} – ${currentStandard.title}.`
                      : videoTime < 12
                      ? "In this chapter, we will discuss the primary objectives and legislative scope."
                      : videoTime < 25
                      ? "Note that complying with these disclosure criteria is essential for ICAI examinations."
                      : "Let's review the practical illustrations and adjustments in our work papers."}
                  </div>
                )}

                {/* Controls Bar at bottom */}
                <div className="mt-auto w-full bg-gradient-to-t from-black/90 to-transparent p-4 flex flex-col gap-2 z-10 opacity-95 transition-opacity">
                  
                  {/* Progress timeline slider */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 font-semibold select-none">
                      {formatVideoTime(videoTime)}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="1125"
                      value={videoTime}
                      onChange={(e) => setVideoTime(Number(e.target.value))}
                      className="flex-1 accent-[#2D5BE3] h-1 rounded-full bg-gray-700 cursor-pointer outline-none"
                    />
                    <span className="text-[10px] text-gray-400 font-semibold select-none">
                      18:45
                    </span>
                  </div>

                  {/* Icon controllers row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:text-[#2D5BE3] transition-colors"
                      >
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                      </button>
                      <button
                        onClick={() => setVideoTime((t) => Math.min(1125, t + 10))}
                        className="text-white hover:text-[#2D5BE3] transition-colors"
                        title="Skip forward 10 seconds"
                      >
                        <SkipForward size={16} />
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
                      {/* Subtitles CC Button */}
                      <button
                        onClick={() => setShowCC(!showCC)}
                        className={`text-xs font-bold px-1.5 py-0.5 rounded border transition-colors ${
                          showCC
                            ? 'text-white border-[#2D5BE3] bg-[#2D5BE3]'
                            : 'text-gray-400 border-gray-600 hover:text-white hover:border-white'
                        }`}
                      >
                        CC
                      </button>
                      <button className="text-white hover:text-[#2D5BE3] transition-colors">
                        <Settings size={16} />
                      </button>
                      <button
                        onClick={() => alert('Fullscreen is simulated for presentation purposes.')}
                        className="text-white hover:text-[#2D5BE3] transition-colors"
                      >
                        <Maximize size={16} />
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* YouTube Link below Video Player */}
              <div className="p-4 bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-red-100 dark:bg-red-950/30 flex items-center justify-center text-red-600 shrink-0">
                    <FileVideo size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#1C1C1E] dark:text-white">Watch on YouTube</h3>
                    <p className="text-[10px] text-[#76767E] dark:text-gray-400 mt-0.5 font-medium">Access this video directly in your YouTube account.</p>
                  </div>
                </div>
                <a
                  href={`https://www.youtube.com/watch?v=mock_${currentStandard.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#2D5BE3] dark:text-[#60A5FA] flex items-center gap-1.5 hover:underline"
                >
                  https://www.youtube.com/watch?v=mock_{currentStandard.id}
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          )}

          {/* 4. PREMIUM DOCUMENT PDF VIEWER VIEW */}
          {activeTab === 'pdf' && (
            <div className="flex-1 flex flex-col lg:flex-row gap-5 min-h-[500px] select-none">
              
              {/* Left PDF Thumbnails Panel */}
              <div className="w-full lg:w-[150px] bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-xl p-3 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto shrink-0 select-none">
                <span className="text-[10px] font-bold text-[#76767E] uppercase tracking-wider hidden lg:block mb-2">
                  Pages
                </span>
                {[1, 2, 3].map((pageNo) => (
                  <button
                    key={pageNo}
                    onClick={() => setPdfPage(pageNo)}
                    className={`flex-col items-center p-2 rounded-lg border text-center transition-all shrink-0 flex w-[70px] lg:w-full ${
                      pdfPage === pageNo
                        ? 'border-[#2D5BE3] bg-[#EEF2FD] dark:bg-[#1A2542]'
                        : 'border-[#E2E1DD] dark:border-gray-800 hover:bg-[#FAFAF8] dark:hover:bg-[#1E2640]'
                    }`}
                  >
                    <div className="w-12 h-14 bg-[#F4F3F0] dark:bg-gray-800 rounded-md border border-[#E2E1DD] dark:border-gray-700 flex items-center justify-center text-[10px] font-bold text-[#A0A0A8] shadow-2xs">
                      AS 1
                    </div>
                    <span className="text-[10px] font-bold text-[#4A4A52] dark:text-gray-300 mt-1.5">
                      {pageNo}
                    </span>
                  </button>
                ))}
              </div>

              {/* Central PDF Canvas area */}
              <div className="flex-1 bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-xl flex flex-col overflow-hidden relative">
                
                {/* PDF Control toolbar */}
                <div className="bg-[#FAFAF8] dark:bg-[#1E2640] border-b border-[#E2E1DD] dark:border-gray-800 p-2 flex items-center justify-between flex-wrap gap-2 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <button className="p-1.5 rounded hover:bg-[#EEF2FD] text-[#4A4A52] dark:text-gray-300">
                      <span className="font-bold text-xs">≡</span>
                    </button>
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={pdfPage}
                        onChange={(e) => {
                          const val = Number(e.target.value)
                          if (val >= 1 && val <= 3) setPdfPage(val)
                        }}
                        className="w-8 text-center text-xs font-bold border border-[#E2E1DD] dark:border-gray-800 rounded py-0.5 bg-white dark:bg-[#0B0F19]"
                      />
                      <span className="text-xs text-[#76767E] font-medium">/ 24</span>
                    </div>
                  </div>

                  {/* Zoom controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
                      className="w-6 h-6 rounded flex items-center justify-center bg-white dark:bg-gray-800 border border-[#E2E1DD] dark:border-gray-700 text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-[#1C1C1E] dark:text-white select-none">
                      {zoomLevel}%
                    </span>
                    <button
                      onClick={() => setZoomLevel((z) => Math.min(200, z + 10))}
                      className="w-6 h-6 rounded flex items-center justify-center bg-white dark:bg-gray-800 border border-[#E2E1DD] dark:border-gray-700 text-xs font-bold"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSearchInPdf(!searchInPdf)}
                      className={`p-1.5 rounded transition-colors ${searchInPdf ? 'bg-[#EEF2FD] text-[#2D5BE3]' : 'hover:bg-[#EEF2FD] text-[#4A4A52]'}`}
                    >
                      <Search size={14} />
                    </button>
                    <button
                      onClick={() => alert('Document rotated.')}
                      className="p-1.5 rounded hover:bg-[#EEF2FD] text-[#4A4A52] dark:text-gray-300"
                    >
                      <RotateCw size={14} />
                    </button>
                  </div>
                </div>

                {/* PDF Search Box inside viewer */}
                {searchInPdf && (
                  <div className="p-2 bg-[#EEF2FD] border-b border-[#D0DCFA] flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Find in document..."
                      value={pdfSearchQuery}
                      onChange={(e) => setPdfSearchQuery(e.target.value)}
                      className="bg-white border border-[#D0DCFA] rounded-md px-3 py-1 text-xs outline-none flex-1 max-w-sm"
                    />
                    <button
                      onClick={() => setPdfSearchQuery('')}
                      className="text-xs text-[#76767E] hover:text-[#1C1C1E]"
                    >
                      Clear
                    </button>
                  </div>
                )}

                {/* PDF Sheet Canvas containing text content */}
                <div
                  className="flex-1 overflow-auto p-6 relative flex justify-center bg-[#525659] select-none"
                  onClick={handleAddNoteClick}
                >
                  <div
                    className="bg-white relative shadow-md p-8 sm:p-12 w-full max-w-[550px] min-h-[700px] border border-gray-300 select-none flex flex-col justify-start text-left origin-top transition-transform"
                    style={{ transform: `scale(${zoomLevel / 100})` }}
                  >
                    {/* Drawing canvas layer on top for Pen Tool */}
                    <canvas
                      ref={canvasRef}
                      width={500}
                      height={700}
                      className={`absolute inset-0 z-10 ${annotationMode === 'write' ? 'cursor-crosshair' : 'pointer-events-none'}`}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                    />

                    {/* Page Content based on Page selection */}
                    {pdfPage === 1 && (
                      <div className="space-y-6 select-text z-0">
                        <div>
                          <span className="text-[10px] font-bold text-[#2D5BE3] border-b-2 border-[#2D5BE3] pb-1 uppercase tracking-wider">
                            AS 1
                          </span>
                          <h2 className="text-xl font-bold text-[#1C1C1E] mt-4">
                            Disclosure of Accounting Policies
                          </h2>
                          <div className="h-0.5 bg-gray-200 mt-2"></div>
                        </div>

                        {/* Text chunks for highlighting */}
                        <div className="space-y-4 text-xs text-[#1C1C1E] leading-relaxed">
                          <div>
                            <span className="font-bold block mb-1 text-gray-800">1. Objective</span>
                            <p>
                              The objective of this Standard is to require{' '}
                              <span
                                onClick={() => handleHighlightWord('h1')}
                                className={`cursor-pointer transition-colors p-0.5 rounded ${
                                  pdfHighlights.find((h) => h.elementId === 'h1')
                                    ? 'bg-yellow-200 text-black'
                                    : 'hover:bg-yellow-100'
                                }`}
                              >
                                the disclosure of the significant accounting policies
                              </span>{' '}
                              adopted in the preparation of financial statements.
                            </p>
                          </div>

                          <div>
                            <span className="font-bold block mb-1 text-gray-800">2. Scope</span>
                            <p>
                              This Standard shall be applied in the{' '}
                              <span
                                onClick={() => handleHighlightWord('h2')}
                                className={`cursor-pointer transition-colors p-0.5 rounded ${
                                  pdfHighlights.find((h) => h.elementId === 'h2')
                                    ? 'bg-blue-200 text-black'
                                    : 'hover:bg-blue-100'
                                }`}
                              >
                                selection and application of accounting policies
                              </span>{' '}
                              and in the disclosure of those policies.
                            </p>
                          </div>

                          <div>
                            <span className="font-bold block mb-1 text-gray-800">3. Fundamental Assumptions</span>
                            <p>
                              The following are fundamental accounting assumptions:{' '}
                              <span className="font-semibold text-[#2D5BE3]">Going Concern</span>,{' '}
                              <span className="font-semibold text-[#2D5BE3]">Consistency</span>, and{' '}
                              <span className="font-semibold text-[#2D5BE3]">Accrual</span>.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {pdfPage === 2 && (
                      <div className="space-y-6 select-text z-0">
                        <div>
                          <span className="text-[10px] font-bold text-[#2D5BE3] border-b-2 border-[#2D5BE3] pb-1 uppercase tracking-wider">
                            AS 1
                          </span>
                          <h2 className="text-xl font-bold text-[#1C1C1E] mt-4">
                            Selection of Accounting Policies
                          </h2>
                          <div className="h-0.5 bg-gray-200 mt-2"></div>
                        </div>

                        <div className="space-y-4 text-xs text-[#1C1C1E] leading-relaxed">
                          <p>
                            Primary consideration is that financial statements present a{' '}
                            <span
                              onClick={() => handleHighlightWord('h3')}
                              className={`cursor-pointer transition-colors p-0.5 rounded ${
                                pdfHighlights.find((h) => h.elementId === 'h3')
                                  ? 'bg-green-200 text-black'
                                  : 'hover:bg-green-100'
                              }`}
                            >
                              true and fair view
                            </span>{' '}
                            of the state of affairs.
                          </p>

                          <div>
                            <span className="font-bold block mb-1 text-gray-800">Secondary Considerations:</span>
                            <ul className="list-disc pl-4 space-y-1">
                              <li>
                                <span className="font-bold">Prudence:</span> Provisions should be made for all known
                                liabilities and losses, even if the amount cannot be determined with certainty.
                              </li>
                              <li>
                                <span className="font-bold">Substance over Form:</span> Transactions should be accounted for in
                                accordance with their commercial reality, not merely legal form.
                              </li>
                              <li>
                                <span className="font-bold">Materiality:</span> Financial statements should disclose all material
                                items which could influence user decisions.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {pdfPage === 3 && (
                      <div className="space-y-6 select-text z-0">
                        <div>
                          <span className="text-[10px] font-bold text-[#2D5BE3] border-b-2 border-[#2D5BE3] pb-1 uppercase tracking-wider">
                            AS 1
                          </span>
                          <h2 className="text-xl font-bold text-[#1C1C1E] mt-4">
                            Exemptions and Disclosure Norms
                          </h2>
                          <div className="h-0.5 bg-gray-200 mt-2"></div>
                        </div>

                        <div className="space-y-4 text-xs text-[#1C1C1E] leading-relaxed">
                          <p>
                            Accounting policies must be disclosed in a single place (typically as Note 1 of the Notes to
                            Accounts).
                          </p>
                          <p>
                            Any change in accounting policies which has a material effect in the current period, or is
                            reasonably expected to have a material effect in later periods, must be disclosed.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Rendering Sticky Notes placed by user */}
                    {pdfNotes
                      .filter((n) => n.page === pdfPage)
                      .map((note) => (
                        <div
                          key={note.id}
                          style={{ left: note.x, top: note.y }}
                          className="absolute z-20 w-36 p-2 bg-yellow-100 border border-yellow-300 rounded shadow-sm text-[10px] text-gray-800 animate-fade-in"
                          title="Click note to delete"
                          onClick={(e) => {
                            e.stopPropagation()
                            setPdfNotes((prev) => prev.filter((n) => n.id !== note.id))
                          }}
                        >
                          <div className="font-bold border-b border-yellow-200 pb-0.5 mb-1 flex items-center justify-between">
                            <span>Sticky Note</span>
                            <span className="text-red-500 font-bold hover:scale-105 cursor-pointer">×</span>
                          </div>
                          <p className="font-medium leading-relaxed">{note.text}</p>
                        </div>
                      ))}
                  </div>
                </div>

              </div>

              {/* Right Side Annotation Toolbar Panel */}
              <div className="w-full lg:w-[200px] bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-xl p-4 flex flex-col gap-4 shrink-0">
                <span className="text-[10px] font-bold text-[#76767E] uppercase tracking-wider">
                  Annotation Tools
                </span>

                {/* Highlight tool */}
                <div className="space-y-2">
                  <button
                    onClick={() => setAnnotationMode(annotationMode === 'highlight' ? 'none' : 'highlight')}
                    className={`w-full py-2 px-3 rounded-md text-xs font-bold flex items-center gap-2 border transition-all ${
                      annotationMode === 'highlight'
                        ? 'border-[#2D5BE3] bg-[#EEF2FD] text-[#2D5BE3] dark:text-[#60A5FA]'
                        : 'border-[#E2E1DD] dark:border-gray-800 hover:bg-[#FAFAF8] dark:hover:bg-[#1E2640] text-[#4A4A52]'
                    }`}
                  >
                    <Highlighter size={13} />
                    Highlight
                  </button>

                  {/* Highlight Color Pickers */}
                  {annotationMode === 'highlight' && (
                    <div className="flex items-center justify-around bg-[#FAFAF8] dark:bg-gray-800 p-2 rounded border border-[#E2E1DD]">
                      <button
                        onClick={() => setHighlightColor('yellow')}
                        className={`w-4 h-4 rounded-full bg-yellow-300 border ${highlightColor === 'yellow' ? 'ring-2 ring-[#2D5BE3]' : ''}`}
                      />
                      <button
                        onClick={() => setHighlightColor('green')}
                        className={`w-4 h-4 rounded-full bg-green-300 border ${highlightColor === 'green' ? 'ring-2 ring-[#2D5BE3]' : ''}`}
                      />
                      <button
                        onClick={() => setHighlightColor('pink')}
                        className={`w-4 h-4 rounded-full bg-pink-300 border ${highlightColor === 'pink' ? 'ring-2 ring-[#2D5BE3]' : ''}`}
                      />
                      <button
                        onClick={() => setHighlightColor('blue')}
                        className={`w-4 h-4 rounded-full bg-blue-300 border ${highlightColor === 'blue' ? 'ring-2 ring-[#2D5BE3]' : ''}`}
                      />
                      <button
                        onClick={() => setHighlightColor('purple')}
                        className={`w-4 h-4 rounded-full bg-purple-300 border ${highlightColor === 'purple' ? 'ring-2 ring-[#2D5BE3]' : ''}`}
                      />
                    </div>
                  )}
                </div>

                {/* Draw Pencil tool */}
                <button
                  onClick={() => setAnnotationMode(annotationMode === 'write' ? 'none' : 'write')}
                  className={`w-full py-2 px-3 rounded-md text-xs font-bold flex items-center gap-2 border transition-all ${
                    annotationMode === 'write'
                      ? 'border-[#2D5BE3] bg-[#EEF2FD] text-[#2D5BE3] dark:text-[#60A5FA]'
                      : 'border-[#E2E1DD] dark:border-gray-800 hover:bg-[#FAFAF8] dark:hover:bg-[#1E2640] text-[#4A4A52]'
                  }`}
                >
                  <PenTool size={13} />
                  Write
                </button>

                {/* Eraser tool */}
                <button
                  onClick={() => {
                    clearAnnotations()
                    setAnnotationMode('none')
                  }}
                  className="w-full py-2 px-3 rounded-md text-xs font-bold flex items-center gap-2 border border-[#E2E1DD] dark:border-gray-800 hover:bg-[#FAFAF8] dark:hover:bg-[#1E2640] text-[#4A4A52]"
                >
                  <Eraser size={13} />
                  Erase
                </button>

                {/* Sticky Note tool */}
                <button
                  onClick={() => setAnnotationMode(annotationMode === 'note' ? 'none' : 'note')}
                  className={`w-full py-2 px-3 rounded-md text-xs font-bold flex items-center gap-2 border transition-all ${
                    annotationMode === 'note'
                      ? 'border-[#2D5BE3] bg-[#EEF2FD] text-[#2D5BE3] dark:text-[#60A5FA]'
                      : 'border-[#E2E1DD] dark:border-gray-800 hover:bg-[#FAFAF8] dark:hover:bg-[#1E2640] text-[#4A4A52]'
                  }`}
                >
                  <MessageSquare size={13} />
                  Add Note
                </button>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  )
}
