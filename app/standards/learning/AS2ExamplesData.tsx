// AS 2 — Valuation of Inventories
// Examples & Case Law Data
// Source: ICAI AS 2 (Revised 1999), ICAI Study Material, NFRA Reports, SEBI Observations

// ─── Section 1: ICAI Illustrations ────────────────────────────────────────────
// Numbered as Illustration 2.1, 2.2 … per ICAI convention (AS number prefix)

export const icaiIllustrations = [
  {
    id: 'illus-2-1',
    number: 'Illustration 2.1',
    title: 'Cost of Purchase — Import of Raw Materials',
    sourceRef: 'ICAI AS 2 Study Material — Illustration 1',
    pdfPage: 10,
    difficulty: 'BEGINNER' as const,
    topic: 'Cost of Purchase (Para 5)',
    facts: `Alpha Manufacturing Ltd. imports 500 units of chemical compound from Germany. The transaction details are as follows:
    
    Invoice price (CIF):                ₹10,00,000
    Basic customs duty (10%):           ₹1,00,000
    Social welfare surcharge (10% on BD): ₹10,000
    IGST on imports (18%):              ₹1,98,000
    Freight from port to factory:       ₹25,000
    Insurance during transit:           ₹8,000
    Trade discount received:            ₹50,000
    Cash discount for early payment:    ₹20,000
    
    Alpha Manufacturing is not eligible for IGST credit (final product is exempt). The company received all 500 units in good condition.`,
    issue: 'Calculate the cost of purchase per unit of chemical compound under AS 2, Para 5. Determine which items are included and excluded from the cost of purchase.',
    analysis: `Under AS 2, Para 5: Cost of Purchase = Invoice Price + Duties/Taxes + Freight + Direct Acquisition Costs − Trade Discounts − Rebates − Duty Drawbacks

    Included in cost of purchase:
    Invoice price (CIF):                ₹10,00,000  [Direct cost]
    Basic customs duty:                  ₹1,00,000  [Non-refundable duty]
    Social welfare surcharge:               ₹10,000  [Non-refundable]
    IGST on imports:                     ₹1,98,000  [Non-refundable — no credit eligible]
    Freight from port to factory:           ₹25,000  [Direct inward freight]
    Insurance during transit:               ₹8,000  [Direct acquisition cost]
    Less: Trade discount:                 (₹50,000) [Deducted per Para 5]
    
    Excluded from cost of purchase:
    Cash discount (₹20,000) → Not deducted; credited to P&L as Discount Received
    
    Total Cost of Purchase:             ₹12,91,000
    Cost per unit = ₹12,91,000 ÷ 500 = ₹2,582 per unit`,
    conclusion: `Cost of Purchase per unit = ₹2,582.

    Key rules applied:
    ✓ Trade discount (₹50,000) deducted — reduces cost of purchase
    ✗ Cash discount (₹20,000) NOT deducted — credited to P&L separately
    ✓ Non-refundable duties and taxes included
    ✓ Inward freight and insurance included
    
    If IGST were creditable (i.e., Alpha were eligible for input tax credit), the ₹1,98,000 IGST would be excluded from cost as it would be recovered via ITC.`,
    auditNote: 'Auditor should verify: (1) Trade vs cash discount classification; (2) IGST credit eligibility; (3) Whether freight includes both inward (included) and outward (excluded) freight; (4) Whether duty drawbacks have been deducted from cost.',
    examFocus: 'Common exam trap: students include cash discount in the deduction list. Only trade discounts, rebates, and duty drawbacks are deducted — NOT cash discounts.',
    examFocusType: 'trap' as const,
  },
  {
    id: 'illus-2-2',
    number: 'Illustration 2.2',
    title: 'Cost of Conversion — Fixed Overhead Absorption at Normal Capacity',
    sourceRef: 'ICAI AS 2 Study Material — Illustration 2',
    pdfPage: 11,
    difficulty: 'INTERMEDIATE' as const,
    topic: 'Cost of Conversion — Normal Capacity (Para 6)',
    facts: `Beta Steel Ltd. manufactures steel rods. The following data is available for March 2024:

    Normal production capacity:         12,000 tonnes/month
    Actual production in March 2024:    8,000 tonnes
    Reason for lower production:        Labour strike (abnormal)
    
    Cost data for March 2024:
    Raw materials consumed:             ₹80,00,000
    Direct labour:                      ₹16,00,000
    Variable production overhead:       ₹8,00,000
    Fixed production overhead (total):  ₹12,00,000
    Administrative overhead:            ₹5,00,000
    Selling & distribution overhead:    ₹3,00,000
    
    All 8,000 tonnes manufactured are in closing WIP/finished stock.`,
    issue: 'Calculate the total cost of inventory under AS 2 and determine the per-tonne cost. What happens to the unabsorbed fixed overhead?',
    analysis: `Step 1: Fixed overhead absorption rate (at normal capacity)
    Fixed OH rate = ₹12,00,000 ÷ 12,000 tonnes = ₹100 per tonne

    Step 2: Fixed OH absorbed into inventory
    OH absorbed = 8,000 tonnes × ₹100 = ₹8,00,000
    
    Step 3: Unabsorbed fixed OH (period cost — NOT inventoried)
    Unabsorbed = ₹12,00,000 − ₹8,00,000 = ₹4,00,000
    This ₹4,00,000 is charged to P&L as period cost
    
    Step 4: Inventory cost calculation
    Raw materials:                      ₹80,00,000
    Direct labour:                      ₹16,00,000
    Variable production OH:              ₹8,00,000
    Fixed production OH (absorbed):      ₹8,00,000
    ─────────────────────────────────────────────
    Total inventory cost:             ₹1,12,00,000
    Cost per tonne:                    ₹1,400
    
    Excluded from inventory cost:
    Administrative OH: ₹5,00,000 → Period cost (Para 8)
    Selling OH: ₹3,00,000 → Period cost (Para 8)
    Unabsorbed Fixed OH: ₹4,00,000 → Period cost (Para 6)`,
    conclusion: `Total inventory cost = ₹1,12,00,000 | Cost per tonne = ₹1,400

    The unabsorbed fixed overhead of ₹4,00,000 is recognised as a period expense in March 2024. This prevents inventory from being overstated due to abnormal idle capacity caused by the strike.

    Period costs charged to P&L:
    — Unabsorbed fixed OH:              ₹4,00,000
    — Administrative OH:                ₹5,00,000
    — Selling OH:                       ₹3,00,000
    — Total period costs:              ₹12,00,000`,
    auditNote: 'Auditors should verify: (1) Normal capacity is a realistic long-run average, not a theoretical maximum; (2) The basis for fixed OH allocation is documented; (3) Unabsorbed overheads in periods of abnormal idleness are expensed and not deferred; (4) Administrative and selling overheads are not included in inventory valuation.',
    examFocus: 'Exam trap: Students often absorb fixed OH at actual production rate (₹12L ÷ 8,000 = ₹150/tonne), inventorying all ₹12L. AS 2 requires absorption at NORMAL capacity — unabsorbed amounts must be expensed.',
    examFocusType: 'trap' as const,
  },
  {
    id: 'illus-2-3',
    number: 'Illustration 2.3',
    title: 'FIFO Method — Batch-wise Cost Determination',
    sourceRef: 'ICAI AS 2 Study Material — Illustration 3',
    pdfPage: 12,
    difficulty: 'INTERMEDIATE' as const,
    topic: 'FIFO Cost Formula (Para 11)',
    facts: `Gamma Pharma Ltd. uses the FIFO cost formula for raw material "API-X". 
    Transactions for April–June 2024:

    Opening stock (1 April):    200 kg @ ₹500/kg = ₹1,00,000
    Purchase — 5 April:         500 kg @ ₹520/kg = ₹2,60,000
    Purchase — 12 May:          300 kg @ ₹540/kg = ₹1,62,000
    Issue — 20 April:           400 kg (to production)
    Issue — 15 May:             350 kg (to production)
    Issue — 10 June:            150 kg (to production)
    Closing stock (30 June):    100 kg`,
    issue: 'Under the FIFO method, calculate: (a) the cost of raw material issued to production, and (b) the value of closing inventory as at 30 June 2024.',
    analysis: `FIFO: Oldest stock is issued first.

    Issue — 20 April (400 kg):
      200 kg from opening @ ₹500 = ₹1,00,000
      200 kg from 5 April @ ₹520 = ₹1,04,000
      Total cost of issue:        = ₹2,04,000
      Balance after issue: 300 kg @ ₹520 = ₹1,56,000

    Issue — 15 May (350 kg):
      300 kg from 5 April @ ₹520 = ₹1,56,000
      50 kg from 12 May @ ₹540  = ₹27,000
      Total cost of issue:        = ₹1,83,000
      Balance after issue: 250 kg @ ₹540 = ₹1,35,000

    Issue — 10 June (150 kg):
      150 kg from 12 May @ ₹540 = ₹81,000
      Total cost of issue:       = ₹81,000
      Balance after issue: 100 kg @ ₹540 = ₹54,000

    Summary:
    Total issued to production:
      April issue:    ₹2,04,000
      May issue:      ₹1,83,000
      June issue:       ₹81,000
      Total:          ₹4,68,000
      
    Closing stock (100 kg):     ₹54,000 @ ₹540/kg`,
    conclusion: `Under FIFO:
    — Cost of materials issued to production: ₹4,68,000
    — Closing inventory value: ₹54,000 (100 kg @ ₹540/kg — most recent purchase price)

    FIFO characteristics in rising price environment:
    ✓ Closing inventory approximates current replacement cost (most recent prices)
    ✓ Cost of production uses older (lower) prices — may understate cost of goods sold
    ✓ Balance sheet inventory value is closest to current market value`,
    auditNote: 'Verify that FIFO is applied consistently across all similar inventory items. Check that the opening stock and purchase quantities reconcile with physical count records. Ensure no batch is "skipped" in the FIFO sequence.',
    examFocus: 'FIFO closing stock always reflects the MOST RECENT purchase prices. This is a key characteristic tested in exams — when prices are rising, FIFO gives higher closing stock value than Weighted Average.',
    examFocusType: 'concept' as const,
  },
  {
    id: 'illus-2-4',
    number: 'Illustration 2.4',
    title: 'Weighted Average Cost Method',
    sourceRef: 'ICAI AS 2 Study Material — Illustration 4',
    pdfPage: 13,
    difficulty: 'INTERMEDIATE' as const,
    topic: 'Weighted Average Cost Formula (Para 12)',
    facts: `Using the same data as Illustration 2.3 (Gamma Pharma Ltd., API-X):

    Opening stock (1 April):    200 kg @ ₹500/kg = ₹1,00,000
    Purchase — 5 April:         500 kg @ ₹520/kg = ₹2,60,000
    Purchase — 12 May:          300 kg @ ₹540/kg = ₹1,62,000
    Issue — 20 April:           400 kg (to production)
    Issue — 15 May:             350 kg (to production)
    Issue — 10 June:            150 kg (to production)
    Closing stock (30 June):    100 kg
    
    Apply the Weighted Average Cost method (periodic weighted average).`,
    issue: 'Under the Weighted Average Cost method, calculate: (a) the weighted average cost per kg, (b) cost of materials issued, and (c) closing inventory value as at 30 June 2024.',
    analysis: `Periodic Weighted Average:
    Total quantity available:  200 + 500 + 300 = 1,000 kg
    Total cost available:      ₹1,00,000 + ₹2,60,000 + ₹1,62,000 = ₹5,22,000
    
    Weighted Average Cost = ₹5,22,000 ÷ 1,000 kg = ₹522 per kg
    
    Issues:
      April:  400 kg × ₹522 = ₹2,08,800
      May:    350 kg × ₹522 = ₹1,82,700
      June:   150 kg × ₹522 = ₹78,300
      Total issued:          = ₹4,69,800
      
    Closing stock:
      100 kg × ₹522 = ₹52,200
      
    Verification:
    Opening + Purchases = ₹5,22,000
    Issues + Closing = ₹4,69,800 + ₹52,200 = ₹5,22,000 ✓`,
    conclusion: `Under Weighted Average Cost:
    — Weighted average cost per kg: ₹522
    — Cost of materials issued: ₹4,69,800
    — Closing inventory: ₹52,200

    Comparison with FIFO (Illustration 2.3):
    
    | Method          | Issues Cost  | Closing Stock |
    |-----------------|-------------|---------------|
    | FIFO            | ₹4,68,000   | ₹54,000       |
    | Weighted Avg    | ₹4,69,800   | ₹52,200       |
    
    In a rising price environment:
    — FIFO: Lower production cost, Higher closing stock
    — Weighted Average: Higher production cost, Lower closing stock
    
    Both methods are acceptable under AS 2. LIFO is NOT permitted.`,
    auditNote: 'Verify whether the entity uses periodic weighted average (recalculated at end of period) or moving weighted average (recalculated after each receipt). Both are acceptable. Check consistency of method applied from period to period.',
    examFocus: 'When both FIFO and Weighted Average are asked in the same question, FIFO will give higher closing stock in a rising price scenario. This is the most frequently tested comparison in CA exams.',
    examFocusType: 'focus' as const,
  },
  {
    id: 'illus-2-5',
    number: 'Illustration 2.5',
    title: 'NRV Assessment and Write-down — Multi-product Company',
    sourceRef: 'ICAI AS 2 Study Material — Illustration 5',
    pdfPage: 14,
    difficulty: 'ADVANCED' as const,
    topic: 'Net Realisable Value — Write-down (Para 3, 14–16)',
    facts: `Delta Textiles Ltd. has the following closing inventory as at 31 March 2024:

    Product A (Silk cloth):
      Cost:                    ₹4,50,000
      Estimated selling price: ₹5,20,000
      Estimated selling cost:  ₹30,000
    
    Product B (Cotton fabric — slow-moving):
      Cost:                    ₹3,80,000
      Estimated selling price: ₹3,20,000
      Estimated selling cost:  ₹20,000
    
    Product C (Synthetic blend — damaged in flood):
      Cost:                    ₹2,60,000
      Estimated selling price: ₹1,40,000
      Estimated selling cost:  ₹10,000
    
    Product D (Export inventory — WIP stage):
      Cost so far:             ₹1,80,000
      Est. additional cost to complete: ₹60,000
      Est. selling price:      ₹2,70,000
      Est. selling cost:       ₹15,000`,
    issue: 'Calculate the NRV for each product and determine: (a) the value at which each product should be carried in the balance sheet, and (b) the total write-down to be recognised as an expense.',
    analysis: `NRV = Estimated Selling Price − Estimated Cost of Completion − Estimated Selling Costs

    Product A (Silk cloth):
      NRV = ₹5,20,000 − ₹0 − ₹30,000 = ₹4,90,000
      Cost = ₹4,50,000
      Lower of Cost/NRV = ₹4,50,000 (cost is lower) → No write-down

    Product B (Cotton fabric):
      NRV = ₹3,20,000 − ₹0 − ₹20,000 = ₹3,00,000
      Cost = ₹3,80,000
      Lower = ₹3,00,000 → Write-down = ₹80,000

    Product C (Synthetic blend — damaged):
      NRV = ₹1,40,000 − ₹0 − ₹10,000 = ₹1,30,000
      Cost = ₹2,60,000
      Lower = ₹1,30,000 → Write-down = ₹1,30,000

    Product D (WIP):
      NRV = ₹2,70,000 − ₹60,000 − ₹15,000 = ₹1,95,000
      Cost so far = ₹1,80,000
      Lower = ₹1,80,000 (cost is lower) → No write-down
      Note: ₹1,95,000 > ₹1,80,000, so current cost is recoverable`,
    conclusion: `Balance sheet inventory values:
    Product A:  ₹4,50,000 (at cost)
    Product B:  ₹3,00,000 (at NRV)
    Product C:  ₹1,30,000 (at NRV)
    Product D:  ₹1,80,000 (at cost)
    ─────────────────────────────
    Total:      ₹10,60,000

    Write-down recognised in P&L:
    Product B:  ₹80,000
    Product C:  ₹1,30,000
    Total write-down:  ₹2,10,000

    Important: NRV assessment is done item-by-item (or similar category), NOT in total. Products A and D cannot offset the write-downs of B and C.`,
    auditNote: 'Auditors must verify: (1) NRV assessments are based on most reliable evidence available at balance sheet date; (2) For WIP, NRV must consider cost of completion; (3) Write-down should not be netted against NRV gains on other items; (4) The assessment is done "item by item" per AS 2, not in aggregate.',
    examFocus: 'Critical: NRV for WIP = Selling Price − Further Cost to Complete − Selling Cost. Students often forget to deduct the cost of completion from selling price when computing NRV of WIP.',
    examFocusType: 'trap' as const,
  },
  {
    id: 'illus-2-6',
    number: 'Illustration 2.6',
    title: 'Service Provider Inventory Costing',
    sourceRef: 'ICAI AS 2 Study Material — Illustration 6',
    pdfPage: 15,
    difficulty: 'ADVANCED' as const,
    topic: 'Service Provider Inventories (Para 9)',
    facts: `Epsilon Consulting Ltd. is an IT consulting firm. It has two projects in WIP as at 31 March 2024:

    Project Phoenix (75% complete):
      Direct consultant fees billed to project:  ₹12,00,000
      Project manager salary (allocated):         ₹2,40,000
      Software licenses used for the project:     ₹80,000
      Travel and accommodation (project-specific): ₹60,000
      Head-office IT infrastructure (proportionate): ₹1,20,000
      Business development team cost (allocated): ₹90,000
      CEO/CFO salary allocated to project:        ₹1,50,000
    
    Project Orion (40% complete):
      Direct consultant fees billed to project:   ₹6,00,000
      Project manager salary:                     ₹1,20,000
      Software licenses:                          ₹40,000
      Business development cost (allocated):       ₹60,000`,
    issue: 'Calculate the cost of WIP inventories for each project under AS 2, Para 9. Identify costs that must be excluded from inventory.',
    analysis: `Para 9: Service provider inventory includes:
    ✓ Direct labour (consultants directly engaged)
    ✓ Supervisory personnel (project managers)
    ✓ Directly attributable materials and expenses
    ✓ Attributable overheads (infrastructure used for service)
    ✗ Sales and general administrative costs → EXCLUDED
    ✗ Profit margins → EXCLUDED

    Project Phoenix WIP cost:
    Direct consultant fees:         ₹12,00,000  [✓ Include]
    Project manager salary:          ₹2,40,000  [✓ Include — supervisory]
    Software licenses:                 ₹80,000  [✓ Include — direct cost]
    Travel & accommodation:            ₹60,000  [✓ Include — project-specific]
    Head-office IT infrastructure:   ₹1,20,000  [✓ Include — attributable OH]
    Business development:             ₹90,000  [✗ Exclude — selling cost]
    CEO/CFO salary:                  ₹1,50,000  [✗ Exclude — general admin]
    
    Project Phoenix WIP:            ₹17,00,000

    Project Orion WIP cost:
    Direct consultant fees:          ₹6,00,000  [✓ Include]
    Project manager salary:          ₹1,20,000  [✓ Include]
    Software licenses:                 ₹40,000  [✓ Include]
    Business development:              ₹60,000  [✗ Exclude]
    
    Project Orion WIP:               ₹7,60,000`,
    conclusion: `WIP Inventory in Balance Sheet:
    Project Phoenix:  ₹17,00,000
    Project Orion:     ₹7,60,000
    Total WIP:        ₹24,60,000

    Costs excluded from inventory and charged to P&L:
    Business development (BD): ₹90,000 + ₹60,000 = ₹1,50,000
    CEO/CFO salary allocated: ₹1,50,000
    Total period costs:         ₹3,00,000

    Additionally, NRV check is required: if expected billings for each project are less than WIP cost + remaining costs, a write-down is required.`,
    auditNote: 'Auditors of service companies must scrutinise: (1) Basis of allocating overhead to projects (must be systematic, not arbitrary); (2) Business development and sales costs must NOT be inventoried; (3) Verify NRV of WIP = Expected contract revenue − Estimated remaining costs of completion.',
    examFocus: 'In service companies, "overheads" are particularly prone to misclassification. General admin and BD costs are period costs — not inventory. Exam questions specifically test whether students can distinguish attributable production overheads from non-attributable general overheads.',
    examFocusType: 'focus' as const,
  },
]

