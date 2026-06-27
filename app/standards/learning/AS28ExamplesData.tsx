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
    title={`Open ICAI AS 28 PDF — Page ${page}`}
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
    id: 'illus-28-1',
    title: 'ICAI Illustration 1 — Value in Use Computation (Discounted Cash Flow Method for Impairment Testing)',
    category: 'Official ICAI Illustration',
    pdfPage: 18,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Asset Under Test:</strong> A manufacturing plant of Zenith Ltd. with carrying amount of ₹120,00,000 as at 31 March 2024.</p>
            <p className="mt-2"><strong>Projected Cash Flows from the Plant:</strong></p>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-xs font-mono border-collapse border border-slate-200 dark:border-slate-800">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-900">
                    <th className="border p-2">Year</th>
                    <th className="border p-2">Cash Flow (₹)</th>
                    <th className="border p-2">Discount Factor @12%</th>
                    <th className="border p-2">PV (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">1</td><td className="border p-2">30,00,000</td><td className="border p-2">0.893</td><td className="border p-2">26,79,000</td></tr>
                  <tr className="bg-blue-50/10 dark:bg-blue-900/5"><td className="border p-2">2</td><td className="border p-2">28,00,000</td><td className="border p-2">0.797</td><td className="border p-2">22,31,600</td></tr>
                  <tr><td className="border p-2">3</td><td className="border p-2">25,00,000</td><td className="border p-2">0.712</td><td className="border p-2">17,80,000</td></tr>
                  <tr className="bg-blue-50/10 dark:bg-blue-900/5"><td className="border p-2">4</td><td className="border p-2">22,00,000</td><td className="border p-2">0.636</td><td className="border p-2">13,99,200</td></tr>
                  <tr><td className="border p-2">5 + Terminal</td><td className="border p-2">20,00,000 + ₹18,00,000</td><td className="border p-2">0.567</td><td className="border p-2">21,55,400</td></tr>
                  <tr className="font-bold bg-slate-100 dark:bg-slate-900"><td className="border p-2" colSpan={3}>Value in Use</td><td className="border p-2">₹1,02,45,200</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      },
      {
        title: 'Impairment Loss Computation',
        content: (
          <div className="space-y-2 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>Fair Value Less Costs to Sell:</strong> ₹95,00,000 (from broker quote)</p>
            <p><strong>Value in Use:</strong> ₹1,02,45,200 (computed above)</p>
            <p className="font-sans"><strong>Recoverable Amount = Higher of the two = ₹1,02,45,200</strong></p>
            <hr className="my-2 border-slate-300 dark:border-slate-700" />
            <p><strong>Carrying Amount:</strong> ₹1,20,00,000</p>
            <p><strong>Recoverable Amount:</strong> ₹1,02,45,200</p>
            <p className="font-bold">Impairment Loss = ₹1,20,00,000 − ₹1,02,45,200 = ₹17,54,800</p>
          </div>
        )
      },
      {
        title: 'Accounting for the Impairment',
        content: (
          <div className="space-y-2 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p className="font-sans font-bold">Journal Entry:</p>
            <p>Dr. Impairment Loss (P&amp;L)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹17,54,800</p>
            <p>&nbsp;&nbsp;Cr. Accumulated Impairment Loss (B/S)&nbsp;₹17,54,800</p>
            <p className="font-sans mt-2">(The asset is written down to its recoverable amount. Future depreciation is calculated on the reduced carrying amount.)</p>
          </div>
        )
      },
      {
        title: 'Post-Impairment Depreciation',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>After recognizing the impairment loss, depreciation in future periods must be based on the <strong>revised carrying amount</strong> (₹1,02,45,200), not the original carrying amount.</p>
            <p>If remaining useful life = 3 years (SLM): New annual depreciation = ₹1,02,45,200 ÷ 3 = ₹34,15,067 per year.</p>
            <p className="mt-2"><strong>Reversal Possibility:</strong> If future indicators show asset value has recovered, the impairment can be partially reversed (up to the carrying amount that would have existed without impairment). Para 109.</p>
          </div>
        )
      }
    ],
    examFocus: 'Recoverable Amount = HIGHER of (Fair Value less Costs to Sell) and (Value in Use). Impairment Loss = Carrying Amount minus Recoverable Amount.',
    examFocusType: 'trap'
  },
  {
    id: 'illus-28-2',
    title: 'ICAI Illustration 2 — Cash Generating Unit (CGU) Identification and Goodwill Allocation',
    category: 'Official ICAI Illustration',
    pdfPage: 25,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> Zenith Group acquired a retail chain (50 stores) for ₹500 crores, paying ₹120 crores of goodwill. The carrying amount of the entire retail division is ₹600 crores.</p>
            <p className="mt-2">Individual stores cannot generate independent cash flows. The smallest group of stores that generates identifiable cash inflows = the regional cluster (10 stores per region, 5 regions).</p>
          </div>
        )
      },
      {
        title: 'CGU Identification (Para 65)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>A <strong>Cash Generating Unit (CGU)</strong> is the smallest identifiable group of assets that generates cash inflows that are largely independent of the cash inflows from other assets or groups of assets.</p>
            <p><strong>Analysis:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Individual stores: NOT independent — use shared supply chain, brand, and management</li>
              <li>Regional cluster (10 stores): Independently manages pricing, inventory, and sourcing for its market area → <strong>Qualifies as a CGU</strong></li>
            </ul>
            <p className="mt-2">Therefore: 5 CGUs (one per region). Goodwill of ₹120Cr allocated proportionately = ₹24Cr per CGU.</p>
          </div>
        )
      },
      {
        title: 'Impairment Test at CGU Level',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Goodwill cannot be tested for impairment independently — it must be allocated to CGUs and tested at CGU level (Para 78).</p>
            <p>If Region 3 CGU has:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Carrying amount (incl. goodwill ₹24Cr): ₹120 crores</li>
              <li>Recoverable amount (VIU): ₹95 crores</li>
              <li>Impairment loss = ₹25 crores</li>
            </ul>
            <p className="mt-2"><strong>Allocation of Impairment Loss (Para 104):</strong></p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>First, reduce goodwill of the CGU: ₹24 crores</li>
              <li>Remaining ₹1 crore: allocated pro-rata to other assets of CGU</li>
            </ol>
          </div>
        )
      }
    ],
    examFocus: 'When a CGU has goodwill AND other assets, impairment loss is FIRST applied to goodwill, then pro-rata to other assets. Goodwill absorbs the loss first.',
    examFocusType: 'focus'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-28-1',
    title: 'Business Case — Real Estate Developer: Impairment Indicators & Timing of Impairment Test',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Sunrise Realty Ltd. holds land parcels at a total cost of ₹800 crores.</p>
            <p className="mt-2"><strong>External Indicators (FY 2023-24):</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Real estate market in the micro-market declined 25% during the year</li>
              <li>Government imposed new construction restrictions in one zone</li>
              <li>Interest rates rose 200 bps, affecting buyer affordability</li>
            </ul>
            <p><strong>Internal Indicators:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Company scrapped 3 planned projects due to unviability</li>
              <li>Land intended for commercial use now proposed to be converted to residential (lower realization)</li>
            </ul>
          </div>
        )
      },
      {
        title: 'AS 28 Impairment Indicator Assessment (Para 8-9)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 9 provides a non-exhaustive list of <strong>external impairment indicators</strong>:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Significant decline in asset's market value during the period</li>
              <li>Significant adverse changes in technological, market, economic, or legal environment</li>
              <li>Increase in market interest rates that are likely to materially affect the recoverable amount</li>
            </ul>
            <p className="mt-2">Para 10 — <strong>Internal impairment indicators</strong>:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Evidence of obsolescence or physical damage of an asset</li>
              <li>Significant changes in the manner in which an asset is used or expected to be used</li>
              <li>Economic performance of an asset is, or will be, worse than expected</li>
            </ul>
            <p className="mt-2"><strong>Conclusion:</strong> Both external and internal indicators are present. Sunrise Realty <strong>must perform an impairment test</strong> at balance sheet date.</p>
          </div>
        )
      },
      {
        title: 'Recoverable Amount Estimation',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>For land parcels, the primary measure is typically <strong>Fair Value Less Costs to Sell</strong> (FVLCTS), since land often has an active market.</p>
            <p>Obtained independent valuation reports:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Land Bank A (400 acres): Market value ₹350Cr. Costs to sell (brokerage, legal) = ₹15Cr. FVLCTS = ₹335Cr. Carrying: ₹300Cr → No impairment.</li>
              <li>Land Bank B (200 acres): Market value ₹180Cr. Costs = ₹10Cr. FVLCTS = ₹170Cr. Carrying: ₹240Cr → <strong>Impairment = ₹70Cr</strong>.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Impairment testing is triggered by indicators — not required annually for all assets (only goodwill and intangibles with indefinite lives require annual testing).',
    examFocusType: 'concept'
  },
  {
    id: 'case-28-2',
    title: 'Business Case — Impairment Reversal (Recovery in Market Conditions — Para 109)',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Background:</strong> In FY 2022-23, Zenith Manufacturing recognized an impairment loss of ₹40 crores on a factory plant (original cost ₹200Cr, carrying amount reduced to ₹160Cr).</p>
            <p className="mt-2">In FY 2023-24, market conditions improved significantly. The plant's recoverable amount is now estimated at ₹195 crores.</p>
          </div>
        )
      },
      {
        title: 'Reversal Calculation & Ceiling',
        content: (
          <div className="space-y-2 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p className="font-sans">Carrying amount after impairment (start of FY24): ₹160Cr</p>
            <p className="font-sans">Depreciation in FY24 (SLM, 8-yr remaining): ₹160Cr ÷ 8 = ₹20Cr</p>
            <p className="font-sans">Carrying amount (end of FY24 before reversal): ₹140Cr</p>
            <hr className="my-1 border-slate-200 dark:border-slate-800" />
            <p className="font-sans">Recoverable amount: ₹195Cr</p>
            <p className="font-sans">Reversal possible: ₹195Cr − ₹140Cr = ₹55Cr</p>
            <hr className="my-1 border-slate-200 dark:border-slate-800" />
            <p className="font-sans"><strong>Ceiling for reversal (Para 110):</strong></p>
            <p className="font-sans">What carrying amount would have been WITHOUT impairment:</p>
            <p className="font-sans">₹200Cr original − (₹200Cr ÷ 10yr × 2yr already elapsed) = ₹160Cr</p>
            <p className="font-sans font-bold">Reversal LIMITED to: ₹160Cr − ₹140Cr = ₹20Cr (not ₹55Cr)</p>
          </div>
        )
      },
      {
        title: 'Journal Entry for Reversal',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p className="font-sans font-bold">Impairment Reversal Entry (FY 2023-24):</p>
            <p>Dr. Accumulated Impairment Loss&nbsp;&nbsp;&nbsp;₹20,00,00,000</p>
            <p>&nbsp;&nbsp;Cr. Impairment Reversal (P&amp;L)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹20,00,00,000</p>
            <p className="font-sans mt-2 font-bold">NEVER for Goodwill:</p>
            <p className="font-sans">Impairment losses on goodwill CANNOT be reversed under AS 28 (Para 111).</p>
          </div>
        )
      }
    ],
    examFocus: 'Impairment reversal is capped at the carrying amount that WOULD HAVE BEEN without impairment — not at the full recoverable amount. And goodwill impairment is NEVER reversible.',
    examFocusType: 'trap'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-28-1',
    title: 'Audit Case Study — Overoptimistic Cash Flow Projections in VIU Calculation (AS 28 Para 27)',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> The auditor of Zenith Power Ltd. is reviewing the impairment test for a coal-fired power plant (carrying amount: ₹1,800 crores). Management used internal projections showing 15% revenue growth for 5 years to calculate a VIU of ₹1,950 crores (above carrying amount, so no impairment recognized).</p>
          </div>
        )
      },
      {
        title: 'Auditor Challenges — Para 27 Restrictions on Cash Flows',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 27 specifies that cash flow projections used in VIU computation shall:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Be based on reasonable and supportable assumptions</li>
              <li>Be based on the most recent financial budgets/forecasts approved by management</li>
              <li>Use a maximum projection period of <strong>5 years</strong> (unless longer period can be justified)</li>
              <li>Use a <strong>steady or declining growth rate</strong> for extrapolation beyond the explicit period — the rate should not exceed the long-term average growth rate for the product, industry, or country</li>
            </ul>
            <p className="mt-2"><strong>Auditor Concern:</strong> Industry-wide coal power revenues are declining due to renewable energy transition. A 15% growth assumption is not supportable against industry evidence.</p>
          </div>
        )
      },
      {
        title: 'Auditor Actions',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The auditor must:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Challenge management's growth assumptions with industry data, analyst reports, and regulatory developments</li>
              <li>Request sensitivity analysis showing VIU at 0%, 5%, and 10% growth rates</li>
              <li>Involve an expert valuer to independently estimate VIU</li>
              <li>If management refuses adjustment and VIU is materially overstated → Qualify the audit opinion</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'VIU cash flows must use reasonable, supportable assumptions and a growth rate not exceeding long-term industry average. Auditors must challenge overly optimistic projections.',
    examFocusType: 'focus'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-28-1',
    title: 'NFRA Observation — Goodwill Not Tested for Impairment (Annual Testing Obligation)',
    category: 'Regulatory Observations',
    panels: [
      {
        title: 'NFRA Finding',
        content: (
          <div>
            <p><strong>NFRA Audit Quality Review:</strong> Several large company audits disclosed goodwill balances of hundreds of crores but showed no evidence of an annual impairment test being performed. The auditors accepted management's position that "no indicators of impairment exist."</p>
          </div>
        )
      },
      {
        title: 'AS 28 Annual Testing Obligation (Para 8)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 8 explicitly states that goodwill and intangible assets with <strong>indefinite useful lives</strong> shall be tested for impairment <strong>annually</strong>, irrespective of whether there are any indicators of impairment.</p>
            <p>This is unlike other PPE assets where testing is triggered only by impairment indicators.</p>
            <p className="mt-2"><strong>NFRA Position:</strong> Auditors have a specific obligation to verify that an annual impairment test was performed for goodwill, not merely to accept absence of indicators.</p>
          </div>
        )
      },
      {
        title: 'Audit Responsibility',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The auditor must obtain and review:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Management's impairment test workings (VIU computation or FVLCTS valuation)</li>
              <li>Board or Audit Committee approval of the impairment test</li>
              <li>CGU allocation document for goodwill</li>
              <li>Sensitivity analyses performed</li>
            </ul>
            <p className="mt-2">Failure to perform an annual test is a material misstatement under AS 28 — the goodwill balance may be overstated.</p>
          </div>
        )
      }
    ],
    examFocus: 'Goodwill MUST be tested for impairment EVERY YEAR regardless of indicators. This is one of the strongest mandatory rules in AS 28.',
    examFocusType: 'adjustment'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'judicial-28-1',
    title: 'NCLT/SEBI Direction — Writing Off Goodwill on Acquisition Post-Competition Loss',
    category: 'Landmark Judicial Cases',
    panels: [
      {
        title: 'Facts & Ruling',
        content: (
          <div>
            <p><strong>Facts:</strong> A listed company had goodwill of ₹500 crores on its books from a 2018 acquisition. The acquired entity subsequently lost its dominant market position due to new competition and customer losses. The company kept goodwill at ₹500Cr for 5 years without impairment testing or write-down.</p>
            <p className="mt-2"><strong>SEBI Order:</strong> The company violated AS 28 by not performing annual goodwill impairment tests and not recognizing evident impairment. SEBI required restatement of financials for 3 years and penalties.</p>
          </div>
        )
      },
      {
        title: 'Key Principles Reinforced',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>1. Annual Impairment Test is Non-Negotiable:</strong> Even if no indicators are present, goodwill must be tested. If indicators ARE present (market loss), it must be tested even more urgently.</p>
            <p><strong>2. Goodwill is Not an Infinite Asset:</strong> Goodwill represents future economic benefits. If those benefits are not materializing (as evidenced by competitive losses, declining revenues), the goodwill must be impaired.</p>
            <p><strong>3. Auditor Responsibility:</strong> The statutory auditors who approved these financials were also penalized for accepting management's representation without performing appropriate impairment procedures.</p>
          </div>
        )
      }
    ],
    examFocus: 'Loss of competitive position, key customers, or market share are strong indicators requiring immediate impairment testing for goodwill — not optional.',
    examFocusType: 'concept'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-28-1',
    title: 'Exam Corner — Recoverable Amount, VIU, FVLCTS, and Impairment Loss Quick Reference',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'Key Definitions at a Glance',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-2">
            <p className="font-sans font-bold">Recoverable Amount:</p>
            <p>= MAX (Fair Value Less Costs to Sell, Value in Use)</p>
            <hr className="border-slate-300 dark:border-slate-700" />
            <p className="font-sans font-bold">Fair Value Less Costs to Sell (FVLCTS):</p>
            <p>= Market Price − Selling Costs (stamp duty, brokerage, removal costs)</p>
            <hr className="border-slate-300 dark:border-slate-700" />
            <p className="font-sans font-bold">Value in Use (VIU):</p>
            <p>= PV of Future Cash Flows from the Asset + PV of Residual Value</p>
            <p>Discount Rate = Pre-tax rate reflecting current market assessment of time value + asset-specific risks</p>
            <hr className="border-slate-300 dark:border-slate-700" />
            <p className="font-sans font-bold">Impairment Loss:</p>
            <p>= Carrying Amount − Recoverable Amount (when CA &gt; RA)</p>
          </div>
        )
      },
      {
        title: 'Annual Testing vs. Indicator-Based Testing',
        content: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-200 dark:border-slate-800">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-900">
                  <th className="border p-2">Asset Type</th>
                  <th className="border p-2">Testing Requirement</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-2">Goodwill</td><td className="border p-2 font-bold text-rose-700 dark:text-rose-400">Annual (always)</td></tr>
                <tr className="bg-blue-50/10"><td className="border p-2">Intangibles — Indefinite Life</td><td className="border p-2 font-bold text-rose-700 dark:text-rose-400">Annual (always)</td></tr>
                <tr><td className="border p-2">Intangibles — Not Yet Ready for Use</td><td className="border p-2 font-bold text-rose-700 dark:text-rose-400">Annual (always)</td></tr>
                <tr className="bg-blue-50/10"><td className="border p-2">PPE / Other Assets</td><td className="border p-2">Only when indicators exist (Para 8-10)</td></tr>
              </tbody>
            </table>
          </div>
        )
      },
      {
        title: 'Common Exam Traps',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <ul className="list-disc pl-5 space-y-2">
              <li>Impairment reversal is limited by the "would-have-been" carrying amount ceiling — not the full recoverable amount.</li>
              <li><strong>Goodwill impairment cannot be reversed</strong> — even if conditions improve dramatically.</li>
              <li>VIU uses <strong>pre-tax</strong> discount rates; NOT post-tax rates.</li>
              <li>Costs to sell include only incremental direct costs — NOT overhead or general administrative costs.</li>
              <li>If FVLCTS cannot be determined (no active market), use VIU alone as recoverable amount.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Three assets tested annually regardless of indicators: Goodwill, intangibles with indefinite life, and intangibles not yet ready for use. All others only tested when indicators exist.',
    examFocusType: 'trick'
  }
]
