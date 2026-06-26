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

// Inline PDF Ref button helper that interfaces with click delegation on root
export const PdfRefInline = ({ page }: { page: number }) => (
  <button
    data-pdf-page={page}
    className="inline-flex items-center justify-center w-4 h-4 mx-1 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-650 dark:text-red-400 rounded transition-all cursor-pointer select-none align-middle"
    title={`Open ICAI AS 1 PDF — Page ${page}`}
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
    id: "icai-1",
    title: "ICAI Illustration 1 — Prashant Ltd.: Change in Inventory Valuation Method (FIFO to Weighted Average)",
    category: "Official ICAI Illustration",
    pdfPage: 9,
    panels: [
      {
        title: "Background & Facts",
        content: (
          <div>
            <p><strong>Entity:</strong> M/s Prashant Ltd.</p>
            <p><strong>Context:</strong> In the books of M/s Prashant Ltd., the closing inventory as at 31.03.20X2 amounts to ₹1,63,000 on the basis of the FIFO method.</p>
            <p><strong>The Change:</strong> The company decides to change from the FIFO method to the Weighted Average method for ascertaining the cost of inventory from the year 20X1-X2.</p>
            <p><strong>New Valuation:</strong> On the basis of Weighted Average method, closing inventory as on 31.03.20X2 amounts to ₹1,47,000.</p>
            <p><strong>Net Realisable Value:</strong> The realisable value of the inventory as on 31.03.20X2 amounts to ₹1,95,000.</p>
            <p><strong>Issue (ICAI Question):</strong> Discuss the disclosure requirement of change in accounting policy as per AS-1.</p>
          </div>
        )
      },
      {
        title: "Standard Guidance & Calculation of Impact",
        content: (
          <div>
            <p><strong>Standard Guidance:</strong> As per AS 1 "Disclosure of Accounting Policies", any change in an accounting policy which has a material effect should be disclosed in the financial statements. The amount by which any item in the financial statements is affected by such change should also be disclosed to the extent ascertainable. Where such amount is not ascertainable, wholly or in part, the fact should be indicated.</p>
            <p><strong>Calculation of Impact:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Closing inventory under FIFO: ₹1,63,000</li>
              <li>Closing inventory under Weighted Average: ₹1,47,000</li>
              <li>Reduction in inventory and profit: ₹16,000</li>
              <li>Since NRV (₹1,95,000) exceeds both, inventory is valued at cost under both methods.</li>
            </ul>
            <p><strong>Conclusion:</strong> The change in method from FIFO to Weighted Average must be disclosed along with the ₹16,000 impact. Prashant Ltd. should disclose the change and its quantified effect.</p>
          </div>
        )
      },
      {
        title: "Official ICAI Notes on Accounts Disclosure",
        content: (
          <div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl font-mono text-xs leading-relaxed my-2 whitespace-pre-line text-slate-800 dark:text-slate-200">
              <strong>Official ICAI Note on Accounts Disclosure (Prashant Ltd.):</strong>{"\n\n"}
              "The company values its inventory at lower of cost and net realizable value. Since net realizable value of all items of inventory in the current year was greater than respective costs, the company valued its inventory at cost. In the present year i.e. 20X1-X2, the company has changed to weighted average method, which better reflects the consumption pattern of inventory, for ascertaining inventory costs from the earlier practice of using FIFO for the purpose. The change in policy has reduced current profit and value of inventory by ₹16,000."
            </div>
          </div>
        )
      }
    ],
    examFocus: "This is a direct Official ICAI Illustration. Key exam point: When FIFO is changed to Weighted Average, it is a change in accounting POLICY (not estimate). The financial impact must always be quantified. Here, NRV > Cost under both methods, so valuation is at cost. The only impact is the ₹16,000 difference between the two methods.",
    examFocusType: "concept"
  },
  {
    id: "icai-2",
    title: "ICAI Illustration 2 — Jagannath Ltd.: Inventory Revaluation at Works Cost to Inflate Projected Surplus",
    category: "Official ICAI Illustration",
    pdfPage: 9,
    panels: [
      {
        title: "Background & Board Decision",
        content: (
          <div>
            <p><strong>Entity:</strong> Jagannath Ltd.</p>
            <p><strong>Background:</strong> Jagannath Ltd. made a rights issue of shares in 20X2. In the offer document to its members, it had projected a surplus of ₹40 crores during the accounting year ending 31st March, 20X2.</p>
            <p><strong>Actual Results:</strong> The draft results for the year, prepared on hitherto followed accounting policies, showed a deficit of ₹10 crores.</p>
            <p><strong>Board Decision:</strong> The board, in consultation with the managing director, decided to change two accounting treatments:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Change (i): Value year-end inventory at works cost (₹50 crores) instead of the hitherto method of valuation at prime cost (₹30 crores).</li>
              <li>Change (ii): Provide for permanent diminution in the value of investments, which had taken place over the past five years — amount: ₹10 crores.</li>
            </ul>
            <p><strong>Issue (ICAI Question):</strong> As Chief Accountant, draft the notes on accounts for inclusion in the annual report for 20X1-20X2.</p>
          </div>
        )
      },
      {
        title: "Net Effect of Changes & AS 1 Requirement",
        content: (
          <div>
            <p><strong>Net Effect of Changes:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Change (i): Inventory valued at ₹50 crores instead of ₹30 crores → Profit increases by ₹20 crores.</li>
              <li>Change (ii): Provision for diminution in investments of ₹10 crores → Profit decreases by ₹10 crores.</li>
              <li>Net Impact: Deficit of ₹10 crores → Net surplus of ₹0 crores (still short of projected ₹40 crores).</li>
            </ul>
            <p><strong>AS 1 Requirement:</strong> As per AS 1, any change in accounting policies which has a material effect in the current period must be disclosed. The amount by which any item is affected must be stated to the extent ascertainable. Both changes are material and must be separately disclosed with their financial impacts.</p>
          </div>
        )
      },
      {
        title: "Official ICAI Notes on Accounts Disclosure",
        content: (
          <div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl font-mono text-xs leading-relaxed my-2 whitespace-pre-line text-slate-800 dark:text-slate-200">
              <strong>Official ICAI Notes on Accounts Disclosure:</strong>{"\n\n"}
              "(i) During the year inventory has been valued at factory cost, against the practice of valuing it at prime cost as was the practice till last year. This has been done to take cognizance of the more capital intensive method of production on account of heavy capital expenditure during the year. As a result of this change, the year-end inventory has been valued at ₹50 crores and the profit for the year has increased by ₹20 crores.\n\n(ii) The company has decided to provide ₹10 crores for the permanent diminution in the value of investments which has taken place over the period of past five years. The provision so made has reduced the profit disclosed in the accounts by ₹10 crores."
            </div>
          </div>
        )
      }
    ],
    examFocus: "Classic ICAI Exam Case: This illustration shows how management may attempt to change accounting policies to manage reported profits (earnings management). AS 1 requires full disclosure of both changes AND their quantified financial impacts. Notice: Change (i) is a policy change (works cost vs. prime cost — both methods of applying cost principles); Change (ii) is not a policy change — it is a delayed recognition of a loss (which should have been done earlier — raises a prudence violation).",
    examFocusType: "concept"
  },
  {
    id: "icai-3",
    title: "ICAI Illustration 3 — XYZ Company: Non-Provision of Overdue ICD Interest (Accrual & Prudence Violation)",
    category: "Official ICAI Illustration",
    pdfPage: 10,
    panels: [
      {
        title: "Background & Company Treatment",
        content: (
          <div>
            <p><strong>Entity:</strong> XYZ Company</p>
            <p><strong>Business:</strong> XYZ Company is engaged in the business of financial services and is undergoing a tight liquidity position, since most of the assets of the company are blocked in various claims/petitions in a Special Court.</p>
            <p><strong>The Transaction:</strong> XYZ has accepted Inter-Corporate Deposits (ICDs). It is making its best efforts to settle the dues. There were claims at varied rates of interest from lenders, from the due date of ICDs to the date of repayment.</p>
            <p><strong>Company's Treatment:</strong> The company has provided interest as per the terms of the contract till the due date. For the period from due date to date of repayment, it has NOT provided interest, on the basis that:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Uncertainties exist regarding determination of the amount.</li>
              <li>No specific legal obligation exists at present as per the terms of contracts.</li>
              <li>The company considers these claims as \"claims against the company not acknowledged as debt\" and has disclosed them by way of a note only.</li>
            </ul>
            <p><strong>Issue (ICAI Question):</strong> State whether the treatment done by the Company is correct or not.</p>
          </div>
        )
      },
      {
        title: "Standard Guidance & Accrual/Prudence Analysis",
        content: (
          <div>
            <p><strong>Standard Guidance:</strong> AS 1 recognises Prudence as one of the major considerations governing the selection and application of accounting policies. In view of the uncertainty attached to future events, profits are not anticipated but recognised only when realised, though not necessarily in cash. Provision is made for all known liabilities and losses even though the amount cannot be determined with certainty.</p>
            <p><strong>Accrual Requirement:</strong> As per AS 1, Accrual is one of the fundamental accounting assumptions. Irrespective of the terms of the contract, so long as the principal amount of a loan is not repaid, the lender cannot be placed in a disadvantageous position for non-payment of interest in respect of overdue amounts.</p>
            <p><strong>Conclusion:</strong> From the aforesaid, it is apparent that the company has an obligation on account of the overdue interest. The company should provide for the liability (since it is not waived by the lenders) at an estimated amount or on a reasonable basis based on facts and circumstances of each case. In respect of overdue interest amounts which are settled, the liability should be accrued to the extent of amounts settled.</p>
          </div>
        )
      },
      {
        title: "Official ICAI Conclusion",
        content: (
          <div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl font-mono text-xs leading-relaxed my-2 whitespace-pre-line text-slate-800 dark:text-slate-200">
              <strong>ICAI Official Conclusion:</strong>{"\n\n"}
              \"Non-provision of the overdue interest liability amounts to violation of accrual basis of accounting. Therefore, the treatment, done by the company, of not providing the interest amount from due date to the date of repayment is NOT correct.\"\n\n<strong>Correct Treatment:</strong> The company should provide for overdue interest as a liability (provision), estimated on a reasonable basis. The fact that the exact amount cannot be determined with certainty is not a valid reason for non-provision, as AS 1 permits making provisions based on best estimates.
            </div>
          </div>
        )
      }
    ],
    examFocus: "Official ICAI Exam Question: Key Takeaway — The argument that 'legal obligation does not yet exist' does NOT override the accrual principle under AS 1. Once an obligation arises economically (even if legally uncertain), it must be accrued. Non-provision of interest on overdue ICDs violates BOTH prudence AND accrual assumptions. Disclosing it as a contingent liability does NOT substitute for proper provisioning.",
    examFocusType: "concept"
  },
  {
    id: "icai-4",
    title: "ICAI Q8 — ABC Ltd.: Non-Moving Inventory Provision — Change in Estimate vs. Policy Change",
    category: "Official ICAI Illustration",
    pdfPage: 14,
    panels: [
      {
        title: "Background & Proposed Change",
        content: (
          <div>
            <p><strong>Entity:</strong> ABC Ltd.</p>
            <p><strong>Context:</strong> ABC Ltd. was making provision for non-moving inventories based on issues for the last 12 months up to 31.3.20X1.</p>
            <p><strong>Proposed Change:</strong> The company wants to provide during the year ending 31.3.20X2 based on technical evaluation instead of the 12-month issue pattern.</p>
            <p><strong>Data:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Total value of Inventory: ₹100 lakhs</li>
              <li>Provision required based on 12-months issue method: ₹3.5 lakhs</li>
              <li>Provision required based on technical evaluation: ₹2.5 lakhs</li>
            </ul>
            <p><strong>Issue (ICAI Question):</strong> (a) Does this amount to a change in Accounting Policy? (b) Can the company change the method of provision?</p>
          </div>
        )
      },
      {
        title: "ICAI Answer & Policy vs. Estimate Analysis",
        content: (
          <div>
            <p><strong>Official ICAI Answer:</strong></p>
            <p>The accounting policy of a company may require that provision for non-moving inventories should be made. The method of estimating the amount of provision may be changed in case a more prudent estimate can be made.</p>
            <p><strong>(a) Is it a policy change?</strong> The decision of making provision for non-moving inventories on the basis of technical evaluation does NOT amount to a change in accounting policy. The policy is to make provision for non-moving inventory — that policy is unchanged. Only the method of estimation (the mechanism for arriving at the estimate) has changed. This is a change in accounting estimate, not a policy change.</p>
            <p><strong>(b) Materiality test:</strong> Considering the total value of inventory (₹100 lakhs), the change in the amount of required provision from ₹3.5 lakhs to ₹2.5 lakhs (a reduction of ₹1 lakh) is also not material (1% of inventory value).</p>
          </div>
        )
      },
      {
        title: "Official ICAI Disclosure Note",
        content: (
          <div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl font-mono text-xs leading-relaxed my-2 whitespace-pre-line text-slate-800 dark:text-slate-200">
              <strong>ICAI Official Disclosure (Notes to Accounts, ABC Ltd., Year 20X1-X2):</strong>{"\n\n"}
              "The company has provided for non-moving inventories on the basis of technical evaluation unlike preceding years. Had the same method been followed as in the previous year, the profit for the year and the corresponding effect on the year-end net assets would have been lower by ₹1 lakh."
            </div>
          </div>
        )
      }
    ],
    examFocus: "Most Critical Distinction in AS 1 Exams: A change in the basis of computing a provision (e.g., from 12-month issue pattern to technical evaluation) is a change in ESTIMATE, NOT a policy change. The POLICY (to provide for non-moving inventory) remains unchanged. The company can change the estimation method if it gives a more prudent estimate. Even though the revised provision is LOWER, it is still valid as it is based on a more accurate technical evaluation.",
    examFocusType: "concept"
  },
  {
    id: "1-1",
    title: "Illustration 3.1: Accounting Policies vs. Estimates (WIP Overheads vs. Warranty Provision)",
    category: "ICAI Study Material",
    pdfPage: 4,
    panels: [
      {
        title: "Background & Commercial Reality",
        content: (
          <div>
            <p><strong>Entity & Scale:</strong> RealChem India Ltd operates a automated specialty chemical factory with annual revenues of ₹180 Crores and Profit Before Tax (PBT) of ₹12 Crores. Automation has recently reduced direct labor to just 6% of conversion costs, while factory machinery accounts for 85% of total overheads.</p>
            <p><strong>The Transaction:</strong> Previously, RealChem allocated fixed overheads to Work-in-Progress (WIP) inventory using a direct-labor absorption rate (25% of wages), and provisioned warranties at a flat rate of 1.5% of annual sales. During the current financial year, automation caused heavy WIP cost distortions. Simultaneously, warranty claims spiked due to automated line failures, costing ₹15 Lakhs.</p>
          </div>
        )
      },
      {
        title: "Core Accounting Controversy",
        content: (
          <div>
            <p><strong>The Issue:</strong> Management wants to change both treatments and classify them as accounting policy adjustments under Note 1. This would allow them to perform a retrospective restatement of opening reserves, thereby bypassing a current-year P&L charge of ₹15 Lakhs for the warranty provision.</p>
            <p><strong>Standard Guidance:</strong> Under <span className="font-semibold text-slate-900 dark:text-white">AS 1</span>, accounting policies are specific principles and methods of applying them <PdfRefInline page={4} />. Revising a warranty rate based on claim failure logs is a change in accounting estimate under <span className="font-semibold text-slate-900 dark:text-white">AS 5</span>, not a policy. Conversely, changing the overhead absorption method to reflect automation is a change in accounting policy under <span className="font-semibold text-slate-900 dark:text-white">AS 2</span>.</p>
          </div>
        )
      },
      {
        title: "AS 1 Analysis & Technical Evaluation",
        content: (
          <div>
            <p>Applying the principle of <strong>Prudence</strong>, liabilities must not be understated <PdfRefInline page={5} />. Deferring the warranty charge to reserves overstates current year profit by ₹15 Lakhs (1.25% of PBT). Classification must follow the true economic substance of the transactions:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Overhead Allocation Method:</strong> Restructuring overhead allocation based on machine-hours rather than labor-hours is a change in the application of principles (Policy Change).</li>
              <li><strong>Warranty Provision:</strong> Adjusting the provision rate based on engineering logs is a refinement of estimation parameters (Estimate Change).</li>
            </ul>
          </div>
        )
      },
      {
        title: "Mandated Treatment & Note 1 Disclosure",
        content: (
          <div>
            <p>The company must restate WIP inventory retrospectively for the overhead policy change, but must charge the warranty estimate revision prospectively to the current year P&L:</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-xs my-2">
              <strong>Adjusting Journal Entries:</strong><br />
              1) Debit Opening Reserves (Retrospective WIP): ₹28 Lakhs | Credit WIP Inventory: ₹28 Lakhs<br />
              2) Debit Selling Expenses (Warranty Costs): ₹15 Lakhs | Credit Provision for Warranty: ₹15 Lakhs
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl font-mono text-xs leading-relaxed my-2 whitespace-pre-line text-slate-800 dark:text-slate-200">
              <strong>Draft Note 1 Disclosure:</strong>
              "Note 1 (Significant Accounting Policies): The Company has changed its method of allocating factory overheads to work-in-progress inventories from a direct-labor absorption rate to a technical machine-hour rate system to reflect automation levels. This change in accounting policy has been applied retrospectively, decreasing inventory carrying value and opening reserves by ₹28 Lakhs. Separately, the warranty provision has been revised from 1.5% to 3.5% based on updated technical reports. This change in estimate under AS 5 has been applied prospectively, increasing current year selling expenses by ₹15 Lakhs."
            </div>
          </div>
        )
      },
      {
        title: "Audit Perspective & CARO Verification",
        content: (
          <div>
            <p>The auditor must verify the technical engineers' reports to confirm the machine-hour cost drivers. Verify the restated WIP spreadsheets to confirm the ₹28 Lakhs valuation impact. Under CARO 2020, verify Clause 3(ii) for inventory valuation compliance. If management refuses to charge the warranty provision to the current P&L, the auditor must qualify the audit opinion due to material misstatement.</p>
          </div>
        )
      }
    ],
    examFocus: "ICAI Exam Trap: Revisions in estimate (like warranty percentage) are applied prospectively under AS 5. Methods of applying accounting principles (like WIP overhead allocation basis) are policy changes and require retrospective restatement with clear disclosure of the quantified impact in Note 1. ALWAYS quote AS 1 Para 22 and AS 5 in your answer.",
    examFocusType: "trap"
  },
  {
    id: "1-2",
    title: "Illustration 3.2: Materiality in Office Equipment Write-Off (Immediate Expensing)",
    category: "ICAI Study Material",
    pdfPage: 6,
    panels: [
      {
        title: "Enterprise Scale & Purchase Details",
        content: (
          <div>
            <p><strong>Entity & Scale:</strong> MegaMart Logistics Ltd operates a nationwide warehousing network with total assets of ₹850 Crores and annual revenues of ₹1,200 Crores. During the year, the warehousing division purchased office printing machinery and storage bins for a total cost of ₹3,50,000.</p>
            <p><strong>The Transaction:</strong> Previously, MegaMart materialized a capitalization policy of capturing all physical assets with a useful life exceeding one year under Property, Plant & Equipment (PPE), and depreciating them over 4 years. In the current year, the accounting team decided to expense the entire ₹3.5 Lakhs immediately as office expenses, bypassing the asset register.</p>
          </div>
        )
      },
      {
        title: "Materiality & AS 10 Capitalization Overlaps",
        content: (
          <div>
            <p><strong>Accounting Principle:</strong> Under <span className="font-semibold text-slate-900 dark:text-white">AS 1</span>, financial statements should disclose all material items that could influence the economic decisions of users <PdfRefInline page={6} />. Capitalization rules of <span className="font-semibold text-slate-900 dark:text-white">AS 10</span> state that items of PPE should be capitalized. However, AS 1 allows the expensing of immaterial assets to reduce administrative tracking costs, provided it is done consistently.</p>
            <p><strong>Materiality Level:</strong> The transaction of ₹3.5 Lakhs represents only 0.0004% of total assets, making it highly immaterial to stakeholders. Immediate expensing is technically justified, provided the policy is disclosed and followed consistently across all warehouses.</p>
          </div>
        )
      },
      {
        title: "Final Accounting & Policy Note Disclosure",
        content: (
          <div>
            <p>The correct accounting treatment is to charge the asset purchase to the Profit & Loss statement immediately, supported by a clear policy disclosure in Note 1:</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-xs my-2">
              <strong>Journal Entry:</strong><br />
              Debit Office Expenses: ₹3,50,000 | Credit Bank: ₹3,50,000
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl font-mono text-xs leading-relaxed my-2 whitespace-pre-line text-slate-800 dark:text-slate-200">
              <strong>Draft Note 1 Disclosure:</strong>
              "Note 1 (Significant Accounting Policies - Fixed Assets Capitalization): Property, Plant & Equipment are capitalized at cost. In accordance with the materiality concept of AS 1, individual assets costing less than ₹5,00,000 are expensed to the Statement of Profit and Loss in the year of acquisition, regardless of their estimated useful lives."
            </div>
          </div>
        )
      },
      {
        title: "Auditor Validation & Aggregate Check",
        content: (
          <div>
            <p>The auditor should verify purchase invoices to confirm individual item costs are indeed below the ₹5,00,000 policy threshold. Crucially, check for systemic write-offs of similar low-value items that might accumulate to a material amount in the aggregate, violating the true and fair view. Verify that the policy does not result in the expensing of major warehousing equipment.</p>
          </div>
        )
      }
    ],
    examFocus: "Most Asked Concept: Materiality. Immaterial items do not require strict compliance with standard accounting policies. For example, immediate expensing of low-value assets like printing equipment is allowed to save administrative costs. In exams, emphasize that the threshold is relative to the enterprise's asset base and revenue.",
    examFocusType: "concept"
  },
  {
    id: "1-3",
    title: "Illustration 3.3: Para 23 Rule — Disclosure Cannot Cure Incorrect Accounting (Interest Capitalization)",
    category: "ICAI Study Material",
    pdfPage: 7,
    panels: [
      {
        title: "Asset Construction & Borrowing Costs",
        content: (
          <div>
            <p><strong>Entity & Scale:</strong> Delta Steel Ltd is constructing a new blast furnace plant with an estimated construction period of 24 months. The project is funded by a dedicated term loan of ₹50 Crores bearing interest at 10% per annum.</p>
            <p><strong>The Transaction:</strong> During the year, a labor union strike suspended construction completely for a 3-month period. Management capitalized the interest of ₹1.25 Crores accrued during this suspension into the blast furnace asset cost and disclosed it in a detailed footnote under Note 1.</p>
          </div>
        )
      },
      {
        title: "AS 16 Capitalization Limits & AS 1 Para 23 Rule",
        content: (
          <div>
            <p><strong>The Violation:</strong> Under <span className="font-semibold text-slate-900 dark:text-white">AS 16</span>, capitalization of borrowing costs must be suspended during extended periods in which active development is interrupted. Capitalizing ₹1.25 Crores during the strike violates this rule.</p>
            <p><strong>The Core Accrual & Disclosure Conflict:</strong> Management argued that a footnote disclosure in Note 1 protects them from qualifications. However, <span className="font-semibold text-slate-900 dark:text-white">AS 1 Para 23</span> explicitly states that disclosure of an incorrect accounting treatment cannot justify or cure the error <PdfRefInline page={7} />. The incorrect capitalization overstates assets and reported profits by ₹1.25 Crores.</p>
          </div>
        )
      },
      {
        title: "Financial Impact & Qualification Note",
        content: (
          <div>
            <p>The company must remove the capitalized interest from capital work-in-progress and charge it as a finance expense in the P&L:</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-xs my-2">
              <strong>Correcting Journal Entry:</strong><br />
              Debit Finance Costs (P&L): ₹1.25 Crores | Credit Capital Work-in-Progress: ₹1.25 Crores
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl font-mono text-xs leading-relaxed my-2 whitespace-pre-line text-slate-800 dark:text-slate-200">
              <strong>Draft Auditor Qualification Note:</strong>
              "Note [X]: Capital Work-in-Progress includes ₹1.25 Crores representing interest capitalized during a 3-month suspension of construction due to labor disputes. This capitalization violates AS 16. Had this interest been expensed as required, Finance Costs would have been higher by ₹1.25 Crores, Capital Work-in-Progress lower by ₹1.25 Crores, and Profit Before Tax lower by ₹1.25 Crores."
            </div>
          </div>
        )
      },
      {
        title: "Statutory Auditor Assessment & Audit Report Impact",
        content: (
          <div>
            <p>The auditor must verify the project logs to establish the exact duration of the construction strike. Recalculate interest accruals during the strike period to verify the ₹1.25 Crores misstatement. If management refuses to correct the books, the auditor must issue a qualified or adverse opinion in their audit report under Section 143(3), citing non-compliance with AS 16 and AS 1.</p>
          </div>
        )
      }
    ],
    examFocus: "ICAI Exam Focus: Under AS 1 Para 23, a footnote disclosure cannot cure an incorrect accounting treatment. The incorrect treatment must be corrected. If management capitalizes interest during active construction suspension, the auditor must qualify the audit report, regardless of whether a full disclosure is made in Note 1.",
    examFocusType: "focus"
  },
  {
    id: "1-4",
    title: "Illustration 3.4: Fundamental Assumptions — Going Concern Defeated (Operating License Revoked)",
    category: "ICAI Study Material",
    pdfPage: 8,
    panels: [
      {
        title: "Business Operations & Regulatory Action",
        content: (
          <div>
            <p><strong>Entity & Scale:</strong> EnviroSafe Solutions Ltd operates a hazardous chemical recycling plant with specialized machinery worth ₹45 Crores. The company's operations depend entirely on a regulatory license issued by the State Pollution Control Board.</p>
            <p><strong>The Transaction:</strong> Due to a toxic leak, the Pollution Control Board revoked the company's operating license permanently. The company cannot operate or generate revenue. However, management prepared the financial statements under the standard Going Concern assumption, arguing they are appealing the order in Court.</p>
          </div>
        )
      },
      {
        title: "Going Concern Assessment & Impairment Triggers",
        content: (
          <div>
            <p><strong>Standard Guidance:</strong> Under <span className="font-semibold text-slate-900 dark:text-white">AS 1</span>, Going Concern is a fundamental accounting assumption <PdfRefInline page={3} />. If it is violated, the financial statements must be prepared on a Net Realizable Value (NRV) basis. The permanent revocation of the operating license defeats the going concern assumption, as the entity has no realistic alternative but to liquidate.</p>
            <p><strong>Accounting Implications:</strong> Preparing accounts on a historical cost basis understates impairments. Assets must be written down to their net realizable value (NRV) and long-term liabilities classified as current liabilities.</p>
          </div>
        )
      },
      {
        title: "Accounting on Net Realizable Value (NRV) Basis",
        content: (
          <div>
            <p>The machinery must be impaired to its scrap value, and all assets written down to NRV. Long-term loans must be reclassified as current liabilities due to breach of covenant:</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-xs my-2">
              <strong>Journal Entry:</strong><br />
              Debit Impairment Loss (P&L): ₹40 Crores | Credit Property, Plant & Equipment (Machinery): ₹40 Crores<br />
              Debit Long-term Borrowings: ₹25 Crores | Credit Current Maturities of Long-term Debt: ₹25 Crores
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl font-mono text-xs leading-relaxed my-2 whitespace-pre-line text-slate-800 dark:text-slate-200">
              <strong>Draft Note 1 Disclosure:</strong>
              "Note 1 (Basis of Preparation): The Company's operating license was permanently revoked by the State Pollution Control Board during the year. Consequently, the fundamental assumption of Going Concern is no longer valid. Accordingly, these financial statements have been prepared on a Net Realizable Value basis. Assets have been written down to their estimated realizable values, and all long-term liabilities have been reclassified as current."
            </div>
          </div>
        )
      },
      {
        title: "Statutory Audit Procedures & CARO Clause 3(xix)",
        content: (
          <div>
            <p>The auditor must obtain the Pollution Control Board's revocation order and consult legal counsel on the status of the court appeal. Verify scrap value valuations for machinery. Under CARO 2020, Clause 3(xix), the auditor must report on the company's financial capability to meet its liabilities. If management refuses to reject the going concern assumption, the auditor must issue an adverse audit report.</p>
          </div>
        )
      }
    ],
    examFocus: "Most Asked Concept: Going Concern. Going Concern, Accrual, and Consistency are fundamental assumptions. If they are followed, no disclosure is required. If they are violated, disclosure is mandatory. In exams, emphasize that when going concern is defeated, assets must be written down to NRV and liabilities reclassified.",
    examFocusType: "concept"
  }
];

