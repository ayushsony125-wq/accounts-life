// ============================================================
// ENUMS
// ============================================================

export type DomainStatus = 'ACTIVE' | 'PARTIAL' | 'COMING_SOON'

export type EntryType =
  | 'CONCEPT'
  | 'STANDARD'
  | 'JOURNAL_ENTRY'
  | 'GLOSSARY_TERM'
  | 'ILLUSTRATION'
  | 'FAQ'
  | 'REFERENCE'

export type VerificationLevel = 'VERIFIED' | 'DRAFT' | 'PLACEHOLDER'

export type EntryStatus = 'DRAFT' | 'PUBLISHED'

export type StandardFramework = 'AS' | 'IND_AS'

export type StandardStatus = 'ACTIVE' | 'WITHDRAWN' | 'REVISED'

export type AmendmentType =
  | 'ORIGINAL'
  | 'MAJOR_REVISION'
  | 'AMENDMENT'
  | 'WITHDRAWAL'
  | 'CLARIFICATION'

export type JERowType = 'DR' | 'CR' | 'TOTAL' | 'SEPARATOR'

export type IllusDifficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'

export type RelationshipType = 'GENERAL' | 'PREREQUISITE' | 'COMPARE' | 'NEXT'

export type ResourceType = 'PDF' | 'VIDEO' | 'REFERENCE'

export type ResourceSourceType = 'ICAI_OFFICIAL' | 'MCA' | 'IASB' | 'EXTERNAL'

export type NoteType = 'IMPORTANT' | 'NOTE' | 'TIP' | 'CAUTION'

export type FAQCategory =
  | 'GENERAL'
  | 'APPLICABILITY'
  | 'RECOGNITION'
  | 'MEASUREMENT'
  | 'DISCLOSURE'
  | 'EXAM'
  | 'PRACTICAL'

// ============================================================
// CORE DOMAIN MODELS
// ============================================================

export interface SubdomainSummary {
  name: string
  slug: string
  entryCount: number
}

export interface Domain {
  id: number
  domainCode: string
  domainName: string
  domainSlug: string
  domainTagline: string | null
  domainDescription: string | null
  domainColorHex: string
  domainStatus: DomainStatus
  sortOrder: number
  plannedEntryCount: number
  entryCount?: number
  createdAt: Date
  updatedAt: Date
  subdomains?: Subdomain[]
}

export interface DomainWithSubdomains extends Domain {
  subdomains: Subdomain[]
}

/** Flat static domain data shape used before DB seeding */
export interface StaticDomainData {
  id: number
  domainCode: string
  domainName: string
  domainSlug: string
  domainTagline: string
  domainDescription: string
  domainColorHex: string
  domainStatus: DomainStatus
  sortOrder: number
  plannedEntryCount: number
  entryCount: number
  subdomains: SubdomainSummary[]
}

export interface Subdomain {
  id: number
  domainId: number
  subdomainName: string
  subdomainSlug: string
  subdomainDescription: string | null
  sortOrder: number
  createdAt: Date
  updatedAt: Date
  domain?: Domain
  entries?: Entry[]
}

// ============================================================
// ENTRY & RELATED MODELS
// ============================================================

export interface Entry {
  id: number
  entryType: EntryType
  entryTitle: string
  entrySlug: string
  domainId: number
  subdomainId: number
  summary: string
  entryBody: Record<string, unknown> | null
  authorityPrimary: string | null
  authorityPrimaryUrl: string | null
  authoritySecondary: string | null
  verificationLevel: VerificationLevel
  status: EntryStatus
  examLevelTags: string[] | null
  sortOrder: number
  isFeatured: boolean
  seoTitle: string | null
  seoDescription: string | null
  wordCount: number | null
  publishedAt: Date | null
  lastReviewedAt: Date | null
  createdAt: Date
  updatedAt: Date
  domain?: Domain
  subdomain?: Subdomain
  standardDetail?: StandardDetail | null
  journalEntries?: EntryJournalEntry[]
  illustrations?: EntryIllustration[]
  notes?: EntryNote[]
  faqs?: EntryFAQ[]
  resources?: EntryResource[]
  relationsFrom?: EntryRelationship[]
  relationsTo?: EntryRelationship[]
}

