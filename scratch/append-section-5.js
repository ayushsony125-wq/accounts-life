const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../app/standards/learning/AS1ExamplesData.tsx');

const content = `
export const judicialCases: CaseStudy[] = [
  {
    id: "5-1",
    title: "Case 5.1: CIT vs. Woodward Governor India Pvt. Ltd. (SC [2009] 312 ITR 254)",
    category: "Landmark Judicial Case",
    panels: [
      {
        title: "Legal Dispute & Facts of the Case",
        content: (
          <div className="space-y-2">
            <p><strong>The dispute:</strong> The taxpayer incurred foreign exchange losses on long-term capital loans due to currency fluctuations. The company recognized these losses on the balance sheet date, even though they were unrealized, as per AS 11 and consistent accrual accounting.</p>
            <p><strong>Tax Department Position:</strong> The Income Tax department denied the deduction, claiming that unrealized foreign exchange losses are national/notional losses and cannot be claimed until realized.</p>
            <p><strong>Business Background:</strong> The company imports heavy machinery under dollar-denominated loans. At year end, the rupee depreciated significantly, inflating the rupee-equivalent loan liability.</p>
          </div>
        )
      },
      {
        title: "The Core Accrual/Consistency Question",
        content: (
          <div className="space-y-2">
            <p><strong>Question:</strong> Can unrealized exchange losses calculated at the year-end exchange rate be claimed as business expenditure under the accrual concept?</p>
            <p><strong>Relevance to AS 1:</strong> The case establishes the alignment between taxable profits and a True and Fair View under consistent accrual principles. Consistency in updating rate shifts is mandatory.</p>
          </div>
        )
      },
      {
        title: "Supreme Court Verdict & Rationale",
        content: (
          <div className="space-y-2">
            <p><strong>Verdict:</strong> The Supreme Court ruled in favor of the taxpayer, holding that 'profits' must reflect a True and Fair View. In line with AS 11 and consistent accrual principles, year-end exchange rate fluctuations must be recognized immediately in the P&L.</p>
            <p><strong>Rationale:</strong> Profits must be computed based on standard commercial accounting principles. Stating rate updates at year end satisfies the accrual concept, and tax laws cannot deny commercial accounting realities unless explicitly prohibited.</p>
          </div>
        )
      },
      {
        title: "Impact on Financial Statements & Tax Assessment",
        content: (
          <div className="space-y-2">
            <p><strong>Impact:</strong> Taxpayers are allowed tax deductions for year-end exchange rate adjustments, and the judgment establishes that accounting standards issued by the ICAI are mandatory for determining business profits.</p>
          </div>
        )
      }
    ],
    examFocus: "AS 11 and AS 1: Unrealized year-end exchange differences are not notional. They must be accrued under accrual and consistency concepts.",
    examFocusType: "concept"
  },
  {
    id: "5-2",
    title: "Case 5.2: CIT vs. British Paints India Ltd. (SC [1991] 188 ITR 44)",
    category: "Landmark Judicial Case",
    panels: [
      {
        title: "Legal Dispute & Facts of the Case",
        content: (
          <div className="space-y-2">
            <p><strong>The dispute:</strong> The taxpayer valued its WIP and finished stock by excluding overhead costs, showing only the cost of raw materials. The company argued that since it had followed this method consistently for decades, the Revenue could not challenge it.</p>
            <p><strong>Tax Department Position:</strong> The Income Tax department recalculated stock values by including overheads, arguing that the company's method understated profits.</p>
          </div>
        )
      },
      {
        title: "The Core Accrual/Consistency Question",
        content: (
          <div className="space-y-2">
            <p><strong>Question:</strong> Does consistency in accounting policies justify a valuation policy that understates stock values and profits?</p>
            <p><strong>Relevance to AS 1:</strong> The case checks whether consistency overrides the True and Fair View requirement when the underlying policy is incorrect.</p>
          </div>
        )
      },
      {
        title: "Supreme Court Verdict & Rationale",
        content: (
          <div className="space-y-2">
            <p><strong>Verdict:</strong> The Supreme Court held that consistency cannot justify an incorrect valuation policy. Inventory must include overhead costs to represent the correct value and true and fair view of profits.</p>
            <p><strong>Rationale:</strong> The primary consideration is a True and Fair View (AS 1 Para 16), which overrides consistency if the existing policy is incorrect.</p>
          </div>
        )
      },
      {
        title: "Impact on Financial Statements & Tax Assessment",
        content: (
          <div className="space-y-2">
            <p><strong>Impact:</strong> Valuation methods must comply with AS 2 overhead capitalization requirements. Consistency cannot validate non-compliant accounting treatments.</p>
          </div>
        )
      }
    ],
    examFocus: "True and Fair View Overrules Consistency: Consistency cannot justify incorrect accounting policies. Stating true and fair view is the primary consideration.",
    examFocusType: "focus"
  },
  {
    id: "5-3",
    title: "Case 5.3: Challapalli Sugars Ltd. vs. CIT (SC [1975] 98 ITR 167)",
    category: "Landmark Judicial Case",
    panels: [
      {
        title: "Legal Dispute & Facts of the Case",
        content: (
          <div className="space-y-2">
            <p><strong>The dispute:</strong> The company capitalized interest on loans taken for purchasing machinery, where the interest was accrued during the pre-production/construction phase of the plant.</p>
            <p><strong>Tax Department Position:</strong> The Income Tax department claimed that interest is a revenue expense and should not be capitalized to fixed assets.</p>
          </div>
        )
      },
      {
        title: "The Core Accrual/Consistency Question",
        content: (
          <div className="space-y-2">
            <p><strong>Question:</strong> Can borrowing costs accrued before an asset is put to use be capitalized into the cost of the asset?</p>
            <p><strong>Relevance to AS 1:</strong> Establishes the accounting principle for calculating the 'cost' of fixed assets (capitalization rules under AS 10 and AS 16).</p>
          </div>
        )
      },
      {
        title: "Supreme Court Verdict & Rationale",
        content: (
          <div className="space-y-2">
            <p><strong>Verdict:</strong> The Supreme Court ruled in favor of the taxpayer, holding that interest on borrowing for the acquisition of assets before production starts is part of the cost of the asset.</p>
            <p><strong>Rationale:</strong> The cost of an asset includes all expenditure necessary to bring the asset to its working condition. Pre-operative interest is capital in nature.</p>
          </div>
        )
      },
      {
        title: "Impact on Financial Statements & Tax Assessment",
        content: (
          <div className="space-y-2">
            <p><strong>Impact:</strong> Establishes the capitalization base for calculating depreciation and tax allowance, aligning tax laws with commercial capitalization standards.</p>
          </div>
        )
      }
    ],
    examFocus: "Asset Capitalization: Pre-operative interest is capitalized into asset cost under AS 10 and AS 16. Interest post production start must be expensed.",
    examFocusType: "concept"
  },
  {
    id: "5-4",
    title: "Case 5.4: CIT vs. H.G.E.C. Ltd. (HC [1983] 143 ITR 614)",
    category: "Landmark Judicial Case",
    panels: [
      {
        title: "Legal Dispute & Facts of the Case",
        content: (
          <div className="space-y-2">
            <p><strong>The dispute:</strong> The company valued its closing stock at cost on some occasions, and at market price on other occasions to manage taxable profits, violating the consistency principle.</p>
            <p><strong>Tax Department Position:</strong> The Income Tax department insisted on a consistent method of valuation (lower of cost and market value).</p>
          </div>
        )
      },
      {
        title: "The Core Accrual/Consistency Question",
        content: (
          <div className="space-y-2">
            <p><strong>Question:</strong> Can an enterprise change its inventory valuation method frequently without valid reasons and disclosures?</p>
            <p><strong>Relevance to AS 1:</strong> Checks compliance with the consistency assumption and significant policy changes.</p>
          </div>
        )
      },
      {
        title: "Supreme Court Verdict & Rationale",
        content: (
          <div className="space-y-2">
            <p><strong>Verdict:</strong> The High Court held that valuation methods cannot be changed without valid justification (such as statutory requirements or more appropriate presentation) and must be applied consistently.</p>
            <p><strong>Rationale:</strong> Frequent changes without justification violate the consistency principle, distorting the comparison of financial statements across periods.</p>
          </div>
        )
      },
      {
        title: "Impact on Financial Statements & Tax Assessment",
        content: (
          <div className="space-y-2">
            <p><strong>Impact:</strong> Taxpayers are restricted from changing valuation methods arbitrarily to manage tax liabilities. Changes require full disclosure and quantification.</p>
          </div>
        )
      }
    ],
    examFocus: "Consistency Principle: frequent changes in policies without valid reasons violate AS 1. Disclose policy changes and quantify their impact in exams.",
    examFocusType: "trap"
  },
  {
    id: "5-5",
    title: "Case 5.5: Kedarnath Jute Mfg. Co. Ltd. vs. CIT (SC [1971] 82 ITR 363)",
    category: "Landmark Judicial Case",
    panels: [
      {
        title: "Legal Dispute & Facts of the Case",
        content: (
          <div className="space-y-2">
            <p><strong>The dispute:</strong> The taxpayer did not record a sales tax liability in its books during the year the liability was incurred because the company was disputing the tax in court.</p>
            <p><strong>Tax Department Position:</strong> The Income Tax department denied the deduction because the liability was not accrued in the books.</p>
          </div>
        )
      },
      {
        title: "The Core Accrual/Consistency Question",
        content: (
          <div className="space-y-2">
            <p><strong>Question:</strong> Does the accrual of a statutory liability depend on its entry in the books or its legal dispute status?</p>
            <p><strong>Relevance to AS 1:</strong> Establishes the relationship between the accrual assumption and legal liabilities.</p>
          </div>
        )
      },
      {
        title: "Supreme Court Verdict & Rationale",
        content: (
          <div className="space-y-2">
            <p><strong>Verdict:</strong> The Supreme Court held that the accrual of a liability is governed by the occurrence of the transaction (obligating event) and not by whether an entry has been made in the books.</p>
            <p><strong>Rationale:</strong> Statutory liabilities accrue as soon as the transaction occurs. Disputing the tax does not prevent it from accruing under the accrual concept.</p>
          </div>
        )
      },
      {
        title: "Impact on Financial Statements & Tax Assessment",
        content: (
          <div className="space-y-2">
            <p><strong>Impact:</strong> Liabilities must be accrued in the books even if disputed, satisfying the accrual and prudence concepts. Tax deductions depend on accrual status.</p>
          </div>
        )
      }
    ],
    examFocus: "Accrual Assumption: statutory liabilities accrue when the obligating transaction occurs, irrespective of disputes or entries in the books. Quote Kedarnath Jute in accrual case studies.",
    examFocusType: "concept"
  }
];
`;

fs.appendFileSync(targetPath, content, 'utf8');
console.log('Appended Section 5 (Judicial Cases) successfully.');
