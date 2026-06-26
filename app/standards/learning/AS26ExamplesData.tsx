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
    title={`Open ICAI AS 26 PDF — Page ${page}`}
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
    id: 'illus-26-1',
    title: 'ICAI Illustration 1 — Research vs Development Phase Expenditures (Capitalization Criteria)',
    category: 'Official ICAI Illustration',
    pdfPage: 12,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> BioTech India Ltd. incurs the following R&amp;D costs for a new drug:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Phase 1: Exploratory research to identify compounds = <strong>₹3,00,000</strong>.</li>
              <li>Phase 2: Designing and testing pre-production drug models = <strong>₹5,00,000</strong> (prior to establishing technical feasibility).</li>
              <li>Phase 3: Final product testing and validation after establishing technical feasibility = <strong>₹4,00,000</strong>.</li>
            </ul>
            <p className="mt-2"><strong>Issue:</strong> State the accounting treatment for these expenditures under AS 26. <PdfRefInline page={12} /></p>
          </div>
        )
      },
      {
        title: 'Analysis & Verdict',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Rule (Para 41–45):</strong> Research phase costs must be expensed immediately when incurred. Development phase costs can be capitalized if and only if the enterprise can demonstrate all 6 criteria (technical feasibility, intent to complete, ability to use/sell, market availability, resource availability, and measurable cost).</p>
            <p><strong>Application:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Phase 1 (₹3,00,000): Research phase = <strong>Charged to P&amp;L</strong>.</li>
              <li>Phase 2 (₹5,00,000): Development phase prior to feasibility = <strong>Charged to P&amp;L</strong>.</li>
              <li>Phase 3 (₹4,00,000): Development phase after feasibility = <strong>Capitalized as Intangible Asset</strong>.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'AS 26 Audit Verification',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Audit Checkpoints:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Review the R&amp;D project log and board minutes to confirm the exact date on which "technical feasibility" was established.</li>
              <li>Verify that once an expense is charged to P&amp;L in a prior period, it cannot be reinstated and capitalized in a subsequent period.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Do not capitalize development costs until ALL 6 feasibility criteria are met. Any cost incurred before that date must be written off to the P&L statement immediately, and cannot be capitalized retrospectively.',
    examFocusType: 'focus'
  },
  {
    id: 'illus-26-2',
    title: 'ICAI Illustration 2 — Amortization of Intangible Asset (Useful Life & Residual Value)',
    category: 'Official ICAI Illustration',
    pdfPage: 18,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Asset details:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Acquisition cost of a patent = <strong>₹10,00,000</strong> on 1st April 20X1.</li>
              <li>Estimated useful life of the patent = <strong>15 years</strong>.</li>
              <li>Expected cash flows from the patent are guaranteed for the first 10 years under contract.</li>
              <li>The standard establishes a rebuttable presumption of 10 years useful life limit.</li>
            </ul>
            <p className="mt-2"><strong>Issue:</strong> State the amortization period and residual value to be used. <PdfRefInline page={18} /></p>
          </div>
        )
      },
      {
        title: 'Amortization Computations',
        content: (
          <div className="space-y-3 font-mono text-xs p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>Step 1: Determine the useful life for amortization</strong></p>
            <p>AS 26 has a rebuttable presumption that the useful life of an intangible asset will not exceed 10 years. However, if there is clear evidence of a longer life (e.g. 15-year legal patent life with cash flows), a longer life is used.</p>
            <p>Amortization period = <strong>15 years</strong>.</p>
            
            <p className="mt-2"><strong>Step 2: Determine residual value</strong></p>
            <p>Residual value of an intangible asset is assumed to be **nil** unless: (a) there is a commitment by a third party to purchase the asset at the end of its useful life, or (b) there is an active market for the asset.</p>
            <p>Residual value = <strong>Nil</strong>.</p>
            
            <p className="mt-2"><strong>Step 3: Calculate Annual Amortization</strong></p>
            <p>Annual Amortization = ₹10,00,000 / 15 years = <strong>₹66,667 per year</strong>.</p>
          </div>
        )
      }
    ],
    examFocus: 'Remember the rebuttable presumption of 10 years. If the question states that cash flows are expected for 12 years and the asset has a legal life of 12 years, use 12 years. Always state that the 10-year presumption is rebutted by clear evidence.',
    examFocusType: 'trap'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-26-1',
    title: 'Business Case — Internally Generated Brand Names, Publishing Titles, and Customer Lists',
    category: 'Business Application Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity context:</strong> NewsMedia India Ltd. spends <strong>₹12,00,000</strong> during the year on advertising and promotion to build the brand value of its main business magazine. The management wants to capitalize this brand value as an intangible asset in the balance sheet, arguing that the readership has doubled, which will generate higher future advertising revenues.</p>
          </div>
        )
      },
      {
        title: 'AS 26 Analysis & Verdict',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Rule (Para 35-37):</strong> Internally generated goodwill, brands, mastheads, publishing titles, customer lists, and items similar in substance should **not be recognised as intangible assets**. <PdfRefInline page={10} /></p>
            <p><strong>Verdict:</strong> The capitalization is completely prohibited. Internally generated brands and publishing titles do not meet the identifiability and cost-measurement criteria of AS 26 because they cannot be separated from the business as a whole, and their cost cannot be distinguished from the cost of developing the business. The ₹12,00,000 must be expensed in the P&amp;L statement.</p>
          </div>
        )
      }
    ],
    examFocus: 'Do not capitalize internally generated brand names, publishing titles, mastheads, or customer lists. Purchased brands or publishing titles (acquired for cash) CAN be capitalized at their purchase price, but internally generated ones must always be expensed.',
    examFocusType: 'concept'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-26-1',
    title: 'Audit Case — Capitalization of Start-up / Preliminary Expenses',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Context:</strong> StartupCorp Ltd. incurs <strong>₹5,00,000</strong> as incorporation fees, lawyer fees, and initial pre-operating start-up costs during its setup phase. The company wants to defer this cost and capitalize it as an intangible asset (Deferred Start-up Asset) to be amortized over 5 years.</p>
            <p><strong>Issue:</strong> Evaluate this accounting treatment under AS 26.</p>
          </div>
        )
      },
      {
        title: 'Audit Analysis & Verdict',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Reference (Para 56):</strong> Expenditure on start-up activities (preliminary expenses, incorporation costs, pre-operating expenses) should be recognized as an expense when it is incurred. <PdfRefInline page={11} /></p>
            <p><strong>Verdict:</strong> The auditor must reject capitalization. Start-up costs do not result in the creation of an identifiable intangible asset that can be controlled by the enterprise. The entire ₹5,00,000 must be expensed in the first year.</p>
          </div>
        )
      }
    ],
    examFocus: 'Preliminary expenses and pre-operating start-up costs must be expensed in the Profit and Loss statement in the year they are incurred. Deferring or amortizing them over multiple years is completely prohibited under AS 26.',
    examFocusType: 'focus'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-26-1',
    title: 'Regulatory Observation — Web Site Development Costs capitalization guidelines',
    category: 'Regulatory Observation',
    panels: [
      {
        title: 'Regulatory Guideline',
        content: (
          <div>
            <p>An enterprise may incur internal expenditure on the development and operation of its own website (for internal or external access):</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
              <li><strong>Planning phase:</strong> Expensed immediately.</li>
              <li><strong>Development phase:</strong> Capitalized if and only if the website can generate future economic benefits (e.g. an e-commerce website that can receive orders).</li>
              <li><strong>Operating phase (content updates, hosting):</strong> Expensed as operating costs.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Websites developed solely for promoting and advertising the enterprise\'s products do NOT qualify for capitalization. Website development costs are capitalized only if the site is used for transaction processing (e.g. booking orders).',
    examFocusType: 'concept'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'court-26-1',
    title: 'Judicial Case — Underwriting Commission and Share Issue Expenses write-offs',
    category: 'Landmark Precedent',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Delta Power Ltd. capitalized <strong>₹8,00,000</strong> share issue expenses and underwriting commission as an intangible asset. The company argued that since the share capital raised will benefit the company for its entire life, these expenses should be capitalized.</p>
          </div>
        )
      },
      {
        title: 'Legal Verdict',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Rule (Para 56):</strong> Share issue expenses and underwriting commissions do not create an identifiable intangible asset. They are transaction costs that must be adjusted against securities premium as per Section 52 of the Companies Act 2013 or expensed.</p>
            <p><strong>Verdict:</strong> Capitalization as an intangible asset is prohibited. The company was required to adjust the share issue costs against securities premium or expense them, not report them as intangible assets.</p>
          </div>
        )
      }
    ],
    examFocus: 'Do not confuse share issue expenses with intangible assets. Under AS 26, they do not qualify as intangible assets and must be written off.',
    examFocusType: 'adjustment'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-26-1',
    title: 'Exam Corner — Development Phase Capitalization Checklist (The 6 Criteria)',
    category: 'Exam Corner',
    panels: [
      {
        title: 'The 6 Criteria Checklist',
        content: (
          <div className="space-y-2 text-xs font-mono">
            <p>To capitalize development costs, the enterprise must demonstrate:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>1. <strong>Technical Feasibility</strong> of completing the asset.</li>
              <li>2. <strong>Intention</strong> to complete and use or sell it.</li>
              <li>3. <strong>Ability</strong> to use or sell the asset.</li>
              <li>4. How the asset will generate <strong>Future Benefits</strong> (active market).</li>
              <li>5. Availability of <strong>Resources</strong> (technical/financial) to complete.</li>
              <li>6. Ability to <strong>Measure</strong> the development cost reliably.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'In exams, if even one of these 6 conditions is not met, the entire expenditure must be expensed in the P&L statement.',
    examFocusType: 'adjustment'
  }
]
