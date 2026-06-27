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
    title={`Open ICAI AS 24 PDF — Page ${page}`}
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
    id: 'illus-24-1',
    title: 'ICAI Illustration 1 — Initial Disclosure Event: What Triggers "Discontinuing Operation" Classification',
    category: 'Official ICAI Illustration',
    pdfPage: 10,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Diversified Ltd.</p>
            <p>The Board of Directors, in its meeting on 15 January 2024, approved a detailed formal plan to close down its Hotels segment (which constitutes a separate business segment). The decision was publicly announced via a press release on 20 January 2024.</p>
            <p className="mt-2">Management asks: From which date should AS 24 disclosures be made?</p>
          </div>
        )
      },
      {
        title: 'Initial Disclosure Event (Para 16)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 16 defines the "initial disclosure event" as the <strong>earlier of</strong>:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>The enterprise enters into a <strong>binding sale agreement</strong> for substantially all of the assets of the discontinuing operation; OR</li>
              <li>The enterprise's <strong>Board approves a detailed formal plan</strong> for the discontinuance AND the plan is <strong>publicly announced</strong>.</li>
            </ol>
            <p className="mt-2"><strong>Conclusion:</strong> Both Board approval and public announcement occurred in January 2024 (within the FY 2023-24 year). The initial disclosure event = 20 January 2024.</p>
            <p>AS 24 disclosures must be made in the FY 2023-24 financial statements (year-end 31 March 2024).</p>
          </div>
        )
      },
      {
        title: 'What Constitutes a Qualifying Discontinuing Operation',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>To qualify as a "discontinuing operation" under AS 24 Para 2, the operation must be:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>A separate major line of business or geographical area of operations</li>
              <li>Part of a single co-ordinated plan</li>
              <li>A subsidiary acquired exclusively for resale</li>
            </ul>
            <p className="mt-2">A normal product line closure or management reorganization that does not meet these criteria does NOT qualify as a discontinuing operation under AS 24.</p>
          </div>
        )
      },
      {
        title: 'Disclosures Required at Initial Disclosure Event',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 25 requires disclosure of:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Description of the discontinuing operation</li>
              <li>Business or geographical segment classification</li>
              <li>Date and nature of the initial disclosure event</li>
              <li>Expected completion date of the discontinuance</li>
              <li>Carrying amounts of assets and liabilities to be disposed of</li>
              <li>Revenue, expenses, and pre-tax profit/loss attributable to the discontinuing operation</li>
              <li>Tax expense relating to the discontinuing operation</li>
              <li>Cash flows from operating, investing, and financing activities of the discontinuing operation</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Initial disclosure event = earlier of binding sale agreement OR Board approval + public announcement. Simple internal closure plans without public announcement do NOT trigger AS 24.',
    examFocusType: 'concept'
  },
  {
    id: 'illus-24-2',
    title: 'ICAI Illustration 2 — Presentation of Discontinuing Operations in P&L and Balance Sheet',
    category: 'Official ICAI Illustration',
    pdfPage: 16,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Hotels Ltd. is discontinuing its Hotels segment.</p>
            <p>FY 2023-24 — Hotels Segment:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Revenue: ₹12,00,00,000</li>
              <li>Expenses (Operating): ₹14,00,00,000</li>
              <li>Loss before tax: ₹(2,00,00,000)</li>
              <li>Tax benefit: ₹60,00,000</li>
              <li>Loss after tax: ₹(1,40,00,000)</li>
              <li>Assets to be disposed: ₹35,00,00,000; Liabilities: ₹18,00,00,000</li>
            </ul>
          </div>
        )
      },
      {
        title: 'P&L Presentation Format',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p className="font-sans font-bold">P&amp;L Statement Extract (Para 27):</p>
            <p>Continuing Operations:</p>
            <p>&nbsp;&nbsp;Revenue from continuing ops:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹80 Cr</p>
            <p>&nbsp;&nbsp;Profit from continuing ops after tax:&nbsp;&nbsp;&nbsp;&nbsp;₹15 Cr</p>
            <hr className="my-1 border-slate-300 dark:border-slate-700" />
            <p>Discontinuing Operations (Hotels Segment):</p>
            <p>&nbsp;&nbsp;Revenue:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹12 Cr</p>
            <p>&nbsp;&nbsp;Loss before tax:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(₹2 Cr)</p>
            <p>&nbsp;&nbsp;Tax benefit:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹0.6 Cr</p>
            <p>&nbsp;&nbsp;Loss after tax from discontinuing:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(₹1.4 Cr)</p>
            <hr className="my-1 border-slate-300 dark:border-slate-700" />
            <p className="font-bold">Total Net Profit After Tax:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹13.6 Cr</p>
          </div>
        )
      },
      {
        title: 'Balance Sheet Presentation',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Assets and liabilities of the discontinuing operation are presented separately in the balance sheet (or disclosed in the notes) as at the balance sheet date.</p>
            <p><strong>Hotels Segment (to be disclosed separately):</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Assets held for disposal: ₹35 Cr</li>
              <li>Liabilities of discontinuing operation: ₹18 Cr</li>
            </ul>
            <p className="mt-2">These must be distinguished from continuing operation assets and liabilities for user clarity.</p>
          </div>
        )
      }
    ],
    examFocus: 'Discontinuing operations must be SEPARATELY presented in P&L AND Balance Sheet. The continuing operations P&L must be shown clearly distinct from the discontinuing P&L.',
    examFocusType: 'focus'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-24-1',
    title: 'Business Case — Abandonment vs Formal Discontinuance: The AS 24 Trigger Test',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> Zenith Steel Ltd. gradually phased out its specialty alloys division over 3 years by not accepting new orders, reassigning staff, and winding down production. No formal plan was ever approved by the Board; no public announcement was made.</p>
          </div>
        )
      },
      {
        title: 'AS 24 — Gradual Abandonment ≠ Discontinuing Operation',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 4 explicitly excludes from AS 24's scope:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Gradual or evolutionary winding down of a product line without a formal plan</li>
              <li>Routine replacement of one product with another</li>
              <li>Abandonment of processes, product lines, or activities without commitment to a specific disposal plan</li>
            </ul>
            <p className="mt-2"><strong>Conclusion:</strong> Zenith's alloys division wind-down does NOT qualify as a discontinuing operation under AS 24. No special disclosures are required.</p>
            <p>Normal segmental disclosure under AS 17 (if the segment is reportable) would apply.</p>
          </div>
        )
      },
      {
        title: 'What Would Trigger AS 24 in This Case',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>To trigger AS 24, the management would need to:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Have the Board formally approve a plan to discontinue the alloys division</li>
              <li>Make a public announcement (press release, regulatory filing, or communication to employees/suppliers)</li>
              <li>OR enter a binding sale agreement for the division's assets</li>
            </ol>
          </div>
        )
      }
    ],
    examFocus: 'Gradual phase-out without a formal Board-approved plan does NOT qualify as a discontinuing operation under AS 24. There must be a specific, committed, and publicly announced plan.',
    examFocusType: 'trap'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-24-1',
    title: 'Audit Case Study — Post-Balance Sheet Commitment to Discontinue (AS 24 Disclosure in Annual Report)',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> Year-end: 31 March 2024. The Board approved a plan to sell the Chemicals division on 15 April 2024 (after the year-end) and made a public announcement on 20 April 2024. Auditor's report date: 10 May 2024.</p>
          </div>
        )
      },
      {
        title: 'Event After Balance Sheet Date — AS 4 + AS 24 Interaction',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The initial disclosure event under AS 24 occurred on 20 April 2024 — AFTER the balance sheet date of 31 March 2024 but BEFORE the auditor's report.</p>
            <p><strong>AS 4 (Contingencies and Events After Balance Sheet Date):</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Events after balance sheet date that provide NEW information about conditions that did not exist at year-end = Non-adjusting events</li>
              <li>These are disclosed in the notes but do not change the numbers in the FY 2023-24 financial statements</li>
            </ul>
            <p className="mt-2"><strong>AS 24 + AS 4 combined requirement:</strong> Disclosure of the post-balance-sheet discontinuance commitment in the notes to the FY 2023-24 financial statements as a subsequent event.</p>
          </div>
        )
      },
      {
        title: 'Required Disclosure Note',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p className="font-sans font-bold">Subsequent Event Note (Para 25 + AS 4):</p>
            <p>On 20 April 2024, the Company publicly announced its decision to divest the Chemicals division, which constitutes a separate reportable segment. A formal plan was approved by the Board on 15 April 2024. The Company expects to complete the disposal by [date].</p>
            <p>As this event occurred after the balance sheet date, no adjustments have been made to the FY 2023-24 financial statements.</p>
          </div>
        )
      }
    ],
    examFocus: 'Post-balance sheet discontinuance announcements → Disclosed as subsequent events (AS 4), NOT adjusted in current year financial statements. Disclosure is still mandatory.',
    examFocusType: 'adjustment'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-24-1',
    title: 'SEBI Observation — Comparative Period Restatement for Discontinuing Operations',
    category: 'Regulatory Observations',
    panels: [
      {
        title: 'SEBI Finding',
        content: (
          <div>
            <p><strong>SEBI Review:</strong> A listed company disclosed a discontinuing operation in FY 2023-24 but did not restate FY 2022-23 comparative figures to show the discontinuing operation separately in the prior year P&amp;L. The comparatives continued to show fully combined figures.</p>
          </div>
        )
      },
      {
        title: 'AS 24 Comparative Restatement Requirement',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 28: When an entity presents comparative period information in the period in which the initial disclosure event occurs, it shall restate the comparative information to present separately:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Revenue, expenses, and pre-tax result of the discontinuing operation for the comparative period</li>
              <li>Cash flows from operating, investing, and financing activities of the discontinuing operation</li>
            </ul>
            <p className="mt-2">SEBI directed the company to restate its FY 2022-23 comparatives to separately disclose the Hotels segment (now discontinuing) for the prior year.</p>
          </div>
        )
      }
    ],
    examFocus: 'Comparative period figures MUST be restated to separately show the discontinuing operation\'s P&L and cash flows when first disclosing under AS 24.',
    examFocusType: 'focus'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'judicial-24-1',
    title: 'Case Principle — Gain on Sale of Discontinued Operation (Para 33)',
    category: 'Landmark Judicial Cases',
    panels: [
      {
        title: 'Facts & Principle',
        content: (
          <div>
            <p><strong>Scenario:</strong> Zenith Ltd. sold its Hotels division for ₹40 crores. The carrying amount of net assets of the Hotels division at disposal date was ₹28 crores. Pre-tax gain = ₹12 crores.</p>
          </div>
        )
      },
      {
        title: 'AS 24 Treatment of Gain on Disposal (Para 33)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 33: The gain or loss from the disposal (or expected disposal) of a discontinuing operation is separately disclosed. It must be shown clearly as relating to the discontinuing operation, separate from continuing operations income.</p>
            <p className="mt-2"><strong>Correct P&amp;L Presentation:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Operating loss from Hotels until disposal: (₹X crores)</li>
              <li>Gain on disposal of Hotels division: ₹12 crores</li>
              <li>Total result from discontinuing Hotels: Net amount</li>
            </ul>
            <p className="mt-2">The gain must NOT be merged into "Other Income" of continuing operations.</p>
          </div>
        )
      },
      {
        title: 'Tax Treatment',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The tax on the gain from disposal must also be separately disclosed within the discontinuing operations section. Companies frequently forget to separately compute and disclose the tax on disposal gains.</p>
          </div>
        )
      }
    ],
    examFocus: 'Gain on disposal of a discontinuing operation is presented within the "discontinuing operations" section — NOT in other income of continuing operations.',
    examFocusType: 'trick'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-24-1',
    title: 'Exam Corner — AS 24 Complete Disclosure Checklist and Key Decision Tree',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'Decision Tree: Does AS 24 Apply?',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p className="font-sans font-bold">Step 1: Is it a separate major line of business or geographic area?</p>
            <p>&nbsp;&nbsp;NO → AS 24 does not apply</p>
            <p className="font-sans font-bold mt-1">Step 2: Is there a formal Board-approved plan AND public announcement?</p>
            <p>&nbsp;&nbsp;OR a binding sale agreement?</p>
            <p>&nbsp;&nbsp;NO → AS 24 does not apply (mere phase-out not enough)</p>
            <p className="font-sans font-bold mt-1">Step 3: When did the initial disclosure event occur?</p>
            <p>&nbsp;&nbsp;Current FY → Full AS 24 disclosures in current year financials</p>
            <p>&nbsp;&nbsp;After year-end but before report date → Disclose as subsequent event</p>
          </div>
        )
      },
      {
        title: 'Mandatory Disclosures Checklist',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <ul className="list-disc pl-5 space-y-1">
              <li>✓ Description of the discontinuing operation and its segment classification</li>
              <li>✓ Nature and date of initial disclosure event</li>
              <li>✓ Expected completion date</li>
              <li>✓ Carrying value of assets and liabilities to be disposed</li>
              <li>✓ Revenue, expenses, and pre-tax result of discontinuing operation</li>
              <li>✓ Tax expense attributable to discontinuing operation</li>
              <li>✓ Cash flows from operating/investing/financing of discontinuing operation</li>
              <li>✓ Gain/loss on actual disposal (when completed)</li>
              <li>✓ Restatement of comparative period figures</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Comparative period restatement is MANDATORY when first disclosing under AS 24 — this is the most commonly missed requirement in exam answers.',
    examFocusType: 'trick'
  },
  {
    id: 'exam-24-2',
    title: 'Exam Corner — Abandonment vs Discontinuation & Major Line of Business Test',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'Abandonment vs Discontinuation',
        content: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-200 dark:border-slate-800">
              <thead><tr className="bg-slate-100 dark:bg-slate-900"><th className="border p-2">Criterion</th><th className="border p-2">Discontinuing Operation</th><th className="border p-2">Mere Abandonment</th></tr></thead>
              <tbody>
                <tr><td className="border p-2">Scope</td><td className="border p-2">Major line of business or geographic area</td><td className="border p-2">Minor or incidental activity</td></tr>
                <tr className="bg-blue-50/10"><td className="border p-2">Plan</td><td className="border p-2">Formal Board plan + public announcement or binding sale</td><td className="border p-2">No formal plan, no public commitment</td></tr>
                <tr><td className="border p-2">AS 24 Application</td><td className="border p-2">YES — full disclosures mandatory</td><td className="border p-2">NO — treated as normal operations</td></tr>
                <tr className="bg-blue-50/10"><td className="border p-2">Example</td><td className="border p-2">Closing entire pharma division (20% of revenue)</td><td className="border p-2">Stopping one SKU from a product line</td></tr>
              </tbody>
            </table>
          </div>
        )
      },
      {
        title: '"Major Line of Business" Test',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Definition:</strong> A component of an entity that, by itself, represents a separate major line of business or geographic area of operations, AND can be distinguished operationally and for financial reporting purposes.</p>
            <p><strong>Tests to apply:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Does it have separately identifiable assets, liabilities, revenues, and expenses?</li>
              <li>Is the segment reported or reportable under AS 17 (Segment Reporting)?</li>
              <li>Is it a cash-generating unit or group of units that can be sold/abandoned as a whole?</li>
            </ul>
            <p className="mt-1"><strong>Exam tip:</strong> If a company sells one product line within a segment and keeps the rest of the segment, AS 24 does NOT apply — it's not a major line of business disposal.</p>
          </div>
        )
      },
      {
        title: 'Timeline of Disclosure Events',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p className="font-sans font-bold">Initial Disclosure Event:</p>
            <p>Earliest of: (1) Board approval + public announcement</p>
            <p>         (2) Binding sale agreement with buyer</p>
            <p className="font-sans font-bold mt-1">From Initial Disclosure Event:</p>
            <p>→ Disclose in ALL financial statements until completion</p>
            <p>→ Restate comparative period if event was in current period</p>
            <p className="font-sans font-bold mt-1">After Completion:</p>
            <p>→ Gain/loss from disposal reported in discontinuing section</p>
            <p>→ No further AS 24 disclosures required in future periods</p>
          </div>
        )
      }
    ],
    examFocus: 'AS 24 does NOT apply to abandonment of individual products/assets. The component must be a major line of business or geographic segment that can be separately identified. Size and separability are both required.',
    examFocusType: 'concept'
  }
]
