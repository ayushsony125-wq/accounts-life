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
    className="inline-flex items-center justify-center w-4 h-4 mx-1 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-650 dark:text-red-400 rounded transition-all cursor-pointer select-none align-middle"
    title={`Open ICAI AS 23 PDF — Page ${page}`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-file-text"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  </button>
)

export const icaiIllustrations: CaseStudy[] = [
  {
    id: 'illus-23-1',
    title: 'ICAI Illustration 1 — Equity Method of Accounting (Investment in Associate)',
    category: 'Official ICAI Illustration',
    pdfPage: 8,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Investor Ltd. acquires 30% of the equity shares of Associate Ltd. on 1st April 20X1:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Cost of Investment = <strong>₹5,00,000</strong>.</li>
              <li>Net Assets of Associate Ltd. on acquisition date = <strong>₹12,00,000</strong>.</li>
              <li>Associate Ltd. reports profit for the FY 20X1-X2 = <strong>₹3,00,000</strong>.</li>
              <li>Associate Ltd. pays a dividend of <strong>₹1,00,000</strong> on 31st October 20X1.</li>
            </ul>
            <p className="mt-2"><strong>Issue:</strong> Calculate the carrying amount of the investment in the Consolidated Financial Statements of Investor Ltd. as at 31st March 20X2. <PdfRefInline page={8} /></p>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div className="space-y-3 font-mono text-xs p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>Step 1: Calculate Goodwill / Capital Reserve at acquisition</strong></p>
            <p>• Cost of Investment = ₹5,00,000</p>
            <p>• Investor\'s share of Net Assets (30% of ₹12,00,000) = ₹3,60,000</p>
            <p>• Goodwill included in investment cost = ₹5,00,000 - ₹3,60,000 = <strong>₹1,40,000</strong></p>
            
            <p className="mt-2"><strong>Step 2: Adjust for post-acquisition profits</strong></p>
            <p>Investor\'s share of post-acquisition profit (30% of ₹3,00,000) = +<strong>₹90,000</strong></p>
            
            <p className="mt-2"><strong>Step 3: Adjust for dividends received</strong></p>
            <p>Dividends received (30% of ₹1,00,000) = -<strong>₹30,000</strong> (This reduces the carrying amount under the equity method)</p>
            
            <p className="mt-2"><strong>Step 4: Compute final Carrying Amount</strong></p>
            <p>Carrying Amount = Initial Cost + Share of Profit - Dividend</p>
            <p>Carrying Amount = ₹5,00,000 + ₹90,000 - ₹30,000 = <strong>₹5,60,000</strong></p>
            <p><i>(Note: The ₹1,40,000 Goodwill is not shown separately, but remains embedded in the carrying value of ₹5,60,000)</i></p>
          </div>
        )
      },
      {
        title: 'AS 23 Audit Notes',
        content: (
          <div className="space-y-2">
            <p>Under the equity method, dividends received from the associate are treated as a return of investment and therefore **reduce the carrying amount** of the investment. <PdfRefInline page={2} /></p>
            <p>In the Consolidated P&amp;L statement, the investor recognizes its share of the associate\'s profit (₹90,000) as income. The dividend received (₹30,000) is NOT credited to P&amp;L as income, but is credited to the investment account.</p>
          </div>
        )
      }
    ],
    examFocus: 'Do not credit dividends received from an associate to the Consolidated P&L statement under the equity method. In the separate balance sheet (under AS 13), the dividend is credited to P&L, but during consolidation, this must be adjusted to reduce the investment carrying value.',
    examFocusType: 'trap'
  },
  {
    id: 'illus-23-2',
    title: 'ICAI Illustration 2 — Elimination of Unrealized Profit on Transactions with Associate',
    category: 'Official ICAI Illustration',
    pdfPage: 10,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Transaction details:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Investor Ltd. holds a 25% interest in Associate Ltd.</li>
              <li>During the year, Investor Ltd. sold inventory worth <strong>₹1,00,000</strong> to Associate Ltd.</li>
              <li>The sales were made at a profit markup of <strong>25% on cost</strong>.</li>
              <li>At the year-end, 50% of this inventory (invoice value = <strong>₹50,000</strong>) remains unsold with Associate Ltd.</li>
            </ul>
            <p className="mt-2"><strong>Issue:</strong> Calculate the unrealized profit to be eliminated. <PdfRefInline page={10} /></p>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div className="space-y-3 font-mono text-xs p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>Step 1: Compute total unrealized profit in unsold inventory</strong></p>
            <p>Markup = 25% on cost = 20% on invoice price (25 / 125 = 20%).</p>
            <p>Unsold inventory invoice value = ₹50,000.</p>
            <p>Total unrealized profit = ₹50,000 × 20% = <strong>₹10,000</strong>.</p>
            
            <p className="mt-2"><strong>Step 2: Calculate Investor\'s share of unrealized profit to eliminate</strong></p>
            <p>Under AS 23, unrealized profits are eliminated only to the extent of the investor\'s interest in the associate.</p>
            <p>Investor share to eliminate = ₹10,000 × 25% = <strong>₹2,500</strong>.</p>
          </div>
        )
      },
      {
        title: 'Consolidation Verdict',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Consolidation Adjustments:</strong></p>
            <p>The ₹2,500 unrealized profit is eliminated by reducing the consolidated profit (reserves) and reducing the carrying value of the investment in associate:</p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono">
              <p>Consolidated P&amp;L A/c .................... Dr. ₹2,500</p>
              <p>&nbsp;&nbsp;To Investment in Associate A/c ............... Cr. ₹2,500</p>
            </div>
          </div>
        )
      }
    ],
    examFocus: 'Unlike subsidiary consolidation (where 100% of unrealized profit is eliminated), for associates you only eliminate the investor\'s proportionate share of unrealized profit. The remainder is considered realized by outside parties.',
    examFocusType: 'concept'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-23-1',
    title: 'Business Case — Impairment of Investment in Associate',
    category: 'Business Application Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> RetailCorp Ltd. holds a 22% stake in Associate Shipping Ltd. The carrying value of this investment in the CFS is <strong>₹15,00,000</strong> as of 31st March 20X2.</p>
            <p><strong>Business Condition:</strong> Due to a global shipping crisis, Associate Shipping Ltd.\'s share prices have crashed and it has shut down several routes. The recoverable amount of the investment is estimated to be only <strong>₹9,00,000</strong>.</p>
            <p><strong>Issue:</strong> How should this impairment be accounted for under AS 23?</p>
          </div>
        )
      },
      {
        title: 'AS 23 Analysis & Verdict',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Rule (Para 16):</strong> The carrying amount of an investment in an associate should be reduced to recognise a decline, other than temporary, in the value of the investment, such reduction being determined and made for each investment individually. </p>
            <p><strong>Verdict:</strong> The shipping crisis and closed routes indicate that the decline in value is other than temporary. The company must write down the investment carrying value from ₹15,00,000 to ₹9,00,000, charging the impairment loss of <strong>₹6,00,000</strong> to the Consolidated Profit &amp; Loss statement.</p>
          </div>
        )
      }
    ],
    examFocus: 'Verify that the write-down is made in the Consolidated Financial Statements. In separate financial statements, the investment is carried at cost less permanent diminution as per AS 13, which may require a different impairment test.',
    examFocusType: 'focus'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-23-1',
    title: 'Audit Case — Equity Method vs Cost Method in Separate Financial Statements',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Parent India Ltd. holds a 25% stake in Associate Software Ltd. In its separate financial statements for the year ended 31st March 20X2, the company accounts for this investment using the equity method (carrying value = ₹8,50,000) instead of the cost method (cost = ₹5,00,000).</p>
            <p><strong>Auditor Position:</strong> The auditor issues a qualified opinion, stating that the equity method is strictly prohibited in separate financial statements under Indian GAAP.</p>
          </div>
        )
      },
      {
        title: 'Audit Analysis & Verdict',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Reference:</strong> AS 23 (Paragraph 4) states that an investor should apply the equity method in its consolidated financial statements. In its separate financial statements, the investment should be accounted for in accordance with AS 13 "Accounting for Investments" (i.e. at cost less permanent diminution). <PdfRefInline page={1} /></p>
            <p><strong>Verdict:</strong> The auditor is correct. The equity method cannot be used in separate financial statements. The investment must be carried at cost (₹5,00,000) in the separate balance sheet, and adjusted to the equity method carrying value (₹8,50,000) only in the consolidated financial statements.</p>
          </div>
        )
      }
    ],
    examFocus: 'This is a very common exam query. Equity method = Consolidated accounts ONLY. Cost method (AS 13) = Separate accounts.',
    examFocusType: 'trap'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-23-1',
    title: 'Regulatory Observation — Presumption of Significant Influence (The 20% Threshold)',
    category: 'Regulatory Observation',
    panels: [
      {
        title: 'Regulatory Guideline',
        content: (
          <div>
            <p>Under AS 23, significant influence is presumed to exist when an investor holds, directly or indirectly through subsidiaries, **20% or more of the voting power** of the investee. <PdfRefInline page={2} /></p>
            <p><strong>Exceptions:</strong> If it can be clearly demonstrated that the investor does not have significant influence despite owning 20% or more, the investment is not classified as an associate. Conversely, significant influence can exist with less than 20% ownership if it is clearly demonstrated (e.g. through board representation or supply agreements).</p>
          </div>
        )
      },
      {
        title: 'Verification steps for Auditors',
        content: (
          <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
            <li>Verify the total voting shares and calculate the direct/indirect voting percentage.</li>
            <li>If shareholding is &lt; 20% but treated as an associate, review the board minutes to confirm the investor has nominated a director on the board of the associate.</li>
          </ul>
        )
      }
    ],
    examFocus: 'Do not look only at the 20% limit. Look at indicators of significant influence: board representation, policy participation, material transactions, interchange of personnel, or provision of technical info.',
    examFocusType: 'concept'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'court-23-1',
    title: 'Judicial Case — Significant Influence through Shareholders\' Agreement',
    category: 'Landmark Precedent',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Delta Capital Ltd. holds 15% of the shares of Shipyards India Ltd. However, under a shareholders\' agreement, Delta Capital has the right to nominate one director on the board and has veto rights over major capital expenditure decisions.</p>
            <p><strong>Dispute:</strong> Regulators argue that because the ownership is below 20%, Delta Capital cannot classify Shipyards India Ltd. as an associate.</p>
          </div>
        )
      },
      {
        title: 'Legal Verdict',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Rule (Para 6):</strong> Significant influence can be clearly demonstrated by representation on the board of directors, participation in policy-making, or material transactions. <PdfRefInline page={2} /></p>
            <p><strong>Verdict:</strong> The company is correct. Delta Capital\'s board seat and capital veto rights clearly demonstrate the power to participate in financial/operating decisions. This constitutes significant influence under AS 23, making the investment an associate despite the 15% stake.</p>
          </div>
        )
      }
    ],
    examFocus: 'If a question has less than 20% shareholding but has board seats or veto power, classify it as an associate and apply the equity method in CFS.',
    examFocusType: 'adjustment'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-23-1',
    title: 'Exam Corner — Step-by-Step Associate Carrying Value Adjustments',
    category: 'Exam Corner',
    panels: [
      {
        title: 'Summary of Adjustments',
        content: (
          <div className="space-y-2 text-xs font-mono">
            <p><strong>Investment Carrying Value = Cost + Share of profits - Dividends - Impairment</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Initial Cost:</strong> ₹5,00,000</li>
              <li><strong>Share of Capital profits:</strong> Embedded in cost (determines Goodwill/Capital Reserve).</li>
              <li><strong>Share of Revenue profits:</strong> Added to carrying value and credited to Consolidated P&amp;L.</li>
              <li><strong>Dividends received:</strong> Deducted from carrying value.</li>
              <li><strong>Impairment:</strong> Deducted from carrying value and charged to Consolidated P&amp;L.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Remember that when calculating the share of profits of the associate, you must adjust the associate\'s profits for depreciating any fair value adjustments made at the time of acquisition.',
    examFocusType: 'adjustment'
  }
]
