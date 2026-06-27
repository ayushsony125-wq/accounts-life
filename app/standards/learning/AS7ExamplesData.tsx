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
    title={`Open ICAI AS 7 PDF — Page ${page}`}
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
    id: 'illus-7-1',
    title: 'ICAI Illustration 1 — Fixed Price Contract Revenue Recognition (Percentage of Completion Method)',
    category: 'Official ICAI Illustration',
    pdfPage: 7,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Setu Builders Ltd. (FY 2023-24)</p>
            <p><strong>Contract Details:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Type of Contract: Fixed Price Construction of a Flyover</li>
              <li>Total Contract Price (Revenue): <strong>₹90,00,000</strong></li>
              <li>Initial Estimated Contract Costs: <strong>₹80,00,000</strong></li>
              <li>Actual Costs Incurred in Year 1: <strong>₹20,00,000</strong></li>
              <li>Estimated Remaining Costs to Complete: <strong>₹60,00,000</strong></li>
            </ul>
            <p className="mt-2 text-slate-600 dark:text-gray-300">The contractor needs to determine the stage of completion and calculate the revenue, expenses, and profit to be recognized in the Year 1 Statement of Profit &amp; Loss.</p>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div>
            <p>Step-by-step calculation using the Cost-to-Cost method:</p>
            <div className="space-y-3 mt-2 text-xs font-mono">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
                <p>1. Total Estimated Contract Cost:</p>
                <p>&nbsp;&nbsp;&nbsp;Costs Incurred (₹20,00,000) + Remaining Cost Estimate (₹60,00,000) = ₹80,00,000</p>
                <p>2. Stage of Completion (Percentage of Completion - POC):</p>
                <p>&nbsp;&nbsp;&nbsp;(Costs Incurred to Date / Total Estimated Cost) × 100</p>
                <p>&nbsp;&nbsp;&nbsp;= (₹20,00,000 / ₹80,00,000) × 100 = <strong>25%</strong></p>
                <p>3. Contract Revenue to be Recognized in Year 1:</p>
                <p>&nbsp;&nbsp;&nbsp;25% of Total Contract Price (₹90,00,000) = <strong>₹22,50,000</strong></p>
                <p>4. Contract Expenses to be Recognized in Year 1:</p>
                <p>&nbsp;&nbsp;&nbsp;Costs Incurred to Date = <strong>₹20,00,000</strong></p>
                <p>5. Net Profit to be Recognized in Year 1:</p>
                <p>&nbsp;&nbsp;&nbsp;Recognized Revenue (₹22,50,000) − Recognized Expense (₹20,00,000) = <strong>₹2,50,000</strong></p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: 'AS 7 Technical Analysis',
        content: (
          <div>
            <p>Under AS 7 (Para 21), contract revenue and contract costs associated with the construction contract should be recognized as revenue and expenses respectively by reference to the stage of completion of the contract activity at the reporting date (Percentage of Completion Method - POCM).</p>
            <p className="mt-2"><strong>Stage of Completion (Para 29):</strong> The stage of completion can be determined in various ways. Setu Builders used the **Cost-to-Cost method** (proportion of contract costs incurred for work performed to date to the estimated total contract costs). Only costs that reflect work performed are included in costs incurred to date.</p>
          </div>
        )
      },
      {
        title: 'Disclosure Requirements',
        content: (
          <div>
            <p><strong>Required Disclosures under Para 38:</strong></p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl font-mono text-xs leading-relaxed">
              - Amount of contract revenue recognized in the period: ₹22,50,000<br />
              - Method used to determine contract revenue: Percentage of Completion Method (Cost-to-Cost)<br />
              - Method used to determine stage of completion: Proportion of contract costs incurred to total estimated costs
            </div>
          </div>
        )
      }
    ],
    examFocus: "Be careful: Costs that relate to future activity on the contract (like unused materials delivered to site, pre-contract bid costs) must be excluded from the Cost-to-Cost computation. They should be classified as work-in-progress/inventories.",
    examFocusType: 'trap'
  },
  {
    id: 'illus-7-2',
    title: 'ICAI Illustration 2 — Contract with Expected Loss (Imminent Prudence Provision)',
    category: 'Official ICAI Illustration',
    pdfPage: 9,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Narmada Infra projects Ltd. (FY 2023-24)</p>
            <p><strong>Contract Details:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Total Contract Price (Revenue): <strong>₹1,20,00,000</strong></li>
              <li>Initial Estimated Contract Cost: <strong>₹1,00,00,000</strong></li>
              <li>Actual Costs Incurred in Year 1: <strong>₹65,00,000</strong></li>
              <li>Estimated Remaining Costs to Complete: <strong>₹65,00,000</strong></li>
            </ul>
            <p className="mt-3"><strong>The Shift:</strong> In Year 1, due to a global rise in steel and cement prices, the contractor revised the cost to complete to ₹65,00,000. This brings the total estimated contract cost to <strong>₹1,30,00,000</strong> (which exceeds the contract price of ₹1,20,00,000).</p>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div>
            <p>The calculation of revenue, expense, and the loss provision is done as follows:</p>
            <div className="space-y-3 mt-2 text-xs font-mono">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
                <p>1. Total Estimated Contract Cost:</p>
                <p>&nbsp;&nbsp;&nbsp;Costs Incurred (₹65,00,000) + Remaining Cost Estimate (₹65,00,000) = ₹1,30,00,000</p>
                <p>2. Expected Total Loss on Contract:</p>
                <p>&nbsp;&nbsp;&nbsp;Total Estimated Cost (₹1,30,00,000) − Contract Price (₹1,20,00,000) = <strong>₹10,00,000</strong></p>
                <p>3. Stage of Completion (POC):</p>
                <p>&nbsp;&nbsp;&nbsp;₹65,00,000 / ₹1,30,00,000 = <strong>50%</strong></p>
                <p>4. Revenue to be Recognized in Year 1 P&amp;L:</p>
                <p>&nbsp;&nbsp;&nbsp;50% of ₹1,20,00,000 = <strong>₹60,00,000</strong></p>
                <p>5. Expense to be Recognized in Year 1 P&amp;L:</p>
                <p>&nbsp;&nbsp;&nbsp;Actual Cost Incurred (₹65,00,000) + Expected Future Loss Provision (₹5,00,000) = <strong>₹70,00,000</strong></p>
                <p>6. Net Loss Recognized in Year 1 P&amp;L:</p>
                <p>&nbsp;&nbsp;&nbsp;Revenue (₹60,00,000) − Expense (₹70,00,000) = <strong>−₹10,00,000</strong></p>
              </div>
            </div>
            <p className="mt-2 text-slate-600 dark:text-gray-300">Notice that the **entire expected loss of ₹10,00,000** is recognized in Year 1, even though the contract is only 50% complete.</p>
          </div>
        )
      },
      {
        title: 'AS 7 Technical Analysis',
        content: (
          <div>
            <p>According to AS 7 (Para 35), when it is probable that total contract costs will exceed total contract revenue, the **expected loss should be recognized as an expense immediately**.</p>
            <p className="mt-2"><strong>The Prudence Rule:</strong> The amount of such a loss is determined irrespective of:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Whether or not work has commenced on the contract.</li>
              <li>The stage of completion of contract activity.</li>
              <li>The amount of profits expected to arise on other contracts which are not treated as a single construction contract (no set-off allowed!).</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Journal Postings & Note Disclosure',
        content: (
          <div>
            <p className="font-semibold text-xs mb-1">Journal Entries in Year 1:</p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl font-mono text-xs leading-relaxed mb-3">
              1. To record contract costs incurred:<br />
              &nbsp;&nbsp;&nbsp;Contract Work-in-Progress A/c ..... Dr. ₹65,00,000<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To Bank / Suppliers A/c ................................. ₹65,00,000<br />
              <br />
              2. To recognize revenue &amp; costs in P&amp;L:<br />
              &nbsp;&nbsp;&nbsp;Contract Expense A/c (P&amp;L) ......... Dr. ₹65,00,000<br />
              &nbsp;&nbsp;&nbsp;Contract Loss Provision A/c (P&amp;L) .. Dr. ₹5,00,000<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To Contract Revenue A/c (P&amp;L) ........................... ₹60,00,000<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To Provision for Expected Loss (Liability) ................. ₹5,00,000
            </div>
          </div>
        )
      }
    ],
    examFocus: "This is a recurring CA Intermediate exam question. Remember to write off the entire expected contract loss (contract cost minus contract revenue) immediately in the P&L. Do not split the loss across years.",
    examFocusType: 'trap'
  }
];