export interface EntryWithRelations extends Entry {
  domain: Domain
  subdomain: Subdomain
  standardDetail: StandardDetail | null
  journalEntries: EntryJournalEntry[]
  illustrations: EntryIllustration[]
  notes: EntryNote[]
  faqs: EntryFAQ[]
  resources: EntryResource[]
  relationsFrom: EntryRelationship[]
  relationsTo: EntryRelationship[]
}

// ============================================================
// STANDARD DETAIL & CHILDREN
// ============================================================

export interface StandardDetail {
  id: number
  entryId: number
  standardCode: string
  standardFramework: StandardFramework
  standardStatus: StandardStatus
  standardStatusYear: number | null
  issuingBody: string
  dateIssued: Date | null
  dateEffective: Date | null
  dateRevised: Date | null
  applicabilitySummary: string | null
  quickBullet1Icon: string | null
  quickBullet1Label: string | null
  quickBullet1Desc: string | null
  quickBullet2Icon: string | null
  quickBullet2Label: string | null
  quickBullet2Desc: string | null
  quickBullet3Icon: string | null
  quickBullet3Label: string | null
  quickBullet3Desc: string | null
  objectiveText: string | null
  objectiveSourcePara: string | null
  objectiveCommentary: string | null
  objectiveKeyIssues: string[] | null
  scopeStatement: string | null
  scopeIncluded: string[] | null
  scopeExcluded: string[] | null
  scopeSpecialCases: string[] | null
  provisionsRecognitionIntro: string | null
  provisionsRecognitionBody: Record<string, unknown> | null
  provisionsMeasurementIntro: string | null
  provisionsMeasurementModel1: Record<string, unknown> | null
  provisionsMeasurementModel2: Record<string, unknown> | null
  provisionsMeasurementBody: Record<string, unknown> | null
  comparisonStd2EntryId: number | null
  comparisonStd3EntryId: number | null
  keyDifferences: Record<string, unknown>[] | null
  applicabilityMatrix: Record<string, unknown>[] | null
  entry?: Entry
  definitions?: StandardDefinition[]
  disclosureGroups?: StandardDisclosureGroup[]
  comparisonRows?: StandardComparisonRow[]
  amendments?: StandardAmendment[]
}

export interface StandardDefinition {
  id: number
  standardDetailId: number
  defTerm: string
  defParaReference: string | null
  defOfficialText: string
  defPlainExplanation: string | null
  sortOrder: number
}

export interface StandardDisclosureGroup {
  id: number
  standardDetailId: number
  groupHeading: string
  groupParaRange: string | null
  sortOrder: number
  items?: StandardDisclosureItem[]
}

export interface StandardDisclosureItem {
  id: number
  disclosureGroupId: number
  itemText: string
  itemParaRef: string | null
  itemIsConditional: boolean
  itemConditionNote: string | null
  sortOrder: number
}

export interface StandardComparisonRow {
  id: number
  standardDetailId: number
  criterion: string
  valueStd1: string | null
  valueStd2: string | null
  valueStd3: string | null
  isDifferent: boolean
  differenceNote: string | null
  sortOrder: number
}

export interface StandardAmendment {
  id: number
  standardDetailId: number
  amendmentDate: Date
  amendmentType: AmendmentType
  amendmentAuthority: string | null
  amendmentDescription: string | null
  amendmentKeyChanges: string[] | null
  amendmentOfficialUrl: string | null
  sortOrder: number
}

// ============================================================
// JOURNAL ENTRIES
// ============================================================

export interface EntryJournalEntry {
  id: number
  entryId: number
  jeScenarioTitle: string | null
  jeLabel: string | null
  jeParaRef: string | null
  jeCategoryHeading: string | null
  jeNarration: string | null
  sortOrder: number
  rows?: JournalEntryRow[]
}

export interface JournalEntryRow {
  id: number
  journalEntryId: number
  rowType: JERowType
  accountName: string | null
  drAmount: number | null
  crAmount: number | null
  sortOrder: number
}

// ============================================================
// ILLUSTRATIONS
// ============================================================

export interface EntryIllustration {
  id: number
  entryId: number
  illusTitle: string
  illusScenario: string | null
  illusWorking: string | null
  illusAnswer: string | null
  illusNote: string | null
  illusDifficulty: IllusDifficulty
  illusParaRef: string | null
  illusFsImpact: Record<string, unknown> | null
  sortOrder: number
}

// ============================================================
// RELATIONSHIPS
// ============================================================

