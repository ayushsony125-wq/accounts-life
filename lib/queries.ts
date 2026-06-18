import { prisma } from './db'
import {
  SEARCH_INDEX,
  GLOSSARY_TERMS,
  groupTermsByLetter,
  ACCRUAL_CONCEPT_ENTRY,
  AS_1_ENTRY,
  IND_AS_1_ENTRY,
  type GlossaryEntry
} from './data/static-entries'
import { DOMAINS } from './data/domains'

function sanitizeText(str: string): string {
  if (!str) return ''
  return str
    .replace(/\s*\(\s*(ICAI|MCA|MCS)\s*\)/gi, '')
    .replace(/\b(ICAI|MCA|MCS)\b/gi, '')
    .replace(/\(Institute of Chartered Accountants of India\)/gi, '')
    .replace(/\bNational Advisory Committee on Accounting Standards\b/gi, 'Accounting Advisory Committee')
    .replace(/\s*\(\s*\)/g, '')
    .replace(/\s*[-—]\s*$/, '')
    .replace(/^\s*[-—]\s*/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function sanitizeObject<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj
  if (typeof obj === 'string') {
    return sanitizeText(obj) as unknown as T
  }
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item)) as unknown as T
  }
  if (typeof obj === 'object') {
    const newObj = {} as any
    for (const key of Object.keys(obj)) {
      if (key.toLowerCase().includes('url') || key === 'id' || key === 'slug' || key === 'href') {
        newObj[key] = (obj as any)[key]
      } else {
        newObj[key] = sanitizeObject((obj as any)[key])
      }
    }
    return newObj as T
  }
  return obj
}

// Configuration flag to switch between mock static data and active Prisma queries.
// Set to true when PostgreSQL database is live and seeded.
const USE_DATABASE = true

// Helper to load and parse dynamic local database changes
const getLocalDb = () => {
  if (typeof window !== 'undefined') {
    return { entries: [], domains: [], glossary: [], media: [] }
  }
  try {
    const fs = require('fs')
    const path = require('path')
    const filePath = path.join(process.cwd(), 'lib/data/dynamic-db.json')
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
  } catch (e) {
    // Ignore error
  }
  return { entries: [], domains: [], glossary: [], media: [] }
}

// ============================================================
// DOMAIN QUERIES
// ============================================================

export async function getDomains() {
  if (USE_DATABASE) {
    try {
      return sanitizeObject(await prisma.domain.findMany({
        orderBy: { sortOrder: 'asc' },
        include: { subdomains: true },
      }))
    } catch (e) {
      console.warn('Prisma getDomains failed, using fallback.', e)
    }
  }

  const localDb = getLocalDb()
  return sanitizeObject(DOMAINS.map((d) => {
    const override = localDb.domains?.find((ld: any) => ld.domainCode === d.domainCode)
    if (override) {
      return {
        ...d,
        domainTagline: override.domainTagline || d.domainTagline,
        domainDescription: override.domainDescription || d.domainDescription,
      }
    }
    return d
  }))
}

export async function getDomainBySlug(slug: string) {
  if (USE_DATABASE) {
    try {
      return sanitizeObject(await prisma.domain.findUnique({
        where: { domainSlug: slug },
        include: { subdomains: true },
      }))
    } catch (e) {
      console.warn('Prisma getDomainBySlug failed, using fallback.', e)
    }
  }

  const domains = await getDomains()
  return sanitizeObject(domains.find((d) => d.domainSlug === slug) || null)
}

// ============================================================
// TOPIC / GENERIC CONCEPT ENTRY QUERIES
// ============================================================

