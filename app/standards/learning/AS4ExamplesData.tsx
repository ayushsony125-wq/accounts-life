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
    title={`Open ICAI AS 4 PDF — Page ${page}`}
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
    id: 'illus-4-1',
    title: 'ICAI Illustration 1 — Debtor Insolvency & Impairment Confirmation (Adjusting Event)',
    category: 'Official ICAI Illustration',
    pdfPage: 8,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Context:</strong> As of the Balance Sheet date (March 31, 2024), Ganges Tradecorp Ltd. has an outstanding trade receivable of <strong>₹15,00,000</strong> from one of its major distributors, Apex Retailers Ltd.</p>
            <p><strong>Chronology of Events:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>March 31, 2024:</strong> Balance sheet date. Debt is outstanding; no formal notifications of default are received.</li>
              <li><strong>April 18, 2024:</strong> Apex Retailers Ltd. suffers a sudden liquidity freeze due to a primary warehouse collapse.</li>
              <li><strong>April 29, 2024:</strong> Apex Retailers Ltd. files for bankruptcy.</li>
              <li><strong>May 15, 2024:</strong> The official liquidator sends a legal notice confirming that Apex is in liquidation, and creditors can expect a recovery of only **15%** of their outstanding claims.</li>
              <li><strong>July 12, 2024:</strong> The Board of Directors of Ganges Tradecorp Ltd. approves the financial statements for FY 2023-24.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div>
            <p>The calculation of the required write-down or provision as of March 31, 2024 is as follows:</p>
            <div className="space-y-3 mt-2 text-xs font-mono">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
                <p>Outstanding Receivable: ₹15,00,000</p>
                <p>Estimated Recovery (15%): ₹15,00,000 × 0.15 = ₹2,25,000</p>
                <p>Expected Bad Debt Loss: ₹15,00,000 − ₹2,25,000 = ₹12,75,000</p>
              </div>
            </div>
            <p className="mt-3">Ganges Tradecorp Ltd. must recognize a provision or write-off of **₹12,75,000** in the Statement of Profit &amp; Loss for the year ended March 31, 2024.</p>
          </div>
        )
      },
      {
        title: 'AS 4 Technical Analysis',
        content: (
          <div>
            <p><strong>Is it an Adjusting Event?</strong> Yes.</p>
            <p className="mt-2">According to AS 4 (Para 3.2 and 8.1), events occurring after the balance sheet date that provide additional evidence to assist the estimation of amounts relating to conditions existing at the balance sheet date are adjusting events.</p>
            <p className="mt-2">The insolvency of a debtor shortly after the balance sheet date is usually an adjusting event because the financial condition of the debtor was already deteriorating and existed as of March 31, 2024. The subsequent bankruptcy merely confirms and quantifies the impairment of the asset.</p>
          </div>
        )
      },
      {
        title: 'Journal Postings',
        content: (
          <div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl font-mono text-xs leading-relaxed">
              <strong>Journal Entry in the Books of Ganges Tradecorp Ltd. (Dated March 31, 2024):</strong><br />
              <br />
              Bad Debts / Provision for Doubtful Debts A/c ..... Dr. ₹12,75,000<br />
              &nbsp;&nbsp;To Trade Receivables / Provision A/c ..................... ₹12,75,000<br />
              <br />
              <em>(Being provision made for estimated bad debts of Apex Retailers Ltd. based on liquidator's notification received post year-end under AS 4)</em>
            </div>
          </div>
        )
      },
      {
        title: 'Auditor\'s Perspective',
        content: (
          <div>
            <p><strong>Key Audit Procedures:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Verify the liquidation notification from the official liquidator dated May 15, 2024.</li>
              <li>Examine the subsequent collections, if any, to verify the actual recovery percentage.</li>
              <li>Review the ageing of receivables at year-end to check if there were indicators of delay or distress as of March 31, 2024.</li>
              <li>Ensure the write-down is adjusted in the balance sheet figures of Trade Receivables and not merely disclosed in the notes.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: "Bankruptcy after year-end is one of the most common adjusting events tested in CA exams. The trap is to classify it as non-adjusting because the filing happened in April. Always check if the debtor existed at year-end; if yes, the bankruptcy is an adjusting event.",
    examFocusType: 'trap'
  },
  {
    id: 'illus-4-2',
    title: 'ICAI Illustration 2 — Material Fire Accident post Year-End (Non-Adjusting Event)',
    category: 'Official ICAI Illustration',
    pdfPage: 9,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Narmada Textiles Ltd. (Manufacturing Company)</p>
            <p><strong>The Incident:</strong> On April 15, 2024 (two weeks after the balance sheet date of March 31, 2024), a massive electrical fire broke out in the main textile factory.</p>
            <p><strong>Financial Details:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Book value of Plant &amp; Machinery destroyed: ₹2,50,00,000</li>
              <li>Book value of raw material and finished stock destroyed: ₹80,00,000</li>
              <li>Total asset destruction: ₹3,30,00,000</li>
              <li>Insurance claim admitted by the surveyor in June 2024: ₹1,80,00,000</li>
              <li>Financial Statements approved by the Board of Directors: August 14, 2024</li>
            </ul>
          </div>
        )
      },
      {
        title: 'AS 4 Technical Analysis',
        content: (
          <div>
            <p>According to AS 4 (Para 8.2 and 14), events indicative of conditions that arose after the balance sheet date are <strong>non-adjusting events</strong>.</p>
            <p className="mt-2">The fire occurred on April 15, 2024. This condition did not exist at the balance sheet date of March 31, 2024. Thus, the carrying value of the plant, machinery, and inventory as of March 31, 2024 must **not** be adjusted for the fire loss.</p>
            <p className="mt-2">However, because the event is highly material and significantly affects the future operations of the company, disclosure is required in the **Report of the Approving Authority (Board\'s Report)**.</p>
          </div>
        )
      },
      {
        title: 'Financial Statement Disclosure',
        content: (
          <div>
            <p><strong>No adjustment is made in the Balance Sheet or P&amp;L as of March 31, 2024.</strong></p>
            <p className="mt-3 font-semibold text-slate-800 dark:text-slate-200">Required Disclosure in the Board of Directors\' Report for FY 2023-24:</p>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border rounded-xl italic text-xs leading-relaxed text-slate-700 dark:text-slate-350 mt-3">
              "On April 15, 2024, a fire destroyed the main manufacturing facility of the Company at Surat. The total book value of plant, machinery, and inventory destroyed is estimated at ₹3,30,0,000. The Company has lodged an insurance claim, and the insurance company has subsequently admitted a claim of ₹1,80,0,000, resulting in an estimated net loss of ₹1,50,00,000. Since this fire occurred after the balance sheet date, no adjustments have been made to the assets or liabilities in the financial statements for the year ended March 31, 2024."
            </div>
          </div>
        )
      },
      {
        title: 'Auditor\'s Perspective',
        content: (
          <div>
            <p><strong>Auditor Verification Steps:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Inspect the internal incident logs, fire department reports (FIR), and surveyor notes to verify the date of the fire.</li>
              <li>Verify the book values of the destroyed assets against the Fixed Asset Register and inventory registers as of March 31, 2024.</li>
              <li>Check the correspondence with the insurance company and verify the claim admission letter of ₹1,80,0,000.</li>
              <li>Confirm that the assets are not written down in the current year\'s financial statements, but are properly disclosed in the Board\'s Report.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: "Destruction of assets after the balance sheet date is a classic non-adjusting event. Do not make any adjustment to year-end accounts. However, you must state that it requires disclosure in the Board\'s Report, including the nature of the event and the financial impact.",
    examFocusType: 'focus'
  }
];

export const businessCases: CaseStudy[] = [
  {
    id: 'bus-4-1',
    title: 'Business Case 1 — Board Recommendation & Treatment of Proposed Dividends (Revised AS 4)',
    category: 'Corporate Finance Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Godavari Power Ltd. (Listed Utility Company)</p>
            <p><strong>Facts:</strong> For the financial year ended March 31, 2024, the company recorded a Net Profit of <strong>₹8,50,00,000</strong>.</p>
            <p><strong>Proposed Dividend:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>On May 18, 2024, the Board of Directors proposed a final dividend of **12%** on the paid-up equity share capital of ₹5,00,00,000 (total dividend = **₹60,00,000**).</li>
              <li>The financial statements were approved by the Board on June 10, 2024.</li>
              <li>The Annual General Meeting (AGM) to approve the dividend is scheduled for September 20, 2024.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Revised AS 4 Accounting Rule',
        content: (
          <div>
            <p>Prior to the MCA amendment in 2016, proposed dividends were recognized as a liability and provision in the year to which they related. However, under the <strong>Revised AS 4</strong>:</p>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 rounded text-xs leading-relaxed text-amber-800 dark:text-amber-200 my-3">
              <strong>Paragraph 14:</strong> "If dividends are declared after the balance sheet date, such dividends should not be recognized as a liability at the balance sheet date unless a statute requires otherwise. Such dividends should be disclosed in the notes."
            </div>
            <p><strong>Rationale:</strong> The Board\'s recommendation does not create a constructive or legal obligation on March 31, 2024, as the shareholders have the right to approve, decrease, or reject the dividend at the AGM. The obligation only arises when it is approved in the AGM.</p>
          </div>
        )
      },
      {
        title: 'Disclosure in Notes',
        content: (
          <div>
            <p><strong>No liability is recorded in the balance sheet.</strong> The proposed dividend is disclosed in the **Notes to Accounts** as follows:</p>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border rounded-xl font-mono text-xs leading-relaxed text-slate-700 dark:text-slate-350 mt-3">
              <strong>Note X: Proposed Dividend</strong><br />
              The Board of Directors has proposed a dividend of 12% (₹1.2 per share) on equity shares of face value ₹10 each for the year ended March 31, 2024. The total dividend outflow will be ₹60,00,000. This proposed dividend is subject to approval by the shareholders in the ensuing Annual General Meeting and has not been recognized as a liability in these financial statements.
            </div>
          </div>
        )
      }
    ],
    examFocus: "This is a critical syllabus change. Many older textbook solutions show proposed dividend as a liability. In exams, you must treat it as a non-adjusting event, omit it from liabilities, and show it as a note disclosure.",
    examFocusType: 'trap'
  }
];

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-4-1',
    title: 'Audit Case Study 1 — NFRA Zenith Infra Audit Case on Going Concern Failure & Adjusting Events',
    category: 'NFRA Audit Investigation',
    pdfPage: 13,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Infrastructure Ltd. (FY 2023-24)</p>
            <p><strong>Context:</strong> The company had been experiencing persistent cash flow issues, delays in projects, and working capital blockages.</p>
            <p><strong>Timeline of Post Balance Sheet Events:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>March 31, 2024:</strong> Balance sheet date. Net worth is low but going concern is assumed.</li>
              <li><strong>May 12, 2024:</strong> Primary banker recalls credit facilities worth ₹50 Crores, citing breach of covenants.</li>
              <li><strong>May 28, 2024:</strong> Main client terminates a railway project representing 80% of Zenith\'s order book.</li>
              <li><strong>June 15, 2024:</strong> Zenith fails to pay employee salaries and statutory dues.</li>
              <li><strong>July 25, 2024:</strong> Date of approval of financial statements by the Board.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'The Going Concern Override',
        content: (
          <div>
            <p>Normally, contract terminations and loan recalls occurring after the balance sheet date are non-adjusting events. However, **Paragraph 13** of AS 4 provides a mandatory override:</p>
            <div className="p-3 bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 rounded text-xs leading-relaxed text-red-800 dark:text-red-200 my-3">
              "Assets and liabilities should be adjusted for events occurring after the balance sheet date that ... indicate that the going concern assumption in relation to the whole or a part of the enterprise is not appropriate."
            </div>
            <p><strong>Audit Finding:</strong> The cumulative events (loan recall + project loss + payroll default) indicate that Zenith\'s going concern assumption has failed. The company **must prepare** its financial statements on a **liquidation basis** (realisable values) rather than historical cost.</p>
          </div>
        )
      },
      {
        title: 'Auditor\'s Implications',
        content: (
          <div>
            <p>If management refuses to adjust the financial statements and insists on preparing them on a going-concern basis, the auditor must:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Issue an **Adverse Audit Opinion** expressing that the financial statements do not give a true and fair view.</li>
              <li>Verify that assets have been written down to their net realizable value (NRV) and liabilities are measured at their settlement amounts.</li>
              <li>Detail the going concern assessment failure in the audit report under the "Material Uncertainty Related to Going Concern" section (if adjusted with adequate disclosures) or issue an adverse opinion (if not adjusted).</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: "Going concern is the ultimate exception in AS 4. If a non-adjusting event (like a fire or contract loss) destroys the viability of the company before the accounts are approved, it automatically becomes an adjusting event. The entire financial statement must be redrawn on a liquidation basis.",
    examFocusType: 'adjustment'
  }
];

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-4-1',
    title: 'Regulatory Observation 1 — MCA Review on Bank Moratorium & Cash Balance Impairment',
    category: 'Regulatory Observation',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Krishna Auto Components Ltd. (FY 2023-24)</p>
            <p><strong>Facts:</strong> On March 31, 2024, the company holds **₹4,00,00,000** in a fixed deposit and current account with Pioneer Co-operative Bank.</p>
            <p><strong>Post Balance Sheet Event:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>On April 8, 2024, the Reserve Bank of India (RBI) places Pioneer Co-operative Bank under moratorium due to high NPAs and liquidity run. Withdrawals are restricted to ₹50,000 per depositor.</li>
              <li>The financial statements are approved on June 15, 2024.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'MCA Accounting Directive',
        content: (
          <div>
            <p>The Ministry of Corporate Affairs (MCA) noted that companies with cash stuck in banks under moratorium often fail to recognize the impairment of cash balances at the balance sheet date, claiming that the bank was functioning as of March 31.</p>
            <p className="mt-2"><strong>AS 4 Analysis:</strong> The moratorium is an adjusting event. The bank\'s financial distress and high NPAs existed *prior* to March 31, 2024. The RBI intervention shortly after the year-end is the formal confirmation of this pre-existing condition.</p>
            <p className="mt-2"><strong>Required Action:</strong> The cash balance must be classified as \"Restricted Cash\" (not cash and cash equivalents) and written down to its estimated recoverable amount, or a provision for loss must be recognized in the P&amp;L.</p>
          </div>
        )
      }
    ],
    examFocus: "Cash balances are normally assumed to be risk-free. However, if a bank collapse occurs after year-end, it confirms a pre-existing condition of bank distress, and under AS 4, the cash must be tested for impairment and reclassified as restricted assets.",
    examFocusType: 'concept'
  }
];