export interface EntryRelationship {
  id: number
  entryId: number
  relatedEntryId: number
  relationshipType: RelationshipType
  sortOrder: number
  entry?: Entry
  relatedEntry?: Entry
}

export interface StandardEquivalent {
  id: number
  standardEntryId: number
  equivalentEntryId: number
  supersedesEntryId: number | null
  supersededByEntryId: number | null
}

// ============================================================
// RESOURCES, NOTES, FAQs
// ============================================================

export interface EntryResource {
  id: number
  entryId: number
  resourceType: ResourceType
  resourceTitle: string
  resourceUrl: string | null
  mediaFileId: number | null
  sourceType: ResourceSourceType
  videoChannel: string | null
  refYear: number | null
  sortOrder: number
  mediaFile?: MediaFile | null
}

export interface EntryNote {
  id: number
  entryId: number
  noteType: NoteType
  noteTitle: string | null
  noteBody: string
  sortOrder: number
}

export interface EntryFAQ {
  id: number
  entryId: number
  faqQuestion: string
  faqAnswer: string
  faqSourceRef: string | null
  faqCategory: FAQCategory
  sortOrder: number
}

// ============================================================
// GLOSSARY
// ============================================================

export interface GlossaryTerm {
  id: number
  term: string
  termSlug: string
  shortDefinition: string
  fullDefinition: Record<string, unknown> | null
  authoritySource: string | null
  authorityUrl: string | null
  relatedTerms: string[] | null
  standardRefs: string[] | null
  examLevelTags: string[] | null
  status: EntryStatus
  lastReviewedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

// ============================================================
// MEDIA
// ============================================================

export interface MediaFile {
  id: number
  fileName: string
  filePath: string
  fileSizeBytes: number | null
  sourceType: ResourceSourceType
  uploadedAt: Date
}

// ============================================================
// HOMEPAGE COMPONENT PROPS
// ============================================================

export interface DomainCardProps {
  domain: StaticDomainData
  variant?: 'default' | 'compact' | 'featured'
}

export interface FeaturedEntryProps {
  entry: {
    id: number
    entryTitle: string
    entrySlug: string
    entryType: EntryType
    summary: string
    verificationLevel: VerificationLevel
    domain: {
      domainCode: string
      domainName: string
      domainSlug: string
      domainColorHex: string
    }
    subdomain: {
      subdomainName: string
      subdomainSlug: string
    }
    lastReviewedAt: Date | null
    wordCount: number | null
  }
}

export interface StatsDisplayProps {
  totalEntries: number
  totalDomains: number
  totalStandards: number
  totalGlossaryTerms: number
}

// ============================================================
// NAVIGATION TYPES
// ============================================================

export interface DropdownItem {
  label: string
  href: string
  description?: string
  badge?: string
}

export interface NavItem {
  label: string
  href?: string
  dropdown?: DropdownItem[]
  badge?: string
  isExternal?: boolean
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

// ============================================================
// SEARCH TYPES
// ============================================================

export interface SearchResult {
  id: number
  title: string
  slug: string
  type: EntryType | 'GLOSSARY_TERM'
  summary: string
  domainCode: string
  domainName: string
  domainSlug: string
  domainColorHex: string
  score?: number
}

export interface SearchState {
  query: string
  results: SearchResult[]
  isLoading: boolean
  hasSearched: boolean
}

// ============================================================
// PAGE-LEVEL PROP TYPES
// ============================================================

export interface DomainPageProps {
  params: { domainSlug: string }
}

export interface EntryPageProps {
  params: { domainSlug: string; entrySlug: string }
}

export interface StandardPageProps {
  params: { framework: string; standardCode: string }
}

// ============================================================
// LAYOUT / UI TYPES
// ============================================================

export interface SidebarSection {
  title: string
  items: SidebarItem[]
}

export interface SidebarItem {
  label: string
  href: string
  isActive?: boolean
  count?: number
  indent?: number
}

export interface TableOfContentsItem {
  id: string
  label: string
  level: 1 | 2 | 3
  children?: TableOfContentsItem[]
}

export interface BadgeProps {
  label: string
  variant: 'verified' | 'draft' | 'placeholder' | 'domain' | 'framework' | 'exam'
  color?: string
  size?: 'sm' | 'md'
}

export interface VerificationBadgeProps {
  level: VerificationLevel
  lastReviewedAt?: Date | string | null
  size?: 'sm' | 'md'
}
