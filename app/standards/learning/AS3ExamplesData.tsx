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
    title={`Open ICAI AS 3 PDF — Page ${page}`}
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
    id: 'illus-3-1',
    title: 'ICAI Illustration 1 — Cash flow Classification for Financial vs. Non-Financial Enterprises',
    category: 'Official ICAI Illustration',
    pdfPage: 12,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Context:</strong> As per AS 3, the classification of cash flows by operating, investing, and financing activities is crucial. Some transactions have different classifications depending on whether the entity is a financial or non-financial enterprise.</p>
            <p><strong>Transactions to Classify:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Interest paid on public deposits and bank loans.</li>
              <li>Interest received and Dividend received on investments.</li>
              <li>Dividend paid to equity shareholders.</li>
              <li>Purchase and sale of securities (shares, debentures) held as stock-in-trade.</li>
              <li>Loans and advances made to third parties and their subsequent recovery.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'AS 3 Analysis & Solution',
        content: (
          <div>
            <p>Under AS 3 (Para 15–17), the classifications are determined as follows:</p>
            <div className="overflow-x-auto my-3">
              <table className="w-full text-xs border-collapse border border-slate-200 dark:border-slate-800">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                    <th className="p-2 border border-slate-200 dark:border-slate-800 text-left">Transaction</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-800 text-left">Non-Financial Enterprise</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-800 text-left">Financial Enterprise (e.g. Bank / NBFC)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 font-semibold">Interest Paid</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-red-600 dark:text-red-400 font-semibold">Financing Activity</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-semibold">Operating Activity</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 font-semibold">Interest Received</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 font-semibold">Investing Activity</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-semibold">Operating Activity</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 font-semibold">Dividends Received</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 font-semibold">Investing Activity</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-semibold">Operating Activity (or Investing)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 font-semibold">Dividends Paid</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-red-600 dark:text-red-400 font-semibold">Financing Activity</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-red-600 dark:text-red-400 font-semibold">Financing Activity</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 font-semibold">Trade in Securities</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 font-semibold">Investing Activity (Investment)</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-semibold">Operating Activity (Stock-in-Trade)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 font-semibold">Loans/Advances Given</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 font-semibold">Investing Activity</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-semibold">Operating Activity</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      }
    ],
    examFocus: "This classification grid is a favorite in exams. Remember: For a financial enterprise, taking deposits and giving loans is its core business. Thus, interest paid, interest received, and security trading are classified under Operating. Dividend paid is always a Financing activity for both entities.",
    examFocusType: 'focus'
  },
  {
    id: 'illus-3-2',
    title: 'ICAI Illustration 2 — Direct Method Cash Flow Preparation (Ganges Ltd.)',
    category: 'Official ICAI Illustration',
    pdfPage: 14,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Ganges Ltd. (Non-Financial Company)</p>
            <p><strong>Income Statement Data for FY 2023-24:</strong></p>
            <ul className="list-disc pl-5 mt-1 space-y-0.5 text-xs font-mono">
              <li>Sales (Gross): ₹48,00,000 (all credit sales)</li>
              <li>Cost of Goods Sold: ₹32,00,000</li>
              <li>Depreciation (included in COGS): ₹3,00,000</li>
              <li>Administrative &amp; Selling Expenses: ₹8,00,000</li>
              <li>Interest Expense: ₹1,50,000</li>
              <li>Income Tax Paid: ₹2,00,000</li>
              <li>Net Profit after Tax: ₹4,50,000</li>
            </ul>
            <p className="mt-2"><strong>Working Capital Balances (Beginning vs. End of Year):</strong></p>
            <ul className="list-disc pl-5 mt-1 space-y-0.5 text-xs font-mono">
              <li>Trade Receivables: Opening ₹4,50,000 | Closing ₹6,20,000</li>
              <li>Inventories: Opening ₹6,00,000 | Closing ₹5,20,000</li>
              <li>Trade Payables: Opening ₹3,80,000 | Closing ₹4,40,000</li>
              <li>Outstanding Administrative Expenses: Opening ₹40,000 | Closing ₹20,000</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div>
            <p>Under the Direct Method (Para 18.1), we compute actual cash collections and payments:</p>
            <div className="space-y-3 mt-2 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
                <p className="font-bold text-slate-800 dark:text-slate-200">1. Cash Collected from Customers:</p>
                <p className="font-mono">Cash Collected = Sales + Decrease in Receivables (or − Increase)</p>
                <p className="font-mono">Cash Collected = ₹48,00,000 − (₹6,20,000 − ₹4,50,000) = ₹46,30,000</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
                <p className="font-bold text-slate-800 dark:text-slate-200">2. Cash Paid to Suppliers:</p>
                <p className="font-mono">Purchases = COGS (excluding depreciation) + Increase in Inventory (or − Decrease)</p>
                <p className="font-mono">Purchases = (₹32,00,000 − ₹3,00,000) − (₹6,00,000 − ₹5,20,000) = ₹28,20,000</p>
                <p className="font-mono">Cash Paid = Purchases + Decrease in Payables (or − Increase)</p>
                <p className="font-mono">Cash Paid = ₹28,20,000 − (₹4,40,000 − ₹3,80,000) = ₹27,60,000</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
                <p className="font-bold text-slate-800 dark:text-slate-200">3. Cash Paid for Operating Expenses:</p>
                <p className="font-mono">Cash Paid = Admin/Selling Expenses + Decrease in Outstanding Expenses (or − Increase)</p>
                <p className="font-mono">Cash Paid = ₹8,00,000 + (₹40,000 − ₹20,000) = ₹8,20,000</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: 'Draft Cash Flow Statement (Direct)',
        content: (
          <div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl font-mono text-xs leading-relaxed">
              <strong>Operating Cash Flows (Direct Method):</strong><br />
              Cash receipts from customers: ₹46,30,000<br />
              Cash paid to suppliers: (₹27,60,000)<br />
              Cash paid for operating expenses: (₹8,20,000)<br />
              ───────────────────────────────────────<br />
              Cash Generated from Operations: ₹10,50,000<br />
              Income Tax Paid: (₹2,00,000)<br />
              ───────────────────────────────────────<br />
              <strong>Net Cash from Operating Activities: ₹8,50,000</strong>
            </div>
          </div>
        )
      }
    ],
    examFocus: "Direct Method presents actual cash inflows and outflows. A common exam mistake is failing to exclude depreciation from COGS before calculating purchases and cash payments to suppliers. Always deduct non-cash expenses like depreciation from COGS first.",
    examFocusType: 'trap'
  },
  {
    id: 'illus-3-3',
    title: 'ICAI Illustration 3 — Indirect Method Cash Flow Preparation (Narmada Ltd.)',
    category: 'Official ICAI Illustration',
    pdfPage: 17,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Narmada Ltd. (using the same transaction and working capital balances as Ganges Ltd. in Illustration 2).</p>
            <p><strong>Objective:</strong> Reconcile Net Profit Before Tax (NPBT) to Net Cash Flow from Operating Activities using the Indirect Method (Para 18.2).</p>
            <p><strong>Data Recap:</strong></p>
            <ul className="list-disc pl-5 mt-1 space-y-0.5 text-xs font-mono">
              <li>Net Profit after Tax: ₹4,50,000</li>
              <li>Income Tax Paid (and provision made): ₹2,00,000</li>
              <li>Interest Expense (financing cost): ₹1,50,000</li>
              <li>Depreciation (non-cash): ₹3,00,000</li>
              <li>Increase in Receivables: ₹1,70,000</li>
              <li>Decrease in Inventories: ₹80,000</li>
              <li>Increase in Payables: ₹60,000</li>
              <li>Decrease in Outstanding Expenses: ₹20,000</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Reconciling Steps & Working',
        content: (
          <div>
            <p>Under the Indirect Method, we adjust Net Profit before Tax for non-cash and non-operating items:</p>
            <div className="overflow-x-auto my-2 text-xs">
              <table className="w-full border-collapse border border-slate-200 dark:border-slate-800">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                    <th className="p-2 border border-slate-200 dark:border-slate-800 text-left">Adjustment Step</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-800 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                  <tr>
                    <td className="p-2 border border-slate-200">Net Profit after Tax</td>
                    <td className="p-2 border border-slate-200 text-right">4,50,000</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-200">Add: Income Tax Provision</td>
                    <td className="p-2 border border-slate-200 text-right">2,00,000</td>
                  </tr>
                  <tr className="bg-blue-50/20 dark:bg-blue-950/10">
                    <td className="p-2 border border-slate-200 font-semibold">Net Profit before Tax &amp; Extraordinary Items</td>
                    <td className="p-2 border border-slate-200 text-right font-bold">6,50,000</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-200">Add: Non-Cash Depreciation</td>
                    <td className="p-2 border border-slate-200 text-right">3,00,000</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-200">Add: Interest Expense (classified as Financing)</td>
                    <td className="p-2 border border-slate-200 text-right">1,50,000</td>
                  </tr>
                  <tr className="bg-blue-50/20 dark:bg-blue-950/10">
                    <td className="p-2 border border-slate-200 font-semibold">Operating Profit before Working Capital Changes</td>
                    <td className="p-2 border border-slate-200 text-right font-bold">11,00,000</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-200">Less: Increase in Trade Receivables</td>
                    <td className="p-2 border border-slate-200 text-right">(1,70,000)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-200">Add: Decrease in Inventories</td>
                    <td className="p-2 border border-slate-200 text-right">80,000</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-200">Add: Increase in Trade Payables</td>
                    <td className="p-2 border border-slate-200 text-right">60,000</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-200">Less: Decrease in Outstanding Expenses</td>
                    <td className="p-2 border border-slate-200 text-right">(20,000)</td>
                  </tr>
                  <tr className="bg-teal-50/20 dark:bg-teal-950/10">
                    <td className="p-2 border border-slate-200 font-semibold">Cash Generated from Operations</td>
                    <td className="p-2 border border-slate-200 text-right font-bold">10,50,000</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-200">Less: Income Tax Paid</td>
                    <td className="p-2 border border-slate-200 text-right">(2,00,000)</td>
                  </tr>
                  <tr className="bg-emerald-50/30 dark:bg-emerald-950/25">
                    <td className="p-2 border border-slate-200 font-semibold text-emerald-800 dark:text-emerald-400">Net Cash Flow from Operating Activities</td>
                    <td className="p-2 border border-slate-200 text-right font-bold text-emerald-800 dark:text-emerald-400">8,50,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      }
    ],
    examFocus: "Under the Indirect Method, you start with Net Profit before Tax. Interest expense is added back because it is a financing outflow (it will be shown as an outflow under financing activities). Similarly, working capital changes must be adjusted: add asset decreases / liability increases, deduct asset increases / liability decreases.",
    examFocusType: 'concept'
  }
];

