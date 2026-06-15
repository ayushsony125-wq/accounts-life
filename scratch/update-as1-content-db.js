const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const entryId = 10; // AS 1 Entry ID

  console.log('Starting DB content update for AS 1...');

  // 1. Update master Entry and StandardDetail
  await prisma.entry.update({
    where: { id: entryId },
    data: {
      entryTitle: 'AS 1 — Disclosure of Accounting Policies',
      summary: 'Establishes the disclosure of significant accounting policies adopted in preparing and presenting financial statements to ensure comparability and proper appreciation of accounts.',
      verificationLevel: 'VERIFIED',
      status: 'PUBLISHED',
      examLevelTags: ['CA Intermediate'],
      seoTitle: 'AS 1 — Disclosure of Accounting Policies | Study Guide',
      seoDescription: 'Comprehensive guide to ICAI Accounting Standard 1 (AS 1) covering assumptions, prudence, substance over form, materiality, and disclosure rules.'
    }
  });

  const detail = await prisma.standardDetail.findUnique({
    where: { entryId }
  });

  await prisma.standardDetail.update({
    where: { entryId },
    data: {
      standardCode: 'AS-1',
      standardFramework: 'AS',
      standardStatus: 'ACTIVE',
      applicabilitySummary: 'Mandatory for all corporate and non-corporate entities preparing general purpose financial statements under the AS framework.',
      objectiveText: 'The purpose of Accounting Standard 1 is to promote better understanding of financial statements by establishing the disclosure of significant accounting policies and the manner in which they are disclosed. Such disclosures facilitate a more meaningful comparison between the financial statements of different enterprises. [ICAI Ref: Para 8, Page 4.2]',
      objectiveSourcePara: 'Para 8',
      scopeStatement: 'This Standard deals with the disclosure of significant accounting policies followed in preparing and presenting financial statements. It applies to all general-purpose financial statements under Indian GAAP (AS framework). [ICAI Ref: Para 1, Page 4.1]',
      scopeIncluded: [
        'All corporate entities under Indian GAAP preparing general-purpose financial statements.',
        'All non-corporate entities (sole proprietorships, partnerships, LLPs, trusts) preparing formal accounts.',
        'Disclosures of policies regarding depreciation, inventory valuation, retirement benefits, investments, and translation of foreign currencies. [ICAI Ref: Para 14, Page 4.4]'
      ],
      scopeExcluded: [
        'Entities adopting Indian Accounting Standards (Ind AS) under the IFRS-converged framework.',
        'Immaterial items that do not influence user decision-making (Preface Para 4.3 ref). [ICAI Ref: Page 4.1]'
      ]
    }
  });

  console.log('Master Entry and StandardDetail updated.');

  // 2. Clear old relations (Notes, Illustrations, FAQs)
  await prisma.entryNote.deleteMany({ where: { entryId } });
  await prisma.entryIllustration.deleteMany({ where: { entryId } });
  await prisma.entryFAQ.deleteMany({ where: { entryId } });
  console.log('Cleared old child relations.');

  // 3. Create 16 Concept Notes
  const notesData = [
    {
      noteType: 'IMPORTANT',
      noteTitle: '1. Objective of AS 1',
      noteBody: 'The primary purpose of AS 1 is to promote a better understanding of financial statements. It achieves this by establishing the disclosure of significant accounting policies and prescribing the manner in which they must be disclosed in the financial statements. This enables users to properly appreciate the financial position and performance of an enterprise, and facilitates a meaningful comparison between different enterprises. [ICAI Ref: Page 4.1, Page 4.2, Para 8]',
      sortOrder: 1
    },
    {
      noteType: 'NOTE',
      noteTitle: '2. Scope of the Standard',
      noteBody: 'AS 1 applies to the disclosure of significant accounting policies followed in the preparation and presentation of financial statements. It is mandatory for all corporate and non-corporate entities preparing general-purpose financial statements under the AS framework. It applies only to items that are material (attention is drawn to paragraph 4.3 of the Preface). [ICAI Ref: Page 4.1, Para 1]',
      sortOrder: 2
    },
    {
      noteType: 'NOTE',
      noteTitle: '3. Nature of Accounting Policies',
      noteBody: 'Accounting policies refer to the specific accounting principles and the methods of applying those principles adopted by an enterprise in preparing and presenting financial statements. Since business circumstances vary, alternative accounting policies are acceptable. Management must exercise judgment to select the most appropriate policies. [ICAI Ref: Page 4.3, Para 11-12]',
      sortOrder: 3
    },
    {
      noteType: 'NOTE',
      noteTitle: '4. Selection of Accounting Policies',
      noteBody: 'The primary consideration in selecting accounting policies is that the financial statements should represent a true and fair view of the state of affairs as at the balance sheet date and of the profit or loss. For this purpose, the selection and application of accounting policies are governed by three major considerations: Prudence, Substance over Form, and Materiality. [ICAI Ref: Page 4.4, Para 16-17]',
      sortOrder: 4
    },
    {
      noteType: 'NOTE',
      noteTitle: '5. Fundamental Accounting Assumptions',
      noteBody: 'Certain fundamental accounting assumptions underlie the preparation and presentation of financial statements: Going Concern, Consistency, and Accrual. These assumptions are usually not specifically stated because their acceptance and use are assumed. If followed, no explicit disclosure is required. If any assumption is NOT followed, the fact must be specifically disclosed. [ICAI Ref: Page 4.2, Para 9]',
      sortOrder: 5
    },
    {
      noteType: 'IMPORTANT',
      noteTitle: '6. Going Concern Assumption',
      noteBody: 'The enterprise is normally viewed as a going concern, meaning it will continue in operation for the foreseeable future. It is assumed that the enterprise has neither the intention nor the necessity of liquidation or of materially curtailing the scale of its operations. If this assumption is violated, assets/liabilities must be valued on a liquidation basis (Net Realisable Value) and this fact must be disclosed. [ICAI Ref: Page 4.2, Para 10(a)]',
      sortOrder: 6
    },
    {
      noteType: 'NOTE',
      noteTitle: '7. Consistency Assumption',
      noteBody: 'It is assumed that accounting policies are consistent from one period to another to ensure comparability of financial statements across periods. A change in accounting policy is permitted only if required by statute, for compliance with an accounting standard, or if the change results in a more appropriate presentation of financial statements. [ICAI Ref: Page 4.2, Page 4.9, Para 10(b)]',
      sortOrder: 7
    },
    {
      noteType: 'NOTE',
      noteTitle: '8. Accrual Assumption',
      noteBody: 'Revenues and costs are accrued—meaning they are recognized as they are earned or incurred (and not as money is received or paid) and recorded in the financial statements of the periods to which they relate. This is the foundation of the matching concept. Cash basis of accounting violates this fundamental assumption. [ICAI Ref: Page 4.3, Para 10(c)]',
      sortOrder: 8
    },
    {
      noteType: 'IMPORTANT',
      noteTitle: '9. The Principle of Prudence',
      noteBody: 'In view of the uncertainty attached to future events, profits are not anticipated but recognized only when realized, though not necessarily in cash. However, provision is made for all known liabilities and losses even though the amount cannot be determined with certainty and represents only a best estimate in the light of available information. Understating liabilities/losses or overstating assets/income is strictly prohibited. [ICAI Ref: Page 4.4, Para 17(a)]',
      sortOrder: 9
    },
    {
      noteType: 'IMPORTANT',
      noteTitle: '10. Substance Over Form',
      noteBody: 'The accounting treatment and presentation in financial statements of transactions and events should be governed by their economic substance and commercial reality, and not merely by their legal form. A classic example is the accounting of assets purchased under a hire purchase agreement, where the hirer records the asset in their balance sheet despite not having legal ownership yet. [ICAI Ref: Page 4.5, Para 17(b)]',
      sortOrder: 10
    },
    {
      noteType: 'NOTE',
      noteTitle: '11. Materiality Threshold',
      noteBody: 'Financial statements should disclose all "material" items—meaning items the knowledge of which might influence the economic decisions of the users. Materiality depends on the size and nature of the item, judged in the specific circumstances of its omission or misstatement. Immaterial items can be aggregated and need not be disclosed separately. [ICAI Ref: Page 4.1, Page 4.5, Para 17(c)]',
      sortOrder: 11
    },
    {
      noteType: 'NOTE',
      noteTitle: '12. Disclosure Requirements',
      noteBody: 'All significant accounting policies adopted in the preparation and presentation of financial statements should be disclosed. This disclosure should form part of the financial statements and should normally be disclosed in one place (such as Note 1) to facilitate understanding and comparison. [ICAI Ref: Page 4.5, Para 18-20, Para 24-25]',
      sortOrder: 12
    },
    {
      noteType: 'IMPORTANT',
      noteTitle: '13. Changes in Accounting Policies',
      noteBody: 'Any change in an accounting policy which has a material effect in the current period or is reasonably expected to have a material effect in later periods must be disclosed. The amount by which any item in the financial statements is affected by such change should also be disclosed to the extent ascertainable. If the amount is not ascertainable, wholly or in part, the fact should be indicated. [ICAI Ref: Page 4.5, Page 4.6, Para 22, Para 26]',
      sortOrder: 13
    },
    {
      noteType: 'NOTE',
      noteTitle: '14. Areas of Policy Diversity (Examples)',
      noteBody: 'AS 1 lists common areas where different accounting policies are encountered: (a) methods of depreciation/depletion/amortization, (b) treatment of expenditure during construction, (c) translation of foreign currency items, (d) valuation of inventories, (e) treatment of goodwill, (f) valuation of investments, (g) treatment of retirement benefits, (h) recognition of profit on long-term contracts. This list is not exhaustive. [ICAI Ref: Page 4.4, Para 14-15]',
      sortOrder: 14
    },
    {
      noteType: 'CAUTION',
      noteTitle: '15. Disclosure Cures No Wrong (Key Rule)',
      noteBody: 'A fundamental rule of AS 1 is that disclosure of accounting policies or of changes therein cannot remedy a wrong or inappropriate treatment of an item in the accounts. For example, if a revenue expenditure is wrongly capitalized, merely disclosing this treatment in the notes does not make it correct under GAAP; the auditor must qualify the report. [ICAI Ref: Page 4.5, Para 23]',
      sortOrder: 15
    },
    {
      noteType: 'TIP',
      noteTitle: '16. Audit & Exam Insights',
      noteBody: 'For audit purposes, if assumptions are followed, the auditor remains silent. If violated, a qualification is mandatory. In exams, look out for scenarios where: (a) a policy change is made (FIFO to Weighted Average) - quantify the effect and state disclosure rules; (b) wrong accounting treatment is done - state that disclosure cannot remedy it. [ICAI Ref: Page 4.5, Page 4.6, Para 23, Para 27]',
      sortOrder: 16
    }
  ];

  for (const note of notesData) {
    await prisma.entryNote.create({
      data: {
        entryId,
        noteType: note.noteType,
        noteTitle: note.noteTitle,
        noteBody: note.noteBody,
        sortOrder: note.sortOrder
      }
    });
  }
  console.log('16 Concept Notes created.');

  // 4. Create 26 Illustrations (16 Business Cases + 10 Exam illustrations)
  const illustrationsData = [
    {
      title: 'A1: Inventory Valuation Policy Change',
      scenario: 'A manufacturing company decides to change its inventory valuation method from FIFO to Weighted Average method to better reflect the consumption pattern of inventory.',
      working: 'Old inventory value (FIFO) = Rs. 1,63,000.\nNew inventory value (Weighted Average) = Rs. 1,47,000.\nDifference (Reduction in value & profit) = Rs. 16,000.\nRealisable value of inventory is Rs. 1,95,000, which is higher than both costs, meaning cost is the valuation base.',
      answer: 'As per AS 1, a change in accounting policy with a material effect must be disclosed. The company must disclose the fact of the change, the reason (better representation), and its financial impact. The note should read: "The company has changed its inventory valuation method from FIFO to Weighted Average from the current year. This change has reduced the current year profit and closing inventory by Rs. 16,000." [ICAI Ref: Page 4.9, Illustration 1]',
      note: 'The change has a material effect in the current period, so it is quantified and disclosed.',
      difficulty: 'BEGINNER',
      paraRef: 'Para 22',
      sortOrder: 1
    },
    {
      title: 'A2: Method of Provisioning for Inventory',
      scenario: 'ABC Ltd. has been making provision for non-moving inventory based on issues during the last 12 months. In the current year, it decides to make the provision based on a technical evaluation. The provision is Rs. 2.5 lakhs under technical evaluation vs. Rs. 3.5 lakhs under the old method.',
      working: 'Total value of inventory is Rs. 100 lakhs.\nOld provision = Rs. 3.5 lakhs.\nNew provision = Rs. 2.5 lakhs.\nDifference = Rs. 1 lakh (which represents a change in estimate, not policy).',
      answer: 'This does not amount to a change in accounting policy. The policy of ABC Ltd. is to make provision for non-moving inventory, which remains unchanged. The method of estimating the provision has been changed based on technical evaluation. This represents a change in accounting estimate. However, since it has a material effect, disclosure of the change and its impact (profit is higher by Rs. 1 lakh) is required. [ICAI Ref: Page 4.16, Scenario 8]',
      note: 'A change in estimate is not a change in policy, but requires disclosure if material.',
      difficulty: 'INTERMEDIATE',
      paraRef: 'Para 11/22',
      sortOrder: 2
    },
    {
      title: 'A3: Non-provision of Overdue Interest',
      scenario: 'XYZ Company is undergoing liquidity issues and has overdue Inter-Corporate Deposits (ICDs). Lenders have claimed interest for the overdue period. The company did not provide for interest in the P&L, but disclosed the claims as "claims against the company not acknowledged as debt" in the notes.',
      working: 'Principal loan is unpaid.\nInterest is claimed by lenders.\nNo waiver has been granted by the lenders.\nAccrual concept requires providing for expenses as they are incurred.',
      answer: 'The treatment is incorrect. Accrual is a fundamental accounting assumption. Since the principal is outstanding and lenders have not waived the interest, interest liability continues to accrue. XYZ must provide for the overdue interest liability in the P&L based on a reasonable estimate. Disclosing it merely as a contingent liability in notes violates the Accrual assumption. [ICAI Ref: Page 4.10, Illustration 3]',
      note: 'Disclosure as a contingent liability cannot remedy a failure to accrue an actual liability.',
      difficulty: 'ADVANCED',
      paraRef: 'Para 10(c)/23',
      sortOrder: 3
    },
    {
      title: 'A4: Hire Purchase Asset Recording',
      scenario: 'A company acquires a heavy transport vehicle under a Hire Purchase agreement. The company pays instalments over 5 years. Although legal ownership remains with the seller until the last instalment, the company capitalizes the vehicle and depreciates it from the date of possession.',
      working: 'Legal title: With vendor until final payment.\nEconomic substance: Hirer uses the vehicle, incurs maintenance cost, and gets economic benefits.\nSelection consideration: Substance over Form.',
      answer: 'The capitalization of the asset is correct. Under the principle of Substance over Form, the economic reality and substance of a transaction must govern its presentation, not merely its legal form. The hirer enjoys all risks and rewards of ownership. Therefore, recording the asset and providing depreciation is correct. [ICAI Ref: Page 4.5, Para 17(b)]',
      note: 'Economic substance overrides the legal form of ownership.',
      difficulty: 'BEGINNER',
      paraRef: 'Para 17(b)',
      sortOrder: 4
    },
    {
      title: 'A5: Capitalizing Construction Borrowing Costs',
      scenario: 'A power generating company incurs interest costs of Rs. 15 lakhs on loans specifically taken to construct a power plant. The company capitalizes this interest as part of the plant cost during the construction period.',
      working: 'Asset is a qualifying asset under construction.\nInterest is directly attributable to construction.\nPolicy choice: Capitalization vs Expensing.',
      answer: 'The policy of capitalizing borrowing costs during construction is correct and in accordance with AS 16. Under AS 1, the company must disclose this policy in one place (usually Note 1 under Fixed Assets/Borrowing Costs) to allow users to appreciate how the cost of plant has been determined. [ICAI Ref: Page 4.4, Para 14(b)]',
      note: 'Accounting policies adopted for construction period costs must be explicitly disclosed.',
      difficulty: 'BEGINNER',
      paraRef: 'Para 14(b)',
      sortOrder: 5
    },
    {
      title: 'A6: Foreign Currency Translation Policy',
      scenario: 'An IT company has multiple foreign branches. It translates foreign branch financial statements using the average exchange rate for revenue/expenses and closing exchange rate for assets/liabilities. It discloses this translation policy in the notes.',
      working: 'Translation method used: Average rate for income statement, closing rate for balance sheet.\nAS 11 requirements.\nAS 1 disclosure requirement.',
      answer: 'The disclosure of the translation policy is correct and mandatory. Since foreign currency translation is an area of policy diversity, AS 1 requires the specific translation rates used to be disclosed in the notes to accounts. [ICAI Ref: Page 4.1, Para 4]',
      note: 'Translation policies for foreign operations must be clearly disclosed.',
      difficulty: 'INTERMEDIATE',
      paraRef: 'Para 14(c)',
      sortOrder: 6
    },
    {
      title: 'A7: Change in Gratuity Provision Policy',
      scenario: 'A retail firm has been recognizing gratuity payments to retired employees on a cash basis (pay-as-you-go). In the current year, it decides to adopt actuarial valuation and makes a provision of Rs. 8 lakhs in the accounts.',
      working: 'Old method: Cash basis.\nNew method: Actuarial basis (Accrual).\nImpact of change = Rs. 8 lakhs reduction in profit.',
      answer: 'This is a change in accounting policy to align with the Accrual assumption and AS 15. The firm must disclose the change, the reason (transition to accrual/actuarial basis), and the current period impact. The note should read: "The company has changed its policy of accounting for retirement benefits from a cash basis to an actuarial basis. This change has reduced the current year profit by Rs. 8 lakhs." [ICAI Ref: Page 4.4, Para 14(g)]',
      note: 'Moving from cash to accrual is a correction/alignment of a fundamental assumption.',
      difficulty: 'ADVANCED',
      paraRef: 'Para 14(g)/22',
      sortOrder: 7
    },
    {
      title: 'A8: Provision for Investment Diminution',
      scenario: 'A company holds long-term investments. Due to a market crash, the market value of these investments falls below cost by Rs. 10 crores. The company determines this decline is permanent and provides Rs. 10 crores in the P&L.',
      working: 'Cost = Rs. 50 crores.\nMarket Value = Rs. 40 crores.\nDecline is permanent.\nPrudence requirement.',
      answer: 'The company must make the provision under the principle of Prudence. The provision for diminution must be disclosed. The note must clearly state the valuation base (cost less permanent diminution) and the amount of provision (Rs. 10 crores) reducing the profit. [ICAI Ref: Page 4.9, Illustration 2]',
      note: 'Prudence requires writing down assets when decline is permanent.',
      difficulty: 'INTERMEDIATE',
      paraRef: 'Para 17(a)/14(f)',
      sortOrder: 8
    },
    {
      title: 'A9: Materiality in Expensing Assets',
      scenario: 'A newly set up software firm purchases 50 office calculators for Rs. 500 each. The calculators have a useful life of 3 years. The firm expenses the entire Rs. 25,000 immediately in the P&L instead of capitalizing them as fixed assets.',
      working: 'Asset cost = Rs. 500 per unit.\nTotal cost = Rs. 25,000.\nUseful life = 3 years.\nTotal assets of the firm = Rs. 10 crores.',
      answer: 'The treatment is correct. Under the principle of Materiality, items of small value that do not materially affect the user\'s understanding can be expensed immediately rather than depreciated over their life. Capitalizing and tracking 50 small items would involve administrative efforts out of proportion to the utility of the information. [ICAI Ref: Page 4.1, Page 4.5, Para 17(c)]',
      note: 'Materiality allows practical deviation from strict capitalization rules.',
      difficulty: 'BEGINNER',
      paraRef: 'Para 17(c)',
      sortOrder: 9
    },
    {
      title: 'A10: Revenue Recognition on Consignment',
      scenario: 'A manufacturer ships goods worth Rs. 5 lakhs to a consignment agent. The agent has not yet sold the goods. The manufacturer records the shipment as sales revenue since the goods have left the factory.',
      working: 'Goods shipped to agent.\nOwnership remains with the manufacturer.\nSales to third parties have not occurred.',
      answer: 'The treatment is incorrect. Revenue should be recognized only when the risk and rewards are transferred to a third party (i.e., when the agent sells the goods to customers). Recording the shipment as sales violates the Accrual assumption. The goods must be included in the manufacturer\'s closing inventory at cost. [ICAI Ref: Page 4.3, Para 10(c)]',
      note: 'Consignment shipment is not a sale until the agent sells the goods.',
      difficulty: 'BEGINNER',
      paraRef: 'Para 10(c)',
      sortOrder: 10
    },
    {
      title: 'A11: Change in Depreciation Method (AS 1 vs AS 5)',
      scenario: 'A company changes its depreciation method from Straight Line Method (SLM) to Written Down Value (WDV) method for its plant and machinery. The change increases the depreciation charge for the year by Rs. 5 lakhs.',
      working: 'Change in method of depreciation.\nOld method = SLM.\nNew method = WDV.\nMaterial effect = Rs. 5 lakhs.',
      answer: 'The change in depreciation method is treated as a change in accounting estimate under modern standards, but AS 1 requires disclosure because it represents a change in the method of applying an accounting principle. The company must disclose the fact of the change, the reason, and the financial impact (profit is lower by Rs. 5 lakhs). [ICAI Ref: Page 4.4, Para 14(a)]',
      note: 'Change in depreciation method must be quantified and disclosed.',
      difficulty: 'INTERMEDIATE',
      paraRef: 'Para 14(a)/22',
      sortOrder: 11
    },
    {
      title: 'A12: Disclosing Scattered Policies',
      scenario: 'An enterprise discloses its inventory policy under Note 5 (Inventory), its depreciation policy under Note 8 (Fixed Assets), and its revenue policy under Note 15 (Revenue). It does not have a consolidated accounting policies note.',
      working: 'Policies are disclosed in scattered places.\nNo central Note 1 for policies.',
      answer: 'This is a violation of AS 1. AS 1 requires that all significant accounting policies should be disclosed in one place (typically Note 1) rather than scattered across various statements and schedules, to facilitate a proper understanding. [ICAI Ref: Page 4.5, Para 20, Para 25]',
      note: 'Policies must be grouped in a single place to ensure easy readability.',
      difficulty: 'BEGINNER',
      paraRef: 'Para 20/25',
      sortOrder: 12
    },
    {
      title: 'A13: Going Concern Violation - Environmental Closure',
      scenario: 'The pollution control board orders the immediate closure of a chemical manufacturing company\'s only operating plant. The company has no other business lines and is unlikely to get permission to restart. The directors prepare accounts on a historical cost basis.',
      working: 'Only operating plant closed.\nNo future operations possible.\nHistorical cost basis used for valuation.',
      answer: 'The treatment is incorrect. Since the plant is closed permanently, the Going Concern assumption is violated. The financial statements must not be prepared on a historical cost/going concern basis. Instead, assets must be valued at net realizable value (liquidation value) and liabilities at settlement amounts. The fact that the going concern assumption is not followed must be prominently disclosed. [ICAI Ref: Page 4.2, Para 10(a), Para 27]',
      note: 'When going concern is lost, historical cost basis is no longer valid.',
      difficulty: 'ADVANCED',
      paraRef: 'Para 10(a)/27',
      sortOrder: 13
    },
    {
      title: 'A14: Partnership Firm applicability',
      scenario: 'A partnership firm with an annual turnover of Rs. 15 crores prepares general purpose financial statements. The partners decide not to disclose their accounting policies since they are a non-corporate entity.',
      working: 'Turnover = Rs. 15 crores.\nNon-corporate entity.\nDecision: No disclosure of policies.',
      answer: 'The partners\' decision is incorrect. AS 1 applies to all general purpose financial statements, regardless of whether the entity is corporate or non-corporate. Since the firm prepares general purpose financial statements, it must disclose all significant accounting policies adopted in one place. [ICAI Ref: Page 4.1, Page 4.2, Para 1]',
      note: 'AS 1 is mandatory for all entities preparing general purpose accounts.',
      difficulty: 'BEGINNER',
      paraRef: 'Para 1',
      sortOrder: 14
    },
    {
      title: 'A15: Patent Lawsuit Contingent Liability',
      scenario: 'A competitor has filed a patent infringement lawsuit against a tech company claiming Rs. 2 crores in damages. The company\'s lawyers estimate a 40% chance of losing. The company discloses this as a contingent liability in the notes and does not make a provision.',
      working: 'Lawsuit amount = Rs. 2 crores.\nProbability of loss = 40% (not probable, but possible).\nProvision vs Disclosure.',
      answer: 'The treatment is correct. Under the principle of Prudence, a provision is made only for known liabilities and losses where the loss is probable. Since the loss is only possible (40%), making a disclosure by way of a contingent liability note under AS 1 (Para 14j) is correct. [ICAI Ref: Page 4.4, Para 14(j)]',
      note: 'Contingent liabilities must be disclosed in accordance with policy guidelines.',
      difficulty: 'INTERMEDIATE',
      paraRef: 'Para 14(j)/17(a)',
      sortOrder: 15
    },
    {
      title: 'A16: Fixed Assets Revaluation Policy',
      scenario: 'A real estate company decides to revalue its office building from Rs. 5 crores to Rs. 8 crores based on a valuer\'s report. It credits Rs. 3 crores to the Revaluation Reserve and discloses the revaluation policy in the notes.',
      working: 'Revaluation gain = Rs. 3 crores.\nGain is credited to Revaluation Reserve (not P&L).\nDisclosure of policy.',
      answer: 'The treatment and disclosure are correct. The revaluation gain is not a realized profit, so under Prudence, it cannot be credited to the P&L. Crediting it to Revaluation Reserve is correct. Under AS 1, the policy of valuing fixed assets at revalued amounts (instead of historical cost) must be disclosed. [ICAI Ref: Page 4.4, Para 14(i)]',
      note: 'Valuation basis of fixed assets (cost vs. revaluation) must be disclosed.',
      difficulty: 'BEGINNER',
      paraRef: 'Para 14(i)/17(a)',
      sortOrder: 16
    },
    {
      title: 'F17: ICAI Q1 - FIFO to Weighted Average Method',
      scenario: 'M/s Prashant Ltd. changes its inventory valuation method from FIFO to weighted average method. Under FIFO, closing inventory as of 31.03.20X2 was Rs. 1,63,000. Under weighted average, it is Rs. 1,47,000. Realisable value of inventory is Rs. 1,95,000.',
      working: 'Realisable value (Rs. 1.95L) > Costs. Hence cost is the valuation base.\nFIFO Cost = Rs. 1,63,000.\nWeighted Average Cost = Rs. 1,47,000.\nFinancial impact = Rs. 16,000 reduction in inventory value and current profit.',
      answer: 'As per AS 1, Prashant Ltd. must disclose the change in policy. The disclosure note: "The company values its inventory at lower of cost and net realizable value. In the current year, the company has changed its inventory valuation method from FIFO to Weighted Average to better reflect the consumption pattern. This change has reduced the current year profit and the value of closing inventory by Rs. 16,000." [ICAI Ref: Page 4.9, Illustration 1]',
      note: 'This is a direct ICAI Illustration demonstrating policy change disclosure.',
      difficulty: 'INTERMEDIATE',
      paraRef: 'Para 22/26',
      sortOrder: 17
    },
    {
      title: 'F18: ICAI Q2 - Prime Cost to Works Cost',
      scenario: 'Jagannath Ltd. projected Rs. 40 crores surplus in rights issue but is facing a Rs. 10 crores deficit. The board decides to: (i) Value year-end inventory at works cost (Rs. 50 crores) instead of prime cost (Rs. 30 crores). (ii) Provide Rs. 10 crores for permanent diminution in investment value that occurred over 5 years.',
      working: 'Change in valuation base from prime cost to works cost.\nInventory value increase = Rs. 20 crores (Rs. 50 cr - Rs. 30 cr).\nInvestment provision = Rs. 10 crores (reduces profit by Rs. 10 crores).',
      answer: 'Note on accounts should disclose:\n1. "During the year, the company changed its method of inventory valuation from prime cost to works cost to reflect capital-intensive production. This change has increased closing inventory and profit by Rs. 20 crores."\n2. "The company has provided Rs. 10 crores for permanent diminution in the value of investments which took place over 5 years, reducing the profit by Rs. 10 crores." [ICAI Ref: Page 4.9, Illustration 2]',
      note: 'Change in policy increases profit by Rs. 20 crores, while prudence provision reduces profit by Rs. 10 crores.',
      difficulty: 'ADVANCED',
      paraRef: 'Para 22/17(a)',
      sortOrder: 18
    },
    {
      title: 'F19: ICAI Q3 - Special Court Liquid Assets Claim',
      scenario: 'XYZ Company is engaged in financial services. Its assets are blocked in claims in a Special Court. Lenders claimed interest on overdue Inter-Corporate Deposits (ICDs). The company did not provide for interest from due date to repayment date, claiming it is a contingent liability ("claim not acknowledged as debt").',
      working: 'Interest on unpaid principal is legally/contractually due.\nNo waiver has been obtained.\nAccrual is a fundamental assumption.',
      answer: 'The treatment is incorrect. Accrual is a fundamental accounting assumption. The interest continues to accrue until the principal is repaid. Non-provision of overdue interest violates the accrual assumption. XYZ must estimate the interest liability on a reasonable basis and provide for it in the P&L. Notes disclosure cannot cure this violation. [ICAI Ref: Page 4.10, Illustration 3]',
      note: 'Auditor must qualify the report if the company refuses to make this provision.',
      difficulty: 'ADVANCED',
      paraRef: 'Para 10(c)/23',
      sortOrder: 19
    },
    {
      title: 'F20: ICAI Scenario - Wrong Depreciation and Disclosure',
      scenario: 'A company charging depreciation at 10% on machinery under WDV method realizes that the actual wear and tear warrants 20%. The company continues to charge 10% and discloses in Note 1: "The company charges depreciation at 10% which is lower than the actual wear and tear of 20%."',
      working: 'Under-provision of depreciation by 10%.\nWrong accounting treatment is followed.\nNotes disclosure is made.',
      answer: 'The treatment is incorrect. Under the principle of Prudence, adequate provision must be made for depreciation to reflect the true consumption of the asset. Under AS 1 Para 23, disclosure of accounting policies or changes therein cannot remedy a wrong or inappropriate treatment. The auditor must qualify the report. [ICAI Ref: Page 4.5, Para 23]',
      note: 'Disclosure does not cure wrong accounting.',
      difficulty: 'INTERMEDIATE',
      paraRef: 'Para 23',
      sortOrder: 20
    },
    {
      title: 'F21: ICAI Scenario - Future Material Effect Policy Change',
      scenario: 'A firm changes its depreciation method for office equipment from WDV to SLM in the current year. The impact on the current year\'s financial statements is Rs. 2,000 (which is completely immaterial). However, in future years, as the asset base expands, the impact will be highly material.',
      working: 'Current year impact = Rs. 2,000 (immaterial).\nFuture years impact = Material.\nPolicy change occurred.',
      answer: 'As per AS 1 Para 22, if a change is made in accounting policies which has no material effect in the current period but is reasonably expected to have a material effect in later periods, the fact of the change must be disclosed in the period in which the change is adopted. Therefore, the company must disclose the fact of the change in the current year. [ICAI Ref: Page 4.5, Page 4.6, Para 22]',
      note: 'Future material changes must be flagged in the year of adoption.',
      difficulty: 'BEGINNER',
      paraRef: 'Para 22',
      sortOrder: 21
    },
    {
      title: 'F22: ICAI Scenario - Going Concern Valuation Base',
      scenario: 'M/s Small & Co. has lost its major customer which accounted for 90% of its sales. The company has defaults on bank loans and is facing winding-up petitions. The management believes they can find new customers and prepares accounts on a going concern basis.',
      working: 'Loss of 90% sales.\nDefaults on loans and winding-up petitions.\nNo realistic prospect of recovery.',
      answer: 'The going concern assumption is highly questionable. In the absence of realistic alternatives, the assumption is violated. Financial statements should be prepared on a net realizable value basis. If prepared on a going concern basis, the auditor must qualification or issue an adverse opinion due to incorrect valuation of assets and liabilities. [ICAI Ref: Page 4.2, Para 10(a), Para 27]',
      note: 'The auditor must check for indicators of going concern failure.',
      difficulty: 'ADVANCED',
      paraRef: 'Para 10(a)/27',
      sortOrder: 22
    },
    {
      title: 'F23: ICAI Scenario - Consistency in Depreciation rates',
      scenario: 'A logistics company changes its depreciation rates on trucks from 15% to 25% in Year 1, back to 15% in Year 2, and to 20% in Year 3, to match its fluctuations in taxable income.',
      working: 'Depreciation rates changed frequently.\nReason: Tax planning, not better presentation.\nConsistency assumption.',
      answer: 'This is a violation of the Consistency assumption. Accounting policies are assumed to be consistent from one period to another. A change is permitted only for statutory compliance, accounting standards compliance, or for a more appropriate presentation. Changing rates to manipulate taxable income is invalid, and the auditor must qualify the report. [ICAI Ref: Page 4.2, Para 10(b)]',
      note: 'Consistency is essential for period-over-period comparability.',
      difficulty: 'INTERMEDIATE',
      paraRef: 'Para 10(b)',
      sortOrder: 23
    },
    {
      title: 'F24: ICAI Scenario - Cash Basis of Accounting',
      scenario: 'A trading enterprise prepares its P&L on a cash basis, recognizing sales when cash is received and purchases when payment is made. It states in Note 1 that "financial statements are prepared on a cash basis."',
      working: 'Cash basis of accounting followed.\nAccrual is a fundamental assumption.',
      answer: 'This is a violation of the fundamental accounting assumption of Accrual. Under AS 1, if a fundamental assumption is not followed, the fact must be disclosed. However, companies governed by the Companies Act 2013 are contractually/statutorily mandated to follow the accrual system. For non-corporate entities, though permitted, they must explicitly state this deviation under AS 1. [ICAI Ref: Page 4.3, Page 4.6, Para 27]',
      note: 'Violation of fundamental assumptions requires prominent disclosures.',
      difficulty: 'BEGINNER',
      paraRef: 'Para 27',
      sortOrder: 24
    },
    {
      title: 'F25: ICAI Scenario - Provision for Warranties',
      scenario: 'A consumer electronics company offers a 2-year warranty on all products. Based on historical trends, 2% of products require repairs. The company estimates this cost and makes a provision of Rs. 4 lakhs in the P&L.',
      working: 'Warranty period = 2 years.\nHistorical repair rate = 2%.\nProvision amount = Rs. 4 lakhs.\nPrudence assumption.',
      answer: 'The provision is correct and required under the principle of Prudence. Since warranty claims are a known liability arising from current year sales, provision must be made for all known liabilities even if the exact amount is an estimate. Recognizing the sales now but ignoring the corresponding warranty costs would also violate the matching concept. [ICAI Ref: Page 4.4, Para 17(a)]',
      note: 'Prudence requires estimating and recognizing probable future costs.',
      difficulty: 'INTERMEDIATE',
      paraRef: 'Para 17(a)',
      sortOrder: 25
    },
    {
      title: 'F26: ICAI Scenario - Lease Classification (Substance over Form)',
      scenario: 'A manufacturing firm takes a machine on lease for 10 years, which represents its entire useful life. The lease agreement states that ownership remains with the lessor. The firm discloses the lease payments as rent expense and does not capitalize the asset.',
      working: 'Lease term = 10 years (100% of useful life).\nOwnership legal title = Lessor.\nEconomic substance = Hirer/Lessee bears all risks/rewards.',
      answer: 'The treatment is incorrect under the principle of Substance over Form. Since the lease covers the entire useful life of the machine, the economic substance is that of a purchase (Finance Lease). Under AS 19 (backed by AS 1), the lessee must capitalize the machine and record the lease liability. Treating it as an operating lease with rental disclosure violates substance over form. [ICAI Ref: Page 4.5, Para 17(b)]',
      note: 'Legal lease title does not override economic substance.',
      difficulty: 'ADVANCED',
      paraRef: 'Para 17(b)',
      sortOrder: 26
    },
    {
      title: 'A17: Provision for Expected Credit Losses (Prudence)',
      scenario: 'A wholesale distributor has a trade receivable balance of Rs. 15 lakhs from a large customer who is facing severe cash flow insolvency issues. The distributor\'s management argues that they should not make any provision until the customer actually files for liquidation.',
      working: 'Receivable outstanding = Rs. 15 lakhs.\nCustomer solvency = Severe credit distress.\nProvisioning decision under Prudence.',
      answer: 'The company must make a provision for doubtful debts. Under the principle of Prudence, provision must be made for all known liabilities and losses, even if the exact loss amount cannot be determined with absolute certainty. Waiting for formal liquidation files to be submitted violates prudence because it fails to recognize a highly probable loss already existing at the balance sheet date. [ICAI Ref: Page 4.5, Para 17(a)]',
      note: 'Known losses must be provided for, even if they are estimates.',
      difficulty: 'INTERMEDIATE',
      paraRef: 'Para 17(a)',
      sortOrder: 27
    },
    {
      title: 'A18: Research and Development Expenditure (Accounting Policy Choice)',
      scenario: 'A biotech enterprise incurs Rs. 50 lakhs on lab-level testing of a new healthcare supplement. The chemical formula shows promise, but clinical approvals have not yet been obtained. The company capitalizes this cost as "Research & Development Asset".',
      working: 'Expenditure = Rs. 50 lakhs.\nPhase: Preliminary laboratory testing.\nFeasibility = Clinical approvals pending.',
      answer: 'The capitalization of research cost is incorrect. In accordance with AS 26 (and backed by AS 1), research expenditures must be expensed immediately as incurred because technical/commercial feasibility is not yet established. The enterprise must adopt and disclose a policy of expensing research costs immediately and only capitalizing development costs when specific feasibility criteria are met. [ICAI Ref: Page 4.4, Para 14(a)]',
      note: 'Policies for research vs. development must be clearly defined and disclosed.',
      difficulty: 'INTERMEDIATE',
      paraRef: 'Para 14(a)',
      sortOrder: 28
    },
    {
      title: 'A19: Change in Valuation Method of Gold / Precious Metals (Policy Change)',
      scenario: 'A premium jewelry boutique has been using the FIFO method to value its gold inventory. In the current year, to match the unique value and individual sourcing of specific gold ornaments, it changes its policy to the Specific Identification method.',
      working: 'Old method = FIFO.\nNew method = Specific Identification.\nFinancial impact = Closing inventory valuation increases by Rs. 3.2 lakhs.',
      answer: 'This is a valid change in accounting policy because the Specific Identification method results in a more appropriate presentation of jewelry inventory. Under AS 1, the boutique must disclose the fact of this policy change, the justification (more appropriate tracking of unique items), and the financial impact (closing inventory and net profit increased by Rs. 3.2 lakhs). [ICAI Ref: Page 4.5, Para 22]',
      note: 'Justified policy changes must disclose the rationale and financial effect.',
      difficulty: 'INTERMEDIATE',
      paraRef: 'Para 22',
      sortOrder: 29
    },
    {
      title: 'A20: Recognition of Revenue from Long-term Service Contracts (Accrual)',
      scenario: 'An IT support company signs a 3-year enterprise server maintenance contract for an upfront payment of Rs. 3.6 lakhs. The company records the entire Rs. 3.6 lakhs as sales revenue in Month 1 of Year 1.',
      working: 'Upfront cash receipt = Rs. 3.6 lakhs.\nService duration = 3 years.\nRevenue recognition timing.',
      answer: 'The revenue recognition is incorrect. Under the fundamental accounting assumption of Accrual, revenues must be recognized as they are earned (proportionate completion) and matched with the period of service delivery. Recognizing the entire upfront fee in Month 1 violates the accrual concept. The company must record the fee as deferred revenue and recognize Rs. 1.2 lakhs per year over the 3-year term. [ICAI Ref: Page 4.3, Para 10(c)]',
      note: 'Service contract revenues must be accrued over the service period.',
      difficulty: 'BEGINNER',
      paraRef: 'Para 10(c)',
      sortOrder: 30
    },
    {
      title: 'F27: ICAI Scenario - Government Grant Policy change (AS 12 ref)',
      scenario: 'M/s National Infrastructure Ltd. changes its policy of accounting for government grants for capital assets. Previously, it deducted grants from the asset cost. In the current year, it decides to credit grants to Deferred Income and amortize them to the P&L over the asset\'s useful life.',
      working: 'Old policy = Cost deduction method.\nNew policy = Deferred income method.\nPolicy change under AS 1 / AS 12.',
      answer: 'This constitutes a change in accounting policy. M/s National Infrastructure Ltd. must disclose the fact of the change in its Note 1 of significant accounting policies, outlining the reasons for the transition (conformity to alternative standard presentation) and the financial impact on the carrying value of fixed assets and deferred grant reserves. [ICAI Ref: Page 4.4, Para 14(d)]',
      note: 'Changes in presentation of capital grants represent a policy change.',
      difficulty: 'INTERMEDIATE',
      paraRef: 'Para 14(d)/22',
      sortOrder: 31
    },
    {
      title: 'F28: ICAI Scenario - Prior Period Item disclosure (AS 5 ref)',
      scenario: 'A company notices that it made a mathematical error in calculating depreciation for the year ended 31.03.20X1, resulting in an under-provision of Rs. 12 lakhs. In the accounts for the year ended 31.03.20X2, it increases the current year\'s depreciation by Rs. 12 lakhs without separate disclosure.',
      working: 'Mathematical error in 20X1 = Rs. 12 lakhs.\nAdjustment = Mixed with current depreciation in 20X2.\nNo separate disclosure.',
      answer: 'The treatment is incorrect. The under-provision of depreciation is a prior period error, which must be separately disclosed in the statement of Profit & Loss of the current year (as per AS 5 and backed by AS 1 materiality rules) so that users can appreciate the true current year performance. Merely blending it with current depreciation violates the transparency and disclosure requirements of AS 1. [ICAI Ref: Page 4.5, Page 4.9, Para 17(c)/23]',
      note: 'Prior period items must be separately presented and disclosed.',
      difficulty: 'ADVANCED',
      paraRef: 'Para 17(c)/23',
      sortOrder: 32
    }
  ];

  for (const ill of illustrationsData) {
    await prisma.entryIllustration.create({
      data: {
        entryId,
        illusTitle: ill.title,
        illusScenario: ill.scenario,
        illusWorking: ill.working,
        illusAnswer: ill.answer,
        illusNote: ill.note,
        illusDifficulty: ill.difficulty,
        illusParaRef: ill.paraRef,
        illusFsImpact: {},
        sortOrder: ill.sortOrder
      }
    });
  }
  console.log('26 Illustrations created.');

  // 5. Create 12 FAQ / Questions (Theory, Practical, Exam, Audit, Interview, Conceptual)
  const faqsData = [
    {
      question: 'What are the three fundamental accounting assumptions recognized by AS 1? Describe them briefly.',
      answer: 'Accounting Standard (AS) 1 recognizes three fundamental accounting assumptions:\n1. Going Concern: The enterprise is normally viewed as continuing in operation for the foreseeable future with no intention/necessity of liquidation or material scale reduction. [Para 10(a)]\n2. Consistency: Accounting policies are assumed to be consistent from one period to another. [Para 10(b)]\n3. Accrual: Revenues and costs are recognized as they are earned or incurred and recorded in the financial statements of the periods to which they relate. [Para 10(c)] [ICAI Ref: Theoretical Question 4, Page 4.13/4.14]',
      sourceRef: 'Para 9-10',
      category: 'GENERAL'
    },
    {
      question: 'What are the disclosure requirements if the fundamental accounting assumptions are followed vs not followed?',
      answer: '1. If followed: Specific disclosure is NOT required, as their acceptance and use are assumed by default.\n2. If NOT followed: The fact that an assumption is not followed must be specifically and clearly disclosed in the financial statements along with the reasons. [ICAI Ref: Para 27, Page 4.6]',
      sourceRef: 'Para 27',
      category: 'DISCLOSURE'
    },
    {
      question: 'What are the major considerations that govern the selection and application of accounting policies?',
      answer: 'The primary consideration is that financial statements should represent a true and fair view. To achieve this, the major considerations are:\n1. Prudence: Exhibiting caution in estimates, not anticipating profits, but providing for all known liabilities/losses.\n2. Substance over Form: Governing accounting treatment by economic substance and reality, and not merely by legal form.\n3. Materiality: Disclosing all items whose knowledge might influence the decisions of users. [ICAI Ref: Para 16-17, Pages 4.4-4.5]',
      sourceRef: 'Para 16-17',
      category: 'GENERAL'
    },
    {
      question: 'Can the disclosure of accounting policies remedy a wrong or inappropriate treatment of an item in the accounts?',
      answer: 'No. AS 1 Para 23 explicitly states that disclosure of accounting policies or of changes therein cannot remedy a wrong or inappropriate treatment of the item in the accounts. For example, if a revenue expense is wrongly capitalized, disclosing it in the notes does not make it correct under GAAP. [ICAI Ref: Para 23, Page 4.5]',
      sourceRef: 'Para 23',
      category: 'EXAM'
    },
    {
      question: 'Under what circumstances can an enterprise change its accounting policy?',
      answer: 'An enterprise can change its accounting policy only if the change is:\n1. Required by statute (law).\n2. Required for compliance with an accounting standard.\n3. Restructures presentation such that it results in a more appropriate preparation and presentation of financial statements. [ICAI Ref: Page 4.2/4.9]',
      sourceRef: 'Para 10(b) / 22',
      category: 'PRACTICAL'
    },
    {
      question: 'What must be disclosed in the case of a change in accounting policy?',
      answer: '1. If the change has a material effect in the current period: The fact of the change must be disclosed, and the amount by which any item in the financial statements is affected should be disclosed to the extent ascertainable. If the amount is not ascertainable, the fact must be indicated.\n2. If the change has no material effect in the current period but is reasonably expected to have a material effect in later periods: The fact of the change must be disclosed in the period in which the change is adopted. [ICAI Ref: Para 22, Page 4.5]',
      sourceRef: 'Para 22 / 26',
      category: 'DISCLOSURE'
    },
    {
      question: 'What is the auditor\'s duty and responsibility regarding fundamental accounting assumptions under AS 1?',
      answer: 'The auditor must verify whether the fundamental assumptions are followed. If the company has followed them, the auditor does not need to mention them in the audit report. However, if the company deviates from any assumption (e.g. follows cash basis instead of accrual, or values assets at cost despite going concern failure) and does not disclose it, the auditor must qualify the audit report and specifically report the violation. [ICAI Ref: Para 9, Para 27, Page 4.2/4.6]',
      sourceRef: 'Para 27',
      category: 'EXAM'
    },
    {
      question: 'How do you differentiate between an accounting principle and a method of applying that principle?',
      answer: '1. Accounting Principle: The broad rule or conceptual basis of accounting (e.g., valuation of inventory at cost or net realizable value, whichever is lower).\n2. Method of Application: The practical formula or technique used to apply the principle (e.g., using the FIFO method or the Weighted Average method to calculate the cost of inventory). AS 1 requires the disclosure of both. [ICAI Ref: Para 11, Page 4.3]',
      sourceRef: 'Para 11',
      category: 'GENERAL'
    },
    {
      question: 'Give 5 examples of common areas where different accounting policies are encountered in business.',
      answer: 'Common areas of policy diversity listed in AS 1 are:\n1. Methods of depreciation, depletion, and amortization.\n2. Valuation of inventories (FIFO, Weighted Average, etc.).\n3. Treatment of expenditure during construction.\n4. Conversion or translation of foreign currency items.\n5. Valuation of investments (cost, market value, permanent diminution). [ICAI Ref: Para 14, Page 4.4]',
      sourceRef: 'Para 14',
      category: 'PRACTICAL'
    },
    {
      question: 'Why is the disclosure of accounting policies mandatory at one place?',
      answer: 'If disclosures are scattered over several statements, schedules, and notes, it becomes difficult for the reader to form a cohesive picture of the accounting framework used. Disclosing all significant policies in one place (usually Note 1) ensures proper understanding, improves readability, and facilitates easy comparison. [ICAI Ref: Para 20, Para 25, Page 4.5]',
      sourceRef: 'Para 20 / 25',
      category: 'DISCLOSURE'
    },
    {
      question: 'Is a change in the rate of depreciation or method of provision a change in accounting policy?',
      answer: 'No. A change in the rate of depreciation due to a change in the useful life estimate of an asset, or a change in the method of provisioning (e.g. from aging method to technical evaluation for inventories) represents a change in accounting estimate, not a change in accounting policy. The policy of providing depreciation or inventory provision remains, only the estimate changes. [ICAI Ref: Page 4.16, Scenario 8]',
      sourceRef: 'Para 11 / 22',
      category: 'PRACTICAL'
    },
    {
      question: 'How does AS 1 address the loss of comparability caused by diverse accounting policies across entities?',
      answer: 'Since complete uniformity is impossible due to diverse business circumstances, AS 1 addresses this by making the disclosure of significant accounting policies mandatory. By reviewing these disclosures in Note 1, stakeholders, analysts, and investors can make necessary adjustments to normalize and compare the financial results of different entities. [ICAI Ref: Page 4.16, Scenario 7]',
      sourceRef: 'Para 8 / 12',
      category: 'GENERAL'
    }
  ];

  for (const faq of faqsData) {
    await prisma.entryFAQ.create({
      data: {
        entryId,
        faqQuestion: faq.question,
        faqAnswer: faq.answer,
        faqSourceRef: faq.sourceRef,
        faqCategory: faq.category
      }
    });
  }
  console.log('12 FAQs created.');

  // 6. Update Video resource URL
  const videoResource = await prisma.entryResource.findFirst({
    where: {
      entryId,
      resourceType: 'VIDEO'
    }
  });

  if (videoResource) {
    await prisma.entryResource.update({
      where: { id: videoResource.id },
      data: {
        resourceUrl: 'https://youtu.be/nyA1pKuWVWY?si=f35kIwb3MIJlD0h5',
        resourceTitle: 'AS 1 — Disclosure of Accounting Policies Class Lecture',
        sourceType: 'EXTERNAL'
      }
    });
    console.log('Video resource URL updated to:', 'https://youtu.be/nyA1pKuWVWY?si=f35kIwb3MIJlD0h5');
  } else {
    await prisma.entryResource.create({
      data: {
        entryId,
        resourceType: 'VIDEO',
        resourceTitle: 'AS 1 — Disclosure of Accounting Policies Class Lecture',
        resourceUrl: 'https://youtu.be/nyA1pKuWVWY?si=f35kIwb3MIJlD0h5',
        sourceType: 'EXTERNAL',
        sortOrder: 0
      }
    });
    console.log('Created video resource.');
  }

  console.log('AS 1 DB content rebuild successfully completed!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
