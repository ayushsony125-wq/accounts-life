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
    title={`Open ICAI AS 18 PDF — Page ${page}`}
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
    id: 'illus-18-1',
    title: 'ICAI Illustration 1 — Related Party Identification: KMP, Subsidiaries, Associates & Relative-owned Enterprises',
    category: 'Official ICAI Illustration',
    pdfPage: 10,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Reporting Entity:</strong> Zenith Corporate Services Ltd. Identify related party relationships:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Zenith holds 60% shares in Subsidiary A.</li>
              <li>Mr. X is the Managing Director of Zenith. His wife, Mrs. X, is the sole proprietor of X Trading Co.</li>
              <li>Mr. Y is a non-executive independent director of Zenith; holds 2% shares.</li>
              <li>Zenith holds 30% shares in Associate B.</li>
              <li>Mr. Z is the CFO of Zenith. His brother-in-law runs Z Consultants Pvt. Ltd.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'AS 18 Categorization & Analysis',
        content: (
          <div className="space-y-3 text-xs leading-relaxed">
            <p><strong>1. Subsidiary A (60% held):</strong> Related party — Category 1 (enterprise controlled by Zenith). Disclosures mandatory whether or not transactions exist.</p>
            <p><strong>2. Mr. X (MD) → Related Party (KMP, Category 4).</strong></p>
            <p>Mrs. X = Relative of KMP (spouse). X Trading Co. = Enterprise owned by relative of KMP → <strong>Related Party (Category 5)</strong>.</p>
            <p><strong>3. Mr. Y (Independent Director):</strong> Non-executive independent directors are NOT KMP under AS 18. They lack authority and responsibility for planning, directing, and controlling activities. <strong>NOT a related party.</strong></p>
            <p><strong>4. Associate B (30% held):</strong> Related party — Category 2 (significant influence relationship). Disclosures required only when transactions exist (Para 20).</p>
            <p><strong>5. Mr. Z (CFO) → KMP (Category 4).</strong> Brother-in-law is NOT within AS 18's definition of "relative" (only spouse, son, daughter, brother, sister, father, mother). Z Consultants → <strong>NOT a related party.</strong></p>
          </div>
        )
      },
      {
        title: 'The 5 Categories of Related Parties (AS 18 Para 3)',
        content: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-200 dark:border-slate-800">
              <thead><tr className="bg-slate-100 dark:bg-slate-900"><th className="border p-2">Category</th><th className="border p-2">Description</th></tr></thead>
              <tbody>
                <tr><td className="border p-2 font-bold">1</td><td className="border p-2">Enterprises that directly or indirectly control, or are controlled by, the reporting enterprise</td></tr>
                <tr className="bg-blue-50/10"><td className="border p-2 font-bold">2</td><td className="border p-2">Associates and joint ventures of the reporting enterprise</td></tr>
                <tr><td className="border p-2 font-bold">3</td><td className="border p-2">Investing parties in respect of which the enterprise is an associate or joint venture</td></tr>
                <tr className="bg-blue-50/10"><td className="border p-2 font-bold">4</td><td className="border p-2">Individuals owning directly or indirectly an interest giving significant influence + their relatives</td></tr>
                <tr><td className="border p-2 font-bold">5</td><td className="border p-2">Key Management Personnel and their relatives</td></tr>
              </tbody>
            </table>
          </div>
        )
      }
    ],
    examFocus: 'Non-executive independent directors are NOT KMP under AS 18. Brother-in-law and sister-in-law are NOT relatives under AS 18 (only 7 relationships qualify).',
    examFocusType: 'trap'
  },
  {
    id: 'illus-18-2',
    title: 'ICAI Illustration 2 — Control vs Significant Influence: Disclosure with Nil Transactions (Para 20)',
    category: 'Official ICAI Illustration',
    pdfPage: 12,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Alpha Ltd. (parent, 80% in Beta Ltd.) and Gamma Ltd. (30% associate).</p>
            <p>FY 2023-24: <strong>No transactions</strong> occurred between Alpha and Beta, or Alpha and Gamma.</p>
            <p>Management argues zero-transaction relationships need no disclosure.</p>
          </div>
        )
      },
      {
        title: 'AS 18 Disclosure Rule (Para 20)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Control Relationships (Para 20):</strong> Where control exists, related party relationships MUST be disclosed irrespective of whether there have been transactions between the related parties.</p>
            <p><strong>Alpha must disclose in its books:</strong> "Beta Ltd. is a subsidiary (Alpha holds 80% equity)."</p>
            <p><strong>Beta must disclose in its books:</strong> "Alpha Ltd. is the holding company."</p>
            <p className="mt-2"><strong>Significant Influence (Associates) — Para 20 proviso:</strong> Disclosure of relationships alone is NOT required when significant influence exists without transactions. Disclosures for associates are required only when transactions occur.</p>
            <p>→ Alpha-Gamma relationship: No disclosure required (no transactions AND only significant influence, not control).</p>
          </div>
        )
      },
      {
        title: 'Required Disclosure Format (Beta Ltd.)',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p className="font-sans font-bold">Note on Related Party Disclosures (AS 18):</p>
            <p>A. Related Party Relationships (where control exists):</p>
            <p>&nbsp;&nbsp;Holding Company: Alpha Ltd. (holds 80% equity)</p>
            <p className="mt-2">B. Transactions: Nil (₹0)</p>
            <p className="mt-2 font-sans text-slate-500 dark:text-slate-400">Note: Even with zero transactions, the relationship must be disclosed under Para 20 when control exists.</p>
          </div>
        )
      }
    ],
    examFocus: 'Control relationships → ALWAYS disclose even with nil transactions. Significant influence relationships → Disclose ONLY when transactions occur.',
    examFocusType: 'concept'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-18-1',
    title: 'Business Case — Pricing Policy & Outstanding Balances Disclosure (Director-Owned Supplier)',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Net Ltd. (FY 2023-24)</p>
            <p>Zenith purchased raw materials worth <strong>₹5,000,000</strong> from Surya Metals — a partnership firm owned by the brother of Zenith's Managing Director.</p>
            <p>Year-end outstanding balance: <strong>₹800,000</strong> payable to Surya Metals.</p>
            <p>Pricing: Cost + 10% markup (vs. market rate of cost + 15%).</p>
          </div>
        )
      },
      {
        title: 'Relationship Identification',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>MD's brother = <strong>relative of KMP</strong> (brother is within AS 18 definition).</p>
            <p>Surya Metals = enterprise owned by relative of KMP → <strong>Related Party (Category 5)</strong>.</p>
            <p>Transaction occurred → Full disclosure required under Para 23.</p>
          </div>
        )
      },
      {
        title: 'Required Disclosure (Para 23)',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p className="font-sans font-bold">Related Party Disclosures — Zenith Net Ltd.:</p>
            <p>Name of Related Party: Surya Metals</p>
            <p>Relationship: Enterprise over which a relative of KMP exercises significant influence</p>
            <p>Nature of Transaction: Purchase of raw materials</p>
            <p>Volume of Transactions: ₹5,000,000</p>
            <p>Pricing Policy: Cost + 10% markup (below market rates of cost + 15%)</p>
            <p>Balance Outstanding (Creditor): ₹800,000 as at 31 March 2024</p>
          </div>
        )
      },
      {
        title: 'Exam Focus: What to Disclose',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 23 requires disclosure of:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Name of the related party and nature of relationship</li>
              <li>Description of nature of transactions</li>
              <li>Volume of transactions (₹ amounts)</li>
              <li>Any other elements necessary for understanding</li>
              <li>Outstanding balances (both receivable and payable)</li>
              <li>Pricing policy and whether it is on an arm's length basis</li>
              <li>Provisions for doubtful debts related to outstanding balances</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Always disclose BOTH the transaction amount AND the year-end outstanding balance. Pricing policy disclosure is mandatory for all related party transactions.',
    examFocusType: 'focus'
  },
  {
    id: 'case-18-2',
    title: 'Business Case — KMP Remuneration Disclosure (Salaries, Allowances, PF & Non-Monetary Benefits)',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Omega Industries Ltd. (FY 2023-24)</p>
            <p>Key Management Personnel compensation:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>MD Salary: ₹24,00,000</li>
              <li>MD Performance Bonus: ₹8,00,000</li>
              <li>Employer PF Contribution: ₹2,88,000</li>
              <li>Car (personal use) — perquisite value: ₹1,20,000</li>
              <li>Stock options exercised: ₹5,00,000 (fair value)</li>
            </ul>
          </div>
        )
      },
      {
        title: 'AS 18 — Remuneration as Related Party Transaction',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Remuneration paid to KMP is explicitly a related party transaction. ALL components must be disclosed — there is no exemption for "employment contract" items.</p>
            <p><strong>Total to disclose:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cash compensation: ₹24,00,000 + ₹8,00,000 = ₹32,00,000</li>
              <li>Post-employment benefits (PF): ₹2,88,000</li>
              <li>Non-monetary benefits (car perquisite): ₹1,20,000</li>
              <li>Share-based payments (options): ₹5,00,000</li>
              <li><strong>Total: ₹41,08,000</strong></li>
            </ul>
          </div>
        )
      },
      {
        title: 'NFRA Observation on KMP Remuneration',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>NFRA has specifically flagged companies that:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Disclosed only salary but not bonus and perquisites</li>
              <li>Excluded post-employment benefits from the disclosure</li>
              <li>Did not disclose stock options exercised</li>
            </ul>
            <p className="mt-2">NFRA's position: All remuneration components — whether monetary or non-monetary — must be fully disclosed in the related party note.</p>
          </div>
        )
      }
    ],
    examFocus: 'KMP remuneration includes salary, bonus, PF contributions, perquisites, and stock options — ALL must be disclosed as related party transactions.',
    examFocusType: 'adjustment'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-18-1',
    title: 'Audit Case Study — Relatives Matrix Verification & Brother-in-Law Exclusion',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> During audit of Zenith Net Ltd., the auditor observes a payment of ₹1,200,000 to Mr. Amit for office consulting services.</p>
            <p>Mr. Amit is the husband of the sister of Zenith's Managing Director.</p>
            <p>Management claims brother-in-law is not a relative under AS 18.</p>
          </div>
        )
      },
      {
        title: 'AS 18 Relative Definition (Para 10.9)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>AS 18 "Relative" means (EXHAUSTIVE LIST):</strong></p>
            <ul className="list-disc pl-5 space-y-0.5">
              <li>Spouse ✓</li>
              <li>Son ✓</li>
              <li>Daughter ✓</li>
              <li>Brother ✓</li>
              <li>Sister ✓</li>
              <li>Father ✓</li>
              <li>Mother ✓</li>
            </ul>
            <p className="mt-2"><strong>NOT included:</strong> Brother-in-law, Sister-in-law, Son-in-law, Daughter-in-law, Grandchildren, Uncles, Aunts, Cousins.</p>
            <p className="mt-2"><strong>Auditor Conclusion:</strong> Management is CORRECT. The sister IS a relative, but the sister's husband (brother-in-law) is NOT within the AS 18 definition. No related party disclosure required for Mr. Amit.</p>
          </div>
        )
      },
      {
        title: 'Auditor\'s Responsibility Despite No Disclosure Required',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>While no AS 18 disclosure is legally required, the auditor should:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Verify the bona fide nature of the consulting engagement</li>
              <li>Check if the pricing was commercial/arm's length</li>
              <li>Review if Companies Act 2013 related party definition (broader) applies for listed entities</li>
              <li>Consider whether the relationship might influence management integrity assessments</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'AS 18 relative definition includes ONLY 7 relationships. Brothers-in-law, sons-in-law, grandchildren — all EXCLUDED. This is a classic exam trap comparing AS 18 with Companies Act 2013.',
    examFocusType: 'trap'
  },
  {
    id: 'audit-18-2',
    title: 'Audit Case Study — Undisclosed Guarantee Given to Subsidiary (Off-Balance Sheet Related Party)',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> During the audit of Zenith Holdings Ltd., the auditor discovers that the company gave a corporate guarantee of ₹50 crores to a bank on behalf of its wholly-owned subsidiary, Zenith Exports Ltd. This guarantee was NOT disclosed in the related party note or the contingent liabilities note.</p>
          </div>
        )
      },
      {
        title: 'AS 18 Guarantee Disclosure Requirement',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 23 lists guarantees as a specific type of related party transaction requiring disclosure. A corporate guarantee given on behalf of a subsidiary (related party) must be disclosed regardless of whether it is called or utilized.</p>
            <p><strong>Required disclosures:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Nature: Corporate Guarantee given to bank</li>
              <li>Related party: Zenith Exports Ltd. (wholly-owned subsidiary)</li>
              <li>Amount guaranteed: ₹50 crores</li>
              <li>Outstanding balance: Amount drawn by subsidiary under the facility</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Auditor Action & Report Impact',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The omission of a ₹50 crore guarantee from both related party and contingent liability disclosures is a <strong>material misstatement</strong> in the financial statements.</p>
            <p>Auditor action: Require disclosure; if management refuses, issue a <strong>qualified opinion</strong> specifically citing failure to disclose a related party guarantee of ₹50 crores.</p>
          </div>
        )
      }
    ],
    examFocus: 'Guarantees given to/on behalf of related parties must be disclosed under AS 18 Para 23 even if the guarantee has not been invoked.',
    examFocusType: 'focus'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-18-1',
    title: 'NFRA / SEBI Observation — Non-disclosure of KMP Salary and "Employment Contract" Exemption Myth',
    category: 'Regulatory Observations',
    panels: [
      {
        title: 'Regulatory Issue',
        content: (
          <div>
            <p><strong>NFRA Observation:</strong> Multiple companies failed to disclose remuneration paid to KMP in related party notes, claiming it was governed by employment contracts and hence not a "related party transaction."</p>
            <p className="mt-2">SEBI also found several listed entities omitting KMP remuneration from the AS 18 note while disclosing it in the directors' report.</p>
          </div>
        )
      },
      {
        title: 'ICAI & NFRA Position',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>There is <strong>no exemption</strong> for remuneration under an employment contract from AS 18 disclosure requirements. KMP remuneration is explicitly a related party transaction under Para 3 and must be fully disclosed in the financial statement notes.</p>
            <p>Disclosures in the directors' report do NOT substitute for AS 18 note disclosures in the financial statements.</p>
          </div>
        )
      },
      {
        title: 'Correct Treatment',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p className="font-sans font-bold">Mandatory AS 18 Note Disclosure (KMP Remuneration):</p>
            <p>Name: Mr. A (MD); Relationship: KMP</p>
            <p>Remuneration: ₹41,08,000 (includes salary, bonus, PF, perquisites, ESOPs)</p>
            <p>Nature: Compensation for services as MD</p>
          </div>
        )
      }
    ],
    examFocus: 'Remuneration paid to KMP is ALWAYS a related party transaction requiring full disclosure under AS 18 — there is no "employment contract" exemption.',
    examFocusType: 'adjustment'
  },
  {
    id: 'reg-18-2',
    title: 'NFRA Audit Observation — Omission of Year-End Outstanding Balances and Guarantees',
    category: 'Regulatory Observations',
    panels: [
      {
        title: 'Regulatory Finding',
        content: (
          <div>
            <p><strong>Failure to Disclose Outstanding Balances:</strong> In several recent inspection reports, NFRA noted that companies disclosed the purchase/sale transaction amounts but omitted the year-end receivables/payables outstanding balances with related parties.</p>
            <p className="mt-2">Management argued that since the transaction volume was already disclosed, showing the year-end ledger balance was redundant.</p>
          </div>
        )
      },
      {
        title: 'AS 18 Mandate (Para 23)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>As per <strong>AS 18 Para 23</strong>, the reporting enterprise MUST disclose both:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The volume of the transactions, either as an amount or as an appropriate proportion; and</li>
              <li>The <strong>outstanding balances</strong> (including receivables, payables, and commitments) at the balance sheet date.</li>
            </ul>
            <p>Omitting outstanding balances is a direct violation of the standard and limits the user's ability to assess liquidity and credit concentration risks.</p>
          </div>
        )
      },
      {
        title: 'Correct Disclosure Presentation',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p className="font-sans font-bold">Note on Related Party Balances (FY 2023-24):</p>
            <p><strong>Transactions during the year:</strong> Purchase of goods from Subsidiary X: ₹2,50,00,000</p>
            <p><strong>Outstanding Balances as on 31.03.2024:</strong></p>
            <p>&nbsp;&nbsp;- Trade Payables (due to Subsidiary X): ₹42,50,000</p>
            <p>&nbsp;&nbsp;- Provisions for doubtful debts related to above: Nil (₹0)</p>
          </div>
        )
      }
    ],
    examFocus: 'Both transaction volumes AND year-end outstanding balances (receivables, payables, guarantees) are mandatory disclosures under AS 18 Para 23.',
    examFocusType: 'focus'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'judicial-18-1',
    title: 'Case Study — Significant Influence and Voting Power (20% Threshold)',
    category: 'Landmark Judicial Cases',
    panels: [
      {
        title: 'Facts & Legal Principle',
        content: (
          <div>
            <p><strong>Principle from CIT v. Modi Xerox & related cases:</strong></p>
            <p>Holding 20% or more of the voting power of an enterprise creates a rebuttable presumption of <strong>significant influence</strong> under AS 18. This makes the investee an Associate (Category 2 related party).</p>
          </div>
        )
      },
      {
        title: 'When the 20% Presumption Can Be Rebutted',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The 20% presumption can be rebutted if evidence shows significant influence does NOT in fact exist, for example:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The investing company has no representation on the Board</li>
              <li>No participation in policy-making processes</li>
              <li>No material transactions between the enterprises</li>
              <li>Share holding is purely passive/financial investment</li>
            </ul>
            <p className="mt-2">Conversely, significant influence may exist with LESS than 20% if other factors (board seat, policy participation) are present.</p>
          </div>
        )
      },
      {
        title: 'Exam Scenario',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Q: Alpha holds 18% in Beta but has a Board seat and participates in financial policy. Is Beta a related party of Alpha?</strong></p>
            <p><strong>A: YES.</strong> Despite below-20% ownership, actual significant influence exists (Board seat + policy participation). Beta is an Associate (Category 2 related party) of Alpha under AS 18.</p>
          </div>
        )
      }
    ],
    examFocus: '20% voting power creates a PRESUMPTION of significant influence, not a certainty. Look for actual evidence of policy participation or Board representation.',
    examFocusType: 'concept'
  },
  {
    id: 'judicial-18-2',
    title: 'Judicial Precedent — Substance Over Form in Determining De Facto Related Parties (The Dharmendra Case)',
    category: 'Landmark Judicial Cases',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>The Dispute:</strong> The reporting company purchased raw materials at highly inflated prices from a partnership firm owned by the daughter-in-law of the Managing Director's brother. The company argued that daughter-in-law is not in the exhaustive list of 'relatives' under AS 18, so no disclosure was needed.</p>
            <p className="mt-2"><strong>Tax / Audit Observation:</strong> The auditor established that the brother of the MD actually managed and financed the partnership firm, and the daughter-in-law was merely a nominee partner to avoid AS 18 controls.</p>
          </div>
        )
      },
      {
        title: 'Judicial Finding & Substance over Form',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The tribunal and courts applied the principle of <strong>Substance over Form (AS 1)</strong> to interpret AS 18 relationship boundaries:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Nominal partnerships cannot mask the de facto influence of KMP relatives (the brother).</li>
              <li>Because the brother (KMP relative) exerted actual control/influence over the partnership, the partnership firm was indeed a related party under Category 5.</li>
              <li>A purely formalistic exclusion of a name is void if the substance reveals clear related-party control over the transaction pricing.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Audit Practice Guideline',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>When auditing related parties, auditors must not rely solely on self-declarations of KMP relatives. They must:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Conduct background checks on high-value non-arms-length suppliers.</li>
              <li>Look for ultimate beneficial owners (UBO) who may fall under KMP relatives.</li>
              <li>Verify who signs bank operations and contract terms.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Courts and auditors use Substance over Form to look past nominee arrangements and identify the de facto related party exercising control or influence.',
    examFocusType: 'trap'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-18-1',
    title: 'Exam Corner — AS 18 Quick Reference: Who is NOT a Related Party (Para 4 Exclusions)',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'Para 4 Exclusions — Who Is NOT a Related Party',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>AS 18 Para 4 explicitly states that the following are NOT related parties merely by virtue of their dealings:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Providers of finance (banks, financial institutions, venture capitalists)</li>
              <li>Trade unions</li>
              <li>Government departments and agencies</li>
              <li>Public utilities (electricity, water, telecom providers)</li>
              <li>A single customer, supplier, franchisor, distributor, or general agent with whom the enterprise transacts a significant volume of business MERELY by economic dependence</li>
            </ul>
            <p className="mt-2">These parties are excluded because the relationship is purely economic and does not involve the ability to influence policies.</p>
          </div>
        )
      },
      {
        title: 'Two Companies with a Common Director',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Classic Exam Q: Are Company A and Company B related parties simply because they share a common director?</strong></p>
            <p><strong>Answer: NOT necessarily.</strong></p>
            <p>Two companies are related parties because of a common director ONLY if that director is able to exercise <strong>significant influence</strong> over BOTH companies through that directorship.</p>
            <p>A non-executive independent director on boards of two companies does NOT automatically make those companies related parties to each other.</p>
          </div>
        )
      },
      {
        title: 'State-Controlled Enterprise Exemption',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Para 6 Exemption:</strong> Transactions between two state-controlled enterprises (government-owned companies) are exempt from AS 18 disclosure requirements.</p>
            <p><strong>Example:</strong> ONGC selling crude oil to Indian Oil Corporation (both government companies) — not a related party transaction for AS 18 purposes.</p>
            <p className="mt-2"><strong>Note:</strong> This is a broad exemption for state-controlled entities. Private sector companies cannot claim this exemption.</p>
          </div>
        )
      }
    ],
    examFocus: 'Shared directors do NOT automatically make two companies related parties — only if the director can influence both companies\' policies. This is one of the most frequently tested AS 18 conceptual traps.',
    examFocusType: 'trap'
  },
  {
    id: 'exam-18-2',
    title: 'Exam Corner — Step-by-Step Related Party Decision Workflow & Disclosure Note Draft',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'Step-by-Step Decision Logic',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>To solve any AS 18 exam question, follow this logic flow:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li><strong>Check Ownership/Voting:</strong> Is there &gt;50% ownership (Control - Cat 1) or 20% to 50% ownership (Significant Influence - Cat 2)?</li>
              <li><strong>Check Management Authority:</strong> Is the person MD, Whole-time Director, or CFO (KMP - Cat 4)?</li>
              <li><strong>Check Relatives:</strong> Is the transacting party one of the 7 relatives of KMP (Spouse, Son, Daughter, Father, Mother, Brother, Sister) or an enterprise controlled by them (Cat 5)?</li>
              <li><strong>Apply Exclusions:</strong> Is it a trade union, bank, utilities provider, or common director (without influence)?</li>
              <li><strong>Determine Disclosure:</strong> If it's a Control relationship, disclose even with zero transactions. If it's Significant Influence, disclose only if transactions exist.</li>
            </ol>
          </div>
        )
      },
      {
        title: 'Drafting the Perfect Note',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>In your exam paper, structure your answer as follows:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Provision Reference:</strong> Cite AS 18 "Related Party Disclosures" and define the category matching the question.</li>
              <li><strong>Analysis of Facts:</strong> Link the case facts to the category (e.g., "Mr. Y is MD, thus KMP. His sister is a relative...").</li>
              <li><strong>Conclusion:</strong> State clearly whether disclosure is required.</li>
              <li><strong>Note Mock-up:</strong> Write a mock disclosure table (Entity Name, Relationship, Transaction type, Amount, Outstanding balance, Pricing Policy).</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Always structure exam answers by citing the AS 18 categories, applying facts to definitions (especially relative definitions), and drafting a mock disclosure note.',
    examFocusType: 'adjustment'
  }
]
