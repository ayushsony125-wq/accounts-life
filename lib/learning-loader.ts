import { prisma } from './db'
import fs from 'fs'
import path from 'path'

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

const EXCLUDED_SANITIZATION_KEYS = new Set([
  'entryBody', 'blocks', 'examplesHtml', 'illustrations', 'notes', 'faqs',
  'definitions', 'disclosureGroups', 'comparisonRows', 'comparison',
  'content', 'examples', 'scenario', 'working', 'answer', 'note',
  'body', 'question', 'text', 'statement', 'included', 'excluded'
])

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
      if (
        key.toLowerCase().includes('url') || 
        key === 'id' || 
        key === 'slug' || 
        key === 'href' ||
        EXCLUDED_SANITIZATION_KEYS.has(key)
      ) {
        newObj[key] = (obj as any)[key]
      } else {
        newObj[key] = sanitizeObject((obj as any)[key])
      }
    }
    return newObj as T
  }
  return obj
}

export interface Standard {
  id: string
  code: string
  title: string
  shortTitle: string
  framework: 'AS' | 'Ind AS'
  description: string
  intro?: string
  content: {
    objective: string
    scope: {
      statement: string
      included: string[]
      excluded: string[]
    }
    keyPrinciples: { title: string; body: string }[]
  }
  examples: {
    title: string
    scenario: string
    guidance: string
    working?: string
    answer?: string
    note?: string
    difficulty?: string
    paraRef?: string
  }[]
  lectureUrl: string
  pdfPagesCount: number
  resources?: { title: string; url: string; type: 'PDF' | 'VIDEO' | 'REFERENCE' }[]
  faqs?: {
    id?: number
    question: string
    answer: string
    sourceRef?: string
    category?: string
  }[]
  definitions?: {
    term: string
    paraRef?: string
    officialText: string
    plainExplanation?: string
  }[]
  disclosureGroups?: {
    heading: string
    paraRange?: string
    items: { text: string; isConditional?: boolean }[]
  }[]
  comparison?: {
    std2Title: string
    rows: { criterion: string; as: string; indAs: string; isDifferent?: boolean; differenceNote?: string }[]
  }
  blocks?: any[]
  examplesHtml?: string
}

