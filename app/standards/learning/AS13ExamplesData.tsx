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
    title={`Open ICAI AS 13 PDF — Page ${page}`}
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
    id: 'illus-13-1',
    title: 'ICAI Illustration 1 — Pre-acquisition Interest & Dividend Adjustment (Debentures bought Cum-Interest)',
    category: 'Official ICAI Illustration',
    pdfPage: 7,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Investments Ltd. (FY 2023-24)</p>
            <p><strong>The Transaction:</strong> On **1st June 2023**, Zenith bought **1,000 12% Debentures** of face value ₹100 each in Y Ltd. at **₹105 Cum-Interest**.</p>
            <p><strong>Key conditions:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Interest Payment dates: **30th June** and **31st December** every year.</li>
              <li>Brokerage expense: **1%** on cumulative transaction price.</li>
            </ul>
            <p className="mt-2">Zenith wants to compute the initial carrying cost of the debentures and record the interest received on 30th June 2023.</p>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div className="space-y-3 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>Step 1: Total Purchase Price Paid</strong></p>
            <p>1,000 Debentures × ₹105 = ₹1,05,000</p>
            <p>Add: 1% Brokerage = ₹1,050</p>
            <p>Total Cash Outflow = <strong>₹1,06,050</strong></p>
            
            <p className="mt-2"><strong>Step 2: Pre-Acquisition Accrued Interest (1st January to 31st May = 5 Months)</strong></p>
            <p>Accrued Interest = 1,000 × ₹100 × 12% × (5 / 12) = <strong>₹5,000</strong></p>
            
            <p className="mt-2"><strong>Step 3: Net Capital Cost of Investment (Carrying Value)</strong></p>
            <p>Ex-Interest Cost = Total Cash Outflow − Accrued Interest</p>
            <p>Ex-Interest Cost = ₹1,06,050 − ₹5,000 = <strong>₹1,01,050</strong></p>

            <p className="mt-2"><strong>Step 4: Interest Received on 30th June 2023 (6 Months interest)</strong></p>
            <p>Total Interest Received = 1,000 × ₹100 × 12% × (6 / 12) = <strong>₹6,000</strong></p>
            <p>Pre-acquisition share (recovery of capital) = <strong>₹5,000</strong> (credits Investment Cost)</p>
            <p>Post-acquisition share (P&amp;L Income) = <strong>₹1,000</strong> (credits P&amp;L)</p>
          </div>
        )
      },
      {
        title: 'Journal Postings',
        content: (
          <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl font-mono text-xs leading-relaxed">
            <strong>1. On Date of Acquisition (1st June 2023):</strong><br />
            &nbsp;&nbsp;&nbsp;Investment in Y Ltd. Debentures A/c ... Dr. ₹1,01,050<br />
            &nbsp;&nbsp;&nbsp;Interest Receivable A/c ................ Dr. ₹5,000<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To Bank A/c ..................................... ₹1,06,050<br />
            <br />
            <strong>2. On Receipt of Interest (30th June 2023):</strong><br />
            &nbsp;&nbsp;&nbsp;Bank A/c ............................... Dr. ₹6,000<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To Interest Receivable A/c ....................... ₹5,000<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To Profit &amp; Loss A/c (Interest Income) ........... ₹1,000<br />
            <br />
            <em>(Carrying value of investment remains ₹1,01,050 in the books)</em>
          </div>
        )
      }
    ],
    examFocus: "Always deduct the pre-acquisition interest from the total purchase price to get the capital cost of the investment. If brokerage is paid, add it to the purchase price before making the interest deduction.",
    examFocusType: 'trap'
  },
  {
    id: 'illus-13-2',
    title: 'ICAI Illustration 2 — Valuation of Current Investments (Individual vs Category basis)',
    category: 'Official ICAI Illustration',
    pdfPage: 9,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Apex Traders Ltd. (Valuation date: 31st March 2024)</p>
            <p><strong>The Portfolio:</strong> Holds three current equity investments:</p>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-xs border border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900">
                    <th className="p-2 border">Investment</th>
                    <th className="p-2 border">Acquisition Cost</th>
                    <th className="p-2 border">Fair Value (Market Value)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border font-semibold">Shares in Tata Ltd.</td>
                    <td className="p-2 border">₹15,000</td>
                    <td className="p-2 border">₹12,000</td>
                  </tr>
                  <tr>
                    <td className="p-2 border font-semibold">Shares in Reliance Ltd.</td>
                    <td className="p-2 border">₹25,000</td>
                    <td className="p-2 border">₹28,000</td>
                  </tr>
                  <tr>
                    <td className="p-2 border font-semibold">Shares in Infosys Ltd.</td>
                    <td className="p-2 border">₹20,000</td>
                    <td className="p-2 border">₹17,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      },
      {
        title: 'Valuation Computations',
        content: (
          <div className="space-y-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg text-xs font-mono">
              <span className="font-bold text-blue-600 block mb-1">Option A: Individual Investment Basis (Recommended)</span>
              <p>Tata Shares: Lower of ₹15,000 and ₹12,000 = <strong>₹12,000</strong></p>
              <p>Reliance Shares: Lower of ₹25,000 and ₹28,000 = <strong>₹25,000</strong></p>
              <p>Infosys Shares: Lower of ₹20,000 and ₹17,000 = <strong>₹17,000</strong></p>
              <p>Total Carrying Value of current portfolio = <strong>₹54,000</strong></p>
              <p>Total original cost = ₹60,000. Provision for write-down = <strong>₹6,000</strong> (charged to P&amp;L).</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg text-xs font-mono">
              <span className="font-bold text-amber-600 block mb-1">Option B: Category Basis (Aggregate)</span>
              <p>Total Portfolio Cost = ₹15,000 + ₹25,000 + ₹20,000 = <strong>₹60,000</strong></p>
              <p>Total Portfolio Fair Value = ₹12,000 + ₹28,000 + ₹17,000 = <strong>₹57,000</strong></p>
              <p>Carrying value (Lower of Cost and FV) = <strong>₹57,000</strong></p>
              <p>Provision for write-down = <strong>₹3,000</strong> (charged to P&amp;L).</p>
            </div>
          </div>
        )
      }
    ],
    examFocus: "Under AS 13, current investments must be valued individually unless they fall into a unified class/category. Global aggregation (offsetting Tata's losses against Reliance's gains) is not permitted unless category method is explicitly justified.",
    examFocusType: 'focus'
  }
];

