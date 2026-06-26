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
    title={`Open ICAI AS 28 PDF — Page ${page}`}
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
    id: 'illus-28-1',
    title: 'ICAI Illustration 1 — Goodwill Allocation (Bottom-Up and Top-Down Tests)',
    category: 'Official ICAI Illustration',
    pdfPage: 13,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Acquisition:</strong> Enterprise M acquires Z for <strong>₹3,000 lakhs</strong>. Z has 3 CGUs: A (₹1,200 lakhs), B (₹800 lakhs), and C (₹400 lakhs). Goodwill recognized is <strong>₹600 lakhs</strong>.</p>
            <p className="mt-2"><strong>At the end of 20X4:</strong> CGU A makes significant losses. Its recoverable amount is estimated to be <strong>₹1,350 lakhs</strong>.</p>
            <p className="mt-1"><strong>Carrying amounts at end of 20X4:</strong> A = ₹1,300L, B = ₹1,200L, C = ₹800L, Goodwill = ₹120L. Total = ₹3,420L.</p>
          </div>
        )
      },
      {
        title: 'Scenario A: Goodwill Allocable',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Allocation:</strong> Goodwill allocated pro-rata based on fair values at acquisition (A: 50%, B: 33%, C: 17%):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>CGU A's Goodwill Share = 50% of ₹120L = <strong>₹60 lakhs</strong>.</li>
              <li>CGU A's Carrying Amount including Goodwill = ₹1,300L + ₹60L = <strong>₹1,360 lakhs</strong>.</li>
              <li>Recoverable Amount of CGU A = <strong>₹1,350 lakhs</strong>.</li>
              <li>Impairment Loss = ₹1,360L - ₹1,350L = <strong>₹10 lakhs</strong>.</li>
            </ul>
            <p><strong>Verdict:</strong> ₹10 lakhs impairment loss is recognized and allocated entirely to reduce CGU A's goodwill.</p>
          </div>
        )
      },
      {
        title: 'Scenario B: Goodwill Non-Allocable',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Bottom-Up Test (excluding Goodwill):</strong></p>
            <p>Carrying Amount of A (₹1,300L) vs Recoverable Amount (₹1,350L). No impairment under Bottom-Up Test.</p>
            <p className="mt-2"><strong>Top-Down Test (Z as a whole including Goodwill):</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Carrying Amount of Z = A (₹1,300L) + B (₹1,200L) + C (₹800L) + Goodwill (₹120L) = <strong>₹3,420 lakhs</strong>.</li>
              <li>Recoverable Amount of Z = <strong>₹3,400 lakhs</strong>.</li>
              <li>Impairment Loss = ₹3,420L - ₹3,400L = <strong>₹20 lakhs</strong>.</li>
            </ul>
            <p><strong>Verdict:</strong> Impairment loss of ₹20 lakhs is recognized and allocated entirely to goodwill.</p>
          </div>
        )
      }
    ],
    examFocus: 'Perform the Bottom-Up test first by comparing the CGU\'s carrying amount (excluding goodwill) to its recoverable amount. If goodwill cannot be allocated on a reasonable basis, perform the Top-Down test on the larger group of CGUs that includes goodwill.',
    examFocusType: 'trap'
  },
  {
    id: 'illus-28-2',
    title: 'ICAI Illustration 2 — Mine Site Restoration Provision (Carrying Amount of CGU)',
    category: 'Official ICAI Illustration',
    pdfPage: 12,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Situation:</strong> A mining company operates a mine where restoration is legally required. A provision for restoration of <strong>₹50,00,000</strong> (present value) has been recognized, capitalized as mine cost, and depreciated.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Total carrying amount of the mine = <strong>₹1,00,000,000</strong>.</li>
              <li>Offers to buy the mine (encompassing the restoration obligation) = <strong>₹80,00,000</strong> (Net Selling Price).</li>
              <li>Value in use excluding restoration costs = <strong>₹1,20,00,000</strong>.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Impairment Analysis',
        content: (
          <div className="space-y-2 text-xs">
            <p>To compare carrying amount and recoverable amount consistently, the restoration liability must be deducted from both:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>CGU Carrying Amount:</strong> ₹1,00,00,000 (Mine) - ₹50,00,000 (Provision) = <strong>₹50,00,000</strong>.</li>
              <li><strong>Net Selling Price:</strong> <strong>₹80,00,000</strong> (already includes the obligation takeover).</li>
              <li><strong>Value in Use:</strong> ₹1,20,00,000 - ₹50,00,000 (Provision) = <strong>₹70,00,000</strong>.</li>
              <li><strong>Recoverable Amount:</strong> Higher of Net Selling Price (₹80L) and Value in Use (₹70L) = <strong>₹80,00,000</strong>.</li>
            </ul>
            <p><strong>Verdict:</strong> Carrying Amount (₹50L) is less than Recoverable Amount (₹80L). Therefore, the mine is <strong>not impaired</strong>.</p>
          </div>
        )
      }
    ],
    examFocus: 'When a buyer is required to assume a liability, deduct the carrying amount of the liability from both the CGU\'s carrying amount and its Value in Use to ensure a consistent comparison.',
    examFocusType: 'concept'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'business-28-1',
    title: 'Value in Use (VIU) Discounting: Time Value of Money & Risk Assessments',
    category: 'Business Application Case',
    panels: [
      {
        title: 'Scenario',
        content: (
          <div>
            <p><strong>Case:</strong> MetalCast India Ltd. is testing a specialized blast furnace for impairment due to sudden market shifts. The furnace has a remaining useful life of 5 years. Expected cash flows are:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Year 1: ₹50,00,000</li>
              <li>Year 2: ₹40,00,050</li>
              <li>Year 3: ₹30,00,000</li>
              <li>Year 4: ₹20,00,000</li>
              <li>Year 5: ₹10,00,000</li>
            </ul>
            <p className="mt-2"><strong>Discount rate:</strong> Pre-tax market rate is 12%.</p>
          </div>
        )
      },
      {
        title: 'Computation & Discounting',
        content: (
          <div className="space-y-2 text-xs">
            <p>Applying the 12% discount factor (PV = CF / (1.12)^t):</p>
            <table className="w-full text-left border-collapse border border-slate-200 dark:border-gray-800 text-[11px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#1E2640]">
                  <th className="p-1 border border-slate-200 dark:border-gray-800">Year</th>
                  <th className="p-1 border border-slate-200 dark:border-gray-800">Cash Flow (₹)</th>
                  <th className="p-1 border border-slate-200 dark:border-gray-800">PV Factor (12%)</th>
                  <th className="p-1 border border-slate-200 dark:border-gray-800">Present Value (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-1 border">1</td><td className="p-1 border">50,00,000</td><td className="p-1 border">0.8929</td><td className="p-1 border">44,64,500</td></tr>
                <tr><td className="p-1 border">2</td><td className="p-1 border">40,00,000</td><td className="p-1 border">0.7972</td><td className="p-1 border">31,88,800</td></tr>
                <tr><td className="p-1 border">3</td><td className="p-1 border">30,00,000</td><td className="p-1 border">0.7118</td><td className="p-1 border">21,35,400</td></tr>
                <tr><td className="p-1 border">4</td><td className="p-1 border">20,00,000</td><td className="p-1 border">0.6355</td><td className="p-1 border">12,71,000</td></tr>
                <tr><td className="p-1 border">5</td><td className="p-1 border">10,00,000</td><td className="p-1 border">0.5674</td><td className="p-1 border">5,67,400</td></tr>
                <tr className="font-bold"><td className="p-1 border" colSpan={3}>Value in Use (Total PV)</td><td className="p-1 border">1,16,27,100</td></tr>
              </tbody>
            </table>
            <p className="mt-1">If the carrying amount is ₹1,30,00,000 and the net selling price is ₹95,00,000, the recoverable amount is ₹1,16,27,100, resulting in an impairment loss of <strong>₹13,72,900</strong>.</p>
          </div>
        )
      }
    ],
    examFocus: 'Always use a pre-tax discount rate that reflects the market assessment of time value of money and risks specific to the asset. Do not include cash flows from financing or tax receipts/payments.',
    examFocusType: 'focus'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-28-1',
    title: 'Audit Program: Verifying Impairment Indicators & Impairment Write-offs',
    category: 'Audit Checklist Case',
    panels: [
      {
        title: 'Audit Objectives',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Key Objectives:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Confirm that the entity has performed an annual audit for impairment indicators (external and internal).</li>
              <li>Verify the cash flow projections used in Value in Use computations against past performance and approved budgets.</li>
              <li>Check that the impairment loss is correctly allocated first to goodwill, and then pro-rata to other assets of the CGU.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Audit Procedures & Checkpoints',
        content: (
          <div className="space-y-2 text-xs">
            <ul className="list-disc pl-5 space-y-1">
              <li>Evaluate if the growth rate used to extrapolate cash flows exceeds the long-term average growth rate for the industry or country.</li>
              <li>Check if the asset carrying amount is not reduced below the highest of its Net Selling Price, Value in Use, or Zero.</li>
              <li>Examine if the post-impairment depreciation charges are recalculated prospectively over the remaining useful life.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Audit verification must check that the discount rate used is a pre-tax rate, and cash flows from future uncommitted restructurings or enhancements are excluded.',
    examFocusType: 'focus'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-28-1',
    title: 'Regulatory Observation: Reversing Prior Period Impairment Losses',
    category: 'Regulatory Observation',
    panels: [
      {
        title: 'Scenario',
        content: (
          <div>
            <p><strong>Situation:</strong> ChemSynth India Ltd. recognized an impairment loss of ₹40,00,000 on its plant in 20X1. In 20X3, market conditions improved significantly, and the company wishes to reverse the entire impairment loss, bringing the carrying amount to its new recoverable amount of ₹1,20,00,000.</p>
            <p className="mt-2"><strong>Issue:</strong> What is the limit/cap on reversing impairment losses under AS 28?</p>
          </div>
        )
      },
      {
        title: 'Resolution',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Rule (Para 99):</strong> The carrying amount of an asset should not be increased above the carrying amount that would have been determined (net of depreciation) had no impairment loss been recognized in prior periods.</p>
            <p>If the hypothetical carrying amount (had no impairment been recognized) is ₹1,05,00,000, then the asset carrying amount is capped at <strong>₹1,05,00,000</strong>. The excess of ₹15,00,000 represents a revaluation (governed by AS 10, not AS 28 reversal).</p>
          </div>
        )
      }
    ],
    examFocus: 'The reversal of an impairment loss is capped at the carrying amount that would have been determined had no impairment loss been recognized in prior periods. Reversal of goodwill impairment is strictly prohibited.',
    examFocusType: 'trap'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'judicial-28-1',
    title: 'Landmark Precedents: Restructuring Commitments & Value in Use Cash Flows',
    category: 'Judicial Precedent Case',
    panels: [
      {
        title: 'Ruling Principles',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Key Principles:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>In determining Value in Use, future cash flows from restructuring can only be included if the enterprise is already committed to the restructuring (i.e., a detailed formal plan has been announced or implementation has started).</li>
              <li>Excluding uncommitted capital expenditures ensures that value in use reflects the asset\'s current condition, preventing companies from inflating value in use using speculative future investments.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Do not include cost savings or benefits from future restructurings in cash flow projections until the company is contractually committed to the restructuring.',
    examFocusType: 'concept'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-28-1',
    title: 'Exam Corner — Pro-Rata Allocation of Impairment Loss & Individual Asset Caps',
    category: 'Exam Corner',
    panels: [
      {
        title: 'Problem Statement',
        content: (
          <div>
            <p><strong>Scenario:</strong> A CGU suffers an impairment loss of <strong>₹8,00,000</strong>. The carrying amounts of assets in the CGU are:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Goodwill: ₹2,00,000</li>
              <li>Building (Net Selling Price = ₹42,00,000): Carrying Amount = ₹45,00,000</li>
              <li>Plant &amp; Machinery: Carrying Amount = ₹30,00,000</li>
              <li>Equipment: Carrying Amount = ₹15,00,000</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Step-by-Step Allocation',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Step 1:</strong> Allocate loss to Goodwill first = <strong>₹2,00,000</strong>. Remaining loss = <strong>₹6,00,000</strong>.</p>
            <p><strong>Step 2:</strong> Allocate remaining ₹6,00,000 pro-rata to other assets (Building: 45L, Plant: 30L, Equipment: 15L. Ratio 45:30:15 or 3:2:1):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Building Share = 3/6 * 6L = <strong>₹3,00,000</strong>. New value would be ₹42,00,000 (equals its Net Selling Price. Capped!).</li>
              <li>Plant Share = 2/6 * 6L = <strong>₹2,00,000</strong>. New value = ₹28,00,000.</li>
              <li>Equipment Share = 1/6 * 6L = <strong>₹1,00,000</strong>. New value = ₹14,00,000.</li>
            </ul>
            <p className="mt-1"><strong>Note:</strong> If Building\'s share had reduced it below its Net Selling Price (e.g. if the share was ₹4,00,000, bringing it to ₹41,00,000), the loss allocated to it would be capped at ₹3,00,000, and the excess ₹1,00,000 would be re-allocated pro-rata to the Plant and Equipment.</p>
          </div>
        )
      }
    ],
    examFocus: 'Do not reduce an individual asset\'s carrying amount below the higher of its Net Selling Price (if determinable), Value in Use (if determinable), or Zero. Re-allocate any excess to other assets pro-rata.',
    examFocusType: 'trap'
  }
]
