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
    title={`Open ICAI AS 16 PDF — Page ${page}`}
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
    id: 'illus-16-1',
    title: 'ICAI Illustration 1 — Specific Borrowing Costs & Temporary Income Offset (Capitalization of Dedicated Loan)',
    category: 'Official ICAI Illustration',
    pdfPage: 8,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Infrastructure Ltd. (FY 2023-24)</p>
            <p><strong>Project Details:</strong> Construction of a specialized warehouse (Qualifying Asset).</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>On **1st April 2023**, the company borrowed **₹2,000,000** at **10% p.a.** specifically for this construction.</li>
              <li>Construction began on 1st April 2023 and was completed on **31st December 2023** (9 months construction period).</li>
              <li>Surplus funds from the loan were temporarily invested in short-term bank deposits:
                <ul className="list-circle pl-5 mt-1 space-y-0.5">
                  <li>₹800,000 invested from 1st April to 30th June (3 months) yielding **6% interest**.</li>
                  <li>₹400,000 invested from 1st July to 30th September (3 months) yielding **6% interest**.</li>
                </ul>
              </li>
            </ul>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div className="space-y-3 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>Step 1: Gross Borrowing Costs (for the active construction period of 9 months)</strong></p>
            <p>Gross Interest = Loan Amount (₹2,00,0000) × 10% × (9 / 12) = <strong>₹150,000</strong></p>
            
            <p className="mt-2"><strong>Step 2: Temporary Investment Income (to be offset)</strong></p>
            <p>&nbsp;&nbsp;&nbsp;1st Deposit (3 months): ₹800,000 × 6% × (3 / 12) = ₹12,000</p>
            <p>&nbsp;&nbsp;&nbsp;2nd Deposit (3 months): ₹400,000 × 6% × (3 / 12) = ₹6,000</p>
            <p>&nbsp;&nbsp;&nbsp;Total Investment Income = ₹12,000 + ₹6,000 = <strong>₹18,000</strong></p>
            
            <p className="mt-2"><strong>Step 3: Net Borrowing Costs to be Capitalized</strong></p>
            <p>Net Capitalized Cost = Gross Interest (₹150,000) − Investment Income (₹18,000)</p>
            <p>Net Capitalized Cost = <strong>₹132,000</strong></p>
            
            <p className="mt-2"><strong>Step 4: Interest Cost for remaining 3 months (post-completion)</strong></p>
            <p>Interest for Jan to March = ₹2,000,000 × 10% × (3 / 12) = <strong>₹50,000</strong></p>
            <p>This ₹50,000 is charged directly to the Statement of Profit &amp; Loss as finance cost.</p>
          </div>
        )
      },
      {
        title: 'AS 16 Technical Analysis',
        content: (
          <div>
            <p>Under AS 16 (Para 10), to the extent that funds are borrowed specifically for the purpose of obtaining a qualifying asset, the amount of borrowing costs eligible for capitalization should be determined as the actual borrowing costs incurred on that borrowing during the period, **less any investment income** on the temporary investment of those borrowings.</p>
            <p className="mt-2"><strong>Cessation (Para 21):</strong> Capitalization of borrowing costs should cease when substantially all the activities necessary to prepare the qualifying asset for its intended use or sale are complete. Therefore, interest for the post-completion period cannot be capitalized.</p>
          </div>
        )
      }
    ],
    examFocus: 'Only investment income earned DURING the active construction period can offset the capitalized interest.',
    examFocusType: 'trap'
  },
  {
    id: 'illus-16-2',
    title: 'ICAI Illustration 2 — General Borrowing Capitalization Rate (Weighted Average Borrowing Cost Allocation)',
    category: 'Official ICAI Illustration',
    pdfPage: 11,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Beta Builders Ltd. (FY 2023-24)</p>
            <p><strong>General Borrowings Outstanding during the Year:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>12% Term Loan: <strong>₹3,000,000</strong></li>
              <li>15% Cash Credit / Overdraft: <strong>₹2,000,000</strong></li>
            </ul>
            <p>The company had no specific loans. On **1st May 2023**, it started construction of a factory building and made the following expenditures from its general pool:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>1st May 2023: <strong>₹1,200,000</strong></li>
              <li>1st November 2023: <strong>₹600,000</strong></li>
            </ul>
            <p>Construction was in progress at the end of the year (31st March 2024).</p>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div className="space-y-3 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>Step 1: Calculate Capitalization Rate (Weighted Average rate on general borrowings)</strong></p>
            <p>Total Interest Paid on General Borrowings:</p>
            <p>&nbsp;&nbsp;&nbsp;12% Term Loan = ₹3,000,000 × 12% = ₹360,000</p>
            <p>&nbsp;&nbsp;&nbsp;15% Cash Credit = ₹2,000,000 × 15% = ₹300,000</p>
            <p>&nbsp;&nbsp;&nbsp;Total General Interest = ₹360,000 + ₹300,000 = ₹660,000</p>
            <p>&nbsp;&nbsp;&nbsp;Total General Borrowings = ₹5,000,000</p>
            <p>&nbsp;&nbsp;&nbsp;Capitalization Rate = (₹660,000 / ₹5,000,000) × 100 = <strong>13.2% p.a.</strong></p>
            
            <p className="mt-2"><strong>Step 2: Calculate Weighted Average Expenditure on Qualifying Asset</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Expenditure 1 (1st May to 31st March = 11 Months): ₹1,200,000 × (11 / 12) = ₹1,100,000</p>
            <p>&nbsp;&nbsp;&nbsp;Expenditure 2 (1st November to 31st March = 5 Months): ₹600,000 × (5 / 12) = ₹250,000</p>
            <p>&nbsp;&nbsp;&nbsp;Total Weighted Average Expenditure = ₹1,100,000 + ₹250,000 = <strong>₹1,350,000</strong></p>
            
            <p className="mt-2"><strong>Step 3: Calculate Borrowing Cost to be Capitalized</strong></p>
            <p>Interest to Capitalize = Weighted Avg Expenditure (₹1,350,000) × Capitalization Rate (13.2%) = <strong>₹178,200</strong></p>
          </div>
        )
      },
      {
        title: 'AS 16 Technical Analysis',
        content: (
          <div>
            <p>Under AS 16 (Para 12), to the extent that funds are borrowed generally and used for the purpose of obtaining a qualifying asset, the amount of borrowing costs eligible for capitalization should be determined by applying a capitalization rate to the expenditures on that asset.</p>
            <p className="mt-2"><strong>Weighted Average approach:</strong> The capitalization rate should be the weighted average of the borrowing costs outstanding during the period. The expenditure is also weighted by the time period it was active in construction.</p>
          </div>
        )
      }
    ],
    examFocus: 'Do not apply the capitalization rate to the raw total expenditure; it must be time-weighted from the date of expenditure.',
    examFocusType: 'trick'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-16-1',
    title: 'Business Case — Exchange Difference Adjustment to Borrowing Costs (Foreign Currency Loan Capitalization under Para 4(e))',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Ganges Textiles Ltd. (FY 2023-24)</p>
            <p><strong>The Transaction:</strong> On **1st April 2023**, the company borrowed **US$ 100,000** at **4% interest p.a.** specifically to import a textile loom (Qualifying Asset).</p>
            <p><strong>Exchange Rates &amp; Details:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Exchange rate on 1st April 2023: **US$ 1 = ₹80.00** (Loan Value = ₹8,000,000)</li>
              <li>Exchange rate on 31st March 2024: **US$ 1 = ₹83.00**</li>
              <li>Equivalent local borrowing rate for a similar loan in Indian Rupees = **11% p.a.**</li>
            </ul>
            <p className="mt-2">The company needs to calculate the amount of foreign exchange differences to be regarded as borrowing costs under AS 16.</p>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div className="space-y-3 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>1. Interest Cost on Foreign Loan:</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Interest in US$ = US$ 100,000 × 4% = US$ 4,000</p>
            <p>&nbsp;&nbsp;&nbsp;Interest in INR (at closing rate ₹83) = US$ 4,000 × ₹83.00 = <strong>₹332,000</strong></p>
            
            <p className="mt-2"><strong>2. Total Exchange Difference on Loan Principal:</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Exchange Loss = US$ 100,000 × (₹83.00 − ₹80.00) = <strong>₹300,000</strong></p>
            
            <p className="mt-2"><strong>3. Equivalent Interest Cost at Local Rupee Rate (11%):</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Equivalent local interest = Loan Value (₹8,000,000) × 11% = <strong>₹880,000</strong></p>
            
            <p className="mt-2"><strong>4. Borrowing Cost Allocation under Para 4(e):</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Exchange difference regarded as borrowing cost is capped at the excess of local interest over foreign interest:</p>
            <p>&nbsp;&nbsp;&nbsp;Interest Differential = Local Rupee Interest (₹880,000) − Foreign Interest (₹332,000) = <strong>₹548,000</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Since the actual exchange loss (₹300,000) is less than the differential (₹548,000), the **entire exchange loss of ₹300,000** is treated as borrowing cost under AS 16!</p>
            <p>&nbsp;&nbsp;&nbsp;Total Borrowing Costs Capitalized = Interest (₹332,000) + Exchange Loss (₹300,000) = <strong>₹632,000</strong></p>
          </div>
        )
      },
      {
        title: 'AS 16 Rules & AS 11 Integration',
        content: (
          <div>
            <p>Under AS 16 (Para 4(e)), exchange differences arising from foreign currency borrowings are included as borrowing costs to the extent that they are regarded as an adjustment to interest costs.</p>
            <p className="mt-2"><strong>Excess Exchange Losses:</strong> If the actual exchange loss was ₹600,000, only ₹548,000 would be treated as borrowing cost under AS 16 (capitalized), and the excess of ₹52,000 (₹600,000 − ₹548,000) would be treated as exchange differences under AS 11 and expensed in the P&amp;L statement.</p>
          </div>
        )
      }
    ],
    examFocus: 'Para 4(e) is a high-frequency exam concept. Always perform the 4-step local interest comparison check.',
    examFocusType: 'adjustment'
  },
  {
    id: 'case-16-2',
    title: 'Business Case — General Borrowings: Weighted Average Capitalization Rate (WACR) Computation',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Power Ltd. is constructing a power plant (Qualifying Asset). During FY 2023-24:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Loan A: ₹5,00,00,000 at 9% p.a. (this is a general corporate loan, NOT specifically for the plant)</li>
              <li>Loan B: ₹3,00,00,000 at 12% p.a. (also general corporate loan)</li>
              <li>Expenditure on plant during the year: ₹4,20,00,000</li>
            </ul>
            <p className="mt-2">Loan A was used for working capital; Loan B was used partly for another project. Neither is specifically for the power plant.</p>
          </div>
        )
      },
      {
        title: 'WACR Computation (Para 11)',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p className="font-sans font-bold">Step 1: Weighted Average Capitalization Rate (WACR)</p>
            <p>Total Interest = (₹5Cr × 9%) + (₹3Cr × 12%)</p>
            <p>             = ₹45,00,000 + ₹36,00,000 = ₹81,00,000</p>
            <p>Total General Borrowings = ₹5Cr + ₹3Cr = ₹8Cr</p>
            <p className="font-bold">WACR = ₹81,00,000 / ₹8,00,00,000 = 10.125%</p>
            <p className="font-sans font-bold mt-2">Step 2: Borrowing Cost to Capitalize</p>
            <p>Expenditure on asset × WACR</p>
            <p>= ₹4,20,00,000 × 10.125% = <span className="font-bold">₹42,52,500</span></p>
            <p className="font-sans mt-2">Subject to the cap: cannot exceed actual total borrowing costs of ₹81 lakhs.</p>
          </div>
        )
      },
      {
        title: 'Specific vs General Borrowing Rule',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Specific Borrowings (Para 10):</strong> Actual interest MINUS income earned on temporary investment of surplus funds = amount to capitalize. Straightforward.</p>
            <p><strong>General Borrowings (Para 11):</strong> Use WACR applied to weighted average expenditure. The capitalized amount cannot exceed actual borrowing costs incurred during the period.</p>
            <p className="mt-2"><strong>Mixed Case:</strong> If part of a project is financed by specific borrowing and part by general borrowing, calculate both separately and add.</p>
          </div>
        )
      }
    ],
    examFocus: 'For general borrowings: WACR = Total interest on general borrowings ÷ Total general borrowings. Apply to weighted average expenditure. Cap at actual interest. This is the most numerical AS 16 exam topic.',
    examFocusType: 'trick'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-16-1',
    title: 'Audit Case Study — Defining "Substantial Period of Time" (Audit Challenge on Off-the-shelf vs Customized Assets)',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> Zenith Tech Ltd. capitalized ₹500,000 of borrowing costs on a loan taken to acquire and install a standard off-the-shelf printing press machine.</p>
            <p>The installation, testing, and trial runs took **2 weeks**. The management argues that because the machine is critical to their long-term operations, it represents a "qualifying asset" and interest should be added to its carrying cost.</p>
          </div>
        )
      },
      {
        title: 'Auditor Analysis & Technical Verdict',
        content: (
          <div className="space-y-3 text-xs leading-relaxed">
            <p><strong>1. Qualifying Asset Definition (Para 3.2):</strong> A qualifying asset is an asset that necessarily takes a substantial period of time to get ready for its intended use or sale. In ordinary circumstances, a period of **12 months** is considered a benchmark, unless a shorter/longer period can be justified based on facts.</p>
            <p><strong>2. Standard Off-the-shelf assets:</strong> Assets that are ready for their intended use or sale immediately upon acquisition do not qualify. A 2-week period for routine installation does not meet the "substantial period of time" requirement.</p>
          </div>
        )
      },
      {
        title: 'Audit Report Action',
        content: (
          <div className="p-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl text-xs space-y-2">
            <p className="font-bold text-rose-800 dark:text-rose-300">Auditor's Action:</p>
            <p>The auditor must reject the capitalization of ₹500,000. It must be expensed in the current year P&amp;L as finance costs. If management refuses to adjust, the auditor should qualify their audit report due to non-compliance with AS 16.</p>
          </div>
        )
      }
    ],
    examFocus: 'Off-the-shelf and ready-made assets can NEVER be treated as qualifying assets under AS 16.',
    examFocusType: 'focus'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-16-1',
    title: 'Regulatory Observation — Suspension of Capitalization during Legal Disputes and Natural Delays (NFRA Compliance)',
    category: 'Regulatory Observations',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Overview:</strong> NFRA has observed that several real estate and infrastructure companies continue to capitalize interest even when active construction is suspended for years due to legal disputes, environmental bans, or labor strikes.</p>
            <p><strong>Case:</strong> A company borrowed ₹100M for a bridge construction project. Work was suspended for 8 months because of an NGT environmental ban.</p>
          </div>
        )
      },
      {
        title: 'Suspension Rules (Para 17–18)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Under AS 16, capitalization of borrowing costs should be **suspended** during extended periods in which active development is interrupted.</p>
            <p><strong>Exception:</strong> Capitalization is *not* suspended when a temporary delay is a necessary part of the process of getting the asset ready (e.g. high water levels delaying bridge foundation construction). However, an unexpected environmental ban is **not** a planned technical delay; hence capitalization must be suspended.</p>
          </div>
        )
      }
    ],
    examFocus: 'Interruption due to strike, ban, or litigation requires suspension of capitalization; interest during this period must be expensed.',
    examFocusType: 'concept'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'judicial-16-1',
    title: 'Landmark Judicial Case — CIT vs. Challapalli Sugars Ltd. (Pre-commencement Capitalization of Interest)',
    category: 'Landmark Judicial Cases',
    panels: [
      {
        title: 'Facts of the Case',
        content: (
          <div>
            <p><strong>Supreme Court Precedent:</strong></p>
            <p>The assessee borrowed funds to install sugar machinery and capitalized the interest paid on these borrowings before the machinery went into commercial production.</p>
            <p>The Income Tax Department disputed this capitalization, claiming that interest before commencement of production is revenue expense.</p>
          </div>
        )
      },
      {
        title: 'Supreme Court Ruling',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The Supreme Court held that interest paid on borrowings for the acquisition and construction of plant and machinery before the asset is ready for commercial production should be capitalized as part of the cost of the asset.</p>
            <p>This landmark case forms the judicial basis for pre-commencement interest capitalization under GAAP and **AS 16**.</p>
          </div>
        )
      }
    ],
    examFocus: 'Pre-operational interest is part of the cost of the asset; post-operational interest is a revenue expense.',
    examFocusType: 'focus'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-16-1',
    title: 'Exam Corner — Commencement, Suspension, and Cessation Milestones Summary',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'Commencement check list',
        content: (
          <div className="space-y-2 text-xs">
            <p>Capitalization begins only when **all three** conditions are met:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Expenditure on the asset is being incurred (payment made, assets acquired).</li>
              <li>Borrowing costs are being incurred.</li>
              <li>Activities to prepare the asset are in progress.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Cessation rule',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Capitalize interest until the asset is **substantially complete** (physically finished). Subsequent trial runs or administrative delays do not justify further capitalization.</p>
          </div>
        )
      }
    ],
    examFocus: 'Do not capitalize interest incurred before physical construction begins, even if the loan is already active.',
    examFocusType: 'trap'
  },
  {
    id: 'exam-16-2',
    title: 'Exam Corner — Cessation, Suspension, and Commencement: The Three Milestones Compared',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'Three Milestones Compared',
        content: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-200 dark:border-slate-800">
              <thead><tr className="bg-slate-100 dark:bg-slate-900"><th className="border p-2">Milestone</th><th className="border p-2">Trigger</th><th className="border p-2">Effect</th></tr></thead>
              <tbody>
                <tr><td className="border p-2 font-bold">Commencement</td><td className="border p-2">All 3 conditions met (expenditure + borrowing cost + active development)</td><td className="border p-2">BEGIN capitalizing borrowing costs</td></tr>
                <tr className="bg-blue-50/10"><td className="border p-2 font-bold">Suspension</td><td className="border p-2">Extended interruption NOT part of normal process (strikes, NGT ban, litigation stay)</td><td className="border p-2">STOP capitalizing during interruption; expense the interest</td></tr>
                <tr><td className="border p-2 font-bold">Cessation</td><td className="border p-2">Substantially all activities to prepare the asset are complete</td><td className="border p-2">PERMANENTLY STOP capitalizing; all future interest = revenue expense</td></tr>
              </tbody>
            </table>
          </div>
        )
      },
      {
        title: 'Cessation Nuances',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Key Rule:</strong> If completion of an asset in parts is possible, and each part can be used independently while construction continues on other parts, capitalization ceases for each completed part separately.</p>
            <p>Example: A campus with 4 buildings — Building A is complete and occupied in Q2. Capitalization ceases for Building A in Q2 even if Buildings B, C, D are still under construction.</p>
          </div>
        )
      }
    ],
    examFocus: 'Cessation for an asset with multiple independent parts is part-by-part. Common exam question: Does capitalization continue after Building A is occupied but Buildings B-D are still being built? Answer: Not for Building A.',
    examFocusType: 'concept'
  }
]