export async function getEntryBySlug(
  domainSlug: string,
  subSlug: string,
  entrySlug: string
): Promise<any> {
  if (USE_DATABASE) {
    try {
      const entry = await prisma.entry.findFirst({
        where: {
          entrySlug: entrySlug,
          domain: { domainSlug: domainSlug },
          subdomain: { subdomainSlug: subSlug },
        },
        include: {
          domain: true,
          subdomain: true,
          journalEntries: {
            include: { rows: true },
            orderBy: { sortOrder: 'asc' },
          },
          illustrations: {
            orderBy: { sortOrder: 'asc' },
          },
          notes: {
            orderBy: { sortOrder: 'asc' },
          },
          faqs: {
            orderBy: { sortOrder: 'asc' },
          },
          resources: {
            orderBy: { sortOrder: 'asc' },
          },
        },
      })
      if (entry) {
        const body: any = (typeof entry.entryBody === 'string'
          ? JSON.parse(entry.entryBody)
          : entry.entryBody) || {}

        const mappedResources = entry.resources.map((r: any) => {
          if (r.resourceType === 'PDF' && r.resourceUrl && r.resourceUrl.startsWith('data:')) {
            return { ...r, resourceUrl: `/api/pdfs/${entry.entrySlug}` }
          }
          return r
        })

        return sanitizeObject({
          ...entry,
          resources: mappedResources,
          sections: body.sections || [],
          keyPoints: body.keyPoints || [],
          formula: body.formula || null,
          notes: entry.notes.length > 0 ? entry.notes : (body.notes || []),
          faqs: entry.faqs.length > 0 ? entry.faqs : (body.faqs || []),
        })
      }
    } catch (e) {
      console.warn('Prisma getEntryBySlug failed, using fallback.', e)
    }
  }

  // Load from local DB entries first
  const localDb = getLocalDb()
  const localEntry = localDb.entries?.find(
    (e: any) =>
      e.entrySlug === entrySlug &&
      e.domain?.domainSlug === domainSlug &&
      e.subdomain?.subdomainSlug === subSlug
  )
  if (localEntry) return sanitizeObject(localEntry)

  // Fallback to static entries
  if (entrySlug === 'accrual-concept') {
    return sanitizeObject(ACCRUAL_CONCEPT_ENTRY)
  }

  // Robust fallback: Check if the entry is listed in our search index.
  const searchMatch = SEARCH_INDEX.find(
    (e) => e.slug.endsWith(entrySlug) && e.type !== 'GLOSSARY_TERM'
  )

  if (searchMatch) {
    return sanitizeObject({
      id: searchMatch.id,
      entryTitle: searchMatch.title,
      entrySlug: entrySlug,
      entryType: searchMatch.type,
      summary: searchMatch.summary,
      verificationLevel: 'PLACEHOLDER' as const,
      authorityPrimary: searchMatch.type === 'STANDARD' ? 'ICAI Official Publication' : 'ICAI Reference Material',
      authorityPrimaryUrl: 'https://www.icai.org',
      authoritySecondary: 'The complete commentary and exam guides for this topic are currently being prepared.',
      wordCount: 210,
      lastReviewedAt: '2026-06-08',
      examLevelTags: ['CA Intermediate'],
      domain: {
        domainCode: searchMatch.domainCode,
        domainName: searchMatch.domainName,
        domainSlug: searchMatch.domainSlug,
        domainColorHex: searchMatch.domainColorHex,
      },
      subdomain: {
        subdomainName: 'Detailed Guidance',
        subdomainSlug: subSlug,
      },
      sections: [
        {
          id: 'overview',
          heading: 'Overview',
          level: 1 as const,
          body: `This page is a placeholder for "${searchMatch.title}". Our curriculum writers are currently assembling comprehensive guidelines, real-world illustrations, and journal entries for this section.`,
        },
        {
          id: 'applicability',
          heading: 'Applicability & Context',
          level: 1 as const,
          body: `This concept resides under ${searchMatch.domainName} (${searchMatch.domainCode}). It is tested in professional exams (CA, CMA, and CS) and is essential for mastering Indian accounting frameworks. Check back soon for the fully-vetted learning guide.`,
        }
      ],
      keyPoints: [
        `Topic: ${searchMatch.title}`,
        `Part of domain: ${searchMatch.domainName}`,
        'Structured reference text and ledger entry examples coming soon.',
      ],
      notes: [
        {
          type: 'NOTE' as const,
          body: 'This content is scheduled for detailed publication in the next release batch. Keep this page bookmarked for reference updates.',
        }
      ]
    })
  }

  return null
}

