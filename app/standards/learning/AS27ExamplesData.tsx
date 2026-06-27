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
    title={`Open ICAI AS 27 PDF — Page ${page}`}
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
    id: 'illus-27-1',
    title: 'ICAI Illustration 1 — Proportionate Consolidation of a Jointly Controlled Entity',
    category: 'Official ICAI Illustration',
    pdfPage: 12,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>JV Arrangement:</strong> Alpha Ltd. (50%), Beta Ltd. (30%), and Gamma Ltd. (20%) form a Jointly Controlled Entity (JCE) — Zenith JV Ltd. — under a contractual agreement requiring unanimous consent for key decisions.</p>
            <p className="mt-2">Zenith JV Ltd.'s financials (FY 2023-24):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Total Assets: ₹20,00,00,000</li>
              <li>Total Revenue: ₹12,00,00,000</li>
              <li>Net Profit: ₹3,00,00,000</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Proportionate Consolidation Method (Para 15)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Para 15 — Benchmark (Allowed) Treatment:</strong> Under proportionate consolidation, each venturer includes its share of the JCE's assets, liabilities, revenues, and expenses in its own financial statements, line by line.</p>
            <p><strong>Alpha's Share (50%):</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Assets to include: 50% × ₹20Cr = <strong>₹10,00,00,000</strong></li>
              <li>Revenue to include: 50% × ₹12Cr = <strong>₹6,00,00,000</strong></li>
              <li>Profit to include: 50% × ₹3Cr = <strong>₹1,50,00,000</strong></li>
            </ul>
            <p className="mt-2">These amounts are added line-by-line to Alpha's own balance sheet and P&amp;L — NOT as a single "investment" line.</p>
          </div>
        )
      },
      {
        title: 'Alternative — Equity Method (Para 38)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Para 38 Allowed Alternative:</strong> A venturer may, as an alternative, use the equity method for its interest in a jointly controlled entity (as used in AS 23 for associates).</p>
            <p><strong>Equity Method for Alpha:</strong> Investment carried at one line on the balance sheet. Share of JCE profit (₹1.5Cr) recognized in P&amp;L.</p>
            <p className="mt-2">Both methods are permitted under AS 27. The equity method is simpler; proportionate consolidation provides more transparency about JCE assets/liabilities.</p>
          </div>
        )
      },
      {
        title: 'Joint Control: The Defining Feature',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Para 3 — Joint Control:</strong> The contractually agreed sharing of control over an economic activity. Key feature: decisions on all strategic and financial activities require the unanimous consent of ALL parties sharing control.</p>
            <p>If one party can independently make decisions → No joint control → Cannot apply AS 27.</p>
          </div>
        )
      }
    ],
    examFocus: 'Proportionate consolidation = add venturer\'s % share of EACH LINE of JCE financials. Equity method = single investment line. Both are permitted under AS 27.',
    examFocusType: 'concept'
  },
  {
    id: 'illus-27-2',
    title: 'ICAI Illustration 2 — Jointly Controlled Operations and Jointly Controlled Assets',
    category: 'Official ICAI Illustration',
    pdfPage: 18,
    panels: [
      {
        title: 'Three Types of Joint Ventures (Para 8)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>AS 27 covers THREE forms of joint ventures:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Jointly Controlled Operations (JCO):</strong> Venturers use their own assets and resources to perform operations. No separate entity. Example: Two airlines sharing a route.</li>
              <li><strong>Jointly Controlled Assets (JCA):</strong> Venturers jointly own and control specific assets. No separate entity. Example: Two oil companies sharing a pipeline.</li>
              <li><strong>Jointly Controlled Entity (JCE):</strong> A separate legal entity (company/partnership) is established. Most common form.</li>
            </ol>
          </div>
        )
      },
      {
        title: 'JCO Accounting (Para 13)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>In a Jointly Controlled Operation, each venturer recognizes IN ITS OWN BOOKS:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Assets it controls and liabilities it incurs</li>
              <li>Expenses it incurs and revenue from the sale of its share of output</li>
            </ul>
            <p>No separate financial statements are required for JCOs.</p>
          </div>
        )
      },
      {
        title: 'JCA Accounting (Para 14)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>In a Jointly Controlled Asset, each venturer recognizes IN ITS OWN BOOKS:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Its share of the jointly controlled asset</li>
              <li>Its share of any liabilities incurred jointly</li>
              <li>Its own liabilities incurred with respect to the venture</li>
              <li>Income from the use/sale of its share of output, and its share of expenses</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'JCO and JCA: NO separate entity, NO proportionate consolidation needed — just account for your own share directly in your books. JCE requires proportionate consolidation or equity method.',
    examFocusType: 'trick'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-27-1',
    title: 'Business Case — Unrealized Profit Elimination in JCE Transactions (Downstream & Upstream)',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Alpha Ltd.</strong> (venturer, 40% in Zenith JCE Ltd.) sold equipment to Zenith JCE for ₹8,00,00,000. Alpha's cost = ₹6,00,00,000. Profit = ₹2,00,00,000. The equipment remains in Zenith JCE at year-end (not yet depreciated significantly).</p>
          </div>
        )
      },
      {
        title: 'AS 27 Unrealized Profit Rule (Para 34)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 34: A venturer shall not recognize gains or losses arising from transactions with a jointly controlled entity to the extent of the other venturers' interest in the JCE.</p>
            <p><strong>Computation (Downstream — Alpha sells to JCE):</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Total profit on sale = ₹2,00,00,000</li>
              <li>Alpha's own share (40%) in JCE = Eliminate</li>
              <li>Elimination = 40% × ₹2,00,00,000 = <strong>₹80,00,000</strong></li>
              <li>Recognized profit (kept) = 60% × ₹2,00,00,000 = ₹1,20,00,000</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Comparison with AS 21 Full Consolidation',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>In AS 21 (100% subsidiary): 100% of intra-group profit is eliminated regardless of MI%.</p>
            <p>In AS 27 (JCE — proportionate consolidation): Only the venturer's own share of profit is eliminated (not 100%). The other venturers' shares are already outside the venturer's financial statements.</p>
          </div>
        )
      }
    ],
    examFocus: 'In JCE unrealized profit elimination, only eliminate the venturer\'s OWN % share of profit — unlike full consolidation where 100% is eliminated.',
    examFocusType: 'trap'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-27-1',
    title: 'Audit Case Study — JCE Classified as Subsidiary Without Joint Control Evidence',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> Alpha Ltd. holds 50% in Zenith JV Ltd. The other 50% is held by Beta Ltd. Alpha fully consolidates Zenith JV Ltd. as a subsidiary in its CFS, arguing it has "effective control" because it provides all senior management.</p>
          </div>
        )
      },
      {
        title: 'Auditor Analysis: Control vs Joint Control',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The auditor must examine the JV agreement to determine whether JOINT CONTROL exists:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Does the agreement require UNANIMOUS consent for major decisions?</li>
              <li>Does Beta Ltd. have veto rights on strategic/financial decisions?</li>
              <li>Is there a joint management committee?</li>
            </ul>
            <p className="mt-2">If the agreement requires unanimous consent → Joint control exists → AS 27 (proportionate consolidation or equity method), NOT AS 21 (full consolidation).</p>
            <p>Providing senior management is an operational role — it does not override contractual joint control.</p>
          </div>
        )
      }
    ],
    examFocus: 'Full consolidation (AS 21) requires control. If a contractual arrangement requires unanimous consent for decisions, it is JOINT CONTROL under AS 27, not unilateral control.',
    examFocusType: 'focus'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-27-1',
    title: 'SEBI Observation — JV Losses Not Recognized in Venturer\'s Standalone Financials',
    category: 'Regulatory Observations',
    panels: [
      {
        title: 'SEBI Finding',
        content: (
          <div>
            <p><strong>SEBI Review:</strong> Several companies were carrying joint venture investments at cost in standalone financial statements, not recognizing their proportionate share of JCE losses, thereby overstating investment values and understating losses.</p>
          </div>
        )
      },
      {
        title: 'Correct Treatment in Standalone',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>In standalone financial statements, JCE investments are typically carried at COST per AS 13 (not equity method). However, investments must be tested for impairment.</p>
            <p>If the JCE has accumulated significant losses making the investment recoverable amount lower than cost → An impairment provision is required per AS 13/AS 28 even in standalone accounts.</p>
            <p className="mt-2">SEBI directed companies to assess impairment indicators on JCE investments and provide for diminution where the loss is other than temporary.</p>
          </div>
        )
      }
    ],
    examFocus: 'In standalone accounts, JCE investments are at COST. But if JCE has heavy losses, impairment testing under AS 13/AS 28 is mandatory — you cannot ignore them.',
    examFocusType: 'adjustment'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'judicial-27-1',
    title: 'Case Principle — When a JCE Becomes a Subsidiary (Loss of Joint Control)',
    category: 'Landmark Judicial Cases',
    panels: [
      {
        title: 'Principle & Scenario',
        content: (
          <div>
            <p><strong>Scenario:</strong> Alpha (50%) and Beta (50%) had a JCE — Zenith Power Ltd. Beta entered financial distress and transferred its 50% to Alpha under a distress sale. Alpha now owns 100%.</p>
          </div>
        )
      },
      {
        title: 'AS 27 → AS 21 Transition',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>When Alpha acquires Beta's shares, Zenith Power Ltd. becomes a wholly-owned subsidiary. AS 27 no longer applies. Alpha must transition to AS 21 full consolidation from the date of acquisition.</p>
            <p><strong>Accounting Steps at Transition:</strong></p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Cease proportionate consolidation</li>
              <li>Restate from acquisition date using full consolidation (AS 21)</li>
              <li>Compute goodwill/capital reserve on new acquisition basis</li>
              <li>Recognize minority interest (Nil, since now 100%)</li>
            </ol>
          </div>
        )
      }
    ],
    examFocus: 'When joint control ceases (one party acquires full control), the entity transitions from AS 27 (JCE) to AS 21 (subsidiary) accounting from the transition date.',
    examFocusType: 'concept'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-27-1',
    title: 'Exam Corner — Three Forms of JV, Accounting Methods, and Disclosure Requirements',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'AS 27 Quick Reference Matrix',
        content: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-200 dark:border-slate-800">
              <thead><tr className="bg-slate-100 dark:bg-slate-900"><th className="border p-2">Form</th><th className="border p-2">Separate Entity?</th><th className="border p-2">Accounting Treatment</th></tr></thead>
              <tbody>
                <tr><td className="border p-2 font-bold">JCO</td><td className="border p-2">No</td><td className="border p-2">Own assets, liabilities, revenue, expenses in own books</td></tr>
                <tr className="bg-blue-50/10"><td className="border p-2 font-bold">JCA</td><td className="border p-2">No</td><td className="border p-2">Own share of assets, liabilities, expenses in own books</td></tr>
                <tr><td className="border p-2 font-bold">JCE</td><td className="border p-2">Yes</td><td className="border p-2">Proportionate consolidation (benchmark) or Equity method (allowed)</td></tr>
              </tbody>
            </table>
          </div>
        )
      },
      {
        title: 'Disclosure Requirements (Para 42)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>A venturer must disclose:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Aggregate amount of contingent liabilities relating to its interests in JCEs (separately from other contingent liabilities)</li>
              <li>Capital commitments relating to JCEs (separately from other commitments)</li>
              <li>List of significant JCEs: name, country, proportion of ownership interest, and method of accounting used</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Key Exam Traps',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <ul className="list-disc pl-5 space-y-1">
              <li>JCO and JCA → No separate entity, no proportionate consolidation or equity method needed</li>
              <li>Unrealized profits in JCE → Eliminate only the venturer's OWN percentage (not 100%)</li>
              <li>Equity method is an ALTERNATIVE — not the benchmark — for JCE</li>
              <li>50% ownership ≠ automatically a JCE if no joint control agreement exists</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: '50% ownership does NOT automatically mean joint venture — the contractual agreement requiring unanimous consent is the defining feature of joint control under AS 27.',
    examFocusType: 'trick'
  },
  {
    id: 'exam-27-2',
    title: 'Exam Corner — Unrealized Profit Elimination in JCE Transactions',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'Downstream & Upstream Sales: JCE Rule',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Downstream Sale</strong> (Venturer sells goods to the JCE):</p>
            <p>The venturer must eliminate unrealized profit to the extent of its own proportionate interest in the JCE. If the goods are still in the JCE's closing inventory, the venturer must reverse profit equal to: Unrealized Profit × Venturer's % interest.</p>
            <p className="mt-2"><strong>Upstream Sale</strong> (JCE sells goods to the Venturer):</p>
            <p>Again, eliminate the venturer's proportionate share of unrealized profit included in the venturer's closing inventory.</p>
            <p className="mt-2"><strong>Key Difference from AS 21 (Subsidiary):</strong> In AS 21, 100% of inter-company profit is eliminated. In AS 27 JCE, only the venturer's OWN % share is eliminated.</p>
          </div>
        )
      },
      {
        title: 'Numerical Illustration',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p className="font-sans font-bold">Facts:</p>
            <p>Venturer A holds 40% in JCE. JCE sold goods to A for ₹10,00,000.</p>
            <p>Profit included in goods = ₹2,00,000.</p>
            <p>Goods are 50% unsold in A's books at year-end.</p>
            <p className="font-sans font-bold mt-2">Calculation:</p>
            <p>Unrealized Profit = ₹2,00,000 × 50% unsold = ₹1,00,000</p>
            <p>A's share to eliminate = ₹1,00,000 × 40% = <strong>₹40,000</strong></p>
            <p className="font-sans mt-1">Reduce inventory by ₹40,000 and reduce JCE investment by ₹40,000.</p>
          </div>
        )
      },
      {
        title: 'Proportionate Consolidation vs Equity Method',
        content: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-200 dark:border-slate-800">
              <thead><tr className="bg-slate-100 dark:bg-slate-900"><th className="border p-2">Feature</th><th className="border p-2">Proportionate Consolidation</th><th className="border p-2">Equity Method</th></tr></thead>
              <tbody>
                <tr><td className="border p-2">Balance Sheet</td><td className="border p-2">Shows venturer's share of each asset & liability line-by-line</td><td className="border p-2">Single line: "Investment in JCE"</td></tr>
                <tr className="bg-blue-50/10"><td className="border p-2">P&L</td><td className="border p-2">Shows venturer's share of each revenue & expense line</td><td className="border p-2">Single line: "Share of JCE profit/loss"</td></tr>
                <tr><td className="border p-2">AS 27 Status</td><td className="border p-2">Benchmark method</td><td className="border p-2">Allowed alternative</td></tr>
              </tbody>
            </table>
          </div>
        )
      }
    ],
    examFocus: 'In JCE, eliminate only the venturer\'s OWN % of unrealized profit — NOT 100%. This is the most tested AS 27 numerical adjustment in CA exams.',
    examFocusType: 'adjustment'
  }
]
