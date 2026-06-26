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
    className="inline-flex items-center justify-center w-4 h-4 mx-1 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-655 dark:text-red-400 rounded transition-all cursor-pointer select-none align-middle"
    title={`Open ICAI AS 21 PDF — Page ${page}`}
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
    id: 'illus-21-1',
    title: 'ICAI Illustration 1 — Goodwill on Consolidation vs Capital Reserve on Consolidation',
    category: 'Official ICAI Illustration',
    pdfPage: 12,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario A — Goodwill on Consolidation:</strong></p>
            <p>Alpha Ltd. acquires 80% of Beta Ltd. for ₹8,00,00,000. At the date of acquisition, Beta's net identifiable assets (at fair value) = ₹8,50,00,000.</p>
            <p className="mt-2"><strong>Scenario B — Capital Reserve on Consolidation:</strong></p>
            <p>Gamma Ltd. acquires 75% of Delta Ltd. for ₹6,00,00,000. Delta's net identifiable assets (at fair value) = ₹9,20,00,000.</p>
          </div>
        )
      },
      {
        title: 'Goodwill Computation (Scenario A)',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p><strong>Cost of Investment:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹8,00,00,000</strong></p>
            <p>Less: Share in Net Identifiable Assets:</p>
            <p>&nbsp;&nbsp;&nbsp;80% × ₹8,50,00,000 =&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(₹6,80,00,000)</p>
            <p className="font-bold">Goodwill on Consolidation:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹1,20,00,000</p>
            <p className="font-sans mt-2">Goodwill is shown as an asset in CFS. Amortized per AS 14/26 or tested annually.</p>
          </div>
        )
      },
      {
        title: 'Capital Reserve (Scenario B)',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p><strong>Cost of Investment:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹6,00,00,000</strong></p>
            <p>Less: Share in Net Identifiable Assets:</p>
            <p>&nbsp;&nbsp;&nbsp;75% × ₹9,20,00,000 =&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(₹6,90,00,000)</p>
            <p className="font-bold">Capital Reserve on Consolidation:&nbsp;&nbsp;&nbsp;₹90,00,000</p>
            <p className="font-sans mt-2">Capital reserve arises when parent paid LESS than its share in net assets (bargain purchase). Shown as a reserve in equity in CFS.</p>
          </div>
        )
      },
      {
        title: 'Minority Interest Calculation',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Minority Interest (MI) = Non-controlling shareholders' share in net assets at acquisition date</strong></p>
            <p>Scenario A: MI = 20% × ₹8,50,00,000 = <strong>₹1,70,00,000</strong></p>
            <p>Scenario B: MI = 25% × ₹9,20,00,000 = <strong>₹2,30,00,000</strong></p>
            <p className="mt-2">MI is presented as a separate component of equity in the consolidated balance sheet — neither as a liability nor as part of the parent's equity.</p>
            <p>MI in P&amp;L = MI % × Subsidiary's net profit for the year.</p>
          </div>
        )
      }
    ],
    examFocus: 'Goodwill on consolidation = Cost of investment MINUS share in net identifiable assets. If negative (rare), it is Capital Reserve. Both are computed at acquisition date values only.',
    examFocusType: 'trap'
  },
  {
    id: 'illus-21-2',
    title: 'ICAI Illustration 2 — Elimination of Intra-Group Transactions: Unrealized Profit on Inventory',
    category: 'Official ICAI Illustration',
    pdfPage: 18,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Parent:</strong> Alpha Ltd. (100% holding in Beta Ltd.)</p>
            <p>During FY 2023-24, Alpha sold goods to Beta for ₹50,00,000 at cost + 25% markup. Beta holds ₹20,00,000 of these goods in closing inventory (at transfer price).</p>
            <p className="mt-2">Alpha's cost of goods sold to Beta = ₹50,00,000 ÷ 1.25 = ₹40,00,000. Profit = ₹10,00,000.</p>
            <p>Unrealized profit in Beta's closing inventory = 20/50 × ₹10,00,000 = <strong>₹4,00,000</strong></p>
          </div>
        )
      },
      {
        title: 'Consolidation Elimination Entries',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p className="font-sans font-bold">Step 1: Eliminate Intra-group Revenue and COGS</p>
            <p>Dr. Sales (Alpha)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹50,00,000</p>
            <p>&nbsp;&nbsp;Cr. Cost of Goods Sold (Beta)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹50,00,000</p>
            <p className="font-sans font-bold mt-2">Step 2: Eliminate Unrealized Profit in Inventory</p>
            <p>Dr. Cost of Goods Sold (P&amp;L)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹4,00,000</p>
            <p>&nbsp;&nbsp;Cr. Inventory (B/S)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹4,00,000</p>
            <p className="font-sans mt-2">(Inventory shown at original cost to the group, not transfer price)</p>
          </div>
        )
      },
      {
        title: 'Effect on CFS',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>After elimination:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Revenue reduced by ₹50 lakhs (inter-company sale removed)</li>
              <li>Inventory reduced by ₹4 lakhs (shown at group cost, not Beta's purchase price)</li>
              <li>Consolidated PAT reduced by ₹4 lakhs (unrealized profit deducted)</li>
            </ul>
            <p className="mt-2">When Beta sells these goods to external customers, the profit is then "realized" from the group's perspective — the elimination reverses automatically in the next year's consolidation.</p>
          </div>
        )
      }
    ],
    examFocus: 'Intra-group sales must be eliminated in full (100%) regardless of the minority interest percentage. The unrealized profit reduction also flows through minority interest proportionately only when the subsidiary is the seller.',
    examFocusType: 'trick'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-21-1',
    title: 'Business Case — Step Acquisition: Consolidating a Previously Equity-Accounted Investment',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Group Ltd.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>01 Apr 2022: Zenith acquired 30% in Sunrise Ltd. for ₹6,00,00,000 (accounted as associate under equity method).</li>
              <li>01 Oct 2023: Zenith acquired additional 25% for ₹4,50,00,000 → Total holding = 55% → Sunrise becomes a subsidiary.</li>
              <li>Sunrise's net identifiable assets at 01 Oct 2023 (fair value) = ₹18,00,00,000.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Consolidation Trigger',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>When Zenith crosses the 50% threshold (going from 30% to 55%), Sunrise becomes a subsidiary. From 01 Oct 2023, Zenith must:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Cease equity method accounting for Sunrise</li>
              <li>Commence full consolidation of Sunrise</li>
              <li>Re-measure the previously held 30% interest to fair value at the acquisition date</li>
            </ol>
          </div>
        )
      },
      {
        title: 'Goodwill Computation at Step Acquisition',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p><strong>Total Consideration:</strong></p>
            <p>Previously held 30% at fair value on 01 Oct 2023:&nbsp;&nbsp;₹5,40,00,000</p>
            <p>New 25% acquisition cost:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹4,50,00,000</p>
            <p className="font-bold">Total Cost for 55%:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹9,90,00,000</p>
            <p>55% of Net Identifiable Assets: 55% × ₹18Cr:&nbsp;(₹9,90,00,000)</p>
            <p className="font-bold">Goodwill on Consolidation:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nil</p>
          </div>
        )
      },
      {
        title: 'Minority Interest at Step Acquisition',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Minority Interest = 45% × ₹18,00,00,000 = <strong>₹8,10,00,000</strong></p>
            <p>This is recognized in the consolidated balance sheet as a separate component of equity from 01 Oct 2023.</p>
          </div>
        )
      }
    ],
    examFocus: 'In a step acquisition, when control is obtained, the previously held interest is re-measured at fair value at the acquisition date. Any gain/loss on re-measurement goes through P&L.',
    examFocusType: 'adjustment'
  },
  {
    id: 'case-21-2',
    title: 'Business Case — Different Reporting Dates of Parent and Subsidiary (3-Month Rule)',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Parent:</strong> Alpha Ltd. (Year-end: 31 March 2024)</p>
            <p><strong>Subsidiary:</strong> Beta LLC (incorporated in the US; Year-end: 31 December 2023)</p>
            <p>The parent has a March year-end but the subsidiary files its accounts to December. The gap between reporting dates is 3 months.</p>
          </div>
        )
      },
      {
        title: 'AS 21 Three-Month Rule (Para 15)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 15: If the financial statements of the subsidiary used in preparation of CFS are drawn to a date different from the parent's date, adjustments must be made for the effects of significant transactions or events that occur between those dates.</p>
            <p>If the difference in dates is <strong>3 months or less</strong>: Permitted to use subsidiary's existing financial statements with adjustments for material intervening transactions.</p>
            <p>If the difference is <strong>more than 3 months</strong>: The subsidiary must prepare financial statements as of the parent's date.</p>
            <p className="mt-2"><strong>For Alpha-Beta:</strong> 3-month gap is just within the limit. Alpha may use Beta's Dec 2023 accounts BUT must adjust for material January–March 2024 transactions (dividends declared, major acquisitions, large loans, etc.).</p>
          </div>
        )
      },
      {
        title: 'Disclosure Required',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>When different dates are used, CFS must disclose:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The fact that different reporting dates were used</li>
              <li>The date up to which the subsidiary's financial statements are drawn</li>
              <li>Description of material events/transactions adjusted for in the intervening period</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Different reporting dates are allowed only if the gap is 3 months or less. Beyond 3 months, the subsidiary must prepare statements at the parent\'s date.',
    examFocusType: 'concept'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-21-1',
    title: 'Audit Case Study — Exclusion of Loss-Making Subsidiary from Consolidation (Invalid Exclusion)',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> Zenith Group's consolidated financial statements exclude Zenith Retail Ltd. (a wholly-owned subsidiary) on the grounds that it is loss-making and its inclusion would "distort the group's financial position."</p>
            <p className="mt-2">The management claims this is within the permissible exclusions under AS 21.</p>
          </div>
        )
      },
      {
        title: 'AS 21 Permissible Exclusions (Para 11)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>AS 21 allows exclusion of a subsidiary from consolidation only in TWO situations:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Held for disposal within 12 months:</strong> Interest acquired and held exclusively with a view to disposal within 12 months of acquisition.</li>
              <li><strong>Severe long-term restrictions:</strong> Operates under severe long-term restrictions that significantly impair ability to transfer funds to the parent.</li>
            </ol>
            <p className="mt-2"><strong>"Loss-making"</strong> is NOT a valid reason for exclusion. Even a heavily loss-making subsidiary must be consolidated. Excluding a loss-maker to boost consolidated profits is a misstatement.</p>
          </div>
        )
      },
      {
        title: 'Auditor Actions & Report',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The auditor must:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Require management to include Zenith Retail Ltd. in the consolidated financial statements</li>
              <li>If management refuses: Issue a <strong>qualified or adverse opinion</strong> specifically citing non-compliance with AS 21</li>
              <li>Quantify the impact of the exclusion on consolidated net assets and net profit</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Loss-making status is NOT a valid ground for excluding a subsidiary from consolidation. Only "held for disposal within 12 months" and "severe long-term restrictions" are valid exclusions.',
    examFocusType: 'trap'
  },
  {
    id: 'audit-21-2',
    title: 'Audit Case Study 2 — Pre-acquisition vs Post-acquisition Dividend Elimination',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'The Issue',
        content: (
          <div>
            <p><strong>Scenario:</strong> Parent Zenith Ltd. received a dividend of ₹15,00,000 from subsidiary Retail Ltd. in October 2023. Retail Ltd. paid this out of its accumulated profits of the financial year 2022-23. Zenith Ltd. acquired Retail Ltd. on April 1, 2023.</p>
            <p className="mt-2">Zenith's accountant credited this dividend to the Standalone Statement of Profit &amp; Loss as dividend income.</p>
          </div>
        )
      },
      {
        title: 'AS 21 & AS 13 Dividend Rules',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>1. **Pre-Acquisition Profit Dividend:** Since the dividend relates to profits accumulated prior to acquisition (FY 2022-23), it is a recovery of investment cost.</p>
            <p>2. **Standalone Treatment:** Zenith must debit Bank and **credit Investment in Retail Ltd.** (not P&amp;L) in Standalone books. Crediting P&amp;L is a violation of AS 13.</p>
            <p>3. **Consolidation Effect:** The dividend paid is eliminated in full against parent's investment and minority interest. Any incorrect standalone credit to P&amp;L must be adjusted by reducing Standalone Profit and reducing cost of investment prior to consolidated Goodwill calculation.</p>
          </div>
        )
      }
    ],
    examFocus: 'Dividends out of pre-acquisition profits reduce cost of investment. They are never credited to standalone or consolidated profit and loss.',
    examFocusType: 'adjustment'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-21-1',
    title: 'SEBI Observation — SPE/SPV Consolidation and Off-Balance Sheet Structures',
    category: 'Regulatory Observations',
    panels: [
      {
        title: 'Regulatory Issue',
        content: (
          <div>
            <p><strong>SEBI Finding:</strong> Listed companies were using Special Purpose Entities (SPEs/SPVs) to keep liabilities off the consolidated balance sheet by structuring SPEs so that formal voting power was below 50%, while retaining economic control.</p>
          </div>
        )
      },
      {
        title: 'AS 21 Control Principle',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>AS 21 Para 4 defines control as ownership of more than half of the voting power OR control of the composition of the Board of Directors. However, substance over form applies:</p>
            <p>SEBI directed that SPEs/SPVs where the listed company:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Bears the majority of risks/rewards of the SPE's activities</li>
              <li>Has decision-making power over key activities</li>
              <li>Retains residual interest</li>
            </ul>
            <p>...must be consolidated even if formal voting power is below 50%.</p>
          </div>
        )
      },
      {
        title: 'Audit Implication',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Auditors must assess the <strong>substance</strong> of relationships with entities, not just formal legal structure. Off-balance sheet financing through SPEs that are de facto controlled by the parent must be brought into the consolidated financial statements.</p>
          </div>
        )
      }
    ],
    examFocus: 'Control under AS 21 is based on SUBSTANCE, not just formal voting power. De facto control through risk-bearing or decision-making power requires consolidation.',
    examFocusType: 'focus'
  },
  {
    id: 'reg-21-2',
    title: 'Regulatory Observation 2 — Cessation of Consolidation: Subsidiaries entering Insolvency (CIRP)',
    category: 'Regulatory Observations',
    panels: [
      {
        title: 'IBC & Loss of Control',
        content: (
          <div>
            <p><strong>The Context:</strong> Under the Insolvency and Bankruptcy Code (IBC), once a subsidiary is admitted into the Corporate Insolvency Resolution Process (CIRP), the Board of Directors is suspended, and control is transferred to the Insolvency Resolution Professional (IRP/RP).</p>
          </div>
        )
      },
      {
        title: 'AS 21 De-consolidation Rule (Para 11)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 11: A subsidiary should be excluded from consolidation when control is intended to be temporary because it is acquired/held for disposal, OR when it operates under severe long-term restrictions.</p>
            <p className="mt-2">**NFRA & SEBI Guidance:** Once CIRP starts, the parent company loses the power to govern the financial and operating policies of the subsidiary. Therefore, the parent **must cease consolidation** from the date CIRP is initiated and account for its investment under AS 13 (Investments) at cost, subject to impairment testing.</p>
          </div>
        )
      }
    ],
    examFocus: 'Entering CIRP is a loss of control. Parent must stop consolidating the subsidiary immediately and treat the investment under AS 13.',
    examFocusType: 'concept'
  }
];

