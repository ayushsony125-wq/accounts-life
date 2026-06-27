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
    title={`Open ICAI Intro PDF — Page ${page}`}
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
    id: 'illus-intro-1',
    title: 'ICAI Case Scenario 1 — Ravi Traders Partnership Firm (Turnover & Borrowings Classification)',
    category: 'Official ICAI Illustration',
    pdfPage: 20,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Ravi Traders (Unlisted Partnership Firm) — FY 2023-24</p>
            <p><strong>Financial Metrics:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Turnover (excluding other income): <strong>₹230 crores</strong></li>
              <li>Borrowings (at any time during the year): <strong>₹45 crores</strong></li>
              <li>Nature of Entity: Non-Company, non-bank, non-regulated. Not a holding or subsidiary of any large entity.</li>
            </ul>
            <p className="mt-2"><strong>The Request:</strong> Classify the entity under the revised classification criteria for applicability of AS (commencing April 1, 2024), and evaluate if Ravi Traders is eligible to avail MSME exemptions for FY 2024-25.</p>
          </div>
        )
      },
      {
        title: 'Factual Analysis',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Step 1: Check MSME Definition Criteria for Non-Company Entities (ICAI Aug 2024 Announcement):</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Unlisted:</strong> Yes, it is a partnership firm (unlisted).</li>
              <li><strong>Not Bank/FI/Insurance:</strong> Yes, it is a trading firm.</li>
              <li><strong>Turnover Limit:</strong> Does not exceed ₹250 crores (Actual: ₹230 crores — satisfies limit).</li>
              <li><strong>Borrowings Limit:</strong> Does not exceed ₹50 crores at any time (Actual: ₹45 crores — satisfies limit).</li>
              <li><strong>Relationship status:</strong> Not holding/subsidiary of a Large entity.</li>
            </ul>
            <p className="mt-2 text-emerald-700 dark:text-emerald-400 font-bold">Conclusion: Ravi Traders satisfies all 5 conditions to be classified as an MSME.</p>
          </div>
        )
      },
      {
        title: 'Exemptions & Transition Rules',
        content: (
          <div className="space-y-2 text-xs">
            <p>Since Ravi Traders qualifies as an MSME for FY 2024-25, it is eligible to claim key exemptions and relaxations from the start of the year:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Full Exemption:</strong> AS 3 (Cash Flow), AS 17 (Segment Reporting), AS 20 (EPS), AS 24 (Discontinuing Operations).</li>
              <li><strong>Partial Relaxations:</strong> AS 10 (encouraged disclosures), AS 11 (encouraged disclosures), AS 15 (defined benefit plan actuarial calculation relaxations), AS 19 (certain lease disclosures), AS 22 (deferred tax calculations), AS 26, AS 28, and AS 29.</li>
            </ul>
            <p className="mt-2 text-amber-700 dark:text-amber-400"><strong>Note on Transition:</strong> If it ceases to qualify in the future, the standards become applicable prospectively, without needing to revise previous year figures.</p>
          </div>
        )
      }
    ],
    examFocus: 'Ensure both turnover (₹250 cr limit) and borrowings (₹50 cr limit) are checked against the immediately preceding financial year.',
    examFocusType: 'concept'
  }
];

