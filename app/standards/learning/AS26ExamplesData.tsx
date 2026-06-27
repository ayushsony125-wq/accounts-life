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
    title={`Open ICAI AS 26 PDF — Page ${page}`}
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
    id: 'illus-26-1',
    title: 'ICAI Illustration 1 — Software Development Costs: Research Phase vs Development Phase (PIRATE Criteria)',
    category: 'Official ICAI Illustration',
    pdfPage: 14,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Tech Solutions Ltd. (FY 2023-24)</p>
            <p>The company is developing a new enterprise resource planning (ERP) software platform. Costs incurred during the year:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Phase 1 — Research (studying market, evaluating technologies): ₹40,00,000</li>
              <li>Phase 2 — Development (coding, testing, debugging, documentation): ₹1,20,00,000</li>
              <li>Phase 3 — Post-delivery maintenance: ₹15,00,000</li>
            </ul>
            <p className="mt-2">The development team has confirmed technical feasibility, management has approved the project for completion, and initial customer orders worth ₹5 crores have been received.</p>
          </div>
        )
      },
      {
        title: 'PIRATE Criteria Assessment (Para 44)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Development costs can be capitalized only if ALL 6 PIRATE criteria are satisfied:</p>
            <div className="overflow-x-auto mt-1">
              <table className="w-full text-xs border-collapse border border-slate-200 dark:border-slate-800">
                <thead><tr className="bg-slate-100 dark:bg-slate-900"><th className="border p-1.5">Criterion</th><th className="border p-1.5">Test</th><th className="border p-1.5">Status</th></tr></thead>
                <tbody>
                  <tr><td className="border p-1.5 font-bold">P</td><td className="border p-1.5">Technical feasibility to complete</td><td className="border p-1.5 text-emerald-600 dark:text-emerald-400">✓ Met</td></tr>
                  <tr className="bg-blue-50/10"><td className="border p-1.5 font-bold">I</td><td className="border p-1.5">Intention to complete and use/sell</td><td className="border p-1.5 text-emerald-600 dark:text-emerald-400">✓ Met (mgmt approval)</td></tr>
                  <tr><td className="border p-1.5 font-bold">R</td><td className="border p-1.5">Resources available to complete</td><td className="border p-1.5 text-emerald-600 dark:text-emerald-400">✓ Met</td></tr>
                  <tr className="bg-blue-50/10"><td className="border p-1.5 font-bold">A</td><td className="border p-1.5">Ability to use or sell the intangible</td><td className="border p-1.5 text-emerald-600 dark:text-emerald-400">✓ Met (orders received)</td></tr>
                  <tr><td className="border p-1.5 font-bold">T</td><td className="border p-1.5">Technically feasible</td><td className="border p-1.5 text-emerald-600 dark:text-emerald-400">✓ Met</td></tr>
                  <tr className="bg-blue-50/10"><td className="border p-1.5 font-bold">E</td><td className="border p-1.5">Expected future economic benefits</td><td className="border p-1.5 text-emerald-600 dark:text-emerald-400">✓ Met (customer orders)</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      },
      {
        title: 'Accounting Treatment',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-2">
            <p className="font-sans font-bold">Phase 1 — Research (₹40,00,000):</p>
            <p>Dr. Research Expense (P&amp;L)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹40,00,000</p>
            <p>&nbsp;&nbsp;Cr. Cash/Bank&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹40,00,000</p>
            <p className="font-sans mt-2 font-bold">Phase 2 — Development (₹1,20,00,000):</p>
            <p>Dr. Internally Generated Intangible (B/S)&nbsp;₹1,20,00,000</p>
            <p>&nbsp;&nbsp;Cr. Cash/Bank&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹1,20,00,000</p>
            <p className="font-sans mt-2 font-bold">Phase 3 — Post-delivery maintenance (₹15,00,000):</p>
            <p>Dr. Maintenance Expense (P&amp;L)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹15,00,000</p>
          </div>
        )
      },
      {
        title: 'Amortization After Completion',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>After the ERP software is ready for use:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The ₹1,20,00,000 is amortized over its useful life</li>
              <li>Under AS 26, the maximum amortization period is <strong>10 years</strong> (rebuttable presumption)</li>
              <li>Amortization starts from the date the asset is available for use</li>
              <li>SLM is the default method unless another pattern better reflects usage</li>
            </ul>
            <p className="mt-2">If useful life = 5 years: Annual amortization = ₹24,00,000</p>
          </div>
        )
      }
    ],
    examFocus: 'Research phase costs are ALWAYS expensed. Development phase costs are capitalized ONLY if all 6 PIRATE criteria are met simultaneously.',
    examFocusType: 'trap'
  },
  {
    id: 'illus-26-2',
    title: 'ICAI Illustration 2 — Internally Generated Goodwill vs Purchased Goodwill Recognition Rule',
    category: 'Official ICAI Illustration',
    pdfPage: 18,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario 1 — Internally Generated:</strong> Zenith Brand Ltd. has built a strong brand over 20 years. A consulting firm values the brand at ₹500 crores. The company wants to recognize this as an intangible asset on its balance sheet.</p>
            <p className="mt-2"><strong>Scenario 2 — Purchased Goodwill:</strong> Zenith acquires a competitor for ₹300 crores. The fair value of net identifiable assets = ₹240 crores. Goodwill on acquisition = ₹60 crores.</p>
          </div>
        )
      },
      {
        title: 'AS 26 Rules: Internally Generated vs Purchased',
        content: (
          <div className="space-y-3 text-xs leading-relaxed">
            <p><strong>Scenario 1 — NOT ALLOWED:</strong> Internally generated goodwill SHALL NOT be recognized as an asset (Para 36). The brand built internally cannot be capitalized because:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cost cannot be measured reliably (no arm's length transaction)</li>
              <li>Not identifiable as separable from the business as a whole</li>
              <li>Not controlled by the enterprise in a way that can be measured</li>
            </ul>
            <p className="mt-2"><strong>Scenario 2 — ALLOWED:</strong> Purchased goodwill of ₹60 crores IS recognized because:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Arises from an arm's length transaction (cost is reliably measurable)</li>
              <li>Future economic benefits are probable (part of a going concern acquisition)</li>
              <li>Amortized over useful life, not exceeding 10 years under AS 26</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Other Internally Generated Intangibles (Para 52)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The following internally generated intangibles are ALSO not recognized under AS 26:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Internally generated brands, mastheads, publishing titles</li>
              <li>Customer lists (internally generated)</li>
              <li>Items similar in substance to internally generated goodwill</li>
            </ul>
            <p className="mt-2">Reason: Expenditure on these cannot be distinguished from the cost of developing the business as a whole.</p>
          </div>
        )
      }
    ],
    examFocus: 'Internally generated goodwill, brands, customer lists — NEVER recognized under AS 26. Purchased goodwill from an acquisition — ALWAYS recognized.',
    examFocusType: 'concept'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-26-1',
    title: 'Business Case — Patent Acquisition and Useful Life Determination (Definite vs Indefinite)',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Sunrise Pharma Ltd. acquires a drug patent for ₹15,00,00,000. Details:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Legal patent life: 20 years (remaining from grant date)</li>
              <li>Expected commercial life of the drug: 8 years (based on market studies and competitive pipeline)</li>
              <li>No active market for this patent exists</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Useful Life Determination (Para 63–67)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Under AS 26, the useful life of an intangible is the <strong>shorter of its legal life and its economic useful life</strong>.</p>
            <p>Para 63 factors for estimating useful life:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Expected usage of the asset</li>
              <li>Typical product life cycles and public information about similar assets</li>
              <li>Technical, technological, commercial, or other types of obsolescence</li>
              <li>Legal or similar limits on the use of the asset (patent term)</li>
            </ul>
            <p className="mt-2"><strong>Conclusion:</strong> Useful life = min(20 years legal, 8 years economic) = <strong>8 years</strong>.</p>
            <p>Annual amortization = ₹15,00,00,000 ÷ 8 = <strong>₹1,87,50,000</strong></p>
          </div>
        )
      },
      {
        title: 'No Active Market = Cost Model Only',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Under AS 26, intangibles can be carried at:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Cost model:</strong> Cost less accumulated amortization less impairment — always available</li>
              <li><strong>Revaluation model:</strong> Fair value less subsequent amortization — ONLY if an active market exists for the intangible</li>
            </ul>
            <p className="mt-2">Since no active market exists for this specific drug patent, the revaluation model is NOT available. Sunrise Pharma must use the cost model.</p>
          </div>
        )
      }
    ],
    examFocus: 'For intangible assets, useful life = shorter of legal life and economic life. Revaluation model is only available when an active market for the specific intangible exists.',
    examFocusType: 'trick'
  },
  {
    id: 'case-26-2',
    title: 'Business Case — Computer Software: When Is It a PPE vs Intangible Asset?',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Manufacturing Ltd. acquires the following software in FY 2023-24:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Windows OS for factory computers: ₹80,000 (cannot use hardware without OS)</li>
              <li>ERP software license for business operations: ₹12,00,000</li>
              <li>Embedded software in a CNC machine (cannot be separated): ₹3,00,000 (part of machine cost)</li>
            </ul>
          </div>
        )
      },
      {
        title: 'AS 26 Classification Rules',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Para 2 — Classification of Computer Software:</strong></p>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Operating System integral to hardware</strong> (Windows OS for computers): Treated as part of <strong>hardware (PPE)</strong> — cannot function without it, so it's part of the hardware cost.</li>
              <li><strong>Application software</strong> (ERP license): Separate from hardware, can function on different hardware → <strong>Intangible Asset</strong> under AS 26.</li>
              <li><strong>Embedded software in machinery</strong> (CNC machine): Cannot be separated from hardware → Treated as <strong>PPE</strong> (part of machinery cost).</li>
            </ol>
          </div>
        )
      },
      {
        title: 'Accounting Treatment Summary',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p>Windows OS (₹80,000):</p>
            <p>&nbsp;&nbsp;→ Capitalize as part of Computer (PPE). Depreciate with hardware.</p>
            <p>ERP Software (₹12,00,000):</p>
            <p>&nbsp;&nbsp;→ Capitalize as Intangible Asset. Amortize over useful life (max 10 years).</p>
            <p>CNC Embedded Software (₹3,00,000):</p>
            <p>&nbsp;&nbsp;→ Part of Plant &amp; Machinery (PPE). Depreciate with machine.</p>
          </div>
        )
      }
    ],
    examFocus: 'OS software that is integral to hardware → PPE. Standalone application software → Intangible. Embedded software that cannot be separated → PPE with the hardware.',
    examFocusType: 'adjustment'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-26-1',
    title: 'Audit Case Study — Improperly Capitalizing Research Costs as Development Costs',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> During audit of Zenith Biotech Ltd., the auditor finds that ₹8,50,00,000 has been capitalized as "R&amp;D Intangible Asset" on the balance sheet. On inquiry, it emerges that the amount includes:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Phase I clinical trials (basic research): ₹3,00,00,000</li>
              <li>Phase II trials (applied research): ₹2,50,00,000</li>
              <li>Phase III trials (development — drug proven, filing application): ₹3,00,00,000</li>
            </ul>
            <p className="mt-2">Management's position: The entire amount is development cost as it will ultimately result in a new drug.</p>
          </div>
        )
      },
      {
        title: 'Auditor Analysis — Research vs Development Boundary',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Under AS 26, research costs must be expensed as incurred. Development costs may be capitalized only when PIRATE criteria are met.</p>
            <p><strong>Phase I and II trials = Research:</strong> At these stages, technical feasibility is not established. The PIRATE criteria (especially technical feasibility P, and expected future benefits E) cannot be demonstrated. Cost must be expensed: ₹3Cr + ₹2.5Cr = <strong>₹5,50,00,000 to P&amp;L</strong>.</p>
            <p><strong>Phase III trials = Development:</strong> Drug efficacy is proven, application for approval is filed, PIRATE criteria are demonstrable. <strong>₹3,00,00,000 may be capitalized.</strong></p>
          </div>
        )
      },
      {
        title: 'Required Adjustment',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p className="font-sans font-bold">Adjustment Required:</p>
            <p>Dr. Research Expense (P&amp;L)&nbsp;&nbsp;₹5,50,00,000</p>
            <p>&nbsp;&nbsp;Cr. Intangible Asset (B/S)&nbsp;&nbsp;&nbsp;&nbsp;₹5,50,00,000</p>
            <p className="font-sans mt-2">(Reclassification of research costs improperly capitalized)</p>
            <p className="font-sans mt-2">Net intangible to remain: ₹3,00,00,000 (Phase III development only)</p>
          </div>
        )
      }
    ],
    examFocus: 'Research phase costs must ALWAYS be expensed — management cannot capitalize them by arguing they are part of a longer development project.',
    examFocusType: 'focus'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-26-1',
    title: 'NFRA Observation — Excessive Useful Life Assigned to Software Intangibles (10-Year Cap)',
    category: 'Regulatory Observations',
    panels: [
      {
        title: 'NFRA Finding',
        content: (
          <div>
            <p><strong>NFRA Audit Quality Review:</strong> Multiple companies assigned 15–20 year useful lives to ERP software and other technology intangibles, without adequate evidence to rebut the 10-year presumption under AS 26.</p>
          </div>
        )
      },
      {
        title: 'AS 26 Rebuttable Presumption (Para 63)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Para 63: There is a rebuttable presumption that the useful life of an intangible asset will not exceed <strong>10 years</strong> from the date the asset is available for use.</p>
            <p>If a company wants to use MORE than 10 years, it must:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide convincing evidence that the useful life exceeds 10 years</li>
              <li>Disclose the reasons why the presumption has been rebutted</li>
              <li>Perform annual impairment testing when useful life exceeds 10 years</li>
            </ul>
            <p className="mt-2">NFRA's observation: Companies were using 15-year lives for ERP software without any evidence of how ERP software retains value beyond 10 years given rapid technological change.</p>
          </div>
        )
      },
      {
        title: 'Audit Implication',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>Auditors must specifically challenge useful lives assigned to intangibles exceeding 10 years. Required evidence includes:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Historical data showing similar assets remain productive beyond 10 years</li>
              <li>Management's assessment of technological obsolescence risk</li>
              <li>Contractual rights or licenses extending economic benefits beyond 10 years</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'For intangible assets: 10-year maximum is a PRESUMPTION that can be rebutted with convincing evidence. Annual impairment testing is MANDATORY when you use more than 10 years.',
    examFocusType: 'adjustment'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'judicial-26-1',
    title: 'Landmark Case — Spectrum/Telecom License: Intangible Asset Recognition and Amortization Period',
    category: 'Landmark Judicial Cases',
    panels: [
      {
        title: 'Facts & Principle',
        content: (
          <div>
            <p><strong>Scenario based on Telecom Sector Practice:</strong></p>
            <p>Telecom companies paid substantial amounts for spectrum licenses (e.g., 4G/5G spectrum). These licenses have a defined legal term (20 years) and confer the right to use specific radio frequencies for the stated period.</p>
          </div>
        )
      },
      {
        title: 'ICAI Guidance & AS 26 Application',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Recognition:</strong> Spectrum license qualifies as an intangible asset under AS 26 — it is identifiable (separable/arising from legal rights), non-monetary, and costs can be measured reliably.</p>
            <p><strong>Useful Life:</strong> The 10-year presumption is rebutted — the license has a legal term of 20 years and economic benefits are expected throughout. If renewal is highly probable, useful life may extend beyond 20 years.</p>
            <p><strong>Amortization:</strong> Over the actual license period (20 years) if renewal is not certain. Annual impairment testing applies since useful life exceeds 10 years.</p>
          </div>
        )
      }
    ],
    examFocus: 'Telecom spectrum licenses are intangible assets amortized over their legal license period. If the license exceeds 10 years, annual impairment testing is mandatory.',
    examFocusType: 'concept'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-26-1',
    title: 'Exam Corner — AS 26 Quick Reference: Recognition, Amortization, Revaluation, and Disclosure',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'Recognition Flowchart',
        content: (
          <div className="text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1">
            <p className="font-sans font-bold">Step 1: Is it an intangible asset?</p>
            <p>= Identifiable + Non-monetary + No physical substance</p>
            <p className="font-sans font-bold mt-2">Step 2: Recognition criteria met?</p>
            <p>= Probable future economic benefits + Reliably measurable cost</p>
            <p className="font-sans font-bold mt-2">Step 3: If internally generated:</p>
            <p>= Research phase → EXPENSE always</p>
            <p>= Development phase → Capitalize ONLY if all 6 PIRATE criteria met</p>
            <p className="font-sans font-bold mt-2">Special rule: Internally generated goodwill → NEVER recognize</p>
          </div>
        )
      },
      {
        title: 'Amortization Rules',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Useful life ≤ 10 years:</strong> Amortize over that life. No annual impairment test required.</li>
              <li><strong>Useful life &gt; 10 years:</strong> Must rebut the 10-year presumption with convincing evidence. Annual impairment test required.</li>
              <li><strong>Indefinite useful life:</strong> NO amortization. Annual impairment test MANDATORY.</li>
              <li><strong>Method:</strong> SLM default. Any systematic method that reflects consumption pattern is acceptable.</li>
              <li><strong>Residual value:</strong> Assumed to be zero unless there is a commitment to purchase at end of life or an active market exists.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Key Exam Traps',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <ul className="list-disc pl-5 space-y-2">
              <li>Internally generated brands, mastheads, customer lists, publishing titles → <strong>NEVER capitalize</strong>.</li>
              <li>OS software integral to hardware → <strong>PPE, not intangible</strong>.</li>
              <li>Revaluation model → only available if <strong>active market exists</strong> for the specific intangible.</li>
              <li>Amortization starts when the asset is <strong>available for use</strong>, not when it starts being used.</li>
              <li>Computer software annual licenses (not perpetual) → expense over the license period, not capitalize.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Three intangibles that can NEVER be recognized under AS 26: internally generated goodwill, internally generated brands, internally generated customer lists.',
    examFocusType: 'trick'
  }
]