export const businessCases: CaseStudy[] = [
  {
    id: 'bcase-3-1',
    title: 'Working Capital Cycle Expansion & Operating Cash Burn',
    category: 'Cash Flow Analysis',
    panels: [
      {
        title: 'Business Context & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> GrowthTech Retail Ltd. experiences a 40% year-on-year sales growth, reporting a record net profit of ₹5,00,00,000. However, the company's bank balance decreases from ₹1,20,00,000 to ₹10,00,000.</p>
            <p><strong>The Operational Reality:</strong></p>
            <ul className="list-disc pl-5 mt-1 space-y-1 text-xs">
              <li>To achieve high sales, the company offered liberal credit terms, causing trade receivables to jump from ₹80,00,000 to ₹6,50,00,000.</li>
              <li>To meet potential demand, closing inventory was built up from ₹1,00,00,000 to ₹3,80,00,000.</li>
              <li>Trade payables increased from ₹60,00,000 to ₹2,10,00,000.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Cash Flow Analysis & Impact',
        content: (
          <div>
            <p><strong>Operating Cash Flow Reconciliation (Indirect):</strong></p>
            <ul className="list-disc pl-5 mt-1 space-y-1 text-xs font-mono">
              <li>Net Profit: + ₹5,00,00,000</li>
              <li>Less: Increase in Trade Receivables: − ₹5,70,00,000 (Cash locked in credit)</li>
              <li>Less: Increase in Inventory: − ₹2,80,00,000 (Cash locked in warehouses)</li>
              <li>Add: Increase in Trade Payables: + ₹1,50,00,000 (Cash preserved by delaying suppliers)</li>
              <li><strong>Net Operating Cash Flow: − ₹2,00,00,000 (Operating Cash Burn)</strong></li>
            </ul>
            <p className="mt-2 text-red-650 dark:text-red-400 font-bold">Conclusion:</p>
            <p>Despite high profitability, the company is facing a cash crunch because its profits are trapped in working capital. This illustrates why profitable companies can go bankrupt due to poor cash flow management.</p>
          </div>
        )
      }
    ],
    examFocus: "This is a classic real-world business case. Operating cash flow can be negative even when net profit is highly positive. Receivables and inventory expansions are cash outflows, which can exceed net profits during high-growth periods.",
    examFocusType: 'concept'
  }
];

