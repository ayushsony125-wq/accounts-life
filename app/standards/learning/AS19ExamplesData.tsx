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
    title={`Open ICAI AS 19 PDF — Page ${page}`}
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
    id: 'illus-19-1',
    title: 'ICAI Illustration 1 — Finance Lease vs Operating Lease Classification (Applying the 5 Indicators Matrix)',
    category: 'Official ICAI Illustration',
    pdfPage: 12,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Matrix Leasing Ltd. leases a machine to Zenith Manufacturing Ltd. under the following terms:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Lease Term = 4 Years</li>
              <li>Useful Life of Machine = 5 Years</li>
              <li>Fair Value of Machine at inception = <strong>₹1,000,000</strong></li>
              <li>Annual Lease Rent = <strong>₹300,000</strong> payable at the end of each year.</li>
              <li>Guaranteed Residual Value (GRV) by Zenith = <strong>₹100,000</strong></li>
              <li>Expected Unguaranteed Residual Value (URV) = <strong>₹50,000</strong></li>
              <li>Discount rate implicit in lease (IRR) = <strong>12.6% p.a.</strong></li>
            </ul>
          </div>
        )
      },
      {
        title: 'Mathematical Computations (PV of MLP)',
        content: (
          <div className="space-y-3 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>Step 1: Identify Minimum Lease Payments (MLP) from Lessee perspective</strong></p>
            <p>MLP = Annual Rents × 4 + GRV = (₹300,000 × 4) + ₹100,000 = <strong>₹1,300,000</strong></p>
            
            <p className="mt-2"><strong>Step 2: Calculate Present Value of MLP (PV of MLP) using IRR (12.6%)</strong></p>
            <p>&nbsp;&nbsp;&nbsp;PV factor at 12.6% for 4 years: Year 1 (0.8881), Year 2 (0.7887), Year 3 (0.7005), Year 4 (0.6221)</p>
            <p>&nbsp;&nbsp;&nbsp;PV of Rents = ₹300,000 × (0.8881 + 0.7887 + 0.7005 + 0.6221) = ₹300,000 × 2.9994 = ₹899,820</p>
            <p>&nbsp;&nbsp;&nbsp;PV of GRV = ₹100,000 × 0.6221 = ₹62,210</p>
            <p>&nbsp;&nbsp;&nbsp;Total PV of MLP = ₹899,820 + ₹62,210 = <strong>₹962,030</strong></p>
            
            <p className="mt-2"><strong>Step 3: Compare PV of MLP with Fair Value</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Fair Value = ₹1,000,000</p>
            <p>&nbsp;&nbsp;&nbsp;Ratio = (₹962,030 / ₹1,000,000) × 100 = <strong>96.2%</strong></p>
          </div>
        )
      },
      {
        title: 'AS 19 Classification Verdict',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The lease is classified as a **Finance Lease** because:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>The lease term of 4 years covers the **major part of the economic life** of the asset (4 / 5 = 80%).</li>
              <li>The PV of minimum lease payments (₹962,030) accounts for **substantially all of the fair value** of the leased asset (96.2%).</li>
            </ol>
          </div>
        )
      }
    ],
    examFocus: 'Lessee MLP excludes unguaranteed residual value (URV); Lessor MLP includes URV in calculations.',
    examFocusType: 'trap'
  },
  {
    id: 'illus-19-2',
    title: 'ICAI Illustration 2 — Lessee Accounting & Capitalization Schedule (Finance Lease Journal Postings)',
    category: 'Official ICAI Illustration',
    pdfPage: 17,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> Zenith Manufacturing Ltd. (Lessee) capitalizes the machine from Illustration 1 at the lower of Fair Value (₹1,000,000) and PV of MLP (₹962,030). Thus, capitalized value is **₹962,030**.</p>
            <p>Zenith needs to split the annual payment of ₹300,000 into interest and principal reduction over the 4-year term using the IRR of 12.6%.</p>
          </div>
        )
      },
      {
        title: 'Amortization Schedule',
        content: (
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-xs font-mono border-collapse border border-slate-200 dark:border-slate-800">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border p-2">Year</th>
                  <th className="border p-2">Opening Bal (₹)</th>
                  <th className="border p-2">Payment (₹)</th>
                  <th className="border p-2">Interest @12.6% (₹)</th>
                  <th className="border p-2">Principal Red. (₹)</th>
                  <th className="border p-2">Closing Bal (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">1</td>
                  <td className="border p-2">962,030</td>
                  <td className="border p-2">300,000</td>
                  <td className="border p-2">121,216</td>
                  <td className="border p-2">178,784</td>
                  <td className="border p-2">783,246</td>
                </tr>
                <tr className="bg-blue-50/10 dark:bg-blue-900/5">
                  <td className="border p-2">2</td>
                  <td className="border p-2">783,246</td>
                  <td className="border p-2">300,000</td>
                  <td className="border p-2">98,689</td>
                  <td className="border p-2">201,311</td>
                  <td className="border p-2">581,935</td>
                </tr>
                <tr>
                  <td className="border p-2">3</td>
                  <td className="border p-2">581,935</td>
                  <td className="border p-2">300,000</td>
                  <td className="border p-2">73,324</td>
                  <td className="border p-2">226,676</td>
                  <td className="border p-2">355,259</td>
                </tr>
                <tr className="bg-blue-50/10 dark:bg-blue-900/5">
                  <td className="border p-2">4</td>
                  <td className="border p-2">355,259</td>
                  <td className="border p-2">400,000*</td>
                  <td className="border p-2">44,741</td>
                  <td className="border p-2">355,259</td>
                  <td className="border p-2">0</td>
                </tr>
              </tbody>
            </table>
            <p className="text-[10px] mt-1 text-slate-500">* Year 4 payment includes annual rent of ₹300,000 + GRV settlement of ₹100,000.</p>
          </div>
        )
      },
      {
        title: 'Journal Postings in Lessee Books',
        content: (
          <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl font-mono text-xs space-y-2">
            <strong>1. Inception (1st April 2023):</strong><br />
            &nbsp;&nbsp;&nbsp;Leased Machine A/c ............... Dr. ₹962,030<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To Lease Liability A/c .......................... ₹962,030<br />
            <br />
            <strong>2. End of Year 1 Payment (31st March 2024):</strong><br />
            &nbsp;&nbsp;&nbsp;Interest Expense A/c .............. Dr. ₹121,216<br />
            &nbsp;&nbsp;&nbsp;Lease Liability A/c ............... Dr. ₹178,784<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To Bank A/c ..................................... ₹300,000
          </div>
        )
      }
    ],
    examFocus: 'Asset is capitalized at the lower of Fair Value and PV of MLP. Always calculate DBO depreciation over the lease term.',
    examFocusType: 'focus'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-19-1',
    title: 'Business Case — Operating Lease Rent Escalation (Straight-lining Stepped Rentals & Rent-Free Periods)',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Retail Ltd. (Lessee)</p>
            <p><strong>The Transaction:</strong> Leased a retail showroom for **3 Years** under the following rental structure:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Year 1: **Rent-Free Period** (zero rent to facilitate renovation).</li>
              <li>Year 2: Annual Rent = <strong>₹120,000</strong></li>
              <li>Year 3: Annual Rent = <strong>₹180,000</strong></li>
            </ul>
            <p className="mt-2">Zenith Retail wants to determine the annual lease expense to be recognized under AS 19.</p>
          </div>
        )
      },
      {
        title: 'Calculations & Straight-Lining',
        content: (
          <div className="space-y-3 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>Step 1: Calculate Total Lease Rental Commitment over Lease Term</strong></p>
            <p>Total Rent = Year 1 (₹0) + Year 2 (₹120,000) + Year 3 (₹180,000) = <strong>₹300,000</strong></p>
            
            <p className="mt-2"><strong>Step 2: Straight-Line Expense Allocation (3 Years lease term)</strong></p>
            <p>Annual Operating Lease Expense = Total Rent (₹300,000) / 3 Years = <strong>₹100,000 per year</strong></p>
            
            <p className="mt-2"><strong>Step 3: Journal Postings &amp; Lease Equalization Account</strong></p>
            <p><strong>Year 1:</strong></p>
            <p>Lease Rental Expense A/c ....... Dr. ₹100,000</p>
            <p>&nbsp;&nbsp;To Lease Equalization A/c ............... ₹100,000 (Credited as liability)</p>
            
            <p className="mt-2"><strong>Year 2:</strong></p>
            <p>Lease Rental Expense A/c ....... Dr. ₹100,000</p>
            <p>Lease Equalization A/c .......... Dr. ₹20,000</p>
            <p>&nbsp;&nbsp;To Bank A/c ............................. ₹120,000</p>

            <p className="mt-2"><strong>Year 3:</strong></p>
            <p>Lease Rental Expense A/c ....... Dr. ₹100,000</p>
            <p>Lease Equalization A/c .......... Dr. ₹80,000</p>
            <p>&nbsp;&nbsp;To Bank A/c ............................. ₹180,000</p>
          </div>
        )
      }
    ],
    examFocus: 'Stepped rentals must be straight-lined unless the escalation matches expected inflation rates.',
    examFocusType: 'adjustment'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-19-1',
    title: 'Audit Case Study — guaranteed vs unguaranteed residual value and audit risk of overstated assets',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> Zenith Net Ltd. (Lessor) leased equipment to Client A. The lessor computed the implicit interest rate (IRR) by assuming a Residual Value of ₹500,000 (of which ₹100,000 is guaranteed by the client, and ₹400,000 is unguaranteed).</p>
            <p>During the audit, the statutory auditor notes that similar used equipment is selling in the market for ₹150,000. This indicates that the Unguaranteed Residual Value (URV) of ₹400,000 is highly overstated.</p>
          </div>
        )
      },
      {
        title: 'Auditor Analysis & Technical Rules',
        content: (
          <div className="space-y-3 text-xs leading-relaxed">
            <p><strong>1. Overstatement of Lease Receivables:</strong> An overstated URV understates the IRR rate or overstates the unearned finance income. This results in the overvaluation of Net Investment in Leases (Receivable) in the lessor's balance sheet.</p>
            <p><strong>2. AS 19 Impairment Review (Para 26):</strong> The lessor must regularly review estimated unguaranteed residual values. If there has been a reduction in the estimated URV, the lessor must revise the income allocation over the lease term and recognize any reduction immediately in the P&amp;L statement.</p>
          </div>
        )
      }
    ],
    examFocus: 'Lessor must review URV annually. Reductions in URV immediately trigger income reversals and asset impairment.',
    examFocusType: 'focus'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-19-1',
    title: 'Regulatory Observation — Sale & Leaseback Transactions (NCLT & SEBI Audit Findings)',
    category: 'Regulatory Observations',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Overview:</strong> Companies often enter into sale and leaseback arrangements to raise liquidity, revaluing assets and booking immediate profits in P&amp;L to window-dress financial statements.</p>
            <p><strong>Case:</strong> A company sold its warehouse (Book Value ₹50M) for ₹80M and immediately leased it back for 15 years (major economic life), classifying it as an operating lease and booking a ₹30M gain in P&amp;L.</p>
          </div>
        )
      },
      {
        title: 'AS 19 Rules (Para 47–51)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Sale &amp; Leaseback resulting in Finance Lease:</strong> If the leaseback is a finance lease, any excess of sale proceeds over the carrying amount should **not** be immediately recognized as income. Instead, it should be deferred and amortized over the lease term in proportion to the depreciation of the leased asset.</p>
            <p><strong>Regulatory Penalty:</strong> The company was forced by SEBI to restate its accounts, remove the ₹30M immediate profit from P&amp;L, and record it as deferred income under liabilities.</p>
          </div>
        )
      }
    ],
    examFocus: 'Deferred income on sale-and-leaseback under finance lease is amortized in proportion to depreciation, not straight-line.',
    examFocusType: 'adjustment'
  },
  {
    id: 'reg-19-2',
    title: 'Regulatory Observation 2 — ICAI Guidance Note vs AS 19: Lease Equalization Reserve (LER)',
    category: 'Regulatory Observations',
    panels: [
      {
        title: 'The Conflict',
        content: (
          <div>
            <p><strong>Context:</strong> Before AS 19 became mandatory, many non-banking financial companies (NBFCs) and leasing firms used the **ICAI Guidance Note on Accounting for Leases**, which recommended creating a "Lease Equalization Charge/Reserve" in the P&amp;L to match lease income with the capital recovery component.</p>
            <p className="mt-2"><strong>Issue:</strong> Some entities continued to present LER in their CFS even after AS 19 was introduced, leading to regulatory objections by MCA and NFRA.</p>
          </div>
        )
      },
      {
        title: 'Regulatory Ruling & Transition',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>1. **Supercession:** AS 19 is a comprehensive standard that completely governs the recognition of lease income/expense. Once AS 19 is applied, the creation of a separate Lease Equalization Reserve out of net profits or as an adjustment to revenue is **prohibited**.</p>
            <p>2. **NFRA Enforcement:** NFRA has penalized multiple entities for artificially smoothing their profits using LER, noting that AS 19 requires finance lease income to reflect a constant periodic rate of return on the lessor's net investment, with no room for additional equalization adjustments.</p>
          </div>
        )
      }
    ],
    examFocus: 'Lease Equalization Reserve is obsolete under AS 19. All income must flow strictly through the implicit rate of return or straight-line method.',
    examFocusType: 'trap'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'judicial-19-1',
    title: 'Landmark Judicial Case — CIT vs. Mid East Portfolio Ltd. (Ownership vs Depreciation Claim in Leased Assets)',
    category: 'Landmark Judicial Cases',
    panels: [
      {
        title: 'Facts & Legal Dispute',
        content: (
          <div>
            <p><strong>Legal Precedent:</strong></p>
            <p>The Income Tax Department disallowed the depreciation claim of a lessor on equipment leased out under a finance lease, claiming that since the lessee is using the asset and has capitalized it in their books under AS 19, the lessor is not the owner for tax purposes.</p>
          </div>
        )
      },
      {
        title: 'Judicial Ruling',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The Supreme Court held that accounting entries under accounting standards (AS 19) do not override the statutory provisions of the Income Tax Act. Under tax laws, the **lessor** remains the legal owner of the leased asset and is entitled to claim depreciation, regardless of how the transaction is capitalized in the lessee's books under AS 19.</p>
          </div>
        )
      }
    ],
    examFocus: 'AS 19 capitalization by lessee does not deny the lessor the right to claim tax depreciation under Indian tax laws.',
    examFocusType: 'concept'
  },
  {
    id: 'judicial-19-2',
    title: 'Landmark Judicial Case 2 — Association of Leasing Companies vs. Union of India (Sales Tax vs Service Tax on Lease Rentals)',
    category: 'Landmark Judicial Cases',
    panels: [
      {
        title: 'Legal Dispute',
        content: (
          <div>
            <p><strong>The Issue:</strong> Whether lease transactions constitute a "deemed sale" under Article 366(29A)(d) of the Constitution of India (subject to local Sales Tax/VAT) or a service (subject to Service Tax/GST).</p>
            <p className="mt-2">Tax authorities argued that since finance leases transfer substantially all risks and rewards, they should be taxed as sales, while operating leases should be taxed as services.</p>
          </div>
        )
      },
      {
        title: 'Supreme Court Ruling',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The Supreme Court ruled that the transfer of the "right to use" goods is the defining criterion for deemed sales. Under a finance lease, there is a clear transfer of the right to use, making it liable to sales tax/VAT.</p>
            <p className="mt-2">Under the current GST regime, all leases (finance and operating) are classified as **supply of services** (except where ownership transfers at the end of the term, which is classified as supply of goods), establishing a uniform tax base regardless of the AS 19 accounting classification.</p>
          </div>
        )
      }
    ],
    examFocus: 'For tax purposes, the accounting distinction between finance and operating leases under AS 19 is secondary to the statutory definition of supply under GST laws.',
    examFocusType: 'concept'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-19-1',
    title: 'Exam Corner — Net Investment vs Gross Investment & Unearned Finance Income Calculations',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'Gross & Net Investment Formulae',
        content: (
          <div className="space-y-2 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p>Gross Investment = Minimum Lease Payments + Unguaranteed Residual Value (URV)</p>
            <p>Net Investment = Present Value of Gross Investment (discounted at IRR)</p>
            <p>Unearned Finance Income = Gross Investment − Net Investment</p>
          </div>
        )
      }
    ],
    examFocus: 'Unearned Finance Income represents the future interest revenue to be recognized by the lessor.',
    examFocusType: 'trap'
  },
  {
    id: 'exam-19-2',
    title: 'Exam Corner 2 — Sale & Leaseback under Operating Lease (Price Scenario Matrix)',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'The Scenario Matrix',
        content: (
          <div className="overflow-x-auto">
            <table className="w-full text-[10px] font-mono border-collapse border border-slate-200 dark:border-slate-800">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-900">
                  <th className="border p-2">Sale Price Relative to Fair Value (FV)</th>
                  <th className="border p-2">Selling Price Relative to Book Value (BV)</th>
                  <th className="border p-2">AS 19 Treatment & P&amp;L Recognition</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-sans font-semibold">1. Equal to Fair Value</td>
                  <td className="border p-2">Any price (SP &gt; BV or SP &lt; BV)</td>
                  <td className="border p-2">Recognize profit or loss **immediately** in P&amp;L.</td>
                </tr>
                <tr className="bg-blue-50/10">
                  <td className="border p-2 font-sans font-semibold" rowSpan={2}>2. Below Fair Value</td>
                  <td className="border p-2">Loss is NOT compensated by future low rents</td>
                  <td className="border p-2">Recognize loss **immediately** in P&amp;L.</td>
                </tr>
                <tr className="bg-blue-50/10">
                  <td className="border p-2">Loss IS compensated by future low rents</td>
                  <td className="border p-2">**Defer** the loss and amortize it in proportion to lease payments over lease term.</td>
                </tr>
                <tr>
                  <td className="border p-2 font-sans font-semibold">3. Above Fair Value</td>
                  <td className="border p-2">Sale Price &gt; Fair Value</td>
                  <td className="border p-2">**Defer** the excess of Sale Price over Fair Value, and amortize it over expected period of asset use.</td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      },
      {
        title: 'Illustrative Example Calculation',
        content: (
          <div className="space-y-2 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>Facts:</strong> Carrying Value = ₹80,000; Fair Value = ₹1,00,000; Sale Price = ₹1,20,000.</p>
            <p><strong>Analysis:</strong> Sale price is above Fair Value. The excess of SP over FV (₹1,20,000 − ₹1,00,000 = ₹20,000) must be deferred.</p>
            <p><strong>P&amp;L Recognition:</strong></p>
            <p>Immediate Profit = FV − Carrying Value = ₹1,00,000 − ₹80,000 = <strong>₹20,000</strong></p>
            <p>Deferred Gain (Liability) = SP − FV = ₹1,20,000 − ₹1,00,000 = <strong>₹20,000</strong> (amortized over lease term)</p>
          </div>
        )
      }
    ],
    examFocus: 'Remember: In an operating leaseback, if SP > FV, you CANNOT recognize the entire profit immediately. You must split it: FV - BV is immediate profit, and SP - FV is deferred profit.',
    examFocusType: 'trick'
  }
]