// ============================================================
// STANDARD DETAILS QUERIES
// ============================================================

function mapStandardDetail(std: any) {
  if (!std) return null

  const quickBullets = []
  if (std.quickBullet1Label) {
    quickBullets.push({
      icon: std.quickBullet1Icon || '🏢',
      label: std.quickBullet1Label,
      desc: std.quickBullet1Desc || '',
    })
  }
  if (std.quickBullet2Label) {
    quickBullets.push({
      icon: std.quickBullet2Icon || '📋',
      label: std.quickBullet2Label,
      desc: std.quickBullet2Desc || '',
    })
  }
  if (std.quickBullet3Label) {
    quickBullets.push({
      icon: std.quickBullet3Icon || '📋',
      label: std.quickBullet3Label,
      desc: std.quickBullet3Desc || '',
    })
  }

  const keyIssues = typeof std.objectiveKeyIssues === 'string'
    ? JSON.parse(std.objectiveKeyIssues)
    : (std.objectiveKeyIssues || [])
  const scopeIncluded = typeof std.scopeIncluded === 'string'
    ? JSON.parse(std.scopeIncluded)
    : (std.scopeIncluded || [])
  const scopeExcluded = typeof std.scopeExcluded === 'string'
    ? JSON.parse(std.scopeExcluded)
    : (std.scopeExcluded || [])
  const scopeSpecialCases = typeof std.scopeSpecialCases === 'string'
    ? JSON.parse(std.scopeSpecialCases)
    : (std.scopeSpecialCases || [])
  const keyDifferences = typeof std.keyDifferences === 'string'
    ? JSON.parse(std.keyDifferences)
    : (std.keyDifferences || [])
  const applicabilityMatrix = typeof std.applicabilityMatrix === 'string'
    ? JSON.parse(std.applicabilityMatrix)
    : (std.applicabilityMatrix || [])

  return {
    ...std,
    entryTitle: std.entry.entryTitle,
    summary: std.entry.summary,
    verificationLevel: std.entry.verificationLevel,
    quickBullets: quickBullets,
    objective: std.standardFramework === 'AS'
      ? {
          text: std.objectiveText || '',
          sourcePara: std.objectiveSourcePara || '',
          commentary: std.objectiveCommentary || '',
          keyIssues: keyIssues,
        }
      : (std.objectiveText || ''),
    scope: {
      statement: std.scopeStatement || '',
      included: scopeIncluded,
      excluded: scopeExcluded,
      specialCases: scopeSpecialCases,
    },
    keyDifferences: keyDifferences,
    applicabilityMatrix: applicabilityMatrix,
    comparison: {
      std2Title: std.standardFramework === 'AS' ? 'Ind AS equivalent' : 'AS equivalent',
      rows: std.comparisonRows || [],
    },
    faqs: std.entry.faqs?.map((f: any) => ({
      id: f.id,
      question: f.faqQuestion,
      answer: f.faqAnswer,
      sourceRef: f.faqSourceRef,
    })) || [],
    journalEntryNotes: std.entry.journalEntries?.map((je: any) => ({
      scenario: je.jeScenarioTitle || je.jeLabel || '',
      treatment: je.jeNarration || '',
    })) || [],
    relatedStandards: std.entry.relationsFrom
      ?.filter((rel: any) => rel.relatedEntry?.entryType === 'STANDARD' && rel.relatedEntry?.status === 'PUBLISHED')
      ?.map((rel: any) => {
        const related = rel.relatedEntry
        const detail = related?.standardDetail
        return {
          code: detail?.standardCode || '',
          title: related?.entryTitle || '',
          slug: related?.entrySlug || '',
          color: detail?.standardFramework === 'AS' ? '#0F6B5E' : '#6B3FA0',
          framework: detail?.standardFramework === 'AS' ? 'as' : 'ind-as',
        }
      }) || []
  }
}