// Complete static indices with professional naming
const ALL_AS_INDEX = [
  { id: 'intro-as', code: 'Intro', shortTitle: 'Introduction to Accounting Standards and Their Applicability', title: 'Introduction to Accounting Standards and Their Applicability' },
  { id: 'as-1', code: 'AS 1', shortTitle: 'AS 1 – Disclosure of Accounting Policies', title: 'AS 1 – Disclosure of Accounting Policies' },
  { id: 'as-2', code: 'AS 2', shortTitle: 'AS 2 – Valuation of Inventories', title: 'AS 2 – Valuation of Inventories' },
  { id: 'as-3', code: 'AS 3', shortTitle: 'AS 3 – Cash Flow Statements', title: 'AS 3 – Cash Flow Statements' },
  { id: 'as-4', code: 'AS 4', shortTitle: 'AS 4 – Contingencies and Events', title: 'AS 4 – Contingencies and Events Occurring After the Balance Sheet Date' },
  { id: 'as-5', code: 'AS 5', shortTitle: 'AS 5 – Net Profit or Loss', title: 'AS 5 – Net Profit or Loss for the Period, Prior Period Items and Changes in Accounting Policies' },
  { id: 'as-7', code: 'AS 7', shortTitle: 'AS 7 – Construction Contracts', title: 'AS 7 – Construction Contracts' },
  { id: 'as-9', code: 'AS 9', shortTitle: 'AS 9 – Revenue Recognition', title: 'AS 9 – Revenue Recognition' },
  { id: 'as-10', code: 'AS 10', shortTitle: 'AS 10 – Property, Plant and Equipment', title: 'AS 10 – Property, Plant and Equipment' },
  { id: 'as-11', code: 'AS 11', shortTitle: 'AS 11 – Changes in Foreign Exchange Rates', title: 'AS 11 – The Effects of Changes in Foreign Exchange Rates' },
  { id: 'as-12', code: 'AS 12', shortTitle: 'AS 12 – Accounting for Government Grants', title: 'AS 12 – Accounting for Government Grants' },
  { id: 'as-13', code: 'AS 13', shortTitle: 'AS 13 – Accounting for Investments', title: 'AS 13 – Accounting for Investments' },
  { id: 'as-14', code: 'AS 14', shortTitle: 'AS 14 – Accounting for Amalgamations', title: 'AS 14 – Accounting for Amalgamations' },
  { id: 'as-15', code: 'AS 15', shortTitle: 'AS 15 – Employee Benefits', title: 'AS 15 – Employee Benefits' },
  { id: 'as-16', code: 'AS 16', shortTitle: 'AS 16 – Borrowing Costs', title: 'AS 16 – Borrowing Costs' },
  { id: 'as-17', code: 'AS 17', shortTitle: 'AS 17 – Segment Reporting', title: 'AS 17 – Segment Reporting' },
  { id: 'as-18', code: 'AS 18', shortTitle: 'AS 18 – Related Party Disclosures', title: 'AS 18 – Related Party Disclosures' },
  { id: 'as-19', code: 'AS 19', shortTitle: 'AS 19 – Leases', title: 'AS 19 – Leases' },
  { id: 'as-20', code: 'AS 20', shortTitle: 'AS 20 – Earnings Per Share', title: 'AS 20 – Earnings Per Share' },
  { id: 'as-21', code: 'AS 21', shortTitle: 'AS 21 – Consolidated Financial Statements', title: 'AS 21 – Consolidated Financial Statements' },
  { id: 'as-22', code: 'AS 22', shortTitle: 'AS 22 – Accounting for Taxes on Income', title: 'AS 22 – Accounting for Taxes on Income' },
  { id: 'as-23', code: 'AS 23', shortTitle: 'AS 23 – Accounting for Investments in Associates', title: 'AS 23 – Accounting for Investments in Associates in Consolidated Financial Statements' },
  { id: 'as-24', code: 'AS 24', shortTitle: 'AS 24 – Discontinuing Operations', title: 'AS 24 – Discontinuing Operations' },
  { id: 'as-25', code: 'AS 25', shortTitle: 'AS 25 – Interim Financial Reporting', title: 'AS 25 – Interim Financial Reporting' },
  { id: 'as-26', code: 'AS 26', shortTitle: 'AS 26 – Intangible Assets', title: 'AS 26 – Intangible Assets' },
  { id: 'as-27', code: 'AS 27', shortTitle: 'AS 27 – Interests in Joint Ventures', title: 'AS 27 – Financial Reporting of Interests in Joint Ventures' },
  { id: 'as-28', code: 'AS 28', shortTitle: 'AS 28 – Impairment of Assets', title: 'AS 28 – Impairment of Assets' },
  { id: 'as-29', code: 'AS 29', shortTitle: 'AS 29 – Provisions and Contingencies', title: 'AS 29 – Provisions, Contingent Liabilities and Contingent Assets' },
]

