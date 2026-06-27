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
    title={`Open ICAI AS 20 PDF — Page ${page}`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-file-text"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  </button>
)

export const icaiIllustrations: CaseStudy[] = [
  {
    id: 'illus-20-1',
    title: 'ICAI Illustration 1 — Weighted Average Number of Shares (Time-Weighting of Capital Changes)',
    category: 'Official ICAI Illustration',
    pdfPage: 6,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Alpha Ltd. has the following capital changes during the calendar year 20X1:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>1st January: Balance at the beginning of the year = <strong>1,800 shares</strong> outstanding.</li>
              <li>31st May: Issue of shares for cash = <strong>600 shares</strong>.</li>
              <li>1st November: Buy Back of shares = <strong>300 shares</strong>.</li>
            </ul>
            <p className="mt-2"><strong>Issue:</strong> Calculate the weighted average number of equity shares outstanding during the period. <PdfRefInline page={6} /></p>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div className="space-y-3 font-mono text-xs p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
            <p><strong>Method 1: By tracking the outstanding balances over time-periods</strong></p>
            <p>&nbsp;&nbsp;• 1st Jan to 31st May (5 months): 1,800 shares × 5/12 = 750 shares</p>
            <p>&nbsp;&nbsp;• 1st Jun to 31st Oct (5 months): 2,400 shares × 5/12 = 1,000 shares</p>
            <p>&nbsp;&nbsp;• 1st Nov to 31st Dec (2 months): 2,100 shares × 2/12 = 350 shares</p>
            <p>&nbsp;&nbsp;• <strong>Total Weighted Average = 750 + 1,000 + 350 = 2,100 shares</strong></p>
            
            <p className="mt-3"><strong>Method 2: By tracking the incremental issues and buybacks</strong></p>
            <p>&nbsp;&nbsp;• Beginning balance: 1,800 shares × 12/12 = 1,800 shares</p>
            <p>&nbsp;&nbsp;• New issue (outstanding for 7 months): +600 shares × 7/12 = +350 shares</p>
            <p>&nbsp;&nbsp;• Buy Back (reduced for 2 months): -300 shares × 2/12 = -50 shares</p>
            <p>&nbsp;&nbsp;• <strong>Total Weighted Average = 1,800 + 350 - 50 = 2,100 shares</strong></p>
          </div>
        )
      },
      {
        title: 'AS 20 Audit Notes',
        content: (
          <div className="space-y-2">
            <p>The time-weighting factor represents the ratio of the number of days (or months, as a reasonable approximation) the shares are outstanding to the total number of days in the period. <PdfRefInline page={5} /></p>
            <p><strong>Key Audit Audit points:</strong></p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Verification of cash receipts for newly issued shares to confirm the correct "from date".</li>
              <li>Verification of board minutes and actual cancellation of shares for the buyback to confirm the correct "buyback date".</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Ensure to use daily computation if specified, though monthly approximation is acceptable in standard examinations unless dates are highly irregular. Buyback is treated as a reduction in outstanding shares from the date the shares are cancelled.',
    examFocusType: 'focus'
  },
  {
    id: 'illus-20-2',
    title: 'ICAI Illustration 2 — Partly Paid Equity Shares (Participation in Dividends)',
    category: 'Official ICAI Illustration',
    pdfPage: 7,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Beta Ltd. has the following shares on 1st January 20X1:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>1st January: Beginning balance = <strong>1,800 fully paid shares</strong> (Face Value ₹10, Paid-up ₹10).</li>
              <li>31st October: Issue of partly paid shares = <strong>600 shares</strong> (Face Value ₹10, Paid-up ₹5).</li>
            </ul>
            <p className="mt-2"><strong>Additional Condition:</strong> Partly paid shares are entitled to participate in the dividend to the extent of the amount paid up relative to fully paid shares. <PdfRefInline page={7} /></p>
            <p className="mt-2"><strong>Issue:</strong> Calculate the weighted average number of equity shares outstanding for EPS calculation.</p>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div className="space-y-3 font-mono text-xs p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
            <p><strong>Step 1: Convert partly paid shares to equivalent fully paid shares</strong></p>
            <p>Partly paid shares participate in dividends to the extent of 50% (₹5 paid / ₹10 face value).</p>
            <p>Equivalent fully paid shares = 600 shares × (5 / 10) = <strong>300 shares</strong>.</p>
            
            <p className="mt-3"><strong>Step 2: Apply time weighting to the equivalent shares</strong></p>
            <p>The 300 equivalent shares are outstanding for 2 months (November and December).</p>
            <p>Weighted average = (1,800 × 12/12) + (300 × 2/12) = 1,800 + 50 = <strong>1,850 shares</strong>.</p>
          </div>
        )
      },
      {
        title: 'AS 20 Legal Verdict',
        content: (
          <div className="space-y-2">
            <p>Under AS 20, partly paid equity shares are treated as a fraction of an equity share to the extent that they were entitled to participate in dividends relative to a fully paid equity share during the reporting period. <PdfRefInline page={7} /></p>
            <p>If partly paid shares carry different dividend rights (e.g., entitled to full dividends despite being partly paid), they are treated as fully paid shares and time-weighted accordingly from the date of issue.</p>
          </div>
        )
      }
    ],
    examFocus: 'Always read the question terms carefully: if partly paid shares do not participate in dividends until fully paid, they are treated as POTENTIAL equity shares for Diluted EPS, but are NOT included in Basic EPS denominator.',
    examFocusType: 'trap'
  },
  {
    id: 'illus-20-3',
    title: 'ICAI Illustration 3 — Retrospective Adjustment of Bonus Issue (EPS Restatement)',
    category: 'Official ICAI Illustration',
    pdfPage: 8,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Financial Data:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Net profit for the year 20X0 = <strong>₹18,00,000</strong></li>
              <li>Net profit for the year 20X1 = <strong>₹60,00,000</strong></li>
              <li>Shares outstanding before bonus issue = <strong>2,00,000 shares</strong> (up to 30th Sept 20X1).</li>
              <li>1st October 20X1: Bonus issue of <strong>1-for-1</strong> (2,00,000 new shares issued for no consideration).</li>
            </ul>
            <p className="mt-2"><strong>Issue:</strong> Calculate the Basic EPS for 20X1 and the comparative EPS for 20X0. <PdfRefInline page={8} /></p>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div className="space-y-3 font-mono text-xs p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
            <p><strong>Step 1: Determine Denominator for 20X1 (Bonus shares treated as outstanding from day 1)</strong></p>
            <p>Shares before bonus: 2,00,000</p>
            <p>Bonus shares: +2,00,000 (Adjusted retrospectively as if issued on 1st Jan 20X1)</p>
            <p>Denominator for 20X1 = <strong>4,00,000 shares</strong></p>
            
            <p className="mt-3"><strong>Step 2: Calculate Basic EPS for 20X1</strong></p>
            <p>Basic EPS 20X1 = ₹60,00,000 / 4,00,000 = <strong>₹15.00 per share</strong></p>
            
            <p className="mt-3"><strong>Step 3: Restate 20X0 Denominator and EPS (Retrospective restatement)</strong></p>
            <p>Original shares in 20X0 = 2,00,000</p>
            <p>Adjusted shares in 20X0 (Original × 2) = 4,00,000</p>
            <p>Restated Basic EPS 20X0 = ₹18,00,000 / 4,00,000 = <strong>₹4.50 per share</strong></p>
            <p><i>(Note: Original EPS 20X0 was ₹18,00,000 / 2,00,000 = ₹9.00 per share)</i></p>
          </div>
        )
      },
      {
        title: 'AS 20 Disclosure Note',
        content: (
          <div className="space-y-2">
            <p><strong>Required Notes to Accounts:</strong></p>
            <div className="p-3 bg-slate-100 dark:bg-slate-800 font-mono text-xs rounded border text-slate-800 dark:text-gray-200">
              "During the current financial year 20X1, the company issued 2,00,000 bonus equity shares of ₹10 each in the ratio of 1:1. Consequently, the Basic and Diluted Earnings Per Share for the current year and the comparative previous year 20X0 have been adjusted retrospectively as required by AS 20."
            </div>
          </div>
        )
      }
    ],
    examFocus: 'Bonus issues do not bring in new resources, so they are treated as if they were outstanding from the beginning of the earliest period presented. Never time-weight bonus shares from the actual date of issue! Always apply them from the beginning of the year.',
    examFocusType: 'concept'
  },
  {
    id: 'illus-20-4',
    title: 'ICAI Illustration 4 — Rights Issue with Bonus Element (Theoretical Ex-Rights Price - TERP)',
    category: 'Official ICAI Illustration',
    pdfPage: 10,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity Details:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Net profit for the year 20X0 = <strong>₹11,00,000</strong></li>
              <li>Net profit for the year 20X1 = <strong>₹15,00,000</strong></li>
              <li>Shares outstanding prior to rights issue = <strong>5,00,000 shares</strong>.</li>
              <li>Rights Issue: <strong>1 new share for every 5 outstanding</strong> (i.e., 1,00,000 shares) at an exercise price of <strong>₹15.00 per share</strong>.</li>
              <li>Last date of exercise = <strong>1st March 20X1</strong>.</li>
              <li>Fair Value of one equity share immediately prior to rights exercise = <strong>₹21.00</strong>.</li>
            </ul>
            <p className="mt-2"><strong>Issue:</strong> Compute the Theoretical Ex-Rights Price, Rights Factor, and the resulting Basic EPS for 20X1 and restated EPS for 20X0. <PdfRefInline page={10} /></p>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div className="space-y-3 font-mono text-xs p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
            <p><strong>Step 1: Compute Theoretical Ex-Rights Price (TERP)</strong></p>
            <p>TERP = (Fair Value of existing shares + Cash from rights) / Total shares post-rights</p>
            <p>TERP = ((5,00,000 × ₹21.00) + (1,00,000 × ₹15.00)) / (5,00,000 + 1,00,000)</p>
            <p>TERP = (₹1,05,00,000 + ₹15,00,000) / 6,00,000 = ₹1,20,00,000 / 6,00,000 = <strong>₹20.00</strong></p>
            
            <p className="mt-2"><strong>Step 2: Calculate the Rights Factor (Bonus Factor)</strong></p>
            <p>Rights Factor = Fair Value pre-rights / TERP = ₹21.00 / ₹20.00 = <strong>1.05</strong></p>
            
            <p className="mt-2"><strong>Step 3: Calculate Weighted Average Shares for 20X1</strong></p>
            <p>• Pre-rights period (Jan & Feb - 2 months): 5,00,000 × 1.05 × 2/12 = 87,500 shares</p>
            <p>• Post-rights period (Mar to Dec - 10 months): 6,00,000 × 10/12 = 5,00,000 shares</p>
            <p>• Total Weighted Shares 20X1 = 87,500 + 5,00,000 = <strong>5,87,500 shares</strong></p>
            
            <p className="mt-2"><strong>Step 4: Calculate EPS for 20X1 and Restate 20X0</strong></p>
            <p>• Basic EPS 20X1 = ₹15,00,000 / 5,87,500 = <strong>₹2.55 per share</strong></p>
            <p>• Restated Denominator 20X0 = 5,00,000 × 1.05 = 5,25,000 shares</p>
            <p>• Restated EPS 20X0 = ₹11,00,000 / 5,25,000 = <strong>₹2.10 per share</strong> (originally ₹2.20)</p>
          </div>
        )
      },
      {
        title: 'AS 20 Accounting Entry',
        content: (
          <div className="space-y-2">
            <p><strong>Accounting entry for Rights receipt on 1st March 20X1:</strong></p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono text-xs space-y-1">
              <p>Bank A/c ................................ Dr. ₹15,00,000</p>
              <p>&nbsp;&nbsp;To Equity Share Capital A/c .................... Cr. ₹10,00,000 (1L shares × ₹10)</p>
              <p>&nbsp;&nbsp;To Securities Premium A/c .................... Cr. ₹5,00,000 (1L shares × ₹5)</p>
              <p><i>(Being issue of 1,00,000 rights shares at ₹15 per share, face value ₹10)</i></p>
            </div>
          </div>
        )
      }
    ],
    examFocus: 'Rights issues have a dual nature: part cash issue (at exercise price) and part bonus issue (due to exercise price being below Fair Value). The Rights Factor (FV pre-rights / TERP) is applied retrospectively to all periods before the rights issue.',
    examFocusType: 'trick'
  },
  {
    id: 'illus-20-5',
    title: 'ICAI Illustration 5 — Diluted EPS with Convertible Debt (Interest Savings Net of Tax)',
    category: 'Official ICAI Illustration',
    pdfPage: 13,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Financial Data for 20X1:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Net Profit for the year attributable to equity = <strong>₹1,00,00,000</strong></li>
              <li>Weighted average equity shares outstanding = <strong>20,00,000 shares</strong>.</li>
              <li>12% Convertible Debentures outstanding = <strong>1,00,000 debentures</strong> of ₹100 face value.</li>
              <li>Conversion terms: Each debenture is convertible into <strong>4 equity shares</strong>.</li>
              <li>Applicable Corporate Tax rate = <strong>30%</strong>.</li>
            </ul>
            <p className="mt-2"><strong>Issue:</strong> Calculate the Basic and Diluted EPS for the year. <PdfRefInline page={13} /></p>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div className="space-y-3 font-mono text-xs p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
            <p><strong>Step 1: Calculate Basic EPS</strong></p>
            <p>Basic EPS = ₹1,00,00,000 / 20,00,000 = <strong>₹5.00 per share</strong></p>
            
            <p className="mt-2"><strong>Step 2: Calculate Dilution Impact on Numerator (Earnings)</strong></p>
            <p>• Interest saved = 1,00,000 debentures × ₹100 × 12% = ₹12,00,000</p>
            <p>• Interest is tax-deductible, so tax savings lost = ₹12,00,000 × 30% = ₹3,60,000</p>
            <p>• Net increase in earnings (interest net of tax) = ₹12,00,000 × (1 - 0.30) = <strong>₹8,40,000</strong></p>
            <p>• Adjusted Earnings = ₹1,00,00,000 + ₹8,40,000 = <strong>₹1,08,40,000</strong></p>
            
            <p className="mt-2"><strong>Step 3: Calculate Dilution Impact on Denominator (Shares)</strong></p>
            <p>• Additional shares issued on conversion = 1,00,000 debentures × 4 = <strong>4,00,000 shares</strong></p>
            <p>• Adjusted Shares = 20,00,000 + 4,00,000 = <strong>24,00,000 shares</strong></p>
            
            <p className="mt-2"><strong>Step 4: Calculate Diluted EPS</strong></p>
            <p>Diluted EPS = ₹1,08,40,000 / 24,00,000 = <strong>₹4.52 per share</strong></p>
            <p><i>(Note: Since ₹4.52 &lt; ₹5.00, the debentures are dilutive)</i></p>
          </div>
        )
      },
      {
        title: 'AS 20 Audit Verification',
        content: (
          <div className="space-y-2">
            <p><strong>Audit Verification steps:</strong></p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Review the terms of the debentures to check the exact conversion ratio.</li>
              <li>Recompute interest savings, ensuring the corporate tax rate is correctly applied to compute the net-of-tax numerator adjustments.</li>
              <li>Check for anti-dilution: if Diluted EPS is greater than Basic EPS, the options/debentures are anti-dilutive and must be ignored.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: 'Do not forget to deduct tax from the interest savings when adjusting the numerator. Interest paid is a tax-deductible expense, so its savings will increase tax expense by interest × tax rate.',
    examFocusType: 'trap'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-20-1',
    title: 'Business Case — Dilution and Treasury Share Method for ESOPs (Employee Stock Option Plans)',
    category: 'Business Application Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> TechSolutions India Ltd. has the following details for the financial year 20X1-X2:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Net Profit attributable to equity = <strong>₹50,00,000</strong>.</li>
              <li>Weighted average equity shares outstanding = <strong>10,00,000 shares</strong>.</li>
              <li>Outstanding ESOPs (Options) = <strong>1,00,000 options</strong>.</li>
              <li>Option Exercise Price = <strong>₹30.00 per share</strong>.</li>
              <li>Average Fair Value (Market Price) of one equity share during the year = <strong>₹50.00</strong>.</li>
            </ul>
            <p className="mt-2"><strong>Issue:</strong> Calculate the Basic and Diluted EPS for the company. How are options treated since they do not pay interest or receive dividends?</p>
          </div>
        )
      },
      {
        title: 'Dilution Computations',
        content: (
          <div className="space-y-3 font-mono text-xs p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
            <p><strong>Step 1: Compute Basic EPS</strong></p>
            <p>Basic EPS = ₹50,00,000 / 10,00,000 = <strong>₹5.00 per share</strong></p>
            
            <p className="mt-2"><strong>Step 2: Apply the Treasury Share Method for Options</strong></p>
            <p>Options are assumed to be exercised on day 1. Cash received = 1,00,000 options × ₹30 = ₹30,00,000.</p>
            <p>This cash is assumed to buy back shares at average market price (₹50). Shares bought back = ₹30,00,000 / ₹50 = 60,00,000 / 100 = <strong>60,000 shares</strong>.</p>
            <p>Net new shares issued = Options issued - Shares bought back = 1,00,000 - 60,000 = <strong>40,000 shares</strong>.</p>
            
            <p className="mt-2"><strong>Step 3: Compute Diluted EPS (Numerator is unchanged as options have no interest impact)</strong></p>
            <p>Diluted EPS = ₹50,00,000 / (10,00,000 + 40,000) = ₹50,00,000 / 10,40,000 = <strong>₹4.81 per share</strong></p>
          </div>
        )
      },
      {
        title: 'AS 20 Principles',
        content: (
          <div className="space-y-2">
            <p>For options and warrants, the dilution is calculated using the **Treasury Share Method** under AS 20. <PdfRefInline page={17} /></p>
            <p>The difference between the number of shares issued under the options and the number of shares that could be purchased at fair value is treated as an issue of equity shares for no consideration. This portion is dilutive.</p>
          </div>
        )
      }
    ],
    examFocus: 'If the option exercise price is GREATER than or equal to the average market price of shares, the options are anti-dilutive (because exercising them would be unfavorable) and must be excluded from the Diluted EPS calculation.',
    examFocusType: 'concept'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-20-1',
    title: 'Audit Case — Mandatoriness of Negative EPS and Loss per Share Reporting',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Infra Ltd. suffered a heavy loss of <strong>₹45,00,000</strong> during the FY 20X1-X2 due to project cancellations.</p>
            <p><strong>Corporate Position:</strong> The management argues that because the company has incurred a net loss, reporting a negative Earnings Per Share (i.e., Loss Per Share) of ₹4.50 on the face of the Profit &amp; Loss account is unnecessary and might mislead stakeholders into thinking the share value is negative.</p>
            <p><strong>Auditor Position:</strong> The statutory auditor insists that AS 20 mandates reporting of both Basic and Diluted EPS on the face of the P&amp;L account, whether positive or negative.</p>
          </div>
        )
      },
      {
        title: 'Audit Analysis & Verdict',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Reference:</strong> AS 20 (Paragraph 43) states that an enterprise should present basic and diluted earnings per share on the face of the statement of profit and loss for each class of equity shares. <PdfRefInline page={22} /></p>
            <p><strong>Verdict:</strong> The auditor is correct. Reporting of Basic and Diluted EPS on the face of the P&amp;L account is mandatory, even if the amounts are negative (i.e., a loss per share). Management cannot omit EPS presentation due to net losses.</p>
          </div>
        )
      }
    ],
    examFocus: 'In audit examinations, questions often test whether EPS must be reported on the face of P&L or can be relegated to the Notes to Accounts. Remember that presentation on the face of P&L is mandatory for all companies except SMCs (who only have exemption from Diluted EPS).',
    examFocusType: 'focus'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-20-1',
    title: 'Regulatory Observation — SMC Exemption limits under the Companies (AS) Rules',
    category: 'Regulatory Observation',
    panels: [
      {
        title: 'Regulatory Guideline',
        content: (
          <div>
            <p>Under the Companies (Accounting Standards) Rules, Small and Medium-sized Companies (SMCs) enjoy certain exemptions:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
              <li>Disclosure of <strong>Diluted Earnings Per Share</strong> (both including and excluding extraordinary items) is not mandatory for SMCs. <PdfRefInline page={2} /></li>
              <li>However, SMCs must still disclose <strong>Basic Earnings Per Share</strong> on the face of the Profit and Loss statement.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Compliance Checklist',
        content: (
          <div className="space-y-2 text-xs">
            <p>1. Check if the company qualifies as an SMC under the criteria (turnover &lt; ₹250 crore, borrowings &lt; ₹50 crore, not a bank/financial institution/holding/subsidiary of non-SMC).</p>
            <p>2. If qualifying, verify that the face of the P&amp;L displays Basic EPS.</p>
            <p>3. Ensure appropriate disclosure in Note 1 (Accounting Policies) regarding the adoption of SMC exemptions.</p>
          </div>
        )
      }
    ],
    examFocus: 'Do not claim that SMCs are completely exempt from AS 20. They are only exempt from Diluted EPS disclosures. Basic EPS is still mandatory.',
    examFocusType: 'trap'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'court-20-1',
    title: 'Judicial Case — Restatement of Comparative EPS on Stock splits during litigation',
    category: 'Landmark Precedent',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Delta Power Ltd. split its equity shares of ₹10 each into ₹2 each (5-for-1 split) on 15th April 20X2, which was after the balance sheet date (31st March 20X2) but before the approval of financial statements by the Board on 30th May 20X2.</p>
            <p><strong>Litigation:</strong> A shareholder group filed a lawsuit claiming that the EPS for the year ended 31st March 20X2 should not be restated for the split since the split occurred in the next financial year.</p>
          </div>
        )
      },
      {
        title: 'Legal Verdict',
        content: (
          <div className="space-y-2 text-xs">
            <p><strong>Standard Rule (Para 43 / 44):</strong> If the number of equity or potential equity shares outstanding increases as a result of a bonus, split, or reverse split after the balance sheet date but before approval, the per share calculations for those and any prior period financial statements presented should be based on the new number of shares. <PdfRefInline page={22} /></p>
            <p><strong>Verdict:</strong> The restatement is legally valid and mandatory. The split occurred before Board approval, so the company was required to compute both current and comparative EPS using the split shares.</p>
          </div>
        )
      }
    ],
    examFocus: 'If a share split or bonus issue happens AFTER the balance sheet date but BEFORE approval of accounts, you MUST compute EPS for the reporting period (and restate previous periods) using the new share count. This is a very common exam adjustment.',
    examFocusType: 'adjustment'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-20-1',
    title: 'Exam Corner — Step-by-Step Dilution Sequence with Multiple Potential Equity Shares',
    category: 'Exam Corner',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Corporates has the following capital structure in 20X1:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Net Profit attributable to equity = <strong>₹86,00,000</strong>.</li>
              <li>Outstanding equity shares = <strong>20,00,000 shares</strong>.</li>
              <li>Potential Shares 1 (Options): <strong>1,00,000 options</strong> at ₹40 (Average Market Price of share is ₹50).</li>
              <li>Potential Shares 2 (Debentures): <strong>1,00,000 Convertible Debentures</strong> of ₹100 face value (convertible to 4 shares per debenture, interest expense net of tax is ₹8,40,000).</li>
            </ul>
            <p className="mt-2"><strong>Issue:</strong> How do you calculate Diluted EPS when there are multiple potential equity shares?</p>
          </div>
        )
      },
      {
        title: 'Step-by-Step Dilution Order',
        content: (
          <div className="space-y-3 font-mono text-xs p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
            <p><strong>Step 1: Calculate Basic EPS</strong></p>
            <p>Basic EPS = ₹86,00,000 / 20,00,000 = <strong>₹4.30 per share</strong></p>
            
            <p className="mt-2"><strong>Step 2: Determine incremental EPS for each potential share</strong></p>
            <p>• <strong>Options:</strong> Incremental earnings = ₹0. Incremental shares = 1,00,000 - (1,00,000 × ₹40/₹50) = 20,00,000/100 = 20,000 shares. Incremental EPS = ₹0 / 20,000 = <strong>₹0.00</strong>.</p>
            <p>• <strong>Debentures:</strong> Incremental earnings = ₹8,40,000. Incremental shares = 4,00,000 shares. Incremental EPS = ₹8,40,000 / 4,00,000 = <strong>₹2.10</strong>.</p>
            
            <p className="mt-2"><strong>Step 3: Rank potential shares by dilutive impact (Lowest incremental EPS is most dilutive)</strong></p>
            <p>&nbsp;&nbsp;1st: Options (₹0.00)</p>
            <p>&nbsp;&nbsp;2nd: Debentures (₹2.10)</p>
            
            <p className="mt-2"><strong>Step 4: Compute Diluted EPS sequentially</strong></p>
            <p>• Base: Basic EPS = ₹4.30</p>
            <p>• Add Options: Earnings = ₹86,00,000; Shares = 20,20,000. EPS = ₹86,00,000 / 20,20,000 = <strong>₹4.26</strong> (Dilutive).</p>
            <p>• Add Debentures: Earnings = ₹86,00,000 + ₹8,40,000 = ₹94,40,000; Shares = 20,20,000 + 4,00,000 = 24,20,000. EPS = ₹94,40,000 / 24,20,000 = <strong>₹3.90</strong> (Dilutive).</p>
            <p>• <strong>Final Diluted EPS = ₹3.90</strong></p>
          </div>
        )
      }
    ],
    examFocus: 'When a company has multiple classes of potential equity shares, you must rank them from most dilutive to least dilutive and add them one-by-one to test for anti-dilution. Never compute them all at once without ranking!',
    examFocusType: 'trap'
  }
]