export async function getASStandardBySlug(slug: string): Promise<any> {
  if (USE_DATABASE) {
    try {
      const std = await prisma.standardDetail.findFirst({
        where: {
          standardFramework: 'AS',
          entry: { entrySlug: slug },
        },
        include: {
          entry: {
            include: {
              domain: true,
              subdomain: true,
              faqs: { orderBy: { sortOrder: 'asc' } },
              journalEntries: {
                include: { rows: true },
                orderBy: { sortOrder: 'asc' },
              },
              relationsFrom: {
                include: {
                  relatedEntry: {
                    include: {
                      standardDetail: true
                    }
                  }
                },
                orderBy: { sortOrder: 'asc' },
              },
            }
          },
          definitions: { orderBy: { sortOrder: 'asc' } },
          disclosureGroups: {
            include: { items: { orderBy: { sortOrder: 'asc' } } },
            orderBy: { sortOrder: 'asc' },
          },
          comparisonRows: { orderBy: { sortOrder: 'asc' } },
          amendments: { orderBy: { sortOrder: 'asc' } },
        },
      })
      if (std) return sanitizeObject(mapStandardDetail(std))
    } catch (e) {
      console.warn('Prisma getASStandardBySlug failed, using fallback.', e)
    }
  }

  // Load from local DB first
  const localDb = getLocalDb()
  const localEntry = localDb.entries?.find(
    (e: any) =>
      e.entryType === 'STANDARD' &&
      e.standardFramework === 'AS' &&
      e.entrySlug === slug
  )
  if (localEntry) return sanitizeObject(localEntry)

  // Fallback to static entries
  if (slug === 'as-1') {
    return sanitizeObject(AS_1_ENTRY)
  }

  // Construct a standard placeholder for other AS standards present in the index
  const match = SEARCH_INDEX.find(
    (e) => e.slug.endsWith(`/as/${slug}`) || e.slug.endsWith(`/${slug}`)
  )

  if (match) {
    return sanitizeObject({
      entryTitle: match.title,
      entrySlug: slug,
      summary: match.summary,
      verificationLevel: 'PLACEHOLDER' as const,
      wordCount: 150,
      lastReviewedAt: '2026-06-08',
      authorityPrimary: 'ICAI — Accounting Standards Board',
      authorityPrimaryUrl: 'https://www.icai.org/post/accounting-standards',
      standardCode: match.title.split(' — ')[0] || 'AS Standard',
      standardFramework: 'AS' as const,
      standardStatus: 'ACTIVE' as const,
      issuingBody: 'ICAI (Institute of Chartered Accountants of India)',
      dateIssued: '2016-01-01',
      dateEffective: '2016-04-01',
      applicabilitySummary: 'Applicable to companies preparing financial statements under Indian GAAP (AS framework).',
      quickBullets: [
        { icon: '🏢', label: 'Framework', desc: 'Accounting Standards (AS)' },
        { icon: '📋', label: 'Status', desc: 'In development on platform' }
      ],
      objective: {
        text: `The objective of this standard is to prescribe the accounting treatment, presentation, and disclosures for ${match.title.split(' — ')[1] || 'this category'}.`,
        sourcePara: 'Official text in curation',
        commentary: 'A comprehensive, plain-language analysis of the standard, outlining key compliance traps and application rules, will be added here.',
        keyIssues: [
          'What are the core recognition thresholds?',
          'What measurement options are permitted on initial recognition?'
        ]
      },
      scope: {
        statement: 'This standard applies to all entities that prepare financial statements in accordance with the AS framework, subject to exemptions for Level II, III, and IV small and medium-sized enterprises.',
        included: ['Level I corporate enterprises', 'Non-corporate entities meeting the size criteria'],
        excluded: ['Entities required to prepare statements under the Ind AS framework']
      },
      definitions: [
        {
          term: 'Pending definition list',
          paraRef: 'AS Guidelines',
          officialText: '"Official clauses will be populated in the next release."',
          plainExplanation: 'Explanations and definitions are being loaded into the glossary database.'
        }
      ],
      recognitionRules: 'Pending verification of official recognition clauses.',
      measurementRules: 'Pending verification of official measurement bases.',
      disclosureGroups: [
        {
          heading: 'Core Disclosure Checklist',
          paraRange: 'AS Guidelines',
          items: [
            { text: 'Required disclosures will be listed in checklist format.' }
          ]
        }
      ],
      journalEntryNotes: [],
      comparison: {
        std2Title: 'Ind AS equivalent',
        rows: []
      },
      relatedStandards: [],
      faqs: []
    })
  }

  return null
}

