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
    title={`Open ICAI AS 22 PDF — Page ${page}`}
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
    id: 'illus-22-1',
    title: 'ICAI Illustration 1 — Timing Differences: Depreciation (WDV vs SLM) and Deferred Tax Computation',
    category: 'Official ICAI Illustration',
    pdfPage: 10,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Manufacturing Ltd. (FY 2023-24)</p>
            <p><strong>Asset:</strong> Machinery costing ₹10,00,000 purchased on 01.04.2023 (4-year life)</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Accounting depreciation (SLM): ₹10,00,000 ÷ 4 = <strong>₹2,50,000 per year</strong></li>
              <li>Tax depreciation (WDV @ 25%): Year 1 = ₹10,00,000 × 25% = <strong>₹2,50,000</strong></li>
              <li>In Year 2: Tax WDV = ₹7,50,000 × 25% = ₹1,87,500. Accounting = ₹2,50,000.</li>
            </ul>
            <p className="mt-2">Tax rate = 30%. Accounting profit before depreciation = ₹8,00,000 per year.</p>
          </div>
        )
      },
      {
        title: 'Year 1 Deferred Tax Computation',
        content: (
          <div className="space-y-2 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>Year 1:</strong></p>
            <p>Accounting Profit before tax: ₹8,00,000 − ₹2,50,000 = ₹5,50,000</p>
            <p>Taxable Profit: ₹8,00,000 − ₹2,50,000 = ₹5,50,000 (same — no timing diff in Yr 1)</p>
            <p>DTA/DTL = Nil in Year 1 (depreciation is exactly equal)</p>
            <hr className="my-1 border-slate-200 dark:border-slate-800" />
            <p><strong>Year 2:</strong></p>
            <p>Accounting depreciation = ₹2,50,000</p>
            <p>Tax depreciation (WDV) = ₹7,50,000 × 25% = ₹1,87,500</p>
            <p>Timing difference = ₹2,50,000 − ₹1,87,500 = <strong>₹62,500</strong> (Book &gt; Tax)</p>
            <p>Taxable income &gt; Book income → DTL arises</p>
            <p>DTL = ₹62,500 × 30% = <strong>₹18,750</strong></p>
          </div>
        )
      },
      {
        title: 'Journal Entries (Year 2)',
        content: (
          <div className="space-y-2 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p className="font-sans font-bold">Deferred Tax Entry (Year 2):</p>
            <p>Dr. Tax Expense (P&amp;L) &nbsp;&nbsp;&nbsp;&nbsp;₹18,750</p>
            <p>&nbsp;&nbsp;Cr. Deferred Tax Liability (B/S) &nbsp;&nbsp;&nbsp;₹18,750</p>
            <p className="font-sans mt-2">(Being deferred tax liability recognized on timing difference)</p>
            <hr className="my-1 border-slate-200 dark:border-slate-800" />
            <p className="font-sans font-bold">Tax P&amp;L Breakdown (Year 2):</p>
            <p>Current Tax = ₹5,50,000 + ₹62,500 = ₹6,12,500 × 30% = ₹1,83,750</p>
            <p>Deferred Tax (DTL created) = ₹18,750</p>
            <p>Total Tax Expense = ₹2,02,500</p>
          </div>
        )
      },
      {
        title: 'Reversal in Later Years',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>In Years 3 and 4, as the asset ages under WDV method, tax depreciation decreases further while accounting SLM remains flat. DTL continues to build.</p>
            <p>When the asset is fully depreciated for accounting but tax WDV still exists, the timing difference reverses and the DTL unwinds (reduces to zero).</p>
            <p><strong>Net effect:</strong> Total tax expense over the 4-year life equals the same as if no deferral occurred — AS 22 ensures the correct matching of tax to the period income is earned.</p>
          </div>
        )
      }
    ],
    examFocus: 'WDV tax depreciation > SLM accounting depreciation in early years → Taxable income < Book income → DTA arises. The pattern reverses in later years.',
    examFocusType: 'trap'
  },
  {
    id: 'illus-22-2',
    title: 'ICAI Illustration 2 — Permanent Differences vs Timing Differences (Clubbing Expenses & Donation Treatment)',
    category: 'Official ICAI Illustration',
    pdfPage: 14,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario (FY 2023-24):</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Accounting profit: ₹10,00,000</li>
              <li>Expenditure on club membership for MD: ₹50,000 (disallowed permanently under Income Tax)</li>
              <li>Donation to PM Relief Fund: ₹1,00,000 (100% deductible under Sec 80G — benefit in tax only, not accounting)</li>
              <li>Timing difference from depreciation: ₹80,000 (tax depreciation &gt; accounting depreciation)</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Classification: Permanent vs Timing',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Permanent Differences — NO Deferred Tax:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Club membership (₹50,000): Permanently disallowed in tax; will never reverse → Permanent difference. No DTA/DTL.</li>
              <li>PM Relief Fund (₹1,00,000): Under accounting, it is an expense; under tax, it is deductible with 100% deduction under Sec 80G. The tax benefit is permanent (no future reversal). No DTA/DTL for this.</li>
            </ul>
            <p className="mt-2"><strong>Timing Differences — DTA Recognized:</strong></p>
            <p>Depreciation difference (₹80,000): Tax depreciation &gt; accounting → Current taxable income lower than book → <strong>DTA arises</strong> (will reverse when tax depreciation drops below accounting in future years).</p>
            <p>DTA = ₹80,000 × 30% = <strong>₹24,000</strong></p>
          </div>
        )
      },
      {
        title: 'Tax Computation Summary',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p><strong>Accounting Profit:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹10,00,000</strong></p>
            <p>Add: Club Membership (Permanent add-back):&nbsp;₹50,000</p>
            <p>Less: PM Relief Fund (Extra deduction):&nbsp;(₹1,00,000)</p>
            <p>Less: Timing Diff (Tax dep &gt; Acc dep):&nbsp;&nbsp;(₹80,000)</p>
            <p className="font-bold">Taxable Income:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹8,70,000</p>
            <p>Current Tax (30%):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹2,61,000</p>
            <p>Deferred Tax (DTA on ₹80K × 30%):&nbsp;(₹24,000)</p>
            <p className="font-bold">Total Tax Expense per P&amp;L:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹2,37,000</p>
          </div>
        )
      }
    ],
    examFocus: 'Permanent differences NEVER give rise to DTA or DTL. Only timing differences create deferred tax. Do not confuse the two.',
    examFocusType: 'trap'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-22-1',
    title: 'Business Case — Unabsorbed Depreciation & Business Losses (DTA Recognition Criteria)',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Sunrise Hotels Ltd. (FY 2023-24 — COVID recovery phase)</p>
            <p>The company has:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Accumulated business losses of ₹15,00,00,000 (carried forward under Income Tax Act)</li>
              <li>Unabsorbed depreciation of ₹8,00,00,000</li>
              <li>Future profitability is uncertain — the company has made losses for 3 consecutive years</li>
              <li>Tax rate = 25%</li>
            </ul>
          </div>
        )
      },
      {
        title: 'AS 22 Prudence Rule — Para 15 (Deferred Tax on Losses)',
        content: (
          <div className="space-y-3 text-xs leading-relaxed">
            <p><strong>General Rule (Para 13):</strong> DTA is recognized for timing differences and for unused tax losses and credits, but ONLY to the extent it is <strong>reasonably certain</strong> that sufficient future taxable income will be available.</p>
            <p><strong>Stricter Rule for Losses (Para 15):</strong> In the case of unabsorbed depreciation and carry-forward business losses, DTA is recognized ONLY to the extent there is <strong>virtual certainty</strong> of future taxable income against which such DTA can be realized.</p>
            <p><strong>Conclusion for Sunrise Hotels:</strong> With 3 consecutive loss years and uncertain recovery, "virtual certainty" cannot be established. DTA on ₹23Cr losses/unabsorbed depreciation = NOT RECOGNIZED.</p>
          </div>
        )
      },
      {
        title: 'Recognition Test Comparison',
        content: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-200 dark:border-slate-800">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-900">
                  <th className="border p-2">Type of Deferred Tax</th>
                  <th className="border p-2">Recognition Threshold</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-2">DTL (timing diff)</td><td className="border p-2">Always recognize (para 13)</td></tr>
                <tr className="bg-blue-50/10"><td className="border p-2">DTA (timing diff)</td><td className="border p-2">Reasonably certain of future taxable income</td></tr>
                <tr><td className="border p-2">DTA on business loss/unabsorbed dep</td><td className="border p-2 font-bold text-rose-700 dark:text-rose-400">VIRTUAL CERTAINTY of future taxable income</td></tr>
              </tbody>
            </table>
          </div>
        )
      },
      {
        title: 'Disclosure Requirement',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Even when DTA is not recognized, the company must disclose (Para 23):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The amount of unrecognized DTA and the reason for non-recognition</li>
              <li>Unabsorbed depreciation or carry-forward losses that exist</li>
            </ul>
            <p className="mt-2">If the company subsequently achieves virtual certainty (e.g., secures long-term contracts), it can recognize the DTA in the future.</p>
          </div>
        )
      }
    ],
    examFocus: '"Reasonably certain" for normal DTA. "Virtual certainty" for DTA on unabsorbed depreciation and business losses — always check which applies.',
    examFocusType: 'trap'
  },
  {
    id: 'case-22-2',
    title: 'Business Case — DTL Arising from Investment Revaluation at Amalgamation',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> Omega Ltd. acquires Beta Ltd. under a merger. Beta's factory building is taken over at book value of ₹5 crores but has a fair value of ₹8 crores.</p>
            <p className="mt-2">For accounting purposes, Omega records the building at ₹8 crores (fair value). For tax purposes, the step-up in basis is NOT permitted — tax continues at ₹5 crores book value.</p>
            <p>Tax rate = 25%.</p>
          </div>
        )
      },
      {
        title: 'AS 22 Treatment',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The upward revaluation of ₹3 crores (₹8Cr − ₹5Cr) creates a timing difference:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Accounting: Higher depreciation on ₹8Cr asset in future</li>
              <li>Tax: Lower depreciation on ₹5Cr cost</li>
            </ul>
            <p className="mt-2">This means accounting profit will be lower than taxable profit in future years (reverse of usual) → <strong>DTL must be recognized</strong> on revaluation surplus.</p>
            <p>DTL = ₹3,00,00,000 × 25% = <strong>₹75,00,000</strong></p>
          </div>
        )
      },
      {
        title: 'Journal Entry',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p className="font-sans font-bold">On recording revaluation:</p>
            <p>Dr. Fixed Asset (Building)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹3,00,00,000</p>
            <p>&nbsp;&nbsp;Cr. Revaluation Reserve&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹2,25,00,000</p>
            <p>&nbsp;&nbsp;Cr. Deferred Tax Liability&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹75,00,000</p>
            <p className="font-sans mt-2">(DTL is recognized net of the revaluation surplus, credited directly to reserves — not through P&amp;L)</p>
          </div>
        )
      }
    ],
    examFocus: 'DTL arising from revaluation of assets is recognized directly against revaluation reserve — not through the P&L statement.',
    examFocusType: 'adjustment'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-22-1',
    title: 'Audit Case Study — Non-recognition of DTL on Accelerated Tax Depreciation (Underpayment of Taxes)',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> During audit of Zenith Steel Ltd., the auditor notes that the company's tax depreciation (WDV) significantly exceeds accounting depreciation (SLM) by ₹4,00,00,000 in FY 2023-24. Management has not recognized any DTL, arguing that "tax payments will even out over time."</p>
          </div>
        )
      },
      {
        title: 'Auditor Analysis — Para 13 (DTL is Always Recognized)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Under AS 22 Para 13, <strong>deferred tax liabilities are always recognized</strong> for all timing differences. Unlike DTA (which requires reasonable/virtual certainty), there is NO threshold test for DTL — it must always be recognized.</p>
            <p>DTL = ₹4,00,00,000 × 30% = <strong>₹1,20,00,000</strong> must be recognized.</p>
            <p><strong>Auditor Action:</strong> Issue a qualification in audit report if management refuses to recognize. Raise with Audit Committee.</p>
          </div>
        )
      },
      {
        title: 'Corrective Journal Entry Required',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p>Dr. Tax Expense (P&amp;L)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹1,20,00,000</p>
            <p>&nbsp;&nbsp;Cr. Deferred Tax Liability (B/S)&nbsp;₹1,20,00,000</p>
            <p className="font-sans mt-2">(Being DTL recognized on accelerated tax depreciation timing difference — mandatory under AS 22)</p>
          </div>
        )
      }
    ],
    examFocus: 'DTL is ALWAYS recognized — no threshold of certainty applies unlike DTA. Management cannot argue "it will even out" to avoid DTL recognition.',
    examFocusType: 'focus'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-22-1',
    title: 'NFRA Observation — Netting of DTA and DTL Without Meeting AS 22 Offset Criteria',
    category: 'Regulatory Observations',
    panels: [
      {
        title: 'Regulatory Issue',
        content: (
          <div>
            <p><strong>NFRA Finding:</strong> Several companies net off DTA and DTL on the face of the balance sheet without meeting the legally enforceable right to offset test under AS 22.</p>
            <p className="mt-2"><strong>Incorrect Practice:</strong> Company A has DTA of ₹80L (on business losses) and DTL of ₹120L (on timing differences). They show net DTL of ₹40L on the balance sheet without disclosing both components.</p>
          </div>
        )
      },
      {
        title: 'AS 22 Offset Criteria (Para 20)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>DTA and DTL may be offset in the balance sheet ONLY if:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>The enterprise has a legally enforceable right to set off current tax assets against current tax liabilities; AND</li>
              <li>The deferred tax assets and liabilities relate to taxes levied by the same governing taxation laws; AND</li>
              <li>The enterprise intends to settle on a net basis</li>
            </ol>
            <p className="mt-2">NFRA's position: DTA on business losses vs. DTL on depreciation differences — these may relate to different types and years and should not be netted unless all conditions are met.</p>
          </div>
        )
      },
      {
        title: 'Correct Presentation',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p className="font-sans font-bold">Balance Sheet (Correct):</p>
            <p>Non-current Assets:</p>
            <p>&nbsp;&nbsp;Deferred Tax Asset (timing differences):&nbsp;₹80,00,000</p>
            <p>Non-current Liabilities:</p>
            <p>&nbsp;&nbsp;Deferred Tax Liability (depreciation):&nbsp;&nbsp;₹1,20,00,000</p>
            <p className="font-sans mt-2 font-bold">NOT acceptable:</p>
            <p className="font-sans">Net DTL ₹40L on face without meeting offset criteria</p>
          </div>
        )
      }
    ],
    examFocus: 'DTA and DTL cannot be simply netted against each other unless the strict legal right of offset and same-jurisdiction conditions under Para 20 are both met.',
    examFocusType: 'adjustment'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'judicial-22-1',
    title: 'Judicial Case — Supreme Court on Deferred Tax & MAT Credit Interaction',
    category: 'Landmark Judicial Cases',
    panels: [
      {
        title: 'Facts & Background',
        content: (
          <div>
            <p><strong>Issue:</strong> Companies paying MAT (Minimum Alternate Tax) under Sec 115JB have a MAT credit entitlement (carryforward). This MAT credit is distinct from the DTA concept under AS 22.</p>
            <p className="mt-2">Companies were including MAT credit entitlement in DTA balances, which inflated deferred tax assets reported under AS 22.</p>
          </div>
        )
      },
      {
        title: 'ICAI / Court Guidance',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>ICAI Position:</strong> MAT credit is a future benefit (prepaid tax) and is NOT a timing difference in the AS 22 sense. It should be shown separately from DTA, not clubbed with it.</p>
            <p><strong>Correct Treatment:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Recognize MAT credit as a current asset (or separate non-current asset) to the extent it is "reasonably certain" to be utilized within the carryforward period</li>
              <li>Disclose separately from DTA arising from timing differences</li>
              <li>Do NOT include in the "Deferred Tax Assets" line in the balance sheet</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'MAT credit entitlement is NOT an AS 22 DTA. It is a separate asset (advance tax / prepaid tax) and must be disclosed separately from deferred tax.',
    examFocusType: 'concept'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-22-1',
    title: 'Exam Corner — DTA vs DTL Recognition Rules & Key Mnemonics',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'When DTA/DTL Arises: Quick Framework',
        content: (
          <div className="space-y-2 text-xs leading-relaxed font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p className="font-sans font-bold">If Accounting Expense &gt; Tax Expense → Taxable Income &gt; Book Income:</p>
            <p>→ Company pays MORE tax now, LESS tax later</p>
            <p>→ <strong>DTA (Asset — future tax saving)</strong></p>
            <hr className="my-1 border-slate-300 dark:border-slate-700" />
            <p className="font-sans font-bold">If Tax Expense &gt; Accounting Expense → Taxable Income &lt; Book Income:</p>
            <p>→ Company pays LESS tax now, MORE tax later</p>
            <p>→ <strong>DTL (Liability — future tax obligation)</strong></p>
          </div>
        )
      },
      {
        title: 'Common Real-World Examples',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>DTA situations:</strong></p>
            <ul className="list-disc pl-5 space-y-0.5">
              <li>Provision for doubtful debts (expenses in books, not yet deductible in tax)</li>
              <li>Bonus accrued but not paid (deductible when paid)</li>
              <li>Warranty provision (books expense it now; tax allows when paid)</li>
              <li>Carry-forward losses (if virtual certainty exists)</li>
            </ul>
            <p className="mt-2"><strong>DTL situations:</strong></p>
            <ul className="list-disc pl-5 space-y-0.5">
              <li>Tax WDV depreciation &gt; SLM accounting depreciation (early years)</li>
              <li>Revenue recognized in books earlier than in tax</li>
              <li>Asset revaluation upwards without corresponding tax step-up</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Key Exam Trap Points',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>DTL is ALWAYS recognized</strong> — no certainty threshold.</li>
              <li>DTA requires <strong>reasonable certainty</strong> for timing differences.</li>
              <li>DTA on unabsorbed depreciation/business losses requires <strong>virtual certainty</strong>.</li>
              <li><strong>Permanent differences</strong> (e.g., club membership) → NO deferred tax ever.</li>
              <li>DTL from revaluation → credited to <strong>revaluation reserve</strong>, not P&amp;L.</li>
              <li>MAT credit → separate asset, NOT part of AS 22 DTA.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'DTL = always recognize. DTA = "reasonably certain". DTA on losses = "virtually certain". These three thresholds are the MOST TESTED concept in AS 22.',
    examFocusType: 'trick'
  }
]
