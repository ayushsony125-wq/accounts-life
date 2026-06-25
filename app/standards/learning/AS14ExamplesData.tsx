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
    className="inline-flex items-center justify-center w-4 h-4 mx-1 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-655 dark:text-red-400 rounded transition-all cursor-pointer select-none align-middle"
    title={`Open ICAI AS 14 PDF — Page ${page}`}
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
    id: 'illus-14-1',
    title: 'ICAI Illustration 1 — Purchase Consideration Computation & Valuation methods (Net Assets vs Net Payments)',
    category: 'Official ICAI Illustration',
    pdfPage: 12,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> Alpha Ltd. acquiring Beta Ltd. (FY 2023-24)</p>
            <p><strong>Balance Sheet of Beta Ltd. (Transferor):</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Equity Shares: 50,000 shares of ₹10 each = <strong>₹5,000,000</strong></li>
              <li>12% Debentures (FV ₹100): 10,000 debentures = <strong>₹1,000,000</strong></li>
              <li>Trade Payables: <strong>₹400,000</strong></li>
              <li>Property, Plant &amp; Equipment (PPE): <strong>₹4,800,000</strong></li>
              <li>Inventories &amp; Trade Receivables: <strong>₹1,600,000</strong></li>
            </ul>
            <p className="mt-2"><strong>Terms of Amalgamation:</strong></p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Alpha Ltd. takes over all assets and liabilities of Beta Ltd.</li>
              <li>Alpha Ltd. agrees to issue **4 Equity Shares of ₹10 each** (agreed value ₹15 per share) for every **5 shares** held in Beta Ltd.</li>
              <li>Alpha Ltd. agrees to pay **₹2 cash** per share to the equity shareholders of Beta Ltd.</li>
              <li>The 12% debenture holders of Beta Ltd. are to be discharged by Alpha Ltd. issuing **15% Debentures** of Alpha Ltd. at a **10% premium**.</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Mathematical Computations',
        content: (
          <div className="space-y-3 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>Step 1: Identify Payments to Shareholders (Purchase Consideration)</strong></p>
            <p>Under AS 14 (Para 3(g)), consideration comprises only payments made to **shareholders** (equity and preference). Payments to debenture holders or creditors are excluded from PC.</p>
            
            <p className="mt-2"><strong>1. Equity Shares Component:</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Shares in Beta Ltd. = 50,000 shares</p>
            <p>&nbsp;&nbsp;&nbsp;Exchange Ratio = 4 shares of Alpha for every 5 shares of Beta</p>
            <p>&nbsp;&nbsp;&nbsp;Shares to be Issued = (50,000 / 5) × 4 = 40,000 shares of Alpha Ltd.</p>
            <p>&nbsp;&nbsp;&nbsp;Agreed value per share = ₹15 (Face Value ₹10 + Securities Premium ₹5)</p>
            <p>&nbsp;&nbsp;&nbsp;Value of Shares = 40,000 × ₹15 = <strong>₹600,000</strong></p>
            
            <p className="mt-2"><strong>2. Cash Component:</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Cash Payment = 50,000 shares × ₹2 = <strong>₹100,000</strong></p>
            
            <p className="mt-2"><strong>Total Purchase Consideration (PC) = ₹600,000 + ₹100,000 = ₹700,000</strong></p>
            <hr className="my-2 border-slate-200 dark:border-slate-800" />
            <p><strong>Step 2: Debenture Discharge (Note: Excluded from PC)</strong></p>
            <p>&nbsp;&nbsp;&nbsp;Debentures of Beta Ltd. = ₹1,000,000</p>
            <p>&nbsp;&nbsp;&nbsp;Discharge at 10% premium = ₹1,000,000 × 1.10 = ₹1,100,000</p>
            <p>&nbsp;&nbsp;&nbsp;Discharged by issuing 15% Debentures of Alpha Ltd.</p>
          </div>
        )
      },
      {
        title: 'AS 14 Technical Analysis',
        content: (
          <div>
            <p><strong>Purchase Consideration Definition (Para 3(g)):</strong> Only payments made to shareholders are included. The discharge of debenture holders is a liability taken over and subsequently settled, and therefore does **not** form part of the purchase consideration.</p>
            <p className="mt-2"><strong>Method of Amalgamation:</strong> Since the debenture holders are settled at a premium and the consideration is partly in cash (which is not solely for fractional shares), this does not satisfy all 5 conditions for a **Merger**. It is classified as an **Amalgamation in the Nature of Purchase**.</p>
          </div>
        )
      }
    ],
    examFocus: 'PC calculation must strictly exclude payments made to debenture holders and creditors.',
    examFocusType: 'trap'
  },
  {
    id: 'illus-14-2',
    title: 'ICAI Illustration 2 — Pooling of Interests Method vs Purchase Method (Detailed Ledger Posting & Reserves Treatment)',
    category: 'Official ICAI Illustration',
    pdfPage: 17,
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Entity:</strong> X Ltd. absorbs Y Ltd. on **31st March 2024**.</p>
            <p><strong>Ledger Balances of Y Ltd. at Acquisition:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>PPE (Book Value): <strong>₹1,500,000</strong></li>
              <li>Current Assets: <strong>₹800,000</strong></li>
              <li>General Reserve: <strong>₹300,000</strong></li>
              <li>Statutory Export Reserve: <strong>₹100,000</strong></li>
              <li>Profit &amp; Loss A/c (Cr): <strong>₹150,000</strong></li>
              <li>Trade Payables: <strong>₹450,000</strong></li>
              <li>Share Capital (1,40,000 shares of ₹10 each): <strong>₹1,400,000</strong></li>
            </ul>
            <p className="mt-2"><strong>Purchase Consideration:</strong> X Ltd. issues 1 Equity Share of ₹10 each (FV) for every 1 share of Y Ltd.</p>
          </div>
        )
      },
      {
        title: 'Accounting under Pooling of Interests (Merger)',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Principles (Para 33-35):</strong> Under the Pooling of Interests method, all assets, liabilities, and reserves of the transferor company are recorded by the transferee at their book values. The difference between the share capital issued as PC and the share capital of the transferor is adjusted in reserves.</p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono">
              <p>Purchase Consideration = ₹1,400,000 (140,000 shares × ₹10)</p>
              <p>Transferor Share Capital = ₹1,400,000</p>
              <p>Difference = <strong>Nil</strong></p>
              <p className="mt-2 font-sans font-bold">Journal Entry in X Ltd.:</p>
              <p>PPE A/c .......................... Dr. ₹1,500,000</p>
              <p>Current Assets A/c ................ Dr. ₹800,000</p>
              <p>&nbsp;&nbsp;To Trade Payables A/c ................... ₹450,000</p>
              <p>&nbsp;&nbsp;To General Reserve A/c .................. ₹300,000</p>
              <p>&nbsp;&nbsp;To Statutory Export Reserve A/c .......... ₹100,000</p>
              <p>&nbsp;&nbsp;To Profit &amp; Loss A/c .................... ₹150,000</p>
              <p>&nbsp;&nbsp;To Business Purchase A/c ................ ₹1,400,000</p>
            </div>
          </div>
        )
      },
      {
        title: 'Accounting under Purchase Method',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p><strong>Principles (Para 36-39):</strong> Only assets and liabilities (not reserves, except statutory reserves) are taken over. The statutory reserves are incorporated by debiting Amalgamation Adjustment Reserve.</p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono">
              <p>Purchase Consideration = ₹1,400,000</p>
              <p>Net Assets Taken Over = PPE (₹1.5M) + Current Assets (₹800k) − Payables (₹450k) = ₹1,850,000</p>
              <p>Capital Reserve = Net Assets (₹1,850,000) − PC (₹1,400,000) = <strong>₹450,000</strong></p>
              <p className="mt-2 font-sans font-bold">Journal Entries in X Ltd.:</p>
              <p>1. Incorporate Assets &amp; Liabilities:</p>
              <p>PPE A/c .......................... Dr. ₹1,500,000</p>
              <p>Current Assets A/c ................ Dr. ₹800,000</p>
              <p>&nbsp;&nbsp;To Trade Payables A/c ................... ₹450,000</p>
              <p>&nbsp;&nbsp;To Capital Reserve A/c .................. ₹450,000</p>
              <p>&nbsp;&nbsp;To Business Purchase A/c ................ ₹1,400,000</p>
              <p className="mt-2">2. Incorporate Statutory Reserves:</p>
              <p>Amalgamation Adjustment Reserve A/c .. Dr. ₹100,000</p>
              <p>&nbsp;&nbsp;To Statutory Export Reserve A/c .......... ₹100,000</p>
            </div>
          </div>
        )
      }
    ],
    examFocus: 'In the purchase method, general reserve and P&L of the transferor are NEVER carried over; statutory reserves are carried over via Amalgamation Adjustment Reserve.',
    examFocusType: 'concept'
  }
]

