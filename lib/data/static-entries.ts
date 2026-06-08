/**
 * lib/data/static-entries.ts
 *
 * Static demonstration entries used before the database is connected.
 * When Prisma + PostgreSQL is live, the functions in lib/queries.ts
 * will replace these with real DB calls. The data shape matches the
 * SearchResult and GlossaryTerm interfaces exactly so pages need
 * zero changes at migration time.
 */

import type { SearchResult } from '@/lib/types'

// ─── Search index ─────────────────────────────────────────────────────────────
// These entries are fed into Fuse.js for client-side full-text search.
// In production: generated from DB at build time via generateStaticParams.

export const SEARCH_INDEX: SearchResult[] = [
  // D01 — Foundations
  {
    id: 1,
    title: 'Accrual Concept',
    slug: 'foundations/concepts-conventions/accrual-concept',
    type: 'CONCEPT',
    summary: 'Revenue and expenses are recognised when earned or incurred, not when cash is received or paid.',
    domainCode: 'D01',
    domainName: 'Accounting Fundamentals',
    domainSlug: 'foundations',
    domainColorHex: '#2D5BE3',
  },
  {
    id: 2,
    title: 'Going Concern Concept',
    slug: 'foundations/concepts-conventions/going-concern',
    type: 'CONCEPT',
    summary: 'The assumption that a business will continue operating indefinitely in the foreseeable future.',
    domainCode: 'D01',
    domainName: 'Accounting Fundamentals',
    domainSlug: 'foundations',
    domainColorHex: '#2D5BE3',
  },
  {
    id: 3,
    title: 'Consistency Concept',
    slug: 'foundations/concepts-conventions/consistency',
    type: 'CONCEPT',
    summary: 'The same accounting policies must be applied consistently from one period to the next.',
    domainCode: 'D01',
    domainName: 'Accounting Fundamentals',
    domainSlug: 'foundations',
    domainColorHex: '#2D5BE3',
  },
  {
    id: 4,
    title: 'Matching Principle',
    slug: 'foundations/concepts-conventions/matching-principle',
    type: 'CONCEPT',
    summary: 'Expenses must be matched and recognised in the same period as the revenues they helped generate.',
    domainCode: 'D01',
    domainName: 'Accounting Fundamentals',
    domainSlug: 'foundations',
    domainColorHex: '#2D5BE3',
  },
  {
    id: 5,
    title: 'Double Entry System',
    slug: 'foundations/double-entry-system/double-entry',
    type: 'CONCEPT',
    summary: 'Every transaction affects at least two accounts — one debit and one credit of equal amount.',
    domainCode: 'D01',
    domainName: 'Accounting Fundamentals',
    domainSlug: 'foundations',
    domainColorHex: '#2D5BE3',
  },
  {
    id: 6,
    title: 'Depreciation — SLM Method',
    slug: 'foundations/depreciation-accounting/slm',
    type: 'CONCEPT',
    summary: 'Straight-Line Method charges an equal amount of depreciation each year over the asset\'s useful life.',
    domainCode: 'D01',
    domainName: 'Accounting Fundamentals',
    domainSlug: 'foundations',
    domainColorHex: '#2D5BE3',
  },
  {
    id: 7,
    title: 'Depreciation — WDV Method',
    slug: 'foundations/depreciation-accounting/wdv',
    type: 'CONCEPT',
    summary: 'Written Down Value method charges depreciation at a fixed percentage on the reducing book value each year.',
    domainCode: 'D01',
    domainName: 'Accounting Fundamentals',
    domainSlug: 'foundations',
    domainColorHex: '#2D5BE3',
  },
  {
    id: 8,
    title: 'Journal Entry — Depreciation (SLM)',
    slug: 'foundations/depreciation-accounting/je-depreciation-slm',
    type: 'JOURNAL_ENTRY',
    summary: 'Dr Depreciation A/c, Cr Accumulated Depreciation / Asset A/c. Being depreciation charged for the year.',
    domainCode: 'D01',
    domainName: 'Accounting Fundamentals',
    domainSlug: 'foundations',
    domainColorHex: '#2D5BE3',
  },
  // D02 — AS Standards
  {
    id: 10,
    title: 'AS 1 — Disclosure of Accounting Policies',
    slug: 'standards/as/as-1',
    type: 'STANDARD',
    summary: 'Requires disclosure of all significant accounting policies adopted in preparing financial statements.',
    domainCode: 'D02',
    domainName: 'AS Standards',
    domainSlug: 'standards/as',
    domainColorHex: '#0F6B5E',
  },
  {
    id: 11,
    title: 'AS 2 — Valuation of Inventories',
    slug: 'standards/as/as-2',
    type: 'STANDARD',
    summary: 'Prescribes treatment for inventories — cost determination (FIFO/WA), NRV, and disclosure requirements.',
    domainCode: 'D02',
    domainName: 'AS Standards',
    domainSlug: 'standards/as',
    domainColorHex: '#0F6B5E',
  },
  {
    id: 12,
    title: 'AS 3 — Cash Flow Statements',
    slug: 'standards/as/as-3',
    type: 'STANDARD',
    summary: 'Prescribes how to prepare and present a Cash Flow Statement under direct and indirect methods.',
    domainCode: 'D02',
    domainName: 'AS Standards',
    domainSlug: 'standards/as',
    domainColorHex: '#0F6B5E',
  },
  {
    id: 13,
    title: 'AS 6 — Depreciation Accounting',
    slug: 'standards/as/as-6',
    type: 'STANDARD',
    summary: 'Governs the accounting treatment for depreciation — selection of methods, useful life, and change of method.',
    domainCode: 'D02',
    domainName: 'AS Standards',
    domainSlug: 'standards/as',
    domainColorHex: '#0F6B5E',
  },
  {
    id: 14,
    title: 'AS 9 — Revenue Recognition',
    slug: 'standards/as/as-9',
    type: 'STANDARD',
    summary: 'Prescribes when revenue from sale of goods and rendering of services should be recognised.',
    domainCode: 'D02',
    domainName: 'AS Standards',
    domainSlug: 'standards/as',
    domainColorHex: '#0F6B5E',
  },
  {
    id: 15,
    title: 'AS 10 — Property, Plant and Equipment',
    slug: 'standards/as/as-10',
    type: 'STANDARD',
    summary: 'Prescribes recognition, measurement, and derecognition of property, plant and equipment (fixed assets).',
    domainCode: 'D02',
    domainName: 'AS Standards',
    domainSlug: 'standards/as',
    domainColorHex: '#0F6B5E',
  },
  // D03 — Ind AS
  {
    id: 20,
    title: 'Ind AS 1 — Presentation of Financial Statements',
    slug: 'standards/ind-as/ind-as-1',
    type: 'STANDARD',
    summary: 'Prescribes the basis for presentation of general purpose financial statements under Ind AS / IFRS.',
    domainCode: 'D03',
    domainName: 'Ind AS Standards',
    domainSlug: 'standards/ind-as',
    domainColorHex: '#6B3FA0',
  },
  {
    id: 21,
    title: 'Ind AS 2 — Inventories',
    slug: 'standards/ind-as/ind-as-2',
    type: 'STANDARD',
    summary: 'Prescribes the accounting treatment for inventories under IFRS-converged standards.',
    domainCode: 'D03',
    domainName: 'Ind AS Standards',
    domainSlug: 'standards/ind-as',
    domainColorHex: '#6B3FA0',
  },
  {
    id: 22,
    title: 'Ind AS 115 — Revenue from Contracts with Customers',
    slug: 'standards/ind-as/ind-as-115',
    type: 'STANDARD',
    summary: 'The 5-step model for revenue recognition — replaces earlier revenue standards across all industries.',
    domainCode: 'D03',
    domainName: 'Ind AS Standards',
    domainSlug: 'standards/ind-as',
    domainColorHex: '#6B3FA0',
  },
  {
    id: 23,
    title: 'Ind AS 116 — Leases',
    slug: 'standards/ind-as/ind-as-116',
    type: 'STANDARD',
    summary: 'Requires lessees to recognise a right-of-use asset and lease liability for all leases (except short-term / low-value).',
    domainCode: 'D03',
    domainName: 'Ind AS Standards',
    domainSlug: 'standards/ind-as',
    domainColorHex: '#6B3FA0',
  },
  // D04 — Company Accounts
  {
    id: 30,
    title: 'Issue of Shares at Premium',
    slug: 'company-accounts/share-capital/issue-at-premium',
    type: 'CONCEPT',
    summary: 'Shares issued at a price above face value. The excess over face value is credited to Securities Premium Reserve.',
    domainCode: 'D04',
    domainName: 'Company Accounts',
    domainSlug: 'company-accounts',
    domainColorHex: '#B45309',
  },
  {
    id: 31,
    title: 'Forfeiture and Reissue of Shares',
    slug: 'company-accounts/share-capital/forfeiture-reissue',
    type: 'CONCEPT',
    summary: 'Accounting treatment when shares are forfeited for non-payment of calls and subsequently reissued.',
    domainCode: 'D04',
    domainName: 'Company Accounts',
    domainSlug: 'company-accounts',
    domainColorHex: '#B45309',
  },
  // D05 — Partnership
  {
    id: 40,
    title: 'Admission of a Partner — Goodwill Treatment',
    slug: 'partnership-accounts/admission/goodwill',
    type: 'CONCEPT',
    summary: 'Journal entries for goodwill on admission of a partner under premium method and revaluation method.',
    domainCode: 'D05',
    domainName: 'Partnership Accounts',
    domainSlug: 'partnership-accounts',
    domainColorHex: '#1A7A4A',
  },
  {
    id: 41,
    title: 'Sacrifice Ratio and Gaining Ratio',
    slug: 'partnership-accounts/admission/sacrifice-gaining-ratio',
    type: 'CONCEPT',
    summary: 'Calculation of sacrifice ratio on admission and gaining ratio on retirement of a partner.',
    domainCode: 'D05',
    domainName: 'Partnership Accounts',
    domainSlug: 'partnership-accounts',
    domainColorHex: '#1A7A4A',
  },
]