// ─── Section 2: Business Case Studies ─────────────────────────────────────────

export const businessCases = [
  {
    id: 'bcase-2-1',
    title: 'Retail Chain — Markdown and NRV Assessment of Seasonal Goods',
    category: 'NRV Assessment',
    difficulty: 'INTERMEDIATE' as const,
    facts: `Fashion Forward Ltd., a national retail chain, holds ₹8,50,00,000 of winter clothing inventory as at 31 March 2024 (year-end). Management is considering aggressive markdowns to clear stock before summer. Current markdown plan: sell at 40% below cost. The estimated selling expenses (packaging, delivery) are 3% of selling price.`,
    issue: 'Should the winter clothing inventory be written down? How should management estimate NRV?',
    analysis: `NRV = Expected selling price − Estimated selling costs
    Estimated selling price = Cost × 60% (40% markdown)
    Estimated selling costs = 3% × selling price
    
    If cost = ₹100, then:
    Selling price = ₹60
    Selling cost = ₹1.80 (3% of ₹60)
    NRV = ₹60 − ₹1.80 = ₹58.20
    
    Since NRV (₹58.20) < Cost (₹100), write-down required.
    Write-down per unit = ₹100 − ₹58.20 = ₹41.80 (41.8%)
    
    Total inventory to write down = ₹8,50,00,000 × 41.8% = ₹3,55,30,000`,
    conclusion: 'Fashion Forward must write down inventory by approximately ₹3.55 crore. The write-down is recognised as an expense in the year ended 31 March 2024 — even though the sale has not yet occurred. This reflects the prudence principle.',
    auditNote: 'Auditor must assess: (1) Whether the markdown plan is committed or merely proposed; (2) Whether post-balance sheet events (actual markdown) confirm the NRV estimate; (3) Whether write-down is assessed per product line, not in total.',
  },
  {
    id: 'bcase-2-2',
    title: 'Manufacturing — Goods-in-Transit and Risk Transfer',
    category: 'Ownership and Inclusion in Inventory',
    difficulty: 'INTERMEDIATE' as const,
    facts: `Zeta Steel Ltd. purchases ₹2 crore of iron ore on FOB (Free on Board) shipping point terms on 28 March 2024. The goods are still in transit on 31 March 2024 (year-end). The supplier has issued the invoice. The company's warehouse manager says "we should not include these in inventory as we haven't received them."`,
    issue: 'Should Zeta Steel include goods-in-transit in its closing inventory at 31 March 2024?',
    analysis: `Under FOB shipping point terms, title (ownership) transfers to the buyer when goods are loaded onto the carrier at the supplier's location. Since the goods were loaded on 28 March (before year-end), Zeta Steel owns them from that date.

    AS 2 requires inventories to include all assets owned — regardless of physical location. The fact that goods are in transit does not prevent inclusion.`,
    conclusion: 'Zeta Steel must include the ₹2 crore of goods-in-transit in its 31 March 2024 inventory. Entry: Dr Raw Materials (Goods-in-Transit) ₹2 Cr, Cr Creditors ₹2 Cr. If terms were FOB destination, goods would NOT be included until received.',
    auditNote: 'Auditors must confirm the shipping terms on all goods-in-transit at year-end. FOB shipping point = buyer owns from shipment; FOB destination = seller owns until delivery. Also check whether supplier cut-off is consistent.',
  },
]

