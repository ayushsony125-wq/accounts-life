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
    title={`Open ICAI AS 29 PDF — Page ${page}`}
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
    id: 'illus-29-1',
    title: 'ICAI Illustration 1 — Outstanding Lawsuits & Expected Value Calculation',
    category: 'Official ICAI Illustration',
    pdfPage: 17,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Facts:</strong> At the end of the year, a company has 20 outstanding lawsuits. The possible outcomes estimated by the Board are:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>First 5 cases: 100% probability of winning (Loss = 0).</li>
              <li>Next 10 cases: 50% chance of winning (Loss = 0). 40% chance of low damages (₹1,20,000). 10% chance of high damages (₹2,00,000).</li>
              <li>Remaining 5 cases: 50% chance of winning (Loss = 0). 30% chance of low damages (₹1,00,000). 20% chance of high damages (₹2,10,000).</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Probability & Disclosure',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Analysis:</strong> For a provision, the outflow must be probable (&gt;50% likelihood). Here, the chance of losing each case is only 50% (not probable). Thus, no provision is recognized. However, because the outflow is not remote, they must be disclosed as a <strong>Contingent Liability</strong>.</p>
            <p><strong>Expected Loss Calculation for Disclosure:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Expected Loss for next 10 cases: (40% * 1.2L + 10% * 2L) * 10 = (48k + 20k) * 10 = <strong>₹6,80,000</strong>.</li>
              <li>Expected Loss for last 5 cases: (30% * 1L + 20% * 2.1L) * 5 = (30k + 42k) * 5 = <strong>₹3,60,000</strong>.</li>
              <li>Total expected loss for note disclosure = 6,80,000 + 3,60,000 = <strong>₹10,40,000</strong>.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Do not create provisions for individual lawsuits where the chance of losing is 50% or less. Disclose the expected value of the loss as a contingent liability in the notes to accounts.',
    examFocusType: 'trap'
  },
  {
    id: 'illus-29-2',
    title: 'ICAI Illustration 2 — Sales Tax Demand & wage Arrears paid Under Protest',
    category: 'Official ICAI Illustration',
    pdfPage: 19,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Situations:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Case A: Sales tax demand of <strong>₹2.76 crore</strong> is received. The company appeals against ₹2.10 crore, and does not appeal against ₹0.66 crore. The company pays the entire due under protest.</li>
              <li>Case B: A wage agreement in May 20X2 increases wages retrospectively from June 20X1. Arrears are to be settled at retirement, but must be deposited in Govt Bonds by September 20X2.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Accounting Treatment',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Resolution:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Case A: Since the company is not appealing the ₹0.66 crore portion, it represents a present obligation. A provision of <strong>₹0.66 crore</strong> must be recognized. The remaining ₹2.10 crore paid under protest is treated as a loan/advance and disclosed as a <strong>Contingent Liability of ₹2.10 crore</strong>.</li>
              <li>Case B: The arrears from June 20X1 to March 20X2 are a present obligation resulting from a past event. They must be provided for in the accounts for the year ended 31st March 20X2.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Any portion of a tax demand that is not appealed represents a clear present obligation and must be provided for. The appealed portion represents a possible obligation and is disclosed as a contingent liability.',
    examFocusType: 'adjustment'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'business-29-1',
    title: 'Reimbursements: Environmental Cleanup & Supplier Indemnities',
    category: 'Business Application Case',
    panels: [
      {
        title: 'Scenario',
        content: (
          <div>
            <p><strong>Case:</strong> ChemGas India Ltd. suffers a gas leak due to a faulty valve supplied by ValveCorp. The government fines ChemGas <strong>₹50,00,000</strong> for cleanup. Under the purchase contract, ValveCorp is legally bound to indemnify ChemGas for any damage caused by valve defects.</p>
            <p className="mt-2"><strong>Issue:</strong> How should ChemGas record the fine and the reimbursement claim?</p>
          </div>
        )
      },
      {
        title: 'Accounting Treatment',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Rule (Para 46):</strong> Provisions and reimbursements must be accounted for as separate assets and liabilities. They cannot be net-off on the face of the balance sheet.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Provision:</strong> Recognize a provision of <strong>₹50,00,000</strong> for the cleanup fine immediately, as there is a present legal obligation.</li>
              <li><strong>Reimbursement Asset:</strong> Recognize a separate asset of <strong>₹50,00,000</strong> only when it is <strong>virtually certain</strong> that ValveCorp will pay the indemnity (e.g. they have accepted liability in writing).</li>
              <li><strong>P&amp;L Presentation:</strong> In the P&amp;L statement, the cleanup expense can be offset/net-off against the reimbursement income.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Do not net-off the provision and the reimbursement asset in the balance sheet. They must be shown separately as a liability and an asset. Net-off is permitted only in the Profit and Loss statement.',
    examFocusType: 'concept'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-29-1',
    title: 'Audit Program: Verifying Provisions & Vouching Warranty Reserves',
    category: 'Audit Checklist Case',
    panels: [
      {
        title: 'Audit Objectives',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Key Objectives:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ensure that the creation of provisions is based on objective evidence (not for profit smoothing).</li>
              <li>Verify that warranty provisions are calculated using a statistical analysis of past repair/replacement rates.</li>
              <li>Check that unused provisions are reviewed and reversed if the outflow of resources is no longer probable.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Audit Procedures & Checkpoints',
        content: (
          <div className="space-y-2 text-xs">
            <ul className="list-disc pl-5 space-y-1">
              <li>Review the company\'s historical warranty claim history to test the reliability of the warranty reserve percentage.</li>
              <li>Vouch the movement in provisions (Opening balance, additions, utilization, reversals, Closing balance).</li>
              <li>Review subsequent event logs (up to the date of board approval) to evaluate if any contingent liabilities have materialized.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Verify that provisions are used only for the expenditures for which they were originally recognized. Utilizing provisions for other purposes is a major audit exception.',
    examFocusType: 'focus'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-29-1',
    title: 'Regulatory Observation: Restructuring Provisions & Closure of Operations',
    category: 'Regulatory Observation',
    panels: [
      {
        title: 'Scenario',
        content: (
          <div>
            <p><strong>Facts:</strong> In December 20X1, the Board of Directors of SteelCo approved a detailed plan to close its forging division. The plan involves relocating 50 employees and paying redundancy compensation of <strong>₹20,00,000</strong>. The division closure was announced to the public in January 20X2.</p>
            <p className="mt-2"><strong>Issue:</strong> Can SteelCo recognize a restructuring provision as of 31st December 20X1?</p>
          </div>
        )
      },
      {
        title: 'Resolution',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Rule (Para 51):</strong> A constructive obligation for restructuring arises only when the enterprise has a detailed formal plan AND has raised a valid expectation in those affected by starting to implement the plan or announcing its main features to them.</p>
            <p>Since the plan was only approved internally in December 20X1 and not announced to employees/public until January 20X2, there is no obligating event as of 31st December 20X1. <strong>No provision can be recognized</strong> in the 20X1 financial statements. It can only be recognized in 20X2.</p>
          </div>
        )
      }
    ],
    examFocus: 'Internal board approval of a restructuring plan is not an obligating event. There must be an announcement or implementation that creates a constructive obligation before the balance sheet date.',
    examFocusType: 'trap'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'judicial-29-1',
    title: 'Landmark Precedents: Onerous Contracts & Obligating Events',
    category: 'Judicial Precedent Case',
    panels: [
      {
        title: 'Ruling Principles',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Key Principles:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>An onerous contract is one where the unavoidable costs of meeting the obligations exceed the economic benefits expected to be received.</li>
              <li>If an executory contract becomes onerous, the present obligation under the contract must be recognized as a provision under AS 29.</li>
              <li>A provision is not recognized for future operating losses because they do not arise from a past event or a present obligation.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'For onerous contracts, provision is recognized for the lower of (a) the cost of fulfilling the contract or (b) any penalties/compensation arising from failure to fulfill it.',
    examFocusType: 'concept'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-29-1',
    title: 'Exam Corner — Warranty Provisions & Statistics-based Calculations',
    category: 'Exam Corner',
    panels: [
      {
        title: 'Problem Statement',
        content: (
          <div>
            <p><strong>Scenario:</strong> Electro Appliances sells 1,000 units with a 1-year repair warranty. Based on past experience:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>75% of products exhibit no defects.</li>
              <li>15% exhibit minor defects (average repair cost = ₹1,000).</li>
              <li>10% exhibit major defects (average repair cost = ₹5,000).</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Step-by-Step Calculation',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Calculation of Expected Value:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Minor defects cost: 15% of 1,000 units * ₹1,000 = 150 * ₹1,000 = <strong>₹1,50,000</strong>.</li>
              <li>Major defects cost: 10% of 1,000 units * ₹5,000 = 100 * ₹5,000 = <strong>₹5,00,000</strong>.</li>
              <li>No defects cost: 75% of 1,000 units * ₹0 = <strong>₹0</strong>.</li>
              <li>Total warranty provision required = 1,50,000 + 5,00,000 = <strong>₹6,50,000</strong>.</li>
            </ul>
            <p className="mt-1"><strong>Journal Entry:</strong> Debit Warranty Expense A/c (P&amp;L) ₹6,50,000, Credit Provision for Warranty A/c (Liability) ₹6,50,000.</p>
          </div>
        )
      }
    ],
    examFocus: 'When measuring a provision for a large population of items (like warranties), use the expected value method by weighting all possible outcomes by their associated probabilities.',
    examFocusType: 'focus'
  }
]