// ─── Glossary terms ───────────────────────────────────────────────────────────

export interface GlossaryEntry {
  id: number
  term: string
  termSlug: string
  shortDefinition: string
  authoritySource: string | null
  authorityUrl: string | null
  relatedTermSlugs: string[]
  standardRefs: string[]
  examLevelTags: string[]
  letter: string
}

export const GLOSSARY_TERMS: GlossaryEntry[] = [
  {
    id: 1,
    term: 'Accrual',
    termSlug: 'accrual',
    shortDefinition: 'Recognition of revenue or expense in the period it is earned or incurred, regardless of cash flow timing.',
    authoritySource: 'AS 1 — Disclosure of Accounting Policies, Para 10',
    authorityUrl: 'https://www.icai.org/post/accounting-standards-as-1',
    relatedTermSlugs: ['matching-principle', 'prepaid-expense', 'outstanding-expense'],
    standardRefs: ['AS 1'],
    examLevelTags: ['CA Foundation', 'CA Intermediate'],
    letter: 'A',
  },
  {
    id: 2,
    term: 'Amortisation',
    termSlug: 'amortisation',
    shortDefinition: 'Systematic allocation of the cost of an intangible asset over its useful life. Equivalent to depreciation for tangibles.',
    authoritySource: 'AS 26 — Intangible Assets',
    authorityUrl: null,
    relatedTermSlugs: ['depreciation', 'intangible-asset'],
    standardRefs: ['AS 26', 'Ind AS 38'],
    examLevelTags: ['CA Intermediate', 'CA Final'],
    letter: 'A',
  },
  {
    id: 3,
    term: 'Assets',
    termSlug: 'assets',
    shortDefinition: 'Resources controlled by an entity as a result of past events from which future economic benefits are expected to flow.',
    authoritySource: 'ICAI Conceptual Framework',
    authorityUrl: null,
    relatedTermSlugs: ['liabilities', 'equity', 'balance-sheet'],
    standardRefs: ['AS 1', 'Ind AS 1'],
    examLevelTags: ['CA Foundation'],
    letter: 'A',
  },
  {
    id: 4,
    term: 'Balance Sheet',
    termSlug: 'balance-sheet',
    shortDefinition: 'A financial statement showing the financial position of an entity — assets, liabilities, and equity — at a specific date.',
    authoritySource: 'Companies Act 2013, Schedule III',
    authorityUrl: 'https://www.mca.gov.in',
    relatedTermSlugs: ['assets', 'liabilities', 'equity'],
    standardRefs: ['AS 1', 'Ind AS 1'],
    examLevelTags: ['CA Foundation', 'CA Intermediate'],
    letter: 'B',
  },
  {
    id: 5,
    term: 'Book Value',
    termSlug: 'book-value',
    shortDefinition: 'The net amount at which an asset is carried in the books — cost less accumulated depreciation and impairment losses.',
    authoritySource: 'AS 10 — Property, Plant and Equipment',
    authorityUrl: null,
    relatedTermSlugs: ['depreciation', 'carrying-amount', 'fair-value'],
    standardRefs: ['AS 10', 'Ind AS 16'],
    examLevelTags: ['CA Foundation', 'CA Intermediate'],
    letter: 'B',
  },
  {
    id: 6,
    term: 'Capital Expenditure',
    termSlug: 'capital-expenditure',
    shortDefinition: 'Expenditure that creates or enhances a long-term asset. Capitalised to the Balance Sheet, not expensed to P&L.',
    authoritySource: 'AS 10 — Property, Plant and Equipment',
    authorityUrl: null,
    relatedTermSlugs: ['revenue-expenditure', 'fixed-assets', 'depreciation'],
    standardRefs: ['AS 10', 'Ind AS 16'],
    examLevelTags: ['CA Foundation', 'CA Intermediate'],
    letter: 'C',
  },
  {
    id: 7,
    term: 'Conservatism',
    termSlug: 'conservatism',
    shortDefinition: 'Also called Prudence. Anticipate all losses but recognise profits only when realised. Do not overstate assets or understate liabilities.',
    authoritySource: 'AS 1 — Disclosure of Accounting Policies',
    authorityUrl: null,
    relatedTermSlugs: ['prudence', 'provisions', 'realisation-concept'],
    standardRefs: ['AS 1', 'Ind AS 1'],
    examLevelTags: ['CA Foundation', 'CA Intermediate'],
    letter: 'C',
  },
  {
    id: 8,
    term: 'Contingent Liability',
    termSlug: 'contingent-liability',
    shortDefinition: 'A possible obligation arising from past events whose existence will be confirmed only by occurrence of uncertain future events not wholly within the entity\'s control.',
    authoritySource: 'AS 29 — Provisions, Contingent Liabilities and Contingent Assets, Para 10',
    authorityUrl: null,
    relatedTermSlugs: ['provisions', 'contingent-asset'],
    standardRefs: ['AS 29', 'Ind AS 37'],
    examLevelTags: ['CA Intermediate', 'CA Final'],
    letter: 'C',
  },
  {
    id: 9,
    term: 'Debentures',
    termSlug: 'debentures',
    shortDefinition: 'Long-term debt instruments issued by companies to raise capital. Carry a fixed rate of interest and are generally secured on the company\'s assets.',
    authoritySource: 'Companies Act 2013, Section 2(30)',
    authorityUrl: null,
    relatedTermSlugs: ['bonds', 'share-capital', 'interest'],
    standardRefs: ['AS 18', 'Ind AS 109'],
    examLevelTags: ['CA Foundation', 'CA Intermediate'],
    letter: 'D',
  },
  {
    id: 10,
    term: 'Depreciation',
    termSlug: 'depreciation',
    shortDefinition: 'Systematic allocation of the depreciable amount of a tangible asset over its useful life. Reduces book value each period.',
    authoritySource: 'AS 6 — Depreciation Accounting',
    authorityUrl: null,
    relatedTermSlugs: ['amortisation', 'useful-life', 'slm', 'wdv', 'book-value'],
    standardRefs: ['AS 6', 'AS 10', 'Ind AS 16'],
    examLevelTags: ['CA Foundation', 'CA Intermediate'],
    letter: 'D',
  },
  {
    id: 11,
    term: 'Equity',
    termSlug: 'equity',
    shortDefinition: 'The residual interest in the assets of an entity after deducting all its liabilities. Also called net assets or shareholders\' funds.',
    authoritySource: 'ICAI Conceptual Framework',
    authorityUrl: null,
    relatedTermSlugs: ['share-capital', 'reserves', 'retained-earnings'],
    standardRefs: ['AS 1', 'Ind AS 1'],
    examLevelTags: ['CA Foundation'],
    letter: 'E',
  },
  {
    id: 12,
    term: 'Fair Value',
    termSlug: 'fair-value',
    shortDefinition: 'The price that would be received to sell an asset or paid to transfer a liability in an orderly transaction between market participants at the measurement date.',
    authoritySource: 'Ind AS 113 — Fair Value Measurement, Para 9',
    authorityUrl: null,
    relatedTermSlugs: ['book-value', 'market-value', 'carrying-amount'],
    standardRefs: ['Ind AS 113'],
    examLevelTags: ['CA Final'],
    letter: 'F',
  },
  {
    id: 13,
    term: 'Going Concern',
    termSlug: 'going-concern',
    shortDefinition: 'One of the fundamental accounting assumptions — the enterprise will continue operating in the foreseeable future with no intention or necessity to liquidate.',
    authoritySource: 'AS 1 — Disclosure of Accounting Policies, Para 10',
    authorityUrl: 'https://www.icai.org/post/accounting-standards-as-1',
    relatedTermSlugs: ['accrual', 'consistency', 'liquidation'],
    standardRefs: ['AS 1', 'Ind AS 1'],
    examLevelTags: ['CA Foundation', 'CA Intermediate'],
    letter: 'G',
  },
  {
    id: 14,
    term: 'Goodwill',
    termSlug: 'goodwill',
    shortDefinition: 'The excess of the purchase price of a business over the fair value of its identifiable net assets. Represents reputation, brand, and earning capacity.',
    authoritySource: 'AS 14 — Accounting for Amalgamations',
    authorityUrl: null,
    relatedTermSlugs: ['intangible-asset', 'amortisation', 'business-combination'],
    standardRefs: ['AS 14', 'Ind AS 103'],
    examLevelTags: ['CA Intermediate', 'CA Final'],
    letter: 'G',
  },
  {
    id: 15,
    term: 'Impairment',
    termSlug: 'impairment',
    shortDefinition: 'A reduction in the recoverable amount of an asset below its carrying amount. Recognised as an impairment loss in the P&L.',
    authoritySource: 'AS 28 — Impairment of Assets',
    authorityUrl: null,
    relatedTermSlugs: ['book-value', 'fair-value', 'recoverable-amount'],
    standardRefs: ['AS 28', 'Ind AS 36'],
    examLevelTags: ['CA Final'],
    letter: 'I',
  },
  {
    id: 16,
    term: 'Inventory',
    termSlug: 'inventory',
    shortDefinition: 'Assets held for sale in the ordinary course of business, in the process of production, or as materials/supplies to be consumed.',
    authoritySource: 'AS 2 — Valuation of Inventories, Para 3',
    authorityUrl: null,
    relatedTermSlugs: ['stock', 'cost-of-goods-sold', 'fifo', 'weighted-average'],
    standardRefs: ['AS 2', 'Ind AS 2'],
    examLevelTags: ['CA Foundation', 'CA Intermediate'],
    letter: 'I',
  },
  {
    id: 17,
    term: 'Lease',
    termSlug: 'lease',
    shortDefinition: 'An agreement conveying the right to use an asset for an agreed period in return for payment. Classified as finance or operating lease under AS 19.',
    authoritySource: 'AS 19 — Leases, Para 3',
    authorityUrl: null,
    relatedTermSlugs: ['finance-lease', 'operating-lease', 'right-of-use-asset'],
    standardRefs: ['AS 19', 'Ind AS 116'],
    examLevelTags: ['CA Intermediate', 'CA Final'],
    letter: 'L',
  },
  {
    id: 18,
    term: 'Liabilities',
    termSlug: 'liabilities',
    shortDefinition: 'Present obligations of the entity arising from past events, the settlement of which is expected to result in an outflow of economic resources.',
    authoritySource: 'ICAI Conceptual Framework',
    authorityUrl: null,
    relatedTermSlugs: ['current-liabilities', 'provisions', 'debentures'],
    standardRefs: ['AS 1', 'Ind AS 1'],
    examLevelTags: ['CA Foundation'],
    letter: 'L',
  },
  {
    id: 19,
    term: 'Matching Principle',
    termSlug: 'matching-principle',
    shortDefinition: 'Expenses should be recognised in the same period as the revenues they helped generate. A corollary of the accrual concept.',
    authoritySource: 'AS 1 — Disclosure of Accounting Policies',
    authorityUrl: null,
    relatedTermSlugs: ['accrual', 'revenue-recognition', 'period-costs'],
    standardRefs: ['AS 1', 'AS 9'],
    examLevelTags: ['CA Foundation', 'CA Intermediate'],
    letter: 'M',
  },
  {
    id: 20,
    term: 'Net Realisable Value (NRV)',
    termSlug: 'nrv',
    shortDefinition: 'The estimated selling price of an asset in the ordinary course of business less the estimated costs of completion and selling expenses.',
    authoritySource: 'AS 2 — Valuation of Inventories, Para 4',
    authorityUrl: null,
    relatedTermSlugs: ['inventory', 'lower-of-cost-or-nrv', 'fair-value'],
    standardRefs: ['AS 2', 'Ind AS 2'],
    examLevelTags: ['CA Foundation', 'CA Intermediate'],
    letter: 'N',
  },
  {
    id: 21,
    term: 'Prepaid Expense',
    termSlug: 'prepaid-expense',
    shortDefinition: 'An expense paid in advance for a future period. Treated as a current asset on the Balance Sheet.',
    authoritySource: 'AS 1 — Accrual Assumption',
    authorityUrl: null,
    relatedTermSlugs: ['accrual', 'outstanding-expense', 'deferred-expense'],
    standardRefs: ['AS 1'],
    examLevelTags: ['CA Foundation', 'CA Intermediate'],
    letter: 'P',
  },
  {
    id: 22,
    term: 'Provision',
    termSlug: 'provision',
    shortDefinition: 'A liability of uncertain timing or amount. Recognised when: a present obligation exists, outflow is probable, and amount can be reliably estimated.',
    authoritySource: 'AS 29 — Provisions, Contingent Liabilities and Contingent Assets, Para 14',
    authorityUrl: null,
    relatedTermSlugs: ['contingent-liability', 'reserves', 'bad-debt'],
    standardRefs: ['AS 29', 'Ind AS 37'],
    examLevelTags: ['CA Intermediate', 'CA Final'],
    letter: 'P',
  },
  {
    id: 23,
    term: 'Prudence',
    termSlug: 'prudence',
    shortDefinition: 'Also called Conservatism. The exercise of caution — recognise losses as soon as probable, but recognise profits only when certain.',
    authoritySource: 'AS 1 — Disclosure of Accounting Policies',
    authorityUrl: null,
    relatedTermSlugs: ['conservatism', 'provisions', 'lower-of-cost-or-nrv'],
    standardRefs: ['AS 1'],
    examLevelTags: ['CA Foundation', 'CA Intermediate'],
    letter: 'P',
  },
  {
    id: 24,
    term: 'Related Party',
    termSlug: 'related-party',
    shortDefinition: 'A party that has the ability to control, significantly influence, or exercise joint control over the reporting entity, or vice versa.',
    authoritySource: 'AS 18 — Related Party Disclosures, Para 3',
    authorityUrl: null,
    relatedTermSlugs: ['associate', 'subsidiary', 'key-management-personnel'],
    standardRefs: ['AS 18', 'Ind AS 24'],
    examLevelTags: ['CA Intermediate', 'CA Final'],
    letter: 'R',
  },
  {
    id: 25,
    term: 'Revenue Recognition',
    termSlug: 'revenue-recognition',
    shortDefinition: 'The principle that revenue is recognised when earned and measurable — when significant risks and rewards have been transferred to the buyer.',
    authoritySource: 'AS 9 — Revenue Recognition',
    authorityUrl: null,
    relatedTermSlugs: ['accrual', 'matching-principle', 'deferred-revenue'],
    standardRefs: ['AS 9', 'Ind AS 115'],
    examLevelTags: ['CA Foundation', 'CA Intermediate', 'CA Final'],
    letter: 'R',
  },
  {
    id: 26,
    term: 'Substance over Form',
    termSlug: 'substance-over-form',
    shortDefinition: 'Transactions should be accounted for according to their economic substance rather than their legal form.',
    authoritySource: 'ICAI Conceptual Framework; Ind AS 1',
    authorityUrl: null,
    relatedTermSlugs: ['finance-lease', 'off-balance-sheet', 'accounting-policies'],
    standardRefs: ['Ind AS 1'],
    examLevelTags: ['CA Final'],
    letter: 'S',
  },
  {
    id: 27,
    term: 'True and Fair View',
    termSlug: 'true-and-fair-view',
    shortDefinition: 'Financial statements must give a true and fair view of the financial position and performance — overriding principle of financial reporting.',
    authoritySource: 'Companies Act 2013, Section 129',
    authorityUrl: 'https://www.mca.gov.in',
    relatedTermSlugs: ['accounting-policies', 'disclosure', 'fair-presentation'],
    standardRefs: ['AS 1', 'Ind AS 1'],
    examLevelTags: ['CA Foundation', 'CA Intermediate'],
    letter: 'T',
  },
  {
    id: 28,
    term: 'Working Capital',
    termSlug: 'working-capital',
    shortDefinition: 'Current Assets minus Current Liabilities. Measures the short-term liquidity available to fund day-to-day operations.',
    authoritySource: 'ICAI Study Material — Financial Analysis',
    authorityUrl: null,
    relatedTermSlugs: ['current-assets', 'current-liabilities', 'liquidity'],
    standardRefs: [],
    examLevelTags: ['CA Foundation', 'CA Intermediate'],
    letter: 'W',
  },
]

