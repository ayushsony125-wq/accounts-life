const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../app/standards/learning/AS1ExamplesData.tsx');

const content = `
export const regulatoryObservations: CaseStudy[] = [
  {
    id: "4-1",
    title: "Observation 4.1: NFRA — Boilerplate and Generic Disclosure of Accounting Policies",
    category: "Regulatory Observation",
    panels: [
      {
        title: "Regulator Citation & Focus Area",
        content: (
          <div className="space-y-2">
            <p><strong>Regulator:</strong> National Financial Reporting Authority (NFRA) under Section 132 of Companies Act.</p>
            <p><strong>Focus Area:</strong> Boilerplate, non-specific disclosure of inventory cost formulas and revenue recognition timing in annual corporate reports.</p>
            <p><strong>The Trigger:</strong> During inspections of large listed steel and power sector companies, NFRA noticed that companies copy-pasted general standard descriptions rather than disclosing their specific methods.</p>
          </div>
        )
      },
      {
        title: "Failure Details & Accounting Violation",
        content: (
          <div className="space-y-2">
            <p><strong>The Failure:</strong> Listed companies copy generic policy templates (e.g., 'Inventory is valued at lower of cost and net realizable value') without specifying the cost formula used (FIFO, Weighted Average) or the treatment of overheads.</p>
            <p><strong>Violation:</strong> Violates AS 1 and AS 2 requirements to disclose the specific accounting principles and methods of applying them in Note 1. Generic disclosures fail to provide transparency to users.</p>
          </div>
        )
      },
      {
        title: "Correct Disclosure Expectation & Action Item",
        content: (
          <div className="space-y-2">
            <p><strong>Expectation:</strong> Disclose specific cost formulas and recognition rules (e.g., 'Raw materials are valued at cost computed on a Weighted Average basis. Finished goods include direct materials and allocated factory overheads based on normal capacity').</p>
            <p><strong>Auditor Action:</strong> Verify that Note 1 disclosures are entity-specific and do not rely on boilerplate text. Review disclosure completeness against actual book inventory calculations.</p>
          </div>
        )
      }
    ],
    examFocus: "NFRA compliance: significant policies must be clear, company-specific, and disclose the exact cost formulas (AS 1 Para 14). Avoid generic descriptions.",
    examFocusType: "focus"
  },
  {
    id: "4-2",
    title: "Observation 4.2: SEBI — Revenue Recognition Disclosures without Specific Milestones",
    category: "Regulatory Observation",
    panels: [
      {
        title: "Regulator Citation & Focus Area",
        content: (
          <div className="space-y-2">
            <p><strong>Regulator:</strong> Securities and Exchange Board of India (SEBI).</p>
            <p><strong>Focus Area:</strong> Revenue recognition policy disclosures in complex service or bundled contract structures in the IT and telecom sectors.</p>
          </div>
        )
      },
      {
        title: "Failure Details & Accounting Violation",
        content: (
          <div className="space-y-2">
            <p><strong>The Failure:</strong> Software companies with bundled software/hardware contracts disclose generic revenue policies without detailing how transaction values are allocated to different performance obligations or milestones.</p>
            <p><strong>Violation:</strong> Non-disclosure of revenue recognition rules violates AS 9 and the transparency requirements of AS 1, preventing investors from evaluating revenue streams.</p>
          </div>
        )
      },
      {
        title: "Correct Disclosure Expectation & Action Item",
        content: (
          <div className="space-y-2">
            <p><strong>Expectation:</strong> Disclose allocation methods and recognition milestones for bundled contracts in Note 1. Provide clear guidelines on transaction price allocations.</p>
            <p><strong>Auditor Action:</strong> Audit the client's customer contracts to ensure Note 1 accurately reflects revenue milestones. Verify the mathematical allocation calculations.</p>
          </div>
        )
      }
    ],
    examFocus: "AS 9 and AS 1: Complex revenue streams (like bundled IT solutions) require detailed policy disclosures on transaction price allocation and milestone recognition.",
    examFocusType: "concept"
  },
  {
    id: "4-3",
    title: "Observation 4.3: MCA — Omission of Material Accounting Policies",
    category: "Regulatory Observation",
    panels: [
      {
        title: "Regulator Citation & Focus Area",
        content: (
          <div className="space-y-2">
            <p><strong>Regulator:</strong> Ministry of Corporate Affairs (MCA) Registrar of Companies (RoC).</p>
            <p><strong>Focus Area:</strong> Technical inspections highlighting omissions of critical policies (foreign branch translations, government grants, leases) in corporate financial statements.</p>
          </div>
        )
      },
      {
        title: "Failure Details & Accounting Violation",
        content: (
          <div className="space-y-2">
            <p><strong>The Failure:</strong> Companies omit foreign branch translation or grant accounting policies, preventing proper interpretation of statements by the shareholders and registrars.</p>
            <p><strong>Violation:</strong> Non-disclosure of significant policies violates AS 1 Para 14. Any policy that is material to a user's decision-making must be disclosed in Note 1.</p>
          </div>
        )
      },
      {
        title: "Correct Disclosure Expectation & Action Item",
        content: (
          <div className="space-y-2">
            <p><strong>Expectation:</strong> Ensure all material accounting policies (including operating leases, government grants, and foreign operations) are disclosed in Note 1.</p>
            <p><strong>Auditor Action:</strong> Verify that no significant balance sheet line items lack corresponding policy disclosures in Note 1. Cross-reference the notes with the ledger balances.</p>
          </div>
        )
      }
    ],
    examFocus: "Omission of Material Policies: It is a violation of AS 1 to omit accounting policies for material items in the balance sheet. Review Note 1 completeness.",
    examFocusType: "trap"
  },
  {
    id: "4-4",
    title: "Observation 4.4: NFRA — Inconsistent Depreciation Useful Lives without Justification",
    category: "Regulatory Observation",
    panels: [
      {
        title: "Regulator Citation & Focus Area",
        content: (
          <div className="space-y-2">
            <p><strong>Regulator:</strong> National Financial Reporting Authority (NFRA).</p>
            <p><strong>Focus Area:</strong> Inconsistent useful lives of assets compared to Schedule II useful lives without technical justification.</p>
          </div>
        )
      },
      {
        title: "Failure Details & Accounting Violation",
        content: (
          <div className="space-y-2">
            <p><strong>The Failure:</strong> Listed companies apply longer useful lives to machinery assets (reducing annual depreciation) without obtaining a certified technical engineer's appraisal, deviating from Schedule II rates.</p>
            <p><strong>Violation:</strong> Non-disclosure of useful lives and lack of technical justification violates AS 10 (Revised) and the disclosure rules of AS 1.</p>
          </div>
        )
      },
      {
        title: "Correct Disclosure Expectation & Action Item",
        content: (
          <div className="space-y-2">
            <p><strong>Expectation:</strong> Disclose the useful lives applied to each asset class. Provide the technical justification and appraiser's details if they deviate from Schedule II.</p>
            <p><strong>Auditor Action:</strong> Audit the technical justification reports and verify the useful lives disclosures in the notes. Confirm Schedule II compliance.</p>
          </div>
        )
      }
    ],
    examFocus: "AS 10 and Schedule II: Useful lives of assets can deviate from Schedule II rates only if supported by technical engineering reports, and the deviation must be disclosed in Note 1.",
    examFocusType: "concept"
  },
  {
    id: "4-5",
    title: "Observation 4.5: SEBI — Failure to Quantify Financial Impact of Policy Changes",
    category: "Regulatory Observation",
    panels: [
      {
        title: "Regulator Citation & Focus Area",
        content: (
          <div className="space-y-2">
            <p><strong>Regulator:</strong> Securities and Exchange Board of India (SEBI).</p>
            <p><strong>Focus Area:</strong> Reviewing financial reports of listed companies for changes in accounting policies (depreciation, inventory, valuation) where the impact is not quantified.</p>
          </div>
        )
      },
      {
        title: "Failure Details & Accounting Violation",
        content: (
          <div className="space-y-2">
            <p><strong>The Failure:</strong> Companies state in Note 1 that they changed their accounting policy (e.g. inventory cost formula) but do not disclose the quantified impact on current and prior years, stating it is 'not ascertainable'.</p>
            <p><strong>Violation:</strong> Non-disclosure of the quantified impact of a policy change violates AS 1 Para 22, SA 705, and SEBI LODR rules.</p>
          </div>
        )
      },
      {
        title: "Correct Disclosure Expectation & Action Item",
        content: (
          <div className="space-y-2">
            <p><strong>Expectation:</strong> Quantify and disclose the exact financial impact (impact on PBT, assets, and reserves) in Note 1. If not ascertainable, disclose that fact and explain the reasons.</p>
            <p><strong>Auditor Action:</strong> Verify the recomputation calculations and audit the 'non-ascertainability' claims made by management. Ensure compliance with AS 1.</p>
          </div>
        )
      }
    ],
    examFocus: "Quantification of Impact: AS 1 Para 22 requires the quantified impact of a change in accounting policy to be disclosed. If the impact is material, it must be computed and disclosed.",
    examFocusType: "focus"
  },
  {
    id: "4-6",
    title: "Observation 4.6: MCA — Omission of Going Concern doubts in Notes",
    category: "Regulatory Observation",
    panels: [
      {
        title: "Regulator Citation & Focus Area",
        content: (
          <div className="space-y-2">
            <p><strong>Regulator:</strong> Ministry of Corporate Affairs (MCA).</p>
            <p><strong>Focus Area:</strong> Corporate inspection reports highlighting the failure of companies with net worth erosion and defaults to disclose going concern uncertainties.</p>
          </div>
        )
      },
      {
        title: "Failure Details & Accounting Violation",
        content: (
          <div className="space-y-2">
            <p><strong>The Failure:</strong> Companies with eroded net worth, default notices from banks, and pendingRoC filings prepare accounts on going concern basis without disclosing the existence of material uncertainties.</p>
            <p><strong>Violation:</strong> Non-disclosure of going concern doubts violates AS 1 significant disclosure rules. Preparations must disclose material uncertainties.</p>
          </div>
        )
      },
      {
        title: "Correct Disclosure Expectation & Action Item",
        content: (
          <div className="space-y-2">
            <p><strong>Expectation:</strong> Disclose all material uncertainties relating to the company's ability to continue as a going concern in Note 1, including bank defaults and mitigation plans.</p>
            <p><strong>Auditor Action:</strong> Audit the mitigating plans, evaluate cash flow projections, and verify going concern disclosure sufficiency. Insist on disclosures or qualify the report.</p>
          </div>
        )
      }
    ],
    examFocus: "Going Concern Disclosure: If there is a material uncertainty regarding going concern, that fact must be disclosed in Note 1. Failure to disclose is a direct violation of AS 1.",
    examFocusType: "trap"
  }
];
`;

fs.appendFileSync(targetPath, content, 'utf8');
console.log('Appended Section 4 (Regulatory Observations) successfully.');