const ALL_IND_AS_INDEX = [
  { id: 'intro-ind-as', code: 'Intro', shortTitle: 'Introduction to Accounting Standards and Their Applicability', title: 'Introduction to Indian Accounting Standards and Their Applicability' },
  { id: 'ind-as-1', code: 'Ind AS 1', shortTitle: 'Ind AS 1 – Presentation of Financial Statements', title: 'Ind AS 1 – Presentation of Financial Statements' },
  { id: 'ind-as-2', code: 'Ind AS 2', shortTitle: 'Ind AS 2 – Inventories', title: 'Ind AS 2 – Inventories' },
  { id: 'ind-as-7', code: 'Ind AS 7', shortTitle: 'Ind AS 7 – Statement of Cash Flows', title: 'Ind AS 7 – Statement of Cash Flows' },
  { id: 'ind-as-8', code: 'Ind AS 8', shortTitle: 'Ind AS 8 – Accounting Policies and Estimates', title: 'Ind AS 8 – Accounting Policies, Changes in Accounting Estimates and Errors' },
  { id: 'ind-as-10', code: 'Ind AS 10', shortTitle: 'Ind AS 10 – Events after Reporting Period', title: 'Ind AS 10 – Events after the Reporting Period' },
  { id: 'ind-as-12', code: 'Ind AS 12', shortTitle: 'Ind AS 12 – Income Taxes', title: 'Ind AS 12 – Income Taxes' },
  { id: 'ind-as-16', code: 'Ind AS 16', shortTitle: 'Ind AS 16 – Property, Plant and Equipment', title: 'Ind AS 16 – Property, Plant and Equipment' },
  { id: 'ind-as-19', code: 'Ind AS 19', shortTitle: 'Ind AS 19 – Employee Benefits', title: 'Ind AS 19 – Employee Benefits' },
  { id: 'ind-as-20', code: 'Ind AS 20', shortTitle: 'Ind AS 20 – Government Grants & Assistance', title: 'Ind AS 20 – Accounting for Government Grants and Disclosure of Government Assistance' },
  { id: 'ind-as-21', code: 'Ind AS 21', shortTitle: 'Ind AS 21 – Foreign Exchange Rate Changes', title: 'Ind AS 21 – The Effects of Changes in Foreign Exchange Rates' },
  { id: 'ind-as-23', code: 'Ind AS 23', shortTitle: 'Ind AS 23 – Borrowing Costs', title: 'Ind AS 23 – Borrowing Costs' },
  { id: 'ind-as-24', code: 'Ind AS 24', shortTitle: 'Ind AS 24 – Related Party Disclosures', title: 'Ind AS 24 – Related Party Disclosures' },
  { id: 'ind-as-27', code: 'Ind AS 27', shortTitle: 'Ind AS 27 – Separate Financial Statements', title: 'Ind AS 27 – Separate Financial Statements' },
  { id: 'ind-as-28', code: 'Ind AS 28', shortTitle: 'Ind AS 28 – Investments in Associates & JVs', title: 'Ind AS 28 – Investments in Associates and Joint Ventures' },
  { id: 'ind-as-29', code: 'Ind AS 29', shortTitle: 'Ind AS 29 – Hyperinflationary Economies', title: 'Ind AS 29 – Financial Reporting in Hyperinflationary Economies' },
  { id: 'ind-as-32', code: 'Ind AS 32', shortTitle: 'Ind AS 32 – Financial Instruments: Presentation', title: 'Ind AS 32 – Financial Instruments: Presentation' },
  { id: 'ind-as-33', code: 'Ind AS 33', shortTitle: 'Ind AS 33 – Earnings Per Share', title: 'Ind AS 33 – Earnings Per Share' },
  { id: 'ind-as-34', code: 'Ind AS 34', shortTitle: 'Ind AS 34 – Interim Financial Reporting', title: 'Ind AS 34 – Interim Financial Reporting' },
  { id: 'ind-as-36', code: 'Ind AS 36', shortTitle: 'Ind AS 36 – Impairment of Assets', title: 'Ind AS 36 – Impairment of Assets' },
  { id: 'ind-as-37', code: 'Ind AS 37', shortTitle: 'Ind AS 37 – Provisions and Contingencies', title: 'Ind AS 37 – Provisions, Contingent Liabilities and Contingent Assets' },
  { id: 'ind-as-38', code: 'Ind AS 38', shortTitle: 'Ind AS 38 – Intangible Assets', title: 'Ind AS 38 – Intangible Assets' },
  { id: 'ind-as-40', code: 'Ind AS 40', shortTitle: 'Ind AS 40 – Investment Property', title: 'Ind AS 40 – Investment Property' },
  { id: 'ind-as-41', code: 'Ind AS 41', shortTitle: 'Ind AS 41 – Agriculture', title: 'Ind AS 41 – Agriculture' },
  { id: 'ind-as-101', code: 'Ind AS 101', shortTitle: 'Ind AS 101 – First-time Adoption', title: 'Ind AS 101 – First-time Adoption of Indian Accounting Standards' },
  { id: 'ind-as-102', code: 'Ind AS 102', shortTitle: 'Ind AS 102 – Share-based Payment', title: 'Ind AS 102 – Share-based Payment' },
  { id: 'ind-as-103', code: 'Ind AS 103', shortTitle: 'Ind AS 103 – Business Combinations', title: 'Ind AS 103 – Business Combinations' },
  { id: 'ind-as-105', code: 'Ind AS 105', shortTitle: 'Ind AS 105 – Non-current Assets Held for Sale', title: 'Ind AS 105 – Non-current Assets Held for Sale and Discontinued Operations' },
  { id: 'ind-as-106', code: 'Ind AS 106', shortTitle: 'Ind AS 106 – Mineral Exploration Evaluation', title: 'Ind AS 106 – Exploration for and Evaluation of Mineral Resources' },
  { id: 'ind-as-107', code: 'Ind AS 107', shortTitle: 'Ind AS 107 – Financial Instruments: Disclosures', title: 'Ind AS 107 – Financial Instruments: Disclosures' },
  { id: 'ind-as-108', code: 'Ind AS 108', shortTitle: 'Ind AS 108 – Operating Segments', title: 'Ind AS 108 – Operating Segments' },
  { id: 'ind-as-109', code: 'Ind AS 109', shortTitle: 'Ind AS 109 – Financial Instruments', title: 'Ind AS 109 – Financial Instruments' },
  { id: 'ind-as-110', code: 'Ind AS 110', shortTitle: 'Ind AS 110 – Consolidated Fin Statements', title: 'Ind AS 110 – Consolidated Financial Statements' },
  { id: 'ind-as-111', code: 'Ind AS 111', shortTitle: 'Ind AS 111 – Joint Arrangements', title: 'Ind AS 111 – Joint Arrangements' },
  { id: 'ind-as-112', code: 'Ind AS 112', shortTitle: 'Ind AS 112 – Disclosure of Interests', title: 'Ind AS 112 – Disclosure of Interests in Other Entities' },
  { id: 'ind-as-113', code: 'Ind AS 113', shortTitle: 'Ind AS 113 – Fair Value Measurement', title: 'Ind AS 113 – Fair Value Measurement' },
  { id: 'ind-as-114', code: 'Ind AS 114', shortTitle: 'Ind AS 114 – Regulatory Deferral Accounts', title: 'Ind AS 114 – Regulatory Deferral Accounts' },
  { id: 'ind-as-115', code: 'Ind AS 115', shortTitle: 'Ind AS 115 – Revenue from Contracts', title: 'Ind AS 115 – Revenue from Contracts with Customers' },
  { id: 'ind-as-116', code: 'Ind AS 116', shortTitle: 'Ind AS 116 – Leases', title: 'Ind AS 116 – Leases' },
  { id: 'ind-as-117', code: 'Ind AS 117', shortTitle: 'Ind AS 117 – Insurance Contracts', title: 'Ind AS 117 – Insurance Contracts' },
]