export const businessExamples: CaseStudy[] = [
  {
    id: "2-1",
    title: "Example 2.1: Manufacturing — Fixed Overhead Allocation under Idle Capacity",
    category: "Practical Business Example",
    panels: [
      {
        title: "Operational Scale & Production Metrics",
        content: (
          <div>
            <p><strong>Entity & Scale:</strong> TexSpun India Ltd operates a high-volume cotton yarn spinning mill with annual revenues of ₹150 Crores and a normal monthly operating capacity of 1,00,000 units. The monthly fixed factory overheads are ₹1.20 Crores.</p>
            <p><strong>The Transaction:</strong> During the year, a labor dispute caused a plant shutdown, reducing the monthly production volume from 1,00,000 units to 60,000 units. Management capitalized the entire fixed overhead of ₹1.20 Crores into the cost of the 60,000 units produced during the month, raising inventory unit valuation by ₹20.</p>
          </div>
        )
      },
      {
        title: "AS 2 Cost Allocation Rules & AS 1 Prudence",
        content: (
          <div>
            <p><strong>The Violation:</strong> Under <span className="font-semibold text-slate-900 dark:text-white">AS 2</span>, fixed production overheads must be allocated to inventory cost based on the <em>normal capacity</em> of the production facilities. During underutilization, the allocation per unit must not increase. The excess overhead of ₹48 Lakhs (corresponding to the 40% idle capacity) must be written off to the P&L.</p>
            <p><strong>Prudence Application:</strong> Capitalizing idle capacity costs understates operational losses and overstates closing inventory by ₹48 Lakhs (4% of PBT). Applying the prudence concept of AS 1, anticipated losses must be charged to the P&L immediately <PdfRefInline page={5} />.</p>
          </div>
        )
      },
      {
        title: "Adjusting Entries & Policy Note Disclosure",
        content: (
          <div>
            <p>The company must record the idle capacity cost as a current period expense and adjust the inventory carrying value:</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-xs my-2">
              <strong>Adjusting Journal Entry:</strong><br />
              Debit Idle Capacity Loss (P&L): ₹48,00,000 | Credit WIP/Finished Goods Inventory: ₹48,00,000
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl font-mono text-xs leading-relaxed my-2 whitespace-pre-line text-slate-800 dark:text-slate-200">
              <strong>Draft Note 1 Disclosure:</strong>
              "Note 1 (Inventory Valuation Policy): Fixed production overheads are allocated to inventory based on normal operating capacity. Abnormal unallocated overheads resulting from underutilization are expensed directly to the Statement of Profit and Loss in the period they occur. Consequently, due to labor disputes, unallocated fixed overheads of ₹48 Lakhs have been expensed in the current year."
            </div>
          </div>
        )
      },
      {
        title: "Auditor Response & Cost Sheet Verification",
        content: (
          <div>
            <p>The auditor must verify the plant's production logs to determine normal vs. actual capacity. Review cost sheets to trace fixed overhead allocations. Confirm that the closing inventory valuation excludes unallocated idle overheads. Verify compliance with AS 2 and ensure proper disclosure is made under Note 1.</p>
          </div>
        )
      }
    ]
  },
  {
    id: "2-2",
    title: "Example 2.2: Technology/SaaS — Software Development Cost Capitalization",
    category: "Practical Business Example",
    panels: [
      {
        title: "SaaS Business Model & R&D Outlays",
        content: (
          <div>
            <p><strong>Entity & Scale:</strong> WebFlow Software Ltd develops cloud-based ERP solutions for logistics companies. The company has annual revenues of ₹80 Crores and spends ₹15 Crores annually on software development engineers and product design.</p>
            <p><strong>The Transaction:</strong> During the year, the company initiated the development of a new AI-driven warehousing routing algorithm. Out of ₹4.5 Crores spent, ₹2.0 Crores was spent on preliminary feasibility studies (Research phase) and ₹2.5 Crores on coding and database architecture (Development phase). Management capitalized the entire ₹4.5 Crores under Intangible Assets.</p>
          </div>
        )
      },
      {
        title: "Technical Evaluation (AS 26 Intangibles Criteria)",
        content: (
          <div>
            <p><strong>Standard Guidance:</strong> Under <span className="font-semibold text-slate-900 dark:text-white">AS 26</span>, expenditure on research must be expensed as incurred. Capitalization of development costs is only permitted if the entity can demonstrate technical feasibility, intention to complete, and ability to generate future economic benefits. Under <span className="font-semibold text-slate-900 dark:text-white">AS 1</span>, policies must be selected based on substance over form <PdfRefInline page={6} />.</p>
            <p><strong>The Issue:</strong> Capitalizing research costs overstates intangible assets and profits by ₹2.0 Crores. The company must separate the costs and write off the research component immediately.</p>
          </div>
        )
      },
      {
        title: "Correct Treatment & Note Disclosure",
        content: (
          <div>
            <p>The company must expense the research phase and capitalize only the eligible development costs:</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-xs my-2">
              <strong>Journal Entry:</strong><br />
              Debit Research & Development Expense (P&L): ₹2,00,00,000 | Credit Bank/Wages: ₹2,00,00,000<br />
              Debit Intangible Assets under Development: ₹2,50,00,000 | Credit Bank/Wages: ₹2,50,00,000
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl font-mono text-xs leading-relaxed my-2 whitespace-pre-line text-slate-800 dark:text-slate-200">
              <strong>Draft Note 1 Disclosure:</strong>
              "Note 1 (Research and Development Costs): Expenditure on research activities is recognized as an expense in the period in which it is incurred. Development costs of internally generated software are capitalized as intangible assets only if they meet the capitalization criteria of AS 26, including technical feasibility and future economic benefit. In the current year, ₹2.0 Crores of research costs were expensed, and ₹2.5 Crores capitalized as intangible assets under development."
            </div>
          </div>
        )
      },
      {
        title: "Audit Risk, Procedures & CARO Compliance",
        content: (
          <div>
            <p>The auditor must review timesheets, code repository logs, and project feasibility reports to verify the boundary between research and development phases. Verify that capitalization began only after technical feasibility was formally documented. Ensure disclosure is compliant with AS 26 and AS 1. Check Clause 3(i) of CARO 2020 on maintenance of intangible asset records.</p>
          </div>
        )
      }
    ]
  },
  {
    id: "2-3",
    title: "Example 2.3: E-Commerce — Gross vs. Net Revenue Recognition Policy",
    category: "Practical Business Example",
    panels: [
      {
        title: "Platform Operations & Commission Business Model",
        content: (
          <div>
            <p><strong>Entity & Scale:</strong> ShopFast Online Ltd operates an e-commerce platform where third-party merchants list and sell consumer goods. The platform has annual Gross Merchandise Value (GMV) of ₹500 Crores, platform commissions of ₹50 Crores, and marketing discounts of ₹10 Crores.</p>
            <p><strong>The Transaction:</strong> Previously, the company recognized revenue on a net basis (commission earned). During the current year, to inflate its revenue metrics for prospective investors, management changed its accounting policy to recognize revenue on a gross basis (₹500 Crores) and present payments to merchants as Cost of Goods Sold.</p>
          </div>
        )
      },
      {
        title: "AS 9 Revenue Recognition & Control Evaluation",
        content: (
          <div>
            <p><strong>Standard Guidance:</strong> Under <span className="font-semibold text-slate-900 dark:text-white">AS 9</span>, revenue recognition depends on whether the entity acts as a principal or an agent. A principal controls the goods before transfer, takes inventory risk, and sets prices. An agent does not have control and only earns commission.</p>
            <p><strong>The Issue:</strong> ShopFast does not own the inventory, take inventory risk, or set pricing. Shifting to gross revenue overstates revenue by ₹450 Crores (900%), violating the accrual and true and fair view principles of AS 1. Revenue must be recognized net.</p>
          </div>
        )
      },
      {
        title: "Accounting Adjustments & Revenue Policy Disclosures",
        content: (
          <div>
            <p>The company must adjust its books to recognize only the net commission revenue:</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-xs my-2">
              <strong>Adjusting Journal Entry:</strong><br />
              Debit Gross Revenue: ₹450 Crores | Credit Cost of Goods Sold (Merchant Payments): ₹450 Crores
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl font-mono text-xs leading-relaxed my-2 whitespace-pre-line text-slate-800 dark:text-slate-200">
              <strong>Draft Note 1 Disclosure:</strong>
              "Note 1 (Revenue Recognition Policy): Revenue from platform services is recognized on a net basis (commission and transaction fees) when the transaction is completed on the portal. The Company acts as an agent and does not take inventory or pricing risk. Accordingly, gross transaction values of ₹500 Crores listed by third-party merchants are excluded from platform revenues."
            </div>
          </div>
        )
      },
      {
        title: "Audit Verification of Customer Contracts & Red Flags",
        content: (
          <div>
            <p>The auditor must review merchant agreements to check clauses on inventory risk, price setting, and product returns. Verify that cash receipts match commission ledgers. Confirm that the gross revenue change is rejected. Check that the e-commerce disclosures comply with AS 9 and AS 1 guidelines.</p>
          </div>
        )
      }
    ]
  }
];

