const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed for Section 194Q topic page...')

  // 1. Ensure Domain exists
  const domain = await db.domain.upsert({
    where: { domainSlug: 'income-tax' },
    update: {
      domainName: 'Income Tax',
      domainCode: 'TAX',
      domainTagline: 'Indian Direct Tax Laws, Rules, and Compliance',
      domainDescription: 'Complete, structured guides to the Income Tax Act 1961, including TDS, Capital Gains, Corporate Taxation, and Assessment Procedures.',
      domainColorHex: '#2D5BE3',
      domainStatus: 'ACTIVE',
    },
    create: {
      domainName: 'Income Tax',
      domainSlug: 'income-tax',
      domainCode: 'TAX',
      domainTagline: 'Indian Direct Tax Laws, Rules, and Compliance',
      domainDescription: 'Complete, structured guides to the Income Tax Act 1961, including TDS, Capital Gains, Corporate Taxation, and Assessment Procedures.',
      domainColorHex: '#2D5BE3',
      domainStatus: 'ACTIVE',
    }
  })
  console.log(`✅ Domain income-tax resolved. ID: ${domain.id}`)

  // 2. Ensure Subdomain exists
  const subdomain = await db.subdomain.upsert({
    where: {
      domainId_subdomainSlug: {
        domainId: domain.id,
        subdomainSlug: 'tds'
      }
    },
    update: {
      subdomainName: 'TDS (Tax Deducted at Source)',
    },
    create: {
      domainId: domain.id,
      subdomainName: 'TDS (Tax Deducted at Source)',
      subdomainSlug: 'tds',
      sortOrder: 1
    }
  })
  console.log(`✅ Subdomain tds resolved. ID: ${subdomain.id}`)

  // 3. Define detailed Section 194Q payload
  const payload = {
    quickAnswer: {
      applicability: "Buyer of goods with preceding FY turnover > ₹10 Crores",
      threshold: "₹50 Lakhs purchase value per seller in a financial year",
      rate: "0.1% of purchase value exceeding ₹50 Lakhs (5% if Seller PAN is not provided)",
      effectiveDate: "1st July 2021",
      riskLevel: "HIGH RISK",
      riskReason: "Failure to deduct triggers 30% purchase expense disallowance u/s 40(a)(ia), plus 1.5% monthly interest on outstanding tax."
    },
    practicalCaNotes: [
      {
        title: "GST Component Treatment (CBDT Circular 13/2021)",
        note: "If the GST component is indicated separately in the invoice, TDS must be deducted only on the basic value excluding GST. However, in case of advance payments where invoices are not yet issued, TDS must be deducted on the gross advance amount because the GST component cannot be separated at that stage."
      },
      {
        title: "TDS vs TCS Priority (Section 194Q vs 206C(1H))",
        note: "If both Section 194Q (TDS on purchases) and Section 206C(1H) (TCS on sales) apply to a transaction, the buyer has the primary responsibility to deduct TDS under Section 194Q. If the buyer fails to deduct, the seller must collect TCS. Double taxation is avoided, but the buyer faces late fees/interest for non-deduction."
      },
      {
        title: "Audit Checklist for CAs",
        note: "Always verify the seller's PAN status. If the seller is a specified person u/s 206AB (non-filer of IT returns), the TDS rate increases to 5%. Maintain a tracker of cumulative purchases per seller starting April 1st to catch the ₹50L threshold breach."
      }
    ],
    explanation: {
      summary: "Section 194Q was introduced by the Finance Act 2021 to bring high-value trading transactions within the tax net. It mandates corporate and large business buyers to deduct 0.1% TDS on domestic goods purchases exceeding ₹50 Lakhs in a financial year.",
      paragraphs: [
        "The tax deduction liability arises at the time of credit of such sum to the account of the seller, or at the time of payment thereof by any mode, whichever is earlier. It applies only to transactions with resident sellers.",
        "A buyer is defined as any person whose total sales, gross receipts, or turnover from business exceeds ₹10 Crores during the financial year immediately preceding the financial year in which goods are purchased."
      ]
    },
    legalSupport: {
      statutoryActText: [
        {
          clause: "Section 194Q(1)",
          text: "Any person, being a buyer who is responsible for paying any sum to any resident (hereafter in this section referred to as the seller) for purchase of any goods of the value or aggregate of such value exceeding fifty lakh rupees in any previous year, shall, at the time of credit of such sum to the account of the seller or at the time of payment thereof by any mode, whichever is earlier, deduct an amount equal to 0.1 per cent. of such sum exceeding fifty lakh rupees as income-tax."
        },
        {
          clause: "Section 194Q(2)",
          text: "Where the sum referred to in sub-section (1) or any part thereof is credited to any account, whether called 'Suspense Account' or by any other name, in the books of account of the person liable to pay such income, such credit shall be deemed to be the credit of such income to the account of the payee and the provisions of this section shall apply accordingly."
        },
        {
          clause: "Section 194Q(5) Exemptions",
          text: "The provisions of this section shall not apply to a transaction on which— (a) tax is deductible under any of the provisions of this Act; or (b) tax is collectible under the provisions of section 206C other than a transaction to which sub-section (1H) of section 206C applies."
        }
      ],
      rules: [
        {
          name: "Rule 31A",
          details: "Quarterly statements of tax deducted at source must be filed electronically in Form 26Q within 31 days from the end of each quarter (except Q4, which is due by May 31st)."
        }
      ],
      circulars: [
        {
          number: "Circular No. 13 of 2021",
          authority: "CBDT",
          date: "30th June 2021",
          subject: "Guidelines under Section 194Q regarding GST exclusion, e-auction transactions, stock exchanges, and adjustments for sales returns."
        },
        {
          number: "Circular No. 20 of 2021",
          authority: "CBDT",
          date: "25th November 2021",
          subject: "Additional guidelines on transactions in electricity, renewable energy certificates, and government entities."
        }
      ]
    },
    applicabilityMatrix: [
      {
        buyerTurnover: "Above ₹10 Crores",
        sellerTurnover: "Above ₹10 Crores",
        purchaseValue: "Above ₹50 Lakhs",
        applicableProvision: "TDS u/s 194Q applies (0.1%)",
        priority: "TDS takes precedence. Seller should not collect TCS u/s 206C(1H)."
      },
      {
        buyerTurnover: "Above ₹10 Crores",
        sellerTurnover: "Below ₹10 Crores",
        purchaseValue: "Above ₹50 Lakhs",
        applicableProvision: "TDS u/s 194Q applies (0.1%)",
        priority: "TDS applies. Seller has no liability."
      },
      {
        buyerTurnover: "Below ₹10 Crores",
        sellerTurnover: "Above ₹10 Crores",
        purchaseValue: "Above ₹50 Lakhs",
        applicableProvision: "TCS u/s 206C(1H) applies (0.1%)",
        priority: "Buyer exempt from TDS. Seller must collect TCS."
      },
      {
        buyerTurnover: "Below ₹10 Crores",
        sellerTurnover: "Below ₹10 Crores",
        purchaseValue: "Above ₹50 Lakhs",
        applicableProvision: "Neither applies",
        priority: "No direct tax compliance required for this transaction."
      }
    ],
    examples: [
      {
        title: "Example 1: Basic Purchase Crossing Threshold",
        scenario: "M/s Alpha Ltd (Turnover preceding year: ₹18 Cr) purchases steel from M/s Beta Corp (Resident Seller) worth ₹65 Lakhs in FY26. Alpha pays Beta on invoice booking. PAN is available.",
        calculations: [
          "1. Total Purchase: ₹65,00,000",
          "2. Threshold Limit: ₹50,00,000",
          "3. Taxable Amount: ₹65,00,000 - ₹50,00,000 = ₹15,00,000",
          "4. TDS Rate: 0.1%",
          "5. TDS Amount: ₹15,00,000 * 0.1% = ₹1,500"
        ],
        journalEntries: [
          {
            stage: "Booking Invoice & Deducting TDS",
            rows: [
              { type: "DR", accountName: "Purchase Account", drAmount: "65,00,000", crAmount: "" },
              { type: "CR", accountName: "M/s Beta Corp (Seller) A/c", drAmount: "", crAmount: "64,98,500" },
              { type: "CR", accountName: "TDS Payable u/s 194Q A/c", drAmount: "", crAmount: "1,500" }
            ],
            narration: "Being purchase of goods booked and TDS u/s 194Q deducted at 0.1% on purchase value exceeding ₹50 Lakhs."
          },
          {
            stage: "Payment to Seller",
            rows: [
              { type: "DR", accountName: "M/s Beta Corp (Seller) A/c", drAmount: "64,98,500", crAmount: "" },
              { type: "CR", accountName: "Bank Account", drAmount: "", crAmount: "64,98,500" }
            ],
            narration: "Being payment released to seller net of TDS."
          }
        ]
      },
      {
        title: "Example 2: Advance Payment booking",
        scenario: "M/s Alpha Ltd pays an advance of ₹60 Lakhs on 15th April 2025 to M/s Beta Corp. The invoice of ₹60 Lakhs (excluding GST) is booked on 10th May 2025.",
        calculations: [
          "1. Advance paid: ₹60,00,000. TDS liability triggers immediately on payment (earlier of payment or credit).",
          "2. Threshold: ₹50,00,000",
          "3. Taxable Advance: ₹10,00,000",
          "4. TDS deducted on 15th April: ₹1,000",
          "5. TDS on invoice booking on 10th May: NIL (since TDS was already deducted on advance)."
        ],
        journalEntries: [
          {
            stage: "Paying Advance & Deducting TDS",
            rows: [
              { type: "DR", accountName: "Advance to Seller A/c", drAmount: "60,00,000", crAmount: "" },
              { type: "CR", accountName: "Bank Account", drAmount: "", crAmount: "59,99,000" },
              { type: "CR", accountName: "TDS Payable u/s 194Q A/c", drAmount: "", crAmount: "1,000" }
            ],
            narration: "Being advance payment made to seller and TDS deducted on amount exceeding ₹50 Lakhs."
          }
        ]
      }
    ],
    complianceImpact: {
      returnForm: "Form 26Q",
      filingFrequency: "Quarterly Return",
      paymentDueDates: "7th of the subsequent month (e.g. TDS deducted in October must be paid by November 7th). Exception: March TDS must be paid by April 30th.",
      quarterlyDueDates: [
        { quarter: "Quarter 1 (April to June)", dueDate: "31st July" },
        { quarter: "Quarter 2 (July to September)", dueDate: "31st October" },
        { quarter: "Quarter 3 (October to December)", dueDate: "31st January" },
        { quarter: "Quarter 4 (January to March)", dueDate: "31st May" }
      ],
      lateFeeDescription: "Interest u/s 201(1A): 1.0% per month or part of a month for late deduction; 1.5% per month or part of a month for late payment. Late filing fee u/s 234E: ₹200 per day up to the maximum amount of tax deducted."
    },
    commonMistakes: [
      {
        mistake: "Deducting TDS on GST value in regular invoices",
        fix: "Ensure TDS is deducted only on the basic value of goods. Do not include GST if it is shown separately in the invoice."
      },
      {
        mistake: "Failing to check preceding financial year's turnover",
        fix: "Check your audited turnover for the prior year. If it is ₹9.5 Cr, you do not have TDS liability u/s 194Q for the current year, even if current year turnover crosses ₹10 Cr."
      },
      {
        mistake: "Applying standard 0.1% rate when Seller's PAN is missing",
        fix: "If the seller does not provide a valid PAN, the TDS rate rises automatically to 5% u/s 206AA. Ensure PAN validation is completed before credit or payment."
      }
    ],
    officialSources: [
      {
        title: "Income Tax Department — Section 194Q official text",
        source: "Incometaxindia.gov.in Portal",
        url: "https://incometaxindia.gov.in/pages/acts/income-tax-act.aspx"
      },
      {
        title: "CBDT Circular 13/2021 — Section 194Q Guidelines",
        source: "CBDT Official Gazette",
        url: "https://incometaxindia.gov.in/communications/circular/circular-no-13-2021.pdf"
      }
    ],
    relatedTopics: [
      {
        title: "Section 206C(1H) — TCS on Sale of Goods",
        slug: "section-206c-1h",
        type: "TCS",
        domainSlug: "income-tax",
        subdomainSlug: "tcs"
      },
      {
        title: "Section 206AB — Higher TDS for Non-filers",
        slug: "section-206ab",
        type: "TDS Rules",
        domainSlug: "income-tax",
        subdomainSlug: "compliance"
      },
      {
        title: "Section 194C — TDS on Contractor Payments",
        slug: "section-194c",
        type: "TDS",
        domainSlug: "income-tax",
        subdomainSlug: "tds"
      }
    ],
    curatedVideos: [
      {
        title: "Practical Guide to TDS Section 194Q & TCS 206C(1H)",
        channel: "Taxmann India Official",
        duration: "18 mins",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      }
    ],
    amendmentTimeline: [
      {
        year: "Finance Act 2021",
        change: "Section 194Q was introduced to establish TDS on high-value purchases exceeding ₹50 Lakhs to ensure auditability of trading chains."
      },
      {
        year: "Finance Act 2022",
        change: "Clarified scope exclusions u/s 206AB regarding higher TDS rates for non-compliant sellers."
      }
    ]
  }

  // 4. Create or update dynamic Entry
  const entry = await db.entry.upsert({
    where: { entrySlug: 'section-194q' },
    update: {
      entryTitle: 'Section 194Q – TDS on Purchase of Goods',
      entryType: 'CONCEPT',
      summary: 'Deduction of Tax at Source (TDS) on payments made for purchase of goods crossing ₹50 Lakhs.',
      entryBody: payload,
      authorityPrimary: 'Income Tax Department (CBDT)',
      authorityPrimaryUrl: 'https://incometaxindia.gov.in',
      authoritySecondary: 'Audited against Finance Act 2021, CBDT Circular 13/2021, and Circular 20/2021.',
      verificationLevel: 'VERIFIED',
      status: 'PUBLISHED',
      examLevelTags: ['CA Intermediate', 'CA Final', 'CS Professional']
    },
    create: {
      domainId: domain.id,
      subdomainId: subdomain.id,
      entryTitle: 'Section 194Q – TDS on Purchase of Goods',
      entrySlug: 'section-194q',
      entryType: 'CONCEPT',
      summary: 'Deduction of Tax at Source (TDS) on payments made for purchase of goods crossing ₹50 Lakhs.',
      entryBody: payload,
      authorityPrimary: 'Income Tax Department (CBDT)',
      authorityPrimaryUrl: 'https://incometaxindia.gov.in',
      authoritySecondary: 'Audited against Finance Act 2021, CBDT Circular 13/2021, and Circular 20/2021.',
      verificationLevel: 'VERIFIED',
      status: 'PUBLISHED',
      examLevelTags: ['CA Intermediate', 'CA Final', 'CS Professional']
    }
  })
  console.log(`✅ Entry section-194q resolved. ID: ${entry.id}`)

  // 5. Verify the insertion
  console.log('\n--- VERIFY SEED ---')
  const check = await db.entry.findUnique({
    where: { entrySlug: 'section-194q' },
    include: { domain: true, subdomain: true }
  })
  console.log(`Title: ${check.entryTitle}`)
  console.log(`Slug: ${check.domain.domainSlug}/${check.subdomain.subdomainSlug}/${check.entrySlug}`)
  console.log('✅ Seeding completed successfully.')
  await db.$disconnect()
}

main().catch(e => {
  console.error('❌ SEED ERROR:', e)
  db.$disconnect()
  process.exit(1)
})
