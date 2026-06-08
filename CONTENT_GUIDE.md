# Accounts.Life — Content Authoring Guide

This document describes the curriculum structure, database schemas, and editor formatting required for writing educational content on the **Accounts.Life** platform.

---

## 1. Domain Taxonomy (D01–D12)
Content on the platform resides under twelve distinct accounting domains:
* **D01 (Accounting Fundamentals):** The double-entry system, journals, ledger posting, and accrual assumptions.
* **D02 (AS Standards):** General Indian GAAP Standards (AS 1 through AS 32).
* **D03 (Ind AS Standards):** Indian Accounting Standards (Ind AS) aligned with IFRS.
* **D04 (Company Accounts):** Share capital issue, debentures, Schedule III format, and cash flow analysis.
* **D05 (Partnership Accounts):** Admission, retirement, death, and dissolution adjustments.
* **D06–D12:** Specialized topics (BRS, Bills of Exchange, Inventory Valuation, Depreciation, Provisions, Financial Analysis, and Miscellaneous).

---

## 2. Dynamic Entry Types

### A. General Concept Page (`CONCEPT`)
Concept pages explain terms, principles, and procedures.
* **Structure:**
  * **Sections:** An array of heading and body blocks (supporting paragraph headers and standard font sizes).
  * **Key Points:** Bulleted summaries highlighting key terms.
  * **Formula Block:** Code block displaying relevant equations and mathematical variables.
  * **Notes:** Callouts of varying type tags (`IMPORTANT`, `NOTE`, `TIP`, `CAUTION`) with brief text.
  * **FAQs:** Interactive QA items related directly to the topic.

### B. Standard Template Page (`STANDARD`)
Standard pages cover official compliance policies.
* **Structure:**
  * **Metadata:** Effective dates, frameworks (AS vs Ind AS), and status codes.
  * **Objective:** Direct standard clauses coupled with plain-English commentary.
  * **Scope:** Bulleted lists defining exactly what is included, excluded, or subject to exemptions.
  * **Definitions:** Key dictionary terms cited to specific paragraphs in the study guides.
  * **Disclosures:** Checklist of information required in the notes to accounts.
  * **Comparisons:** Side-by-side matrices contrasting AS standards against their Ind AS counterparts.

### C. Ledger Entry Scenario (`JOURNAL_ENTRY`)
Journal entry pages demonstrate double-entry accounting.
* **Structure:**
  * **Scenario:** Practical business scenario detailing the event.
  * **Narration:** Explanatory note appended below the transaction.
  * **Rows:** Array of account lines tagged as Debit (`DR`) or Credit (`CR`) with numerical amounts.

### D. Practical Illustration (`ILLUSTRATION`)
Illustrations show complex calculations and problem solving.
* **Structure:**
  * **Scenario:** The problem statement.
  * **Working:** Detailed mathematical calculations and ledger postings.
  * **Answer:** Final calculated results.
  * **Financial Statement Impact:** Grids detailing the impact on the Balance Sheet or Profit & Loss Statement.
