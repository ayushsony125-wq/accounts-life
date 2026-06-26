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
    title={`Open ICAI AS 5 PDF — Page ${page}`}
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
    id: 'illus-5-1',
    title: 'ICAI Illustration 1 — Material Prior Period Error: Inventory Cut-off & Sales Return',
    category: 'Official ICAI Illustration',
    pdfPage: 7,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Ganga Trading Ltd. (FY 2023-24)</p>
            <p><strong>Facts:</strong> During the financial year ended March 31, 2024, the internal audit team discovered that a batch of goods sold in March 2023 (FY 2022-23) for <strong>₹18,00,000</strong> (costing <strong>₹12,00,000</strong>) was returned by the customer on March 29, 2023.</p>
            <p><strong>The Error:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>The sales return was not recorded in the books of FY 2022-23.</li>
              <li>The physical stock of returned goods was excluded from the closing stock of March 31, 2023 (as they were kept in a separate transit warehouse).</li>
              <li>Consequently, the net profit of FY 2022-23 was overstated, and the closing inventory was understated.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div>
            <p>The impact of the error on the prior year's profits (FY 2022-23) is computed as follows:</p>
            <div className="space-y-3 mt-2 text-xs font-mono">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
                <p>Unrecorded Sales Return (Inflow Overstatement): ₹18,00,000</p>
                <p>Unrecorded Inventory Inward (Cost Overstatement): ₹12,00,000</p>
                <p>Net Overstatement of Profit: ₹18,00,000 − ₹12,00,000 = ₹6,00,000</p>
              </div>
            </div>
            <p className="mt-3">The opening reserves as of April 1, 2023 are overstated by ₹6,00,000 because of this cut-off error.</p>
          </div>
        )
      },
      {
        title: 'AS 5 Technical Analysis',
        content: (
          <div>
            <p>According to AS 5 (Para 3.5 and 15), prior period items are income or expenses which arise in the current period as a result of errors or omissions in the preparation of the financial statements of one or more prior periods.</p>
            <p className="mt-2"><strong>Indian GAAP (AS 5) Treatment:</strong></p>
            <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-700 dark:text-gray-300">
              <li>AS 5 requires that prior period items be **disclosed separately in the current year's Statement of Profit &amp; Loss** in a manner that their impact on current profit/loss can be clearly perceived.</li>
              <li>Therefore, the sales return of ₹18,00,000 and cost adjustments of ₹12,00,000 must be presented in the current P&amp;L of FY 2023-24, demarcated as "Prior Period Expenses/Income".</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Journal Postings & Note Disclosure',
        content: (
          <div>
            <p className="font-semibold text-xs mb-2">Adjusting Entry in FY 2023-24:</p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl font-mono text-xs leading-relaxed mb-3">
              Prior Period Sales Return A/c .................. Dr. ₹18,00,000<br />
              &nbsp;&nbsp;To Trade Receivables A/c .................................... ₹18,00,000<br />
              <br />
              Prior Period Stock Adjustment A/c (P&amp;L) ...... Dr. ₹12,00,000<br />
              &nbsp;&nbsp;To Opening Stock (Adjustment) .............................. ₹12,00,000
            </div>
            <p className="font-semibold text-xs mb-2">Draft Note to the Financial Statements:</p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl italic text-xs leading-relaxed text-slate-700 dark:text-slate-350">
              "During the current year, a prior period error relating to unrecorded sales returns of FY 2022-23 amounting to ₹18,00,000 was identified. The cost of corresponding inventory was ₹12,00,000. This has resulted in a prior period charge of ₹6,00,000 in the Statement of Profit and Loss for the year ended March 31, 2024. Prior period tax impact has been adjusted accordingly."
            </div>
          </div>
        )
      }
    ],
    examFocus: "Remember: Under AS 5, prior period items must be routed through the current year's Profit & Loss statement. You cannot bypass the P&L and adjust opening reserves directly. The error must be disclosed separately so the reader knows it belongs to a past period.",
    examFocusType: 'trap'
  },
  {
    id: 'illus-5-2',
    title: 'ICAI Illustration 2 — Change in Accounting Estimate: Reassessment of Useful Life (Yamuna Ports Ltd.)',
    category: 'Official ICAI Illustration',
    pdfPage: 9,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Yamuna Ports Ltd.</p>
            <p><strong>Asset Details:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Asset Type: Heavy Cargo Crane</li>
              <li>Date of Purchase: April 1, 2020</li>
              <li>Original Cost: ₹1,20,00,000</li>
              <li>Original Estimated Useful Life: **10 years**</li>
              <li>Depreciation Method: Straight-Line Method (SLM)</li>
              <li>Estimated Residual Value: Nil</li>
            </ul>
            <p className="mt-3"><strong>The Change:</strong> On April 1, 2023, the engineering team re-evaluated the crane and concluded that due to excessive usage, the remaining useful life is only **4 years** (total life = 7 years instead of 10).</p>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div>
            <p>The calculation of depreciation for current and future years is done prospectively:</p>
            <div className="space-y-3 mt-2 text-xs font-mono">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
                <p>1. Annual Depreciation for FY 2020-21, 2021-22, 2022-33 (3 years):</p>
                <p>&nbsp;&nbsp;&nbsp;₹1,20,00,000 / 10 years = ₹12,00,000 per year</p>
                <p>2. Accumulated Depreciation up to March 31, 2023:</p>
                <p>&nbsp;&nbsp;&nbsp;₹12,00,000 × 3 = ₹36,00,000</p>
                <p>3. Written Down Value (WDV) on April 1, 2023:</p>
                <p>&nbsp;&nbsp;&nbsp;₹1,20,00,000 − ₹36,00,000 = ₹84,00,000</p>
                <p>4. New Depreciation for FY 2023-24 onwards (Remaining Life = 4 years):</p>
                <p>&nbsp;&nbsp;&nbsp;₹84,00,000 / 4 years = <strong>₹21,00,000 per year</strong></p>
              </div>
            </div>
            <p className="mt-3">Due to the change in estimate, annual depreciation expense has increased by **₹9,00,000** (₹21,00,000 − ₹12,00,000) for current and future periods.</p>
          </div>
        )
      },
      {
        title: 'AS 5 Technical Analysis',
        content: (
          <div>
            <p>According to AS 5 (Para 20–25), the effect of a change in an accounting estimate should be included in the determination of net profit or loss in:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>The period of the change, if the change affects that period only.</li>
              <li>The period of the change and future periods, if the change affects both.</li>
            </ul>
            <p className="mt-2">Re-estimation of useful life of a crane is a classic **change in accounting estimate**. It does not qualify as a change in accounting policy. Therefore, it is applied **prospectively**. There is **no retrospective restatement** of depreciation of past years.</p>
          </div>
        )
      },
      {
        title: 'Disclosure Notes',
        content: (
          <div>
            <p><strong>Required Disclosure in Notes to Accounts (Para 25):</strong></p>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border rounded-xl italic text-xs leading-relaxed text-slate-700 dark:text-slate-350 mt-2">
              "During the financial year ended March 31, 2024, the Company reassessed the remaining useful life of its heavy cargo crane. Based on technical evaluation, the remaining useful life was revised from 7 years to 4 years. As a result of this change in accounting estimate, the depreciation charge for the current year is higher by ₹9,00,00, and the profit before tax is lower by the same amount. This revision will also increase the depreciation charge in future periods."
            </div>
          </div>
        )
      }
    ],
    examFocus: "A common exam trap is to recalculate depreciation retrospectively from the date of purchase. Remember that under AS 5 and AS 10 (Revised), changes in depreciation method or useful life are changes in estimates and are handled **prospectively**. Do not touch past year's depreciation figures.",
    examFocusType: 'trap'
  }
];

