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
    title={`Open ICAI AS 12 PDF — Page ${page}`}
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
    id: 'illus-12-1',
    title: 'ICAI Illustration 1 — Specific Fixed Asset Grant (Deduction vs Deferred Income Methods)',
    category: 'Official ICAI Illustration',
    pdfPage: 6,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Narmada Chemicals Ltd. (FY 2023-24)</p>
            <p><strong>Transactions:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Asset Acquired: Special pollution control reactor</li>
              <li>Cost of Reactor: <strong>₹20,00,000</strong></li>
              <li>Useful Life: <strong>5 Years</strong> (Salvage value is zero; straight-line depreciation)</li>
              <li>Government Grant received for this reactor: <strong>₹4,00,000</strong></li>
            </ul>
            <p className="mt-2">The company wants to evaluate both presentation options allowed under AS 12.</p>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div className="space-y-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg text-xs font-mono">
              <span className="font-bold text-blue-600 block mb-1">Method A: Reduction from Asset Cost</span>
              <p>Gross cost of reactor = ₹20,00,000</p>
              <p>Less: Government Grant = ₹4,00,000</p>
              <p>Net Book Value = <strong>₹16,00,000</strong></p>
              <p>Annual Depreciation = ₹16,00,000 / 5 Years = <strong>₹3,20,000 per year</strong></p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg text-xs font-mono">
              <span className="font-bold text-amber-600 block mb-1">Method B: Deferred Income Approach</span>
              <p>Reactor Book Value = <strong>₹20,00,000</strong></p>
              <p>Annual Depreciation = ₹20,00,000 / 5 Years = <strong>₹4,00,000 per year</strong></p>
              <p>Deferred Grant account credit balance = ₹4,00,000</p>
              <p>Annual Grant credit to P&amp;L = ₹4,00,000 / 5 Years = <strong>₹80,000 per year</strong></p>
              <p>Net P&amp;L impact = ₹4,00,000 (Depr) − ₹80,000 (Grant credit) = <strong>₹3,20,000 net expense</strong></p>
            </div>
          </div>
        )
      },
      {
        title: 'Journal Postings',
        content: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl">
              <span className="font-bold text-blue-650 block mb-2">Method A (Cost Reduction)</span>
              1. Reactor A/c ...... Dr. ₹20,00,000<br />
              &nbsp;&nbsp;&nbsp;&nbsp;To Bank A/c ..................... ₹20,00,000<br />
              2. Bank A/c ......... Dr. ₹4,00,000<br />
              &nbsp;&nbsp;&nbsp;&nbsp;To Reactor A/c .................. ₹4,00,000<br />
              3. Depreciation A/c . Dr. ₹3,20,000<br />
              &nbsp;&nbsp;&nbsp;&nbsp;To Reactor A/c .................. ₹3,20,000
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl">
              <span className="font-bold text-amber-650 block mb-2">Method B (Deferred Income)</span>
              1. Reactor A/c ...... Dr. ₹20,00,000<br />
              &nbsp;&nbsp;&nbsp;&nbsp;To Bank A/c ..................... ₹20,00,000<br />
              2. Bank A/c ......... Dr. ₹4,00,000<br />
              &nbsp;&nbsp;&nbsp;&nbsp;To Deferred Grant A/c ........... ₹4,00,000<br />
              3. Depreciation A/c . Dr. ₹4,00,000<br />
              &nbsp;&nbsp;&nbsp;&nbsp;To Reactor A/c .................. ₹4,00,000<br />
              4. Deferred Grant A/c Dr. ₹80,000<br />
              &nbsp;&nbsp;&nbsp;&nbsp;To P&amp;L A/c ...................... ₹80,000
            </div>
          </div>
        )
      }
    ],
    examFocus: "Note that while the net impact on the Profit & Loss statement is identical (₹3,20,000 net expense) in both methods, the presentation on the Balance Sheet is different. Method A shows reactor at net cost, while Method B shows reactor at gross cost with a liability component in equity/liabilities.",
    examFocusType: 'focus'
  },
  {
    id: 'illus-12-2',
    title: 'ICAI Illustration 2 — Refund of Government Grant (Depreciable Asset Adjustments)',
    category: 'Official ICAI Illustration',
    pdfPage: 8,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>The Situation:</strong> Continuing from Illustration 1. In Year 3 (start of the year), the government finds that Narmada Chemicals violated environmental conditions. The entire <strong>₹4,00,000</strong> grant must be refunded immediately.</p>
            <p><strong>Accounting challenge:</strong> Adjust the carrying value of the asset and the deferred grant balance, and compute the new depreciation for the remaining 3 years of the asset's useful life.</p>
          </div>
        )
      },
      {
        title: 'Refund Computations (Method A)',
        content: (
          <div>
            <span className="font-bold text-blue-600 block mb-2 text-xs">Method A: Grant was originally deducted from Cost</span>
            <div className="space-y-2 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
              <p>Original cost = ₹20,00,000; Grant = ₹4,00,000</p>
              <p>Carrying value at start of Year 3 = ₹16,00,000 − (2 × ₹3,20,000 depreciation) = <strong>₹9,60,000</strong></p>
              <p>Refund amount = <strong>₹4,00,000</strong></p>
              <p>New Carrying Value (after refund addition) = ₹9,60,000 + ₹4,00,000 = <strong>₹13,60,000</strong></p>
              <p>Remaining useful life = 3 Years</p>
              <p>New annual depreciation = ₹13,60,000 / 3 Years = <strong>₹4,53,333 per year</strong></p>
            </div>
          </div>
        )
      },
      {
        title: 'Refund Computations (Method B)',
        content: (
          <div>
            <span className="font-bold text-amber-600 block mb-2 text-xs">Method B: Grant was originally treated as Deferred Income</span>
            <div className="space-y-2 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
              <p>Remaining balance in Deferred Grant A/c = ₹4,00,000 − (2 × ₹80,000 amortised) = <strong>₹2,40,000</strong></p>
              <p>Total refund liability = <strong>₹4,00,000</strong></p>
              <p>Debit Deferred Grant A/c to clear the remaining balance = <strong>₹2,40,000</strong></p>
              <p>Charge the balance refund amount to P&amp;L (as an extraordinary item) = ₹4,00,000 − ₹2,40,000 = <strong>₹1,60,000 Debit to P&amp;L</strong></p>
              <p>Reactor value remains unaffected at ₹20,00,000 (carrying value = ₹12,00,000). Depreciation for Year 3, 4, 5 remains <strong>₹4,00,000 per year</strong>.</p>
            </div>
          </div>
        )
      },
      {
        title: 'Journal Postings',
        content: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl">
              <span className="font-bold text-blue-650 block mb-2">Method A (Cost Adjustment)</span>
              1. Reactor A/c .............. Dr. ₹4,00,000<br />
              &nbsp;&nbsp;&nbsp;&nbsp;To Bank A/c (Refund) ............. ₹4,00,000<br />
              <br />
              2. Depreciation A/c ......... Dr. ₹4,53,333<br />
              &nbsp;&nbsp;&nbsp;&nbsp;To Reactor A/c ................... ₹4,53,333
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl">
              <span className="font-bold text-amber-650 block mb-2">Method B (Deferred Income Adjustment)</span>
              1. Deferred Grant A/c ....... Dr. ₹2,40,000<br />
              &nbsp;&nbsp;&nbsp;&nbsp;P&amp;L A/c (Extraordinary) ... Dr. ₹1,60,000<br />
              &nbsp;&nbsp;&nbsp;&nbsp;To Bank A/c (Refund) ............. ₹4,00,000<br />
              <br />
              2. Depreciation A/c ......... Dr. ₹4,00,000<br />
              &nbsp;&nbsp;&nbsp;&nbsp;To Reactor A/c ................... ₹4,00,000
            </div>
          </div>
        )
      }
    ],
    examFocus: "In Method A, the refund is capitalized (added back to the asset carrying value). This is not considered an error or retrospective change; instead, you calculate depreciation prospectively over the remaining life.",
    examFocusType: 'trap'
  }
];

