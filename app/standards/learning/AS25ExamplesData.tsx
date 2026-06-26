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
    title={`Open ICAI AS 25 PDF — Page ${page}`}
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
    id: 'illus-25-1',
    title: 'ICAI Illustration 1 — Minimum Components of an Interim Financial Report (Para 8)',
    category: 'Official ICAI Illustration',
    pdfPage: 8,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Ltd. (listed company) for Q2 FY 2023-24 (July–September 2023).</p>
            <p>Management wants to know: What must be presented in the Q2 interim financial report?</p>
          </div>
        )
      },
      {
        title: 'Minimum Components (Para 8)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 8 specifies the MINIMUM components of an interim financial report:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li><strong>Condensed balance sheet</strong></li>
              <li><strong>Condensed statement of profit and loss</strong></li>
              <li><strong>Condensed cash flow statement</strong></li>
              <li><strong>Condensed statement of changes in equity</strong> (if the entity presents one in annual statements)</li>
              <li><strong>Selected explanatory notes</strong></li>
            </ol>
            <p className="mt-2">The word "condensed" allows for fewer line items than annual statements, but all material items must still be captured.</p>
          </div>
        )
      },
      {
        title: 'Comparative Periods Required',
        content: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-200 dark:border-slate-800">
              <thead><tr className="bg-slate-100 dark:bg-slate-900"><th className="border p-2">Statement</th><th className="border p-2">Current Period</th><th className="border p-2">Comparative</th></tr></thead>
              <tbody>
                <tr><td className="border p-2">Balance Sheet</td><td className="border p-2">End of Q2 (Sep 2023)</td><td className="border p-2">End of last FY (Mar 2023)</td></tr>
                <tr className="bg-blue-50/10"><td className="border p-2">P&amp;L</td><td className="border p-2">Q2 (Jul–Sep 2023) + H1 YTD</td><td className="border p-2">Q2 prior year + H1 prior year YTD</td></tr>
                <tr><td className="border p-2">Cash Flow</td><td className="border p-2">H1 YTD (Apr–Sep 2023)</td><td className="border p-2">H1 prior year YTD</td></tr>
                <tr className="bg-blue-50/10"><td className="border p-2">Statement of Changes in Equity</td><td className="border p-2">H1 YTD</td><td className="border p-2">H1 prior year YTD</td></tr>
              </tbody>
            </table>
          </div>
        )
      }
    ],
    examFocus: 'Balance sheet comparatives = last annual balance sheet. P&L comparatives = BOTH the same quarter last year AND the YTD period. Auditors check both are presented.',
    examFocusType: 'focus'
  },
  {
    id: 'illus-25-2',
    title: 'ICAI Illustration 2 — Seasonal Revenue: Should It Be Deferred or Accrued at Interim Date?',
    category: 'Official ICAI Illustration',
    pdfPage: 14,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario 1 — Seasonal Revenue:</strong> An ice-cream manufacturer earns 80% of its annual revenue in Q1 (summer). In Q1 interim report, it proposes to defer some revenue to later quarters for better profit "smoothing."</p>
            <p className="mt-2"><strong>Scenario 2 — Annual Bonus:</strong> A company pays an annual performance bonus to employees in Q4. In Q1, Q2, and Q3 interim reports, management doesn't accrue any bonus as it's "not yet committed."</p>
          </div>
        )
      },
      {
        title: 'AS 25 Rule: Same Policies as Annual (Para 28)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Para 28 — Core Principle:</strong> An enterprise shall apply the same accounting recognition and measurement policies in its interim financial statements as are applied in its annual financial statements, except for changes made after the date of the most recent annual financial statements.</p>
            <p className="mt-2"><strong>Scenario 1 — Revenue Deferral NOT allowed:</strong> Revenue is earned in Q1 — it must be recognized in Q1. Seasonal businesses cannot defer earned revenue to smooth quarterly profits.</p>
            <p><strong>Scenario 2 — Annual Bonus Accrual IS required:</strong> The annual bonus is anticipated based on performance. A pro-rated accrual must be made each quarter. The fact that it is formally determined in Q4 does not mean it should be ignored for Q1–Q3.</p>
          </div>
        )
      },
      {
        title: 'Contrast: Costs Incurred Unevenly',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Annual maintenance cost:</strong> A factory does major maintenance in Q3 at ₹12,00,000 cost. Can the company spread it equally (₹3L/quarter) in interim reports?</p>
            <p><strong>Para 29 Answer:</strong> Costs incurred unevenly during the year shall be deferred or accrued at interim date ONLY if it is appropriate to defer or accrue that type of cost at year-end. If the cost would be expensed at year-end (not deferred as prepaid), it must be expensed in Q3 when incurred, not spread over 4 quarters.</p>
          </div>
        )
      }
    ],
    examFocus: 'Seasonal revenue cannot be deferred to smooth profits. Annual bonuses must be accrued proportionally each quarter. Costs incurred unevenly: defer only if deferral would be appropriate at year-end.',
    examFocusType: 'trap'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-25-1',
    title: 'Business Case — Income Tax in Interim Reports: Estimated Annual Effective Tax Rate',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Electronics Ltd. Q1 FY 2023-24 (April–June 2023):</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Q1 Pre-tax profit: ₹5,00,00,000</li>
              <li>Estimated annual pre-tax profit: ₹18,00,00,000 (including estimated MAT adjustment, exemptions, etc.)</li>
              <li>Estimated annual tax on ₹18 crores: ₹5,40,00,000 (effective rate = 30%)</li>
            </ul>
          </div>
        )
      },
      {
        title: 'AS 25 Income Tax Rule (Para 29)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 29: Income tax expense is recognized in each interim period based on the best estimate of the <strong>weighted average annual income tax rate</strong> expected for the full financial year.</p>
            <p>This is applied to the interim period's pre-tax income.</p>
          </div>
        )
      },
      {
        title: 'Computation',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p><strong>Q1 Tax Provision:</strong></p>
            <p>Estimated annual effective tax rate:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;30%</p>
            <p>Q1 Pre-tax profit:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹5,00,00,000</p>
            <p className="font-bold">Q1 Tax expense = 30% × ₹5 Cr:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹1,50,00,000</p>
            <p className="font-sans mt-2 font-bold">NOT the actual Q1 marginal tax rate alone.</p>
            <p className="font-sans">If the estimate changes in Q2, the rate is revised and the cumulative effect is adjusted in Q2.</p>
          </div>
        )
      }
    ],
    examFocus: 'Interim income tax = estimated ANNUAL effective tax rate × interim pre-tax income. Never compute interim tax using only the marginal rate for the isolated quarter.',
    examFocusType: 'trick'
  },
  {
    id: 'case-25-2',
    title: 'Business Case — Change in Accounting Policy During the Year (Interim Restatement)',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> Zenith Ltd. presented Q1 FY 2023-24 results using FIFO for inventory. In Q2 FY 2023-24, the company changed inventory policy to Weighted Average Cost (WAC) due to a better match with actual cost flows, and the change is retrospective.</p>
          </div>
        )
      },
      {
        title: 'AS 25 Para 41 — Policy Change in Interim Period',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 41: A change in accounting policy, other than one for which transition is specified by an Accounting Standard or an Interpretation, shall be reflected by restating the financial statements of prior interim periods of the current financial year and the comparable interim periods of prior financial years.</p>
            <p className="mt-2"><strong>Action Required:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Restate Q1 FY 2023-24 results using WAC (not FIFO)</li>
              <li>Restate Q1 FY 2022-23 comparatives using WAC</li>
              <li>Disclose the nature, reason, and quantitative impact of the change</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Accounting policy changes during the year require restatement of all prior interim periods of the CURRENT year AND comparable prior year interim periods.',
    examFocusType: 'adjustment'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-25-1',
    title: 'Audit Case Study — Non-Disclosure of Contingent Liability in Interim Report',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> During the review of Q2 FY 2023-24 interim report, the auditor discovers a major tax demand of ₹25 crores received in July 2023 (Q2). Management did not disclose this in the interim report, arguing "it will be mentioned in the annual report."</p>
          </div>
        )
      },
      {
        title: 'AS 25 Materiality for Interim (Para 24)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 24: Materiality for interim reporting purposes is assessed relative to the INTERIM period data, not the annual data. A ₹25 crore tax demand that may not be material relative to annual revenues could be very material relative to Q2 results.</p>
            <p className="mt-2">Additionally, Para 16 requires that interim reports include explanatory notes disclosing: contingent liabilities and contingent assets since the last annual balance sheet date.</p>
            <p><strong>Auditor Conclusion:</strong> The ₹25 crore tax demand must be disclosed in the Q2 interim report notes as a contingent liability. "We will include it in the annual report" is not acceptable.</p>
          </div>
        )
      }
    ],
    examFocus: 'Materiality for interim reports is assessed against the INTERIM period data, not the full-year numbers. Major events since last annual statements must be disclosed.',
    examFocusType: 'focus'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-25-1',
    title: 'SEBI Observation — Quarterly Results: Non-provision of Full-Year Comparatives',
    category: 'Regulatory Observations',
    panels: [
      {
        title: 'SEBI Finding',
        content: (
          <div>
            <p><strong>SEBI Review:</strong> Several listed companies presenting Q1 results only showed the current Q1 vs. prior Q1, without presenting the full-year FY 2022-23 as a third column for balance sheet comparison.</p>
          </div>
        )
      },
      {
        title: 'AS 25 Requirement',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>For interim financial reports, the MINIMUM comparative periods are:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Balance sheet: End of last full fiscal year (31 Mar 2023)</li>
              <li>P&amp;L: Same quarter last year + Year-to-date comparison</li>
            </ul>
            <p className="mt-2">SEBI's LODR Regulations also specify the exact format for quarterly results, which align with (and sometimes exceed) AS 25 minimum requirements.</p>
          </div>
        )
      }
    ],
    examFocus: 'Interim balance sheet must ALWAYS show the last annual year-end as comparative — not the prior quarter-end.',
    examFocusType: 'adjustment'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'judicial-25-1',
    title: 'Case Principle — Extraordinary Item in Interim Report: Same Annual Standard',
    category: 'Landmark Judicial Cases',
    panels: [
      {
        title: 'Principle',
        content: (
          <div>
            <p><strong>Para 28 establishes:</strong> The classification of an item as extraordinary for interim reporting purposes follows exactly the same criteria as for annual financial statements under AS 5.</p>
            <p className="mt-2">Extraordinary items are those arising from events or transactions that are clearly distinct from ordinary activities and are therefore not expected to recur frequently or regularly.</p>
          </div>
        )
      },
      {
        title: 'Common Exam Scenario',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Q: A cyclone destroyed the factory in Q2. Can the company spread the extraordinary loss across Q1 to Q4 in interim reports?</strong></p>
            <p><strong>A: No.</strong> The loss must be recognized in Q2 when it occurred. AS 25 does not allow re-allocation of extraordinary items across other quarters. Same-period recognition applies exactly as in annual accounts.</p>
          </div>
        )
      }
    ],
    examFocus: 'Extraordinary items in interim reports: same definition as annual + recognized in the period they occur — cannot be spread across other interim periods.',
    examFocusType: 'concept'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-25-1',
    title: 'Exam Corner — AS 25 Seasonal vs Non-Seasonal Revenue and the Annual Effective Tax Rate Method',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'The Discrete vs Integral Period Debate',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Integral Period View:</strong> Each interim period is an integral part of the annual period. Costs and revenues should be allocated based on annual estimates.</p>
            <p><strong>Discrete Period View:</strong> Each interim period stands on its own — only actual transactions in that period are reported.</p>
            <p className="mt-2"><strong>AS 25 Approach:</strong> Primarily discrete period approach, BUT with specific exceptions:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Income tax → Use estimated annual effective rate (integral)</li>
              <li>Bonus → Accrue ratably if annual bonus obligation exists (integral)</li>
              <li>Seasonal revenue → Recognize when earned (discrete)</li>
              <li>Annual maintenance cost → Expense when incurred (discrete)</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Key Rules Summary Table',
        content: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-200 dark:border-slate-800">
              <thead><tr className="bg-slate-100 dark:bg-slate-900"><th className="border p-2">Item</th><th className="border p-2">Treatment</th></tr></thead>
              <tbody>
                <tr><td className="border p-2">Seasonal revenue</td><td className="border p-2">Recognize when earned — do NOT defer</td></tr>
                <tr className="bg-blue-50/10"><td className="border p-2">Annual bonus</td><td className="border p-2">Accrue proportionally each quarter</td></tr>
                <tr><td className="border p-2">Income tax</td><td className="border p-2">Estimated annual effective rate × quarterly profit</td></tr>
                <tr className="bg-blue-50/10"><td className="border p-2">Extraordinary item</td><td className="border p-2">Recognize in period occurred — no spreading</td></tr>
                <tr><td className="border p-2">Major repair cost</td><td className="border p-2">Expense in period incurred (if expensed at year-end)</td></tr>
                <tr className="bg-blue-50/10"><td className="border p-2">Advertising</td><td className="border p-2">Expense when incurred — do NOT defer to other quarters</td></tr>
              </tbody>
            </table>
          </div>
        )
      }
    ],
    examFocus: 'AS 25 uses a PRIMARILY discrete approach. The income tax exception (annual effective rate) and bonus accrual are the most tested "integral" exceptions.',
    examFocusType: 'trick'
  },
  {
    id: 'exam-25-2',
    title: 'Exam Corner — Change in Accounting Policy / Estimate During Interim Period',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'Year-to-Date Reporting Content',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Minimum Components of an Interim Financial Report (Para 8):</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Condensed Balance Sheet (as at end of interim period)</li>
              <li>Condensed P&L (for the current interim period AND year-to-date)</li>
              <li>Condensed Cash Flow Statement (year-to-date)</li>
              <li>Selected explanatory notes</li>
            </ul>
            <p className="mt-2"><strong>Comparative Periods Required:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Balance Sheet: Previous year-end</li>
              <li>P&L: Same interim period of prior year + Year-to-date of prior year</li>
              <li>Cash Flow: Year-to-date of prior year</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Change in Policy/Estimate During Interim',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Change in Accounting Policy (Para 30):</strong> If an entity changes its accounting policy in Q2 (e.g., switches from FIFO to Weighted Average for inventory), it must restate all previously reported interim periods of the current year. This ensures consistency of information for the annual period.</p>
            <p><strong>Change in Accounting Estimate (Para 29):</strong> Changes in accounting estimates are handled prospectively — recognized in the interim period of change and remaining interim periods of that year. No restatement of prior interim periods.</p>
            <p><strong>Classic Exam Example:</strong> A depreciation change (estimate) in Q3 — apply revised rate for Q3 and Q4 only. A change from cash to accrual basis (policy) in Q3 — restate Q1, Q2, and Q3.</p>
          </div>
        )
      }
    ],
    examFocus: 'Change in POLICY → restate all prior interim periods of the year. Change in ESTIMATE → prospective only from Q of change. This distinction is a classic exam differentiation question.',
    examFocusType: 'concept'
  }
]