// ─── Section 3: Audit Case Studies ────────────────────────────────────────────

export const auditCases = [
  {
    id: 'audit-2-1',
    title: 'Inventory Overstatement — Inflated NRV Estimates',
    category: 'Audit Risk — Valuation',
    pdfPage: 16,
    facts: `During the audit of Omega Ceramics Ltd. (31 March 2024), the auditor identifies that the company has ₹6 crore of slow-moving glazed tiles (over 18 months old). Management asserts that the tiles are valued at cost of ₹6 crore and that the NRV is ₹6.5 crore based on "expected customer orders." No firm orders exist; only preliminary inquiries from two potential buyers. No formal quotations have been obtained.`,
    issue: 'How should the auditor approach the NRV assessment? What is the risk?',
    riskAssessment: 'HIGH — Inventory overstatement via inflated NRV. Management has an incentive to overstate inventory to avoid P&L write-down impact on profitability and loan covenant compliance.',
    auditProcedures: [
      'Inspect aged inventory listing — classify items > 12 months as "slow moving"',
      'Compare historical selling price data with current market prices for ceramic tiles',
      'Obtain independent market quotations from at least 2–3 buyers for slow-moving items',
      'Review subsequent sales after balance sheet date — were tiles sold at claimed prices?',
      'Analyse industry reports for ceramic tile demand and pricing trends',
      'Review management assumptions — documented in writing, signed off by CFO',
      'Evaluate whether storage conditions have deteriorated tile quality',
    ],
    auditConclusion: `The NRV estimate of ₹6.5 crore is not supportable based on unconfirmed preliminary inquiries. The auditor should require management to obtain formal, verifiable market price evidence. If management cannot justify the NRV, a write-down is likely required. If management refuses, the auditor should consider a qualified opinion or emphasis of matter.`,
    standardRef: 'AS 2, Para 14–16; SA 501 Audit Evidence — Specific Considerations for Inventory',
    examFocus: 'The auditor\'s responsibility for inventory valuation is governed by SA 501. Key: auditor must independently assess NRV using verifiable evidence — management assertions alone are insufficient.',
    examFocusType: 'focus' as const,
  },
  {
    id: 'audit-2-2',
    title: 'FIFO vs Weighted Average — Mid-year Change in Policy',
    category: 'Audit Risk — Accounting Policy',
    facts: `Psi Chemicals Ltd. switched from Weighted Average Cost to FIFO method of inventory costing effective 1 October 2024 (mid-year), without disclosing this change in the financial statements. The effect is that closing inventory increased by ₹1.8 crore and profit increased by ₹1.8 crore. Management claims this is a "minor operational adjustment."`,
    issue: 'Is this a valid accounting policy change under AS 1 and AS 2? What should the auditor do?',
    riskAssessment: 'HIGH — Undisclosed change in accounting policy materially affecting profit by ₹1.8 crore. AS 1 (Para 25–27) requires disclosure of any change in accounting policy with reason and quantified financial effect.',
    auditProcedures: [
      'Verify that the change qualifies under AS 1 — it must result in more appropriate presentation, comply with AS, or be required by statute',
      'Assess whether the change was made to inflate profits (going concern or loan covenant implications)',
      'Verify the ₹1.8 crore impact is correctly quantified and disclosed in notes',
      'Ensure prior period comparative figures are disclosed',
      'Check that the consistency principle (Para 13 of AS 2) is not violated',
    ],
    auditConclusion: 'This is a change in accounting policy under AS 1 and must be disclosed in the notes with: (a) nature of change, (b) reason, and (c) quantified impact (₹1.8 crore increase in inventory and profit). The change itself may be valid if justified, but non-disclosure is a violation. The auditor should require disclosure — failure to do so warrants a qualified opinion.',
    standardRef: 'AS 1, Para 25–27; AS 2, Para 13 (consistency of cost formula)',
    examFocus: 'Mid-year change in inventory method is a change in accounting policy under AS 1, NOT merely an operational adjustment. Must be disclosed with impact.',
    examFocusType: 'trap' as const,
  },
]