// ─── Utility: get all available letters ──────────────────────────────────────

export function getAvailableLetters(): string[] {
  const letters = new Set(GLOSSARY_TERMS.map((t) => t.letter))
  return Array.from(letters).sort()
}

// ─── Utility: group terms by letter ──────────────────────────────────────────

export function groupTermsByLetter(): Record<string, GlossaryEntry[]> {
  const groups: Record<string, GlossaryEntry[]> = {}
  for (const term of GLOSSARY_TERMS) {
    if (!groups[term.letter]) groups[term.letter] = []
    groups[term.letter].push(term)
  }
  // Sort terms within each group alphabetically
  for (const letter of Object.keys(groups)) {
    groups[letter].sort((a, b) => a.term.localeCompare(b.term))
  }
  return groups
}

// ─── Full Topic Entry: Accrual Concept ───────────────────────────────────────

export const ACCRUAL_CONCEPT_ENTRY = {
  id: 1,
  entryTitle: 'Accrual Concept',
  entrySlug: 'accrual-concept',
  entryType: 'CONCEPT' as const,
  summary:
    'Revenue and expenses are recognised when they are earned or incurred, not when cash is actually received or paid. This is the foundation of modern financial reporting.',
  verificationLevel: 'VERIFIED' as const,
  authorityPrimary: 'AS 1 — Disclosure of Accounting Policies (ICAI)',
  authorityPrimaryUrl: 'https://www.icai.org/post/accounting-standards-as-1',
  authoritySecondary: 'Also supported by the ICAI Conceptual Framework and the Companies Act 2013 Schedule III.',
  wordCount: 680,
  lastReviewedAt: '2024-03-15',
  examLevelTags: ['CA Foundation', 'CA Intermediate'],
  domain: {
    domainCode: 'D01',
    domainName: 'Accounting Fundamentals',
    domainSlug: 'foundations',
    domainColorHex: '#2D5BE3',
  },
  subdomain: {
    subdomainName: 'Accounting Concepts & Conventions',
    subdomainSlug: 'concepts-conventions',
  },
  sections: [
    {
      id: 'definition',
      heading: 'Definition',
      level: 1 as const,
      body: 'The Accrual Concept (also called the Accrual Basis of Accounting) states that revenue must be recognised in the accounting period in which it is earned — regardless of whether cash has been received — and expenses must be recognised in the period in which they are incurred — regardless of whether cash has been paid.',
    },
    {
      id: 'why-it-matters',
      heading: 'Why It Matters',
      level: 1 as const,
      body: 'Without the accrual concept, financial statements would merely reflect cash movements and would fail to represent the true economic activity of a business. A company that delivers goods in March but collects cash in April would show no revenue in March — making its March profit grossly understated. Accrual accounting corrects this by matching revenues with the expenses incurred to generate them.',
    },
    {
      id: 'recognition-rules',
      heading: 'Recognition Rules',
      level: 1 as const,
      body: 'Revenue is recognised when it is earned — typically when the goods are delivered or the service is performed. Expenses are recognised when they are incurred — that is, when the benefit is received, not when the invoice is paid.',
      subsections: [
        {
          id: 'revenue-recognition',
          heading: 'Revenue Recognition',
          level: 2 as const,
          body: 'Under AS 9 (Revenue Recognition), revenue from the sale of goods is recognised when significant risks and rewards of ownership have been transferred to the buyer. Revenue from services is recognised based on the stage of completion method.',
        },
        {
          id: 'expense-recognition',
          heading: 'Expense Recognition',
          level: 2 as const,
          body: 'Expenses are matched against the revenues they help generate. This is called the Matching Principle — a corollary of the accrual concept. Prepaid expenses are carried as assets; accrued expenses are carried as liabilities.',
        },
      ],
    },
    {
      id: 'practical-examples',
      heading: 'Practical Application',
      level: 1 as const,
      body: 'Consider a consultancy firm that completes a project in March 2024 but receives payment in May 2024. Under the accrual concept, ₹5,00,000 of revenue is recognised in March 2024 (when earned). The debtor is created in March. When cash arrives in May, the debtor is cleared — no additional revenue is recognised at that point.',
    },
    {
      id: 'contrast-cash-basis',
      heading: 'Contrast with Cash Basis',
      level: 1 as const,
      body: 'Under the cash basis, only ₹0 revenue would be shown in March, and ₹5,00,000 in May — misrepresenting the economic reality. The Companies Act 2013 mandates accrual basis for all companies. The cash basis is only permitted for very small businesses and certain professionals under specific conditions.',
    },
    {
      id: 'journal-entries',
      heading: 'Journal Entry Treatment',
      level: 1 as const,
      body: 'When revenue is earned but not yet received (accrued income), a debtor is created. When an expense is incurred but not yet paid (accrued expense / outstanding expense), a creditor is created.',
    },
    {
      id: 'exam-focus',
      heading: 'Exam Focus',
      level: 1 as const,
      body: 'In CA exams, the accrual concept is frequently tested through adjustments in final accounts — specifically outstanding expenses, prepaid expenses, accrued income, and income received in advance. Make sure you can pass each transaction through the correct journal entry and Balance Sheet treatment.',
    },
  ],
  keyPoints: [
    'Revenue is recognised when earned, not when received.',
    'Expenses are recognised when incurred, not when paid.',
    'Creates debtors for accrued income and creditors for outstanding expenses.',
    'Mandated by the Companies Act 2013 for all companies.',
    'Forms the basis of the Matching Principle.',
  ],
  formula: {
    formula: 'Accrual Revenue = Cash Received ± Change in Debtors\nAccrual Expense = Cash Paid ± Change in Creditors / Prepayments',
    label: 'Accrual Adjustments',
    note: 'Use these relationships to convert Cash Basis figures to Accrual Basis when given in exam problems.',
  },
  notes: [
    {
      type: 'IMPORTANT' as const,
      title: 'Exam Trap',
      body: 'Do not confuse "accrued income" (earned, not received) with "income received in advance" (received, not earned). They are opposite adjustments on the Balance Sheet.',
    },
    {
      type: 'NOTE' as const,
      body: 'The accrual concept is one of the two fundamental accounting assumptions under AS 1 — the other being the Going Concern assumption.',
    },
  ],
  relatedEntries: [
    {
      id: 2,
      entryTitle: 'Matching Principle',
      entrySlug: 'matching-principle',
      entryType: 'CONCEPT',
      domain: { domainCode: 'D01', domainSlug: 'foundations', domainColorHex: '#2D5BE3' },
    },
    {
      id: 3,
      entryTitle: 'AS 1 — Disclosure of Accounting Policies',
      entrySlug: 'as-1',
      entryType: 'STANDARD',
      domain: { domainCode: 'D02', domainSlug: 'standards/as', domainColorHex: '#0F6B5E' },
    },
    {
      id: 4,
      entryTitle: 'Going Concern Concept',
      entrySlug: 'going-concern',
      entryType: 'CONCEPT',
      domain: { domainCode: 'D01', domainSlug: 'foundations', domainColorHex: '#2D5BE3' },
    },
    {
      id: 5,
      entryTitle: 'Outstanding Expenses — Journal Entry',
      entrySlug: 'outstanding-expenses-je',
      entryType: 'JOURNAL_ENTRY',
      domain: { domainCode: 'D01', domainSlug: 'foundations', domainColorHex: '#2D5BE3' },
    },
  ],
  faqs: [
    {
      id: 1,
      faqQuestion: 'Is the accrual concept mandatory for all companies in India?',
      faqAnswer:
        'Yes. Schedule III of the Companies Act 2013 requires all companies to prepare financial statements on the accrual basis. Individual proprietorships and partnership firms may use cash basis, but company accounts must be on accrual basis.',
      faqSourceRef: 'Companies Act 2013, Schedule III; AS 1 Para 10',
    },
    {
      id: 2,
      faqQuestion: 'What is the difference between the accrual concept and the matching principle?',
      faqAnswer:
        'The accrual concept determines WHEN to recognise revenue and expenses — when earned/incurred. The matching principle then says HOW to recognise expenses — by matching them to the revenues they generated in the same period. Matching is a consequence/application of the accrual concept.',
    },
    {
      id: 3,
      faqQuestion: 'How do I adjust for accrued expenses in final accounts?',
      faqAnswer:
        'Add outstanding (accrued) expenses to the P&L expense figure and show the same amount as a current liability (Outstanding Expense) on the Balance Sheet. Debit the expense account and Credit the Outstanding Expense account.',
      faqSourceRef: 'AS 1; ICAI Study Material — Accounting Fundamentals',
    },
  ],
}

