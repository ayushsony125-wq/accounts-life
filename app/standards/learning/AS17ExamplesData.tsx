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
            <p><strong>Entity:</strong> Zenith Diversified Ltd. operates 5 segments (A, B, C, D, E). The segment data for FY 2023-24 is as follows:</p>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-xs font-mono border-collapse border border-slate-200 dark:border-slate-800">
                <thead>
                  <tr className="bg-slate-105">
                    <th className="border p-2">Segment</th>
                    <th className="border p-2">External Revenue (₹)</th>
                    <th className="border p-2">Internal Revenue (₹)</th>
                    <th className="border p-2">Segment Result (₹)</th>
                    <th className="border p-2">Segment Assets (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 font-bold">A</td>
                    <td className="border p-2">4,000,000</td>
                    <td className="border p-2">1,000,000</td>
                    <td className="border p-2">+800,000</td>
                    <td className="border p-2">3,000,000</td>
                  </tr>
                  <tr className="bg-blue-50/10 dark:bg-blue-950/5">
                    <td className="border p-2 font-bold">B</td>
                    <td className="border p-2">2,000,000</td>
                    <td className="border p-2">500,000</td>
                    <td className="border p-2">+100,050</td>
                    <td className="border p-2">1,500,000</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">C</td>
                    <td className="border p-2">1,000,000</td>
                    <td className="border p-2">1,500,000</td>
                    <td className="border p-2">−400,000</td>
                    <td className="border p-2">800,000</td>
                  </tr>
                  <tr className="bg-blue-50/10 dark:bg-blue-950/5">
                    <td className="border p-2 font-bold">D</td>
                    <td className="border p-2">500,000</td>
                    <td className="border p-2">Nil</td>
                    <td className="border p-2">−50,000</td>
                    <td className="border p-2">400,000</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">E</td>
                    <td className="border p-2">1,500,000</td>
                    <td className="border p-2">Nil</td>
                    <td className="border p-2">+50,000</td>
                    <td className="border p-2">1,300,000</td>
                  </tr>
                  <tr className="font-bold bg-slate-100 dark:bg-slate-900">
                    <td className="border p-2">Total</td>
                    <td className="border p-2">9,000,000</td>
                    <td className="border p-2">3,000,000</td>
                    <td className="border p-2">N/A</td>
                    <td className="border p-2">7,000,000</td>
                  </tr>
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
            <p><strong>1. Revenue Test (10% of Combined Internal + External Revenue = ₹1,200,000)</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Combined Revenue = ₹9,000,000 + ₹3,000,000 = ₹12,000,000</p>
            <p>&nbsp;&nbsp;&nbsp;10% Threshold = ₹1,200,000</p>
            <p>&nbsp;&nbsp;&nbsp;Reportable: A (₹5M), B (₹2.5M), C (₹2.6M), E (₹1.5M). Non-reportable: D (₹500k).</p>
            
            <p className="mt-2"><strong>2. Result Test (10% of greater of positive/negative sums)</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Segments in Profit: A (+₹800k) + B (+₹100k) + E (+₹50k) = <strong>₹950,000</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Segments in Loss: C (₹400k) + D (₹50k) = <strong>₹450,000</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Absolute Greater = ₹950,000. 10% Threshold = <strong>₹95,000</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Reportable: A (₹800k &gt; ₹95k), B (₹100k &gt; ₹95k), C (absolute ₹400k &gt; ₹95k).</p>
            
            <p className="mt-2"><strong>3. Asset Test (10% of Combined Segment Assets = ₹700,000)</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Combined Assets = ₹7,000,000. 10% Threshold = <strong>₹700,000</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Reportable: A (₹3M), B (₹1.5M), C (₹800k), E (₹1.3M).</p>
          </div>
        )
      },
      {
        title: 'AS 17 Technical Analysis & Report',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Reportable segments:</strong> A segment is reportable if it meets any of the three 10% threshold criteria (Para 27).</p>
            <p className="font-bold">Final Classification:</p>
            <ul className="list-disc pl-5 space-y-1 font-mono">
              <li>Segment A: Reportable (Revenues, Results, Assets)</li>
              <li>Segment B: Reportable (Revenues, Results, Assets)</li>
              <li>Segment C: Reportable (Revenues, Results, Assets)</li>
              <li>Segment D: Non-Reportable (Fails all tests)</li>
              <li>Segment E: Reportable (Revenues, Assets)</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'For the results test, always sum profits and losses separately, find the greater absolute sum, and take 10% of that.',
    examFocusType: 'trap'
  },
  {
    id: 'illus-17-2',
    title: 'ICAI Illustration 2 — The 75% External Revenue Verification Rule (Adding Segments to comply with Para 33)',
    category: 'Official ICAI Illustration',
    pdfPage: 15,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> Zenith Diversified Ltd. has total **external revenue** of ₹20,000,000. The reportable segments identified via the 10% tests (Segments A, B, C) have external revenues as follows:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Segment A: <strong>₹8,000,000</strong></li>
              <li>Segment B: <strong>₹4,000,000</strong></li>
              <li>Segment C: <strong>₹2,000,000</strong></li>
            </ul>
            <p className="mt-2">The company also operates Segments D, E, F (non-reportable under the 10% tests) with external revenues of ₹3M, ₹2M, and ₹1M respectively.</p>
          </div>
        )
      },
      {
        title: 'Mathematical Computations & Revenue Checks',
        content: (
          <div className="space-y-3 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>Step 1: Check Current Reportable Segment External Revenue Share</strong></p>
            <p>Sum of reportable external revenue (A + B + C) = ₹8M + ₹4M + ₹2M = <strong>₹14,000,000</strong></p>
            <p>Share of total external revenue = (₹14,000,000 / ₹20,000,000) × 100 = <strong>70%</strong></p>
            
            <p className="mt-2"><strong>Step 2: Apply the 75% Requirement (Para 33)</strong></p>
            <p>Since 70% is **less than 75%**, the company MUST identify additional reportable segments until at least 75% of the total external revenue is covered.</p>
            
            <p className="mt-2"><strong>Step 3: Add Segments to Meet the Target</strong></p>
            <p>Target revenue (75% of ₹20M) = <strong>₹15,000,000</strong></p>
            <p>Deficit = ₹15,000,000 − ₹14,000,000 = <strong>₹1,000,000</strong></p>
            <p>The company can add Segment E (external revenue ₹2,000,000) or Segment D (₹3,000,000) to meet the threshold. If Segment E is added, the new reportable external revenue is ₹16,000,000 (80%), satisfying the rule.</p>
          </div>
        )
      }
    ],
    examFocus: 'The 75% check is calculated ONLY on external revenue, not combined internal + external revenue.',
    examFocusType: 'trick'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-17-1',
    title: 'Business Case — Segment Risk-Return Profiles (Business Segment vs Geographical Segment Classification)',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Tech Solutions Ltd. (FY 2023-24)</p>
            <p><strong>Operations:</strong> Software development (70% of assets) and hardware consulting (30% of assets).</p>
            <p>The hardware consulting business is operated in two regions: India (high growth, stable regulations) and country Y (high inflation, fluctuating currency exchange rates).</p>
            <p>The company wants to classify these operations into Business and Geographical Segments under AS 17.</p>
          </div>
        )
      },
      {
        title: 'AS 17 Segment Identification Rules (Para 15-20)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>1. Business Segments:</strong> Software development and hardware consulting have different risk-return profiles and target client groups. They are classified as distinct **Business Segments**.</p>
            <p><strong>2. Geographical Segments:</strong> Hardware operations in India and country Y are subjected to completely different economic and regulatory risks. They are classified as distinct **Geographical Segments**.</p>
          </div>
        )
      }
    ],
    examFocus: 'Classification of segments must be based on risk-return profiles, not just internal organizational structures.',
    examFocusType: 'concept'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-17-1',
    title: 'Audit Case Study — Transfer Pricing Audits & Inter-Segment Transfer Basis (Arm\'s Length Pricing)',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> During the audit of Zenith Net Ltd., the auditor notes that Segment A (which manufactures raw steel) transfers 40% of its output to Segment B (which builds steel containers).</p>
            <p>Segment A transfers the steel at cost + 5% markup. The market price of steel is cost + 25% markup. Segment A reports a segment profit of ₹100,000, while Segment B reports ₹800,000.</p>
          </div>
        )
      },
      {
        title: 'Auditor Analysis & Valuation Rules (Para 23)',
        content: (
          <div className="space-y-3 text-xs leading-relaxed">
            <p>Under AS 17, inter-segment transfers should be valued on the **basis actually used** by the enterprise to price those transfers (Para 23). The basis of pricing inter-segment transfers and any change therein should be disclosed in financial statements.</p>
            <p><strong>Auditor Verification:</strong> The auditor does not force the company to change its internal transfer pricing basis to market price, but must ensure that the transfer pricing basis is **disclosed consistently** and that segment results are reconciled properly with enterprise-wide financials.</p>
          </div>
        )
      }
    ],
    examFocus: 'AS 17 does not mandate arm\'s length transfer pricing but requires clear disclosure of whatever basis is actually used.',
    examFocusType: 'focus'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-17-1',
    title: 'Regulatory Observation — Segment Assets Allocation (SEBI & NFRA Compliance on Shared Corporate Assets)',
    category: 'Regulatory Observations',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Overview:</strong> SEBI has observed instances where companies allocated general corporate assets (such as head office buildings, cash reserves, and deferred tax assets) to reportable segments to artificially inflate segment assets and manipulate the 10% asset test threshold.</p>
          </div>
        )
      },
      {
        title: 'AS 17 Rules (Para 5)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Segment assets do **not** include assets used for general corporate purposes (e.g. head office building) or income tax assets (DTA), unless they relate directly to that segment and can be allocated on a reasonable basis (Para 5).</p>
            <p>If segment assets are allocated, a consistent allocation base must be used and explained in footnotes.</p>
          </div>
        )
      }
    ],
    examFocus: 'Do not allocate general corporate cash or tax assets to segments unless they are directly attributable.',
    examFocusType: 'adjustment'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'judicial-17-1',
    title: 'Landmark Judicial Case — CIT vs. Indian Rayon (Classification of Export Segments & Tax Benefits)',
    category: 'Landmark Judicial Cases',
    panels: [
      {
        title: 'Facts & Ruling',
        content: (
          <div>
            <p><strong>Precedent:</strong></p>
            <p>The Court reviewed segment reporting for companies claiming Section 80IA tax benefits for export units. It was ruled that the export division and domestic divisions represent distinct geographical segments under AS 17 because of differences in risks, returns, and tax regulations.</p>
          </div>
        )
      }
    ],
    examFocus: 'Export units are treated as distinct geographical segments due to distinct currency and tax environments.',
    examFocusType: 'focus'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-17-1',
    title: 'Exam Corner — Segment result definition & Reconciliation rules',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'Segment Result Formula',
        content: (
          <div className="space-y-2 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p>Segment Result = Segment Revenue − Segment Expense</p>
            <p>Segment Expense excludes:</p>
            <ul className="list-disc pl-5 mt-1 space-y-0.5 font-sans">
              <li>Interest expense (unless segment is financial/banking).</li>
              <li>Income taxes.</li>
              <li>General corporate expenses.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Segment profit calculation must strictly exclude finance costs and income taxes.',
    examFocusType: 'trap'
  }
]