export const judicialCases: CaseStudy[] = [
  {
    id: 'jud-4-1',
    title: 'Judicial Case 1 — Supreme Court Precedent on Retrospective Tax Liability Confirmation (Kaveri Ltd.)',
    category: 'Judicial Precedent',
    panels: [
      {
        title: 'The Legal Dispute',
        content: (
          <div>
            <p><strong>Entity:</strong> Kaveri Ltd. (FY 2023-24)</p>
            <p><strong>Issue:</strong> Kaveri Ltd. was in litigation with the Sales Tax department regarding sales tax applicability on packaging materials for the past 5 years. Total disputed demand was <strong>₹45,00,000</strong>.</p>
            <p><strong>Status as of March 31, 2024:</strong> The company had not made any provision, disclosing the demand as a Contingent Liability in the notes, based on legal advice that their position was strong.</p>
          </div>
        )
      },
      {
        title: 'The Court Ruling',
        content: (
          <div>
            <p><strong>Timeline of Judicial Order:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>April 22, 2024:</strong> The Supreme Court dismisses the appeal of Kaveri Ltd. and rules in favor of the Sales Tax department, upholding the retrospective demand of ₹45,00,000.</li>
              <li><strong>May 30, 2024:</strong> Financial statements of Kaveri Ltd. are approved by the Board.</li>
            </ul>
            <p className="mt-3"><strong>SC Ruling Impact under AS 4:</strong> The legal dispute existed at the balance sheet date. The Supreme Court ruling provides additional evidence and confirms the existence of the liability as of March 31, 2024. Therefore, this is an **adjusting event**.</p>
          </div>
        )
      },
      {
        title: 'Accounting Adjustment & Journal Entries',
        content: (
          <div>
            <p>Kaveri Ltd. must adjust its books and record the provision in FY 2023-24:</p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl font-mono text-xs leading-relaxed mt-2">
              <strong>Journal Entry (Dated March 31, 2024):</strong><br />
              <br />
              Prior Period / Tax Expense A/c .............. Dr. ₹45,00,000<br />
              &nbsp;&nbsp;To Provision for Sales Tax Dispute A/c .................. ₹45,00,000<br />
              <br />
              <em>(Being provision made for sales tax liability confirmed by the Supreme Court order dated April 22, 2024 under AS 4)</em>
            </div>
          </div>
        )
      }
    ],
    examFocus: "Court decisions after the balance sheet date are adjusting events if they confirm a liability that was already being litigated or existed as a dispute before year-end. The prompt is to make a provision and remove the contingent liability disclosure.",
    examFocusType: 'focus'
  }
];

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-4-1',
    title: 'Exam Corner 1 — Real Estate Agreement vs. Deed Registration (The Timing Trap)',
    category: 'Exam Corner',
    panels: [
      {
        title: 'The Examination Problem',
        content: (
          <div>
            <p><strong>Question:</strong> A company entered into an agreement to sell a surplus office building for ₹2,00,00,000 on March 15, 2024. The book value of the building was ₹1,80,00,000. The sale deed was executed, and physical possession was handed over to the buyer on March 28, 2024. However, the legal registration of the sale deed was completed on April 12, 2024. The accounts were approved on May 24, 2024. How should the transaction be recognized in FY 2023-24?</p>
          </div>
        )
      },
      {
        title: 'Model Answer & Analysis',
        content: (
          <div>
            <p><strong>Analysis under AS 4 &amp; AS 9:</strong></p>
            <p className="mt-2">The registration of the sale deed on April 12, 2024 is an event occurring after the balance sheet date. This event provides additional evidence of conditions (the sale agreement, delivery of possession, transfer of significant risks and rewards) that occurred *prior* to March 31, 2024.</p>
            <p className="mt-2">Since the execution of the deed and transfer of possession took place before the year-end, the transfer of ownership is substantially complete as of March 31. The subsequent registration is a regulatory formality confirming the pre-existing sale. Therefore, this is an **adjusting event**.</p>
            <p className="mt-2"><strong>Accounting Treatment:</strong> The company should recognize the sale of building and the profit of ₹20,0,000 in the P&amp;L for the year ended March 31, 2024.</p>
          </div>
        )
      }
    ],
    examFocus: "Do not fall into the trap of delaying revenue recognition to the next year simply because registration happened in April. If possession and agreement were completed before year-end, the transaction belongs to the current year and the post-year-end registration is an adjusting event.",
    examFocusType: 'trick'
  }
];
