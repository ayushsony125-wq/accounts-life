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
    title={`Open ICAI AS 21 PDF — Page ${page}`}
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
    id: 'illus-21-1',
    title: 'ICAI Illustration 1 — Cost of Control (Calculation of Goodwill vs Capital Reserve)',
    category: 'Official ICAI Illustration',
    pdfPage: 12,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity details:</strong> Holding Ltd. acquires 80% shares of Subsidiary Ltd. on 1st April 20X1:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Cost of Investment paid by Holding Ltd. = <strong>₹12,00,000</strong>.</li>
              <li>Equity Share Capital of Subsidiary Ltd. = <strong>₹10,00,000</strong> (1,00,000 shares of ₹10 each).</li>
              <li>General Reserve of Subsidiary Ltd. on acquisition date = <strong>₹3,00,000</strong>.</li>
              <li>Profit &amp; Loss A/c balance of Subsidiary Ltd. on acquisition date = <strong>₹1,00,000</strong>.</li>
            </ul>
            <p className="mt-2"><strong>Issue:</strong> Compute the Cost of Control (Goodwill or Capital Reserve) and Minority Interest on the acquisition date. <PdfRefInline page={12} /></p>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div className="space-y-3 font-mono text-xs p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>Step 1: Compute Net Worth of Subsidiary on Acquisition Date</strong></p>
            <p>Net Worth = Share Capital + Reserves + P&amp;L = ₹10,00,000 + ₹3,00,000 + ₹1,00,000 = <strong>₹14,00,000</strong></p>
            
            <p className="mt-2"><strong>Step 2: Calculate Holding Company Share (80%) of Net Worth</strong></p>
            <p>Holding Share = ₹14,00,000 × 80% = <strong>₹11,20,000</strong></p>
            
            <p className="mt-2"><strong>Step 3: Compute Goodwill / Capital Reserve (Cost of Control)</strong></p>
            <p>Goodwill / (Capital Reserve) = Cost of Investment - Holding Share of Net Worth</p>
            <p>Cost of Investment = ₹12,00,000</p>
            <p>Holding Share = ₹11,20,000</p>
            <p>Excess paid = ₹12,00,000 - ₹11,20,000 = <strong>₹80,00,00 (Goodwill)</strong></p>
            
            <p className="mt-2"><strong>Step 4: Calculate Minority Interest (20%)</strong></p>
            <p>Minority Interest = Net Worth × 20% = ₹14,00,000 × 20% = <strong>₹2,80,000</strong></p>
          </div>
        )
      },
      {
        title: 'AS 21 Audit Verification',
        content: (
          <div className="space-y-2">
            <p><strong>Cost of Control verification:</strong></p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Verify the share purchase agreement to confirm the acquisition date and 80% ownership.</li>
              <li>Reconcile the Subsidiary's net assets as of the acquisition date (verifying audited balance sheet on 1st April 20X1).</li>
              <li>Confirm that Goodwill is presented under Non-Current Assets, and any Capital Reserve is presented under Reserves and Surplus.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Goodwill/Capital Reserve must be computed as of the exact date of acquisition. Any reserve accumulated after the date of acquisition is treated as a revenue reserve, and must not be adjusted against the cost of control.',
    examFocusType: 'focus'
  },
  {
    id: 'illus-21-2',
    title: 'ICAI Illustration 2 — Elimination of Unrealized Profit on Intra-Group Stock Sales',
    category: 'Official ICAI Illustration',
    pdfPage: 24,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Transaction details:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Holding Ltd. owns 75% of Subsidiary Ltd.</li>
              <li>During the year, Subsidiary Ltd. sold goods worth <strong>₹2,00,000</strong> to Holding Ltd.</li>
              <li>The goods were sold at a markup of <strong>25% on cost</strong>.</li>
              <li>At the year-end, 40% of these goods (invoice value = <strong>₹80,000</strong>) remain unsold in Holding Ltd.\'s inventory.</li>
            </ul>
            <p className="mt-2"><strong>Issue:</strong> Determine the amount of unrealized profit to be eliminated and draft the consolidation adjustment. <PdfRefInline page={24} /></p>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div className="space-y-3 font-mono text-xs p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>Step 1: Compute cost and profit margin of unsold inventory</strong></p>
            <p>Markup = 25% on cost = 20% on invoice price (25 / 125 = 1/5 = 20%).</p>
            <p>Unsold inventory invoice value = ₹80,000.</p>
            <p>Unrealized Profit = ₹80,000 × 20% = <strong>₹16,000</strong>.</p>
            
            <p className="mt-2"><strong>Step 2: Allocate elimination impact</strong></p>
            <p>Since the seller is the Subsidiary (Upstream transaction), the profit of the subsidiary is overstated. The ₹16,000 profit elimination must be apportioned between the Group (75%) and Minority Interest (25%):</p>
            <p>&nbsp;&nbsp;• Group share = ₹16,000 × 75% = ₹12,000</p>
            <p>&nbsp;&nbsp;• Minority Interest share = ₹16,000 × 25% = ₹4,000</p>
          </div>
        )
      },
      {
        title: 'Consolidation Adjustments',
        content: (
          <div className="space-y-2">
            <p><strong>Consolidation Adjustment Entry (Upstream Transaction):</strong></p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono text-xs space-y-1">
              <p>Consolidated P&amp;L A/c (Group Share) ......... Dr. ₹12,000</p>
              <p>Minority Interest (Subsidiary Share) .......... Dr. ₹4,000</p>
              <p>&nbsp;&nbsp;To Consolidated Inventory A/c ................... Cr. ₹16,000</p>
              <p><i>(Being elimination of unrealized profit on unsold inventory at year-end)</i></p>
            </div>
          </div>
        )
      }
    ],
    examFocus: 'Distinguish between Downstream (Holding to Subsidiary) and Upstream (Subsidiary to Holding) sales. In downstream sales, the entire unrealized profit is deducted from Holding company reserves. In upstream sales, the profit elimination is shared between Holding and Minority Interest.',
    examFocusType: 'trap'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-21-1',
    title: 'Business Case — Non-Uniform Accounting Policies (Depreciation SLM vs WDV Adjustments)',
    category: 'Business Application Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Context:</strong> Holding Ltd. prepares its accounts using the <strong>Straight Line Method (SLM)</strong> for all machinery. Its subsidiary, Subsidiary Ltd., uses the <strong>Written Down Value (WDV)</strong> method for its plant and machinery.</p>
            <p><strong>Issue:</strong> Can Holding Ltd. consolidate the Subsidiary\'s financial statements directly without adjustments, or does AS 21 require uniform policies?</p>
          </div>
        )
      },
      {
        title: 'AS 21 Analysis & Solution',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Rule (Para 20-21):</strong> Consolidated financial statements should be prepared using uniform accounting policies for like transactions and other events in similar circumstances. If a member of the group uses accounting policies other than those adopted in the CFS, appropriate adjustments are made to its financial statements. <PdfRefInline page={20} /></p>
            <p><strong>Solution:</strong> The Subsidiary\'s fixed asset depreciation must be recalculated using the SLM method to match the Holding company\'s policy, and the resulting differences must be adjusted in consolidated reserves and assets during consolidation.</p>
          </div>
        )
      }
    ],
    examFocus: 'Uniform accounting policies are mandatory for consolidation. Adjustments must be made unless it is impracticable to do so. If impracticable, that fact must be disclosed along with the proportion of items to which different policies have been applied.',
    examFocusType: 'concept'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-21-1',
    title: 'Audit Case — Consolidation when Reporting Dates Differ (3-Month Gap Limitation)',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Parent India Ltd. has its financial year ending 31st March 20X2. Its foreign subsidiary, Sub-UK Ltd., has its financial year ending 31st December 20X1.</p>
            <p><strong>Audit Dispute:</strong> The Parent company consolidates the December 20X1 balance sheet of Sub-UK Ltd. directly without preparing interim accounts for March. The statutory auditor objects, saying a 3-month gap requires adjustment or special reporting.</p>
          </div>
        )
      },
      {
        title: 'Audit Analysis & Verdict',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Reference:</strong> AS 21 (Paragraph 22) permits consolidation using different reporting dates provided the difference is **not more than 6 months**. However, adjustments must be made for the effects of significant transactions or other events that occur between those dates. <PdfRefInline page={21} /></p>
            <p><strong>Verdict:</strong> Direct consolidation of the 31st December accounts is permitted since the gap is 3 months (&lt; 6 months limit). However, the auditor must ensure that any significant transaction (e.g., major asset purchase, capital issue) in Sub-UK Ltd. during Jan-Mar 20X2 is adjusted or disclosed in the CFS.</p>
          </div>
        )
      }
    ],
    examFocus: 'Remember the 6-month limit. Under Ind AS, this limit is tighter (3 months), but under AS 21, different reporting dates can be used if the gap is up to 6 months, subject to adjustments for intermediate significant transactions.',
    examFocusType: 'focus'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-21-1',
    title: 'Regulatory Observation — Temporary Exemption from Consolidation (Held for Disposal)',
    category: 'Regulatory Observation',
    panels: [
      {
        title: 'Regulatory Rule',
        content: (
          <div>
            <p>Under AS 21, a subsidiary should be excluded from consolidation when:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
              <li>Control is intended to be **temporary** because the subsidiary is acquired and held exclusively with a view to its subsequent disposal in the near future. <PdfRefInline page={10} /></li>
              <li>It operates under severe long-term restrictions which significantly impair its ability to transfer funds to the parent.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Verification Checklist',
        content: (
          <div className="space-y-2 text-xs">
            <p>1. Check if the parent company has a documented plan to sell the subsidiary within 12 months of acquisition.</p>
            <p>2. Verify if the subsidiary is classified as "held for sale" under relevant standards.</p>
            <p>3. If control is temporary, verify that the investment is accounted for as a current investment at lower of cost and fair value under AS 13.</p>
          </div>
        )
      }
    ],
    examFocus: 'Do not consolidate a subsidiary that is held for temporary disposal. Ensure it is treated as a temporary investment in accordance with AS 13.',
    examFocusType: 'trap'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'court-21-1',
    title: 'Judicial Case — Definition of Control through Composition of Board',
    category: 'Landmark Precedent',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> PowerGrid Ltd. holds 45% of the voting shares of SubStation Ltd. However, under a shareholders\' agreement, PowerGrid Ltd. has the unilateral right to appoint 5 out of 8 directors on SubStation\'s Board.</p>
            <p><strong>Legal dispute:</strong> The company argues it does not need to consolidate SubStation Ltd. because its ownership is less than 50%.</p>
          </div>
        )
      },
      {
        title: 'Legal Verdict',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Rule (Para 3):</strong> A parent-subsidiary relationship exists when the parent owns more than half of the voting power, **OR** controls the composition of the board of directors (meaning it has power to appoint or remove all or majority of directors). <PdfRefInline page={3} /></p>
            <p><strong>Verdict:</strong> Consolidation is mandatory. PowerGrid Ltd. controls the board composition (5 out of 8 directors), which constitutes "control" under AS 21, making SubStation Ltd. a subsidiary despite the 45% shareholding.</p>
          </div>
        )
      }
    ],
    examFocus: 'Control can be established through voting power or board composition. Always check both conditions in exam questions before concluding whether consolidation is required.',
    examFocusType: 'concept'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-21-1',
    title: 'Exam Corner — Step-by-Step Comprehensive Consolidated Balance Sheet Preparation',
    category: 'Exam Corner',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Consolidation Problem Layout:</strong></p>
            <p>To prepare a Consolidated Balance Sheet, follow this exact 5-step sequence in examinations:</p>
            <ul className="list-decimal pl-5 mt-2 space-y-1 text-xs">
              <li><strong>Step 1:</strong> Determine the shareholding ratio (Holding % vs Minority %).</li>
              <li><strong>Step 2:</strong> Apportion Subsidiary\'s profits into pre-acquisition (capital) and post-acquisition (revenue) reserves.</li>
              <li><strong>Step 3:</strong> Calculate Minority Interest (Share capital + Share of capital profits + Share of revenue profits).</li>
              <li><strong>Step 4:</strong> Compute Cost of Control (Investment cost compared to share of capital profits).</li>
              <li><strong>Step 5:</strong> Aggregate like assets and liabilities, eliminating intra-group balances and unrealized profits.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Do not mix capital and revenue profits. Capital profits are adjusted in the Cost of Control (reducing Goodwill or creating Capital Reserve). Revenue profits are added to the Group Consolidated Reserves.',
    examFocusType: 'adjustment'
  }
]
