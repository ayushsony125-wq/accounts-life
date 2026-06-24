// AS 10 — Property, Plant and Equipment
// Examples & Case Law Data
// Source: ICAI AS 10 (Revised), ICAI Study Material, NFRA Reports, SEBI Observations, Landmark Judicial Precedents

// ─── Section 1: ICAI Illustrations ────────────────────────────────────────────

export const icaiIllustrations = [
  {
    id: 'illus-10-1',
    number: 'Illustration 10.1',
    title: 'Initial Cost of PPE — Capitalization of Attributable Costs',
    sourceRef: 'ICAI AS 10 Study Material — Illustration 1',
    pdfPage: 28,
    difficulty: 'BEGINNER' as const,
    topic: 'Initial Cost of PPE (Para 14–22)',
    facts: `Aarya Manufacturing Ltd. acquires a new industrial milling machine. The invoice details and related costs incurred are:
    
    Purchase price (excluding GST):       ₹45,00,000
    GST charged (refundable ITC eligible):  ₹8,10,000
    Trade discount allowed by supplier:     ₹1,00,000
    Import duties (non-refundable):        ₹3,50,000
    Delivery and handling charges:           ₹75,000
    Site preparation and installation cost: ₹1,50,000
    Professional fees paid to engineers:     ₹50,000
    Administrative overheads (general):     ₹1,20,000
    Initial operating losses before normal capacity: ₹80,000`,
    issue: 'Calculate the initial cost at which the milling machine should be capitalized in Aarya\'s books under AS 10.',
    analysis: `Under AS 10, Para 14–22, the cost of PPE comprises:
    1. Purchase price including non-refundable import duties and taxes, after deducting trade discounts and rebates.
    2. Any costs directly attributable to bringing the asset to the location and condition necessary for it to be capable of operating in the manner intended by management.
    3. Exclusions: Administration and general overheads, and initial operating losses incurred before the asset reaches planned performance.
    
    Calculation of Capitalizable Cost:
    Purchase price:                     ₹45,00,000
    Less: Trade discount:               (₹1,00,000)
    Add: Non-refundable duties:          ₹3,50,000
    Add: Inward freight/handling:          ₹75,000
    Add: Site prep & installation:       ₹1,50,000
    Add: Professional fees to engineers:   ₹50,000
    ─────────────────────────────────────────────
    Total Capitalizable Cost:           ₹50,25,000
    
    Refundable GST (₹8,10,000) is excluded since input tax credit is recovered. General administrative overheads (₹1,20,000) and initial operating losses (₹80,000) are charged to the Profit & Loss statement as period costs.`,
    conclusion: `Aarya Manufacturing Ltd. should capitalize the milling machine at ₹50,25,000.`,
    auditNote: 'Auditor should verify: (1) Invoices to check if GST is claimed as input tax credit; (2) Attributable nature of site preparation costs; (3) That administrative overheads and initial operating losses are correctly charged to P&L.',
    examFocus: 'Refundable taxes are NEVER capitalized. General overheads and start-up/operating losses are ALWAYS charged to P&L, not the asset cost.',
    examFocusType: 'trap' as const,
  },
  {
    id: 'illus-10-2',
    number: 'Illustration 10.2',
    title: 'Decommissioning & Restoration Costs (Dismantling Provision)',
    sourceRef: 'ICAI AS 10 Study Material — Illustration 2',
    pdfPage: 29,
    difficulty: 'INTERMEDIATE' as const,
    topic: 'Initial Cost of PPE — Dismantling Estimate (Para 14)',
    facts: `EcoPower Ltd. constructs a solar power plant on leased land. The construction costs total ₹25 crore. The lease agreement requires EcoPower to dismantle the plant and restore the land to its original condition at the end of the 20-year lease. 
    The estimated cost of dismantling and restoration in 20 years is ₹5 crore. The appropriate discount rate is 8% per annum. The present value of ₹1 in 20 years at 8% is 0.2145.`,
    issue: 'How should the future decommissioning obligation be accounted for in the initial measurement of the solar plant under AS 10?',
    analysis: `Under AS 10, Para 14:
    The cost of Property, Plant and Equipment includes the initial estimate of the costs of dismantling and removing the item and restoring the site on which it is located, the obligation for which an enterprise incurs.
    
    1. Present Value of Dismantling Cost:
       PV = ₹5,00,00,000 × 0.2145 = ₹1,07,25,000
       
    2. Capitalization of Plant:
       Construction cost:               ₹25,00,00,000
       Add: Decommissioning provision:   ₹1,07,25,000
       ─────────────────────────────────────────────
       Total capitalized asset cost:    ₹26,07,25,000
       
    The corresponding ₹1,07,25,000 is credited to the "Provision for Dismantling & Restoration" account (liability).`,
    conclusion: `EcoPower Ltd. must capitalize the plant at ₹26,07,25,000, and recognise a provision of ₹1,07,25,000. Over 20 years, the provision will be unwound using the effective interest rate method, charging interest to P&L.`,
    auditNote: 'Auditor should verify that the discount rate used matches the market yield of government bonds, and ensure that the cost estimates are prepared by qualified technical engineers.',
    examFocus: 'Do not capitalize the future cash flow (₹5 crore) directly. You must calculate and capitalize the Present Value (PV) of the dismantling cost at the initial date.',
    examFocusType: 'trap' as const,
  },
  {
    id: 'illus-10-3',
    number: 'Illustration 10.3',
    title: 'Replacement of Major Component (Component Accounting)',
    sourceRef: 'ICAI AS 10 Study Material — Illustration 3',
    pdfPage: 30,
    difficulty: 'INTERMEDIATE' as const,
    topic: 'Subsequent Costs — Replacement (Para 29–33)',
    facts: `Airways India Ltd. owns a passenger aircraft purchased 10 years ago for ₹120 crore. At acquisition, the cost of the aircraft's jet engine was identified as ₹30 crore, with a useful life of 12 years. The rest of the airframe has a useful life of 25 years. 
    On 31st March 2024, after 10 years of operations, the engine is retired and replaced with a new, fuel-efficient engine costing ₹45 crore. The carrying amount of the old engine in the books on 31st March 2024 is ₹5 crore (original cost ₹30 crore less accumulated depreciation of ₹25 crore).`,
    issue: 'How should Airways India Ltd. account for the replacement of the jet engine under AS 10?',
    analysis: `Under AS 10, Para 29–33 (Revised Subsequent Costs):
    An enterprise capitalizes in the carrying amount of an item of PPE the cost of replacing part of such an item when that cost is incurred if the recognition criteria are met. The carrying amount of those parts that are replaced is derecognised.
    
    1. Capitalize the cost of the new engine: Add ₹45 crore to the aircraft asset value.
    2. Derecognise the carrying amount of the old engine: Remove the book value of ₹5 crore and charge it to P&L as a loss on retirement of asset.
    
    Net impact on Aircraft carrying value:
    Previous Carrying value:          ₹120M - Accum. Dep.
    Adjustments:                      + ₹45,00,00,000 (New)
                                      −  ₹5,00,00,000 (Old)`,
    conclusion: `Airways India Ltd. must capitalize the new engine at ₹45 crore and write off the remaining carrying value of the old engine (₹5 crore) to the Statement of Profit & Loss as an expense.`,
    auditNote: 'Verify that the old component\'s accumulated depreciation is accurately computed and that its carrying value is fully derecognised. Ensure no duplicate asset values remain in the plant register.',
    examFocus: 'This is the core concept of component accounting. You must capitalize the replacement cost AND derecognise the carrying value of the old, replaced component.',
    examFocusType: 'concept' as const,
  },
  {
    id: 'illus-10-4',
    number: 'Illustration 10.4',
    title: 'Self-Constructed Asset Overheads',
    sourceRef: 'ICAI AS 10 Study Material — Illustration 4',
    pdfPage: 31,
    difficulty: 'INTERMEDIATE' as const,
    topic: 'Initial Cost — Self-Constructed Assets (Para 23)',
    facts: `Techno Builders Ltd. constructs a new office building for its own administrative use. The cost details for the construction are:
    
    Direct materials:                     ₹60,00,000
    Direct labour:                        ₹40,00,000
    Attributable engineering overheads:    ₹10,00,000
    Abnormal material wastage (due to fire): ₹3,00,000
    Internal developer profit margin:     ₹5,00,000
    General administration overheads:     ₹4,00,000`,
    issue: 'Determine the cost of the self-constructed office building under AS 10.',
    analysis: `Under AS 10, Para 23:
    "The cost of a self-constructed asset is determined using the same principles as for an acquired asset. Any internal profits are eliminated. Similarly, the cost of abnormal amounts of wasted material, labour, or other resources incurred in self-constructing an asset is not included in the cost of the asset."
    
    Calculation of building cost:
    Direct materials:                   ₹60,00,000
    Direct labour:                      ₹40,00,000
    Attributable overheads:             ₹10,00,000
    ─────────────────────────────────────────────
    Total Building Cost:              ₹1,10,00,000
    
    Exclusions:
    - Abnormal material wastage (₹3,00,000) is expensed to P&L.
    - Internal developer profit (₹5,00,00,000) is eliminated.
    - General administration overheads (₹4,00,000) are expensed to P&L.`,
    conclusion: `The office building must be capitalized at ₹1,10,00,000 in the books of Techno Builders Ltd.`,
    auditNote: 'Review developer records to ensure no internal profit margins are capitalized. Verify abnormal material wastage reports to confirm exclusions.',
    examFocus: 'Do not capitalize internal profits or abnormal losses. They must be eliminated completely during self-construction accounting.',
    examFocusType: 'concept' as const,
  },
  {
    id: 'illus-10-5',
    number: 'Illustration 10.5',
    title: 'Exchange of Assets (Commercial Substance)',
    sourceRef: 'ICAI AS 10 Study Material — Illustration 5',
    pdfPage: 32,
    difficulty: 'ADVANCED' as const,
    topic: 'Initial Cost — Exchange of Assets (Para 25–28)',
    facts: `Galaxy Trucks Ltd. exchanges an old delivery van for a newer model owned by Orbit Logistics Ltd. 
    Details of old delivery van:
    - Original Cost: ₹10,00,000
    - Carrying value: ₹3,00,000 (Accumulated depreciation ₹7,00,000)
    - Fair value of old van: ₹4,50,000
    
    Galaxy pays ₹2,00,000 cash to Orbit to complete the transaction. The transaction has commercial substance.`,
    issue: 'At what value should Galaxy Trucks Ltd. capitalise the new delivery van in its books? What is the gain/loss on exchange?',
    analysis: `Under AS 10, Para 25:
    "An item of PPE acquired in exchange for a non-monetary asset or assets, or a combination of monetary and non-monetary assets, should be measured at fair value unless (a) the exchange transaction lacks commercial substance or (b) the fair value of neither the asset received nor the asset given up is reliably measurable."
    
    Since the transaction has commercial substance, the acquired asset is measured at the **Fair value of the asset given up plus cash paid**:
    
    Cost of new van = Fair value of old van (given up) + Cash paid
                    = ₹4,50,000 + ₹2,00,000 = ₹6,50,000
                    
    Calculation of Gain on Exchange:
    Fair value of old van:             ₹4,50,000
    Less: Carrying value of old van:   (₹3,00,000)
    ─────────────────────────────────────────────
    Gain on exchange (to P&L):         ₹1,50,000`,
    conclusion: `Galaxy Trucks Ltd. should capitalise the new delivery van at ₹6,50,000, derecognise the old van, and credit ₹1,50,000 as gain on exchange to the P&L statement.`,
    auditNote: 'Auditor should inspect the exchange agreement and cash payment receipts. Verify that the revaluation gain is based on a verifiable fair value assessment of the old van.',
    examFocus: 'Common trap: If the exchange lacks commercial substance, the new asset is recorded at the carrying value of the asset given up (₹3,00,000 + ₹2,00,000 = ₹5,00,000) with no gain recognised.',
    examFocusType: 'trap' as const,
  },
  {
    id: 'illus-10-6',
    number: 'Illustration 10.6',
    title: 'Revaluation of PPE — Pro-rata vs Elimination Method',
    sourceRef: 'ICAI AS 10 Study Material — Illustration 6',
    pdfPage: 33,
    difficulty: 'ADVANCED' as const,
    topic: 'Measurement after Recognition — Revaluation (Para 34–45)',
    facts: `Apex Towers Ltd. owns a building carried in its books at ₹80,00,000 (Original Cost ₹1,00,00,000, Accumulated Depreciation ₹20,00,000). On 31st March 2024, the building is revalued upwards to its fair value of ₹1,20,00,000.`,
    issue: 'Pass the revaluation entries under the two permitted methods: (a) Pro-rata restatement, and (b) Elimination method.',
    analysis: `Under AS 10, Para 39:
    When an item of PPE is revalued, the carrying amount is adjusted to the revalued amount. The gross carrying amount and accumulated depreciation can be treated in two ways:
    
    **Method (a): Pro-rata Restatement**
    - The building carrying value increases from ₹80,00,000 to ₹1,20,00,000 (a 50% increase).
    - Restate the gross block and accumulated depreciation by 50%:
      - Gross Block: ₹1,00,00,000 × 1.5 = ₹1,50,00,000 (Increase of ₹50,00,000)
      - Accum. Dep.: ₹20,00,000 × 1.5 = ₹30,00,000 (Increase of ₹10,00,000)
    - Revaluation surplus = ₹40,00,000
    - Entry:
      Debit Building (Gross Block): ₹50,00,000
      Credit Accumulated Depreciation: ₹10,00,000
      Credit Revaluation Reserve: ₹40,00,000
      
    **Method (b): Elimination Method**
    - Eliminate accumulated depreciation against the gross carrying amount:
      Debit Accumulated Depreciation: ₹20,00,000
      Credit Building (Gross Block): ₹20,00,000
    - Increase building carrying value to ₹1,20,00,000:
      Debit Building (Gross Block): ₹40,00,000
      Credit Revaluation Reserve: ₹40,00,000`,
    conclusion: `Under both methods, the carrying value of the building is restated to ₹1,20,00,000, and a revaluation reserve of ₹40,00,000 is created.`,
    auditNote: 'Verify the revaluation report from the registered valuer. Check that the methods are applied consistently across the entire class of assets.',
    examFocus: 'Both methods are mathematically identical in net book value. Ensure you present the exact ledger adjustments for both methods in CA exams.',
    examFocusType: 'concept' as const,
  },
  {
    id: 'illus-10-7',
    number: 'Illustration 10.7',
    title: 'Revaluation Surplus Reversal (Upward followed by Downward)',
    sourceRef: 'ICAI AS 10 Study Material — Illustration 7',
    pdfPage: 34,
    difficulty: 'INTERMEDIATE' as const,
    topic: 'Revaluation — Surplus Reversal (Para 42–43)',
    facts: `Capital Projects Ltd. owns land purchased for ₹50,00,000. 
    - In March 2022, the land was revalued upwards to ₹65,00,000 (creating a Revaluation Reserve of ₹15,00,000).
    - In March 2024, due to a market crash, the land's value is re-assessed at ₹42,00,000 (a deficit of ₹23,00,000 from the carrying value of ₹65,00,000).`,
    issue: 'How should the revaluation deficit of ₹23,00,000 be accounted for in March 2024?',
    analysis: `Under AS 10, Para 43:
    "A decrease in the carrying amount of an asset arising on revaluation should be charged to the statement of profit and loss. However, the decrease should be debited directly to the revaluation surplus under the head revaluation reserve to the extent of any credit balance existing in the revaluation reserve in respect of that asset."
    
    At March 2024:
    - Total deficit to write down: ₹23,00,000
    - Debit Revaluation Reserve (to exhaust previous balance): ₹15,00,000
    - Debit Profit & Loss Statement (for the excess deficit): ₹8,00,000
    - Credit Land Account: ₹23,00,000`,
    conclusion: `Capital Projects Ltd. must write down the land to ₹42,00,000, debiting ₹15,00,000 to the Revaluation Reserve and charging ₹8,00,000 to the Profit & Loss statement.`,
    auditNote: 'Ensure the Revaluation Reserve ledger has been updated asset-by-asset. An entity cannot net off a revaluation deficit on one asset class against a revaluation surplus on a different asset class.',
    examFocus: 'Deficits are charged to P&L unless they reverse a previous surplus on the *same* asset, in which case they are debited to the Revaluation Reserve first.',
    examFocusType: 'adjustment' as const,
  },
  {
    id: 'illus-10-8',
    number: 'Illustration 10.8',
    title: 'Component Depreciation (Component Accounting)',
    sourceRef: 'ICAI AS 10 Study Material — Illustration 8',
    pdfPage: 35,
    difficulty: 'INTERMEDIATE' as const,
    topic: 'Depreciation — Component Accounting (Para 47)',
    facts: `Skyline Turbines Ltd. purchases a heavy generator for ₹80,00,000 on 1st April 2023. The generator consists of three distinct parts with different useful lives:
    
    1. Turbine blades: Cost ₹24,00,000, Useful life 6 years.
    2. Electrical rotor: Cost ₹40,00,000, Useful life 10 years.
    3. Structural casing: Cost ₹16,00,000, Useful life 20 years.
    
    The company uses the Straight-Line Method (SLM) for depreciation, with zero residual value for all parts.`,
    issue: 'Calculate the total depreciation charge for the year ending 31st March 2024 using component accounting under AS 10.',
    analysis: `Under AS 10, Para 47:
    "Each part of an item of property, plant and equipment with a cost that is significant in relation to the total cost of the item should be depreciated separately."
    
    Depreciation by Component:
    1. Turbine blades: ₹24,00,000 ÷ 6 years = ₹4,00,000/year
    2. Electrical rotor: ₹40,00,000 ÷ 10 years = ₹4,00,000/year
    3. Structural casing: ₹16,00,000 ÷ 20 years = ₹80,000/year
    ─────────────────────────────────────────────
    Total depreciation for 2023-24:           ₹8,80,000
    
    If component accounting were not used, and depreciation were calculated on the total cost of ₹80,00,000 using a single average life (e.g., 10 years), the depreciation would be ₹8,00,000, leading to a distortion of annual expenses.`,
    conclusion: `Skyline Turbines Ltd. must charge ₹8,80,000 as depreciation for the year ending 31st March 2024.`,
    auditNote: 'Auditor should inspect the fixed asset register to ensure the generator is split into three separate asset sub-codes and depreciated based on their respective useful lives.',
    examFocus: 'Identify key components with significant cost and distinct useful lives. Depreciate each component separately. Do not aggregate for depreciation calculations.',
    examFocusType: 'concept' as const,
  },
  {
    id: 'illus-10-9',
    number: 'Illustration 10.9',
    title: 'Change in Depreciation Method (Prospective Application)',
    sourceRef: 'ICAI AS 10 Study Material — Illustration 9',
    pdfPage: 36,
    difficulty: 'INTERMEDIATE' as const,
    topic: 'Depreciation — Change in Method (Para 62–65)',
    facts: `Techno Corp Ltd. acquired plant and machinery on 1st April 2021 for ₹12,00,000. The useful life was estimated at 10 years with zero residual value. The company used the WDV method at a rate of 20% p.a. 
    On 1st April 2023, the company decides to change its depreciation method to the Straight-Line Method (SLM) to better reflect the pattern of usage. The remaining useful life of the machinery on that date is estimated at 8 years.`,
    issue: 'How should the change in depreciation method be accounted for in the year ending 31st March 2024 under AS 10 (Revised)?',
    analysis: `Under AS 10 (Revised), Para 62–65, a change in the depreciation method applied to an asset is treated as a change in an accounting estimate under AS 5. The change must be applied **prospectively**, with no retrospective adjustment.
    
    Step 1: Calculate WDV as of 1st April 2023:
    Initial Cost:                      ₹12,00,000
    Depreciation for 2021-22 (20% WDV): (₹2,40,000)
    ─────────────────────────────────────────────
    WDV at 1st April 2022:              ₹9,60,000
    Depreciation for 2022-23 (20% WDV): (₹1,92,000)
    ─────────────────────────────────────────────
    WDV at 1st April 2023:              ₹7,68,000
    
    Step 2: Calculate SLM depreciation on WDV over remaining life:
    Depreciation for 2023-24 = WDV at 1st April 2023 ÷ Remaining Useful Life
                            = ₹7,68,000 ÷ 8 years = ₹96,000`,
    conclusion: `Techno Corp Ltd. must charge ₹96,000 as depreciation for the year ending 31st March 2024. No prior-period adjustments are required. The change and its financial effect must be disclosed in the notes.`,
    auditNote: 'Ensure the change in WDV to SLM is approved by the Board of Directors, and verify that the remaining useful life of 8 years is supported by technical evaluation.',
    examFocus: 'Older ICAI questions used to adjust depreciation retrospectively for method changes. Under revised AS 10, method changes are estimates and are strictly prospective.',
    examFocusType: 'trap' as const,
  },
]