export async function getIndASStandardBySlug(slug: string): Promise<any> {
  if (USE_DATABASE) {
    try {
      const std = await prisma.standardDetail.findFirst({
        where: {
          standardFramework: 'IND_AS',
          entry: { entrySlug: slug },
        },
        include: {
          entry: {
            include: {
              domain: true,
              subdomain: true,
              faqs: { orderBy: { sortOrder: 'asc' } },
              journalEntries: {
                include: { rows: true },
                orderBy: { sortOrder: 'asc' },
              },
              relationsFrom: {
                include: {
                  relatedEntry: {
                    include: {
                      standardDetail: true
                    }
                  }
                },
                orderBy: { sortOrder: 'asc' },
              },
            }
          },
          definitions: { orderBy: { sortOrder: 'asc' } },
          disclosureGroups: {
            include: { items: { orderBy: { sortOrder: 'asc' } } },
            orderBy: { sortOrder: 'asc' },
          },
          comparisonRows: { orderBy: { sortOrder: 'asc' } },
          amendments: { orderBy: { sortOrder: 'asc' } },
        },
      })
      if (std) return sanitizeObject(mapStandardDetail(std))
    } catch (e) {
      console.warn('Prisma getIndASStandardBySlug failed, using fallback.', e)
    }
  }

  // Load from local DB first
  const localDb = getLocalDb()
  const localEntry = localDb.entries?.find(
    (e: any) =>
      e.entryType === 'STANDARD' &&
      e.standardFramework === 'IND_AS' &&
      e.entrySlug === slug
  )
  if (localEntry) return sanitizeObject(localEntry)

  // Fallback to static entries
  if (slug === 'ind-as-1') {
    return sanitizeObject(IND_AS_1_ENTRY)
  }

  // Construct a standard placeholder for other Ind AS standards present in the index
  const match = SEARCH_INDEX.find(
    (e) => e.slug.endsWith(`/ind-as/${slug}`)
  )

  if (match) {
    return sanitizeObject({
      entryTitle: match.title,
      summary: match.summary,
      verificationLevel: 'PLACEHOLDER' as const,
      standardCode: match.title.split(' — ')[0] || 'Ind AS Standard',
      standardStatus: 'ACTIVE' as const,
      standardFramework: 'IND_AS' as const,
      issuingBody: 'MCA / NACAS (National Advisory Committee on Accounting Standards)',
      dateIssued: '2015-02-16',
      applicabilitySummary: 'Mandatory for listed companies and unlisted companies meeting Net Worth thresholds.',
      authorityPrimary: 'MCA — Companies (Indian Accounting Standards) Rules, 2015',
      authorityPrimaryUrl: 'https://www.mca.gov.in',
      objective: `The objective of this standard is to prescribe presentation and measurement criteria for ${match.title.split(' — ')[1] || 'this topic'}.`,
      scope: {
        included: ['Listed companies in India', 'Unlisted companies with net worth ≥ ₹250 crore'],
        excluded: ['SMEs complying with standard AS GAAP rules']
      },
      keyComponents: [
        {
          title: 'Overview',
          desc: 'Specific provisions and fair value rules are currently being summarized for publication.'
        }
      ],
      relatedStandards: [],
      faqs: []
    })
  }

  return null
}

// ============================================================
// GLOSSARY QUERIES
// ============================================================