// ─── Section 4: Regulatory Observations ──────────────────────────────────────

export const regulatoryObservations = [
  {
    id: 'reg-2-1',
    regulator: 'NFRA',
    reportTitle: 'NFRA Inspection Report — Inventory Valuation Non-compliance',
    year: '2023',
    observation: `NFRA's inspection of a listed manufacturing company's audit found that the statutory auditor failed to critically assess the company's inventory NRV estimates. The company had ₹45 crore of slow-moving inventory valued at cost for 3 consecutive years without any NRV assessment, despite clear market evidence of declining prices. The auditor relied solely on management's verbal assurance.`,
    regulatoryAction: 'NFRA issued a show-cause notice to the audit partner for failure to exercise professional scepticism as required under SA 200 and failure to apply AS 2 valuation requirements.',
    accountingStandardViolation: 'AS 2, Para 14–16 — failure to assess and write down inventory to NRV when cost exceeds NRV.',
    practicalLesson: 'NRV assessment must be based on verifiable market evidence, not management assurances. For slow-moving, aged, or damaged inventory, specific NRV analysis is mandatory.',
  },
  {
    id: 'reg-2-2',
    regulator: 'SEBI',
    reportTitle: 'SEBI Accounting Irregularity Order — Inventory Misstatement',
    year: '2022',
    observation: `SEBI investigated a BSE-listed trading company where inventory was overstated by ₹120 crore over 3 years. The company inflated purchases (non-existent inventory) to manage earnings. The inventory was valued at cost without physical verification, and the auditor did not attend stock-taking or obtain third-party confirmation.`,
    regulatoryAction: "SEBI ordered restatement of financial statements for 3 years, debarred 2 promoter-directors, and referred the matter to NFRA for auditor inquiry. The company was also required to restore promoters' contribution to reflect actual inventory.",
    accountingStandardViolation: 'AS 2 — inventory must be physically verified; cost must reflect actual purchases. Inflated purchases result in overstated inventory.',
    practicalLesson: 'Physical verification of inventory (SA 501) is non-negotiable. For significant inventory, auditors must attend year-end stock-taking or arrange alternative procedures if unable to attend.',
  },
]