export async function fetchStandards(framework: 'AS' | 'Ind AS'): Promise<Standard[]> {
  const fwKey = framework === 'AS' ? 'AS' : 'IND_AS'
  const excludedIds = ['as-6', 'as-30', 'as-31', 'as-32', 'ind-as-104']
  const staticList = (framework === 'AS' ? ALL_AS_INDEX : ALL_IND_AS_INDEX)
    .filter(item => !excludedIds.includes(item.id))

  let dbEntries: any[] = []
  try {
    dbEntries = await prisma.entry.findMany({
      where: {
        entryType: 'STANDARD',
        status: 'PUBLISHED',
        standardDetail: {
          standardFramework: fwKey
        },
        NOT: {
          entrySlug: {
            startsWith: 'schedule-iii-'
          }
        }
      },
      select: {
        entrySlug: true,
        entryTitle: true,
        summary: true,
        standardDetail: {
          select: {
            standardCode: true,
            standardFramework: true
          }
        }
      }
    })
  } catch (err) {
    console.error('Failed to load standards from DB:', err)
  }

  const dbMapped: Record<string, Standard> = {}
  for (const entry of dbEntries) {
    const detail = entry.standardDetail
    if (!detail) continue

    const id = entry.entrySlug // e.g. as-1 or ind-as-115

    dbMapped[id] = {
      id: id,
      code: detail.standardCode.replace('-', ' '),
      title: entry.entryTitle,
      shortTitle: entry.entryTitle,
      framework: framework,
      description: entry.summary,
      content: {
        objective: '',
        scope: {
          statement: '',
          included: [],
          excluded: []
        },
        keyPrinciples: []
      },
      examples: [],
      lectureUrl: '',
      pdfPagesCount: 0,
      resources: [],
      faqs: []
    }
  }

  const mappedList = staticList.map(item => {
    if (dbMapped[item.id]) {
      const dbStd = dbMapped[item.id]
      return {
        ...dbStd,
        code: item.code,
        shortTitle: item.shortTitle,
        title: item.title,
      }
    } else {
      return {
        id: item.id,
        code: item.code,
        title: item.title,
        shortTitle: item.shortTitle,
        framework: framework,
        description: 'Standard guidelines and reference text under development.',
        content: {
          objective: '',
          scope: {
            statement: '',
            included: [],
            excluded: []
          },
          keyPrinciples: []
        },
        examples: [],
        lectureUrl: '',
        pdfPagesCount: 0,
        resources: [],
        faqs: []
      }
    }
  })

  return sanitizeObject(mappedList)
}