export async function getGlossaryTerms() {
  if (USE_DATABASE) {
    try {
      const terms = await prisma.glossaryTerm.findMany({
        orderBy: { term: 'asc' },
      })
      return sanitizeObject(terms.map((t) => ({
        id: t.id,
        term: t.term,
        termSlug: t.termSlug,
        shortDefinition: t.shortDefinition,
        authoritySource: t.authoritySource,
        authorityUrl: t.authorityUrl,
        relatedTermSlugs: Array.isArray(t.relatedTerms) ? (t.relatedTerms as string[]) : [],
        standardRefs: Array.isArray(t.standardRefs) ? (t.standardRefs as string[]) : [],
        examLevelTags: Array.isArray(t.examLevelTags) ? (t.examLevelTags as string[]) : [],
        letter: t.term.charAt(0).toUpperCase(),
      })))
    } catch (e) {
      console.warn('Prisma getGlossaryTerms failed, using fallback.', e)
    }
  }
  const localDb = getLocalDb()
  const localGlossary = localDb.glossary || []
  return sanitizeObject([...localGlossary, ...GLOSSARY_TERMS])
}

export async function getGlossaryTermsByLetter(letter: string) {
  const terms = await getGlossaryTerms()
  return (terms as GlossaryEntry[]).filter(
    (t) => t.letter.toUpperCase() === letter.toUpperCase()
  )
}

export function getGlossaryLetters(): string[] {
  const localDb = getLocalDb()
  const mergedGlossary = [...(localDb.glossary || []), ...GLOSSARY_TERMS]
  const letters = new Set(mergedGlossary.map((t: any) => t.letter))
  return Array.from(letters).sort()
}

export function groupGlossaryTermsByLetter(): Record<string, GlossaryEntry[]> {
  return groupTermsByLetter()
}

// ============================================================
// SEARCH QUERIES
// ============================================================

export async function getSearchIndex() {
  if (USE_DATABASE) {
    try {
      const entries = await prisma.entry.findMany({
        where: { status: 'PUBLISHED' },
        include: {
          domain: true,
          subdomain: true,
          standardDetail: true,
        },
      })
      return sanitizeObject(entries.map((e) => {
        let slug = ''
        if (e.entryType === 'STANDARD' && e.standardDetail) {
          const fw = e.standardDetail.standardFramework.toLowerCase() === 'as' ? 'as' : 'ind-as'
          slug = `standards/${fw}/${e.entrySlug}`
        } else {
          slug = `${e.domain.domainSlug}/${e.subdomain.subdomainSlug}/${e.entrySlug}`
        }
        return {
          id: e.id,
          title: e.entryTitle,
          slug: slug,
          type: e.entryType,
          summary: e.summary,
          domainCode: e.domain.domainCode,
          domainName: e.domain.domainName,
          domainSlug: e.domain.domainSlug,
          domainColorHex: e.domain.domainColorHex,
        }
      }))
    } catch (e) {
      console.warn('Prisma getSearchIndex failed, using fallback.', e)
    }
  }

  const localDb = getLocalDb()
  const localSearchIndex = localDb.entries?.map((e: any) => ({
    id: e.id,
    title: e.entryTitle,
    slug: e.entryType === 'STANDARD'
      ? `standards/${e.standardFramework.toLowerCase() === 'as' ? 'as' : 'ind-as'}/${e.entrySlug}`
      : `${e.domain.domainSlug}/${e.subdomain.subdomainSlug}/${e.entrySlug}`,
    type: e.entryType,
    summary: e.summary,
    domainCode: e.domain.domainCode,
    domainName: e.domain.domainName,
    domainSlug: e.domain.domainSlug,
    domainColorHex: e.domain.domainColorHex,
  })) || []

  return sanitizeObject([...localSearchIndex, ...SEARCH_INDEX])
}