// ─── Section 5: Judicial Cases ────────────────────────────────────────────────

export const judicialCases = [
  {
    id: 'jcase-2-1',
    title: 'Commissioner of Income Tax v. British Paints India Ltd.',
    court: 'Supreme Court of India',
    year: '1991',
    citation: '[1991] 188 ITR 44 (SC)',
    principle: 'Consistency in inventory valuation method; LIFO not permissible',
    facts: `The company changed its method of inventory valuation from cost or NRV (whichever lower) to LIFO to reduce taxable income during a period of rising prices. The ITO rejected LIFO as it was not consistently applied and had no AS backing.`,
    held: 'The Supreme Court held that the method of inventory valuation must be consistently applied from year to year. A unilateral change to reduce tax liability is not permissible. The court recognised that FIFO and Weighted Average are the accepted methods under Indian GAAP.',
    relevance: 'Confirms AS 2 prohibition on LIFO and supports the consistency principle in Para 13. Also establishes that tax cannot be the primary driver for changing inventory valuation methods.',
  },
  {
    id: 'jcase-2-2',
    title: 'Associated Cement Companies Ltd. v. Commissioner of Income Tax',
    court: 'Bombay High Court',
    year: '1982',
    citation: '[1982] 134 ITR 304 (Bom)',
    principle: 'Abnormal wastage as period cost — not to be included in inventory',
    facts: `Associated Cement Companies included abnormal breakage and spoilage during transportation in the cost of inventory, treating it as part of cost of purchase. The assessing officer disallowed this and treated abnormal losses as period costs.`,
    held: 'The court upheld the AO\'s approach. Abnormal losses during production/transportation should not be absorbed into inventory cost. AS 2 Para 8 specifically excludes "abnormal amounts of wasted materials, labour, or other production costs" from the cost of inventories.',
    relevance: 'Validates the Para 8 exclusion of abnormal wastage from inventory cost. Critical for manufacturing companies with variable spoilage rates.',
  },
]

