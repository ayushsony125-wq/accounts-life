const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../app/standards/learning/AS1ExamplesData.tsx');

const content = `
export const icaiIllustrations: CaseStudy[] = [
  {
    id: "1-1",
    title: "Illustration 1.1: Accounting Policies vs. Estimates (WIP Overheads vs. Warranty)",
    category: "ICAI Study Material",
    pdfPage: 4,
    panels: [
      {
        title: "Background & Business Situation",
        content: (
          <div className="space-y-2">
            <p><strong>Industry Context:</strong> RealChem India Ltd is a public listed specialty chemicals manufacturer supplying polymers to the automotive sector. The company operates continuous-flow production reactors where capital depreciation and utilities drive 85% of factory costs.</p>
            <p><strong>Historical Accounting Treatment:</strong> Historically, WIP inventories were allocated fixed factory overheads using a direct-labor absorption rate (25% of wages). However, due to recent automation, direct labor now represents only 6% of total manufacturing costs.</p>
            <p><strong>The Trigger:</strong> During the year, cost studies showed that the direct-labor method heavily distorted inventory values during low-labor periods. Consequently, management decided to switch to a machine-hour rate system. In the same year, the company increased its provision for product warranty claims from 1.5% to 3.5% of annual sales after early mechanical failures were identified in its new consumer electronics chemical coatings line.</p>
            <p><strong>Management Position & Reasoning:</strong> Management seeks to classify both adjustments as accounting policy revisions under Note 1. They argue that because both are backed by technical studies, they represent changes in the application of principles, allowing them to restate past figures retrospectively to stabilize current year earnings.</p>
          </div>
        )
      },
      {
        title: "Controversy & Accounting Challenge",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does changing the base of overhead absorption represent a policy change under AS 1, and does modifying the warranty provision constitute an estimate change under AS 5? Are they retrospectively restatable?</p>
            <p><strong>Accounting & Reporting Risk:</strong> Bypassing the standard by classifying the warranty estimate revision as a policy change allows management to avoid charging a ₹15 Lakhs charge to the current P&L, overstating current profits through a retrospective retained earnings adjustment.</p>
          </div>
        )
      },
      {
        title: "Technical Standard & Alternatives",
        content: (
          <div className="space-y-2">
            <p><strong>Relevant Standard:</strong> Under <strong>AS 1 Paragraph 11</strong>, accounting policies refer to the specific principles and the methods of applying them. Changing the overhead cost absorption method alters the cost accumulation formula, constituting a policy change. Restructuring warranty provisions is based on updated empirical failure logs, representing a change in estimate based on new data under <strong>AS 5</strong>.</p>
            <p><strong>Alternatives Evaluated:</strong> (a) Classify both changes as policy adjustments under Note 1 (Non-compliant); (b) Treat both as estimate adjustments under AS 5 to avoid retrospective restatements (Non-compliant); (c) Classify WIP overhead allocation change as a policy revision and the warranty change as an estimate adjustment (Standard-compliant).</p>
          </div>
        )
      },
      {
        title: "Correct Treatment & Financial Impact",
        content: (
          <div className="space-y-2.5">
            <p><strong>Mandated Treatment:</strong> Apply the WIP overhead allocation method change retrospectively. Apply the warranty provision increase prospectively under AS 5.</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-[12px] space-y-1">
              <p className="font-bold text-slate-800 dark:text-slate-200">Financial Impact Summary:</p>
              <p>• WIP Inventory overhead adjustment (Retrospective): Decreased opening inventory by ₹28 Lakhs (debited directly to opening reserves).</p>
              <p>• Warranty Provision increase (Prospective): Charged ₹15 Lakhs directly to current year's P&L under Selling Expenses.</p>
            </div>
          </div>
        )
      },
      {
        title: "Disclosure Note Presentation",
        content: (
          <span className="font-mono text-xs whitespace-pre-line text-slate-850 dark:text-slate-200">
            {\`"Note 1 (Significant Accounting Policies): The Company has changed its method of allocating factory overheads to work-in-progress inventories from a direct-labor absorption rate to a technical machine-hour rate system to reflect automation levels. This change in accounting policy has been applied retrospectively, decreasing inventory carrying value and opening reserves by ₹28 Lakhs. 
            Separately, the warranty provision has been revised from 1.5% to 3.5% based on updated technical reports. This change in estimate under AS 5 has been applied prospectively, increasing current year selling expenses by ₹15 Lakhs."\`}
          </span>
        )
      },
      {
        title: "Auditor's View & Work Program",
        content: (
          <div className="space-y-2">
            <p><strong>Audit Risk:</strong> Risk of management misclassifying estimate changes as policy adjustments to avoid profit volatility.</p>
            <p><strong>Procedures:</strong> 1. Review the independent engineering reports on machine-hour cost drivers. 2. Verify WIP valuation sheets under both methods to confirm the ₹28 Lakhs restatement. 3. Review historical warranty claims registers to validate the 3.5% failure rate estimation basis.</p>
            <p><strong>CARO 2020:</strong> Verify under Clause 3(ii) that inventory valuations comply with AS 2 and proper adjustments have been recorded.</p>
          </div>
        )
      }
    ],
    examFocus: "ICAI Exam Trap: Do not confuse changes in accounting estimates with changes in accounting policies. Revisions in estimate (like warranty percentage) are applied prospectively under AS 5. Methods of applying accounting principles (like WIP overhead allocation basis) are policy changes and require retrospective restatement with clear disclosure of the quantified impact in Note 1. ALWAYS quote AS 1 Para 22 and AS 5 in your answer.",
    examFocusType: "trap"
  },
  {
    id: "1-2",
    title: "Illustration 1.2: Materiality in Office Equipment Write-Off (Immediate Expensing)",
    category: "ICAI Study Material",
    pdfPage: 6,
    panels: [
      {
        title: "Background & Business Situation",
        content: (
          <div className="space-y-2">
            <p><strong>Industry Context:</strong> MegaMart Logistics Ltd operates a nationwide logistics network, managing 40 warehousing facilities. The company has a total asset base of ₹850 Crores and annual revenue of ₹1,200 Crores.</p>
            <p><strong>The Transaction:</strong> During the financial year, the company purchased office printing machinery and industrial storage bins for ₹3,50,000. These assets have an expected physical life of 4 years.</p>
            <p><strong>Management Action:</strong> Management expensed the entire ₹3,50,000 immediately in the current year under office expenses, rather than capitalizing it as Property, Plant & Equipment (PPE) and calculating depreciation. They argue that the expense is highly immaterial relative to their revenue, and tracking depreciation for low-value items creates unnecessary administrative work.</p>
          </div>
        )
      },
      {
        title: "Controversy & Accounting Challenge",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does immediately expensing long-term assets violate the matching principle and capitalization rules under AS 1 and AS 10?</p>
            <p><strong>Reporting Risk:</strong> Risk of cumulative write-offs becoming material in the aggregate, which would violate the completeness and valuation assertions of fixed assets.</p>
          </div>
        )
      },
      {
        title: "Technical Standard & Alternatives",
        content: (
          <div className="space-y-2">
            <p><strong>Relevant Standard:</strong> Under <strong>AS 1 Paragraph 17(c)</strong>, financial statements should disclose all material items—defined as items the knowledge of which might influence the economic decisions of users. If an item is immaterial, strict compliance with accounting standards (such as capitalizing fixed assets under AS 10) is not required. The printing equipment is highly immaterial to any stakeholder, justifying immediate expensing.</p>
            <p><strong>Alternatives Evaluated:</strong> (a) Capitalise as PPE and calculate annual depreciation of ₹87,500 (administratively inefficient); (b) Charge the ₹3,50,000 directly to expenses under the materiality principle (Standard-compliant).</p>
          </div>
        )
      },
      {
        title: "Correct Treatment & Financial Impact",
        content: (
          <div className="space-y-2.5">
            <p><strong>Recommended Treatment:</strong> Charge the ₹3,50,000 directly to office expenses. No capitalization is required.</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-[12px] space-y-1">
              <p>• Operating expenses increase by: ₹3,50,000</p>
              <p>• Net profit before tax decreases by: ₹3,50,000</p>
              <p>• PPE net block is lower by: ₹2,62,500 (net of first-year depreciation) compared to capitalization</p>
            </div>
          </div>
        )
      },
      {
        title: "Disclosure Note Presentation",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-200">
            {\`"Note 1 (Capitalization Policy): In accordance with the materiality concept of AS 1, individual assets costing less than ₹5,00,000 are expensed to the Statement of Profit and Loss in the year of acquisition, regardless of their estimated useful lives."\`}
          </span>
        )
      },
      {
        title: "Auditor's View & Work Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Verify the purchase invoice for printing equipment to confirm the purchase price. 2. Verify that the client consistently applies its internal capitalization threshold. 3. Check for systemic write-offs of similar low-value items that might be material in the aggregate.</p>
            <p><strong>CARO 2020:</strong> Ensure these assets are not included in the physical asset register, preventing record mismatches under Clause 3(i).</p>
          </div>
        )
      }
    ],
    examFocus: "Most Asked Concept: Materiality. Immaterial items do not require strict compliance with standard accounting policies. For example, immediate expensing of low-value assets like printing equipment is allowed to save administrative costs. In exams, emphasize that the threshold is relative to the enterprise's asset base and revenue.",
    examFocusType: "concept"
  },
  {
    id: "1-3",
    title: "Illustration 1.3: Para 23 - Disclosure Cannot Cure Incorrect Accounting (Interest Capitalization)",
    category: "ICAI Study Material",
    pdfPage: 7,
    panels: [
      {
        title: "Background & Business Situation",
        content: (
          <div className="space-y-2">
            <p><strong>Industry Context:</strong> Delta Steel Ltd is constructing a new blast furnace plant with an estimated construction period of 24 months. The project is financed by a dedicated term loan of ₹50 Crores at 10% interest per annum.</p>
            <p><strong>The Transaction:</strong> During a 3-month period, construction was completely suspended due to a local labor union strike. The interest accrued on the term loan during this 3-month suspension amounted to ₹1.25 Crores.</p>
            <p><strong>Management Action:</strong> Management capitalized the ₹1.25 Crores interest into the blast furnace asset cost, arguing that the project is still under development. To address accounting standard concerns, they provided a detailed footnote note in Note 1 explaining that the interest relates to a temporary suspension period.</p>
          </div>
        )
      },
      {
        title: "Controversy & Accounting Challenge",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Can footnote disclosures justify or correct an accounting treatment that violates capitalization standards?</p>
            <p><strong>Accounting Risk:</strong> Capitalizing borrowing costs during active suspension violates AS 16. Using footnotes to justify this violates AS 1 Paragraph 23.</p>
          </div>
        )
      },
      {
        title: "Technical Standard & Alternatives",
        content: (
          <div className="space-y-2">
            <p><strong>Relevant Standard:</strong> Under <strong>AS 16 Paragraph 17</strong>, capitalization of borrowing costs must be suspended during extended periods in which active development is interrupted. Under <strong>AS 1 Paragraph 23</strong>, disclosure of accounting policies or footnotes cannot justify or rectify incorrect or inappropriate accounting treatments.</p>
            <p><strong>Alternatives Evaluated:</strong> (a) Capitalize interest and disclose via footnote (Non-compliant); (b) Expense the ₹1.25 Crores interest directly to P&L as finance costs (Standard-compliant).</p>
          </div>
        )
      },
      {
        title: "Correct Treatment & Financial Impact",
        content: (
          <div className="space-y-2.5">
            <p><strong>Recommended Treatment:</strong> Expense the ₹1.25 Crores interest immediately in the P&L. Do not capitalize it.</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-[12px] space-y-1">
              <p>• Finance costs (interest expense) charged to P&L: ₹1.25 Crores</p>
              <p>• Capital Work-in-Progress (CWIP) value is lower by: ₹1.25 Crores</p>
              <p>• Current year PBT is reduced by: ₹1.25 Crores</p>
            </div>
          </div>
        )
      },
      {
        title: "Disclosure Note Presentation",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-200">
            {\`"Note 1 (Borrowing Costs): Finance costs are capitalized during active construction. In accordance with AS 16, interest of ₹1.25 Crores accrued during the 3-month construction suspension was charged directly to the Statement of Profit and Loss under Finance Costs."\`}
          </span>
        )
      },
      {
        title: "Auditor's View & Work Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Review project progress logs to confirm construction suspension dates. 2. Verify that interest calculations for the 3-month period are excluded from CWIP. 3. Insist on P&L charge reversal if capitalized by client.</p>
            <p><strong>Opinion Impact:</strong> If management refuses to correct, issue a qualified opinion for overstating assets and profits by ₹1.25 Crores.</p>
          </div>
        )
      }
    ],
    examFocus: "Likely ICAI Adjustment / Exam Trap: Inappropriate accounting treatments cannot be rectified or cured by footnote disclosures. This is a very common exam scenario where management capitalizes abnormal costs (like interest during suspension) and attempts to resolve it via detailed footnotes. In your answer, state clearly that the treatment violates AS 1 Para 23 and the auditor must qualify the report.",
    examFocusType: "trap"
  },
  {
    id: "1-4",
    title: "Illustration 1.4: Inventory Valuation Formula Change (FIFO to Weighted Average)",
    category: "ICAI Study Material",
    pdfPage: 8,
    panels: [
      {
        title: "Background & Business Situation",
        content: (
          <div className="space-y-2">
            <p><strong>Industry Context:</strong> TechHardware Ltd is an importer and distributor of server microprocessors. The market prices of microprocessors fluctuate heavily due to silicon wafer supply cycles.</p>
            <p><strong>Historical Accounting Treatment:</strong> The company historically valued its inventory using the FIFO method. Ending inventory at March 31, 2026 under FIFO was ₹480 Lakhs.</p>
            <p><strong>The Trigger:</strong> Due to a global semiconductor shortage, procurement prices rose by 40% in the last quarter. To present a more realistic raw material cost pattern and avoid artificial tax hits on inventory inflation, the board decided to switch to the Weighted Average Cost (WAC) method. The inventory value under WAC is ₹412 Lakhs.</p>
            <p><strong>Management Position:</strong> Management wants to change the policy, stating it matches current market cost averages and gives a fairer presentation. The change has a material PBT impact of ₹68 Lakhs.</p>
          </div>
        )
      },
      {
        title: "Controversy & Accounting Challenge",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does changing the inventory cost formula represent a policy change under AS 1? Under what circumstances is it allowed, and how must it be disclosed?</p>
            <p><strong>Accounting Risk:</strong> Risk of management switching cost formulas repeatedly to manage earnings or tax obligations (violating the consistency principle).</p>
          </div>
        )
      },
      {
        title: "Technical Standard & Alternatives",
        content: (
          <div className="space-y-2">
            <p><strong>Relevant Standard:</strong> Under <strong>AS 1 Paragraph 15</strong>, a change in accounting policy is permitted only if required by statute, for compliance with an accounting standard, or if it results in a more appropriate presentation. Under Para 22, the nature, reasons, and quantified financial impact of the policy change must be disclosed in Note 1.</p>
            <p><strong>Alternatives:</strong> (a) Retain FIFO (allowable, but inflates profits); (b) Switch to WAC for better matching (compliant, requires disclosure).</p>
          </div>
        )
      },
      {
        title: "Correct Treatment & Financial Impact",
        content: (
          <div className="space-y-2.5">
            <p><strong>Recommended Treatment:</strong> Value the closing inventory at WAC (₹412 Lakhs). Charge the ₹68 Lakhs difference to cost of goods sold in the current year.</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-[12px] space-y-1">
              <p>• Closing inventory asset decreases by: ₹68 Lakhs</p>
              <p>• Cost of Goods Sold increases by: ₹68 Lakhs</p>
              <p>• Net profit before tax decreases by: ₹68 Lakhs</p>
            </div>
          </div>
        )
      },
      {
        title: "Disclosure Note Presentation",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-200">
            {\`"Note 1 (Inventory Policy Change): During the year, the Company changed its policy for valuing raw material inventories from the First-In, First-Out (FIFO) method to the Weighted Average Cost (WAC) method to achieve a more appropriate presentation of raw material consumption costs. As a result of this change, closing inventories are lower by ₹68 Lakhs, and the net profit for the year is lower by ₹68 Lakhs."\`}
          </span>
        )
      },
      {
        title: "Auditor's View & Work Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Verify inventory sheets under both FIFO and WAC to confirm the ₹68 Lakhs calculation. 2. Verify that the WAC policy is applied consistently across all similar product classes. 3. Review board minutes approving the change and check the disclosure completeness.</p>
          </div>
        )
      }
    ],
    examFocus: "Most Asked Concept: Policy Change. Changing the cost formula (FIFO to WAC) is a change in accounting policy under AS 1. It is justified if it results in a more appropriate presentation. Always quote the three criteria for policy changes and write out the exact journal entries and disclosure template in your answer sheets.",
    examFocusType: "concept"
  },
  {
    id: "1-5",
    title: "Illustration 1.5: Depreciation Method Change (SLM to WDV)",
    category: "ICAI Study Material",
    pdfPage: 5,
    panels: [
      {
        title: "Background & Business Situation",
        content: (
          <div className="space-y-2">
            <p><strong>Industry Context:</strong> Precision Engineering Ltd is a tier-1 supplier to the automotive manufacturing sector, operating highly specialized continuous-production CNC machining centers. The company has a total PPE asset block of ₹220 Crores.</p>
            <p><strong>Historical Policy:</strong> Historically, CNC machines were depreciated under the Straight-Line Method (SLM) based on an estimated useful life of 15 years, assuming equal consumption of economic benefits over time.</p>
            <p><strong>The Trigger & Management Motive:</strong> In the current financial year, a technical review by external plant engineers revealed that CNC machines experience intense mechanical wear, high maintenance requirements, and rapid technological obsolescence during the first 5 years of operation. The board decides to change the depreciation method from SLM to the Written Down Value (WDV) method at a rate of 15% to match this accelerated wear and tear. This change increases the depreciation charge for the current year by ₹18.50 Lakhs.</p>
            <p><strong>Management Position:</strong> Management initially proposed that since this represents a change in the 'method of applying an accounting principle' (as defined under old AS 6 guidelines), it must be treated as a change in accounting policy, requiring retrospective restatement and adjusting opening reserves, which would help them avoid charging the ₹18.50 Lakhs impact directly against current year operating profits.</p>
          </div>
        )
      },
      {
        title: "Controversy & Accounting Challenge",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> The primary issue is whether a change in the depreciation method constitutes a change in accounting policy (requiring retrospective restatement) or a change in accounting estimate (applied prospectively) under AS 1 and AS 10 (Revised).</p>
            <p><strong>Alternatives Evaluated:</strong> (a) Classify as a change in accounting policy with retrospective adjustment to opening reserves (Non-compliant); (b) Treat as a change in accounting estimate and apply prospectively, charging the entire ₹18.50 Lakhs current year impact to the P&L (Standard-compliant).</p>
            <p><strong>Accounting & Reporting Risk:</strong> Incorrectly treating the estimate revision as a policy change allows management to manipulate current year earnings by bypassing the Profit & Loss statement through direct adjustment of opening reserves, violating the matching and accrual concepts.</p>
          </div>
        )
      },
      {
        title: "Technical Standard & Alternatives",
        content: (
          <div className="space-y-2">
            <p><strong>Relevant Standard:</strong> Under <strong>AS 10 (Revised) Paragraph 71</strong>, a change in the depreciation method applied to an asset must be treated as a change in an accounting estimate under <strong>AS 5</strong>. The change is based on new information or engineering assessments regarding the consumption pattern of future economic benefits. It must be applied prospectively, and retrospective adjustments are strictly prohibited. However, under <strong>AS 1 Para 22</strong>, any change in accounting policy or significant estimate having a material effect in the current period must be disclosed in Note 1.</p>
          </div>
        )
      },
      {
        title: "Correct Treatment & Financial Impact",
        content: (
          <div className="space-y-2.5">
            <p><strong>Recommended Treatment:</strong> Apply the WDV depreciation method prospectively. Re-estimate the depreciation charge over the remaining useful life of the machinery. Charge the additional ₹18.50 Lakhs directly as a current period depreciation expense in the Statement of Profit and Loss.</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-[12px] space-y-1">
              <p>• Current year depreciation expense increases by: ₹18.50 Lakhs</p>
              <p>• Operating profit and Net Profit Before Tax (PBT) decrease by: ₹18.50 Lakhs</p>
              <p>• Carrying value of CNC machinery is reduced by: ₹18.50 Lakhs</p>
            </div>
          </div>
        )
      },
      {
        title: "Disclosure Note Presentation",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-200">
            {\`"Note 1 (Depreciation Policy Update): During the year ended March 31, 2026, the Company revised its method of depreciating CNC machinery from the Straight-Line Method (SLM) to the Written Down Value (WDV) method at 15% per annum to better align the depreciation charge with the accelerated consumption of economic benefits in the early years of asset life. In accordance with AS 10 (Revised), this change has been treated as a change in accounting estimate and applied prospectively. As a result of this change, the depreciation charge for the current year is higher by ₹18.50 Lakhs, and the net profit before tax for the year has decreased by the same amount."\`}
          </span>
        )
      },
      {
        title: "Auditor's View & Work Program",
        content: (
          <div className="space-y-2">
            <p><strong>Audit Risk:</strong> Risk of material misstatement of fixed assets and profit due to retrospective reserve adjustments or lack of technical justification.</p>
            <p><strong>Assertions Affected:</strong> Valuation & Allocation (PPE carrying value) and Accuracy & Classification (P&L expenses).</p>
            <p><strong>Procedures:</strong> 1. Obtain and review the technical engineering report to verify the commercial and technical justification for the accelerated consumption pattern. 2. Recalculate depreciation on a test basis under both SLM and WDV to verify the mathematical accuracy of the ₹18.50 Lakhs impact. 3. Confirm that no retrospective adjustments have been made to opening reserves or comparative figures in the financial statements.</p>
            <p><strong>CARO 2020:</strong> Report under Clause 3(i)(a) on maintenance of proper records showing full particulars, and verify that these changes are correctly reflected in the fixed asset register.</p>
          </div>
        )
      }
    ],
    examFocus: "Concept Link: A change in depreciation method is treated as a change in accounting estimate under AS 10 (Revised), and must be applied prospectively, unlike a change in accounting policy which requires retrospective adjustment. However, it must still be disclosed in Note 1 under AS 1.",
    examFocusType: "concept"
  },
  {
    id: "1-6",
    title: "Illustration 1.6: Revenue Recognition Uncertainty (Export Incentives)",
    category: "ICAI Study Material",
    pdfPage: 12,
    panels: [
      {
        title: "Background & Business Situation",
        content: (
          <div className="space-y-2">
            <p><strong>Industry Context:</strong> Dynamic Exports Ltd is a large apparel export house shipping garments to the European Union, with annual export sales of ₹180 Crores.</p>
            <p><strong>The Transaction:</strong> During the financial year, the Government announced a new Duty Drawback scheme offering a 3% rebate on apparel exports. The company filed claims worth ₹5.40 Crores based on their shipping bills.</p>
            <p><strong>The Trigger:</strong> The customs authorities disputed the textile classification of the exported garments, claiming they fell under a lower 1% rebate category, creating an uncertainty of ₹3.60 Crores.</p>
            <p><strong>Management Position:</strong> The CFO wants to accrue the entire ₹5.40 Crores rebate as current year revenue, arguing that they have filed legal appeals and that they have followed accrual accounting consistently for all government subsidies.</p>
          </div>
        )
      },
      {
        title: "Controversy & Accounting Challenge",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does accrual accounting require recognizing revenue even when there is significant uncertainty regarding its ultimate measurement and collection?</p>
            <p><strong>Alternatives Evaluated:</strong> (a) Accrue the entire ₹5.40 Crores based on claims filed (Non-compliant, violates prudence); (b) Defer recognition of the disputed ₹3.60 Crores until customs approvals are received, recognizing only the undisputed ₹1.80 Crores (Standard-compliant).</p>
            <p><strong>Reporting Risk:</strong> Overstating current year revenues and trade receivables, leading to subsequent write-offs and tax penalties.</p>
          </div>
        )
      },
      {
        title: "Technical Standard & Alternatives",
        content: (
          <div className="space-y-2">
            <p><strong>Relevant Standard:</strong> Under <strong>AS 9 Paragraph 9.1</strong> and <strong>AS 1 Paragraph 17(a) (Prudence)</strong>, revenue should not be recognized when there is significant uncertainty regarding its ultimate collection or measurement. Revenue recognition should be postponed until such uncertainty is resolved. Accrual does not override the fundamental selection consideration of Prudence.</p>
          </div>
        )
      },
      {
        title: "Correct Treatment & Financial Impact",
        content: (
          <div className="space-y-2.5">
            <p><strong>Recommended Treatment:</strong> Recognize only the undisputed ₹1.80 Crores of export incentives as revenue. Defer the recognition of the disputed ₹3.60 Crores and disclose the dispute in the notes.</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-[12px] space-y-1">
              <p>• Other Operating Income is reduced by: ₹3.60 Crores</p>
              <p>• Trade Receivables (Government Claims) decrease by: ₹3.60 Crores</p>
              <p>• Current year PBT decreases by: ₹3.60 Crores</p>
            </div>
          </div>
        )
      },
      {
        title: "Disclosure Note Presentation",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-200">
            {\`"Note 1 (Revenue Recognition Policy): Export incentives under the Duty Drawback scheme are recognized as revenue on an accrual basis when shipping bills are filed, provided there is no significant uncertainty regarding measurement and ultimate realization. Accordingly, out of the total claims of ₹5.40 Crores filed during the year, ₹3.60 Crores has been deferred due to classification disputes with customs authorities, and will be recognized only upon final resolution of the dispute."\`}
          </span>
        )
      },
      {
        title: "Auditor's View & Work Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Verify customs correspondence, show-cause notices, and legal opinions regarding textile classifications. 2. Verify that the client has not accrued the disputed claim amount. 3. Confirm that the policy disclosure matches the actual treatment of export incentives.</p>
            <p><strong>CARO 2020:</strong> Verify under Clause 3(vii) whether there are any undisputed statutory dues pending payment.</p>
          </div>
        )
      }
    ],
    examFocus: "ICAI Exam Focus: Prudence vs Accrual. This is a very common exam scenario where a government subsidy or claim is disputed. Under AS 9 and AS 1, revenue recognition must be postponed if there is significant uncertainty. Always emphasize that Prudence takes precedence over Accrual in cases of measurement uncertainty.",
    examFocusType: "focus"
  },
  {
    id: "1-7",
    title: "Illustration 1.7: Foreign Exchange Rate Shift (Translation Method)",
    category: "ICAI Study Material",
    pdfPage: 11,
    panels: [
      {
        title: "Background & Business Situation",
        content: (
          <div className="space-y-2">
            <p><strong>Company Profile:</strong> Global Retail India Ltd operates retail outlets in India and has a non-integral foreign branch in London. The branch acts autonomously, managing its own sales, leases, and local bank accounts in GBP (£).</p>
            <p><strong>The Transaction:</strong> During the year, the exchange rate shifted from ₹95/GBP to ₹105/GBP. The branch has net assets of £12,00,000 at year end.</p>
            <p><strong>Management Action:</strong> To avoid reporting translation losses in the current year, management decided to classify the branch as an integral operation and translate all assets and liabilities using the historical rate of ₹95, ignoring the current rate shift of ₹10.</p>
          </div>
        )
      },
      {
        title: "Controversy & Accounting Challenge",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does the classification of a foreign operation as integral or non-integral represent an accounting policy, and can management change it arbitrarily to avoid rate volatility?</p>
            <p><strong>Accounting Risk:</strong> Understating translation differences, violating AS 11 translation rules and AS 1 disclosure principles.</p>
          </div>
        )
      },
      {
        title: "Technical Standard & Alternatives",
        content: (
          <div className="space-y-2">
            <p><strong>Relevant Standard:</strong> Under <strong>AS 11</strong>, the classification of a foreign operation depends on its financial and operational autonomy. If the operation is non-integral, all assets and liabilities must be translated at the closing rate, and the resulting exchange difference must be accumulated in a Foreign Currency Translation Reserve (FCTR) on the Balance Sheet. This classification is an accounting policy under AS 1.</p>
          </div>
        )
      },
      {
        title: "Correct Treatment & Financial Impact",
        content: (
          <div className="space-y-2.5">
            <p><strong>Recommended Treatment:</strong> Classify the branch as non-integral. Translate assets and liabilities at the closing rate (₹105) and accumulate the exchange difference of ₹1.20 Crores in the FCTR under Reserves & Surplus.</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-[12px] space-y-1">
              <p>• Foreign Currency Translation Reserve (Credit): ₹1.20 Crores</p>
              <p>• Value of foreign assets on translation increases by: ₹1.20 Crores</p>
            </div>
          </div>
        )
      },
      {
        title: "Disclosure Note Presentation",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-200">
            {\`"Note 1 (Foreign Currency Translation): In accordance with AS 11, the London branch is classified as a non-integral foreign operation. Income and expense items are translated at average rates, and assets and liabilities are translated at the closing exchange rate. The resulting translation difference of ₹1.20 Crores has been credited to the Foreign Currency Translation Reserve."\`}
          </span>
        )
      },
      {
        title: "Auditor's View & Work Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Review the branch's operational indicators (local financing, autonomy) to verify classification. 2. Verify closing and average exchange rates against RBI reference rates. 3. Confirm that the translation difference is correctly allocated to the FCTR.</p>
          </div>
        )
      }
    ],
    examFocus: "Concept Link: Classification of foreign operations (integral vs non-integral) is a significant accounting policy. Changing this classification without valid business changes is non-compliant. Under AS 1, the policy must be disclosed and applied consistently.",
    examFocusType: "concept"
  },
  {
    id: "1-8",
    title: "Illustration 1.8: Investment Valuation policy (Current vs. Long-Term)",
    category: "ICAI Study Material",
    pdfPage: 13,
    panels: [
      {
        title: "Background & Business Situation",
        content: (
          <div className="space-y-2">
            <p><strong>Company Profile:</strong> Prime Investments Ltd holds a portfolio of equity shares, including a 15% stake in a technology startup acquired for ₹8 Crores, classified as a long-term investment. They also hold current market securities for trading.</p>
            <p><strong>The Scenario:</strong> Due to a market crash, the market value of the long-term stake fell to ₹3 Crores at March 31, 2026. The startup has lost its major client, indicating a permanent decline.</p>
            <p><strong>Management Action:</strong> Management wants to value the long-term investment at its original cost of ₹8 Crores, claiming that long-term assets are not subject to temporary market volatility, and refuse to record any provision.</p>
          </div>
        )
      },
      {
        title: "Controversy & Accounting Challenge",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does AS 13 allow carrying long-term investments at cost when there is a permanent decline in carrying value?</p>
            <p><strong>Accounting Risk:</strong> Overstating investment assets and PBT by hiding permanent impairment losses, violating the prudence and true and fair view requirements.</p>
          </div>
        )
      },
      {
        title: "Technical Standard & Alternatives",
        content: (
          <div className="space-y-2">
            <p><strong>Relevant Standard:</strong> Under <strong>AS 13</strong>, long-term investments must be carried at cost. However, when there is a decline, other than temporary, in the value of a long-term investment, the carrying amount must be reduced to recognize the decline. This reduction must be charged to the P&L.</p>
          </div>
        )
      },
      {
        title: "Correct Treatment & Financial Impact",
        content: (
          <div className="space-y-2.5">
            <p><strong>Recommended Treatment:</strong> Write down the long-term investment to ₹3 Crores. Charge the permanent decline of ₹5 Crores to the Statement of Profit and Loss.</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-[12px] space-y-1">
              <p>• Loss on permanent decline in investment value (P&L): ₹5 Crores</p>
              <p>• Carrying value of investments is reduced by: ₹5 Crores</p>
            </div>
          </div>
        )
      },
      {
        title: "Disclosure Note Presentation",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-200">
            {\`"Note 1 (Significant Accounting Policies — Investments): Long-term investments are carried at cost. However, a provision for diminution is made to recognize a decline, other than temporary, in the value of the investments. During the year, a provision of ₹5 Crores was recorded against long-term investments to reflect permanent impairment."\`}
          </span>
        )
      },
      {
        title: "Auditor's View & Work Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Verify the startup's financial records and net worth to confirm impairment indicators. 2. Verify that the decline is permanent based on client losses and cash flows. 3. Audit the valuation of current investments to ensure they are at lower of cost and fair value.</p>
          </div>
        )
      }
    ],
    examFocus: "Exam Tip: Dimension of investment values. Long-term vs current investments must follow separate valuation rules under AS 13. In exams, if a company fails to provision for a permanent decline in long-term assets, state clearly that it violates AS 13 and AS 1, requiring an audit qualification.",
    examFocusType: "concept"
  },
  {
    id: "1-9",
    title: "Illustration 1.9: Government Grants Policy Change (Deferred Income vs. Cost Reduction)",
    category: "ICAI Study Material",
    pdfPage: 14,
    panels: [
      {
        title: "Background & Business Situation",
        content: (
          <div className="space-y-2">
            <p><strong>Company Profile:</strong> GreenEnergy Ltd received a government grant of ₹5 Crores for installing solar power equipment costing ₹20 Crores. The machinery has a useful life of 10 years.</p>
            <p><strong>Historical Treatment:</strong> The company previously deducted government grants directly from the cost of the acquired assets.</p>
            <p><strong>The Trigger:</strong> During the year, the company decided to change its policy to present the grants as Deferred Government Grants (Reserves & Surplus) to align with global parent reporting formats. This changes the asset cost back to ₹20 Crores and creates a deferred income liability of ₹5 Crores.</p>
          </div>
        )
      },
      {
        title: "Controversy & Accounting Challenge",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does changing the method of presenting government grants represent an accounting policy change under AS 1, and what are the retrospective restatement rules?</p>
            <p><strong>Violation Risk:</strong> Incorrect depreciation rates and presentation errors if the transition is not calculated retrospectively.</p>
          </div>
        )
      },
      {
        title: "Technical Standard & Alternatives",
        content: (
          <div className="space-y-2">
            <p><strong>Relevant Standard:</strong> Under <strong>AS 12</strong>, both methods (deducting from cost vs presenting as deferred income) are permitted. Switching between them is a change in accounting policy under AS 1. This change must be applied retrospectively, restating the asset book value and recording the deferred grant balance.</p>
          </div>
        )
      },
      {
        title: "Correct Treatment & Financial Impact",
        content: (
          <div className="space-y-2.5">
            <p><strong>Recommended Treatment:</strong> Restate the asset cost to ₹20 Crores and create a Deferred Grant balance. Adjust past depreciation retrospectively (depreciation will now be calculated on ₹20 Crores instead of ₹15 Crores, and the deferred grant will be amortized to the P&L).</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-[12px] space-y-1">
              <p>• Asset cost increases by: ₹5 Crores</p>
              <p>• Deferred Grant balance created: ₹5 Crores</p>
              <p>• Additional depreciation and grant amortization netted in P&L: ₹0 net impact on PBT</p>
            </div>
          </div>
        )
      },
      {
        title: "Disclosure Note Presentation",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-200">
            {\`"Note 1 (Significant Accounting Policies — Government Grants): During the year, the Company changed its accounting policy for government grants related to fixed assets from deducting them from the cost of the asset to presenting them as Deferred Government Grants. This change has been applied retrospectively, increasing asset cost and deferred grants by ₹5 Crores. There is no net impact on the profit for the current year."\`}
          </span>
        )
      },
      {
        title: "Auditor's View & Work Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Verify the government grant sanction letters and terms of compliance. 2. Verify the retrospective restatement calculations of asset carrying value and deferred grant amortization. 3. Confirm that the policy change is disclosed in Note 1.</p>
          </div>
        )
      }
    ],
    examFocus: "Concept Link: Changing the method of presenting government grants (AS 12) is a change in accounting policy under AS 1. Emphasize in your answer that while both methods are standard-compliant, a switch requires retrospective application and full quantification of the impact.",
    examFocusType: "concept"
  },
  {
    id: "1-10",
    title: "Illustration 1.10: Employee Benefits Accrual Transition (Cash to Actuarial)",
    category: "ICAI Study Material",
    pdfPage: 15,
    panels: [
      {
        title: "Background & Business Situation",
        content: (
          <div className="space-y-2">
            <p><strong>Company Profile:</strong> Sterling Fab Ltd operates a textile weaving mill. Gratuity and leave encashment benefits were historically accounted for on a cash basis (pay-as-you-go) as the company was relatively small.</p>
            <p><strong>The Scenario:</strong> During the year, the company crossed the threshold of 100 employees, requiring mandatory compliance with actuarial valuation rules under AS 15.</p>
            <p><strong>Management Action:</strong> Management decided to adopt actuarial valuation in Note 1 but wants to treat the transition impact (₹42 Lakhs of past service liability) as a current year expense to avoid restating prior periods.</p>
          </div>
        )
      },
      {
        title: "Controversy & Accounting Challenge",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does shifting from cash to accrual basis for employee benefits represent a change in accounting policy, and how must the transition liability be presented?</p>
            <p><strong>Violation Risk:</strong> Charging prior period liabilities to current year P&L distorts the current year's operating profits, violating AS 5 and AS 1 accrual assumptions.</p>
          </div>
        )
      },
      {
        title: "Technical Standard & Alternatives",
        content: (
          <div className="space-y-2">
            <p><strong>Relevant Standard:</strong> Shifting from cash to accrual basis is a change in accounting policy (correcting a non-compliant policy to a compliant one). Under <strong>AS 15</strong>, the transition liability for past services must be calculated and charged to opening reserves/retained earnings, rather than current period employee benefits expense.</p>
          </div>
        )
      },
      {
        title: "Correct Treatment & Financial Impact",
        content: (
          <div className="space-y-2.5">
            <p><strong>Recommended Treatment:</strong> Debit the ₹42 Lakhs transition liability directly to opening reserves. Charge only the current service cost to the current year's P&L.</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-950/40 font-mono text-[12px] space-y-1">
              <p>• Opening reserves adjusted (Debit): ₹42 Lakhs</p>
              <p>• Provision for Gratuity (Liability) increases by: ₹42 Lakhs</p>
            </div>
          </div>
        )
      },
      {
        title: "Disclosure Note Presentation",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-200">
            {\`"Note 1 (Employee Benefits): The Company changed its policy for employee benefits from cash basis to actuarial valuation using the Projected Unit Credit method to comply with AS 15. This change in accounting policy has been applied retrospectively, decreasing opening reserves by ₹42 Lakhs. Current year employee benefits reflect current service costs based on actuarial reports."\`}
          </span>
        )
      },
      {
        title: "Auditor's View & Work Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Obtain the actuarial report from a certified actuary to verify the transition liability calculations. 2. Verify that the transition liability has been adjusted in opening reserves. 3. Confirm that all employee benefits disclosures comply with AS 15.</p>
          </div>
        )
      }
    ],
    examFocus: "Concept Link: Shifting from cash basis to accrual basis for employee benefits is a transition to a standard-compliant policy. Under AS 1 and AS 15, the past service liability must be adjusted retrospectively through opening reserves.",
    examFocusType: "concept"
  },
  {
    id: "1-11",
    title: "Illustration 1.11: Substance Over Form in Hire Purchase Lease",
    category: "ICAI Study Material",
    pdfPage: 16,
    panels: [
      {
        title: "Background & Business Situation",
        content: (
          <div className="space-y-2">
            <p><strong>Company Profile:</strong> Logistics Express LLP acquired 12 delivery trucks on hire purchase. The cash price of the trucks was ₹1.50 Crores. The lease term is 5 years, with legal ownership transferring to the LLP only after the final installment is paid.</p>
            <p><strong>The Transaction:</strong> The LLP controls the routing, carries all maintenance costs, and bears the risk of accidental loss.</p>
            <p><strong>Management Action:</strong> Management recorded the monthly installments as 'vehicle hire charges' in the P&L, claiming that since the legal title remains with the bank, the LLP is not the owner and cannot capitalize the trucks.</p>
          </div>
        )
      },
      {
        title: "Controversy & Accounting Challenge",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Does legal ownership override economic substance when capitalizing assets under AS 1?</p>
            <p><strong>Accounting Risk:</strong> Understating PPE assets and lease liabilities on the Balance Sheet, misrepresenting the company's leverage and asset base.</p>
          </div>
        )
      },
      {
        title: "Technical Standard & Alternatives",
        content: (
          <div className="space-y-2">
            <p><strong>Relevant Standard:</strong> Under <strong>AS 1 Paragraph 17(b) (Substance over Form)</strong>, transactions must be accounted for in accordance with their economic reality and commercial substance, and not merely their legal form. Under AS 19, a lease that transfers substantially all risks and rewards of ownership is a finance lease and must be capitalized by the lessee.</p>
          </div>
        )
      },
      {
        title: "Correct Treatment & Financial Impact",
        content: (
          <div className="space-y-2.5">
            <p><strong>Recommended Treatment:</strong> Capitalize the trucks at the cash price of ₹1.50 Crores. Record a corresponding lease liability. Charge depreciation on the trucks and record the interest portion of the installments in the P&L.</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-[12px] space-y-1">
              <p>• PPE (Trucks) capitalized: ₹1.50 Crores</p>
              <p>• Lease Obligation (Liability) recorded: ₹1.50 Crores</p>
              <p>• Interest and depreciation charged to P&L, reversing lease rentals</p>
            </div>
          </div>
        )
      },
      {
        title: "Disclosure Note Presentation",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-200">
            {\`"Note 1 (Assets held under Hire Purchase): In accordance with the substance over form concept of AS 1 and AS 19, vehicles acquired under hire purchase agreements are capitalized at the cash price at the inception of the lease and depreciated over their useful lives. The corresponding liability is recorded as a finance lease obligation."\`}
          </span>
        )
      },
      {
        title: "Auditor's View & Work Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Inspect the hire purchase agreement to confirm lease terms, cash price, and interest rates. 2. Verify that the vehicles are capitalized and depreciation is calculated under AS 10. 3. Confirm that the interest expense is accrued using the effective interest method.</p>
          </div>
        )
      }
    ],
    examFocus: "Most Asked Concept: Substance over Form. Legal title is secondary to economic control. Hire purchase or finance leases must be capitalized. In exams, quote AS 1 Para 17(b) and AS 19 to justify the capitalization and write out the depreciation adjustments.",
    examFocusType: "concept"
  },
  {
    id: "1-12",
    title: "Illustration 1.12: Going Concern Defeated (Operating License Revoked)",
    category: "ICAI Study Material",
    pdfPage: 10,
    panels: [
      {
        title: "Background & Business Situation",
        content: (
          <div className="space-y-2">
            <p><strong>Company Profile:</strong> NeoMining Ltd operates a single large bauxite mine in Odisha. The mine is the company's sole source of revenue. The company has a net book value of assets of ₹110 Crores.</p>
            <p><strong>The Trigger:</strong> During the financial year, the National Green Tribunal revoked the company's mining license due to environmental violations. The local court rejected the company's appeal, halting all operations.</p>
            <p><strong>Management Action:</strong> Management prepared the financial statements on a Going Concern basis, carrying the mining assets at cost less depreciation, claiming they are in negotiations with the government to reinstate the license.</p>
          </div>
        )
      },
      {
        title: "Controversy & Accounting Challenge",
        content: (
          <div className="space-y-2">
            <p><strong>The Controversy:</strong> Can the Going Concern assumption be followed when a company's sole operating license is permanently revoked with no viable legal recourse?</p>
            <p><strong>Accounting Risk:</strong> Overstating assets by carrying them at historical cost when liquidation or impairment is certain, violating the prudence and going concern assumptions.</p>
          </div>
        )
      },
      {
        title: "Technical Standard & Alternatives",
        content: (
          <div className="space-y-2">
            <p><strong>Relevant Standard:</strong> Under <strong>AS 1 Paragraph 10(a)</strong>, Going Concern is a fundamental accounting assumption. If there is a necessity of liquidating or materially curtailing operations, the assumption is defeated. The financial statements must be prepared on a Net Realisable Value (NRV) basis, and this fact must be disclosed.</p>
          </div>
        )
      },
      {
        title: "Correct Treatment & Financial Impact",
        content: (
          <div className="space-y-2.5">
            <p><strong>Recommended Treatment:</strong> Reject the going concern assumption. Write down all assets to their net realizable (scrap) value. Reclassify all long-term liabilities as current liabilities.</p>
            <div className="p-3 bg-emerald-50/50 dark:bg-slate-900 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-[12px] space-y-1">
              <p>• Impairment loss on mining assets (P&L): ₹95 Crores (assets written down to scrap value of ₹15 Crores)</p>
              <p>• Long-term loans reclassified as current liabilities: ₹40 Crores</p>
            </div>
          </div>
        )
      },
      {
        title: "Disclosure Note Presentation",
        content: (
          <span className="font-mono text-xs text-slate-850 dark:text-slate-200">
            {\`"Note 1 (Basis of Preparation — Non-Going Concern): These financial statements have been prepared on a net realizable value basis. Following the permanent revocation of the Company's mining license by the National Green Tribunal, the fundamental assumption of Going Concern is no longer valid. Accordingly, all assets have been written down to their estimated scrap values, and long-term borrowings have been reclassified as current liabilities."\`}
          </span>
        )
      },
      {
        title: "Auditor's View & Work Program",
        content: (
          <div className="space-y-2">
            <p><strong>Procedures:</strong> 1. Verify court orders and green tribunal correspondence regarding the license revocation. 2. Verify that asset valuations are supported by independent scrap valuation reports. 3. Ensure that the audit report contains an adverse opinion if management prepares the financial statements on a going concern basis.</p>
          </div>
        )
      }
    ],
    examFocus: "ICAI Exam Trap: If a company's going concern status is defeated, carrying assets at cost is incorrect. In your answer, state that the accounts must be prepared on NRV, and if management fails to do so, the auditor must issue an adverse opinion under SA 570 and AS 1.",
    examFocusType: "trap"
  }
];
`;

fs.appendFileSync(targetPath, content, 'utf8');
console.log('Appended Section 1 (ICAI Illustrations) successfully.');