export const businessCases: CaseStudy[] = [
  {
    id: 'case-14-1',
    title: 'Business Case — Fractional Shares Discharge & Debentures Settled at Premium (Zenith Net acquiring Surya Telecom)',
    category: 'Practical Business Case',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Transferee:</strong> Zenith Net Ltd.</p>
            <p><strong>Transferor:</strong> Surya Telecom Ltd.</p>
            <p>Surya Telecom has 85,000 Equity Shares of ₹10 each (fully paid). Zenith Net negotiates a scheme of absorption where Zenith Net will issue **3 Equity Shares of ₹10 each** (FV) at a premium of **₹20 per share** (agreed value ₹30) for every **4 Equity Shares** in Surya Telecom. Any fractional shares are to be settled in cash based on the market price of ₹30 per share.</p>
            <p>Surya Telecom has ₹500,000 of 10% Debentures. Zenith Net agrees to take over the debentures and issue its own 12% Debentures at a premium of 5% in settlement.</p>
          </div>
        )
      },
      {
        title: 'Calculations & Fractional Share Settlement',
        content: (
          <div className="space-y-3 text-xs font-mono p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg">
            <p><strong>1. Share Exchange Calculation:</strong></p>
            <p>Total Surya Shares = 85,000</p>
            <p>Zenith Net ratio = 3 shares for every 4 shares held.</p>
            <p>Target shares = (85,000 / 4) × 3 = 21,250 shares</p>
            <p>Since 85,000 is divisible by 4 (85,000 / 4 = 21,250 exact), there are **no fractional shares** in the aggregate exchange!</p>
            
            <p className="mt-2"><strong>What if one shareholder holds 5 shares?</strong></p>
            <p>Shareholder exchange entitlement = (5 / 4) × 3 = 3.75 shares</p>
            <p>Zenith issues 3 whole shares, and pays cash for 0.75 fraction = 0.75 × ₹30 = <strong>₹22.50</strong>.</p>
            <p>At the aggregate level, Zenith Net issues 21,250 shares at ₹30 = <strong>₹637,500</strong>.</p>
            <p>Securities Premium component = 21,250 × ₹20 = ₹425,000.</p>
          </div>
        )
      },
      {
        title: 'Disposal of Debentures & Liabilities',
        content: (
          <div>
            <p><strong>Discharge of Debentures:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Book Value of Surya Telecom Debentures = ₹500,000</li>
              <li>Discharge at 5% premium = ₹525,000</li>
              <li>Zenith Net records this taking over of liability at book value (₹500,000) and then files a journal entry for the premium on settlement.</li>
            </ul>
            <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl font-mono text-xs">
              <strong>Journal Entry in Zenith Net:</strong><br />
              10% Debentures of Surya A/c ........ Dr. ₹500,000<br />
              Premium on Redemption A/c ......... Dr. ₹25,000<br />
              &nbsp;&nbsp;To 12% Debentures of Zenith Net A/c ........ ₹525,000
            </div>
          </div>
        )
      }
    ],
    examFocus: 'Aggregate share exchange ratios may not result in fractional shares, but individual shareholder fractions must be computed and paid in cash.',
    examFocusType: 'trick'
  }
]