// ─── Section 6: Exam Corner ───────────────────────────────────────────────────

export const examCorner = {
  commonExamTopics: [
    'Lower of Cost and NRV — item by item vs aggregate assessment',
    'Cost of Conversion — fixed OH absorption at normal capacity',
    'FIFO vs Weighted Average — comparison in rising/falling price environments',
    'Exclusions from inventory cost — selling costs, admin OH, abnormal wastage',
    'Service provider inventory costing — what to include/exclude',
    'NRV for WIP — must deduct cost of completion',
    'Write-down and reversal — accounting entries',
    'Disclosure requirements under Para 19',
    'Trade discount vs cash discount treatment',
    'LIFO — prohibited under AS 2',
  ],
  frequentTricks: [
    {
      trick: 'LIFO is Prohibited',
      explanation: 'Students sometimes mention LIFO as a permitted method. AS 2 specifically prohibits LIFO. Only FIFO and Weighted Average are permitted. Specific identification applies only to non-interchangeable items.',
    },
    {
      trick: 'Cash Discount is NOT deducted from Purchase Cost',
      explanation: 'Trade discounts and rebates are deducted from cost of purchase. Cash discounts for early payment are NOT deducted — they are credited to P&L as income.',
    },
    {
      trick: 'Fixed OH Absorption — Normal NOT Actual Capacity',
      explanation: 'Fixed production overheads must be absorbed based on NORMAL capacity, not actual production. Unabsorbed fixed OH in periods of abnormal idleness is a period cost, not an inventory cost.',
    },
    {
      trick: 'NRV for WIP must deduct Cost to Complete',
      explanation: 'NRV for WIP = Selling Price − Cost of Completion − Selling Costs. Students often compute NRV as just "selling price − selling cost" without deducting the cost to complete.',
    },
    {
      trick: 'NRV Assessment is Item-by-Item, Not Aggregate',
      explanation: 'You cannot set off gains (NRV > Cost) on one product against write-downs on another. Each item (or similar group) must be assessed separately.',
    },
    {
      trick: 'Borrowing Costs Excluded from AS 2 Inventory',
      explanation: 'Under AS 2, borrowing costs are always excluded from the cost of inventory and must be charged to the Statement of Profit and Loss as a period cost.',
    },
  ],
  importantParas: [
    { para: 'Para 3', topic: 'Measurement — Lower of Cost and NRV (fundamental rule)' },
    { para: 'Para 5', topic: 'Cost of Purchase — inclusions and exclusions' },
    { para: 'Para 6', topic: 'Cost of Conversion — normal capacity rule' },
    { para: 'Para 8', topic: 'Excluded costs (abnormal wastage, selling costs, admin OH)' },
    { para: 'Para 9', topic: 'Service provider inventory costing' },
    { para: 'Para 11', topic: 'FIFO formula' },
    { para: 'Para 12', topic: 'Weighted Average Cost formula' },
    { para: 'Para 13', topic: 'Consistency of cost formula' },
    { para: 'Para 14–16', topic: 'NRV — meaning, estimation, write-down' },
    { para: 'Para 17', topic: 'Reversal of NRV write-down' },
    { para: 'Para 19', topic: 'Disclosure requirements' },
  ],
}
