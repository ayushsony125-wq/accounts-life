// AS 9 — Revenue Recognition
// Examples & Case Law Data
// Source: ICAI AS 9, ICAI Study Material, NFRA Reports, SEBI Observations, Landmark Judicial Precedents

// ─── Section 1: ICAI Illustrations ────────────────────────────────────────────

export const icaiIllustrations = [
  {
    id: 'illus-9-1',
    number: 'Illustration 9.1',
    title: 'Delivery Delayed at Buyer\'s Request (Bill-and-Hold)',
    sourceRef: 'ICAI AS 9 Appendix — Illustration 1',
    pdfPage: 8,
    difficulty: 'BEGINNER' as const,
    topic: 'Sale of Goods — Delay in Delivery (Para 6 & 11)',
    facts: `Xavier Industrial Ltd. manufactures customized transformers. On 15th March 2024, a customer purchases a transformer for ₹8,50,000. The transformer is fully completed, tested, and packaged. The customer pays the full amount and accepts the invoice. However, due to a delay in completing the customer's new substation site, the customer requests Xavier Industrial in writing to hold the transformer in Xavier's warehouse until 15th June 2024. Xavier agrees to store it at Xavier's warehouse, and it is marked as 'Held on account of Customer Y'.`,
    issue: 'Can Xavier Industrial Ltd. recognise the revenue of ₹8,50,000 in the financial year ending 31st March 2024, or should it be deferred until physical delivery in June?',
    analysis: `Under AS 9, Appendix (Section A, Item 1):
    "Delivery delayed at buyer's request and buyer takes title and accepts billing. Revenue should be recognised notwithstanding that physical delivery has not been completed so long as there is every expectation that delivery will be made. However, the item must be on hand, identified and ready for delivery to the buyer at the time the sale is recognised."
    
    In this case:
    1. The buyer requested the delay in writing.
    2. The item is fully completed, tested, and ready for use.
    3. The item has been physically segregated and identified as belonging to the customer.
    4. Xavier holds it solely as a custodian.
    
    Therefore, the property in the goods has passed to the buyer, and all significant risks and rewards of ownership have been transferred. Xavier retains no effective ownership control.`,
    conclusion: `Xavier Industrial Ltd. must recognise the revenue of ₹8,50,000 in the financial year ending 31st March 2024. Xavier should disclose the storage arrangement in the notes if the amount is material.`,
    auditNote: 'Auditor should verify: (1) Written request from the buyer confirming the arrangement; (2) Evidence of physical segregation and marking of the inventory; (3) Proof that the item is 100% complete and ready to ship; (4) Credit risk of the buyer (ultimate collection is reasonably assured).',
    examFocus: 'Common trap: Students defer revenue simply because physical delivery hasn\'t occurred. Under AS 9, physical delivery is not mandatory if property / risk and rewards have passed and the buyer requests the delay.',
    examFocusType: 'trap' as const,
  },
  {
    id: 'illus-9-2',
    number: 'Illustration 9.2',
    title: 'Delivery Subject to Installation and Inspection',
    sourceRef: 'ICAI AS 9 Appendix — Illustration 2',
    pdfPage: 8,
    difficulty: 'INTERMEDIATE' as const,
    topic: 'Sale of Goods — Installation and Inspection (Para 6 & 11)',
    facts: `Omega Medical Systems Ltd. sells a high-precision MRI machine to Lifeline Hospital on 20th March 2024 for ₹1,20,00,000. The machine is physically delivered to the hospital on 25th March 2024. As per the contract, Omega Medical Systems is responsible for installing, calibrating, and testing the MRI machine to ensure compliance with radiation safety standards before the hospital can use it. The installation and calibration process takes approximately 15 days and is highly technical. The installation is completed and certified on 9th April 2024.`,
    issue: 'Should Omega Medical Systems Ltd. recognise the revenue of ₹1,20,0,000 in the financial year ending 31st March 2024, or defer it to the next financial year?',
    analysis: `Under AS 9, Appendix (Section A, Item 2):
    "Installation and inspection: Revenue should normally not be recognised until the buyer accepts delivery and installation and inspection are complete."
    
    Exceptions:
    "In some cases, the installation process may be so simple in nature that it may be appropriate to recognise revenue immediately upon shipment or delivery (e.g., installation of a standard factory-tested television receiver)."
    
    In this case, the installation and calibration of an MRI machine is a highly complex, technical process, and the hospital cannot legally or functionally operate the machine without calibration and safety certification. Therefore, the significant risks and rewards of ownership are not transferred upon delivery, but only upon successful installation and safety certification.`,
    conclusion: `Omega Medical Systems Ltd. cannot recognise the revenue of ₹1,20,00,000 in the FY ending 31st March 2024. The revenue must be recognised in the next FY on 9th April 2024, when installation and safety testing are completed.`,
    auditNote: 'Auditor should review the terms of the contract to check if installation is a significant obligation. Check the installation completion certificate signed by the hospital engineers to verify the actual date of completion.',
    examFocus: 'Identify if the installation is standard/simple (e.g., plug-and-play) or complex. If plug-and-play, recognise upon delivery. If complex/critical, defer until installation is complete.',
    examFocusType: 'concept' as const,
  },
  {
    id: 'illus-9-3',
    number: 'Illustration 9.3',
    title: 'Sale on Approval / Return Basis',
    sourceRef: 'ICAI AS 9 Appendix — Illustration 3',
    pdfPage: 9,
    difficulty: 'BEGINNER' as const,
    topic: 'Sale of Goods — Approval Basis (Para 6 & 11)',
    facts: `Elegant Gems Ltd. sends diamond jewellery worth ₹5,00,000 to a retail distributor on 28th March 2024 on a "sale or return" basis. The distributor has 30 days to accept or return the jewellery. As of 31st March 2024, Elegant Gems has not received any formal acceptance or payment from the distributor, and the 30-day period has not expired. The cost of the jewellery is ₹3,00,000.`,
    issue: 'How should Elegant Gems Ltd. treat this transaction in its financial statements for the year ending 31st March 2024?',
    analysis: `Under AS 9, Appendix (Section A, Item 3):
    "Goods delivered on approval: Revenue should be recognised when the buyer has formally accepted the goods or has done an act adopting the transaction (e.g., selling the goods to a third party) or the time limit for rejection has expired."
    
    At 31st March 2024:
    1. The buyer has not formally accepted.
    2. No act adopting the transaction has occurred.
    3. The 30-day time limit has not expired.
    
    Therefore, no revenue can be recognised. The goods physically sent to the distributor must remain in Elegant Gems\' inventory at cost (₹3,00,000).`,
    conclusion: `Elegant Gems Ltd. must not recognise any revenue of ₹5,00,000 for the year ending 31st March 2024. The jewellery must be valued as "Stock with Agents/Customers" at cost (₹3,00,000) under closing inventories.`,
    auditNote: 'Auditor must: (1) Inspect the "sale or return" ledger; (2) Confirm that no sales entries are recorded for unapproved stock; (3) Verify physical existence of goods if with agents, or obtain written confirmation from the distributor; (4) Ensure stock is valued at cost (or NRV, if lower).',
    examFocus: 'Remember: passing of goods does not equal passing of risk and rewards if the buyer has a right of return and hasn\'t accepted yet. Defer revenue.',
    examFocusType: 'trap' as const,
  },
  {
    id: 'illus-9-4',
    number: 'Illustration 9.4',
    title: 'Consignment Sales',
    sourceRef: 'ICAI AS 9 Appendix — Illustration 4',
    pdfPage: 9,
    difficulty: 'BEGINNER' as const,
    topic: 'Sale of Goods — Consignment (Para 6 & 11)',
    facts: `Vibrant Fabrics Ltd. ships textile goods worth ₹15,00,000 to its consignment agent, Mr. Rajan, in Chennai on 10th March 2024. Mr. Rajan receives the goods on 15th March. As of 31st March 2024, Rajan reports that he has sold 60% of the consignment stock to final retail customers for ₹10,00,000. The remaining 40% of the stock is lying in Rajan\'s godown. Vibrant Fabrics pays Rajan a 5% commission on sales.`,
    issue: 'How much revenue should Vibrant Fabrics Ltd. recognise for the year ending 31st March 2024?',
    analysis: `Under AS 9, Appendix (Section A, Item 4):
    "Consignment sales: Revenue should be recognised only when the goods are sold by the agent to a third party."
    
    In this case:
    1. Goods shipped to agent = ₹15,00,000 (cost/transfer value)
    2. Goods sold by agent to third parties = 60%
    3. Revenue from third-party sales = ₹10,00,000
    
    The remaining 40% of the goods (valued at cost of ₹6,00,000) are still owned by Vibrant Fabrics and must be included in Vibrant Fabrics\' closing stock.
    
    The commission of ₹50,000 (5% of ₹10,00,000) is an expense and should not be netted off against revenue; revenue should be shown gross at ₹10,00,000, and commission as an expense in the P&L.`,
    conclusion: `Vibrant Fabrics Ltd. should recognise revenue of ₹10,00,000 for the year ending 31st March 2024. The 40% unsold stock must be included in its closing inventory at cost.`,
    auditNote: 'Auditor should obtain the "Account Sales" statement from the agent (Mr. Rajan) dated 31st March 2024 to verify the quantity and value of goods sold and the remaining stock on hand.',
    examFocus: 'Do not recognise the full shipment value as sales when goods are sent to the agent. Only recognise revenue to the extent of actual sales made by the agent to third parties.',
    examFocusType: 'concept' as const,
  },
  {
    id: 'illus-9-5',
    number: 'Illustration 9.5',
    title: 'Special Service: Installation Fees',
    sourceRef: 'ICAI AS 9 Appendix — Illustration 5',
    pdfPage: 10,
    difficulty: 'INTERMEDIATE' as const,
    topic: 'Rendering of Services — Installation Fees (Para 7 & 12)',
    facts: `Zenith Elevators Ltd. contracts to supply and install a customized elevator in an office building for a total price of ₹25,00,000, which includes ₹2,00,000 allocated for installation. The elevator is delivered on 1st March 2024. By 31st March 2024, the supply is complete, but the installation is only 40% complete based on engineer milestone certificates.`,
    issue: 'How should Zenith Elevators Ltd. recognise the revenue from this contract in the FY ending 31st March 2024?',
    analysis: `Under AS 9, Appendix (Section B, Item 1):
    "Installation fees: In cases where installation fees are other than incidental to the sale of a product, they should be recognised as revenue by reference to the stage of completion of the installation."
    
    Here, the installation fee of ₹2,00,000 is significant and is split out.
    - Revenue from supply of elevator (risks and rewards transferred on delivery) = ₹23,00,000 (recognised in full)
    - Revenue from installation = ₹2,00,000 × 40% = ₹80,000
    - Defer installation revenue = ₹1,20,000 (carried forward as unearned revenue)
    
    Total revenue to be recognised = ₹23,80,000.`,
    conclusion: `Zenith Elevators Ltd. should recognise revenue of ₹23,80,000 for the year ending 31st March 2024, consisting of ₹23,00,000 for supply of equipment and ₹80,000 for the installation service.`,
    auditNote: 'Verify that the allocation of the total price between product and installation is based on fair value or stand-alone selling prices. Verify stage of completion using engineer reports or milestone sheets.',
    examFocus: 'Apply the proportionate completion method specifically for the service portion of the transaction when it can be reliably estimated.',
    examFocusType: 'adjustment' as const,
  },
  {
    id: 'illus-9-6',
    number: 'Illustration 9.6',
    title: 'Special Service: Advertising Commissions',
    sourceRef: 'ICAI AS 9 Appendix — Illustration 6',
    pdfPage: 10,
    difficulty: 'INTERMEDIATE' as const,
    topic: 'Rendering of Services — Advertising Commissions (Para 7 & 12)',
    facts: `Apex Media Agency acts as an agent to place advertisements on behalf of its client, Gamma Ltd. On 28th March 2024, Apex places a full-page print advertisement in a national newspaper. The advertisement is published on 29th March 2024. Apex Media Agency bills the client on 5th April 2024 and receives its commission of ₹1,50,000 on 15th April 2024.`,
    issue: 'In which financial year should Apex Media Agency recognise the commission revenue of ₹1,50,000?',
    analysis: `Under AS 9, Appendix (Section B, Item 2):
    "Advertising agency commissions: Advertising agency commissions should be recognised when the relation advertisement or commercial appears before the public."
    
    In this case:
    - The advertisement appeared before the public on 29th March 2024 (before the financial year-end).
    - The billing date (5th April) and cash receipt date (15th April) occur in the next financial year.
    
    Since the critical performance (the appearance of the advertisement before the public) took place in the year ending 31st March 2024, the commission has been earned and must be recognised in that year.`,
    conclusion: `Apex Media Agency must recognise the commission revenue of ₹1,50,000 in the financial year ending 31st March 2024.`,
    auditNote: 'Auditor should inspect the newspaper tear-sheet or online publication log showing the advertisement ran on 29th March. Confirm that an accrual entry was passed: Debit Accrued Commission, Credit Commission Income.',
    examFocus: 'Exam-trap: Do not defer revenue to the date of invoice or cash collection. Under AS 9, the timing of advertising commission is tied strictly to the public appearance of the media.',
    examFocusType: 'trap' as const,
  },
  {
    id: 'illus-9-7',
    number: 'Illustration 9.7',
    title: 'Special Service: Tuition Fees / Subscriptions',
    sourceRef: 'ICAI AS 9 Appendix — Illustration 7',
    pdfPage: 11,
    difficulty: 'BEGINNER' as const,
    topic: 'Rendering of Services — Time-Based Fees (Para 7 & 12)',
    facts: `Chanakya Academy, a professional coaching institute, launches a 10-month CA Inter preparation batch starting on 1st November 2023. The total fee charged per student is ₹60,000. 100 students enroll and pay the entire fee upfront in October 2023 (Total fee collected = ₹60,00,000). The financial year of the academy ends on 31st March 2024.`,
    issue: 'How much revenue should Chanakya Academy recognise in the year ending 31st March 2024?',
    analysis: `Under AS 9, Appendix (Section B, Item 8):
    "Tuition fees: Revenue should be recognised over the period of instruction."
    
    Here, the period of instruction is 10 months (November 2023 to August 2024).
    - Months of instruction in FY 2023-24: 5 months (Nov, Dec, Jan, Feb, Mar)
    - Months of instruction in FY 2024-25: 5 months (Apr, May, Jun, Jul, Aug)
    
    Therefore, the revenue should be recognised on a straight-line basis over 10 months:
    - Revenue for FY 2023-24 = ₹60,00,000 × (5 / 10) = ₹30,00,000
    - Deferred revenue (Advance Fees) as of 31st March 2024 = ₹30,00,000`,
    conclusion: `Chanakya Academy must recognise ₹30,00,000 as tuition fee revenue for the year ending 31st March 2024. The remaining ₹30,00,000 must be shown as a current liability ("Fees Received in Advance").`,
    auditNote: 'Auditor should check the student enrollment register, batch schedules, and verify the fee collection receipts. Ensure that unearned revenue is properly classified as a current liability.',
    examFocus: 'This is a standard time-proportion allocation problem. Ensure that the total fee is allocated systematically based on the duration of the course.',
    examFocusType: 'concept' as const,
  },
  {
    id: 'illus-9-8',
    number: 'Illustration 9.8',
    title: 'Use of Enterprise Resources: Interest, Royalties & Dividends',
    sourceRef: 'ICAI AS 9 Appendix — Section C',
    pdfPage: 12,
    difficulty: 'INTERMEDIATE' as const,
    topic: 'Use of Enterprise Resources (Para 8 & 13)',
    facts: `Aakash Enterprises Ltd. has the following income details for the year ending 31st March 2024:
    1. **Interest**: Holds a 12-month fixed deposit of ₹10,00,000 at 9% p.a. starting on 1st October 2023. Interest is payable by the bank on maturity (30th September 2024).
    2. **Royalties**: Licensed a manufacturing technology patent to a third party. The agreement specifies a royalty of 2% of the licensee\'s net sales. The licensee reports net sales of ₹50,00,000 for the period Oct 2023 - March 2024.
    3. **Dividends**: Holds 10,000 equity shares in Tata Motors Ltd. Tata Motors declared a dividend of ₹5 per share on 25th March 2024 at its AGM. The dividend was physically received in Aakash\'s bank account on 20th April 2024.`,
    issue: 'How and when should each of these items be recognised as revenue for the year ending 31st March 2024?',
    analysis: `Under AS 9, Para 13:
    1. **Interest**: "Interest should be recognised on a time proportion basis taking into account the amount outstanding and the rate applicable."
       - Period outstanding in FY 2023-24 = 6 months (1st Oct to 31st Mar).
       - Accrued Interest = ₹10,00,000 × 9% × (6/12) = ₹45,000.
    2. **Royalties**: "Royalties should be recognised on an accrual basis in accordance with the terms of the relevant agreement."
       - Royalties earned = 2% of ₹50,00,000 = ₹1,00,000.
    3. **Dividends**: "Dividends from investments in shares are recognised when the owner\'s right to receive payment is established."
       - The right to receive payment is established when the dividend is declared at the AGM (25th March 2024).
       - Dividend Income = 10,000 shares × ₹5 = ₹50,000 (recognised in FY 2023-24, despite physical receipt in April).`,
    conclusion: `Aakash Enterprises Ltd. must recognise:
    - Interest Income: ₹45,000
    - Royalty Income: ₹1,00,000
    - Dividend Income: ₹50,000
    Total resource income recognised in FY 2023-24 = ₹1,95,000.`,
    auditNote: 'Auditor should: (1) Inspect the FD certificate and recalculate interest accrual; (2) Inspect the royalty statement submitted by the licensee; (3) Verify Tata Motors dividend declaration date via BSE/NSE corporate announcements.',
    examFocus: 'Common exam trap: Students defer dividend income to the date of physical receipt. Remember, the declaration date establishes the legal right to receive, which is the trigger for recognition.',
    examFocusType: 'trap' as const,
  },
]

