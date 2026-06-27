import React from 'react'

export interface CardPanel {
  title: string;
  content: React.ReactNode;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  badgeColor?: string;
  pdfPage?: number;
  panels: CardPanel[];
  examFocus?: string;
  examFocusType?: 'trap' | 'focus' | 'trick' | 'concept' | 'adjustment';
}

export const PdfRefInline = ({ page }: { page: number }) => (
  <button
    data-pdf-page={page}
    className="inline-flex items-center justify-center w-4 h-4 mx-1 bg-red-50 hover:bg-red-100 dark:bg-red-900/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded transition-all cursor-pointer select-none align-middle"
    title={`Open ICAI AS 23 PDF — Page ${page}`}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
    </svg>
  </button>
)

export const icaiIllustrations: CaseStudy[] = [
  {
    id: 'illus-23-1',
    title: 'ICAI Illustration 1 — Equity Method Computation: Year-by-Year Investment Carrying Amount',
    category: 'Official ICAI Illustration',
    pdfPage: 8,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Investor:</strong> Alpha Ltd. holds 30% equity in Beta Ltd. (an associate). Alpha acquired the investment on 01 Apr 2022 for ₹9,00,00,000.</p>
            <p className="mt-2">Beta Ltd.'s financials:</p>
            <div className="overflow-x-auto mt-1">
              <table className="w-full text-xs border-collapse border border-slate-200 dark:border-slate-800 font-mono">
                <thead><tr className="bg-slate-100 dark:bg-slate-900"><th className="border p-1.5">Year</th><th className="border p-1.5">PAT (₹)</th><th className="border p-1.5">Dividend Paid (₹)</th></tr></thead>
                <tbody>
                  <tr><td className="border p-1.5">FY 2022-23</td><td className="border p-1.5">4,00,00,000</td><td className="border p-1.5">1,00,00,000</td></tr>
                  <tr className="bg-blue-50/10"><td className="border p-1.5">FY 2023-24</td><td className="border p-1.5">6,00,00,000</td><td className="border p-1.5">2,00,00,000</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      },
      {
        title: 'Equity Method: Year 1 (FY 2022-23)',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p><strong>Opening Investment (01 Apr 2022):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹9,00,00,000</strong></p>
            <p>Add: 30% of Beta's PAT (30% × ₹4Cr):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹1,20,00,000</p>
            <p>Less: 30% of Dividends received (30% × ₹1Cr):&nbsp;(₹30,00,000)</p>
            <p className="font-bold">Closing Investment (31 Mar 2023):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹9,90,00,000</p>
            <p className="font-sans mt-1 text-slate-500">In Alpha's CFS P&amp;L: Share of profit = ₹1,20,00,000</p>
          </div>
        )
      },
      {
        title: 'Equity Method: Year 2 (FY 2023-24)',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p><strong>Opening Investment (01 Apr 2023):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹9,90,00,000</strong></p>
            <p>Add: 30% × ₹6Cr PAT:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹1,80,00,000</p>
            <p>Less: 30% × ₹2Cr Dividend:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(₹60,00,000)</p>
            <p className="font-bold">Closing Investment (31 Mar 2024):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹11,10,00,000</p>
          </div>
        )
      },
      {
        title: 'Goodwill Embedded in Equity Method',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>At acquisition: Beta's net assets = ₹26,00,00,000. 30% = ₹7,80,00,000. Cost = ₹9,00,00,000.</p>
            <p><strong>Goodwill = ₹9Cr − ₹7.8Cr = ₹1,20,00,000</strong></p>
            <p>This goodwill is <strong>embedded in the investment carrying amount</strong> and NOT separately disclosed. It is tested for impairment as part of the overall investment, not independently.</p>
            <p className="mt-2">This is different from consolidation (AS 21) where goodwill appears as a separate line item on the consolidated balance sheet.</p>
          </div>
        )
      }
    ],
    examFocus: 'Under equity method, dividends REDUCE the investment carrying amount (not income). Share of profit INCREASES the carrying amount. Goodwill is embedded, not shown separately.',
    examFocusType: 'trap'
  },
  {
    id: 'illus-23-2',
    title: 'ICAI Illustration 2 — When Associate Has Losses: Carrying Amount Reduced to Zero',
    category: 'Official ICAI Illustration',
    pdfPage: 14,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Situation:</strong> Alpha holds 40% in Gamma Ltd. Investment carrying amount at start of FY 2023-24: ₹2,00,00,000. Gamma reports a net loss of ₹6,00,00,000 for FY 2023-24.</p>
            <p className="mt-2">40% of Gamma's loss = ₹2,40,00,000. But investment carrying amount is only ₹2,00,00,000.</p>
          </div>
        )
      },
      {
        title: 'AS 23 Loss Recognition Rule (Para 13)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 13: When the investor's share of losses of an associate equals or exceeds the carrying amount of the investment, the investor discontinues recognizing its share of further losses.</p>
            <p><strong>Step-by-step:</strong></p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Alpha's share of loss = ₹2,40,00,000</li>
              <li>First ₹2,00,00,000: Recognized → Carrying amount → Nil</li>
              <li>Remaining ₹40,00,000: <strong>NOT recognized</strong> (no obligation to fund associate losses)</li>
            </ol>
            <p className="mt-2"><strong>Exception:</strong> If Alpha has given long-term loans or guarantees to Gamma, those balances must also be reduced by the unrecognized losses before stopping.</p>
          </div>
        )
      },
      {
        title: 'Resuming Loss / Profit Recognition',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>When Gamma returns to profitability in later years:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Alpha resumes recognizing its share of profits only after the unrecognized losses of ₹40,00,000 have been offset.</li>
              <li>First ₹40L of profits → Offset cumulative unrecognized loss (not recognized as income)</li>
              <li>Profits thereafter → Recognized and investment carrying amount increases above nil</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'When equity method investment reaches zero due to losses, STOP recognizing further losses. Resume only after cumulative unrecognized losses are fully offset by future profits.',
    examFocusType: 'focus'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-23-1',
    title: 'Business Case — Eliminating Unrealized Profit on Upstream Transactions (Associate sells to Investor)',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Alpha Ltd.</strong> holds 35% in Beta Ltd. (associate). During FY 2023-24, Beta sold goods to Alpha at cost + 20% markup. Alpha holds ₹5,00,00,000 of this inventory unrealized at year-end (at transfer price).</p>
            <p className="mt-2">Unrealized profit in Alpha's inventory = ₹5Cr ÷ 1.2 × 0.2 = ₹83,33,333</p>
          </div>
        )
      },
      {
        title: 'Upstream Transaction — AS 23 Para 15',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Upstream transaction:</strong> Associate sells to investor (goods flow UP from associate to investor).</p>
            <p>Para 15: Unrealized profits and losses resulting from transactions between an investor and its associate shall be eliminated to the extent of the investor's interest in the associate.</p>
            <p><strong>Elimination = 35% × ₹83,33,333 = ₹29,16,667</strong></p>
            <p>This reduction is made by reducing the investment carrying amount (not the inventory balance).</p>
          </div>
        )
      },
      {
        title: 'Comparison: Upstream vs Downstream',
        content: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-200 dark:border-slate-800">
              <thead><tr className="bg-slate-100 dark:bg-slate-900"><th className="border p-2">Direction</th><th className="border p-2">Who Sells</th><th className="border p-2">Elimination</th></tr></thead>
              <tbody>
                <tr><td className="border p-2 font-bold">Upstream</td><td className="border p-2">Associate → Investor</td><td className="border p-2">Investor% of unrealized profit</td></tr>
                <tr className="bg-blue-50/10"><td className="border p-2 font-bold">Downstream</td><td className="border p-2">Investor → Associate</td><td className="border p-2">Investor% of unrealized profit</td></tr>
              </tbody>
            </table>
          </div>
        )
      }
    ],
    examFocus: 'Both upstream and downstream unrealized profits are eliminated only to the EXTENT of the investor\'s interest percentage — NOT 100% as in full consolidation.',
    examFocusType: 'trick'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-23-1',
    title: 'Audit Case Study — Associate Using Different GAAP / Reporting Date',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> Indian parent company Alpha Ltd. holds 28% in Singapore associate Beta Pte Ltd., which prepares financial statements under SFRS (Singapore Financial Reporting Standards) with a September year-end.</p>
            <p>Alpha's year-end is March. The gap between reporting dates = 6 months.</p>
          </div>
        )
      },
      {
        title: 'AS 23 Rules for Date Differences and Different GAAP',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Date Difference (Para 12):</strong> If the most recent available financial statements of an associate are for a date more than 3 months different from the investor's date, the investor must use more recent statements or adjust for material transactions in the intervening period.</p>
            <p>6-month gap: Alpha must obtain Beta's September-March financial data or require Beta to prepare March-date accounts.</p>
            <p className="mt-2"><strong>Different GAAP (Para 17):</strong> If it is not practicable to apply uniform accounting policies, the investor shall disclose the proportion of the associate's assets, liabilities, income, and expenses to which the different accounting policies have been applied.</p>
          </div>
        )
      },
      {
        title: 'Auditor Responsibilities',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The auditor must verify:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>That Alpha obtained the most recent associate financial statements (within 3-month tolerance)</li>
              <li>Material transactions between Sept 2023 and March 2024 were adjusted for</li>
              <li>Any material SFRS vs Indian GAAP differences were considered</li>
              <li>Disclosures are adequate if uniform policies could not be applied</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'For associates with different year-ends: the 3-month rule (same as AS 21 subsidiaries) applies. More than 3 months difference → must get more current statements or adjust.',
    examFocusType: 'adjustment'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-23-1',
    title: 'SEBI Observation — Non-application of Equity Method for Associates in CFS',
    category: 'Regulatory Observations',
    panels: [
      {
        title: 'SEBI Finding',
        content: (
          <div>
            <p><strong>SEBI Enforcement:</strong> Several listed companies were carrying investments in associates at cost in their consolidated financial statements, without applying the equity method. The reason cited was "practical difficulties in obtaining associate financials."</p>
          </div>
        )
      },
      {
        title: 'AS 23 Mandatory Nature of Equity Method',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The equity method is mandatory for all associates in consolidated financial statements — it is not optional. "Practical difficulty" in obtaining associate data is not a valid exemption.</p>
            <p><strong>Only valid exception under AS 23 Para 8:</strong> Associate acquired and held exclusively for disposal within 12 months — carry at cost until disposal.</p>
            <p>SEBI directed restatement of the CFS with equity method applied to all associates.</p>
          </div>
        )
      }
    ],
    examFocus: 'Equity method is MANDATORY for associates in CFS. "Practical difficulty" in obtaining associate financials is not a valid reason to use the cost method.',
    examFocusType: 'focus'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'judicial-23-1',
    title: 'Conceptual Case — Investment in Associate Classified as Financial Investment (Below 20%)',
    category: 'Landmark Judicial Cases',
    panels: [
      {
        title: 'Facts & Principle',
        content: (
          <div>
            <p><strong>Scenario:</strong> Alpha Ltd. holds 15% in Beta Ltd. and has been applying the equity method, claiming significant influence due to a Board seat.</p>
            <p className="mt-2">In the subsequent year, Beta increased its share capital through a rights issue, and Alpha did not subscribe — resulting in Alpha's stake falling to 12%.</p>
          </div>
        )
      },
      {
        title: 'When Significant Influence is Lost',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Below 20%, there is a rebuttable presumption that significant influence does NOT exist. Alpha must assess whether:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>It still has a Board seat (if yes, may still have significant influence)</li>
              <li>It participates in policy-making decisions</li>
              <li>There are material transactions or technological dependencies</li>
            </ul>
            <p className="mt-2">If significant influence is lost (no Board seat, no policy participation), Alpha must discontinue equity method and treat Beta as a financial investment at cost.</p>
            <p className="mt-2"><strong>Upon discontinuing equity method:</strong> The closing carrying amount under equity method becomes the new cost basis for the financial investment.</p>
          </div>
        )
      }
    ],
    examFocus: 'When significant influence is lost, the last equity method carrying amount becomes the new cost for the investment. No gain or loss is recognized on transition itself.',
    examFocusType: 'concept'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-23-1',
    title: 'Exam Corner — Equity Method vs Cost Method vs Full Consolidation (Quick Comparison)',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'Three Methods at a Glance',
        content: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-200 dark:border-slate-800">
              <thead><tr className="bg-slate-100 dark:bg-slate-900"><th className="border p-2">Method</th><th className="border p-2">Used When</th><th className="border p-2">Income Recognized</th><th className="border p-2">Balance Sheet</th></tr></thead>
              <tbody>
                <tr><td className="border p-2 font-bold">Full Consolidation</td><td className="border p-2">&gt;50% (Subsidiary)</td><td className="border p-2">All subsidiary revenue/expenses</td><td className="border p-2">All assets/liabilities line by line</td></tr>
                <tr className="bg-blue-50/10"><td className="border p-2 font-bold">Equity Method</td><td className="border p-2">20–50% (Associate/JV)</td><td className="border p-2">% share of profit/loss only</td><td className="border p-2">Single investment line (carrying amount)</td></tr>
                <tr><td className="border p-2 font-bold">Cost Method</td><td className="border p-2">&lt;20% (Financial investment)</td><td className="border p-2">Dividends declared by investee</td><td className="border p-2">At original cost (less impairment)</td></tr>
              </tbody>
            </table>
          </div>
        )
      },
      {
        title: 'Equity Method Key Points',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <ul className="list-disc pl-5 space-y-1">
              <li>Dividends reduce investment carrying amount (not income in P&amp;L)</li>
              <li>Share of profit increases carrying amount (recognized in P&amp;L)</li>
              <li>Goodwill is embedded — not tested separately</li>
              <li>When carrying amount hits zero due to losses → stop further loss recognition</li>
              <li>Unrealized profits eliminated to extent of investor's interest only</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Cost method income = dividends declared (not paid). Equity method income = investor\'s share of associate\'s profit/loss. Full consolidation = all revenues and expenses included.',
    examFocusType: 'trick'
  },
  {
    id: 'exam-23-2',
    title: 'Exam Corner — Equity Method: Goodwill, Zero Floor, and Impairment Rules',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'Goodwill Embedded in Associate Investment',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>When shares in an associate are acquired, the cost paid often exceeds the proportionate share of the investee's net assets. This excess is akin to goodwill and is included within the carrying amount of the investment.</p>
            <p className="mt-1"><strong>Key AS 23 Rule:</strong> Goodwill arising on acquisition of an associate is NOT separately amortized under AS 23. It remains embedded in the carrying amount and the carrying amount is tested for impairment as a whole.</p>
            <p className="mt-1"><strong>Negative Goodwill (Bargain Purchase):</strong> If cost paid is LESS than proportionate net assets, the excess is recognized as income in P&L immediately in the year of acquisition.</p>
          </div>
        )
      },
      {
        title: 'The Zero Floor Rule (Para 16)',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p className="font-sans font-bold">Scenario: Investor holds 30% in Loss-Making Associate</p>
            <p>Opening carrying amount of investment = ₹60,00,000</p>
            <p>Associate's net loss = ₹25,00,000 per year</p>
            <p>Year 1: 30% × ₹25L = ₹7.5L loss; Investment = ₹60L − ₹7.5L = ₹52.5L</p>
            <p>Year 2: Investment = ₹52.5L − ₹7.5L = ₹45L</p>
            <p>...</p>
            <p>Year 8: Investment = ₹60L − 8 × ₹7.5L = ₹0 (hits zero)</p>
            <p className="font-sans font-bold mt-1">Year 9 onwards: STOP recognizing losses</p>
            <p className="font-sans">Investor does not go below zero unless it has guaranteed the associate's obligations.</p>
          </div>
        )
      },
      {
        title: 'Resumption After Zero Floor',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>If the associate subsequently becomes profitable after a period of losses that drove the carrying amount to zero:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>First recover the unrecognized losses (from the floor period)</li>
              <li>Then recognize the remaining profit share in P&L</li>
              <li>Investment carrying amount starts building back from zero</li>
            </ol>
            <p className="mt-1"><strong>Example:</strong> ₹10L losses were not recognized at zero floor. Associate makes ₹18L profit in Year 10. Investor's 30% share = ₹5.4L. First ₹3L (30% of ₹10L unrecognized) is absorbed; remaining ₹2.4L is recognized in P&L.</p>
          </div>
        )
      }
    ],
    examFocus: 'Equity method investment NEVER goes below zero unless the investor has guaranteed losses. Unrecognized losses must be absorbed first when associate returns to profitability.',
    examFocusType: 'trap'
  }
]