export const auditCases: CaseStudy[] = [
  {
    id: "3-1",
    title: "Case 3.1: Electra Appliance Ltd — Unjustified Warranty Provision Rate Reduction",
    category: "Audit Case Study",
    panels: [
      {
        title: "Consumer Electronics Market & Product Warranty Terms",
        content: (
          <div>
            <p><strong>Entity & Scale:</strong> Electra Appliance Ltd is a listed manufacturer of household electric appliances with annual sales of ₹450 Crores and PBT of ₹24 Crores. The company offers a standard 2-year warranty on all products.</p>
            <p><strong>The Transaction:</strong> Previously, Electra maintained a warranty provision of 3.0% of sales based on historical claim registers. During the current year, to meet market profit expectations, the CFO reduced the warranty provision rate to 1.0% of sales, reducing current year expenses by ₹9.0 Crores. No technical changes or product quality improvements were made.</p>
          </div>
        )
      },
      {
        title: "AS 29 Provision Criteria & AS 1 Accrual/Prudence Assumptions",
        content: (
          <div>
            <p><strong>Standard Guidance:</strong> Under <span className="font-semibold text-slate-900 dark:text-white">AS 29</span>, provisions must be recognized when there is a present obligation as a result of a past event, and a reliable estimate can be made. Revisions of estimates must be backed by empirical evidence. Under <span className="font-semibold text-slate-900 dark:text-white">AS 1</span>, the accrual and prudence concepts require provisions to reflect the actual anticipated claims <PdfRefInline page={5} />.</p>
            <p><strong>The Issue:</strong> Reducing the provision without technical logs violates prudence. It understates liabilities by ₹9.0 Crores and overstates reported PBT by 37.5%, which is highly material. The provision must be maintained at 3.0%.</p>
          </div>
        )
      },
      {
        title: "Adjusted Financial Statement Impact & Note 1 Disclosures",
        content: (
          <div>
            <p>The company must restore the warranty provision rate to 3.0% and charge the ₹9.0 Crores warranty expense to the P&L:</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-xs my-2">
              <strong>Adjusting Journal Entry:</strong><br />
              Debit Selling Expenses (Warranty Provision): ₹9,00,00,000 | Credit Provision for Warranty: ₹9,00,00,000
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl font-mono text-xs leading-relaxed my-2 whitespace-pre-line text-slate-800 dark:text-slate-200">
              <strong>Draft Note 1 Disclosure:</strong>
              "Note 1 (Provisions - Warranty): Provisions for warranty are recognized based on historical claim patterns and technical estimations of product failure rates. During the year, a proposal to reduce the provision rate to 1.0% was rejected due to lack of technical evidence. Consequently, the provision has been maintained at the historical rate of 3.0% in compliance with AS 29 and AS 1."
            </div>
          </div>
        )
      },
      {
        title: "Statutory Auditor Challenge & Qualified Audit Opinion",
        content: (
          <div>
            <p>The auditor must obtain historical warranty claim logs to verify the actual failure rate over the past 3 years. Challenge the CFO's proposal and request technical reports from independent engineering specialists. If management refuses to correct the provision to 3.0%, the auditor must issue a qualified or adverse opinion in their audit report under Section 143(3), citing material misstatement of profits.</p>
          </div>
        )
      }
    ],
    examFocus: "AS 29 and AS 1: Changes in provisions must be supported by technical data. Unjustified reductions to manage earnings violate the prudence concept. Always qualify the report if material.",
    examFocusType: "focus"
  },
  {
    id: "3-2",
    title: "Case 3.2: MegaCement Ltd — Capitalization of Trial Run Production Costs",
    category: "Audit Case Study",
    panels: [
      {
        title: "Capital Project Scale & Commissioning Phase",
        content: (
          <div>
            <p><strong>Entity & Scale:</strong> MegaCement Ltd is commissioning a new clinker plant with a capital cost of ₹250 Crores. The trial runs of the plant took place over a 1-month period, incurring input costs of ₹1.5 Crores.</p>
            <p><strong>The Transaction:</strong> During the trial runs, the plant produced clinker which was sold in the local market for ₹95 Lakhs. Management capitalized the entire trial run cost of ₹1.5 Crores into Property, Plant & Equipment (PPE) but credited the sales revenue of ₹95 Lakhs to the P&L statement to show higher operating profits.</p>
          </div>
        )
      },
      {
        title: "Technical AS 10 Rules & Net Cost Capitalization Principles",
        content: (
          <div>
            <p><strong>Standard Guidance:</strong> Under <span className="font-semibold text-slate-900 dark:text-white">AS 10 (Revised)</span>, any costs incurred during commissioning, testing, and trial runs must be capitalized into the cost of the asset. Crucially, the net proceeds from selling the trial output must be deducted from the cost of the trial runs and credited against the asset's capitalized value, not the P&L.</p>
            <p><strong>The Issue:</strong> Crediting trial run sales to the P&L overstates reported revenues by ₹95 Lakhs and overstates capitalized asset values. The sales proceeds must be credited against the capitalized plant cost.</p>
          </div>
        )
      },
      {
        title: "Correct Accounting Adjustments & PPE Note Disclosures",
        content: (
          <div>
            <p>The company must transfer the trial run sales proceeds from revenue to the clinker plant asset account:</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-xs my-2">
              <strong>Adjusting Journal Entry:</strong><br />
              Debit Revenue from Operations (P&L): ₹95,00,000 | Credit Clinker Plant (Capital Work-in-Progress): ₹95,00,000
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl font-mono text-xs leading-relaxed my-2 whitespace-pre-line text-slate-800 dark:text-slate-200">
              <strong>Draft Note 1 Disclosure:</strong>
              "Note 1 (Capitalization of PPE): Property, Plant & Equipment includes expenditure incurred during trial runs and testing, net of sales proceeds of inventory produced during the trial run period. In the current year, net trial run costs of ₹55 Lakhs (gross costs of ₹1.5 Crores less sales proceeds of ₹95 Lakhs) have been capitalized into Clinker Plant cost."
            </div>
          </div>
        )
      },
      {
        title: "Audit Verification of Trial Logs & CARO Clause 3(i)",
        content: (
          <div>
            <p>The auditor must verify the plant's trial run logs to establish the exact commissioning period. Reconcile clinker production logs with sales invoices to verify the ₹95 Lakhs proceeds. Confirm that the sales proceeds are deducted from the capitalized cost of the clinker plant. Under CARO 2020, verify Clause 3(i) for fixed asset capitalization accuracy.</p>
          </div>
        )
      }
    ]
  },
  {
    id: "3-3",
    title: "Case 3.3: PioneerMining Ltd — CFO Override of Inventory Obsolescence Policy",
    category: "Audit Case Study",
    panels: [
      {
        title: "Mining Operations & Inventory Obsolescence Triggers",
        content: (
          <div>
            <p><strong>Entity & Scale:</strong> PioneerMining Ltd operates an iron ore mine with total inventory of ₹65 Crores, including specialized spare parts worth ₹12 Crores. The company reports annual EBITDA of ₹20 Crores.</p>
            <p><strong>The Transaction:</strong> Due to a change in regulatory mining rules, a set of equipment became obsolete, and their related spare parts (carrying value of ₹4.0 Crores) were deemed unusable. The company's internal inventory policy dictates that all obsolete spares must be written down to scrap value (₹10 Lakhs). However, the CFO directed the warehouse to value them at cost, overriding the policy.</p>
          </div>
        )
      },
      {
        title: "AS 2 Valuation Rules & AS 1 Prudence Principle",
        content: (
          <div>
            <p><strong>Standard Guidance:</strong> Under <span className="font-semibold text-slate-900 dark:text-white">AS 2</span>, inventories must be valued at the lower of cost and net realizable value (NRV). Spares related to obsolete equipment have negligible NRV and must be written down. Under <span className="font-semibold text-slate-900 dark:text-white">AS 1</span>, the prudence principle requires write-downs for obsolete items to avoid overstating assets <PdfRefInline page={5} />.</p>
            <p><strong>The Issue:</strong> Overriding the policy understates inventory write-offs by ₹3.90 Crores and overstates reported EBITDA by 19.5%. The spares must be written down to scrap value immediately.</p>
          </div>
        )
      },
      {
        title: "Accounting Write-Down Entries & Disclosure Notes",
        content: (
          <div>
            <p>The company must write down the obsolete spares to their net realizable value (scrap value) of ₹10 Lakhs:</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-xs my-2">
              <strong>Journal Entry:</strong><br />
              Debit Inventory Write-down (P&L): ₹3,90,00,000 | Credit Stores and Spares (Inventory): ₹3,90,00,000
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl font-mono text-xs leading-relaxed my-2 whitespace-pre-line text-slate-800 dark:text-slate-200">
              <strong>Draft Note 1 Disclosure:</strong>
              "Note 1 (Inventory Valuation): Stores, spares, and consumables are valued at the lower of cost and net realizable value. Provision is made for obsolete, slow-moving, and damaged items based on technical evaluations. During the year, stores and spares worth ₹3.90 Crores were written down to their net realizable value due to equipment obsolescence."
            </div>
          </div>
        )
      },
      {
        title: "Auditor Response & Section 143(3) Reporting",
        content: (
          <div>
            <p>The auditor must inspect the equipment scrap register to confirm which machines are decommissioned. Reconcile spare parts registers with active machinery lists to identify obsolete items. Challenge the CFO's override and request technical write-off reports. Report the management override under Section 143(3)(i) as a material weakness in internal financial controls.</p>
          </div>
        )
      }
    ]
  }
];