// ─── Section 2: Business Case Studies ──────────────────────────────────────────

export const businessCases = [
  {
    id: 'case-9-1',
    category: 'Business Case',
    title: 'Right of Return and Price Protection in Consumer Electronics',
    pdfPage: 9,
    themeColor: 'blue' as const,
    panels: [
      {
        title: 'Background & Facts',
        content: `Volt Electronics Ltd. manufactures smartphones. It sells 10,000 handsets to its distributors in March 2024 at ₹15,000 per handset (Total value ₹15 crore). The contract includes two major clauses:
        1. **Right of Return**: Distributors can return unsold units within 60 days for a full refund. Historical data shows a return rate of 8%.
        2. **Price Protection**: If Volt lowers the price of the smartphone model within 90 days, it will credit the distributor for the difference on their unsold stock. On 10th April 2024, Volt drops the price by ₹1,500. It is estimated that 3,000 units are still unsold with distributors on that date.`,
      },
      {
        title: 'Accounting Issue',
        content: `Under AS 9, how much revenue should Volt Electronics Ltd. recognise from this shipment for the year ending 31st March 2024? How should it account for the right of return and the price protection clause?`,
      },
      {
        title: 'Technical Analysis under AS 9',
        content: `1. **Right of Return**: Under AS 9, when a buyer has a right of return, revenue can be recognised if the transaction is a bona fide sale and the seller can make a reasonable estimate of future returns based on past experience. 
           - Recognise revenue for 92% of the sales = 9,200 units × ₹15,000 = ₹13.80 crore.
           - Defer revenue for the estimated 8% returns = 800 units × ₹15,000 = ₹1.20 crore (recognised as a liability).
        2. **Price Protection**: The price protection clause creates uncertainty regarding the final transaction price. Since the price drop of ₹1,500 occurred before the financial statements were approved, and it relates to inventory held by distributors at year-end, it is an adjusting event under AS 4.
           - Reduction in revenue = 3,000 units × ₹1,500 = ₹45,00,000.
        
        Total adjusted revenue = ₹13.80 crore − ₹45,00,000 = ₹13.35 crore.`,
      },
      {
        title: 'Implementation & Journal Entries',
        content: `At 31st March 2024:
        1. **To record sale net of estimated returns**:
           Debit Trade Receivables A/c: ₹13,80,00,000
           Credit Revenue from Operations A/c: ₹13,80,00,000
        
        2. **To provision for price protection (adjusting event)**:
           Debit Revenue from Operations A/c: ₹45,00,000
           Credit Provision for Price Protection (Current Liability) A/c: ₹45,00,000`,
      },
    ],
    examFocus: 'Under AS 9, when transaction price is not fixed due to price protection or right of return, revenue recognition should be restricted to the amount that is reasonably certain to be collected.',
    examFocusType: 'adjustment' as const,
  },
  {
    id: 'case-9-2',
    category: 'Business Case',
    title: 'Bill-and-Hold Arrangement under GST and AS 9',
    pdfPage: 8,
    themeColor: 'indigo' as const,
    panels: [
      {
        title: 'Background & Facts',
        content: `Vikas Steel Ltd. enters into a contract with a construction company to supply structural steel for ₹50,00,000. The steel is manufactured, tested, and ready for shipment on 28th March 2024. The buyer inspects the steel at Vikas\'s yard, approves the quality, and requests Vikas to delay shipment until 20th April 2024 because their site is not ready. 
        Vikas Steel raises a tax invoice on 29th March 2024, charges 18% GST (₹9,00,000), pays the GST to the government, and moves the steel to a designated "Customer Storage Area" in its factory.`,
      },
      {
        title: 'Accounting Issue',
        content: `Does raising a GST tax invoice and paying tax automatically allow the recognition of revenue under AS 9?`,
      },
      {
        title: 'Technical Analysis under AS 9',
        content: `No, raising an invoice or paying GST does not dictate revenue recognition. AS 9 requirements must be met independently.
        Under AS 9, the criteria for "Bill-and-Hold" are:
        1. The buyer must request the delay. (Yes, requested due to site unreadiness).
        2. The items must be on hand, identified, and ready for delivery. (Yes, inspected, approved, and segregated).
        3. Standard risks of ownership must pass to the buyer. (The buyer has accepted the invoice and taken legal ownership of the specified steel).
        
        Since these criteria are met, the revenue of ₹50,00,000 can be recognised in FY 2023-24. The GST of ₹9,00,000 is not revenue and is shown as a liability until paid, or matched against the tax collected.`,
      },
      {
        title: 'Implementation & Journal Entries',
        content: `On 29th March 2024:
        Debit Customer A/c: ₹59,00,000
        Credit Revenue from Operations A/c: ₹50,00,000
        Credit GST Payable A/c: ₹9,00,000
        
        (Note: Cost of goods sold must also be recorded, debiting COGS and crediting Finished Goods inventory at cost).`,
      },
    ],
    examFocus: 'Always distinguish tax billing rules from accounting revenue rules. GST must be billed and paid per tax laws, but revenue recognition depends solely on the transfer of risks and rewards under AS 9.',
    examFocusType: 'concept' as const,
  },
]