function mapStaticToDbEntry(staticEntry: any): any {
  const isAS = staticEntry.standardFramework === 'AS'
  const id = isAS ? 10 : 20
  const domainId = isAS ? 2 : 3
  const subdomainId = isAS ? 5 : 8

  return {
    id,
    entryTitle: staticEntry.entryTitle,
    entrySlug: staticEntry.entrySlug,
    entryType: 'STANDARD',
    domainId,
    subdomainId,
    summary: staticEntry.summary,
    verificationLevel: staticEntry.verificationLevel || 'VERIFIED',
    status: 'PUBLISHED',
    examLevelTags: ['CA Intermediate'],
    authorityPrimary: staticEntry.authorityPrimary || (isAS ? 'ICAI — Accounting Standard 1' : 'MCA — Companies (Indian Accounting Standards) Rules, 2015'),
    authorityPrimaryUrl: staticEntry.authorityPrimaryUrl || '',
    authoritySecondary: staticEntry.authoritySecondary || '',
    isFeatured: false,
    seoTitle: staticEntry.seoTitle || staticEntry.entryTitle,
    seoDescription: staticEntry.seoDescription || staticEntry.summary.substring(0, 155),
    sections: staticEntry.sections || [],
    faqs: (staticEntry.faqs || []).map((f: any) => ({
      faqQuestion: f.question || f.faqQuestion || '',
      faqAnswer: f.answer || f.faqAnswer || '',
      faqSourceRef: f.sourceRef || f.faqSourceRef || '',
      faqCategory: f.category || f.faqCategory || 'GENERAL'
    })),
    notes: (staticEntry.notes || []).map((n: any) => ({
      noteType: n.noteType || n.type || 'NOTE',
      noteTitle: n.noteTitle || n.title || '',
      noteBody: n.noteBody || n.body || ''
    })),
    journalEntries: (staticEntry.journalEntryNotes || []).map((je: any) => ({
      jeScenarioTitle: je.scenario || '',
      jeNarration: je.treatment || '',
      rows: [
        { rowType: 'DR', accountName: 'Appropriate Debit Account', drAmount: '', crAmount: '' },
        { rowType: 'CR', accountName: 'Appropriate Credit Account', drAmount: '', crAmount: '' }
      ]
    })),
    illustrations: (staticEntry.examples || []).map((illus: any) => ({
      illusTitle: illus.title || '',
      illusScenario: illus.scenario || '',
      illusWorking: illus.working || '',
      illusAnswer: illus.answer || '',
      illusNote: illus.note || '',
      illusDifficulty: illus.difficulty || 'BEGINNER'
    })),
    resources: (staticEntry.resources || []).map((r: any) => ({
      resourceType: r.type || 'REFERENCE',
      resourceTitle: r.title || '',
      resourceUrl: r.url || ''
    })),
    standardDetail: {
      standardCode: staticEntry.standardCode || '',
      standardFramework: staticEntry.standardFramework || 'AS',
      standardStatus: staticEntry.standardStatus || 'ACTIVE',
      issuingBody: staticEntry.issuingBody || (isAS ? 'ICAI' : 'MCA'),
      dateIssued: staticEntry.dateIssued || null,
      dateEffective: staticEntry.dateEffective || null,
      applicabilitySummary: staticEntry.applicabilitySummary || '',
      objectiveText: (typeof staticEntry.objective === 'string' ? staticEntry.objective : staticEntry.objective?.text) || '',
      objectiveSourcePara: staticEntry.objective?.sourcePara || '',
      objectiveCommentary: staticEntry.objective?.commentary || '',
      objectiveKeyIssues: staticEntry.objective?.keyIssues || [],
      scopeStatement: staticEntry.scope?.statement || '',
      scopeIncluded: staticEntry.scope?.included || [],
      scopeExcluded: staticEntry.scope?.excluded || [],
      definitions: (staticEntry.definitions || []).map((def: any) => ({
        defTerm: def.term || def.defTerm || '',
        defParaReference: def.paraRef || def.defParaReference || '',
        defOfficialText: def.officialText || def.defOfficialText || '',
        defPlainExplanation: def.plainExplanation || def.defPlainExplanation || ''
      })),
      disclosureGroups: (staticEntry.disclosureGroups || []).map((g: any) => ({
        groupHeading: g.heading || g.groupHeading || '',
        groupParaRange: g.paraRange || g.groupParaRange || '',
        items: (g.items || []).map((item: any) => ({
          itemText: item.text || item.itemText || '',
          itemIsConditional: item.isConditional || item.itemIsConditional || false
        }))
      })),
      comparisonRows: (staticEntry.comparison?.rows || []).map((row: any) => ({
        criterion: row.criterion || '',
        valueStd1: row.as || row.valueStd1 || '',
        valueStd2: row.indAs || row.valueStd2 || '',
        isDifferent: row.isDifferent || false
      }))
    }
  }
}

