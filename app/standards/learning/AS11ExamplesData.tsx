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
    title={`Open ICAI AS 11 PDF — Page ${page}`}
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
    id: 'illus-11-1',
    title: 'ICAI Illustration 1 — Import of Machinery & Exchange Difference (Monetary vs Non-Monetary Classification)',
    category: 'Official ICAI Illustration',
    pdfPage: 6,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Bharat Heavy Industries Ltd. (FY 2023-24)</p>
            <p><strong>Transaction:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Item Imported: Special manufacturing equipment from USA</li>
              <li>Date of Invoice: <strong>15th January 2024</strong></li>
              <li>Purchase Price: <strong>$10,000</strong></li>
              <li>Spot rate on transaction date (15 Jan 2024): <strong>$1 = ₹80</strong></li>
              <li>Reporting Date (31st March 2024) spot rate: <strong>$1 = ₹82</strong> (creditor is unpaid)</li>
              <li>Settlement Date (15th April 2024) spot rate: <strong>$1 = ₹81</strong></li>
            </ul>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div>
            <p>Step-by-step revaluation of monetary creditor and fixed asset:</p>
            <div className="space-y-3 mt-2 text-xs font-mono">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
                <p>1. Initial Recognition (15 Jan 2024):</p>
                <p>&nbsp;&nbsp;&nbsp;Machinery cost = $10,000 × ₹80 = <strong>₹8,00,000</strong></p>
                <p>&nbsp;&nbsp;&nbsp;Creditor balance = $10,000 × ₹80 = <strong>₹8,00,000</strong></p>
                <p>2. Balance Sheet Date Translation (31 March 2024):</p>
                <p>&nbsp;&nbsp;&nbsp;Machinery value: Remains locked at cost of <strong>₹8,00,000</strong> (Non-monetary asset)</p>
                <p>&nbsp;&nbsp;&nbsp;Creditor revalued: $10,000 × ₹82 = <strong>₹8,20,000</strong> (Monetary item revalued at closing rate)</p>
                <p>&nbsp;&nbsp;&nbsp;Exchange Difference Loss = ₹8,20,000 − ₹8,00,000 = <strong>₹20,000 Loss</strong> (charged to P&amp;L)</p>
                <p>3. Settlement Revaluation (15 April 2024):</p>
                <p>&nbsp;&nbsp;&nbsp;Payment amount: $10,000 × ₹81 = <strong>₹8,10,000</strong></p>
                <p>&nbsp;&nbsp;&nbsp;Exchange Difference Gain on settlement = ₹8,20,000 (carrying amt) − ₹8,10,000 (payment) = <strong>₹10,000 Gain</strong> (credited to P&amp;L)</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: 'AS 11 Technical Analysis',
        content: (
          <div>
            <p>Under AS 11 (Para 7), a **monetary item** is money held and assets/liabilities to be received or paid in fixed or determinable amounts of money. Since trade payables represent a liability to pay a fixed amount of USD, they are monetary items.</p>
            <p className="mt-2"><strong>Reporting Rules (Para 11):</strong></p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Monetary items should be reported using the **closing rate** ($1 = ₹82).</li>
              <li>Non-monetary items (Machinery) carried at historical cost should be reported using the exchange rate at the **date of the transaction** ($1 = ₹80). Do NOT change the value of the machinery on the balance sheet due to exchange rate changes!</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Journal Postings',
        content: (
          <div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl font-mono text-xs leading-relaxed">
              <strong>1. Date: 15-01-2024 (Initial Recognition)</strong><br />
              &nbsp;&nbsp;&nbsp;Machinery A/c ............... Dr. ₹8,00,000<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To Foreign Supplier A/c .......................... ₹8,00,000<br />
              <br />
              <strong>2. Date: 31-03-2024 (Balance Sheet Date)</strong><br />
              &nbsp;&nbsp;&nbsp;Foreign Exchange Loss A/c (P&amp;L) .. Dr. ₹20,000<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To Foreign Supplier A/c .......................... ₹20,000<br />
              <br />
              <strong>3. Date: 15-04-2024 (Settlement)</strong><br />
              &nbsp;&nbsp;&nbsp;Foreign Supplier A/c ......... Dr. ₹8,20,000<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To Bank A/c ..................................... ₹8,10,000<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To Foreign Exchange Gain A/c (P&amp;L) .............. ₹10,000
            </div>
          </div>
        )
      }
    ],
    examFocus: "A common mistake is to capitalize the ₹20,000 exchange loss to the cost of the machinery. Under standard AS 11 rules, all exchange differences on short-term trade liabilities must go to the Statement of Profit & Loss, not to the asset.",
    examFocusType: 'trap'
  },
  {
    id: 'illus-11-2',
    title: 'ICAI Illustration 2 — Translation of Integral vs Non-Integral Foreign Operations (Singapore Branch)',
    category: 'Official ICAI Illustration',
    pdfPage: 12,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Bharat Export Corp. has a branch in Singapore. The functional currency of the branch is SGD ($). The branch needs to translate its accounts into Indian Rupees (₹) for consolidation.</p>
            <p><strong>Branch Classification Options:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-700 dark:text-slate-350">
              <li><strong>Integral Foreign Operation (IFO):</strong> The branch conducts business as if it were an extension of the Indian parent company (e.g. importing goods from parent and selling locally, transferring proceeds back).</li>
              <li><strong>Non-Integral Foreign Operation (NIFO):</strong> The branch operates autonomously, accumulating cash, raising loans, and executing local contracts in Singapore Dollar independently.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Translation Rules Comparison',
        content: (
          <div className="overflow-x-auto text-[11px] sm:text-xs">
            <table className="w-full border-collapse border border-slate-200 dark:border-slate-800">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  <th className="p-2 border text-left">Item Type</th>
                  <th className="p-2 border text-left">Integral Operation (IFO)</th>
                  <th className="p-2 border text-left">Non-Integral Operation (NIFO)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border font-bold">Fixed Assets</td>
                  <td className="p-2 border">Historical Rate (date of purchase)</td>
                  <td className="p-2 border">Closing Rate (at Balance Sheet date)</td>
                </tr>
                <tr className="bg-slate-50/50 dark:bg-slate-900/10">
                  <td className="p-2 border font-bold">Depreciation</td>
                  <td className="p-2 border">Translated at rate on date of FA purchase</td>
                  <td className="p-2 border">Average Rate during the year</td>
                </tr>
                <tr>
                  <td className="p-2 border font-bold">Monetary Assets/Liabilities</td>
                  <td className="p-2 border">Closing Rate</td>
                  <td className="p-2 border">Closing Rate</td>
                </tr>
                <tr className="bg-slate-50/50 dark:bg-slate-900/10">
                  <td className="p-2 border font-bold">Revenues &amp; Expenses</td>
                  <td className="p-2 border">Average Rate / Transaction Date Rate</td>
                  <td className="p-2 border">Average Rate / Transaction Date Rate</td>
                </tr>
                <tr>
                  <td className="p-2 border font-bold">Exchange Difference</td>
                  <td className="p-2 border text-red-655 font-semibold">Recognized in P&amp;L immediately</td>
                  <td className="p-2 border text-green-655 font-semibold">Accumulated in Equity (FCTR)</td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      },
      {
        title: 'AS 11 Technical Analysis',
        content: (
          <div>
            <p>Under AS 11 (Para 24), when classifying a foreign operation:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>IFO:</strong> The change in exchange rates affects the individual assets and liabilities of the reporting enterprise directly. Thus, the exchange difference is taken directly to P&amp;L.</li>
              <li><strong>NIFO:</strong> The parent company has no direct cash flow impact from exchange changes except on net investment liquidation. Thus, the exchange difference is deferred under **Foreign Currency Translation Reserve (FCTR)** in equity until the disposal of the investment.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: "Identify whether the operation is Integral or Non-Integral first. If IFO, translate fixed assets and depreciation using the transaction date rate. If NIFO, translate fixed assets at the closing rate and depreciation at the average rate.",
    examFocusType: 'focus'
  }
];

export const businessCases: CaseStudy[] = [
  {
    id: 'bus-11-1',
    title: 'Business Case 1 — Forward Exchange Hedging Contracts (Amortisation of Premium/Discount)',
    category: 'Commercial Hedging Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Bharat Exports Ltd. (FY 2023-24)</p>
            <p><strong>The Transaction:</strong> The company expects to receive **$50,000** from a US customer on 30th June 2024. To hedge its risk against USD depreciation, on 1st April 2024, Bharat enters into a **3-month Forward Exchange Contract** to sell $50,000 at a forward rate of **$1 = ₹83**.</p>
            <p><strong>Spot Rates:</strong></p>
            <ul className="list-disc pl-5 mt-1 space-y-0.5">
              <li>Spot Rate on 1st April 2024: <strong>$1 = ₹81</strong></li>
              <li>Spot Rate on 30th June 2024 (Settlement): <strong>$1 = ₹82.50</strong></li>
            </ul>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div>
            <div className="space-y-3 mt-2 text-xs font-mono">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
                <p>1. Forward Premium calculation:</p>
                <p>&nbsp;&nbsp;&nbsp;Forward Rate (₹83) − Spot Rate (₹81) = ₹2.00 per USD</p>
                <p>&nbsp;&nbsp;&nbsp;Total Premium = $50,000 × ₹2.00 = <strong>₹1,00,000</strong></p>
                <p>2. Amortisation of Premium:</p>
                <p>&nbsp;&nbsp;&nbsp;The contract spans 3 months (April, May, June). The ₹1,00,000 premium represents the cost of the hedge and must be recognized in the P&amp;L over the 3-month contract life.</p>
                <p>&nbsp;&nbsp;&nbsp;Monthly Amortisation = ₹1,00,000 / 3 months = <strong>₹33,333 per month</strong></p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: 'AS 11 Accounting Rule',
        content: (
          <div>
            <p>According to AS 11 (Para 36), for forward contracts intended for hedging purposes (not speculation):</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>The difference between the forward rate and the spot rate at the inception of the contract (premium/discount) should be **amortized as expense or income** over the life of the contract.</li>
              <li>Any profit or loss arising on the settlement or revaluation of such contract must be recognized in the Statement of Profit and Loss in the period in which it arises.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: "Speculative forward contracts are accounted for differently: they are revalued to fair value at each balance sheet date, and the entire change is recognized in P&L immediately without premium amortization.",
    examFocusType: 'trick'
  }
];

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-11-1',
    title: 'Audit Case Study 1 — NFRA Zenith Forex Case: Abuse of Para 46A Capitalization Option',
    category: 'NFRA Audit Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Projects &amp; Infrastructure Ltd. (FY 2022-23)</p>
            <p><strong>The Practice:</strong> Zenith had outstanding short-term trade payables of **$15,000,000** for steel imports, falling due in 90 days. Due to rupee depreciation, the company suffered an exchange loss of **₹12 Crores** on this liability.</p>
            <p><strong>Company's Action:</strong> Zenith capitalized the entire ₹12 Crores exchange loss into the cost of its under-construction power plant project, citing **AS 11 Para 46A** (Long-term Foreign Currency Monetary Items - LTFCMI).</p>
          </div>
        )
      },
      {
        title: 'NFRA Findings & Deficiencies',
        content: (
          <div>
            <p>NFRA investigated the capitalization and identified the following violations:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-700 dark:text-slate-350">
              <li><strong>Para 46A Restriction:</strong> The option to capitalize or defer exchange differences under Para 46/46A is **restricted solely to Long-Term Foreign Currency Monetary Items (LTFCMI)**.</li>
              <li><strong>LTFCMI Definition:</strong> An item is long-term only if it has a maturity period of **12 months or more** from the date of inception.</li>
              <li><strong>Violation:</strong> Trade payables with a 90-day maturity are short-term liabilities. They do not qualify as LTFCMIs. Capitalizing their exchange loss is a serious misstatement, violating AS 11.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Audit Checklist for Forex Liabilities',
        content: (
          <div>
            <p className="font-semibold text-xs mb-1">Auditor Action Points:</p>
            <ul className="list-disc pl-5 text-xs space-y-1">
              <li>Obtain foreign currency liability schedules with their original maturities.</li>
              <li>Verify that only liabilities with inception-to-maturity of 12+ months are treated as LTFCMI.</li>
              <li>Ensure all trade credit and short-term debt exchange fluctuations are routed directly to the P&amp;L.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: "This is a key regulatory trap. Remember that trade payables/debtors are short-term and their exchange differences must always go to the P&L. They can never be capitalized under Para 46/46A.",
    examFocusType: 'trap'
  }
];

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-11-1',
    title: 'Regulatory Observation 1 — MCA clarification on Exchange Differences as borrowing costs',
    category: 'MCA Circular',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>The Conflict:</strong> When a company borrows foreign currency (e.g. USD) at a lower interest rate, rupee depreciation causes an exchange loss. Companies were confused about whether this exchange loss should be treated as an exchange difference under AS 11 or as a borrowing cost under AS 16.</p>
          </div>
        )
      },
      {
        title: 'MCA Clarification & Rule',
        content: (
          <div>
            <p>The Ministry of Corporate Affairs (MCA) clarified the boundary between AS 11 and AS 16:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Exchange difference on foreign currency borrowings is treated as a borrowing cost **only to the extent** that it represents an adjustment to the interest rate differential.</li>
              <li>Any excess exchange loss beyond the interest rate differential is recognized as an exchange difference under **AS 11** and cannot be capitalized as borrowing cost under AS 16.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: "Always check if there is an AS 16 interest adjustment calculation in the question. Any amount of exchange loss that exceeds the difference between foreign interest and local interest must be charged to P&L under AS 11.",
    examFocusType: 'focus'
  },
  {
    id: 'reg-11-2',
    title: 'Regulatory Observation 2 — SEBI & NFRA Review: Misclassification of Foreign Operations',
    category: 'Regulatory Observations',
    panels: [
      {
        title: 'Classification Boundary',
        content: (
          <div>
            <p><strong>The Issue:</strong> Companies often classify foreign branches or subsidiaries as **Non-Integral Foreign Operations** (NIFO) because translation differences for NIFOs are accumulated in the **Foreign Currency Translation Reserve (FCTR)** within Equity, thereby protecting the current P&amp;L from forex volatility.</p>
          </div>
        )
      },
      {
        title: 'Integral vs Non-Integral Criteria',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Under AS 11, a foreign operation is **Integral** if it carries on business as if it were an extension of the parent company's operations (e.g. selling goods imported from the parent and remitting proceeds back). It is **Non-Integral** if it operates with a significant degree of autonomy (e.g. raising local finance, local purchase, local sales).</p>
            <p className="mt-2 text-amber-600 font-semibold font-mono">SEBI warned that treating an dependent marketing branch that relies entirely on parent inventory and financing as NIFO to avoid booking losses in the P&amp;L violates AS 11. Such branches must be treated as Integral, and all translation gains/losses must route to P&amp;L.</p>
          </div>
        )
      }
    ],
    examFocus: 'The key test for Integral classification is whether the foreign operation relies directly on parent cash flows and operations for its daily functioning.',
    examFocusType: 'concept'
  }
];