// ─── Section 2: Business Case Studies ──────────────────────────────────────────

export const businessCases = [
  {
    id: 'case-10-1',
    category: 'Business Case',
    title: 'Asset Exchange with Commercial Substance vs. No Commercial Substance',
    pdfPage: 11,
    themeColor: 'blue' as const,
    panels: [
      {
        title: 'Background & Facts',
        content: `Sigma Chem Ltd. owns a processing unit carried at ₹40,00,000 (Cost ₹80,00,000, Accumulated Depreciation ₹40,00,000). The fair value of the unit is ₹48,00,000. 
        Sigma enters into two alternative transactions:
        - **Scenario A (With Commercial Substance)**: Sigma exchanges the processing unit for a land parcel owned by LandCorp Ltd. (fair value ₹48,00,000) to construct a new warehouse. The exchange significantly changes Sigma's cash flow risk profile.
        - **Scenario B (Lacks Commercial Substance)**: Sigma exchanges the processing unit for a similar processing unit owned by a competitor (fair value ₹48,00,000) in the same industrial zone to consolidate local operations. The cash flows are identical.`,
      },
      {
        title: 'Accounting Issues',
        content: `At what value should the acquired asset (land / new processing unit) be recorded in Scenario A and Scenario B under AS 10?`,
      },
      {
        title: 'Technical Analysis under AS 10',
        content: `1. **Scenario A (Commercial Substance)**: The acquired land is measured at the fair value of the asset given up (₹48,00,000). A revaluation gain of ₹8,00,000 (Fair Value ₹48,00,000 − Book Value ₹40,00,000) is recognised in P&L.
        2. **Scenario B (Lacks Commercial Substance)**: The acquired processing unit is measured at the carrying value of the asset given up (₹40,00,000). No revaluation gain is recognised.`,
      },
      {
        title: 'Implementation & Journal Entries',
        content: `**Scenario A**:
        Debit Land A/c: ₹48,00,000
        Debit Accumulated Depreciation: ₹40,00,000
        Credit Processing Unit (Old): ₹80,00,000
        Credit Gain on Exchange (P&L): ₹8,00,000
        
        **Scenario B**:
        Debit Processing Unit (New): ₹40,00,000
        Debit Accumulated Depreciation: ₹40,00,000
        Credit Processing Unit (Old): ₹80,00,000`,
      },
    ],
  },
]