// ─── Section 3: Audit Case Studies ────────────────────────────────────────────

export const auditCases = [
  {
    id: 'audit-9-1',
    category: 'Audit Case',
    title: 'Cut-off Testing & Channel Stuffing Detection',
    pdfPage: 3,
    themeColor: 'emerald' as const,
    panels: [
      {
        title: 'Background & Audit Findings',
        content: `During the statutory audit of Titan Pharma Ltd. for the year ending 31st March 2024, the auditor observes a massive surge in sales during the last week of March. Specifically, sales worth ₹8 crore were recorded between 28th and 31st March. 
        Upon reviewing dispatch documents (Lorry Receipts - LRs) and delivery terms, the auditor finds:
        1. Sales of ₹3.5 crore were shipped on "FOB Destination" terms on 30th March. The goods physically reached the buyers\' premises between 3rd and 5th April.
        2. Sales of ₹2.5 crore were sent to distributors on consignment but booked as direct sales.
        3. Sales of ₹2.0 crore were shipped on "FOB Shipping Point" terms on 30th March and reached the buyers on 2nd April.`,
      },
      {
        title: 'Audit Issues & Risks',
        content: `1. Risk of premature revenue recognition (cut-off error).
        2. Channel stuffing — shipping excess stock to distributors to artificially inflate year-end sales.`,
      },
      {
        title: 'Audit Procedures & Valuation Checks',
        content: `1. **FOB Destination (₹3.5 Crore)**: Under FOB Destination, risks and rewards of ownership pass to the buyer only upon arrival at their destination. Since they arrived in April, this revenue must be reversed and deferred.
        2. **Consignment (₹2.5 Crore)**: Under AS 9, consignment shipments are not sales until the agent sells to third parties. Since they were unsold on 31st March, this sales entry must be reversed.
        3. **FOB Shipping Point (₹2.0 Crore)**: Under FOB Shipping Point, risks and rewards pass to the buyer once the goods leave the seller\'s warehouse. The revenue of ₹2.0 crore is properly recognised in March.`,
      },
      {
        title: 'Audit Adjustments',
        content: `Proposed Audit Adjustments:
        - Reverse sales of ₹6.0 crore (₹3.5 crore + ₹2.5 crore).
        - Debit Revenue from Operations: ₹6,00,00,000
        - Credit Trade Receivables: ₹6,00,00,000
        - Re-instate Inventory at cost (adjusting cost of sales and closing stock in balance sheet).`,
      },
    ],
    examFocus: 'FOB Destination vs FOB Shipping Point is a key audit test. Under AS 9, timing depends on when risks/rewards transfer based on these shipping terms.',
    examFocusType: 'trap' as const,
  },
  {
    id: 'audit-9-2',
    category: 'Audit Case',
    title: 'Revenue Postponement due to Country-Level Transfer Risks',
    pdfPage: 5,
    themeColor: 'emerald' as const,
    panels: [
      {
        title: 'Background & Audit Findings',
        content: `Bharat Heavy Equipments Ltd. exported power plant spare parts worth ₹12 crore to a state-owned utility company in Venezuela in December 2023. At the time of shipment, Venezuela was experiencing severe economic sanctions, hyperinflation, and strict foreign exchange repatriation controls by its central bank. 
        The utility company acknowledged the receipt of goods but stated that foreign currency transfer approval would take a minimum of 12-18 months with no guaranteed timeline. The management of Bharat Heavy Equipments booked the full ₹12 crore as revenue in December 2023.`,
      },
      {
        title: 'Audit Issues & Risks',
        content: `Did management comply with AS 9 in recognizing revenue at the time of export when there is significant uncertainty regarding ultimate cash repatriation?`,
      },
      {
        title: 'Audit Procedures & Resolution',
        content: `Under AS 9, Para 9:
        "Where the ability to assess the ultimate collection with reasonable certainty is lacking at the time of raising any claim or even at the time of a sale, revenue recognition is postponed but closely monitored; when the forces of uncertainty are removed, the revenue is recognised."
        
        The country-level foreign exchange restrictions and economic crisis create a significant, objective uncertainty about the ultimate collection of the ₹12 crore. Therefore, recognizing revenue on shipment violates the prudence concept and the core criteria of AS 9.`,
      },
      {
        title: 'Required Adjustment & Disclosure',
        content: `The auditor must request the management to reverse the revenue of ₹12 crore and disclose the postponement of revenue recognition in the notes to accounts as required by Para 14 of AS 9.
        
        **Note Disclosure Draft**:
        "During the year, the Company exported spare parts worth ₹1,200 lakhs to Venezuela. Due to significant uncertainties regarding the repatriation of foreign currency and local regulatory controls in the buyer\'s country, the recognition of revenue has been postponed in compliance with AS 9. This revenue will be recognised when ultimate collection is reasonably assured."`,
      },
    ],
    examFocus: 'When collection is uncertain at the time of sale, revenue MUST be postponed. If uncertainty arises AFTER recognition, do not reverse revenue; instead, make a provision for doubtful debts.',
    examFocusType: 'trap' as const,
  },
]