export const businessCases: CaseStudy[] = [
  {
    id: 'bus-5-1',
    title: 'Business Case 1 — Exceptional vs. Extraordinary Classification: Voluntary Retirement Scheme (VRS)',
    category: 'Corporate Restructuring Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Narmada Steels Ltd. (FY 2023-24)</p>
            <p><strong>Context:</strong> As part of a cost-rationalization and technological upgrade drive, the management decided to close down one of its old blast furnaces in April 2023.</p>
            <p><strong>Transactions:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Paid **₹4,20,00,000** as voluntary retirement scheme (VRS) compensation to 150 employees working at the blast furnace.</li>
              <li>Spent **₹1,80,00,000** on dismantling and decommissioning the blast furnace and cleaning the site.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Controversy & Core Issue',
        content: (
          <div>
            <p><strong>The Dispute:</strong> The accounts team proposed to classify the entire ₹6,00,00,000 restructuring cost as **"Extraordinary Items"** on the face of the P&amp;L, arguing that closing a blast furnace and introducing VRS are non-recurring, one-off events.</p>
            <p><strong>The Core Issue:</strong> Are restructuring and employee retirement compensation expenses extraordinary items under AS 5?</p>
          </div>
        )
      },
      {
        title: 'AS 5 Analysis & Classification',
        content: (
          <div>
            <p>According to AS 5 (Para 8–12), the classification is determined as follows:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-700 dark:text-slate-350">
              <li><strong>Extraordinary Items (Para 8):</strong> Must arise from events that are clearly distinct from ordinary activities. Restructuring, closure of plants, and paying employee compensation are *not* distinct from ordinary activities. They are regular management business decisions. Thus, they are **not** extraordinary items.</li>
              <li><strong>Exceptional Items (Para 12 - Ordinary Activities):</strong> When items of income or expense within ordinary activities are of such size, nature, or incidence that their disclosure is relevant to explain the performance, they must be disclosed separately. Restructuring and VRS fit this definition perfectly.</li>
            </ul>
            <p className="mt-2 text-emerald-600 dark:text-emerald-400 font-semibold">Correct Classification: Exceptional Items presented under Ordinary Activities (separately disclosed).</p>
          </div>
        )
      },
      {
        title: 'Financial Impact & Disclosures',
        content: (
          <div>
            <p>The ₹6,00,00,000 must be shown as a separate line item under "Expenses" in the Profit &amp; Loss Statement (titled "Exceptional Items — Restructuring &amp; VRS Costs").</p>
            <p className="mt-2"><strong>Required Note Disclosure:</strong></p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl italic text-xs leading-relaxed text-slate-750 dark:text-slate-350">
              "During the year ended March 31, 2024, the Company closed down its Surat blast furnace plant. Restructuring costs incurred during the year amounted to ₹6,00,00,000, comprising ₹4,20,00,000 towards employee voluntary retirement scheme (VRS) compensation and ₹1,80,00,000 towards plant dismantling and decommissioning costs. This has been disclosed as an exceptional item in the Statement of Profit and Loss."
            </div>
          </div>
        )
      }
    ],
    examFocus: "Voluntary Retirement Scheme (VRS) payments are a favorite test item. Never classify VRS or plant closures as extraordinary. They belong to ordinary activities but require separate disclosure (exceptional items) due to their size and nature.",
    examFocusType: 'focus'
  }
];

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-5-1',
    title: 'Audit Case Study 1 — NFRA Investigation on Omission of Prior Period Liabilities vs. Accounting Estimates',
    category: 'NFRA Audit Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Power Ltd. (FY 2023-24)</p>
            <p><strong>The Omission:</strong> In October 2023, the accounts team realized that the electricity transmission charges invoice for the quarter ended March 31, 2023, amounting to <strong>₹3,50,00,000</strong>, was omitted from the books of FY 2022-23.</p>
            <p><strong>Timeline of Bill:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>The invoice was generated by the transmission company on May 5, 2023.</li>
              <li>The financial statements of Zenith Power Ltd. for FY 2022-23 were approved by the Board on July 10, 2023.</li>
            </ul>
            <p className="mt-2"><strong>Company's Action:</strong> The company recorded the ₹3.5 Crores as a "Prior Period Charge" in P&amp;L of FY 2023-24. The statutory auditor signed off on it.</p>
          </div>
        )
      },
      {
        title: 'NFRA Observations & Omission Criteria',
        content: (
          <div>
            <p>The National Financial Reporting Authority (NFRA) audited the files and observed a major accounting failure:</p>
            <p className="mt-2"><strong>Omissions vs. Estimates:</strong> Under AS 5, prior period items arise from errors or omissions. However, the information (the bill) was received in May 2023, which was **before** the approval of the FY 2022-23 accounts in July 2023.</p>
            <p className="mt-2">Therefore, this was not an unavoidable post-year-end discovery, but a **negligent failure** to consider information that was available at the time of approving the prior period accounts. The auditor should have insisted on adjusting the FY 2022-23 accounts prior to approval.</p>
          </div>
        )
      },
      {
        title: 'Auditor\'s Deficiencies & Penalty',
        content: (
          <div>
            <p><strong>Auditor's Deficiency:</strong> The auditor failed to check the date of receipt of the bill and the date of Board approval. Signing off on a prior period item that could and should have been adjusted before finalization of the previous year's accounts constitutes professional misconduct.</p>
            <p className="mt-2"><strong>Remedial Practice:</strong> Auditors must maintain a "subsequent events" checklist and review all material invoices received between the balance sheet date and the date of signing the audit report, ensuring they are accrued in the correct year.</p>
          </div>
        )
      }
    ],
    examFocus: "This case highlights the difference between an error (which could have been avoided by using info available at approval time) and an unavoidable adjustment of estimate. NFRA holds auditors strictly accountable for allowing companies to clean up previous year's negligence through prior-period routing.",
    examFocusType: 'concept'
  }
];

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-5-1',
    title: 'Regulatory Observation 1 — MCA Review on Inappropriate Policy Changes to Overstate Profits',
    category: 'MCA Inquiry',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Krishna Infrastructure Ltd. (FY 2023-24)</p>
            <p><strong>The Transaction:</strong> The company decided to change its method of inventory valuation from **Weighted Average** to **FIFO** for the year ended March 31, 2024.</p>
            <p><strong>The Result:</strong> The change resulted in a higher inventory valuation at year-end by **₹1,20,00,000**, which directly reduced the Cost of Goods Sold and increased the Net Profit before tax by ₹1,20,00,000.</p>
          </div>
        )
      },
      {
        title: 'Regulatory & AS 5 Directives',
        content: (
          <div>
            <p>The Ministry of Corporate Affairs (MCA) flagged the transaction during an inspection of files. Under AS 5 (Para 29):</p>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 rounded text-xs leading-relaxed text-amber-800 dark:text-amber-200 my-3">
              "A change in an accounting policy should be made only if it is required by statute or for compliance with an accounting standard, or if it is considered that the change will result in a more appropriate presentation of the financial statements."
            </div>
            <p><strong>The Finding:</strong> The company changed the method solely to boost earnings to meet debt covenants. The company failed to demonstrate how FIFO resulted in a "more appropriate presentation". Also, the company did not quantify or disclose the change clearly in the notes.</p>
            <p className="mt-2"><strong>Action:</strong> The company was ordered to revert to the Weighted Average method or submit a detailed commercial justification demonstrating the appropriateness of the FIFO method.</p>
          </div>
        )
      }
    ],
    examFocus: "When accounting policy is changed, three things must be verified: compliance with law/standard or proof of 'more appropriate presentation'. If a change fails this test, it is a violation of AS 5 and leads to qualified audit reports.",
    examFocusType: 'focus'
  }
];

