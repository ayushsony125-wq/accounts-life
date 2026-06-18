import { PrismaClient } from '@prisma/client'
import { SEARCH_INDEX, GLOSSARY_TERMS, ACCRUAL_CONCEPT_ENTRY, AS_1_ENTRY, IND_AS_1_ENTRY } from '../lib/data/static-entries'

const prisma = new PrismaClient()

function getSubdomainSlug(entrySlug: string, domainCode: string): string {
  if (domainCode === 'D01') {
    if (entrySlug === 'accrual-concept' || entrySlug === 'going-concern' || entrySlug === 'consistency' || entrySlug === 'matching-principle') {
      return 'concepts-conventions'
    }
    if (entrySlug === 'double-entry') {
      return 'double-entry-system'
    }
    if (entrySlug.includes('depreciation') || entrySlug === 'slm' || entrySlug === 'wdv' || entrySlug === 'je-depreciation-slm') {
      return 'depreciation-accounting'
    }
    return 'concepts-conventions'
  }
  if (domainCode === 'D02') {
    const num = parseInt(entrySlug.replace('as-', ''))
    if (isNaN(num) || num <= 10) return 'as-core'
    if (num <= 20) return 'as-financial'
    return 'as-advanced'
  }
  if (domainCode === 'D03') {
    const num = parseInt(entrySlug.replace('ind-as-', ''))
    if (isNaN(num) || num <= 38) return 'ind-as-core'
    if (num <= 117) return 'ind-as-ifrs'
    return 'ind-as-financial-instruments'
  }
  return 'general'
}