export const businessCases: CaseStudy[] = [
  {
    id: 'bus-13-1',
    title: 'Business Case 1 — Reclassification of Investments (Long-term to Current and vice-versa)',
    category: 'Commercial Treasury Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Narmada Projects &amp; Treasury Ltd. (FY 2023-24)</p>
            <p><strong>The Event:</strong> Due to a liquidity squeeze, the board decides to sell a long-term strategic stake in Ganges Ltd. within the next 3 months. Conversely, a short-term treasury deposit is converted to a long-term maturity instrument.</p>
            <p><strong>Investments:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Investment A (LT to Current): Cost ₹10,00,000. Book value was written down in FY 2022-23 to ₹8,00,000 due to temporary distress. Fair value at transfer date = ₹9,50,000.</li>
              <li>Investment B (Current to LT): Cost ₹5,00,000. Fair value at transfer date = ₹4,20,000.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'AS 13 Accounting Treatment & carrying value',
        content: (
          <div className="space-y-3 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>1. Transfer of Investment A (Long-Term to Current):</strong></p>
            <p>Under AS 13 (Para 18), transfer must occur at the **lower of cost and carrying amount**.</p>
            <p>Cost = ₹10,00,000; Carrying amount = ₹8,00,000.</p>
            <p>Transfer carrying value = <strong>₹8,00,000</strong>. (Fair value of ₹9,50,000 is ignored; no gain is recognized at transfer).</p>
            
            <p className="mt-3"><strong>2. Transfer of Investment B (Current to Long-Term):</strong></p>
            <p>Under AS 13 (Para 19), transfer must occur at the **lower of cost and fair value**.</p>
            <p>Cost = ₹5,00,000; Fair value = ₹4,20,000.</p>
            <p>Transfer carrying value = <strong>₹4,20,000</strong>. The loss of ₹80,000 must be recognized immediately in P&amp;L as a write-down.</p>
          </div>
        )
      }
    ],
    examFocus: "This is a favorite exam area. LT to Current = Lower of Cost and Book Value. Current to LT = Lower of Cost and Fair Value. This asymmetry ensures prudence — losses are recognized immediately, but unrealized gains are deferred.",
    examFocusType: 'focus'
  }
];

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-13-1',
    title: 'Audit Case Study 1 — NFRA Zenith Investments Case: Failure to recognise other-than-temporary decline',
    category: 'NFRA Audit Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Zenith Steel &amp; Minerals Ltd. (FY 2021-22)</p>
            <p><strong>The Issue:</strong> Zenith held 35% equity shares in a subsidiary company, Zenith Logistics Ltd. The subsidiary had accumulated massive losses over 4 years, and its net worth was completely wiped out. The auditors discovered that Zenith logistics was undergoing insolvency proceedings.</p>
            <p><strong>Company\'s Action:</strong> Zenith continued to carry the investment at its original cost of **₹15 Crores**, stating that logistics is a cyclical industry and the decline is temporary.</p>
          </div>
        )
      },
      {
        title: 'NFRA Findings & Violations',
        content: (
          <div>
            <p>NFRA ruled that the company violated AS 13:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Other-than-temporary decline:</strong> Under AS 13 (Para 17), carrying value of long-term investments must be reduced for decline in value that is other than temporary.</li>
              <li><strong>Indicators of Permanent Decline:</strong> Erased net worth, insolvency proceedings, and consecutive operating losses are clear indicators that the decline is other than temporary.</li>
              <li><strong>Auditor Failure:</strong> The auditors failed to challenge management\'s "cyclical industry" excuse and did not insist on a provision of ₹15 Crores.</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: "In audit questions, if a long-term investee has wiped out its net worth, or has discontinued its main factory line, it is a permanent decline. The investment must be written down, and a loss recognized in P&L.",
    examFocusType: 'trap'
  }
];

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-13-1',
    title: 'Regulatory Observation 1 — MCA clarification on Investment Property classification',
    category: 'MCA Circular',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>The Query:</strong> A company purchased an office tower, using 20% of the space for its own corporate headquarters and renting out the remaining 80% to third-party tenants. The company wanted to classify the entire building as 'Investment Property' under AS 13 to avoid charging depreciation on it.</p>
          </div>
        )
      },
      {
        title: 'Regulatory Guidance & AS 13 Rules',
        content: (
          <div>
            <p>Under AS 13 (Para 3):</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>**Investment Property** is defined as an investment in land or buildings that is NOT intended to be occupied substantially for use in the operations of the investing enterprise.</li>
              <li>Since 20% is occupied by the corporate HQ, that portion must be classified as **Property, Plant and Equipment (PPE)** under AS 10.</li>
              <li>The rented portion (80%) can be classified as Investment Property under AS 13. However, under AS 13, investment properties must be **depreciated** in the same manner as depreciable fixed assets. Thus, classification as Investment Property does not excuse the company from charging depreciation!</li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: "Investment properties under AS 13 are treated like fixed assets for depreciation. Do not make the mistake of leaving them undepreciated in the balance sheet.",
    examFocusType: 'focus'
  }
];