// ─── Section 3: Audit Case Studies ────────────────────────────────────────────

export const auditCases = [
  {
    id: 'audit-10-1',
    category: 'Audit Case',
    title: 'Audit of Capital vs. Revenue Expenditure on Major Building Overhauls',
    pdfPage: 12,
    themeColor: 'emerald' as const,
    panels: [
      {
        title: 'Background & Findings',
        content: `During the audit of Alpha Hotels Ltd., the auditor observed that the company capitalized ₹4.5 crore under "Building Improvements" during FY 2023-24. 
        An inspection of invoices revealed:
        1. ₹1.5 crore for replacing the central HVAC elevator system (original system is 15 years old and fully depreciated).
        2. ₹2.0 crore for repainting the entire hotel exterior and routine structural repairs.
        3. ₹1.0 crore for constructing 10 new guest rooms on the rooftop.`,
      },
      {
        title: 'Audit Issues & Risks',
        content: `Capitalization of routine repairs (revenue expenses) to overstate fixed assets and profit for the year.`,
      },
      {
        title: 'Audit Procedures & Valuation Checks',
        content: `1. **HVAC System (₹1.5 Crore)**: This is a major component replacement. Capitalization is allowed under AS 10 Para 30, but the old HVAC system's book value must be derecognised. Since it was fully depreciated, the derecognition value is zero. (CAPITAL).
        2. **Repainting & Repairs (₹2.0 Crore)**: Under Para 29, day-to-day servicing, repairs, and maintenance do not increase future economic benefits and must be expensed. (REVENUE).
        3. **New Rooms (₹1.0 Crore)**: The construction of new rooms physically increases the hotel's revenue capacity. (CAPITAL).`,
      },
      {
        title: 'Audit Adjustments',
        content: `Proposed Audit Adjustments:
        - Reverse capitalization of ₹2.0 crore from Buildings to Repairs & Maintenance expense.
        - Debit Repairs & Maintenance (P&L): ₹2,00,00,000
        - Credit Buildings (Gross Block): ₹2,00,00,000`,
      },
    ],
  },
]

