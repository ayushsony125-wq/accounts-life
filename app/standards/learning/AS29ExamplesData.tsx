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
    title={`Open ICAI AS 29 PDF — Page ${page}`}
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
    id: 'illus-29-1',
    title: 'ICAI Illustration 1 — Provision vs Contingent Liability: The Three-Condition Test',
    category: 'Official ICAI Illustration',
    pdfPage: 10,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Pharma Ltd. (FY 2023-24). Identify whether the following require a Provision, Contingent Liability, or No Disclosure:</p>
            <ol className="list-decimal pl-5 mt-2 space-y-1">
              <li>A customer filed a court case for defective product. Legal counsel says probability of loss = 75%. Estimated amount = ₹2,50,00,000.</li>
              <li>A tax demand of ₹80,00,000 received. Company believes it has strong legal arguments. Probability of loss = 15%.</li>
              <li>Government may introduce a new regulation in the future that could increase costs — not certain if or when.</li>
            </ol>
          </div>
        )
      },
      {
        title: 'The Three-Condition Test for Provision (Para 14)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Provision = Liability of uncertain timing or amount. Recognize ONLY when ALL THREE conditions are met:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Present obligation (legal or constructive) as a result of a past event</li>
              <li>It is probable that an outflow of resources will be required to settle the obligation</li>
              <li>A reliable estimate of the amount can be made</li>
            </ol>
            <p className="mt-2">"Probable" means <strong>more likely than not to occur</strong> (generally &gt;50% probability).</p>
          </div>
        )
      },
      {
        title: 'Classification of Three Scenarios',
        content: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-200 dark:border-slate-800">
              <thead><tr className="bg-slate-100 dark:bg-slate-900"><th className="border p-2">Case</th><th className="border p-2">Analysis</th><th className="border p-2">Treatment</th></tr></thead>
              <tbody>
                <tr><td className="border p-2">1. Court case (75%)</td><td className="border p-2">Past event ✓, Probable (75%) ✓, Reliable estimate ✓</td><td className="border p-2 font-bold text-emerald-700 dark:text-emerald-400">PROVISION ₹2.5Cr</td></tr>
                <tr className="bg-blue-50/10"><td className="border p-2">2. Tax demand (15%)</td><td className="border p-2">Past event ✓, NOT probable (15%) ✗, Reliable est. ✓</td><td className="border p-2 font-bold text-amber-700 dark:text-amber-400">CONTINGENT LIABILITY (disclose in notes)</td></tr>
                <tr><td className="border p-2">3. Future regulation</td><td className="border p-2">No past event yet (regulation not enacted) ✗</td><td className="border p-2 font-bold text-slate-500">NO DISCLOSURE</td></tr>
              </tbody>
            </table>
          </div>
        )
      },
      {
        title: 'Journal Entry for Provision',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p className="font-sans font-bold">Case 1 — Provision for Litigation:</p>
            <p>Dr. Litigation Expense / Loss (P&amp;L)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹2,50,00,000</p>
            <p>&nbsp;&nbsp;Cr. Provision for Litigation (B/S)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹2,50,00,000</p>
            <p className="font-sans mt-2">Best estimate = most likely outcome when there is a range. If range is equally probable, use the mid-point.</p>
          </div>
        )
      }
    ],
    examFocus: 'Provision = Present + Probable + Reliable estimate — ALL THREE must be met. 50%+ probability → provision. Below 50% but not remote → contingent liability (disclose only). Remote → ignore.',
    examFocusType: 'trap'
  },
  {
    id: 'illus-29-2',
    title: 'ICAI Illustration 2 — Warranty Provision: Best Estimate Using Expected Value Method',
    category: 'Official ICAI Illustration',
    pdfPage: 16,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Electronics Ltd. sells 10,000 units in FY 2023-24 at ₹5,000 each. All products carry a 2-year warranty. Based on historical data:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>80% of products — no warranty claim</li>
              <li>15% of products — minor repair: avg. cost ₹500/unit</li>
              <li>5% of products — major repair: avg. cost ₹2,000/unit</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Expected Value Computation (Para 36)',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p className="font-sans font-bold">Expected Warranty Cost per unit:</p>
            <p>No repair:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;80% × ₹0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=&nbsp;&nbsp;&nbsp;&nbsp;₹0</p>
            <p>Minor repair:&nbsp;15% × ₹500&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=&nbsp;&nbsp;₹75</p>
            <p>Major repair:&nbsp;&nbsp;5% × ₹2,000&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=&nbsp;₹100</p>
            <p className="font-bold">Expected cost/unit:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= ₹175</p>
            <hr className="my-1 border-slate-300 dark:border-slate-700" />
            <p><strong>Total Warranty Provision:</strong></p>
            <p>10,000 units × ₹175 =&nbsp;<strong>₹17,50,000</strong></p>
          </div>
        )
      },
      {
        title: 'Journal Entry and Unwinding',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p className="font-sans font-bold">Year 1 — Creating Provision:</p>
            <p>Dr. Warranty Expense (P&amp;L)&nbsp;&nbsp;&nbsp;₹17,50,000</p>
            <p>&nbsp;&nbsp;Cr. Provision for Warranty (B/S)&nbsp;₹17,50,000</p>
            <p className="font-sans font-bold mt-2">When Claims are Settled:</p>
            <p>Dr. Provision for Warranty&nbsp;&nbsp;&nbsp;&nbsp;₹X</p>
            <p>&nbsp;&nbsp;Cr. Cash/Inventory&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹X</p>
            <p className="font-sans mt-2">If actual claims &gt; provision → Additional expense recognized. If less → Reverse unused provision.</p>
          </div>
        )
      }
    ],
    examFocus: 'Warranty provision uses expected value (probability-weighted average) across all possible outcomes. NOT the worst-case scenario. NOT zero just because no specific unit has claimed.',
    examFocusType: 'focus'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-29-1',
    title: 'Business Case — Onerous Contract Provision (When a Contract Becomes Loss-Making)',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Steel Ltd. entered into a fixed-price contract to supply 1,00,000 tonnes of steel at ₹40,000/tonne (₹400 crores). Due to sharp increase in raw material costs, the estimated cost to fulfil is now ₹460 crores.</p>
            <p className="mt-2">The penalty for cancellation of the contract = ₹20 crores.</p>
          </div>
        )
      },
      {
        title: 'Onerous Contract Definition and Provision (Para 63)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 63: An <strong>onerous contract</strong> is one in which the unavoidable costs of meeting the obligations under the contract exceed the economic benefits expected to be received under it.</p>
            <p><strong>Test:</strong> The present obligation under the contract = the LOWER of:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cost to fulfil: ₹460Cr − ₹400Cr revenue = <strong>₹60Cr net loss</strong></li>
              <li>Cost to exit (penalty): <strong>₹20Cr</strong></li>
            </ul>
            <p className="mt-2"><strong>Provision = MIN(₹60Cr, ₹20Cr) = ₹20 crores</strong></p>
            <p>The company should recognize a provision of ₹20 crores for the onerous contract since exiting (penalty) is cheaper than fulfilling.</p>
          </div>
        )
      },
      {
        title: 'Journal Entry',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p className="font-sans font-bold">Onerous Contract Provision:</p>
            <p>Dr. Loss on Onerous Contract (P&amp;L)&nbsp;&nbsp;₹20,00,00,000</p>
            <p>&nbsp;&nbsp;Cr. Provision for Onerous Contract&nbsp;&nbsp;&nbsp;&nbsp;₹20,00,00,000</p>
            <p className="font-sans mt-2">(Before recognizing any loss on assets dedicated to the contract, recognize the onerous contract provision first)</p>
          </div>
        )
      }
    ],
    examFocus: 'Onerous contract provision = LOWER of (cost to fulfil − economic benefit) and (cost to exit/penalty). Always choose the lesser obligation.',
    examFocusType: 'trick'
  },
  {
    id: 'case-29-2',
    title: 'Business Case — Constructive Obligation: Refund Policy and Informal Practices',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> Zenith Retail Ltd. does not have a formal written refund policy, but for the past 5 years, it has always accepted product returns within 30 days without question. Customers universally know this practice. Expected refund claims for FY 2023-24: ₹1,50,00,000.</p>
            <p className="mt-2">Management argues: "No legal refund obligation exists, so no provision needed."</p>
          </div>
        )
      },
      {
        title: 'Constructive Obligation (Para 15)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>A <strong>constructive obligation</strong> arises from an enterprise's actions where:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>By an established pattern of past practice, published policies, or a sufficiently specific current statement, the enterprise has indicated to other parties that it will accept certain responsibilities; AND</li>
              <li>As a result, the enterprise has created a valid expectation on the part of those other parties that it will discharge those responsibilities</li>
            </ul>
            <p className="mt-2"><strong>Conclusion:</strong> Zenith Retail's 5-year consistent practice creates a constructive obligation. Customers have a valid expectation of refunds. A provision of ₹1,50,00,000 must be recognized even without a formal legal obligation.</p>
          </div>
        )
      }
    ],
    examFocus: 'Constructive obligations from past practices are JUST AS ENFORCEABLE as legal obligations under AS 29. Consistent informal practices create provisions.',
    examFocusType: 'concept'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-29-1',
    title: 'Audit Case Study — Restructuring Provision: Premature vs Valid Recognition',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> The CFO of Zenith Manufacturing Ltd. mentions in November 2023 (Q3) that the Board is "considering" closing a factory but hasn't made a final decision. The accountant has already raised a restructuring provision of ₹5 crores in the Q3 books.</p>
          </div>
        )
      },
      {
        title: 'AS 29 Restructuring Provision Requirements (Para 72–83)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 72 defines <strong>restructuring</strong>. Para 78 states: A constructive obligation to restructure arises only when:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>The enterprise has a detailed FORMAL PLAN for the restructuring identifying at least: the business or part of a business concerned, principal locations affected, the approximate number of employees, and the expenditures that will be undertaken; AND</li>
              <li>The enterprise has raised a valid expectation in those affected — e.g., by starting to implement the plan or by announcing its main features to those affected by it.</li>
            </ol>
            <p className="mt-2"><strong>Conclusion:</strong> The CFO's vague comment about "considering" closure does NOT meet the threshold. No formal plan exists; no announcement to employees. The ₹5Cr provision is PREMATURE and must be reversed.</p>
          </div>
        )
      },
      {
        title: 'What Would Be Included in a Valid Restructuring Provision',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 80: A restructuring provision includes ONLY direct expenditures arising from restructuring — not costs associated with ongoing activities:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Redundancy/retrenchment costs ✓</li>
              <li>Costs of terminating lease agreements ✓</li>
              <li>Future operating losses up to the restructuring date: <strong>NOT included (Para 83)</strong></li>
              <li>Retraining/redeployment costs of retained employees: <strong>NOT included</strong></li>
              <li>Marketing costs for restructured product lines: <strong>NOT included</strong></li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Restructuring provision requires a DETAILED FORMAL PLAN + announcement/implementation. Future operating losses are NEVER part of restructuring provisions.',
    examFocusType: 'trap'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-29-1',
    title: 'NFRA Observation — Environmental Liability Provisions and Discount Rate Application',
    category: 'Regulatory Observations',
    panels: [
      {
        title: 'NFRA Finding',
        content: (
          <div>
            <p><strong>NFRA Observation:</strong> Mining companies with long-term environmental restoration obligations were not discounting their provision balances to present value, overstating or understating the provision depending on inflation assumptions and discount rates.</p>
          </div>
        )
      },
      {
        title: 'AS 29 Discounting of Provisions (Para 44–46)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 44: Where the effect of time value of money is material, the amount of provision should be the present value of the expenditures expected to be required to settle the obligation.</p>
            <p>Para 45: The discount rate should be a pre-tax rate that reflects current market assessments of the time value of money and the risks specific to the liability.</p>
            <p className="mt-2"><strong>Unwinding of Discount:</strong> As time passes, the increase in the provision due to passage of time (unwinding of discount) is recognized as a borrowing cost.</p>
            <p>Example: PV of ₹100Cr environmental cost in 20 years @ 8% = ~₹21.5Cr. This unwinding (₹1.72Cr in Year 1) is recognized as finance cost, not additional provision expense.</p>
          </div>
        )
      }
    ],
    examFocus: 'Long-term provisions must be discounted to present value. The unwinding of discount each year is recognized as finance/borrowing cost — NOT as additional expense or new provision.',
    examFocusType: 'adjustment'
  },
  {
    id: 'reg-29-2',
    title: 'Regulatory Observation 2 — SEBI Disclosure Enforcement: Pending Regulatory Show-Cause Notices',
    category: 'Regulatory Observations',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>The Issue:</strong> Listed companies frequently receive show-cause notices (SCNs) from SEBI, MCA, or tax authorities demanding explanation on alleged violations, with prospective fines of crores of rupees.</p>
            <p className="mt-2">Many companies withheld disclosure of these notices from their financial statements, claiming that no formal order or demand had been passed yet, making the liability "too speculative."</p>
          </div>
        )
      },
      {
        title: 'SEBI Directive & AS 29 Application',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>1. **Contingent Liability Definition:** Under AS 29, a contingent liability includes a *possible obligation* that arises from past events and whose existence will be confirmed only by the occurrence or non-occurrence of one or more uncertain future events not wholly within the control of the enterprise.</p>
            <p>2. **Disclosure Mandate:** SEBI clarified that receipt of a formal show-cause notice with quantified financial implications is a **material past event**. Unless legal advisors confirm that the probability of fine imposition is **remote** (typically &lt;10%), the company must disclose the SCN and the estimated penalty range as a Contingent Liability in its notes to accounts.</p>
          </div>
        )
      }
    ],
    examFocus: 'Show-cause notices from regulators are material past events. They cannot be omitted from disclosures unless the chance of loss is remote.',
    examFocusType: 'trap'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'judicial-29-1',
    title: 'Judicial Case — Contingent Asset Recognition: When to Disclose (Para 31)',
    category: 'Landmark Judicial Cases',
    panels: [
      {
        title: 'Facts & Principle',
        content: (
          <div>
            <p><strong>Scenario:</strong> Zenith Ltd. filed a lawsuit against a supplier for breach of contract, claiming ₹15 crores in damages. The company's legal counsel states the probability of winning = 85%. The case is pending at year-end.</p>
          </div>
        )
      },
      {
        title: 'AS 29 Contingent Asset Treatment (Para 31)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 31: A contingent asset shall not be recognized in the financial statements (prudence — don't recognize income before it is virtually certain). However:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>If inflow is <strong>virtually certain</strong> → It's no longer contingent → Recognize as an ASSET</li>
              <li>If inflow is <strong>probable</strong> (likely, but not virtually certain) → Disclose as contingent asset in notes</li>
              <li>If inflow is NOT probable → No disclosure</li>
            </ul>
            <p className="mt-2"><strong>Conclusion:</strong> 85% probability is "probable" but not "virtually certain." Zenith must DISCLOSE the ₹15Cr contingent asset in the notes — NOT recognize it as income or receivable.</p>
          </div>
        )
      },
      {
        title: 'Contrast with Contingent Liability',
        content: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-200 dark:border-slate-800">
              <thead><tr className="bg-slate-100 dark:bg-slate-900"><th className="border p-2">Probability</th><th className="border p-2">Contingent Liability</th><th className="border p-2">Contingent Asset</th></tr></thead>
              <tbody>
                <tr><td className="border p-2">Virtually certain</td><td className="border p-2">PROVISION</td><td className="border p-2">RECOGNIZE AS ASSET</td></tr>
                <tr className="bg-blue-50/10"><td className="border p-2">Probable (&gt;50%)</td><td className="border p-2">PROVISION</td><td className="border p-2">DISCLOSE IN NOTES</td></tr>
                <tr><td className="border p-2">Possible (not probable)</td><td className="border p-2">DISCLOSE</td><td className="border p-2">NO DISCLOSURE</td></tr>
                <tr className="bg-blue-50/10"><td className="border p-2">Remote</td><td className="border p-2">NO DISCLOSURE</td><td className="border p-2">NO DISCLOSURE</td></tr>
              </tbody>
            </table>
          </div>
        )
      }
    ],
    examFocus: 'Contingent ASSETS require "virtually certain" for recognition (much higher threshold than provisions which need only "probable"). This asymmetry reflects prudence.',
    examFocusType: 'trick'
  },
  {
    id: 'judicial-29-2',
    title: 'Landmark Judicial Case 2 — Metal Box Company of India vs. Their Workmen (Actuarial Provisions vs Contingent Liabilities)',
    category: 'Landmark Judicial Cases',
    panels: [
      {
        title: 'Legal Dispute',
        content: (
          <div>
            <p><strong>The Issue:</strong> Whether a provision made for future liability of gratuity and retirement benefits of employees (which depends on employees remaining in service for a minimum period of 5 years) is a contingent liability or a deductible business expense.</p>
            <p className="mt-2">The tax authorities argued that since the liability is contingent upon employees completing 5 years of service, it cannot be recognized as a provision or expensed.</p>
          </div>
        )
      },
      {
        title: 'Supreme Court Ruling',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The Supreme Court ruled that an obligation that is **certain to arise** in the future, even if its exact timing or individual payouts are contingent, can be recognized as a **provision** if it can be estimated with reasonable accuracy on a scientific, **actuarial basis**.</p>
            <p className="mt-2">This judgment forms the bedrock of AS 15 (Employee Benefits) and AS 29. It establishes that actuarial valuations of future retirement liabilities are **reliable estimates of present obligations**, not mere contingent liabilities, and must be recognized in the accounts.</p>
          </div>
        )
      }
    ],
    examFocus: 'Retirement obligations estimated on scientific actuarial principles must be recognized as provisions, even if individual payouts depend on future events.',
    examFocusType: 'concept'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-29-1',
    title: 'Exam Corner — AS 29 Complete Framework: Provision, Contingent Liability, and Contingent Asset',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'Decision Tree for Every Obligation',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p className="font-sans font-bold">For a potential liability/obligation:</p>
            <p>1. Present obligation from past event?</p>
            <p>&nbsp;&nbsp;&nbsp;NO → Possible obligation → Is outflow probable?</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YES → Contingent liability (disclose)</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NO → Remote → No disclosure</p>
            <p>&nbsp;&nbsp;&nbsp;YES → Is outflow probable?</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YES → Reliable estimate?</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YES → RECOGNIZE PROVISION</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NO → Disclose (cannot estimate)</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NO → Contingent liability (disclose)</p>
          </div>
        )
      },
      {
        title: 'Critical Exam Points',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <ul className="list-disc pl-5 space-y-1">
              <li>Provision = uncertain timing OR amount; NOT both. If timing AND amount certain → trade payable, not provision.</li>
              <li>Best estimate = single most likely outcome (for single item) OR expected value (for large population).</li>
              <li>Provisions can only be used for the purpose for which they were originally created.</li>
              <li>Restructuring costs: NO future operating losses, NO marketing costs, NO training costs of remaining staff.</li>
              <li>Environmental provisions: Discount to PV. Unwinding = finance cost.</li>
              <li>Onerous contracts: Provision = LOWER of (cost to fulfil) and (cost to exit).</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Best estimate for provisions: For a SINGLE outcome → most likely amount. For a LARGE POPULATION → expected value (weighted average). This distinction is heavily tested.',
    examFocusType: 'trick'
  },
  {
    id: 'exam-29-2',
    title: 'Exam Corner 2 — Decommissioning Obligation: Capitalization under AS 10 & Discount Unwinding under AS 29',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'The Integrated Accounting Concept',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Under **AS 10**, the cost of property, plant, and equipment (PPE) includes the initial estimate of costs of dismantling, removing, and restoring the site.</p>
            <p>Under **AS 29**, the obligation to restore the site is recognized as a **provision** at its present value (discounted using a pre-tax rate).</p>
            <p className="mt-2"><strong>Dual Accounting Effect:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Asset is depreciated under AS 10 over its useful life.</li>
              <li>Provision liability is increased (unwound) every year under AS 29 using the discount rate, with the increase charged as finance cost.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Step-by-Step Calculation Example',
        content: (
          <div className="space-y-2 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>Facts:</strong> Machine cost = ₹10,00,000. Useful life = 10 years. Estimated restoration cost in Year 10 = ₹5,00,000. Pre-tax discount rate = 10%. (PV factor at 10% for Year 10 = 0.3855)</p>
            <p><strong>1. Initial Capitalization (Year 1):</strong></p>
            <p>&nbsp;&nbsp;PV of Provision = ₹5,00,000 × 0.3855 = ₹1,92,750</p>
            <p>&nbsp;&nbsp;Total capitalized asset cost = ₹10,00,000 + ₹1,92,750 = <strong>₹11,92,750</strong></p>
            <p>&nbsp;&nbsp;Journal: Dr. Machine A/c ₹11,92,750 | Cr. Bank ₹10,00,000, Cr. Provision for Restoration ₹1,92,750</p>
            <p><strong>2. Year 1 Year-end Adjustments:</strong></p>
            <p>&nbsp;&nbsp;Depreciation = ₹11,92,750 / 10 = <strong>₹1,19,275</strong> (charged to P&amp;L)</p>
            <p>&nbsp;&nbsp;Interest (Unwinding) = 10% × ₹1,92,750 = <strong>₹19,275</strong> (charged to P&amp;L Finance Cost)</p>
            <p>&nbsp;&nbsp;Closing Provision Balance = ₹1,92,750 + ₹19,275 = <strong>₹2,12,025</strong></p>
          </div>
        )
      }
    ],
    examFocus: 'Do not charge the discount unwinding (interest) to depreciation. It must be presented separately as Finance Cost in the P&L.',
    examFocusType: 'adjustment'
  }
]
