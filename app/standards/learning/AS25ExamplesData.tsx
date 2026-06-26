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
    title={`Open ICAI AS 25 PDF — Page ${page}`}
  >
    <svg
      xmlns="http://www.w3.org/2050/svg"
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
    id: 'illus-25-1',
    title: 'ICAI Illustration 1 — Estimation of Interim Income Tax Expense (Weighted Average Annual Tax Rate)',
    category: 'Official ICAI Illustration',
    pdfPage: 12,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Delta Ltd. prepares quarterly interim financial reports:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Expected accounting profit for Q1 = <strong>₹2,00,000</strong>.</li>
              <li>Expected accounting profits for Q2, Q3, and Q4 = <strong>₹3,00,000 each</strong> (Total annual expected profit = <strong>₹11,00,000</strong>).</li>
              <li>The company has a carry-forward tax loss that reduces taxable income by <strong>₹1,00,000</strong>.</li>
              <li>Corporate Tax rate = <strong>30%</strong>.</li>
            </ul>
            <p className="mt-2"><strong>Issue:</strong> Compute the tax expense to be recognized in the Q1 interim report as per AS 25. <PdfRefInline page={12} /></p>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div className="space-y-3 font-mono text-xs p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>Step 1: Estimate total annual taxable income and tax liability</strong></p>
            <p>• Estimated Annual Accounting Profit = ₹11,00,000</p>
            <p>• Less: Carry-forward loss deduction = (₹1,00,000)</p>
            <p>• Estimated Annual Taxable Income = <strong>₹10,00,050</strong></p>
            <p>• Estimated Annual Tax Liability = ₹10,00,000 × 30% = <strong>₹3,00,000</strong></p>
            
            <p className="mt-2"><strong>Step 2: Calculate the Weighted Average Annual Tax Rate</strong></p>
            <p>Rate = Estimated Annual Tax / Estimated Annual Profit</p>
            <p>Rate = ₹3,00,000 / ₹11,00,000 = <strong>27.27%</strong></p>
            
            <p className="mt-2"><strong>Step 3: Compute Q1 Tax Expense</strong></p>
            <p>Q1 Tax Expense = Q1 Accounting Profit × Weighted Average Rate</p>
            <p>Q1 Tax Expense = ₹2,00,000 × 27.27% = <strong>₹54,540</strong></p>
          </div>
        )
      },
      {
        title: 'AS 25 Principles',
        content: (
          <div className="space-y-2">
            <p>Under AS 25, income tax expense is recognized in each interim period based on the **best estimate of the weighted average annual income tax rate** expected for the full financial year. <PdfRefInline page={12} /></p>
            <p>Tax rate changes or deductions (like carry-forward losses) are spread over the entire year through this weighted rate, rather than being recognized entirely in a single quarter.</p>
          </div>
        )
      }
    ],
    examFocus: 'Do not compute tax for Q1 by simply applying the tax rate directly to Q1 profits. You must always estimate the annual profits first, calculate the annual tax liability, derive the weighted average tax rate, and apply that rate to the quarter\'s profits.',
    examFocusType: 'focus'
  },
  {
    id: 'illus-25-2',
    title: 'ICAI Illustration 2 — Treatment of Seasonal and Cyclical Revenues (Para 29)',
    category: 'Official ICAI Illustration',
    pdfPage: 14,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity context:</strong> SugarCane Agro Ltd. operates in a highly seasonal industry. It earns 90% of its annual revenues during the third quarter (October to December) of every year.</p>
            <p><strong>Accounting Policy:</strong> In preparing its quarterly reports, the company wants to defer the operating expenses incurred in Q1 and Q2 to Q3, and also wants to anticipate and project 25% of Q3 revenues in Q1 and Q2, to show a smoother profit trend.</p>
            <p><strong>Issue:</strong> Evaluate this accounting policy under AS 25. <PdfRefInline page={14} /></p>
          </div>
        )
      },
      {
        title: 'AS 25 Analysis & Verdict',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Rule (Para 29):</strong> Revenues that are received seasonally, cyclically, or occasionally within a financial year should **not be anticipated or deferred** at an interim date if anticipation or deferral would not be appropriate at the end of the financial year. </p>
            <p><strong>Verdict:</strong> The policy is completely prohibited. Revenues must be recognized only when they are earned (in Q3). Operating expenses incurred in Q1 and Q2 cannot be deferred unless they meet the criteria for deferral at the year-end (e.g. prepaid expenses). The company must report loss in Q1/Q2 and high profit in Q3.</p>
          </div>
        )
      }
    ],
    examFocus: 'Revenues received seasonally must not be anticipated or deferred. Similarly, costs that are incurred unevenly during a financial year (e.g., annual advertising costs incurred in Q1) should be recognized in the quarter they are incurred, unless they would be deferred at the year-end.',
    examFocusType: 'trap'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-25-1',
    title: 'Business Case — Revaluation of Fixed Assets in an Interim Period',
    category: 'Business Application Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Context:</strong> LandCorp India Ltd. revalues its head office land on 30th June 20X1 (during Q1 of the financial year). The revaluation results in an upward increase of <strong>₹50,00,000</strong>.</p>
            <p><strong>Issue:</strong> Can the company reflect this revaluation surplus in the Q1 condensed balance sheet, or must it wait until the annual financial statements?</p>
          </div>
        )
      },
      {
        title: 'AS 25 Analysis & Solution',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Rule:</strong> An enterprise should apply the same accounting policies in its interim financial statements as are applied in its annual financial statements. <PdfRefInline page={10} /></p>
            <p><strong>Solution:</strong> Yes. Revaluation is an accounting policy. If the company revalues its assets, the revaluation surplus must be recognized immediately in the Q1 interim financial statements (adjusting Land value and Revaluation Reserve in the equity section of Q1).</p>
          </div>
        )
      }
    ],
    examFocus: 'Accounting policies must be applied consistently. If an event (like revaluation or a change in accounting policy) occurs during a quarter, its impact is recognized in that quarter\'s report and disclosed in the selected explanatory notes.',
    examFocusType: 'concept'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-25-1',
    title: 'Audit Case — Inadequate Disclosures of Significant events in Quarterly Reports',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Context:</strong> During Q2, a fire occurred at the main warehouse of RetailGiant Ltd., destroying inventory worth <strong>₹2,00,00,000</strong>. The company filed an insurance claim. In the Q2 quarterly report, management did not mention this event, stating that since it happened mid-year and is an extraordinary item, it will be disclosed in the annual report.</p>
            <p><strong>Issue:</strong> Is the omission of this disclosure in the quarterly report acceptable under AS 25?</p>
          </div>
        )
      },
      {
        title: 'Audit Analysis & Verdict',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Reference:</strong> AS 25 (Paragraph 16) requires selected explanatory notes to disclose significant events, including the write-down of inventories and the recognition of a loss from fire or other natural disasters. <PdfRefInline page={8} /></p>
            <p><strong>Verdict:</strong> Non-compliance. The warehouse fire and inventory loss are highly material events. Omission of this information makes the condensed quarterly report misleading. The auditor must qualify the review report if management refuses to disclose it.</p>
          </div>
        )
      }
    ],
    examFocus: 'Explanatory notes in interim reports are meant to explain significant changes in financial position and performance since the last annual report. Write-downs, losses, litigations, and restructuring provisions must be disclosed.',
    examFocusType: 'focus'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-25-1',
    title: 'Regulatory Observation — SEBI Listing Requirements vs AS 25 Condensed Formats',
    category: 'Regulatory Observation',
    panels: [
      {
        title: 'Regulatory Context',
        content: (
          <div>
            <p>Under SEBI (Listing Obligations and Disclosure Requirements) Regulations, listed companies in India must publish quarterly financial results within 45 days of the end of each quarter.</p>
            <p><strong>SEBI Formats:</strong> SEBI prescribes a specific format for these quarterly results which is much briefer than the "condensed financial statements" required under AS 25 (e.g. it does not require a full condensed cash flow statement every quarter).</p>
            <p><strong>AS 25 Overlap:</strong> However, the **recognition and measurement principles** of AS 25 (such as interim tax estimations and seasonal revenue rules) must still be followed in preparing the SEBI results. <PdfRefInline page={2} /></p>
          </div>
        )
      }
    ],
    examFocus: 'Statutes and regulators can prescribe formats that differ from AS 25. In such cases, the recognition and measurement principles of AS 25 still apply to the data presented.',
    examFocusType: 'concept'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'court-25-1',
    title: 'Judicial Case — Consistency of Depreciation Methods in Interim Periods',
    category: 'Landmark Precedent',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Delta Power Ltd. changed its depreciation method from WDV to SLM in its quarterly report for Q3, applying it retrospectively. It calculated the entire year-to-date adjustment in Q3, resulting in a large write-back of depreciation in Q3 profit.</p>
            <p><strong>Dispute:</strong> Shareholders sued, claiming the company manipulated the Q3 results to show a turnaround.</p>
          </div>
        )
      },
      {
        title: 'Legal Verdict',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Rule (Para 36-38):</strong> A change in accounting policy made in an interim period should be reflected by restating the financial statements of prior interim periods of the current financial year. <PdfRefInline page={17} /></p>
            <p><strong>Verdict:</strong> The company\'s method of putting the entire cumulative adjustment in Q3 was illegal. The company was required to restate the Q1 and Q2 reports presented to reflect the new depreciation method retrospectively for those quarters.</p>
          </div>
        )
      }
    ],
    examFocus: 'If an accounting policy is changed during an interim period, you must restate all prior quarters of the same financial year to ensure comparability. You cannot dump the cumulative change in the current quarter.',
    examFocusType: 'adjustment'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-25-1',
    title: 'Exam Corner — Comparative Periods Requirement Checklist',
    category: 'Exam Corner',
    panels: [
      {
        title: 'Comparative Periods Matrix',
        content: (
          <div className="overflow-x-auto text-xs font-mono">
            <table className="w-full border-collapse border border-slate-200 dark:border-slate-800">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  <th className="p-2 border border-slate-200">Interim Statement</th>
                  <th className="p-2 border border-slate-200">Current Period</th>
                  <th className="p-2 border border-slate-200">Comparative Period</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-slate-200">Balance Sheet</td>
                  <td className="p-2 border border-slate-200">End of current quarter</td>
                  <td className="p-2 border border-slate-200">End of preceding financial year</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200">P&amp;L (Quarter)</td>
                  <td className="p-2 border border-slate-200">Current quarter</td>
                  <td className="p-2 border border-slate-200">Comparable quarter of last year</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200">P&amp;L (YTD)</td>
                  <td className="p-2 border border-slate-200">Year-to-date current period</td>
                  <td className="p-2 border border-slate-200">Comparable YTD of last year</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200">Cash Flow (YTD)</td>
                  <td className="p-2 border border-slate-200">Year-to-date current period</td>
                  <td className="p-2 border border-slate-200">Comparable YTD of last year</td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      }
    ],
    examFocus: 'Be careful! The comparative balance sheet is the end of the PRECEDING financial year, NOT the end of the comparable quarter of last year. This is a very common exam mistake.',
    examFocusType: 'trap'
  }
]