export const regulatoryObservations: CaseStudy[] = [
  {
    id: "4-1",
    title: "Observation 4.1: NFRA Order — Boilerplate and Generic Disclosure of Accounting Policies",
    category: "Regulatory Observations",
    panels: [
      {
        title: "NFRA Quality Review Findings & Inspected Company",
        content: (
          <div>
            <p><strong>The Regulator:</strong> The National Financial Reporting Authority (NFRA) conducted a quality review of the financial statements of a listed infrastructure company. NFRA observed that the company's Note 1 disclosures were copy-pasted and boilerplate.</p>
            <p><strong>The Non-Compliance:</strong> The company's inventory policy stated it valued inventory at the 'lower of cost and net realizable value' using FIFO, but the company's ledger revealed it had no inventory (it was a pure service company). Furthermore, the revenue note did not describe the actual milestone methods used for construction projects.</p>
          </div>
        )
      },
      {
        title: "Specificity Standards under AS 1",
        content: (
          <div>
            <p><strong>Regulatory Directives:</strong> Under <span className="font-semibold text-slate-900 dark:text-white">AS 1</span>, disclosures of accounting policies must be entity-specific and represent the actual methods adopted by the enterprise <PdfRefInline page={7} />. Generic policies that do not correspond to the company's actual transactions violate the disclosure requirements of AS 1.</p>
            <p><strong>NFRA Action:</strong> NFRA directed companies to remove irrelevant accounting policies and disclose the exact valuation formulas and revenue milestone rules used in practice, preventing boilerplate note presentation.</p>
          </div>
        )
      },
      {
        title: "Corrective Actions & Entity-Specific Disclosure Template",
        content: (
          <div>
            <p>The company must revise Note 1 to remove irrelevant policies and draft specific disclosures for its active operations:</p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl font-mono text-xs leading-relaxed my-2 whitespace-pre-line text-slate-800 dark:text-slate-200">
              <strong>Revised Specific Note 1 Disclosure:</strong>
              "Note 1 (Revenue Recognition): Revenue from construction contracts is recognized under the Percentage of Completion Method (POCM) in compliance with AS 7. Contract progress is measured by the proportion of contract costs incurred for work performed to date relative to the estimated total contract costs. Generic policies regarding inventory valuation have been removed as the Company does not hold physical stock."
            </div>
          </div>
        )
      },
      {
        title: "Audit Checklists & NFRA Action Plans",
        content: (
          <div>
            <p>The auditor must include a step in the audit program to map every Note 1 policy to an active ledger balance. Challenge generic policies during the planning phase. Ensure that management updates Note 1 to reflect actual operational changes. Confirm that all disclosures meet the transparency guidelines of AS 1 and NFRA review orders.</p>
          </div>
        )
      }
    ]
  },
  {
    id: "4-2",
    title: "Observation 4.2: SEBI Directive — Revenue Recognition Disclosures without Specific Milestones",
    category: "Regulatory Observations",
    panels: [
      {
        title: "SEBI Audit Findings & Revenue Mismatch Triggers",
        content: (
          <div>
            <p><strong>The Regulator:</strong> The Securities and Exchange Board of India (SEBI) issued a circular to listed software companies after a compliance review revealed inconsistent revenue recognition notes.</p>
            <p><strong>The Non-Compliance:</strong> Several IT services companies recognized revenue on a 'milestone basis' but failed to disclose the specific milestones (such as user acceptance testing, hardware delivery, or time-and-material cutoffs). This left investors unable to assess the timing of cash-flow arrivals.</p>
          </div>
        )
      },
      {
        title: "SEBI Guidelines & AS 9 Contract Milestone Accounting",
        content: (
          <div>
            <p><strong>Standard Guidance:</strong> Under <span className="font-semibold text-slate-900 dark:text-white">AS 9</span>, revenue must be recognized when performance is complete and collection is assured. If performance consists of multiple milestones, the disclosure must specify the criteria for each stage. Under <span className="font-semibold text-slate-900 dark:text-white">AS 1</span>, disclosures must explain the exact methods of application adopted by the enterprise <PdfRefInline page={7} />.</p>
            <p><strong>SEBI Directive:</strong> SEBI directed companies to provide segment contract disclosures detailing the specific milestones for software licensing, maintenance, and consulting revenue.</p>
          </div>
        )
      },
      {
        title: "Corrective Disclosures & Segment Contract Templates",
        content: (
          <div>
            <p>The company must update its revenue policy note to disclose specific milestone parameters:</p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl font-mono text-xs leading-relaxed my-2 whitespace-pre-line text-slate-800 dark:text-slate-200">
              <strong>Corrective Note 1 Disclosure:</strong>
              "Note 1 (Revenue Recognition - Software Contracts): 
              1. Software Licenses: Revenue is recognized on delivery and installation, upon receipt of customer sign-off.
              2. Annual Maintenance: Revenue is recognized proportionally over the term of the agreement.
              3. Custom Implementation: Revenue is recognized on a time-and-material basis as hours are logged and approved by the customer."
            </div>
          </div>
        )
      },
      {
        title: "Audit Program & Revenue Testing Procedures",
        content: (
          <div>
            <p>The auditor must verify a sample of client project contracts to confirm that the revenue recognition milestones used in the ledgers match the revised Note 1 disclosures. Ensure that all customer sign-offs are archived. Confirm compliance with AS 9 and check for any unbilled revenue balances at year-end.</p>
          </div>
        )
      }
    ]
  },
  {
    id: "4-3",
    title: "Observation 4.3: MCA Action — Prior Period Errors Disguised as Changes in Estimates",
    category: "Regulatory Observations",
    panels: [
      {
        title: "MCA Investigation Triggers & Asset Ledgers Review",
        content: (
          <div>
            <p><strong>The Regulator:</strong> The Ministry of Corporate Affairs (MCA) launched an investigation into the accounts of an engineering company after a whistleblower alleged profit inflation.</p>
            <p><strong>The Non-Compliance:</strong> The investigation revealed that the company had failed to charge depreciation on a group of factory assets for the past three years due to an ERP configuration error (cumulative impact of ₹2.5 Crores). Management discovered the error during the year but adjusted it as a prospective 'useful life revision' (change in estimate) under AS 5, avoiding a prior period restatement.</p>
          </div>
        )
      },
      {
        title: "MCA Action & AS 5 / AS 1 Regulatory Standards",
        content: (
          <div>
            <p><strong>Standard Guidance:</strong> Under <span className="font-semibold text-slate-900 dark:text-white">AS 5</span>, prior period errors resulting from mathematical mistakes or oversights must be corrected and disclosed as 'Prior Period Items' in the P&L statement, rather than prospective adjustments. Under <span className="font-semibold text-slate-900 dark:text-white">AS 1</span>, the consistency and accrual assumptions require prior period errors to be corrected to present a true and fair view <PdfRefInline page={3} />.</p>
            <p><strong>MCA Action:</strong> MCA ordered the company to restate its P&L statement to show the prior period depreciation error and penalized the directors for non-disclosure.</p>
          </div>
        )
      },
      {
        title: "Financial Restatement & Prior Period Note",
        content: (
          <div>
            <p>The company must record the accumulated depreciation as a prior period error and correct its current year prospective estimates:</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-xs my-2">
              <strong>Correcting Journal Entry:</strong><br />
              Debit Prior Period Depreciation Expense (P&L): ₹2.5 Crores | Credit Accumulated Depreciation (PPE): ₹2.5 Crores
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl font-mono text-xs leading-relaxed my-2 whitespace-pre-line text-slate-800 dark:text-slate-200">
              <strong>Draft Note 1 Disclosure:</strong>
              "Note 1 (Prior Period Adjustments): During the year, the Company identified an omission in charging depreciation on plant machinery for the financial years 2023-24 and 2024-25. The error has been corrected by charging a prior period depreciation expense of ₹2.5 Crores to the current year's Profit & Loss statement in compliance with AS 5."
            </div>
          </div>
        )
      },
      {
        title: "Auditor Forensic Testing & Internal Control Review",
        content: (
          <div>
            <p>The auditor must perform forensic audit testing on the ERP fixed asset module logs. Review asset acquisition registers and verify that depreciation is computed automatically for all assets. Reconcile the prior period adjustments in the P&L with general ledger reports. Report the internal control weakness in the IFC report under Section 143(3).</p>
          </div>
        )
      }
    ]
  }
];

