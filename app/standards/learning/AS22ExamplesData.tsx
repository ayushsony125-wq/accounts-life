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
    title={`Open ICAI AS 22 PDF — Page ${page}`}
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
    id: 'illus-22-1',
    title: 'ICAI Illustration 1 — Timing Difference on Depreciation (Creation of Deferred Tax Liability)',
    category: 'Official ICAI Illustration',
    pdfPage: 5,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Delta Ltd. purchases a machine for <strong>₹10,00,000</strong> on 1st April 20X1:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Depreciation rate as per Companies Act (SLM) = <strong>10%</strong>.</li>
              <li>Depreciation rate as per Income Tax Act (WDV) = <strong>20%</strong>.</li>
              <li>Profit before depreciation and tax = <strong>₹5,00,000</strong>.</li>
              <li>Enacted Tax Rate = <strong>30%</strong>.</li>
            </ul>
            <p className="mt-2"><strong>Issue:</strong> Calculate the Current Tax, Deferred Tax Liability (DTL), and Tax Expense for the year 20X1-X2. <PdfRefInline page={5} /></p>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div className="space-y-3 font-mono text-xs p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>Step 1: Calculate Depreciation for both purposes</strong></p>
            <p>• Accounting Depreciation = ₹10,00,000 × 10% = <strong>₹1,00,000</strong></p>
            <p>• Tax Depreciation = ₹10,00,000 × 20% = <strong>₹2,00,000</strong></p>
            
            <p className="mt-2"><strong>Step 2: Calculate Accounting Income and Taxable Income</strong></p>
            <p>• Accounting Income = ₹5,00,000 - ₹1,00,000 (Dep) = <strong>₹4,00,000</strong></p>
            <p>• Taxable Income = ₹5,00,000 - ₹2,00,000 (Dep) = <strong>₹3,00,000</strong></p>
            
            <p className="mt-2"><strong>Step 3: Calculate Current Tax</strong></p>
            <p>Current Tax = Taxable Income × 30% = ₹3,00,000 × 30% = <strong>₹90,000</strong></p>
            
            <p className="mt-2"><strong>Step 4: Compute Timing Difference and Deferred Tax</strong></p>
            <p>• Timing Difference = Tax Depreciation - Accounting Depreciation = ₹2,00,000 - ₹1,00,000 = <strong>₹1,00,000</strong> (Tax depreciation is higher, so it is a taxable timing difference)</p>
            <p>• DTL Created = ₹1,00,000 × 30% = <strong>₹30,000</strong></p>
            
            <p className="mt-2"><strong>Step 5: Determine Tax Expense</strong></p>
            <p>Tax Expense = Current Tax + DTL = ₹90,000 + ₹30,000 = <strong>₹1,20,000</strong></p>
            <p><i>Verification: Accounting Income ₹4,00,000 × 30% = ₹1,20,000 (Perfect matching of tax expense against accounting profit!)</i></p>
          </div>
        )
      },
      {
        title: 'Accounting Entry',
        content: (
          <div className="space-y-2">
            <p><strong>Journal Entries on 31st March 20X2:</strong></p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono text-xs space-y-2">
              <div>
                <p>Profit &amp; Loss A/c .................... Dr. ₹90,000</p>
                <p>&nbsp;&nbsp;To Provision for Current Tax .............. Cr. ₹90,000</p>
                <p><i>(Being current tax liability provided)</i></p>
              </div>
              <div>
                <p>Profit &amp; Loss A/c .................... Dr. ₹30,000</p>
                <p>&nbsp;&nbsp;To Deferred Tax Liability ................. Cr. ₹30,000</p>
                <p><i>(Being DTL recognized on depreciation timing difference)</i></p>
              </div>
            </div>
          </div>
        )
      }
    ],
    examFocus: 'Depreciation differences are timing differences. When tax depreciation exceeds accounting depreciation in the early years, it creates a Deferred Tax Liability (DTL). In later years, when accounting depreciation exceeds tax depreciation, this DTL will reverse.',
    examFocusType: 'focus'
  },
  {
    id: 'illus-22-2',
    title: 'ICAI Illustration 2 — Timing Difference on Provisions (Creation of Deferred Tax Asset under Section 43B)',
    category: 'Official ICAI Illustration',
    pdfPage: 7,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Financial Data:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Accounting Profit before tax = <strong>₹10,00,000</strong>.</li>
              <li>Provision for Gratuity made in the accounts = <strong>₹1,50,000</strong>.</li>
              <li>Actual Gratuity paid during the year = <strong>₹50,000</strong>.</li>
              <li>Tax Rules (Section 43B / 40A(7)): Gratuity provisions are disallowed for tax purposes in the year of creation, and allowed as a deduction only in the year of actual payment.</li>
              <li>Enacted Tax Rate = <strong>30%</strong>.</li>
            </ul>
            <p className="mt-2"><strong>Issue:</strong> Compute Current Tax, Deferred Tax Asset (DTA), and Tax Expense. <PdfRefInline page={7} /></p>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div className="space-y-3 font-mono text-xs p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>Step 1: Calculate Taxable Income</strong></p>
            <p>• Accounting Profit = ₹10,00,000</p>
            <p>• Add back disallowed Provision: +₹1,50,000</p>
            <p>• Deduct actual payment: -₹50,000</p>
            <p>• Taxable Income = ₹10,00,000 + ₹1,00,000 = <strong>₹11,00,000</strong></p>
            
            <p className="mt-2"><strong>Step 2: Calculate Current Tax</strong></p>
            <p>Current Tax = ₹11,00,000 × 30% = <strong>₹3,30,000</strong></p>
            
            <p className="mt-2"><strong>Step 3: Compute Timing Difference and Deferred Tax Asset</strong></p>
            <p>• Unallowed provision = ₹1,00,000 (which will reverse in future years when paid).</p>
            <p>• DTA Created = ₹1,00,000 × 30% = <strong>₹30,000</strong> (Prudence check: there is reasonable certainty of future profits to realize this asset).</p>
            
            <p className="mt-2"><strong>Step 4: Determine Tax Expense</strong></p>
            <p>Tax Expense = Current Tax - DTA = ₹3,30,000 - ₹30,000 = <strong>₹3,00,000</strong></p>
            <p><i>Verification: Accounting Profit ₹10,00,000 × 30% = ₹3,00,000 (Consistent matching!)</i></p>
          </div>
        )
      },
      {
        title: 'Accounting Entry',
        content: (
          <div className="space-y-2">
            <p><strong>Journal Entries on 31st March 20X2:</strong></p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono text-xs space-y-2">
              <div>
                <p>Profit &amp; Loss A/c .................... Dr. ₹3,30,000</p>
                <p>&nbsp;&nbsp;To Provision for Current Tax .............. Cr. ₹3,30,000</p>
              </div>
              <div>
                <p>Deferred Tax Asset ....................... Dr. ₹30,000</p>
                <p>&nbsp;&nbsp;To Profit &amp; Loss A/c ..................... Cr. ₹30,000</p>
                <p><i>(Being DTA recognized on provision timing difference)</i></p>
              </div>
            </div>
          </div>
        )
      }
    ],
    examFocus: 'Provisions disallowed under tax laws (such as provision for doubtful debts, bonus provisions, or gratuity provisions) create timing differences because the expense is recognized in accounting now, but allowed in tax later. This creates a Deferred Tax Asset (DTA) subject to the prudence concept.',
    examFocusType: 'trap'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-22-1',
    title: 'Business Case — Virtual Certainty & Unabsorbed Losses (Convincing Evidence Standard)',
    category: 'Business Application Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> RedLoss Textiles Ltd. has incurred heavy business losses over the past three years. At the year-end 31st March 20X2, it has:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Accumulated Tax Losses = <strong>₹50,00,000</strong>.</li>
              <li>Unabsorbed Depreciation = <strong>₹20,00,000</strong>.</li>
              <li>Potential DTA on these items at 30% = <strong>₹21,00,000</strong>.</li>
            </ul>
            <p className="mt-2"><strong>Business Condition:</strong> The company has recently signed a 5-year supply contract with a major retail chain starting from next year, which guarantees a minimum net profit of ₹25,00,000 per year.</p>
            <p className="mt-2"><strong>Issue:</strong> Can the company recognize the Deferred Tax Asset of ₹21,00,000 in its balance sheet?</p>
          </div>
        )
      },
      {
        title: 'AS 22 Analysis & Verdict',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Rule (Para 17-18):</strong> Where an enterprise has unabsorbed depreciation or carry forward of losses, deferred tax assets should be recognised only to the extent that there is **virtual certainty supported by convincing evidence** that sufficient future taxable income will be available against which such deferred tax assets can be realised. <PdfRefInline page={7} /></p>
            <p><strong>Analysis of Evidence:</strong> A legally binding, profitable supply contract represents "convincing evidence" of future taxable profits. It provides a realistic, objective basis for the virtual certainty of profit realization.</p>
            <p><strong>Verdict:</strong> RedLoss Textiles Ltd. can recognize the DTA in the balance sheet, but must disclose the details of the supply contract and the basis of virtual certainty in the notes to accounts.</p>
          </div>
        )
      }
    ],
    examFocus: 'Virtual certainty is a much higher threshold than "reasonable certainty". In exams, if a company has carry-forward tax losses, you must NOT recognize a Deferred Tax Asset unless the question explicitly mentions convincing evidence (like a signed contract or a confirmed backlog of orders). If no such evidence exists, DTA should be valued at nil.',
    examFocusType: 'concept'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-22-1',
    title: 'Audit Case — Offsetting Deferred Tax Assets and Liabilities (Same Tax Jurisdiction)',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> MultiState Retail Ltd. has two divisions:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
              <li>Division A (subject to normal corporate tax): Has a <strong>Deferred Tax Liability (DTL) of ₹5,00,000</strong>.</li>
              <li>Division B (operating in a Special Economic Zone - SEZ, tax-free): Has a <strong>Deferred Tax Asset (DTA) of ₹3,00,000</strong>.</li>
            </ul>
            <p className="mt-2"><strong>Management position:</strong> The company offsets the DTA and DTL and presents a net Deferred Tax Liability of ₹2,00,000 in the Balance Sheet.</p>
            <p className="mt-2"><strong>Auditor position:</strong> The statutory auditor objects, arguing that DTA and DTL cannot be offset since they relate to different tax treatments and divisions.</p>
          </div>
        )
      },
      {
        title: 'Audit Analysis & Verdict',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Rule (Para 29):</strong> An enterprise should offset DTA and DTL if and only if:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>The enterprise has a legally enforceable right to set off assets against liabilities representing current tax; AND</li>
              <li>The DTAs and DTLs relate to taxes on income levied by the **same governing tax laws** (e.g. Income Tax Act 1961). <PdfRefInline page={12} /></li>
            </ol>
            <p><strong>Verdict:</strong> The offset is permitted. Both divisions are part of the same legal entity and subject to tax under the same Income Tax Act 1961 (even if one has an SEZ exemption). The company has a legally enforceable right to set off current tax assets/liabilities. The net presentation is correct.</p>
          </div>
        )
      }
    ],
    examFocus: 'To offset DTA and DTL, they must relate to the same legal entity and the same tax jurisdiction. If they relate to different group companies in a consolidated balance sheet, they cannot be offset unless those companies have a legal right of set-off under tax law.',
    examFocusType: 'focus'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-22-1',
    title: 'Regulatory Observation — Non-Discounting of Deferred Taxes',
    category: 'Regulatory Observation',
    panels: [
      {
        title: 'Regulatory Rule',
        content: (
          <div>
            <p>Under AS 22, Deferred Tax Assets and Liabilities are **not discounted** to their present value. <PdfRefInline page={9} /></p>
            <p>They must be measured at the tax rates that have been enacted or substantively enacted by the balance sheet date. Even if a timing difference is expected to reverse 10 years later, it must be reported at its nominal value without any discounting.</p>
          </div>
        )
      },
      {
        title: 'Rationale',
        content: (
          <p className="text-xs">Discounting deferred taxes requires highly complex scheduling of the timing of the reversal of each individual timing difference, which is often subjective and unreliable. To maintain objectivity and simplicity, standard-setters under AS 22 completely prohibit the discounting of DTA and DTL.</p>
        )
      }
    ],
    examFocus: 'If a question provides discount factors or PV factors for deferred taxes, completely ignore them! DTA and DTL are always recognized at nominal enacted rates.',
    examFocusType: 'trap'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'court-22-1',
    title: 'Judicial Case — Enacted vs Substantively Enacted Tax Rates',
    category: 'Landmark Precedent',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Context:</strong> As of 31st March 20X2, the corporate tax rate was 30%. However, the Finance Bill proposed in the Parliament in February 20X2 proposed to reduce the corporate tax rate to 25% for the next year.</p>
            <p><strong>Corporate Action:</strong> Zenith Ltd. measured its deferred taxes as of 31st March 20X2 using the 25% rate, arguing that it is "substantively enacted" because the ruling party holds a majority and the bill is guaranteed to pass.</p>
          </div>
        )
      },
      {
        title: 'Legal Verdict',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Rule (Para 21):</strong> Deferred tax assets and liabilities should be measured using the tax rates and tax laws that have been enacted or substantively enacted by the balance sheet date. <PdfRefInline page={9} /></p>
            <p><strong>Verdict:</strong> In India, the Finance Bill becomes "substantively enacted" only when it is passed by both houses of Parliament and receives the assent of the President (which usually happens in May). Therefore, as of 31st March, the rate is NOT substantively enacted. The company was legally required to use the existing 30% rate.</p>
          </div>
        )
      }
    ],
    examFocus: 'In the Indian context, tax rates proposed in the Union Budget/Finance Bill are NOT substantively enacted as of 31st March. Always use the tax rate enacted for the current year unless the Finance Act has already received presidential assent before 31st March.',
    examFocusType: 'adjustment'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-22-1',
    title: 'Exam Corner — Step-by-Step Deferred Tax Asset / Liability Computation Matrix',
    category: 'Exam Corner',
    panels: [
      {
        title: 'Standard Tax Reconciliation Table',
        content: (
          <div className="overflow-x-auto text-xs font-mono">
            <table className="w-full border-collapse border border-slate-200 dark:border-slate-800">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  <th className="p-2 border border-slate-200 dark:border-slate-700">Item</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700">Accounting</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700">Tax Base</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700">Difference</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700">Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-slate-200">Machinery (Dep)</td>
                  <td className="p-2 border border-slate-200">₹8,00,000</td>
                  <td className="p-2 border border-slate-200">₹7,00,000</td>
                  <td className="p-2 border border-slate-200">₹1,00,000</td>
                  <td className="p-2 border border-slate-200 text-red-600">DTL (Taxable)</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200">Gratuity Provision</td>
                  <td className="p-2 border border-slate-200">₹1,50,000</td>
                  <td className="p-2 border border-slate-200">Nil (Disallowed)</td>
                  <td className="p-2 border border-slate-200">₹1,50,000</td>
                  <td className="p-2 border border-slate-200 text-green-600">DTA (Deductible)</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200">Fine (Disallowed)</td>
                  <td className="p-2 border border-slate-200">₹50,000</td>
                  <td className="p-2 border border-slate-200">Nil (Permanent)</td>
                  <td className="p-2 border border-slate-200">₹50,000</td>
                  <td className="p-2 border border-slate-200">No Deferred Tax</td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      }
    ],
    examFocus: 'Do not calculate deferred tax on permanent differences. Fines, corporate donations, and disallowed expenses under section 37 are permanent differences and have no impact on DTA/DTL.',
    examFocusType: 'adjustment'
  }
]
