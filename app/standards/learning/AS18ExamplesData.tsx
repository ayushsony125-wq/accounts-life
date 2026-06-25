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
    title={`Open ICAI AS 18 PDF — Page ${page}`}
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
    id: 'illus-18-1',
    title: 'ICAI Illustration 1 — Related Party Relationship Identification (KMP, Subsidiaries, and Relatives)',
    category: 'Official ICAI Illustration',
    pdfPage: 10,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Reporting Entity:</strong> Zenith Corporate Services Ltd.</p>
            <p><strong>Query:</strong> Identify related party relationships for the following scenarios:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Zenith holds 60% shares in Subsidiary A.</li>
              <li>Mr. X is the Managing Director of Zenith. His wife, Mrs. X, is the sole proprietor of X Trading Co.</li>
              <li>Mr. Y is a non-executive independent director of Zenith. He holds 2% shares in Zenith.</li>
              <li>Zenith holds 30% shares in Associate B.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'AS 18 Analysis & Categorization',
        content: (
          <div className="space-y-3 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>1. Subsidiary A:</strong> Related party relationship exists under **Category 1** (Enterprises that control or are controlled by the reporting enterprise). Requisite disclosures are mandatory.</p>
            
            <p className="mt-2"><strong>2. Mr. X &amp; X Trading Co.:</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Mr. X is Key Management Personnel (KMP) under **Category 4**.</p>
            <p>&nbsp;&nbsp;&nbsp;Mrs. X is a **relative** of KMP (spouse).</p>
            <p>&nbsp;&nbsp;&nbsp;X Trading Co. is an enterprise over which a relative of KMP is able to exercise significant influence (Category 5). Thus, both Mr. X and X Trading Co. are related parties.</p>
            
            <p className="mt-2"><strong>3. Mr. Y (Independent Director):</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Non-executive directors are **not** considered KMP unless they have the authority and responsibility for planning, directing, and controlling the activities of the enterprise. Hence, Mr. Y is **not** a related party under AS 18.</p>
            
            <p className="mt-2"><strong>4. Associate B:</strong> Related party relationship exists under **Category 2** (Associates and Joint Ventures).</p>
          </div>
        )
      }
    ],
    examFocus: 'Non-executive independent directors are NOT related parties under AS 18 KMP definitions.',
    examFocusType: 'trap'
  },
  {
    id: 'illus-18-2',
    title: 'ICAI Illustration 2 — Control Relationship vs Transaction Relationship (Disclosures with Zero Transactions)',
    category: 'Official ICAI Illustration',
    pdfPage: 12,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Alpha Ltd. is the parent company of Beta Ltd. (Alpha holds 80% shares of Beta).</p>
            <p>During the FY 2023-24, there were **no transactions** of purchase, sale, or services between Alpha Ltd. and Beta Ltd.</p>
            <p>The management of Beta Ltd. claims that because there were zero transactions, no related party disclosures are required in their financial statements.</p>
          </div>
        )
      },
      {
        title: 'AS 18 Disclosure Mandate (Para 20)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Under AS 18 (Para 20), related party relationships where **control** exists should be disclosed irrespective of whether there have been transactions between the related parties.</p>
            <p><strong>Required Disclosure in Beta Ltd.\'s books:</strong></p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono">
              <p>Holding Company: Alpha Ltd. (holds 80% equity interest)</p>
            </div>
            <p>This disclosure is mandatory because the mere existence of control can affect the operating results and financial position of the subsidiary, even without active transactions.</p>
          </div>
        )
      }
    ],
    examFocus: 'Control relationships require disclosure even if transactions are NIL; significant influence relationships require disclosure ONLY when transactions occur.',
    examFocusType: 'concept'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-18-1',
    title: 'Business Case — Transactions pricing and outstanding balances (Acquisition of raw materials from director-owned firm)',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Net Ltd. (FY 2023-24)</p>
            <p><strong>The Transaction:</strong> Zenith Net bought raw materials worth **₹5,000,000** from Surya Metals, a partnership firm owned by the brother of Zenith\'s Managing Director.</p>
            <p><strong>Outstanding Balance:</strong> At the end of the year, Zenith Net owed **₹800,005** to Surya Metals.</p>
            <p>The materials were bought at cost + 10% markup, whereas external suppliers charge cost + 15% markup. Zenith wants to disclose this transaction in compliance with AS 18.</p>
          </div>
        )
      },
      {
        title: 'AS 18 Disclosure Formulation (Para 23)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Since the MD\'s brother is a **relative** of KMP, and Surya Metals is owned by him, Surya Metals is a related party.</p>
            <p><strong>Required Disclosures in Zenith Net Footnotes:</strong></p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs space-y-2">
              <p><strong>Related Party Disclosures (AS 18):</strong></p>
              <p>1. Name: Surya Metals</p>
              <p>2. Relationship: Enterprise over which a relative of KMP has significant influence</p>
              <p>3. Description of Transaction: Purchase of raw materials</p>
              <p>4. Volume of Transaction: ₹5,000,000</p>
              <p>5. Pricing Policy: Purchases were made at cost + 10% markup</p>
              <p>6. Balance Outstanding at Year-end: ₹800,005 (Creditors)</p>
            </div>
          </div>
        )
      }
    ],
    examFocus: 'Always disclose both the transaction volume and the year-end outstanding balance.',
    examFocusType: 'focus'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-18-1',
    title: 'Audit Case Study — Identification of Relatives (Audit Checklist & Relatives Matrix verification)',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> During the audit of Zenith Net Ltd., the auditor observes a payment of ₹1,200,000 to Mr. Amit for office consulting services. Mr. Amit is the husband of the sister of Zenith\'s Managing Director.</p>
            <p>Management claims that a brother-in-law is not in the definition of "relative" under AS 18, and hence this does not require related party disclosures.</p>
          </div>
        )
      },
      {
        title: 'Auditor Analysis & Relative Definition (Para 10.9)',
        content: (
          <div className="space-y-3 text-xs leading-relaxed">
            <p>Under AS 18 (Para 10.9), "Relative", in relation to an individual, means the spouse, son, daughter, brother, sister, father and mother who may be expected to influence, or be influenced by, that individual in his/her dealings with the reporting enterprise.</p>
            <p><strong>Checklist of Relatives:</strong></p>
            <ul className="list-disc pl-5 mt-1 space-y-0.5">
              <li>Spouse: Yes</li>
              <li>Son/Daughter: Yes</li>
              <li>Brother/Sister: Yes</li>
              <li>Father/Mother: Yes</li>
            </ul>
            <p><strong>What about Brother-in-law?</strong> The sister herself is a relative. However, the sister\'s husband (brother-in-law) is **not** included in the literal definition of relative under AS 18 (unlike the broader definition under the Companies Act, 2013). Thus, management\'s claim is legally correct under AS 18.</p>
          </div>
        )
      }
    ],
    examFocus: 'Brothers-in-law and sisters-in-law are excluded from the definition of relatives under AS 18.',
    examFocusType: 'trap'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-18-1',
    title: 'Regulatory Observation — Non-disclosure of KMP Salaries and Allowances (NFRA Compliance)',
    category: 'Regulatory Observations',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Overview:</strong> NFRA has highlighted cases where companies failed to disclose remuneration, bonuses, and sitting fees paid to directors and Key Management Personnel under the pretext that they are governed by employment contracts and do not constitute Related Party Transactions.</p>
          </div>
        )
      },
      {
        title: 'AS 18 Regulation',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Remuneration paid to Key Management Personnel (KMP) is a transaction with a related party and must be fully disclosed under AS 18. This includes salaries, allowances, contributions to PF, and non-monetary benefits.</p>
          </div>
        )
      }
    ],
    examFocus: 'Remuneration to KMP is a related party transaction and must be disclosed under AS 18.',
    examFocusType: 'adjustment'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'judicial-18-1',
    title: 'Landmark Judicial Case — CIT vs. Modi Xerox Ltd. (Meaning of Significant Influence & Voting Power)',
    category: 'Landmark Judicial Cases',
    panels: [
      {
        title: 'Facts & Ruling',
        content: (
          <div>
            <p><strong>Precedent:</strong></p>
            <p>The Court held that having representation on the Board of Directors or holding 20% or more of the voting power creates a rebuttable presumption of **significant influence**. Under AS 18, if an enterprise holds 20% or more of the voting power of the investee, the investee is classified as an Associate and is a related party.</p>
          </div>
        )
      }
    ],
    examFocus: 'Significant influence is presumed if the voting power is 20% or more.',
    examFocusType: 'concept'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-18-1',
    title: 'Exam Corner — Related Party definition and disclosure checklists',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'Reminders list',
        content: (
          <div className="space-y-2 text-xs">
            <ul className="list-disc pl-5 space-y-1">
              <li>Co-venturers in a Joint Venture are related parties.</li>
              <li>Two companies are **not** related parties simply because they have a director in common (unless the director is able to affect both companies' policies).</li>
              <li>Government departments, public utilities, and single customer/supplier relationships do not constitute related parties (Para 4).</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Shared directors do not make two companies related parties unless control or significant influence is exercised.',
    examFocusType: 'trap'
  }
]