export const businessCases: CaseStudy[] = [
  {
    id: 'case-intro-1',
    title: 'Business Case — Om Finserv LLP (Level Boundary Classification & Strict Limits)',
    category: 'Practical Business Case',
    pdfPage: 20,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Om Finserv LLP (Non-Company Entity) — FY 2023-24</p>
            <p><strong>Financial Metrics:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Turnover (excluding other income): <strong>₹180 crores</strong></li>
              <li>Borrowings (at any time during the preceding year): <strong>₹55 crores</strong></li>
              <li>Nature of Entity: Limited Liability Partnership (Non-Company).</li>
            </ul>
            <p className="mt-2"><strong>The Issue:</strong> Om Finserv LLP wishes to classify as an MSME and claim exemptions under AS 3 and AS 17 for FY 2024-25. Review the eligibility.</p>
          </div>
        )
      },
      {
        title: 'Exhaustive Analysis',
        content: (
          <div className="space-y-3 text-xs leading-relaxed">
            <p><strong>1. Borrowings Threshold Test:</strong></p>
            <p>Under the revised scheme (effective April 1, 2024), a non-company entity is classified as an MSME if its borrowings do not exceed <strong>₹50 crores</strong> at any time during the immediately preceding accounting year.</p>
            <p className="text-red-600 dark:text-red-400 font-bold">Actual Borrowings: ₹55 crores. This exceeds the limit of ₹50 crores.</p>
            <p><strong>2. Resulting Status:</strong></p>
            <p>Because the borrowings exceed the threshold (even though turnover of ₹180 cr is within the ₹250 cr limit), the LLP fails the MSME definition and is classified as a <strong>Large Entity</strong>.</p>
          </div>
        )
      },
      {
        title: 'Compliance Impact',
        content: (
          <div className="space-y-2">
            <p>As a <strong>Large Entity</strong>, Om Finserv LLP must:</p>
            <ul className="list-disc pl-5 text-xs space-y-1">
              <li>Comply with all Accounting Standards (AS 1 to AS 29) in their entirety.</li>
              <li>Prepare and present a full Cash Flow Statement as per <strong>AS 3</strong>.</li>
              <li>Provide full Segment Disclosures under <strong>AS 17</strong>.</li>
              <li>No relaxations are available for employee benefits (AS 15) or leases (AS 19).</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Exceeding even one of the thresholds (Turnover or Borrowings) disqualifies the entity from MSME status and triggers full compliance.',
    examFocusType: 'trap'
  }
];

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-intro-1',
    title: 'Audit Case — Auditor\'s Duty to Report Deviation (Attest Function under Section 143(3)(e))',
    category: 'Audit Case Studies',
    pdfPage: 3,
    panels: [
      {
        title: 'Background & Audit Dispute',
        content: (
          <div>
            <p><strong>Scenario:</strong> ABC &amp; Co. (Partnership Firm) prepared its financial statements for FY 2024-25. The firm did not comply with the valuation principles of **AS 2 (Valuation of Inventories)** because it valued inventory at selling price instead of lower of cost and net realizable value.</p>
            <p className="mt-2">The management argues that since they are a partnership firm and not a company, they are not bound by the Companies Act, and therefore the auditor has no right to qualify the audit report.</p>
          </div>
        )
      },
      {
        title: 'Auditor\'s Professional Duty & ICAI Guidance',
        content: (
          <div className="space-y-3 text-xs leading-relaxed">
            <p><strong>1. Attest Function Responsibility:</strong></p>
            <p>Under ICAI guidelines, the mandatory status of an Accounting Standard implies that in discharging their attest functions, members of the ICAI (auditors) must examine compliance regardless of corporate status.</p>
            <p><strong>2. Mandatory Reporting:</strong></p>
            <p>If the entity deviates from an applicable standard, the auditor has a professional duty to make adequate disclosures in their audit report, outlining the deviation, reasons, and quantitative financial impact on net profits and assets.</p>
          </div>
        )
      },
      {
        title: 'Illustrative Audit Report Disclosure',
        content: (
          <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono text-[11px] leading-normal space-y-1">
            <strong>Auditor\'s Opinion/Report Reference:</strong><br />
            &quot;We draw attention to Note X of the financial statements, where the firm has valued its inventories at selling price instead of the lower of cost and net realizable value, which is a deviation from AS 2 (Valuation of Inventories). Had the firm complied with AS 2, the inventory value would have been lower by ₹12,50,000, and net profit and partners\' capital accounts would have been reduced by ₹12,50,000.&quot;
          </div>
        )
      }
    ],
    examFocus: 'Management is responsible for preparation/disclosure; the auditor\'s responsibility is to verify and report deviations in their attest report.',
    examFocusType: 'focus'
  }
];

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-intro-1',
    title: 'Regulatory Observation — Accounting Standards vs. Income Computation & Disclosure Standards (ICDS)',
    category: 'Regulatory Observations',
    pdfPage: 5,
    panels: [
      {
        title: 'Overview of Dispute',
        content: (
          <div>
            <p><strong>The Context:</strong> Under Section 145(2) of the Income Tax Act, 1961, the Central Government has notified ten ICDSs to compute taxable income. A company claims that since it complies with ICDS for tax filings, it need not compile separate financial statements under Section 133 of the Companies Act, 2013.</p>
          </div>
        )
      },
      {
        title: 'Standard vs. Tax Authority',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>1. Fiscal Policy vs. Financial Presentation:</strong></p>
            <p>Accounting Standards aim to present a &quot;true and fair view&quot; of financial position to stakeholders, whereas ICDS is strictly a tax computation mechanism for the head &quot;PGBP&quot; or &quot;Income from Other Sources&quot;.</p>
            <p><strong>2. Examples of Divergence:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Finance Lease:</strong> Under AS 19, the lessee claims depreciation on finance lease assets. For income tax purposes, the lessor (legal owner) is allowed depreciation, regardless of AS 19 treatment.</li>
              <li><strong>Revenue Recognition:</strong> Tax rules may require immediate recognition of certain receipts, whereas AS 9 mandates recognition only when revenue is earned and measurable.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Accounting Standards cannot be avoided simply because tax treatments or deductions differ. Separate reconciliation is required.',
    examFocusType: 'concept'
  }
];