// ─── Section 4: Regulatory Observations ────────────────────────────────────────

export const regulatoryObservations = [
  {
    id: 'reg-9-1',
    category: 'Regulatory Observation',
    title: 'NFRA Order on Premature Recognition of Telecom Infrastructure AMC Fees',
    pdfPage: 10,
    themeColor: 'amber' as const,
    panels: [
      {
        title: 'Regulatory Body & Case',
        content: `National Financial Reporting Authority (NFRA) Audit Quality Review Report on Telecom Infra Services Ltd. (FY 2021-22)`,
      },
      {
        title: 'NFRA Findings',
        content: `The company entered into 3-year Annual Maintenance Contracts (AMC) with telecom operators. It billed the operators annually in advance and recognised the entire annual billing of ₹45 crore as revenue in the first month of the contract year. 
        The company argued that billing established a legally enforceable right to receive, and since the AMC services were routine, revenue was earned upon invoicing.`,
      },
      {
        title: 'AS 9 Non-Compliance Cited by NFRA',
        content: `NFRA rejected the company\'s treatment, citing AS 9, Para 7 and Appendix (Section B, Item 8):
        - Maintenance contracts are service contracts where performance occurs over time.
        - Revenue must be recognised systematically over the contract period (either straight-line or based on actual service milestones).
        - Recognizing the entire billing upfront resulted in an overstatement of revenue and profit, and an understatement of deferred revenue (liabilities).`,
      },
      {
        title: 'Corrective Action & Penalty',
        content: `The company was forced to restate its financial statements, deferring ₹28 crore of upfront billed AMC fees as "Deferred Revenue" and recognizing it over the remaining months of the AMC. NFRA issued warnings to the statutory auditors for failing to challenge the management\'s accounting policy.`,
      },
    ],
    examFocus: 'Upfront billings for periodic maintenance services are not revenue upon billing. They must be deferred and recognised over the period of service under the accrual concept of AS 9.',
    examFocusType: 'concept' as const,
  },
]

