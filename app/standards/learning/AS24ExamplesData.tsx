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
    title={`Open ICAI AS 24 PDF — Page ${page}`}
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
    id: 'illus-24-1',
    title: 'ICAI Illustration 1 — Determination of Initial Disclosure Event (Para 15)',
    category: 'Official ICAI Illustration',
    pdfPage: 5,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Timeline of events for Delta Ltd.\'s Chemical division:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>15th October 20X1: The Board of Directors resolves to dispose of the Chemical division.</li>
              <li>20th November 20X1: A formal detailed plan is approved by the Board and publicly announced to shareholders and press.</li>
              <li>15th December 20X1: The company enters into a binding agreement to sell the division\'s assets to another enterprise.</li>
            </ul>
            <p className="mt-2"><strong>Issue:</strong> Identify the date of the Initial Disclosure Event as per AS 24. <PdfRefInline page={5} /></p>
          </div>
        )
      },
      {
        title: 'Analysis & Verdict',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Rule (Para 15):</strong> The Initial Disclosure Event is the occurrence of the **earliest** of the following:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>The enterprise has entered into a binding sale agreement for substantially all of the assets attributable to the discontinuing operation; or</li>
              <li>The enterprise’s board of directors has both approved a detailed, formal plan for the discontinuance and made a public announcement of the plan.</li>
            </ol>
            <p><strong>Verdict:</strong> The Board approved the detailed plan and publicly announced it on **20th November 20X1**. The binding agreement was signed later (15th December). Therefore, the Initial Disclosure Event occurred on <strong>20th November 20X1</strong>.</p>
          </div>
        )
      },
      {
        title: 'AS 24 Disclosures',
        content: (
          <div className="space-y-2">
            <p>Starting from the financial statements for the period ending after 20th November 20X1, the company must disclose:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Description of the discontinuing operation, its segment (AS 17), and the date of the initial disclosure event.</li>
              <li>The carrying amounts of assets and liabilities to be disposed of.</li>
              <li>Revenue, expenses, profit/loss before tax, and tax expense attributable to the division.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'The Board resolution alone (on 15th October) is NOT the initial disclosure event unless it is accompanied by a public announcement. A detailed, formal plan plus a public announcement is required to trigger the disclosure.',
    examFocusType: 'focus'
  },
  {
    id: 'illus-24-2',
    title: 'ICAI Illustration 2 — Presentation of Discontinuing Operations in the Profit & Loss Statement',
    category: 'Official ICAI Illustration',
    pdfPage: 12,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Financial Data for FY 20X1-X2:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
              <li>Total Revenue = <strong>₹50,00,000</strong> (Continuing operations ₹40,00,000; Discontinuing division ₹10,00,000).</li>
              <li>Total Expenses = <strong>₹38,00,000</strong> (Continuing operations ₹28,00,000; Discontinuing division ₹10,00,000).</li>
              <li>Tax rate = <strong>30%</strong>.</li>
            </ul>
            <p className="mt-2"><strong>Issue:</strong> Present the Profit and Loss statement structure as required by AS 24. <PdfRefInline page={12} /></p>
          </div>
        )
      },
      {
        title: 'Statement Presentation',
        content: (
          <div className="space-y-3 font-mono text-xs p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>1. Continuing Operations:</strong></p>
            <p>&nbsp;&nbsp;• Revenue: ₹40,00,000</p>
            <p>&nbsp;&nbsp;• Expenses: (₹28,00,000)</p>
            <p>&nbsp;&nbsp;• Profit before tax (A): <strong>₹12,00,000</strong></p>
            <p>&nbsp;&nbsp;• Tax Expense (30%): (₹3,60,000)</p>
            <p>&nbsp;&nbsp;• Profit after tax (Continuing): <strong>₹8,40,000</strong></p>
            
            <p className="mt-2"><strong>2. Discontinuing Operations:</strong></p>
            <p>&nbsp;&nbsp;• Revenue: ₹10,00,000</p>
            <p>&nbsp;&nbsp;• Expenses: (₹10,00,000)</p>
            <p>&nbsp;&nbsp;• Profit before tax (B): <strong>Nil</strong></p>
            <p>&nbsp;&nbsp;• Tax Expense: Nil</p>
            <p>&nbsp;&nbsp;• Profit after tax (Discontinuing): <strong>Nil</strong></p>
            
            <p className="mt-2"><strong>3. Total Group:</strong></p>
            <p>&nbsp;&nbsp;• Net Profit for the period (A + B): <strong>₹8,40,000</strong></p>
          </div>
        )
      },
      {
        title: 'AS 24 Audit Notes',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Audit Checkpoints:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Confirm that the segregation of revenues, expenses, pre-tax profit, and tax is presented on the face of the P&amp;L account, or as a detailed note reconciled directly to the face of the P&amp;L.</li>
              <li>Verify that the net cash flows (operating, investing, financing) attributable to the discontinuing operation are disclosed in the notes to accounts or cash flow statement.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Do not lump everything together. AS 24 requires segregation of results. The PBT, tax, and PAT of the discontinuing operation must be clearly distinguished from continuing operations.',
    examFocusType: 'adjustment'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-24-1',
    title: 'Business Case — Relocation of Manufacturing Operations to another Region',
    category: 'Business Application Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity context:</strong> Zenith Auto Ltd. decides to close down its old manufacturing plant in Pune and relocate all machinery and production to a newly constructed, state-of-the-art facility in Gujarat to reduce labor costs.</p>
            <p><strong>Business Query:</strong> Does this relocation and closure of the Pune plant constitute a "discontinuing operation" under AS 24?</p>
          </div>
        )
      },
      {
        title: 'AS 24 Analysis & Verdict',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Rule (Para 3):</strong> A discontinuing operation involves disposing of a separate major line of business or geographical area of operations. Relocating an activity or factory does not mean the business segment is being disposed of. <PdfRefInline page={2} /></p>
            <p><strong>Verdict:</strong> No. The company is continuing the production of the same goods, just at a different location. The closure of the old factory is a restructuring or relocation, not a discontinuing operation. AS 24 disclosures do not apply (though AS 5 might require disclosure of restructuring costs).</p>
          </div>
        )
      }
    ],
    examFocus: 'Relocations, shift of production, phasing out of a single product within a line, and closures due to seasonal conditions do NOT constitute discontinuing operations. These are ordinary operational restructurings.',
    examFocusType: 'concept'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-24-1',
    title: 'Audit Case — Failure to Disclose Board Announcement of Discontinued Segment',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Context:</strong> On 28th March 20X2, the board of Parent India Ltd. resolved to discontinue its retail business segment, which represents 30% of total revenue. A formal press release and public announcement were made on the same day. However, in preparing the accounts for the year ended 31st March 20X2, management did not disclose this as a discontinuing operation, claiming that no binding sale agreement has been signed yet.</p>
            <p><strong>Audit Dispute:</strong> The auditor insists on qualification for non-compliance with AS 24.</p>
          </div>
        )
      },
      {
        title: 'Audit Analysis & Verdict',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Reference:</strong> The Initial Disclosure Event occurred on 28th March 20X2 (Board approval + announcement), which is before the balance sheet date. Therefore, the disclosures are mandatory for the financial statements ending 31st March 20X2. <PdfRefInline page={5} /></p>
            <p><strong>Verdict:</strong> The auditor must qualify the audit report. The company has violated AS 24 by omitting segment disclosures. The excuse that no binding sale has been signed is invalid, as the public announcement already triggered the initial disclosure event.</p>
          </div>
        )
      }
    ],
    examFocus: 'Always trace the date of the public announcement. If the announcement happens on or before 31st March, AS 24 disclosures are mandatory for that financial year, even if no actual sales or transfers have occurred.',
    examFocusType: 'focus'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-24-1',
    title: 'Regulatory Observation — Segment reporting overlap (AS 17 vs AS 24)',
    category: 'Regulatory Observation',
    panels: [
      {
        title: 'Regulatory Rule',
        content: (
          <div>
            <p>A component of an enterprise that is a discontinuing operation under AS 24 would normally qualify as a reportable segment under AS 17 "Segment Reporting". <PdfRefInline page={3} /></p>
            <p>However, AS 24 is broader: even if an enterprise is not required to apply AS 17 (e.g. SMCs), it must still apply the disclosure requirements of AS 24 if it has a discontinuing operation.</p>
          </div>
        )
      },
      {
        title: 'Disclosure differences',
        content: (
          <p className="text-xs">While AS 17 focuses on ongoing segment results, AS 24 focuses on cash flow and earning projections of the remaining business. Therefore, cash flow disclosures (split into operating, investing, and financing cash flows of the discontinued segment) are a unique and critical requirement of AS 24.</p>
        )
      }
    ],
    examFocus: 'In exam problems, you will often need to state the AS 17 segment to which the discontinuing operation belongs. Make sure to link the two standards in your theoretical answers.',
    examFocusType: 'concept'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'court-24-1',
    title: 'Judicial Case — Abandonment of Project vs Phasing Out',
    category: 'Landmark Precedent',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Delta Mining Ltd. decides to abandon a gold mine project (its main operation in South India) due to lack of reserves. It stops mining immediately, sells off local equipment, and terminates all local labor contracts.</p>
            <p><strong>Dispute:</strong> The income tax department argues that this is not a discontinuing operation because the company still operates other mines in North India, so the mining business is continuing.</p>
          </div>
        )
      },
      {
        title: 'Legal Verdict',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Rule (Para 3):</strong> Terminating a component through abandonment can constitute a discontinuing operation if it represents a separate major line of business or geographical area. <PdfRefInline page={2} /></p>
            <p><strong>Verdict:</strong> The gold mine represented the entire geographical segment of South India and was operationally distinct. Therefore, its abandonment qualifies as a discontinuing operation under AS 24. The company\'s presentation is legally correct.</p>
          </div>
        )
      }
    ],
    examFocus: 'Abandonment (terminating through abandonment rather than sale) is one of the three disposal types under AS 24. Disclosures start when the plan is approved and announced, or when the component is actually abandoned.',
    examFocusType: 'adjustment'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-24-1',
    title: 'Exam Corner — Chronology of Disclosures until Completion',
    category: 'Exam Corner',
    panels: [
      {
        title: 'Disclosure Lifecyle',
        content: (
          <ul className="list-disc pl-5 space-y-1.5 text-xs font-mono">
            <li><strong>1. Origin:</strong> Disclosures begin in the period of the Initial Disclosure Event.</li>
            <li><strong>2. Progression:</strong> In every subsequent year, the company must update the disclosure, describing the progress of the disposal (e.g. assets sold, liabilities settled).</li>
            <li><strong>3. Termination:</strong> Disclosures continue until the period in which the disposal is completed or the plan is abandoned.</li>
          </ul>
        )
      }
    ],
    examFocus: 'Do not stop disclosing after the first year. Disclosures must continue in every annual report until the discontinuance is 100% completed.',
    examFocusType: 'adjustment'
  }
]
