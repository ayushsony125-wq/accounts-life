const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const examplesHtml = `
<h2>Case 1: Changing Inventory Valuation Method from FIFO to Weighted Average</h2>
<div class="editor-case-law">
  <span class="case-label">⚖️ CASE STUDY — INTERMEDIATE (Para 26)</span>
  <p><strong>Facts:</strong> ValuTex India Ltd is a large-scale manufacturing enterprise. For the past five years, it has valued its raw material inventories using the First-In, First-Out (FIFO) method. During the financial year 2025-26, the prices of raw materials rose persistently by 35% due to global supply chain disruptions. To mitigate inflation-driven volatility in its earnings, the management decided to switch to the Weighted Average Cost (WAC) method. The inventory values at March 31, 2026, under the two methods are:
  <ul>
    <li><strong>FIFO Value:</strong> ₹450 Lakhs</li>
    <li><strong>WAC Value:</strong> ₹380 Lakhs</li>
    <li><strong>Profit Before Tax (prior to this adjustment):</strong> ₹1,200 Lakhs</li>
  </ul>
  </p>
  <p><strong>Issue:</strong> Does the shift from FIFO to WAC constitute a change in accounting policy under AS 1? If yes, is the change justifiable, and how must the resulting ₹70 Lakhs reduction in inventory value be accounted for and disclosed?</p>
  <p><strong>Governing Principle:</strong> Valuation of inventories is a significant accounting policy [Page 4]. A change in accounting policy is permitted under AS 1 only if: (1) required by statute, (2) required for compliance with an accounting standard, or (3) it results in a more appropriate presentation of financial statements [Page 5]. Any change having a material effect must be disclosed along with its quantified impact [Page 7].</p>
  <p><strong>Analysis &amp; Conclusion:</strong> The cost formula used to allocate cost to inventory (FIFO vs. WAC) is a cost flow assumption, which is an accounting policy. During periods of persistent inflation, FIFO results in valuing ending inventory at recent, higher prices (inflating assets and profits), while raw material consumption is charged at older, cheaper prices. WAC averages the price spikes, matching revenue with a more normalized raw material cost. Therefore, changing to WAC provides a more appropriate presentation of the financial results. Since the difference of ₹70 Lakhs represents 5.83% of the profit before tax, it exceeds the materiality threshold and requires quantification and explicit disclosure [Page 5].</p>
  <p><strong>Accounting Treatment:</strong> The inventory must be carried at the WAC value of ₹380 Lakhs on the Balance Sheet. The ₹70 Lakhs reduction is charged to the Profit &amp; Loss statement under "Cost of Materials Consumed":
  <pre>Debit  Cost of Materials Consumed A/c     ₹7,000,000\nCredit Closing Stock (Inventory) A/c                   ₹7,000,000\n(Being raw material inventory valued at Weighted Average Cost instead of FIFO)</pre>
  </p>
  <p><strong>Disclosure Note:</strong> Include the following statement in <em>Note 1: Summary of Significant Accounting Policies</em>:
  <blockquote class="editor-note-block"><strong>Inventory Valuation Policy Change:</strong><br/>"During the year ended March 31, 2026, the Company changed its policy for valuing raw material inventories from the First-In, First-Out (FIFO) method to the Weighted Average Cost (WAC) method to achieve a more appropriate presentation of raw material consumption costs during periods of high price volatility. As a result of this change, the value of inventories as of March 31, 2026, is lower by ₹70 Lakhs, and the profit before tax for the year ended on that date has decreased by ₹70 Lakhs."</blockquote>
  </p>
  <p><strong>Auditor Verification:</strong> Verify the mathematical computation of ending inventory under both FIFO and WAC. Ensure that WAC has been applied consistently to all similar inventory categories. Confirm that the management has documented the commercial justification for the policy change. Check that the note disclosure is complete and matches the books. If the disclosure is missing or incorrect, qualify the audit report.</p>
  <p><strong>Practical Impact:</strong> Inventory write-downs directly reduce the Current Ratio and Gross Margin. This can trigger covenant breaches with working capital lenders, who require a minimum Current Ratio (typically 1.33:1).</p>
  <p><strong>Common Exam Trap:</strong> <span class="trap-label">⚠️ RED FLAG</span> Management shifting back to FIFO in a subsequent deflationary year to avoid recording losses, or switching methods repeatedly without a change in market conditions (known as earnings management).</p>
</div>

<hr/>

<h2>Case 2: Useful Life Revision vs. Depreciation Method Change</h2>
<div class="editor-case-law">
  <span class="case-label">⚖️ CASE STUDY — INTERMEDIATE (Para 14)</span>
  <p><strong>Facts:</strong> InfraCorp Ltd operates heavy earthmoving machinery. In FY 2025-26, the company decided to change its depreciation method for machinery from the Straight-Line Method (SLM) to the Written Down Value (WDV) method to align with the accelerated wear and tear in early years. This change requires a retrospective recalculation, resulting in an additional cumulative depreciation charge of ₹120 Lakhs in the current year. In the same year, a technical review of the company's delivery trucks showed that rough road conditions reduced their remaining useful life from 8 years to 5 years. Management wants to classify both adjustments as "Accounting Policy Changes" to present them together in Note 1.</p>
  <p><strong>Issue:</strong> How should the change in the depreciation method and the change in useful life be classified and disclosed under AS 1 and AS 5?</p>
  <p><strong>Governing Principle:</strong> The selection of depreciation methods (SLM vs. WDV) is a significant accounting policy [Page 4]. A change in an accounting policy must be disclosed separately, showing its nature, justification, and quantified impact on current and future periods [Page 7]. In contrast, the estimation of useful lives of depreciable assets is an accounting estimate, governed by AS 5 [Page 4].</p>
  <p><strong>Analysis &amp; Conclusion:</strong>
  <ul>
    <li><strong>Depreciation Method:</strong> A depreciation method represents the systematic policy for allocating the cost of an asset over its life. Changing from SLM to WDV represents a change in accounting policy. It must be applied with retrospective effect (recalculating past depreciation and charging/crediting the difference to the current P&L) and disclosed under AS 1 [Page 4].</li>
    <li><strong>Useful Life Revision:</strong> The estimate of useful life is based on judgment and wear-and-tear conditions. A change in useful life is a change in an accounting estimate, not an accounting policy. It must be applied prospectively (depreciating the remaining carrying amount over the revised 5 years) and is disclosed under AS 5. The two changes cannot be aggregated.</li>
  </ul>
  </p>
  <p><strong>Accounting Treatment:</strong>
  <ul>
    <li><strong>Machinery (Policy Change):</strong> Calculate the depreciation under WDV from the date of acquisition to the beginning of the current year. Debit the excess of WDV depreciation over SLM depreciation (₹120 Lakhs) to the current year's P&L under "Depreciation Adjustment (Prior Periods)" or "Depreciation Expense".</li>
    <li><strong>Truck Fleet (Estimate Change):</strong> Recalculate depreciation prospectively. Take the Net Book Value at the beginning of the year and divide it by the revised remaining life of 5 years. No retrospective adjustment is allowed.</li>
  </ul>
  </p>
  <p><strong>Disclosure Note:</strong> Disclose two separate notes in <em>Note 1: Summary of Significant Accounting Policies</em>:
  <blockquote class="editor-note-block">
    <strong>Note 1(a): Change in Depreciation Policy (Accounting Policy Change):</strong><br/>
    "The Company has changed its method of depreciation for plant and machinery from the Straight-Line Method (SLM) to the Written Down Value (WDV) method to better reflect the pattern of economic benefits consumed. This change has been applied retrospectively, resulting in an additional depreciation charge of ₹120 Lakhs. Consequently, the profit before tax for the year has decreased by ₹120 Lakhs, and the net book value of fixed assets is lower by the same amount."<br/><br/>
    <strong>Note 1(b): Revision of Fleet Useful Life (Accounting Estimate Change):</strong><br/>
    "Based on a technical evaluation of operational wear and tear, the estimated useful life of delivery trucks has been revised from 8 years to 5 years with effect from April 1, 2025. This change in accounting estimate has been applied prospectively, resulting in a higher depreciation charge of ₹35 Lakhs for the current year."
  </blockquote>
  </p>
  <p><strong>Auditor Verification:</strong> Verify the cumulative calculation of depreciation for machinery from the original asset acquisition records. Examine the independent technical appraiser's certificate for the truck fleet useful life revision. Ensure that the useful life change is not treated as a retrospective policy change. If management attempts to do so, qualify the audit report.</p>
</div>

<hr/>

<h2>Case 3: Going Concern in Severe Financial Distress</h2>
<div class="editor-case-law">
  <span class="case-label">⚖️ CASE STUDY — ADVANCED (Para 10(a))</span>
  <p><strong>Facts:</strong> UrbanStores Ltd operates a retail chain. Over the last three fiscal years, the company has suffered severe losses, resulting in accumulated losses of ₹850 Lakhs, which has wiped out its paid-up capital of ₹500 Lakhs (negative net worth). The balance sheet shows current assets of ₹400 Lakhs against current liabilities of ₹1,200 Lakhs. Bank loans are classified as NPAs, and major suppliers have filed insolvency petitions under the Insolvency and Bankruptcy Code (IBC). Despite these factors, the board of directors prepared the financial statements on a Going Concern basis, stating in the notes that they are in the final stages of negotiating a debt restructure and a strategic equity infusion.</p>
  <p><strong>Issue:</strong> Is the Going Concern assumption valid for UrbanStores Ltd, and what are the disclosure requirements under AS 1 if there is material uncertainty or a breach of this assumption?</p>
  <p><strong>Governing Principle:</strong> Going Concern is a fundamental accounting assumption. It is assumed that the enterprise will continue in operation for the foreseeable future, with neither the intention nor the necessity of liquidation or curtailing materially the scale of its operations [Page 3]. If a fundamental assumption is followed, no disclosure is required. If it is not followed, that fact must be disclosed, along with the basis on which the financial statements have been prepared [Page 5].</p>
  <p><strong>Analysis &amp; Conclusion:</strong> UrbanStores Ltd exhibits multiple indicators of going concern distress (negative net worth, working capital deficit, defaulted bank loans). Management’s restructuring negotiations are preliminary and do not provide sufficient objective evidence that the company can continue operating. Because the assumption is highly doubtful, preparing financial statements under historical cost (carrying long-term assets at cost less depreciation rather than scrap value) is misleading. If management prepares the statements on a going concern basis, they must disclose the material uncertainties. If liquidation is imminent, the accounts must be prepared on a net realizable value basis [Page 5].</p>
  <p><strong>Accounting Treatment:</strong>
  <ol>
    <li><strong>If the Going Concern assumption is rejected:</strong> Restate all assets to their Net Realisable Value (NRV). Reclassify long-term liabilities as current.</li>
    <li><strong>If Going Concern is followed under material uncertainty:</strong> Retain cost-based accounting but disclose the material uncertainties clearly.</li>
  </ol>
  </p>
  <p><strong>Disclosure Note:</strong> If preparing on a <strong>Liquidation (non-going concern) basis</strong>:
  <blockquote class="editor-note-block"><strong>Non-Going Concern Basis of Preparation:</strong><br/>"These financial statements have been prepared on a net realizable value basis. The Company has incurred consecutive losses, and its net worth is negative. Due to defaults on bank loans and pending insolvency proceedings under the Insolvency and Bankruptcy Code, the fundamental assumption of Going Concern is no longer valid. Consequently, all assets have been written down to their estimated net realizable values, and long-term liabilities have been reclassified as current liabilities."</blockquote>
  If preparing on a <strong>Going Concern basis under Material Uncertainty</strong>:
  <blockquote class="editor-note-block"><strong>Material Uncertainty Related to Going Concern:</strong><br/>"The Company has suffered net losses of ₹850 Lakhs, and its current liabilities exceed current assets by ₹800 Lakhs. The Company has defaulted on bank loans, which are classified as NPAs. These conditions indicate the existence of a material uncertainty that may cast significant doubt on the Company's ability to continue as a going concern. However, these financial statements have been prepared on a going concern basis because the management is negotiating a debt restructuring and expects to finalize a strategic equity investment within the next six months."</blockquote>
  </p>
  <p><strong>Auditor Verification:</strong> Examine bank correspondence, legal notices, and cash flow forecasts for the next 12 months. Evaluate management's mitigation plans. If the plans are unviable and management refuses to use a liquidation basis, the auditor must issue an <strong>Adverse Opinion</strong>. If Going Concern is appropriate but material uncertainty exists, and management provides adequate disclosure, the auditor must issue an <strong>Unmodified Opinion</strong> with a separate section: <strong>Material Uncertainty Related to Going Concern</strong>.</p>
</div>

<hr/>

<h2>Case 4: Non-Provision of Overdue Bank Interest under Dispute</h2>
<div class="editor-case-law">
  <span class="case-label">⚖️ CASE STUDY — INTERMEDIATE (Para 10(c))</span>
  <p><strong>Facts:</strong> Zenith Exports Ltd defaulted on its interest payments for a term loan from Bank of India. The bank issued a demand notice claiming interest of ₹18 Lakhs for the financial year. Zenith Exports Ltd filed a civil suit disputing the bank's interest calculation, claiming that the bank applied a higher rate than agreed. The company did not record the ₹18 Lakhs interest expense in its books, stating in Note 1 that interest will be accounted for on a "cash basis" once the court settles the dispute.</p>
  <p><strong>Issue:</strong> Does the non-provision of disputed interest comply with the accrual assumption of AS 1?</p>
  <p><strong>Governing Principle:</strong> Accrual is a fundamental accounting assumption. Revenues and costs are accrued—meaning they are recognized as they are earned or incurred and recorded in the financial statements of the periods to which they relate, irrespective of cash flow [Page 4]. If a fundamental assumption is not followed, the fact must be disclosed [Page 5].</p>
  <p><strong>Analysis &amp; Conclusion:</strong> The liability to pay interest arises from the loan agreement and accumulates with the passage of time. A dispute regarding the interest rate does not stop the interest from accruing. Zenith Exports Ltd has enjoyed the use of the bank's funds during the year; hence, the finance cost has been incurred. Recording interest on a "cash basis" because of a dispute violates the accrual assumption. The company must accrue the interest. If the rate is disputed, the undisputed portion must be accrued, and the disputed balance should be accrued or disclosed as a contingent liability based on the likelihood of loss under AS 29.</p>
  <p><strong>Accounting Treatment:</strong> Accrue the interest expense based on the bank's contract rate. If the dispute has merit, accrue the undisputed rate (e.g., ₹12 Lakhs) and create a provision for the disputed amount (e.g., ₹6 Lakhs) or disclose it:
  <pre>Debit  Finance Costs (Interest Expense) A/c     ₹1,800,000\nCredit Outstanding Interest Liability A/c                  ₹1,800,000\n(Being term loan interest accrued for the year under the accrual basis)</pre>
  </p>
  <p><strong>Disclosure Note:</strong> Disclose the finance cost policy and the pending litigation in the notes:
  <blockquote class="editor-note-block"><strong>Accrual of Finance Costs &amp; Disputed Interest:</strong><br/>"Finance costs are recognized on an accrual basis using the contract rates. During the year, the Company accrued interest of ₹18 Lakhs on bank term loans. The Company has disputed interest of ₹6 Lakhs in court. Pending the court's decision, the entire ₹18 Lakhs has been accrued as an expense to comply with the accrual assumption."</blockquote>
  </p>
  <p><strong>Auditor Verification:</strong> Verify the interest calculation using the loan agreement terms and bank statements. Confirm that the interest has been accrued in full. If the company fails to accrue the interest, qualify the audit report, stating that the profit is overstated and liabilities are understated by ₹18 Lakhs.</p>
</div>

<hr/>

<h2>Case 5: Creation of Hidden Reserves under the Guise of Prudence</h2>
<div class="editor-case-law">
  <span class="case-label">⚖️ CASE STUDY — ADVANCED (Para 17(a))</span>
  <p><strong>Facts:</strong> BioCure Ltd, a highly profitable pharmaceutical manufacturer, had a strong financial year with a profit before tax of ₹2,500 Lakhs. To reduce its tax liability and build a financial buffer, the board debited the P&L statement to create a "General Provision for Unforeseen Regulatory and Market Risks" of ₹300 Lakhs. The CFO justified this in the board meeting by citing the principle of "Prudence" under AS 1, stating that pharmaceutical regulations are unpredictable and it is prudent to recognize these potential losses early.</p>
  <p><strong>Issue:</strong> Does the creation of a general provision for unspecified future risks comply with the principle of Prudence under AS 1?</p>
  <p><strong>Governing Principle:</strong> Prudence requires that in view of the uncertainty attached to future events, profits are not anticipated but recognized only when realized. However, provision is made for all <em>known</em> liabilities and losses even though the amount cannot be determined with certainty [Page 5]. Prudence does not permit the creation of hidden or secret reserves, nor the deliberate understatement of assets/income or overstatement of liabilities/expenses.</p>
  <p><strong>Analysis &amp; Conclusion:</strong> Prudence requires provisioning only for <em>known</em> liabilities or obligations arising from past events (e.g., product liability claims or inventory obsolescence). Unspecified "regulatory and market risks" are future business risks, not present obligations. Debiting the P&L for these risks understates the current year's profit and overstates liabilities. This creates a "hidden reserve" that management could reverse in a future unprofitable year to artificially boost profits. This misapplies the principle of prudence.</p>
  <p><strong>Accounting Treatment:</strong> The ₹300 Lakhs provision must be reversed from the Profit &amp; Loss statement, restoring the profit before tax to ₹2,500 Lakhs. If the board wants to set aside funds for future regulatory risks, they must transfer the amount from Retained Earnings (Reserves and Surplus) to a "General Regulatory Reserve" as an <em>appropriation of profit</em>, not as an expense:
  <pre>Debit  Surplus in Profit &amp; Loss A/c            ₹30,000,000\nCredit General Regulatory Reserve A/c                      ₹30,000,000\n(Being appropriation of profit to General Regulatory Reserve)</pre>
  </p>
  <p><strong>Disclosure Note:</strong> Disclose the reserve transfer in the notes on Reserves and Surplus:
  <blockquote class="editor-note-block"><strong>Appropriation to General Regulatory Reserve:</strong><br/>"During the year ended March 31, 2026, the Company transferred ₹300 Lakhs from its surplus in the Profit &amp; Loss account to a General Regulatory Reserve to strengthen the financial position against future regulatory risks. This transfer is an appropriation of profit and has no impact on the net profit reported for the year."</blockquote>
  </p>
  <p><strong>Auditor Verification:</strong> Verify if there is a present obligation under AS 29. Since there is no obligating event, provision is not allowed. Insist on the reversal of the P&L charge. If the management refuses, qualify the audit report for understatement of profit and overstatement of provisions.</p>
</div>

<hr/>

<h2>Case 6: Substance Over Form in Hire Purchase / Finance Lease Asset</h2>
<div class="editor-case-law">
  <span class="case-label">⚖️ CASE STUDY — INTERMEDIATE (Para 17(b))</span>
  <p><strong>Facts:</strong> Logistics Express LLP entered into a hire purchase agreement to acquire 10 delivery vans. The cash purchase price of the vans is ₹120 Lakhs. The agreement requires LLP to pay monthly installments over 5 years. LLP controls the vans, registers them in its operating fleet, bears all maintenance and insurance costs, and carries the risk of accidents. However, the legal title remains with the finance company and will transfer to LLP only upon payment of the last installment. LLP's accountant recorded the monthly installments as "Vehicle Rental Expenses" in the P&L, arguing that LLP is not the legal owner of the vans until Year 5.</p>
  <p><strong>Issue:</strong> Does the expensing of hire purchase installments comply with the "Substance over Form" principle of AS 1?</p>
  <p><strong>Governing Principle:</strong> The accounting treatment and presentation of transactions in financial statements should be governed by their economic substance and commercial reality, and not merely by their legal form [Page 5].</p>
  <p><strong>Analysis &amp; Conclusion:</strong> Recording the installments as rent expenses violates the substance over form principle. Under legal form, the legal title remains with the finance company, and LLP is technically renting the vans. But under economic substance, LLP enjoys all economic benefits (generating transport revenue) and bears all operational risks (accidents, wear and tear, maintenance). This transaction is a financed purchase of capital assets. It understates the assets (Property, Plant &amp; Equipment) and liabilities (Finance Lease Obligation) on the Balance Sheet, and misclassifies the depreciation and interest expenses in the P&L.</p>
  <p><strong>Accounting Treatment:</strong> Capitalise the vans at the cash purchase price of ₹120 Lakhs. Record a corresponding liability. Charge depreciation over the useful life of the vans and record the interest portion of the installments in the P&L:
  <pre>Debit  Property, Plant &amp; Equipment (Vans) A/c    ₹12,000,000\nCredit Hire Purchase Liability A/c                          ₹12,000,000\n(Being vans capitalized at cash price under substance over form principle)</pre>
  </p>
  <p><strong>Disclosure Note:</strong> Disclose the capitalization policy in Note 1:
  <blockquote class="editor-note-block"><strong>Assets Acquired under Hire Purchase/Finance Lease:</strong><br/>"Assets held under hire purchase agreements and finance leases are capitalized as Property, Plant &amp; Equipment at their cash purchase price and depreciated over their useful lives. The corresponding liability is recorded as a finance lease obligation. Finance charges are allocated to periods over the lease term to produce a constant periodic rate of interest on the remaining balance of the liability."</blockquote>
  </p>
  <p><strong>Auditor Verification:</strong> Examine the hire purchase agreement to verify the cash price and interest rates. Ensure that the vehicles are capitalized, and depreciation is charged in accordance with AS 10. If the vehicles are not capitalized, qualify the audit report for understatement of assets and liabilities.</p>
</div>

<hr/>

<h2>Case 7: Materiality in Small Assets Capitalization</h2>
<div class="editor-case-law">
  <span class="case-label">⚖️ CASE STUDY — BEGINNER (Para 17(c))</span>
  <p><strong>Facts:</strong> Global IT Solutions Ltd has 3,000 software engineers. Every year, the company purchases computer mice, keyboards, and office calculators. In the current financial year, it purchased these items for ₹18 Lakhs. The average cost per item is ₹600. The accounting team capitalized all ₹18 Lakhs under "Office Equipment" and began depreciating them over 3 years, arguing that since the items have a useful life exceeding one year, capitalizing them is technically correct.</p>
  <p><strong>Issue:</strong> Is capitalizing low-value office tools appropriate under the Materiality principle of AS 1?</p>
  <p><strong>Governing Principle:</strong> Financial statements should disclose all "material" items—meaning items the knowledge of which might influence the economic decisions of users [Page 5]. Immaterial items can be aggregated or expensed immediately to maintain accounting efficiency, even if they meet the technical definition of an asset.</p>
  <p><strong>Analysis &amp; Conclusion:</strong> While a computer mouse or calculator has a useful life of more than one year, its individual cost (₹600) is negligible. The administrative expense of tagging, tracking, and computing depreciation for thousands of individual low-value items outweighs the benefit to users of financial statements. The ₹18 Lakhs expenditure represents only 0.1% of the company's total assets and will not influence any user's economic decisions. Therefore, applying the materiality principle allows the company to expense these items immediately.</p>
  <p><strong>Accounting Treatment:</strong> Charge the entire ₹18 Lakhs to the P&L statement under "Office &amp; Administrative Expenses" in the year of purchase:
  <pre>Debit  Office &amp; Administrative Expenses A/c      ₹1,800,000\nCredit Bank/Cash A/c                                        ₹1,800,000\n(Being low-value computer peripherals expensed under the materiality principle)</pre>
  </p>
  <p><strong>Disclosure Note:</strong> No specific note disclosure is required for the expense itself due to its immateriality. However, the company's fixed asset capitalization policy in Note 1 should state the capitalization threshold:
  <blockquote class="editor-note-block"><strong>Property, Plant &amp; Equipment Capitalization Policy:</strong><br/>"Fixed assets are stated at cost less accumulated depreciation. Low-value assets costing ₹5,000 or less per individual item are expensed in the year of purchase under the materiality principle."</blockquote>
  </p>
  <p><strong>Auditor Verification:</strong> Verify that the capitalization threshold is applied consistently from year to year. Ensure that management is not grouping individually small assets (e.g., buying ₹50 Lakhs of network cabling) to expense them when they should be capitalized as a single system.</p>
</div>

<hr/>

<h2>Case 8: Disclosure Cures No Wrong (Head Office Salaries Wrong Capitalization)</h2>
<div class="editor-case-law">
  <span class="case-label">⚖️ CASE STUDY — ADVANCED (Para 23)</span>
  <p><strong>Facts:</strong> Realcon Developers Ltd is a construction company. During the year, it capitalized ₹40 Lakhs of corporate head office administrative salaries (including the HR and accounting departments) under "Work-in-Progress (Inventory)" to avoid showing a loss in its P&L. In Note 1 to the financial statements, the company disclosed: <em>"The company capitalizes corporate head office administrative salaries as part of project work-in-progress inventory."</em> Management argued that since they disclosed this policy clearly in Note 1, the accounting treatment is transparent and acceptable.</p>
  <p><strong>Issue:</strong> Can the note disclosure in Note 1 make the wrong capitalization of administrative salaries acceptable under AS 1?</p>
  <p><strong>Governing Principle:</strong> Disclosure of accounting policies or of changes therein cannot remedy a wrong or inappropriate treatment of an item in the accounts [Page 5].</p>
  <p><strong>Analysis &amp; Conclusion:</strong> Under AS 2 and AS 7, only costs directly related to bringing the inventory/project to its present location and condition can be capitalized. Corporate head office salaries (HR, Finance) are general administrative costs and must be expensed in the period they occur. Capitalising them under inventory WIP violates GAAP. Management's argument that "the disclosure cures the treatment" is incorrect. Note disclosures are meant to explain valid accounting choices, not to justify deviations from accounting standards.</p>
  <p><strong>Accounting Treatment:</strong> Reverse the capitalized salaries from Work-in-Progress inventory and expense them in the P&L under "Employee Benefit Expenses":
  <pre>Debit  Employee Benefit Expenses A/c            ₹4,000,000\nCredit Project Work-in-Progress (WIP) A/c                  ₹4,000,000\n(Being corporate salaries wrongly capitalized in WIP reversed to P&L)</pre>
  </p>
  <p><strong>Disclosure Note:</strong> Disclose the salaries correctly as an expense in the Employee Benefit note:
  <pre>Employee Benefit Expenses:\n- Salaries and Wages: ₹X,XXX (Includes ₹40 Lakhs corporate salaries)</pre>
  </p>
  <p><strong>Auditor Verification:</strong> Verify the nature of the salaries capitalized in project WIP. Request management to correct the error by expensing the ₹40 Lakhs. If management refuses, the auditor must <strong>Qualify</strong> the audit report or issue an <strong>Adverse Opinion</strong>, stating that profits and inventories are overstated by ₹40 Lakhs. The note disclosure does not change this requirement.</p>
</div>

<hr/>

<h2>Case 9: Non-Disclosure of Revenue Recognition Policy in SaaS Business</h2>
<div class="editor-case-law">
  <span class="case-label">⚖️ CASE STUDY — INTERMEDIATE (Para 24)</span>
  <p><strong>Facts:</strong> CloudFlow India Pvt Ltd is a startup providing annual cloud-based software subscriptions. The company receives 100% of the subscription fees upfront but recognizes the entire cash receipt as revenue on Day 1. In Note 1 to their financial statements, the company lists standard accounting policies (depreciation, taxes) but does not provide any description of their revenue recognition policy. Management argued that since they are a private company, they do not need to disclose detailed revenue recognition rules.</p>
  <p><strong>Issue:</strong> Does the omission of the revenue recognition policy violate AS 1, and what is its impact on the presentation of financial statements?</p>
  <p><strong>Governing Principle:</strong> All significant accounting policies adopted in the preparation and presentation of financial statements should be disclosed [Page 5]. Revenue recognition is a critical accounting policy and must be disclosed to ensure financial statements are understandable and comparable [Page 4].</p>
  <p><strong>Analysis &amp; Conclusion:</strong> Revenue recognition is the most significant accounting policy for a subscription-based software company. Recognising annual subscription fees upfront on Day 1 violates the accrual assumption because the company has a continuing obligation to provide the software service over the 12-month period. By omitting the revenue recognition policy from Note 1, the company hides this aggressive practice. This omission prevents users of the financial statements from evaluating the quality and sustainability of the reported revenues, violating AS 1.</p>
  <p><strong>Accounting Treatment:</strong> Recognize subscription revenue pro-rata over the 12-month contract period. Defer the unearned portion as "Unearned/Deferred Revenue" under Current Liabilities. Disclose the policy clearly in Note 1.</p>
  <p><strong>Disclosure Note:</strong> Insert the following policy in Note 1:
  <blockquote class="editor-note-block"><strong>Revenue Recognition Policy:</strong><br/>"Revenue from cloud-based software subscriptions is recognized on a straight-line basis over the period of the subscription contract. Subscription fees received in advance are deferred and carried on the Balance Sheet as 'Unearned Revenue' under current liabilities."</blockquote>
  </p>
  <p><strong>Auditor Verification:</strong> Verify the subscription start dates and ensure revenue is deferred correctly. Request management to add the revenue recognition policy note. If they refuse to disclose the policy or continue recognizing revenue on a cash basis, qualify the audit report.</p>
</div>

<hr/>

<h2>Case 10: Change in Accounting Policy Solely for Tax / Profit Window Dressing</h2>
<div class="editor-case-law">
  <span class="case-label">⚖️ CASE STUDY — ADVANCED (Para 22)</span>
  <p><strong>Facts:</strong> BuildWell Ltd is a construction company bidding for a national highway contract. The pre-qualification criteria require the bidder to show a net profit margin of at least 8% in the preceding fiscal year. The company's projected net profit margin is 6% using the Percentage of Completion Method (POCM) as per AS 7. To meet the 8% margin requirement, the board decided to change its accounting policy for revenue recognition to the Project Completion Method for all projects that are more than 90% complete, recognizing the entire project profit in the current year. Management justified the change in the board minutes as "a measures to improve project presentation for bank bidding."</p>
  <p><strong>Issue:</strong> Is this change in accounting policy valid under AS 1?</p>
  <p><strong>Governing Principle:</strong> A change in accounting policy is permitted under AS 1 only if: (a) required by statute, (b) required for compliance with an accounting standard, or (c) results in a more appropriate presentation of financial statements [Page 5].</p>
  <p><strong>Analysis &amp; Conclusion:</strong> The change is not required by any new law or standard. Furthermore, shifting from the Percentage of Completion Method (POCM) to the Project Completion Method solely for near-complete projects does not result in a "more appropriate presentation." Instead, it violates the consistency principle and is designed to accelerate revenue to meet a tender requirement (window dressing). Because the change lacks technical justification, it violates AS 1.</p>
  <p><strong>Accounting Treatment:</strong> The company must continue to apply the Percentage of Completion Method (POCM) consistently to all construction projects in accordance with AS 7. The proposed policy change must be rejected.</p>
  <p><strong>Auditor Verification:</strong> Review the board minutes to identify the reasons for the proposed change. Examine the impact of the policy change on project profitability. If management implements the change without proper justification, the auditor must issue a <strong>Qualified or Adverse Audit Report</strong> for deviation from AS 1 and AS 7.</p>
</div>
`;

async function main() {
  console.log('Seeding AS 1 examplesHtml...');
  const entry = await prisma.entry.findUnique({ where: { id: 10 } });
  if (!entry) {
    console.error('Entry 10 not found.');
    return;
  }
  
  let entryBody = {};
  if (entry.entryBody) {
    entryBody = typeof entry.entryBody === 'string' 
      ? JSON.parse(entry.entryBody) 
      : entry.entryBody;
  }
  
  entryBody.examplesHtml = examplesHtml;
  
  await prisma.entry.update({
    where: { id: 10 },
    data: {
      entryBody: entryBody
    }
  });
  
  console.log('AS 1 examplesHtml seeded successfully!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