export const businessCases: CaseStudy[] = [
  {
    id: 'bus-7-1',
    title: 'Business Case 1 — Combining & Segmenting Construction Contracts: The Smart City Project',
    category: 'Commercial Contracting Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Urban Tech Builders Ltd. (contracted with Pune Smart City Development Corp.)</p>
            <p><strong>The Contract:</strong> A single master agreement signed for the construction of <strong>3 separate structures</strong> in Pune:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Building A: A Multi-level Parking Lot (Price: ₹15 Crores)</li>
              <li>Building B: A Public Library (Price: ₹10 Crores)</li>
              <li>Building C: A Waste Management Plant (Price: ₹25 Crores)</li>
            </ul>
            <p className="mt-2"><strong>Specific Terms:</strong> Separate design drawings were submitted for each structure. During negotiations, Pune Corp. had the option to reject Building B and proceed only with A and C. Separate price bids were submitted for each building.</p>
          </div>
        )
      },
      {
        title: 'Controversy & Core Issue',
        content: (
          <div>
            <p><strong>The Dispute:</strong> The company's CFO wants to treat the entire Smart City Project as a single construction contract (combining), because Building B is running in a loss of ₹2 Crores while A and C are highly profitable. Combining them would net out and hide the loss of Building B.</p>
            <p><strong>The Core Issue:</strong> Does the project meet the AS 7 criteria for segmenting or combining?</p>
          </div>
        )
      },
      {
        title: 'AS 7 Analysis & Rule',
        content: (
          <div>
            <p>Under AS 7 (Para 7), when a contract covers a number of assets, the construction of each asset should be treated as a **separate construction contract** (segmented) when:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-700 dark:text-slate-300">
              <li>Separate proposals have been submitted for each asset.</li>
              <li>Each asset has been subject to separate negotiation, and the contractor and customer have been able to accept or reject that part of the contract relating to each asset.</li>
              <li>The costs and revenues of each asset can be identified.</li>
            </ul>
            <p className="mt-3"><strong>Conclusion:</strong> All three criteria are met. Urban Tech Builders **must segment** the contract and treat Buildings A, B, and C as three separate contracts. The ₹2 Crore expected loss on Building B must be recognized in the P&amp;L immediately, and cannot be set off against A or C.</p>
          </div>
        )
      }
    ],
    examFocus: "Segmenting contracts is mandatory if the separate proposal, separate negotiation, and cost identification criteria are met. Combining is allowed only if the contracts are negotiated as a single package with closely interrelated assets executed in a continuous sequence.",
    examFocusType: 'focus'
  }
];

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-7-1',
    title: 'Audit Case Study 1 — NFRA Zenith Infrastructure Case: Overstatement of WIP and Delay in Loss Recognition',
    category: 'NFRA Audit Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Infrastructure Ltd. (FY 2021-22)</p>
            <p><strong>The Omission:</strong> Zenith was executing an express highway project. Due to delays in land acquisition by the government, the project costs ballooned by <strong>₹45,00,00,000</strong>. If included in estimated total cost, this would push the contract into a massive loss.</p>
            <p><strong>Company's Action:</strong> To avoid recognizing the loss, Zenith:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Did not update the "estimated total contract cost" in its calculations.</li>
              <li>Classified the ₹45 Crores cost overrun as "Unbilled Work-in-Progress (WIP)" asset, claiming they had filed an escalation claim with the government for reimbursement.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'NFRA Findings & AS 7 Violation',
        content: (
          <div>
            <p>NFRA investigated the contract files and noted the following violations of AS 7:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-700 dark:text-slate-300">
              <li><strong>Variation and Claims Recognition (Para 11):</strong> Variations/claims are included in contract revenue only when it is probable that the customer will approve them and the amount can be reliably measured. The government had not approved the claims; they were disputed. Therefore, they should not have been recognized as revenue or offset.</li>
              <li><strong>Omission of Loss Provision:</strong> Because the escalation claims were unapproved, the total estimated costs exceeded the revenue by ₹45 Crores. Zenith should have recognized this ₹45 Crore loss immediately under Para 35.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Auditor\'s Deficiencies & Action',
        content: (
          <div>
            <p><strong>Statutory Auditor Failure:</strong> The statutory auditor accepted the company's representation without inspecting the government's correspondence or validating the probability of the claim's approval. They failed to challenge the valuation of the Work-in-Progress asset.</p>
            <p className="mt-2 text-rose-600 dark:text-rose-400 font-semibold">Auditor Action Points:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1 text-xs">
              <li>Obtain legal confirmation on all material outstanding claims.</li>
              <li>Obtain the board minutes and customer approval logs to verify claim approval probability.</li>
              <li>Verify that the expected loss is provided for under AS 7 Para 35.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: "This NFRA case highlights that contractors cannot use unapproved or disputed claims to inflate estimated revenue and defer contract losses. Escalation claims must be omitted from revenue until formally approved by the client.",
    examFocusType: 'concept'
  }
];

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-7-1',
    title: 'Regulatory Observation 1 — SEBI Review on Construction Revenue Recognition and WIP Valuation',
    category: 'SEBI Advisory',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Focus Area:</strong> Real estate and infrastructure companies recognizing billing milestones as revenue directly, bypassing stage of completion calculations.</p>
            <p><strong>SEBI Findings:</strong> During inspection, SEBI observed that several listed construction companies were recognizing revenue based on **"Progress Billings"** (milestone bills raised on clients) rather than the actual percentage of work completed (POCM).</p>
          </div>
        )
      },
      {
        title: 'SEBI Directives & AS 7 Compliance',
        content: (
          <div>
            <p>Under AS 7 (Para 30), progress billings and advances received from customers do **not** reflect the work performed. They are financial milestones, not operational indicators.</p>
            <p className="mt-2"><strong>SEBI Mandate:</strong> Companies must determine the stage of completion by reference to actual physical surveys or costs incurred relative to total estimated costs. Billing milestones cannot dictate P&amp;L revenue. If billing exceeds POCM revenue, the excess must be shown as a liability ("Gross amount due to customers").</p>
          </div>
        )
      }
    ],
    examFocus: "Progress billings do not equal recognized revenue. In exam questions, look for actual costs incurred vs. total estimated costs to compute the POC percentage. Do not use bills raised to calculate revenue.",
    examFocusType: 'focus'
  }
];