// ─── Full AS Standard: AS 1 ──────────────────────────────────────────────────

export const AS_1_ENTRY = {
  entryTitle: 'AS 1 — Disclosure of Accounting Policies',
  entrySlug: 'as-1',
  summary:
    'AS 1 requires enterprises to disclose all significant accounting policies adopted in preparing and presenting financial statements, so that readers can understand the basis on which they are prepared.',
  verificationLevel: 'VERIFIED' as const,
  wordCount: 1200,
  lastReviewedAt: '2024-03-01',
  authorityPrimary: 'ICAI — Accounting Standard 1',
  authorityPrimaryUrl: 'https://www.icai.org/post/accounting-standards-as-1',
  standardCode: 'AS 1',
  standardFramework: 'AS' as const,
  standardStatus: 'ACTIVE' as const,
  issuingBody: 'ICAI (Institute of Chartered Accountants of India)',
  dateIssued: '1979-01-01',
  dateEffective: '1991-04-01',
  applicabilitySummary: 'Mandatory for all enterprises preparing financial statements under Indian GAAP (AS framework). Not applicable to Ind AS adopters.',
  quickBullets: [
    { icon: '🏢', label: 'Mandatory for', desc: 'All Indian GAAP entities' },
    { icon: '📋', label: 'Requires', desc: 'Disclosure of significant policies' },
    { icon: '🔁', label: 'Change of policy', desc: 'Must be disclosed with reason and impact' },
  ],
  objective: {
    text: 'The objective of AS 1 is to ensure that an enterprise discloses all significant accounting policies followed in preparing and presenting financial statements so that financial statements are understandable and comparable.',
    sourcePara: 'Para 5',
    commentary: 'The key word is "significant" — only policies that materially affect the financial statements need disclosure. Trivial policies need not be listed. The disclosure makes financial statements more transparent and aids comparison between enterprises.',
    keyIssues: [
      'What constitutes a "significant" accounting policy?',
      'How should a change in accounting policy be disclosed?',
      'What are the fundamental accounting assumptions under AS 1?',
    ],
  },
  scope: {
    statement: 'AS 1 applies to all financial statements prepared in accordance with Indian GAAP (the AS framework). It applies to all levels of entities — large, medium, and small — that prepare formal financial statements.',
    included: [
      'All companies preparing financial statements under the Companies Act 2013 (using AS framework)',
      'Firms, LLPs, and other entities preparing AS-compliant financial statements',
      'Entities preparing consolidated financial statements',
    ],
    excluded: [
      'Entities preparing financial statements under Ind AS framework (use Ind AS 1 instead)',
      'Cash-basis bookkeepers not preparing formal financial statements',
    ],
  },
  definitions: [
    {
      term: 'Accounting Policies',
      paraRef: 'Para 3',
      officialText:
        '"Accounting policies refer to the specific accounting principles and the methods of applying those principles adopted by an enterprise in the preparation and presentation of financial statements."',
      plainExplanation:
        'The specific rules, conventions, and methods a business uses — e.g., which depreciation method (SLM or WDV), inventory valuation method (FIFO or Weighted Average), revenue recognition timing, etc.',
    },
    {
      term: 'Fundamental Accounting Assumptions',
      paraRef: 'Para 10',
      officialText:
        '"Certain fundamental accounting assumptions underlie the preparation and presentation of financial statements. They are usually not specifically stated because their acceptance and use are assumed. Disclosure is necessary if they are not followed."',
      plainExplanation:
        'The three fundamental assumptions are: (1) Going Concern — business will continue operating, (2) Consistency — same policies applied period to period, (3) Accrual — revenues/expenses recognised when earned/incurred, not on cash basis.',
    },
  ],
  recognitionRules:
    'AS 1 does not itself prescribe recognition rules for specific items. Instead, it requires that whatever recognition policy an enterprise adopts must be disclosed clearly in the notes to financial statements. Recognition policies for revenue, expenses, assets, and liabilities are governed by the specific relevant standards (AS 2, AS 6, AS 9, AS 10, etc.). The accounting policies note under AS 1 must summarise the policies adopted from all applicable standards.',
  measurementRules:
    'AS 1 does not prescribe measurement bases. However, it acknowledges four measurement bases: Historical Cost, Current Cost, Realisable Value, and Present Value. The disclosure of policies chosen should clearly indicate which measurement basis is used for each material category of asset, liability, revenue, and expense.',
  disclosureGroups: [
    {
      heading: 'Mandatory Disclosures in Notes',
      paraRange: 'Para 22–24',
      items: [
        { text: 'All significant accounting policies adopted in preparing the financial statements' },
        { text: 'The measurement basis (or bases) used — e.g., historical cost' },
        { text: 'Each specific accounting policy that is relevant to understanding the financial statements' },
        { text: 'Whether the three fundamental assumptions (Going Concern, Consistency, Accrual) have been followed; if not, the departure must be disclosed with reason', isConditional: true },
      ],
    },
    {
      heading: 'Change in Accounting Policy Disclosures',
      paraRange: 'Para 25–27',
      items: [
        { text: 'Nature of the change in accounting policy' },
        { text: 'Reason for the change' },
        { text: 'Quantified financial effect of the change — impact on profit for the period' },
        { text: 'If quantification of effect is not practicable, that fact must be disclosed', isConditional: true },
      ],
    },
  ],
  journalEntryNotes: [
    {
      scenario: 'Change in Depreciation Method (SLM → WDV) — Effect on Reserves',
      treatment:
        'If changing from SLM to WDV, the cumulative excess/shortfall in depreciation charged compared to WDV from inception is adjusted against Retained Earnings / General Reserve. The difference is debited to Retained Earnings and credited to Asset / Accumulated Depreciation.',
    },
    {
      scenario: 'Accrual of Expenses at Year End (AS 1 Accrual Assumption)',
      treatment:
        'Outstanding wages: Debit Wages A/c, Credit Outstanding Wages A/c. The outstanding wages appear as a current liability in the Balance Sheet under "Other Current Liabilities".',
    },
  ],
  comparison: {
    std2Title: 'Ind AS 1 — Presentation of Financial Statements',
    rows: [
      { criterion: 'Objective', as: 'Disclosure of accounting policies only', indAs: 'Complete framework for presentation of financial statements', isDifferent: true },
      { criterion: 'Fundamental Assumptions', as: '3 assumptions: Going Concern, Consistency, Accrual', indAs: 'Only Going Concern is a specific assumption; others are part of the conceptual framework', isDifferent: true },
      { criterion: 'Change of Policy', as: 'Must disclose reason and quantified impact; prospective application default', indAs: 'Retrospective application required unless impracticable (AS 8 / Ind AS 8 governs this)', isDifferent: true },
      { criterion: 'Applicability', as: 'All Indian GAAP entities', indAs: 'Listed companies and large unlisted companies', isDifferent: false },
      { criterion: 'Fair Value Measurement', as: 'Not addressed', indAs: 'Pervasive — Ind AS 113 Fair Value Measurement applies', isDifferent: true },
    ],
  },
  relatedStandards: [
    { code: 'AS 2', title: 'Valuation of Inventories', slug: 'as-2', color: '#0F6B5E', framework: 'AS' },
    { code: 'AS 5', title: 'Net Profit for the Period / Prior Period Items', slug: 'as-5', color: '#0F6B5E', framework: 'AS' },
    { code: 'AS 6', title: 'Depreciation Accounting', slug: 'as-6', color: '#0F6B5E', framework: 'AS' },
    { code: 'Ind AS 1', title: 'Presentation of Financial Statements', slug: 'ind-as-1', color: '#6B3FA0', framework: 'Ind AS' },
  ],
  faqs: [
    {
      id: 1,
      question: 'What are the three fundamental accounting assumptions under AS 1?',
      answer:
        'The three fundamental assumptions are: (1) Going Concern — the enterprise will continue to operate in the foreseeable future and has neither the intention nor the necessity to liquidate or curtail the scale of operations. (2) Consistency — accounting policies are applied consistently from period to period. (3) Accrual — revenues and expenses are recognised as they are earned or incurred, not on a cash basis.',
      sourceRef: 'AS 1, Para 10',
    },
    {
      id: 2,
      question: 'When must an enterprise disclose a departure from fundamental accounting assumptions?',
      answer:
        'If any of the three fundamental accounting assumptions — Going Concern, Consistency, or Accrual — is not followed, the enterprise must explicitly disclose the fact and reason. For example, if a company intends to wind up, it must disclose it is not following the Going Concern assumption.',
      sourceRef: 'AS 1, Para 11',
    },
    {
      id: 3,
      question: 'Can a company change its accounting policy voluntarily?',
      answer:
        'Yes, but only if required by statute, by compliance with an accounting standard, or if the change results in a more appropriate presentation of the financial statements. The change, reason, and quantified impact must be disclosed in the notes.',
      sourceRef: 'AS 1, Para 25–27',
    },
    {
      id: 4,
      question: 'Does AS 1 apply to Ind AS adopters?',
      answer:
        'No. AS 1 applies only to entities using the Indian GAAP (Accounting Standards) framework. Entities that have migrated to Ind AS use Ind AS 1 — Presentation of Financial Statements instead.',
    },
  ],
}

