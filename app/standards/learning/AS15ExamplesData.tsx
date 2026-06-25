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
    title={`Open ICAI AS 15 PDF — Page ${page}`}
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
    id: 'illus-15-1',
    title: 'ICAI Illustration 1 — Projected Unit Credit (PUC) Method (Actuarial Valuation of Gratuity/Defined Benefit Obligation)',
    category: 'Official ICAI Illustration',
    pdfPage: 18,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Matrix India Ltd. (FY 2023-24)</p>
            <p><strong>Gratuity Scheme Parameters:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>An employee is entitled to receive a lump sum gratuity of **1% of final salary** for each year of service.</li>
              <li>Current Service Period = 0 (At start of Year 1)</li>
              <li>Expected Service Life = 3 Years</li>
              <li>Expected Final Salary at end of Year 3 = <strong>₹300,000</strong></li>
              <li>Actuarial Discount Rate = <strong>10% per annum</strong></li>
            </ul>
            <p className="mt-2 text-slate-650 dark:text-gray-300">The company needs to apply the Projected Unit Credit (PUC) method to calculate the Defined Benefit Obligation (DBO) and Current Service Cost (CSC) for Years 1, 2, and 3.</p>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div className="space-y-3 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>Step 1: Total Expected Gratuity Benefit</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Total service = 3 Years</p>
            <p>&nbsp;&nbsp;&nbsp;Benefit per year = 1% of ₹300,000 = ₹3,000</p>
            <p>&nbsp;&nbsp;&nbsp;Total expected gratuity benefit = 3 × ₹3,000 = <strong>₹9,000</strong></p>
            
            <p className="mt-2"><strong>Step 2: Valuation of CSC &amp; DBO (PUC Table)</strong></p>
            <p><strong>Year 1:</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Benefit allocated to Year 1 = ₹3,000</p>
            <p>&nbsp;&nbsp;&nbsp;Discount factor for 2 years (to end of Year 3) = 1 / (1.10)² = 0.8264</p>
            <p>&nbsp;&nbsp;&nbsp;Current Service Cost (CSC) = ₹3,000 × 0.8264 = <strong>₹2,479</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Closing DBO (Year 1) = <strong>₹2,479</strong></p>
            
            <p className="mt-2"><strong>Year 2:</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Opening DBO = ₹2,479</p>
            <p>&nbsp;&nbsp;&nbsp;Interest Cost (10% of ₹2,479) = <strong>₹248</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Benefit allocated to Year 2 = ₹3,000</p>
            <p>&nbsp;&nbsp;&nbsp;Discount factor for 1 year = 1 / 1.10 = 0.9091</p>
            <p>&nbsp;&nbsp;&nbsp;CSC (Year 2) = ₹3,000 × 0.9091 = <strong>₹2,727</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Closing DBO (Year 2) = Opening (₹2,479) + Interest (₹248) + CSC (₹2,727) = <strong>₹5,454</strong></p>

            <p className="mt-2"><strong>Year 3:</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Opening DBO = ₹5,454</p>
            <p>&nbsp;&nbsp;&nbsp;Interest Cost (10% of ₹5,454) = <strong>₹546</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Benefit allocated to Year 3 = ₹3,000</p>
            <p>&nbsp;&nbsp;&nbsp;Discount factor for 0 years = 1.000</p>
            <p>&nbsp;&nbsp;&nbsp;CSC (Year 3) = <strong>₹3,000</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Closing DBO (Year 3) = ₹5,454 + ₹546 + ₹3,000 = <strong>₹9,000</strong></p>
          </div>
        )
      },
      {
        title: 'AS 15 Technical Analysis',
        content: (
          <div>
            <p>Under AS 15 (Para 65), the **Projected Unit Credit (PUC) Method** must be used to determine the present value of the defined benefit obligations and the related current service cost. This method sees each period of service as giving rise to an additional unit of benefit entitlement and measures each unit separately to build up the final obligation.</p>
            <p className="mt-2"><strong>Interest Cost (Para 79):</strong> Interest cost is calculated by multiplying the discount rate at the beginning of the period by the defined benefit obligation balance during that period.</p>
          </div>
        )
      }
    ],
    examFocus: 'DBO is calculated at the present value of accrued benefits based on projected final salary, not current salary.',
    examFocusType: 'focus'
  },
  {
    id: 'illus-15-2',
    title: 'ICAI Illustration 2 — Defined Benefit Obligation Reconciliation & Plan Assets Accounting',
    category: 'Official ICAI Illustration',
    pdfPage: 23,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Neptune Tech Ltd. (FY 2023-24)</p>
            <p><strong>Scheme Details:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Present Value of DBO at start of year: <strong>₹1,000,000</strong></li>
              <li>Fair Value of Plan Assets at start of year: <strong>₹800,000</strong></li>
              <li>Current Service Cost (CSC): <strong>₹120,000</strong></li>
              <li>Interest rate / Discount rate: <strong>8% per annum</strong></li>
              <li>Expected Return on Plan Assets: <strong>9% per annum</strong></li>
              <li>Benefits paid during the year: <strong>₹150,000</strong></li>
              <li>Contributions made to the trust: <strong>₹200,000</strong></li>
              <li>PV of DBO at end of year (Actuarial value): <strong>₹1,150,000</strong></li>
              <li>Fair Value of Plan Assets at end of year: <strong>₹920,000</strong></li>
            </ul>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div className="space-y-3 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>1. Interest Cost &amp; Expected Return:</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Interest Cost = ₹1,000,000 × 8% = <strong>₹80,000</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Expected Return on Plan Assets = ₹800,000 × 9% = <strong>₹72,000</strong></p>
            
            <p className="mt-2"><strong>2. Actuarial Gain/Loss on DBO:</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Expected Closing DBO = Opening (₹1,000,000) + CSC (₹120,000) + Interest (₹80,000) − Benefits Paid (₹150,000) = ₹1,050,000</p>
            <p>&nbsp;&nbsp;&nbsp;Actual Closing DBO = ₹1,150,000</p>
            <p>&nbsp;&nbsp;&nbsp;Actuarial Loss on DBO = Actual (₹1,150,000) − Expected (₹1,050,000) = <strong>₹100,000</strong></p>
            
            <p className="mt-2"><strong>3. Actuarial Gain/Loss on Plan Assets:</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Expected Closing Plan Assets = Opening (₹800,000) + Expected Return (₹72,000) + Contributions (₹200,000) − Benefits Paid (₹150,000) = ₹922,000</p>
            <p>&nbsp;&nbsp;&nbsp;Actual Closing Plan Assets = ₹920,000</p>
            <p>&nbsp;&nbsp;&nbsp;Actuarial Loss on Plan Assets = Expected (₹922,000) − Actual (₹920,000) = <strong>₹2,000</strong></p>
            
            <p className="mt-2"><strong>4. Net Actuarial Gain/Loss charged to P&amp;L:</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Net Loss = Loss on DBO (₹100,000) + Loss on Plan Assets (₹2,000) = <strong>₹102,000</strong> (charged to P&amp;L)</p>
          </div>
        )
      },
      {
        title: 'Net Gratuity Expense & Balance Sheet Impact',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Expense recognized in Profit &amp; Loss:</strong></p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono">
              <p>Current Service Cost: ₹120,000</p>
              <p>Interest Cost: ₹80,000</p>
              <p>Expected Return: (₹72,000)</p>
              <p>Net Actuarial Loss: ₹102,000</p>
              <p><strong>Total Gratuity Expense: ₹230,000</strong></p>
            </div>
            <p className="mt-2"><strong>Balance Sheet Presentation:</strong></p>
            <p>Defined Benefit Obligation (₹1,150,000) − Plan Assets (₹920,000) = <strong>₹230,000 Liability</strong> (recorded as Provision for Gratuity under Non-Current / Current Liabilities).</p>
          </div>
        )
      }
    ],
    examFocus: 'Under AS 15, ALL actuarial gains and losses are recognized immediately in the Statement of Profit & Loss; deferral or amortization is strictly prohibited.',
    examFocusType: 'concept'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-15-1',
    title: 'Business Case — Transitioning from Unfunded Gratuity to Funded Gratuity Trust (Zenith Retail Ltd.)',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Retail Ltd. (FY 2023-24)</p>
            <p><strong>The Event:</strong> Historically, Zenith Retail accounted for gratuity on a cash payment basis (which was a violation of AS 15). In the current year, the company establishes an independent **Gratuity Trust Fund** and gets an actuarial valuation.</p>
            <p><strong>Actuarial Findings:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Accumulated Gratuity Obligation (DBO) for past services = <strong>₹4,500,000</strong></li>
              <li>Company pays a seed contribution of <strong>₹2,000,000</strong> to the Gratuity Trust on 1st April 2023.</li>
            </ul>
            <p className="mt-2">Zenith Retail wants to understand the treatment of this transitional liability of ₹4,500,000 under AS 15.</p>
          </div>
        )
      },
      {
        title: 'Transition Provisions (Para 142)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>When an enterprise first adopts AS 15, the **transitional liability** is determined as the difference between the PV of obligation at adoption date and the carrying value of liability that would have been recognized under the old policy.</p>
            <p><strong>The Accounting Adjustment:</strong></p>
            <p>Since Zenith Retail had zero liability recorded historically (cash basis), the entire ₹4,500,000 is the transitional liability.</p>
            <p>Under AS 15, this transitional liability should be adjusted immediately against the opening balance of **Revenue Reserves** (Retained Earnings), or charged to P&amp;L immediately. In corporate practice, it is adjusted directly against opening General Reserve / Retained Earnings to avoid distorting current year's profit.</p>
            <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono">
              <p>Retained Earnings / General Reserve A/c .. Dr. ₹4,500,000</p>
              <p>&nbsp;&nbsp;To Provision for Gratuity A/c ................. ₹4,500,000</p>
            </div>
          </div>
        )
      }
    ],
    examFocus: 'Do not charge transitional liability to the current year P&L; adjust it against opening Reserves and Surplus.',
    examFocusType: 'adjustment'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-15-1',
    title: 'Audit Case Study — Verification of Actuarial Assumptions (Audit Risk, Discount Rates & Salary Escalation)',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> During the audit of Zenith Net Ltd. (FY 2023-24), the auditor reviews the Actuarial Report for Gratuity valuation. The actuary has used a **discount rate of 6.5%** per annum.</p>
            <p>The auditor observes that the yield on 10-year Government of India Bonds as of 31st March 2024 was **7.2%**. Furthermore, the company assumed a **salary inflation rate of 4%**, whereas the actual salary increments given in the last two years averaged **8%**.</p>
          </div>
        )
      },
      {
        title: 'Auditor Analysis & Risk Assessment',
        content: (
          <div className="space-y-3 text-xs leading-relaxed">
            <p><strong>1. Discount Rate Assumption (Para 78):</strong> The rate used to discount post-employment benefit obligations should be determined by reference to market yields at the balance sheet date on **government bonds** (for India). Using 6.5% instead of 7.2% *overstates* the liability (an actuarial conservative bias), which the auditor must evaluate.</p>
            <p><strong>2. Salary Escalation Assumption (Para 84):</strong> Salary increments should take into account inflation, seniority, promotion, and other relevant factors. Assuming 4% salary growth when actual growth is 8% is an underestimation of future benefits, leading to an *understated* DBO.</p>
          </div>
        )
      },
      {
        title: 'Audit Adjustments & Report Notes',
        content: (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-250 dark:border-rose-900/40 rounded-xl text-xs space-y-2">
            <p className="font-bold text-rose-800 dark:text-rose-300">Auditor's Direct Action:</p>
            <p>The auditor must request the management to get a revised actuarial valuation using realistic salary inflation of 8% and bond yields of 7.2%. The net difference must be adjusted in the current year gratuity expense and disclosed under the actuarial assumptions table in footnotes.</p>
          </div>
        )
      }
    ],
    examFocus: 'Discount rates must be anchored to Govt Bond yields of similar maturity terms.',
    examFocusType: 'trap'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-15-1',
    title: 'Regulatory Observation — Gratuity Trust Funding and Tax Exemptions (Income Tax Rules Compliance)',
    category: 'Regulatory Observations',
    panels: [
      {
        title: 'Overview of Income Tax Provisions',
        content: (
          <div>
            <p>Under Section 36(1)(v) of the Income Tax Act, 1961, tax deductions for contributions to a Gratuity Fund are allowed **only if** the fund is an **Approved Gratuity Fund** registered with the Commissioner of Income Tax.</p>
            <p>Any provision for gratuity made in the books without establishing an approved trust is **disallowed** under Section 40A(7). This leads to a permanent difference or deferred tax asset timing difference under AS 22.</p>
          </div>
        )
      },
      {
        title: 'AS 15 Correlation & Disclosures',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>If a company maintains an unfunded scheme, the liability is fully recognized in the Balance Sheet, but the tax shield is deferred until actual cash payment. This requires creating a **Deferred Tax Asset (DTA)** under AS 22.</p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono">
              <p>Deferred Tax Asset A/c ......... Dr. [Tax portion of Gratuity Provision]</p>
              <p>&nbsp;&nbsp;To P&amp;L A/c (Tax Credit) ............... [Tax portion of Gratuity Provision]</p>
            </div>
          </div>
        )
      }
    ],
    examFocus: 'Gratuity provisions are disallowed for income tax purposes unless funded in an approved trust; ensure DTA is recognized.',
    examFocusType: 'adjustment'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'judicial-15-1',
    title: 'Landmark Judicial Case — Bharat Earth Movers vs. CIT (Taxability of Provision for Leave Encashment)',
    category: 'Landmark Judicial Cases',
    panels: [
      {
        title: 'Facts & Dispute',
        content: (
          <div>
            <p><strong>Supreme Court Precedent:</strong></p>
            <p>The company created a provision for leave encashment based on actuarial valuation for its employees. The Revenue department argued that the provision is contingent and not deductible under income tax law until the employees actually encash the leaves.</p>
          </div>
        )
      },
      {
        title: 'Supreme Court Ruling',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The Supreme Court held that if a business liability has definitely arisen in the current year, even if it is to be discharged at a future date, it is a **present liability** and not a contingent liability, provided it can be estimated with reasonable accuracy.</p>
            <p>This ruling forms the legal foundation for accounting for long-term compensated absences (leave encashment) under accrual concepts and **AS 15**.</p>
          </div>
        )
      }
    ],
    examFocus: 'Compensated absences (leave encashment) must be accounted for on an accrual/actuarial basis, not cash basis.',
    examFocusType: 'focus'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-15-1',
    title: 'Exam Corner — Compensated Absences (Accumulating vs Non-Accumulating Leaves Rules)',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'Accumulating Vesting Leaves',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Accumulating leaves can be carried forward. Vested leaves mean the employee is entitled to a cash payment for unused leaves upon leaving the company.</p>
            <p><strong>Accounting Rule:</strong> An enterprise must recognize a liability for accumulating vesting leaves on an **actuarial/expected usage basis** at the end of each year.</p>
          </div>
        )
      },
      {
        title: 'Non-Accumulating Leaves',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Non-accumulating leaves cannot be carried forward. They lapse if not used (e.g., sick leave or casual leave in some companies).</p>
            <p><strong>Accounting Rule:</strong> No liability is recognized for non-accumulating leaves because the benefit does not carry over. The cost is recognized only when the absence actually occurs.</p>
          </div>
        )
      }
    ],
    examFocus: 'Only accumulating leaves (whether vesting or non-vesting) require actuarial provision under AS 15.',
    examFocusType: 'trap'
  }
]