function mapStaticEntryToStandard(staticEntry: any, framework: 'AS' | 'Ind AS'): Standard {
  const keyPrinciples = (staticEntry.keyComponents || staticEntry.notes || []).map((item: any) => ({
    title: item.title || item.noteTitle || 'Key Principle',
    body: item.desc || item.noteBody || item.body || ''
  }))

  const scopeIncluded = staticEntry.scope?.included || []
  const scopeExcluded = staticEntry.scope?.excluded || []

  const examples = (staticEntry.examples || []).map((i: any) => ({
    title: i.title,
    scenario: i.scenario || '',
    guidance: i.answer || i.working || '',
    working: i.working || '',
    answer: i.answer || '',
    note: i.note || '',
    difficulty: i.difficulty || 'INTERMEDIATE',
    paraRef: i.paraRef || ''
  }))

  let resourcesList = (staticEntry.resources || []).map((r: any) => ({
    title: r.title || r.resourceTitle || '',
    url: r.url || r.resourceUrl || '',
    type: r.type || r.resourceType || 'REFERENCE'
  }))

  if (resourcesList.length === 0) {
    resourcesList.push({
      title: 'Official Reference Link',
      url: staticEntry.authorityPrimaryUrl || (framework === 'AS' ? 'https://www.icai.org' : 'https://www.mca.gov.in'),
      type: 'REFERENCE'
    })
  }

  const localPdfPath = `/pdfs/${staticEntry.entrySlug}.pdf`
  const absolutePdfPath = path.join(process.cwd(), 'public', localPdfPath)
  let hasLocalPdf = false
  try {
    if (fs.existsSync(absolutePdfPath)) {
      hasLocalPdf = true
    }
  } catch (e) {}

  if (hasLocalPdf && !resourcesList.some((r: any) => r.type === 'PDF')) {
    resourcesList.unshift({
      title: `${staticEntry.standardCode.replace('-', ' ')} Official PDF Document`,
      url: localPdfPath,
      type: 'PDF'
    })
  }

  return {
    id: staticEntry.entrySlug,
    code: staticEntry.standardCode.replace('-', ' '),
    title: staticEntry.entryTitle,
    shortTitle: staticEntry.entryTitle,
    framework: framework,
    description: staticEntry.summary,
    content: {
      objective: (typeof staticEntry.objective === 'string' ? staticEntry.objective : staticEntry.objective?.text) || '',
      scope: {
        statement: staticEntry.scope?.statement || '',
        included: scopeIncluded,
        excluded: scopeExcluded
      },
      keyPrinciples: keyPrinciples
    },
    examples: examples,
    lectureUrl: staticEntry.lectureUrl || 'https://www.youtube.com/watch?v=mock_lecture',
    pdfPagesCount: staticEntry.entrySlug === 'as-1' ? 16 : (staticEntry.entrySlug === 'as-2' ? 16 : (staticEntry.entrySlug === 'as-9' ? 12 : 3)),
    resources: resourcesList,
    faqs: (staticEntry.faqs || []).map((f: any) => ({
      id: f.id,
      question: f.question || f.faqQuestion || '',
      answer: f.answer || f.faqAnswer || '',
      sourceRef: f.sourceRef || f.faqSourceRef || undefined,
      category: f.category || f.faqCategory || 'GENERAL'
    })),
    definitions: (staticEntry.definitions || []).map((def: any) => ({
      term: def.term || def.defTerm || '',
      paraRef: def.paraRef || def.defParaReference || undefined,
      officialText: def.officialText || def.defOfficialText || '',
      plainExplanation: def.plainExplanation || def.defPlainExplanation || undefined
    })),
    disclosureGroups: (staticEntry.disclosureGroups || []).map((dg: any) => ({
      heading: dg.heading || dg.groupHeading || '',
      paraRange: dg.paraRange || dg.groupParaRange || undefined,
      items: (dg.items || []).map((item: any) => ({
        text: item.text || item.itemText || '',
        isConditional: item.isConditional || item.itemIsConditional || undefined
      }))
    })),
    comparison: staticEntry.comparison ? {
      std2Title: staticEntry.comparison.std2Title || (framework === 'AS' ? 'Ind AS equivalent' : 'AS equivalent'),
      rows: (staticEntry.comparison.rows || []).map((row: any) => ({
        criterion: row.criterion || '',
        as: row.as || row.valueStd1 || '',
        indAs: row.indAs || row.valueStd2 || '',
        isDifferent: row.isDifferent || undefined,
        differenceNote: row.differenceNote || undefined
      }))
    } : undefined,
    examplesHtml: (staticEntry.entryBody && typeof staticEntry.entryBody === 'object' && 'examplesHtml' in staticEntry.entryBody)
      ? (staticEntry.entryBody as any).examplesHtml
      : staticEntry.examplesHtml || undefined
  }
}

