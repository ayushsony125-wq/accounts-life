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
        }
      },
      include: {
        standardDetail: {
          include: {
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
    console.error('Failed to load standards from DB:', err)
  }

  // Map database entries to Standard shape
  const dbMapped: Record<string, Standard> = {}
  for (const entry of dbEntries) {
    const detail = entry.standardDetail
    if (!detail) continue

    const keyPrinciples = entry.notes.map((n: any) => ({
      title: n.noteTitle || 'Key Principle',
      body: n.noteBody
    }))
    
    // Fallback if no specific principles in DB notes
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
      guidance: i.illusAnswer || i.illusWorking || ''
    }))

    const videoRes = entry.resources.find((r: any) => r.resourceType === 'VIDEO')
    const pdfRes = entry.resources.find((r: any) => r.resourceType === 'PDF')

    const id = entry.entrySlug // e.g. as-1 or ind-as-115

    let resourcesList = entry.resources.map((r: any) => {
      let url = r.resourceUrl || ''
      if (r.resourceType === 'PDF' && url.startsWith('data:')) {
        url = `/api/pdfs/${id}`
      }
      return {
        title: r.resourceTitle,
        url: url,
        type: r.resourceType as 'PDF' | 'VIDEO' | 'REFERENCE'
      }
    })

    // Ensure we have a default reference link if none are in the DB
    if (resourcesList.length === 0) {
      resourcesList.push({
        title: 'Official Reference Link',
        url: entry.authorityPrimaryUrl || (framework === 'AS' ? 'https://www.icai.org' : 'https://www.mca.gov.in'),
        type: 'REFERENCE'
      })
    }

    // Ensure AS 1 and Ind AS 1 have real test content
    let finalObjective = detail.objectiveText || ''
    let finalScopeStatement = detail.scopeStatement || ''
    let finalScopeIncluded = scopeIncluded
    let finalScopeExcluded = scopeExcluded
    let finalKeyPrinciples = keyPrinciples

    if (id === 'as-1') {
      // Allow database values to take full precedence without overrides
    } else if (id === 'ind-as-1') {
      if (!finalObjective || finalObjective.startsWith('Prescribes presentation and recognition')) {
        finalObjective = 'This Standard prescribes the basis for presentation of general purpose financial statements to ensure comparability both with the entity’s financial statements of previous periods and with the financial statements of other entities. It sets out overall requirements for the presentation of financial statements, guidelines for their structure and minimum requirements for their content.'
      }
      if (!finalScopeStatement || finalScopeStatement.startsWith('Applies to entities preparing')) {
        finalScopeStatement = 'Applies to specified classes of companies as prescribed under the Companies (Indian Accounting Standards) Rules, 2015.'
      }
      if (finalScopeIncluded.length === 0) {
        finalScopeIncluded = [
          'All listed companies (on any stock exchange in India or outside India)',
          'Unlisted companies with net worth of ₹250 crore or more',
          'Holding, subsidiary, joint venture, or associate companies of the above listed/unlisted companies'
        ]
      }
      if (finalScopeExcluded.length === 0) {
        finalScopeExcluded = [
          'Companies not meeting the net worth criteria (which continue to apply traditional AS)',
          'Entities specifically exempt under statutory regulations'
        ]
      }
      if (finalKeyPrinciples.length === 0) {
        finalKeyPrinciples = [
          {
            title: 'True and Fair Presentation',
            body: 'Financial statements shall present a true and fair view of the financial position, performance, and cash flows of an entity, requiring faithful representation of transactions.'
          },
          {
            title: 'Accrual Basis of Accounting',
            body: 'An entity shall prepare its financial statements, except for cash flow information, using the accrual basis of accounting.'
          },
          {
            title: 'Offsetting',
            body: 'An entity shall not offset assets and liabilities or income and expenses, unless required or permitted by an Ind AS.'
          },
          {
            title: 'Structure of Financial Statements',
            body: 'Requires presenting a complete set of financial statements including Statement of Profit and Loss with Other Comprehensive Income (OCI) and Statement of Changes in Equity (SOCE).'
          }
        ]
      }
      if (examples.length === 0) {
        examples = [
          {
            title: 'Classification of Current/Non-current Liabilities',
            scenario: 'A long-term loan is due for repayment in 8 months, but the company has an unconditional right to refinance the loan for another 24 months.',
            guidance: 'Under Ind AS 1, the loan is classified as non-current because the entity has an unconditional right to defer settlement for at least twelve months after the reporting period.'
          },
          {
            title: 'Presentation of Other Comprehensive Income (OCI)',
            scenario: 'An entity has gains on revaluation of property and actuarial losses on defined benefit plans.',
            guidance: 'Ind AS 1 requires these items to be presented in the Statement of Profit and Loss under the OCI section, classified by whether they will be reclassified to profit or loss in future periods.'
          }
        ]
      }
      resourcesList = [
        {
          title: pdfRes ? pdfRes.resourceTitle : 'Ind AS 1 — Official Standard Text (MCA)',
          url: pdfRes ? `/api/pdfs/${id}` : 'https://www.mca.gov.in/content/dam/mca/pdf/Ind_AS_1.pdf',
          type: 'PDF'
        },
        {
          title: 'Ind AS 1 — Educational Material (ICAI)',
          url: 'https://www.icai.org/post/educational-material-on-ind-as-1',
          type: 'REFERENCE'
        }
      ]
    }

    dbMapped[id] = {
      id: id,
      code: detail.standardCode.replace('-', ' '), // standardCode e.g. AS-1 => AS 1
      title: entry.entryTitle,
      shortTitle: entry.entryTitle,
      framework: framework,
      description: entry.summary,
      content: {
        objective: finalObjective,
        scope: {
          statement: finalScopeStatement,
          included: finalScopeIncluded,
          excluded: finalScopeExcluded
        },
        keyPrinciples: finalKeyPrinciples
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
      }))
    }
  }

  // Merge static list with database mappings
  const mappedList = staticList.map(item => {
    let std: Standard

    // Check if we have standard in DB
    if (dbMapped[item.id]) {
      const dbStd = dbMapped[item.id]
      std = {
        ...dbStd,
        code: item.code,
        shortTitle: item.shortTitle,
        title: item.title,
      }
    } else if (item.id === 'intro-as') {
      std = {
        id: item.id,
        code: item.code,
        title: item.title,
        shortTitle: item.shortTitle,
        framework: framework,
        description: 'Overview of the Accounting Standards (AS) framework and their applicability to different classes of enterprises.',
        content: {
          objective: 'To understand the classification of enterprises and the applicability of Accounting Standards (AS) to ensure compliance and proper financial reporting.',
          scope: {
            statement: 'Applicable to all corporate and non-corporate entities preparing general purpose financial statements under Indian GAAP.',
            included: [
              'Level I Entities (Large enterprises with turnover > ₹250 crore or borrowings > ₹50 crore)',
              'Level II Entities (Medium enterprises with turnover ₹50 - ₹250 crore or borrowings ₹10 - ₹50 crore)',
              'Level III Entities (Small enterprises with turnover ₹10 - ₹50 crore or borrowings ₹2 - ₹10 crore)',
              'Level IV Entities (Micro enterprises with turnover < ₹10 crore and borrowings < ₹2 crore)'
            ],
            excluded: [
              'Entities adopting Indian Accounting Standards (Ind AS)',
              'Exempted specific non-corporate entities under statutory guidelines'
            ]
          },
          keyPrinciples: [
            {
              title: 'Entity Classification',
              body: 'Enterprises are classified into four levels (Level I to IV) to determine the applicability of Accounting Standards and eligibility for specific exemptions or relaxations.'
            },
            {
              title: 'Exemptions and Relaxations',
              body: 'Level II, III, and IV entities (collectively called MSMEs) are exempt from certain standards such as AS 3 (Cash Flow Statements), AS 17 (Segment Reporting), and enjoy relaxations in others like AS 15 (Employee Benefits).'
            }
          ]
        },
        examples: [],
        lectureUrl: 'https://youtu.be/nyA1pKuWVWY?si=T7aO6wUVdG8E9Gme',
        pdfPagesCount: 3,
        resources: [
          {
            title: 'Official Statutory Reference',
            url: 'https://www.icai.org',
            type: 'REFERENCE'
          }
        ]
      }
    } else if (item.id === 'intro-ind-as') {
      std = {
        id: item.id,
        code: item.code,
        title: item.title,
        shortTitle: item.shortTitle,
        framework: framework,
        description: 'Overview of the IFRS-converged Indian Accounting Standards (Ind AS) framework and transition roadmaps.',
        content: {
          objective: 'To outline the applicability roadmap and requirements for entities transitioning to or complying with Indian Accounting Standards (Ind AS).',
          scope: {
            statement: 'Applicable to specified classes of companies as prescribed under the Companies (Indian Accounting Standards) Rules, 2015.',
            included: [
              'All listed companies (on any stock exchange in India or outside India)',
              'Unlisted companies with net worth of ₹250 crore or more',
              'Holding, subsidiary, joint venture, or associate companies of the above listed/unlisted companies'
            ],
            excluded: [
              'Companies not meeting the net worth criteria (which continue to apply traditional AS)',
              'Entities specifically exempt under statutory regulations'
            ]
          },
          keyPrinciples: [
            {
              title: 'IFRS Convergence',
              body: 'Ind AS are converged with International Financial Reporting Standards (IFRS) to enhance global comparability and transparency of Indian corporate financial reporting.'
            },
            {
              title: 'Mandatory vs Voluntary Adoption',
              body: 'Companies meeting the net worth criteria must adopt Ind AS mandatorily. Other companies may adopt them voluntarily, but once Ind AS is adopted, it is irreversible.'
            }
          ]
        },
        examples: [],
        lectureUrl: 'https://youtu.be/nyA1pKuWVWY?si=T7aO6wUVdG8E9Gme',
        pdfPagesCount: 3,
        resources: [
          {
            title: 'Official Statutory Reference',
            url: 'https://www.mca.gov.in',
            type: 'REFERENCE'
          }
        ]
      }
    } else {
      std = {
        id: item.id,
        code: item.code,
        title: item.title,
        shortTitle: item.shortTitle,
        framework: framework,
        description: 'Standard guidelines and reference text under development.',
        content: {
          objective: `The objective of this standard is to prescribe the accounting treatment and disclosures for ${item.title.replace(/^(AS|Ind AS)\s+\d+\s+–\s+/, '')}.`,
          scope: {
            statement: 'Applicability details and criteria are currently under development.',
            included: ['Standard compliance entities'],
            excluded: ['Entities exempt under relevant statutes']
          },
          keyPrinciples: [
            { title: 'Overview', body: 'Statutory guidelines and key policies will be loaded here by the administrator.' }
          ]
        },
        examples: [],
        lectureUrl: 'https://www.youtube.com/watch?v=mock_lecture',
        pdfPagesCount: 3,
        resources: [
          {
            title: 'Official Reference Link',
            url: framework === 'AS' ? 'https://www.icai.org' : 'https://www.mca.gov.in',
            type: 'REFERENCE'
          }
        ]
      }
    }

    // Disk-based PDF auto-mapping check
    const localPdfPath = `/pdfs/${item.id}.pdf`
    const absolutePdfPath = path.join(process.cwd(), 'public', localPdfPath)
    let hasLocalPdf = false
    try {
      if (fs.existsSync(absolutePdfPath)) {
        hasLocalPdf = true
      }
    } catch (e) {}

    if (hasLocalPdf) {
      const resources = std.resources ? [...std.resources] : []
      // Remove other PDF references to avoid duplicate tabs or conflicting links
      const filtered = resources.filter(r => r.type !== 'PDF')
      filtered.unshift({
        title: `${item.code} Official PDF Document`,
        url: localPdfPath,
        type: 'PDF'
      })
      std.resources = filtered
    }

    return std
  })

  return sanitizeObject(mappedList)
}
