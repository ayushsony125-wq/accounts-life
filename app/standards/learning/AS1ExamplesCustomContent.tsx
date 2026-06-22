'use client'

import React, { useState } from 'react'
import { FileText } from 'lucide-react'

interface AS1ExamplesCustomContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences: (text: string) => React.ReactNode;
}

export function AS1ExamplesCustomContent({ navigateToPdfPage }: AS1ExamplesCustomContentProps) {
  const PdfRef = ({ page }: { page: number }) => (
    <button
      onClick={() => navigateToPdfPage(page)}
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={`Open ICAI AS 1 PDF — Page ${page}`}
    >
      <FileText size={9} className="shrink-0" />
      p.{page}
    </button>
  )

  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0)

  const cases = [
    {
      title: "Case 1: Changing Inventory Valuation Method from FIFO to Weighted Average",
      difficulty: "INTERMEDIATE",
      paraRef: "Para 26",
      facts: (
        <div className="space-y-2">
          <p>ValuTex India Ltd is a large-scale manufacturing enterprise. For the past five years, it has valued its raw material inventories using the First-In, First-Out (FIFO) method. During the financial year 2025-26, the prices of raw materials rose persistently by 35% due to global supply chain disruptions.</p>
          <p>To mitigate inflation-driven volatility in its earnings, the management decided to switch to the Weighted Average Cost (WAC) method. The inventory values at March 31, 2026, under the two methods are:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>FIFO Value:</strong> ₹450 Lakhs</li>
            <li><strong>WAC Value:</strong> ₹380 Lakhs</li>
            <li><strong>Profit Before Tax (prior to this adjustment):</strong> ₹1,200 Lakhs</li>
          </ul>
        </div>
      ),
      issue: (
        <p>Does the shift from FIFO to WAC constitute a change in accounting policy under AS 1? If yes, is the change justifiable, and how must the resulting ₹70 Lakhs reduction in inventory value be accounted for and disclosed?</p>
      ),
      principle: (
        <div className="space-y-2">
          <p>Valuation of inventories is a significant accounting policy <PdfRef page={4} />. A change in accounting policy is permitted under AS 1 only if:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>It is required by statute.</li>
            <li>It is required for compliance with an accounting standard.</li>
            <li>It results in a more appropriate presentation of financial statements <PdfRef page={5} />.</li>
          </ol>
          <p>Any change having a material effect must be disclosed along with its quantified impact <PdfRef page={7} />.</p>
        </div>
      ),
      analysis: (
        <div className="space-y-2">
          <p>The cost formula used to allocate cost to inventory (FIFO vs. WAC) is a cost flow assumption, which is an accounting policy. During periods of persistent inflation, FIFO results in valuing ending inventory at recent, higher prices (inflating assets and profits), while raw material consumption is charged at older, cheaper prices.</p>
          <p>WAC averages the price spikes, matching revenue with a more normalized raw material cost. Therefore, changing to WAC provides a more appropriate presentation of the financial results.</p>
          <p>Since the difference of ₹70 Lakhs represents 5.83% of the profit before tax, it exceeds the materiality threshold and requires quantification and explicit disclosure <PdfRef page={5} />.</p>
        </div>
      ),
      treatment: (
        <div className="space-y-2">
          <p>The inventory must be carried at the WAC value of ₹380 Lakhs on the Balance Sheet. The ₹70 Lakhs reduction is charged to the Profit & Loss statement under "Cost of Materials Consumed":</p>
          <pre className="bg-slate-950 dark:bg-black p-3.5 rounded-lg font-mono text-[11px] text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed">
{`Debit  Cost of Materials Consumed A/c     ₹70,000,000
Credit Closing Stock (Inventory) A/c                   ₹70,000,000
(Being raw material inventory valued at Weighted Average Cost instead of FIFO)`}
          </pre>
        </div>
      ),
      disclosure: (
        <div className="space-y-2">
          <p>Include the following statement in <em>Note 1: Summary of Significant Accounting Policies</em>:</p>
          <blockquote className="border-l-4 border-blue-500 pl-3 italic text-xs text-slate-700 dark:text-gray-300 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-r-lg">
            <strong>Inventory Valuation Policy Change:</strong><br />
            "During the year ended March 31, 2026, the Company changed its policy for valuing raw material inventories from the First-In, First-Out (FIFO) method to the Weighted Average Cost (WAC) method to achieve a more appropriate presentation of raw material consumption costs during periods of high price volatility. As a result of this change, the value of inventories as of March 31, 2026, is lower by ₹70 Lakhs, and the profit before tax for the year ended on that date has decreased by ₹70 Lakhs."
          </blockquote>
        </div>
      ),
      auditorView: (
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Verify the mathematical computation of ending inventory under both FIFO and WAC.</li>
          <li>Ensure that WAC has been applied consistently to all similar inventory categories.</li>
          <li>Confirm that the management has documented the commercial justification for the policy change.</li>
          <li>Check that the note disclosure is complete and matches the books. If the disclosure is missing or incorrect, qualify the audit report.</li>
        </ul>
      ),
      importance: (
        <p>Inventory write-downs directly reduce the Current Ratio and Gross Margin. This can trigger covenant breaches with working capital lenders, who require a minimum Current Ratio (typically 1.33:1).</p>
      ),
      trap: (
        <p><strong>Red Flag:</strong> Management shifting back to FIFO in a subsequent deflationary year to avoid recording losses, or switching methods repeatedly without a change in market conditions (known as earnings management).</p>
      ),
      ref: "ICAI AS 1 PDF Page 7, Para 26; Page 5, Para 22.",
      refPage: 7
    },
    {
      title: "Case 2: Useful Life Revision vs. Depreciation Method Change",
      difficulty: "INTERMEDIATE",
      paraRef: "Para 14",
      facts: (
        <div className="space-y-2">
          <p>InfraCorp Ltd operates heavy earthmoving machinery. In FY 2025-26, the company decided to change its depreciation method for machinery from the Straight-Line Method (SLM) to the Written Down Value (WDV) method to align with the accelerated wear and tear in early years. This change requires a retrospective recalculation, resulting in an additional cumulative depreciation charge of ₹120 Lakhs in the current year.</p>
          <p>In the same year, a technical review of the company's delivery trucks showed that rough road conditions reduced their remaining useful life from 8 years to 5 years. Management wants to classify both adjustments as "Accounting Policy Changes" to present them together in Note 1.</p>
        </div>
      ),
      issue: (
        <p>How should the change in the depreciation method and the change in useful life be classified and disclosed under AS 1 and AS 5?</p>
      ),
      principle: (
        <div className="space-y-2">
          <p>The selection of depreciation methods (SLM vs. WDV) is a significant accounting policy <PdfRef page={4} />. A change in an accounting policy must be disclosed separately, showing its nature, justification, and quantified impact on current and future periods <PdfRef page={7} />.</p>
          <p>In contrast, the estimation of useful lives of depreciable assets is an accounting estimate, governed by AS 5 <PdfRef page={4} />.</p>
        </div>
      ),
      analysis: (
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Depreciation Method:</strong> A depreciation method represents the systematic policy for allocating the cost of an asset over its life. Changing from SLM to WDV represents a change in accounting policy. It must be applied with retrospective effect (recalculating past depreciation and charging/crediting the difference to the current P&L) and disclosed under AS 1 <PdfRef page={4} />.</li>
          <li><strong>Useful Life Revision:</strong> The estimate of useful life is based on judgment and wear-and-tear conditions. A change in useful life is a change in an accounting estimate, not an accounting policy. It must be applied prospectively (depreciating the remaining carrying amount over the revised 5 years) and is disclosed under AS 5. The two changes cannot be aggregated.</li>
        </ul>
      ),
      treatment: (
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Machinery (Policy Change):</strong> Calculate the depreciation under WDV from the date of acquisition to the beginning of the current year. Debit the excess of WDV depreciation over SLM depreciation (₹120 Lakhs) to the current year's P&L under "Depreciation Adjustment (Prior Periods)" or "Depreciation Expense".</li>
          <li><strong>Truck Fleet (Estimate Change):</strong> Recalculate depreciation prospectively. Take the Net Book Value at the beginning of the year and divide it by the revised remaining life of 5 years. No retrospective adjustment is allowed.</li>
        </ul>
      ),
      disclosure: (
        <div className="space-y-2.5">
          <p>Disclose two separate notes in <em>Note 1: Summary of Significant Accounting Policies</em>:</p>
          <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-gray-800 space-y-2 font-mono text-[11px] leading-relaxed text-slate-700 dark:text-gray-300">
            <p className="font-extrabold text-blue-600 dark:text-blue-400">Note 1(a): Change in Depreciation Policy (Accounting Policy Change):</p>
            <p className="italic">"The Company has changed its method of depreciation for plant and machinery from the Straight-Line Method (SLM) to the Written Down Value (WDV) method to better reflect the pattern of economic benefits consumed. This change has been applied retrospectively, resulting in an additional depreciation charge of ₹120 Lakhs. Consequently, the profit before tax for the year has decreased by ₹120 Lakhs, and the net book value of fixed assets is lower by the same amount."</p>
            <p className="font-extrabold text-purple-650 dark:text-purple-400 mt-2">Note 1(b): Revision of Fleet Useful Life (Accounting Estimate Change):</p>
            <p className="italic">"Based on a technical evaluation of operational wear and tear, the estimated useful life of delivery trucks has been revised from 8 years to 5 years with effect from April 1, 2025. This change in accounting estimate has been applied prospectively, resulting in a higher depreciation charge of ₹35 Lakhs for the current year."</p>
          </div>
        </div>
      ),
      auditorView: (
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Verify the cumulative calculation of depreciation for machinery from the original asset acquisition records.</li>
          <li>Examine the independent technical appraiser's certificate for the truck fleet useful life revision.</li>
          <li>Ensure that the useful life change is not treated as a retrospective policy change. If management attempts to do so, qualify the audit report.</li>
        </ul>
      ),
      importance: (
        <p>Depreciation adjustments directly impact EBITDA (if policy changes are misclassified) and profit margins. Understanding the difference prevents the manipulation of operating earnings.</p>
      ),
      trap: (
        <p><strong>Red Flag:</strong> Management switching from WDV to SLM near the end of an asset's life to defer depreciation charges and boost current earnings.</p>
      ),
      ref: "ICAI AS 1 PDF Page 4, Para 14; AS 5 Para 21-25; AS 10 Para 61.",
      refPage: 4
    },
    {
      title: "Case 3: Going Concern in Severe Financial Distress",
      difficulty: "ADVANCED",
      paraRef: "Para 10(a)",
      facts: (
        <div className="space-y-2">
          <p>UrbanStores Ltd operates a retail chain. Over the last three fiscal years, the company has suffered severe losses, resulting in accumulated losses of ₹850 Lakhs, which has wiped out its paid-up capital of ₹500 Lakhs (negative net worth).</p>
          <p>The balance sheet shows current assets of ₹400 Lakhs against current liabilities of ₹1,200 Lakhs. Bank loans are classified as NPAs, and major suppliers have filed insolvency petitions under the Insolvency and Bankruptcy Code (IBC).</p>
          <p>Despite these factors, the board of directors prepared the financial statements on a Going Concern basis, stating in the notes that they are in the final stages of negotiating a debt restructure and a strategic equity infusion.</p>
        </div>
      ),
      issue: (
        <p>Is the Going Concern assumption valid for UrbanStores Ltd, and what are the disclosure requirements under AS 1 if there is material uncertainty or a breach of this assumption?</p>
      ),
      principle: (
        <div className="space-y-2">
          <p>Going Concern is a fundamental accounting assumption. It is assumed that the enterprise will continue in operation for the foreseeable future, with neither the intention nor the necessity of liquidation or curtailing materially the scale of its operations <PdfRef page={3} />.</p>
          <p>If a fundamental assumption is followed, no disclosure is required. If it is not followed, that fact must be disclosed, along with the basis on which the financial statements have been prepared <PdfRef page={5} />.</p>
        </div>
      ),
      analysis: (
        <div className="space-y-2">
          <p>UrbanStores Ltd exhibits multiple indicators of going concern distress:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Financial Indicators:</strong> Negative net worth, working capital deficit (₹800 Lakhs), defaulted bank loans.</li>
            <li><strong>Operating Indicators:</strong> Loss of key suppliers and market share.</li>
            <li><strong>Legal Indicators:</strong> IBC insolvency petitions.</li>
          </ul>
          <p>Management’s restructuring negotiations are preliminary and do not provide sufficient objective evidence that the company can continue operating. Because the assumption is highly doubtful, preparing financial statements under historical cost (carrying long-term assets at cost less depreciation rather than scrap value) is misleading.</p>
          <p>If management prepares the statements on a going concern basis, they must disclose the material uncertainties. If liquidation is imminent, the accounts must be prepared on a net realizable value basis <PdfRef page={5} />.</p>
        </div>
      ),
      treatment: (
        <ol className="list-decimal pl-5 space-y-1.5">
          <li><strong>If the Going Concern assumption is rejected:</strong> Restate all assets to their Net Realisable Value (NRV). Reclassify long-term liabilities as current.</li>
          <li><strong>If Going Concern is followed under material uncertainty:</strong> Retain cost-based accounting but disclose the material uncertainties clearly.</li>
        </ol>
      ),
      disclosure: (
        <div className="space-y-3">
          <p>If preparing on a <strong>Liquidation (non-going concern) basis</strong>:</p>
          <blockquote className="border-l-4 border-red-500 pl-3 italic text-xs text-slate-705 dark:text-gray-300 bg-red-50/40 dark:bg-[#2C1D1D] p-2.5 rounded-r-lg">
            <strong>Non-Going Concern Basis of Preparation:</strong><br />
            "These financial statements have been prepared on a net realizable value basis. The Company has incurred consecutive losses, and its net worth is negative. Due to defaults on bank loans and pending insolvency proceedings under the Insolvency and Bankruptcy Code, the fundamental assumption of Going Concern is no longer valid. Consequently, all assets have been written down to their estimated net realizable values, and long-term liabilities have been reclassified as current liabilities."
          </blockquote>
          <p>If preparing on a <strong>Going Concern basis under Material Uncertainty</strong>:</p>
          <blockquote className="border-l-4 border-amber-500 pl-3 italic text-xs text-slate-705 dark:text-gray-300 bg-amber-50/40 dark:bg-amber-955/20 p-2.5 rounded-r-lg">
            <strong>Material Uncertainty Related to Going Concern:</strong><br />
            "The Company has suffered net losses of ₹850 Lakhs, and its current liabilities exceed current assets by ₹800 Lakhs. The Company has defaulted on bank loans, which are classified as NPAs. These conditions indicate the existence of a material uncertainty that may cast significant doubt on the Company's ability to continue as a going concern. However, these financial statements have been prepared on a going concern basis because the management is negotiating a debt restructuring and expects to finalize a strategic equity investment within the next six months."
          </blockquote>
        </div>
      ),
      auditorView: (
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Examine bank correspondence, legal notices, and cash flow forecasts for the next 12 months.</li>
          <li>Evaluate management's mitigation plans. If the plans are unviable and management refuses to use a liquidation basis, the auditor must issue an <strong>Adverse Opinion</strong>.</li>
          <li>If Going Concern is appropriate but material uncertainty exists, and management provides adequate disclosure, the auditor must issue an <strong>Unmodified Opinion</strong> with a separate section: <strong>Material Uncertainty Related to Going Concern</strong>.</li>
        </ul>
      ),
      importance: (
        <p>Lenders, trade creditors, and employees rely on going concern disclosures to assess the risk of non-payment or job loss. Carrying inventory or machinery at cost when a factory is about to close misrepresents the recovery value of the business.</p>
      ),
      trap: (
        <p><strong>Red Flag:</strong> Management preparing financial statements on a going concern basis with zero disclosures of defaults, hoping that "informal buyout talks" will succeed before the audit completes.</p>
      ),
      ref: "ICAI PDF Page 3, Para 10(a); Page 5, Para 21; SA 570 (Revised) — Going Concern.",
      refPage: 3
    },
    {
      title: "Case 4: Non-Provision of Overdue Bank Interest under Dispute",
      difficulty: "INTERMEDIATE",
      paraRef: "Para 10(c)",
      facts: (
        <p>Zenith Exports Ltd defaulted on its interest payments for a term loan from Bank of India. The bank issued a demand notice claiming interest of ₹18 Lakhs for the financial year. Zenith Exports Ltd filed a civil suit disputing the bank's interest calculation, claiming that the bank applied a higher rate than agreed. The company did not record the ₹18 Lakhs interest expense in its books, stating in Note 1 that interest will be accounted for on a "cash basis" once the court settles the dispute.</p>
      ),
      issue: (
        <p>Does the non-provision of disputed interest comply with the accrual assumption of AS 1?</p>
      ),
      principle: (
        <div className="space-y-2">
          <p>Accrual is a fundamental accounting assumption. Revenues and costs are accrued—meaning they are recognized as they are earned or incurred and recorded in the financial statements of the periods to which they relate, irrespective of cash flow <PdfRef page={4} />.</p>
          <p>If a fundamental assumption is not followed, the fact must be disclosed <PdfRef page={5} />.</p>
        </div>
      ),
      analysis: (
        <div className="space-y-2">
          <p>The liability to pay interest arises from the loan agreement and accumulates with the passage of time. A dispute regarding the interest rate does not stop the interest from accruing.</p>
          <p>Zenith Exports Ltd has enjoyed the use of the bank's funds during the year; hence, the finance cost has been incurred.</p>
          <p>Recording interest on a "cash basis" because of a dispute violates the accrual assumption. The company must accrue the interest. If the rate is disputed, the undisputed portion must be accrued, and the disputed balance should be accrued or disclosed as a contingent liability based on the likelihood of loss under AS 29.</p>
        </div>
      ),
      treatment: (
        <div className="space-y-2">
          <p>Accrue the interest expense based on the bank's contract rate. If the dispute has merit, accrue the undisputed rate (e.g., ₹12 Lakhs) and create a provision for the disputed amount (e.g., ₹6 Lakhs) or disclose it:</p>
          <pre className="bg-slate-950 dark:bg-black p-3.5 rounded-lg font-mono text-[11px] text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed">
{`Debit  Finance Costs (Interest Expense) A/c     ₹1,800,000
Credit Outstanding Interest Liability A/c                  ₹1,800,000
(Being term loan interest accrued for the year under the accrual basis)`}
          </pre>
        </div>
      ),
      disclosure: (
        <div className="space-y-2">
          <p>Disclose the finance cost policy and the pending litigation in the notes:</p>
          <blockquote className="border-l-4 border-blue-500 pl-3 italic text-xs text-slate-707 dark:text-gray-305 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-r-lg">
            <strong>Accrual of Finance Costs &amp; Disputed Interest:</strong><br />
            "Finance costs are recognized on an accrual basis using the contract rates. During the year, the Company accrued interest of ₹18 Lakhs on bank term loans. The Company has disputed interest of ₹6 Lakhs in court. Pending the court's decision, the entire ₹18 Lakhs has been accrued as an expense to comply with the accrual assumption."
          </blockquote>
        </div>
      ),
      auditorView: (
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Verify the interest calculation using the loan agreement terms and bank statements.</li>
          <li>Confirm that the interest has been accrued in full. If the company fails to accrue the interest, qualify the audit report, stating that the profit is overstated and liabilities are understated by ₹18 Lakhs.</li>
        </ul>
      ),
      importance: (
        <p>Failing to accrue interest inflates the Interest Coverage Ratio (EBIT / Interest Expense). This ratio is monitored by credit rating agencies; a false ratio can prevent a rating downgrade.</p>
      ),
      trap: (
        <p><strong>Red Flag:</strong> Management claiming that "since the matter is sub-judice (pending in court), the liability is not confirmed and therefore cannot be accrued." Under AS 1, accrual is based on the transaction event, not the court decree.</p>
      ),
      ref: "ICAI AS 1 PDF Page 4, Para 10(c); Page 5, Para 21; Companies Act, 2013 Section 128(1).",
      refPage: 4
    },
    {
      title: "Case 5: Creation of Hidden Reserves under the Guise of Prudence",
      difficulty: "ADVANCED",
      paraRef: "Para 17(a)",
      facts: (
        <p>BioCure Ltd, a highly profitable pharmaceutical manufacturer, had a strong financial year with a profit before tax of ₹2,500 Lakhs. To reduce its tax liability and build a financial buffer, the board debited the P&L statement to create a "General Provision for Unforeseen Regulatory and Market Risks" of ₹300 Lakhs. The CFO justified this in the board meeting by citing the principle of "Prudence" under AS 1, stating that pharmaceutical regulations are unpredictable and it is prudent to recognize these potential losses early.</p>
      ),
      issue: (
        <p>Does the creation of a general provision for unspecified future risks comply with the principle of Prudence under AS 1?</p>
      ),
      principle: (
        <div className="space-y-2">
          <p>Prudence requires that in view of the uncertainty attached to future events, profits are not anticipated but recognized only when realized. However, provision is made for all <em>known</em> liabilities and losses even though the amount cannot be determined with certainty <PdfRef page={5} />.</p>
          <p>Prudence does not permit the creation of hidden or secret reserves, nor the deliberate understatement of assets/income or overstatement of liabilities/expenses.</p>
        </div>
      ),
      analysis: (
        <div className="space-y-2">
          <p>Prudence requires provisioning only for <em>known</em> liabilities or obligations arising from past events (e.g., product liability claims or inventory obsolescence). Unspecified "regulatory and market risks" are future business risks, not present obligations.</p>
          <p>Debiting the P&L for these risks understates the current year's profit and overstates liabilities. This creates a "hidden reserve" that management could reverse in a future unprofitable year to artificially boost profits. This misapplies the principle of prudence.</p>
        </div>
      ),
      treatment: (
        <div className="space-y-2">
          <p>The ₹300 Lakhs provision must be reversed from the Profit & Loss statement, restoring the profit before tax to ₹2,500 Lakhs. If the board wants to set aside funds for future regulatory risks, they must transfer the amount from Retained Earnings (Reserves and Surplus) to a "General Regulatory Reserve" as an <em>appropriation of profit</em>, not as an expense:</p>
          <pre className="bg-slate-950 dark:bg-black p-3.5 rounded-lg font-mono text-[11px] text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed">
{`Debit  Surplus in Profit & Loss A/c            ₹30,000,000
Credit General Regulatory Reserve A/c                      ₹30,000,000
(Being appropriation of profit to General Regulatory Reserve)`}
          </pre>
        </div>
      ),
      disclosure: (
        <div className="space-y-2">
          <p>Disclose the reserve transfer in the notes on Reserves and Surplus:</p>
          <blockquote className="border-l-4 border-purple-500 pl-3 italic text-xs text-slate-707 dark:text-gray-305 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-r-lg">
            <strong>Appropriation to General Regulatory Reserve:</strong><br />
            "During the year ended March 31, 2026, the Company transferred ₹300 Lakhs from its surplus in the Profit & Loss account to a General Regulatory Reserve to strengthen the financial position against future regulatory risks. This transfer is an appropriation of profit and has no impact on the net profit reported for the year."
          </blockquote>
        </div>
      ),
      auditorView: (
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Verify if there is a present obligation under AS 29. Since there is no obligating event, provision is not allowed.</li>
          <li>Insist on the reversal of the P&L charge. If the management refuses, qualify the audit report for understatement of profit and overstatement of provisions.</li>
        </ul>
      ),
      importance: (
        <p>Understating profits reduces tax liabilities in the short term but misleads equity shareholders regarding the true earning capacity of the company. It can depress share prices and valuation multiples.</p>
      ),
      trap: (
        <p><strong>Red Flag:</strong> "Big Bath" accounting, where a new management team over-provisions for general risks in a transition year to make their own future performance look better by reversing those provisions.</p>
      ),
      ref: "ICAI AS 1 PDF Page 5, Para 17(a); AS 29 Para 14.",
      refPage: 5
    },
    {
      title: "Case 6: Substance Over Form in Hire Purchase / Finance Lease Asset",
      difficulty: "INTERMEDIATE",
      paraRef: "Para 17(b)",
      facts: (
        <p>Logistics Express LLP entered into a hire purchase agreement to acquire 10 delivery vans. The cash purchase price of the vans is ₹120 Lakhs. The agreement requires LLP to pay monthly installments over 5 years. LLP controls the vans, registers them in its operating fleet, bears all maintenance and insurance costs, and carries the risk of accidents. However, the legal title remains with the finance company and will transfer to LLP only upon payment of the last installment. LLP's accountant recorded the monthly installments as "Vehicle Rental Expenses" in the P&L, arguing that LLP is not the legal owner of the vans until Year 5.</p>
      ),
      issue: (
        <p>Does the expensing of hire purchase installments comply with the "Substance over Form" principle of AS 1?</p>
      ),
      principle: (
        <p>The accounting treatment and presentation of transactions in financial statements should be governed by their economic substance and commercial reality, and not merely by their legal form <PdfRef page={5} />.</p>
      ),
      analysis: (
        <div className="space-y-2">
          <p>Recording the installments as rent expenses violates the substance over form principle:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Legal Form:</strong> The legal title remains with the finance company; LLP is technically renting the vans.</li>
            <li><strong>Economic Substance:</strong> LLP enjoys all economic benefits (generating transport revenue) and bears all operational risks (accidents, wear and tear, maintenance). This transaction is a financed purchase of capital assets.</li>
          </ul>
          <p>It understates the assets (Property, Plant & Equipment) and liabilities (Finance Lease Obligation) on the Balance Sheet, and misclassifies the depreciation and interest expenses in the P&L.</p>
        </div>
      ),
      treatment: (
        <div className="space-y-2">
          <p>Capitalise the vans at the cash purchase price of ₹120 Lakhs. Record a corresponding liability. Charge depreciation over the useful life of the vans and record the interest portion of the installments in the P&L:</p>
          <pre className="bg-slate-950 dark:bg-black p-3.5 rounded-lg font-mono text-[11px] text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed">
{`Debit  Property, Plant & Equipment (Vans) A/c    ₹12,000,000
Credit Hire Purchase Liability A/c                          ₹12,000,000
(Being vans capitalized at cash price under substance over form principle)`}
          </pre>
        </div>
      ),
      disclosure: (
        <div className="space-y-2">
          <p>Disclose the capitalization policy in Note 1:</p>
          <blockquote className="border-l-4 border-purple-500 pl-3 italic text-xs text-slate-707 dark:text-gray-305 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-r-lg">
            <strong>Assets Acquired under Hire Purchase/Finance Lease:</strong><br />
            "Assets held under hire purchase agreements and finance leases are capitalized as Property, Plant & Equipment at their cash purchase price and depreciated over their useful lives. The corresponding liability is recorded as a finance lease obligation. Finance charges are allocated to periods over the lease term to produce a constant periodic rate of interest on the remaining balance of the liability."
          </blockquote>
        </div>
      ),
      auditorView: (
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Examine the hire purchase agreement to verify the cash price and interest rates.</li>
          <li>Ensure that the vehicles are capitalized, and depreciation is charged in accordance with AS 10. If the vehicles are not capitalized, qualify the audit report for understatement of assets and liabilities.</li>
        </ul>
      ),
      importance: (
        <p>Off-balance sheet financing hides debt. Capitalising lease assets increases the Debt-to-Equity ratio, which credit analysts evaluate to determine insolvency risk.</p>
      ),
      trap: (
        <p><strong>Red Flag:</strong> Management intentionally structuring asset acquisitions as hire purchases or operating leases to keep debt off the balance sheet (known as off-balance sheet leverage).</p>
      ),
      ref: "ICAI AS 1 PDF Page 5, Para 17(b); AS 19 Para 26; AS 10 Para 7.",
      refPage: 5
    },
    {
      title: "Case 7: Materiality in Small Assets Capitalization",
      difficulty: "BEGINNER",
      paraRef: "Para 17(c)",
      facts: (
        <p>Global IT Solutions Ltd has 3,000 software engineers. Every year, the company purchases computer mice, keyboards, and office calculators. In the current financial year, it purchased these items for ₹18 Lakhs. The average cost per item is ₹600. The accounting team capitalized all ₹18 Lakhs under "Office Equipment" and began depreciating them over 3 years, arguing that since the items have a useful life exceeding one year, capitalizing them is technically correct.</p>
      ),
      issue: (
        <p>Is capitalizing low-value office tools appropriate under the Materiality principle of AS 1?</p>
      ),
      principle: (
        <div className="space-y-2">
          <p>Financial statements should disclose all "material" items—meaning items the knowledge of which might influence the economic decisions of users <PdfRef page={5} />.</p>
          <p>Immaterial items can be aggregated or expensed immediately to maintain accounting efficiency, even if they meet the technical definition of an asset.</p>
        </div>
      ),
      analysis: (
        <div className="space-y-2">
          <p>While a computer mouse or calculator has a useful life of more than one year, its individual cost (₹600) is negligible. The administrative expense of tagging, tracking, and computing depreciation for thousands of individual low-value items outweighs the benefit to users of financial statements.</p>
          <p>The ₹18 Lakhs expenditure represents only 0.1% of the company's total assets and will not influence any user's economic decisions. Therefore, applying the materiality principle allows the company to expense these items immediately.</p>
        </div>
      ),
      treatment: (
        <div className="space-y-2">
          <p>Charge the entire ₹18 Lakhs to the P&L statement under "Office & Administrative Expenses" in the year of purchase:</p>
          <pre className="bg-slate-950 dark:bg-black p-3.5 rounded-lg font-mono text-[11px] text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed">
{`Debit  Office & Administrative Expenses A/c      ₹1,800,000
Credit Bank/Cash A/c                                        ₹1,800,000
(Being low-value computer peripherals expensed under the materiality principle)`}
          </pre>
        </div>
      ),
      disclosure: (
        <div className="space-y-2">
          <p>No specific note disclosure is required for the expense itself due to its immateriality. However, the company's fixed asset capitalization policy in Note 1 should state the capitalization threshold:</p>
          <blockquote className="border-l-4 border-slate-400 pl-3 italic text-xs text-slate-707 dark:text-gray-305 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-r-lg">
            <strong>Property, Plant &amp; Equipment Capitalization Policy:</strong><br />
            "Fixed assets are stated at cost less accumulated depreciation. Low-value assets costing ₹5,000 or less per individual item are expensed in the year of purchase under the materiality principle."
          </blockquote>
        </div>
      ),
      auditorView: (
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Verify that the capitalization threshold is applied consistently from year to year.</li>
          <li>Ensure that management is not grouping individually small assets (e.g., buying ₹50 Lakhs of network cabling) to expense them when they should be capitalized as a single system.</li>
        </ul>
      ),
      importance: (
        <p>A clear capitalization threshold simplifies the fixed asset register, reducing audit time and accounting costs.</p>
      ),
      trap: (
        <p><strong>Red Flag:</strong> A company suffering losses lowering its capitalization threshold mid-year (e.g., from ₹10,000 to ₹500) to capitalize regular repair expenses and inflate reported earnings.</p>
      ),
      ref: "ICAI AS 1 PDF Page 5, Para 17(c); AS 10 Para 9.",
      refPage: 5
    },
    {
      title: "Case 8: Disclosure Cures No Wrong (Head Office Salaries Wrong Capitalization)",
      difficulty: "ADVANCED",
      paraRef: "Para 23",
      facts: (
        <p>Realcon Developers Ltd is a construction company. During the year, it capitalized ₹40 Lakhs of corporate head office administrative salaries (including the HR and accounting departments) under "Work-in-Progress (Inventory)" to avoid showing a loss in its P&L. In Note 1 to the financial statements, the company disclosed: <em>"The company capitalizes corporate head office administrative salaries as part of project work-in-progress inventory."</em> Management argued that since they disclosed this policy clearly in Note 1, the accounting treatment is transparent and acceptable.</p>
      ),
      issue: (
        <p>Can the note disclosure in Note 1 make the wrong capitalization of administrative salaries acceptable under AS 1?</p>
      ),
      principle: (
        <p><strong>Disclosure of accounting policies or of changes therein cannot remedy a wrong or inappropriate treatment of an item in the accounts</strong> <PdfRef page={5} />.</p>
      ),
      analysis: (
        <div className="space-y-2">
          <p>Under AS 2 and AS 7, only costs directly related to bringing the inventory/project to its present location and condition can be capitalized. Corporate head office salaries (HR, Finance) are general administrative costs and must be expensed in the period they occur. Capitalising them under inventory WIP violates GAAP.</p>
          <p>Management's argument that "the disclosure cures the treatment" is incorrect. Note disclosures are meant to explain valid accounting choices, not to justify deviations from accounting standards.</p>
        </div>
      ),
      treatment: (
        <div className="space-y-2">
          <p>Reverse the capitalized salaries from Work-in-Progress inventory and expense them in the P&L under "Employee Benefit Expenses":</p>
          <pre className="bg-slate-950 dark:bg-black p-3.5 rounded-lg font-mono text-[11px] text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed">
{`Debit  Employee Benefit Expenses A/c            ₹4,000,000
Credit Project Work-in-Progress (WIP) A/c                  ₹4,000,000
(Being corporate salaries wrongly capitalized in WIP reversed to P&L)`}
          </pre>
        </div>
      ),
      disclosure: (
        <div className="space-y-2">
          <p>Disclose the salaries correctly as an expense in the Employee Benefit note:</p>
          <pre className="bg-slate-950 dark:bg-black p-3.5 rounded-lg font-mono text-[11px] text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed">
{`Employee Benefit Expenses:
- Salaries and Wages: ₹X,XXX (Includes ₹40 Lakhs corporate salaries)`}
          </pre>
        </div>
      ),
      auditorView: (
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Verify the nature of the salaries capitalized in project WIP.</li>
          <li>Request management to correct the error by expensing the ₹40 Lakhs.</li>
          <li>If management refuses, the auditor must <strong>Qualify</strong> the audit report or issue an <strong>Adverse Opinion</strong>, stating that profits and inventories are overstated by ₹40 Lakhs. The note disclosure does not change this requirement.</li>
        </ul>
      ),
      importance: (
        <p>This rule protects the integrity of financial statements. It prevents companies from using creative disclosures to cover up standard breaches or fraud.</p>
      ),
      trap: (
        <p><strong>Red Flag:</strong> Finding notes that say: <em>"Due to technical reasons, the company did not charge depreciation on certain plant assets this year."</em> This is a clear breach of AS 10, and the note does not make it acceptable.</p>
      ),
      ref: "ICAI AS 1 PDF Page 5, Para 23; Page 11, Para 11; AS 2 Para 13; Companies Act, 2013, Section 129(5).",
      refPage: 5
    },
    {
      title: "Case 9: Non-Disclosure of Revenue Recognition Policy in SaaS Business",
      difficulty: "INTERMEDIATE",
      paraRef: "Para 24",
      facts: (
        <p>CloudFlow India Pvt Ltd is a startup providing annual cloud-based software subscriptions. The company receives 100% of the subscription fees upfront but recognizes the entire cash receipt as revenue on Day 1. In Note 1 to their financial statements, the company lists standard accounting policies (depreciation, taxes) but does not provide any description of their revenue recognition policy. Management argued that since they are a private company, they do not need to disclose detailed revenue recognition rules.</p>
      ),
      issue: (
        <p>Does the omission of the revenue recognition policy violate AS 1, and what is its impact on the presentation of financial statements?</p>
      ),
      principle: (
        <div className="space-y-2">
          <p>All significant accounting policies adopted in the preparation and presentation of financial statements should be disclosed <PdfRef page={5} />.</p>
          <p>Revenue recognition is a critical accounting policy and must be disclosed to ensure financial statements are understandable and comparable <PdfRef page={4} />.</p>
        </div>
      ),
      analysis: (
        <div className="space-y-2">
          <p>Revenue recognition is the most significant accounting policy for a subscription-based software company. Recognising annual subscription fees upfront on Day 1 violates the accrual assumption because the company has a continuing obligation to provide the software service over the 12-month period.</p>
          <p>By omitting the revenue recognition policy from Note 1, the company hides this aggressive practice. This omission prevents users of the financial statements from evaluating the quality and sustainability of the reported revenues, violating AS 1.</p>
        </div>
      ),
      treatment: (
        <p>Recognize subscription revenue pro-rata over the 12-month contract period. Defer the unearned portion as "Unearned/Deferred Revenue" under Current Liabilities. Disclose the policy clearly in Note 1.</p>
      ),
      disclosure: (
        <div className="space-y-2">
          <p>Insert the following policy in Note 1:</p>
          <blockquote className="border-l-4 border-blue-500 pl-3 italic text-xs text-slate-707 dark:text-gray-305 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-r-lg">
            <strong>Revenue Recognition Policy:</strong><br />
            "Revenue from cloud-based software subscriptions is recognized on a straight-line basis over the period of the subscription contract. Subscription fees received in advance are deferred and carried on the Balance Sheet as 'Unearned Revenue' under current liabilities."
          </blockquote>
        </div>
      ),
      auditorView: (
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Verify the subscription start dates and ensure revenue is deferred correctly.</li>
          <li>Request management to add the revenue recognition policy note. If they refuse to disclose the policy or continue recognizing revenue on a cash basis, qualify the audit report.</li>
        </ul>
      ),
      importance: (
        <p>Valuations of SaaS companies are based on Recurring Revenue metrics. Hiding the revenue recognition policy can lead to inflated valuations and potential legal disputes with investors.</p>
      ),
      trap: (
        <p><strong>Red Flag:</strong> A company disclosing only a generic policy like: <em>"Revenue is recognized when services are rendered."</em> For complex models (SaaS, long-term contracts), the specific timing and methods of revenue recognition must be disclosed.</p>
      ),
      ref: "ICAI AS 1 PDF Page 4, Para 14; Page 5, Para 18, 24; AS 9 Para 11-12.",
      refPage: 5
    },
    {
      title: "Case 10: Change in Accounting Policy Solely for Tax / Profit Window Dressing",
      difficulty: "ADVANCED",
      paraRef: "Para 22",
      facts: (
        <p>BuildWell Ltd is a construction company bidding for a national highway contract. The pre-qualification criteria require the bidder to show a net profit margin of at least 8% in the preceding fiscal year. The company's projected net profit margin is 6% using the Percentage of Completion Method (POCM) as per AS 7. To meet the 8% margin requirement, the board decided to change its accounting policy for revenue recognition to the Project Completion Method for all projects that are more than 90% complete, recognizing the entire project profit in the current year. Management justified the change in the board minutes as "a measures to improve project presentation for bank bidding."</p>
      ),
      issue: (
        <p>Is this change in accounting policy valid under AS 1?</p>
      ),
      principle: (
        <p>A change in accounting policy is permitted under AS 1 only if: (a) required by statute, (b) required for compliance with an accounting standard, or (c) results in a more appropriate presentation of financial statements <PdfRef page={5} />.</p>
      ),
      analysis: (
        <div className="space-y-2">
          <p>The change is not required by any new law or standard. Furthermore, shifting from the Percentage of Completion Method (POCM) to the Project Completion Method solely for near-complete projects does not result in a "more appropriate presentation."</p>
          <p>Instead, it violates the consistency principle and is designed to accelerate revenue to meet a tender requirement (window dressing).</p>
          <p>Because the change lacks technical justification, it violates AS 1.</p>
        </div>
      ),
      treatment: (
        <p>The company must continue to apply the Percentage of Completion Method (POCM) consistently to all construction projects in accordance with AS 7. The proposed policy change must be rejected.</p>
      ),
      disclosure: (
        <div className="space-y-2">
          <p>Since the proposed change is invalid, no change should be made. If a valid, justified policy change had occurred, the company would be required to disclose:</p>
          <blockquote className="border-l-4 border-orange-500 pl-3 italic text-xs text-slate-707 dark:text-gray-305 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-r-lg">
            <strong>Accounting Policy Change Disclosure (Illustrative for a valid change):</strong><br />
            "During the year, the Company changed its revenue recognition method for construction contracts to [New Method] to [Justification]. Had the Company continued to use the previous method, the profit before tax for the year would have been [higher/lower] by ₹X Lakhs."
          </blockquote>
        </div>
      ),
      auditorView: (
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Review the board minutes to identify the reasons for the proposed change.</li>
          <li>Examine the impact of the policy change on project profitability.</li>
          <li>If management implements the change without proper justification, the auditor must issue a <strong>Qualified or Adverse Audit Report</strong> for deviation from AS 1 and AS 7.</li>
        </ul>
      ),
      importance: (
        <p>Consistency in accounting policies prevents companies from changing methods arbitrarily to window-dress their financial performance or evade taxes.</p>
      ),
      trap: (
        <p><strong>Red Flag:</strong> A construction company changing its revenue recognition policies back and forth between POCM and completed contract methods, aligning with major tender deadlines.</p>
      ),
      ref: "ICAI AS 1 PDF Page 5, Para 22; AS 7 Para 29-32; Companies Act, 2013, Section 129(1).",
      refPage: 5
    }
  ]

  const activeCase = cases[selectedCaseIdx]

  return (
    <div className="w-full space-y-6 font-sans">
      <div className="bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-2xl p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Master Sidebar Pane */}
          <div className="w-full lg:w-1/3 space-y-2 border-r-0 lg:border-r border-[#E2E1DD] dark:border-gray-800 pr-0 lg:pr-6">
            <h4 className="text-xs font-bold text-slate-450 dark:text-gray-400 uppercase tracking-widest mb-3.5 pl-2.5">
              Select Case Study
            </h4>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:block space-y-1.5 max-h-[620px] overflow-y-auto pr-1">
              {cases.map((c, idx) => {
                const isSelected = selectedCaseIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedCaseIdx(idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col gap-1.5 ${
                      isSelected
                        ? "bg-[#EEF2FD] border-[#2D5BE3] dark:bg-[#1A2542] dark:border-blue-500 text-slate-900 dark:text-white"
                        : "bg-white hover:bg-slate-50 dark:bg-transparent border-[#E2E1DD] dark:border-gray-800 text-slate-705 dark:text-gray-400"
                    }`}
                  >
                    <span className="text-[12.5px] font-extrabold leading-snug">
                      {c.title}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        c.difficulty === "BEGINNER"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-450 border border-emerald-250/40"
                          : c.difficulty === "INTERMEDIATE"
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-450 border border-blue-250/40"
                          : "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-450 border border-rose-250/40"
                      }`}>
                        {c.difficulty}
                      </span>
                      <span className="text-[10px] text-slate-450 dark:text-gray-500 font-bold">
                        {c.paraRef}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Mobile / Tablet Dropdown Selector */}
            <div className="block lg:hidden w-full">
              <select
                value={selectedCaseIdx}
                onChange={(e) => setSelectedCaseIdx(Number(e.target.value))}
                className="w-full bg-[#FAFAF8] dark:bg-[#1E2640] border border-[#E2E1DD] dark:border-gray-800 rounded-lg p-3 text-xs font-bold text-slate-800 dark:text-white outline-none"
              >
                {cases.map((c, idx) => (
                  <option key={idx} value={idx}>
                    {c.title} ({c.difficulty})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Details Pane */}
          <div className="flex-1 space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E1DD]/60 dark:border-gray-800/60 pb-4">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
                  {activeCase.title}
                </h3>
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 dark:text-gray-455">
                  <span>Difficulty:</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                    activeCase.difficulty === "BEGINNER"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-450"
                      : activeCase.difficulty === "INTERMEDIATE"
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-450"
                      : "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-450"
                  }`}>
                    {activeCase.difficulty}
                  </span>
                  <span className="mx-1">•</span>
                  <span>Section:</span>
                  <span className="bg-slate-100 dark:bg-slate-850 px-2 py-0.5 rounded text-slate-700 dark:text-gray-300">
                    {activeCase.paraRef}
                  </span>
                </div>
              </div>
            </div>

            {/* Structured Breakdown: 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left Column: Context */}
              <div className="space-y-4">
                {/* 2. Facts */}
                <div className="bg-[#FAFAF8] dark:bg-[#171C2B] p-4 sm:p-5 rounded-xl border border-[#E2E1DD] dark:border-gray-800">
                  <h5 className="text-[11px] font-bold text-slate-450 dark:text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <span>📋</span> 2. Facts
                  </h5>
                  <div className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                    {activeCase.facts}
                  </div>
                </div>

                {/* 3. Issue */}
                <div className="bg-[#FFFDF5] dark:bg-[#25201A] p-4 sm:p-5 rounded-xl border border-[#F6EED5] dark:border-amber-900/30">
                  <h5 className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <span>🔍</span> 3. The Issue
                  </h5>
                  <div className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                    {activeCase.issue}
                  </div>
                </div>

                {/* 4. Relevant AS 1 Principle */}
                <div className="bg-[#F5F8FF] dark:bg-[#1A2035] p-4 sm:p-5 rounded-xl border border-[#DCE4FF] dark:border-blue-900/30">
                  <h5 className="text-[11px] font-bold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <span>⚖️</span> 4. Relevant AS 1 Principle
                  </h5>
                  <div className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                    {activeCase.principle}
                  </div>
                </div>
              </div>

              {/* Right Column: Implementation */}
              <div className="space-y-4">
                {/* 5. Analysis */}
                <div className="bg-[#F5F5FF] dark:bg-[#1F1A35] p-4 sm:p-5 rounded-xl border border-[#E1E1FF] dark:border-indigo-900/30">
                  <h5 className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <span>⚙️</span> 5. Analysis &amp; Legal Application
                  </h5>
                  <div className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                    {activeCase.analysis}
                  </div>
                </div>

                {/* 6. Correct Accounting Treatment */}
                <div className="bg-[#F6FCF8] dark:bg-[#17271F] p-4 sm:p-5 rounded-xl border border-[#D2ECD9] dark:border-green-900/30">
                  <h5 className="text-[11px] font-bold text-emerald-600 dark:text-emerald-450 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <span>✏️</span> 6. Correct Accounting Treatment
                  </h5>
                  <div className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                    {activeCase.treatment}
                  </div>
                </div>

                {/* 7. Disclosure Requirement */}
                <div className="bg-[#FCF5FF] dark:bg-[#251A35] p-4 sm:p-5 rounded-xl border border-[#F2DCFF] dark:border-purple-900/30">
                  <h5 className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <span>📝</span> 7. Disclosure Requirement
                  </h5>
                  <div className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                    {activeCase.disclosure}
                  </div>
                </div>
              </div>
            </div>

            {/* Full Width Panels */}
            <div className="space-y-4 pt-1">
              {/* 8. Auditor's View */}
              <div className="bg-[#FFF5F5] dark:bg-[#2A1E1E] p-5 rounded-xl border border-[#FFE1E1] dark:border-red-950/60">
                <h5 className="text-[11px] font-bold text-red-650 dark:text-red-400 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                  <span>🚨</span> 8. Auditor&apos;s View &amp; Reporting Impact
                </h5>
                <div className="text-xs text-slate-700 dark:text-gray-350 leading-relaxed font-semibold">
                  {activeCase.auditorView}
                </div>
              </div>

              {/* 9. Real-life Importance */}
              <div className="bg-slate-50 dark:bg-[#1E2640]/40 p-5 rounded-xl border border-slate-200 dark:border-gray-800">
                <h5 className="text-[11px] font-bold text-slate-650 dark:text-gray-300 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                  <span>💡</span> 9. Commercial Real-Life Importance
                </h5>
                <div className="text-xs text-slate-700 dark:text-gray-355 leading-relaxed font-semibold">
                  {activeCase.importance}
                </div>
              </div>

              {/* 10. Common Trap / Red Flag */}
              <div className="bg-[#FFF9F5] dark:bg-[#2B2117] p-5 rounded-xl border-l-4 border-orange-500 border-t border-b border-r border-[#FFE9DC] dark:border-orange-950/40">
                <h5 className="text-[11px] font-bold text-orange-650 dark:text-orange-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <span>⚠️</span> 10. Common Trap / Red Flag
                </h5>
                <div className="text-xs text-orange-900 dark:text-orange-355 leading-relaxed font-bold">
                  {activeCase.trap}
                </div>
              </div>

              {/* 11. Reference Footnote */}
              <div className="pt-2 text-[10.5px] text-slate-450 dark:text-gray-500 font-bold flex flex-wrap items-center gap-1.5">
                <span>🔗</span>
                <span>11. Reference Sources:</span>
                <span className="text-slate-600 dark:text-gray-300">
                  {activeCase.ref}
                </span>
                {activeCase.refPage && (
                  <span className="flex items-center gap-0.5 shrink-0 ml-1">
                    [PDF page: <PdfRef page={activeCase.refPage} />]
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
