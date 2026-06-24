const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../app/standards/learning/AS1ExamplesData.tsx');

const content = `
export const auditCases: CaseStudy[] = [
  {
    id: "3-1",
    title: "Case 3.1: Electra Appliance Ltd — Unjustified Change in Warranty Provision Policy",
    category: "Audit Case Study",
    panels: [
      {
        title: "Client Profile & Transaction Details",
        content: (
          <div className="space-y-2">
            <p><strong>Client:</strong> Electra Appliance Ltd is a listed consumer electronics manufacturer with annual sales of ₹450 Crores and PBT of ₹24 Crores.</p>
            <p><strong>The Transaction:</strong> To meet the market profit forecast, the CFO reduced the product warranty provision rate from 3.0% of sales (historical average claim level) to 1.0% of sales. This reduced the warranty expense by ₹9.0 Crores and increased reported profits.</p>
            <p><strong>Management Position:</strong> Management argued that warranty claims were volatile, and shifting to a lower provision rate based on cash payments provides a 'cleaner presentation' and reduces subjectivity.</p>
          </div>
        )
      },
      {
        title: "Key Risks & Assertion Challenges",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does reducing warranty provisions without technical evidence violate the prudence and accrual concepts under AS 1 and AS 29?</p>
            <p><strong>Accounting & Audit Risk:</strong> Understating provisions (liabilities) and overstating current profits. The assertion affected is Valuation and Allocation (completeness and valuation of liabilities).</p>
          </div>
        )
      },
      {
        title: "Auditor Verification & Testing Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Verify actual historical warranty claims registers and repair costs over the past 3 years. 2. Challenge management's technical justification and demand a certified engineer's report. 3. Recompute provisions using historical claims average and verify the ₹9.0 Crores misstatement.</p>
            <p><strong>CARO 2020:</strong> Verify compliance under Clause 3(vii) regarding disputed statutory dues and provisions.</p>
          </div>
        )
      },
      {
        title: "Reporting Impact & Proposed Opinion Draft",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-200">
            {\`"Basis for Qualified Opinion: Note 1 describes a change in the product warranty provision method. However, management has not provided a valid technical justification for reducing the provision rate to 1.0%. Based on historical claim logs, the provision should be ₹9.0 Crores higher, and profit before tax is overstated by ₹9.0 Crores.
            Qualified Opinion: Except for the effects of the matter described in the Basis for Qualified Opinion paragraph, the financial statements give a true and fair view..."\`\.}
          </span>
        )
      }
    ],
    examFocus: "AS 29 and AS 1: Changes in provisions must be supported by technical data. Unjustified reductions to manage earnings violate the prudence concept.",
    examFocusType: "focus"
  },
  {
    id: "3-2",
    title: "Case 3.2: SteelForge India Ltd — Inconsistent Depreciation Applied to Similar Assets",
    category: "Audit Case Study",
    panels: [
      {
        title: "Client Profile & Transaction Details",
        content: (
          <div className="space-y-2">
            <p><strong>Client:</strong> SteelForge India Ltd operates two steel mills in plant A (non-coastal) and plant B (coastal). Total assets are ₹800 Crores.</p>
            <p><strong>The Transaction:</strong> The company depreciates blast furnace assets at Plant A using SLM, but depreciates blast furnace assets at Plant B using WDV, claiming Plant B is in a coastal zone with higher corrosion. This inconsistency reduces Plant B depreciation by ₹42 Lakhs.</p>
          </div>
        )
      },
      {
        title: "Key Risks & Assertion Challenges",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does applying inconsistent depreciation methods to similar classes of assets without robust justification violate the consistency principle of AS 1?</p>
            <p><strong>Accounting Risk:</strong> Understating depreciation and overstating PPE net block. The assertion affected is consistency and valuation of PPE.</p>
          </div>
        )
      },
      {
        title: "Auditor Verification & Testing Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Verify the technical corrosion assessment report for Plant B. 2. Verify that similar asset classes use consistent methods unless physical usage conditions differ. 3. Recompute depreciation charges for consistency.</p>
          </div>
        )
      },
      {
        title: "Reporting Impact & Proposed Opinion Draft",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-205">
            {\`"Basis for Qualified Opinion: The Company applies inconsistent depreciation methods to similar blast furnace assets at Plant A and Plant B. This method inconsistency violates AS 10 (Revised) and has not been adequately justified, overstating fixed assets and profits by ₹42 Lakhs."\`}
          </span>
        )
      }
    ],
    examFocus: "Consistency: similar assets must be depreciated using consistent methods unless technical conditions differ. Inconsistency must be disclosed.",
    examFocusType: "concept"
  },
  {
    id: "3-3",
    title: "Case 3.3: Apex Textiles Ltd — Capitalization of Administrative Overheads in Inventory",
    category: "Audit Case Study",
    panels: [
      {
        title: "Client Profile & Transaction Details",
        content: (
          <div className="space-y-2">
            <p><strong>Client:</strong> Apex Textiles Ltd operates textile weaving mills. Closing inventory is ₹28 Crores.</p>
            <p><strong>The Transaction:</strong> Management capitalized ₹38 Lakhs of corporate head office administration costs (HR, legal, finance salaries) into the closing inventory value, claiming these departments support factory operations.</p>
          </div>
        )
      },
      {
        title: "Key Risks & Assertion Challenges",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does capitalizing administrative overheads into inventory violate AS 2 cost accumulation criteria?</p>
            <p><strong>Accounting Risk:</strong> Overstating inventory carrying values and understating administrative expenses. The assertion affected is Valuation and Allocation.</p>
          </div>
        )
      },
      {
        title: "Auditor Verification & Testing Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Verify cost allocation sheets and trace HR/finance payroll to corporate offices. 2. Verify that only production overheads are capitalized in inventory cost. 3. Recompute inventory cost excluding corporate overheads.</p>
          </div>
        )
      },
      {
        title: "Reporting Impact & Proposed Opinion Draft",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-205">
            {\`"Basis for Qualified Opinion: Management has capitalized corporate head office administrative costs of ₹38 Lakhs into inventory cost, in violation of AS 2. Consequently, closing inventory is overstated by ₹38 Lakhs and profit before tax is overstated by ₹38 Lakhs."\`}
          </span>
        )
      }
    ],
    examFocus: "AS 2 Inventory Cost: Administrative overheads that do not contribute to bringing inventories to their present location and condition must be expensed.",
    examFocusType: "trap"
  },
  {
    id: "3-4",
    title: "Case 3.4: Indus Logistics Ltd — Omission of Critical Lease accounting policy",
    category: "Audit Case Study",
    panels: [
      {
        title: "Client Profile & Transaction Details",
        content: (
          <div className="space-y-2">
            <p><strong>Client:</strong> Indus Logistics Ltd has a fleet of leased containers and warehouse assets, with annual lease rent payments of ₹12 Crores.</p>
            <p><strong>The Transaction:</strong> The company entered into 10 new long-term leases during the year but failed to disclose any lease accounting policies in Note 1.</p>
          </div>
        )
      },
      {
        title: "Key Risks & Assertion Challenges",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does omitting accounting policies for material operating leases violate AS 1 significant policy disclosures?</p>
            <p><strong>Accounting Risk:</strong> Lack of disclosure transparency, preventing users from understanding long-term lease obligations.</p>
          </div>
        )
      },
      {
        title: "Auditor Verification & Testing Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Review lease agreements and verify the total lease commitments. 2. Verify that the company discloses significant lease policies in Note 1. 3. Review disclosure completeness under AS 19.</p>
          </div>
        )
      },
      {
        title: "Reporting Impact & Proposed Opinion Draft",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-205">
            {\`"Basis for Qualified Opinion: The Company has failed to disclose its accounting policies for material operating leases in Note 1, in violation of AS 1. This omission prevents proper evaluation of long-term lease commitments."\`}
          </span>
        )
      }
    ],
    examFocus: "AS 1 significant policies: All material items, including lease accounting policies, must be disclosed in Note 1. Omissions require audit qualification.",
    examFocusType: "focus"
  },
  {
    id: "3-5",
    title: "Case 3.5: Zenith Electronics Ltd — Revenue Recognized on Unapproved Bill-and-Hold Transactions",
    category: "Audit Case Study",
    panels: [
      {
        title: "Client Profile & Transaction Details",
        content: (
          <div className="space-y-2">
            <p><strong>Client:</strong> Zenith Electronics Ltd is a consumer electronics distributor.</p>
            <p><strong>The Transaction:</strong> In March 2026, the company recorded sales of ₹1.80 Crores for goods held in their warehouse, claiming the customer requested a 'bill-and-hold' arrangement due to delayed store opening.</p>
          </div>
        )
      },
      {
        title: "Key Risks & Assertion Challenges",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does recognizing revenue on bill-and-hold transactions before transfer of risks and rewards violate AS 9 and AS 1?</p>
            <p><strong>Accounting Risk:</strong> Premature revenue recognition, overstating current year profits and accounts receivable.</p>
          </div>
        )
      },
      {
        title: "Auditor Verification & Testing Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Review customer correspondence to confirm if the bill-and-hold request was initiated by the customer. 2. Verify that the goods were segregated and ready for delivery. 3. Check subsequent delivery dates and verify that risks of ownership had indeed transferred.</p>
          </div>
        )
      },
      {
        title: "Reporting Impact & Proposed Opinion Draft",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-205">
            {\`"Basis for Qualified Opinion: Management has recorded sales of ₹1.80 Crores for bill-and-hold transactions where risks and rewards of ownership had not transferred to the buyer. This violates AS 9 and overstates revenue and current profits by ₹1.80 Crores."\`}
          </span>
        )
      }
    ],
    examFocus: "AS 9 Revenue Recognition: Bill-and-hold sales can only be recognized if the buyer requests it, the goods are identified and ready, and delivery is deferred. Otherwise, it is premature recognition.",
    examFocusType: "concept"
  },
  {
    id: "3-6",
    title: "Case 3.6: OceanCruises India Ltd — Provision for Environmental Cleanup Omitted",
    category: "Audit Case Study",
    panels: [
      {
        title: "Client Profile & Transaction Details",
        content: (
          <div className="space-y-2">
            <p><strong>Client:</strong> OceanCruises India Ltd operates tourism cruise ships. During the year, one of their ships leaked oil in a coastal zone, causing environmental damage.</p>
            <p><strong>The Transaction:</strong> The state government filed a cleanup demand notice of ₹2.40 Crores. The company filed a legal appeal disputing the damage assessment.</p>
          </div>
        )
      },
      {
        title: "Key Risks & Assertion Challenges",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does failing to provision for a government cleanup demand under legal dispute violate AS 29 and AS 1 Prudence?</p>
            <p><strong>Accounting Risk:</strong> Understating environmental liabilities and overstating current year profits.</p>
          </div>
        )
      },
      {
        title: "Auditor Verification & Testing Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Obtain and review the government demand notice and legal appeal papers. 2. Query legal counsel regarding the likelihood of liability. 3. Verify that a provision is created if the liability is probable, or a contingent liability is disclosed if possible.</p>
          </div>
        )
      },
      {
        title: "Reporting Impact & Proposed Opinion Draft",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-205">
            {\`"Basis for Qualified Opinion: The Company has failed to provision for a government cleanup demand of ₹2.40 Crores arising from an oil spill. This omission violates AS 29 and overstates current profits by ₹2.40 Crores."\`}
          </span>
        )
      }
    ],
    examFocus: "AS 29 Provisions: Environmental liabilities created by past events must be provisioned if they are probable. Disputes do not justify omission under the prudence concept.",
    examFocusType: "focus"
  },
  {
    id: "3-7",
    title: "Case 3.7: SunPower Ltd — Going Concern Omitted Despite Plant Closure",
    category: "Audit Case Study",
    panels: [
      {
        title: "Client Profile & Transaction Details",
        content: (
          <div className="space-y-2">
            <p><strong>Client:</strong> SunPower Ltd operates a single solar panel manufacturing plant. Due to cheaper imports, plant operations became unviable and the plant was closed in March 2026.</p>
            <p><strong>The Transaction:</strong> The company has outstanding bank loans of ₹15 Crores. Management prepared the accounts on a going concern basis, hoping to lease the plant to another operator.</p>
          </div>
        )
      },
      {
        title: "Key Risks & Assertion Challenges",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Can the Going Concern assumption be followed when a company's sole manufacturing plant is closed and bank loans are defaulted?</p>
            <p><strong>Accounting Risk:</strong> Overstating assets by carrying them at historical cost when liquidation value should be used.</p>
          </div>
        )
      },
      {
        title: "Auditor Verification & Testing Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Verify plant closure orders and employee retrenchment payments. 2. Verify bank loan repayment status and default notices. 3. Challenge management's plant leasing plans and check for concrete agreements.</p>
          </div>
        )
      },
      {
        title: "Reporting Impact & Proposed Opinion Draft",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-205">
            {\`"Basis for Adverse Opinion: The Company closed its sole plant and defaulted on bank loans. The Going Concern assumption is invalid. Financial statements should have been prepared on a net realizable value basis. Consequently, assets are overstated by ₹6.50 Crores."\`}
          </span>
        )
      }
    ],
    examFocus: "Going Concern: If a company's operations are closed, carrying assets at historical cost is invalid. In your answer, insist on a liquidation basis and state that the auditor must issue an Adverse Opinion.",
    examFocusType: "trap"
  },
  {
    id: "3-8",
    title: "Case 3.8: NovaPharma Ltd — Aggressive Capitalization of Phase I Clinical Trials",
    category: "Audit Case Study",
    panels: [
      {
        title: "Client Profile & Transaction Details",
        content: (
          <div className="space-y-2">
            <p><strong>Client:</strong> NovaPharma Ltd spent ₹80 Lakhs on Phase I clinical trials for a new vaccine project.</p>
            <p><strong>The Transaction:</strong> Management capitalized the ₹80 Lakhs as development cost in Note 1, arguing that the vaccine shows high efficacy in lab tests.</p>
          </div>
        )
      },
      {
        title: "Key Risks & Assertion Challenges",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does capitalizing Phase I clinical trial costs violate the research phase expensing rules of AS 26?</p>
            <p><strong>Accounting Risk:</strong> Capitalizing research expenses, overstating current assets and profits.</p>
          </div>
        )
      },
      {
        title: "Auditor Verification & Testing Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Review clinical trial phase criteria and regulatory definitions. 2. Verify that Phase I costs are charged directly to P&L. 3. Check compliance with AS 26 capitalization thresholds.</p>
          </div>
        )
      },
      {
        title: "Reporting Impact & Proposed Opinion Draft",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-205">
            {\`"Basis for Qualified Opinion: The Company capitalized ₹80 Lakhs of research costs for Phase I clinical trials in violation of AS 26. Consequently, intangible assets are overstated by ₹80 Lakhs and current profits are overstated by ₹80 Lakhs."\`}
          </span>
        )
      }
    ],
    examFocus: "AS 26 Intangible Assets: Research phase expenses must always be expensed. Development phase capitalization can only begin after technical feasibility is proven.",
    examFocusType: "concept"
  },
  {
    id: "3-9",
    title: "Case 3.9: DeltaEngineering Ltd — Misleading Policy Disclosure on Revenue Recognition",
    category: "Audit Case Study",
    panels: [
      {
        title: "Client Profile & Transaction Details",
        content: (
          <div className="space-y-2">
            <p><strong>Client:</strong> DeltaEngineering Ltd constructs machinery parts. Annual revenue is ₹120 Crores.</p>
            <p><strong>The Transaction:</strong> The company discloses in Note 1 that revenue is recognized 'on delivery of goods'. However, in practice, the company records sales when invoice is raised (before shipment), leading to ₹1.10 Crores of billings recorded as revenue for unshipped goods.</p>
          </div>
        )
      },
      {
        title: "Key Risks & Assertion Challenges",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does presenting a misleading revenue recognition policy in Note 1 violate AS 1 and AS 9?</p>
            <p><strong>Accounting Risk:</strong> Inaccurate disclosure, misleading users regarding revenue recognition timing and current assets.</p>
          </div>
        )
      },
      {
        title: "Auditor Verification & Testing Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Compare actual shipping log dates with invoice dates for a sample of sales transactions. 2. Verify that revenue recognized matches actual shipments. 3. Challenge management's Note 1 wording to ensure it is not misleading.</p>
          </div>
        )
      },
      {
        title: "Reporting Impact & Proposed Opinion Draft",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-205">
            {\`"Basis for Qualified Opinion: Note 1 states that revenue is recognized on delivery of goods. However, the Company has recorded sales of ₹1.10 Crores for unshipped goods where invoice was raised but delivery was not completed. This violates AS 9 and overstates revenue and profits by ₹1.10 Crores."\`}
          </span>
        )
      }
    ],
    examFocus: "AS 1 significant disclosures: disclosures must represent the actual accounting policies followed. Misleading or incorrect disclosures violate AS 1 Para 23.",
    examFocusType: "trap"
  },
  {
    id: "3-10",
    title: "Case 3.10: PioneerMining Ltd — CFO Override of Obsolescence policy",
    category: "Audit Case Study",
    panels: [
      {
        title: "Client Profile & Transaction Details",
        content: (
          <div className="space-y-2">
            <p><strong>Client:</strong> PioneerMining Ltd maintains a stock of mining spare parts worth ₹12 Crores. The company's policy requires a 50% write-down for spares idle for over 2 years.</p>
            <p><strong>The Transaction:</strong> Spares worth ₹3 Crores were idle for over 2 years. The CFO instructed the accounting team to bypass the write-down, claiming that the spares will be utilized in a new mining block next year.</p>
          </div>
        )
      },
      {
        title: "Key Risks & Assertion Challenges",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does bypassing a written down policy for obsolete stock without concrete usage plans violate AS 2 and AS 1 Prudence?</p>
            <p><strong>Accounting Risk:</strong> Overstating inventory current assets and profits by hiding obsolescence losses.</p>
          </div>
        )
      },
      {
        title: "Auditor Verification & Testing Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Review inventory aging reports to identify idle spare parts. 2. Challenge management's claims regarding future utilization of obsolete spares. 3. Recompute the write-down under the company's stated policy.</p>
          </div>
        )
      },
      {
        title: "Reporting Impact & Proposed Opinion Draft",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-205">
            {\`"Basis for Qualified Opinion: The Company bypassed its inventory write-down policy for obsolete spares worth ₹3 Crores, which violates AS 2. Consequently, inventories are overstated by ₹1.50 Crores, and current year profits are overstated by ₹1.50 Crores."\`}
          </span>
        )
      }
    ],
    examFocus: "AS 2 Inventory valuation: obsolete or slow-moving stocks must be written down. CFO override of accounting policies violates AS 1 and SA 240.",
    examFocusType: "focus"
  }
];
`;

fs.appendFileSync(targetPath, content, 'utf8');
console.log('Appended Section 3 (Audit Cases) successfully.');