export const businessCases: CaseStudy[] = [
  {
    id: 'bus-12-1',
    title: 'Business Case 1 — Promoter\'s Contribution for North-East Industrial Development (NEIDS)',
    category: 'Commercial Subsidy Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Pragati Steel &amp; Infrastructure Ltd. (FY 2022-23)</p>
            <p><strong>The Incentive:</strong> Set up a steel rolling mill in Assam. Under the North East Industrial Development Scheme (NEIDS), the central government grants a capital incentive of **₹50,00,000** for setting up the industry.</p>
            <p><strong>Key condition:</strong> The subsidy is granted on the basis of total investment made in the project. There is no specific requirement to buy any particular equipment, and no direct repayment terms exist unless the industry shuts down within 5 years.</p>
          </div>
        )
      },
      {
        title: 'AS 12 Accounting Treatment',
        content: (
          <div>
            <p>Under AS 12 (Para 10), when a government grant is in the nature of **Promoters\' Contribution**:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>It is given as an incentive to establish an enterprise in a backward region, where the grant has no direct relation to any specific asset purchase.</li>
              <li>Such grants should be credited directly to **Capital Reserve** and treated as part of Shareholders\' Funds.</li>
              <li>They cannot be treated as deferred income or credited to the Profit &amp; Loss account as operational income.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Journal Postings',
        content: (
          <div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl font-mono text-xs leading-relaxed">
              <strong>On receipt of government grant:</strong><br />
              &nbsp;&nbsp;&nbsp;Bank A/c ..................... Dr. ₹50,00,000<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To Capital Reserve A/c .......................... ₹50,00,000<br />
              <br />
              <em>(Note: Capital Reserve is displayed under the head "Reserves &amp; Surplus" in the Balance Sheet)</em>
            </div>
          </div>
        )
      }
    ],
    examFocus: "Do not credit promoters' contributions to the Statement of Profit & Loss, as it is a capital item. Any refund of such grant must be debited directly to the Capital Reserve account.",
    examFocusType: 'focus'
  }
];

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-12-1',
    title: 'Audit Case Study 1 — NFRA Zenith Grants Case: Misclassifying Power Subsidies in Capital Reserve',
    category: 'NFRA Audit Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Ferro Alloys Ltd. (FY 2021-22)</p>
            <p><strong>The Transaction:</strong> The state government provided Zenith with a power tariff concession of **₹8 Crores** during the year. This concession was granted to help local smelting industries survive a severe market slowdown.</p>
            <p><strong>Company\'s Action:</strong> Zenith credited the ₹8 Crores directly to its **Capital Reserve**, arguing that the subsidy was a 'promoter\'s contribution' to support capital solvency.</p>
          </div>
        )
      },
      {
        title: 'NFRA Investigation & Violations',
        content: (
          <div>
            <p>NFRA investigated the treatment and identified the following structural failures:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-700 dark:text-slate-350">
              <li><strong>Revenue Nature:</strong> The power subsidy was meant to offset operational electricity costs. It had no relationship with establishing a new project or backward region capital investment.</li>
              <li><strong>Violation of AS 12:</strong> Power subsidies are operational/revenue grants. Under AS 12, they must be recognized in the Statement of Profit and Loss to match the corresponding costs.</li>
              <li><strong>Impact:</strong> Zenith had artificially inflated its Shareholders\' Funds and under-reported its net operational expenses by ₹8 Crores.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Audit Checklist for Government Subsidies',
        content: (
          <div>
            <p className="font-semibold text-xs mb-1">Auditor Action Points:</p>
            <ul className="list-disc pl-5 text-xs space-y-1">
              <li>Review the government sanction letter for every grant to identify the core conditions and target expenses.</li>
              <li>Verify that recurring operational subsidies are routed to the P&amp;L, not capital reserves.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: "In exams, if you see a subsidy related to operating costs (e.g. wages, electricity, rent), it must be routed to the P&L. Crediting it to Capital Reserve is a severe auditing error.",
    examFocusType: 'trap'
  }
];

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-12-1',
    title: 'Regulatory Observation 1 — MCA clarification on Non-Monetary Government Grants',
    category: 'MCA Circular',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>The Query:</strong> A state government gave a parcel of land to a manufacturing company free of cost for setting up a factory. The company wanted to record the land at its fair market value of ₹1.5 Crores, and credit a corresponding amount to Capital Reserve.</p>
          </div>
        )
      },
      {
        title: 'Regulatory Clarification',
        content: (
          <div>
            <p>Under AS 12 (Para 15), non-monetary government grants (like land, buildings, or equipment given free of cost or at concessional rates) must be accounted for as follows:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>If the grant is given **free of cost**, the asset must be recorded at a **nominal value** (typically ₹1) in the books.</li>
              <li>If it is given at a **concessional rate**, it must be recorded at the actual **acquisition cost** (price paid).</li>
              <li>Recording land at fair value with a corresponding credit to capital reserve when no cash was paid is **prohibited**.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: "This is a frequent MCQ and short-note question. Remember: Free land from government = Record at nominal value (₹1). Concessional rate land = Record at actual price paid.",
    examFocusType: 'focus'
  },
  {
    id: 'reg-12-2',
    title: 'Regulatory Observation 2 — Presentation of Revenue Grants: Netting-off vs. Gross Presentation',
    category: 'Regulatory Observations',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> Zenith Garments Ltd. receives a wage subsidy of **₹12,00,000** from the Ministry of Textiles to encourage employment. Total employee benefit expenses for the year were ₹1,50,00,000.</p>
            <p className="mt-2">The management wants to understand the presentation choices under AS 12 and the impact on financial ratios (e.g., operating margin).</p>
          </div>
        )
      },
      {
        title: 'AS 12 Presentation Options (Para 20)',
        content: (
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg text-xs font-mono">
              <span className="font-bold text-blue-600 block mb-1">Option A: Gross Presentation</span>
              <p>grants related to revenue are presented as **"Other Income"** in the Statement of Profit &amp; Loss.</p>
              <p>Employee Benefit Expense = ₹1,50,00,000</p>
              <p>Other Income (Grant) = <strong>₹12,00,000</strong></p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg text-xs font-mono">
              <span className="font-bold text-amber-600 block mb-1">Option B: Net Presentation (Deduction Method)</span>
              <p>grants are deducted from the related expense in the Statement of Profit &amp; Loss.</p>
              <p>Employee Benefit Expense (Net) = ₹1,50,00,000 − ₹12,00,000 = <strong>₹1,38,00,000</strong></p>
              <p>Other Income = Nil</p>
            </div>
          </div>
        )
      }
    ],
    examFocus: 'Both presentations are fully permitted under AS 12. Option B (Net Presentation) artificially improves operating expense ratios, which auditors must verify and disclose.',
    examFocusType: 'adjustment'
  }
];