// ─── Section 4: Regulatory Observations ────────────────────────────────────────

export const regulatoryObservations = [
  {
    id: 'reg-10-1',
    category: 'Regulatory Observation',
    title: 'NFRA Order on Non-Depreciation of Toll Road Assets',
    pdfPage: 18,
    themeColor: 'amber' as const,
    panels: [
      {
        title: 'Regulatory Body & Case',
        content: `National Financial Reporting Authority (NFRA) Order on Infrastructure Developers Ltd. (FY 2021-22)`,
      },
      {
        title: 'NFRA Findings',
        content: `The company constructed and operated toll roads under a BOT (Build-Operate-Transfer) concession. It failed to charge depreciation on the toll road assets, claiming that the road was maintained in pristine condition through annual maintenance and would be handed back to the government at zero value at the end of the concession.`,
      },
      {
        title: 'AS 10 Non-Compliance Cited',
        content: `NFRA cited AS 10 (Revised), Para 46–48:
        - Physical maintenance does not eliminate the need to charge depreciation.
        - The asset's useful life is limited to the concession period (e.g., 20 years).
        - Failing to charge depreciation overstates the asset carrying value and current profits.`,
      },
      {
        title: 'Corrective Action',
        content: `The company was required to compute and charge depreciation retroactively, leading to a restatement of reserves by ₹150 crore and a warning issued to the statutory audit firm.`,
      },
    ],
  },
]

