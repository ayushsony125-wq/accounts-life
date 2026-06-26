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
    title={`Open ICAI AS 17 PDF — Page ${page}`}
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
    id: 'illus-17-1',
    title: 'ICAI Illustration 1 — The 10% Threshold Tests for Reportable Segments (Revenue, Result, and Assets)',
    category: 'Official ICAI Illustration',
    pdfPage: 12,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Diversified Ltd. operates 5 segments (A, B, C, D, E) for FY 2023-24.</p>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-xs font-mono border-collapse border border-slate-200 dark:border-slate-800">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-900">
                    <th className="border p-2">Segment</th>
                    <th className="border p-2">Ext. Revenue (₹)</th>
                    <th className="border p-2">Int. Revenue (₹)</th>
                    <th className="border p-2">Segment Result (₹)</th>
                    <th className="border p-2">Segment Assets (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2 font-bold">A</td><td className="border p-2">4,000,000</td><td className="border p-2">1,000,000</td><td className="border p-2">+800,000</td><td className="border p-2">3,000,000</td></tr>
                  <tr className="bg-blue-50/10 dark:bg-blue-950/5"><td className="border p-2 font-bold">B</td><td className="border p-2">2,000,000</td><td className="border p-2">500,000</td><td className="border p-2">+100,050</td><td className="border p-2">1,500,000</td></tr>
                  <tr><td className="border p-2 font-bold">C</td><td className="border p-2">1,000,000</td><td className="border p-2">1,500,000</td><td className="border p-2">−400,000</td><td className="border p-2">800,000</td></tr>
                  <tr className="bg-blue-50/10 dark:bg-blue-950/5"><td className="border p-2 font-bold">D</td><td className="border p-2">500,000</td><td className="border p-2">Nil</td><td className="border p-2">−50,000</td><td className="border p-2">400,000</td></tr>
                  <tr><td className="border p-2 font-bold">E</td><td className="border p-2">1,500,000</td><td className="border p-2">Nil</td><td className="border p-2">+50,000</td><td className="border p-2">1,300,000</td></tr>
                  <tr className="font-bold bg-slate-100 dark:bg-slate-900"><td className="border p-2">Total</td><td className="border p-2">9,000,000</td><td className="border p-2">3,000,000</td><td className="border p-2">N/A</td><td className="border p-2">7,000,000</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      },
      {
        title: 'Threshold Computations',
        content: (
          <div className="space-y-3 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>1. Revenue Test (10% of Combined = ₹1,200,000)</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Combined = ₹9,000,000 + ₹3,000,000 = ₹12,000,000; Threshold = ₹1,200,000</p>
            <p>&nbsp;&nbsp;&nbsp;Reportable: A (₹5M ✓), B (₹2.5M ✓), C (₹2.5M ✓), E (₹1.5M ✓). Non-reportable: D (₹500K ✗).</p>
            <p className="mt-2"><strong>2. Result Test (10% of Greater Absolute Sum)</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Profit segments: A + B + E = ₹800K + ₹100K + ₹50K = ₹950,000</p>
            <p>&nbsp;&nbsp;&nbsp;Loss segments: C + D = ₹400K + ₹50K = ₹450,000</p>
            <p>&nbsp;&nbsp;&nbsp;Greater absolute = ₹950,000. 10% = ₹95,000</p>
            <p>&nbsp;&nbsp;&nbsp;Reportable: A (₹800K ✓), B (₹100K ✓), C (₹400K ✓). Not: D (₹50K ✗), E (₹50K ✗ — but already reportable by Revenue).</p>
            <p className="mt-2"><strong>3. Asset Test (10% of ₹7,000,000 = ₹700,000)</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Reportable: A (₹3M ✓), B (₹1.5M ✓), C (₹800K ✓), E (₹1.3M ✓). Not: D (₹400K ✗).</p>
          </div>
        )
      },
      {
        title: 'Final Classification',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Segment qualifies as reportable if it passes ANY ONE of the 3 tests (Para 27):</strong></p>
            <ul className="list-disc pl-5 space-y-1 font-mono">
              <li>Segment A: <strong>REPORTABLE</strong> (All 3 tests passed)</li>
              <li>Segment B: <strong>REPORTABLE</strong> (All 3 tests passed)</li>
              <li>Segment C: <strong>REPORTABLE</strong> (All 3 tests passed)</li>
              <li>Segment D: <strong>NOT REPORTABLE</strong> (Fails all tests — aggregate with others)</li>
              <li>Segment E: <strong>REPORTABLE</strong> (Revenue + Asset tests passed)</li>
            </ul>
            <p className="mt-2">Segment D's results are aggregated under "Unallocated/Other" in the reconciliation note.</p>
          </div>
        )
      },
      {
        title: 'Accounting Treatment & Disclosure',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The company must disclose for each reportable segment (primary disclosures under Para 39):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Segment revenue (external + inter-segment)</li>
              <li>Segment result (profit before interest and tax)</li>
              <li>Segment assets and liabilities</li>
              <li>Capital expenditure incurred during the period</li>
              <li>Depreciation/amortization charged</li>
              <li>Significant non-cash expenses other than depreciation</li>
            </ul>
            <p className="mt-2">The basis of pricing inter-segment transfers must be disclosed (Para 23). A reconciliation between reportable segment totals and enterprise financials must be provided.</p>
          </div>
        )
      }
    ],
    examFocus: 'For the Results Test: sum profits and losses SEPARATELY, find the GREATER absolute amount, and take 10% of THAT. Never sum them net.',
    examFocusType: 'trap'
  },
  {
    id: 'illus-17-2',
    title: 'ICAI Illustration 2 — The 75% External Revenue Verification Rule (Para 33 Compliance)',
    category: 'Official ICAI Illustration',
    pdfPage: 15,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> Zenith Diversified Ltd. has total external revenue of ₹20,000,000. Reportable segments A, B, C have external revenues of ₹8M, ₹4M, and ₹2M respectively. Non-reportable segments D (₹3M), E (₹2M), F (₹1M) remain.</p>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div className="space-y-3 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>Step 1: Current Reportable Coverage</strong></p>
            <p>&nbsp;&nbsp;&nbsp;A + B + C = ₹8M + ₹4M + ₹2M = ₹14,000,000</p>
            <p>&nbsp;&nbsp;&nbsp;Coverage = 14/20 = <strong>70%</strong> — Less than 75% ✗</p>
            <p className="mt-2"><strong>Step 2: 75% Rule (Para 33)</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Required: at least 75% of EXTERNAL revenue must be from reportable segments.</p>
            <p>&nbsp;&nbsp;&nbsp;Target = ₹15,000,000. Deficit = ₹1,000,000.</p>
            <p className="mt-2"><strong>Step 3: Add Next Largest Segment</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Add Segment D (₹3M): New total = ₹14M + ₹3M = ₹17M = 85% ✓</p>
            <p>&nbsp;&nbsp;&nbsp;OR Add Segment E (₹2M): New total = ₹14M + ₹2M = ₹16M = 80% ✓</p>
          </div>
        )
      },
      {
        title: 'AS 17 Technical Rule',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 33: If the total external revenue attributable to reportable segments constitutes less than 75% of total enterprise external revenue, additional segments shall be identified as reportable segments, even if they do not meet the 10% threshold tests individually.</p>
            <p><strong>Critical Point:</strong> The 75% check uses EXTERNAL revenue only, NOT combined (internal + external) revenue.</p>
          </div>
        )
      }
    ],
    examFocus: 'The 75% check is only on EXTERNAL revenue — not combined internal + external revenue. This catches students who use combined totals.',
    examFocusType: 'trick'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-17-1',
    title: 'Business Case — Tata Motors Ltd.: Business Segment vs. Geographical Segment Classification (Primary/Secondary)',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> A large conglomerate similar to Tata Motors operating in FY 2023-24.</p>
            <p><strong>Operations:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Commercial vehicles (trucks, buses) — 45% of revenue</li>
              <li>Passenger vehicles — 35% of revenue</li>
              <li>Vehicle financing — 20% of revenue</li>
            </ul>
            <p className="mt-2">These are sold across India (70%), UK/Europe (20%), and rest of world (10%).</p>
            <p>The company must identify its primary and secondary segment reporting formats.</p>
          </div>
        )
      },
      {
        title: 'Primary vs Secondary Segment Determination (Para 26)',
        content: (
          <div className="space-y-3 text-xs leading-relaxed">
            <p>Under AS 17, the <strong>primary format</strong> is the one reflecting the dominant source and nature of risks and returns of the enterprise.</p>
            <p><strong>Step 1 — Business Segment Analysis:</strong></p>
            <p>Commercial vehicles, passenger vehicles, and vehicle financing are distinct businesses with different risk-return profiles, customer bases, and regulatory environments. The enterprise's internal management reporting is organized by business line.</p>
            <p><strong>Step 2 — Geographical Segment Analysis:</strong></p>
            <p>India, UK/Europe, and RoW operate under different currencies, economic conditions, and tax regimes. However, internal management primarily tracks performance by product line, not geography.</p>
            <p><strong>Conclusion:</strong></p>
            <p>Primary format = <strong>Business Segments</strong> (3 segments: Commercial Vehicles, Passenger Vehicles, Vehicle Financing)</p>
            <p>Secondary format = <strong>Geographical Segments</strong> (India, UK/Europe, RoW)</p>
          </div>
        )
      },
      {
        title: 'Primary Segment Disclosures Required',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>For each of the 3 business segments (Para 39 — Primary Disclosures):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>External revenue and inter-segment revenue</li>
              <li>Segment result (before common costs and tax)</li>
              <li>Segment assets and segment liabilities</li>
              <li>Capital expenditure in the period</li>
              <li>Depreciation charged</li>
              <li>Significant non-cash expenses</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Secondary Segment Disclosures Required',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>For each geographical segment (Para 40 — Secondary Disclosures), only limited disclosures are required:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>External revenue by customer location</li>
              <li>Carrying amount of segment assets by asset location</li>
              <li>Capital expenditure by asset location</li>
            </ul>
            <p className="mt-2">Secondary disclosures are simpler than primary disclosures — no need to report segment result or liabilities.</p>
          </div>
        )
      }
    ],
    examFocus: 'Secondary segment disclosures are limited to revenue, assets, and capex. Segment result and liabilities are NOT required for secondary segments.',
    examFocusType: 'focus'
  },
  {
    id: 'case-17-2',
    title: 'Business Case — Inter-Segment Transfer Pricing Disclosure (Steel Manufacturer with Captive Consumption)',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Steel Ltd. (FY 2023-24)</p>
            <p><strong>Segments:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Segment A (Steel manufacturing) — transfers 40% of output to Segment B at cost + 5% markup</li>
              <li>Segment B (Steel processing/fabrication) — receives raw steel internally</li>
              <li>External market price for raw steel = cost + 25% markup</li>
            </ul>
            <p className="mt-2">Segment A external revenue: ₹6,00,00,000. Inter-segment transfer: ₹4,00,00,000 at cost + 5%.</p>
          </div>
        )
      },
      {
        title: 'AS 17 Inter-Segment Transfer Rules (Para 23)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Under Para 23, inter-segment transfers shall be measured on the <strong>basis that the enterprise actually used</strong> to price those transfers. The basis used must be disclosed.</p>
            <p><strong>Permitted Bases for Pricing:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cost-based (cost + markup)</li>
              <li>Market price-based (arm's length)</li>
              <li>Negotiated price</li>
            </ul>
            <p className="mt-2">AS 17 does NOT mandate arm's length pricing for inter-segment transfers. It simply requires that the actual basis used is disclosed consistently.</p>
          </div>
        )
      },
      {
        title: 'Required Disclosure Note',
        content: (
          <div className="space-y-2 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>Segment Reporting Note (Extract):</strong></p>
            <p>Inter-segment revenues are accounted for at cost plus a 5% markup. This basis is applied consistently across all periods presented.</p>
            <p className="mt-2">The basis of pricing of inter-segment transfers and any changes therein during the year are disclosed in accordance with AS 17 (Para 23).</p>
          </div>
        )
      }
    ],
    examFocus: 'AS 17 does not prescribe any particular method for inter-segment pricing — any basis is acceptable as long as it is disclosed and applied consistently.',
    examFocusType: 'concept'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-17-1',
    title: 'Audit Case Study — Segment Asset Mis-allocation (General Corporate Assets Included in Reportable Segments)',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> During statutory audit of Zenith Tech Ltd., auditor finds that the company allocated ₹15 crores of head office building cost, ₹8 crores of deferred tax assets (DTA), and ₹5 crores of goodwill on acquisition to reportable segments A and B to improve segment asset balances and pass the 10% asset threshold test for Segment B.</p>
          </div>
        )
      },
      {
        title: 'Auditor Analysis — AS 17 Para 5',
        content: (
          <div className="space-y-3 text-xs leading-relaxed">
            <p><strong>Segment Assets Defined (Para 5):</strong> A segment asset is an operating asset that is <strong>used by a segment in its operating activities</strong> and that either is directly attributable to the segment OR can be allocated to the segment on a reasonable basis.</p>
            <p><strong>Exclusions from Segment Assets (Para 5):</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>General corporate assets (used for enterprise-wide purposes, like HO building)</li>
              <li>Income tax assets (DTA, advance tax)</li>
              <li>Assets employed for general enterprise activities not allocable to any segment</li>
            </ul>
            <p><strong>Auditor Conclusion:</strong> The allocation of DTA (₹8Cr) and head office building (₹15Cr) to segments is incorrect under AS 17. These should be unallocated/corporate. Goodwill can only be allocated if directly traceable to a segment acquisition.</p>
          </div>
        )
      },
      {
        title: 'Audit Finding & Corrective Action',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Finding:</strong> Management has improperly inflated Segment B's reported assets by ₹23 crores. After correction, Segment B may fail the 10% asset test.</p>
            <p><strong>Corrective Action Required:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Reclassify head office building and DTA to "Unallocated Corporate Assets"</li>
              <li>Re-evaluate whether Segment B qualifies as reportable (it may still pass via Revenue or Result test)</li>
              <li>Restate comparative segment disclosures</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Auditor\'s Report Implications',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>If management refuses to correct the misallocation, the auditor should:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Modify the audit opinion (qualified or adverse) with respect to the segment note</li>
              <li>Report the matter in Emphasis of Matter paragraph</li>
              <li>Consider CARO reporting obligations for material misstatements</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Deferred tax assets (DTA), advance taxes, and general corporate assets are ALWAYS unallocated — never part of segment assets.',
    examFocusType: 'adjustment'
  },
  {
    id: 'audit-17-2',
    title: 'Audit Case Study — Reconciliation of Segment Totals with Financial Statements (Missing Reconciliation)',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> In the Annual Report of Zenith Chemicals Ltd., the segment note reports:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Total segment revenue: ₹480 crores</li>
              <li>Total P&amp;L Revenue (Statement of P&amp;L): ₹520 crores</li>
            </ul>
            <p className="mt-2">There is no reconciliation provided between the segment total and the enterprise total. The difference of ₹40 crores represents unallocated corporate revenue (investment income).</p>
          </div>
        )
      },
      {
        title: 'AS 17 Reconciliation Requirement (Para 44)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 44 explicitly requires that enterprises provide a <strong>reconciliation between the information disclosed for reportable segments and the aggregated information in the financial statements</strong>.</p>
            <p>The reconciliation must cover:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Segment revenue → Enterprise revenue</li>
              <li>Segment result → Profit before tax</li>
              <li>Segment assets → Enterprise assets</li>
              <li>Segment liabilities → Enterprise liabilities</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Correct Reconciliation Format',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p><strong>Reconciliation of Segment Revenue to Enterprise Revenue:</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Total Reportable Segment Revenue:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹480 Cr</p>
            <p>&nbsp;&nbsp;&nbsp;Elimination of Inter-segment Revenue:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(₹0 Cr)</p>
            <p>&nbsp;&nbsp;&nbsp;Unallocated Corporate Income:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹40 Cr</p>
            <p className="font-bold">&nbsp;&nbsp;&nbsp;Enterprise Revenue per P&amp;L:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹520 Cr</p>
          </div>
        )
      }
    ],
    examFocus: 'Reconciliation of segment totals to enterprise totals is MANDATORY under Para 44 — not optional.',
    examFocusType: 'focus'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-17-1',
    title: 'SEBI & NFRA Observation — Changing Segment Definition Across Periods Without Disclosure',
    category: 'Regulatory Observations',
    panels: [
      {
        title: 'Background & Regulatory Issue',
        content: (
          <div>
            <p><strong>Overview:</strong> SEBI has penalized several listed companies for silently changing their segment identification basis between financial years — reclassifying previously reportable segments to avoid disclosing deteriorating performance in specific segments.</p>
            <p className="mt-2">A company that reported "Pharmaceuticals" as a reportable segment in FY 2022-23 suddenly merged it with "Healthcare" in FY 2023-24 without any disclosure or restatement of prior period comparatives.</p>
          </div>
        )
      },
      {
        title: 'AS 17 Requirement for Changes in Segments (Para 43)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 43 requires that when a change in the identification of segments or in the basis of segment information would cause the segment disclosures to be materially different:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The prior period comparative information must be <strong>restated</strong></li>
              <li>Unless it is impracticable to restate — in which case this impracticability must be disclosed</li>
              <li>The nature and reason for the change must be clearly described</li>
            </ul>
          </div>
        )
      },
      {
        title: 'SEBI Enforcement Actions',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>SEBI issued show cause notices and imposed penalties for:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Material changes in segment identification without adequate disclosure</li>
              <li>Failure to restate prior period comparatives when segments are merged</li>
              <li>Using segment redefinition to mask a loss-making segment</li>
            </ul>
            <p className="mt-2">The NFRA has also highlighted this as an area of Audit Quality concern — auditors must specifically test whether changes in segments are genuine organizational changes or motivated by presentation concerns.</p>
          </div>
        )
      }
    ],
    examFocus: 'Restating prior period comparatives is MANDATORY when segment definitions change materially. Auditors must verify the genuineness of segment reclassifications.',
    examFocusType: 'adjustment'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'judicial-17-1',
    title: 'SEBI Order — HDFC Ltd. Segment Reporting Enforcement (Revenue Attribution to Segments)',
    category: 'Landmark Judicial Cases',
    panels: [
      {
        title: 'Facts & Background',
        content: (
          <div>
            <p><strong>Regulatory Action:</strong> SEBI directed companies with diversified financial services operations (housing finance, insurance, asset management) to report each as a distinct primary business segment. These had previously been clubbed under a single "Financial Services" segment, obscuring the risk-return profile of each line.</p>
            <p className="mt-2">The regulator took the position that the enterprise's internal reporting structure and risk management was clearly segment-based — hence AS 17 required segment disclosures to follow that structure.</p>
          </div>
        )
      },
      {
        title: 'AS 17 Internal Reporting Principle (Para 19)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 19: The segments shall be determined based on the way that management organises the enterprise for the purpose of making operating decisions and assessing performance.</p>
            <p><strong>Regulator's Reasoning:</strong> When a company's Board and senior management regularly receive segment-level P&amp;L and balance sheets for each product line, those constitute distinct "business segments" under AS 17 regardless of how they are labeled in external reports.</p>
          </div>
        )
      },
      {
        title: 'Exam/Practical Implication',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>This case reinforces that segment identification is NOT the company's free choice — it must reflect the way the enterprise is actually managed. If internal management information is segmented, so must be the external disclosures.</p>
            <p>Auditors must check internal Board reports to ensure segment disclosures match internal reporting structures.</p>
          </div>
        )
      }
    ],
    examFocus: 'Segment identification must reflect actual internal management reporting structure — not be chosen for convenience of presentation.',
    examFocusType: 'concept'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-17-1',
    title: 'Exam Corner — Segment Result Formula, Excluded Items, and 10-Segment Practical Rule',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'Segment Result Formula',
        content: (
          <div className="space-y-2 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p className="font-sans font-bold">Segment Revenue</p>
            <p>= External Revenue from customers in segment</p>
            <p>+ Inter-segment revenue (at pricing basis used)</p>
            <hr className="border-slate-300 dark:border-slate-700 my-1" />
            <p className="font-sans font-bold">Excluded from Segment Revenue:</p>
            <p className="font-sans">Interest income (unless financial segment), dividends, gains on securities</p>
            <hr className="border-slate-300 dark:border-slate-700 my-1" />
            <p className="font-sans font-bold">Segment Result = Segment Revenue − Segment Expenses</p>
            <p className="font-sans font-bold">Excluded from Segment Expenses:</p>
            <ul className="list-disc pl-5 space-y-0.5 font-sans">
              <li>Interest expense (unless financial segment)</li>
              <li>Income taxes (current + deferred)</li>
              <li>General corporate expenses (HO costs)</li>
              <li>Extraordinary items</li>
            </ul>
          </div>
        )
      },
      {
        title: 'The Practical 10-Segment Limit (Para 36)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 36 states: As a practical matter, when the number of reportable segments identified exceeds ten segments, the enterprise shall consider whether the reportable segments can be combined.</p>
            <p>This is a <strong>practical relief</strong> — not a mandate. If 12 segments are genuinely distinct, they may all be disclosed. But if the enterprise has 15 marginally different segments, combining similar ones is encouraged for clarity.</p>
          </div>
        )
      },
      {
        title: 'Common Exam Mistakes',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Mistake 1:</strong> Using net profit/total combined segments for the Results Test instead of separately summing profits and losses.</li>
              <li><strong>Mistake 2:</strong> Including DTA or advance tax in segment assets.</li>
              <li><strong>Mistake 3:</strong> Using combined revenue (external + inter-segment) for the 75% rule instead of external-only revenue.</li>
              <li><strong>Mistake 4:</strong> Forgetting that a segment with only ₹1 less than the 10% threshold on ALL three tests is still non-reportable.</li>
              <li><strong>Mistake 5:</strong> Thinking the primary segment format is always business segments — it depends on the enterprise's dominant risk source.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Three key numbers for AS 17: 10% threshold for any test → Reportable. 75% external revenue must be covered. 10 segments practical limit for combination.',
    examFocusType: 'trick'
  }
]
