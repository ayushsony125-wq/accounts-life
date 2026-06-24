const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../app/standards/learning/AS1ExamplesData.tsx');

const content = `
export const businessExamples: CaseStudy[] = [
  {
    id: "2-1",
    title: "Example 2.1: Manufacturing — Overhead Allocation under Idle Capacity",
    category: "Practical Business Example",
    panels: [
      {
        title: "Business Scenario & Sector Dynamics",
        content: (
          <div className="space-y-2">
            <p><strong>Company Profile:</strong> TexSpun India Ltd is a textile manufacturer with a plant in Gujarat. The plant has a normal capacity of 1,00,000 units per month.</p>
            <p><strong>The Scenario:</strong> Due to a labor strike, production volume fell to 60,000 units in the current month. Fixed factory overheads remained constant at ₹1.2 Crores.</p>
            <p><strong>Management Reasoning:</strong> Management wants to allocate the entire ₹1.2 Crores fixed overheads to the 60,000 units produced, arguing that all expenses incurred at the plant must be capitalized into inventory costs.</p>
          </div>
        )
      },
      {
        title: "Key Controversy & Accounting Risk",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does allocating fixed overheads to inventory based on actual production volume during idle capacity periods violate AS 2 and AS 1?</p>
            <p><strong>Accounting Risk:</strong> Capitalizing abnormal idle capacity costs overstates inventory assets and defers operational losses to future periods, violating the prudence concept of AS 1.</p>
          </div>
        )
      },
      {
        title: "Technical Treatment & Impact",
        content: (
          <div className="space-y-2">
            <p><strong>Recommended Treatment:</strong> Allocate fixed overheads based on normal capacity (60,000 / 1,00,000 * 1.2 Crores = ₹72 Lakhs capitalized). Expense the remaining ₹48 Lakhs of idle overheads directly to the P&L.</p>
            <p><strong>Financial Impact:</strong> Net profit before tax decreases by ₹48 Lakhs, and closing inventory assets are reduced by ₹48 Lakhs.</p>
          </div>
        )
      },
      {
        title: "Disclosure Note Presentation",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-200">
            {\`"Note 1 (Inventory Valuation Policy): Fixed production overheads are allocated to inventory based on normal operating capacity. Abnormal unallocated overheads resulting from underutilization are expensed directly to the Statement of Profit and Loss in the period they occur."\`}
          </span>
        )
      },
      {
        title: "Auditor Verification Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Verify plant capacity records and normal production volume. 2. Verify that unallocated fixed overheads are charged directly to the P&L. 3. Check closing inventory calculations for compliance with AS 2.</p>
          </div>
        )
      }
    ],
    examFocus: "Materiality and Prudence: abnormal costs (like underutilization losses due to strike) cannot be capitalized. They must be expensed immediately under AS 2. State this clearly in exams.",
    examFocusType: "focus"
  },
  {
    id: "2-2",
    title: "Example 2.2: Trading — Accrual of Claims for Damaged Goods in Transit",
    category: "Practical Business Example",
    panels: [
      {
        title: "Business Scenario & Sector Dynamics",
        content: (
          <div className="space-y-2">
            <p><strong>Company Profile:</strong> CargoMart India Ltd is a wholesale distributor of imported machinery components with annual revenue of ₹85 Crores.</p>
            <p><strong>The Scenario:</strong> During the year, goods worth ₹18 Lakhs were severely damaged in transit. The company lodged a claim with the insurance company for the full value. The insurer has acknowledged receipt of the claim but has not yet accepted liability or finalized the payout.</p>
            <p><strong>Management Action:</strong> Management wants to accrue the ₹18 Lakhs insurance claim receivable as revenue in the current year, claiming they are 95% certain of recovery based on past history.</p>
          </div>
        )
      },
      {
        title: "Key Controversy & Accounting Risk",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does accruing a disputed or unapproved insurance claim violate the prudence concept under AS 1?</p>
            <p><strong>Accounting Risk:</strong> Overstating revenues and current assets before realization is assured, leading to subsequent write-offs if the claim is rejected.</p>
          </div>
        )
      },
      {
        title: "Technical Treatment & Impact",
        content: (
          <div className="space-y-2">
            <p><strong>Recommended Treatment:</strong> Postpone recognition of the claim income until the insurer approves it. Write down the cost of damaged goods immediately in the P&L.</p>
            <p><strong>Financial Impact:</strong> Current year net profit and receivables are reduced by ₹18 Lakhs compared to accruing the claim.</p>
          </div>
        )
      },
      {
        title: "Disclosure Note Presentation",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-200">
            {\`"Note 1 (Insurance Claims): Insurance claims are recognized as revenue only when the claims are accepted by the insurance company. Accordingly, claims of ₹18 Lakhs filed but not yet accepted have not been accrued and are disclosed as contingent assets."\`}
          </span>
        )
      },
      {
        title: "Auditor Verification Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Review insurance claim documents, correspondence, and status reports. 2. Verify that the client did not record the claim income before approval. 3. Audit the write-down of the damaged inventory.</p>
          </div>
        )
      }
    ],
    examFocus: "Prudence Concept: Income is recognized only when realized, while provision is made for all known liabilities. Unapproved insurance claims must not be accrued.",
    examFocusType: "concept"
  },
  {
    id: "2-3",
    title: "Example 2.3: Tea Industry — Valuation of Harvested Green Leaves at Plucking",
    category: "Practical Business Example",
    panels: [
      {
        title: "Business Scenario & Sector Dynamics",
        content: (
          <div className="space-y-2">
            <p><strong>Company Profile:</strong> Assam Tea Estates Ltd operates multiple tea plantations in Assam, harvesting tea leaves and manufacturing black tea.</p>
            <p><strong>The Scenario:</strong> At year end, the company has harvested green tea leaves in its transit bins that have not yet been processed in the factory. The market price of green leaves is ₹40 per kg, but their cost of plucking is only ₹12 per kg.</p>
            <p><strong>Management Action:</strong> Management wants to value the green leaves at their market price of ₹40, claiming that since the agricultural harvest is complete, the profit is already earned.</p>
          </div>
        )
      },
      {
        title: "Key Controversy & Accounting Risk",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does valuing agricultural produce at market price before sale violate AS 2 and AS 1?</p>
            <p><strong>Accounting Risk:</strong> Overstating inventory assets and recognizing unrealized profit in the current year, violating the prudence concept.</p>
          </div>
        )
      },
      {
        title: "Technical Treatment & Impact",
        content: (
          <div className="space-y-2">
            <p><strong>Recommended Treatment:</strong> Value the green leaves at their cost of plucking (₹12 per kg) or net realizable value, whichever is lower, as per AS 2. Do not value them at market price.</p>
            <p><strong>Financial Impact:</strong> Inventory value is lower by ₹28 per kg compared to management's market valuation, reducing current profit before tax.</p>
          </div>
        )
      },
      {
        title: "Disclosure Note Presentation",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-200">
            {\`"Note 1 (Inventory Valuation — Tea Leaves): Harvested green tea leaves are valued at the lower of cost of plucking/transportation and net realizable value, in accordance with AS 2. Profit is recognized only when the processed tea is sold."\`}
          </span>
        )
      },
      {
        title: "Auditor Verification Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Verify the cost sheets for plucking and transport of green leaves. 2. Verify that inventory calculations are based on cost, not market prices. 3. Check subsequent processing and sales records to verify NRV.</p>
          </div>
        )
      }
    ],
    examFocus: "ICAI Exam Focus: Agricultural inventories (like plucked tea leaves or harvested crops) must be valued at lower of cost and NRV. Do not value them at market price, as it violates the prudence concept of AS 1.",
    examFocusType: "focus"
  },
  {
    id: "2-4",
    title: "Example 2.4: Service Industry — Revenue Recognition on Software Consulting Milestones",
    category: "Practical Business Example",
    panels: [
      {
        title: "Business Scenario & Sector Dynamics",
        content: (
          <div className="space-y-2">
            <p><strong>Company Profile:</strong> TechConsult India Ltd is an IT consulting firm. During the year, they signed a contract to develop a customized ERP system for a client for ₹1.2 Crores.</p>
            <p><strong>The Scenario:</strong> The contract is divided into 4 milestones. At year end, the company has completed 2 milestones and received ₹60 Lakhs. Development of the third milestone is ongoing.</p>
            <p><strong>Management Action:</strong> Management wants to recognize the entire ₹1.2 Crores contract value as revenue, claiming that they have completed the core design phases and are certain of completing the remaining work.</p>
          </div>
        )
      },
      {
        title: "Key Controversy & Accounting Risk",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does recognizing full contract revenue before completing all milestones violate the accrual and matching principles of AS 1 and AS 9?</p>
            <p><strong>Accounting Risk:</strong> Overstating service revenues and contract receivables, leading to potential disputes and revenue reversals in subsequent years.</p>
          </div>
        )
      },
      {
        title: "Technical Treatment & Impact",
        content: (
          <div className="space-y-2">
            <p><strong>Recommended Treatment:</strong> Recognize revenue based on the stage of completion or percentage of completion method (POCM), i.e., ₹60 Lakhs. Defer the remaining ₹60 Lakhs until milestones are completed.</p>
            <p><strong>Financial Impact:</strong> Current year revenues and profits are reduced by ₹60 Lakhs compared to full contract recognition.</p>
          </div>
        )
      },
      {
        title: "Disclosure Note Presentation",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-200">
            {\`"Note 1 (Revenue Recognition — Service Contracts): Revenue from software development contracts is recognized under the percentage of completion method, based on the completion of contract milestones. Unbilled revenue is recorded as work-in-progress."\`}
          </span>
        )
      },
      {
        title: "Auditor Verification Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Review the software development contract, milestones, and client sign-off reports. 2. Verify that revenue recognized matches the milestones completed. 3. Audit the cost logs for ongoing milestones.</p>
          </div>
        )
      }
    ],
    examFocus: "Accrual and Matching: Service revenue must be recognized based on milestones or stage of completion (AS 9). Do not accrue revenue for incomplete milestones.",
    examFocusType: "concept"
  },
  {
    id: "2-5",
    title: "Example 2.5: Construction — Cost Estimate Changes in POCM",
    category: "Practical Business Example",
    panels: [
      {
        title: "Business Scenario & Sector Dynamics",
        content: (
          <div className="space-y-2">
            <p><strong>Company Profile:</strong> Apex Infra Ltd is a construction company. During the year, they began construction of a highway project with a total contract value of ₹150 Crores and estimated total cost of ₹120 Crores.</p>
            <p><strong>The Scenario:</strong> Due to an increase in steel and cement prices, the estimated total cost of the project increased to ₹135 Crores at year end. The project is 40% complete based on costs incurred.</p>
            <p><strong>Management Action:</strong> Management wants to maintain the original cost estimate of ₹120 Crores in their revenue calculations, claiming that prices may fall in the next year.</p>
          </div>
        )
      },
      {
        title: "Key Controversy & Accounting Risk",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does failing to update total project cost estimates in the percentage of completion method violate AS 7 and AS 1?</p>
            <p><strong>Accounting Risk:</strong> Understating project costs and overstating current profits, violating the prudence concept.</p>
          </div>
        )
      },
      {
        title: "Technical Treatment & Impact",
        content: (
          <div className="space-y-2">
            <p><strong>Recommended Treatment:</strong> Update the total cost estimate to ₹135 Crores. Recalculate the percentage of completion and the revenue/profit to be recognized. If a loss is expected, provision for the entire contract loss immediately.</p>
            <p><strong>Financial Impact:</strong> Current year profit decreases as the project margin is reduced from 20% to 10%.</p>
          </div>
        )
      },
      {
        title: "Disclosure Note Presentation",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-200">
            {\`"Note 1 (Construction Contracts): Contract revenue is recognized under the percentage of completion method. Total contract costs are reviewed periodically, and any changes in estimates are recognized in the period they occur. Expected losses are provisioned immediately."\`}
          </span>
        )
      },
      {
        title: "Auditor Verification Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Verify project cost sheets and updated cost estimates. 2. Verify that the percentage of completion calculations reflect the revised costs. 3. Check for any expected contract losses and ensure provisions are made.</p>
          </div>
        )
      }
    ],
    examFocus: "AS 7 and AS 5: Changes in total project cost estimates are changes in accounting estimates and must be recognized in the current period, adjusting the revenue and profit recognized. Expected losses must be provisioned immediately.",
    examFocusType: "adjustment"
  },
  {
    id: "2-6",
    title: "Example 2.6: Infrastructure — Toll Amortization Policy Change",
    category: "Practical Business Example",
    panels: [
      {
        title: "Business Scenario & Sector Dynamics",
        content: (
          <div className="space-y-2">
            <p><strong>Company Profile:</strong> NHAI Tollway Ltd operates a toll road under a Built-Operate-Transfer (BOT) contract for 20 years. Capitalized road construction cost is ₹400 Crores.</p>
            <p><strong>Historical Treatment:</strong> The company amortized the road cost using the Straight-Line Method (SLM) over 20 years (₹20 Crores per year).</p>
            <p><strong>The Trigger:</strong> During the year, a new industrial corridor opened nearby, diverting traffic. The company decides to change its amortization policy to the Traffic Volume Method to align amortization charges with actual traffic usage.</p>
          </div>
        )
      },
      {
        title: "Key Controversy & Accounting Risk",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does changing the amortization method for intangible toll road assets represent an accounting policy change under AS 1?</p>
            <p><strong>Accounting Risk:</strong> Overstating asset carrying values and understating amortization charges if the traffic volumes are overstated.</p>
          </div>
        )
      },
      {
        title: "Technical Treatment & Impact",
        content: (
          <div className="space-y-2">
            <p><strong>Recommended Treatment:</strong> Treat the amortization method change as a change in accounting policy (or estimate under revised guidelines). Apply retrospectively if policy change, adjusting past amortization, or prospectively if estimate change, and disclose the quantified impact.</p>
            <p><strong>Financial Impact:</strong> Amortization expense changes in line with traffic volumes, affecting net profit before tax.</p>
          </div>
        )
      },
      {
        title: "Disclosure Note Presentation",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-200">
            {\`"Note 1 (Amortization of BOT Road Assets): BOT road assets are amortized using the Traffic Volume Method, where amortization is calculated based on actual traffic during the period relative to the projected traffic over the concession period. This change in policy is applied retrospectively."\`}
          </span>
        )
      },
      {
        title: "Auditor Verification Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Verify traffic study reports from independent traffic consultants. 2. Verify amortization calculations based on actual traffic counts. 3. Check compliance with MCA guidelines on toll amortization.</p>
          </div>
        )
      }
    ],
    examFocus: "Intangible Assets Amortization: Amortization of BOT assets can follow traffic volume methods as per MCA circulars. A change in the method represents a policy change and must be fully disclosed.",
    examFocusType: "concept"
  },
  {
    id: "2-7",
    title: "Example 2.7: NBFC — Accounting Policy for Loan Provisioning (RBI vs. Prudence)",
    category: "Practical Business Example",
    panels: [
      {
        title: "Business Scenario & Sector Dynamics",
        content: (
          <div className="space-y-2">
            <p><strong>Company Profile:</strong> MicroFinance Ltd is a non-banking financial company. RBI guidelines require a minimum provision of 1% on standard loan assets.</p>
            <p><strong>The Scenario:</strong> Due to a regional crop failure, the company expects defaults on its micro-credit portfolio to reach 4% in the coming year. Standard assets are ₹100 Crores.</p>
            <p><strong>Management Action:</strong> Management wants to maintain the RBI minimum provision of 1% (₹1 Crore), arguing that complying with RBI guidelines satisfies all statutory requirements.</p>
          </div>
        )
      },
      {
        title: "Key Controversy & Accounting Challenge",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does maintaining regulatory minimum provisions when higher defaults are expected violate the prudence concept of AS 1?</p>
            <p><strong>Accounting Risk:</strong> Understating loan provisions and overstating net assets, presenting an unrealistic financial position.</p>
          </div>
        )
      },
      {
        title: "Technical Treatment & Impact",
        content: (
          <div className="space-y-2">
            <p><strong>Recommended Treatment:</strong> Provision for loan assets based on the expected default rate of 4% (₹4 Crores provision), overriding the RBI minimum of 1% to satisfy the prudence concept.</p>
            <p><strong>Financial Impact:</strong> Provisions increase by ₹3 Crores, reducing current year profits by ₹3 Crores.</p>
          </div>
        )
      },
      {
        title: "Disclosure Note Presentation",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-200">
            {\`"Note 1 (Loan Provisioning Policy): Loan assets are provisioned based on regulatory minimums or historical default averages, whichever is higher, in accordance with the prudence concept. Additional provisions are made for portfolios showing credit weakness."\`}
          </span>
        )
      },
      {
        title: "Auditor Verification Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Verify default logs, NPA records, and overdue loan reports. 2. Verify that loan provisions are adequate based on expected credit losses. 3. Check compliance with RBI provisioning rules and AS 1.</p>
          </div>
        )
      }
    ],
    examFocus: "Prudence Overrules Regulatory Minimums: Accounting standards and prudence require provisioning for expected losses even if they exceed regulatory minimums. State this clearly in NBFC case studies.",
    examFocusType: "focus"
  },
  {
    id: "2-8",
    title: "Example 2.8: Retail — Customer Loyalty Points Program Revenue Deferral",
    category: "Practical Business Example",
    panels: [
      {
        title: "Business Scenario & Sector Dynamics",
        content: (
          <div className="space-y-2">
            <p><strong>Company Profile:</strong> TrendZ Retail Ltd operates a chain of apparel stores. During the year, they launched a customer loyalty points program where customers earn 1 point for every ₹100 spent.</p>
            <p><strong>The Scenario:</strong> Total sales during the year were ₹80 Crores. Loyalty points issued are worth ₹80 Lakhs, and historical data shows 70% of points will be redeemed.</p>
            <p><strong>Management Action:</strong> Management wants to recognize the entire ₹80 Crores as revenue immediately, and record the points cost (₹56 Lakhs) under marketing expenses when points are redeemed.</p>
          </div>
        )
      },
      {
        title: "Key Controversy & Accounting Challenge",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does immediately recognizing revenue allocated to unredeemed loyalty points violate the accrual and matching principles?</p>
            <p><strong>Accounting Risk:</strong> Overstating current year revenues and understating deferred revenue liabilities.</p>
          </div>
        )
      },
      {
        title: "Technical Treatment & Impact",
        content: (
          <div className="space-y-2">
            <p><strong>Recommended Treatment:</strong> Defer the portion of revenue allocated to the loyalty points (₹56 Lakhs) and recognize it as revenue only when the points are redeemed or expire, in line with AS 9.</p>
            <p><strong>Financial Impact:</strong> Current year revenues and profits are reduced by ₹56 Lakhs, and deferred revenue liability increases by ₹56 Lakhs.</p>
          </div>
        )
      },
      {
        title: "Disclosure Note Presentation",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-200">
            {\`"Note 1 (Revenue Recognition — Loyalty Program): Revenue from sales is allocated between the product sold and the loyalty points issued, based on their relative fair values. The revenue allocated to loyalty points is deferred and recognized when points are redeemed or expire."\`}
          </span>
        )
      },
      {
        title: "Auditor Verification Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Review the loyalty program rules, points issued, and redemption rates. 2. Verify that the deferred revenue calculations are mathematically accurate. 3. Check subsequent redemption reports to verify estimate accuracy.</p>
          </div>
        )
      }
    ],
    examFocus: "Substance over Form: Loyalty points represent a separate performance obligation. A portion of sales revenue must be deferred and recognized when the obligation is satisfied. Quote AS 1 and AS 9.",
    examFocusType: "concept"
  },
  {
    id: "2-9",
    title: "Example 2.9: Pharma — R&D Clinical Trial Expensing vs. Capitalization",
    category: "Practical Business Example",
    panels: [
      {
        title: "Business Scenario & Sector Dynamics",
        content: (
          <div className="space-y-2">
            <p><strong>Company Profile:</strong> BioPharma Ltd is a pharmaceutical manufacturer. During the year, they incurred ₹12 Crores on Phase II clinical trials for a new oncology drug.</p>
            <p><strong>Management Action:</strong> Management capitalized the ₹12 Crores as an Intangible Asset under development, claiming that preclinical trials were successful and the drug has a high probability of market approval.</p>
          </div>
        )
      },
      {
        title: "Key Controversy & Accounting Challenge",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does capitalizing research and clinical trial costs before regulatory approval is received violate AS 26 and AS 1?</p>
            <p><strong>Accounting Risk:</strong> Overstating assets and understating operating expenses, violating the prudence concept due to high drug development failure rates.</p>
          </div>
        )
      },
      {
        title: "Technical Treatment & Impact",
        content: (
          <div className="space-y-2">
            <p><strong>Recommended Treatment:</strong> Expense the ₹12 Crores research costs immediately in the P&L. Do not capitalize clinical trial costs until technical feasibility is established (usually after Phase III trials and regulatory approvals).</p>
            <p><strong>Financial Impact:</strong> R&D expenses increase by ₹12 Crores, reducing current year profits, and intangible assets decrease by ₹12 Crores.</p>
          </div>
        )
      },
      {
        title: "Disclosure Note Presentation",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-200">
            {\`"Note 1 (Research and Development Costs): Research costs incurred in clinical trials are expensed directly to the P&L as incurred. Development costs are capitalized as intangible assets only after technical feasibility and regulatory approvals are obtained."\`}
          </span>
        )
      },
      {
        title: "Auditor Verification Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Verify R&D project records and clinical trial phase reports. 2. Verify that research costs are expensed to the P&L. 3. Check for any premature capitalization of development costs.</p>
          </div>
        )
      }
    ],
    examFocus: "AS 26 and Prudence: Research costs must always be expensed. Development costs can only be capitalized when all criteria of AS 26 are met. Clinical trials before Phase III must be expensed.",
    examFocusType: "focus"
  },
  {
    id: "2-10",
    title: "Example 2.10: IT Companies — Software Development Capitalization (Internal Use vs. Product)",
    category: "Practical Business Example",
    panels: [
      {
        title: "Business Scenario & Sector Dynamics",
        content: (
          <div className="space-y-2">
            <p><strong>Company Profile:</strong> NetSoft Ltd is an IT company. During the year, they spent ₹60 Lakhs developing a new ERP software for their internal human resources and payroll operations.</p>
            <p><strong>Management Action:</strong> Management capitalized the ₹60 Lakhs as a software product asset, claiming it has a useful life of 5 years and will save administrative costs.</p>
          </div>
        )
      },
      {
        title: "Key Controversy & Accounting Challenge",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does capitalizing internal-use software development costs violate capitalization criteria under AS 26?</p>
            <p><strong>Accounting Risk:</strong> Capitalizing administrative expenses, overstating intangible assets and current year profits.</p>
          </div>
        )
      },
      {
        title: "Technical Treatment & Impact",
        content: (
          <div className="space-y-2">
            <p><strong>Recommended Treatment:</strong> Capitalize the ERP software development costs under AS 26 as an intangible asset (internal use) only if it meets all capitalization criteria, and amortize over its useful life. If it is research or administrative in nature, expense it.</p>
            <p><strong>Financial Impact:</strong> Intangible assets and liabilities change in line with capitalized amounts.</p>
          </div>
        )
      },
      {
        title: "Disclosure Note Presentation",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-200">
            {\`"Note 1 (Intangible Assets — Software): Internal-use software development costs are capitalized when they meet AS 26 criteria, including technical feasibility and cost measurement. Capitalized costs are amortized on a straight-line basis over 3 years."\`}
          </span>
        )
      },
      {
        title: "Auditor Verification Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Verify project time logs and development invoices. 2. Verify that only development costs (not research or training) are capitalized. 3. Audit amortization calculations.</p>
          </div>
        )
      }
    ],
    examFocus: "AS 26 Capitalization: Software developed for internal use can be capitalized if it meets the criteria of AS 26. Administrative and training costs must be expensed.",
    examFocusType: "concept"
  }
];
`;

fs.appendFileSync(targetPath, content, 'utf8');
console.log('Appended Section 2 (Practical Examples) successfully.');