export const judicialCases: CaseStudy[] = [
  {
    id: 'jud-12-1',
    title: 'Judicial Case 1 — CIT vs. Ponni Sugars (Tax Treatment of Capital Subsidies)',
    category: 'Supreme Court Precedent',
    panels: [
      {
        title: 'The Tax Controversy',
        content: (
          <div>
            <p><strong>The Dispute:</strong> The company received a subsidy scheme to set up sugar factories. The scheme was linked to sales tax collected, which was returned as a subsidy. The income tax department argued that since the subsidy was paid out of sales tax, it was a taxable revenue receipt.</p>
          </div>
        )
      },
      {
        title: 'Supreme Court Ruling',
        content: (
          <div>
            <p>The Supreme Court established the **"Purpose Test"** for government grants:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>The form of the subsidy or the mechanism of its payment (e.g. sales tax refund) is irrelevant.</li>
              <li>What matters is the **purpose** of the subsidy. If the purpose is to enable the taxpayer to set up a new unit or capital asset, it is a **capital receipt** and not taxable.</li>
              <li>If the purpose is to assist the taxpayer in carrying out business operations, it is a **revenue receipt** and taxable.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: "The Purpose Test is also the core accounting boundary under AS 12. If a grant supports the capital structure (Capital Reserve), it matches the tax definition of capital receipt.",
    examFocusType: 'focus'
  },
  {
    id: 'jud-12-2',
    title: 'Judicial Case 2 — CIT vs. Sahney Steel & Press Works Ltd. (Operational Subsidies vs Capital Incentives)',
    category: 'Supreme Court Precedent',
    panels: [
      {
        title: 'Legal Dispute',
        content: (
          <div>
            <p><strong>The Context:</strong> The state government provided refunds of sales tax, power concessions, and water rate exemptions to Sahney Steel after they commenced production. The company claimed these subsidies were capital receipts because they were granted to incentivize industrial growth.</p>
          </div>
        )
      },
      {
        title: 'Supreme Court Ruling & Distinction',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The Supreme Court ruled that subsidies given to an enterprise **after commencement of production** to assist in operating expenses (like power, sales tax, water rates) are **revenue receipts** and taxable.</p>
            <p className="mt-2">**Distinction from Ponni Sugars:** In Ponni Sugars, the subsidy was given to help set up the capital assets (sugar mill) before or at inception. In Sahney Steel, the subsidy was operational assistance to keep the business running. Under AS 12, operational subsidies must be credited to P&amp;L (not Capital Reserve).</p>
          </div>
        )
      }
    ],
    examFocus: 'Subsidies linked to post-production operating parameters (like power, water, tax refunds) are revenue grants and must be recognized in P&L.',
    examFocusType: 'concept'
  }
];

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-12-1',
    title: 'Exam Corner 1 — Combined Asset Depreciation & Grant Refund calculations',
    category: 'Exam Corner',
    panels: [
      {
        title: 'The Exam Problem',
        content: (
          <div>
            <p><strong>Question:</strong> ABC Ltd. bought a machine for ₹10,00,000 (life 4 years, SLM depreciation). The government gave a grant of ₹3,00,000. At the start of Year 3, the government demanded a refund of the entire ₹3,00,000. Calculate depreciation for Year 3 and Year 4 under both Cost Reduction and Deferred Income methods.</p>
          </div>
        )
      },
      {
        title: 'Model Answer & Calculations',
        content: (
          <div className="space-y-4 text-xs font-mono">
            <div>
              <span className="font-bold text-blue-600 block">Method 1: Cost Reduction Method</span>
              <p>Year 1 &amp; 2 Depreciation = (10,00,000 − 3,00,000) / 4 = ₹1,75,000 per year</p>
              <p>Carrying value at start of Year 3 = 7,00,000 − 2 × 1,75,000 = ₹3,50,000</p>
              <p>Add: Refund = ₹3,00,000</p>
              <p>Adjusted carrying value = ₹6,50,000</p>
              <p>Depreciation for Year 3 &amp; 4 = ₹6,50,000 / 2 = <strong>₹3,25,000 per year</strong></p>
            </div>
            <div>
              <span className="font-bold text-amber-600 block">Method 2: Deferred Income Method</span>
              <p>Year 1 &amp; 2 Depreciation = 10,00,000 / 4 = ₹2,50,000 per year</p>
              <p>Carrying value at start of Year 3 = ₹5,00,000</p>
              <p>Deferred Grant balance at start of Year 3 = ₹3,00,000 − (2 × ₹75,000 amortised) = ₹1,50,000</p>
              <p>Refund amount = ₹3,00,000</p>
              <p>Debit Deferred Grant with ₹1,50,000 (clearing it). Charge the remaining ₹1,50,000 to P&amp;L as an extraordinary item.</p>
              <p>Depreciation for Year 3 &amp; 4 remains <strong>₹2,50,000 per year</strong>.</p>
            </div>
          </div>
        )
      }
    ],
    examFocus: "Double check whether the question asks for SLM or WDV depreciation. The refund addition logic is identical, but WDV calculations require applying rates to the adjusted book value.",
    examFocusType: 'trick'
  },
  {
    id: 'exam-12-2',
    title: 'Exam Corner 2 — Grant for Non-Depreciable Asset with Construction Obligations',
    category: 'Exam Corner',
    panels: [
      {
        title: 'The Conceptual Question',
        content: (
          <div>
            <p><strong>Question:</strong> Zenith Group is granted a parcel of land by the government on the condition that they construct a staff housing colony on it. The land fair value is ₹40,00,000 (granted at a nominal price of ₹10,000). The colony construction cost is ₹2,00,00,000 with a useful life of 20 years. How should this grant be recognized?</p>
          </div>
        )
      },
      {
        title: 'Accounting Solution (Para 14)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>1. **Grant Valuation:** Since the land is granted at a concessional rate of ₹10,000, it is recorded in the books at ₹10,000 (Actual Cost Method, Para 15).</p>
            <p>2. **Amortization Rule (Para 14):** Government grants related to non-depreciable assets that require fulfillment of certain obligations are recognized as income **over the periods which bear the cost of meeting the obligations**.</p>
            <p className="mt-2">Thus, if the company did capitalize the land at fair value, the grant would be deferred and amortized to P&amp;L over the **20-year useful life** of the staff colony constructed on it, in proportion to the depreciation of the colony.</p>
          </div>
        )
      }
    ],
    examFocus: 'For non-depreciable assets with obligations, the grant is amortized over the life of the constructed asset, not recognized as immediate income.',
    examFocusType: 'concept'
  }
];