export const auditCases: CaseStudy[] = [
  {
    id: 'audit-14-1',
    title: 'Audit Case Study — Valuation of Assets at Fair Value vs Book Value in Purchase Method (Audit Risk & Adjustments)',
    category: 'Audit Case Study',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Scenario:</strong> Zenith Net Ltd. acquired Surya Telecom Ltd. under the Purchase Method. The scheme of amalgamation approved by the NCLT states that the assets and liabilities of Surya Telecom will be taken over at **fair values** as determined by a registered valuer.</p>
            <p>During the audit, the statutory auditor of Zenith Net notes that the registered valuer revalued a piece of freehold land of Surya Telecom from ₹1,000,000 (book value) to ₹3,500,000 (fair value). Additionally, Surya Telecom had a trademark with zero book value which was valued at ₹500,000.</p>
          </div>
        )
      },
      {
        title: 'Auditor Analysis & Technical Viewpoint',
        content: (
          <div className="space-y-3 text-xs leading-relaxed">
            <p><strong>1. Revaluation of Land:</strong> Under the Purchase Method, the assets and liabilities of the transferor company are incorporated at their fair values or by allocating the purchase consideration based on fair values (Para 36 &amp; 38). The markup of ₹2,500,000 is correct as long as the valuer's report is independent and reliable.</p>
            <p><strong>2. Unrecognized Intangibles (Trademark):</strong> Under AS 14, in a purchase amalgamation, the transferee company can recognize assets (including intangible assets like trademarks) that were not recognized in the financial statements of the transferor company, provided they have an identifiable fair value.</p>
            <p><strong>3. Deferred Tax Implications (AS 22):</strong> The change in carrying value of land and recognition of trademark creates a temporary difference. A deferred tax liability (DTL) must be recognized on the trademark and land revaluation if there is a tax base difference.</p>
          </div>
        )
      },
      {
        title: 'Audit Report & Disclosures',
        content: (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 rounded-xl text-xs space-y-2">
            <p className="font-bold text-rose-800 dark:text-rose-300">Auditor's Recommendation:</p>
            <p>The auditor must verify the registered valuer's license and assumptions. They must ensure that the trademark recognition of ₹500,000 complies with AS 26 and AS 14, and the DTL of 30% (₹150,000) is recorded, which reduces Capital Reserve or increases Goodwill on amalgamation.</p>
          </div>
        )
      }
    ],
    examFocus: 'Fair value adjustments in a purchase amalgamation directly impact the calculation of Goodwill/Capital Reserve.',
    examFocusType: 'focus'
  }
]