export async function fetchStandardDetail(id: string, framework: 'AS' | 'Ind AS'): Promise<Standard | null> {
  const fwKey = framework === 'AS' ? 'AS' : 'IND_AS'
  let entry: any = null
  try {
    entry = await prisma.entry.findFirst({
      where: {
        entrySlug: id,
        entryType: 'STANDARD',
        standardDetail: {
          standardFramework: fwKey
        }
      },
      include: {
        standardDetail: {
          include: {
            definitions: { orderBy: { sortOrder: 'asc' } },
            disclosureGroups: {
              include: { items: { orderBy: { sortOrder: 'asc' } } },
              orderBy: { sortOrder: 'asc' }
            },
            comparisonRows: { orderBy: { sortOrder: 'asc' } }
          }
        },
        illustrations: { orderBy: { sortOrder: 'asc' } },
        resources: { orderBy: { sortOrder: 'asc' } },
        faqs: { orderBy: { sortOrder: 'asc' } },
        notes: { orderBy: { sortOrder: 'asc' } }
      }
    })
  } catch (err) {
    console.error(`Failed to load standard detail for ${id}:`, err)
  }

  if (!entry) {
    if (id === 'as-1') {
      const { AS_1_ENTRY } = require('./data/static-entries')
      return mapStaticEntryToStandard(AS_1_ENTRY, 'AS')
    }
    if (id === 'as-2') {
      const { AS_2_ENTRY } = require('./data/static-entries')
      return mapStaticEntryToStandard(AS_2_ENTRY, 'AS')
    }
    if (id === 'as-9') {
      const { AS_9_ENTRY } = require('./data/static-entries')
      return mapStaticEntryToStandard(AS_9_ENTRY, 'AS')
    }
    if (id === 'ind-as-1') {
      const { IND_AS_1_ENTRY } = require('./data/static-entries')
      return mapStaticEntryToStandard(IND_AS_1_ENTRY, 'Ind AS')
    }
    return null
  }

  const detail = entry.standardDetail
  if (!detail) return null

  const keyPrinciples = entry.notes.map((n: any) => ({
    title: n.noteTitle || 'Key Principle',
    body: n.noteBody
  }))
  
  if (keyPrinciples.length === 0) {
    if (detail.provisionsRecognitionIntro) {
      keyPrinciples.push({
        title: 'Recognition & Provisions',
        body: detail.provisionsRecognitionIntro
      })
    }
    if (detail.provisionsMeasurementIntro) {
      keyPrinciples.push({
        title: 'Measurement Basis',
        body: detail.provisionsMeasurementIntro
      })
    }
  }

  let scopeIncluded = Array.isArray(detail.scopeIncluded) ? detail.scopeIncluded : []
  let scopeExcluded = Array.isArray(detail.scopeExcluded) ? detail.scopeExcluded : []

  let examples = entry.illustrations.map((i: any) => ({
    title: i.illusTitle,
    scenario: i.illusScenario || '',
    guidance: i.illusAnswer || i.illusWorking || '',
    working: i.illusWorking || '',
    answer: i.illusAnswer || '',
    note: i.illusNote || '',
    difficulty: i.illusDifficulty || 'INTERMEDIATE',
    paraRef: i.illusParaRef || ''
  }))

  const videoRes = entry.resources.find((r: any) => r.resourceType === 'VIDEO')
  const pdfRes = entry.resources.find((r: any) => r.resourceType === 'PDF')

  let resourcesList = entry.resources.map((r: any) => {
    let url = r.resourceUrl || ''
    if (r.resourceType === 'PDF' && url.startsWith('data:')) {
      url = `/api/pdfs/${id}`
    } else if (r.resourceType === 'VIDEO' && url.startsWith('data:')) {
      url = `/api/videos/${id}`
    }
    return {
      title: r.resourceTitle,
      url: url,
      type: r.resourceType as 'PDF' | 'VIDEO' | 'REFERENCE'
    }
  })

  if (resourcesList.length === 0) {
    resourcesList.push({
      title: 'Official Reference Link',
      url: entry.authorityPrimaryUrl || (framework === 'AS' ? 'https://www.icai.org' : 'https://www.mca.gov.in'),
      type: 'REFERENCE'
    })
  }

  // If the database has a PDF resource, use it as the PDF resource.
  // Otherwise, fall back to checking if there is a local file.
  if (!pdfRes) {
    const localPdfPath = `/pdfs/${id}.pdf`
    const absolutePdfPath = path.join(process.cwd(), 'public', localPdfPath)
    let hasLocalPdf = false
    try {
      if (fs.existsSync(absolutePdfPath)) {
        hasLocalPdf = true
      }
    } catch (e) {}

    if (hasLocalPdf) {
      resourcesList.unshift({
        title: `${detail.standardCode.replace('-', ' ')} Official PDF Document`,
        url: localPdfPath,
        type: 'PDF'
      })
    }
  }

  const result: Standard = {
    id: id,
    code: detail.standardCode.replace('-', ' '),
    title: entry.entryTitle,
    shortTitle: entry.entryTitle,
    framework: framework,
    description: entry.summary,
    content: {
      objective: detail.objectiveText || '',
      scope: {
        statement: detail.scopeStatement || '',
        included: scopeIncluded,
        excluded: scopeExcluded
      },
      keyPrinciples: keyPrinciples
    },
    examples: examples,
    lectureUrl: videoRes?.resourceUrl || 'https://www.youtube.com/watch?v=mock_lecture',
    pdfPagesCount: id === 'as-1' ? 16 : (pdfRes ? 24 : 3),
    resources: resourcesList,
    faqs: entry.faqs.map((f: any) => ({
      id: f.id,
      question: f.faqQuestion,
      answer: f.faqAnswer,
      sourceRef: f.faqSourceRef || undefined,
      category: f.faqCategory
    })),
    definitions: detail.definitions?.map((d: any) => ({
      term: d.defTerm,
      paraRef: d.defParaReference || undefined,
      officialText: d.defOfficialText,
      plainExplanation: d.defPlainExplanation || undefined
    })) || [],
    disclosureGroups: detail.disclosureGroups?.map((g: any) => ({
      heading: g.groupHeading,
      paraRange: g.groupParaRange || undefined,
      items: g.items?.map((item: any) => ({
        text: item.itemText,
        isConditional: item.itemIsConditional || undefined
      })) || []
    })) || [],
    comparison: {
      std2Title: detail.standardFramework === 'AS' ? 'Ind AS 1 — Presentation of Financial Statements' : 'AS 1 — Disclosure of Accounting Policies',
      rows: detail.comparisonRows?.map((row: any) => ({
        criterion: row.criterion,
        as: detail.standardFramework === 'AS' ? row.valueStd1 || '' : row.valueStd2 || '',
        indAs: detail.standardFramework === 'AS' ? row.valueStd2 || '' : row.valueStd1 || '',
        isDifferent: row.isDifferent || undefined,
        differenceNote: row.differenceNote || undefined
      })) || []
    },
    blocks: (entry.entryBody && typeof entry.entryBody === 'object' && 'blocks' in entry.entryBody)
      ? (entry.entryBody as any).blocks
      : undefined,
    examplesHtml: (entry.entryBody && typeof entry.entryBody === 'object' && 'examplesHtml' in entry.entryBody)
      ? (entry.entryBody as any).examplesHtml
      : undefined
  }

  return sanitizeObject(result)
}