// ─── Full Ind AS Standard: Ind AS 1 ──────────────────────────────────────────

export const IND_AS_1_ENTRY = {
  entryTitle: 'Ind AS 1 — Presentation of Financial Statements',
  entrySlug: 'ind-as-1',
  summary:
    'Ind AS 1 prescribes the basis for presentation of general purpose financial statements to ensure comparability both with the entity\'s prior period statements and with statements of other entities. It sets out overall requirements for the presentation, including structure and content guidelines.',
  verificationLevel: 'VERIFIED' as const,
  standardCode: 'Ind AS 1',
  standardStatus: 'ACTIVE' as const,
  standardFramework: 'IND_AS' as const,
  issuingBody: 'MCA / NACAS (National Advisory Committee on Accounting Standards)',
  dateIssued: '2015-02-16',
  applicabilitySummary:
    'Mandatory for listed companies and large unlisted companies with net worth ≥ ₹250 crore (Phase II onwards). SMEs may continue with AS framework.',
  authorityPrimary: 'MCA — Companies (Indian Accounting Standards) Rules, 2015',
  authorityPrimaryUrl: 'https://www.mca.gov.in/content/mca/global/en/acts-rules/ebooks/standards.html',
  objective:
    'The objective of Ind AS 1 is to prescribe the basis for presentation of general purpose financial statements so as to ensure comparability both with the entity\'s financial statements of previous periods and with the financial statements of other entities. It sets out overall requirements for the presentation of financial statements, guidelines for their structure and minimum requirements for their content.',
  scope: {
    included: [
      'All general purpose financial statements prepared and presented in accordance with Ind AS',
      'Listed companies required to adopt Ind AS',
      'Unlisted companies with net worth ≥ ₹250 crore',
      'Subsidiaries, associates, and joint ventures of Ind AS adopters',
    ],
    excluded: [
      'Interim financial statements prepared under Ind AS 34',
      'Entities continuing with Indian GAAP (AS framework)',
      'Special purpose financial statements',
    ],
  },
  keyComponents: [
    {
      title: 'Components of Financial Statements',
      desc: 'A complete set includes: Balance Sheet, Statement of Profit & Loss (including OCI), Statement of Changes in Equity, Statement of Cash Flows, Notes to Accounts.',
    },
    {
      title: 'Other Comprehensive Income (OCI)',
      desc: 'Unlike AS 1, Ind AS 1 requires a separate OCI section in the P&L for items like revaluation gains, actuarial gains/losses on defined benefit plans, and fair value changes on certain instruments.',
    },
    {
      title: 'Materiality and Aggregation',
      desc: 'Items that are material must be presented separately. Items that are immaterial may be aggregated with amounts of a similar nature or function. Materiality is assessed both individually and collectively.',
    },
    {
      title: 'Going Concern Assessment',
      desc: 'Management must assess the ability of the entity to continue as a going concern. If material uncertainties exist, they must be disclosed. If the entity is not a going concern, financials must be prepared on a different basis with disclosure.',
    },
  ],
  relatedStandards: [
    { code: 'Ind AS 7', title: 'Statement of Cash Flows', slug: 'ind-as-7', framework: 'ind-as' },
    { code: 'Ind AS 8', title: 'Accounting Policies, Changes in Estimates and Errors', slug: 'ind-as-8', framework: 'ind-as' },
    { code: 'Ind AS 34', title: 'Interim Financial Reporting', slug: 'ind-as-34', framework: 'ind-as' },
    { code: 'AS 1', title: 'Disclosure of Accounting Policies', slug: 'as-1', framework: 'as' },
  ],
  faqs: [
    {
      id: 1,
      question: 'What is Other Comprehensive Income (OCI) under Ind AS 1?',
      answer:
        'OCI comprises items of income and expense that are not recognised in profit or loss as required or permitted by other Ind AS standards. Examples include revaluation surplus on PPE, actuarial gains/losses on defined benefit plans, and gains/losses on financial instruments measured at fair value through OCI (FVOCI). These items bypass the P&L and go directly to equity.',
    },
    {
      id: 2,
      question: 'How does Ind AS 1 differ from AS 1?',
      answer:
        'AS 1 focuses only on disclosure of accounting policies and the three fundamental assumptions. Ind AS 1 is a comprehensive presentation standard — it prescribes the complete structure of financial statements, requires OCI disclosure, mandates a statement of changes in equity, and aligns with IAS 1 (IFRS). It is far more detailed and comprehensive than AS 1.',
    },
    {
      id: 3,
      question: 'Which entities are required to adopt Ind AS?',
      answer:
        'Phase I (from FY 2016-17): Listed companies and unlisted companies with net worth ≥ ₹500 crore. Phase II (from FY 2017-18): Companies with net worth ≥ ₹250 crore and all listed companies. Their subsidiaries, associates, and JVs are also covered. Banks, NBFCs, and insurance companies have separate roadmaps.',
    },
  ],
}