export const regulatoryObservations: CaseStudy[] = [
  {
    id: 'reg-14-1',
    title: 'Regulatory Observation — Preserving Statutory Reserves in Amalgamation (MCA and NFRA Compliance)',
    category: 'Regulatory Observations',
    panels: [
      {
        title: 'Background & Facts',
        content: (
          <div>
            <p><strong>Overview:</strong> Under Section 232 of the Companies Act, 2013, companies undergoing amalgamation must submit their accounting scheme for NCLT approval. NFRA has observed instances where companies undergoing amalgamation in the nature of **purchase** failed to preserve the statutory reserves of the transferor company.</p>
            <p><strong>Statutory Reserves:</strong> Reserves that are created under specific tax laws (like Investment Allowance Reserve or Export Profits Reserve under the Income Tax Act) to claim tax deductions. These reserves must be maintained for a specified number of years.</p>
          </div>
        )
      },
      {
        title: 'Accounting Rule & Mechanics (Para 39)',
        content: (
          <div className="space-y-3 text-xs leading-relaxed">
            <p>Under the **Purchase Method**, the reserves of the transferor (except statutory reserves) are not recorded. However, to comply with tax laws, statutory reserves must be incorporated in the transferee's books.</p>
            <p>This is achieved by creating an **Amalgamation Adjustment Reserve** A/c which is shown under the head "Reserves and Surplus" as a negative balance or debit balance.</p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono">
              <p>Amalgamation Adjustment Reserve A/c .. Dr. ₹100,000</p>
              <p>&nbsp;&nbsp;To Statutory Export Reserve A/c .......... ₹100,000</p>
            </div>
            <p>When the statutory requirement period expires, this entry is reversed:</p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono">
              <p>Statutory Export Reserve A/c .......... Dr. ₹100,000</p>
              <p>&nbsp;&nbsp;To Amalgamation Adjustment Reserve A/c .. ₹100,000</p>
            </div>
          </div>
        )
      }
    ],
    examFocus: 'Amalgamation Adjustment Reserve must be shown as a negative item under Reserves & Surplus in the Balance Sheet.',
    examFocusType: 'adjustment'
  }
]