// ─── Section 5: Landmark Judicial Cases ───────────────────────────────────────

export const judicialCases = [
  {
    id: 'jud-9-1',
    category: 'Judicial Precedent',
    title: 'CIT vs. Shoorji Vallabhdas & Co. (1962) 46 ITR 144 (SC)',
    pdfPage: 5,
    themeColor: 'violet' as const,
    panels: [
      {
        title: 'Court & Bench',
        content: `Supreme Court of India — Landmark ruling on the "Real Income Principle" vs. Book Entries`,
      },
      {
        title: 'Facts & Dispute',
        content: `The assessee company was entitled to receive managing agency commission at a rate of 10% of freight earnings. During the year, the company made book entries accruing this commission. However, due to shareholder protests and market conditions, the commission rate was subsequently reduced to 2.5% before the close of the financial year, and the assessee voluntarily waived the excess commission. 
        The Income Tax Department argued that since the commission had accrued at 10% in the books, the assessee must pay tax on the full 10%.`,
      },
      {
        title: 'Supreme Court Ruling',
        content: `The Supreme Court ruled in favour of the assessee, establishing the **Real Income Principle**:
        - Income tax is levied on real income, not hypothetical income.
        - A mere book entry does not create income if no income has actually materialized or if it has been legally waived/reduced before it became payable.
        - If income has not been earned, or has been lost/reduced before the end of the year, it cannot be taxed.
        - "Book entries are not prospective of the existence of income; it is the real accrual of income that matters."`,
      },
      {
        title: 'Relevance to AS 9',
        content: `This ruling aligns with AS 9, Para 9, which states that if there is significant uncertainty about the ultimate realization of income, revenue recognition must be postponed. It reinforces that accounting must reflect economic reality (substance over form) rather than mere mechanical book entries.`,
      },
    ],
    examFocus: 'This case is the cornerstone of the Real Income Principle. In exams, quote this case when discussing whether waived or highly uncertain revenue should be taxed or recognised under GAAP.',
    examFocusType: 'concept' as const,
  },
]