// auditCases are defined above

export const judicialCases: CaseStudy[] = [
  {
    id: 'judicial-21-1',
    title: 'Case Principle — Uniform Accounting Policies in Consolidation (AS 21 Para 20)',
    category: 'Landmark Judicial Cases',
    panels: [
      {
        title: 'Principle & Background',
        content: (
          <div>
            <p>A common challenge in group consolidations: Parent uses SLM depreciation on PPE; subsidiary uses WDV depreciation. Or parent follows FIFO for inventory; subsidiary uses weighted average.</p>
          </div>
        )
      },
      {
        title: 'AS 21 Uniform Policy Requirement (Para 20)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 20: The consolidated financial statements should be prepared using uniform accounting policies for like transactions and events in similar circumstances. If it is not practicable to use uniform policies, that fact shall be disclosed along with the proportions of items in the CFS to which different accounting policies have been applied.</p>
            <p className="mt-2"><strong>Required Adjustment:</strong> If subsidiary uses WDV and parent uses SLM:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Restate subsidiary's depreciation to SLM basis before consolidation</li>
              <li>Adjust retained earnings and PPE net block accordingly</li>
            </ul>
            <p>If restatement is impracticable, disclose the policy differences and quantify the impact.</p>
          </div>
        )
      }
    ],
    examFocus: 'Uniform accounting policies are mandatory for consolidation. If subsidiary uses different policies, adjust before consolidating — or disclose and quantify if impracticable.',
    examFocusType: 'adjustment'
  }
];

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-21-1',
    title: 'Exam Corner — Consolidation Procedure Steps and Minority Interest Treatment',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'Consolidation Procedure Checklist',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p className="font-sans font-bold">Step-by-Step Consolidation:</p>
            <p>1. Identify subsidiaries (control &gt;50% voting power)</p>
            <p>2. Ensure uniform accounting policies across entities</p>
            <p>3. Aggregate (add line by line) all assets, liabilities, revenues, expenses</p>
            <p>4. Eliminate investment in subsidiary vs. parent's share of subsidiary equity</p>
            <p>5. Recognize Goodwill or Capital Reserve on consolidation</p>
            <p>6. Recognize Minority Interest (= MI% × subsidiary net assets)</p>
            <p>7. Eliminate all intra-group balances (loans, debtors/creditors)</p>
            <p>8. Eliminate all intra-group transactions (sales, interest, dividends)</p>
            <p>9. Eliminate unrealized profits in closing inventory and fixed assets</p>
            <p>10. Allocate MI share of profit/loss separately in CFS P&amp;L</p>
          </div>
        )
      },
      {
        title: 'Minority Interest: Common Exam Points',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <ul className="list-disc pl-5 space-y-1">
              <li>MI is presented in equity in the B/S — NOT as a liability or mezzanine.</li>
              <li>MI in P&amp;L = MI% × subsidiary's net profit for the year.</li>
              <li>If subsidiary makes a loss and MI's share of loss exceeds its equity, the excess is absorbed by the parent (not ignored).</li>
              <li>MI is calculated on NET ASSETS at acquisition, then updated for post-acquisition changes each year.</li>
              <li>When parent acquires more shares from minority, no new goodwill — it's treated as equity transaction.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Minority Interest is part of EQUITY in the consolidated balance sheet — not a liability. This was the single biggest change when India adopted Schedule III format for CFS.',
    examFocusType: 'concept'
  },
  {
    id: 'exam-21-2',
    title: 'Exam Corner 2 — Goodwill & Minority Interest with Asset Revaluation',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'Revaluation Surplus Concept',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>If subsidiary's assets are revalued on the date of acquisition, the **Revaluation Profit/Loss** is treated as a **capital profit**.</p>
            <p>This revaluation profit must be added to the subsidiary's share capital and reserves to compute the **Net Worth** (equity) on the acquisition date. Both Goodwill/Capital Reserve and Minority Interest will be computed on this adjusted Net Worth.</p>
          </div>
        )
      },
      {
        title: 'Practical Calculation Example',
        content: (
          <div className="space-y-2 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>Facts:</strong> Parent H Ltd. acquires 80% shares of S Ltd. on April 1, 2023 for ₹8,00,000.</p>
            <p>S Ltd. Share Capital = ₹5,00,000; Reserves = ₹3,00,000.</p>
            <p>On acquisition date, S Ltd.'s land is revalued upwards by ₹1,00,000.</p>
            <p><strong>Calculations:</strong></p>
            <p>1. Total Net Worth of S Ltd = Share Capital (₹5,00,000) + Reserves (₹3,00,000) + Revaluation Surplus (₹1,00,000) = <strong>₹9,00,000</strong></p>
            <p>2. Parent's Share of Net Worth (80%) = 80% × ₹9,00,000 = <strong>₹7,20,000</strong></p>
            <p>3. **Goodwill on Consolidation** = Cost of Investment (₹8,00,000) − Parent's Share of Net Worth (₹7,20,000) = <strong>₹80,000</strong></p>
            <p>4. **Minority Interest** = 20% × Total Net Worth (₹9,00,000) = <strong>₹1,80,000</strong></p>
          </div>
        )
      }
    ],
    examFocus: 'Do not forget to allocate the revaluation surplus between the parent (reduces Goodwill) and the minority interest (increases MI). Both must be done.',
    examFocusType: 'trick'
  }
]