export const judicialCases: CaseStudy[] = [
  {
    id: 'judicial-14-1',
    title: 'Landmark Judicial Case — CIT vs. Landmark Enterprises (Definition of Purchase Consideration & Payments to Creditors)',
    category: 'Landmark Judicial Cases',
    panels: [
      {
        title: 'Facts of the Case',
        content: (
          <div>
            <p><strong>High Court/Supreme Court Precedent:</strong></p>
            <p>The transferor company went into amalgamation, and the transferee company directly issued debentures to the creditors and debenture holders of the transferor company as part of the scheme of arrangement.</p>
            <p>The Revenue Department claimed that the value of debentures issued to creditors forms part of the "Purchase Consideration" for calculating capital gains tax and valuing assets for depreciation.</p>
          </div>
        )
      },
      {
        title: 'Judicial Ruling & AS 14 Correlation',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>The Court held that **consideration** for amalgamation is only what is paid to the owners of the enterprise (the shareholders). The discharge of liabilities or payments to creditors is not part of the price paid for the shares, but rather the execution of the obligation to take over liabilities.</p>
            <p>This aligns perfectly with **AS 14 Para 3(g)** which states: <em>"Consideration for amalgamation means the aggregate of the shares and other securities issued and the payment made in the form of cash or other assets by the transferee company to the shareholders of the transferor company."</em></p>
          </div>
        )
      }
    ],
    examFocus: 'Payments to debenture holders are a liability settlement and must NEVER be added to the Business Purchase price.',
    examFocusType: 'trap'
  }
]

export const examCorner: CaseStudy[] = [
  {
    id: 'exam-14-1',
    title: 'Exam Corner — Inter-company Balances, Bills of Exchange, and Unrealized Profit on Stock Adjustments',
    category: 'Exam-Oriented Corner',
    panels: [
      {
        title: 'Inter-Company Balances & Debts',
        content: (
          <div className="space-y-2 text-xs">
            <p>Often, the transferor and transferee had transactions prior to amalgamation. On amalgamation, these mutual debts are cancelled.</p>
            <p><strong>Accounting Treatment:</strong></p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono">
              <p>Trade Payables A/c ........... Dr. [Common Amount]</p>
              <p>&nbsp;&nbsp;To Trade Receivables A/c .............. [Common Amount]</p>
            </div>
            <p>No goodwill or capital reserve adjustment is needed for simple mutual debt cancellation.</p>
          </div>
        )
      },
      {
        title: 'Unrealized Profit on Stock',
        content: (
          <div className="space-y-2 text-xs leading-relaxed">
            <p>If the transferor sold goods to the transferee (or vice versa) at a profit, and some of those goods remain in stock at the date of amalgamation, the unrealized profit must be eliminated.</p>
            <p><strong>Accounting Treatment under Merger (Pooling of Interests):</strong></p>
            <p>Adjusted against the **General Reserve / P&amp;L A/c** of the transferee.</p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono">
              <p>General Reserve / P&amp;L A/c .... Dr. [Unrealized Profit]</p>
              <p>&nbsp;&nbsp;To Stock/Inventory A/c ................ [Unrealized Profit]</p>
            </div>
            <p><strong>Accounting Treatment under Purchase Method:</strong></p>
            <p>Adjusted against **Goodwill or Capital Reserve** (since it reduces the net assets value taken over).</p>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono">
              <p>Goodwill / Capital Reserve .... Dr. [Unrealized Profit]</p>
              <p>&nbsp;&nbsp;To Stock/Inventory A/c ................ [Unrealized Profit]</p>
            </div>
          </div>
        )
      }
    ],
    examFocus: 'Eliminate unrealized profit on stock in purchase method by debiting Goodwill or Capital Reserve, not P&L.',
    examFocusType: 'adjustment'
  }
]