export const judicialCases: CaseStudy[] = [
  {
    id: 'jud-7-1',
    title: 'Judicial Case 1 — Supreme Court Ruling on CIT vs. Hyundai Heavy Industries Co. Ltd.',
    category: 'Supreme Court Precedent',
    panels: [
      {
        title: 'The Tax Dispute',
        content: (
          <div>
            <p><strong>Entity:</strong> Hyundai Heavy Industries Co. Ltd. (Foreign Contractor)</p>
            <p><strong>The Transaction:</strong> Hyundai entered into a contract with ONGC for the design, fabrication, and installation of offshore platform facilities in India. Hyundai claimed that the design and fabrication work took place outside India (in South Korea) and was not taxable in India.</p>
            <p><strong>Tax Department Stand:</strong> The tax authority argued that since it was a single indivisible turnkey construction contract, the entire profit (including fabrication) is taxable in India as part of the installation Permanent Establishment (PE).</p>
          </div>
        )
      },
      {
        title: 'Supreme Court Decision',
        content: (
          <div>
            <p>The Supreme Court ruled on the divisibility of construction contracts for tax purposes:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Tax Divisibility:</strong> A turnkey construction contract can be segmented for tax purposes. Profits from fabrication outside India cannot be attributed to the Indian installation PE if the activities are distinct and prices are separately identifiable.</li>
              <li><strong>Accounting Linkage:</strong> This aligns with the AS 7 segmenting guidelines. If revenues and costs of design/fabrication are separate from installation, they can be accounted for and taxed separately.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: "Turnkey contracts are highly tested in tax laws. Always analyze whether the contract meets the divisibility/segmenting criteria under AS 7 for both accounting and tax attribution.",
    examFocusType: 'focus'
  }
];

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-7-1',
    title: 'Exam Corner 1 — Gross Amount Due From/To Customers: The Final Account Disclosures',
    category: 'Exam Corner',
    panels: [
      {
        title: 'The Exam Problem',
        content: (
          <div>
            <p><strong>Question:</strong> ABC Contractors Ltd. presents the following data for its first year of operation:</p>
            <ul className="list-disc pl-5 mt-1 space-y-0.5 text-xs font-mono">
              <li>Contract Price: ₹50,00,000</li>
              <li>Costs Incurred to Date: ₹18,00,000</li>
              <li>Estimated Cost to Complete: ₹22,00,000</li>
              <li>Progress Billings Raised: ₹20,00,000</li>
              <li>Advances Received from Customer: ₹5,00,000</li>
            </ul>
            <p className="mt-2 text-xs">Calculate the recognized revenue, profit, and the amount to be disclosed in the balance sheet under AS 7.</p>
          </div>
        )
      },
      {
        title: 'Model Answer & Technical Calculation',
        content: (
          <div>
            <div className="space-y-2 text-xs font-mono">
              <p>1. Total Estimated Cost: ₹18L + ₹22L = ₹40,00,000</p>
              <p>2. Stage of Completion (POC): ₹18L / ₹40L = 45%</p>
              <p>3. Recognized Revenue: 45% of ₹50L = ₹22,50,000</p>
              <p>4. Recognized Profit: ₹22.5L − ₹18L = ₹4,50,000</p>
              <p>5. Gross Amount Due from/to Customers:</p>
              <p>&nbsp;&nbsp;&nbsp;(Costs Incurred + Recognized Profits) − Progress Billings</p>
              <p>&nbsp;&nbsp;&nbsp;= (₹18,00,000 + ₹4,50,00,00) − ₹20,00,000</p>
              <p>&nbsp;&nbsp;&nbsp;= ₹22,50,000 − ₹20,00,000 = <strong>₹2,50,000 (Due from Customer - Asset)</strong></p>
            </div>
            <p className="mt-2 text-xs">The advance of ₹5,00,000 is shown separately as a liability. The Progress Billings are NOT shown on the face of P&amp;L; only the ₹22,50,000 POC revenue is shown.</p>
          </div>
        )
      }
    ],
    examFocus: "Remember: The formula for Gross Amount Due is `(Costs Incurred + Recognized Profits - Recognized Losses) - Progress Billings`. If the result is positive, it is an asset (Due from Customers). If negative, it is a liability (Due to Customers).",
    examFocusType: 'trick'
  }
];
