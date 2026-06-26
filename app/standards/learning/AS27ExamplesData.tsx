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
    title={`Open ICAI AS 27 PDF — Page ${page}`}
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
    id: 'illus-27-1',
    title: 'ICAI Illustration 1 — Jointly Controlled Operations (JCO): Construction of Flats',
    category: 'Official ICAI Illustration',
    pdfPage: 7,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Venturers:</strong> Mr. A, Mr. B, and Mr. C enter a JCO to purchase land, construct, and sell flats:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Mr. A: Purchases land for <strong>₹60,00,000</strong> using a bank loan of <strong>₹50,00,000 @ 8% p.a.</strong>, registers land for <strong>₹60,000</strong>.</li>
              <li>Mr. B: Supplies materials of <strong>₹4,50,000</strong> from his godown and purchases extra materials for <strong>₹5,00,000</strong>.</li>
              <li>Mr. C: Incurs labour and advertising expenses of <strong>₹9,00,000</strong>.</li>
              <li>Flats taken over on 30.06.20X1: Each venturer takes 1 flat valued at <strong>₹10,00,000</strong>.</li>
              <li>Flats sold: A sells for <strong>₹40,00,000</strong>, B sells for <strong>₹20,00,000</strong>, C sells for <strong>₹10,00,000</strong>.</li>
              <li>Loan repayment: Repaid on 30.06.20X1 with interest. Net profits are shared equally.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Draft P&L & Calculations',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Interest Calculation:</strong> ₹50,00,000 @ 8% for 6 months (01.01.20X1 to 30.06.20X1) = <strong>₹2,00,000</strong>.</p>
            <p><strong>Total Income:</strong> Sales (40L + 20L + 10L) = ₹70,00,000 + Flats Taken Over (3 * 10L) = ₹30,00,000. Total = <strong>₹1,00,00,000</strong>.</p>
            <p><strong>Total Expenses:</strong> Land (60L) + Registration (60k) + Materials (9.5L) + Misc (9L) + Interest (2L) = <strong>₹81,10,000</strong>.</p>
            <p><strong>Total Profit:</strong> ₹1,00,00,000 - ₹81,10,000 = <strong>₹18,90,000</strong>. Share of each = <strong>₹6,30,000</strong>.</p>
          </div>
        )
      },
      {
        title: 'Journal Entries & Settlement',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Cash Settlements:</strong></p>
            <p>In A's books, JV account shows debits of ₹62,60,000 (Land + Reg + Interest + Profit) and credits of ₹50,00,000 (Sales + Flat). Mr. B pays Mr. A <strong>₹14,20,000</strong>, and Mr. C pays Mr. A <strong>₹4,70,000</strong> to settle the accounts.</p>
          </div>
        )
      }
    ],
    examFocus: 'Do not create separate entity books. Each venturer records only their own transactions in their personal books, and settles the balances at the end through cash/bank transfer.',
    examFocusType: 'focus'
  },
  {
    id: 'illus-27-2',
    title: 'ICAI Illustration 2 — Jointly Controlled Assets (JCA): Gas Pipeline Construction',
    category: 'Official ICAI Illustration',
    pdfPage: 11,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entities:</strong> A Ltd., B Ltd., and C Ltd. jointly construct a pipeline to transport gas:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Buildings: <strong>₹12,00,000</strong> (depreciated @ 5% p.a.).</li>
              <li>Pipeline: <strong>₹60,00,000</strong> (depreciated @ 15% p.a.).</li>
              <li>Computers: <strong>₹3,00,000</strong> (depreciated @ 40% p.a.).</li>
              <li>Vehicles: <strong>₹9,00,000</strong> (depreciated @ 20% p.a.).</li>
              <li>Maintenance cost: <strong>₹6,00,000</strong> per year shared equally (₹2,00,000 each).</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Venturer Financial Statement Extract',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>In A Ltd.\'s Balance Sheet (Share of Assets):</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Buildings: ₹4,00,000 - Depr. (₹20,000) = <strong>₹3,80,000</strong>.</li>
              <li>Pipeline: ₹20,00,000 - Depr. (₹3,00,000) = <strong>₹17,00,000</strong>.</li>
              <li>Computers: ₹1,00,000 - Depr. (₹40,005) = <strong>₹60,000</strong>.</li>
              <li>Vehicles: ₹3,00,000 - Depr. (₹60,000) = <strong>₹2,40,000</strong>.</li>
              <li>Total Property, Plant &amp; Equipment = <strong>₹23,80,000</strong>.</li>
            </ul>
            <p><strong>In P&amp;L:</strong> Depreciation = <strong>₹4,20,000</strong>; Pipeline Maintenance = <strong>₹2,00,000</strong>.</p>
          </div>
        )
      }
    ],
    examFocus: 'For jointly controlled assets, report only the venturer\'s fractional share of the assets (classified by asset category) and their share of common expenses in the financial statements.',
    examFocusType: 'concept'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'business-27-1',
    title: 'Jointly Controlled Entities (JCE) vs Associates: Control Assessment',
    category: 'Business Application Case',
    panels: [
      {
        title: 'Scenario',
        content: (
          <div>
            <p><strong>Case:</strong> Horizon Corp. and Zenith Ltd. form Apex Telecom Pvt. Ltd., each holding 50% shares. The Board has 4 directors: 2 appointed by Horizon, 2 by Zenith. The agreement requires unanimous consent of all directors for all key financial and operating decisions.</p>
            <p className="mt-2"><strong>Issue:</strong> Does Apex Telecom qualify as a JCE under AS 27 or an Associate under AS 23?</p>
          </div>
        )
      },
      {
        title: 'Analysis & Verdict',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Assessment:</strong> Because the agreement establishes <strong>joint control</strong> (unanimous consent for all key decisions), it is a Jointly Controlled Entity (JCE) under AS 27. If Horizon could make decisions unilaterally, or if it only required a simple majority and one partner held most board seats, it would be a subsidiary (AS 21) or an associate (AS 23) depending on the degree of influence.</p>
            <p><strong>Verdict:</strong> Classified as a JCE. Horizon must use the <strong>proportionate consolidation method</strong> in its Consolidated Financial Statements (CFS).</p>
          </div>
        )
      }
    ],
    examFocus: 'Joint control requires contractually agreed sharing of control. Significant influence (AS 23) is present when an investor can participate in but not control/jointly control decisions.',
    examFocusType: 'concept'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-27-1',
    title: 'Audit Program: Verifying Contractual Arrangement & Unrecorded Liabilities',
    category: 'Audit Checklist Case',
    panels: [
      {
        title: 'Audit Objectives',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Key Objectives:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Confirm that a formal contractual agreement exists (otherwise the entity cannot be accounted for under AS 27).</li>
              <li>Verify that all transactions between the venturer and the JV are properly recorded and profits are correctly eliminated.</li>
              <li>Check for unrecorded liabilities or contingent liabilities arising from venturer commitments or guarantees.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Audit Procedures & Checkpoints',
        content: (
          <div className="space-y-2 text-xs">
            <ul className="list-disc pl-5 space-y-1">
              <li>Review the joint venture agreement to evaluate the voting rights, profit sharing ratios, and dispute resolution mechanisms.</li>
              <li>Recalculate the line-by-line proportionate consolidation amounts and ensure they match the JV\'s audited financials.</li>
              <li>Examine the board minutes of both the venturer and the JV to detect any undisclosed guarantees or commitments.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Audit verification must ensure that the accounting policy of the JV matches that of the venturer. Any differences must be adjusted prior to proportionate consolidation.',
    examFocusType: 'focus'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-27-1',
    title: 'Regulatory Observation: severe Long-term Restrictions & Impairment',
    category: 'Regulatory Observation',
    panels: [
      {
        title: 'Scenario',
        content: (
          <div>
            <p><strong>Facts:</strong> JVR Limited has invested ₹97.84 crores in QSR Limited (a jointly controlled entity). QSR has suffered losses for 2 consecutive years. JVR wants to write down the investment value, but QSR argues that its future business plans are profitable.</p>
            <p className="mt-2"><strong>Rule:</strong> In the venturer\'s separate financial statements, the investment must be carried at cost under AS 13, unless there is a decline other than temporary.</p>
          </div>
        )
      },
      {
        title: 'Resolution',
        content: (
          <div className="space-y-2 text-xs">
            <p>Since QSR has futuristic and profitable projections, the decline is likely temporary. Diminution is not required unless the audit indicates the business model is unviable. However, if QSR operates under severe long-term restrictions that impair funds transfer, proportionate consolidation in CFS must be suspended, and the investment is carried under AS 13.</p>
          </div>
        )
      }
    ],
    examFocus: 'Proportionate consolidation is suspended if (a) the investment is temporary or (b) the JV operates under severe long-term restrictions. In such cases, account for it as an investment under AS 13.',
    examFocusType: 'adjustment'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'judicial-27-1',
    title: 'Landmark Precedents: Partnership vs Joint Venture for Tax and Accounting Control',
    category: 'Judicial Precedent Case',
    panels: [
      {
        title: 'Ruling Principles',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Key Principles:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>A Joint Venture is not always a Partnership. A partnership involves mutual agency where each partner can bind the others. In a JCO/JCA joint venture, there is no automatic mutual agency unless contractually agreed.</li>
              <li>Joint control is a legal and accounting fact determined by consensus, not merely high equity stakes.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Always look for mutual veto powers or consensus clauses in agreements to establish the existence of joint control.',
    examFocusType: 'concept'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-27-1',
    title: 'Exam Corner — Elimination of Unrealized Profit on Sales to Joint Venture',
    category: 'Exam Corner',
    panels: [
      {
        title: 'Problem Statement',
        content: (
          <div>
            <p><strong>Scenario:</strong> Venturer A has a 40% interest in Joint Venture Entity J. Venturer A sells machinery to J at a profit of <strong>₹1,00,000</strong>. The machinery is still held by J at the year-end.</p>
            <p className="mt-2"><strong>Adjustment:</strong> How is this transaction recorded in A\'s Consolidated Financial Statements (CFS)?</p>
          </div>
        )
      },
      {
        title: 'Solution & Steps',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Rule (Para 30):</strong> The venturer should recognize only that portion of the gain which is attributable to the interest of the other venturers.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Other venturers\' share of profit = 60% of ₹1,00,000 = <strong>₹60,000</strong> (to be recognized).</li>
              <li>Own share of profit = 40% of ₹1,00,000 = <strong>₹40,000</strong> (unrealized, must be eliminated).</li>
            </ul>
            <p><strong>Accounting Treatment:</strong> Eliminate ₹40,000 from consolidated reserves and reduce the machinery\'s carrying amount in J by ₹40,000 during proportionate consolidation.</p>
          </div>
        )
      }
    ],
    examFocus: 'Do not eliminate the entire profit. Eliminate only the venturer\'s fractional share of the profit (representing own interest) when selling assets to the joint venture.',
    examFocusType: 'trap'
  }
]