async function main() {
  console.log('--- STARTING PRODUCTION CONTENT MIGRATION ---')

  // 1. Fetch domain/subdomain records for mapping
  const domains = await prisma.domain.findMany({
    include: { subdomains: true }
  })
  if (domains.length === 0) {
    throw new Error('Database not seeded. Seed the database first.')
  }

  // 2. Migrate Glossary Terms
  console.log(`Migrating ${GLOSSARY_TERMS.length} Glossary Terms...`)
  let glossaryMigrated = 0
  for (const g of GLOSSARY_TERMS) {
    await prisma.glossaryTerm.upsert({
      where: { termSlug: g.termSlug },
      update: {
        term: g.term,
        shortDefinition: g.shortDefinition,
        authoritySource: g.authoritySource || null,
        authorityUrl: g.authorityUrl || null,
        relatedTerms: g.relatedTermSlugs || [],
        standardRefs: g.standardRefs || [],
        examLevelTags: g.examLevelTags || [],
        status: 'PUBLISHED',
      },
      create: {
        term: g.term,
        termSlug: g.termSlug,
        shortDefinition: g.shortDefinition,
        authoritySource: g.authoritySource || null,
        authorityUrl: g.authorityUrl || null,
        relatedTerms: g.relatedTermSlugs || [],
        standardRefs: g.standardRefs || [],
        examLevelTags: g.examLevelTags || [],
        status: 'PUBLISHED',
      }
    })
    glossaryMigrated++
  }
  console.log(`✓ Migrated ${glossaryMigrated} glossary terms.`)

  // 3. Migrate Accounting Topics (Concepts, Standards, Journal Entries)
  console.log(`Migrating ${SEARCH_INDEX.length} Accounting Topics...`)
  let entriesMigrated = 0
  for (const s of SEARCH_INDEX) {
    if (s.type === 'GLOSSARY_TERM') continue

    // Find the corresponding Domain
    const domain = domains.find(d => d.domainCode === s.domainCode)
    if (!domain) {
      console.warn(`! Domain not found for code ${s.domainCode}, skipping item: ${s.title}`)
      continue
    }

    // Resolve subdomain slug and find subdomain record
    const cleanSlug = s.slug.split('/').pop() || ''
    const subdomainSlug = getSubdomainSlug(cleanSlug, s.domainCode)
    const subdomain = domain.subdomains.find(sub => sub.subdomainSlug === subdomainSlug) || domain.subdomains[0]
    if (!subdomain) {
      console.warn(`! Subdomain not found for slug ${subdomainSlug}, skipping item: ${s.title}`)
      continue
    }

    // Determine body payload (for Accrual Concept or other concepts)
    let bodyPayload: any = null
    let examTags = ['CA Intermediate']
    if (cleanSlug === 'accrual-concept') {
      bodyPayload = ACCRUAL_CONCEPT_ENTRY
      examTags = ACCRUAL_CONCEPT_ENTRY.examLevelTags as string[]
    }

    // Check if the Entry exists
    const existing = await prisma.entry.findUnique({
      where: { entrySlug: cleanSlug }
    })

    let entryId = existing?.id

    if (existing) {
      // Update entry basic info
      await prisma.entry.update({
        where: { id: existing.id },
        data: {
          entryTitle: s.title,
          summary: s.summary,
          entryBody: bodyPayload || undefined,
          status: 'PUBLISHED',
          verificationLevel: 'VERIFIED',
        }
      })
    } else {
      // Create new entry
      const created = await prisma.entry.create({
        data: {
          entryType: s.type as any,
          entryTitle: s.title,
          entrySlug: cleanSlug,
          domainId: domain.id,
          subdomainId: subdomain.id,
          summary: s.summary,
          entryBody: bodyPayload || {},
          status: 'PUBLISHED',
          verificationLevel: 'VERIFIED',
          examLevelTags: examTags,
        }
      })
      entryId = created.id
    }

    // 4. Create StandardDetail row if type is STANDARD
    if (s.type === 'STANDARD' && entryId) {
      const isAS = s.slug.includes('/as/')
      const framework = isAS ? 'AS' : 'IND_AS'
      
      let fullStdData: any = null
      if (cleanSlug === 'as-1') fullStdData = AS_1_ENTRY
      if (cleanSlug === 'ind-as-1') fullStdData = IND_AS_1_ENTRY

      // Delete standard detail relations to allow clean recreation
      await prisma.standardDetail.deleteMany({
        where: { entryId: entryId }
      })

      // Setup standard details base
      const applicability = fullStdData?.applicabilitySummary || `Applicable under Indian Accounting Standards (${framework} framework).`
      const issuing = isAS ? 'ICAI' : 'MCA'

      // Map quick bullets
      const qb1Label = fullStdData?.quickBullets?.[0]?.label || 'Framework'
      const qb1Desc = fullStdData?.quickBullets?.[0]?.desc || `${framework} Standards`
      const qb2Label = fullStdData?.quickBullets?.[1]?.label || 'Status'
      const qb2Desc = fullStdData?.quickBullets?.[1]?.desc || 'Active'

      const objectiveText = fullStdData?.objective?.text || `Prescribes presentation and recognition criteria for ${s.title}.`
      const objectiveSource = fullStdData?.objective?.sourcePara || 'Official paragraph text in curation'
      const objectiveComment = fullStdData?.objective?.commentary || 'Detailed plain-language analysis coming soon.'

      const scopeText = fullStdData?.scope?.statement || 'Applies to entities preparing financial statements under this framework.'

      await prisma.standardDetail.create({
        data: {
          entryId: entryId,
          standardCode: cleanSlug.toUpperCase(),
          standardFramework: framework as any,
          standardStatus: 'ACTIVE',
          issuingBody: issuing,
          applicabilitySummary: applicability,
          quickBullet1Label: qb1Label,
          quickBullet1Desc: qb1Desc,
          quickBullet2Label: qb2Label,
          quickBullet2Desc: qb2Desc,
          objectiveText: objectiveText,
          objectiveSourcePara: objectiveSource,
          objectiveCommentary: objectiveComment,
          scopeStatement: scopeText,
          // Handle nested seed data for AS 1 / Ind AS 1
          definitions: {
            create: (fullStdData?.definitions || []).map((d: any, idx: number) => ({
              defTerm: d.term,
              defParaReference: d.paraRef,
              defOfficialText: d.officialText,
              defPlainExplanation: d.plainExplanation,
              sortOrder: idx,
            }))
          },
          disclosureGroups: {
            create: (fullStdData?.disclosureGroups || []).map((dg: any, idx: number) => ({
              groupHeading: dg.heading,
              groupParaRange: dg.paraRange,
              sortOrder: idx,
              items: {
                create: (dg.items || []).map((item: any, itemIdx: number) => ({
                  itemText: item.text || item.itemText || '',
                  itemParaRef: item.paraRef || item.itemParaRef || '',
                  sortOrder: itemIdx,
                }))
              }
            }))
          },
          comparisonRows: {
            create: (fullStdData?.comparison?.rows || []).map((row: any, idx: number) => ({
              criterion: row.criterion,
              valueStd1: row.as || row.valueStd1 || '',
              valueStd2: row.indAs || row.valueStd2 || '',
              isDifferent: row.isDifferent || false,
              differenceNote: row.differenceNote,
              sortOrder: idx,
            }))
          }
        }
      })

      // 5. Seed related FAQs and Journal Entries on the parent Entry record
      if (fullStdData?.faqs) {
        await prisma.entryFAQ.deleteMany({ where: { entryId } })
        await prisma.entryFAQ.createMany({
          data: fullStdData.faqs.map((f: any, idx: number) => ({
            entryId,
            faqQuestion: f.question || f.faqQuestion || '',
            faqAnswer: f.answer || f.faqAnswer || '',
            faqSourceRef: f.sourceRef || f.faqSourceRef || null,
            faqCategory: (f.category || f.faqCategory || 'GENERAL') as any,
            sortOrder: idx
          }))
        })
      }

      if (fullStdData?.journalEntryNotes) {
        await prisma.entryJournalEntry.deleteMany({ where: { entryId } })
        for (let idx = 0; idx < fullStdData.journalEntryNotes.length; idx++) {
          const je = fullStdData.journalEntryNotes[idx]
          await prisma.entryJournalEntry.create({
            data: {
              entryId,
              jeScenarioTitle: je.scenario,
              jeNarration: je.treatment,
              sortOrder: idx,
              rows: {
                create: [
                  { rowType: 'DR', accountName: 'Appropriate Debit Account', drAmount: null, crAmount: null, sortOrder: 0 },
                  { rowType: 'CR', accountName: 'Appropriate Credit Account', drAmount: null, crAmount: null, sortOrder: 1 }
                ]
              }
            }
          })
        }
      }
    }

    entriesMigrated++
  }
  console.log(`✓ Migrated ${entriesMigrated} accounting entries.`)
  console.log('--- PRODUCTION CONTENT MIGRATION COMPLETED ---')
}

main()
  .catch(err => {
    console.error('Migration failed:', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