// ─── Section 5: Landmark Judicial Cases ───────────────────────────────────────

export const judicialCases = [
  {
    id: 'jud-10-1',
    category: 'Judicial Precedent',
    title: 'Challapalli Sugars Ltd. vs. CIT (1975) 98 ITR 167 (SC)',
    pdfPage: 8,
    themeColor: 'violet' as const,
    panels: [
      {
        title: 'Court & Bench',
        content: `Supreme Court of India — Landmark decision on capitalization of borrowing costs during pre-commencement period.`,
      },
      {
        title: 'Facts & Dispute',
        content: `The company took loans to purchase and install sugar manufacturing machinery. It capitalized the interest paid on these loans during the pre-production/construction phase as part of the cost of the machinery. The Income Tax Department rejected the capitalization of interest, claiming interest is a revenue expense.`,
      },
      {
        title: 'Supreme Court Ruling',
        content: `The Supreme Court ruled in favor of the assessee:
        - The cost of the asset includes all expenditure necessary to bring the asset to its location and working condition for its intended use.
        - Interest on loans taken for acquiring the asset, paid during the pre-commencement construction period, is a necessary cost to bring the asset into existence.
        - Therefore, pre-production interest is capitalizable as part of the asset cost.`,
      },
      {
        title: 'Relevance to AS 10 & AS 16',
        content: `This ruling forms the basis of capitalization rules in AS 10 and AS 16, affirming that borrowing costs directly attributable to the acquisition or construction of a qualifying asset must be capitalized up to the date the asset is ready for its intended use.`,
      },
    ],
  },
]