export async function getEntryById(id: number): Promise<any> {
  if (USE_DATABASE) {
    try {
      const entry = await prisma.entry.findUnique({
        where: { id },
        include: {
          domain: true,
          subdomain: true,
          journalEntries: {
            include: { rows: true },
            orderBy: { sortOrder: 'asc' },
          },
          illustrations: {
            orderBy: { sortOrder: 'asc' },
          },
          notes: {
            orderBy: { sortOrder: 'asc' },
          },
          faqs: {
            orderBy: { sortOrder: 'asc' },
          },
          resources: {
            orderBy: { sortOrder: 'asc' },
          },
          standardDetail: {
            include: {
              definitions: { orderBy: { sortOrder: 'asc' } },
              disclosureGroups: {
                include: { items: { orderBy: { sortOrder: 'asc' } } },
                orderBy: { sortOrder: 'asc' },
              },
              comparisonRows: { orderBy: { sortOrder: 'asc' } },
              amendments: { orderBy: { sortOrder: 'asc' } },
            }
          }
        }
      })
      if (entry) {
        const mappedResources = entry.resources.map((r: any) => {
          if (r.resourceType === 'PDF' && r.resourceUrl && r.resourceUrl.startsWith('data:')) {
            return { ...r, resourceUrl: `/api/pdfs/${entry.entrySlug}` }
          }
          return r
        })
        return sanitizeObject({
          ...entry,
          resources: mappedResources
        })
      }
    } catch (e) {
      console.warn(`Prisma getEntryById failed for id ${id}:`, e)
    }
  }

  const localDb = getLocalDb()
  const localEntry = localDb.entries?.find((e: any) => e.id === id)
  if (localEntry) return sanitizeObject(localEntry)

  if (id === 10) {
    return sanitizeObject(mapStaticToDbEntry(AS_1_ENTRY))
  }
  if (id === 20) {
    return sanitizeObject(mapStaticToDbEntry(IND_AS_1_ENTRY))
  }

  // Robust search index fallback
  const searchMatch = SEARCH_INDEX.find(item => item.id === id)
  if (searchMatch) {
    const slug = searchMatch.slug.split('/').pop() || ''
    if (slug === 'as-1') {
      return sanitizeObject(mapStaticToDbEntry(AS_1_ENTRY))
    }
    if (slug === 'ind-as-1') {
      return sanitizeObject(mapStaticToDbEntry(IND_AS_1_ENTRY))
    }
  }

  return null
}

export async function getAllEntries(): Promise<any[]> {
  if (USE_DATABASE) {
    try {
      return sanitizeObject(await prisma.entry.findMany({
        include: {
          domain: true,
          subdomain: true,
        },
        orderBy: { sortOrder: 'asc' },
      }) as any)
    } catch (e) {
      console.warn('Prisma getAllEntries failed, using fallback.', e)
    }
  }

  const localDb = getLocalDb()
  const localEntries = localDb.entries || []

  const staticEntries = SEARCH_INDEX.map((item) => ({
    id: item.id,
    entryTitle: item.title,
    entrySlug: item.slug.split('/').pop() || '',
    entryType: item.type,
    summary: item.summary,
    verificationLevel: 'VERIFIED',
    status: 'PUBLISHED',
    domain: {
      domainCode: item.domainCode,
      domainName: item.domainName,
      domainSlug: item.domainSlug,
      domainColorHex: item.domainColorHex,
    },
    subdomain: {
      subdomainName: 'Core Guidance',
      subdomainSlug: item.slug.split('/')[1] || 'general',
    },
    updatedAt: new Date().toISOString(),
  }))

  const combined = [...localEntries]
  for (const se of staticEntries) {
    if (!combined.some((le: any) => le.id === se.id || le.entrySlug === se.entrySlug)) {
      combined.push(se)
    }
  }

  return sanitizeObject(combined)
}