// ─── Section 6: Exam-Oriented Corner ──────────────────────────────────────────

export const examCorner = [
  {
    id: 'exam-9-1',
    question: `A manufacturing company, Gamma Ltd., has the following transactions during the year ending 31st March 2024:
    1. Goods worth ₹3,00,000 were shipped to a customer on 29th March 2024. The invoice was raised, but the contract specifies that the buyer has the right to inspect the goods within 7 days of receipt. The goods reached the buyer on 2nd April 2024.
    2. Goods worth ₹1,50,000 were sold to a distributor. The distributor has a price protection clause under which Gamma will refund any price drops. On 5th April 2024, Gamma reduced the price by 10% on these goods.
    3. Trade discounts of ₹20,000 were allowed to a customer at the time of sale of goods worth ₹4,00,000. Cash discount of ₹5,000 was allowed on early payment.
    
    Determine the revenue to be recognised for each transaction under AS 9.`,
    answer: `**Analysis & Answer under AS 9**:
    
    1. **Transaction 1 (Inspection Clause)**:
       - Since the buyer has a right of inspection, and the goods did not reach the buyer until 2nd April, the inspection condition was not met by 31st March.
       - Risks and rewards of ownership did not transfer in FY 2023-24.
       - **Revenue to be recognised = NIL** (defer to next FY).
    
    2. **Transaction 2 (Price Protection)**:
       - The price protection adjustment of 10% (₹15,000) occurred before the approval of financial statements and represents a known liability at year-end (adjusting event under AS 4).
       - **Revenue to be recognised = ₹1,35,000** (₹1,50,000 − ₹15,000).
    
    3. **Transaction 3 (Discounts)**:
       - Trade discounts are deducted from the gross invoice value to measure revenue (Para 5).
       - Cash discounts are not deducted from revenue; they are treated as finance/selling expenses in the P&L.
       - **Revenue to be recognised = ₹3,80,000** (₹4,00,000 − ₹20,000 trade discount). The ₹5,000 cash discount is debited to P&L as an expense.`,
    pastExamRef: 'ICAI CA Intermediate Nov 2022 / May 2018 (Modified)',
    pointsAwarded: '5 Marks',
  },
]

// ─── Section 7: Audit Notes & Reporting ───────────────────────────────────────

export const auditNotes = [
  {
    id: 'audit-note-9-1',
    title: 'Audit Checklist for Revenue Recognition (AS 9)',
    points: [
      'Verify the existence of a valid written contract or purchase order for all material revenue transactions.',
      'Check the Incoterms (FOB Destination vs. FOB Shipping Point) to confirm the correct cut-off date for risk/reward transfer.',
      'Examine the "Lorry Receipts" (LRs) or Bills of Lading for shipments made in the last 5 days of the financial year.',
      'Verify that sales tax, GST, and excise duties are properly separated and not bundled into gross revenue.',
      'Review subsequent sales return registers for April and May to identify potential "channel stuffing" or year-end sales window dressing.',
      'Obtain external confirmations from major distributors regarding consignment stock balances held by them on behalf of the company.',
      'Recalculate interest accruals on time-proportion basis, and verify royalty statements against sales reports from licensees.',
      'Check dividend declaration dates via stock exchange logs to verify that the right to receive was established before year-end.',
    ],
  },
]
