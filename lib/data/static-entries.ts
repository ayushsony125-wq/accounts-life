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

// ─── Full AS Standard: AS 2 ──────────────────────────────────────────────────

export const AS_2_ENTRY = {
  entryTitle: 'AS 2 — Valuation of Inventories',
  entrySlug: 'as-2',
  summary:
    'AS 2 prescribes the accounting treatment for inventories. It provides guidance on the determination of cost, including the cost of purchase, cost of conversion and other costs, and on the subsequent recognition of inventories as an expense, including any write-down to net realisable value.',
  verificationLevel: 'VERIFIED' as const,
  wordCount: 2400,
  lastReviewedAt: '2024-03-01',
  authorityPrimary: 'ICAI — Accounting Standard 2 (Revised)',
  authorityPrimaryUrl: 'https://www.icai.org/post/accounting-standards-as-2',
  standardCode: 'AS 2',
  standardFramework: 'AS' as const,
  standardStatus: 'ACTIVE' as const,
  issuingBody: 'ICAI (Institute of Chartered Accountants of India)',
  dateIssued: '1981-01-01',
  dateEffective: '1999-04-01',
  applicabilitySummary: 'Mandatory for all enterprises preparing financial statements under Indian GAAP. Applicable to all inventories except work in progress arising under construction contracts (AS 7), financial instruments, and inventories of agricultural/livestock/mineral products measured at NRV by tradition.',
  quickBullets: [
    { icon: '📦', label: 'Measurement', desc: 'Lower of Cost and NRV' },
    { icon: '📊', label: 'Cost Formulas', desc: 'FIFO or Weighted Average' },
    { icon: '📋', label: 'Key Rule', desc: 'Write down to NRV when cost > NRV' },
  ],
  objective: {
    text: 'The objective of AS 2 is to formulate the method of accounting for inventories and to determine the value at which inventories are to be carried in the financial statements until the related revenues are recognised. It provides guidance on the determination of cost, the cost formulas to be used, and on the subsequent recognition of inventories as an expense including any write-down to net realisable value.',
    sourcePara: 'Introduction',
    commentary: 'AS 2 establishes the lower of cost and net realisable value (NRV) as the fundamental measurement basis for inventories. This is based on the principle of prudence — losses are recognised immediately when inventory value falls below cost, but gains are not recognised until realised.',
    keyIssues: [
      'How should the cost of inventories be determined for different types of businesses?',
      'When should inventories be written down to Net Realisable Value (NRV)?',
      'Which cost formula — FIFO or Weighted Average — should be applied?',
      'What must be disclosed in financial statements regarding inventory valuation?',
    ],
  },
  scope: {
    statement: 'AS 2 applies to all inventories, being assets: (a) held for sale in the ordinary course of business; (b) in the process of production for such sale; or (c) in the form of materials or supplies to be consumed in the production process or in the rendering of services.',
    included: [
      'Finished goods held for sale',
      'Work-in-progress (WIP) during manufacturing',
      'Raw materials and stores awaiting use in production',
      'Goods purchased for trading/resale (merchandise)',
      'Land and other property held for sale in the ordinary course of business by developers',
      'Inventories of service providers (direct labour, materials, attributable overheads)',
    ],
    excluded: [
      'Work in progress arising under construction contracts (governed by AS 7)',
      'Work in progress arising in the ordinary course of business of service concession arrangements',
      'Financial instruments (shares, debentures, futures) — governed by AS 13',
      'Biological assets related to agricultural activity and agricultural produce at the point of harvest',
      'Producers of agricultural and forest products, mineral ores measured at NRV in accordance with well-established practices in those industries',
    ],
  },
  definitions: [
    {
      term: 'Inventories',
      paraRef: 'Para 2',
      officialText:
        '"Inventories are assets: (a) held for sale in the ordinary course of business; (b) in the process of production for such sale; or (c) in the form of materials or supplies to be consumed in the production process or in the rendering of services."',
      plainExplanation:
        'Inventories encompass three categories: (1) Finished Goods — ready for sale; (2) Work-In-Progress (WIP) — partially manufactured; and (3) Raw Materials and Stores — inputs for production. Each category requires cost determination and NRV comparison.',
    },
    {
      term: 'Net Realisable Value (NRV)',
      paraRef: 'Para 2',
      officialText:
        '"Net realisable value is the estimated selling price in the ordinary course of business less the estimated costs of completion and the estimated costs necessary to make the sale."',
      plainExplanation:
        'NRV = Estimated Selling Price − Estimated Cost of Completion − Estimated Selling Costs. For example, if finished goods are expected to sell at ₹100, with ₹5 delivery cost, the NRV is ₹95. Compare this with cost — whichever is lower is used for valuation.',
    },
    {
      term: 'Fair Value',
      paraRef: 'Para 2',
      officialText:
        '"Fair value is the amount for which an asset could be exchanged, or a liability settled, between knowledgeable, willing parties in an arm\'s length transaction."',
      plainExplanation:
        'Fair value is the market price between informed willing parties. Under AS 2, NRV (entity-specific) differs from fair value (market-based). NRV may differ from fair value because NRV reflects entity-specific estimates of selling price and completion costs, while fair value reflects market conditions regardless of the entity.',
    },
    {
      term: 'Cost of Inventories',
      paraRef: 'Para 4',
      officialText:
        '"The cost of inventories should comprise all costs of purchase, costs of conversion and other costs incurred in bringing the inventories to their present location and condition."',
      plainExplanation:
        'Total cost = Cost of Purchase + Cost of Conversion + Other Costs. This is the fully-landed cost concept. For a manufacturer, it includes raw material cost, direct labour, and production overheads (absorbed on a systematic basis). Selling and administrative overheads are excluded.',
    },
    {
      term: 'Cost of Purchase',
      paraRef: 'Para 5',
      officialText:
        '"The costs of purchase consist of the purchase price including duties and taxes, freight inwards and other expenditure directly attributable to the acquisition. Trade discounts, rebates, duty drawbacks and other similar items are deducted in determining the cost of purchase."',
      plainExplanation:
        'Cost of Purchase = Invoice Price + Duties/Taxes + Freight + Direct Acquisition Costs − Trade Discounts − Rebates − Duty Drawback. Note: Cash discounts are NOT deducted from cost of purchase under AS 2 (they are credited to P&L). Interest on credit purchases is also excluded.',
    },
    {
      term: 'Cost of Conversion',
      paraRef: 'Para 6',
      officialText:
        '"The costs of conversion of inventories include costs directly related to the units of production, such as direct labour. They also include a systematic allocation of fixed and variable production overheads that are incurred in converting materials into finished goods."',
      plainExplanation:
        'Cost of Conversion = Direct Labour + Fixed Production OH (absorbed at normal capacity) + Variable Production OH. Fixed OH is allocated based on normal capacity, not actual output. If actual production is abnormally low, the unabsorbed fixed OH is charged to the period (not inventoried).',
    },
    {
      term: 'Normal Capacity',
      paraRef: 'Para 6',
      officialText:
        '"Normal capacity is the production expected to be achieved on an average over a number of periods or seasons under normal circumstances, taking into account the loss of capacity resulting from planned maintenance."',
      plainExplanation:
        'Normal capacity is a long-run average of expected production (excluding abnormal shutdowns). It is used as the denominator for absorbing fixed production overheads into inventory cost. Using actual capacity when lower than normal would overstate inventory cost.',
    },
  ],
  recognitionRules:
    'Under AS 2, inventories must be measured at the lower of cost and net realisable value (Para 3). When inventories are sold, the carrying amount must be recognised as an expense in the period in which the related revenue is recognised (Para 18). When inventories are written down to NRV, the write-down amount is recognised as an expense immediately. Any reversal of write-down (Para 17) is recognised as a reduction in the amount of inventories recognised as an expense in the period of reversal.',
  measurementRules:
    'Measurement is at the lower of cost and NRV. Cost is determined using either FIFO (First-In, First-Out) or Weighted Average Cost formula — not LIFO (LIFO is specifically excluded under AS 2). For items of similar nature and use, the same cost formula must be applied consistently. Specific identification applies only to inventories that are not ordinarily interchangeable and for goods/services produced for specific projects.',
  disclosureGroups: [
    {
      heading: 'Mandatory Disclosures in Financial Statements',
      paraRange: 'Para 19',
      items: [
        { text: 'Accounting policy adopted for measuring inventories (cost formula used — FIFO or Weighted Average)' },
        { text: 'Total carrying amount of inventories in classifications appropriate to the enterprise (e.g., raw materials, WIP, finished goods, stores and spares)' },
        { text: 'Carrying amount of inventories carried at fair value less costs to sell' },
        { text: 'Amount of inventories recognised as expense during the period (cost of goods sold/cost of revenue)' },
        { text: 'Amount of any write-down of inventories to NRV recognised as an expense in the period', isConditional: true },
        { text: 'Amount of any reversal of write-down that is recognised as a reduction in the amount of inventories expensed', isConditional: true },
        { text: 'Circumstances or events that led to reversal of write-down of inventories', isConditional: true },
        { text: 'Carrying amount of inventories pledged as security for liabilities', isConditional: true },
      ],
    },
    {
      heading: 'Additional Disclosures Encouraged',
      paraRange: 'Para 19 (Guidance)',
      items: [
        { text: 'Break-up of inventories by category — Raw Materials, Work-in-Progress, Finished Goods, Stores & Spares', isConditional: true },
        { text: 'Method of absorption of fixed overheads and basis of normal capacity', isConditional: true },
        { text: 'Specific identification method use and the basis for selection of items', isConditional: true },
      ],
    },
  ],
  journalEntryNotes: [
    {
      scenario: 'Write-down of Inventory to NRV (Cost > NRV)',
      treatment:
        'When the NRV of inventory falls below its cost, the difference must be recognised as an expense immediately. Entry: Debit — Loss on Inventory Write-down A/c (or included in Cost of Goods Sold), Credit — Inventory A/c. The inventory appears at NRV in the Balance Sheet. Note: The write-down is not a provision — it directly reduces the inventory value.',
    },
    {
      scenario: 'Reversal of NRV Write-down (NRV recovers in subsequent period)',
      treatment:
        'If circumstances that caused the write-down no longer exist, the write-down is reversed. Entry: Debit — Inventory A/c, Credit — Cost of Goods Sold A/c (or Inventory Write-down Reversal). The reversal is capped at the amount of original write-down — inventory cannot be written UP above original cost.',
    },
    {
      scenario: 'Goods Received but Invoice Not Yet Received (GRNI — Goods Received Not Invoiced)',
      treatment:
        'Include goods in inventory as they have transferred to the entity: Debit — Inventory / Raw Materials A/c, Credit — Goods Received Not Invoiced A/c (current liability). Upon receipt of invoice: Debit — GRNI A/c, Credit — Creditors A/c. This ensures inventories include all goods physically received.',
    },
    {
      scenario: 'Abnormal Wastage / Spoilage — Excluded from Inventory Cost',
      treatment:
        'Abnormal amounts of wasted materials, labour, or other production costs are expensed as period costs under Para 8. Entry: Debit — Abnormal Loss A/c (P&L), Credit — WIP / Inventory A/c. Only normal wastage is absorbed into production cost.',
    },
    {
      scenario: 'Fixed Overhead Absorbed at Normal Capacity',
      treatment:
        'Fixed production OH per unit = Total fixed OH ÷ Normal Capacity (units). If actual production = 8,000 units, Normal = 10,000 units, Fixed OH = ₹10,00,000. OH rate = ₹100/unit. Inventory absorbs ₹8,00,000 (8,000 × ₹100). Unabsorbed OH = ₹2,00,000 is charged to P&L as period cost — not inventoried.',
    },
  ],
  comparison: {
    std2Title: 'Ind AS 2 — Inventories',
    rows: [
      { criterion: 'Measurement Basis', as: 'Lower of cost and NRV', indAs: 'Lower of cost and NRV (same)', isDifferent: false },
      { criterion: 'Allowed Cost Formulas', as: 'FIFO or Weighted Average; LIFO NOT permitted', indAs: 'FIFO or Weighted Average; LIFO NOT permitted (same)', isDifferent: false },
      { criterion: 'Specific Identification', as: 'Applies to non-interchangeable items and project inventories', indAs: 'Same (applies to non-interchangeable items)', isDifferent: false },
      { criterion: 'Service Provider Inventories', as: 'Cost of services = direct labour + direct costs + attributable OH', indAs: 'Same treatment', isDifferent: false },
      { criterion: 'Borrowing Costs in Inventory', as: 'Excluded from cost (AS 2 explicitly excludes)', indAs: 'Permitted only for qualifying assets (long maturing WIP) per Ind AS 23', isDifferent: true },
      { criterion: 'Write-down Reversal', as: 'Reversal is permitted when circumstances change', indAs: 'Reversal permitted (same)', isDifferent: false },
      { criterion: 'Fair Value vs NRV', as: 'Distinguishes NRV from Fair Value conceptually', indAs: 'Same distinction; additionally aligned with IFRS 13', isDifferent: false },
      { criterion: 'Biological Assets', as: 'Explicitly excluded from scope', indAs: 'Excluded (covered by Ind AS 41 Agriculture)', isDifferent: false },
      { criterion: 'Disclosure — Cost of Goods Sold', as: 'Required (carrying amount of inventories expensed)', indAs: 'Required (same)', isDifferent: false },
    ],
  },
  relatedStandards: [
    { code: 'AS 7', title: 'Construction Contracts', slug: 'as-7', color: '#0F6B5E', framework: 'AS' },
    { code: 'AS 9', title: 'Revenue Recognition', slug: 'as-9', color: '#0F6B5E', framework: 'AS' },
    { code: 'AS 13', title: 'Accounting for Investments', slug: 'as-13', color: '#0F6B5E', framework: 'AS' },
    { code: 'AS 16', title: 'Borrowing Costs', slug: 'as-16', color: '#0F6B5E', framework: 'AS' },
    { code: 'Ind AS 2', title: 'Inventories', slug: 'ind-as-2', color: '#6B3FA0', framework: 'Ind AS' },
  ],
  faqs: [
    {
      id: 1,
      question: 'Can LIFO (Last-In, First-Out) be used for inventory valuation under AS 2?',
      answer:
        'No. AS 2 specifically prohibits the LIFO cost formula. Only FIFO (First-In, First-Out) and Weighted Average Cost are permitted. This is because LIFO results in an outdated, understated inventory value on the balance sheet during rising prices, which reduces the usefulness of financial statements.',
      sourceRef: 'AS 2, Para 11–12',
    },
    {
      id: 2,
      question: 'What is the correct treatment when actual production is below normal capacity?',
      answer:
        'Fixed production overheads are allocated based on normal capacity, not actual production. If actual production is lower than normal, fixed OH per unit remains the same (based on normal capacity). The unabsorbed portion of fixed OH (due to lower actual production) is recognised as an expense in the current period — it is NOT added to inventory cost. This prevents inventory from being overstated during periods of abnormally low production.',
      sourceRef: 'AS 2, Para 6',
    },
    {
      id: 3,
      question: 'Should trade discounts be deducted in calculating cost of purchase under AS 2?',
      answer:
        'Yes. Trade discounts, rebates, duty drawbacks and other similar items are deducted from cost of purchase under Para 5. However, cash discounts (discounts for early payment) are NOT deducted from cost — they are credited to P&L as "Discount Received" income. This distinction is important: trade discounts reduce cost, cash discounts do not.',
      sourceRef: 'AS 2, Para 5',
    },
    {
      id: 4,
      question: 'When should inventory be written down to NRV?',
      answer:
        'Inventory should be written down to NRV when its cost exceeds its estimated NRV. This typically happens when: (a) inventories are damaged; (b) inventories are wholly or partially obsolete; (c) selling prices have declined; (d) estimated costs of completion or selling costs have increased. The write-down is recognised as an expense in the period it occurs. The write-down should be assessed item by item or by groups of similar items — not at the total inventory level.',
      sourceRef: 'AS 2, Para 14–16',
    },
    {
      id: 5,
      question: 'Can a write-down of inventory to NRV be reversed in a subsequent period?',
      answer:
        'Yes. Under Para 17, when the circumstances that caused the write-down no longer exist (e.g., selling price recovers), the write-down can be reversed. The reversal amount is recognised as a reduction in the amount of inventories recognised as an expense in the period of reversal. However, the reversal cannot result in a carrying amount that exceeds the original cost — inventory cannot be written UP above its original cost.',
      sourceRef: 'AS 2, Para 17',
    },
    {
      id: 6,
      question: 'How is the cost of inventories determined for a service provider?',
      answer:
        'Under Para 9, the cost of inventories of a service provider consists of labour and other costs of personnel directly engaged in providing the service, including supervisory personnel, and attributable overheads. Labour and other costs relating to sales and general administrative personnel are excluded. The cost does not include profit margins or non-attributable overheads.',
      sourceRef: 'AS 2, Para 9',
    },
    {
      id: 7,
      question: 'Is borrowing cost included in the cost of inventories under AS 2?',
      answer:
        'No. AS 2 specifically excludes borrowing costs (interest) from the cost of inventories. Para 8 lists excluded costs: abnormal wastage, storage costs (unless necessary in the production process), administrative overheads not contributing to production, and selling costs. Note: Under Ind AS 2 read with Ind AS 23, borrowing costs may be included in the cost of inventories that are qualifying assets (e.g., whisky maturing over 3 years), but this is NOT the case under AS 2.',
      sourceRef: 'AS 2, Para 8',
    },
    {
      id: 8,
      question: 'What is the rule regarding consistency of cost formula across different inventory types?',
      answer:
        'Para 13 requires that the same cost formula (FIFO or Weighted Average) must be used for all inventories having similar nature and use. If different groups of inventories have different nature or use to the enterprise, different cost formulas can be applied. For example, a company could use FIFO for finished goods and Weighted Average for raw materials if they have genuinely different characteristics. But two types of finished goods of similar nature must use the same formula.',
      sourceRef: 'AS 2, Para 13',
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

// ─── Full AS Standard: AS 9 ──────────────────────────────────────────────────

export const AS_9_ENTRY = {
  entryTitle: 'AS 9 — Revenue Recognition',
  entrySlug: 'as-9',
  summary:
    'AS 9 establishes the principles for recognizing revenue in the statement of profit and loss of an enterprise. It outlines the criteria for revenue recognition from the sale of goods, rendering of services, and the use of enterprise resources by others (yielding interest, royalties, and dividends).',
  verificationLevel: 'VERIFIED' as const,
  wordCount: 2200,
  lastReviewedAt: '2024-03-01',
  authorityPrimary: 'ICAI — Accounting Standard 9',
  authorityPrimaryUrl: 'https://www.icai.org/post/accounting-standards-as-9',
  standardCode: 'AS 9',
  standardFramework: 'AS' as const,
  standardStatus: 'ACTIVE' as const,
  issuingBody: 'ICAI (Institute of Chartered Accountants of India)',
  dateIssued: '1985-06-01',
  dateEffective: '1985-04-01',
  applicabilitySummary: 'Mandatory for all enterprises preparing financial statements under Indian GAAP (AS framework). It governs the timing and conditions under which revenue is recognised from ordinary business operations.',
  quickBullets: [
    { icon: '📦', label: 'Sale of Goods', desc: 'Transfer of risks and rewards of ownership' },
    { icon: '🛠️', label: 'Services', desc: 'Completed Contract or Proportionate Completion' },
    { icon: '📈', label: 'Resources', desc: 'Accrual basis for Interest, Royalties & Dividends' },
  ],
  objective: {
    text: 'The objective of AS 9 is to formulate the method of accounting for revenue in the statement of profit and loss. It prescribes the timing and conditions under which revenue should be recognised, particularly when there is uncertainty regarding the amount or collectability of the consideration.',
    sourcePara: 'Introduction',
    commentary: 'AS 9 establishes that revenue is the gross inflow of cash, receivables, or other consideration. The critical issue is the timing of recognition. Under accrual accounting, revenue is recognised when it is earned and realizable (i.e. no significant uncertainty of collection exists), not when cash is received.',
    keyIssues: [
      'When have the significant risks and rewards of ownership passed to the buyer?',
      'Which service revenue recognition method should be applied — Completed Contract or Proportionate Completion?',
      'How should revenue recognition be handled when collection is highly uncertain?',
      'What is the timing of recognizing interest, royalty, and dividend revenue?',
    ],
  },
  scope: {
    statement: 'AS 9 applies to revenue arising in the course of the ordinary activities of an enterprise from: (1) Sale of goods; (2) Rendering of services; (3) Use by others of enterprise resources yielding interest, royalties, and dividends.',
    included: [
      'Revenue from sale of manufactured or purchased goods',
      'Service fees from rendering technical, professional, or financial services',
      'Interest earned on bank deposits, loans, or debentures',
      'Royalties received for the use of patents, copyrights, and trademarks',
      'Dividends declared on equity shares held as investments',
    ],
    excluded: [
      'Revenue arising from construction contracts (governed by AS 7)',
      'Revenue arising from hire-purchase and lease agreements (governed by AS 19)',
      'Revenue arising from government grants and other subsidies (governed by AS 12)',
      'Revenue of insurance companies arising from contracts of insurance',
      'Realised/unrealised gains from sale of fixed assets or investments (these are gains, not revenue under ordinary activities)',
    ],
  },
  definitions: [
    {
      term: 'Revenue',
      paraRef: 'Para 3.1',
      officialText:
        '"Revenue is the gross inflow of cash, receivables or other consideration arising in the course of the ordinary activities of an enterprise from the sale of goods, from the rendering of services, and from the use by others of enterprise resources yielding interest, royalties and dividends."',
      plainExplanation:
        'Revenue represents the top-line income from ordinary business operations. Crucially, it only includes gross inflows of economic benefits received/receivable on the enterprise\'s own account. Amounts collected on behalf of third parties (like GST, sales tax, or agency commissions) are NOT revenue.',
    },
    {
      term: 'Sale of Goods',
      paraRef: 'Para 6',
      officialText:
        '"A key criterion for determining when to recognise revenue from a transaction involving the sale of goods is that the seller has transferred to the buyer the property in the goods for a price or all significant risks and rewards of ownership..."',
      plainExplanation:
        'Revenue from sales cannot be recognised merely because an invoice is raised or a contract is signed. The significant risks and rewards of ownership (such as the risk of obsolescence, damage, and price fluctuations) must have passed to the buyer, and the seller must retain no effective control.',
    },
    {
      term: 'Rendering of Services',
      paraRef: 'Para 7',
      officialText:
        '"Revenue from service transactions is usually recognised as the service is performed, either by the proportionate completion method or by the completed service contract method, whichever relation to the stage of completion of the specific transaction is more appropriate."',
      plainExplanation:
        'Service revenue can be recognised either: (1) as the service progresses (Proportionate Completion) or (2) only when the service is fully finished (Completed Contract). If a single act is critical, use the Completed Contract method.',
    },
  ],
  recognitionRules:
    'For sale of goods, recognise when property in goods / risks and rewards of ownership are transferred to the buyer, and no significant uncertainty exists as to measurement or collectability. For rendering of services, recognise as the service is performed. Interest is recognised on a time proportion basis; royalties on an accrual basis in accordance with terms; dividends when the right to receive payment is established.',
  measurementRules:
    'Revenue is measured by the charges made to customers for goods supplied and services rendered to them, and by the charges and interest/royalties/dividends accruing on resource usage. Trade discounts, volume rebates, and similar items are deducted in determining revenue. GST and sales tax are excluded.',
  disclosureGroups: [
    {
      heading: 'Mandatory Disclosures',
      paraRange: 'Para 14',
      items: [
        { text: 'All significant accounting policies adopted for revenue recognition, including methods used for service contracts' },
        { text: 'The circumstances in which revenue recognition has been postponed pending the resolution of significant uncertainties, with reasons' },
        { text: 'Separate disclosure of revenue from: (a) sale of goods, (b) rendering of services, and (c) interest, royalties, and dividends' },
      ],
    },
  ],
  journalEntryNotes: [
    {
      scenario: 'Postponement of Revenue due to Collection Uncertainty',
      treatment:
        'When goods are sold but there is severe uncertainty about collectability (e.g., export to a country with forex restrictions), no entry is passed for sale. Instead, hold inventory. Only when the uncertainty is resolved is the sale recorded: Debit Cash/Receivables A/c, Credit Revenue A/c.',
    },
    {
      scenario: 'Accrual of Royalty Income',
      treatment:
        'Under AS 9, royalties must be recognised on an accrual basis as per the terms of the agreement: Debit Accrued Royalties A/c, Credit Royalty Income A/c.',
    },
  ],
  comparison: {
    std2Title: 'Ind AS 115 — Revenue from Contracts with Customers',
    rows: [
      { criterion: 'Core Model', as: 'Risk and rewards transfer model (separate rules for goods, services, and resources)', indAs: 'Unified 5-step control-based model for all contracts with customers', isDifferent: true },
      { criterion: 'Service Revenue', as: 'Allows Completed Contract or Proportionate Completion method', indAs: 'Requires recognition over time (if specific criteria met) or at a point in time; completed contract is not a standard option unless control transfers at the end', isDifferent: true },
      { criterion: 'Agent vs Principal', as: 'Indicates revenue is gross inflow on own account; excludes third-party collections (GST/Sales tax)', indAs: 'Provides detailed indicators to determine if entity acts as principal (recognise gross) or agent (recognise net commission)', isDifferent: true },
      { criterion: 'Multiple Deliverables', as: 'No detailed guidance for separating components of a single transaction', indAs: 'Extensive rules for identifying distinct Performance Obligations and allocating transaction price based on standalone selling prices', isDifferent: true },
      { criterion: 'Time Value of Money', as: 'Not considered in revenue measurement (except interest)', indAs: 'Requires adjustment of transaction price if the contract contains a significant financing component', isDifferent: true },
    ],
  },
  relatedStandards: [
    { code: 'AS 7', title: 'Construction Contracts', slug: 'as-7', color: '#0F6B5E', framework: 'AS' },
    { code: 'AS 19', title: 'Leases', slug: 'as-19', color: '#0F6B5E', framework: 'AS' },
    { code: 'Ind AS 115', title: 'Revenue from Contracts with Customers', slug: 'ind-as-115', color: '#6B3FA0', framework: 'Ind AS' },
  ],
  faqs: [
    {
      id: 1,
      question: 'What is the primary condition for revenue recognition under AS 9?',
      answer:
        'The primary condition for revenue recognition is the transfer of risks and rewards of ownership (for goods) or performance of service, plus the absence of any significant uncertainty regarding the measurement of consideration or its collectability. If such uncertainty exists, recognition must be postponed.',
      sourceRef: 'AS 9, Para 6 & 9',
    },
    {
      id: 2,
      question: 'Should GST / Excise duty collected be included in revenue?',
      answer:
        'Excise duty is a liability of the manufacturer and is included in gross revenue, but deducted on the face of the P&L. GST is collected on behalf of the government (agency relationship) and is excluded from revenue under AS 9 because it does not represent gross inflows to the enterprise on its own account.',
      sourceRef: 'AS 9, Para 3.1 & 4',
    },
    {
      id: 3,
      question: 'What happens if uncertainty about collection arises after the sale has already been recognised?',
      answer:
        'If uncertainty about collection arises after the revenue has already been recognised, the original revenue entry is NOT adjusted. Instead, a separate provision for doubtful debts or write-off for bad debts is made in the profit and loss account (per Para 10).',
      sourceRef: 'AS 9, Para 10',
    },
    {
      id: 4,
      question: 'When should dividend revenue be recognised?',
      answer:
        'Dividend revenue should be recognised when the shareholder\'s right to receive payment is established. This is typically when the dividend is declared by the board of directors and approved by the shareholders of the paying company.',
      sourceRef: 'AS 9, Para 8.3',
    },
  ],
}

// ─── Full AS Standard: AS 10 ─────────────────────────────────────────────────

export const AS_10_ENTRY = {
  entryTitle: 'AS 10 — Property, Plant and Equipment',
  entrySlug: 'as-10',
  summary:
    'AS 10 (Revised 2016) establishes the accounting treatment for Property, Plant and Equipment. It covers the initial recognition criteria, components of cost, subsequent revaluation vs cost model, component accounting, depreciation methods, impairment, and derecognition of PPE assets.',
  verificationLevel: 'VERIFIED' as const,
  wordCount: 2800,
  lastReviewedAt: '2024-03-01',
  authorityPrimary: 'ICAI — Accounting Standard 10 (Revised)',
  authorityPrimaryUrl: 'https://www.icai.org/post/accounting-standards-as-10',
  standardCode: 'AS 10',
  standardFramework: 'AS' as const,
  standardStatus: 'ACTIVE' as const,
  issuingBody: 'ICAI (Institute of Chartered Accountants of India)',
  dateIssued: '2016-03-30',
  dateEffective: '2016-04-01',
  applicabilitySummary: 'Mandatory for all enterprises preparing financial statements under Indian GAAP (AS framework). Specifically governs the acquisition, revaluation, depreciation, and disposal of tangible fixed assets.',
  quickBullets: [
    { icon: '🏗️', label: 'Recognition', desc: 'General & Safety/Environmental equipment' },
    { icon: '🔧', label: 'Initial Cost', desc: 'Purchase price + direct costs + dismantling estimate' },
    { icon: '🔄', label: 'Models', desc: 'Cost Model or Revaluation Model' },
    { icon: '⏳', label: 'Depreciation', desc: 'Component accounting & annual reviews' },
  ],
  objective: {
    text: 'The objective of AS 10 is to prescribe the accounting treatment for property, plant and equipment so that users of financial statements can discern information about an investment in PPE and the changes in such investment. The principal issues are the timing of recognition, carrying amounts, depreciation charges, and impairment losses.',
    sourcePara: 'Objective',
    commentary: 'AS 10 (Revised) represents a major convergence step with Ind AS 16. It replaces the old rules-based depreciation and introduces component accounting, dismantling cost capitalization, and stricter revaluation criteria.',
    keyIssues: [
      'What items qualify as Property, Plant and Equipment?',
      'What components of cost must be capitalized during initial acquisition?',
      'When should subsequent costs (replacements/inspections) be capitalized vs expensed?',
      'How is depreciation computed using component accounting?',
      'How are revaluation gains and losses accounted for?',
    ],
  },
  scope: {
    statement: 'AS 10 applies to all Property, Plant and Equipment, except when another standard requires or permits a different accounting treatment.',
    included: [
      'Land, buildings, office premises',
      'Plant and machinery, factory equipment',
      'Computers, office devices, and furniture',
      'Vehicles and transport equipment',
      'Safety and environmental equipment required to obtain economic benefits from other assets',
      'Bearer plants (biological assets related to agricultural activity that are used to grow produce over multiple periods)',
    ],
    excluded: [
      'Biological assets (other than bearer plants) related to agricultural activity (e.g., livestock, crops)',
      'Wasting assets, mineral rights, reserves of natural gas, oil, and similar non-regenerative resources',
      'Investment property (governed by AS 13)',
    ],
  },
  definitions: [
    {
      term: 'Property, Plant and Equipment (PPE)',
      paraRef: 'Para 7',
      officialText:
        '"Property, plant and equipment are tangible items that: (a) are held for use in the production or supply of goods or services, for rental to others, or for administrative purposes; and (b) are expected to be used during more than a period of twelve months."',
      plainExplanation:
        'Tangible physical assets with two attributes: (1) held for operations/leasing/admin (not for resale in ordinary course), and (2) useful life is longer than one year. Handtools or small parts are typically expensed under materiality rather than capitalized.',
    },
    {
      term: 'Bearer Plant',
      paraRef: 'Para 7',
      officialText:
        '"A bearer plant is a living plant that: (a) is used in the production or supply of agricultural produce; (b) is expected to bear produce for more than a period of twelve months; and (c) has a remote likelihood of being sold as agricultural produce, except for incidental scrap sales."',
      plainExplanation:
        'Plants used over multiple periods to harvest agricultural crops (e.g., tea bushes, grape vines, rubber trees). Bearer plants are treated as PPE (capitalized at cost, depreciated over useful life). The harvested produce is inventory under AS 2.',
    },
    {
      term: 'Depreciable Amount',
      paraRef: 'Para 7',
      officialText:
        '"Depreciable amount is the cost of an asset, or other amount substituted for cost, less its residual value."',
      plainExplanation:
        'The total value of the asset that will be expensed over its useful life. For example, if a machine costs ₹10 Lakhs, and has a salvage value of ₹1 Lakh, the depreciable amount is ₹9 Lakhs.',
    },
    {
      term: 'Useful Life',
      paraRef: 'Para 7',
      officialText:
        '"Useful life is: (a) the period over which an asset is expected to be available for use by an enterprise; or (b) the number of production or similar units expected to be obtained from the asset by an enterprise."',
      plainExplanation:
        'The period of expected utility to the enterprise (which can be shorter than the asset\'s physical life), or the estimated output capacity.',
    },
  ],
  recognitionRules:
    'PPE should be recognised if: (a) it is probable that future economic benefits associated with the item will flow to the enterprise, and (b) the cost of the item can be measured reliably. Safety/environmental equipment is capitalized if required to obtain economic benefits from other assets.',
  measurementRules:
    'Initially measured at cost. Cost comprises purchase price (including non-refundable duties/taxes less discounts), directly attributable costs to bring the asset to location/condition, and the initial estimate of dismantling/restoration costs. Subsequently, choice between Cost Model (cost less accumulated depreciation/impairment) and Revaluation Model (fair value less subsequent depreciation/impairment).',
  disclosureGroups: [
    {
      heading: 'General Disclosures',
      paraRange: 'Para 73–78',
      items: [
        { text: 'Measurement bases used for determining the gross carrying amount (Cost vs Revaluation)' },
        { text: 'Depreciation methods used (SLM, WDV, etc.) and useful lives or depreciation rates' },
        { text: 'Gross carrying amount and accumulated depreciation (together with accumulated impairment losses) at the beginning and end of the period' },
        { text: 'A detailed reconciliation of the carrying amount at the beginning and end of the period showing additions, disposals, revaluations, and depreciation' },
      ],
    },
    {
      heading: 'Revalued Asset Disclosures',
      paraRange: 'Para 79',
      items: [
        { text: 'Effective date of the revaluation' },
        { text: 'Whether an independent valuer was involved' },
        { text: 'The methods and significant assumptions applied in estimating the assets\' fair values' },
        { text: 'Revaluation surplus, indicating the change for the period and any restrictions on distribution to shareholders' },
      ],
    },
  ],
  journalEntryNotes: [
    {
      scenario: 'Initial Recognition of Dismantling Cost',
      treatment:
        'Debit Machinery A/c, Credit Provision for Dismantling (Current/Non-Current Liability) A/c at present value of expected dismantling cost.',
    },
    {
      scenario: 'Revaluation Surplus (Upward Revaluation)',
      treatment:
        'Debit Accumulated Depreciation A/c (to eliminate), Debit Machinery A/c (to increase carrying value), Credit Revaluation Reserve / Surplus A/c (equity).',
    },
    {
      scenario: 'Downward Revaluation reversing prior surplus',
      treatment:
        'Debit Revaluation Reserve A/c (up to prior surplus amount), Debit Profit & Loss A/c (for the excess deficit), Credit Machinery A/c.',
    },
  ],
  comparison: {
    std2Title: 'Ind AS 16 — Property, Plant and Equipment',
    rows: [
      { criterion: 'Dismantling Cost Adjustment', as: 'Initial estimate capitalized. Subsequent changes in dismantling provision are adjusted to the asset carrying value (under cost model) or revaluation reserve (under revaluation model)', indAs: 'Similar, but uses Ind AS 37 and requires accounting for discounting interest accretion to finance costs in P&L', isDifferent: true },
      { criterion: 'Investment Property', as: 'Investment property is NOT covered by AS 10; it is governed by AS 13 (Accounting for Investments)', indAs: 'Investment property is excluded from Ind AS 16 but governed by Ind AS 40, which permits only the cost model (with fair value disclosures)', isDifferent: true },
      { criterion: 'Component Accounting', as: 'Mandatory under AS 10 (Revised) if components have significant cost and different useful lives', indAs: 'Mandatory, using stand-alone indicators and strict control tests under Ind AS 16', isDifferent: false },
      { criterion: 'Valuation of exchanges', as: 'Measured at fair value of asset given up (or asset acquired if more clearly evident) unless exchange lacks commercial substance', indAs: 'Same commercial substance-based model', isDifferent: false },
    ],
  },
  relatedStandards: [
    { code: 'AS 28', title: 'Impairment of Assets', slug: 'as-28', color: '#0F6B5E', framework: 'AS' },
    { code: 'AS 16', title: 'Borrowing Costs', slug: 'as-16', color: '#0F6B5E', framework: 'AS' },
    { code: 'Ind AS 16', title: 'Property, Plant and Equipment', slug: 'ind-as-16', color: '#6B3FA0', framework: 'Ind AS' },
  ],
  faqs: [
    {
      id: 1,
      question: 'What are bearer plants and how are they accounted for under AS 10?',
      answer:
        'Bearer plants are living plants used in the production of agricultural produce, expected to bear produce for >12 months, and have remote likelihood of sale as produce (except for scrap). Under AS 10, they are accounted for exactly like PPE (capitalized at cost, depreciated over useful life). Harvested produce is inventory under AS 2.',
      sourceRef: 'AS 10, Para 7 & 8',
    },
    {
      id: 2,
      question: 'Can an entity change its depreciation method mid-way?',
      answer:
        'Yes, but only if the change results in a more appropriate presentation of financial statements. Under AS 10 (Revised) and AS 5, this change is classified as a change in accounting estimate. It is applied prospectively (no retrospective adjustments) by allocating the remaining depreciable value over the remaining useful life.',
      sourceRef: 'AS 10, Para 62–65',
    },
    {
      id: 3,
      question: 'How is revaluation surplus treated when the asset is retired or disposed of?',
      answer:
        'The revaluation surplus in the Revaluation Reserve may be transferred directly to Retained Earnings (General Reserve) when the asset is derecognised (either fully on disposal, or gradually as the asset is used, equal to the difference between depreciation on revalued cost and historical cost). It must NOT be transferred to the Statement of Profit and Loss.',
      sourceRef: 'AS 10, Para 45',
    },
    {
      id: 4,
      question: 'Should safety and environmental equipment be capitalized?',
      answer:
        'Yes. Although they do not directly increase future economic benefits, they are necessary for the entity to obtain economic benefits from its other assets (e.g., chemical plant installing safety filters to comply with environmental laws).',
      sourceRef: 'AS 10, Para 13',
    },
  ],
}