export const judicialCases: CaseStudy[] = [
  {
    id: 'judicial-intro-1',
    title: 'Landmark Judicial Precedent — J.K. Industries Ltd. vs. Union of India (Validity of Accounting Standards)',
    category: 'Landmark Judicial Cases',
    panels: [
      {
        title: 'Facts & Challenge',
        content: (
          <div>
            <p><strong>The Case:</strong> The validity of Accounting Standards notified by the Central Government under the Companies Act was challenged by J.K. Industries Ltd. on the ground that the standards delegate legislative power to the ICAI and the government, bypassing Parliament.</p>
          </div>
        )
      },
      {
        title: 'Supreme Court Ruling',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The Supreme Court upheld the constitutional validity of Section 211(3C) of the Companies Act, 1956 (now Section 133 of the Companies Act, 2013).</p>
            <p>The Court held that the Accounting Standards are technical guidelines formulated by experts (ICAI) and approved by the government in consultation with advisory bodies. They do not override statutory law but supplement it to ensure transparency and comparability in financial reporting, which is in the public interest.</p>
          </div>
        )
      }
    ],
    examFocus: 'Accounting Standards have full statutory force once notified by the MCA and must be followed by all covered corporate entities.',
    examFocusType: 'focus'
  }
];

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-intro-1',
    title: 'Exam Corner — Transition Rules when MSME status changes (Qualifying/Disqualifying Years)',
    category: 'Exam Adjustments',
    pdfPage: 8,
    panels: [
      {
        title: 'Background Question',
        content: (
          <div>
            <p><strong>Scenario:</strong> X &amp; Co., a partnership firm, was classified as a Large Entity in FY 2022-23. In FY 2023-24, its turnover drops below ₹250 crores and borrowings drop below ₹50 crores, qualifying it as an MSME.</p>
            <p className="mt-2">The firm wants to know if it can immediately avail MSME exemptions in preparing its accounts for FY 2023-24.</p>
          </div>
        )
      },
      {
        title: 'Transition Rules (Para 8.2)',
        content: (
          <div className="space-y-3 text-xs">
            <p><strong>1. Large to MSME Transition (Two-Year Rule):</strong></p>
            <p>An entity which was previously not an MSME and subsequently becomes an MSME, <strong>shall not be qualified</strong> for exemptions/relaxations in respect of Accounting Standards available to an MSME <strong>until the entity remains an MSME for two consecutive years</strong>.</p>
            <p className="text-red-600 dark:text-red-400 font-bold">Conclusion: X &amp; Co. cannot avail the exemptions in FY 2023-24. It must maintain MSME status in FY 2024-25 as well before qualifying for exemptions in FY 2024-25.</p>
          </div>
        )
      },
      {
        title: 'MSME to Large Transition (Prospective Rule)',
        content: (
          <div className="space-y-2 text-xs">
            <p>Conversely, if an MSME ceases to qualify for exemptions because it exceeds the limit in the current year:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The standards become applicable from the **current period** immediately.</li>
              <li>Figures for the corresponding previous period **need not be revised** or restated.</li>
              <li>A disclosure note explaining this fact must be appended to the financials.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Remember: 2-year waiting period is required for Large -> MSME transitions, but MSME -> Large transition applies IMMEDIATELY in the year of limit breach.',
    examFocusType: 'trick'
  }
];