export const judicialCases: CaseStudy[] = [
  {
    id: "5-1",
    title: "Case 5.1: CIT vs. Woodward Governor India Pvt. Ltd. (SC [2009] 312 ITR 254)",
    category: "Landmark Judicial Case",
    panels: [
      {
        title: "Tax Dispute Facts & Foreign Currency Loan Translation",
        content: (
          <div>
            <p><strong>The Dispute:</strong> Woodward Governor India Pvt. Ltd. took a foreign currency loan for capital imports. Due to exchange rate shifts at the year-end, the outstanding loan liability increased. The assessee capitalized/expensed the exchange loss on the outstanding loan at year-end, following the accrual system.</p>
            <p><strong>Tax Department Claim:</strong> The Income Tax Department rejected the claim, arguing that exchange loss on outstanding loans is 'unrealized' and 'notional' and can only be claimed when the loan is repaid (cash basis).</p>
          </div>
        )
      },
      {
        title: "Supreme Court Ruling & AS 11 / AS 1 Accrual Alignment",
        content: (
          <div>
            <p><strong>Supreme Court Decision:</strong> The Supreme Court ruled in favor of the assessee. The court held that under the Accrual system of accounting (which is a fundamental assumption under AS 1 <PdfRefInline page={3} />), liabilities must be valued at the closing exchange rate at year-end in compliance with <span className="font-semibold text-slate-900 dark:text-white">AS 11</span>.</p>
            <p><strong>Accrual Alignment:</strong> The court confirmed that the translation loss is not notional, but is a real liability increase that must be recognized in the P&L to present a true and fair view of profits.</p>
          </div>
        )
      },
      {
        title: "Tax Adjustment, Journal Entries & Note 1 Disclosures",
        content: (
          <div>
            <p>The company must translate the foreign currency loan using the closing exchange rate and charge the loss to the P&L:</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-xs my-2">
              <strong>Journal Entry:</strong><br />
              Debit Foreign Exchange Translation Loss (P&L): ₹45,00,000 | Credit Foreign Currency Loan Account: ₹45,00,000
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl font-mono text-xs leading-relaxed my-2 whitespace-pre-line text-slate-800 dark:text-slate-200">
              <strong>Draft Note 1 Disclosure:</strong>
              "Note 1 (Foreign Currency Transactions): Transactions in foreign currencies are translated at the rate prevailing on the date of transaction. Outstanding foreign currency monetary liabilities at the balance sheet date are translated at the closing exchange rate. Resulting translation losses of ₹45 Lakhs have been recognized in the Profit & Loss statement in compliance with AS 11 and the Supreme Court ruling in CIT vs. Woodward Governor."
            </div>
          </div>
        )
      },
      {
        title: "Audit Compliance under CARO 2020 Clause 3(vii)",
        content: (
          <div>
            <p>The auditor must obtain the year-end RBI exchange rate notifications to verify translation rates. Reconcile foreign currency loans outstanding with bank balance confirmations. Verify that all translation gains and losses are accrued. Confirm tax computation schedules align with the Supreme Court precedent under Clause 3(vii) of CARO.</p>
          </div>
        )
      }
    ]
  },
  {
    id: "5-2",
    title: "Case 5.2: CIT vs. British Paints India Ltd. (SC [1991] 188 ITR 44)",
    category: "Landmark Judicial Case",
    panels: [
      {
        title: "Inventory Valuation Controversy (Prime Cost Method)",
        content: (
          <div>
            <p><strong>The Dispute:</strong> British Paints India Ltd valued its work-in-progress and finished goods inventories using the 'Prime Cost Method' (representing only raw materials and direct labor costs, excluding all manufacturing overheads). The company had followed this policy consistently for 15 years.</p>
            <p><strong>Tax Department Claim:</strong> The Income Tax Department rejected the valuation, arguing that excluding manufacturing overheads understates the cost of inventory, thereby understating taxable profits.</p>
          </div>
        )
      },
      {
        title: "Supreme Court Decision on Overheads Capitalization & AS 2",
        content: (
          <div>
            <p><strong>Supreme Court Decision:</strong> The Supreme Court ruled in favor of the Tax Department. The court held that inventory must be valued at the lower of cost and net realizable value, and 'cost' must include direct costs and allocated overheads in compliance with <span className="font-semibold text-slate-900 dark:text-white">AS 2</span>.</p>
            <p><strong>Consistency vs. True and Fair View:</strong> The court ruled that consistency is a fundamental assumption under AS 1 <PdfRefInline page={3} />, but it cannot justify the continued use of an incorrect accounting method that fails to present a true and fair view of profits. Overheads capitalization is mandatory.</p>
          </div>
        )
      },
      {
        title: "Accounting Adjustments & Inventory Note Disclosures",
        content: (
          <div>
            <p>The company must recalculate inventory to include overhead absorption and restate opening reserves:</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-xs my-2">
              <strong>Journal Entry:</strong><br />
              Debit Finished Goods Inventory (Overhead Cost): ₹68,00,000 | Credit Profit & Loss / Reserves: ₹68,00,000
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl font-mono text-xs leading-relaxed my-2 whitespace-pre-line text-slate-800 dark:text-slate-200">
              <strong>Draft Note 1 Disclosure:</strong>
              "Note 1 (Inventory Valuation): Inventories are valued at the lower of cost and net realizable value. Cost includes raw materials, direct labor, and an appropriate allocation of fixed and variable manufacturing overheads based on normal operating capacity. This policy has been revised from the prime cost method in compliance with AS 2 and the Supreme Court decision in British Paints, increasing closing inventory valuation by ₹68 Lakhs."
            </div>
          </div>
        )
      },
      {
        title: "Audit Verification of Overhead Absorption Costs",
        content: (
          <div>
            <p>The auditor must verify the overhead absorption sheets to confirm cost allocations to finished products. Reconcile inventory sheets under both FIFO and WAC to confirm calculations. Check board minutes approving the change and check disclosure completeness against book calculations under AS 1 and AS 2.</p>
          </div>
        )
      }
    ]
  },
  {
    id: "5-3",
    title: "Case 5.3: Challapalli Sugars Ltd. vs. CIT (SC [1975] 98 ITR 167)",
    category: "Landmark Judicial Case",
    panels: [
      {
        title: "Asset Acquisition Loan Interest Capitalization Dispute",
        content: (
          <div>
            <p><strong>The Dispute:</strong> Challapalli Sugars Ltd borrowed funds to acquire and install sugar manufacturing machinery. The company capitalized the interest on the borrowings accrued during the pre-production construction period into the cost of the machinery.</p>
            <p><strong>Tax Department Claim:</strong> The Income Tax Department disallowed the capitalization, arguing that interest is a revenue expense and should be charged to the P&L immediately, rather than added to the asset's depreciable base.</p>
          </div>
        )
      },
      {
        title: "Supreme Court Ruling on Pre-Production Borrowing Costs & AS 16",
        content: (
          <div>
            <p><strong>Supreme Court Decision:</strong> The Supreme Court ruled in favor of the assessee. The court held that the cost of an asset includes all expenditure necessary to bring the asset to its working condition for its intended use. Pre-production borrowing interest is a necessary cost of acquisition and must be capitalized.</p>
            <p><strong>AS 16 Alignment:</strong> This landmark ruling formed the basis for <span className="font-semibold text-slate-900 dark:text-white">AS 16</span> and <span className="font-semibold text-slate-900 dark:text-white">AS 10</span>, which mandate the capitalization of borrowing costs on qualifying assets during their active construction period, verifying substance over form under AS 1 <PdfRefInline page={6} />.</p>
          </div>
        )
      },
      {
        title: "Journal Entries & PPE Cost Accumulation Disclosures",
        content: (
          <div>
            <p>The company must capitalize the pre-production interest into the capital cost of the machinery:</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-xs my-2">
              <strong>Journal Entry:</strong><br />
              Debit Property, Plant & Equipment (Machinery): ₹12,00,000 | Credit Borrowing Costs (Pre-production Interest): ₹12,00,000
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl font-mono text-xs leading-relaxed my-2 whitespace-pre-line text-slate-800 dark:text-slate-200">
              <strong>Draft Note 1 Disclosure:</strong>
              "Note 1 (Capitalization of Borrowing Costs): Borrowing costs directly attributable to the acquisition, construction, or production of qualifying assets are capitalized as part of the cost of that asset. Capitalization ceases when the asset is substantially ready for its intended use. Pre-production interest of ₹12 Lakhs was capitalized during the year in compliance with AS 16 and the Challapalli Sugars Supreme Court precedent."
            </div>
          </div>
        )
      },
      {
        title: "Auditor Verification of Capitalization Cut-Off Date",
        content: (
          <div>
            <p>The auditor must verify the loan agreements and trace interest payment logs. Review the plant commissioning certificate to establish the exact capitalization cut-off date. Ensure that no interest is capitalized after commercial production began. Under CARO 2020, verify Clause 3(i) for fixed asset capitalization accuracy.</p>
          </div>
        )
      }
    ]
  }
];