export const judicialCases: CaseStudy[] = [
  {
    id: 'jud-13-1',
    title: 'Judicial Case 1 — CIT vs. HDFC Bank (Taxability of Profit on Sale of Treasury Investments)',
    category: 'Supreme Court Precedent',
    panels: [
      {
        title: 'The Tax Controversy',
        content: (
          <div>
            <p><strong>The Dispute:</strong> HDFC Bank held government bonds as part of its statutory liquidity ratio (SLR) requirements. The bank sold some bonds at a profit of ₹25 Crores and claimed it as capital gains. The tax department claimed that since SLR bonds are held to meet banking regulations, they are stock-in-trade, and profits must be taxed as normal business income.</p>
          </div>
        )
      },
      {
        title: 'Supreme Court Decision',
        content: (
          <div>
            <p>The Supreme Court ruled that:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>SLR securities are held by banks for business operations and are frequently traded to meet regulatory ratios.</li>
              <li>Therefore, they have the character of **stock-in-trade** rather than capital investments.</li>
              <li>The profits are taxable as **business income**.</li>
              <li><em>(Note: AS 13 does not apply to stock-in-trade. Stock-in-trade is accounted for under AS 2 Inventories).</em></li>
            </ul>
          </div>
        )
      }
    ],
    examFocus: "If investments are held as stock-in-trade, do not apply AS 13. They must be valued at lower of cost and net realizable value under AS 2.",
    examFocusType: 'focus'
  }
];

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-13-1',
    title: 'Exam Corner 1 — Investment Ledger Account Preparation (Weighted Average Cost Method)',
    category: 'Exam Corner',
    panels: [
      {
        title: 'The Exam Problem',
        content: (
          <div>
            <p><strong>Question:</strong> On 1st April 2023, P Ltd. held 2,000 equity shares in Q Ltd. (Cost ₹2,40,000). On 1st July 2023, P purchased 1,000 shares at ₹150 each. On 1st September 2023, P received 1:3 bonus shares from Q Ltd. On 1st November 2023, P sold 1,500 shares at ₹160 each. Show the Investment Ledger Account using Weighted Average method.</p>
          </div>
        )
      },
      {
        title: 'Model Answer & Calculations',
        content: (
          <div className="space-y-3 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>1. Purchase on 1st July:</strong> 1,000 shares × ₹150 = ₹1,50,000</p>
            <p><strong>2. Bonus received on 1st September:</strong> 3,000 shares held / 3 = 1,000 bonus shares (cost = ₹0)</p>
            <p>Total holding = 4,000 shares; Total Cost = ₹2,40,000 + ₹1,50,000 = ₹3,90,000</p>
            <p>Weighted Average Cost per share = ₹3,90,000 / 4,000 shares = <strong>₹97.50 per share</strong></p>
            <p><strong>3. Sale on 1st November:</strong> 1,500 shares sold at ₹160</p>
            <p>Cost of shares sold = 1,500 shares × ₹97.50 = <strong>₹1,46,250</strong></p>
            <p>Sale proceeds = 1,500 shares × ₹160 = <strong>₹2,40,000</strong></p>
            <p>Profit on sale = ₹2,40,000 − ₹1,46,250 = <strong>₹93,750 Credit to P&amp;L</strong></p>
            <p>Remaining holding = 2,500 shares; Remaining Cost = ₹3,90,000 − ₹1,46,250 = <strong>₹2,43,750</strong></p>
          </div>
        )
      }
    ],
    examFocus: "Bonus shares increase the number of shares without increasing cost, which reduces the weighted average cost per share. Do not assign face value as the cost of bonus shares!",
    examFocusType: 'trick'
  },
  {
    id: 'exam-13-2',
    title: 'Exam Corner 2 — Rights Issue, Dividend Stripping & Current vs Long-Term Classification',
    category: 'Exam Corner',
    panels: [
      {
        title: 'Rights Issue: Cost Adjustment',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>When a company receives rights from an investee company, the investor (holder of shares) can:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li><strong>Subscribe to the rights:</strong> Additional cost added to investment; total shares increase. Weighted average cost recalculated.</li>
              <li><strong>Renounce the rights (sell them):</strong> Proceeds from renouncing rights are deducted from the carrying cost of the original investment. No P&L recognition.</li>
              <li><strong>Let them lapse:</strong> No accounting entry required.</li>
            </ol>
          </div>
        )
      },
      {
        title: 'Current vs Long-Term Classification Rule',
        content: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-200 dark:border-slate-800">
              <thead><tr className="bg-slate-100 dark:bg-slate-900"><th className="border p-2">Feature</th><th className="border p-2">Current Investment</th><th className="border p-2">Long-Term Investment</th></tr></thead>
              <tbody>
                <tr><td className="border p-2">Holding Intent</td><td className="border p-2">Readily realizable + not held &gt;1 year</td><td className="border p-2">Held for more than 1 year OR strategic holding</td></tr>
                <tr className="bg-blue-50/10"><td className="border p-2">Valuation</td><td className="border p-2">Lower of Cost or Fair Value (portfolio-wise)</td><td className="border p-2">Cost − Provision for permanent diminution only</td></tr>
                <tr><td className="border p-2">Diminution Treatment</td><td className="border p-2">Charge to P&L immediately (temporary falls charged)</td><td className="border p-2">Only permanent decline charged to P&L</td></tr>
                <tr className="bg-blue-50/10"><td className="border p-2">Recovery</td><td className="border p-2">Can reverse previously charged diminution</td><td className="border p-2">Can reverse previously charged permanent diminution</td></tr>
              </tbody>
            </table>
          </div>
        )
      },
      {
        title: 'Dividend Stripping Warning',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Dividend Stripping:</strong> An investor buys shares just before the record date to receive a dividend, then sells after at a lower ex-dividend price. The dividend creates income while the loss on sale is claimed as a deduction.</p>
            <p>Under AS 13, if an investment is acquired specifically to earn a dividend, and the cost includes the impending dividend, the dividend received represents a return OF capital (not a return ON capital). In such cases, the dividend must be credited to the cost of investment and NOT recognized as income.</p>
          </div>
        )
      }
    ],
    examFocus: 'Dividend stripping: If dividend income was included in the purchase price, the dividend is a return OF capital — deduct it from investment cost. This is a top exam conceptual pitfall under AS 13.',
    examFocusType: 'trap'
  }
];