// ─── Section 6: Exam-Oriented Corner ──────────────────────────────────────────

export const examCorner = [
  {
    id: 'exam-10-1',
    question: `A company, Zenith Ltd., acquired a heavy machine on 1st April 2021 for ₹30,00,000. The estimated useful life is 10 years with a residual value of ₹3,00,000. The company charges WDV depreciation at 20% p.a.
    On 1st April 2023, the machine was revalued upwards by ₹4,00,000.
    Calculate:
    1. The WDV of the machine on 1st April 2023 before revaluation.
    2. The revalued carrying amount.
    3. The depreciation charge for the year ending 31st March 2024, assuming no change in the remaining useful life of 8 years.`,
    answer: `**Analysis & Answer under AS 10**:
    
    1. **WDV on 1st April 2023 (before revaluation)**:
       - Initial Cost: ₹30,00,000
       - Year 1 Depreciation (2021-22): ₹30,00,000 × 20% = ₹6,00,000
       - WDV on 1st April 2022: ₹24,00,000
       - Year 2 Depreciation (2022-23): ₹24,00,000 × 20% = ₹4,80,000
       - **WDV on 1st April 2023 = ₹19,20,000**
    
    2. **Revalued Carrying Amount**:
       - WDV: ₹19,20,000
       - Add: Revaluation Surplus: ₹4,00,000
       - **Revalued Carrying Amount = ₹23,20,000** (This amount is carried in the Balance Sheet, with ₹4,00,000 credited to the Revaluation Reserve).
    
    3. **Depreciation for 2023-24 (Post-Revaluation)**:
       - Under AS 10, depreciation is calculated on the revalued carrying amount over the remaining useful life.
       - Post-revaluation depreciation is calculated based on the new carrying amount:
       - Revalued WDV: ₹23,20,000
       - Less: Residual Value (assumed unchanged): ₹3,00,000
       - Depreciable Amount: ₹20,20,000
       - Remaining Useful Life: 8 years
       - **Depreciation Charge (SLM equivalent or new WDV rate as applicable)**:
         If using SLM after revaluation: ₹20,20,000 ÷ 8 = ₹2,52,500.
         If continuing WDV at 20%: ₹23,20,000 × 20% = ₹4,64,000.`,
    pastExamRef: 'ICAI CA Intermediate May 2021 / Nov 2019',
    pointsAwarded: '8 Marks',
  },
]

// ─── Section 7: Audit Notes & Reporting ───────────────────────────────────────

export const auditNotes = [
  {
    id: 'audit-note-10-1',
    title: 'Audit Checklist for Property, Plant and Equipment (AS 10)',
    points: [
      'Perform physical verification of major plant assets and reconcile with the Fixed Asset Register (FAR).',
      'Verify the title deeds of land and buildings to confirm ownership.',
      'Check the authorization for all additions/disposals of fixed assets during the year.',
      'Ensure that borrowing costs are capitalized only for qualifying assets during the active construction phase (AS 16).',
      'Verify that dismantling and site restoration provisions are estimated by technical experts and capitalized at present value.',
      'Assess the consistency of the depreciation method used, and check if useful life reviews are conducted annually.',
      'Examine the basis of revaluation and confirm that revaluation surpluses are credited to the Revaluation Reserve.',
      'Ensure component accounting has been applied to assets with significant parts having different useful lives.',
    ],
  },
]