export async function fetchScheduleIIIData(): Promise<any> {
  const divisions = ['div1', 'div2', 'div3'] as const
  const parts = [
    { key: 'balanceSheet', suffix: 'balance-sheet' },
    { key: 'profitAndLoss', suffix: 'profit-loss' },
    { key: 'cashFlow', suffix: 'cash-flow' },
    { key: 'others', suffix: 'others' }
  ] as const

  // Import static data as fallback
  const { SCHEDULE_III_DATA } = require('../app/standards/schedule-iii/data')
  const dataCopy = JSON.parse(JSON.stringify(SCHEDULE_III_DATA))

  try {
    const dbEntries = await prisma.entry.findMany({
      where: {
        entrySlug: {
          startsWith: 'schedule-iii-'
        }
      },
      include: {
        resources: { orderBy: { sortOrder: 'asc' } },
        faqs: { orderBy: { sortOrder: 'asc' } },
        notes: { orderBy: { sortOrder: 'asc' } },
        illustrations: { orderBy: { sortOrder: 'asc' } }
      }
    })

    if (dbEntries && dbEntries.length > 0) {
      dbEntries.forEach((entry: any) => {
        const slug = entry.entrySlug
        const slugParts = slug.split('-')
        const divKey = slugParts[2] as 'div1' | 'div2' | 'div3'
        const partSuffix = slugParts.slice(3).join('-')

        let partKey: 'balanceSheet' | 'profitAndLoss' | 'cashFlow' | 'others' | null = null
        if (partSuffix === 'balance-sheet') partKey = 'balanceSheet'
        else if (partSuffix === 'profit-loss') partKey = 'profitAndLoss'
        else if (partSuffix === 'cash-flow') partKey = 'cashFlow'
        else if (partSuffix === 'others') partKey = 'others'

        if (partKey && dataCopy[divKey] && dataCopy[divKey][partKey]) {
          const videoRes = entry.resources.find((r: any) => r.resourceType === 'VIDEO')
          const pdfRes = entry.resources.find((r: any) => r.resourceType === 'PDF')

          const resourcesList = entry.resources.map((r: any) => {
            let url = r.resourceUrl || ''
            if (r.resourceType === 'PDF' && url.startsWith('data:')) {
              url = `/api/pdfs/${slug}`
            } else if (r.resourceType === 'VIDEO' && url.startsWith('data:')) {
              url = `/api/videos/${slug}`
            }
            return {
              title: r.resourceTitle,
              url: url,
              type: r.resourceType
            }
          })

          const blocks = (entry.entryBody && typeof entry.entryBody === 'object' && 'blocks' in entry.entryBody)
            ? (entry.entryBody as any).blocks
            : undefined

          // Update the topic with database values
          dataCopy[divKey][partKey] = {
            ...dataCopy[divKey][partKey],
            id: slug,
            title: entry.entryTitle,
            sourceLink: entry.authorityPrimaryUrl || dataCopy[divKey][partKey].sourceLink,
            sourceLabel: entry.authorityPrimary || dataCopy[divKey][partKey].sourceLabel,
            blocks,
            lectureUrl: videoRes?.resourceUrl || 'https://www.youtube.com/watch?v=mock_lecture',
            resources: resourcesList,
            pdfPagesCount: 8, // Default pages count for Schedule III docs
            faqs: entry.faqs.map((f: any) => ({
              id: f.id,
              question: f.faqQuestion,
              answer: f.faqAnswer,
              sourceRef: f.faqSourceRef || undefined,
              category: f.faqCategory
            }))
          }
        }
      })
    }
  } catch (err) {
    console.error('Failed to load Schedule III entries from database:', err)
  }

  return sanitizeObject(dataCopy)
}