export const auditCases: CaseStudy[] = [
  {
    id: 'acase-3-1',
    title: 'Audit Case Study — Misclassification of Operating Cash Flows (NFRA Observation)',
    category: 'Audit & Compliance',
    panels: [
      {
        title: 'Facts & Regulatory Action',
        content: (
          <div>
            <p><strong>Subject:</strong> Zenith Infrastructure Ltd. (FY 2022-23 Audit Review by NFRA)</p>
            <p><strong>The Finding:</strong> NFRA observed that Zenith Infrastructure had classified <strong>₹180 crore of interest paid</strong> on project-specific borrowings as an **Operating Cash Flow** (arguing that interest is capitalizable under AS 16 as part of project cost, and the project represents operational stock-in-trade).</p>
            <p><strong>Auditor Position:</strong> The statutory auditors accepted the client's treatment, agreeing that since the interest was capitalized into project WIP, it should follow the inventory cost classification (Operating Activity).</p>
          </div>
        )
      },
      {
        title: 'NFRA Ruling & Accounting Treatment',
        content: (
          <div>
            <p><strong>NFRA Decision:</strong> The classification was ruled as a material misstatement of the Cash Flow Statement. AS 3, Para 17 explicitly requires interest paid to be classified as a **Financing Activity** for non-financial enterprises, regardless of whether the interest is capitalized under AS 16 or expensed to P&amp;L.</p>
            <p><strong>Audit Implications:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Misclassifying financing outflows as operating outflows artificially inflates the **Cash Flow from Operations (CFO)**, misleading lenders and investors.</li>
              <li>The auditor was penalized for failing to verify compliance with AS 3 classification rules and accepting an incorrect accounting policy.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: "Critical Audit Point: Classification of interest paid is independent of its capitalization status under AS 16. For a non-financial enterprise, interest paid MUST always be shown under Financing Activities. Capitalization only changes the balance sheet representation of cost, not the cash flow classification.",
    examFocusType: 'trap'
  }
];

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-3-1',
    title: 'MCA Observation — Verification of Cash and Cash Equivalents',
    category: 'Regulatory Observation',
    panels: [
      {
        title: 'The Observation & Issues',
        content: (
          <div>
            <p><strong>Context:</strong> During inspection of financial statements, the Ministry of Corporate Affairs (MCA) noticed that several entities included **restricted deposits** (such as margin money accounts with banks against bank guarantees, or debt service reserve accounts with maturities of more than 3 months) in Cash and Cash Equivalents in the Cash Flow Statement.</p>
            <p><strong>Why this is wrong:</strong> Under AS 3 (Para 5), cash equivalents are held for the purpose of meeting short-term cash commitments rather than for investment or other purposes. For an investment to qualify as a cash equivalent, it must be readily convertible to a known amount of cash and be subject to an insignificant risk of changes in value. Restricting the use of deposits for loan margins disqualifies them from being cash equivalents.</p>
          </div>
        )
      },
      {
        title: 'Correct Disclosure Guidance',
        content: (
          <div>
            <p><strong>Required Presentation:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Restricted bank deposits must be excluded from Cash and Cash Equivalents and classified under bank balances other than cash and cash equivalents.</li>
              <li>The cash flow statement must reconcile the closing balance of Cash and Cash Equivalents with the matching balance sheet cash line items, explicitly showing the exclusion of margin deposits.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: "Any deposit with restriction (such as margin money or lien marked deposits) or maturity exceeding 3 months from acquisition date must NOT be classified as Cash Equivalents in the Cash Flow Statement. They are shown under investing outflows if purchased, or as reconciling items in the footnotes.",
    examFocusType: 'concept'
  }
];

export const judicialCases: CaseStudy[] = [
  {
    id: 'jcase-3-1',
    title: 'CIT v. Woodward Governor India Pvt. Ltd. — Unrealised Forex Gains & Cash Flows',
    category: 'Landmark Judicial Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Case Reference:</strong> Supreme Court of India — CIT v. Woodward Governor India Pvt. Ltd.</p>
            <p><strong>The dispute:</strong> The company had foreign currency bank accounts and outstanding trade liabilities. At the year-end, the company translated these liabilities and cash balances at the closing exchange rate, resulting in unrealised exchange loss. The tax authority disputed the deduction of unrealised forex loss, claiming it was not a cash transaction.</p>
          </div>
        )
      },
      {
        title: 'The Ruling & Cash Flow Treatment',
        content: (
          <div>
            <p><strong>The Ruling:</strong> The Supreme Court held that the translation of foreign currency assets and liabilities at the closing rate is a statutory requirement under accounting standards (AS 11) and represents an accrued loss, which is tax-deductible.</p>
            <p><strong>AS 3 Application:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Unrealised exchange gains and losses are **non-cash items**.</li>
              <li>In preparing the Cash Flow Statement (Indirect Method), any unrealised exchange loss/gain debited/credited to the P&amp;L must be **added back / deducted** to arrive at Operating Cash Flow.</li>
              <li>The effect of exchange rate changes on cash and cash equivalents held in foreign currency is reported separately in the cash flow statement to reconcile beginning and ending cash balances (Para 27).</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: "Unrealised forex translation gains/losses are non-cash adjustments. E.g. Dr translation loss in P&L is added back in Operating Cash Flows (Indirect) and the net exchange effect on cash held is reported as a separate line at the bottom of the statement.",
    examFocusType: 'concept'
  }
];

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-3-1',
    title: 'Exam Trap — Treatment of Dividend Tax & Capital expenditure acquisitions',
    category: 'Exam Corner',
    panels: [
      {
        title: 'The Trick Scenario',
        content: (
          <div>
            <p><strong>Question Details:</strong> An enterprise purchases a machine costing ₹10,00,000. The payment terms are:</p>
            <ul className="list-disc pl-5 mt-1 space-y-0.5 text-xs">
              <li>Down payment made in cash: ₹2,00,000</li>
              <li>Balance ₹8,00,000 paid by issuing 80,000 equity shares of ₹10 each to the machinery vendor.</li>
            </ul>
            <p className="mt-2 font-bold">The Trap: How does this appear in the Cash Flow Statement?</p>
          </div>
        )
      },
      {
        title: 'Correct Exam Solution',
        content: (
          <div>
            <p><strong>Accounting Treatment under AS 3 (Para 40):</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs">
              <li>The issue of shares for machinery is a **Non-Cash Transaction**.</li>
              <li>Only the cash down payment of **₹2,00,000** must be shown as an outflow under **Investing Activities** (Purchase of Machinery).</li>
              <li>The ₹8,00,000 share issue must NOT be shown as financing inflow or investing outflow in the cash flow statement. It must be disclosed in the Notes to Accounts as a non-cash investing/financing transaction.</li>
            </ul>
            <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/60 text-red-650 dark:text-red-400 rounded-xl mt-2 font-bold">
              Common exam trap: Students show ₹10,00,000 outflow in investing and ₹8,00,000 inflow in financing. This is WRONG and violates Para 40.
            </div>
          </div>
        )
      }
    ],
    examFocus: "Always check if the purchase of asset involves cash. Only the cash portion belongs in the Cash Flow Statement. Non-cash exchange components must be omitted from the cash flow statement and disclosed in notes.",
    examFocusType: 'trap'
  }
];