export const judicialCases: CaseStudy[] = [
  {
    id: 'jud-5-1',
    title: 'Judicial Case 1 — ITAT Ruling on Tax Deductibility of Prior Period Expenses ( Mercantile System)',
    category: 'ITAT Precedent',
    panels: [
      {
        title: 'The Dispute',
        content: (
          <div>
            <p><strong>Entity:</strong> Kaveri Papers Ltd. (FY 2023-24)</p>
            <p><strong>The Transaction:</strong> The company paid ₹25,00,000 in FY 2023-24 to settle an electricity tariff dispute relating to the years 2020 to 2022. The company presented this expense in its financial statements as "Prior Period Items" under AS 5.</p>
            <p><strong>Tax Disallowance:</strong> The Assessing Officer (AO) disallowed the ₹25,00,000 in the income tax assessment of FY 2023-24, stating that under the mercantile system of accounting, prior period expenses cannot be claimed in the current year.</p>
          </div>
        )
      },
      {
        title: 'ITAT Ruling & Solution',
        content: (
          <div>
            <p>The Income Tax Appellate Tribunal (ITAT) ruled in favor of the company, laying down the crystallization principle:</p>
            <p className="mt-2"><strong>Crystallization of Liability:</strong> If a prior period expense arises due to a dispute or negotiation that was finalized only in the current year, the liability **crystallizes** in the current year. Therefore, even though it represents a prior period item for accounting presentation under AS 5, it is a valid tax deduction in the year of crystallization.</p>
            <p className="mt-2"><strong>Tax vs. Accounting:</strong> Presentation as a prior period item under AS 5 does not automatically make the expense non-deductible for tax purposes. Auditors and CAs must analyze the date of crystallization of the liability.</p>
          </div>
        )
      }
    ],
    examFocus: "This is a vital linkage between accounting standards and tax audits. Prior period expenses are deductible for tax only in the year the liability gets finalized/crystallized. Disclosing them as prior period items under AS 5 is correct accounting, but tax deductibility requires proof of crystallization.",
    examFocusType: 'focus'
  }
];

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-5-1',
    title: 'Exam Corner 1 — Change in Depreciation Method: Policy vs. Estimate (The Syllabus Trap)',
    category: 'Exam Corner',
    panels: [
      {
        title: 'The Exam Problem',
        content: (
          <div>
            <p><strong>Question:</strong> A company has been depreciating its plant and machinery using the Written Down Value (WDV) method at 15% per annum. For the year ended March 31, 2024, the company decides to change the method of depreciation to Straight-Line Method (SLM) over a remaining useful life of 6 years. The WDV of the plant on April 1, 2023 was ₹45,00,000. Explain the accounting treatment under AS 5.</p>
          </div>
        )
      },
      {
        title: 'Model Answer & Technical Analysis',
        content: (
          <div>
            <p><strong>The Syllabus Trap:</strong> In older textbooks (governed by the withdrawn AS 6), a change in depreciation method was treated as a **change in accounting policy**, requiring retrospective calculation from the date of purchase and routing the difference through P&amp;L.</p>
            <p className="mt-2"><strong>Correct Treatment:</strong> Under **AS 10 (Revised)** and **AS 5**, a change in the depreciation method is treated as a **change in accounting estimate**. Therefore:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-xs font-mono">
              <li>No retrospective recalculation is allowed.</li>
              <li>The change is applied **prospectively**.</li>
              <li>New Depreciation = WDV on date of change / Remaining useful life</li>
              <li>New Depreciation = ₹45,00,000 / 6 years = ₹7,50,000 per year.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: "This is one of the most common mistakes students make in CA Intermediate. Make sure you treat the change in depreciation method as a prospective change in estimate under AS 5 and AS 10. Do not do retrospective workings.",
    examFocusType: 'trick'
  }
];
