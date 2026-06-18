export interface ScheduleIIITopic {
  title: string
  sourceLink?: string
  sourceLabel?: string
  content: {
    meaning: string
    scope: string
    classificationRules?: { title: string; body: string }[]
    formats?: { title: string; headers: string[]; rows: string[][] }[]
    takeaways?: { title: string; body: string }[]
    examTraps?: { title: string; body: string }[]
    caseLaws?: { title: string; citation: string; body: string }[]
    examples?: { title: string; scenario: string; solution: string }[]
  }
}

export interface DivisionContent {
  balanceSheet: ScheduleIIITopic
  profitAndLoss: ScheduleIIITopic
  cashFlow: ScheduleIIITopic
  others: ScheduleIIITopic
}

export const SCHEDULE_III_DATA: Record<'div1' | 'div2' | 'div3', DivisionContent> = {
  div1: {
    balanceSheet: {
      title: 'Division I — Balance Sheet Presentation (AS Companies)',
      sourceLink: 'https://www.mca.gov.in/Ministry/pdf/CompaniesAct2013.pdf#page=182',
      sourceLabel: 'Companies Act 2013, Schedule III Part I',
      content: {
        meaning: 'Division I of Schedule III prescribes the format of the Balance Sheet for companies whose financial statements are prepared in accordance with the Accounting Standards (AS) Rules, 2021.',
        scope: 'Applies to all Indian companies preparing financial statements under AS, except for NBFCs and companies where a specific statutory format is prescribed (such as Banking or Insurance companies).',
        classificationRules: [
          {
            title: 'Current vs. Non-Current Assets',
            body: 'An asset is classified as current if: (a) it is expected to be realized or consumed in the normal operating cycle; (b) it is held primarily for trading; (c) it is expected to be realized within 12 months after the reporting date; or (d) it is cash or cash equivalent unless restricted from exchange for at least 12 months. All other assets are non-current.'
          },
          {
            title: 'Current vs. Non-Current Liabilities',
            body: 'A liability is classified as current if: (a) it is expected to be settled in the normal operating cycle; (b) it is held primarily for trading; (c) it is due to be settled within 12 months after the reporting date; or (d) the company does not have an unconditional right to defer settlement for at least 12 months. All other liabilities are non-current.'
          },
          {
            title: 'Share Capital Disclosure',
            body: 'For each class of share capital, disclosure must include: number of shares authorized, issued, subscribed and fully paid; reconciliation of shares outstanding; rights, preferences and restrictions; details of shares held by holding/subsidiary companies; shares held by promoters; and shareholders holding more than 5% shares.'
          },
          {
            title: 'Reserves & Surplus Classification',
            body: 'Must be classified as: Capital Reserve, Capital Redemption Reserve, Securities Premium, Debenture Redemption Reserve, Revaluation Reserve, Share Options Outstanding Account, Other Reserves, and Surplus (balance in P&L after appropriations).'
          }
        ],
        formats: [
          {
            title: 'Balance Sheet Format (Equity and Liabilities)',
            headers: ['Ref Page', 'Particulars', 'Note No.', 'Figures as at Current Year', 'Figures as at Previous Year'],
            rows: [
              ['p.182', 'I. EQUITY AND LIABILITIES', '', '', ''],
              ['p.182', '(1) Shareholders’ funds', '', '', ''],
              ['p.183', '  (a) Share capital', '1', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.184', '  (b) Reserves and surplus', '2', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.185', '  (c) Money received against share warrants', '3', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.186', '(2) Share application money pending allotment', '4', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.187', '(3) Non-current liabilities', '', '', ''],
              ['p.187', '  (a) Long-term borrowings', '5', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.188', '  (b) Deferred tax liabilities (Net)', '6', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.189', '  (c) Other Long term liabilities', '7', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.190', '  (d) Long-term provisions', '8', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.191', '(4) Current liabilities', '', '', ''],
              ['p.191', '  (a) Short-term borrowings', '9', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.192', '  (b) Trade payables (MSME aging & others)', '10', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.193', '  (c) Other current liabilities', '11', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.194', '  (d) Short-term provisions', '12', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.182', 'TOTAL EQUITY AND LIABILITIES', '', '₹ X,XX,XXX', '₹ X,XX,XXX']
            ]
          },
          {
            title: 'Balance Sheet Format (Assets)',
            headers: ['Ref Page', 'Particulars', 'Note No.', 'Figures as at Current Year', 'Figures as at Previous Year'],
            rows: [
              ['p.182', 'II. ASSETS', '', '', ''],
              ['p.183', '(1) Non-current assets', '', '', ''],
              ['p.183', '  (a) Property, Plant and Equipment and Intangible Assets', '', '', ''],
              ['p.183', '    (i) Property, Plant and Equipment', '13', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.183', '    (ii) Intangible assets', '14', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.183', '    (iii) Capital work-in-progress (CWIP aging)', '15', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.183', '    (iv) Intangible assets under development', '16', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.184', '  (b) Non-current investments', '17', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.185', '  (c) Deferred tax assets (Net)', '18', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.186', '  (d) Long-term loans and advances', '19', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.187', '  (e) Other non-current assets', '20', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.188', '(2) Current assets', '', '', ''],
              ['p.188', '  (a) Current investments', '21', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.188', '  (b) Inventories', '22', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.189', '  (c) Trade receivables (Aging schedule)', '23', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.190', '  (d) Cash and cash equivalents', '24', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.191', '  (e) Short-term loans and advances', '25', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.192', '  (f) Other current assets', '26', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.182', 'TOTAL ASSETS', '', '₹ X,XX,XXX', '₹ X,XX,XXX']
            ]
          }
        ],
        takeaways: [
          {
            title: 'MSME Disclosure Requirement',
            body: 'Companies must separately disclose the aging schedule for Trade Payables due to MSMEs (Micro, Small and Medium Enterprises) vs Others. Outstanding dues must be aged into: < 1 year, 1-2 years, 2-3 years, and > 3 years.'
          },
          {
            title: 'Trade Receivables aging requirement',
            body: 'Similar to Trade Payables, Trade Receivables must be aged into: Undisputed - Considered Good; Undisputed - Considered Doubtful; Disputed - Considered Good; Disputed - Considered Doubtful. The aging buckets are: < 6 months, 6 months-1 year, 1-2 years, 2-3 years, and > 3 years.'
          }
        ],
        examTraps: [
          {
            title: 'Current Maturities of Long-Term Debt',
            body: 'CA students often err by leaving current maturities of long-term borrowings under long-term debt. Under Schedule III, current maturities of long-term debt must be classified as Current Liabilities under "Other Current Liabilities" rather than Non-Current Liabilities.'
          },
          {
            title: 'Operating Cycle exceeding 12 months',
            body: 'If the normal operating cycle of a company is 18 months, assets and liabilities expected to be realized or settled within 18 months are classified as Current. Do not stick to the default 12-month rule when the operating cycle is clearly defined otherwise.'
          }
        ],
        caseLaws: [
          {
            title: 'Substance Over Form in Security Deposits',
            citation: 'ICAI Technical Guide on Schedule III (Page 45)',
            body: 'Security deposits paid for leased premises are technically loans & advances, but their economic substance is a non-financial resource if the lease is long-term. Under AS, they must be classified under Long-Term Loans & Advances, but must be disclosed separately.'
          }
        ],
        examples: [
          {
            title: 'Current/Non-Current Classification',
            scenario: 'Alpha Ltd. has an operating cycle of 10 months. It has trade receivables of ₹ 5,00,000 expected to be realized in 11 months. How should it be classified?',
            solution: 'Since Alpha Ltd.’s operating cycle is 10 months, but the receivables are expected to be realized in 11 months, we look at the 12-month rule. As 11 months is within 12 months, the trade receivables are classified as CURRENT. If the operating cycle was 10 months and realization was 15 months, it would be classified as NON-CURRENT.'
          }
        ]
      }
    },
    profitAndLoss: {
      title: 'Division I — Statement of Profit and Loss (AS Companies)',
      sourceLink: 'https://www.mca.gov.in/Ministry/pdf/CompaniesAct2013.pdf#page=195',
      sourceLabel: 'Companies Act 2013, Schedule III Part II',
      content: {
        meaning: 'Part II of Schedule III lays down the mandatory format and disclosure requirements for the Statement of Profit and Loss of companies under AS.',
        scope: 'Applies to all companies preparing financial statements under AS, detailing revenue from operations, cost of materials, and special notes on expenses.',
        classificationRules: [
          {
            title: 'Revenue from Operations',
            body: 'For non-finance companies, Revenue from Operations must show separately: (a) Sale of products; (b) Sale of services; (c) Other operating revenues; Less: Excise duty. For finance companies, revenue includes Interest income, Dividend income, Net gain/loss on sale of investments, and Fees/commission income.'
          },
          {
            title: 'Other Income',
            body: 'Must be classified into: (a) Interest Income; (b) Dividend Income; (c) Net gain/loss on sale of investments; (d) Other non-operating income (net of expenses directly attributable to such income).'
          },
          {
            title: 'Finance Costs',
            body: 'Must be broken down into: (a) Interest expense; (b) Other borrowing costs; (c) Applicable net gain/loss on foreign currency transactions and translation.'
          }
        ],
        formats: [
          {
            title: 'Profit & Loss Statement Format',
            headers: ['Ref Page', 'Particulars', 'Note No.', 'Figures for Current Year', 'Figures for Previous Year'],
            rows: [
              ['p.195', 'I. Revenue from operations', '27', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.195', 'II. Other income', '28', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.195', 'III. Total Revenue (I + II)', '', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.195', 'IV. Expenses:', '', '', ''],
              ['p.195', '  (a) Cost of materials consumed', '29', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.195', '  (b) Purchases of Stock-in-Trade', '30', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.195', '  (c) Changes in inventories of finished goods, WIP and Stock-in-Trade', '31', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.195', '  (d) Employee benefits expense', '32', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.195', '  (e) Finance costs', '33', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.195', '  (f) Depreciation and amortization expense', '34', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.195', '  (g) Other expenses', '35', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.195', 'Total Expenses', '', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.195', 'V. Profit before exceptional and extraordinary items and tax (III - IV)', '', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.195', 'VI. Exceptional items', '36', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.195', 'VII. Profit before extraordinary items and tax (V - VI)', '', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.195', 'VIII. Extraordinary items', '37', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.195', 'IX. Profit before tax (VII - VIII)', '', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.195', 'X. Tax expense:', '', '', ''],
              ['p.195', '  (1) Current tax', '38', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.195', '  (2) Deferred tax', '39', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.195', 'XI. Profit/(Loss) for the period from continuing operations (IX - X)', '', '₹ X,XX,XXX', '₹ X,XX,XXX']
            ]
          }
        ],
        takeaways: [
          {
            title: 'CSR (Corporate Social Responsibility) Disclosure',
            body: 'Under Section 135 of the Companies Act 2013, companies must disclose the amount required to be spent, the amount spent during the year, and details of any shortfall and related party transactions in respect of CSR.'
          },
          {
            title: 'Undisclosed Income & Crypto Disclosures',
            body: 'Companies must disclose details of any transaction not recorded in the books of accounts that has been surrendered or disclosed as income during the year in the tax assessment. In addition, details of cryptocurrency or virtual currency transactions must be disclosed (profit/loss, holdings, deposits).'
          }
        ],
        examTraps: [
          {
            title: 'Excise Duty Presentation',
            body: 'Under AS, Excise Duty should be shown as a deduction from Revenue from operations on the face of the P&L. Do not show excise duty as an expense under Other Expenses.'
          }
        ],
        examples: [
          {
            title: 'Cost of Materials Consumed',
            scenario: 'Raw materials opening stock ₹ 2,00,000, Purchases during the year ₹ 12,00,000, Closing stock ₹ 3,00,000. How should it be disclosed?',
            solution: 'Calculate Cost of Materials Consumed = Opening Stock + Purchases - Closing Stock = ₹ 2,00,000 + ₹ 12,00,000 - ₹ 3,00,000 = ₹ 11,00,000. On the face of the P&L, Cost of Materials Consumed is shown as a single line item of ₹ 11,00,000, with a note giving details of items consumed.'
          }
        ]
      }
    },
    cashFlow: {
      title: 'Division I — Cash Flow Statements (AS Companies)',
      sourceLink: 'https://www.mca.gov.in/Ministry/pdf/CompaniesAct2013.pdf#page=197',
      sourceLabel: 'ICAI AS 3 Official standard',
      content: {
        meaning: 'The Cash Flow Statement provides historical information about changes in cash and cash equivalents of a company, classifying cash flows into operating, investing and financing activities.',
        scope: 'Mandatory for all companies under Schedule III, except for One Person Companies (OPC), Small Companies, and Dormant Companies.',
        classificationRules: [
          {
            title: 'Operating Activities',
            body: 'Principal revenue-producing activities of the enterprise, computed using either the Direct or Indirect method (starting from Profit Before Tax adjusted for non-cash and non-operating items).'
          },
          {
            title: 'Investing Activities',
            body: 'Acquisition and disposal of long-term assets and other investments not included in cash equivalents. E.g., purchase of plant, sale of investments, interest/dividends received.'
          },
          {
            title: 'Financing Activities',
            body: 'Activities that result in changes in the size and composition of the owner’s equity and borrowings of the enterprise. E.g., proceeds from share issue, redemption of preference shares, dividends paid, interest paid.'
          }
        ],
        takeaways: [
          {
            title: 'Definition of Cash & Cash Equivalents',
            body: 'Cash comprises cash on hand and demand deposits with banks. Cash equivalents are short-term, highly liquid investments that are readily convertible into known amounts of cash and which are subject to an insignificant risk of changes in value (usually maturity of 3 months or less).'
          }
        ],
        examTraps: [
          {
            title: 'Interest & Dividends Received/Paid',
            body: 'For non-financial companies: Interest/dividends paid are financing activities; Interest/dividends received are investing activities. For financial companies (banks/NBFCs): both are operating activities. Double-check the nature of business before classifying.'
          }
        ],
        examples: [
          {
            title: 'Indirect Method reconciliation',
            scenario: 'Net Profit before tax is ₹ 10,00,000. Depreciation is ₹ 1,50,000, Interest Expense is ₹ 50,000, Trade Receivables increased by ₹ 1,00,000. What is cash from operating activities?',
            solution: 'Start: PBT ₹ 10,00,000 + Depreciation (non-cash) ₹ 1,50,000 + Interest (financing) ₹ 50,000 - Increase in Trade Receivables (working capital outflow) ₹ 1,00,000 = Cash from Operating Activities before taxes = ₹ 11,00,000.'
          }
        ]
      }
    },
    others: {
      title: 'Division I — Ratios & Rounding (AS Companies)',
      sourceLink: 'https://www.mca.gov.in/Ministry/pdf/CompaniesAct2013.pdf#page=198',
      sourceLabel: 'Schedule III Rules on Rounding & Ratio Analysis',
      content: {
        meaning: 'Mandatory general disclosures, rounding-off rules, and analytical ratios required to be included in the Notes to Accounts.',
        scope: 'Applies to all companies under Division I of Schedule III to ensure consistency in figures and enable automated financial evaluation.',
        classificationRules: [
          {
            title: 'Rounding-off Rules',
            body: 'Turnover < ₹100 crore: Round off to nearest hundreds, thousands, lakhs, or millions. Turnover >= ₹100 crore: Round off to nearest lakhs, millions, or crores. Once chosen, rounding must be consistent.'
          },
          {
            title: '11 Mandatory Financial Ratios',
            body: 'Companies must disclose 11 specific ratios: (a) Current Ratio, (b) Debt-Equity Ratio, (c) Debt Service Coverage Ratio, (d) Return on Equity (ROE), (e) Inventory Turnover Ratio, (f) Trade Receivables Turnover Ratio, (g) Trade Payables Turnover Ratio, (h) Net Capital Turnover Ratio, (i) Net Profit Ratio, (j) Return on Capital Employed (ROCE), (k) Return on Investment (ROI).'
          }
        ],
        formats: [
          {
            title: 'Ratios Disclosure Table',
            headers: ['Ratio Name', 'Numerator', 'Denominator', 'Current Year', 'Previous Year', 'Change %'],
            rows: [
              ['Current Ratio', 'Current Assets', 'Current Liabilities', '1.50', '1.40', '7.1%'],
              ['Debt-Equity Ratio', 'Total Debt', 'Shareholder’s Equity', '0.80', '0.90', '-11.1%'],
              ['Debt Service Coverage', 'EBIT + Depreciation', 'Interest + Principal Repayments', '2.50', '2.20', '13.6%'],
              ['Return on Equity (ROE)', 'Net Profit after Tax - Pref. Dividend', 'Average Shareholder Equity', '15.0%', '14.0%', '7.1%'],
              ['Inventory Turnover', 'Cost of Goods Sold', 'Average Inventory', '6.0', '5.5', '9.1%'],
              ['Trade Receivables Turnover', 'Net Credit Sales', 'Average Trade Receivables', '8.0', '8.5', '-5.9%'],
              ['Trade Payables Turnover', 'Net Credit Purchases', 'Average Trade Payables', '10.0', '9.0', '11.1%'],
              ['Net Capital Turnover', 'Revenue from Operations', 'Working Capital', '4.0', '3.8', '5.3%'],
              ['Net Profit Ratio', 'Net Profit after Tax', 'Revenue from Operations', '12.0%', '11.5%', '4.3%'],
              ['ROCE', 'EBIT', 'Capital Employed', '18.0%', '17.0%', '5.9%'],
              ['Return on Investment (ROI)', 'Income from Investments', 'Average Investment Book Value', '8.5%', '8.0%', '6.2%']
            ]
          }
        ],
        takeaways: [
          {
            title: 'Explanation of Change > 25%',
            body: 'If the percentage of change in any of the disclosed ratios exceeds 25% compared to the previous year, the company is required to provide a detailed explanation of the reasons for such variance.'
          }
        ]
      }
    }
  },
  div2: {
    balanceSheet: {
      title: 'Division II — Balance Sheet Presentation (Ind AS Companies)',
      sourceLink: 'https://www.mca.gov.in/Ministry/pdf/ScheduleIIIDivisionII.pdf',
      sourceLabel: 'MCA Schedule III Division II (Ind AS)',
      content: {
        meaning: 'Division II of Schedule III prescribes the presentation rules for companies governed by the Indian Accounting Standards (Ind AS) framework.',
        scope: 'Applies to corporate entities that are required to comply with Ind AS (listed companies, companies with net worth >= ₹250 crore, and their subsidiaries).',
        classificationRules: [
          {
            title: 'Presentation Order',
            body: 'Balance sheet follows: Non-Current Assets, Current Assets, Equity, Non-Current Liabilities, and Current Liabilities. It emphasizes classification based on financial instruments categories.'
          },
          {
            title: 'Statement of Changes in Equity (SOCIE)',
            body: 'Under Ind AS, a Statement of Changes in Equity is a primary statement on the face of the balance sheet. It must show: share capital reconciliations, and a grid of other equity (reserves, retained earnings, OCI items) showing opening, movements, and closing balances.'
          },
          {
            title: 'Financial Assets/Liabilities classification',
            body: 'Disclose assets and liabilities grouped under financial assets/liabilities (measured at amortized cost, fair value through OCI, or fair value through profit & loss).'
          }
        ],
        formats: [
          {
            title: 'Balance Sheet Layout (Ind AS)',
            headers: ['Ref Page', 'Assets / Equity & Liabilities', 'Note No.', 'Figures as at Current Year', 'Figures as at Previous Year'],
            rows: [
              ['p.1', 'ASSETS', '', '', ''],
              ['p.1', '(1) Non-current assets', '', '', ''],
              ['p.2', '  (a) Property, plant and equipment', '1', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.2', '  (b) Capital work-in-progress', '2', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.2', '  (c) Goodwill & Intangible assets', '3', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.3', '  (d) Financial assets', '', '', ''],
              ['p.3', '    (i) Investments', '4', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.3', '    (ii) Trade receivables', '5', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.3', '    (iii) Loans', '6', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.4', '  (e) Deferred tax assets (net)', '7', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.5', '(2) Current assets', '', '', ''],
              ['p.5', '  (a) Inventories', '8', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.5', '  (b) Financial assets', '', '', ''],
              ['p.5', '    (i) Investments', '9', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.5', '    (ii) Trade receivables', '10', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.5', '    (iii) Cash and cash equivalents', '11', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.5', '    (iv) Bank balances other than CCE', '12', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.6', 'EQUITY AND LIABILITIES', '', '', ''],
              ['p.6', '(1) Equity', '', '', ''],
              ['p.6', '  (a) Equity share capital', '13', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.6', '  (b) Other equity (Reserves & OCI)', '14', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.7', '(2) Non-current liabilities', '', '', ''],
              ['p.7', '  (a) Financial liabilities', '', '', ''],
              ['p.7', '    (i) Borrowings', '15', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['p.7', '    (ii) Lease liabilities', '16', '₹ X,XX,XXX', '₹ X,XX,XXX']
            ]
          }
        ],
        takeaways: [
          {
            title: 'Lease Presentation (Ind AS 116)',
            body: 'Unlike AS where operating leases were kept off-balance-sheet, Ind AS 116 requires lessees to recognize a Right-of-Use (ROU) Asset under PPE and a corresponding Lease Liability under borrowings/financial liabilities.'
          }
        ],
        examTraps: [
          {
            title: 'Preference Shares Classification',
            body: 'Do not automatically classify preference shares as Equity. Under Ind AS (Ind AS 32), redeemable preference shares are financial liabilities and must be shown under Borrowings. Only non-redeemable preference shares may qualify as equity components.'
          }
        ],
        examples: [
          {
            title: 'Redeemable Preference Shares classification',
            scenario: 'Beta Ltd. issues 10% redeemable preference shares of ₹ 10,00,000. Shares are redeemable at the end of 5 years. How is this presented under Division II?',
            solution: 'Under Ind AS 32, since Beta Ltd. has an obligation to redeem the shares for cash, the preference shares are classified as a Financial Liability. They must be shown under Long-Term Borrowings, and the 10% dividend is shown under Finance Costs in the P&L (not as an appropriation of reserves).'
          }
        ]
      }
    },
    profitAndLoss: {
      title: 'Division II — Statement of Profit and Loss (Ind AS)',
      sourceLink: 'https://www.mca.gov.in/Ministry/pdf/ScheduleIIIDivisionII.pdf#page=14',
      sourceLabel: 'MCA Schedule III Division II Part II',
      content: {
        meaning: 'Part II of Division II prescribes a single statement or two-part statement of Profit and Loss, incorporating Other Comprehensive Income (OCI).',
        scope: 'Applies to all companies preparing statements under Ind AS, presenting total comprehensive income for the period.',
        classificationRules: [
          {
            title: 'Other Comprehensive Income (OCI)',
            body: 'Comprises items of income and expense that are not recognized in profit or loss as required/permitted by other Ind AS. Divided into: (a) Items that will not be reclassified to profit or loss (e.g. revaluation surplus, actuarial gains/losses on defined benefit plans); (b) Items that will be reclassified to profit or loss (e.g. effective portion of cash flow hedges, debt instrument fair value gains).'
          }
        ],
        takeaways: [
          {
            title: 'Total Comprehensive Income',
            body: 'Total Comprehensive Income is the sum of Profit or Loss for the period AND Other Comprehensive Income. This is a primary metric of performance under Ind AS.'
          }
        ]
      }
    },
    cashFlow: {
      title: 'Division II — Cash Flow Statements (Ind AS)',
      sourceLink: 'https://www.mca.gov.in/Ministry/pdf/ScheduleIIIDivisionII.pdf#page=18',
      sourceLabel: 'Ind AS 7 Cash Flow Statement',
      content: {
        meaning: 'Cash flow statements prepared under Ind AS 7, maintaining the three-fold classification but introducing reconciliation requirements.',
        scope: 'Mandatory for all Ind AS companies. No small-company exemptions are available for Ind AS-compliant entities.',
        classificationRules: [
          {
            title: 'Reconciliation of Liabilities from Financing Activities',
            body: 'Ind AS 7 requires a reconciliation between the opening and closing balances in the Balance Sheet for liabilities arising from financing activities (borrowings, leases), distinguishing cash changes from non-cash changes (such as fair value changes or acquisitions).'
          }
        ]
      }
    },
    others: {
      title: 'Division II — Other Disclosures (Ind AS)',
      sourceLink: 'https://www.mca.gov.in/Ministry/pdf/ScheduleIIIDivisionII.pdf#page=22',
      sourceLabel: 'MCA Ind AS Notes disclosures rules',
      content: {
        meaning: 'Extensive disclosures on capital management, financial risk management, and statutory accounting alignments under Ind AS.',
        scope: 'Disclosures are mandatory in the Notes to Accounts of all Division II companies.',
        classificationRules: [
          {
            title: 'Capital Management Disclosures',
            body: 'Companies must disclose: their objectives, policies and processes for managing capital; quantitative data about what they manage as capital; and whether they complied with any externally imposed capital requirements.'
          },
          {
            title: 'Fair Value Hierarchy Disclosures',
            body: 'For financial instruments measured at fair value, companies must disclose the categorization into: Level 1 (quoted prices), Level 2 (observable inputs), or Level 3 (unobservable inputs).'
          }
        ]
      }
    }
  },
  div3: {
    balanceSheet: {
      title: 'Division III — Balance Sheet Presentation (Ind AS NBFCs)',
      sourceLink: 'https://www.mca.gov.in/Ministry/pdf/ScheduleIIIDivisionIII.pdf',
      sourceLabel: 'MCA Schedule III Division III (Ind AS NBFC)',
      content: {
        meaning: 'Division III of Schedule III governs the presentation of financial statements of Non-Banking Financial Companies (NBFCs) complying with Ind AS.',
        scope: 'Applies to all NBFCs registered with the RBI that prepare accounts in accordance with Ind AS.',
        classificationRules: [
          {
            title: 'Liquidity-based Order',
            body: 'Unlike standard corporates, NBFCs present their Balance Sheet in order of liquidity. Items are not strictly classified as Current and Non-Current; instead, they are split into Financial and Non-Financial.'
          },
          {
            title: 'Financial Assets and Liabilities',
            body: 'Financial Assets (Cash, bank balances, derivative financial instruments, receivables, loans, investments) and Financial Liabilities (derivative liabilities, payables, debt securities, borrowings other than debt securities, deposits, subordinated liabilities).'
          }
        ],
        formats: [
          {
            title: 'NBFC Balance Sheet Layout',
            headers: ['Particulars', 'Note No.', 'Figures as at Current Year', 'Figures as at Previous Year'],
            rows: [
              ['ASSETS', '', '', ''],
              ['(1) Financial Assets', '', '', ''],
              ['  (a) Cash and cash equivalents', '1', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['  (b) Bank Balance other than CCE above', '2', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['  (c) Derivative financial instruments', '3', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['  (d) Receivables (Trade / Other)', '4', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['  (e) Loans (Categorized by type)', '5', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['  (f) Investments', '6', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['(2) Non-Financial Assets', '', '', ''],
              ['  (a) Current tax assets (Net)', '7', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['  (b) Deferred tax assets (Net)', '8', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['  (c) Property, plant and equipment', '9', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['LIABILITIES AND EQUITY', '', '', ''],
              ['(1) Financial Liabilities', '', '', ''],
              ['  (a) Derivative financial instruments', '10', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['  (b) Payables (Trade / Other)', '11', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['  (c) Debt Securities', '12', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['  (d) Borrowings (Other than Debt Securities)', '13', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['  (e) Deposits', '14', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['  (f) Subordinated liabilities', '15', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['(2) Non-Financial Liabilities', '', '', ''],
              ['  (a) Current tax liabilities (Net)', '16', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['  (b) Provisions', '17', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['(3) Equity', '', '', ''],
              ['  (a) Equity share capital', '18', '₹ X,XX,XXX', '₹ X,XX,XXX'],
              ['  (b) Other equity', '19', '₹ X,XX,XXX', '₹ X,XX,XXX']
            ]
          }
        ]
      }
    },
    profitAndLoss: {
      title: 'Division III — Statement of Profit and Loss (NBFCs)',
      sourceLink: 'https://www.mca.gov.in/Ministry/pdf/ScheduleIIIDivisionIII.pdf#page=12',
      sourceLabel: 'MCA Schedule III Division III P&L',
      content: {
        meaning: 'Prescribes the performance presentation format for financial companies under Ind AS, highlighting key revenue streams and impairment provisions.',
        scope: 'Applies to RBI-regulated NBFCs prepared under Ind AS.',
        classificationRules: [
          {
            title: 'Revenue Streams for Financial Entities',
            body: 'Revenue from operations must show: (a) Interest Income; (b) Dividend Income; (c) Rental Income; (d) Fees and commission income; (e) Net gain on fair value changes; (f) Net gain on derecognition of financial assets.'
          },
          {
            title: 'ECL Impairment Provision',
            body: 'The P&L must explicitly show a separate line item for "Impairment on financial instruments" computed in accordance with the Expected Credit Loss (ECL) model of Ind AS 109.'
          }
        ],
        takeaways: [
          {
            title: 'ECL vs Incurred Loss Model',
            body: 'Unlike AS where provisions are made only when loss is incurred (AS 29), Ind AS 109 NBFCs must record ECL provisions from day one based on credit rating transitions (Stage 1, Stage 2, Stage 3).'
          }
        ]
      }
    },
    cashFlow: {
      title: 'Division III — Cash Flow Statements (NBFCs)',
      sourceLink: 'https://www.mca.gov.in/Ministry/pdf/ScheduleIIIDivisionIII.pdf#page=18',
      sourceLabel: 'Ind AS 7 for Financial Institutions',
      content: {
        meaning: 'Cash flow statements for NBFCs follow Ind AS 7, with operating activities reflecting the core lending and deposit-taking transactions.',
        scope: 'Mandatory for all registered NBFCs preparing Ind AS statements.',
        classificationRules: [
          {
            title: 'Interest and Dividend classification',
            body: 'Unlike regular corporates, for an NBFC, interest received/paid and dividends received/paid are classified as Operating Cash Flows, as they form part of their core business operations.'
          }
        ]
      }
    },
    others: {
      title: 'Division III — NBFC Disclosures',
      sourceLink: 'https://www.mca.gov.in/Ministry/pdf/ScheduleIIIDivisionIII.pdf#page=22',
      sourceLabel: 'MCA Division III RBI Notes rules',
      content: {
        meaning: 'Mandatory RBI disclosures and prudential ratios required under Division III of Schedule III.',
        scope: 'Mandatory for all registered NBFCs to ensure regulatory transparency.',
        classificationRules: [
          {
            title: 'Capital Adequacy Ratio (CRAR)',
            body: 'NBFCs must disclose their Capital to Risk-Weighted Assets Ratio (CRAR), Tier I Capital %, Tier II Capital %, and the amount of subordinated debt.'
          },
          {
            title: 'Maturity Patterns & Concentration',
            body: 'Disclose assets and liabilities grouped into maturity buckets; concentration of deposits, advances, and exposures; and exposure to sensitive sectors (real estate, capital markets).'
          }
        ]
      }
    }
  }
}