export const judicialCases: CaseStudy[] = [
  {
    id: 'jud-11-1',
    title: 'Judicial Case 1 — Landmark Ruling: Woodward Governor India Ltd. (Tax Deductibility of Unsettled Forex Losses)',
    category: 'Supreme Court Precedent',
    panels: [
      {
        title: 'The Tax Controversy',
        content: (
          <div>
            <p><strong>The Dispute:</strong> The company revalued its foreign currency loans at the closing rate of the balance sheet date as required by AS 11, resulting in a loss. The company claimed this unrealized exchange loss as a tax-deductible business expense.</p>
            <p><strong>Revenue Stand:</strong> The Income Tax Department rejected the claim, arguing that the loss was "notional" and "unrealized" since the loan had not been settled yet.</p>
          </div>
        )
      },
      {
        title: 'Supreme Court Decision',
        content: (
          <div>
            <p>The Supreme Court ruled in favor of the taxpayer, establishing a crucial precedent:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Tax Treatment:</strong> Unrealized exchange losses arising from the revaluation of outstanding monetary liabilities at the year-end (per AS 11) are **allowable business expenses** under Section 37(1) of the Income Tax Act.</li>
              <li><strong>Accounting Alignment:</strong> The court recognized that financial statements prepared in accordance with ICAI accounting standards reflect a "true and fair view" and should not be altered for tax purposes unless explicitly prohibited.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: "This case is highly relevant for both advanced accounting and direct tax exams. Unrealized exchange differences on revenue accounts are fully deductible, while those on capital accounts affect asset costs.",
    examFocusType: 'focus'
  },
  {
    id: 'jud-11-2',
    title: 'Judicial Case 2 — CIT vs. Tata Iron & Steel Co. Ltd. (Cost of Capital Asset acquired in Foreign Currency)',
    category: 'Supreme Court Precedent',
    panels: [
      {
        title: 'The Capital Asset Issue',
        content: (
          <div>
            <p><strong>Scenario:</strong> The company imported plant and machinery using foreign currency loans. Due to fluctuations in foreign exchange rates before the loans were fully repaid, the rupee cost of repayment changed.</p>
            <p className="mt-2">The company adjusted the cost of the asset and claimed additional depreciation under Section 43A of the Income Tax Act, which was disputed by the department.</p>
          </div>
        )
      },
      {
        title: 'Supreme Court Verdict & Section 43A',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The Supreme Court held that the actual cost of a capital asset is the amount of rupees actually paid/payable to acquire it. Section 43A mandates adjusting the cost of the asset in the year when there is a change in the liability in foreign currency.</p>
            <p className="mt-2">Under AS 11, if Paragraph 46/46A is selected, companies capitalize these capital monetary items' exchange differences to the cost of the asset (or depreciable asset block). Otherwise, they go to the P&amp;L (or FCMITDA for non-depreciable assets).</p>
          </div>
        )
      }
    ],
    examFocus: 'Section 43A of the Income Tax Act only allows adjustment of capital assets on ACTUAL PAYMENT basis, whereas AS 11 requires year-end accrual adjustment.',
    examFocusType: 'trap'
  }
];

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-11-1',
    title: 'Exam Corner 1 — Calculating Net Exchange Gain/Loss & Balance Sheet Reporting',
    category: 'Exam Corner',
    panels: [
      {
        title: 'The Exam Problem',
        content: (
          <div>
            <p><strong>Question:</strong> XYZ Ltd. has the following foreign currency items outstanding on 31st March 2024:</p>
            <ul className="list-disc pl-5 mt-1 space-y-0.5 text-xs font-mono">
              <li>Trade Debtors: $20,000 (recorded at $1 = ₹78)</li>
              <li>Long-term Bank Loan: $50,000 (recorded at $1 = ₹82)</li>
              <li>Investment in US shares (Non-monetary): $5,000 (recorded at $1 = ₹75)</li>
            </ul>
            <p className="mt-2 text-xs">The closing rate on 31st March 2024 is $1 = ₹80. Compute the net exchange gain/loss to be recognized in the P&amp;L under AS 11.</p>
          </div>
        )
      },
      {
        title: 'Model Answer & Calculations',
        content: (
          <div>
            <div className="space-y-2 text-xs font-mono">
              <p>1. Trade Debtors (Monetary Asset):</p>
              <p>&nbsp;&nbsp;&nbsp;Carrying Value: $20,000 × ₹78 = ₹15,60,000</p>
              <p>&nbsp;&nbsp;&nbsp;Closing Value: $20,000 × ₹80 = ₹16,00,000</p>
              <p>&nbsp;&nbsp;&nbsp;Exchange Gain = ₹16,00,000 − ₹15,60,000 = <strong>₹40,000 Gain</strong></p>
              <p>2. Long-term Bank Loan (Monetary Liability):</p>
              <p>&nbsp;&nbsp;&nbsp;Carrying Value: $50,000 × ₹82 = ₹41,00,000</p>
              <p>&nbsp;&nbsp;&nbsp;Closing Value: $50,000 × ₹80 = ₹40,00,000</p>
              <p>&nbsp;&nbsp;&nbsp;Exchange Gain = ₹41,00,000 − ₹40,00,000 = <strong>₹1,00,000 Gain</strong> (Liability decreased)</p>
              <p>3. US Share Investment (Non-monetary asset):</p>
              <p>&nbsp;&nbsp;&nbsp;No revaluation is done. It remains at cost = <strong>$5,000 × ₹75 = ₹3,75,000</strong></p>
              <p>4. Net Gain recognized in P&amp;L = ₹40,000 + ₹1,00,000 = <strong>₹1,40,000 Credit to P&amp;L</strong></p>
            </div>
          </div>
        )
      }
    ],
    examFocus: "Be careful: Do not revalue the equity shares at the closing rate. Non-monetary assets carried at cost must never be revalued under AS 11.",
    examFocusType: 'trick'
  },
  {
    id: 'exam-11-2',
    title: 'Exam Corner 2 — Foreign Branch Trial Balance Translation Rules (NIFO)',
    category: 'Exam Corner',
    panels: [
      {
        title: 'Translation Rate Guide',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>For a **Non-Integral Foreign Operation (NIFO)** branch, translate as follows:</p>
            <table className="min-w-full border text-left">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  <th className="p-1 border">Item Category</th>
                  <th className="p-1 border">Rate to Use</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-1 border font-semibold">All Assets (Fixed &amp; Current)</td>
                  <td className="p-1 border font-mono">Closing Rate</td>
                </tr>
                <tr>
                  <td className="p-1 border font-semibold">All Liabilities (Short &amp; Long term)</td>
                  <td className="p-1 border font-mono">Closing Rate</td>
                </tr>
                <tr>
                  <td className="p-1 border font-semibold">Income and Expenses</td>
                  <td className="p-1 border font-mono">Average Rate (during the year)</td>
                </tr>
                <tr>
                  <td className="p-1 border font-semibold">Head Office Account</td>
                  <td className="p-1 border">Actual HO Book Balance</td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      },
      {
        title: 'Trial Balance Balance Adjustment',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>After translating all debit and credit balances, the trial balance will not balance.</p>
            <p>1. If total debits exceed credits: Credit the difference to **Foreign Currency Translation Reserve (FCTR)**.</p>
            <p>2. If total credits exceed debits: Debit the difference to **Foreign Currency Translation Reserve (FCTR)**.</p>
            <p className="mt-1 font-semibold text-blue-600">The FCTR is presented under Reserves &amp; Surplus in the Balance Sheet. It does not hit the Profit &amp; Loss account.</p>
          </div>
        )
      }
    ],
    examFocus: 'For Integral branch, non-monetary assets (PPE) are translated at historical rate, whereas NIFO translates them at closing rate. This is the main exam distinction.',
    examFocusType: 'concept'
  }
];
